import {
  aiInsightIcon as Brain,
  campaignIcon as MousePointerClick,
  completedIcon as CheckCircle,
  customerMetrics,
  founderSummaryMetrics,
  growthActions,
  growthChannels,
  growthIcon as Target,
  growthMetrics,
  healthCards,
  moneyMetrics,
  monitoringAlertExamples,
  opsFeatureModules,
  retentionActions,
  retentionSignals,
} from '../lib/founderOpsModules';

function toneClass(tone: string) {
  if (tone === 'green') return 'border-mint-100 bg-mint-50/60 text-mint-700';
  if (tone === 'yellow') return 'border-amber-100 bg-amber-50/70 text-amber-700';
  if (tone === 'sky') return 'border-sky-100 bg-sky-50/70 text-sky-700';
  if (tone === 'purple') return 'border-violet-100 bg-violet-50/70 text-violet-700';
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
        {founderSummaryMetrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-navy-100/60 bg-white p-4">
            <p className="text-2xl font-bold text-navy-900">{metric.value}</p>
            <p className="mt-0.5 text-[11px] text-navy-400">{metric.label}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-navy-400">{metric.note}</p>
          </div>
        ))}
      </div>

      <section className="mb-5 rounded-xl border border-navy-100/60 bg-white p-5">
        <h2 className="mb-1 text-sm font-bold text-navy-900">Customers</h2>
        <p className="mb-4 text-xs text-navy-400">
          This will show how many people joined, stayed, canceled, and started the free Credit Check-In.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-navy-100 text-navy-400">
                <th className="py-2 pr-4">Metric</th>
                <th className="py-2 pr-4">Today</th>
                <th className="py-2 pr-4">This week</th>
                <th className="py-2 pr-4">This month</th>
                <th className="py-2 pr-4">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {customerMetrics.map((metric) => (
                <tr key={metric.label} className="border-b border-navy-50">
                  <td className="py-3 pr-4 font-semibold text-navy-800">{metric.label}</td>
                  <td className="py-3 pr-4 text-navy-600">{metric.today}</td>
                  <td className="py-3 pr-4 text-navy-600">{metric.week}</td>
                  <td className="py-3 pr-4 text-navy-600">{metric.month}</td>
                  <td className="py-3 pr-4 text-navy-400">{metric.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-navy-100/60 bg-white p-5">
        <h2 className="mb-1 text-sm font-bold text-navy-900">Money</h2>
        <p className="mb-4 text-xs text-navy-400">
          This will show how much Credit Vivo collected, refunded, lost to failed payments, and spent on outside costs.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-navy-100 text-navy-400">
                <th className="py-2 pr-4">Metric</th>
                <th className="py-2 pr-4">Today</th>
                <th className="py-2 pr-4">This week</th>
                <th className="py-2 pr-4">This month</th>
                <th className="py-2 pr-4">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {moneyMetrics.map((metric) => (
                <tr key={metric.label} className="border-b border-navy-50">
                  <td className="py-3 pr-4 font-semibold text-navy-800">{metric.label}</td>
                  <td className="py-3 pr-4 text-navy-600">{metric.today}</td>
                  <td className="py-3 pr-4 text-navy-600">{metric.week}</td>
                  <td className="py-3 pr-4 text-navy-600">{metric.month}</td>
                  <td className="py-3 pr-4 text-navy-400">{metric.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-sky-100 bg-sky-50/50 p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
            <Brain size={18} className="text-sky-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-900">AI retention insights</h2>
            <p className="mt-1 text-xs leading-relaxed text-navy-500">
              This will help the founder see which customers may cancel, who needs attention, and who may be ready for the next plan.
            </p>
          </div>
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {retentionSignals.map((signal) => (
            <div key={signal.title} className="rounded-xl border border-sky-100 bg-white p-4">
              <p className="text-2xl font-bold text-navy-900">{signal.value}</p>
              <h3 className="mt-1 text-xs font-bold text-navy-800">{signal.title}</h3>
              <p className="mt-2 text-[11px] leading-relaxed text-navy-400">{signal.detail}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white bg-white/70 p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-sky-700">Recommended retention actions</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {retentionActions.map((action) => (
              <div key={action} className="flex gap-2 text-xs text-navy-600">
                <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-sky-700" />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
            <Target size={18} className="text-emerald-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-900">Growth AI: bring customers to help</h2>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-navy-500">
              This will help Credit Vivo learn which channels bring real customers, which messages work, and where AI should recommend the next growth move.
            </p>
          </div>
        </div>

        <div className="mb-5 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-100 text-navy-500">
                <th className="py-2 pr-4">Metric</th>
                <th className="py-2 pr-4">Today</th>
                <th className="py-2 pr-4">This week</th>
                <th className="py-2 pr-4">This month</th>
                <th className="py-2 pr-4">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {growthMetrics.map((metric) => (
                <tr key={metric.label} className="border-b border-white/80">
                  <td className="py-3 pr-4 font-semibold text-navy-800">{metric.label}</td>
                  <td className="py-3 pr-4 text-navy-600">{metric.today}</td>
                  <td className="py-3 pr-4 text-navy-600">{metric.week}</td>
                  <td className="py-3 pr-4 text-navy-600">{metric.month}</td>
                  <td className="py-3 pr-4 text-navy-500">{metric.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-5 grid gap-3 lg:grid-cols-4">
          {growthChannels.map((channel) => (
            <div key={channel.channel} className="rounded-xl border border-emerald-100 bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <MousePointerClick size={14} className="text-emerald-700" />
                <h3 className="text-xs font-bold text-navy-900">{channel.channel}</h3>
              </div>
              <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                {channel.stage}
              </span>
              <p className="mt-3 text-[11px] leading-relaxed text-navy-500">{channel.aiUse}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-navy-400">First data needed</p>
              <p className="mt-1 text-[11px] leading-relaxed text-navy-400">{channel.firstDataNeeded}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white bg-white/80 p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-700">AI growth recommendations</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {growthActions.map((action) => (
              <div key={action} className="flex gap-2 text-xs text-navy-600">
                <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-emerald-700" />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-violet-100 bg-white p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="mb-1 text-sm font-bold text-navy-900">Add-anytime AI operations modules</h2>
            <p className="max-w-2xl text-xs leading-relaxed text-navy-400">
              This is the feature registry. Each box is a monitoring area we can connect when the business is ready.
            </p>
          </div>
          <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700">
            Flexible
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {opsFeatureModules.map(({ id, title, ownerView, status, firstDataNeeded, nextAction, icon: Icon, tone }) => (
            <div key={id} className="rounded-xl border border-navy-100/60 bg-navy-50/30 p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <Icon size={16} className="text-sky-700" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-navy-900">{title}</h3>
                  <span className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${toneClass(tone)}`}>
                    {status}
                  </span>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed text-navy-600">{ownerView}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-navy-400">First data needed</p>
              <p className="mt-1 text-[11px] leading-relaxed text-navy-400">{firstDataNeeded}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-navy-400">Next</p>
              <p className="mt-1 text-[11px] leading-relaxed text-navy-400">{nextAction}</p>
            </div>
          ))}
        </div>
      </section>

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
          {monitoringAlertExamples.map((item) => (
            <div key={item} className="flex gap-2 text-xs text-navy-600">
              <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-emerald-700" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
