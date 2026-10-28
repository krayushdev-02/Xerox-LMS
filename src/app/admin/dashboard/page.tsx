"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  BookOpen,
  GraduationCap,
  Award,
  MessageSquare,
  Bell,
  Settings,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  PlusCircle,
  Eye,
  Trash2,
  BarChart3,
  Layers,
  Phone,
  Mail,
  RefreshCw,
  FileText,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { DETAILED_COURSES, FullCourse } from "@/lib/courses-data";
import { POPULAR_CATEGORIES, CONTACT_INFO, SITE_TAGLINE } from "@/lib/constants";
import { ASSESSMENT_METADATA } from "@/lib/assessment-data";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboard() {
  const { user, profile, role } = useAuth();

  const [activeTab, setActiveTab] = useState<
    | "analytics"
    | "users"
    | "courses"
    | "categories"
    | "exams"
    | "messages"
    | "announcements"
    | "certificates"
    | "settings"
  >("analytics");

  // Users Management State
  const [userList, setUserList] = useState([
    {
      id: "usr-1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "student",
      joined: "Oct 12, 2026",
      status: "Active",
    },
    {
      id: "usr-2",
      name: "Prof. Ayush Kumar",
      email: "ayushk2375@gmail.com",
      role: "teacher",
      joined: "Oct 1, 2026",
      status: "Verified Faculty",
    },
    {
      id: "usr-3",
      name: "Pooja Verma",
      email: "pooja@example.com",
      role: "student",
      joined: "Oct 14, 2026",
      status: "Active",
    },
    {
      id: "usr-4",
      name: "Vikram Singh",
      email: "vikram@example.com",
      role: "student",
      joined: "Oct 18, 2026",
      status: "Active",
    },
    {
      id: "usr-5",
      name: "Ananya Patel",
      email: "ananya@example.com",
      role: "teacher",
      joined: "Oct 5, 2026",
      status: "Verified Faculty",
    },
  ]);

  // Course Approvals State
  const [coursesList, setCoursesList] = useState([
    {
      id: "course-1",
      title: "Complete Python Bootcamp: From Zero to Hero",
      instructor: "Prof. Ayush Kumar",
      category: "Python",
      price: 0,
      status: "Approved",
    },
    {
      id: "course-2",
      title: "Modern Web Development: HTML, CSS & JavaScript",
      instructor: "Prof. Ayush Kumar",
      category: "Web Development",
      price: 0,
      status: "Approved",
    },
    {
      id: "course-3",
      title: "C & C++ Masterclass: Data Structures & Algorithms",
      instructor: "Prof. Ayush Kumar",
      category: "C++",
      price: 499,
      status: "Approved",
    },
    {
      id: "course-4",
      title: "Microservices Architecture with Spring Boot & Docker",
      instructor: "Ananya Patel",
      category: "Java",
      price: 799,
      status: "Pending Review",
    },
  ]);

  // Contact Messages State
  const [contactMessages, setContactMessages] = useState([
    {
      id: "msg-101",
      name: "Rohan Gupta",
      email: "rohan.g@example.com",
      subject: "College Partnership for 100-Question Assessment",
      message:
        "We are interested in hosting the Technical Knowledge Assessment for our 3rd year engineering batch of 120 students.",
      date: "Oct 27, 2026",
      isResolved: false,
    },
    {
      id: "msg-102",
      name: "Sneha Nair",
      email: "sneha.n@example.com",
      subject: "Certificate ID Verification Request",
      message: "Can you confirm the issue date for Certificate ID XLR-2026-0042?",
      date: "Oct 26, 2026",
      isResolved: true,
    },
  ]);

  // Announcements State
  const [announcements, setAnnouncements] = useState([
    {
      id: "anc-1",
      title: "100-Question Technical Assessment Portal Live",
      target: "All Users",
      date: "Oct 24, 2026",
      status: "Published",
    },
    {
      id: "anc-2",
      title: "New AI Tutor Features Available",
      target: "Students",
      date: "Oct 26, 2026",
      status: "Published",
    },
  ]);

  const [newAncTitle, setNewAncTitle] = useState("");
  const [newAncContent, setNewAncContent] = useState("");
  const [newAncTarget, setNewAncTarget] = useState("All Users");

  // Certificates Management State
  const [certificates, setCertificates] = useState([
    {
      code: "XLR-2026-0042",
      studentName: "Ayush Kumar",
      course: "Technical Knowledge Assessment (100 Qs)",
      score: "92%",
      issuedDate: "Oct 24, 2026",
      isRevoked: false,
    },
    {
      code: "XLR-2026-9041",
      studentName: "Vikram Singh",
      course: "Complete Python Bootcamp",
      score: "100%",
      issuedDate: "Oct 28, 2026",
      isRevoked: false,
    },
    {
      code: "XLR-2026-8942",
      studentName: "Rahul Sharma",
      course: "Modern Web Development",
      score: "88%",
      issuedDate: "Oct 20, 2026",
      isRevoked: false,
    },
  ]);

  // Handlers
  const handleToggleUserRole = (userId: string) => {
    setUserList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextRole = u.role === "student" ? "teacher" : "student";
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  const handleApproveCourse = (courseId: string) => {
    setCoursesList((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status: "Approved" } : c))
    );
  };

  const handleRejectCourse = (courseId: string) => {
    setCoursesList((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status: "Rejected" } : c))
    );
  };

  const handleToggleMessageResolved = (msgId: string) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, isResolved: !m.isResolved } : m))
    );
  };

  const handleToggleCertificateRevoke = (code: string) => {
    setCertificates((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isRevoked: !c.isRevoked } : c))
    );
  };

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAncTitle.trim()) return;

    setAnnouncements([
      {
        id: `anc-${Date.now()}`,
        title: newAncTitle.trim(),
        target: newAncTarget,
        date: "Just now",
        status: "Published",
      },
      ...announcements,
    ]);

    setNewAncTitle("");
    setNewAncContent("");
  };

  return (
    <div className="py-10 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Admin Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-navy-900 via-brand-navy-950 to-brand-navy-900 text-white border border-brand-navy-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-500/20 text-brand-red-300 text-xs font-bold border border-brand-red-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Platform Master Administrator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Admin Console — Xerox LMS
            </h1>
            <p className="text-sm text-brand-grey-300 max-w-xl">
              Platform governance: manage users, approve courses, oversee 100-question examinations,
              answer inquiries, and maintain certificate registry integrity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs bg-white/10 p-3 rounded-2xl border border-white/10 font-mono">
              <div>PostgreSQL RLS: Active</div>
              <div className="text-emerald-400 font-bold">Admin Privileges: Granted</div>
            </div>
          </div>
        </div>

        {/* Global Statistics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-[10px] font-bold text-brand-grey-400 uppercase tracking-wider">
              Total Users
            </div>
            <div className="text-2xl font-black text-brand-navy-950 dark:text-white mt-1">
              {userList.length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-[10px] font-bold text-brand-grey-400 uppercase tracking-wider">
              Published Courses
            </div>
            <div className="text-2xl font-black text-brand-navy-950 dark:text-white mt-1">
              {coursesList.filter((c) => c.status === "Approved").length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-[10px] font-bold text-brand-grey-400 uppercase tracking-wider">
              Question Banks
            </div>
            <div className="text-2xl font-black text-brand-navy-950 dark:text-white mt-1">100 Qs</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-[10px] font-bold text-brand-grey-400 uppercase tracking-wider">
              Categories
            </div>
            <div className="text-2xl font-black text-brand-navy-950 dark:text-white mt-1">
              {POPULAR_CATEGORIES.length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-[10px] font-bold text-brand-grey-400 uppercase tracking-wider">
              Certificates
            </div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {certificates.filter((c) => !c.isRevoked).length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft">
            <div className="text-[10px] font-bold text-brand-grey-400 uppercase tracking-wider">
              Inquiries
            </div>
            <div className="text-2xl font-black text-brand-red-500 mt-1">
              {contactMessages.filter((m) => !m.isResolved).length}
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-brand-grey-200 dark:border-brand-navy-800 pb-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "analytics"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Platform Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "users"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Manage Users ({userList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "courses"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course Approvals ({coursesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "categories"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories (11)</span>
          </button>

          <button
            onClick={() => setActiveTab("exams")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "exams"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Assessments & Banks</span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "messages"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Messages ({contactMessages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "announcements"
                ? "bg-brand-navy-700 text-white shadow-sm"
                : "text-brand-grey-600 dark:text-brand-grey-400 hover:text-brand-navy-950"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Announcements</span>
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
            <span>Certificates & Revocation</span>
          </button>
        </div>

        {/* Tab 1: Platform Analytics */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
              <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white">
                Platform Activity Summary
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950">
                  <span className="font-semibold text-brand-grey-600">Active Students</span>
                  <span className="font-bold text-brand-navy-950 dark:text-white">
                    {userList.filter((u) => u.role === "student").length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950">
                  <span className="font-semibold text-brand-grey-600">Verified Instructors</span>
                  <span className="font-bold text-brand-navy-950 dark:text-white">
                    {userList.filter((u) => u.role === "teacher").length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950">
                  <span className="font-semibold text-brand-grey-600">
                    Grand Assessment Questions Loaded
                  </span>
                  <span className="font-bold text-emerald-600">100 Objective Questions</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950">
                  <span className="font-semibold text-brand-grey-600">Certificate Status</span>
                  <span className="font-bold text-emerald-600">
                    100% Cryptographic Verification Active
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
              <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white">
                Official Operational Details
              </h3>
              <div className="space-y-3 text-xs text-brand-grey-700 dark:text-brand-grey-300">
                <div className="p-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-brand-grey-400">
                    Designated Phone
                  </div>
                  <div className="font-bold text-base text-brand-navy-900 dark:text-white">
                    {CONTACT_INFO.phone}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-brand-grey-400">
                    Designated Admin Email
                  </div>
                  <div className="font-bold text-base text-brand-navy-900 dark:text-white">
                    {CONTACT_INFO.email}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-brand-grey-400">
                    Google Form Registration & Inquiry
                  </div>
                  <a
                    href={CONTACT_INFO.googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-xs text-brand-red-500 hover:underline flex items-center gap-1.5 break-all"
                  >
                    <span>{CONTACT_INFO.googleFormUrl}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                </div>
                <div className="p-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-brand-grey-400">
                    Brand Tagline
                  </div>
                  <div className="font-bold text-brand-navy-900 dark:text-white">{SITE_TAGLINE}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Users Management */}
        {activeTab === "users" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              Platform Registered Users
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-grey-200 dark:border-brand-navy-800 text-brand-grey-500 font-bold uppercase">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Joined Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-grey-100 dark:divide-brand-navy-800">
                  {userList.map((u) => (
                    <tr key={u.id} className="hover:bg-brand-grey-50/50 dark:hover:bg-brand-navy-950">
                      <td className="py-3 px-4 font-bold text-brand-navy-950 dark:text-white">
                        {u.name}
                        <div className="text-[10px] text-brand-grey-400 font-normal">{u.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            u.role === "teacher"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
                              : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-brand-grey-400">{u.joined}</td>
                      <td className="py-3 px-4 text-brand-grey-600 dark:text-brand-grey-300">
                        {u.status}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleToggleUserRole(u.id)}
                          className="px-3 py-1 rounded-lg border border-brand-navy-700 text-brand-navy-700 dark:text-sky-300 font-bold hover:bg-brand-navy-50"
                        >
                          Change to {u.role === "student" ? "Teacher" : "Student"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Course Approvals */}
        {activeTab === "courses" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              Course Moderation & Approvals
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-grey-200 dark:border-brand-navy-800 text-brand-grey-500 font-bold uppercase">
                    <th className="py-3 px-4">Course Title</th>
                    <th className="py-3 px-4">Instructor</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Tuition</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-grey-100 dark:divide-brand-navy-800">
                  {coursesList.map((c) => (
                    <tr key={c.id} className="hover:bg-brand-grey-50/50 dark:hover:bg-brand-navy-950">
                      <td className="py-3.5 px-4 font-bold text-brand-navy-950 dark:text-white">
                        {c.title}
                      </td>
                      <td className="py-3.5 px-4 text-brand-grey-600">{c.instructor}</td>
                      <td className="py-3.5 px-4">{c.category}</td>
                      <td className="py-3.5 px-4 font-bold">
                        {c.price === 0 ? "Free" : formatCurrency(c.price)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            c.status === "Approved"
                              ? "bg-emerald-100 text-emerald-800"
                              : c.status === "Pending Review"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {c.status !== "Approved" && (
                          <button
                            onClick={() => handleApproveCourse(c.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px]"
                          >
                            Approve
                          </button>
                        )}
                        {c.status !== "Rejected" && (
                          <button
                            onClick={() => handleRejectCourse(c.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px]"
                          >
                            Reject
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

        {/* Tab 4: Categories */}
        {activeTab === "categories" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              Curriculum Categories ({POPULAR_CATEGORIES.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              {POPULAR_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 space-y-1"
                >
                  <div className="font-bold text-brand-navy-950 dark:text-white">{cat.name}</div>
                  <div className="text-brand-grey-500 text-[11px]">{cat.description}</div>
                  <div className="text-[11px] font-mono font-bold text-brand-red-500 pt-1">
                    {cat.count} Active Courses & Modules
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Examinations & Question Banks */}
        {activeTab === "exams" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
                  Active Proctored Assessments
                </h2>
                <p className="text-xs text-brand-grey-500">
                  Grand assessment engine covering HTML, CSS, JS, C, Python, and SQL
                </p>
              </div>

              <Link
                href="/exams"
                className="px-4 py-2 rounded-xl bg-brand-navy-700 text-white text-xs font-bold"
              >
                View Live Exams Portal
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-brand-red-500">
                  Primary Curriculum Examination
                </span>
                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Status: Published & Active
                </span>
              </div>
              <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
                {ASSESSMENT_METADATA.title}
              </h3>
              <p className="text-xs text-brand-grey-600 dark:text-brand-grey-400">
                {ASSESSMENT_METADATA.description}
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-brand-grey-500 pt-1">
                <div>Total: 100 Qs</div>
                <div>&bull;</div>
                <div>Time: 90 Mins</div>
                <div>&bull;</div>
                <div>Pass Marks: 40/100</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Contact Messages */}
        {activeTab === "messages" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
            <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              Public Contact Inquiries ({contactMessages.length})
            </h2>

            <div className="space-y-4">
              {contactMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-5 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 space-y-3"
                >
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <div className="text-xs text-brand-grey-400">{msg.date}</div>
                      <h3 className="text-sm font-bold text-brand-navy-950 dark:text-white">
                        {msg.subject}
                      </h3>
                      <div className="text-xs text-brand-navy-700 dark:text-sky-300 font-semibold">
                        From: {msg.name} ({msg.email})
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleMessageResolved(msg.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors ${
                        msg.isResolved
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      }`}
                    >
                      {msg.isResolved ? "Resolved" : "Mark as Resolved"}
                    </button>
                  </div>

                  <p className="text-xs text-brand-grey-700 dark:text-brand-grey-300 leading-relaxed bg-white dark:bg-brand-navy-900 p-3 rounded-xl border border-brand-grey-200/60 dark:border-brand-navy-800">
                    &quot;{msg.message}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Announcements */}
        {activeTab === "announcements" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
              <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white">
                Publish Platform Announcement
              </h3>
              <form onSubmit={handlePublishAnnouncement} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Announcement Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAncTitle}
                    onChange={(e) => setNewAncTitle(e.target.value)}
                    placeholder="e.g. Schedule for Next Grand Examination"
                    className="w-full p-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Target Role
                  </label>
                  <select
                    value={newAncTarget}
                    onChange={(e) => setNewAncTarget(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700 font-bold"
                  >
                    <option value="All Users">All Users</option>
                    <option value="Students">Students Only</option>
                    <option value="Teachers">Teachers Only</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-brand-grey-700 dark:text-brand-grey-300 mb-1">
                    Announcement Details
                  </label>
                  <textarea
                    rows={3}
                    value={newAncContent}
                    onChange={(e) => setNewAncContent(e.target.value)}
                    placeholder="Message content..."
                    className="w-full p-2.5 rounded-xl border border-brand-grey-300 dark:border-brand-navy-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold"
                >
                  Publish Announcement
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-4">
              <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white">
                Active Announcements
              </h3>
              <div className="space-y-3">
                {announcements.map((anc) => (
                  <div
                    key={anc.id}
                    className="p-4 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-navy-950 dark:text-white">
                        {anc.title}
                      </span>
                      <span className="text-brand-grey-400">{anc.date}</span>
                    </div>
                    <div className="text-[11px] text-brand-red-500 font-semibold">
                      Target Audience: {anc.target}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 8: Certificates & Revocation */}
        {activeTab === "certificates" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white">
                  Certificate Registry & Revocations
                </h2>
                <p className="text-xs text-brand-grey-500">
                  Administrators can immediately revoke invalid credentials
                </p>
              </div>
              <Link
                href="/certificates"
                className="px-4 py-2 rounded-xl bg-brand-navy-700 text-white text-xs font-bold"
              >
                Open Verification Portal
              </Link>
            </div>

            <div className="divide-y divide-brand-grey-200 dark:divide-brand-navy-800">
              {certificates.map((cert) => (
                <div
                  key={cert.code}
                  className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-brand-navy-950 dark:text-white">
                      {cert.studentName}
                    </div>
                    <div className="text-brand-grey-500">{cert.course}</div>
                    <div className="font-mono text-brand-navy-700 dark:text-sky-300 font-bold">
                      ID: {cert.code} &bull; Score: {cert.score}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        cert.isRevoked
                          ? "bg-rose-100 text-rose-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {cert.isRevoked ? "Revoked" : "Verified Authentic"}
                    </span>

                    <button
                      onClick={() => handleToggleCertificateRevoke(cert.code)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                        cert.isRevoked
                          ? "bg-emerald-600 text-white"
                          : "bg-rose-600 text-white"
                      }`}
                    >
                      {cert.isRevoked ? "Restore Certificate" : "Revoke Certificate"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

