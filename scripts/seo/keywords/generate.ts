/**
 * Candidate keyword generator for Google Keyword Planner.
 *
 *   npm run seo:keywords
 *
 * Writes, in this folder:
 *   seeds.txt              seed terms for "Discover new keywords", in batches of 10 (the tool's limit per run)
 *   candidates.txt         every candidate phrase, one per line, for "Get search volume and forecasts"
 *   candidates-part-N.txt  the same list split into 1,000-line chunks, in case the paste box balks at the whole list
 *
 * The grammar is deliberately generous: Keyword Planner returns zero volume for most of these and that is fine.
 * The point is to find every stucco phrase in the San Antonio market that people actually type, so the
 * keyword map (scripts/seo/keywords/map.json, built once the Planner CSVs come back) rests on data, not guesses.
 * Service areas come from src/data/locations.ts; edit the lists below to widen or narrow coverage.
 */
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { locations } from '../../../src/data/locations.ts';

const OUT = dirname(fileURLToPath(import.meta.url));

// ── Vocabulary ──

/** Service heads that get the full geo × pattern expansion. The first word form is the one people type most. */
const CORE_SERVICES = [
  'stucco', 'stucco repair', 'stucco contractor', 'stucco contractors', 'stucco company', 'stucco companies',
  'stucco installation', 'stucco installers', 'stucco replacement', 'stucco painting', 'stucco remodeling',
  'stucco siding', 'stucco services', 'stucco crack repair', 'stucco patch', 'stucco patching',
  'eifs', 'eifs repair', 'eifs contractor', 'eifs installation', 'synthetic stucco', 'synthetic stucco repair', 'dryvit repair',
  'commercial stucco', 'commercial stucco contractor', 'commercial stucco contractors', 'residential stucco',
  'stucco repair company', 'stucco repair contractor', 'stucco repair contractors', 'stucco specialist', 'stucco specialists',
  'exterior stucco', 'stucco exterior', 'stucco finish', 'stucco work', 'stucco guy', 'stucco crew', 'stucco mason',
  'plaster repair', 'exterior plaster', 'plastering contractor', 'stucco and plaster',
  'elastomeric coating', 'elastomeric paint', 'stucco coating', 'stucco recoat', 'stucco refinishing', 'stucco resurfacing',
  'stucco removal', 'stucco restoration', 'stucco waterproofing', 'stucco sealing', 'stucco inspection', 'stucco moisture inspection',
  'stucco water damage repair', 'stucco hole repair', 'stucco texture repair', 'stucco texture matching',
  'smooth stucco', 'smooth stucco finish', 'stucco texture change', 'stucco makeover', 'stucco over brick', 'stucco over siding',
  'stucco over block', 'stucco over cinder block', 'stucco house', 'stucco home', 'stucco wall', 'stucco fence', 'stucco fence repair',
  'stucco columns', 'stucco chimney repair', 'stucco soffit repair', 'stucco window trim', 'stucco foam trim', 'stucco trim',
  'stucco pool wall', 'stucco retaining wall', 'stucco garage', 'stucco patio', 'stucco accent wall', 'stucco mailbox',
  'stucco cleaning', 'stucco pressure washing', 'stucco maintenance', 'stucco mold removal', 'stucco stain removal',
  'stucco cost', 'stucco prices', 'stucco estimate', 'stucco quote', 'stucco repair cost', 'stucco installation cost',
  'stucco painting cost', 'stucco replacement cost', 'stucco per square foot', 'stucco price per square foot',
  'three coat stucco', 'one coat stucco', 'traditional stucco', 'cement stucco', 'acrylic stucco', 'lime plaster', 'venetian plaster',
  'stucco textures', 'stucco colors', 'dash finish stucco', 'sand finish stucco', 'santa barbara stucco finish', 'lace stucco texture',
  'spanish lace stucco', 'skip trowel stucco', 'stucco weep screed', 'stucco lath', 'stucco expansion joints',
  'hail damage stucco repair', 'storm damage stucco repair', 'foundation crack stucco repair', 'stucco insurance claim',
  'stucco contractor reviews', 'licensed stucco contractor', 'insured stucco contractor', 'bonded stucco contractor',
  'stucco subcontractor', 'stucco repair near me', 'stucco companies near me', 'stucco contractors near me', 'stucco installers near me',
];

