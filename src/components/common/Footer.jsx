import React from "react";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/112.svg"
                width={140}
                height={48}
                alt="Neviri logo"
                className="w-12 h-auto sm:w-14"
              />
            </Link>

            <p className="text-[#64748B] mb-6 max-w-lg font-medium">
              Effortless cloud management with production-ready
              Infrastructure, real-time monitoring, and usage-based pricing.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/neviri/posts/?feedView=all"
                target="__blank"
                className="text-[#3B82F6] hover:text-[#06B6D4] transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#0F172A] font-bold mb-4 tracking-tight">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-[#64748B] font-medium hover:text-[#3B82F6] transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#64748B] font-medium hover:text-[#3B82F6] transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="/support"
                  className="text-[#64748B] font-medium hover:text-[#3B82F6] transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  className="text-[#64748B] font-medium hover:text-[#3B82F6] transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#0F172A] font-bold mb-4 tracking-tight">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-[#64748B] font-medium hover:text-[#3B82F6] transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#64748B] font-medium hover:text-[#3B82F6] transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-[#64748B] font-medium hover:text-[#3B82F6] transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-[#64748B] font-medium hover:text-[#3B82F6] transition-colors duration-200"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#64748B] font-medium text-sm">
            © 2026 Neviri Cloud. All rights reserved.
          </p>

          <div className="flex space-x-6 text-sm mt-4 md:mt-0 font-medium">
            <Link
              href="/privacy"
              className="text-[#64748B] hover:text-[#3B82F6] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#64748B] hover:text-[#3B82F6] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie-policy"
              className="text-[#64748B] hover:text-[#3B82F6] transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
