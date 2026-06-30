import { Link } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle, MapPin, Sun, Droplets, ThermometerSun, Shield, Star, DollarSign } from 'lucide-react';
import { services } from '../data/services';
import { locations } from '../data/locations';
import { contact } from '../data/contact';
import EstimateForm from '../components/EstimateForm';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import SEO from '../components/SEO';

const serviceImages: Record<string, string> = {
  'stucco-installation': 'https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/stucco-top-coat-san-antonio.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vc3R1Y2NvLXRvcC1jb2F0LXNhbi1hbnRvbmlvLmpwZyIsImlhdCI6MTc3NzU4MDczMiwiZXhwIjoxODA5MTE2NzMyfQ.c04kWDbJUcyX5-3_Ws_aeH9BuveIvzjTDX2zhlrM2xA',
  'stucco-replacement': 'https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/stucco-replacement-san-antonio.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vc3R1Y2NvLXJlcGxhY2VtZW50LXNhbi1hbnRvbmlvLmpwZyIsImlhdCI6MTc3NzU4MDgxOSwiZXhwIjoxODA5MTE2ODE5fQ.uo6Gz1bu6exda7KdKjmgOkkt-iSb_01NiOa6njyu0Yk',
  'residential-stucco': 'https://2.bp.blogspot.com/-bT2IY1wPeTE/Ul4lKrFF0hI/AAAAAAABD90/QdvEse4oRZw/s1600/a24.jpg',
  'commercial-stucco': 'https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/commercial-stucco-san-antonio.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vY29tbWVyY2lhbC1zdHVjY28tc2FuLWFudG9uaW8ud2VicCIsImlhdCI6MTc3NzU4MTEwOCwiZXhwIjoxODA5MTE3MTA4fQ.O-WjyrRMCcrXTBRTap4fyt0IgxjRtQDag8jIVq_a0uo',
  'stucco-remodeling': 'https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/commercial-stucco-san-antonio.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vY29tbWVyY2lhbC1zdHVjY28tc2FuLWFudG9uaW8ud2VicCIsImlhdCI6MTc3NzU4MTEwOCwiZXhwIjoxODA5MTE3MTA4fQ.O-WjyrRMCcrXTBRTap4fyt0IgxjRtQDag8jIVq_a0uo',
  'stucco-repairs': 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800',
  'eifs-synthetic-stucco': 'https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/eifs-stucco-san-antonio.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vZWlmcy1zdHVjY28tc2FuLWFudG9uaW8uanBlZyIsImlhdCI6MTc3NzU4MTI2MywiZXhwIjoxODA5MTE3MjYzfQ.xirvbH_TuTaJluEwjdKO5OUM0wFDj5wBo6YzJSyIElw',
};

const homeFAQs = [
  { question: 'How much does stucco cost in San Antonio?', answer: 'Stucco installation in San Antonio typically costs $8-$15 per square foot for a complete three-coat system. Repairs start at $300-$1,500 depending on scope. We provide free, detailed estimates after an on-site evaluation.' },
  { question: 'How long does stucco installation take?', answer: 'Most residential installations take 7-14 business days. Repairs take 1-3 days. Each coat requires proper curing time between applications. We provide clear timelines before work begins.' },
  { question: 'Do you offer warranties on stucco work?', answer: 'Yes. All our work is backed by a workmanship guarantee. We stand behind every project and address any issues that arise from our installation or repair work at no additional cost.' },
  { question: 'What areas do you serve besides San Antonio?', answer: 'We serve the entire San Antonio metro including Boerne, New Braunfels, Schertz, Helotes, Stone Oak, Alamo Heights, Live Oak, Universal City, Leon Valley, and Selma.' },
  { question: 'How do I know if my stucco needs repair?', answer: 'Common signs include visible cracks, bubbling or bulging areas, discoloration, moisture stains inside walls, and sections that sound hollow when tapped. We offer free inspections for all San Antonio homeowners.' },
  { question: 'How do I find a good stucco contractor near me?', answer: 'Look for a licensed and insured contractor with local experience, verifiable reviews, and knowledge of your area climate. San Antonio Stucco serves the entire metro area including Boerne, New Braunfels, Schertz, Helotes, and Stone Oak. Call (210) 871-8490 for a free on-site estimate.' },
  { question: 'Where can I find stucco repair near me in San Antonio?', answer: 'San Antonio Stucco provides stucco repair throughout the San Antonio metro area with same-day inspections available. We serve all neighborhoods from Alamo Heights to the Westside, plus surrounding cities like Boerne, Schertz, and New Braunfels. Call us or submit a free estimate request online.' },
];

