"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  Sparkles,
  PlayCircle,
  FileText,
  CheckCircle2,
  AlertCircle,
  Bell,
  ArrowRight,
  TrendingUp,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { DETAILED_COURSES, FullCourse } from "@/lib/courses-data";
import { getLocalEnrollments, EnrollmentState } from "@/lib/enrollment-service";

export default function StudentDashboard() {
  const router = useRouter();
  const { user, profile, role, loading } = useAuth();

  const [enrollments, setEnrollments] = useState<Record<string, EnrollmentState>>({});
  const [activeTab, setActiveTab] = useState<
    "courses" | "exams" | "assignments" | "certificates" | "notifications"
  >("courses");

  useEffect(() => {
    // Load enrolled courses from service
    const local = getLocalEnrollments();
    // If no courses are enrolled yet, pre-populate default starter enrollment in Python bootcamp
    if (Object.keys(local).length === 0) {
      local["complete-python-bootcamp"] = {
        courseId: "course-python-1",
        courseSlug: "complete-python-bootcamp",
        enrolledAt: new Date().toISOString(),
        progressPercent: 38,
        completedLessons: ["les-py-1", "les-py-2", "les-py-3"],
      };
      local["modern-web-development-html-css-js"] = {
        courseId: "course-web-2",
        courseSlug: "modern-web-development-html-css-js",
        enrolledAt: new Date().toISOString(),
        progressPercent: 17,
        completedLessons: ["les-web-1"],
      };
    }
    setEnrollments(local);
  }, []);

  const enrolledCoursesList = React.useMemo(() => {
    return Object.keys(enrollments)
      .map((slug) => {
        const found = DETAILED_COURSES.find((c) => c.slug === slug);
        if (!found) return null;
        return {
          ...found,
          progressPercent: enrollments[slug].progressPercent,
          completedCount: enrollments[slug].completedLessons.length,
        };
      })
      .filter(Boolean) as (FullCourse & { progressPercent: number; completedCount: number })[];
  }, [enrollments]);

  // Featured "Continue Learning" course is the one with progress
  const continueCourse = enrolledCoursesList[0];

  // Sample student assignments
  const studentAssignments = [
    {
      id: "asg-1",
      course: "Complete Python Bootcamp",
      title: "Assignment 1: Build a Command-Line Todo Manager in Python",
      dueDate: "November 5, 2026",
      status: "Graded",
      score: "95 / 100",
      gradeBadge: "A+",
    },
    {
      id: "asg-2",
      course: "Modern Web Development",
      title: "Assignment 2: Responsive Flexbox & Grid Portfolio",
      dueDate: "November 12, 2026",
      status: "Submitted",
      score: "Pending Review",
      gradeBadge: "Under Review",
    },
  ];

  // Sample exam results
  const studentExamResults = [
    {
      id: "res-1",
      examTitle: "Technical Knowledge Assessment — Computer Programming & Web Tech",
      date: "October 24, 2026",
      score: "92 / 100",
      percentage: "92%",
      status: "PASSED",
      certificateCode: "XLR-2026-0042",
    },
  ];

  // Sample certificates
  const studentCertificates = [
    {
      id: "cert-1",
      title: "Computer Programming & Web Technologies Assessment",
      certificateCode: "XLR-2026-0042",
      issuedDate: "October 24, 2026",
      score: "92%",
    },
  ];

  // Sample notifications
  const studentNotifications = [
    {
      id: "notif-1",
      title: "100-Question Exam Assessment Live",
      message:
        "The Technical Knowledge Assessment is now open. Test your skills across HTML, CSS, JS, C, Python, and SQL.",
      time: "2 hours ago",
      type: "exam",
    },
    {
      id: "notif-2",
      title: "Certificate Issued!",
      message:
        "Congratulations! Your official Xerox LMS completion certificate (ID: XLR-2026-0042) has been generated.",
      time: "3 days ago",
      type: "certificate",
    },
  ];

  return (
    <div className="py-10 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-navy-900 via-brand-navy-950 to-brand-navy-900 text-white border border-brand-navy-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Learning Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Welcome back, {profile?.full_name || "Student"}! 👋
            </h1>
            <p className="text-sm text-brand-grey-300 max-w-xl">
              Track your course progression, attend scheduled online examinations, and verify your
              earned credentials with Xerox LMS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/ai-tutor"
              className="px-4 py-2.5 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-xs flex items-center gap-2 shadow-red-glow transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Tutor</span>
            </Link>
            <Link
              href="/profile"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile Settings</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-brand-grey-400 text-xs font-bold uppercase tracking-wider">
              Enrolled Courses
            </div>
            <div className="text-2xl font-black text-brand-navy-950 dark:text-white mt-1">
              {enrolledCoursesList.length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-brand-grey-400 text-xs font-bold uppercase tracking-wider">
              Completed Lessons
            </div>
            <div className="text-2xl font-black text-brand-navy-950 dark:text-white mt-1">
              {enrolledCoursesList.reduce((acc, c) => acc + c.completedCount, 0)}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-brand-grey-400 text-xs font-bold uppercase tracking-wider">
              Exams Passed
            </div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              1
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-brand-grey-400 text-xs font-bold uppercase tracking-wider">
              Certificates Earned
            </div>
            <div className="text-2xl font-black text-brand-red-500 mt-1">1</div>
          </div>
        </div>

        {/* Continue Learning Spotlight Banner */}
        {continueCourse && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-navy-200 dark:border-brand-navy-800 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 w-full md:w-auto">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-brand-grey-100 flex-shrink-0">
                <Image
                  src={continueCourse.thumbnail}
                  alt={continueCourse.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red-500">
                  Continue Where You Left Off
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-brand-navy-950 dark:text-white line-clamp-1">
                  {continueCourse.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-brand-grey-500">
                  <span>{continueCourse.completedCount} of {continueCourse.lessonsCount} lessons complete</span>
                  <span>&bull;</span>
                  <span className="font-bold text-emerald-600">{continueCourse.progressPercent}%</span>
                </div>
                <div className="w-full sm:w-72 h-2 rounded-full bg-brand-grey-200 dark:bg-brand-navy-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${continueCourse.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <Link
              href={`/courses/${continueCourse.slug}/learn`}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-soft transition-all"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Resume Lesson</span>
            </Link>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-brand-grey-200 dark:border-brand-navy-800 pb-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "courses"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Enrolled Courses ({enrolledCoursesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("exams")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "exams"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950 dark:hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Exams & Results</span>
          </button>

          <button
            onClick={() => setActiveTab("assignments")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "assignments"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950 dark:hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Assignments</span>
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "certificates"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950 dark:hover:text-white"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certificates ({studentCertificates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "notifications"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950 dark:hover:text-white"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications ({studentNotifications.length})</span>
          </button>
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
                My Enrolled Courses
              </h2>
              <Link
                href="/courses"
                className="text-xs font-bold text-brand-navy-700 dark:text-sky-300 hover:underline flex items-center gap-1"
              >
                <span>Browse More Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCoursesList.map((course) => (
                <div
                  key={course.id}
                  className="rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 overflow-hidden shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-lg bg-white/90 dark:bg-brand-navy-900/90 text-brand-navy-900 dark:text-white backdrop-blur-sm">
                        {course.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-base font-bold text-brand-navy-950 dark:text-white line-clamp-2">
                        {course.title}
                      </h3>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-brand-grey-500">Progress</span>
                          <span className="text-emerald-600">{course.progressPercent}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-brand-grey-100 dark:bg-brand-navy-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${course.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/courses/${course.slug}/learn`}
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>{course.progressPercent > 0 ? "Continue Course" : "Start Course"}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Exams & Results */}
        {activeTab === "exams" && (
          <div className="space-y-6">
            {/* Active Exam Card */}
            <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-brand-red-50 dark:bg-brand-red-950/40 border border-brand-red-200 dark:border-brand-red-800 text-brand-red-600 dark:text-brand-red-400 text-xs font-bold uppercase tracking-wider">
                    Official Proctored Exam
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    Active
                  </span>
                </div>
                <div className="text-xs font-mono text-brand-grey-500">Duration: 90 Minutes</div>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-brand-navy-950 dark:text-white">
                  Technical Knowledge Assessment — Computer Programming & Web Technology
                </h3>
                <p className="text-sm text-brand-grey-600 dark:text-brand-grey-400 mt-2 leading-relaxed">
                  100-question objective assessment covering HTML, CSS, JavaScript, C Programming,
                  Python, and SQL. Time allowed: 90 minutes. Maximum marks: 100. Passing marks: 40.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/exams"
                  className="px-6 py-3.5 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-red-glow"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Start Examination</span>
                </Link>
              </div>
            </div>

            {/* Exam Results History */}
            <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
              <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white">
                Examination Results History
              </h3>
              <div className="divide-y divide-brand-grey-200 dark:divide-brand-navy-800">
                {studentExamResults.map((res) => (
                  <div key={res.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-brand-navy-950 dark:text-white">
                        {res.examTitle}
                      </div>
                      <div className="text-xs text-brand-grey-400 mt-0.5">Attempted on {res.date}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-black text-brand-navy-900 dark:text-white">
                          {res.score} ({res.percentage})
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded font-extrabold uppercase bg-emerald-100 text-emerald-700">
                          {res.status}
                        </span>
                      </div>
                      <Link
                        href={`/certificates?code=${res.certificateCode}`}
                        className="px-3 py-1.5 rounded-lg border border-brand-navy-700 text-brand-navy-700 dark:text-white text-xs font-bold hover:bg-brand-navy-50"
                      >
                        View Certificate
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Assignments */}
        {activeTab === "assignments" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              Course Practical Assignments
            </h2>
            <div className="divide-y divide-brand-grey-200 dark:divide-brand-navy-800">
              {studentAssignments.map((asg) => (
                <div key={asg.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-brand-red-500">{asg.course}</span>
                    <h4 className="text-sm font-bold text-brand-navy-950 dark:text-white">
                      {asg.title}
                    </h4>
                    <p className="text-xs text-brand-grey-400">Due: {asg.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-brand-grey-100 dark:bg-brand-navy-800 text-brand-navy-900 dark:text-white">
                      {asg.score}
                    </span>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-700">
                      {asg.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Certificates */}
        {activeTab === "certificates" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              My Official Certificates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studentCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-brand-red-500/10 text-brand-red-500 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                      Verified
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-mono text-brand-navy-600 dark:text-sky-300 mt-1">
                      ID: {cert.certificateCode}
                    </div>
                    <div className="text-xs text-brand-grey-500 mt-0.5">
                      Issued: {cert.issuedDate} &bull; Score: {cert.score}
                    </div>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      href={`/certificates?code=${cert.certificateCode}`}
                      className="px-4 py-2 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify Credential</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Notifications */}
        {activeTab === "notifications" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              Announcements & Alerts
            </h2>
            <div className="space-y-3">
              {studentNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-4 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-brand-navy-950 dark:text-white">
                      {notif.title}
                    </h4>
                    <span className="text-[11px] text-brand-grey-400">{notif.time}</span>
                  </div>
                  <p className="text-xs text-brand-grey-600 dark:text-brand-grey-400">
                    {notif.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

