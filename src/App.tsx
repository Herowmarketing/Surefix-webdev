/*
 * APP.TSX — Sure-Fix Remodeling
 * Multi-page routing with shared Layout
 */
import { Toaster } from "@/components/ui/sonner";
import { LeadStepperProvider } from './contexts/LeadStepperContext';
import LeadStepper from './components/LeadStepper';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound";

// Feature pages
import Showroom from "./pages/Showroom";
import InteriorDesign from "./pages/InteriorDesign";

// Service pages
import Kitchen from "./pages/services/Kitchen";
import Bathroom from "./pages/services/Bathroom";
import Basement from "./pages/services/Basement";
import Exterior from "./pages/services/Exterior";
import Flooring from "./pages/services/Flooring";
import Additions from "./pages/services/Additions";

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
