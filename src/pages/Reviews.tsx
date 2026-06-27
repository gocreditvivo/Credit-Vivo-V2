import { Star } from 'lucide-react';

const reviews = [
  { text: 'The roadmap made my credit feel less confusing.', stars: 5 },
  { text: 'I liked knowing what to focus on each month.', stars: 5 },
  { text: 'It felt simple, not scary or technical.', stars: 5 },
  { text: 'The monthly plan gave me clear steps without overwhelming me.', stars: 5 },
  { text: 'I finally understood what was hurting my score.', stars: 5 },
  { text: 'The learning center answered questions I was too embarrassed to ask.', stars: 4 },
];

export default function Reviews() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            Reviews
          </div>
          <h1 className="text-3xl sm:text-[38px] font-bold text-navy-900 leading-tight mb-4">
            Built for real people.
          </h1>
          <p className="text-[15px] text-navy-500">
            Use verified reviews after launch. These demo cards show layout only.
          </p>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="bg-navy-50/50 rounded-xl p-5 border border-navy-100/60">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(r.stars)].map((_, j) => (
                    <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                  {[...Array(5 - r.stars)].map((_, j) => (
                    <Star key={j} size={13} className="text-navy-200" />
                  ))}
                </div>
                <p className="text-sm text-navy-700 leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
