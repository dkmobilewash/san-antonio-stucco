import { Link } from 'react-router-dom';
import { Phone, FileText } from 'lucide-react';
import { contact } from '../data/contact';

/**
 * Sticky call / estimate bar for phones. The header's phone strip is hidden below `md`,
 * so this is the only always-visible phone number on small screens.
 */
export default function MobileCallBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={`tel:${contact.phoneRaw}`}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-sand-700"
        aria-label={`Call ${contact.phone}`}
      >
        <Phone size={18} />
        {contact.phone}
      </a>
      <Link
        to="/quote"
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold bg-sand-600 text-white"
      >
        <FileText size={18} />
        Free Estimate
      </Link>
    </div>
  );
}
