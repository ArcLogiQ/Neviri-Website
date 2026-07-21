"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Database } from "lucide-react";
import Navbar from "@/components/common/Navbar";

// Step text is reproduced verbatim from the source doc. Screenshots live in
// /public/images/Knowledgebase/HowToCreateDB and attach to the steps below.
const IMG_BASE = "/images/Knowledgebase/HowToCreateDB";
const STEPS = [
    { text: "Login on neviri.com" },
    { text: "Go to dashboard" },
    {
        text: "Click on the Create Database button.",
        image: "database_listpage.png",
        alt: "Database list page",
    },
    {
        text: "Select your database and click on the continue button.",
        image: "dbengines.png",
        alt: "Database engine selection",
    },
    {
        text: "Fill required entries.",
        image: "dbconfigure.png",
        alt: "Database configuration",
    },
    {
        text: "Add username and password to your database.",
        image: "dbcred.png",
        alt: "Database credentials",
    },
    {
        text: "Review your entries and click on the continue button.",
        image: "dbreview.png",
        alt: "Review database entries",
    },
    {
        text: "After clicking on the create button your database creation will start after creation it will show in the database dashboard section with running status.",
        image: "dbcreated.png",
        alt: "Database created with running status",
    },
];

const CreateDatabasePage = () => {
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
                            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
                                <Database className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Databases Guide</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight leading-tight">
                            How to create a Database
                        </h1>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            Step-by-step guide to creating a database on Neviri Cloud.
                        </p>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-slate max-w-none">
                        {STEPS.map((step, index) => (
                            <div key={index} className="mb-12">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${
                                                index === 0
                                                    ? "bg-sky-600 text-white"
                                                    : "bg-slate-200 text-slate-600"
                                            }`}
                                        >
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-600 leading-relaxed">{step.text}</p>
                                        {step.image && (
                                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm mt-6">
                                                <img
                                                    src={`${IMG_BASE}/${step.image}`}
                                                    alt={step.alt}
                                                    className="w-full h-auto"
                                                    onError={(e) => {
                                                        e.target.src = `https://placehold.co/800x400/e2e8f0/64748b?text=${encodeURIComponent(step.alt)}`;
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
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

export default CreateDatabasePage;
