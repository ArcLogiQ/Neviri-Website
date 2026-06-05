import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const PrivacyPolicy = () => {
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
              <Lock className="h-14 w-14 text-[#3B82F6]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 tracking-[-0.04em]">
              Privacy Policy
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
                1. Information We Collect
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                We collect information you provide directly to us, such as when
                you create an account, update your profile, or use our services.
                This may include:
              </p>
              <ul className="list-disc pl-6 text-slate-500 space-y-2 mb-4 font-medium">
                <li>Contact information (name, email address)</li>
                <li>Account credentials</li>
                <li>Payment information (processed securely by Razorpay)</li>
                <li>Usage data and logs related to your deployments</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                2. How We Use Your Information
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-slate-500 space-y-2 mb-4 font-medium">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>
                  Send you technical notices, updates, and support messages
                </li>
                <li>Detect and prevent fraud and abuse</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                3. Data Storage & Security
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                We use industry-standard security measures to protect your
                personal information. Your data is stored on secure servers and
                we employ encryption for sensitive data transmission. However,
                no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                4. Cookies & Tracking
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                We use cookies and similar tracking technologies to track the
                activity on our Service and hold certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                5. Third-Party Services
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                We may employ third-party companies and individuals to
                facilitate our Service (e.g., payment processors, cloud
                providers). These third parties have access to your Personal
                Data only to perform these tasks on our behalf and are obligated
                not to disclose or use it for any other purpose.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                6. Changes to This Policy
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="border-t border-slate-100 pt-8 mt-12">
              <p className="text-slate-400 text-sm font-medium">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:privacy@neviri.com"
                  className="text-[#3B82F6] hover:text-[#06B6D4] transition-colors font-bold"
                >
                  privacy@neviri.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
