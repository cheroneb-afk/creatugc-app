"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BriefFormData } from "@/types/brief";
import { Plus, X, ListChecks, Ban, MessageSquare } from "lucide-react";

interface StepProps {
    data: Partial<BriefFormData>;
    updateData: (data: Partial<BriefFormData>) => void;
}

export default function Step3Details({ data, updateData }: StepProps) {
    const [tempIn, setTempIn] = useState("");
    const [tempEx, setTempEx] = useState("");

    const addItem = (type: "in" | "ex") => {
        if (type === "in" && tempIn.trim()) {
            updateData({ must_include: [...(data.must_include || []), tempIn.trim()] });
            setTempIn("");
        } else if (type === "ex" && tempEx.trim()) {
            updateData({ must_avoid: [...(data.must_avoid || []), tempEx.trim()] });
            setTempEx("");
        }
    };

    const removeItem = (type: "in" | "ex", index: number) => {
        if (type === "in") {
            updateData({ must_include: (data.must_include || []).filter((_, i) => i !== index) });
        } else {
            updateData({ must_avoid: (data.must_avoid || []).filter((_, i) => i !== index) });
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Détails & Message</h2>
                <p className="text-gray-400 font-medium">Qu'est-ce que l'IA doit absolument mentionner ou éviter ?</p>
            </div>

            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Label className="flex items-center text-primary uppercase text-xs font-black tracking-widest">
                            <MessageSquare className="w-4 h-4 mr-2" /> Message Clé (Unique)
                        </Label>
                        <Textarea
                            placeholder="Le point le plus important que le spectateur doit retenir..."
                            className="glass border-white/10 min-h-[100px]"
                            value={data.key_message || ""}
                            onChange={(e) => updateData({ key_message: e.target.value })}
                        />
                    </div>

                    <div className="space-y-4">
                        <Label className="flex items-center text-secondary uppercase text-xs font-black tracking-widest">
                            L'Appel à l'Action (CTA)
                        </Label>
                        <Input
                            placeholder="Ex: Commandez maintenant et -15% !"
                            className="glass border-white/10 h-14"
                            value={data.call_to_action || ""}
                            onChange={(e) => updateData({ call_to_action: e.target.value })}
                        />
                        <p className="text-[10px] text-gray-500 italic">C'est la phrase finale qui déclenche l'achat.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4">
                        <Label className="flex items-center text-green-500 uppercase text-xs font-black tracking-widest">
                            <ListChecks className="w-4 h-4 mr-2" /> À inclure absolument
                        </Label>
                        <div className="flex space-x-2">
                            <Input
                                placeholder="Ex: Logo au début"
                                className="glass border-white/10"
                                value={tempIn}
                                onChange={(e) => setTempIn(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addItem("in")}
                            />
                            <button onClick={() => addItem("in")} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"><Plus className="w-4 h-4" /></button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(data.must_include || []).map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 text-green-500 px-3 py-1.5 rounded-xl text-xs font-bold">
                                    <span>{item}</span>
                                    <button onClick={() => removeItem("in", idx)}><X className="w-3 h-3" /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="flex items-center text-red-500 uppercase text-xs font-black tracking-widest">
                            <Ban className="w-4 h-4 mr-2" /> À éviter / Interdictions
                        </Label>
                        <div className="flex space-x-2">
                            <Input
                                placeholder="Ex: Mention du prix"
                                className="glass border-white/10"
                                value={tempEx}
                                onChange={(e) => setTempEx(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addItem("ex")}
                            />
                            <button onClick={() => addItem("ex")} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"><Plus className="w-4 h-4" /></button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(data.must_avoid || []).map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 text-red-500 px-3 py-1.5 rounded-xl text-xs font-bold">
                                    <span>{item}</span>
                                    <button onClick={() => removeItem("ex", idx)}><X className="w-3 h-3" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
