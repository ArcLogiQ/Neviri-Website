"use client";

import React, { useState } from "react";
import {
  Database,
  Globe,
  Lock,
  RefreshCw,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  FolderOpen,
  Code2,
  ShieldCheck,
  Zap,
  Layers,
  HardDrive,
  Cpu,
  FileText
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function ObjectStoragePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeCodeTab, setActiveCodeTab] = useState("nodejs");

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const codeSnippets = {
    nodejs: `const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const client = new S3Client({
  endpoint: "https://s3.neviri.com",
  region: "global",
  credentials: { accessKeyId: "nv_access_key", secretAccessKey: "nv_secret" }
});

await client.send(new PutObjectCommand({
  Bucket: "user-assets",
  Key: "uploads/avatar.png",
  Body: fileBuffer,
  ContentType: "image/png"
}));`,
    python: `import boto3
s3 = boto3.client(
    's3',
    endpoint_url='https://s3.neviri.com',
    aws_access_key_id='nv_access_key',
    aws_secret_access_key='nv_secret'
)

s3.upload_file('avatar.png', 'user-assets', 'uploads/avatar.png', 
               ExtraArgs={'ContentType': 'image/png'})`,
    curl: `curl -X PUT -T "avatar.png" \\
  -H "Host: user-assets.s3.neviri.com" \\
  -H "Date: \$(date -u +'%a, %d %b %Y %H:%M:%S GMT')" \\
  -H "Content-Type: image/png" \\
  -H "Authorization: AWS nv_access_key:signature_hash" \\
  https://s3.neviri.com/user-assets/uploads/avatar.png`
  };

  const faqs = [
    {
      q: "What is S3-compatible Object Storage and when should I use it?",
      a: "Object Storage is a flat-namespace data storage architecture designed to store practically unlimited quantities of unstructured data—such as images, videos, audio logs, PDF invoices, database backups, and static website frontend assets. Unlike Block Storage, which treats data as formatted disk paths inside an attached drive, Object Storage manages files as standalone objects containing raw data, a customizable metadata dictionary, and a unique globally accessible key string. You should use Object Storage whenever your application demands infinitely scalable, highly durable persistence that can be accessed programmatically over standard HTTP/HTTPS channels from anywhere on the globe without mounting network filesystems."
    },
    {
      q: "What does S3 compatibility mean for my existing cloud application stacks?",
      a: "Neviri Object Storage is built from the ground up to support the industry-standard AWS S3 API framework specification. This means that any library, utility, infrastructure-as-code configuration, or SDK that is designed to interact with Amazon S3 will work seamlessly with Neviri out of the box. You do not need to rewrite your application logic or adapt your legacy microservices; you simply modify your cloud environment configuration parameters by updating your access keys, secret credentials, and pointing your destination endpoint URL to `https://s3.neviri.com`."
    },
    {
      q: "How does Neviri achieve eleven nines (99.999999999%) of architectural data durability?",
      a: "Data durability defines the probability that a file will remain intact and readable without corruption over long historical cycles. Neviri reaches eleven nines of durability by utilizing an advanced distributed Erasure Coding matrix layer across our physical storage fabrics. When you transmit an object to a Neviri bucket, the payload is partitioned into mathematical data fragments and parity blocks distributed across multiple discrete storage server arrays, storage racks, and electricity distribution boundaries inside our availability zones. Even if multiple server components, drive enclosures, or complete network switch arrays encounter simultaneous hardware failures, our storage layers rebuild the missing data slices on the fly, preventing data loss or user disruption."
    },
    {
      q: "Can I host entirely static production websites directly from a Neviri bucket?",
      a: "Yes. Neviri Object Storage features native Static Website Hosting optimization parameters. By switching your bucket access configuration to public read-only and configuring your index and error documents (e.g., `index.html` and `404.html`), you can host highly responsive single-page React, Vue, Vite, or Next.js applications directly from our storage edge. When combined with our integrated edge caching layer and automated SSL certificate generation pipelines, your static content is delivered directly from the network edge, avoiding compute management overhead and scaling costs completely."
    },
    {
      q: "What are Object Lifecycles and how do they help optimize cold storage costs?",
      a: "Lifecycle management rules allow you to automate data tiering based on time parameters to minimize long-term storage expenses. For example, you can create a rule stating that user upload logs should reside on our high-performance Standard storage tier for the first 30 days. As the data ages and is rarely accessed, Neviri can automatically transition those objects to our Infrequent Access (IA) tier, which cuts costs significantly. After 90 days, the policy can transition the blocks down to our ultra-cold Archive tier, or permanently purge them from existence, optimizing your operational overhead programmatically."
    },
    {
      q: "How are access controls, bucket policies, and cross-origin parameters secured?",
      a: "By default, all newly provisioned Neviri Object Storage buckets are configured to be entirely private, blocking unauthorized public access. Access permissions are strictly managed using fine-grained Access Control Lists (ACLs) and comprehensive Identity & Access Management (IAM) keys. Furthermore, we fully support robust Cross-Origin Resource Sharing (CORS) XML/JSON configuration models. This allows security operations teams to whitelist exact browser origin domains, preventing malicious third-party portals from making unauthorized cross-site asset requests against your media storage nodes."
    },
    {
      q: "Does Neviri support object versioning and immutable object locking configurations?",
      a: "Yes, versioning can be activated on any bucket with a single click. When versioning is turned on, every single write or overwrite event creates a distinct, numbered cryptographic instance of that object instead of destroying the legacy asset. If an engineer accidentally executes a bulk delete routine, or a ransomware script attempts to modify data files, the legacy historical versions remain fully preserved, allowing you to instantly roll back state configurations. You can also enforce strict Object Locking policies, making files completely immutable and un-deletable for an exact window of time to satisfy compliance requirements."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden" style={gridBg}>
      <Navbar />

      {/* ── INTERACTIVE HERO SECTION ── */}
      <header className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-sky-400/20 via-blue-500/10 to-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading & SEO Intro */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sky-600 text-xs font-bold uppercase tracking-widest shadow-sm">
                <Database className="h-4 w-4" /> Infinitely Scalable Data Persistence
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
                S3-Compatible <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600">
                  Cloud Object Storage.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Store and serve unbounded text structures, application logs, media profiles, and machine learning matrices securely from anywhere. Neviri Object Storage delivers zero-maintenance unstructured data storage with eleven nines of architectural durability and lightning-fast global HTTP endpoints.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link href="https://sng-central.neviri.com/signup" className="group bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto shadow-xl flex items-center justify-center gap-2">
                  Create a Bucket
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/pricing" className="bg-white hover:bg-slate-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto text-center hover:border-sky-200">
                  View Storage Pricing
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Bucket Explorer Visual Panel */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm relative">
                
                {/* Control Panel Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <span className="flex items-center gap-2 font-mono text-xs font-bold text-slate-700">
                    <FolderOpen className="h-4 w-4 text-sky-500" /> user-assets-bucket
                  </span>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  </div>
                </div>

                {/* Simulated Object Table List */}
                <div className="space-y-2 font-mono text-xs text-slate-600">
                  {[
                    { name: "avatars/user_9821.png", size: "452 KB", date: "Jun 01, 2026" },
                    { name: "videos/promo_1080p.mp4", size: "142.5 MB", date: "May 28, 2026" },
                    { name: "logs/api_stream.json", size: "12.8 MB", date: "Live Streaming" },
                    { name: "backups/postgres_master.sql", size: "4.2 GB", date: "May 25, 2026" }
                  ].map((obj, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-sky-50/30 hover:border-sky-200 transition-all cursor-default">
                      <div className="flex items-center gap-3 truncate max-w-[60%]">
                        <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="truncate font-medium text-slate-700">{obj.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 shrink-0 text-right">
                        <span>{obj.size}</span>
                        <span className="text-[10px] hidden sm:inline">{obj.date}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub-Telemetry Status Bar */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <p>Region: <span className="text-slate-700 font-bold">Global-Edge</span></p>
                  <p>CORS: <span className="text-emerald-600 font-bold">Enabled</span></p>
                  <p>Access: <span className="text-indigo-600 font-bold">Private</span></p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SECTION 1: ARCHITECTURAL ADVANTAGE ── */}
        <section className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-8">
                  <Layers className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">Flat Namespace Key-Value Scale Architecture</h2>
                <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
                  <p>
                    Traditional hard disk formats rely on a hierarchical directory layout, mapping structural node references across nested folder layers. As application persistence arrays scale toward millions or billions of independent components, navigating these nested system trees creates devastating file system bottlenecks and resource locking delays.
                  </p>
                  <p>
                    Neviri Object Storage completely bypasses hierarchical limits by establishing a completely flat key-value namespace architecture. Every uploaded asset is managed as a standalone, immutable data container containing raw binary components, custom metadata keys, and unique globally identifiable string identifiers.
                  </p>
                  <p>
                    By separating asset orchestration paths from computing compute layers, our storage nodes scale outward infinitely without administrative file system degradation. Whether you are querying a single user icon profile or pulling gigabytes of machine training records, our clusters deliver data back to your client channels instantaneously.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-50 to-sky-50/40 rounded-[2rem] p-8 md:p-10 border border-sky-100/50 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/30 blur-3xl rounded-full" />
                <h3 className="text-2xl font-bold text-[#0F172A] mb-8 relative z-10 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-sky-500" />
                  Enterprise Storage Metrics
                </h3>
                <ul className="space-y-6 relative z-10">
                  {[
                    "Full S3-compatible API layout compliance across all operations.",
                    "Synchronous multi-node erasure coding replication architecture.",
                    "Sub-millisecond Time-to-First-Byte execution benchmarks.",
                    "Granular lifecycle configurations to reduce old backup storage costs.",
                    "Integrated edge delivery network optimizations for public media asset tracking."
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

        {/* ── SECTION 2: DEVELOPER SDK TOOLING CONTROLS (NEW LAYOUT PARADIGM) ── */}
        <section>
          <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Left Column */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  <Code2 className="h-4 w-4" /> Comprehensive Developer SDK Support
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">Unified API Interface Integrations</h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  Building application pipelines shouldn&apos;t require specialized structural wrappers. Because Neviri exposes a standard S3-compatible endpoints tier, developers can initialize connections instantly using standard, trusted native library stacks.
                </p>
                
                {/* Custom Programmatic Tab Switcher Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["nodejs", "python", "curl"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveCodeTab(tab)}
                      className={`px-4 py-2 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer ${
                        activeCodeTab === tab
                          ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20"
                          : "bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      {tab === "nodejs" && "Node.js SDK"}
                      {tab === "python" && "Python (Boto3)"}
                      {tab === "curl" && "cURL API REST"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Snippet Block Right Column */}
              <div className="lg:col-span-7 w-full">
                <div className="bg-[#111827]/90 backdrop-blur-xl rounded-2xl border border-slate-800 p-6 shadow-2xl font-mono text-xs md:text-sm text-slate-300 overflow-x-auto relative">
                  <div className="absolute top-4 right-4 flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                  </div>
                  <pre className="leading-relaxed text-left text-sky-300">
                    <code>{codeSnippets[activeCodeTab]}</code>
                  </pre>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 3: RECTANGULAR REPLICATED FEATURE BLOCKS ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">Enterprise Infrastructure Included Standard</h2>
            <p className="text-lg text-slate-500 leading-relaxed">Every object storage bucket deployed onto our clusters delivers secure encryption pipelines, edge-caching policies, and validation matrices natively.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Zap, title: "Eleven Nines Durability", desc: "Our storage arrays distribute encoded parity data fragments across multiple storage ranks automatically, reaching 99.999999999% file persistence standards safely." },
              { icon: Lock, title: "Server-Side Encryption", desc: "Protect files at rest automatically. Neviri enforces military-grade 256-bit AES encryption schemes across object blocks before writing any fragments down to disk tracks." },
              { icon: Globe, title: "Static Web Optimization", desc: "Convert any bucket asset into a low-latency public endpoint instantly. Host client-side static interfaces without managing runtime configuration files or computing nodes." },
              { icon: RefreshCw, title: "Atomic Object Versioning", desc: "Protect files against malicious overrides or human deletion errors. Maintain incremental historical data variations inside structured tracking branches." },
              { icon: ShieldCheck, title: "Granular ACL Policies", desc: "Implement a hardened zero-trust posture. Control network access paths via itemized CORS configuration profiles and cryptographically encoded IAM access tokens." },
              { icon: HardDrive, title: "Multiplexed API Streams", desc: "Accelerate heavy batch operations. Neviri pipelines parallel multipart object chunking routines, combining data streams natively at edge boundary gates." }
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

        {/* ── SECTION 4: DATA LIFECYCLE TIMELINE PROCESS BLOCK ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">Automated Storage Tier Lifecycles</h2>
              <p className="text-lg text-slate-500">Programmatically reduce long-term file retention costs by configuring smart bucket aging pipelines.</p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {/* Chronological Connector Line */}
              <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-slate-100 z-0"></div>

              {[
                { step: "Standard Tier", sub: "Days 1 - 30", desc: "High-performance hot storage pool optimized for immediate access speeds, ideal for active mobile uploads, running application assets, and streaming media files." },
                { step: "Infrequent Access", sub: "Days 31 - 90", desc: "Reduces data hosting fees dramatically for files that are rarely referenced but must remain accessible instantly over API streams without retrieval lag parameters." },
                { step: "Glacier Archive", sub: "Day 91+", desc: "Data block fragments are packed down into deep archiving cold storage pools, offering minimal billing footprints for immutable logging records and historical system audits." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 bg-slate-50/60 rounded-2xl p-6 border border-slate-100 hover:border-sky-200 transition-colors">
                  <div className="w-10 h-10 bg-white border-2 border-sky-500 text-sky-600 rounded-xl flex items-center justify-center font-bold text-sm mb-4 shadow-sm">
                    0{i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-1">{item.step}</h3>
                  <p className="text-xs font-mono font-bold text-sky-500 mb-3">{item.sub}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: MASSIVE OBSERVED SEO FAQ SIDEBAR ACCORDION ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Sticky Title Sidebar area */}
              <div className="lg:col-span-4 relative">
                <div className="lg:sticky top-32 space-y-4">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight">Object Storage Deep Dive</h2>
                  <p className="text-base text-slate-500">Comprehensive responses tracking object storage architecture, compliance validations, CORS rules, and structural durability practices.</p>
                  <Link href="/support" className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-sky-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md pt-2">
                    Access API Docs <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right Side Expansive Accordion Wrapper */}
              <div className="lg:col-span-8 space-y-2">
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    className="border-b border-slate-100 last:border-0"
                  >
                    <button 
                      onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
                      className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                    >
                      <h4 className={`text-lg font-bold transition-colors pr-8 ${openFaqIndex === i ? 'text-sky-600' : 'text-[#0F172A] group-hover:text-sky-600'}`}>
                        {faq.q}
                      </h4>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaqIndex === i ? 'bg-sky-100 text-sky-600' : 'bg-gray-50 text-gray-400 group-hover:bg-sky-50 group-hover:text-sky-600'}`}>
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
