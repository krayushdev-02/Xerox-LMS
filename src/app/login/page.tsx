"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/lib/supabase/types";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, loginAsDemoUser, isConfigured } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"student" | "teacher" | "admin">("student");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn(email, password);
      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        // Redirect based on role
        const role = result.role || activeTab;
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else if (role === "teacher") {
          router.push("/teacher/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    loginAsDemoUser(role);
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "teacher") {
      router.push("/teacher/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-grey-50 to-white dark:from-brand-navy-950 dark:to-brand-navy-900">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <Logo size="lg" showTagline={true} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-950 dark:text-white tracking-tight">
            Sign In to Your Account
          </h1>
          <p className="text-xs sm:text-sm text-brand-grey-600 dark:text-brand-grey-400">
            Access your courses, exams, submissions, and certificates
          </p>
        </div>

        {/* Role Tabs Indicator */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-brand-grey-100 dark:bg-brand-navy-900 rounded-2xl border border-brand-grey-200 dark:border-brand-navy-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("student")}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "student"
                ? "bg-white dark:bg-brand-navy-800 text-brand-navy-900 dark:text-white shadow-xs"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-700"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("teacher")}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "teacher"
                ? "bg-white dark:bg-brand-navy-800 text-brand-navy-900 dark:text-white shadow-xs"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-700"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Teacher</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("admin")}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "admin"
                ? "bg-white dark:bg-brand-navy-800 text-brand-navy-900 dark:text-white shadow-xs"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-700"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-grey-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    activeTab === "admin"
                      ? "admin@xeroxlms.com"
                      : activeTab === "teacher"
                      ? "teacher@xeroxlms.com"
                      : "student@xeroxlms.com"
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-brand-red-500 hover:text-brand-red-600 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-grey-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-brand-grey-400 hover:text-brand-grey-600 dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-sm shadow-soft hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In as {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option for testing */}
          <div className="pt-4 border-t border-brand-grey-200 dark:border-brand-navy-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-grey-500 uppercase tracking-wider">
                Instant Demo Access
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold">
                Quick Test
              </span>
            </div>
            <p className="text-xs text-brand-grey-500 dark:text-brand-grey-400">
              Explore dashboards directly without typing passwords:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin("student")}
                className="py-2 px-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 hover:border-brand-navy-500 bg-brand-grey-50 dark:bg-brand-navy-950 text-brand-navy-800 dark:text-white text-xs font-semibold hover:bg-brand-navy-50 dark:hover:bg-brand-navy-800 transition-colors"
              >
                Demo Student
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("teacher")}
                className="py-2 px-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 hover:border-brand-navy-500 bg-brand-grey-50 dark:bg-brand-navy-950 text-brand-navy-800 dark:text-white text-xs font-semibold hover:bg-brand-navy-50 dark:hover:bg-brand-navy-800 transition-colors"
              >
                Demo Teacher
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="py-2 px-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 hover:border-brand-red-500 bg-brand-grey-50 dark:bg-brand-navy-950 text-brand-red-600 dark:text-brand-red-400 text-xs font-semibold hover:bg-brand-red-50 dark:hover:bg-brand-navy-800 transition-colors"
              >
                Demo Admin
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs sm:text-sm text-brand-grey-600 dark:text-brand-grey-400">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="font-bold text-brand-red-500 hover:text-brand-red-600 underline underline-offset-4"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}

