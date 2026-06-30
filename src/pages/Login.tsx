import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Gauge } from 'lucide-react';

export default function Login() {
  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950 p-10 text-white lg:flex lg:items-center">
          <div className="mx-auto max-w-md">
            <Link to="/" className="mb-12 inline-flex items-center gap-3">
              <img src="/logo.webp" alt="Credit Vivo" className="h-10 w-10 brightness-200" />
              <span className="text-2xl font-black tracking-tight">
                Credit<span className="text-emerald-300">Vivo</span>
              </span>
            </Link>

            <h1 className="text-5xl font-black tracking-tight">Your score board is waiting.</h1>
            <p className="mt-4 text-lg text-navy-200">
              Review point blockers, approve actions, and track progress.
            </p>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.07] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">Target path</p>
                  <p className="mt-1 text-4xl font-black tracking-tight">720</p>
                </div>
                <Gauge size={44} className="text-emerald-300" />
              </div>
              <div className="mt-5 h-3 rounded-full bg-white/10">
                <div className="h-3 w-[62%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {[
                ['Point blockers', '3 updates ready'],
                ['Boost actions', '2 ready to review'],
                ['Progress', 'Next step ready'],
              ].map(([title, note]) => (
                <div key={title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                  <div>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="mt-0.5 text-xs text-navy-300">{note}</p>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-bold text-emerald-200">
                    Open
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-emerald-50/40 px-6 py-12">
          <div className="w-full max-w-md rounded-3xl border border-navy-100 bg-white p-7 shadow-xl shadow-navy-900/8">
            <div className="mb-8 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2">
                <img src="/logo.webp" alt="Credit Vivo" className="h-8 w-8" />
                <span className="text-xl font-black text-navy-950">
                  Credit<span className="text-emerald-700">Vivo</span>
                </span>
              </Link>
            </div>

            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-700">Secure portal</p>
            <h2 className="text-3xl font-black tracking-tight text-navy-950">Sign in</h2>
            <p className="mt-2 text-sm text-navy-500">Access your score dashboard.</p>

            <div className="mt-7 space-y-4">
              <label className="block">
                <span className="text-xs font-bold text-navy-700">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 h-12 w-full rounded-2xl border border-navy-100 px-4 text-sm outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-navy-700">Password</span>
                <input
                  type="password"
                  placeholder="Password"
                  className="mt-2 h-12 w-full rounded-2xl border border-navy-100 px-4 text-sm outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
                />
              </label>
            </div>

            <Link to="/dashboard" className="btn-primary mt-6 w-full justify-center py-3 text-sm">
              Login
              <ArrowRight size={15} />
            </Link>

            <div className="mt-5 flex items-center justify-between text-xs">
              <Link to="/scan" className="font-bold text-emerald-700 hover:text-emerald-800">
                Start free scan
              </Link>
              <span className="text-navy-400">Forgot password?</span>
            </div>

            <div className="mt-7 rounded-2xl bg-navy-50 p-4">
              <div className="flex items-start gap-2 text-xs text-navy-500">
                <CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-emerald-600" />
                <p>Find what is costing you points. Take action. Track progress.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
