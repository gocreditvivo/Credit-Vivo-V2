import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles, Check } from "lucide-react";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
        setLoading(true);
        try {
            await register(name, email, password);
            toast.success("Account created!");
            navigate("/onboarding");
        } catch (err) {
            toast.error(err.response?.data?.detail || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-[#FCFBF9]">
            <div className="hidden md:flex flex-col justify-between p-12 bg-slate-900 text-white">
                <Link to="/" className="flex items-center gap-2" data-testid="register-logo">
                    <div className="h-9 w-9 rounded-xl bg-[#047857] grid place-items-center"><Sparkles className="h-5 w-5" /></div>
                    <span className="font-display font-bold text-xl">Credit Vivo</span>
                </Link>
                <div>
                    <h2 className="font-display text-4xl font-bold leading-tight">Start your free analysis.</h2>
                    <p className="mt-4 text-slate-300 max-w-md">Upload a credit report and our AI will pinpoint disputable items in under 60 seconds — no card required.</p>
                    <ul className="mt-8 space-y-2.5 text-sm text-slate-300">
                        {["AI dispute recommendations", "Progress dashboard", "Coach & attorney access"].map(x => (
                            <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-emerald-400 mt-0.5" /> {x}</li>
                        ))}
                    </ul>
                </div>
                <p className="text-xs text-slate-500">© {new Date().getFullYear()} Credit Vivo</p>
            </div>

            <div className="flex items-center justify-center p-6 md:p-12">
                <form onSubmit={onSubmit} className="w-full max-w-md" data-testid="register-form">
                    <h1 className="font-display text-3xl font-bold tracking-tight">Create your account</h1>
                    <p className="mt-2 text-slate-600">Takes less than a minute.</p>

                    <div className="mt-8 space-y-5">
                        <div>
                            <Label htmlFor="name">Full name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-2 h-12 rounded-xl" data-testid="register-name" />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2 h-12 rounded-xl" data-testid="register-email" />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-2 h-12 rounded-xl" data-testid="register-password" />
                            <p className="text-xs text-slate-500 mt-1">Minimum 8 characters.</p>
                        </div>
                        <Button type="submit" disabled={loading} className="w-full h-12 rounded-full bg-[#047857] hover:bg-[#059669] text-white" data-testid="register-submit">
                            {loading ? "Creating…" : "Create account"}
                        </Button>
                    </div>

                    <p className="mt-6 text-sm text-slate-600 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#047857] font-medium hover:underline" data-testid="register-to-login">Sign in</Link>
                    </p>
                    <p className="mt-6 text-xs text-slate-400 text-center leading-relaxed">
                        By creating an account, you acknowledge Credit Vivo helps dispute inaccurate, outdated, unverifiable, or unfair items and does not guarantee credit score changes.
                    </p>
                </form>
            </div>
        </div>
    );
}
