/*
 * APP.TSX — Sure-Fix Remodeling
 * Multi-page routing with shared Layout
 */
import { Toaster } from "@/components/ui/sonner";
import { LeadStepperProvider } from './contexts/LeadStepperContext';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Redirect, Route, Switch, useLocation } from "wouter";
import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./Layout";
import { LOGO_URL } from "./constants";
import AnalyticsManager from "./components/AnalyticsManager";

// Pages are code-split so the first visit does not download every route.
const Home = lazy(() => import("./Home"));
const Services = lazy(() => import("./Services"));
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Contact"));
const Reviews = lazy(() => import("./Reviews"));
const NotFound = lazy(() => import("./NotFound"));
const Showroom = lazy(() => import("./Showroom"));
const InteriorDesign = lazy(() => import("./InteriorDesign"));
const Kitchen = lazy(() => import("./Kitchen"));
const Bathroom = lazy(() => import("./Bathroom"));
const Basement = lazy(() => import("./Basement"));
const Exterior = lazy(() => import("./Exterior"));
const Flooring = lazy(() => import("./Flooring"));
const Additions = lazy(() => import("./Additions"));
const Publications = lazy(() => import("./Publications"));
const PublicationArticle = lazy(() => import("./PublicationArticle"));
const Promotions = lazy(() => import("./Promotions"));
const Locations = lazy(() => import("./Locations"));
const LocationDetail = lazy(() => import("./LocationDetail"));
const BlogPost = lazy(() => import("./BlogPost"));
const Careers = lazy(() => import("./Careers"));
const FAQ = lazy(() => import("./FAQ"));
const ThankYou = lazy(() => import("./ThankYou"));
// Heavy overlays — only download when needed, not on first paint.
const LeadStepper = lazy(() => import("./LeadStepper"));
const PromoPopup = lazy(() => import("./PromoPopup"));
import Maintenance from "@/src/pages/Maintenance";

const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

function WelcomeLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Dismiss as soon as the app shell is interactive — do NOT wait for
    // window.load (that waits for the 19MB hero video and stalls the UI).
    const timer = window.setTimeout(() => setVisible(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center px-6"
      style={{
        background: 'linear-gradient(165deg, #0d1117 0%, #1a2340 46%, #0d1117 100%)',
      }}
      aria-label="Loading Sure-Fix Remodeling"
      aria-live="polite"
    >
      <div className="flex flex-col items-center text-center">
        <img src={LOGO_URL} alt="Sure-Fix Remodeling" className="mb-7 h-16 w-auto drop-shadow-lg" />
        <p
          className="mb-3 text-[10px] font-black uppercase tracking-[0.36em] text-white/55"
          style={{ fontFamily: 'Figtree, sans-serif' }}
        >
          Welcome Home
        </p>
        <h1
          className="mb-7 text-3xl font-light text-white sm:text-4xl"
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', letterSpacing: '-0.02em' }}
        >
          Preparing your Sure-Fix experience.
        </h1>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full w-1/2 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #394696, #983631)',
              animation: 'sf-loader 1.1s ease-in-out infinite',
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes sf-loader {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(220%); }
        }
      `}</style>
    </div>
  );
}

// Scroll manager: normal in-app route changes start at the top, but a browser
// refresh restores the user's last position on that same page.
function ScrollManager() {
  const [location] = useLocation();
  const firstRender = useRef(true);
  const canSaveScroll = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let raf = 0;
    const saveScroll = () => {
      if (!canSaveScroll.current) return;
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        sessionStorage.setItem(`sf-scroll:${window.location.pathname}`, String(window.scrollY));
      });
    };

    window.addEventListener('scroll', saveScroll, { passive: true });
    window.addEventListener('pagehide', saveScroll);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', saveScroll);
      window.removeEventListener('pagehide', saveScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const saved = sessionStorage.getItem(`sf-scroll:${window.location.pathname}`);
      if (saved) {
        const y = Number(saved);
        if (Number.isFinite(y) && y > 0) {
          window.requestAnimationFrame(() => window.scrollTo(0, y));
          window.setTimeout(() => window.scrollTo(0, y), 250);
        }
      }
      window.setTimeout(() => {
        canSaveScroll.current = true;
      }, 1200);
      return;
    }

    canSaveScroll.current = false;
    window.scrollTo(0, 0);
    window.setTimeout(() => {
      canSaveScroll.current = true;
    }, 250);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <AnalyticsManager />
      <ScrollManager />
      <Layout>
        <Suspense fallback={null}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/services/kitchen" component={Kitchen} />
            <Route path="/services/bathroom" component={Bathroom} />
            <Route path="/services/basement" component={Basement} />
            <Route path="/services/exterior" component={Exterior} />
            <Route path="/services/flooring" component={Flooring} />
            <Route path="/services/additions" component={Additions} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/showroom" component={Showroom} />
            <Route path="/interior-design" component={InteriorDesign} />
            <Route path="/publications/blog/:slug" component={PublicationArticle} />
            <Route path="/resources" component={Publications} />
            <Route path="/publications">{() => <Redirect to="/resources" />}</Route>
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/blog">{() => <Redirect to="/resources" />}</Route>
            <Route path="/promotions" component={Promotions} />
            <Route path="/locations/:slug" component={LocationDetail} />
            <Route path="/locations" component={Locations} />
            <Route path="/careers" component={Careers} />
            <Route path="/faq" component={FAQ} />
            <Route path="/thank-you" component={ThankYou} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
}

function DeferredOverlays() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Keep the first paint free of LeadStepper / PromoPopup JS.
    // Load on idle, or immediately on first user interaction so CTAs still work.
    let done = false;
    const enable = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    const onInteract = () => enable();
    window.addEventListener('pointerdown', onInteract, { once: true, passive: true });
    window.addEventListener('keydown', onInteract, { once: true });

    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 2500 });
    } else {
      timer = globalThis.setTimeout(enable, 1500);
    }

    return () => {
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timer !== undefined) globalThis.clearTimeout(timer);
    };
  }, []);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <LeadStepper />
      <PromoPopup />
    </Suspense>
  );
}

function App() {
  if (MAINTENANCE_MODE) {
    return (
      <ErrorBoundary>
        <Maintenance />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LeadStepperProvider>
          <TooltipProvider>
            <Toaster />
            <WelcomeLoader />
            <Router />
            <DeferredOverlays />
          </TooltipProvider>
        </LeadStepperProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
