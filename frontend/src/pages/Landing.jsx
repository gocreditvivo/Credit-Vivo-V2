import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Check, ShieldCheck, Scale, Bot, GraduationCap, FileSearch, ArrowRight, Star, Sparkles } from "lucide-react";
import MiniAnalyzer from "@/components/MiniAnalyzer";

const HERO_IMG = "https://images.unsplash.com/photo-1606932250069-62f395a08602?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMG5ldyUyMGhvbWUlMjBicmlnaHR8ZW58MHx8fHwxNzgyNzg5NDY2fDA&ixlib=rb-4.1.0&q=85";
const COACH_IMG = "https://images.unsplash.com/photo-1653762372551-3b65eed880ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBsb29raW5nJTIwYXQlMjBwaG9uZSUyMHNtaWxpbmclMjBicmlnaHQlMjBjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTc4Mjc4OTQ2Nnww&ixlib=rb-4.1.0&q=85";
const T1 = "https://images.pexels.com/photos/12311581/pexels-photo-12311581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const T2 = "https://images.pexels.com/photos/30468636/pexels-photo-30468636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const T3 = "https://images.unsplash.com/photo-1758613654360-45f1ff78c0cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG5ldXRyYWwlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc4Mjc4OTQ2Nnww&ixlib=rb-4.1.0&q=85";

