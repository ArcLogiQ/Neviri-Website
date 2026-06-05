"use client";

import React, { useState } from "react";
import { 
  Server, 
  Globe, 
  HardDrive, 
  Shield, 
  Zap, 
  Activity, 
  Database,
  Lock,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import DashboardHeader from "@/components/dashboard/dashboard-component/dashboard-header";

const VM_PRICING = [
  { flavor: "gen2.nano", vcpu: 1, ram: 1, disk: 25, priceMo: 6.00, priceHr: 0.008 },
  { flavor: "gen2.micro", vcpu: 2, ram: 2, disk: 25, priceMo: 9.03, priceHr: 0.013 },
  { flavor: "gen2.small", vcpu: 2, ram: 4, disk: 25, priceMo: 12.02, priceHr: 0.017 },
  { flavor: "gen2.medium", vcpu: 4, ram: 4, disk: 25, priceMo: 17.23, priceHr: 0.024 },
  { flavor: "gen2.medium2", vcpu: 4, ram: 6, disk: 25, priceMo: 21.01, priceHr: 0.029 },
  { flavor: "gen2.large", vcpu: 4, ram: 8, disk: 25, priceMo: 26.12, priceHr: 0.036 },
  { flavor: "gen2.huge", vcpu: 8, ram: 16, disk: 25, priceMo: 41.02, priceHr: 0.057 },
  { flavor: "gen2.giant", vcpu: 16, ram: 32, disk: 25, priceMo: 86.66, priceHr: 0.120 },
  { flavor: "gen32.giant", vcpu: 32, ram: 64, disk: 25, priceMo: 170.00, priceHr: 0.236 },
];

export default function PricingPage() {
  const [billingToggle, setBillingToggle] = useState("monthly"); // "monthly" or "hourly"

  // Black and white subtle grid background
  const gridBackgroundStyle = {
    backgroundColor: "#ffffff",
    backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)`,
    backgroundSize: "40px 40px"
  };

  return (
    <div className="flex flex-col h-full relative z-10 min-h-screen" style={gridBackgroundStyle}>
      <DashboardHeader className="bg-white/80 backdrop-blur-md border-b border-gray-200" />

      {/* Header Section */}
      <header className="relative z-20 pt-10 pb-6 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="h-3.5 w-3.5" /> Simple, Predictable Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1F2C] tracking-tight mb-4">
            Cloud infrastructure built for scale
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Pay only for the resources you use with industry-leading performance.
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-transparent relative z-10">
        <div className="mx-auto max-w-7xl space-y-12">
          
          {/* VM PRICING SECTION */}
          <section>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-xl shadow-sm">
                  <Server className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1F2C]">Virtual Machines</h2>
                  <p className="text-sm text-gray-500">High-performance Gen2 compute instances</p>
                </div>
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
                <button
                  onClick={() => setBillingToggle("monthly")}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
                    billingToggle === "monthly" 
                      ? "bg-white text-[#1A1F2C] shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingToggle("hourly")}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
                    billingToggle === "hourly" 
                      ? "bg-white text-[#1A1F2C] shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Hourly
                </button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50/80 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-[#4B5565]">Flavor</th>
                      <th className="px-6 py-4 font-semibold text-[#4B5565] text-center">vCPU</th>
                      <th className="px-6 py-4 font-semibold text-[#4B5565] text-center">Memory (GB)</th>
                      <th className="px-6 py-4 font-semibold text-[#4B5565] text-center">Included Disk</th>
                      <th className="px-6 py-4 font-semibold text-[#1A1F2C] text-right text-base">
                        Price {billingToggle === "monthly" ? "($/mo)" : "($/hr)"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {VM_PRICING.map((vm, idx) => (
                      <tr key={vm.flavor} className="hover:bg-sky-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-sky-700">
                          {vm.flavor}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-700">
                          {vm.vcpu}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-700">
                          {vm.ram} GB
                        </td>
                        <td className="px-6 py-4 text-center text-gray-500">
                          {vm.disk} GB NVMe
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-[#1A1F2C] text-base">
                          ${billingToggle === "monthly" ? vm.priceMo.toFixed(2) : vm.priceHr.toFixed(3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* TWO COLUMN SECTION: Network/Bandwidth & Storage/Extras */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* COLUMN 1: Bandwidth & Networking */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-xl shadow-sm">
                  <Globe className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-xl font-bold text-[#1A1F2C]">Bandwidth & Networking</h2>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-sky-300 transition-colors duration-300">
                <h3 className="font-bold text-[#1A1F2C] mb-4 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-sky-500" />
                  Data Transfer
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-gray-600 font-medium">Inbound Data Transfer</span>
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-md tracking-wider">Free</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-gray-600 font-medium">First 100 GB Outbound / mo</span>
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-md tracking-wider">Free</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg border border-sky-100">
                    <span className="text-sky-800 font-medium">Outbound Overage</span>
                    <span className="font-bold text-[#1A1F2C]">$0.05 / GB</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-sky-300 transition-colors duration-300">
                <h3 className="font-bold text-[#1A1F2C] mb-4 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-sky-500" />
                  Reserved IP Pricing
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">When Assigned to VM</p>
                    <p className="text-lg font-bold text-green-600">Free</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Unassigned (Idle)</p>
                    <p className="text-lg font-bold text-[#1A1F2C]">$3.02 <span className="text-xs text-gray-400 font-normal">/mo</span></p>
                    <p className="text-xs text-gray-400 mt-0.5">($0.0042 / hr)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* COLUMN 2: Storage, Backups & Extras */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-xl shadow-sm">
                  <Database className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-xl font-bold text-[#1A1F2C]">Storage & Security</h2>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-sky-300 transition-colors duration-300">
                <h3 className="font-bold text-[#1A1F2C] mb-4 flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-sky-500" />
                  Persistent Storage
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <span className="block text-gray-800 font-medium">Block Storage (NVMe)</span>
                      <span className="text-xs text-gray-500">High performance attached volumes</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#1A1F2C] block">$0.08 <span className="text-xs text-gray-400 font-normal">/ GB / mo</span></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <span className="block text-gray-800 font-medium">Object Storage</span>
                      <span className="text-xs text-gray-500">Scalable S3-compatible buckets</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#1A1F2C] block">TBD <span className="text-xs text-gray-400 font-normal">/ GB / mo</span></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-sky-300 transition-colors duration-300">
                  <h3 className="font-bold text-[#1A1F2C] mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-sky-500" />
                    Automated Backups
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Daily Backups</span>
                      <span className="font-bold text-[#1A1F2C]">$0.03 <span className="text-[10px] text-gray-400 font-normal">/GB</span></span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Weekly Backups</span>
                      <span className="font-bold text-[#1A1F2C]">$0.04 <span className="text-[10px] text-gray-400 font-normal">/GB</span></span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-sky-600 to-sky-800 rounded-2xl p-5 shadow-lg text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <Lock className="w-16 h-16 rotate-12" />
                  </div>
                  <h3 className="font-bold text-white mb-2 relative z-10">
                    Load Balancers & SSL
                  </h3>
                  <p className="text-xs text-sky-100 relative z-10 mb-4">
                    Secure your traffic out of the box with zero configuration required.
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-white/20 relative z-10 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-200" />
                    Let's Encrypt Free
                  </div>
                </div>
              </div>

            </section>
          </div>
          
        </div>
      </main>
    </div>
  );
}
