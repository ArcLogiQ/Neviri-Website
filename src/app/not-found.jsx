import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const NotFound = () => {
  return (
    <div
      className="min-h-screen bg-white relative overflow-hidden font-sans antialiased selection:bg-sky-600/30 selection:text-black flex flex-col"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(226, 232, 240, 0.8) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(226, 232, 240, 0.8) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        backgroundPosition: "center center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(255,255,255,0.9)_100%)] z-0"></div>

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-sky-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full text-center bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] border border-[#E2E8F0] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-sky-50 rounded-full mb-8 border border-[#E2E8F0] shadow-sm">
            <AlertTriangle className="h-12 w-12 text-[#3B82F6]" />
          </div>

          <h1 className="text-6xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            Page Not Found
          </h2>

          <p className="text-[#64748B] font-medium mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold rounded-xl text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
