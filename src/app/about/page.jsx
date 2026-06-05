import React from "react";
import Navbar from "@/components/common/Navbar";
import { Users, Database, Target, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] relative overflow-hidden font-sans antialiased selection:bg-sky-600/30 selection:text-black">
      {/* Background Effects */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 232, 240, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          backgroundPosition: "center center",
        }}
      ></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(255,255,255,0.9)_100%)] z-0"></div>

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-sky-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-[#E2E8F0] bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-sm leading-[1.15]">
              Cloud Infrastructure That Scales With Your Business
            </h1>
            <p className="text-xl text-[#64748B] max-w-5xl mx-auto font-medium leading-relaxed">
              Neviri Cloud is a next-generation cloud service provider built for
              startups, SaaS companies, and growing enterprises. We help you
              deploy, scale, and manage production-grade databases and cloud
              infrastructure instantly—without complexity, hidden costs, or
              DevOps overhead.
            </p>
          </div>
        </div>

        {/* Supported Databases */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
              Managed Database Service, Built for Scale
            </h2>
            <p className="text-lg text-[#64748B] font-medium max-w-3xl mx-auto">
              Deploy fully managed MongoDB, MySQL, and PostgreSQL clusters in
              under a minute. What traditionally takes weeks of planning,
              provisioning, and tuning now happens instantly—with security,
              backups, and monitoring included by default.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* MongoDB */}
            <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center">
                    <Database className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-[#0F172A]">MongoDB</h3>
                  <p className="text-sm font-semibold text-slate-400">
                    NoSQL Database
                  </p>
                </div>
              </div>
              <ul className="text-left space-y-3 text-[#64748B] font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>Replica sets with automatic failover</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>Real-time performance monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>Automated daily backups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>Horizontal scaling support</span>
                </li>
              </ul>
            </div>

            {/* MySQL */}
            <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] hover:border-[#3B82F6]/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#3B82F6]/20 to-[#0EA5E9]/20 rounded-xl flex items-center justify-center">
                    <Database className="w-8 h-8 text-[#3B82F6]" />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-[#0F172A]">MySQL</h3>
                  <p className="text-sm font-semibold text-slate-400">
                    Relational Database
                  </p>
                </div>
              </div>
              <ul className="text-left space-y-3 text-[#64748B] font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>Master-slave replication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>Query performance insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>Point-in-time recovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>Vertical scaling on demand</span>
                </li>
              </ul>
            </div>

            {/* PostgreSQL */}
            <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] hover:border-[#3B82F6]/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/20 rounded-xl flex items-center justify-center">
                    <Database className="w-8 h-8 text-[#3B82F6]" />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-[#0F172A]">
                    PostgreSQL
                  </h3>
                  <p className="text-sm font-semibold text-slate-400">
                    Advanced SQL Database
                  </p>
                </div>
              </div>
              <ul className="text-left space-y-3 text-[#64748B] font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>Streaming replication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>Advanced query optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>WAL archiving & recovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] font-bold">✓</span>
                  <span>JSON & full-text search</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white/50 backdrop-blur-sm border-y border-[#E2E8F0] relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 tracking-tight">
                Our Vision
              </h2>
              <p className="text-lg text-[#64748B] leading-relaxed font-medium">
                At Neviri Cloud, we envision a future where cloud infrastructure
                is no longer a barrier to innovation. A future where startups
                and businesses can focus entirely on building products—while
                infrastructure simply works.
              </p>
              <p className="text-lg text-[#64748B] leading-relaxed font-medium mt-4">
                Our mission is to empower{" "}
                <b className="text-[#0F172A]">10,000+</b> startups and SMEs
                across India and emerging markets with cloud infrastructure that
                is secure, scalable, and completely transparent. By eliminating
                complexity and hidden costs, we enable teams to move faster,
                scale confidently, and grow without limits.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0F172A] mb-16 tracking-tight">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] shadow-sm">
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Rapid Deployment
              </h3>
              <p className="text-[#64748B] font-medium leading-relaxed">
                Deploy MongoDB, MySQL, and PostgreSQL clusters in under sixty
                seconds, reducing weeks of setup into minutes and eliminating
                the need for complex DevOps expertise.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] shadow-sm">
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Transparent Pricing
              </h3>
              <p className="text-[#64748B] font-medium leading-relaxed">
                We follow a pay-as-you-go billing model with no hidden costs,
                offering full clarity and fairness so startups and SMEs can
                manage budgets and scale confidently as they grow.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] shadow-sm">
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Enterprise Reliability
              </h3>
              <p className="text-[#64748B] font-medium leading-relaxed">
                Neviri Cloud guarantees 99.9% uptime with automatic scaling,
                monitoring, and backups, ensuring that every workload remains
                secure, stable, and available at all times.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] shadow-sm">
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Security & Compliance
              </h3>
              <p className="text-[#64748B] font-medium leading-relaxed">
                With SSL encryption, VPC isolation, role-based access, and
                compliance-ready controls, Neviri Cloud keeps your data safe,
                private, and aligned with global standards.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
              Why Businesses Choose Neviri Cloud
            </h2>
            <p className="text-lg text-[#64748B] font-medium">
              Everything you need to deploy, manage, and scale cloud
              infrastructure—without the operational burden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] hover:border-[#3B82F6]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-sky-600/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-[#3B82F6]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                Lightning-Fast Provisioning
              </h3>
              <p className="text-[#64748B] font-medium leading-relaxed">
                Spin up databases and cloud resources in seconds using our fully
                automated provisioning engine. No manual setup. No
                infrastructure headaches.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] hover:border-[#3B82F6]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-sky-600/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-[#3B82F6]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                Usage-Based Billing
              </h3>
              <p className="text-[#64748B] font-medium leading-relaxed">
                Scale up or down freely. You’re billed only for what you
                consume, giving you complete control over infrastructure costs
                at every stage of growth.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] hover:border-[#3B82F6]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-sky-600/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-[#3B82F6]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                Unified Management Dashboard
              </h3>
              <p className="text-[#64748B] font-medium leading-relaxed">
                Monitor performance, manage backups, restore data, and track
                resource usage in real time—all from a single, intuitive control
                panel.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/50 backdrop-blur-sm border-t border-[#E2E8F0] relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#0F172A] mb-2 tracking-tight">
                  &lt;60s
                </div>
                <div className="text-[#64748B] font-medium">
                  Cloud Resources Provisioned
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#0F172A] mb-2 tracking-tight">
                  99.9%
                </div>
                <div className="text-[#64748B] font-medium">
                  Uptime Guarantee
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#0F172A] mb-2 tracking-tight">
                  100+
                </div>
                <div className="text-[#64748B] font-medium">
                  Active Customers
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#0F172A] mb-2 tracking-tight">
                  24/7
                </div>
                <div className="text-[#64748B] font-medium">
                  Cloud & Infrastructure Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
