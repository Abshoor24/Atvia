/**
 * Konfigurasi kontak resmi ATVIA
 */

/**
 * Normalisasi nomor WhatsApp menjadi format digit internasional murni (contoh: 6281234567890)
 * Menghapus spasi, tanda plus, strip, dan mengubah awalan '0' menjadi '62'.
 */
export function normalizeWhatsAppNumber(input) {
  if (!input) return '';
  let cleaned = String(input).trim().replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Mengambil nomor WhatsApp dari environment variable
 */
export function getWhatsAppNumber() {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER || '';
  return normalizeWhatsAppNumber(raw);
}

/**
 * Validasi apakah nomor WhatsApp valid (minimal 8 digit, maksimal 15 digit, bukan placeholder)
 */
export function isValidWhatsAppNumber(number) {
  if (!number) return false;
  const digitsOnly = normalizeWhatsAppNumber(number);
  // Cek jika nomor masih berupa template placeholder seperti 62812xxxxxxxx
  if (/x+/i.test(String(number))) return false;
  return digitsOnly.length >= 8 && digitsOnly.length <= 15;
}

/**
 * Membuat tautan resmi WhatsApp click-to-chat (https://wa.me/...)
 * Mengembalikan null jika nomor belum dikonfigurasi dengan benar.
 */
export function buildWhatsAppUrl(messageText = '') {
  const number = getWhatsAppNumber();

  if (!isValidWhatsAppNumber(number)) {
    console.error(
      'Nomor WhatsApp ATVIA belum dikonfigurasi dengan benar di environment variables (VITE_WHATSAPP_NUMBER).'
    );
    return null;
  }

  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${number}${encodedText ? `?text=${encodedText}` : ''}`;
}

/**
 * Data info kontak umum
 */
export const CONTACT_INFO = {
  get whatsapp() {
    const num = getWhatsAppNumber();
    if (!isValidWhatsAppNumber(num)) return '';
    // Format tampilan yang ramah dibaca: +62 812-xxxx-xxxx
    if (num.startsWith('62')) {
      const remaining = num.slice(2);
      return `+62 ${remaining.slice(0, 3)}-${remaining.slice(3, 7)}-${remaining.slice(7)}`;
    }
    return `+${num}`;
  },
  email: (import.meta.env.VITE_EMAIL || 'atviajayaofficial@gmail.com').trim(),
  location: (import.meta.env.VITE_LOCATION || '').trim()
};
