"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Download,
  Share2,
  BarChart3,
  Calendar,
  Clock,
  User,
  GraduationCap,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import {
  ALL_ASSESSMENT_QUESTIONS,
  ASSESSMENT_METADATA,
} from "@/lib/assessment-data";

export default function ExamResultPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = params.attemptId as string;

  const [result, setResult] = useState<any>(null);
  const [showExplanations, setShowExplanations] = useState(false);

  useEffect(() => {
    if (attemptId) {
      try {
        const raw = sessionStorage.getItem(`xerox_result_${attemptId}`);
        if (raw) {
          setResult(JSON.parse(raw));
        } else {
          // Default mock result for direct viewing
          setResult({
            attemptId,
            examId: ASSESSMENT_METADATA.id,
            examTitle: ASSESSMENT_METADATA.title,
            candidateName: "Ayush Kumar",
            candidateEmail: "ayushk2375@gmail.com",
            submittedAt: new Date().toISOString(),
            score: 92,
            totalMarks: 100,
            percentage: 92,
            isPassed: true,
            correctCount: 92,
            wrongCount: 8,
            unansweredCount: 0,
            sectionResults: {
              "HTML (Questions 1–15)": { total: 15, correct: 14 },
              "CSS (Questions 16–30)": { total: 15, correct: 14 },
              "JavaScript (Questions 31–50)": { total: 20, correct: 18 },
              "C Programming (Questions 51–65)": { total: 15, correct: 14 },
              "Python (Questions 66–80)": { total: 15, correct: 15 },
              "SQL (Questions 81–100)": { total: 20, correct: 17 },
            },
            answers: {},
          });
        }
      } catch {
        // Ignore
      }
    }
  }, [attemptId]);

  if (!result) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-sm font-semibold text-brand-navy-700">Loading scorecard...</div>
      </div>
    );
  }

  const certificateCode = `XLR-2026-${attemptId.slice(-4)}`;

  return (
    <div className="py-12 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Result Outcome Header Card */}
        <div
          className={`p-8 sm:p-12 rounded-3xl border shadow-xl text-center space-y-5 relative overflow-hidden ${
            result.isPassed
              ? "bg-gradient-to-b from-white to-emerald-50/50 dark:from-brand-navy-900 dark:to-emerald-950/20 border-emerald-300 dark:border-emerald-800"
              : "bg-gradient-to-b from-white to-rose-50/50 dark:from-brand-navy-900 dark:to-rose-950/20 border-rose-300 dark:border-rose-800"
          }`}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
            {result.isPassed ? (
              <span className="bg-emerald-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>EXAMINATION QUALIFIED — PASSED</span>
              </span>
            ) : (
              <span className="bg-rose-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                <span>DID NOT MEET PASSING CRITERIA (40%)</span>
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy-950 dark:text-white">
              Official Assessment Scorecard
            </h1>
            <p className="text-sm text-brand-grey-500">{result.examTitle}</p>
          </div>

          {/* Big Score Display */}
          <div className="py-4">
            <div className="text-5xl sm:text-6xl font-black text-brand-navy-950 dark:text-white font-mono">
              {result.score}{" "}
              <span className="text-2xl sm:text-3xl font-medium text-brand-grey-400">
                / {result.totalMarks}
              </span>
            </div>
            <div className="text-base font-bold text-brand-grey-600 dark:text-brand-grey-300 mt-1">
              Overall Grade: <strong>{result.percentage}%</strong> &bull; Passing Threshold: 40%
            </div>
          </div>

          {/* Candidate Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-brand-grey-200 dark:border-brand-navy-800 text-xs">
            <div className="p-3 rounded-2xl bg-white dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800">
              <span className="text-brand-grey-400 block">Candidate</span>
              <span className="font-bold text-brand-navy-950 dark:text-white truncate block">
                {result.candidateName}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800">
              <span className="text-brand-grey-400 block">Attempt ID</span>
              <span className="font-mono font-bold text-brand-navy-950 dark:text-white truncate block">
                {result.attemptId}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800">
              <span className="text-brand-grey-400 block">Correct Answers</span>
              <span className="font-bold text-emerald-600 block">{result.correctCount} / 100</span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800">
              <span className="text-brand-grey-400 block">Incorrect Answers</span>
              <span className="font-bold text-brand-red-500 block">{result.wrongCount}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {result.isPassed ? (
              <Link
                href={`/certificates?code=${certificateCode}&name=${encodeURIComponent(
                  result.candidateName
                )}&score=${result.percentage}`}
                className="px-8 py-3.5 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-sm shadow-red-glow hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <Award className="w-5 h-5" />
                <span>Claim & Verify Your Certificate</span>
              </Link>
            ) : (
              <Link
                href={`/exams/${result.examId}`}
                className="px-8 py-3.5 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-sm shadow-soft transition-all flex items-center gap-2 active:scale-95"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Retake Assessment</span>
              </Link>
            )}

            <button
              onClick={() => setShowExplanations(!showExplanations)}
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-brand-navy-800 border border-brand-navy-700 text-brand-navy-700 dark:text-white font-bold text-sm hover:bg-brand-navy-50 dark:hover:bg-brand-navy-700 transition-colors flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showExplanations ? "Hide Solution Keys" : "Review Question Keys"}</span>
            </button>
          </div>
        </div>

        {/* Section-Wise Breakdown Card */}
        {result.sectionResults && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-navy-600" />
              <span>Section-Wise Performance</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(result.sectionResults).map(([secName, secData]: any) => {
                const secPercent = Math.round((secData.correct / secData.total) * 100);
                return (
                  <div
                    key={secName}
                    className="p-4 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 space-y-2"
                  >
                    <div className="text-xs font-bold text-brand-navy-950 dark:text-white truncate">
                      {secName}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-grey-500 font-mono">
                        {secData.correct} / {secData.total}
                      </span>
                      <span
                        className={`font-black ${
                          secPercent >= 50 ? "text-emerald-600" : "text-brand-red-500"
                        }`}
                      >
                        {secPercent}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-brand-grey-200 dark:bg-brand-navy-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          secPercent >= 50 ? "bg-emerald-500" : "bg-brand-red-500"
                        }`}
                        style={{ width: `${secPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Detailed Question Review & Rationales */}
        {showExplanations && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6 animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
                Detailed Question Keys & Correct Answers
              </h2>
              <span className="text-xs text-brand-grey-500">100 Questions Total</span>
            </div>

            <div className="divide-y divide-brand-grey-200 dark:divide-brand-navy-800 max-h-[600px] overflow-y-auto pr-2 space-y-4">
              {ALL_ASSESSMENT_QUESTIONS.slice(0, 30).map((q) => {
                const selectedOptIdx = result.answers ? result.answers[q.number] : undefined;
                const isCorrect = selectedOptIdx === q.correctIndex;

                return (
                  <div key={q.id} className="pt-4 space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-brand-navy-700 dark:text-sky-300">
                        Q{q.number}. {q.section}
                      </span>
                      {selectedOptIdx !== undefined ? (
                        isCorrect ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Correct (+1)</span>
                          </span>
                        ) : (
                          <span className="text-brand-red-500 font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Incorrect (0)</span>
                          </span>
                        )
                      ) : (
                        <span className="text-brand-grey-400">Unanswered</span>
                      )}
                    </div>

                    <p className="font-medium text-brand-navy-950 dark:text-white">
                      {q.questionText}
                    </p>

                    <div className="p-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 space-y-1 text-xs">
                      <div>
                        <strong className="text-emerald-700 dark:text-emerald-400">
                          Correct Option:
                        </strong>{" "}
                        {q.correctLetter} &bull; {q.options[q.correctIndex]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

