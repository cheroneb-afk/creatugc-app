"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, Video } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square md:aspect-video -z-10 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border-white/10 mb-8"
                >
                    <div className="flex -space-x-2 mr-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-800" />
                        ))}
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-gray-300">
                        +85,000 clients nous font confiance
                    </span>
                    <div className="ml-2 flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-white"
                >
                    Transformez vos produits <br /> en <span className="text-gradient">UGC qui vendent</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    Boostez votre ROAS avec des vidéos authentiques, performantes et livrées en un temps record. La solution numéro 1 pour l&apos;e-commerce et les marques DTC.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6 mb-20"
                >
                    <Link
                        href="/checkout"
                        className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black rounded-full text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 uppercase tracking-tight italic"
                    >
                        Commander ma vidéo
                    </Link>
                    <Link
                        href="#demo"
                        className="w-full sm:w-auto px-10 py-5 glass border-white/10 text-white font-black rounded-full text-lg hover:bg-white/5 transition-all uppercase tracking-tight italic"
                    >
                        Voir les exemples
                    </Link>
                </motion.div>

                {/* Video Showcase Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative max-w-6xl mx-auto"
                >
                    <div className="relative aspect-video rounded-[40px] overflow-hidden glass border-4 border-white/5 shadow-2xl group">
                        {/* Video Placeholder with Overlay */}
                        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent z-10" />
                            <div className="flex flex-col items-center gap-4 z-20">
                                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                                        <Play className="w-6 h-6 text-white fill-current ml-1" />
                                    </div>
                                </div>
                                <span className="text-white/50 text-sm font-bold tracking-widest uppercase italic">Nos créations en action</span>
                            </div>
                        </div>

                        {/* Social Proof Badges over Video */}
                        <div className="absolute transition-all bottom-8 left-8 z-30 flex flex-col gap-2">
                            <div className="p-3 glass rounded-2xl border-white/10 backdrop-blur-xl max-w-[220px] animate-bounce-slow">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] uppercase font-black text-white/70 italic">Ventes en direct</span>
                                </div>
                                <p className="text-xs font-bold text-white">+1,240€ générés il y a 5 min</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-[80px] -z-10" />
                </motion.div>
            </div>
        </section>
    );
}
