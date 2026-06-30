import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle, Shield, AlertTriangle } from 'lucide-react';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import { usePageSEO } from '../lib/seo';

const faqs = [
  {
    question: 'What is EIFS and how is it different from traditional stucco?',
    answer:
      'EIFS (Exterior Insulation and Finish Systems) consists of foam insulation board, fiberglass reinforcing mesh, a polymer base coat, and a thin acrylic finish coat. Traditional stucco is a Portland cement system applied in three thick coats over metal lath. They look similar from the street but require completely different repair materials and techniques. Using traditional stucco repair methods on EIFS causes failures and can trap moisture.',
  },
  {
    question: 'How do I know if my home has EIFS or traditional stucco?',
    answer:
      'Knock on the surface. EIFS sounds hollow and gives slightly because there is foam behind the thin finish coat. Traditional stucco sounds solid and hard. You can also check the system thickness at a window reveal — EIFS is typically 2 to 4 inches thick while traditional stucco is about 1 inch. We offer free inspections to identify your system type.',
  },
  {
    question: 'How much does EIFS repair cost in San Antonio?',
    answer:
      'EIFS repair costs vary based on damage extent. Small sealant and coating work starts around $500. Section repairs involving foam and base coat replacement run $1,500 to $5,000. Extensive moisture remediation with substrate repair can reach $10,000 to $15,000 or more. We recommend moisture testing first to understand the true scope before committing to a repair plan.',
  },
  {
    question: 'Is EIFS safe in the San Antonio climate?',
    answer:
      'EIFS performs well in San Antonio when properly maintained, but it requires more attention than traditional stucco in our climate. UV exposure degrades the acrylic finish faster here, thermal cycling stresses sealant joints, and our humidity creates moisture intrusion risks. Modern drainage EIFS systems with regular sealant maintenance perform reliably. Older barrier EIFS systems require closer monitoring.',
  },
];

