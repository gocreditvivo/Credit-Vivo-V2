import { CheckCircle, DollarSign, Megaphone, MousePointerClick, Sparkles, Target, Users } from 'lucide-react';
import {
  growthActions,
  growthChannels,
  growthMetrics,
  millionMonthlyRevenueMilestones,
  millionMonthlyRevenueTargets,
} from '../lib/founderOpsModules';
import {
  defaultMillionDollarMath,
  growthPlays,
  growthRules,
  growthThinkingDirectives,
  leadScoringSignals,
  leadSourceDirectives,
  potentialCustomerSegments,
} from '../lib/growthAiEngine';

const prospectTypes = [
  {
    title: 'Denied or worried borrowers',
    detail: 'People denied for auto, mortgage, apartment, or credit card approval may need credit report review first.',
  },
  {
    title: 'Credit report error searches',
    detail: 'People searching for collections, late payments, duplicate accounts, mixed files, or identity errors.',
  },
  {
    title: 'Partner referrals',
    detail: 'Realtors, auto dealers, loan officers, insurance agents, tax preparers, and community groups.',
  },
  {
    title: 'Unfinished free scans',
    detail: 'People who started the Credit Check-In but did not finish are warm leads the AI should follow up with.',
  },
];

const aiDailyBrief = [
  'Which channel brought the best leads today.',
  'Which campaign message should be tested next.',
  'Which referral partners deserve outreach.',
  'Which unfinished signups need a follow-up.',
  'Which customers look ready for AI Guided, Vivo Plus, or optional legal access.',
];

