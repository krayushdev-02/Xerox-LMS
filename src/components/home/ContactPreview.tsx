"use client";

import React, { useState } from "react";
import { Phone, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export default function ContactPreview() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setStatusMessage("Please fill in your name, email, and message.");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setStatus("error");
      setStatusMessage("Please provide a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      // In Phase 1, we provide full client-side validation and simulated/safe contact submission
      // In Phase 2, this directly inserts into Supabase contact_messages table
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStatus("success");
      setStatusMessage(
        "Thank you! Your message has been sent successfully. Our team will get back to you shortly."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setStatusMessage("Unable to send message at this time. Please try calling or emailing us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-brand-grey-50/70 dark:bg-brand-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-50 dark:bg-brand-navy-900 border border-brand-navy-200 dark:border-brand-navy-800 text-brand-navy-700 dark:text-brand-navy-300 text-xs font-bold uppercase tracking-wider">
              <span>Get in Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-950 dark:text-white tracking-tight">
              Contact Xerox LMS
            </h2>

            <p className="text-brand-grey-600 dark:text-brand-grey-400 text-base leading-relaxed">
              Have inquiries about our technical courses, college examination partnerships, or
              certificate validation? Connect with us directly through our official channels.
            </p>

            {/* Official Contact Cards */}
            <div className="space-y-4 pt-2">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 hover:border-brand-navy-500 transition-all shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-navy-50 dark:bg-brand-navy-800 text-brand-navy-700 dark:text-brand-navy-300 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-navy-700 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-brand-grey-500 dark:text-brand-grey-400 font-semibold uppercase tracking-wider">
                    Official Phone
                  </div>
                  <div className="text-lg font-bold text-brand-navy-950 dark:text-white group-hover:text-brand-red-500 transition-colors">
                    {CONTACT_INFO.phone}
                  </div>
                  <div className="text-xs text-brand-grey-500">Tap to call directly</div>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 hover:border-brand-navy-500 transition-all shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red-50 dark:bg-brand-red-950/60 text-brand-red-500 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red-500 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-brand-grey-500 dark:text-brand-grey-400 font-semibold uppercase tracking-wider">
                    Official Email
                  </div>
                  <div className="text-lg font-bold text-brand-navy-950 dark:text-white group-hover:text-brand-red-500 transition-colors break-all">
                    {CONTACT_INFO.email}
                  </div>
                  <div className="text-xs text-brand-grey-500">Tap to compose email</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 p-8 shadow-soft">
              <h3 className="text-xl font-bold text-brand-navy-950 dark:text-white mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-brand-grey-500 dark:text-brand-grey-400 mb-6">
                Fill in the form below and we will respond to your registered email.
              </p>

              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="e.g. Course enrollment query or exam schedule"
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
                    placeholder="Write your query or message here..."
                    className="w-full px-4 py-3 rounded-xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-red-500 hover:bg-brand-red-600 disabled:opacity-50 text-white font-bold text-sm shadow-red-glow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
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
    </section>
  );
}

