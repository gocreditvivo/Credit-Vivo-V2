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
      <div className="legal-copy">
        <p>
          <strong>Federal Consumer Disclosure (CROA):</strong> You have the right to dispute inaccurate information in your credit report by contacting the credit bureau directly. However, neither you nor any credit repair company or credit repair organization has the right to have accurate, current, and verifiable information removed from your credit report. The credit bureau must remove accurate, negative information from your report only if it is over 7 years old. Bankruptcy information can be reported for 10 years.
        </p>
        <p>
          <strong>Platform Classification:</strong> Credit Vivo is an educational software platform and self-directed tool. Credit Vivo is not a credit repair agency, credit repair organization, or law firm. We do not provide legal advice or perform credit repair services on your behalf. Our software empowers users to organize their own data and generate their own disputes.
        </p>
      </div>
    </footer>
  );
}
