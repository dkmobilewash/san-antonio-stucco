import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { contact } from '../data/contact';
import { services } from '../data/services';
import { locations } from '../data/locations';
import EstimateForm from '../components/EstimateForm';
import { usePageSEO } from '../lib/seo';

export default function QuotePage() {
  usePageSEO({
    title: 'Free Stucco Estimate San Antonio | No-Obligation Quote | Fast Response',
    description: 'Request a free stucco estimate in San Antonio. No-obligation quotes for repair, installation & replacement. Licensed & insured. We respond within one business day!',
    path: '/quote',
    rawTitle: true,
  });

  return (
    <>
      <section className="pt-32 md:pt-40 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Get Your Free Stucco Estimate
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Tell us about your project and we'll provide a detailed, no-obligation estimate within one business day. No pressure, no surprises.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sand-50 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-sand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Call Us Directly</h3>
                    <a href={`tel:${contact.phoneRaw}`} className="text-sand-600 hover:text-sand-700 font-medium">
                      {contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sand-50 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-sand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Email Us</h3>
                    <a href={`mailto:${contact.email}`} className="text-sand-600 hover:text-sand-700 font-medium">
                      {contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sand-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-sand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Service Area</h3>
                    <p className="text-slate-600">{contact.areas}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sand-50 rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-sand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Hours</h3>
                    <p className="text-slate-600">{contact.hours}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-3">What to Expect</h3>
                <ol className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="bg-sand-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    Submit your request with project details
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-sand-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    We'll contact you within one business day
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-sand-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                    Schedule a free on-site evaluation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-sand-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
                    Receive a detailed written estimate
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <EstimateForm />
            </div>
          </div>
        </div>
      </section>

      {/* Services Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Not Sure Which Service You Need?</h2>
          <p className="text-slate-600 mb-6">
            Browse our services to learn more about what we offer. We are happy to help you determine the right solution during your free consultation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}`}
                className="group flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-sand-300 rounded-xl p-4 hover:shadow-sm transition-all"
              >
                <ArrowRight size={16} className="text-sand-600 shrink-0" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-sand-700 transition-colors">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">We Serve Your Area</h2>
          <p className="text-slate-600 mb-6">
            We provide free on-site estimates throughout the greater San Antonio area, including these communities:
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
    </>
  );
}
