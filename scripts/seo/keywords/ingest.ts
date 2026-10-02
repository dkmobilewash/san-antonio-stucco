/**
 * Merge Google Keyword Planner exports into the keyword map.
 *
 *   npm run seo:keywords:ingest
 *
 * Reads every *.csv in scripts/seo/keywords/planner/ (gitignored: the raw exports are the
 * Ads account's data), both "Discover new keywords" and "Get search volume and forecasts"
 * downloads. Planner writes UTF-16 tab-separated files with two title lines before the header.
 *
 * Writes scripts/seo/keywords/map.json: one entry per distinct phrase with Planner volume,
 * trend, competition, bid range, and a first-pass classification (service, geo, relevance,
 * suggested URL) that the content plan and the weekly routine read from.
 *
 * Volumes: an account without spend history gets range midpoints (50 = 10–100, 500 = 100–1K,
 * 5000 = 1K–10K) and empty monthly columns; `range: true` marks those rows so nobody treats
 * 50 as "exactly fifty". Exact numbers replace them automatically once the account unlocks them.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { locations } from '../../../src/data/locations.ts';

const DIR = dirname(fileURLToPath(import.meta.url));
const PLANNER = join(DIR, 'planner');
const OUT = join(DIR, 'map.json');

export interface KeywordRow {
  keyword: string;
  avg: number | null;          // avg. monthly searches as Planner reports it
  range: boolean;              // true when avg is a range midpoint (no spend history on the account)
  threeMonth: string | null;   // e.g. "900%"
  yoy: string | null;
  competition: string | null;  // Low / Medium / High / Unknown
  competitionIndex: number | null;
  bidLow: number | null;
  bidHigh: number | null;
  service: string;             // repair | painting | installation | replacement | eifs | commercial | residential | remodeling | contractor | cost | supply | other
  geo: string;                 // near-me | san-antonio | <city slug> | none
  informational: boolean;      // question / comparison / how-to intent
  relevant: boolean;           // false for supply, DIY products, unrelated trades
  url: string | null;          // existing page this phrase belongs to, null = gap / informational
  sources: string[];
}

// ── Parsing ──

const num = (s: string | undefined) => {
  const t = (s ?? '').trim().replace(/,/g, '');
  return t === '' || t === '--' ? null : Number(t);
};
const txt = (s: string | undefined) => { const t = (s ?? '').trim().replace(/^"|"$/g, ''); return t === '' || t === '--' ? null : t; };

function parse(file: string): Map<string, KeywordRow> {
  const raw = readFileSync(file);
  const text = raw[0] === 0xff && raw[1] === 0xfe ? raw.toString('utf16le') : raw.toString('utf8');
  const lines = (text.charCodeAt(0) === 0xfeff ? text.slice(1) : text).split(/\r?\n/);
  const headerIdx = lines.findIndex((l) => l.startsWith('Keyword\t'));
  if (headerIdx < 0) throw new Error(`${file}: no "Keyword" header row (is this a Planner export?)`);
  const header = lines[headerIdx].split('\t').map((h) => h.trim());
  const col = (name: string) => header.findIndex((h) => h.toLowerCase().startsWith(name.toLowerCase()));
  const c = {
    keyword: col('Keyword'), avg: col('Avg. monthly searches'), three: col('Three month change'), yoy: col('YoY change'),
    comp: col('Competition'), compIdx: col('Competition (indexed'), bidLow: col('Top of page bid (low'), bidHigh: col('Top of page bid (high'),
  };
  const monthCols = header.map((h, i) => (h.startsWith('Searches:') ? i : -1)).filter((i) => i >= 0);
  const rows = new Map<string, KeywordRow>();
  for (const line of lines.slice(headerIdx + 1)) {
    if (!line.trim()) continue;
    const f = line.split('\t');
    const keyword = (f[c.keyword] ?? '').trim().toLowerCase();
    if (!keyword) continue;
    const avg = num(f[c.avg]);
    const monthsEmpty = monthCols.every((i) => !(f[i] ?? '').trim());
    rows.set(keyword, {
      keyword,
      avg,
      range: avg !== null && monthsEmpty && /^(5|50|500|5000|50000|500000)$/.test(String(avg)),
      threeMonth: txt(f[c.three]), yoy: txt(f[c.yoy]),
      competition: txt(f[c.comp]), competitionIndex: num(f[c.compIdx]),
      bidLow: num(f[c.bidLow]), bidHigh: num(f[c.bidHigh]),
      service: '', geo: '', informational: false, relevant: true, url: null,
      sources: [file.slice(PLANNER.length + 1)],
    });
  }
  return rows;
}

// ── Classification ──

const CITY = new Map(locations.map((l) => [l.name.toLowerCase(), l.slug]));
const SERVICE_RULES: [RegExp, string, string | null][] = [
  [/\b(eifs|dryvit|synthetic stucco|sto stucco)\b/, 'eifs', '/eifs-synthetic-stucco'],
  [/\bcommercial\b/, 'commercial', '/commercial-stucco'],
  [/\b(paint|painting|painter|painters|repaint|re-?coat|elastomeric|fog coat)\b/, 'painting', '/stucco-painting'],
  [/\b(replace|replacement|removal|remove|tear ?off)\b/, 'replacement', '/stucco-replacement'],
  [/\b(remodel|remodeling|makeover|resurfac|refinish|texture change|smooth)\w*/, 'remodeling', '/stucco-remodeling'],
  [/\b(repair|repairs|patch|patching|crack|cracks|fix|remediation|water damage|hole)\b/, 'repair', '/stucco-repairs'],
  [/\b(install|installation|installer|installers|new stucco|siding|three coat|one coat|lath)\b/, 'installation', '/stucco-installation'],
  [/\b(residential|house|home)\b/, 'residential', '/residential-stucco'],
  [/\b(cost|price|prices|pricing|estimate|quote|per square foot|how much)\b/, 'cost', null],
  [/\b(contractor|contractors|company|companies|specialist|specialists|experts?|guys?|workers?|crew|services?|business|mason|masonry|plaster\w*|subcontractors?)\b/, 'contractor', '/san-antonio'],
];
const IRRELEVANT = /\b(supply|supplies|supplier|suppliers|buy|mix|store|place|popcorn|drywall|concrete|lahabra|parex|merlex|omega|california stucco|molding|job|jobs|hiring|salary|diy|home depot|lowes)\b/;
const INFORMATIONAL = /^(how|what|why|is|can|does|do|should|which|when|are)\b|\b(vs|versus|pros and cons|problems|disadvantages|ideas|types|colors)\b/;

