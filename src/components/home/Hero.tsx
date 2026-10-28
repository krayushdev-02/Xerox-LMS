"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
  Users,
  GraduationCap,
  PlayCircle,
  FileCheck,
  ShieldCheck,
} from "lucide-react";
import { DEMO_STATS, SITE_TAGLINE } from "@/lib/constants";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/courses");
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-brand-grey-50 via-white to-brand-grey-100 dark:from-brand-navy-950 dark:via-brand-navy-900 dark:to-brand-navy-950">
      {/* Decorative background glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-navy-500/10 dark:bg-brand-navy-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-brand-red-500/10 dark:bg-brand-red-500/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle, Search, CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-50 dark:bg-brand-navy-900 border border-brand-navy-200 dark:border-brand-navy-700 text-brand-navy-800 dark:text-brand-navy-200 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-red-500 animate-pulse" />
              <span>{SITE_TAGLINE}</span>
              <span className="text-brand-grey-400">&bull;</span>
              <span className="text-brand-red-500 font-bold">New Exam Portal 2026</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy-950 dark:text-white leading-[1.15]">
              Learn Smarter. <br />
              <span className="bg-gradient-to-r from-brand-navy-700 via-brand-navy-600 to-brand-red-500 bg-clip-text text-transparent dark:from-sky-400 dark:via-blue-300 dark:to-brand-red-400">
                Achieve More.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-brand-grey-600 dark:text-brand-grey-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Learn new skills, attend online exams, explore courses, and earn certificates with{" "}
              <strong className="text-brand-navy-800 dark:text-white font-semibold">
                Xerox LMS
              </strong>
              . Comprehensive computer programming, web technologies, and AI tracks with
              instant verification.
            </p>

            {/* Course Search Bar */}
            <form
              onSubmit={handleSearch}
              className="max-w-xl mx-auto lg:mx-0 relative flex items-center shadow-soft-lg rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-300 dark:border-brand-navy-700 p-1.5 transition-all focus-within:ring-2 focus-within:ring-brand-navy-500"
            >
              <div className="pl-3 text-brand-grey-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses (e.g. Python, SQL, C++, Web Dev)..."
                className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-brand-grey-900 dark:text-white placeholder-brand-grey-400 focus:outline-none"
              />
              <button
                type="submit"
                className="flex-shrink-0 px-5 py-2.5 bg-brand-navy-700 hover:bg-brand-navy-800 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <span>Find</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/courses"
                className="px-6 py-3.5 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-base shadow-red-glow hover:shadow-lg transition-all duration-200 flex items-center gap-2 active:scale-95"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/register"
                className="px-6 py-3.5 rounded-xl bg-white dark:bg-brand-navy-800 border border-brand-navy-700 dark:border-brand-navy-600 text-brand-navy-700 dark:text-white font-bold text-base hover:bg-brand-navy-50 dark:hover:bg-brand-navy-700 transition-all duration-200 flex items-center gap-2"
              >
                <span>Get Started Free</span>
              </Link>

              <Link
                href="/ai-tutor"
                className="px-4 py-3 rounded-xl text-brand-grey-700 dark:text-brand-grey-300 hover:text-brand-red-500 dark:hover:text-brand-red-400 font-semibold text-sm flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-brand-red-500" />
                <span>Try AI Tutor</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-brand-grey-500 dark:text-brand-grey-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verifiable Certificates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Automated Online Exams</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>AI Doubt Solver</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-700 p-6 shadow-soft-lg space-y-5">
                {/* Header inside card */}
                <div className="flex items-center justify-between pb-4 border-b border-brand-grey-100 dark:border-brand-navy-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy-50 dark:bg-brand-navy-800 flex items-center justify-center text-brand-navy-700 dark:text-brand-navy-300 font-bold">
                      <GraduationCap className="w-5 h-5 text-brand-red-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy-950 dark:text-white">
                        Online Assessment
                      </h4>
                      <p className="text-xs text-brand-grey-500 dark:text-brand-grey-400">
                        100 Questions &bull; Timed & Auto-Graded
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Active
                  </span>
                </div>

                {/* Exam Sample Question Preview */}
                <div className="rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 p-4 border border-brand-grey-200/70 dark:border-brand-navy-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-brand-grey-500 dark:text-brand-grey-400">
                    <span className="font-semibold text-brand-navy-700 dark:text-brand-navy-300">
                      Section A: HTML & Web Standards
                    </span>
                    <span className="font-mono text-brand-red-500 font-bold">⏱ 45:00</span>
                  </div>
                  <p className="text-sm font-medium text-brand-navy-950 dark:text-white leading-snug">
                    Which HTML5 element is used to specify a footer for a document or section?
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-brand-navy-700 text-white font-medium flex items-center gap-1.5 shadow-xs">
                      <span className="w-4 h-4 rounded-full bg-white text-brand-navy-700 text-[10px] font-bold flex items-center justify-center">
                        A
                      </span>
                      <span>&lt;footer&gt;</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 text-brand-grey-700 dark:text-brand-grey-300 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-brand-grey-200 dark:bg-brand-navy-800 text-[10px] font-bold flex items-center justify-center">
                        B
                      </span>
                      <span>&lt;bottom&gt;</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Issued Preview Mini-card */}
                <div className="rounded-2xl bg-gradient-to-r from-brand-navy-900 to-brand-navy-950 text-white p-4 border border-brand-navy-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-red-500/20 text-brand-red-400 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Verified Certificate</div>
                      <div className="text-[11px] text-brand-grey-300 font-mono">
                        ID: XLR-2026-8942
                      </div>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 font-medium px-2 py-0.5 rounded border border-emerald-500/30">
                    Verified
                  </span>
                </div>

                {/* AI Tutor mini snippet */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-brand-red-50 dark:bg-brand-red-950/30 border border-brand-red-200/60 dark:border-brand-red-900/50">
                  <div className="w-8 h-8 rounded-lg bg-brand-red-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-brand-grey-700 dark:text-brand-grey-300">
                    <strong className="text-brand-red-600 dark:text-brand-red-400">AI Tutor:</strong>{" "}
                    &quot;Need quick revision for SQL joins? Ask me anytime!&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Statistics Strip (Clearly Labeled as Demo Data) */}
        <div className="mt-16 pt-8 border-t border-brand-grey-200 dark:border-brand-navy-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-grey-500 dark:text-brand-grey-400">
              Platform Metrics
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Demo Statistics
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {DEMO_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/70 dark:bg-brand-navy-900/50 backdrop-blur-sm border border-brand-grey-200/60 dark:border-brand-navy-800"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-navy-700 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-brand-grey-600 dark:text-brand-grey-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

