import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle, MapPin, Shield, Star, Clock, Users } from 'lucide-react';
import { contact } from '../data/contact';
import { locations } from '../data/locations';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import { usePageSEO } from '../lib/seo';

const faqs = [
  {
    question: 'How do I find a reliable stucco contractor in San Antonio?',
    answer:
      'Look for a contractor who is licensed, bonded, and insured with verifiable local experience. Ask about their three-coat stucco process, expansion joint placement, and moisture barrier methods. San Antonio Stucco has completed over 500 projects across the metro area with a 4.9-star rating. Call (210) 871-8490 for a free on-site estimate.',
  },
  {
    question: 'What stucco services do you offer in San Antonio?',
    answer:
      'We provide stucco installation for new construction and additions, stucco repair for cracks and water damage, full stucco replacement, EIFS and synthetic stucco services, stucco painting with elastomeric coatings, stucco remodeling for exterior updates, and both residential and commercial stucco work throughout the San Antonio metro.',
  },
  {
    question: 'How much does a stucco contractor charge in San Antonio?',
    answer:
      'Stucco repair in San Antonio typically costs $300 to $5,000 depending on damage extent. New stucco installation runs $8 to $15 per square foot for a complete three-coat system. Replacement costs $10 to $18 per square foot. We provide free, itemized estimates after an on-site evaluation so there are no surprises.',
  },
  {
    question: 'Are you licensed and insured for stucco work in San Antonio?',
    answer:
      'Yes. San Antonio Stucco is fully licensed, bonded, and insured for both residential and commercial stucco work throughout Bexar County and the greater San Antonio metropolitan area. We carry general liability and workers compensation coverage and provide certificates of insurance upon request.',
  },
];

