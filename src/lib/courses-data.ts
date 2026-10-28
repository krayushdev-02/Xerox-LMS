export interface LessonItem {
  id: string;
  title: string;
  durationMinutes: number;
  isPreview: boolean;
  videoUrl: string;
  pdfUrl?: string;
  content: string;
}

export interface CourseModuleItem {
  id: string;
  title: string;
  lessons: LessonItem[];
}

export interface FullCourse {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
  };
  category: string;
  difficultyLevel:
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "All Levels"
    | "Beginner to Advanced"
    | "Beginner to Intermediate";
  language: string;
  price: number;
  isFree: boolean;
  thumbnail: string;
  duration: string;
  lessonsCount: number;
  rating: number;
  studentsEnrolled: number;
  badge?: string;
  hasCertificate: boolean;
  learningOutcomes: string[];
  requirements: string[];
  modules: CourseModuleItem[];
}

export const DETAILED_COURSES: FullCourse[] = [
  {
    id: "course-python-1",
    slug: "complete-python-bootcamp",
    title: "Complete Python Bootcamp: From Zero to Hero",
    description:
      "Master Python with real projects, OOP concepts, automation scripts, and prepare for official certification exams.",
    longDescription:
      "This comprehensive bootcamp takes you from absolute beginner to competent Python developer. You will build real-world automation scripts, understand Object-Oriented Programming (OOP), manipulate data with Pandas, build APIs, and prepare for the Xerox LMS 100-Question technical assessment.",
    instructor: {
      name: "Ayush Kumar",
      title: "Senior Lead Instructor & Software Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
      bio: "Ayush is an experienced full-stack engineer and programming educator specializing in Python, modern web development, and cloud computing.",
    },
    category: "Python",
    difficultyLevel: "Beginner to Advanced",
    language: "English",
    price: 0,
    isFree: true,
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80",
    duration: "24 Hours",
    lessonsCount: 8,
    rating: 4.9,
    studentsEnrolled: 1420,
    badge: "Bestseller",
    hasCertificate: true,
    learningOutcomes: [
      "Write clean, idiomatic Python code conforming to PEP 8 standards",
      "Master fundamental data structures: Lists, Dictionaries, Tuples, and Sets",
      "Build modular applications using Object-Oriented Programming (Classes & Inheritance)",
      "Automate file processing, CSV parsing, and JSON operations",
      "Qualify for the Xerox LMS Python certification examination",
    ],
    requirements: [
      "A computer (Windows, macOS, or Linux) with internet connection",
      "No prior coding experience required; we start from scratch",
    ],
    modules: [
      {
        id: "mod-py-1",
        title: "Module 1: Python Fundamentals & Syntax",
        lessons: [
          {
            id: "les-py-1",
            title: "Lesson 1: Introduction to Python & Environment Setup",
            durationMinutes: 15,
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            pdfUrl: "/materials/python-lesson-1.pdf",
            content: `
### Welcome to Python Programming

Python is an interpreted, high-level, general-purpose programming language created by Guido van Rossum. Its design philosophy emphasizes code readability with the use of significant indentation.

#### Why Learn Python?
- **Clear Syntax:** Python's clean syntax mimics natural English.
- **Vast Ecosystem:** Over 400,000 packages on PyPI for web, AI, automation, and data science.
- **Cross-Platform:** Runs seamlessly on Windows, macOS, and Linux.

#### Example Code:
\`\`\`python
# Your first Python program
def greet(name: str) -> str:
    return f"Welcome to Xerox LMS, {name}!"

print(greet("Student"))
\`\`\`
            `,
          },
          {
            id: "les-py-2",
            title: "Lesson 2: Variables, Data Types & Type Casting",
            durationMinutes: 20,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            pdfUrl: "/materials/python-lesson-2.pdf",
            content: `
### Variables & Built-in Types

In Python, variables do not require explicit type declaration. They are dynamically typed at runtime.

#### Primary Primitive Types:
1. \`int\` - Integers (e.g. 42, -10)
2. \`float\` - Floating point numbers (e.g. 3.14159)
3. \`str\` - Immutable text strings
4. \`bool\` - Boolean values (\`True\` or \`False\`)
            `,
          },
        ],
      },
      {
        id: "mod-py-2",
        title: "Module 2: Control Flow & Loops",
        lessons: [
          {
            id: "les-py-3",
            title: "Lesson 3: Conditional Logic (if, elif, else)",
            durationMinutes: 18,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Conditional Statements

Control flow allows programs to make decisions based on logical conditions.

\`\`\`python
score = 85
if score >= 90:
    grade = "A+"
elif score >= 75:
    grade = "A"
elif score >= 50:
    grade = "B"
else:
    grade = "Needs Improvement"
print(f"Final Grade: {grade}")
\`\`\`
            `,
          },
          {
            id: "les-py-4",
            title: "Lesson 4: For & While Loops with Iterators",
            durationMinutes: 22,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Iteration in Python

Loops are used to execute a block of code repeatedly over sequences such as lists, strings, and ranges.
            `,
          },
        ],
      },
      {
        id: "mod-py-3",
        title: "Module 3: Functions, Modules & Error Handling",
        lessons: [
          {
            id: "les-py-5",
            title: "Lesson 5: Defining Functions, *args & **kwargs",
            durationMinutes: 25,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Functions & Clean Architecture

Functions encapsulate reusable logic, minimizing code duplication (DRY principle).
            `,
          },
          {
            id: "les-py-6",
            title: "Lesson 6: Exception Handling (try, except, finally)",
            durationMinutes: 20,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Robust Error Handling

Gracefully handle runtime errors without crashing applications using Python's try-except blocks.
            `,
          },
        ],
      },
      {
        id: "mod-py-4",
        title: "Module 4: Object-Oriented Programming (OOP)",
        lessons: [
          {
            id: "les-py-7",
            title: "Lesson 7: Classes, Objects & The __init__ Method",
            durationMinutes: 30,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### OOP Principles

Learn Encapsulation, Abstraction, Inheritance, and Polymorphism in Python.
            `,
          },
          {
            id: "les-py-8",
            title: "Lesson 8: Final Project & Certification Assessment Prep",
            durationMinutes: 35,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Capstone Project & Exam Readiness

Review core exam topics and take your final course examination on the Xerox LMS portal.
            `,
          },
        ],
      },
    ],
  },
  {
    id: "course-web-2",
    slug: "modern-web-development-html-css-js",
    title: "Modern Web Development: HTML, CSS & JavaScript",
    description:
      "Build responsive, beautiful websites from scratch with hands-on projects, CSS Grid, and interactive JavaScript.",
    longDescription:
      "A complete foundation in web engineering. Master semantic HTML5 elements, CSS Flexbox and Grid responsive designs, DOM manipulation, asynchronous JavaScript with Fetch and Promises, and best practices.",
    instructor: {
      name: "Ayush Kumar",
      title: "Senior Lead Instructor & Software Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
      bio: "Ayush is an experienced full-stack engineer and programming educator specializing in Python, modern web development, and cloud computing.",
    },
    category: "Web Development",
    difficultyLevel: "Beginner",
    language: "English",
    price: 0,
    isFree: true,
    thumbnail:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop&q=80",
    duration: "18 Hours",
    lessonsCount: 6,
    rating: 4.8,
    studentsEnrolled: 2150,
    badge: "Popular",
    hasCertificate: true,
    learningOutcomes: [
      "Build semantically sound web pages using HTML5 structural elements",
      "Design mobile-first responsive web apps with CSS3 Grid and Flexbox",
      "Manipulate the Document Object Model (DOM) dynamically with JavaScript",
      "Handle asynchronous API requests using Promises and async/await",
    ],
    requirements: [
      "Any modern web browser (Google Chrome, Edge, Firefox, or Safari)",
      "A text editor like VS Code",
    ],
    modules: [
      {
        id: "mod-web-1",
        title: "Module 1: Semantic HTML5 Architecture",
        lessons: [
          {
            id: "les-web-1",
            title: "Lesson 1: Introduction to Semantic HTML5",
            durationMinutes: 15,
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Semantic HTML5

Semantic elements give meaning to web structure rather than presentation.

#### Key Semantic Elements:
- \`<header>\`: Introductory content or navigational aids
- \`<nav>\`: Navigation links section
- \`<main>\`: The central content unique to the document
- \`<article>\`: Self-contained independent composition
- \`<section>\`: Thematic grouping of content
- \`<footer>\`: Document or section footer
            `,
          },
          {
            id: "les-web-2",
            title: "Lesson 2: Forms, Inputs, Validation & Accessibility",
            durationMinutes: 20,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Form Controls & Accessible Web

Build secure client-side forms with input types, labels, ARIA attributes, and required constraints.
            `,
          },
        ],
      },
      {
        id: "mod-web-2",
        title: "Module 2: Modern CSS3 Layouts & Responsive Design",
        lessons: [
          {
            id: "les-web-3",
            title: "Lesson 3: The CSS Box Model & Flexbox",
            durationMinutes: 25,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Flexbox Mastery

Flexbox simplifies 1D layout distribution across rows and columns.
            `,
          },
          {
            id: "les-web-4",
            title: "Lesson 4: CSS Grid & Media Queries",
            durationMinutes: 25,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### 2D Layouts with CSS Grid

Master rows, columns, grid-template-areas, and responsive breakpoints.
            `,
          },
        ],
      },
      {
        id: "mod-web-3",
        title: "Module 3: JavaScript ES6+ & DOM Events",
        lessons: [
          {
            id: "les-web-5",
            title: "Lesson 5: Variables, Arrow Functions & Array Methods",
            durationMinutes: 30,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Modern JavaScript (ES6+)

Learn \`const\`, \`let\`, arrow syntax, \`map\`, \`filter\`, and \`reduce\`.
            `,
          },
          {
            id: "les-web-6",
            title: "Lesson 6: Asynchronous JavaScript (Fetch, Promises & Async/Await)",
            durationMinutes: 30,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Asynchronous JavaScript

Communicate with REST APIs using \`async\` / \`await\` and handle JSON data seamlessly.
            `,
          },
        ],
      },
    ],
  },
  {
    id: "course-cpp-3",
    slug: "cpp-masterclass-dsa",
    title: "C & C++ Masterclass: Data Structures & Algorithms",
    description:
      "Deep dive into pointers, dynamic memory, STL, and algorithmic problem solving for technical interviews.",
    longDescription:
      "Explore low-level systems programming in C and high-performance algorithms in C++. You will master memory allocation, pointers, linked lists, trees, graphs, sorting algorithms, and the C++ Standard Template Library (STL).",
    instructor: {
      name: "Ayush Kumar",
      title: "Senior Lead Instructor & Software Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
      bio: "Ayush is an experienced full-stack engineer and programming educator specializing in Python, modern web development, and cloud computing.",
    },
    category: "C++",
    difficultyLevel: "Intermediate",
    language: "English",
    price: 499,
    isFree: false,
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    duration: "30 Hours",
    lessonsCount: 6,
    rating: 4.9,
    studentsEnrolled: 980,
    badge: "Top Rated",
    hasCertificate: true,
    learningOutcomes: [
      "Master pointers, memory addresses, and dynamic memory allocation (malloc/free, new/delete)",
      "Implement fundamental data structures from scratch (Linked Lists, Stacks, Queues, Binary Trees)",
      "Leverage the C++ Standard Template Library (vectors, maps, sets, algorithms)",
      "Analyze time and space complexity with Big-O notation",
    ],
    requirements: [
      "Basic understanding of any programming language is helpful but not mandatory",
      "GCC / G++ or modern C++ compiler installed",
    ],
    modules: [
      {
        id: "mod-cpp-1",
        title: "Module 1: C Programming & Memory Pointers",
        lessons: [
          {
            id: "les-cpp-1",
            title: "Lesson 1: Pointers & Memory Architecture",
            durationMinutes: 25,
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Pointers & Memory in C

A pointer is a variable that stores the memory address of another variable.

\`\`\`c
#include <stdio.h>

int main() {
    int value = 42;
    int *ptr = &value;
    
    printf("Value: %d\\n", value);
    printf("Address: %p\\n", ptr);
    printf("Dereferenced: %d\\n", *ptr);
    return 0;
}
\`\`\`
            `,
          },
          {
            id: "les-cpp-2",
            title: "Lesson 2: Dynamic Memory (malloc, calloc, realloc, free)",
            durationMinutes: 30,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Dynamic Memory Allocation

Allocate heap memory dynamically and avoid memory leaks by always pairing \`malloc\` with \`free\`.
            `,
          },
        ],
      },
      {
        id: "mod-cpp-2",
        title: "Module 2: Object-Oriented C++ & STL",
        lessons: [
          {
            id: "les-cpp-3",
            title: "Lesson 3: C++ Classes, Templates & Operator Overloading",
            durationMinutes: 35,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### C++ Object Orientation

Build strongly typed reusable classes and generic templates.
            `,
          },
          {
            id: "les-cpp-4",
            title: "Lesson 4: C++ Standard Template Library (vector, map, set)",
            durationMinutes: 35,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Mastering the STL

Use optimized built-in containers and algorithms for interview problem solving.
            `,
          },
        ],
      },
      {
        id: "mod-cpp-3",
        title: "Module 3: Core Data Structures",
        lessons: [
          {
            id: "les-cpp-5",
            title: "Lesson 5: Singly & Doubly Linked Lists",
            durationMinutes: 40,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Linked List Operations

Insertions, deletions, reversals, and cycle detection algorithms.
            `,
          },
          {
            id: "les-cpp-6",
            title: "Lesson 6: Binary Search Trees & Graph Traversals",
            durationMinutes: 45,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Trees & Graphs

Implement BFS, DFS, and tree balancing fundamentals.
            `,
          },
        ],
      },
    ],
  },
  {
    id: "course-sql-4",
    slug: "sql-relational-databases",
    title: "SQL & Relational Databases for Developers & Analysts",
    description:
      "Learn database normalization, complex joins, window functions, and real-world queries on PostgreSQL.",
    longDescription:
      "Master relational data modeling and SQL querying on PostgreSQL. From basic SELECT statements to multi-table joins, subqueries, aggregation, window functions, and indexing strategies.",
    instructor: {
      name: "Ayush Kumar",
      title: "Senior Lead Instructor & Software Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
      bio: "Ayush is an experienced full-stack engineer and programming educator specializing in Python, modern web development, and cloud computing.",
    },
    category: "SQL",
    difficultyLevel: "Beginner to Intermediate",
    language: "English",
    price: 0,
    isFree: true,
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
    duration: "14 Hours",
    lessonsCount: 6,
    rating: 4.7,
    studentsEnrolled: 1640,
    badge: "Free Certificate",
    hasCertificate: true,
    learningOutcomes: [
      "Write high-efficiency SQL queries on PostgreSQL and MySQL",
      "Master INNER, LEFT, RIGHT, and FULL OUTER joins",
      "Aggregate metrics using GROUP BY, HAVING, and Window Functions (ROW_NUMBER, RANK)",
      "Design normalized schemas (1NF, 2NF, 3NF) with primary and foreign keys",
    ],
    requirements: [
      "No database experience needed",
      "Any web browser (use the Xerox LMS interactive SQL playground)",
    ],
    modules: [
      {
        id: "mod-sql-1",
        title: "Module 1: Relational Concepts & Basic Queries",
        lessons: [
          {
            id: "les-sql-1",
            title: "Lesson 1: Introduction to SQL & Relational Databases",
            durationMinutes: 15,
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Relational Database Fundamentals

SQL (Structured Query Language) is the standard language for relational database systems like PostgreSQL, SQLite, and MySQL.

\`\`\`sql
-- Simple query filtering active students
SELECT id, full_name, email, role
FROM public.profiles
WHERE role = 'student'
ORDER BY created_at DESC
LIMIT 10;
\`\`\`
            `,
          },
          {
            id: "les-sql-2",
            title: "Lesson 2: Filtering Data with WHERE, IN, LIKE & BETWEEN",
            durationMinutes: 20,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Filtering Records

Filter rows precisely using logical operators (\`AND\`, \`OR\`, \`NOT\`) and pattern matching (\`LIKE\`).
            `,
          },
        ],
      },
      {
        id: "mod-sql-2",
        title: "Module 2: Joining Multiple Tables & Aggregations",
        lessons: [
          {
            id: "les-sql-3",
            title: "Lesson 3: Joins Demystified (INNER, LEFT, RIGHT, FULL)",
            durationMinutes: 25,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Relational Joins

Combine columns from one or more tables based on a related column between them.
            `,
          },
          {
            id: "les-sql-4",
            title: "Lesson 4: Aggregation with GROUP BY and HAVING",
            durationMinutes: 25,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Grouping Data

Compute totals, averages, counts, and filter groups with the \`HAVING\` clause.
            `,
          },
        ],
      },
      {
        id: "mod-sql-3",
        title: "Module 3: Advanced SQL & Optimization",
        lessons: [
          {
            id: "les-sql-5",
            title: "Lesson 5: Window Functions (OVER, PARTITION BY, RANK)",
            durationMinutes: 30,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Window Functions

Calculate running totals and rankings across sets of rows without collapsing groups.
            `,
          },
          {
            id: "les-sql-6",
            title: "Lesson 6: Indexing Strategies & Query Optimization",
            durationMinutes: 25,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: `
### Query Performance

Speed up lookups using B-tree indexes and analyze query execution plans with \`EXPLAIN ANALYZE\`.
            `,
          },
        ],
      },
    ],
  },
  {
    id: "course-java-5",
    slug: "java-enterprise-programming",
    title: "Java Enterprise Programming: Core to Spring Boot",
    description:
      "Build production-grade REST APIs, understand multi-threading, microservices, and enterprise architecture.",
    longDescription:
      "From core Java syntax, memory management, and Collections Framework to building high-performance REST APIs with Spring Boot and JPA/Hibernate.",
    instructor: {
      name: "Ayush Kumar",
      title: "Senior Lead Instructor & Software Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
      bio: "Ayush is an experienced full-stack engineer and programming educator specializing in Python, modern web development, and cloud computing.",
    },
    category: "Java",
    difficultyLevel: "Advanced",
    language: "English",
    price: 799,
    isFree: false,
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    duration: "32 Hours",
    lessonsCount: 6,
    rating: 4.8,
    studentsEnrolled: 890,
    badge: "Featured",
    hasCertificate: true,
    learningOutcomes: [
      "Master Java 17+ features: records, pattern matching, and sealed classes",
      "Deep dive into the Java Collections Framework (List, Map, Set, ConcurrentHashMap)",
      "Build production-ready REST APIs using Spring Boot and Spring Data JPA",
      "Implement Spring Security and JWT authentication",
    ],
    requirements: ["Basic programming logic knowledge in any language"],
    modules: [
      {
        id: "mod-java-1",
        title: "Module 1: Core Java & OOP Concepts",
        lessons: [
          {
            id: "les-java-1",
            title: "Lesson 1: JVM Architecture & Bytecode Execution",
            durationMinutes: 25,
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "Learn how the JVM, JRE, JDK, and JIT Compiler work together.",
          },
          {
            id: "les-java-2",
            title: "Lesson 2: Java Collections Framework",
            durationMinutes: 30,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "Deep dive into ArrayList, LinkedList, HashMap, and TreeMap performance.",
          },
        ],
      },
      {
        id: "mod-java-2",
        title: "Module 2: Multithreading & Concurrency",
        lessons: [
          {
            id: "les-java-3",
            title: "Lesson 3: Threads, Synchronization & Thread Pools",
            durationMinutes: 35,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "Prevent race conditions and deadlocks using Java concurrency utilities.",
          },
          {
            id: "les-java-4",
            title: "Lesson 4: CompletableFuture & Reactive Streams",
            durationMinutes: 30,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "Asynchronous, non-blocking programming in modern Java.",
          },
        ],
      },
      {
        id: "mod-java-3",
        title: "Module 3: Spring Boot REST Services",
        lessons: [
          {
            id: "les-java-5",
            title: "Lesson 5: Spring Boot Microservices Setup",
            durationMinutes: 40,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "Dependency injection, inversion of control, and auto-configuration.",
          },
          {
            id: "les-java-6",
            title: "Lesson 6: Database Persistence with Spring Data JPA",
            durationMinutes: 40,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "Object-relational mapping, repository methods, and transaction management.",
          },
        ],
      },
    ],
  },
  {
    id: "course-ai-6",
    slug: "ai-prompt-engineering-fundamentals",
    title: "Artificial Intelligence & Prompt Engineering Fundamentals",
    description:
      "Understand LLMs, generative AI workflows, API integration, and AI-assisted application development.",
    longDescription:
      "Demystify Generative AI, Large Language Models (LLMs), attention mechanisms, and prompt design. Learn how to connect APIs like Gemini and OpenAI, structure chains, and implement AI tutors.",
    instructor: {
      name: "Ayush Kumar",
      title: "Senior Lead Instructor & Software Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
      bio: "Ayush is an experienced full-stack engineer and programming educator specializing in Python, modern web development, and cloud computing.",
    },
    category: "Artificial Intelligence",
    difficultyLevel: "All Levels",
    language: "English",
    price: 0,
    isFree: true,
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    duration: "16 Hours",
    lessonsCount: 6,
    rating: 4.9,
    studentsEnrolled: 3120,
    badge: "Trending",
    hasCertificate: true,
    learningOutcomes: [
      "Understand transformer architectures, tokens, embeddings, and context windows",
      "Craft high-precision zero-shot, few-shot, and chain-of-thought prompts",
      "Integrate Gemini and OpenAI models into web apps via secure server endpoints",
      "Build AI-powered chatbots, tutors, and text summarizers",
    ],
    requirements: ["No mathematical background required; practical approach"],
    modules: [
      {
        id: "mod-ai-1",
        title: "Module 1: Foundations of Generative AI",
        lessons: [
          {
            id: "les-ai-1",
            title: "Lesson 1: Introduction to LLMs & Transformers",
            durationMinutes: 20,
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "How generative AI predicts tokens and why context windows matter.",
          },
          {
            id: "les-ai-2",
            title: "Lesson 2: Tokenization, Temperature & Hallucinations",
            durationMinutes: 25,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "Controlling model creativity and preventing factual hallucinations.",
          },
        ],
      },
      {
        id: "mod-ai-2",
        title: "Module 2: Advanced Prompt Engineering",
        lessons: [
          {
            id: "les-ai-3",
            title: "Lesson 3: Few-Shot & Chain-of-Thought Prompting",
            durationMinutes: 30,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "Guiding reasoning models through multi-step logic problems.",
          },
          {
            id: "les-ai-4",
            title: "Lesson 4: System Instructions & Role Framing",
            durationMinutes: 25,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "Defining persona, constraints, output schemas, and guardrails.",
          },
        ],
      },
      {
        id: "mod-ai-3",
        title: "Module 3: Building Real AI Applications",
        lessons: [
          {
            id: "les-ai-5",
            title: "Lesson 5: API Integration with Node.js & Next.js",
            durationMinutes: 35,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "Server-side API routes keeping secret keys protected from browsers.",
          },
          {
            id: "les-ai-6",
            title: "Lesson 6: Deploying an AI Tutor System",
            durationMinutes: 35,
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            content: "Implementing streaming responses, markdown code formatting, and history.",
          },
        ],
      },
    ],
  },
];

export function getCourseBySlug(slug: string): FullCourse | undefined {
  return DETAILED_COURSES.find((c) => c.slug === slug);
}

