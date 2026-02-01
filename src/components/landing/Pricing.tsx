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
        features: ["Livraison 48-72h", "3 formats inclus", "Sous-titres inclus", "1 révision gratuite", "Droits commerciaux complets"],
        recommended: false,
    },
    {
        name: "Starter",
        price: "640",
        videos: "4",
        pricePerVideo: "160",
        features: ["Livraison 48-72h", "3 formats inclus", "Sous-titres inclus", "1 révision gratuite", "Droits commerciaux complets"],
        recommended: false,
    },
    {
        name: "Pro",
        price: "750",
        videos: "5",
        pricePerVideo: "150",
        features: ["Livraison 48-72h", "3 formats inclus", "Sous-titres inclus", "1 révision gratuite", "Droits commerciaux complets"],
        recommended: true,
    },
    {
        name: "Agency",
        price: "1400",
        videos: "10",
        pricePerVideo: "140",
        features: ["Livraison 48-72h", "3 formats inclus", "Sous-titres inclus", "1 révision gratuite", "Droits commerciaux complets"],
        recommended: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden bg-background-dark/30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] -z-10" />
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white uppercase italic"
                    >
                        Des tarifs <span className="text-primary">Clairs</span>
                    </motion.h2>
                    <p className="text-gray-400 text-lg">
                        Choisissez le pack qui correspond à votre ambition. Sans engagement.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packs.map((pack, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`relative p-10 rounded-[40px] glass border-white/5 flex flex-col group transition-all ${pack.recommended ? "border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-10" : ""
                                }`}
                        >
                            {pack.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full flex items-center space-x-1 uppercase tracking-widest italic z-20">
                                    <Star className="w-3 h-3 fill-white" />
                                    <span>Populaire</span>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-lg font-black text-white/50 mb-2 uppercase tracking-widest">{pack.name}</h3>
                                <div className="flex items-baseline mb-1">
                                    <span className="text-5xl font-black text-white tracking-tighter">{pack.price}€</span>
                                    <span className="text-gray-400 ml-2 font-bold text-sm tracking-tighter uppercase italic">HT</span>
                                </div>
                                <p className="text-sm text-primary font-black uppercase italic tracking-tighter">{pack.videos} {parseInt(pack.videos) > 1 ? "Vidéos" : "Vidéo"} ({pack.pricePerVideo}€/vid)</p>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {pack.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-start space-x-3 text-sm">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-primary" />
                                        </div>
                                        <span className="text-gray-400 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href={`/checkout?pack=${pack.name.toLowerCase()}`}
                                className={`w-full py-5 rounded-full font-black text-center transition-all uppercase tracking-tight italic ${pack.recommended
                                    ? "bg-primary text-white hover:scale-105 shadow-xl shadow-primary/30"
                                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                    }`}
                            >
                                Commander
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
