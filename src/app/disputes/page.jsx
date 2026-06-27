import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StatusBadge from '../../components/StatusBadge';
import ComingSoonButton from '../../components/ComingSoonButton';

const disputeRows = [
  ['Collection account', 'Possible missing original creditor', 'Review evidence', 'medium'],
  ['Charge-off tradeline', 'Possible status/date mismatch', 'Prepare bureau dispute', 'high'],
  ['Late payment account', 'Needs bureau side-by-side check', 'Customer review', 'medium'],
];

export const metadata = {
  title: 'Dispute Center | Credit Vivo',
  description: 'Prepare and track dispute workflows with Credit Vivo.',
};

export default function DisputesPage() {
  return (
    <main>
      <Header />
      <section className="page-hero compact-hero">
        <div>
          <span className="section-label">Dispute center</span>
          <h1>Prepare disputes without overwhelming the customer.</h1>
          <p>Credit Vivo keeps the process simple: review the issue, collect evidence, choose dispute type, and track the response.</p>
        </div>
        <Link href="/scan" className="btn btn-primary">Run Scan First</Link>
      </section>

      <section className="section-block no-top-pad">
        <div className="feature-grid three-col">
          <article className="feature-card">
            <span className="eyebrow">Step 1</span>
            <h3>Bureau dispute</h3>
            <p>Prepare clear dispute language for Experian, Equifax, and TransUnion based on specific report issues.</p>
            <Link href="/scan" className="btn btn-secondary">Start From Scan</Link>
          </article>
          <article className="feature-card">
            <span className="eyebrow">Step 2</span>
            <h3>Furnisher validation</h3>
            <p>Organize questions and evidence requests for creditors, collectors, and furnishers reporting the account.</p>
            <Link href="/dashboard" className="btn btn-secondary">View Workflow</Link>
          </article>
          <article className="feature-card muted-card">
            <span className="eyebrow">Step 3</span>
            <h3>Attorney escalation</h3>
            <p>Future review path when a consumer may need qualified legal advice or escalation support.</p>
            <ComingSoonButton />
          </article>
        </div>
      </section>

      <section className="section-block">
        <div className="panel-card wide-card">
          <div className="section-heading-row">
            <div>
              <span className="section-label">Demo dispute queue</span>
              <h2>Issues ready for customer review</h2>
            </div>
            <StatusBadge tone="medium">Needs Review</StatusBadge>
          </div>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>Account Type</th>
                  <th>Possible Issue</th>
                  <th>Next Step</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {disputeRows.map(([type, issue, step, tone]) => (
                  <tr key={issue}>
                    <td>{type}</td>
                    <td>{issue}</td>
                    <td>{step}</td>
                    <td><StatusBadge tone={tone}>Review</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-block soft-section">
        <div className="split-section no-pad">
          <div>
            <span className="section-label">Future automation</span>
            <h2>Letter generation and certified mail tracking are placeholders for now.</h2>
            <p>These are shown as coming soon so the site looks professional while we connect the real dispute engine later.</p>
          </div>
          <div className="button-stack">
            <ComingSoonButton>Generate Bureau Letter</ComingSoonButton>
            <ComingSoonButton>Generate Furnisher Letter</ComingSoonButton>
            <ComingSoonButton>Track Certified Mail</ComingSoonButton>
            <ComingSoonButton>Prepare CFPB Complaint</ComingSoonButton>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
