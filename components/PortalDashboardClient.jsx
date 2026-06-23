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

function loadCase() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : demoCase;
  } catch {
    return demoCase;
  }
}

function loadCases() {
  try {
    const raw = localStorage.getItem(CASES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return parsed.length ? parsed : [loadCase()];
  } catch {
    return [demoCase];
  }
}

export default function PortalDashboardClient() {
  const [caseData, setCaseData] = useState(demoCase);
  const [cases, setCases] = useState([demoCase]);

  useEffect(() => {
    const loadedCase = loadCase();
    setCaseData(loadedCase);
    setCases(loadCases());
    logEvent('page_viewed', {
      area: 'Dashboard',
      page: '/dashboard',
      caseId: loadedCase.caseId,
      consumerName: loadedCase.consumerName,
      consumerEmail: loadedCase.consumerEmail,
    });
  }, []);

  function switchCase(nextCase) {
    setCaseData(nextCase);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCase));
    logEvent('case_switched', {
      area: 'Dashboard',
      caseId: nextCase.caseId,
      consumerName: nextCase.consumerName,
      consumerEmail: nextCase.consumerEmail,
    });
  }

  const metrics = [
    ['Credit Health Score', `${caseData.healthScore}/100`, 'Demo estimate based on issue count and account mix.'],
    ['Negative Accounts', caseData.negativeAccounts, 'Items to review before disputes.'],
    ['Potential Issues', caseData.potentialIssues, 'Customer-friendly possible errors.'],
    ['Active Disputes', caseData.activeDisputes, 'Drafts ready for review in demo mode.'],
  ];
  const scoreProgress = caseData.scoreProgress?.length ? caseData.scoreProgress : demoCase.scoreProgress;
  const monthlyValue = caseData.monthlyValue?.length ? caseData.monthlyValue : demoCase.monthlyValue;
  const creditBoostTasks = caseData.creditBoostTasks?.length ? caseData.creditBoostTasks : demoCase.creditBoostTasks;
  const startScore = scoreProgress[0]?.score || caseData.healthScore;
  const latestScore = scoreProgress[scoreProgress.length - 1]?.score || caseData.healthScore;
  const totalScoreChange = latestScore - startScore;
  const maxScore = Math.max(...scoreProgress.map((item) => item.score), 700);
  const minScore = Math.min(...scoreProgress.map((item) => item.score), 500);

  return (
    <main style={shell}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 28, background: 'rgba(255,255,255,.78)', border: '1px solid #cfeee0', borderRadius: 8, padding: '12px 14px', boxShadow: '0 12px 28px rgba(16,32,51,.06)' }}>
        <BrandLogo />
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/scan">Upload</Link>
          <Link href="/findings">Findings</Link>
          <Link href="/messages">Messages</Link>
          <Link href="/monthly">Monthly</Link>
          <Link href="/vault">Vault</Link>
          <Link href="/disputes">Disputes</Link>
          <Link href="/events">Events</Link>
        </div>
      </nav>

      <section style={{ marginBottom: 24 }}>
        <p style={{ display: 'inline-block', background: '#dcfce7', color: '#047857', padding: '7px 11px', borderRadius: 999, fontWeight: 900 }}>Customer portal simulation</p>
        <h1 style={{ fontSize: 42, margin: '14px 0 8px' }}>Welcome back, {caseData.consumerName}.</h1>
        <p style={{ color: '#475569', fontSize: 17 }}>Case {caseData.caseId} for {caseData.consumerEmail} is in {caseData.status.toLowerCase()} from {caseData.source}.</p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 16, marginBottom: 22 }}>
        {metrics.map(([label, value, help]) => (
          <div key={label} style={card}>
            <p style={{ margin: 0, color: '#64748b', fontWeight: 800 }}>{label}</p>
            <strong style={{ display: 'block', fontSize: 30, margin: '10px 0' }}>{value}</strong>
            <span style={{ color: '#64748b', fontSize: 14 }}>{help}</span>
          </div>
        ))}
      </section>

      <section style={{ ...card, marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'start' }}>
          <div>
            <h2 style={{ margin: '0 0 8px' }}>Monthly Progress</h2>
            <p style={{ color: '#475569', margin: 0, lineHeight: 1.55 }}>Track score movement and the work completed each month. Score movement can vary by bureau and scoring model.</p>
          </div>
          <div style={{ background: totalScoreChange >= 0 ? '#dcfce7' : '#fee2e2', color: totalScoreChange >= 0 ? '#166534' : '#991b1b', borderRadius: 8, padding: '12px 14px', fontWeight: 900 }}>
            {totalScoreChange >= 0 ? '+' : ''}{totalScoreChange} points demo trend
          </div>
        </div>

        <Link href="/monthly" style={{ display: 'inline-block', marginTop: 14, background: 'linear-gradient(135deg, #0f766e, #12b981)', color: 'white', textDecoration: 'none', borderRadius: 8, padding: '11px 14px', fontWeight: 900, boxShadow: '0 14px 28px rgba(18,185,129,.24)' }}>
          Open monthly update
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginTop: 18 }}>
          {scoreProgress.map((item) => {
            const percent = Math.max(12, Math.round(((item.score - minScore) / Math.max(1, maxScore - minScore)) * 100));
            return (
              <div key={item.month} style={{ background: '#fffdf5', border: '1px solid #cfeee0', borderRadius: 8, padding: 14 }}>
                <p style={{ margin: 0, color: '#64748b', fontWeight: 800 }}>{item.month}</p>
                <strong style={{ display: 'block', fontSize: 28, margin: '8px 0' }}>{item.score}</strong>
                <div style={{ height: 9, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${percent}%`, height: '100%', background: '#10b981' }} />
                </div>
                <p style={{ color: '#64748b', marginBottom: 0 }}>{item.label} {item.change ? `(${item.change > 0 ? '+' : ''}${item.change})` : ''}</p>
              </div>
            );
          })}
        </div>

        <p style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: 12, color: '#92400e', margin: '16px 0 0', lineHeight: 1.55 }}>
          Demo note: Credit Vivo should never promise a monthly score increase. The portal should show actual score updates when available plus completed work, response tracking, and credit-building actions.
        </p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(300px,.75fr)', gap: 18, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 18 }}>
          <div style={card}>
            <h2 style={{ marginTop: 0 }}>Value This Month</h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {monthlyValue.map((item) => (
                <div key={item.item} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 12, borderTop: '1px solid #e5e7eb', padding: '11px 0' }}>
                  <span><strong>{item.item}</strong><br /><span style={{ color: '#64748b' }}>{item.customerBenefit}</span></span>
                  <span style={{ color: item.status === 'Complete' ? '#166534' : item.status === 'Needed' ? '#b45309' : '#0369a1', fontWeight: 900 }}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={card}>
            <h2 style={{ marginTop: 0 }}>Recent Activity</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {caseData.updates.map((update) => (
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
            <Link href="/scan" style={{ display: 'inline-block', marginTop: 12, color: '#0369a1', fontWeight: 900 }}>Add another demo email</Link>
          </div>

          <div style={card}>
            <h2 style={{ marginTop: 0 }}>Next Best Actions</h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {creditBoostTasks.map((task) => (
                <div key={task.task} style={{ borderTop: '1px solid #e5e7eb', padding: '10px 0' }}>
                  <strong>{task.task}</strong>
                  <p style={{ color: '#64748b', margin: '4px 0 0' }}>Impact: {task.impact} - {task.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={card}>
            <h2 style={{ marginTop: 0 }}>Update Channels</h2>
            <div style={{ display: 'grid', gap: 8, color: '#334155' }}>
              <span><strong>Portal:</strong> {caseData.communication?.portal ? 'On' : 'Off'}</span>
              <span><strong>Email preview:</strong> {caseData.communication?.email ? 'On' : 'Off'}</span>
              <span><strong>Text preview:</strong> {caseData.communication?.text ? 'On' : 'Off'}</span>
            </div>
            <Link href="/messages" style={{ display: 'inline-block', marginTop: 12, color: '#0369a1', fontWeight: 900 }}>Open message flow</Link>
            <br />
            <Link href="/monthly" style={{ display: 'inline-block', marginTop: 8, color: '#0369a1', fontWeight: 900 }}>Open monthly update</Link>
          </div>

          <div style={card}>
            <h2 style={{ marginTop: 0 }}>Follow-Up Schedule</h2>
            {caseData.followUps.map((item) => (
              <div key={item.day} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid #e5e7eb', padding: '10px 0' }}>
                <span><strong>{item.day}</strong><br />{item.item}</span>
                <span style={{ color: item.status === 'Complete' ? '#166534' : '#0369a1', fontWeight: 800 }}>{item.status}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
