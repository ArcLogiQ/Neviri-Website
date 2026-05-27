"use client";
import React, { useState } from "react";
import { Database, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AUTH_URL = "https://sng-central.neviri.com/login";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there first
    if (pathname !== '/') {
      router.push('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Wrapper to make both the promo bar and navbar sticky together */}
      <div className="sticky top-0 z-[1000] w-full flex flex-col">
        
        {/* Sky Blue Gradient Promo Bar */}
        <div className="w-full bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 shadow-[0_4px_15px_rgba(14,165,233,0.2)]">
          <p className="text-white font-bold text-sm sm:text-base text-center m-0">
            Signup now and get a free $100 credit instantly
          </p>
          <a
            href={AUTH_URL}
            className="bg-[#0F172A] text-white px-5 py-1.5 rounded-md text-sm font-bold hover:bg-black transition-colors whitespace-nowrap"
          >
            Sign Up
          </a>
        </div>

        {/* Main Navbar */}
        <nav className="bg-[#FFFFFF] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/112.svg"
                  width={120}
                  height={40}
                  alt="Neviri logo"
                  className="w-12 h-auto sm:w-14 md:w-14"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="/solutions"
                  className={`${
                    isActive("/solutions")
                      ? "text-[#0F172A] font-bold border-b-2 border-sky-500"
                      : "text-[#64748B] hover:text-[#0F172A] font-medium"
                  } transition-all duration-200 py-1`}
                >
                  Solutions
                </Link>
                
               <Link
  href="/pricing" 
  className={`${
    isActive("/pricing")
      ? "text-[#0F172A] font-bold border-b-2 border-sky-500"
      : "text-[#64748B] hover:text-[#0F172A] font-medium"
  } transition-all duration-200 py-1`}
>
  Pricing
</Link>
                <Link
                  href="/blogs"
                  className={`${
                    isActive("/blogs")
                      ? "text-[#0F172A] font-bold border-b-2 border-sky-500"
                      : "text-[#64748B] hover:text-[#0F172A] font-medium"
                  } transition-all duration-200 py-1`}
                >
                  Blogs
                </Link>
                <Link
                  href="/support"
                  className={`${
                    isActive("/support")
                      ? "text-[#0F172A] font-bold border-b-2 border-sky-500"
                      : "text-[#64748B] hover:text-[#0F172A] font-medium"
                  } transition-all duration-200 py-1`}
                >
                  Support
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <a
                  href={AUTH_URL}
                  className="hidden md:block border border-[#E2E8F0] text-[#64748B] px-6 py-2.5 rounded-lg font-semibold hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all duration-300 cursor-pointer"
                >
                  Login
                </a>
                <a
                  href={AUTH_URL}
                  className="hidden md:block bg-sky-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-sky-700 hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  Register
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden bg-[#FFFFFF] p-2 border border-[#E2E8F0] rounded-lg">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-[#0F172A] hover:text-sky-600 transition-colors duration-200 cursor-pointer"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation - Slide-in Drawer */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-[998] md:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] bg-[#FFFFFF] shadow-2xl z-[999] md:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#0F172A] rounded-md flex items-center justify-center">
              <Database className="h-4 w-4 text-[#0EA5E9]" />
            </div>
            <span className="text-lg font-bold text-[#0F172A]">
              Neviri Cloud
            </span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-[#64748B] hover:text-[#0F172A] transition-colors duration-200 p-2 hover:bg-[#F1F5F9] rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto">
          <div className="flex-1 px-6 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-base rounded-lg transition-all duration-200 ${
                isActive("/")
                  ? "text-white bg-sky-600 font-bold"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-base rounded-lg transition-all duration-200 ${
                isActive("/about")
                  ? "text-white bg-sky-600 font-bold"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
              }`}
            >
              About
            </Link>
            <a
              href="#features"
              onClick={(e) => {
                handleSectionClick(e, "features");
                setIsMenuOpen(false);
              }}
              className="block px-4 py-3 text-base text-[#64748B] font-medium hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-all duration-200 cursor-pointer"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                handleSectionClick(e, "how-it-works");
                setIsMenuOpen(false);
              }}
              className="block px-4 py-3 text-base text-[#64748B] font-medium hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-all duration-200 cursor-pointer"
            >
              How It Works
            </a>
            <Link
              href="/solutions"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-base rounded-lg transition-all duration-200 ${
                isActive("/solutions")
                  ? "text-white bg-sky-600 font-bold"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
              }`}
            >
              Solutions
            </Link>
            {/* RESTORED: Scrolls to the #pricing section on Mobile too */}
            <a
              href="#pricing"
              onClick={(e) => {
                handleSectionClick(e, "pricing");
                setIsMenuOpen(false);
              }}
              className="block px-4 py-3 text-base text-[#64748B] font-medium hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-all duration-200 cursor-pointer"
            >
              Pricing
            </a>
            <Link
              href="/support"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-base rounded-lg transition-all duration-200 ${
                isActive("/support")
                  ? "text-white bg-sky-600 font-bold"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
              }`}
            >
              Support
            </Link>
            <Link
              href="/blogs"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-base rounded-lg transition-all duration-200 ${
                isActive("/blogs")
                  ? "text-white bg-sky-600 font-bold"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
              }`}
            >
              Blogs
            </Link>
          </div>

          {/* Bottom Action Buttons */}
          <div className="p-6 border-t border-[#E2E8F0] space-y-3">
            <a
              href={AUTH_URL}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center border border-[#E2E8F0] text-[#0F172A] px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 hover:border-sky-600 hover:text-white transition-all duration-200"
            >
              Login
            </a>
            <a
              href={AUTH_URL}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-sky-600 text-white px-6 py-3 rounded-lg font-bold shadow-sm hover:bg-sky-700 hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-all duration-200"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
