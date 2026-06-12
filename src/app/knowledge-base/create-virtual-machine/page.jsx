"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Cpu, Clock, User, Calendar, BookOpen } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const CreateVirtualMachinePage = () => {
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
                                <Cpu className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Compute Guide</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight leading-tight">
                            How to create a Virtual Machine
                        </h1>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            Step-by-step guide to provisioning and configuring your first virtual machine on Neviri Cloud.
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Login to the Neviri Dashboard</h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        Navigate to{" "}
                                        <a href="https://cloud.neviri.com" className="text-sky-600 font-semibold hover:underline">
                                            cloud.neviri.com
                                        </a>{" "}
                                        and log in using your email address and password. If you have two-factor authentication enabled,
                                        you'll need to complete that step as well.
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
                                        Click on 'Virtual Machines' in the main dashboard
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        From the main dashboard, locate and click the "Virtual Machines" option to access the VM
                                        management interface. This will take you to the page where you can view, create, and manage
                                        all your virtual machine instances.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowToCreateVM/VirtualMachinePage.png"
                                            alt="Virtual Machines Dashboard"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Virtual+Machines+Dashboard";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Virtual Machines management interface
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
                                        Select "Create your First VM" and add your payment details
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        Click the "Create your First VM" button to begin the VM creation process. If you haven't
                                        added a payment method yet, you'll be prompted to enter your billing information. Neviri Cloud
                                        uses secure payment processing, and you'll only be charged for the resources you actually use.
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                                        Set the name of your VM and its quantity
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        Give your virtual machine a descriptive name that helps you identify it later. You can also
                                        specify the quantity of identical VMs you want to create at once. This is useful when you need
                                        multiple instances with the same configuration.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowToCreateVM/VMnameAndQuantity.png"
                                            alt="VM Name and Quantity Configuration"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=VM+Name+and+Quantity";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Configure VM name and quantity
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Select an Instance Type</h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        In the Instance section, select the appropriate instance type from the dropdown menu for your
                                        Virtual Machine. The instance type determines the CPU, memory, and other hardware specifications
                                        of your VM. Choose based on your workload requirements:
                                    </p>
                                    <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-1">
                                        <li><strong className="text-[#0F172A]">General Purpose</strong> – Balanced CPU and memory for most workloads</li>
                                        <li><strong className="text-[#0F172A]">CPU Optimized</strong> – High-performance computing and batch processing</li>
                                        <li><strong className="text-[#0F172A]">Memory Optimized</strong> – Large databases and in-memory caches</li>
                                    </ul>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowToCreateVM/InstanceType.png"
                                            alt="Instance Type Selection"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Instance+Type+Selection";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Select instance type from dropdown menu
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Select the OS Image</h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        Select the base OS image for your virtual machine from the list of available images. Click to
                                        select the operating system that fits your needs. Neviri Cloud offers a wide range of
                                        operating systems including:
                                    </p>
                                    <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-1">
                                        <li><strong className="text-[#0F172A]">Ubuntu</strong> – Popular Linux distribution for general purpose</li>
                                        <li><strong className="text-[#0F172A]">Debian</strong> – Stable and secure Linux distribution</li>
                                        <li><strong className="text-[#0F172A]">CentOS/Rocky Linux</strong> – Enterprise Linux distributions</li>
                                        <li><strong className="text-[#0F172A]">Windows Server</strong> – For Windows-based applications</li>
                                    </ul>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowToCreateVM/OSImage.png"
                                            alt="OS Image Selection"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Operating+System+Selection";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Choose your preferred operating system
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
                                    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Select the Network Type</h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        The network determines which virtual network your VM will be connected to. Your VM joins a
                                        private network with internet access. For public inbound access, you can add a floating IP
                                        from the Networking tab after the VM is created.
                                    </p>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img
                                            src="/images/Knowledgebase/HowToCreateVM/Network.png"
                                            alt="Network Type Selection"
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Network+Configuration";
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-2 text-center">
                                        Select the appropriate network for your VM
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

export default CreateVirtualMachinePage;