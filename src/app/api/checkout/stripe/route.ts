import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    try {
        const { pack_type, brief_id } = await req.json();
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const packs: Record<string, { name: string; amount: number }> = {
            solo: { name: "Pack Solo - 1 Vidéo", amount: 17900 },
            starter: { name: "Pack Starter - 4 Vidéos", amount: 64000 },
            pro: { name: "Pack Pro - 5 Vidéos", amount: 75000 },
            agency: { name: "Pack Agency - 10 Vidéos", amount: 140000 },
        };

        const pack = packs[pack_type];
        if (!pack) {
            return NextResponse.json({ error: "Invalid pack type" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: pack.name,
                            description: "Campagne vidéo UGC par CreatUGC",
                        },
                        unit_amount: pack.amount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/new?canceled=true`,
            customer_email: user.email,
            metadata: {
                userId: user.id,
                packType: pack_type,
                briefId: brief_id,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
