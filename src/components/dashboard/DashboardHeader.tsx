"use client";

import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardHeader() {
    return (
        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-30">
            <h2 className="font-semibold text-lg text-gray-300">Tableau de bord</h2>

            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-background-dark" />
                </Button>

                <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-white">Utilisateur</p>
                        <p className="text-xs text-secondary font-medium">10 crédits</p>
                    </div>
                    <Avatar className="w-9 h-9 border border-white/10 shadow-lg">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">JD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
