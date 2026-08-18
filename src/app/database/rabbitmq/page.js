"use client";

import React, { useState } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  Cpu,
  Gauge,
  GitBranch,
  Inbox,
  Lock,
  Network,
  Play,
  Repeat,
  Send,
  Server,
  Share2,
  Shield,
  ShieldCheck,
  Workflow,
  Zap
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { APP_SIGNUP_URL } from "@/config/api";

export default function RabbitMQPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // States for the interactive Message Flow Simulator
  const [queueDepth, setQueueDepth] = useState(0);
  const [ackedA, setAckedA] = useState(0);
  const [ackedB, setAckedB] = useState(0);
  const [consumersActive, setConsumersActive] = useState(false);
  const [isDraining, setIsDraining] = useState(false);
  const [logLines, setLogLines] = useState([]);

  const startBurst = () => {
    if (isDraining) return;
    setIsDraining(true);
    setAckedA(0);
    setAckedB(0);
    setQueueDepth(20);
    setLogLines([
      { cls: "text-orange-400", text: "[0.0s] 20 messages published with publisher confirms (persistent, delivery_mode=2)." }
    ]);

    // Step 2: Exchange routes the burst to the bound queue
    setTimeout(() => {
      setLogLines(prev => [
        ...prev,
        { cls: "text-slate-400", text: "[0.7s] Direct exchange orders.direct routed 20 messages to queue orders.process." }
      ]);
    }, 700);

    // Step 3: Consumers come online and prefetch
    setTimeout(() => {
      setConsumersActive(true);
      setLogLines(prev => [
        ...prev,
        { cls: "text-amber-400", text: "[1.4s] consumer-a and consumer-b prefetch 10 messages each (basic.qos applied)." }
      ]);
    }, 1400);

    // Step 4: Drain the queue tick by tick, one ack per consumer per tick
    setTimeout(() => {
      let remaining = 20;
      const drainInterval = setInterval(() => {
        remaining -= 2;
        setQueueDepth(remaining);
        setAckedA(a => a + 1);
        setAckedB(b => b + 1);

        if (remaining <= 0) {
          clearInterval(drainInterval);
          setConsumersActive(false);
          setLogLines(prev => [
            ...prev,
            { cls: "text-emerald-400", text: "[4.8s] All 20 messages acknowledged. Queue orders.process is empty." }
          ]);

          // Step 5: Return the simulator to its idle state
          setTimeout(() => {
            setQueueDepth(0);
            setAckedA(0);
            setAckedB(0);
            setLogLines([]);
            setIsDraining(false);
          }, 2600);
        }
      }, 320);
    }, 1600);
  };

  const unackedCount = consumersActive && queueDepth > 0 ? 2 : 0;
  const deliveryRate = consumersActive && queueDepth > 0 ? "6.2 msg/s" : "0.0 msg/s";

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "Can messages be lost in a managed RabbitMQ broker?",
      a: "Not when the durability primitives are combined correctly, and Neviri enables them by default. Queues are declared durable and producers mark messages persistent (delivery_mode=2), so payloads are written to disk rather than held only in memory. Publisher confirms mean the broker acknowledges a publish only after the message is safely persisted, so your producer knows a write succeeded instead of assuming it. On the consuming side, manual acknowledgements guarantee a message is only removed from the queue after your worker finishes processing it. Finally, quorum queues replicate every message across three broker nodes, so even losing an entire node loses zero acknowledged messages."
    },
    {
      q: "When should I choose RabbitMQ over Kafka?",
      a: "Choose RabbitMQ when you need a smart broker: per-message routing through exchanges, work queues with competing consumers, per-message acknowledgements, priorities, TTLs, and dead-lettering. It excels at task distribution, RPC patterns, and decoupling microservices where each message is a job to complete and delete. Kafka is a distributed replayable log: it shines for event streaming, high-throughput analytics pipelines, and cases where multiple independent systems replay the same ordered history. If your question is 'how do I get this job to exactly one available worker reliably', RabbitMQ is the simpler, cheaper answer. Many teams on Neviri run both for different workloads."
    },
    {
      q: "What happens when my consumers fall behind the publish rate?",
      a: "The queue absorbs the difference — that buffering is the entire point of a broker. Depth grows, and Neviri surfaces it immediately through queue-depth metrics and alerts so you can scale out consumers. If a backlog grows very large, RabbitMQ applies flow control to slow down publishers before memory becomes critical, and you can declare lazy or stream queues that page messages to disk so millions of queued messages do not pressure RAM. As a safety valve, per-queue TTL and max-length policies can expire or dead-letter overflow messages to a parking queue instead of letting a backlog grow without bound."
    },
    {
      q: "How do dead-letter exchanges handle poison messages?",
      a: "A poison message is one that makes a consumer fail every time it is delivered — a malformed payload or a job that hits an unrecoverable error. Without dead-lettering it is redelivered forever, burning CPU and blocking healthy messages. With a dead-letter exchange (DLX) configured, a message that is rejected, expires, or exceeds the queue's delivery limit is republished to a designated exchange and lands in a parking queue with headers describing why it died. From there you can inspect it, fix the bug, and shovel it back into the original queue. Combined with per-queue TTLs, you can also build tiered retry topologies: fail, wait 30 seconds in a delay queue, retry, then dead-letter for good after N attempts."
    },
    {
      q: "How does a quorum queue survive a broker node failure?",
      a: "Every quorum queue on Neviri is replicated across three broker nodes using the Raft consensus protocol: one replica acts as leader and handles all reads and writes, while followers persist every operation to their own logs. A publish is only confirmed once a majority of replicas have written it. If the node hosting the leader fails, the surviving followers detect the missed heartbeats and elect a new leader within seconds — and because the majority already holds every confirmed message, no acknowledged data is lost. Client libraries reconnect through the same Neviri endpoint and resume publishing and consuming without topology changes in your code."
    },
    {
      q: "Which protocols and client libraries are supported?",
      a: "AMQP 0-9-1 is the native protocol and works with every major client: amqplib for Node.js, pika for Python, Spring AMQP for Java, amqp091-go for Go, and equivalents for .NET, Ruby, PHP, and Rust. Neviri brokers also ship with the MQTT plugin enabled for lightweight IoT and mobile publishers, and STOMP for simple text-based clients and web frontends over WebSockets. All protocols terminate TLS at the broker, and each application can be scoped to its own virtual host with isolated permissions."
    }
  ];

  const features = [
    {
      icon: GitBranch,
      title: "Quorum Queues with Raft",
      desc: "Every production queue is replicated across three broker nodes using Raft consensus. A majority must persist each message before it is confirmed, so node loss never loses acknowledged data."
    },
    {
      icon: Network,
      title: "Multi-Protocol Broker",
      desc: "Speak AMQP 0-9-1 natively, plus MQTT for IoT device fleets and STOMP for WebSocket frontends. One broker, one endpoint, every client ecosystem connected."
    },
    {
      icon: Repeat,
      title: "Dead-Letter Exchanges",
      desc: "Route rejected, expired, or over-delivered messages into parking queues automatically. Combine DLX with per-queue TTLs to build tiered retry and backoff topologies declaratively."
    },
    {
      icon: ShieldCheck,
      title: "At-Least-Once Delivery",
      desc: "Publisher confirms guarantee the broker persisted your message before acking the producer. Consumer acknowledgements guarantee nothing is deleted until your worker finishes the job."
    },
    {
      icon: Activity,
      title: "Management UI + Prometheus",
      desc: "The full RabbitMQ management dashboard ships enabled — inspect queues, connections, and channels live. Prometheus metrics are exposed for your existing Grafana alerting stack."
    },
    {
      icon: Lock,
      title: "TLS + Private VPC Isolation",
      desc: "AMQPS with TLS 1.3 is enforced for every client connection. Brokers bind to your private VPC subnet by default, with per-vhost credentials scoping each application's access."
    }
  ];

  const integrationItems = [
    {
      icon: Cpu,
      title: "Decouple Neviri Compute",
      desc: "Place work queues between the services running on your Neviri compute instances. A checkout API publishes in milliseconds while background workers absorb the actual load — traffic spikes fill the queue instead of crashing your fleet."
    },
    {
      icon: Gauge,
      title: "Queue-Depth Autoscaling",
      desc: "Feed broker queue-depth metrics into Neviri autoscaling policies. When orders.process climbs past your threshold, consumer instances are added automatically — and scaled back to zero cost when the backlog clears."
    },
    {
      icon: Shield,
      title: "Zero Public AMQP Exposure",
      desc: "Brokers live entirely on your private VPC with no public 5672 or 5671 listener. Only your compute instances on the internal subnet can reach the broker, eliminating the most common messaging attack surface."
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-orange-400/20 to-amber-500/20 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(249,115,22,0.15)] transform transition-transform hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Fully Managed Message Broker
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            Decouple Every Service. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">Deliver Every Message.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Neviri Managed RabbitMQ gives your microservices a reliable asynchronous backbone. Publish a job in milliseconds, let durable queues absorb the spike, and let acknowledged workers process at their own pace — with quorum replication, dead-lettering, and TLS handled for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href={APP_SIGNUP_URL} className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-lg shadow-slate-900/25">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Deploy RabbitMQ Broker
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="#message-simulator" className="bg-white hover:bg-orange-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-orange-200 hover:shadow-md">
              Try Message Flow Simulator
            </Link>
          </div>

          <div className="mt-8 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 inline-block px-4 py-2 rounded-lg shadow-sm">
            🚀 Deploy today with a $100 instant infrastructure credit.
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SECTION 1: ASYNC MESSAGING & FLOW SIMULATOR ── */}
        <section id="message-simulator" className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                  <Workflow className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                  Absorb the Spike. Never Drop the Job.
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  <p>
                    Synchronous HTTP chains fail together: one slow downstream service and your checkout endpoint times out. A work queue breaks that coupling. Producers publish in milliseconds and move on, while consumers pull jobs at exactly the rate they can sustain.
                  </p>
                  <p>
                    Every hop in the pipeline carries an explicit guarantee, so a burst of traffic becomes queue depth instead of dropped requests:
                  </p>
                  <ul className="space-y-3 pt-2 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                      <span>Publisher confirms: The broker persists before it acks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                      <span>Prefetch fairness: Work is balanced across the consumer fleet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                      <span>Consumer acks: Messages delete only after processing succeeds</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Interactive RabbitMQ Message Flow Simulator */}
              <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-[#0F172A] rounded-[2rem] p-8 border border-slate-800 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Workflow className="h-5 w-5 text-orange-400" />
                      Message Flow Simulator
                    </h3>
                    <button
                      onClick={startBurst}
                      disabled={isDraining}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 transition-all ${
                        isDraining ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed" : "bg-orange-600 border-orange-500 hover:bg-orange-700 text-white cursor-pointer"
                      }`}
                    >
                      <Play className="h-3 w-3 fill-current" /> Publish Burst (20 msgs)
                    </button>
                  </div>

                  {/* Broker topology schematic */}
                  <div className="flex items-center justify-between gap-2 py-4">
                    {/* Producer */}
                    <div className="text-center shrink-0">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mx-auto transition-all ${
                        isDraining ? "bg-orange-500/20 border-orange-500 text-orange-400" : "bg-slate-800 border-slate-700 text-slate-400"
                      }`}>
                        <Send className="h-5 w-5" />
                      </div>
                      <span className="text-[9px] text-slate-400 mt-2 block font-mono">producer</span>
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-600 shrink-0" />

                    {/* Exchange */}
                    <div className="text-center shrink-0">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mx-auto transition-all ${
                        isDraining ? "bg-amber-500/20 border-amber-500 text-amber-400" : "bg-slate-800 border-slate-700 text-slate-400"
                      }`}>
                        <Share2 className="h-5 w-5" />
                      </div>
                      <span className="text-[9px] text-slate-400 mt-2 block font-mono">orders.direct</span>
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-600 shrink-0" />

                    {/* Queue with depth bar */}
                    <div className="text-center flex-1 min-w-0">
                      <div className={`rounded-xl border p-3 transition-all ${
                        queueDepth > 0 ? "bg-orange-500/10 border-orange-500/60 shadow-[0_0_15px_rgba(249,115,22,0.25)]" : "bg-slate-800 border-slate-700"
                      }`}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Inbox className={`h-5 w-5 ${queueDepth > 0 ? "text-orange-400" : "text-slate-400"}`} />
                          <span className="text-sm font-black text-white font-mono">{queueDepth}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300"
                            style={{ width: `${(queueDepth / 20) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-2 block font-mono">orders.process</span>
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-600 shrink-0" />

                    {/* Consumers */}
                    <div className="space-y-3 shrink-0">
                      <div className={`px-3 py-2 rounded-xl border text-left transition-all ${
                        consumersActive ? "bg-orange-500/15 border-orange-500/60 animate-pulse" : "bg-slate-800 border-slate-700"
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <Server className={`h-3.5 w-3.5 ${consumersActive ? "text-orange-400" : "text-slate-400"}`} />
                          <span className="text-[9px] font-bold text-slate-300 font-mono">consumer-a</span>
                        </div>
                        <span className="text-[9px] text-emerald-400 font-mono block mt-0.5">acked: {ackedA}</span>
                      </div>
                      <div className={`px-3 py-2 rounded-xl border text-left transition-all ${
                        consumersActive ? "bg-orange-500/15 border-orange-500/60 animate-pulse" : "bg-slate-800 border-slate-700"
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <Server className={`h-3.5 w-3.5 ${consumersActive ? "text-orange-400" : "text-slate-400"}`} />
                          <span className="text-[9px] font-bold text-slate-300 font-mono">consumer-b</span>
                        </div>
                        <span className="text-[9px] text-emerald-400 font-mono block mt-0.5">acked: {ackedB}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stat tiles */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">Queue Depth</span>
                      <span className={`text-[11px] font-black font-mono block mt-0.5 ${queueDepth > 0 ? "text-orange-400" : "text-slate-300"}`}>
                        {queueDepth} ready
                      </span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">Delivery Rate</span>
                      <span className="text-[11px] text-slate-300 font-black font-mono block mt-0.5">{deliveryRate}</span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-lg border border-slate-800">
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">Unacked</span>
                      <span className={`text-[11px] font-black font-mono block mt-0.5 ${unackedCount > 0 ? "text-amber-400" : "text-slate-300"}`}>
                        {unackedCount}
                      </span>
                    </div>
                  </div>

                  {/* Simulator logs box */}
                  <div className="mt-4 bg-black/60 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-300 h-28 overflow-y-auto">
                    {logLines.length === 0 && (
                      <p className="text-slate-500 animate-pulse">Broker idle on vhost /orders. Click Publish Burst to enqueue 20 messages...</p>
                    )}
                    <div className="space-y-1">
                      {logLines.map((line, i) => (
                        <p key={i} className={line.cls}>{line.text}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#1E293B]/60 border border-slate-800 p-4 rounded-xl text-xs text-slate-400 leading-relaxed mt-6">
                  <span className="font-bold text-white block mb-1">Delivery guarantee chain:</span>
                  Publisher confirms persist the burst before the producer moves on. Prefetch (basic.qos) hands each consumer 10 messages at a time, and every message is removed only after an explicit acknowledgement.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: CORE FEATURES GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              Production Messaging Without the Ops
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Every Neviri broker ships with replication, dead-lettering, observability, and network isolation configured before your first message is published.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-[1.5rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(249,115,22,0.12)] hover:border-orange-200 transition-all duration-300 group transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300 shadow-sm">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-orange-700 transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: ECOSYSTEM INTEGRATION (DARK PANEL) ── */}
        <section>
          <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]"></div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  <Zap className="h-4 w-4" /> Event-Driven Cloud Fabric
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                  The Async Backbone of Your Stack
                </h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  Managed RabbitMQ plugs into Neviri compute, autoscaling, and VPC networking so queues drive your architecture instead of just buffering it.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {integrationItems.map((item, index) => (
                  <div key={index} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-orange-600 text-xs font-bold uppercase tracking-wider">
                <Code2 className="h-4 w-4" /> Client libraries
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight">
                Speak AMQP from Any Runtime
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Neviri hands you a standard AMQPS connection URI, so every mature RabbitMQ client works unmodified. Declare your exchanges and queues in code, and the broker topology follows your repository instead of a dashboard.
              </p>
              <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-xl text-xs text-slate-500">
                Each application gets its own virtual host and scoped credentials, so a misbehaving staging worker can never consume from your production queues.
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Node.js amqplib", desc: "Publish with confirm channels and consume with prefetch-tuned workers from Express, Fastify, or NestJS services." },
                { title: "Python pika + Celery", desc: "Point Celery's broker URL at your Neviri endpoint and get distributed task queues with retries in one config line." },
                { title: "Java Spring AMQP", desc: "Use @RabbitListener annotations, declarative bindings, and container-managed acknowledgements for enterprise JVM services." },
                { title: "Go amqp091-go", desc: "The maintained RabbitMQ client for Go — lightweight channels and delivery iterators built for high-concurrency consumers." }
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
              <p className="text-lg text-slate-500">Everything you need to know about delivery guarantees, queue replication, and broker operations on Neviri.</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openFaqIndex === i ? "border-orange-200 bg-orange-50/30" : "border-gray-200 bg-white hover:border-orange-200"}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
                    aria-expanded={openFaqIndex === i}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <h4 className={`text-lg font-bold transition-colors ${openFaqIndex === i ? "text-orange-700" : "text-[#0F172A]"}`}>
                      {faq.q}
                    </h4>
                    <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaqIndex === i ? "bg-orange-100 text-orange-600" : "bg-gray-50 text-gray-400"}`}>
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openFaqIndex === i ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? "max-h-[800px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-base text-slate-600 leading-relaxed border-t border-orange-100/50 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-slate-500 mb-6">Stop chaining brittle HTTP calls. Start publishing messages.</p>
              <Link href={APP_SIGNUP_URL} className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Deploy RabbitMQ Broker <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
