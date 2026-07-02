// Comparison engine — prices normalized bill items (from billParser) against
// the Neviri catalog and produces the full comparative report:
//   • comparable rows  (provider cost vs Neviri cost, % delta, notes)
//   • notOffered rows  ("Neviri does not provide this service")
//   • excluded rows    (taxes, credits, support plans — never compared)
//   • totals           (savings $, savings %, coverage % of the bill)
//
// Deterministic wherever the bill carries real usage quantities; falls back to
// documented cost ratios (flagged `estimated: true`) when only service-level
// totals are available.

import {
  VM_FLAVORS,
  DB_PLANS,
  RATES,
  NEVIRI_SERVICES,
  SERVICE_LEVEL_ESTIMATE_RATIOS,
  AWS_SERVICE_MAP,
  AWS_UNSUPPORTED,
  AWS_DISPLAY_NAMES,
  AWS_INVOICE_NAME_MAP,
  AZURE_CATEGORY_MAP,
  AZURE_UNSUPPORTED,
  AZURE_DISK_TIER_GB,
  HOURS_PER_MONTH,
} from "../data/neviriCatalog.mjs";
import { awsInstanceSpecs, azureInstanceSpecs } from "./instanceSpecs.mjs";

const round2 = (n) => Math.round(n * 100) / 100;

// Cheapest flavor that covers the requested specs; stacks multiples of the
// largest flavor when a single instance exceeds the top of the range.
export function matchVmFlavor(vcpu, ramGb) {
  const fits = VM_FLAVORS.filter((f) => f.vcpu >= vcpu && f.ram >= ramGb);
  if (fits.length) {
    const flavor = fits.reduce((a, b) => (a.priceMo <= b.priceMo ? a : b));
    return { flavor, count: 1 };
  }
  const largest = VM_FLAVORS[VM_FLAVORS.length - 1];
  const count = Math.max(Math.ceil(vcpu / largest.vcpu), Math.ceil(ramGb / largest.ram));
  return { flavor: largest, count };
}

export function matchDbPlan(vcpu, ramGb) {
  const fits = DB_PLANS.filter((p) => p.vcpu >= vcpu && p.ram >= ramGb);
  if (fits.length) {
    const plan = fits.reduce((a, b) => (a.priceMo <= b.priceMo ? a : b));
    return { plan, count: 1 };
  }
  const largest = DB_PLANS[DB_PLANS.length - 1];
  const count = Math.max(Math.ceil(vcpu / largest.vcpu), Math.ceil(ramGb / largest.ram));
  return { plan: largest, count };
}

// One priced comparable entry. `estimated` marks ratio-based numbers.
function entry(neviriService, label, providerCost, neviriCost, { detail = "", note = "", estimated = false } = {}) {
  return { neviriService, label, detail, providerCost, neviriCost, note, estimated };
}

function ratioEntry(neviriService, label, cost, note = "") {
  const ratio = SERVICE_LEVEL_ESTIMATE_RATIOS[neviriService] ?? 1;
  return entry(neviriService, label, cost, cost * ratio, {
    note: note || "Estimated from typical Neviri pricing — upload a detailed CSV export for an exact match.",
    estimated: true,
  });
}

// ── AWS resource-level classification ────────────────────────────────────────

const RX_AWS_VM_USAGE = /(?:BoxUsage|SpotUsage|HeavyUsage|DedicatedUsage|HostBoxUsage)(?::([a-z0-9.]+))?/i;
const RX_AWS_DB_USAGE = /(?:InstanceUsage|Multi-AZUsage)(?::(db\.[a-z0-9.]+))?/i;

