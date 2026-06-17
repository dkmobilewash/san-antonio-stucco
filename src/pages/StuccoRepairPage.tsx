import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Wrench, Droplets, Paintbrush, ShieldCheck, CheckCircle, AlertTriangle } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import { usePageSEO } from '../lib/seo';

const faqs = [
  {
    question: 'How much does stucco repair cost in San Antonio?',
    answer:
      'Most stucco repairs in San Antonio range from $300 to $1,500 for localized work such as hairline crack patching, small holes, or texture matching on a single wall. Mid-sized repairs that involve removing damaged sections, replacing lath or moisture barrier, and re-finishing a larger area typically run $1,500 to $4,500. Major water damage repairs that include substrate replacement can climb to $5,000 or more depending on square footage and the extent of hidden damage. We always inspect the affected area in person before quoting because surface symptoms rarely tell the full story. Every estimate is itemized, written, and free of obligation.',
  },
  {
    question: 'How long does stucco repair take?',
    answer:
      'Small cosmetic repairs such as hairline crack sealing or filling a few small holes are usually completed in a single day. Mid-sized repairs that involve patching, re-texturing, and color matching typically take two to four days because each coat needs to cure properly before the next is applied. Larger water damage repairs that require removing damaged stucco, drying the substrate, replacing lath and paper, and reapplying three coats of stucco can take one to two weeks. San Antonio humidity and temperatures affect curing, so we plan around the weather to avoid premature failures.',
  },
  {
    question: 'Can stucco be repaired or does it need to be replaced?',
    answer:
      'Most stucco can be repaired. Replacement is only necessary when damage is widespread across multiple walls, when the substrate or sheathing has rotted, or when the original stucco system was installed without proper moisture management. Localized cracks, holes, blistering, and even moderate water damage can almost always be repaired by removing the affected area, addressing the root cause, and rebuilding the system in place. We always recommend repair first when it is the right call — we will only suggest replacement when repair would be more expensive long-term or when the underlying system has failed.',
  },
  {
    question: 'What causes stucco to crack?',
    answer:
      'San Antonio stucco cracks for several reasons. Thermal expansion is the most common cause: our temperature swings between cool nights and triple-digit days force stucco to expand and contract daily, creating hairline cracks over time. Foundation movement on our expansive clay soils stresses walls and produces stair-step cracks near windows and corners. Improper installation — missing expansion joints, insufficient curing time, or thin coats — leads to early cracking even on new homes. Impact damage, water intrusion behind the surface, and heavy vibration from nearby construction can also crack stucco. Identifying the cause matters because repairs that ignore the underlying issue will fail again.',
  },
  {
    question: 'Do you offer free stucco repair estimates in San Antonio?',
    answer:
      'Yes. Every stucco repair estimate in San Antonio is free, on-site, and no-obligation. We come to your property, inspect the damaged area in person, check for hidden moisture or substrate issues, and walk you through what we find before we quote a price. You receive a written estimate with a clear scope of work, timeline, and itemized cost. There is no charge to schedule the visit and no pressure to move forward. Call (210) 871-8490 to set up an inspection — most homeowners get on the schedule within a few days.',
  },
];

