import { Check } from 'lucide-react';
import Button from '../components/Button';
import './Hero.css';

export default function Hero() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section className="hero">
      <div className="container hero__grid">
        {/* Left Column: Typography & Intent */}
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-line" aria-hidden="true" />
            <span>Katalog Resmi Perawatan Kendaraan & Ruang</span>
          </div>

          <h1 className="hero__title">
            Bersih. Kilap. Perawatan Presisi untuk Kendaraan dan Ruang.
          </h1>

          <p className="lead hero__lead">
            ATVIA menghadirkan rangkaian produk pembersih dan perawatan dengan formula tepat guna. Dirancang untuk pemilik kendaraan, bengkel, dan profesional detailing yang mengutamakan hasil rapi, higienis, dan teruji di setiap sentuhan.
          </p>

          <div className="hero__actions">
            <Button
              href="#produk"
              variant="primary"
              size="lg"
              onClick={(e) => scrollToSection(e, 'produk')}
            >
              Lihat produk
            </Button>
            <Button
              href="#kontak"
              variant="outline"
              size="lg"
              onClick={(e) => scrollToSection(e, 'kontak')}
            >
              Hubungi kami
            </Button>
          </div>

          <div className="hero__trust-strip">
            <span className="hero__trust-item">
              <Check size={14} strokeWidth={2.5} className="hero__trust-icon" aria-hidden="true" />
              Formula Tepat Guna
            </span>
            <span className="hero__trust-divider" aria-hidden="true">•</span>
            <span className="hero__trust-item">
              <Check size={14} strokeWidth={2.5} className="hero__trust-icon" aria-hidden="true" />
              Bebas Residu Lengket
            </span>
            <span className="hero__trust-divider" aria-hidden="true">•</span>
            <span className="hero__trust-item">
              <Check size={14} strokeWidth={2.5} className="hero__trust-icon" aria-hidden="true" />
              Konsultasi Resmi WhatsApp
            </span>
          </div>
        </div>

        {/* Right Column: Studio Lineup Showcase Frame */}
        <div className="hero__media">
          <img
            src="/images/product-lineup.jpg"
            alt="Lineup Produk Perawatan Kendaraan ATVIA: Waterspot Cleaner, Interior Guard, Action Black Dressing, Tire Shine Protection, dan Advance Coating"
            className="hero__media-image"
            width="1200"
            height="800"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
