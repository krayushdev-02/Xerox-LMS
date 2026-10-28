"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  LogOut,
  GraduationCap,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, role, loading, refreshProfile, signOut } = useAuth();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<"idle" | "success" | "error">("idle");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    if (!loading && !user && !profile) {
      router.push("/login");
    }
    if (profile) {
      setFullName(profile.full_name || "");
      setPhoneNumber(profile.phone || "");
      setBio(profile.bio || "");
    }
  }, [user, profile, loading, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    setMessage("");

    try {
      if (isSupabaseConfigured() && user) {
        const supabase = createClient();
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: fullName,
            phone: phoneNumber,
            bio,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (error) throw error;
        await refreshProfile();
      }

      setStatus("success");
      setMessage("Your profile has been updated successfully.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordStatus("error");
      setPasswordMessage("New password must be at least 6 characters.");
      return;
    }

    setPasswordSaving(true);
    setPasswordStatus("idle");

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (error) throw error;
      }

      setPasswordStatus("success");
      setPasswordMessage("Password changed successfully.");
      setNewPassword("");
      setCurrentPassword("");
    } catch (err: any) {
      setPasswordStatus("error");
      setPasswordMessage(err.message || "Failed to update password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-navy-700" />
      </div>
    );
  }

  const roleBadgeMap = {
    admin: {
      label: "Platform Administrator",
      icon: ShieldCheck,
      color: "bg-brand-red-100 text-brand-red-700 border-brand-red-200 dark:bg-brand-red-950/60 dark:text-brand-red-300 dark:border-brand-red-800",
    },
    teacher: {
      label: "Faculty Instructor",
      icon: Briefcase,
      color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
    },
    student: {
      label: "Enrolled Student",
      icon: GraduationCap,
      color: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    },
  };

  const currentRoleInfo = roleBadgeMap[role || "student"];
  const RoleIcon = currentRoleInfo.icon;

  return (
    <div className="py-12 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Title & User Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-navy-700 text-white font-black text-2xl flex items-center justify-center shadow-md">
              {(profile?.full_name || profile?.email || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-brand-navy-950 dark:text-white">
                  {profile?.full_name || "Account Profile"}
                </h1>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentRoleInfo.color}`}
                >
                  <RoleIcon className="w-3.5 h-3.5" />
                  <span>{currentRoleInfo.label}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-brand-grey-500 dark:text-brand-grey-400 mt-1">
                {profile?.email}
              </p>
            </div>
          </div>

          <button
            onClick={async () => {
              await signOut();
              router.push("/login");
            }}
            className="px-4 py-2.5 rounded-xl border border-brand-red-200 dark:border-brand-red-900/60 bg-brand-red-50 dark:bg-brand-red-950/30 text-brand-red-600 dark:text-brand-red-400 hover:bg-brand-red-500 hover:text-white transition-colors text-xs font-bold flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Profile Edit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Account Details Info */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-grey-500">
                Security & Role
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-brand-grey-400 block">User ID</span>
                  <span className="font-mono text-brand-navy-900 dark:text-brand-grey-200 break-all">
                    {profile?.id || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-brand-grey-400 block">Assigned Role</span>
                  <span className="font-semibold text-brand-navy-900 dark:text-brand-grey-200 capitalize">
                    {role || "student"}
                  </span>
                </div>
                <div className="pt-2 border-t border-brand-grey-100 dark:border-brand-navy-800 text-brand-grey-500 text-[11px] leading-relaxed">
                  <Shield className="w-3.5 h-3.5 text-brand-navy-600 inline mr-1" />
                  Your role is verified server-side with Supabase PostgreSQL Row Level Security.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Update Forms */}
          <div className="md:col-span-2 space-y-6">
            {/* General Info Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
              <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white">
                Personal Information
              </h3>

              {status === "success" && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{message}</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>{message}</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                    Email Address (Immutable)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={profile?.email || ""}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-grey-100 dark:bg-brand-navy-800 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-grey-500 text-sm cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 9341277351"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                    Bio / Summary
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about your learning goals or teaching background..."
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Changes</span>
                </button>
              </form>
            </div>

            {/* Change Password Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
              <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-brand-red-500" />
                <span>Security & Password</span>
              </h3>

              {passwordStatus === "success" && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{passwordMessage}</span>
                </div>
              )}

              {passwordStatus === "error" && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>{passwordMessage}</span>
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="px-6 py-2.5 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {passwordSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  <span>Update Password</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

