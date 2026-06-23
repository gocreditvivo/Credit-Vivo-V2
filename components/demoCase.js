export const demoFindings = [
  {
    id: 'fv-001',
    account: 'Jefferson Capital / Verizon Wireless',
    category: 'Collection / possible duplicate',
    severity: 'Very High',
    customerSummary: 'This account may be tied to another Verizon balance, so we would review whether the same debt is reporting twice.',
    bureauView: 'Equifax, Experian, and TransUnion show related collection information.',
    nextStep: 'Prepare bureau dispute and furnisher validation request.',
  },
  {
    id: 'fv-002',
    account: 'Midland Credit Management',
    category: 'Collection validation',
    severity: 'High',
    customerSummary: 'The balance and account history should be verified before any dispute is sent.',
    bureauView: 'Reported across all three bureaus with collection status differences.',
    nextStep: 'Request itemization, ownership proof, and reporting verification.',
  },
  {
    id: 'fv-003',
    account: 'Capital One',
    category: 'Charge-off review',
    severity: 'Medium / High',
    customerSummary: 'The reported balance and status need comparison across bureaus for accuracy.',
    bureauView: 'Bureaus show charge-off related data that should be checked line by line.',
    nextStep: 'Review statements, balance history, and transfer/sale information.',
  },
  {
    id: 'fv-004',
    account: 'Personal information',
    category: 'Identity cleanup',
    severity: 'Medium',
    customerSummary: 'Old addresses, name variations, or employer data can make disputes harder to verify.',
    bureauView: 'Identity fields may differ by bureau.',
    nextStep: 'Prepare identity cleanup request before account disputes.',
  },
];

export const demoUpdates = [
  {
    time: 'Today 9:10 AM',
    channel: 'Portal',
    title: 'Report upload received',
    body: 'Your credit report was added to the manual review queue.',
  },
  {
    time: 'Today 9:12 AM',
    channel: 'Portal',
    title: 'Initial issue review completed',
    body: 'We found possible reporting issues that need confirmation before disputes are mailed.',
  },
  {
    time: 'Today 9:14 AM',
    channel: 'Email simulation',
    title: 'Review summary ready',
    body: 'A customer-friendly summary is ready in your portal. No real email was sent in demo mode.',
  },
  {
    time: 'Tomorrow',
    channel: 'Text simulation',
    title: 'Follow-up reminder queued',
    body: 'Reminder prepared: upload ID and proof of address if you want identity cleanup included.',
  },
];

export const demoFollowUps = [
  { day: 'Day 0', item: 'Upload received', status: 'Complete' },
  { day: 'Day 1', item: 'Manual quality check', status: 'Queued' },
  { day: 'Day 3', item: 'Draft dispute package', status: 'Ready in demo' },
  { day: 'Day 15', item: 'Check delivery / certified mail status', status: 'Scheduled' },
  { day: 'Day 35', item: 'Check bureau response window', status: 'Scheduled' },
  { day: 'Day 45', item: 'Escalation review if no meaningful response', status: 'Scheduled' },
];

export const demoDocuments = [
  { name: 'Credit report upload', type: 'Credit report', status: 'Received' },
  { name: 'Government ID', type: 'Identity document', status: 'Needed' },
  { name: 'Utility bill or bank statement', type: 'Proof of address', status: 'Needed' },
  { name: 'Bureau dispute drafts', type: 'Letter package', status: 'Drafted in demo' },
  { name: 'Furnisher validation letters', type: 'Letter package', status: 'Drafted in demo' },
  { name: 'Bureau responses', type: 'Response tracking', status: 'Waiting' },
];

export const demoScoreProgress = [
  { month: 'Start', score: 582, change: 0, label: 'Baseline pulled' },
  { month: 'Month 1', score: 596, change: 14, label: 'First review complete' },
  { month: 'Month 2', score: 608, change: 12, label: 'Response tracking' },
  { month: 'Month 3', score: 621, change: 13, label: 'Next round prepared' },
];

