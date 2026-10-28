import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import Logo from "@/components/common/Logo";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-brand-grey-50 dark:bg-brand-navy-950">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center mb-4">
          <Logo size="lg" showTagline={false} asLink={false} />
        </div>

        <div className="space-y-2">
          <span className="text-6xl sm:text-7xl font-extrabold text-brand-red-500 font-mono tracking-tight">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-950 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-brand-grey-600 dark:text-brand-grey-400">
            The page you are looking for might have been moved, removed, or doesn&apos;t exist.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/courses"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-brand-navy-900 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-800 dark:text-white font-semibold text-sm hover:bg-brand-grey-50 dark:hover:bg-brand-navy-800 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Browse Courses</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

