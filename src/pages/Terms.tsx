const terms = [
  {
    title: 'Service',
    body: 'Credit Vivo provides a portal for credit report upload, customer-friendly findings, document organization, review workflow tracking, and educational guidance. Scanner rules are internal and are not shown as legal conclusions to customers.',
  },
  {
    title: 'No guaranteed result',
    body: 'Credit Vivo does not guarantee deletion of accounts, removal of accurate information, loan approval, credit score increases, or a specific timeline. Accurate negative information may remain on a credit report.',
  },
  {
    title: 'Customer responsibilities',
    body: 'You agree to provide truthful information, review documents before they are sent, keep login information secure, and notify Credit Vivo about bureau or furnisher responses you receive.',
  },
  {
    title: 'Payments and third-party costs',
    body: 'Monthly fees do not automatically include certified mail, postage, credit monitoring, identity verification, attorney review, third-party report access, or legal costs unless a written plan says they are included.',
  },
  {
    title: 'Electronic communications',
    body: 'By choosing portal, email, or text updates, you consent to electronic communications about your account. Message and data rates may apply. You may change preferences in the portal or by contacting support.',
  },
  {
    title: 'Attorney services',
    body: 'Attorney backup or escalation is available only when offered through a separate compliant arrangement. Credit Vivo does not provide legal advice unless an attorney-client relationship is separately created.',
  },
  {
    title: 'Cancellation',
    body: 'Paid service agreements should include cancellation rights required by federal and state law. Credit Vivo should not charge for credit repair services before legally permitted under the applicable agreement.',
  },
];

export default function Terms() {
  return (
    <>
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            Terms
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Terms
          </h1>
          <p className="text-[15px] text-navy-500 max-w-xl mx-auto leading-relaxed">
            Website and portal terms for Credit Vivo customers and visitors.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-navy-50/50 rounded-xl p-6 border border-navy-100/60">
            <p className="text-sm text-navy-500 leading-relaxed mb-6">
              <strong className="text-navy-800">Draft for launch review.</strong> These
              website and portal terms should be reviewed by a qualified attorney before
              accepting paid customers.
            </p>

            <div className="space-y-5">
              {terms.map((term) => (
                <div key={term.title}>
                  <h2 className="text-sm font-bold text-navy-900 mb-1">{term.title}</h2>
                  <p className="text-sm text-navy-500 leading-relaxed">{term.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
