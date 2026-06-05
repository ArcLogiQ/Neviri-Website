"use client";
import { Database, Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ADMIN_ENDPOINTS } from "@/config/api";
import Image from "next/image";

export default function LoginModal({ open, onClose }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(ADMIN_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status && data.token) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        toast.success("Admin login successful!");
        onClose();
        router.push("/blogs/blog-dashboard");
      } else {
        setError(data.message || "Login failed");
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white/90 border border-[#DDE3EA] rounded-xl shadow-2xl w-full max-w-[600px] p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#4B5565] hover:text-[#1A1F2C] transition-colors cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/neviri-logo.svg"
              width={120}
              height={40}
              alt="Neviri logo"
              className="w-12 h-auto sm:w-14 md:w-14"
            />
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-[#1A1F2C] mb-2">Admin Login</div>
          <p className="text-[#4B5565]">Access the admin dashboard</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 text-[#C12828] bg-[#C12828]/10 border border-[#C12828]/20 p-4 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#4B5565]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full bg-[#F7F9FC] border border-[#DDE3EA] rounded-lg px-4 py-3 text-[#1A1F2C] placeholder-[#9AA5B8] focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#4B5565]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full bg-[#F7F9FC] border border-[#DDE3EA] rounded-lg px-4 py-3 pr-12 text-[#1A1F2C] placeholder-[#9AA5B8] focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA5B8] hover:text-[#1A1F2C] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              isLoading
                ? "bg-sky-600 cursor-not-allowed text-white"
                : "bg-sky-600 hover:bg-sky-700 text-white shadow-lg hover:shadow-xl transform cursor-pointer"
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white rounded-full border-t-transparent"></div>
                Logging in...
              </>
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#9AA5B8]">
            Note: This login is for Neviri admin users only.
          </p>
        </div>
      </div>
    </div>
  );
}