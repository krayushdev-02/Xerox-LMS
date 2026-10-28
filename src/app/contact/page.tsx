"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  MessageSquare,
  FileText,
  ExternalLink,
} from "lucide-react";
import { CONTACT_INFO, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Spam prevention honeypot
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot trap
    if (formData.honeypot) {
      setStatus("success");
      setFeedback("Your message has been received.");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setFeedback("Please fill out your name, email address, and message.");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setStatus("idle");

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.from("contact_messages").insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || "Inquiry from Xerox LMS Contact Page",
          message: formData.message.trim(),
        });
        if (error) throw error;
      } else {
        // Fallback simulate submission for preview
        await new Promise((resolve) => setTimeout(resolve, 800));
        // Save locally for admin preview
        const existing = JSON.parse(localStorage.getItem("xerox_contact_messages") || "[]");
        existing.unshift({
          id: `msg-${Date.now()}`,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || "Website Contact Inquiry",
          message: formData.message.trim(),
          created_at: new Date().toISOString(),
          is_resolved: false,
        });
        localStorage.setItem("xerox_contact_messages", JSON.stringify(existing));
      }

      setStatus("success");
      setFeedback("Thank you! Your message has been received. Our team will contact you shortly.");
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } catch (err: any) {
      setStatus("error");
      setFeedback(err.message || "Failed to submit message. Please try calling or emailing directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-50 dark:bg-brand-navy-900 border border-brand-navy-200 dark:border-brand-navy-800 text-brand-navy-700 dark:text-brand-navy-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Official Communications</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy-950 dark:text-white tracking-tight">
            Contact Xerox LMS
          </h1>
          <p className="text-brand-grey-600 dark:text-brand-grey-400 text-base">
            Have questions regarding courses, enterprise college exams, or certificate
            verification? Reach out to our official support team.
          </p>
        </div>

        {/* Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red-500">
                  Direct Line & Email
                </span>
                <h2 className="text-2xl font-bold text-brand-navy-950 dark:text-white mt-1">
                  Official Contact Details
                </h2>
                <p className="text-xs text-brand-grey-500 mt-1">
                  Connect directly with the platform administrator:
                </p>
              </div>

              {/* Clickable Phone Number using tel: */}
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 hover:border-brand-navy-500 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-navy-700 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-brand-grey-400 uppercase tracking-wider">
                    Official Phone
                  </div>
                  <div className="text-lg font-black text-brand-navy-950 dark:text-white group-hover:text-brand-red-500 transition-colors">
                    {CONTACT_INFO.phone}
                  </div>
                  <div className="text-xs text-brand-grey-500">Tap to call directly (tel: link)</div>
                </div>
              </a>

              {/* Clickable Email using mailto: */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 hover:border-brand-red-500 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red-500 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-brand-grey-400 uppercase tracking-wider">
                    Official Email
                  </div>
                  <div className="text-base sm:text-lg font-black text-brand-navy-950 dark:text-white group-hover:text-brand-red-500 transition-colors break-all">
                    {CONTACT_INFO.email}
                  </div>
                  <div className="text-xs text-brand-grey-500">Tap to compose email (mailto: link)</div>
                </div>
              </a>

              {/* Clickable Google Form */}
              <a
                href={CONTACT_INFO.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-brand-navy-50/70 dark:bg-brand-navy-950 border border-brand-navy-200 dark:border-brand-navy-800 hover:border-brand-red-500 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-red-500 to-brand-red-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-red-500 uppercase tracking-wider">
                    <span>Google Form</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                  <div className="text-base font-bold text-brand-navy-950 dark:text-white group-hover:text-brand-red-500 transition-colors truncate">
                    Online Inquiry & Registration
                  </div>
                  <div className="text-xs text-brand-grey-500 truncate">
                    Tap to open official Google Form
                  </div>
                </div>
              </a>

              <div className="pt-2 border-t border-brand-grey-100 dark:border-brand-navy-800 text-xs text-brand-grey-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Submissions are stored securely in Supabase & Google Forms.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-brand-navy-950 dark:text-white">
                    Send an Inquiry
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-grey-500 mt-1">
                    Fill in your details and our team will get in touch with you.
                  </p>
                </div>
                <a
                  href={CONTACT_INFO.googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-red-50 dark:bg-brand-red-950/40 border border-brand-red-200 dark:border-brand-red-800 text-brand-red-600 dark:text-brand-red-400 hover:bg-brand-red-500 hover:text-white text-xs font-bold transition-all shadow-xs w-fit"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open Google Form</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {status === "success" && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{feedback}</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{feedback}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot hidden input for anti-spam */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Course enrollment query or certificate verification inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-grey-700 dark:text-brand-grey-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your question or request here..."
                    className="w-full px-4 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-red-glow hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Official Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

