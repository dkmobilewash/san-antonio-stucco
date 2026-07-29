export interface Testimonial {
  name: string;
  location: string;
  text: string;
  service: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Angelica R.',
    location: 'San Antonio, TX',
    text: 'San Antonio Stucco was absolutely AMAZING!! As a family with small children and a busy schedule they made the entire process so easy!! 10/10',
    service: 'Residential Stucco',
    rating: 5,
  },
  {
    name: 'John H.',
    location: 'San Antonio, TX',
    text: 'Professional and went the extra mile to get me taken care of. The best you can ask for and budget friendly.',
    service: 'Stucco Repairs',
    rating: 5,
  },
  {
    name: 'Enrique P.',
    location: 'San Antonio, TX',
    text: 'First time here and the place was amazing! I\'ve gone to plenty of other places but this for sure will be my new go-to over anyone else. I recommend to anyone looking!',
    service: 'Stucco Installation',
    rating: 5,
  },
  {
    name: 'Makayla D.',
    location: 'San Antonio, TX',
    text: 'Amazing company I highly recommend. Responsive and knowledgeable. Thank you for helping us!',
    service: 'Stucco Repairs',
    rating: 5,
  },
  {
    name: 'Sarah S.',
    location: 'San Antonio, TX',
    text: 'Fabulous company!! They did a great job and great price.',
    service: 'Stucco Replacement',
    rating: 5,
  },
  {
    name: 'Perry',
    location: 'San Antonio, TX',
    text: 'Great company and awesome service.',
    service: 'Commercial Stucco',
    rating: 5,
  },
];
