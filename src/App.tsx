import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Agentation } from 'agentation';
import Lenis from 'lenis';
import { handleDocumentAnchorClick, setLenisInstance, getLenisInstance } from './utils/smoothScroll';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RetellTrigger } from './components/RetellTrigger';
import { X, ChevronUp } from 'lucide-react';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { PortalPage } from './pages/PortalPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { useCanonical } from './hooks/useCanonical';

const HowItWorks = lazy(() => import('./components/HowItWorks').then(m => ({ default: m.HowItWorks })));
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const Pricing = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const FinalCTA = lazy(() => import('./components/FinalCTA').then(m => ({ default: m.FinalCTA })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

const SectionFallback: React.FC<{ height?: string }> = ({ height = 'py-40' }) => (
  <div className={`${height} flex items-center justify-center`}>
    <div className="w-6 h-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
  </div>
);

const MainLayout: React.FC = () => {
  const [showNotice, setShowNotice] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setShowScrollTop(scrollPercent > 0.45);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-on-surface font-body transition-colors duration-300 selection:bg-primary/30">
      {/* Page Sections */}
      <div className="relative z-10">
        <Hero />
        
        {/* How It Works */}
        <Suspense fallback={<SectionFallback />}>
          <HowItWorks />
        </Suspense>
        
        {/* Features / Benefits */}
        <Suspense fallback={<SectionFallback />}>
          <Features />
        </Suspense>
        
        {/* Pricing tiers */}
        <Suspense fallback={<SectionFallback />}>
          <Pricing />
        </Suspense>

        {/* Help Center FAQs */}
        <Suspense fallback={<SectionFallback />}>
          <FAQ />
        </Suspense>

        {/* Final CTA Banner */}
        <Suspense fallback={<SectionFallback />}>
          <FinalCTA />
        </Suspense>
        
        {/* Footer info and badge */}
        <Suspense fallback={<SectionFallback height="py-16" />}>
          <Footer />
        </Suspense>
      </div>

      {/* Scroll-to-top button */}
      {showScrollTop && (
        <button
          onClick={() => getLenisInstance()?.scrollTo(0, { duration: 1.2 })}
          className={`fixed left-4 z-[60] w-10 h-10 rounded-full border border-outline-variant bg-surface-container/80 backdrop-blur-xl text-on-surface-variant hover:text-primary hover:border-primary/40 shadow-lg flex items-center justify-center active:scale-90 transition-all ${showNotice ? 'bottom-14' : 'bottom-4'}`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Under-construction notice */}
      {showNotice && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 px-4 py-2 text-[11px] font-medium text-on-primary bg-primary/80 backdrop-blur-md">
          <span>🚧 This site is a work in progress — some features may evolve</span>
          <button
            onClick={() => setShowNotice(false)}
            className="ml-2 shrink-0 w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Dismiss notice"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Persistent floating Voice Widget */}
      <RetellTrigger />
    </div>
  );
};

function App() {
  const path = window.location.pathname;
  const isPortalOrAdmin = path === '/portal' || path === '/admin';

  // Dynamically set <link rel="canonical"> to https://cliexai.com/<path>
  useCanonical();

  // Initialize Lenis smooth scroll globally across all pages
  useEffect(() => {
    document.addEventListener('click', handleDocumentAnchorClick, true);

    // Skip Lenis on portal/admin — those pages run their own Lenis instances
    if (isPortalOrAdmin) {
      return () => {
        document.removeEventListener('click', handleDocumentAnchorClick, true);
      };
    }

    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: !isMobile,
      wheelMultiplier: isMobile ? 0.8 : 1,
      touchMultiplier: isMobile ? 0.5 : 0.8,
    });
    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      document.removeEventListener('click', handleDocumentAnchorClick, true);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [isPortalOrAdmin]);

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          {!isPortalOrAdmin && <Navbar />}
          {path === '/admin'  ? <AdminPage />  :
           path === '/login'  ? <LoginPage />  :
           path === '/signup' ? <SignupPage /> :
           path === '/portal' ? <PortalPage /> :
           path === '/get-started' ? <GetStartedPage /> :
           <MainLayout />}
        </ThemeProvider>
      </AuthProvider>
      {import.meta.env.DEV && <Agentation />}
    </>
  );
}

export default App;
