import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import MarketAI from "@/pages/MarketAI";
import { PricingCheckout, PaymentSuccess, PaymentCancel, Onboarding, MemberHub, AdminPage } from "@/pages/Phase2Pages";

function Protected({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <div className="min-h-screen grid place-items-center text-slate-500">Loading…</div>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/onboarding" element={<Protected><Onboarding /></Protected>} />
                    <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
                    <Route path="/hub" element={<Protected><MemberHub /></Protected>} />
                    <Route path="/pricing" element={<PricingCheckout />} />
                    <Route path="/payment/success" element={<PaymentSuccess />} />
                    <Route path="/payment/cancel" element={<PaymentCancel />} />
                    <Route path="/admin" element={<Protected><AdminPage /></Protected>} />
                    <Route path="/market-ai" element={<Protected><MarketAI /></Protected>} />
                    <Route path="/market-ai/assets" element={<Protected><MarketAI mode="assets" /></Protected>} />
                    <Route path="/market-ai/images" element={<Protected><MarketAI mode="images" /></Protected>} />
                    <Route path="/market-ai/animations" element={<Protected><MarketAI mode="animations" /></Protected>} />
                    <Route path="/market-ai/videos" element={<Protected><MarketAI mode="videos" /></Protected>} />
                    <Route path="/market-ai/learning" element={<Protected><MarketAI mode="learning" /></Protected>} />
                    <Route path="/market-ai/campaigns" element={<Protected><MarketAI mode="campaigns" /></Protected>} />
                    <Route path="/market-ai/calendar" element={<Protected><MarketAI mode="calendar" /></Protected>} />
                    <Route path="/market-ai/review" element={<Protected><MarketAI mode="review" /></Protected>} />
                    <Route path="/market-ai/approved" element={<Protected><MarketAI mode="approved" /></Protected>} />
                    <Route path="/market-ai/settings/brand" element={<Protected><MarketAI mode="brand" /></Protected>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Toaster richColors position="top-right" />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
