import {
  AlertTriangle,
  CheckCircle,
  CreditCard,
  FileText,
  HeartPulse,
  Server,
  ShieldCheck,
  Users,
} from 'lucide-react';

const healthCards = [
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

const founderMetrics = [
  { label: 'real customer reports stored', value: '0', note: 'Keep at zero until security audit is done.' },
  { label: 'payments active', value: 'No', note: 'Turn on only after processor/compliance approval.' },
  { label: 'open customer issues', value: 'Manual', note: 'Use a support tracker before public launch.' },
  { label: 'backend health URL', value: 'Pending', note: 'Add Render URL after deployment.' },
];

function toneClass(tone: string) {
  if (tone === 'green') return 'border-mint-100 bg-mint-50/60 text-mint-700';
  if (tone === 'yellow') return 'border-amber-100 bg-amber-50/70 text-amber-700';
  return 'border-navy-100 bg-navy-50/70 text-navy-500';
}

export default function FounderHealth() {
  return (
    <div>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sky-600">
        Founder Health
      </p>
      <h1 className="mb-1 text-xl font-bold text-navy-900">Credit Vivo cockpit</h1>
      <p className="mb-6 max-w-2xl text-sm text-navy-400">
        A plain-English view of what needs watching: website, scanner, customer reports, money, customer issues, and compliance.
      </p>

      <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {founderMetrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-navy-100/60 bg-white p-4">
            <p className="text-2xl font-bold text-navy-900">{metric.value}</p>
            <p className="mt-0.5 text-[11px] text-navy-400">{metric.label}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-navy-400">{metric.note}</p>
          </div>
        ))}
      </div>

      <div className="mb-5 grid gap-4 lg:grid-cols-2">
        {healthCards.map(({ title, status, detail, icon: Icon, tone }) => (
          <section key={title} className="rounded-xl border border-navy-100/60 bg-white p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50">
                  <Icon size={18} className="text-sky-700" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-navy-900">{title}</h2>
                  <span className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${toneClass(tone)}`}>
                    {status}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-navy-500">{detail}</p>
          </section>
        ))}
      </div>

      <section className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-5">
        <div className="mb-3 flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-700" />
          <h2 className="text-sm font-bold text-navy-900">What real-time monitoring should send you</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            'Website is down or latest Vercel deploy failed.',
            'Scanner backend is down or Render health check fails.',
            'Report upload failed or scan error rate goes up.',
            'Customer issue needs review, refund, or legal escalation.',
            'Payment, LegalShield/IDShield add-on, or mail cost fails.',
            'Compliance-sensitive action is missing customer approval.',
          ].map((item) => (
            <div key={item} className="flex gap-2 text-xs text-navy-600">
              <Users size={13} className="mt-0.5 flex-shrink-0 text-emerald-700" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
