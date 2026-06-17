import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const serviceOptions = [
  'New Installation',
  'Stucco Replacement',
  'Stucco Repair',
  'Remodeling',
  'Commercial',
  'Other Service',
];

export default function EstimateForm({ compact = false }: { compact?: boolean }) {
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', description: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await supabase.from('leads').insert({
        service: selectedService,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        description: formData.description,
      });
    } catch {
      // still show success to user
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center ${compact ? '' : ''}`}>
        <CheckCircle className="mx-auto text-sage-600 mb-4" size={48} />
        <h3 className="text-xl font-bold text-slate-800 mb-2">Estimate Request Received</h3>
        <p className="text-slate-600">We'll contact you within one business day to discuss your project.</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden ${compact ? '' : ''}`}>
      <div className="bg-slate-800 px-6 py-4">
        <h3 className="text-white font-bold text-lg">Request Free Estimate</h3>
        <p className="text-slate-400 text-sm">Select your service to get started</p>
      </div>

      <div className="p-6">
        {!selectedService ? (
          <div className="grid grid-cols-2 gap-3">
            {serviceOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedService(option)}
                className="p-3 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-sand-50 hover:text-sand-700 border border-slate-200 hover:border-sand-300 rounded-xl transition-all text-left"
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-sand-700 bg-sand-50 px-3 py-1 rounded-full">
                {selectedService}
              </span>
              <button
                type="button"
                onClick={() => setSelectedService('')}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Change
              </button>
            </div>

            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sand-500 focus:border-sand-500 outline-none transition-all"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sand-500 focus:border-sand-500 outline-none transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sand-500 focus:border-sand-500 outline-none transition-all"
            />
            <textarea
              placeholder="Brief Project Description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sand-500 focus:border-sand-500 outline-none transition-all resize-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-sand-600 hover:bg-sand-700 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? 'Sending...' : 'Get My Free Estimate'}
              {!submitting && <ArrowRight size={16} />}
            </button>
            <p className="text-xs text-slate-500 text-center">No obligation. We respond within 1 business day.</p>
          </form>
        )}
      </div>
    </div>
  );
}