function classifyAwsEc2(item, ctx) {
  const u = item.usageType;

  const vmMatch = u.match(RX_AWS_VM_USAGE);
  if (vmMatch) {
    const instanceType = item.instanceType || vmMatch[1] || "";
    ctx.vms.push({ ...item, instanceType, hours: item.quantity });
    return;
  }
  if (/EBS:SnapshotUsage/i.test(u)) {
    ctx.entries.push(entry("backup", "EBS snapshots", item.cost,
      item.quantity * RATES.backupWeeklyPerGb,
      { detail: `${round2(item.quantity)} GB-mo`, note: "Priced at Neviri weekly-backup rate ($0.04/GB)." }));
    return;
  }
  if (/EBS:Volume(?:P?IOPS|.*Throughput)/i.test(u)) {
    ctx.entries.push(entry("blockStorage", "EBS provisioned IOPS / throughput", item.cost, 0,
      { note: "NVMe performance is included with Neviri block storage — no separate IOPS charges." }));
    return;
  }
  if (/EBS:VolumeUsage/i.test(u)) {
    ctx.entries.push(entry("blockStorage", "EBS volumes", item.cost,
      item.quantity * RATES.blockStoragePerGbMo,
      { detail: `${round2(item.quantity)} GB-mo`, note: "Neviri NVMe block storage at $0.08/GB/mo." }));
    return;
  }
  if (/DataTransfer.*Out|-Out-Bytes/i.test(u)) { ctx.egressGb += item.quantity; ctx.egressCost += item.cost; return; }
  if (/DataTransfer.*In|-In-Bytes/i.test(u)) {
    ctx.entries.push(entry("bandwidth", "Data transfer (inbound)", item.cost, 0,
      { note: "Inbound traffic is always free on Neviri." }));
    return;
  }
  if (/ElasticIP.*Idle|PublicIPv4.*Idle/i.test(u)) {
    ctx.entries.push(entry("reservedIp", "Idle public IPs", item.cost,
      (item.quantity / HOURS_PER_MONTH) * RATES.reservedIpIdlePerMo,
      { detail: `${round2(item.quantity)} hrs`, note: "Idle reserved IPs bill $3.02/mo on Neviri." }));
    return;
  }
  if (/ElasticIP|PublicIPv4/i.test(u)) {
    ctx.entries.push(entry("reservedIp", "Public IPv4 (in use)", item.cost, 0,
      { note: "IPs assigned to a running resource are free on Neviri." }));
    return;
  }
  if (/NatGateway/i.test(u)) { ctx.notOffered.push({ label: "AWS NAT Gateway", cost: item.cost }); return; }
  if (/CPUCredits/i.test(u)) {
    ctx.entries.push(entry("vm", "EC2 burst CPU credits", item.cost, 0,
      { note: "Neviri VMs have no burst-credit charges." }));
    return;
  }
  // Anything else under EC2 (reservations, other) — ratio estimate.
  ctx.entries.push(ratioEntry("vm", `EC2 — ${u || "other usage"}`, item.cost));
}

