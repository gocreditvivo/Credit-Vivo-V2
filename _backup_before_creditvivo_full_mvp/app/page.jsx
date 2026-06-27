import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import StepCard from '../components/StepCard';
import ComingSoonButton from '../components/ComingSoonButton';

const liveFeatures = [
  {
    eyebrow: 'Consumer Flow',
    title: 'Clean report upload path',
    description: 'A simple first step for customers to upload a credit report without seeing the technical engine behind it.',
  },
  {
    eyebrow: 'AI Review',
    title: 'Negative-account findings preview',
    description: 'Shows the customer a plain-English preview of possible reporting issues, missing fields, and next steps.',
  },
  {
    eyebrow: 'Disputes',
    title: 'Dispute workflow shell',
    description: 'A clean structure for bureau disputes, furnisher validation letters, document evidence, and progress tracking.',
  },
  {
    eyebrow: 'Dashboard',
    title: 'Client progress dashboard',
    description: 'A production-style dashboard layout for accounts, actions, timelines, and upcoming dispute milestones.',
  },
];

const futureFeatures = [
  {
    title: 'Real 3-bureau scanner engine',
    description: 'Connect the forensic parser so Experian, Equifax, and TransUnion data appears side by side with accuracy checks.',
  },
  {
    title: 'Secure client account login',
    description: 'Add encrypted customer accounts, document vault, identity verification, and account history.',
  },
  {
    title: 'Payment plans and subscriptions',
    description: 'Connect Stripe or another processor for free scan, monthly dispute plans, and attorney escalation add-ons.',
  },
  {
    title: 'Attorney escalation portal',
    description: 'Give customers a clean path to request review when bureaus or furnishers do not correct obvious inaccuracies.',
  },
  {
    title: 'CFPB and state complaint package',
    description: 'Prepare an evidence-backed complaint packet when a dispute response appears incomplete or unreasonable.',
  },
  {
    title: 'Credit monitoring and alerts',
    description: 'Notify customers when new accounts, score changes, collections, or bureau updates appear.',
  },
];

export default function HomePage() {
  return (
    <main>
      <Header />

      <section className="hero-section">
        <div className="hero-copy">
          <div className="hero-kicker">AI-powered credit improvement platform</div>
          <h1>Find credit report problems. Start disputes. Track progress in one clean dashboard.</h1>
          <p>
            Credit Vivo gives consumers a simple way to upload a credit report, review negative accounts, understand possible errors in plain English, and organize the next dispute step.
          </p>
          <div className="hero-actions">
            <Link href="/scan" className="btn btn-primary btn-large">Start Free Credit Scan</Link>
            <Link href="/dashboard" className="btn btn-secondary btn-large">View Dashboard Demo</Link>
          </div>
          <div className="trust-row">
            <span>FCRA-aware workflow</span>
            <span>Metro 2 issue review</span>
            <span>Attorney escalation path</span>
          </div>
        </div>

        <div className="hero-panel">
          <div className="scan-card-large">
            <div className="scan-card-header">
              <span className="pulse-dot" />
              <span>Credit Vivo AI Review</span>
            </div>
            <div className="report-preview">
              <div>
                <span className="mini-label">Report status</span>
                <strong>Ready for upload</strong>
              </div>
              <span className="pill pill-live">MVP</span>
            </div>
            <div className="mini-timeline">
              <div className="timeline-item done">Upload Report</div>
              <div className="timeline-item done">AI Findings</div>
              <div className="timeline-item">Negative Accounts</div>
              <div className="timeline-item muted">Start Dispute</div>
              <div className="timeline-item muted">Track Progress</div>
            </div>
            <Link href="/scan" className="btn btn-primary full-width">Upload My Report</Link>
          </div>
        </div>
      </section>

      <section className="section-block center-section">
        <span className="section-label">Simple customer journey</span>
        <h2>Built to feel easy for the average consumer.</h2>
        <p className="section-lede">
          The forensic engine can be powerful in the background, but the customer should only see the simple steps that matter.
        </p>
        <div className="steps-grid">
          <StepCard number="1" title="Upload Report" description="Customer uploads a PDF or image of their credit report." />
          <StepCard number="2" title="AI Findings" description="Credit Vivo explains possible issues in plain English." />
          <StepCard number="3" title="Review Negatives" description="Customer reviews collections, charge-offs, and late payments." />
          <StepCard number="4" title="Start Dispute" description="The app organizes bureau and furnisher dispute actions." />
          <StepCard number="5" title="Track Progress" description="Customer sees what was sent, what is pending, and what changed." />
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading-row">
          <div>
            <span className="section-label">Active MVP screens</span>
            <h2>Production-style pages ready to test.</h2>
          </div>
          <Link href="/scan" className="btn btn-secondary">Test the Flow</Link>
        </div>
        <div className="feature-grid">
          {liveFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="section-block soft-section">
        <div className="section-heading-row">
          <div>
            <span className="section-label">Missing features shown professionally</span>
            <h2>Coming-soon areas make the product look complete without lying.</h2>
          </div>
          <ComingSoonButton>Feature Roadmap</ComingSoonButton>
        </div>
        <div className="feature-grid">
          {futureFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} status="soon">
              <ComingSoonButton />
            </FeatureCard>
          ))}
        </div>
      </section>

      <section className="section-block split-section">
        <div>
          <span className="section-label">Compliance-first language</span>
          <h2>Clean wording for customers, investors, and future legal review.</h2>
          <p>
            The page avoids making guaranteed credit score promises. It focuses on report review, organization, dispute preparation, and customer education.
          </p>
        </div>
        <div className="checklist-card">
          <h3>Built into the front end</h3>
          <ul>
            <li>Free scan entry point</li>
            <li>Plain-English AI findings preview</li>
            <li>Dispute workflow page</li>
            <li>Dashboard demo</li>
            <li>Pricing section</li>
            <li>Gray coming-soon feature cards</li>
          </ul>
        </div>
      </section>

      <section className="cta-band">
        <h2>Ready to test the Credit Vivo customer flow?</h2>
        <p>Start with the scan page, then review the dashboard and dispute center.</p>
        <div className="hero-actions center-actions">
          <Link href="/scan" className="btn btn-primary btn-large">Start Free Scan</Link>
          <Link href="/pricing" className="btn btn-secondary btn-large">View Pricing</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
