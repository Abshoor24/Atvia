import { useState } from 'react';
import { Sliders, Calculator, ArrowRight } from 'lucide-react';
import './LabSpecsGrid.css';

export default function LabSpecsGrid() {
  // Default active card is Card 3: PERMUKAAN KOMPATIBEL
  const [activeCardId, setActiveCardId] = useState('compat');
  
  // Interactive Before/After slider position (0 - 100%)
  const [sliderPos, setSliderPos] = useState(50);

  const scrollToB2B = (e) => {
    e.preventDefault();
    const el = document.getElementById('kalkulator-b2b') || document.getElementById('b2b-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="lab-specs-module">
      <div className="lab-specs__header">
        <span className="lab-specs__eyebrow">DATA TEKNIS</span>
        <h3 className="lab-specs__title">Spesifikasi Formulasi Laboratorium</h3>
        <p className="lab-specs__sub">
          Parameter kimiawi dan toleransi material resmi ATVIA Interior Guard (500 ml). Klik kartu untuk melihat catatan verifikasi teknis.
        </p>
      </div>

      {/* 3-Column Swiss Grid of 7 Cards */}
      <div className="lab-specs__grid">
        {/* KARTU 1: KOMPOSISI FORMULA */}
        <div
          className={`lab-spec-card ${activeCardId === 'formula' ? 'lab-spec-card--active' : ''}`}
          onClick={() => setActiveCardId('formula')}
          role="button"
          tabIndex={0}
        >
          <div className="lab-spec-card__top">
            <span className="lab-spec-card__micro">KOMPOSISI FORMULA</span>
            <span className="lab-spec-card__code">SPEC-01</span>
          </div>
          <h4 className="lab-spec-card__value">Water-Based Emulsion & UV Barrier Polymer</h4>
          <p className="lab-spec-card__desc">
            Polimer emulsi bebas pelarut korosif. Meresap ke pori-pori mikro material interior tanpa meninggalkan residu lengket.
          </p>
        </div>

        {/* KARTU 2: TINGKAT KEASAMAN (PH) DENGAN BAR INDIKATOR */}
        <div
          className={`lab-spec-card ${activeCardId === 'ph' ? 'lab-spec-card--active' : ''}`}
          onClick={() => setActiveCardId('ph')}
          role="button"
          tabIndex={0}
        >
          <div className="lab-spec-card__top">
            <span className="lab-spec-card__micro">TINGKAT KEASAMAN (PH)</span>
            <span className="lab-spec-card__code">SPEC-02</span>
          </div>
          <h4 className="lab-spec-card__value">pH 7.0 (Netral Lembut Teruji Aman)</h4>
          
          {/* Visual Bar Indikator pH 0 - 14 */}
          <div className="ph-scale-wrapper" aria-label="Skala Tingkat Keasaman pH 7.0 Netral">
            <div className="ph-scale-bar">
              <span className="ph-scale-gradient" />
              <div className="ph-scale-marker" style={{ left: '50%' }}>
                <span className="ph-scale-needle" />
                <span className="ph-scale-tag">7.0 NETRAL</span>
              </div>
            </div>
            <div className="ph-scale-labels">
              <span>0 (Asam Kuat)</span>
              <span>7 (Netral)</span>
              <span>14 (Basa Kuat)</span>
            </div>
          </div>
        </div>

        {/* KARTU 3: PERMUKAAN KOMPATIBEL (DEFAULT AKTIF) */}
        <div
          className={`lab-spec-card ${activeCardId === 'compat' ? 'lab-spec-card--active' : ''}`}
          onClick={() => setActiveCardId('compat')}
          role="button"
          tabIndex={0}
        >
          <div className="lab-spec-card__top">
            <span className="lab-spec-card__micro">PERMUKAAN KOMPATIBEL</span>
            <span className="lab-spec-card__badge-default">AKTIF TERVERIFIKASI</span>
          </div>
          <h4 className="lab-spec-card__value">Dasbor vinil, panel plastik tekstur, doortrim, kulit sintetis (PU/PVC)</h4>
          <p className="lab-spec-card__desc">
            Diuji pada berbagai varian substrat kabin kendaraan tanpa memicu retak rambut, pemudaran warna, atau reaksi korosif.
          </p>
        </div>

        {/* KARTU 4: KARAKTER HASIL AKHIR DENGAN 2D BEFORE/AFTER SLIDER */}
        <div
          className={`lab-spec-card lab-spec-card--wide ${activeCardId === 'finish' ? 'lab-spec-card--active' : ''}`}
          onClick={() => setActiveCardId('finish')}
          role="button"
          tabIndex={0}
        >
          <div className="lab-spec-card__top">
            <span className="lab-spec-card__micro">KARAKTER HASIL AKHIR</span>
            <span className="lab-spec-card__code">SPEC-04</span>
          </div>
          <h4 className="lab-spec-card__value">Natural Satin Touch (Non-Greasy & Bebas Lengket)</h4>
          
          {/* Interactive 2D Before / After Comparison Slider */}
          <div className="before-after-container">
            <div className="before-after-preview">
              {/* After Layer (Satin Clean) */}
              <div className="before-after-layer before-after-layer--after">
                <span className="before-after-tag before-after-tag--after">SESUDAH: SATIN BERSIH ALAMI</span>
                <div className="before-after-surface before-after-surface--satin" />
              </div>

              {/* Before Layer (Kusam / Berminyak Silau) */}
              <div
                className="before-after-layer before-after-layer--before"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <span className="before-after-tag before-after-tag--before">SEBELUM: KUSAM & SILAU</span>
                <div className="before-after-surface before-after-surface--oily" />
              </div>

              {/* Slider Divider Line */}
              <div className="before-after-handle" style={{ left: `${sliderPos}%` }}>
                <span className="before-after-handle-line" />
                <span className="before-after-handle-thumb">
                  <Sliders size={13} strokeWidth={2} />
                </span>
              </div>
            </div>

            {/* Range Input for Accessible Dragging */}
            <div className="before-after-control">
              <label htmlFor="surface-slider" className="before-after-label">
                Geser slider untuk membandingkan refleksi permukaan:
              </label>
              <input
                id="surface-slider"
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="before-after-range"
                aria-label="Slider Perbandingan Sebelum dan Sesudah"
              />
            </div>
          </div>
        </div>

        {/* KARTU 5: ESTIMASI KAPASITAS PEMAKAIAN */}
        <div
          className={`lab-spec-card ${activeCardId === 'yield' ? 'lab-spec-card--active' : ''}`}
          onClick={() => setActiveCardId('yield')}
          role="button"
          tabIndex={0}
        >
          <div className="lab-spec-card__top">
            <span className="lab-spec-card__micro">ESTIMASI KAPASITAS PEMAKAIAN</span>
            <span className="lab-spec-card__code">SPEC-05</span>
          </div>
          <h4 className="lab-spec-card__value">25–35 Unit Kendaraan Interior Lengkap</h4>
          <p className="lab-spec-card__desc">
            Rasio aplikasi sangat efisien (± 15 ml per kendaraan sedan/SUV).
          </p>
          <a
            href="#b2b-calculator"
            onClick={scrollToB2B}
            className="lab-spec-card__b2b-btn"
          >
            <Calculator size={13} strokeWidth={2} />
            <span>Kalkulator Kebutuhan B2B</span>
            <ArrowRight size={13} strokeWidth={2} />
          </a>
        </div>

        {/* KARTU 6: DAYA TAHAN / KARAKTER PROTEKSI */}
        <div
          className={`lab-spec-card ${activeCardId === 'durability' ? 'lab-spec-card--active' : ''}`}
          onClick={() => setActiveCardId('durability')}
          role="button"
          tabIndex={0}
        >
          <div className="lab-spec-card__top">
            <span className="lab-spec-card__micro">DAYA TAHAN / KARAKTER PROTEKSI</span>
            <span className="lab-spec-card__code">SPEC-06</span>
          </div>
          <h4 className="lab-spec-card__value">Proteksi debu statis hingga 3–4 Minggu</h4>
          <p className="lab-spec-card__desc">
            Mengandung matriks anti-statis yang mencegah partikel debu halus beterbangan dan menempel kembali pada dasbor.
          </p>
        </div>

        {/* KARTU 7: KARAKTER AROMA */}
        <div
          className={`lab-spec-card ${activeCardId === 'scent' ? 'lab-spec-card--active' : ''}`}
          onClick={() => setActiveCardId('scent')}
          role="button"
          tabIndex={0}
        >
          <div className="lab-spec-card__top">
            <span className="lab-spec-card__micro">KARAKTER AROMA</span>
            <span className="lab-spec-card__code">SPEC-07</span>
          </div>
          <h4 className="lab-spec-card__value">Signature Executive Fresh (Aroma Segar Mewah)</h4>
          <p className="lab-spec-card__desc">
            Menetralkan aroma apek kelembapan kabin dan asap AC dengan keharuman tenang yang tidak menyengat hidung.
          </p>
        </div>
      </div>
    </div>
  );
}