function classifyAwsResource(item, ctx) {
  const svc = item.service;

  if (svc === "AmazonEC2") return classifyAwsEc2(item, ctx);

  if (svc === "AmazonS3") {
    const u = item.usageType;
    if (/DataTransfer.*Out|-Out-Bytes/i.test(u)) { ctx.egressGb += item.quantity; ctx.egressCost += item.cost; return; }
    if (/TimedStorage/i.test(u)) {
      ctx.entries.push(entry("objectStorage", "S3 storage", item.cost,
        item.quantity * RATES.objectStoragePerGbMo,
        { detail: `${round2(item.quantity)} GB-mo`, estimated: RATES.objectStorageEstimated,
          note: "Neviri object storage (rate pending final publication)." }));
      return;
    }
    if (/Requests|Retrieval|Select/i.test(u)) {
      ctx.entries.push(entry("objectStorage", "S3 requests", item.cost, 0,
        { note: "Neviri object storage has no per-request fees." }));
      return;
    }
    ctx.entries.push(ratioEntry("objectStorage", `S3 — ${u || "other"}`, item.cost));
    return;
  }

  if (svc === "AmazonRDS") {
    const desc = item.description || "";
    if (/aurora/i.test(desc)) { ctx.notOffered.push({ label: "Amazon Aurora", cost: item.cost }); return; }
    if (/sql ?server/i.test(desc)) { ctx.notOffered.push({ label: "RDS for SQL Server", cost: item.cost }); return; }
    if (/oracle/i.test(desc)) { ctx.notOffered.push({ label: "RDS for Oracle", cost: item.cost }); return; }
    const dbMatch = item.usageType.match(RX_AWS_DB_USAGE);
    const instanceType = item.instanceType || (dbMatch && dbMatch[1]) || "";
    if (dbMatch || instanceType) {
      const specs = awsInstanceSpecs(instanceType);
      if (specs) {
        const { plan, count } = matchDbPlan(specs.vcpu, specs.ramGb);
        const multiAz = /Multi-AZ/i.test(item.usageType);
        const nodes = count * (multiAz ? 2 : 1);
        const neviriCost = (item.quantity / HOURS_PER_MONTH) * plan.priceMo * nodes;
        const engine = /postgres/i.test(desc) ? "PostgreSQL" : /maria/i.test(desc) ? "MariaDB" : "MySQL";
        ctx.entries.push(entry("managedDatabase", `RDS ${instanceType}${multiAz ? " (Multi-AZ)" : ""}`,
          item.cost, neviriCost, {
            detail: `${round2(item.quantity)} hrs → ${nodes > 1 ? `${nodes}× ` : ""}${plan.plan}`,
            note: `Mapped to Neviri ${engine} ${plan.plan} (${plan.vcpu} vCPU / ${plan.ram} GB / ${plan.storageGb} GB NVMe).${multiAz ? " Multi-AZ priced as two nodes." : ""}`,
          }));
        return;
      }
    }
    if (/RDS:.*Storage|RDS:.*PIOPS/i.test(item.usageType)) {
      ctx.entries.push(entry("managedDatabase", "RDS storage & IOPS", item.cost, 0,
        { note: "NVMe storage and IOPS are included in Neviri database plans." }));
      return;
    }
    ctx.entries.push(ratioEntry("managedDatabase", `RDS — ${item.usageType || "other"}`, item.cost));
    return;
  }

  const mapped = AWS_SERVICE_MAP[svc];
  if (mapped) {
    const label = AWS_DISPLAY_NAMES[svc] || svc;
    if (mapped.service === "bandwidth") {
      if (item.quantity > 0) { ctx.egressGb += item.quantity; ctx.egressCost += item.cost; return; }
      ctx.entries.push(ratioEntry("bandwidth", label, item.cost));
      return;
    }
    if (mapped.service === "loadBalancer" || mapped.service === "ssl" || mapped.service === "networking") {
      const included = { loadBalancer: "Load balancers", ssl: "SSL certificates", networking: "VPC networking (networks, routers, security groups)" }[mapped.service];
      ctx.entries.push(entry(mapped.service, label, item.cost, 0,
        { note: `${included} are included free on Neviri.` }));
      return;
    }
    if (mapped.service === "backup") {
      const neviriCost = item.quantity > 0 ? item.quantity * RATES.backupWeeklyPerGb : item.cost * SERVICE_LEVEL_ESTIMATE_RATIOS.backup;
      ctx.entries.push(entry("backup", label, item.cost, neviriCost,
        { estimated: !(item.quantity > 0), note: "Priced at Neviri backup rates ($0.03–0.04/GB)." }));
      return;
    }
    ctx.entries.push(ratioEntry(mapped.service, label, item.cost));
    return;
  }

  if (AWS_UNSUPPORTED[svc]) { ctx.notOffered.push({ label: AWS_UNSUPPORTED[svc], cost: item.cost }); return; }
  ctx.notOffered.push({ label: svc, cost: item.cost });
}

// ── AWS service-level classification (Cost Explorer / PDF invoices) ──────────

function resolveAwsServiceName(name) {
  if (/^(Amazon|AWS)[A-Za-z0-9]+$/.test(name)) return name; // already a product code
  const lower = name.toLowerCase();
  for (const [needle, code] of Object.entries(AWS_INVOICE_NAME_MAP)) {
    if (lower.includes(needle)) return code;
  }
  return null;
}

function classifyAwsServiceLevel(item, ctx) {
  const code = resolveAwsServiceName(item.service);
  const label = item.description || item.service;
  if (!code) { ctx.notOffered.push({ label, cost: item.cost }); return; }
  if (code === "AmazonEC2") { ctx.entries.push(ratioEntry("vm", label, item.cost)); return; }
  if (AWS_UNSUPPORTED[code]) { ctx.notOffered.push({ label: AWS_UNSUPPORTED[code], cost: item.cost }); return; }
  const mapped = AWS_SERVICE_MAP[code];
  if (mapped) { ctx.entries.push(ratioEntry(mapped.service, AWS_DISPLAY_NAMES[code] || label, item.cost)); return; }
  ctx.notOffered.push({ label, cost: item.cost });
}

