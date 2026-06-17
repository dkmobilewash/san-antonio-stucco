import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { contact } from '../data/contact';
import { services } from '../data/services';
import { locations } from '../data/locations';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setAreasOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services', hasDropdown: 'services' as const },
    { to: '/stucco-repair', label: 'Stucco Repair' },
    { to: '/service-areas', label: 'Service Areas', hasDropdown: 'areas' as const },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
  ];

  const serviceLinks = [
    { to: '/stucco-installation', label: 'Stucco Installation' },
    { to: '/stucco-replacement', label: 'Stucco Replacement' },
    { to: '/residential-stucco', label: 'Residential Stucco' },
    { to: '/commercial-stucco', label: 'Commercial Stucco' },
    { to: '/stucco-remodeling', label: 'Stucco Remodeling' },
    { to: '/stucco-repairs', label: 'Stucco Repairs' },
    { to: '/eifs-synthetic-stucco', label: 'EIFS / Synthetic Stucco' },
    { to: '/stucco-painting', label: 'Stucco Painting' },
  ];

  const areaLinks = locations.map((l) => ({ to: `/${l.slug}`, label: l.name }));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="bg-sand-700 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span>{contact.hours}</span>
          <a href={`tel:${contact.phoneRaw}`} className="flex items-center gap-1.5 hover:text-sand-200 transition-colors">
            <Phone size={14} />
            {contact.phone}
          </a>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/san-antonio-stucco.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vc2FuLWFudG9uaW8tc3R1Y2NvLnBuZyIsImlhdCI6MTc3NzU3ODEzOSwiZXhwIjoxODA5MTE0MTM5fQ.1hP43qIGRyXlwLX02o92zUXeVzuLUpxvJDbBl_Ley_M"
            alt="San Antonio Stucco"
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.to} className="relative group">
              <Link
                to={link.to}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname === link.to ||
                  (link.hasDropdown === 'services' && services.some((s) => location.pathname === `/${s.slug}`)) ||
                  (link.hasDropdown === 'areas' && locations.some((l) => location.pathname === `/${l.slug}`))
                    ? 'text-sand-600' : 'text-slate-700 hover:text-sand-600'
                }`}
                onMouseEnter={() => {
                  if (link.hasDropdown === 'services') setServicesOpen(true);
                  if (link.hasDropdown === 'areas') setAreasOpen(true);
                }}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} />}
              </Link>
              {link.hasDropdown === 'services' && (
                <div
                  className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 transition-all ${
                    servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {serviceLinks.map((sl) => (
                    <Link
                      key={sl.to}
                      to={sl.to}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-sand-50 hover:text-sand-700 transition-colors"
                    >
                      {sl.label}
                    </Link>
                  ))}
                </div>
              )}
              {link.hasDropdown === 'areas' && (
                <div
                  className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 transition-all ${
                    areasOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                  onMouseEnter={() => setAreasOpen(true)}
                  onMouseLeave={() => setAreasOpen(false)}
                >
                  {areaLinks.map((al) => (
                    <Link
                      key={al.to}
                      to={al.to}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-sand-50 hover:text-sand-700 transition-colors"
                    >
                      {al.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${contact.phoneRaw}`}
            className="text-sm font-medium text-slate-700 hover:text-sand-600 transition-colors flex items-center gap-1.5"
          >
            <Phone size={16} />
            {contact.phone}
          </a>
          <Link
            to="/quote"
            className="bg-sand-600 hover:bg-sand-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            Get Free Estimate
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-slate-700"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <div key={link.to}>
              <Link to={link.to} className="block py-2 text-slate-700 font-medium">
                {link.label}
              </Link>
              {link.hasDropdown === 'services' && (
                <div className="pl-4 space-y-1">
                  {serviceLinks.map((sl) => (
                    <Link key={sl.to} to={sl.to} className="block py-1.5 text-sm text-slate-600">
                      {sl.label}
                    </Link>
                  ))}
                </div>
              )}
              {link.hasDropdown === 'areas' && (
                <div className="pl-4 space-y-1">
                  {areaLinks.map((al) => (
                    <Link key={al.to} to={al.to} className="block py-1.5 text-sm text-slate-600">
                      {al.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to="/quote"
            className="block bg-sand-600 text-white text-center py-3 rounded-lg font-semibold mt-4"
          >
            Get Free Estimate
          </Link>
          <a
            href={`tel:${contact.phoneRaw}`}
            className="block text-center py-2 text-sand-700 font-medium"
          >
            Call {contact.phone}
          </a>
        </div>
      )}
    </header>
  );
}
