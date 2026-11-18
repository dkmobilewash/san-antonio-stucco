import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { track } from '../lib/analytics';

const serviceOptions = [
  'Stucco Repair',
  'New Installation',
  'Stucco Replacement',
  'Remodeling',
  'Painting',
  'Commercial',
  'Not sure yet',
];

export default function EstimateForm({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', description: '', service: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { supabase } = await import('../lib/supabase');
      await supabase.from('leads').insert({
        service: formData.service || 'unspecified',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        description: formData.description,
      });

      try {
        await fetch('https://hooks.zapier.com/hooks/catch/20117350/44fmixd/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            service: formData.service || 'unspecified',
            description: formData.description,
            website: 'San Antonio Stucco',
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (zapierError) {
        console.error('[Zapier Webhook Error]', zapierError);
      }
    } catch {
      // still show success to user
    }
    setSubmitting(false);
    setSubmitted(true);
    track('generate_lead', {
      method: 'estimate_form',
      service: formData.service || 'unspecified',
      form_variant: compact ? 'compact' : 'full',
    });
    navigate('/quote/thanks');
  };

  if (submitted) {
    return (
      <div className={`bg-white rounded-2xl shadow-xl border border-slate-100 p-8 ${compact ? '' : ''}`}>
        <CheckCircle className="mx-auto text-sage-600 mb-4" size={48} />
        <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">Estimate Request Received</h3>
        <div className="space-y-3 mt-4">
          <p className="text-slate-800 font-semibold text-sm">What happens next:</p>
          <ol className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="bg-sand-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
              We call you within one business day
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-sand-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
              We schedule a free on-site look
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-sand-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
              You receive a detailed written estimate
            </li>
          </ol>
          <div className="pt-3 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600 mb-1">Need it sooner?</p>
            <a href="tel:+12108718490" className="text-sand-600 hover:text-sand-700 font-semibold text-lg inline-flex items-center gap-1.5">
              <Phone size={18} /> (210) 871-8490
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden ${compact ? '' : ''}`}>
      <div className="bg-slate-800 px-6 py-4">
        <h3 className="text-white font-bold text-lg">Get Your Free Estimate</h3>
        <p className="text-slate-300 text-sm">Takes 30 seconds. We call you back.</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-sand-500 focus:border-sand-500 outline-none transition-all"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            autoComplete="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-sand-500 focus:border-sand-500 outline-none transition-all"
          />
          <textarea
            placeholder="What's going on with your stucco? (e.g. cracks near the garage, about 10 ft of wall)"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-sand-500 focus:border-sand-500 outline-none transition-all resize-none"
          />
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-sand-500 focus:border-sand-500 outline-none transition-all text-slate-500"
          >
            <option value="">Service needed (optional)</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option} className="text-slate-700">{option}</option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email (optional)"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-sand-500 focus:border-sand-500 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-sand-600 hover:bg-sand-700 text-white py-3.5 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {submitting ? 'Sending...' : 'Get My Free Estimate'}
            {!submitting && <ArrowRight size={18} />}
          </button>
          <p className="text-xs text-slate-500 text-center">No obligation. We respond within 1 business day.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
            <span>★ 5.0 on Google</span>
            <span>·</span>
            <span>Licensed & insured</span>
            <span>·</span>
            <span>Own crew, no subs</span>
          </div>
        </form>
      </div>
    </div>
  );
}
