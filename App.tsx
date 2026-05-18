/*
 * APP.TSX — Sure-Fix Remodeling
 * Multi-page routing with shared Layout
 */
import { Toaster } from "@/components/ui/sonner";
import { LeadStepperProvider } from './contexts/LeadStepperContext';
import LeadStepper from './LeadStepper';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useLayoutEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./Layout";

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

// Scroll to top on route change — layout effect runs before paint so the hero scrubber
// never reads a stale scroll position from the previous page on client-side navigations.
function ScrollToTop() {
  const [location] = useLocation();
  useLayoutEffect(() => {
    // Two-arg form avoids non-standard ScrollBehavior values that can throw in some browsers.
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
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
          <Route path="/publications" component={Publications} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LeadStepperProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <LeadStepper />
          </TooltipProvider>
        </LeadStepperProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
