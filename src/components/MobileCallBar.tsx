import { Link, useLocation } from 'react-router-dom';
import { Phone, FileText } from 'lucide-react';
import { contact } from '../data/contact';

export default function MobileCallBar() {
  const location = useLocation();
  const isQuotePage = location.pathname === '/quote';

  const handleEstimateClick = (e: React.MouseEvent) => {
    if (isQuotePage) {
      e.preventDefault();
      document.getElementById('estimate-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      data-track="mobile_call_bar"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={`tel:${contact.phoneRaw}`}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-sand-700"
        aria-label={`Call ${contact.phone}`}
      >
        <Phone size={18} />
        Call Now
      </a>
      <Link
        to="/quote"
        onClick={handleEstimateClick}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold bg-sand-600 text-white"
      >
        <FileText size={18} />
        Free Estimate
      </Link>
    </div>
  );
}
