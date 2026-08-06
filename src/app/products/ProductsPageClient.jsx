"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { APP_SIGNUP_URL } from "@/config/api";
import {
  Cpu,
  Server,
  Monitor,
  Key,
  Activity,
  Network,
  Sliders,
  GitBranch,
  Shield,
  Lock,
  HardDrive,
  Box,
  Database,
  Leaf,
  Fish,
  LayoutGrid,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Clock,
  LifeBuoy,
  Save,
  Tag,
  BrainCircuit,
} from "lucide-react";

// Animation variants (same convention as the /ai page)
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ── Product catalog (mirrors the Navbar mega menu) ──────────────
const productFamilies = [
  {
    key: "compute",
    name: "Compute",
    icon: Cpu,
    blurb:
      "Virtual machines and the tooling around them, provisioned in under a minute with full root access.",
    products: [
      {
        name: "Shared CPU",
        href: "/compute/shared-cpu",
        icon: Server,
        desc: "Cost-efficient burstable instances for dev environments, staging, and lightweight services.",
      },
      {
        name: "Virtual Machine",
        href: "/compute/virtual-machine",
        icon: Monitor,
        desc: "Dedicated-performance VMs on NVMe storage with custom images, snapshots, and root access.",
      },
      {
        name: "SSH Keys",
        href: "/compute/ssh-keys",
        icon: Key,
        desc: "Manage your team's keys centrally and inject them into new VMs at boot. No password logins.",
      },
      {
        name: "Monitoring",
        href: "/compute/monitoring",
        icon: Activity,
        desc: "Track CPU, RAM, disk I/O, and bandwidth for every instance, natively in the dashboard.",
      },
    ],
  },
  {
    key: "networking",
    name: "Networking",
    icon: Network,
    blurb:
      "Route, isolate, and protect your traffic without racking appliances or writing iptables by hand.",
    products: [
      {
        name: "Load Balancers",
        href: "/networking/load-balancer",
        icon: Sliders,
        desc: "Distribute traffic across VMs with health checks and automatic failover, at Layer 4 or Layer 7.",
      },
      {
        name: "VPC",
        href: "/networking/vpc",
        icon: GitBranch,
        desc: "Isolated private networks, so databases and internal services never touch the public internet.",
      },
      {
        name: "Cloud Firewall",
        href: "/networking/cloud-firewall",
        icon: Shield,
        desc: "Stateful, network-level rules you define once and apply across groups of instances.",
      },
      {
        name: "SSL Certificates",
        href: "/networking/ssl-certificates",
        icon: Lock,
        desc: "Provision and renew certificates for your endpoints. Encryption in transit, by default.",
      },
    ],
  },
  {
    key: "storage",
    name: "Storage",
    icon: HardDrive,
    blurb:
      "Durable NVMe block volumes and S3-compatible object storage that grow with your data.",
    products: [
      {
        name: "Block Storage",
        href: "/storage/block-storage",
        icon: HardDrive,
        desc: "Expandable NVMe volumes you can attach, resize, and snapshot independently of your VMs.",
      },
      {
        name: "Object Storage",
        href: "/storage/object-storage",
        icon: Box,
        desc: "S3-compatible storage for backups, media, and static assets. Works with your existing S3 tooling.",
      },
    ],
  },
  {
    key: "databases",
    name: "Managed Databases",
    icon: Database,
    blurb:
      "Production-ready clusters we install, patch, back up, and keep online, so your team doesn't have to.",
    products: [
      {
        name: "MongoDB",
        href: "/database/mongodb",
        icon: Leaf,
        desc: "Managed replica sets with automated failover, sharding support, and point-in-time recovery.",
      },
      {
        name: "MySQL",
        href: "/database/mysql",
        icon: Fish,
        desc: "Highly available clusters with read replicas, automatic failover, and continuous backups.",
      },
      {
        name: "PostgreSQL",
        href: "/database/postgresql",
        icon: Database,
        desc: "Managed Postgres with automated version upgrades, daily backups, and query insights.",
      },
    ],
  },
  {
    key: "ai",
    name: "AI",
    icon: BrainCircuit,
    blurb:
      "Ship straight from Git and let Neviri's AI right-size your infrastructure, so you only pay for what your app actually uses.",
    products: [
      {
        name: "Neviri AI",
        href: "/ai",
        icon: BrainCircuit,
        desc: "Zero-touch Git-to-Cloud deployments with an AI that monitors usage and optimizes costs in real time.",
      },
    ],
  },
];

