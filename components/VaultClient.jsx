'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo';
import { demoCase } from './demoCase';
import { logEvent } from './eventLog';

const STORAGE_KEY = 'creditVivoDemoCase';
const shell = { fontFamily: 'var(--cv-font)', background: 'linear-gradient(180deg, #fffdf5 0%, #f0fdf4 48%, #eef9ff 100%)', minHeight: '100vh', color: '#102033', padding: '32px 7% 70px' };
const card = { background: 'rgba(255,255,255,.94)', border: '1px solid #cfeee0', borderRadius: 8, padding: 20, boxShadow: '0 18px 42px rgba(16,32,51,.09)' };

function getCase() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || demoCase;
  } catch {
    return demoCase;
  }
}

export default function VaultClient() {
  const [caseData, setCaseData] = useState(demoCase);
  const [manualName, setManualName] = useState('');
  const [documents, setDocuments] = useState(demoCase.documents);

  useEffect(() => {
    const loaded = getCase();
    setCaseData(loaded);
    setDocuments(loaded.documents);
    logEvent('page_viewed', {
      area: 'Document Vault',
      page: '/vault',
      caseId: loaded.caseId,
      consumerName: loaded.consumerName,
      consumerEmail: loaded.consumerEmail,
      documentCount: loaded.documents?.length || 0,
    });
  }, []);

  function addManualDocument(event) {
    event.preventDefault();
    const next = { name: manualName || 'Manual upload', type: 'Customer upload', status: 'Received' };
    const updated = [...documents, next];
    setDocuments(updated);
    const nextCase = { ...caseData, documents: updated };
    setCaseData(nextCase);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCase));
    logEvent('document_added', {
      area: 'Document Vault',
      caseId: nextCase.caseId,
      consumerName: nextCase.consumerName,
      consumerEmail: nextCase.consumerEmail,
      documentName: next.name,
      documentType: next.type,
      documentStatus: next.status,
    });
    setManualName('');
  }

  return (
    <main style={shell}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 28, alignItems: 'center', background: 'rgba(255,255,255,.78)', border: '1px solid #cfeee0', borderRadius: 8, padding: '12px 14px', boxShadow: '0 12px 28px rgba(16,32,51,.06)' }}>
        <BrandLogo />
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/findings">Findings</Link>
          <Link href="/messages">Messages</Link>
          <Link href="/monthly">Monthly</Link>
          <Link href="/scan">Upload</Link>
          <Link href="/disputes">Disputes</Link>
        </div>
      </nav>

      <h1 style={{ fontSize: 42, marginBottom: 8 }}>Document Vault</h1>
      <p style={{ color: '#475569', maxWidth: 760 }}>Preview of the document vault for reports, ID, utility bills, dispute letters, and bureau responses.</p>

      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(280px,.65fr)', gap: 18, alignItems: 'start', marginTop: 24 }}>
        <div style={card}>
          <h2 style={{ marginTop: 0 }}>Documents</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {documents.map((doc, index) => (
              <div key={`${doc.name}-${index}`} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, padding: 14, border: '1px solid #e5e7eb', borderRadius: 8 }}>
                <span><strong>{doc.name}</strong><br /><span style={{ color: '#64748b' }}>{doc.type}</span></span>
                <span style={{ fontWeight: 900, color: doc.status.includes('Needed') ? '#b45309' : '#166534' }}>{doc.status}</span>
              </div>
            ))}
          </div>
        </div>

        <aside style={card}>
          <h2 style={{ marginTop: 0 }}>Manual Upload</h2>
          <span className="cv-status-chip soon">Coming soon</span>
          <form onSubmit={addManualDocument} style={{ display: 'grid', gap: 12, marginTop: 12 }} className="cv-feature-muted">
            <input
              value={manualName}
              onChange={(event) => setManualName(event.target.value)}
              placeholder="Example: Utility bill June 2026"
              disabled
              style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: 12 }}
            />
            <button disabled className="cv-muted-action">Disabled until encrypted storage is connected</button>
          </form>
          <p style={{ color: '#64748b', lineHeight: 1.55 }}>This stays greyed out until encrypted storage, file virus scanning, access logs, and retention rules are connected.</p>
        </aside>
      </section>
    </main>
  );
}
