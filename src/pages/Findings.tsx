import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle, Clock, FileSearch, MailCheck, Route, ShieldCheck } from 'lucide-react';
import { getLastScanResult } from '../lib/scanStorage';

const categoryNames = [
  'Identity cleanup',
  'Collection blocker',
  'Bureau mismatch',
  'Status or date blocker',
  'Proof needed',
  'Attorney review candidate',
];

function countCategory(label: string, result: ReturnType<typeof getLastScanResult>) {
  if (!result) return 0;

  if (label === 'Attorney review candidate') {
    return result.review_items_preview.filter((item) => item.needs_admin_review).length;
  }

  const fromIssues = (result.issues_preview || []).filter((issue) => {
    const combined = `${issue.customer_label} ${issue.suggested_round} ${issue.issue_type}`.toLowerCase();
    if (label === 'Identity cleanup') return combined.includes('profile') || combined.includes('identity') || combined.includes('address');
    if (label === 'Collection blocker') return combined.includes('collection');
    if (label === 'Bureau mismatch') return combined.includes('bureau') || combined.includes('mismatch');
    if (label === 'Status or date blocker') return combined.includes('status') || combined.includes('date');
    if (label === 'Proof needed') return combined.includes('proof') || combined.includes('evidence') || combined.includes('factual');
    return false;
  }).length;

  const fromItems = result.review_items_preview.filter((item) => {
    const combined = `${item.account_type || ''} ${item.status || ''} ${item.pay_status || ''} ${item.remarks || ''}`.toLowerCase();

    if (label === 'Collection blocker') return combined.includes('collection');
    if (label === 'Status or date blocker') {
      return (
        combined.includes('charge') ||
        combined.includes('transferred') ||
        combined.includes('sold') ||
        combined.includes('closed')
      );
    }
    return false;
  }).length;

  return Math.max(fromIssues, fromItems);
}

function formatLabel(value: string) {
  return value.replace(/_/g, ' ');
}

