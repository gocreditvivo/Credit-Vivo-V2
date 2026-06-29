import { Car } from 'lucide-react';
import CampaignPage from '../components/CampaignPage';

export default function AutoLoanDenial() {
  return (
    <CampaignPage
      campaign="auto_loan_denial"
      source="auto_loan_denial_page"
      eyebrow="Auto loan credit check-in"
      headline="Denied for a car loan or offered a bad rate?"
      body="Start with a free AI Credit Check-In. Credit Vivo helps you review possible credit report problems in plain English before you apply again."
      icon={Car}
      checklist={[
        'Collections you do not recognize',
        'Late payments reported incorrectly',
        'Duplicate accounts or wrong balances',
        'Old names, addresses, or identity mix-ups',
      ]}
      nextStepHeadline="Before you apply again, understand what may be holding you back."
      proofPoints={[
        { title: 'Start free', desc: 'Tell us your goal and begin the Credit Check-In flow.' },
        { title: 'Review findings', desc: 'See possible report issues explained in normal language.' },
        { title: 'Choose next step', desc: 'Dispute yourself, use guided support, or prepare serious files for attorney review options.' },
      ]}
    />
  );
}
