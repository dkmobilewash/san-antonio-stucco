/**
 * GA4 conversion tracking. The gtag snippet in index.html loads the tag and sends the first
 * page_view; everything else on this SPA has to be sent by hand, which this module does:
 *
 *   page_view      on every client-side route change (sent from usePageSEO once the title is set)
 *   phone_call     any tel: link click, with link_placement (header, mobile_call_bar, footer, hero, …)
 *   sms_click      any sms: link click
 *   email_click    any mailto: link click
 *   review_click   the Google review link
 *   generate_lead  a successful estimate-form submission (GA4's recommended lead event)
 *
 * Contact-link events are attached once with a delegated listener (installContactLinkTracking),
 * so new tel/mailto links anywhere in the tree are tracked without touching them. A wrapper can
 * name its placement with `data-track="…"`; otherwise <header>/<footer>/body is used.
 *
 * Every call is a no-op when gtag is absent (SSR, ad blockers, local dev without the tag).
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return null;
  return window.gtag;
}

export function track(event: string, params: Params = {}): void {
  const g = gtag();
  if (!g) return;
  g('event', event, { page_path: window.location.pathname, ...params });
}

export function trackPageView(path: string, title: string): void {
  const g = gtag();
  if (!g) return;
  g('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  });
}

function placementOf(el: Element): string {
  const named = el.closest('[data-track]');
  if (named) return named.getAttribute('data-track') || 'body';
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  return 'body';
}

/** Tracks tel:, sms:, mailto: and Google-review link clicks anywhere in the document. */
export function installContactLinkTracking(): () => void {
  if (typeof document === 'undefined') return () => {};
  const handler = (e: MouseEvent) => {
    const target = e.target as Element | null;
    const a = target?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const base = { link_placement: placementOf(a), link_url: href };
    if (href.startsWith('tel:')) track('phone_call', base);
    else if (href.startsWith('sms:')) track('sms_click', base);
    else if (href.startsWith('mailto:')) track('email_click', base);
    else if (/g\.page\/r\/|google\.com\/maps/.test(href)) track('review_click', base);
  };
  // Capture phase so the event is queued before the browser follows the link.
  document.addEventListener('click', handler, true);
  return () => document.removeEventListener('click', handler, true);
}
