import Hero from '../sections/Hero';
import Products from '../sections/Products';
import CareSequence from '../sections/CareSequence';
import About from '../sections/About';
import ProductChatbot from '../sections/ProductChatbot';
import AtviaLocationMap3D from '../components/AtviaLocationMap3D';
import Contact from '../sections/Contact';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <CareSequence />
      <About />
      <ProductChatbot />
      <AtviaLocationMap3D />
      <Contact />
      <FloatingWhatsApp />
    </>
  );
}
