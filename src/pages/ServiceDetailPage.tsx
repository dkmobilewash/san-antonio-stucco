import { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight, Phone, CheckCircle, AlertTriangle, MapPin, Clock, DollarSign, Wrench, BookOpen } from 'lucide-react';
import { services } from '../data/services';
import { locations } from '../data/locations';
import { blogPosts } from '../data/blog';
import { blogServiceMap } from '../data/blogServiceMap';
import { contact } from '../data/contact';
import TestimonialsSection from '../components/TestimonialsSection';
import ReviewCTA from '../components/ReviewCTA';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import { usePageSEO } from '../lib/seo';
import { pageSeo } from '../data/seo';

const servicePhotos: Record<string, { src: string; alt: string; caption: string }[]> = {
  'stucco-installation': [
    { src: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'New stucco installation on San Antonio home', caption: 'New three-coat stucco system applied to a custom home' },
    { src: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Stucco finish texture detail', caption: 'Smooth finish coat applied over properly cured base layers' },
    { src: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Modern stucco exterior installation', caption: 'Contemporary stucco finish on a new build in Stone Oak' },
    { src: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Completed stucco installation project', caption: 'Full exterior stucco installation with custom color' },
  ],
  'stucco-replacement': [
    { src: 'https://images.pexels.com/photos/2138126/pexels-photo-2138126.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Stucco replacement project in progress', caption: 'Old stucco removed to reveal and repair substrate damage' },
    { src: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Completed stucco replacement', caption: 'Brand new stucco system after full replacement' },
    { src: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Home after stucco replacement', caption: 'Complete exterior renewal with modern finish' },
    { src: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Stucco replacement detail work', caption: 'Precision work around architectural features' },
  ],
  'residential-stucco': [
    { src: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Beautiful residential stucco home in San Antonio', caption: 'Clean stucco finish enhancing curb appeal' },
    { src: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Residential stucco exterior', caption: 'Smooth contemporary finish on a San Antonio home' },
    { src: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Home exterior stucco finish', caption: 'Custom texture matching on a home addition' },
    { src: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Stucco detail on residential property', caption: 'Precise color-matched repair work' },
  ],
  'commercial-stucco': [
    { src: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Commercial building with stucco exterior', caption: 'Professional stucco finish on a commercial property' },
    { src: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Office building stucco installation', caption: 'Multi-story commercial installation in San Antonio' },
    { src: 'https://images.pexels.com/photos/2138126/pexels-photo-2138126.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Commercial stucco project', caption: 'Large-scale commercial exterior renovation' },
    { src: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Commercial building exterior finish', caption: 'Retail storefront stucco application' },
  ],
  'stucco-remodeling': [
    { src: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Modern stucco remodel result', caption: 'Updated from heavy dash to smooth modern finish' },
    { src: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Exterior remodeling with stucco', caption: 'Complete exterior transformation with new texture' },
    { src: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Stucco texture update', caption: 'Contemporary skim coat over outdated texture' },
    { src: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Remodeled home exterior', caption: 'Dramatic curb appeal improvement with stucco remodeling' },
  ],
  'stucco-repairs': [
    { src: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Stucco crack repair in San Antonio', caption: 'Professional crack repair with seamless texture match' },
    { src: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Stucco repair work', caption: 'Delamination repair restoring wall integrity' },
    { src: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Completed stucco repair', caption: 'Invisible repair blending with original finish' },
    { src: 'https://images.pexels.com/photos/2138126/pexels-photo-2138126.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Stucco damage being repaired', caption: 'Addressing moisture damage at the source' },
  ],
  'eifs-synthetic-stucco': [
    { src: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'EIFS system on commercial building', caption: 'EIFS system properly maintained on a San Antonio building' },
    { src: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Synthetic stucco exterior', caption: 'Re-coated EIFS finish with UV-stable products' },
    { src: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'EIFS repair and restoration', caption: 'EIFS joint and sealant restoration' },
    { src: 'https://images.pexels.com/photos/2138126/pexels-photo-2138126.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Synthetic stucco maintenance', caption: 'Comprehensive EIFS inspection and repair' },
  ],
  'stucco-painting': [
    { src: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Freshly painted stucco home in San Antonio', caption: 'Elastomeric coating applied to a San Antonio home exterior' },
    { src: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Stucco painting detail showing smooth finish', caption: 'Clean, consistent coverage with UV-stable coating' },
    { src: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Professional stucco painting project', caption: 'Full exterior color change with proper surface preparation' },
    { src: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Completed stucco painting project', caption: 'Dramatic curb appeal improvement with elastomeric finish' },
  ],
};

const relatedServicesMap: Record<string, string[]> = {
  'stucco-installation': ['stucco-repairs', 'stucco-painting', 'residential-stucco'],
  'stucco-replacement': ['stucco-repairs', 'stucco-installation', 'residential-stucco'],
  'residential-stucco': ['stucco-repairs', 'stucco-painting', 'stucco-remodeling'],
  'commercial-stucco': ['stucco-installation', 'stucco-repairs', 'eifs-synthetic-stucco'],
  'stucco-remodeling': ['stucco-painting', 'residential-stucco', 'stucco-replacement'],
  'stucco-repairs': ['stucco-replacement', 'stucco-painting', 'eifs-synthetic-stucco'],
  'eifs-synthetic-stucco': ['stucco-repairs', 'stucco-replacement', 'commercial-stucco'],
  'stucco-painting': ['stucco-remodeling', 'stucco-repairs', 'residential-stucco'],
};

export default function ServiceDetailPage() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '');
  const service = services.find((s) => s.slug === slug);


  const seoMeta = useMemo(() => {
    if (!service) return { title: 'Service Not Found', description: 'Page not found.' };
    return pageSeo[`/${service.slug}`] ?? {
      title: `${service.name} | San Antonio Stucco`,
      description: service.heroDescription.slice(0, 155),
    };
  }, [service]);

  usePageSEO({
    title: seoMeta.title,
    description: seoMeta.description,
    path: `/${slug}`,
    rawTitle: true,
  });

  if (!service) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Service not found</h1>
        <Link to="/services" className="text-sand-600 mt-4 inline-block">Back to Services</Link>
      </div>
    );
  }

  // Query-matching display name ("Stucco Repair", "EIFS Stucco") for headings; the H1 stays heroHeadline.
  const displayName = service.seoName ?? service.name;
  const resourcePosts = blogPosts.filter((p) => blogServiceMap[p.slug]?.includes(service.slug)).slice(0, 6);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="pt-28 md:pt-36 bg-gradient-to-br from-slate-50 via-white to-sand-50">
        <div className="max-w-7xl mx-auto px-6">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li><Link to="/" className="hover:text-sand-600 transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/services" className="hover:text-sand-600 transition-colors">Services</Link></li>
            <li>/</li>
            <li className="text-slate-800 font-medium">{displayName}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-8 pb-20 bg-gradient-to-br from-slate-50 via-white to-sand-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">{service.heroHeadline}</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">{service.heroDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/quote"
                className="bg-sand-600 hover:bg-sand-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
              >
                Get Free Estimate <ArrowRight size={18} />
              </Link>
              <a
                href={`tel:${contact.phoneRaw}`}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Phone size={18} /> Call {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">About {displayName} in San Antonio</h2>
          <div className="space-y-6">
            {service.overview.map((paragraph, i) => (
              <p key={i} className="text-slate-700 leading-relaxed text-lg">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {servicePhotos[service.slug] && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">Our {displayName} Work</h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Browse examples of our {displayName.toLowerCase()} projects across the San Antonio area.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {servicePhotos[service.slug].map((photo, i) => (
                <div key={i} className="group rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-sm text-slate-600 leading-snug">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why It Matters */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">{service.whyItMatters.heading}</h2>
          <div className="space-y-5">
            {service.whyItMatters.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-slate-700 leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Choose San Antonio Stucco for {displayName}</h2>
          <p className="text-slate-600 mb-8 max-w-2xl">
            Licensed, insured, and locally owned — here is what you get when you work with our experienced team for {displayName.toLowerCase()} in San Antonio:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-sage-50 rounded-xl">
                <CheckCircle size={20} className="text-sage-600 shrink-0 mt-0.5" />
                <span className="text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">{service.process.heading}</h2>
          <p className="text-slate-600 mb-8">
            Here is what to expect when you hire us for this work:
          </p>
          <ol className="space-y-4">
            {service.process.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="bg-sand-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-slate-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Common Signs */}
      {service.commonSigns && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Signs You May Need {displayName}</h2>
            <p className="text-slate-600 mb-8">
              If you notice any of these issues on your San Antonio property, it is time to call a professional:
            </p>
            <div className="space-y-3">
              {service.commonSigns.map((sign, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl">
                  <Wrench size={18} className="text-sand-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{sign}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <TestimonialsSection title={`What Clients Say About Our ${displayName}`} filter={displayName} />

      {/* Review CTA */}
      <ReviewCTA />

      {/* Related Services */}
      {relatedServicesMap[service.slug] && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Related Stucco Services in San Antonio</h2>
            <p className="text-slate-600 mb-8">
              Homeowners who need {displayName.toLowerCase()} often benefit from these related services:
            </p>
            <div className="space-y-4">
              {services.filter((s) => relatedServicesMap[service.slug]?.includes(s.slug)).map((s) => (
                <Link
                  key={s.slug}
                  to={`/${s.slug}`}
                  className="group flex items-start gap-4 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-5 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-sand-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-sand-100 transition-colors">
                    <Wrench size={20} className="text-sand-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-800 group-hover:text-sand-700 transition-colors mb-1">
                      {s.name} in San Antonio
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.shortDescription}</p>
                  </div>
                  <ArrowRight size={18} className="text-slate-400 group-hover:text-sand-600 shrink-0 mt-1 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">All Stucco Services in San Antonio</h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            We offer a full range of professional stucco services throughout San Antonio. Browse all our offerings below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter((s) => s.slug !== slug).map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-sand-200 transition-all"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-sand-700 transition-colors">{s.name} in San Antonio</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{s.shortDescription}</p>
                <span className="text-sand-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn about {s.name.toLowerCase()} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">Recent {displayName} Projects</h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Examples of {displayName.toLowerCase()} work completed for San Antonio homeowners and businesses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt={`${displayName} project in San Antonio`}
                width={600}
                height={192}
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-800">Residential {displayName}</h3>
                <p className="text-sm text-slate-500">Stone Oak, San Antonio</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white">
              <img
                src="https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt={`${displayName} project on a home exterior in San Antonio TX`}
                width={600}
                height={192}
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-800">Home Exterior Project</h3>
                <p className="text-sm text-slate-500">Alamo Heights, San Antonio</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white">
              <img
                src="https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt={`${displayName} for commercial property`}
                width={600}
                height={192}
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-800">Commercial Property</h3>
                <p className="text-sm text-slate-500">Downtown San Antonio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Professional */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Hire a Professional for {displayName} in San Antonio</h2>
          <p className="text-slate-600 mb-8">
            Stucco work requires specialized skills, materials, and understanding of building science. With over 500 completed projects across the San Antonio metro, here is why professional service matters:
          </p>
          <div className="space-y-4">
            {service.whyProfessional.map((reason, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-sand-50 border border-sand-100 rounded-xl">
                <CheckCircle size={18} className="text-sand-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm leading-relaxed">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Useful Resources */}
      {resourcePosts.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{displayName} Resources & Guides</h2>
            <p className="text-slate-600 mb-8">
              Learn more about {displayName.toLowerCase()} and caring for your stucco in San Antonio:
            </p>
            <div className="space-y-4">
              {resourcePosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex items-start gap-4 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-5 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-sand-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-sand-100 transition-colors">
                    <BookOpen size={20} className="text-sand-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-800 group-hover:text-sand-700 transition-colors mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{post.excerpt}</p>
                  </div>
                  <ArrowRight size={18} className="text-slate-400 group-hover:text-sand-600 shrink-0 mt-1 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pain Points / Urgency */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-4">{service.painPoints.heading}</h2>
          <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            {service.painPoints.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {service.painPoints.items.map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <AlertTriangle size={18} className="text-sand-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost / Timeline */}
      {service.costTimeline && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">How Much Does {displayName} Cost in San Antonio?</h2>
            <div className="space-y-4">
              {service.costTimeline.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl">
                  {i === 0 ? (
                    <Clock size={18} className="text-sand-600 shrink-0 mt-0.5" />
                  ) : (
                    <DollarSign size={18} className="text-sand-600 shrink-0 mt-0.5" />
                  )}
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection faqs={service.faqs} title={`${displayName} FAQ`} />

      {/* Location Links */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            {displayName} Across San Antonio
          </h2>
          <p className="text-slate-600 mb-6">
            We provide professional {displayName.toLowerCase()} throughout the greater San Antonio metro area. Select your location for local details:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/${loc.slug}`}
                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-sand-300 rounded-xl p-3 hover:shadow-sm transition-all"
              >
                <MapPin size={16} className="text-sand-600" />
                <span className="text-sm font-medium text-slate-700">
                  {loc.slug === 'san-antonio' ? 'Stucco Contractor in San Antonio' : `Stucco Services in ${loc.name}`}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/service-areas" className="text-sand-600 hover:text-sand-700 font-medium text-sm inline-flex items-center gap-1">
              View All Service Areas <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        headline={`Ready for ${displayName} in San Antonio?`}
        description={`Get a free, no-obligation estimate for your ${displayName.toLowerCase()} project. We respond within one business day with honest, detailed pricing.`}
      />
    </>
  );
}
