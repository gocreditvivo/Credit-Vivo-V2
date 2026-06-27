import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle,
  ClipboardCheck,
  Compass,
  Eye,
  FileSearch,
  Layers3,
  LockKeyhole,
  Shield,
  Sparkles,
  UploadCloud,
} from 'lucide-react';

const trustItems = [
  { icon: Shield, label: 'No hard pull to start', copy: 'Explore the free beta without a credit pull.' },
  { icon: Eye, label: 'Review before action', copy: 'You stay in control before any next step.' },
  { icon: LockKeyhole, label: 'No automatic letters', copy: 'Nothing is sent or submitted on your behalf.' },
];

const bureauRows = [
  { bureau: 'Equifax', items: '4 items', tone: 'bg-sky-500', width: '72%' },
  { bureau: 'Experian', items: '5 items', tone: 'bg-mint-500', width: '84%' },
  { bureau: 'TransUnion', items: '3 items', tone: 'bg-lime-400', width: '58%' },
];

const workflow = [
  { icon: UploadCloud, title: 'Upload manually', copy: 'Start with a report file during beta testing.' },
  { icon: Layers3, title: 'Organize the details', copy: 'Group identity, accounts, balances, and bureau differences.' },
  { icon: FileSearch, title: 'Review possible inaccuracies', copy: 'See items that may deserve a closer consumer review.' },
  { icon: Compass, title: 'Choose the next step', copy: 'Keep the process educational, self-directed, and review-first.' },
];

