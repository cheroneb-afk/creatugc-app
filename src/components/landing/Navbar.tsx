"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                        <Play className="text-white fill-white w-5 h-5 ml-1" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white">
                        Creat<span className="text-primary">UGC</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Fonctionnement
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Tarifs
                    </Link>
                    <Link href="#faq" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        FAQ
                    </Link>
                    <Link
                        href="/login"
                        className="text-sm font-medium px-5 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all"
                    >
                        Connexion
                    </Link>
                    <Link
                        href="/register"
                        className="text-sm font-medium px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                    >
                        Essayer Gratuitement
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden glass absolute top-full left-0 right-0 p-6 flex flex-col space-y-4 border-t border-white/10"
                >
                    <Link href="#features" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                        Fonctionnement
                    </Link>
                    <Link href="#pricing" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                        Tarifs
                    </Link>
                    <Link href="/login" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                        Connexion
                    </Link>
                    <Link
                        href="/register"
                        className="text-center bg-gradient-to-r from-primary to-secondary py-3 rounded-xl font-bold"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Démarrer
                    </Link>
                </motion.div>
            )}
        </nav>
    );
}
