import Link from 'next/link';

export default function BrandLogo() {
  return (
    <Link href="/" className="cv-brand" aria-label="Credit Vivo home">
      <span className="cv-brand-mark" aria-hidden="true">
        <svg className="cv-brand-bird" viewBox="0 0 64 48" role="img">
          <path className="cv-bird-wing cv-bird-wing-left" d="M31.6 27.2C23.6 15.8 13.2 9.7 2.4 9.5c8.7 7.9 14.3 17.4 17.7 28.9 4.4-3.7 8.1-7.4 11.5-11.2Z" />
          <path className="cv-bird-wing cv-bird-wing-right" d="M32.2 27.2C41.4 13.4 51.1 5.8 62 4.6c-7.2 10.7-12 22.3-14.6 35.1-5.1-3.9-10.1-8.1-15.2-12.5Z" />
          <path className="cv-bird-body" d="M30.8 26.7c3.8-1.3 7.7-1.2 11.6.2-4.1 2-7.7 4.9-10.8 8.9-2.7-3.8-6-6.8-9.9-9.1 3.1-1 6.1-1 9.1 0Z" />
          <circle className="cv-bird-sun" cx="48.3" cy="13" r="3.3" />
        </svg>
      </span>
      <span className="cv-brand-wordmark">
        <span className="cv-brand-text">Credit Vivo</span>
        <span className="cv-brand-tagline">Live credit. Clear path.</span>
      </span>
    </Link>
  );
}
