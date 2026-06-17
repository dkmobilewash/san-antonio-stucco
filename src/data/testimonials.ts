export interface Testimonial {
  name: string;
  location: string;
  text: string;
  service: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Robert M.',
    location: 'Stone Oak, San Antonio',
    text: 'San Antonio Stucco replaced the entire exterior of our home after years of moisture damage. The crew was professional, on time every day, and the result is absolutely stunning. Neighbors keep stopping to compliment the finish.',
    service: 'Stucco Replacement',
    rating: 5,
  },
  {
    name: 'Maria L.',
    location: 'Alamo Heights, San Antonio',
    text: 'We needed delicate repair work on our 1940s home that matched the original texture. Their team studied the existing pattern and delivered a seamless match. You cannot tell where the repair was made.',
    service: 'Stucco Repairs',
    rating: 5,
  },
  {
    name: 'James & Karen T.',
    location: 'Boerne, TX',
    text: 'Our new Hill Country home needed stucco that complemented the surrounding landscape. San Antonio Stucco recommended the perfect texture and color combination. The installation was flawless.',
    service: 'Stucco Installation',
    rating: 5,
  },
  {
    name: 'David R.',
    location: 'Helotes, TX',
    text: 'After getting three quotes for EIFS repair, these guys were the only ones who clearly understood the system and explained what needed to happen. Fixed it right the first time. No more water issues.',
    service: 'EIFS / Synthetic Stucco',
    rating: 5,
  },
  {
    name: 'Patricia S.',
    location: 'Schertz, TX',
    text: 'We wanted to modernize our 1990s exterior from heavy dash to a smooth contemporary finish. The transformation is incredible. Our home looks brand new and we have already seen interest from neighbors wanting the same work.',
    service: 'Stucco Remodeling',
    rating: 5,
  },
  {
    name: 'Michael C.',
    location: 'San Antonio, TX',
    text: 'Hired them for our office building exterior. They worked weekends to avoid disrupting our tenants, stayed on budget, and the building looks phenomenal. Already planning phase two with them.',
    service: 'Commercial Stucco',
    rating: 5,
  },
];