function classify(r: KeywordRow): KeywordRow {
  const k = r.keyword;
  r.informational = INFORMATIONAL.test(k);
  r.relevant = !IRRELEVANT.test(k);
  if (/\bnear me\b|\bin my area\b|\baround me\b|\blocal\b/.test(k)) r.geo = 'near-me';
  else if (/\bsan antonio\b|\bbexar\b/.test(k)) r.geo = 'san-antonio';
  else {
    r.geo = 'none';
    for (const [name, slug] of CITY) if (name !== 'san antonio' && k.includes(name)) { r.geo = slug; break; }
  }
  r.service = 'other';
  for (const [re, service, url] of SERVICE_RULES) {
    if (re.test(k)) {
      r.service = service;
      r.url = url;
      break;
    }
  }
  if (r.service === 'other' && /\bstucco\b/.test(k)) r.url = '/';   // bare "stucco san antonio" → homepage
  if (r.geo !== 'near-me' && r.geo !== 'san-antonio' && r.geo !== 'none' && r.service === 'contractor') r.url = `/${r.geo}`;
  if (r.informational) r.url = null;   // blog territory; the planner decides which post
  if (!r.relevant) r.url = null;
  return r;
}

// ── Merge ──

if (!existsSync(PLANNER)) { console.error(`no ${PLANNER}; drop Keyword Planner CSVs there first`); process.exit(2); }
const files = readdirSync(PLANNER).filter((f) => f.toLowerCase().endsWith('.csv')).sort().map((f) => join(PLANNER, f));
if (!files.length) { console.error('no CSV files in planner/'); process.exit(2); }

const merged = new Map<string, KeywordRow>();
for (const file of files) {
  for (const [k, row] of parse(file)) {
    const prev = merged.get(k);
    if (!prev) { merged.set(k, row); continue; }
    // Prefer exact volumes over range midpoints; otherwise keep the first and note the extra source.
    if (prev.range && !row.range) merged.set(k, { ...row, sources: [...prev.sources, ...row.sources] });
    else prev.sources.push(...row.sources);
  }
}
const rows = [...merged.values()].map(classify).sort((a, b) => (b.avg ?? -1) - (a.avg ?? -1) || a.keyword.localeCompare(b.keyword));

writeFileSync(OUT, JSON.stringify({
  generatedAt: new Date().toISOString().slice(0, 10),
  files: files.map((f) => f.slice(PLANNER.length + 1)),
  note: 'avg is a Planner range midpoint where range=true (10–100 → 50, 100–1K → 500, 1K–10K → 5000).',
  rows,
}, null, 2) + '\n');

const withVol = rows.filter((r) => r.avg !== null);
const relevant = withVol.filter((r) => r.relevant);
console.log(`keywords: ${rows.length} phrases from ${files.length} file(s); ${withVol.length} with volume (${withVol.filter((r) => r.range).length} as ranges); ${relevant.length} relevant`);
const byUrl = new Map<string, number>();
for (const r of relevant) byUrl.set(r.url ?? '(gap/informational)', (byUrl.get(r.url ?? '(gap/informational)') ?? 0) + (r.avg ?? 0));
for (const [url, vol] of [...byUrl].sort((a, b) => b[1] - a[1])) console.log(`  ${String(vol).padStart(7)}  ${url}`);
