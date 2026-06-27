import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Credit Check-In',
    badge: 'Free',
    desc: 'For a simple starting point.',
    price: '$0',
    cta: 'Join Free',
    ctaClass: 'btn-primary',
    to: '/join',
    features: ['Basic roadmap', 'Learning Center', 'Score basics', 'No hard pull to start'],
  },
  {
    name: 'Vivo Plus',
    badge: 'Most helpful',
    desc: 'For monthly credit guidance.',
    price: '$29',
    cta: 'Start Plus',
    ctaClass: 'btn-mint',
    to: '/dashboard',
    featured: true,
    features: ['Monthly action plan', 'Clean-up progress', 'Score opportunities', 'Action tracker', 'Updates and reminders'],
  },
  {
    name: 'Vivo Max',
    badge: 'Extra support',
    desc: 'For deeper support and tracking.',
    price: '$49',
    cta: 'Start Max',
    ctaClass: 'btn-primary',
    to: '/dashboard',
    features: ['Everything in Plus', 'Advanced review', 'More tracking', 'Priority support', 'Optional legal support path'],
  },
];

export default function Pricing() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            Pricing
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Your credit, your way.
          </h1>
          <p className="text-[15px] text-navy-500 max-w-md mx-auto">
            Start free. Upgrade when you want monthly guidance, tracking, and support.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 flex flex-col ${
                  plan.featured
                    ? 'bg-navy-900 text-white shadow-xl ring-2 ring-mint-500/40'
                    : 'bg-navy-50/50 border border-navy-100/60'
                }`}
              >
                <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit mb-3 ${
                  plan.featured ? 'bg-mint-500/20 text-mint-300' : 'bg-sky-100 text-sky-700'
                }`}>
                  {plan.badge}
                </span>

                <h3 className={`text-base font-bold mb-1 ${plan.featured ? 'text-white' : 'text-navy-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-4 ${plan.featured ? 'text-navy-300' : 'text-navy-500'}`}>
                  {plan.desc}
                </p>

                <div className="flex items-end gap-1 mb-5">
                  <span className={`text-3xl font-bold ${plan.featured ? 'text-white' : 'text-navy-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-xs pb-1 ${plan.featured ? 'text-navy-400' : 'text-navy-400'}`}>/mo</span>
                </div>

                <Link
                  to={plan.to}
                  className={`${plan.ctaClass} text-xs py-2.5 w-full mb-5`}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs">
                      <Check size={13} className={`flex-shrink-0 mt-0.5 ${plan.featured ? 'text-mint-400' : 'text-mint-600'}`} />
                      <span className={plan.featured ? 'text-navy-200' : 'text-navy-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-navy-400 mt-8 max-w-lg mx-auto">
            Pricing is placeholder and should be reviewed before accepting payments. Credit Vivo does not guarantee score increases or removals.
          </p>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-12 bg-sky-50/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Free gives clarity', desc: 'The free Credit Check-In gives customers a simple starting point and helps them understand where to focus.' },
              { title: 'Monthly plans give guidance', desc: 'Paid plans are built around monthly progress: score opportunities, clean-up steps, tracking, learning, and updates.' },
              { title: 'Extra costs are optional', desc: 'If a customer chooses optional mailing, legal, identity, or credit-building partner services, those should be clearly explained before approval.' },
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
          <h2 className="text-xl font-bold text-white mb-3">Start your free Credit Check-In</h2>
          <p className="text-sm text-navy-300 mb-5">No hard pull. No commitment.</p>
          <Link to="/join" className="btn-mint text-sm py-3 px-7">
            Join Free <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
