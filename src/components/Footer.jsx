import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import { CONTACT_INFO, buildWhatsAppUrl } from '../config/contact';
import { ShieldCheck } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const waUrl = buildWhatsAppUrl('Halo ATVIA, saya ingin berkonsultasi mengenai produk dan kemitraan.');
  const [publishedProducts, setPublishedProducts] = useState(() => productService.getPublishedProducts());

  useEffect(() => {
    const handleUpdate = () => {
      setPublishedProducts(productService.getPublishedProducts());
    };
    window.addEventListener('atvia_products_changed', handleUpdate);
    return () => window.removeEventListener('atvia_products_changed', handleUpdate);
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand Info */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Beranda ATVIA">
              <img
                src="/images/logo-atvia.png"
                alt="ATVIA"
                className="footer__logo-img"
                width="130"
                height="25"
              />
            </Link>
            <p className="footer__tagline">
              Solusi perawatan kendaraan dan kebersihan ruang dengan formula terarah untuk hasil bersih, kilap, dan konsisten.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="footer__column-title">Navigasi</h4>
            <ul className="footer__list">
              <li>
                <a href="/#produk" className="footer__link">
                  Rangkaian Produk
                </a>
              </li>
              <li>
                <a href="/#urutan-perawatan" className="footer__link">
                  Urutan Perawatan
                </a>
              </li>
              <li>
                <a href="/#faq" className="footer__link">
                  Asisten Produk (Chatbot)
                </a>
              </li>
              <li>
                <a href="/#tentang" className="footer__link">
                  Tentang ATVIA
                </a>
              </li>
              <li>
                <a href="/#lokasi" className="footer__link">
                  Lokasi & Distribusi
                </a>
              </li>
              <li>
                <a href="/#kontak" className="footer__link">
                  Kontak & Kemitraan
                </a>
              </li>
              <li>
                <Link to="/admin" className="footer__link" style={{ opacity: 0.75, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} strokeWidth={2} />
                  <span>Portal Admin</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Direct Links */}
          <div>
            <h4 className="footer__column-title">Produk</h4>
            <ul className="footer__list">
              {publishedProducts.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <Link to={`/produk/${p.slug}`} className="footer__link">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="footer__column-title">Hubungi Kami</h4>
            <ul className="footer__list">
              {CONTACT_INFO.whatsapp && (
                <li className="footer__meta-item">
                  <strong>WhatsApp:</strong><br />
                  {waUrl ? (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer__link"
                    >
                      {CONTACT_INFO.whatsapp}
                    </a>
                  ) : (
                    <span>{CONTACT_INFO.whatsapp}</span>
                  )}
                </li>
              )}
              {CONTACT_INFO.email && (
                <li className="footer__meta-item">
                  <strong>Email:</strong><br />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="footer__link">
                    {CONTACT_INFO.email}
                  </a>
                </li>
              )}
              {CONTACT_INFO.location && (
                <li className="footer__meta-item">
                  <strong>Lokasi:</strong><br />
                  <span>{CONTACT_INFO.location}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer__bottom">
          <p>© {currentYear} ATVIA. Seluruh hak cipta dilindungi.</p>
          <p>Formula perawatan kendaraan & kebersihan ruang</p>
        </div>
      </div>
    </footer>
  );
}
