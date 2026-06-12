"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Globe, Network } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const AssignPublicIpPage = () => {
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
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">
                                <Globe className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Networking Guide</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight leading-tight">
                            How to Assign a public IP to a Virtual Machine
                        </h1>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            Step-by-step guide to configuring public IP access for your virtual machine on Neviri Cloud.
                        </p>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-slate max-w-none">
                        {/* Step 1 */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-lg">
                                        1
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                                        Log in to your Neviri dashboard and navigate to Network management → Routers
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        Access your Neviri Cloud dashboard and go to Network management, then select Routers from the menu.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/AssignPublicIPToVM/Routers.png"
                                            alt="Routers Management"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Routers+Management";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Navigate to Routers in Network management
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
                                        Click the "Create Router" button to begin the router creation process.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/AssignPublicIPToVM/CreateRouter.png"
                                            alt="Create Router Button"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Create+Router+Button";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Click Create Router to start
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                                        Name your Router and select External Gateway
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        Give your router a descriptive name and make sure to select "External Gateway" to enable
                                        public internet access for your virtual machines.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg">
                                        4
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Click on Create Router</h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        Confirm your settings and click the "Create Router" button to create the router.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg">
                                        5
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                                        Now you need to attach your Private network to that router
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        Select the router you just created, click on "Attach", and select your private network from
                                        the dropdown menu.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/AssignPublicIPToVM/AttachRouterToNetwork.png"
                                            alt="Attach Router to Network"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Attach+Router+to+Network";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Attach your private network to the router
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 6 */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg">
                                        6
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Click on Attached</h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        Click "Attached" to confirm. Now your private network has been attached to the router.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 7 */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg">
                                        7
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                                        Your network will now also be shown while creating a Virtual Machine in the network dropdown menu
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        Once attached, your private network will appear in the network dropdown menu when creating
                                        new virtual machines, allowing them to access the public internet through the router.
                                    </p>
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

export default AssignPublicIpPage;