"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Network, Router, Plug, Wifi, ExternalLink, Shield } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const AttachPrivateNetworkToRouterPage = () => {
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
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-sm">
                                <Network className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Networking Guide</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight leading-tight">
                            How to Attach a Private Network to a Router in Neviri
                        </h1>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            Step-by-step guide to connecting your private network to a router for outbound internet access and cross-subnet routing.
                        </p>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-slate max-w-none">
                        {/* Why you need to do this */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-lg">
                                        !
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Why you need to do this</h2>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        In Neviri, a private (tenant) network is isolated by design — the virtual machines on it can talk to each other,
                                        but they have no path to the outside world or to other networks. A router is what provides that path.
                                    </p>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        When you attach a private network to a router, you give its VMs:
                                    </p>
                                    <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-1">
                                        <li><strong className="text-[#0F172A]">Outbound internet access</strong> – Through the router's external gateway and SNAT</li>
                                        <li><strong className="text-[#0F172A]">A route to other subnets</strong> – Also connected to the same router</li>
                                        <li><strong className="text-[#0F172A]">A target for floating IPs</strong> – So external traffic can reach a VM</li>
                                    </ul>
                                    <p className="text-slate-600 leading-relaxed">
                                        Without this attachment, a private subnet stays walled off. Attaching it is the step that turns an isolated network
                                        into a usable, reachable one.
                                    </p>
                                    <div className="mt-4 p-4 bg-sky-50 rounded-xl border border-sky-100">
                                        <p className="text-sm text-sky-700 flex items-start gap-2">
                                            <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                            <span><strong className="font-semibold">Note:</strong> In Neviri you attach a network to a router by attaching one of its subnets. The subnet is the actual interface the router routes for.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Before you start */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">
                                        ✓
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Before you start</h2>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        Make sure you already have:
                                    </p>
                                    <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-1">
                                        <li>A <strong className="text-[#0F172A]">private network with at least one subnet</strong> – Created under the Networks tab</li>
                                        <li>A <strong className="text-[#0F172A]">router</strong> – Ideally one with an external gateway set, if you want internet access (created under the Routers tab)</li>
                                    </ul>
                                </div>
                            </div>
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Open Network Management</h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        From the dashboard, go to <strong className="font-semibold text-[#0F172A]">Network → Network Management</strong>.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm mt-6">
                                        <img
                                            src="/images/Knowledgebase/HowToAttachPrivateNetworkToRouter/RouterDashboard.png"
                                            alt="Network Management Dashboard"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Network+Management+Dashboard";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Navigate to Network Management from the dashboard
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Switch to the Routers tab</h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        At the top of the page, click the <strong className="font-semibold text-[#0F172A]">Routers</strong> tab.
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Open your router</h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        Click the router's row (or the eye / View details icon) to open the <strong className="font-semibold text-[#0F172A]">Router Detail</strong> panel.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowToAttachPrivateNetworkToRouter/RouterPanel.png"
                                            alt="Router Detail Panel"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Router+Detail+Panel";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Click to open the Router Detail panel
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Start an attach</h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        In the <strong className="font-semibold text-[#0F172A]">Attach Subnet Interface</strong> section, click the <strong className="font-semibold text-[#0F172A]">Attach</strong> button.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowToAttachPrivateNetworkToRouter/AttachSubnet.png"
                                            alt="Attach Subnet Button"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Attach+Subnet+Button";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Click the Attach button to begin
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Pick the subnet</h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        From the <strong className="font-semibold text-[#0F172A]">Subnet</strong> dropdown, choose the subnet of the private network you want to connect.
                                        Each entry shows the subnet name and its CIDR (e.g. <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">internal-net — 10.0.0.0/24</code>).
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowToAttachPrivateNetworkToRouter/SubnetDropdown.png"
                                            alt="Subnet Dropdown Selection"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Subnet+Dropdown";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Select the subnet you want to attach
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Confirm</h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        Click <strong className="font-semibold text-[#0F172A]">Attach</strong>. Neviri creates the router interface and the new entry appears under
                                        <strong className="font-semibold text-[#0F172A]"> Attached Interfaces</strong>.
                                    </p>
                                    <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                        <p className="text-sm text-emerald-700 flex items-start gap-2">
                                            <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>That's it — the subnet's VMs can now route through this router.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Verifying it worked */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                                        ✓
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Verifying it worked</h2>
                                    <ul className="list-disc pl-6 text-slate-600 space-y-2">
                                        <li>The subnet now shows up in the router's <strong className="font-semibold text-[#0F172A]">Attached Interfaces</strong> list.</li>
                                        <li>It is no longer offered in the Attach dropdown (already-attached subnets are filtered out).</li>
                                        <li>VMs on that subnet can reach external networks, and you can now associate floating IPs to them.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Detaching later */}
                        <div className="mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg">
                                        ⚡
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Detaching later</h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        If you need to remove the connection, open the same router, find the subnet under
                                        <strong className="font-semibold text-[#0F172A]"> Attached Interfaces</strong>, and click the <strong className="font-semibold text-[#0F172A]">Unlink</strong> icon.
                                        The subnet's VMs will lose routing through that router, but you can re-attach it any time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Article Footer */}
                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Router className="h-4 w-4" />
                                <span>Networking • Router Configuration</span>
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

export default AttachPrivateNetworkToRouterPage;