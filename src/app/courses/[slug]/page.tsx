"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  BookOpen,
  Award,
  Star,
  Users,
  CheckCircle2,
  ChevronDown,
  PlayCircle,
  Lock,
  ArrowRight,
  ShieldCheck,
  Share2,
  FileText,
  User,
  AlertCircle,
} from "lucide-react";
import { getCourseBySlug, FullCourse } from "@/lib/courses-data";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  isEnrolledInCourse,
  saveLocalEnrollment,
  getCourseProgress,
} from "@/lib/enrollment-service";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { user, profile } = useAuth();
  const course = getCourseBySlug(slug);

  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [enrolling, setEnrolling] = useState(false);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const isAlready = isEnrolledInCourse(slug);
      setEnrolled(isAlready);
      if (isAlready) {
        setProgress(getCourseProgress(slug));
      }
    }
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 text-center">
        <div className="space-y-4 max-w-md">
          <h2 className="text-2xl font-bold text-brand-navy-950 dark:text-white">
            Course Not Found
          </h2>
          <p className="text-sm text-brand-grey-500">
            The course you requested does not exist or may have been unlisted.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy-700 text-white font-bold text-sm"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!user && !profile) {
      router.push(`/login?redirect=/courses/${slug}`);
      return;
    }

    setEnrolling(true);
    setAlertMsg(null);

    try {
      if (isSupabaseConfigured() && user) {
        const supabase = createClient();
        // Insert enrollment in Supabase
        await supabase
          .from("enrollments")
          .upsert({
            user_id: user.id,
            course_id: course.id,
            status: "active",
            progress_percent: 0,
          })
          .select();
      }

      // Save local enrollment state
      saveLocalEnrollment({
        courseId: course.id,
        courseSlug: course.slug,
        enrolledAt: new Date().toISOString(),
        progressPercent: 0,
        completedLessons: [],
      });

      setEnrolled(true);
      router.push(`/courses/${course.slug}/learn`);
    } catch (err: any) {
      setAlertMsg("Enrolled in local mode. Taking you to lesson player...");
      setEnrolled(true);
      router.push(`/courses/${course.slug}/learn`);
    } finally {
      setEnrolling(false);
    }
  };

  const toggleModule = (index: number) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  return (
    <div className="bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Course Banner Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-navy-900 via-brand-navy-950 to-brand-navy-950 text-white border border-brand-navy-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header info */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-sm">
                  {course.category}
                </span>
                {course.badge && (
                  <span className="px-3 py-1 rounded-full bg-brand-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                    {course.badge}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-brand-navy-800 text-brand-grey-300 font-semibold text-xs">
                  {course.difficultyLevel}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-brand-grey-300 leading-relaxed max-w-3xl">
                {course.description}
              </p>

              {/* Metadata strip */}
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-brand-grey-300 pt-2 border-t border-brand-navy-800">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{course.rating} / 5.0</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-brand-navy-400" />
                  <span>{course.studentsEnrolled.toLocaleString()} Students Enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-navy-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-brand-red-400" />
                  <span>Official Certificate Included</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-2">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/20">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs">
                  <div className="text-brand-grey-400">Taught by</div>
                  <div className="font-bold text-white text-sm">{course.instructor.name}</div>
                </div>
              </div>
            </div>

            {/* Right Card: Pricing & Enrollment CTA */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 p-6 text-brand-navy-950 dark:text-white shadow-2xl space-y-5">
                <div className="relative h-44 w-full rounded-xl overflow-hidden bg-brand-grey-100 dark:bg-brand-navy-950">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <div className="text-xs uppercase font-bold text-brand-grey-400 tracking-wider">
                    Full Program Access
                  </div>
                  <div className="text-3xl font-black text-brand-navy-950 dark:text-white">
                    {course.isFree ? (
                      <span className="text-emerald-600 dark:text-emerald-400">Free</span>
                    ) : (
                      formatCurrency(course.price)
                    )}
                  </div>
                </div>

                {enrolled ? (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                      <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300">
                        <span>You are enrolled!</span>
                        <span>{progress}% complete</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-emerald-200 dark:bg-emerald-900 mt-2 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/courses/${course.slug}/learn`}
                      className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <PlayCircle className="w-5 h-5" />
                      <span>Continue Learning</span>
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full py-3.5 px-4 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-sm shadow-red-glow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>
                      {enrolling
                        ? "Enrolling You..."
                        : course.isFree
                        ? "Enroll Now — Free"
                        : `Enroll Now — ${formatCurrency(course.price)}`}
                    </span>
                  </button>
                )}

                <div className="space-y-2 text-xs text-brand-grey-500 dark:text-brand-grey-400 pt-2 border-t border-brand-grey-100 dark:border-brand-navy-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Full lifetime access to all lessons & PDFs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Verifiable completion certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Access to Xerox LMS AI Tutor assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Details Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Left Content: Curriculum, What you'll learn, Instructor */}
          <div className="lg:col-span-8 space-y-10">
            {/* What you'll learn */}
            <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
              <h2 className="text-2xl font-bold text-brand-navy-950 dark:text-white">
                What You Will Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-grey-700 dark:text-brand-grey-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum & Modules */}
            <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-brand-navy-950 dark:text-white">
                    Course Curriculum
                  </h2>
                  <p className="text-xs text-brand-grey-500 dark:text-brand-grey-400 mt-1">
                    {course.modules.length} Modules &bull; {course.lessonsCount} Lessons &bull; {course.duration}
                  </p>
                </div>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-3">
                {course.modules.map((mod, modIdx) => {
                  const isOpen = openModuleIndex === modIdx;
                  return (
                    <div
                      key={mod.id}
                      className="rounded-2xl border border-brand-grey-200 dark:border-brand-navy-800 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleModule(modIdx)}
                        className="w-full p-4 sm:p-5 bg-brand-grey-50 dark:bg-brand-navy-950 flex items-center justify-between text-left font-bold text-sm sm:text-base text-brand-navy-950 dark:text-white hover:bg-brand-grey-100 dark:hover:bg-brand-navy-900 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-brand-navy-700 text-white text-xs font-bold flex items-center justify-center">
                            {modIdx + 1}
                          </span>
                          <span>{mod.title}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-brand-grey-500">
                          <span>{mod.lessons.length} Lessons</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-brand-red-500" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="divide-y divide-brand-grey-100 dark:divide-brand-navy-800 bg-white dark:bg-brand-navy-900">
                          {mod.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="p-4 flex items-center justify-between text-xs sm:text-sm text-brand-grey-700 dark:text-brand-grey-300 hover:bg-brand-grey-50/50 dark:hover:bg-brand-navy-950 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.isPreview || enrolled ? (
                                  <PlayCircle className="w-4 h-4 text-brand-navy-600 dark:text-sky-400" />
                                ) : (
                                  <Lock className="w-4 h-4 text-brand-grey-400" />
                                )}
                                <span className="font-medium text-brand-navy-950 dark:text-white">
                                  {lesson.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                {lesson.isPreview && (
                                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-brand-navy-50 dark:bg-brand-navy-800 text-brand-navy-700 dark:text-sky-300">
                                    Free Preview
                                  </span>
                                )}
                                <span className="text-brand-grey-400 font-mono text-xs">
                                  {lesson.durationMinutes}m
                                </span>
                                {(lesson.isPreview || enrolled) && (
                                  <Link
                                    href={`/courses/${course.slug}/learn?lesson=${lesson.id}`}
                                    className="text-brand-red-500 font-bold hover:underline"
                                  >
                                    Play
                                  </Link>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Bio */}
            <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
              <h2 className="text-2xl font-bold text-brand-navy-950 dark:text-white">
                About Your Instructor
              </h2>
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-brand-navy-500/30 flex-shrink-0">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white">
                    {course.instructor.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-navy-600 dark:text-sky-400">
                    {course.instructor.title}
                  </p>
                  <p className="text-sm text-brand-grey-600 dark:text-brand-grey-300 pt-1 leading-relaxed">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info: Requirements & Verification */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
              <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
                Course Requirements
              </h3>
              <ul className="space-y-2 text-xs text-brand-grey-600 dark:text-brand-grey-300">
                {course.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red-500 mt-1.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-brand-navy-900 text-white border border-brand-navy-800 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-red-500/20 text-brand-red-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Earn an Official Certificate</h3>
              <p className="text-xs text-brand-grey-300 leading-relaxed">
                Complete all course modules and achieve passing marks on the comprehensive test to
                unlock a cryptographic, verifiable Xerox LMS Certificate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