// ── Azure classification ─────────────────────────────────────────────────────

function azureHoursFromUnit(quantity, unit) {
  const m = String(unit || "").match(/^(\d+)\s*hour/i);
  return m ? quantity * parseInt(m[1], 10) : quantity;
}

function classifyAzureStorage(item, ctx) {
  const sub = (item.usageType || "").toLowerCase();
  const meter = (item.description || "").toLowerCase();

  if (/snapshot/.test(sub) || /snapshot/.test(meter)) {
    ctx.entries.push(entry("backup", "Disk / blob snapshots", item.cost,
      item.quantity * RATES.backupWeeklyPerGb,
      { detail: `${round2(item.quantity)} GB-mo`, note: "Priced at Neviri weekly-backup rate ($0.04/GB)." }));
    return;
  }
  if (/disk/.test(sub) || /disk/.test(meter)) {
    // "P10 LRS Disk" style meters bill per disk-month; convert tier → GB.
    const tier = meter.match(/\b[pes](\d{1,2})\b/);
    const gb = tier ? AZURE_DISK_TIER_GB[parseInt(tier[1], 10)] : null;
    if (gb) {
      ctx.entries.push(entry("blockStorage", `Managed disks (${item.description})`, item.cost,
        gb * item.quantity * RATES.blockStoragePerGbMo,
        { detail: `${round2(item.quantity)} disk-mo × ${gb} GB`, note: "Neviri NVMe block storage at $0.08/GB/mo." }));
    } else if (/gb/i.test(item.unit)) {
      ctx.entries.push(entry("blockStorage", "Managed disks", item.cost,
        item.quantity * RATES.blockStoragePerGbMo,
        { detail: `${round2(item.quantity)} GB-mo`, note: "Neviri NVMe block storage at $0.08/GB/mo." }));
    } else {
      ctx.entries.push(ratioEntry("blockStorage", `Managed disks — ${item.description || "other"}`, item.cost));
    }
    return;
  }
  if (/blob/.test(sub) || /blob/.test(meter)) {
    if (/operations|list|read|write/i.test(meter)) {
      ctx.entries.push(entry("objectStorage", "Blob operations", item.cost, 0,
        { note: "Neviri object storage has no per-request fees." }));
      return;
    }
    ctx.entries.push(entry("objectStorage", "Blob storage", item.cost,
      item.quantity * RATES.objectStoragePerGbMo,
      { detail: `${round2(item.quantity)} GB-mo`, estimated: RATES.objectStorageEstimated,
        note: "Neviri object storage (rate pending final publication)." }));
    return;
  }
  if (/file|queue|table/.test(sub) || /file share/.test(meter)) {
    ctx.notOffered.push({ label: "Azure Files / Queues / Tables", cost: item.cost });
    return;
  }
  ctx.entries.push(ratioEntry("objectStorage", `Storage — ${item.usageType || item.description || "other"}`, item.cost));
}

