export async function sendEmail({ to, subject, htmlContent, templateId, params }: {
    to: { email: string; name?: string }[];
    subject?: string;
    htmlContent?: string;
    templateId?: number;
    params?: Record<string, unknown>;
}) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.error("BREVO_API_KEY is missing");
        return;
    }

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