export default function GrowthAI() {
  return (
    <div>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
        Growth AI
      </p>
      <h1 className="mb-1 text-xl font-bold text-navy-900">Dedicated customer growth assistant</h1>
      <p className="mb-6 max-w-2xl text-sm text-navy-400">
        A private AI workspace for bringing Credit Vivo more customers to help. It tracks leads, learns what works, and recommends the next growth move.
      </p>

      <section className="mb-5 rounded-xl border border-mint-100 bg-white p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint-50">
            <DollarSign size={18} className="text-mint-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-900">$1M/month growth target</h2>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-navy-500">
              Growth AI should work backward from the revenue goal: customers needed, lead sources, conversion rates, retention, and upsells.
            </p>
          </div>
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-3">
          {millionMonthlyRevenueTargets.map((target) => (
            <div key={target.scenario} className="rounded-xl border border-mint-100 bg-mint-50/40 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-mint-700">{target.scenario}</p>
              <p className="mt-2 text-2xl font-bold text-navy-900">{target.customersNeeded}</p>
              <p className="text-[11px] text-navy-500">paid customers at {target.monthlyPrice}</p>
              <p className="mt-3 text-[11px] leading-relaxed text-navy-500">{target.meaning}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {millionMonthlyRevenueMilestones.map((milestone) => (
            <div key={milestone.target} className="rounded-xl border border-navy-100/60 bg-navy-50/30 p-4">
              <p className="text-lg font-bold text-navy-900">{milestone.target}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-navy-500">{milestone.focus}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-mint-100 bg-mint-50/40 p-4">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-mint-700">Growth AI funnel math</h3>
          <p className="text-xs leading-relaxed text-navy-600">
            At a blended ${defaultMillionDollarMath.averageRevenuePerPaidCustomer}/mo average and an 8% free-to-paid conversion target,
            Growth AI estimates Credit Vivo would need about{' '}
            <span className="font-bold text-navy-900">{defaultMillionDollarMath.paidCustomersNeeded.toLocaleString()}</span> paid customers and{' '}
            <span className="font-bold text-navy-900">{defaultMillionDollarMath.freeUsersNeeded.toLocaleString()}</span> free users in the funnel.
          </p>
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
            <Target size={18} className="text-emerald-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-900">What Growth AI watches</h2>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-navy-500">
              The first job is simple: learn where good customers come from before Credit Vivo spends serious money on ads.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
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
      </section>

      <div className="mb-5 grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-navy-100/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50">
              <Users size={18} className="text-sky-700" />
            </div>
            <h2 className="text-sm font-bold text-navy-900">Best customer types to find</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {prospectTypes.map((item) => (
              <div key={item.title} className="rounded-xl border border-navy-100/60 bg-navy-50/30 p-4">
                <h3 className="text-xs font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-navy-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-violet-100 bg-violet-50/50 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <Sparkles size={18} className="text-violet-700" />
            </div>
            <h2 className="text-sm font-bold text-navy-900">Founder daily brief</h2>
          </div>
          <div className="grid gap-2">
            {aiDailyBrief.map((item) => (
              <div key={item} className="flex gap-2 text-xs text-navy-600">
                <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-violet-700" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mb-5 rounded-xl border border-sky-100 bg-white p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50">
            <Target size={18} className="text-sky-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-900">Lead scoring engine</h2>
            <p className="mt-1 text-xs text-navy-400">Growth AI ranks who looks most likely to need Credit Vivo help.</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {leadScoringSignals.map((signal) => (
            <div key={signal.name} className="rounded-xl border border-sky-100 bg-sky-50/40 p-4">
              <p className="text-lg font-bold text-navy-900">+{signal.scoreImpact}</p>
              <h3 className="mt-1 text-xs font-bold text-navy-800">{signal.name}</h3>
              <p className="mt-2 text-[11px] leading-relaxed text-navy-500">{signal.reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-navy-100/60 bg-white p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50">
            <Sparkles size={18} className="text-navy-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-900">How Growth AI thinks</h2>
            <p className="mt-1 text-xs text-navy-400">
              Codex-style discipline: mission, tools, numbers, verification, and approval.
            </p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {growthThinkingDirectives.map((directive) => (
            <div key={directive.principle} className="rounded-xl border border-navy-100/60 bg-navy-50/30 p-4">
              <h3 className="text-xs font-bold text-navy-900">{directive.principle}</h3>
              <p className="mt-2 text-[11px] leading-relaxed text-navy-500">{directive.behavior}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-emerald-100 bg-white p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
            <Users size={18} className="text-emerald-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-900">United States potential customer segments</h2>
            <p className="mt-1 text-xs text-navy-400">
              Growth AI should target these groups through opt-in campaigns, search, referrals, and education.
            </p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {potentialCustomerSegments.map((customer) => (
            <div key={customer.segment} className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
              <span className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                customer.priority === 'high'
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border-sky-100 bg-sky-50 text-sky-700'
              }`}>
                {customer.priority} priority
              </span>
              <h3 className="mt-3 text-xs font-bold text-navy-900">{customer.segment}</h3>
              <p className="mt-2 text-[11px] leading-relaxed text-navy-500">{customer.problem}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Where to find</p>
              <p className="mt-1 text-[11px] leading-relaxed text-navy-500">{customer.whereToFind}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Send to</p>
              <p className="mt-1 text-[11px] font-semibold text-navy-700">{customer.campaignPath}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-violet-100 bg-violet-50/50 p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
            <Sparkles size={18} className="text-violet-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-900">Campaign plays Growth AI should test</h2>
            <p className="mt-1 text-xs text-navy-500">These are starter campaigns based on Credit Vivo’s best-fit customers.</p>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-4">
          {growthPlays.map((play) => (
            <div key={play.title} className="rounded-xl border border-violet-100 bg-white p-4">
              <h3 className="text-xs font-bold text-navy-900">{play.title}</h3>
              <p className="mt-2 text-[11px] leading-relaxed text-navy-500">{play.audience}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-violet-700">Offer</p>
              <p className="mt-1 text-[11px] leading-relaxed text-navy-500">{play.offer}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-violet-700">Channel</p>
              <p className="mt-1 text-[11px] leading-relaxed text-navy-500">{play.channel}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-violet-700">Signal</p>
              <p className="mt-1 text-[11px] leading-relaxed text-navy-500">{play.expectedSignal}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-amber-100 bg-amber-50/60 p-5">
        <h2 className="mb-3 text-sm font-bold text-navy-900">When the numbers are off, Growth AI recommends fixes</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {growthRules.map((rule) => (
            <div key={rule.trigger} className="rounded-xl border border-amber-100 bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">{rule.trigger}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-navy-500">{rule.insight}</p>
              <p className="mt-3 text-xs font-semibold text-navy-800">{rule.recommendedAction}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-emerald-100 bg-white p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
            <Megaphone size={18} className="text-emerald-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-900">Lead source directives</h2>
            <p className="mt-1 text-xs text-navy-400">Growth AI can get leads from opt-in and public business channels, not private consumer scraping.</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {leadSourceDirectives.map((directive) => (
            <div key={directive.source} className="rounded-xl border border-navy-100/60 bg-navy-50/30 p-4">
              <span className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                directive.allowed
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border-rose-100 bg-rose-50 text-rose-700'
              }`}>
                {directive.allowed ? 'Allowed' : 'Blocked'}
              </span>
              <h3 className="mt-3 text-xs font-bold text-navy-900">{directive.source}</h3>
              <p className="mt-2 text-[11px] leading-relaxed text-navy-500">{directive.instruction}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-navy-100/60 bg-white p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
            <Megaphone size={18} className="text-emerald-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-900">Growth channels</h2>
            <p className="mt-1 text-xs text-navy-400">Start with channels that can teach us before heavy ad spending.</p>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-4">
          {growthChannels.map((channel) => (
            <div key={channel.channel} className="rounded-xl border border-navy-100/60 bg-navy-50/30 p-4">
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
      </section>

      <section className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-5">
        <h2 className="mb-3 text-sm font-bold text-navy-900">AI growth recommendations</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {growthActions.map((action) => (
            <div key={action} className="flex gap-2 text-xs text-navy-600">
              <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-emerald-700" />
              <span>{action}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