export default function HomePage() {
  return (
    <>
      <SEO
        title="Stucco Contractor in San Antonio, TX | Repair, Installation & EIFS"
        description="Looking for a stucco contractor near me in San Antonio? Trusted stucco repair, installation & EIFS services for residential & commercial projects. Licensed & insured. Free estimates — call today."
        keywords="stucco repair near me, stucco contractors near me, stucco companies near me, stucco contractor near me, san antonio stucco contractor, stucco repair san antonio, stucco installation san antonio, stucco schertz, stucco boerne, stucco helotes, stucco new braunfels, free stucco estimates"
      />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center pt-24 md:pt-28 pb-8 overflow-hidden">
        <img
          src="https://static.wixstatic.com/media/9d320c_cbbc36ac2d784c3c9b6fb42e5703bbe0~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9d320c_cbbc36ac2d784c3c9b6fb42e5703bbe0~mv2.jpg"
          alt="Professional stucco installation on a San Antonio home exterior"
          width={1200}
          height={800}
          fetchPriority="high"
          decoding="sync"
          className="hero-bg"
        />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="relative w-full max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm">
            <MapPin size={14} className="text-sand-300" />
            <span className="text-sm font-medium text-white">Serving San Antonio & Surrounding Areas</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            San Antonio's Trusted{' '}
            <span className="text-sand-300">Stucco Contractor</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed mb-7 max-w-2xl mx-auto">
            Expert stucco repair, installation & finishing. Serving San Antonio & surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-xl mx-auto">
            <a
              href="tel:+12108718490"
              className="bg-sand-600 hover:bg-sand-700 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-sand-600/30"
            >
              <Phone size={20} /> Call for a Free Estimate
            </a>
            <a
              href="#estimate"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-colors inline-flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Get a Free Quote <ArrowRight size={18} />
            </a>
          </div>
          <a
            href="tel:+12108718490"
            className="block mt-4 text-white text-lg sm:text-xl font-semibold tracking-wide hover:text-sand-300 transition-colors"
          >
            (210) 871-8490
          </a>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-200">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-sand-300" />
              Licensed & Insured
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-sand-300" />
              5-Star Rated
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-sand-300" />
              Free Estimates
            </div>
          </div>
        </div>
      </section>

      {/* Estimate Form Section */}
      <section id="estimate" className="py-16 bg-slate-50 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Request a Free Estimate
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Tell us about your project and we'll get back to you the same day with a detailed, no-obligation quote.
            </p>
          </div>
          <EstimateForm />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Looking for a Stucco Contractor Near Me in San Antonio?
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            When you search for stucco companies near me, you want a local contractor who knows the climate and shows up on time. We combine deep San Antonio knowledge with professional-grade craftsmanship to deliver stucco systems that look beautiful and perform for decades.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-sand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-sand-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-3 text-lg">Licensed & Insured</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Fully licensed, bonded, and insured for residential and commercial stucco work throughout Bexar County. Your home and investment are protected from day one.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-sand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} className="text-sand-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-3 text-lg">Local Crew, No Subcontractors</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our own trained crews do every project. No subcontractors, no middlemen. Born and raised in San Antonio, we understand what Texas climate demands from stucco systems.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-sand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star size={28} className="text-sand-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-3 text-lg">Professional Results</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Over 500 completed projects with a 4.9-star average. From <Link to="/stucco-installation-san-antonio" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">stucco installation in San Antonio</Link> to <Link to="/stucco-repair-san-antonio" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">stucco repair in San Antonio</Link>, quality is never compromised.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, index) => (
        <section
          key={service.slug}
          className={`py-20 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={serviceImages[service.slug]}
                  alt={`${service.name} in San Antonio, TX — professional crew applying stucco finish`}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={384}
                  className="w-full h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className={index % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                  {service.name} in San Antonio
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.heroDescription}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.benefits.slice(0, 3).map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-sand-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/${service.slug}`}
                  className="inline-flex items-center gap-2 bg-sand-600 hover:bg-sand-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm"
                >
                  {service.name} in San Antonio <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Packages & Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Stucco Cost in San Antonio — What to Expect
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Transparent stucco cost in San Antonio with no hidden fees. Here are real-world stucco service costs so you can budget with confidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <div className="w-12 h-12 bg-sand-50 rounded-xl flex items-center justify-center mb-4">
                <DollarSign size={24} className="text-sand-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">Stucco Repairs</h3>
              <p className="text-2xl font-bold text-sand-700 mb-3">$300 – $5,000</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> Crack and damage diagnosis</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> Root-cause repair approach</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> Seamless texture matching</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> 1-3 day typical completion</li>
              </ul>
            </div>
            <div className="bg-slate-50 border-2 border-sand-400 rounded-2xl p-8 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
              <div className="w-12 h-12 bg-sand-50 rounded-xl flex items-center justify-center mb-4">
                <DollarSign size={24} className="text-sand-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">Stucco Installation</h3>
              <p className="text-2xl font-bold text-sand-700 mb-3">$8 – $15/sqft</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> Full three-coat system</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> Moisture barriers included</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> Custom texture & color choice</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> 7-14 day typical timeline</li>
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <div className="w-12 h-12 bg-sand-50 rounded-xl flex items-center justify-center mb-4">
                <DollarSign size={24} className="text-sand-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">Stucco Replacement</h3>
              <p className="text-2xl font-bold text-sand-700 mb-3">$10 – $18/sqft</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> Complete system removal</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> Substrate inspection & repair</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> Modern moisture management</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-sand-600 mt-0.5 shrink-0" /> 2-4 week typical timeline</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-slate-500 mt-8">
            Stucco cost in San Antonio varies by project scope, wall condition, and accessibility. We provide free, no-obligation estimates with detailed line items.
          </p>
          <div className="text-center mt-6">
            <Link to="/quote" className="bg-sand-600 hover:bg-sand-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors inline-flex items-center gap-2">
              Get Your Free Estimate <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why San Antonio Customers Choose Us */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why San Antonio Homeowners Trust Us for Stucco
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-slate-300 leading-relaxed">
            <p>
              San Antonio sits at the crossroads of extreme environmental conditions that make it one of the most demanding markets for exterior building materials in the United States. Summer temperatures regularly exceed 100 degrees, causing intense thermal cycling that expands and contracts stucco walls daily. Gulf Coast humidity averaging 60-70% drives moisture into every crack and joint, while South Texas UV exposure — among the highest in the country — degrades coatings faster than anywhere else in the state.
            </p>
            <p>
              These conditions demand a local stucco contractor who understands the science behind proper installation. Our most-requested service, <Link to="/stucco-repair-san-antonio" className="text-sand-300 hover:text-sand-200 underline underline-offset-2">stucco repair in San Antonio</Link>, addresses the damage caused by these environmental stressors with root-cause diagnosis and permanent solutions.
            </p>
            <p>
              We also provide <Link to="/boerne" className="text-sand-300 hover:text-sand-200 underline underline-offset-2">stucco in Boerne</Link> and throughout the Hill Country corridor where elevation and rocky terrain add additional challenges. As the leading stucco company in San Antonio, TX, our crews work across the entire metro daily.
            </p>
            <p>
              Every project is backed by our Licensed & Insured guarantee and completed by our own local crew — no subcontractors. Whether you live in an HOA community, a historic neighborhood, or a new development, San Antonio Stucco delivers the same standard of excellence.
            </p>
          </div>
          <div className="text-center mt-10">
            <Link
              to="/blog/us-largest-plaster-producer-san-antonio"
              className="text-sand-300 hover:text-sand-200 font-medium inline-flex items-center gap-1.5 transition-colors underline underline-offset-2"
            >
              Learn why the US is the world's leading plaster producer and what that means for your home <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Climate Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Texas Climate Is Tough on Stucco
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            San Antonio's extreme conditions create unique challenges that require an experienced, local stucco contractor to solve properly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-slate-50 rounded-2xl">
              <ThermometerSun size={40} className="mx-auto text-sand-600 mb-4" />
              <h3 className="font-bold text-slate-800 text-lg mb-2">Extreme Heat</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Temperatures above 100F cause thermal expansion that cracks improperly installed stucco. Our systems accommodate movement with properly placed expansion joints.
              </p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-2xl">
              <Droplets size={40} className="mx-auto text-sand-600 mb-4" />
              <h3 className="font-bold text-slate-800 text-lg mb-2">High Humidity</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gulf moisture tests every seal and joint. Proper drainage planes and moisture barriers are essential — and often missing in older San Antonio installations.
              </p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-2xl">
              <Sun size={40} className="mx-auto text-sand-600 mb-4" />
              <h3 className="font-bold text-slate-800 text-lg mb-2">UV Exposure</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Intense sunlight degrades coatings and accelerates aging. We use UV-resistant materials specifically rated for South Texas conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Service Areas */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Stucco Throughout the San Antonio Metro
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            On-site service available throughout San Antonio, <Link to="/boerne" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">Boerne</Link>, <Link to="/new-braunfels" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">New Braunfels</Link>, <Link to="/schertz" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">Schertz</Link>, <Link to="/helotes" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">Helotes</Link>, <Link to="/stone-oak" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">Stone Oak</Link>, and <Link to="/alamo-heights" className="text-sand-600 hover:text-sand-700 underline underline-offset-2">Alamo Heights</Link>.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/${loc.slug}`}
                className="group bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 text-center hover:shadow-md transition-all"
              >
                <MapPin size={20} className="mx-auto text-slate-400 group-hover:text-sand-600 transition-colors mb-2" />
                <span className="font-medium text-slate-700 group-hover:text-sand-700 transition-colors text-sm">
                  {loc.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.994375077717!2d-98.60352572461008!3d29.55745084148031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c67a869354b99%3A0xd5967b37c4e80644!2sSan%20Antonio%20Stucco!5e1!3m2!1sen!2sus!4v1778172234111!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="San Antonio Stucco main location in San Antonio, TX"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55200!2d-98.75!3d29.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c42842ac65b5f%3A0xbde5e384c88eae67!2sBoerne%2C%20TX!5e0!3m2!1sen!2sus!4v1678172234111!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="San Antonio Stucco service area — Boerne, TX"
              />
            </div>
          </div>
          <div className="text-center mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link
              to="/service-areas"
              className="text-sand-600 hover:text-sand-700 font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              View All Service Areas <ArrowRight size={16} />
            </Link>
            <Link
              to="/stucco-contractor-san-antonio"
              className="text-sand-600 hover:text-sand-700 font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              Stucco Contractor in San Antonio <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={homeFAQs} />

      {/* Final CTA */}
      <section className="py-20 bg-sand-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Stucco in San Antonio?
          </h2>
          <p className="text-sand-100 text-lg mb-8 max-w-2xl mx-auto">
            Licensed & Insured. Local crew, no subcontractors. Serving San Antonio, Boerne, New Braunfels, and all surrounding communities. Free estimates with no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="bg-white hover:bg-slate-50 text-sand-700 px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Get Free Quote <ArrowRight size={18} />
            </Link>
            <a
              href={`tel:${contact.phoneRaw}`}
              className="bg-sand-700 hover:bg-sand-800 text-white border border-sand-500 px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone size={18} /> Call {contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
