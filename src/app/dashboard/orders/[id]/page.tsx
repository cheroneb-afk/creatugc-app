"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Package, Clock, CheckCircle2, AlertCircle, Video as VideoIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
    id: string;
    order_number: string;
    pack_type: string;
    amount_ttc: number;
    status: string;
    created_at: string;
}

interface VideoBrief {
    id: string;
    product_name: string;
    video_urls: string[];
    status: string;
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [order, setOrder] = useState<Order | null>(null);
    const [brief, setBrief] = useState<VideoBrief | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrderDetails() {
            const supabase = createClient();

            const { data: orderData } = await supabase
                .from("orders")
                .select("*")
                .eq("id", id)
                .single();

            if (orderData) {
                setOrder(orderData);

                const { data: briefData } = await supabase
                    .from("video_briefs")
                    .select("*")
                    .eq("order_id", id)
                    .single();

                if (briefData) setBrief(briefData);
            }
            setLoading(false);
        }

        fetchOrderDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center p-12">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold">Commande introuvable</h2>
                <Button onClick={() => window.location.href = "/dashboard"} className="mt-4">
                    Retour au tableau de bord
                </Button>
            </div>
        );
    }

    const steps = [
        { label: "Commande validée", status: "paid", icon: CheckCircle2 },
        { label: "Génération IA", status: "processing", icon: Clock },
        { label: "Revue qualité", status: "review", icon: Package },
        { label: "Prête", status: "completed", icon: VideoIcon },
    ];

    const currentStepIndex = steps.findIndex(s => s.status === order.status) || 0;

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Commande {order.order_number}</h1>
                    <p className="text-gray-400">Suivez l&apos;avancement de votre production vidéo.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Total Payé</p>
                    <p className="text-2xl font-black">{order.amount_ttc}€</p>
                </div>
            </div>

            {/* Status Timeline */}
            <div className="glass-card p-12 rounded-3xl border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isCompleted = idx < currentStepIndex || order.status === "completed" || (order.status === "processing" && idx === 0);
                        const isCurrent = idx === currentStepIndex && order.status !== "completed";

                        return (
                            <div key={idx} className="flex flex-col items-center flex-1 relative">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isCompleted ? "bg-primary border-primary text-white" :
                                    isCurrent ? "bg-primary/20 border-primary text-primary animate-pulse" :
                                        "bg-white/5 border-white/10 text-gray-600"
                                    }`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className={`mt-4 text-[10px] font-black uppercase tracking-wider text-center ${isCompleted || isCurrent ? "text-white" : "text-gray-600"
                                    }`}>
                                    {step.label}
                                </span>

                                {idx < steps.length - 1 && (
                                    <div className="absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] bg-white/5">
                                        <div className={`h-full bg-primary transition-all duration-1000 ${isCompleted ? "w-full" : "w-0"}`} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Brief Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-8 rounded-3xl border-white/5">
                        <h3 className="text-xl font-bold mb-6">Détails du Brief</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Produit</p>
                                <p className="font-bold">{brief?.product_name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Pack</p>
                                <p className="font-bold uppercase">{order.pack_type}</p>
                            </div>
                        </div>
                    </div>

                    {brief?.video_urls && brief.video_urls.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Vidéos Produites</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {brief.video_urls.map((url, i) => (
                                    <div key={i} className="glass-card rounded-2xl overflow-hidden border-white/5">
                                        <video src={url} className="w-full aspect-video object-cover" controls />
                                        <div className="p-4 flex items-center justify-between">
                                            <span className="font-bold text-sm">Vidéo #{i + 1}</span>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-6 rounded-3xl border-white/5 bg-white/5">
                        <h4 className="font-bold mb-4">Besoin d&apos;aide ?</h4>
                        <p className="text-sm text-gray-400 mb-6">
                            Notre équipe est disponible pour répondre à vos questions sur cette commande.
                        </p>
                        <Button variant="outline" className="w-full border-white/10">
                            Contacter le support
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
