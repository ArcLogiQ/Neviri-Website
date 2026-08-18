"use client";

import React, { useState } from "react";
import {
  Database,
  Zap,
  GitBranch,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Code2,
  HardDrive,
  Layers,
  History,
  Network,
  Plug,
  Play
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { APP_SIGNUP_URL } from "@/config/api";

export default function MariaDBPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // States for the interactive Galera Multi-Primary Replication Simulator
  const [simStep, setSimStep] = useState(0); // 0: Idle, 1: Write accepted, 2: Write-set replicated, 3: Certified, 4: Committed cluster-wide
  const [isWriting, setIsWriting] = useState(false);
  const [committedTx, setCommittedTx] = useState([4127, 4127, 4127]);

  const clusterNodes = [
    { id: 1, name: "MariaDB Node 01", ip: "10.0.4.10" },
    { id: 2, name: "MariaDB Node 02", ip: "10.0.4.11" },
    { id: 3, name: "MariaDB Node 03", ip: "10.0.4.12" }
  ];

  const startWriteSimulation = () => {
    if (isWriting) return;
    setIsWriting(true);

    // Step 1: INSERT accepted on Node 03
    setSimStep(1);

    // Step 2: Write-set replicated to cluster peers
    setTimeout(() => {
      setSimStep(2);
    }, 1000);

    // Step 3: Certification passed on all nodes
    setTimeout(() => {
      setSimStep(3);
    }, 2000);

    // Step 4: Transaction committed cluster-wide, all counters advance together
    setTimeout(() => {
      setSimStep(4);
      setCommittedTx(prev => prev.map(count => count + 1));
    }, 3000);

    // Return the cluster to its idle, fully synced state
    setTimeout(() => {
      setSimStep(0);
      setIsWriting(false);
    }, 5500);
  };

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "How is MariaDB different from MySQL, and why would I choose it?",
      a: "MariaDB began as a community fork of MySQL created by the original MySQL engineers, and it remains fully open source under the GPL with no closed enterprise-only edition. Practically, that means capabilities MySQL reserves for paid tiers ship in every MariaDB server: the thread pool for massive connection concurrency, additional storage engines like Aria and ColumnStore, and system-versioned tables for auditing. Query optimizer improvements and features are driven by the MariaDB Foundation and its community, so the roadmap is public and license risk is off the table."
    },
    {
      q: "Is MariaDB a drop-in replacement for MySQL? How do I migrate?",
      a: "For the vast majority of applications, yes. MariaDB speaks the MySQL wire protocol, so existing connectors, ORMs, and client libraries work without modification, and the SQL dialect, information_schema layout, and utilities like mysqldump behave the way your tooling expects. To migrate a smaller database, export with mysqldump and import into your Neviri MariaDB endpoint. For production systems that cannot tolerate downtime, configure replication from your existing MySQL source into the MariaDB cluster, let it catch up, then swap the connection string during a quiet window and cut over in seconds."
    },
    {
      q: "How does Galera clustering handle node failure and split-brain?",
      a: "Galera relies on quorum. If one node in a 3-node cluster fails, the surviving two nodes hold a majority, form the Primary Component, and keep serving reads and writes without interruption. When the failed node returns, it automatically resynchronizes via an incremental (IST) or full (SST) state transfer before rejoining. If a network partition splits the cluster, any segment without a majority refuses writes entirely rather than diverging, which makes a split-brain scenario, where two halves accept conflicting data, structurally impossible."
    },
    {
      q: "How do backups and Point-in-Time Recovery work for MariaDB?",
      a: "Neviri captures a full snapshot of your cluster volumes every day without pausing client traffic, and continuously archives the MariaDB binary logs, the ordered record of every committed transaction, to durable off-node storage. To recover, we restore the most recent snapshot taken before the incident and replay binary log events up to the exact second you specify. A bad DELETE at 14:03:22 can be undone by restoring a fresh instance at 14:03:21, with the original cluster untouched for forensics."
    },
    {
      q: "How are MariaDB version upgrades handled?",
      a: "Minor releases containing security and stability fixes are applied automatically inside a maintenance window you define. Because Galera clusters tolerate mixed adjacent versions, we upgrade one node at a time while the other two continue accepting traffic, so patching involves no cluster-wide downtime. For major version jumps, Neviri notifies you ahead of time and provides a one-click rolling upgrade in the dashboard, letting you validate your application against the new release on a restored copy before touching production."
    },
    {
      q: "Can I connect to Managed MariaDB from outside the Neviri Cloud?",
      a: "By default your cluster lives inside a private VPC and only accepts connections from your Neviri compute instances, which is the posture we recommend for production. If you need to attach an external BI tool, a migration utility, or your local workstation, you can enable a public endpoint and lock it down with the Neviri Cloud Firewall so that only explicitly whitelisted IP addresses can reach port 3306, with TLS enforced on every connection."
    }
  ];

  const features = [
    {
      icon: GitBranch,
      title: "Galera Multi-Primary Clustering",
      desc: "Every node in the cluster accepts writes. Synchronous certification-based replication commits transactions on all nodes at once, so there is no promotion step and no failover window."
    },
    {
      icon: Plug,
      title: "Drop-In MySQL Compatibility",
      desc: "Speaks the MySQL wire protocol natively. Existing connectors, ORMs, and mysqldump workflows connect to MariaDB unchanged, making migration a connection-string swap."
    },
    {
      icon: Cpu,
      title: "Thread Pool Concurrency",
      desc: "MariaDB's built-in thread pool maps tens of thousands of client connections onto a small set of worker threads, holding latency steady where per-connection threading collapses."
    },
    {
      icon: Layers,
      title: "Multiple Storage Engines",
      desc: "InnoDB drives transactional workloads by default, ColumnStore accelerates columnar analytics, and Aria handles crash-safe internal tables, all selectable per table."
    },
    {
      icon: RefreshCw,
      title: "Snapshots + Binlog PITR",
      desc: "Daily volume snapshots pair with continuously archived binary logs for Point-in-Time Recovery. Roll a fresh instance back to the second before any bad statement."
    },
    {
      icon: History,
      title: "System-Versioned Tables",
      desc: "Native temporal tables record every row change with validity timestamps. Query your data AS OF any past moment for audits, compliance trails, and change forensics."
    }
  ];

  const integrationItems = [
    {
      icon: Cpu,
      title: "Compute Credential Injection",
      desc: "Database hosts, users, and passwords are injected into your Neviri compute containers as environment variables at deploy time, so credentials never live in your repository."
    },
    {
      icon: Network,
      title: "Cluster-Wide Read Balancing",
      desc: "Because every Galera node serves identical data with zero lag, Neviri load balancers spread read traffic across all three nodes over the internal VPC for linear read throughput."
    },
    {
      icon: HardDrive,
      title: "Encrypted Off-Node Backups",
      desc: "Snapshots and binary log archives are AES-256 encrypted and shipped to S3-compatible Object Storage on separate hardware, surviving even total cluster loss."
    }
  ];

  const frameworkStacks = [
    { title: "PHP Laravel & Symfony", desc: "Eloquent and Doctrine run on MariaDB through the standard mysql PDO driver, with zero configuration changes from a MySQL setup." },
    { title: "Node.js Prisma / Sequelize / TypeORM", desc: "Point your existing mysql provider or driver at the MariaDB endpoint. Migrations, schema sync, and pooling behave identically." },
    { title: "Python Django & SQLAlchemy", desc: "Django's MySQL backend and SQLAlchemy's mysqlclient or PyMySQL dialects connect to MariaDB out of the box for web apps and data pipelines." },
    { title: "Java Spring Boot & Hibernate", desc: "Use MariaDB Connector/J or the MySQL JDBC driver with Hibernate dialects for enterprise services with strict connection pooling." }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden relative" style={gridBg}>

      {/* Subtle top fade for the grid background */}
      <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />

      {/* Navbar layer – FORCE MAX Z-INDEX */}
      <div className="relative z-[9999] w-full">
        <Navbar />
      </div>

      {/* ── HERO SECTION ── */}
      <header className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 text-center overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-teal-400/20 via-cyan-400/10 to-sky-500/20 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-teal-100 text-teal-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(20,184,166,0.15)] transform transition-transform hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Fully Managed Open-Source SQL Database
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            The SQL Your Stack Already Speaks. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-600">Truly Open Source. Fully Managed.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Neviri Managed MariaDB pairs drop-in MySQL compatibility with a community-driven, GPL-licensed engine. Galera multi-primary clustering, thread pool concurrency, and temporal tables come standard, with no enterprise edition paywall in sight.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href={APP_SIGNUP_URL} className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-lg shadow-slate-900/25">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Deploy MariaDB Cluster
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="#galera-simulator" className="bg-white hover:bg-teal-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-teal-200 hover:shadow-md">
              Try Replication Simulator
            </Link>
          </div>

          <div className="mt-8 text-xs font-bold text-teal-600 bg-teal-50 border border-teal-100 inline-block px-4 py-2 rounded-lg shadow-sm">
            🚀 Deploy today with a $100 instant infrastructure credit.
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SECTION 1: GALERA MULTI-PRIMARY REPLICATION SIMULATOR ── */}
        <section id="galera-simulator" className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-4">
                  <Database className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                  Three Primaries. Zero Replication Lag.
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  <p>
                    Classic primary-replica setups funnel every write through one node and leave replicas trailing behind it. Neviri deploys production MariaDB as a 3-node Galera cluster where that hierarchy simply does not exist.
                  </p>
                  <p>
                    A transaction sent to any node is certified and committed on all of them in the same instant:
                  </p>
                  <ul className="space-y-3 pt-2 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-teal-500 shrink-0" />
                      <span>Any-node writes: every member is a full read-write primary</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-teal-500 shrink-0" />
                      <span>Synchronous certification: write-sets validated cluster-wide</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-teal-500 shrink-0" />
                      <span>Zero-lag reads: every node returns the same committed state</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Interactive Galera Multi-Primary Replication Simulator */}
              <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-[#0F172A] rounded-[2rem] p-8 border border-slate-800 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 blur-3xl rounded-full pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <GitBranch className="h-5 w-5 text-teal-400" />
                      Galera Replication Simulator
                    </h3>
                    <button
                      onClick={startWriteSimulation}
                      disabled={isWriting}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 transition-all ${
                        isWriting ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed" : "bg-teal-600 border-teal-500 hover:bg-teal-700 text-white cursor-pointer"
                      }`}
                    >
                      <Play className="h-3 w-3 fill-current" /> Write to Node 03
                    </button>
                  </div>

                  {/* Cluster nodes diagram */}
                  <div className="grid grid-cols-3 gap-4 py-4 text-center">
                    {clusterNodes.map((node, idx) => {
                      const isWriteTarget = node.id === 3 && simStep >= 1 && simStep < 4;
                      const isReplicating = node.id !== 3 && simStep >= 2 && simStep < 4;
                      const isCommitted = simStep === 4;
                      return (
                        <div
                          key={node.id}
                          className={`p-4 rounded-xl border transition-all duration-300 ${
                            isCommitted ? "bg-emerald-500/15 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]" :
                            isWriteTarget ? "bg-teal-500/20 border-teal-400 text-white shadow-[0_0_15px_rgba(20,184,166,0.45)]" :
                            isReplicating ? "bg-teal-500/10 border-teal-500/60 text-white" : "bg-slate-800 border-slate-700 text-slate-300"
                          }`}
                        >
                          <Database className={`h-8 w-8 mx-auto mb-2 ${isCommitted ? "text-emerald-400" : isWriteTarget || isReplicating ? "text-teal-300" : "text-teal-400"}`} />
                          <div className="text-xs font-bold">{node.name}</div>
                          <div className="text-[9px] text-slate-400 font-mono mt-1">{node.ip}</div>
                          <span className="inline-block mt-2 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-teal-900/40 text-teal-400">
                            Primary (read-write)
                          </span>
                          <div className={`mt-2 text-[10px] font-mono transition-colors ${isCommitted ? "text-emerald-400" : "text-slate-400"}`}>
                            {committedTx[idx].toLocaleString()} tx committed
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Diagnostic stat tiles */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">Cluster State</span>
                      <span className={`text-[10px] font-black block mt-0.5 ${simStep >= 1 && simStep < 4 ? "text-teal-400" : "text-emerald-400"}`}>
                        {simStep >= 1 && simStep < 4 ? "Replicating" : "Synced (3/3)"}
                      </span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">Replication Lag</span>
                      <span className="text-[10px] text-slate-300 font-bold block mt-0.5">0 ms (synchronous)</span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">Writable Nodes</span>
                      <span className="text-[10px] text-teal-400 font-bold block mt-0.5">3 of 3</span>
                    </div>
                  </div>

                  {/* Simulator log console */}
                  <div className="mt-4 bg-black/60 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-300 h-28 overflow-y-auto">
                    {simStep === 0 && (
                      <p className="text-slate-500 animate-pulse">Cluster synced. All 3 nodes accepting writes. Click Write to Node 03 to issue a transaction...</p>
                    )}
                    {simStep >= 1 && (
                      <p className="text-teal-400">[0.0s] INSERT accepted on Node 03 (10.0.4.12). Write-set assembled.</p>
                    )}
                    {simStep >= 2 && (
                      <p className="text-slate-400">[1.0s] Write-set replicated to cluster peers 10.0.4.10 and 10.0.4.11.</p>
                    )}
                    {simStep >= 3 && (
                      <p className="text-cyan-400">[2.0s] Certification passed on all nodes. No conflicting write-sets detected.</p>
                    )}
                    {simStep >= 4 && (
                      <p className="text-emerald-400">[3.0s] Transaction committed cluster-wide. All node counters advanced in lockstep.</p>
                    )}
                  </div>
                </div>

                <div className="bg-[#1E293B]/60 border border-slate-800 p-4 rounded-xl text-xs text-slate-400 leading-relaxed mt-6">
                  <span className="font-bold text-white block mb-1">Certification-based replication:</span>
                  Galera replicates every transaction write-set synchronously and certifies it against concurrent transactions on every node before commit. There is no replication lag to monitor, and any node in the cluster accepts writes at any time.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: CORE FEATURES GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              Community Engineering, Production Hardened
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Every Managed MariaDB cluster ships with the most powerful open-source capabilities of the engine pre-configured and tuned.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-[1.5rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(20,184,166,0.15)] hover:border-teal-200 transition-all duration-300 group transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 transition-all duration-300 shadow-sm">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-teal-700 transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: ECOSYSTEM INTEGRATION (DARK PANEL) ── */}
        <section>
          <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px]"></div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  <Zap className="h-4 w-4" /> Platform-Native Data Layer
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                  Wired Into the Neviri Ecosystem
                </h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  Your MariaDB cluster plugs directly into Neviri compute, private networking, and storage layers, so the pieces around your database are as managed as the database itself.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {integrationItems.map((item, index) => (
                  <div key={index} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: FRAMEWORK COMPATIBILITY ── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-teal-600 text-xs font-bold uppercase tracking-wider">
                <Code2 className="h-4 w-4" /> Developer workflows
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight">
                Your MySQL Tooling Works on Day One
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Because MariaDB implements the MySQL wire protocol, every mature MySQL driver, ORM, and admin tool in your stack connects without a rewrite. Swap the endpoint, keep the codebase.
              </p>
              <div className="bg-teal-50/50 border border-teal-100 p-4 rounded-xl text-xs text-slate-500">
                The MariaDB thread pool is pre-enabled on every plan, so ORM connection pools and serverless bursts never exhaust server threads.
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {frameworkStacks.map((stack, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-slate-900 text-sm">{stack.title}</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{stack.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: FAQ ACCORDION ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-500">Everything you need to know about Galera clustering, MySQL migration, and recovery guarantees on Neviri.</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openFaqIndex === i ? "border-teal-200 bg-teal-50/30" : "border-gray-200 bg-white hover:border-teal-200"}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
                    aria-expanded={openFaqIndex === i}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <h4 className={`text-lg font-bold transition-colors ${openFaqIndex === i ? "text-teal-700" : "text-[#0F172A]"}`}>
                      {faq.q}
                    </h4>
                    <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaqIndex === i ? "bg-teal-100 text-teal-600" : "bg-gray-50 text-gray-400"}`}>
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openFaqIndex === i ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? "max-h-[800px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-base text-slate-600 leading-relaxed border-t border-teal-100/50 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-slate-500 mb-6">Keep your stack open source. Hand us the operations.</p>
              <Link href={APP_SIGNUP_URL} className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-teal-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Launch MariaDB Cluster <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