// ── Platform guarantees (dark section) ──────────────────────────
const platformStandards = [
  {
    icon: Clock,
    title: "Provisioned in under 60s",
    desc: "VMs boot in under a minute; a 3-node database cluster is accepting connections within 2–3 minutes.",
  },
  {
    icon: CheckCircle2,
    title: "99.9% uptime SLA",
    desc: "Redundant infrastructure with automatic failover behind every product, backed by a real SLA.",
  },
  {
    icon: ShieldCheck,
    title: "DDoS-protected network",
    desc: "Every public endpoint sits behind network-level DDoS mitigation. Nothing to configure.",
  },
  {
    icon: Lock,
    title: "Encrypted everywhere",
    desc: "Encryption at rest and in transit across compute, storage, and databases, out of the box.",
  },
  {
    icon: Save,
    title: "Automated backups",
    desc: "Daily snapshots with point-in-time recovery on managed databases. Restore to the exact minute.",
  },
  {
    icon: LifeBuoy,
    title: "24/7 human support",
    desc: "Engineers on call around the clock, whether you run one VM or a fleet of clusters.",
  },
];

// ── FAQ (messaging carried over from the former solutions page) ─
const faqs = [
  {
    q: "What's the difference between a Virtual Machine and a Managed Database?",
    a: "Virtual Machines give you raw compute with full root access — you manage the OS and everything on it. Managed Databases (MongoDB, MySQL, PostgreSQL) are the opposite: we handle installation, security patches, clustering, and backups, and you just connect to an endpoint.",
  },
  {
    q: "How quickly do resources provision?",
    a: "Virtual Machines typically boot in under a minute. Managed database clusters — for example a 3-node MongoDB replica set — are usually ready for connections within 2 to 3 minutes.",
  },
  {
    q: "Can I migrate existing workloads to Neviri?",
    a: "Yes. We provide migration tooling and dedicated technical support for moving existing MongoDB, MySQL, and PostgreSQL workloads, with zero to minimal downtime during the transfer. VM workloads can be moved with custom images.",
  },
  {
    q: "How does billing work?",
    a: "Billing is usage-based with hourly granularity — you pay only for the hours a resource exists. Every VM includes 100 GB of free outbound bandwidth per month (inbound is always free), and load balancers and SSL certificates cost nothing.",
  },
  {
    q: "How are my resources secured?",
    a: "Compute and database resources can be deployed inside a private VPC, isolated from the public internet, with stateful cloud firewalls in front. DDoS protection and encryption at rest and in transit are enabled by default.",
  },
];

