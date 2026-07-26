import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Cursor } from './components/Cursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { VideoWorks } from './components/VideoWorks';
import { Services } from './components/Services';
import { BrandGallery } from './components/BrandGallery';
import { Process } from './components/Process';
import { Testimonial } from './components/Testimonial';
import { Footer } from './components/Footer';
import { BeatsPage } from './pages/BeatsPage';
import { AboutPage } from './pages/AboutPage';
import NotFound from './pages/not-found';

const queryClient = new QueryClient();

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
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/beats" component={BeatsPage} />
            <Route path="/about" component={AboutPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
