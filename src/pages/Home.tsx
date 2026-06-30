import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileSearch, Gauge, ShieldCheck, Sparkles } from 'lucide-react';

function PhonePreview() {
  const findings = [
    ['Portfolio Recovery', 'Possible balance mismatch', 'Ready'],
    ['Capital One', 'Possible date issue', 'Evidence'],
    ['Personal info', 'Old address reported', 'Review'],
  ];

  return (
    <div className="mx-auto w-full max-w-[430px] rounded-[2rem] border border-white/20 bg-navy-950 p-3 shadow-2xl shadow-navy-900/25">
      <div className="min-h-[560px] rounded-[1.5rem] bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Vivo Dashboard</p>
            <p className="text-sm font-bold text-navy-900">AI review ready</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
            No hard pull
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 to-sky-950 p-5 text-white">
          <p className="text-xs font-semibold text-white/70">Credit health preview</p>
          <p className="mt-2 text-4xl font-black leading-none tracking-tight">Good path</p>
          <p className="mt-3 text-sm text-white/75">3 possible errors. 2 need evidence.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['3-bureau ready', 'Plain English', 'Track results'].map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {findings.map(([name, note, status]) => (
            <div key={name} className="flex items-start justify-between gap-3 rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
              <div>
                <p className="text-sm font-bold text-navy-900">{name}</p>
                <p className="mt-0.5 text-xs text-navy-500">{note}</p>
              </div>
              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-navy-500 ring-1 ring-navy-100">
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-white py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1fr_0.88fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-bold text-emerald-700 shadow-sm shadow-navy-900/5">
              <Sparkles size={14} />
              AI-powered credit review
            </div>

            <h1 className="max-w-3xl text-[44px] font-black leading-[0.98] tracking-tight text-navy-950 sm:text-[58px] lg:text-[70px]">
              AI Credit Boost + Attorney Support
            </h1>

            <p className="mt-5 max-w-2xl text-lg font-semibold text-navy-700 sm:text-xl">
              Find errors. Build disputes. Track progress.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy-500 sm:text-lg">
              Upload your credit report. We find possible errors, build disputes, and track progress.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/scan" className="btn-primary px-6 py-3 text-sm">
                Start Free Scan
                <ArrowRight size={16} />
              </Link>
              <Link to="/pricing" className="btn-outline px-6 py-3 text-sm">
                See Plans
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['No hard pull to start', 'Clean findings only', 'Attorney review if needed'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-navy-100 bg-white px-4 py-3 shadow-sm">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span className="text-xs font-bold text-navy-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <PhonePreview />
          </div>
        </div>
      </section>

      <section className="border-y border-navy-100 bg-white py-5">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-6 md:grid-cols-5">
          {['Upload/Pull Report', 'AI Findings', 'Approve Disputes', 'Track Progress', 'Attorney Review'].map((item) => (
            <div key={item} className="rounded-full bg-navy-50 px-4 py-2 text-center text-xs font-bold text-navy-600">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-sky-700">How it works</p>
            <h2 className="text-3xl font-black tracking-tight text-navy-950">Simple credit help.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Upload', 'Add your credit report.', FileSearch],
              ['Review', 'AI finds possible errors.', Gauge],
              ['Track', 'Approve disputes and follow progress.', ShieldCheck],
            ].map(([title, desc, Icon]) => (
              <div key={title as string} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm shadow-navy-100/60">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-black text-navy-950">{title as string}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-300">Behind the scenes</p>
            <h2 className="text-3xl font-black tracking-tight">Backend AI scanner.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-300">
              Our scanner reviews your report behind the scenes. You see clear findings and next steps.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['3-bureau comparison', 'Plain-English findings', 'Dispute builder', 'Progress tracking'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <p className="text-sm font-bold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/50 py-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black tracking-tight text-navy-950">Start free. Upgrade when ready.</h2>
          <p className="mt-3 text-sm text-navy-500">
            Begin with a free scan, then choose support only when you want more help.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <Link to="/scan" className="btn-primary px-6 py-3 text-sm">
              Start Free Scan
              <ArrowRight size={16} />
            </Link>
            <Link to="/pricing" className="btn-outline px-6 py-3 text-sm">
              See Plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
