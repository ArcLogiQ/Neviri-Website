"use client";

import React, { useState } from "react";
import {
  Server,
  Cpu,
  HardDrive,
  Shield,
  Zap,
  Globe,
  Layers,
  CheckCircle2,
  Lock,
  BarChart,
  Terminal,
  Activity,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function VirtualMachinesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "What exactly is a Virtual Machine in Cloud Computing?",
      a: "A Virtual Machine (VM) is a scalable computing environment created utilizing virtualization technology. It acts as an isolated virtual server with its own dedicated CPU, Memory, Storage, and Network interface. It operates exactly like a physical dedicated server, allowing you to run any compatible operating system and software stack."
    },
    {
      q: "How does billing work for Neviri VMs?",
      a: "We offer transparent, pay-as-you-go billing. You can choose between predictable monthly flat-rate pricing or hourly micro-billing. If you destroy a VM before the month ends, you are only charged for the exact hours it was active. There are zero hidden fees, and all incoming bandwidth is completely free."
    },
    {
      q: "Can I resize my virtual machine later?",
      a: "Absolutely. Our cloud infrastructure allows for seamless vertical scaling. You can upgrade your VM's flavor (adding more vCPU, RAM, and Disk space) directly from the dashboard. The process typically requires a quick reboot and takes less than a minute, ensuring minimal disruption."
    },
    {
      q: "Do I get root access to my server?",
      a: "Yes. Every cloud server deployed on our platform grants you full, unrestricted root-level access via SSH (Secure Shell) for Linux instances, or Administrator access via RDP (Remote Desktop Protocol) for Windows environments. You have complete control over the system."
    },
    {
      q: "What is NVMe SSD, and why does it matter?",
      a: "NVMe (Non-Volatile Memory Express) is the latest storage protocol designed specifically for fast solid-state drives. Unlike legacy SATA SSDs which were bottlenecked by older hardware interfaces, NVMe connects directly to the server's PCIe lanes. This results in incredibly low latency and up to 10x faster data retrieval speeds, crucial for database performance."
    },
    {
      q: "Are my virtual machines backed up automatically?",
      a: "While your data resides on highly redundant enterprise RAID arrays, we highly recommend utilizing our automated backup solutions. You can schedule daily or weekly automated snapshots of your VM, which are stored securely off-node. In the event of a critical failure or user error, you can restore your entire server state instantly."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden" style={gridBg}>
      
      <Navbar />
      
      {/* ── HERO SECTION ── */}
      <header className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-sky-400/20 to-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 text-sky-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(14,165,233,0.15)] transform transition-transform hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Cloud Infrastructure as a Service (IaaS)
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            High-Performance VMs <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-700">Built for Limitless Scale.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Deploy secure, scalable, and lightning-fast cloud servers in seconds. Powered by the latest generation enterprise-grade processors and 100% NVMe SSD storage, Neviri Virtual Machines provide the ultimate foundation for modern developers, growing startups, and demanding enterprise workloads.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/signup" className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Deploy Your First VM
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/pricing" className="bg-white hover:bg-sky-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-sky-200 hover:shadow-md">
              View Pricing Details
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SEO CONTENT BLOCK 1: CORE ARCHITECTURE ── */}
        <section className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-8">
                  <Layers className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">The Foundation of Modern Cloud Computing</h2>
                <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
                  <p>
                    In today&apos;s fast-paced digital ecosystem, the underlying infrastructure of your application dictates its success. A Virtual Machine (VM) is a digital, software-based computer that runs on a physical host server, providing the exact same functionality as a dedicated physical server but with infinite flexibility.
                  </p>
                  <p>
                    Neviri Cloud Virtual Machines are engineered from the ground up using industry-leading KVM (Kernel-based Virtual Machine) hypervisor technology. This guarantees strict hardware-level isolation, meaning your compute resources—CPU, RAM, and storage—are completely dedicated to your workloads and protected from &quot;noisy neighbor&quot; interference.
                  </p>
                  <p>
                    Whether you are hosting a simple WordPress blog, running complex CI/CD pipelines, managing a heavy-traffic e-commerce store, or deploying a global SaaS platform, our scalable cloud compute environments ensure that you have root-level access and absolute control over your digital environment. 
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 bg-gradient-to-br from-slate-50 to-sky-50/50 rounded-[2rem] p-8 md:p-10 border border-sky-100/50 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/40 blur-3xl rounded-full" />
                <h3 className="text-2xl font-bold text-[#0F172A] mb-8 relative z-10 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-sky-500" />
                  Architectural Advantages
                </h3>
                <ul className="space-y-6 relative z-10">
                  {[
                    "100% Dedicated vCPU scheduling for sustained performance.",
                    "Root-level SSH access for complete operating system control.",
                    "Isolated networking layers via Virtual Private Cloud (VPC).",
                    "Custom image support and pre-configured OS templates.",
                    "Instant vertical scaling with zero data migration required."
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center group-hover:bg-sky-500 transition-colors duration-300">
                        <CheckCircle2 className="h-4 w-4 text-sky-600 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-base font-medium text-slate-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── KEY FEATURES GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">Enterprise-Grade Features Included Standard</h2>
            <p className="text-lg text-slate-500 leading-relaxed">Every virtual machine deployed on our network comes equipped with a comprehensive suite of developer tools, advanced security protocols, and high-availability architecture.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Cpu, title: "Latest Generation CPUs", desc: "Our host nodes are powered by top-tier AMD EPYC™ and Intel® Xeon® processors, ensuring high clock speeds and unparalleled processing capabilities for CPU-intensive tasks." },
              { icon: HardDrive, title: "Lightning-Fast NVMe Storage", desc: "Forget standard SSDs. We utilize local NVMe storage arrays connected directly via PCIe, delivering up to 10x faster read/write speeds, minimizing database query latency." },
              { icon: Shield, title: "Integrated Cloud Firewalls", desc: "Protect your virtual machines at the network edge. Our stateful cloud firewalls allow you to define strict inbound and outbound traffic rules before malicious requests even reach your server." },
              { icon: Activity, title: "Real-Time Server Monitoring", desc: "Gain deep insights into your infrastructure health. Track CPU usage, RAM allocation, bandwidth consumption, and disk I/O in real-time directly from your cloud dashboard." },
              { icon: Lock, title: "Secure SSH Key Management", desc: "Say goodbye to insecure password logins. Seamlessly inject your public SSH keys into your cloud instances during deployment for impenetrable cryptographic security." },
              { icon: Globe, title: "Global Edge Availability", desc: "Deploy your compute resources closer to your user base. With multiple availability zones across the globe, you can drastically reduce latency and improve end-user experience." }
            ].map((f, i) => (
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

        {/* ── SEO CONTENT BLOCK 2: SCALABILITY & PERFORMANCE ── */}
        <section>
           <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
             <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
             
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <Zap className="h-4 w-4" /> Uncompromising Performance
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">Scale Your Infrastructure Seamlessly Without Interruption</h2>
                  <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
                    <p>
                      Growth shouldn&apos;t be painful. As your application&apos;s user base expands, your compute resources must scale to meet the demand. Neviri offers frictionless vertical scaling capabilities. Through a simple intuitive dashboard, you can upgrade your Virtual Machine&apos;s vCPU count, RAM, and NVMe storage in seconds.
                    </p>
                    <p>
                      For massive, high-availability deployments, our ecosystem fully supports horizontal scaling. Spin up multiple lightweight compute instances, connect them via our secure Virtual Private Cloud (VPC), and distribute incoming internet traffic using our highly available Load Balancers. 
                    </p>
                    <p>
                      This decoupled architectural approach guarantees that your application remains online during unexpected traffic spikes, DDoS attempts, or localized hardware maintenance. When combined with our automated snapshots and object storage backups, your data resilience is unparalleled.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-5">
                  <div className="bg-[#111827]/80 backdrop-blur-xl rounded-[2rem] border border-slate-700/50 p-8 shadow-2xl relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-6 pt-2">Supported OS Templates</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["Ubuntu 20.04 / 22.04", "Debian 11 / 12", "AlmaLinux 9", "Rocky Linux 9", "CentOS Stream", "Fedora Core", "Windows Server 2022", "Custom ISO"].map((os, i) => (
                        <div key={os} className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-sky-500/50 rounded-xl p-4 text-sm font-medium text-slate-300 flex items-center gap-3 transition-all cursor-default">
                          <Terminal className="h-4 w-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
                          {os}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-700/50">
                      <Link href="/signup" className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-2 text-sm group transition-colors">
                        Explore all deployment options 
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
             </div>
           </div>
        </section>

        {/* ── INDUSTRY USE CASES ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">Tailored for Every Industry Workload</h2>
            <p className="text-lg text-slate-500 leading-relaxed">From lightweight personal projects to enterprise-grade machine learning pipelines, our cloud servers adapt to your specific operational requirements.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="group bg-white rounded-[2rem] p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-sky-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A]">SaaS & Web Apps</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-base">
                Host dynamic, full-stack applications built on Node.js, Python Django, Ruby on Rails, or PHP Laravel. Combine our web-tier VMs with our Managed Database solutions to create highly resilient, three-tier cloud architectures that handle thousands of concurrent users flawlessly.
              </p>
            </div>
            
            <div className="group bg-white rounded-[2rem] p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <Terminal className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A]">CI/CD & DevOps</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-base">
                Accelerate your software delivery lifecycle. Deploy dedicated Jenkins, GitLab Runner, or GitHub Actions instances. Our high-clock-speed CPUs drastically reduce code compilation times, docker image building processes, and automated testing durations.
              </p>
            </div>
            
            <div className="group bg-white rounded-[2rem] p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                  <BarChart className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A]">High-Traffic E-Commerce</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-base">
                Downtime costs money. Host Magento, WooCommerce, or custom e-commerce backends on our compute optimized virtual machines. Ensure lightning-fast page loads and secure transaction processing during peak seasonal sales events like Black Friday and Cyber Monday.
              </p>
            </div>
            
            <div className="group bg-white rounded-[2rem] p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-sky-300 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A]">Containerization</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-base">
                Run Docker and Kubernetes clusters effortlessly. Group multiple VMs into a private network swarm, orchestrate complex containerized environments, and separate your microservices to achieve fault tolerance, isolated debugging, and streamlined resource allocation.
              </p>
            </div>
          </div>
        </section>

        {/* ── MASSIVE SEO FAQ ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-500">Everything you need to know about our virtual machine infrastructure, billing, and technical capabilities.</p>
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
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-base text-slate-600 leading-relaxed border-t border-sky-100/50 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
