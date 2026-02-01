"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Mail, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState("");
    const supabase = createClient();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        console.log("Sending password reset to:", email);

        try {
            const { data, error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
            });

            console.log("Reset password response:", { data, error: resetError });
            setIsLoading(false);

            if (resetError) {
                console.error("Reset password error:", resetError);
                // Handle rate limit error
                if (resetError.status === 429) {
                    setError("Trop de tentatives. Veuillez réessayer dans quelques minutes.");
                } else {
                    setError(resetError.message);
                }
            } else {
                console.log("Password reset email sent successfully");
                setIsSent(true);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setError("Une erreur inattendue s'est produite. Veuillez réessayer.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] -z-10" />

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

                <div className="glass-card p-10 rounded-3xl shadow-2xl relative">
                    {!isSent ? (
                        <>
                            <h1 className="text-3xl font-bold mb-2">Mot de passe oublié ?</h1>
                            <p className="text-gray-400 mb-8 font-medium">Entrez votre email pour recevoir un lien de réinitialisation.</p>

                            <form onSubmit={handleReset} className="space-y-6">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="exemple@startup.com"
                                            className="pl-11 bg-white/5 border-white/10 focus:border-primary/50"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary font-bold text-lg rounded-xl"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            Envoyer le lien <ArrowRight className="ml-2 w-5 h-5" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                                <Mail className="w-8 h-8 text-green-500" />
                            </div>
                            <h1 className="text-2xl font-bold mb-4">Lien envoyé !</h1>
                            <p className="text-gray-400 mb-8">
                                Veuillez vérifier votre boîte de réception <b>{email}</b> pour réinitialiser votre mot de passe.
                            </p>
                            <Button
                                variant="outline"
                                className="w-full border-white/10"
                                onClick={() => setIsSent(false)}
                            >
                                Renvoyer le lien
                            </Button>
                        </div>
                    )}

                    <footer className="mt-8 text-center text-sm">
                        <Link href="/login" className="text-gray-500 font-medium hover:text-white transition-colors flex items-center justify-center">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Retour à la connexion
                        </Link>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
}
