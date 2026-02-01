export async function sendEmail({ to, subject, htmlContent, templateId, params }: {
    to: { email: string; name?: string }[];
    subject?: string;
    htmlContent?: string;
    templateId?: number;
    params?: Record<string, unknown>;
}) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.error("BREVO_API_KEY is missing in environment variables");
        throw new Error("BREVO_API_KEY is not configured");
    }

    console.log("Sending email via Brevo to:", to.map(t => t.email).join(", "));

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": apiKey,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                sender: { name: "CreatUGC", email: "hello@creatugc.com" },
                to,
                subject,
                htmlContent,
                templateId,
                params
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Brevo API error:", response.status, data);
            throw new Error(`Brevo API error: ${response.status} - ${JSON.stringify(data)}`);
        }

        console.log("Brevo email sent successfully:", data);
        return data;
    } catch (error) {
        console.error("Brevo Email Error:", error);
        throw error;
    }
}

// Predefined email functions
export async function sendWelcomeEmail(email: string, name: string) {
    return sendEmail({
        to: [{ email, name }],
        templateId: 1, // Placeholder
        params: { FIRSTNAME: name }
    });
}

export async function sendOrderConfirmationEmail(email: string, orderNumber: string) {
    return sendEmail({
        to: [{ email }],
        templateId: 2, // Placeholder
        params: { ORDER_NUMBER: orderNumber }
    });
}

export async function sendVideoReadyEmail(email: string, videoUrl: string) {
    return sendEmail({
        to: [{ email }],
        templateId: 3, // Placeholder
        params: { VIDEO_URL: videoUrl }
    });
}

export async function sendPasswordSetupEmail(email: string, resetLink: string, orderNumber?: string) {
    console.log("Sending password setup email via Brevo to:", email);

    const htmlContent = `
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
                            <div style="width:80px;height:80px;background:rgba(34,197,94,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                                <span style="font-size:40px;">✓</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-bottom:10px;">
                            <h1 style="margin:0;font-size:24px;font-weight:bold;color:#fff;">
                                Bienvenue sur CreatUGC !
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-bottom:30px;">
                            <p style="margin:0;font-size:16px;color:#9ca3af;line-height:1.6;">
                                Merci pour votre commande${orderNumber ? ` n°${orderNumber}` : ''}.
                                <br>Cliquez sur le bouton ci-dessous pour créer votre mot de passe et accéder à votre espace client.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-bottom:30px;">
                            <a href="${resetLink}" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;font-weight:bold;font-size:16px;padding:16px 32px;border-radius:12px;text-decoration:none;">
                                Créer mon mot de passe →
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
                                Si vous n'avez pas effectué cette commande, ignorez cet email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    try {
        const result = await sendEmail({
            to: [{ email }],
            subject: "Bienvenue sur CreatUGC - Créez votre mot de passe",
            htmlContent
        });
        console.log("Password setup email sent successfully via Brevo:", result);
        return result;
    } catch (error) {
        console.error("Failed to send password setup email via Brevo:", error);
        throw error;
    }
}

