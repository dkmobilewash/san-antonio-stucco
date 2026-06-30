import { useMemo } from 'react';
import { useLocation as useRouterLocation, Link } from 'react-router-dom';
import { ArrowRight, Phone, CheckCircle, AlertTriangle, MapPin, Wrench } from 'lucide-react';
import { services } from '../data/services';
import { locations } from '../data/locations';
import { contact } from '../data/contact';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import { usePageSEO } from '../lib/seo';

export default function ServiceLocationPage() {
  const { pathname } = useRouterLocation();
  const parts = pathname.replace(/^\//, '').split('/');
  const serviceSlug = parts[0];
  const locationSlug = parts[1];

  const service = services.find((s) => s.slug === serviceSlug);
  const location = locations.find((l) => l.slug === locationSlug);

  const localizedFaqs = useMemo(() => {
    if (!service || !location) return [];
    return service.faqs.slice(0, 4).map((faq) => ({
      question: faq.question.replace(/San Antonio/g, location.name),
      answer: faq.answer.replace(/San Antonio/g, location.name),
    }));
  }, [service, location]);

  const jsonLd = useMemo(() => {
    if (!service || !location) return undefined;
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${service.name} in ${location.name}, TX`,
        description: `Professional ${service.name.toLowerCase()} services in ${location.name}, TX. Licensed & insured stucco contractor serving ${location.name} and the greater San Antonio metro area.`,
        provider: { '@id': 'https://sanantoniostucco.com/#business' },
        areaServed: { '@type': 'City', name: location.name },
        serviceType: service.name,
        url: `https://sanantoniostucco.com/${service.slug}/${location.slug}`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: localizedFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ];
  }, [service, location, localizedFaqs]);

  usePageSEO({
    title: service && location
      ? `${service.name} in ${location.name}, TX | San Antonio Stucco`
      : 'Page Not Found',
    description: service && location
      ? `Professional ${service.name.toLowerCase()} in ${location.name}, TX. Licensed & insured. Root-cause diagnosis, quality materials & workmanship guarantee. Free estimates — call (210) 871-8490.`
      : 'Page not found.',
    path: `/${serviceSlug}/${locationSlug}`,
    rawTitle: true,
    jsonLd,
  });

  if (!service || !location) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Page not found</h1>
        <Link to="/services" className="text-sand-600 mt-4 inline-block">Back to Services</Link>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="pt-28 md:pt-36 bg-gradient-to-br from-slate-50 via-white to-sand-50">
        <div className="max-w-7xl mx-auto px-6">
          <ol className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
            <li><Link to="/" className="hover:text-sand-600 transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/services" className="hover:text-sand-600 transition-colors">Services</Link></li>
            <li>/</li>
            <li><Link to={`/${service.slug}`} className="hover:text-sand-600 transition-colors">{service.name}</Link></li>
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
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              {service.name} in {location.name}, TX
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {service.heroDescription.replace(/San Antonio/g, location.name)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${contact.phoneRaw}`}
                className="bg-sand-600 hover:bg-sand-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-sand-600/20"
              >
                <Phone size={18} /> Call {contact.phone}
              </a>
              <Link
                to="/quote"
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
              >
                Get Free Estimate <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Licensed & Insured</div>
              <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Free Estimates</div>
              <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Workmanship Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">
            About {service.name} in {location.name}
          </h2>
          <div className="space-y-6">
            <p className="text-slate-700 leading-relaxed text-lg">
              {service.overview[0].replace(/San Antonio/g, location.name)}
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              {location.localInfo}
            </p>
            {service.overview.length > 1 && (
              <p className="text-slate-700 leading-relaxed text-lg">
                {service.overview[1].replace(/San Antonio/g, location.name)}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Why Choose Us for {service.name} in {location.name}
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl">
            Licensed, insured, and locally owned — here is what {location.name} property owners get when they work with our experienced team:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200">
                <CheckCircle size={20} className="text-sage-600 shrink-0 mt-0.5" />
                <span className="text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">{service.process.heading}</h2>
          <p className="text-slate-600 mb-8">
            Here is what to expect when you hire us for {service.name.toLowerCase()} in {location.name}:
          </p>
          <ol className="space-y-4">
            {service.process.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="bg-sand-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-slate-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Local Challenges */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            {location.name} Climate Challenges for Stucco
          </h2>
          <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            Local conditions in {location.name} create specific challenges that require a contractor with area knowledge.
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

      {/* Mid-page CTA */}
      <section className="py-12 bg-sand-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Need {service.name} in {location.name}?
          </h2>
          <p className="text-sand-50 mb-5">Call now for a free, no-obligation estimate. We answer the phone and schedule fast.</p>
          <a
            href={`tel:${contact.phoneRaw}`}
            className="bg-white hover:bg-slate-50 text-sand-700 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
          >
            <Phone size={20} /> Call {contact.phone}
          </a>
        </div>
      </section>

      {/* Other Services in This Location */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">
            Other Stucco Services in {location.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.filter((s) => s.slug !== service.slug).map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}/${location.slug}`}
                className="group flex items-center gap-4 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-sand-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-sand-100 transition-colors">
                  <Wrench size={18} className="text-sand-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm group-hover:text-sand-700 transition-colors">{s.name} in {location.name}</h3>
                  <p className="text-xs text-slate-500">Professional {s.name.toLowerCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* This Service in Other Locations */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            {service.name} Across San Antonio
          </h2>
          <p className="text-slate-600 mb-6">
            We provide professional {service.name.toLowerCase()} throughout the greater San Antonio metro area:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {locations.filter((l) => l.slug !== location.slug).map((loc) => (
              <Link
                key={loc.slug}
                to={`/${service.slug}/${loc.slug}`}
                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-3 hover:shadow-sm transition-all"
              >
                <MapPin size={16} className="text-sand-600" />
                <span className="text-sm font-medium text-slate-700">{service.name} in {loc.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to={`/${service.slug}`} className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
              About {service.name} <ArrowRight size={14} />
            </Link>
            <Link to={`/${location.slug}`} className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
              All Services in {location.name} <ArrowRight size={14} />
            </Link>
            <Link to="/service-areas" className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
              All Service Areas <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={localizedFaqs} title={`${service.name} FAQ — ${location.name}`} />

      {/* CTA */}
      <CTASection
        headline={`Ready for ${service.name} in ${location.name}?`}
        description={`Get a free, no-obligation estimate for your ${service.name.toLowerCase()} project in ${location.name}. We respond within one business day with honest, detailed pricing.`}
      />
    </>
  );
}
