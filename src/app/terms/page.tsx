import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { SITE_NAME, CONTACT_INFO } from "@/lib/constants";

export default function TermsPage() {
  return (
    <div className="py-12 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy-700 dark:text-sky-300 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy-700 text-white flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-950 dark:text-white">
                Terms and Conditions
              </h1>
              <p className="text-xs text-brand-grey-400">Effective Date: October 2026</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-brand-grey-700 dark:text-brand-grey-300 space-y-4 leading-relaxed">
            <p>
              By accessing or using <strong>{SITE_NAME}</strong>, you agree to comply with and be
              bound by these Terms and Conditions. Please review them carefully.
            </p>

            <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
              1. User Accounts & Integrity
            </h3>
            <p>
              Students and instructors are responsible for safeguarding their login credentials.
              Public signups may not impersonate platform administrators or attempt unauthorized
              privilege escalation.
            </p>

            <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
              2. Examination Conduct & Certificates
            </h3>
            <p>
              Online examination attempts must be completed by the registered student without
              unauthorized assistance. Xerox LMS reserves the right to revoke or void any
              certificate found to have been obtained through fraudulent means.
            </p>

            <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
              3. Intellectual Property
            </h3>
            <p>
              Course curricula, videos, PDF notes, question banks, and branding trademarks are the
              exclusive intellectual property of Xerox LMS and its authorized contributors.
            </p>

            <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
              4. Official Support
            </h3>
            <p>
              For legal or support inquiries, contact:
              <br />
              <strong>Phone:</strong> {CONTACT_INFO.phone}
              <br />
              <strong>Email:</strong> {CONTACT_INFO.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

