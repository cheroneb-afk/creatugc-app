"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Video, Search, Filter, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface GeneratedVideo {
    id: string;
    brief_id: string;
    video_url: string | null;
    thumbnail_url: string | null;
    status: string;
    created_at: string;
    video_briefs: {
        product_name: string;
    };
}

export default function VideosPage() {
    const [videos, setVideos] = useState<GeneratedVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchVideos() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data, error } = await supabase
                    .from("generated_videos")
                    .select(`
                        *,
                        video_briefs (
                            product_name
                        )
                    `)
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error("Error fetching videos:", error);
                } else if (data) {
                    setVideos(data as unknown as GeneratedVideo[]);
                }
            }
            setLoading(false);
        }

        fetchVideos();
    }, []);

    const filteredVideos = videos.filter(v =>
        v.video_briefs?.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
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
                                {video.status === "processing" ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-primary/5">
                                        <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
                                        <p className="text-sm font-bold text-primary animate-pulse">Génération...</p>
                                    </div>
                                ) : video.video_url ? (
                                    <video
                                        src={video.video_url}
                                        className="w-full h-full object-cover"
                                        poster={video.thumbnail_url || "/video-placeholder.jpg"}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Video className="w-12 h-12 text-gray-700" />
                                    </div>
                                )}

                                {video.status === "ready" && video.video_url && (
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <a href={video.video_url} download target="_blank" rel="noopener noreferrer">
                                            <Button size="icon" variant="secondary" className="rounded-full">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </a>
                                        <Link href={video.video_url} target="_blank">
                                            <Button size="icon" className="rounded-full">
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold truncate">{video.video_briefs?.product_name || "Produit sans nom"}</h4>
                                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${video.status === 'ready' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'
                                        }`}>
                                        {video.status === 'ready' ? 'Prêt' : 'En cours'}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {new Date(video.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
