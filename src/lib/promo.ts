import { createClient } from "@/lib/supabase/server";

export async function validatePromoCode(code: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("promo_codes")
        .select("*")
        .eq("code", code)
        .single();

    if (error || !data) {
        return { valid: false, message: "Code promo invalide." };
    }

    const now = new Date();
    if (data.valid_until && new Date(data.valid_until) < now) {
        return { valid: false, message: "Ce code est expiré." };
    }

    if (data.max_uses && data.used_count >= data.max_uses) {
        return { valid: false, message: "Ce code n'est plus disponible." };
    }

    return { valid: true, data };
}
