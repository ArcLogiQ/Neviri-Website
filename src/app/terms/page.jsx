import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] relative overflow-hidden font-sans antialiased selection:bg-sky-600/30 selection:text-black">
      {/* Background Decor: Clean Dribbble Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Header */}
        <div className="border-b border-slate-100 bg-slate-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="flex justify-center mb-6">
              <ShieldCheck className="h-14 w-14 text-[#3B82F6]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 tracking-[-0.04em]">
              Terms of Service
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
          <div className="max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                By accessing and using Neviri Cloud ("the Service"), you agree
                to be bound by these Terms of Service. If you do not agree to
                these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                2. Description of Service
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                Neviri Cloud provides managed database hosting, deployment
                automation, and related cloud infrastructure services. We
                reserve the right to modify, suspend, or discontinue any part of
                the service at any time.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                3. User Account & Security
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. You agree to notify us immediately of any unauthorized
                use of your account.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                4. Acceptable Use
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                You agree not to use the Service for any unlawful purpose or in
                any way that could damage, disable, overburden, or impair our
                infrastructure. Prohibited activities include but are not
                limited to:
              </p>
              <ul className="list-disc pl-6 text-slate-500 space-y-2 mb-4 font-medium">
                <li>Hosting malicious content or malware</li>
                <li>
                  Attempting to gain unauthorized access to other accounts
                </li>
                <li>Engaging in denial-of-service attacks</li>
                <li>Violating intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                5. Payment & Billing
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                Services are billed on a usage basis. You agree to pay all fees
                associated with your use of the Service. Failure to pay may
                result in the suspension or termination of your account and
                resources.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                6. Limitation of Liability
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                Neviri Cloud shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses.
              </p>
            </section>

            <section className="border-t border-slate-100 pt-8 mt-12">
              <p className="text-slate-400 text-sm font-medium">
                If you have any questions about these Terms, please contact us
                at{" "}
                <a
                  href="mailto:support@neviri.com"
                  className="text-[#3B82F6] hover:text-[#06B6D4] transition-colors font-bold"
                >
                  support@neviri.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
