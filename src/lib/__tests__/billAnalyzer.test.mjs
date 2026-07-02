import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { parseCsv, detectCsvFormat, parseBillCsv, parseInvoiceText } from "../billParser.mjs";
import { buildComparison, matchVmFlavor, matchDbPlan, reportToCsv } from "../comparisonEngine.mjs";
import { awsInstanceSpecs, azureInstanceSpecs } from "../instanceSpecs.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const sample = (name) => readFileSync(join(here, "../../../public/samples", name), "utf8");

// ── CSV primitives ───────────────────────────────────────────────────────────

test("parseCsv handles quoted fields, embedded commas and escaped quotes", () => {
  const rows = parseCsv('a,"b,1","say ""hi"""\r\nc,d,e\n');
  assert.deepEqual(rows, [["a", "b,1", 'say "hi"'], ["c", "d", "e"]]);
});

test("detectCsvFormat recognizes all four supported layouts", () => {
  assert.equal(detectCsvFormat(["lineItem/ProductCode", "lineItem/UnblendedCost"]), "aws-cur");
  assert.equal(detectCsvFormat(["RecordType", "ProductCode", "UsageType", "TotalCost"]), "aws-monthly");
  assert.equal(detectCsvFormat(["Service", "Total costs($)"]), "aws-cost-explorer");
  assert.equal(detectCsvFormat(["MeterCategory", "MeterName", "Quantity", "Cost"]), "azure-usage");
  assert.equal(detectCsvFormat(["foo", "bar"]), null);
});

// ── instance spec lookups ────────────────────────────────────────────────────

test("awsInstanceSpecs resolves exact, aliased, generic and RDS types", () => {
  assert.deepEqual(awsInstanceSpecs("t3.medium"), { vcpu: 2, ramGb: 4 });
  assert.deepEqual(awsInstanceSpecs("t4g.small"), { vcpu: 2, ramGb: 2 });
  assert.deepEqual(awsInstanceSpecs("m5.large"), { vcpu: 2, ramGb: 8 });
  assert.deepEqual(awsInstanceSpecs("c5.2xlarge"), { vcpu: 8, ramGb: 16 });
  assert.deepEqual(awsInstanceSpecs("r6i.xlarge"), { vcpu: 4, ramGb: 32 });
  assert.deepEqual(awsInstanceSpecs("db.t3.medium"), { vcpu: 2, ramGb: 4 });
  assert.equal(awsInstanceSpecs("weird.type"), null);
});

test("azureInstanceSpecs resolves B-series, D/E/F series and Standard_ names", () => {
  assert.deepEqual(azureInstanceSpecs("B2s"), { vcpu: 2, ramGb: 4 });
  assert.deepEqual(azureInstanceSpecs("D2s v3"), { vcpu: 2, ramGb: 8 });
  assert.deepEqual(azureInstanceSpecs("Standard_E4s_v3"), { vcpu: 4, ramGb: 32 });
  assert.deepEqual(azureInstanceSpecs("F2s v2"), { vcpu: 2, ramGb: 4 });
  assert.deepEqual(azureInstanceSpecs("D2s v3/D2 v3"), { vcpu: 2, ramGb: 8 });
});

// ── flavor / plan matching ───────────────────────────────────────────────────

test("matchVmFlavor picks the cheapest covering flavor and stacks beyond range", () => {
  assert.equal(matchVmFlavor(1, 1).flavor.flavor, "gen2.nano");
  assert.equal(matchVmFlavor(2, 4).flavor.flavor, "gen2.small");
  assert.equal(matchVmFlavor(2, 8).flavor.flavor, "gen2.large");
  const big = matchVmFlavor(64, 128);
  assert.equal(big.flavor.flavor, "gen32.giant");
  assert.equal(big.count, 2);
});

test("matchDbPlan covers specs and stacks beyond the Professional plan", () => {
  assert.equal(matchDbPlan(2, 4).plan.plan, "Standard Database");
  assert.equal(matchDbPlan(8, 16).count, 2);
});

// ── AWS end-to-end ───────────────────────────────────────────────────────────

test("AWS sample bill parses and compares end-to-end", () => {
  const parsed = parseBillCsv(sample("aws-sample-bill.csv"));
  assert.equal(parsed.ok, true);
  assert.equal(parsed.provider, "aws");
  assert.equal(parsed.format, "aws-monthly");

  const report = buildComparison(parsed);

  // VMs matched by instance type with real hours.
  const t3 = report.rows.find((r) => r.label === "EC2 t3.medium");
  assert.ok(t3, "t3.medium row exists");
  assert.equal(t3.providerCost, 60.74);
  assert.equal(t3.neviriCost, 24.04); // 1460h × gen2.small $12.02/730h
  assert.equal(t3.estimated, false);

  // Load balancer is free on Neviri.
  const lb = report.rows.find((r) => r.neviriService === "loadBalancer");
  assert.equal(lb.neviriCost, 0);

  // Bandwidth allowance applied: (450 − 100) × $0.05.
  const bw = report.rows.find((r) => r.label === "Data transfer (outbound)");
  assert.equal(bw.neviriCost, 17.5);

  // NAT Gateway + Lambda + CloudFront + Route53 + CloudWatch → gap report.
  const gapLabels = report.notOffered.map((x) => x.label);
  assert.ok(gapLabels.includes("AWS NAT Gateway"));
  assert.ok(gapLabels.includes("AWS Lambda (serverless functions)"));
  assert.ok(gapLabels.includes("Amazon CloudFront (CDN)"));

  // Tax excluded from the comparison.
  assert.equal(report.totals.excludedCost, 25);

  // Overall: meaningful savings, coverage below 100% (gap services exist).
  assert.ok(report.totals.savings > 100, `savings=${report.totals.savings}`);
  assert.ok(report.totals.coveragePct > 70 && report.totals.coveragePct < 100);
});

