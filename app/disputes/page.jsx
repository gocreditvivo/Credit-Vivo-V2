import Link from "next/link";
import BrandLogo from "../../components/BrandLogo";
import DisputePageLogger from "../../components/DisputePageLogger";

export const metadata = {
  title: "Dispute Center",
  description: "Credit Vivo staged dispute workflow launch preview.",
};

const shell = {
  fontFamily: "var(--cv-font)",
  background: "linear-gradient(180deg, #fffdf5 0%, #f0fdf4 48%, #eef9ff 100%)",
  minHeight: "100vh",
  padding: "32px 7% 70px",
  color: "#102033",
};

const card = {
  background: "rgba(255,255,255,.94)",
  border: "1px solid #cfeee0",
  borderRadius: 8,
  padding: 20,
  boxShadow: "0 18px 42px rgba(16,32,51,.09)",
};

const disputeMetrics = [
  ["Ready for Round 1", "3", "Strongest issues with clear support"],
  ["Hold Queue", "9", "Needs proof, response, or manual review"],
  ["Pending Responses", "0", "Starts after certified mail or portal submission"],
  ["Escalation Review", "0", "Only after weak or no response"],
];

const rounds = [
  {
    name: "Prep",
    title: "Setup and proof check",
    timing: "Day 0-3",
    status: "Current",
    customerView: "Upload report, ID, proof of address, and any letters from collectors.",
    backendRule: "No disputes leave until identity, report source, account grouping, and evidence strength are checked.",
  },
  {
    name: "Round 1",
    title: "Strongest first",
    timing: "Day 3-7",
    status: "Preview ready",
    customerView: "Start with the clearest possible errors, not every issue at once.",
    backendRule: "Send only high-confidence, high-impact disputes such as duplicate debt, wrong balance, wrong status, mixed-file identity, or missing original creditor on collections.",
  },
  {
    name: "Wait Window",
    title: "Response tracking",
    timing: "Day 30-45",
    status: "Scheduled",
    customerView: "Track bureau and furnisher responses before sending the next round.",
    backendRule: "Do not stack repetitive disputes while the first investigation window is open. Log results and compare response documents to the raw report.",
  },
  {
    name: "Round 2",
    title: "Next evidence-backed group",
    timing: "After responses",
    status: "Held",
    customerView: "Continue with issues that still appear inaccurate or unverifiable.",
    backendRule: "Use the response results to decide which remaining accounts deserve a second dispute, direct furnisher dispute, or document request.",
  },
  {
    name: "Round 3",
    title: "Direct furnisher or validation follow-up",
    timing: "After Round 2 review",
    status: "Locked",
    customerView: "Use direct follow-up only when the account still needs proof, itemization, or correction.",
    backendRule: "Send account-specific direct furnisher disputes or validation requests only when the evidence supports it.",
  },
  {
    name: "Round 4+",
    title: "Escalation only when justified",
    timing: "After failed verification",
    status: "Locked",
    customerView: "Escalate only if the response does not meaningfully address the issue.",
    backendRule: "Consider CFPB, state regulator, or attorney review only for unresolved, documented, high-impact issues. Do not escalate every item.",
  },
];

const queues = [
  {
    title: "Send First",
    tone: "#dcfce7",
    color: "#166534",
    items: [
      "Duplicate same-debt reporting",
      "Balance/status conflicts with clear proof",
      "Wrong identity or mixed-file information",
      "Collection missing original creditor or ownership support",
    ],
  },
  {
    title: "Hold For Later",
    tone: "#fef3c7",
    color: "#92400e",
    items: [
      "Low-confidence parser fields",
      "Items missing customer proof",
      "Recently disputed accounts still inside response window",
      "Low-impact issues that may distract from stronger errors",
    ],
  },
  {
    title: "Do Not Send",
    tone: "#fee2e2",
    color: "#991b1b",
    items: [
      "Accurate negative items with no factual error",
      "Generic template disputes with no account-specific reason",
      "Repeated disputes before reviewing prior responses",
      "Anything that needs attorney review before action",
    ],
  },
];

