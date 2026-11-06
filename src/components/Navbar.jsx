import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { buildWhatsAppUrl } from '../config/contact';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'produk', label: 'Produk' },
  { id: 'urutan-perawatan', label: 'Urutan Perawatan' },
  { id: 'faq', label: 'Asisten Produk' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'lokasi', label: 'Lokasi & Peta' },
  { id: 'kontak', label: 'Kontak' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const defaultWaUrl = buildWhatsAppUrl('Halo ATVIA, saya ingin berkonsultasi mengenai produk dan kemitraan.');

  // Track active section via IntersectionObserver when on Home page
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
      }
    );

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (e, sectionId) => {
    setIsOpen(false);
    if (!isHome) {
      e.preventDefault();
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Brand Logo */}
        <Link to="/" className="navbar__brand" aria-label="Beranda ATVIA">
          <img
            src="/images/logo-atvia.png"
            alt="ATVIA"
            className="navbar__brand-logo"
            width="135"
            height="26"
          />
        </Link>

        {/* Mobile Action Group (Theme Toggle + Hamburger) */}
        <div className="navbar__mobile-group">
          <ThemeToggle className="navbar__theme-toggle--mobile" />
          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar__toggle-icon">
              <span className="navbar__toggle-line" />
              <span className="navbar__toggle-line" />
              <span className="navbar__toggle-line" />
            </span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav
          className={`navbar__nav ${isOpen ? 'navbar__nav--open' : ''}`}
          aria-label="Navigasi Utama"
        >
          <ul className="navbar__links">
            {NAV_ITEMS.map((item) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="navbar__actions">
            <ThemeToggle className="navbar__theme-toggle--desktop" />
            {defaultWaUrl ? (
              <Button
                href={defaultWaUrl}
                variant="primary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                Hubungi via WhatsApp
              </Button>
            ) : (
              <Button
                href="/#kontak"
                variant="primary"
                size="sm"
                onClick={(e) => {
                  handleNavClick(e, 'kontak');
                }}
              >
                Hubungi Kami
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
