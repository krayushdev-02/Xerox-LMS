"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Send,
  HelpCircle,
  FileText,
  Code2,
  BookOpen,
  Bot,
  User,
  Loader2,
  Key,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import Logo from "@/components/common/Logo";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  "Explain Pointers and Memory Addresses in C with a simple analogy.",
  "Generate 5 practice MCQs on CSS Flexbox and Grid with answers.",
  "What is the difference between WHERE and HAVING in SQL?",
  "Explain Python Object-Oriented Programming and the __init__ method.",
  "Summarize the JavaScript Event Loop (Call Stack, Web APIs, Task Queue).",
];

function AITutorContent() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt") || "";

  const [inputPrompt, setInputPrompt] = useState(initialPrompt);
  const [mode, setMode] = useState<"general" | "mcq" | "summary" | "debug">("general");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: "Hello! I am your **Xerox LMS AI Tutor**. Ask me any programming question, request practice MCQs, or ask me to explain difficult code topics in simple words.",
      timestamp: "Just now",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query.trim(), mode }),
      });

      const data = await res.json();

      let replyText = "";
      if (data.configured === false) {
        replyText = `⚙️ **API Configuration Required**\n\n${data.message}`;
      } else if (data.reply) {
        replyText = data.reply;
      } else if (data.error) {
        replyText = `⚠️ **Error:** ${data.error}`;
      } else {
        replyText = "I could not generate an answer at this time. Please try again.";
      }

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "⚠️ Unable to connect to the Xerox LMS AI Tutor service. Please ensure the server is running.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "ai",
        text: "Chat cleared. What programming topic would you like to explore next?",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <div className="py-10 bg-brand-grey-50/70 dark:bg-brand-navy-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-navy-900 via-brand-navy-950 to-brand-navy-900 text-white border border-brand-navy-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-500/20 text-brand-red-300 text-xs font-bold border border-brand-red-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Academic Mentor</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Xerox LMS AI Tutor
            </h1>
            <p className="text-sm text-brand-grey-300 max-w-xl">
              24/7 personal tutor for programming doubts, practice question generation, and lesson
              summaries. Powered by Google Gemini / OpenAI.
            </p>
          </div>

          <button
            onClick={handleClearChat}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
          <button
            onClick={() => setMode("general")}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
              mode === "general"
                ? "bg-brand-navy-700 text-white border-brand-navy-700 shadow-sm"
                : "bg-white dark:bg-brand-navy-900 border-brand-grey-200 dark:border-brand-navy-800 text-brand-grey-700 dark:text-brand-grey-300 hover:border-brand-grey-300"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Doubt Solver</span>
          </button>
          <button
            onClick={() => setMode("mcq")}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
              mode === "mcq"
                ? "bg-brand-navy-700 text-white border-brand-navy-700 shadow-sm"
                : "bg-white dark:bg-brand-navy-900 border-brand-grey-200 dark:border-brand-navy-800 text-brand-grey-700 dark:text-brand-grey-300 hover:border-brand-grey-300"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Generate MCQs</span>
          </button>
          <button
            onClick={() => setMode("summary")}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
              mode === "summary"
                ? "bg-brand-navy-700 text-white border-brand-navy-700 shadow-sm"
                : "bg-white dark:bg-brand-navy-900 border-brand-grey-200 dark:border-brand-navy-800 text-brand-grey-700 dark:text-brand-grey-300 hover:border-brand-grey-300"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Lesson Summarizer</span>
          </button>
          <button
            onClick={() => setMode("debug")}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
              mode === "debug"
                ? "bg-brand-navy-700 text-white border-brand-navy-700 shadow-sm"
                : "bg-white dark:bg-brand-navy-900 border-brand-grey-200 dark:border-brand-navy-800 text-brand-grey-700 dark:text-brand-grey-300 hover:border-brand-grey-300"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Debug Code</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-bold text-brand-grey-400 uppercase text-[10px] whitespace-nowrap">
            Suggestions:
          </span>
          {PRESET_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 text-brand-grey-700 dark:text-brand-grey-300 hover:border-brand-navy-500 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="rounded-3xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-soft overflow-hidden flex flex-col h-[560px]">
          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs ${
                      isUser
                        ? "bg-brand-navy-700 text-white"
                        : "bg-brand-red-500 text-white"
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-2 ${
                      isUser
                        ? "bg-brand-navy-700 text-white rounded-tr-none"
                        : "bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200/80 dark:border-brand-navy-800 text-brand-navy-950 dark:text-brand-grey-100 rounded-tl-none"
                    }`}
                  >
                    <div
                      className="whitespace-pre-wrap font-sans"
                      dangerouslySetInnerHTML={{
                        __html: msg.text
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/`([^`]+)`/g, "<code class='bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded font-mono text-xs'>$1</code>")
                          .replace(/\n/g, "<br/>"),
                      }}
                    />

                    {!isUser && (
                      <div className="pt-2 flex items-center justify-between text-[10px] text-brand-grey-400 border-t border-brand-grey-200/40 dark:border-brand-navy-800/40">
                        <span>Xerox LMS AI</span>
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="hover:text-brand-navy-700 dark:hover:text-white flex items-center gap-1"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-500">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-red-500 text-white flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-brand-grey-50 dark:bg-brand-navy-950 border border-brand-grey-200 dark:border-brand-navy-800 text-xs text-brand-grey-500 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-red-500" />
                  <span>Thinking & formulating solution...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Box */}
          <div className="p-4 border-t border-brand-grey-200 dark:border-brand-navy-800 bg-brand-grey-50/50 dark:bg-brand-navy-950">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder={
                  mode === "mcq"
                    ? "e.g. Generate 5 MCQs on Python list comprehension..."
                    : mode === "summary"
                    ? "Paste or name the lesson you want to summarize..."
                    : mode === "debug"
                    ? "Paste the code or error message you need help with..."
                    : "Ask any academic or programming question..."
                }
                className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-950 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500"
              />
              <button
                type="submit"
                disabled={loading || !inputPrompt.trim()}
                className="px-5 py-3 rounded-2xl bg-brand-red-500 hover:bg-brand-red-600 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider shadow-red-glow flex items-center gap-1.5 transition-all"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AITutorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-sm font-semibold text-brand-navy-700">Loading AI Tutor...</div>
        </div>
      }
    >
      <AITutorContent />
    </Suspense>
  );
}

