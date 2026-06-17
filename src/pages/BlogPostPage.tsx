import { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ArrowRight, Phone } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { usePageSEO } from '../lib/seo';
import CTASection from '../components/CTASection';

export default function BlogPostPage() {
  const { pathname } = useLocation();
  const slug = pathname.replace('/blog/', '');
  const post = blogPosts.find((p) => p.slug === slug);

  const jsonLd = useMemo(() => {
    if (!post) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      datePublished: post.date,
      author: { '@type': 'Organization', name: 'San Antonio Stucco' },
      description: post.excerpt,
    };
  }, [post]);

  const seoMeta = useMemo(() => {
    if (!post) return { title: 'Post Not Found', description: 'Blog post not found.' };
    const titles: Record<string, string> = {
      'how-san-antonio-weather-affects-stucco': 'How San Antonio Weather Affects Stucco | Climate & Damage Guide',
      'signs-your-stucco-needs-repair': 'Signs Your Stucco Needs Repair | San Antonio Stucco Damage Guide',
      'stucco-repair-vs-replacement-guide': 'Stucco Repair vs. Replacement | San Antonio Homeowner Guide',
      'eifs-vs-traditional-stucco-differences': 'EIFS vs Traditional Stucco | Differences, Maintenance & Cost Compared',
      'protecting-stucco-from-texas-heat': 'Protecting Stucco from Texas Heat | San Antonio Maintenance Tips',
      'stucco-maintenance-checklist-san-antonio': 'Stucco Maintenance Checklist for San Antonio Homes | Expert Tips',
      'cost-of-stucco-installation-san-antonio': 'Stucco Installation Cost San Antonio | 2025 Pricing Guide',
      'choosing-stucco-colors-and-textures': 'Choosing Stucco Colors & Textures | San Antonio Design Guide',
      'stucco-vs-other-siding-materials': 'Stucco vs Other Siding | Stucco vs Vinyl, Brick & Fiber Cement in San Antonio',
    };
    const descriptions: Record<string, string> = {
      'how-san-antonio-weather-affects-stucco': 'Learn how San Antonio heat, humidity & UV damage stucco systems. Expert tips on prevention & when to call a stucco contractor. Read our guide!',
      'signs-your-stucco-needs-repair': 'Spot stucco damage early: cracks, bubbling, discoloration & more. San Antonio stucco repair experts explain what to look for. Schedule a free inspection!',
      'stucco-repair-vs-replacement-guide': 'Should you repair or replace your stucco? San Antonio experts explain costs, timelines & when each option makes sense. Get a free assessment!',
      'eifs-vs-traditional-stucco-differences': 'EIFS vs traditional stucco compared. Learn the differences in materials, moisture, maintenance & cost from San Antonio stucco experts. Read the full guide.',
      'protecting-stucco-from-texas-heat': 'Protect your San Antonio stucco from extreme Texas heat and UV damage. Expert maintenance tips from local stucco contractors. Read our full guide!',
      'stucco-maintenance-checklist-san-antonio': 'Keep your San Antonio stucco looking great with this seasonal maintenance checklist. Expert tips from local stucco professionals. Download the guide!',
      'cost-of-stucco-installation-san-antonio': 'How much does stucco installation cost in San Antonio? Detailed pricing breakdown for 2025. Get a free, no-obligation estimate from local experts!',
      'choosing-stucco-colors-and-textures': 'Choose the perfect stucco color and texture for your San Antonio home. Expert guide on finishes, styles & what works best in Texas. Read now!',
      'stucco-vs-other-siding-materials': 'Stucco vs vinyl, brick, fiber cement & stone veneer for San Antonio homes. Compare cost, durability & climate fit. Free estimates from local stucco experts.',
    };
    return {
      title: titles[post.slug] || post.title,
      description: descriptions[post.slug] || post.excerpt,
    };
  }, [post]);

  usePageSEO({
    title: seoMeta.title,
    description: seoMeta.description,
    path: `/blog/${slug}`,
    image: post?.image,
    type: 'article',
    rawTitle: true,
    jsonLd,
  });

  if (!post) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Post not found</h1>
        <Link to="/blog" className="text-sand-600 mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <nav className="pt-28 md:pt-36 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li><Link to="/" className="hover:text-sand-600 transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/blog" className="hover:text-sand-600 transition-colors">Blog</Link></li>
            <li>/</li>
            <li className="text-slate-800 font-medium truncate">{post.title}</li>
          </ol>
        </div>
      </nav>

      <article className="pt-8 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sand-600 hover:text-sand-700 font-medium text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to All Articles
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-sand-700 bg-sand-50 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar size={12} /> {post.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="rounded-2xl overflow-hidden mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          <div className="prose-custom space-y-6">
            {post.content.map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={i}
                    className="text-2xl md:text-3xl font-bold text-slate-800 mt-10 mb-2"
                  >
                    {paragraph.slice(3)}
                  </h2>
                );
              }
              return (
                <p
                  key={i}
                  className="text-slate-700 leading-relaxed text-lg [&_a]:text-sand-600 [&_a:hover]:text-sand-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              );
            })}
          </div>

          {['stucco-vs-other-siding-materials', 'eifs-vs-traditional-stucco-differences'].includes(post.slug) && (
            <div className="mt-12 p-8 bg-slate-800 rounded-2xl text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Get Expert Help in San Antonio</h3>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                Free, no-obligation estimates from a local crew that has been doing stucco work across San Antonio, Boerne, Schertz, Helotes, and New Braunfels for years.
              </p>
              <a
                href="tel:+12108718490"
                className="bg-sand-600 hover:bg-sand-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-sand-600/30"
              >
                <Phone size={20} /> Call (210) 871-8490 for a Free Estimate
              </a>
            </div>
          )}

          {['how-san-antonio-weather-affects-stucco', 'stucco-vs-other-siding-materials', 'stucco-repair-vs-replacement-guide', 'protecting-stucco-from-texas-heat'].includes(post.slug) && (
            <div className="mt-8 p-5 bg-stone-50 border border-stone-200 rounded-xl">
              <p className="text-slate-700 text-sm leading-relaxed">
                Related reading:{' '}
                <Link to="/blog/us-largest-plaster-producer-san-antonio" className="text-sand-600 hover:text-sand-700 underline underline-offset-2 transition-colors font-medium">
                  Learn why the US is the world's leading plaster producer and what that means for your home
                </Link>
              </p>
            </div>
          )}

          <div className="mt-12 p-6 bg-sand-50 border border-sand-200 rounded-2xl">
            <h3 className="font-bold text-slate-800 mb-2">Need Professional Help?</h3>
            <p className="text-slate-600 text-sm mb-4">
              Our team is available for free inspections and estimates on any stucco project in San Antonio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/quote"
                className="bg-sand-600 hover:bg-sand-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors inline-flex items-center gap-2"
              >
                Get a Free Estimate <ArrowRight size={14} />
              </Link>
              <Link
                to={post.relatedService}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors inline-flex items-center gap-2"
              >
                View Related Service <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
                >
                  <div className="overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      loading="lazy"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-sand-700 bg-sand-50 px-2 py-0.5 rounded-full">
                      {related.category}
                    </span>
                    <h3 className="font-bold text-slate-800 mt-2 group-hover:text-sand-700 transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection headline="Have Questions About Your Stucco?" description="Our experts are happy to answer questions and provide free assessments for any stucco concerns." />
    </>
  );
}
