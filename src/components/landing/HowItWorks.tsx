"use client";

import { motion } from "framer-motion";
import { FileEdit, PlayCircle, CheckCircle } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Décrivez votre besoin",
        description: "Remplissez un court questionnaire sur votre produit, votre cible et vos objectifs.",
        icon: FileEdit,
        color: "from-blue-500 to-cyan-500"
    },
    {
        number: "02",
        title: "Nous créons vos vidéos",
        description: "Nos créateurs et experts marketing produisent vos vidéos UGC optimisées pour la conversion.",
        icon: PlayCircle,
        color: "from-primary to-secondary"
    },
    {
        number: "03",
        title: "Recevez et lancez",
        description: "Récupérez vos vidéos sous 48h-72h et commencez à scaler vos publicités immédiatement.",
        icon: CheckCircle,
        color: "from-green-500 to-emerald-500"
    },
];

export default function HowItWorks() {
    return (
        <section id="features" className="py-24 relative overflow-hidden bg-background-dark/30">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white uppercase italic"
                    >
                        Comment ça <span className="text-primary">marche</span> ?
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Un processus simple et rapide pour obtenir vos meilleures publicités en 3 étapes clés.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-10 rounded-[32px] border-white/5 relative group hover:border-primary/20 transition-all text-left"
                        >
                            <span className="text-6xl font-black text-white/5 absolute top-6 right-10 group-hover:text-primary/10 transition-colors">
                                {step.number}
                            </span>

                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-8 shadow-xl shadow-primary/20`}>
                                <div className="w-full h-full rounded-[inherit] bg-background-dark flex items-center justify-center">
                                    <step.icon className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed font-medium">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
