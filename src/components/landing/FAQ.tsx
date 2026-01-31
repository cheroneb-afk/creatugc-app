"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Qu'est-ce qu'une vidéo UGC générée par IA ?",
        answer: "UGC signifie 'User Generated Content'. Traditionnellement, cela implique d'envoyer vos produits à des influenceurs. Notre technologie utilise Sora 2 pour générer ces vidéos de manière photoréaliste, avec des voix et des visages humains, sans avoir besoin d'envoyer de produit physique.",
    },
    {
        question: "Les vidéos sont-elles vraiment uniques ?",
        answer: "Oui. Chaque brief génère des paramètres uniques pour l'IA. Vos vidéos ne seront jamais identiques à celles d'un concurrent, même pour un produit similaire.",
    },
    {
        question: "Dois-je posséder les droits d'auteur ?",
        answer: "Une fois la commande livrée et payée, vous détenez 100% des droits d'exploitation commerciale pour vos publicités Meta, TikTok, YouTube et votre site web.",
    },
    {
        question: "Quel est le délai de livraison ?",
        answer: "Le processus de génération prend généralement entre 2 et 24 heures après la soumission de votre brief détaillé.",
    },
    {
        question: "Puis-je demander des modifications ?",
        answer: "Chaque pack inclut un certain nombre de révisions basées sur votre brief initial pour garantir que le message clé est respecté.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Questions Fréquentes</h2>
                    <p className="text-gray-400">Tout ce que vous devez savoir sur CreatUGC.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass rounded-2xl overflow-hidden"
                        >
                            <button
                                className="w-full px-8 py-6 flex items-center justify-between text-left"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-bold">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="w-5 h-5 text-secondary" />
                                ) : (
                                    <Plus className="w-5 h-5 text-primary" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-8 pb-6 text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
