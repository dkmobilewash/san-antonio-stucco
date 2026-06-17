import { useRef } from 'react';

const SITE_URL = 'https://sanantoniostucco.com';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function SEO({ title, description, keywords, canonical }: SEOProps) {
  const lastApplied = useRef<string>('');
  const key = `${title}|${description}|${keywords || ''}|${canonical || ''}`;

  if (lastApplied.current !== key) {
    lastApplied.current = key;

    document.title = title;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow');
    if (keywords) {
      setMeta('name', 'keywords', keywords);
    }

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical || `${SITE_URL}${window.location.pathname === '/' ? '' : window.location.pathname}`);

    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    setCanonical(canonical || `${SITE_URL}${window.location.pathname === '/' ? '' : window.location.pathname}`);
  }

  return null;
}
