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
} from 'lucide-react';

function HeroCard() {
  return (
    <div className="lively-hero-card w-full max-w-sm rounded-xl border border-white/70 bg-white/92 p-5 shadow-xl shadow-navy-900/14 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-700">Your Roadmap</p>
          <p className="mt-0.5 text-sm font-bold text-navy-900">Credit Check-In</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-cyan-100">
          <TrendingUp size={16} className="text-emerald-700" />
        </div>
      </div>
      <div className="space-y-2.5">
        {[
          { label: 'Profile reviewed', done: true },
          { label: 'Education items found', done: true },
          { label: 'Monthly plan created', done: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 rounded-lg bg-navy-50/70 px-3 py-2">
            <div className={`flex h-5 w-5 items-center justify-center rounded-full ${item.done ? 'bg-emerald-600' : 'bg-rose-200'}`}>
              {item.done && <CheckCircle size={12} className="text-white" />}
            </div>
            <span className={`text-xs font-medium ${item.done ? 'text-navy-700' : 'text-navy-400'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-navy-100/60 pt-3">
        <div className="h-2 w-2 rounded-full bg-rose-500" />
        <span className="text-[11px] text-navy-500">3 steps this month</span>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="lively-hero-visual relative mx-auto w-full max-w-[520px]">
      <div className="lively-spark lively-spark-one" />
      <div className="lively-spark lively-spark-two" />
      <div className="absolute -right-5 -top-8 z-10 w-56 rounded-xl border border-white/80 bg-white/95 p-4 shadow-xl shadow-navy-900/12 backdrop-blur">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
          Soft-pull API targets
        </p>
        <div className="mt-2 grid gap-1.5 text-[11px] font-semibold text-navy-700">
          <span>Equifax CES</span>
          <span>iSoftpull</span>
          <span>Soft Pull Solutions</span>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl shadow-navy-900/18">
        <img
          src="/brand/credit-vivo-hero.png"
          alt="Credit Vivo dashboard preview"
          className="h-[360px] w-full object-cover object-center"
        />
      </div>
      <div className="lively-score-card rounded-xl border border-white/80 bg-white/95 p-4 shadow-xl shadow-navy-900/16 backdrop-blur">
        <b className="block text-4xl leading-none text-emerald-600">+48</b>
        <span className="text-[11px] font-extrabold uppercase text-navy-500">score momentum</span>
      </div>
      <div className="lively-check-card">
        <HeroCard />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="lively-hero-bg overflow-hidden py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-emerald-800 shadow-sm shadow-emerald-900/5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                Free Credit Check-In - No hard pull to start
              </div>

              <h1 className="mb-4 text-[30px] font-semibold leading-tight text-navy-900 sm:text-[36px]">
                Stronger credit.{' '}
                <span className="text-gradient-vivo">Less stress.</span>
              </h1>

              <p className="text-[15px] text-navy-500 leading-relaxed mb-6 max-w-md">
                <strong className="text-navy-700">You take control. We clear the path.</strong>{' '}
                Credit Vivo helps you understand your credit, organize report information, review possible inaccuracies, and follow a simple monthly plan without promising impossible shortcuts.
              </p>

              <div className="mb-8 flex flex-wrap gap-3">
                <Link to="/join" className="btn-primary text-sm py-3 px-6">
                  Join Free
                  <ArrowRight size={15} />
                </Link>
                <Link to="/why" className="btn-outline text-sm py-3 px-6">
                  Why Credit Vivo
                </Link>
              </div>

              <div className="flex flex-wrap gap-4">
                {['No hard pull to start', 'Review before action', 'Track progress monthly'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-[12px] text-navy-500">
                    <CheckCircle size={13} className="text-emerald-700" />
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-emerald-100 bg-white/85 p-4 shadow-sm shadow-emerald-900/5 lg:hidden">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                  Soft-pull API targets
                </p>
                <p className="mt-1 text-xs font-semibold text-navy-700">
                  Equifax CES, iSoftpull, Soft Pull Solutions
                </p>
              </div>
            </div>

            <div className="hidden justify-center lg:flex">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-navy-100/70 bg-white py-7">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Free Check-In', 'Review First', 'No Guarantees', 'Plain English', 'Join Free'].map((item) => (
              <div key={item} className="lively-trust-pill text-center py-2">
                <span className="text-xs font-semibold text-navy-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision section */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-emerald-950 py-14">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-emerald-200">Credit made simple</p>
          <h2 className="mb-3 text-[22px] font-semibold text-white sm:text-[26px]">
            Your future starts with a <span className="text-amber-300">clearer plan.</span>
          </h2>
          <p className="text-sm text-navy-300 max-w-lg mx-auto mb-10">
            Most people do not need more credit jargon or pressure. They need a simple path, reminders, and guidance that makes sense.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Understand', desc: 'Know what may be holding you back.' },
              { title: 'Build', desc: 'Learn habits that may help over time.' },
              { title: 'Review', desc: 'Check possible inaccuracies before any action.' },
              { title: 'Track', desc: 'Know what was done and what happens next.' },
            ].map((g) => (
              <div key={g.title} className="lively-dark-card rounded-xl border border-white/10 bg-white/[0.04] p-5 text-left">
                <h3 className="text-sm font-bold text-white mb-1">{g.title}</h3>
                <p className="text-xs text-navy-300">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sky-700">How it works</p>
            <h2 className="text-[22px] font-semibold text-navy-900 sm:text-[26px]">
              A guided credit journey.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', title: 'Join free', desc: 'Start your Credit Check-In with no hard pull to begin.', icon: Shield },
              { num: '02', title: 'Get your roadmap', desc: 'Credit Vivo organizes your profile and explains what matters.', icon: Compass },
              { num: '03', title: 'Review next steps', desc: 'You see important actions before anything moves forward.', icon: Calendar },
              { num: '04', title: 'Track progress', desc: 'Stay updated on actions, responses, and next steps.', icon: BarChart3 },
            ].map(({ num, title, desc, icon: Icon }) => (
              <div key={num} className="lively-step-card rounded-xl border border-navy-100 bg-white p-5 shadow-sm shadow-navy-100/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-cyan-100">
                    <Icon size={16} className="text-emerald-700" />
                  </div>
                  <span className="text-xl font-bold text-rose-200">{num}</span>
                </div>
                <h3 className="text-sm font-bold text-navy-900 mb-1">{title}</h3>
                <p className="text-xs text-navy-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we help with */}
      <section className="bg-emerald-50/35 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sky-700">What we help with</p>
            <h2 className="text-[22px] font-semibold text-navy-900 sm:text-[26px]">
              Build, review, track, and learn.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: TrendingUp,
                title: 'Build credit',
                desc: 'Learn habits that may support better credit over time: on-time payments, lower balances, and smart applications.',
                color: 'bg-emerald-100 text-emerald-700',
              },
              {
                icon: Sparkles,
                title: 'Review possible inaccuracies',
                desc: 'Review personal information, collections, bureau differences, and account details that may need attention before any self-directed next step.',
                color: 'bg-rose-100 text-rose-600',
              },
              {
                icon: Compass,
                title: 'Know the next step',
                desc: 'Credit Vivo turns complicated credit work into simple monthly guidance.',
                color: 'bg-amber-100 text-amber-700',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="lively-step-card rounded-xl border border-navy-100 bg-white p-6 shadow-sm shadow-navy-100/50">
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
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sky-700">Learning Center</p>
              <h2 className="text-xl font-semibold text-navy-900">Credit basics made simple.</h2>
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
              <div key={l.title} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm shadow-navy-100/50">
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
      <section className="bg-gradient-to-br from-navy-950 via-emerald-950 to-navy-900 py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-emerald-200">Ready to start?</p>
          <h2 className="mb-3 text-[22px] font-semibold text-white sm:text-[26px]">
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
