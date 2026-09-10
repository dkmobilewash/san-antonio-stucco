/**
 * Google Search Console fetch — pulls query/page performance for the site and
 * writes a JSON report the SEO agent (and humans) can read.
 *
 *   npm run seo:gsc                       # last 28 days → scripts/seo/reports/gsc-<date>.json
 *   npm run seo:gsc -- --days 90 --out /tmp/gsc.json
 *
 * Auth: a Google service account that has been added as a user on the Search
 * Console property. No npm dependency — the JWT is signed with node:crypto.
 *
 * Env:
 *   GSC_SERVICE_ACCOUNT_JSON  the service-account key: raw JSON on one line, base64 of the JSON
 *                             (`base64 -i key.json | tr -d '\n'`), OR a path to the key file
 *   GSC_SITE_URL              property id, default "sc-domain:sanantoniostucco.com"
 *                             (use "https://sanantoniostucco.com/" for a URL-prefix property)
 *
 * The report contains three tables plus a derived "opportunities" list:
 *   queries        top queries by impressions (query, clicks, impressions, ctr, position)
 *   pages          top pages by clicks
 *   queryPages     query × page pairs, so a query can be tied to the URL that ranks for it
 *   opportunities  queries ranking 4–20 with meaningful impressions, sorted by impressions —
 *                  these are the cheapest wins: existing pages that need a better title,
 *                  an FAQ entry, or a dedicated post.
 */
import { createSign } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Args ──
const argv = process.argv.slice(2);
const argValue = (flag: string, fallback: string) => {
  const i = argv.indexOf(flag);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const DAYS = Number(argValue('--days', '28'));
const SITE_URL = process.env.GSC_SITE_URL || 'sc-domain:sanantoniostucco.com';
const ROW_LIMIT = 1000;

const end = new Date();
end.setUTCDate(end.getUTCDate() - 2); // GSC data lags ~2 days
const start = new Date(end);
start.setUTCDate(start.getUTCDate() - DAYS);
const fmt = (d: Date) => d.toISOString().slice(0, 10);
const OUT = argValue('--out', join(__dirname, 'reports', `gsc-${fmt(end)}.json`));

// ── Auth ──
function loadServiceAccount(): { client_email: string; private_key: string } {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    console.error('GSC_SERVICE_ACCOUNT_JSON is not set. See scripts/seo/README.md for setup.');
    process.exit(2);
  }
  const trimmed = raw.trim();
  let text: string;
  if (trimmed.startsWith('{')) text = trimmed;                       // raw JSON on one line
  else if (/^[A-Za-z0-9+/=]+$/.test(trimmed)) text = Buffer.from(trimmed, 'base64').toString('utf8'); // base64 of the JSON
  else text = readFileSync(trimmed, 'utf8');                          // path to the key file
  return JSON.parse(text);
}

async function accessToken(): Promise<string> {
  const sa = loadServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(sa.private_key, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`token exchange failed: ${res.status} ${await res.text()}`);
  return ((await res.json()) as { access_token: string }).access_token;
}

// ── Query ──
interface Row { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }

async function query(token: string, dimensions: string[], extra: Record<string, unknown> = {}): Promise<Row[]> {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      startDate: fmt(start),
      endDate: fmt(end),
      dimensions,
      rowLimit: ROW_LIMIT,
      dataState: 'final',
      ...extra,
    }),
  });
  if (!res.ok) throw new Error(`searchAnalytics.query failed: ${res.status} ${await res.text()}`);
  return ((await res.json()) as { rows?: Row[] }).rows ?? [];
}

const round = (n: number, d = 1) => Math.round(n * 10 ** d) / 10 ** d;

// ── Main ──
const token = await accessToken();
const [queries, pages, queryPages] = await Promise.all([
  query(token, ['query']),
  query(token, ['page']),
  query(token, ['query', 'page']),
]);

const bestPageForQuery = new Map<string, string>();
for (const r of queryPages) {
  if (!bestPageForQuery.has(r.keys[0])) bestPageForQuery.set(r.keys[0], r.keys[1]);
}

const opportunities = queries
  .filter(r => r.position >= 4 && r.position <= 20 && r.impressions >= 20)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 100)
  .map(r => ({
    query: r.keys[0],
    page: bestPageForQuery.get(r.keys[0]) ?? null,
    impressions: r.impressions,
    clicks: r.clicks,
    ctr: round(r.ctr * 100),
    position: round(r.position),
  }));

const report = {
  site: SITE_URL,
  range: { start: fmt(start), end: fmt(end), days: DAYS },
  generatedAt: new Date().toISOString(),
  totals: {
    clicks: queries.reduce((s, r) => s + r.clicks, 0),
    impressions: queries.reduce((s, r) => s + r.impressions, 0),
  },
  opportunities,
  queries: queries.slice(0, 300).map(r => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: round(r.ctr * 100), position: round(r.position) })),
  pages: pages.sort((a, b) => b.clicks - a.clicks).map(r => ({ page: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: round(r.ctr * 100), position: round(r.position) })),
  queryPages: queryPages.slice(0, 500).map(r => ({ query: r.keys[0], page: r.keys[1], clicks: r.clicks, impressions: r.impressions, position: round(r.position) })),
};

const dir = dirname(OUT);
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n');

console.log(`Search Console ${report.range.start} → ${report.range.end}: ${report.totals.clicks} clicks, ${report.totals.impressions} impressions, ${queries.length} queries, ${pages.length} pages`);
console.log(`Top opportunities (position 4–20):`);
for (const o of opportunities.slice(0, 15)) {
  console.log(`  ${String(o.impressions).padStart(6)} imp  pos ${String(o.position).padStart(4)}  ${o.query}  →  ${o.page ?? '-'}`);
}
console.log(`Wrote ${OUT}`);
