import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Credit Vivo home">
        <span className="brand-mark">CV</span>
        <span>
          <strong>Credit Vivo</strong>
          <small>AI Credit Improvement</small>
        </span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/scan">Scan</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/disputes">Disputes</Link>
        <Link href="/pricing">Pricing</Link>
      </nav>

      <div className="header-actions">
        <Link href="/login" className="btn btn-ghost">Log in</Link>
        <Link href="/scan" className="btn btn-primary">Start Free Scan</Link>
      </div>
    </header>
  );
}
