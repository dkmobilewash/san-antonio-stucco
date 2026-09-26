/**
 * Build-time prerender. Runs after `vite build` (client) and `vite build --ssr` (server entry):
 *   1. renders every route through the real React tree (src/entry-server.tsx), so the HTML
 *      Google indexes is exactly what the browser hydrates;
 *   2. injects <title>/meta/canonical from src/data/seo.ts (blog: seoTitle/seoDescription) and
 *      the page's JSON-LD (FAQPage, BreadcrumbList, Service, BlogPosting, ImageGallery);
 *   3. writes dist/<path>/index.html for every route, dist/404.html, and dist/sitemap.xml.
 * The business entity itself lives once in index.html and is carried into every page.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { services } from '../src/data/services.ts';
import { locations } from '../src/data/locations.ts';
import { blogPosts } from '../src/data/blog.ts';
import { projects } from '../src/data/projects.ts';
import { pageSeo } from '../src/data/seo.ts';
import { homeFaqs } from '../src/data/faqs.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const SSR_ENTRY = join(__dirname, '..', 'dist-ssr', 'entry-server.js');
const SITE_URL = 'https://sanantoniostucco.com';
const SITE_NAME = 'San Antonio Stucco';
const OG_IMAGE = 'https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/san-antonio-stucco.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vc2FuLWFudG9uaW8tc3R1Y2NvLnBuZyIsImlhdCI6MTc3NzU3ODEzOSwiZXhwIjoxODA5MTE0MTM5fQ.1hP43qIGRyXlwLX02o92zUXeVzuLUpxvJDbBl_Ley_M';

if (!existsSync(SSR_ENTRY)) {
  console.error('dist-ssr/entry-server.js is missing. Run `vite build --ssr src/entry-server.tsx --outDir dist-ssr` first (npm run build does).');
  process.exit(2);
}
const { render } = (await import(pathToFileURL(SSR_ENTRY).href)) as { render: (url: string) => Promise<string> };

// ── Helpers ──

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function seoHead(path: string, title: string, description: string): string {
  const canonical = `${SITE_URL}${path}`;
  return `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${OG_IMAGE}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${OG_IMAGE}">`;
}

function faqSchema(faqs: { question: string; answer: string }[]): string {
  if (!faqs.length) return '';
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  })}</script>`;
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]+>/g, '');
}

function isQuestion(text: string): boolean {
  return /\?|^(what|how|which|does|can|is|are|do|why|when|where)\b/i.test(text);
}

function extractBlogFaqs(post: typeof blogPosts[0]): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];

  if (isQuestion(post.title)) {
    const firstParagraph = post.content.find(c => !c.startsWith('## '));
    if (firstParagraph) {
      faqs.push({ question: post.title.replace(/\?*$/, '?'), answer: stripHtml(firstParagraph) });
    }
  }

  for (let i = 0; i < post.content.length; i++) {
    if (post.content[i].startsWith('## ')) {
      const heading = post.content[i].slice(3);
      if (isQuestion(heading)) {
        const answerParagraph = post.content.slice(i + 1).find(c => !c.startsWith('## '));
        if (answerParagraph) {
          faqs.push({ question: heading.replace(/\?*$/, '?'), answer: stripHtml(answerParagraph) });
        }
      }
    }
  }

  return faqs.slice(0, 10);
}

function breadcrumbSchema(items: [string, string][]): string {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([href, name], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${href}`,
    })),
  })}</script>`;
}

function serviceSchema(service: typeof services[0]): string {
  const dn = service.seoName ?? service.name;
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${service.slug}#service`,
    "name": `${dn} in San Antonio, TX`,
    "serviceType": dn,
    "url": `${SITE_URL}/${service.slug}`,
    "description": service.shortDescription,
    "provider": { "@id": `${SITE_URL}/#business` },
    "areaServed": locations.map(l => ({ "@type": "City", "name": l.name })),
  })}</script>`;
}

function locationServiceSchema(location: typeof locations[0]): string {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${location.slug}#service`,
    "name": `Stucco Services in ${location.name}, TX`,
    "serviceType": "Stucco Contractor",
    "url": `${SITE_URL}/${location.slug}`,
    "provider": { "@id": `${SITE_URL}/#business` },
    "areaServed": {
      "@type": "City",
      "name": location.name,
      "containedInPlace": { "@type": "AdministrativeArea", "name": "Texas" },
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Stucco Services in ${location.name}`,
      "itemListElement": services.map(s => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": s.name, "url": `${SITE_URL}/${s.slug}` },
      })),
    },
  })}</script>`;
}

function getLcpPreload(path: string): string {
  if (path === '/') return '';
  const blogMatch = path.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const post = blogPosts.find(p => p.slug === blogMatch[1]);
    if (post) {
      return `<link rel="preload" as="image" href="${post.image}" fetchpriority="high" />`;
    }
  }
  return '';
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function isoDate(monthYear: string): string {
  const [month, year] = monthYear.split(' ');
  const m = MONTHS.indexOf(month);
  return m >= 0 && year ? `${year}-${String(m + 1).padStart(2, '0')}-01` : monthYear;
}

const publisher = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#business`,
  "name": SITE_NAME,
  "url": SITE_URL,
  "logo": { "@type": "ImageObject", "url": OG_IMAGE },
};

function blogPostingSchema(post: typeof blogPosts[0]): string {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    "headline": post.title,
    "description": post.seoDescription ?? post.excerpt,
    "image": post.image,
    "datePublished": isoDate(post.date),
    "dateModified": lastmod[`/blog/${post.slug}`] ?? isoDate(post.date),
    "author": publisher,
    "publisher": publisher,
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "articleSection": post.category,
    "inLanguage": "en-US",
  })}</script>`;
}

function articleSchema(path: string, headline: string, description: string, datePublished: string): string {
  const url = `${SITE_URL}${path}`;
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    "headline": headline,
    "description": description,
    "datePublished": datePublished,
    "dateModified": lastmod[path] ?? datePublished,
    "author": publisher,
    "publisher": publisher,
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "inLanguage": "en-US",
  })}</script>`;
}

function imageGallerySchema(): string {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "San Antonio Stucco project photos",
    "url": `${SITE_URL}/projects`,
    "image": projects.flatMap(p => p.images.map(img => `${SITE_URL}${img.src}`)),
  })}</script>`;
}

// ── lastmod snapshot (scripts/seo/lastmod.json, refreshed with `npm run seo:lastmod`) ──
const today = new Date().toISOString().slice(0, 10);
const LASTMOD_FILE = join(__dirname, 'seo', 'lastmod.json');
const lastmod: Record<string, string> = existsSync(LASTMOD_FILE)
  ? (JSON.parse(readFileSync(LASTMOD_FILE, 'utf8')) as { routes: Record<string, string> }).routes
  : {};

// ── Route map: every URL the site serves, with its title/description and JSON-LD ──

interface RouteEntry {
  title: string;
  description: string;
  jsonLd: string[];
}

const routes: Record<string, RouteEntry> = {};
const crumbs = (...items: [string, string][]): [string, string][] => [['/', 'Home'], ...items];

routes['/'] = { title: '', description: '', jsonLd: [faqSchema(homeFaqs), breadcrumbSchema(crumbs())] };
routes['/services'] = { title: '', description: '', jsonLd: [breadcrumbSchema(crumbs(['/services', 'Services']))] };
routes['/service-areas'] = { title: '', description: '', jsonLd: [breadcrumbSchema(crumbs(['/service-areas', 'Service Areas']))] };
routes['/quote'] = { title: '', description: '', jsonLd: [breadcrumbSchema(crumbs(['/quote', 'Free Estimate']))] };
routes['/about'] = { title: '', description: '', jsonLd: [breadcrumbSchema(crumbs(['/about', 'About']))] };
routes['/projects'] = { title: '', description: '', jsonLd: [breadcrumbSchema(crumbs(['/projects', 'Projects'])), imageGallerySchema()] };
routes['/blog'] = { title: '', description: '', jsonLd: [breadcrumbSchema(crumbs(['/blog', 'Blog']))] };

for (const s of services) {
  routes[`/${s.slug}`] = {
    title: '', description: '',
    jsonLd: [faqSchema(s.faqs), breadcrumbSchema(crumbs(['/services', 'Services'], [`/${s.slug}`, s.name])), serviceSchema(s)],
  };
}

for (const l of locations) {
  routes[`/${l.slug}`] = {
    title: '', description: '',
    jsonLd: [faqSchema(l.faqs), breadcrumbSchema(crumbs(['/service-areas', 'Service Areas'], [`/${l.slug}`, l.name])), locationServiceSchema(l)],
  };
}

for (const post of blogPosts) {
  routes[`/blog/${post.slug}`] = {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    jsonLd: [faqSchema(extractBlogFaqs(post)), breadcrumbSchema(crumbs(['/blog', 'Blog'], [`/blog/${post.slug}`, post.title])), blogPostingSchema(post)],
  };
}

// Plaster article (separate component, not in blogPosts)
const PLASTER = '/blog/us-largest-plaster-producer-san-antonio';
routes[PLASTER] = {
  title: '', description: '',
  jsonLd: [
    breadcrumbSchema(crumbs(['/blog', 'Blog'], [PLASTER, "The U.S. Is the World's Largest Plaster Producer"])),
    articleSchema(PLASTER, "The United States is the World's Largest Plaster Producer — Here's Why That Matters for Your San Antonio Home", pageSeo[PLASTER].description, '2025-05-28'),
  ],
};

// Titles / descriptions: src/data/seo.ts is the single source (React pages read the same map).
for (const [path, meta] of Object.entries(pageSeo)) {
  if (!routes[path]) throw new Error(`pageSeo has an entry for ${path} but no route renders it`);
  routes[path].title = meta.title;
  routes[path].description = meta.description;
}
for (const [path, entry] of Object.entries(routes)) {
  if (!entry.title || !entry.description) throw new Error(`route ${path} has no title/description (add it to src/data/seo.ts)`);
}

// ── HTML injection ──

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

function stripDefaultHead(html: string): string {
  return html
    .replace(/<title>[^<]*<\/title>/, '')
    .replace(/<meta\s+name="description"[^>]*>/g, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/g, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/g, '');
}

function injectPage(path: string, entry: RouteEntry, body: string): string {
  let html = template;
  if (path !== '/') {
    html = html.replace(/<link rel="preload" as="image"[^>]*fetchpriority="high"[^>]*\/?>[\n\r]*/g, '');
  }
  const lcpPreload = getLcpPreload(path);
  const head = `${lcpPreload ? lcpPreload + '\n  ' : ''}${seoHead(path, entry.title, entry.description)}\n  ${entry.jsonLd.join('\n  ')}\n  </head>`;
  return stripDefaultHead(html)
    .replace('</head>', () => head)
    .replace(/<div id="root">\s*<\/div>/, () => `<div id="root">${body}</div>`);
}

