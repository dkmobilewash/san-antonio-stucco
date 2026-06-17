import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { services } from '../data/services';
import { locations } from '../data/locations';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import { usePageSEO } from '../lib/seo';

export default function ServicesPage() {
  usePageSEO({
    title: 'Stucco Services San Antonio | Installation, Repair & Replacement | Free Estimates',
    description: 'Full-service stucco contractor in San Antonio offering installation, repair, replacement, remodeling & EIFS. Licensed & insured. Call for a free estimate today!',
    path: '/services',
    rawTitle: true,
  });

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Our Stucco Services in San Antonio, TX
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From new installations to specialized EIFS repair, we provide comprehensive stucco services for residential and commercial properties throughout San Antonio. Our work starts with{' '}
            <Link to="/blog/us-largest-plaster-producer-san-antonio" className="text-sand-600 hover:text-sand-700 underline underline-offset-2 transition-colors">
              the highest-quality American-produced plaster materials
            </Link>{' '}
            and ends with finishes built for decades.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Available Throughout San Antonio</h2>
          <p className="text-slate-600 mb-6">
            All of our stucco services are available in these communities. Click your area for local details.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/${loc.slug}`}
                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-3 hover:shadow-sm transition-all"
              >
                <MapPin size={16} className="text-sand-600" />
                <span className="text-sm font-medium text-slate-700">{loc.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/service-areas"
              className="text-sand-600 hover:text-sand-700 font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              View All Service Areas <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
