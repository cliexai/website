import Lenis from 'lenis';

const HEADER_OFFSET = 80;

let lenisInstance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

function pulseSection(el: HTMLElement) {
  el.animate(
    [
      { boxShadow: 'inset 0 0 0 0 rgba(139, 92, 246, 0)' },
      { boxShadow: 'inset 0 0 0 2px rgba(139, 92, 246, 0.25)' },
      { boxShadow: 'inset 0 0 0 0 rgba(139, 92, 246, 0)' },
    ],
    { duration: 800, easing: 'ease-in-out', iterations: 1 }
  );
}

export function scrollToElement(el: HTMLElement) {
  const targetTop = Math.max(0, el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);

  if (lenisInstance) {
    lenisInstance.scrollTo(targetTop, {
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    setTimeout(() => pulseSection(el), 1600);
    return;
  }

  const startTop = window.scrollY;
  const distance = targetTop - startTop;

  if (Math.abs(distance) < 2) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, targetTop);
    return;
  }

  const duration = Math.min(1000, Math.max(450, Math.abs(distance) * 0.55));
  const startTime = performance.now();

  const animate = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const t = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, startTop + distance * t);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
  setTimeout(() => pulseSection(el), duration + 100);
}

export function scrollToId(id: string, updateHash = true) {
  const el = document.getElementById(id);
  if (!el) return;

  scrollToElement(el);

  if (updateHash) {
    const hash = `#${id}`;
    if (window.location.hash !== hash) {
      history.pushState(null, '', hash);
    }
  }
}

export function handleDocumentAnchorClick(e: MouseEvent) {
  const link = (e.target as Element).closest('a[href^="#"]');
  if (!link || link.getAttribute('href') === '#') return;

  const href = link.getAttribute('href');
  if (!href) return;

  const id = decodeURIComponent(href.slice(1));
  const target = document.getElementById(id);
  if (!target) return;

  e.preventDefault();
  scrollToElement(target);
  if (window.location.hash !== href) {
    history.pushState(null, '', href);
  }
}
