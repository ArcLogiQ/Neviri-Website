"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/common/Navbar";
import { APP_SIGNUP_URL } from "@/config/api";
import {
  ArrowRight,
  Cpu,
  Database,
  HardDrive,
  Network,
  Activity,
  BrainCircuit,
  Gauge,
  Wallet,
  ShieldCheck,
  LifeBuoy,
  CheckCircle2,
  Clock,
  Target,
} from "lucide-react";

/* Animation variants — same convention used across /products and /ai */
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const pillars = [
  {
    icon: Cpu,
    title: "Compute",
    desc: "Virtual machines and burstable instances with full root access, provisioned in under a minute.",
    href: "/products",
  },
  {
    icon: Database,
    title: "Managed Databases",
    desc: "MongoDB, MySQL, PostgreSQL, MariaDB, Redis, and RabbitMQ — fully managed, with backups and monitoring built in.",
    href: "/products",
  },
  {
    icon: HardDrive,
    title: "Storage",
    desc: "NVMe block volumes and S3-compatible object storage that scale with your workloads.",
    href: "/storage/block-storage",
  },
  {
    icon: Network,
    title: "Secure Networking",
    desc: "Private VPCs, load balancers, cloud firewalls, and managed SSL certificates on one private network.",
    href: "/networking/vpc",
  },
  {
    icon: Activity,
    title: "Observability",
    desc: "Real-time performance metrics, resource usage, and health across every service you run.",
    href: "/compute/monitoring",
  },
  {
    icon: BrainCircuit,
    title: "Neviri AI",
    desc: "AI-assisted tooling layered on top of the platform to help you build and operate faster.",
    href: "/ai",
  },
];

const principles = [
  {
    icon: Gauge,
    title: "Infrastructure should disappear",
    desc: "Databases and cloud resources deploy in under a minute — no manual provisioning, no DevOps hire required. The platform does the heavy lifting so your team ships product.",
  },
  {
    icon: Wallet,
    title: "Pricing should never surprise you",
    desc: "Pay-as-you-go billing for exactly what you use. No hidden fees, no shock invoices — just clear costs you can forecast as you grow.",
  },
  {
    icon: ShieldCheck,
    title: "Security is the default, not an upgrade",
    desc: "SSL encryption, VPC isolation, role-based access, and automated daily backups come standard on every workload — with compliance-ready controls out of the box.",
  },
  {
    icon: LifeBuoy,
    title: "Support should be human",
    desc: "Real cloud engineers, available around the clock. When something matters, you talk to someone who can actually help — not a queue.",
  },
];

// Stats — every figure below is already published elsewhere on the site
// (product/hero/nav). No invented numbers.
const stats = [
  { value: "<60s", label: "To provision a cluster" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "100+", label: "Active customers" },
  { value: "5", label: "Global regions" },
  { value: "24/7", label: "Expert support" },
];

/* ── Small building blocks ─────────────────────────────────────── */

const Eyebrow = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-semibold uppercase tracking-[0.12em] shadow-sm">
    <span className="flex h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
    {children}
  </div>
);

/* ── Page ──────────────────────────────────────────────────────── */

