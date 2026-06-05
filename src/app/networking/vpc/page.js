"use client";

import React, { useState, useEffect } from "react";
import {
  GitBranch,
  Shield,
  Lock,
  Globe,
  Cpu,
  Database,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Zap,
  Server,
  Terminal,
  Activity,
  AlertTriangle,
  Play,
  LockKeyhole
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function VPCPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // States for the interactive DMZ visualizer
  const [simType, setSimType] = useState(null); // 'legit' or 'attack'
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (!simType) return;
    setAnimationStep(1);
    
    const timers = [];
    
    // Simulate steps in sequence
    if (simType === "legit") {
      timers.push(setTimeout(() => setAnimationStep(2), 1000)); // Hits LB
      timers.push(setTimeout(() => setAnimationStep(3), 2000)); // Relays to App (VPC)
      timers.push(setTimeout(() => setAnimationStep(4), 3000)); // Queries DB (VPC)
      timers.push(setTimeout(() => setAnimationStep(5), 4200)); // Success response
      timers.push(setTimeout(() => {
        setAnimationStep(0);
        setSimType(null);
      }, 5500));
    } else if (simType === "attack") {
      timers.push(setTimeout(() => setAnimationStep(2), 1200)); // Blocked at perimeter (no path)
      timers.push(setTimeout(() => {
        setAnimationStep(0);
        setSimType(null);
      }, 3500));
    }

    return () => timers.forEach(clearTimeout);
  }, [simType]);

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "Does placing my database in a VPC mean my application can't reach the internet?",
      a: "No. A VPC isolates incoming (ingress) connections from the public internet. By default, resources within a Neviri VPC can still initiate outbound (egress) connections to the internet (for example, if your Node.js server needs to ping the Stripe API or download an NPM package). This outbound traffic is safely routed through Neviri’s managed NAT layer, keeping the server's internal identity hidden while allowing it to fetch external data."
    },
    {
      q: "Can I connect two different VPCs together?",
      a: "Currently, Neviri VPCs are designed as strictly isolated environments to ensure maximum security boundaries between separate projects or environments (e.g., keeping your 'Staging VPC' completely disconnected from your 'Production VPC'). If resources must communicate across project boundaries, they should do so via explicit, authenticated API calls routed through public or internal load balancing gateways."
    },
    {
      q: "Do I have to pay extra for a Virtual Private Cloud?",
      a: "No. At Neviri, we believe that foundational security should not be a premium add-on. The creation and management of Virtual Private Clouds, along with all the internal, unmetered bandwidth used within them, is provided at absolutely no additional cost. You only pay for the underlying Compute (VMs), Storage, and Edge Networking (Load Balancers) resources you provision."
    },
    {
      q: "How do I migrate my existing public servers into a private VPC?",
      a: "If you have currently deployed Neviri VMs or databases on the public network, migrating them into a VPC requires a brief architectural shift. For databases, the safest path is to provision a new Managed Database inside the target VPC, establish logical replication from your public database to the new private one, update your application connection strings, and then safely decommission the public database. For stateless compute VMs, you simply update your deployment pipeline to target the new VPC, spin up the new private instances, attach them to your Load Balancer, and destroy the old public instances."
    }
  ];

  const features = [
    {
      icon: LockKeyhole,
      title: "Zero-Trust Isolation",
      desc: "Assign non-routable private IPs (RFC 1918) like 10.0.x.x. External scanners cannot target or even locate your servers since they are literally invisible."
    },
    {
      icon: GitBranch,
      title: "Intelligent IPAM Engine",
      desc: "No manual calculations of subnet CIDRs or setting up complex routing tables. Our software-defined network automatically configures gates and routes."
    },
    {
      icon: Activity,
      title: "Line-Rate Throughput",
      desc: "VPC communication traverses high-speed physical data center fabrics at wire speeds. Low millisecond API exchanges and database queries."
    },
    {
      icon: Zap,
      title: "Unmetered Bandwidth",
      desc: "All East-West traffic routing between servers, databases, and caches within the private VPC is completely unmetered, generating zero bandwidth costs."
    },
    {
      icon: Shield,
      title: "Micro-Segmentation Support",
      desc: "Bind Stateful Cloud Firewalls to logical resource tags inside your VPC. Restrict internal ports so compromised instances cannot compromise database grids."
    },
    {
      icon: Globe,
      title: "Secure Outbound NAT",
      desc: "Outbound requests (e.g., Stripe API calls) bypass ingress blocks safely using automated NAT gateways. Servers stay updated while remaining secure."
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-sky-400/20 via-indigo-500/10 to-indigo-500/20 rounded-full blur-[95px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 text-sky-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(99,102,241,0.15)] transform transition-transform hover:scale-105">
            <Lock className="h-4 w-4 text-indigo-500" /> Software-Defined Private Networks
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            Invisibility is the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-indigo-700">Ultimate Network Defense.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Remove your databases, APIs, and microservices from the public internet entirely. Neviri VPC creates logically isolated network perimeters where instances communicate freely—safe, secure, and invisible to scanning botnets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="https://sng-central.neviri.com/signup" className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-lg shadow-slate-900/25">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Create a Private VPC
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="#simulator" className="bg-white hover:bg-sky-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-sky-200 hover:shadow-md">
              View DMZ Architectures
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SECTION 1: FLAVORS OF PUBLIC-BY-DEFAULT & DMZ SIMULATOR ── */}
        <section id="simulator" className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                  <GitBranch className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                  The Flaw of Public-by-Default Infrastructure
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  <p>
                    Within minutes of provisioning a server with a public IP address, automated scripts map and probe it for open ports. OS-level firewalls help, but leaving critical databases directly exposed to the internet creates severe risks of misconfiguration, zero-day exploits, and compliance failures.
                  </p>
                  <p>
                    Neviri VPC isolates backend environments logically. We separate your architecture into a private software-defined space:
                  </p>
                  <ul className="space-y-3 pt-2 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                      <span>Zero Public Access for Databases & App servers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                      <span>Single Secure Ingress Gateway at the Edge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                      <span>RFC 1918 Private IP ranges (e.g. 10.0.0.0/16)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Interactive DMZ Simulator */}
              <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-[#0F172A] rounded-[2rem] p-8 border border-slate-800 shadow-2xl relative flex flex-col justify-between min-h-[500px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Terminal className="h-5 w-5 text-indigo-400" />
                      VPC DMZ Flow Visualizer
                    </h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { if (!simType) setSimType("legit"); }}
                        disabled={!!simType}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 transition-all ${
                          simType ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed" : "bg-indigo-600 border-indigo-500 hover:bg-indigo-700 text-white cursor-pointer"
                        }`}
                      >
                        <Play className="h-3 w-3 fill-current" /> Route Request
                      </button>
                      <button 
                        onClick={() => { if (!simType) setSimType("attack"); }}
                        disabled={!!simType}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 transition-all ${
                          simType ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed" : "bg-red-950 border-red-800 text-red-400 hover:bg-red-900 cursor-pointer"
                        }`}
                      >
                        <AlertTriangle className="h-3.5 w-3.5" /> Scan DB Port
                      </button>
                    </div>
                  </div>

                  {/* Nodes diagram */}
                  <div className="grid grid-cols-4 items-center justify-center relative py-6 text-center gap-2">
                    
                    {/* Public Internet Client */}
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        simType ? "bg-slate-800 text-slate-400 border border-slate-700" : "bg-slate-700 text-white border border-slate-600 shadow-md"
                      }`}>
                        <Globe className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 mt-2 block">Visitor</span>
                      <span className="text-[9px] text-slate-500 font-mono">198.51.100.1</span>
                    </div>

                    {/* Edge Load Balancer */}
                    <div className="flex flex-col items-center relative">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        animationStep === 2 ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400 scale-105" : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}>
                        <Server className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold text-indigo-400 mt-2 block">Edge LB</span>
                      <span className="text-[9px] text-slate-500 font-mono">159.203.10.1</span>
                      
                      {/* Connection Line indicator */}
                      <div className={`absolute top-6 -left-[60%] w-[60%] h-0.5 z-0 ${
                        simType === "legit" && animationStep >= 1 ? "bg-indigo-500 transition-colors" : "bg-slate-800"
                      }`} />
                    </div>

                    {/* Private App VM */}
                    <div className="flex flex-col items-center relative">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        animationStep === 3 ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400 scale-105" : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}>
                        <Cpu className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-300 mt-2 block">App VM</span>
                      <span className="text-[9px] text-slate-500 font-mono">10.0.1.15</span>
                      
                      <div className={`absolute top-6 -left-[60%] w-[60%] h-0.5 z-0 ${
                        simType === "legit" && animationStep >= 2 ? "bg-indigo-500 transition-colors" : "bg-slate-800"
                      }`} />
                    </div>

                    {/* Private Database */}
                    <div className="flex flex-col items-center relative">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        animationStep === 4 ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-400 scale-105" :
                        simType === "attack" && animationStep === 2 ? "bg-red-500/20 text-red-500 border border-red-500/50 scale-105 animate-bounce" : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}>
                        <Database className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-300 mt-2 block">MySQL DB</span>
                      <span className="text-[9px] text-slate-500 font-mono">10.0.2.8</span>
                      
                      <div className={`absolute top-6 -left-[60%] w-[60%] h-0.5 z-0 ${
                        simType === "legit" && animationStep >= 3 ? "bg-indigo-500 transition-colors" : "bg-slate-800"
                      }`} />
                    </div>

                  </div>

                  {/* Simulator logs box */}
                  <div className="mt-8 bg-black/60 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-300 h-28 overflow-y-auto">
                    {!simType && (
                      <p className="text-slate-500 animate-pulse"> Select an action to view routing trace...</p>
                    )}
                    {simType === "legit" && (
                      <div className="space-y-1">
                        <p className="text-slate-400">[0.0s] Visitor request sent to load balancer IP 159.203.10.1</p>
                        {animationStep >= 2 && <p className="text-indigo-400">[1.0s] Edge LB: terminated SSL; routing to internal target pool...</p>}
                        {animationStep >= 3 && <p className="text-indigo-400">[2.0s] VPC Router: forwarding traffic to 10.0.1.15 over private lane</p>}
                        {animationStep >= 4 && <p className="text-emerald-400">[3.0s] MySQL: authorized internal connection request from App Node</p>}
                        {animationStep >= 5 && <p className="text-emerald-500 font-bold">[4.2s] Success: 200 OK responded back to visitor in 48ms!</p>}
                      </div>
                    )}
                    {simType === "attack" && (
                      <div className="space-y-1">
                        <p className="text-red-400">[0.0s] External scan trying to reach 10.0.2.8 (DB) on Port 3306</p>
                        {animationStep >= 2 && (
                          <>
                            <p className="text-red-500 font-bold">[1.2s] Error: route to private destination IP 10.0.2.8 is non-existent on the public gateway.</p>
                            <p className="text-slate-400">[1.5s] Security notice: request discarded at edge router. 0 packets reached DB.</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#1E293B]/60 border border-slate-800 p-4 rounded-xl text-xs text-slate-400 leading-relaxed mt-6">
                  <span className="font-bold text-white block mb-1">Defense mechanisms illustrated:</span>
                  1. <span className="text-indigo-400 font-bold">Ingress Shielding</span>: External port scanners cannot resolve private IP routing grids. Outbound NAT continues to work automatically for external updates (e.g. package management).
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: CORE FEATURES GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              Software-Defined Infrastructure Controls
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Neviri VPC offers enterprise security boundaries without requiring manual routing overheads or gateway calculations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-[1.5rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:border-indigo-200 transition-all duration-300 group transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300 shadow-sm">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-indigo-700 transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: ARCHITECTING THE DMZ (DARK PANEL) ── */}
        <section>
           <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
             <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"></div>
             
             <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <Shield className="h-4 w-4" /> Multi-Tier Segmentation
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                    Architecting the Modern DMZ
                  </h2>
                  <p className="text-slate-400 text-base leading-relaxed">
                    By segmenting resources inside different logical layers, your databases and core application servers remain protected from direct internet vulnerabilities.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Tier 1 */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-bold uppercase text-indigo-400">
                      Tier 1: Edge (Public)
                    </span>
                    <div className="mt-4 space-y-3">
                      <h4 className="text-lg font-bold text-white">Neviri Load Balancer</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Exposed to the public internet (Ports 80/443). Serves as the single secure entrance. Cryptographic handshake processes are completed at the edge, protecting compute servers.
                      </p>
                    </div>
                  </div>

                  {/* Tier 2 */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-bold uppercase text-indigo-400">
                      Tier 2: App (Private)
                    </span>
                    <div className="mt-4 space-y-3">
                      <h4 className="text-lg font-bold text-white">Application Servers</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Compute VMs or Shared CPU instances inside the VPC. No public IPs assigned. Accepts sanitized requests forwarded exclusively from the edge Load Balancer over private subnets.
                      </p>
                    </div>
                  </div>

                  {/* Tier 3 */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-bold uppercase text-indigo-400">
                      Tier 3: Data (Private)
                    </span>
                    <div className="mt-4 space-y-3">
                      <h4 className="text-lg font-bold text-white">Managed DB Tier</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        MySQL or PostgreSQL clusters provisioned deep within the VPC. Accepts connections originating strictly from Tier 2 IPs. Insulated against lateral threat movements.
                      </p>
                    </div>
                  </div>
                </div>
             </div>
           </div>
        </section>

        {/* ── SECTION 4: CI/CD & BASTION HOSTS (USE CASES TIER) ── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                <Terminal className="h-4 w-4" /> Operations & Access
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight">
                Seamless Deployment into the Void
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  Deploying code to private servers typically requires complex bastion hosts or fragile VPN tunnels. Neviri App Deployment solves this natively:
                </p>
                <p>
                  When you push code to GitHub or GitLab, our secure runners temporarily tunnel into your VPC using encrypted, ephemeral gateways. The build is deployed directly into the private network with zero public footprint required.
                </p>
                <p>
                  For manual access (e.g. db migrations), senior engineers can configure a highly restricted Bastion Host, using centralized SSH Key Injection to audit actions and secure administrative entry.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
                Strategic ROI of Private Networking
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Frictionless Compliance Audits</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Prove logical resource separation to satisfy SOC 2, HIPAA, and PCI-DSS compliance audits easily without configuring custom scripts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Reduced Cyber Insurance Premiums</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Routing traffic exclusively through load balancers and VPC perimeters drastically shrinks public threat surface area, lowering premium evaluations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Zero-Cost Internal Bandwidth</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Heavy internal replication, API requests, and storage traffic over Layer 2 fabrics are completely free and unmetered, ending billing surprises.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: FAQ ACCORDION ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-500">Everything you need to know about private subnet routing, gateway structures, and database migration into Neviri VPC.</p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openFaqIndex === i ? 'border-sky-200 bg-sky-50/30' : 'border-gray-200 bg-white hover:border-sky-200'}`}
                >
                  <button 
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <h4 className={`text-lg font-bold transition-colors ${openFaqIndex === i ? 'text-indigo-700' : 'text-[#0F172A]'}`}>
                      {faq.q}
                    </h4>
                    <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaqIndex === i ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-400'}`}>
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
              <p className="text-slate-500 mb-6">Shield your critical cloud infrastructure today.</p>
              <Link href="https://sng-central.neviri.com/signup" className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-indigo-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Deploy VPC Network <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