export default function Landing() {
    return (
        <div className="min-h-screen bg-[#FCFBF9] text-slate-900">
            <Navbar />

            {/* HERO */}
            <section className="pt-32 md:pt-40 pb-20 md:pb-28 relative overflow-hidden">
                <div className="absolute inset-0 cv-grain opacity-60 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12 items-center relative">
                    <div className="lg:col-span-7 cv-fade-up">
                        <Badge className="bg-[#D1FAE5] text-[#047857] hover:bg-[#D1FAE5] border-0 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                            AI-powered credit repair
                        </Badge>
                        <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                            Dispute what doesn't belong. <span className="text-[#047857]">Reclaim your credit.</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
                            Credit Vivo combines AI Credit Boost automation, certified coaching, and attorney
                            access to help you challenge inaccurate, outdated, unverifiable, or unfair items on
                            your credit report — without the guesswork.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <Link to="/register" data-testid="hero-cta-start">
                                <Button className="rounded-full bg-[#047857] hover:bg-[#059669] text-white px-7 py-6 text-base font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                    Start free analysis <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <a href="#how" data-testid="hero-cta-how">
                                <Button variant="outline" className="rounded-full border-2 border-slate-200 px-7 py-6 text-base font-medium hover:bg-white">
                                    See how it works
                                </Button>
                            </a>
                        </div>
                        <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#047857]" /> FCRA-aligned</div>
                            <div className="flex items-center gap-1.5"><Bot className="h-4 w-4 text-[#047857]" /> AI dispute engine</div>
                            <div className="flex items-center gap-1.5"><Scale className="h-4 w-4 text-[#047857]" /> Attorney access</div>
                        </div>
                    </div>

                    {/* Dashboard preview card */}
                    <div className="lg:col-span-5 cv-fade-up" style={{ animationDelay: ".15s" }}>
                        <div className="relative">
                            <div className="absolute -inset-6 bg-gradient-to-br from-[#D1FAE5] to-transparent rounded-[2rem] blur-2xl opacity-70" />
                            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl p-6" data-testid="hero-preview-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">Your Credit Health</p>
                                        <p className="font-display text-5xl font-bold mt-2 tabular-nums">684<span className="text-xl text-slate-400 font-medium">/850</span></p>
                                    </div>
                                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">+38 last 90d</Badge>
                                </div>
                                <div className="mt-5 h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#047857] to-emerald-400" style={{ width: "72%" }} />
                                </div>
                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    {[{ l: "Disputable", v: "7" }, { l: "In review", v: "3" }, { l: "Resolved", v: "12" }].map((s, i) => (
                                        <div key={i} className="rounded-xl bg-slate-50 p-3">
                                            <p className="text-xs text-slate-500">{s.l}</p>
                                            <p className="font-display font-bold text-2xl mt-1">{s.v}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-5 space-y-2">
                                    {[
                                        { c: "Capital One", t: "Inaccurate balance", s: "high" },
                                        { c: "Midland Funding", t: "Unverifiable collection", s: "medium" },
                                    ].map((d, i) => (
                                        <div key={i} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                                            <div>
                                                <p className="font-medium text-sm">{d.c}</p>
                                                <p className="text-xs text-slate-500">{d.t}</p>
                                            </div>
                                            <Badge className={d.s === "high" ? "bg-red-50 text-red-700 border border-red-200" : "bg-amber-50 text-amber-700 border border-amber-200"}>
                                                {d.s}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MINI ANALYZER */}
            <MiniAnalyzer />

            {/* BENEFITS / Bento */}
            <section id="why" className="py-20 md:py-28 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#047857]">Why Credit Vivo</p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Built for real outcomes — not promises.</h2>
                        <p className="mt-4 text-slate-600 text-lg">A modern credit repair experience that pairs intelligent automation with human expertise where it matters most.</p>
                    </div>

                    <div className="mt-12 grid md:grid-cols-12 gap-6">
                        <div className="md:col-span-7 rounded-3xl bg-slate-900 text-white p-8 md:p-10 relative overflow-hidden">
                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
                            <Bot className="h-8 w-8 text-emerald-400" />
                            <h3 className="font-display mt-6 text-2xl md:text-3xl font-bold leading-snug">AI Credit Boost reads your report like a seasoned analyst.</h3>
                            <p className="mt-4 text-slate-300 max-w-md">Our engine pinpoints questionable items, classifies them under FCRA categories, and recommends the precise dispute strategy.</p>
                            <ul className="mt-6 space-y-2 text-sm text-slate-300">
                                {["Inaccurate balances & dates", "Outdated negative items", "Unverifiable collections", "Duplicate accounts"].map((x) => (
                                    <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" /> {x}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:col-span-5 rounded-3xl bg-emerald-50 p-8 md:p-10">
                            <GraduationCap className="h-8 w-8 text-[#047857]" />
                            <h3 className="font-display mt-6 text-2xl font-bold">Coaching, not call centers.</h3>
                            <p className="mt-3 text-slate-700">Certified credit coaches who reply in plain English. No upsells, no scripts.</p>
                            <img src={COACH_IMG} alt="Coach" className="mt-6 w-full h-40 object-cover rounded-2xl" />
                        </div>
                        <div className="md:col-span-5 rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
                            <Scale className="h-8 w-8 text-[#047857]" />
                            <h3 className="font-display mt-6 text-2xl font-bold">Attorney access when stakes get real.</h3>
                            <p className="mt-3 text-slate-600">Escalate identity theft, mixed files, or FCRA violations to a licensed consumer attorney in our network.</p>
                        </div>
                        <div className="md:col-span-7 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-slate-200 p-8 md:p-10">
                            <FileSearch className="h-8 w-8 text-[#047857]" />
                            <h3 className="font-display mt-6 text-2xl md:text-3xl font-bold">Track every dispute, every letter, every win.</h3>
                            <p className="mt-3 text-slate-600 max-w-xl">A clean progress dashboard with timeline, status, and document history — so you always know what's happening.</p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {["Recommended", "In review", "Submitted", "Resolved"].map((s) => (
                                    <span key={s} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-slate-200">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how" className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#047857]">How it works</p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">From upload to resolution in four steps.</h2>
                    </div>
                    <div className="mt-12 grid md:grid-cols-4 gap-6">
                        {[
                            { n: "01", t: "Connect your report", d: "Upload a PDF or securely connect a credit monitoring source." },
                            { n: "02", t: "AI analyzes every line", d: "Claude-powered engine flags inaccurate, outdated, and unverifiable items." },
                            { n: "03", t: "Choose your disputes", d: "Review tailored recommendations and approve in one click." },
                            { n: "04", t: "Track real progress", d: "Watch updates in your dashboard; escalate to coach or attorney anytime." },
                        ].map((s) => (
                            <div key={s.n} className="rounded-3xl bg-white border border-slate-200 p-6 md:p-7 hover:-translate-y-1 hover:shadow-lg transition-all">
                                <p className="font-display text-4xl font-bold text-[#047857]">{s.n}</p>
                                <h3 className="font-display font-semibold text-xl mt-4">{s.t}</h3>
                                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="py-20 md:py-28 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#047857]">Pricing</p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">About 20% below comparable services.</h2>
                        <p className="mt-4 text-slate-600">Monthly. Cancel anytime. No setup fees.</p>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "AI Boost", price: "31.99", tag: "Self-serve",
                                desc: "Automated AI analysis and dispute recommendations across all three bureaus.",
                                features: ["AI report analysis", "Up to 12 disputes/mo", "Progress dashboard", "Email support"],
                                cta: "Start AI Boost", highlight: false,
                            },
                            {
                                name: "Credit Coach", price: "63.99", tag: "Most popular",
                                desc: "Everything in AI Boost plus 1:1 messaging with a certified credit coach.",
                                features: ["Everything in AI Boost", "Unlimited disputes", "Certified credit coach", "Goal planning sessions"],
                                cta: "Get Credit Coach", highlight: true,
                            },
                            {
                                name: "Legal Access Pro", price: "111.99", tag: "Full coverage",
                                desc: "Coach + attorney escalation network for serious FCRA or identity issues.",
                                features: ["Everything in Credit Coach", "Attorney consultation network", "Identity theft response", "Priority support"],
                                cta: "Go Legal Access", highlight: false,
                            },
                        ].map((p) => (
                            <div
                                key={p.name}
                                data-testid={`pricing-tier-${p.name.toLowerCase().replace(/\s/g, "-")}`}
                                className={`rounded-3xl p-8 flex flex-col ${p.highlight ? "bg-slate-900 text-white shadow-2xl scale-[1.02] border border-slate-900" : "bg-white border border-slate-200"}`}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                                    <Badge className={p.highlight ? "bg-emerald-500 text-white border-0" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}>{p.tag}</Badge>
                                </div>
                                <p className={`mt-2 text-sm ${p.highlight ? "text-slate-300" : "text-slate-600"}`}>{p.desc}</p>
                                <div className="mt-6 flex items-baseline gap-1">
                                    <span className="font-display text-5xl font-bold tabular-nums">${p.price}</span>
                                    <span className={p.highlight ? "text-slate-400" : "text-slate-500"}>/month</span>
                                </div>
                                <ul className="mt-6 space-y-2.5 text-sm flex-1">
                                    {p.features.map((f) => (
                                        <li key={f} className="flex gap-2">
                                            <Check className={`h-4 w-4 shrink-0 mt-0.5 ${p.highlight ? "text-emerald-400" : "text-[#047857]"}`} /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/register" className="mt-8" data-testid={`pricing-cta-${p.name.toLowerCase().replace(/\s/g, "-")}`}>
                                    <Button className={`w-full rounded-full py-6 ${p.highlight ? "bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold" : "bg-[#047857] hover:bg-[#059669] text-white"}`}>
                                        {p.cta}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#047857]">Member stories</p>
                    <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl">Real members. Real progress.</h2>
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        {[
                            { img: T1, name: "Marcus T.", role: "Member · 6 months", q: "The AI caught a duplicate collection two bureaus had missed for years. Cleared in 31 days." },
                            { img: T2, name: "Priya S.", role: "Member · 4 months", q: "My coach answered every message in under an hour. I finally understand my credit." },
                            { img: T3, name: "Devon R.", role: "Member · 9 months", q: "Attorney access made the difference on an identity theft case I couldn't fix alone." },
                        ].map((t) => (
                            <div key={t.name} className="rounded-3xl bg-white border border-slate-200 p-7">
                                <div className="flex gap-1 text-amber-500">
                                    {Array(5).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                                </div>
                                <p className="mt-4 text-slate-800 leading-relaxed">"{t.q}"</p>
                                <div className="mt-6 flex items-center gap-3">
                                    <img src={t.img} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                                    <div>
                                        <p className="font-medium text-sm">{t.name}</p>
                                        <p className="text-xs text-slate-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-20 md:py-28 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 md:px-10">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#047857]">FAQ</p>
                    <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Questions, answered straight.</h2>
                    <Accordion type="single" collapsible className="mt-10" data-testid="faq-accordion">
                        {[
                            { q: "Can Credit Vivo guarantee my score will increase?", a: "No. No legitimate credit repair company can guarantee a score increase. We help you dispute inaccurate, outdated, unverifiable, or unfair items as permitted under the FCRA. Outcomes vary based on your specific report and the response of the credit bureaus and furnishers." },
                            { q: "What items can be disputed?", a: "Anything inaccurate, outdated (typically beyond the 7-year window for most negative items), unverifiable, duplicated, or otherwise unfair under federal consumer protection laws." },
                            { q: "Will using Credit Vivo hurt my credit?", a: "No. Filing legitimate disputes does not affect your score. Pulling your own report is a soft inquiry that doesn't impact credit." },
                            { q: "Can I cancel anytime?", a: "Yes. All plans are month-to-month with no commitment. Cancel inside your dashboard at any time." },
                            { q: "Is Credit Vivo a law firm?", a: "No. Credit Vivo is not a law firm and does not provide legal advice. Our Legal Access Pro plan connects you with independent licensed attorneys in our referral network when situations require it." },
                        ].map((item, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-200">
                                <AccordionTrigger className="text-left font-display font-semibold text-lg py-5 hover:no-underline" data-testid={`faq-trigger-${i}`}>{item.q}</AccordionTrigger>
                                <AccordionContent className="text-slate-600 pb-5 leading-relaxed">{item.a}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-28">
                <div className="max-w-5xl mx-auto px-6 md:px-10">
                    <div className="rounded-[2rem] bg-slate-900 text-white p-10 md:p-16 relative overflow-hidden">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
                        <Sparkles className="h-8 w-8 text-emerald-400" />
                        <h2 className="font-display mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl">Ready to see what's actually on your credit report?</h2>
                        <p className="mt-4 text-slate-300 max-w-xl">Free AI analysis on your first upload. No credit card required.</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/register" data-testid="footer-cta-start">
                                <Button className="rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-7 py-6 text-base">
                                    Start free analysis <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link to="/login" data-testid="footer-cta-login">
                                <Button variant="outline" className="rounded-full border-slate-700 text-white hover:bg-slate-800 hover:text-white bg-transparent px-7 py-6 text-base">
                                    Already a member? Sign in
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* DISCLAIMER FOOTER */}
            <footer className="bg-slate-50 border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-6 md:px-10 text-sm text-slate-500 space-y-4">
                    <p className="font-semibold text-slate-700">Important compliance notice</p>
                    <p className="leading-relaxed max-w-4xl">
                        Credit Vivo is not a law firm and does not provide legal advice. Credit Vivo helps consumers
                        dispute items they believe to be inaccurate, outdated, unverifiable, duplicate, or otherwise
                        unfair on their credit reports. Results vary; no specific score change is promised or
                        guaranteed. You have the right to dispute items yourself directly with the credit bureaus
                        at no cost under the Fair Credit Reporting Act (FCRA).
                    </p>
                    <p className="pt-4 border-t border-slate-200">© {new Date().getFullYear()} Credit Vivo. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
