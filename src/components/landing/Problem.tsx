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
        <section className="py-24 relative overflow-hidden bg-background-dark/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Vous en avez assez de <span className="text-red-500">perdre du temps et de l&apos;argent</span> ?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Le modèle traditionnel de création de contenu UGC est cassé. Nous l&apos;avons réparé.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl glass-card border-red-500/10 hover:border-red-500/30 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <problem.icon className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <XCircle className="w-4 h-4 text-red-500" />
                                {problem.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {problem.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
