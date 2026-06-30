import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { reportsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UploadCloud, FileText, AlertTriangle, TrendingUp, ShieldCheck, Sparkles, Loader2, ChevronRight, FileDown } from "lucide-react";

const SEVERITY_STYLES = {
    high: "bg-red-50 text-red-700 border border-red-200",
    medium: "bg-amber-50 text-amber-700 border border-amber-200",
    low: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

const CATEGORY_LABEL = {
    inaccurate: "Inaccurate",
    outdated: "Outdated",
    unverifiable: "Unverifiable",
    duplicate: "Duplicate",
    unfair: "Unfair",
    identity: "Identity",
};

const STATUS_OPTIONS = ["recommended", "in_review", "submitted", "resolved", "dismissed"];

export default function Dashboard() {
    const { user } = useAuth();
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef(null);

    useEffect(() => {
        reportsApi.latest()
            .then((d) => setAnalysis(d))
            .finally(() => setLoading(false));
    }, []);

    const onPick = () => fileRef.current?.click();

    const onUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.name.toLowerCase().endsWith(".pdf")) {
            toast.error("Please upload a PDF file");
            return;
        }
        setUploading(true);
        try {
            const result = await reportsApi.upload(file);
            setAnalysis(result);
            toast.success(`Analysis complete — ${result.disputes.length} items flagged`);
        } catch (err) {
            toast.error(err.response?.data?.detail || "Upload failed");
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = "";
        }
    };

    const onChangeStatus = async (disputeId, newStatus) => {
        if (!analysis) return;
        try {
            await reportsApi.updateDispute(analysis.id, disputeId, newStatus);
            setAnalysis({
                ...analysis,
                disputes: analysis.disputes.map(d => d.id === disputeId ? { ...d, status: newStatus } : d),
            });
            toast.success("Status updated");
        } catch (err) {
            toast.error("Could not update status");
        }
    };

    const counts = analysis ? {
        total: analysis.disputes.length,
        high: analysis.disputes.filter(d => d.severity === "high").length,
        inReview: analysis.disputes.filter(d => d.status === "in_review" || d.status === "submitted").length,
        resolved: analysis.disputes.filter(d => d.status === "resolved").length,
    } : null;

    const progressPct = counts && counts.total > 0
        ? Math.round(((counts.resolved + counts.inReview) / counts.total) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-[#FCFBF9]">
            <Navbar />
            <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-10" data-testid="dashboard-main">
                {/* Greeting */}
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#047857]">Dashboard</p>
                        <h1 className="font-display mt-2 text-3xl md:text-4xl font-bold tracking-tight">Hi {user?.name?.split(" ")[0] || "there"} 👋</h1>
                        <p className="mt-1 text-slate-600">Here's the latest on your credit health.</p>
                    </div>
                    <input ref={fileRef} type="file" accept="application/pdf" onChange={onUpload} className="hidden" data-testid="upload-input" />
                    <Button onClick={onPick} disabled={uploading} className="rounded-full bg-[#047857] hover:bg-[#059669] text-white px-6 h-12" data-testid="upload-btn">
                        {uploading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing…</> : <><UploadCloud className="h-4 w-4 mr-2" /> Upload credit report</>}
                    </Button>
                </div>

                {loading ? (
                    <div className="mt-16 text-center text-slate-500"><Loader2 className="h-6 w-6 animate-spin inline mr-2" /> Loading…</div>
                ) : !analysis ? (
                    <EmptyState onPick={onPick} uploading={uploading} />
                ) : (
                    <>
                        {/* Stat row */}
                        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Est. score range" value={analysis.estimated_score_range} hint="AI estimate" />
                            <StatCard icon={<FileText className="h-5 w-5" />} label="Items reviewed" value={analysis.items_total || "—"} hint={`${analysis.items_disputable} disputable`} />
                            <StatCard icon={<AlertTriangle className="h-5 w-5" />} label="High severity" value={counts.high} hint="Prioritize first" />
                            <StatCard icon={<ShieldCheck className="h-5 w-5" />} label="Resolved" value={counts.resolved} hint={`${progressPct}% in motion`} />
                        </div>

                        {/* Summary card */}
                        <Card className="mt-6 rounded-3xl border-slate-200 shadow-sm">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-[#047857]" />
                                    <CardTitle className="font-display text-lg">AI summary</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-slate-700 leading-relaxed">{analysis.summary}</p>
                                <div className="mt-5">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Dispute progress</span>
                                        <span className="font-medium">{progressPct}%</span>
                                    </div>
                                    <Progress value={progressPct} className="h-2 mt-2" />
                                </div>
                                <div className="mt-6 grid md:grid-cols-2 gap-4">
                                    <FactorList title="Positive factors" tone="emerald" items={analysis.positive_factors} />
                                    <FactorList title="Risk factors" tone="amber" items={analysis.risk_factors} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Disputes */}
                        <div className="mt-10">
                            <h2 className="font-display text-2xl font-bold tracking-tight">Dispute recommendations</h2>
                            <p className="text-slate-600 mt-1">Review each item, approve or dismiss, and track status.</p>

                            <Tabs defaultValue="all" className="mt-6" data-testid="dispute-tabs">
                                <TabsList className="bg-slate-100 rounded-full p-1">
                                    <TabsTrigger value="all" className="rounded-full px-4">All ({analysis.disputes.length})</TabsTrigger>
                                    <TabsTrigger value="high" className="rounded-full px-4">High ({counts.high})</TabsTrigger>
                                    <TabsTrigger value="active" className="rounded-full px-4">Active ({counts.inReview})</TabsTrigger>
                                </TabsList>

                                <TabsContent value="all" className="mt-6">
                                    <DisputeList items={analysis.disputes.map(d => ({ ...d, _analysis_id: analysis.id }))} onChangeStatus={onChangeStatus} />
                                </TabsContent>
                                <TabsContent value="high" className="mt-6">
                                    <DisputeList items={analysis.disputes.filter(d => d.severity === "high").map(d => ({ ...d, _analysis_id: analysis.id }))} onChangeStatus={onChangeStatus} />
                                </TabsContent>
                                <TabsContent value="active" className="mt-6">
                                    <DisputeList items={analysis.disputes.filter(d => ["in_review", "submitted"].includes(d.status)).map(d => ({ ...d, _analysis_id: analysis.id }))} onChangeStatus={onChangeStatus} />
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div className="mt-12 rounded-3xl bg-emerald-50 border border-emerald-100 p-6 md:p-8">
                            <p className="text-sm text-slate-700">
                                <strong>Reminder:</strong> Credit Vivo helps you dispute items you believe are inaccurate, outdated, unverifiable, duplicate, or unfair. Results vary and no score change is guaranteed.
                            </p>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

function StatCard({ icon, label, value, hint }) {
    return (
        <div className="rounded-2xl bg-white border border-slate-200 p-5 hover:shadow-md transition-all" data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}>
            <div className="flex items-center gap-2 text-slate-500">
                <span className="text-[#047857]">{icon}</span>
                <span className="text-xs font-semibold tracking-wider uppercase">{label}</span>
            </div>
            <p className="font-display font-bold text-3xl mt-3 tabular-nums">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{hint}</p>
        </div>
    );
}

function FactorList({ title, tone, items }) {
    const dot = tone === "emerald" ? "bg-emerald-500" : "bg-amber-500";
    return (
        <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">{title}</p>
            <ul className="mt-3 space-y-2">
                {(items?.length ? items : ["No items identified."]).map((it, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                        <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${dot}`} />
                        {it}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function DisputeList({ items, onChangeStatus }) {
    const [genLoading, setGenLoading] = React.useState(null);
    const generateLetter = async (analysisId, disputeId) => {
        setGenLoading(disputeId);
        try {
            const r = await reportsApi.generateLetter ? null : null;
            const resp = await (await import("@/lib/api")).api.post(`/disputes/${analysisId}/${disputeId}/letter`);
            const blob = await (await fetch(`data:application/pdf;base64,${resp.data.pdf_b64}`)).blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = `dispute-${resp.data.creditor.replace(/\s/g, "_")}-${resp.data.bureau}.pdf`; a.click();
            URL.revokeObjectURL(url);
            toast.success("Dispute letter generated");
        } catch (e) {
            toast.error(e.response?.data?.detail || "Letter generation failed");
        } finally { setGenLoading(null); }
    };
    if (!items.length) return <p className="text-slate-500 text-sm py-12 text-center">No items in this view.</p>;
    return (
        <div className="space-y-3" data-testid="dispute-list">
            {items.map((d) => (
                <div key={d.id} className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 hover:shadow-md transition-all" data-testid={`dispute-${d.id}`}>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-display font-semibold text-lg">{d.creditor}</h3>
                                <Badge className={SEVERITY_STYLES[d.severity]}>{d.severity}</Badge>
                                <Badge variant="outline" className="rounded-full">{CATEGORY_LABEL[d.issue_category] || d.issue_category}</Badge>
                                <span className="text-xs text-slate-500">{d.account_type}</span>
                            </div>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">{d.summary}</p>
                            <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                                <ChevronRight className="h-4 w-4 text-[#047857] mt-0.5 shrink-0" />
                                <span><strong>Recommended:</strong> {d.recommended_action}</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {d.bureau?.map(b => <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">{b}</span>)}
                                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">{d.impact_estimate}</span>
                            </div>
                        </div>
                        <div className="shrink-0 flex flex-col gap-2">
                            <Select value={d.status} onValueChange={(v) => onChangeStatus(d.id, v)}>
                                <SelectTrigger className="w-44 rounded-full" data-testid={`status-select-${d.id}`}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_OPTIONS.map(s => (
                                        <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                onClick={() => generateLetter(d._analysis_id, d.id)}
                                disabled={genLoading === d.id}
                                size="sm"
                                variant="outline"
                                className="rounded-full text-xs"
                                data-testid={`gen-letter-${d.id}`}
                            >
                                {genLoading === d.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <><FileDown className="h-3 w-3 mr-1" /> Generate letter</>}
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmptyState({ onPick, uploading }) {
    return (
        <div className="mt-10 rounded-3xl bg-white border-2 border-dashed border-slate-300 p-10 md:p-16 text-center" data-testid="empty-state">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-50 grid place-items-center">
                <UploadCloud className="h-7 w-7 text-[#047857]" />
            </div>
            <h2 className="font-display mt-6 text-2xl md:text-3xl font-bold tracking-tight">Upload your credit report to get started</h2>
            <p className="mt-3 text-slate-600 max-w-md mx-auto">PDF from Experian, Equifax, TransUnion, or AnnualCreditReport.com works best. We'll analyze every line in about 60 seconds.</p>
            <Button onClick={onPick} disabled={uploading} className="mt-8 rounded-full bg-[#047857] hover:bg-[#059669] text-white px-7 h-12" data-testid="empty-upload-btn">
                {uploading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing…</> : <><UploadCloud className="h-4 w-4 mr-2" /> Choose PDF file</>}
            </Button>
            <p className="mt-4 text-xs text-slate-400">Your file is processed securely. We never sell your data.</p>
        </div>
    );
}
