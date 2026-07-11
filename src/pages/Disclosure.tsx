const disclosures = [
  {
    title: 'Results are not guaranteed',
    body: 'Credit Vivo does not promise a specific score increase, loan approval, deletion, update, or outcome. Results vary by report data, bureau response, furnisher response, timing, customer documents, payment history, balances, and lender rules.',
  },
  {
    title: 'Accurate information may remain',
    body: 'Accurate, current, and verifiable negative information may remain on a credit report for the time allowed by law. Credit Vivo focuses on errors, inaccurate accounts, bad data, and customer-approved next steps.',
  },
  {
    title: 'Your free dispute rights',
    body: 'You have the right to dispute inaccurate or incomplete information directly with Experian, Equifax, TransUnion, furnishers, and consumer reporting agencies at no cost. Credit Vivo is not required for you to exercise those rights.',
  },
  {
    title: 'Customer approval before action',
    body: 'Credit Vivo may prepare scan results, dispute drafts, evidence checklists, letters, complaint packets, and escalation notes. Nothing is mailed, disputed, submitted, or escalated automatically without customer review and approval.',
  },
  {
    title: 'Attorney support',
    body: 'Attorney support may be available for eligible unresolved credit-reporting issues. Credit Vivo is not a law firm and does not provide legal advice. Attorney services, when available, require separate eligibility review and attorney engagement.',
  },
  {
    title: 'Score tools and estimates',
    body: 'Score goals, score paths, point estimates, simulations, and progress views are educational planning tools. Actual scores can differ by scoring model, bureau data, timing, lender criteria, new accounts, payments, balances, and credit activity.',
  },
  {
    title: 'Report upload and permission',
    body: 'Credit Vivo should only access, import, or analyze credit report data after the customer gives permission. Customers should upload or connect only reports and documents they are authorized to share.',
  },
  {
    title: 'Data and security',
    body: 'Credit Vivo should protect customer documents, identity information, credit report data, consent records, approval history, audit logs, and account data with secure storage, access controls, and encryption where appropriate.',
  },
  {
    title: 'Third-party costs',
    body: 'Credit monitoring, report access, identity verification, postage, certified mail, printing, legal services, and third-party vendor costs may be separate unless the customer plan clearly says they are included.',
  },
  {
    title: 'Federal consumer disclosure',
    body: 'You have the right to dispute inaccurate information in your credit report by contacting the credit bureau directly. Neither you nor any credit repair company or credit repair organization has the right to have accurate, current, and verifiable information removed from your credit report.',
  },
  {
    title: 'State launch review',
    body: 'Before paid launch, Credit Vivo should verify federal requirements and Maryland, Virginia, and Washington DC business, credit services, bond, license, cancellation, advertising, and consumer protection rules.',
  },
];

export default function Disclosure() {
  return (
    <>
      <section className="bg-gradient-to-b from-sky-50/50 to-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1.5 text-[11px] font-semibold text-sky-700">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            Disclosures
          </div>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-navy-900 sm:text-[38px]">
            Credit Vivo Disclosures
          </h1>
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-navy-500">
            The homepage stays simple. The important limits, rights, and approval rules live here.
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-xl border border-navy-100/60 bg-navy-50/50 p-6">
            <p className="mb-6 text-sm leading-relaxed text-navy-500">
              <strong className="text-navy-800">Important notice:</strong> Credit Vivo helps customers find score blockers, repair credit report errors, build dispute drafts, and track progress. Results are not guaranteed.
            </p>

            <div className="space-y-5">
              {disclosures.map((disclosure) => (
                <div key={disclosure.title}>
                  <h2 className="mb-1 text-sm font-bold text-navy-900">{disclosure.title}</h2>
                  <p className="text-sm leading-relaxed text-navy-500">{disclosure.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 border-t border-navy-100 pt-5 text-xs leading-relaxed text-navy-400">
              Launch preview status: this preview does not send real disputes, mail letters, contact furnishers, process payments, or provide legal advice.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
