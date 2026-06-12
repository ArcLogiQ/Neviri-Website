"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Network, Clock, User, Calendar, BookOpen, Shield } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const CreatePrivateNetworkPage = () => {
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
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-sm">
                                <Network className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Networking Guide</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight leading-tight">
                            How to create a Virtual Private Network
                        </h1>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            Step-by-step guide to creating and configuring isolated private networks for your cloud resources on Neviri Cloud.
                        </p>

                        {/* Article Meta */}
                        <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400">Written by</p>
                                    <p className="text-sm font-semibold text-[#0F172A]">Neviri Cloud Team</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <div>
                                    <p className="text-xs font-semibold text-slate-400">Last updated</p>
                                    <p className="text-sm font-semibold text-[#0F172A]">December 15, 2024</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-slate-400" />
                                <div>
                                    <p className="text-xs font-semibold text-slate-400">Reading time</p>
                                    <p className="text-sm font-semibold text-[#0F172A]">4 min read</p>
                                </div>
                            </div>
                        </div>
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Login to the Neviri Dashboard and go to Network Manager</h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        Log in using your credentials. From the main dashboard, locate and click on the "Network Manager" section
                                        to access the networking interface where you can create and manage all your private networks.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowtocreatePrivateNetwork/NetworkManager.png"
                                            alt="Network Manager Dashboard"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Network+Manager+Dashboard";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Network Manager interface - where all your private networks are managed
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                                        Click 'Create Network'
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        In the Network Manager interface, click the "Create Network" button to begin the private network creation process.
                                        You'll be presented with a form where you can configure your network settings.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowtocreatePrivateNetwork/CreateNetwork.png"
                                            alt="Create Network Button"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Create+Network+Button";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Click the "Create Network" button to start configuring your private network
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Configure Network Details</h2>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        Fill in the network configuration form with the following details:
                                    </p>
                                    <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
                                        <li>
                                            <strong className="text-[#0F172A]">Network Name</strong> – Give your private network a descriptive name
                                            that helps you identify it later (e.g., "Production-VPC", "Development-Network").
                                        </li>
                                        <li>
                                            <strong className="text-[#0F172A]">Description (Optional)</strong> – Add a meaningful description to provide
                                            context about the network's purpose or environment.
                                        </li>
                                        <li>
                                            <strong className="text-[#0F172A]">CIDR Block</strong> – Define the IP address range for your private network.
                                            This must be a unique CIDR block not used by any other private network in your account.
                                            <div className="mt-2 p-3 bg-slate-100 rounded-lg">
                                                <p className="text-sm font-mono text-slate-700">Example: 10.0.0.0/16, 172.16.0.0/12, or 192.168.0.0/16</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm mt-4">
                                        <img
                                            src="/images/Knowledgebase/HowtocreatePrivateNetwork/CreateNetwork.png"
                                            alt="Network Configuration Form"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Network+Configuration+Form";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Configure name, description, and unique CIDR block for your private network
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Review and Create Your Private Network</h2>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        Before finalizing, review all the configuration details:
                                    </p>
                                    <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-1">
                                        <li>Ensure the network name is clear and descriptive</li>
                                        <li>Verify that the CIDR block doesn't overlap with any existing networks</li>
                                        <li>Confirm the description accurately reflects the network's purpose</li>
                                    </ul>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        Once you're satisfied with the configuration, click the "Create Network" button to provision your private network.
                                        The network will be ready for use within seconds. You can now launch virtual machines and other resources
                                        into this isolated network environment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Article Footer */}
                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span>Tags:</span>
                                <span className="px-2 py-1 bg-slate-100 rounded-full">Networking</span>
                                <span className="px-2 py-1 bg-slate-100 rounded-full">VPC</span>
                                <span className="px-2 py-1 bg-slate-100 rounded-full">Private Network</span>
                            </div>
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

export default CreatePrivateNetworkPage;