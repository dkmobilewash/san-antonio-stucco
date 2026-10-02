# SEO tooling

Three pieces, layered:

| Piece | What it does | Needs |
|---|---|---|
| `npm run seo:lint` | Deterministic checks on the prerendered site in `dist/` (titles, descriptions, canonicals, H1s, JSON-LD, internal links, sitemap, removed routes, signed image URLs). Runs in CI on every PR via `.github/workflows/seo-lint.yml`. | a prior `npm run build` |
| `npm run seo:lastmod` | Rewrites `scripts/seo/lastmod.json` (per-route last-modified dates from git blame of the data files) which the prerender writes into `sitemap.xml` `<lastmod>`. Run after editing `src/data/*.ts` and commit the JSON. | full git history |
| `npm run seo:keywords` | Regenerates `scripts/seo/keywords/seeds.txt` and `candidates*.txt`, the phrase lists to feed Google Keyword Planner (see below). | nothing |
| `npm run seo:keywords:ingest` | Merges every Keyword Planner CSV in `scripts/seo/keywords/planner/` into `scripts/seo/keywords/map.json` (volume, trend, competition, bids, service/geo classification, suggested URL per phrase). | Planner CSVs |
| `npm run seo:gsc` | Pulls the last 28 days of Search Console data and writes `scripts/seo/reports/gsc-<date>.json` with an `opportunities` list (queries ranking 4–20). | `GSC_SERVICE_ACCOUNT_JSON` |
| `.claude/skills/seo-agent/SKILL.md` | The playbook a Claude Code session follows to turn that data into a small PR. | both of the above |

## Search Console credential (one-time)

1. In Google Cloud Console, create (or reuse) a project and enable the **Google Search Console API**.
2. Create a **service account**, then create a JSON key for it and download the file.
3. In Search Console, open the `sanantoniostucco.com` property → Settings → Users and permissions → Add user. Paste the service account's email (`...@...iam.gserviceaccount.com`) with **Full** or **Restricted** permission.
4. Store the key where the agent runs:
   - Claude Code on the web: at claude.ai/code, click the cloud icon showing the environment name above the message box, hover the environment and click its gear icon, then add a line to **Environment variables**. Either paste the JSON on one line wrapped in single quotes, `GSC_SERVICE_ACCOUNT_JSON='{...}'`, or paste a base64 version with no quotes: `GSC_SERVICE_ACCOUNT_JSON=<output of base64 -i key.json | tr -d '\n'>`.
   - Locally: `export GSC_SERVICE_ACCOUNT_JSON=/path/to/key.json`.
   - Only sessions started after saving see the variable.
5. If the property is a URL-prefix property rather than a domain property, also set `GSC_SITE_URL=https://sanantoniostucco.com/`.

Verify with `npm run seo:gsc`. It prints totals and the top opportunities.

## Keyword Planner data (one-time, then yearly)

The keyword map is built from Google Keyword Planner volumes, which only an Ads account can export.

1. Create a Google Ads account (Expert Mode, no campaign). Add a payment method and run a token campaign for a few days, then pause it: accounts with no spend only see volume ranges, not numbers.
2. Tools → Keyword Planner → **Discover new keywords**. Paste one batch from `scripts/seo/keywords/seeds.txt` (10 terms, the tool's limit), set the location to San Antonio, TX plus a 50-mile radius, language English, and download the CSV. Repeat for each batch.
3. Tools → Keyword Planner → **Get search volume and forecasts**. Paste `candidates-part-1.txt` through `candidates-part-6.txt` one at a time, same location, and download each CSV.
4. Drop the CSVs into `scripts/seo/keywords/planner/` (gitignored) and run `npm run seo:keywords:ingest`. It merges them into `scripts/seo/keywords/map.json`: every phrase with volume, trend, competition and bid range, classified by service and geo and mapped to the page that should own it (`url: null` = informational or a gap). Commit `map.json`.

Range mode: an Ads account with no spend history exports range midpoints (50, 500, 5000) and empty monthly columns. The ingester marks those rows `range: true`; they order phrases fine but are not counts. Exact numbers replace them automatically on the next ingest after the account has spend.

## Route snapshot

`routes.json` is the list of URLs the site is expected to serve. If a PR removes one of them, the lint fails unless `vercel.json` redirects it. When a route is intentionally added or removed, run:

```
npm run build && npm run seo:lint -- --update-routes
```

and commit the updated `routes.json`.

## Scheduling the agent

The agent is meant to run weekly as a Claude Code Routine in this repository's environment, in a fresh session each time, with the prompt:

```
Run the seo-agent skill (/seo-agent). Work on branch seo/agent-<today's date>.
```

Start it in report-only mode (see the skill) for the first two runs, then allow edits.
