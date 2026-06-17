import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { contact } from '../data/contact';

interface CTASectionProps {
  headline?: string;
  description?: string;
}

export default function CTASection({
  headline = 'Ready to Start Your Stucco Project?',
  description = 'Get a free, no-obligation estimate from San Antonio\'s trusted stucco experts. We respond within one business day.',
}: CTASectionProps) {
  return (
    <section className="bg-slate-800 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{headline}</h2>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/quote"
            className="bg-sand-600 hover:bg-sand-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2"
          >
            Get Free Estimate <ArrowRight size={18} />
          </Link>
          <a
            href={`tel:${contact.phoneRaw}`}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2"
          >
            <Phone size={18} /> Call {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
