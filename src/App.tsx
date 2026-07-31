import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { HowItWorks } from './components/HowItWorks';
import { ScanShowcase } from './components/ScanShowcase';
import { PlanBento } from './components/PlanBento';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-[100] focus:bg-brand focus:px-5 focus:py-3 focus:font-display focus:font-semibold focus:text-on-brand"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <ScanShowcase />
        <PlanBento />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
