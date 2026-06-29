import {
  AlertTriangle,
  Brain,
  CheckCircle,
  CreditCard,
  FileText,
  HeartPulse,
  Link2,
  Mail,
  Megaphone,
  MousePointerClick,
  Scale,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';

export type OpsTone = 'green' | 'yellow' | 'gray' | 'sky' | 'purple';

export type OpsCard = {
  title: string;
  status: string;
  detail: string;
  icon: LucideIcon;
  tone: OpsTone;
};

export type OpsMetric = {
  label: string;
  value?: string;
  today?: string;
  week?: string;
  month?: string;
  note: string;
};

export type OpsSignal = {
  title: string;
  value: string;
  detail: string;
};

export type OpsFeatureModule = {
  id: string;
  title: string;
  ownerView: string;
  status: string;
  firstDataNeeded: string;
  nextAction: string;
  icon: LucideIcon;
  tone: OpsTone;
};

export type GrowthChannel = {
  channel: string;
  stage: string;
  aiUse: string;
  firstDataNeeded: string;
};

export type RevenueTarget = {
  scenario: string;
  monthlyPrice: string;
  customersNeeded: string;
  meaning: string;
};

export const founderSummaryMetrics: OpsMetric[] = [
  { label: 'real customer reports stored', value: '0', note: 'Keep at zero until security audit is done.' },
  { label: 'payments active', value: 'No', note: 'Turn on only after processor/compliance approval.' },
  { label: 'open customer issues', value: 'Manual', note: 'Use a support tracker before public launch.' },
  { label: 'backend health URL', value: 'Pending', note: 'Add Render URL after deployment.' },
];

export const customerMetrics: OpsMetric[] = [
  { label: 'total customers', today: '0', week: '0', month: '0', note: 'All active customer accounts.' },
  { label: 'new accounts', today: '0', week: '0', month: '0', note: 'People who joined Credit Vivo.' },
  { label: 'canceled accounts', today: '0', week: '0', month: '0', note: 'Customers who canceled or did not continue.' },
  { label: 'free check-ins', today: '0', week: '0', month: '0', note: 'Customers who started the free scan path.' },
];

export const moneyMetrics: OpsMetric[] = [
  { label: 'revenue', today: '$0', week: '$0', month: '$0', note: 'Money collected from Credit Vivo plans.' },
  { label: 'refunds', today: '$0', week: '$0', month: '$0', note: 'Money returned to customers.' },
  { label: 'failed payments', today: '0', week: '0', month: '0', note: 'Cards or payments that did not go through.' },
  { label: 'outside costs', today: '$0', week: '$0', month: '$0', note: 'Mail, report access, ID checks, or partner costs.' },
];

export const retentionSignals: OpsSignal[] = [
  {
    title: 'Customers likely to cancel',
    value: '0',
    detail: 'AI should flag customers who stopped logging in, did not finish a scan, had a failed payment, or opened repeated support issues.',
  },
  {
    title: 'Customers needing attention',
    value: '0',
    detail: 'AI should flag customers waiting on findings, stuck at approval, confused by next steps, or needing a human check-in.',
  },
  {
    title: 'Upsell-ready customers',
    value: '0',
    detail: 'AI should flag customers who completed the free Check-In, reviewed findings, and may be ready for AI Guided or Vivo Plus.',
  },
  {
    title: 'Legal-access candidates',
    value: '0',
    detail: 'AI should flag customers with repeated unresolved issues who may want optional attorney/legal access through a separate provider.',
  },
];

export const retentionActions = [
  'Send a plain-English progress update before the customer feels stuck.',
  'Offer a human review when scan results look confusing or high-stress.',
  'Remind customers what step is waiting on them before cancellation risk rises.',
  'Suggest AI Guided or Vivo Plus only when the customer has a clear next-step reason.',
  'Offer optional legal access only as a separate customer choice, not pressure.',
];

export const growthMetrics: OpsMetric[] = [
  { label: 'new leads', today: '0', week: '0', month: '0', note: 'People who showed interest before creating an account.' },
  { label: 'visitor to join rate', today: '0%', week: '0%', month: '0%', note: 'How well the website turns visitors into free Check-In users.' },
  { label: 'best lead source', today: 'Pending', week: 'Pending', month: 'Pending', note: 'Where the strongest customers are coming from.' },
  { label: 'help-ready customers', today: '0', week: '0', month: '0', note: 'People who look like they may benefit from scanner, disputes, or attorney access.' },
];

export const millionMonthlyRevenueTargets: RevenueTarget[] = [
  {
    scenario: 'AI Guided only',
    monthlyPrice: '$69/mo',
    customersNeeded: '14,493',
    meaning: 'This is the highest customer-count path because it is the lower paid plan.',
  },
  {
    scenario: 'Vivo Plus only',
    monthlyPrice: '$95/mo',
    customersNeeded: '10,527',
    meaning: 'This needs fewer customers, but the product must deliver stronger value.',
  },
  {
    scenario: 'Blended average',
    monthlyPrice: '$95/mo',
    customersNeeded: '10,527',
    meaning: 'A planning target if customers split across AI Guided, Vivo Plus, and Attorney Access Prep.',
  },
];

export const millionMonthlyRevenueMilestones = [
  {
    target: '$10K/mo',
    focus: 'Prove people will pay and complete the scanner flow.',
  },
  {
    target: '$100K/mo',
    focus: 'Prove repeatable acquisition from search, referrals, and paid tests.',
  },
  {
    target: '$500K/mo',
    focus: 'Scale winning channels, retention, support, and compliance operations.',
  },
  {
    target: '$1M/mo',
    focus: 'National marketplace with strong retention, partner revenue, and trusted brand.',
  },
];

export const growthChannels: GrowthChannel[] = [
  {
    channel: 'Search and learning content',
    stage: 'Start first',
    aiUse: 'Find credit questions people ask, suggest plain-English article topics, and point readers to the free Check-In.',
    firstDataNeeded: 'Page visits, search terms, article clicks, join clicks.',
  },
  {
    channel: 'Referral partners',
    stage: 'Build next',
    aiUse: 'Identify accountants, realtors, auto dealers, loan officers, and community groups that may refer customers.',
    firstDataNeeded: 'Partner name, referral link, clicks, signups, quality of customers.',
  },
  {
    channel: 'Paid ads',
    stage: 'After tracking',
    aiUse: 'Compare ad messages, cost per lead, signup rate, and whether customers actually complete a scan.',
    firstDataNeeded: 'Ad source, campaign, spend, click, signup, scan completed.',
  },
  {
    channel: 'Customer reactivation',
    stage: 'Always useful',
    aiUse: 'Find people who started but did not finish, then recommend simple follow-up messages.',
    firstDataNeeded: 'Last login, scan status, email opened, unfinished step.',
  },
];

export const growthActions = [
  'Create one weekly learning topic from real scanner findings, written in plain English.',
  'Show a free Check-In call-to-action on every helpful article.',
  'Track every lead source before spending serious ad money.',
  'Flag visitors who start the scanner but do not finish.',
  'Recommend partner/referral outreach only where customers are likely to need credit help.',
  'Review the path to $1M/month every week: leads, free scans, paid conversions, cancellations, and average revenue per customer.',
];

export const healthCards: OpsCard[] = [
  {
    title: 'Website',
    status: 'Watch',
    detail: 'CreditVivo.com should be checked after every GitHub/Vercel deploy.',
    icon: Server,
    tone: 'yellow',
  },
  {
    title: 'Scanner Backend',
    status: 'Ready to monitor',
    detail: 'Render health check should watch /health once the backend service is deployed.',
    icon: HeartPulse,
    tone: 'green',
  },
  {
    title: 'Customer Reports',
    status: 'Beta caution',
    detail: 'Track uploads, failed scans, retained files, deletion status, and customer approval logs.',
    icon: FileText,
    tone: 'yellow',
  },
  {
    title: 'Financial',
    status: 'Not live yet',
    detail: 'Payments, refunds, failed charges, LegalShield/IDShield add-ons, and mail costs are not active yet.',
    icon: CreditCard,
    tone: 'gray',
  },
  {
    title: 'Customer Issues',
    status: 'Needs tracker',
    detail: 'Track support tickets, stuck scans, complaint risk, dispute delays, and attorney-review requests.',
    icon: AlertTriangle,
    tone: 'yellow',
  },
  {
    title: 'Compliance',
    status: 'Review before launch',
    detail: 'Watch consent logs, disclosures, no-guarantee language, approval before sending, and state launch rules.',
    icon: ShieldCheck,
    tone: 'yellow',
  },
];

export const opsFeatureModules: OpsFeatureModule[] = [
  {
    id: 'customer-intake',
    title: 'Customer profiles',
    ownerView: 'Who joined, who is active, who needs help.',
    status: 'Foundation ready',
    firstDataNeeded: 'Account creation date, plan, last login, consent status.',
    nextAction: 'Connect real customer account data.',
    icon: Users,
    tone: 'sky',
  },
  {
    id: 'scanner-parser',
    title: 'Scanner and parser',
    ownerView: 'Which reports scanned, failed, or produced findings.',
    status: 'Backend exists',
    firstDataNeeded: 'Scan started, scan completed, scan failed, finding count.',
    nextAction: 'Send scanner events into the founder dashboard.',
    icon: FileText,
    tone: 'green',
  },
  {
    id: 'ai-insights',
    title: 'AI insights',
    ownerView: 'What the AI thinks needs attention today.',
    status: 'Design ready',
    firstDataNeeded: 'Customer history, findings, disputes, support issues, payments.',
    nextAction: 'Create private AI summary endpoint after data is connected.',
    icon: Brain,
    tone: 'purple',
  },
  {
    id: 'growth-ai',
    title: 'Growth AI',
    ownerView: 'Which channels can bring Credit Vivo more customers to help.',
    status: 'Foundation ready',
    firstDataNeeded: 'Traffic source, lead source, join click, scan started, scan completed.',
    nextAction: 'Connect website analytics and referral tracking before paid ads scale.',
    icon: Megaphone,
    tone: 'green',
  },
  {
    id: 'payments',
    title: 'Payments and refunds',
    ownerView: 'Revenue, failed payments, refunds, and plan changes.',
    status: 'Waiting on payment provider',
    firstDataNeeded: 'Payment succeeded, payment failed, refund created, cancellation.',
    nextAction: 'Connect Stripe or chosen payment provider.',
    icon: CreditCard,
    tone: 'gray',
  },
  {
    id: 'affiliates',
    title: 'Affiliate and partner offers',
    ownerView: 'Clicks, signups, commissions, and customer complaints by partner.',
    status: 'Ready to add',
    firstDataNeeded: 'Partner click, referral signup, commission, partner issue.',
    nextAction: 'Add approved LegalShield/IDShield or other partner tracking links.',
    icon: Link2,
    tone: 'sky',
  },
  {
    id: 'legal-escalation',
    title: 'Attorney access and escalation',
    ownerView: 'Which customers may need optional legal access or escalation.',
    status: 'Compliance review needed',
    firstDataNeeded: 'Repeated verification, dispute round, customer approval, attorney request.',
    nextAction: 'Keep wording as access/referral until legal partner approval is signed.',
    icon: Scale,
    tone: 'yellow',
  },
  {
    id: 'support-retention',
    title: 'Support and retention',
    ownerView: 'Who is frustrated, stuck, likely to cancel, or ready to upgrade.',
    status: 'Ready to add',
    firstDataNeeded: 'Support ticket, no-login days, stuck step, refund request.',
    nextAction: 'Track support events and trigger founder alerts.',
    icon: TrendingUp,
    tone: 'purple',
  },
  {
    id: 'mail-tracking',
    title: 'Mail and dispute tracking',
    ownerView: 'Letters prepared, approved, sent, delivered, and responded to.',
    status: 'Ready to add',
    firstDataNeeded: 'Letter created, customer approved, mail sent, tracking number, response date.',
    nextAction: 'Connect Lob or selected mail provider in test mode.',
    icon: Mail,
    tone: 'yellow',
  },
];

export const monitoringAlertExamples = [
  'Website is down or latest Vercel deploy failed.',
  'Scanner backend is down or Render health check fails.',
  'Report upload failed or scan error rate goes up.',
  'Customer issue needs review, refund, or legal escalation.',
  'Payment, LegalShield/IDShield add-on, or mail cost fails.',
  'Compliance-sensitive action is missing customer approval.',
];

export const completedIcon = CheckCircle;
export const aiInsightIcon = Brain;
export const growthIcon = Target;
export const campaignIcon = MousePointerClick;
export const recommendationIcon = Sparkles;
