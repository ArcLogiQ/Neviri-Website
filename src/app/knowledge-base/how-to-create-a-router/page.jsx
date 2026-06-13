"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Network, Clock, User, Calendar, BookOpen } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const CreateRouterPage = () => {
    return (
        <div className="min-h-screen bg-white text-[#0F172A] font-sans antialiased selection:bg-sky-600/30 selection:text-black">
            {/* Subtle Background Grid */}
            <div
                className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }}
            />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Link
                            href="/knowledge-base"
                            className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-600 font-medium transition-colors group"
                        >
                            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                            Back to Knowledge Base
                        </Link>
                    </div>

                    {/* Article Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-sm">
                                <Network className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Networking Guide</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight leading-tight">
                            How to create a Router
                        </h1>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            Step-by-step guide to creating a router and providing outbound internet access for your private virtual machines on Neviri Cloud.
                        </p>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-slate max-w-none">
                        {/* Introductory Note */}
                        <div className="mb-12 bg-slate-50 border-l-4 border-sky-600 p-4 rounded-r-xl">
                            <p className="text-slate-600 leading-relaxed text-sm">
                                When you create a Network in the Network Manager, it assigns a private CIDR block (such as 10.0.0.0/24). Because these IP addresses are private, the outside world cannot directly see or communicate with your virtual machines.
                            </p>
                        </div>

                        {/* Step 1 */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-lg">
                                        1
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Navigate to Network Management</h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        Log in to your Neviri Dashboard and go to Network Management.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowToCreateARouter/RouterDashboard.png"
                                            alt="Network Management Dashboard"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Network+Management+Dashboard";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Network Management interface
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg">
                                        2
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Click on Create Router</h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        In the Network Management interface, locate and click the Create Router button.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowToCreateARouter/CreateRouter.png"
                                            alt="Create Router Button"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Create+Router+Button";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Click Create Router to begin
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg">
                                        3
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Enter Router Details</h2>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        Fill in the required information for your router:
                                    </p>
                                    <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-1">
                                        <li><strong className="text-[#0F172A]">Router Name:</strong> Choose a descriptive, unique name.</li>
                                        <li><strong className="text-[#0F172A]">Description:</strong> (Optional) Add a brief note about the router's purpose.</li>
                                        <li><strong className="text-[#0F172A]">CIDR:</strong> Enter the CIDR block that matches your existing private network (e.g., 10.0.0.0/24).</li>
                                    </ul>
                                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
                                        <p className="text-amber-700 leading-relaxed text-sm font-medium">
                                            ⚠️ Note: The router will use this CIDR to interface with your private network and provide outbound internet access via a Public IP assigned to the router's external gateway.
                                        </p>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">
                                        Once the router is created:
                                    </p>
                                    <ul className="list-disc pl-6 mt-2 text-slate-600 space-y-1">
                                        <li>Attach it to your Private Network (via the "Interfaces" tab).</li>
                                        <li>Assign a Public IP to the router's external gateway.</li>
                                        <li>Your private VMs can now access the internet through the router's public IP using Source NAT (SNAT).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Article Footer */}
                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <div className="flex flex-wrap items-center justify-end gap-4">
                            <Link
                                href="/knowledge-base"
                                className="text-sm text-slate-400 hover:text-sky-600 font-medium transition-colors flex items-center gap-1"
                            >
                                <ChevronLeft className="h-3 w-3" />
                                Back to Knowledge Base
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRouterPage;