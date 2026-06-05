"use client";

import React, { useState } from "react";
import {
  Rocket,
  GitBranch,
  Zap,
  Globe,
  RefreshCw,
  Sliders,
  Eye,
  Activity,
  ChevronDown,
  Terminal,
  ArrowRight,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Cpu
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function AppDeploymentPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "How does Git-integrated automated cloud building work behind the scenes?",
      a: "Neviri App Deployment simplifies production architectures by integrating directly with your Git workflows. When you authorize Neviri to access your GitHub, GitLab, or Bitbucket repository, our system registers a secure webhook endpoint. Every time a developer executes a `git push` to your designated production or staging branch, the webhook fires an encrypted payload containing metadata about the latest commit. Neviri instantly captures this trigger and provisions an isolated, transient container environment on our high-speed building clusters. Our intelligent builder analyzes your repository root to detect your specific framework stack—automatically mapping files, resolving package files like `package.json` or `requirements.txt`, running your build scripts, caching layers for optimized speed, and preparing a production-ready immutable container image for distribution."
    },
    {
      q: "What does Zero-Downtime Atomic Deployment mean for active users?",
      a: "Traditional server deployment methods require stopping your current application server process, pulling down new code, and restarting the runtime daemon. This process creates a noticeable window of downtime where incoming requests fail with HTTP 502 or 503 errors. Neviri prevents this entirely by enforcing continuous atomic routing. When a new version of your application finishes building, it is deployed to a brand-new, isolated environment tier while your older application instance continues to serve production traffic normally. Our internal health-checking infrastructure then performs rigorous multi-point validation to ensure the new container is responding correctly. Once verified, Neviri seamlessly flips our global edge load balancers to route new traffic to the updated build instance within milliseconds. The legacy instance is slowly drained of existing connections and gracefully decommissioned, ensuring your users never see a single broken session."
    },
    {
      q: "Can I manage complex Monorepos and custom build commands through Neviri?",
      a: "Absolutely. Modern web engineering heavily utilizes Monorepos, where a single large Git repository hosts multiple discrete frontend, backend, and microservice projects inside subdirectory structures. Neviri handles this gracefully. During setup, you can define an isolated root directory for each application deployment tier. For instance, you can point a frontend app instance to `/packages/frontend` and an API backend to `/packages/backend`. Furthermore, you can manually customize your pre-build scripts, main production compilation scripts, and final run commands. If your build pipeline demands advanced system-level dependencies or native extensions, our environment supports completely custom configuration parameters to modify building parameters precisely."
    },
    {
      q: "How does the caching engine accelerate subsequent production builds?",
      a: "To ensure fast software iteration, Neviri implements a sophisticated multi-tier layer caching mechanism across our high-performance infrastructure. Our builders analyze your package trees, caching your `node_modules`, python virtual environments, or go mod path variables securely inside isolated network storage arrays. During a new compilation cycle, the build server matches the cryptographic signature of your lock files (such as `package-lock.json`, `yarn.lock`, or `Gemfile.lock`). If no dependencies have changed, the builder bypasses the expensive downloading phases entirely and restores your cached files instantaneously. Furthermore, for Docker-based custom apps, we leverage cached image layers, compiling only the specific code slices that have been updated, frequently dropping compilation times from minutes to mere seconds."
    },
    {
      q: "How are runtime environment variables and production secrets secured?",
      a: "Security is baked directly into the core architecture of our deployment engine. Storing API tokens, database connection strings, or encryption passphrases inside raw source control is a dangerous security liability. In the Neviri control panel, you can inject configuration parameters and environment variables into a highly encrypted parameter vault. These secrets are securely encrypted at rest utilizing enterprise-grade AES-256 protocols. At runtime, the variables are dynamically injected into your running application process memory space inside isolated kernel boundaries. They are never written to disk, never printed in build outputs, and never exposed to the public internet, satisfying the rigorous isolation demands of compliance standards like PCI DSS and SOC 2."
    },
    {
      q: "What language runtimes and application frameworks are natively supported?",
      a: "Neviri provides premium, zero-configuration buildpacks for virtually every modern engineering language and framework. This includes Node.js (Next.js, Remix, NestJS, Express), Python (Django, FastAPI, Flask), Go, Ruby on Rails, Rust, PHP (Laravel), and static frontend environments (React, Vue, Vite, Nuxt). If your application relies on a custom binary stack or a niche enterprise framework, you can include a standard `Dockerfile` in your repository root. Neviri will automatically detect the file, bypass the standard language buildpacks, and execute a multi-stage Docker build, giving you infinite programmatic control over your underlying operating system layer."
    },
    {
      q: "How does the platform handle global content delivery and edge optimizations?",
      a: "The moment your application is successfully deployed on our server infrastructure, its public ingress is immediately integrated into Neviri&apos;s Global Edge Network. Static assets—such as HTML files, compressed client bundle JavaScript, modern CSS structures, and optimized images—are automatically parsed and cached across our global content caching arrays. Incoming application routing is dynamically terminated at the edge, utilizing next-generation HTTP/2 and HTTP/3 multiplexing to optimize load latency. Dynamic API traffic is back-hauled across our high-speed, dedicated internal fiber backbone lines directly to the host computing nodes, reducing total global latency profile drastically."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden" style={gridBg}>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <header className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 text-center overflow-hidden">
        {/* Sky Blue and Indigo Gradient Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-sky-400/20 via-blue-500/10 to-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 text-sky-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(14,165,233,0.15)] transform transition-transform hover:scale-105">
            <Rocket className="h-4 w-4" /> Git-to-Cloud Continuous Delivery
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            Push Your Code. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">We Handle the Rest.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Streamline your operational lifecycle with automated Git integration. Neviri App Deployment bridges the gap between development and production. Connect your repository, define your environment parameters, and watch your code transition to global infrastructure with zero-downtime, fully managed builds, and smart layer scaling.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="https://sng-central.neviri.com/signup" className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Deploy Your Project Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="#architecture" className="bg-white hover:bg-sky-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-sky-200 hover:shadow-md">
              Explore Build Pipelines
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SEO CONTENT BLOCK 1: THE CD PIPELINE EXPLAINED ── */}
        <section id="architecture" className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-8">
                  <Layers className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">Modernizing Application Delivery Pipelines</h2>
                <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
                  <p>
                    Managing complex server dependencies, provisioning compute nodes, manually configuring continuous integration pathways, and orchestrating server reboots represent an unnecessary mental tax for modern software engineering teams. Your primary business objective is to create feature value for users, not maintain infrastructure layers.
                  </p>
                  <p>
                    Neviri App Deployment shifts the continuous deployment paradigm entirely. By abstracting the server management layer away from software orchestration, our platform listens to semantic hooks directly from your source repository pipelines. The second code lands inside your specified trunk branches, our container builders take execution control over the codebase.
                  </p>
                  <p>
                    Our engine compiles source dependencies, executes customized configuration layers, strips build-time code bloat, applies standard asset optimization policies, and publishes deployment components directly to an immutable runtime configuration. It provides all the robust flexibility of a custom Docker or Kubernetes environment but demands zero infrastructure maintenance from your side.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 bg-gradient-to-br from-slate-900 to-[#0A0F1C] rounded-[2rem] p-8 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 blur-3xl rounded-full" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <Terminal className="h-5 w-5 text-sky-400" />
                    <span className="text-sm font-mono text-slate-400">Build System Output Log</span>
                  </div>
                  
                  <div className="bg-black/50 rounded-xl p-5 border border-slate-700 font-mono text-xs sm:text-sm Mediterranean-scrollbar leading-relaxed mb-6 space-y-1 overflow-x-auto text-slate-300">
                    <p className="text-slate-500">[16:15:02] Fetching source code from repository branch...</p>
                    <p className="text-sky-400">[16:15:04] Analyzing framework: Next.js (App Router) detected.</p>
                    <p className="text-slate-500">[16:15:05] Restoring module cache from previous production run.</p>
                    <p className="text-white">[16:15:08] Running compilation script: npm run build</p>
                    <p className="text-emerald-400">[16:15:14] Optimized static pages generated successfully.</p>
                    <p className="text-sky-400">[16:15:15] Assigning immutable identifier: nv_build_92a3f8</p>
                    <p className="text-emerald-500 font-bold">[16:15:16] Swapping routing traffic. Zero-downtime deployment complete.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                        <GitBranch className="h-4 w-4 text-sky-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Git Webhook Triggers</p>
                        <p className="text-slate-400 text-xs mt-1">Automatic compilation kicks off on push. No manual orchestration needed.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                        <RefreshCw className="h-4 w-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Automated Health Check Routines</p>
                        <p className="text-slate-400 text-xs mt-1">traffic is seamlessly directed to healthy runtime containers only.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── KEY FEATURES GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">High-Performance Deployment Features</h2>
            <p className="text-lg text-slate-500 leading-relaxed">Built from the ground up to support modern agile methodologies, rapid testing branches, and massive application throughput scaling requirements.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Zap, title: "Zero-Downtime Swaps", desc: "Our engine executes atomic deployments. New code spins up in parallel, completes deep verification checks, and cuts over seamlessly without a single dropping packet." },
              { icon: Sliders, title: "Env Variable Vaulting", desc: "Manage environment production secrets securely. Encryption frameworks mask API keys and credentials, injecting parameters dynamically at boot time." },
              { icon: Globe, title: "Global Edge Content", desc: "Static runtime code assets are intelligently distributed and cached right at our edge arrays, resulting in ultra-fast content load times globally." },
              { icon: Eye, title: "Branch Preview Links", desc: "Iterate seamlessly on individual development paths. Every single open pull request builds into an isolated staging url, streamlining collaborative review workflows." },
              { icon: RefreshCw, title: "Instant Instant Rollbacks", desc: "Code bug slipped into your main branch? Revert instantly to any historical compilation state in under a single second with one dashboard click." },
              { icon: Activity, title: "Live Application Telemetry", desc: "Gain visibility into your running workloads. Monitor request volumes, streaming standard errors, output streams, and memory limits inside real-time log viewers." }
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

        {/* ── SEO CONTENT BLOCK 2: CONTAINER ISOLATION & LANGUAGE SUPPORT ── */}
        <section>
           <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
             <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
             
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <ShieldCheck className="h-4 w-4" /> Hardened Isolation Layers
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">Native Multi-Runtime Infrastructure and Scalability</h2>
                  <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
                    <p>
                      Your applications demand varying operating environments based on their core technical architecture. Neviri manages this by isolating every single running deployment unit into hardened sandboxed container environments. Our cloud hypervisors schedule processing and RAM access strict boundaries, ensuring no resource overlap can influence execution performance.
                    </p>
                    <p>
                      Furthermore, our platform scales horizontally automatically. If you configure target trigger values linked to CPU ceilings or active request thresholds, our orchestration plane provisions secondary dynamic container clones into server fleets, distributing internal system routing smoothly across our load balancer channels.
                    </p>
                    <p>
                      This structural architecture provides unparalleled stability. If a single application path encounters a memory leak error or unique code fault, it can crash and restart isolated parameters inside milliseconds without causing cascading operational side effects to neighboring web microservice layers.
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
                    <h3 className="text-xl font-bold text-white mb-6 pt-2">Supported Language Buildpacks</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["Next.js / React / Node", "Python FastAPI / Django", "Golang Web Modules", "Rust Axum / Actix", "Ruby on Rails Apps", "Laravel PHP Backends", "Vite Static Frameworks", "Custom Multi-Stage Docker"].map((lang, i) => (
                        <div key={lang} className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-sky-500/50 rounded-xl p-4 text-sm font-medium text-slate-300 flex items-center gap-3 transition-all cursor-default">
                          <Cpu className="h-4 w-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
                          {lang}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-700/50">
                      <Link href="https://sng-central.neviri.com/signup" className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-2 text-sm group transition-colors">
                        Deploy your codebase stack now
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
             </div>
           </div>
        </section>

        {/* ── CHRONOLOGICAL PIPELINE PIPELINE ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">The Code to Deployment Pipeline</h2>
            <p className="text-lg text-slate-500">How code moves seamlessly from your local terminal to production-ready global endpoints.</p>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-slate-200 z-0"></div>

            {[
              { step: "01", title: "Git Push Commit", desc: "Develop features locally using standard toolchains. Execute git push to instantly trigger build endpoints." },
              { step: "02", title: "Isolated Compilation", desc: "Neviri builder spins up a sandbox, grabs layers, dependencies, and compiles build bundles." },
              { step: "03", title: "Verification Matrix", desc: "Automated routing checkers fire up custom container tests, matching health routes and response parameters." },
              { step: "04", title: "Cutover Execution", desc: "Edge load balancers alter routing rules natively, delivering live assets to users instantly." }
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center group">
                <div className="w-16 h-16 bg-white border-2 border-slate-200 text-[#0F172A] group-hover:border-sky-500 group-hover:text-sky-600 rounded-2xl flex items-center justify-center text-xl font-extrabold mb-6 transition-all shadow-sm">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">{s.title}</h3>
                <p className="text-sm text-slate-500 max-w-[220px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MASSIVE SEO FAQ ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Deployment Infrastructure FAQ</h2>
              <p className="text-lg text-slate-500">Everything you need to master continuous integration architecture, preview URLs, memory allowances, and custom pipelines.</p>
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
              <p className="text-slate-500 mb-6">Ready to scale your software deployment cycle?</p>
              <Link href="https://sng-central.neviri.com/signup" className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Launch Your First App <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
