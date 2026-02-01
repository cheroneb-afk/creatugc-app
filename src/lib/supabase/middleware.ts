import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const PROTECTED_ROUTES = [
    '/dashboard',
    '/videos',
    '/orders',
    '/settings',
];

// Routes that are always public (no auth check needed)
const PUBLIC_ROUTES = [
    '/checkout',
    '/brief',
    '/login',
    '/register',
    '/forgot-password',
    '/auth',
];

export async function updateSession(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip auth check for public routes
    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
    if (isPublicRoute) {
        return NextResponse.next({ request });
    }

    // Check if this is a protected route
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Get the user
    const { data: { user } } = await supabase.auth.getUser();

    // If protected route and no user, redirect to login
    if (isProtectedRoute && !user) {
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirect', pathname + request.nextUrl.search);
        return NextResponse.redirect(redirectUrl);
    }

    return supabaseResponse;
}
