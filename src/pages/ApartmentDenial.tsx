import { Building2 } from 'lucide-react';
import CampaignPage from '../components/CampaignPage';

export default function ApartmentDenial() {
  return (
    <CampaignPage
      campaign="apartment_denial"
      source="apartment_denial_page"
      eyebrow="Apartment denial credit check-in"
      headline="Denied for an apartment or worried your credit report is holding you back?"
      body="Start with a free AI Credit Check-In. Credit Vivo helps you review possible report problems in plain English before your next rental application."
      icon={Building2}
      checklist={[
        'Collections connected to old bills or utilities',
        'Addresses or names that do not look right',
        'Accounts you do not recognize',
        'Balances or statuses that may be reported inconsistently',
      ]}
      nextStepHeadline="Before the next rental application, understand what may need attention."
      proofPoints={[
        { title: 'Start free', desc: 'Begin with your goal and a simple credit report review path.' },
        { title: 'Understand the issue', desc: 'See possible problems in plain English, not bureau jargon.' },
        { title: 'Prepare your file', desc: 'Organize findings and next steps before taking action.' },
      ]}
    />
  );
}
