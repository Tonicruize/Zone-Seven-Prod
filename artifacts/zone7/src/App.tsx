import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { Cursor } from './components/Cursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { VideoWorks } from './components/VideoWorks';
import { Services } from './components/Services';
import { BrandGallery } from './components/BrandGallery';
import { Process } from './components/Process';
import { Testimonial } from './components/Testimonial';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { BeatsPage } from './pages/BeatsPage';
import { AboutPage } from './pages/AboutPage';
import { BookingPage } from './pages/BookingPage';
import NotFound from './pages/not-found';

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
};

const pageTransition = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1] as const,
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  // Scroll to top on every route change
  useEffect(() => { window.scrollTo(0, 0); }, [location]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function HomePage() {
  return (
    <main className="bg-background min-h-[100dvh] text-foreground selection:bg-primary selection:text-primary-foreground relative">
      <Hero />
      <Stats />
      <VideoWorks />
      <Services />
      <BrandGallery />
      <Process />
      <Testimonial />
      <InstagramFeed />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <div className="bg-background min-h-[100dvh] text-foreground selection:bg-primary selection:text-primary-foreground relative">
          <Cursor />
          <Navigation />
          <PageWrapper>
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/beats" component={BeatsPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/book" component={BookingPage} />
              <Route component={NotFound} />
            </Switch>
          </PageWrapper>
        </div>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
