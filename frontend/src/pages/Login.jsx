import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success("Welcome back!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.detail || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-[#FCFBF9]">
            <div className="hidden md:flex flex-col justify-between p-12 bg-slate-900 text-white">
                <Link to="/" className="flex items-center gap-2" data-testid="login-logo">
                    <div className="h-9 w-9 rounded-xl bg-[#047857] grid place-items-center"><Sparkles className="h-5 w-5" /></div>
                    <span className="font-display font-bold text-xl">Credit Vivo</span>
                </Link>
                <div>
                    <h2 className="font-display text-4xl font-bold leading-tight">Welcome back.<br />Let's keep your credit moving forward.</h2>
                    <p className="mt-4 text-slate-300 max-w-md">Sign in to view your AI-powered dispute recommendations, track open items, and message your coach.</p>
                </div>
                <p className="text-xs text-slate-500">© {new Date().getFullYear()} Credit Vivo</p>
            </div>

            <div className="flex items-center justify-center p-6 md:p-12">
                <form onSubmit={onSubmit} className="w-full max-w-md" data-testid="login-form">
                    <h1 className="font-display text-3xl font-bold tracking-tight">Sign in</h1>
                    <p className="mt-2 text-slate-600">Welcome back to Credit Vivo.</p>

                    <div className="mt-8 space-y-5">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2 h-12 rounded-xl" data-testid="login-email" />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-2 h-12 rounded-xl" data-testid="login-password" />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full h-12 rounded-full bg-[#047857] hover:bg-[#059669] text-white" data-testid="login-submit">
                            {loading ? "Signing in…" : "Sign in"}
                        </Button>
                    </div>

                    <p className="mt-6 text-sm text-slate-600 text-center">
                        New here?{" "}
                        <Link to="/register" className="text-[#047857] font-medium hover:underline" data-testid="login-to-register">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