export default function EifsSanAntonioPage() {
  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'EIFS & Synthetic Stucco Contractor in San Antonio, TX',
        description: 'Specialized EIFS and synthetic stucco repair, maintenance, and remediation in San Antonio. Moisture testing, coating restoration, and system-specific repairs by trained specialists.',
        provider: { '@id': 'https://sanantoniostucco.com/#business' },
        areaServed: [
          { '@type': 'City', name: 'San Antonio' },
          { '@type': 'City', name: 'Boerne' },
          { '@type': 'City', name: 'New Braunfels' },
          { '@type': 'City', name: 'Schertz' },
          { '@type': 'City', name: 'Helotes' },
        ],
        serviceType: 'EIFS / Synthetic Stucco',
        url: 'https://sanantoniostucco.com/eifs-stucco-san-antonio',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '500',
          highPrice: '15000',
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
    title: 'EIFS Contractor San Antonio, TX | Synthetic Stucco Repair',
    description:
      'EIFS and synthetic stucco specialists in San Antonio. Repair, moisture testing, coating restoration & remediation. Licensed & insured. Free inspections — call (210) 871-8490.',
    path: '/eifs-stucco-san-antonio',
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
            <li className="text-slate-800 font-medium">EIFS / Synthetic Stucco</li>
          </ol>

          <div className="inline-flex items-center gap-2 bg-sand-50 border border-sand-200 rounded-full px-4 py-1.5 mb-5">
            <Shield size={14} className="text-sand-700" />
            <span className="text-sm font-medium text-sand-700">EIFS Specialists — Not General Contractors</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-5">
            EIFS & Synthetic Stucco Contractor in San Antonio, TX
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
            EIFS (Exterior Insulation and Finish Systems) requires specialized knowledge that most stucco contractors do not have. Using traditional stucco repair methods on synthetic systems causes failures, traps moisture, and accelerates hidden damage. Our team has specific EIFS training and uses only system-compatible materials and techniques.
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
              Request a Free Inspection <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> EIFS-Specific Training</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Moisture Testing Available</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Licensed & Insured</div>
          </div>
        </div>
      </section>

      {/* Why EIFS Needs Specialists */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why EIFS Demands a Specialist in San Antonio</h2>
          <p className="text-slate-700 leading-relaxed text-lg mb-5">
            EIFS is fundamentally different from traditional stucco. Behind the acrylic finish coat is foam insulation board — not concrete, not lath, not sheathing. When moisture gets behind EIFS through a cracked coating, failed sealant joint, or improper repair, it saturates the foam and wicks laterally through the entire wall section. This moisture is invisible from the outside and can cause extensive wood rot, mold growth, and structural damage before any exterior signs appear.
          </p>
          <p className="text-slate-700 leading-relaxed text-lg mb-5">
            In San Antonio, EIFS faces accelerated challenges. Our intense UV exposure breaks down the acrylic finish coat faster than manufacturers predict for northern climates. Daily thermal cycling stresses sealant joints at windows, doors, and material transitions until they crack and separate. Gulf humidity drives moisture into every gap. Many homes built in the early 2000s throughout Stone Oak, The Dominion, and the north San Antonio corridor used EIFS for design flexibility — and those systems are now at the age where maintenance becomes critical.
          </p>
          <p className="text-slate-700 leading-relaxed text-lg">
            The most common mistake we see is EIFS repaired with traditional Portland cement stucco materials. These materials are incompatible — they do not bond properly to the foam or base coat, they crack under different thermal expansion rates, and they create new moisture entry points. Every EIFS repair must use system-specific materials: compatible base coats, matching reinforcing mesh, and elastomeric finish coatings that flex with the system.
          </p>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Signs Your EIFS System Needs Professional Attention</h2>
          <p className="text-slate-600 mb-8">If you notice any of these issues on your EIFS exterior, schedule an inspection before hidden damage progresses.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Cracking in the finish coat near corners, windows, or floor lines',
              'Darkening or discoloration that appears after rain and takes days to dry',
              'Soft or spongy feel when pressing on the surface — indicates saturated foam',
              'Visible gaps where EIFS meets windows, trim, or other materials',
              'Peeling or flaking finish coat from UV breakdown',
              'Algae or mold growth on north-facing walls',
              'Interior moisture stains or musty odors near exterior walls',
              'Previous repairs with incompatible materials already failing',
            ].map((sign) => (
              <div key={sign} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200">
                <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <span className="text-slate-700 text-sm">{sign}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our EIFS Services */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Our EIFS Services in San Antonio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'EIFS Repair & Patching', desc: 'Section repair with system-compatible materials. We remove damaged areas, replace foam and reinforcing, apply matching base and finish coats, and restore sealant joints.' },
              { title: 'Moisture Testing & Inspection', desc: 'Non-invasive and invasive moisture testing at windows, penetrations, and suspected intrusion points. We map the full extent of any moisture issue before recommending repairs.' },
              { title: 'Sealant Restoration', desc: 'Complete evaluation and replacement of all sealant joints at windows, doors, material transitions, and penetrations. Proper sealant maintenance prevents the majority of EIFS failures.' },
              { title: 'Coating Restoration', desc: 'Re-coating with UV-stable elastomeric finish systems that protect the base coat, restore appearance, and extend system life by a decade or more.' },
              { title: 'Full EIFS Remediation', desc: 'For systems with extensive moisture damage: complete removal, substrate repair, and rebuild with modern drainage EIFS or conversion to traditional stucco.' },
              { title: 'Maintenance Programs', desc: 'Annual inspection and preventive maintenance for EIFS properties. We check coatings, sealants, and moisture levels proactively to prevent costly surprise repairs.' },
            ].map((svc) => (
              <div key={svc.title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-800 mb-2">{svc.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{svc.desc}</p>
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
            <Link to="/stucco-contractor-san-antonio" className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all">
              <ArrowRight size={16} className="text-sand-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700">Stucco Contractor in San Antonio</span>
            </Link>
            <Link to="/commercial-stucco-san-antonio" className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all">
              <ArrowRight size={16} className="text-sand-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700">Commercial Stucco in San Antonio</span>
            </Link>
          </div>
          <p className="text-slate-600 text-sm mt-4">
            Read more about EIFS vs traditional stucco on our{' '}
            <Link to="/blog/eifs-vs-traditional-stucco-differences" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">detailed comparison guide</Link>.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection title="EIFS Repair Reviews from San Antonio Homeowners" filter="EIFS / Synthetic Stucco" />

      {/* FAQ */}
      <FAQSection faqs={faqs} title="EIFS & Synthetic Stucco FAQ — San Antonio" />

      {/* CTA */}
      <CTASection
        headline="Need an EIFS Specialist in San Antonio?"
        description="Free moisture testing and inspections for EIFS properties. We use system-compatible materials and methods — not generic stucco repairs that make EIFS problems worse."
      />
    </>
  );
}
