import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { locations } from '../data/locations';
import { blogPosts } from '../data/blog';

const SITE_URL = 'https://sanantoniostucco.com';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'San Antonio Stucco',
  description: 'Professional stucco services in San Antonio, TX. Licensed & Insured.',
  url: SITE_URL,
  telephone: '(210) 871-8490',
  email: 'info@sanantoniostucco.com',
  image: `${SITE_URL}/images/og-image.jpg`,
  logo: `${SITE_URL}/images/logo.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5802 Rocky Pt Dr',
    addressLocality: 'San Antonio',
    addressRegion: 'TX',
    postalCode: '78249',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.5574,
    longitude: -98.6035,
  },
  areaServed: [
    { '@type': 'City', name: 'San Antonio' },
    { '@type': 'City', name: 'Boerne' },
    { '@type': 'City', name: 'New Braunfels' },
    { '@type': 'City', name: 'Schertz' },
    { '@type': 'City', name: 'Helotes' },
    { '@type': 'City', name: 'Stone Oak' },
    { '@type': 'City', name: 'Alamo Heights' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '14:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '87',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Stucco Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stucco Installation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stucco Repairs' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stucco Replacement' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'EIFS / Synthetic Stucco' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stucco Remodeling' } },
    ],
  },
};

const serviceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Stucco Installation in San Antonio',
    description: 'Professional stucco installation in San Antonio, TX.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'San Antonio' },
    serviceType: 'Stucco Installation',
    url: `${SITE_URL}/stucco-installation`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '8000',
      highPrice: '52000',
      priceCurrency: 'USD',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Stucco Repairs in San Antonio',
    description: 'Expert stucco repair services in San Antonio, TX.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'San Antonio' },
    serviceType: 'Stucco Repairs',
    url: `${SITE_URL}/stucco-repairs`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '300',
      highPrice: '5000',
      priceCurrency: 'USD',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Stucco Replacement in San Antonio',
    description: 'Complete stucco replacement in San Antonio, TX.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'San Antonio' },
    serviceType: 'Stucco Replacement',
    url: `${SITE_URL}/stucco-replacement`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '10000',
      highPrice: '60000',
      priceCurrency: 'USD',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'EIFS Synthetic Stucco in San Antonio',
    description: 'Premium EIFS and synthetic stucco services in San Antonio, TX.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'San Antonio' },
    serviceType: 'EIFS / Synthetic Stucco',
    url: `${SITE_URL}/eifs-synthetic-stucco`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '500',
      highPrice: '15000',
      priceCurrency: 'USD',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Stucco Painting in San Antonio',
    description: 'Professional stucco painting and elastomeric coatings in San Antonio, TX.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'San Antonio' },
    serviceType: 'Stucco Painting',
    url: `${SITE_URL}/stucco-painting`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '1500',
      highPrice: '12000',
      priceCurrency: 'USD',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Residential Stucco in San Antonio',
    description: 'Professional residential stucco services for San Antonio homes.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'San Antonio' },
    serviceType: 'Residential Stucco',
    url: `${SITE_URL}/residential-stucco`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '8000',
      highPrice: '52000',
      priceCurrency: 'USD',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Commercial Stucco in San Antonio',
    description: 'Professional commercial stucco services for San Antonio businesses.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'San Antonio' },
    serviceType: 'Commercial Stucco',
    url: `${SITE_URL}/commercial-stucco`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '8000',
      highPrice: '60000',
      priceCurrency: 'USD',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Stucco Remodeling in San Antonio',
    description: 'Expert stucco remodeling and renovation services in San Antonio, TX.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'San Antonio' },
    serviceType: 'Stucco Remodeling',
    url: `${SITE_URL}/stucco-remodeling`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '5000',
      highPrice: '36000',
      priceCurrency: 'USD',
    },
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is the best stucco contractor in San Antonio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'San Antonio Stucco is a top-rated, licensed and insured stucco contractor serving San Antonio and surrounding areas with over 10 years of experience and 500+ completed projects.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide free estimates for stucco work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide free, no-obligation estimates for all stucco projects. Contact us at (210) 871-8490 or submit a request through our website.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does stucco installation take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most residential stucco installations take 7 to 14 business days depending on square footage and complexity. Each coat requires proper curing time between applications.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you licensed and insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. San Antonio Stucco is fully licensed, bonded, and insured for both residential and commercial stucco work throughout Bexar County and the greater San Antonio metro area.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does stucco cost in San Antonio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stucco installation in San Antonio typically costs $8-$15 per square foot for a complete three-coat system. Repairs range from $300-$5,000 depending on scope. We provide detailed, transparent estimates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you serve Boerne and New Braunfels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We serve San Antonio, Boerne, New Braunfels, Schertz, Helotes, Stone Oak, Alamo Heights, and all surrounding communities within the greater San Antonio metropolitan area.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of stucco services do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer stucco installation, repair, replacement, remodeling, residential stucco, commercial stucco, and EIFS/synthetic stucco services for both homes and businesses.',
      },
    },
  ],
};

const BREADCRUMB_MAP: Record<string, { name: string; url: string }[]> = {
  '/': [{ name: 'Home', url: SITE_URL }],
  '/services': [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
  ],
  '/stucco-installation': [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
    { name: 'Stucco Installation', url: `${SITE_URL}/stucco-installation` },
  ],
  '/stucco-repairs': [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
    { name: 'Stucco Repairs', url: `${SITE_URL}/stucco-repairs` },
  ],
  '/stucco-repair': [
    { name: 'Home', url: SITE_URL },
    { name: 'Stucco Repair', url: `${SITE_URL}/stucco-repair` },
  ],
  '/stucco-replacement': [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
    { name: 'Stucco Replacement', url: `${SITE_URL}/stucco-replacement` },
  ],
  '/residential-stucco': [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
    { name: 'Residential Stucco', url: `${SITE_URL}/residential-stucco` },
  ],
  '/commercial-stucco': [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
    { name: 'Commercial Stucco', url: `${SITE_URL}/commercial-stucco` },
  ],
  '/stucco-remodeling': [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
    { name: 'Stucco Remodeling', url: `${SITE_URL}/stucco-remodeling` },
  ],
  '/eifs-synthetic-stucco': [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
    { name: 'EIFS / Synthetic Stucco', url: `${SITE_URL}/eifs-synthetic-stucco` },
  ],
  '/stucco-painting': [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
    { name: 'Stucco Painting', url: `${SITE_URL}/stucco-painting` },
  ],
  '/service-areas': [
    { name: 'Home', url: SITE_URL },
    { name: 'Service Areas', url: `${SITE_URL}/service-areas` },
  ],
  '/quote': [
    { name: 'Home', url: SITE_URL },
    { name: 'Get a Quote', url: `${SITE_URL}/quote` },
  ],
  '/about': [
    { name: 'Home', url: SITE_URL },
    { name: 'About', url: `${SITE_URL}/about` },
  ],
  '/blog': [
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
  ],
  '/stucco-contractor-san-antonio': [
    { name: 'Home', url: SITE_URL },
    { name: 'Stucco Contractor San Antonio', url: `${SITE_URL}/stucco-contractor-san-antonio` },
  ],
  '/stucco-repair-san-antonio': [
    { name: 'Home', url: SITE_URL },
    { name: 'Stucco Contractor San Antonio', url: `${SITE_URL}/stucco-contractor-san-antonio` },
    { name: 'Stucco Repair San Antonio', url: `${SITE_URL}/stucco-repair-san-antonio` },
  ],
  '/stucco-installation-san-antonio': [
    { name: 'Home', url: SITE_URL },
    { name: 'Stucco Contractor San Antonio', url: `${SITE_URL}/stucco-contractor-san-antonio` },
    { name: 'Stucco Installation San Antonio', url: `${SITE_URL}/stucco-installation-san-antonio` },
  ],
  '/eifs-stucco-san-antonio': [
    { name: 'Home', url: SITE_URL },
    { name: 'Stucco Contractor San Antonio', url: `${SITE_URL}/stucco-contractor-san-antonio` },
    { name: 'EIFS & Synthetic Stucco San Antonio', url: `${SITE_URL}/eifs-stucco-san-antonio` },
  ],
  '/commercial-stucco-san-antonio': [
    { name: 'Home', url: SITE_URL },
    { name: 'Stucco Contractor San Antonio', url: `${SITE_URL}/stucco-contractor-san-antonio` },
    { name: 'Commercial Stucco San Antonio', url: `${SITE_URL}/commercial-stucco-san-antonio` },
  ],
};

export default function SchemaMarkup() {
  const { pathname } = useLocation();
  const scriptRefs = useRef<HTMLScriptElement[]>([]);

  useEffect(() => {
    scriptRefs.current.forEach((s) => s.remove());
    scriptRefs.current = [];

    const schemas: object[] = [];

    if (pathname === '/') {
      schemas.push(...serviceSchemas, faqSchema);
    }

    let breadcrumbs = BREADCRUMB_MAP[pathname];

    if (!breadcrumbs) {
      const locationSlug = pathname.replace(/^\//, '');
      const loc = locations.find((l) => l.slug === locationSlug);
      if (loc) {
        breadcrumbs = [
          { name: 'Home', url: SITE_URL },
          { name: 'Service Areas', url: `${SITE_URL}/service-areas` },
          { name: loc.name, url: `${SITE_URL}/${loc.slug}` },
        ];
      }
    }

    if (!breadcrumbs && pathname.startsWith('/blog/')) {
      const blogSlug = pathname.replace('/blog/', '');
      const post = blogPosts.find((p) => p.slug === blogSlug);
      if (post) {
        breadcrumbs = [
          { name: 'Home', url: SITE_URL },
          { name: 'Blog', url: `${SITE_URL}/blog` },
          { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
        ];
      } else if (blogSlug === 'us-largest-plaster-producer-san-antonio') {
        breadcrumbs = [
          { name: 'Home', url: SITE_URL },
          { name: 'Blog', url: `${SITE_URL}/blog` },
          { name: 'US Largest Plaster Producer', url: `${SITE_URL}/blog/us-largest-plaster-producer-san-antonio` },
        ];
      }
    }

    if (breadcrumbs) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      });
    }

    schemas.forEach((schema, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', `schema-${i}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      scriptRefs.current.push(script);
    });

    return () => {
      scriptRefs.current.forEach((s) => s.remove());
      scriptRefs.current = [];
    };
  }, [pathname]);

  return null;
}
