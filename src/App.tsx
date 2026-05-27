import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { handleDocumentAnchorClick, setLenisInstance, getLenisInstance } from './utils/smoothScroll';
import { ThemeProvider } from './components/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MacOSBar } from './components/MacOSBar';
import { FloatingAgent } from './components/FloatingAgent';
import { X, ChevronUp } from 'lucide-react';
import { useIsMobile } from './hooks/useIsMobile';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4';

const VoiceDashboardMockup = lazy(() => import('./components/VoiceDashboardMockup').then(m => ({ default: m.VoiceDashboardMockup })));
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const LogoCloud = lazy(() => import('./components/LogoCloud').then(m => ({ default: m.LogoCloud })));
const Stats = lazy(() => import('./components/Stats').then(m => ({ default: m.Stats })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const Pricing = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const LeadForm = lazy(() => import('./components/LeadForm').then(m => ({ default: m.LeadForm })));
const FinalCTA = lazy(() => import('./components/FinalCTA').then(m => ({ default: m.FinalCTA })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

const SectionFallback: React.FC<{ height?: string }> = ({ height = 'py-40' }) => (
  <div className={`${height} flex items-center justify-center`}>
    <div className="w-6 h-6 rounded-full border-2 border-brand/30 border-t-brand animate-spin" />
  </div>
);

const MainLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const lenisRef = useRef<Lenis | null>(null);
  const [activeVid, setActiveVid] = useState(1);
  const [showNotice, setShowNotice] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const vid1Ref = useRef<HTMLVideoElement>(null);
  const vid2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isMobile) return;
    const vid1 = vid1Ref.current;
    const vid2 = vid2Ref.current;
    if (!vid1 || !vid2) return;

    const MARGIN = 0.6;

    const onTime = () => {
      if (activeVid === 1 && vid1.duration && vid1.currentTime >= vid1.duration - MARGIN) {
        vid2.currentTime = 0;
        vid2.play();
        setActiveVid(2);
      } else if (activeVid === 2 && vid2.duration && vid2.currentTime >= vid2.duration - MARGIN) {
        vid1.currentTime = 0;
        vid1.play();
        setActiveVid(1);
      }
    };

    vid1.addEventListener('timeupdate', onTime);
    vid2.addEventListener('timeupdate', onTime);
    return () => {
      vid1.removeEventListener('timeupdate', onTime);
      vid2.removeEventListener('timeupdate', onTime);
    };
  }, [activeVid, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 0.8,
    });
    lenisRef.current = lenis;
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
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      document.addEventListener('click', handleDocumentAnchorClick, true);
      return () => document.removeEventListener('click', handleDocumentAnchorClick, true);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setShowScrollTop(scrollPercent > 0.45);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = isMobile
    ? () => window.scrollTo({ top: 0, behavior: 'smooth' })
    : () => getLenisInstance()?.scrollTo(0, { duration: 1.2 });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-black dark:bg-[#0c0c0c] dark:text-white transition-colors duration-300 selection:bg-brand/30">
      
      {!isMobile && (
        <svg className="absolute w-0 h-0 pointer-events-none" style={{ visibility: 'hidden' }}>
          <defs>
            <filter id="c3-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
              <feComposite in2="SourceGraphic" operator="in" result="noise" />
              <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
            </filter>
          </defs>
        </svg>
      )}

      {isMobile ? (
        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-brand/5 via-brand/10 to-brand/5 dark:from-brand/[0.03] dark:via-brand/[0.06] dark:to-brand/[0.03]" />
      ) : (
        <>
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <video
              ref={vid1Ref}
              autoPlay
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-[1s] ease-in-out"
              style={{
                opacity: activeVid === 1 ? 0.55 : 0,
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
              src={VIDEO_SRC}
            />
            <video
              ref={vid2Ref}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-[1s] ease-in-out"
              style={{
                opacity: activeVid === 2 ? 0.55 : 0,
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
              src={VIDEO_SRC}
            />
          </div>
          <div className="fixed inset-0 z-0 pointer-events-none mix-blend-color bg-brand/60" />
        </>
      )}

      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-white/50 via-white/65 to-white/75 dark:from-[#0c0c0c]/60 dark:via-[#0c0c0c]/72 dark:to-[#0c0c0c]/82 transition-colors duration-300" />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        
        <MacOSBar />
        
        <Suspense fallback={<SectionFallback height="py-24" />}>
          <VoiceDashboardMockup />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Features />
        </Suspense>
        
        <Suspense fallback={<SectionFallback height="py-16" />}>
          <LogoCloud />
        </Suspense>
        
        <Suspense fallback={<SectionFallback height="py-16" />}>
          <Stats />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Pricing />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <FAQ />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <LeadForm />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <FinalCTA />
        </Suspense>
        
        <Suspense fallback={<SectionFallback height="py-16" />}>
          <Footer />
        </Suspense>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed left-4 z-[60] w-10 h-10 rounded-full border border-black/15 dark:border-white/10 bg-white/80 dark:bg-[#0c0c0c]/80 md:backdrop-blur-xl text-black/60 dark:text-white/60 hover:text-brand dark:hover:text-brand hover:border-brand/40 shadow-lg flex items-center justify-center active:scale-90 transition-all ${showNotice ? 'bottom-14' : 'bottom-4'}`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {showNotice && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 px-4 py-2 text-[11px] font-medium text-white bg-brand/80 md:backdrop-blur-md">
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

      <FloatingAgent />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
