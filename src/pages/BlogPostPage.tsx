import { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { services } from '../data/services';
import { blogServiceMap } from '../data/blogServiceMap';
import { usePageSEO } from '../lib/seo';
import CTASection from '../components/CTASection';

export default function BlogPostPage() {
  const { pathname } = useLocation();
  const slug = pathname.replace('/blog/', '');
  const post = blogPosts.find((p) => p.slug === slug);


  const seoMeta = useMemo(() => {
    if (!post) return { title: 'Post Not Found', description: 'Blog post not found.' };
    return {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
    };
  }, [post]);

  usePageSEO({
    title: seoMeta.title,
    description: seoMeta.description,
    path: `/blog/${slug}`,
    image: post?.image,
    type: 'article',
    rawTitle: true,
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
              width={800}
              height={400}
              {...{ fetchpriority: 'high' }}
              decoding="async"
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
            const relatedSlugs = blogServiceMap[post.slug] ?? [post.relatedService.replace(/^\//, '')];
            const relatedServices = relatedSlugs.flatMap((slug) => services.filter((s) => s.slug === slug));
            return (
              <div className="mt-12 p-6 bg-sand-50 border border-sand-200 rounded-2xl">
                <h3 className="font-bold text-slate-800 mb-2">Related Stucco Services</h3>
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
                  {relatedServices.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/${s.slug}`}
                      className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors inline-flex items-center gap-2"
                    >
                      {s.seoName ?? s.name} in San Antonio <ArrowRight size={14} />
                    </Link>
                  ))}
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
                      width={400}
                      height={160}
                      loading="lazy"
                      decoding="async"
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
