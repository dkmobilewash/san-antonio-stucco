import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle, Building2, Clock, Shield, Users } from 'lucide-react';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import { usePageSEO } from '../lib/seo';

const faqs = [
  {
    question: 'Do you work around business hours to avoid disrupting tenants?',
    answer:
      'Yes. We routinely schedule commercial stucco work during off-hours, weekends, or low-traffic periods. We develop a phased work plan with property management that keeps your business accessible and presentable throughout the project. Tenant communication plans, signage, and access coordination are all included.',
  },
  {
    question: 'How much does commercial stucco work cost in San Antonio?',
    answer:
      'Commercial stucco costs depend on project scope, building size, accessibility, and condition. Targeted facade repairs may start at $2,000 to $5,000. Full-building re-stucco on a mid-size commercial property runs $8 to $18 per square foot. We provide detailed bids with line-item pricing and clear payment milestones so you can budget accurately.',
  },
  {
    question: 'Do you handle permits and inspections for commercial projects?',
    answer:
      'Yes. We manage all permitting, code coordination, and inspection scheduling for commercial stucco projects in San Antonio. Our team is familiar with local commercial building requirements and ensures all work passes inspection without delays or rework.',
  },
  {
    question: 'What commercial property types do you serve?',
    answer:
      'We serve offices, retail storefronts, restaurants, medical buildings, multi-family apartments, HOA common areas, strip centers, churches, schools, and industrial facilities throughout San Antonio. Our crew capacity handles projects from small tenant improvements to full-building exterior renovations.',
  },
];

