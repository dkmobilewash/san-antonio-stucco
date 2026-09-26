/**
 * Refresh scripts/seo/lastmod.json — the per-route <lastmod> dates the prerender writes
 * into sitemap.xml. Dates come from git, so the sitemap says when a page's *content*
 * last changed instead of when the site was last built.
 *
 *   npm run seo:lastmod
 *
 * How a route's date is found:
 *   /blog/<slug>, /<service>, /<location>  →  newest commit touching that entry's lines
 *                                            in blog.ts / services.ts / locations.ts (git blame)
 *   everything else (hub pages)            →  newest commit touching the files that render it
 *
 * Needs full git history. Run it after editing src/data/*.ts and commit the JSON with the change.
 */
import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from '../../src/data/blog.ts';
import { locations } from '../../src/data/locations.ts';
import { services } from '../../src/data/services.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const OUT = join(__dirname, 'lastmod.json');

function git(...args: string[]): string {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

if (git('rev-parse', '--is-shallow-repository').trim() === 'true') {
  console.error('lastmod: shallow clone, git history is incomplete. Run `git fetch --unshallow` first.');
  process.exit(2);
}

const toDate = (unixSeconds: number) => new Date(unixSeconds * 1000).toISOString().slice(0, 10);

/** committer time per line (1-based index) from `git blame --line-porcelain`. */
function blameTimes(file: string): number[] {
  const out = git('blame', '--line-porcelain', '--', relative(ROOT, file));
  const times: number[] = [0];
  let current = 0;
  for (const line of out.split('\n')) {
    if (line.startsWith('committer-time ')) current = Number(line.slice('committer-time '.length));
    else if (line.startsWith('\t')) times.push(current);
  }
  return times;
}

/** Line range of the array entry whose `slug: '<slug>'` line sits inside `  { … },`. */
function entryRange(lines: string[], slug: string): [number, number] {
  const slugLine = lines.findIndex(l => l.trim() === `slug: '${slug}',`);
  if (slugLine < 0) throw new Error(`slug ${slug} not found`);
  let start = slugLine;
  while (start > 0 && lines[start] !== '  {') start--;
  let end = slugLine;
  while (end < lines.length - 1 && !/^ {2}\},?$/.test(lines[end])) end++;
  return [start + 1, end + 1];
}

function newestInRange(times: number[], [start, end]: [number, number]): number {
  let max = 0;
  for (let i = start; i <= end; i++) max = Math.max(max, times[i] ?? 0);
  return max;
}

function newestCommit(files: string[]): number {
  const out = git('log', '-1', '--format=%ct', '--', ...files.map(f => relative(ROOT, f))).trim();
  return out ? Number(out) : 0;
}

const routes: Record<string, string> = {};

function perEntry(file: string, slugs: string[], toPath: (slug: string) => string) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const times = blameTimes(file);
  for (const slug of slugs) routes[toPath(slug)] = toDate(newestInRange(times, entryRange(lines, slug)));
}

const DATA = join(ROOT, 'src', 'data');
const PRERENDER = join(ROOT, 'scripts', 'prerender.ts');

perEntry(join(DATA, 'blog.ts'), blogPosts.map(p => p.slug), slug => `/blog/${slug}`);
perEntry(join(DATA, 'services.ts'), services.map(s => s.slug), slug => `/${slug}`);
perEntry(join(DATA, 'locations.ts'), locations.map(l => l.slug), slug => `/${slug}`);

const hubs: Record<string, string[]> = {
  '/': [PRERENDER, join(DATA, 'services.ts'), join(DATA, 'locations.ts'), join(DATA, 'projects.ts')],
  '/services': [PRERENDER, join(DATA, 'services.ts')],
  '/service-areas': [PRERENDER, join(DATA, 'locations.ts')],
  '/quote': [PRERENDER, join(DATA, 'contact.ts')],
  '/about': [PRERENDER],
  '/projects': [PRERENDER, join(DATA, 'projects.ts')],
  '/blog': [PRERENDER, join(DATA, 'blog.ts')],
  '/blog/us-largest-plaster-producer-san-antonio': [PRERENDER],
};
for (const [path, files] of Object.entries(hubs)) routes[path] = toDate(newestCommit(files));

const sorted = Object.fromEntries(Object.entries(routes).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), routes: sorted }, null, 2) + '\n');
console.log(`lastmod: wrote ${Object.keys(sorted).length} routes to ${relative(ROOT, OUT)}`);
