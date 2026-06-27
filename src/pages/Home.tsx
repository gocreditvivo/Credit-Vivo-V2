import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  BarChart3,
  Sparkles,
  Compass,
  Calendar,
  FileSearch,
  LockKeyhole,
  ListChecks,
} from 'lucide-react';

function HeroCard() {
  return (
    <div className="animate-float-slow overflow-hidden rounded-lg border border-white/70 bg-white/92 p-4 shadow-xl shadow-navy-900/10 backdrop-blur-md">
      <div className="-mx-4 -mt-4 mb-4 h-1.5 aurora-rail" />
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-navy-400">Credit Check-In</p>
        <span className="rounded-full bg-mint-50 px-2.5 py-1 text-[10px] font-bold text-mint-700">Draft review</span>
      </div>
      <div className="space-y-2">
        {[
          { label: 'Profile reviewed', done: true },
          { label: 'Education items found', done: true },
          { label: 'Monthly plan created', done: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 rounded-lg bg-navy-50/80 px-3 py-2">
            <div className={`flex h-5 w-5 items-center justify-center rounded-full ${item.done ? 'bg-mint-500' : 'bg-navy-200'}`}>
              {item.done && <CheckCircle size={12} className="text-white" />}
            </div>
            <span className={`text-xs font-semibold ${item.done ? 'text-navy-700' : 'text-navy-400'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-full bg-navy-100">
        <div className="h-1.5 w-3/4 origin-left animate-pulse-soft rounded-full bg-gradient-to-r from-mint-400 via-sky-400 to-lime-300" />
      </div>
    </div>
  );
}

const trustItems = [
  { icon: Shield, label: 'No hard pull to start' },
  { icon: LockKeyhole, label: 'No automatic letters' },
  { icon: FileSearch, label: 'Review-first workflow' },
  { icon: ListChecks, label: 'Self-directed next steps' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[620px] overflow-hidden bg-navy-950"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(5, 20, 38, 0.88) 0%, rgba(8, 30, 52, 0.72) 40%, rgba(34, 197, 94, 0.18) 72%), url('/brand/credit-vivo-hero.png')",
          backgroundPosition: 'center right',
          backgroundSize: 'cover',
        }}
      >
        <div className="motion-wash absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="soft-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-1.5 aurora-rail" aria-hidden="true" />
        <div className="mx-auto flex min-h-[620px] max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative z-10 max-w-2xl animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint-300/30 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-mint-100 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-300" />
              Free Credit Check-In - visual beta
            </div>

            <h1 className="mb-5 max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              Understand your report before you decide your next move.
            </h1>

            <p className="mb-7 max-w-xl text-[15px] leading-relaxed text-sky-50/90">
              <strong className="text-white">You take control. We clear the path.</strong>{' '}
              Credit Vivo organizes report information, explains possible inaccuracies, and keeps every step review-first and self-directed.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
                <Link to="/join" className="btn-primary text-sm py-3 px-6">
                  Join Free
                  <ArrowRight size={15} />
                </Link>
                <Link to="/why" className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/18">
                  Why Credit Vivo
                </Link>
              </div>

            <div className="grid max-w-xl grid-cols-2 gap-2 sm:grid-cols-4">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="glass-lift rounded-lg p-3">
                  <Icon size={15} className="mb-2 text-mint-200" />
                  <p className="text-[11px] font-semibold leading-snug text-white/90">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute left-1/2 top-28 z-10 hidden w-56 -translate-x-4 lg:block">
            <div className="glass-lift rounded-lg p-3 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-lime-200">Live organization</p>
              <div className="mt-3 space-y-2">
                {['Identity', 'Open accounts', 'Bureau differences'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-md bg-white/10 px-3 py-2">
                    <span className="text-[11px] font-semibold">{item}</span>
                    <span className="h-2 w-2 rounded-full bg-lime-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 z-10 hidden w-80 lg:block">
            <HeroCard />
          </div>
        </div>
      </section>

      {/* Product proof */}
      <section className="border-b border-navy-100/70 bg-white py-8">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ['Free beta', 'No payment is required during the current test period.', 'bg-gradient-to-r from-mint-400 to-sky-400'],
            ['Consumer control', 'Nothing is sent, mailed, or submitted automatically.', 'bg-gradient-to-r from-sky-400 to-lime-300'],
            ['Plain English', 'Findings are organized into simple review categories.', 'bg-gradient-to-r from-lime-300 to-mint-400'],
            ['Compliance-first', 'No guaranteed deletions, approvals, or score outcomes.', 'bg-gradient-to-r from-navy-500 to-sky-500'],
          ].map(([title, copy, accent]) => (
            <div key={title} className="border-l border-navy-100 pl-4">
              <span className={`mb-3 block h-1.5 w-12 rounded-full ${accent}`} />
              <p className="text-sm font-bold text-navy-900">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-navy-400">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product preview */}
      <section className="spotlight-panel py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-sky-700">Product experience</p>
            <h2 className="mb-3 text-2xl font-bold text-navy-900 sm:text-3xl">
              A credit roadmap that feels calm, not confusing.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-navy-500">
              Credit Vivo turns report uploads into organized review items, learning moments, and monthly next steps. The customer view stays simple while internal review can stay detailed.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/80 bg-white/90 p-4 shadow-2xl shadow-navy-200/70 backdrop-blur">
            <div className="-mx-4 -mt-4 mb-4 h-1.5 aurora-rail" />
            <div className="mb-4 flex items-center justify-between border-b border-navy-100 pb-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-navy-400">Dashboard preview</p>
                <p className="text-sm font-bold text-navy-900">Your Credit Roadmap</p>
              </div>
              <span className="rounded-full bg-mint-50 px-3 py-1 text-[11px] font-bold text-mint-700">Review ready</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['3', 'steps this month'],
                ['12', 'items organized'],
                ['0', 'hard pulls'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-navy-100/80">
                  <p className="text-2xl font-bold text-navy-900">{value}</p>
                  <p className="text-[11px] text-navy-400">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              {[
                ['Upload report', 'Complete'],
                ['Review possible inaccuracies', 'Ready'],
                ['Choose self-directed next step', 'Next'],
              ].map(([task, status]) => (
                <div key={task} className="flex items-center justify-between rounded-lg border border-navy-100 px-4 py-3">
                  <span className="text-xs font-semibold text-navy-700">{task}</span>
                  <span className="text-[11px] font-bold text-sky-700">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual workflow */}
      <section className="overflow-hidden bg-white py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="relative">
            <div className="image-sheen h-[360px] rounded-lg border border-navy-100 bg-navy-900 shadow-2xl shadow-navy-200/70">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/brand/credit-vivo-hero.png')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/88 via-navy-900/38 to-sky-300/12" />
              <div className="absolute left-6 top-6 rounded-lg border border-white/20 bg-white/12 px-4 py-3 text-white backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-mint-100">Report upload</p>
                <p className="mt-1 text-sm font-bold">Information organized for review</p>
              </div>
              <div className="absolute bottom-6 left-6 right-6 overflow-hidden rounded-lg border border-white/20 bg-white/90 p-4 shadow-xl">
                <div className="absolute inset-x-0 top-0 h-16 animate-scan-line bg-gradient-to-b from-sky-300/0 via-sky-300/30 to-sky-300/0" />
                <div className="relative grid gap-2 sm:grid-cols-3">
                  {[
                    ['Identity', 'Checked'],
                    ['Accounts', 'Sorted'],
                    ['Bureaus', 'Compared'],
                  ].map(([label, status]) => (
                    <div key={label} className="rounded-lg bg-navy-50/90 p-3">
                      <p className="text-[11px] font-bold text-navy-900">{label}</p>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-mint-700">{status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-mint-600">More visual, still practical</p>
            <h2 className="mb-3 text-2xl font-bold text-navy-900 sm:text-3xl">
              Make every step feel easier to understand.
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-navy-500">
              The experience should feel alive, but never careless. Credit Vivo can use motion to show organization, progress, and review without making risky promises.
            </p>

            <div className="grid gap-3">
              {[
                ['Color-coded review', 'Different stages stand out without overwhelming the user.'],
                ['Animated progress', 'Small motion shows work happening and keeps the page warm.'],
                ['Image-backed moments', 'Real visual scenes help the product feel more trustworthy.'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-lg border border-navy-100 bg-gradient-to-r from-white to-sky-50/70 p-4 transition-transform duration-300 hover:-translate-y-1">
                  <p className="text-sm font-bold text-navy-900">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-navy-500">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lively comparison */}
      <section className="bg-navy-50/60 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-sky-700">Built for clarity</p>
              <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">See the report from three angles.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-navy-500">
              A livelier interface can show bureau comparison, user review, and learning context without rushing the consumer.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Bureau view', 'Compare details across reports', 'bg-sky-500'],
              ['User review', 'Keep every next step self-directed', 'bg-mint-500'],
              ['Learning layer', 'Explain what each item may mean', 'bg-[#ff7a59]'],
            ].map(([title, copy, color], index) => (
              <div key={title} className="group overflow-hidden rounded-lg border border-white bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-100/80">
                <div className={`h-2 ${color}`} />
                <div className="p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-navy-400">Angle 0{index + 1}</span>
                    <span className={`h-8 w-8 rounded-lg ${color} opacity-85 transition-transform duration-300 group-hover:rotate-6`} />
                  </div>
                  <h3 className="text-base font-bold text-navy-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{copy}</p>
                  <div className="mt-5 space-y-2">
                    {[68, 84, 54].map((width, lineIndex) => (
                      <div key={lineIndex} className="h-2 rounded-full bg-navy-100">
                        <div className={`h-2 rounded-full ${color}`} style={{ width: `${Math.max(28, width - index * 8)}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8 border-y border-navy-100/60 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Free Check-In', 'Review First', 'No Guarantees', 'Plain English', 'Join Free'].map((item) => (
              <div key={item} className="text-center py-2">
                <span className="text-xs font-semibold text-navy-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision section */}
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="motion-wash absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="relative text-[11px] font-semibold uppercase tracking-widest text-lime-300 mb-2">Credit made simple</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Your future starts with a clearer plan.
          </h2>
          <p className="text-sm text-navy-300 max-w-lg mx-auto mb-10">
            Most people do not need more credit jargon or pressure. They need a simple path, reminders, and guidance that makes sense.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Understand', desc: 'Know what may be holding you back.', accent: 'bg-mint-300' },
              { title: 'Build', desc: 'Learn habits that may help over time.', accent: 'bg-sky-300' },
              { title: 'Review', desc: 'Check possible inaccuracies before any action.', accent: 'bg-lime-300' },
              { title: 'Track', desc: 'Know what was done and what happens next.', accent: 'bg-white' },
            ].map((g) => (
              <div key={g.title} className="bg-white/5 border border-white/10 rounded-xl p-5 text-left transition-transform duration-300 hover:-translate-y-1 hover:bg-white/8">
                <span className={`mb-4 block h-1.5 w-10 rounded-full ${g.accent}`} />
                <h3 className="text-sm font-bold text-white mb-1">{g.title}</h3>
                <p className="text-xs text-navy-300">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">How it works</p>
            <h2 className="text-2xl sm:text-[28px] font-bold text-navy-900">
              A guided credit journey.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', title: 'Join free', desc: 'Start your Credit Check-In with no hard pull to begin.', icon: Shield, color: 'bg-mint-100 text-mint-700' },
              { num: '02', title: 'Get your roadmap', desc: 'Credit Vivo organizes your profile and explains what matters.', icon: Compass, color: 'bg-sky-100 text-sky-700' },
              { num: '03', title: 'Review next steps', desc: 'You see important actions before anything moves forward.', icon: Calendar, color: 'bg-lime-300/30 text-navy-700' },
              { num: '04', title: 'Track progress', desc: 'Stay updated on actions, responses, and next steps.', icon: BarChart3, color: 'bg-navy-100 text-navy-700' },
            ].map(({ num, title, desc, icon: Icon, color }) => (
              <div key={num} className="bg-navy-50/50 rounded-xl p-5 border border-navy-100/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-100/80">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 ${color} rounded-lg flex items-center justify-center`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-xl font-bold text-navy-200">{num}</span>
                </div>
                <h3 className="text-sm font-bold text-navy-900 mb-1">{title}</h3>
                <p className="text-xs text-navy-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we help with */}
      <section className="py-16 bg-sky-50/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">What we help with</p>
            <h2 className="text-2xl sm:text-[28px] font-bold text-navy-900">
              Build, review, track, and learn.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: TrendingUp,
                title: 'Build credit',
                desc: 'Learn habits that may support better credit over time: on-time payments, lower balances, and smart applications.',
                color: 'bg-mint-100 text-mint-600',
              },
              {
                icon: Sparkles,
                title: 'Review possible inaccuracies',
                desc: 'Review personal information, collections, bureau differences, and account details that may need attention before any self-directed next step.',
                color: 'bg-sky-100 text-sky-600',
              },
              {
                icon: Compass,
                title: 'Know the next step',
                desc: 'Credit Vivo turns complicated credit work into simple monthly guidance.',
                color: 'bg-navy-100 text-navy-600',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-navy-100/60 shadow-sm">
                <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon size={18} />
                </div>
                <h3 className="text-[15px] font-bold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-navy-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning preview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">Learning Center</p>
              <h2 className="text-xl font-bold text-navy-900">Credit basics made simple.</h2>
            </div>
            <Link to="/learning" className="btn-soft text-xs hidden sm:flex">
              View all lessons
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { cat: 'Beginner', title: 'What affects your score?', desc: 'Payment history, balances, credit age, new applications, and account mix all matter.' },
              { cat: 'Report Review', title: 'What is a collection?', desc: 'A collection means a debt may have been sent or sold to a collector.' },
              { cat: 'Goals', title: 'Before buying a home', desc: 'Start early, keep payments on time, lower balances, and avoid new debt.' },
            ].map((l) => (
              <div key={l.title} className="bg-navy-50/50 rounded-xl p-5 border border-navy-100/60">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-600">{l.cat}</span>
                <h3 className="text-sm font-bold text-navy-900 mt-1 mb-1">{l.title}</h3>
                <p className="text-xs text-navy-500 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link to="/learning" className="btn-soft text-xs w-full">
              View all lessons <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-lime-300 mb-2">Ready to start?</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Your Credit Check-In is free.
          </h2>
          <p className="text-sm text-navy-300 mb-6">
            Get a simple starting point and see your next best steps.
          </p>
          <Link to="/join" className="btn-mint text-sm py-3 px-7">
            Join Free
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
