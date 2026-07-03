import React from "react";
import { Film, Image, ListChecks } from "lucide-react";
import AssetStatusBadge from "./AssetStatusBadge";

const iconByType = {
    storyboard: <ListChecks className="h-5 w-5" />,
    image: <Image className="h-5 w-5" />,
    video: <Film className="h-5 w-5" />,
};

export default function CreativePreviewCard({ asset, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect?.(asset)}
            className="text-left rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            data-testid={`market-asset-${asset.asset_id}`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="h-11 w-11 rounded-xl bg-emerald-50 text-[#047857] grid place-items-center">
                    {iconByType[asset.type] || iconByType.storyboard}
                </div>
                <AssetStatusBadge status={asset.status} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                {asset.type} / {asset.format}
            </p>
            <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{asset.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{asset.campaign}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {(asset.tags || []).slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        {tag}
                    </span>
                ))}
            </div>
            <div className={`mt-4 rounded-xl p-3 text-sm ${asset.compliance_flags?.length ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
                {asset.compliance_flags?.length ? "Compliance review needed" : "No blocked phrases found"}
            </div>
        </button>
    );
}
