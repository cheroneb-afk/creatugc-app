"use client";

export const dynamic = "force-dynamic";


import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ShoppingBag, CreditCard, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        { name: "Vidéos commandées", value: "0", icon: Video, color: "text-blue-500" },
        { name: "En cours", value: "0", icon: Sparkles, color: "text-primary" },
        { name: "Commandes totales", value: "0", icon: ShoppingBag, color: "text-green-500" },
        { name: "Crédits restants", value: "0", icon: CreditCard, color: "text-secondary" },
    ]);
    interface Order {
        id: string;
        order_number: string;
        created_at: string;
        status: string;
    }
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);

    useEffect(() => {
        async function fetchDashboardData() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Fetch stats
                const { data: orders } = await supabase
                    .from("orders")
                    .select("*")
                    .eq("user_id", user.id);

                if (orders) {
                    const totalOrders = orders.length;
                    const processingOrders = orders.filter((o: any) => o.status === "processing").length;
                    const completedVideos = orders.filter((o: any) => o.status === "completed").length;

                    setStats([
                        { name: "Vidéos commandées", value: completedVideos.toString(), icon: Video, color: "text-blue-500" },
                        { name: "En cours", value: processingOrders.toString(), icon: Sparkles, color: "text-primary" },
                        { name: "Commandes totales", value: totalOrders.toString(), icon: ShoppingBag, color: "text-green-500" },
                        { name: "Crédits restants", value: "10", icon: CreditCard, color: "text-secondary" }, // Assuming 10 for now or fetch from user profile
                    ]);

                    setRecentOrders(orders.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5));
                }
            }
            setLoading(false);
        }

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Bienvenue 👋</h1>
                <p className="text-gray-400">Voici un aperçu de vos campagnes vidéos UGC.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.name} className="glass-card border-white/5">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-gray-400">{stat.name}</CardTitle>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card border-white/5 p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Video className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Lancez une nouvelle campagne</h3>
                    <p className="text-gray-400 max-w-sm mb-8">
                        Simplifiez votre marketing avec des vidéos UGC authentiques livrées en un temps record.
                    </p>
                    <Link href="/#pricing">
                        <Button className="px-8 py-6 rounded-2xl font-bold text-lg">
                            Commander une vidéo
                        </Button>
                    </Link>
                </Card>

                <Card className="glass-card border-white/5 p-8 min-h-[300px]">
                    <h3 className="text-xl font-bold mb-6">Dernières commandes</h3>
                    {recentOrders.length > 0 ? (
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <Link
                                    key={order.id}
                                    href={`/dashboard/orders/${order.id}`}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <ShoppingBag className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{order.order_number}</p>
                                            <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${order.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-gray-600" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full pb-10 text-gray-500 text-sm italic">
                            Aucun historique disponible.
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
