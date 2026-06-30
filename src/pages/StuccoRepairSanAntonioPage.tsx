import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle, AlertTriangle, Droplets, Shield, Wrench } from 'lucide-react';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import { usePageSEO } from '../lib/seo';

const faqs = [
  {
    question: 'How much does stucco repair cost in San Antonio?',
    answer:
      'Stucco repair costs in San Antonio depend on damage type and extent. Hairline crack sealing and cosmetic patching typically costs $300 to $800. Mid-range repairs involving section removal, lath repair, and re-texturing run $1,000 to $3,500. Extensive water damage repairs with substrate replacement can reach $5,000 or more. We provide free on-site estimates with itemized pricing so you know exactly what you are paying for.',
  },
  {
    question: 'How do I know if my stucco needs repair or replacement?',
    answer:
      'If damage is localized to specific areas — a crack at a window corner, a patch of delamination, staining on one wall — repair is almost always the right call. Replacement becomes necessary when damage covers more than 30 percent of a wall section, when the substrate behind the stucco is rotted, or when you have had multiple failed repair attempts in the same area. We always recommend repair when it will solve the problem permanently.',
  },
  {
    question: 'What causes stucco to crack in San Antonio?',
    answer:
      'The primary causes are thermal cycling from extreme heat (daily expansion and contraction), foundation movement on San Antonio expansive clay soils, missing or inadequate expansion joints, impact damage, and moisture intrusion behind the surface. Each cause requires a different repair approach, which is why root-cause diagnosis is the first step in every repair we perform.',
  },
  {
    question: 'Do you offer free stucco repair estimates in San Antonio?',
    answer:
      'Yes. Every estimate is free, on-site, and no-obligation. We inspect the damage, check for hidden moisture or substrate issues, and provide a written estimate with clear scope, timeline, and cost. Call (210) 871-8490 to schedule — most inspections are booked within a few days.',
  },
];