export default function ProductsPageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `
      linear-gradient(to right, #e2e8f0 1px, transparent 1px),
      linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  };

  return (
    <div
      className="flex flex-col min-h-screen font-sans text-[#0F172A] selection:bg-sky-100 selection:text-sky-900"
      style={gridBg}
    >
      <Navbar />

      {/* ── Hero ── */}
      <header className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white/60 to-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-gradient-to-tr from-sky-200/40 via-blue-100/30 to-indigo-100/20 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-semibold tracking-wide mb-6 shadow-sm"
          >
            <LayoutGrid className="h-4 w-4 text-sky-600" />
            The Neviri Platform
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6 max-w-4xl"
          >
            Infrastructure products{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
              built to work together.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl"
          >
            Spin up a VM, attach NVMe storage, put it behind a load balancer,
            and connect a managed database — all from one dashboard, on one
            predictable bill.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-10"
          >
            <Link
              href={APP_SIGNUP_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Start Free with $100 Credit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
            >
              View Pricing
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {[
              { icon: CheckCircle2, text: "99.9% uptime SLA" },
              { icon: Clock, text: "Provisioned in under 60s" },
              { icon: LifeBuoy, text: "24/7 support" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-sm font-medium text-slate-500"
              >
                <Icon className="h-4 w-4 text-sky-500" />
                {text}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </header>

      <main className="flex-1">
        {/* ── Product catalog ── */}
        <section className="relative py-20 lg:py-24 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={sectionReveal}
              className="max-w-3xl mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Explore the platform
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Four product families, one control plane. Every product below
                deploys from the same dashboard and lives on the same private
                network.
              </p>
            </motion.div>

            <div className="space-y-16 lg:space-y-20">
              {productFamilies.map((family) => (
                <motion.div
                  key={family.key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={sectionReveal}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                >
                  {/* Family intro */}
                  <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28">
                      <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-5 shadow-sm">
                        <family.icon className="h-6 w-6 text-sky-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                        {family.name}
                      </h3>
                      <p className="text-slate-600 leading-relaxed max-w-sm">
                        {family.blurb}
                      </p>
                    </div>
                  </div>

                  {/* Product cards */}
                  <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {family.products.map((product) => (
                      <Link
                        key={product.href}
                        href={product.href}
                        className="group bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(14,165,233,0.1)] hover:border-sky-200 hover:-translate-y-1 transition-all duration-300 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                      >
                        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-5 text-sky-600 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-colors duration-300">
                          <product.icon className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">
                          {product.name}
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">
                          {product.desc}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 group-hover:text-sky-700">
                          Learn more
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing band ── */}
        <section className="relative py-4 pb-20 px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionReveal}
            className="max-w-7xl mx-auto"
          >
            <div className="relative bg-gradient-to-r from-sky-600 to-sky-700 rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-lg shadow-sky-200">
              <Tag className="absolute right-8 top-1/2 -translate-y-1/2 h-48 w-48 opacity-[0.08] pointer-events-none text-white" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
                <div className="lg:flex-1">
                  <p className="text-sky-200 text-[10px] font-bold uppercase tracking-widest mb-2">
                    Transparent pricing
                  </p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                    Start small. Pay for what you use.
                  </h2>
                  <p className="text-sky-100 text-sm md:text-base leading-relaxed max-w-xl mb-6">
                    Hourly, usage-based billing with no hidden fees. These are
                    the numbers — the full breakdown is one click away.
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                    {[
                      "VMs from $4.26/mo",
                      "Managed databases from $15/mo",
                      "Block storage at $0.08/GB/mo",
                      "Load balancers & SSL included",
                      "100 GB free outbound every month",
                    ].map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white"
                      >
                        <CheckCircle2 className="h-4 w-4 text-sky-300" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 bg-white hover:bg-sky-50 text-sky-700 px-7 py-3.5 rounded-xl text-sm font-bold transition-all shadow-md"
                  >
                    See Full Pricing
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Platform standards (dark) ── */}
        <section className="relative py-4 pb-20 px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionReveal}
            className="max-w-7xl mx-auto"
          >
            <div className="relative bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-14 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10">
                <div className="max-w-3xl mb-12">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-sky-400 text-xs font-semibold tracking-wide mb-6">
                    <ShieldCheck className="h-4 w-4" />
                    Platform standards
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                    Production-grade by default
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    These aren&apos;t add-ons or premium tiers. Every product
                    ships with the same guarantees, from a single dev VM to a
                    multi-node cluster.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {platformStandards.map((item) => (
                    <div
                      key={item.title}
                      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors duration-300"
                    >
                      <item.icon className="h-6 w-6 text-sky-400 mb-4" />
                      <h3 className="text-white font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── FAQ + CTA ── */}
        <section className="relative py-4 pb-24 px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionReveal}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Frequently asked questions
                </h2>
                <p className="text-slate-600">
                  The short version of what teams ask us before they deploy.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, i) => {
                  const open = openFaqIndex === i;
                  return (
                    <div
                      key={faq.q}
                      className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                        open
                          ? "border-sky-200 bg-sky-50/30"
                          : "border-gray-200 bg-white hover:border-sky-200"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(open ? null : i)}
                        aria-expanded={open}
                        aria-controls={`products-faq-${i}`}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                      >
                        <span className="font-bold text-slate-900 pr-4">
                          {faq.q}
                        </span>
                        <span
                          className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            open ? "bg-sky-600" : "bg-slate-100"
                          }`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              open ? "rotate-180 text-white" : "text-slate-500"
                            }`}
                          />
                        </span>
                      </button>
                      <div
                        id={`products-faq-${i}`}
                        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                          open ? "max-h-[800px] pb-6 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-slate-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100 text-center">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Deploy your first product today
                </h3>
                <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                  Sign up, pick a product, and be running in under a minute —
                  or talk to us first if you&apos;re planning a migration.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                  <Link
                    href={APP_SIGNUP_URL}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/support"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-7 py-4 rounded-xl text-base font-semibold transition-all shadow-sm"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
