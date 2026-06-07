import React from "react";
import {
  ArrowRight,
  Server,
  Database,
  Network,
  Shield,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { APP_SIGNUP_URL } from "@/config/api";

const Hero = () => {
  return (
    <section className="relative bg-white min-h-[90vh] flex flex-col pt-32 pb-16 overflow-hidden font-sans antialiased selection:bg-sky-600/30 selection:text-black">
      {/* Background Decor: Clean Dribbble Grid (Kept exactly as requested) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content Stack */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center px-3 py-1 bg-black text-[#FFFFFF] text-[10px] font-black uppercase tracking-[0.2em] mb-10">
              Secure & Compliant Cloud
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] mb-8 tracking-[-0.04em] leading-[1.0]">
              {/* Wrap each line individually to stop the highlight from bleeding */}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white px-3 py-1 transform -rotate-1 inline-block shadow-sm">
                Dedicated Cloud
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white px-3 py-1 transform -rotate-1 inline-block mt-1 shadow-sm">
                Platform
              </span>
              <span className="inline-block ml-3">for</span> <br />
              <span className="relative inline-block mt-2">
                Secure, Compliant
                <div className="absolute bottom-1 left-0 w-full h-[6px] bg-sky-600 opacity-50 -z-10"></div>
              </span>{" "}
              <br />
              Infrastructure.
            </h1>

            <p className="text-lg text-slate-500 mb-10 max-w-md leading-relaxed font-medium">
              Build, deploy, and manage virtual machines, managed databases, and
              secure networking from one platform with effortless precision.
            </p>

            <Link
              href={APP_SIGNUP_URL}
              className="flex items-center justify-center px-10 py-4 bg-[#0F172A] text-white rounded-full font-bold text-lg transition-all hover:bg-black hover:scale-105 shadow-xl shadow-black/5 group"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: Floating Status Card */}
          <div className="hidden lg:flex lg:col-span-5 justify-end relative">
            <div className="w-[380px] bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.08)] relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                    <Activity className="text-[#3B82F6] w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                      System Status
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      Live Infrastructure
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full border border-blue-100">
                  OPERATIONAL
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-[1px] w-full bg-slate-100 relative">
                  <div className="absolute top-0 left-0 h-full bg-sky-600 w-2/3 shadow-[0_0_8px_#3B82F6]"></div>
                </div>
                <div className="flex justify-between items-end gap-2 h-16">
                  {[40, 70, 45, 90, 65, 80, 50, 85, 60].map((h, i) => (
                    <div
                      key={i}
                      className="w-full bg-slate-100 rounded-t-md relative overflow-hidden"
                    >
                      <div
                        className="absolute bottom-0 left-0 w-full bg-slate-900 transition-all duration-1000"
                        style={{ height: `${h}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Uptime
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    99.998%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Latency
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    14ms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="mt-auto pt-16 border-t border-slate-100">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
            width: max-content;
          }
        `}</style>

        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex animate-marquee gap-10 items-center">
            {[1, 2].map((i) => (
              <div key={i} className="flex shrink-0 items-center gap-10">
                <Feature icon={<Server />} text="Managed VMs" />
                <Feature icon={<Database />} text="Managed Databases" />
                <Feature icon={<Network />} text="Secure Networking" />
                <Feature icon={<Shield />} text="Compliance-Ready" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, text }) => (
  <div className="flex items-center gap-3 group cursor-default">
    <div className="w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg group-hover:bg-sky-600 group-hover:border-[#3B82F6] transition-all">
      {React.cloneElement(icon, {
        size: 14,
        strokeWidth: 3,
        className: "text-slate-900 group-hover:text-white transition-colors",
      })}
    </div>
    <span className="font-bold text-[#0F172A] text-lg tracking-tight">
      {text}
    </span>
  </div>
);

export default Hero;
