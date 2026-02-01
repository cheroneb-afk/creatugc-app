import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
    const supabaseAdmin = createAdminClient();

    try {
        const { email } = await request.json();

        console.log("Forgot password request for:", email);

        if (!email) {
            return NextResponse.json({ success: false, error: "Email required" }, { status: 400 });
        }

        // Check if user exists in profiles
        const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("id")
            .eq("email", email)
            .single();

        if (!profile) {
            // Don't reveal if email exists or not (security)
            console.log("Email not found in profiles, returning success anyway");
            return NextResponse.json({ success: true });
        }

        // Generate reset link (without sending email via Supabase)
        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
            type: "recovery",
            email: email,
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://creatugc-app.vercel.app"}/auth/callback?type=recovery`
            }
        });

        if (linkError) {
            console.error("Generate link error:", linkError);
            return NextResponse.json({ success: false, error: "Failed to generate link" }, { status: 500 });
        }

        const resetLink = linkData?.properties?.action_link;
        if (!resetLink) {
            console.error("No action_link in response");
            return NextResponse.json({ success: false, error: "Failed to generate link" }, { status: 500 });
        }

        console.log("Reset link generated");

        // Send email via Brevo
        const senderEmail = process.env.BREVO_SENDER_EMAIL || "hello@creatugc.com";

        const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "api-key": process.env.BREVO_API_KEY!,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: {
                    name: "CreatUGC",
                    email: senderEmail
                },
                to: [{ email: email }],
                subject: "Réinitialisez votre mot de passe - CreatUGC",
                htmlContent: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:500px;background:linear-gradient(135deg,rgba(139,92,246,0.1),rgba(236,72,153,0.05));border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:40px;">
                    <tr>
                        <td align="center" style="padding-bottom:30px;">
                            <div style="font-size:28px;font-weight:bold;color:#fff;">
                                Creat<span style="color:#8b5cf6;">UGC</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-bottom:20px;">
                            <div style="width:80px;height:80px;background:rgba(139,92,246,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                                <span style="font-size:40px;">🔑</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-bottom:10px;">
                            <h1 style="margin:0;font-size:24px;font-weight:bold;color:#fff;">
                                Réinitialiser votre mot de passe
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-bottom:30px;">
                            <p style="margin:0;font-size:16px;color:#9ca3af;line-height:1.6;">
                                Vous avez demandé à réinitialiser votre mot de passe.
                                <br>Cliquez sur le bouton ci-dessous pour en créer un nouveau.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-bottom:30px;">
                            <a href="${resetLink}" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;font-weight:bold;font-size:16px;padding:16px 32px;border-radius:12px;text-decoration:none;">
                                Réinitialiser mon mot de passe →
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-bottom:20px;">
                            <p style="margin:0;font-size:14px;color:#6b7280;">
                                Ce lien expire dans 24 heures.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="border-top:1px solid rgba(255,255,255,0.1);padding-top:20px;">
                            <p style="margin:0;font-size:12px;color:#6b7280;text-align:center;">
                                Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
                `
            }),
        });

        if (!brevoResponse.ok) {
            const errorText = await brevoResponse.text();
            console.error("Brevo error:", brevoResponse.status, errorText);
            return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
        }

        const brevoResult = await brevoResponse.json();
        console.log("Password reset email sent via Brevo:", brevoResult);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Server error"
        }, { status: 500 });
    }
}
