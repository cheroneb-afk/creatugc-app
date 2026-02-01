"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Loader2, Check, ShoppingCart, Tag, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButton from "@/components/payment/PayPalButton";
import { toast } from "sonner";

const packs = {
    solo: {
        name: "Solo",
        price: "179",
        videos: "1",
        pricePerVideo: "179",
        features: ["1 Vidéo UGC (15-60s)", "Format au choix", "Script inclus", "Droit d'usage total", "Livraison 48-72h"],
    },
    starter: {
        name: "Starter",
        price: "640",
        videos: "4",
        pricePerVideo: "160",
        features: ["4 Vidéos UGC", "3 formats inclus", "1 révision gratuite", "Droit d'usage total", "Livraison 48-72h"],
    },
    pro: {
        name: "Pro",
        price: "750",
        videos: "5",
        pricePerVideo: "150",
        features: ["5 Vidéos UGC", "3 formats inclus", "1 révision gratuite", "Droit d'usage total", "Livraison 48-72h"],
        recommended: true,
    },
    agency: {
        name: "Agency",
        price: "1400",
        videos: "10",
        pricePerVideo: "140",
        features: ["10 Vidéos UGC", "3 formats inclus", "1 révision gratuite", "Droit d'usage total", "Livraison 48-72h"],
    },
};

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-background-dark">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const packKey = searchParams.get("pack") as keyof typeof packs;
    const pack = packKey ? packs[packKey] : null;

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const totalPrice = pack ? parseFloat(pack.price) - discount : 0;

    useEffect(() => {
        if (!pack) {
            router.push("/#pricing");
        }
    }, [pack, router]);

    const validateEmail = (emailToValidate: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(emailToValidate);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (!newEmail) {
            setEmailError("");
            setIsEmailValid(false);
        } else if (!validateEmail(newEmail)) {
            setEmailError("Email invalide");
            setIsEmailValid(false);
        } else {
            setEmailError("");
            setIsEmailValid(true);
        }
    };

    const handlePromoCode = async () => {
        if (!promoCode) return;

        try {
            const response = await fetch("/api/promo/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: promoCode, amount: pack?.price }),
            });

            const data = await response.json();
            if (data.valid) {
                setDiscount(data.discount);
                toast.success(`Code promo appliqué : -${data.discount}€`);
            } else {
                toast.error("Code promo invalide.");
            }
        } catch {
            toast.error("Erreur lors de la validation du code.");
        }
    };

    if (!pack) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-dark">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <PayPalScriptProvider options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
            currency: "EUR",
            intent: "capture",
            components: "buttons"
        }}>
            <div className="min-h-screen bg-background-dark py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left: Summary */}
                        <div className="flex-1 space-y-8">
                            <div className="flex items-center space-x-4 mb-2">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <ShoppingCart className="w-6 h-6 text-primary" />
                                </div>
                                <h1 className="text-3xl font-black tracking-tight text-white">Votre commande</h1>
                            </div>

                            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-2xl font-bold text-white">Pack {pack.name}</h2>
                                            {packKey === 'pro' && (
                                                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">⭐ Recommandé</span>
                                            )}
                                        </div>
                                        <p className="text-gray-400">{pack.videos} vidéos UGC professionnelles</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-3xl font-black text-primary">{pack.price}€</span>
                                        <p className="text-xs text-gray-500">Hors Taxes</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-white/5">
                                    {pack.features.map((feature, i) => (
                                        <div key={i} className="flex items-center space-x-3 text-sm">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-primary" />
                                            </div>
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="glass-card rounded-3xl p-6 border-white/5">
                                <h4 className="font-bold mb-4 flex items-center gap-2 text-white">
                                    <Mail className="w-4 h-4 text-primary" />
                                    Email *
                                </h4>
                                <Input
                                    type="email"
                                    placeholder="votre@email.com"
                                    className={`bg-white/5 border-white/10 ${emailError ? 'border-red-500' : ''}`}
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                {emailError && (
                                    <p className="text-red-500 text-sm mt-2">{emailError}</p>
                                )}
                                <p className="text-gray-500 text-xs mt-2">Pour recevoir votre commande et accéder à votre espace client.</p>
                            </div>

                            {/* Promo Code */}
                            <div className="glass-card rounded-3xl p-6 border-white/5">
                                <h4 className="font-bold mb-4 flex items-center gap-2 text-white">
                                    <Tag className="w-4 h-4 text-primary" />
                                    Code Promo
                                </h4>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Entrez votre code..."
                                        className="bg-white/5 border-white/10"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                    />
                                    <Button variant="outline" onClick={handlePromoCode}>Appliquer</Button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Payment */}
                        <div className="w-full lg:w-[400px]">
                            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 sticky top-8">
                                <h3 className="text-xl font-bold mb-6 text-white">Récapitulatif</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Sous-total HT</span>
                                        <span className="font-medium text-white">{pack.price}€</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-500">
                                            <span>Réduction</span>
                                            <span className="font-medium">-{discount}€</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">TVA (20%)</span>
                                        <span className="font-medium text-white">{(totalPrice * 0.2).toFixed(2)}€</span>
                                    </div>
                                    <div className="pt-4 border-t border-white/5 flex justify-between">
                                        <span className="font-bold text-lg text-white">Total TTC</span>
                                        <span className="font-black text-2xl text-gradient">{(totalPrice * 1.2).toFixed(2)}€</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {!isEmailValid && (
                                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
                                            <p className="text-yellow-500 text-sm">
                                                Entrez votre email pour activer le paiement
                                            </p>
                                        </div>
                                    )}

                                    <div className={!isEmailValid ? 'opacity-50 pointer-events-none' : ''}>
                                        <PayPalButton
                                            amount={(totalPrice * 1.2).toFixed(2)}
                                            email={email}
                                            briefData={{
                                                pack_type: packKey,
                                                is_checkout: true,
                                                promo_code: promoCode || undefined,
                                                discount_amount: discount
                                            }}
                                        />
                                    </div>

                                    <p className="text-xs text-gray-400 text-center mt-4">
                                        En complétant le paiement, vous acceptez nos <a href="#" className="underline">Conditions Générales de Vente</a>.
                                    </p>

                                    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-4">
                                        <Lock className="w-4 h-4" />
                                        <span>Paiement sécurisé par PayPal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    );
}
