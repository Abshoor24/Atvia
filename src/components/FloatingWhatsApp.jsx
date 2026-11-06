import { useState, useEffect } from 'react';
import { buildWhatsAppUrl } from '../config/contact';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  const waUrl = buildWhatsAppUrl('Halo ATVIA, saya ingin berkonsultasi mengenai produk dan perawatan kendaraan.');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactEl = document.getElementById('kontak');
      let inContact = false;

      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        // Hide when entering contact section
        if (rect.top < window.innerHeight * 0.75) {
          inContact = true;
        }
      }

      setIsVisible(scrollY > 350 && !inContact);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!waUrl) return null;

  return (
    <aside
      className={`floating-wa ${isVisible ? 'floating-wa--visible' : ''}`}
      aria-label="Konsultasi cepat via WhatsApp"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa__btn"
        aria-label="Konsultasi produk ATVIA via WhatsApp"
      >
        <span className="floating-wa__dot" aria-hidden="true" />
        <span className="floating-wa__label">Konsultasi Cepat</span>
      </a>
    </aside>
  );
}
