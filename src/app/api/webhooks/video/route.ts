import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    try {
        const { videoId, videoUrl, thumbnailUrl, status = "ready" } = await req.json();

        if (!videoId || !videoUrl) {
            return NextResponse.json({ error: "videoId and videoUrl are required" }, { status: 400 });
        }

        const supabase = await createClient();

        // Update the specific video record
        const { data, error } = await supabase
            .from("generated_videos")
            .update({
                video_url: videoUrl,
                thumbnail_url: thumbnailUrl,
                status: status,
            })
            .eq("id", videoId)
            .select()
            .single();

        if (error) {
            console.error("Error updating video delivery:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Optional: Check if all videos for this brief are ready to update brief status
        if (data.brief_id) {
            const { data: allVideos } = await supabase
                .from("generated_videos")
                .select("status")
                .eq("brief_id", data.brief_id);

            if (allVideos && allVideos.every(v => v.status === "ready")) {
                await supabase
                    .from("video_briefs")
                    .update({ status: "completed" })
                    .eq("id", data.brief_id);
            }
        }

        return NextResponse.json({ success: true, video: data });
    } catch (error) {
        console.error("Video Webhook Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
