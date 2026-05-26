"use client";

import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/common/Navbar";
import { Terminal } from "lucide-react";
import {
  Cloud,
  Database,
  Shield,
  Zap,
  Globe,
  Settings,
  BarChart3,
  CreditCard,
  Lock,
  Network,
  CheckCircle2,
  ArrowRight,
  Server,
  HardDrive,
  Layers,
  Users,
  Briefcase,
  Code,
  Rocket,
  ChevronDown,
  Check,
  Cpu,
  ShieldCheck,
  Box,
} from "lucide-react";

const SolutionsPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Alternating themes (Indigo and Sky Blue) to match the Hero Gradient
  const faqThemes = [
    {
      activeBorder: "border-[#3B82F6]",
      activeShadow: "shadow-[0_8px_30px_rgba(59,130,246,0.12)]",
      inactiveBorder: "border-[#E2E8F0]",
      hoverBorder: "hover:border-[#94A3B8]",
      textHover: "group-hover:text-[#2563EB]",
      iconBgActive: "bg-[#3B82F6]",
      iconBgInactive: "bg-[#F1F5F9]",
      iconBgHover: "group-hover:bg-[#DBEAFE]",
      chevronActive: "text-white",
      chevronInactive: "text-[#64748B]",
    },
    {
      activeBorder: "border-[#06B6D4]",
      activeShadow: "shadow-[0_8px_30px_rgba(6,182,212,0.12)]",
      inactiveBorder: "border-[#E2E8F0]",
      hoverBorder: "hover:border-[#94A3B8]",
      textHover: "group-hover:text-[#0891B2]",
      iconBgActive: "bg-[#06B6D4]",
      iconBgInactive: "bg-[#F0F9FF]",
      iconBgHover: "group-hover:bg-[#CFFAFE]",
      chevronActive: "text-white",
      chevronInactive: "text-[#64748B]",
    },
  ];

  return (
    <>
      <Head>
        <title>Enterprise Cloud Solutions: VMs, Managed MongoDB & MySQL | Neviri</title>
        <meta
          name="description"
          content="Scale your applications with Neviri's enterprise cloud infrastructure. We offer highly available managed MongoDB & MySQL clusters, scalable Linux/Windows Virtual Machines (VMs), and secure cloud storage solutions."
        />
        <meta
          name="keywords"
          content="cloud infrastructure solutions, scalable virtual machines, managed MongoDB hosting, enterprise MySQL database clusters, cloud computing services, NVMe block storage, cloud VPS hosting, high availability cloud, automated cloud backups, secure cloud networking"
        />
        <meta name="author" content="Neviri Cloud" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Main wrapper with a Clean, Light Blue/Slate Grid theme */}
      <main 
        className="min-h-screen bg-white relative font-sans text-[#0F172A]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 232, 240, 0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          backgroundPosition: "center center",
        }}
      >
        {/* Subtle radial gradient overlay to fade grid at the edges */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(255,255,255,0.9)_100%)] z-0"></div>

        <div className="relative z-10">
          <Navbar />

          {/* Hero Section */}
          <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
            
            {/* Soft, friendly ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3B82F6]/10 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-multiply"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#06B6D4]/10 blur-[100px] rounded-full pointer-events-none -z-10 mix-blend-multiply"></div>

            <div className="relative max-w-7xl mx-auto text-center flex flex-col items-center z-10">
              
              <div className="inline-flex items-center px-5 py-2.5 bg-[#EEF2FF] border border-[#BFDBFE] text-[#3B82F6] rounded-full text-xs font-black uppercase tracking-widest mb-10 hover:scale-110 hover:bg-[#DBEAFE] transition-all duration-500 shadow-sm">
                <span className="w-2 h-2 bg-[#3B82F6] rounded-full mr-3 animate-pulse shadow-[0_0_8px_#3B82F6]"></span>
                High-Performance Cloud Infrastructure
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-[#0F172A] mb-8 leading-[1.1] tracking-tight">
                Scale Your Future with <br className="hidden md:block" />
                <span className="relative inline-block mt-2 group cursor-default">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] transform -skew-x-3 shadow-[0_10px_30px_rgba(59,130,246,0.2)] rounded-xl group-hover:rotate-2 group-hover:scale-105 transition-all duration-500"></span>
                  <span className="relative text-white px-5 py-1 drop-shadow-sm">Enterprise Cloud</span>
                </span>
              </h1>

              <p className="text-lg md:text-2xl text-[#64748B] mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                Deploy lightning-fast Virtual Machines, auto-scaling managed databases, and highly secure networking environments. The ultimate cloud-native platform built for developers and growing enterprises.
              </p>

              <div className="flex flex-wrap justify-center gap-5 mb-10">
                {[
                  { icon: Cpu, text: "Scalable Compute", color: "text-[#3B82F6]", hoverBorder: "hover:border-[#3B82F6]" },
                  { icon: Database, text: "Managed Databases", color: "text-[#06B6D4]", hoverBorder: "hover:border-[#06B6D4]" }, 
                  { icon: Globe, text: "Global Edge Network", color: "text-[#3B82F6]", hoverBorder: "hover:border-[#3B82F6]" },
                ].map((item, idx) => (
                  <div key={idx} className={`bg-white/80 backdrop-blur-md border-2 border-[#E2E8F0] ${item.hoverBorder} rounded-full px-6 py-3 text-[#0F172A] text-sm font-bold hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(59,130,246,0.12)] transition-all duration-400 cursor-pointer flex items-center group`}>
                    <item.icon className={`w-5 h-5 mr-2.5 ${item.color} group-hover:scale-125 transition-transform duration-400`} />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Differentiated Services Portfolio */}
          <section className="relative py-20 px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight">
                  Our Cloud Infrastructure Services
                </h2>
                <p className="text-xl text-[#64748B] max-w-3xl mx-auto font-medium">
                  Whether you need raw compute power, optimized relational databases, or flexible NoSQL document storage, our cloud ecosystem provides production-ready solutions instantly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Cpu,
                    title: "Scalable Virtual Machines",
                    desc: "High-performance cloud compute instances (VPS) backed by fast NVMe storage and dedicated enterprise-grade CPUs. Available in various Linux and Windows distributions.",
                    features: ["Intel & AMD EPYC Processors", "Instant Provisioning (<60s)", "Custom Images & Snapshots", "DDoS Protected Network", "Flexible Auto-Scaling", "Root Access Included"],
                    theme: { border: "hover:border-[#3B82F6]", shadow: "hover:shadow-[0_15px_40px_rgba(59,130,246,0.1)]", iconBg: "group-hover:bg-[#3B82F6]", iconBorder: "group-hover:border-[#3B82F6]", text: "text-[#3B82F6]", fill: "fill-[#EFF6FF]" }
                  },
                  {
                    icon: Database,
                    title: "Managed MongoDB Hosting",
                    desc: "Fully managed NoSQL document database clusters. Build modern, data-intensive applications without worrying about infrastructure management, updates, or scaling.",
                    features: ["Automated Replica Sets", "Built-in Sharding Support", "Point-in-Time Recovery", "Query Performance Insights", "Automated Version Upgrades", "VPC Peering Isolation"],
                    theme: { border: "hover:border-[#06B6D4]", shadow: "hover:shadow-[0_15px_40px_rgba(6,182,212,0.1)]", iconBg: "group-hover:bg-[#06B6D4]", iconBorder: "group-hover:border-[#06B6D4]", text: "text-[#06B6D4]", fill: "fill-[#ECFEFF]" }
                  },
                  {
                    icon: Server,
                    title: "Enterprise MySQL Clusters",
                    desc: "Highly available relational databases engineered for consistency and speed. Ideal for traditional web applications, e-commerce platforms, and mission-critical systems.",
                    features: ["Multi-Master Replication", "Automatic Failover Nodes", "Continuous Daily Backups", "Slow Query Analytics", "Read-Replica Deployment", "End-to-End Encryption"],
                    theme: { border: "hover:border-[#06B6D4]", shadow: "hover:shadow-[0_15px_40px_rgba(6,182,212,0.1)]", iconBg: "group-hover:bg-[#06B6D4]", iconBorder: "group-hover:border-[#06B6D4]", text: "text-[#06B6D4]", fill: "fill-[#ECFEFF]" }
                  },
                  {
                    icon: Box,
                    title: "Storage & Networking",
                    desc: "Complete your architecture with scalable block volumes, S3-compatible object storage, and secure cloud networking to route your traffic intelligently and safely.",
                    features: ["S3-Compatible Object Storage", "Expandable NVMe Volumes", "Global Load Balancers", "Private VPC Networks", "Floating IPs", "Web Application Firewall"],
                    theme: { border: "hover:border-[#3B82F6]", shadow: "hover:shadow-[0_15px_40px_rgba(59,130,246,0.1)]", iconBg: "group-hover:bg-[#3B82F6]", iconBorder: "group-hover:border-[#3B82F6]", text: "text-[#3B82F6]", fill: "fill-[#EFF6FF]" }
                  }
                ].map((service, index) => (
                  <div key={index} className={`bg-white p-8 md:p-10 rounded-[2rem] border-2 border-[#F1F5F9] ${service.theme.border} transition-all duration-500 ease-out ${service.theme.shadow} hover:-translate-y-2 group`}>
                    <div className={`flex items-center gap-5 mb-6`}>
                      <div className={`w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center flex-shrink-0 ${service.theme.iconBg} group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 ease-out border border-[#E2E8F0] ${service.theme.iconBorder}`}>
                        <service.icon className={`w-8 h-8 ${service.theme.text} group-hover:text-white transition-colors duration-300`} />
                      </div>
                      <h3 className="text-2xl font-bold text-[#0F172A]">{service.title}</h3>
                    </div>
                    <p className="text-[#64748B] mb-8 min-h-[48px] text-lg font-medium leading-relaxed">
                      {service.desc}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-3">
                          <CheckCircle2 className={`w-5 h-5 ${service.theme.text} ${service.theme.fill} flex-shrink-0`} />
                          <span className="text-[#334155] font-bold text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Custom Bento Box Features Section */}
          <section className="relative py-20 px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight">
                  Engineered for <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-3 text-white inline-block transform -skew-x-2 shadow-sm">Cloud-Native</span> Excellence
                </h2>
                <p className="text-xl text-[#64748B] max-w-2xl mx-auto font-medium">
                  Features that simplify infrastructure management across compute, storage, and databases.
                </p>
              </div>

              {/* Bento Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Infrastructure as Code (Wide Dark Card) */}
              <div className="md:col-span-2 bg-gradient-to-br from-[#0D1B2A] via-[#0A1628] to-[#071020] p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group border border-[#1E293B] hover:border-[#22D3EE]/60 transition-all duration-500 ease-out hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)] hover:-translate-y-2 flex flex-col gap-8">
  
  {/* Background glow blobs */}
  <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#22D3EE] opacity-[0.07] rounded-full blur-3xl group-hover:opacity-[0.14] group-hover:scale-110 transition-all duration-700 pointer-events-none" />
  <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-[#0EA5E9] opacity-[0.05] rounded-full blur-3xl group-hover:opacity-10 transition-all duration-700 pointer-events-none" />

  {/* Top: icon + text */}
  <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6">
    <div className="shrink-0 w-14 h-14 bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
      <Terminal className="h-7 w-7 text-[#040F1A]" />
    </div>
    <div>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
        Command Line Interface
      </h3>
      <p className="text-[#7E9BB5] font-medium text-base md:text-lg leading-relaxed max-w-xl">
        Manage your VMs, databases, and networks instantly from the terminal with our powerful Neviri CLI.
      </p>
    </div>
  </div>

  {/* Terminal Block — full width */}
  <div className="relative z-10 w-full bg-[#020B14] rounded-2xl border border-[#1E293B] group-hover:border-[#22D3EE]/30 transition-colors duration-500 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
    
    {/* Terminal top bar */}
    <div className="flex items-center justify-between px-5 py-3 border-b border-[#1E293B] bg-[#040F1A]">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/90" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/90" />
        <div className="w-3 h-3 rounded-full bg-green-500/90" />
      </div>
      <span className="text-[#334155] text-xs font-mono tracking-wider">neviri — bash</span>
      <div className="w-16" />
    </div>

    {/* Terminal body */}
    <div className="px-6 py-5 font-mono text-sm space-y-2 leading-relaxed">
      {/* Line 1 */}
      <div className="flex items-center gap-2">
        <span className="text-[#22D3EE] font-bold select-none">❯</span>
        <span className="text-white">neviri vm create</span>
        <span className="text-[#FDE047]">--name</span>
        <span className="text-[#38BDF8]">web-server</span>
        <span className="text-[#FDE047]">--size</span>
        <span className="text-[#38BDF8]">gen2.small</span>
      </div>

      {/* Output 1 */}
      <div className="flex items-center gap-2 pl-5 text-[#475569] text-xs">
        <span className="text-green-400">✔</span>
        <span>VM <span className="text-[#E2E8F0]">web-server</span> created in <span className="text-[#E2E8F0]">in-central-1</span></span>
      </div>

      {/* Line 2 */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-[#22D3EE] font-bold select-none">❯</span>
        <span className="text-white">neviri vm list</span>
        <span className="text-[#FDE047]">--region</span>
        <span className="text-[#38BDF8]">in-central-1</span>
      </div>

      {/* Table-style output */}
      <div className="pl-5 space-y-1 text-xs">
        <div className="flex gap-6 text-[#334155] uppercase tracking-widest text-[10px] pb-1 border-b border-[#1E293B]">
          <span className="w-28">NAME</span>
          <span className="w-20">STATUS</span>
          <span className="w-28">SPEC</span>
          <span>REGION</span>
        </div>
        <div className="flex gap-6 text-[#94A3B8]">
          <span className="w-28 text-[#E2E8F0]">web-server</span>
          <span className="w-20 text-green-400">● running</span>
          <span className="w-28">2vCPU · 4GB</span>
          <span>in-central-1</span>
        </div>
      </div>

      {/* Line 3 */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-[#22D3EE] font-bold select-none">❯</span>
        <span className="text-white">neviri ssh</span>
        <span className="text-[#38BDF8]">web-server</span>
      </div>

      {/* Output 3 with blinking cursor */}
      <div className="flex items-center gap-2 pl-5 text-green-400 text-xs">
        <span className="text-green-400">✔</span>
        <span>Connected to <span className="text-white">web-server</span></span>
        <span className="inline-block w-[7px] h-[14px] bg-[#22D3EE] rounded-sm animate-pulse ml-0.5" />
      </div>
    </div>
  </div>
</div>

                {/* 2. Disaster Recovery */}
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-[#F1F5F9] hover:border-[#06B6D4] transition-all duration-500 ease-out hover:shadow-[0_15px_40px_rgba(6,182,212,0.1)] hover:-translate-y-2 group flex flex-col">
                  <div className="w-14 h-14 bg-[#F8FAFC] rounded-2xl flex items-center justify-center group-hover:bg-[#06B6D4] group-hover:-rotate-6 group-hover:scale-110 transition-all duration-500 mb-6 border border-[#E2E8F0] group-hover:border-[#06B6D4]">
                    <HardDrive className="h-7 w-7 text-[#64748B] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-[#0F172A]">Disaster Recovery</h3>
                  <p className="text-[#64748B] leading-relaxed font-medium">
                    Automated daily backups, point-in-time recovery.
                  </p>
                </div>

                {/* 3. Observability Metrics */}
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-[#F1F5F9] hover:border-[#3B82F6] transition-all duration-500 ease-out hover:shadow-[0_15px_40px_rgba(59,130,246,0.1)] hover:-translate-y-2 group flex flex-col">
                  <div className="w-14 h-14 bg-[#F8FAFC] rounded-2xl flex items-center justify-center group-hover:bg-[#3B82F6] group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 mb-6 border border-[#E2E8F0] group-hover:border-[#3B82F6]">
                    <BarChart3 className="h-7 w-7 text-[#64748B] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-[#0F172A]">Observability Metrics</h3>
                  <p className="text-[#64748B] leading-relaxed font-medium">
                    Granular real-time monitoring. Track CPU, RAM, disk I/O, and query performance natively in the dashboard.
                  </p>
                </div>

                {/* 4. Predictable Billing (Highlight Solid Gradient Card) */}
                <div className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 ease-out hover:shadow-[0_20px_50px_rgba(59,130,246,0.4)] hover:-translate-y-3 group flex flex-col">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 backdrop-blur-sm border border-white/30">
                    <CreditCard className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Predictable Billing</h3>
                  <p className="text-white/90 leading-relaxed font-medium">
                    Usage-based hourly pricing with resource caps. Say goodbye to complex, unpredictable cloud invoices.
                  </p>
                </div>

                {/* 5. Traffic Routing */}
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-[#F1F5F9] hover:border-[#06B6D4] transition-all duration-500 ease-out hover:shadow-[0_15px_40px_rgba(6,182,212,0.1)] hover:-translate-y-2 group flex flex-col">
                  <div className="w-14 h-14 bg-[#F8FAFC] rounded-2xl flex items-center justify-center group-hover:bg-[#06B6D4] group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 mb-6 border border-[#E2E8F0] group-hover:border-[#06B6D4]">
                    <Network className="h-7 w-7 text-[#64748B] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-[#0F172A]">Traffic Routing</h3>
                  <p className="text-[#64748B] leading-relaxed font-medium">
                    Distribute traffic across your VMs with highly available, health-checking Layer 4 and Layer 7 Load Balancers.
                  </p>
                </div>

                {/* 6. Zero-Trust Security */}
                <div className="md:col-span-3 bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-[#F1F5F9] hover:border-[#3B82F6] transition-all duration-500 ease-out hover:shadow-[0_15px_40px_rgba(59,130,246,0.1)] hover:-translate-y-1 group flex flex-col md:flex-row items-start md:items-center gap-8">
                   <div className="w-20 h-20 bg-[#F8FAFC] rounded-[1.5rem] flex items-center justify-center group-hover:bg-[#3B82F6] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 flex-shrink-0 border border-[#E2E8F0] group-hover:border-[#3B82F6]">
                    <ShieldCheck className="h-10 w-10 text-[#64748B] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#0F172A]">Zero-Trust Security</h3>
                    <p className="text-[#64748B] leading-relaxed font-medium text-lg max-w-3xl">
                      Isolate environments using Private Cloud (VPC), configure strict Cloud Firewalls, and utilize IAM roles right out of the box.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="relative py-20 px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight">
                  Built for Every Workload
                </h2>
                <p className="text-xl text-[#64748B] max-w-2xl mx-auto font-medium">
                  From simple web hosting on VMs to complex microservices requiring managed databases.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Rocket,
                    title: "SaaS Startups",
                    description: "Launch fast with easily scalable VMs and managed MongoDB clusters. Minimize DevOps overhead.",
                    colorClass: "hover:border-[#3B82F6]",
                    bgHoverClass: "group-hover:bg-[#3B82F6]",
                    shadowClass: "hover:shadow-[0_15px_40px_rgba(59,130,246,0.12)]"
                  },
                  {
                    icon: Briefcase,
                    title: "E-Commerce",
                    description: "Handle seasonal traffic spikes using Auto-scaling Compute and highly available MySQL replicas.",
                    colorClass: "hover:border-[#06B6D4]",
                    bgHoverClass: "group-hover:bg-[#06B6D4]",
                    shadowClass: "hover:shadow-[0_15px_40px_rgba(6,182,212,0.12)]"
                  },
                  {
                    icon: Code,
                    title: "Dev & Test Env",
                    description: "Spin up low-cost development virtual machines and clone database clusters in minutes.",
                    colorClass: "hover:border-[#0EA5E9]",
                    bgHoverClass: "group-hover:bg-[#06B6D4]",
                    shadowClass: "hover:shadow-[0_15px_40px_rgba(6,182,212,0.12)]"
                  },
                  {
                    icon: Users,
                    title: "Enterprise Apps",
                    description: "Deploy secure, VPC-isolated architecture with strict IAM controls and real-time observability.",
                    colorClass: "hover:border-[#3B82F6]",
                    bgHoverClass: "group-hover:bg-[#3B82F6]",
                    shadowClass: "hover:shadow-[0_15px_40px_rgba(59,130,246,0.12)]"
                  },
                ].map((useCase, index) => (
                  <div
                    key={index}
                    className={`bg-white p-8 rounded-[2rem] border-2 border-[#F1F5F9] ${useCase.colorClass} hover:-translate-y-2 transition-all duration-500 ease-out group ${useCase.shadowClass}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ease-out bg-[#F8FAFC] border border-[#E2E8F0] ${useCase.bgHoverClass} group-hover:border-transparent`}>
                      <useCase.icon className="w-7 h-7 transition-all duration-500 ease-out text-[#64748B] group-hover:text-white group-hover:scale-125" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                      {useCase.title}
                    </h3>
                    <p className="text-[#64748B] leading-relaxed font-medium">
                      {useCase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="relative py-20 px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-[#64748B] font-medium">
                  Everything you need to know about our VMs, databases, and cloud infrastructure.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    question: "What is the difference between Virtual Machines and Managed Databases?",
                    answer: "Virtual Machines (VMs) provide you with raw compute power and full root access where you manage the OS and software. Managed Databases (MongoDB, MySQL) are Platform-as-a-Service (PaaS) offerings where we handle the database installation, security patches, clustering, and backups for you.",
                  },
                  {
                    question: "How quickly do Virtual Machines and Clusters provision?",
                    answer: "Our infrastructure is highly optimized. Virtual Machines typically provision and boot up in under 45 seconds. Complex Managed Database clusters (like a 3-node MongoDB Replica Set) are usually ready for connections within 2 to 3 minutes.",
                  },
                  {
                    question: "Can I migrate my existing databases to Neviri Cloud?",
                    answer: "Yes! We provide seamless migration tools and dedicated technical support for moving existing MongoDB, MySQL, and PostgreSQL workloads. We ensure zero to minimal downtime during the transfer.",
                  },
                  {
                    question: "How does the pricing and billing model work?",
                    answer: "Billing is entirely usage-based with hourly granularity. You only pay for the exact hours your VMs, databases, or storage volumes exist. We also offer monthly predictable caps so you never exceed your budget.",
                  },
                  {
                    question: "Are my virtual machines and databases secure?",
                    answer: "Absolutely. All compute and database resources can be deployed within a private Virtual Private Cloud (VPC), isolated from the public internet. We also offer cloud firewalls, DDoS protection, and automated encryption at rest and in transit.",
                  },
                  {
                    question: "How are automated database backups handled?",
                    answer: "Automated backups are a core feature of our Managed Databases. We take daily snapshots and retain transaction logs, allowing for Point-in-Time Recovery (PITR). You can restore your data to the exact minute an accidental deletion occurred.",
                  },
                ].map((faq, index) => {
                  const theme = faqThemes[index % 2];
                  return (
                    <div
                      key={index}
                      className={`bg-white border-2 rounded-[1.5rem] overflow-hidden transition-all duration-300 ${
                        openFAQ === index 
                          ? `${theme.activeBorder} ${theme.activeShadow}` 
                          : `${theme.inactiveBorder} ${theme.hoverBorder}`
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full p-6 md:p-8 text-left flex items-center justify-between focus:outline-none cursor-pointer group"
                      >
                        <span className={`text-lg md:text-xl font-bold text-[#0F172A] pr-8 transition-colors duration-300 ${theme.textHover}`}>
                          {faq.question}
                        </span>
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                            openFAQ === index ? theme.iconBgActive : `${theme.iconBgInactive} ${theme.iconBgHover}`
                          }`}
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              openFAQ === index ? `transform rotate-180 ${theme.chevronActive}` : theme.chevronInactive
                            }`}
                          />
                        </div>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openFAQ === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 text-[#64748B] text-base md:text-lg font-medium leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-24 px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-5xl mx-auto text-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-16 px-6 sm:px-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-2 border-[#334155] hover:border-[#3B82F6]/50 transition-colors duration-500 overflow-hidden">
              
              {/* Ambient background accents for the CTA */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#3B82F6]/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white px-6 py-2 rounded-full text-sm font-extrabold uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  Get Started
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight mt-4 relative z-10">
                Deploy Your Infrastructure Today
              </h2>
              <p className="text-xl text-[#94A3B8] mb-10 max-w-3xl mx-auto font-medium relative z-10">
                {/* ESCAPED QUOTES FIX applied below (Neviri's -> Neviri&apos;s) */}
                Join thousands of developers and tech-forward businesses scaling their applications on Neviri&apos;s high-performance cloud platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
                <a
                  href="https://sng-central.neviri.com"
                  className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white px-8 py-4 rounded-full font-extrabold text-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:-translate-y-1 transition-all duration-300 transform flex items-center justify-center space-x-3 group cursor-pointer"
                >
                  <span>Deploy a VM or Database</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
                <a
                  href="/support"
                  className="bg-transparent border-2 border-[#475569] text-white px-8 py-4 rounded-full font-bold text-lg hover:border-white hover:bg-white hover:text-[#0F172A] transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default SolutionsPage;