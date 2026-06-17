import { useMemo } from 'react';
import { useLocation as useRouterLocation, Link } from 'react-router-dom';
import { ArrowRight, Phone, MapPin, AlertTriangle } from 'lucide-react';
import { locations } from '../data/locations';
import { services } from '../data/services';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import { usePageSEO } from '../lib/seo';

export default function LocationDetailPage() {
  const { pathname } = useRouterLocation();
  const slug = pathname.replace(/^\//, '');
  const location = locations.find((l) => l.slug === slug);

  const jsonLd = useMemo(() => {
    if (!location) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: location.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    };
  }, [location]);

  const seoMeta = useMemo(() => {
    if (!location) return { title: 'Location Not Found', description: 'Page not found.' };
    const cityDescriptions: Record<string, string> = {
      'san-antonio': 'Top-rated stucco contractor in San Antonio, TX. Crack repair, water damage repair, installation & EIFS for San Antonio homes & businesses. Free on-site estimates.',
      'boerne': 'Stucco contractor in Boerne, TX serving the Hill Country. Expert stucco repair, installation & finishing for Boerne homes. Licensed & insured. Free estimates.',
      'new-braunfels': 'Stucco contractor in New Braunfels, TX serving Comal County. Repair, installation & EIFS for homes near Canyon Lake, Gruene & downtown. Free estimates.',
      'schertz': 'Stucco contractor in Schertz, TX serving the Cibolo area. Crack & water damage repair, installation & finishing for Schertz and Cibolo homes. Free estimates.',
      'helotes': 'Stucco contractor in Helotes, TX serving northwest San Antonio. Repair, installation & custom finishing for Helotes homes. Licensed & insured. Free estimates.',
      'stone-oak': 'Stucco contractor in Stone Oak, San Antonio area. Premium repair & installation services. Licensed & insured. Call today for a free estimate!',
      'alamo-heights': 'Stucco repair & installation in Alamo Heights, San Antonio area. Quality craftsmanship for fine homes. Licensed & insured. Free estimates available!',
      'live-oak': 'Stucco contractor serving Live Oak in the San Antonio area. Expert repair & installation. Licensed & insured. Schedule your free estimate today!',
      'universal-city': 'Professional stucco services in Universal City, San Antonio area. Repair & installation experts. Licensed & insured. Get your free estimate now!',
      'leon-valley': 'Stucco contractor in Leon Valley, San Antonio area. Expert repair, installation & finishing. Licensed & insured. Call for a free estimate today!',
      'selma': 'Stucco services in Selma, San Antonio area. Professional repair & installation for residential & commercial. Licensed & insured. Free estimates available!',
    };
    const focusedCities = ['san-antonio', 'boerne', 'new-braunfels', 'schertz', 'helotes'];
    const title = focusedCities.includes(location.slug)
      ? `Stucco Contractor in ${location.name} TX | San Antonio Stucco`
      : `${location.name} Stucco Contractor | San Antonio Area | Licensed & Insured`;
    return {
      title,
      description: cityDescriptions[location.slug] || `Professional stucco services in ${location.name}, San Antonio area. Expert repair & installation. Licensed & insured. Call for a free estimate!`,
    };
  }, [location]);

  usePageSEO({
    title: seoMeta.title,
    description: seoMeta.description,
    path: `/${slug}`,
    rawTitle: true,
    jsonLd,
  });

  if (!location) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Location not found</h1>
        <Link to="/service-areas" className="text-sand-600 mt-4 inline-block">Back to Service Areas</Link>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="pt-28 md:pt-36 bg-gradient-to-br from-slate-50 via-white to-sand-50">
        <div className="max-w-7xl mx-auto px-6">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li><Link to="/" className="hover:text-sand-600 transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/service-areas" className="hover:text-sand-600 transition-colors">Service Areas</Link></li>
            <li>/</li>
            <li className="text-slate-800 font-medium">{location.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-8 pb-20 bg-gradient-to-br from-slate-50 via-white to-sand-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-sand-50 border border-sand-200 rounded-full px-4 py-1.5 mb-4">
              <MapPin size={14} className="text-sand-600" />
              <span className="text-sm font-medium text-sand-700">{location.name}, TX</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">{location.heroHeadline}</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">{location.heroDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+12108718490"
                className="bg-sand-600 hover:bg-sand-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-sand-600/20"
              >
                <Phone size={18} /> Call (210) 871-8490
              </a>
              <Link
                to="/quote"
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
              >
                Get Free Estimate <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Why {location.name} Homeowners Choose Us
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl">{location.localInfo}</p>
          {location.extendedContent && (
            <div className="mt-8 max-w-3xl space-y-5">
              {location.extendedContent.map((para, i) => (
                <p
                  key={i}
                  className="text-slate-700 leading-relaxed [&_a]:text-sand-600 [&_a:hover]:text-sand-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
              <div className="pt-2 flex flex-wrap gap-4">
                <Link to="/" className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
                  San Antonio Stucco Home <ArrowRight size={14} />
                </Link>
                <Link to="/stucco-repair" className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
                  San Antonio Stucco Repair <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mid-page Call CTA */}
      <section className="py-12 bg-sand-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Need Stucco Help in {location.name}?</h2>
          <p className="text-sand-50 mb-5">Call now for a free, no-obligation estimate. We answer the phone and schedule fast.</p>
          <a
            href="tel:+12108718490"
            className="bg-white hover:bg-slate-50 text-sand-700 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
          >
            <Phone size={20} /> Call (210) 871-8490
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection title={`Trusted by ${location.name} Homeowners`} />

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">
            Services Available in {location.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}`}
                className="group flex items-center gap-4 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-sand-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-sand-100 transition-colors">
                  <ArrowRight size={18} className="text-sand-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">{s.name}</h3>
                  <p className="text-xs text-slate-500">in {location.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
            Recent Projects in {location.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt={`Stucco project in ${location.name}`}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-800">Residential Installation</h3>
                <p className="text-sm text-slate-500">{location.name}, TX</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white">
              <img
                src="https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt={`Stucco work in ${location.name}`}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-800">Stucco Repair</h3>
                <p className="text-sm text-slate-500">{location.name}, TX</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white">
              <img
                src="https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt={`Stucco exterior in ${location.name}`}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-800">Exterior Remodel</h3>
                <p className="text-sm text-slate-500">{location.name}, TX</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Local Climate Challenges in {location.name}
          </h2>
          <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            Stucco in the San Antonio area faces specific environmental stressors that require local knowledge to address properly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {location.painPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <AlertTriangle size={18} className="text-sand-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={location.faqs} title={`${location.name} Stucco FAQ`} />

      {/* Other Areas We Serve */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Other Areas We Serve</h2>
          <p className="text-slate-600 mb-6">
            In addition to {location.name}, we provide professional stucco services across the greater San Antonio metro area:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {locations.filter((l) => l.slug !== slug).map((loc) => (
              <Link
                key={loc.slug}
                to={`/${loc.slug}`}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-sand-300 rounded-xl p-3 hover:shadow-sm transition-all"
              >
                <MapPin size={16} className="text-sand-600" />
                <span className="text-sm font-medium text-slate-700">Stucco Services in {loc.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/service-areas" className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
              All Service Areas <ArrowRight size={14} />
            </Link>
            <Link to="/services" className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
              Browse All Services <ArrowRight size={14} />
            </Link>
            <Link to="/quote" className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
              Request a Free Estimate <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection headline={`Get a Free Estimate in ${location.name}`} />
    </>
  );
}
