/**
 * SEO lint — deterministic checks against the prerendered site in `dist/`.
 *
 * Run after `npm run build` (which runs vite + scripts/prerender.ts):
 *   npm run seo:lint            # errors fail the run, warnings are printed
 *   npm run seo:lint -- --strict           # warnings also fail the run
 *   npm run seo:lint -- --update-routes    # refresh scripts/seo/routes.json
 *
 * What it checks (E = error, W = warning):
 *   E  every page has exactly one <title>, one meta description, one canonical
 *   E  canonical matches the page's own URL; no noindex
 *   E  no two pages share a title or description
 *   E  exactly one <h1> per page
 *   E  every JSON-LD block parses and has @context + @type; FAQPage entries are non-empty
 *   E  every internal link (href="/...") resolves to a prerendered page, a public file,
 *      or a vercel.json redirect
 *   W  internal links that point at a redirect source (link the final URL instead)
 *   E  sitemap.xml lists every prerendered page and nothing else
 *   E  a route present in scripts/seo/routes.json disappeared with no redirect in vercel.json
 *   E  slugs are unique across blog posts, services, and locations
 *   E  blog post dates parse ("March 2025" style)
 *   E/W signed Supabase image URLs: error if expired, warning if expiring within 180 days
 *   W  title > 60 chars, description > 155 chars or < 70 chars
 *
 * No network access, no LLM. Meant to gate every PR that touches src/data or the prerender.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from '../src/data/blog.ts';
import { locations } from '../src/data/locations.ts';
import { services } from '../src/data/services.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const PUBLIC = join(ROOT, 'public');
const ROUTES_SNAPSHOT = join(__dirname, 'seo', 'routes.json');
const SITE_URL = 'https://sanantoniostucco.com';

const TITLE_MAX = 60;
const DESC_MAX = 155;
const DESC_MIN = 70;
const SIGNED_URL_WARN_DAYS = 180;

const args = new Set(process.argv.slice(2));
const STRICT = args.has('--strict');
const UPDATE_ROUTES = args.has('--update-routes');

// ── Reporting ──

interface Finding { level: 'error' | 'warn'; page: string; message: string }
const findings: Finding[] = [];
const error = (page: string, message: string) => findings.push({ level: 'error', page, message });
const warn = (page: string, message: string) => findings.push({ level: 'warn', page, message });

// ── Helpers ──

function walkPages(dir: string, out: Map<string, string> = new Map()): Map<string, string> {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === 'assets') continue;
      walkPages(full, out);
    } else if (name === 'index.html') {
      const rel = relative(DIST, dirname(full)).replace(/\\/g, '/');
      out.set(rel ? `/${rel}` : '/', readFileSync(full, 'utf8'));
    }
  }
  return out;
}

function all(re: RegExp, html: string): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  while ((m = r.exec(html)) !== null) out.push(m[1] ?? m[0]);
  return out;
}

function decodeEntities(s: string): string {
  return s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function tag(html: string, re: RegExp): string[] {
  return all(re, html).map(decodeEntities);
}

/** Pull the `exp` claim from a Supabase signed-URL token without verifying it. */
function signedUrlExpiry(url: string): Date | null {
  const m = url.match(/[?&]token=([^&"'\s]+)/);
  if (!m) return null;
  const parts = m[1].split('.');
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    return typeof payload.exp === 'number' ? new Date(payload.exp * 1000) : null;
  } catch {
    return null;
  }
}

// ── Load inputs ──

if (!existsSync(DIST) || !existsSync(join(DIST, 'sitemap.xml'))) {
  console.error('dist/ or dist/sitemap.xml is missing. Run `npm run build` first.');
  process.exit(2);
}

const pages = walkPages(DIST);
const pagePaths = new Set(pages.keys());

const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8')) as {
  redirects?: { source: string; destination: string; has?: unknown[] }[];
};
const redirectSources = new Set<string>();
const redirectPatterns: RegExp[] = [];
for (const r of vercel.redirects ?? []) {
  if (r.has) continue; // host/header-conditioned (e.g. www → apex); does not apply to same-host links
  if (/[:(]/.test(r.source)) {
    // Vercel path-to-regexp style: turn `/:name(a|b)/:other` into a regex.
    const re = r.source
      .replace(/\/:[a-zA-Z0-9_]+\(([^)]*)\)/g, (_m, alts: string) => `/(?:${alts})`)
      .replace(/\/:[a-zA-Z0-9_]+/g, '/[^/]+');
    redirectPatterns.push(new RegExp(`^${re}$`));
  } else {
    redirectSources.add(r.source);
  }
}
const isRedirected = (p: string) => redirectSources.has(p) || redirectPatterns.some(re => re.test(p));

const publicFiles = new Set(readdirSync(PUBLIC).map(f => `/${f}`));

const signedChecked = new Set<string>();
function checkSignedUrl(where: string, url: string) {
  if (signedChecked.has(url)) return;
  signedChecked.add(url);
  const exp = signedUrlExpiry(url);
  if (!exp) return;
  const days = Math.floor((exp.getTime() - Date.now()) / 86_400_000);
  const short = url.replace(/\?.*$/, '').replace(/.*\//, '');
  if (days < 0) error(where, `signed image URL has expired (${short}, expired ${exp.toISOString().slice(0, 10)})`);
  else if (days < SIGNED_URL_WARN_DAYS) warn(where, `signed image URL expires in ${days} days (${short}); move it to a public bucket`);
}

// ── Per-page checks ──

const seenTitles = new Map<string, string>();
const seenDescriptions = new Map<string, string>();

for (const [path, html] of pages) {
  const titles = tag(html, /<title>([^<]*)<\/title>/);
  const descriptions = tag(html, /<meta\s+name="description"\s+content="([^"]*)"/);
  const canonicals = tag(html, /<link\s+rel="canonical"\s+href="([^"]*)"/);
  const robots = tag(html, /<meta\s+name="robots"\s+content="([^"]*)"/);
  const h1s = all(/<h1[^>]*>([\s\S]*?)<\/h1>/, html);

  if (titles.length !== 1) error(path, `expected 1 <title>, found ${titles.length}`);
  if (descriptions.length !== 1) error(path, `expected 1 meta description, found ${descriptions.length}`);
  if (canonicals.length !== 1) error(path, `expected 1 canonical, found ${canonicals.length}`);
  if (h1s.length !== 1) error(path, `expected 1 <h1>, found ${h1s.length}`);
  if (robots.some(r => /noindex/i.test(r))) error(path, 'page is marked noindex');

  const title = titles[0] ?? '';
  const description = descriptions[0] ?? '';
  const canonical = canonicals[0] ?? '';

  if (canonical && canonical !== `${SITE_URL}${path}`) error(path, `canonical is ${canonical}, expected ${SITE_URL}${path}`);

  if (title) {
    if (title.length > TITLE_MAX) warn(path, `title is ${title.length} chars (max ${TITLE_MAX}): "${title}"`);
    const prev = seenTitles.get(title);
    if (prev) error(path, `duplicate title also used by ${prev}: "${title}"`);
    else seenTitles.set(title, path);
  }
  if (description) {
    if (description.length > DESC_MAX) warn(path, `description is ${description.length} chars (max ${DESC_MAX})`);
    if (description.length < DESC_MIN) warn(path, `description is ${description.length} chars (min ${DESC_MIN})`);
    const prev = seenDescriptions.get(description);
    if (prev) error(path, `duplicate description also used by ${prev}`);
    else seenDescriptions.set(description, path);
  }

  // JSON-LD
  for (const raw of all(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, html)) {
    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      error(path, `JSON-LD does not parse: ${(e as Error).message}`);
      continue;
    }
    const blocks = Array.isArray(data) ? data : [data];
    for (const b of blocks as Record<string, unknown>[]) {
      if (!b['@context'] || !b['@type']) error(path, 'JSON-LD block is missing @context or @type');
      if (b['@type'] === 'FAQPage') {
        const entities = (b.mainEntity as { name?: string; acceptedAnswer?: { text?: string } }[]) ?? [];
        if (!entities.length) error(path, 'FAQPage schema has no questions');
        for (const q of entities) {
          if (!q.name?.trim() || !q.acceptedAnswer?.text?.trim()) error(path, 'FAQPage entry has an empty question or answer');
        }
      }
    }
  }

  // Internal links
  for (const href of tag(html, /href="(\/[^"#?]*)/)) {
    if (href.startsWith('/assets/') || href.startsWith('/src/')) continue;
    const target = href.length > 1 && href.endsWith('/') ? href.slice(0, -1) : href;
    if (pagePaths.has(target) || publicFiles.has(target)) continue;
    if (isRedirected(target)) {
      warn(path, `links to redirected URL ${target}; link the destination directly`);
      continue;
    }
    error(path, `broken internal link ${href}`);
  }

  // Signed image URLs in this page (og:image, preloads, inline content)
  for (const url of new Set(all(/https:\/\/[^"'\s]+supabase\.co\/[^"'\s]+token=[^"'\s]+/, html))) {
    checkSignedUrl(path, url);
  }
}

