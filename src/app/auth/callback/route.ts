import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const type = searchParams.get("type"); // Can be 'recovery', 'signup', etc.

    // Default redirect - check if it's a password recovery
    let next = searchParams.get("next") ?? "/dashboard";

    // If this is a recovery (password reset) flow, redirect to reset-password page
    if (type === "recovery") {
        next = "/auth/reset-password";
    }

    if (code) {
        const response = NextResponse.redirect(`${origin}${next}`);
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            response.cookies.set({ name, value, ...options })
                        );
                    },
                },
            }
        );
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return response;
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

