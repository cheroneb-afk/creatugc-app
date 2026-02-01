"use client";

import { motion } from "framer-motion";
import { XCircle, AlertCircle, Clock, DollarSign, UserX } from "lucide-react";

const problems = [
    {
        title: "Coûts exorbitants",
        description: "Les créateurs traditionnels facturent entre 150€ et 300€ par vidéo, sans garantie de performance.",
        icon: DollarSign,
    },
    {
        title: "Délais interminables",
        description: "Attendre 2 à 3 semaines pour recevoir une vidéo est inacceptable dans l'e-commerce moderne.",
        icon: Clock,
    },
    {
        title: "Qualité inégale",
        description: "Scripts mal écrits, cadrage amateur, manque d'énergie... la qualité est souvent une loterie.",
        icon: AlertCircle,
    },
    {
        title: "Gestion complexe",
        description: "Sourcing, briefs, relances, négociations... gérer des créateurs est chronophage.",
        icon: UserX,
    },
];

export default function Problem() {
    return (
        <section id="problem" className="py-24 relative overflow-hidden bg-background-dark">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white uppercase italic"
                    >
                        Le modèle actuel est <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Cassé</span>
                    </motion.h2>
                    <p className="text-gray-400 text-lg">
                        Pourquoi continuer à perdre du temps et de l&apos;argent avec des méthodes obsolètes ?
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-10 rounded-[32px] border-red-500/5 hover:border-red-500/20 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-red-500/5">
                                <problem.icon className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                {problem.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed font-medium text-sm">
                                {problem.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
