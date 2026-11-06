import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FlaskConical,
  Send,
  RotateCcw,
  ArrowRight,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  MapPin,
  Clock,
  ExternalLink,
  Package,
  Mail
} from 'lucide-react';
import productService from '../services/productService';
import { buildWhatsAppUrl } from '../config/contact';
import './ProductChatbot.css';

let messageCounter = 0;
const generateMsgId = (prefix) => `${prefix}-${++messageCounter}`;
const getFormattedTime = () => {
  const d = new Date();
  const hrs = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${hrs}:${mins}`;
};

const QUICK_PROMPTS = [
  'Lokasi workshop & rute ATVIA?',
  'Jam operasional & jam buka?',
  'Bagaimana cara membersihkan jamur kaca & kerak air?',
  'Produk apa untuk menghitamkan trim plastik kasar?',
  'Ingin cat bodi kilap cermin & efek daun talas kuat?',
  'Program kemitraan B2B & pasokan bengkel?'
];

export default function ProductChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Halo! Saya Asisten Laboratorium ATVIA. Silakan tanyakan formulasi produk, cara aplikasi, kecocokan substrat, lokasi workshop, jam buka, atau program kemitraan B2B.',
      time: 'Baru saja',
      recommendedProduct: null
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timelineRef = useRef(null);

  // Auto scroll HANYA pada container timeline chat internal (tanpa scroll halaman browser ke bawah)
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  /**
   * Knowledge Engine: matches queries to products, location, hours, contacts, and detailing knowledge
   */
  const processQuery = (rawText) => {
    const text = rawText.toLowerCase().trim();
    const allProducts = productService.getPublishedProducts();

    // 1. Lokasi / Alamat / Maps / Rute / Sukoharjo / Baki / Purbayan
    if (
      text.includes('lokasi') ||
      text.includes('alamat') ||
      text.includes('dimana') ||
      text.includes('tempat') ||
      text.includes('posisi') ||
      text.includes('maps') ||
      text.includes('gmaps') ||
      text.includes('peta') ||
      text.includes('rute') ||
      text.includes('baki') ||
      text.includes('sukoharjo') ||
      text.includes('solo') ||
      text.includes('surakarta') ||
      text.includes('purbayan') ||
      text.includes('bengkel') ||
      text.includes('workshop')
    ) {
      return {
        text: 'Fasilitas manufaktur, hub distribusi, dan bengkel resmi ATVIA (Atvia Jaya Auto Detailing) beralamat di:\n\nPurbayan, Kec. Baki, Kabupaten Sukoharjo, Jawa Tengah 57556 (dekat persimpangan bantaran Solo River & Jl. Raya Gawok).\n\nKami melayani pengerjaan detailing mobil fisik di workshop, pembelian produk botol/jeriken langsung, dan konsultasi teknis.',
        tip: 'Pro-Tip: Anda dapat mengklik tombol tautan di bawah untuk membuka navigasi rute presisi di Google Maps.',
        action: {
          label: 'Buka Petunjuk Rute Google Maps',
          url: 'https://maps.app.goo.gl/DDFFdjpVoQzFMggj8',
          type: 'maps'
        },
        product: null
      };
    }

    // 2. Jam Operasional / Buka / Tutup / Hari Libur / Jadwal
    if (
      text.includes('buka') ||
      text.includes('jam') ||
      text.includes('tutup') ||
      text.includes('operasional') ||
      text.includes('jadwal') ||
      text.includes('hari') ||
      text.includes('libur') ||
      text.includes('minggu') ||
      text.includes('kapan') ||
      text.includes('wib')
    ) {
      return {
        text: 'Jadwal operasional bengkel & layanan konsultasi ATVIA:\n\nBuka Setiap Hari: Senin – Minggu, pukul 08.00 – 17.00 WIB.\n\nCatatan: Hari libur nasional & tanggal merah workshop tetap melayani pengerjaan perawatan kendaraan dan penjualan formula. Disarankan reservasi jadwal pengerjaan detailing terlebih dahulu agar tidak antre.',
        tip: 'Pro-Tip: Pengerjaan detailing komplit (kaca, bodi & interior) disarankan masuk workshop sebelum pukul 10.00 WIB untuk hasil pengeringan formula maksimal.',
        action: {
          label: 'Reservasi Jadwal via WhatsApp',
          url: buildWhatsAppUrl('Halo ATVIA, saya ingin reservasi jadwal pengerjaan detailing di workshop Atvia Jaya.'),
          type: 'wa'
        },
        product: null
      };
    }

    // 3. Kontak Email Khusus
    if (
      text.includes('email') ||
      text.includes('mail') ||
      text.includes('surel')
    ) {
      return {
        text: 'Alamat email resmi CV ATVIA JAYA untuk korespondensi kemitraan, penawaran grosir B2B, dan administrasi:\n\n• Email Resmi: atviajayaofficial@gmail.com\n\nAnda dapat mengirimkan pesan langsung ke email tersebut atau menekan tombol di bawah ini.',
        tip: 'Klik tombol di bawah untuk langsung membuka email Anda dan mengirim pesan ke tim ATVIA.',
        action: {
          label: 'Kirim Email ke atviajayaofficial@gmail.com',
          url: 'mailto:atviajayaofficial@gmail.com',
          type: 'mail'
        },
        product: null
      };
    }

    // 4. Kontak / WhatsApp / CS / Telepon / Hotline
    if (
      text.includes('kontak') ||
      text.includes('hubungi') ||
      text.includes('wa') ||
      text.includes('whatsapp') ||
      text.includes('telepon') ||
      text.includes('telp') ||
      text.includes('nomor') ||
      text.includes('call') ||
      text.includes('admin') ||
      text.includes('cs') ||
      text.includes('sosmed') ||
      text.includes('instagram') ||
      text.includes('ig')
    ) {
      return {
        text: 'Saluran komunikasi resmi ATVIA:\n\n• WhatsApp Hotline: +62 857-0047-0046\n• Email Resmi: atviajayaofficial@gmail.com\n• Instagram Resmi: @atvia.id\n• Alamat Workshop: Purbayan, Kec. Baki, Kab. Sukoharjo\n\nTim staf teknis kami siap merespon pertanyaan formula kimiawi, reservasi servis detailing, dan pemesanan grosir setiap hari (08.00–17.00 WIB).',
        tip: 'Klik tombol di bawah untuk langsung terhubung ke WhatsApp resmi ATVIA tanpa perlu mencatat nomor.',
        action: {
          label: 'Chat WhatsApp (+62 857-0047-0046)',
          url: buildWhatsAppUrl('Halo ATVIA, saya ingin konsultasi teknis perawatan kendaraan.'),
          type: 'wa'
        },
        product: null
      };
    }

    // 4. Kemitraan B2B / Grosir / Pasokan Bengkel / Salon Mobil / Car Wash / Jeriken
    if (
      text.includes('kemitraan') ||
      text.includes('b2b') ||
      text.includes('grosir') ||
      text.includes('reseller') ||
      text.includes('supplier') ||
      text.includes('suplai') ||
      text.includes('salon mobil') ||
      text.includes('car wash') ||
      text.includes('cuci mobil') ||
      text.includes('jerigen') ||
      text.includes('jeriken') ||
      text.includes('bulk') ||
      text.includes('partai') ||
      text.includes('distributor')
    ) {
      return {
        text: 'ATVIA menyediakan program kemitraan B2B & pengadaan chemical detailing untuk bengkel resmi, salon mobil, car wash, dan detailer profesional:\n\n1. Pasokan Jeriken Bulk (5 Liter) dengan efisiensi biaya tertinggi per unit kendaraan.\n2. Pasokan Botol Retail (500 ml & 1 Liter) untuk display & penjualan toko.\n3. Dukungan Standar Operasional Prosedur (SOP) pengerjaan teruji & margin kompetitif.',
        tip: 'Dapatkan penawaran harga kemitraan B2B dan estimasi konsumsi bulanan dengan menghubungi tim distribusi kami.',
        action: {
          label: 'Konsultasi Program Kemitraan B2B',
          url: buildWhatsAppUrl('Halo ATVIA, saya tertarik dengan program kemitraan pasokan chemical bengkel/car wash.'),
          type: 'wa'
        },
        product: null
      };
    }

    // 5. Layanan Detailing di Bengkel Fisik (Poles mobil, coating, kaca, interior)
    if (
      text.includes('layanan') ||
      text.includes('servis') ||
      text.includes('service') ||
      text.includes('poles') ||
      text.includes('salon') ||
      text.includes('detailing') ||
      text.includes('paket') ||
      text.includes('cuci')
    ) {
      return {
        text: 'Workshop resmi Atvia Jaya Auto Detailing melayani pengerjaan profesional langsung:\n\n1. Glass Detailing: Pembersihan kerak air & jamur kaca sampai tuntas + rain repellent coating.\n2. Paint Correction: Multi-step polishing menghilangkan baret halus (swirl mark) dan cat kusam.\n3. Nano Ceramic Coating: Proteksi cat kilap cermin tahan gores ringan & cuaca tropis.\n4. Engine Bay & Trim Detailing: Pembersihan ruang mesin & restorasi plastik hitam bodi pudar.\n5. Interior Deep Cleaning: Pembersihan jok, plafon, karpet, dasbor, dan sanitasi kabin.',
        tip: 'Seluruh pengerjaan menggunakan formula kimia presisi ATVIA yang aman untuk substrat material kendaraan Anda.',
        action: {
          label: 'Tanya Paket & Biaya Detailing',
          url: buildWhatsAppUrl('Halo ATVIA, saya ingin tanya paket dan estimasi biaya detailing mobil di workshop Atvia Jaya.'),
          type: 'wa'
        },
        product: null
      };
    }

    // 6. Harga Produk & Cara Pemesanan / Pengiriman
    if (
      text.includes('harga') ||
      text.includes('biaya') ||
      text.includes('pricelist') ||
      text.includes('beli') ||
      text.includes('order') ||
      text.includes('pesan') ||
      text.includes('ongkir') ||
      text.includes('tokopedia') ||
      text.includes('shopee') ||
      text.includes('kirim') ||
      text.includes('cod')
    ) {
      return {
        text: 'Formula perawatan kendaraan ATVIA tersedia dalam kemasan botol retail (500 ml & 1 Liter) serta jeriken 5 Liter dengan harga manufaktur kompetitif:\n\n1. Pembelian langsung di Workshop ATVIA (Purbayan, Baki, Sukoharjo).\n2. Pemesanan online via WhatsApp resmi dengan pengiriman aman ke seluruh Indonesia.\n3. Konsultasi pemilihan formula gratis sesuai kondisi kendaraan Anda.',
        tip: 'Hubungi tim kami via WhatsApp untuk mendapatkan katalog harga terbaru dan informasi ongkos kirim.',
        action: {
          label: 'Pesan Produk via WhatsApp',
          url: buildWhatsAppUrl('Halo ATVIA, saya ingin memesan formula produk perawatan kendaraan.'),
          type: 'wa'
        },
        product: allProducts[0] || null
      };
    }

    // 7. Kaca & Waterspot / Jamur Kaca
    if (
      text.includes('kaca') ||
      text.includes('jamur') ||
      text.includes('waterspot') ||
      text.includes('kerak air') ||
      text.includes('spot')
    ) {
      const prod = allProducts.find((p) => p.slug === 'waterspot-cleaner') || allProducts[0];
      return {
        text: 'Untuk mengatasi jamur kaca membandel dan kerak air mineral, gunakan ATVIA Waterspot Cleaner (500 ml) dengan Zero Spot Formula. Formula ini melarutkan deposit mineral tanpa mengikis kaca atau merusak substrat.',
        tip: 'Pro-Tip: Aplikasikan pada permukaan kaca dingin di tempat teduh. Usap searah dengan lap microfiber, lalu langsung bilas air bersih dalam waktu maksimal 60 detik.',
        product: prod
      };
    }

    // 8. Plastik Bodi Kasar / Trim Memutih / Karet
    if (
      text.includes('plastik') ||
      text.includes('trim') ||
      text.includes('memutih') ||
      text.includes('kusam') && (text.includes('bodi') || text.includes('hitam')) ||
      text.includes('back to black') ||
      text.includes('action black')
    ) {
      const prod = allProducts.find((p) => p.slug === 'action-black-dressing');
      return {
        text: 'Untuk bodi plastik kasar (unpainted trim), karet talang, dan mudguard yang memutih akibat cuaca tropis, gunakan ATVIA Action Black Dressing (500 ml). Menggunakan formula Back to Black yang meresap ke pori-pori plastik dan tahan cuci berkali-kali.',
        tip: 'Pro-Tip: Pastikan permukaan plastik benar-benar kering sebelum dioleskan. Biarkan meresap 10–15 menit agar polimer mengikat sempurna.',
        product: prod
      };
    }

    // 9. Cat Kusam / Coating / Daun Talas / Kilap
    if (
      text.includes('cat') ||
      text.includes('coating') ||
      text.includes('daun talas') ||
      text.includes('kilap') ||
      text.includes('hydrophobic') ||
      text.includes('advance coating')
    ) {
      const prod = allProducts.find((p) => p.slug === 'advance-coating');
      return {
        text: 'Untuk memberikan proteksi kilap cermin (deep mirror gloss) dan efek hidrofobik daun talas yang instan, gunakan ATVIA Advance Coating (500 ml). Mencegah air hujan asam menempel menjadi noda kerak baru.',
        tip: 'Pro-Tip: Semprotkan tipis panel per panel. Ratakan dengan lap microfiber pertama, lalu buffing kilap dengan lap microfiber kedua yang kering.',
        product: prod
      };
    }

    // 10. Ban / Semir Ban / Kering Getas
    if (
      text.includes('ban') ||
      text.includes('tire') ||
      text.includes('semir') ||
      text.includes('roda') ||
      text.includes('wet look')
    ) {
      const prod = allProducts.find((p) => p.slug === 'tire-shine-protection');
      return {
        text: 'Untuk dinding samping ban (sidewall), gunakan ATVIA Tire Shine Protection (Kemasan Jumbo 1 Liter). Menghasilkan kilap basah pekat tahan lama sekaligus merawat kelenturan karet dari retak rambut (dry rot) tanpa menyiprat (sling-free).',
        tip: 'Pro-Tip: Oleskan hanya pada dinding samping ban yang telah dicuci bersih dan kering. Hindari pengolesan pada tapak ban yang menapak aspal.',
        product: prod
      };
    }

    // 11. Interior / Dasbor / Kabin / Bau Apek / Jok Kulit
    if (
      text.includes('interior') ||
      text.includes('dasbor') ||
      text.includes('dashboard') ||
      text.includes('jok') ||
      text.includes('kabin') ||
      text.includes('apek') ||
      text.includes('debu')
    ) {
      const prod = allProducts.find((p) => p.slug === 'interior-guard');
      return {
        text: 'Untuk ruang kabin, gunakan ATVIA Interior Guard (500 ml) dengan sentuhan akhir Natural Satin Touch. Formula pH 7.0 netral aman untuk dasbor vinil, panel plastik, dan jok sintetis, serta mengunci aroma kesegaran kabin mewah.',
        tip: 'Pro-Tip: Semprotkan cairan ke kain lap microfiber terlebih dahulu agar embun semprotan tidak mengenai kaca depan bagian dalam.',
        product: prod
      };
    }

    // 12. Urutan Perawatan / Urutan Aplikasi
    if (
      text.includes('urutan') ||
      text.includes('tahap') ||
      text.includes('langkah') ||
      text.includes('step') ||
      text.includes('cara pakai semua')
    ) {
      return {
        text: 'Urutan perawatan terarah ATVIA terdiri dari 4 tahap teruji:\n1. Bersihkan & Dekontaminasi (Waterspot Cleaner)\n2. Restorasi & Perawatan Luar (Action Black Dressing & Tire Shine)\n3. Proteksi Cat & Coating (Advance Coating)\n4. Finishing & Kesegaran Interior (Interior Guard).',
        tip: 'Pro-Tip: Selalu mulai dari dekontaminasi kaca & bodi sebelum mengaplikasikan lapisan proteksi cat dan finishing kabin.',
        product: null
      };
    }

    // 13. Cari berdasarkan nama produk dinamis (termasuk yang ditambah oleh admin)
    const matchedProduct = allProducts.find((p) =>
      text.includes(p.name.toLowerCase()) || text.includes(p.slug.toLowerCase())
    );

    if (matchedProduct) {
      return {
        text: `Produk ${matchedProduct.name} (${matchedProduct.volume}): ${matchedProduct.summary}\n\nTarget Masalah: ${matchedProduct.solvesProblem || 'Perawatan kendaraan presisi'}.`,
        tip: matchedProduct.description ? matchedProduct.description.slice(0, 140) + '...' : null,
        product: matchedProduct
      };
    }

    // Fallback: General AI lab response
    return {
      text: 'Kami siap membantu konsultasi perawatan kendaraan Anda. Anda dapat menanyakan formula produk (Waterspot, Action Black, Advance Coating, Tire Shine, Interior Guard), lokasi workshop & petunjuk rute, jam buka, layanan detailing, hingga program kemitraan B2B.',
      tip: 'Anda juga dapat berkonsultasi langsung dengan staf teknisi ATVIA via WhatsApp.',
      action: {
        label: 'Hubungi Teknisi via WhatsApp',
        url: buildWhatsAppUrl('Halo Teknisi ATVIA, saya ingin konsultasi mengenai perawatan kendaraan.'),
        type: 'wa'
      },
      product: allProducts[0] || null
    };
  };

  const handleSendMessage = useCallback((textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: generateMsgId('user'),
      sender: 'user',
      text: query.trim(),
      time: getFormattedTime(),
      recommendedProduct: null
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate technical laboratory analysis latency (~300ms)
    setTimeout(() => {
      const responseData = processQuery(query);
      const botMsg = {
        id: generateMsgId('bot'),
        sender: 'bot',
        text: responseData.text,
        tip: responseData.tip,
        action: responseData.action || null,
        time: getFormattedTime(),
        recommendedProduct: responseData.product
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 300);
  }, [inputQuery]);

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        text: 'Percakapan telah direset. Silakan tanyakan seputar formula kimiawi, cara pakai, atau produk perawatan yang sesuai untuk kendaraan Anda.',
        time: 'Baru saja',
        recommendedProduct: null
      }
    ]);
  };

  const fallbackWaUrl = buildWhatsAppUrl('Halo Teknisi ATVIA, saya ingin berkonsultasi langsung mengenai perawatan khusus kendaraan saya.');

  return (
    <section id="faq" className="section chatbot-section" aria-label="Asisten Konsultasi Produk ATVIA">
      <div className="container">
        {/* Section Header */}
        <div className="section-header chatbot-header-wrap">
          <div className="chatbot-eyebrow">
            <FlaskConical size={14} strokeWidth={2} />
            <span>ASISTEN TEKNIS PRODUK ATVIA</span>
          </div>
          <h2 className="chatbot-main-title">Konsultasi Formula & Detail Produk</h2>
          <p className="lead chatbot-main-lead">
            Tanyakan langsung permasalahan noda kaca, bodi memutih, kilap cat, atau kebersihan kabin untuk mendapatkan rekomendasi formula dan panduan aplikasi yang tepat.
          </p>
        </div>

        {/* Chatbot Interface Frame */}
        <div className="chatbot-card">
          {/* Top Bar */}
          <div className="chatbot-topbar">
            <div className="chatbot-topbar__identity">
              <div className="chatbot-avatar">
                <FlaskConical size={18} strokeWidth={2} />
              </div>
              <div className="chatbot-identity-text">
                <strong className="chatbot-identity-name">Asisten Laboratorium ATVIA</strong>
                <span className="chatbot-identity-status">
                  <span className="chatbot-status-dot" />
                  Sistem Respon Teknis Aktif
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetChat}
              className="chatbot-btn-reset"
              title="Reset Percakapan"
            >
              <RotateCcw size={13} strokeWidth={2} />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="chatbot-quick-chips" aria-label="Pertanyaan yang sering ditanyakan">
            <span className="chatbot-chips-label">REKOMENDASI TOPIK:</span>
            <div className="chatbot-chips-list">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="chatbot-chip-btn"
                  onClick={() => handleSendMessage(prompt)}
                >
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages Timeline */}
          <div className="chatbot-timeline" ref={timelineRef} role="log" aria-live="polite">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`chat-msg-row ${isUser ? 'chat-msg-row--user' : 'chat-msg-row--bot'}`}
                >
                  <div className={`chat-bubble ${isUser ? 'chat-bubble--user' : 'chat-bubble--bot'}`}>
                    <p className="chat-bubble__text">{msg.text}</p>

                    {/* Pro-Tip Box */}
                    {msg.tip && (
                      <div className="chat-bubble__tip-box">
                        <CheckCircle2 size={13} strokeWidth={2} className="chat-tip-icon" />
                        <span>{msg.tip}</span>
                      </div>
                    )}

                    {/* Action CTA Link / Button */}
                    {msg.action && (
                      <div className="chat-bubble__action-wrap">
                        <a
                          href={msg.action.url}
                          target={msg.action.url.startsWith('http') ? '_blank' : undefined}
                          rel={msg.action.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="chat-bubble__action-btn"
                        >
                          {msg.action.type === 'maps' && <MapPin size={13} strokeWidth={2} />}
                          {msg.action.type === 'wa' && <MessageSquare size={13} strokeWidth={2} />}
                          {msg.action.type === 'clock' && <Clock size={13} strokeWidth={2} />}
                          {msg.action.type === 'package' && <Package size={13} strokeWidth={2} />}
                          {msg.action.type === 'mail' && <Mail size={13} strokeWidth={2} />}
                          <span>{msg.action.label}</span>
                          <ExternalLink size={12} strokeWidth={2} />
                        </a>
                      </div>
                    )}

                    {/* Recommended Product Card Inside Message */}
                    {msg.recommendedProduct && (
                      <div className="chat-product-card">
                        <div className="chat-product-card__thumb">
                          <img
                            src={msg.recommendedProduct.image || '/images/waterspot-cleaner.jpg'}
                            alt={msg.recommendedProduct.name}
                            onError={(e) => {
                              e.target.src = '/images/waterspot-cleaner.jpg';
                            }}
                          />
                        </div>
                        <div className="chat-product-card__info">
                          <span className="chat-product-card__badge">
                            {msg.recommendedProduct.category}
                          </span>
                          <strong className="chat-product-card__name">
                            {msg.recommendedProduct.name} ({msg.recommendedProduct.volume})
                          </strong>
                          <p className="chat-product-card__sub">
                            {msg.recommendedProduct.solvesProblem || msg.recommendedProduct.summary}
                          </p>
                          <div className="chat-product-card__actions">
                            <Link
                              to={`/produk/${msg.recommendedProduct.slug}`}
                              className="chat-product-card__btn-view"
                            >
                              <span>Lihat Spesifikasi</span>
                              <ArrowRight size={12} strokeWidth={2} />
                            </Link>

                            <a
                              href={buildWhatsAppUrl(
                                `Halo ATVIA, saya tertarik memesan produk ${msg.recommendedProduct.name} (${msg.recommendedProduct.volume}) setelah konsultasi dengan asisten web.`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="chat-product-card__btn-wa"
                            >
                              <MessageSquare size={12} strokeWidth={2} />
                              <span>Pesan via WA</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="chat-bubble__time">{msg.time}</span>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-msg-row chat-msg-row--bot">
                <div className="chat-bubble chat-bubble--bot chat-bubble--typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="chatbot-input-bar"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Tanyakan produk, cara pakai, lokasi workshop, jam operasional, atau kemitraan..."
              className="chatbot-input"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="chatbot-btn-send"
              aria-label="Kirim pertanyaan"
            >
              <Send size={15} strokeWidth={2} />
            </button>
          </form>

          {/* Footer Human Support Banner */}
          <div className="chatbot-footer-support">
            <div className="chatbot-footer-support__text">
              <HelpCircle size={14} strokeWidth={2} />
              <span>Membutuhkan konsultasi khusus dengan staf teknis ATVIA?</span>
            </div>
            <a
              href={fallbackWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="chatbot-footer-support__link"
            >
              <span>Hubungi Teknisi via WhatsApp</span>
              <ArrowRight size={12} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
