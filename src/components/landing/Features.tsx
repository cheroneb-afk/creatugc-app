"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, Users, Edit3 } from "lucide-react";

const features = [
    {
        title: "Livraison 48h-72h",
        description: "Plus besoin d'attendre des semaines. Obtenez vos vidéos prêtes à l'emploi en un temps record.",
        icon: Zap,
        color: "text-blue-500",
    },
    {
        title: "Coûts Divisés par 3",
        description: "Notre processus optimisé nous permet de vous offrir des tarifs imbattables sans compromis sur la qualité.",
        icon: ShieldCheck,
        color: "text-primary",
    },
    {
        title: "Vidéos qui Convertissent",
        description: "Chaque vidéo est structurée avec des hooks et des CTAs prouvés pour maximiser votre ROAS.",
        icon: TrendingUp,
        color: "text-secondary",
    },
    {
        title: "Liberté Totale de Droits",
        description: "Utilisez vos vidéos sur n'importe quelle plateforme, pour n'importe quelle durée. Aucun frais caché.",
        icon: Users,
        color: "text-green-500",
    },
    {
        title: "Scripts Authentiques",
        description: "Nous rédigeons des scripts qui parlent vraiment à votre audience, loin des clichés publicitaires.",
        icon: Edit3,
        color: "text-yellow-500",
    },
    {
        title: "Support Réactif",
        description: "Une question ? Un ajustement ? Notre équipe est à votre disposition pour vous accompagner.",
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
                        Nous combinons expertise marketing et rapidité d&apos;exécution pour booster vos performances publicitaires.
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