function classifyAzure(item, ctx) {
  const cat = item.service.toLowerCase();

  if (cat === "storage") return classifyAzureStorage(item, ctx);

  const mapped = AZURE_CATEGORY_MAP[cat];
  if (mapped) {
    switch (mapped.service) {
      case "vm": {
        const sizeSource = item.description || item.usageType;
        const specs = azureInstanceSpecs(sizeSource);
        const hours = azureHoursFromUnit(item.quantity, item.unit);
        if (specs) {
          const { flavor, count } = matchVmFlavor(specs.vcpu, specs.ramGb);
          ctx.entries.push(entry("vm", `Virtual machines (${sizeSource})`, item.cost,
            (hours / HOURS_PER_MONTH) * flavor.priceMo * count, {
              detail: `${round2(hours)} hrs → ${count > 1 ? `${count}× ` : ""}${flavor.flavor}`,
              note: `Mapped to Neviri ${flavor.flavor} (${flavor.vcpu} vCPU / ${flavor.ram} GB RAM).`,
            }));
        } else {
          ctx.entries.push(ratioEntry("vm", `Virtual machines — ${sizeSource || "unrecognized size"}`, item.cost));
        }
        return;
      }
      case "bandwidth": {
        if (/out|egress/i.test(item.description) || /out|egress/i.test(item.usageType)) {
          ctx.egressGb += item.quantity; ctx.egressCost += item.cost; return;
        }
        ctx.entries.push(entry("bandwidth", "Data transfer (inbound / intra-region)", item.cost, 0,
          { note: "Inbound traffic is always free on Neviri." }));
        return;
      }
      case "reservedIp":
        ctx.entries.push(entry("reservedIp", "Public IP addresses", item.cost, 0,
          { note: "IPs assigned to a running resource are free on Neviri; idle reserved IPs bill $3.02/mo." }));
        return;
      case "loadBalancer":
        ctx.entries.push(entry("loadBalancer", item.service, item.cost, 0,
          { note: "Load balancers are included free on Neviri." }));
        return;
      case "networking":
        ctx.entries.push(entry("networking", item.service, item.cost, 0,
          { note: "Networks, routers and security groups are free on Neviri." }));
        return;
      case "managedDatabase":
        ctx.entries.push(ratioEntry("managedDatabase", item.service,
          item.cost, "Estimated — Neviri database plans start at $15/mo (see Databases pricing)."));
        return;
      case "backup": {
        const neviriCost = /gb/i.test(item.unit) ? item.quantity * RATES.backupWeeklyPerGb : item.cost * SERVICE_LEVEL_ESTIMATE_RATIOS.backup;
        ctx.entries.push(entry("backup", "Azure Backup", item.cost, neviriCost,
          { estimated: !/gb/i.test(item.unit), note: "Priced at Neviri backup rates ($0.03–0.04/GB)." }));
        return;
      }
      default:
        ctx.entries.push(ratioEntry(mapped.service, item.service, item.cost));
        return;
    }
  }

  for (const [needle, label] of Object.entries(AZURE_UNSUPPORTED)) {
    if (cat.includes(needle)) { ctx.notOffered.push({ label, cost: item.cost }); return; }
  }
  ctx.notOffered.push({ label: item.service, cost: item.cost });
}

// ── AWS VM group pricing (after all EC2 rows are collected) ──────────────────

function priceAwsVms(ctx) {
  const byType = new Map();
  for (const vm of ctx.vms) {
    const key = vm.instanceType || "(unknown type)";
    const prev = byType.get(key) || { hours: 0, cost: 0 };
    prev.hours += vm.hours || 0;
    prev.cost += vm.cost;
    byType.set(key, prev);
  }
  for (const [type, { hours, cost }] of byType) {
    const specs = awsInstanceSpecs(type);
    if (!specs || !hours) {
      ctx.entries.push(ratioEntry("vm", `EC2 instances — ${type}`, cost));
      continue;
    }
    const { flavor, count } = matchVmFlavor(specs.vcpu, specs.ramGb);
    ctx.entries.push(entry("vm", `EC2 ${type}`, cost,
      (hours / HOURS_PER_MONTH) * flavor.priceMo * count, {
        detail: `${round2(hours)} hrs → ${count > 1 ? `${count}× ` : ""}${flavor.flavor}`,
        note: `Mapped to Neviri ${flavor.flavor} (${flavor.vcpu} vCPU / ${flavor.ram} GB RAM, 25 GB NVMe included).`,
      }));
  }
}

// ── main entry point ─────────────────────────────────────────────────────────

const EXCLUDED_LABELS = { tax: "Taxes", credit: "Credits & refunds", fee: "Fees (RI/Savings Plan, other)", support: "Support plans" };

