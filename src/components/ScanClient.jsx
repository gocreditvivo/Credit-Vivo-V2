'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBadge from './StatusBadge';
import ComingSoonButton from './ComingSoonButton';

const demoFindings = [
  {
    severity: 'high',
    title: 'Possible bureau reporting mismatch',
    account: 'Collection / charge-off account',
    detail: 'One bureau may show different balance, status, or date information than another bureau. This should be reviewed side by side before any self-directed next step.',
  },
  {
    severity: 'medium',
    title: 'Missing or unclear original creditor',
    account: 'Collection account',
    detail: 'A collection account should clearly identify the original creditor when applicable. Missing or unclear information can make the tradeline harder for a consumer to verify.',
  },
  {
    severity: 'medium',
    title: 'Date fields need review',
    account: 'Negative tradeline',
    detail: 'Date opened, date reported, last activity, and status dates should be checked for consistency across bureaus and against the source report.',
  },
  {
    severity: 'low',
    title: 'Identity section cleanup opportunity',
    account: 'Personal information',
    detail: 'Old addresses, aliases, or duplicate phone numbers can be organized so the customer profile is easier to review.',
  },
];

export default function ScanClient() {
  const [fileName, setFileName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : '');
    setShowResults(false);
  }

  function runDemoScan() {
    setIsScanning(true);
    setShowResults(false);
    window.setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 900);
  }

  return (
    <div className="scan-shell">
      <section className="upload-panel">
        <span className="section-label">Free AI report review</span>
        <h1>Upload a credit report and preview what Credit Vivo will review.</h1>
        <p>
          This screen is production-style and ready for customer testing. The current scan is a safe demo preview until the real 3-bureau parser is connected.
        </p>

        <label className="file-drop">
          <input type="file" accept=".pdf,.png,.jpg,.jpeg,.webp" onChange={handleFileChange} />
          <span className="file-icon">↑</span>
          <strong>{fileName || 'Choose credit report file'}</strong>
          <small>PDF, JPG, PNG, or WEBP. Demo only until backend parser is connected.</small>
        </label>

        <div className="button-row">
          <button className="btn btn-primary" type="button" onClick={runDemoScan} disabled={!fileName || isScanning}>
            {isScanning ? 'Reviewing Report...' : 'Run AI Findings Preview'}
          </button>
          <ComingSoonButton>Connect Real Parser</ComingSoonButton>
        </div>
      </section>

      <aside className="scan-side-card">
        <h2>What the full scanner will check</h2>
        <ul className="clean-list">
          <li>Experian, Equifax, and TransUnion side by side</li>
          <li>Negative accounts, collections, charge-offs, and late payments</li>
          <li>Balance, status, date, creditor, and classification mismatches</li>
          <li>Missing original creditor or incomplete furnisher details</li>
          <li>Plain-English review notes</li>
        </ul>
      </aside>

      {showResults && (
        <section className="results-panel">
          <div className="section-heading-row">
            <div>
              <span className="section-label">AI findings preview</span>
              <h2>Potential issues found for review</h2>
            </div>
            <StatusBadge tone="success">Demo Complete</StatusBadge>
          </div>

          <div className="findings-list">
            {demoFindings.map((finding) => (
              <article className="finding-card" key={finding.title}>
                <div>
                  <StatusBadge tone={finding.severity}>{finding.severity.toUpperCase()}</StatusBadge>
                  <h3>{finding.title}</h3>
                  <small>{finding.account}</small>
                </div>
                <p>{finding.detail}</p>
              </article>
            ))}
          </div>

          <div className="next-step-card">
            <div>
              <h3>Recommended next step</h3>
              <p>Review negative accounts, confirm the raw report details, then decide whether any bureau or furnisher follow-up makes sense.</p>
            </div>
            <div className="button-row right-actions">
              <Link href="/disputes" className="btn btn-primary">Open Review Flow</Link>
              <Link href="/dashboard" className="btn btn-secondary">View Dashboard</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
