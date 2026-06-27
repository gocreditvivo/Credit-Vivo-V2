import Link from "next/link";

const complianceLinks = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Disclosure", "/disclosure"],
  ["FAQ", "/faq"],
];

export default function ComplianceFooter() {
  return (
    <footer className="cv-compliance-footer">
      <div>
        <strong>Credit Vivo</strong>
        <p>
          Results vary. Credit Vivo does not guarantee removals, approvals, or credit score increases.
          You may dispute inaccurate credit report information directly with the credit bureaus at no cost.
        </p>
        <p>
          <strong>Federal Consumer Disclosure (CROA):</strong> You have the right to dispute inaccurate information in your credit report by contacting the credit bureau directly. However, neither you nor any credit repair company or credit repair organization has the right to have accurate, current, and verifiable information removed from your credit report. The credit bureau must remove accurate, negative information from your report only if it is over 7 years old. Bankruptcy information can be reported for 10 years.
        </p>
        <p>
          <strong>Platform Classification:</strong> Credit Vivo is an educational software platform and self-directed tool. Credit Vivo is not a credit repair agency, credit repair organization, or law firm. We do not provide legal advice or perform credit repair services on your behalf. Our software empowers users to organize their own data and generate their own disputes.
        </p>
      </div>
      <nav aria-label="Compliance links">
        {complianceLinks.map(([label, href]) => (
          <Link key={href} href={href}>{label}</Link>
        ))}
      </nav>
    </footer>
  );
}
