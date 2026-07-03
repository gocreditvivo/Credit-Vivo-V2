import React from "react";

const colors = {
    Draft: "bg-slate-100 text-slate-700 border-slate-200",
    "Needs Review": "bg-amber-50 text-amber-700 border-amber-200",
    "Compliance Review": "bg-orange-50 text-orange-700 border-orange-200",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Scheduled: "bg-blue-50 text-blue-700 border-blue-200",
    Published: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Archived: "bg-slate-100 text-slate-500 border-slate-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
};

export default function AssetStatusBadge({ status }) {
    return (
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${colors[status] || colors.Draft}`}>
            {status}
        </span>
    );
}
