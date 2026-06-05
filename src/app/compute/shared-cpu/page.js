"use client";

import React from "react";
import Link from "next/link";
import {
  Server,
  Cpu,
  Zap,
  HardDrive,
  ShieldCheck,
  Globe,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers
} from "lucide-react";
import Navbar from "@/components/common/Navbar";

export default function SharedCPUPage() {
  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const FEATURES = [
    {
      icon: Zap,
      title: "Lightning-Fast NVMe Storage",
      desc: "Every shared CPU instance is backed by enterprise-grade NVMe SSDs, delivering up to 10x faster read/write speeds compared to standard SSD cloud hosting."
    },
    {
      icon: Clock,
      title: "99.99% Uptime SLA",
      desc: "Our highly available cloud infrastructure ensures your web applications and APIs stay online. We back our reliability with a strict 99.99% uptime guarantee."
    },
    {
      icon: Layers,
      title: "Instant Vertical Scaling",
      desc: "Start small and grow. Seamlessly upgrade your vCPU and RAM with a single click as your website traffic or application workload increases."
    },
    {
      icon: Globe,
      title: "Global Connectivity",
      desc: "Deploy your virtual machines closer to your users. Benefit from low-latency global routing and high-bandwidth network interfaces."
    },
    {
      icon: ShieldCheck,
      title: "Built-in Security & DDoS Protection",
      desc: "Protect your Linux and Windows instances with advanced network-level DDoS mitigation and easily configurable stateful cloud firewalls."
    },
    {
      icon: HardDrive,
      title: "Automated Snapshots",
      desc: "Never lose your data. Schedule automatic daily or weekly backups to ensure your critical cloud server data can be restored in seconds."
    }
  ];

  const USE_CASES = [
    {
      title: "Web Hosting & Blogs",
      desc: "Perfect for hosting WordPress sites, personal portfolios, and low-to-medium traffic CMS platforms requiring reliable but affordable web hosting."
    },
    {
      title: "Development & Staging",
      desc: "Spin up cheap virtual machines to test new code, run CI/CD pipelines, or host isolated staging environments before pushing to production."
    },
    {
      title: "Microservices & APIs",
      desc: "Deploy stateless microservices, background worker processes, and lightweight REST APIs that don't require 100% sustained CPU utilization."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative" style={gridBg}>
      {/* Subtle top fade for the grid */}
      <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />

      {/* Navbar layer – FORCE MAX Z-INDEX to prevent gradient bleed-through */}
      <div className="relative z-[9999] w-full">
        <Navbar />
      </div>

      {/* ── HERO SECTION ── */}
      <header className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 z-10">
        {/* Left Text Content */}
        <div className="relative lg:w-[60%] text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-sky-600 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
            <Cpu className="h-4 w-4" /> Cloud Compute
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
            High-Performance <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700">
              Shared CPU Instances
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
            Deploy affordable, scalable cloud servers in under 60 seconds. Neviri&apos;s Shared vCPU instances offer the perfect balance of compute power, NVMe storage, and predictable pricing for growing businesses.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/signup"
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 shadow-xl shadow-slate-900/20 hover:-translate-y-0.5 hover:shadow-slate-900/30"
            >
              Deploy a Cloud Server
            </Link>
            <Link
              href="/pricing"
              className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 shadow-sm hover:-translate-y-0.5"
            >
              View Pricing
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No hidden fees
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Monthly billing
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Cancel anytime
            </div>
          </div>
        </div>

        {/* Right Visual (Abstract Server Graphic) */}
        <div className="lg:w-[40%] relative w-full mt-10 lg:mt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-sky-400/30 to-indigo-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">ubuntu-s-1vcpu-1gb</div>
                  <div className="text-xs text-slate-500 font-mono">192.168.1.42</div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Active
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  <span>vCPU Usage</span>
                  <span className="text-sky-600">32%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: "32%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  <span>Memory (RAM)</span>
                  <span className="text-indigo-500">540 MB / 1 GB</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "54%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  <span>NVMe Storage</span>
                  <span className="text-slate-700">12 GB / 25 GB</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: "48%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full relative z-10 pb-24">
        {/* ── FEATURES GRID ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Everything you need to run your applications seamlessly
            </h2>
            <p className="text-lg text-slate-600">
              Our shared CPU virtual machines are engineered for value and performance, providing a robust cloud infrastructure for workloads that don&apos;t require dedicated CPU threads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-sky-200 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── USE CASES SECTION ── */}
        <section className="bg-slate-50 border-y border-slate-200 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  When should you choose a Shared CPU Instance?
                </h2>
                <p className="text-lg text-slate-600">
                  Shared CPU plans offer the best price-to-performance ratio for bursty workloads where maximum CPU utilization isn&apos;t required 100% of the time.
                </p>
              </div>
              <Link
                href="/pricing"
                className="text-sky-600 font-bold flex items-center gap-2 hover:gap-3 transition-all shrink-0"
              >
                Compare with Dedicated CPU <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {USE_CASES.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-blue-500" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3 mt-2">{useCase.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {useCase.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO CONTENT SECTION ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Reliable Cloud Server Hosting</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Neviri Cloud provides highly scalable virtual private servers (VPS) designed for developers and businesses. Unlike traditional shared hosting, our shared vCPU instances give you full root access, dedicated IP addresses, and isolated environments using advanced KVM hypervisor technology.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Whether you are deploying a simple LAMP stack, setting up a Docker container registry, or running a remote VPN, our affordable cloud compute instances are engineered to deliver consistent performance without breaking your IT budget.
          </p>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden border border-slate-700 shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-sky-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Ready to deploy your cloud server?
              </h2>
              <p className="text-sky-100/80 mb-10 text-lg md:text-xl max-w-2xl">
                Join thousands of developers hosting their applications on Neviri Cloud. Sign up today and provision your first NVMe-backed shared CPU instance in seconds.
              </p>
              <Link
                href="/signup"
                className="bg-sky-500 hover:bg-sky-400 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg shadow-sky-500/30 hover:-translate-y-1 hover:shadow-sky-500/50 flex items-center gap-2"
              >
                Start Building Now <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