export function buildComparison(parsed) {
  const ctx = { entries: [], notOffered: [], vms: [], egressGb: 0, egressCost: 0 };
  const excludedMap = new Map();

  for (const item of parsed.items) {
    if (item.excluded) {
      const label = EXCLUDED_LABELS[item.excluded] || "Other non-usage charges";
      excludedMap.set(label, (excludedMap.get(label) || 0) + item.cost);
      continue;
    }
    if (item.cost === 0 && !item.quantity) continue;
    if (parsed.provider === "azure") classifyAzure(item, ctx);
    else if (item.detailLevel === "service") classifyAwsServiceLevel(item, ctx);
    else classifyAwsResource(item, ctx);
  }

  priceAwsVms(ctx);

  if (ctx.egressGb > 0 || ctx.egressCost > 0) {
    const billableGb = Math.max(0, ctx.egressGb - RATES.bandwidthFreeGbPerVm);
    ctx.entries.push(entry("bandwidth", "Data transfer (outbound)", ctx.egressCost,
      billableGb * RATES.bandwidthPerGb, {
        detail: `${round2(ctx.egressGb)} GB`,
        note: `First ${RATES.bandwidthFreeGbPerVm} GB/mo per VM free, then $${RATES.bandwidthPerGb.toFixed(2)}/GB. Allowance applied once (per-VM allowances make real savings higher).`,
      }));
  }

  // Merge same-bucket rows for a tidy report, keeping individual lines.
  const rows = ctx.entries
    .filter((e) => e.providerCost > 0 || e.neviriCost > 0)
    .map((e) => ({
      ...e,
      providerCost: round2(e.providerCost),
      neviriCost: round2(e.neviriCost),
      deltaPct: e.providerCost > 0 ? round2(((e.neviriCost - e.providerCost) / e.providerCost) * 100) : 0,
      serviceLabel: NEVIRI_SERVICES[e.neviriService]?.label || e.neviriService,
    }))
    .sort((a, b) => b.providerCost - a.providerCost);

  const notOffered = [...ctx.notOffered
    .reduce((m, x) => m.set(x.label, (m.get(x.label) || 0) + x.cost), new Map())]
    .map(([label, cost]) => ({ label, cost: round2(cost) }))
    .filter((x) => x.cost > 0)
    .sort((a, b) => b.cost - a.cost);

  const excluded = [...excludedMap].map(([label, cost]) => ({ label, cost: round2(cost) }));

  const comparableProviderCost = round2(rows.reduce((s, r) => s + r.providerCost, 0));
  const comparableNeviriCost = round2(rows.reduce((s, r) => s + r.neviriCost, 0));
  const notOfferedCost = round2(notOffered.reduce((s, r) => s + r.cost, 0));
  const excludedCost = round2(excluded.reduce((s, r) => s + r.cost, 0));
  const analyzedTotal = round2(comparableProviderCost + notOfferedCost);
  const savings = round2(comparableProviderCost - comparableNeviriCost);

  return {
    provider: parsed.provider,
    format: parsed.format,
    detailLevel: parsed.detailLevel,
    rows,
    notOffered,
    excluded,
    totals: {
      billTotal: round2(analyzedTotal + excludedCost),
      analyzedTotal,
      comparableProviderCost,
      comparableNeviriCost,
      notOfferedCost,
      excludedCost,
      savings,
      savingsPct: comparableProviderCost > 0 ? round2((savings / comparableProviderCost) * 100) : 0,
      coveragePct: analyzedTotal > 0 ? round2((comparableProviderCost / analyzedTotal) * 100) : 0,
      hasEstimates: rows.some((r) => r.estimated),
    },
  };
}

// CSV export of the report (client-side download).
export function reportToCsv(report) {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = [
    ["Section", "Item", "Neviri service", "Detail", `${report.provider.toUpperCase()} cost (USD)`, "Neviri cost (USD)", "Difference %", "Estimated"].map(esc).join(","),
  ];
  for (const r of report.rows) {
    lines.push(["Comparable", r.label, r.serviceLabel, r.detail, r.providerCost, r.neviriCost, r.deltaPct, r.estimated ? "yes" : "no"].map(esc).join(","));
  }
  for (const r of report.notOffered) {
    lines.push(["Not available on Neviri", r.label, "—", "", r.cost, "", "", ""].map(esc).join(","));
  }
  for (const r of report.excluded) {
    lines.push(["Excluded from comparison", r.label, "—", "", r.cost, "", "", ""].map(esc).join(","));
  }
  const t = report.totals;
  lines.push(["Totals", "Comparable subtotal", "", "", t.comparableProviderCost, t.comparableNeviriCost, t.savingsPct ? -t.savingsPct : 0, t.hasEstimates ? "contains estimates" : "no"].map(esc).join(","));
  lines.push(["Totals", "Monthly savings with Neviri", "", "", "", t.savings, "", ""].map(esc).join(","));
  return lines.join("\n");
}
