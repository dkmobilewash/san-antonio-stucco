import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle, Layers, Shield } from 'lucide-react';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import { usePageSEO } from '../lib/seo';

const faqs = [
  {
    question: 'How much does stucco installation cost in San Antonio?',
    answer:
      'A complete three-coat stucco installation in San Antonio typically costs $8 to $15 per square foot, depending on wall height, complexity, and finish selection. A typical 2,000-square-foot home exterior runs $16,000 to $30,000 for a full system including moisture barriers, lath, three coats, and finish texture. We provide free on-site estimates with itemized cost breakdowns.',
  },
  {
    question: 'How long does stucco installation take?',
    answer:
      'Most residential installations take 7 to 14 business days. Each of the three coats requires proper curing time between applications — a step we never rush. Larger homes or complex projects with multiple stories, intricate trim details, or mixed-material transitions may take longer. We provide clear timelines before work begins.',
  },
  {
    question: 'What is a three-coat stucco system?',
    answer:
      'A three-coat system includes a scratch coat that bonds mechanically to the lath, a brown coat that creates a level and true plane, and a finish coat that provides your chosen texture and color. This is the traditional method and produces the strongest, most durable stucco application for San Antonio conditions.',
  },
  {
    question: 'Can stucco be installed on an existing home that has siding?',
    answer:
      'Yes. We regularly convert homes from vinyl siding, wood siding, or other materials to stucco. The process requires removing the existing material, installing proper sheathing if needed, adding weather-resistant barriers, attaching metal lath, and applying the three-coat system. The result is a dramatic improvement in both appearance and weather protection.',
  },
];

