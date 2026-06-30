import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const plans = [
  {
    badge: 'Start here',
    name: 'Free Scan',
    price: '$0',
    cadence: '',
    description: 'Score blocker preview.',
    cta: 'Start Free Scan',
    to: '/scan',
    featured: false,
    features: ['Upload report', 'Point blocker preview', 'Recommended boost action'],
  },
  {
    badge: 'Popular',
    name: 'Core',
    price: '$79',
    cadence: '/mo',
    description: 'AI findings and dispute builder.',
    cta: 'Choose Core',
    to: '/join',
    featured: true,
    features: ['AI point blockers', 'Dispute builder', 'Progress tracker'],
  },
  {
    badge: 'More support',
    name: 'Plus',
    price: '$119',
    cadence: '/mo',
    description: 'Bureau + furnisher action support.',
    cta: 'Choose Plus',
    to: '/join',
    featured: false,
    features: ['Furnisher disputes', 'Debt validation', 'Attorney-ready packet'],
  },
];

export default function Pricing() {
  return (
    <>
      <section className="bg-gradient-to-b from-emerald-50/80 to-white py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
            Plans
          </div>
          <h1 className="text-4xl font-black tracking-tight text-navy-950 sm:text-5xl">
            Plans for your score goals.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-navy-500">
            Start with a free score blocker scan. Add support when your file needs more help.
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`flex flex-col rounded-3xl border p-6 shadow-sm ${
                  plan.featured
                    ? 'border-emerald-300 bg-gradient-to-b from-white to-emerald-50/70 shadow-emerald-900/10 ring-2 ring-emerald-100'
                    : 'border-navy-100 bg-white shadow-navy-100/60'
                }`}
              >
                <span
                  className={`mb-5 w-fit rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                    plan.featured ? 'bg-emerald-600 text-white' : 'bg-navy-50 text-navy-500'
                  }`}
                >
                  {plan.badge}
                </span>
                <h2 className="text-xl font-black text-navy-950">{plan.name}</h2>
                <p className="mt-2 text-sm text-navy-500">{plan.description}</p>
                <div className="my-7 flex items-end gap-1">
                  <span className="text-5xl font-black tracking-tight text-navy-950">{plan.price}</span>
                  {plan.cadence && <span className="pb-1 text-sm font-bold text-navy-400">{plan.cadence}</span>}
                </div>
                <Link
                  to={plan.to}
                  className={`${plan.featured ? 'btn-primary' : 'btn-soft'} mb-7 w-full justify-center py-3 text-sm`}
                >
                  {plan.cta}
                  <ArrowRight size={15} />
                </Link>
                <ul className="mt-auto space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-navy-600">
                      <Check size={15} className="mt-0.5 flex-shrink-0 text-emerald-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-navy-100 bg-navy-50/60 p-6">
            <h2 className="text-lg font-black text-navy-950">Attorney Support</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-500">
              For harder unresolved blockers, CreditVivo can help organize an attorney-ready packet for eligible review.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-14">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-black tracking-tight text-white">Start with the free score scan.</h2>
          <p className="mt-3 text-sm text-navy-300">
            Find what is costing you points. Take action. Track progress.
          </p>
          <Link to="/scan" className="btn-mint mt-7 px-6 py-3 text-sm">
            Start Free Scan
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
