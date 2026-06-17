import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import CTASection from '../components/CTASection';
import { services } from '../data/services';
import { locations } from '../data/locations';
import { blogPosts } from '../data/blog';
import { usePageSEO } from '../lib/seo';

export default function BlogPage() {
  usePageSEO({
    title: 'Stucco Blog | Tips, Maintenance & Repair Guides | San Antonio Stucco',
    description: 'Expert stucco tips for San Antonio homeowners. Guides on repair, maintenance, installation & protecting your stucco from Texas heat. Read our latest articles!',
    path: '/blog',
    rawTitle: true,
  });

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Stucco Tips & Resources
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Expert advice on stucco maintenance, repair, and installation from San Antonio's trusted stucco professionals.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((article) => (
              <Link key={article.slug} to={`/blog/${article.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-sand-700 bg-sand-50 px-2.5 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar size={12} /> {article.date}
                    </span>
                  </div>
                  <h2 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-sand-700 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                  <span className="text-sand-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Learn More About Our Services</h2>
          <p className="text-slate-600 mb-6">
            Explore our full range of stucco services to see how we can help with your project.
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
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Serving the Greater San Antonio Area</h2>
          <p className="text-slate-600 mb-6">
            Our stucco expertise is available throughout these communities. Click your area for local information.
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

      <CTASection headline="Have Questions About Your Stucco?" description="Our experts are happy to answer questions and provide free assessments for any stucco concerns." />
    </>
  );
}
