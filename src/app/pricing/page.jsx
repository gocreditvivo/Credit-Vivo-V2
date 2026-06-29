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
        <h1>Start free. Add premium support when needed.</h1>
        <p>Credit Vivo starts with a free Check-In, then offers paid AI guidance, tracking, and attorney-ready escalation prep.</p>
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
          <h2>AI Guided</h2>
          <div className="price">$69<span>/mo</span></div>
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
          <h2>Vivo Plus</h2>
          <div className="price">$95<span>/mo</span></div>
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
          <span className="eyebrow">Escalation Prep</span>
          <h2>Attorney Access Prep</h2>
          <div className="price">$119<span>/mo</span></div>
          <p>For serious files that may need attorney-ready organization and optional legal access review.</p>
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
