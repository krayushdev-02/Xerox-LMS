"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, Award, FileText } from "lucide-react";

export default function ResultsIndexPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-brand-grey-50/70 dark:bg-brand-navy-950">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-brand-red-500/10 text-brand-red-500 flex items-center justify-center mx-auto">
          <GraduationCap className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-brand-navy-950 dark:text-white">
            Examination Results Portal
          </h1>
          <p className="text-sm text-brand-grey-600 dark:text-brand-grey-400">
            View your assessment scorecards, performance analytics, and verified certificates.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-sm shadow-soft transition-colors flex items-center justify-center gap-2"
          >
            <span>My Student Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/exams"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-brand-navy-900 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white font-bold text-sm hover:bg-brand-grey-50 transition-colors"
          >
            Take an Exam
          </Link>
        </div>
      </div>
    </div>
  );
}

