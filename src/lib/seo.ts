import { useEffect } from 'react';
import { trackPageView } from './analytics';

const SITE_NAME = 'San Antonio Stucco';
const SITE_URL = 'https://sanantoniostucco.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-commercial-stucco.webp`;

// The gtag snippet in index.html already reports the first page load.
let firstPageView = true;

interface PageSEO {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  rawTitle?: boolean;
}

export function usePageSEO({ title, description, path, image, type = 'website', rawTitle }: PageSEO) {
  useEffect(() => {
    const fullTitle = rawTitle ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${path}`;
    const ogImage = image || DEFAULT_IMAGE;

    document.title = fullTitle;

    setMeta('description', description);
    setMetaProperty('og:title', fullTitle);
    setMetaProperty('og:description', description);
    setMetaProperty('og:type', type);
    setMetaProperty('og:url', canonicalUrl);
    setMetaProperty('og:image', ogImage);
    setMetaProperty('og:site_name', SITE_NAME);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    if (firstPageView) firstPageView = false;
    else trackPageView(path, fullTitle);

  }, [title, description, path, image, type, rawTitle]);
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.content = content;
}

export { SITE_NAME, SITE_URL };
