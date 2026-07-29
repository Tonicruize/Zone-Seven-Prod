import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { Cursor } from './components/Cursor';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { VideoWorks } from './components/VideoWorks';
import { Services } from './components/Services';
import { BrandGallery } from './components/BrandGallery';
import { Process } from './components/Process';
import { Testimonial } from './components/Testimonial';
import { Ticker } from './components/Ticker';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { BeatsPage } from './pages/BeatsPage';
import { AboutPage } from './pages/AboutPage';
import { BookingPage } from './pages/BookingPage';
import { WorkPage } from './pages/WorkPage';
import NotFound from './pages/not-found';

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

const pageTransition = { duration: 0.3 };

const TICKER_ITEMS = [
  'Music Videos', 'Commercials', 'Creative Direction', 'Films',
  'Post Production', 'Culture First', 'Est. 2019', 'Lifestyle',
];

function HomePage() {
  return (
    <main className="bg-background min-h-[100dvh] text-foreground selection:bg-primary selection:text-primary-foreground relative">
      <Hero />
      <div className="border-y border-primary/20 py-4 bg-background overflow-hidden">
        <Ticker
          items={TICKER_ITEMS}
          speed={55}
          separator="✦"
          itemClassName="text-[9px] tracking-[0.45em] text-primary/60 uppercase"
        />
      </div>
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

/* Inner shell — lives inside WouterRouter so useLocation works */
function AppShell() {
  const [location] = useLocation();
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {/* Preloader — remounts on every route change via key */}
      <Preloader key={location} onComplete={() => setPreloaderDone(true)} />

      {/* Page content — rendered underneath, fades in after preloader wipes */}
      <motion.div
        key={`content-${location}`}
        variants={pageVariants}
        initial="initial"
        animate={preloaderDone ? 'animate' : 'initial'}
        transition={pageTransition}
      >
        <div className="bg-background min-h-[100dvh] text-foreground selection:bg-primary selection:text-primary-foreground relative">
          <Cursor />
          <Navigation />
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/work" component={WorkPage} />
            <Route path="/beats" component={BeatsPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/book" component={BookingPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </motion.div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <AppShell />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
