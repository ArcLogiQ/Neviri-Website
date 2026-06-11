"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Settings,
  Shield,
  Layers,
  Activity,
  Clock,
  Database,
  RefreshCw,
  Terminal,
} from "lucide-react";
import Navbar from "@/components/common/Navbar";

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureBlock({ icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-blue-600">{icon}</div>
        <h3 className="font-bold text-slate-900">{title}</h3>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function StatBox({ label, value, status }) {
  return (
    <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide mb-1 text-slate-500">
        {label}
      </p>
      <p
        className={`font-semibold ${
          status ? "text-slate-900" : "text-slate-400 line-through"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 pb-6">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left"
      >
        <h4 className="font-bold text-lg text-slate-900">{q}</h4>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && <p className="mt-3 text-slate-600 leading-relaxed">{a}</p>}
    </div>
  );
}

function NeviriPostgresContent() {
  const [isPoolingOn, setIsPoolingOn] = useState(true);

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">


      <section className="relative pt-20 pb-24 overflow-hidden border-b border-slate-200 bg-white">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block px-3 py-1 mb-6 border border-slate-200 rounded-full text-xs font-semibold tracking-wide text-slate-500 uppercase bg-white shadow-sm">
            Advanced Object-Relational Database
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Engineered for Complexity. <br className="hidden md:block" />
            <span className="text-blue-600">Tuned for Scale.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Neviri Managed PostgreSQL provides the full power of Postgres without
            the operational overhead. Connection pooling, automatic failover, and
            point-in-time recovery are configured and operated for you—production-ready
            from day one.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="https://sng-central.neviri.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition shadow-md flex items-center justify-center"
            >
              Initialize Postgres Cluster
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>

            <a
              href="#simulator"
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-100 transition text-center"
            >
              Try the Pooling Simulator
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Tuned for the Real World
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Out of the box, stock PostgreSQL is conservative. It is designed to
              run on minimal hardware, so default configurations bottleneck quickly
              under real traffic. Neviri provisions each cluster with settings
              matched to your selected compute tier.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Layers className="text-blue-600" />}
              title="Connection pooling built in."
              desc="PgBouncer is deployed and managed alongside your cluster, not bolted on later as an afterthought."
            />
            <FeatureCard
              icon={<Settings className="text-blue-600" />}
              title="Tier-matched configuration."
              desc="Memory and worker settings are accurately sized to your plan and applied through controlled rolling updates."
            />
            <FeatureCard
              icon={<Shield className="text-blue-600" />}
              title="Managed end to end."
              desc="Backups, failover, and monitoring are configured and run for you, leaving nothing to assemble."
            />
          </div>
        </div>
      </section>

      <section id="simulator" className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Connection Pool Simulator
            </h2>
            <p className="text-slate-600">
              See exactly how PgBouncer protects your database under load.
            </p>
          </div>

          <div
            className={`border rounded-2xl p-8 md:p-12 transition-colors duration-300 shadow-sm ${
              isPoolingOn ? "bg-white border-blue-200" : "bg-red-50/50 border-red-200"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-slate-100 gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Component Status
                </p>
                <div className="flex items-center gap-3">
                  <h3
                    className={`text-2xl font-bold ${
                      isPoolingOn ? "text-blue-600" : "text-red-600"
                    }`}
                  >
                    PgBouncer {isPoolingOn ? "ON" : "OFF"}
                  </h3>
                  <span className="relative flex h-3 w-3">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isPoolingOn ? "bg-blue-400" : "bg-red-400"
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        isPoolingOn ? "bg-blue-500" : "bg-red-500"
                      }`}
                    />
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsPoolingOn(!isPoolingOn)}
                className="px-6 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Toggle Pooling Status
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">
                  How this impacts your infrastructure:
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-5 rounded-lg border border-slate-100 min-h-[140px]">
                  {isPoolingOn
                    ? "Thousands of incoming client connections are multiplexed down to a small, stable pool of backend connections. Memory stays flat and predictable even during traffic spikes."
                    : "Postgres forks a separate OS process per connection. A flood of connections exhausts RAM managing idle processes, and the OS is highly likely to OOM-kill the database."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatBox
                  label="Pooling mode"
                  value={isPoolingOn ? "Transaction-level" : "Disabled"}
                  status={isPoolingOn}
                />
                <StatBox
                  label="Backend connections"
                  value={isPoolingOn ? "Stable pool" : "Unbounded limits"}
                  status={isPoolingOn}
                />
                <StatBox
                  label="Replica pooling"
                  value={isPoolingOn ? "HA-ready" : "None"}
                  status={isPoolingOn}
                />
                <div
                  className={`p-4 rounded-lg border ${
                    isPoolingOn
                      ? "bg-green-50 border-green-200"
                      : "bg-red-100 border-red-300"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1 text-slate-500">
                    DB Status
                  </p>
                  <p
                    className={`font-bold ${
                      isPoolingOn ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {isPoolingOn ? "Healthy & Stable" : "OOM Risk High"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built for Production, Managed for You
            </h2>
            <p className="text-slate-600 text-lg">
              We run Postgres with the tooling operators expect in production,
              ensuring resilience without requiring you to assemble the pieces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <FeatureBlock icon={<Layers />} title="Native PgBouncer Pooling">
              Multiplex thousands of client connections down to an efficient,
              highly available pool with transaction-level pooling and replica
              pooler instances.
            </FeatureBlock>
            <FeatureBlock icon={<Activity />} title="Automatic High Availability">
              Patroni manages leader election and failover. If the primary fails,
              a healthy replica is promoted automatically.
            </FeatureBlock>
            <FeatureBlock icon={<Clock />} title="Point-in-Time Recovery">
              Continuous WAL archiving (via pgBackRest) lets you restore to a
              specific moment in time. Roll back bad migrations instantly.
            </FeatureBlock>
            <FeatureBlock icon={<Database />} title="Automated Backups">
              Scheduled full, differential, and incremental backups stream to
              durable S3-compatible object storage, with retention handled
              automatically.
            </FeatureBlock>
            <FeatureBlock icon={<RefreshCw />} title="Declarative Scaling">
              We reconcile your cluster to the desired state automatically.
              Replicas and rolling updates are handled with automatic failure
              recovery.
            </FeatureBlock>
            <FeatureBlock icon={<Terminal />} title="Built-in Monitoring">
              Track connection counts, transaction rates, cache hit ratios, and
              replication lag out of the box.
            </FeatureBlock>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Shield className="w-12 h-12 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">
            Disaster Recovery That Actually Works
          </h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Hope is not an infrastructure strategy. Neviri continuously archives
            your Write-Ahead Logs (WAL) to durable, off-node object storage.
          </p>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-left shadow-lg font-mono text-sm">
            <p className="text-slate-300">
              <span className="text-slate-500">
                Scenario: A bad migration corrupts your schema
              </span>
              <br />
              <span className="text-red-400">Time of corruption:</span> 4:12:05 PM
              <br />
              <br />
              <span className="text-slate-500">
                Action: Initiate Point-in-Time Recovery (PITR)
              </span>
              <br />
              <span className="text-green-400">Database restored to:</span> 4:12:04 PM
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Technical FAQ
          </h2>
          <div className="space-y-8">
            <FaqItem
              q="What is PgBouncer and why does it matter?"
              a="PgBouncer is a lightweight connection pooler. By default, PostgreSQL forks a separate OS process per connection. Opening hundreds of them burns memory managing idle processes. PgBouncer multiplexes many client connections down to a small, efficient backend pool, keeping memory stable. Neviri deploys and manages it natively."
            />
            <FaqItem
              q="How do you handle large and high-volume tables?"
              a="We utilize PostgreSQL's native declarative partitioning to keep large tables and their indexes fast as they grow, with no proprietary or locked-in engine required."
            />
            <FaqItem
              q="How does Point-in-Time Recovery protect my data?"
              a="We continuously archive your Write-Ahead Logs to durable off-node storage. If a bad update occurs, you can restore a new instance to your database's exact state at a precise second in time, minimizing data loss."
            />
            <FaqItem
              q="How does the platform stay available during failures?"
              a="Patroni provides automatic leader election and failover via continuous health checks. If the primary becomes unhealthy, a replica is promoted automatically. You can also trigger manual switchovers for maintenance."
            />
            <FaqItem
              q="Can I connect from outside Neviri?"
              a="Yes. Managed Postgres lives inside a private VPC by default. If you need external access, enable a public connection string and use the stateful Neviri Cloud Firewall to restrict traffic to whitelisted IPs."
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-50 border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Write better queries. Build better architectures. <br className="hidden md:block" />
            <span className="text-blue-600">Let us manage scaling.</span>
          </h2>

          <Link
            href="https://sng-central.neviri.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition shadow-md text-lg"
          >
            Initialize Postgres Cluster
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <NeviriPostgresContent />
    </div>
  );
}
