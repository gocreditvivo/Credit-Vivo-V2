import Link from 'next/link';

export default function BrandLogo() {
  return (
    <Link href="/" className="cv-brand" aria-label="Credit Vivo home">
      <span className="cv-brand-mark">V</span>
      <span className="cv-brand-text">Credit Vivo</span>
    </Link>
  );
}
