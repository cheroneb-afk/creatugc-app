"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Truck, Building2, UserCircle2, Rocket } from "lucide-react";

const personas = [
    {
        title: "E-commerçants",
        description: "Multipliez vos ventes avec des publicités UGC qui arrêtent le scroll.",
        icon: ShoppingBag,
        color: "from-pink-500 to-rose-500",
    },
    {
        title: "Dropshippers",
        description: "Testez rapidement vos produits avec du contenu frais et authentique.",
        icon: Truck,
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Marques DTC",
        description: "Construisez une image de marque forte et gagnez la confiance de vos clients.",
        icon: Rocket,
        color: "from-purple-500 to-indigo-500",
    },
    {
        title: "Agences",
        description: "Offrez du contenu UGC de haute qualité à vos clients sans la logistique.",
        icon: Building2,
        color: "from-orange-500 to-yellow-500",
    },
    {
        title: "Créateurs UGC",
        description: "Rejoignez notre réseau et commencez à créer pour des marques mondiales.",
        icon: UserCircle2,
        color: "from-green-500 to-emerald-500",
    },
];

export default function TargetAudience() {
    return (
        <section className="py-24 bg-background-dark/50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white uppercase italic">
                        Pour <span className="text-primary">qui ?</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Que vous soyez une petite boutique ou une grande marque, CreatUGC s&apos;adapte à vos besoins.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {personas.map((persona, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="glass p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${persona.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                <persona.icon className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{persona.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {persona.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
