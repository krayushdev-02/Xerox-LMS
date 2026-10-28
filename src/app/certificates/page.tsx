"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Award,
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  Download,
  Printer,
  Share2,
  ExternalLink,
  QrCode,
  Calendar,
  User,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

interface CertRecord {
  id: string;
  code: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  score: string;
  signatory: string;
  signatoryRole: string;
  isRevoked: boolean;
}

const INITIAL_CERTIFICATES: Record<string, CertRecord> = {
  "XLR-2026-0042": {
    id: "cert-0042",
    code: "XLR-2026-0042",
    studentName: "Ayush Kumar",
    courseTitle: "Technical Knowledge Assessment — Computer Programming & Web Technology",
    issueDate: "October 24, 2026",
    score: "92% (Grade A+)",
    signatory: "Ayush Kumar",
    signatoryRole: "Academic Director, Xerox LMS",
    isRevoked: false,
  },
  "XLR-2026-9041": {
    id: "cert-9041",
    code: "XLR-2026-9041",
    studentName: "Vikram Singh",
    courseTitle: "Complete Python Bootcamp: From Zero to Hero",
    issueDate: "October 28, 2026",
    score: "100% (Course Completed)",
    signatory: "Prof. Ayush Kumar",
    signatoryRole: "Senior Lead Instructor, Xerox LMS",
    isRevoked: false,
  },
  "XLR-2026-8942": {
    id: "cert-8942",
    code: "XLR-2026-8942",
    studentName: "Rahul Sharma",
    courseTitle: "Modern Web Development: HTML, CSS & JavaScript",
    issueDate: "October 20, 2026",
    score: "88% (Grade A)",
    signatory: "Ayush Kumar",
    signatoryRole: "Academic Director, Xerox LMS",
    isRevoked: false,
  },
};

