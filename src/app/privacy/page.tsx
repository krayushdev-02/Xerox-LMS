import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { SITE_NAME, CONTACT_INFO } from "@/lib/constants";

export default function PrivacyPage() {
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-950 dark:text-white">
                Privacy Policy
              </h1>
              <p className="text-xs text-brand-grey-400">Effective Date: October 2026</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-brand-grey-700 dark:text-brand-grey-300 space-y-4 leading-relaxed">
            <p>
              Welcome to <strong>{SITE_NAME}</strong>. We value your privacy and are committed to
              protecting the personal information you share with us through our e-learning platform.
            </p>

            <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
              1. Information We Collect
            </h3>
            <p>
              When you register as a student or teacher, we collect your full name, email address,
              and optional contact details. As you engage with the platform, we record your course
              enrollments, lesson progress, examination responses, scores, and issued certificates.
            </p>

            <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
              2. How We Use Your Information
            </h3>
            <p>
              Your data is utilized strictly to provide personalized educational services, evaluate
              examination submissions, issue verifiable certificates, prevent academic dishonesty,
              and communicate important course notifications.
            </p>

            <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
              3. Security & Row Level Security (RLS)
            </h3>
            <p>
              We implement industry-standard database encryption and PostgreSQL Row Level Security
              (RLS) via Supabase to ensure that students can only access their authorized personal
              records and that unauthorized role privilege elevation is prevented.
            </p>

            <h3 className="text-base font-bold text-brand-navy-950 dark:text-white">
              4. Contact Us
            </h3>
            <p>
              If you have questions regarding this Privacy Policy, contact us at:
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

