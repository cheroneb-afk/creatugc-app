import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
    const cookieStore = await cookies();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        console.warn("Supabase environment variables missing in server client. Using a stub for build.");
        return new Proxy({} as any, {
            get: (_, prop) => {
                if (prop === 'auth') return { getUser: async () => ({ data: { user: null }, error: null }) };
                return () => ({ from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }) }) });
            }
        });
    }

    return createServerClient(
        (url as string),
        (key as string),
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );
}
