import React from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#1A1F2C] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0  from-[#E5EAF1] via-[#F7F9FC] to-[#E5EAF1]"></div>
      <div className="absolute inset-0 bg-[url('/images/signup1.jpeg')] bg-cover bg-center opacity-5"></div>
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80  rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64  from-purple-500 to-purple-600 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <Navbar />
        {/* Header */}
        <div className="bg-white/30 backdrop-blur-sm border-b border-[#DDE3EA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="flex justify-center mb-4">
              <Cookie className="h-12 w-12 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600 mb-4">
              Cookie Policy
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
                1. What Are Cookies
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                Cookies are small pieces of text sent to your web browser by a
                website you visit. A cookie file is stored in your web browser
                and allows the Service or a third-party to recognize you and
                make your next visit easier and the Service more useful to you.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                2. How We Use Cookies
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                When you use and access the Service, we may place a number of
                cookies files in your web browser. We use cookies for the
                following purposes:
              </p>
              <ul className="list-disc pl-6 text-[#4B5565] space-y-2 mb-4">
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
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                3. Types of Cookies We Use
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-purple-600 mb-2">
                    Essential Cookies
                  </h3>
                  <p className="text-[#4B5565]">
                    These cookies are essential to provide you with services
                    available through our website and to enable you to use some
                    of its features.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-600 mb-2">
                    Functionality Cookies
                  </h3>
                  <p className="text-[#4B5565]">
                    These cookies allow our website to remember choices you make
                    when you use our website, such as remembering your login
                    details or language preference.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-600 mb-2">
                    Analytics Cookies
                  </h3>
                  <p className="text-[#4B5565]">
                    These cookies are used to collect information about traffic
                    to our website and how users use our website. The
                    information gathered does not identify any individual
                    visitor.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full mr-3"></span>
                4. Your Choices Regarding Cookies
              </h2>
              <p className="text-[#4B5565] leading-relaxed mb-4">
                If you'd like to delete cookies or instruct your web browser to
                delete or refuse cookies, please visit the help pages of your
                web browser. Please note, however, that if you delete cookies or
                refuse to accept them, you might not be able to use all of the
                features we offer, you may not be able to store your
                preferences, and some of our pages might not display properly.
              </p>
            </section>

            <section className="border-t border-[#DDE3EA] pt-8 mt-12">
              <p className="text-[#9AA5B8] text-sm">
                If you have any questions about our Cookie Policy, please
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

export default CookiePolicy;
