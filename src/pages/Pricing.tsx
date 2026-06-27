import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const betaFeatures = [
  'Free Credit Check-In',
  'No hard pull to start',
  'Plain-English roadmap',
  'Draft scanner findings for review',
  'Learning Center access',
  'No automatic disputes or letters',
];

export default function Pricing() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            Free Beta
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Free while Credit Vivo is in beta.
          </h1>
          <p className="text-[15px] text-navy-500 max-w-md mx-auto">
            No paid service is active yet. Start with the free Credit Check-In and help us refine the guided credit experience.
          </p>
        </div>
      </section>

      {/* Beta offer */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl p-6 bg-navy-900 text-white shadow-xl ring-2 ring-mint-500/40">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit mb-3 bg-mint-500/20 text-mint-300">
              Current beta
            </span>

            <h3 className="text-base font-bold mb-1 text-white">Credit Vivo Free Beta</h3>
            <p className="text-xs mb-4 text-navy-300">
              For consumers who want clarity, education, and a safer starting point before any paid service exists.
            </p>

            <div className="flex items-end gap-1 mb-5">
              <span className="text-3xl font-bold text-white">$0</span>
              <span className="text-xs pb-1 text-navy-400">during beta</span>
            </div>

            <Link to="/join" className="btn-mint text-xs py-2.5 w-full mb-5">
              Join Free Beta
            </Link>

            <ul className="space-y-2.5">
              {betaFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-xs">
                  <Check size={13} className="flex-shrink-0 mt-0.5 text-mint-400" />
                  <span className="text-navy-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-center text-[11px] text-navy-400 mt-8 max-w-lg mx-auto">
            Credit Vivo is not accepting paid credit services in beta. Credit Vivo does not guarantee score increases, removals, approvals, or specific outcomes.
          </p>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-12 bg-sky-50/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Beta gives clarity', desc: 'The free Credit Check-In gives consumers a simple starting point and helps them understand where to focus.' },
              { title: 'No payment required', desc: 'Credit Vivo should prove the scanner, education, and review flow before introducing paid memberships.' },
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
          <h2 className="text-xl font-bold text-white mb-3">Start your free Credit Check-In</h2>
          <p className="text-sm text-navy-300 mb-5">No hard pull. No payment. No commitment.</p>
          <Link to="/join" className="btn-mint text-sm py-3 px-7">
            Join Free Beta <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
