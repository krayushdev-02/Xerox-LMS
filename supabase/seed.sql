-- ==============================================================================
-- Xerox LMS: Initial Database Seed
-- Populate courses, modules, lessons, exams, and question banks
-- ==============================================================================

-- Pre-flight: Ensure courses table has all required columns
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS instructor_id UUID;
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

-- 1. Insert Initial Published Courses
INSERT INTO public.courses (id, title, slug, description, category, difficulty_level, language, price, is_free, is_published, is_approved)
VALUES
  (
    'a1b2c3d4-0001-4000-8000-000000000001',
    'Complete Python Bootcamp: From Zero to Hero',
    'complete-python-bootcamp',
    'Master Python with real projects, OOP concepts, automation scripts, and prepare for official certification exams.',
    'Python',
    'Beginner to Advanced',
    'English',
    0.00,
    true,
    true,
    true
  ),
  (
    'a1b2c3d4-0002-4000-8000-000000000002',
    'Modern Web Development: HTML, CSS & JavaScript',
    'modern-web-development-html-css-js',
    'Build responsive, beautiful websites from scratch with hands-on projects, CSS Grid, and interactive JavaScript.',
    'Web Development',
    'Beginner',
    'English',
    0.00,
    true,
    true,
    true
  ),
  (
    'a1b2c3d4-0003-4000-8000-000000000003',
    'C & C++ Masterclass: Data Structures & Algorithms',
    'cpp-masterclass-dsa',
    'Deep dive into pointers, dynamic memory, STL, and algorithmic problem solving for technical interviews.',
    'C++',
    'Intermediate',
    'English',
    499.00,
    false,
    true,
    true
  ),
  (
    'a1b2c3d4-0004-4000-8000-000000000004',
    'SQL & Relational Databases for Developers & Analysts',
    'sql-relational-databases',
    'Learn database normalization, complex joins, window functions, and real-world queries on PostgreSQL.',
    'SQL',
    'Beginner to Intermediate',
    'English',
    0.00,
    true,
    true,
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Sample Modules for Web Development Course
INSERT INTO public.course_modules (id, course_id, title, order_index)
VALUES
  ('b1b2c3d4-0001-4000-8000-000000000001', 'a1b2c3d4-0002-4000-8000-000000000002', 'Module 1: Semantic HTML5 Architecture', 1),
  ('b1b2c3d4-0002-4000-8000-000000000002', 'a1b2c3d4-0002-4000-8000-000000000002', 'Module 2: Modern CSS3, Flexbox & Grid', 2),
  ('b1b2c3d4-0003-4000-8000-000000000003', 'a1b2c3d4-0002-4000-8000-000000000002', 'Module 3: Core JavaScript ES6+ & DOM', 3)
ON CONFLICT DO NOTHING;

-- 3. Insert Lessons
INSERT INTO public.lessons (id, module_id, title, content, duration_minutes, order_index, is_preview)
VALUES
  ('c1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0001-4000-8000-000000000001', 'Introduction to HTML5 & Document Structure', 'Welcome to Xerox LMS! In this lesson, we explore HTML elements, tags, attributes, and page semantics.', 15, 1, true),
  ('c1b2c3d4-0002-4000-8000-000000000002', 'b1b2c3d4-0001-4000-8000-000000000001', 'Semantic Elements: Header, Nav, Main & Footer', 'Learn how semantic tags improve SEO, accessibility, and clean markup.', 20, 2, false),
  ('c1b2c3d4-0003-4000-8000-000000000003', 'b1b2c3d4-0002-4000-8000-000000000002', 'The CSS Box Model, Margins, Borders & Padding', 'Detailed breakdown of the box model and layout sizing properties.', 25, 1, false)
ON CONFLICT DO NOTHING;

-- 4. Insert Official Assessment Exam
INSERT INTO public.exams (id, title, description, duration_minutes, passing_marks, total_marks, is_published)
VALUES
  (
    'e1b2c3d4-0001-4000-8000-000000000001',
    'Technical Knowledge Assessment — Computer Programming & Web Technology',
    '100-question objective examination covering HTML, CSS, JavaScript, C Programming, Python, and SQL. Time allowed: 90 minutes. Maximum marks: 100. Each question carries 1 mark. Passing mark: 40.',
    90,
    40,
    100,
    true
  )
ON CONFLICT DO NOTHING;

-- 5. Insert Exam Questions (Sample set from 100-question curriculum)
INSERT INTO public.exam_questions (exam_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, marks, order_index)
VALUES
  (
    'e1b2c3d4-0001-4000-8000-000000000001',
    'What is the primary purpose of HTML?',
    'mcq',
    'To manage databases',
    'To structure content on web pages',
    'To perform server-side calculations',
    'To design operating systems',
    'B',
    'HTML provides the basic structural foundation for web documents.',
    1,
    1
  ),
  (
    'e1b2c3d4-0001-4000-8000-000000000001',
    'Which HTML tag is used to create a hyperlink?',
    'mcq',
    '<link>',
    '<href>',
    '<a>',
    '<url>',
    'C',
    'The <a> (anchor) tag with the href attribute defines a hyperlink.',
    1,
    2
  ),
  (
    'e1b2c3d4-0001-4000-8000-000000000001',
    'Which HTML element represents the largest heading by default?',
    'mcq',
    '<h6>',
    '<heading>',
    '<head>',
    '<h1>',
    'D',
    '<h1> defines the top-level, largest heading in semantic HTML.',
    1,
    3
  ),
  (
    'e1b2c3d4-0001-4000-8000-000000000001',
    'Which CSS property controls the spacing inside an element boundary?',
    'mcq',
    'margin',
    'padding',
    'border',
    'outline',
    'B',
    'Padding defines the inner spacing between content and border.',
    1,
    16
  ),
  (
    'e1b2c3d4-0001-4000-8000-000000000001',
    'In JavaScript, which keyword declares a block-scoped reassignable variable?',
    'mcq',
    'var',
    'let',
    'const',
    'global',
    'B',
    'let declares block-scoped variables that can be updated.',
    1,
    31
  ),
  (
    'e1b2c3d4-0001-4000-8000-000000000001',
    'In C programming, which format specifier is used with printf to print an integer?',
    'mcq',
    '%f',
    '%s',
    '%d',
    '%c',
    'C',
    '%d (or %i) prints decimal signed integers.',
    1,
    51
  ),
  (
    'e1b2c3d4-0001-4000-8000-000000000001',
    'In Python, which built-in function returns the length of a sequence?',
    'mcq',
    'count()',
    'size()',
    'len()',
    'length()',
    'C',
    'len() is the standard Python built-in function for sequence length.',
    1,
    66
  ),
  (
    'e1b2c3d4-0001-4000-8000-000000000001',
    'In SQL, which clause filters rows before aggregation?',
    'mcq',
    'HAVING',
    'WHERE',
    'GROUP BY',
    'ORDER BY',
    'B',
    'WHERE filters rows before aggregation, while HAVING filters grouped results.',
    1,
    81
  )
ON CONFLICT DO NOTHING;

-- 6. Insert System Announcements
INSERT INTO public.announcements (title, content, target_role, is_published)
VALUES
  (
    'Welcome to Xerox LMS Platform',
    'Welcome to Xerox LMS! Explore our comprehensive technical programming tracks, practice online exam question banks, and earn verifiable certificates.',
    'all',
    true
  ),
  (
    'Online Examination Portal Active',
    'The 100-Question Computer Programming Assessment is now live. Complete it to obtain your official completion certificate.',
    'student',
    true
  )
ON CONFLICT DO NOTHING;

