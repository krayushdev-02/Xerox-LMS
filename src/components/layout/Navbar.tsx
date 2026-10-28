"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  LogOut,
  User,
  LayoutDashboard,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

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
  const [userDropdown, setUserDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, profile, role, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserDropdown(false);
  }, [pathname]);

  const getDashboardHref = () => {
    if (role === "admin") return "/admin/dashboard";
    if (role === "teacher") return "/teacher/dashboard";
    return "/dashboard";
  };

  const getRoleBadge = () => {
    if (role === "admin") {
      return {
        label: "Admin",
        icon: ShieldCheck,
        cls: "bg-brand-red-500 text-white",
      };
    }
    if (role === "teacher") {
      return {
        label: "Teacher",
        icon: Briefcase,
        cls: "bg-blue-600 text-white",
      };
    }
    return {
      label: "Student",
      icon: GraduationCap,
      cls: "bg-emerald-600 text-white",
    };
  };

  const roleBadge = getRoleBadge();
  const RoleIcon = roleBadge.icon;

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

            {!loading && (user || profile) ? (
              /* Signed In User Dropdown */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 rounded-full border border-brand-grey-300 dark:border-brand-navy-700 hover:border-brand-navy-500 bg-white dark:bg-brand-navy-900 transition-all text-xs font-semibold"
                >
                  <span className="text-brand-navy-950 dark:text-white max-w-[120px] truncate">
                    {profile?.full_name || profile?.email?.split("@")[0] || "My Account"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${roleBadge.cls}`}
                  >
                    <RoleIcon className="w-3 h-3" />
                    <span>{roleBadge.label}</span>
                  </span>
                  <div className="w-8 h-8 rounded-full bg-brand-navy-700 text-white font-bold text-xs flex items-center justify-center">
                    {(profile?.full_name || profile?.email || "U").charAt(0).toUpperCase()}
                  </div>
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-brand-navy-900 border border-brand-grey-200 dark:border-brand-navy-800 shadow-xl py-2 z-50 animate-in fade-in-50 duration-150">
                    <div className="px-4 py-2 border-b border-brand-grey-100 dark:border-brand-navy-800">
                      <div className="text-xs text-brand-grey-400 font-medium">Signed in as</div>
                      <div className="text-xs font-bold text-brand-navy-950 dark:text-white truncate">
                        {profile?.email}
                      </div>
                    </div>

                    <Link
                      href={getDashboardHref()}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-brand-navy-900 dark:text-white hover:bg-brand-navy-50 dark:hover:bg-brand-navy-800 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-navy-600" />
                      <span>{roleBadge.label} Dashboard</span>
                    </Link>

                    <Link
                      href="/profile"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-brand-navy-900 dark:text-white hover:bg-brand-navy-50 dark:hover:bg-brand-navy-800 transition-colors"
                    >
                      <User className="w-4 h-4 text-brand-navy-600" />
                      <span>Profile & Settings</span>
                    </Link>

                    <div className="border-t border-brand-grey-100 dark:border-brand-navy-800 my-1" />

                    <button
                      type="button"
                      onClick={async () => {
                        await signOut();
                        router.push("/");
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-brand-red-600 dark:text-brand-red-400 hover:bg-brand-red-50 dark:hover:bg-brand-red-950/30 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Signed Out State */
              <>
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
              </>
            )}
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

          {/* Mobile Auth Actions */}
          <div className="pt-4 border-t border-brand-grey-200 dark:border-brand-navy-800">
            {user || profile ? (
              <div className="space-y-2">
                <Link
                  href={getDashboardHref()}
                  className="w-full text-center py-2.5 px-4 text-sm font-semibold rounded-lg bg-brand-navy-700 text-white hover:bg-brand-navy-800 flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to {roleBadge.label} Dashboard</span>
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/profile"
                    className="w-full text-center py-2 px-3 text-xs font-semibold rounded-lg border border-brand-grey-300 dark:border-brand-navy-700 text-brand-navy-900 dark:text-white"
                  >
                    Profile Settings
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      await signOut();
                      router.push("/");
                    }}
                    className="w-full text-center py-2 px-3 text-xs font-semibold rounded-lg bg-brand-red-50 text-brand-red-600 dark:bg-brand-red-950/40 dark:text-brand-red-300"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
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
            )}
          </div>
        </div>
      )}
    </header>
  );
}
