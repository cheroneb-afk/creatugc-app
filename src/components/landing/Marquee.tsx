"use client";

import { motion } from "framer-motion";

const brands = [
    "Shopify", "eBay", "Amazon", "Meta", "TikTok", "AliExpress", "OpenAI",
    "Shopify Partners", "TikTok Shop", "Instagram", "Snapchat", "Google Ads"
];

export default function Marquee() {
    return (
        <div className="py-10 bg-background-dark/50 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background-dark to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background-dark to-transparent z-10" />

            <motion.div
                className="flex whitespace-nowrap gap-12 items-center"
                animate={{ x: [0, -1000] }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {[...brands, ...brands].map((brand, i) => (
                    <span
                        key={i}
                        className="text-2xl md:text-3xl font-black text-white/20 tracking-tighter uppercase italic"
                    >
                        {brand}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
