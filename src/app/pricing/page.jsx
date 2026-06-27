import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ComingSoonButton from '../../components/ComingSoonButton';

export const metadata = {
  title: 'Pricing | Credit Vivo',
  description: 'Credit Vivo pricing plan preview.',
};

export default function PricingPage() {
  return (
    <main>
      <Header />
      <section className="page-hero center-hero">
        <span className="section-label">Simple pricing preview</span>
        <h1>Start free. Upgrade when the customer is ready.</h1>
        <p>These cards make the site look complete while leaving room to adjust final pricing before payments are connected.</p>
      </section>

      <section className="pricing-grid section-block no-top-pad">
        <article className="price-card">
          <span className="eyebrow">Free</span>
          <h2>Credit Scan</h2>
          <div className="price">$0</div>
          <p>Best for a customer who wants to see what Credit Vivo may organize before deciding on next steps.</p>
          <ul>
            <li>Upload report</li>
            <li>AI findings preview</li>
            <li>Negative account summary</li>
            <li>Plain-English next steps</li>
          </ul>
          <Link href="/scan" className="btn btn-primary full-width">Start Free Scan</Link>
        </article>

        <article className="price-card featured-price">
          <span className="eyebrow">Most Useful</span>
          <h2>Review Plus</h2>
          <div className="price">$29<span>/mo</span></div>
          <p>For customers who want organized review notes, document checklists, and progress tracking.</p>
          <ul>
            <li>Bureau review workflow</li>
            <li>Furnisher question workflow</li>
            <li>Document checklist</li>
            <li>Progress dashboard</li>
          </ul>
          <ComingSoonButton>Payment Coming Soon</ComingSoonButton>
        </article>

        <article className="price-card">
          <span className="eyebrow">Pro</span>
          <h2>Credit Vivo Pro</h2>
          <div className="price">$79<span>/mo</span></div>
          <p>For deeper review, more tracking, and stronger escalation organization.</p>
          <ul>
            <li>Priority review queue</li>
            <li>Advanced issue tracking</li>
            <li>Response review checklist</li>
            <li>Escalation packet prep</li>
          </ul>
          <ComingSoonButton>Payment Coming Soon</ComingSoonButton>
        </article>

        <article className="price-card muted-card">
          <span className="eyebrow">Add-on</span>
          <h2>Attorney Escalation</h2>
          <div className="price">Soon</div>
          <p>Future optional path for qualified legal review or attorney-supported escalation.</p>
          <ul>
            <li>Attorney review request</li>
            <li>Evidence packet</li>
            <li>CFPB/state complaint prep</li>
            <li>LegalShield-style partner option</li>
          </ul>
          <ComingSoonButton />
        </article>
      </section>

      <section className="section-block soft-section">
        <div className="panel-card wide-card">
          <span className="section-label">Important</span>
          <h2>No guaranteed score promises.</h2>
          <p>Credit Vivo should avoid promising score increases or guaranteed deletions. The safer positioning is: review, organize, educate, support self-directed choices, and track progress.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
