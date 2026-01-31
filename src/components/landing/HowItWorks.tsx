"use client";

import { motion } from "framer-motion";
import { FileEdit, PlayCircle, CheckCircle } from "lucide-react";

const steps = [
    {
        title: "1. Décrivez votre besoin",
        description: "Remplissez un court questionnaire sur votre produit, votre cible et vos objectifs.",
        icon: FileEdit,
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "2. Nous créons vos vidéos",
        description: "Nos créateurs et experts marketing produisent vos vidéos UGC optimisées pour la conversion.",
        icon: PlayCircle,
        color: "from-primary to-secondary"
    },
    {
        title: "3. Recevez et lancez",
        description: "Récupérez vos vidéos sous 48h-72h et commencez à scaler vos publicités immédiatement.",
        icon: CheckCircle,
        color: "from-green-500 to-emerald-500"
    },
];

export default function HowItWorks() {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Comment ça <span className="text-gradient">marche</span> ?
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Un processus simple et rapide pour obtenir vos meilleures publicités.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connection lines (hidden on mobile) */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative z-10 flex flex-col items-center"
                        >
                            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} p-0.5 mb-8 shadow-xl shadow-primary/20`}>
                                <div className="w-full h-full rounded-[inherit] bg-background-dark flex items-center justify-center">
                                    <step.icon className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                            <p className="text-gray-400">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
