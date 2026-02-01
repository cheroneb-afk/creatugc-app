import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase admin client using the service role key.
 * This client bypasses RLS and should only be used server-side for admin operations.
 */
export function createAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Log for debugging (don't log the actual key!)
    console.log("=== ADMIN CLIENT DIAGNOSTICS ===");
    console.log("URL present:", !!url);
    console.log("Service role key present:", !!serviceRoleKey);
    console.log("Key length:", serviceRoleKey?.length || 0);

    // The service_role key is longer than anon key and contains different claims
    // service_role typically has "role": "service_role" in the JWT
    if (serviceRoleKey) {
        const keyStart = serviceRoleKey.substring(0, 20);
        console.log("Key starts with:", keyStart + "...");

        // Try to decode JWT header to check key type
        try {
            const parts = serviceRoleKey.split('.');
            if (parts.length === 3) {
                const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
                console.log("JWT role claim:", payload.role);
                if (payload.role !== 'service_role') {
                    console.error("WRONG KEY TYPE! Expected 'service_role', got:", payload.role);
                }
            }
        } catch (e) {
            console.log("Could not decode JWT");
        }
    }
    console.log("================================");

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

