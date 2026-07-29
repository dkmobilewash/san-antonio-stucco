import { Star, ExternalLink } from 'lucide-react';

// TODO: Replace with actual Google Business Profile review URL
// Find it at: Google Business Profile > Home > "Get more reviews" > copy link
const GOOGLE_REVIEW_URL = 'https://g.page/r/sanantoniostucco/review';

export default function ReviewCTA() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={24} className="fill-sand-500 text-sand-500" />
          ))}
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Had a Great Experience? Leave Us a Review
        </h2>
        <p className="text-slate-600 mb-6 max-w-xl mx-auto">
          Your feedback helps other San Antonio homeowners find a stucco contractor they can trust. It takes less than a minute.
        </p>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-sand-600 hover:bg-sand-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
        >
          Review Us on Google <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}
