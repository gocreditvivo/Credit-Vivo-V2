import BrandLogo from "../../components/BrandLogo";

export const metadata = {
  title: "Privacy Notice",
  description: "How Credit Vivo collects, uses, protects, and shares customer information.",
};

export default function PrivacyPage() {
  const sections = [
    ["Information we collect", "Credit Vivo may collect your name, email, phone number, login details, communication preferences, uploaded credit reports, identity documents, utility bills, dispute letters, bureau/furnisher responses, payment status, and portal activity."],
    ["How we use information", "We use this information to provide the portal, prepare customer-friendly findings, track dispute rounds, store documents, send requested updates, support your account, maintain compliance records, and improve our service."],
    ["How we protect information", "Production use requires encryption in transit and at rest, limited employee access, MFA for admin users, audit logs, vendor security review, secure backups, retention rules, and secure deletion when records are no longer needed."],
    ["Sharing", "We may share information with vendors that help provide hosting, secure storage, identity verification, payments, email, SMS, certified mail, analytics, customer support, and attorney escalation when requested and eligible. We do not sell customer credit reports."],
    ["Your choices", "You may update communication preferences, request access to your account records, ask for deletion where legally available, and cancel services under the applicable agreement. Some records may be retained for legal, fraud prevention, dispute, tax, and compliance purposes."],
  ];

  return (
    <main style={{ fontFamily: "var(--cv-font)", background: "linear-gradient(180deg, #fffdf5 0%, #f0fdf4 48%, #eef9ff 100%)", minHeight: "100vh", padding: "32px 7% 70px", color: "#102033" }}>
      <BrandLogo />
      <h1 style={{ fontSize: 42 }}>Privacy Notice</h1>
      <section style={{ background: "rgba(255,255,255,.94)", border: "1px solid #cfeee0", borderRadius: 8, padding: 22, maxWidth: 900, lineHeight: 1.7, color: "#334155", boxShadow: "0 18px 42px rgba(16,32,51,.07)" }}>
        <p><strong>Draft for launch review.</strong> This notice explains the privacy structure Credit Vivo should use before accepting paid customers. Final language should be reviewed by a qualified attorney.</p>
        {sections.map(([title, body]) => (
          <div key={title}>
            <h2 style={{ fontSize: 22, marginBottom: 6 }}>{title}</h2>
            <p>{body}</p>
          </div>
        ))}
        <p><strong>Important:</strong> do not upload a full Social Security number, government ID, or sensitive document unless Credit Vivo specifically requests it through the secure portal.</p>
      </section>
    </main>
  );
}
