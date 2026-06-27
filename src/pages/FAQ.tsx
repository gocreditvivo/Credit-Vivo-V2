import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What is Credit Vivo?', a: 'Credit Vivo is an educational software platform that helps you understand credit information, organize report details, track review items, and learn step by step.' },
  { q: 'What does "You take control. We clear the path." mean?', a: 'It means you stay in charge of your credit journey. Credit Vivo helps organize information, explain what may matter, and keep your next steps clear.' },
  { q: 'Does Credit Vivo guarantee score increases?', a: 'No. Credit Vivo does not guarantee score increases, removals, approvals, or specific outcomes.' },
  { q: 'What is a Credit Check-In?', a: 'It is your free starting point. Credit Vivo organizes uploaded report information into a simple educational roadmap.' },
  { q: 'Will Credit Vivo send disputes automatically?', a: 'No. Credit Vivo does not send disputes or letters automatically. Review data and next steps should be checked by you before anything is sent.' },
  { q: 'What does the scanner do?', a: 'The scanner organizes uploaded report information into draft review data. It helps identify possible review points, but it is not a final legal or credit decision.' },
  { q: 'Why not dispute everything at once?', a: 'Disputing everything at once can be confusing, expensive, and unsupported. Credit Vivo helps you review and prioritize information before you decide what to do.' },
  { q: 'Online disputes or letters?', a: 'Consumers may dispute inaccurate information directly with bureaus or furnishers. Credit Vivo can help organize draft information, but you remain responsible for reviewing and deciding what to send.' },
  { q: 'What is collection validation?', a: 'Collection validation means a consumer asks selected collectors to confirm important details about a debt, such as the original creditor, balance, ownership, and authority to collect.' },
  { q: 'What does verified mean?', a: 'It means the bureau or reporting company said the item should remain. Credit Vivo helps organize information so you can decide whether follow-up makes sense.' },
  { q: 'Can accurate negative information be removed?', a: 'Accurate, current, and verifiable information may remain on a credit report. Credit Vivo focuses on organization, education, possible errors, and next steps.' },
  { q: 'How does Credit Vivo help me build credit?', a: 'Credit Vivo helps you understand score-building habits like paying on time, lowering card balances, avoiding unnecessary applications, and tracking due dates.' },
  { q: 'Is Credit Vivo only for disputes?', a: 'No. Credit Vivo is built around credit education, report organization, review workflows, habit tracking, and self-directed next steps.' },
  { q: 'Is Credit Vivo a law firm?', a: 'No. Credit Vivo is not a law firm and does not provide legal advice. Optional legal support may be available separately.' },
  { q: 'How is Credit Vivo different from credit repair companies?', a: 'Credit Vivo is positioned as an educational software platform and self-directed tool. It does not act as a credit repair organization, law firm, or agency that performs services on your behalf.' },
  { q: 'Can I dispute credit report inaccuracies myself?', a: 'Yes. You have the right to dispute inaccurate or incomplete information directly with credit bureaus and furnishers at no cost.' },
  { q: 'Can I cancel?', a: 'Yes. Credit Vivo provides clear membership terms and a clear cancellation process. If paid services are introduced later, required cancellation rights must be shown before purchase.' },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            FAQ
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Questions answered.
          </h1>
          <p className="text-[15px] text-navy-500">
            Plain-English answers before you start.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-navy-100/60 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-navy-50/50 transition-colors"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                >
                  <span className="text-sm font-semibold text-navy-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-navy-400 flex-shrink-0 transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIdx === i && (
                  <div className="px-5 pb-4 text-sm text-navy-500 leading-relaxed border-t border-navy-100/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
