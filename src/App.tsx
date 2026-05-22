import { useState } from 'react';
import { Preloader } from './components/Preloader/Preloader';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { ProductShowcase } from './components/ProductShowcase/ProductShowcase';
import { Ingredients } from './components/Ingredients/Ingredients';
import { About } from './components/About/About';
import { Testimonials } from './components/Testimonials/Testimonials';
import { FAQ } from './components/FAQ/FAQ';
import { Footer } from './components/Footer/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll();

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <Ingredients />
        <About />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
