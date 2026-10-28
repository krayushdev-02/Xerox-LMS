# Xerox LMS — Learn Smarter. Achieve More.

Xerox LMS is a modern, high-performance, fully responsive e-learning platform built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth, Storage)** with an integrated **Google Gemini AI Tutor** and a proctored **100-Question Online Examination System**.

---

## 🎨 Official Brand & Identity
* **Website Name:** Xerox LMS
* **Tagline:** Learn Smarter. Achieve More.
* **Colors:**
  * Navy Blue: `#104B78`
  * Red: `#E44236`
  * White: `#FFFFFF`
  * Light Grey: `#F5F7FA`
* **Official Contact Information:**
  * **Phone:** `9341277351` (`tel:9341277351`)
  * **Email:** `ayushk2375@gmail.com` (`mailto:ayushk2375@gmail.com`)
  * **Google Form:** [https://forms.gle/SfEn34TgodYFNTRh8](https://forms.gle/SfEn34TgodYFNTRh8)
* **Logo:** Official Xerox LMS emblem loaded from `/logo.jpg` with high-resolution responsive vector wrapper.

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd "Xerox LMS"
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory by copying `.env.example`:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-never-share

# AI Tutor Configuration (Gemini API)
GEMINI_API_KEY=your-gemini-api-key-here

# Site Base URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧭 Page Directory & Features

| Route | Page Name | Key Features |
|---|---|---|
| `/` | **Home** | Responsive navbar, hero, search bar, 11 categories, featured courses, why choose us, AI tutor showcase, exams preview, student achievements, certificate showcase, FAQ accordion, contact section, professional footer. |
| `/courses` | **All Courses** | Search query, category tabs, difficulty & price filter, sort options, responsive course grid with enrollment CTAs. |
| `/courses/[slug]` | **Course Details** | Course banner, instructor bio, full curriculum module breakdown, learning outcomes, requirements, enrollment state. |
| `/courses/[slug]/learn` | **Interactive Lesson Player** | Video player / lecture viewer, curriculum sidebar with completion checkmarks, lesson notes, downloadable PDF materials, next/previous lesson controls. |
| `/about` | **About Us** | Mission statement, educational pillars, core values, leadership team, platform statistics. |
| `/contact` | **Contact Us** | Official phone (`9341277351`) and email (`ayushk2375@gmail.com`), contact inquiry form with spam honeypot and interactive submission handling. |
| `/login` | **Login** | Email/password sign-in, session persistence, role-based dashboard redirection, **1-click Instant Demo access** (Student / Teacher / Admin). |
| `/register` | **Register** | Account registration with secure role assignment (admin role self-assignment is strictly blocked by database security trigger). |
| `/forgot-password` | **Forgot Password** | Secure password recovery email trigger. |
| `/reset-password` | **Reset Password** | New password confirmation form. |
| `/dashboard` | **Student Dashboard** | "Continue Learning" banner, enrolled courses progress, upcoming examinations, assignments, recent exam scores, earned certificates, system alerts. |
| `/teacher/dashboard` | **Teacher Dashboard** | Course creation modal, enrolled student roster, interactive attendance register, assignment grading with feedback, MCQ question authoring, certificate issuance. |
| `/admin/dashboard` | **Admin Dashboard** | User role management (Student/Teacher/Admin promotion), course approval workflow, category management, exam bank monitoring, inquiries inbox, announcements publisher, certificate revocation. |
| `/exams` | **Online Exams** | Active 90-minute assessments, practice tests, exam rules, passing criteria (50%), question counts, and duration badges. |
| `/exams/[id]` | **Live Exam Room** | Real-time 90:00 countdown timer, autosave on every selection, 100-question navigation grid with answered/unanswered/flagged states, modal submission confirmation, automatic submission when timer reaches 00:00. |
| `/results` | **Results Registry** | Candidate scorecard history, grade badges, percentage, passing indicators. |
| `/results/[attemptId]` | **Detailed Scorecard** | Subject-wise breakdown (HTML, CSS, JS, C, Python, SQL), full answer sheet review with detailed explanations, and 1-click certificate claim CTA. |
| `/certificates` | **Certificates & Verification** | Public certificate verification registry by unique ID (e.g., `XLMS-2026-HTML-8821`), high-resolution certificate canvas, QR badge, and print/PDF download. |
| `/ai-tutor` | **AI Tutor** | Intelligent learning assistant powered by Google Gemini (with graceful unconfigured fallback guidance), featuring Code Debugging, Concept Explanation, Quiz Generation, and Lesson Summaries. |
| `/profile` | **Profile & Settings** | User avatar, name, email, bio, role badge, theme preferences (light/dark mode toggle), and security settings. |
| `/privacy` | **Privacy Policy** | Comprehensive GDPR and data protection policy. |
| `/terms` | **Terms & Conditions** | Code of conduct, academic integrity guidelines, and platform terms of service. |

---

## 🗄️ Setting Up Supabase Database & Auth

### Step 1: Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **"New Project"**.
3. Choose an organization, enter **Name**: `Xerox-LMS`, set a secure database password, and choose your preferred region.
4. Click **"Create new project"** and wait ~1 minute for provisioning.

### Step 2: Get API Keys & URL
1. In your Supabase dashboard sidebar, click the **Settings** (gear icon) → **API**.
2. Copy the **Project URL** → paste into `NEXT_PUBLIC_SUPABASE_URL`.
3. Under **Project API keys**, copy:
   * `anon` `public` key → paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   * `service_role` `secret` key → paste into `SUPABASE_SERVICE_ROLE_KEY`.

### Step 3: Run Database Migrations
1. In your Supabase dashboard sidebar, click **SQL Editor**.
2. Click **"New query"**.
3. Open `supabase/migrations/001_xerox_lms_schema.sql` in this repo, copy its entire contents, paste it into the SQL Editor, and click **"Run"**.
   * This creates all 17 tables, foreign keys, indexes, user trigger, and Row Level Security (RLS) policies.
4. (Optional) Run `supabase/seed.sql` to populate initial courses, modules, lessons, and the official 100-question computer programming assessment.

### Step 4: Configure Authentication
1. In Supabase, go to **Authentication** → **URL Configuration**.
2. Set **Site URL** to `http://localhost:3000` (or your Vercel URL in production).
3. Under **Redirect URLs**, add:
   * `http://localhost:3000/auth/callback`
   * `https://your-app.vercel.app/auth/callback`
4. Under **Authentication** → **Providers** → **Email**:
   * Ensure Email provider is enabled.
   * If you wish to test signups immediately without waiting for confirmation emails, you can temporarily disable "Confirm email" in development.

---

## 🤖 Configuring Google Gemini AI Tutor

The AI Tutor uses Google's latest `gemini-1.5-flash` model for instant, contextual programming help:
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google Account and click **"Get API key"**.
3. Create an API key in a few seconds (Free tier available).
4. Add the key to your `.env.local` file (and to your Vercel project settings):
   ```env
   GEMINI_API_KEY=AIzaSy...
   ```
*(Note: If no API key is configured, the AI Tutor displays an informative setup prompt while keeping all other LMS features fully operational).*

---

## 🛡️ Role-Based Access Control & Security

* **Student:** Can view public courses, enroll, access lessons, attempt exams, submit assignments, view results, and verify/download certificates.
* **Teacher:** Can create & edit courses, build question banks, conduct examinations, grade submissions, record attendance, and issue certificates.
* **Admin:** Master oversight of users, course approval, system announcements, certificate revocations, and platform contact inquiries.
* **Security Guardrail:** The database trigger strictly prevents users from selecting an `admin` role upon public signup. Admin roles can only be granted via database administrator update.
* **Middleware Protection:** Edge middleware guards `/dashboard` (authenticated), `/teacher/:path*` (teacher/admin only), and `/admin/:path*` (admin only).

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploy Xerox LMS production build"
   git push origin main
   ```
2. Go to [https://vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `Xerox LMS` repository.
4. Under **Environment Variables**, configure:
   * `NEXT_PUBLIC_SUPABASE_URL`: `https://your-project.supabase.co`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `your-anon-public-key`
   * `SUPABASE_SERVICE_ROLE_KEY`: `your-service-role-key`
   * `GEMINI_API_KEY`: `your-gemini-key`
   * `NEXT_PUBLIC_SITE_URL`: `https://your-project.vercel.app`
5. Click **"Deploy"**. Vercel will build and deploy Xerox LMS within 2 minutes.
6. Once deployed, add your Vercel domain to the Supabase **Authentication → URL Configuration → Redirect URLs** list.
