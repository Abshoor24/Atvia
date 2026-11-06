import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageSquare,
  X,
  Package,
  Layers
} from 'lucide-react';
import { products, careSequence } from '../data/products';
import VehicleZoneSchematic from './VehicleZoneSchematic';
import './CareSequence.css';

/**
 * Helper lookup untuk mendapatkan data lengkap produk berdasarkan nama
 */
function getProductInfo(name) {
  if (!name) return null;
  const normalized = name.toLowerCase().trim();
  return products.find((p) => p.name.toLowerCase().trim() === normalized) || null;
}

export default function CareSequence() {
  const [activeStep, setActiveStep] = useState('1');
  const [popoverProduct, setPopoverProduct] = useState(null);
  const sectionRef = useRef(null);

  const currentStepData = careSequence.find((item) => item.step === activeStep) || careSequence[0];

  const handlePrev = () => {
    const cur = parseInt(activeStep, 10);
    if (cur > 1) {
      setActiveStep(String(cur - 1));
    }
  };

  const handleNext = () => {
    const cur = parseInt(activeStep, 10);
    if (cur < 4) {
      setActiveStep(String(cur + 1));
    }
  };

  // Keyboard navigation support: Panah Kiri / Kanan & Escape popover
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Abaikan jika fokus pada input/textarea form
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;

      if (e.key === 'ArrowLeft') {
        const cur = parseInt(activeStep, 10);
        if (cur > 1) {
          setActiveStep(String(cur - 1));
        }
      } else if (e.key === 'ArrowRight') {
        const cur = parseInt(activeStep, 10);
        if (cur < 4) {
          setActiveStep(String(cur + 1));
        }
      } else if (e.key === 'Escape') {
        setPopoverProduct(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStep]);

  return (
    <section
      id="urutan-perawatan"
      className="section care-section"
      ref={sectionRef}
      aria-label="Urutan Perawatan Terarah ATVIA"
    >
      <div className="container">
        {/* ====================================================================
            HEADER SEKSI: SWISS LAB AESTHETIC & EXACT COPYWRITING
            ==================================================================== */}
        <div className="section-header care-section-header">
          <div className="care-section-eyebrow">
            <Layers size={13} strokeWidth={2} />
            <span>METODOLOGI DETAILING LABORATORIUM</span>
          </div>
          <h2 className="care-section-title">Urutan Perawatan Terarah</h2>
          <p className="lead care-section-lead">
            Perawatan kendaraan memberikan hasil paling optimal ketika diaplikasikan dalam urutan yang tepat — dari dekontaminasi kaca & bodi, restorasi trim & ban, proteksi kilap cat, hingga finishing kabin.
          </p>
        </div>

        {/* ====================================================================
            BAGIAN ATAS: INTERACTIVE 4-STAGE PIPELINE STEPPER
            ==================================================================== */}
        <div className="care-pipeline-wrapper" role="tablist" aria-label="Urutan langkah perawatan terarah">
          {/* Hint interaktivitas & ringkasan status tahap */}
          <div className="care-pipeline-hint-bar">
            <div className="care-pipeline-hint-left">
              <span className="care-pipeline-hint-badge">ALUR INTERAKTIF</span>
              <span className="care-pipeline-hint-text">
                Klik pada nomor tahapan [1] - [4] atau kartu di bawah untuk membuka parameter spesifikasi & diagram skematik kendaraan.
              </span>
            </div>
            <div className="care-pipeline-hint-right">
              <span className="care-pipeline-hint-status">
                Tahap Ditampilkan: <strong>Tahap {currentStepData.step} ({currentStepData.name})</strong>
              </span>
            </div>
          </div>

          {/* Stepper Header Track: 4 Nomor Terhubung Presisi dengan Garis Horizontal */}
          <div className="care-stepper-track-bar" aria-label="Indikator alur nomor tahapan">
            {careSequence.map((item, idx) => {
              const stepNum = parseInt(item.step, 10);
              const activeNum = parseInt(activeStep, 10);
              const isPassed = stepNum < activeNum;
              const isActive = activeStep === item.step;

              return (
                <div key={item.step} className="care-stepper-node-slot">
                  {/* Nomor Stepper 44x44px Button */}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    id={`care-tab-${item.step}`}
                    aria-controls={`care-panel-${item.step}`}
                    className={`care-step-node-btn ${isActive ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
                    onClick={() => setActiveStep(item.step)}
                    title={`Pilih Tahap ${item.step}: ${item.name}`}
                  >
                    <span className="care-step-node-num">{item.step}</span>
                  </button>

                  {/* Garis Penghubung antar Angka (Hanya untuk slot 1, 2, 3) */}
                  {idx < careSequence.length - 1 && (
                    <div className="care-step-segment-line" aria-hidden="true">
                      <div
                        className={`care-step-segment-fill ${stepNum < activeNum ? 'is-filled' : ''}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 4 Kolom Kartu Interaktif Tahapan */}
          <div className="care-pipeline-grid">
            {careSequence.map((item) => {
              const isActive = activeStep === item.step;
              const stepNum = parseInt(item.step, 10);
              const activeNum = parseInt(activeStep, 10);
              const isPassed = stepNum < activeNum;

              return (
                <div
                  key={item.step}
                  className={`care-step-card ${isActive ? 'care-step-card--active' : ''} ${isPassed ? 'care-step-card--passed' : ''}`}
                  onClick={() => setActiveStep(item.step)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStep(item.step);
                    }
                  }}
                  title={`Klik untuk melihat detail Tahap ${item.step}: ${item.name}`}
                >
                  {/* Status Bar Kartu: Label Tahap & Status Interaktif */}
                  <div className="care-card-status-bar">
                    <span className="care-card-stage-label">TAHAP 0{item.step}</span>
                    {isActive ? (
                      <span className="care-status-pill care-status-pill--active">
                        <span className="care-pulse-dot" /> TAHAP AKTIF
                      </span>
                    ) : (
                      <span className="care-status-pill care-status-pill--idle">
                        KLIK UNTUK PILIH &rarr;
                      </span>
                    )}
                  </div>

                  {/* Isi Kolom Tahapan */}
                  <div className="care-step-body">
                    <h3 className="care-step-title">
                      {item.step}. {item.name}
                    </h3>
                    <p className="care-step-desc">{item.description}</p>

                    {/* Micro-label & Pill Badge Produk Terkait */}
                    <div className="care-step-products-group">
                      <span className="care-step-products-label">PRODUK TERKAIT:</span>
                      <div className="care-step-pills-list">
                        {item.products.map((prodName) => {
                          const pData = getProductInfo(prodName);
                          return (
                            <button
                              key={prodName}
                              type="button"
                              className="care-product-pill"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPopoverProduct(
                                  pData || {
                                    name: prodName,
                                    summary: 'Formula spesifikasi resmi ATVIA untuk tahap ini.',
                                    volume: 'Kemasan Laboratorium'
                                  }
                                );
                              }}
                              title={`Lihat info ringkas ${prodName}`}
                            >
                              <span>{prodName}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            BAGIAN BAWAH: ACTIVE STAGE TECHNICAL WORKBENCH CARD
            (Kontainer Putih/Gelap dengan Aksen Garis Merah Vertikal Sisi Kiri)
            ==================================================================== */}
        <div
          className="care-workbench-card"
          id={`care-panel-${currentStepData.step}`}
          role="tabpanel"
          aria-labelledby={`care-tab-${currentStepData.step}`}
          key={currentStepData.step}
        >
          {/* Header Baris Workbench: Badge + Judul Tahap + Tombol Navigasi Cepat */}
          <div className="care-workbench-header">
            <div className="care-workbench-header-left">
              <span className="care-workbench-badge">
                TAHAP {currentStepData.step} DARI 4
              </span>
              <h3 className="care-workbench-title">
                {currentStepData.cardTitle || currentStepData.name}
              </h3>
            </div>

            {/* Tombol Navigasi Cepat (< Sebelumnya | Selanjutnya >) */}
            <div className="care-workbench-nav-actions" role="group" aria-label="Navigasi Tahapan Cepat">
              <button
                type="button"
                className="care-workbench-nav-btn"
                onClick={handlePrev}
                disabled={activeStep === '1'}
                aria-label="Tahap Sebelumnya"
                title="Pindah ke tahap sebelumnya"
              >
                <ChevronLeft size={15} strokeWidth={2} />
                <span>Sebelumnya</span>
              </button>

              <span className="care-workbench-nav-divider" aria-hidden="true" />

              <button
                type="button"
                className="care-workbench-nav-btn"
                onClick={handleNext}
                disabled={activeStep === '4'}
                aria-label="Tahap Selanjutnya"
                title="Pindah ke tahap selanjutnya"
              >
                <span>Selanjutnya</span>
                <ChevronRight size={15} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Body Grid 2 Area: 8 Kolom Kiri (Spesifikasi) + 4 Kolom Kanan (Skematik SVG Mobil) */}
          <div className="care-workbench-grid">
            {/* Area Kiri (8 Kolom): 3 Spesifikasi Lapangan */}
            <div className="care-workbench-specs-col">
              <div className="care-specs-triplet">
                {/* 1. TUJUAN PENGERJAAN */}
                <div className="care-spec-item">
                  <span className="care-spec-label">TUJUAN PENGERJAAN</span>
                  <p className="care-spec-text">{currentStepData.purpose}</p>
                </div>

                {/* 2. TIPS LAPANGAN (PRO-TIP) */}
                <div className="care-spec-item">
                  <span className="care-spec-label">TIPS LAPANGAN (PRO-TIP)</span>
                  <p className="care-spec-text">{currentStepData.proTip}</p>
                </div>

                {/* 3. PERALATAN PENDUKUNG & PILL PRODUK TERKAIT */}
                <div className="care-spec-item">
                  <span className="care-spec-label">PERALATAN PENDUKUNG</span>
                  <p className="care-spec-text">{currentStepData.tools}</p>

                  <div className="care-spec-footer-row">
                    <span className="care-spec-sublabel">PRODUK TERKAIT LANGSUNG:</span>
                    <div className="care-spec-pills-wrap">
                      {currentStepData.products.map((prodName) => {
                        const pData = getProductInfo(prodName);
                        return (
                          <button
                            key={prodName}
                            type="button"
                            className="care-spec-clickable-pill"
                            onClick={() => {
                              setPopoverProduct(
                                pData || {
                                  name: prodName,
                                  summary: 'Formula spesifikasi resmi ATVIA.',
                                  volume: 'Kemasan Laboratorium'
                                }
                              );
                            }}
                            title={`Lihat info & konsultasi formula ${prodName}`}
                          >
                            <span>{prodName}</span>
                            <ArrowRight size={12} strokeWidth={2} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Area Kanan (4 Kolom): 2D Technical SVG Vehicle Zone Schematic */}
            <div className="care-workbench-schematic-col">
              <VehicleZoneSchematic
                activeStep={activeStep}
                onSelectZone={setActiveStep}
              />
            </div>
          </div>
        </div>

        {/* ====================================================================
            PRODUCT PILL QUICK-POPOVER / DRAWER MODAL
            ==================================================================== */}
        {popoverProduct && (
          <div
            className="care-popover-backdrop"
            onClick={() => setPopoverProduct(null)}
            role="presentation"
          >
            <div
              className="care-popover-card"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Spesifikasi Singkat Produk ${popoverProduct.name}`}
            >
              {/* Header Popover */}
              <div className="care-popover-header">
                <div className="care-popover-meta">
                  {popoverProduct.category && (
                    <span className="care-popover-cat">{popoverProduct.category}</span>
                  )}
                  {popoverProduct.volume && (
                    <span className="care-popover-vol">{popoverProduct.volume}</span>
                  )}
                  {popoverProduct.highlightBadge && (
                    <span className="care-popover-badge">{popoverProduct.highlightBadge}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="care-popover-close-btn"
                  onClick={() => setPopoverProduct(null)}
                  aria-label="Tutup popover informasi"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>

              {/* Title & Info */}
              <h4 className="care-popover-title">{popoverProduct.name}</h4>

              {popoverProduct.solvesProblem && (
                <div className="care-popover-field">
                  <span className="care-popover-field-label">FOKUS SOLUSI:</span>
                  <p className="care-popover-field-text">{popoverProduct.solvesProblem}</p>
                </div>
              )}

              <p className="care-popover-summary">{popoverProduct.summary}</p>

              {/* Aksi Cepat */}
              <div className="care-popover-actions">
                {popoverProduct.slug ? (
                  <Link
                    to={`/produk/${popoverProduct.slug}`}
                    className="care-popover-btn-primary"
                    onClick={() => setPopoverProduct(null)}
                  >
                    <Package size={14} strokeWidth={2} />
                    <span>Lihat Spesifikasi Lengkap</span>
                    <ArrowRight size={13} strokeWidth={2} />
                  </Link>
                ) : null}

                <a
                  href={`https://wa.me/6285700470046?text=Halo%20ATVIA,%20saya%20ingin%20konsultasi%20mengenai%20produk%20${encodeURIComponent(popoverProduct.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="care-popover-btn-secondary"
                >
                  <MessageSquare size={14} strokeWidth={2} />
                  <span>Konsultasi via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
