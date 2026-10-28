"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Send,
  Flag,
  HelpCircle,
  ShieldAlert,
  Loader2,
  RotateCcw,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import {
  ASSESSMENT_METADATA,
  ALL_ASSESSMENT_QUESTIONS,
  AssessmentQuestion,
} from "@/lib/assessment-data";
import { useAuth } from "@/context/AuthContext";

export default function LiveExamPage() {
  const router = useRouter();
  const { user, profile } = useAuth();

  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // qNumber => selected option index (0,1,2,3)
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(ASSESSMENT_METADATA.durationMinutes * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = ALL_ASSESSMENT_QUESTIONS.length;
  const currentQuestion: AssessmentQuestion = ALL_ASSESSMENT_QUESTIONS[currentQuestionIndex];

  // Load saved state from session storage if exists
  useEffect(() => {
    try {
      const savedAnswers = sessionStorage.getItem("xerox_exam_answers");
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));

      const savedFlags = sessionStorage.getItem("xerox_exam_flags");
      if (savedFlags) setFlagged(JSON.parse(savedFlags));

      const savedTime = sessionStorage.getItem("xerox_exam_time");
      if (savedTime) setTimeLeftSeconds(Number(savedTime));
    } catch {
      // Ignore
    }
  }, []);

  // Countdown timer with autosave
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      // Automatically submit when time expires
      handleSubmitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        const updated = prev - 1;
        try {
          sessionStorage.setItem("xerox_exam_time", String(updated));
        } catch {
          // Ignore
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds]);

  // Format timer string MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isLowTime = timeLeftSeconds <= 300; // Under 5 minutes

  // Select Option
  const handleSelectOption = (optionIndex: number) => {
    const updated = { ...answers, [currentQuestion.number]: optionIndex };
    setAnswers(updated);
    try {
      sessionStorage.setItem("xerox_exam_answers", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Clear Selection
  const handleClearOption = () => {
    const updated = { ...answers };
    delete updated[currentQuestion.number];
    setAnswers(updated);
    try {
      sessionStorage.setItem("xerox_exam_answers", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Toggle Flag
  const handleToggleFlag = () => {
    const updated = {
      ...flagged,
      [currentQuestion.number]: !flagged[currentQuestion.number],
    };
    setFlagged(updated);
    try {
      sessionStorage.setItem("xerox_exam_flags", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Navigation
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
    }
  };

  // Final Submit and Scoring
  const handleSubmitExam = () => {
    setIsSubmitting(true);

    // Calculate score
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    const sectionResults: Record<string, { total: number; correct: number }> = {};

    ALL_ASSESSMENT_QUESTIONS.forEach((q) => {
      const selectedOption = answers[q.number];
      const sectionName = q.section.split("—")[1]?.trim() || q.section;

      if (!sectionResults[sectionName]) {
        sectionResults[sectionName] = { total: 0, correct: 0 };
      }
      sectionResults[sectionName].total += 1;

      if (selectedOption !== undefined) {
        if (selectedOption === q.correctIndex) {
          score += q.marks;
          correctCount += 1;
          sectionResults[sectionName].correct += 1;
        } else {
          wrongCount += 1;
        }
      }
    });

    const isPassed = score >= ASSESSMENT_METADATA.passingMarks;
    const percentage = Math.round((score / ASSESSMENT_METADATA.totalMarks) * 100);
    const attemptId = `ATT-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const resultPayload = {
      attemptId,
      examId: ASSESSMENT_METADATA.id,
      examTitle: ASSESSMENT_METADATA.title,
      candidateName: profile?.full_name || profile?.email?.split("@")[0] || "Candidate",
      candidateEmail: profile?.email || "student@xeroxlms.com",
      submittedAt: new Date().toISOString(),
      score,
      totalMarks: ASSESSMENT_METADATA.totalMarks,
      percentage,
      isPassed,
      correctCount,
      wrongCount,
      unansweredCount: totalQuestions - (correctCount + wrongCount),
      sectionResults,
      answers,
    };

    // Save result to session storage / local storage
    try {
      sessionStorage.setItem(`xerox_result_${attemptId}`, JSON.stringify(resultPayload));
      sessionStorage.removeItem("xerox_exam_answers");
      sessionStorage.removeItem("xerox_exam_flags");
      sessionStorage.removeItem("xerox_exam_time");
    } catch {
      // Ignore
    }

    // Redirect to Results Page
    router.push(`/results/${attemptId}`);
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-brand-grey-50 dark:bg-brand-navy-950 flex flex-col select-none">
      {/* Top Proctored Exam Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-brand-navy-900 border-b border-brand-grey-200 dark:border-brand-navy-800 px-4 sm:px-6 py-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="sm" showTagline={false} asLink={false} />
          <div className="hidden sm:block border-l border-brand-grey-200 dark:border-brand-navy-700 pl-3">
            <h1 className="text-xs sm:text-sm font-bold text-brand-navy-950 dark:text-white line-clamp-1">
              {ASSESSMENT_METADATA.title}
            </h1>
            <div className="text-[11px] text-brand-grey-500">
              Candidate: <strong>{profile?.full_name || "Student Candidate"}</strong> &bull; 100 Objective Marks
            </div>
          </div>
        </div>

        {/* Live Countdown Timer & Submit */}
        <div className="flex items-center gap-3">
          <div
            className={`px-3 sm:px-4 py-1.5 rounded-xl border flex items-center gap-2 font-mono text-sm sm:text-base font-bold transition-colors ${
              isLowTime
                ? "bg-brand-red-50 text-brand-red-600 border-brand-red-300 animate-pulse"
                : "bg-brand-navy-50 dark:bg-brand-navy-950 text-brand-navy-800 dark:text-white border-brand-navy-200 dark:border-brand-navy-800"
            }`}
          >
            <Clock className="w-4 h-4 text-brand-red-500" />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Exam</span>
          </button>
        </div>
      </header>

      {/* Main Examination Layout: Question Center & Navigation Palette */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Question Workspace */}
        <main className="lg:col-span-8 space-y-6">
          {/* Section Breadcrumb */}
          <div className="p-3 px-4 rounded-2xl bg-brand-navy-50 dark:bg-brand-navy-900 border border-brand-navy-200 dark:border-brand-navy-800 flex items-center justify-between text-xs">
            <span className="font-bold text-brand-navy-800 dark:text-white">
              {currentQuestion.section}
            </span>
            <span className="text-brand-grey-500 font-mono">
              Question {currentQuestion.number} of {totalQuestions} &bull; 1 Mark
            </span>
          </div>

          {/* Question Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-brand-red-500 uppercase tracking-wider">
                Question {currentQuestion.number}
              </span>
              <p className="text-base sm:text-lg font-bold text-brand-navy-950 dark:text-white leading-relaxed whitespace-pre-wrap">
                {currentQuestion.questionText}
              </p>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((optionText, optIdx) => {
                const optionLetter = ["A", "B", "C", "D"][optIdx];
                const isSelected = answers[currentQuestion.number] === optIdx;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-4 text-sm ${
                      isSelected
                        ? "border-brand-navy-700 bg-brand-navy-50/70 dark:bg-brand-navy-800 dark:border-brand-navy-600 text-brand-navy-950 dark:text-white ring-2 ring-brand-navy-600 shadow-sm"
                        : "border-brand-grey-200 dark:border-brand-navy-800 hover:border-brand-grey-300 dark:hover:border-brand-navy-700 bg-white dark:bg-brand-navy-950 text-brand-grey-800 dark:text-brand-grey-200"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? "bg-brand-navy-700 text-white"
                          : "bg-brand-grey-100 dark:bg-brand-navy-800 text-brand-grey-600 dark:text-brand-grey-400"
                      }`}
                    >
                      {optionLetter}
                    </div>
                    <span className="font-medium flex-1">{optionText}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-brand-navy-700 dark:text-sky-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Question Controls */}
            <div className="pt-4 border-t border-brand-grey-100 dark:border-brand-navy-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleFlag}
                  className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 font-bold transition-colors ${
                    flagged[currentQuestion.number]
                      ? "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                      : "border-brand-grey-300 dark:border-brand-navy-700 text-brand-grey-600 dark:text-brand-grey-400 hover:bg-brand-grey-50"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>
                    {flagged[currentQuestion.number] ? "Flagged for Review" : "Flag for Review"}
                  </span>
                </button>

                {answers[currentQuestion.number] !== undefined && (
                  <button
                    type="button"
                    onClick={handleClearOption}
                    className="px-3 py-2 rounded-xl text-brand-grey-500 hover:text-brand-red-500 font-semibold"
                  >
                    Clear Response
                  </button>
                )}
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => goToQuestion(currentQuestionIndex - 1)}
                  className="px-4 py-2 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 disabled:opacity-40 font-bold flex items-center gap-1 text-brand-navy-900 dark:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  disabled={currentQuestionIndex === totalQuestions - 1}
                  onClick={() => goToQuestion(currentQuestionIndex + 1)}
                  className="px-4 py-2 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 disabled:opacity-40 text-white font-bold flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Column: Question Palette & Section Overview */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-grey-600 dark:text-brand-grey-400">
              Question Palette (100 Qs)
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pb-3 border-b border-brand-grey-100 dark:border-brand-navy-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-600 flex-shrink-0" />
                <span className="text-brand-grey-600 dark:text-brand-grey-400">
                  Answered ({answeredCount})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md bg-amber-500 flex-shrink-0" />
                <span className="text-brand-grey-600 dark:text-brand-grey-400">
                  Flagged ({flaggedCount})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md bg-brand-navy-700 ring-2 ring-brand-red-500 flex-shrink-0" />
                <span className="text-brand-grey-600 dark:text-brand-grey-400">Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md bg-brand-grey-200 dark:bg-brand-navy-800 flex-shrink-0" />
                <span className="text-brand-grey-600 dark:text-brand-grey-400">
                  Unanswered ({unansweredCount})
                </span>
              </div>
            </div>

            {/* Question Quick Jump Grid */}
            <div className="max-h-[360px] overflow-y-auto p-1">
              <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-1.5">
                {ALL_ASSESSMENT_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = answers[q.number] !== undefined;
                  const isFlagged = Boolean(flagged[q.number]);

                  let btnCls = "bg-brand-grey-100 dark:bg-brand-navy-950 text-brand-grey-700 dark:text-brand-grey-300";
                  if (isAnswered) {
                    btnCls = "bg-emerald-600 text-white font-bold";
                  }
                  if (isFlagged) {
                    btnCls = "bg-amber-500 text-white font-bold";
                  }
                  if (isCurrent) {
                    btnCls += " ring-2 ring-brand-red-500 scale-105 z-10";
                  }

                  return (
                    <button
                      key={q.number}
                      type="button"
                      onClick={() => goToQuestion(idx)}
                      className={`h-8 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center ${btnCls}`}
                    >
                      {q.number}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section Switcher Buttons */}
            <div className="pt-2 border-t border-brand-grey-100 dark:border-brand-navy-800 space-y-1.5 text-xs">
              <span className="text-[11px] font-bold text-brand-grey-400 uppercase tracking-wider block">
                Jump to Section:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {ASSESSMENT_METADATA.sections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => goToQuestion(sec.start - 1)}
                    className="p-1.5 px-2 rounded-lg bg-brand-grey-50 dark:bg-brand-navy-950 hover:bg-brand-grey-100 dark:hover:bg-brand-navy-800 text-[11px] text-brand-navy-900 dark:text-white font-semibold text-left truncate"
                  >
                    {sec.title.split("—")[1]?.split("(")[0]} ({sec.start}–{sec.end})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-brand-navy-900 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-brand-grey-200 dark:border-brand-navy-800 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-brand-red-500/10 text-brand-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-brand-navy-950 dark:text-white">
                Submit Examination?
              </h3>
              <p className="text-xs sm:text-sm text-brand-grey-500 dark:text-brand-grey-400">
                Are you sure you want to finish your assessment? You cannot modify your answers once
                submitted.
              </p>
            </div>

            {/* Summary statistics */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 text-center text-xs">
              <div>
                <span className="text-brand-grey-400 block">Total</span>
                <span className="text-base font-black text-brand-navy-950 dark:text-white">
                  {totalQuestions}
                </span>
              </div>
              <div>
                <span className="text-brand-grey-400 block">Answered</span>
                <span className="text-base font-black text-emerald-600">{answeredCount}</span>
              </div>
              <div>
                <span className="text-brand-grey-400 block">Remaining</span>
                <span className="text-base font-black text-brand-red-500">
                  {unansweredCount}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="w-1/2 py-3 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 font-bold text-xs uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 hover:bg-brand-grey-50"
              >
                Back to Exam
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitExam}
                className="w-1/2 py-3 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-red-glow flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Grading...</span>
                  </>
                ) : (
                  <span>Yes, Submit</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

