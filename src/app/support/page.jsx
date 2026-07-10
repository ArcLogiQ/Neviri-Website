"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  Mail,
  Server,
  ShieldCheck,
  Database,
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import { EMAIL_ENDPOINT } from "@/config/api";
import Head from "next/head";

const Support = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "infrastructure",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(EMAIL_ENDPOINT.SEND_EMAIL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Support request submitted successfully!");

        setTimeout(() => {
          router.push("/thank-you");
        }, 1000);
      } else {
        toast.error(data.detail || data.message || "Failed to submit. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Support form error:", error);
      toast.error("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          24/7 Cloud Infrastructure Support & DevOps Assistance | Neviri
        </title>
        <meta
          name="description"
          content="Get expert 24/7 support for your enterprise cloud infrastructure. Connect with Neviri DevOps engineers for managed database troubleshooting, Kubernetes scaling, and PCI DSS compliance."
        />
        <meta
          name="keywords"
          content="cloud infrastructure support, DevOps assistance, managed database support, MongoDB hosting support, PostgreSQL optimization, PCI DSS compliant cloud, AWS cost optimization, secure VPC networking, 24/7 cloud architects"
        />
        <meta name="author" content="Neviri Cloud" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-white text-[#0F172A] relative overflow-hidden font-sans antialiased selection:bg-sky-600/30 selection:text-black">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0F172A",
              color: "#FFFFFF",
              border: "1px solid #3B82F6",
            },
            success: {
              iconTheme: { primary: "#3B82F6", secondary: "#0F172A" },
            },
          }}
        />

        <div className="relative z-10">
          <Navbar />

          {/* Header Section */}
          <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
            <div className="max-w-4xl mx-auto text-center">
              {/* Dark Tag */}
              <div className="inline-flex items-center px-4 py-1.5 bg-[#0F172A] border border-[#0F172A] rounded-full text-[#3B82F6] text-[10px] font-black tracking-[0.2em] uppercase mb-10 shadow-sm shadow-[#3B82F6]/20">
                <span className="flex h-1.5 w-1.5 rounded-full bg-sky-600 mr-2.5 animate-pulse"></span>
                24/7 Expert Assistance
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#0F172A] mb-6 tracking-[-0.04em] leading-[1.1]">
                Enterprise Cloud Support <br className="hidden md:block" />
                <span className="relative inline-block mt-3">
                  <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-4 py-1.5 inline-block text-white shadow-sm transform -rotate-1">
                    Built for Developers.
                  </span>
                </span>
              </h1>

              <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium mt-8">
                Connect directly with experienced cloud architects and DevOps
                engineers for immediate assistance with your deployments,
                managed databases, and compliance-ready infrastructure.
              </p>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
              {/* Email Support */}
              <div className="bg-white p-8 lg:p-10 rounded-[2rem] border border-slate-200 hover:border-[#3B82F6] hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-all duration-300 group flex flex-col hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mb-8 group-hover:border-[#0F172A] group-hover:bg-[#0F172A] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 group-hover:scale-110">
                  <Mail className="h-6 w-6 text-[#0F172A] group-hover:text-[#3B82F6] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">
                  Cloud Engineering Support
                </h3>
                <p className="text-slate-500 mb-8 font-medium leading-relaxed flex-grow">
                  Submit tickets for infrastructure planning, database
                  migrations, or AWS cost optimization. We respond within 24
                  hours.
                </p>
                <a
                  href="mailto:support@neviri.com"
                  className="text-[#0F172A] font-bold hover:text-[#3B82F6] group-hover:underline decoration-2 underline-offset-4 transition-all"
                >
                  support@neviri.com
                </a>
              </div>

              {/* Enterprise Support */}
              <div className="bg-white p-8 lg:p-10 rounded-[2rem] border border-slate-200 hover:border-[#3B82F6] hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-all duration-300 group flex flex-col hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mb-8 group-hover:border-[#0F172A] group-hover:bg-[#0F172A] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 group-hover:scale-110">
                  <Mail className="h-6 w-6 text-[#0F172A] group-hover:text-[#3B82F6] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">
                  Enterprise Architecture
                </h3>
                <p className="text-slate-500 mb-8 font-medium leading-relaxed flex-grow">
                  Enterprise SLA customers get priority email access to our
                  senior cloud security architects and database administrators.
                </p>
                <a
                  href="mailto:support@neviri.com"
                  className="text-[#0F172A] font-bold hover:text-[#3B82F6] group-hover:underline decoration-2 underline-offset-4 transition-all"
                >
                  support@neviri.com
                </a>
              </div>
            </div>

            {/* Contact Form & FAQ Section Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Form Side */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 lg:p-12 shadow-sm">
                  <h2 className="text-3xl font-bold text-[#0F172A] mb-8 tracking-tight">
                    Open a Support Ticket
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-2 uppercase tracking-widest">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[#0F172A] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all font-medium"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-2 uppercase tracking-widest">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[#0F172A] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all font-medium"
                          placeholder="you@yourcompany.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-2 uppercase tracking-widest">
                        Issue Category
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[#0F172A] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all font-medium cursor-pointer appearance-none"
                      >
                        <option value="infrastructure">
                          Compute & Kubernetes Scaling
                        </option>
                        <option value="database">
                          Managed Database (MongoDB/SQL)
                        </option>
                        <option value="security">
                          VPC, Security & PCI DSS Compliance
                        </option>
                        <option value="billing">
                          Cloud Cost Optimization & Billing
                        </option>
                        <option value="migration">
                          Architecture & Migration Planning
                        </option>
                        <option value="other">General Technical Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-2 uppercase tracking-widest">
                        System Details & Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[#0F172A] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all font-medium resize-none"
                        placeholder="Describe your issue — include the affected resource (VM, database, or load balancer name), its region, and any error messages or logs so our team can help faster."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all duration-300 shadow-lg disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2 mt-4"
                    >
                      {loading ? "Transmitting..." : "Submit Support Request"}
                    </button>
                  </form>
                </div>
              </div>

              {/* FACTUAL FAQ Side */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-4 tracking-tight">
                  Infrastructure FAQs
                </h2>
                <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                  Technical specifications and operational guidelines for Neviri
                  Cloud deployments.
                </p>

                <div className="space-y-4">
                  {/* FAQ 1: Database Support */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#3B82F6] hover:shadow-[0_10px_20px_rgba(59,130,246,0.1)] transition-all duration-300 group cursor-default hover:-translate-y-1">
                    <h3 className="text-lg font-bold text-[#0F172A] mb-3 flex items-center gap-3 tracking-tight">
                      <Database className="w-5 h-5 text-slate-400 group-hover:text-[#3B82F6] transition-colors" />
                      What databases does Neviri support?
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm">
                      We offer total database freedom. You can run MongoDB,
                      MySQL, or PostgreSQL on one unified platform. We handle
                      the management and manual configuration so your team can
                      deploy in minutes, not days.
                    </p>
                  </div>

                  {/* FAQ 2: Pricing */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#3B82F6] hover:shadow-[0_10px_20px_rgba(59,130,246,0.1)] transition-all duration-300 group cursor-default hover:-translate-y-1">
                    <h3 className="text-lg font-bold text-[#0F172A] mb-3 flex items-center gap-3 tracking-tight">
                      <Server className="w-5 h-5 text-slate-400 group-hover:text-[#3B82F6] transition-colors" />
                      How does the predictable pricing work?
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm">
                      We designed our billing to eliminate shock cloud bills.
                      You pay strictly for the resources you use with a simple,
                      transparent pricing model that helps your team scale
                      efficiently.
                    </p>
                  </div>

                  {/* FAQ 3: Security */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#3B82F6] hover:shadow-[0_10px_20px_rgba(59,130,246,0.1)] transition-all duration-300 group cursor-default hover:-translate-y-1">
                    <h3 className="text-lg font-bold text-[#0F172A] mb-3 flex items-center gap-3 tracking-tight">
                      <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-[#3B82F6] transition-colors" />
                      What security features are included by default?
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm">
                      We include enterprise-grade security right out of the box
                      to keep your workloads locked down. This includes private
                      VPC networking, default encryption, and compliance-ready
                      infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
