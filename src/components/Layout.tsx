import { Link, Outlet, useLocation } from 'react-router-dom';

const headerLinks = [
  { to: '/scan', label: 'Start Free Scan', primary: true },
  { to: '/why', label: 'Why Credit Vivo' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/faq', label: 'FAQ' },
  { to: '/learning', label: 'Learning' },
];

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/70 bg-white/95 shadow-sm shadow-navy-900/5 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex min-h-[72px] flex-col items-start justify-center gap-3 py-3 lg:h-[72px] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-0">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.webp" alt="Credit Vivo" className="h-9 w-9 sm:h-12 sm:w-12" />
            <span className="text-xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
              Credit <span className="text-emerald-700">Vivo</span>
            </span>
          </Link>

          <nav className="flex w-full items-center gap-2 overflow-x-auto pb-1 lg:w-auto lg:justify-end lg:overflow-visible lg:pb-0" aria-label="Main navigation">
            {headerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={
                  link.primary
                    ? 'shrink-0 rounded-lg bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/15 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/20'
                    : 'shrink-0 rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800'
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function BottomButtons({ exclude }: { exclude?: string }) {
  const allLinks = [
    { to: '/scan', label: 'Start Free Scan', primary: true },
    { to: '/why', label: 'Why Credit Vivo' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/faq', label: 'FAQ' },
    { to: '/learning', label: 'Learning' },
  ];

  const filtered = allLinks.filter((l) => l.to !== exclude);

  return (
    <section className="bg-navy-50/50 py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h3 className="mb-2 text-lg font-bold text-navy-900">Keep building your score board</h3>
        <p className="mb-6 text-sm text-navy-500">Choose the next step that helps you move forward.</p>
        <div className="flex flex-wrap justify-center gap-2">
          {filtered.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={l.primary ? 'btn-primary text-xs' : 'btn-soft text-xs'}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-950 pb-8 pt-14 text-navy-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="mb-3 flex items-center gap-2">
              <img src="/logo.webp" alt="Credit Vivo" className="h-6 w-6 brightness-200" />
              <span className="text-sm font-bold text-white">
                Credit <span className="text-emerald-300">Vivo</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-navy-400">
              Fix what’s hurting your score. Build your AI Credit Boost Plan.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">Product</h4>
            <div className="space-y-2">
              <Link to="/join" className="block text-xs text-navy-400 transition-colors hover:text-white">Join Free</Link>
              <Link to="/pricing" className="block text-xs text-navy-400 transition-colors hover:text-white">Pricing</Link>
              <Link to="/learning" className="block text-xs text-navy-400 transition-colors hover:text-white">Learning</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">Company</h4>
            <div className="space-y-2">
              <Link to="/why" className="block text-xs text-navy-400 transition-colors hover:text-white">Why Credit Vivo</Link>
              <Link to="/faq" className="block text-xs text-navy-400 transition-colors hover:text-white">FAQ</Link>
              <Link to="/reviews" className="block text-xs text-navy-400 transition-colors hover:text-white">Reviews</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">Members</h4>
            <div className="space-y-2">
              <Link to="/login" className="block text-xs text-navy-400 transition-colors hover:text-white">Sign In</Link>
              <Link to="/scan" className="block text-xs text-navy-400 transition-colors hover:text-white">Free Scan</Link>
              <Link to="/findings" className="block text-xs text-navy-400 transition-colors hover:text-white">Findings</Link>
              <Link to="/disputes" className="block text-xs text-navy-400 transition-colors hover:text-white">Dispute Center</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">Legal</h4>
            <div className="space-y-2">
              <Link to="/compliance" className="block text-xs text-navy-400 transition-colors hover:text-white">Compliance</Link>
              <Link to="/terms" className="block text-xs text-navy-400 transition-colors hover:text-white">Terms</Link>
              <Link to="/privacy" className="block text-xs text-navy-400 transition-colors hover:text-white">Privacy</Link>
              <Link to="/disclosure" className="block text-xs text-navy-400 transition-colors hover:text-white">Disclosures</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-6">
          <p className="max-w-4xl text-[11px] leading-relaxed text-navy-500">
            Results are not guaranteed. See <Link to="/disclosure" className="text-navy-300 underline decoration-navy-600 underline-offset-2 hover:text-white">Disclosures</Link>. Credit Vivo is not a law firm and does not provide legal advice. Accurate, current, and verifiable information may remain on a credit report. Attorney support may be available for eligible unresolved credit-reporting issues.
          </p>
          <div className="mt-4 space-y-3 text-[11px] leading-relaxed text-navy-500 max-w-4xl">
            <p>
              <strong className="text-navy-300">Federal Consumer Disclosure:</strong>{' '}
              You have the right to dispute inaccurate information in your credit report by contacting the credit bureau directly. Neither you nor any credit repair company or credit repair organization has the right to have accurate, current, and verifiable information removed from your credit report.
            </p>
            <p>
              <strong className="text-navy-300">Customer Approval:</strong>{' '}
              Credit Vivo helps find score blockers, repair credit report errors, build dispute drafts, and track progress. Nothing is mailed, disputed, submitted, or escalated automatically without customer review and approval.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomButtons exclude={location.pathname} />
      <Footer />
    </div>
  );
}

export { BottomButtons };
