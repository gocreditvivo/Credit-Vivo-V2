import Link from "next/link";
import BrandLogo from "../../components/BrandLogo";

export const metadata = {
  title: "Pricing",
  description: "Credit Vivo simulated pricing and service tiers.",
};

export default function PricingPage() {
  const plans = [
    ["Free Scan", "$0", "Upload a report and preview possible issues.", "Best for seeing what the portal finds."],
    ["Vivo Assist", "$49/mo", "Portal updates, simple findings, document vault, and dispute draft tracking.", "Lower-cost assisted workflow."],
    ["Vivo Pro", "$79/mo", "Includes simulated bureau and furnisher package workflow plus follow-up schedule.", "Main credit repair style plan."],
    ["Attorney Backup", "$129/mo", "Escalation review path for complex cases when available.", "Attorney involvement requires a separate compliant arrangement."],
  ];

  return (
    <main style={{ fontFamily: "var(--cv-font)", background: "linear-gradient(180deg, #fffdf5 0%, #f0fdf4 48%, #eef9ff 100%)", minHeight: "100vh", padding: "32px 7% 70px", color: "#102033" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 28, alignItems: "center", background: "rgba(255,255,255,.78)", border: "1px solid #cfeee0", borderRadius: 8, padding: "12px 14px", boxShadow: "0 12px 28px rgba(16,32,51,.06)" }}>
        <BrandLogo />
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/scan">Free Scan</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/faq">FAQ</Link>
        </div>
      </nav>
      <h1 style={{ fontSize: 42, marginBottom: 8 }}>Pricing</h1>
      <p style={{ color: "#475569", maxWidth: 760, lineHeight: 1.65 }}>Demo pricing structure designed to stay attractive while showing a realistic path from free scan to assisted dispute workflow.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18, marginTop: 24 }}>
        {plans.map(([name, price, body, note]) => (
          <div key={name} style={{ background: "rgba(255,255,255,.94)", padding: 24, borderRadius: 8, border: "1px solid #cfeee0", boxShadow: "0 18px 42px rgba(16,32,51,.09)" }}>
            <h2 style={{ marginTop: 0 }}>{name}</h2>
            <strong style={{ display: "block", fontSize: 30, marginBottom: 12 }}>{price}</strong>
            <p style={{ color: "#334155", lineHeight: 1.55 }}>{body}</p>
            <p style={{ color: "#64748b", fontSize: 14 }}>{note}</p>
          </div>
        ))}
      </div>
      <section style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: 18, marginTop: 18 }}>
        Demo only: no payment processor is connected, and no fee is charged from this local site. Results vary and are not guaranteed. Certified mail, postage, credit monitoring, identity verification, report access, attorney review, and third-party costs are separate unless a written plan says they are included.
      </section>
    </main>
  );
}
