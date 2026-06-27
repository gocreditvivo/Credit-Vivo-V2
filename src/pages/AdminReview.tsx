import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, ShieldAlert } from 'lucide-react';
import { getLastScanResult } from '../lib/scanStorage';

export default function AdminReview() {
  const result = getLastScanResult();

  if (!result) {
    return (
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">
          Internal Review
        </p>
        <h1 className="text-xl font-bold text-navy-900 mb-6">
          No scan result available.
        </h1>
        <Link to="/scan" className="btn-primary text-xs py-2.5">
          <ArrowLeft size={14} />
          Go to Credit Check-In
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">
        Internal Review
      </p>
      <h1 className="text-xl font-bold text-navy-900 mb-1">
        Admin Review Output
      </h1>
      <p className="text-sm text-navy-400 mb-6 max-w-3xl">
        This page is for internal review. It can show confidence, snippets, and suggested
        rounds. It should not be shown as a public marketing page.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-5 flex gap-3">
        <ShieldAlert size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          Parser output is draft review data. Verify raw evidence before preparing any
          customer action, dispute, complaint, or mail-out letter.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border border-navy-100/60">
          <p className="text-2xl font-bold text-navy-900">{result.review_items_count}</p>
          <p className="text-[11px] text-navy-400">tradeline/review items</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-navy-100/60">
          <p className="text-2xl font-bold text-navy-900">
            {result.issues_count || result.issues_preview?.length || 0}
          </p>
          <p className="text-[11px] text-navy-400">possible review points</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-navy-100/60">
          <p className="text-2xl font-bold text-navy-900">
            {result.cross_bureau_groups?.length || 0}
          </p>
          <p className="text-[11px] text-navy-400">cross-bureau groups</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-navy-100/60 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={16} className="text-sky-600" />
          <h2 className="text-sm font-bold text-navy-900">Review items preview</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-navy-400 border-b border-navy-100">
                <th className="py-2 pr-4">Bureau</th>
                <th className="py-2 pr-4">Account</th>
                <th className="py-2 pr-4">Acct #</th>
                <th className="py-2 pr-4">Balance</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {result.review_items_preview.map((item, index) => (
                <tr key={item.id || index} className="border-b border-navy-50">
                  <td className="py-3 pr-4 text-navy-600">{item.bureau || '-'}</td>
                  <td className="py-3 pr-4 font-medium text-navy-800">
                    {item.account_name || 'Review item'}
                  </td>
                  <td className="py-3 pr-4 text-navy-500">
                    {item.account_number_masked || '-'}
                  </td>
                  <td className="py-3 pr-4 text-navy-500">{item.balance || '-'}</td>
                  <td className="py-3 pr-4 text-navy-500">
                    {item.status || item.pay_status || '-'}
                  </td>
                  <td className="py-3 pr-4 text-navy-500">
                    {item.confidence || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(result.issues_preview || []).length > 0 && (
        <div className="bg-white rounded-xl p-5 border border-navy-100/60">
          <h2 className="text-sm font-bold text-navy-900 mb-4">
            Issues preview
          </h2>
          <div className="space-y-3">
            {(result.issues_preview || []).map((issue) => (
              <div key={issue.id} className="rounded-lg bg-navy-50/50 p-4">
                <p className="text-sm font-semibold text-navy-800">
                  {issue.customer_label}
                </p>
                <p className="text-xs text-navy-500 mt-1">
                  {issue.admin_explanation}
                </p>
                <p className="text-[11px] text-navy-400 mt-2">
                  {issue.suggested_round} • {issue.issue_type}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
