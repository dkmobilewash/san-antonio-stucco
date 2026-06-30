import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SchemaMarkup from './components/SchemaMarkup';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import LocationDetailPage from './pages/LocationDetailPage';
import QuotePage from './pages/QuotePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PlasterArticlePage from './pages/PlasterArticlePage';
import StuccoRepairPage from './pages/StuccoRepairPage';
import StuccoContractorPage from './pages/StuccoContractorPage';
import StuccoRepairSanAntonioPage from './pages/StuccoRepairSanAntonioPage';
import StuccoInstallationSanAntonioPage from './pages/StuccoInstallationSanAntonioPage';
import EifsSanAntonioPage from './pages/EifsSanAntonioPage';
import CommercialStuccoSanAntonioPage from './pages/CommercialStuccoSanAntonioPage';
import NotFoundPage from './pages/NotFoundPage';
import { services } from './data/services';
import { locations } from './data/locations';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <SchemaMarkup />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/stucco-repair" element={<StuccoRepairPage />} />
          <Route path="/stucco-contractor-san-antonio" element={<StuccoContractorPage />} />
          <Route path="/stucco-repair-san-antonio" element={<StuccoRepairSanAntonioPage />} />
          <Route path="/stucco-installation-san-antonio" element={<StuccoInstallationSanAntonioPage />} />
          <Route path="/eifs-stucco-san-antonio" element={<EifsSanAntonioPage />} />
          <Route path="/commercial-stucco-san-antonio" element={<CommercialStuccoSanAntonioPage />} />
          <Route path="/service-areas" element={<ServiceAreasPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/us-largest-plaster-producer-san-antonio" element={<PlasterArticlePage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {services.map((s) => (
            <Route key={s.slug} path={`/${s.slug}`} element={<ServiceDetailPage />} />
          ))}
          {locations.map((l) => (
            <Route key={l.slug} path={`/${l.slug}`} element={<LocationDetailPage />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