// ── Azure end-to-end ─────────────────────────────────────────────────────────

test("Azure sample bill parses and compares end-to-end", () => {
  const parsed = parseBillCsv(sample("azure-sample-bill.csv"));
  assert.equal(parsed.ok, true);
  assert.equal(parsed.provider, "azure");

  const report = buildComparison(parsed);

  // B2s (2 vCPU / 4 GB) → gen2.small.
  const b2s = report.rows.find((r) => r.label.includes("B2s"));
  assert.ok(b2s.note.includes("gen2.small"));
  assert.equal(b2s.neviriCost, 24.04);

  // P10 disks: 2 disk-months × 128 GB × $0.08.
  const disks = report.rows.find((r) => r.label.startsWith("Managed disks"));
  assert.equal(disks.neviriCost, 20.48);

  // Snapshot meter routed to backups, not disks.
  const snap = report.rows.find((r) => r.label === "Disk / blob snapshots");
  assert.equal(snap.neviriCost, 6);

  // Blob write operations are free on Neviri.
  const ops = report.rows.find((r) => r.label === "Blob operations");
  assert.equal(ops.neviriCost, 0);

  // Public IPs and load balancer free.
  assert.equal(report.rows.find((r) => r.neviriService === "reservedIp").neviriCost, 0);
  assert.equal(report.rows.find((r) => r.neviriService === "loadBalancer").neviriCost, 0);

  // App Service, DNS, Key Vault in the gap report.
  const gapLabels = report.notOffered.map((x) => x.label);
  assert.ok(gapLabels.includes("Azure App Service"));
  assert.ok(gapLabels.includes("Azure DNS"));
  assert.ok(gapLabels.includes("Azure Key Vault"));

  assert.ok(report.totals.savings > 100, `savings=${report.totals.savings}`);
});

// ── service-level paths ──────────────────────────────────────────────────────

test("Cost Explorer export compares at service level with estimates", () => {
  const csv = [
    "Service,Total costs($)",
    "EC2 - Other,120.00",
    "Amazon Elastic Compute Cloud - Compute,300.00",
    "Amazon Simple Storage Service,40.00",
    "AWS Lambda,15.00",
    "Tax,32.00",
  ].join("\n");
  const parsed = parseBillCsv(csv);
  assert.equal(parsed.ok, true);
  assert.equal(parsed.format, "aws-cost-explorer");

  const report = buildComparison(parsed);
  const vmRows = report.rows.filter((r) => r.neviriService === "vm");
  assert.equal(vmRows.length, 2);
  assert.ok(vmRows.every((r) => r.estimated));
  assert.equal(report.totals.excludedCost, 32);
  assert.ok(report.notOffered.some((x) => x.label.includes("Lambda")));
  assert.equal(report.totals.hasEstimates, true);
});

test("AWS invoice PDF text parses to service-level items", () => {
  const text = [
    "Amazon Web Services, Inc. Invoice",
    "Invoice Number: 123456789",
    "Amazon Elastic Compute Cloud $412.33",
    "Amazon Simple Storage Service $58.10",
    "Amazon CloudFront $23.99",
    "VAT/Tax $49.48",
    "TOTAL AMOUNT DUE $543.90",
  ].join("\n");
  const parsed = parseInvoiceText(text);
  assert.equal(parsed.ok, true);
  assert.equal(parsed.provider, "aws");
  assert.equal(parsed.items.length, 4); // 3 services + tax; totals skipped

  const report = buildComparison(parsed);
  assert.ok(report.rows.some((r) => r.neviriService === "vm" && r.estimated));
  assert.ok(report.notOffered.some((x) => x.label.includes("CloudFront")));
  assert.equal(report.totals.excludedCost, 49.48);
});

test("unrecognized inputs fail with a helpful error", () => {
  assert.equal(parseBillCsv("a,b\n1,2").ok, false);
  assert.equal(parseInvoiceText("random text with no invoice").ok, false);
});

// ── report CSV export ────────────────────────────────────────────────────────

test("reportToCsv contains all three sections and totals", () => {
  const report = buildComparison(parseBillCsv(sample("aws-sample-bill.csv")));
  const csv = reportToCsv(report);
  assert.ok(csv.includes("Comparable"));
  assert.ok(csv.includes("Not available on Neviri"));
  assert.ok(csv.includes("Excluded from comparison"));
  assert.ok(csv.includes("Monthly savings with Neviri"));
});
