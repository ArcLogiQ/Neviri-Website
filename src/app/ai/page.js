"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  ShieldCheck,
  Database,
  Cpu,
  Lock,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  BrainCircuit,
  TrendingDown,
  ActivitySquare,
  Terminal,
  Server,
  Rocket,
  Globe,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { APP_SIGNUP_URL, AI_APP_URL } from "@/config/api";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function AIPageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [heroTab, setHeroTab] = useState("deploy");

  const gridBg = {
    backgroundColor: "#ffffff",
    backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
    backgroundSize: "28px 28px",
  };

  const faqs = [
    {
      q: "How does Neviri's Git-to-Cloud deployment work?",
      a: "It's a completely zero-touch pipeline. You connect your GitHub or GitLab repository, and when you push code, Neviri automatically detects your framework (Next.js, Node, Python, etc.), builds the container, runs health checks, and performs a zero-downtime cutover to production."
    },
    {
      q: "How exactly does the AI optimize my infrastructure costs?",
      a: "Instead of forcing you to guess server sizes, Neviri's hypervisor AI continuously monitors your vCPU, memory consumption, and database throughput in real-time. It automatically right-sizes your resources and scales down idle instances during low-traffic periods, ensuring you only pay for what your app actually consumes."
    },
    {
      q: "Does the AI interact with my proprietary application code?",
      a: "No. The AI operates entirely at the infrastructure and hypervisor layer. It monitors system telemetry (like memory spikes or slow database queries) to optimize the environment, but it never accesses or reads your source code."
    },
    {
      q: "How are environment variables and runtime secrets secured?",
      a: "Secrets are stored in an AES-256 encrypted parameter vault. At deployment, they are dynamically injected directly into your application's isolated runtime memory. They are never written to disk or exposed in your build logs."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-sky-100 selection:text-sky-900" style={gridBg}>
      <Navbar />

      {/* ── 1. HERO SECTION ── */}
      <header className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-tr from-sky-200/40 via-blue-100/30 to-indigo-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
              className="lg:col-span-6 flex flex-col items-start text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-semibold tracking-wide mb-6 shadow-sm">
                <BrainCircuit className="h-4 w-4 text-sky-600 animate-pulse" />
                Intelligent Cloud Infrastructure
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
                Deploy instantly. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
                  Let AI scale the rest.
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
                Push your code and Neviri handles the infrastructure. Our built-in AI actively monitors compute memory and traffic to auto-scale resources—eliminating cloud waste while delivering zero-downtime global deployments.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-10">
                <Link
                  href={APP_SIGNUP_URL}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                >
                  Start Deploying Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={AI_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                >
                  Open the Neviri AI Dashboard
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                >
                  See How AI Helps
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: AI Dashboard Visuals */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 w-full relative"
            >
              {/* Floating AI Insight Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 top-10 z-20 bg-white p-3 rounded-xl border border-slate-200 shadow-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Auto-Scaled Down</p>
                  <p className="text-[10px] text-slate-500">Traffic dropped. Saved 40% on compute.</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-4 bottom-16 z-20 bg-white p-3 rounded-xl border border-slate-200 shadow-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Zero-Downtime Deploy</p>
                  <p className="text-[10px] text-slate-500">Production traffic routed in 42ms.</p>
                </div>
              </motion.div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative group">
                <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between z-10 relative">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setHeroTab("deploy")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        heroTab === "deploy" ? "bg-sky-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Pipeline Status
                    </button>
                    <button
                      onClick={() => setHeroTab("telemetry")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        heroTab === "telemetry" ? "bg-sky-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Live Telemetry
                    </button>
                  </div>
                </div>

                <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {heroTab === "deploy" ? (
                      <motion.img 
                        key="deploy-img"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                        alt="Infrastructure Deployment Dashboard"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <motion.img 
                        key="telemetry-img"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
                        alt="Infrastructure Telemetry Dashboard"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-20 space-y-32 relative z-10">

        {/* ── 2. HOW IT WORKS ── */}
        <motion.section 
          id="how-it-works" 
          className="scroll-mt-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100 flex items-center justify-center gap-1.5 w-max mx-auto">
              <Terminal className="h-3.5 w-3.5" /> Git to Production
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-4 mb-3">
              Three simple steps to deploy globally.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              No DevOps engineers required. Connect your repository and let Neviri provision, build, and optimize your cloud environments automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="relative">
              <div className="text-6xl font-black text-slate-100 absolute -top-8 -left-4 -z-10">01</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-sky-600" /> Push Code
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connect your GitHub or GitLab in seconds. Neviri listens for new commits, automatically triggering our secure build pipelines.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="text-6xl font-black text-slate-100 absolute -top-8 -left-4 -z-10">02</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-indigo-600" /> Auto-Build
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our engine detects your framework (Next.js, Node, Django, etc.), installs dependencies, provisions SSL, and launches your containerized app on our global edge network.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="text-6xl font-black text-slate-100 absolute -top-8 -left-4 -z-10">03</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-emerald-600" /> AI Optimize
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Once live, our hypervisor AI continuously monitors vCPU and memory. It automatically scales instances down during idle periods to slash your hosting bill.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ── 3. AUTOMATED DEPLOYMENT WORKFLOW ── */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="bg-slate-900 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-slate-800"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800">
                Deployment Engine
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold mt-4 mb-4">
                You write code. Neviri runs the servers.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                A truly self-serve PaaS. From continuous integration to database provisioning, a single git push handles everything. We replace the need for complex Kubernetes setups or manual server configuration.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-900/50 border border-sky-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sky-400 text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Smart Framework Detection</p>
                    <p className="text-slate-400 text-xs mt-1">Neviri understands your project structure natively, compiling Next.js, Node, or Python apps without custom Dockerfiles.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-900/50 border border-sky-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sky-400 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Zero-Downtime Cutovers</p>
                    <p className="text-slate-400 text-xs mt-1">New deployments are booted and health-checked in the background before atomic traffic routing swaps them in.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-900/50 border border-sky-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sky-400 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Instant Rollbacks</p>
                    <p className="text-slate-400 text-xs mt-1">Bad commit? Revert to the previous healthy container state instantly with a single click.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6">
               <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-3 shadow-2xl overflow-x-auto">
                  <div className="flex gap-1.5 mb-4 border-b border-slate-800 pb-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <p className="text-slate-500">$ git push origin main</p>
                  <p className="text-sky-400">► [Neviri Engine] Webhook received. Initializing pipeline...</p>
                  <p className="text-slate-300">► [Build] Detected framework: Next.js</p>
                  <p className="text-slate-300">► [Vault] Injecting encrypted environment variables...</p>
                  <p className="text-slate-300">► [Network] Provisioning Let's Encrypt TLS 1.3 Certificate...</p>
                  <p className="text-emerald-400">► [AI Check] Pre-flight memory allocation mapped successfully.</p>
                  <p className="text-sky-400 font-bold mt-2">✔ Deployment live. 0ms downtime.</p>
                </div>
            </div>
          </div>
        </motion.section>

        {/* ── 4. PLATFORM FEATURES GRID ── */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-4 mb-3">
              Everything you need to host modern applications.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A complete cloud ecosystem designed for developers, powered by intelligent auto-scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Globe className="h-8 w-8 text-sky-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Global Edge Network</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your static assets and edge functions are automatically distributed globally, ensuring lightning-fast load times for users anywhere in the world.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <TrendingDown className="h-8 w-8 text-emerald-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Cost Optimization</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Neviri tracks your resource consumption against active traffic, automatically scaling down idle compute environments so you never overpay for hosting.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Database className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Managed Databases</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Provision PostgreSQL, MySQL, or Redis with a single click. We handle automated backups, replication, and query performance monitoring.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <GitBranch className="h-8 w-8 text-amber-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Preview Environments</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every Pull Request automatically generates a unique, isolated preview URL. Test changes safely with your team before merging to production.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Cpu className="h-8 w-8 text-rose-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">vCPU & Memory Telemetry</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Get crystal-clear dashboards on your application's memory footprint and CPU utilization to easily diagnose bottlenecks or memory leaks.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Server className="h-8 w-8 text-teal-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Background Workers</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Easily spin up separate worker processes for heavy lifting tasks, cron jobs, and queue processing—fully isolated from your web traffic.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ── 5. ENTERPRISE GRADE SECURITY ── */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="border border-slate-200 rounded-3xl p-8 sm:p-12 bg-white shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-3 bg-sky-50 rounded-xl mb-6 text-sky-600">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Secure by default. <br />Isolated at the core.
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Your application code, data, and environment variables are sensitive. Neviri is built from the ground up with strict container isolation and automated security protocols.
              </p>
              
              <Link
                href={APP_SIGNUP_URL}
                className="inline-flex items-center justify-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors"
              >
                Learn more about our infrastructure <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Encrypted Parameter Vault</h4>
                  <p className="text-sm text-slate-600 mt-1">Secrets are stored in an AES-256 vault and injected dynamically into your app's memory only upon boot.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Isolated Runtimes</h4>
                  <p className="text-sm text-slate-600 mt-1">Every deployment runs in its own tightly sandboxed container environment, ensuring complete process isolation.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Automated SSL/TLS 1.3</h4>
                  <p className="text-sm text-slate-600 mt-1">Every domain attached to Neviri receives a modern, auto-renewing Let's Encrypt certificate automatically.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">No Log Exposure</h4>
                  <p className="text-sm text-slate-600 mt-1">Environment variables are strictly guarded and are inherently scrubbed from exposing in deployment build logs.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── 6. EXPANDED FAQ SECTION ── */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto scroll-mt-28"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-2xl transition-all ${
                  openFaqIndex === i ? 'border-sky-300 bg-sky-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset rounded-2xl"
                >
                  <span className={`font-semibold text-sm sm:text-base pr-4 ${openFaqIndex === i ? 'text-sky-900' : 'text-slate-900'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-transform ${openFaqIndex === i ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence initial={false}>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-sky-100/60 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── 7. BOTTOM CTA ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 sm:p-16 text-center shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Deploy your app seamlessly in minutes.
            </h2>
            <p className="text-slate-300 mb-10">
              No complex Kubernetes charts. No DevOps headaches. Just push your code to Neviri and let our platform build, scale, and optimize your application automatically.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={APP_SIGNUP_URL}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Deploy Now Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-slate-800 text-white border border-slate-600 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Talk to our Team
              </Link>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
