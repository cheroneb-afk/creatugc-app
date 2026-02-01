"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Play, Lock, Loader2, CheckCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        // Check if user has a valid session from the reset link
        const handleRecovery = async () => {
            const hash = window.location.hash;
            console.log("Reset password page - hash:", hash);

            // If we have tokens in the hash, try to establish session
            if (hash && hash.includes("access_token")) {
                console.log("Found tokens in hash, establishing session...");
                const params = new URLSearchParams(hash.substring(1));
                const accessToken = params.get("access_token");
                const refreshToken = params.get("refresh_token");
                const type = params.get("type");

                console.log("Token type:", type);

                if (accessToken && refreshToken) {
                    const { data, error } = await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    });

                    if (error) {
                        console.error("Session error:", error);
                        setIsValidSession(false);
                    } else {
                        console.log("Session established successfully");
                        setIsValidSession(true);
                        // Clear hash from URL
                        window.history.replaceState(null, "", window.location.pathname);
                    }
                    return;
                }
            }

            // Fallback: check existing session
            const { data: { session } } = await supabase.auth.getSession();
            console.log("Existing session:", !!session);
            setIsValidSession(!!session);
        };

        handleRecovery();
    }, [supabase.auth]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        if (password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        }
    };

    // Loading state
    if (isValidSession === null) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // No valid session
    if (!isValidSession) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center p-6">
                <div className="max-w-md w-full glass-card p-10 rounded-3xl text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Lien expiré</h1>
                    <p className="text-gray-400 mb-6">
                        Ce lien de réinitialisation a expiré ou est invalide.
                    </p>
                    <Link
                        href="/forgot-password"
                        className="inline-block bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition"
                    >
                        Demander un nouveau lien
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] -z-10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <Link href="/" className="flex items-center space-x-2 justify-center mb-10">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                        <Play className="text-white fill-white w-5 h-5 ml-1" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white">
                        Creat<span className="text-primary">UGC</span>
                    </span>
                </Link>

                <div className="glass-card p-10 rounded-3xl shadow-2xl">
                    {success ? (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">
                                Mot de passe créé !
                            </h1>
                            <p className="text-gray-400 mb-4">
                                Redirection vers votre espace client...
                            </p>
                            <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold text-white mb-2">
                                Créer votre mot de passe
                            </h1>
                            <p className="text-gray-400 mb-8">
                                Choisissez un mot de passe sécurisé pour accéder à votre compte.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-white">
                                        Nouveau mot de passe
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-11 pr-11 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition"
                                            placeholder="••••••••"
                                            required
                                            minLength={8}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500">Minimum 8 caractères</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-white">
                                        Confirmer le mot de passe
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-11 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary font-bold text-lg rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 text-white"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                    ) : (
                                        "Créer mon mot de passe"
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
