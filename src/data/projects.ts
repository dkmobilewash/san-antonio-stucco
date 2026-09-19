export interface ProjectImage {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Service slug from services.ts */
  service: string;
  /** Neighborhood or city. Leave undefined until confirmed; never guess. */
  area?: string;
  summary: string;
  images: ProjectImage[];
}

/**
 * Real jobs by our own crew. Photos live in /public/projects.
 * Add a project by appending an entry; the page, homepage teaser, and
 * prerendered HTML all read from this array.
 */
export const projects: Project[] = [
  {
    slug: 'townhouse-rear-wall-replacement',
    title: 'Rear-Wall Stucco Replacement on a Three-Story Townhouse',
    service: 'stucco-replacement',
    summary: 'Full tear-off and three-coat replacement on the rear elevation, with new sealant at every window and door. The before shot shows the wall stripped to the substrate and scaffolded; the after shows the finished coat with repainted trim.',
    images: [
      { src: '/projects/stucco-replacement-townhouse-before-after.webp', thumb: '/projects/stucco-replacement-townhouse-before-after-thumb.webp', alt: 'Before and after of a three-story townhouse rear wall: scaffolded and stripped, then finished with new tan stucco and blue trim', width: 1200, height: 800, label: 'Before / After' },
    ],
  },
  {
    slug: 'commercial-office-new-construction',
    title: 'New-Construction Stucco with Stone Accents on a Two-Story Office Building',
    service: 'stucco-installation',
    summary: 'Complete stucco system on a new two-story commercial build, coordinated with the stone veneer columns and dark fascia. Windows were masked and protected through the brown and finish coats.',
    images: [
      { src: '/projects/new-construction-commercial-stucco-stone.webp', thumb: '/projects/new-construction-commercial-stucco-stone-thumb.webp', alt: 'Two-story commercial building with fresh tan stucco between stacked-stone columns, scaffolding still up on one corner', width: 1400, height: 986 },
    ],
  },
  {
    slug: 'two-story-home-new-construction',
    title: 'New-Construction Stucco on a Two-Story Home',
    service: 'stucco-installation',
    summary: 'Foam board and lath stage of a residential install, fully scaffolded, ahead of the base and finish coats.',
    images: [
      { src: '/projects/new-construction-stucco-two-story-home.webp', thumb: '/projects/new-construction-stucco-two-story-home-thumb.webp', alt: 'Two-story home under construction wrapped in white foam board and scaffolding, ready for stucco base coat', width: 640, height: 480, label: 'In progress' },
    ],
  },
  {
    slug: 'storefront-entrance-tower-recoat',
    title: 'Storefront Entrance Tower Recoat',
    service: 'commercial-stucco',
    summary: 'New finish coat in a deep green on a retail entrance tower, with the crew reinstalling the metal canopy after the coat cured. Store stayed open through the job.',
    images: [
      { src: '/projects/commercial-stucco-entrance-tower-green.webp', thumb: '/projects/commercial-stucco-entrance-tower-green-thumb.webp', alt: 'Two crew members on scaffolding reinstalling a metal canopy over a storefront entrance freshly finished in dark green stucco', width: 684, height: 786 },
    ],
  },
  {
    slug: 'commercial-storefront-color-finish',
    title: 'Multi-Color Finish on a Retail Storefront',
    service: 'commercial-stucco',
    summary: 'Finished commercial facade with panels in teal, gray, and white, laid out around the storefront glazing. Clean reveals between colors.',
    images: [
      { src: '/projects/commercial-stucco-storefront-finished.webp', thumb: '/projects/commercial-stucco-storefront-finished-thumb.webp', alt: 'Finished retail storefront with stucco panels in teal, gray, and white around large black-framed windows', width: 1086, height: 874, label: 'Completed' },
    ],
  },
  {
    slug: 'commercial-building-recoat',
    title: 'Commercial Building Recoat',
    service: 'commercial-stucco',
    summary: 'Crew applying a new coat across a single-story commercial building, windows masked, working from scaffolding along the full elevation.',
    images: [
      { src: '/projects/commercial-stucco-recoat-crew-scaffolding.webp', thumb: '/projects/commercial-stucco-recoat-crew-scaffolding-thumb.webp', alt: 'Stucco crew on scaffolding applying a fresh coat to a commercial building with masked windows', width: 1132, height: 860, label: 'In progress' },
    ],
  },
  {
    slug: 'eifs-base-coat-multi-story',
    title: 'EIFS Base Coat on a Multi-Story Building',
    service: 'eifs-synthetic-stucco',
    summary: 'Gray base coat with embedded mesh across a three-story EIFS elevation, fully scaffolded, ahead of the finish coat.',
    images: [
      { src: '/projects/commercial-eifs-base-coat-scaffolding.webp', thumb: '/projects/commercial-eifs-base-coat-scaffolding-thumb.webp', alt: 'Three-story building covered in scaffolding with a fresh gray EIFS base coat applied across the whole elevation', width: 690, height: 652, label: 'In progress' },
    ],
  },
  {
    slug: 'two-story-commercial-repair',
    title: 'Stucco Repair on a Two-Story Commercial Building',
    service: 'stucco-repairs',
    summary: 'Crew on scaffolding repairing and recoating the street-facing elevation of a two-story commercial building.',
    images: [
      { src: '/projects/commercial-stucco-repair-two-story.webp', thumb: '/projects/commercial-stucco-repair-two-story-thumb.webp', alt: 'Workers on scaffolding across the front of a two-story tan commercial building during stucco repair', width: 1058, height: 744, label: 'In progress' },
    ],
  },
  {
    slug: 'multifamily-stucco-stone',
    title: 'Multi-Family Stucco and Stone Exterior',
    service: 'commercial-stucco',
    summary: 'Four-story multi-family building with stucco in red and tan, dark trim bands, and stacked-stone accent columns.',
    images: [
      { src: '/projects/multifamily-stucco-stone-exterior.webp', thumb: '/projects/multifamily-stucco-stone-exterior-thumb.webp', alt: 'Four-story apartment building with red and tan stucco, dark trim, and stacked-stone corner columns', width: 967, height: 753 },
    ],
  },
];
