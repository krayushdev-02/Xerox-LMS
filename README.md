# Xerox LMS — Learn Smarter. Achieve More.

Xerox LMS is a modern, high-performance, responsive e-learning platform built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth, Storage)**.

---

## 🎨 Official Brand & Identity
* **Website Name:** Xerox LMS
* **Tagline:** Learn Smarter. Achieve More.
* **Colors:**
  * Navy Blue: `#104B78`
  * Red: `#E44236`
  * White: `#FFFFFF`
  * Light Grey: `#F5F7FA`
* **Contact Details:**
  * **Phone:** `9341277351`
  * **Email:** `ayushk2375@gmail.com`

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

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-never-share
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## 🛡️ Role-Based Access Control & Security

* **Student:** Can view public courses, enroll, access lessons, attempt exams, submit assignments, view results, and verify/download certificates.
* **Teacher:** Can create & edit courses, build question banks, conduct examinations, grade submissions, record attendance, and issue certificates.
* **Admin:** Master oversight of users, course approval, system announcements, certificate revocations, and platform contact inquiries.
* **Security Guardrail:** The database trigger strictly prevents users from selecting an `admin` role upon public signup. Admin roles can only be granted via database administrator update.

---

## ☁️ Deploying to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Deploy Xerox LMS"
   git push origin main
   ```
2. Go to [https://vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `Xerox LMS` repository.
4. In the **Environment Variables** section, add:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `SUPABASE_SERVICE_ROLE_KEY`
   * `NEXT_PUBLIC_SITE_URL` (set to your Vercel domain, e.g., `https://xerox-lms.vercel.app`)
5. Click **"Deploy"**. Vercel will build and deploy Xerox LMS within 2 minutes.