const AboutContent = () => {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans antialiased selection:bg-sky-100 selection:text-sky-900">
      <Navbar />

      {/* ── Hero ── */}
      <header className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white/60 to-transparent">
        {/* faint grid */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* soft ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[460px] bg-gradient-to-tr from-sky-200/40 via-blue-100/30 to-indigo-100/20 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-24 pb-20 lg:pt-32 lg:pb-24 flex flex-col items-center text-center"
        >
          <motion.div variants={fadeInUp}>
            <Eyebrow>Who we are</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-[-0.03em] leading-[1.1]"
          >
            Cloud infrastructure, without the{" "}
            <span className="inline-block bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white px-3 py-0.5 -rotate-1 shadow-sm">
              enterprise baggage.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-8 text-lg sm:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl"
          >
            Neviri is a dedicated cloud platform for teams who would rather
            build products than babysit infrastructure. Compute, managed
            databases, secure networking, and real-time observability — one
            dashboard, one predictable bill, zero hyperscaler lock-in.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <a
              href={APP_SIGNUP_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-black text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Start free with $100 credit
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Explore the platform
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
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

      {/* ── Why Neviri exists (mission) ── */}
      <section className="relative py-20 lg:py-28 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="lg:col-span-7"
          >
            <motion.div variants={fadeInUp}>
              <Eyebrow>Why we exist</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-[-0.03em] leading-[1.12]"
            >
              Building shouldn&apos;t start with weeks of setup.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg text-slate-500 font-medium leading-relaxed"
            >
              For most startups and growing teams, standing up reliable
              infrastructure means weeks of planning, specialist DevOps hires,
              and cloud bills nobody can predict. That complexity is a tax on
              the very people trying to build something new.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-lg text-slate-500 font-medium leading-relaxed"
            >
              Neviri removes it. Production-ready databases and infrastructure
              come online in under a minute — with security, backups, and
              monitoring switched on by default, and pricing you can actually
              forecast. Infrastructure stops being the thing you fight and
              becomes the thing that simply works.
            </motion.p>
          </motion.div>

          {/* Mission callout card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionReveal}
            className="lg:col-span-5"
          >
            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-10 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.25)]">
              <div className="w-12 h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-[#3B82F6]" strokeWidth={2.5} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 mb-3">
                Our mission
              </p>
              <p className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight leading-snug">
                Put secure, scalable, transparent cloud infrastructure within
                reach of{" "}
                <span className="text-sky-600">10,000+ startups and SMEs</span>{" "}
                across India and emerging markets.
              </p>
              <p className="mt-5 text-base text-slate-500 font-medium leading-relaxed">
                By eliminating complexity and hidden costs, we help teams move
                faster and scale with confidence as they grow.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── One platform (pillars) ── */}
      <section className="relative py-20 lg:py-28 px-6 md:px-8 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="max-w-3xl mb-14 lg:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Eyebrow>What we do</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-[-0.03em] leading-[1.12]"
            >
              One platform for everything you run.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg text-slate-500 font-medium leading-relaxed"
            >
              Compute, databases, storage, networking, and observability live
              on the same control plane and the same private network — so the
              pieces work together instead of against you.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={sectionReveal}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={pillar.href}
                  className="group flex flex-col h-full rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(15,23,42,0.12)] hover:-translate-y-1 hover:border-[#3B82F6] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  <div className="mb-6 inline-flex">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-[#0F172A] group-hover:border-[#0F172A] transition-all duration-300 group-hover:scale-105">
                      <pillar.icon
                        className="h-6 w-6 text-[#0F172A] group-hover:text-[#3B82F6] transition-colors duration-300"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed flex-grow">
                    {pillar.desc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 group-hover:gap-2.5 transition-all">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we stand for (principles) ── */}
      <section className="relative py-20 lg:py-28 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="max-w-3xl mb-14 lg:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Eyebrow>What we stand for</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-[-0.03em] leading-[1.12]"
            >
              The principles behind the platform.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg text-slate-500 font-medium leading-relaxed"
            >
              Every decision we make about the product comes back to four
              beliefs about how cloud infrastructure should feel.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={sectionReveal}
                transition={{ delay: i * 0.06 }}
                className="group relative flex gap-5 rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(15,23,42,0.1)] hover:border-[#3B82F6] transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-[#0F172A] group-hover:border-[#0F172A] transition-all duration-300">
                    <p.icon
                      className="h-6 w-6 text-[#0F172A] group-hover:text-[#3B82F6] transition-colors duration-300"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2.5">
                    {p.title}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── By the numbers ── */}
      <section className="relative px-6 md:px-8 pb-20 lg:pb-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionReveal}
          className="max-w-7xl mx-auto rounded-[2.5rem] bg-[#0F172A] border border-slate-800 px-6 py-14 sm:px-12 sm:py-16 relative overflow-hidden"
        >
          {/* ambient accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-600/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-center text-sm font-semibold uppercase tracking-[0.12em] text-sky-400 mb-10">
              Neviri by the numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10 md:gap-6 text-center">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="last:col-span-2 md:last:col-span-1"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2">
                    {s.value}
                  </div>
                  <div className="text-sm text-slate-400 font-medium leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative px-6 md:px-8 pb-24 lg:pb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionReveal}
          className="max-w-5xl mx-auto rounded-[2.5rem] border border-slate-200 bg-gradient-to-b from-slate-50/80 to-white px-6 py-16 sm:px-16 sm:py-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-tr from-sky-200/40 via-blue-100/30 to-indigo-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
              Ready to build on Neviri?
            </h2>
            <p className="mt-5 text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Create your account and get $100 in credit to spin up your first
              database or virtual machine — live in under a minute.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-3.5">
              <a
                href={APP_SIGNUP_URL}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 group"
              >
                Start free with $100 credit
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/support"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutContent;
