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
        Dashboard
      </p>
      <h1 className="text-2xl font-black tracking-tight text-navy-950 mb-1">
        Your credit path.
      </h1>
      <p className="text-sm text-navy-400 mb-6">
        Upload, review findings, approve disputes, and track progress.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { val: String(stepsCount), label: 'next steps' },
          { val: String(reviewCount), label: 'items found' },
          { val: String(issueCount), label: 'possible errors' },
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
        <h2 className="text-sm font-bold text-navy-900 mb-4">Next steps</h2>
        <div className="space-y-3">
          {[
            {
              num: 1,
              title: result ? 'Review AI findings' : 'Start your free scan',
              desc: result
                ? 'Your possible errors are ready in plain English.'
                : 'Upload your credit report to start.',
              to: result ? '/findings' : '/scan',
            },
            {
              num: 2,
              title: 'Approve dispute drafts',
              desc: 'Choose what you want prepared before anything is sent.',
              to: '/disputes',
            },
            {
              num: 3,
              title: 'Track progress',
              desc: 'See what is pending, completed, or ready for review.',
              to: '/disputes',
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
              <ArrowRight size={13} className="text-navy-300 mt-1" />
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-navy-100/60">
        <h2 className="text-sm font-bold text-navy-900 mb-2">Updates</h2>
        <p className="text-xs text-navy-400">
          {result
            ? 'Your latest scan is available. Review findings before any next action.'
            : 'Your progress tracker will show what changed, what is pending, and what comes next.'}
        </p>
      </div>
    </div>
  );
}
