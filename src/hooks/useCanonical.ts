import { useEffect } from 'react';

const BASE = 'https://cliexai.com';

// ─── Per-page meta config ─────────────────────────────────────
const HOME_DESC =
  'Deploy highly conversational, 24/7 AI Voice Agents that answer business calls, book appointments, take restaurant orders, and handle customer inquiries instantly. No missed calls. No staff costs.';

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title:       'ClieX AI | 24/7 AI Voice Agents Agency',
    description: HOME_DESC,
    canonical:   `${BASE}/`,
  },
  '/login': {
    title:       'Sign In | ClieX AI',
    description: 'Sign in to your ClieX AI account to manage your AI Voice Agent, view call logs, and track performance — all in one secure dashboard.',
    canonical:   `${BASE}/login`,
  },
  '/portal': {
    title:       'Client Portal | ClieX AI',
    description: 'Access your ClieX AI client portal to review AI agent activity, update settings, and monitor your 24/7 voice automation.',
    canonical:   `${BASE}/portal`,
  },
  '/admin': {
    title:       'Admin | ClieX AI',
    description: 'ClieX AI internal admin dashboard.',
    canonical:   `${BASE}/admin`,
  },
};

// ─── Helper: set or create a <meta> tag ───────────────────────
function setMeta(selector: string, attribute: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    // Parse attribute name and value from selector, e.g. name="description"
    const match = selector.match(/\[(\w+[-\w]*)="([^"]+)"\]/);
    if (match) el.setAttribute(match[1], match[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attribute, value);
}

/**
 * Dynamically sets <title>, <meta name="description">,
 * all og:/twitter: description tags, and <link rel="canonical">
 * in <head> based on the current page path — always using
 * https://cliexai.com as the base, never a Vercel URL.
 */
export function useCanonical() {
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    const meta = PAGE_META[path] ?? PAGE_META['/'];

    // ── <title> ───────────────────────────────────────────────
    document.title = meta.title;

    // ── <meta name="description"> ────────────────────────────
    setMeta('meta[name="description"]', 'content', meta.description);

    // ── Open Graph ───────────────────────────────────────────
    setMeta('meta[property="og:title"]',       'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]',         'content', meta.canonical);

    // ── Twitter Card ─────────────────────────────────────────
    setMeta('meta[name="twitter:title"]',       'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);

    // ── <link rel="canonical"> ───────────────────────────────
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = meta.canonical;
  }, []);
}
