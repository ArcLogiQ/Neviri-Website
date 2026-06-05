"use client";

import React, { useState, useEffect } from "react";
import {
  Database,
  Shield,
  Activity,
  Zap,
  Globe,
  Sliders,
  GitBranch,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Lock,
  RefreshCw,
  Cpu,
  Server,
  Play,
  AlertTriangle,
  Layers,
  Sparkles,
  LockKeyhole
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function PostgreSQLPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // States for PgBouncer Simulator
  const [pgBouncerEnabled, setPgBouncerEnabled] = useState(true);
  const [incomingClients, setIncomingClients] = useState(0);
  const [activeConnections, setActiveConnections] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState("180 MB");
  const [dbStatus, setDbStatus] = useState("Healthy");

  // Cycle clients and compute connections/memory
  useEffect(() => {
    if (pgBouncerEnabled) {
      setIncomingClients(1200);
      setActiveConnections(10);
      setMemoryUsage("180 MB / 4 GB");
      setDbStatus("Healthy & Active");
    } else {
      setIncomingClients(1200);
      setActiveConnections(1200);
      setMemoryUsage("4.1 GB / 4 GB (OOM)");
      setDbStatus("CRASHED (Out of Memory)");
    }
  }, [pgBouncerEnabled]);

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "What is PgBouncer and why is it enabled by default?",
      a: "PgBouncer is a lightweight connection pooler for PostgreSQL. By default, PostgreSQL forks a separate operating system process for every connection. If your app attempts to open hundreds of connections, the server quickly runs out of memory just managing idle processes. PgBouncer sits between your application and Postgres, multiplexing thousands of incoming client requests down to a highly efficient pool of backend connections, keeping database memory stable."
    },
    {
      q: "Which pre-installed extensions are supported on Neviri Managed PostgreSQL?",
      a: "We pre-configure the most critical extensions. These include 'pgvector' for high-dimensional vector embeddings in AI searches, 'PostGIS' for complex spatial and geographic routing queries, and 'TimescaleDB' for optimized time-series storage and data partitioning. You can enable them with a simple SQL command directly on your database."
    },
    {
      q: "How does autovacuum tuning prevent database bloat?",
      a: "Because PostgreSQL uses Multi-Version Concurrency Control (MVCC), modifying or deleting rows leaves behind 'dead tuples'. If left uncleaned, these rows bloat tables and slow down indexes. Neviri algorithmically tunes your database autovacuum daemon, adjusting background cleaning cycles dynamically based on write volumes, keeping indexes fast without hitting performance bottlenecks."
    },
    {
      q: "How does Point-in-Time Recovery (PITR) protect my data?",
      a: "We continuously stream your Write-Ahead Logs (WAL) to a durable off-node storage vault. If a bad update or migration corrupts your schema, you can restore a new instance representing your database's exact state down to the specific second, ensuring zero data loss."
    },
    {
      q: "Can I connect to my Managed PostgreSQL cluster from outside Neviri?",
      a: "Yes. For security reasons, we keep Managed Postgres inside a private VPC by default. If you need external access, you can enable a public connection string and use the stateful Neviri Cloud Firewall to restrict traffic strictly to whitelisted developer IP addresses."
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Built-in pgvector for AI",
      desc: "Transform PostgreSQL into a vector database. Store high-dimensional embeddings and execute semantic searches natively without external databases."
    },
    {
      icon: Globe,
      title: "Geospatial with PostGIS",
      desc: "Pre-loaded with the definitive toolkit for geographic databases. Execute proximity routing and location searches directly from SQL."
    },
    {
      icon: Layers,
      title: "TimescaleDB Partitioning",
      desc: "Perfect for IoT dashboards or tracking high-frequency metrics. Partitions and queries massive time-series datasets efficiently."
    },
    {
      icon: Sliders,
      title: "Native PgBouncer Pooling",
      desc: "Multiplex thousands of client connections down to a stable, highly efficient pool, defeating memory exhaustion bottleneck during spikes."
    },
    {
      icon: RefreshCw,
      title: "Tuned Autovacuum Daemon",
      desc: "Algorithmically cleans up dead tuples. As write volumes fluctuate, Neviri tunes background workers to clean indexes with zero hassle."
    },
    {
      icon: Cpu,
      title: "Smart Memory Allocation",
      desc: "Our engine automatically calculates shared buffers, work memory, and cache settings for your specific hardware tier, updating dynamically."
    }
  ];

  const workflowItems = [
    {
      icon: Sliders,
      title: "Seamless Environment Injection",
      desc: "Push code via Git integration without hardcoding strings. Credentials are automatically injected into application containers at runtime."
    },
    {
      icon: GitBranch,
      title: "Isolate Staging & Production",
      desc: "Deploy a low-cost Shared CPU Postgres instance for staging, and an HA dedicated VM cluster for main. Test migrations in isolation."
    },
    {
      icon: Server,
      title: "S3 Object Storage Integration",
      desc: "Offload heavy user assets or uploads directly to S3-compatible Object Storage, keeping your PostgreSQL relational rows lean and highly performant."
    }
  ];

  return (
    <div
      className="flex flex-col min-h-screen font-sans overflow-x-hidden relative"
      style={gridBg}
    >
      {/* Subtle top fade for the grid background */}
      <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />

      {/* Navbar layer – FORCE MAX Z-INDEX */}
      <div className="relative z-[9999] w-full">
        <Navbar />
      </div>

      {/* ── HERO SECTION ── */}
      <header className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 text-center overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-sky-400/20 via-indigo-500/10 to-indigo-500/20 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(99,102,241,0.15)] transform transition-transform hover:scale-105">
            <Database className="h-4 w-4 text-indigo-500" /> Advanced
            Object-Relational Database
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            Engineered for Complexity. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-indigo-700">
              Tuned for Enterprise Scale.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Neviri Managed PostgreSQL gives you the uncompromised power of
            Postgres without the operational overhead of connection limits,
            autovacuum daemon tuning, or manual memory indexing. pgvector,
            PostGIS, and PgBouncer are pre-configured by default.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/signup"
              className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-lg shadow-slate-900/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Initialize Your Postgres Cluster
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="#pgbouncer"
              className="bg-white hover:bg-sky-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-sky-200 hover:shadow-md"
            >
              Try Pooling Simulator
            </Link>
          </div>

          <div className="mt-8 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 inline-block px-4 py-2 rounded-lg shadow-sm">
            🚀 Deploy today with a $100 instant infrastructure credit.
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">
        {/* ── SECTION 1: DATABASE TUNING & PGBOUNCER SIMULATOR ── */}
        <section id="pgbouncer" className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                  <Sliders className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                  Tuned for the Real World
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  <p>
                    Out of the box, standard PostgreSQL is conservative. It is
                    designed to run on minimal hardware, meaning default
                    configurations quickly bottle-neck during high traffic
                    spikes.
                  </p>
                  <p>
                    Neviri dynamically tunes the Postgres engine based on your
                    selected compute specifications, eliminating typical
                    connection and memory exhaustion bottlenecks:
                  </p>
                  <ul className="space-y-3 pt-2 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                      <span>
                        Connection pooling: Native PgBouncer integration
                        standard
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                      <span>
                        Autovacuum tuning: Aggressive background dead-tuple
                        cleanup
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                      <span>
                        Smart memory maps: Recalculates shared buffers on the
                        fly
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* PgBouncer Connection Pooling Simulator */}
              <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-[#0F172A] rounded-[2rem] p-8 border border-slate-800 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sliders className="h-5 w-5 text-indigo-400" />
                      Connection Pool Simulator
                    </h3>
                    <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
                      <span className="text-[10px] text-slate-400 font-bold px-2">
                        PgBouncer
                      </span>
                      <button
                        onClick={() => setPgBouncerEnabled(!pgBouncerEnabled)}
                        className={`text-[10px] font-extrabold px-3 py-1 rounded-md transition-all ${
                          pgBouncerEnabled
                            ? "bg-indigo-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {pgBouncerEnabled ? "ON" : "OFF"}
                      </button>
                    </div>
                  </div>

                  {/* Simulator schematic */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-4">
                    {/* App Clients */}
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center mx-auto shadow-md">
                        <Globe className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block font-mono">
                        {incomingClients} Client Connections
                      </span>
                    </div>

                    {/* PgBouncer node - visible if enabled */}
                    <div
                      className={`text-center transition-all ${pgBouncerEnabled ? "opacity-100 scale-100" : "opacity-20 scale-95 pointer-events-none"}`}
                    >
                      <div className="w-14 h-14 rounded-xl bg-indigo-600 border border-indigo-500 text-white flex items-center justify-center mx-auto shadow-lg relative">
                        <Sliders className="h-6 w-6" />
                        {pgBouncerEnabled && (
                          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] font-black uppercase px-1 rounded animate-pulse">
                            Pool Active
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-2 block">
                        PgBouncer
                      </span>
                    </div>

                    {/* Postgres Engine */}
                    <div className="text-center">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto border transition-all ${
                          pgBouncerEnabled
                            ? "bg-slate-800 border-slate-700 text-slate-200"
                            : "bg-red-500/25 border-red-500/50 text-red-400 scale-105 animate-bounce"
                        }`}
                      >
                        <Database className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block font-mono">
                        {activeConnections} Active OS Processes
                      </span>
                    </div>
                  </div>

                  {/* Diagnostic stats */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">
                        DB Status
                      </span>
                      <span
                        className={`text-[10px] font-black block mt-0.5 ${pgBouncerEnabled ? "text-emerald-400" : "text-red-500"}`}
                      >
                        {dbStatus}
                      </span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">
                        Memory Overhead
                      </span>
                      <span className="text-[10px] text-slate-300 font-bold block mt-0.5">
                        {memoryUsage}
                      </span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">
                        Scaling Mode
                      </span>
                      <span className="text-[10px] text-indigo-400 font-bold block mt-0.5">
                        Multiplexed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1E293B]/60 border border-slate-800 p-4 rounded-xl text-xs text-slate-400 leading-relaxed mt-6">
                  <span className="font-bold text-white block mb-1">
                    Pooling dynamics:
                  </span>
                  -{" "}
                  <span className="text-emerald-400 font-bold">
                    PgBouncer ON
                  </span>
                  : 1,200 incoming connections are queued and multiplexed down
                  to 10 active connections on the engine, keeping memory usage
                  at 180MB. -{" "}
                  <span className="text-red-400 font-bold">PgBouncer OFF</span>:
                  Postgres forks 1,200 separate heavy OS processes, exceeding
                  the 4GB RAM capacity and causing the OS to force shut down the
                  database (OOM Crash).
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: ADVANCED CAPABILITIES GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              Advanced Postgres Capabilities Built-In
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              We ship Postgres with pre-configured extensions and kernel tuning
              to handle relational complexity out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-[1.5rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:border-indigo-200 transition-all duration-300 group transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300 shadow-sm">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-indigo-700 transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: GIT WORKFLOW (DARK BOX) ── */}
        <section>
          <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"></div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  <Sliders className="h-4 w-4" /> Git-Native Database Workflow
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                  Synchronized with Your Repository
                </h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  Neviri bridges the gap between codebase updates and database
                  configurations, ensuring seamless deploys.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {workflowItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: SECURITY & WAL RECOVERY ── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                <Shield className="h-4 w-4" /> Security & WAL Backups
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight">
                Disaster Recovery That Actually Works
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  Hope is not a valid infrastructure strategy. Neviri streams
                  your Postgres Write-Ahead Logs (WAL) continuously to off-site,
                  highly durable storage arrays.
                </p>
                <p>
                  If a bad migration script corrupts your production schema at
                  exactly 4:12:05 PM, you can initiate a Point-in-Time Recovery
                  to spin up a clone at exactly 4:12:04 PM.
                </p>
                <p>
                  Additionally, resources remain secured by multi-layered
                  boundaries including private VPC isolation, tag-based stateful
                  firewalls, and always-on 256-bit AES storage encryption.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-2xl p-8 border border-slate-100 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                Security Posture Settings
              </h3>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-700">
                    VPC Confinement (E-W Isolation)
                  </span>
                  <span className="text-indigo-600 font-bold">Enabled</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-700">
                    Storage Encryption (AES-256)
                  </span>
                  <span className="text-indigo-600 font-bold">Always On</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-700">
                    Client transit SSL (TLS 1.3 force)
                  </span>
                  <span className="text-indigo-600 font-bold">Enforced</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: FAQ ACCORDION ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-500">
                Everything you need to know about extensions, autovacuum
                background daemon parameters, and scaling rules.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openFaqIndex === i ? "border-sky-200 bg-sky-50/30" : "border-gray-200 bg-white hover:border-sky-200"}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <h4
                      className={`text-lg font-bold transition-colors ${openFaqIndex === i ? "text-indigo-700" : "text-[#0F172A]"}`}
                    >
                      {faq.q}
                    </h4>
                    <div
                      className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaqIndex === i ? "bg-indigo-100 text-indigo-600" : "bg-gray-50 text-gray-400"}`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${openFaqIndex === i ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? "max-h-[800px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-base text-slate-600 leading-relaxed border-t border-sky-100/50 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-slate-500 mb-6">
                Write better queries. Build better architectures. Let us manage
                scaling.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md"
              >
                Initialize Postgres Cluster <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
