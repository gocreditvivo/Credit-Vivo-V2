import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function JoinFree() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-mint-50 border border-mint-200 text-mint-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-mint-500 rounded-full" />
            Join Free
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Start your free Credit Check-In.
          </h1>
          <p className="text-[15px] text-navy-500 max-w-md mx-auto">
            You take control. We clear the path. Tell us your goal and get a simple starting point. No hard pull to begin.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-white">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-navy-50/50 rounded-2xl p-6 border border-navy-100/60">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1.5">Your main goal</label>
                <select className="w-full bg-white border border-navy-200 rounded-lg px-3 py-2.5 text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all">
                  <option>Improve my score</option>
                  <option>Clean up possible errors</option>
                  <option>Buy a car</option>
                  <option>Buy a home</option>
                  <option>Understand my credit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1.5">First name</label>
                <input
                  type="text"
                  placeholder="Your first name"
                  className="w-full bg-white border border-navy-200 rounded-lg px-3 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-white border border-navy-200 rounded-lg px-3 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                />
              </div>

              <Link to="/scan" className="btn-primary w-full text-sm py-3 mt-2">
                Join Free & Start
                <ArrowRight size={15} />
              </Link>

              <p className="text-[11px] text-navy-400 text-center leading-relaxed mt-3">
                This preview does not create an account yet. Continue to the Credit Check-In flow to review the next step.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
