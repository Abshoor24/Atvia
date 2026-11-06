import { useState, useRef } from 'react';
import Button from './Button';
import { sendContactMessage } from '../services/contactService';
import './ContactForm.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '', url: '', blocked: false });

  const nameRef = useRef(null);
  const contactRef = useRef(null);
  const messageRef = useRef(null);

  const validate = () => {
    const errs = {};
    const trimmedName = formData.name.trim();
    const trimmedContact = formData.contact.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      errs.name = 'Nama lengkap wajib diisi.';
    } else if (trimmedName.length < 2) {
      errs.name = 'Nama lengkap minimal 2 karakter.';
    } else if (trimmedName.length > 80) {
      errs.name = 'Nama lengkap maksimal 80 karakter.';
    }

    if (!trimmedContact) {
      errs.contact = 'Nomor WhatsApp atau alamat email wajib diisi.';
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
      const digitsOnly = trimmedContact.replace(/\D/g, '');
      const isPhone = digitsOnly.length >= 8 && digitsOnly.length <= 15;

      if (!isEmail && !isPhone) {
        errs.contact = 'Masukkan alamat email yang valid (contoh@email.com) atau nomor telepon Indonesia (8–15 angka).';
      }
    }

    if (!trimmedMessage) {
      errs.message = 'Pesan atau pertanyaan tidak boleh kosong.';
    } else if (trimmedMessage.length < 10) {
      errs.message = 'Mohon tuliskan pesan lebih lengkap (minimal 10 karakter).';
    } else if (trimmedMessage.length > 1000) {
      errs.message = 'Pesan terlalu panjang (maksimal 1000 karakter).';
    }

    setErrors(errs);

    // Auto-focus field pertama yang memiliki error
    if (errs.name && nameRef.current) {
      nameRef.current.focus();
    } else if (errs.contact && contactRef.current) {
      contactRef.current.focus();
    } else if (errs.message && messageRef.current) {
      messageRef.current.focus();
    }

    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Menghasilkan URL WhatsApp dan membuka jendela secara sinkron dalam event handler
    const result = sendContactMessage(formData);

    if (!result.success) {
      setStatus({
        type: 'error',
        message: result.error || 'Nomor WhatsApp ATVIA belum dikonfigurasi.',
        url: '',
        blocked: false
      });
      return;
    }

    // Buka WhatsApp secara sinkron
    const openedWindow = window.open(result.url, '_blank', 'noopener,noreferrer');
    const isBlocked = !openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined';

    setStatus({
      type: 'success',
      message: '',
      url: result.url,
      blocked: isBlocked
    });

    // Reset formulir setelah status sukses ditampilkan
    setFormData({ name: '', contact: '', message: '' });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {status.type === 'success' && (
        <div className="contact-form__status contact-form__status--success" role="status" aria-live="polite">
          <p className="contact-form__status-title">
            {status.blocked ? 'Tautan WhatsApp Siap Dikirim' : 'WhatsApp Sudah Dibuka'}
          </p>
          <p>
            Pesan Anda telah disusun otomatis.{' '}
            {status.blocked ? (
              <span>
                Jendela baru terblokir oleh browser Anda. Silakan{' '}
                <a
                  href={status.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-form__status-link"
                >
                  klik di sini untuk membuka WhatsApp
                </a>.
              </span>
            ) : (
              <span>
                Jika aplikasi atau web WhatsApp tidak terbuka otomatis,{' '}
                <a
                  href={status.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-form__status-link"
                >
                  klik di sini
                </a>.
              </span>
            )}
          </p>
        </div>
      )}

      {status.type === 'error' && (
        <div className="contact-form__status contact-form__status--error" role="alert" aria-live="assertive">
          <p className="contact-form__status-title">Pengiriman Belum Dapat Diproses</p>
          <p>{status.message}</p>
        </div>
      )}

      <div className="contact-form__field">
        <label htmlFor="contact-name" className="contact-form__label">
          Nama Lengkap
        </label>
        <input
          ref={nameRef}
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nama Anda atau perwakilan bengkel"
          className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name && (
          <span id="contact-name-error" className="contact-form__error-text">
            {errors.name}
          </span>
        )}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-info" className="contact-form__label">
          Email atau Nomor WhatsApp
        </label>
        <input
          ref={contactRef}
          id="contact-info"
          name="contact"
          type="text"
          value={formData.contact}
          onChange={handleChange}
          placeholder="contoh@email.com atau 0812xxxxxxxx"
          className={`contact-form__input ${errors.contact ? 'contact-form__input--error' : ''}`}
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? 'contact-info-error' : undefined}
        />
        {errors.contact && (
          <span id="contact-info-error" className="contact-form__error-text">
            {errors.contact}
          </span>
        )}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message" className="contact-form__label">
          Pesan atau Pertanyaan
        </label>
        <textarea
          ref={messageRef}
          id="contact-message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tuliskan kebutuhan perawatan kendaraan atau rencana kemitraan Anda..."
          className={`contact-form__textarea ${errors.message ? 'contact-form__textarea--error' : ''}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && (
          <span id="contact-message-error" className="contact-form__error-text">
            {errors.message}
          </span>
        )}
      </div>

      <div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
        >
          Kirim lewat WhatsApp
        </Button>
        <p className="contact-form__hint">
          WhatsApp akan terbuka dengan pesan yang sudah terisi. Anda tinggal menekan kirim.
        </p>
      </div>
    </form>
  );
}
