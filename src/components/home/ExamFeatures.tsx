import React from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BarChart3,
  ShieldAlert,
  ArrowRight,
  FileSpreadsheet,
} from "lucide-react";

export default function ExamFeatures() {
  const examHighlights = [
    {
      title: "Interactive Countdown Timer",
      desc: "Live timer synchronizing with the server. Examination automatically submits the moment time runs out.",
    },
    {
      title: "Instant Autosave & Nav Palette",
      desc: "Every answer is saved in real-time. Jump between unanswered, flagged, and attempted questions with ease.",
    },
    {
      title: "Strict Server-Side Scoring",
      desc: "Objective evaluation is executed entirely on Supabase PostgreSQL to prevent client manipulation.",
    },
    {
      title: "Comprehensive 100-Q Banks",
      desc: "Structured sections covering HTML, CSS, JavaScript, C Programming, Python, and SQL with passing thresholds.",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-brand-navy-950 border-b border-brand-grey-200 dark:border-brand-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual UI of Exam Portal */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-3xl bg-brand-grey-50 dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 p-6 shadow-soft space-y-4">
              {/* Exam Header */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-grey-200 dark:border-brand-navy-800">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red-500">
                    Live Assessment
                  </span>
                  <h4 className="text-base font-extrabold text-brand-navy-950 dark:text-white">
                    Computer Programming & Web Tech (100 Qs)
                  </h4>
                </div>
                <div className="px-3 py-1 rounded-xl bg-brand-red-50 dark:bg-brand-red-950/50 border border-brand-red-200 dark:border-brand-red-800 text-brand-red-600 dark:text-brand-red-400 font-mono text-sm font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 animate-pulse" />
                  <span>89:45 remaining</span>
                </div>
              </div>

              {/* Question Navigation Palette Preview */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-brand-grey-500 dark:text-brand-grey-400">
                  <span>Question Palette (HTML: 1-15 &bull; CSS: 16-30 &bull; JS: 31-50)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    12 Answered
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((q) => (
                    <div
                      key={q}
                      className="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center"
                    >
                      {q}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-lg bg-brand-navy-700 text-white text-xs font-bold ring-2 ring-brand-red-500 flex items-center justify-center">
                    13
                  </div>
                  {[14, 15, 16, 17, 18, 19, 20].map((q) => (
                    <div
                      key={q}
                      className="w-7 h-7 rounded-lg bg-brand-grey-200 dark:bg-brand-navy-800 text-brand-grey-700 dark:text-brand-grey-300 text-xs font-semibold flex items-center justify-center"
                    >
                      {q}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Question Box */}
              <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 space-y-3">
                <span className="text-xs font-bold text-brand-navy-700 dark:text-brand-navy-300">
                  Question 13 of 100 &bull; 1 Mark
                </span>
                <p className="text-sm font-medium text-brand-navy-950 dark:text-white">
                  Which CSS property is used to create a flexible responsive layout along a single
                  dimension (row or column)?
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl border border-brand-red-500 bg-brand-red-50/40 dark:bg-brand-red-950/20 text-brand-navy-950 dark:text-white font-medium flex items-center justify-between">
                    <span>A. display: flex;</span>
                    <span className="w-2 h-2 rounded-full bg-brand-red-500" />
                  </div>
                  <div className="p-2.5 rounded-xl border border-brand-grey-200 dark:border-brand-navy-800 bg-transparent text-brand-grey-600 dark:text-brand-grey-400">
                    B. display: inline-block;
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Features explanation */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-50 dark:bg-brand-navy-900 border border-brand-navy-200 dark:border-brand-navy-800 text-brand-navy-700 dark:text-brand-navy-300 text-xs font-bold uppercase tracking-wider">
              <span>Proctored Assessments</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-950 dark:text-white tracking-tight leading-tight">
              Robust Online Examination System
            </h2>

            <p className="text-brand-grey-600 dark:text-brand-grey-400 text-base leading-relaxed">
              Test your true technical mettle under realistic exam conditions. Our testing platform
              supports custom question banks, randomized options, timed windows, and immediate
              scorecard generation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {examHighlights.map((hl, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-900 border border-brand-grey-200/80 dark:border-brand-navy-800 space-y-1.5"
                >
                  <h4 className="text-sm font-bold text-brand-navy-950 dark:text-white">
                    {hl.title}
                  </h4>
                  <p className="text-xs text-brand-grey-500 dark:text-brand-grey-400 leading-relaxed">
                    {hl.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/exams"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-sm shadow-soft transition-all duration-200 active:scale-95"
              >
                <span>Browse Available Examinations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

