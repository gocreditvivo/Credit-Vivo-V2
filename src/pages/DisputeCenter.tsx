import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, FileText, MailCheck, ShieldCheck } from 'lucide-react';
import { getLastScanResult } from '../lib/scanStorage';

function formatLabel(value?: string) {
  return value ? value.replace(/_/g, ' ') : 'Review';
}

export default function DisputeCenter() {
  const result = getLastScanResult();
  const letterQueue = result?.recommended_letter_queue || [];
  const readyCount = letterQueue.length || (result ? Math.min(result.issues_count || 2, 3) : 2);

  const cards = letterQueue.length
    ? letterQueue.slice(0, 4).map((letter) => ({
        title: letter.letter_subject || formatLabel(letter.letter_type),
        body: `${formatLabel(letter.recipient_type)} review package.`,
        items: [formatLabel(letter.round), formatLabel(letter.delivery_method), formatLabel(letter.tracking_status)],
      }))
    : [
        {
          title: 'Bureau action',
          body: 'For possible balance, status, date, duplicate, or bureau mismatch point blockers.',
          items: ['Experian / Equifax / TransUnion', 'Customer review', 'Ready for approval'],
        },
        {
          title: 'Furnisher action',
          body: 'For creditor, collector, or debt buyer reporting questions that may affect your profile.',
          items: ['Account details', 'Evidence packet', 'Response tracking'],
        },
      ];

  const tracking = [
    ['AI findings', true],
    ['Evidence review', Boolean(result)],
    ['Customer approval', false],
    ['Sent', false],
    ['Response pending', false],
    ['Next step', false],
  ] as const;

  return (
    <div>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sky-600">
        Dispute Center
      </p>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-navy-950">Approve score actions.</h1>
          <p className="mt-1 max-w-2xl text-sm text-navy-400">
            Review dispute drafts, choose what moves forward, and track each step.
          </p>
        </div>
        <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
          {readyCount} ready
        </span>
      </div>

      {!result && (
        <section className="mb-5 rounded-2xl border border-sky-100 bg-sky-50/70 p-5">
          <div className="flex items-start gap-3">
            <FileText size={18} className="mt-0.5 flex-shrink-0 text-sky-700" />
            <div>
              <h2 className="text-sm font-bold text-navy-900">Demo score action flow</h2>
              <p className="mt-1 text-xs leading-relaxed text-navy-500">
                Start a scan or load demo findings to populate this page with score actions.
              </p>
              <Link to="/scan" className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-sky-700">
                Start Free Scan
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {cards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm shadow-navy-100/60">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <MailCheck size={20} />
            </div>
            <h2 className="text-lg font-black text-navy-950">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-500">{card.body}</p>
            <div className="mt-5 space-y-2">
              {card.items.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-semibold text-navy-600">
                  <CheckCircle size={14} className="text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-700"
            >
              Approve action
              <ArrowRight size={14} />
            </button>
          </article>
        ))}
      </div>

      <section className="mt-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm shadow-navy-100/60">
        <div className="mb-5 flex items-center gap-2">
          <Clock size={17} className="text-sky-700" />
          <h2 className="text-sm font-bold text-navy-900">Progress tracker</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {tracking.map(([label, done]) => (
            <div key={label} className="rounded-2xl bg-navy-50/70 p-4">
              <CheckCircle size={16} className={done ? 'text-emerald-600' : 'text-navy-300'} />
              <p className="mt-2 text-xs font-bold text-navy-700">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-5">
        <div className="flex items-start gap-3 text-xs leading-relaxed text-amber-900">
          <ShieldCheck size={16} className="mt-0.5 flex-shrink-0" />
          <p>
            Nothing is mailed, disputed, or escalated automatically. Customer approval and review are required first.
          </p>
        </div>
      </section>
    </div>
  );
}
