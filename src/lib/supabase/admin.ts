import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase admin client using the service role key.
 * This client bypasses RLS and should only be used server-side for admin operations.
 */
export function createAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Log for debugging (don't log the actual key!)
    console.log("Admin client init - URL present:", !!url);
    console.log("Admin client init - Service role key present:", !!serviceRoleKey);
    console.log("Admin client init - Key starts with:", serviceRoleKey?.substring(0, 10) + "...");

    if (!url || !serviceRoleKey) {
        console.error("CRITICAL: Supabase admin environment variables not configured!");
        throw new Error("Supabase admin environment variables not configured. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
    }

    return createClient(url, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}

