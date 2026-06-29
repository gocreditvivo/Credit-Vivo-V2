type EventPayload = {
  event_type: string;
  source: string;
  campaign?: string;
  lead_id?: string;
  customer_id?: string;
  partner?: string;
  amount?: number;
  metadata?: Record<string, unknown>;
};

export async function trackEvent(payload: EventPayload) {
  try {
    await fetch('/api/events/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Tracking should never block a customer from continuing.
  }
}
