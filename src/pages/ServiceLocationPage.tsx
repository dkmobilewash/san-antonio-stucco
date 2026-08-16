import { useMemo } from 'react';
import { useLocation as useRouterLocation, Link } from 'react-router-dom';
import { ArrowRight, Phone, CheckCircle, AlertTriangle, MapPin, Wrench } from 'lucide-react';
import { services } from '../data/services';
import { locations } from '../data/locations';
import { serviceLocationData } from '../data/serviceLocationData';
import { contact } from '../data/contact';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import TestimonialsSection from '../components/TestimonialsSection';
import ReviewCTA from '../components/ReviewCTA';
import { usePageSEO } from '../lib/seo';

export default function ServiceLocationPage() {
  const { pathname } = useRouterLocation();
  const parts = pathname.replace(/^\//, '').split('/');
  const serviceSlug = parts[0];
  const locationSlug = parts[1];

  const service = services.find((s) => s.slug === serviceSlug);
  const location = locations.find((l) => l.slug === locationSlug);
  const pageData = serviceLocationData.find(
    (d) => d.serviceSlug === serviceSlug && d.locationSlug === locationSlug,
  );

  const jsonLd = useMemo(() => {
    if (!service || !location || !pageData) return undefined;
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${service.name} in ${location.name}, TX`,
        description: pageData.metaDescription,
        provider: { '@id': 'https://sanantoniostucco.com/#business' },
        areaServed: { '@type': 'City', name: location.name },
        serviceType: service.name,
        url: `https://sanantoniostucco.com/${service.slug}/${location.slug}`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pageData.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ];
  }, [service, location, pageData]);

  const seoTitleOverrides: Record<string, string> = {
    'stucco-repairs/san-antonio': 'Stucco Repair San Antonio TX | Same-Week Estimates | San Antonio Stucco',
    'commercial-stucco/san-antonio': 'Commercial Stucco Contractor San Antonio TX | Licensed & Insured | San Antonio Stucco',
    'eifs-synthetic-stucco/san-antonio': 'EIFS Stucco San Antonio TX | Installation & Repair Experts | San Antonio Stucco',
    'residential-stucco/san-antonio': 'Residential Stucco Contractor San Antonio TX | Home Exteriors | San Antonio Stucco',
    'stucco-installation/san-antonio': 'Stucco Installation San Antonio TX | New Builds & Retrofit | San Antonio Stucco',
  };
  const seoDescOverrides: Record<string, string> = {
    'stucco-repairs/san-antonio': 'Cracked or water-damaged stucco in San Antonio? Same-week estimates for all stucco repair types. Seamless texture matching, licensed & insured. Call (210) 871-8490.',
    'commercial-stucco/san-antonio': 'Commercial stucco installation and repair in San Antonio. Offices, retail & multi-family. Minimal disruption, professional results. Free quote — call (210) 871-8490.',
    'eifs-synthetic-stucco/san-antonio': 'San Antonio EIFS and synthetic stucco specialists — installation, repair & moisture remediation. Licensed & insured. Free assessment — call (210) 871-8490.',
    'residential-stucco/san-antonio': 'Residential stucco repair, installation & refinishing for San Antonio homes. Quality workmanship built for Texas heat. Free estimate — call (210) 871-8490.',
    'stucco-installation/san-antonio': 'Professional stucco installation in San Antonio for new construction & retrofits. Three-coat systems engineered for South Texas. Free estimate — call (210) 871-8490.',
  };
  const comboKey = `${serviceSlug}/${locationSlug}`;
  const h1Overrides: Record<string, string> = {
    'eifs-synthetic-stucco/san-antonio': 'EIFS Stucco in San Antonio, TX',
    'commercial-stucco/san-antonio': 'Commercial Stucco Contractor in San Antonio, TX',
    'stucco-repairs/san-antonio': 'Stucco Repair in San Antonio, TX',
    'stucco-installation/san-antonio': 'Stucco Installation in San Antonio, TX',
    'residential-stucco/san-antonio': 'Residential Stucco Contractor in San Antonio, TX',
  };

  usePageSEO({
    title: seoTitleOverrides[comboKey] || (service && location
      ? `${service.name} in ${location.name}, TX | San Antonio Stucco`
      : 'Page Not Found'),
    description: seoDescOverrides[comboKey] || pageData?.metaDescription ||
      (service && location
        ? `Professional ${service.name.toLowerCase()} in ${location.name}, TX. Licensed & insured. Free estimates — call (210) 871-8490.`
        : 'Page not found.'),
    path: `/${serviceSlug}/${locationSlug}`,
    rawTitle: true,
    jsonLd,
  });

  if (!service || !location || !pageData) {
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
              {h1Overrides[comboKey] || `${service.name} in ${location.name}, TX`}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {pageData.paragraphs[0]}
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

      {/* Body Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">
            {h1Overrides[comboKey]?.replace(', TX', '') || `${service.name} in ${location.name}`}
          </h2>
          <div className="space-y-6">
            {pageData.paragraphs.slice(1).map((paragraph, i) => (
              <p key={i} className="text-slate-700 leading-relaxed text-lg">{paragraph}</p>
            ))}
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

      {/* FAQ */}
      <FAQSection faqs={pageData.faqs} title={`${service.name} FAQ — ${location.name}`} />

      {/* Testimonials */}
      <TestimonialsSection title={`${service.name} Reviews from ${location.name} Clients`} filter={service.name} />

      {/* Review CTA */}
      <ReviewCTA />

      {/* Other Services in San Antonio */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">
            Other Stucco Services in San Antonio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.filter((s) => s.slug !== service.slug).map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}/san-antonio`}
                className="group flex items-center gap-4 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-sand-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-sand-100 transition-colors">
                  <Wrench size={18} className="text-sand-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm group-hover:text-sand-700 transition-colors">{s.name} in San Antonio</h3>
                  <p className="text-xs text-slate-500">Professional {s.name.toLowerCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stucco Services Across the Metro */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Stucco Services Across the San Antonio Metro
          </h2>
          <p className="text-slate-600 mb-6">
            We provide professional stucco services throughout the greater San Antonio metro area:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {locations.filter((l) => l.slug !== 'san-antonio').map((loc) => (
              <Link
                key={loc.slug}
                to={`/${loc.slug}`}
                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-3 hover:shadow-sm transition-all"
              >
                <MapPin size={16} className="text-sand-600" />
                <span className="text-sm font-medium text-slate-700">Stucco Services in {loc.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to={`/${service.slug}`} className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
              About {service.name} <ArrowRight size={14} />
            </Link>
            <Link to="/san-antonio" className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
              All Services in San Antonio <ArrowRight size={14} />
            </Link>
            <Link to="/service-areas" className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
              All Service Areas <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline={`Ready for ${service.name} in ${location.name}?`}
        description={`Get a free, no-obligation estimate for your ${service.name.toLowerCase()} project in ${location.name}. We respond within one business day with honest, detailed pricing.`}
      />
    </>
  );
}
