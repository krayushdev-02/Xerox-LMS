"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  Phone,
  Info,
  LogIn,
  UserPlus,
  Search,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";

const navLinks = [
  { name: "Home", href: "/", icon: null },
  { name: "All Courses", href: "/courses", icon: BookOpen },
  { name: "Online Exams", href: "/exams", icon: GraduationCap },
  { name: "Certificates", href: "/certificates", icon: Award },
  { name: "AI Tutor", href: "/ai-tutor", icon: Sparkles, badge: "AI" },
  { name: "About Us", href: "/about", icon: Info },
  { name: "Contact Us", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-brand-navy-950/95 backdrop-blur-md shadow-md border-b border-brand-grey-200 dark:border-brand-navy-800"
          : "bg-white dark:bg-brand-navy-950 border-b border-brand-grey-200/60 dark:border-brand-navy-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size="md" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-brand-navy-700 dark:text-white bg-brand-navy-50 dark:bg-brand-navy-900/80 font-bold"
                      : "text-brand-grey-700 dark:text-brand-grey-300 hover:text-brand-navy-700 dark:hover:text-white hover:bg-brand-grey-100 dark:hover:bg-brand-navy-900/50"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 opacity-75" />}
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-brand-red-500 text-white shadow-xs">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-red-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-brand-navy-700 dark:text-brand-grey-100 hover:text-brand-navy-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 text-sm font-semibold text-white bg-brand-red-500 hover:bg-brand-red-600 rounded-lg shadow-sm hover:shadow-red-glow transition-all duration-200 flex items-center gap-1.5 active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu & Theme Toggle Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-brand-grey-700 dark:text-brand-grey-200 hover:bg-brand-grey-100 dark:hover:bg-brand-navy-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-brand-grey-200 dark:border-brand-navy-800 bg-white dark:bg-brand-navy-950 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold ${
                    isActive
                      ? "bg-brand-navy-50 text-brand-navy-700 dark:bg-brand-navy-900 dark:text-white font-bold"
                      : "text-brand-grey-700 dark:text-brand-grey-200 hover:bg-brand-grey-100 dark:hover:bg-brand-navy-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-5 h-5 text-brand-navy-600 dark:text-brand-navy-400" />}
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-brand-red-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-brand-grey-200 dark:border-brand-navy-800 grid grid-cols-2 gap-3">
            <Link
              href="/login"
              className="w-full text-center py-2.5 px-4 text-sm font-semibold rounded-lg border border-brand-navy-700 text-brand-navy-700 dark:border-brand-navy-400 dark:text-brand-navy-200 hover:bg-brand-navy-50 dark:hover:bg-brand-navy-900"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="w-full text-center py-2.5 px-4 text-sm font-semibold rounded-lg bg-brand-red-500 text-white hover:bg-brand-red-600 shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

