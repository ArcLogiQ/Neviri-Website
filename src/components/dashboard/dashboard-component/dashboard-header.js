"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  MinusCircle,
  PlusCircle,
  CreditCard,
  Database,
} from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useProcessing } from "@/context/ProcessingContext";
import Breadcrumb from "@/components/common/Breadcrumb";

import api from "../../../api/axios";

export default function DashboardHeader({
  onOpenMongo,
  onOpenMySQL,
  onOpenPostgres,
  selectedType,
  actionButton,
}) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const pathname = usePathname();
  const { stopProcessing } = useProcessing();
  // console.log("path", pathname);
  // console.log("selectedType in header", selectedType);
  const databaseTypes = ["MongoDB", "MySQL"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async (e) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.LOGOUT,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.status) {
        // Stop processing bar before logout
        stopProcessing();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="border-b border-[#DDE3EA] bg-white relative z-20">
      {/* Old swirly signup1.jpeg overlay + blur circles removed — the
          shared dashboard layout now uses a clean grid background, so
          the header should stay solid white for crisp contrast. */}

      <div className="h-16 flex items-center justify-between px-4 md:px-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold text-[#1A1F2C]">
            <Breadcrumb />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {pathname === "/dashboard" && (
            <div className="relative" ref={dropdownRef}>
              {selectedType === null && (
                <>
                  <button
                    className="hidden md:flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all duration-200 hover:shadow-lg transform cursor-pointer gap-2 font-semibold shadow-sm hover:bg-sky-700"
                    onClick={() => setDropdownOpen((open) => !open)}
                  >
                    <Database className="h-4 w-4" />
                    Create Database
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full right-0 z-[9999] mt-2 w-48 bg-white/95 backdrop-blur-sm border border-[#DDE3EA] rounded shadow-lg animate-fade-in">
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-sky-600 hover:text-white transition border-b border-[#DDE3EA] text-[#1A1F2C] cursor-pointer group"
                        onClick={() => {
                          onOpenMongo();
                          setDropdownOpen(false);
                        }}
                      >
                        <span className="text-[#3B82F6] group-hover:text-white font-medium flex items-center justify-center gap-1 transition-colors">
                          MongoDB <ArrowRight className="h-4 w-4" />
                        </span>
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-sky-600 hover:text-white transition text-[#1A1F2C] cursor-pointer group"
                        onClick={() => {
                          onOpenMySQL();
                          setDropdownOpen(false);
                        }}
                      >
                        <span className="text-[#3B82F6] group-hover:text-white font-medium flex items-center justify-center gap-1 transition-colors">
                          MySQL <ArrowRight className="h-4 w-4" />
                        </span>
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-sky-600 hover:text-white transition border-t border-[#DDE3EA] text-[#1A1F2C] cursor-pointer group"
                        onClick={() => {
                          onOpenPostgres();
                          setDropdownOpen(false);
                        }}
                      >
                        <span className="text-[#3B82F6] group-hover:text-white font-medium flex items-center justify-center gap-1 transition-colors">
                          PostgreSQL <ArrowRight className="h-4 w-4" />
                        </span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {pathname === "/dashboard/mongodb" && selectedType === "MongoDB" && (
            <button
              className="hidden md:flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300 transform cursor-pointer gap-2 font-semibold shadow-sm"
              onClick={onOpenMongo}
            >
              <Database className="h-4 w-4" />
              Create MongoDB
            </button>
          )}
          {pathname === "/dashboard/mysqldb" && selectedType === "MySQL" && (
            <button
              className="hidden md:flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300 transform cursor-pointer gap-2 font-semibold shadow-sm"
              onClick={onOpenMySQL}
            >
              <Database className="h-4 w-4" />
              Create MySQLDB
            </button>
          )}
          {pathname === "/dashboard/postgres" &&
            selectedType === "PostgreSQL" && (
              <button
                className="hidden md:flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300 transform cursor-pointer gap-2 font-semibold shadow-sm"
                onClick={onOpenPostgres}
              >
                <Database className="h-4 w-4" />
                Create PostgreSQL db
              </button>
            )}
          {actionButton && (
            <div className="hidden md:block">{actionButton}</div>
          )}

          {/* Mobile button  */}
          <button
            onClick={onOpenMongo}
            className="md:hidden p-2 rounded-full bg-sky-600 hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/30 text-white transition-all duration-300 shadow-sm"
          >
            <PlusCircle className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300 transform cursor-pointer font-semibold shadow-sm"
            >
              <MinusCircle className=" h-4 w-4" />
              Logout
            </button>
          </div>

          <div></div>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.15s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
