import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { services } from './data/services';

const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const ServiceAreasPage = lazy(() => import('./pages/ServiceAreasPage'));
const LocationDetailPage = lazy(() => import('./pages/LocationDetailPage'));
const QuotePage = lazy(() => import('./pages/QuotePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const PlasterArticlePage = lazy(() => import('./pages/PlasterArticlePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ServiceLocationPage = lazy(() => import('./pages/ServiceLocationPage'));

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
      <Header />
      <main className="min-h-screen">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
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
            {services.map((s) => (
              <Route key={`${s.slug}-san-antonio`} path={`/${s.slug}/san-antonio`} element={<ServiceLocationPage />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
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
