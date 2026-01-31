import { fal } from "@fal-ai/client";

// This will be called on the server side (via API route or Server Action)
export async function generateVideo(prompt: string, aspect_ratio: "9:16" | "16:9" = "9:16", duration: string = "30") {
    try {
        const result = await fal.subscribe("fal-ai/sora-2/text-to-video/pro", {
            input: {
                prompt: prompt,
                aspect_ratio: aspect_ratio,
                resolution: "1080p",
                duration: duration === "30" ? "12" : "4"
            },
            logs: true,
            onQueueUpdate: (update) => {
                console.log("fal.ai Queue Update:", update.status);
            },
        });

        return result;
    } catch (error) {
        console.error("fal.ai Generation Error:", error);
        throw error;
    }
}
