import React, { useEffect } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import CreativeHero from './components/CreativeHero';
import StackingTitle from './components/StackingTitle';
import StackingCards from './components/StackingCards';
import PlatformSection from './components/PlatformSection';
import WinWin from './components/WinWin';
import ServicesCarousel from './components/ServicesCarousel';
import ComparisonSection from './components/ComparisonSection';
import PricingTable from './components/PricingTable';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  useEffect(() => {
    const originalTitle = document.title;
    const awayTitle = "Hey, ¿no vas a Flexear?";
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = awayTitle;
      } else {
        document.title = originalTitle;
      }
    };

    const handlePageHide = () => {
      document.title = awayTitle;
    };

    const handlePageShow = () => {
      document.title = originalTitle;
    };

    // Eventos para detectar cuando la pestaña está oculta/visible
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Eventos para detectar cuando se cambia de pestaña
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <CreativeHero />
        <StackingTitle />
        <StackingCards />
        <PlatformSection />
        <WinWin />
        <ServicesCarousel />
        <ComparisonSection />
        <PricingTable />
        <FAQ />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}

export default App;