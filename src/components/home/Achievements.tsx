import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  ShieldCheck,
  QrCode,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  FileBadge,
} from "lucide-react";
import Logo from "@/components/common/Logo";

export default function Achievements() {
  return (
    <section className="py-20 bg-brand-grey-50/70 dark:bg-brand-navy-950 border-b border-brand-grey-200 dark:border-brand-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value props */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red-50 dark:bg-brand-red-950/40 border border-brand-red-200 dark:border-brand-red-800 text-brand-red-600 dark:text-brand-red-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Verifiable Credentials</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-950 dark:text-white tracking-tight leading-tight">
              Earn Industry Recognized Xerox LMS Certificates
            </h2>

            <p className="text-brand-grey-600 dark:text-brand-grey-400 text-base leading-relaxed">
              Every course completion and qualifying examination attempt unlocks an official Xerox
              LMS certificate. Designed with cryptographic verification IDs, tamper-proof records,
              and instant employer verification.
            </p>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-navy-950 dark:text-white">
                    Unique Certificate ID & Public Verification
                  </h4>
                  <p className="text-xs text-brand-grey-500 dark:text-brand-grey-400">
                    Employers and institutions can verify your credentials anytime via our public
                    verification lookup.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-navy-950 dark:text-white">
                    High-Resolution PDF Download
                  </h4>
                  <p className="text-xs text-brand-grey-500 dark:text-brand-grey-400">
                    Export high-definition PDF certificates suitable for LinkedIn, resumes, and
                    physical printouts.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/certificates"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-bold text-sm shadow-soft transition-all duration-200"
              >
                <span>Verify a Certificate</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: High Fidelity Certificate Template Preview */}
          <div className="lg:col-span-7">
            <div className="relative p-2 sm:p-4 rounded-3xl bg-gradient-to-tr from-brand-navy-900 via-brand-navy-800 to-brand-navy-950 shadow-2xl">
              {/* Certificate Canvas */}
              <div className="relative rounded-2xl bg-white dark:bg-brand-navy-900 p-6 sm:p-10 border-4 border-double border-brand-navy-200 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white space-y-6">
                {/* Certificate Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-brand-grey-200 dark:border-brand-navy-800 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-1 ring-black/10">
                      <Image
                        src="/logo.jpg"
                        alt="Xerox LMS Logo"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-black tracking-wider text-brand-navy-800 dark:text-white uppercase">
                        Xerox LMS
                      </div>
                      <div className="text-[10px] text-brand-grey-500 font-medium">
                        Certificate of Technical Excellence
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      VERIFIED CREDENTIAL
                    </span>
                  </div>
                </div>

                {/* Certificate Body */}
                <div className="text-center space-y-3 py-2">
                  <p className="text-xs font-semibold text-brand-grey-500 uppercase tracking-widest">
                    This is proudly presented to
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy-950 dark:text-white underline decoration-brand-red-500 underline-offset-8">
                    Ayush Kumar
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-grey-600 dark:text-brand-grey-300 max-w-lg mx-auto pt-2">
                    For successfully qualifying the comprehensive examination in{" "}
                    <strong className="text-brand-navy-800 dark:text-white font-bold">
                      Computer Programming & Web Technologies
                    </strong>{" "}
                    with a score of 92% (Grade A+).
                  </p>
                </div>

                {/* Certificate Footer Row: Signatures & QR */}
                <div className="pt-6 border-t border-brand-grey-200 dark:border-brand-navy-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-brand-grey-500 dark:text-brand-grey-400">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-brand-grey-100 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-800 flex items-center justify-center text-brand-navy-700 dark:text-brand-navy-300 font-mono text-[9px] text-center p-1 font-bold">
                      QR CODE
                    </div>
                    <div>
                      <div className="font-mono font-bold text-brand-navy-900 dark:text-white">
                        ID: XLR-2026-0042
                      </div>
                      <div className="text-[10px]">Issued: October 2026</div>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="font-serif italic text-base font-bold text-brand-navy-900 dark:text-brand-navy-200">
                      Ayush Kumar
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-grey-400 font-semibold border-t border-brand-grey-300 dark:border-brand-navy-700 pt-0.5">
                      Authorized Academic Signatory
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

