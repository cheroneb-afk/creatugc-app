import Link from "next/link";
import { Play, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-20 border-t border-white/5 bg-background-dark/50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                                <Play className="text-white fill-white w-4 h-4 ml-0.5" />
                            </div>
                            <span className="text-xl font-bold tracking-tighter text-white">
                                Creat<span className="text-primary">UGC</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            La plateforme n&apos;1 de génération de vidéos UGC par intelligence artificielle pour l&apos;e-commerce.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Produit</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="#features" className="hover:text-primary transition-colors">Fonctionnement</Link></li>
                            <li><Link href="#pricing" className="hover:text-primary transition-colors">Tarifs</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Démos</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Légal</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-primary transition-colors">CGV / CGU</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Politique de Confidentialité</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Mentions Légales</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Suivez-nous</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform"><Twitter className="w-5 h-5 text-gray-400" /></Link>
                            <Link href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform"><Instagram className="w-5 h-5 text-gray-400" /></Link>
                            <Link href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform"><Linkedin className="w-5 h-5 text-gray-400" /></Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 text-center text-xs text-gray-600">
                    <p>© {new Date().getFullYear()} CreatUGC. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
