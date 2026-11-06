import ContactForm from '../components/ContactForm';
import { CONTACT_INFO } from '../config/contact';
import './Contact.css';

export default function Contact() {
  const hasWhatsApp = Boolean(CONTACT_INFO.whatsapp);
  const hasEmail = Boolean(CONTACT_INFO.email);
  const hasLocation = Boolean(CONTACT_INFO.location);

  return (
    <section id="kontak" className="section contact-section">
      <div className="container contact-grid">
        {/* Left Column: Information Channels */}
        <div className="contact-info">
          <div className="contact-info__header">
            <span className="contact-info__tagline">Dari bersih hingga terlindungi.</span>
            <h2>Mulai Konsultasi atau Kemitraan Bersama ATVIA</h2>
            <p className="lead">
              Ingin menanyakan produk yang sesuai untuk kendaraan Anda, atau membutuhkan pasokan rutin untuk workshop dan usaha detailing? Tim ATVIA siap membantu Anda.
            </p>
          </div>

          <div className="contact-channels">
            {hasWhatsApp && (
              <div className="contact-channel">
                <span className="contact-channel__label">WhatsApp Resmi</span>
                <span className="contact-channel__value">
                  {CONTACT_INFO.whatsapp}
                </span>
              </div>
            )}

            {hasEmail && (
              <div className="contact-channel">
                <span className="contact-channel__label">Email Komunikasi</span>
                <span className="contact-channel__value">
                  <a href={`mailto:${CONTACT_INFO.email}`} className="contact-channel__link">
                    {CONTACT_INFO.email}
                  </a>
                </span>
              </div>
            )}

            {hasLocation && (
              <div className="contact-channel">
                <span className="contact-channel__label">Lokasi / Distribusi</span>
                <span className="contact-channel__value">
                  {CONTACT_INFO.location}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contact Form (Direct to WhatsApp) */}
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
