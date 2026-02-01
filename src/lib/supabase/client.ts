import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        // During build or if vars are missing, return a proxy that handles common calls
        // to prevent "@supabase/ssr" from crashing during initialization.
        console.warn("Supabase environment variables are missing. Using a stub client for build.");
        return new Proxy({} as any, {
            get: (_, prop) => {
                if (prop === 'auth') return { getUser: async () => ({ data: { user: null }, error: null }) };
                return () => ({ from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }) }) });
            }
        });
    }

    return createBrowserClient(url, key);
}
