import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
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
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Toaster richColors position="top-right" />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
