import { CheckCircle, FileText, Scale } from 'lucide-react';

export default function Compliance() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            Compliance
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Clear, honest credit guidance.
          </h1>
          <p className="text-[15px] text-navy-500">
            Credit Vivo is built to guide customers without false promises.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: CheckCircle, title: 'No guarantees', desc: 'We do not guarantee score increases, removals, approvals, or outcomes.' },
              { icon: FileText, title: 'Review before action', desc: 'Customers should review and approve important actions before anything is sent.' },
              { icon: Scale, title: 'Legal support separate', desc: 'Credit Vivo is not a law firm. Optional legal support, if offered, is separate.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-navy-50/50 rounded-xl p-5 border border-navy-100/60">
                <div className="w-9 h-9 bg-sky-100 rounded-lg flex items-center justify-center mb-3">
                  <Icon size={16} className="text-sky-600" />
                </div>
                <h3 className="text-sm font-bold text-navy-900 mb-1">{title}</h3>
                <p className="text-xs text-navy-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important notice */}
      <section className="py-12 bg-sky-50/40">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl p-6 border border-navy-100/60">
            <h3 className="text-sm font-bold text-navy-900 mb-3">Important notice</h3>
            <p className="text-sm text-navy-500 leading-relaxed">
              Credit Vivo helps users understand, organize, review, and track credit improvement steps. Scanner output is draft review data only and should be checked before use. Accurate, current, and verifiable information may remain on a credit report. Any legal, identity protection, mail, or credit-building partner services should be optional, separate, and clearly explained before purchase.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
