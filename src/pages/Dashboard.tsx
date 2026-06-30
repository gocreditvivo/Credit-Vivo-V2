import { Link } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp } from 'lucide-react';
import { getLastScanResult } from '../lib/scanStorage';

export default function Dashboard() {
  const result = getLastScanResult();

  const stepsCount = result ? 3 : 3;
  const reviewCount = result?.review_items_count ?? 2;
  const issueCount = result?.issues_count ?? result?.issues_preview?.length ?? 1;

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">
        Score Dashboard
      </p>
      <h1 className="text-2xl font-black tracking-tight text-navy-950 mb-1">
        Your score action plan.
      </h1>
      <p className="text-sm text-navy-400 mb-6">
        Find point blockers, take action, and track what changes.
      </p>

      <div className="mb-5 rounded-3xl border border-navy-100 bg-gradient-to-br from-navy-950 to-teal-950 p-6 text-white shadow-lg shadow-navy-900/10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-emerald-200">Target path</p>
            <p className="mt-2 text-5xl font-black tracking-tight">720</p>
            <p className="mt-2 text-sm text-navy-200">Your next score goal board is ready.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:w-72">
            <div className="rounded-2xl bg-white/10 p-4">
              <Target size={18} className="text-emerald-300" />
              <p className="mt-3 text-xl font-black">+44</p>
              <p className="text-[11px] text-navy-300">point path</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <TrendingUp size={18} className="text-emerald-300" />
              <p className="mt-3 text-xl font-black">62%</p>
              <p className="text-[11px] text-navy-300">plan ready</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { val: String(stepsCount), label: 'boost steps' },
          { val: String(reviewCount), label: 'items scanned' },
          { val: String(issueCount), label: 'point blockers' },
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
        <h2 className="text-sm font-bold text-navy-900 mb-4">Next boost actions</h2>
        <div className="space-y-3">
          {[
            {
              num: 1,
              title: result ? 'Review point blockers' : 'Start your free scan',
              desc: result
                ? 'Your possible point blockers are ready in plain English.'
                : 'Upload your credit report to build your score board.',
              to: result ? '/findings' : '/scan',
            },
            {
              num: 2,
              title: 'Approve boost actions',
              desc: 'Choose which dispute drafts or review steps should move forward.',
              to: '/disputes',
            },
            {
              num: 3,
              title: 'Track point progress',
              desc: 'See what is pending, completed, or ready for the next move.',
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
        <h2 className="text-sm font-bold text-navy-900 mb-2">Score updates</h2>
        <p className="text-xs text-navy-400">
          {result
            ? 'Your latest scan is available. Review point blockers before any next action.'
            : 'Your tracker will show what changed, what is pending, and what comes next.'}
        </p>
      </div>
    </div>
  );
}
