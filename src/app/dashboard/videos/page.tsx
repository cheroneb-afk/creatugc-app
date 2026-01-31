"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Video, Search, Filter, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VideoBrief {
    id: string;
    product_name: string;
    status: string;
    video_urls: string[];
    created_at: string;
}

export default function VideosPage() {
    const [videos, setVideos] = useState<VideoBrief[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchVideos() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data } = await supabase
                    .from("video_briefs")
                    .select("*")
                    .eq("user_id", user.id)
                    .not("video_urls", "is", null)
                    .order("created_at", { ascending: false });

                if (data) setVideos(data);
            }
            setLoading(false);
        }

        fetchVideos();
    }, []);

    const filteredVideos = videos.filter(v =>
        v.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Ma Vidéothèque</h1>
                    <p className="text-gray-400">Retrouvez toutes vos vidéos générées par IA.</p>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                            placeholder="Rechercher une vidéo..."
                            className="pl-10 bg-white/5 border-white/10 w-[250px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon" className="border-white/10">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {filteredVideos.length === 0 ? (
                <div className="glass-card rounded-3xl p-12 text-center border-white/5">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Video className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Aucune vidéo pour le moment</h3>
                    <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                        Commandez votre première vidéo pour commencer à remplir votre bibliothèque.
                    </p>
                    <Button onClick={() => window.location.href = "/dashboard/new-brief"}>
                        Créer une vidéo
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video) => (
                        <div key={video.id} className="glass-card group rounded-3xl overflow-hidden border-white/5 hover:border-primary/20 transition-all duration-300">
                            {/* Video Preview / Placeholder */}
                            <div className="aspect-[9/16] relative bg-black/40 overflow-hidden">
                                {video.video_urls && video.video_urls[0] ? (
                                    <video
                                        src={video.video_urls[0]}
                                        className="w-full h-full object-cover"
                                        poster="/video-placeholder.jpg" // Add a real placeholder if available
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Video className="w-12 h-12 text-gray-700" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <Button size="icon" variant="secondary" className="rounded-full">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" className="rounded-full">
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold truncate">{video.product_name}</h4>
                                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                                        {video.status}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Créée le {new Date(video.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
