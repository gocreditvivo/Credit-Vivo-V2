'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo';
import { logEvent } from './eventLog';

const STORAGE_KEY = 'creditVivoDemoCase';
const CASES_KEY = 'creditVivoDemoCases';

const steps = [
  'Secure upload received',
  'Report type identified',
  'Customer-friendly findings prepared',
  'Dispute package drafted',
  'Follow-up schedule created',
];

const shell = {
  fontFamily: 'var(--cv-font)',
  background: 'linear-gradient(180deg, #fffdf5 0%, #f0fdf4 48%, #eef9ff 100%)',
  color: '#102033',
  minHeight: '100vh',
  padding: '34px 7% 70px',
};

const card = {
  background: 'rgba(255,255,255,.94)',
  border: '1px solid #cfeee0',
  borderRadius: 8,
  padding: 24,
  boxShadow: '0 18px 42px rgba(16,32,51,.09)',
};

const button = {
  border: 0,
  borderRadius: 8,
  padding: '13px 18px',
  fontWeight: 800,
  cursor: 'pointer',
  background: 'linear-gradient(135deg, #0f766e, #12b981)',
  color: 'white',
  boxShadow: '0 14px 28px rgba(18,185,129,.24)',
};

export default function ScanSimulationClient() {
  const [consumerName, setConsumerName] = useState('Demo Customer');
  const [consumerEmail, setConsumerEmail] = useState('');
  const [file, setFile] = useState(null);
  const [bureau, setBureau] = useState('3-bureau report');
  const [notes, setNotes] = useState('');
  const [channels, setChannels] = useState({ portal: true, email: true, text: false });
  const [acknowledged, setAcknowledged] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [status, setStatus] = useState('');
  const [caseData, setCaseData] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    logEvent('page_viewed', { area: 'Upload Reports', page: '/scan' });
  }, []);

  function saveDemoCase(nextCase) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCase));
    let existing = [];
    try {
      existing = JSON.parse(localStorage.getItem(CASES_KEY)) || [];
    } catch {
      existing = [];
    }
    const withoutCurrent = existing.filter((item) => item.caseId !== nextCase.caseId && item.consumerEmail !== nextCase.consumerEmail);
    localStorage.setItem(CASES_KEY, JSON.stringify([nextCase, ...withoutCurrent].slice(0, 10)));
  }

  async function runSimulation(event) {
    event.preventDefault();
    setBusy(true);
    setCaseData(null);
    setStatus('Starting simulated upload...');
    setCurrentStep(0);
    logEvent('scan_started', {
      area: 'Upload Reports',
      consumerName,
      consumerEmail,
      bureau,
      hasFile: Boolean(file),
      reportName: file?.name || 'sample-3-bureau-credit-report.pdf',
      reportSize: file?.size || 0,
      notesLength: notes.length,
      channels,
    });

    for (let i = 0; i < steps.length; i += 1) {
      setCurrentStep(i);
      setStatus(steps[i]);
      logEvent('scan_step_completed', {
        area: 'Upload Reports',
        consumerName,
        consumerEmail,
        stepNumber: i + 1,
        step: steps[i],
      });
      await new Promise((resolve) => setTimeout(resolve, 450));
    }

    try {
      const form = new FormData();
      if (file) form.append('report', file);
      form.append('consumerName', consumerName);
      form.append('consumerEmail', consumerEmail);
      form.append('bureau', bureau);
      form.append('notes', notes);
      form.append('portal', String(channels.portal));
      form.append('email', String(channels.email));
      form.append('text', String(channels.text));
      form.append('acknowledged', String(acknowledged));

      const response = await fetch('/api/scan', { method: 'POST', body: form });
      const data = await response.json();
      saveDemoCase(data.case);
      setCaseData(data.case);
      setStatus('Simulation complete. Portal case created.');
      logEvent('case_created', {
        area: 'Upload Reports',
        caseId: data.case.caseId,
        consumerName: data.case.consumerName,
        consumerEmail: data.case.consumerEmail,
        reportName: data.case.reportName,
        status: data.case.status,
        potentialIssues: data.case.potentialIssues,
        activeDisputes: data.case.activeDisputes,
        channels: data.case.communication,
      });
    } catch (error) {
      setStatus('Simulation failed. Please try again.');
      logEvent('scan_failed', {
        area: 'Upload Reports',
        consumerName,
        consumerEmail,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={shell}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 34, background: 'rgba(255,255,255,.78)', border: '1px solid #cfeee0', borderRadius: 8, padding: '12px 14px', boxShadow: '0 12px 28px rgba(16,32,51,.06)' }}>
        <BrandLogo />
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/findings">Findings</Link>
          <Link href="/messages">Messages</Link>
          <Link href="/monthly">Monthly</Link>
          <Link href="/vault">Vault</Link>
          <Link href="/disputes">Disputes</Link>
          <Link href="/events">Events</Link>
        </div>
      </nav>

      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(320px,.95fr)', gap: 22, alignItems: 'start' }}>
        <div>
          <p style={{ display: 'inline-block', background: '#dcfce7', color: '#047857', padding: '7px 11px', borderRadius: 999, fontWeight: 900 }}>Realistic demo mode</p>
          <h1 style={{ fontSize: 42, lineHeight: 1.08, margin: '16px 0 10px' }}>Upload a report and simulate the customer journey.</h1>
          <p style={{ color: '#475569', fontSize: 17, lineHeight: 1.65, maxWidth: 760 }}>
            This demo acts like a real portal: manual upload intake, scan status, portal updates, email/text follow-up previews, findings, vault items, and dispute tracking. It does not send real texts or mail disputes.
          </p>

          <form onSubmit={runSimulation} style={{ ...card, marginTop: 22, display: 'grid', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
              <label style={{ display: 'grid', gap: 8, fontWeight: 800 }}>
                Consumer name
                <input
                  value={consumerName}
                  onChange={(event) => setConsumerName(event.target.value)}
                  placeholder="Example: Maria Johnson"
                  style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: 12 }}
                />
              </label>

              <label style={{ display: 'grid', gap: 8, fontWeight: 800 }}>
                Consumer email
                <input
                  value={consumerEmail}
                  onChange={(event) => setConsumerEmail(event.target.value)}
                  placeholder="example@email.com"
                  type="email"
                  style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: 12 }}
                />
                <span style={{ color: '#64748b', fontWeight: 500 }}>Use a couple of your own test emails here. Nothing is sent.</span>
              </label>
            </div>

            <label style={{ display: 'grid', gap: 8, fontWeight: 800 }}>
              Credit report file
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(event) => {
                  const selected = event.target.files?.[0] || null;
                  setFile(selected);
                  if (selected) {
                    logEvent('report_file_selected', {
                      area: 'Upload Reports',
                      consumerName,
                      consumerEmail,
                      reportName: selected.name,
                      reportSize: selected.size,
                      reportType: selected.type || 'unknown',
                    });
                  }
                }}
                style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: 12, background: '#eef9ff' }}
              />
              <span style={{ color: '#64748b', fontWeight: 500 }}>{file ? `Selected: ${file.name}` : 'No file selected. Demo will use a sample 3-bureau case if blank.'}</span>
              <span style={{ color: '#b45309', fontWeight: 700 }}>Do not upload a full Social Security number, ID, or sensitive document unless the secure production portal specifically asks for it.</span>
            </label>

            <label style={{ display: 'grid', gap: 8, fontWeight: 800 }}>
              Report source
              <select value={bureau} onChange={(event) => setBureau(event.target.value)} style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: 12 }}>
                <option>3-bureau report</option>
                <option>Experian</option>
                <option>Equifax</option>
                <option>TransUnion</option>
                <option>Manual staff upload</option>
              </select>
            </label>

            <label style={{ display: 'grid', gap: 8, fontWeight: 800 }}>
              Customer notes
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                placeholder="Example: I believe this collection is duplicated and I want updates by email."
                style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: 12, font: 'inherit' }}
              />
            </label>

            <div style={{ display: 'grid', gap: 10 }}>
              <strong>Update preferences for demo</strong>
              {[
                ['portal', 'Portal updates'],
                ['email', 'Email update preview'],
                ['text', 'Text message reminder preview'],
              ].map(([key, label]) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={channels[key]}
                    onChange={(event) => {
                      const nextValue = event.target.checked;
                      setChannels((value) => ({ ...value, [key]: nextValue }));
                      logEvent('update_preference_changed', {
                        area: 'Upload Reports',
                        consumerName,
                        consumerEmail,
                        channel: key,
                        enabled: nextValue,
                      });
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>

            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: '#475569', lineHeight: 1.5 }}>
              <input
                type="checkbox"
                required
                checked={acknowledged}
                onChange={(event) => setAcknowledged(event.target.checked)}
              />
              <span>
                I understand this is a demo. Results vary, Credit Vivo does not guarantee deletions or score increases,
                and I can dispute inaccurate credit report information directly at no cost.
              </span>
            </label>

            <button disabled={busy} style={{ ...button, opacity: busy ? .7 : 1 }} type="submit">
              {busy ? 'Running simulation...' : 'Upload and simulate scan'}
            </button>
          </form>
        </div>

        <aside style={{ display: 'grid', gap: 16 }}>
          <div style={card}>
            <h2 style={{ marginTop: 0 }}>Live Status</h2>
            <p style={{ color: '#0369a1', fontWeight: 900 }}>{status || 'Ready for report upload.'}</p>
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              {steps.map((step, index) => (
                <div key={step} style={{ display: 'flex', gap: 10, alignItems: 'center', color: index <= currentStep ? '#166534' : '#64748b' }}>
                  <span style={{ width: 24, height: 24, borderRadius: 999, display: 'grid', placeItems: 'center', background: index <= currentStep ? '#bbf7d0' : '#e2e8f0', fontWeight: 900 }}>{index + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {caseData && (
            <div style={{ ...card, borderColor: '#86efac', background: '#f0fdf4' }}>
              <h2 style={{ marginTop: 0 }}>Case Created</h2>
              <p><strong>Case:</strong> {caseData.caseId}</p>
              <p><strong>Consumer:</strong> {caseData.consumerName} ({caseData.consumerEmail})</p>
              <p><strong>Report:</strong> {caseData.reportName}</p>
              <p><strong>Potential issues:</strong> {caseData.potentialIssues}</p>
              <p><strong>Active dispute drafts:</strong> {caseData.activeDisputes}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
                <Link href="/dashboard" style={button}>Open Dashboard</Link>
                <Link href="/findings" style={{ ...button, background: '#166534' }}>Review Findings</Link>
                <Link href="/messages" style={{ ...button, background: '#0369a1' }}>See Message Flow</Link>
                <Link href="/monthly" style={{ ...button, background: '#7c3aed' }}>Monthly Update</Link>
              </div>
            </div>
          )}

          <div style={{ ...card, background: '#fffbeb' }}>
            <h2 style={{ marginTop: 0 }}>Manual Upload Reality Check</h2>
            <p style={{ color: '#92400e', lineHeight: 1.55 }}>
              In production, reports and IDs need encrypted storage, real login, audit logs, and consent. This simulation shows the customer flow only.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
