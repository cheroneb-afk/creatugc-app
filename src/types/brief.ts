export type BriefFormData = {
    product_name: string;
    product_description: string;
    product_images: string[];
    key_benefits: string[];
    video_style: string;
    tone: string;
    target_audience: string;
    reference_video_url?: string;
    key_message: string;
    must_include: string[];
    must_avoid: string[];
    call_to_action: string;
    duration: string;
    formats: string[];
    with_subtitles: boolean;
    pack_type?: string;
    order_id?: string;
};

export const VIDEO_STYLES = [
    { id: "testimonial", label: "Témoignage (Testimonial)" },
    { id: "unboxing", label: "Déballage (Unboxing)" },
    { id: "demo", label: "Démonstration Produit" },
    { id: "review", label: "Avis d'Expert" },
    { id: "tutorial", label: "Tutoriel / How-to" },
    { id: "lifestyle", label: "Lifestyle / Utilisation" },
];

export const TONES = [
    { id: "enthusiastic", label: "Enthousiaste & Dynamique" },
    { id: "professional", label: "Professionnel & Rassurant" },
    { id: "casual", label: "Décontracté & Authentique" },
    { id: "luxury", label: "Luxe & Haut de Gamme" },
    { id: "fun", label: "Amusant & Créatif" },
];

export const DURATIONS = [
    { id: "15", label: "15 Secondes" },
    { id: "30", label: "30 Secondes" },
    { id: "60", label: "60 Secondes" },
];

export const FORMATS = [
    { id: "9:16", label: "9:16 (TikTok, Reels, Shorts)" },
    { id: "1:1", label: "1:1 (Facebook, Instagram Feed)" },
    { id: "16:9", label: "16:9 (YouTube, Desktop Ads)" },
];
