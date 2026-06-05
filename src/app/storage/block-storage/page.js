"use client";

import React, { useState } from "react";
import {
  HardDrive,
  Database,
  Zap,
  Shield,
  Layers,
  ArrowRight,
  ChevronDown,
  Server,
  Activity,
  Maximize,
  Copy,
  Gauge,
  CheckCircle2,
  Cpu,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function BlockStoragePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "What is Block Storage and how does it differ from Object Storage?",
      a: "Block storage divides data into evenly sized blocks, each with its own unique identifier, managed by the server&apos;s operating system as if it were a physical hard drive directly attached to the motherboard. Because the OS treats it as a raw, unformatted disk, you can format it with file systems like ext4 or XFS, making it ideal for databases and applications requiring ultra-fast, low-latency read/write operations. In contrast, Object Storage (like Amazon S3) stores data as whole objects with metadata via an API, which is highly scalable for unstructured data like images or backups, but far too slow to run an operating system or a transactional database."
    },
    {
      q: "How does Neviri achieve such high IOPS and low latency?",
      a: "Our block storage architecture completely bypasses legacy spinning hard disk drives (HDDs) and older SATA SSDs. Instead, we exclusively utilize enterprise-grade NVMe (Non-Volatile Memory Express) flash storage arrays. These arrays are connected over a dedicated, highly optimized Storage Area Network (SAN) utilizing NVMe over Fabrics (NVMe-oF) with RDMA (Remote Direct Memory Access). This allows your Virtual Machine&apos;s CPU to read from and write to the network-attached storage array almost as quickly as if the NVMe drive was plugged directly into the local PCIe slot, resulting in sub-millisecond latency and massive IOPS throughput."
    },
    {
      q: "Can I resize a Block Storage volume after it has been created?",
      a: "Yes, scaling is incredibly seamless. As your database grows or your application requires more space, you can dynamically expand the capacity of your Block Storage volume directly from the Neviri dashboard or via our API without any downtime. Once the underlying volume is expanded on our storage clusters, you simply run a standard operating system command (like `resize2fs` for ext4) within your Virtual Machine to expand the file system into the newly available space. Note: To ensure data integrity, volumes can only be scaled up, not scaled down."
    },
    {
      q: "Is my data protected against physical hardware failures?",
      a: "Absolutely. Data durability is our highest priority. Unlike local ephemeral storage which is tied to the lifespan of a single physical host node, Neviri Block Storage is inherently highly available. Every single block of data you write is automatically and synchronously replicated three times across disparate physical storage nodes within the availability zone. If a physical drive, a storage server, or even an entire rack experiences a catastrophic hardware failure, our system instantly seamlessly routes your I/O requests to the healthy replicas with zero perceived downtime or data loss."
    },
    {
      q: "Can I detach a volume and attach it to a different Virtual Machine?",
      a: "Yes. Block Storage volumes are decoupled from the compute lifecycle. This means if you need to perform an OS upgrade, troubleshoot a kernel panic, or migrate a database to a larger compute flavor, you can safely unmount the volume, detach it from the current Virtual Machine, and attach it to a brand new one. The new VM will instantly recognize the disk, and all of your data, file systems, and directory structures will be perfectly preserved. This makes it an invaluable tool for stateless, highly agile infrastructure."
    },
    {
      q: "How do Block Storage Snapshots work?",
      a: "Snapshots provide a point-in-time, crash-consistent backup of your entire volume. When you trigger a snapshot, Neviri creates an instantaneous delta of the volume&apos;s current state. Because our storage utilizes advanced copy-on-write technology, taking a snapshot incurs zero performance penalty and takes only seconds, regardless of whether the volume is 10 GB or 5 TB. These snapshots are then securely transferred and stored in our highly durable Object Storage clusters. You can use snapshots to create exact clones of production databases for staging environments, or to instantly restore your system in the event of accidental data deletion."
    },
    {
      q: "Can I attach a single Block Storage volume to multiple Virtual Machines simultaneously?",
      a: "Standard Block Storage volumes are designed for a 1-to-1 relationship; they can only be attached to a single Virtual Machine at a time to prevent data corruption caused by uncoordinated simultaneous writes by different operating systems. If your architecture requires a shared file system accessible by multiple nodes simultaneously (such as a WordPress `wp-content/uploads` directory shared across a load-balanced cluster), you should utilize our upcoming Managed File Storage (NFS) or architect your application to utilize Object Storage via the S3 API."
    },
    {
      q: "How is Neviri Block Storage billed?",
      a: "We believe in radical pricing transparency. Block Storage is billed strictly on a per-gigabyte, per-month basis, prorated down to the hour. You pay exactly for the capacity you provision, regardless of how much of that capacity you actually fill with data. Furthermore, we do not charge any hidden fees for I/O requests or data transfer between your VM and the attached storage volume. The price you see is the absolute maximum you will pay."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden" style={gridBg}>
      <Navbar />

      {/* ── REDESIGNED HERO SECTION ── */}
      <header className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-bl from-sky-400/10 via-indigo-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-indigo-600 text-xs font-bold uppercase tracking-widest shadow-sm">
                <HardDrive className="h-4 w-4 text-sky-500" /> Scalable Data Persistence
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
                High-Performance <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-blue-600">
                  NVMe Block Storage.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Detach storage from compute life cycles. Provision ultra-fast, highly available SSD volumes that attach directly to your Virtual Machines as raw block devices. Built for intensive databases, massive file systems, and workloads that demand sub-millisecond latency.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link href="/signup" className="group bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto shadow-xl flex items-center justify-center gap-2">
                  Create a Volume
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/pricing" className="bg-white hover:bg-slate-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto text-center hover:border-indigo-200">
                  View Storage Pricing
                </Link>
              </div>
            </div>

            {/* Right Visual: Upgraded Premium Dashboard UI Panel */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm relative">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 font-mono text-xs text-slate-400">
                  <span className="flex items-center gap-2 font-bold text-slate-700">
                    <Cpu className="h-4 w-4 text-sky-500" /> volume-manager-v2
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ONLINE
                  </span>
                </div>

                {/* Volume Row 1 */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 mb-3 hover:border-sky-300 transition-colors">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-mono font-bold text-slate-500">vol-production-db</span>
                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">NVMe SSD</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-2xl font-black text-[#0F172A]">500 <span className="text-xs font-bold text-slate-400">GB</span></p>
                    <p className="text-xs font-mono text-slate-400">Mount: <span className="text-slate-600">/data/db</span></p>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-sky-400 to-indigo-500 h-1.5 rounded-full w-[65%]"></div>
                  </div>
                </div>

                {/* Volume Row 2 */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 mb-3 hover:border-indigo-300 transition-colors">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-mono font-bold text-slate-500">vol-redis-cache</span>
                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">NVMe SSD</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-2xl font-black text-[#0F172A]">250 <span className="text-xs font-bold text-slate-400">GB</span></p>
                    <p className="text-xs font-mono text-slate-400">Mount: <span className="text-slate-600">/data/cache</span></p>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-sky-400 to-indigo-500 h-1.5 rounded-full w-[40%]"></div>
                  </div>
                </div>

                {/* Volume Row 3 (Detached State showcase) */}
                <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-white opacity-60">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-mono font-bold text-slate-400">vol-staging-backup</span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">DETACHED</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-2xl font-black text-slate-400">1 <span className="text-xs font-bold text-slate-400">TB</span></p>
                    <p className="text-xs font-mono text-slate-400">Ready to attach</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── WHAT IS BLOCK STORAGE (Full Width Dark Block) ── */}
        <section className="scroll-mt-32">
          <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-sky-500/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Decouple Compute from Storage</h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                In legacy cloud environments, your data was inextricably linked to the physical hardware running your Virtual Machine. If the VM died, recovering your data was a nightmare. Block storage re-engineers this paradigm by providing independent, network-attached drives that act exactly like local disks but survive compute termination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-xl flex items-center justify-center mb-6">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Raw Device Control</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Attached volumes appear in your OS as unformatted `/dev/sdX` block devices. Format them with ext4, XFS, or Btrfs, and partition them exactly how your application demands.
                </p>
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                  <Maximize className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Instant Scalability</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Start with a 10 GB volume and seamlessly scale up to 10 TB as your database expands. Resize operations happen on the backend in seconds with zero system downtime required.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                  <Copy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Seamless Portability</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Unmount a volume from a staging server and instantly re-attach it to your production cluster. Your data remains perfectly intact, allowing for lightning-fast environment migrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PERFORMANCE DASHBOARD VISUAL ── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h3 className="text-3xl font-extrabold text-[#0F172A] mb-4">Unmatched I/O Performance</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Databases and high-traffic applications live and die by disk latency. Legacy SATA interfaces create severe bottlenecks when processing thousands of concurrent transactions.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Neviri Block Storage leverages pure NVMe flash arrays connected via an ultra-high bandwidth, low-latency Storage Area Network (SAN). By utilizing RDMA (Remote Direct Memory Access), your compute instances bypass the operating system kernel networking stack entirely, reading data directly from the storage node memory.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                    <span className="text-slate-700 font-medium">Sub-millisecond read/write latency</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                    <span className="text-slate-700 font-medium">Massive Input/Output Operations Per Second</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                    <span className="text-slate-700 font-medium">Burstable burst-credit system for traffic spikes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Performance Visual Container */}
            <div className="lg:col-span-7 order-1 lg:order-2 bg-[#0F172A] rounded-[2rem] p-8 shadow-2xl relative border border-slate-800">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
              
              <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-sky-400" /> NVMe-oF Telemetry
                </h4>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">HEALTHY</span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-900/80 border border-slate-700/50 p-6 rounded-2xl">
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Sustained IOPS</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">80,000</span>
                    <span className="text-sm font-bold text-sky-400 mb-1">reads/sec</span>
                  </div>
                </div>
                <div className="bg-slate-900/80 border border-slate-700/50 p-6 rounded-2xl">
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Throughput</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">1.2</span>
                    <span className="text-sm font-bold text-indigo-400 mb-1">GB/s</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-700/50 p-6 rounded-2xl">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-4">Replication Status</p>
                <div className="flex justify-between items-center relative">
                  {/* Nodes */}
                  <div className="w-12 h-12 bg-sky-500/20 border border-sky-500/50 rounded flex items-center justify-center relative z-10">
                    <Server className="h-5 w-5 text-sky-400" />
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/50 rounded flex items-center justify-center relative z-10">
                    <Database className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/50 rounded flex items-center justify-center relative z-10">
                    <Database className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/50 rounded flex items-center justify-center relative z-10">
                    <Database className="h-5 w-5 text-emerald-400" />
                  </div>
                  
                  {/* Connecting lines */}
                  <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>
                  <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-sky-500/50 -translate-y-1/2 z-0 animate-pulse w-1/3"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                  <span>Host VM</span>
                  <span>Replica 1</span>
                  <span>Replica 2</span>
                  <span>Replica 3</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ASYMMETRIC MASONRY FEATURES ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">Engineered for Enterprise Resilience</h2>
            <p className="text-lg text-slate-500">Your data is your most critical asset. We built our storage architecture with fault tolerance, point-in-time recovery, and absolute security in mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Wide Feature */}
            <div className="md:col-span-8 bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-sky-200 transition-colors group">
              <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                <Layers className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Triple Data Replication (HA)</h3>
              <p className="text-slate-600 leading-relaxed text-lg max-w-2xl">
                Every single block of data written to a Neviri volume is instantly and synchronously mirrored across three distinct, physically isolated hardware nodes within the same data center. In the rare event of a total physical drive failure or power loss on a storage node, your operations will not skip a beat. Our internal routing automatically detects the failure and points your VM to a healthy replica, ensuring 99.999% data durability without any manual intervention.
              </p>
            </div>

            {/* Narrow Feature */}
            <div className="md:col-span-4 bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-indigo-200 transition-colors group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">At-Rest Encryption</h3>
              <p className="text-slate-600 leading-relaxed">
                Security is fundamental. All data written to Neviri Block Storage clusters is automatically encrypted at rest utilizing hardware-accelerated AES-256 encryption. This protects against unauthorized physical access to the server chassis, guaranteeing your compliance with stringent security frameworks like SOC 2 and GDPR.
              </p>
            </div>

            {/* Narrow Feature */}
            <div className="md:col-span-4 bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-sky-200 transition-colors group">
              <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Live Snapshots</h3>
              <p className="text-slate-600 leading-relaxed">
                Take instantaneous, crash-consistent snapshots of your entire volume via the dashboard or API. Because we utilize copy-on-write mechanisms, taking a snapshot incurs zero downtime or IOPS penalty. 
              </p>
            </div>

            {/* Wide Feature */}
            <div className="md:col-span-8 bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-indigo-200 transition-colors group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Server className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Kubernetes Persistent Volumes</h3>
              <p className="text-slate-600 leading-relaxed text-lg max-w-2xl">
                Containerized architectures require robust stateful storage. Neviri Block Storage integrates flawlessly as a Container Storage Interface (CSI) provider. If a pod crashes and is rescheduled onto a different worker node within your cluster, the Block Storage volume is automatically detached from the dead node and rapidly re-attached to the new node, ensuring your stateful sets (like Prometheus or Postgres running in K8s) remain perfectly intact.
              </p>
            </div>

          </div>
        </section>

        {/* ── STICKY SIDEBAR FAQ ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Sticky Left Sidebar */}
              <div className="lg:col-span-4 relative">
                <div className="lg:sticky top-32">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">Got Questions?</h2>
                  <p className="text-lg text-slate-500 mb-8">Dive into the technical mechanics, pricing structures, and architectural limitations of Block Storage.</p>
                  
                  <Link href="/support" className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-sky-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md">
                    Read Full Documentation <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right Side Accordion */}
              <div className="lg:col-span-8 space-y-2">
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    className="border-b border-gray-100 last:border-0"
                  >
                    <button 
                      onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
                      className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                    >
                      <h4 className={`text-lg font-bold transition-colors pr-8 ${openFaqIndex === i ? 'text-sky-600' : 'text-[#0F172A]'}`}>
                        {faq.q}
                      </h4>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaqIndex === i ? 'bg-sky-100 text-sky-600' : 'bg-gray-50 text-gray-400'}`}>
                        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-[800px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-base text-slate-600 leading-relaxed pr-8">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
