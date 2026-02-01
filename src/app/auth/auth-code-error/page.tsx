"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Play, Loader2 } from "lucide-react";

export default function AuthCodeErrorPage() {
    const router = useRouter();

    useEffect(() => {
        // Si on a un hash avec des tokens, rediriger vers reset-password
        const hash = window.location.hash;
        console.log("Auth code error page - hash:", hash);

        if (hash && hash.includes("access_token")) {
            console.log("Redirecting to reset-password with hash");
            router.replace("/auth/reset-password" + hash);
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] -z-10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />

            <div className="w-full max-w-md">
                <Link href="/" className="flex items-center space-x-2 justify-center mb-10">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                        <Play className="text-white fill-white w-5 h-5 ml-1" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white">
                        Creat<span className="text-primary">UGC</span>
                    </span>
                </Link>

                <div className="glass-card p-10 rounded-3xl text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-white mb-2">
                        Redirection en cours...
                    </h1>
                    <p className="text-gray-400 mb-6">
                        Si vous n&apos;êtes pas redirigé automatiquement, cliquez ci-dessous.
                    </p>
                    <Link
                        href="/auth/reset-password"
                        className="inline-block bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition"
                    >
                        Créer mon mot de passe
                    </Link>
                </div>
            </div>
        </div>
    );
}
