'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo';
import { demoCase } from './demoCase';
import { logEvent } from './eventLog';

const STORAGE_KEY = 'creditVivoDemoCase';

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

function ListBlock({ title, items, tone = '#fffdf5' }) {
  return (
    <div style={{ background: tone, border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
      <strong>{title}</strong>
      <ul style={{ marginBottom: 0, paddingLeft: 20, color: '#334155', lineHeight: 1.7 }}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default function MonthlyUpdateClient() {
  const [caseData, setCaseData] = useState(demoCase);

  useEffect(() => {
    const loaded = readActiveCase();
    setCaseData(loaded);
    logEvent('monthly_update_viewed', {
      area: 'Monthly Update',
      page: '/monthly',
      caseId: loaded.caseId,
      consumerName: loaded.consumerName,
      consumerEmail: loaded.consumerEmail,
    });
  }, []);

  const statements = caseData.monthlyStatements?.length ? caseData.monthlyStatements : demoCase.monthlyStatements;
  const latest = statements[statements.length - 1];
  const totalChange = latest.scoreEnd - statements[0].scoreStart;

  return (
    <main style={shell}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 28, alignItems: 'center', background: 'rgba(255,255,255,.78)', border: '1px solid #cfeee0', borderRadius: 8, padding: '12px 14px', boxShadow: '0 12px 28px rgba(16,32,51,.06)' }}>
        <BrandLogo />
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/messages">Messages</Link>
          <Link href="/findings">Findings</Link>
          <Link href="/vault">Vault</Link>
          <Link href="/disputes">Disputes</Link>
        </div>
      </nav>

      <section style={{ marginBottom: 24 }}>
        <p style={{ display: 'inline-block', background: '#dcfce7', color: '#047857', padding: '7px 11px', borderRadius: 999, fontWeight: 900 }}>Monthly statement</p>
        <h1 style={{ fontSize: 42, margin: '14px 0 8px' }}>Your Credit Vivo update</h1>
        <p style={{ color: '#475569', fontSize: 17, maxWidth: 820, lineHeight: 1.65 }}>
          A simple monthly summary for {caseData.consumerName}. It shows score movement when available, work completed, what is waiting, and what happens next.
        </p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginBottom: 18 }}>
        {[
          ['Latest score', latest.scoreEnd, `${latest.month} update`],
          ['Total trend', `${totalChange >= 0 ? '+' : ''}${totalChange}`, 'Preview point movement'],
          ['Active plan', 'Round review', 'Evidence-backed next step'],
          ['Customer tasks', latest.customerNeeds.length, 'Items we need from you'],
        ].map(([label, value, note]) => (
          <div key={label} style={card}>
            <p style={{ margin: 0, color: '#64748b', fontWeight: 800 }}>{label}</p>
            <strong style={{ display: 'block', fontSize: 32, margin: '8px 0' }}>{value}</strong>
            <span style={{ color: '#64748b' }}>{note}</span>
          </div>
        ))}
      </section>

      <section style={{ ...card, marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: '0 0 8px' }}>{latest.month}: {latest.headline}</h2>
            <p style={{ color: '#334155', lineHeight: 1.65, margin: 0 }}>{latest.plainSummary}</p>
          </div>
          <span style={{ alignSelf: 'start', background: latest.scoreChange >= 0 ? '#dcfce7' : '#fee2e2', color: latest.scoreChange >= 0 ? '#166534' : '#991b1b', borderRadius: 999, padding: '8px 12px', fontWeight: 900 }}>
            {latest.scoreChange >= 0 ? '+' : ''}{latest.scoreChange} this month
          </span>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginBottom: 18 }}>
        <ListBlock title="What Credit Vivo did" items={latest.workCompleted} tone="#f0fdf4" />
        <ListBlock title="What we need from you" items={latest.customerNeeds} tone="#fffbeb" />
        <div style={{ ...card, background: '#eef6ff', borderColor: '#bfdbfe' }}>
          <strong>Next plan</strong>
          <p style={{ color: '#334155', lineHeight: 1.65, marginBottom: 0 }}>{latest.nextPlan}</p>
        </div>
      </section>

      <section style={card}>
        <h2 style={{ marginTop: 0 }}>Monthly History</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {statements.map((statement) => (
            <div key={statement.month} style={{ display: 'grid', gridTemplateColumns: '110px minmax(0,1fr) auto', gap: 12, borderTop: '1px solid #e5e7eb', padding: '12px 0' }}>
              <strong>{statement.month}</strong>
              <span style={{ color: '#334155' }}>{statement.headline}</span>
              <span style={{ fontWeight: 900, color: statement.scoreChange >= 0 ? '#166534' : '#991b1b' }}>{statement.scoreChange >= 0 ? '+' : ''}{statement.scoreChange}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: 18, marginTop: 18 }}>
        <strong>Important:</strong> Score increases are not guaranteed. Scores may change for reasons outside Credit Vivo's control, including utilization, new accounts, payment history, bureau timing, and scoring model differences.
      </section>
    </main>
  );
}
