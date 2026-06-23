export const EVENT_LOG_KEY = 'creditVivoEventLog';
export const MAX_EVENTS = 300;

const SAFE_ANALYTICS_KEYS = [
  'area',
  'page',
  'bureau',
  'hasFile',
  'reportSize',
  'reportType',
  'notesLength',
  'channel',
  'enabled',
  'stepNumber',
  'step',
  'status',
  'potentialIssues',
  'activeDisputes',
  'findingCount',
  'documentCount',
  'documentType',
  'documentStatus',
];

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readEvents() {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(EVENT_LOG_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function cleanDetails(details = {}) {
  const safe = {};
  Object.entries(details || {}).forEach(([key, value]) => {
    if (value === undefined || typeof value === 'function') return;
    if (key.toLowerCase().includes('raw') || key.toLowerCase().includes('ssn')) return;
    safe[key] = value;
  });
  return safe;
}

function toAnalyticsValue(value) {
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return value.slice(0, 100);
  return undefined;
}

function sendAnalyticsEvent(event) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const details = event.details || {};
  const params = {
    event_category: details.area || 'Credit Vivo',
  };

  SAFE_ANALYTICS_KEYS.forEach((key) => {
    const value = toAnalyticsValue(details[key]);
    if (value !== undefined) {
      params[key] = value;
    }
  });

  window.gtag('event', event.type, params);
}

export function logEvent(type, details = {}) {
  if (!canUseStorage()) return null;
  const event = {
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    occurredAt: new Date().toISOString(),
    displayTime: new Date().toLocaleString(),
    caseId: details.caseId || '',
    consumerEmail: details.consumerEmail || '',
    consumerName: details.consumerName || '',
    details: cleanDetails(details),
  };
  const next = [event, ...readEvents()].slice(0, MAX_EVENTS);
  window.localStorage.setItem(EVENT_LOG_KEY, JSON.stringify(next));
  sendAnalyticsEvent(event);
  window.dispatchEvent(new CustomEvent('creditvivo:event-log-updated', { detail: event }));
  return event;
}

export function getEvents() {
  return readEvents();
}

export function clearEvents() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(EVENT_LOG_KEY);
  window.dispatchEvent(new CustomEvent('creditvivo:event-log-updated'));
}

export function exportEventsJson() {
  return JSON.stringify(readEvents(), null, 2);
}
