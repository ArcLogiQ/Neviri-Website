import React from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const CookiePolicy = () => {
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
              <Cookie className="h-14 w-14 text-[#3B82F6]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 tracking-[-0.04em]">
              Cookie Policy
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
                1. What Are Cookies
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                Cookies are small pieces of text sent to your web browser by a
                website you visit. A cookie file is stored in your web browser
                and allows the Service or a third-party to recognize you and
                make your next visit easier and the Service more useful to you.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                2. How We Use Cookies
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                When you use and access the Service, we may place a number of
                cookies files in your web browser. We use cookies for the
                following purposes:
              </p>
              <ul className="list-disc pl-6 text-slate-500 space-y-2 mb-4 font-medium">
                <li>To enable certain functions of the Service</li>
                <li>To provide analytics</li>
                <li>To store your preferences</li>
                <li>
                  To enable advertisements delivery, including behavioral
                  advertising
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                3. Types of Cookies We Use
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#3B82F6] mb-2 tracking-tight">
                    Essential Cookies
                  </h3>
                  <p className="text-slate-500 font-medium">
                    These cookies are essential to provide you with services
                    available through our website and to enable you to use some
                    of its features.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3B82F6] mb-2 tracking-tight">
                    Functionality Cookies
                  </h3>
                  <p className="text-slate-500 font-medium">
                    These cookies allow our website to remember choices you make
                    when you use our website, such as remembering your login
                    details or language preference.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3B82F6] mb-2 tracking-tight">
                    Analytics Cookies
                  </h3>
                  <p className="text-slate-500 font-medium">
                    These cookies are used to collect information about traffic
                    to our website and how users use our website. The
                    information gathered does not identify any individual
                    visitor.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center tracking-tight">
                <span className="w-1.5 h-8 bg-sky-600 rounded-full mr-3"></span>
                4. Your Choices Regarding Cookies
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 font-medium">
                If you'd like to delete cookies or instruct your web browser to
                delete or refuse cookies, please visit the help pages of your
                web browser. Please note, however, that if you delete cookies or
                refuse to accept them, you might not be able to use all of the
                features we offer, you may not be able to store your
                preferences, and some of our pages might not display properly.
              </p>
            </section>

            <section className="border-t border-slate-100 pt-8 mt-12">
              <p className="text-slate-400 text-sm font-medium">
                If you have any questions about our Cookie Policy, please
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

export default CookiePolicy;
