import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileSearch, ShieldCheck, type LucideIcon } from 'lucide-react';
import { trackEvent } from '../lib/trackEvent';

type CampaignPageProps = {
  campaign: string;
  source: string;
  eyebrow: string;
  headline: string;
  body: string;
  icon: LucideIcon;
  checklist: string[];
  nextStepHeadline: string;
  proofPoints: Array<{ title: string; desc: string }>;
};

export default function CampaignPage({
  campaign,
  source,
  eyebrow,
  headline,
  body,
  icon: Icon,
  checklist,
  nextStepHeadline,
  proofPoints,
}: CampaignPageProps) {
  useEffect(() => {
    void trackEvent({
      event_type: 'website_visit',
      source,
      campaign,
    });
  }, [campaign, source]);

  function trackCampaignClick(eventType: string) {
    void trackEvent({
      event_type: eventType,
      source,
      campaign,
    });
  }

  const joinUrl = `/join?campaign=${campaign.replace(/_/g, '-')}`;

  return (
    <>
      <section className="bg-gradient-to-br from-navy-950 via-emerald-950 to-sky-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-emerald-300/30 bg-white/10 px-4 py-2 text-xs font-bold text-emerald-100">
              <Icon size={15} />
              {eyebrow}
            </div>
            <h1 className="mb-4 max-w-2xl text-[34px] font-bold leading-tight sm:text-[44px]">
              {headline}
            </h1>
            <p className="mb-7 max-w-xl text-base leading-relaxed text-navy-200">{body}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={joinUrl}
                onClick={() => trackCampaignClick('join_clicked')}
                className="btn-mint px-6 py-3 text-sm"
              >
                Start Free Check-In
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/pricing"
                onClick={() => trackCampaignClick('pricing_viewed')}
                className="btn-outline border-white/30 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/20"
              >
                See Plans
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              {['No hard pull to start', 'Plain-English findings', 'Attorney access option'].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-navy-200">
                  <CheckCircle size={13} className="text-emerald-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-navy-950/30 backdrop-blur">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-100">
              What Credit Vivo looks for
            </p>
            <div className="grid gap-3">
              {checklist.map((item) => (
                <div key={item} className="flex gap-3 rounded-xl bg-white/10 p-3 text-sm text-white">
                  <FileSearch size={16} className="mt-0.5 flex-shrink-0 text-emerald-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-navy-300">
              Credit Vivo does not guarantee approvals, score increases, removals, or specific outcomes. Accurate and verifiable information may remain.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sky-700">
              Simple next step
            </p>
            <h2 className="text-[22px] font-semibold text-navy-900 sm:text-[26px]">
              {nextStepHeadline}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-navy-500">
              If this happened to you, you are not alone. Credit Vivo helps you slow the situation down,
              understand what may be on your report, and choose a next step without pressure.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {proofPoints.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm shadow-navy-100/50">
                <span className="text-xl font-bold text-rose-200">0{index + 1}</span>
                <h3 className="mt-3 text-sm font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-navy-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/50 py-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
            <ShieldCheck size={20} className="text-emerald-700" />
          </div>
          <h2 className="mb-3 text-[22px] font-semibold text-navy-900">
            Built for careful, compliant credit review.
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-navy-500">
            We start with education and possible-error review. Customer approval is required before dispute or escalation steps.
          </p>
          <Link
            to={joinUrl}
            onClick={() => trackCampaignClick('join_clicked')}
            className="btn-primary px-7 py-3 text-sm"
          >
            Start Free Check-In
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
