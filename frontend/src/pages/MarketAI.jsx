import React from "react";
import MarketShell from "@/components/market/MarketShell";
import { MarketDashboard } from "@/components/market/MarketDashboard";

export default function MarketAI({ mode = "dashboard" }) {
    return (
        <MarketShell>
            <MarketDashboard mode={mode} />
        </MarketShell>
    );
}