export default function StuccoRepairPage() {
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    }),
    [],
  );

  usePageSEO({
    title: 'Stucco Repair San Antonio | Crack & Water Damage Experts',
    description:
      'Professional stucco repair in San Antonio. We fix cracks, water damage, holes & more. Fast, affordable, and backed by years of local experience. Free estimates.',
    path: '/stucco-repair',
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
            <li className="text-slate-800 font-medium">Stucco Repair</li>
          </ol>

          <div className="inline-flex items-center gap-2 bg-sand-50 border border-sand-200 rounded-full px-4 py-1.5 mb-5">
            <Wrench size={14} className="text-sand-700" />
            <span className="text-sm font-medium text-sand-700">San Antonio Stucco Repair Specialists</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-5">
            Stucco Repair in San Antonio
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Cracks, water damage, holes, and texture mismatches handled by a local crew that knows San Antonio stucco systems. Fast, honest pricing and craftsmanship that lasts. Free, no-pressure estimates throughout the metro area.
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
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Same-day inspections</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Licensed & Insured</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-sand-600" /> Workmanship guarantee</div>
          </div>
        </div>
      </section>

      {/* Intro Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-slate-700 leading-relaxed text-lg mb-5">
            Stucco is built to last decades in San Antonio, but the combination of triple-digit summers, expansive clay soils, and Gulf humidity eventually takes a toll. The good news is that almost every stucco problem we see — hairline cracks, hollow patches, water staining, missing chunks — can be repaired without tearing off the entire system. The key is catching it early and addressing the root cause, not just the surface symptom.
          </p>
          <p className="text-slate-700 leading-relaxed text-lg">
            Our crew has been repairing stucco across San Antonio, Schertz, Boerne, Helotes, and New Braunfels for years. We diagnose what is actually happening behind the wall, repair it correctly, and match the existing texture and color so the patch disappears. If your stucco needs work, we would rather repair it than sell you a replacement you do not need.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <div className="w-14 h-14 bg-sand-50 border border-sand-200 rounded-2xl flex items-center justify-center mb-4">
                <AlertTriangle size={26} className="text-sand-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Stucco Crack Repair</h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-slate-700 leading-relaxed mb-4">
                Cracks are the most common stucco issue in San Antonio. Hairline cracks under 1/16" are often cosmetic and can be sealed with a flexible elastomeric crack filler before being re-textured and re-painted. Wider cracks, stair-step patterns near windows, or cracks that grow over time signal movement in the substrate or foundation, and require a deeper repair that addresses the root cause.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Our crack repair process starts with a full inspection: we look for related signs of moisture intrusion, check expansion joints, and evaluate whether the cracking is structural or environmental. We then chase out the crack to a clean edge, apply a bonding agent, fill with the correct material for the crack width, and finish with a texture and color match that blends into the surrounding wall. Done right, the repair is invisible and durable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <div className="w-14 h-14 bg-sand-50 border border-sand-200 rounded-2xl flex items-center justify-center mb-4">
                <Droplets size={26} className="text-sand-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Water Damage Repair</h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-slate-700 leading-relaxed mb-4">
                Water damage is the most serious threat to a stucco system in our climate. Once moisture gets behind the finish coat — through unsealed penetrations, cracked caulk, failed flashings, or surface damage — it has nowhere to go. The substrate begins to rot, the lath rusts, and the stucco eventually delaminates from the wall. By the time you see staining or bubbling on the surface, the damage behind the wall is usually much larger.
              </p>
              <p className="text-slate-700 leading-relaxed">
                We approach water damage repairs methodically. We map the affected area, remove damaged stucco back to sound material, inspect and replace any compromised sheathing, paper, or lath, and rebuild the three-coat system from scratch. We also identify and fix the source of water entry — there is no point repairing water damage if the leak is still active. Most repairs include new flashings, fresh sealants at penetrations, and a corrected weep system at the base of the wall.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <div className="w-14 h-14 bg-sand-50 border border-sand-200 rounded-2xl flex items-center justify-center mb-4">
                <Paintbrush size={26} className="text-sand-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Patching & Texture Matching</h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-slate-700 leading-relaxed mb-4">
                A good patch is one you cannot see. Most repair complaints we hear from homeowners are not about whether the hole was filled, but about whether the patch matches the rest of the wall. Stucco textures are unique to each home, often hand-applied by the original crew, and matching them takes a trained eye and the right tools. Sand floats, lace patterns, skip trowel, and Santa Barbara smooth finishes all require different techniques.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Before we patch, we study the existing texture in detail and mock up samples to confirm the match. We use the same finish materials, application methods, and tools that produced the original texture. Color matching follows the same approach — we evaluate sheen, hue, and weathering, and tint the finish coat to blend with the aged surrounding wall rather than the original color chart. The result is a repair that disappears into the wall.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <div className="w-14 h-14 bg-sand-50 border border-sand-200 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck size={26} className="text-sand-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Preventative Maintenance</h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-slate-700 leading-relaxed mb-4">
                Most expensive stucco repairs start as small problems that were ignored. A reasonable maintenance routine prevents that. Once a year, walk your home's perimeter and look for new cracks, soft spots, or staining. Inspect every caulked joint at windows, doors, and utility penetrations and replace any caulk that is cracking or pulling away. Keep landscaping pulled back from the wall by at least 12 inches and make sure sprinklers are not spraying directly onto stucco.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Every three to five years, consider a professional inspection and a fresh coat of breathable masonry sealer. We offer maintenance visits for homeowners who want a trained eye on their stucco annually — we catch the small issues, reseal what needs resealing, and keep a record so problems can be tracked over time. It is the single best investment you can make in long-term stucco performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why San Antonio Homeowners Trust Our Repairs</h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-3xl">
            We have been repairing stucco across the San Antonio metro for years. Our work is local, in-house, and backed by a written workmanship guarantee. Browse our full range of <Link to="/services" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">stucco services</Link> or read more about our process on the <Link to="/" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">San Antonio Stucco homepage</Link>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-800 mb-2">Honest Diagnosis</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We tell you what we find, even when it is less than what you expected to spend. Repair when repair is right; replacement only when it is necessary.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-800 mb-2">Texture Specialists</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Our crews are trained in every common San Antonio finish — lace, dash, sand float, skip trowel, and smooth — so patches blend seamlessly.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-800 mb-2">Workmanship Guarantee</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Every repair is backed by our written guarantee. If something goes wrong with our work, we come back and make it right at no additional cost.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} title="Stucco Repair FAQ" />

      {/* Bottom CTA */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Stucco Repair in San Antonio?</h2>
          <p className="text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Get a free, on-site inspection and a clear written estimate. No pressure, no hidden fees, just an honest assessment from a local crew that has been doing this for years.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+12108718490"
              className="bg-sand-600 hover:bg-sand-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-sand-600/30"
            >
              <Phone size={20} /> Call (210) 871-8490
            </a>
            <Link
              to="/quote"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Get a Free Estimate <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
