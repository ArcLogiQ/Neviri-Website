"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { X } from "lucide-react";

const ProcessingContext = createContext();

export const useProcessing = () => {
  const context = useContext(ProcessingContext);
  if (!context) {
    throw new Error("useProcessing must be used within a ProcessingProvider");
  }
  return context;
};

export const ProcessingProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const getInitialState = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("processingState");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Only restore if user is still authenticated
          if (localStorage.getItem("token")) {
            return parsed;
          }
        } catch (e) {
          console.error("Error parsing saved processing state:", e);
        }
      }
    }
    return {
      visible: false,
      displayName: "",
      dbType: "",
      polling: false,
      prevIds: [],
    };
  };

  const [processingBar, setProcessingBar] = useState(getInitialState);

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("processingState", JSON.stringify(processingBar));
    }
  }, [processingBar]);

  // Restore polling state on mount if needed
  useEffect(() => {
    if (processingBar.polling && !processingBar.visible) {
      // If we have polling state but bar is not visible,
      // we need to notify components to resume polling
      const event = new CustomEvent("processingStateRestored", {
        detail: processingBar,
      });
      window.dispatchEvent(event);
    }
  }, [processingBar]);

  // Clear processing bar when user logs out
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token" && !e.newValue) {
        // Token was removed (logout)
        const clearedState = {
          visible: false,
          displayName: "",
          dbType: "",
          polling: false,
          prevIds: [],
        };
        setProcessingBar(clearedState);
        localStorage.removeItem("processingState");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check on mount if user is not authenticated
    if (!isAuthenticated()) {
      const clearedState = {
        visible: false,
        displayName: "",
        dbType: "",
        polling: false,
        prevIds: [],
      };
      setProcessingBar(clearedState);
      localStorage.removeItem("processingState");
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const startProcessing = (displayName, dbType, prevIds = []) => {
    if (!isAuthenticated()) {
      return;
    }

    setProcessingBar({
      visible: true,
      displayName,
      dbType,
      polling: true,
      prevIds,
    });
  };

  const stopProcessing = () => {
    const clearedState = {
      visible: false,
      displayName: "",
      dbType: "",
      polling: false,
      prevIds: [],
    };
    setProcessingBar(clearedState);
    localStorage.removeItem("processingState");
  };

  const hideProcessing = () => {
    setProcessingBar((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const showProcessing = () => {
    if (!isAuthenticated()) {
      return;
    }

    setProcessingBar((prev) => ({
      ...prev,
      visible: true,
    }));
  };

  const updateProcessing = (updates) => {
    setProcessingBar((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const value = {
    processingBar,
    startProcessing,
    stopProcessing,
    hideProcessing,
    showProcessing,
    updateProcessing,
  };

  return (
    <ProcessingContext.Provider value={value}>
      {children}
      {/* Global Processing Bar Component */}
      <GlobalProcessingBar />
      {/* Global Show Processing Button */}
      <GlobalShowProcessingButton />
    </ProcessingContext.Provider>
  );
};

// Global Processing Bar Component
const GlobalProcessingBar = () => {
  const { processingBar, hideProcessing } = useProcessing();

  if (!processingBar.visible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl rounded-lg px-6 py-4 flex items-center gap-4 min-w-[280px] animate-fade-in">
      <div className="flex-1">
        <div className="font-semibold text-gray-700 text-base mb-1">
          Creating Cluster String, Please wait...
        </div>
        <div className="text-sm text-gray-500">
          {processingBar.displayName} <span className="mx-1">|</span>{" "}
          {processingBar.dbType}
        </div>
        {processingBar.polling && (
          <div className="text-gray-700">
            <span className="animate-spin h-4 w-4 border-2 border-sky-600 rounded-full border-t-transparent mr-2 text-gray-700"></span>
            Creating... This may take a few minutes.
          </div>
        )}
        {!processingBar.polling && (
          <div>
            <span className="animate-spin h-4 w-4 border-2 border-sky-600 rounded-full border-t-transparent mr-2 text-gray-600"></span>
            Still creating... Please wait.
          </div>
        )}
        {processingBar.polling && (
          <div className="mt-2 w-full h-2 bg-[#F7F9FC] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 animate-shimmer absolute left-0 top-0"
              style={{ width: "100%" }}
            ></div>
          </div>
        )}
        {!processingBar.polling && (
          <div className="mt-2 text-xs text-gray-600">
            Still processing Please wait. or You may refresh the page.
          </div>
        )}
      </div>
      <button
        className="ml-2 text-gray-600 hover:text-gray-400 cursor-pointer"
        onClick={hideProcessing}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
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
        .animate-shimmer {
          animation: shimmer 2.2s linear infinite;
        }
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

// Global Show Processing Button Component
const GlobalShowProcessingButton = () => {
  const { processingBar, showProcessing } = useProcessing();

  // Only show the button if processing is happening but bar is hidden
  if (!processingBar.polling || processingBar.visible) {
    return null;
  }

  return (
    <button
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold hover:bg-sky-700 transition-all animate-fade-in cursor-pointer"
      onClick={showProcessing}
    >
      Show Processing
    </button>
  );
};