export const demoMonthlyValue = [
  { item: 'Reports organized', status: 'Complete', customerBenefit: 'All three bureaus are in one portal.' },
  { item: 'Strongest issues selected', status: 'Complete', customerBenefit: 'We start with the clearest items first.' },
  { item: 'Dispute round planned', status: 'Ready', customerBenefit: 'Your first package is staged, not rushed.' },
  { item: 'Documents requested', status: 'Needed', customerBenefit: 'ID/proof helps support the next step.' },
  { item: 'Credit boost checklist', status: 'Open', customerBenefit: 'Small monthly actions can help while disputes run.' },
];

export const demoCreditBoostTasks = [
  { task: 'Keep card balances below 30% utilization', status: 'Open', impact: 'High' },
  { task: 'Avoid new hard inquiries this month', status: 'Open', impact: 'Medium' },
  { task: 'Upload any bureau or collector response letters', status: 'Needed', impact: 'High' },
  { task: 'Review payment due dates for active accounts', status: 'Open', impact: 'Medium' },
];

export const demoMonthlyStatements = [
  {
    month: 'Month 1',
    scoreStart: 582,
    scoreEnd: 596,
    scoreChange: 14,
    headline: 'Your first review is complete.',
    plainSummary: 'We organized your report, found possible issues, and prepared the strongest Round 1 plan.',
    workCompleted: ['3-bureau report organized', 'possible negative-account issues reviewed', 'Round 1 dispute package selected', 'document checklist created'],
    customerNeeds: ['upload ID', 'upload proof of address', 'send us any bureau or collector letters'],
    nextPlan: 'Prepare first dispute package after document check.',
  },
  {
    month: 'Month 2',
    scoreStart: 596,
    scoreEnd: 608,
    scoreChange: 12,
    headline: 'Your case is in response tracking.',
    plainSummary: 'We are monitoring response windows and keeping weaker items on hold until they have support.',
    workCompleted: ['response deadlines scheduled', 'hold queue reviewed', 'credit boost checklist updated', 'message reminders prepared'],
    customerNeeds: ['watch for mail responses', 'upload any response letters', 'keep utilization low'],
    nextPlan: 'Review responses and decide whether Round 2 is justified.',
  },
  {
    month: 'Month 3',
    scoreStart: 608,
    scoreEnd: 621,
    scoreChange: 13,
    headline: 'Next review is ready.',
    plainSummary: 'We are preparing the next evidence-backed step while avoiding repetitive or weak disputes.',
    workCompleted: ['score trend updated', 'response results reviewed', 'next round candidates selected', 'escalation watchlist checked'],
    customerNeeds: ['confirm any corrected accounts', 'avoid new hard inquiries', 'keep payments current'],
    nextPlan: 'Move only supported items into Round 2 or escalation review.',
  },
];

const DEFAULT_EMAIL = 'demo.customer@example.com';

function cleanEmail(value) {
  return String(value || '').trim().toLowerCase() || DEFAULT_EMAIL;
}

function caseTagFromEmail(email) {
  return cleanEmail(email).replace(/[^a-z0-9]/g, '').slice(0, 8).toUpperCase() || 'DEMO';
}

function firstName(value) {
  return String(value || 'there').trim().split(/\s+/)[0] || 'there';
}

function buildUpdates(caseInfo) {
  const name = firstName(caseInfo.consumerName);
  return [
    {
      time: 'Today 9:10 AM',
      channel: 'Portal',
      title: 'Report upload received',
      body: `${name}, your credit report was added to the review queue.`,
    },
    {
      time: 'Today 9:12 AM',
      channel: 'Portal',
      title: 'Initial review completed',
      body: 'We found possible reporting issues that need confirmation before disputes are prepared.',
    },
    {
      time: 'Today 9:14 AM',
      channel: 'Email preview',
      title: 'Review summary ready',
      body: `A plain-English summary is ready for ${caseInfo.consumerEmail}. No real email was sent in demo mode.`,
    },
    {
      time: 'Tomorrow',
      channel: 'Text preview',
      title: 'Follow-up reminder queued',
      body: 'Reminder prepared: upload ID and proof of address if identity cleanup should be included.',
    },
  ];
}