export default function StuccoInstallationSanAntonioPage() {
  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Stucco Installation in San Antonio, TX',
        description: 'Professional stucco installation for new construction and existing homes in San Antonio. Complete three-coat systems with moisture barriers engineered for South Texas conditions.',
        provider: { '@id': 'https://sanantoniostucco.com/#business' },
        areaServed: [
          { '@type': 'City', name: 'San Antonio' },
          { '@type': 'City', name: 'Boerne' },
          { '@type': 'City', name: 'New Braunfels' },
          { '@type': 'City', name: 'Schertz' },
          { '@type': 'City', name: 'Helotes' },
        ],
        serviceType: 'Stucco Installation',
        url: 'https://sanantoniostucco.com/stucco-installation-san-antonio',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '8000',
          highPrice: '52000',
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
    title: 'Stucco Installation San Antonio, TX | New Construction & Additions',
    description:
      'Professional stucco installation in San Antonio for new homes, additions & siding conversions. Three-coat systems built for Texas heat. Licensed & insured. Free estimates — call (210) 871-8490.',
    path: '/stucco-installation-san-antonio',
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
            <li className="text-slate-800 font-medium">Stucco Installation</li>
          </ol>

          <div className="inline-flex items-center gap-2 bg-sand-50 border border-sand-200 rounded-full px-4 py-1.5 mb-5">
            <Layers size={14} className="text-sand-700" />
            <span className="text-sm font-medium text-sand-700">Professional Stucco Installers</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-5">
            Stucco Installation in San Antonio, TX
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Building a new home, adding square footage, or converting from siding to stucco? Our installation team delivers complete three-coat stucco systems engineered for the extreme heat, humidity, and UV exposure that define the San Antonio climate. Every layer is built to last decades, not just pass inspection.
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
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> 3-Coat System Standard</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Licensed & Insured</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Workmanship Guarantee</div>
          </div>
        </div>
      </section>

      {/* Why Installation Matters */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Proper Installation Is Everything in San Antonio</h2>
          <p className="text-slate-700 leading-relaxed text-lg mb-5">
            A stucco system is only as good as the day it was installed. In San Antonio, where summer surface temperatures on south-facing walls can exceed 150 degrees and Gulf humidity pushes moisture into every gap, the difference between a properly installed system and a shortcut-driven installation is measured in decades of performance versus years of problems.
          </p>
          <p className="text-slate-700 leading-relaxed text-lg mb-5">
            Most stucco failures we repair trace back to installation shortcuts: skipped moisture barriers, insufficient curing between coats, missing expansion joints, or incorrect mix ratios. A properly installed three-coat system in San Antonio should last 50 to 80 years with minimal maintenance. An improperly installed one can show cracking within the first year and develop moisture damage within five.
          </p>
          <p className="text-slate-700 leading-relaxed text-lg">
            Our installation process is designed around prevention. Every step — from substrate preparation and weather-resistant barriers through lath installation, three properly cured coats, and the final finish — is executed to handle the specific stresses that San Antonio walls face every single day.
          </p>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Our Stucco Installation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { step: '1', title: 'Substrate Inspection & Preparation', desc: 'We inspect sheathing, flashing, and framing to confirm everything is sound and properly fastened before any stucco materials are applied.' },
              { step: '2', title: 'Weather-Resistant Barrier & Weep Screed', desc: 'Two layers of Grade D building paper or modern housewrap, plus a weep screed at the base of every wall for proper moisture drainage.' },
              { step: '3', title: 'Metal Lath Installation', desc: 'Self-furring metal lath attached with correct fastener spacing and overlap to create a solid mechanical bond for the stucco layers.' },
              { step: '4', title: 'Scratch Coat Application', desc: 'First coat applied and scored to create a rough surface for the brown coat to grip. Expansion joints placed at all stress points.' },
              { step: '5', title: 'Brown Coat Application', desc: 'Second coat leveled to a true, flat plane. This layer creates the structural foundation for the finish and must cure properly before the next step.' },
              { step: '6', title: 'Curing Between Coats', desc: 'Each coat is allowed to cure fully based on current temperature and humidity conditions. We never rush this step — it is the single biggest factor in long-term performance.' },
              { step: '7', title: 'Finish Coat & Texture', desc: 'Final coat applied in your chosen texture — smooth, sand float, dash, lace, skip trowel, or custom — with integral color or prepared for painting.' },
              { step: '8', title: 'Final Walkthrough', desc: 'Detailed inspection with the homeowner. We check every edge, corner, and transition before cleanup and project closeout.' },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4">
                <span className="bg-sand-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">{item.step}</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">What Sets Our Installation Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Complete three-coat system with proper curing between every layer',
              'Weather-resistant barriers engineered for Gulf Coast humidity levels',
              'Expansion joints placed at every stress point to prevent cracking',
              'Materials rated for UV exposure and thermal cycling in South Texas',
              'Wide selection of finish textures from smooth trowel to heavy dash',
              'Backed by our written workmanship guarantee',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <CheckCircle size={18} className="text-sand-600 mt-0.5 shrink-0" />
                <span className="text-slate-700 text-sm">{item}</span>
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
            <Link to="/stucco-repair-san-antonio" className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all">
              <ArrowRight size={16} className="text-sand-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700">Stucco Repair in San Antonio</span>
            </Link>
            <Link to="/stucco-replacement" className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all">
              <ArrowRight size={16} className="text-sand-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700">Stucco Replacement in San Antonio</span>
            </Link>
            <Link to="/commercial-stucco-san-antonio" className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all">
              <ArrowRight size={16} className="text-sand-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700">Commercial Stucco in San Antonio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Stucco Installation Across the San Antonio Metro</h2>
          <p className="text-slate-600 mb-6">We install stucco on new construction and existing homes throughout San Antonio, Boerne, New Braunfels, Schertz, Helotes, Stone Oak, and all surrounding areas.</p>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.994375077717!2d-98.60352572461008!3d29.55745084148031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c67a869354b99%3A0xd5967b37c4e80644!2sSan%20Antonio%20Stucco!5e1!3m2!1sen!2sus!4v1778172234111!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="San Antonio Stucco installation service area"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection title="What Clients Say About Our Installations" filter="Stucco Installation" />

      {/* FAQ */}
      <FAQSection faqs={faqs} title="Stucco Installation FAQ — San Antonio" />

      {/* CTA */}
      <CTASection
        headline="Ready for a New Stucco Exterior in San Antonio?"
        description="Get a free on-site estimate for your new construction, addition, or siding conversion project. Licensed, insured, and backed by our workmanship guarantee."
      />
    </>
  );
}
