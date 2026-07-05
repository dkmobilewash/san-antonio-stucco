import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

const GOOGLEBOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const TEST_URLS = [
  { path: '/', name: 'Homepage', expectH1: "San Antonio's Trusted Stucco Contractor", expectText: 'stucco contractor near me' },
  { path: '/stucco-installation', name: 'Service: Stucco Installation', expectH1: 'Stucco Installation in San Antonio, TX', expectText: 'three-coat system' },
  { path: '/boerne', name: 'Location: Boerne', expectH1: 'Stucco Contractor in Boerne, TX', expectText: 'Boerne' },
  { path: '/stucco-repairs/helotes', name: 'Combo: Stucco Repairs × Helotes', expectH1: 'Stucco Repairs in Helotes, TX', expectText: 'Helotes' },
  { path: '/blog/how-san-antonio-weather-affects-stucco', name: 'Blog Post', expectH1: 'How San Antonio Weather Affects Your Stucco', expectText: 'Thermal expansion' },
  { path: '/services', name: 'Services Listing', expectH1: 'Our Stucco Services in San Antonio, TX', expectText: 'installation' },
];

function fetch(url: string, ua: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, { headers: { 'User-Agent': ua } }, (res) => {
      let data = '';
      res.on('data', (chunk: Buffer) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Simple static file server
function createServer(): http.Server {
  return http.createServer((req, res) => {
    let urlPath = req.url || '/';
    if (urlPath.endsWith('/')) urlPath = urlPath.slice(0, -1) || '/';

    let filePath: string;
    if (urlPath === '/') {
      filePath = join(DIST, 'index.html');
    } else {
      filePath = join(DIST, urlPath, 'index.html');
    }

    try {
      const content = readFileSync(filePath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    } catch {
      // Try as direct file
      try {
        const content = readFileSync(join(DIST, urlPath), 'utf8');
        res.writeHead(200);
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not Found');
      }
    }
  });
}

async function run() {
  const server = createServer();
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const port = (server.address() as any).port;
  const baseUrl = `http://localhost:${port}`;

  console.log('\n=== PRE-RENDER VERIFICATION TEST ===\n');

  // Reference: empty SPA shell size
  const emptyShell = readFileSync(join(DIST, 'index.html'), 'utf8');
  const shellMetaOnly = emptyShell.replace(/<div id="root">[\s\S]*?<\/div>/, '<div id="root"></div>');
  const shellSize = Buffer.byteLength(shellMetaOnly);

  let allPassed = true;

  for (const test of TEST_URLS) {
    console.log(`--- ${test.name} (${test.path}) ---`);

    // Fetch with Googlebot UA (simulating crawler, no JS execution)
    const botHtml = await fetch(`${baseUrl}${test.path}`, GOOGLEBOT_UA);
    const botSize = Buffer.byteLength(botHtml);

    // Fetch with browser UA
    const browserHtml = await fetch(`${baseUrl}${test.path}`, BROWSER_UA);
    const browserSize = Buffer.byteLength(browserHtml);

    // Check 1: Has H1 heading
    const h1Match = botHtml.match(/<h1>(.*?)<\/h1>/);
    const h1Text = h1Match ? h1Match[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'") : '';
    const hasH1 = h1Match && h1Text.includes(test.expectH1);
    console.log(`  H1 heading: ${hasH1 ? '✓ PASS' : '✗ FAIL'} ${h1Match ? `"${h1Match[1].slice(0, 60)}"` : '(none)'}`);

    // Check 2: Has expected body text (proves content is in HTML, not JS-only)
    const hasBodyText = botHtml.toLowerCase().includes(test.expectText.toLowerCase());
    console.log(`  Body text "${test.expectText}": ${hasBodyText ? '✓ PASS' : '✗ FAIL'}`);

    // Check 3: Root div has content (not empty)
    const rootMatch = botHtml.match(/<div id="root">([\s\S]*?)<\/body>/);
    const rootContent = rootMatch ? rootMatch[1].replace(/<\/div>\s*$/, '') : '';
    const hasRootContent = rootContent.length > 100;
    console.log(`  Root div has content: ${hasRootContent ? '✓ PASS' : '✗ FAIL'} (${rootContent.length} chars)`);

    // Check 4: Has canonical tag
    const hasCanonical = botHtml.includes('<link rel="canonical"');
    console.log(`  Canonical tag: ${hasCanonical ? '✓ PASS' : '✗ FAIL'}`);

    // Check 5: Has title tag
    const titleMatch = botHtml.match(/<title>(.*?)<\/title>/);
    console.log(`  Title tag: ${titleMatch ? '✓ PASS' : '✗ FAIL'} ${titleMatch ? `"${titleMatch[1].slice(0, 60)}"` : ''}`);

    // Check 6: Has FAQ schema (for pages with FAQs)
    const hasFaqSchema = botHtml.includes('"FAQPage"');
    console.log(`  FAQ schema: ${hasFaqSchema ? '✓ Present' : '— Not applicable'}`);

    // Check 7: Has breadcrumb schema
    const hasBreadcrumb = botHtml.includes('"BreadcrumbList"');
    console.log(`  Breadcrumb schema: ${hasBreadcrumb ? '✓ Present' : '— Not applicable'}`);

    // Size comparison
    console.log(`  Bot HTML size:     ${botSize.toLocaleString()} bytes`);
    console.log(`  Browser HTML size: ${browserSize.toLocaleString()} bytes`);
    console.log(`  Empty shell size:  ~${shellSize.toLocaleString()} bytes (reference)`);
    console.log(`  Content added:     +${(botSize - shellSize).toLocaleString()} bytes (+${Math.round((botSize / shellSize - 1) * 100)}%)`);

    // Same content for bot and browser (no cloaking)
    const sameContent = botHtml === browserHtml;
    console.log(`  Same content bot/browser: ${sameContent ? '✓ YES (no differential serving)' : '✗ DIFFERENT'}`);

    if (!hasH1 || !hasBodyText || !hasRootContent || !hasCanonical) allPassed = false;
    console.log('');
  }

  // Count total pre-rendered pages
  let totalPages = 0;
  function countHtml(dir: string) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) countHtml(full);
      else if (entry === 'index.html' && full !== join(DIST, 'index.html')) totalPages++;
    }
  }
  totalPages = 1; // root index.html
  countHtml(DIST);

  console.log(`=== SUMMARY ===`);
  console.log(`Total pre-rendered pages: ${totalPages}`);
  console.log(`All verification checks: ${allPassed ? '✓ PASSED' : '✗ SOME FAILED'}`);

  server.close();
  process.exit(allPassed ? 0 : 1);
}

run().catch(e => { console.error(e); process.exit(1); });
