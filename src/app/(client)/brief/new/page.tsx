"use client";

import BriefForm from "@/components/brief/BriefForm";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

interface Order {
    id: string;
    pack_type: string;
    payment_status: string;
    user_id: string;
}

export default function NewBriefPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
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
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                const currentUrl = window.location.pathname + window.location.search;
                router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
                return;
            }

            const { data: order, error } = await supabase
                .from("orders")
                .select("*, payment_status")
                .eq("id", orderId)
                .eq("user_id", user.id)
                .single();

            if (error || !order || order.payment_status !== "paid") {
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
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isValid) return null;

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="mb-10 flex flex-col items-center text-center">
                <h1 className="text-4xl font-black tracking-tighter mb-4 text-gradient">Créer un nouveau brief</h1>
                <p className="text-gray-400 max-w-xl">
                    Plus votre brief est détaillé, plus nos créateurs pourront produire une vidéo qui correspond parfaitement à vos attentes.
                </p>
            </div>

            <BriefForm initialData={{ pack_type: orderData?.pack_type }} />
        </div>
    );
}
