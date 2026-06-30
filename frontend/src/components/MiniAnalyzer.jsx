import React, { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";

export default function MiniAnalyzer() {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const run = async () => {
        if (text.trim().length < 20) { toast.error("Add a bit more detail (20+ characters)"); return; }
        setLoading(true);
        try {
            const r = await api.post("/mini-analysis", { text });
            setResult(r.data);
        } catch (e) {
            toast.error(e.response?.data?.detail || "Analysis failed");
        } finally { setLoading(false); }
    };

    return (
        <section className="py-20 md:py-28 bg-white border-y border-slate-100" data-testid="mini-analyzer">
            <div className="max-w-5xl mx-auto px-6 md:px-10">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#047857]">Try it free · no signup</p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">See what our AI would flag, right now.</h2>
                        <p className="mt-4 text-slate-600 text-lg">Paste a few items from your credit report. Our AI will instantly tell you which look disputable — and why.</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 md:p-8">
                        <Textarea
                            value={text} onChange={(e) => setText(e.target.value)}
                            placeholder="e.g. Collection from Midland Funding $890, opened March 2017. Capital One credit card balance shows $4,250 on Experian but $2,100 on Equifax. Civil judgment from 2014..."
                            className="min-h-[140px] rounded-xl border-slate-300" data-testid="mini-input"
                        />
                        <Button onClick={run} disabled={loading} className="mt-4 w-full rounded-full bg-[#047857] hover:bg-[#059669] text-white h-12" data-testid="mini-submit">
                            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing…</> : <><Sparkles className="h-4 w-4 mr-2" /> Run free AI analysis</>}
                        </Button>
                        {result && (
                            <div className="mt-5 space-y-3" data-testid="mini-result">
                                <p className="text-sm text-slate-700">{result.summary}</p>
                                {result.flags?.map((f, i) => (
                                    <div key={i} className="rounded-xl bg-white border border-slate-200 p-4">
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-amber-600" />
                                            <p className="font-medium text-sm">{f.item}</p>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1"><strong>{f.issue}</strong> — {f.why}</p>
                                        <p className="text-xs text-[#047857] mt-1">→ {f.action}</p>
                                    </div>
                                ))}
                                <p className="text-xs text-slate-400 pt-2">Want the full picture? Upload your report inside Credit Vivo.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
