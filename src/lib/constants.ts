export const SITE_NAME = "Xerox LMS";
export const SITE_TAGLINE = "Learn Smarter. Achieve More.";
export const SITE_DESCRIPTION =
  "Learn new skills, attend online exams, explore courses, and earn certificates with Xerox LMS.";

export const CONTACT_INFO = {
  phone: "9341277351",
  email: "ayushk2375@gmail.com",
  googleFormUrl: "https://forms.gle/SfEn34TgodYFNTRh8",
};

export const POPULAR_CATEGORIES = [
  {
    id: "programming",
    name: "Programming",
    slug: "programming",
    icon: "Code2",
    count: 18,
    description: "Core algorithms, data structures & logic building",
  },
  {
    id: "web-development",
    name: "Web Development",
    slug: "web-development",
    icon: "Globe",
    count: 24,
    description: "Modern full-stack web applications & architectures",
  },
  {
    id: "python",
    name: "Python",
    slug: "python",
    icon: "FileCode",
    count: 16,
    description: "From basics to automation, data science & backend",
  },
  {
    id: "java",
    name: "Java",
    slug: "java",
    icon: "Coffee",
    count: 14,
    description: "Object-oriented programming, enterprise apps & Spring",
  },
  {
    id: "c",
    name: "C",
    slug: "c",
    icon: "Terminal",
    count: 10,
    description: "Foundational low-level systems & memory concepts",
  },
  {
    id: "cpp",
    name: "C++",
    slug: "cpp",
    icon: "Cpu",
    count: 12,
    description: "High-performance programming & competitive coding",
  },
  {
    id: "html",
    name: "HTML",
    slug: "html",
    icon: "Layout",
    count: 9,
    description: "Semantic markup, accessibility & modern web structure",
  },
  {
    id: "css",
    name: "CSS",
    slug: "css",
    icon: "Palette",
    count: 11,
    description: "Responsive layouts, Flexbox, Grid & animations",
  },
  {
    id: "javascript",
    name: "JavaScript",
    slug: "javascript",
    icon: "Sparkles",
    count: 20,
    description: "ES6+, asynchronous programming & DOM manipulation",
  },
  {
    id: "sql",
    name: "SQL",
    slug: "sql",
    icon: "Database",
    count: 13,
    description: "Relational database queries, joins & indexing",
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    slug: "ai",
    icon: "Bot",
    count: 15,
    description: "Machine learning, prompt engineering & GenAI models",
  },
];

