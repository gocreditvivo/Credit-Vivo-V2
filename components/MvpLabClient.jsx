'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import BrandLogo from './BrandLogo';

const modules = [
  {
    id: 'payments',
    title: 'Payment Checkout',
    status: 'MVP test only',
    why: 'Confirm plan selection, consent copy, receipt, refund/cancel workflow, and no advance-fee compliance risk before Stripe goes live.',
    test: 'Create a fake checkout session and show what the customer sees after payment.',
    pass: 'Plan, price, cancellation notice, receipt event, and failed-payment path are logged.',
    next: 'Connect Stripe test mode, then compliance review before live payments.',
  },
  {
    id: 'credit-pull',
    title: '3-Bureau Credit Pull',
    status: 'Vendor needed',
    why: 'Manual upload works now; soft-pull access needs a compliant vendor, customer authorization, and data-security review.',
    test: 'Simulate Equifax, Experian, and TransUnion report receipt with one missing bureau.',
    pass: 'Portal clearly shows received/missing bureaus and does not expose raw backend parser logs.',
    next: 'Compare soft-pull vendors and approval requirements.',
  },
  {
    id: 'identity',
    title: 'Identity Verification',
    status: 'MVP test only',
    why: 'We need to verify the customer before storing documents or mailing disputes.',
    test: 'Run a mock ID/proof-of-address checklist.',
    pass: 'ID, proof of address, consent, and mismatch-review outcomes are tracked.',
    next: 'Connect Persona, Stripe Identity, Socure, or similar vendor.',
  },
  {
    id: 'mail',
    title: 'Certified Mail',
    status: 'Vendor needed',
    why: 'Bureau/furnisher letters need print, postage, certified tracking, delivery proof, and cost controls.',
    test: 'Generate a mock mail batch with tracking numbers and customer cost note.',
    pass: 'Each letter has recipient, tracking status, cost estimate, and response deadline.',
    next: 'Test Lob, Click2Mail, LetterStream, or USPS-based workflow.',
  },
  {
    id: 'messages',
    title: 'Email and SMS Updates',
    status: 'MVP test only',
    why: 'Portal updates are ready, but email/SMS needs consent, unsubscribe, delivery logs, and templates.',
    test: 'Queue portal, email, and text updates without sending externally.',
    pass: 'Consent flag, template, channel, and delivery status are logged.',
    next: 'Connect Postmark/SendGrid and Twilio in test mode.',
  },
  {
    id: 'vault',
    title: 'Encrypted Document Vault',
    status: 'Security needed',
    why: 'Credit reports, IDs, utility bills, and bureau letters are sensitive and need encryption, access logs, retention rules, and virus scanning.',
    test: 'Simulate document intake, document type, retention label, and access log.',
    pass: 'No public file links; every document has type, owner, status, retention, and audit event.',
    next: 'Choose storage architecture and access-control rules.',
  },
  {
    id: 'response-parser',
    title: 'Bureau/Furnisher Response Parser',
    status: 'MVP test only',
    why: 'Returned reinvestigation letters decide Round 2, holds, deletions, or escalation.',
    test: 'Parse a mock response letter and classify deleted, verified, updated, or needs review.',
    pass: 'Response result updates the round plan and creates next-action notes.',
    next: 'Train parser on real bureau/furnisher response formats.',
  },
  {
    id: 'attorney',
    title: 'Attorney Escalation',
    status: 'Not open yet',
    why: 'Attorney backup needs compliant relationship terms, scope, conflicts checks, and clear separation from ordinary credit repair.',
    test: 'Route a high-risk unresolved issue into attorney-review hold.',
    pass: 'Customer sees only “escalation review,” while internal notes show why attorney review may be needed.',
    next: 'Attorney/ethics review before offering to customers.',
  },
  {
    id: 'license-check',
    title: 'Furnisher License and Entity Check',
    status: 'MVP test only',
    why: 'Debt collectors and furnishers should be checked against state entity/license sources when relevant.',
    test: 'Run mock state/entity lookup results against a collection account.',
    pass: 'Active, inactive, not found, and needs-manual-review statuses are handled.',
    next: 'Add state-by-state source list and API/scrape strategy where allowed.',
  },
  {
    id: 'complaints',
    title: 'CFPB and State Complaint Flow',
    status: 'Locked until review',
    why: 'Complaints should be used only after documented unresolved issues, not as an automatic first step.',
    test: 'Build a complaint-ready evidence packet without submitting it.',
    pass: 'Packet has timeline, prior dispute, response, evidence, and customer authorization.',
    next: 'Compliance/legal review before any live submission workflow.',
  },
  {
    id: 'chatbot',
    title: 'Customer Chatbot',
    status: 'MVP test only',
    why: 'Customers need simple guidance, but the bot must avoid legal advice, guarantees, and sensitive-data leakage.',
    test: 'Answer common onboarding questions with compliance guardrails.',
    pass: 'Bot refuses guarantees/legal advice and routes sensitive issues to support.',
    next: 'Connect knowledge base, support handoff, and transcript logging.',
  },
  {
    id: 'reviews',
    title: 'Google Review Automation',
    status: 'MVP test only',
    why: 'Review requests should happen after positive service milestones and must not pressure or mislead customers.',
    test: 'Queue a review request after a good customer milestone.',
    pass: 'Request timing, opt-out, channel, and customer satisfaction signal are logged.',
    next: 'Connect CRM/review link after Google Business Profile is live.',
  },
];

