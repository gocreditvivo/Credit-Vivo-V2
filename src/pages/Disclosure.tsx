const disclosures = [
  {
    title: 'Your free dispute rights',
    body: 'You have the right to dispute inaccurate or incomplete information directly with Experian, Equifax, TransUnion, furnishers, and consumer reporting agencies at no cost.',
  },
  {
    title: 'No promise of deletion',
    body: 'Credit Vivo may identify possible issues and organize next steps, but it cannot guarantee that any credit bureau or furnisher will delete, update, or change an account.',
  },
  {
    title: 'Accurate information',
    body: 'Accurate, verifiable negative information may legally remain on a credit report for the allowed reporting period.',
  },
  {
    title: 'Score expectations',
    body: 'Any score simulator, estimated impact, or monthly progress view is educational only. Actual scores depend on the scoring model, bureau data, timing, new accounts, balances, payments, and lender criteria.',
  },
  {
    title: 'Scanner-assisted review',
    body: 'Scanner output may help organize data, find inconsistencies, and draft plain-English explanations. It is not a credit bureau decision, legal advice, or a substitute for customer review.',
  },
  {
    title: 'Attorney escalation',
    body: 'Attorney backup is reserved for eligible cases and requires a separate compliant relationship. It should be used after ordinary dispute and escalation steps when appropriate.',
  },
  {
    title: 'Mail and document costs',
    body: 'Certified mail, postage, printing, identity verification, report access, credit monitoring, and third-party vendor costs may be separate unless your written plan says they are included.',
  },
  {
    title: 'Virginia-first launch',
    body: 'Before any paid launch, Credit Vivo should verify federal requirements and Virginia, Maryland, and DC business, credit services, bond or license, cancellation, advertising, and consumer protection rules.',
  },
];

export default function Disclosure() {
  return (
    <>
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            Disclosure
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Consumer Disclosure
          </h1>
          <p className="text-[15px] text-navy-500 max-w-xl mx-auto leading-relaxed">
            Important service disclosures and consumer rights before using Credit Vivo.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-navy-50/50 rounded-xl p-6 border border-navy-100/60">
            <p className="text-sm text-navy-500 leading-relaxed mb-6">
              <strong className="text-navy-800">Important consumer notice:</strong> Credit
              Vivo is not a credit bureau, lender, government agency, law firm, or credit
              score company.
            </p>

            <div className="space-y-5">
              {disclosures.map((disclosure) => (
                <div key={disclosure.title}>
                  <h2 className="text-sm font-bold text-navy-900 mb-1">{disclosure.title}</h2>
                  <p className="text-sm text-navy-500 leading-relaxed">{disclosure.body}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-navy-400 leading-relaxed mt-6 pt-5 border-t border-navy-100">
              Launch preview status: this preview does not send real disputes, mail letters,
              contact furnishers, send SMS/email, process payments, or provide legal advice.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
