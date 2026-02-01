"use client";

export const dynamic = "force-dynamic";

import BriefForm from "@/components/brief/BriefForm";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, CheckCircle } from "lucide-react";

interface Order {
    id: string;
    pack_type: string;
    payment_status: string;
    user_id: string;
}

export default function NewBriefPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-background-dark">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <NewBriefContent />
        </Suspense>
    );
}

function NewBriefContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get("orderId");
    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [orderData, setOrderData] = useState<Order | null>(null);

    useEffect(() => {
        async function verifyOrder() {
            if (!orderId) {
                router.push("/#pricing");
                return;
            }

            const supabase = createClient();

            // Verify order exists and is paid - no user auth required
            // The orderId acts as a temporary access token
            const { data: order, error } = await supabase
                .from("orders")
                .select("id, pack_type, payment_status, user_id")
                .eq("id", orderId)
                .eq("payment_status", "paid")
                .single();

            if (error || !order) {
                console.error("Order verification failed:", error);
                router.push("/#pricing");
                return;
            }

            setOrderData(order);
            setIsValid(true);
            setLoading(false);
        }
        verifyOrder();
    }, [orderId, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-dark">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isValid) return null;

    return (
        <div className="min-h-screen bg-background-dark">
            <div className="max-w-6xl mx-auto py-8 px-6">
                {/* Success Banner */}
                <div className="glass-card rounded-2xl p-6 mb-8 border-green-500/20 bg-green-500/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Paiement confirmé !</h2>
                            <p className="text-gray-400">Remplissez le brief ci-dessous pour lancer la création de vos vidéos.</p>
                        </div>
                    </div>
                </div>

                <div className="mb-10 flex flex-col items-center text-center">
                    <h1 className="text-4xl font-black tracking-tighter mb-4 text-gradient">Créer votre brief</h1>
                    <p className="text-gray-400 max-w-xl">
                        Plus votre brief est détaillé, plus nos créateurs pourront produire une vidéo qui correspond parfaitement à vos attentes.
                    </p>
                </div>

                <BriefForm initialData={{ pack_type: orderData?.pack_type, order_id: orderId ?? undefined }} />
            </div>
        </div>
    );
}
