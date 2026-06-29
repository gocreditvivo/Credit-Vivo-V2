import { ArrowRight, BrainCircuit, CheckCircle, FileSearch, MailCheck, Scale, UserPlus } from 'lucide-react';

const stages = [
  {
    icon: UserPlus,
    title: '1. Consumer Intake',
    status: 'Complete',
    body: 'Demo Client creates an account, confirms consent, sees no-hard-pull language, and chooses the goal: remove inaccurate collection reporting before a mortgage pre-approval.',
  },
  {
    icon: BrainCircuit,
    title: '2. AI Scanner',
    status: 'Complete',
    body: 'Synthetic Experian, Equifax, and TransUnion data is parsed. The scanner extracts account status, balance, DOFD, bureau differences, and confidence.',
  },
  {
    icon: FileSearch,
    title: '3. Parser Findings',
    status: 'Flagged',
    body: 'AI finds balance mismatch, DOFD mismatch, status mismatch, and a closed/sold collection still reporting a balance.',
  },
  {
    icon: MailCheck,
    title: '4. Dispute Workflow',
    status: 'Draft Only',
    body: 'Credit Vivo prepares a staged dispute file: Round 1 data hygiene, Round 4 forensic audit, Round 7 MOV/process audit, Round 10 legal endgame.',
  },
  {
    icon: Scale,
    title: '5. Tracking + Attorney Escalation',
    status: 'Escalated',
    body: 'When the bureau response is Verified, the file moves to Strategy B: MOV escalation and attorney-ready review packet.',
  },
];

const timeline = [
  ['Account created', 'Demo consumer intake completed'],
  ['Report uploaded', 'Synthetic 3-bureau report received'],
  ['AI parsed', '6 forensic flags detected'],
  ['Draft letter ready', 'FCRA notice and history summary attached'],
  ['Bureau verified', 'Escalated to MOV / attorney review'],
];

export default function InvestorDemo() {
  return (
    <main className="bg-gradient-to-b from-emerald-50/60 via-white to-sky-50/50">
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
              Investor Sandbox
            </p>
            <h1 className="max-w-3xl text-[32px] font-semibold leading-tight text-navy-900 sm:text-[42px]">
              Test Credit Vivo from intake to attorney-ready escalation.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy-500">
              This demo uses fake consumer data only. It shows the product story: consumer account setup,
              AI scanner, parser findings, dispute workflow, tracking, and escalation after a verified response.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#demo-flow" className="btn-primary">
                Start Demo Walkthrough
                <ArrowRight size={15} />
              </a>
              <a href="/scan" className="btn-outline">
                Open Scanner
              </a>
            </div>
          </div>

          <aside className="rounded-xl border border-emerald-100 bg-white p-5 shadow-xl shadow-navy-900/8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-sky-700">Dummy Client</p>
            <h2 className="mt-1 text-lg font-bold text-navy-900">Demo Client</h2>
            <div className="mt-4 space-y-3 text-xs text-navy-500">
              <p><strong className="text-navy-700">Goal:</strong> Mortgage-ready credit review</p>
              <p><strong className="text-navy-700">Report:</strong> Synthetic 3-bureau file</p>
              <p><strong className="text-navy-700">AI flags:</strong> 6 forensic issues</p>
              <p><strong className="text-navy-700">Current status:</strong> MOV / attorney review</p>
            </div>
          </aside>
        </div>
      </section>

      <section id="demo-flow" className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stages.map(({ icon: Icon, title, status, body }) => (
            <article key={title} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm shadow-navy-100/50">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-cyan-100">
                  <Icon size={18} className="text-emerald-700" />
                </div>
                <span className="rounded-lg bg-navy-50 px-2.5 py-1 text-[10px] font-bold uppercase text-navy-500">
                  {status}
                </span>
              </div>
              <h2 className="text-sm font-bold text-navy-900">{title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-navy-500">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-16 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-xl border border-navy-100 bg-white p-6">
          <h2 className="text-lg font-bold text-navy-900">What the investor should see</h2>
          <div className="mt-5 grid gap-3">
            {timeline.map(([label, detail]) => (
              <div key={label} className="flex gap-3 rounded-lg bg-navy-50/60 p-3">
                <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-emerald-700" />
                <div>
                  <p className="text-sm font-semibold text-navy-800">{label}</p>
                  <p className="text-xs text-navy-500">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-navy-900">Demo guardrails</h2>
          <p className="mt-3 text-xs leading-relaxed text-navy-600">
            Use only synthetic data. Do not upload real SSNs, DOBs, addresses, IDs, or live credit reports.
            Letters stay draft-only. Attorney escalation is shown as an eligibility/review workflow, not legal advice.
          </p>
          <div className="mt-5 rounded-lg bg-white p-4 text-xs leading-relaxed text-navy-600">
            Customer message after Verified response:
            <strong className="mt-2 block text-navy-900">
              The bureau is standing their ground, but our engine found a flaw. Escalating to Strategy B. No action required.
            </strong>
          </div>
        </div>
      </section>
    </main>
  );
}
