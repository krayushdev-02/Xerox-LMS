import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  BookOpen,
  Award,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react";
import { SAMPLE_COURSES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export default function FeaturedCourses() {
  return (
    <section className="py-20 bg-brand-grey-50/70 dark:bg-brand-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-red-50 dark:bg-brand-red-950/40 border border-brand-red-200 dark:border-brand-red-800 text-brand-red-600 dark:text-brand-red-400 text-xs font-bold uppercase tracking-wider">
                Featured Programs
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <Info className="w-3 h-3" />
                Sample Courses
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-950 dark:text-white tracking-tight">
              Top Rated Tech Courses
            </h2>
            <p className="text-brand-grey-600 dark:text-brand-grey-400 text-base">
              Learn practical engineering and coding skills structured into bite-sized lessons,
              assignments, and downloadable PDFs.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy-700 dark:text-brand-navy-300 hover:text-brand-red-500 dark:hover:text-brand-red-400 transition-colors"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_COURSES.map((course) => (
            <div
              key={course.id}
              className="group rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200/90 dark:border-brand-navy-800 overflow-hidden hover:shadow-soft-lg hover:border-brand-navy-500/30 dark:hover:border-brand-navy-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative h-48 w-full overflow-hidden bg-brand-grey-100 dark:bg-brand-navy-950">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges on Thumbnail */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white/95 dark:bg-brand-navy-900/95 text-brand-navy-900 dark:text-white shadow-sm backdrop-blur-sm">
                      {course.category}
                    </span>
                    {course.badge && (
                      <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-brand-red-500 text-white shadow-sm">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs">
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-brand-navy-950 dark:text-white group-hover:text-brand-navy-600 dark:group-hover:text-sky-300 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-brand-grey-600 dark:text-brand-grey-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-brand-grey-100 dark:border-brand-navy-800 text-xs text-brand-grey-500 dark:text-brand-grey-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-navy-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-brand-navy-500" />
                      <span>{course.lessonsCount} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-brand-navy-500" />
                      <span>{course.studentsEnrolled.toLocaleString()} Students</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-brand-red-500" />
                      <span>Certificate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Enroll CTA */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-brand-grey-100 dark:border-brand-navy-800 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-brand-grey-400 uppercase font-bold tracking-wider">
                      Tuition
                    </div>
                    <div className="text-xl font-extrabold text-brand-navy-800 dark:text-white">
                      {course.isFree ? (
                        <span className="text-emerald-600 dark:text-emerald-400">Free</span>
                      ) : (
                        formatCurrency(course.price)
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-4 py-2.5 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-semibold text-sm transition-all duration-200 flex items-center gap-1.5 shadow-sm group-hover:bg-brand-red-500"
                  >
                    <span>View Course</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

