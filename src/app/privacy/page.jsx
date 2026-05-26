import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#1A1F2C] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 from-[#E5EAF1] via-[#F7F9FC] to-[#E5EAF1]"></div>
      <div className="absolute inset-0 bg-[url('/images/signup1.jpeg')] bg-cover bg-center opacity-5"></div>
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80  rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 -r from-[#2563EB]/10 to-[#00A3FF]/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <Navbar />
        {/* Header */}
        <div className="border-b border-[#DDE3EA] bg-white/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="flex justify-center mb-4">
              <Lock className="h-12 w-12 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600 mb-4">
              Privacy Policy
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
                1. Information We Collect
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                We collect information you provide directly to us, such as when
                you create an account, update your profile, or use our services.
                This may include:
              </p>
              <ul className="list-disc pl-6 text-[#4B5565] space-y-2 mb-4">
                <li>Contact information (name, email address)</li>
                <li>Account credentials</li>
                <li>Payment information (processed securely by Razorpay)</li>
                <li>Usage data and logs related to your deployments</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                2. How We Use Your Information
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-[#4B5565] space-y-2 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>
                  Send you technical notices, updates, and support messages
                </li>
                <li>Detect and prevent fraud and abuse</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                3. Data Storage & Security
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                We use industry-standard security measures to protect your
                personal information. Your data is stored on secure servers and
                we employ encryption for sensitive data transmission. However,
                no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                4. Cookies & Tracking
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track the
                activity on our Service and hold certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                5. Third-Party Services
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                We may employ third-party companies and individuals to
                facilitate our Service (e.g., payment processors, cloud
                providers). These third parties have access to your Personal
                Data only to perform these tasks on our behalf and are obligated
                not to disclose or use it for any other purpose.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                6. Changes to This Policy
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="border-t border-[#DDE3EA] pt-8 mt-12">
              <p className="text-[#9AA5B8] text-sm">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:privacy@neviri.com"
                  className="text-purple-600 hover:text-purple-700 transition-colors"
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
