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
  Code2,
  HardDrive,
  Sparkles,
  AlertTriangle,
  Play
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { APP_SIGNUP_URL } from "@/config/api";

export default function MongoDBPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // States for the interactive MongoDB Replica Set Failover Simulator
  const [nodes, setNodes] = useState([
    { id: 1, name: "Mongo Node 01", role: "Primary", status: "healthy", ip: "10.0.3.10" },
    { id: 2, name: "Mongo Node 02", role: "Secondary", status: "healthy", ip: "10.0.3.11" },
    { id: 3, name: "Mongo Node 03", role: "Secondary", status: "healthy", ip: "10.0.3.12" }
  ]);
  const [simStep, setSimStep] = useState(0); // 0: Idle, 1: Outage, 2: Heartbeat loss, 3: Election, 4: Elected
  const [isSimulating, setIsSimulating] = useState(false);

  const startFailoverSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    // Step 1: Crash Primary
    setNodes(prev =>
      prev.map(node => (node.id === 1 ? { ...node, status: "offline", role: "Offline" } : node))
    );

    // Step 2: Heartbeat Loss Detected
    setTimeout(() => {
      setSimStep(2);
    }, 1500);

    // Step 3: Consensus & Election
    setTimeout(() => {
      setSimStep(3);
    }, 3000);

    // Step 4: Elect Node 02 as Primary
    setTimeout(() => {
      setSimStep(4);
      setNodes(prev =>
        prev.map(node => {
          if (node.id === 2) return { ...node, role: "Primary" };
          return node;
        })
      );
    }, 4500);

    // Reset Simulation after completion
    setTimeout(() => {
      // Restore Node 01 as Secondary
      setNodes([
        { id: 1, name: "Mongo Node 01", role: "Secondary", status: "healthy", ip: "10.0.3.10" },
        { id: 2, name: "Mongo Node 02", role: "Primary", status: "healthy", ip: "10.0.3.11" },
        { id: 3, name: "Mongo Node 03", role: "Secondary", status: "healthy", ip: "10.0.3.12" }
      ]);
      setSimStep(0);
      setIsSimulating(false);
    }, 7500);
  };

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "What is a MongoDB Replica Set and why is it configured by default?",
      a: "A Replica Set is a group of mongod processes that maintain the same data set. In production, Neviri provisions a minimum 3-node replica set (one Primary and two Secondaries). The Primary node receives all write operations. The Secondaries replicate the Primary's oplog and apply the operations to their data sets. If the Primary goes offline (due to hardware or network failure), the remaining nodes automatically execute an election protocol to select a new Primary, restoring write availability in seconds without code changes."
    },
    {
      q: "How does Neviri scale MongoDB storage and memory specs?",
      a: "Neviri support seamless vertical and horizontal scaling. If you experience storage bottlenecks, you can expand your NVMe SSD capacity directly from the dashboard with zero downtime. To increase CPU or RAM capacity, you can upgrade your plan. The system executes a rolling update across your replica set: upgrading one Secondary node, failing over, and then upgrading the remaining nodes, keeping your cluster fully active throughout the process."
    },
    {
      q: "Are my MongoDB database records encrypted at rest and in transit?",
      a: "Yes. Neviri forces TLS/SSL connections for all MongoDB client queries in transit, blocking insecure unencrypted payloads. At rest, all underlying volume sectors and backups are encrypted using AES-256 standard encryption keys. Combined with private network confinement in a VPC, your database remains fully compliant with HIPAA, SOC 2, and PCI-DSS requirements."
    },
    {
      q: "Can I deploy MongoDB database shards for massive datasets?",
      a: "Yes. For petabyte-scale workloads or high-write volume apps that exceed single-node limits, Neviri supports distributed sharding. We provision config servers, query routers (mongos), and shard replica sets, distributing database documents horizontally across separate compute grids based on your custom shard keys."
    },
    {
      q: "How do automated backups and restores work for document databases?",
      a: "Neviri takes daily automated snapshots of your replica set data volumes without causing connection freezes. We also back up oplog transactions continuously, enabling Point-in-Time Recovery (PITR). If an accidental operation or migration corrupts your data, you can restore a new replica set to the exact second prior to the incident."
    }
  ];

  const features = [
    {
      icon: HardDrive,
      title: "Ultra-Fast NVMe Storage",
      desc: "Our MongoDB clusters are backed by high-performance NVMe SSDs, ensuring sub-millisecond document read/write latencies and high IOPS throughput."
    },
    {
      icon: Cpu,
      title: "Dedicated Compute Nodes",
      desc: "Run production databases on dedicated CPU and memory instances to guarantee performance isolation and prevent noisy-neighbor constraints."
    },
    {
      icon: Sliders,
      title: "Replica Set Elections",
      desc: "Includes automated heartbeat monitoring. If the primary node fails, consensus protocols elect a new primary node dynamically under 5 seconds."
    },
    {
      icon: RefreshCw,
      title: "Continuous Oplog Backups",
      desc: "Daily snapshots combined with oplog journaling enable Point-in-Time Recovery (PITR). Restore your cluster database state to any specific second."
    },
    {
      icon: Zap,
      title: "Built-In Connection Routing",
      desc: "Provides unified connection strings with automatic failover fallback options. Drivers dynamically discover primary nodes during failovers."
    },
    {
      icon: Server,
      title: "VPC Private Peering",
      desc: "Restrict databases from public routes. Bind managed clusters to private VPC networks, allowing queries exclusively from backend app nodes."
    }
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-sky-400/20 to-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(16,185,129,0.15)] transform transition-transform hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Fully Managed NoSQL Document Database
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            Scale Without Schemas. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]">Managed MongoDB Made Simple.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Neviri Managed MongoDB delivers fully orchestrated replica sets, continuous automated backups, and private VPC security. Store JSON-like documents and scale databases horizontally without operational overhead.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href={APP_SIGNUP_URL} className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-lg shadow-slate-900/25">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Deploy MongoDB Cluster
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="#replica-visualizer" className="bg-white hover:bg-sky-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-emerald-200 hover:shadow-md">
              Try Failover Simulator
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SECTION 1: REPLICA SETS & FAILOVER SIMULATOR ── */}
        <section id="replica-visualizer" className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                  <Database className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                  High-Availability Document Storage
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  <p>
                    Document-oriented applications need continuous write availability. At Neviri, every production MongoDB engine is deployed as a 3-node replica set distributed across separate hardware regions.
                  </p>
                  <p>
                    If a database node crashes, the cluster maintains operational continuity without requiring intervention:
                  </p>
                  <ul className="space-y-3 pt-2 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                      <span>Raft-Based Consensus: Automated replica primary elections</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                      <span>Zero Code Adjustments: Connection strings track primary changes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                      <span>Data Syncing: Secondary nodes replicate oplog streams continuously</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Interactive MongoDB Replica Set Failover Simulator */}
              <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-[#0F172A] rounded-[2rem] p-8 border border-slate-800 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sliders className="h-5 w-5 text-emerald-400" />
                      Replica Set Election Simulator
                    </h3>
                    <button
                      onClick={startFailoverSimulation}
                      disabled={isSimulating}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 transition-all ${
                        isSimulating ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed" : "bg-emerald-600 border-emerald-500 hover:bg-emerald-700 text-white cursor-pointer"
                      }`}
                    >
                      <Play className="h-3 w-3 fill-current" /> Crash Primary Node
                    </button>
                  </div>

                  {/* Nodes diagram */}
                  <div className="grid grid-cols-3 gap-4 py-6 text-center">
                    {nodes.map(node => (
                      <div
                        key={node.id}
                        className={`p-4 rounded-xl border transition-all ${
                          node.status === "offline" ? "bg-red-500/10 border-red-500/40 opacity-50" :
                          node.role === "Primary" ? "bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "bg-slate-800 border-slate-700 text-slate-300"
                        }`}
                      >
                        <Database className={`h-8 w-8 mx-auto mb-2 ${node.status === "offline" ? "text-red-500" : node.role === "Primary" ? "text-emerald-400" : "text-sky-400"}`} />
                        <div className="text-xs font-bold">{node.name}</div>
                        <div className="text-[9px] text-slate-400 font-mono mt-1">{node.ip}</div>
                        <span className={`inline-block mt-3 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          node.status === "offline" ? "bg-red-900/30 text-red-400" :
                          node.role === "Primary" ? "bg-emerald-900/40 text-emerald-400" : "bg-slate-700 text-slate-400"
                        }`}>
                          {node.role}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Simulator logs box */}
                  <div className="mt-8 bg-black/60 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-300 h-28 overflow-y-auto">
                    {simStep === 0 && (
                      <p className="text-slate-500 animate-pulse">Replica Set is running healthy. Click Crash Primary Node to trigger outage...</p>
                    )}
                    {simStep === 1 && (
                      <p className="text-red-400">[0.0s] Primary Node 01 (10.0.3.10) experienced an outage. Outbound check failed.</p>
                    )}
                    {simStep === 2 && (
                      <div className="space-y-1">
                        <p className="text-red-400">[0.0s] Primary Node 01 (10.0.3.10) experienced an outage. Outbound check failed.</p>
                        <p className="text-slate-400">[1.5s] Heartbeat check: Nodes 02 & 03 lost connection to Node 01.</p>
                      </div>
                    )}
                    {simStep === 3 && (
                      <div className="space-y-1">
                        <p className="text-red-400">[0.0s] Primary Node 01 (10.0.3.10) experienced an outage. Outbound check failed.</p>
                        <p className="text-slate-400">[1.5s] Heartbeat check: Nodes 02 & 03 lost connection to Node 01.</p>
                        <p className="text-amber-400">[3.0s] consensus protocol active. Initiating new Primary election...</p>
                      </div>
                    )}
                    {simStep === 4 && (
                      <div className="space-y-1">
                        <p className="text-red-400">[0.0s] Primary Node 01 (10.0.3.10) experienced an outage. Outbound check failed.</p>
                        <p className="text-slate-400">[1.5s] Heartbeat check: Nodes 02 & 03 lost connection to Node 01.</p>
                        <p className="text-amber-400">[3.0s] consensus protocol active. Initiating new Primary election...</p>
                        <p className="text-emerald-400">[4.5s] Node 02 (10.0.3.11) elected as new Primary! Write operations resumed.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#1E293B]/60 border border-slate-800 p-4 rounded-xl text-xs text-slate-400 leading-relaxed mt-6">
                  <span className="font-bold text-white block mb-1">Failover mechanism details:</span>
                  Neviri driver links automatically receive failover signals. Read and write commands are rerouted to the new Primary node without connection dropouts.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: CORE FEATURES GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              Enterprise MongoDB Architecture
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              We provision and configure NoSQL environments optimized for scale, consistency, and absolute data durability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-[1.5rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:border-emerald-200 transition-all duration-300 group transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-[#059669] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#059669] group-hover:text-white group-hover:border-[#059669] transition-all duration-300 shadow-sm">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#047857] transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: ECOSYSTEM INTEGRATION (DARK PANEL) ── */}
        <section>
           <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
             <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
             
             <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <Zap className="h-4 w-4" /> Integrated Cloud Network
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                    Synchronized Cloud Integration
                  </h2>
                  <p className="text-slate-400 text-base leading-relaxed">
                    Managed MongoDB integrates with our compute and storage layers for optimal NoSQL document delivery.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Compute Synchronization</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Inject MongoDB connection strings directly into web containers at deploy time, safely utilizing environment variables.
                    </p>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                      <GitBranch className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">VPC Subnet Security</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Deploy MongoDB replica sets inside private VPC networks with zero public routes, preventing external document harvesting.
                    </p>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                      <HardDrive className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Object Storage Backups</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Replicate database archive files continuously to durable S3-compatible buckets, keeping primary database storage light.
                    </p>
                  </div>
                </div>
             </div>
           </div>
        </section>

        {/* ── SECTION 4: FRAMEWORK COMPATIBILITY ── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                <Code2 className="h-4 w-4" /> Developer workflows
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight">
                Optimized for Modern NoSQL Drivers
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Connect seamlessly using standard MongoDB Mongoose ODM, MongoDB Node driver, or equivalent frameworks. Neviri supports standard wire protocols out of the box.
              </p>
              <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl text-xs text-slate-500">
                Index recommendations are generated dynamically to optimize lookup query performance and avoid CPU constraints.
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Mongoose / Node.js", desc: "Easily integrate document schemas, hooks, and validations inside Express, Koa, or NestJS server grids." },
                { title: "Python PyMongo / Motor", desc: "Run asynchronous document searches inside FastAPI or Tornado microservices without query blockages." },
                { title: "Go Driver & Structs", desc: "Bind documents to Go types and execute aggregate queries rapidly at line-rate database speeds." },
                { title: "Spring Data MongoDB", desc: "Establish stable connection pooling and transaction states for enterprise Java microservices." }
              ].map((stack, idx) => (
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
              <p className="text-lg text-slate-500">Everything you need to know about automated updates, database replication, and scaling policies on Neviri.</p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openFaqIndex === i ? 'border-sky-200 bg-sky-50/30' : 'border-gray-200 bg-white hover:border-sky-200'}`}
                >
                  <button 
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-0 cursor-pointer group"
                  >
                    <h4 className={`text-lg font-bold transition-colors ${openFaqIndex === i ? 'text-emerald-700' : 'text-[#0F172A]'}`}>
                      {faq.q}
                    </h4>
                    <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaqIndex === i ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-50 text-gray-400'}`}>
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-[800px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-base text-slate-600 leading-relaxed border-t border-sky-100/50 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-slate-500 mb-6">Unleash the speed of flexible schema architectures.</p>
              <Link href={APP_SIGNUP_URL} className="inline-flex items-center gap-2 bg-[#0F172A] hover:hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Initialize MongoDB Cluster <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
