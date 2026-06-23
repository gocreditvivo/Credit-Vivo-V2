'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import BrandLogo from './BrandLogo';
import { clearEvents, exportEventsJson, getEvents, logEvent } from './eventLog';

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

const button = {
  border: 0,
  borderRadius: 8,
  padding: '11px 14px',
  fontWeight: 900,
  cursor: 'pointer',
  background: 'linear-gradient(135deg, #0f766e, #12b981)',
  color: 'white',
  boxShadow: '0 14px 28px rgba(18,185,129,.24)',
};

function downloadEvents() {
  const blob = new Blob([exportEventsJson()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `credit-vivo-event-log-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function EventLogClient() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    logEvent('event_log_viewed', { area: 'Internal Audit Log' });
    setEvents(getEvents());
    function refresh() {
      setEvents(getEvents());
    }
    window.addEventListener('creditvivo:event-log-updated', refresh);
    return () => window.removeEventListener('creditvivo:event-log-updated', refresh);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return events;
    return events.filter((event) => JSON.stringify(event).toLowerCase().includes(needle));
  }, [events, query]);

  function handleClear() {
    clearEvents();
    setEvents([]);
  }

  return (
    <main style={shell}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 28, alignItems: 'center', background: 'rgba(255,255,255,.78)', border: '1px solid #cfeee0', borderRadius: 8, padding: '12px 14px', boxShadow: '0 12px 28px rgba(16,32,51,.06)' }}>
        <BrandLogo />
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/scan">Upload</Link>
          <Link href="/messages">Messages</Link>
          <Link href="/monthly">Monthly</Link>
          <Link href="/disputes">Disputes</Link>
        </div>
      </nav>

      <section style={{ marginBottom: 24 }}>
        <p style={{ display: 'inline-block', background: '#e0f2fe', color: '#0369a1', padding: '7px 11px', borderRadius: 999, fontWeight: 800 }}>Internal only</p>
        <h1 style={{ fontSize: 42, margin: '14px 0 8px' }}>Event Log</h1>
        <p style={{ color: '#475569', maxWidth: 820, lineHeight: 1.65 }}>
          This launch-preview audit trail logs portal workflow events in this browser only. Production needs server-side immutable audit logs, user IDs, IP/session metadata, retention rules, and encrypted storage.
        </p>
      </section>

      <section style={{ ...card, marginBottom: 18, display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events, case ID, email, page..."
            style={{ flex: '1 1 280px', border: '1px solid #cbd5e1', borderRadius: 8, padding: 12 }}
          />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" onClick={downloadEvents} style={button}>Export JSON</button>
            <button type="button" onClick={handleClear} style={{ ...button, background: '#991b1b' }}>Clear Preview Log</button>
          </div>
        </div>
        <strong>{filtered.length} event{filtered.length === 1 ? '' : 's'} shown</strong>
      </section>

      <section style={{ display: 'grid', gap: 12 }}>
        {filtered.length === 0 && (
          <div style={card}>
            <strong>No events yet.</strong>
            <p style={{ color: '#64748b', marginBottom: 0 }}>Run an upload preview, open messages, switch test consumers, or add a vault document to populate the log.</p>
          </div>
        )}
        {filtered.map((event) => (
          <article key={event.id} style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <strong>{event.type}</strong>
                <p style={{ color: '#64748b', margin: '6px 0 0' }}>{event.displayTime}</p>
              </div>
              <span style={{ background: '#f1f5f9', color: '#0369a1', borderRadius: 999, padding: '7px 11px', fontWeight: 900 }}>{event.caseId || 'No case'}</span>
            </div>
            {(event.consumerName || event.consumerEmail) && (
              <p style={{ color: '#334155' }}>{event.consumerName} {event.consumerEmail ? `(${event.consumerEmail})` : ''}</p>
            )}
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', background: '#fffdf5', border: '1px solid #cfeee0', borderRadius: 8, padding: 12, color: '#334155', overflowX: 'auto' }}>
              {JSON.stringify(event.details, null, 2)}
            </pre>
          </article>
        ))}
      </section>
    </main>
  );
}