export default function Findings() {
  const result = getLastScanResult();

  if (!result) {
    return (
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">
          AI Findings
        </p>
        <h1 className="text-xl font-bold text-navy-900 mb-6">
          Your point blockers will show here.
        </h1>

        <div className="bg-white rounded-xl p-6 border border-navy-100/60 max-w-xl">
          <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
            <FileSearch size={20} className="text-sky-600" />
          </div>
          <h2 className="text-sm font-bold text-navy-900 mb-2">
            No score scan result yet
          </h2>
          <p className="text-xs text-navy-400 mb-5 leading-relaxed">
            Start a free scan first, then your score blockers and boost actions will appear here.
          </p>
          <Link to="/scan" className="btn-primary text-xs py-2.5">
            Start Free Scan
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { val: String(result.review_items_count || 0), label: 'items scanned' },
    { val: String(result.issues_count || result.issues_preview?.length || 0), label: 'point blockers' },
    { val: String(result.cross_bureau_groups?.length || 0), label: 'bureau matches' },
    { val: '0', label: 'hard pulls' },
  ];
  const letterQueue = result.recommended_letter_queue || [];
  const scenarioCards = [
    {
      title: 'Bureau dispute',
      body: 'Used when the report shows wrong balance, status, date, duplicate item, or bureau mismatch.',
      next: 'Draft bureau letter, include FCRA notice, wait for response.',
    },
    {
      title: 'Furnisher dispute',
      body: 'Used when the creditor, collector, or debt buyer needs to prove what they are reporting.',
      next: 'Ask for basis of reporting, balance support, payment history, and ownership records.',
    },
    {
      title: 'MOV escalation',
      body: 'Used when the bureau says Verified but the scanner still sees a flaw.',
      next: 'Request method of verification and prepare Strategy B follow-up.',
    },
    {
      title: 'Attorney review',
      body: 'Used for stronger files with repeated verification, strong evidence, or unresolved reporting harm.',
      next: 'Prepare history, delivery proof, responses, and evidence packet.',
    },
  ];
  const trackingSteps: Array<[string, string, boolean]> = [
    ['Found', 'CreditVivo organized possible point blockers', true],
    ['Review', 'Customer approval and authorization required', false],
    ['Mailed', 'Certified tracking number saved after mailing', false],
    ['Waiting', 'Response deadline and follow-up dates tracked', false],
    ['Escalation', 'MOV, CFPB/state, or attorney review if needed', false],
  ];

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">
        AI Findings
      </p>
      <h1 className="text-2xl font-black tracking-tight text-navy-950 mb-1">
        Point blockers found.
      </h1>
      <p className="text-sm text-navy-400 mb-6 max-w-2xl">
        {result.customer_summary?.message ||
          result.customer_message ||
          'CreditVivo organized your possible point blockers. Nothing is sent without approval.'}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl p-4 border border-navy-100/60 text-center"
          >
            <p className="text-2xl font-bold text-navy-900">{s.val}</p>
            <p className="text-[11px] text-navy-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-5">
        <div className="bg-white rounded-xl p-5 border border-navy-100/60">
          <h2 className="text-sm font-bold text-navy-900 mb-3">
            Score blocker categories
          </h2>
          <p className="text-xs text-navy-400 mb-4">
            We show simple categories first, then the action that may help you move forward.
          </p>

          <div className="space-y-2">
            {categoryNames.map((cat) => {
              const count = countCategory(cat, result);
              return (
                <div
                  key={cat}
                  className="flex items-center justify-between py-3 px-4 bg-navy-50/50 rounded-lg"
                >
                  <span className="text-sm font-medium text-navy-700">{cat}</span>
                  <span className="text-[11px] text-navy-400">
                    {count > 0 ? `${count} item${count === 1 ? '' : 's'}` : 'Clear'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl p-5 border border-navy-100/60">
            <h2 className="text-sm font-bold text-navy-900 mb-3">
              Reports reviewed
            </h2>
            <div className="space-y-2">
              {result.files.map((file) => (
                <div
                  key={`${file.filename}-${file.bureau}`}
                  className="flex items-center gap-2 text-xs text-navy-500"
                >
                  <CheckCircle size={14} className="text-mint-600" />
                  <span>
                    {file.bureau}: {file.filename}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-navy-100/60">
            <h2 className="text-sm font-bold text-navy-900 mb-3">
              Important notice
            </h2>
            <div className="flex gap-2 text-xs text-navy-500 leading-relaxed">
              <ShieldCheck size={16} className="text-sky-600 flex-shrink-0 mt-0.5" />
              <p>
                Findings are review data. Credit Vivo does not send letters or disputes
                automatically. Customer approval and admin review are required.
              </p>
            </div>
          </div>
        </div>
      </div>

      {(result.issues_preview || []).length > 0 && (
        <div className="bg-white rounded-xl p-5 border border-navy-100/60 mt-5">
          <h2 className="text-sm font-bold text-navy-900 mb-3">
            Point blocker details
          </h2>
          <div className="space-y-3">
            {(result.issues_preview || []).slice(0, 6).map((issue) => (
              <div
                key={issue.id}
                className="rounded-lg bg-navy-50/50 p-4 border border-navy-100/50"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle size={15} className="text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-navy-800">
                      {issue.customer_label}
                    </p>
                    <p className="text-xs text-navy-500 mt-1 leading-relaxed">
                      {issue.customer_explanation}
                    </p>
                    <p className="text-[11px] text-navy-400 mt-2">
                      Suggested next step: {issue.suggested_round}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/disputes"
            className="inline-flex items-center gap-2 mt-5 text-xs font-semibold text-sky-700 hover:text-sky-800"
          >
            Build boost actions
            <ArrowRight size={13} />
          </Link>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <section className="bg-white rounded-xl p-5 border border-navy-100/60">
          <div className="flex items-center gap-2 mb-4">
            <Route size={16} className="text-sky-600" />
            <h2 className="text-sm font-bold text-navy-900">Action scenarios</h2>
          </div>
          <div className="grid gap-3">
            {scenarioCards.map((scenario) => (
              <div key={scenario.title} className="rounded-lg bg-navy-50/50 p-4 border border-navy-100/50">
                <p className="text-sm font-semibold text-navy-800">{scenario.title}</p>
                <p className="text-xs text-navy-500 mt-1 leading-relaxed">{scenario.body}</p>
                <p className="text-[11px] text-sky-700 mt-2 font-semibold">{scenario.next}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl p-5 border border-navy-100/60">
          <div className="flex items-center gap-2 mb-4">
            <MailCheck size={16} className="text-sky-600" />
            <h2 className="text-sm font-bold text-navy-900">Draft dispute actions</h2>
          </div>
          {letterQueue.length ? (
            <div className="space-y-3">
              {letterQueue.slice(0, 4).map((letter) => (
                <div key={letter.letter_id} className="rounded-lg bg-navy-50/50 p-4 border border-navy-100/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-navy-800">
                        {letter.letter_subject || formatLabel(letter.letter_type)}
                      </p>
                      <p className="text-xs text-navy-500 mt-1">{letter.round}</p>
                    </div>
                    <span className="rounded-lg bg-white px-2 py-1 text-[10px] font-bold uppercase text-navy-500">
                      {formatLabel(letter.tracking_status)}
                    </span>
                  </div>
                  <p className="text-[11px] text-navy-400 mt-2">
                    Recipient: {formatLabel(letter.recipient_type)} | Delivery: {formatLabel(letter.delivery_method)}
                  </p>
                  {letter.draft_letter_body && (
                    <details className="mt-3 rounded-lg border border-navy-100 bg-white p-3">
                      <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-wider text-sky-700">
                        View draft letter
                      </summary>
                      <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-md bg-navy-50 p-3 text-[11px] leading-relaxed text-navy-700">
                        {letter.draft_letter_body}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-navy-500">No draft letters are queued yet.</p>
          )}
        </section>
      </div>

      <section className="bg-white rounded-xl p-5 border border-navy-100/60 mt-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-sky-600" />
          <h2 className="text-sm font-bold text-navy-900">Progress tracking</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-3">
          {trackingSteps.map(([title, detail, done]) => (
            <div key={title} className="rounded-lg bg-navy-50/50 p-4 border border-navy-100/50">
              <CheckCircle size={15} className={done ? 'text-mint-600' : 'text-navy-300'} />
              <p className="text-sm font-semibold text-navy-800 mt-2">{title}</p>
              <p className="text-[11px] text-navy-500 mt-1 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-navy-400 mt-4">
          Nothing is mailed, disputed, or escalated automatically. Approval and review are required first.
        </p>
      </section>
    </div>
  );
}
