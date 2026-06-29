import { AlertCircle } from 'lucide-react';
import CampaignPage from '../components/CampaignPage';

export default function CollectionNotMine() {
  return (
    <CampaignPage
      campaign="collection_not_mine"
      source="collection_not_mine_page"
      eyebrow="Collection account credit check-in"
      headline="See a collection account you do not recognize?"
      body="Start with a free AI Credit Check-In. Credit Vivo helps you review possible collection reporting issues and understand what may need a closer look."
      icon={AlertCircle}
      checklist={[
        'Collection accounts you do not recognize',
        'Duplicate collection reporting',
        'Wrong balances or reporting dates',
        'Original creditor details that need review',
      ]}
      nextStepHeadline="Before you dispute or pay, understand what is being reported."
      proofPoints={[
        { title: 'Review the account', desc: 'Look at the collector, balance, dates, and original creditor details.' },
        { title: 'Check for problems', desc: 'Identify possible duplicates, mismatches, or incomplete reporting.' },
        { title: 'Choose next step', desc: 'Decide whether to dispute yourself, use guided support, or prepare for escalation.' },
      ]}
    />
  );
}
