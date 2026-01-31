import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { triggerN8NWorkflow } from "@/lib/n8n";

export async function POST(req: Request) {
    try {
        const { briefId, orderId } = await req.json();

        if (!briefId || !orderId) {
            return NextResponse.json({ error: "briefId and orderId are required" }, { status: 400 });
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. Fetch the brief and order to ensure they belong to the user and are consistent
        const { data: brief, error: briefError } = await supabase
            .from("video_briefs")
            .select("*")
            .eq("id", briefId)
            .eq("user_id", user.id)
            .single();

        if (briefError || !brief) {
            return NextResponse.json({ error: "Brief not found" }, { status: 404 });
        }

        const { data: order, error: orderError } = await supabase
            .from("orders")
            .select("*")
            .eq("id", orderId)
            .eq("user_id", user.id)
            .single();

        if (orderError || !order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // 2. Initialize video placeholders in generated_videos
        // This logic is now moved here from capture-order for the payment-first flow
        const videoCount = order.video_count || 1;
        const placeholders = Array.from({ length: videoCount }).map(() => ({
            user_id: user.id,
            brief_id: brief.id,
            status: "processing",
            format: brief.formats?.[0] || "9:16",
        }));

        const { data: generatedVideos, error: genError } = await supabase
            .from("generated_videos")
            .insert(placeholders)
            .select();

        if (genError) {
            console.error("Error creating video placeholders:", genError);
            // We continue anyway but it might break n8n if it expects these IDs
        }

        // 3. Trigger n8n workflow for video generation
        await triggerN8NWorkflow({
            order: order,
            brief: brief,
            user: user,
            video_placeholders: generatedVideos || []
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Brief Submit Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
