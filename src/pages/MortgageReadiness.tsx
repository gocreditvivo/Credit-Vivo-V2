import { Home } from 'lucide-react';
import CampaignPage from '../components/CampaignPage';

export default function MortgageReadiness() {
  return (
    <CampaignPage
      campaign="mortgage_readiness"
      source="mortgage_readiness_page"
      eyebrow="Mortgage readiness credit check-in"
      headline="Planning to buy a home? Check your credit report before the lender does."
      body="Start with a free AI Credit Check-In. Credit Vivo helps you review possible report issues early, so you can understand what may need attention before applying."
      icon={Home}
      checklist={[
        'Collections or charge-offs that may affect approval',
        'Late payments that may be reporting incorrectly',
        'High balances or wrong balances across bureaus',
        'Old personal information that may confuse your file',
      ]}
      nextStepHeadline="Before mortgage season, know what your report may be saying."
      proofPoints={[
        { title: 'Check early', desc: 'Start before the lender review so you have time to understand the report.' },
        { title: 'See possible issues', desc: 'Review items that may need a closer look or documentation.' },
        { title: 'Plan next steps', desc: 'Use the findings to decide whether to dispute, wait, pay down, or seek guided support.' },
      ]}
    />
  );
}
