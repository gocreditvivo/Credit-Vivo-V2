import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    badge: 'DIY support',
    name: 'AI Guided',
    price: '$29',
    cadence: '/mo',
    description: 'For customers who want guidance, education, and draft-ready documents.',
    cta: 'Choose AI Guided',
    to: '/join',
    featured: false,
    features: [
      'AI findings dashboard',
      'Draft dispute letter workspace',
      'Learning path and reminders',
      'Monthly roadmap updates',
    ],
  },
  {
    badge: 'Popular',
    name: 'Vivo Plus',
    price: '$59',
    cadence: '/mo',
    description: 'A managed workflow for bureau disputes, furnisher follow-up, and progress updates.',
    cta: 'Choose Vivo Plus',
    to: '/join',
    featured: true,
    features: [
      'Bureau dispute workflow',
      'Furnisher validation workflow',
      'Portal progress updates',
      'Document vault organization',
    ],
  },
  {
    badge: 'Top tier',
    name: 'Attorney Assist',
    price: '$99',
    cadence: '/mo',
    description: 'For customers who may need attorney-ready escalation after normal disputes.',
    cta: 'Check Eligibility',
    to: '/join',
    featured: false,
    features: [
      'Attorney-ready evidence packet',
      'Escalation review eligibility',
      'CFPB and state complaint prep',
      'Advanced response tracking',
    ],
  },
];

export default function Pricing() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-emerald-50/70 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
            Pricing
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Simple packages for every stage.
          </h1>
          <p className="text-[15px] text-navy-500 max-w-xl mx-auto">
            Start with a free Credit Check-In, then choose from three package levels when paid plans are active.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Free entry point</p>
              <h2 className="mt-1 text-base font-bold text-navy-900">Free Credit Check-In</h2>
              <p className="mt-1 text-xs text-navy-500">
                Start with secure upload, plain-English issue preview, credit goal intake, and Learning Center access.
              </p>
            </div>
            <Link to="/join" className="btn-primary shrink-0 text-xs py-2.5">
              Start Free
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 shadow-sm ${
                  plan.featured
                    ? 'border-emerald-300 bg-gradient-to-b from-white to-emerald-50/60 shadow-emerald-900/10 ring-2 ring-emerald-100'
                    : 'border-navy-100 bg-white'
                }`}
              >
                <span
                  className={`mb-4 w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    plan.featured
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {plan.badge}
                </span>
                <h2 className="text-lg font-bold text-navy-900">{plan.name}</h2>
                <p className="mt-2 min-h-[54px] text-xs leading-relaxed text-navy-500">
                  {plan.description}
                </p>
                <div className="my-6 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-navy-900">{plan.price}</span>
                  {plan.cadence && (
                    <span className="pb-1 text-sm font-semibold text-navy-400">{plan.cadence}</span>
                  )}
                </div>
                <Link
                  to={plan.to}
                  className={`${plan.featured ? 'btn-primary' : 'btn-soft'} mb-6 w-full text-xs py-2.5`}
                >
                  {plan.cta}
                  <ArrowRight size={14} />
                </Link>
                <ul className="mt-auto space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-navy-600">
                      <Check size={13} className="mt-0.5 flex-shrink-0 text-emerald-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">
            <p className="text-xs leading-relaxed text-amber-900">
              <strong>Launch note:</strong> Pricing shown is planned package positioning. Credit Vivo is not accepting paid credit repair services until final terms, disclosures, cancellation rights, and payment processing are approved. Credit Vivo does not guarantee score increases, removals, approvals, or specific outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-12 bg-sky-50/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Start with free clarity', desc: 'The free Credit Check-In gives consumers a simple starting point and helps them understand where to focus.' },
              { title: 'Upgrade when ready', desc: 'Paid tiers are designed around more guidance, tracking, document organization, and escalation support.' },
              { title: 'Review comes first', desc: 'Draft findings are for review only. Nothing should be sent, mailed, or escalated without approval.' },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-xl p-5 border border-navy-100/60">
                <h3 className="text-sm font-bold text-navy-900 mb-2">{card.title}</h3>
                <p className="text-xs text-navy-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Start with the free Credit Check-In</h2>
          <p className="text-sm text-navy-300 mb-5">No hard pull to start. Review first. Upgrade later when paid plans are active.</p>
          <Link to="/join" className="btn-mint text-sm py-3 px-7">
            Start Free <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
