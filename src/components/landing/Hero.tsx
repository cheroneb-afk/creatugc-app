"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, ArrowRight, Video } from "lucide-react";
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
                    className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass border-white/10 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-semibold tracking-wide uppercase text-gray-300">
                        Propulsé par Sora 2 & Sora AI
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]"
                >
                    Des Vidéos <span className="text-gradient">UGC Illimitées</span> <br className="hidden md:block" /> En
                    Quelques Minutes
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Boostez vos conversions avec des vidéos UGC générées par IA qui ressemblent à du vrai contenu humain. 10x
                    moins cher, 100x plus rapide.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                >
                    <Link
                        href="/register"
                        className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-xl shadow-primary/25 hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center">
                            Lancer ma campagne <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                    <Link
                        href="#demo"
                        className="flex items-center space-x-2 px-8 py-4 rounded-2xl glass hover:bg-white/5 transition-all font-bold text-lg"
                    >
                        <Play className="w-5 h-5 fill-white" />
                        <span>Voir les démos</span>
                    </Link>
                </motion.div>

                {/* Video Preview / Social Proof */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-20 relative max-w-5xl mx-auto"
                >
                    <div className="aspect-video glass rounded-3xl p-2 relative overflow-hidden group">
                        <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden">
                            {/* Image Placeholder with prompt style */}
                            <div className="absolute inset-0 bg-slate-800 animate-pulse flex flex-col items-center justify-center text-gray-500">
                                <Video className="w-16 h-16 mb-4 opacity-20" />
                                <span className="text-sm font-medium tracking-widest uppercase opacity-40">Awaiting Sora 2 Generation...</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-60" />
                            <div className="absolute bottom-6 left-6 text-left">
                                <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-secondary mb-2">
                                    <div className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                                    <span>Prompt: Testimonial Video For Beauty...</span>
                                </div>
                                <h3 className="text-xl font-bold">Générez n'importe quel style de vidéo UGC instantanément.</h3>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-secondary rounded-full blur-2xl animate-bounce" />
                    <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary rounded-full blur-3xl animate-pulse" />
                </motion.div>
            </div>
        </section>
    );
}