// ── Sitemap ──

const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const sitemapPaths = new Set(
  all(/<loc>([^<]+)<\/loc>/, sitemap).map(loc => {
    if (!loc.startsWith(SITE_URL)) { error('sitemap.xml', `URL outside site: ${loc}`); return loc; }
    const p = loc.slice(SITE_URL.length) || '/';
    return p;
  }),
);
for (const p of pagePaths) if (!sitemapPaths.has(p)) error('sitemap.xml', `prerendered page ${p} is missing from the sitemap`);
for (const p of sitemapPaths) if (!pagePaths.has(p)) error('sitemap.xml', `sitemap lists ${p} but no page was prerendered`);

// ── Route snapshot: removed URLs must redirect somewhere ──

if (UPDATE_ROUTES) {
  writeFileSync(ROUTES_SNAPSHOT, JSON.stringify([...pagePaths].sort(), null, 2) + '\n');
  console.log(`Updated ${relative(ROOT, ROUTES_SNAPSHOT)} with ${pagePaths.size} routes`);
} else if (existsSync(ROUTES_SNAPSHOT)) {
  const known = JSON.parse(readFileSync(ROUTES_SNAPSHOT, 'utf8')) as string[];
  for (const p of known) {
    if (!pagePaths.has(p) && !isRedirected(p)) {
      error(p, 'route was removed and has no redirect in vercel.json (add one, or run --update-routes if intentional)');
    }
  }
  const added = [...pagePaths].filter(p => !known.includes(p));
  if (added.length) warn('routes.json', `new routes not in snapshot (run --update-routes to record them): ${added.join(', ')}`);
} else {
  warn('routes.json', 'no route snapshot found; run with --update-routes to create one');
}