function buildMessagePreviews(caseInfo) {
  const name = firstName(caseInfo.consumerName);
  return [
    {
      id: 'msg-001',
      channel: 'Portal',
      to: caseInfo.consumerEmail,
      subject: 'Your Credit Vivo upload was received',
      body: `Hi ${name}, we received your credit report and started your Credit Vivo review. Your dashboard will show simple updates as the case moves forward.`,
      status: caseInfo.communication.portal ? 'Ready in portal' : 'Portal disabled',
    },
    {
      id: 'msg-002',
      channel: 'Email preview',
      to: caseInfo.consumerEmail,
      subject: 'Your credit report findings are ready',
      body: `Hi ${name}, your first findings are ready. We found possible account reporting issues and document items to confirm before dispute drafts are finalized.`,
      status: caseInfo.communication.email ? 'Preview ready' : 'Email disabled',
    },
    {
      id: 'msg-003',
      channel: 'Text preview',
      to: caseInfo.consumerEmail,
      subject: 'Upload reminder',
      body: 'Credit Vivo: Please upload your ID and proof of address when you have a moment. Replying is disabled in this demo.',
      status: caseInfo.communication.text ? 'Preview ready' : 'Text disabled',
    },
    {
      id: 'msg-004',
      channel: 'Email preview',
      to: caseInfo.consumerEmail,
      subject: 'Next step: review your dispute drafts',
      body: `Hi ${name}, once your identity documents are uploaded, we can prepare dispute drafts for your review inside the portal.`,
      status: caseInfo.communication.email ? 'Queued for Day 3' : 'Email disabled',
    },
    {
      id: 'msg-005',
      channel: 'Portal + email preview',
      to: caseInfo.consumerEmail,
      subject: 'Your monthly Credit Vivo update is ready',
      body: `Hi ${name}, your monthly update is ready. It shows score movement when available, work completed this month, items waiting on responses, and your next best actions.`,
      status: caseInfo.communication.portal || caseInfo.communication.email ? 'Monthly update ready' : 'Updates disabled',
    },
  ];
}

export function createDemoCase(overrides = {}) {
  const now = new Date();
  const consumerEmail = cleanEmail(overrides.consumerEmail);
  const consumerName = String(overrides.consumerName || 'Demo Customer').trim() || 'Demo Customer';
  const communication = overrides.communication || {
    portal: true,
    email: true,
    text: false,
  };
  const caseInfo = {
    caseId: overrides.caseId || `CV-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${caseTagFromEmail(consumerEmail)}`,
    consumerName,
    consumerEmail,
    reportName: overrides.reportName || '3-bureau-credit-report.pdf',
    bureau: overrides.bureau || '3-bureau report',
    source: overrides.source || 'Manual portal upload',
    status: overrides.status || 'Manual review queued',
    healthScore: 64,
    negativeAccounts: 8,
    potentialIssues: demoFindings.length,
    activeDisputes: 6,
    uploadedAt: overrides.uploadedAt || now.toLocaleString(),
    findings: demoFindings,
    updates: [],
    followUps: demoFollowUps,
    documents: demoDocuments,
    scoreProgress: overrides.scoreProgress || demoScoreProgress,
    monthlyValue: overrides.monthlyValue || demoMonthlyValue,
    creditBoostTasks: overrides.creditBoostTasks || demoCreditBoostTasks,
    monthlyStatements: overrides.monthlyStatements || demoMonthlyStatements,
    communication,
  };
  return {
    ...caseInfo,
    updates: overrides.updates || buildUpdates(caseInfo),
    messagePreviews: overrides.messagePreviews || buildMessagePreviews(caseInfo),
  };
}

export const demoCase = createDemoCase();