export default function StuccoRepairSanAntonioPage() {
  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Stucco Repair in San Antonio, TX',
        description: 'Professional stucco repair in San Antonio for cracks, water damage, delamination, and texture matching. Root-cause diagnosis and permanent repairs by licensed contractors.',
        provider: { '@id': 'https://sanantoniostucco.com/#business' },
        areaServed: [
          { '@type': 'City', name: 'San Antonio' },
          { '@type': 'City', name: 'Boerne' },
          { '@type': 'City', name: 'New Braunfels' },
          { '@type': 'City', name: 'Schertz' },
          { '@type': 'City', name: 'Helotes' },
        ],
        serviceType: 'Stucco Repair',
        url: 'https://sanantoniostucco.com/stucco-repair-san-antonio',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '300',
          highPrice: '5000',
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
    title: 'Stucco Repair San Antonio, TX | Cracks, Water Damage & More',
    description:
      'Expert stucco repair in San Antonio — cracks, water damage, delamination & texture matching. Licensed & insured. Root-cause diagnosis. Free estimates — call (210) 871-8490.',
    path: '/stucco-repair-san-antonio',
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
            <li className="text-slate-800 font-medium">Stucco Repair</li>
          </ol>

          <div className="inline-flex items-center gap-2 bg-sand-50 border border-sand-200 rounded-full px-4 py-1.5 mb-5">
            <Wrench size={14} className="text-sand-700" />
            <span className="text-sm font-medium text-sand-700">San Antonio Stucco Repair Specialists</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-5">
            Professional Stucco Repair in San Antonio, TX
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Cracks, water stains, delamination, and holes do not fix themselves — and in San Antonio's climate, they get worse fast. Our repair crew diagnoses the root cause, fixes the damage with compatible materials, and matches your existing texture so the repair disappears into the wall.
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
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Same-Day Inspections</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Licensed & Insured</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Workmanship Guarantee</div>
          </div>
        </div>
      </section>

      {/* What We Repair */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Common Stucco Damage We Repair in San Antonio</h2>
          <p className="text-slate-700 leading-relaxed text-lg mb-8">
            San Antonio homes face a punishing combination of triple-digit summers, Gulf humidity, expansive clay soils, and intense UV exposure. Each of these stressors produces specific types of stucco damage — and each requires a targeted repair approach. Here is what we see most often and how we fix it.
          </p>

          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1">
                <div className="w-14 h-14 bg-sand-50 border border-sand-200 rounded-2xl flex items-center justify-center mb-3">
                  <AlertTriangle size={26} className="text-sand-700" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Crack Repair</h3>
              </div>
              <div className="lg:col-span-2">
                <p className="text-slate-700 leading-relaxed mb-3">
                  Cracks are the most common issue we address. Hairline cracks under 1/16 inch are typically cosmetic and caused by normal thermal cycling — we seal them with flexible filler, re-texture, and blend the color. Wider cracks, stair-step patterns at window corners, or cracks that reappear after previous repairs signal deeper issues: foundation movement, missing expansion joints, or substrate failure. Our process starts with diagnosis so the repair addresses the cause, not just the symptom.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  We chase out each crack to a clean edge, apply appropriate bonding agents, fill with materials matched to the crack width, and finish with texture and color matching that makes the repair invisible. For recurring cracks, we install expansion joints at the stress point to accommodate future movement.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1">
                <div className="w-14 h-14 bg-sand-50 border border-sand-200 rounded-2xl flex items-center justify-center mb-3">
                  <Droplets size={26} className="text-sand-700" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Water Damage & Moisture Intrusion</h3>
              </div>
              <div className="lg:col-span-2">
                <p className="text-slate-700 leading-relaxed mb-3">
                  Water behind stucco is the most destructive problem we see. Moisture enters through failed sealant at windows and doors, cracks in the finish coat, missing flashings, or deteriorated weep screeds at the base of walls. Once trapped between stucco and sheathing, water rots wood framing, grows mold, and corrodes lath — damage that compounds invisibly until the stucco bulges, stains, or falls off in sheets.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  We remove damaged stucco back to sound material, inspect and replace compromised sheathing and lath, install proper moisture barriers, and rebuild the system from scratch. Every water damage repair includes identifying and fixing the entry point. If you notice dark stains after rain, bubbling or soft spots, or interior moisture near exterior walls, call us before the damage spreads further.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Repair vs Replace */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Repair vs. Full Restucco — When Each Makes Sense</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2"><Wrench size={18} className="text-sand-600" /> Repair Is Right When:</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                {[
                  'Damage is localized to specific areas, not covering entire walls',
                  'Cracks are isolated at stress points like windows and corners',
                  'The substrate behind the stucco is still sound and dry',
                  'Previous repairs have not been attempted or failed',
                  'The stucco system was originally installed correctly',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-sage-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2"><Shield size={18} className="text-sand-600" /> Replacement Is Better When:</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                {[
                  'Damage covers more than 30% of a wall section',
                  'Substrate has rotted, with mold or structural compromise',
                  'Multiple previous repairs have failed in the same areas',
                  'The original stucco was installed without moisture barriers',
                  'Ongoing moisture problems persist despite surface repairs',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-slate-600 text-sm mt-6">
            Not sure which you need? We always recommend repair first when it will solve the problem. Read more about{' '}
            <Link to="/stucco-replacement" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">stucco replacement in San Antonio</Link>{' '}
            or browse our full{' '}
            <Link to="/stucco-contractor-san-antonio" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">stucco contractor services</Link>.
          </p>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Related Stucco Services in San Antonio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/stucco-installation-san-antonio" className="group flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all">
              <ArrowRight size={16} className="text-sand-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700">Stucco Installation in San Antonio</span>
            </Link>
            <Link to="/eifs-stucco-san-antonio" className="group flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all">
              <ArrowRight size={16} className="text-sand-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700">EIFS & Synthetic Stucco in San Antonio</span>
            </Link>
            <Link to="/stucco-painting" className="group flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all">
              <ArrowRight size={16} className="text-sand-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700">Stucco Painting in San Antonio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Stucco Repair Across the San Antonio Metro</h2>
          <p className="text-slate-600 mb-6">We provide same-day stucco repair inspections throughout San Antonio, Boerne, New Braunfels, Schertz, Helotes, Stone Oak, Alamo Heights, and all surrounding communities.</p>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.994375077717!2d-98.60352572461008!3d29.55745084148031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c67a869354b99%3A0xd5967b37c4e80644!2sSan%20Antonio%20Stucco!5e1!3m2!1sen!2sus!4v1778172234111!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="San Antonio Stucco repair service area"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection title="What San Antonio Homeowners Say About Our Repairs" filter="Stucco Repairs" />

      {/* FAQ */}
      <FAQSection faqs={faqs} title="Stucco Repair FAQ — San Antonio" />

      {/* CTA */}
      <CTASection
        headline="Need Stucco Repair in San Antonio?"
        description="Free on-site inspections, honest assessments, and written estimates. Licensed, insured, and locally owned. Call today or request an estimate online."
      />
    </>
  );
}
