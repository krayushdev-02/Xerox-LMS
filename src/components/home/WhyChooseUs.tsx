import React from "react";
import {
  ShieldCheck,
  Award,
  Sparkles,
  GraduationCap,
  FileCheck2,
  Lock,
  Zap,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Comprehensive Curriculum",
    description:
      "Structured tracks covering HTML, CSS, JavaScript, C, C++, Python, SQL, and Artificial Intelligence tailored for beginner to advanced learners.",
    color: "navy",
  },
  {
    icon: Zap,
    title: "Server-Verified Examinations",
    description:
      "Real-time countdown timer, autosave, anti-cheat detection, and objective instant calculation on the server without client manipulation.",
    color: "red",
  },
  {
    icon: Award,
    title: "Verifiable Certificates",
    description:
      "Tamper-proof completion certificates issued with a unique Certificate ID and QR code, verifiable by employers on our public portal.",
    color: "navy",
  },
  {
    icon: Sparkles,
    title: "24/7 Smart AI Tutor",
    description:
      "Integrated Gemini-powered educational mentor to debug code errors, explain tricky concepts in simple words, and generate custom practice questions.",
    color: "red",
  },
  {
    icon: FileCheck2,
    title: "Rich Materials & Assignments",
    description:
      "Downloadable PDF notes, code snippets, project assignments, and teacher reviews to solidify theoretical concepts into practical code.",
    color: "navy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Supabase Architecture",
    description:
      "Strict Row Level Security (RLS) ensuring student privacy, teacher course management, and administrative control over records.",
    color: "red",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white dark:bg-brand-navy-950 border-t border-brand-grey-200 dark:border-brand-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-50 dark:bg-brand-navy-900 border border-brand-navy-200 dark:border-brand-navy-800 text-brand-navy-700 dark:text-brand-navy-300 text-xs font-bold uppercase tracking-wider">
            <span>The Xerox LMS Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-950 dark:text-white tracking-tight">
            Why Choose Xerox LMS?
          </h2>
          <p className="text-brand-grey-600 dark:text-brand-grey-400 text-base">
            Engineered from the ground up for serious technical education: learn step-by-step,
            prove your skills in real examinations, and earn industry-recognized credentials.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            const isRed = item.color === "red";
            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-brand-grey-50/50 dark:bg-brand-navy-900/40 border border-brand-grey-200/80 dark:border-brand-navy-800 hover:border-brand-navy-400/40 dark:hover:border-brand-navy-600 transition-all duration-200 hover:shadow-soft group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xs transition-transform group-hover:scale-105 ${
                    isRed
                      ? "bg-brand-red-500/10 text-brand-red-500 dark:bg-brand-red-950/60 dark:text-brand-red-400"
                      : "bg-brand-navy-700/10 text-brand-navy-700 dark:bg-brand-navy-800 dark:text-brand-navy-200"
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy-950 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-grey-600 dark:text-brand-grey-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

