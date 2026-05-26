import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <Navbar />
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 h-[calc(100vh-64px)]">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-8 border border-[#DDE3EA] shadow-md shadow-black/20">
            <AlertTriangle className="h-12 w-12 text-purple-600" />
          </div>

          <h1 className="text-6xl font-bold text-[#1A1F2C] mb-4 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-[#4B5565] mb-4">
            Page Not Found
          </h2>

          <p className="text-[#9AA5B8] mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:purple-700 transition-all duration-200 shadow-lg shadow-[#2563EB]/20 w-full sm:w-auto"
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
