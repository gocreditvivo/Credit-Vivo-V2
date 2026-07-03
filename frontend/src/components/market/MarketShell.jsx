import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const links = [
    ["/market-ai", "Dashboard"],
    ["/market-ai/assets", "Assets"],
    ["/market-ai/images", "Images"],
    ["/market-ai/animations", "Animations"],
    ["/market-ai/videos", "Videos"],
    ["/market-ai/learning", "Learning"],
    ["/market-ai/campaigns", "Campaigns"],
    ["/market-ai/calendar", "Calendar"],
    ["/market-ai/review", "Review"],
    ["/market-ai/approved", "Approved"],
    ["/market-ai/settings/brand", "Brand Kit"],
];

export default function MarketShell({ children }) {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-10" data-testid="market-ai-page">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#047857]">Credit Vivo Market AI</p>
                        <h1 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight">
                            In-house creative studio
                        </h1>
                        <p className="mt-3 max-w-2xl text-slate-600">
                            Create learning videos, ad images, animations, storyboards, campaigns, and approval-gated brand assets.
                        </p>
                    </div>
                    <Link to="/admin">
                        <Button variant="outline" className="rounded-full h-11">
                            <Sparkles className="h-4 w-4 mr-2" /> Back End
                        </Button>
                    </Link>
                </div>

                <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
                    {links.map(([href, label]) => {
                        const active = location.pathname === href;
                        return (
                            <Link
                                key={href}
                                to={href}
                                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium ${
                                    active ? "bg-[#047857] text-white border-[#047857]" : "bg-white text-slate-600 border-slate-200 hover:text-slate-900"
                                }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>

                {children}
            </main>
        </div>
    );
}
