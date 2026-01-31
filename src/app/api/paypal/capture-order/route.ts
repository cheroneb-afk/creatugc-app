import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { createClient } from "@/lib/supabase/server";
import { triggerN8NWorkflow } from "@/lib/n8n";
import { sendOrderConfirmationEmail } from "@/lib/brevo";

export async function POST(req: Request) {
    try {
        const { orderID, briefData } = await req.json();
        const capture = await capturePayPalOrder(orderID);

        if (capture.status === "COMPLETED") {
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) throw new Error("User not found");

            // Create order in database
            const { data: orderData, error: orderError } = await supabase.from("orders").insert({
                user_id: user.id,
                order_number: `ORD-${Date.now()}`,
                pack_type: briefData.pack_type,
                video_count: briefData.pack_type === "solo" ? 1 : briefData.pack_type === "starter" ? 4 : briefData.pack_type === "pro" ? 5 : 10,
                amount_ht: Number(capture.purchase_units[0].payments.captures[0].amount.value) / 1.2,
                amount_ttc: Number(capture.purchase_units[0].payments.captures[0].amount.value),
                payment_method: "paypal",
                payment_id: orderID,
                paypal_order_id: orderID,
                paypal_capture_id: capture.purchase_units[0].payments.captures[0].id,
                payment_status: "paid",
                status: "processing",
            }).select().single();

            if (orderError) throw orderError;

            // Update brief with order_id and status
            if (briefData.id) {
                const { data: updatedBrief } = await supabase.from("video_briefs").update({
                    order_id: orderData.id,
                    status: "paid"
                }).eq("id", briefData.id).select().single();

                // Trigger n8n workflow for video generation
                await triggerN8NWorkflow({
                    order: orderData,
                    brief: updatedBrief,
                    user: user
                });
            }

            // Send confirmation email
            await sendOrderConfirmationEmail(user.email!, orderData.order_number);
        }

        return NextResponse.json(capture);
    } catch (error) {
        console.error("PayPal Capture Order Error:", error);
        return NextResponse.json({ error: "Failed to capture order" }, { status: 500 });
    }
}
