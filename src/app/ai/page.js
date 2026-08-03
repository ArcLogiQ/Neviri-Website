"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
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
  Bell,
  PieChart,
  CloudLightning
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { APP_SIGNUP_URL } from "@/config/api";

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
  const [heroTab, setHeroTab] = useState("cost");

  const gridBg = {
    backgroundColor: "#ffffff",
    backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
    backgroundSize: "28px 28px",
  };

  const faqs = [
    {
      q: "How exactly does Neviri AI identify cloud waste?",
      a: "Neviri AI continuously ingests your cloud billing data and resource telemetry (like vCPU, memory, and disk IOPS). It correlates what you are paying for with what your applications are actually using, instantly highlighting idle instances, over-provisioned databases, and unattached storage volumes."
    },
    {
      q: "Will Neviri make changes to my cloud infrastructure automatically?",
      a: "By default, Neviri operates in read-only mode to provide actionable right-sizing recommendations and alerts. You retain full control. You can, however, enable automated remediation for specific low-risk environments if desired."
    },
    {
      q: "How fast will I be alerted to a cost spike?",
      a: "Our anomaly detection engine processes billing events in near real-time. If a misconfigured deployment or rogue script causes an unexpected spike in compute or bandwidth usage, you are alerted via Slack or email within minutes, not at the end of the billing cycle."
    },
    {
      q: "Which cloud providers do you support?",
      a: "Currently, Neviri's cost monitoring engine deeply integrates with AWS, providing granular insights into EC2, RDS, S3, and Kubernetes (EKS) workloads. GCP and Azure support are currently in beta."
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
                Intelligent Cloud Cost Monitoring
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
                Stop guessing your cloud bill. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
                  Let AI optimize your spend.
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
                Gain absolute visibility into your cloud infrastructure. Neviri AI monitors usage patterns, attributes costs granularly, and provides automated right-sizing recommendations to eliminate cloud waste.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-10">
                <Link
                  href={APP_SIGNUP_URL}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                >
                  Start Saving Today
                  <ArrowRight className="h-4 w-4" />
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
                  <p className="text-xs font-bold text-slate-900">Right-Sizing Alert</p>
                  <p className="text-[10px] text-slate-500">Downgrade RDS instance. Save $320/mo.</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-4 bottom-16 z-20 bg-white p-3 rounded-xl border border-slate-200 shadow-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Spend Anomaly Detected</p>
                  <p className="text-[10px] text-slate-500">EC2 data transfer spiked by 45% today.</p>
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
                      onClick={() => setHeroTab("cost")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        heroTab === "cost" ? "bg-sky-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Cost Allocation
                    </button>
                    <button
                      onClick={() => setHeroTab("telemetry")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        heroTab === "telemetry" ? "bg-sky-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Utilization Metrics
                    </button>
                  </div>
                </div>

                <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {heroTab === "cost" ? (
                      <motion.img 
                        key="cost-img"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                        alt="Cloud Cost Allocation Dashboard"
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
                        alt="Resource Utilization Dashboard"
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
              <CloudLightning className="h-3.5 w-3.5" /> Fast Integration
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-4 mb-3">
              Three simple steps to control your cloud spend.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Connect your billing accounts and let our AI dissect your infrastructure usage to uncover hidden savings automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="relative">
              <div className="text-6xl font-black text-slate-100 absolute -top-8 -left-4 -z-10">01</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Database className="h-5 w-5 text-sky-600" /> Connect
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Securely integrate your AWS or cloud provider accounts via read-only IAM roles. Neviri instantly begins ingesting your Cost and Usage Reports (CUR).
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="text-6xl font-black text-slate-100 absolute -top-8 -left-4 -z-10">02</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-indigo-600" /> Analyze
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our machine learning models map your billing data to actual resource utilization, identifying untagged assets, idle instances, and inefficient architectures.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="text-6xl font-black text-slate-100 absolute -top-8 -left-4 -z-10">03</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-emerald-600" /> Optimize
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Review actionable right-sizing recommendations and apply them directly. Set custom budgets and receive instant anomaly alerts before your bill spikes.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ── 3. AUTOMATED COST WORKFLOW ── */}
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
                Continuous Monitoring Engine
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold mt-4 mb-4">
                Real-time visibility. Zero manual spreadsheets.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Neviri processes millions of billing events daily, mapping them to your engineering teams and environments. Know exactly where every dollar goes and eliminate the manual toil of cloud cost management.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-900/50 border border-sky-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sky-400 text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Granular Cost Allocation</p>
                    <p className="text-slate-400 text-xs mt-1">Automatically categorize spend by team, project, or service—even without perfect tags.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-900/50 border border-sky-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sky-400 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Automated Anomaly Detection</p>
                    <p className="text-slate-400 text-xs mt-1">AI flags unusual spending patterns instantly, preventing month-end bill shock.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-900/50 border border-sky-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sky-400 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Actionable Right-Sizing</p>
                    <p className="text-slate-400 text-xs mt-1">Get specific instance type changes based on historical vCPU/Memory utilization data.</p>
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
                  <p className="text-slate-500">$ neviri connect aws --role-arn arn:aws:iam::1234:role/NeviriReadOnly</p>
                  <p className="text-sky-400">► [Neviri AI] IAM Role validated. Ingesting CUR data...</p>
                  <p className="text-slate-300">► [Sync] Processing 1.2M billing records (Last 30 days)</p>
                  <p className="text-slate-300">► [Analyze] Mapping unallocated resources to tags...</p>
                  <p className="text-amber-400">► [Alert] Anomaly Detected: S3 Data Transfer spiked +45% in us-east-1.</p>
                  <p className="text-emerald-400">► [Optimization] Found 14 idle EC2 instances. Potential savings: $1,420/mo.</p>
                  <p className="text-sky-400 font-bold mt-2">✔ Dashboard updated. Real-time monitoring active.</p>
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
              The complete toolkit for cloud financial management.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Everything engineering and finance teams need to collaborate, forecast, and optimize cloud infrastructure effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <PieChart className="h-8 w-8 text-sky-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Cost Allocation & Tagging</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Bring order to chaotic bills. Automatically group costs by environment, team, or product feature—even mapping untagged resources intelligently.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <TrendingDown className="h-8 w-8 text-emerald-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Right-Sizing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Stop over-provisioning. Neviri compares provisioned capacity against actual CPU/Memory metrics to recommend exact instance downgrades.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Bell className="h-8 w-8 text-rose-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Anomaly Alerts</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Catch expensive mistakes the moment they happen. Get Slack, Teams, or email alerts when specific services deviate from historical spend patterns.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <BarChart3 className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Budgeting & Forecasting</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Create granular budgets for different teams and let our ML models forecast your end-of-month spend based on current deployment run-rates.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <ActivitySquare className="h-8 w-8 text-amber-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Waste Eradication</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Automatically identify orphaned EBS volumes, unattached Elastic IPs, and obsolete snapshots that are quietly draining your budget.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <ShieldCheck className="h-8 w-8 text-teal-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Read-Only Security</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Neviri connects via strict least-privilege IAM roles. We analyze billing metadata and telemetry without ever accessing your application code or PII data.
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
                Bank-grade security. <br />Your data stays yours.
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We understand the sensitivity of cloud infrastructure data. Neviri is designed to provide maximum insights using minimum privileges, ensuring absolute compliance and security.
              </p>
              
              <Link
                href={APP_SIGNUP_URL}
                className="inline-flex items-center justify-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors"
              >
                Learn more about our architecture <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Read-Only IAM Roles</h4>
                  <p className="text-sm text-slate-600 mt-1">We connect to your AWS environment using strict cross-account roles with read-only access to Cost Explorer and CloudWatch.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">SOC2 & PCI DSS Ready</h4>
                  <p className="text-sm text-slate-600 mt-1">Our platform runs on hardened infrastructure, adhering to the strictest industry compliance and audit standards.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">No App Data Access</h4>
                  <p className="text-sm text-slate-600 mt-1">Neviri analyzes metadata, billing metrics, and hypervisor telemetry. We never see your customer data, databases, or code.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Data Encryption</h4>
                  <p className="text-sm text-slate-600 mt-1">All billing reports and telemetry data are encrypted at rest (AES-256) and in transit (TLS 1.3).</p>
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
              Stop overpaying for idle cloud infrastructure.
            </h2>
            <p className="text-slate-300 mb-10">
              Connect your cloud account in minutes and let Neviri's AI uncover hidden savings immediately. No engineering resources required to get started.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={APP_SIGNUP_URL}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Start Saving Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-slate-800 text-white border border-slate-600 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
