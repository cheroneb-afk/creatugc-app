import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { triggerN8NWorkflow } from "@/lib/n8n";
import { sendOrderConfirmationEmail } from "@/lib/brevo";

export async function POST(req: Request) {
    try {
        const { orderID, briefData, email } = await req.json();
        const capture = await capturePayPalOrder(orderID);

        if (capture.status === "COMPLETED") {
            const supabase = await createClient();
            const supabaseAdmin = createAdminClient();

            let userId: string;
            let userEmail: string;
            let isNewUser = false;

            // First, check if user is authenticated (returning customer who logged in)
            const { data: { user: authenticatedUser } } = await supabase.auth.getUser();

            if (authenticatedUser) {
                // User is logged in - use their ID
                userId = authenticatedUser.id;
                userEmail = authenticatedUser.email!;
            } else if (email) {
                // Anonymous checkout - check if email exists in profiles
                const { data: existingProfile } = await supabaseAdmin
                    .from("profiles")
                    .select("id, email")
                    .eq("email", email)
                    .single();

                if (existingProfile) {
                    // Email exists - link order to existing account
                    userId = existingProfile.id;
                    userEmail = existingProfile.email;
                } else {
                    // New email - create a new user account
                    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
                        email: email,
                        email_confirm: true,
                        user_metadata: {
                            created_via: "checkout"
                        }
                    });

                    if (createError || !newUser.user) {
                        console.error("Error creating user:", createError);
                        throw new Error("Failed to create user account");
                    }

                    userId = newUser.user.id;
                    userEmail = email;
                    isNewUser = true;

                    // Send password reset email so user can set their password
                    const { error: resetError } = await supabaseAdmin.auth.admin.generateLink({
                        type: "recovery",
                        email: email,
                        options: {
                            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/set-password`
                        }
                    });

                    if (resetError) {
                        console.error("Error sending password reset email:", resetError);
                        // Don't throw - order should still be created
                    }
                }
            } else {
                throw new Error("No authenticated user and no email provided");
            }

            // Create order in database
            const { data: orderData, error: orderError } = await supabaseAdmin.from("orders").insert({
                user_id: userId,
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
                promo_code: briefData.promo_code || null,
                discount_amount: briefData.discount_amount || 0
            }).select().single();

            if (orderError) throw orderError;

            // Update brief with order_id and status (only if brief already exists)
            if (briefData.id) {
                const { data: updatedBrief } = await supabaseAdmin.from("video_briefs").update({
                    order_id: orderData.id,
                    status: "paid"
                }).eq("id", briefData.id).select().single();

                // Create video placeholders in generated_videos
                const videoCount = orderData.video_count || 1;
                const placeholders = Array.from({ length: videoCount }).map(() => ({
                    user_id: userId,
                    brief_id: updatedBrief.id,
                    status: "processing",
                    format: updatedBrief.formats?.[0] || "9:16",
                }));

                const { data: generatedVideos, error: genError } = await supabaseAdmin
                    .from("generated_videos")
                    .insert(placeholders)
                    .select();

                if (genError) console.error("Error creating video placeholders:", genError);

                // Trigger n8n workflow for video generation
                await triggerN8NWorkflow({
                    order: orderData,
                    brief: updatedBrief,
                    user: { id: userId, email: userEmail },
                    video_placeholders: generatedVideos || []
                });
            }

            // Send confirmation email
            await sendOrderConfirmationEmail(userEmail, orderData.order_number);

            return NextResponse.json({
                ...capture,
                dbOrderId: orderData.id,
                orderNumber: orderData.order_number,
                isNewUser
            });
        }

        return NextResponse.json(capture);
    } catch (error) {
        console.error("PayPal Capture Order Error:", error);
        return NextResponse.json({ error: "Failed to capture order" }, { status: 500 });
    }
}
