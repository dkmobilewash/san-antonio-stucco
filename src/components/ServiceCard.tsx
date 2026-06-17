import { Link } from 'react-router-dom';
import { ArrowRight, Layers, RefreshCw, Home, Building2, Paintbrush, Wrench, Shield, type LucideIcon } from 'lucide-react';
import type { Service } from '../data/services';

const iconMap: Record<string, LucideIcon> = {
  Layers, RefreshCw, Home, Building2, Paintbrush, Wrench, Shield,
};

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] || Layers;

  return (
    <Link
      to={`/${service.slug}`}
      className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-sand-200 transition-all"
    >
      <div className="w-12 h-12 bg-sand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sand-100 transition-colors">
        <Icon size={24} className="text-sand-600" />
      </div>
      <h3 className="font-bold text-slate-800 text-lg mb-2">{service.name}</h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.shortDescription}</p>
      <span className="text-sand-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
        Learn More <ArrowRight size={14} />
      </span>
    </Link>
  );
}
