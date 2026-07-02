// Bill parser — turns AWS / Azure billing exports into normalized line items
// the comparison engine can price. Everything here is pure (string in,
// objects out) so it runs identically in the browser and under node --test.
//
// Supported inputs, auto-detected from the CSV header row:
//   • AWS Cost & Usage Report (CUR)        — lineItem/* columns
//   • AWS legacy monthly / cost-allocation — ProductCode + UsageType columns
//   • AWS Cost Explorer export             — Service + cost column(s)
//   • Azure Cost Management usage export   — MeterCategory columns
// Plus plain-text output of AWS / Azure invoice PDFs (service-level totals).
//
// Normalized item shape:
//   { provider, service, usageType, description, instanceType,
//     quantity, unit, cost, detailLevel: 'resource'|'service',
//     excluded?: 'tax'|'credit'|'fee'|'support' }

// ── tiny RFC-4180 CSV parser (quotes, escaped quotes, CRLF, BOM) ─────────────
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  const src = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field); field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else field += ch;
  }
  row.push(field);
  if (row.length > 1 || row[0] !== "") rows.push(row);
  return rows;
}

const num = (v) => {
  if (v === null || v === undefined) return 0;
  const n = parseFloat(String(v).replace(/[$,\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

// Case-insensitive header lookup: returns the index of the first header whose
// normalized form matches any candidate exactly.
function headerIndex(headers, candidates) {
  const norm = headers.map((h) => h.trim().toLowerCase());
  for (const c of candidates) {
    const i = norm.indexOf(c);
    if (i !== -1) return i;
  }
  return -1;
}

export function detectCsvFormat(headers) {
  const norm = headers.map((h) => h.trim().toLowerCase());
  if (norm.includes("lineitem/productcode")) return "aws-cur";
  if (norm.some((h) => h === "metercategory" || h === "meter category")) return "azure-usage";
  if (norm.includes("productcode") && norm.some((h) => h === "usagetype" || h === "usage type"))
    return "aws-monthly";
  const hasService = norm.some((h) => ["service", "service name", "servicename"].includes(h));
  const hasCost = norm.some((h) => /cost|amount|total/.test(h));
  if (hasService && hasCost) return "aws-cost-explorer";
  return null;
}

// Region prefixes like "USW2-", "EUC1-", "APS3-", "USE1-" pollute usage types.
const stripRegion = (usageType) =>
  String(usageType || "").replace(/^[A-Z]{2,5}\d{0,2}-(?=[A-Za-z])/, "");

// Fold near-identical rows (same service/usage/instance) into one item.
function aggregate(items) {
  const map = new Map();
  for (const it of items) {
    // Description is part of the key: Azure distinguishes meters (storage vs
    // operations) only by MeterName, which lands in `description`.
    const key = [it.provider, it.service, it.usageType, it.instanceType, it.description, it.excluded || ""].join("§");
    const prev = map.get(key);
    if (prev) {
      prev.quantity = (prev.quantity || 0) + (it.quantity || 0);
      prev.cost += it.cost;
    } else map.set(key, { ...it });
  }
  return [...map.values()];
}

// ── AWS CUR ──────────────────────────────────────────────────────────────────
function parseAwsCur(rows, headers) {
  const iCode = headerIndex(headers, ["lineitem/productcode"]);
  const iType = headerIndex(headers, ["lineitem/lineitemtype"]);
  const iUsage = headerIndex(headers, ["lineitem/usagetype"]);
  const iAmount = headerIndex(headers, ["lineitem/usageamount"]);
  const iCost = headerIndex(headers, ["lineitem/unblendedcost", "lineitem/blendedcost"]);
  const iInstance = headerIndex(headers, ["product/instancetype", "product/instance type"]);
  const iDesc = headerIndex(headers, ["lineitem/lineitemdescription"]);

  const items = [];
  for (const r of rows) {
    const cost = num(r[iCost]);
    const lineType = (r[iType] || "").trim();
    if (!cost && !num(r[iAmount])) continue;
    const base = {
      provider: "aws",
      service: (r[iCode] || "").trim(),
      usageType: stripRegion(r[iUsage]),
      description: iDesc !== -1 ? (r[iDesc] || "").trim() : "",
      instanceType: iInstance !== -1 ? (r[iInstance] || "").trim() : "",
      quantity: num(r[iAmount]),
      unit: "",
      cost,
      detailLevel: "resource",
    };
    if (/tax/i.test(lineType)) base.excluded = "tax";
    else if (/credit|refund/i.test(lineType)) base.excluded = "credit";
    else if (/fee/i.test(lineType)) base.excluded = "fee";
    items.push(base);
  }
  return items;
}

// ── AWS legacy monthly / cost-allocation report ──────────────────────────────
function parseAwsMonthly(rows, headers) {
  const iRecord = headerIndex(headers, ["recordtype", "record type"]);
  const iCode = headerIndex(headers, ["productcode", "product code"]);
  const iUsage = headerIndex(headers, ["usagetype", "usage type"]);
  const iQty = headerIndex(headers, ["usagequantity", "usage quantity"]);
  const iCost = headerIndex(headers, ["totalcost", "costbeforetax", "unblendedcost", "cost"]);
  const iDesc = headerIndex(headers, ["itemdescription", "item description"]);

  const items = [];
  for (const r of rows) {
    const record = iRecord !== -1 ? (r[iRecord] || "").trim().toLowerCase() : "lineitem";
    if (/total|rounding/.test(record)) continue;
    const service = (r[iCode] || "").trim();
    if (!service) continue;
    const usageType = stripRegion(r[iUsage]);
    const desc = iDesc !== -1 ? (r[iDesc] || "").trim() : "";
    const instMatch = usageType.match(/(?:BoxUsage|SpotUsage|HeavyUsage|DedicatedUsage|InstanceUsage|Multi-AZUsage):([a-z0-9.]+)/i);
    const item = {
      provider: "aws",
      service,
      usageType,
      description: desc,
      instanceType: instMatch ? instMatch[1] : "",
      quantity: num(r[iQty]),
      unit: "",
      cost: num(r[iCost]),
      detailLevel: "resource",
    };
    if (/^tax/i.test(usageType) || /vat|sales tax/i.test(desc)) item.excluded = "tax";
    if (item.cost < 0) item.excluded = "credit";
    items.push(item);
  }
  return items;
}

// ── AWS Cost Explorer export (service-level only) ────────────────────────────
function parseAwsCostExplorer(rows, headers) {
  const iService = headerIndex(headers, ["service", "service name", "servicename"]);
  const costIdx = headers
    .map((h, i) => (/cost|amount|total/i.test(h) ? i : -1))
    .filter((i) => i !== -1);

  const items = [];
  for (const r of rows) {
    const name = (r[iService] || "").trim();
    if (!name || /^total/i.test(name)) continue;
    const cost = costIdx.reduce((s, i) => s + num(r[i]), 0);
    if (!cost) continue;
    items.push({
      provider: "aws",
      service: name, // marketing name — engine resolves via invoice-name map
      usageType: "",
      description: name,
      instanceType: "",
      quantity: 0,
      unit: "",
      cost,
      detailLevel: "service",
      ...( /tax/i.test(name) ? { excluded: "tax" } : {} ),
      ...( /support/i.test(name) ? { excluded: "support" } : {} ),
    });
  }
  return items;
}

// ── Azure Cost Management usage export ───────────────────────────────────────
function parseAzureUsage(rows, headers) {
  const iCat = headerIndex(headers, ["metercategory", "meter category"]);
  const iSub = headerIndex(headers, ["metersubcategory", "meter subcategory", "meter sub-category"]);
  const iName = headerIndex(headers, ["metername", "meter name"]);
  const iQty = headerIndex(headers, ["quantity", "consumedquantity", "usagequantity"]);
  const iCost = headerIndex(headers, [
    "costinbillingcurrency", "cost", "pretaxcost", "costinusd", "extendedcost",
  ]);
  const iUnit = headerIndex(headers, ["unitofmeasure", "unit of measure", "unit"]);

  const items = [];
  for (const r of rows) {
    const category = (r[iCat] || "").trim();
    if (!category) continue;
    items.push({
      provider: "azure",
      service: category,
      usageType: iSub !== -1 ? (r[iSub] || "").trim() : "",
      description: iName !== -1 ? (r[iName] || "").trim() : "",
      instanceType: "", // engine derives VM size from meter name/subcategory
      quantity: num(r[iQty]),
      unit: iUnit !== -1 ? (r[iUnit] || "").trim() : "",
      cost: num(r[iCost]),
      detailLevel: "resource",
    });
  }
  return items;
}

export function parseBillCsv(text) {
  const rows = parseCsv(text);
  if (rows.length < 2) {
    return { ok: false, error: "The file looks empty — export a billing CSV with at least one data row." };
  }
  const headers = rows[0];
  const format = detectCsvFormat(headers);
  if (!format) {
    return {
      ok: false,
      error:
        "Couldn't recognize this CSV. Supported: AWS Cost & Usage Report, AWS monthly report, AWS Cost Explorer export, or an Azure Cost Management usage export.",
    };
  }
  const body = rows.slice(1);
  let items;
  if (format === "aws-cur") items = parseAwsCur(body, headers);
  else if (format === "aws-monthly") items = parseAwsMonthly(body, headers);
  else if (format === "aws-cost-explorer") items = parseAwsCostExplorer(body, headers);
  else items = parseAzureUsage(body, headers);

  items = aggregate(items);
  if (!items.length) {
    return { ok: false, error: "No billable line items found in this file." };
  }
  return {
    ok: true,
    provider: format === "azure-usage" ? "azure" : "aws",
    format,
    detailLevel: format === "aws-cost-explorer" ? "service" : "resource",
    items,
  };
}

// ── PDF invoices (plain text already extracted by pdf.js in the browser) ─────
// Invoices only carry service-level totals, so everything comes back at
// detailLevel "service" and the engine prices it with labeled estimates.

const MONEY_LINE = /^(.*?)\s+(?:USD|INR|EUR|\$|₹|€)?\s*\$?\s*([\d][\d,]*\.\d{2})\s*(?:USD)?$/;
const SKIP_LINE = /total|amount due|balance|invoice|payment|summary|subtotal|page \d|due date/i;

export function parseInvoiceText(text) {
  const lower = text.toLowerCase();
  const provider = /microsoft azure|azure portal|microsoft corporation/.test(lower)
    ? "azure"
    : /amazon web services|aws, inc|aws emea/.test(lower)
      ? "aws"
      : null;
  if (!provider) {
    return {
      ok: false,
      error:
        "Couldn't identify this PDF as an AWS or Azure invoice. Try the CSV export instead — it also gives a much more precise comparison.",
    };
  }

  const items = [];
  for (const raw of text.split(/\n+/)) {
    const line = raw.trim();
    if (!line || SKIP_LINE.test(line)) continue;
    const m = line.match(MONEY_LINE);
    if (!m) continue;
    const label = m[1].replace(/[.·…]+$/g, "").trim();
    const cost = num(m[2]);
    if (!label || label.length < 3 || !cost) continue;
    const isTax = /tax|vat|gst/i.test(label);
    items.push({
      provider,
      service: label,
      usageType: "",
      description: label,
      instanceType: "",
      quantity: 0,
      unit: "",
      cost,
      detailLevel: "service",
      ...(isTax ? { excluded: "tax" } : {}),
    });
  }
  if (!items.length) {
    return {
      ok: false,
      error:
        "No charge lines found in this PDF. Scanned/image invoices aren't supported — upload the CSV export for a precise comparison.",
    };
  }
  return { ok: true, provider, format: `${provider}-invoice-pdf`, detailLevel: "service", items: aggregate(items) };
}
