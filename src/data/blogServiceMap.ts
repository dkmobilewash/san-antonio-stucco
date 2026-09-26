/**
 * Which service pages each blog post links to ("Related Services") and which posts show up on a
 * service page ("Resources & Guides"). Add an entry for every new post.
 */
export const PRIORITY_SERVICES = ['stucco-installation', 'stucco-repairs', 'stucco-painting', 'stucco-replacement'];

export const blogServiceMap: Record<string, string[]> = {
  'how-san-antonio-weather-affects-stucco': ['stucco-repairs', 'stucco-installation'],
  'eifs-vs-traditional-stucco-differences': ['eifs-synthetic-stucco', 'stucco-installation'],
  'which-type-of-stucco-is-best': ['stucco-installation', 'residential-stucco'],
  'difference-between-20-30-and-30-30-stucco-finish': ['stucco-installation', 'stucco-painting'],
  'how-much-does-it-cost-to-stucco-a-1000-sq-ft-house': ['stucco-installation', 'residential-stucco'],
  'what-are-the-three-stages-of-stucco': ['stucco-installation', 'stucco-repairs'],
  'average-price-cement-stucco-installation-per-square-foot-san-antonio': ['stucco-installation', 'residential-stucco'],
  'what-are-the-downsides-of-stucco': ['stucco-repairs', 'stucco-installation'],
  'life-expectancy-of-a-stucco-house': ['stucco-repairs', 'residential-stucco'],
  'what-is-the-issue-with-stucco': ['stucco-repairs', 'stucco-replacement'],
  'does-homeowners-insurance-cover-stucco-issues': ['stucco-repairs', 'stucco-replacement'],
  'what-does-failing-stucco-look-like': ['stucco-repairs', 'stucco-replacement'],
  'can-you-stucco-over-existing-stucco': ['stucco-installation', 'stucco-replacement'],
  'how-to-clean-stucco': ['stucco-painting', 'stucco-repairs'],
  'hire-stucco-contractor-san-antonio': ['stucco-installation', 'stucco-repairs'],
  'can-you-paint-stucco': ['stucco-painting', 'stucco-repairs'],
  'stucco-vs-hardie-board': ['stucco-installation', 'residential-stucco'],
  'signs-your-stucco-needs-repair': ['stucco-repairs', 'stucco-replacement'],
  'stucco-repair-vs-replacement-guide': ['stucco-repairs', 'stucco-replacement'],
  'protecting-stucco-from-texas-heat': ['stucco-painting', 'stucco-repairs'],
  'stucco-maintenance-checklist-san-antonio': ['stucco-repairs', 'stucco-painting'],
  'cost-of-stucco-installation-san-antonio': ['stucco-installation', 'residential-stucco'],
  'choosing-stucco-colors-and-textures': ['stucco-painting', 'stucco-remodeling'],
  'stucco-vs-other-siding-materials': ['stucco-installation', 'residential-stucco'],
  'stucco-repair-near-me-san-antonio-guide': ['stucco-repairs'],
  'stucco-vs-brick-cost-san-antonio': ['stucco-installation', 'residential-stucco'],
  'how-long-does-stucco-last-san-antonio': ['stucco-repairs', 'stucco-replacement'],
  'what-is-stucco': ['stucco-installation', 'residential-stucco'],
};