// ── Source data checks ──

const slugOwners = new Map<string, string>();
function claimSlug(slug: string, owner: string) {
  const prev = slugOwners.get(slug);
  if (prev) error(owner, `slug "${slug}" is also used by ${prev}`);
  else slugOwners.set(slug, owner);
}
for (const s of services) claimSlug(s.slug, `services.ts`);
for (const l of locations) claimSlug(l.slug, `locations.ts`);
const blogSlugs = new Set<string>();
for (const p of blogPosts) {
  if (blogSlugs.has(p.slug)) error('blog.ts', `duplicate blog slug "${p.slug}"`);
  blogSlugs.add(p.slug);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) error('blog.ts', `blog slug "${p.slug}" is not lowercase-kebab-case`);
  if (Number.isNaN(Date.parse(`1 ${p.date}`))) error('blog.ts', `blog post "${p.slug}" has an unparseable date "${p.date}"`);
  if (!p.excerpt?.trim()) error('blog.ts', `blog post "${p.slug}" has no excerpt`);
  if (!p.content?.length) error('blog.ts', `blog post "${p.slug}" has no content`);
  if (p.relatedService && !pagePaths.has(p.relatedService)) error('blog.ts', `blog post "${p.slug}" relatedService ${p.relatedService} is not a page`);
  if (p.image) checkSignedUrl(`blog.ts (${p.slug})`, p.image);
}
for (const slug of ['services', 'service-areas', 'quote', 'about', 'blog']) {
  if (slugOwners.has(slug)) error('data', `slug "${slug}" collides with a static route`);
}

// ── Report ──

const errors = findings.filter(f => f.level === 'error');
const warnings = findings.filter(f => f.level === 'warn');

for (const f of findings) {
  console.log(`${f.level === 'error' ? '✖' : '⚠'} ${f.page}  ${f.message}`);
}
console.log(`\nSEO lint: ${pages.size} pages, ${errors.length} error(s), ${warnings.length} warning(s)${STRICT ? ' [strict]' : ''}`);

if (errors.length || (STRICT && warnings.length)) process.exit(1);
