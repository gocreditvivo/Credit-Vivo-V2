import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#FCFBF9]/80 border-b border-slate-200/60" data-testid="navbar">
            <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2" data-testid="nav-logo">
                    <span className="font-display font-bold text-xl tracking-tight">Credit Vivo</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
                    <a href="/#how" className="hover:text-slate-900 transition" data-testid="nav-how">How it works</a>
                    <a href="/#why" className="hover:text-slate-900 transition" data-testid="nav-why">Why Credit Vivo</a>
                    <Link to="/pricing" className="hover:text-slate-900 transition" data-testid="nav-pricing">Pricing</Link>
                    <a href="/#faq" className="hover:text-slate-900 transition" data-testid="nav-faq">FAQ</a>
                    {user && <Link to="/hub" className="hover:text-slate-900 transition" data-testid="nav-hub">Member hub</Link>}
                </nav>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-sm font-medium text-slate-700 hover:text-slate-900" data-testid="nav-dashboard">
                                Dashboard
                            </Link>
                            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }} data-testid="nav-logout">
                                <LogOut className="h-4 w-4 mr-1" /> Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900" data-testid="nav-login">
                                Sign in
                            </Link>
                            <Link to="/register" data-testid="nav-register">
                                <Button className="rounded-full bg-[#047857] hover:bg-[#059669] text-white px-5">
                                    Get started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