export default function CommercialStuccoSanAntonioPage() {
  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Commercial Stucco Contractor in San Antonio, TX',
        description: 'Commercial stucco installation, repair, and replacement for offices, retail, multi-family, and industrial properties in San Antonio. Phased scheduling around business operations.',
        provider: { '@id': 'https://sanantoniostucco.com/#business' },
        areaServed: [
          { '@type': 'City', name: 'San Antonio' },
          { '@type': 'City', name: 'Boerne' },
          { '@type': 'City', name: 'New Braunfels' },
          { '@type': 'City', name: 'Schertz' },
          { '@type': 'City', name: 'Helotes' },
        ],
        serviceType: 'Commercial Stucco',
        url: 'https://sanantoniostucco.com/commercial-stucco-san-antonio',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '8000',
          highPrice: '60000',
          priceCurrency: 'USD',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
    [],
  );

  usePageSEO({
    title: 'Commercial Stucco Contractor San Antonio | Office & Retail',
    description:
      'Commercial stucco contractor in San Antonio serving offices, retail, restaurants & multi-family. Phased scheduling, code-compliant work. Licensed & insured. Free bids — call (210) 871-8490.',
    path: '/commercial-stucco-san-antonio',
    rawTitle: true,
    jsonLd,
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 bg-gradient-to-br from-slate-50 via-white to-sand-50">
        <div className="max-w-5xl mx-auto px-6">
          <ol className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <li><Link to="/" className="hover:text-sand-600 transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/stucco-contractor-san-antonio" className="hover:text-sand-600 transition-colors">Stucco Contractor</Link></li>
            <li>/</li>
            <li className="text-slate-800 font-medium">Commercial Stucco</li>
          </ol>

          <div className="inline-flex items-center gap-2 bg-sand-50 border border-sand-200 rounded-full px-4 py-1.5 mb-5">
            <Building2 size={14} className="text-sand-700" />
            <span className="text-sm font-medium text-sand-700">Commercial Stucco Specialists</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-5">
            Commercial Stucco Contractor in San Antonio, TX
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Your commercial property exterior is your business card. Cracked, stained, or peeling stucco tells customers and tenants that the business inside does not pay attention to details. San Antonio Stucco serves offices, retail, restaurants, multi-family, and industrial properties with professional-grade stucco work — scheduled around your operations so business continues uninterrupted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+12108718490"
              className="bg-sand-600 hover:bg-sand-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-sand-600/30"
            >
              <Phone size={20} /> Call (210) 871-8490
            </a>
            <Link
              to="/quote"
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              Request a Commercial Bid <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Flexible Scheduling</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Code-Compliant Work</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Commercially Insured</div>
          </div>
        </div>
      </section>

      {/* Why Commercial Is Different */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Commercial Stucco Work Is Different</h2>
          <p className="text-slate-700 leading-relaxed text-lg mb-5">
            Commercial properties face demands that residential homes do not. Higher traffic means more impact damage to lower wall sections. Stricter building codes require fire-rated assemblies, proper drainage planes, and documented compliance. Larger surface areas demand consistent texture and color across expansive wall planes that show every imperfection. And the need to maintain a professional appearance while work is in progress requires phased scheduling, signage, and tenant coordination that residential contractors rarely handle.
          </p>
          <p className="text-slate-700 leading-relaxed text-lg mb-5">
            San Antonio Stucco has the crew capacity, commercial-grade equipment, and project management experience to handle commercial stucco projects at any scale. From a single-story retail facade refresh to a multi-building apartment complex re-stucco, we plan around your operations, minimize disruption, and deliver work that meets commercial standards on commercial timelines.
          </p>
          <p className="text-slate-700 leading-relaxed text-lg">
            For property managers and building owners, deferred stucco maintenance creates compounding financial problems. Deteriorating exteriors drive away customers, reduce tenant satisfaction, lower lease rates, and create liability exposure from falling stucco sections in pedestrian areas. Addressing problems proactively costs a fraction of emergency repairs and protects the property value that drives your investment returns.
          </p>
        </div>
      </section>

      {/* Commercial Advantages */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">What We Bring to Commercial Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <Clock size={24} className="text-sand-600 mb-3" />
              <h3 className="font-bold text-slate-800 mb-2">Flexible Scheduling</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Nights, weekends, phased approaches — we work around your business operations. Tenants and customers are never surprised by work they were not informed about.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <Users size={24} className="text-sand-600 mb-3" />
              <h3 className="font-bold text-slate-800 mb-2">Crew Capacity</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We have the team size and equipment to handle large projects without dragging out timelines. Multi-building and phased programs are standard for us.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <Shield size={24} className="text-sand-600 mb-3" />
              <h3 className="font-bold text-slate-800 mb-2">Commercial Insurance</h3>
              <p className="text-slate-600 text-sm leading-relaxed">General liability, workers comp, and commercial auto at levels appropriate for commercial construction. COIs provided to property managers and GCs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Commercial Properties We Serve in San Antonio</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              'Office Buildings',
              'Retail Storefronts',
              'Restaurants & Hospitality',
              'Medical & Dental Offices',
              'Multi-Family Apartments',
              'HOA Common Areas',
              'Strip Centers & Plazas',
              'Churches & Schools',
              'Industrial Facilities',
              'Mixed-Use Developments',
              'Government Buildings',
              'Parking Structures',
            ].map((type) => (
              <div key={type} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
                <Building2 size={14} className="text-sand-600 shrink-0" />
                <span className="text-sm font-medium text-slate-700">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Related Stucco Services in San Antonio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/stucco-contractor-san-antonio" className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all">
              <ArrowRight size={16} className="text-sand-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700">Stucco Contractor in San Antonio</span>
            </Link>
            <Link to="/eifs-stucco-san-antonio" className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all">
              <ArrowRight size={16} className="text-sand-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700">EIFS & Synthetic Stucco in San Antonio</span>
            </Link>
            <Link to="/stucco-installation-san-antonio" className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all">
              <ArrowRight size={16} className="text-sand-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700">Stucco Installation in San Antonio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection title="What Property Managers Say About Our Work" filter="Commercial Stucco" />

      {/* FAQ */}
      <FAQSection faqs={faqs} title="Commercial Stucco FAQ — San Antonio" />

      {/* CTA */}
      <CTASection
        headline="Need a Commercial Stucco Contractor in San Antonio?"
        description="Free commercial bids with line-item pricing. We work around your operations, meet code requirements, and deliver results that protect your property investment."
      />
    </>
  );
}
