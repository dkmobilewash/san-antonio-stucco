import { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { services } from '../data/services';
import { usePageSEO } from '../lib/seo';
import CTASection from '../components/CTASection';

const MONTH_MAP: Record<string, string> = {
  'January': '01', 'February': '02', 'March': '03', 'April': '04',
  'May': '05', 'June': '06', 'July': '07', 'August': '08',
  'September': '09', 'October': '10', 'November': '11', 'December': '12',
};

function toISODate(dateStr: string): string {
  const parts = dateStr.split(' ');
  if (parts.length === 2 && MONTH_MAP[parts[0]]) {
    return `${parts[1]}-${MONTH_MAP[parts[0]]}-01`;
  }
  return dateStr;
}

export default function BlogPostPage() {
  const { pathname } = useLocation();
  const slug = pathname.replace('/blog/', '');
  const post = blogPosts.find((p) => p.slug === slug);

  const jsonLd = useMemo(() => {
    if (!post) return undefined;
    const isoDate = toISODate(post.date);

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      datePublished: isoDate,
      dateModified: isoDate,
      author: {
        '@type': 'Organization',
        name: 'San Antonio Stucco',
        url: 'https://sanantoniostucco.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'San Antonio Stucco',
        url: 'https://sanantoniostucco.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://sanantoniostucco.com/images/logo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://sanantoniostucco.com/blog/${post.slug}`,
      },
    };

    const isQ = (t: string) => /\?|^(what|how|which|does|can|is|are|do|why|when|where)\b/i.test(t);
    const strip = (t: string) => t.replace(/<[^>]+>/g, '');
    const faqs: { name: string; acceptedAnswer: { '@type': string; text: string } }[] = [];

    if (isQ(post.title)) {
      const first = post.content.find((c) => !c.startsWith('## '));
      if (first) faqs.push({ name: post.title.replace(/\?*$/, '?'), acceptedAnswer: { '@type': 'Answer', text: strip(first) } });
    }
    for (let i = 0; i < post.content.length; i++) {
      if (post.content[i].startsWith('## ')) {
        const heading = post.content[i].slice(3);
        if (isQ(heading)) {
          const ans = post.content.slice(i + 1).find((c) => !c.startsWith('## '));
          if (ans) faqs.push({ name: heading.replace(/\?*$/, '?'), acceptedAnswer: { '@type': 'Answer', text: strip(ans) } });
        }
      }
    }

    if (faqs.length === 0) return articleSchema;

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.slice(0, 10).map((f) => ({ '@type': 'Question', ...f })),
    };

    return [articleSchema, faqSchema];
  }, [post]);

  const seoMeta = useMemo(() => {
    if (!post) return { title: 'Post Not Found', description: 'Blog post not found.' };
    const titles: Record<string, string> = {
      'how-san-antonio-weather-affects-stucco': 'How San Antonio Weather Affects Stucco | Damage Guide',
      'signs-your-stucco-needs-repair': 'Signs Your Stucco Needs Repair | San Antonio Guide',
      'stucco-repair-vs-replacement-guide': 'Stucco Repair vs Replacement | San Antonio Guide',
      'eifs-vs-traditional-stucco-differences': 'EIFS vs Traditional Stucco | Cost & Differences',
      'protecting-stucco-from-texas-heat': 'Protecting Stucco from Texas Heat | Maintenance Tips',
      'stucco-maintenance-checklist-san-antonio': 'Stucco Maintenance Checklist | San Antonio Tips',
      'cost-of-stucco-installation-san-antonio': 'Stucco Installation Cost San Antonio | 2025 Pricing',
      'choosing-stucco-colors-and-textures': 'Stucco Colors & Textures | San Antonio Design Guide',
      'stucco-vs-other-siding-materials': 'Stucco vs Vinyl, Brick & Fiber Cement | SA Guide',
      'stucco-repair-near-me-san-antonio-guide': 'Stucco Repair Near Me San Antonio | Hiring Guide',
      'stucco-vs-brick-cost-san-antonio': 'Stucco vs Brick Cost San Antonio | 2025 Comparison',
      'how-long-does-stucco-last-san-antonio': 'How Long Does Stucco Last in San Antonio? | Guide',
      'which-type-of-stucco-is-best': 'Which Type of Stucco Is Best? | System Comparison Guide',
      'difference-between-20-30-and-30-30-stucco-finish': '20/30 vs 30/30 Stucco Finish | Texture Guide',
      'how-much-does-it-cost-to-stucco-a-1000-sq-ft-house': 'Cost to Stucco a 1,000 Sq Ft House | SA Pricing',
      'what-are-the-three-stages-of-stucco': 'Three Stages of Stucco | Three-Coat Process Guide',
      'average-price-cement-stucco-installation-per-square-foot-san-antonio': 'Cement Stucco Cost per Sq Ft San Antonio | Pricing',
      'what-are-the-downsides-of-stucco': 'Downsides of Stucco | Honest Pros & Cons Guide',
      'life-expectancy-of-a-stucco-house': 'Life Expectancy of a Stucco House | Lifespan Guide',
      'what-is-the-issue-with-stucco': 'Common Stucco Problems Explained | Repair Guide',
      'does-homeowners-insurance-cover-stucco-issues': 'Does Insurance Cover Stucco? | Homeowner Guide',
      'what-does-failing-stucco-look-like': 'What Does Failing Stucco Look Like? | Warning Signs',
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
      'stucco-repair-near-me-san-antonio-guide': 'Searching for stucco repair near me in San Antonio, TX? Learn what to look for in a contractor, typical repair costs & how to avoid costly mistakes. Read now.',
      'stucco-vs-brick-cost-san-antonio': 'Stucco vs brick cost comparison for San Antonio, TX homes. Installation pricing, maintenance, durability & which delivers the best long-term value. Read the guide.',
      'how-long-does-stucco-last-san-antonio': 'How long does stucco last in San Antonio, TX? Lifespan by system type, what shortens it & how to maximize your exterior investment. Expert guide.',
      'which-type-of-stucco-is-best': 'Which type of stucco is best? Compare three-coat, one-coat, EIFS & acrylic systems. San Antonio experts explain what works in the South Texas climate.',
      'difference-between-20-30-and-30-30-stucco-finish': '20/30 vs 30/30 stucco finish — what the numbers mean, how each looks on a wall & which sand-float texture is right for your San Antonio home.',
      'how-much-does-it-cost-to-stucco-a-1000-sq-ft-house': 'How much does it cost to stucco a 1,000 sq ft house in San Antonio? Real pricing breakdown — materials, labor & what affects the final number.',
      'what-are-the-three-stages-of-stucco': 'The three stages of stucco — scratch coat, brown coat & finish coat. Learn why each layer matters for a long-lasting exterior in San Antonio.',
      'average-price-cement-stucco-installation-per-square-foot-san-antonio': 'Average cement stucco cost per square foot in San Antonio: $8–$15. Local pricing breakdown, what drives cost & how to compare estimates.',
      'what-are-the-downsides-of-stucco': 'Honest downsides of stucco: cracking, moisture risk, repair complexity & cost. San Antonio experts explain how to minimize each drawback.',
      'life-expectancy-of-a-stucco-house': 'Life expectancy of a stucco house: 50–80 years for three-coat systems. Learn what shortens lifespan & how to extend it in San Antonio.',
      'what-is-the-issue-with-stucco': 'Common stucco issues explained — moisture intrusion, cracking, delamination & efflorescence. San Antonio repair experts cover causes & fixes.',
      'does-homeowners-insurance-cover-stucco-issues': 'Does homeowners insurance cover stucco damage? What is covered, what is excluded & how to file a claim. San Antonio homeowner guide.',
      'what-does-failing-stucco-look-like': 'What does failing stucco look like? Spot cracking patterns, bubbling, hollow sounds & staining before they become costly repairs. Photo guide.',
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
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score: (p.relatedService === post.relatedService ? 2 : 0) + (p.category === post.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.post);

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
              alt={`Featured image for ${post.title} — San Antonio stucco guide`}
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

          <div className="mt-12 p-8 bg-slate-800 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Get Expert Help in San Antonio</h3>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Free, no-obligation estimates from a local crew that has been doing stucco work across San Antonio, Boerne, Schertz, Helotes, and New Braunfels for years.
            </p>
            <Link
              to="/quote"
              className="bg-sand-600 hover:bg-sand-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-sand-600/30"
            >
              Get a Free Estimate <ArrowRight size={20} />
            </Link>
          </div>

          {(() => {
            const relatedServiceSlug = post.relatedService.replace(/^\//, '');
            const relatedService = services.find((s) => s.slug === relatedServiceSlug);
            const relatedServiceName = relatedService?.name || 'Our Services';
            return (
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
                    {relatedServiceName} in San Antonio <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })()}
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
                      alt={`Preview image for ${related.title} — San Antonio stucco tips`}
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
