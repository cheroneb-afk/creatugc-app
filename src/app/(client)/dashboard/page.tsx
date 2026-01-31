import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ShoppingBag, CreditCard, Sparkles } from "lucide-react";

export default function DashboardPage() {
    const stats = [
        { name: "Vidéos commandées", value: "0", icon: Video, color: "text-blue-500" },
        { name: "En cours", value: "0", icon: Sparkles, color: "text-primary" },
        { name: "Commandes totales", value: "0", icon: ShoppingBag, color: "text-green-500" },
        { name: "Crédits restants", value: "10", icon: CreditCard, color: "text-secondary" },
    ];

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
                    <h3 className="text-xl font-bold mb-2">Aucune vidéo pour le moment</h3>
                    <p className="text-gray-400 max-w-sm mb-8">
                        Lancez votre première commande pour voir vos vidéos apparaître ici.
                    </p>
                    <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all">
                        Commander ma première vidéo
                    </button>
                </Card>

                <Card className="glass-card border-white/5 p-8 min-h-[300px]">
                    <h3 className="text-xl font-bold mb-6">Dernières commandes</h3>
                    <div className="flex flex-col items-center justify-center h-full pb-10 text-gray-500 text-sm italic">
                        Aucun historique disponible.
                    </div>
                </Card>
            </div>
        </div>
    );
}
