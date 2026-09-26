/**
 * Homepage FAQs. Rendered by HomePage.tsx and emitted as FAQPage JSON-LD by scripts/prerender.ts,
 * so the visible questions and the structured data always match.
 */
export interface Faq {
  question: string;
  answer: string;
}

export const homeFaqs: Faq[] = [
  { question: 'How much does stucco cost in San Antonio?', answer: 'Stucco repairs typically range from $300–$5,000 depending on the scope of damage. New stucco installation runs $8–$15 per square foot, and full replacement ranges from $10–$18 per square foot. We provide free on-site estimates with exact pricing.' },
  { question: 'How long does stucco installation take?', answer: 'Most residential stucco installations take 1–3 weeks depending on the size of the project and weather conditions. Our three-coat system requires proper curing time between coats to ensure long-term durability in San Antonio\'s climate.' },
  { question: 'Do you offer warranties on stucco work?', answer: 'Yes. We offer workmanship warranties on all stucco installations and repairs. The exact warranty terms depend on the scope of the project and are provided in writing before work begins.' },
  { question: 'What areas do you serve?', answer: 'We serve San Antonio and surrounding communities including Boerne, New Braunfels, Schertz, Helotes, Stone Oak, Alamo Heights, Live Oak, Universal City, Leon Valley, and Selma.' },
  { question: 'How do I know if my stucco needs repair?', answer: 'Common signs include visible cracks, discoloration or staining, areas that sound hollow when tapped, bubbling or blistering, and moisture or mold near stucco walls. If you notice any of these, contact us for a free inspection.' },
  { question: 'How do I find a stucco contractor near me in San Antonio?', answer: 'San Antonio Stucco is a locally owned, licensed, and insured stucco contractor serving the entire San Antonio metro area. Call (210) 871-8490 for a free estimate.' },
  { question: 'Are you a licensed stucco contractor in San Antonio?', answer: 'Yes. San Antonio Stucco is a locally owned, licensed, and insured stucco contractor serving Bexar County and the surrounding metro. We use our own crew — no subcontractors — for every repair, installation, and painting project. Call (210) 871-8490 for proof of license and insurance.' },
];
