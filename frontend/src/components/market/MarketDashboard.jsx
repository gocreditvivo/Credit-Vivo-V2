import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { sampleMarketAssets } from "@/lib/market/sampleAssets";
import { creditVivoBrandKit } from "@/lib/market/brandKit";
import { checkMarketingCompliance, preferredMarketingPhrases } from "@/lib/market/complianceRules";
import { animationTemplates, exportProfiles, imageTemplates, videoTemplates } from "@/lib/market/templates";
import CreativePreviewCard from "./CreativePreviewCard";
import AssetStatusBadge from "./AssetStatusBadge";
import { canPublish } from "@/lib/market/approvalWorkflow";
import { AlertTriangle, CalendarDays, CheckCircle2, Film, Image, Library, Megaphone, PlayCircle, ShieldCheck } from "lucide-react";

export function MarketDashboard({ mode = "dashboard" }) {
    const [selected, setSelected] = useState(sampleMarketAssets[0]);
    const [copy, setCopy] = useState("Find errors. Build disputes. Track progress.");
    const compliance = useMemo(() => checkMarketingCompliance(copy), [copy]);

    const filteredAssets = useMemo(() => {
        if (mode === "approved") return sampleMarketAssets.filter((asset) => asset.status === "Approved");
        if (mode === "review") return sampleMarketAssets.filter((asset) => asset.status !== "Approved");
        if (mode === "learning") return sampleMarketAssets;
        return sampleMarketAssets;
    }, [mode]);

    const stats = [
        ["Assets", sampleMarketAssets.length, <Library className="h-5 w-5" />],
        ["Needs Review", sampleMarketAssets.filter((a) => a.status === "Needs Review").length, <AlertTriangle className="h-5 w-5" />],
        ["Approved", sampleMarketAssets.filter((a) => a.status === "Approved").length, <CheckCircle2 className="h-5 w-5" />],
        ["Can Publish", sampleMarketAssets.filter(canPublish).length, <PlayCircle className="h-5 w-5" />],
    ];

    if (mode === "images") return <TemplateView title="Ad Image Templates" items={imageTemplates} icon={<Image className="h-5 w-5" />} />;
    if (mode === "animations") return <TemplateView title="Animation Templates" items={animationTemplates} icon={<Film className="h-5 w-5" />} />;
    if (mode === "videos") return <TemplateView title="Video Templates" items={videoTemplates} icon={<PlayCircle className="h-5 w-5" />} />;
    if (mode === "campaigns") return <CampaignView />;
    if (mode === "calendar") return <CalendarView />;
    if (mode === "brand") return <BrandKitView />;

    return (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div>
                <div className="grid gap-4 md:grid-cols-4">
                    {stats.map(([label, value, icon]) => (
                        <Card key={label} className="rounded-2xl border-slate-200">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-slate-500">{label}</p>
                                    <div className="text-[#047857]">{icon}</div>
                                </div>
                                <p className="font-display mt-2 text-3xl font-bold">{value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="mt-6 rounded-3xl border-slate-200">
                    <CardHeader>
                        <CardTitle className="font-display">Compliance copy checker</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea value={copy} onChange={(e) => setCopy(e.target.value)} className="min-h-[100px] rounded-xl" />
                        <div className={`mt-4 rounded-xl p-4 text-sm ${compliance.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                            {compliance.ok ? "Safe for review. No blocked marketing phrases found." : compliance.flags.map((flag) => flag.message).join("; ")}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {preferredMarketingPhrases.slice(0, 6).map((phrase) => <Badge key={phrase} variant="outline" className="rounded-full">{phrase}</Badge>)}
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredAssets.map((asset) => (
                        <CreativePreviewCard key={asset.asset_id} asset={asset} onSelect={setSelected} />
                    ))}
                </div>
            </div>

            <SelectedAssetPanel asset={selected} />
        </div>
    );
}

function SelectedAssetPanel({ asset }) {
    return (
        <Card className="rounded-3xl border-slate-200 lg:sticky lg:top-24 self-start">
            <CardHeader>
                <div className="flex items-start justify-between gap-3">
                    <CardTitle className="font-display text-xl">{asset.title}</CardTitle>
                    <AssetStatusBadge status={asset.status} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Storyboard</p>
                    <p className="font-display mt-2 text-2xl font-bold">{asset.storyboard.scenes.length} scenes</p>
                    <p className="mt-2 text-sm text-slate-300">Generated from Credit Vivo-owned scripts and dashboard concepts.</p>
                </div>
                <div className="mt-5 space-y-3">
                    {asset.storyboard.scenes.slice(0, 5).map((scene) => (
                        <div key={scene.scene} className="rounded-xl border border-slate-200 p-3">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>Scene {scene.scene}</span>
                                <span>{scene.time}</span>
                            </div>
                            <p className="mt-1 text-sm font-semibold">{scene.headline}</p>
                            <p className="mt-1 text-xs text-slate-500">{scene.visual}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-5 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
                    {creditVivoBrandKit.disclosure}
                </div>
            </CardContent>
        </Card>
    );
}

function TemplateView({ title, items, icon }) {
    return (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <Card key={item.id} className="rounded-2xl border-slate-200">
                    <CardContent className="p-5">
                        <div className="h-11 w-11 rounded-xl bg-emerald-50 text-[#047857] grid place-items-center">{icon}</div>
                        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-400">{title}</p>
                        <h3 className="font-display mt-2 text-xl font-bold">{item.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{item.format || item.size || item.motion}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function CampaignView() {
    const campaigns = [
        ["Free Weekly Reports", "Learning video + story ads", "Needs Review"],
        ["3-Bureau Comparison", "Reel + carousel + landing ad", "Draft"],
        ["Dispute Packet Education", "3-minute explainer", "Approved"],
    ];
    return <SimpleList title="Campaigns" icon={<Megaphone className="h-5 w-5" />} items={campaigns} />;
}

function CalendarView() {
    const items = [
        ["Monday", "Learning video: weekly report refresh", "Draft"],
        ["Wednesday", "Ad image: 3 reports may not match", "Needs Review"],
        ["Friday", "Short video: dispute packet basics", "Approved"],
    ];
    return <SimpleList title="Campaign Calendar" icon={<CalendarDays className="h-5 w-5" />} items={items} />;
}

function BrandKitView() {
    return (
        <Card className="mt-8 rounded-3xl border-slate-200">
            <CardHeader>
                <CardTitle className="font-display flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#047857]" /> Brand Kit</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    <Info label="Positioning" value={creditVivoBrandKit.positioning} />
                    <Info label="Slogan" value={creditVivoBrandKit.slogan} />
                    <Info label="Trust line" value={creditVivoBrandKit.trustLine} />
                    <Info label="Tone" value={creditVivoBrandKit.tone.join(", ")} />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                    {Object.entries(creditVivoBrandKit.colors).map(([name, color]) => (
                        <div key={name} className="rounded-xl border border-slate-200 bg-white p-3">
                            <div className="h-12 w-24 rounded-lg" style={{ backgroundColor: color }} />
                            <p className="mt-2 text-xs font-medium text-slate-600">{name}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function SimpleList({ title, icon, items }) {
    return (
        <Card className="mt-8 rounded-3xl border-slate-200">
            <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">{icon} {title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {items.map(([name, detail, status]) => (
                    <div key={name} className="rounded-xl border border-slate-200 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="font-semibold">{name}</p>
                            <p className="text-sm text-slate-500">{detail}</p>
                        </div>
                        <AssetStatusBadge status={status} />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function Info({ label, value }) {
    return (
        <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
            <p className="mt-2 font-medium">{value}</p>
        </div>
    );
}
