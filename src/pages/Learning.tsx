import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileSearch, Landmark, Scale, ShieldCheck } from 'lucide-react';

const lessons = [
  { cat: 'Report Basics', title: 'What is on a credit report?', desc: 'Your report can show personal information, accounts, balances, payment history, collections, inquiries, and public-record style information when applicable.' },
  { cat: 'Report Basics', title: 'Why three reports can differ', desc: 'Equifax, Experian, and TransUnion may receive different updates from furnishers, so the same account can look different by bureau.' },
  { cat: 'Score Basics', title: 'What affects your score?', desc: 'Payment history, balances, credit age, new applications, and account mix can all matter.' },
  { cat: 'Score Basics', title: 'Why balances matter', desc: 'High credit card balances can create point pressure even when you pay every month.' },
  { cat: 'Point Blockers', title: 'What is a report error?', desc: 'An error may be information that is wrong, incomplete, outdated, duplicated, mixed with another person, or not yours.' },
  { cat: 'Point Blockers', title: 'What CreditVivo checks', desc: 'CreditVivo compares account names, balances, status, dates, payment history, collections, and bureau-to-bureau differences.' },
  { cat: 'Disputes', title: 'When to dispute', desc: 'Dispute information when you believe it is inaccurate, incomplete, unverifiable, outdated, duplicated, or belongs to someone else.' },
  { cat: 'Disputes', title: 'What to include', desc: 'A stronger dispute names the exact account, exact field, why it appears wrong, and the proof you want reviewed.' },
  { cat: 'Disputes', title: 'Why not dispute everything at once?', desc: 'A step-by-step review can avoid weak, unsupported, or confusing disputes.' },
  { cat: 'Progress', title: 'What does verified mean?', desc: 'Verified means the item stayed after review. It may still need new evidence, furnisher review, a statement, or escalation review.' },
  { cat: 'Progress', title: 'Why track everything?', desc: 'Tracking helps you know what was sent, what is pending, what changed, and what the next safe step is.' },
  { cat: 'Collections', title: 'What is a collection?', desc: 'A collection means a debt may have been sent or sold to a collector. It should be reviewed for ownership, balance, dates, and reporting status.' },
  { cat: 'Collections', title: 'What is debt validation?', desc: 'For some collection situations, a consumer may ask a debt collector to verify key debt details before deciding next steps.' },
  { cat: 'Goals', title: 'Before buying a car', desc: 'Review your reports early, lower balances where possible, avoid unnecessary applications, and understand any unresolved negative items.' },
  { cat: 'Goals', title: 'Before buying a home', desc: 'Start early, keep payments on time, lower balances, avoid new debt, and track any dispute or correction timeline.' },
];

const catColors: Record<string, string> = {
  'Report Basics': 'text-sky-600',
  'Score Basics': 'text-emerald-600',
  'Point Blockers': 'text-mint-600',
  Disputes: 'text-indigo-600',
  Progress: 'text-navy-600',
  Collections: 'text-rose-600',
  Goals: 'text-amber-600',
};

const disputeOutcomes = [
  { label: 'Added', meaning: 'An item was added to the report.', next: 'Review whether it belongs to you and whether the account details are accurate.' },
  { label: 'Updated', meaning: 'Information was changed.', next: 'Compare before and after values. Updated does not always mean fully fixed.' },
  { label: 'Verified and updated', meaning: 'The disputed information was verified, but another detail changed.', next: 'Check whether the exact disputed field was actually corrected.' },
  { label: 'Deleted', meaning: 'The item was removed.', next: 'Mark that bureau item resolved and watch for reinsertion or mismatches on other bureaus.' },
  { label: 'Processed', meaning: 'The item was updated or deleted.', next: 'Review the new report before deciding whether the issue is resolved.' },
  { label: 'Remains', meaning: 'The furnisher verified the information as accurate.', next: 'Review proof, consider furnisher dispute, statement, CFPB/state review, or attorney review.' },
];

const bureauSteps = [
  { bureau: 'Equifax', text: 'Review the item, gather proof, then dispute online or by mail when information appears wrong or incomplete.' },
  { bureau: 'Experian', text: 'Track the result language carefully. Outcomes such as Remains or Verified and updated may need a different next step.' },
  { bureau: 'TransUnion', text: 'Use supporting documents and track the result. Compare any change against the other two bureaus.' },
];

const rights = [
  { icon: FileSearch, title: 'You can review your file', text: 'You have the right to know what is in your consumer reporting file after proper identification.' },
  { icon: ShieldCheck, title: 'You can dispute errors', text: 'Incomplete, inaccurate, outdated, unverifiable, or not-mine information can be disputed.' },
  { icon: Scale, title: 'Collectors have rules', text: 'Debt collectors have FDCPA limits around validation, contact, harassment, false statements, and disputed debts.' },
  { icon: Landmark, title: 'Escalation can exist', text: 'Unresolved issues may be reviewed for CFPB, state, regulator, or attorney escalation after approval.' },
];

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
            Learn what can affect your points.
          </h1>
          <p className="text-[15px] text-navy-500">
            Simple lessons on score factors, three-bureau differences, disputes, and progress tracking.
          </p>
        </div>
      </section>

      {/* Bureau-aware overview */}
      <section className="py-10 bg-white border-y border-navy-100/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-6 items-start">
            <div>
              <div className="flex items-center gap-2 text-sky-700 mb-3">
                <BookOpen size={18} />
                <span className="text-[11px] font-bold uppercase tracking-wider">Bureau basics</span>
              </div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">The same account can affect each bureau differently.</h2>
              <p className="text-sm text-navy-500 leading-relaxed">
                Equifax, Experian, and TransUnion each maintain separate credit files. A lender, collector, or servicer may update one bureau differently than another. CreditVivo helps compare the same account side by side so you can see the exact field that may be a point blocker.
              </p>
            </div>
            <div className="grid gap-3">
              {bureauSteps.map((item) => (
                <div key={item.bureau} className="rounded-lg border border-navy-100 bg-navy-50/50 p-4">
                  <h3 className="text-sm font-bold text-navy-900">{item.bureau}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-navy-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
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

      {/* Dispute outcomes */}
      <section className="py-12 bg-navy-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-indigo-700">Dispute results</p>
            <h2 className="text-xl font-bold text-navy-900">What bureau outcome words usually mean</h2>
          </div>
          <div className="overflow-x-auto rounded-lg border border-navy-100 bg-white">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[0.8fr_1.2fr_1.5fr] bg-navy-900 text-white text-xs font-bold">
                <div className="p-3">Outcome</div>
                <div className="p-3">Meaning</div>
                <div className="p-3">Credit Vivo next-step review</div>
              </div>
              {disputeOutcomes.map((item) => (
                <div key={item.label} className="grid grid-cols-[0.8fr_1.2fr_1.5fr] border-t border-navy-100 text-xs">
                  <div className="p-3 font-bold text-navy-900">{item.label}</div>
                  <div className="p-3 text-navy-600">{item.meaning}</div>
                  <div className="p-3 text-navy-500">{item.next}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rights */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-navy-100 bg-white p-5">
                  <Icon size={20} className="text-mint-600 mb-3" />
                  <h3 className="text-sm font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-navy-500">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Ready to find your blockers?</h2>
          <p className="text-sm text-navy-300 mb-5">Start your free score scan and build your action board.</p>
          <Link to="/scan" className="btn-mint text-sm py-3 px-7">
            Start Free Scan <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
