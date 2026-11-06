import { useState } from 'react';
import {
  Navigation,
  ExternalLink,
  MessageSquare,
  Building2,
  Clock,
  Truck,
  Layers,
  Map as MapIcon,
  Mail
} from 'lucide-react';
import './AtviaLocationMap3D.css';

// Data Lokasi Resmi Atvia Jaya (Berdasarkan Google Maps: https://maps.app.goo.gl/DDFFdjpVoQzFMggj8)
const ATVIA_LOCATION = {
  name: 'Atvia Jaya',
  address: 'Purbayan, Kec. Baki, Kabupaten Sukoharjo, Jawa Tengah 57556',
  openingHours: 'Senin – Sabtu: 08.00 – 17.00 WIB',
  phoneDisplay: '+62 857-0047-0046',
  phoneRaw: '6285700470046',
  email: 'atviajayaofficial@gmail.com',
  googleMapsShareUrl: 'https://maps.app.goo.gl/DDFFdjpVoQzFMggj8',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Atvia+Jaya+Semir+Ban+Purbayan+Baki+Sukoharjo'
};

export default function AtviaLocationMap3D() {
  const [mapMode, setMapMode] = useState('0'); // '0' = Peta Jalan (Roadmap), '1' = Satelit (Satellite / Hybrid)

  // Embed resmi Google Maps langsung dari tempat terverifikasi Atvia Jaya (tanpa overlay custom)
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.896944208226!2d110.7676216!3d-7.5749693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a15adc3ed1949%3A0xe376bd134b0e024!2sAtvia%20Jaya%20Semir%20Ban!5e${mapMode}!3m2!1sid!2sid`;

  return (
    <section className="atvia-map-section" id="lokasi" aria-label="Lokasi Fasilitas & Pusat Distribusi ATVIA">
      <div className="container">
        {/* 12-Column Swiss Grid Architecture */}
        <div className="atvia-map-grid">
          {/* ====================================================================
              KOLOM KIRI (4 SPAN): PANEL INFORMASI FASILITAS & DISTRIBUSI
              ==================================================================== */}
          <div className="atvia-map-info-col">
            <div className="atvia-map-info__header">
              <span className="atvia-map-eyebrow">
                <Navigation size={13} strokeWidth={2} />
                LOKASI & DISTRIBUSI RESMI
              </span>
              <h2 className="atvia-map-title">Basis Operasional & Kemitraan</h2>
              <p className="atvia-map-desc">
                Berlokasi strategis di Purbayan, Baki, Sukoharjo, fasilitas <strong>Atvia Jaya</strong> melayani pemenuhan produk perawatan kendaraan, layanan auto detailing, dan kebersihan ruang untuk kebutuhan ritel maupun pasokan partai bengkel & salon detailing ke seluruh Indonesia.
              </p>
            </div>

            {/* 3 Kartu Spesifikasi Lokasi Teknis */}
            <div className="atvia-map-specs-list">
              {/* 1. Wilayah Operasional */}
              <div className="atvia-map-spec-item">
                <div className="atvia-map-spec-item__icon">
                  <Building2 size={16} strokeWidth={2} />
                </div>
                <div className="atvia-map-spec-item__content">
                  <span className="atvia-map-spec-item__label">WILAYAH OPERASIONAL</span>
                  <strong className="atvia-map-spec-item__value">
                    {ATVIA_LOCATION.address}
                  </strong>
                </div>
              </div>

              {/* 2. Jam Operasional Fasilitas */}
              <div className="atvia-map-spec-item">
                <div className="atvia-map-spec-item__icon">
                  <Clock size={16} strokeWidth={2} />
                </div>
                <div className="atvia-map-spec-item__content">
                  <span className="atvia-map-spec-item__label">JAM OPERASIONAL FASILITAS</span>
                  <strong className="atvia-map-spec-item__value">
                    {ATVIA_LOCATION.openingHours}
                  </strong>
                </div>
              </div>

              {/* 3. Layanan Pengiriman & Logistik */}
              <div className="atvia-map-spec-item">
                <div className="atvia-map-spec-item__icon">
                  <Truck size={16} strokeWidth={2} />
                </div>
                <div className="atvia-map-spec-item__content">
                  <span className="atvia-map-spec-item__label">LAYANAN LOGISTIK</span>
                  <strong className="atvia-map-spec-item__value">
                    Pengiriman Reguler & Kargo B2B Nasional
                  </strong>
                </div>
              </div>

              {/* 4. Kontak Email Resmi */}
              <div className="atvia-map-spec-item">
                <div className="atvia-map-spec-item__icon">
                  <Mail size={16} strokeWidth={2} />
                </div>
                <div className="atvia-map-spec-item__content">
                  <span className="atvia-map-spec-item__label">EMAIL RESMI KOORDINASI</span>
                  <a
                    href={`mailto:${ATVIA_LOCATION.email}`}
                    className="atvia-map-spec-item__link"
                    title="Kirim email ke Atvia Jaya"
                  >
                    {ATVIA_LOCATION.email}
                  </a>
                </div>
              </div>
            </div>

            {/* 2 Tombol Aksi (CTA) */}
            <div className="atvia-map-actions">
              <a
                href={ATVIA_LOCATION.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="atvia-btn-map-primary"
              >
                <Navigation size={16} strokeWidth={2} />
                <span>Petunjuk Arah di Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${ATVIA_LOCATION.phoneRaw}?text=Halo%20Atvia%20Jaya%20Sukoharjo,%20saya%20ingin%20menanyakan%20pengiriman%20dan%20kemitraan%20produk.`}
                target="_blank"
                rel="noopener noreferrer"
                className="atvia-btn-map-secondary"
              >
                <MessageSquare size={16} strokeWidth={2} />
                <span>Hubungi Logistik & Kemitraan via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* ====================================================================
              KOLOM KANAN (8 SPAN): CANVAS INTERAKTIF GOOGLE MAPS ASLI
              (Bawaan murni Google Maps tanpa pop up custom yang menutupi)
              ==================================================================== */}
          <div className="atvia-map-canvas-col">
            {/* Toolbar Atas Canvas: Toggle Peta Jalan / Satelit & Link Maps */}
            <div className="atvia-gmaps-toolbar">
              <div className="atvia-gmaps-mode-group" role="group" aria-label="Tipe Peta Google Maps">
                <button
                  type="button"
                  className={`atvia-gmaps-mode-btn ${mapMode === '0' ? 'atvia-gmaps-mode-btn--active' : ''}`}
                  onClick={() => setMapMode('0')}
                >
                  <MapIcon size={14} strokeWidth={2} />
                  <span>Peta Jalan</span>
                </button>
                <button
                  type="button"
                  className={`atvia-gmaps-mode-btn ${mapMode === '1' ? 'atvia-gmaps-mode-btn--active' : ''}`}
                  onClick={() => setMapMode('1')}
                >
                  <Layers size={14} strokeWidth={2} />
                  <span>Satelit</span>
                </button>
              </div>

              {/* Link Langsung ke Google Maps Asli */}
              <div className="atvia-gmaps-toolbar-actions">
                <a
                  href={ATVIA_LOCATION.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="atvia-toolbar-btn-rute"
                  title="Buka petunjuk rute di Google Maps"
                >
                  <Navigation size={13} strokeWidth={2.5} />
                  <span>Petunjuk Rute</span>
                </a>

                <a
                  href={ATVIA_LOCATION.googleMapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="atvia-gmaps-external-link"
                  title="Buka lokasi resmi Atvia Jaya di Google Maps"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink size={13} strokeWidth={2} />
                </a>
              </div>
            </div>

            {/* Container Canvas Google Maps Interaktif (Murni Iframe Asli Tanpa Clutter) */}
            <div className="atvia-gmaps-canvas-frame">
              <iframe
                title="Peta Interaktif Google Maps Atvia Jaya Sukoharjo"
                src={embedUrl}
                className="atvia-gmaps-interactive-iframe"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
