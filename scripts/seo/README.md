# SEO tooling

Three pieces, layered:

| Piece | What it does | Needs |
|---|---|---|
| `npm run seo:lint` | Deterministic checks on the prerendered site in `dist/` (titles, descriptions, canonicals, H1s, JSON-LD, internal links, sitemap, removed routes, signed image URLs). Runs in CI on every PR via `.github/workflows/seo-lint.yml`. | a prior `npm run build` |
| `npm run seo:gsc` | Pulls the last 28 days of Search Console data and writes `scripts/seo/reports/gsc-<date>.json` with an `opportunities` list (queries ranking 4–20). | `GSC_SERVICE_ACCOUNT_JSON` |
| `.claude/skills/seo-agent/SKILL.md` | The playbook a Claude Code session follows to turn that data into a small PR. | both of the above |

## Search Console credential (one-time)

1. In Google Cloud Console, create (or reuse) a project and enable the **Google Search Console API**.
2. Create a **service account**, then create a JSON key for it and download the file.
3. In Search Console, open the `sanantoniostucco.com` property → Settings → Users and permissions → Add user. Paste the service account's email (`...@...iam.gserviceaccount.com`) with **Full** or **Restricted** permission.
4. Store the key where the agent runs:
   - Claude Code on the web: environment settings → environment variables → `GSC_SERVICE_ACCOUNT_JSON` = the full contents of the JSON file.
   - Locally: `export GSC_SERVICE_ACCOUNT_JSON=/path/to/key.json`.
5. If the property is a URL-prefix property rather than a domain property, also set `GSC_SITE_URL=https://sanantoniostucco.com/`.

Verify with `npm run seo:gsc`. It prints totals and the top opportunities.

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
