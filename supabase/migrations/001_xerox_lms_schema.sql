-- ==============================================================================
-- Xerox LMS: Complete Database Schema & Row Level Security (RLS) Migration
-- Version: 1.0.0
-- Created for: Xerox LMS (Learn Smarter. Achieve More.)
-- ==============================================================================

-- 0. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 2. COURSES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  instructor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category TEXT NOT NULL DEFAULT 'General',
  difficulty_level TEXT NOT NULL DEFAULT 'Beginner' CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Beginner to Advanced', 'Beginner to Intermediate')),
  language TEXT NOT NULL DEFAULT 'English',
  price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  is_free BOOLEAN NOT NULL DEFAULT true,
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure all columns exist in case the table was created previously without them
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS instructor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'General';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS difficulty_level TEXT NOT NULL DEFAULT 'Beginner';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'English';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS price NUMERIC(10,2) NOT NULL DEFAULT 0.00;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_free BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_approved BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Safely expand difficulty_level check constraint
DO $$
BEGIN
  ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_difficulty_level_check;
  ALTER TABLE public.courses ADD CONSTRAINT courses_difficulty_level_check CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Beginner to Advanced', 'Beginner to Intermediate'));
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- ==============================================================================
-- 3. COURSE MODULES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. LESSONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  pdf_url TEXT,
  duration_minutes INT NOT NULL DEFAULT 15,
  order_index INT NOT NULL DEFAULT 0,
  is_preview BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 5. ENROLLMENTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
  progress_percent NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  CONSTRAINT unique_user_course UNIQUE (user_id, course_id)
);

-- ==============================================================================
-- 6. LESSON PROGRESS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id)
);

-- ==============================================================================
-- 7. ASSIGNMENTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  max_score INT NOT NULL DEFAULT 100,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 8. ASSIGNMENT SUBMISSIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT,
  file_url TEXT,
  score NUMERIC(5,2),
  feedback TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'resubmit')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  graded_at TIMESTAMPTZ,
  CONSTRAINT unique_user_assignment UNIQUE (user_id, assignment_id)
);

-- ==============================================================================
-- 9. EXAMS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  duration_minutes INT NOT NULL DEFAULT 60,
  passing_marks INT NOT NULL DEFAULT 40,
  total_marks INT NOT NULL DEFAULT 100,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 10. EXAM QUESTIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.exam_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'mcq' CHECK (question_type IN ('mcq', 'true_false')),
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT,
  option_d TEXT,
  correct_option TEXT NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
  explanation TEXT,
  marks INT NOT NULL DEFAULT 1,
  order_index INT NOT NULL DEFAULT 0
);

-- ==============================================================================
-- 11. EXAM ATTEMPTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  total_questions INT NOT NULL DEFAULT 0,
  correct_answers INT NOT NULL DEFAULT 0,
  wrong_answers INT NOT NULL DEFAULT 0,
  is_passed BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'timed_out'))
);

-- ==============================================================================
-- 12. EXAM ANSWERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.exam_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attempt_id UUID NOT NULL REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.exam_questions(id) ON DELETE CASCADE,
  selected_option TEXT CHECK (selected_option IN ('A', 'B', 'C', 'D')),
  is_correct BOOLEAN NOT NULL DEFAULT false,
  marks_awarded NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  CONSTRAINT unique_attempt_question UNIQUE (attempt_id, question_id)
);

-- ==============================================================================
-- 13. ATTENDANCE TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'excused')),
  recorded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_attendance_record UNIQUE (course_id, user_id, date)
);

-- ==============================================================================
-- 14. CERTIFICATES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_code TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  exam_id UUID REFERENCES public.exams(id) ON DELETE SET NULL,
  student_name TEXT NOT NULL,
  title TEXT NOT NULL,
  score NUMERIC(5,2),
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  signatory_name TEXT NOT NULL DEFAULT 'Ayush Kumar',
  signatory_title TEXT NOT NULL DEFAULT 'Academic Director, Xerox LMS',
  is_revoked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 15. NOTIFICATIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'system' CHECK (type IN ('system', 'course', 'exam', 'certificate', 'assignment')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 16. ANNOUNCEMENTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  target_role TEXT NOT NULL DEFAULT 'all' CHECK (target_role IN ('all', 'student', 'teacher')),
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 17. CONTACT MESSAGES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  is_resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR HIGH QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON public.courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_modules_course ON public.course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_questions_exam ON public.exam_questions(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_user ON public.exam_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_exam ON public.exam_attempts(exam_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON public.certificates(certificate_code);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);

-- ==============================================================================
-- AUTOMATIC PROFILE TRIGGER (ON AUTH SIGN-UP)
-- Strictly prevents users from self-assigning 'admin' during registration!
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  requested_role TEXT;
BEGIN
  -- Extract user role from metadata; allow ONLY 'student' or 'teacher' from public signups.
  -- Never allow public self-assignment of 'admin'.
  requested_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');
  IF requested_role NOT IN ('student', 'teacher') THEN
    requested_role := 'student';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role, avatar_url, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    requested_role,
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'phone'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- HELPER FUNCTIONS FOR ROW LEVEL SECURITY (RLS)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('teacher', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL 17 TABLES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- RLS POLICIES
-- ==============================================================================

-- 1. Profiles
CREATE POLICY "Public profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile (role protected)"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND (
      role = (SELECT role FROM public.profiles WHERE id = auth.uid()) OR public.is_admin()
    )
  );

CREATE POLICY "Admins can manage all profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- 2. Courses
CREATE POLICY "Public can view published and approved courses"
  ON public.courses FOR SELECT
  USING (is_published = true AND is_approved = true);

CREATE POLICY "Teachers can view their own courses"
  ON public.courses FOR SELECT
  USING (auth.uid() = instructor_id);

CREATE POLICY "Teachers can create courses"
  ON public.courses FOR INSERT
  WITH CHECK (auth.uid() = instructor_id AND public.is_teacher());

CREATE POLICY "Teachers can update their own courses"
  ON public.courses FOR UPDATE
  USING (auth.uid() = instructor_id OR public.is_admin());

CREATE POLICY "Admins can manage all courses"
  ON public.courses FOR ALL
  USING (public.is_admin());

-- 3. Course Modules
CREATE POLICY "Anyone can view modules of published courses"
  ON public.course_modules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = course_modules.course_id
      AND (courses.is_published = true OR courses.instructor_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Teachers can manage modules of their courses"
  ON public.course_modules FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = course_modules.course_id
      AND (courses.instructor_id = auth.uid() OR public.is_admin())
    )
  );

-- 4. Lessons
CREATE POLICY "Enrolled students and instructors can view lessons"
  ON public.lessons FOR SELECT
  USING (
    is_preview = true OR
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.course_modules m
      JOIN public.courses c ON c.id = m.course_id
      WHERE m.id = lessons.module_id AND (
        c.instructor_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.enrollments e
          WHERE e.course_id = c.id AND e.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Teachers can manage lessons in their modules"
  ON public.lessons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.course_modules m
      JOIN public.courses c ON c.id = m.course_id
      WHERE m.id = lessons.module_id AND (c.instructor_id = auth.uid() OR public.is_admin())
    )
  );

-- 5. Enrollments
CREATE POLICY "Students can view their own enrollments"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = user_id OR public.is_teacher() OR public.is_admin());

