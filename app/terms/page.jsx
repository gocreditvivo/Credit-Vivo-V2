import BrandLogo from "../../components/BrandLogo";

export const metadata = {
  title: "Terms",
  description: "Credit Vivo website and portal terms.",
};

export default function TermsPage() {
  const terms = [
    ["Service", "Credit Vivo provides an educational software portal for credit report upload, customer-friendly findings, document organization, self-directed review workflow tracking, and educational guidance. Backend scanner rules are internal and are not shown as legal conclusions to customers."],
    ["Platform classification", "Credit Vivo is not a credit repair agency, credit repair organization, credit services organization, or law firm. Credit Vivo does not provide legal advice or perform credit repair services on your behalf."],
    ["Your free dispute rights", "You have the right to dispute inaccurate or incomplete information directly with credit bureaus and furnishers at no cost. Credit Vivo is not required for you to exercise those rights."],
    ["No guaranteed result", "Credit Vivo does not guarantee deletion of accounts, removal of accurate information, loan approval, credit score increases, or a specific timeline. Accurate negative information may remain on a credit report."],
    ["Customer responsibilities", "You agree to provide truthful information, review documents before they are sent, keep login information secure, and notify Credit Vivo about bureau or furnisher responses you receive."],
    ["Payments and third-party costs", "Monthly fees do not automatically include certified mail, postage, credit monitoring, identity verification, attorney review, third-party report access, or court/legal costs unless a written plan says they are included. Credit Vivo will not charge advance fees for credit repair services before legally permitted."],
    ["Electronic communications", "By choosing portal, email, or text updates, you consent to electronic communications about your account. Message and data rates may apply. You may change preferences in the portal or by contacting support."],
    ["Attorney services", "Attorney backup or escalation is available only when offered through a separate compliant arrangement. Credit Vivo does not provide legal advice unless an attorney-client relationship is separately created."],
    ["Cancellation", "Paid service agreements should include the cancellation rights required by federal and state law, including any applicable 3-business-day right to cancel without penalty. Credit Vivo should not charge for credit repair services before legally permitted under the applicable agreement."],
  ];

  return (
    <main style={{ fontFamily: "var(--cv-font)", background: "linear-gradient(180deg, #fffdf5 0%, #f0fdf4 48%, #eef9ff 100%)", minHeight: "100vh", padding: "32px 7% 70px", color: "#102033" }}>
      <BrandLogo />
      <h1 style={{ fontSize: 42 }}>Terms</h1>
      <section style={{ background: "rgba(255,255,255,.94)", border: "1px solid #cfeee0", borderRadius: 8, padding: 22, maxWidth: 900, lineHeight: 1.7, color: "#334155", boxShadow: "0 18px 42px rgba(16,32,51,.07)" }}>
        <p><strong>Draft for launch review.</strong> These website and portal terms should be reviewed by a qualified attorney before accepting paid customers.</p>
        {terms.map(([title, body]) => (
          <div key={title}>
            <h2 style={{ fontSize: 22, marginBottom: 6 }}>{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
