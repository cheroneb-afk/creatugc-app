import { NextResponse } from "next/server";
import { validatePromoCode } from "@/lib/promo";

export async function POST(req: Request) {
    try {
        const { code } = await req.json();
        const result = await validatePromoCode(code);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ valid: false, message: "Erreur serveur." }, { status: 500 });
    }
}
