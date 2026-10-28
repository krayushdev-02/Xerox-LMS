"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Users,
} from "lucide-react";
import { ASSESSMENT_METADATA } from "@/lib/assessment-data";
import { useAuth } from "@/context/AuthContext";

export default function ExamsCatalogPage() {
  const { user, profile } = useAuth();

  const examsList = [
    {
      id: ASSESSMENT_METADATA.id,
      title: ASSESSMENT_METADATA.title,
      description: ASSESSMENT_METADATA.description,
      questionsCount: ASSESSMENT_METADATA.totalQuestions,
      duration: "90 Minutes",
      passingMarks: ASSESSMENT_METADATA.passingMarks,
      totalMarks: ASSESSMENT_METADATA.totalMarks,
      difficulty: "Comprehensive",
      category: "Full Stack (HTML, CSS, JS, C, Python, SQL)",
      isPrimary: true,
      badge: "Official Certificate Exam",
    },
    {
      id: "html-css-quiz",
      title: "Frontend Foundations: HTML5 & CSS3 Assessment",
      description:
        "30 objective questions on semantic HTML elements, accessibility, Flexbox, Grid, and the CSS box model.",
      questionsCount: 30,
      duration: "30 Minutes",
      passingMarks: 15,
      totalMarks: 30,
      difficulty: "Beginner",
      category: "Web Development",
      isPrimary: false,
      badge: "Practice Exam",
    },
    {
      id: "javascript-quiz",
      title: "JavaScript ES6+ & Asynchronous Programming Test",
      description:
        "20 questions covering DOM events, closures, promises, async/await, and modern ES6 array methods.",
      questionsCount: 20,
      duration: "20 Minutes",
      passingMarks: 10,
      totalMarks: 20,
      difficulty: "Intermediate",
      category: "JavaScript",
      isPrimary: false,
      badge: "Practice Exam",
    },
    {
      id: "python-quiz",
      title: "Python Core Concepts & OOP Examination",
      description:
        "15 questions on Python syntax, list comprehensions, classes, inheritance, and exception handling.",
      questionsCount: 15,
      duration: "15 Minutes",
      passingMarks: 8,
      totalMarks: 15,
      difficulty: "Intermediate",
      category: "Python",
      isPrimary: false,
      badge: "Practice Exam",
    },
    {
      id: "sql-quiz",
      title: "SQL Relational Queries & Optimization Test",
      description:
        "20 questions testing relational joins, GROUP BY, aggregates, subqueries, and table constraints.",
      questionsCount: 20,
      duration: "20 Minutes",
      passingMarks: 10,
      totalMarks: 20,
      difficulty: "Intermediate",
      category: "SQL",
      isPrimary: false,
      badge: "Practice Exam",
    },
  ];

  return (
    <div className="py-12 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red-50 dark:bg-brand-red-950/40 border border-brand-red-200 dark:border-brand-red-800 text-brand-red-600 dark:text-brand-red-400 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Online Examination Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy-950 dark:text-white tracking-tight">
            Proctored Online Examinations
          </h1>
          <p className="text-brand-grey-600 dark:text-brand-grey-400 text-base">
            Test your programming, web technology, and database expertise under timed exam
            conditions. Score 40% or higher to earn an official verified Xerox LMS Certificate.
          </p>
        </div>

        {/* Featured 100-Question Grand Assessment Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-navy-900 via-brand-navy-950 to-brand-navy-900 text-white border border-brand-navy-800 shadow-xl relative overflow-hidden space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-red-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm">
                Primary Assessment
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-brand-grey-200 text-xs font-semibold backdrop-blur-sm">
                100 Questions &bull; 90 Minutes
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
              Active Assessment Room
            </span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {ASSESSMENT_METADATA.title}
            </h2>
            <p className="text-sm sm:text-base text-brand-grey-300 leading-relaxed">
              {ASSESSMENT_METADATA.description}
            </p>
          </div>

          {/* Assessment Breakdown Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 text-xs">
            {ASSESSMENT_METADATA.sections.map((sec) => (
              <div
                key={sec.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1"
              >
                <div className="font-mono text-brand-red-400 font-bold">
                  {sec.start}–{sec.end}
                </div>
                <div className="font-semibold text-white truncate">{sec.title.split("—")[1]}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-navy-800">
            <div className="flex items-center gap-6 text-xs text-brand-grey-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-navy-400" />
                <span>90 Mins Timer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-red-400" />
                <span>Passing: 40/100 Marks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instant Certificate</span>
              </div>
            </div>

            <Link
              href={`/exams/${ASSESSMENT_METADATA.id}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-sm shadow-red-glow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Enter Examination Room</span>
            </Link>
          </div>
        </div>

        {/* Other Targeted Module Assessments */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-brand-navy-950 dark:text-white">
            Subject Practice Tests
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examsList
              .filter((e) => !e.isPrimary)
              .map((exam) => (
                <div
                  key={exam.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-brand-navy-50 dark:bg-brand-navy-800 text-brand-navy-700 dark:text-sky-300">
                        {exam.category}
                      </span>
                      <span className="text-xs font-mono text-brand-grey-500">
                        {exam.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-brand-navy-950 dark:text-white">
                      {exam.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-brand-grey-600 dark:text-brand-grey-400 leading-relaxed">
                      {exam.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-brand-grey-500 pt-2 border-t border-brand-grey-100 dark:border-brand-navy-800">
                      <div>
                        <strong>{exam.questionsCount}</strong> Questions
                      </div>
                      <div>&bull;</div>
                      <div>
                        Passing: <strong>{exam.passingMarks}</strong> marks
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/exams/${ASSESSMENT_METADATA.id}`}
                    className="w-full py-3 px-4 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Start Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

