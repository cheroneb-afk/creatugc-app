"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";

const packs = [
    {
        name: "Solo",
        price: "179",
        videos: "1",
        pricePerVideo: "179",
        features: ["1 Vidéo UGC (15-60s)", "Format au choix", "Script IA inclus", "Droit d'usage total", "Livraison 24-48h"],
        recommended: false,
    },
    {
        name: "Starter",
        price: "640",
        videos: "4",
        pricePerVideo: "160",
        features: ["4 Vidéos UGC", "Mix de formats", "Hooks A/B Testing", "Scripts optimisés", "Priorité Standard"],
        recommended: false,
    },
    {
        name: "Pro",
        price: "750",
        videos: "5",
        pricePerVideo: "150",
        features: ["5 Vidéos UGC", "Tous formats inclus", "Hooks illimités", "Stratégie de contenu", "Support Prioritaire"],
        recommended: true,
    },
    {
        name: "Agency",
        price: "1400",
        videos: "10",
        pricePerVideo: "140",
        features: ["10 Vidéos UGC", "Parfait pour Scaler", "Gestionnaire dédié", "Intégration API", "White-label possible"],
        recommended: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] -z-10" />
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Des tarifs <span className="text-gradient">clairs et transparents</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Choisissez le pack qui correspond à vos besoins et commencez à générer du contenu UGC dès aujourd&apos;hui.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packs.map((pack, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl glass-card flex flex-col ${pack.recommended ? "border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-10" : ""
                                }`}
                        >
                            {pack.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center space-x-1 uppercase tracking-wider">
                                    <Star className="w-3 h-3 fill-white" />
                                    <span>Recommandé</span>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
                                <div className="flex items-baseline mb-1">
                                    <span className="text-4xl font-black">{pack.price}€</span>
                                    <span className="text-gray-400 ml-2 font-medium">HT</span>
                                </div>
                                <p className="text-sm text-gray-500 font-medium">{pack.videos} Vidéos ({pack.pricePerVideo}€/vid)</p>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {pack.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-start space-x-3 text-sm">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                                            <Check className="w-3 h-3 text-secondary" />
                                        </div>
                                        <span className="text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/register"
                                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${pack.recommended
                                    ? "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-lg shadow-primary/20"
                                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                    }`}
                            >
                                Commander maintenant
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
