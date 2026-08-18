"use client";

import React, { useState } from "react";
import {
  Database,
  Zap,
  Gauge,
  Sliders,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Server,
  Code2,
  HardDrive,
  MemoryStick,
  Radio,
  ShieldCheck,
  Timer,
  Network
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { APP_SIGNUP_URL } from "@/config/api";

export default function RedisPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // States for the Cache Acceleration Simulator
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [logLines, setLogLines] = useState([
    {
      text: "Cache tier active. Hit ratio 96%. Toggle Redis Cache OFF to route every read to SQL...",
      color: "text-slate-500 animate-pulse"
    }
  ]);

  const stats = cacheEnabled
    ? { p99: "0.5 ms", throughput: "40,000 ops/s", cpu: "12%", status: "Healthy" }
    : { p99: "85 ms", throughput: "900 req/s", cpu: "94%", status: "Database Saturated" };

  const toggleCache = () => {
    if (isSwitching) return;
    const next = !cacheEnabled;
    setIsSwitching(true);
    setCacheEnabled(next);

    if (next) {
      setLogLines([
        { text: "[0.0s] ENABLE received. Reattaching cache tier and warming hot keys...", color: "text-amber-400" }
      ]);
      setTimeout(() => {
        setLogLines((prev) => [
          ...prev,
          { text: "[0.9s] 12,480 keys resident in RAM. Hit ratio climbing: 61%... 88%...", color: "text-slate-400" }
        ]);
      }, 900);
      setTimeout(() => {
        setLogLines((prev) => [
          ...prev,
          { text: "[1.8s] Hit ratio stable at 96%. p99 read latency 0.5ms. Database CPU cooling to 12%.", color: "text-emerald-400" }
        ]);
        setIsSwitching(false);
      }, 1800);
    } else {
      setLogLines([
        { text: "[0.0s] DISABLE received. Bypassing cache tier — all reads routed to the SQL primary...", color: "text-amber-400" }
      ]);
      setTimeout(() => {
        setLogLines((prev) => [
          ...prev,
          { text: "[0.9s] Query queue backing up. p99 latency at 85ms and climbing.", color: "text-slate-400" }
        ]);
      }, 900);
      setTimeout(() => {
        setLogLines((prev) => [
          ...prev,
          { text: "[1.8s] ALERT: Database saturated. CPU pinned at 94% — connection pool exhausted.", color: "text-red-400" }
        ]);
        setIsSwitching(false);
      }, 1800);
    }
  };

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "Will my Redis data survive a restart?",
      a: "Yes, when persistence is enabled — and Neviri enables it by default. RDB snapshots capture a compact point-in-time image of your dataset on a schedule, while the append-only file (AOF) journals every write command as it happens. With appendfsync set to everysec, the worst case after a crash is roughly one second of writes; switch it to always for zero-loss durability at a small latency cost. On restart, Redis replays the AOF or loads the latest RDB, and your keys are back in memory before the endpoint accepts traffic."
    },
    {
      q: "Should I use Redis as a cache or as a primary datastore?",
      a: "Both are valid, but they should be configured differently. As a cache, treat every key as disposable: set TTLs, enable an eviction policy such as allkeys-lru, and let your source-of-truth database rebuild anything that gets evicted. As a primary datastore — for queues, counters, leaderboards, or session state that exists nowhere else — switch the policy to noeviction, run AOF persistence with everysec or always, and attach at least one replica so a node failure never means data loss."
    },
    {
      q: "What happens when Redis reaches its maxmemory limit?",
      a: "Your configured eviction policy decides. With noeviction, Redis rejects new writes with an error until memory is freed — the safe choice for primary data. With allkeys-lru or allkeys-lfu, Redis silently discards the least-recently or least-frequently used keys to make room, which is exactly what a cache should do. The volatile-lru and volatile-ttl policies restrict eviction to keys carrying an expiry, letting you mix durable and disposable data in a single instance. You can change the policy live from the dashboard without a restart."
    },
    {
      q: "How does high-availability failover work?",
      a: "HA plans run a primary with one or more replicas streaming its writes, watched by a Redis Sentinel quorum on independent nodes. If the primary stops answering, the Sentinels agree it is down, promote the most up-to-date replica, and reconfigure the remaining nodes to follow it — typically within a few seconds. Your Neviri connection string always resolves to the current primary, so applications reconnect automatically without a configuration change or redeploy."
    },
    {
      q: "How do I scale memory and throughput?",
      a: "Memory scales vertically: pick a larger plan and Neviri performs a rolling resize — replica first, controlled failover, then the old primary — so your endpoint stays live throughout. For read throughput, attach read replicas and point read-heavy code at the replica endpoint. Because Redis executes commands on a single core, raw per-instance throughput benefits more from pipelining and efficient O(1) commands than from extra vCPUs; the dashboard slow-log view highlights the commands worth restructuring."
    },
    {
      q: "Can I connect to Redis from outside the Neviri cloud?",
      a: "By default, no — instances are provisioned inside a private VPC with zero public routes, which is the posture we recommend keeping. If an external worker or your local machine genuinely needs access, you can enable a public endpoint: TLS becomes mandatory on the wire, AUTH credentials are enforced on every connection, and the Neviri Cloud Firewall restricts inbound traffic to the exact IP addresses you allowlist."
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "In-Memory Microsecond Reads",
      desc: "Your entire working set lives in RAM. GET and SET operations complete in microseconds, holding sub-millisecond p99 latency even at tens of thousands of operations per second."
    },
    {
      icon: HardDrive,
      title: "RDB Snapshots + AOF Log",
      desc: "Point-in-time RDB snapshots pair with an append-only file that journals every write. Tune appendfsync from everysec to always to match the durability your data demands."
    },
    {
      icon: RefreshCw,
      title: "Sentinel Auto-Failover",
      desc: "Replicas stay in continuous sync while Redis Sentinel monitors the primary. On failure, a quorum promotes a replica and traffic re-routes within seconds — no paging, no manual promotion."
    },
    {
      icon: Sliders,
      title: "Configurable Eviction Policies",
      desc: "Choose allkeys-lru, LFU-based, or TTL-driven eviction for when memory fills. Redis discards the least valuable keys instead of failing your writes — switchable live from the dashboard."
    },
    {
      icon: Radio,
      title: "Pub/Sub & Redis Streams",
      desc: "Broadcast events instantly over Pub/Sub channels, or build durable consumer-group pipelines with Redis Streams — no separate message broker to deploy or babysit."
    },
    {
      icon: ShieldCheck,
      title: "TLS, VPC & AUTH Locked Down",
      desc: "Every connection is encrypted with TLS in transit, endpoints stay confined to your private VPC, and clients authenticate with AUTH credentials you can rotate on demand."
    }
  ];

  const integrationItems = [
    {
      icon: Cpu,
      title: "Session & Cache Layer for Compute",
      desc: "Provision Redis beside your Neviri app containers and VMs. Session lookups and cached query results resolve over the local VPC fabric in well under a millisecond."
    },
    {
      icon: Timer,
      title: "Queues, Counters & Rate Limits",
      desc: "Back BullMQ and Celery workers with a managed broker, and enforce sliding-window rate limits across microservices using atomic INCR and EXPIRE operations."
    },
    {
      icon: Network,
      title: "Private VPC Networking",
      desc: "Redis never receives a public route by default. Only backend nodes inside your VPC subnet can reach the endpoint, keeping the data plane invisible to the internet."
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-rose-400/20 via-red-500/10 to-orange-400/20 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(244,63,94,0.15)] transform transition-transform hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Fully Managed In-Memory Data Store
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            Answer in Microseconds. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-500 to-orange-500">Operate with Zero Ops.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Neviri Managed Redis keeps your hottest data resident in RAM — sessions, cache layers, queues, and counters served in microseconds. Persistence, Sentinel failover, and network security are configured for you from the very first GET.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href={APP_SIGNUP_URL} className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-lg shadow-slate-900/25">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Deploy Redis Instance
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="#cache-simulator" className="bg-white hover:bg-rose-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-rose-200 hover:shadow-md">
              Try Cache Simulator
            </Link>
          </div>

          <div className="mt-8 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 inline-block px-4 py-2 rounded-lg shadow-sm">
            🚀 Deploy today with a $100 instant infrastructure credit.
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SECTION 1: CACHE ACCELERATION SIMULATOR ── */}
        <section id="cache-simulator" className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
                  <Zap className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                  Serve Reads from RAM, Not Disk
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  <p>
                    Most read traffic is repetitive: the same sessions, profiles, and product listings fetched thousands of times a minute. Sending every one of those reads through SQL parsing, planning, and disk I/O burns database CPU on answers that never changed.
                  </p>
                  <p>
                    Neviri Managed Redis slots a RAM-resident tier in front of your database, absorbing the repetition before it ever becomes load:
                  </p>
                  <ul className="space-y-3 pt-2 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                      <span>Microsecond reads: hot keys answered straight from memory</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                      <span>TTL-driven freshness: cached rows expire before they go stale</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                      <span>Instant relief: database CPU collapses as the hit ratio climbs</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Interactive Cache Acceleration Simulator */}
              <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-[#0F172A] rounded-[2rem] p-8 border border-slate-800 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 blur-3xl rounded-full pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-rose-400" />
                      Cache Acceleration Simulator
                    </h3>
                    <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
                      <span className="text-[10px] text-slate-400 font-bold px-2">
                        Redis Cache
                      </span>
                      <button
                        onClick={toggleCache}
                        disabled={isSwitching}
                        className={`text-[10px] font-extrabold px-3 py-1 rounded-md transition-all ${
                          isSwitching
                            ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                            : cacheEnabled
                              ? "bg-rose-600 text-white cursor-pointer"
                              : "bg-slate-600 text-slate-100 cursor-pointer"
                        }`}
                      >
                        {cacheEnabled ? "ON" : "OFF"}
                      </button>
                    </div>
                  </div>

                  {/* App -> Redis -> Database flow schematic */}
                  <div className="flex items-center justify-between gap-2 py-6 px-2 md:px-4">
                    {/* App fleet */}
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center mx-auto shadow-md">
                        <Server className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block font-mono">
                        App Containers
                      </span>
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-600 shrink-0" />

                    {/* Redis node - dims when disabled */}
                    <div className={`text-center transition-all ${cacheEnabled ? "opacity-100 scale-100" : "opacity-20 scale-95 pointer-events-none"}`}>
                      <div className="w-14 h-14 rounded-xl bg-rose-600 border border-rose-500 text-white flex items-center justify-center mx-auto shadow-lg relative">
                        <MemoryStick className="h-6 w-6" />
                        {cacheEnabled && (
                          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] font-black uppercase px-1 rounded animate-pulse">
                            96% Hit
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block font-mono">
                        Redis (RAM)
                      </span>
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-600 shrink-0" />

                    {/* SQL database */}
                    <div className="text-center">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto border transition-all ${
                          cacheEnabled
                            ? "bg-slate-800 border-slate-700 text-slate-200"
                            : "bg-red-500/25 border-red-500/50 text-red-400 scale-105 animate-pulse"
                        }`}
                      >
                        <Database className="h-6 w-6" />
                      </div>
                      <span className={`text-[10px] mt-2 block font-mono font-bold ${cacheEnabled ? "text-emerald-400" : "text-red-400"}`}>
                        {stats.status}
                      </span>
                    </div>
                  </div>

                  {/* Diagnostic stat tiles */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">
                        p99 Read Latency
                      </span>
                      <span className={`text-[11px] font-black block mt-0.5 font-mono ${cacheEnabled ? "text-emerald-400" : "text-red-400"}`}>
                        {stats.p99}
                      </span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">
                        Throughput
                      </span>
                      <span className="text-[11px] text-slate-200 font-black block mt-0.5 font-mono">
                        {stats.throughput}
                      </span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">
                        DB CPU Load
                      </span>
                      <span className={`text-[11px] font-black block mt-0.5 font-mono ${cacheEnabled ? "text-emerald-400" : "text-red-400"}`}>
                        {stats.cpu}
                      </span>
                    </div>
                  </div>

                  {/* Simulator log console */}
                  <div className="mt-4 bg-black/60 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-300 h-24 overflow-y-auto space-y-1">
                    {logLines.map((line, idx) => (
                      <p key={idx} className={line.color}>{line.text}</p>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1E293B]/60 border border-slate-800 p-4 rounded-xl text-xs text-slate-400 leading-relaxed mt-6">
                  <span className="font-bold text-white block mb-1">Cache dynamics:</span>
                  - <span className="text-emerald-400 font-bold">Redis ON</span>: 96% of reads terminate in RAM. p99 latency drops to 0.5ms at ~40,000 ops/s while the database idles at 12% CPU serving only cache misses.{" "}
                  - <span className="text-red-400 font-bold">Redis OFF</span>: every request runs a full SQL query. Throughput collapses to ~900 req/s, p99 balloons to 85ms, and the database saturates at 94% CPU.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: CORE FEATURES GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              Everything Redis Should Be in Production
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Every managed instance ships with persistence, replication, failover, and network hardening configured from the first second.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-[1.5rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(244,63,94,0.15)] hover:border-rose-200 transition-all duration-300 group transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all duration-300 shadow-sm">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-rose-700 transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: ECOSYSTEM INTEGRATION (DARK PANEL) ── */}
        <section>
          <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]"></div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  <Zap className="h-4 w-4" /> Memory-Speed Cloud Fabric
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                  Wired into the Neviri Ecosystem
                </h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  Managed Redis lives on the same private fabric as your compute, so the fastest tier of your stack is also the closest one.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {integrationItems.map((item, index) => (
                  <div key={index} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-rose-600 text-xs font-bold uppercase tracking-wider">
                <Code2 className="h-4 w-4" /> Developer workflows
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight">
                Every Standard Client, Unmodified
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Neviri Managed Redis speaks the standard RESP wire protocol, so the client library your team already uses connects without patches, proxies, or vendor SDKs — caching, queues, and pub/sub included.
              </p>
              <div className="bg-rose-50/50 border border-rose-100 p-4 rounded-xl text-xs text-slate-500">
                Connection URLs come pre-formatted with TLS parameters and AUTH credentials for each client library — paste a single line and connect.
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Node.js — ioredis / node-redis", desc: "Promise-first clients for Express and NestJS services, plus BullMQ for Redis-backed job queues, delayed tasks, and repeatable workers." },
                { title: "Python — redis-py", desc: "Sync and asyncio clients for FastAPI and Django caching, and the standard broker and result backend for Celery task pipelines." },
                { title: "Java — Spring Data Redis", desc: "Declarative @Cacheable caching, session repositories, and Lettuce connection pooling for Spring Boot microservices." },
                { title: "Go — go-redis", desc: "Context-aware pipelines and cluster-ready clients that hold microsecond latencies under heavy goroutine concurrency." }
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
              <p className="text-lg text-slate-500">Everything you need to know about persistence, eviction, failover, and scaling Managed Redis on Neviri.</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openFaqIndex === i ? "border-rose-200 bg-rose-50/30" : "border-gray-200 bg-white hover:border-rose-200"}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
                    aria-expanded={openFaqIndex === i}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <h4 className={`text-lg font-bold transition-colors ${openFaqIndex === i ? "text-rose-700" : "text-[#0F172A]"}`}>
                      {faq.q}
                    </h4>
                    <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaqIndex === i ? "bg-rose-100 text-rose-600" : "bg-gray-50 text-gray-400"}`}>
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openFaqIndex === i ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? "max-h-[800px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-base text-slate-600 leading-relaxed border-t border-rose-100/50 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-slate-500 mb-6">Put a memory tier in front of your database in under a minute.</p>
              <Link href={APP_SIGNUP_URL} className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-rose-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Deploy Managed Redis <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