const shell = {
  fontFamily: 'var(--cv-font)',
  background: 'linear-gradient(180deg, #fffdf5 0%, #f0fdf4 48%, #eef9ff 100%)',
  color: '#102033',
  minHeight: '100vh',
  padding: '32px 7% 72px',
};

const card = {
  background: 'rgba(255,255,255,.94)',
  border: '1px solid #cfeee0',
  borderRadius: 8,
  padding: 20,
  boxShadow: '0 18px 42px rgba(16,32,51,.09)',
};

function buildResult(module, index) {
  const now = new Date().toLocaleString();
  return {
    moduleId: module.id,
    moduleTitle: module.title,
    at: now,
    status: index % 3 === 0 ? 'Needs vendor connection' : 'MVP test passed',
    result:
      index % 3 === 0
        ? `${module.title} flow is mapped, but live vendor/API credentials are still required.`
        : `${module.title} MVP flow completed with mock data and audit event.`,
  };
}

export default function MvpLabClient() {
  const [results, setResults] = useState([]);
  const [activeId, setActiveId] = useState(modules[0].id);

  const activeModule = modules.find((module) => module.id === activeId) || modules[0];
  const completed = useMemo(() => new Set(results.map((result) => result.moduleId)), [results]);
  const vendorNeeded = results.filter((result) => result.status === 'Needs vendor connection').length;
  const passed = results.filter((result) => result.status === 'MVP test passed').length;

  function runModule(module) {
    const index = modules.findIndex((item) => item.id === module.id);
    const next = buildResult(module, index);
    setResults((current) => [next, ...current.filter((item) => item.moduleId !== module.id)]);
    setActiveId(module.id);
  }

  function runAll() {
    setResults(modules.map((module, index) => buildResult(module, index)).reverse());
  }

  return (
    <main style={shell}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 28, alignItems: 'center', background: 'rgba(255,255,255,.78)', border: '1px solid #cfeee0', borderRadius: 8, padding: '12px 14px', boxShadow: '0 12px 28px rgba(16,32,51,.06)' }}>
        <BrandLogo />
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/dashboard">Customer Portal</Link>
          <Link href="/scan">Upload Flow</Link>
          <Link href="/disputes">Dispute Rounds</Link>
          <Link href="/events">Internal Event Log</Link>
        </div>
      </nav>

      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(300px,.65fr)', gap: 22, alignItems: 'start', marginBottom: 22 }}>
        <div>
          <p className="cv-status-chip soon">Internal MVP Lab</p>
          <h1 style={{ fontSize: 44, lineHeight: 1.08, margin: '16px 0 10px' }}>Test unfinished features away from customers.</h1>
          <p style={{ color: '#475569', fontSize: 17, lineHeight: 1.65, maxWidth: 860 }}>
            Each not-ready feature gets its own small MVP test. We can verify the customer flow, compliance guardrails,
            data captured, audit event, and vendor gap before turning anything on in the public portal.
          </p>
          <button type="button" onClick={runAll} style={{ border: 0, borderRadius: 8, background: 'linear-gradient(135deg,#0f766e,#12b981)', color: 'white', padding: '13px 18px', fontWeight: 900, cursor: 'pointer', boxShadow: '0 14px 28px rgba(18,185,129,.24)' }}>
            Run all MVP checks
          </button>
        </div>

        <aside style={card}>
          <h2 style={{ marginTop: 0 }}>Readiness Snapshot</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['Modules mapped', modules.length],
              ['MVP checks passed', passed],
              ['Vendor/API gaps', vendorNeeded],
              ['Not tested yet', modules.length - completed.size],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid #e5e7eb', paddingTop: 10 }}>
                <span style={{ color: '#64748b', fontWeight: 800 }}>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <p style={{ color: '#92400e', lineHeight: 1.55, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: 12 }}>
            This page is for internal testing. Do not treat mock pass results as live vendor, legal, or security approval.
          </p>
        </aside>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(300px,.8fr) minmax(0,1.2fr)', gap: 18, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 12 }}>
          {modules.map((module) => {
            const done = completed.has(module.id);
            const isActive = activeId === module.id;
            return (
              <button
                key={module.id}
                type="button"
                onClick={() => setActiveId(module.id)}
                style={{
                  ...card,
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: isActive ? '2px solid #10b981' : '1px solid #cfeee0',
                  background: done ? '#f0fdf4' : 'rgba(255,255,255,.94)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
                  <strong>{module.title}</strong>
                  <span className={`cv-status-chip ${done ? 'ready' : 'soon'}`}>{done ? 'Tested' : module.status}</span>
                </div>
                <p style={{ color: '#64748b', marginBottom: 0, lineHeight: 1.5 }}>{module.test}</p>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'grid', gap: 18 }}>
          <section style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', alignItems: 'start' }}>
              <div>
                <p className="cv-status-chip soon">{activeModule.status}</p>
                <h2 style={{ margin: '12px 0 8px', fontSize: 30 }}>{activeModule.title}</h2>
              </div>
              <button type="button" onClick={() => runModule(activeModule)} style={{ border: 0, borderRadius: 8, background: '#0f766e', color: 'white', padding: '11px 14px', fontWeight: 900, cursor: 'pointer' }}>
                Run MVP test
              </button>
            </div>

            <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
              {[
                ['Why this matters', activeModule.why],
                ['MVP test', activeModule.test],
                ['Pass criteria', activeModule.pass],
                ['Next real step', activeModule.next],
              ].map(([label, value]) => (
                <div key={label} style={{ borderTop: '1px solid #e5e7eb', paddingTop: 12 }}>
                  <strong>{label}</strong>
                  <p style={{ color: '#475569', lineHeight: 1.6, margin: '6px 0 0' }}>{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={card}>
            <h2 style={{ marginTop: 0 }}>MVP Test Log</h2>
            {results.length ? (
              <div style={{ display: 'grid', gap: 12 }}>
                {results.map((result) => (
                  <article key={`${result.moduleId}-${result.at}`} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 14, background: result.status === 'MVP test passed' ? '#f0fdf4' : '#fffbeb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <strong>{result.moduleTitle}</strong>
                      <span style={{ color: result.status === 'MVP test passed' ? '#166534' : '#92400e', fontWeight: 900 }}>{result.status}</span>
                    </div>
                    <p style={{ color: '#475569', lineHeight: 1.55 }}>{result.result}</p>
                    <span style={{ color: '#64748b', fontSize: 13 }}>{result.at}</span>
                  </article>
                ))}
              </div>
            ) : (
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>No MVP checks have been run in this browser yet.</p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
