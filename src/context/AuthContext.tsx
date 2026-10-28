"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Profile, UserRole } from "@/lib/supabase/types";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  role: UserRole | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null; role?: UserRole }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: "student" | "teacher",
    phone?: string
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  loginAsDemoUser: (demoRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  const supabase = createClient();

  const fetchProfile = async (userId: string, userEmail?: string) => {
    try {
      if (!isConfigured) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data && !error) {
        setProfile(data as Profile);
      } else if (userEmail) {
        // Fallback default profile if trigger hasn't completed yet
        setProfile({
          id: userId,
          email: userEmail,
          full_name: userEmail.split("@")[0],
          role: "student",
          avatar_url: null,
          phone: null,
          bio: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    if (!isConfigured) {
      // Check if there is a local demo session saved in sessionStorage for rapid testing
      try {
        const savedDemo = sessionStorage.getItem("xerox_demo_user");
        if (savedDemo) {
          const parsed = JSON.parse(savedDemo);
          setProfile(parsed);
          setUser({ id: parsed.id, email: parsed.email } as User);
        }
      } catch {
        // Ignore
      }
      setLoading(false);
      return;
    }

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id, session.user.email);
        }
      } catch {
        // Ignore
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id, session.user.email);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  const signIn = async (email: string, password: string) => {
    if (!isConfigured) {
      return {
        error:
          "Supabase credentials not configured in .env.local yet. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY or use the Instant Demo login buttons below for previewing.",
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        // Fetch role from profile table
        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        const userRole = (profileData?.role as UserRole) || "student";
        await fetchProfile(data.user.id, data.user.email);
        return { error: null, role: userRole };
      }

      return { error: "Authentication failed. Please check credentials." };
    } catch (err: any) {
      return { error: err.message || "An unexpected error occurred." };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: "student" | "teacher",
    phone?: string
  ) => {
    if (!isConfigured) {
      return {
        error:
          "Supabase credentials not configured in .env.local yet. Please configure your project credentials to register live users.",
      };
    }

    // Security check: Only 'student' or 'teacher' allowed during registration
    if (role !== "student" && role !== "teacher") {
      return { error: "Invalid role specified." };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
            phone: phone || null,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || "An error occurred during registration." };
    }
  };

  const signOut = async () => {
    try {
      if (isConfigured) {
        await supabase.auth.signOut();
      }
      sessionStorage.removeItem("xerox_demo_user");
      setUser(null);
      setProfile(null);
    } catch {
      // Ignore
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id, user.email);
    }
  };

  // Demo user helper to test dashboards immediately in browser even before live Supabase keys are pasted
  const loginAsDemoUser = (demoRole: UserRole) => {
    const demoProfiles: Record<UserRole, Profile> = {
      student: {
        id: "demo-student-id-123",
        email: "student.demo@xeroxlms.com",
        full_name: "Rahul Student",
        role: "student",
        avatar_url: null,
        phone: "9341277351",
        bio: "Passionate computer science student mastering web development and Python.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      teacher: {
        id: "demo-teacher-id-456",
        email: "teacher.demo@xeroxlms.com",
        full_name: "Prof. Ayush Kumar",
        role: "teacher",
        avatar_url: null,
        phone: "9341277351",
        bio: "Senior Lead Instructor for Computer Programming & Web Technologies.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      admin: {
        id: "demo-admin-id-789",
        email: "admin.demo@xeroxlms.com",
        full_name: "Ayush Administrator",
        role: "admin",
        avatar_url: null,
        phone: "9341277351",
        bio: "Chief Platform Administrator for Xerox LMS.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    };

    const targetProfile = demoProfiles[demoRole];
    setProfile(targetProfile);
    setUser({ id: targetProfile.id, email: targetProfile.email } as User);
    try {
      sessionStorage.setItem("xerox_demo_user", JSON.stringify(targetProfile));
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role: profile?.role || null,
        loading,
        isConfigured,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        loginAsDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