/** Geo modifiers applied to every core service. */
const PRIMARY_GEO = ['san antonio', 'san antonio tx', 'san antonio texas', 'bexar county', 'near me'];

/** Towns, suburbs and neighborhoods. Service-area pages first, then the rest of the metro. */
const SERVICE_AREA_CITIES = locations.map((l) => l.name.toLowerCase()).filter((n) => n !== 'san antonio');
const EXTRA_METRO = [
  'alamo ranch', 'the dominion', 'shavano park', 'hollywood park', 'castle hills', 'terrell hills', 'olmos park',
  'converse', 'cibolo', 'seguin', 'bulverde', 'spring branch', 'fair oaks ranch', 'timberwood park', 'garden ridge',
  'kirby', 'windcrest', 'floresville', 'pleasanton', 'castroville', 'hondo', 'canyon lake',
  'north san antonio', 'northwest san antonio', 'northeast san antonio', 'south san antonio', 'west san antonio',
  'downtown san antonio', 'san antonio hill country', 'texas hill country', '78249', '78258', '78209', '78256', '78230',
];

/** A smaller set of heads that are worth a city-level expansion. */
const CITY_SERVICES = [
  'stucco', 'stucco repair', 'stucco contractor', 'stucco contractors', 'stucco company', 'stucco installation',
  'stucco painting', 'stucco replacement', 'eifs repair', 'commercial stucco', 'stucco siding', 'stucco services',
];

/** Prefix / suffix patterns around "{service} {geo}". */
const PREFIXES = ['', 'best ', 'top ', 'affordable ', 'cheap ', 'local ', 'professional ', 'licensed ', 'residential ', 'commercial ', 'emergency '];
const SUFFIXES = ['', ' reviews', ' cost', ' prices', ' estimate', ' free estimate', ' quote', ' companies', ' contractors', ' services'];

/** Informational and question queries; geo-expanded lightly. */
const QUESTIONS = [
  'how much does stucco cost', 'how much does stucco repair cost', 'how much does it cost to stucco a house',
  'how much to stucco a 2000 sq ft house', 'how much does it cost to paint stucco', 'how much does eifs cost',
  'how much to replace stucco', 'cost to remove stucco', 'cost to stucco over brick',
  'how to repair stucco cracks', 'how to fix stucco', 'how to patch stucco', 'how to fix hairline cracks in stucco',
  'how to repair stucco water damage', 'how to fix bubbling stucco', 'how to repaint stucco', 'how to clean stucco',
  'how to pressure wash stucco', 'how to remove mold from stucco', 'how to seal stucco', 'how to waterproof stucco',
  'can you paint stucco', 'can you stucco over brick', 'can you stucco over wood siding', 'can you stucco over existing stucco',
  'can you power wash stucco', 'can stucco be repaired', 'can you change stucco texture', 'can you stucco a chimney',
  'is stucco good for texas', 'is stucco good in humid climates', 'is stucco good for san antonio', 'is stucco expensive',
  'is stucco better than brick', 'is stucco better than siding', 'is stucco waterproof', 'is eifs bad', 'is dryvit bad',
  'how long does stucco last', 'how long does stucco take to dry', 'how long does stucco take to cure', 'how long does stucco paint last',
  'what is stucco', 'what is eifs', 'what is dryvit', 'what is synthetic stucco', 'what is elastomeric paint', 'what is three coat stucco',
  'what causes stucco cracks', 'what does failing stucco look like', 'what is the best paint for stucco', 'what is the best stucco finish',
  'why is my stucco cracking', 'why is my stucco bubbling', 'why is my stucco turning green', 'why is my stucco stained',
  'stucco vs brick', 'stucco vs siding', 'stucco vs hardie board', 'stucco vs vinyl siding', 'stucco vs eifs', 'eifs vs stucco',
  'stucco vs brick cost', 'stucco vs hardie board cost', 'stucco vs plaster', 'stucco vs render', 'stucco vs limewash',
  'stucco pros and cons', 'stucco problems', 'stucco disadvantages', 'eifs problems', 'dryvit problems', 'stucco house problems',
  'signs stucco needs repair', 'stucco cracks normal', 'hairline cracks in stucco', 'stucco cracking after rain', 'stucco crack repair caulk',
  'does homeowners insurance cover stucco', 'does insurance cover stucco damage', 'stucco hail damage insurance',
  'stucco inspection when buying a house', 'stucco inspection cost', 'stucco moisture test',
  'stucco color ideas', 'stucco house colors', 'modern stucco house', 'stucco texture types', 'stucco finish types',
  'best time to paint stucco', 'best paint for stucco in texas', 'best stucco for texas heat', 'stucco in texas',
  'stucco contractor license texas', 'how to hire a stucco contractor', 'questions to ask a stucco contractor',
];
const QUESTION_GEO = ['', ' san antonio', ' texas'];

