import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getLastScanResult } from '../lib/scanStorage';

export default function Dashboard() {
  const result = getLastScanResult();

  const stepsCount = result ? 3 : 3;
  const reviewCount = result?.review_items_count ?? 2;
  const issueCount = result?.issues_count ?? result?.issues_preview?.length ?? 1;

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">
        Member Dashboard
      </p>
      <h1 className="text-xl font-bold text-navy-900 mb-1">
        Your Credit Roadmap is ready.
      </h1>
      <p className="text-sm text-navy-400 mb-6">
        You take control. We clear the path.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { val: String(stepsCount), label: 'steps this month' },
          { val: String(reviewCount), label: 'items to review' },
          { val: String(issueCount), label: 'review points' },
          { val: '0', label: 'hard pulls' },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl p-4 border border-navy-100/60 text-center"
          >
            <p className="text-2xl font-bold text-navy-900">{s.val}</p>
            <p className="text-[11px] text-navy-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-5 border border-navy-100/60 mb-5">
        <h2 className="text-sm font-bold text-navy-900 mb-4">This Month's Plan</h2>
        <div className="space-y-3">
          {[
            {
              num: 1,
              title: result ? 'Review organized findings' : 'Start your Credit Check-In',
              desc: result
                ? 'Your report review items are ready in the Findings page.'
                : 'Upload or connect your report to start your roadmap.',
              to: result ? '/findings' : '/scan',
            },
            {
              num: 2,
              title: 'Review selected report items',
              desc: 'We organize items that may need more review.',
              to: '/findings',
            },
            {
              num: 3,
              title: 'Review balance habits',
              desc: 'One educational action item is ready.',
              to: '#',
            },
          ].map((step) => (
            <Link
              key={step.num}
              to={step.to}
              className="flex items-start gap-3 py-3 px-4 bg-navy-50/50 rounded-lg hover:bg-sky-50/50 transition-colors"
            >
              <div className="w-7 h-7 bg-navy-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-white">{step.num}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy-800">{step.title}</p>
                <p className="text-xs text-navy-400 mt-0.5">{step.desc}</p>
              </div>
              {step.to !== '#' && <ArrowRight size={13} className="text-navy-300 mt-1" />}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-navy-100/60">
        <h2 className="text-sm font-bold text-navy-900 mb-2">Updates</h2>
        <p className="text-xs text-navy-400">
          {result
            ? 'Your latest Credit Check-In result is available. Review findings before any next action.'
            : 'Your next progress update will show what changed, what is pending, and what to focus on next.'}
        </p>
      </div>
    </div>
  );
}
