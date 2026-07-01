import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const SITE_URL = 'https://sanantoniostucco.com';
const SITE_NAME = 'San Antonio Stucco';
const OG_IMAGE = 'https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/san-antonio-stucco.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vc2FuLWFudG9uaW8tc3R1Y2NvLnBuZyIsImlhdCI6MTc3NzU3ODEzOSwiZXhwIjoxODA5MTE0MTM5fQ.1hP43qIGRyXlwLX02o92zUXeVzuLUpxvJDbBl_Ley_M';

// Load data files (compiled JS imports won't work, so parse TS as text)
function extractArrayFromTS(filePath, exportName) {
  const content = readFileSync(filePath, 'utf8');
  const match = content.match(new RegExp(`export const ${exportName}[^=]*=\\s*`));
  if (!match) return [];
  const start = match.index + match[0].length;
  let depth = 0, i = start;
  for (; i < content.length; i++) {
    if (content[i] === '[' || content[i] === '{') depth++;
    if (content[i] === ']' || content[i] === '}') depth--;
    if (depth === 0 && content[i] === ';') break;
  }
  const jsonStr = content.slice(start, i)
    .replace(/'/g, '"')
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":');
  try { return JSON.parse(jsonStr); } catch { return []; }
}

const SRC = join(__dirname, '..', 'src', 'data');

function parseServiceLocationData(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const exportMatch = raw.match(/export const serviceLocationData[^=]*=\s*/);
  if (!exportMatch) return [];
  const startIdx = raw.indexOf('[', exportMatch.index + exportMatch[0].length);
  if (startIdx === -1) return [];
  let depth = 0, end = startIdx;
  for (; end < raw.length; end++) {
    if (raw[end] === '[') depth++;
    if (raw[end] === ']') { depth--; if (depth === 0) { end++; break; } }
  }
  const jsonStr = raw.slice(startIdx, end);
  try { return JSON.parse(jsonStr); } catch { return []; }
}

const serviceLocationData = parseServiceLocationData(join(SRC, 'serviceLocationData.ts'));

function parseSimpleTS(filePath, varName) {
  const raw = readFileSync(filePath, 'utf8');
  const exportMatch = raw.match(new RegExp(`export const ${varName}[^=]*=\\s*`));
  if (!exportMatch) return [];
  const startIdx = raw.indexOf('[', exportMatch.index + exportMatch[0].length);
  if (startIdx === -1) return [];
  let depth = 0, end = startIdx;
  for (; end < raw.length; end++) {
    if (raw[end] === '[') depth++;
    if (raw[end] === ']') { depth--; if (depth === 0) { end++; break; } }
  }
  let chunk = raw.slice(startIdx, end);
  const items = [];
  const re = /slug:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(chunk)) !== null) {
    items.push({ slug: m[1], name: m[2] });
  }
  return items;
}

const services = parseSimpleTS(join(SRC, 'services.ts'), 'services');
const locations = parseSimpleTS(join(SRC, 'locations.ts'), 'locations');

// Build route map: path -> { title, description }
const routes = {};