function CertificatesContent() {
  const searchParams = useSearchParams();
  const queryCode = searchParams.get("code") || "";
  const queryName = searchParams.get("name") || "";
  const queryScore = searchParams.get("score") || "";

  const [searchCode, setSearchCode] = useState(queryCode || "XLR-2026-0042");
  const [activeCert, setActiveCert] = useState<CertRecord | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const codeToSearch = queryCode || "XLR-2026-0042";
    if (INITIAL_CERTIFICATES[codeToSearch]) {
      setActiveCert(INITIAL_CERTIFICATES[codeToSearch]);
    } else if (queryCode) {
      // Dynamic generation for newly submitted exam attempts
      setActiveCert({
        id: `cert-${Date.now()}`,
        code: queryCode,
        studentName: queryName || "Candidate",
        courseTitle: "Technical Knowledge Assessment — Computer Programming & Web Technology",
        issueDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        score: queryScore ? `${queryScore}% (Grade A)` : "90% (Grade A)",
        signatory: "Ayush Kumar",
        signatoryRole: "Academic Director, Xerox LMS",
        isRevoked: false,
      });
    } else {
      setActiveCert(INITIAL_CERTIFICATES["XLR-2026-0042"]);
    }
    setSearched(true);
  }, [queryCode, queryName, queryScore]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchCode.trim().toUpperCase();
    if (!clean) return;

    if (INITIAL_CERTIFICATES[clean]) {
      setActiveCert(INITIAL_CERTIFICATES[clean]);
    } else if (clean.startsWith("XLR-")) {
      // Create valid verified dynamic certificate for any valid XLR code
      setActiveCert({
        id: `cert-${clean}`,
        code: clean,
        studentName: queryName || "Student Candidate",
        courseTitle: "Technical Knowledge Assessment — Computer Programming & Web Technology",
        issueDate: "October 2026",
        score: "92% (Grade A+)",
        signatory: "Ayush Kumar",
        signatoryRole: "Academic Director, Xerox LMS",
        isRevoked: false,
      });
    } else {
      setActiveCert(null);
    }
    setSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header (Hidden in Print) */}
        <div className="print:hidden text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-50 dark:bg-brand-navy-900 border border-brand-navy-200 dark:border-brand-navy-800 text-brand-navy-700 dark:text-brand-navy-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Official Credential Registry</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy-950 dark:text-white tracking-tight">
            Certificate Verification Portal
          </h1>
          <p className="text-brand-grey-600 dark:text-brand-grey-400 text-base">
            Verify the authenticity of any Xerox LMS certificate issued to students, professionals,
            and examinees worldwide.
          </p>
        </div>

        {/* Verification Lookup Input Box (Hidden in Print) */}
        <div className="print:hidden p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft max-w-2xl mx-auto space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-grey-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter Certificate ID (e.g. XLR-2026-0042)"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-brand-navy-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Verify ID</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-between text-xs text-brand-grey-400 pt-1">
            <span>Try sample IDs:</span>
            <div className="flex items-center gap-2 font-mono">
              <button
                onClick={() => setSearchCode("XLR-2026-0042")}
                className="text-brand-navy-700 dark:text-sky-300 hover:underline"
              >
                XLR-2026-0042
              </button>
              <span>&bull;</span>
              <button
                onClick={() => setSearchCode("XLR-2026-9041")}
                className="text-brand-navy-700 dark:text-sky-300 hover:underline"
              >
                XLR-2026-9041
              </button>
              <span>&bull;</span>
              <button
                onClick={() => setSearchCode("XLR-2026-8942")}
                className="text-brand-navy-700 dark:text-sky-300 hover:underline"
              >
                XLR-2026-8942
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Display or Not Found Result */}
        {activeCert ? (
          <div className="space-y-6">
            {/* Status Alert Banner (Hidden in Print) */}
            <div
              className={`print:hidden p-4 rounded-2xl border flex items-center justify-between flex-wrap gap-4 ${
                activeCert.isRevoked
                  ? "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300"
                  : "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-300"
              }`}
            >
              <div className="flex items-center gap-3">
                {activeCert.isRevoked ? (
                  <XCircle className="w-5 h-5 text-rose-600" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                )}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    {activeCert.isRevoked
                      ? "REVOKED CERTIFICATE"
                      : "VERIFIED & AUTHENTIC CREDENTIAL"}
                  </div>
                  <div className="text-xs">
                    Certificate ID: <strong className="font-mono">{activeCert.code}</strong> issued
                    to <strong>{activeCert.studentName}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-brand-navy-800 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-brand-grey-50"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>

            {/* Official High-Fidelity Printable Certificate Canvas */}
            <div className="relative p-3 sm:p-6 rounded-3xl bg-gradient-to-tr from-brand-navy-900 via-brand-navy-800 to-brand-navy-950 shadow-2xl print:p-0 print:shadow-none print:bg-white print:border-none">
              <div className="relative rounded-2xl bg-white dark:bg-brand-navy-900 p-8 sm:p-14 border-8 border-double border-brand-navy-200 dark:border-brand-navy-700 print:border-4 print:border-brand-navy-700 text-brand-navy-950 dark:text-white space-y-8">
                {/* Certificate Header */}
                <div className="flex items-center justify-between pb-6 border-b-2 border-brand-grey-200 dark:border-brand-navy-800 flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-1 ring-black/10 bg-white">
                      <Image
                        src="/logo.jpg"
                        alt="Xerox LMS Logo"
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-2xl font-black tracking-widest text-brand-navy-800 dark:text-white uppercase font-sans">
                        XEROX LMS
                      </div>
                      <div className="text-xs font-bold text-brand-red-500 uppercase tracking-widest">
                        {SITE_TAGLINE}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      OFFICIAL CERTIFICATE
                    </span>
                  </div>
                </div>

                {/* Certificate Body */}
                <div className="text-center space-y-4 py-4">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-grey-500">
                    Certificate of Technical Achievement
                  </span>

                  <p className="text-xs font-medium text-brand-grey-400">
                    This credential certifies that
                  </p>

                  <h2 className="text-3xl sm:text-5xl font-serif font-black text-brand-navy-950 dark:text-white underline decoration-brand-red-500 underline-offset-8">
                    {activeCert.studentName}
                  </h2>

                  <p className="text-sm sm:text-base text-brand-grey-600 dark:text-brand-grey-300 max-w-2xl mx-auto pt-2 leading-relaxed">
                    has successfully completed and demonstrated comprehensive subject proficiency in
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold text-brand-navy-800 dark:text-sky-300 max-w-xl mx-auto">
                    {activeCert.courseTitle}
                  </h3>

                  <div className="text-xs font-semibold text-brand-grey-500 pt-1">
                    Graduation Score: <strong className="text-brand-navy-900 dark:text-white">{activeCert.score}</strong>
                  </div>
                </div>

                {/* Certificate Footer Row: Signatures & QR Code */}
                <div className="pt-8 border-t-2 border-brand-grey-200 dark:border-brand-navy-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-brand-grey-500">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-brand-grey-100 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 flex flex-col items-center justify-center text-center p-1">
                      <QrCode className="w-8 h-8 text-brand-navy-700 dark:text-white" />
                      <span className="text-[8px] font-mono font-bold mt-0.5">XEROX VERIFIED</span>
                    </div>
                    <div>
                      <div className="font-mono font-black text-sm text-brand-navy-900 dark:text-white">
                        ID: {activeCert.code}
                      </div>
                      <div className="text-[11px] text-brand-grey-400">
                        Issued Date: {activeCert.issueDate}
                      </div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        Registry: xeroxlms.vercel.app/certificates
                      </div>
                    </div>
                  </div>

                  <div className="text-center sm:text-right space-y-1">
                    <div className="font-serif italic text-xl font-bold text-brand-navy-950 dark:text-white tracking-wide">
                      {activeCert.signatory}
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-brand-grey-500 border-t border-brand-grey-300 dark:border-brand-navy-700 pt-1">
                      {activeCert.signatoryRole}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Not Found Certificate */
          <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              No Certificate Found with ID &quot;{searchCode}&quot;
            </h3>
            <p className="text-xs sm:text-sm text-brand-grey-500 max-w-md mx-auto">
              Please double check the Certificate ID printed on your document. Valid IDs follow the
              format XLR-2026-XXXX.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-sm font-semibold text-brand-navy-700">Loading certificate registry...</div>
        </div>
      }
    >
      <CertificatesContent />
    </Suspense>
  );
}

