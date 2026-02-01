import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { triggerN8NWorkflow } from "@/lib/n8n";
import { sendOrderConfirmationEmail } from "@/lib/brevo";

export async function POST(req: Request) {
    console.log("=== CAPTURE ORDER START ===");

    try {
        const { orderID, briefData, email } = await req.json();
        console.log("Request body:", { orderID, briefData, email });

        // Capture the PayPal order
        console.log("Capturing PayPal order...");
        const capture = await capturePayPalOrder(orderID);
        console.log("PayPal capture response status:", capture.status);

        if (capture.status !== "COMPLETED") {
            console.error("PayPal capture not completed:", capture);
            return NextResponse.json({
                error: "Payment not completed",
                status: capture.status
            }, { status: 400 });
        }

        const supabase = await createClient();
        const supabaseAdmin = createAdminClient();

        let userId: string;
        let userEmail: string;
        let isNewUser = false;

        // First, check if user is authenticated (returning customer who logged in)
        const { data: { user: authenticatedUser } } = await supabase.auth.getUser();
        console.log("Authenticated user:", authenticatedUser?.id || "none");

        if (authenticatedUser) {
            // User is logged in - use their ID
            userId = authenticatedUser.id;
            userEmail = authenticatedUser.email!;
            console.log("Using authenticated user:", userId);
        } else if (email) {
            // Anonymous checkout - check if email exists in profiles
            console.log("Checking for existing profile with email:", email);
            const { data: existingProfile, error: profileError } = await supabaseAdmin
                .from("profiles")
                .select("id, email")
                .eq("email", email)
                .single();

            if (profileError && profileError.code !== "PGRST116") {
                console.error("Error checking profile:", profileError);
            }

            if (existingProfile) {
                // Email exists - link order to existing account
                userId = existingProfile.id;
                userEmail = existingProfile.email;
                console.log("Found existing profile:", userId);
            } else {
                // New email - create a new user account
                console.log("Creating new user account for:", email);
                const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
                    email: email,
                    email_confirm: true,
                    user_metadata: {
                        created_via: "checkout"
                    }
                });

                if (createError || !newUser.user) {
                    console.error("Error creating user:", createError);
                    return NextResponse.json({
                        error: "Failed to create user account",
                        details: createError?.message
                    }, { status: 500 });
                }

                userId = newUser.user.id;
                userEmail = email;
                isNewUser = true;
                console.log("Created new user:", userId);

                // Generate password reset link and send via Brevo
                console.log("Generating password reset link for:", email);
                try {
                    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
                        type: "recovery",
                        email: email,
                        options: {
                            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://creatugc-app.vercel.app'}/auth/callback?type=recovery`
                        }
                    });

                    if (linkError) {
                        console.error("Error generating password reset link:", linkError);
                    } else if (linkData?.properties?.action_link) {
                        console.log("Password reset link generated successfully");

                        // Send email via Brevo
                        const { sendPasswordSetupEmail } = await import("@/lib/brevo");
                        await sendPasswordSetupEmail(email, linkData.properties.action_link);
                    } else {
                        console.error("No action_link in generateLink response:", linkData);
                    }
                } catch (resetError) {
                    console.error("Error in password reset flow:", resetError);
                    // Don't throw - order should still be created
                }
            }
        } else {
            console.error("No authenticated user and no email provided");
            return NextResponse.json({
                error: "No authenticated user and no email provided"
            }, { status: 400 });
        }

        // Get the captured amount (already TTC - no TVA calculation needed)
        const capturedAmount = Number(capture.purchase_units[0].payments.captures[0].amount.value);
        console.log("Captured amount (TTC):", capturedAmount);

        // Determine video count based on pack type
        const packVideoCounts: Record<string, number> = {
            solo: 1,
            starter: 4,
            pro: 5,
            agency: 10
        };
        const videoCount = packVideoCounts[briefData.pack_type] || 1;

        // Create order in database (order_number auto-generated by sequence)
        console.log("Creating order in database...");
        const { data: orderData, error: orderError } = await supabaseAdmin.from("orders").insert({
            user_id: userId,
            pack_type: briefData.pack_type,
            video_count: videoCount,
            amount_ht: capturedAmount, // Prices are already TTC, store as-is
            amount_ttc: capturedAmount,
            payment_method: "paypal",
            payment_id: orderID,
            paypal_order_id: orderID,
            paypal_capture_id: capture.purchase_units[0].payments.captures[0].id,
            payment_status: "paid",
            status: "processing",
            promo_code: briefData.promo_code || null,
            discount_amount: briefData.discount_amount || 0
        }).select().single();

        if (orderError) {
            console.error("Error creating order:", orderError);
            return NextResponse.json({
                error: "Failed to create order",
                details: orderError.message
            }, { status: 500 });
        }
        console.log("Order created:", orderData.id, orderData.order_number);

        // Update brief with order_id and status (only if brief already exists)
        if (briefData.id) {
            console.log("Updating existing brief:", briefData.id);
            const { data: updatedBrief, error: briefError } = await supabaseAdmin.from("video_briefs").update({
                order_id: orderData.id,
                status: "paid"
            }).eq("id", briefData.id).select().single();

            if (briefError) {
                console.error("Error updating brief:", briefError);
            } else if (updatedBrief) {
                // Create video placeholders in generated_videos
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
                try {
                    await triggerN8NWorkflow({
                        order: orderData,
                        brief: updatedBrief,
                        user: { id: userId, email: userEmail },
                        video_placeholders: generatedVideos || []
                    });
                    console.log("N8N workflow triggered");
                } catch (n8nError) {
                    console.error("N8N workflow error:", n8nError);
                }
            }
        }

        // Send confirmation email
        try {
            await sendOrderConfirmationEmail(userEmail, orderData.order_number);
            console.log("Confirmation email sent");
        } catch (emailError) {
            console.error("Error sending confirmation email:", emailError);
            // Don't throw - order is already created
        }

        const responseData = {
            success: true,
            status: "COMPLETED",
            orderId: orderData.id,
            dbOrderId: orderData.id,
            orderNumber: orderData.order_number,
            email: userEmail,
            isNewUser
        };

        console.log("=== CAPTURE ORDER SUCCESS ===");
        console.log("Sending response:", JSON.stringify(responseData));

        return NextResponse.json(responseData);

    } catch (error) {
        console.error("=== CAPTURE ORDER ERROR ===", error);
        return NextResponse.json({
            error: "Failed to capture order",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
