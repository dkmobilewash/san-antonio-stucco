import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { contact } from '../data/contact';
import { services } from '../data/services';
import { locations } from '../data/locations';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/san-antonio-stucco.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vc2FuLWFudG9uaW8tc3R1Y2NvLnBuZyIsImlhdCI6MTc3NzU3ODEzOSwiZXhwIjoxODA5MTE0MTM5fQ.1hP43qIGRyXlwLX02o92zUXeVzuLUpxvJDbBl_Ley_M"
                alt="San Antonio Stucco"
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              San Antonio's trusted stucco contractor. Expert installation, repair, and replacement built to withstand Texas heat and humidity.
            </p>
            <div className="space-y-3 text-sm">
              <a href={`tel:${contact.phoneRaw}`} className="flex items-center gap-2 text-slate-300 hover:text-sand-400 transition-colors">
                <Phone size={16} /> {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-slate-300 hover:text-sand-400 transition-colors">
                <Mail size={16} /> {contact.email}
              </a>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin size={16} /> {contact.address}
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock size={16} /> {contact.hours}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/${s.slug}`} className="text-sm text-slate-400 hover:text-sand-400 transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link to={`/${l.slug}`} className="text-sm text-slate-400 hover:text-sand-400 transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-white mb-4 mt-8">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-slate-400 hover:text-sand-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-sm text-slate-400 hover:text-sand-400 transition-colors">All Services</Link></li>
              <li><Link to="/service-areas" className="text-sm text-slate-400 hover:text-sand-400 transition-colors">All Service Areas</Link></li>
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-sand-400 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-sm text-slate-400 hover:text-sand-400 transition-colors">Blog & Resources</Link></li>
              <li><Link to="/quote" className="text-sm text-slate-400 hover:text-sand-400 transition-colors">Get a Free Estimate</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Get a Free Estimate</h3>
            <p className="text-slate-400 text-sm mb-4">
              Ready to start your stucco project? Get a no-obligation estimate from our team.
            </p>
            <Link
              to="/quote"
              className="inline-block bg-sand-600 hover:bg-sand-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
            >
              Request Estimate
            </Link>
            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <p className="text-sm text-slate-300 font-medium mb-1">Call Us Directly</p>
              <a href={`tel:${contact.phoneRaw}`} className="text-xl font-bold text-sand-400 hover:text-sand-300 transition-colors">
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} San Antonio Stucco. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Serving San Antonio, Boerne, New Braunfels, and surrounding areas.
          </p>
          <p className="text-xs text-slate-600">v2.1</p>
        </div>
      </div>
    </footer>
  );
}
