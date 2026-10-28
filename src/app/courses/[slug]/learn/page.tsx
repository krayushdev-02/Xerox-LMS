"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  PlayCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Download,
  FileText,
  Sparkles,
  ArrowLeft,
  Menu,
  X,
  Award,
} from "lucide-react";
import { getCourseBySlug, LessonItem } from "@/lib/courses-data";
import {
  getLocalEnrollments,
  markLessonCompleted,
  getCourseProgress,
} from "@/lib/enrollment-service";

export default function LearnPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = params.slug as string;
  const course = getCourseBySlug(slug);

  const [activeLessonId, setActiveLessonId] = useState<string>("");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Flatten all lessons for sequential navigation
  const allLessons: LessonItem[] = React.useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap((m) => m.lessons);
  }, [course]);

  useEffect(() => {
    if (!course || allLessons.length === 0) return;

    // Load completed lessons from enrollment state
    const enrollments = getLocalEnrollments();
    const enrollment = enrollments[slug];
    const completed = enrollment?.completedLessons || [];
    setCompletedLessonIds(completed);
    setProgress(enrollment?.progressPercent || 0);

    // Initial active lesson from query or first lesson
    const requestedLessonId = searchParams.get("lesson");
    if (requestedLessonId && allLessons.some((l) => l.id === requestedLessonId)) {
      setActiveLessonId(requestedLessonId);
    } else {
      // Find first uncompleted lesson, or fall back to first lesson
      const firstUncompleted = allLessons.find((l) => !completed.includes(l.id));
      setActiveLessonId(firstUncompleted ? firstUncompleted.id : allLessons[0].id);
    }
  }, [course, slug, searchParams, allLessons]);

  if (!course) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Course not found</h2>
          <Link href="/courses" className="text-brand-navy-700 underline text-sm">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const activeLessonIndex = allLessons.findIndex((l) => l.id === activeLesson?.id);
  const hasPrevious = activeLessonIndex > 0;
  const hasNext = activeLessonIndex < allLessons.length - 1;
  const isCurrentCompleted = completedLessonIds.includes(activeLesson?.id);

  const handleToggleComplete = () => {
    if (!activeLesson) return;
    const newPercent = markLessonCompleted(slug, activeLesson.id, allLessons.length);
    setProgress(newPercent);
    if (!completedLessonIds.includes(activeLesson.id)) {
      setCompletedLessonIds([...completedLessonIds, activeLesson.id]);
    }

    // Auto advance to next lesson if available
    if (hasNext) {
      const nextLesson = allLessons[activeLessonIndex + 1];
      setActiveLessonId(nextLesson.id);
    }
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
  };

  return (
    <div className="min-h-screen bg-brand-grey-50 dark:bg-brand-navy-950 flex flex-col">
      {/* Top Learning Bar */}
      <div className="sticky top-0 z-40 bg-white dark:bg-brand-navy-900 border-b border-brand-grey-200 dark:border-brand-navy-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href={`/courses/${slug}`}
            className="p-2 rounded-xl text-brand-grey-500 hover:text-brand-navy-800 dark:hover:text-white hover:bg-brand-grey-100 dark:hover:bg-brand-navy-800 transition-colors"
            title="Back to Course Details"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-brand-navy-950 dark:text-white line-clamp-1">
              {course.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-brand-grey-500">
              <span>{activeLesson?.title}</span>
              <span>&bull;</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {progress}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Link
            href={`/ai-tutor?prompt=${encodeURIComponent(
              `I am studying the lesson "${activeLesson?.title}" in ${course.title}. Can you explain this topic in simple terms with an example?`
            )}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-red-50 dark:bg-brand-red-950/40 text-brand-red-600 dark:text-brand-red-400 border border-brand-red-200 dark:border-brand-red-800 text-xs font-bold hover:bg-brand-red-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Tutor</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl border border-brand-grey-200 dark:border-brand-navy-700 text-brand-grey-700 dark:text-brand-grey-300 lg:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Learning Split: Video/Content Left & Curriculum Sidebar Right */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Lesson Player & Notes */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 max-w-5xl mx-auto w-full">
          {/* Video Player */}
          <div className="rounded-3xl overflow-hidden bg-black shadow-2xl ring-1 ring-black/10 aspect-video relative">
            <iframe
              src={activeLesson?.videoUrl || "https://www.youtube.com/embed/kqtD5dpn9C8"}
              title={activeLesson?.title || "Lesson Video"}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Navigation & Completion Action Bar */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <button
                disabled={!hasPrevious}
                onClick={() => handleSelectLesson(allLessons[activeLessonIndex - 1].id)}
                className="px-4 py-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 disabled:opacity-40 text-xs font-bold flex items-center gap-1.5 hover:bg-brand-grey-50 dark:hover:bg-brand-navy-800 text-brand-navy-900 dark:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                disabled={!hasNext}
                onClick={() => handleSelectLesson(allLessons[activeLessonIndex + 1].id)}
                className="px-4 py-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 disabled:opacity-40 text-xs font-bold flex items-center gap-1.5 hover:bg-brand-grey-50 dark:hover:bg-brand-navy-800 text-brand-navy-900 dark:text-white"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleToggleComplete}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 ${
                isCurrentCompleted
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-brand-navy-700 hover:bg-brand-navy-800 text-white"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCurrentCompleted ? "Completed (Advance)" : "Mark Complete & Next"}</span>
            </button>
          </div>

          {/* Lesson Text, Code & PDF Resources */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-grey-200 dark:border-brand-navy-800 flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold text-brand-navy-600 dark:text-sky-400 uppercase tracking-wider">
                  Lesson Notes & Study Guide
                </span>
                <h2 className="text-2xl font-bold text-brand-navy-950 dark:text-white">
                  {activeLesson?.title}
                </h2>
              </div>

              {activeLesson?.pdfUrl && (
                <a
                  href={activeLesson.pdfUrl}
                  download
                  className="px-3.5 py-2 rounded-xl bg-brand-grey-100 dark:bg-brand-navy-800 hover:bg-brand-grey-200 text-brand-navy-900 dark:text-white text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-brand-red-500" />
                  <span>Download PDF Notes</span>
                </a>
              )}
            </div>

            {/* Markdown Lesson Content */}
            <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-brand-grey-800 dark:text-brand-grey-200 space-y-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: activeLesson?.content
                    ? activeLesson.content.replace(/\n/g, "<br/>")
                    : "No text notes provided for this lesson.",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: Modules & Lessons Navigation Sidebar */}
        <aside
          className={`w-full lg:w-96 bg-white dark:bg-brand-navy-900 border-l border-brand-grey-200 dark:border-brand-navy-800 flex-shrink-0 flex flex-col h-[600px] lg:h-[calc(100vh-65px)] ${
            sidebarOpen ? "block" : "hidden lg:flex"
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-brand-grey-200 dark:border-brand-navy-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-brand-navy-950 dark:text-white">
                Course Curriculum
              </h3>
              <span className="text-xs text-brand-grey-500">
                {completedLessonIds.length} / {allLessons.length} Done
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-brand-grey-200 dark:bg-brand-navy-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Module List */}
          <div className="flex-1 overflow-y-auto divide-y divide-brand-grey-200 dark:divide-brand-navy-800">
            {course.modules.map((module, mIdx) => (
              <div key={module.id} className="p-3">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-grey-500 dark:text-brand-grey-400 mb-2 px-2">
                  {module.title}
                </div>
                <div className="space-y-1">
                  {module.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    const isCompleted = completedLessonIds.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleSelectLesson(lesson.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 text-xs ${
                          isActive
                            ? "bg-brand-navy-700 text-white font-bold shadow-sm"
                            : "hover:bg-brand-grey-100 dark:hover:bg-brand-navy-800 text-brand-grey-700 dark:text-brand-grey-300"
                        }`}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle2
                              className={`w-4 h-4 ${isActive ? "text-emerald-300" : "text-emerald-500"}`}
                            />
                          ) : (
                            <PlayCircle
                              className={`w-4 h-4 ${isActive ? "text-white" : "text-brand-grey-400"}`}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="line-clamp-2">{lesson.title}</div>
                          <div
                            className={`text-[10px] mt-0.5 ${
                              isActive ? "text-white/80" : "text-brand-grey-400"
                            }`}
                          >
                            {lesson.durationMinutes} mins
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer Link */}
          {progress === 100 && (
            <div className="p-4 border-t border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-center space-y-2">
              <Award className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Course Completed!
              </div>
              <Link
                href="/certificates"
                className="inline-block px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                View Your Certificate
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

