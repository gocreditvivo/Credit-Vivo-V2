import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StatusBadge from '../../components/StatusBadge';
import ComingSoonButton from '../../components/ComingSoonButton';

const tasks = [
  ['Report uploaded', 'Complete', 'success'],
  ['AI findings reviewed', 'Ready', 'success'],
  ['Negative accounts confirmed', 'Needs review', 'medium'],
  ['Review packet organized', 'Next step', 'high'],
  ['Bureau response tracking', 'Coming soon', 'default'],
];

export const metadata = {
  title: 'Dashboard | Credit Vivo',
  description: 'Credit Vivo customer dashboard demo.',
};

export default function DashboardPage() {
  return (
    <main>
      <Header />
      <section className="page-hero compact-hero">
        <div>
          <span className="section-label">Customer dashboard</span>
          <h1>One clean place to see credit review progress.</h1>
          <p>Use this dashboard as the production-style customer home after upload, report review, and self-directed next-step organization.</p>
        </div>
        <Link href="/scan" className="btn btn-primary">Upload New Report</Link>
      </section>

      <section className="dashboard-grid section-block no-top-pad">
        <article className="metric-card">
          <span>Reports</span>
          <strong>1</strong>
          <small>Uploaded for review</small>
        </article>
        <article className="metric-card">
          <span>Potential Issues</span>
          <strong>4</strong>
          <small>Need customer review</small>
        </article>
        <article className="metric-card">
          <span>Review Queue</span>
          <strong>0</strong>
          <small>Ready for review</small>
        </article>
        <article className="metric-card muted-card">
          <span>Credit Monitoring</span>
          <strong>Soon</strong>
          <small>Gray placeholder</small>
        </article>
      </section>

      <section className="section-block dashboard-layout">
        <div className="panel-card wide-card">
          <div className="section-heading-row">
            <div>
              <span className="section-label">Progress timeline</span>
              <h2>Customer action plan</h2>
            </div>
            <StatusBadge tone="medium">In Progress</StatusBadge>
          </div>
          <div className="task-list">
            {tasks.map(([name, status, tone]) => (
              <div className="task-row" key={name}>
                <span>{name}</span>
                <StatusBadge tone={tone}>{status}</StatusBadge>
              </div>
            ))}
          </div>
        </div>

        <aside className="panel-card">
          <span className="section-label">Next best action</span>
          <h2>Review negative accounts</h2>
          <p>Before taking any action, the customer should confirm the accounts and check that raw report information matches the findings.</p>
          <Link href="/disputes" className="btn btn-primary full-width">Open Review Center</Link>
        </aside>
      </section>

      <section className="section-block soft-section">
        <div className="section-heading-row">
          <div>
            <span className="section-label">Coming soon modules</span>
            <h2>Future dashboard features</h2>
          </div>
          <ComingSoonButton>Roadmap</ComingSoonButton>
        </div>
        <div className="feature-grid three-col">
          <article className="feature-card muted-card"><h3>Secure document vault</h3><p>Store reports, IDs, letters, and evidence securely.</p><ComingSoonButton /></article>
          <article className="feature-card muted-card"><h3>Score and alert monitoring</h3><p>Track credit profile changes over time.</p><ComingSoonButton /></article>
          <article className="feature-card muted-card"><h3>Attorney review requests</h3><p>Request review for eligible unanswered or unreasonable response results.</p><ComingSoonButton /></article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
