"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
    { label: "Vidéos livrées", value: 85000, suffix: "+" },
    { label: "Marques satisfaites", value: 450, suffix: "" },
    { label: "ROAS moyen", value: 4.8, suffix: "x", decimal: true },
    { label: "Délai moyen", value: 48, suffix: "h" },
];

function Counter({ value, decimal, suffix }: { value: number; decimal?: boolean; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            {decimal ? count.toFixed(1) : Math.floor(count)}
            <span className="text-primary">{suffix}</span>
        </span>
    );
}

export default function Stats() {
    return (
        <section className="py-20 bg-background-dark border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <Counter value={stat.value} decimal={stat.decimal} suffix={stat.suffix} />
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
