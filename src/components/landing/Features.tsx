"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, Users, Video, Edit3 } from "lucide-react";

const features = [
    {
        title: "Génération IA Sora 2",
        description: "La technologie la plus avancée au monde pour créer des vidéos indiscernables du réel.",
        icon: Video,
        color: "text-blue-500",
    },
    {
        title: "Scripts Vendeurs",
        description: "Nos scripts sont optimisés par IA pour maximiser le taux de clic et l'engagement.",
        icon: Edit3,
        color: "text-primary",
    },
    {
        title: "Styles UGC Variés",
        description: "Témoignages, Déballage (Unboxing), Tests produits, Styles Lifestyle et plus encore.",
        icon: Users,
        color: "text-secondary",
    },
    {
        title: "10x Moins Cher",
        description: "Économisez des milliers d'euros en frais de production et d'influenceurs.",
        icon: TrendingUp,
        color: "text-green-500",
    },
    {
        title: "Livraison Instantanée",
        description: "Plus besoin d'attendre des semaines. Obtenez vos vidéos en quelques heures.",
        icon: Zap,
        color: "text-yellow-500",
    },
    {
        title: "Droit d'usage Total",
        description: "Vous possédez 100% des droits sur vos vidéos pour toutes vos plateformes publicitaires.",
        icon: ShieldCheck,
        color: "text-purple-500",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Pourquoi choisir <span className="text-gradient">CreatUGC</span> ?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Nous combinons la puissance créative de Sora 2 avec une expertise marketing pour booster vos ventes.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 rounded-3xl group"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`w-7 h-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
