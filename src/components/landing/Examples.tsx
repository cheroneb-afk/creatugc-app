"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function Examples() {
    return (
        <section id="demo" className="py-24 bg-background-dark/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Des résultats <span className="text-gradient">concrets</span>
                    </motion.h2>
                    <p className="text-gray-400">Quelques-unes de nos dernières productions pour nos clients.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative aspect-[9/16] rounded-3xl overflow-hidden glass group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
                                <Play className="w-12 h-12 text-white/20 group-hover:scale-125 transition-transform" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                <p className="text-sm font-bold text-white uppercase tracking-wider">Publicité TikTok</p>
                                <p className="text-xs text-white/60">Niche E-commerce</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
