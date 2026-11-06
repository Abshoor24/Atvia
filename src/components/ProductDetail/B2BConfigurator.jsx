import { useState, useId } from 'react';
import {
  Calculator,
  MessageSquare,
  Check,
  Building2,
  Package,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import './B2BConfigurator.css';

const B2B_PRODUCTS = [
  {
    id: 'interior-guard',
    name: 'Interior Guard',
    size: '500 ml',
    yieldPerBottle: 30, // 30 unit mobil / botol
    unitSizeLiters: 0.5,
    role: 'Perawatan Interior & Dasbor'
  },
  {
    id: 'waterspot-cleaner',
    name: 'Waterspot Cleaner',
    size: '500 ml',
    yieldPerBottle: 20, // 20 unit mobil / botol
    unitSizeLiters: 0.5,
    role: 'Pembersih Kerak Kaca & Bodi'
  },
  {
    id: 'action-black-dressing',
    name: 'Action Black Dressing',
    size: '500 ml',
    yieldPerBottle: 25, // 25 unit mobil / botol
    unitSizeLiters: 0.5,
    role: 'Restorasi Trim Plastik & Karet'
  },
  {
    id: 'tire-shine-protection',
    name: 'Tire Shine Protection',
    size: '1 Liter',
    yieldPerBottle: 100, // 100 unit mobil (4 ban) / botol 1L
    unitSizeLiters: 1.0,
    role: 'Perlindungan & Kilap Ban Wet-Look'
  },
  {
    id: 'advance-coating',
    name: 'Advance Coating',
    size: '500 ml',
    yieldPerBottle: 15, // 15 unit mobil / botol
    unitSizeLiters: 0.5,
    role: 'Spray Coating & Hydrophobic Beading'
  }
];

export default function B2BConfigurator() {
  const [vehicleCount, setVehicleCount] = useState(50);
  const [selectedProductIds, setSelectedProductIds] = useState([
    'interior-guard',
    'waterspot-cleaner',
    'action-black-dressing',
    'tire-shine-protection',
    'advance-coating'
  ]);
  const sliderId = useId();

  const toggleProduct = (id) => {
    setSelectedProductIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Minimal 1 produk terpilih
        return prev.filter((p) => p !== id);
      }
      return [...prev, id];
    });
  };

  const selectAll = () => {
    setSelectedProductIds(B2B_PRODUCTS.map((p) => p.id));
  };

  // Kalkulasi estimasi botol & liter
  const calculations = B2B_PRODUCTS.filter((p) => selectedProductIds.includes(p.id)).map((p) => {
    const bottles = Math.ceil(vehicleCount / p.yieldPerBottle);
    const totalLiters = (bottles * p.unitSizeLiters).toFixed(1);
    return {
      ...p,
      bottles,
      totalLiters
    };
  });

  const totalBottles = calculations.reduce((acc, curr) => acc + curr.bottles, 0);

  // Rekomendasi Paket
  const getPackageRecommendation = (count) => {
    if (count < 50) {
      return {
        name: 'Paket Garasi Studio / Starter Detailing',
        tier: 'Tier 1 - Starter',
        desc: 'Ideal untuk studio detailing independen, workshop butik, atau car wash premium skala menengah.'
      };
    }
    if (count <= 150) {
      return {
        name: 'Paket Workshop Reguler / Auto Detailing Pro',
        tier: 'Tier 2 - Professional',
        desc: 'Direkomendasikan untuk bengkel detailing profesional dengan volume harian 3–5 unit mobil.'
      };
    }
    return {
      name: 'Paket Heavy-Duty Detailing & Fleet Center',
      tier: 'Tier 3 - Industrial Fleet',
      desc: 'Formulasi dan pasokan khusus untuk pusat perbaikan bodi, dealership, dan jaringan detailing multi-cabang.'
    };
  };

  const currentPackage = getPackageRecommendation(vehicleCount);

  // WhatsApp Message Generator
  const generateWhatsAppLink = () => {
    const phone = '6285700470046';
    const productListString = calculations
      .map((c) => `- ${c.name} (${c.size}): ${c.bottles} botol`)
      .join('%0A');

    const message = `Halo Tim B2B ATVIA,%0A%0ASaya ingin mengajukan supply kimia detailing untuk workshop kami dengan estimasi ${vehicleCount} unit kendaraan/bulan (${currentPackage.name}).%0A%0ARincian kebutuhan alokasi kami:%0A${productListString}%0A%0AMohon informasi penawaran harga tiered B2B dan pengiriman sampel teknis.%0A%0ATerima kasih.`;

    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <section className="b2b-configurator-section" id="kalkulator-b2b">
      {/* 1. Banner Konsultasi Langsung */}
      <div className="b2b-consultation-banner">
        <div className="b2b-consultation-banner__left">
          <div className="b2b-consultation-banner__badge">
            <Building2 size={13} strokeWidth={2} />
            <span>KONSULTASI BENGKEL & INDUSTRI B2B</span>
          </div>
          <h3 className="b2b-consultation-banner__title">
            Konsultasi Teknis & Pembelian Skala Bengkel / Garasi Detailing
          </h3>
          <p className="b2b-consultation-banner__desc">
            Dapatkan dukungan formulasi langsung dari tim ahli kimia ATVIA beserta penetapan harga berjenjang (Tiered B2B Pricing) untuk kebutuhan workshop Anda.
          </p>
        </div>
        <div className="b2b-consultation-banner__right">
          <a
            href="https://wa.me/6285700470046?text=Halo%20Tim%20Ahli%20Kimia%20ATVIA,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20kimia%20dan%20harga%20B2B%20untuk%20bengkel%20kami."
            target="_blank"
            rel="noopener noreferrer"
            className="b2b-btn-consultation"
          >
            <MessageSquare size={16} strokeWidth={2} />
            <span>Hubungi Ahli Kimia Kami</span>
            <ArrowUpRight size={15} strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* 2. Konfigurator Kebutuhan Bengkel */}
      <div className="b2b-calculator-card">
        <div className="b2b-calculator__header">
          <div className="b2b-calculator__header-left">
            <span className="b2b-calculator__eyebrow">
              <Calculator size={13} strokeWidth={2} />
              B2B SUPPLY CALCULATOR
            </span>
            <h4 className="b2b-calculator__title">Kalkulator Kebutuhan Bahan Kimia Detailing</h4>
            <p className="b2b-calculator__sub">
              Sesuaikan target unit mobil per bulan untuk menghitung kebutuhan pasokan botol, estimasi konsumsi liter, dan rekomendasi tingkatan paket bengkel.
            </p>
          </div>
          <div className="b2b-calculator__header-right">
            <span className="b2b-tier-badge">{currentPackage.tier}</span>
          </div>
        </div>

        <div className="b2b-calculator__body">
          {/* Kolom Kiri: Input Slider & Checklist Produk */}
          <div className="b2b-controls-col">
            {/* Range Slider */}
            <div className="b2b-slider-group">
              <div className="b2b-slider-group__label-row">
                <label htmlFor={sliderId} className="b2b-input-label">
                  Estimasi Pengerjaan Kendaraan / Bulan:
                </label>
                <div className="b2b-slider-value">
                  <span className="b2b-slider-value__num">{vehicleCount}</span>
                  <span className="b2b-slider-value__unit">Unit / Bulan</span>
                </div>
              </div>

              <div className="b2b-slider-wrapper">
                <input
                  id={sliderId}
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={vehicleCount}
                  onChange={(e) => setVehicleCount(Number(e.target.value))}
                  className="b2b-range-slider"
                  aria-label="Jumlah kendaraan per bulan"
                />
              </div>

              <div className="b2b-slider-marks">
                <button
                  type="button"
                  className={`b2b-preset-btn ${vehicleCount === 25 ? 'b2b-preset-btn--active' : ''}`}
                  onClick={() => setVehicleCount(25)}
                >
                  25 Unit
                </button>
                <button
                  type="button"
                  className={`b2b-preset-btn ${vehicleCount === 50 ? 'b2b-preset-btn--active' : ''}`}
                  onClick={() => setVehicleCount(50)}
                >
                  50 Unit
                </button>
                <button
                  type="button"
                  className={`b2b-preset-btn ${vehicleCount === 100 ? 'b2b-preset-btn--active' : ''}`}
                  onClick={() => setVehicleCount(100)}
                >
                  100 Unit
                </button>
                <button
                  type="button"
                  className={`b2b-preset-btn ${vehicleCount === 200 ? 'b2b-preset-btn--active' : ''}`}
                  onClick={() => setVehicleCount(200)}
                >
                  200 Unit
                </button>
              </div>
            </div>

            {/* Checklist Produk */}
            <div className="b2b-checklist-group">
              <div className="b2b-checklist-group__header">
                <span className="b2b-input-label">Pilih Produk yang Dibutuhkan Workshop:</span>
                <button
                  type="button"
                  className="b2b-btn-select-all"
                  onClick={selectAll}
                >
                  Pilih Semua (5)
                </button>
              </div>

              <div className="b2b-product-checkboxes">
                {B2B_PRODUCTS.map((prod) => {
                  const isChecked = selectedProductIds.includes(prod.id);
                  return (
                    <label
                      key={prod.id}
                      className={`b2b-checkbox-card ${isChecked ? 'b2b-checkbox-card--active' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleProduct(prod.id)}
                        className="sr-only"
                      />
                      <span className={`b2b-custom-checkbox ${isChecked ? 'b2b-custom-checkbox--checked' : ''}`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </span>
                      <div className="b2b-checkbox-info">
                        <div className="b2b-checkbox-info__top">
                          <span className="b2b-checkbox-name">{prod.name}</span>
                          <span className="b2b-checkbox-size">{prod.size}</span>
                        </div>
                        <span className="b2b-checkbox-meta">
                          {prod.role} • Yield: ~{prod.yieldPerBottle} unit/botol
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Ringkasan Tabel & Output Kalkulasi */}
          <div className="b2b-summary-col">
            <div className="b2b-summary-card">
              <div className="b2b-summary-card__top">
                <span className="b2b-summary-card__title">
                  <Package size={15} strokeWidth={2} />
                  Alokasi Stok Bulanan Bengkel
                </span>
                <span className="b2b-total-bottles">
                  Total <strong>{totalBottles}</strong> Botol
                </span>
              </div>

              {/* Table Hasil Kalkulasi */}
              <div className="b2b-table-container">
                <table className="b2b-table">
                  <thead>
                    <tr>
                      <th scope="col">Nama Produk</th>
                      <th scope="col" className="text-center">Kemasan</th>
                      <th scope="col" className="text-right">Kebutuhan</th>
                      <th scope="col" className="text-right">Est. Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculations.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="b2b-table-product-name">{item.name}</div>
                          <div className="b2b-table-product-sub">~{item.yieldPerBottle} unit/btl</div>
                        </td>
                        <td className="text-center">
                          <span className="b2b-table-badge">{item.size}</span>
                        </td>
                        <td className="text-right font-mono font-semibold">
                          {item.bottles} btl
                        </td>
                        <td className="text-right font-mono text-muted">
                          {item.totalLiters} L
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Box Rekomendasi Paket Workshop */}
              <div className="b2b-package-recommendation">
                <div className="b2b-package-rec__icon">
                  <Layers size={18} strokeWidth={2} />
                </div>
                <div className="b2b-package-rec__content">
                  <span className="b2b-package-rec__tier">{currentPackage.tier}</span>
                  <h5 className="b2b-package-rec__name">{currentPackage.name}</h5>
                  <p className="b2b-package-rec__desc">{currentPackage.desc}</p>
                </div>
              </div>

              {/* Tombol CTA WhatsApp Otomatis */}
              <div className="b2b-cta-action">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="b2b-btn-whatsapp"
                >
                  <MessageSquare size={17} strokeWidth={2} />
                  <span>Kirim Estimasi & Minta Penawaran B2B</span>
                </a>
                <span className="b2b-cta-note">
                  Respons langsung dalam jam kerja (08.00–17.00 WIB) via WhatsApp Business Resmi ATVIA.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
