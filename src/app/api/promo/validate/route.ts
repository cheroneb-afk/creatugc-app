import { NextResponse } from "next/server";
import { validatePromoCode } from "@/lib/promo";

export async function POST(req: Request) {
    try {
        const { code, amount } = await req.json();
        const result = await validatePromoCode(code);

        if (!result.valid) {
            return NextResponse.json({
                valid: false,
                discount: 0,
                finalPrice: amount,
                error: result.message
            });
        }

        const promo = result.data as { type: string, value: number };
        let discount = 0;

        if (promo.type === 'percentage') {
            discount = (amount * promo.value) / 100;
        } else {
            discount = promo.value;
        }

        return NextResponse.json({
            valid: true,
            discount,
            finalPrice: amount - discount
        });
    } catch {
        return NextResponse.json({ valid: false, discount: 0, finalPrice: 0, error: "Erreur serveur." }, { status: 500 });
    }
}
