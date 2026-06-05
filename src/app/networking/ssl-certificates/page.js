"use client";

import React, { useState } from "react";
import {
  Lock,
  Shield,
  ShieldCheck,
  Globe,
  RefreshCw,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Zap,
  Key,
  FileCheck,
  Server,
  Search
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function SSLCertificatePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const gridBg = {
    backgroundColor: "#f8fafc",
    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  };

  const faqs = [
    {
      q: "What exactly is an SSL/TLS Certificate and how does it protect data?",
      a: "An SSL (Secure Sockets Layer) or TLS (Transport Layer Security) certificate is a digital document that authenticates a website&apos;s identity and enables an encrypted connection. When a user navigates to your site, their browser and your Neviri server perform a &apos;TLS Handshake.&apos; During this microsecond process, they verify the certificate and exchange cryptographic keys. Once established, all data transferred—such as credit card numbers, passwords, and personal messages—is scrambled into unbreakable ciphertext. Even if an attacker intercepts the traffic on public Wi-Fi, they will only see random characters, rendering the stolen data completely useless."
    },
    {
      q: "How does Neviri automate the SSL issuance and renewal process?",
      a: "Historically, managing SSL certificates required generating Certificate Signing Requests (CSRs), manual domain validation, downloading zip files, and complex server configurations every year. Neviri eliminates this entirely. Through deep integrations with automated Certificate Authorities (CAs) like Let&apos;s Encrypt and ZeroSSL, our orchestration engine utilizes the ACME (Automated Certificate Management Environment) protocol. When you deploy an app or add a custom domain, Neviri automatically provisions a 256-bit encrypted certificate, binds it to your Load Balancer or VM, and automatically renews it 30 days before expiration. Zero human intervention is required."
    },
    {
      q: "Are these certificates sufficient for PCI DSS compliance and E-Commerce?",
      a: "Yes. The certificates provisioned by Neviri utilize industry-standard 256-bit AES encryption with 2048-bit or 4096-bit RSA signature keys (or modern ECDSA equivalents). This is the exact same level of cryptographic strength utilized by major global banks and financial institutions. Routing your traffic over Neviri&apos;s HTTPS infrastructure fulfills the transmission encryption requirements mandated by PCI DSS, HIPAA, SOC 2, and GDPR, ensuring that your customers&apos; sensitive payment data is securely protected in transit."
    },
    {
      q: "What is the difference between SSL and TLS?",
      a: "SSL (Secure Sockets Layer) is actually the deprecated predecessor to TLS (Transport Layer Security). SSL versions 1.0, 2.0, and 3.0 have been found to contain severe cryptographic vulnerabilities (such as the POODLE attack) and are no longer used on the modern web. TLS 1.2 and TLS 1.3 are the current secure standards. However, because the term &quot;SSL&quot; became so universally recognized, the tech industry continues to use &quot;SSL Certificate&quot; as a colloquial catch-all term. Rest assured, Neviri enforces strict modern TLS 1.2 and TLS 1.3 protocols across all edge nodes."
    },
    {
      q: "Do you support Wildcard SSL Certificates?",
      a: "Yes. For complex architectures spanning multiple subdomains (e.g., api.yourdomain.com, app.yourdomain.com, staging.yourdomain.com), managing individual certificates becomes a logistical nightmare. Neviri fully supports automated Wildcard SSL certificates (*.yourdomain.com). Through secure DNS-01 challenge validation via our managed DNS infrastructure, we can issue and automatically renew wildcard certificates, instantly securing infinite subdomains under a single, unified cryptographic umbrella."
    },
    {
      q: "How does having an SSL certificate impact my website's Google SEO rankings?",
      a: "In 2014, Google officially announced that HTTPS is a lightweight ranking signal. Today, it is practically a mandatory baseline for SEO. Search engines heavily penalize websites still serving traffic over unencrypted HTTP, often flagging them with a glaring &quot;Not Secure&quot; warning in the browser address bar. This warning destroys user trust, drastically increasing bounce rates, which further damages your search ranking. By utilizing Neviri&apos;s automated SSL, you secure a ranking boost, protect user data, and guarantee the trusted padlock icon appears next to your URL."
    },
    {
      q: "What happens to 'Mixed Content' when migrating from HTTP to HTTPS?",
      a: "Mixed content occurs when an initial HTML page is loaded securely over HTTPS, but secondary resources (like images, CSS, or JavaScript files) are loaded over insecure HTTP. Modern browsers will block these insecure resources, breaking your website&apos;s layout or functionality. When you enable SSL on Neviri, we provide HTTP-to-HTTPS redirection at the edge layer. We also recommend utilizing HSTS (HTTP Strict Transport Security) headers to force clients to use secure connections, completely mitigating downgrade attacks and mixed content issues."
    },
    {
      q: "Is there any performance penalty for encrypting traffic?",
      a: "In the early days of the internet, cryptographic handshakes added noticeable latency. Today, the opposite is true. Modern TLS 1.3 drastically reduces the handshake overhead to a single round trip (1-RTT), and in some cases, zero round trips (0-RTT) for returning visitors. Furthermore, securing your site with SSL is a strict prerequisite for utilizing HTTP/2 and HTTP/3 multiplexing. By enabling Neviri&apos;s SSL certificates, you actually unlock these next-generation protocols, resulting in significantly faster page load times and reduced server strain."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden" style={gridBg}>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <header className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 text-center overflow-hidden">
        {/* Neviri Brand Colors: Sky Blue and Indigo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-sky-400/20 via-blue-500/10 to-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 text-sky-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_4px_20px_rgba(14,165,233,0.15)] transform transition-transform hover:scale-105">
            <Lock className="h-4 w-4" /> Automated HTTPS & Cryptography
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-8 leading-[1.1]">
            Unbreakable Encryption. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Zero Maintenance.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Secure your applications, protect your users&apos; data, and boost your search engine rankings instantly. Neviri&apos;s automated SSL infrastructure provisions, attaches, and perpetually renews enterprise-grade 256-bit certificates for all your domains without you ever lifting a finger.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="https://sng-central.neviri.com/signup" className="group relative bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl text-base font-bold transition-all w-full sm:w-auto overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Secure Your Domains
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="#how-it-works" className="bg-white hover:bg-sky-50 text-[#0F172A] border border-gray-200 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-sm w-full sm:w-auto hover:border-sky-200 hover:shadow-md">
              How Auto-Renewal Works
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 space-y-32 pb-32 relative z-10">

        {/* ── SEO CONTENT BLOCK 1: THE IMPORTANCE OF SSL ── */}
        <section id="how-it-works" className="scroll-mt-32">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-8">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">The Foundation of Digital Trust</h2>
                <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
                  <p>
                    In the modern digital economy, data privacy is not a luxury; it is a fundamental requirement. Whenever a user interacts with your application—whether they are submitting a login form, processing a credit card payment, or querying an API—that data must traverse a hostile public internet. 
                  </p>
                  <p>
                    Without an SSL (Secure Sockets Layer) certificate enabling a secure HTTPS connection, traffic is transmitted in plain text. This leaves your infrastructure completely vulnerable to Man-in-the-Middle (MitM) attacks, packet sniffing, and unauthorized data harvesting by malicious actors or compromised networks.
                  </p>
                  <p>
                    Neviri provides absolute cryptographic assurance. Our managed SSL infrastructure establishes a secure tunnel between your end-users and your cloud servers using advanced 256-bit AES encryption. This guarantees data integrity, ensuring that payloads cannot be modified in transit, and establishes indisputable server authenticity so your users know they are interacting with the legitimate application.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-3xl rounded-full" />
                
                {/* Simulated Certificate UI */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Lock className="h-5 w-5 text-sky-400" /> Connection is Secure
                    </h3>
                  </div>

                  <div className="space-y-4 font-mono text-sm">
                    <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Issued To</p>
                      <p className="text-sky-400 font-bold">api.your-production-app.com</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Protocol</p>
                        <p className="text-white">TLS 1.3</p>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Key Exchange</p>
                        <p className="text-white">X25519</p>
                      </div>
                    </div>

                    <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Auto-Renewal</p>
                        <p className="text-white flex items-center gap-2">
                          <RefreshCw className="h-3 w-3 text-sky-400" /> Active (Managed by Neviri)
                        </p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-sky-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-sky-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE FEATURES GRID ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">Enterprise Certificate Management</h2>
            <p className="text-lg text-slate-500 leading-relaxed">We have abstracted away all the pain points of cryptography. Forget manual CSR generation, validation emails, and catastrophic expiration outages.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: RefreshCw, title: "Perpetual Auto-Renewal", desc: "Never experience a downtime event due to an expired certificate again. Neviri's ACME client proactively renews all attached domain certificates 30 days prior to their expiration date." },
              { icon: Globe, title: "Wildcard Support", desc: "Securing microservices? Our platform fully supports wildcard certificates (*.yourdomain.com) via DNS-01 validation, allowing you to encrypt an unlimited number of subdomains instantly." },
              { icon: Zap, title: "Instant Provisioning", desc: "The moment you attach a custom domain to your load balancer or app deployment, Neviri intercepts the request, passes the HTTP-01 challenge, and provisions a live certificate in under 10 seconds." },
              { icon: Search, title: "SEO Ranking Boost", desc: "Search engines like Google actively penalize unencrypted HTTP sites. Enforcing HTTPS across your entire architecture provides a permanent, algorithmic boost to your SEO performance." },
              { icon: Key, title: "BYOC (Bring Your Own Cert)", desc: "If you have specific organizational requirements, such as Extended Validation (EV) or Organization Validated (OV) certificates, you can easily upload and manage your custom certificates in our vault." },
              { icon: Server, title: "Edge Termination", desc: "We handle the heavy lifting of cryptographic encryption and decryption at our global edge load balancers, freeing up your underlying Virtual Machine CPU resources to serve your application logic." }
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

        {/* ── SEO CONTENT BLOCK 2: AUTOMATION PIPELINE ── */}
        <section>
           <div className="bg-[#0A0F1C] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative border border-slate-800">
             <div className="absolute bottom-0 right-0 -mr-32 -mb-32 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
             <div className="absolute top-0 left-0 -ml-32 -mt-32 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]"></div>
             
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="bg-slate-800/80 backdrop-blur-xl rounded-[2rem] border border-slate-700/50 p-8 shadow-2xl">
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-sky-400" /> Automated Pipeline
                    </h3>
                    
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-800 group-[.is-active]:bg-sky-500 group-[.is-active]:border-sky-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          1
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/80 p-4 rounded-xl border border-slate-700 shadow">
                          <h4 className="font-bold text-white text-sm mb-1">Domain Bind</h4>
                          <p className="text-xs text-slate-400">DNS routed to Neviri Load Balancer.</p>
                        </div>
                      </div>
                      
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-800 group-[.is-active]:bg-sky-500 group-[.is-active]:border-sky-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          2
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/80 p-4 rounded-xl border border-slate-700 shadow">
                          <h4 className="font-bold text-white text-sm mb-1">ACME Challenge</h4>
                          <p className="text-xs text-slate-400">HTTP-01 validation completes.</p>
                        </div>
                      </div>

                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-800 group-[.is-active]:bg-sky-500 group-[.is-active]:border-sky-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          3
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/80 p-4 rounded-xl border border-slate-700 shadow">
                          <h4 className="font-bold text-sky-400 text-sm mb-1">Active Encryption</h4>
                          <p className="text-xs text-slate-400">Traffic secured via TLS 1.3.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <CheckCircle2 className="h-4 w-4" /> Seamless Infrastructure
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">Complex Cryptography, Simplified.</h2>
                  <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
                    <p>
                      Traditionally, managing SSL/TLS certificates was a high-risk operational chore. Engineering teams had to generate cryptographic private keys, submit certificate signing requests (CSRs), validate ownership via complex DNS text records, and painstakingly edit Nginx or Apache configuration files. 
                    </p>
                    <p>
                      A single missed calendar reminder would result in a catastrophic, highly visible outage, displaying a massive &quot;Your connection is not private&quot; error to every single customer.
                    </p>
                    <p>
                      Neviri&apos;s architecture completely eradicates this risk. Our ingress controllers and load balancers are deeply integrated with global Certificate Authorities. When traffic hits our edge, we dynamically provision, terminate, and inject secure headers (like HSTS). You get to focus entirely on writing application code, while we ensure your network transmission layer remains perfectly impenetrable.
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
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Deep Dive: SSL & TLS FAQ</h2>
              <p className="text-lg text-slate-500">Comprehensive answers regarding encryption protocols, automated renewals, compliance, and cloud security best practices.</p>
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
              <p className="text-slate-500 mb-6">Ready to secure your traffic and boost user trust?</p>
              <Link href="https://sng-central.neviri.com/signup" className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md">
                Enable Automated SSL <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
