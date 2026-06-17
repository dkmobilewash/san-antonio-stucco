import { useEffect } from 'react';

const SITE_NAME = 'San Antonio Stucco';
const SITE_URL = 'https://sanantoniostucco.com';
const DEFAULT_IMAGE = 'https://tsybcnnjylmvhsxzknug.supabase.co/storage/v1/object/sign/San%20Antonio%20Stucco/san-antonio-stucco.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2ZkNDYwMC00NmYxLTQ0YWItYmZiYi1jODY3N2Y3YjM1MzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTYW4gQW50b25pbyBTdHVjY28vc2FuLWFudG9uaW8tc3R1Y2NvLnBuZyIsImlhdCI6MTc3NzU3ODEzOSwiZXhwIjoxODA5MTE0MTM5fQ.1hP43qIGRyXlwLX02o92zUXeVzuLUpxvJDbBl_Ley_M';

interface PageSEO {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  rawTitle?: boolean;
  jsonLd?: object | object[];
}

export function usePageSEO({ title, description, path, image, type = 'website', rawTitle, jsonLd }: PageSEO) {
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

    let ldScript = document.querySelector('script[data-seo-jsonld]') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.type = 'application/ld+json';
        ldScript.setAttribute('data-seo-jsonld', 'true');
        document.head.appendChild(ldScript);
      }
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      ldScript.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    } else if (ldScript) {
      ldScript.remove();
    }

    return () => {
      if (ldScript) ldScript.remove();
    };
  }, [title, description, path, image, type, rawTitle, jsonLd]);
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
