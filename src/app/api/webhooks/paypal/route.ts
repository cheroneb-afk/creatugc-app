import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/paypal";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const isVerified = await verifyWebhookSignature(req);

        if (!isVerified) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        const event = body.event_type;

        if (event === "PAYMENT.CAPTURE.COMPLETED") {
            const capture = body.resource;
            const orderId = capture.supplementary_data?.related_ids?.order_id;

            if (orderId) {
                const supabase = await createClient();

                // Update order status in Supabase if not already updated by capture route
                const { data: orderData } = await supabase
                    .from("orders")
                    .update({
                        payment_status: "paid",
                        status: "processing",
                        paypal_capture_id: capture.id
                    })
                    .eq("paypal_order_id", orderId)
                    .select()
                    .single();

                if (orderData?.id) {
                    await supabase
                        .from("video_briefs")
                        .update({ status: "paid" })
                        .eq("order_id", orderData.id);
                }
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("PayPal Webhook Error:", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}
