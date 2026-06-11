import React from "react";
import Link from "next/link";
import { CheckCircle, Home, Mail } from "lucide-react";
import Navbar from "@/components/common/Navbar";

export const metadata = {
  title: "Thank You — Support Request Received | Neviri",
  description:
    "Your support request has been received. Our team will respond within 24 hours.",
};

const ThankYou = () => {
  return (
    <div
      className="min-h-screen bg-white text-gray-700 relative overflow-hidden font-sans antialiased selection:bg-sky-600/30 selection:text-black"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(226, 232, 240, 0.8) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(226, 232, 240, 0.8) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        backgroundPosition: "center center",
      }}
    >
      {/* Subtle radial gradient overlay to fade grid at the edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(255,255,255,0.9)_100%)] z-0"></div>

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-sky-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-8">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>

            {/* Main Message */}
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-4 tracking-tight drop-shadow-sm">
              Thank You!
            </h1>
            <p className="text-xl text-[#64748B] font-medium mb-8">
              Your support request has been received successfully.
            </p>

            {/* Info Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-[#E2E8F0] shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2rem] p-8 mb-8 text-left">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-sky-600/10 p-3 rounded-xl flex-shrink-0">
                  <Mail className="h-6 w-6 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                    What happens next?
                  </h3>
                  <p className="text-[#64748B] leading-relaxed font-medium">
                    Our support team has received your message and will review it
                    carefully. You can expect a response within 24 hours at the
                    email address you provided.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E2E8F0] pt-6">
                <h4 className="text-sm font-bold text-[#94A3B8] mb-3 uppercase tracking-wider">
                  In the meantime:
                </h4>
                <ul className="space-y-3 text-[#64748B] font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-[#3B82F6] font-bold">✓</span>
                    <span>Check your inbox for our confirmation email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3B82F6] font-bold">✓</span>
                    <span>Browse our Blogs for guides and common answers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3B82F6] font-bold">✓</span>
                    <span>Explore our Products and Pricing while you wait</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)]"
              >
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#3B82F6] text-[#3B82F6] bg-white px-8 py-3.5 rounded-xl font-bold hover:bg-sky-600 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"
              >
                Submit Another Request
              </Link>
            </div>

            {/* Additional Help */}
            <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
              <p className="text-[#64748B] font-medium text-sm">
                Need immediate assistance?{" "}
                <a
                  href="mailto:support@neviri.com"
                  className="text-[#3B82F6] hover:text-[#2563EB] font-bold transition-colors"
                >
                  Email our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
