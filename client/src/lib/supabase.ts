import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// Create client - will use placeholder values during build time
// This prevents build failures when env vars are not set
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
    return (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
};
