"use client";
import React, { useState } from "react";
import { Database, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "./loginModal";
import Image from "next/image";

const BlogNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-[#DDE3EA] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/neviri-logo.svg"
                width={120}
                height={40}
                alt="Neviri logo"
                className="w-12 h-auto sm:w-14 md:w-14"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              {/* <Link
                href="/blogs/blog-dashboard"
                className="hidden md:block border border-[#2563EB]/30 px-6 py-3 rounded-lg font-semibold hover:border-[#2563EB]/30 hover:text-[#2563EB] hover:bg-sky-700/10 transition-all duration-300 backdrop-blur-sm cursor-pointer text-[#2563EB]"
              >
                Dashboard
              </Link> */}
              <button
                onClick={() => setOpenModal(true)}
                className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl transform"
              >
                Login
              </button>
            </div>
            <div className="md:hidden bg-white/80 backdrop-blur-sm p-2 rounded-lg">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#1A1F2C] hover:text-sky-600 transition-colors duration-200 cursor-pointer"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-transparent rounded-lg mt-2 border border-[#DDE3EA]">
                <Link
                  href="/"
                  className="block px-3 py-2 text-[#1A1F2C] hover:text-sky-600 transition-colors duration-200"
                >
                  Home
                </Link>
                {/* <Link
                  href="/login"
                  className="block px-3 py-2 text-[#1A1F2C] hover:text-[#2563EB] transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  href="/blogs"
                  className="block px-3 py-2 text-[#1A1F2C] hover:text-[#2563EB] transition-colors duration-200"
                >
                  Blogs
                </Link> */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setOpenModal(true)}
                    className="w-full text-left bg-sky-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-sky-700 transition-all duration-200 mt-2"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default BlogNavbar;
