import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Compass,
  Search,
  FileText,
  Calendar,
  BookOpen,
  Bell,
  Headphones,
  ArrowLeft,
} from 'lucide-react';

const sideLinks = [
  { to: '/dashboard', label: 'Roadmap', icon: Compass },
  { to: '/scan', label: 'Free Scan', icon: Search },
  { to: '/findings', label: 'Findings', icon: FileText },
  { to: '#', label: 'Monthly Plan', icon: Calendar },
  { to: '#', label: 'Learning Center', icon: BookOpen },
  { to: '#', label: 'Updates', icon: Bell },
  { to: '#', label: 'Support', icon: Headphones },
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-navy-50/30">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r border-navy-100/60 p-4">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <img src="/logo.webp" alt="Credit Vivo" className="w-6 h-6" />
          <span className="text-sm font-bold text-navy-900">
            Credit <span className="text-mint-600">Vivo</span>
          </span>
        </Link>

        <nav className="flex-1 space-y-0.5">
          {sideLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === to
                  ? 'bg-sky-50 text-sky-700'
                  : 'text-navy-500 hover:bg-navy-50 hover:text-navy-700'
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-navy-400 hover:text-navy-600 transition-colors mt-4"
        >
          <ArrowLeft size={13} />
          Back to site
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 mb-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.webp" alt="Credit Vivo" className="w-6 h-6" />
            <span className="text-sm font-bold text-navy-900">Credit <span className="text-mint-600">Vivo</span></span>
          </Link>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
