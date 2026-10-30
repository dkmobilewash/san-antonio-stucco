import { Link } from 'react-router-dom';
import { Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { contact } from '../data/contact';
import { usePageSEO } from '../lib/seo';

export default function QuoteThanksPage() {
  usePageSEO({
    title: 'Thank You | San Antonio Stucco',
    description: 'Your estimate request has been received. We will contact you within one business day.',
    path: '/quote/thanks',
    rawTitle: true,
    noindex: true,
  });

  return (
    <section className="pt-32 md:pt-40 pb-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          We Got Your Request!
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          A member of our team will contact you within <strong>one business day</strong> to
          discuss your project and schedule a free on-site evaluation.
        </p>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left mb-8">
          <h2 className="font-semibold text-slate-800 mb-4">What Happens Next</h2>
          <ol className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <span className="bg-sand-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
              We review your project details and prepare questions
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-sand-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
              We call or text you to schedule a free on-site visit
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-sand-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
              We inspect the area, take measurements, and discuss options
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-sand-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
              You receive a detailed written estimate — no obligation, no pressure
            </li>
          </ol>
        </div>

        <div className="bg-sand-50 border border-sand-100 rounded-2xl p-6 mb-8">
          <p className="text-slate-700 font-medium mb-2">Need to talk sooner?</p>
          <a
            href={`tel:${contact.phoneRaw}`}
            className="text-sand-700 hover:text-sand-800 font-bold text-xl inline-flex items-center gap-2"
          >
            <Phone size={20} /> {contact.phone}
          </a>
          <p className="text-slate-500 text-sm mt-1">{contact.hours}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-sand-600 hover:bg-sand-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2"
          >
            Back to Home <ArrowRight size={16} />
          </Link>
          <Link
            to="/blog"
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2"
          >
            Read Our Stucco Guides
          </Link>
        </div>

        <p className="text-xs text-slate-400 mt-8">
          ★ 5.0 on Google · Licensed & insured · Own crew, no subs
        </p>
      </div>
    </section>
  );
}
