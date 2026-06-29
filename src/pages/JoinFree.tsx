import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/trackEvent';

const goals = [
  'Understand my score factors',
  'Review possible report inaccuracies',
  'Buy a car',
  'Buy a home',
  'Rent an apartment',
  'Collection account I do not recognize',
  'Understand my credit',
];

async function captureLead(firstName: string, email: string, goal: string, campaign?: string) {
  await fetch('/api/leads/capture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: firstName,
      email,
      goal,
      campaign,
      source: campaign ? 'campaign_join_page' : 'join_page',
      consent_to_contact: true,
      timestamp: new Date().toISOString(),
    }),
  });
}

function trackJoin(campaign?: string) {
  void trackEvent({
    event_type: 'join_clicked',
    source: campaign ? 'campaign_join_page' : 'join_page',
    campaign,
  });
}

export default function JoinFree() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const campaign = params.get('campaign') || undefined;
  const [goal, setGoal] = useState(goals[0]);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await captureLead(firstName, email, goal, campaign);
      trackJoin(campaign);
      navigate('/scan');
    } catch {
      setError('Please enter your first name and a valid email before continuing.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-mint-50 border border-mint-200 text-mint-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-mint-500 rounded-full" />
            Free Beta
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Start your free beta Credit Check-In.
          </h1>
          <p className="text-[15px] text-navy-500 max-w-md mx-auto">
            You take control. We clear the path. Tell us your goal and get a simple starting point. No hard pull. No payment.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-white">
        <div className="max-w-md mx-auto px-4">
          <form onSubmit={handleSubmit} className="bg-navy-50/50 rounded-2xl p-6 border border-navy-100/60">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1.5">Your main goal</label>
                <select
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  className="w-full bg-white border border-navy-200 rounded-lg px-3 py-2.5 text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                >
                  {goals.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1.5">First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Your first name"
                  className="w-full bg-white border border-navy-200 rounded-lg px-3 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-navy-200 rounded-lg px-3 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                />
              </div>

              <label className="flex gap-2 text-[11px] leading-relaxed text-navy-500">
                <input type="checkbox" checked readOnly className="mt-0.5 h-3.5 w-3.5 rounded border-navy-300" />
                I agree Credit Vivo may contact me about my free Credit Check-In and related next steps. No payment today.
              </label>

              {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-sm py-3 mt-2 disabled:opacity-60">
                {isSubmitting ? 'Saving...' : 'Join Free Beta'}
                <ArrowRight size={15} />
              </button>

              <p className="text-[11px] text-navy-400 text-center leading-relaxed mt-3">
                This beta preview does not start a paid service. Continue to the Credit Check-In flow to review the next step.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
