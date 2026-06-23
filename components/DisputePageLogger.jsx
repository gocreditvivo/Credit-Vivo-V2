'use client';

import { useEffect } from 'react';
import { logEvent } from './eventLog';

export default function DisputePageLogger() {
  useEffect(() => {
    logEvent('page_viewed', {
      area: 'Dispute Center',
      page: '/disputes',
      workflow: 'staged_dispute_rounds',
      currentRound: 'Prep',
    });
  }, []);

  return null;
}
