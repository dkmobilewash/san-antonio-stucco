import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { locations } from '../data/locations';
import { services } from '../data/services';
import CTASection from '../components/CTASection';
import { usePageSEO } from '../lib/seo';

export default function ServiceAreasPage() {
  usePageSEO({
    title: 'Stucco Contractor Service Areas | San Antonio & Surrounding Cities | Free Estimates',
    description: 'Stucco contractor serving San Antonio, Boerne, New Braunfels, Schertz, Helotes, Stone Oak & more. Licensed & insured. Call for a free estimate in your area!',
    path: '/service-areas',
    rawTitle: true,
  });

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Service Areas
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
            We proudly serve San Antonio and the surrounding Hill Country communities with professional stucco services.
          </p>
          <Link
            to="/services"
            className="text-sand-600 hover:text-sand-700 font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            Browse Our Services <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/${loc.slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-sand-200 transition-all"
              >
                <div className="w-12 h-12 bg-sand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sand-100 transition-colors">
                  <MapPin size={24} className="text-sand-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{loc.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{loc.description}</p>
                <span className="text-sand-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Details <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Services Available in All Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}`}
                className="bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 text-center hover:shadow-sm transition-all"
              >
                <span className="text-sm font-medium text-slate-700">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
