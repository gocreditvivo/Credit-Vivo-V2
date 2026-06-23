import BrandLogo from "../../components/BrandLogo";

export const metadata = {
  title: "FAQ",
  description: "Credit Vivo frequently asked questions.",
};

export default function FAQPage() {
  const faqs = [
    ["Does Credit Vivo guarantee a score increase?", "No. The portal helps identify possible credit report inaccuracies and track next steps. It does not promise a specific score result."],
    ["Can I dispute credit report errors myself?", "Yes. You can dispute inaccurate or incomplete information directly with credit bureaus and furnishers at no cost."],
    ["Do accurate negative accounts come off?", "Not just because they are negative. Accurate and verifiable information may remain for the legal reporting period."],
    ["Does the monthly fee include certified mail?", "Not automatically. Postage, certified mail, printing, report access, credit monitoring, identity verification, and attorney review should be listed separately unless your plan says they are included."],
    ["Are texts and emails sent in this preview?", "No. The launch preview shows queued portal, email, and text style updates without sending real messages."],
    ["Can I upload reports manually?", "Yes. The launch preview supports manual report upload and manual staff review status."],
    ["Do customers see forensic scanner logs?", "No. Customers see simple explanations. Backend scanner details stay internal."],
    ["Is this legal advice?", "No. Attorney backup and escalation need a compliant attorney relationship before legal advice is provided."],
  ];

  return (
    <main style={{ fontFamily: "var(--cv-font)", background: "linear-gradient(180deg, #fffdf5 0%, #f0fdf4 48%, #eef9ff 100%)", minHeight: "100vh", padding: "32px 7% 70px", color: "#102033" }}>
      <BrandLogo />
      <h1 style={{ fontSize: 42 }}>FAQ</h1>
      <section style={{ display: "grid", gap: 14, maxWidth: 900 }}>
        {faqs.map(([question, answer]) => (
          <div key={question} style={{ background: "rgba(255,255,255,.94)", border: "1px solid #cfeee0", borderRadius: 8, padding: 20, boxShadow: "0 18px 42px rgba(16,32,51,.07)" }}>
            <h2 style={{ marginTop: 0 }}>{question}</h2>
            <p style={{ color: "#475569", lineHeight: 1.65 }}>{answer}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
