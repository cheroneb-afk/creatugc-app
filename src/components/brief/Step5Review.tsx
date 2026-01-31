"use client";

import { BriefFormData } from "@/types/brief";
import { Check, Star, Video, Palette, MessageSquare, Maximize } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PayPalButton from "../payment/PayPalButton";

interface StepProps {
    data: Partial<BriefFormData>;
    updateData: (data: Partial<BriefFormData>) => void;
}

export default function Step5Review({ data, updateData }: StepProps) {
    const packs = [
        { id: "solo", name: "Solo", price: "179", videos: 1 },
        { id: "starter", name: "Starter", price: "640", videos: 4 },
        { id: "pro", name: "Pro", price: "750", videos: 5, recommended: true },
        { id: "agency", name: "Agency", price: "1400", videos: 10 },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Récapitulatif & Choix du Pack</h2>
                <p className="text-gray-400 font-medium">Vérifiez vos informations et sélectionnez votre offre.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass p-6 rounded-2xl border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-3">
                            <Video className="w-5 h-5 text-primary mt-1" />
                            <div>
                                <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Produit</p>
                                <p className="font-bold text-sm">{data.product_name || "Non défini"}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Palette className="w-5 h-5 text-secondary mt-1" />
                            <div>
                                <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Style & Ton</p>
                                <p className="font-bold text-sm">{data.video_style || "UGC"} - {data.tone || "Authentique"}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <MessageSquare className="w-5 h-5 text-green-500 mt-1" />
                            <div>
                                <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Message Clé</p>
                                <p className="font-bold text-sm truncate max-w-[150px]">{data.key_message || "Non défini"}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Maximize className="w-5 h-5 text-blue-500 mt-1" />
                            <div>
                                <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Formats</p>
                                <p className="font-bold text-sm">{data.formats?.join(", ") || "9:16"} ({data.duration || "30"}s)</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {packs.map((pack) => (
                            <div
                                key={pack.id}
                                onClick={() => updateData({ pack_type: pack.id })}
                                className={`p-6 rounded-2xl border cursor-pointer transition-all relative ${data.pack_type === pack.id
                                    ? "bg-primary/10 border-primary ring-1 ring-primary"
                                    : "bg-white/5 border-white/5 hover:bg-white/10"
                                    }`}
                            >
                                {pack.recommended && (
                                    <Star className="absolute top-4 right-4 w-4 h-4 text-secondary fill-secondary" />
                                )}
                                <p className="font-bold mb-1">{pack.name}</p>
                                <div className="flex items-baseline space-x-1">
                                    <span className="text-2xl font-black">{pack.price}€</span>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">HT</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2">{pack.videos} Vidéos incluses</p>
                                {data.pack_type === pack.id && (
                                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="glass-card p-8 rounded-3xl border border-primary/20 bg-primary/5">
                        <h3 className="text-xl font-bold mb-6">Résumé du Paiement</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Pack {data.pack_type?.toUpperCase() || "..."}</span>
                                <span className="font-bold">{packs.find(p => p.id === data.pack_type)?.price || "0"}€</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">TVA (20%)</span>
                                <span className="font-bold">{(Number(packs.find(p => p.id === data.pack_type)?.price || 0) * 0.2).toFixed(2)}€</span>
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                <span className="text-gray-400 font-bold">Total TTC</span>
                                <span className="text-2xl font-black text-gradient">
                                    {(Number(packs.find(p => p.id === data.pack_type)?.price || 0) * 1.2).toFixed(2)}€
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="relative">
                                <Input placeholder="Code Promo" className="bg-white/5 border-white/10 pr-20" />
                                <Button variant="ghost" className="absolute right-1 top-1 h-8 text-xs font-bold text-primary hover:bg-primary/10">Appliquer</Button>
                            </div>
                            <p className="text-[10px] text-gray-500 text-center italic">Le paiement est sécurisé par PayPal.</p>

                            {data.pack_type && (
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <PayPalButton
                                        amount={(Number(packs.find(p => p.id === data.pack_type)?.price || 0) * 1.2).toFixed(2)}
                                        briefData={data}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
