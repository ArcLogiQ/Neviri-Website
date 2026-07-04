"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Server,
  Globe,
  HardDrive,
  Shield,
  Zap,
  Activity,
  Database,
  Lock,
  CheckCircle2,
  BarChart2,
  Wifi,
  ChevronRight,
  Cpu,
  ChevronDown,
  Calculator
} from "lucide-react";
import BillAnalyzer from "./BillAnalyzer";

// Basic Burstable Pricing (from PDF Table 5)
const BASIC_VM_PRICING = [
  { flavor: "t2.nano",   vcpu: 1, ram: 0.5, priceMo: 4.26,   priceHr: 4.26 / 730 },
  { flavor: "t2.micro",  vcpu: 1, ram: 1,   priceMo: 8.53,   priceHr: 8.53 / 730 },
  { flavor: "t2.small",  vcpu: 1, ram: 2,   priceMo: 17.05,  priceHr: 17.05 / 730 },
  { flavor: "t2.medium", vcpu: 2, ram: 4,   priceMo: 34.11,  priceHr: 34.11 / 730 },
  { flavor: "t2.large",  vcpu: 4, ram: 8,   priceMo: 68.21,  priceHr: 68.21 / 730 },
  { flavor: "t2.xlarge", vcpu: 8, ram: 16,  priceMo: 136.42, priceHr: 136.42 / 730 },
];

// Premium Compute Pricing (from PDF Table 4)
const PREMIUM_VM_PRICING = [
  { flavor: "c5.large",    vcpu: 2,  ram: 4,  priceMo: 57.23,   priceHr: 57.23 / 730 },
  { flavor: "c5.xlarge",   vcpu: 4,  ram: 8,  priceMo: 114.46,  priceHr: 114.46 / 730 },
  { flavor: "c5.2xlarge",  vcpu: 8,  ram: 16, priceMo: 228.93,  priceHr: 228.93 / 730 },
  { flavor: "c5.4xlarge",  vcpu: 16, ram: 32, priceMo: 457.86,  priceHr: 457.86 / 730 },
  { flavor: "c5.9xlarge",  vcpu: 36, ram: 72, priceMo: 1030.18, priceHr: 1030.18 / 730 },
  { flavor: "c5.12xlarge", vcpu: 48, ram: 96, priceMo: 1373.57, priceHr: 1373.57 / 730 },
];

const BANDWIDTH_COMPARISON = [
  { usage: 100,   neviri: 0.00,    do: 0.00,   aws: 0.00,    akamai: 0.00,  neviriVsDo: 0.00,    neviriVsAws: 0.00    },
  { usage: 250,   neviri: 7.50,    do: 0.00,   aws: 13.50,   akamai: 0.00,  neviriVsDo: 7.50,    neviriVsAws: -6.00   },
  { usage: 500,   neviri: 20.00,   do: 0.00,   aws: 36.00,   akamai: 0.00,  neviriVsDo: 20.00,   neviriVsAws: -16.00  },
  { usage: 1000,  neviri: 45.00,   do: 5.00,   aws: 81.00,   akamai: 0.00,  neviriVsDo: 40.00,   neviriVsAws: -36.00  },
  { usage: 2000,  neviri: 95.00,   do: 15.00,  aws: 171.00,  akamai: 5.00,  neviriVsDo: 80.00,   neviriVsAws: -76.00  },
  { usage: 5000,  neviri: 245.00,  do: 45.00,  aws: 441.00,  akamai: 20.00, neviriVsDo: 200.00,  neviriVsAws: -196.00 },
  { usage: 10000, neviri: 495.00,  do: 95.00,  aws: 891.00,  akamai: 45.00, neviriVsDo: 400.00,  neviriVsAws: -396.00 },
  { usage: 50000, neviri: 2495.00, do: 495.00, aws: 4491.00, akamai: 245.00,neviriVsDo: 2000.00, neviriVsAws: -1996.00},
];

const RESERVED_IP = [
  { label: "Hourly rate (idle)", neviri: "$0.0042", do: "$0.0060", aws: "$0.0050", azure: "$0.0040" },
  { label: "Monthly (idle)",     neviri: "$3.02",   do: "$4.32",   aws: "$3.60",   azure: "$2.88"   },
  { label: "When assigned",      neviri: "Free",    do: "Free",    aws: "Free",    azure: "Free"    },
];