function DashboardPreview() {
  return (
    <div className="relative mx-auto max-w-lg">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-mint-200/60 via-sky-100 to-lime-200/50 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl shadow-navy-100/80">
        <div className="flex items-center justify-between border-b border-navy-100 bg-navy-950 px-4 py-3.5 text-white">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-mint-200">Credit Vivo scanner</p>
            <p className="mt-1 text-[13px] font-bold">Report review dashboard</p>
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-lime-200">Free beta</span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-[1fr_0.82fr]">
          <div className="space-y-3">
            <div className="rounded-xl border border-navy-100 bg-navy-50/70 p-3.5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold text-navy-900">Three-bureau comparison</p>
                <BarChart3 size={16} className="text-sky-600" />
              </div>
              <div className="space-y-3">
                {bureauRows.map((row) => (
                  <div key={row.bureau}>
                    <div className="mb-1 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-navy-700">{row.bureau}</span>
                      <span className="text-navy-400">{row.items}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white">
                      <div className={`h-full rounded-full ${row.tone}`} style={{ width: row.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                ['12', 'organized'],
                ['3', 'bureaus'],
                ['0', 'hard pulls'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-navy-100 bg-white p-2.5 text-center">
                  <p className="text-lg font-bold text-navy-900">{value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-navy-100 bg-white p-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-navy-400">Review queue</p>
            <div className="mt-3 space-y-2.5">
              {[
                ['Identity details', 'Checked'],
                ['Account history', 'Ready'],
                ['Learning note', 'Open'],
              ].map(([item, status]) => (
                <div key={item} className="flex items-center gap-2.5 rounded-lg bg-navy-50/80 p-2.5">
                  <CheckCircle size={15} className="shrink-0 text-mint-500" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-navy-800">{item}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-700">{status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/70 to-white">
        <div className="soft-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mint-400 via-sky-400 to-lime-300" aria-hidden="true" />

        <div className="relative mx-auto grid min-h-[620px] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="animate-fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-mint-200 bg-mint-50 px-3 py-1.5 text-[11px] font-bold text-mint-700">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
              Free Credit Check-In - no hard pull to start
            </div>

            <h1 className="mb-4 max-w-2xl text-[30px] font-bold leading-tight text-navy-950 sm:text-[38px]">
              Understand your credit report without the pressure.
            </h1>

            <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-navy-500">
              <strong className="text-navy-800">Credit Vivo is a self-directed credit education platform.</strong>{' '}
              Upload a report, organize the details, compare bureau information, and review possible inaccuracies before choosing your own next step.
            </p>

            <div className="mb-6 flex flex-wrap gap-3">
              <Link to="/join" className="btn-primary px-5 py-2.5 text-sm">
                Join Free
                <ArrowRight size={15} />
              </Link>
              <Link to="/scan" className="btn-outline px-5 py-2.5 text-sm">
                Try Scanner
              </Link>
            </div>

            <div className="grid max-w-xl gap-3 sm:grid-cols-3">
              {trustItems.map(({ icon: Icon, label, copy }) => (
                <div key={label} className="rounded-xl border border-navy-100 bg-white/80 p-3.5 shadow-sm backdrop-blur">
                  <Icon size={16} className="mb-2.5 text-mint-600" />
                  <p className="text-xs font-bold text-navy-900">{label}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-navy-500">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <DashboardPreview />
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-y border-navy-100 bg-white py-6">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ['Free beta', 'No payment required during testing.'],
            ['Consumer control', 'You decide what to review next.'],
            ['Compliance-first', 'No guaranteed deletions or score outcomes.'],
            ['Plain English', 'Credit details translated into simple steps.'],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-xl bg-navy-50/60 p-4">
              <p className="text-sm font-bold text-navy-900">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-navy-500">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-sky-700">How it works</p>
            <h2 className="text-[22px] font-bold text-navy-950 sm:text-[26px]">
              A calmer way to review credit information.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-500">
              Inspired by the clarity of leading credit platforms, but built around Credit Vivo's safer software-first model.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {workflow.map(({ icon: Icon, title, copy }, index) => (
              <div key={title} className="group rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-100/70">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 group-hover:bg-mint-100 group-hover:text-mint-700">
                    <Icon size={18} />
                  </div>
                  <span className="text-lg font-bold text-navy-100">0{index + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-navy-950">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-navy-500">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scanner spotlight */}
      <section className="overflow-hidden bg-navy-950 py-14 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-lime-300">Scanner beta</p>
            <h2 className="text-[22px] font-bold sm:text-[26px]">
              Manual report upload, organized for human review.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-navy-200">
              The scanner experience should make complicated credit data easier to read. It does not promise outcomes, submit disputes automatically, or replace consumer judgment.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                ['Three report comparison', 'Designed for bureau-by-bureau review.'],
                ['Review queue', 'Turn dense report data into clearer tasks.'],
                ['Education notes', 'Explain terms before the user acts.'],
                ['No payment gate', 'Free beta access while testing.'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-bold">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-navy-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-white/8 p-5 shadow-2xl">
            <div className="absolute inset-x-5 top-5 h-20 animate-scan-line bg-gradient-to-b from-sky-300/0 via-sky-300/20 to-sky-300/0" />
            <div className="relative rounded-xl bg-white p-5 text-navy-900">
              <div className="mb-4 flex items-center justify-between border-b border-navy-100 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-navy-400">Upload preview</p>
                  <p className="text-sm font-bold">credit-report.pdf</p>
                </div>
                <ClipboardCheck size={20} className="text-mint-600" />
              </div>
              <div className="space-y-3">
                {['Personal information', 'Open accounts', 'Collections', 'Inquiry history'].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-xl bg-navy-50 px-4 py-3">
                    <span className="text-xs font-bold">{item}</span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${index === 2 ? 'bg-lime-100 text-navy-700' : 'bg-mint-100 text-mint-700'}`}>
                      Review
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="bg-gradient-to-b from-white to-sky-50/70 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-sky-700">Why Credit Vivo</p>
            <h2 className="text-[22px] font-bold text-navy-950 sm:text-[26px]">
              Software first. Consumer controlled.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: 'Cleaner than old-school credit repair',
                copy: 'The experience is modern and educational instead of pressure-heavy or promise-heavy.',
              },
              {
                icon: BookOpen,
                title: 'More guidance than a static template',
                copy: 'Learning moments help users understand credit terms before taking self-directed steps.',
              },
              {
                icon: FileSearch,
                title: 'Built around report review',
                copy: 'The product experience starts with organization, comparison, and consumer review.',
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-mint-100 text-mint-700">
                  <Icon size={19} />
                </div>
                <h3 className="text-base font-bold text-navy-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning preview */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-sky-700">Learning center</p>
              <h2 className="text-[22px] font-bold text-navy-950">Credit basics made simple.</h2>
            </div>
            <Link to="/learning" className="btn-soft hidden text-xs sm:inline-flex">
              View lessons
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Beginner', 'What affects your score?', 'Payment history, balances, credit age, applications, and account mix all matter.'],
              ['Report Review', 'What is a collection?', 'A collection means a debt may have been sent or sold to a collector.'],
              ['Goals', 'Before buying a home', 'Start early, keep payments on time, lower balances, and avoid new debt.'],
            ].map(([cat, title, desc]) => (
              <div key={title} className="rounded-xl border border-navy-100 bg-navy-50/60 p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">{cat}</span>
                <h3 className="mt-2 text-sm font-bold text-navy-950">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-navy-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy-950 py-14 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-lime-300">Free beta access</p>
          <h2 className="text-[22px] font-bold sm:text-[26px]">Start with a clearer credit check-in.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-navy-300">
            Upload manually, review carefully, and learn what your credit report information may mean before choosing your next step.
          </p>
          <div className="mt-7 flex justify-center">
            <Link to="/join" className="btn-mint px-7 py-3 text-sm">
              Join Free
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