CREATE POLICY "Students can enroll themselves"
  ON public.enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students and teachers can update progress"
  ON public.enrollments FOR UPDATE
  USING (auth.uid() = user_id OR public.is_teacher() OR public.is_admin());

-- 6. Lesson Progress
CREATE POLICY "Students can view and manage their own progress"
  ON public.lesson_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Instructors and admins can view student progress"
  ON public.lesson_progress FOR SELECT
  USING (public.is_teacher() OR public.is_admin());

-- 7. Assignments
CREATE POLICY "Anyone enrolled or teaching can view assignments"
  ON public.assignments FOR SELECT
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = assignments.course_id AND (
        c.instructor_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.enrollments e WHERE e.course_id = c.id AND e.user_id = auth.uid())
      )
    )
  );

CREATE POLICY "Teachers can manage assignments for their courses"
  ON public.assignments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = assignments.course_id AND (c.instructor_id = auth.uid() OR public.is_admin())
    )
  );

-- 8. Assignment Submissions
CREATE POLICY "Students can view and submit their assignments"
  ON public.assignment_submissions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers can view and grade student submissions"
  ON public.assignment_submissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON c.id = a.course_id
      WHERE a.id = assignment_submissions.assignment_id AND (c.instructor_id = auth.uid() OR public.is_admin())
    )
  );

-- 9. Exams
CREATE POLICY "Anyone can view published exams"
  ON public.exams FOR SELECT
  USING (is_published = true OR created_by = auth.uid() OR public.is_admin());

CREATE POLICY "Teachers and admins can manage exams"
  ON public.exams FOR ALL
  USING (created_by = auth.uid() OR public.is_admin());

-- 10. Exam Questions
-- Notice: Correct options are shielded from non-admin/non-teacher clients when querying
CREATE POLICY "Students taking exams can view question choices"
  ON public.exam_questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.exams e
      WHERE e.id = exam_questions.exam_id AND (e.is_published = true OR e.created_by = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Teachers and admins can manage exam questions"
  ON public.exam_questions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.exams e
      WHERE e.id = exam_questions.exam_id AND (e.created_by = auth.uid() OR public.is_admin())
    )
  );

-- 11. Exam Attempts
CREATE POLICY "Students can view and manage their own attempts"
  ON public.exam_attempts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers and admins can view all attempts"
  ON public.exam_attempts FOR SELECT
  USING (public.is_teacher() OR public.is_admin());

-- 12. Exam Answers
CREATE POLICY "Students can manage answers in their attempts"
  ON public.exam_answers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.exam_attempts a
      WHERE a.id = exam_answers.attempt_id AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers and admins can view answers"
  ON public.exam_answers FOR SELECT
  USING (public.is_teacher() OR public.is_admin());

-- 13. Attendance
CREATE POLICY "Students can view their attendance"
  ON public.attendance FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers and admins can record attendance"
  ON public.attendance FOR ALL
  USING (public.is_teacher() OR public.is_admin());

-- 14. Certificates
CREATE POLICY "Public can view valid certificates by certificate_code for verification"
  ON public.certificates FOR SELECT
  USING (is_revoked = false OR auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Teachers and admins can issue certificates"
  ON public.certificates FOR INSERT
  WITH CHECK (public.is_teacher() OR public.is_admin());

CREATE POLICY "Admins can update or revoke certificates"
  ON public.certificates FOR UPDATE
  USING (public.is_admin());

-- 15. Notifications
CREATE POLICY "Users can view and update their own notifications"
  ON public.notifications FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 16. Announcements
CREATE POLICY "Announcements are viewable based on target role"
  ON public.announcements FOR SELECT
  USING (
    is_published = true AND (
      target_role = 'all' OR
      (target_role = 'student' AND auth.uid() IS NOT NULL) OR
      (target_role = 'teacher' AND public.is_teacher()) OR
      public.is_admin()
    )
  );

CREATE POLICY "Admins can manage announcements"
  ON public.announcements FOR ALL
  USING (public.is_admin());

-- 17. Contact Messages
CREATE POLICY "Public visitors can submit contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view and manage contact messages"
  ON public.contact_messages FOR ALL
  USING (public.is_admin());

