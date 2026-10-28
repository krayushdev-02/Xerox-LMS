"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  AlertCircle,
  CheckCircle2,
  Loader2,
  GraduationCap,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, isConfigured } = useAuth();

  const [role, setRole] = useState<"student" | "teacher">("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(email, password, fullName, role, phone);
      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during signup.");
      setLoading(false);
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
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-brand-grey-600 dark:text-brand-grey-400">
            Start learning, take assessments, and earn certificates
          </p>
        </div>

        {/* Success Alert */}
        {success ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-emerald-200 dark:border-emerald-800 shadow-soft text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              Registration Successful!
            </h2>
            <p className="text-sm text-brand-grey-600 dark:text-brand-grey-300 leading-relaxed">
              We have sent a verification link to <strong className="text-brand-navy-900 dark:text-white">{email}</strong>.
              Please check your inbox to confirm your email and activate your account.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-sm shadow-soft transition-colors"
              >
                Go to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
            {/* Account Role Selector: ONLY Student or Teacher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-2">
                I am registering as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    role === "student"
                      ? "border-brand-navy-700 bg-brand-navy-50/70 dark:bg-brand-navy-800 text-brand-navy-950 dark:text-white ring-2 ring-brand-navy-500"
                      : "border-brand-grey-200 dark:border-brand-navy-800 text-brand-grey-600 dark:text-brand-grey-400 hover:border-brand-grey-300"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      role === "student"
                        ? "bg-brand-navy-700 text-white"
                        : "bg-brand-grey-100 dark:bg-brand-navy-800 text-brand-grey-500"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Student</div>
                    <div className="text-[11px] text-brand-grey-500">Learn & take exams</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    role === "teacher"
                      ? "border-brand-red-500 bg-brand-red-50/70 dark:bg-brand-red-950/40 text-brand-navy-950 dark:text-white ring-2 ring-brand-red-500"
                      : "border-brand-grey-200 dark:border-brand-navy-800 text-brand-grey-600 dark:text-brand-grey-400 hover:border-brand-grey-300"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      role === "teacher"
                        ? "bg-brand-red-500 text-white"
                        : "bg-brand-grey-100 dark:bg-brand-navy-800 text-brand-grey-500"
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Teacher</div>
                    <div className="text-[11px] text-brand-grey-500">Create courses</div>
                  </div>
                </button>
              </div>
              <p className="text-[11px] text-brand-grey-400 mt-2 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-navy-500" />
                <span>Admin accounts are protected and provisioned securely by system policy.</span>
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-grey-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                  Email Address *
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
                    placeholder="e.g. rahul@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-grey-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9341277351"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-grey-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-grey-400"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-grey-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-sm shadow-red-glow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create Free Account</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Footer Link */}
        <p className="text-center text-xs sm:text-sm text-brand-grey-600 dark:text-brand-grey-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-brand-navy-700 dark:text-white hover:text-brand-red-500 underline underline-offset-4"
          >
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}