export default function StuccoContractorPage() {
  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Stucco Contractor in San Antonio, TX',
        description: 'Full-service stucco contractor serving San Antonio with installation, repair, replacement, EIFS, painting, and remodeling. Licensed and insured with 10+ years experience.',
        provider: { '@id': 'https://sanantoniostucco.com/#business' },
        areaServed: [
          { '@type': 'City', name: 'San Antonio' },
          { '@type': 'City', name: 'Boerne' },
          { '@type': 'City', name: 'New Braunfels' },
          { '@type': 'City', name: 'Schertz' },
          { '@type': 'City', name: 'Helotes' },
        ],
        serviceType: 'Stucco Contractor Services',
        url: 'https://sanantoniostucco.com/stucco-contractor-san-antonio',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '300',
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
    title: 'Stucco Contractor in San Antonio, TX | San Antonio Stucco',
    description:
      'Looking for a stucco contractor near me in San Antonio? Licensed & insured with 10+ years experience and 500+ projects. Installation, repair, EIFS & more. Free estimates — call (210) 871-8490.',
    path: '/stucco-contractor-san-antonio',
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
            <li className="text-slate-800 font-medium">Stucco Contractor San Antonio</li>
          </ol>

          <div className="inline-flex items-center gap-2 bg-sand-50 border border-sand-200 rounded-full px-4 py-1.5 mb-5">
            <Shield size={14} className="text-sand-700" />
            <span className="text-sm font-medium text-sand-700">Licensed & Insured Stucco Contractor</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-5">
            Expert Stucco Contractor Serving San Antonio, TX
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
            San Antonio Stucco is a locally owned and operated stucco company serving the greater San Antonio metropolitan area. With over 10 years of experience and more than 500 completed projects, we deliver professional stucco installation, repair, replacement, and specialty services for residential and commercial properties.
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
              Request a Free Estimate <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Licensed & Insured</div>
            <div className="flex items-center gap-1.5"><Star size={16} className="text-sand-600" /> 4.9-Star Rated</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> 500+ Projects Completed</div>
            {/* TODO: Add specific license number when available */}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Full-Service Stucco Contractor in San Antonio</h2>
          <p className="text-slate-700 leading-relaxed text-lg mb-6">
            Whether you need a fresh stucco exterior on a new home, precision repairs on aging walls, or a complete tear-off and rebuild, San Antonio Stucco has the crew, equipment, and local knowledge to deliver results that last. We do not subcontract our work — every project is completed by our own trained team using materials selected specifically for the South Texas climate.
          </p>
          <p className="text-slate-700 leading-relaxed text-lg mb-8">
            San Antonio sits in one of the most demanding environments for exterior building materials in the country. Temperatures regularly exceed 100 degrees, Gulf humidity averages 60 to 70 percent, and UV exposure is among the highest in the state. These conditions punish shortcuts and reward proper technique. Every system we install accounts for thermal cycling, moisture management, and UV resistance from the first layer to the finish coat.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/stucco-installation-san-antonio" className="group bg-slate-50 border border-slate-200 hover:border-sand-300 rounded-xl p-5 hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-800 mb-1 group-hover:text-sand-700 transition-colors">Stucco Installation</h3>
              <p className="text-slate-600 text-sm">New construction and additions with complete three-coat systems.</p>
            </Link>
            <Link to="/stucco-repair-san-antonio" className="group bg-slate-50 border border-slate-200 hover:border-sand-300 rounded-xl p-5 hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-800 mb-1 group-hover:text-sand-700 transition-colors">Stucco Repair</h3>
              <p className="text-slate-600 text-sm">Crack repair, water damage, texture matching, and root-cause diagnosis.</p>
            </Link>
            <Link to="/stucco-replacement" className="group bg-slate-50 border border-slate-200 hover:border-sand-300 rounded-xl p-5 hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-800 mb-1 group-hover:text-sand-700 transition-colors">Stucco Replacement</h3>
              <p className="text-slate-600 text-sm">Full system removal, substrate repair, and rebuild to modern standards.</p>
            </Link>
            <Link to="/eifs-stucco-san-antonio" className="group bg-slate-50 border border-slate-200 hover:border-sand-300 rounded-xl p-5 hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-800 mb-1 group-hover:text-sand-700 transition-colors">EIFS / Synthetic Stucco</h3>
              <p className="text-slate-600 text-sm">Specialized repair and maintenance for synthetic stucco systems.</p>
            </Link>
            <Link to="/stucco-painting" className="group bg-slate-50 border border-slate-200 hover:border-sand-300 rounded-xl p-5 hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-800 mb-1 group-hover:text-sand-700 transition-colors">Stucco Painting</h3>
              <p className="text-slate-600 text-sm">Elastomeric coatings and UV-resistant paint for stucco surfaces.</p>
            </Link>
            <Link to="/commercial-stucco-san-antonio" className="group bg-slate-50 border border-slate-200 hover:border-sand-300 rounded-xl p-5 hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-800 mb-1 group-hover:text-sand-700 transition-colors">Commercial Stucco</h3>
              <p className="text-slate-600 text-sm">Office, retail, and multi-family stucco for property owners and managers.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Licensed Local Contractor */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Hire a Licensed Local Stucco Contractor</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-700 leading-relaxed text-lg mb-5">
                Stucco is not a material you want installed by someone learning on the job. A three-coat stucco system involves substrate preparation, weather-resistant barriers, metal lath, scratch coat, brown coat, and finish coat — each layer with its own timing, technique, and compatibility requirements. In San Antonio, where thermal cycling can swing 50 degrees in a single day, every expansion joint, every moisture detail, and every mix ratio matters.
              </p>
              <p className="text-slate-700 leading-relaxed text-lg">
                A licensed and insured contractor protects you in two ways: their license means they have met state and local requirements for competence and accountability, and their insurance means you are not liable if someone is injured on your property during the project. We carry full general liability and workers compensation coverage, and we provide certificates to any homeowner or property manager who requests them.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                <Shield size={22} className="text-sand-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Licensed, Bonded & Insured</h3>
                  <p className="text-slate-600 text-sm">Full coverage for residential and commercial work throughout Bexar County and surrounding areas.</p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                <Users size={22} className="text-sand-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Our Own Crews — No Subcontractors</h3>
                  <p className="text-slate-600 text-sm">Every project is completed by our trained team. We never hand off your home to unknown labor.</p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                <Clock size={22} className="text-sand-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">10+ Years of Local Experience</h3>
                  <p className="text-slate-600 text-sm">We understand San Antonio soil, climate, and building styles because we have been working in them for over a decade.</p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                <Star size={22} className="text-sand-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">4.9-Star Rating, 500+ Projects</h3>
                  <p className="text-slate-600 text-sm">Proven track record across San Antonio, Boerne, New Braunfels, Schertz, and Helotes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">What Working With Us Looks Like</h2>
          <p className="text-slate-700 leading-relaxed text-lg mb-8">
            We keep the process simple and transparent. No pressure sales, no hidden fees, no surprises halfway through the project. Here is how it works from first contact to final walkthrough.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Free On-Site Estimate', desc: 'We visit your property, inspect the work area, discuss your goals, and provide a detailed written estimate within one business day.' },
              { step: '2', title: 'Material & Schedule Planning', desc: 'Once approved, we order materials rated for San Antonio conditions and schedule the project around your availability.' },
              { step: '3', title: 'Professional Execution', desc: 'Our crew arrives on time, preps the area, protects landscaping, and completes each phase with proper curing time between coats.' },
              { step: '4', title: 'Final Walkthrough', desc: 'We inspect every detail with you, clean up completely, and make sure you are 100% satisfied before we consider the job complete.' },
            ].map((item) => (
              <div key={item.step} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <span className="bg-sand-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3">{item.step}</span>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area + Map */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Stucco Contractor Serving the Greater San Antonio Area</h2>
          <p className="text-slate-700 leading-relaxed text-lg mb-8">
            We provide on-site estimates and complete stucco services throughout San Antonio and the surrounding Hill Country communities. No travel fees, no service area surcharges — the same crews and the same quality everywhere we work.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/${loc.slug}`}
                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-3 hover:shadow-sm transition-all"
              >
                <MapPin size={16} className="text-sand-600 shrink-0" />
                <span className="text-sm font-medium text-slate-700">Stucco contractor in {loc.name}</span>
              </Link>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.994375077717!2d-98.60352572461008!3d29.55745084148031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c67a869354b99%3A0xd5967b37c4e80644!2sSan%20Antonio%20Stucco!5e1!3m2!1sen!2sus!4v1778172234111!5m2!1sen!2sus"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="San Antonio Stucco location and service area map"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection title="What San Antonio Homeowners Say About Us" />

      {/* FAQ */}
      <FAQSection faqs={faqs} title="Stucco Contractor FAQ — San Antonio" />

      {/* CTA */}
      <CTASection
        headline="Ready to Hire a Stucco Contractor in San Antonio?"
        description="Get a free, no-obligation estimate from a licensed and insured local team. We respond within one business day — no pressure, no hidden fees."
      />
    </>
  );
}
