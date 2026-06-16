/*
 * APP.TSX — Sure-Fix Remodeling
 * Multi-page routing with shared Layout
 */
import { Toaster } from "@/components/ui/sonner";
import { LeadStepperProvider } from './contexts/LeadStepperContext';
import LeadStepper from './LeadStepper';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./Layout";
import { LOGO_URL } from "./constants";
import AnalyticsManager from "./components/AnalyticsManager";

// Pages (flat layout in this repo)
import Home from "./Home";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import Reviews from "./Reviews";
import NotFound from "./NotFound";
import Showroom from "./Showroom";
import InteriorDesign from "./InteriorDesign";
import Kitchen from "./Kitchen";
import Bathroom from "./Bathroom";
import Basement from "./Basement";
import Exterior from "./Exterior";
import Flooring from "./Flooring";
import Additions from "./Additions";
import Publications from "./Publications";
import PublicationArticle from "./PublicationArticle";
import Promotions from "./Promotions";
import Locations from "./Locations";
import LocationDetail from "./LocationDetail";
import BlogList from "./BlogList";
import BlogPost from "./BlogPost";
import Careers from "./Careers";
import Maintenance from "@/src/pages/Maintenance";

const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

function WelcomeLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let loadDone = document.readyState === 'complete';
    let minimumDone = false;

    const hideWhenReady = () => {
      if (loadDone && minimumDone) setVisible(false);
    };
    const onLoad = () => {
      loadDone = true;
      hideWhenReady();
    };
    const timer = window.setTimeout(() => {
      minimumDone = true;
      hideWhenReady();
    }, 900);

    if (loadDone) hideWhenReady();
    else window.addEventListener('load', onLoad, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', onLoad);
    };
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
          <Route path="/publications" component={Publications} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/blog" component={BlogList} />
          <Route path="/promotions" component={Promotions} />
          <Route path="/locations/:slug" component={LocationDetail} />
          <Route path="/locations" component={Locations} />
          <Route path="/careers" component={Careers} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </>
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
            <LeadStepper />
          </TooltipProvider>
        </LeadStepperProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