let count = 0;
for (const [path, entry] of Object.entries(routes)) {
  const body = await render(path);
  const html = injectPage(path, entry, body);
  const dir = join(DIST, path === '/' ? '' : path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(path === '/' ? join(DIST, 'index.html') : join(dir, 'index.html'), html);
  count++;
}

// ── 404 page (Vercel serves dist/404.html with a real 404 status for unknown paths) ──
{
  const body = await render('/__not_found__');
  const head = `
    <title>Page Not Found | ${SITE_NAME}</title>
    <meta name="description" content="The page you are looking for could not be found. Browse our stucco services, read our blog, or request a free estimate in San Antonio.">
    <meta name="robots" content="noindex, follow">
  </head>`;
  const html = stripDefaultHead(template)
    .replace(/<link rel="preload" as="image"[^>]*fetchpriority="high"[^>]*\/?>[\n\r]*/g, '')
    .replace('</head>', () => head)
    .replace(/<div id="root">\s*<\/div>/, () => `<div id="root">${body}</div>`);
  writeFileSync(join(DIST, '404.html'), html);
}

// ── sitemap.xml ──
let lastmodMissing = 0;
const sitemapEntries = Object.keys(routes)
  .sort()
  .map(path => {
    const date = lastmod[path] ?? (lastmodMissing++, today);
    return `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${date}</lastmod>\n  </url>`;
  })
  .join('\n');
writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`);

console.log(`Pre-rendered ${count} pages from the React tree (+ 404.html)`);
console.log(`Generated sitemap.xml with ${Object.keys(routes).length} URLs${lastmodMissing ? ` (${lastmodMissing} without a lastmod snapshot; run npm run seo:lastmod)` : ''}`);
