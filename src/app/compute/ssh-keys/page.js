"use client";

import React, { useState } from "react";
import {
  Key,
  Shield,
  Terminal,
  Lock,
  Server,
  FileCode,
  Users,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Zap,
  Globe,
  Database,
  Cpu
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function SSHKeysPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "What exactly is an SSH Key and how does it work?",
      a: "An SSH (Secure Shell) key is an access credential that uses public-key cryptography to securely authenticate you with a remote server. It consists of two parts: a public key and a private key. The public key is placed on the server (like a lock), and the private key stays securely on your local machine (like a physical key). When you attempt to log in, the server uses the public key to create a cryptographic challenge that can only be solved by the corresponding private key. If your computer solves the challenge, access is granted—all without ever transmitting a password over the network."
    },
    {
      q: "Why are SSH Keys considered more secure than traditional passwords?",
      a: "Passwords are fundamentally vulnerable to brute-force attacks, dictionary attacks, and credential stuffing. A complex password might take years to crack, but it can still be stolen via phishing, keyloggers, or intercepted over insecure networks. SSH keys, specifically modern algorithms like Ed25519 or RSA-4096, contain vastly more entropy (randomness) than any human-memorizable password. Because the private key is never transmitted over the internet during authentication, it cannot be intercepted. Without the physical private key file on your local machine, an attacker cannot access your server, even if they know the server's IP address and username."
    },
    {
      q: "Which cryptographic algorithms does Neviri support?",
      a: "Neviri supports the most robust and modern cryptographic algorithms available today. We highly recommend using Ed25519, which is a public-key signature system based on elliptic curve cryptography. Ed25519 offers exceptional security, faster generation, and much shorter key lengths compared to older standards. We also fully support RSA keys with a minimum recommended bit length of 2048, though 4096-bit RSA keys are preferred for long-term security. Legacy algorithms like DSA and ECDSA are deprecated due to known cryptographic weaknesses."
    },
    {
      q: "How do I inject an SSH key into my Virtual Machine on Neviri?",
      a: "It's seamless. First, you add your public key string to the Neviri SSH Key Vault in your dashboard. When you create a new Virtual Machine, you simply check the box next to the keys you want to authorize. During the provisioning process, our orchestration engine automatically injects the selected public keys directly into the `~/.ssh/authorized_keys` file of the `root` user (or default user) on your new VM via cloud-init. Once the server boots, you can log in immediately using your private key."
    },
    {
      q: "Can I add or remove SSH keys after the Virtual Machine is already running?",
      a: "If you have already deployed a Virtual Machine, you can manage access by manually appending new public keys to the server's `authorized_keys` file via an active SSH session. Additionally, if your instance supports the Neviri agent, you can push new keys to the server directly from your control panel without needing to log in. Removing a key from the Neviri dashboard does not automatically delete it from running servers; it simply prevents that key from being injected into future deployments."
    },
    {
      q: "What happens if I lose my private SSH key?",
      a: "If you lose your private SSH key and password authentication is disabled on your Virtual Machine (which is the recommended security posture), you will not be able to log in via standard SSH. However, you are not permanently locked out. You can use the Neviri Web Console available in your dashboard, which provides out-of-band VNC/TTY access directly to the virtual machine. From there, you can log in using root credentials and add a new public key to your `authorized_keys` file to restore normal SSH access."
    },
    {
      q: "How should I manage SSH keys for a team of developers?",
      a: "For team environments, you should enforce a strict 'one key per developer' policy. Never share private keys. Each developer should generate their own key pair and upload their public key to your team's Neviri organization. When provisioning infrastructure, you can select multiple public keys to inject into the server, granting access to the entire team. If a developer leaves the organization, you simply remove their specific public key from the servers, instantly revoking their access without impacting the rest of the team."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden" style={gridBg}>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <header className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-sky-400/20 to-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 text-sky-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(14,165,233,0.15)] transform transition-transform hover:scale-105">
            <Key className="h-4 w-4" /> Secure Access Management
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            Impenetrable Server Access. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Zero Passwords Required.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Eliminate the risk of brute-force attacks and credential theft. Neviri&apos;s centralized SSH Key management allows you to inject cryptographic public keys directly into your Virtual Machines at launch, ensuring that only authenticated machines can access your critical cloud infrastructure.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/login" className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Add Your SSH Key
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/support" className="bg-white hover:bg-sky-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-sky-200 hover:shadow-md">
              Read the Documentation
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SEO CONTENT BLOCK 1: CRYPTOGRAPHY EXPLAINED ── */}
        <section className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-8">
                  <Shield className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">The Mechanics of Cryptographic Trust</h2>
                <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
                  <p>
                    In the modern cloud landscape, relying on traditional passwords to protect administrative root access is a severe security liability. Automated botnets scan the internet continuously, launching relentless brute-force and dictionary attacks against exposed SSH ports.
                  </p>
                  <p>
                    SSH keys solve this vulnerability by utilizing <strong>asymmetric public-key cryptography</strong>. Instead of a single password, you generate a mathematical pair of keys: a public key and a private key. The public key can be freely shared and uploaded to the Neviri dashboard, while the private key is heavily encrypted and stored locally on your physical device.
                  </p>
                  <p>
                    When you attempt to connect to your Neviri Virtual Machine, the server challenges your local machine to prove it possesses the private key that mathematically corresponds to the authorized public key. Because the private key never traverses the internet, it cannot be intercepted, effectively rendering brute-force attacks mathematically impossible.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 bg-gradient-to-br from-slate-900 to-[#0A0F1C] rounded-[2rem] p-8 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 blur-3xl rounded-full" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <Terminal className="h-5 w-5 text-sky-400" />
                    <span className="text-sm font-mono text-slate-400">Generate a secure key</span>
                  </div>
                  
                  <div className="bg-black/50 rounded-xl p-5 border border-slate-700 font-mono text-sm leading-relaxed mb-6">
                    <p className="text-slate-400">$ ssh-keygen -t ed25519 -C &quot;admin@neviri&quot;</p>
                    <p className="text-slate-300 mt-2">Generating public/private ed25519 key pair.</p>
                    <p className="text-slate-300">Enter file in which to save the key:</p>
                    <p className="text-sky-400">/home/user/.ssh/id_ed25519</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-sky-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Private Key (Keep Secret)</p>
                        <p className="text-slate-400 text-xs mt-1">Stays on your local machine, secured by a passphrase.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Public Key (Upload to Neviri)</p>
                        <p className="text-slate-400 text-xs mt-1">Injected into your VM during the automated boot process.</p>
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
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">Advanced Access Controls</h2>
            <p className="text-lg text-slate-500 leading-relaxed">Designed for developers and security teams. Manage access across your entire cloud fleet from a single, unified control plane.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Database, title: "Centralized Key Vault", desc: "Upload your public keys once to your Neviri account. They are securely stored in your personal vault, ready to be attached to any new infrastructure you deploy instantly." },
              { icon: Zap, title: "Zero-Touch Injection", desc: "Select authorized keys during the VM creation process. Our orchestration layer injects them directly via cloud-init before the server even finishes booting." },
              { icon: Lock, title: "Ed25519 & RSA Support", desc: "We support the most robust cryptographic standards. Utilize ultra-secure, fast-signing Ed25519 elliptic curve keys or traditional RSA keys up to 4096 bits." },
              { icon: Users, title: "Team Collaboration", desc: "Scaling a DevOps team? Easily attach multiple public keys to a single server deployment, granting secure root access to specific engineers without sharing credentials." },
              { icon: FileCode, title: "API Management", desc: "Automate your infrastructure security. Fully integrate SSH key management into your CI/CD pipelines or Terraform scripts using the comprehensive Neviri Cloud API." },
              { icon: Server, title: "Immutable Audit Logs", desc: "Maintain strict compliance. Every key uploaded, deleted, or injected into a server is logged in your account's activity dashboard for security auditing." }
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

        {/* ── DEPLOYMENT FLOW ── */}
        <section>
          <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
            <div className="relative z-10 text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">From Terminal to Cloud in Seconds</h2>
              <p className="text-lg text-slate-400">Implement zero-trust security architecture across your fleet effortlessly.</p>
            </div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-slate-700 z-0"></div>

              {[
                { step: "01", title: "Generate Your Key Pair", desc: "Run a simple terminal command locally to generate a secure, mathematical key pairing. Keep the private key safe." },
                { step: "02", title: "Upload Public Key", desc: "Copy the output of your public key file (.pub) and paste it into the secure SSH Keys vault in your Neviri dashboard." },
                { step: "03", title: "Deploy & Connect", desc: "Select your key when spinning up a new Virtual Machine. Once live, connect instantly via SSH without typing a password." }
              ].map((s, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-slate-800 border-2 border-sky-500 text-sky-400 rounded-2xl flex items-center justify-center text-2xl font-black mb-8 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{s.title}</h3>
                  <p className="text-sm text-slate-400 max-w-[280px] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MASSIVE SEO FAQ ── */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Comprehensive SSH Key FAQ</h2>
              <p className="text-lg text-slate-500">Everything you need to understand about cryptographic authentication, cloud security postures, and managing access on Neviri.</p>
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
              <p className="text-slate-500 mb-6">Ready to secure your infrastructure?</p>
              <Link href="/signup" className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Create Your Account <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
