import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Car,
  CheckCircle,
  CreditCard,
  Gauge,
  Home as HomeIcon,
  Scale,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

function ScoreDashboard() {
  const blockers = [
    ['High card balance', '-38 pts', 68],
    ['Collection mismatch', '-42 pts', 48],
    ['Old address trail', '-12 pts', 82],
  ];

  return (
    <div className="score-dashboard-card relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-white/80 bg-white p-5 shadow-2xl shadow-navy-900/14">
      <div className="absolute right-6 top-5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700 ring-1 ring-emerald-100">
        AI plan ready
      </div>
      <div className="rounded-[1.5rem] bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950 p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">Score dashboard</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-[170px_1fr] sm:items-center">
          <div className="score-ring">
            <div className="score-ring-inner">
              <span className="text-[11px] font-bold uppercase tracking-wider text-navy-400">Target</span>
              <strong>720</strong>
              <span className="text-xs font-bold text-emerald-600">+44 point path</span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight">Find point blockers.</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-200">
              See what may be holding your credit profile back, then take the next best action.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {['Find', 'Act', 'Track'].map((label) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center">
                  <p className="text-xs font-black text-white">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {blockers.map(([label, points, width]) => (
          <div key={label as string} className="rounded-2xl border border-navy-100 bg-navy-50/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-navy-900">{label as string}</p>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-rose-600 ring-1 ring-navy-100">
                {points as string}
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white">
              <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${width}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const lifestyleTiles = [
    { title: 'Better auto terms', note: 'Prepare before the dealership.', icon: Car, tone: 'from-sky-500 to-teal-400' },
    { title: 'Home goals', note: 'Know blockers before applying.', icon: HomeIcon, tone: 'from-emerald-500 to-cyan-400' },
    { title: 'Card approvals', note: 'Lower risk before new credit.', icon: CreditCard, tone: 'from-indigo-500 to-sky-400' },
    { title: 'Rental confidence', note: 'Clean up report surprises.', icon: Building2, tone: 'from-teal-500 to-emerald-400' },
  ];

  const actionCards = [
    { title: 'Score blockers', desc: 'Collections, high balances, date issues, mixed details, or bureau mismatches.', icon: Gauge },
    { title: 'Boost actions', desc: 'Prioritized steps that show what to review, what to gather, and what to track.', icon: TrendingUp },
    { title: 'Attorney support', desc: 'Harder unresolved issues can be organized for attorney review when appropriate.', icon: Scale },
  ];

  const learningTopics = [
    'Payment history',
    'Credit utilization',
    'Three-bureau differences',
    'Dispute outcomes',
  ];

  return (
    <>
      <section className="score-hero-bg overflow-hidden py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-4 py-2 text-xs font-black text-emerald-700 shadow-sm shadow-navy-900/5">
              <Sparkles size={14} />
              AI Credit Boost + Attorney Support
            </div>

            <h1 className="max-w-3xl text-[42px] font-black leading-[0.98] tracking-tight text-navy-950 sm:text-[58px] lg:text-[70px]">
              Find what's costing you points.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black text-navy-800">
              Take action. Track progress.
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-navy-500">
              CreditVivo turns your credit report into clear point blockers, boost actions, dispute drafts, and progress tracking.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/scan" className="btn-primary rounded-full px-6 py-3 text-sm">
                Start Free Scan
                <ArrowRight size={16} />
              </Link>
              <Link to="/pricing" className="btn-outline rounded-full px-6 py-3 text-sm">
                See Plans
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['Free score-goal scan', 'Plain-English actions', 'Track every step'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-navy-100 bg-white/90 px-4 py-3 shadow-sm">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span className="text-xs font-black text-navy-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <ScoreDashboard />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-sky-700">Credit goals</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-navy-950">More points can open better doors.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-navy-500">
              Better credit clarity can matter before big life moves.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {lifestyleTiles.map(({ title, note, icon: Icon, tone }) => (
              <div key={title} className={`picture-tile rounded-3xl bg-gradient-to-br ${tone} p-5 text-white shadow-lg shadow-navy-900/10`}>
                <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/18">
                  <Icon size={24} />
                </div>
                <p className="text-lg font-black tracking-tight">{title}</p>
                <p className="mt-2 text-sm text-white/80">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-50/60 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-widest text-emerald-700">Action plan</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-navy-950">Point blockers become next steps.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {actionCards.map(({ title, desc, icon: Icon }) => (
              <div key={title} className="lively-step-card rounded-3xl border border-navy-100 bg-white p-6 shadow-sm shadow-navy-100/70">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-black text-navy-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['1', 'Scan', 'Upload your report and see possible score blockers.'],
              ['2', 'Act', 'Approve dispute drafts or follow boost actions.'],
              ['3', 'Track', 'Watch progress and know the next move.'],
            ].map(([num, title, desc]) => (
              <div key={title} className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-sm font-black text-white">
                  {num}
                </span>
                <h3 className="mt-5 text-xl font-black text-navy-950">{title}</h3>
                <p className="mt-2 text-sm text-navy-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950 py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-emerald-300">Dashboard preview</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Your score action board.</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-300">
              A simple view of blockers, actions, disputes, and progress.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-navy-950/30">
            <div className="grid gap-3 md:grid-cols-4">
              {[
                ['+44', 'point path'],
                ['3', 'blockers'],
                ['2', 'actions ready'],
                ['Free', 'scan'],
              ].map(([val, label]) => (
                <div key={label} className="rounded-2xl bg-white p-4 text-center text-navy-950">
                  <p className="text-2xl font-black">{val}</p>
                  <p className="text-[11px] font-bold text-navy-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-white p-4 text-navy-950">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-black">Score action plan</p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">62% ready</span>
              </div>
              <div className="h-3 rounded-full bg-navy-100">
                <div className="h-3 w-[62%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-sky-700">Learning</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-navy-950">Credit basics that affect points.</h2>
            </div>
            <Link to="/learning" className="hidden text-sm font-black text-emerald-700 sm:inline-flex">
              View lessons
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {learningTopics.map((topic) => (
              <div key={topic} className="rounded-3xl border border-navy-100 bg-navy-50/60 p-5">
                <BookOpen size={20} className="text-emerald-700" />
                <p className="mt-4 text-sm font-black text-navy-900">{topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-widest text-emerald-700">Plans</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-navy-950">Start free. Add support when needed.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Free Scan', '$0', 'Point blocker preview'],
              ['Core', '$79/mo', 'AI findings + dispute builder'],
              ['Plus', '$119/mo', 'Furnisher support + attorney-ready packet'],
            ].map(([name, price, detail]) => (
              <div key={name} className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
                <p className="text-lg font-black text-navy-950">{name}</p>
                <p className="mt-4 text-4xl font-black tracking-tight text-navy-950">{price}</p>
                <p className="mt-3 text-sm text-navy-500">{detail}</p>
              </div>
            ))}
          </div>
          <Link to="/pricing" className="btn-primary mt-8 rounded-full px-6 py-3 text-sm">
            See Plans
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
