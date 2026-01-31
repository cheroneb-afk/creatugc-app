"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BriefFormData } from "@/types/brief";
import { Plus, X, Upload, Image as ImageIcon } from "lucide-react";
import { uploadProductImages } from "@/lib/storage";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface StepProps {
    data: Partial<BriefFormData>;
    updateData: (data: Partial<BriefFormData>) => void;
}

export default function Step1Product({ data, updateData }: StepProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [tempBenefit, setTempBenefit] = useState("");

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            toast.error("Vous devez être connecté.");
            setIsUploading(false);
            return;
        }

        try {
            const urls = await uploadProductImages(Array.from(files), user.id);
            updateData({ product_images: [...(data.product_images || []), ...urls] });
            toast.success(`${urls.length} images ajoutées.`);
        } catch (err) {
            toast.error("Erreur lors de l'upload.");
        } finally {
            setIsUploading(false);
        }
    };

    const addBenefit = () => {
        if (tempBenefit.trim() && (data.key_benefits?.length || 0) < 5) {
            updateData({ key_benefits: [...(data.key_benefits || []), tempBenefit.trim()] });
            setTempBenefit("");
        }
    };

    const removeBenefit = (index: number) => {
        updateData({ key_benefits: (data.key_benefits || []).filter((_, i) => i !== index) });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Le Produit</h2>
                <p className="text-gray-400 font-medium">Parlez-nous de ce que nous allons mettre en avant.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="product_name">Nom du produit *</Label>
                        <Input
                            id="product_name"
                            placeholder="Ex: Sérum Éclat Éternel"
                            className="glass border-white/10"
                            value={data.product_name || ""}
                            onChange={(e) => updateData({ product_name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product_description">Description courte</Label>
                        <Textarea
                            id="product_description"
                            placeholder="Décrivez votre produit en quelques phrases..."
                            className="glass border-white/10 min-h-[120px]"
                            value={data.product_description || ""}
                            onChange={(e) => updateData({ product_description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-4">
                        <Label>Bénéfices clés (3-5)</Label>
                        <div className="flex space-x-2">
                            <Input
                                placeholder="Ex: Hydratation 24h"
                                className="glass border-white/10"
                                value={tempBenefit}
                                onChange={(e) => setTempBenefit(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addBenefit()}
                            />
                            <button
                                type="button"
                                onClick={addBenefit}
                                className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10"
                            >
                                <Plus className="w-5 h-5 text-primary" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(data.key_benefits || []).map((benefit, idx) => (
                                <div key={idx} className="flex items-center space-x-2 bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                    <span>{benefit}</span>
                                    <button onClick={() => removeBenefit(idx)}><X className="w-3 h-3" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <Label>Images du produit (1-5)</Label>
                    <div className="grid grid-cols-2 gap-4">
                        {(data.product_images || []).map((url, idx) => (
                            <div key={idx} className="relative aspect-square glass rounded-2xl overflow-hidden group border border-white/10">
                                <img src={url} alt="Product" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => updateData({ product_images: data.product_images?.filter((_, i) => i !== idx) })}
                                    className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        ))}
                        {(data.product_images?.length || 0) < 5 && (
                            <label className={`aspect-square glass rounded-2xl flex flex-col items-center justify-center cursor-pointer border-dashed border-2 border-white/10 hover:border-primary/50 transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                <Upload className="w-6 h-6 text-gray-500 mb-2" />
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{isUploading ? 'Upload...' : 'Ajouter'}</span>
                                <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileUpload} />
                            </label>
                        )}
                    </div>
                    <p className="text-[10px] text-gray-500 italic">Formats acceptés: PNG, JPG. Max 5Mo par fichier.</p>
                </div>
            </div>
        </div>
    );
}
