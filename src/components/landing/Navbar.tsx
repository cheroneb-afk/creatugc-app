"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const supabase = createClient();
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.reload();
    };

    return (
        <>
            {/* Promo Banner */}
            <div className="fixed top-0 left-0 right-0 z-[60] py-2 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-md border-b border-white/10 overflow-hidden">
                <div className="container mx-auto px-6 flex items-center justify-center gap-3">
                    <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
                    <p className="text-[10px] md:text-sm font-bold tracking-wider text-white uppercase">
                        ⚡ Offre de lancement : <span className="underline decoration-white/30 underline-offset-4">-30% sur votre première vidéo UGC</span>
                    </p>
                    <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
                </div>
            </div>

            <nav
                className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3" : "bg-transparent py-5"
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
                            Comment ça marche
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Tarifs
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-sm font-medium px-5 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href="#pricing"
                                    className="text-sm font-medium px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                                >
                                    Commander
                                </Link>
                            </>
                        )}
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
                            Comment ça marche
                        </Link>
                        <Link href="#pricing" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                            Tarifs
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-lg font-medium flex items-center gap-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-lg font-medium text-left text-gray-400 flex items-center gap-2"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                                    Connexion
                                </Link>
                                <Link
                                    href="#pricing"
                                    className="text-center bg-gradient-to-r from-primary to-secondary py-3 rounded-xl font-bold"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Commander
                                </Link>
                            </>
                        )}
                    </motion.div>
                )}
            </nav>
        </>
    );
}
