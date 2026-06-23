'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo';
import { demoCase } from './demoCase';
import { logEvent } from './eventLog';

const STORAGE_KEY = 'creditVivoDemoCase';
const CASES_KEY = 'creditVivoDemoCases';

const shell = {
  fontFamily: 'var(--cv-font)',
  background: 'linear-gradient(180deg, #fffdf5 0%, #f0fdf4 48%, #eef9ff 100%)',
  minHeight: '100vh',
  color: '#102033',
  padding: '32px 7% 70px',
};

const card = {
  background: 'rgba(255,255,255,.94)',
  border: '1px solid #cfeee0',
  borderRadius: 8,
  padding: 20,
  boxShadow: '0 18px 42px rgba(16,32,51,.09)',
};

function readActiveCase() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : demoCase;
  } catch {
    return demoCase;
  }
}

function readCases() {
  try {
    const raw = localStorage.getItem(CASES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return parsed.length ? parsed : [readActiveCase()];
  } catch {
    return [demoCase];
  }
}

export default function MessagesClient() {
  const [caseData, setCaseData] = useState(demoCase);
  const [cases, setCases] = useState([demoCase]);

  useEffect(() => {
    const loadedCase = readActiveCase();
    setCaseData(loadedCase);
    setCases(readCases());
    logEvent('page_viewed', {
      area: 'Messages',
      page: '/messages',
      caseId: loadedCase.caseId,
      consumerName: loadedCase.consumerName,
      consumerEmail: loadedCase.consumerEmail,
    });
  }, []);

  function switchCase(nextCase) {
    setCaseData(nextCase);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCase));
    logEvent('case_switched', {
      area: 'Messages',
      caseId: nextCase.caseId,
      consumerName: nextCase.consumerName,
      consumerEmail: nextCase.consumerEmail,
    });
  }

  const baseMessages = caseData.messagePreviews?.length ? caseData.messagePreviews : demoCase.messagePreviews;
  const monthlyMessage = demoCase.messagePreviews.find((message) => message.id === 'msg-005');
  const messages = baseMessages.some((message) => message.id === 'msg-005') || !monthlyMessage
    ? baseMessages
    : [...baseMessages, monthlyMessage];
  const updates = caseData.updates?.length ? caseData.updates : demoCase.updates;

  return (
    <main style={shell}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 28, alignItems: 'center', background: 'rgba(255,255,255,.78)', border: '1px solid #cfeee0', borderRadius: 8, padding: '12px 14px', boxShadow: '0 12px 28px rgba(16,32,51,.06)' }}>
        <BrandLogo />
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/scan">Upload</Link>
          <Link href="/findings">Findings</Link>
          <Link href="/monthly">Monthly</Link>
          <Link href="/vault">Vault</Link>
          <Link href="/disputes">Disputes</Link>
          <Link href="/events">Events</Link>
        </div>
      </nav>

      <section style={{ marginBottom: 24 }}>
        <p style={{ display: 'inline-block', background: '#dcfce7', color: '#047857', padding: '7px 11px', borderRadius: 999, fontWeight: 900 }}>Preview only</p>
        <h1 style={{ fontSize: 42, margin: '14px 0 8px' }}>Customer message flow</h1>
        <p style={{ color: '#475569', fontSize: 17, maxWidth: 800, lineHeight: 1.65 }}>
          Simulate the updates a consumer would receive after upload. These are not sent yet; they are previews for portal, email, and text workflows.
        </p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(290px,.7fr)', gap: 18, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 18 }}>
          <div style={card}>
            <h2 style={{ marginTop: 0 }}>{caseData.consumerName}</h2>
            <p style={{ color: '#475569', marginTop: 0 }}>{caseData.consumerEmail} - Case {caseData.caseId}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                ['Portal', caseData.communication?.portal],
                ['Email preview', caseData.communication?.email],
                ['Text preview', caseData.communication?.text],
              ].map(([label, enabled]) => (
                <span key={label} style={{ borderRadius: 999, padding: '7px 11px', background: enabled ? '#dcfce7' : '#f1f5f9', color: enabled ? '#166534' : '#64748b', fontWeight: 900 }}>
                  {label}: {enabled ? 'On' : 'Off'}
                </span>
              ))}
            </div>
          </div>

          <div style={card}>
            <h2 style={{ marginTop: 0 }}>Message Previews</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {messages.map((message) => (
                <article key={message.id} style={{ border: '1px solid #cfeee0', borderRadius: 8, padding: 16, background: String(message.status || '').toLowerCase().includes('disabled') ? '#fffdf5' : 'white' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <strong>{message.subject}</strong>
                    <span style={{ color: String(message.status || '').toLowerCase().includes('disabled') ? '#64748b' : '#0369a1', fontWeight: 900 }}>{message.status}</span>
                  </div>
                  <p style={{ color: '#64748b', margin: '8px 0' }}>{message.channel} to {message.to}</p>
                  <p style={{ lineHeight: 1.65, marginBottom: 0 }}>{message.body}</p>
                  {message.id === 'msg-005' && (
                    <Link href="/monthly" style={{ display: 'inline-block', marginTop: 12, color: '#0369a1', fontWeight: 900 }}>
                      Open monthly update
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div style={card}>
            <h2 style={{ marginTop: 0 }}>Portal Updates</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {updates.map((update) => (
                <div key={`${update.time}-${update.title}`} style={{ borderLeft: '4px solid #10b981', padding: '4px 0 4px 14px' }}>
                  <strong>{update.title}</strong>
                  <p style={{ margin: '4px 0', color: '#475569' }}>{update.body}</p>
                  <span style={{ color: '#64748b', fontSize: 13 }}>{update.channel} - {update.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside style={{ display: 'grid', gap: 18 }}>
          <div style={card}>
            <h2 style={{ marginTop: 0 }}>Demo Consumers</h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {cases.map((item) => (
                <button
                  key={item.caseId}
                  onClick={() => switchCase(item)}
                  style={{
                    textAlign: 'left',
                    border: item.caseId === caseData.caseId ? '2px solid #10b981' : '1px solid #e5e7eb',
                    background: item.caseId === caseData.caseId ? '#f0fdf4' : 'white',
                    borderRadius: 8,
                    padding: 12,
                    cursor: 'pointer',
                  }}
                >
                  <strong>{item.consumerName}</strong><br />
                  <span style={{ color: '#64748b' }}>{item.consumerEmail}</span>
                </button>
              ))}
            </div>
            <Link href="/scan" style={{ display: 'inline-block', marginTop: 12, color: '#0369a1', fontWeight: 900 }}>Create another test consumer</Link>
          </div>

          <div style={{ ...card, background: '#fffbeb', borderColor: '#fde68a' }}>
            <h2 style={{ marginTop: 0 }}>Production Later</h2>
            <p style={{ color: '#92400e', lineHeight: 1.55 }}>
              Real sending will need consent records, unsubscribe controls, delivery logs, and a provider like SendGrid, Mailgun, Postmark, Twilio, or another compliant vendor.
            </p>
            <Link href="/monthly" style={{ color: '#0369a1', fontWeight: 900 }}>Preview the monthly update page</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
