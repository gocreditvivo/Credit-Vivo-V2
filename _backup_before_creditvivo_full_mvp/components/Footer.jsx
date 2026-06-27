import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Credit Vivo</strong>
        <p>AI-assisted credit report review and dispute workflow.</p>
      </div>
      <div className="footer-links">
        <Link href="/scan">Start Scan</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/dashboard">Dashboard Demo</Link>
      </div>
      <p className="legal-copy">
        Credit Vivo is not a law firm and does not provide legal advice. AI findings are educational and should be reviewed by the consumer or a qualified professional before being used.
      </p>
    </footer>
  );
}
