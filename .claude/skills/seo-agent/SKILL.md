---
name: seo-agent
description: Weekly SEO agent for sanantoniostucco.com. Pulls Search Console data, picks a handful of high-leverage content edits (titles, descriptions, FAQs, one new blog post), applies them to the data files, runs the SEO lint, and opens a pull request with a short report. Use when asked to run the SEO agent, do the weekly SEO pass, or find SEO opportunities for the site.
---

# SEO agent for San Antonio Stucco

You are running a recurring SEO pass on a local service business website. The goal is
measurable movement on Search Console queries, achieved through a **small, reviewable PR**.
One good post and a few sharpened titles beat a sprawling rewrite. Everything you change is
reviewed by a human before it ships.

## How the site works (read this before touching anything)

- Vite + React SPA. `npm run build` runs Vite and then `scripts/prerender.ts`, which renders
  every route to static HTML in `dist/`, injects title/description/canonical/OpenGraph,
  FAQ + breadcrumb JSON-LD, and writes `dist/sitemap.xml`. Vercel serves `dist/`.
- **All SEO content lives in data files.** Edit these, not the React pages:
  - `src/data/services.ts` — 9 services (`/<slug>`): hero copy, overview, FAQs, cost info
  - `src/data/locations.ts` — 12 service areas (`/<slug>`): local copy, pain points, FAQs
  - `src/data/blog.ts` — blog posts (`/blog/<slug>`): title, excerpt, category, date, image, `content[]`
    where a string starting with `## ` becomes an H2 and everything else a paragraph
    (inline `<a href="/...">` HTML is allowed in paragraphs).
- Title/description overrides for the home, quote, service and location pages are in the
  `seoOverrides` map in `scripts/prerender.ts`. Blog titles and excerpts come straight from
  `blog.ts` (title is used raw, excerpt is the meta description).
- `blogServiceMap` in `scripts/prerender.ts` links each post to 1–2 services. Add an entry for
  every new post so it gets "Related Services" links and shows up on the service page.
- Question-style H2s in a post (`## How much does ...?`) are auto-extracted into FAQPage schema.
  Write H2s as real questions when the section answers one.
- Redirects live in `vercel.json`. `scripts/seo/routes.json` is the list of URLs the site must
  keep serving.

## Procedure

### 1. Gather data

```
npm ci
npm run seo:gsc                  # needs GSC_SERVICE_ACCOUNT_JSON; writes scripts/seo/reports/gsc-<date>.json
npm run build && npm run seo:lint
```

If `seo:gsc` fails for lack of a credential, say so in the final report and fall back to
working from the site itself: the lint output, the existing post list, and the FAQ questions
already on service pages. Do not invent ranking numbers.

Read the report's `opportunities` list (queries at position 4–20 with impressions). For each,
note the page that currently ranks (`page`). Also scan `pages` for URLs whose CTR is well below
the site's average at a similar position; those need a better title/description.

### 2. Pick the work (hard caps)

Choose **at most**:

- **1 new blog post**, only if a query cluster with real impressions has no page that answers
  it directly. Prefer question queries ("how much", "can you", "what is", "does") and
  comparison queries ("stucco vs ..."). Skip it if an existing post already targets the
  cluster; improve that post instead.
- **Up to 5 title/description edits** on pages that rank 4–20 or have low CTR. Front-load the
  query, keep "San Antonio" or the city name where the query is local, stay within 60 / 155
  characters.
- **Up to 3 FAQ additions** (service, location, or post) where a question query is ranking on
  a page that does not literally answer it. Each answer: 40–80 words, specific, no fluff.
- **Up to 2 internal-link additions** from an existing post to a page that should rank for
  the same cluster.

Rank candidates by `impressions × (1 − ctr)` and pick from the top. When in doubt, do less.

### 3. Rules

- Never change an existing slug or URL. If a URL must go away, add a redirect in
  `vercel.json` and update `routes.json` with `npm run seo:lint -- --update-routes`.
- Never edit `vercel.json` redirects, `index.html`, `robots.txt`, or React components for SEO
  reasons; put it in the report as a proposal instead.
- Never touch prices, warranty terms, licensing claims, hours, phone, or address. If a
  ranking query is about price, reuse the ranges already stated on the site.
- New posts: 700–1,200 words, lowercase-kebab slug matching the target query, `date` in
  "Month YYYY" form for the current month, a category that already exists in `blog.ts`,
  an `image` reused from an existing post on the same topic, `relatedService` set, 2–4 links
  to service/location pages inside the content, and at least two question-form H2s.
  Write for a San Antonio homeowner: South Texas heat, humidity, clay soil, local pricing.
  No filler intros, no "in conclusion", no keyword stuffing.
- Do not rewrite content that is already ranking in the top 3.
- Do not add or remove more than ~250 lines across the PR. If the plan is bigger, cut it.

### 4. Validate

```
npm run typecheck
npm run lint
npm run build && npm run seo:lint
```

The lint must report **0 errors**. Fix any warning your change introduced (new title over 60
chars, description over 155, new route not in the snapshot). Pre-existing warnings on pages
you did not touch are not yours to fix this run.

### 5. Deliver

- Branch: `seo/agent-YYYY-MM-DD` unless the run was given a branch.
- One commit, message like `SEO: <what and why in one line>`.
- Open a PR (or, if the run says report-only, write the report only). PR body, in this order:
  1. **Data window** — Search Console range and totals, or "no GSC access this run".
  2. **Changes** — a table: URL, what changed, target query, current position and impressions.
  3. **Proposals not implemented** — anything you judged out of scope (redirect changes,
     new location pages, image hosting, Google Business Profile items).
  4. **Lint** — the summary line from `npm run seo:lint`.
- Do not post to Slack, email, or any other channel. The PR is the deliverable.

### Report-only mode

If the prompt says "report only", do steps 1–2, write the plan you would have executed as
`scripts/seo/reports/plan-<date>.md`, commit only that file, and open the PR. This is how the
first runs are calibrated before edits are allowed.

## Things that recur on this site

- Blog titles double as `<title>`; many older ones exceed 60 characters. When you touch a
  post for another reason, shorten its title if it is over the limit.
- Blog and OpenGraph images are signed Supabase URLs with an expiry (the lint warns inside
  180 days). Moving them to a public bucket is a human task; mention it in Proposals when
  the warning appears, do not attempt it.
- Semrush keyword data is not available on the current plan. Search Console is the source
  of truth for queries.
