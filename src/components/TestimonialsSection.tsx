import { Star } from 'lucide-react';
import { testimonials, Testimonial } from '../data/testimonials';

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-sand-500 text-sand-500" />
        ))}
      </div>
      <p className="text-slate-700 text-sm leading-relaxed mb-4">"{testimonial.text}"</p>
      <div className="border-t border-slate-100 pt-3">
        <p className="font-semibold text-slate-800 text-sm">{testimonial.name}</p>
        <p className="text-slate-500 text-xs">{testimonial.location} | {testimonial.service}</p>
      </div>
    </div>
  );
}

interface TestimonialsSectionProps {
  title?: string;
  filter?: string;
}

export default function TestimonialsSection({ title = 'What Our Clients Say', filter }: TestimonialsSectionProps) {
  const filtered = filter
    ? testimonials.filter((t) => t.service === filter).slice(0, 3)
    : testimonials.slice(0, 3);

  const display = filtered.length >= 2 ? filtered : testimonials.slice(0, 3);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">{title}</h2>
        <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Hear from homeowners and property managers who trust San Antonio Stucco for their exterior projects.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {display.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
