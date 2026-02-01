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
        <section id="faq" className="py-24 bg-background-dark/50">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white uppercase italic"
                    >
                        Questions <span className="text-primary">Fréquentes</span>
                    </motion.h2>
                    <p className="text-gray-400 text-lg">
                        Tout ce que vous devez savoir sur CreatUGC.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`glass rounded-[32px] border-white/5 overflow-hidden transition-all ${openIndex === index ? "border-primary/20 ring-1 ring-primary/10" : "hover:border-primary/10"}`}
                        >
                            <button
                                className="w-full px-10 py-8 flex items-center justify-between text-left group"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className={`text-xl font-black uppercase tracking-tight transition-colors ${openIndex === index ? "text-primary" : "text-white group-hover:text-primary/70"}`}>
                                    {faq.question}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? "bg-primary text-white rotate-180" : "bg-white/5 text-primary group-hover:bg-primary/20"}`}>
                                    {openIndex === index ? (
                                        <Minus className="w-4 h-4" />
                                    ) : (
                                        <Plus className="w-4 h-4" />
                                    )}
                                </div>
                            </button>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="px-10 pb-8 text-gray-400 font-medium leading-relaxed"
                                >
                                    <div className="pt-2 border-t border-white/5">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
