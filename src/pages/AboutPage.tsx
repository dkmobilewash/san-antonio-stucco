import { Link } from 'react-router-dom';
import { CheckCircle, Award, Users, Calendar, Shield, ArrowRight, MapPin } from 'lucide-react';
import CTASection from '../components/CTASection';
import TestimonialsSection from '../components/TestimonialsSection';
import { services } from '../data/services';
import { locations } from '../data/locations';
import { usePageSEO } from '../lib/seo';

const values = [
  { icon: Award, title: 'Quality First', description: 'Every project gets the same attention to detail whether it\'s a small repair or a full installation. We never cut corners on materials or technique.' },
  { icon: Users, title: 'Client Focused', description: 'Clear communication, honest assessments, and no-pressure estimates. We earn your trust through transparency and results.' },
  { icon: Calendar, title: 'Reliable & Punctual', description: 'We show up when we say we will, finish when we say we will, and keep you informed every step of the way.' },
  { icon: Shield, title: 'Built for Texas', description: 'Every system we install is engineered for our specific climate. We use materials and methods proven in San Antonio conditions.' },
];

export default function AboutPage() {
  usePageSEO({
    title: 'About San Antonio Stucco | 10+ Years Experience | Licensed & Insured Contractor',
    description: 'Locally owned stucco contractor in San Antonio with 10+ years experience. Expert installation, repair & replacement. Licensed & insured. Call us today!',
    path: '/about',
    rawTitle: true,
  });

  return (
    <>
      <section className="pt-32 md:pt-40 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                San Antonio's Trusted Stucco Experts
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                San Antonio Stucco was founded with a simple mission: deliver professional-grade stucco work that stands up to Texas weather and exceeds client expectations. We've built our reputation one project at a time through quality craftsmanship and honest service.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our team brings deep local expertise to every project. We understand how San Antonio's extreme heat, humidity, and UV exposure affect stucco systems differently than anywhere else. This knowledge — combined with access to <Link to="/blog/us-largest-plaster-producer-san-antonio" className="text-sand-600 hover:text-sand-700 underline underline-offset-2 transition-colors">America's world-leading plaster and gypsum supply</Link> — informs every material choice, technique, and recommendation we make.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sand-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-sand-700">500+</p>
                  <p className="text-sm text-slate-600">Projects Completed</p>
                </div>
                <div className="bg-sand-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-sand-700">10+</p>
                  <p className="text-sm text-slate-600">Years Experience</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/Stucco-team.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vU3R1Y2NvLXRlYW0ud2VicCIsImlhdCI6MTc3NzU4MjAwMSwiZXhwIjoxODA5MTE4MDAxfQ.EXGNHj8n8waB7LPDpXLLD8jpWeLPbeZi_t784J7Y3Vc"
                alt="Professional stucco work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 bg-sand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={28} className="text-sand-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">What Sets Us Apart</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              'Licensed, bonded, and insured for residential and commercial work',
              'Deep understanding of San Antonio climate and its effects on stucco',
              'Premium materials engineered for South Texas conditions',
              'Detailed written estimates with no hidden costs',
              'Clean, respectful crews who protect your property',
              'Responsive communication from first call to project completion',
              'Workmanship guarantee on every project',
              'Flexible scheduling to minimize disruption',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-200">
                <CheckCircle size={20} className="text-sage-600 shrink-0" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection title="What Our Clients Say" />

      {/* Services We Offer */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Our Professional Services</h2>
          <p className="text-slate-600 mb-6">
            From new installations to precision repairs, our team handles every aspect of stucco work for homes and businesses.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}`}
                className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all"
              >
                <ArrowRight size={16} className="text-sand-600 shrink-0" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700 transition-colors">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Where We Work</h2>
          <p className="text-slate-600 mb-6">
            We serve homeowners and businesses throughout the San Antonio metropolitan area and surrounding Hill Country communities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/${loc.slug}`}
                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-3 hover:shadow-sm transition-all"
              >
                <MapPin size={16} className="text-sand-600" />
                <span className="text-sm font-medium text-slate-700">{loc.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Ready to Work With San Antonio's Best?" />
    </>
  );
}
