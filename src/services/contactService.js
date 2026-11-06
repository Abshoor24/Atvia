import { buildWhatsAppUrl, getWhatsAppNumber, isValidWhatsAppNumber } from '../config/contact';

/**
 * Menyusun format pesan WhatsApp resmi ATVIA
 */
export function formatContactMessage({ name, contact, message }) {
  const cleanName = (name || '').trim();
  const cleanContact = (contact || '').trim();
  const cleanMessage = (message || '').trim();

  return `Halo ATVIA, perkenalkan saya ${cleanName}.

Kontak saya: ${cleanContact}

Pesan:
${cleanMessage}

Dikirim dari website ATVIA.`;
}

/**
 * Mengirim pesan kontak (Opsi A: WhatsApp Click-to-Chat)
 * 
 * Fungsi ini mengembalikan URL WhatsApp secara langsung (sinkron)
 * agar pemanggilan window.open tidak terblokir oleh popup blocker browser.
 * Di masa mendatang, jika beralih ke WhatsApp Cloud API backend (Opsi B),
 * fungsi ini dapat disesuaikan untuk memanggil endpoint REST API.
 */
export function sendContactMessage({ name, contact, message }) {
  const number = getWhatsAppNumber();

  if (!isValidWhatsAppNumber(number)) {
    return {
      success: false,
      url: null,
      error: 'Nomor WhatsApp ATVIA belum dikonfigurasi di pengaturan website.'
    };
  }

  const messageText = formatContactMessage({ name, contact, message });
  const waUrl = buildWhatsAppUrl(messageText);

  if (!waUrl) {
    return {
      success: false,
      url: null,
      error: 'Gagal membuat tautan WhatsApp. Periksa konfigurasi kontak.'
    };
  }

  return {
    success: true,
    url: waUrl
  };
}
