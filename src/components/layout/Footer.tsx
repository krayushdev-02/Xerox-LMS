import React from "react";
import Link from "next/link";
import { Phone, Mail, Award, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import Logo from "@/components/common/Logo";
import { CONTACT_INFO, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy-950 text-white border-t border-brand-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="bg-white/10 p-3 rounded-2xl inline-block backdrop-blur-sm">
              <Logo size="md" showTagline={false} asLink={false} />
            </div>
            <p className="text-brand-grey-300 text-sm leading-relaxed">
              {SITE_TAGLINE} Learn new programming skills, attend interactive online exams,
              explore comprehensive tech courses, and earn verifiable certificates.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-grey-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Secure learning platform powered by Supabase</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white/90 mb-4 border-l-2 border-brand-red-500 pl-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-brand-grey-300">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-brand-red-400 transition-colors inline-block"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/exams"
                  className="hover:text-brand-red-400 transition-colors inline-block"
                >
                  Online Examinations
                </Link>
              </li>
              <li>
                <Link
                  href="/certificates"
                  className="hover:text-brand-red-400 transition-colors inline-block"
                >
                  Certificate Verification
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-tutor"
                  className="hover:text-brand-red-400 transition-colors inline-block flex items-center gap-1.5"
                >
                  <span>AI Tutor Assistant</span>
                  <span className="px-1.5 py-0.2 text-[10px] bg-brand-red-500 text-white rounded font-bold">
                    AI
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-brand-red-400 transition-colors inline-block"
                >
                  About Xerox LMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white/90 mb-4 border-l-2 border-brand-red-500 pl-2">
              Popular Tracks
            </h3>
            <ul className="space-y-2.5 text-sm text-brand-grey-300">
              <li>
                <Link
                  href="/courses?category=Python"
                  className="hover:text-brand-red-400 transition-colors inline-block"
                >
                  Python Programming
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=Web%20Development"
                  className="hover:text-brand-red-400 transition-colors inline-block"
                >
                  Web Development (HTML/CSS/JS)
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=C"
                  className="hover:text-brand-red-400 transition-colors inline-block"
                >
                  C & C++ Programming
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=SQL"
                  className="hover:text-brand-red-400 transition-colors inline-block"
                >
                  SQL & Databases
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=Artificial%20Intelligence"
                  className="hover:text-brand-red-400 transition-colors inline-block"
                >
                  Artificial Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Contact Details */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white/90 mb-4 border-l-2 border-brand-red-500 pl-2">
              Official Contact
            </h3>
            <p className="text-xs text-brand-grey-400 mb-3">
              Have questions or need assistance? Reach out directly to our official support team.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-brand-navy-900/60 hover:bg-brand-navy-900 border border-brand-navy-800 transition-all text-white hover:text-brand-red-400 group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-red-500/10 text-brand-red-400 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red-500 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-brand-grey-400 font-medium">Official Phone</div>
                  <div className="font-semibold">{CONTACT_INFO.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-brand-navy-900/60 hover:bg-brand-navy-900 border border-brand-navy-800 transition-all text-white hover:text-brand-red-400 group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-red-500/10 text-brand-red-400 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red-500 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-brand-grey-400 font-medium">Official Email</div>
                  <div className="font-semibold break-all">{CONTACT_INFO.email}</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brand-navy-900 flex flex-col md:flex-row items-center justify-between text-xs text-brand-grey-400 gap-4">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved. &bull; Tagline: {SITE_TAGLINE}
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

