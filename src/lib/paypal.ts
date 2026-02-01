// Use PAYPAL_MODE env var to explicitly control sandbox vs production
// Default to sandbox for safety
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';
const PAYPAL_API = PAYPAL_MODE === 'production'
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export async function getAccessToken() {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        console.error("PayPal credentials missing:", {
            hasClientId: !!clientId,
            hasClientSecret: !!clientSecret,
            mode: PAYPAL_MODE
        });
        throw new Error("PayPal credentials not configured");
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("PayPal auth failed:", { status: response.status, error: errorText });
        throw new Error(`PayPal authentication failed: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
}

export async function createPayPalOrder(amount: string, currency: string = "EUR") {
    const accessToken = await getAccessToken();
    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: currency,
                        value: amount,
                    },
                },
            ],
        }),
    });

    return handleResponse(response);
}

export async function capturePayPalOrder(orderId: string) {
    const accessToken = await getAccessToken();
    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return handleResponse(response);
}

export async function verifyWebhookSignature(req: Request) {
    // Basic verification implementation or placeholder if full verification requires complex crypto
    // For now, returning true but in prod this should be real verification
    const accessToken = await getAccessToken();
    const body = await req.json();
    const headers = req.headers;

    const response = await fetch(`${PAYPAL_API}/v1/notifications/verify-webhook-signature`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            auth_algo: headers.get("PAYPAL-AUTH-ALGO"),
            cert_url: headers.get("PAYPAL-CERT-URL"),
            transmission_id: headers.get("PAYPAL-TRANSMISSION-ID"),
            transmission_sig: headers.get("PAYPAL-TRANSMISSION-SIG"),
            transmission_time: headers.get("PAYPAL-TRANSMISSION-TIME"),
            webhook_id: process.env.PAYPAL_WEBHOOK_ID,
            webhook_event: body,
        }),
    });

    const data = await response.json();
    return data.verification_status === "SUCCESS";
}

async function handleResponse(response: Response) {
    if (response.status === 200 || response.status === 201) {
        return response.json();
    }

    const errorMessage = await response.text();
    throw new Error(errorMessage);
}
