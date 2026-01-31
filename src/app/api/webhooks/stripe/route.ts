import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        const { userId, packType, briefId } = session.metadata;

        // 1. Create Order in Supabase
        const supabase = await createClient(); // Need a service role client here for safety if RLS is tight

        // For now, using standard client and assuming middleware/RLS allows
        const { error: orderError, data: orderData } = await (await createClient()).from("orders").insert({
            user_id: userId,
            order_number: `ORD-${Date.now()}`,
            pack_type: packType,
            video_count: packType === "solo" ? 1 : packType === "starter" ? 4 : packType === "pro" ? 5 : 10,
            amount_ht: session.amount_total / 1.2 / 100,
            amount_ttc: session.amount_total / 100,
            payment_method: "stripe",
            payment_id: session.id,
            payment_status: "paid",
            status: "processing",
        }).select().single();

        if (orderError) {
            console.error("Error creating order:", orderError);
        } else if (briefId) {
            // 2. Link Brief to Order and update status
            await (await createClient()).from("video_briefs").update({
                order_id: orderData.id,
                status: "paid"
            }).eq("id", briefId);
        }
    }

    return NextResponse.json({ received: true });
}
