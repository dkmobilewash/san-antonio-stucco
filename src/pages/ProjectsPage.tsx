import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { projects } from '../data/projects';
import { services } from '../data/services';
import CTASection from '../components/CTASection';
import { usePageSEO } from '../lib/seo';
import { pageSeo } from '../data/seo';

export default function ProjectsPage() {
  usePageSEO({
    ...pageSeo['/projects'],
    path: '/projects',
    rawTitle: true,
  });

  const serviceName = (slug: string) => services.find((s) => s.slug === slug)?.name ?? 'Stucco';

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-sand-600 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-slate-800 font-medium">Projects</li>
            </ol>
          </nav>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Stucco Projects</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
              Every photo here is our own crew on our own job. Residential and commercial work: new
              installs, repairs, EIFS, and full recoats.
            </p>
            <Link
              to="/quote"
              className="text-sand-600 hover:text-sand-700 font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              Get a Free Estimate <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => {
              const cover = p.images[0];
              return (
                <article
                  key={p.slug}
                  id={p.slug}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col"
                >
                  <div className="relative bg-slate-100" style={{ aspectRatio: '4 / 3' }}>
                    <img
                      src={cover.thumb}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {cover.label && (
                      <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {cover.label}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <Link
                      to={`/${p.service}`}
                      className="text-xs font-semibold uppercase tracking-wide text-sand-600 hover:text-sand-700 mb-2"
                    >
                      {serviceName(p.service)}
                    </Link>
                    <h2 className="font-bold text-slate-800 text-lg mb-2">{p.title}</h2>
                    {p.area && (
                      <p className="text-sm text-slate-500 flex items-center gap-1 mb-2">
                        <MapPin size={14} /> {p.area}
                      </p>
                    )}
                    <p className="text-slate-600 text-sm leading-relaxed">{p.summary}</p>
                    {p.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {p.images.slice(1).map((img) => (
                          <img
                            key={img.src}
                            src={img.thumb}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            loading="lazy"
                            decoding="async"
                            className="rounded-lg object-cover w-full h-20"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
