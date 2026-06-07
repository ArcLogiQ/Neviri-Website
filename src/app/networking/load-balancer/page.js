"use client";

import React, { useState, useEffect } from "react";
import {
  Sliders,
  Server,
  Activity,
  Shield,
  Zap,
  Globe,
  GitBranch,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Lock,
  RefreshCw,
  Key,
  Cpu,
  Sparkles,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { APP_SIGNUP_URL } from "@/config/api";

export default function LoadBalancerPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // States for interactive simulator
  const [nodes, setNodes] = useState([
    { id: 1, name: "Web Node 01", status: "healthy", ip: "10.0.1.15" },
    { id: 2, name: "Web Node 02", status: "healthy", ip: "10.0.1.16" },
    { id: 3, name: "Web Node 03", status: "healthy", ip: "10.0.1.17" }
  ]);
  const [pulseCount, setPulseCount] = useState(0);

  // Periodic animation pulse representing incoming user requests
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleNodeStatus = (id) => {
    setNodes(prev => 
      prev.map(node => {
        if (node.id === id) {
          const nextStatus = node.status === "healthy" ? "offline" : "healthy";
          return { ...node, status: nextStatus };
        }
        return node;
      })
    );
  };

  // Compute traffic distribution dynamically during render to avoid useEffect state synchronization
  const activeNodes = nodes.filter(n => n.status === "healthy");
  const activeCount = activeNodes.length;

  const nodesWithTraffic = nodes.map(node => {
    if (node.status === "offline") {
      return { ...node, traffic: 0 };
    }
    if (activeCount === 0) {
      return { ...node, traffic: 0 };
    }
    const splitTraffic = Math.floor(100 / activeCount);
    // Distribute remainder to first active node
    const isFirstActive = activeNodes[0]?.id === node.id;
    const remainder = 100 - (splitTraffic * activeCount);
    return { 
      ...node, 
      traffic: isFirstActive ? splitTraffic + remainder : splitTraffic 
    };
  });

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "What is the difference between Layer 4 and Layer 7 load balancing on Neviri?",
      a: "Layer 4 load balancing operates at the transport level (TCP). It routes traffic purely based on IP routing and port data without inspecting the contents of the network packets, making it incredibly fast and resource-efficient for raw databases or streaming applications. Layer 7 load balancing operates at the application level (HTTP/HTTPS). It inspects the actual headers, cookies, and URI paths of incoming requests, allowing you to execute advanced routing decisions—such as sending /api requests to one pool of servers and /static requests to another."
    },
    {
      q: "Can a Neviri Load Balancer distribute traffic across different regions?",
      a: "Neviri Load Balancers are designed to distribute traffic with ultra-low latency across multiple isolated fault domains within a single localized cloud infrastructure region. This provides robust high availability against localized hardware grid disruptions. For multi-country or global distribution strategies, our networking tier integrates cleanly with global anycast DNS routing layers."
    },
    {
      q: "How long does it take for a failed server to be removed from the active pool?",
      a: "This is completely dependent on your custom health check configuration. If you configure your health check probe to run every 2 seconds with an unhealthiness threshold of 2 consecutive failures, an unresponsive server will be dropped from active traffic routing in exactly 4 seconds, keeping user-facing errors minimized."
    },
    {
      q: "Does configuring a load balancer introduce a new single point of failure?",
      a: "No. Neviri Load Balancers are built on top of a highly redundant, active-active physical networking architecture. When you provision a load balancer, our underlying orchestration layer distributes the processing load across multiple isolated network gateways automatically. If a physical network interface experiences an issue, another instantly shoulders the capacity with zero disruption to your public IP availability."
    }
  ];

  const features = [
    {
      icon: Sliders,
      title: "Round Robin Routing",
      desc: "Distributes incoming requests sequentially across your pool of backend instances—ideal for uniform web servers handling similar task loads."
    },
    {
      icon: Activity,
      title: "Least Connections",
      desc: "Dynamically routes traffic to the server currently handling the fewest active sessions. This prevents performance bottlenecks during long-running API calls."
    },
    {
      icon: Key,
      title: "Source IP Hashing (Sticky Sessions)",
      desc: "Hashes the client's IP to ensure a user is consistently routed to the exact same backend instance. Critical for legacy stateful apps."
    },
    {
      icon: Zap,
      title: "Proactive Health Probes",
      desc: "Continuously monitors target pools using customizable HTTP/TCP health probes. Instantly drops unresponsive nodes from the active pool."
    },
    {
      icon: RefreshCw,
      title: "Automated Failover",
      desc: "The moment an offline node recovers and passes its checks, the load balancer safely bleeds traffic back onto it without manual intervention."
    },
    {
      icon: Shield,
      title: "Edge SSL/TLS Offloading",
      desc: "Encryption is terminated at the load balancer level. Traffic is then routed over our secure private network in plain text, saving backend CPU cycles."
    }
  ];

  const integrationItems = [
    {
      icon: Cpu,
      title: "Compute Tier Synchronization",
      desc: "Whether you are scaling out multiple Virtual Machines (VMs) or running stateless web workers on Shared CPU instances, our load balancers bridge the gap seamlessly. Mix and match instance sizes depending on scaling needs."
    },
    {
      icon: GitBranch,
      title: "VPC Private Routing",
      desc: "Shield your database and application logic from direct internet exposure. Configure your Load Balancer to accept public requests and forward them exclusively through private, non-routable backends in a Neviri VPC."
    },
    {
      icon: Shield,
      title: "Stateful Firewall Coordination",
      desc: "Protect your load balancing edge by placing a Cloud Firewall directly in front of it. Block malicious IP blocks, throttle brute-force attacks at the perimeter, and ensure only clean, legitimate traffic hits your network."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden relative" style={gridBg}>
      
      {/* Subtle top fade for the grid background */}
      <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />

      {/* Navbar layer – FORCE MAX Z-INDEX to prevent gradient bleed-through */}
      <div className="relative z-[9999] w-full">
        <Navbar />
      </div>

      {/* ── HERO SECTION ── */}
      <header className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 text-center overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-sky-400/20 to-blue-500/20 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 text-sky-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(14,165,233,0.15)] transform transition-transform hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            High-Availability Traffic Orchestration
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            Intelligent Edge Routing. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700">Zero Downtime Guaranteed.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Neviri Load Balancers provide high-performance, fully managed traffic distribution across your compute infrastructure. Shield your backend servers from traffic spikes, coordinate seamless deployments, and route requests with sub-millisecond latencies.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href={APP_SIGNUP_URL} className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-lg shadow-slate-900/25">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Deploy a Load Balancer
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/pricing" className="bg-white hover:bg-sky-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-sky-200 hover:shadow-md">
              Explore Product Pricing
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-sky-500" /> Active-Active Redundancy
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-sky-500" /> Layer 4 & Layer 7 Routing
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-sky-500" /> Automated SSL Integration
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SECTION 1: SIMULATOR & SINGLE POINT OF FAILURE ── */}
        <section className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4">
                  <Sliders className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                  Eliminating the Single Point of Failure
                </h2>
                <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
                  <p>
                    In a traditional, single-server setup, your application is inherently fragile. If that instance experiences a memory leak, a hardware failure, or undergoes a routine operating system reboot, your entire business goes dark.
                  </p>
                  <p>
                    Neviri structures its cloud ecosystem around three distinct pillars: Compute, Storage, and Networking. Our Load Balancers sit natively within the Networking tier to completely eliminate infrastructure fragility by introducing true horizontal scalability.
                  </p>
                  <p>
                    Instead of routing users directly to a virtual machine, you route them to a Neviri Load Balancer. It acts as an intelligent reverse proxy, balancing incoming HTTP, HTTPS, and TCP requests across a pool of healthy backend servers. If one server fails, the load balancer bypasses it entirely, rerouting traffic to surviving instances seamlessly.
                  </p>
                </div>
              </div>
              
              {/* Interactive Load Balancer Simulator */}
              <div className="lg:col-span-6 bg-gradient-to-br from-slate-50 to-sky-50/30 rounded-[2rem] p-8 border border-sky-100 shadow-inner relative overflow-hidden flex flex-col justify-between min-h-[480px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-sky-200/20 blur-3xl rounded-full pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-sky-100">
                    <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-sky-500" />
                      Live Failover Simulator
                    </h3>
                    <span className="text-xs text-sky-600 font-bold bg-sky-50 border border-sky-100 rounded-md px-2.5 py-1 uppercase tracking-wider animate-pulse">
                      Click Node to Fail
                    </span>
                  </div>

                  {/* Simulator Graphic */}
                  <div className="relative py-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    
                    {/* Public Traffic Source */}
                    <div className="flex flex-col items-center z-10">
                      <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center justify-center shadow-lg relative">
                        <Globe className="h-6 w-6" />
                        <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-500 mt-2">Public Traffic</span>
                    </div>

                    {/* Load Balancer Gateway */}
                    <div className="flex flex-col items-center z-10">
                      <div className="w-16 h-16 rounded-2xl bg-sky-600 border border-sky-500 text-white flex items-center justify-center shadow-xl relative animate-none">
                        <Sliders className="h-7 w-7" />
                        {/* Dynamic pinging pulses to illustrate request throughput */}
                        <span key={pulseCount} className="absolute inset-0 rounded-2xl bg-sky-400/40 animate-ping pointer-events-none" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 mt-2">Neviri Edge LB</span>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">159.203.48.1</span>
                    </div>

                    {/* Backend Server Pool */}
                    <div className="flex flex-col gap-4 w-full md:w-52">
                      {nodesWithTraffic.map(node => (
                        <button
                          key={node.id}
                          onClick={() => toggleNodeStatus(node.id)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left shadow-sm hover:scale-[1.02] ${
                            node.status === "healthy"
                              ? "bg-white border-emerald-100 hover:border-emerald-300"
                              : "bg-red-50/50 border-red-100 hover:border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              node.status === "healthy" 
                                ? "bg-emerald-50 text-emerald-600" 
                                : "bg-red-100 text-red-600"
                            }`}>
                              {node.status === "healthy" ? <Server className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0F172A]">{node.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{node.ip}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                              node.status === "healthy" ? "text-emerald-600" : "text-red-500"
                            }`}>
                              {node.status}
                            </span>
                            <span className="text-xs font-bold text-slate-600 block mt-0.5">
                              {node.traffic}% load
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                  </div>
                </div>

                <div className="bg-white/80 border border-sky-100/50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed mt-6">
                  <span className="font-bold text-[#0F172A]">How failover works here:</span> Toggle any node offline to simulate a crash. The Neviri Load Balancer instantly detects the failure via edge health probes and automatically redistributes 100% of user traffic among the remaining healthy servers.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: CORE PILLARS GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              Core Pillars of Neviri Traffic Management
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Our load balancing infrastructure is designed to handle enterprise-grade workloads with absolute operational simplicity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-[1.5rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(14,165,233,0.1)] hover:border-sky-200 transition-all duration-300 group transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-all duration-300 shadow-sm">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-sky-700 transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: ZERO DOWNTIME DEPLOYMENT (DARK BLOCK) ── */}
        <section>
           <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
             <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
             
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <Zap className="h-4 w-4" /> Seamless CI/CD Rollouts
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                    Architecting Zero-Downtime Deployments
                  </h2>
                  <p className="text-lg text-slate-400 leading-relaxed font-medium">
                    One of the greatest points of friction in the software development lifecycle is pushing updates to production without interrupting active user sessions. Neviri Load Balancers serve as the mechanical foundation for seamless release orchestration.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-sky-500/30 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Blue-Green Deployments</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Spin up an identical server pool running new code (Green) alongside production (Blue). Swing 100% of traffic instantly. Roll back dynamically with zero dropped packets if bugs occur.
                      </p>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-sky-500/30 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
                        <Sliders className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Canary Rollouts & Controlled Bleeds</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Incrementally shift traffic weights. Funnel 5% of users to a single node running your new features while monitoring error rates, then scale up as your confidence grows.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Visual Pipeline of Traffic Split */}
                <div className="lg:col-span-5 w-full">
                  <div className="bg-[#111827]/85 backdrop-blur-xl rounded-[2rem] border border-slate-700/50 p-8 shadow-2xl relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 pt-2">
                      Traffic Orchestration Control
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Active Blue pool */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            Stable Environment (Blue)
                          </span>
                          <span className="font-mono text-blue-400">95%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000" style={{ width: "95%" }} />
                        </div>
                      </div>

                      {/* Canary Green pool */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            New Release Node (Green/Canary)
                          </span>
                          <span className="font-mono text-emerald-400">5%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-1000" style={{ width: "5%" }} />
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-700/50 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Lock className="w-3 h-3" />
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Encryption terminates at the Load Balancer level (SSL Offloading), allowing seamless inspection of application paths before routing.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                            <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: "8s" }} />
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Rollback engine initialized: 0.00s latency check. Active session persistence handles user connections securely.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
             </div>
           </div>
        </section>

        {/* ── SECTION 4: DEEP INTEGRATION (USE CASES) ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              Deep Integration with the Neviri Cloud Fabric
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Neviri Load Balancers do not operate in isolation; they serve as the connective tissue that binds your entire computing, storage, and database stack into a highly cohesive, fault-tolerant infrastructure network.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrationItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-[1.8rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-sky-600 font-bold group-hover:text-sky-700 transition-colors flex items-center gap-1">
                  Learn more about cloud design
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: MASSIVE SEO FAQ ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-500">Everything you need to know about our high-availability load balancing, routing protocols, and failover capabilities.</p>
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
                    <h4 className={`text-lg font-bold transition-colors ${openFaqIndex === i ? 'text-sky-700' : 'text-[#0F172A]'}`}>
                      {faq.q}
                    </h4>
                    <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaqIndex === i ? 'bg-sky-100 text-sky-600' : 'bg-gray-50 text-gray-400'}`}>
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
              <p className="text-slate-500 mb-6">Ready to secure and distribute your application traffic?</p>
              <Link href={APP_SIGNUP_URL} className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Get Started with Load Balancers <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
