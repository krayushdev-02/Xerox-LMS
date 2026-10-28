"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Star,
  Clock,
  BookOpen,
  Award,
  Users,
  ArrowRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { DETAILED_COURSES } from "@/lib/courses-data";
import { POPULAR_CATEGORIES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

function CoursesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  const categoriesList = ["All", ...POPULAR_CATEGORIES.map((c) => c.name)];
  const difficultyList = ["All", "Beginner", "Intermediate", "Advanced"];
  const priceList = ["All", "Free", "Paid"];

  const filteredCourses = useMemo(() => {
    return DETAILED_COURSES.filter((course) => {
      // Search matching
      const matchesSearch =
        !search ||
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());

      // Category matching
      const matchesCategory =
        selectedCategory === "All" || course.category.toLowerCase() === selectedCategory.toLowerCase();

      // Difficulty matching
      const matchesDifficulty =
        selectedDifficulty === "All" ||
        course.difficultyLevel.toLowerCase().includes(selectedDifficulty.toLowerCase());

      // Price matching
      const matchesPrice =
        selectedPrice === "All" ||
        (selectedPrice === "Free" && course.isFree) ||
        (selectedPrice === "Paid" && !course.isFree);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice;
    });
  }, [search, selectedCategory, selectedDifficulty, selectedPrice]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setSelectedPrice("All");
  };

  const hasActiveFilters =
    search || selectedCategory !== "All" || selectedDifficulty !== "All" || selectedPrice !== "All";

  return (
    <div className="py-12 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-50 dark:bg-brand-navy-900 border border-brand-navy-200 dark:border-brand-navy-800 text-brand-navy-700 dark:text-brand-navy-300 text-xs font-bold uppercase tracking-wider">
            <span>Explore Curriculum</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy-950 dark:text-white tracking-tight">
            All Technical Courses
          </h1>
          <p className="text-brand-grey-600 dark:text-brand-grey-400 text-base">
            Master programming languages, web standards, databases, and AI. Each program includes
            interactive modules, downloadable notes, practice code, and verifiable certification.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-6 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-5">
          {/* Top Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-grey-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses by keyword, language, or concept (e.g. Python, SQL, C++, Flexbox)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-grey-400 hover:text-brand-grey-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Selectors */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-navy-600" />
              <span className="font-bold uppercase tracking-wider text-brand-grey-500">
                Filters:
              </span>
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-brand-navy-500"
            >
              <option value="All">All Categories</option>
              {categoriesList.filter((c) => c !== "All").map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Difficulty Dropdown */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-brand-navy-500"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Price Dropdown */}
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-3 py-2 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-brand-navy-500"
            >
              <option value="All">All Pricing</option>
              <option value="Free">Free Only</option>
              <option value="Paid">Paid Courses</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-3 py-2 rounded-xl text-brand-red-600 dark:text-brand-red-400 font-bold hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}

            <div className="ml-auto text-brand-grey-500 font-medium">
              Showing <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? "course" : "courses"}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200/90 dark:border-brand-navy-800 overflow-hidden hover:shadow-soft-lg hover:border-brand-navy-500/40 dark:hover:border-brand-navy-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-52 w-full overflow-hidden bg-brand-grey-100 dark:bg-brand-navy-950">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

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
                        {course.difficultyLevel}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-amber-300">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{course.rating}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-brand-navy-950 dark:text-white group-hover:text-brand-navy-600 dark:group-hover:text-sky-300 transition-colors line-clamp-2">
                      {course.title}
                    </h2>

                    <p className="text-sm text-brand-grey-600 dark:text-brand-grey-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

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
                        <span>{course.studentsEnrolled.toLocaleString()} Enrolled</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-brand-red-500" />
                        <span>Certificate</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Price & CTA */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-brand-grey-100 dark:border-brand-navy-800 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-brand-grey-400 uppercase font-bold tracking-wider">
                        Enrollment
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
                      <span>Course Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Filter State */
          <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-grey-100 dark:bg-brand-navy-800 text-brand-grey-400 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy-950 dark:text-white">
              No matching courses found
            </h3>
            <p className="text-sm text-brand-grey-500 dark:text-brand-grey-400 max-w-md mx-auto">
              Try adjusting your search keywords or clearing your category and difficulty filters to
              see available courses.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-brand-navy-700 hover:bg-brand-navy-800 text-white text-xs font-bold uppercase tracking-wider"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-sm font-semibold text-brand-navy-700">Loading courses catalog...</div>
        </div>
      }
    >
      <CoursesContent />
    </Suspense>
  );
}

