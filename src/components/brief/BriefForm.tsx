"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Play, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Step1Product from "./Step1Product";
import Step2Style from "./Step2Style";
import Step3Details from "./Step3Details";
import Step4Format from "./Step4Format";
import Step5Review from "./Step5Review";
import { BriefFormData } from "@/types/brief";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function BriefForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Partial<BriefFormData>>({
        product_images: [],
        key_benefits: [],
        must_include: [],
        must_avoid: [],
        formats: ["9:16"],
        with_subtitles: true,
    });
    const [isSaving, setIsSaving] = useState(false);

    const updateFormData = (data: Partial<BriefFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, 5));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const handleSaveDraft = async () => {
        setIsSaving(true);
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            toast.error("Vous devez être connecté pour sauvegarder un brouillon.");
            setIsSaving(false);
            return;
        }

        const { error } = await supabase
            .from("video_briefs")
            .upsert({
                user_id: user.id,
                product_name: formData.product_name || "Sans titre",
                product_description: formData.product_description,
                product_images: formData.product_images,
                key_benefits: formData.key_benefits,
                video_style: formData.video_style,
                tone: formData.tone,
                target_audience: formData.target_audience,
                reference_video_url: formData.reference_video_url,
                key_message: formData.key_message,
                must_include: formData.must_include,
                must_avoid: formData.must_avoid,
                call_to_action: formData.call_to_action,
                duration: formData.duration,
                formats: formData.formats,
                with_subtitles: formData.with_subtitles,
                status: "draft",
            });

        if (error) {
            toast.error("Erreur lors de la sauvegarde : " + error.message);
        } else {
            toast.success("Brouillon sauvegardé !");
        }
        setIsSaving(false);
    };

    const steps = [
        { id: 1, name: "Produit" },
        { id: 2, name: "Style" },
        { id: 3, name: "Détails" },
        { id: 4, name: "Format" },
        { id: 5, name: "Paiement" },
    ];

    return (
        <PayPalScriptProvider options={{
            "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
            currency: "EUR",
            intent: "capture"
        }}>
            <div className="max-w-4xl mx-auto">
                {/* Stepper */}
                <div className="flex items-center justify-between mb-12">
                    {steps.map((s, idx) => (
                        <div key={s.id} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center group relative">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= s.id
                                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                        : "border-white/10 text-gray-500 bg-white/5"
                                        }`}
                                >
                                    {step > s.id ? <Check className="w-5 h-5" /> : <span>{s.id}</span>}
                                </div>
                                <span className={`absolute -bottom-7 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${step >= s.id ? "text-primary" : "text-gray-600"
                                    }`}>
                                    {s.name}
                                </span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className="flex-1 h-[2px] mx-4 bg-white/5 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: "0%" }}
                                        animate={{ width: step > s.id ? "100%" : "0%" }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="glass-card rounded-[2.5rem] p-8 md:p-12 min-h-[500px] flex flex-col shadow-2xl relative overflow-hidden">
                    {/* Background gradient for the card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1"
                        >
                            {step === 1 && <Step1Product data={formData} updateData={updateFormData} />}
                            {step === 2 && <Step2Style data={formData} updateData={updateFormData} />}
                            {step === 3 && <Step3Details data={formData} updateData={updateFormData} />}
                            {step === 4 && <Step4Format data={formData} updateData={updateFormData} />}
                            {step === 5 && <Step5Review data={formData} updateData={updateFormData} />}
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            disabled={step === 1}
                            className="text-gray-400 hover:text-white"
                        >
                            <ChevronLeft className="mr-2 w-5 h-5" /> Précédent
                        </Button>

                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                onClick={handleSaveDraft}
                                disabled={isSaving}
                                className="border-white/10 hidden sm:flex"
                            >
                                {isSaving ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Sauvegarder
                            </Button>

                            <Button
                                onClick={step === 5 ? () => toast.success("Utilisez le bouton PayPal ci-dessous.") : nextStep}
                                className="bg-gradient-to-r from-primary to-secondary font-bold px-8"
                            >
                                {step === 5 ? "Payer avec PayPal" : "Suivant"} <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    );
}

function Loader2({ className }: { className?: string }) {
    return <Play className={`${className} animate-pulse`} />;
}
