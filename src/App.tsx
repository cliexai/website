import React, { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { handleDocumentAnchorClick, setLenisInstance, getLenisInstance } from './utils/smoothScroll';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MacOSBar } from './components/MacOSBar';
import { FloatingAgent } from './components/FloatingAgent';
import { X, ChevronUp } from 'lucide-react';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { PortalPage } from './pages/PortalPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { useCanonical } from './hooks/useCanonical';
import { ThemeBackground } from './components/ThemeBackground';

const VoiceDashboardMockup = lazy(() => import('./components/VoiceDashboardMockup').then(m => ({ default: m.VoiceDashboardMockup })));
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const Stats = lazy(() => import('./components/Stats').then(m => ({ default: m.Stats })));
const Pricing = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

const SectionFallback: React.FC<{ height?: string }> = ({ height = 'py-40' }) => (
  <div className={`${height} flex items-center justify-center`}>
    <div className="w-6 h-6 rounded-full border-2 border-brand/30 border-t-brand animate-spin" />
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
    <div className="relative min-h-screen overflow-x-hidden bg-white text-black dark:bg-[#0c0c0c] dark:text-white transition-colors duration-300 selection:bg-brand/30">
      <ThemeBackground />

      {/* Page Sections */}
      <div className="relative z-10">
        <Hero />
        
        {/* macOS menu bar strip */}
        <MacOSBar />
        
        {/* Voice agent dashboard mockup — above fold */}
        <Suspense fallback={<SectionFallback height="py-24" />}>
          <VoiceDashboardMockup />
        </Suspense>
        
        {/* Features / Benefits */}
        <Suspense fallback={<SectionFallback />}>
          <Features />
        </Suspense>
        

        {/* Performance metrics stats */}
        <Suspense fallback={<SectionFallback height="py-16" />}>
          <Stats />
        </Suspense>
        

        {/* Pricing tiers */}
        <Suspense fallback={<SectionFallback />}>
          <Pricing />
        </Suspense>
        
        {/* Help Center FAQs */}
        <Suspense fallback={<SectionFallback />}>
          <FAQ />
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
          className={`fixed left-4 z-[60] w-10 h-10 rounded-full border border-black/15 dark:border-white/10 bg-white/80 dark:bg-[#0c0c0c]/80 backdrop-blur-xl text-black/60 dark:text-white/60 hover:text-brand dark:hover:text-brand hover:border-brand/40 shadow-lg flex items-center justify-center active:scale-90 transition-all ${showNotice ? 'bottom-14' : 'bottom-4'}`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Under-construction notice */}
      {showNotice && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 px-4 py-2 text-[11px] font-medium text-white bg-brand/80 backdrop-blur-md">
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
      <FloatingAgent />
    </div>
  );
};

function App() {
  const path = window.location.pathname;

  // Dynamically set <link rel="canonical"> to https://cliexai.com/<path>
  useCanonical();

  // Initialize Lenis smooth scroll globally across all pages
  useEffect(() => {
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

    document.addEventListener('click', handleDocumentAnchorClick, true);

    return () => {
      document.removeEventListener('click', handleDocumentAnchorClick, true);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  const isPortalOrAdmin = path === '/portal' || path === '/admin';

  return (
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
  );
}

export default App;
