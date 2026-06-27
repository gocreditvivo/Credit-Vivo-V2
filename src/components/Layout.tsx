import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/why', label: 'Why Credit Vivo' },
  { to: '/pricing', label: 'Free Beta' },
  { to: '/faq', label: 'FAQ' },
  { to: '/learning', label: 'Learning' },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-navy-100/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.webp" alt="Credit Vivo" className="w-7 h-7" />
            <span className="text-base font-bold text-navy-900">
              Credit <span className="text-mint-600">Vivo</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-[13px] font-medium transition-colors ${
                  location.pathname === to
                    ? 'text-navy-900'
                    : 'text-navy-500 hover:text-navy-800'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link to="/dashboard" className="btn-soft text-xs py-2 px-4">
              Sign In
            </Link>
            <Link to="/join" className="btn-primary text-xs py-2 px-4">
              Join Free
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-navy-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-navy-100 px-4 pb-4 pt-2">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block py-2.5 text-sm text-navy-700 hover:text-navy-900 border-b border-navy-50 last:border-0"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-3">
            <Link to="/dashboard" className="btn-soft text-xs py-2 w-full" onClick={() => setOpen(false)}>Sign In</Link>
            <Link to="/join" className="btn-primary text-xs py-2 w-full" onClick={() => setOpen(false)}>Join Free</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function BottomButtons({ exclude }: { exclude?: string }) {
  const allLinks = [
    { to: '/join', label: 'Join Free', primary: true },
    { to: '/why', label: 'Why Credit Vivo' },
    { to: '/pricing', label: 'Free Beta' },
    { to: '/faq', label: 'FAQ' },
    { to: '/learning', label: 'Learning' },
  ];

  const filtered = allLinks.filter((l) => l.to !== exclude);

  return (
    <section className="py-16 bg-navy-50/50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h3 className="text-lg font-bold text-navy-900 mb-2">Keep going with Credit Vivo</h3>
        <p className="text-sm text-navy-500 mb-6">Choose the next page that helps you move forward.</p>
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
    <footer className="bg-navy-950 text-navy-300 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src="/logo.webp" alt="Credit Vivo" className="w-6 h-6 brightness-200" />
              <span className="text-sm font-bold text-white">
                Credit <span className="text-mint-400">Vivo</span>
              </span>
            </Link>
            <p className="text-xs text-navy-400 leading-relaxed">
              You take control. We clear the path.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Product</h4>
            <div className="space-y-2">
              <Link to="/join" className="block text-xs text-navy-400 hover:text-white transition-colors">Join Free</Link>
              <Link to="/pricing" className="block text-xs text-navy-400 hover:text-white transition-colors">Free Beta</Link>
              <Link to="/learning" className="block text-xs text-navy-400 hover:text-white transition-colors">Learning</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Company</h4>
            <div className="space-y-2">
              <Link to="/why" className="block text-xs text-navy-400 hover:text-white transition-colors">Why Credit Vivo</Link>
              <Link to="/faq" className="block text-xs text-navy-400 hover:text-white transition-colors">FAQ</Link>
              <Link to="/reviews" className="block text-xs text-navy-400 hover:text-white transition-colors">Reviews</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Members</h4>
            <div className="space-y-2">
              <Link to="/dashboard" className="block text-xs text-navy-400 hover:text-white transition-colors">Sign In</Link>
              <Link to="/scan" className="block text-xs text-navy-400 hover:text-white transition-colors">Free Scan</Link>
              <Link to="/findings" className="block text-xs text-navy-400 hover:text-white transition-colors">Findings</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Legal</h4>
            <div className="space-y-2">
              <Link to="/compliance" className="block text-xs text-navy-400 hover:text-white transition-colors">Compliance</Link>
              <Link to="/terms" className="block text-xs text-navy-400 hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="block text-xs text-navy-400 hover:text-white transition-colors">Privacy</Link>
              <Link to="/disclosure" className="block text-xs text-navy-400 hover:text-white transition-colors">Disclosure</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-6">
          <p className="text-[11px] text-navy-500 leading-relaxed max-w-4xl">
            Credit Vivo does not guarantee credit score increases, removals, approvals, or specific outcomes. Accurate, current, and verifiable information may remain on a credit report. Credit Vivo is not a law firm and does not provide legal advice. Optional legal support, if offered, is separate.
          </p>
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
