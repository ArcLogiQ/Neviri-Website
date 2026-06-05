"use client";

import React, { useState } from "react";
import {
  Activity,
  BarChart3,
  BellRing,
  Cpu,
  HardDrive,
  Network,
  ShieldAlert,
  Eye,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Zap,
  Terminal,
  LineChart,
  Clock
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function MonitoringPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "What is proactive server monitoring, and why is it critical for my cloud infrastructure?",
      a: "Proactive server monitoring is the continuous, real-time observation of your virtual machines, databases, and network health. Unlike reactive monitoring—where you only investigate after a crash or outage occurs—proactive monitoring uses advanced telemetry and automated alerting to identify performance bottlenecks, memory leaks, or storage capacity limits before they impact your end users. By tracking granular metrics like CPU steal time, RAM utilization, and disk I/O latency, DevOps teams can scale resources or push code fixes to prevent downtime entirely, ensuring a 99.99% uptime SLA."
    },
    {
      q: "How does Neviri collect metrics without impacting my server's performance?",
      a: "Our monitoring infrastructure utilizes an ultra-lightweight, natively compiled telemetry agent. This agent operates at the hypervisor level and within the OS kernel, consuming less than 1% of a single vCPU core and mere megabytes of RAM. It securely streams metric data via an encrypted outbound connection to our centralized time-series databases. Because the processing and data aggregation happen off-node on Neviri's dedicated observability clusters, your server's compute power remains 100% dedicated to serving your actual application workloads."
    },
    {
      q: "What is the difference between Host-Level and Application-Level monitoring?",
      a: "Host-level monitoring (which is included out-of-the-box with Neviri) tracks the physical and virtual hardware resources of your instance: CPU usage, total memory consumption, network bandwidth in/out, and disk read/write operations. Application-level monitoring (APM) goes a layer deeper, tracking specific software behaviors like HTTP 500 error rates, database query execution times, and background worker queue lengths. While Neviri provides comprehensive host-level metrics, our platform also allows you to integrate seamlessly with APM tools like Datadog, New Relic, or open-source Prometheus/Grafana stacks."
    },
    {
      q: "How do automated alert policies work?",
      a: "Alert policies allow you to define custom thresholds for any tracked metric. For example, you can create a rule that states: 'If CPU utilization exceeds 85% for more than 5 consecutive minutes, trigger a High Severity alert.' When an alert is triggered, the Neviri observability engine instantly routes a notification to your configured endpoints. This can include SMS messages, automated emails, Slack/Discord webhook notifications, or triggering a PagerDuty incident. You can also configure 'warning' thresholds to notify you before a situation becomes critical."
    },
    {
      q: "Can monitoring data be used to trigger auto-scaling events?",
      a: "Yes. Neviri's monitoring metrics are deeply integrated with our cloud orchestration API. By combining custom alert thresholds with webhooks, you can build fully automated CI/CD and auto-scaling pipelines. When your monitoring agent detects sustained high traffic (e.g., bandwidth spikes or high CPU load), it can fire a webhook to your load balancer or infrastructure-as-code scripts (like Terraform) to automatically spin up additional Virtual Machines, ensuring your application seamlessly absorbs traffic spikes."
    },
    {
      q: "How long is my historical server metric data retained?",
      a: "By default, high-resolution metric data (sampled every 10 seconds) is retained for 30 days, allowing for granular post-mortem incident analysis. Aggregated data (downsampled to 1-hour and 1-day averages) is retained for up to 12 months. This long-term historical data is crucial for capacity planning, identifying seasonal traffic trends, auditing application performance degradation over time, and generating compliance or SLA reports for your enterprise clients."
    },
    {
      q: "Does monitoring help with cybersecurity and intrusion detection?",
      a: "Absolutely. While monitoring is primarily a performance tool, it is a critical component of a Zero-Trust security posture. Sudden, unexplained spikes in outbound network bandwidth can indicate a data exfiltration event or your server being used in a DDoS botnet. Unusually high CPU utilization might signal unauthorized crypto-mining malware. By setting strict baseline thresholds and utilizing our anomaly detection algorithms, you can isolate and shut down compromised instances within minutes of an intrusion."
    },
    {
      q: "Is there an additional cost for Neviri Server Monitoring?",
      a: "Basic host-level monitoring, which includes standard dashboards for CPU, RAM, Disk, and Network traffic, alongside email alerting, is included completely free of charge with every Virtual Machine and Managed Database deployed on the Neviri network. For enterprise teams requiring sub-second metric resolution, extended data retention beyond 12 months, or advanced API integrations (like PagerDuty or unlimited Slack webhooks), we offer a highly affordable Premium Observability add-on."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden" style={gridBg}>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <header className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-sky-400/20 via-blue-500/10 to-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 text-sky-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(14,165,233,0.15)] transform transition-transform hover:scale-105">
            <Activity className="h-4 w-4" /> Proactive Cloud Observability
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            See Everything. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Prevent Downtime.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Gain total visibility into your cloud infrastructure. Neviri Monitoring delivers real-time telemetry, historical trend analysis, and customizable alerting pipelines. Track your CPU, Memory, Disk I/O, and Network health with sub-minute resolution to proactively scale resources and stop outages before they impact your users.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="https://sng-central.neviri.com/signup" className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Enable Monitoring Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="#features" className="bg-white hover:bg-sky-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-sky-200 hover:shadow-md">
              Explore Dashboards
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SEO CONTENT BLOCK 1: THE IMPORTANCE OF OBSERVABILITY ── */}
        <section id="features" className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-8">
                  <Eye className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">The Era of Reactive Infrastructure is Over</h2>
                <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
                  <p>
                    Deploying code is only half the battle. Once your application is live, ensuring it operates smoothly under varying traffic loads requires deep, uncompromising visibility into your infrastructure. Operating a cloud environment without real-time monitoring is akin to flying blind. 
                  </p>
                  <p>
                    Neviri Server Monitoring transforms raw telemetry data into actionable intelligence. Our comprehensive observability suite automatically tracks the vital signs of every Virtual Machine, Managed Database, and Load Balancer you provision. We aggregate millions of data points into centralized, human-readable dashboards, empowering your DevOps and Site Reliability Engineering (SRE) teams to make data-driven decisions.
                  </p>
                  <p>
                    By identifying subtle anomalies—such as a slow but steady increase in RAM consumption indicating a memory leak, or creeping disk I/O latency hinting at an unoptimized database query—you can push code optimizations or vertically scale your server resources well before a critical failure disrupts your revenue stream or damages your brand reputation.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-3xl rounded-full" />
                
                {/* Simulated Dashboard UI */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-sky-400" /> Live Telemetry
                    </h3>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      LIVE
                    </span>
                  </div>

                  <div className="space-y-6">
                    {/* CPU Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400 font-medium">CPU Utilization</span>
                        <span className="text-white font-mono">42%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-sky-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    
                    {/* RAM Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400 font-medium">Memory Usage (8GB total)</span>
                        <span className="text-amber-400 font-mono">88%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>

                    {/* Network Data */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Net In (Eth0)</p>
                        <p className="text-lg font-mono text-white">45.2 <span className="text-xs text-slate-500">Mb/s</span></p>
                      </div>
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Disk Read</p>
                        <p className="text-lg font-mono text-white">12.1 <span className="text-xs text-slate-500">MB/s</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE METRICS GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">Granular Hardware Metrics</h2>
            <p className="text-lg text-slate-500 leading-relaxed">We extract highly accurate data directly from the hypervisor and OS kernel level, ensuring you have a complete picture of your infrastructure&apos;s performance envelope.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2rem] p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-sky-200 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A]">CPU & Load Averages</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Track how intensely your processors are working. We monitor user-space CPU usage, system/kernel operations, and crucial &apos;steal time&apos; metrics. Understanding your 1-minute, 5-minute, and 15-minute load averages helps you determine if your application requires code optimization or if it&apos;s time to upgrade to a higher-tier compute flavor.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-indigo-200 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A]">Memory (RAM) Allocation</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Memory exhaustion is the leading cause of server crashes (OOM Killer). Our monitoring agent separates total RAM usage into active application memory, cached data, and buffers. By setting proactive alerts for when active memory exceeds 90%, you can restart sluggish services or provision more RAM before your application crashes.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-emerald-200 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HardDrive className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A]">Disk I/O & Capacity</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Monitor the total available capacity of your NVMe storage volumes to prevent failed database writes due to full disks. Furthermore, we track exact Disk Input/Output Operations Per Second (IOPS) and read/write bandwidth. High IOPS latency is often the hidden culprit behind slow database queries and sluggish website load times.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-sky-300 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Network className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A]">Network Throughput</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Visualize all inbound and outbound traffic traversing your Virtual Machine&apos;s public and private network interfaces. Monitoring throughput helps you anticipate bandwidth overage charges, assess the success of marketing campaigns driving traffic spikes, and identify anomalous outbound data transfers indicative of a security breach.
              </p>
            </div>
          </div>
        </section>

        {/* ── SEO CONTENT BLOCK 2: ALERTING PIPELINES ── */}
        <section>
           <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
             <div className="absolute bottom-0 right-0 -mr-32 -mb-32 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px]"></div>
             
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="bg-slate-800/80 backdrop-blur-xl rounded-[2rem] border border-slate-700/50 p-8 shadow-2xl">
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                      <BellRing className="h-5 w-5 text-rose-400" /> Alert Configuration
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">IF METRIC</p>
                        <p className="text-white font-mono text-sm bg-slate-800 p-2 rounded">CPU Utilization</p>
                      </div>
                      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">IS GREATER THAN</p>
                        <p className="text-white font-mono text-sm bg-slate-800 p-2 rounded text-rose-400 font-bold">85%</p>
                      </div>
                      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">FOR DURATION OF</p>
                        <p className="text-white font-mono text-sm bg-slate-800 p-2 rounded flex items-center gap-2">
                          <Clock className="h-4 w-4 text-sky-400" /> 5 Minutes
                        </p>
                      </div>
                      <div className="pt-4">
                        <button className="w-full bg-rose-500/20 text-rose-400 border border-rose-500/50 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                          <ShieldAlert className="h-4 w-4" /> Trigger PagerDuty & Slack
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <BellRing className="h-4 w-4" /> Automated Incident Response
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">Never Miss a Critical Event Again</h2>
                  <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
                    <p>
                      Dashboards are incredibly useful for historical analysis and active debugging, but nobody can stare at a screen 24/7. That is where Neviri&apos;s highly configurable Alerting Engine takes over.
                    </p>
                    <p>
                      Design custom alerting policies mapped exactly to your application&apos;s unique tolerances. Set multiple severity tiers—for instance, triggering a silent email warning when disk space hits 70%, but initiating a high-priority PagerDuty incident waking up your on-call engineers when it reaches 95%.
                    </p>
                    <p>
                      Integrate seamlessly with the communication tools your DevOps team already uses. We support native webhooks pushing formatted alerts directly into Slack, Discord, Microsoft Teams, and OpsGenie. With comprehensive JSON payloads included in every webhook, you can even connect our alerting system to your CI/CD pipelines to trigger automated server scaling or traffic rerouting operations instantly.
                    </p>
                  </div>
                </div>
             </div>
           </div>
        </section>

        {/* ── MASSIVE SEO FAQ ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Deep Dive: Monitoring FAQ</h2>
              <p className="text-lg text-slate-500">Comprehensive answers regarding data retention, agent performance, integration capabilities, and cloud observability best practices.</p>
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
              <p className="text-slate-500 mb-6">Ready to bring transparency to your architecture?</p>
              <Link href="https://sng-central.neviri.com/signup" className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Deploy Monitored Infrastructure <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
