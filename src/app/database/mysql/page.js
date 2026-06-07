"use client";

import React, { useState } from "react";
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
  HardDrive
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { APP_SIGNUP_URL } from "@/config/api";

export default function MySQLPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // States for the interactive scaling simulator
  const [selectedPlan, setSelectedPlan] = useState("standard");

  const plans = {
    starter: {
      name: "Starter Database",
      price: 15,
      cpu: "1 Shared vCPU",
      ram: "1 GB RAM",
      storage: "25 GB NVMe SSD",
      iops: "3,000 IOPS",
      scaleFactor: "scale-90"
    },
    standard: {
      name: "Standard Database",
      price: 60,
      cpu: "2 Dedicated vCPUs",
      ram: "4 GB RAM",
      storage: "80 GB NVMe SSD",
      iops: "7,500 IOPS",
      scaleFactor: "scale-100"
    },
    pro: {
      name: "Professional Database",
      price: 120,
      cpu: "4 Dedicated vCPUs",
      ram: "8 GB RAM",
      storage: "160 GB NVMe SSD",
      iops: "15,000 IOPS",
      scaleFactor: "scale-105"
    }
  };

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "What is the difference between Managed MySQL and self-hosting MySQL on a Neviri VM?",
      a: "When you host MySQL yourself on a Virtual Machine, you are responsible for the entire operational lifecycle. You must install the engine, configure replication, set up daily backup cron jobs, apply security patches, and manually intervene if the server crashes. With Neviri Managed MySQL, we handle all of these administrative tasks automatically. You simply connect your application to the provided endpoint and start querying."
    },
    {
      q: "How does Neviri handle database scaling?",
      a: "Neviri offers smart layer scaling. If you realize your database requires more CPU or RAM to handle increased traffic, you can select a larger compute plan directly from the dashboard. For single-node clusters, there is a brief interruption as the instance restarts with the new resources. For High Availability (HA) clusters, we utilize a rolling upgrade process, upgrading the standby node first, failing over, and then upgrading the primary node, resulting in near-zero downtime."
    },
    {
      q: "Are my database backups encrypted?",
      a: "Yes. All automated backups and Point-in-Time Recovery (PITR) transaction logs are heavily encrypted at rest using AES-256 encryption. They are stored securely on highly durable infrastructure separate from your primary database node to ensure data survival even in the case of a complete hardware failure."
    },
    {
      q: "Can I connect to my Managed MySQL instance from outside the Neviri Cloud?",
      a: "Yes, but security is strictly controlled. By default, for maximum security, we recommend keeping your database within a private VPC and only allowing access from your Neviri VMs or App Deployments. However, if you need to connect an external BI tool or manage the database from your local machine, you can assign a public connection string and use the Neviri Cloud Firewall to restrict access exclusively to your specific IP address."
    },
    {
      q: "How do I migrate my existing database to Neviri?",
      a: "Migrating is a straightforward process. For smaller databases, you can generate a standard SQL dump file using the mysqldump utility and import it directly into your new Neviri Managed MySQL instance via the command line. For larger, production-critical databases that cannot tolerate significant downtime, our support team can guide you through setting up logical replication from your source database to Neviri, allowing you to sync the data and cut over instantly when ready."
    },
    {
      q: "What happens when a new version of MySQL is released?",
      a: "Neviri takes a proactive approach to maintenance. For minor version updates containing critical security patches or bug fixes, we will automatically apply them during a predefined maintenance window that you control. For major version upgrades, we will notify you well in advance and provide a simple, one-click upgrade path in the dashboard so you can test compatibility and execute the upgrade on your own schedule."
    },
    {
      q: "What are proactive server metrics?",
      a: "Proactive server metrics refer to our integrated monitoring tools that constantly track the health of your database. Instead of waiting for a slow query to cause a timeout in your application, you can view your dashboard to see trends in CPU spikes, memory limits, or storage bottlenecks, allowing you to scale your resources or optimize your code before your users notice an issue."
    }
  ];

  const features = [
    {
      icon: HardDrive,
      title: "NVMe SSD Block Storage",
      desc: "We back our MySQL instances with high-performance NVMe SSD volumes, ensuring ultra-low latency and maximum IOPS for heavy transactional workloads."
    },
    {
      icon: Cpu,
      title: "Optimized Compute Options",
      desc: "Choose from affordable Shared CPU plans for staging, or highly scalable dedicated Virtual Machines (VMs) for demanding production workloads."
    },
    {
      icon: Sliders,
      title: "Query Optimization",
      desc: "Aggressively tuned configurations by default, ensuring optimal memory allocation for InnoDB buffer pools and query caches right from deployment."
    },
    {
      icon: RefreshCw,
      title: "Daily Automated Snapshots",
      desc: "We automatically execute non-disruptive daily backups of your datasets, securely retaining them according to your custom retention schedules."
    },
    {
      icon: Zap,
      title: "Point-in-Time Recovery",
      desc: "Backs up transaction logs continuously. Restore a new database instance to any specific second in the event of an accidental delete."
    },
    {
      icon: Server,
      title: "High Availability Clusters",
      desc: "Enable HA with a single click. Provisions a standby replica in a separate zone, automatically failing over to maintain connection uptime."
    }
  ];

  const integrationItems = [
    {
      icon: Cpu,
      title: "Connect to Neviri Compute",
      desc: "Deploy backend APIs using Git integration. Define environment variables in the Neviri dashboard, dynamically passing credentials into application containers."
    },
    {
      icon: Sliders,
      title: "Scale with Load Balancers",
      desc: "Utilize Load Balancers for intelligent traffic distribution across multiple VMs. Compute instances safely query your MySQL cluster via the internal VPC."
    },
    {
      icon: HardDrive,
      title: "Unify Your Storage Strategy",
      desc: "Offload massive media files, user uploads, or analytical datasets to S3-compatible Object Storage, keeping your relational database lean and performant."
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-sky-400/20 to-blue-500/20 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 text-sky-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(14,165,233,0.15)] transform transition-transform hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Fully Managed Relational Database
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            Deploy Your Code. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700">We Handle the Database.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Neviri Managed MySQL delivers a highly available, aggressively optimized, and fully secured database environment. Focus on writing application code while our platform orchestrates OS patches, daily snapshots, and automatic failovers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href={APP_SIGNUP_URL} className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-lg shadow-slate-900/25">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Deploy Your MySQL Cluster
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="#pricing" className="bg-white hover:bg-sky-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-sky-200 hover:shadow-md">
              Calculate Database Spend
            </Link>
          </div>

          <div className="mt-8 text-xs font-bold text-sky-600 bg-sky-50 border border-sky-100 inline-block px-4 py-2 rounded-lg shadow-sm">
            🎉 Signup now and get a free $100 credit instantly.
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SECTION 1: DATABASE FRICTION & SCALING SIMULATOR ── */}
        <section id="pricing" className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4">
                  <Database className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                  Eliminating Database Friction
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  <p>
                    Building a scalable application requires a reliable data layer, but self-managing a database pulls your engineering team away from product development. Neviri transforms database management from an operational bottleneck into a seamless, automated service.
                  </p>
                  <p>
                    By automating replication, backups, updates, and scaling, Neviri acts as your automated, 24/7 Database Administrator:
                  </p>
                  <ul className="space-y-3 pt-2 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-sky-500 shrink-0" />
                      <span>No DBA required: Automated HA failovers and configuration tuning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-sky-500 shrink-0" />
                      <span>Cost predictability: Pay-as-you-go layer scaling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-sky-500 shrink-0" />
                      <span>Compliance: Private VPC confinement and SSL encryption by default</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Dynamic Database Scaling Simulator */}
              <div className="lg:col-span-6 bg-gradient-to-br from-slate-50 to-sky-50/30 rounded-[2rem] p-8 border border-sky-100 shadow-inner relative flex flex-col justify-between min-h-[460px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-sky-200/20 blur-3xl rounded-full pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-sky-100">
                    <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                      <Sliders className="h-5 w-5 text-sky-500" />
                      Smart Layer Scaling
                    </h3>
                    <span className="text-xs text-sky-600 font-bold bg-sky-50 border border-sky-100 rounded-md px-2.5 py-1">
                      MySQL 8.0 Engine
                    </span>
                  </div>

                  {/* Plan selector tabs */}
                  <div className="grid grid-cols-3 gap-2 mb-8 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                    {Object.keys(plans).map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedPlan(key)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                          selectedPlan === key
                            ? "bg-white text-sky-600 shadow-sm"
                            : "text-slate-500 hover:text-[#0F172A]"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>

                  {/* Visual Cluster Representative */}
                  <div className="flex items-center justify-center gap-4 py-6 border border-sky-100/50 bg-white/60 backdrop-blur rounded-2xl p-6 shadow-sm">
                    {/* Database Node */}
                    <div className={`flex flex-col items-center p-4 bg-white rounded-xl border border-sky-100 shadow-md transition-all duration-300 ${plans[selectedPlan].scaleFactor}`}>
                      <Database className="h-10 w-10 text-sky-500" />
                      <span className="text-xs font-bold text-slate-800 mt-2">Primary DB</span>
                      <span className="text-[9px] text-slate-400 font-mono mt-0.5">10.0.2.14</span>
                    </div>

                    {/* replication arrow */}
                    <div className="h-0.5 w-10 bg-slate-300 relative">
                      <ArrowRight className="absolute -top-1.5 right-0 h-4.5 w-4.5 text-slate-400" />
                    </div>

                    {/* Standby Node */}
                    <div className={`flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-200 transition-all duration-300 opacity-80 ${plans[selectedPlan].scaleFactor}`}>
                      <Database className="h-10 w-10 text-slate-400" />
                      <span className="text-xs font-bold text-slate-500 mt-2">Standby Node</span>
                      <span className="text-[9px] text-slate-400 font-mono mt-0.5">10.0.2.15</span>
                    </div>
                  </div>

                  {/* Plan stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-3 bg-white border border-sky-100/60 rounded-xl">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Allocated Specs</span>
                      <span className="text-xs font-bold text-[#0F172A] block mt-0.5">{plans[selectedPlan].cpu}</span>
                      <span className="text-xs font-bold text-[#0F172A] block">{plans[selectedPlan].ram}</span>
                    </div>
                    <div className="p-3 bg-white border border-sky-100/60 rounded-xl">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Storage capacity</span>
                      <span className="text-xs font-bold text-[#0F172A] block mt-0.5">{plans[selectedPlan].storage}</span>
                      <span className="text-xs font-bold text-sky-600 font-mono block">{plans[selectedPlan].iops}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-sky-100 pt-6">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Estimated Pricing</span>
                    <span className="text-2xl font-black text-[#0F172A] font-mono">${plans[selectedPlan].price}<span className="text-xs font-bold text-slate-500"> / month</span></span>
                  </div>
                  <Link href={APP_SIGNUP_URL} className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                    Provision Cluster <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: CORE CAPABILITIES GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              Enterprise-Grade Capabilities Standard
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Every managed MySQL instance deployed on our network comes with a comprehensive suite of replication, backup, and security features.
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

        {/* ── SECTION 3: DEEP INTEGRATION (DARK BOX) ── */}
        <section>
           <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
             <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
             
             <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <Zap className="h-4 w-4" /> Cloud Fabric Integration
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                    Deep Integration with the Neviri Ecosystem
                  </h2>
                  <p className="text-slate-400 text-base leading-relaxed">
                    Neviri Managed MySQL works in tandem with our compute, storage, and networking layers to provide a highly optimized application delivery system.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {integrationItems.map((item, index) => (
                    <div key={index} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-sky-600 text-xs font-bold uppercase tracking-wider">
                <Code2 className="h-4 w-4" /> Developer workflows
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight">
                Built for Modern Development Stacks
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Whether you use Object Relational Mappers (ORMs), micro-frameworks, or raw query drivers, Neviri Managed MySQL is fully compliant and optimized for your environment out of the box.
              </p>
              <div className="bg-sky-50/50 border border-sky-100 p-4 rounded-xl text-xs text-slate-500">
                Connection limiters are automatically calibrated to prevent idle connections from exhausting server memory capacity.
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "JS / TS Ecosystems", desc: "Connect Node.js, Express, or Next.js using popular ORMs like Prisma, Sequelize, or TypeORM." },
                { title: "Python Frameworks", desc: "Perfectly suited for Django and Flask backend architectures requiring robust relational data mapping." },
                { title: "PHP Frameworks", desc: "Optimized for applications built on Laravel or Symfony, offering rapid query execution and connection pooling." },
                { title: "Go & Rust Microservices", desc: "Handle massive concurrency environments with ultra-low latency connection drivers." }
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
              <p className="text-lg text-slate-500">Everything you need to know about automated updates, database migration, and scaling policies on Neviri.</p>
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
              <p className="text-slate-500 mb-6">Focus on your application. We will manage your storage.</p>
              <Link href={APP_SIGNUP_URL} className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Create MySQL Cluster Today <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
