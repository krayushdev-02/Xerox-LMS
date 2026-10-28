import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  BookOpen,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import { SITE_NAME, SITE_TAGLINE, CONTACT_INFO } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="py-12 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-navy-900 via-brand-navy-950 to-brand-navy-900 text-white border border-brand-navy-800 shadow-xl space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-500/20 text-brand-red-300 text-xs font-bold border border-brand-red-500/30">
            <span>About Xerox LMS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Learn Smarter. Achieve More.
          </h1>
          <p className="text-base sm:text-lg text-brand-grey-300 max-w-2xl leading-relaxed">
            Xerox LMS is an institutional-grade learning and assessment platform engineered to equip
            students and developers with practical, demonstrable programming expertise.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy-700 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">Our Mission</h2>
            <p className="text-xs sm:text-sm text-brand-grey-600 dark:text-brand-grey-400 leading-relaxed">
              To bridge the gap between academic theory and practical engineering competence by
              providing rigorous curricula in C, C++, Python, Java, Web Technologies, SQL, and
              Artificial Intelligence paired with objective assessments.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-red-500 text-white flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              Verifiable Credentials
            </h2>
            <p className="text-xs sm:text-sm text-brand-grey-600 dark:text-brand-grey-400 leading-relaxed">
              Every Xerox LMS certificate carries an unalterable Certificate ID and QR code,
              allowing universities, employers, and clients to verify real examinee scores
              instantly on our public verification portal.
            </p>
          </div>
        </div>

        {/* Key Pillars */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
          <h2 className="text-2xl font-bold text-brand-navy-950 dark:text-white">
            Core Educational Pillars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-brand-navy-800 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100-Question Grand Exams</span>
              </h3>
              <p className="text-brand-grey-500 leading-relaxed">
                Comprehensive, timed 90-minute testing covering six major domains of computer
                science with anti-cheat autosaving.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-brand-navy-800 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Integrated AI Tutor</span>
              </h3>
              <p className="text-brand-grey-500 leading-relaxed">
                24/7 personal learning assistant powered by state-of-the-art models for instant
                code explanation and MCQ generation.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-brand-navy-800 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Downloadable Materials</span>
              </h3>
              <p className="text-brand-grey-500 leading-relaxed">
                High-yield PDF summaries, source code repositories, and practical assignments to
                solidify conceptual retention.
              </p>
            </div>
          </div>
        </div>

        {/* Official Contact Box */}
        <div className="p-8 rounded-3xl bg-brand-navy-950 text-white border border-brand-navy-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold">Have Questions for Our Academic Team?</h3>
            <p className="text-xs text-brand-grey-400 mt-1">
              Contact us at Phone: {CONTACT_INFO.phone} &bull; Email: {CONTACT_INFO.email}
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-red-glow"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}

