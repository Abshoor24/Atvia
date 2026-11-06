import { useState } from 'react';
import { faqItems } from '../data/products';
import { buildWhatsAppUrl } from '../config/contact';
import './FAQ.css';

export default function FAQ() {
  const [openId, setOpenId] = useState('faq-1');

  const waUrl = buildWhatsAppUrl('Halo ATVIA, saya ingin berkonsultasi mengenai perawatan khusus untuk kendaraan saya.');

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="faq-eyebrow">
            <span className="faq-eyebrow-line" aria-hidden="true" />
            <span>Tanya Jawab & Panduan Teknis</span>
          </div>
          <h2>Pertanyaan Seputar Perawatan Kendaraan</h2>
          <p className="lead">
            Panduan praktis mengenai kompatibilitas formula, daya tahan kilap, hingga rekomendasi pemakaian produk ATVIA.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-ans-${item.id}`}
                >
                  <span className="faq-question__text">{item.question}</span>
                  <span className="faq-question__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div
                  id={`faq-ans-${item.id}`}
                  className="faq-answer"
                  hidden={!isOpen}
                >
                  <p className="faq-answer__text">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Concierge Help Banner */}
        <div className="faq-help">
          <div className="faq-help__content">
            <h3 className="faq-help__title">Punya Pertanyaan Khusus Seputar Kendaraan Anda?</h3>
            <p className="faq-help__desc">
              Tim teknis ATVIA siap membantu memberikan rekomendasi formula dan cara pakai yang paling tepat untuk kondisi cat atau kaca mobil Anda.
            </p>
          </div>
          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="faq-help__action"
            >
              <span>Konsultasi Langsung via WhatsApp</span>
              <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