// Sample featured courses clearly labeled as Demo / Sample until live Supabase data connects
export const SAMPLE_COURSES = [
  {
    id: "sample-course-1",
    title: "Complete Python Bootcamp: From Zero to Hero",
    slug: "complete-python-bootcamp",
    description:
      "Master Python with real projects, OOP concepts, automation scripts, and prepare for official certification exams.",
    instructor: "Ayush Kumar",
    category: "Python",
    level: "Beginner to Advanced",
    language: "English",
    duration: "24 Hours",
    lessonsCount: 48,
    rating: 4.9,
    studentsEnrolled: 1420,
    isFree: true,
    price: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80",
    badge: "Bestseller",
    hasCertificate: true,
    isSample: true,
  },
  {
    id: "sample-course-2",
    title: "Modern Web Development: HTML, CSS & JavaScript",
    slug: "modern-web-development-html-css-js",
    description:
      "Build responsive, beautiful websites from scratch with hands-on projects, CSS Grid, and interactive JavaScript.",
    instructor: "Ayush Kumar",
    category: "Web Development",
    level: "Beginner",
    language: "English",
    duration: "18 Hours",
    lessonsCount: 36,
    rating: 4.8,
    studentsEnrolled: 2150,
    isFree: true,
    price: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop&q=80",
    badge: "Popular",
    hasCertificate: true,
    isSample: true,
  },
  {
    id: "sample-course-3",
    title: "C & C++ Masterclass: Data Structures & Algorithms",
    slug: "cpp-masterclass-dsa",
    description:
      "Deep dive into pointers, dynamic memory, STL, and algorithmic problem solving for technical interviews.",
    instructor: "Ayush Kumar",
    category: "C++",
    level: "Intermediate",
    language: "English",
    duration: "30 Hours",
    lessonsCount: 60,
    rating: 4.9,
    studentsEnrolled: 980,
    isFree: false,
    price: 499,
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    badge: "Top Rated",
    hasCertificate: true,
    isSample: true,
  },
  {
    id: "sample-course-4",
    title: "SQL & Relational Databases for Developers & Analysts",
    slug: "sql-relational-databases",
    description:
      "Learn database normalization, complex joins, window functions, and real-world queries on PostgreSQL.",
    instructor: "Ayush Kumar",
    category: "SQL",
    level: "Beginner to Intermediate",
    language: "English",
    duration: "14 Hours",
    lessonsCount: 28,
    rating: 4.7,
    studentsEnrolled: 1640,
    isFree: true,
    price: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
    badge: "Free Certificate",
    hasCertificate: true,
    isSample: true,
  },
  {
    id: "sample-course-5",
    title: "Java Enterprise Programming: Core to Spring Boot",
    slug: "java-enterprise-programming",
    description:
      "Build production-grade REST APIs, understand multi-threading, microservices, and enterprise architecture.",
    instructor: "Ayush Kumar",
    category: "Java",
    level: "Advanced",
    language: "English",
    duration: "32 Hours",
    lessonsCount: 52,
    rating: 4.8,
    studentsEnrolled: 890,
    isFree: false,
    price: 799,
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    badge: "Featured",
    hasCertificate: true,
    isSample: true,
  },
  {
    id: "sample-course-6",
    title: "Artificial Intelligence & Prompt Engineering Fundamentals",
    slug: "ai-prompt-engineering-fundamentals",
    description:
      "Understand LLMs, generative AI workflows, API integration, and AI-assisted application development.",
    instructor: "Ayush Kumar",
    category: "Artificial Intelligence",
    level: "All Levels",
    language: "English",
    duration: "16 Hours",
    lessonsCount: 30,
    rating: 4.9,
    studentsEnrolled: 3120,
    isFree: true,
    price: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
    badge: "Trending",
    hasCertificate: true,
    isSample: true,
  },
];

export const DEMO_STATS = [
  { label: "Active Students", value: "10,000+", isDemo: true },
  { label: "Available Courses", value: "50+", isDemo: true },
  { label: "Online Exams Hosted", value: "250+", isDemo: true },
  { label: "Certificates Issued", value: "8,500+", isDemo: true },
];

export const FAQS = [
  {
    question: "How do I enroll in a course on Xerox LMS?",
    answer:
      "Simply create a free student account, navigate to the course catalog, select any course, and click 'Enroll Now'. You will instantly gain access to modules, lesson videos, and downloadable resources.",
  },
  {
    question: "Are the certificates verified and authentic?",
    answer:
      "Yes! Every certificate generated by Xerox LMS comes with a unique Certificate ID and a public verification link. Anyone can verify certificate authenticity on our public Certificate Verification page.",
  },
  {
    question: "How do the online examinations work?",
    answer:
      "Exams feature objective MCQs and True/False questions with a real-time countdown timer, automatic question navigation, and autosave. When you submit (or time expires), your marks are computed instantly on the server.",
  },
  {
    question: "What is the AI Tutor and how do I use it?",
    answer:
      "The Xerox LMS AI Tutor is your 24/7 personal learning assistant. It can explain tough programming concepts, generate practice quizzes, break down code errors, and provide revision notes in simple language.",
  },
  {
    question: "Can teachers host examinations and issue certificates?",
    answer:
      "Yes. Verified teachers have access to a dedicated Teacher Dashboard where they can create courses, build question banks, conduct timed tests, grade submissions, and issue course completion certificates.",
  },
  {
    question: "How do I contact Xerox LMS for support?",
    answer:
      "You can contact us directly by phone at 9341277351 or by email at ayushk2375@gmail.com. You can also send a message via our Contact Us form.",
  },
];