export default function DisputesPage() {
  return (
    <main style={shell}>
      <DisputePageLogger />
      <nav style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 28, alignItems: "center", background: "rgba(255,255,255,.78)", border: "1px solid #cfeee0", borderRadius: 8, padding: "12px 14px", boxShadow: "0 12px 28px rgba(16,32,51,.06)" }}>
        <BrandLogo />
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/findings">Findings</Link>
          <Link href="/messages">Messages</Link>
          <Link href="/monthly">Monthly</Link>
          <Link href="/vault">Vault</Link>
          <Link href="/scan">Upload</Link>
        </div>
      </nav>

      <section style={{ marginBottom: 24 }}>
        <p style={{ display: "inline-block", background: "#dcfce7", color: "#047857", padding: "7px 11px", borderRadius: 999, fontWeight: 900 }}>Phased strategy</p>
        <h1 style={{ fontSize: 42, margin: "14px 0 8px" }}>Dispute Center</h1>
        <p style={{ color: "#475569", maxWidth: 820, lineHeight: 1.65 }}>
          Credit Vivo does not dispute every possible error at once. The portal uses staged rounds so the strongest, best-supported issues go first and weaker items wait for evidence or response results.
        </p>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginTop: 24 }}>
        {disputeMetrics.map(([label, value, note]) => (
          <div key={label} style={card}>
            <p style={{ margin: 0, color: "#64748b", fontWeight: 800 }}>{label}</p>
            <strong style={{ display: "block", fontSize: 32, margin: "8px 0" }}>{value}</strong>
            <span style={{ color: "#64748b" }}>{note}</span>
          </div>
        ))}
      </section>

      <section style={{ ...card, marginTop: 18 }}>
        <h2 style={{ marginTop: 0 }}>Dispute Rounds</h2>
        <div style={{ display: "grid", gap: 14 }}>
          {rounds.map((round) => (
            <article key={round.name} style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) 120px", gap: 14, borderTop: "1px solid #e5e7eb", paddingTop: 14 }}>
              <div>
                <strong>{round.name}</strong>
                <p style={{ margin: "6px 0 0", color: "#64748b" }}>{round.timing}</p>
              </div>
              <div>
                <h3 style={{ margin: "0 0 6px" }}>{round.title}</h3>
                <p style={{ margin: "0 0 8px", color: "#334155", lineHeight: 1.55 }}>{round.customerView}</p>
                <p style={{ margin: 0, color: "#64748b", lineHeight: 1.55 }}><strong>Internal rule:</strong> {round.backendRule}</p>
              </div>
              <span style={{ alignSelf: "start", justifySelf: "end", background: round.status === "Current" ? "#dcfce7" : "#f1f5f9", color: round.status === "Current" ? "#166534" : "#0369a1", borderRadius: 999, padding: "7px 11px", fontWeight: 900 }}>{round.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginTop: 18 }}>
        {queues.map((queue) => (
          <div key={queue.title} style={{ ...card, background: queue.tone, borderColor: queue.tone }}>
            <h2 style={{ marginTop: 0, color: queue.color }}>{queue.title}</h2>
            <ul style={{ marginBottom: 0, paddingLeft: 20, color: "#334155", lineHeight: 1.7 }}>
              {queue.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section style={{ ...card, marginTop: 18, background: "#eef6ff", borderColor: "#bfdbfe" }}>
        <h2 style={{ marginTop: 0 }}>Customer View vs Backend Engine</h2>
        <p style={{ color: "#334155", lineHeight: 1.65, marginBottom: 0 }}>
          Customers see simple progress: upload received, first dispute package ready, waiting for response, next review scheduled. The backend keeps the deeper scanner logic, raw report comparison, field confidence, response audit, and escalation rules hidden from the customer portal.
        </p>
      </section>

      <section style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: 18, marginTop: 18 }}>
        <strong>Launch status:</strong> Portal dispute planning is available. Mailing, CFPB/state complaints, and attorney communication stay disabled until customer authorization, supporting documents, delivery tracking, response review, and compliance review are connected.
      </section>
    </main>
  );
}
