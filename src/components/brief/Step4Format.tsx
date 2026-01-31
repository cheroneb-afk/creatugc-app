"use client";

import { Label } from "@/components/ui/label";
import { BriefFormData, DURATIONS, FORMATS } from "@/types/brief";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Clock, Square, Maximize, Subtitles } from "lucide-react";

interface StepProps {
    data: Partial<BriefFormData>;
    updateData: (data: Partial<BriefFormData>) => void;
}

export default function Step4Format({ data, updateData }: StepProps) {
    const toggleFormat = (id: string) => {
        const current = data.formats || [];
        if (current.includes(id)) {
            updateData({ formats: current.filter((f) => f !== id) });
        } else {
            updateData({ formats: [...current, id] });
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Formats & Durée</h2>
                <p className="text-gray-400 font-medium">Finalisez les paramètres techniques de vos vidéos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Label className="flex items-center text-sm font-bold uppercase tracking-widest text-primary">
                            <Clock className="w-4 h-4 mr-2" /> Durée souhaitée
                        </Label>
                        <div className="grid grid-cols-3 gap-3">
                            {DURATIONS.map((d) => (
                                <button
                                    key={d.id}
                                    onClick={() => updateData({ duration: d.id })}
                                    className={`py-4 rounded-xl border text-sm font-bold transition-all ${data.duration === d.id
                                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                            : "border-white/10 text-gray-400 bg-white/5 hover:bg-white/10"
                                        }`}
                                >
                                    {d.label.split(" ")[0]} s
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="flex items-center text-sm font-bold uppercase tracking-widest text-secondary">
                            Sous-titres automatiques
                        </Label>
                        <div className="flex items-center justify-between p-6 glass rounded-2xl border border-white/10">
                            <div className="space-y-1">
                                <p className="font-bold">Générer les sous-titres</p>
                                <p className="text-xs text-gray-500">Augmente le taux de rétention de 40%.</p>
                            </div>
                            <Switch
                                checked={data.with_subtitles}
                                onCheckedChange={(checked) => updateData({ with_subtitles: checked })}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <Label className="flex items-center text-sm font-bold uppercase tracking-widest text-blue-500">
                        Sélection des Formats
                    </Label>
                    <div className="space-y-3">
                        {FORMATS.map((f) => (
                            <div
                                key={f.id}
                                onClick={() => toggleFormat(f.id)}
                                className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${data.formats?.includes(f.id)
                                        ? "bg-blue-500/10 border-blue-500 text-white"
                                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                    }`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${data.formats?.includes(f.id) ? "bg-blue-500 text-white" : "bg-white/5"
                                        }`}>
                                        {f.id === "9:16" ? <Maximize className="w-4 h-4 rotate-90" /> : f.id === "1:1" ? <Square className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{f.label.split(" (")[0]}</p>
                                        <p className="text-[10px] opacity-60 uppercase font-medium tracking-tighter">{f.label.split(" (")[1].replace(")", "")}</p>
                                    </div>
                                </div>
                                <Checkbox checked={data.formats?.includes(f.id)} className="border-white/20" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
