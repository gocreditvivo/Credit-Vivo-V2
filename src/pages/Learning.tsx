import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const lessons = [
  { cat: 'Beginner', title: 'What affects your score?', desc: 'Payment history, balances, credit age, new applications, and account mix all matter.' },
  { cat: 'Beginner', title: 'Why payment history matters', desc: 'Late payments can hurt because lenders want to know if you pay on time.' },
  { cat: 'Beginner', title: 'Why balances matter', desc: 'High credit card balances can hurt your score profile even if you pay every month.' },
  { cat: 'Beginner', title: 'When should I pay my card?', desc: 'Paying before the statement date may help a lower balance report.' },
  { cat: 'Report Review', title: 'What is a credit report error?', desc: 'An error may be information that is wrong, incomplete, outdated, duplicated, or not yours.' },
  { cat: 'Report Review', title: 'What is a collection?', desc: 'A collection means a debt may have been sent or sold to a collector. It should be reviewed carefully.' },
  { cat: 'Report Review', title: 'What is collection validation?', desc: 'It means a consumer may ask selected collectors to confirm important debt details before deciding next steps.' },
  { cat: 'Report Review', title: 'Why not dispute everything at once?', desc: 'A step-by-step review can avoid confusion, unnecessary cost, and weak or unsupported actions.' },
  { cat: 'Progress', title: 'What does verified mean?', desc: 'Verified means the item stayed after review. It does not always mean follow-up is impossible.' },
  { cat: 'Progress', title: 'Why track everything?', desc: 'Tracking helps you know what was sent, what is pending, and what to do next.' },
  { cat: 'Goals', title: 'Before buying a car', desc: 'Lower balances, avoid unnecessary applications, and review your report before applying.' },
  { cat: 'Goals', title: 'Before buying a home', desc: 'Start early, keep payments on time, lower balances, and avoid new debt.' },
];

const catColors: Record<string, string> = {
  Beginner: 'text-sky-600',
  'Report Review': 'text-mint-600',
  Progress: 'text-navy-600',
  Goals: 'text-amber-600',
};

export default function Learning() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            Learning
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Credit basics made simple.
          </h1>
          <p className="text-[15px] text-navy-500">
            Short lessons that explain what matters without overwhelming you.
          </p>
        </div>
      </section>

      {/* Lessons */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((l) => (
              <div key={l.title} className="bg-navy-50/50 rounded-xl p-5 border border-navy-100/60 hover:shadow-sm transition-shadow">
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${catColors[l.cat] || 'text-sky-600'}`}>
                  {l.cat}
                </span>
                <h3 className="text-sm font-bold text-navy-900 mt-1.5 mb-1.5">{l.title}</h3>
                <p className="text-xs text-navy-500 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Ready to put this into action?</h2>
          <p className="text-sm text-navy-300 mb-5">Start your free Credit Check-In and get your personalized roadmap.</p>
          <Link to="/join" className="btn-mint text-sm py-3 px-7">
            Join Free <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
