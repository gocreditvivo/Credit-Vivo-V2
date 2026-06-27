import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Users,
  Target,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export default function WhyCreditVivo() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            Why Credit Vivo
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Credit guidance that makes sense.
          </h1>
          <p className="text-[15px] text-navy-500 max-w-xl mx-auto leading-relaxed">
            Credit Vivo is built for real people who want clarity, not jargon. We help you understand credit information, organize report details, and make more informed self-directed choices step by step.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-14 bg-sky-50/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">Consumer-first difference</p>
            <h2 className="text-2xl font-bold text-navy-900">Built for clarity before claims</h2>
            <p className="text-sm text-navy-500 max-w-2xl mx-auto mt-3">
              Many credit services lead with aggressive repair language. Credit Vivo leads with education, review, prioritization, and customer control.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'No pressure funnel', desc: 'Start with a free Check-In and a plain explanation of what may matter.' },
              { title: 'No automatic sending', desc: 'Parser results are draft review data. Important actions should be reviewed first.' },
              { title: 'No outcome promises', desc: 'Accurate, current, and verifiable information may remain on a credit report.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 border border-navy-100/60">
                <h3 className="text-sm font-bold text-navy-900 mb-1">{item.title}</h3>
                <p className="text-xs text-navy-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">Our approach</p>
            <h2 className="text-2xl font-bold text-navy-900">What makes Credit Vivo different</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Target,
                title: 'Prioritized steps',
                desc: 'We do not send disputes for you or encourage blanket disputes. We help you review what may matter most right now.',
              },
              {
                icon: BookOpen,
                title: 'Plain-English guidance',
                desc: 'No confusing credit jargon. Every step is explained clearly so you understand what\'s happening.',
              },
              {
                icon: BarChart3,
                title: 'Monthly action plans',
                desc: 'A few focused steps each month, not a pile of confusing tasks. Progress you can actually track.',
              },
              {
                icon: Users,
                title: 'You stay in control',
                desc: 'You review choices before taking action. Nothing is sent, mailed, or submitted automatically.',
              },
              {
                icon: ShieldCheck,
                title: 'Honest about results',
                desc: 'We never promise guaranteed score increases or removals. Accurate information may remain.',
              },
              {
                icon: Clock,
                title: 'Ongoing tracking',
                desc: 'Know what you reviewed, what is pending, what changed, and what to focus on next.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-navy-50/50 rounded-xl p-5 border border-navy-100/60">
                <div className="w-9 h-9 bg-sky-100 rounded-lg flex items-center justify-center mb-3">
                  <Icon size={16} className="text-sky-600" />
                </div>
                <h3 className="text-sm font-bold text-navy-900 mb-1">{title}</h3>
                <p className="text-xs text-navy-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process flow */}
      <section className="py-16 bg-sky-50/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">The customer journey</p>
            <h2 className="text-2xl font-bold text-navy-900">From check-in to confidence</h2>
          </div>

          <div className="space-y-3">
            {[
              'Join Free',
              'Credit Check-In',
              'Credit Roadmap',
              'Monthly Action Plan',
              'Track Progress',
              'Learn as You Go',
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-navy-100/60">
                <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">{i + 1}</span>
                </div>
                <span className="text-sm font-semibold text-navy-800">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to get started?</h2>
          <p className="text-sm text-navy-300 mb-6">
            Start with a free Credit Check-In. No hard pull, no commitment.
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
