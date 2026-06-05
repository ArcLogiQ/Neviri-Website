"use client";

import React from "react";
import {
  Zap,
  Wallet,
  ShieldCheck,
  LifeBuoy,
  Server,
  Database,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const WhyChooseNeviri = () => {
  const router = useRouter();

  // Unified high-contrast theme
  const reasons = [
    {
      icon: Zap,
      title: "Deploy in Minutes, Not Days",
      description:
        "Skip the manual configuration. Spin up virtual machines, managed databases, and full environments instantly so your team can focus on shipping code.",
    },
    {
      icon: Wallet,
      title: "Fair, Predictable Pricing",
      description:
        "Say goodbye to shock cloud bills. Pay strictly for the resources you use with simple, transparent billing designed to help you scale efficiently.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise-Grade Security",
      description:
        "Keep your workloads locked down. We include private VPC networking, default encryption, and compliance-ready infrastructure right out of the box.",
    },
    {
      icon: LifeBuoy,
      title: "24/7 Support from Real Experts",
      description:
        "Stuck on a deployment? Our team of actual cloud architects is available around the clock to help you optimize, troubleshoot, and scale.",
    },
    {
      icon: Server,
      title: "Unshakeable Reliability",
      description:
        "Keep your business online when it matters most. Our architecture is engineered for maximum uptime, high performance, and automatic failover.",
    },
    {
      icon: Database,
      title: "Total Database Freedom",
      description:
        "Don't get locked into a single ecosystem. Run MongoDB, MySQL, or PostgreSQL on one unified platform—we handle the management, you keep the control.",
    },
  ];

  return (
    <section className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans antialiased selection:bg-sky-600/30 selection:text-black">
      {/* Background Decorators: Clean Cybergoth Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto">
          {/* Stark Tag */}
          <div className="inline-flex items-center px-4 py-1.5 bg-[#0F172A] border border-[#0F172A] rounded-full text-[#3B82F6] text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <span className="flex h-2 w-2 rounded-full bg-sky-600 mr-2.5 animate-pulse"></span>
            The Neviri Difference
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6 tracking-[-0.04em] leading-[1.1]">
            Cloud Infrastructure, <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              {/* True Blue to Cyan Gradient Marker Highlight */}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-4 py-1.5 transform -rotate-1 inline-block animate-markerFlicker text-white shadow-sm">
                Minus the Headaches.
              </span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium mt-6">
            Get the power and reliability of a tech giant, with the simplicity
            and transparent pricing of a startup.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-[2rem] p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-[#3B82F6] transition-all duration-300 group flex flex-col"
            >
              <div className="mb-8 inline-flex">
                {/* Icon Box: Light by default, flips to Deep Slate + True Blue on hover */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-[#0F172A] group-hover:border-[#0F172A] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 group-hover:scale-110">
                  <reason.icon
                    className="h-7 w-7 text-[#0F172A] group-hover:text-[#3B82F6] transition-colors duration-300"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4 tracking-tight group-hover:text-[#0F172A]">
                {reason.title}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-grow text-base font-medium">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24">
          <div className="bg-[#0F172A] rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl border border-slate-800">
            {/* Ambient background accents for the CTA */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-600/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            {/* Dark Grid Overlay */}
            <div
              className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            ></div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-[-0.03em]">
                Ready to Take Control?
              </h3>
              <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Join forward-thinking teams scaling their applications on
                Neviri.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                <button
                  onClick={() => router.push("/signup")}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center justify-center group/btn hover:-translate-y-1"
                >
                  <span>Start Your Free Trial</span>
                  <ArrowRight className="ml-3 h-5 w-5 group-hover/btn:translate-x-1.5 transition-transform" />
                </button>
                <button
                  onClick={() => router.push("/contact")}
                  className="w-full sm:w-auto bg-transparent text-white border-2 border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#0F172A] transition-all duration-300"
                >
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes markerFlicker {
          0%, 100% { opacity: 1; transform: -rotate-1deg; }
          45% { opacity: 0.95; transform: -rotate-1.2deg; }
          50% { opacity: 1; transform: -rotate-1deg; }
          55% { opacity: 0.98; transform: -rotate-0.8deg; }
        }
        .animate-markerFlicker { animation: markerFlicker 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default WhyChooseNeviri;
