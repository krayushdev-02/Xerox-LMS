import React from "react";
import Link from "next/link";
import {
  Code2,
  Globe,
  FileCode,
  Coffee,
  Terminal,
  Cpu,
  Layout,
  Palette,
  Sparkles,
  Database,
  Bot,
  ArrowRight,
} from "lucide-react";
import { POPULAR_CATEGORIES } from "@/lib/constants";

// Icon mapping helper
const iconComponents: Record<string, React.ElementType> = {
  Code2,
  Globe,
  FileCode,
  Coffee,
  Terminal,
  Cpu,
  Layout,
  Palette,
  Sparkles,
  Database,
  Bot,
};

export default function Categories() {
  return (
    <section className="py-20 bg-white dark:bg-brand-navy-950 border-y border-brand-grey-200 dark:border-brand-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-50 dark:bg-brand-navy-900 border border-brand-navy-200 dark:border-brand-navy-800 text-brand-navy-700 dark:text-brand-navy-300 text-xs font-bold uppercase tracking-wider">
            <span>Explore Subjects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-950 dark:text-white tracking-tight">
            Popular Learning Categories
          </h2>
          <p className="text-brand-grey-600 dark:text-brand-grey-400 text-base">
            From low-level memory programming in C/C++ to cloud databases and Generative AI, master
            in-demand technical skills with curated curricula.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {POPULAR_CATEGORIES.map((cat) => {
            const Icon = iconComponents[cat.icon] || Code2;
            return (
              <Link
                key={cat.id}
                href={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group relative p-5 rounded-2xl bg-brand-grey-50/60 dark:bg-brand-navy-900/60 hover:bg-white dark:hover:bg-brand-navy-900 border border-brand-grey-200/80 dark:border-brand-navy-800/80 hover:border-brand-navy-500/40 dark:hover:border-brand-navy-600 transition-all duration-200 hover:shadow-soft flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-brand-navy-800 border border-brand-grey-200 dark:border-brand-navy-700 text-brand-navy-700 dark:text-brand-navy-300 flex items-center justify-center group-hover:bg-brand-navy-700 group-hover:text-white transition-all duration-200 shadow-xs">
                    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy-950 dark:text-white group-hover:text-brand-red-500 dark:group-hover:text-brand-red-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-brand-grey-500 dark:text-brand-grey-400 mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-brand-grey-200/60 dark:border-brand-navy-800/60 flex items-center justify-between text-xs font-semibold text-brand-navy-700 dark:text-brand-navy-300">
                  <span className="text-brand-grey-500 dark:text-brand-grey-400">
                    {cat.count} Courses & Exams
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-brand-red-500">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Action */}
        <div className="mt-12 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy-50 dark:bg-brand-navy-900 border border-brand-navy-200 dark:border-brand-navy-800 text-brand-navy-800 dark:text-white font-semibold text-sm hover:bg-brand-navy-100 dark:hover:bg-brand-navy-800 transition-colors"
          >
            <span>Browse All Categorized Courses & Modules</span>
            <ArrowRight className="w-4 h-4 text-brand-red-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}

