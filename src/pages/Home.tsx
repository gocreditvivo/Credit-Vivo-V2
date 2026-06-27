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
    <div className="bg-white rounded-2xl shadow-lg shadow-navy-100/50 border border-navy-100/60 p-5 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] font-medium text-navy-400 uppercase tracking-wider">Your Roadmap</p>
          <p className="text-sm font-bold text-navy-900 mt-0.5">Credit Check-In</p>
        </div>
        <div className="w-9 h-9 bg-mint-50 rounded-lg flex items-center justify-center">
          <TrendingUp size={16} className="text-mint-600" />
        </div>
      </div>
      <div className="space-y-2.5">
        {[
          { label: 'Profile reviewed', done: true },
          { label: 'Score opportunities found', done: true },
          { label: 'Monthly plan created', done: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 py-2 px-3 bg-navy-50/60 rounded-lg">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.done ? 'bg-mint-500' : 'bg-navy-200'}`}>
              {item.done && <CheckCircle size={12} className="text-white" />}
            </div>
            <span className={`text-xs font-medium ${item.done ? 'text-navy-700' : 'text-navy-400'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-navy-100/60 flex items-center gap-2">
        <div className="w-2 h-2 bg-mint-400 rounded-full animate-pulse" />
        <span className="text-[11px] text-navy-500">3 steps this month</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-mint-50 border border-mint-200 text-mint-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 bg-mint-500 rounded-full" />
                Free Credit Check-In — No hard pull to start
              </div>

              <h1 className="text-3xl sm:text-[40px] font-bold text-navy-900 leading-tight mb-4">
                Stronger credit.{' '}
                <span className="text-mint-600">Less stress.</span>
              </h1>

              <p className="text-[15px] text-navy-500 leading-relaxed mb-6 max-w-md">
                <strong className="text-navy-700">You take control. We clear the path.</strong>{' '}
                Credit Vivo helps you understand your credit, build better habits, review possible errors, and follow a simple monthly plan.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/join" className="btn-primary text-sm py-3 px-6">
                  Join Free
                  <ArrowRight size={15} />
                </Link>
                <Link to="/why" className="btn-outline text-sm py-3 px-6">
                  Why Credit Vivo
                </Link>
              </div>

              <div className="flex flex-wrap gap-4">
                {['No hard pull to start', 'Plain-English roadmap', 'Track progress monthly'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-[12px] text-navy-500">
                    <CheckCircle size={13} className="text-mint-500" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <HeroCard />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8 border-y border-navy-100/60 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Build Credit', 'Clean Up', 'Track Progress', 'Learn Credit', 'Join Free'].map((item) => (
              <div key={item} className="text-center py-2">
                <span className="text-xs font-semibold text-navy-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision section */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-lime-300 mb-2">Credit made simple</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Your future starts with a clearer plan.
          </h2>
          <p className="text-sm text-navy-300 max-w-lg mx-auto mb-10">
            Most people do not need more credit jargon. They need a simple path, reminders, and guidance that makes sense.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Understand', desc: 'Know what may be holding you back.' },
              { title: 'Build', desc: 'Focus on habits that may help over time.' },
              { title: 'Clean up', desc: 'Review possible errors in a smarter order.' },
              { title: 'Track', desc: 'Know what was done and what happens next.' },
            ].map((g) => (
              <div key={g.title} className="bg-white/5 border border-white/10 rounded-xl p-5 text-left">
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
              { num: '01', title: 'Join free', desc: 'Start your Credit Check-In with no hard pull to begin.', icon: Shield },
              { num: '02', title: 'Get your roadmap', desc: 'Credit Vivo organizes your profile and explains what matters.', icon: Compass },
              { num: '03', title: 'Follow your plan', desc: 'Each month, focus on a few helpful steps.', icon: Calendar },
              { num: '04', title: 'Track progress', desc: 'Stay updated on actions, responses, and next steps.', icon: BarChart3 },
            ].map(({ num, title, desc, icon: Icon }) => (
              <div key={num} className="bg-navy-50/50 rounded-xl p-5 border border-navy-100/60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-sky-100 rounded-lg flex items-center justify-center">
                    <Icon size={16} className="text-sky-600" />
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
              Build, clean up, track, and learn.
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
                title: 'Clean up possible errors',
                desc: 'Review personal information, collections, bureau differences, and account details that may need attention.',
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
              { cat: 'Clean-Up', title: 'What is a collection?', desc: 'A collection means a debt may have been sent or sold to a collector.' },
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
