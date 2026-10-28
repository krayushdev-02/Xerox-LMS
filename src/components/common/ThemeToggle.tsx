"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-lg border border-brand-grey-300 dark:border-brand-navy-800 ${className}`}
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-brand-grey-300 dark:border-brand-navy-700 bg-white dark:bg-brand-navy-900 text-brand-grey-700 dark:text-brand-grey-200 hover:text-brand-navy-700 dark:hover:text-white hover:border-brand-navy-500 transition-all duration-200 shadow-sm ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 text-brand-navy-700 transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}

