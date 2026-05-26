import React from "react";
import Navbar from "@/components/common/Navbar";
import { Users, Database, Target, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white/90 text-[#1A1F2C] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 "></div>
      <div className="absolute inset-0 bg-[url('/images/signup1.jpeg')] bg-cover bg-center opacity-5"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#E5EAF1] rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#E5EAF1] rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E5EAF1] rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 bg-white/85">
        <Navbar />

        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-[#DDE3EA] bg-white/90">
          <div className="absolute inset-0 bg-white/20 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-10">
            <h1 className="text-2xl md:text-6xl font-bold bg-clip-text text-transparent bg-[#1A1F2C] mb-6">
              Cloud Infrastructure That Scales With Your Business
            </h1>
            <p className="text-xl text-[#4B5565] max-w-5xl mx-auto">
              Neviri Cloud is a next-generation cloud service provider built for startups, SaaS companies, and growing enterprises. We help you deploy, scale, and manage production-grade databases and cloud infrastructure instantly—without complexity, hidden costs, or DevOps overhead.
            </p>
          </div>
        </div>

        {/* Supported Databases */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1F2C] mb-4">
              Managed Database Service, Built for Scale
            </h2>
            <p className="text-[#4B5565] max-w-3xl mx-auto mb-12">
              Deploy fully managed MongoDB, MySQL, and PostgreSQL clusters in under a minute. What traditionally takes weeks of planning, provisioning, and tuning now happens instantly—with security, backups, and monitoring included by default.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* MongoDB */}
              <div className="bg-white p-8 rounded-2xl border border-[#DDE3EA] hover:border-[#0C6B46]/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-15 h-15 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center">
                      <Database className="w-10 h-10 text-green-500" />
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-[#1A1F2C]">
                      MongoDB
                    </h3>
                    <p className="text-sm text-[#4B5565]">NoSQL Database</p>
                  </div>
                </div>
                <ul className="text-left space-y-3 text-[#4B5565]">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Replica sets with automatic failover</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Real-time performance monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Automated daily backups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Horizontal scaling support</span>
                  </li>
                </ul>
              </div>

              {/* MySQL */}
              <div className="bg-white p-8 rounded-2xl border border-[#DDE3EA] hover:border-[#2563EB]/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-15 h-15 bg-gradient-to-br from-[#00758F]/20 to-[#00758F]/20 rounded-xl flex items-center justify-center">
                      <Database className="w-10 h-10 text-[#00758F]" />
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-[#1A1F2C]">MySQL</h3>
                    <p className="text-sm text-[#4B5565]">
                      Relational Database
                    </p>
                  </div>
                </div>
                <ul className="text-left space-y-3 text-[#4B5565]">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Master-slave replication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Query performance insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Point-in-time recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Vertical scaling on demand</span>
                  </li>
                </ul>
              </div>

              {/* PostgreSQL */}
              <div className="bg-white p-8 rounded-2xl border border-[#DDE3EA] hover:border-purple-600/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-15 h-15 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                      <Database className="w-10 h-10 text-purple-500" />
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-[#1A1F2C]">
                      PostgreSQL
                    </h3>
                    <p className="text-sm text-[#4B5565]">
                      Advanced SQL Database
                    </p>
                  </div>
                </div>
                <ul className="text-left space-y-3 text-[#4B5565]">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Streaming replication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Advanced query optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>WAL archiving & recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>JSON & full-text search</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white border-y border-[#DDE3EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gray-700 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-[#4B5565] leading-relaxed">
                At Neviri Cloud, we envision a future where cloud infrastructure is no longer a barrier to innovation.
A future where startups and businesses can focus entirely on building products—while infrastructure simply works.

Our mission is to empower <b>10,000+</b> startups and SMEs across India and emerging markets with cloud infrastructure that is secure, scalable, and completely transparent. By eliminating complexity and hidden costs, we enable teams to move faster, scale confidently, and grow without limits.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gray-700 mb-16">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#DDE3EA]">
              <h3 className="text-xl font-bold text-[#1A1F2C] mb-4 ">
                Rapid Deployment
              </h3>
              <p className="text-[#4B5565] leading-relaxed">
                Deploy MongoDB, MySQL, and PostgreSQL clusters in under sixty
                seconds, reducing weeks of setup into minutes and eliminating
                the need for complex DevOps expertise.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#DDE3EA]">
              <h3 className="text-xl font-bold text-[#1A1F2C] mb-4">
                Transparent Pricing
              </h3>
              <p className="text-[#4B5565] leading-relaxed">
                We follow a pay-as-you-go billing model with no hidden costs,
                offering full clarity and fairness so startups and SMEs can
                manage budgets and scale confidently as they grow.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#DDE3EA]">
              <h3 className="text-xl font-bold text-[#1A1F2C] mb-4">
                Enterprise Reliability
              </h3>
              <p className="text-[#4B5565] leading-relaxed">
                Neviri Cloud guarantees 99.9% uptime with automatic scaling,
                monitoring, and backups, ensuring that every workload remains
                secure, stable, and available at all times.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#DDE3EA]">
              <h3 className="text-xl font-bold text-[#1A1F2C] mb-4">
                Security & Compliance
              </h3>
              <p className="text-[#4B5565] leading-relaxed">
                With SSL encryption, VPC isolation, role-based access, and
                compliance-ready controls, Neviri Cloud keeps your data safe,
                private, and aligned with global standards.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1A1F2C] mb-4">
              Why Businesses Choose Neviri Cloud
            </h2>
            <p className="text-[#4B5565]">
              Everything you need to deploy, manage, and scale cloud infrastructure—without the operational burden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#DDE3EA] hover:border-purple-600/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#2563EB]/20 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">
                Lightning-Fast Provisioning
              </h3>
              <p className="text-[#4B5565] leading-relaxed">
                Spin up databases and cloud resources in seconds using our fully automated provisioning engine. No manual setup. No infrastructure headaches.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#DDE3EA] hover:border-purple-600/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#1D4FD7]/20 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">
                Usage-Based Billing
              </h3>
              <p className="text-[#4B5565] leading-relaxed">
                

Scale up or down freely. You’re billed only for what you consume, giving you complete control over infrastructure costs at every stage of growth.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#DDE3EA] hover:border-purple-600/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#1D4FD7]/20 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">
                Unified Management Dashboard
              </h3>
              <p className="text-[#4B5565] leading-relaxed">
                Monitor performance, manage backups, restore data, and track resource usage in real time—all from a single, intuitive control panel.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#1A1F2C] mb-2">
                  &lt;60s
                </div>
                <div className="text-[#4B5565]">Cloud Resources Provisioned</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#1A1F2C] mb-2">
                  99.9%
                </div>
                <div className="text-[#4B5565]">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#1A1F2C] mb-2">
                  100+
                </div>
                <div className="text-[#4B5565]">Active Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#1A1F2C] mb-2">
                  24/7
                </div>
                <div className="text-[#4B5565]">Cloud & Infrastructure Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
