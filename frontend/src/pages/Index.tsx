
import { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Portfolio } from '../components/Portfolio';
import { About } from '../components/About';
import { Process } from '../components/Process';
import { Pricing } from '../components/Pricing';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { AnimatedBackground } from '../components/AnimatedBackground';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />
      <div className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <Pricing />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
