"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  FileSpreadsheet,
  ShieldCheck,
  TrendingDown,
  PieChart,
  XCircle,
  Info,
  Download,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { parseBillCsv, parseInvoiceText } from "@/lib/billParser.mjs";
import { buildComparison, reportToCsv } from "@/lib/comparisonEngine.mjs";
import { APP_SIGNUP_URL } from "@/config/api";

const PROVIDER_LABELS = { aws: "AWS", azure: "Azure" };

const money = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

// Extract text from a PDF invoice entirely in the browser. Lines are rebuilt
// from glyph Y-coordinates so "Service name .... $123.45" stays on one line.
async function extractPdfText(file) {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  let text = "";
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const lines = [];
    let lastY = null;
    let line = [];
    for (const item of content.items) {
      const y = Math.round(item.transform[5]);
      if (lastY !== null && Math.abs(y - lastY) > 2 && line.length) {
        lines.push(line.join(" "));
        line = [];
      }
      if (item.str && item.str.trim()) line.push(item.str.trim());
      lastY = y;
    }
    if (line.length) lines.push(line.join(" "));
    text += lines.join("\n") + "\n";
  }
  return text;
}

function DeltaBadge({ pct, free }) {
  if (free) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-200">
        <CheckCircle2 className="h-3 w-3" /> Free
      </span>
    );
  }
  const saving = pct < 0;
  const same = pct === 0;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full border ${
        same
          ? "bg-gray-50 text-gray-500 border-gray-200"
          : saving
            ? "bg-green-50 text-green-600 border-green-200"
            : "bg-red-50 text-red-500 border-red-200"
      }`}
    >
      {same ? "same" : `${pct > 0 ? "+" : ""}${pct.toFixed(0)}%`}
    </span>
  );
}

function SummaryCard({ label, value, sub, tone = "sky", icon: Icon }) {
  const tones = {
    green: "text-green-500",
    sky: "text-sky-600",
    amber: "text-amber-500",
    slate: "text-slate-700",
  };
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className={`h-4 w-4 ${tones[tone]}`} />}
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
      </div>
      <p className={`text-3xl font-extrabold mb-1 ${tones[tone]}`}>{value}</p>
      <p className="text-xs text-gray-400 font-medium">{sub}</p>
    </div>
  );
}

export default function BillAnalyzer() {
  const [state, setState] = useState("idle"); // idle | working | done | error
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const analyze = useCallback(async (file) => {
    setState("working");
    setError("");
    setFileName(file.name);
    try {
      let parsed;
      if (/\.pdf$/i.test(file.name)) {
        const text = await extractPdfText(file);
        parsed = parseInvoiceText(text);
      } else {
        parsed = parseBillCsv(await file.text());
      }
      if (!parsed.ok) {
        setError(parsed.error);
        setState("error");
        return;
      }
      setReport(buildComparison(parsed));
      setState("done");
    } catch (e) {
      console.error("[Bill Analyzer]", e);
      setError(
        /\.pdf$/i.test(file.name)
          ? "Couldn't read this PDF. Scanned/image invoices aren't supported — try the CSV export instead."
          : "Something went wrong reading this file. Make sure it's a billing CSV or PDF invoice."
      );
      setState("error");
    }
  }, []);

  const loadSample = useCallback(
    async (name, label) => {
      setState("working");
      setError("");
      setFileName(label);
      try {
        const res = await fetch(`/samples/${name}`);
        const text = await res.text();
        const parsed = parseBillCsv(text);
        if (!parsed.ok) throw new Error(parsed.error);
        setReport(buildComparison(parsed));
        setState("done");
      } catch (e) {
        console.error("[Bill Analyzer]", e);
        setError("Couldn't load the sample bill. Please try again.");
        setState("error");
      }
    },
    []
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer?.files?.[0];
      if (file) analyze(file);
    },
    [analyze]
  );

  const downloadCsv = useCallback(() => {
    if (!report) return;
    const blob = new Blob([reportToCsv(report)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "neviri-cost-comparison.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [report]);

  const reset = () => {
    setState("idle");
    setReport(null);
    setError("");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const provider = report ? PROVIDER_LABELS[report.provider] || "your cloud" : "";
  const t = report?.totals;

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Compare Your Cloud Bill</h2>
        <p className="text-sm text-gray-500 max-w-2xl">
          Upload your AWS or Azure bill and get a line-by-line comparison against Neviri pricing —
          including an honest list of anything Neviri doesn&apos;t offer yet.
        </p>
      </div>

      {state !== "done" && (
        <>
          {/* ── UPLOAD ── */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => state !== "working" && inputRef.current?.click()}
            className={`relative cursor-pointer bg-white border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 ${
              dragOver ? "border-sky-500 bg-sky-50/50" : "border-gray-300 hover:border-sky-400 hover:bg-sky-50/30"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && analyze(e.target.files[0])}
            />
            {state === "working" ? (
              <div className="flex flex-col items-center gap-3 py-2">
                <RefreshCw className="h-8 w-8 text-sky-500 animate-spin" />
                <p className="text-sm font-semibold text-slate-600">Analyzing {fileName}…</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
                  <UploadCloud className="h-8 w-8 text-sky-600" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#0F172A]">
                    Drop your AWS or Azure bill here, or click to browse
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    CSV exports give an exact match (Cost &amp; Usage Report, monthly report, Cost
                    Explorer, Azure Cost Management) · PDF invoices give a service-level estimate
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-1 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">
                    100% private — your bill is analyzed in your browser and never uploaded
                  </span>
                </div>
              </div>
            )}
          </div>

          {state === "error" && (
            <div className="flex items-start gap-3 px-5 py-4 bg-red-50 border border-red-200 rounded-2xl">
              <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* ── SAMPLES ── */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              No bill handy? Try a demo:
            </span>
            <button
              onClick={() => loadSample("aws-sample-bill.csv", "Sample AWS bill")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-sky-300 hover:text-sky-600 transition-all shadow-sm"
            >
              <FileSpreadsheet className="h-4 w-4 text-[#FF9900]" /> Sample AWS bill
            </button>
            <button
              onClick={() => loadSample("azure-sample-bill.csv", "Sample Azure bill")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-sky-300 hover:text-sky-600 transition-all shadow-sm"
            >
              <FileSpreadsheet className="h-4 w-4 text-[#0078D4]" /> Sample Azure bill
            </button>
          </div>
        </>
      )}

      {state === "done" && report && (
        <div className="space-y-8">
          {/* ── HEADER ROW ── */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4 text-sky-500" />
              <span className="font-semibold text-slate-700">{fileName}</span>
              <span>· {provider} bill</span>
              {report.detailLevel === "service" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-full text-[11px] font-bold text-amber-600">
                  service-level estimate
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={downloadCsv}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-sky-300 hover:text-sky-600 transition-all shadow-sm"
              >
                <Download className="h-4 w-4" /> Download report
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-sky-300 hover:text-sky-600 transition-all shadow-sm"
              >
                <RefreshCw className="h-4 w-4" /> Analyze another bill
              </button>
            </div>
          </div>

          {/* ── SUMMARY CARDS ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard
              icon={TrendingDown}
              tone={t.savings >= 0 ? "green" : "amber"}
              label="Monthly savings with Neviri"
              value={`${money(Math.abs(t.savings))}${t.savings < 0 ? " more" : ""}`}
              sub={
                t.comparableProviderCost > 0
                  ? `${Math.abs(t.savingsPct).toFixed(0)}% ${t.savings >= 0 ? "cheaper" : "more"} on comparable services (${money(t.comparableProviderCost)} → ${money(t.comparableNeviriCost)})`
                  : "No comparable services found"
              }
            />
            <SummaryCard
              icon={PieChart}
              tone="sky"
              label="Bill coverage"
              value={`${t.coveragePct.toFixed(0)}%`}
              sub={`${money(t.comparableProviderCost)} of your ${money(t.analyzedTotal)} usage maps to Neviri services`}
            />
            <SummaryCard
              icon={AlertTriangle}
              tone={t.notOfferedCost > 0 ? "amber" : "slate"}
              label="Not available on Neviri"
              value={money(t.notOfferedCost)}
              sub={
                report.notOffered.length
                  ? `${report.notOffered.length} service${report.notOffered.length > 1 ? "s" : ""} without a Neviri equivalent`
                  : "Everything on this bill has a Neviri equivalent"
              }
            />
          </div>

          {/* ── COMPARABLE TABLE ── */}
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sky-500" />
              Services you can move to Neviri
            </h3>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {["Item", "Neviri equivalent", `${provider} cost`, "Neviri cost", "Difference"].map((h, i) => (
                        <th
                          key={h}
                          className={`px-5 py-4 text-[11px] font-bold tracking-widest uppercase ${
                            i === 0 ? "text-left text-gray-400" : i === 3 ? "text-right text-sky-600" : i === 2 ? "text-right text-gray-400" : i === 4 ? "text-center text-gray-400" : "text-left text-gray-400"
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {report.rows.map((r, i) => (
                      <tr key={i} className="hover:bg-sky-50/50 transition-colors align-top">
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-[#0F172A]">
                            {r.label}
                            {r.estimated && (
                              <span className="ml-2 inline-flex px-1.5 py-0.5 bg-amber-50 border border-amber-200 rounded text-[10px] font-bold text-amber-600 align-middle">
                                est.
                              </span>
                            )}
                          </p>
                          {r.detail && <p className="text-xs text-gray-400 mt-0.5">{r.detail}</p>}
                          {r.note && (
                            <p className="text-xs text-gray-400 mt-0.5 flex items-start gap-1 max-w-md">
                              <Info className="h-3 w-3 mt-0.5 shrink-0" /> {r.note}
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 font-medium whitespace-nowrap">{r.serviceLabel}</td>
                        <td className="px-5 py-3.5 text-right text-gray-500 font-semibold whitespace-nowrap">{money(r.providerCost)}</td>
                        <td className="px-5 py-3.5 text-right font-extrabold text-sky-700 whitespace-nowrap">{money(r.neviriCost)}</td>
                        <td className="px-5 py-3.5 text-center">
                          <DeltaBadge pct={r.deltaPct} free={r.neviriCost === 0 && r.providerCost > 0} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-sky-50/60 border-t-2 border-sky-100">
                      <td className="px-5 py-4 font-extrabold text-[#0F172A]" colSpan={2}>
                        Comparable subtotal
                      </td>
                      <td className="px-5 py-4 text-right font-extrabold text-gray-500">{money(t.comparableProviderCost)}</td>
                      <td className="px-5 py-4 text-right font-extrabold text-sky-700">{money(t.comparableNeviriCost)}</td>
                      <td className="px-5 py-4 text-center">
                        <DeltaBadge pct={-t.savingsPct} free={false} />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* ── NOT OFFERED ── */}
          {report.notOffered.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-1 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Not available on Neviri
              </h3>
              <p className="text-xs text-gray-500 mb-4 max-w-2xl">
                We&apos;re honest about gaps: these {provider} services have no Neviri equivalent
                today, so {money(t.notOfferedCost)}/mo of your bill would stay where it is (or need
                a third-party alternative).
              </p>
              <div className="bg-white border border-amber-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-amber-100/70">
                {report.notOffered.map((x) => (
                  <div key={x.label} className="flex items-center justify-between px-5 py-3">
                    <span className="text-sm font-semibold text-slate-700">{x.label}</span>
                    <span className="text-sm font-bold text-amber-600">{money(x.cost)}/mo</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── EXCLUDED ── */}
          {report.excluded.length > 0 && (
            <p className="text-xs text-gray-400">
              Excluded from the comparison:{" "}
              {report.excluded.map((x) => `${x.label} (${money(x.cost)})`).join(" · ")} — taxes,
              credits and support plans depend on your account, not the platform.
            </p>
          )}

          {/* ── CTA ── */}
          {t.savings > 0 && (
            <div className="relative bg-gradient-to-r from-sky-600 to-sky-700 rounded-2xl p-8 overflow-hidden shadow-lg shadow-sky-200">
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none">
                <TrendingDown className="w-40 h-40" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-sky-200 text-[10px] font-bold uppercase tracking-widest mb-2">
                    Your potential savings
                  </p>
                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    Save {money(t.savings)} every month — {money(t.savings * 12)} a year
                  </h3>
                  <p className="text-sky-100 text-sm max-w-md leading-relaxed">
                    Move the {money(t.comparableProviderCost)} of comparable workloads to Neviri and
                    pay {money(t.comparableNeviriCost)} — with free load balancers, SSL and
                    inbound traffic included.
                  </p>
                </div>
                <a
                  href={APP_SIGNUP_URL}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-700 rounded-xl text-sm font-extrabold hover:bg-sky-50 transition-all shadow-sm shrink-0"
                >
                  Start saving — Sign up free <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}

          {/* ── DISCLAIMER ── */}
          <p className="text-[11px] text-gray-400 leading-relaxed max-w-3xl">
            Comparison uses your bill&apos;s actual usage where available and published Neviri
            list prices. Rows marked <span className="font-bold">est.</span> are estimates based on
            typical pricing ratios — upload a detailed CSV export for exact figures. Provider costs
            reflect what you were charged (including any discounts you already receive). This is an
            indicative comparison, not a binding quote.
          </p>
        </div>
      )}
    </section>
  );
}
