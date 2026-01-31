export async function triggerN8NWorkflow(payload: unknown) {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
        console.warn("N8N_WEBHOOK_URL is missing, skipping workflow trigger");
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        return await response.json();
    } catch (error) {
        console.error("N8N Workflow Trigger Error:", error);
    }
}
