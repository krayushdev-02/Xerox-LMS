export type UserRole = "student" | "teacher" | "admin";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  phone: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  instructor_id: string | null;
  instructor?: Profile | null;
  category: string;
  difficulty_level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  language: string;
  price: number;
  is_free: boolean;
  is_published: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  modules?: CourseModule[];
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
  created_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  pdf_url: string | null;
  duration_minutes: number;
  order_index: number;
  is_preview: boolean;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  course?: Course;
  status: "active" | "completed" | "dropped";
  progress_percent: number;
  enrolled_at: string;
  completed_at: string | null;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  is_completed: boolean;
  completed_at: string | null;
}

export interface Assignment {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  max_score: number;
  due_date: string | null;
  created_at: string;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  user_id: string;
  content: string | null;
  file_url: string | null;
  score: number | null;
  feedback: string | null;
  status: "submitted" | "graded" | "resubmit";
  submitted_at: string;
  graded_at: string | null;
}

export interface Exam {
  id: string;
  title: string;
  description: string | null;
  course_id: string | null;
  duration_minutes: number;
  passing_marks: number;
  total_marks: number;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  questions?: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  exam_id: string;
  question_text: string;
  question_type: "mcq" | "true_false";
  option_a: string;
  option_b: string;
  option_c: string | null;
  option_d: string | null;
  correct_option?: "A" | "B" | "C" | "D";
  explanation?: string | null;
  marks: number;
  order_index: number;
}

export interface ExamAttempt {
  id: string;
  exam_id: string;
  user_id: string;
  started_at: string;
  submitted_at: string | null;
  score: number;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  is_passed: boolean;
  status: "in_progress" | "completed" | "timed_out";
  exam?: Exam;
}

export interface Certificate {
  id: string;
  certificate_code: string;
  user_id: string;
  course_id: string | null;
  exam_id: string | null;
  student_name: string;
  title: string;
  score: number | null;
  issue_date: string;
  signatory_name: string;
  signatory_title: string;
  is_revoked: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "system" | "course" | "exam" | "certificate" | "assignment";
  is_read: boolean;
  link: string | null;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author_id: string | null;
  target_role: "all" | "student" | "teacher";
  is_published: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  is_resolved: boolean;
  created_at: string;
}

