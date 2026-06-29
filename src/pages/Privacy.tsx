const sections = [
  {
    title: 'Information we collect',
    body: 'Credit Vivo may collect your name, email, phone number, login details, communication preferences, uploaded credit reports, dispute documents, bureau or furnisher responses, beta participation details, and portal activity.',
  },
  {
    title: 'Credit and identity information',
    body: 'If you choose to connect or upload credit information, Credit Vivo may process report data, account names, balances, payment history, dispute notes, identity verification details, and provider metadata needed to run the scanner and track your case.',
  },
  {
    title: 'How we use information',
    body: 'We use information to provide the portal, prepare customer-friendly findings, track review steps, store documents, send requested updates, support your account, maintain compliance records, and improve the service.',
  },
  {
    title: 'How we protect information',
    body: 'Production use should include encryption in transit and at rest, limited employee access, admin MFA, audit logs, vendor security review, secure backups, retention rules, and secure deletion when records are no longer needed.',
  },
  {
    title: 'Sharing',
    body: 'We may share information with vendors that help provide hosting, secure storage, identity verification, payments, email, SMS, certified mail, analytics, customer support, and attorney escalation when requested and eligible. We do not sell customer credit reports.',
  },
  {
    title: 'Report providers and service vendors',
    body: 'Before production launch, each credit API, payment, mail, SMS, analytics, hosting, and attorney-review vendor should be listed in the internal vendor register with the data shared, purpose, security terms, retention limits, and customer consent language.',
  },
  {
    title: 'Retention and deletion',
    body: 'Credit Vivo should keep credit reports, dispute letters, response records, audit logs, and consent records only as long as needed for service, legal, fraud-prevention, tax, dispute, and compliance reasons, then delete or de-identify them under a written retention schedule.',
  },
  {
    title: 'Your choices',
    body: 'You may update communication preferences, request access to account records, ask for deletion where legally available, and cancel services under the applicable agreement. Some records may be retained for legal, fraud prevention, dispute, tax, and compliance purposes.',
  },
  {
    title: 'Privacy rights',
    body: 'Depending on your state, you may have rights to know, access, correct, delete, or limit certain uses of personal information. Credit Vivo should verify your identity before completing privacy requests.',
  },
];

export default function Privacy() {
  return (
    <>
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            Privacy
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Privacy Notice
          </h1>
          <p className="text-[15px] text-navy-500 max-w-xl mx-auto leading-relaxed">
            How Credit Vivo should collect, use, protect, and share customer information.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-navy-50/50 rounded-xl p-6 border border-navy-100/60">
            <p className="text-sm text-navy-500 leading-relaxed mb-6">
              <strong className="text-navy-800">Draft for launch review.</strong> This notice
              explains the privacy structure Credit Vivo should use during free beta and
              before any paid services are introduced. Final language should be reviewed by a qualified attorney.
            </p>

            <div className="space-y-5">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-sm font-bold text-navy-900 mb-1">{section.title}</h2>
                  <p className="text-sm text-navy-500 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-navy-400 leading-relaxed mt-6 pt-5 border-t border-navy-100">
              Do not upload a full Social Security number, government ID, or sensitive document
              unless Credit Vivo specifically requests it through the secure portal.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
