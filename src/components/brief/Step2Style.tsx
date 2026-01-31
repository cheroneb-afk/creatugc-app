"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BriefFormData, VIDEO_STYLES, TONES } from "@/types/brief";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles, Link as LinkIcon } from "lucide-react";

interface StepProps {
    data: Partial<BriefFormData>;
    updateData: (data: Partial<BriefFormData>) => void;
}

export default function Step2Style({ data, updateData }: StepProps) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Style & Ambiance</h2>
                <p className="text-gray-400 font-medium">Quelle direction créative souhaitez-vous donner à votre vidéo ?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label className="text-sm font-bold uppercase tracking-widest text-primary flex items-center">
                            <Sparkles className="w-4 h-4 mr-2" /> Style de Vidéo
                        </Label>
                        <RadioGroup
                            value={data.video_style}
                            onValueChange={(v) => updateData({ video_style: v })}
                            className="grid grid-cols-1 gap-3"
                        >
                            {VIDEO_STYLES.map((style) => (
                                <div key={style.id} className="relative">
                                    <RadioGroupItem value={style.id} id={style.id} className="peer sr-only" />
                                    <Label
                                        htmlFor={style.id}
                                        className="flex items-center p-4 rounded-xl border border-white/10 bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all hover:bg-white/10"
                                    >
                                        <span className="text-sm font-bold">{style.label}</span>
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <Label className="text-sm font-bold uppercase tracking-widest text-secondary flex items-center">
                            Ton de la vidéo
                        </Label>
                        <div className="flex flex-wrap gap-2">
                            {TONES.map((tone) => (
                                <button
                                    key={tone.id}
                                    onClick={() => updateData({ tone: tone.id })}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${data.tone === tone.id
                                            ? "bg-secondary border-secondary text-white shadow-lg shadow-secondary/20"
                                            : "border-white/10 text-gray-400 bg-white/5 hover:bg-white/10"
                                        }`}
                                >
                                    {tone.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="audience">Audience cible</Label>
                            <Input
                                id="audience"
                                placeholder="Ex: Femmes 25-40 ans intéressées par la skincare"
                                className="glass border-white/10"
                                value={data.target_audience || ""}
                                onChange={(e) => updateData({ target_audience: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ref_url">Lien vidéo de référence (optionnel)</Label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                <Input
                                    id="ref_url"
                                    placeholder="https://www.tiktok.com/@..."
                                    className="pl-10 glass border-white/10"
                                    value={data.reference_video_url || ""}
                                    onChange={(e) => updateData({ reference_video_url: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
