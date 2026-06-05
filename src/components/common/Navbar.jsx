"use client";
import React, { useEffect, useState } from "react";
import {
  Database,
  Menu,
  X,
  ChevronDown,
  Server,
  HardDrive,
  Cpu,
  Network,
  Shield,
  LayoutGrid,
  Key,
  Activity,
  Lock,
  Cloud,
  Monitor,
  Box,
  Leaf,
  Fish,
  Sliders,
  GitBranch,
  Rocket,
  Tag,
  BookOpen,
  Headphones,
  Globe,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const megaTimeoutRef = React.useRef(null);

  const openMega = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setIsMegaOpen(true);
  };

  const closeMega = () => {
    megaTimeoutRef.current = setTimeout(() => setIsMegaOpen(false), 120);
  };
  const pathname = usePathname();
  const router = useRouter();

  const handleClosePromo = () => {
    localStorage.setItem(
      "promo_banner_closed_until",
      Date.now() + 60 * 60 * 1000,
    );
    setShowPromo(false);
  };

  useEffect(() => {
    const closedUntil = localStorage.getItem("promo_banner_closed_until");
    if (!closedUntil || Date.now() > Number(closedUntil)) {
      setShowPromo(true);
    }
  }, []);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const isProductsActive =
    isActive("/solutions") ||
    isActive("/compute/shared-cpu") ||
    isActive("/compute/virtual-machine") ||
    isActive("/storage") ||
    isActive("/networking") ||
    isActive("/database");

  // ── Mega menu data ──────────────────────────────────────────────
  const col1 = [
    {
      section: "Compute",
      icon: <Cpu className="h-4 w-4 text-sky-500" />,
      items: [
        {
          label: "Shared CPU",
          desc: "Affordable compute",
          icon: <Server className="h-4 w-4 text-sky-500" />,
          href: "/compute/shared-cpu",
        },
        {
          label: "Virtual Machine",
          desc: "Scalable VMs",
          icon: <Monitor className="h-4 w-4 text-sky-500" />,
          href: "/compute/virtual-machine",
        },
        {
          label: "SSH Keys",
          desc: "Secure access",
          icon: <Key className="h-4 w-4 text-sky-500" />,
          href: "/compute/ssh-keys",
        },
        {
          label: "Monitoring",
          desc: "Server metrics",
          icon: <Activity className="h-4 w-4 text-sky-500" />,
          href: "/compute/monitoring",
        },
      ],
    },
    {
      section: "Networking",
      icon: <Network className="h-4 w-4 text-sky-500" />,
      items: [
        {
          label: "Load Balancers",
          desc: "Traffic distribution",
          icon: <Sliders className="h-4 w-4 text-sky-500" />,
          href: "/networking/load-balancer",
        },
        {
          label: "VPC",
          desc: "Private network",
          icon: <GitBranch className="h-4 w-4 text-sky-500" />,
          href: "/networking/vpc",
        },
        {
          label: "Cloud Firewall",
          desc: "Stateful protection",
          icon: <Shield className="h-4 w-4 text-sky-500" />,
          href: "/networking/cloud-firewall",
        },
        {
          label: "SSL Certificate",
          desc: "Secure endpoints",
          icon: <Lock className="h-4 w-4 text-sky-500" />,
          href: "/networking/ssl-certificates",
        },
      ],
    },
  ];

  const col2 = [
    {
      section: "Storage",
      icon: <HardDrive className="h-4 w-4 text-sky-500" />,
      items: [
        {
          label: "Block Storage",
          desc: "NVMe SSD volumes",
          icon: <HardDrive className="h-4 w-4 text-sky-500" />,
          href: "/storage/block-storage",
        },
        {
          label: "Object Storage",
          desc: "S3-compatible",
          icon: <Box className="h-4 w-4 text-sky-500" />,
          href: "/storage/object-storage",
        },
      ],
    },
    {
      section: "Managed Databases",
      icon: <Database className="h-4 w-4 text-sky-500" />,
      items: [
        {
          label: "MongoDB",
          desc: "NoSQL database",
          icon: <Leaf className="h-4 w-4 text-sky-500" />,
          href: "/database/mongodb",
        },
        {
          label: "MySQL",
          desc: "Relational DB",
          icon: <Fish className="h-4 w-4 text-sky-500" />,
          href: "/database/mysql",
        },
        {
          label: "PostgreSQL",
          desc: "Advanced SQL",
          icon: <Database className="h-4 w-4 text-sky-500" />,
          href: "/database/postgresql",
        },
      ],
    },
  ];

  return (
    <>
      <div className="sticky top-0 z-[1000] w-full flex flex-col">
        {/* Promo Bar */}
        {showPromo && (
          <div className="relative w-full bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 shadow-[0_4px_15px_rgba(14,165,233,0.2)]">
            <p className="text-white font-bold text-sm sm:text-base text-center m-0">
              Signup now and get a free $100 credit instantly
            </p>
            <Link
              href="/signup"
              className="bg-[#0F172A] text-white px-5 py-1.5 rounded-md text-sm font-bold hover:bg-black transition-colors whitespace-nowrap"
            >
              Sign Up
            </Link>
            <button
              onClick={handleClosePromo}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-sky-200 transition-colors p-1 cursor-pointer flex items-center justify-center"
              aria-label="Close promotion banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Main Navbar */}
        <nav className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/112.svg"
                  width={120}
                  height={40}
                  alt="Neviri logo"
                  className="w-12 h-auto sm:w-14 md:w-14"
                />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-1">
                {/* Products with mega menu */}
                <div
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <button
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      isProductsActive || isMegaOpen
                        ? "text-sky-600 font-semibold bg-sky-50"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Products
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isMegaOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {[
                  {
                    label: "App Deployment",
                    href: "/app-deployment",
                    icon: <Rocket className="h-4 w-4" />,
                  },
                  {
                    label: "Pricing",
                    href: "/pricing",
                    icon: <Tag className="h-4 w-4" />,
                  },
                  {
                    label: "Blogs",
                    href: "/blogs",
                    icon: <BookOpen className="h-4 w-4" />,
                  },
                  {
                    label: "Support",
                    href: "/support",
                    icon: <Headphones className="h-4 w-4" />,
                  },
                ].map(({ label, href, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      isActive(href)
                        ? "text-sky-600 font-semibold bg-sky-50"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
                    }`}
                  >
                    {icon}
                    {label}
                  </Link>
                ))}
              </div>

              {/* Auth buttons */}
              <div className="hidden md:flex items-center space-x-3">
                {pathname === "/signup" && (
                  <Link
                    href="/login"
                    className="border border-[#E2E8F0] text-[#64748B] px-5 py-2 rounded-lg text-sm font-semibold hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all duration-300"
                  >
                    Login
                  </Link>
                )}
                {pathname === "/login" && (
                  <Link
                    href="/signup"
                    className="bg-sky-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-sky-700 transition-all duration-300"
                  >
                    Register
                  </Link>
                )}
                {pathname !== "/login" && pathname !== "/signup" && (
                  <>
                    <Link
                      href="/login"
                      className="border border-[#E2E8F0] text-[#64748B] px-5 py-2 rounded-lg text-sm font-semibold hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-sky-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-sky-700 hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden bg-white p-2 border border-[#E2E8F0] rounded-lg">
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

          {/* ── 2-Column Mega Menu ── */}
          <div
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            className={`absolute left-0 right-0 z-[999] bg-white border-b border-[#E2E8F0] shadow-xl
              transition-all duration-200 ease-in-out origin-top
              ${isMegaOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* 2-col grid */}
              <div className="grid grid-cols-2 gap-0 divide-x divide-[#E2E8F0]">
                {[col1, col2].map((col, colIdx) => (
                  <div key={colIdx} className={colIdx === 0 ? "pr-8" : "pl-8"}>
                    {col.map((group, gIdx) => (
                      <div
                        key={group.section}
                        className={gIdx > 0 ? "mt-6" : ""}
                      >
                        {/* Section label */}
                        <div className="flex items-center gap-2 mb-3">
                          {group.icon}
                          <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-widest">
                            {group.section}
                          </span>
                        </div>
                        {/* Items 2×2 grid */}
                        <div className="grid grid-cols-2 gap-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setIsMegaOpen(false)}
                              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-sky-50 group transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center flex-shrink-0 group-hover:bg-sky-100 group-hover:border-sky-200 transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-[#0F172A] group-hover:text-sky-600 transition-colors leading-tight">
                                  {item.label}
                                </p>
                                {item.desc && (
                                  <p className="text-[11px] text-[#94A3B8] mt-0.5">
                                    {item.desc}
                                  </p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Footer strip */}
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {[
                    {
                      icon: (
                        <CheckCircle className="h-3.5 w-3.5 text-sky-500" />
                      ),
                      text: "99.9% uptime SLA",
                    },
                    {
                      icon: <Globe className="h-3.5 w-3.5 text-sky-500" />,
                      text: "5 global regions",
                    },
                    {
                      icon: <Headphones className="h-3.5 w-3.5 text-sky-500" />,
                      text: "24/7 support",
                    },
                  ].map(({ icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-1.5 text-xs text-[#64748B]"
                    >
                      {icon}
                      {text}
                    </div>
                  ))}
                </div>
                <Link
                  href="/solutions"
                  onClick={() => setIsMegaOpen(false)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                >
                  View all products
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
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

      <div
        className={`fixed top-0 right-0 h-full w-[75%] bg-white shadow-2xl z-[999] md:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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

        <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto">
          <div className="flex-1 px-6 py-4 space-y-2">
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

            {/* Products dropdown (Mobile) */}
            <div className="space-y-1">
              <button
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 text-base rounded-lg transition-all duration-200 ${
                  isProductsActive
                    ? "text-white bg-sky-600 font-bold"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
                }`}
              >
                Products
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isMobileProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMobileProductsOpen && (
                <div className="pl-4 pr-2 py-2 space-y-1 bg-gray-50 rounded-xl border border-gray-100">
                  {[...col1, ...col2].flatMap((group) =>
                    group.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-700 font-medium hover:bg-sky-100 hover:text-sky-700 transition-colors"
                      >
                        <span className="text-sky-500">{item.icon}</span>
                        {item.label}
                      </Link>
                    )),
                  )}
                </div>
              )}
            </div>

            {[
              { label: "App Deployment", href: "/app-deployment" },
              { label: "Pricing", href: "/pricing" },
              { label: "Blogs", href: "/blogs" },
              { label: "Support", href: "/support" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 text-base rounded-lg transition-all duration-200 ${
                  isActive(href)
                    ? "text-white bg-sky-600 font-bold"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Bottom Auth Buttons */}
          <div className="p-6 border-t border-[#E2E8F0] space-y-3">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center border border-[#E2E8F0] text-[#0F172A] px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 hover:border-sky-600 hover:text-white transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-sky-600 text-white px-6 py-3 rounded-lg font-bold shadow-sm hover:bg-sky-700 transition-all duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

