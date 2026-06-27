import { useState } from 'react';
import { AlertCircle, Building2, CheckCircle2, Link2, LockKeyhole, ShieldCheck } from 'lucide-react';

type LinkState = 'idle' | 'ready' | 'blocked';

const requirements = [
  'Plaid client ID and secret stored server-side only',
  'Backend endpoint to create a Plaid link token',
  'Backend endpoint to exchange the public token',
  'Encrypted storage for access tokens',
  'Customer consent log before account linking',
];

export default function BankLink() {
  const [linkState, setLinkState] = useState<LinkState>('idle');

  function handlePrepareLink() {
    setLinkState('blocked');
  }

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">
        Phase 3 Lab
      </p>
      <h1 className="text-xl font-bold text-navy-900 mb-2">
        Bank Linking Review
      </h1>
      <p className="text-sm text-navy-400 mb-6 max-w-3xl">
        This is the consent-first bank-linking surface for future affordability and payment
        verification workflows. It is disabled until secure Plaid backend endpoints and
        Supabase token storage are connected.
      </p>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_340px] gap-5">
        <section className="bg-white rounded-xl border border-navy-100/60 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center">
              <Building2 size={20} className="text-sky-700" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-navy-900">Connect a bank account</h2>
              <p className="text-xs text-navy-400">
                Testing placeholder. No bank login is collected on this screen.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-navy-100 bg-navy-50/40 p-4 mb-5">
            <div className="flex gap-3">
              <ShieldCheck size={18} className="text-mint-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-navy-800">Consent required</p>
                <p className="text-xs text-navy-500 mt-1 leading-relaxed">
                  Credit Vivo should only link accounts after the customer sees exactly what
                  data is requested, why it is needed, and how to disconnect it.
                </p>
              </div>
            </div>
          </div>

          {linkState === 'blocked' && (
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 mb-5 flex gap-3">
              <AlertCircle size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                Plaid is not active in this local copy. Add secure backend link-token and
                token-exchange endpoints before turning on live bank linking.
              </p>
            </div>
          )}

          {linkState === 'ready' && (
            <div className="rounded-xl border border-mint-100 bg-mint-50 p-4 mb-5 flex gap-3">
              <CheckCircle2 size={18} className="text-mint-700 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-mint-800">
                Plaid link token received. Ready to open the Plaid flow.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handlePrepareLink}
            className="btn-primary text-xs py-2.5"
          >
            <Link2 size={14} />
            Prepare secure link
          </button>
        </section>

        <aside className="bg-white rounded-xl border border-navy-100/60 p-5 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <LockKeyhole size={16} className="text-sky-700" />
            <h2 className="text-sm font-bold text-navy-900">Production checklist</h2>
          </div>
          <div className="space-y-3">
            {requirements.map((item) => (
              <div key={item} className="flex gap-2">
                <CheckCircle2 size={14} className="text-mint-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-navy-500 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
