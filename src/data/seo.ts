/**
 * Page titles and meta descriptions — the single source of truth for every non-blog URL.
 *
 * Both the prerender (scripts/prerender.ts, what Google sees) and the React pages (what the
 * browser shows after hydration) read from this map, so the two can never drift apart.
 * Blog posts use `seoTitle` / `seoDescription` on the post in blog.ts instead.
 *
 * Limits enforced by `npm run seo:lint`: title ≤ 60 chars, description 70–155 chars.
 * Titles are used as-is (no " | San Antonio Stucco" suffix is added).
 */
export interface PageSeo {
  title: string;
  description: string;
}

export const pageSeo: Record<string, PageSeo> = {
  // ── Hub pages ──

  '/': {
    title: 'Stucco Repair & Contractor San Antonio | 5.0★ Google',
    description: 'Cracked or leaking stucco? Licensed San Antonio crew for repair, painting & installation. 5.0★ on Google, own crew. Free estimate: (210) 871-8490.',
  },
  '/services': {
    title: 'All Stucco Services in San Antonio | Licensed Local Crew',
    description: 'Stucco services in San Antonio: repair, installation, replacement, EIFS, painting and remodeling for homes & businesses. One licensed crew. (210) 871-8490.',
  },
  '/service-areas': {
    title: 'Stucco Service Areas | San Antonio & Surrounding Cities',
    description: 'Stucco contractor serving San Antonio, Boerne, New Braunfels, Schertz, Helotes, Stone Oak & more. Licensed & insured. Call for a free estimate!',
  },
  '/quote': {
    title: 'Free Stucco Estimate San Antonio | Call (210) 871-8490',
    description: 'Get a free on-site stucco estimate in San Antonio. Repair, installation, EIFS & painting — transparent pricing, no obligation. Call (210) 871-8490 today.',
  },
  '/about': {
    title: 'About San Antonio Stucco | Licensed & Insured Local Crew',
    description: 'Locally owned stucco contractor in San Antonio with 10+ years experience. Expert installation, repair & replacement. Licensed & insured. Call us today!',
  },
  '/projects': {
    title: 'Stucco Projects in San Antonio | Before & After Photos',
    description: 'Real stucco jobs by our own crew: repairs, new installs, EIFS, commercial recoats. Before-and-after photos from San Antonio Stucco. Free estimates.',
  },
  '/blog': {
    title: 'Stucco Tips & Repair Guides | San Antonio Stucco Blog',
    description: 'Expert stucco tips for San Antonio homeowners. Guides on repair, maintenance, installation & protecting your stucco from Texas heat. Read the guides.',
  },
  '/blog/us-largest-plaster-producer-san-antonio': {
    title: 'U.S. Is the World\'s Largest Plaster Producer | San Antonio',
    description: 'America dominates global gypsum and lime plaster production. Learn how this supply advantage shapes stucco quality for San Antonio homes.',
  },

  // ── Service pages ──

  '/stucco-installation': {
    title: 'Stucco Installation San Antonio | $8–$14/sq ft',
    description: 'New builds, additions & siding-to-stucco in San Antonio. Typical installs $8–$14 per sq ft. Own crew, no subs. Free estimate: (210) 871-8490.',
  },
  '/stucco-replacement': {
    title: 'Stucco Replacement San Antonio TX | Free Assessment',
    description: 'Full stucco tear-out and replacement in San Antonio — substrate inspection plus a fresh three-coat system. Licensed & insured. Free on-site assessment.',
  },
  '/residential-stucco': {
    title: 'Residential Stucco Contractors San Antonio TX | Homes & HOAs',
    description: 'Residential stucco contractors in San Antonio for repair, installation and refinishing on homes and HOAs. Own crew, no subs. Free estimate: (210) 871-8490.',
  },
  '/commercial-stucco': {
    title: 'Commercial Stucco Contractors San Antonio | Repair & Install',
    description: 'Commercial stucco contractors in San Antonio — offices, retail & multi-family. Repair, installation & recoating phased around tenants. (210) 871-8490.',
  },
  '/stucco-remodeling': {
    title: 'Stucco Remodeling San Antonio TX | Exterior Makeover',
    description: 'Stucco remodeling in San Antonio — smooth finishes, texture changes & full exterior makeovers. Transform dated stucco into modern curb appeal.',
  },
  '/stucco-repairs': {
    title: 'Stucco Repair San Antonio TX | Licensed & Insured',
    description: 'Stucco crack repair from $300. We fix the root cause and match your texture — licensed, own crew, no subs. Free estimate: (210) 871-8490.',
  },
  '/eifs-synthetic-stucco': {
    title: 'EIFS & Dryvit Repair San Antonio | Synthetic Stucco',
    description: 'EIFS and Dryvit repair in San Antonio: moisture checks, panel repair & recoating by trained specialists. Free assessment: (210) 871-8490.',
  },
  '/stucco-painting': {
    title: 'Stucco Painting San Antonio TX | Exterior Texture & Paint',
    description: 'Repaint your San Antonio stucco with elastomeric coatings that bridge hairline cracks and last 10–15 years. Free estimate: (210) 871-8490.',
  },

  // ── Location pages ──

  '/san-antonio': {
    title: 'Stucco Services San Antonio TX — All Repairs & Installs',
    description: 'Every stucco service in San Antonio — repair, installation, replacement, EIFS, painting & remodeling. Alamo Heights to the Westside. Call (210) 871-8490.',
  },
  '/boerne': {
    title: 'Stucco Contractor in Boerne, TX | San Antonio Stucco',
    description: 'Stucco contractor in Boerne, TX serving the Hill Country. Repair, installation & custom finishing for Boerne and Fair Oaks Ranch homes. Free estimates.',
  },
  '/new-braunfels': {
    title: 'Stucco Contractor in New Braunfels, TX | San Antonio Stucco',
    description: 'Stucco contractor in New Braunfels, TX serving Comal County. Repair, installation & EIFS for homes near Canyon Lake, Gruene & Vintage Oaks. Free estimates.',
  },
  '/schertz': {
    title: 'Stucco Contractor in Schertz, TX | San Antonio Stucco',
    description: 'Stucco contractor in Schertz, TX serving Cibolo & the I-35 corridor. Crack repair, installation & finishing for homes & businesses. Free estimates.',
  },
  '/helotes': {
    title: 'Stucco Contractor in Helotes, TX | San Antonio Stucco',
    description: 'Stucco contractor in Helotes, TX serving northwest San Antonio and the Hill Country corridor. Repair, installation & custom finishing. Free estimates.',
  },
  '/stone-oak': {
    title: 'Stucco Contractor in Stone Oak, TX | San Antonio Stucco',
    description: 'Stucco contractor in Stone Oak, San Antonio, TX. HOA-compliant repairs, EIFS remediation & expert finish matching for upscale homes. Free estimates.',
  },
  '/alamo-heights': {
    title: 'Stucco Contractor in Alamo Heights, TX | San Antonio Stucco',
    description: 'Stucco contractor in Alamo Heights, TX. Historically sensitive repairs & restoration for Alamo Heights, Olmos Park & Terrell Hills homes. Free estimates.',
  },
  '/live-oak': {
    title: 'Stucco Contractor in Live Oak, TX | San Antonio Stucco',
    description: 'Stucco contractor in Live Oak, TX serving northeast Bexar County. Repair & installation for aging and new homes along the I-35 corridor. Free inspections.',
  },
  '/universal-city': {
    title: 'Stucco Contractor in Universal City, TX | San Antonio Stucco',
    description: 'Stucco contractor in Universal City, TX near Randolph AFB. Fast, reliable repair & installation for military families and homeowners. Free estimates.',
  },
  '/leon-valley': {
    title: 'Stucco Contractor in Leon Valley, TX | San Antonio Stucco',
    description: 'Stucco contractor in Leon Valley, TX. Residential repair, commercial facade work & texture updates along the Bandera Road corridor. Free estimates.',
  },
  '/selma': {
    title: 'Stucco Contractor in Selma, TX | San Antonio Stucco',
    description: 'Stucco contractor in Selma, TX on the I-35 northeast growth corridor. New construction, repair & replacement for Selma homes & businesses. Free estimates.',
  },
};
