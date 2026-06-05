"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Activity,
  Zap,
  Lock,
  Globe,
  Sliders,
  GitBranch,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Server,
  AlertTriangle,
  Play,
  Cpu,
  RefreshCw,
  Terminal,
  FileCheck,
  Settings
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function CloudFirewallPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // States for Live Packet Filter Simulator
  const [packetType, setPacketType] = useState(null); // 'legit' or 'attack'
  const [filterStep, setFilterStep] = useState(0); // 0: Idle, 1: Hitting Edge FW, 2: Processed (Dropped or Forwarded), 3: VM CPU reading
  const [vmCpuLoad, setVmCpuLoad] = useState(0);

  useEffect(() => {
    if (!packetType) return;
    setFilterStep(1);
    setVmCpuLoad(0);

    const timers = [];

    if (packetType === "legit") {
      timers.push(setTimeout(() => setFilterStep(2), 1000)); // Allowed at Edge
      timers.push(setTimeout(() => {
        setFilterStep(3);
        setVmCpuLoad(3); // Normal temporary CPU load increase (e.g. 3%)
      }, 2000));
      timers.push(setTimeout(() => {
        setFilterStep(0);
        setPacketType(null);
        setVmCpuLoad(0);
      }, 4500));
    } else if (packetType === "attack") {
      timers.push(setTimeout(() => setFilterStep(2), 1000)); // Dropped at Edge!
      timers.push(setTimeout(() => {
        setFilterStep(3);
        setVmCpuLoad(0); // VM CPU stays at 0% because packet never reached it!
      }, 2000));
      timers.push(setTimeout(() => {
        setFilterStep(0);
        setPacketType(null);
        setVmCpuLoad(0);
      }, 4500));
    }

    return () => timers.forEach(clearTimeout);
  }, [packetType]);

  const [activeTab, setActiveTab] = useState("configA");

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "Does applying a Cloud Firewall slow down my application response times?",
      a: "No. Neviri Cloud Firewalls do not rely on software-defined routing layers running inside shared compute spaces. The packet analysis is processed directly within our hardware-accelerated networking plane. Packets are evaluated at line-rate speeds, meaning your network latency remains identical whether you have 1 rule active or 100 rules active."
    },
    {
      q: "What happens if I accidentally create a rule that locks me out of my instance?",
      a: "Because Neviri handles infrastructure control externally, you can never permanently lock yourself out of management systems. If you accidentally write an inbound rule that blocks your own IP address from SSH access, simply log into the centralized Neviri Cloud dashboard from any web browser, locate the firewall attached to your instance, delete or modify the restrictive rule, and the access updates globally within seconds."
    },
    {
      q: "Can I attach a single Cloud Firewall configuration to multiple servers simultaneously?",
      a: "Yes. This is the recommended operational methodology on Neviri. You can create a reusable security policy called 'Production-Web-Sec-Group.' Any time you provision a new Neviri VM or scale out your application tier horizontally, you simply apply that security group tag to the new resource. The server instantly inherits the entire suite of security rules automatically."
    },
    {
      q: "How do Cloud Firewalls interact with the Neviri VPC?",
      a: "They serve as complementary security layers. Your VPC establishes a private, isolated network perimeter where servers can interact without public visibility. The Cloud Firewall operates within that private network to regulate which private servers can talk to each other, introducing true micro-segmentation and preventing a breach in one application node from compromising your entire network grid."
    }
  ];

  const features = [
    {
      icon: Activity,
      title: "Stateful Packet Inspection (SPI)",
      desc: "Evaluates connections based on context. Initiating outbound requests (like API pings) dynamically opens return paths, eliminating tedious bidirectional rule definitions."
    },
    {
      icon: Cpu,
      title: "Hardware Edge Dropping",
      desc: "Eval is executed at the hypervisor network interface layer before traffic hits your VM. Protects your CPU/RAM cycles from brute-force botnets completely."
    },
    {
      icon: Settings,
      title: "Micro-Segmented Tags",
      desc: "Assign firewalls directly to security tags (e.g. 'Production-Web') instead of shifting static IP ranges. Newly spun-up nodes inherit rules automatically."
    },
    {
      icon: Sliders,
      title: "Granular Rule Control",
      desc: "Define inbound and outbound limits on specific ports (SSH 22, TCP/UDP, HTTP 80/443) based on IP address subnets, CIDR ranges, or logical clusters."
    },
    {
      icon: Lock,
      title: "Zero-Lockout Console",
      desc: "Accidentally blocked your IP? Manage edge settings externally from our web dashboard. Restore connections immediately with zero data risk."
    },
    {
      icon: Zap,
      title: "Line-Rate Throughput",
      desc: "Evaluations happen directly within Neviri's hardware network routing switches. Evaluates a single packet or thousands with identical sub-millisecond latency."
    }
  ];

  const configBlueprints = {
    configA: {
      title: "Configuration A: Public Web Edge",
      subtitle: "Best for front-facing routing layers like load balancers or proxy servers.",
      inbound: [
        { port: "80", protocol: "TCP", source: "0.0.0.0/0 (Anywhere)", action: "Allow" },
        { port: "443", protocol: "TCP", source: "0.0.0.0/0 (Anywhere)", action: "Allow" },
        { port: "22 (SSH)", protocol: "TCP", source: "Any", action: "Block" }
      ],
      outbound: [
        { port: "All Ports", protocol: "All", destination: "0.0.0.0/0", action: "Allow" }
      ],
      note: "Note: SSH and database ports are strictly blocked at the hardware perimeter. Outbound traffic is kept unrestricted for analytics and updates."
    },
    configB: {
      title: "Configuration B: Isolated Application Cluster",
      subtitle: "For internal compute nodes (APIs, workers, etc.) in your VPC.",
      inbound: [
        { port: "3000 / 8080", protocol: "TCP", source: "production-edge-lb (Tag)", action: "Allow" },
        { port: "22 (SSH)", protocol: "TCP", source: "production-bastion-host (Tag)", action: "Allow" },
        { port: "Any Public", protocol: "All", source: "0.0.0.0/0 (Anywhere)", action: "Block" }
      ],
      outbound: [
        { port: "All Ports", protocol: "All", destination: "VPC Subnet", action: "Allow" },
        { port: "443 (HTTPS)", protocol: "TCP", source: "Stripe API/GitHub (NAT)", action: "Allow" }
      ],
      note: "Note: App VMs are isolated. Only the load balancer is allowed to forward web requests, and SSH is locked to the Bastion host."
    },
    configC: {
      title: "Configuration C: Hardened Storage & Data Tier",
      subtitle: "For database servers housing critical assets (Postgres, MySQL).",
      inbound: [
        { port: "5432 (Postgres)", protocol: "TCP", source: "production-app-nodes (Tag)", action: "Allow" },
        { port: "All other internal", protocol: "All", source: "VPC Subnet", action: "Block" },
        { port: "Any Public", protocol: "All", source: "Any", action: "Block" }
      ],
      outbound: [
        { port: "Any Outbound", protocol: "All", destination: "Anywhere", action: "Block" }
      ],
      note: "Note: The database has zero route to the internet. Strict egress blocks prevent compromised scripts from executing external database dumps."
    }
  };

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-indigo-500/20 rounded-full blur-[95px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(16,185,129,0.15)] transform transition-transform hover:scale-105">
            <Shield className="h-4 w-4 text-emerald-500" /> Stateful Perimeter Security
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            Distributed Line-Rate Protection. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-sky-600 to-indigo-600">Zero Server Overhead.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Neviri Cloud Firewalls provide stateful network inspection at the hypervisor layer. Filter inbound request flows, restrict outbound database egress, and drop attack traffic before it ever touches your compute nodes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="https://sng-central.neviri.com/signup" className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-lg shadow-slate-900/25">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Deploy a Cloud Firewall
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="#blueprints" className="bg-white hover:bg-emerald-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-emerald-200 hover:shadow-md">
              View Security Blueprints
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SECTION 1: STATEFUL FIREWALLS VS OS FILTERS & SIMULATOR ── */}
        <section className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                  Stateful Firewalls vs. Operating System Filters
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  <p>
                    Software firewalls (like UFW or iptables) run directly inside the VM&apos;s OS. When an attack hits, the server&apos;s CPU and RAM are wasted parsing, validating, and dropping those malicious packets. A severe Denial of Service (DoS) attack will crash the OS before your app can even receive clean traffic.
                  </p>
                  <p>
                    Neviri Cloud Firewalls operate at the **hypervisor network interface layer** (vNIC), completely external to your virtual machines. Packets are evaluated at our hardware boundary:
                  </p>
                  <ul className="space-y-3 pt-2 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                      <span>Zero CPU impact on your VMs during high traffic spikes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                      <span>Centralized control to avoid firewall configurations drift</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                      <span>Stateful awareness: Outbound pings automatically open responses</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Live Packet Filter Simulator */}
              <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2rem] p-8 border border-slate-800 shadow-2xl relative flex flex-col justify-between min-h-[500px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Activity className="h-5 w-5 text-emerald-400" />
                      Live Packet Edge Filter
                    </h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { if (!packetType) setPacketType("legit"); }}
                        disabled={!!packetType}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 transition-all ${
                          packetType ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed" : "bg-emerald-600 border-emerald-500 hover:bg-emerald-700 text-white cursor-pointer"
                        }`}
                      >
                        <Play className="h-3 w-3 fill-current" /> Send Web Traffic
                      </button>
                      <button 
                        onClick={() => { if (!packetType) setPacketType("attack"); }}
                        disabled={!!packetType}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 transition-all ${
                          packetType ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed" : "bg-red-950 border-red-800 text-red-400 hover:bg-red-900 cursor-pointer"
                        }`}
                      >
                        <AlertTriangle className="h-3.5 w-3.5" /> Launch DDoS Scan
                      </button>
                    </div>
                  </div>

                  {/* Simulator Graphic */}
                  <div className="relative py-4 flex flex-col items-center gap-4">
                    
                    {/* Visual representation of flow */}
                    <div className="w-full flex items-center justify-between px-4">
                      {/* Source */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                          packetType ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-slate-700 border-slate-600 text-slate-200"
                        }`}>
                          <Globe className="h-5 w-5" />
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1">Traffic source</span>
                      </div>

                      {/* Edge Firewall */}
                      <div className="flex flex-col items-center relative">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                          filterStep === 1 ? "bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] border-amber-400 scale-105" :
                          filterStep >= 2 && packetType === "attack" ? "bg-red-500/20 text-red-500 border-red-500/50 scale-105 animate-pulse" :
                          filterStep >= 2 && packetType === "legit" ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] border-emerald-400" : "bg-slate-800 border-slate-700 text-slate-300"
                        }`}>
                          <Shield className="h-5 w-5" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 mt-1">Edge Firewall</span>
                        <span className="text-[8px] text-slate-500 font-mono">Hypervisor Layer</span>
                      </div>

                      {/* App VM */}
                      <div className="flex flex-col items-center relative">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                          filterStep === 3 && packetType === "legit" ? "bg-indigo-500 text-white border-indigo-400 scale-105" : "bg-slate-800 border-slate-700 text-slate-300"
                        }`}>
                          <Server className="h-5 w-5" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 mt-1">Neviri VM</span>
                        <span className="text-[8px] text-slate-500 font-mono">vNIC Layer</span>
                      </div>
                    </div>

                    {/* Stats display */}
                    <div className="w-full grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Firewall Status</span>
                        <span className={`text-xs font-black block mt-1 uppercase ${
                          filterStep >= 2 && packetType === "attack" ? "text-red-500" : 
                          filterStep >= 2 && packetType === "legit" ? "text-emerald-400" : "text-slate-400"
                        }`}>
                          {filterStep === 0 ? "Monitoring" :
                           filterStep === 1 ? "Inspecting" :
                           packetType === "attack" ? "Blocked (Dropped)" : "Allowed (Forward)"}
                        </span>
                      </div>

                      <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">VM CPU Load</span>
                        <span className={`text-xs font-black block mt-1 font-mono ${
                          vmCpuLoad > 0 ? "text-amber-400" : "text-emerald-400"
                        }`}>
                          {vmCpuLoad}.00%
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-400 leading-relaxed mt-6">
                  <span className="font-bold text-white block mb-1">Trace log details:</span>
                  {packetType === "legit" ? (
                    <span className="text-emerald-400 font-medium"> Packet matches rule Allow:TCP:443. Forwarding to virtual NIC. VM handles decryption request (temporary 3.00% CPU overhead).</span>
                  ) : packetType === "attack" ? (
                    <span className="text-red-400 font-medium">Malicious IP/port scan detected. Evaluated at hypervisor boundary. Packet dropped at hardware layer. VM CPU remains completely unaffected.</span>
                  ) : (
                    <span>/Initiate a mock request to trace packet filtration logs at the hypervisor edge.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: CORE FEATURES GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              Stateful Cloud Firewall Features
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              We have abstracted away server-level iptables calculations. Secure port structures and govern global networks from a unified plane.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-[1.5rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:border-emerald-200 transition-all duration-300 group transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300 shadow-sm">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-emerald-700 transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: TOPOLOGY MAP (DARK PANEL) ── */}
        <section>
           <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
             <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
             
             <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <Sliders className="h-4 w-4" /> Multi-Tier Perimeter Mapping
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                    Micro-Segmented Security Architecture
                  </h2>
                  <p className="text-slate-400 text-base leading-relaxed">
                    Visual flow showing how incoming requests are checked by consecutive stateful firewalls at each infrastructure transition.
                  </p>
                </div>

                {/* CSS Structured Topology Flow */}
                <div className="space-y-6 max-w-2xl mx-auto">
                  
                  {/* Step 1 */}
                  <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">1</div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Global Edge Firewall</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Filters malicious IPs globally and limits public ports strictly to 80/443.</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-mono uppercase bg-slate-950 border border-slate-800 px-2 py-1 rounded">Perimeter</span>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-slate-800" />
                  </div>

                  {/* Step 2 */}
                  <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">2</div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Neviri Edge Load Balancer</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Accepts public requests, terminates SSL encryption, and routes into the private VPC.</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-mono uppercase bg-slate-950 border border-slate-800 px-2 py-1 rounded">SSL Termin</span>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-slate-800" />
                  </div>

                  {/* Step 3 */}
                  <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Application Instance Firewall</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Strictly limits incoming traffic to Port 3000 originating ONLY from Load Balancers.</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 font-mono uppercase bg-emerald-950 border border-emerald-900/30 px-2 py-1 rounded">Micro-Seg</span>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-slate-800" />
                  </div>

                  {/* Step 4 */}
                  <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">4</div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Database Layer Firewall</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Blocks all outside routes. Allows traffic ONLY on database ports (5432) from App tags.</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-red-400 font-mono uppercase bg-red-950/20 border border-red-900/20 px-2 py-1 rounded">Air-Gap</span>
                  </div>

                </div>

             </div>
           </div>
        </section>

        {/* ── SECTION 4: STRATEGIC CONFIGURATION BLUEPRINTS ── */}
        <section id="blueprints" className="scroll-mt-32">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
              Strategic Implementation Blueprints
            </h2>
            <p className="text-base text-slate-500">
              Apply these pre-configured infrastructure templates directly within your cloud dashboard.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200/80 shadow-md">
            
            {/* Tabs control */}
            <div className="flex flex-col sm:flex-row gap-3 border-b border-slate-200 pb-6 mb-8">
              <button
                onClick={() => setActiveTab("configA")}
                className={`px-5 py-3 rounded-xl font-bold text-sm text-left transition-all ${
                  activeTab === "configA" ? "bg-[#0F172A] text-white shadow-md scale-[1.02]" : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Config A: Public Web Edge
              </button>
              <button
                onClick={() => setActiveTab("configB")}
                className={`px-5 py-3 rounded-xl font-bold text-sm text-left transition-all ${
                  activeTab === "configB" ? "bg-[#0F172A] text-white shadow-md scale-[1.02]" : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Config B: Application Cluster
              </button>
              <button
                onClick={() => setActiveTab("configC")}
                className={`px-5 py-3 rounded-xl font-bold text-sm text-left transition-all ${
                  activeTab === "configC" ? "bg-[#0F172A] text-white shadow-md scale-[1.02]" : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Config C: Hardened Storage Tier
              </button>
            </div>

            {/* Selected Tab content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0F172A]">{configBlueprints[activeTab].title}</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{configBlueprints[activeTab].subtitle}</p>
              </div>

              {/* Rules Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                      <th className="p-4 rounded-l-lg">Port / Service</th>
                      <th className="p-4">Protocol</th>
                      <th className="p-4">Source / Destination</th>
                      <th className="p-4 rounded-r-lg">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {/* Inbound */}
                    <tr className="bg-slate-50/30 text-[11px] font-extrabold uppercase text-slate-400">
                      <td colSpan="4" className="px-4 py-2 bg-slate-50/50">Inbound Rules</td>
                    </tr>
                    {configBlueprints[activeTab].inbound.map((rule, idx) => (
                      <tr key={`in-${idx}`} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-[#0F172A]">{rule.port}</td>
                        <td className="p-4 font-mono text-slate-500 text-xs">{rule.protocol}</td>
                        <td className="p-4 font-semibold text-slate-600">{rule.source}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                            rule.action === "Allow" ? "bg-emerald-50 border border-emerald-100 text-emerald-600" : "bg-red-50 border border-red-100 text-red-500"
                          }`}>
                            {rule.action}
                          </span>
                        </td>
                      </tr>
                    ))}
                    
                    {/* Outbound */}
                    <tr className="bg-slate-50/30 text-[11px] font-extrabold uppercase text-slate-400">
                      <td colSpan="4" className="px-4 py-2 bg-slate-50/50">Outbound Rules</td>
                    </tr>
                    {configBlueprints[activeTab].outbound.map((rule, idx) => (
                      <tr key={`out-${idx}`} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-[#0F172A]">{rule.port}</td>
                        <td className="p-4 font-mono text-slate-500 text-xs">{rule.protocol}</td>
                        <td className="p-4 font-semibold text-slate-600">{rule.destination}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                            rule.action === "Allow" ? "bg-emerald-50 border border-emerald-100 text-emerald-600" : "bg-red-50 border border-red-100 text-red-500"
                          }`}>
                            {rule.action}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-slate-500 italic leading-relaxed">
                {configBlueprints[activeTab].note}
              </div>
            </div>

          </div>
        </section>

        {/* ── SECTION 5: FAQ ACCORDION ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-500">Everything you need to know about stateful evaluation latency, team permission overrides, and security group tags.</p>
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
              <p className="text-slate-500 mb-6">Create global security rules in seconds.</p>
              <Link href="https://sng-central.neviri.com/signup" className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-emerald-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Deploy Stateful Firewall <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
