import type {
  ScannerFcraReviewItem,
  ScannerIssue,
  ScannerLetterQueueItem,
  ScannerParseResult,
  ScannerReviewItem,
} from './scannerApi';

type BureauKey = 'Experian' | 'Equifax' | 'TransUnion' | 'Unknown';
type ImpactLevel = 'high' | 'medium' | 'low';

type ScoreImpact = {
  item_id: string;
  impact: ImpactLevel;
  points_weight: number;
  blocker: string;
  next_action: string;
  proof_needed: string[];
};

const BUREAU_PATTERNS: Array<[BureauKey, RegExp]> = [
  ['Experian', /experian|annual credit report - experian|on record until/i],
  ['Equifax', /equifax|date of 1st delinquency|narrative code\(s\)/i],
  ['TransUnion', /transunion|trans union|pay status|estimated month and year this item will be removed/i],
];

const ACCOUNT_START = /^\s*([A-Z0-9][A-Z0-9 &'./,-]{2,80})(?:\s+-\s+Closed)?\s*$/;
const KNOWN_NON_ACCOUNT_HEADERS = new Set([
  'ACCOUNTS',
  'CREDIT ACCOUNTS',
  'COLLECTIONS',
  'INQUIRIES',
  'PERSONAL INFORMATION',
  'PAYMENT HISTORY',
  'ACCOUNT INFORMATION',
  'SATISFACTORY ACCOUNTS',
  'ACCOUNTS WITH ADVERSE INFORMATION',
]);

function clean(value = '') {
  return value.replace(/\s+/g, ' ').trim();
}

function uid(prefix: string, seed: string, index: number) {
  return `${prefix}_${index}_${seed.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 28) || 'item'}`;
}

function detectBureau(text: string, filename = ''): BureauKey {
  const combined = `${filename}\n${text}`;
  for (const [bureau, pattern] of BUREAU_PATTERNS) {
    if (pattern.test(combined)) return bureau;
  }
  return 'Unknown';
}

function grab(block: string, ...patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = block.match(pattern);
    if (match?.[1]) return clean(match[1]);
  }
  return '';
}

function grabMoney(block: string, ...patterns: RegExp[]) {
  const value = grab(block, ...patterns);
  if (!value) return '';
  const normalized = value.replace(/[^0-9.]/g, '');
  if (!normalized) return '';
  const parsed = Number(normalized);
  if (Number.isNaN(parsed)) return value;
  return `$${Math.round(parsed).toLocaleString()}`;
}

function moneyNumber(value = '') {
  const parsed = Number(value.replace(/[^0-9.-]/g, ''));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function normalizeDate(value = '') {
  const cleaned = clean(value);
  if (!cleaned) return '';
  const yyyymmdd = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (yyyymmdd) return `${yyyymmdd[2]}/${yyyymmdd[1]}`;
  const mmddyyyy = cleaned.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mmddyyyy) return `${mmddyyyy[1].padStart(2, '0')}/${mmddyyyy[3]}`;
  return cleaned;
}

function grabDate(block: string, ...patterns: RegExp[]) {
  return normalizeDate(grab(block, ...patterns));
}

function estimateDofdFromRemoval(removal = '') {
  const match = removal.match(/(\d{1,2})\/(\d{4})|([A-Za-z]{3,9})\s+(\d{4})/);
  if (!match) return '';
  const month = match[1] || match[3] || '';
  const year = Number(match[2] || match[4]);
  if (!year) return '';
  return `${month}/${year - 7}`;
}

function findAccountBlocks(text: string): string[] {
  const normalized = text.replace(/\r/g, '\n');
  const lines = normalized.split('\n').map((line) => line.trimEnd());
  const starts: number[] = [];

  lines.forEach((line, index) => {
    const trimmed = clean(line);
    if (!trimmed || KNOWN_NON_ACCOUNT_HEADERS.has(trimmed.toUpperCase())) return;

    const looksLikeAccount =
      ACCOUNT_START.test(trimmed) &&
      /[A-Z]/.test(trimmed) &&
      trimmed === trimmed.toUpperCase() &&
      !/^\d/.test(trimmed) &&
      !/^(DATE|BALANCE|STATUS|PAYMENT|YEAR|MONTH|PHONE|ADDRESS|REMARKS|NARRATIVE|PREPARED|REPORT|SUMMARY|FORMER|CONSUMER|DID YOU KNOW)/i.test(trimmed);

    const nextWindow = lines.slice(index, index + 12).join('\n');
    if (
      looksLikeAccount &&
      /(Account Number|Account Type|Loan\/Account Type|Date Opened|Pay Status|Balance|Status|Original Creditor)/i.test(nextWindow)
    ) {
      starts.push(index);
    }
  });

  if (!starts.length) return [];

  return starts.map((start, idx) => {
    const end = starts[idx + 1] || lines.length;
    return lines.slice(start, end).join('\n').trim();
  });
}

function parseIdentity(text: string) {
  const name = grab(
    text,
    /Prepared for:\s*\n?\s*([A-Z][A-Z\s.'-]{2,80})/i,
    /Prepared For\s*\n?\s*([A-Z][A-Z\s.'-]{2,80})/i,
    /Name\s*\n?\s*([A-Z][A-Z\s.'-]{2,80})/i,
  );
  const address = grab(
    text,
    /Current Address\s*\n?\s*([^\n]{8,140})/i,
    /\n\s*(\d{3,6}\s+[A-Z0-9 .'#-]+,?\s+[A-Z ]{2,40},?\s+[A-Z]{2}\s+\d{5}(?:-\d{4})?)/,
  );
  return { name, address };
}

function accountNameFromBlock(block: string) {
  const firstLine = clean(block.split('\n').find((line) => clean(line)) || 'Unknown Account');
  return firstLine
    .replace(/\s+-\s+Closed$/i, '')
    .replace(/\s+\d{4,}X+.*$/i, '')
    .replace(/\s+\*+\d{2,}$/i, '')
    .trim();
}

function parseAccount(block: string, bureau: BureauKey, index: number): ScannerReviewItem {
  const compact = clean(block);
  const accountName = accountNameFromBlock(block);
  const accountType = grab(
    block,
    /Account Type\s+([^\n]+)/i,
    /Loan\/Account Type:\s*([^|\n]+)/i,
    /Loan Type\s+([^\n]+)/i,
  );
  const status = grab(
    block,
    /Status:\s*([^\n]+)/i,
    /Status\s+([^\n]+)/i,
    /Pay Status\s+>?([^<\n]+)<?/i,
  );
  const balance = grabMoney(
    block,
    /Balance(?:\s+as\s+of\s+[^:]+)?[:\s]+\$?([\d,]+)/i,
    /Balance\s+\$?([\d,]+)/i,
  );
  const pastDue = grabMoney(
    block,
    /Amount Past Due:\s*\$?([\d,]+)/i,
    /Past Due\s+\$?([\d,]+)/i,
    /\$([\d,]+)\s+past due/i,
  );
  const creditLimit = grabMoney(block, /Credit Limit:?\s*\$?([\d,]+)/i, /Credit line:?\s*\$?([\d,]+)/i);
  const highCredit = grabMoney(
    block,
    /High Credit:?\s*\$?([\d,]+)/i,
    /High Balance(?: \(Hist\.\))?\s+[^$\n]*\$?([\d,]+)/i,
    /Original Balance\s+\$?([\d,]+)/i,
    /Original Amount\s+\$?([\d,]+)/i,
  );
  const accountNumber = grab(
    block,
    /Account Number:?\s*([*Xx\d-]{4,24})/i,
    /\b(\d{4,}X{2,}\*{0,4}|\d{4,}\*{4})\b/i,
  );
  const dateOpened = grabDate(block, /Date Opened:?\s*([^\n]+)/i);
  const dateClosed = grabDate(block, /Date Closed:?\s*([^\n]+)/i);
  const dateReported = grabDate(block, /Date Reported:?\s*([^|\n]+)/i, /Date Updated\s+([^\n]+)/i, /Balance Updated\s+([^\n]+)/i);
  const lastPayment = grabDate(block, /Date of Last Payment:?\s*([^\n]+)/i, /Last Payment Made\s+([^\n]+)/i, /Paid\s+on\s+([^\n]+)/i);
  const dofd = grabDate(
    block,
    /Date of 1st Delinquency:?\s*([^\n]+)/i,
    /Date of First Delinquency:?\s*([^\n]+)/i,
    /DOFD:?\s*([^\n]+)/i,
  );
  const estimatedRemoval = grabDate(
    block,
    /Estimated month and year this item will be removed\s+([^\n]+)/i,
    /On Record Until\s+([^\n]+)/i,
    /scheduled to continue on record until\s+([^\.\n]+)/i,
  );
  const originalCreditor = grab(block, /Original Creditor:?\s*([^\n]+)/i, /Historical Info\s*\n\s*Original Creditor\s+([^\n]+)/i);
  const creditorClassification = grab(block, /Creditor Classification:?\s*([^\n]+)/i, /Loan Type\s+([^\n]+)/i);
  const remarks = grab(block, /Remarks?\s+([^\n]+)/i, /Comment\s+Current:\s*([^\n]+)/i, /Narrative Code\(s\):\s*([^\n]+)/i);

  const isNegative = /collection|charge.?off|past due|late|repossession|foreclosure|settled|placed for collection|profit and loss|PRL|CLA|COL|C\/O/i.test(compact);
  const needsAdminReview = isNegative || /dispute|FCRA|investigation|verified|reinvestigation/i.test(compact);

  return {
    id: uid('acct', accountName, index),
    bureau,
    account_name: accountName,
    account_number_masked: accountNumber ? maskAccountNumber(accountNumber) : '',
    account_type: accountType,
    portfolio_type: accountType,
    responsibility: grab(block, /Responsibility\s+([^\n]+)/i, /Owner:\s*([^\n]+)/i),
    creditor_classification: creditorClassification,
    original_creditor: originalCreditor,
    collector_or_debt_buyer: /collection|debt buyer|factoring/i.test(`${accountName} ${accountType}`) ? accountName : '',
    status,
    pay_status: status,
    balance,
    past_due: pastDue,
    high_credit_or_original_amount: highCredit,
    credit_limit: creditLimit,
    date_opened: dateOpened,
    date_closed: dateClosed,
    date_reported: dateReported,
    date_last_payment: lastPayment,
    date_of_first_delinquency: dofd || estimateDofdFromRemoval(estimatedRemoval),
    estimated_removal_date: estimatedRemoval,
    remarks,
    payment_history_summary: summarizePaymentHistory(block),
    raw_block: block.slice(0, 2500),
    confidence: accountName === 'Unknown Account' ? 'low' : 'medium',
    confidence_score: accountName === 'Unknown Account' ? 0.35 : 0.68,
    needs_admin_review: needsAdminReview,
  };
}

function maskAccountNumber(value: string) {
  const digits = value.replace(/[^0-9]/g, '');
  if (digits.length >= 4) return `****${digits.slice(-4)}`;
  return value.replace(/[0-9Xx*](?=.{4})/g, '*');
}

function summarizePaymentHistory(block: string) {
  const chargeOffs = (block.match(/\bCO\b|C\/O|charge.?off/gi) || []).length;
  const collections = (block.match(/\bC\b|\bCOL\b|collection/gi) || []).length;
  const lates30 = (block.match(/\b30\b|30 days past due/gi) || []).length;
  const lates60 = (block.match(/\b60\b|60 days past due/gi) || []).length;
  const lates90 = (block.match(/\b90\b|90 days past due|120|150|180/gi) || []).length;
  const parts = [];
  if (chargeOffs) parts.push('charge-off history');
  if (collections) parts.push('collection history');
  if (lates30) parts.push('30-day late found');
  if (lates60) parts.push('60-day late found');
  if (lates90) parts.push('90+ late found');
  return parts.length ? parts.join(', ') : 'No obvious negative payment code found in parsed block';
}

function scoreImpactFor(item: ScannerReviewItem): ScoreImpact {
  const text = `${item.account_name} ${item.account_type} ${item.status} ${item.pay_status} ${item.remarks} ${item.payment_history_summary}`.toLowerCase();
  const balance = moneyNumber(item.balance);
  const limit = moneyNumber(item.credit_limit);
  const utilization = limit > 0 ? balance / limit : 0;

  if (/charge.?off|c\/o|profit and loss|prl/.test(text)) {
    return {
      item_id: item.id || '',
      impact: 'high',
      points_weight: 95,
      blocker: 'Charge-off account',
      next_action: 'Review balance, dates, charge-off amount, ownership, and bureau differences.',
      proof_needed: ['credit report pages', 'statements', 'charge-off notice', 'payment records'],
    };
  }

  if (/collection|debt buyer|factoring|placed for collection|\bcol\b/.test(text)) {
    return {
      item_id: item.id || '',
      impact: 'high',
      points_weight: 88,
      blocker: 'Collection account',
      next_action: 'Review original creditor, balance, ownership, reporting dates, and validation proof.',
      proof_needed: ['collection notice', 'original creditor records', 'balance support', 'credit report pages'],
    };
  }

  if (utilization >= 0.7) {
    return {
      item_id: item.id || '',
      impact: 'medium',
      points_weight: 65,
      blocker: 'High credit card balance',
      next_action: 'Lower card balance before the next reporting date if possible.',
      proof_needed: ['current statement', 'payment confirmation'],
    };
  }

  if (/late|30|60|90|120|150/.test(text)) {
    return {
      item_id: item.id || '',
      impact: 'medium',
      points_weight: 58,
      blocker: 'Late payment history',
      next_action: 'Review payment history and gather proof of on-time payments if available.',
      proof_needed: ['bank records', 'payment confirmations', 'statements'],
    };
  }

  return {
    item_id: item.id || '',
    impact: 'low',
    points_weight: 20,
    blocker: 'General account review',
    next_action: 'Keep account details for the score plan and cross-bureau comparison.',
    proof_needed: ['credit report page'],
  };
}

function issueFromImpact(item: ScannerReviewItem, impact: ScoreImpact, index: number): ScannerIssue | null {
  if (impact.impact === 'low') return null;

  const issueType = impact.blocker.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  return {
    id: uid('issue', `${impact.blocker}_${item.account_name}`, index),
    issue_type: issueType,
    severity: impact.impact,
    customer_label: impact.blocker,
    customer_explanation: `${item.account_name || 'This account'} may be hurting your score. ${impact.next_action}`,
    admin_explanation: `Parser flagged ${item.account_name || 'account'} on ${item.bureau || 'unknown bureau'} as ${impact.blocker}. Review field-level reporting, evidence, and bureau/furnisher packet path before action.`,
    suggested_round: impact.blocker.includes('Collection')
      ? 'Round 2 — Collection Review'
      : impact.blocker.includes('Charge-off')
        ? 'Round 4 — Reporting Accuracy Review'
        : 'Round 1 — Score Boost Plan',
    related_tradeline_ids: item.id ? [item.id] : [],
    confidence: item.confidence || 'medium',
  };
}

function addFieldIssues(items: ScannerReviewItem[], baseIssues: ScannerIssue[]) {
  const issues = [...baseIssues];
  items.forEach((item, index) => {
    const text = `${item.status || ''} ${item.pay_status || ''} ${item.account_type || ''}`.toLowerCase();
    if (/collection|charge.?off|debt buyer|factoring/.test(text) && !item.original_creditor) {
      issues.push({
        id: uid('issue_missing_oc', item.account_name || 'account', index),
        issue_type: 'missing_original_creditor',
        severity: 'medium',
        customer_label: 'Missing original creditor review',
        customer_explanation: `${item.account_name || 'This account'} should be reviewed because the original creditor was not clearly found in the parsed data.`,
        admin_explanation: 'Possible missing original creditor field. Review source snippet before generating a dispute packet.',
        suggested_round: 'Round 2 — Collection Review',
        related_tradeline_ids: item.id ? [item.id] : [],
        confidence: 'medium',
      });
    }

    if (/collection|charge.?off|past due/.test(text) && !item.date_of_first_delinquency && !item.estimated_removal_date) {
      issues.push({
        id: uid('issue_missing_dofd', item.account_name || 'account', index),
        issue_type: 'missing_or_unclear_dofd',
        severity: 'high',
        customer_label: 'Missing date review',
        customer_explanation: `${item.account_name || 'This account'} should be reviewed because the first delinquency/removal timing was not clearly found.`,
        admin_explanation: 'Possible missing or unclear DOFD/removal date. This is important for FCRA reporting age review.',
        suggested_round: 'Round 4 — Reporting Accuracy Review',
        related_tradeline_ids: item.id ? [item.id] : [],
        confidence: 'medium',
      });
    }
  });
  return issues;
}

function groupBySimilarAccount(items: ScannerReviewItem[]) {
  const groups = new Map<string, ScannerReviewItem[]>();
  items.forEach((item) => {
    const key = clean((item.original_creditor || item.account_name || '').toLowerCase()).replace(/[^a-z0-9]+/g, '').slice(0, 22);
    if (!key) return;
    const current = groups.get(key) || [];
    current.push(item);
    groups.set(key, current);
  });

  return Array.from(groups.entries())
    .filter(([, matches]) => new Set(matches.map((item) => item.bureau)).size > 1)
    .map(([key, matches], index) => ({
      group_id: `group_${index}_${key}`,
      bureaus: Array.from(new Set(matches.map((item) => item.bureau || 'Unknown'))),
      account_names: Array.from(new Set(matches.map((item) => item.account_name || 'Unknown account'))),
      review_note: 'Same or similar item appears across multiple bureaus. Compare balance, status, dates, original creditor, remarks, and removal timing.',
    }));
}

function buildLetterQueue(issues: ScannerIssue[]): ScannerLetterQueueItem[] {
  return issues.slice(0, 6).map((issue, index) => {
    const isCollection = issue.issue_type.includes('collection') || issue.issue_type.includes('original_creditor');
    const isEscalation = issue.issue_type.includes('charge') || issue.issue_type.includes('dofd') || issue.severity === 'high';
    return {
      letter_id: uid('letter', issue.issue_type, index),
      issue_id: issue.id,
      issue_type: issue.issue_type,
      letter_type: isCollection ? 'furnisher_direct_dispute' : 'bureau_dispute',
      letter_subject: isCollection ? 'Direct Dispute Packet - Collection Review' : 'Bureau Dispute Packet - Reporting Review',
      round: issue.suggested_round,
      recipient_type: isCollection ? 'furnisher_or_collector' : 'credit_bureau',
      responsible_party: isCollection ? 'furnisher_or_collector' : 'bureau_and_furnisher',
      delivery_method: 'mail_packet_recommended',
      fcra_notice_required: true,
      fcra_notice_included: true,
      customer_approval_required: true,
      customer_authorization_verified: false,
      tracking_status: 'draft_not_sent',
      recommended_next_action: isEscalation ? 'build_evidence_packet_then_admin_review' : 'customer_review_then_packet_delivery',
      escalation_candidate: isEscalation,
      draft_letter_body: `DRAFT - CUSTOMER REVIEW AND APPROVAL REQUIRED\n\nIssue: ${issue.customer_label}\n\nI dispute the accuracy and completeness of this reporting. Please investigate the specific account fields, including balance, status, dates, ownership/original creditor, payment history, remarks, and any bureau differences. If the information cannot be verified as accurate and complete, please correct, update, or delete it.\n\nThis draft is not sent automatically.`,
    };
  });
}

function buildFcraReview(issues: ScannerIssue[]): ScannerFcraReviewItem[] {
  return issues.slice(0, 8).map((issue) => ({
    issue_id: issue.id,
    possible_fcra_issue: true,
    issue_type: issue.issue_type,
    responsible_party: issue.issue_type.includes('collection') ? 'furnisher_or_collector' : 'bureau_and_furnisher',
    dispute_history_complete: false,
    evidence_strength: issue.severity === 'high' ? 'medium' : 'low',
    damages_evidence: 'not_collected',
    next_action: 'customer_review_and_evidence_checklist',
    requires_admin_review: issue.severity === 'high',
  }));
}

export function parseCreditReportText(text: string, filename = 'pasted-credit-report.txt'): ScannerParseResult {
  const bureau = detectBureau(text, filename);
  const identity = parseIdentity(text);
  const blocks = findAccountBlocks(text);
  const reviewItems = blocks.slice(0, 60).map((block, index) => parseAccount(block, bureau, index));
  const impacts = reviewItems.map(scoreImpactFor).sort((a, b) => b.points_weight - a.points_weight);
  const impactIssues = reviewItems
    .map((item) => issueFromImpact(item, scoreImpactFor(item), reviewItems.indexOf(item)))
    .filter((issue): issue is ScannerIssue => Boolean(issue));
  const issues = addFieldIssues(reviewItems, impactIssues).slice(0, 30);
  const crossBureauGroups = groupBySimilarAccount(reviewItems);
  const highImpact = impacts.filter((impact) => impact.impact === 'high').length;
  const mediumImpact = impacts.filter((impact) => impact.impact === 'medium').length;

  return {
    job_id: uid('local_scan', filename, Date.now()),
    files: [
      {
        filename,
        bureau,
        pages: undefined,
        chars: text.length,
        status: 'local_parser_mvp',
      },
    ],
    ai_second_pass: false,
    paid_ai_used: false,
    status: {
      mode: 'credit_vivo_local_parser_mvp',
      message: 'Local parser MVP completed. Review all findings before action.',
      identity,
      score_impact: impacts,
    },
    review_items_count: reviewItems.length,
    review_items_preview: reviewItems,
    issues_count: issues.length,
    issues_preview: issues,
    cross_bureau_groups: crossBureauGroups,
    customer_message: highImpact
      ? 'High-impact score blockers were found. Review the account cards and proof needed before any action.'
      : mediumImpact
        ? 'Score blockers were found. Review the next best actions before any action.'
        : 'Your report was parsed. Review account cards and confirm details.',
    customer_summary: {
      headline: highImpact ? 'High-impact score blockers found.' : 'Your score scan is ready.',
      message: 'Credit Vivo organized your report into account cards, score blockers, proof needed, and next actions. Nothing is sent without approval.',
      review_items: reviewItems.length,
      possible_review_points: issues.length,
      categories: Array.from(new Set(impacts.map((impact) => impact.blocker))).slice(0, 6),
      next_step: 'Review account cards, gather proof, then approve any next action.',
    },
    admin_summary: {
      parser: 'local_parser_mvp',
      identity,
      score_impact: impacts,
      note: 'This is not a legal conclusion. Verify source snippets before sending any packet.',
    },
    letter_workflow: {
      e_oscar_ready: true,
      note: 'Create field-level, evidence-backed bureau and furnisher packets. Do not claim direct e-OSCAR access.',
    },
    recommended_letter_queue: buildLetterQueue(issues),
    fcra_review: buildFcraReview(issues),
  };
}