// Static pages
routes['/'] = {
  title: `Stucco Contractor San Antonio TX | ${SITE_NAME}`,
  description: 'San Antonio\'s trusted stucco contractor. Expert installation, repair, EIFS, and painting for residential & commercial properties. Licensed & insured. Call (210) 871-8490.',
};
routes['/services'] = {
  title: `Our Stucco Services | ${SITE_NAME}`,
  description: 'Complete stucco services in San Antonio: installation, repair, replacement, EIFS, painting, and remodeling for homes and businesses. Free estimates — call (210) 871-8490.',
};
routes['/service-areas'] = {
  title: `Service Areas | ${SITE_NAME}`,
  description: 'San Antonio Stucco serves San Antonio, Boerne, New Braunfels, Schertz, Helotes, Stone Oak, Alamo Heights, and surrounding communities. Call (210) 871-8490.',
};
routes['/quote'] = {
  title: `Get a Free Estimate | ${SITE_NAME}`,
  description: 'Request a free stucco estimate from San Antonio Stucco. Residential & commercial projects throughout San Antonio and surrounding areas. Call (210) 871-8490.',
};
routes['/about'] = {
  title: `About Us | ${SITE_NAME}`,
  description: 'Learn about San Antonio Stucco — locally owned, licensed & insured stucco contractor serving the greater San Antonio metro area.',
};
routes['/blog'] = {
  title: `Stucco Blog | ${SITE_NAME}`,
  description: 'Expert stucco tips, guides, and advice from San Antonio Stucco. Learn about stucco repair, installation, maintenance, and more.',
};
routes['/stucco-repair'] = {
  title: `Stucco Repair Services | ${SITE_NAME}`,
  description: 'Professional stucco repair in San Antonio. We fix cracks, water damage, holes, and delamination. Licensed & insured. Free estimates — call (210) 871-8490.',
};
routes['/stucco-contractor-san-antonio'] = {
  title: `Stucco Contractor San Antonio TX | Licensed & Insured | ${SITE_NAME}`,
  description: 'Looking for a stucco contractor in San Antonio? Licensed, insured, locally owned. Expert repair, installation & EIFS. Free estimates — call (210) 871-8490.',
};
routes['/stucco-repair-san-antonio'] = {
  title: `Stucco Repair San Antonio TX | ${SITE_NAME}`,
  description: 'Expert stucco repair in San Antonio, TX. We fix cracks, water damage, and delamination throughout San Antonio. Free estimates — call (210) 871-8490.',
};
routes['/stucco-installation-san-antonio'] = {
  title: `Stucco Installation San Antonio TX | ${SITE_NAME}`,
  description: 'Professional stucco installation in San Antonio, TX. New construction and additions. Three-coat systems built for South Texas. Call (210) 871-8490.',
};
routes['/eifs-stucco-san-antonio'] = {
  title: `EIFS Stucco San Antonio TX | ${SITE_NAME}`,
  description: 'EIFS and synthetic stucco services in San Antonio, TX. Installation, repair, and moisture remediation. Free estimates — call (210) 871-8490.',
};
routes['/commercial-stucco-san-antonio'] = {
  title: `Commercial Stucco San Antonio TX | ${SITE_NAME}`,
  description: 'Commercial stucco contractor in San Antonio, TX. Offices, retail, multi-family, and institutional buildings. Licensed & insured. Call (210) 871-8490.',
};
routes['/blog/us-largest-plaster-producer-san-antonio'] = {
  title: `San Antonio: Home to America's Largest Plaster Producer | ${SITE_NAME}`,
  description: 'Discover why San Antonio is home to the largest plaster producer in the United States and what it means for the local stucco industry.',
};

// Service detail pages
for (const s of services) {
  routes[`/${s.slug}`] = {
    title: `${s.name} in San Antonio, TX | ${SITE_NAME}`,
    description: `Professional ${s.name.toLowerCase()} services in San Antonio, TX. Licensed & insured. Free estimates — call (210) 871-8490.`,
  };
}

// Location detail pages
for (const l of locations) {
  routes[`/${l.slug}`] = {
    title: `Stucco Contractor in ${l.name}, TX | ${SITE_NAME}`,
    description: `Professional stucco services in ${l.name}, TX. Installation, repair, EIFS, and painting. Licensed & insured. Call (210) 871-8490.`,
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
    };
  }
}

// Read the built index.html template
const template = readFileSync(join(DIST, 'index.html'), 'utf8');

function injectSEO(html, path, { title, description }) {
  const canonical = `${SITE_URL}${path}`;
  const seoTags = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${OG_IMAGE}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${OG_IMAGE}">`;

  return html
    .replace(/<title>[^<]*<\/title>/, '')
    .replace('</head>', `${seoTags}\n  </head>`);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let count = 0;
for (const [path, seo] of Object.entries(routes)) {
  const html = injectSEO(template, path, seo);
  const dir = join(DIST, path === '/' ? '' : path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const filePath = path === '/' ? join(DIST, 'index.html') : join(dir, 'index.html');
  writeFileSync(filePath, html);
  count++;
}

console.log(`Pre-rendered SEO meta for ${count} pages`);
