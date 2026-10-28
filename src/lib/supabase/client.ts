import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("your-project-id") &&
    supabaseUrl.startsWith("http")
  );
};

export const createClient = () => {
  if (!isSupabaseConfigured()) {
    // Return dummy client or throw graceful warning handled by components
    return createBrowserClient(
      supabaseUrl || "https://placeholder-xerox-lms.supabase.co",
      supabaseAnonKey || "placeholder-anon-key"
    );
  }

  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
};

