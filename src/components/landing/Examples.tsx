"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function Examples() {
    return (
        <section id="demo" className="py-24 bg-background-dark/30">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white uppercase italic"
                    >
                        Des résultats <span className="text-primary">Concrets</span>
                    </motion.h2>
                    <p className="text-gray-400 text-lg">
                        Quelques-unes de nos dernières productions pour nos clients.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="relative aspect-[9/16] rounded-[32px] overflow-hidden glass group cursor-pointer border border-white/5 hover:border-primary/30 transition-all shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                    <Play className="w-6 h-6 text-primary group-hover:text-white fill-current" />
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2">Social Ads</p>
                                <p className="text-lg font-black text-white uppercase italic tracking-tighter leading-none mb-1">Niche E-com</p>
                                <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Conversion Focus</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
