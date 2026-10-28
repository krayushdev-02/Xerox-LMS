"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  BookOpen,
  PlusCircle,
  Users,
  Award,
  Calendar,
  CheckCircle2,
  FileText,
  Upload,
  Edit3,
  Trash2,
  Save,
  Search,
  Check,
  X,
  Clock,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { DETAILED_COURSES, FullCourse } from "@/lib/courses-data";
import { POPULAR_CATEGORIES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export default function TeacherDashboard() {
  const { user, profile } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "courses" | "students" | "attendance" | "assignments" | "exams" | "certificates"
  >("courses");

  // Courses state
  const [courses, setCourses] = useState<FullCourse[]>(DETAILED_COURSES.slice(0, 3));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("Python");
  const [newCourseDifficulty, setNewCourseDifficulty] = useState("Beginner");
  const [newCoursePrice, setNewCoursePrice] = useState("0");
  const [newCourseDesc, setNewCourseDesc] = useState("");

  // Sample enrolled students
  const [students, setStudents] = useState([
    {
      id: "std-1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      course: "Complete Python Bootcamp",
      progress: 85,
      joinedDate: "October 10, 2026",
      status: "Active",
    },
    {
      id: "std-2",
      name: "Pooja Verma",
      email: "pooja@example.com",
      course: "Modern Web Development",
      progress: 60,
      joinedDate: "October 14, 2026",
      status: "Active",
    },
    {
      id: "std-3",
      name: "Vikram Singh",
      email: "vikram@example.com",
      course: "Complete Python Bootcamp",
      progress: 100,
      joinedDate: "October 5, 2026",
      status: "Eligible for Certificate",
    },
    {
      id: "std-4",
      name: "Ananya Patel",
      email: "ananya@example.com",
      course: "C & C++ Masterclass",
      progress: 45,
      joinedDate: "October 18, 2026",
      status: "Active",
    },
  ]);

  // Attendance state
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, string>>({
    "std-1": "present",
    "std-2": "present",
    "std-3": "present",
    "std-4": "absent",
  });
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  // Student assignment submissions state
  const [submissions, setSubmissions] = useState([
    {
      id: "sub-1",
      studentName: "Rahul Sharma",
      assignmentTitle: "Build a Command-Line Todo Manager in Python",
      course: "Complete Python Bootcamp",
      submittedDate: "October 26, 2026",
      fileUrl: "https://github.com/rahul/python-todo",
      score: 95,
      feedback: "Clean OOP structure and good exception handling.",
      status: "Graded",
    },
    {
      id: "sub-2",
      studentName: "Pooja Verma",
      assignmentTitle: "Responsive Flexbox & Grid Portfolio",
      course: "Modern Web Development",
      submittedDate: "October 27, 2026",
      fileUrl: "https://github.com/pooja/web-portfolio",
      score: 0,
      feedback: "",
      status: "Pending Review",
    },
  ]);

  // Question bank state
  const [questionsList, setQuestionsList] = useState([
    {
      id: "q-custom-1",
      text: "Which of the following data structures operates on FIFO (First In, First Out) principle?",
      optionA: "Stack",
      optionB: "Queue",
      optionC: "Tree",
      optionD: "Graph",
      correct: "B",
      marks: 1,
    },
    {
      id: "q-custom-2",
      text: "What does the SQL command TRUNCATE TABLE do?",
      optionA: "Deletes the table schema entirely",
      optionB: "Removes all rows from a table rapidly without logging individual row deletions",
      optionC: "Modifies table column types",
      optionD: "Creates a backup copy",
      correct: "B",
      marks: 1,
    },
  ]);

  const [newQText, setNewQText] = useState("");
  const [newOptA, setNewOptA] = useState("");
  const [newOptB, setNewOptB] = useState("");
  const [newOptC, setNewOptC] = useState("");
  const [newOptD, setNewOptD] = useState("");
  const [newQCorrect, setNewQCorrect] = useState("A");

  // Certificate issuance state
  const [issuedCerts, setIssuedCerts] = useState([
    {
      id: "cert-t-1",
      studentName: "Vikram Singh",
      courseTitle: "Complete Python Bootcamp: From Zero to Hero",
      certificateCode: "XLR-2026-9041",
      issuedDate: "October 28, 2026",
      signatory: "Prof. Ayush Kumar",
    },
  ]);

  // Handlers
  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const newSlug = newCourseTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const created: FullCourse = {
      id: `course-custom-${Date.now()}`,
      slug: newSlug,
      title: newCourseTitle,
      description: newCourseDesc || "Course created by instructor.",
      longDescription: newCourseDesc || "Full curriculum details.",
      instructor: {
        name: profile?.full_name || "Faculty Instructor",
        title: "Course Instructor",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
        bio: "Faculty Instructor at Xerox LMS.",
      },
      category: newCourseCategory,
      difficultyLevel: newCourseDifficulty as any,
      language: "English",
      price: Number(newCoursePrice),
      isFree: Number(newCoursePrice) === 0,
      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
      duration: "10 Hours",
      lessonsCount: 1,
      rating: 5.0,
      studentsEnrolled: 0,
      badge: "New",
      hasCertificate: true,
      learningOutcomes: ["Master core concepts", "Complete hands-on assignments"],
      requirements: ["Basic computer literacy"],
      modules: [
        {
          id: `mod-${Date.now()}`,
          title: "Module 1: Getting Started",
          lessons: [
            {
              id: `les-${Date.now()}`,
              title: "Lesson 1: Introduction to " + newCourseTitle,
              durationMinutes: 15,
              isPreview: true,
              videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
              content: "Welcome to this new course on Xerox LMS!",
            },
          ],
        },
      ],
    };

    setCourses([created, ...courses]);
    setShowCreateModal(false);
    setNewCourseTitle("");
    setNewCourseDesc("");
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText.trim()) return;

    setQuestionsList([
      ...questionsList,
      {
        id: `q-${Date.now()}`,
        text: newQText,
        optionA: newOptA,
        optionB: newOptB,
        optionC: newOptC,
        optionD: newOptD,
        correct: newQCorrect,
        marks: 1,
      },
    ]);

    setNewQText("");
    setNewOptA("");
    setNewOptB("");
    setNewOptC("");
    setNewOptD("");
  };

  const handleGradeSubmission = (subId: string, score: number, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === subId
          ? { ...s, score, feedback, status: "Graded" }
          : s
      )
    );
  };

  const handleIssueCertificate = (studentName: string, courseTitle: string) => {
    const certCode = `XLR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setIssuedCerts([
      {
        id: `cert-${Date.now()}`,
        studentName,
        courseTitle,
        certificateCode: certCode,
        issuedDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        signatory: profile?.full_name || "Prof. Ayush Kumar",
      },
      ...issuedCerts,
    ]);
  };

  return (
    <div className="py-10 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-navy-900 via-brand-navy-950 to-brand-navy-900 text-white border border-brand-navy-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Faculty Instructor Console</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Teacher Dashboard — {profile?.full_name || "Instructor"}
            </h1>
            <p className="text-sm text-brand-grey-300 max-w-xl">
              Manage your assigned courses, upload lesson materials, review student assignments,
              record class attendance, and issue certificates.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-3 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-red-glow transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Course</span>
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-brand-grey-400 text-xs font-bold uppercase tracking-wider">
              Active Courses
            </div>
            <div className="text-2xl font-black text-brand-navy-950 dark:text-white mt-1">
              {courses.length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-brand-grey-400 text-xs font-bold uppercase tracking-wider">
              Enrolled Students
            </div>
            <div className="text-2xl font-black text-brand-navy-950 dark:text-white mt-1">
              {students.length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-brand-grey-400 text-xs font-bold uppercase tracking-wider">
              Submissions to Grade
            </div>
            <div className="text-2xl font-black text-brand-red-500 mt-1">
              {submissions.filter((s) => s.status === "Pending Review").length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-brand-grey-400 text-xs font-bold uppercase tracking-wider">
              Certificates Issued
            </div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {issuedCerts.length}
            </div>
          </div>
        </div>

        {/* Teacher Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-brand-grey-200 dark:border-brand-navy-800 pb-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "courses"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Manage Courses ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "students"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Enrolled Students ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "attendance"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Record Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab("assignments")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "assignments"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Grade Submissions ({submissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("exams")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "exams"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Question Banks & Exams</span>
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "certificates"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Issue Certificates</span>
          </button>
        </div>

        {/* Tab 1: Course Management */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
                Authorized Courses Under Instruction
              </h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="text-xs font-bold text-brand-red-500 hover:underline flex items-center gap-1"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course) => (
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
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-lg bg-white/90 text-brand-navy-900">
                        {course.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-base font-bold text-brand-navy-950 dark:text-white line-clamp-2">
                        {course.title}
                      </h3>
                      <div className="text-xs text-brand-grey-500">
                        {course.modules.length} Modules &bull; {course.lessonsCount} Lessons
                      </div>
                      <div className="text-sm font-black text-brand-navy-900 dark:text-white">
                        {course.isFree ? "Free" : formatCurrency(course.price)}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-brand-grey-100 dark:border-brand-navy-800 flex items-center justify-between">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="text-xs font-bold text-brand-navy-700 dark:text-sky-300 hover:underline"
                    >
                      View Live Page
                    </Link>
                    <Link
                      href={`/courses/${course.slug}/learn`}
                      className="px-3 py-1.5 rounded-xl bg-brand-navy-700 text-white text-xs font-semibold hover:bg-brand-navy-800"
                    >
                      Manage Lessons
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Enrolled Students */}
        {activeTab === "students" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              Enrolled Students Directory
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-grey-200 dark:border-brand-navy-800 text-brand-grey-500 font-bold uppercase">
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Enrolled Course</th>
                    <th className="py-3 px-4">Joined Date</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-grey-100 dark:divide-brand-navy-800">
                  {students.map((std) => (
                    <tr key={std.id} className="hover:bg-brand-grey-50/50 dark:hover:bg-brand-navy-950">
                      <td className="py-3.5 px-4 font-bold text-brand-navy-950 dark:text-white">
                        {std.name}
                        <div className="text-[10px] text-brand-grey-400 font-normal">{std.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-brand-grey-700 dark:text-brand-grey-300 font-medium">
                        {std.course}
                      </td>
                      <td className="py-3.5 px-4 text-brand-grey-500">{std.joinedDate}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{std.progress}%</span>
                          <div className="w-16 h-1.5 rounded-full bg-brand-grey-200 overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${std.progress}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            std.progress === 100
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {std.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {std.progress === 100 && (
                          <button
                            onClick={() => handleIssueCertificate(std.name, std.course)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold"
                          >
                            Issue Certificate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Attendance Recording */}
        {activeTab === "attendance" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
                  Classroom Attendance Register
                </h2>
                <p className="text-xs text-brand-grey-500">Record daily live session attendance</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 bg-brand-grey-50 dark:bg-brand-navy-950 text-xs font-bold"
                />
                <button
                  onClick={() => {
                    setAttendanceSaved(true);
                    setTimeout(() => setAttendanceSaved(false), 2500);
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Register</span>
                </button>
              </div>
            </div>

            {attendanceSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Attendance records for {attendanceDate} saved successfully!</span>
              </div>
            )}

            <div className="divide-y divide-brand-grey-100 dark:divide-brand-navy-800">
              {students.map((std) => (
                <div key={std.id} className="py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-brand-navy-950 dark:text-white">
                      {std.name}
                    </div>
                    <div className="text-xs text-brand-grey-400">{std.course}</div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {(["present", "absent", "late"] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          setAttendanceRecords({
                            ...attendanceRecords,
                            [std.id]: status,
                          })
                        }
                        className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[10px] transition-all ${
                          attendanceRecords[std.id] === status
                            ? status === "present"
                              ? "bg-emerald-600 text-white shadow-xs"
                              : status === "absent"
                              ? "bg-brand-red-500 text-white shadow-xs"
                              : "bg-amber-500 text-white shadow-xs"
                            : "bg-brand-grey-100 dark:bg-brand-navy-800 text-brand-grey-600 dark:text-brand-grey-400 hover:bg-brand-grey-200"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Assignments & Grading */}
        {activeTab === "assignments" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              Student Assignment Reviews & Marks
            </h2>

            <div className="space-y-4">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-brand-red-500">{sub.course}</span>
                      <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
                        {sub.assignmentTitle}
                      </h3>
                      <div className="text-xs text-brand-grey-400 mt-0.5">
                        Submitted by <strong>{sub.studentName}</strong> on {sub.submittedDate}
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        sub.status === "Graded"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {sub.status}: {sub.score > 0 ? `${sub.score}/100` : "Pending"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <a
                      href={sub.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-navy-700 dark:text-sky-300 font-bold hover:underline"
                    >
                      View Student Repository / File &rarr;
                    </a>
                  </div>

                  {/* Grading Inputs */}
                  <div className="pt-2 border-t border-brand-grey-200 dark:border-brand-navy-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-3">
                      <label className="text-[10px] font-bold uppercase text-brand-grey-400 block mb-1">
                        Score (0–100)
                      </label>
                      <input
                        type="number"
                        defaultValue={sub.score || ""}
                        id={`score-${sub.id}`}
                        min={0}
                        max={100}
                        placeholder="e.g. 90"
                        className="w-full px-3 py-1.5 rounded-lg border border-brand-grey-300 dark:border-brand-navy-700 text-xs font-bold"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label className="text-[10px] font-bold uppercase text-brand-grey-400 block mb-1">
                        Instructor Feedback
                      </label>
                      <input
                        type="text"
                        defaultValue={sub.feedback}
                        id={`feedback-${sub.id}`}
                        placeholder="Feedback comments..."
                        className="w-full px-3 py-1.5 rounded-lg border border-brand-grey-300 dark:border-brand-navy-700 text-xs"
                      />
                    </div>

                    <div className="sm:col-span-3 sm:pt-4">
                      <button
                        onClick={() => {
                          const scoreInput = document.getElementById(
                            `score-${sub.id}`
                          ) as HTMLInputElement;
                          const feedbackInput = document.getElementById(
                            `feedback-${sub.id}`
                          ) as HTMLInputElement;
                          handleGradeSubmission(
                            sub.id,
                            Number(scoreInput?.value || 0),
                            feedbackInput?.value || "Approved"
                          );
                        }}
                        className="w-full py-2 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-xs"
                      >
                        Submit Grade
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Question Banks & Exam Authoring */}
        {activeTab === "exams" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Add MCQ Form */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
              <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-brand-red-500" />
                <span>Add Question to Bank</span>
              </h3>

              <form onSubmit={handleAddQuestion} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Question Text *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={newQText}
                    onChange={(e) => setNewQText(e.target.value)}
                    placeholder="Enter question statement..."
                    className="w-full p-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Option A *
                  </label>
                  <input
                    type="text"
                    required
                    value={newOptA}
                    onChange={(e) => setNewOptA(e.target.value)}
                    className="w-full p-2 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Option B *
                  </label>
                  <input
                    type="text"
                    required
                    value={newOptB}
                    onChange={(e) => setNewOptB(e.target.value)}
                    className="w-full p-2 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Option C
                  </label>
                  <input
                    type="text"
                    value={newOptC}
                    onChange={(e) => setNewOptC(e.target.value)}
                    className="w-full p-2 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Option D
                  </label>
                  <input
                    type="text"
                    value={newOptD}
                    onChange={(e) => setNewOptD(e.target.value)}
                    className="w-full p-2 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Correct Option *
                  </label>
                  <select
                    value={newQCorrect}
                    onChange={(e) => setNewQCorrect(e.target.value)}
                    className="w-full p-2 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 font-bold"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold"
                >
                  Save Question
                </button>
              </form>
            </div>

            {/* Right: Existing Questions List */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
              <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white">
                Teacher Custom Question Bank ({questionsList.length})
              </h3>
              <div className="space-y-3">
                {questionsList.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-brand-navy-700 dark:text-sky-300">
                      <span>Question #{idx + 1}</span>
                      <span>Correct: Option {q.correct}</span>
                    </div>
                    <p className="font-medium text-brand-navy-950 dark:text-white">{q.text}</p>
                    <div className="grid grid-cols-2 gap-1 text-[11px] text-brand-grey-600 dark:text-brand-grey-400">
                      <div>A: {q.optionA}</div>
                      <div>B: {q.optionB}</div>
                      {q.optionC && <div>C: {q.optionC}</div>}
                      {q.optionD && <div>D: {q.optionD}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Issued Certificates */}
        {activeTab === "certificates" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              Issued Course Completion Certificates
            </h2>
            <div className="divide-y divide-brand-grey-200 dark:divide-brand-navy-800">
              {issuedCerts.map((cert) => (
                <div key={cert.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-brand-navy-950 dark:text-white">
                      {cert.studentName}
                    </div>
                    <div className="text-xs text-brand-grey-400">{cert.courseTitle}</div>
                    <div className="text-xs font-mono text-brand-red-500 font-bold mt-1">
                      Certificate Code: {cert.certificateCode}
                    </div>
                  </div>

                  <Link
                    href={`/certificates?code=${cert.certificateCode}`}
                    className="px-4 py-2 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white text-xs font-bold"
                  >
                    Public Verification Page
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Course Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-brand-navy-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-brand-grey-200 dark:border-brand-navy-800 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-brand-grey-200 dark:border-brand-navy-800">
                <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white">
                  Create New Course
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 rounded-lg text-brand-grey-400 hover:text-brand-grey-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    placeholder="e.g. Advanced C++ Low Level Systems"
                    className="w-full p-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newCourseCategory}
                      onChange={(e) => setNewCourseCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700"
                    >
                      {POPULAR_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={newCourseDifficulty}
                      onChange={(e) => setNewCourseDifficulty(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Tuition Price (INR, 0 for Free)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={newCoursePrice}
                    onChange={(e) => setNewCoursePrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Course Description
                  </label>
                  <textarea
                    rows={3}
                    value={newCourseDesc}
                    onChange={(e) => setNewCourseDesc(e.target.value)}
                    placeholder="Brief description of course modules and outcomes..."
                    className="w-full p-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold"
                  >
                    Publish Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

