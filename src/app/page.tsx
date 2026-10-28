import React from "react";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AIFeatures from "@/components/home/AIFeatures";
import ExamFeatures from "@/components/home/ExamFeatures";
import Achievements from "@/components/home/Achievements";
import FAQ from "@/components/home/FAQ";
import ContactPreview from "@/components/home/ContactPreview";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with Search, CTA & Demo Metrics */}
      <Hero />

      {/* 2. Popular Categories Grid (11 Required Subjects) */}
      <Categories />

      {/* 3. Featured Courses with Badges, Prices & Details */}
      <FeaturedCourses />

      {/* 4. Why Choose Xerox LMS (Value Proposition & Trust) */}
      <WhyChooseUs />

      {/* 5. AI Learning Features Spotlight (AI Tutor) */}
      <AIFeatures />

      {/* 6. Online Examination System Spotlight */}
      <ExamFeatures />

      {/* 7. Student Achievements & Verifiable Certificates */}
      <Achievements />

      {/* 8. Frequently Asked Questions */}
      <FAQ />

      {/* 9. Contact Us Section (Official Details & Form) */}
      <ContactPreview />
    </div>
  );
}

