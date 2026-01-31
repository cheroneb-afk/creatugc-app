"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Qu'est-ce qu'une vidéo UGC ?",
        answer: "Le User-Generated Content (UGC) est une vidéo qui ressemble à du contenu créé par un utilisateur réel de manière authentique. C'est aujourd'hui le format le plus performant pour la publicité sur les réseaux sociaux.",
    },
    {
        question: "En combien de temps vais-je recevoir ma commande ?",
        answer: "Nous livrons vos vidéos en 48h à 72h ouvrées après la validation de votre brief.",
    },
    {
        question: "Comment se passe la création des scripts ?",
        answer: "Nos experts en copywriting rédigent les scripts en se basant sur les informations de votre brief pour s'assurer qu'ils répondent à vos objectifs de conversion.",
    },
    {
        question: "Puis-je demander des modifications ?",
        answer: "Oui, chaque pack (sauf Solo) inclut une révision gratuite pour vous assurer que le résultat final vous convient parfaitement.",
    },
    {
        question: "Ai-je les droits sur les vidéos ?",
        answer: "Absolument. Une fois la vidéo livrée, vous disposez d'un droit d'usage total et illimité pour vos campagnes publicitaires ou vos réseaux sociaux.",
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
