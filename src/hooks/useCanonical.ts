import { useEffect } from 'react';

const BASE = 'https://cliexai.com';

/**
 * Dynamically sets <link rel="canonical"> in <head> based on the current
 * page path, always pointing to https://cliexai.com — never a Vercel URL.
 *
 * Rules:
 *  - "/" or "" → https://cliexai.com/
 *  - "/login"  → https://cliexai.com/login
 *  - "/portal" → https://cliexai.com/portal
 *  etc.
 */
export function useCanonical() {
  useEffect(() => {
    const path = window.location.pathname;

    // Normalise: trailing slash only on root
    const canonical =
      path === '/' || path === ''
        ? `${BASE}/`
        : `${BASE}${path.replace(/\/+$/, '')}`;

    // Find or create the canonical <link> element
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }

    link.href = canonical;

    // Cleanup is intentionally omitted — the canonical tag should
    // stay in the <head> for the lifetime of the page.
  }, []);
}