const TABS = [
  { label: "Compute",            icon: Server },
  { label: "Networking",         icon: Globe },
  { label: "Storage & Security", icon: HardDrive },
  { label: "Bandwidth Analysis", icon: BarChart2 },
  { label: "Compare Your Bill",  icon: Calculator },
];

const QUICK_SELECT_OPTIONS = [25];
const BASE_INCLUDED_STORAGE = 25;

function formatDelta(val) {
  if (val === 0) return "$0.00";
  return val > 0 ? `+$${val.toFixed(2)}` : `-$${Math.abs(val).toFixed(2)}`;
}

function PillGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      <div className="flex gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${
              value === opt
                ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:border-sky-300 hover:text-sky-600"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function PricingRow({ vm, billing }) {
  const [storageGb, setStorageGb] = useState(BASE_INCLUDED_STORAGE);
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQuickSelect = (gb) => {
    setStorageGb(gb);
    setIsOpen(false);
    setCustomInput("");
  };

  const handleApplyCustom = () => {
    const value = parseInt(customInput, 10);
    if (!isNaN(value) && value > 0) {
      setStorageGb(value);
      setIsOpen(false);
    }
  };

  const extraGb = Math.max(0, storageGb - BASE_INCLUDED_STORAGE);
  const extraCostMo = extraGb * 730 * 0.00011;
  const extraCostHr = extraGb * 0.00011;

  const totalMo = vm.priceMo + extraCostMo;
  const totalHr = vm.priceHr + extraCostHr;

  return (
    <tr className="hover:bg-sky-50/50 transition-colors duration-150 relative">
      <td className="px-6 py-4"><span className="font-mono font-semibold text-[#0F172A] text-sm">{vm.flavor}</span></td>
      <td className="px-6 py-4 text-center">
        <span className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-slate-700">
          <Cpu className="h-3.5 w-3.5 text-slate-400" />{vm.vcpu} vCPU
        </span>
      </td>
      <td className="px-6 py-4 text-center font-medium text-slate-700">{vm.ram} GB</td>
      
      <td className="px-6 py-4 text-center relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-2 px-4 py-1.5 border rounded-lg text-sm font-bold transition-all ${
            isOpen 
              ? "bg-sky-50 border-sky-300 text-[#2186d4]" 
              : "bg-white border-sky-300 text-[#2186d4] hover:bg-sky-50"
          }`}
        >
          <HardDrive className="h-4 w-4" />
          {storageGb >= 1024 ? `${storageGb / 1024} TB` : `${storageGb} GB`}
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-[80%] left-1/2 -translate-x-1/2 mt-2 w-[280px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 z-[999] p-5 text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Select</p>
              <div className="grid grid-cols-1 gap-2">
                {QUICK_SELECT_OPTIONS.map((val) => (
                  <button
                    key={val}
                    onClick={() => handleQuickSelect(val)}
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-bold bg-[#278be1] hover:bg-[#1f7ac8] text-white transition-colors shadow-sm"
                  >
                    {val >= 1024 ? `${val / 1024} TB` : `${val} GB`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Custom Storage</p>
              <div className="flex flex-col gap-3">
                <div className="relative flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#278be1] focus-within:ring-1 focus-within:ring-[#278be1] transition-all">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => {
                      if (e.target.value === "" || /^\d+$/.test(e.target.value)) {
                        setCustomInput(e.target.value);
                      }
                    }}
                    placeholder="e.g. 200"
                    className="w-full bg-white text-gray-700 py-2.5 pl-4 pr-12 focus:outline-none text-sm font-medium"
                  />
                  <span className="absolute right-4 text-gray-400 text-sm font-bold pointer-events-none">GB</span>
                </div>
                <button
                  onClick={handleApplyCustom}
                  className="w-full bg-[#278be1] hover:bg-[#1f7ac8] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </td>
      
      <td className="px-6 py-4 text-right">
        <span className="text-lg font-extrabold text-[#0F172A]">${billing === "Monthly" ? totalMo.toFixed(2) : totalHr.toFixed(3)}</span>
        <span className="text-xs text-gray-400 font-medium ml-1">/{billing === "Monthly" ? "mo" : "hr"}</span>
      </td>
    </tr>
  );
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("Compute");
  const [billing, setBilling]     = useState("Monthly");
  const [workload, setWorkload]   = useState("Basic");

  // Determine which data source to use based on the selected workload pill
  const activePricingData = workload === "Premium" ? PREMIUM_VM_PRICING : BASIC_VM_PRICING;

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  return (
    <div className="flex flex-col min-h-screen" style={gridBg}>

      {/* ── HERO ── */}
      <header className="relative pt-16 pb-12 text-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[280px] bg-sky-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4 leading-tight">
            Clear Cloud Pricing,<br />
            <span className="text-sky-600">No Hidden Fees</span>
          </h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed mb-6">
            Pay only for what you use. Transparent billing with no surprises — hourly or monthly.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {["Pay-as-you-go", "No hidden fees", "Instant activation"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600 shadow-sm">
                <CheckCircle2 className="h-3 w-3 text-sky-500" /> {b}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── STICKY TABS ── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {TABS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`relative flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === label
                  ? "text-sky-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {activeTab === label && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-10 space-y-16 pb-24">

        {/* ══════════ COMPUTE ══════════ */}
        {activeTab === "Compute" && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Neviri Compute</h2>
              <p className="text-sm text-gray-500">First 25 GB SSD is free with every VM. Adjust storage to see total cost.</p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 items-center mb-5 px-5 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <PillGroup 
                label="Workload" 
                options={["Basic", "Premium"]} 
                value={workload} 
                onChange={setWorkload} 
              />
              <div className="h-5 w-px bg-gray-200 hidden md:block" />
              <PillGroup 
                label="Billing" 
                options={["Hourly", "Monthly"]} 
                value={billing} 
                onChange={setBilling} 
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
              <div className="overflow-visible">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 rounded-t-2xl">
                      {["PLAN", "vCPU", "RAM", "DISK", "PRICE"].map((h, i) => (
                        <th key={h} className={`px-6 py-4 text-[11px] font-bold tracking-widest text-gray-400 uppercase ${i === 0 ? "text-left" : i === 4 ? "text-right" : "text-center"}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {activePricingData.map((vm) => (
                      <PricingRow key={vm.flavor} vm={vm} billing={billing} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ══════════ NETWORKING ══════════ */}
        {activeTab === "Networking" && (
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Bandwidth & Networking</h2>
              <p className="text-sm text-gray-500">Inbound is always free. 100 GB outbound included every month.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Network Inbound",        value: "Free",   sub: "Always free, unlimited",    color: "green" },
                { label: "First 100 GB Outbound",  value: "Free",   sub: "Per month, per VM",         color: "green" },
                { label: "Outbound Overage",        value: "$0.05",  sub: "Per GB beyond 100 GB/mo",   color: "sky"   },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-sky-200 hover:shadow-md transition-all duration-200">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{item.label}</p>
                  <p className={`text-3xl font-extrabold mb-1 ${item.color === "green" ? "text-green-500" : "text-sky-600"}`}>{item.value}</p>
                  <p className="text-xs text-gray-400 font-medium">{item.sub}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2"><Wifi className="h-5 w-5 text-sky-500" />Reserved IP Pricing</h3>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {["Metric", "Neviri", "DigitalOcean", "AWS", "Azure / GCP"].map((h, i) => (
                          <th key={h} className={`px-6 py-4 text-[11px] font-bold tracking-widest uppercase ${i === 0 ? "text-left text-gray-400" : i === 1 ? "text-center text-sky-600" : "text-center text-gray-400"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {RESERVED_IP.map((row) => (
                        <tr key={row.label} className="hover:bg-sky-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-[#0F172A]">{row.label}</td>
                          {[row.neviri, row.do, row.aws, row.azure].map((val, i) => (
                            <td key={i} className="px-6 py-4 text-center">
                              {val === "Free" ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-200"><CheckCircle2 className="h-3 w-3" /> Free</span>
                              ) : (
                                <span className={`font-bold text-sm ${i === 0 ? "text-sky-700" : "text-gray-500"}`}>{val}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════ STORAGE & SECURITY ══════════ */}
        {activeTab === "Storage & Security" && (
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Storage & Security</h2>
              <p className="text-sm text-gray-500">Block storage, automated backups, and SSL — all built in.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-sky-200 transition-all duration-200 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-100">
                    <HardDrive className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg leading-tight">Block Storage Rates</h3>
                    <p className="text-xs text-gray-500">Additional volumes, any size</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-sky-50 border border-sky-100">
                  <div>
                    <p className="font-semibold text-sky-900 text-sm">NVMe Storage</p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-xs font-medium text-sky-600 bg-white px-2 py-0.5 rounded border border-sky-200">
                      $0.00011 / hr
                    </span>
                    <span className="font-extrabold text-sky-700 text-xl">$0.08<span className="text-sm font-medium text-gray-400"> /GB/mo</span></span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-sky-200 transition-all duration-200">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-100">
                    <Shield className="h-5 w-5 text-sky-600" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-lg">Backups</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Daily Backup",  price: "$0.03", unit: "/GB" },
                    { label: "Weekly Backup", price: "$0.04", unit: "/GB" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="font-semibold text-[#0F172A] text-sm">{item.label}</p>
                      <p className="font-extrabold text-sky-700 text-lg">{item.price}<span className="text-xs font-medium text-gray-400">{item.unit}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-r from-sky-600 to-sky-700 rounded-2xl p-8 overflow-hidden shadow-lg shadow-sky-200">
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none">
                <Lock className="w-40 h-40" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-sky-200 text-[10px] font-bold uppercase tracking-widest mb-2">Included Free</p>
                  <h3 className="text-2xl font-extrabold text-white mb-2">Load Balancers & SSL Certificates</h3>
                  <p className="text-sky-100 text-sm max-w-md leading-relaxed">
                    Distribute traffic across your VMs and secure every connection with auto-provisioned SSL — zero configuration required.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 shrink-0">
                  {["SSL Certificate", "Auto-renewal", "Load Balancer"].map((f) => (
                    <span key={f} className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                      <CheckCircle2 className="h-4 w-4 text-sky-300" /> {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════ BANDWIDTH ANALYSIS ══════════ */}
        {activeTab === "Bandwidth Analysis" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Monthly Bandwidth Cost Comparison</h2>
              <p className="text-sm text-gray-500">Neviri vs DigitalOcean, AWS, and Akamai across usage tiers</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {["Usage (GB)", "Neviri", "DigitalOcean", "AWS", "Akamai", "vs DO", "vs AWS"].map((h, i) => (
                        <th key={h} className={`px-5 py-4 text-[11px] font-bold uppercase tracking-widest ${
                          i === 0 ? "text-left text-gray-400"
                          : i === 1 ? "text-right text-sky-600"
                          : "text-right text-gray-400"
                        }`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {BANDWIDTH_COMPARISON.map((row) => (
                      <tr key={row.usage} className="hover:bg-sky-50/50 transition-colors">
                        <td className="px-5 py-3.5 font-bold text-[#0F172A]">{row.usage.toLocaleString()}</td>
                        <td className="px-5 py-3.5 text-right font-extrabold text-sky-700">${row.neviri.toFixed(2)}</td>
                        <td className="px-5 py-3.5 text-right text-gray-500">${row.do.toFixed(2)}</td>
                        <td className="px-5 py-3.5 text-right text-gray-500">${row.aws.toFixed(2)}</td>
                        <td className="px-5 py-3.5 text-right text-gray-500">${row.akamai.toFixed(2)}</td>
                        <td className={`px-5 py-3.5 text-right font-bold ${row.neviriVsDo > 0 ? "text-red-500" : "text-green-600"}`}>
                          {formatDelta(row.neviriVsDo)}
                        </td>
                        <td className={`px-5 py-3.5 text-right font-bold ${row.neviriVsAws < 0 ? "text-green-600" : "text-red-500"}`}>
                          {formatDelta(row.neviriVsAws)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ══════════ COMPARE YOUR BILL ══════════ */}
        {activeTab === "Compare Your Bill" && <BillAnalyzer />}

        {/* ── FAQ ── */}
        <section className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: "Can I switch between hourly and monthly billing?",  a: "Yes. Change your billing preference at any time from your dashboard with no penalty." },
              { q: "Are there any setup or hidden fees?",               a: "No. You only pay for the resources you use. All pricing shown is fully inclusive." },
              { q: "What happens if I exceed my bandwidth?",            a: "Outbound traffic beyond 100 GB/mo is billed at $0.05/GB. Inbound is always free." },
              { q: "Can I scale resources up or down?",                 a: "Yes. Resize compute, storage, and networking instantly with zero downtime." },
              { q: "Can I migrate my existing workloads to Neviri?",    a: "Yes. You can migrate websites, applications, and workloads with minimal downtime." },
              { q: "Where are Neviri data centers located?",            a: "Neviri operates data centers in multiple locations for high availability and low latency." },
            ].map((item) => (
              <div key={item.q} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-sky-200 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-4 w-4 text-sky-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm mb-1.5">{item.q}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
