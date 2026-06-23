import BrandLogo from "../../components/BrandLogo";

export const metadata = {
  title: "Disclosure",
  description: "Credit Vivo service disclosures and consumer rights.",
};

export default function DisclosurePage() {
  const disclosures = [
    ["Your free dispute rights", "You have the right to dispute inaccurate or incomplete information directly with Experian, Equifax, TransUnion, furnishers, and consumer reporting agencies at no cost."],
    ["No promise of deletion", "Credit Vivo may identify possible issues and organize next steps, but it cannot guarantee that any credit bureau or furnisher will delete, update, or change an account."],
    ["Accurate information", "Accurate, verifiable negative information may legally remain on a credit report for the allowed reporting period."],
    ["Score expectations", "Any score simulator, estimated impact, or monthly progress view is educational only. Actual scores depend on the scoring model, bureau data, timing, new accounts, balances, payments, and lender criteria."],
    ["AI-assisted review", "AI may help organize data, find inconsistencies, and draft plain-English explanations. AI review is not a credit bureau decision, legal advice, or a substitute for customer review."],
    ["Attorney escalation", "Attorney backup is reserved for eligible cases and requires a separate compliant relationship. It should be used after ordinary dispute and escalation steps when appropriate."],
    ["Mail and document costs", "Certified mail, postage, printing, identity verification, report access, credit monitoring, and third-party vendor costs may be separate unless your written plan says they are included."],
    ["Virginia-first launch", "Before paid launch, Credit Vivo should verify federal requirements and Virginia, Maryland, and DC business, credit services, bond/license, cancellation, advertising, and consumer protection rules."],
  ];

  return (
    <main style={{ fontFamily: "var(--cv-font)", background: "linear-gradient(180deg, #fffdf5 0%, #f0fdf4 48%, #eef9ff 100%)", minHeight: "100vh", padding: "32px 7% 70px", color: "#102033" }}>
      <BrandLogo />
      <h1 style={{ fontSize: 42 }}>Disclosure</h1>
      <section style={{ background: "rgba(255,255,255,.94)", border: "1px solid #cfeee0", borderRadius: 8, padding: 22, maxWidth: 900, lineHeight: 1.7, color: "#334155", boxShadow: "0 18px 42px rgba(16,32,51,.07)" }}>
        <p><strong>Important consumer notice:</strong> Credit Vivo is not a credit bureau, lender, government agency, law firm, or credit score company.</p>
        {disclosures.map(([title, body]) => (
          <div key={title}>
            <h2 style={{ fontSize: 22, marginBottom: 6 }}>{title}</h2>
            <p>{body}</p>
          </div>
        ))}
        <p><strong>Launch preview status:</strong> this preview does not send real disputes, mail letters, contact furnishers, send SMS/email, process payments, or provide legal advice.</p>
      </section>
    </main>
  );
}
