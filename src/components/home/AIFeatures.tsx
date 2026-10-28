import React from "react";
import Link from "next/link";
import {
  Sparkles,
  MessageSquareCode,
  HelpCircle,
  FileText,
  Lightbulb,
  ArrowRight,
  Bot,
  CheckCircle2,
} from "lucide-react";

export default function AIFeatures() {
  const capabilities = [
    {
      icon: MessageSquareCode,
      title: "Interactive Code Explanation",
      desc: "Paste any tricky C++, Python, or JavaScript function and get step-by-step explanations.",
    },
    {
      icon: HelpCircle,
      title: "Instant MCQ Practice Generator",
      desc: "Generate custom test quizzes on specific topics with instant solution rationales.",
    },
    {
      icon: FileText,
      title: "Lesson Text Summarizer",
      desc: "Condense long technical documentation and lesson materials into high-yield revision cards.",
    },
    {
      icon: Lightbulb,
      title: "24/7 Academic Doubt Solver",
      desc: "No waiting for office hours; get polite, patient explanations tailored to your skill level.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-brand-navy-900 via-brand-navy-950 to-brand-navy-950 text-white relative overflow-hidden">
      {/* Decorative background effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red-500/20 border border-brand-red-500/30 text-brand-red-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen AI Learning</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Meet Your Personal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red-400 via-rose-300 to-sky-300">
                Xerox LMS AI Tutor
              </span>
            </h2>

            <p className="text-brand-grey-300 text-base sm:text-lg leading-relaxed">
              Never get stuck on an algorithm, syntax bug, or database join again. The Xerox LMS AI
              Tutor is trained on computer science principles to guide you through tough concepts
              in plain English.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-brand-grey-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Zero fake responses: uses live secure server-side API integration</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-grey-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Supports Python, C, C++, Java, HTML, CSS, JavaScript & SQL</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-grey-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Generates practice questions aligned with your upcoming exams</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/ai-tutor"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-sm shadow-red-glow hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                <span>Launch AI Tutor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Cards Showcase */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-red-500/40 backdrop-blur-sm transition-all duration-200 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-red-500/20 text-brand-red-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{cap.title}</h3>
                  <p className="text-xs text-brand-grey-300 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

