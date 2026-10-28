import { isSupabaseConfigured, createClient } from "./supabase/client";

export interface EnrollmentState {
  courseId: string;
  courseSlug: string;
  enrolledAt: string;
  progressPercent: number;
  completedLessons: string[];
}

const STORAGE_KEY = "xerox_lms_enrollments";

export function getLocalEnrollments(): Record<string, EnrollmentState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveLocalEnrollment(state: EnrollmentState): void {
  if (typeof window === "undefined") return;
  try {
    const enrollments = getLocalEnrollments();
    enrollments[state.courseSlug] = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enrollments));
  } catch {
    // Ignore
  }
}

export function isEnrolledInCourse(courseSlug: string): boolean {
  const enrollments = getLocalEnrollments();
  return Boolean(enrollments[courseSlug]);
}

export function markLessonCompleted(
  courseSlug: string,
  lessonId: string,
  totalLessons: number
): number {
  const enrollments = getLocalEnrollments();
  const enrollment = enrollments[courseSlug] || {
    courseId: courseSlug,
    courseSlug,
    enrolledAt: new Date().toISOString(),
    progressPercent: 0,
    completedLessons: [],
  };

  if (!enrollment.completedLessons.includes(lessonId)) {
    enrollment.completedLessons.push(lessonId);
  }

  const percent = Math.min(
    100,
    Math.round((enrollment.completedLessons.length / totalLessons) * 100)
  );
  enrollment.progressPercent = percent;

  enrollments[courseSlug] = enrollment;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enrollments));
    } catch {
      // Ignore
    }
  }

  return percent;
}

export function getCourseProgress(courseSlug: string): number {
  const enrollments = getLocalEnrollments();
  return enrollments[courseSlug]?.progressPercent || 0;
}

