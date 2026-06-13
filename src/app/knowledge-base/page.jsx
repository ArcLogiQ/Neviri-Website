import React from "react";
import Link from "next/link";
import {
    BookOpen,
    ChevronRight,
    Cpu,
    Network,
    Search,
    ArrowRight
} from "lucide-react";
import Navbar from "@/components/common/Navbar";

const Knowledgebase = () => {
    // Categories data based on the screenshot structure
    const categories = [
        {
            name: "Compute",
            count: 1,
            icon: Cpu,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50",
            topics: [
                {
                    title: "How to create a Virtual Machine",
                    description: "Step-by-step guide to provisioning and configuring your first VM instance.",
                    slug: "create-virtual-machine"
                }
            ]
        },
        {
            name: "Networking",
            count: 3,
            icon: Network,
            color: "from-emerald-500 to-teal-500",
            bgColor: "bg-emerald-50",
            topics: [
                {
                    title: "How to create a Virtual Private Network",
                    description: "Set up secure VPN connections for your cloud infrastructure.",
                    slug: "create-virtual-private-network"
                },
                {
                    title: "How to Assign a public IP to a Virtual Machine",
                    description: "Configure and attach public IP addresses to your VM instances.",
                    slug: "assign-public-ip-to-vm"
                },
                {
                    title: "How to create a Router",
                    description: "Set up and configure a router to manage traffic across your networks.",
                    slug: "how-to-create-a-router"
                }
            ]
        }
    ];

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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 mb-6">
                            <BookOpen className="h-4 w-4 text-sky-600" />
                            <span className="text-sm font-semibold text-slate-600">Knowledge Base</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] mb-6 tracking-tight">
                            Knowledge Base & Guides
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                            From getting started guides to advanced configurations – find everything you need to deploy and manage your cloud infrastructure.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mt-10">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search documentation..."
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all font-medium shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Categories Grid */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                return (
                                    <div
                                        key={category.name}
                                        className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                    >
                                        {/* Category Header */}
                                        <div className={`px-6 py-5 ${category.bgColor} border-b border-slate-100`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-sm`}>
                                                        <Icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-xl font-bold text-[#0F172A]">{category.name}</h2>
                                                        <p className="text-sm text-slate-500 font-medium">{category.count} articles</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>

                                        {/* Topics List */}
                                        <div className="divide-y divide-slate-100">
                                            {category.topics.map((topic) => (
                                                <Link
                                                    key={topic.slug}
                                                    href={`/knowledge-base/${topic.slug}`}
                                                    className="block px-6 py-4 hover:bg-slate-50 transition-colors group/topic"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-[#0F172A] group-hover/topic:text-sky-600 transition-colors mb-1">
                                                                {topic.title}
                                                            </h3>
                                                            <p className="text-sm text-slate-500 line-clamp-1">
                                                                {topic.description}
                                                            </p>
                                                        </div>
                                                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover/topic:text-sky-500 group-hover/topic:translate-x-1 transition-all ml-4 flex-shrink-0 mt-1" />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Knowledgebase;