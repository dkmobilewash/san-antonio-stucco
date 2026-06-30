import { Link } from 'react-router-dom';
import { Home, Wrench, BookOpen, ArrowRight } from 'lucide-react';
import { usePageSEO } from '../lib/seo';

export default function NotFoundPage() {
  usePageSEO({
    title: 'Page Not Found | San Antonio Stucco',
    description: 'The page you are looking for could not be found. Browse our stucco services, read our blog, or request a free estimate in San Antonio.',
    path: '/404',
    rawTitle: true,
  });

  return (
    <section className="pt-32 md:pt-40 pb-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-7xl font-bold text-sand-600 mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-slate-600 mb-10">
          Sorry, the page you're looking for doesn't exist or has been moved. Let us help you find what you need.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <Link
            to="/"
            className="group flex flex-col items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-sand-50 rounded-xl flex items-center justify-center group-hover:bg-sand-100 transition-colors">
              <Home size={24} className="text-sand-600" />
            </div>
            <span className="font-semibold text-slate-800">Home</span>
          </Link>
          <Link
            to="/services"
            className="group flex flex-col items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-sand-50 rounded-xl flex items-center justify-center group-hover:bg-sand-100 transition-colors">
              <Wrench size={24} className="text-sand-600" />
            </div>
            <span className="font-semibold text-slate-800">Services</span>
          </Link>
          <Link
            to="/blog"
            className="group flex flex-col items-center gap-3 bg-white border border-slate-200 hover:border-sand-300 rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-sand-50 rounded-xl flex items-center justify-center group-hover:bg-sand-100 transition-colors">
              <BookOpen size={24} className="text-sand-600" />
            </div>
            <span className="font-semibold text-slate-800">Blog</span>
          </Link>
        </div>

        <Link
          to="/quote"
          className="bg-sand-600 hover:bg-sand-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors inline-flex items-center gap-2 shadow-lg shadow-sand-600/30"
        >
          Get a Free Estimate <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