// ── Expansion ──

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
const out = new Set<string>();
const add = (s: string) => { const n = norm(s); if (n) out.add(n); };

/** Reject phrases where a word repeats ("commercial commercial stucco", "stucco near me near me"). */
const clean = (s: string) => { const w = norm(s).split(' '); return new Set(w).size === w.length; };
const addIf = (s: string) => { if (clean(s)) add(s); };

for (const svc of CORE_SERVICES) {
  add(svc);
  if (svc.endsWith('near me')) continue;           // already a complete query
  for (const geo of PRIMARY_GEO) {
    if (geo === 'near me') {
      for (const pre of ['', 'best ', 'affordable ', 'cheap ', 'local ']) addIf(`${pre}${svc} near me`);
      continue;
    }
    addIf(`${svc} ${geo}`);
    addIf(`${geo} ${svc}`);
    if (geo === 'san antonio') {
      for (const pre of PREFIXES) addIf(`${pre}${svc} ${geo}`);
      for (const suf of SUFFIXES) addIf(`${svc} ${geo}${suf}`);
    }
  }
}

const TOWNS = new Set([...SERVICE_AREA_CITIES, 'converse', 'cibolo', 'seguin', 'bulverde', 'spring branch', 'fair oaks ranch',
  'garden ridge', 'kirby', 'windcrest', 'floresville', 'pleasanton', 'castroville', 'hondo', 'canyon lake', 'shavano park',
  'hollywood park', 'castle hills', 'terrell hills', 'olmos park']);
for (const svc of CITY_SERVICES) {
  for (const city of [...SERVICE_AREA_CITIES, ...EXTRA_METRO]) {
    addIf(`${svc} ${city}`);
    addIf(`${city} ${svc}`);
    if (TOWNS.has(city)) addIf(`${svc} ${city} tx`);
  }
}

for (const q of QUESTIONS) for (const geo of QUESTION_GEO) add(`${q}${geo}`);

// Seeds: broad heads Keyword Planner can expand from. Batches of 10 match the tool's per-run limit.
const SEEDS = [
  ['stucco san antonio', 'stucco repair san antonio', 'stucco contractor san antonio', 'stucco companies san antonio', 'stucco installation san antonio',
   'stucco painting san antonio', 'stucco replacement san antonio', 'eifs repair san antonio', 'commercial stucco san antonio', 'stucco near me'],
  ['stucco repair', 'stucco contractors', 'stucco installation', 'stucco cost', 'stucco painting',
   'eifs', 'synthetic stucco', 'dryvit', 'elastomeric coating', 'stucco siding'],
  ['stucco repair cost', 'how much does stucco cost', 'stucco vs brick', 'stucco vs hardie board', 'stucco cracks',
   'stucco water damage', 'stucco house', 'stucco finish', 'stucco texture', 'stucco colors'],
  ['stucco boerne', 'stucco new braunfels', 'stucco schertz', 'stucco helotes', 'stucco stone oak',
   'stucco alamo heights', 'stucco bexar county', 'stucco texas', 'stucco hill country', 'plaster repair san antonio'],
];

// ── Output ──

const candidates = [...out].sort();
writeFileSync(join(OUT, 'candidates.txt'), candidates.join('\n') + '\n');
const CHUNK = 1000;
let parts = 0;
for (let i = 0; i < candidates.length; i += CHUNK, parts++) {
  writeFileSync(join(OUT, `candidates-part-${parts + 1}.txt`), candidates.slice(i, i + CHUNK).join('\n') + '\n');
}
writeFileSync(
  join(OUT, 'seeds.txt'),
  SEEDS.map((batch, i) => `# Batch ${i + 1} — paste these 10 into "Discover new keywords"\n${batch.join('\n')}`).join('\n\n') + '\n',
);
console.log(`keywords: ${candidates.length} candidates (${parts} parts of ≤${CHUNK}), ${SEEDS.flat().length} seeds in ${SEEDS.length} batches`);
