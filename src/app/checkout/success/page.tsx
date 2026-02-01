"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const email = searchParams.get("email");

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-4">
            <div className="max-w-md w-full glass-card rounded-[2.5rem] p-8 border-white/5 text-center">

                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-white mb-2">
                    Paiement confirmé !
                </h1>

                <p className="text-gray-400 mb-6">
                    Merci pour votre commande. Vous allez recevoir un email de confirmation.
                </p>

                {/* Order Summary */}
                {(orderId || email) && (
                    <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
                        {orderId && (
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">N° de commande</span>
                                <span className="text-white font-mono">{orderId.slice(0, 8)}...</span>
                            </div>
                        )}
                        {email && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Email</span>
                                <span className="text-white">{email}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Email Info */}
                <div className="flex items-start gap-3 bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 text-left">
                    <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm text-primary font-medium">Vérifiez votre boîte mail</p>
                        <p className="text-xs text-gray-400 mt-1">
                            Un email vous a été envoyé pour créer votre mot de passe et accéder à votre espace client.
                        </p>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="text-left mb-6">
                    <p className="text-sm font-medium text-white mb-3">Prochaines étapes :</p>
                    <ol className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                            Créez votre mot de passe (email envoyé)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-white/10 text-white rounded-full flex items-center justify-center text-xs">2</span>
                            Connectez-vous à votre espace
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-white/10 text-white rounded-full flex items-center justify-center text-xs">3</span>
                            Remplissez le brief de votre vidéo
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-white/10 text-white rounded-full flex items-center justify-center text-xs">4</span>
                            Recevez votre vidéo sous 48-72h
                        </li>
                    </ol>
                </div>

                {/* CTA Button */}
                <Link
                    href={`/login${email ? `?email=${encodeURIComponent(email)}` : ""}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition"
                >
                    Accéder à mon espace
                    <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-xs text-gray-500 mt-4">
                    Vous n&apos;avez pas reçu l&apos;email ? <button className="text-primary hover:underline">Renvoyer</button>
                </p>

            </div>
        </div>
    );
}
