import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ComingSoonButton from '../../components/ComingSoonButton';

export const metadata = {
  title: 'Login | Credit Vivo',
  description: 'Credit Vivo login placeholder.',
};

export default function LoginPage() {
  return (
    <main>
      <Header />
      <section className="auth-wrap">
        <div className="auth-card">
          <span className="section-label">Client portal</span>
          <h1>Login is coming soon.</h1>
          <p>For now, use the dashboard demo to review the customer flow. Later this page will connect to secure client accounts.</p>
          <label className="input-label">
            Email address
            <input type="email" placeholder="customer@example.com" disabled />
          </label>
          <ComingSoonButton>Secure Login Coming Soon</ComingSoonButton>
          <Link href="/dashboard" className="btn btn-secondary full-width">Open Dashboard Demo</Link>
        </div>
        <div className="auth-side">
          <h2>Future secure portal</h2>
          <ul className="clean-list">
            <li>Customer login</li>
            <li>Document vault</li>
            <li>Dispute status history</li>
            <li>Payment subscription</li>
            <li>Attorney escalation requests</li>
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}
