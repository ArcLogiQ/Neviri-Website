import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#1A1F2C] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0  from-[#E5EAF1] via-[#F7F9FC] to-[#E5EAF1]"></div>
      <div className="absolute inset-0 bg-[url('/images/signup1.jpeg')] bg-cover bg-center opacity-5"></div>
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64  rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <Navbar />
        {/* Header */}
        <div className="border-b border-[#DDE3EA] bg-white/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="h-12 w-12 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-700 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-[#4B5565] max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                1. Acceptance of Terms
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                By accessing and using Neviri Cloud ("the Service"), you agree
                to be bound by these Terms of Service. If you do not agree to
                these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                2. Description of Service
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                Neviri Cloud provides managed database hosting, deployment
                automation, and related cloud infrastructure services. We
                reserve the right to modify, suspend, or discontinue any part of
                the service at any time.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                3. User Account & Security
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. You agree to notify us immediately of any unauthorized
                use of your account.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                4. Acceptable Use
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                You agree not to use the Service for any unlawful purpose or in
                any way that could damage, disable, overburden, or impair our
                infrastructure. Prohibited activities include but are not
                limited to:
              </p>
              <ul className="list-disc pl-6 text-[#4B5565] space-y-2 mb-4">
                <li>Hosting malicious content or malware</li>
                <li>
                  Attempting to gain unauthorized access to other accounts
                </li>
                <li>Engaging in denial-of-service attacks</li>
                <li>Violating intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                5. Payment & Billing
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                Services are billed on a usage basis. You agree to pay all fees
                associated with your use of the Service. Failure to pay may
                result in the suspension or termination of your account and
                resources.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                6. Limitation of Liability
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                Neviri Cloud shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses.
              </p>
            </section>

            <section className="border-t border-[#DDE3EA] pt-8 mt-12">
              <p className="text-[#9AA5B8] text-sm">
                If you have any questions about these Terms, please contact us
                at{" "}
                <a
                  href="mailto:support@neviri.com"
                  className="text-purple-600 hover:text-purple-700 transition-colors"
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
