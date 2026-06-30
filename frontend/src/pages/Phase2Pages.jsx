import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileText, UploadCloud, Trash2, Download, Send, Scale, Loader2, MessageCircle } from "lucide-react";

export function PricingCheckout() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null);

    const buy = async (lookup_key) => {
        if (!user) { navigate("/login"); return; }
        setLoading(lookup_key);
        try {
            const r = await api.post("/payments/checkout", { lookup_key, origin_url: window.location.origin });
            window.location.href = r.data.checkout_url;
        } catch (e) {
            toast.error(e.response?.data?.detail || "Checkout failed");
            setLoading(null);
        }
    };

    const tiers = [
        { name: "AI Boost", price: "31.99", key: "ai_boost_monthly", features: ["AI report analysis", "Up to 12 disputes/mo", "Progress dashboard"] },
        { name: "Credit Coach", price: "63.99", key: "credit_coach_monthly", highlight: true, features: ["Everything in AI Boost", "Unlimited disputes", "Certified credit coach"] },
        { name: "Legal Access Pro", price: "111.99", key: "legal_access_pro_monthly", features: ["Everything in Coach", "Attorney consultation network", "Identity theft response"] },
    ];

    return (
        <div className="min-h-screen bg-[#FCFBF9]">
            <Navbar />
            <main className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-10" data-testid="pricing-page">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#047857]">Pricing</p>
                <h1 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight">Choose your plan</h1>
                <p className="mt-4 text-slate-600 max-w-xl">Cancel anytime. Test card: 4242 4242 4242 4242, any future date, any CVC.</p>

                <div className="mt-10 grid md:grid-cols-3 gap-6">
                    {tiers.map(t => (
                        <div key={t.key} className={`rounded-3xl p-8 flex flex-col ${t.highlight ? "bg-slate-900 text-white shadow-2xl scale-[1.02]" : "bg-white border border-slate-200"}`} data-testid={`tier-${t.key}`}>
                            <h3 className="font-display text-2xl font-bold">{t.name}</h3>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="font-display text-5xl font-bold">${t.price}</span>
                                <span className={t.highlight ? "text-slate-400" : "text-slate-500"}>/month</span>
                            </div>
                            <ul className={`mt-6 space-y-2 text-sm flex-1 ${t.highlight ? "text-slate-200" : "text-slate-700"}`}>
                                {t.features.map(f => <li key={f}>✓ {f}</li>)}
                            </ul>
                            <Button onClick={() => buy(t.key)} disabled={loading === t.key} className={`mt-8 rounded-full py-6 ${t.highlight ? "bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold" : "bg-[#047857] hover:bg-[#059669] text-white"}`} data-testid={`buy-${t.key}`}>
                                {loading === t.key ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Redirecting…</> : "Subscribe"}
                            </Button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export function PaymentSuccess() {
    const [status, setStatus] = useState("pending");
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    useEffect(() => {
        let attempts = 0;
        const poll = async () => {
            attempts++;
            try {
                const r = await api.get(`/payments/status/${sessionId}`);
                if (r.data.payment_status === "paid") { setStatus("paid"); return; }
                if (attempts < 20) setTimeout(poll, 2000);
                else setStatus("timeout");
            } catch { setStatus("error"); }
        };
        if (sessionId) poll();
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-[#FCFBF9]">
            <Navbar />
            <div className="pt-32 max-w-xl mx-auto px-6 text-center" data-testid="payment-success">
                {status === "pending" && <><Loader2 className="h-10 w-10 animate-spin text-[#047857] mx-auto" /><p className="mt-4">Confirming payment…</p></>}
                {status === "paid" && (<>
                    <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 grid place-items-center"><span className="text-3xl">🎉</span></div>
                    <h1 className="font-display mt-6 text-3xl font-bold">Welcome to Credit Vivo!</h1>
                    <p className="mt-3 text-slate-600">Your subscription is active. Let's get started.</p>
                    <Link to="/dashboard"><Button className="mt-8 rounded-full bg-[#047857] hover:bg-[#059669] text-white px-7 h-12">Go to dashboard</Button></Link>
                </>)}
                {(status === "timeout" || status === "error") && <p className="mt-8 text-slate-600">Payment is being processed. <Link to="/dashboard" className="text-[#047857] underline">Check dashboard</Link></p>}
            </div>
        </div>
    );
}

export function PaymentCancel() {
    return (
        <div className="min-h-screen bg-[#FCFBF9]">
            <Navbar />
            <div className="pt-32 max-w-xl mx-auto px-6 text-center" data-testid="payment-cancel">
                <h1 className="font-display text-3xl font-bold">Checkout cancelled</h1>
                <p className="mt-3 text-slate-600">No charge was made. Come back anytime.</p>
                <Link to="/pricing"><Button className="mt-8 rounded-full bg-[#047857] hover:bg-[#059669] text-white px-7 h-12">View plans</Button></Link>
            </div>
        </div>
    );
}

export function Onboarding() {
    const navigate = useNavigate();
    const [goal, setGoal] = useState("");
    const [score, setScore] = useState("");
    const [situation, setSituation] = useState("");

    const submit = async () => {
        if (!goal || !score || situation.length < 10) { toast.error("Complete all fields"); return; }
        try {
            await api.post("/onboarding", { goal, current_score_range: score, situation });
            toast.success("Welcome aboard!");
            navigate("/dashboard");
        } catch (e) { toast.error("Failed to save"); }
    };

    return (
        <div className="min-h-screen bg-[#FCFBF9]">
            <Navbar />
            <main className="pt-28 max-w-2xl mx-auto px-6 pb-20" data-testid="onboarding-page">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#047857]">Quick setup</p>
                <h1 className="font-display mt-3 text-3xl font-bold">Tell us about your goals</h1>
                <p className="mt-2 text-slate-600">This helps your coach tailor recommendations.</p>

                <div className="mt-8 space-y-6">
                    <div>
                        <Label>Primary goal</Label>
                        <Select value={goal} onValueChange={setGoal}><SelectTrigger className="mt-2 rounded-xl h-12" data-testid="onb-goal"><SelectValue placeholder="Choose…" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="buy_home">Buy a home</SelectItem>
                                <SelectItem value="buy_car">Buy a car</SelectItem>
                                <SelectItem value="lower_rate">Lower interest rates</SelectItem>
                                <SelectItem value="rebuild">Rebuild after setback</SelectItem>
                                <SelectItem value="monitor">Just monitor</SelectItem>
                                <SelectItem value="other">Something else</SelectItem>
                            </SelectContent></Select>
                    </div>
                    <div>
                        <Label>Current score range</Label>
                        <Select value={score} onValueChange={setScore}><SelectTrigger className="mt-2 rounded-xl h-12" data-testid="onb-score"><SelectValue placeholder="Choose…" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="below_580">Below 580</SelectItem>
                                <SelectItem value="580_669">580–669</SelectItem>
                                <SelectItem value="670_739">670–739</SelectItem>
                                <SelectItem value="740_799">740–799</SelectItem>
                                <SelectItem value="800_plus">800+</SelectItem>
                                <SelectItem value="unknown">Not sure</SelectItem>
                            </SelectContent></Select>
                    </div>
                    <div>
                        <Label>Your situation (a few words)</Label>
                        <Textarea value={situation} onChange={(e) => setSituation(e.target.value)} className="mt-2 rounded-xl" placeholder="e.g. Some old collections, ID theft concerns…" data-testid="onb-situation" />
                    </div>
                    <Button onClick={submit} className="w-full rounded-full bg-[#047857] hover:bg-[#059669] text-white h-12" data-testid="onb-submit">Continue to dashboard</Button>
                </div>
            </main>
        </div>
    );
}

export function MemberHub() {
    return (
        <div className="min-h-screen bg-[#FCFBF9]">
            <Navbar />
            <main className="pt-24 pb-20 max-w-6xl mx-auto px-6 md:px-10" data-testid="hub-page">
                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Member tools</h1>
                <p className="text-slate-600 mt-1">Everything you need beyond the dispute dashboard.</p>

                <Tabs defaultValue="docs" className="mt-8">
                    <TabsList className="bg-slate-100 rounded-full p-1">
                        <TabsTrigger value="docs" className="rounded-full px-4" data-testid="tab-docs">Documents</TabsTrigger>
                        <TabsTrigger value="coach" className="rounded-full px-4" data-testid="tab-coach">Coach</TabsTrigger>
                        <TabsTrigger value="attorney" className="rounded-full px-4" data-testid="tab-attorney">Attorney</TabsTrigger>
                    </TabsList>
                    <TabsContent value="docs" className="mt-6"><DocsPanel /></TabsContent>
                    <TabsContent value="coach" className="mt-6"><CoachPanel /></TabsContent>
                    <TabsContent value="attorney" className="mt-6"><AttorneyPanel /></TabsContent>
                </Tabs>
            </main>
        </div>
    );
}

function DocsPanel() {
    const [docs, setDocs] = useState([]);
    const [label, setLabel] = useState("");
    const [uploading, setUploading] = useState(false);
    const inputRef = React.useRef(null);

    const load = () => api.get("/documents").then(r => setDocs(r.data));
    useEffect(() => { load(); }, []);

    const upload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!label) { toast.error("Add a label first"); e.target.value = ""; return; }
        const fd = new FormData(); fd.append("file", file); fd.append("label", label);
        setUploading(true);
        try {
            await api.post("/documents/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
            toast.success("Uploaded");
            setLabel(""); load();
        } catch (err) { toast.error(err.response?.data?.detail || "Upload failed"); }
        finally { setUploading(false); e.target.value = ""; }
    };

    const download = async (d) => {
        const r = await api.get(`/documents/${d.id}/download`);
        const blob = await (await fetch(`data:${r.data.content_type};base64,${r.data.data_b64}`)).blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = r.data.filename; a.click();
        URL.revokeObjectURL(url);
    };

    const remove = async (d) => { await api.delete(`/documents/${d.id}`); toast.success("Deleted"); load(); };

    return (
        <Card className="rounded-3xl border-slate-200" data-testid="docs-panel">
            <CardHeader><CardTitle className="font-display">Document center</CardTitle></CardHeader>
            <CardContent>
                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <Label>Label</Label>
                        <Input value={label} onChange={e => setLabel(e.target.value)} placeholder="ID copy, proof of payment…" className="mt-2 rounded-xl h-11" data-testid="doc-label" />
                    </div>
                    <input ref={inputRef} type="file" onChange={upload} className="hidden" data-testid="doc-input" />
                    <Button onClick={() => inputRef.current?.click()} disabled={uploading} className="rounded-full bg-[#047857] hover:bg-[#059669] text-white h-11 px-5" data-testid="doc-upload-btn">
                        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><UploadCloud className="h-4 w-4 mr-2" /> Upload</>}
                    </Button>
                </div>
                <div className="mt-6 space-y-2">
                    {docs.length === 0 && <p className="text-sm text-slate-500 py-6 text-center">No documents yet.</p>}
                    {docs.map(d => (
                        <div key={d.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3" data-testid={`doc-${d.id}`}>
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-[#047857]" />
                                <div>
                                    <p className="text-sm font-medium">{d.label}</p>
                                    <p className="text-xs text-slate-500">{d.filename} · {Math.round(d.size / 1024)} KB</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="sm" onClick={() => download(d)}><Download className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => remove(d)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function CoachPanel() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);

    const load = () => api.get("/coaching/messages").then(r => setMessages(r.data));
    useEffect(() => { load(); }, []);

    const send = async () => {
        if (!text.trim()) return;
        setSending(true);
        try {
            await api.post("/coaching/messages", { text });
            setText(""); load();
        } catch (e) { toast.error("Failed to send"); }
        finally { setSending(false); }
    };

    return (
        <Card className="rounded-3xl border-slate-200" data-testid="coach-panel">
            <CardHeader><CardTitle className="font-display flex items-center gap-2"><MessageCircle className="h-5 w-5 text-[#047857]" /> Chat with Avery, your credit coach</CardTitle></CardHeader>
            <CardContent>
                <div className="max-h-96 overflow-y-auto space-y-3 pr-2" data-testid="coach-messages">
                    {messages.length === 0 && <p className="text-sm text-slate-500 text-center py-12">Say hi to Avery — ask anything about credit, disputes, or your report.</p>}
                    {messages.map(m => (
                        <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-[#047857] text-white" : "bg-slate-100 text-slate-800"}`}>
                                <p className="text-sm whitespace-pre-wrap">{m.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex gap-2">
                    <Input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message…" className="rounded-xl h-12" data-testid="coach-input" />
                    <Button onClick={send} disabled={sending} className="rounded-full bg-[#047857] hover:bg-[#059669] text-white h-12 px-5" data-testid="coach-send">
                        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function AttorneyPanel() {
    const [requests, setRequests] = useState([]);
    const [form, setForm] = useState({ issue_type: "", description: "", urgency: "medium", contact_phone: "" });
    const [submitting, setSubmitting] = useState(false);

    const load = () => api.get("/attorney/requests").then(r => setRequests(r.data));
    useEffect(() => { load(); }, []);

    const submit = async () => {
        if (!form.issue_type || form.description.length < 20) { toast.error("Pick an issue and add 20+ chars"); return; }
        setSubmitting(true);
        try {
            await api.post("/attorney/requests", form);
            toast.success("Request submitted — we'll contact you within 1 business day.");
            setForm({ issue_type: "", description: "", urgency: "medium", contact_phone: "" });
            load();
        } catch (e) { toast.error("Submit failed"); }
        finally { setSubmitting(false); }
    };

    return (
        <Card className="rounded-3xl border-slate-200" data-testid="attorney-panel">
            <CardHeader><CardTitle className="font-display flex items-center gap-2"><Scale className="h-5 w-5 text-[#047857]" /> Request attorney escalation</CardTitle></CardHeader>
            <CardContent>
                <p className="text-sm text-slate-600 mb-5">For identity theft, mixed files, FCRA violations, or threats of legal action. Available on Legal Access Pro.</p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label>Issue type</Label>
                        <Select value={form.issue_type} onValueChange={v => setForm({ ...form, issue_type: v })}><SelectTrigger className="mt-2 rounded-xl h-11" data-testid="atty-type"><SelectValue placeholder="Select…" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="identity_theft">Identity theft</SelectItem>
                                <SelectItem value="mixed_file">Mixed file</SelectItem>
                                <SelectItem value="fcra_violation">FCRA violation</SelectItem>
                                <SelectItem value="lawsuit_threat">Lawsuit threat</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent></Select>
                    </div>
                    <div>
                        <Label>Urgency</Label>
                        <Select value={form.urgency} onValueChange={v => setForm({ ...form, urgency: v })}><SelectTrigger className="mt-2 rounded-xl h-11" data-testid="atty-urgency"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent></Select>
                    </div>
                </div>
                <div className="mt-4">
                    <Label>Description</Label>
                    <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-2 rounded-xl min-h-[120px]" placeholder="What happened? Be specific." data-testid="atty-desc" />
                </div>
                <div className="mt-4">
                    <Label>Best contact phone (optional)</Label>
                    <Input value={form.contact_phone} onChange={e => setForm({ ...form, contact_phone: e.target.value })} className="mt-2 rounded-xl h-11" data-testid="atty-phone" />
                </div>
                <Button onClick={submit} disabled={submitting} className="mt-5 rounded-full bg-[#047857] hover:bg-[#059669] text-white h-11 px-6" data-testid="atty-submit">
                    {submitting ? "Submitting…" : "Submit request"}
                </Button>

                <div className="mt-8 space-y-2">
                    {requests.map(r => (
                        <div key={r.id} className="rounded-xl border border-slate-200 p-3 flex justify-between" data-testid={`atty-req-${r.id}`}>
                            <div>
                                <p className="text-sm font-medium">{r.issue_type.replace(/_/g, " ")} · {r.urgency}</p>
                                <p className="text-xs text-slate-500">{r.description.slice(0, 80)}…</p>
                            </div>
                            <Badge>{r.status.replace(/_/g, " ")}</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export function AdminPage() {
    const [stats, setStats] = useState(null);
    const [reqs, setReqs] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("/admin/stats").then(r => setStats(r.data)).catch(() => toast.error("Admin only"));
        api.get("/admin/attorney-requests").then(r => setReqs(r.data)).catch(() => {});
        api.get("/admin/users").then(r => setUsers(r.data)).catch(() => {});
    }, []);

    const setStatus = async (id, status) => {
        await api.patch(`/admin/attorney-requests/${id}`, { status });
        setReqs(reqs.map(r => r.id === id ? { ...r, status } : r));
    };

    return (
        <div className="min-h-screen bg-[#FCFBF9]">
            <Navbar />
            <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-10" data-testid="admin-page">
                <h1 className="font-display text-3xl font-bold tracking-tight">Admin</h1>
                {!stats ? <p className="mt-10 text-slate-500">Loading…</p> : (
                    <>
                        <div className="mt-8 grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[["Users", stats.users], ["Analyses", stats.analyses], ["Letters", stats.letters], ["Active subs", stats.active_subscriptions], ["Pending atty", stats.attorney_requests_pending], ["Revenue", `$${stats.revenue_usd}`]].map(([l, v]) => (
                                <div key={l} className="rounded-2xl bg-white border border-slate-200 p-5">
                                    <p className="text-xs uppercase tracking-wider text-slate-500">{l}</p>
                                    <p className="font-display font-bold text-2xl mt-2">{v}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="font-display text-xl font-bold mt-12">Attorney requests</h2>
                        <div className="mt-4 space-y-2">
                            {reqs.map(r => (
                                <div key={r.id} className="rounded-xl bg-white border border-slate-200 p-4 flex justify-between items-center">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium">{r.user_name} · {r.issue_type.replace(/_/g, " ")} · <span className="text-amber-600">{r.urgency}</span></p>
                                        <p className="text-xs text-slate-500 truncate">{r.description}</p>
                                    </div>
                                    <Select value={r.status} onValueChange={(v) => setStatus(r.id, v)}>
                                        <SelectTrigger className="w-44 rounded-full"><SelectValue /></SelectTrigger>
                                        <SelectContent>{["pending_review", "assigned", "in_progress", "resolved", "declined"].map(s => <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                            ))}
                        </div>

                        <h2 className="font-display text-xl font-bold mt-12">Users ({users.length})</h2>
                        <div className="mt-4 rounded-2xl bg-white border border-slate-200 divide-y">
                            {users.slice(0, 20).map(u => (
                                <div key={u.id} className="flex justify-between p-4">
                                    <div><p className="font-medium text-sm">{u.name}</p><p className="text-xs text-slate-500">{u.email}</p></div>
                                    <Badge>{u.subscription_tier || "free"}</Badge>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
