import React, { useState } from "react";
import {
  Server,
  Network,
  Eye,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      icon: Server,
      title: "Compliant Elastic Compute",
      description: "Elastic virtual machines and containers with full data sovereignty guarantees. Deploy with predictable performance and complete control.",
      highlight: "Data never leaves your jurisdiction"
    },
    {
      icon: Network,
      title: "Secure Networking",
      description: "Software-defined networking with private VPCs, secure segmentation, and compliance data pathways. Built for compliance-first architectures.",
      highlight: "Zero-trust network architecture"
    },
    {
      icon: Eye,
      title: "Transparent Observability",
      description: "Unified monitoring platform with regulatory intelligence. Real-time compliance status alongside performance metrics in isolated dashboards.",
      highlight: "Full visibility, zero leakage"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built-in compliance frameworks for regulated industries. Automated governance, threat detection, and strict policy enforcement.",
      highlight: "Automated Policy Enforcement"
    },
    {
      icon: Zap,
      title: "Peak Performance",
      description: "High-performance NVMe storage with automatic horizontal scaling and intelligent load balancing for your heaviest traffic spikes.",
      highlight: "Intelligent Load Balancing"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Deploy in multiple physically isolated regions worldwide for optimal performance, keeping data perfectly sovereign and local.",
      highlight: "Isolated Sovereign Regions"
    },
  ];

  // Calculate positions for 6 nodes in a circle
  const getPosition = (index) => {
    const angle = (index * 60 * Math.PI) / 180; // 60 degrees apart
    const radius = 42; // Percentage radius
    return {
      top: `calc(50% - ${radius * Math.cos(angle)}%)`,
      left: `calc(50% + ${radius * Math.sin(angle)}%)`,
    };
  };

  return (
    <section id="features" className="relative bg-white py-24 px-6 lg:px-12 font-sans antialiased selection:bg-[#3B82F6]/30">
      
      {/* Faint Background Grid to match the Hero */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        
        {/* Centered Heading */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          {/* Updated Badge to match the True Blue theme */}
          <div className="inline-flex items-center px-4 py-1.5 bg-[#0F172A] rounded-full text-[#FFFFFF] text-xs font-black uppercase tracking-[0.15em] mb-6 shadow-sm shadow-[#3B82F6]/20 border border-[#0F172A]">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#3B82F6] mr-2.5 animate-pulse"></span>
            What We DO?
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-[-0.04em] leading-[1.1] mb-6">
            Everything you need to manage your infrastructure.
          </h2>
          
          <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
            Deploy with predictable performance, absolute security, and complete control over your data sovereignty.
          </p>
        </div>

        {/* Interactive Data Sovereign Hub */}
        <div className="relative w-full max-w-3xl mx-auto h-[600px] md:h-[700px] mt-10">
          
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none" style={{ opacity: 0.15 }}>
            {features.map((_, index) => {
              const angle = (index * 60 * Math.PI) / 180;
              const x2 = 50 + 42 * Math.sin(angle);
              const y2 = 50 - 42 * Math.cos(angle);
              return (
                <line 
                  key={index} 
                  x1="50%" y1="50%" 
                  x2={`${x2}%`} y2={`${y2}%`} 
                  stroke="#0F172A" strokeWidth="2" strokeDasharray="6 6"
                  className={`transition-all duration-500 ${activeFeature === index ? 'stroke-[#3B82F6] opacity-100' : ''}`}
                />
              );
            })}
          </svg>

          {/* Central Hub Core */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-700 ${activeFeature !== null ? 'opacity-0 scale-90 blur-sm' : 'opacity-100 scale-100'}`}>
            <div className="absolute w-64 h-64 bg-[#3B82F6]/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute w-48 h-48 border border-[#3B82F6]/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="relative w-24 h-24 bg-[#0F172A] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)] border border-[#3B82F6]/50">
              <Shield className="w-10 h-10 text-[#3B82F6]" />
            </div>
            <div className="absolute -bottom-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Core Hub
            </div>
          </div>

          {/* Dynamic Central Information Card (Appears on Hover) */}
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[420px] bg-white/90 backdrop-blur-xl border border-[#3B82F6] rounded-[2rem] p-8 shadow-[0_20px_50px_-15px_rgba(59,130,246,0.3)] transition-all duration-500 z-20 ${
              activeFeature !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            {activeFeature !== null && (
              <div className="flex flex-col h-full text-center items-center">
                <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#0F172A]/20">
                  {React.createElement(features[activeFeature].icon, { className: "w-8 h-8 text-[#3B82F6]" })}
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-4 tracking-tight">
                  {features[activeFeature].title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium mb-8">
                  {features[activeFeature].description}
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0F172A]">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6] mr-2 animate-pulse"></span>
                  {features[activeFeature].highlight}
                </div>
              </div>
            )}
          </div>

          {/* Floating Orbit Nodes */}
          {features.map((feature, index) => {
            const position = getPosition(index);
            const isActive = activeFeature === index;
            const isDimmed = activeFeature !== null && activeFeature !== index;

            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                style={position}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="relative group cursor-pointer flex flex-col items-center">
                  
                  {/* Node Background Glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#3B82F6] rounded-full blur-xl opacity-40"></div>
                  )}

                  {/* Icon Node */}
                  <div 
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      isActive 
                        ? 'bg-[#0F172A] border-[#3B82F6] scale-110 shadow-2xl' 
                        : isDimmed
                        ? 'bg-white border-slate-100 opacity-50 scale-95'
                        : 'bg-white border-slate-200 hover:border-[#0F172A] shadow-sm'
                    }`}
                  >
                    <feature.icon 
                      className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 ${
                        isActive ? 'text-[#3B82F6]' : 'text-slate-700'
                      }`} 
                      strokeWidth={isActive ? 2.5 : 2} 
                    />
                  </div>
                  
                  {/* Node Label (Hidden when a card is active to keep it clean) */}
                  <div className={`absolute top-[110%] w-32 text-center transition-opacity duration-300 ${activeFeature !== null ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="text-xs font-bold text-[#0F172A] bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                      {feature.title.split(' ').pop()} {/* Just a short tag */}
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;