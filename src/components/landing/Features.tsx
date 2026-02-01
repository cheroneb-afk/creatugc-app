"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, Users, Edit3 } from "lucide-react";

const features = [
    {
        title: "Délai Record 48h",
        description: "Recevez vos premières vidéos UGC en seulement 48 heures, prêtes à être lancées.",
        icon: Zap,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10"
    },
    {
        title: "Qualité Garantie",
        description: "Chaque vidéo est vérifiée par nos experts marketing pour maximiser vos conversions.",
        icon: ShieldCheck,
        color: "text-green-500",
        bg: "bg-green-500/10"
    },
    {
        title: "ROAS Optimisé",
        description: "Nos scripts sont conçus pour capter l'attention dès les premières secondes.",
        icon: TrendingUp,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "Large Réseau",
        description: "Accédez à des centaines de créateurs qualifiés pour tous les types de produits.",
        icon: Users,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        title: "Scripts Sur-Mesure",
        description: "Nous rédigeons des scripts persuasifs adaptés à votre marque et votre audience.",
        icon: Edit3,
        color: "text-orange-500",
        bg: "bg-orange-500/10"
    },
    {
        title: "Liberté Totale",
        description: "Utilisez vos vidéos sur n'importe quelle plateforme, pour n'importe quelle durée.",
        icon: ShieldCheck,
        color: "text-pink-500",
        bg: "bg-pink-500/10"
    }
];

export default function Features() {
    return (
        <section id="features-detail" className="py-24 relative bg-background-dark/50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white uppercase italic"
                    >
                        Pourquoi choisir <span className="text-primary">CreatUGC</span> ?
                    </motion.h2>
                    <p className="text-gray-400 text-lg">
                        Nous combinons créativité humaine et expertise marketing pour des résultats explosifs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass p-10 rounded-[32px] border-white/5 group hover:border-primary/20 transition-all font-sans"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                <feature.icon className={`w-7 h-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
