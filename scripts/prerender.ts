import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { services } from '../src/data/services.ts';
import { locations } from '../src/data/locations.ts';
import { serviceLocationData } from '../src/data/serviceLocationData.ts';
import { blogPosts } from '../src/data/blog.ts';
import { contact } from '../src/data/contact.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const SITE_URL = 'https://sanantoniostucco.com';
const SITE_NAME = 'San Antonio Stucco';
const OG_IMAGE = 'https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/san-antonio-stucco.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vc2FuLWFudG9uaW8tc3R1Y2NvLnBuZyIsImlhdCI6MTc3NzU3ODEzOSwiZXhwIjoxODA5MTE0MTM5fQ.1hP43qIGRyXlwLX02o92zUXeVzuLUpxvJDbBl_Ley_M';

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

function breadcrumb(items: [string, string][]): string {
  return `<nav aria-label="Breadcrumb">${items.map(([href, label], i) =>
    i < items.length - 1
      ? `<a href="${href}">${esc(label)}</a> › `
      : `<span>${esc(label)}</span>`
  ).join('')}</nav>`;
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

function ctaBlock(): string {
  return `<p>Call <a href="tel:${contact.phoneRaw}">${contact.phone}</a> for a free estimate. Email <a href="mailto:${contact.email}">${contact.email}</a>.</p>`;
}

function faqHtml(faqs: { question: string; answer: string }[], heading: string): string {
  if (!faqs.length) return '';
  return `<section><h2>${esc(heading)}</h2>${faqs.map(f =>
    `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`
  ).join('')}</section>`;
}

const PRIORITY_SERVICES = ['stucco-installation', 'stucco-repairs', 'stucco-replacement'];
const PRIORITY_GEO_PAGES = [
  { path: '/stucco-contractor-san-antonio', label: 'Stucco Contractor in San Antonio' },
  { path: '/stucco-repair-san-antonio', label: 'Stucco Repair in San Antonio' },
  { path: '/stucco-installation-san-antonio', label: 'Stucco Installation in San Antonio' },
];

const blogServiceMap: Record<string, string[]> = {
  'how-san-antonio-weather-affects-stucco': ['stucco-repairs', 'stucco-installation'],
  'eifs-vs-traditional-stucco-differences': ['eifs-synthetic-stucco', 'stucco-installation'],
  'stucco-maintenance-tips': ['stucco-repairs', 'stucco-painting'],
  'when-to-repair-vs-replace-stucco': ['stucco-repairs', 'stucco-replacement'],
  'diy-vs-professional-stucco-repair': ['stucco-repairs', 'stucco-replacement'],
  'stucco-color-trends': ['stucco-painting', 'stucco-remodeling'],
  'energy-efficiency-stucco-homes': ['stucco-installation', 'residential-stucco'],
  'commercial-stucco-considerations': ['commercial-stucco', 'stucco-installation'],
  'stucco-moisture-problems': ['stucco-repairs', 'eifs-synthetic-stucco'],
  'choosing-right-stucco-finish': ['stucco-installation', 'stucco-painting'],
  'stucco-vs-other-exteriors': ['stucco-installation', 'residential-stucco'],
  'stucco-building-codes-permits': ['stucco-installation', 'commercial-stucco'],
};

// ── Content Generators ──

function renderHomePage(): string {
  const homeFaqs = [
    { question: 'How much does stucco cost in San Antonio?', answer: 'Stucco repairs typically range from $300–$5,000 depending on the scope of damage. New stucco installation runs $8–$15 per square foot, and full replacement ranges from $10–$18 per square foot. We provide free on-site estimates with exact pricing.' },
    { question: 'How long does stucco installation take?', answer: 'Most residential stucco installations take 1–3 weeks depending on the size of the project and weather conditions. Our three-coat system requires proper curing time between coats to ensure long-term durability in San Antonio\'s climate.' },
    { question: 'Do you offer warranties on stucco work?', answer: 'Yes. We offer workmanship warranties on all stucco installations and repairs. The exact warranty terms depend on the scope of the project and are provided in writing before work begins.' },
    { question: 'What areas do you serve?', answer: 'We serve San Antonio and surrounding communities including Boerne, New Braunfels, Schertz, Helotes, Stone Oak, Alamo Heights, Live Oak, Universal City, Leon Valley, and Selma.' },
    { question: 'How do I know if my stucco needs repair?', answer: 'Common signs include visible cracks, discoloration or staining, areas that sound hollow when tapped, bubbling or blistering, and moisture or mold near stucco walls. If you notice any of these, contact us for a free inspection.' },
    { question: 'How do I find a stucco contractor near me in San Antonio?', answer: 'San Antonio Stucco is a locally owned, licensed, and insured stucco contractor serving the entire San Antonio metro area. Call (210) 871-8490 for a free estimate.' },
    { question: 'What is stucco repair near me going to cost?', answer: 'Minor stucco crack repairs in San Antonio typically start around $300–$800. Larger repairs involving water damage, delamination, or structural issues can range from $1,500–$5,000+. We provide free on-site estimates so you know the exact cost before work begins.' },
  ];

  const crumbs: [string, string][] = [['/', 'Home']];
  return `<article>
${breadcrumb(crumbs)}
<h1>San Antonio's Trusted Stucco Contractor</h1>
<p>Expert stucco repair, installation &amp; finishing. Serving San Antonio &amp; surrounding areas. Licensed &amp; insured.</p>
<p>Looking for a stucco contractor near me in San Antonio? ${SITE_NAME} provides professional stucco services for residential and commercial properties throughout the greater San Antonio metro area. From crack repair to full installations, our experienced crew delivers results built to last in South Texas conditions.</p>
<section><h2>Most Searched Stucco Services in San Antonio</h2>
<ul>
${PRIORITY_GEO_PAGES.map(p => `<li><a href="${p.path}">${esc(p.label)}</a></li>`).join('\n')}
${PRIORITY_SERVICES.map(slug => {
  const s = services.find(x => x.slug === slug)!;
  return `<li><a href="/${slug}/san-antonio">${esc(s.name)} in San Antonio</a></li>`;
}).join('\n')}
</ul>
</section>
<section><h2>Our Stucco Services</h2>
<ul>${services.map(s => `<li><a href="/${s.slug}">${esc(s.name)}</a> — ${esc(s.shortDescription)}</li>`).join('')}</ul>
</section>
<section><h2>Stucco Cost in San Antonio — What to Expect</h2>
<ul>
<li>Stucco Repairs: $300–$5,000</li>
<li>Stucco Installation: $8–$15 per sq ft</li>
<li>Stucco Replacement: $10–$18 per sq ft</li>
</ul>
</section>
<section><h2>Why San Antonio Homeowners Trust Us for Stucco</h2>
<p>San Antonio's climate — triple-digit summers, Gulf humidity, UV exposure, and expansive clay soils — puts enormous stress on exterior finishes. We build stucco systems specifically engineered for these conditions, using commercial-grade materials and techniques aligned with <a href="https://www.cement.org/learn/concrete-technology/concrete-construction/stucco-portland-cement-plaster" rel="noopener">Portland Cement Association standards</a> for three-coat portland cement plaster systems.</p>
<p>Every project is handled by our own crew — no subcontractors. We are licensed, insured, and locally owned.</p>
</section>
<section><h2>Texas Climate Is Tough on Stucco</h2>
<ul><li>Extreme Heat: Summer surface temperatures above 150°F cause thermal cycling and cracking</li>
<li>High Humidity: Gulf moisture promotes mold and tests moisture barriers</li>
<li>UV Exposure: Intense sun degrades finishes and breaks down elastomeric coatings</li></ul>
</section>
${faqHtml(homeFaqs, 'Frequently Asked Questions')}
<section><h2>Stucco Throughout the San Antonio Metro</h2>
<ul>${locations.map(l => `<li><a href="/${l.slug}">Stucco Contractor in ${esc(l.name)}</a></li>`).join('')}</ul>
</section>
${ctaBlock()}
${faqSchema(homeFaqs)}
${breadcrumbSchema(crumbs)}
${localBusinessSchema()}
</article>`;
}

function renderServicePage(service: typeof services[0]): string {
  const crumbs: [string, string][] = [['/', 'Home'], ['/services', 'Services'], [`/${service.slug}`, service.name]];
  return `<article>
${breadcrumb(crumbs)}
<h1>${esc(service.heroHeadline)}</h1>
<p>${esc(service.heroDescription)}</p>
<section><h2>About ${esc(service.name)} in San Antonio</h2>
${service.overview.map(p => `<p>${esc(p)}</p>`).join('\n')}
</section>
<section><h2>${esc(service.whyItMatters.heading)}</h2>
${service.whyItMatters.paragraphs.map(p => `<p>${esc(p)}</p>`).join('\n')}
</section>
<section><h2>Why Choose ${SITE_NAME} for ${esc(service.name)}</h2>
<ul>${service.benefits.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
</section>
<section><h2>${esc(service.process.heading)}</h2>
<ol>${service.process.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
</section>
${service.commonSigns ? `<section><h2>Signs You May Need ${esc(service.name)}</h2>
<ul>${service.commonSigns.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
</section>` : ''}
<section><h2>Why Hire a Professional for ${esc(service.name)} in San Antonio</h2>
<ul>${service.whyProfessional.map(w => `<li>${esc(w)}</li>`).join('')}</ul>
</section>
${service.costTimeline ? `<section><h2>How Much Does ${esc(service.name)} Cost in San Antonio?</h2>
<ul>${service.costTimeline.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
</section>` : ''}
<section><h2>${esc(service.painPoints.heading)}</h2>
<p>${esc(service.painPoints.description)}</p>
<ul>${service.painPoints.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
</section>
${faqHtml(service.faqs, `${service.name} FAQ`)}
<section><h2>${esc(service.name)} Across San Antonio</h2>
<p><strong>Featured:</strong> <a href="/${service.slug}/san-antonio">${esc(service.name)} in San Antonio</a> — our most requested service area.</p>
<ul>${locations.filter(l => l.slug !== 'san-antonio').map(l => `<li><a href="/${service.slug}/${l.slug}">${esc(service.name)} in ${esc(l.name)}</a></li>`).join('')}</ul>
</section>
<section><h2>Related Articles</h2>
<ul>${blogPosts.filter(p => {
  const mapped = blogServiceMap[p.slug];
  return mapped && mapped.includes(service.slug);
}).slice(0, 3).map(p => `<li><a href="/blog/${p.slug}">${esc(p.title)}</a></li>`).join('')}</ul>
</section>
${ctaBlock()}
${faqSchema(service.faqs)}
${breadcrumbSchema(crumbs)}
</article>`;
}

function renderLocationPage(location: typeof locations[0]): string {
  const crumbs: [string, string][] = [['/', 'Home'], ['/service-areas', 'Service Areas'], [`/${location.slug}`, location.name]];
  return `<article>
${breadcrumb(crumbs)}
<h1>${esc(location.heroHeadline)}</h1>
<p>${esc(location.heroDescription)}</p>
<section><h2>Why ${esc(location.name)} Homeowners Choose Us</h2>
<p>${esc(location.localInfo)}</p>
${(location.extendedContent || []).map(p => `<p>${p}</p>`).join('\n')}
</section>
<section><h2>Services Available in ${esc(location.name)}</h2>
<ul>${services.map(s => `<li><a href="/${s.slug}/${location.slug}">${esc(s.name)} in ${esc(location.name)}</a></li>`).join('')}</ul>
</section>
<section><h2>Local Climate Challenges in ${esc(location.name)}</h2>
<ul>${location.painPoints.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
</section>
${faqHtml(location.faqs, `${location.name} Stucco FAQ`)}
<section><h2>Other Areas We Serve</h2>
<ul>${locations.filter(l => l.slug !== location.slug).map(l => `<li><a href="/${l.slug}">Stucco Contractor in ${esc(l.name)}</a></li>`).join('')}</ul>
</section>
<section><h2>Learn More</h2>
<ul>
${PRIORITY_GEO_PAGES.map(p => `<li><a href="${p.path}">${esc(p.label)}</a></li>`).join('\n')}
<li><a href="/blog">Stucco Tips &amp; Resources</a></li>
</ul>
</section>
${ctaBlock()}
${faqSchema(location.faqs)}
${breadcrumbSchema(crumbs)}
</article>`;
}

function renderComboPage(service: typeof services[0], location: typeof locations[0], data: typeof serviceLocationData[0]): string {
  const crumbs: [string, string][] = [['/', 'Home'], [`/${service.slug}`, service.name], [`/${service.slug}/${location.slug}`, location.name]];
  return `<article>
${breadcrumb(crumbs)}
<h1>${esc(service.name)} in ${esc(location.name)}, TX</h1>
<p>${esc(data.paragraphs[0])}</p>
<section><h2>${esc(service.name)} in ${esc(location.name)}</h2>
${data.paragraphs.slice(1).map(p => `<p>${esc(p)}</p>`).join('\n')}
</section>
<section><h2>Why Choose Us for ${esc(service.name)} in ${esc(location.name)}</h2>
<ul>${service.benefits.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
</section>
<section><h2>${esc(location.name)} Climate Challenges for Stucco</h2>
<ul>${location.painPoints.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
</section>
${faqHtml(data.faqs, `${service.name} FAQ — ${location.name}`)}
<section><h2>Other Stucco Services in ${esc(location.name)}</h2>
<ul>${services.filter(s => s.slug !== service.slug).map(s => `<li><a href="/${s.slug}/${location.slug}">${esc(s.name)} in ${esc(location.name)}</a></li>`).join('')}</ul>
</section>
<section><h2>${esc(service.name)} Across San Antonio</h2>
<ul>${locations.filter(l => l.slug !== location.slug).map(l => `<li><a href="/${service.slug}/${l.slug}">${esc(service.name)} in ${esc(l.name)}</a></li>`).join('')}</ul>
</section>
${location.slug !== 'san-antonio' ? `<p>See also: <a href="/${service.slug}/san-antonio">${esc(service.name)} in San Antonio</a> | <a href="/${location.slug}">All services in ${esc(location.name)}</a></p>` : `<p>See also: <a href="/stucco-contractor-san-antonio">Stucco Contractor in San Antonio</a> | <a href="/${service.slug}">${esc(service.name)} — All Locations</a></p>`}
<section><h2>Related Articles</h2>
<ul>${blogPosts.filter(p => {
  const mapped = blogServiceMap[p.slug];
  return mapped && mapped.includes(service.slug);
}).slice(0, 3).map(p => `<li><a href="/blog/${p.slug}">${esc(p.title)}</a></li>`).join('')}
${blogPosts.filter(p => {
  const mapped = blogServiceMap[p.slug];
  return mapped && mapped.includes(service.slug);
}).length === 0 ? `<li><a href="/blog">Stucco Tips &amp; Resources</a></li>` : ''}
</ul>
</section>
${ctaBlock()}
${faqSchema(data.faqs)}
${breadcrumbSchema(crumbs)}
</article>`;
}

function renderBlogPost(post: typeof blogPosts[0]): string {
  const crumbs: [string, string][] = [['/', 'Home'], ['/blog', 'Blog'], [`/blog/${post.slug}`, post.title]];
  return `<article>
${breadcrumb(crumbs)}
<h1>${esc(post.title)}</h1>
<p><time>${esc(post.date)}</time> · ${esc(post.category)}</p>
${post.content.map(c => c.startsWith('## ') ? `<h2>${esc(c.slice(3))}</h2>` : `<p>${c}</p>`).join('\n')}
<section><h2>Related Services</h2>
<ul>${(() => {
  const mapped = blogServiceMap[post.slug] || [];
  const links = mapped.flatMap(slug => {
    const s = services.find(x => x.slug === slug);
    if (!s) return [];
    return [
      `<li><a href="/${slug}">${esc(s.name)}</a></li>`,
      `<li><a href="/${slug}/san-antonio">${esc(s.name)} in San Antonio</a></li>`,
    ];
  });
  return links.length ? links.join('') : `<li><a href="/services">View All Stucco Services</a></li>`;
})()}</ul>
</section>
${ctaBlock()}
${breadcrumbSchema(crumbs)}
</article>`;
}

function renderBlogListing(): string {
  const crumbs: [string, string][] = [['/', 'Home'], ['/blog', 'Blog']];
  return `<article>
${breadcrumb(crumbs)}
<h1>Stucco Tips &amp; Resources</h1>
<p>Expert stucco tips, guides, and advice from ${SITE_NAME}. Learn about stucco repair, installation, maintenance, and more.</p>
<section>
${blogPosts.map(p => `<h2><a href="/blog/${p.slug}">${esc(p.title)}</a></h2><p>${esc(p.excerpt)}</p>`).join('\n')}
</section>
<section><h2>Learn More About Our Services</h2>
<ul>${services.map(s => `<li><a href="/${s.slug}">${esc(s.name)}</a></li>`).join('')}</ul>
</section>
${ctaBlock()}
${breadcrumbSchema(crumbs)}
</article>`;
}

function renderServicesPage(): string {
  const crumbs: [string, string][] = [['/', 'Home'], ['/services', 'Services']];
  return `<article>
${breadcrumb(crumbs)}
<h1>Our Stucco Services in San Antonio, TX</h1>
<p>Complete stucco services in San Antonio: installation, repair, replacement, EIFS, painting, and remodeling for homes and businesses.</p>
<section>
${services.map(s => `<h2><a href="/${s.slug}">${esc(s.name)}</a></h2><p>${esc(s.shortDescription)}</p>`).join('\n')}
</section>
<section><h2>Available Throughout San Antonio</h2>
<ul>${locations.map(l => `<li><a href="/${l.slug}">${esc(l.name)}</a></li>`).join('')}</ul>
</section>
${ctaBlock()}
${breadcrumbSchema(crumbs)}
</article>`;
}

function renderServiceAreasPage(): string {
  const crumbs: [string, string][] = [['/', 'Home'], ['/service-areas', 'Service Areas']];
  return `<article>
${breadcrumb(crumbs)}
<h1>Service Areas</h1>
<p>${SITE_NAME} serves San Antonio, Boerne, New Braunfels, Schertz, Helotes, Stone Oak, Alamo Heights, and surrounding communities.</p>
<section>
${locations.map(l => `<h2><a href="/${l.slug}">Stucco Contractor in ${esc(l.name)}, TX</a></h2><p>${esc(l.description)}</p>`).join('\n')}
</section>
<section><h2>Services Available in All Areas</h2>
<ul>${services.map(s => `<li><a href="/${s.slug}">${esc(s.name)}</a></li>`).join('')}</ul>
</section>
${ctaBlock()}
${breadcrumbSchema(crumbs)}
</article>`;
}

function renderAboutPage(): string {
  const crumbs: [string, string][] = [['/', 'Home'], ['/about', 'About']];
  return `<article>
${breadcrumb(crumbs)}
<h1>San Antonio's Trusted Stucco Experts</h1>
<p>San Antonio Stucco is a locally owned stucco contractor serving the greater San Antonio metro area. We specialize in stucco installation, repair, replacement, EIFS, and painting for residential and commercial properties.</p>
<p>Our team brings years of hands-on experience working exclusively with stucco in South Texas. We understand the unique challenges that San Antonio's climate presents — from extreme heat and UV exposure to Gulf humidity and expansive clay soils — and we engineer every project to withstand them.</p>
<section><h2>Our Values</h2>
<ul>
<li>Quality First — We use commercial-grade materials and proven techniques on every project</li>
<li>Client Focused — Clear communication, on-time starts, clean job sites, and no surprises</li>
<li>Reliable &amp; Punctual — We show up when we say we will and finish on schedule</li>
<li>Built for Texas — Every system is engineered for South Texas heat, humidity, and soil conditions</li>
</ul>
</section>
<section><h2>What Sets Us Apart</h2>
<ul>
<li>Licensed, bonded, and insured</li>
<li>Deep knowledge of San Antonio climate challenges</li>
<li>Own crew — no subcontractors</li>
<li>Commercial-grade materials rated for South Texas</li>
<li>Free on-site estimates with transparent pricing</li>
<li>Workmanship warranty on all projects</li>
</ul>
</section>
<section><h2>Our Professional Services</h2>
<ul>${services.map(s => `<li><a href="/${s.slug}">${esc(s.name)}</a></li>`).join('')}</ul>
</section>
<section><h2>Where We Work</h2>
<ul>${locations.map(l => `<li><a href="/${l.slug}">${esc(l.name)}</a></li>`).join('')}</ul>
</section>
${ctaBlock()}
${breadcrumbSchema(crumbs)}
</article>`;
}

function renderQuotePage(): string {
  const crumbs: [string, string][] = [['/', 'Home'], ['/quote', 'Free Estimate']];
  return `<article>
${breadcrumb(crumbs)}
<h1>Get Your Free Stucco Estimate</h1>
<p>Request a free stucco estimate from ${SITE_NAME}. We provide detailed, transparent quotes for all residential and commercial stucco projects throughout San Antonio and surrounding areas.</p>
<section><h2>Contact Information</h2>
<ul>
<li>Phone: <a href="tel:${contact.phoneRaw}">${contact.phone}</a></li>
<li>Email: <a href="mailto:${contact.email}">${contact.email}</a></li>
<li>Address: ${esc(contact.address)}</li>
<li>Hours: ${esc(contact.hours)}</li>
<li>Service Area: ${esc(contact.areas)}</li>
</ul>
</section>
<section><h2>What to Expect</h2>
<ol>
<li>Call us or submit the form to request your free estimate</li>
<li>We schedule a convenient on-site visit to assess your project</li>
<li>Receive a detailed written estimate with transparent pricing</li>
<li>Once approved, we schedule your project and get to work</li>
</ol>
</section>
<section><h2>Not Sure Which Service You Need?</h2>
<ul>${services.map(s => `<li><a href="/${s.slug}">${esc(s.name)}</a></li>`).join('')}</ul>
</section>
${breadcrumbSchema(crumbs)}
</article>`;
}

function renderStaticSeoPage(path: string, title: string, description: string): string {
  const crumbs: [string, string][] = [['/', 'Home'], [path, title.split(' | ')[0]]];
  return `<article>
${breadcrumb(crumbs)}
<h1>${esc(title.split(' | ')[0])}</h1>
<p>${esc(description)}</p>
<section><h2>Our Services</h2>
<ul>${services.map(s => `<li><a href="/${s.slug}">${esc(s.name)}</a></li>`).join('')}</ul>
</section>
<section><h2>Areas We Serve</h2>
<ul>${locations.map(l => `<li><a href="/${l.slug}">${esc(l.name)}</a></li>`).join('')}</ul>
</section>
${ctaBlock()}
${breadcrumbSchema(crumbs)}
</article>`;
}

// ── Route Map ──

interface RouteEntry {
  title: string;
  description: string;
  content: string;
}

const routes: Record<string, RouteEntry> = {};

// Homepage
routes['/'] = {
  title: `Stucco Contractor San Antonio TX | ${SITE_NAME}`,
  description: 'San Antonio\'s trusted stucco contractor. Expert installation, repair, EIFS, and painting for residential & commercial properties. Licensed & insured. Call (210) 871-8490.',
  content: renderHomePage(),
};

// Services listing
routes['/services'] = {
  title: `Our Stucco Services | ${SITE_NAME}`,
  description: 'Complete stucco services in San Antonio: installation, repair, replacement, EIFS, painting, and remodeling for homes and businesses. Free estimates — call (210) 871-8490.',
  content: renderServicesPage(),
};

// Service areas listing
routes['/service-areas'] = {
  title: `Service Areas | ${SITE_NAME}`,
  description: 'San Antonio Stucco serves San Antonio, Boerne, New Braunfels, Schertz, Helotes, Stone Oak, Alamo Heights, and surrounding communities. Call (210) 871-8490.',
  content: renderServiceAreasPage(),
};

// Quote
routes['/quote'] = {
  title: `Get a Free Estimate | ${SITE_NAME}`,
  description: 'Request a free stucco estimate from San Antonio Stucco. Residential & commercial projects throughout San Antonio and surrounding areas. Call (210) 871-8490.',
  content: renderQuotePage(),
};

// About
routes['/about'] = {
  title: `About Us | ${SITE_NAME}`,
  description: 'Learn about San Antonio Stucco — locally owned, licensed & insured stucco contractor serving the greater San Antonio metro area.',
  content: renderAboutPage(),
};

// Blog listing
routes['/blog'] = {
  title: `Stucco Blog | ${SITE_NAME}`,
  description: 'Expert stucco tips, guides, and advice from San Antonio Stucco. Learn about stucco repair, installation, maintenance, and more.',
  content: renderBlogListing(),
};

// Standalone geo landing pages
const geoPages: Record<string, { title: string; description: string }> = {
  '/stucco-repair': {
    title: `Stucco Repair Services | ${SITE_NAME}`,
    description: 'Professional stucco repair in San Antonio. We fix cracks, water damage, holes, and delamination. Licensed & insured. Free estimates — call (210) 871-8490.',
  },
  '/stucco-contractor-san-antonio': {
    title: `Stucco Contractor San Antonio TX | Licensed & Insured | ${SITE_NAME}`,
    description: 'Looking for a stucco contractor in San Antonio? Licensed, insured, locally owned. Expert repair, installation & EIFS. Free estimates — call (210) 871-8490.',
  },
  '/stucco-repair-san-antonio': {
    title: `Stucco Repair San Antonio TX | ${SITE_NAME}`,
    description: 'Expert stucco repair in San Antonio, TX. We fix cracks, water damage, and delamination throughout San Antonio. Free estimates — call (210) 871-8490.',
  },
  '/stucco-installation-san-antonio': {
    title: `Stucco Installation San Antonio TX | ${SITE_NAME}`,
    description: 'Professional stucco installation in San Antonio, TX. New construction and additions. Three-coat systems built for South Texas. Call (210) 871-8490.',
  },
  '/eifs-stucco-san-antonio': {
    title: `EIFS Stucco San Antonio TX | ${SITE_NAME}`,
    description: 'EIFS and synthetic stucco services in San Antonio, TX. Installation, repair, and moisture remediation. Free estimates — call (210) 871-8490.',
  },
  '/commercial-stucco-san-antonio': {
    title: `Commercial Stucco San Antonio TX | ${SITE_NAME}`,
    description: 'Commercial stucco contractor in San Antonio, TX. Offices, retail, multi-family, and institutional buildings. Licensed & insured. Call (210) 871-8490.',
  },
};

for (const [path, seo] of Object.entries(geoPages)) {
  routes[path] = { ...seo, content: renderStaticSeoPage(path, seo.title, seo.description) };
}

// Service detail pages
for (const s of services) {
  routes[`/${s.slug}`] = {
    title: `${s.name} in San Antonio, TX | ${SITE_NAME}`,
    description: `Professional ${s.name.toLowerCase()} services in San Antonio, TX. Licensed & insured. Free estimates — call (210) 871-8490.`,
    content: renderServicePage(s),
  };
}

// Location detail pages
for (const l of locations) {
  routes[`/${l.slug}`] = {
    title: `Stucco Contractor in ${l.name}, TX | ${SITE_NAME}`,
    description: `Professional stucco services in ${l.name}, TX. Installation, repair, EIFS, and painting. Licensed & insured. Call (210) 871-8490.`,
    content: renderLocationPage(l),
  };
}

// Service × Location combo pages
for (const entry of serviceLocationData) {
  const s = services.find(x => x.slug === entry.serviceSlug);
  const l = locations.find(x => x.slug === entry.locationSlug);
  if (s && l) {
    routes[`/${entry.serviceSlug}/${entry.locationSlug}`] = {
      title: `${s.name} in ${l.name}, TX | ${SITE_NAME}`,
      description: entry.metaDescription,
      content: renderComboPage(s, l, entry),
    };
  }
}

// Blog posts
for (const post of blogPosts) {
  routes[`/blog/${post.slug}`] = {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    content: renderBlogPost(post),
  };
}

// Plaster article (separate component, not in blogPosts array)
routes['/blog/us-largest-plaster-producer-san-antonio'] = {
  title: `The U.S. Is the World's Largest Plaster Producer — And San Antonio Benefits | ${SITE_NAME}`,
  description: 'Discover why the United States leads global plaster production and how San Antonio homeowners benefit from local access to premium stucco and plaster materials.',
  content: `<article>
${breadcrumb([['/', 'Home'], ['/blog', 'Blog'], ['/blog/us-largest-plaster-producer-san-antonio', "The U.S. Is the World's Largest Plaster Producer"]])}
<h1>The U.S. Is the World's Largest Plaster Producer — And San Antonio Benefits</h1>
<p>The United States produces more gypsum plaster than any other country in the world, with an annual output exceeding 22 million metric tons. This massive domestic production capacity directly benefits San Antonio homeowners and contractors with reliable access to high-quality plaster and stucco materials.</p>
<h2>Why U.S. Plaster Production Matters for San Antonio</h2>
<p>Texas is one of the top gypsum-producing states, with significant mining operations feeding plaster manufacturing plants across the region. This proximity means San Antonio stucco contractors have access to fresh, high-quality materials without the long supply chains and quality inconsistencies that affect other markets.</p>
<h2>The Connection Between Plaster and Stucco</h2>
<p>Traditional stucco is essentially portland cement plaster — a mixture of portland cement, sand, lime, and water applied in multiple coats over a lath system. The quality of these base materials directly impacts the durability and longevity of every stucco installation. With U.S. manufacturers producing to strict ASTM standards, local contractors can specify exact performance characteristics for South Texas conditions.</p>
<h2>What This Means for Your Home</h2>
<p>When you hire a local stucco contractor in San Antonio, you benefit from materials that are manufactured domestically to consistent quality standards, shipped short distances to maintain freshness, and formulated for regional climate conditions. This is one of the many advantages of choosing a contractor who understands both the materials science and the local environment.</p>
<section><h2>Related Services</h2>
<ul>
<li><a href="/stucco-installation">Stucco Installation</a></li>
<li><a href="/stucco-installation/san-antonio">Stucco Installation in San Antonio</a></li>
<li><a href="/stucco-replacement">Stucco Replacement</a></li>
<li><a href="/stucco-contractor-san-antonio">Stucco Contractor in San Antonio</a></li>
</ul>
</section>
${ctaBlock()}
${breadcrumbSchema([['/', 'Home'], ['/blog', 'Blog'], ['/blog/us-largest-plaster-producer-san-antonio', "The U.S. Is the World's Largest Plaster Producer"]])}
</article>`,
};

// ── HTML Injection ──

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

function localBusinessSchema(): string {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://sanantoniostucco.com/#business",
    "name": "San Antonio Stucco",
    "description": "San Antonio's trusted stucco contractor for residential & commercial projects. Expert stucco repair, installation, and EIFS services across the San Antonio, TX area.",
    "url": "https://sanantoniostucco.com",
    "telephone": contact.phone,
    "email": contact.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5802 Rocky Pt Dr",
      "addressLocality": "San Antonio",
      "addressRegion": "TX",
      "postalCode": "78249",
      "addressCountry": "US",
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 29.5574, "longitude": -98.6035 },
    "areaServed": [
      { "@type": "City", "name": "San Antonio", "@id": "https://en.wikipedia.org/wiki/San_Antonio" },
      ...locations.map(l => ({ "@type": "City" as const, "name": l.name })),
    ].filter((v, i, a) => a.findIndex(x => x.name === v.name) === i),
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "08:00", "closes": "14:00" },
    ],
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "87" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Stucco Services",
      "itemListElement": services.map(s => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": s.name },
      })),
    },
  })}</script>`;
}

function injectPage(html: string, path: string, entry: RouteEntry): string {
  const headTags = seoHead(path, entry.title, entry.description);

  return html
    .replace(/<title>[^<]*<\/title>/, '')
    .replace(/<meta\s+name="description"[^>]*>/g, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/g, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/g, '')
    .replace('</head>', `${headTags}\n  </head>`)
    .replace(/<div id="root">\s*<\/div>/, `<div id="root">${entry.content}</div>`);
}

let count = 0;
for (const [path, entry] of Object.entries(routes)) {
  const html = injectPage(template, path, entry);
  const dir = join(DIST, path === '/' ? '' : path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const filePath = path === '/' ? join(DIST, 'index.html') : join(dir, 'index.html');
  writeFileSync(filePath, html);
  count++;
}

console.log(`Pre-rendered ${count} pages with SEO meta + content`);
