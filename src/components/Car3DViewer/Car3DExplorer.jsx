import { useState, useEffect, useId } from 'react';
import { Link } from 'react-router-dom';
import { CarCanvas } from './CarCanvas';
import { Eye, Shield, Check, X, Layers, ExternalLink } from 'lucide-react';
import './Car3DExplorer.css';

// 5 Official ATVIA Care Sequence Pins
const SEQUENCE_PINS = [
  {
    id: 'seq-1',
    step: '01',
    slug: 'waterspot-cleaner',
    name: 'Waterspot Cleaner',
    category: 'Pembersih Khusus & Kaca',
    volume: '500 ml',
    badge: 'ZERO SPOT FORMULA',
    position: [-0.45, 0.92, 0.0],
    substrate: 'Kaca Depan / Windshield & Kaca Samping',
    targetProblem: 'Jamur kaca & kerak deposit air mineral',
    function: 'Melarutkan deposit mineral, waterspot membandel, dan jamur kaca tanpa meninggalkan residu atau mengikis kaca.',
    shortDesc: 'Pembersihan jamur kaca & mineral'
  },
  {
    id: 'seq-2',
    step: '02',
    slug: 'action-black-dressing',
    name: 'Action Black Dressing',
    category: 'Restorasi Plastik & Trim',
    volume: '500 ml',
    badge: 'BACK TO BLACK',
    position: [0.05, 0.35, 1.05],
    substrate: 'Trim Bawah Bodi, Karet Talang Air & Mudguard',
    targetProblem: 'Bodi plastik kasar & karet memutih kusam',
    function: 'Menghitamkan bodi plastik kasar (unpainted trim), kulit sintetis, dan karet kusam serta proteksi paparan sinar UV.',
    shortDesc: 'Restorasi plastik kasar & karet'
  },
  {
    id: 'seq-3',
    step: '03',
    slug: 'advance-coating',
    name: 'Advance Coating',
    category: 'Proteksi Cat & Kilap',
    volume: '500 ml',
    badge: 'HYDROPHOBIC BEADING',
    position: [-1.4, 0.72, 0.0],
    substrate: 'Kap Mesin, Panel Pintu & Clear Coat Cat',
    targetProblem: 'Cat kusam & air mudah mengendap noda',
    function: 'Formula spray coating cepat menghasilkan kilau reflektif tinggi (mirror gloss) & efek hidrofobik daun talas.',
    shortDesc: 'Proteksi hidrofobik & deep gloss'
  },
  {
    id: 'seq-4',
    step: '04',
    slug: 'tire-shine-protection',
    name: 'Tire Shine Protection',
    category: 'Perawatan Ban',
    volume: '1 Liter',
    badge: 'ULTIMATE WET-LOOK 1L',
    position: [1.35, 0.35, 0.95],
    substrate: 'Dinding Samping Ban (Sidewall)',
    targetProblem: 'Dinding ban cokelat, kusam & kering getas',
    function: 'Kilap gloss wet-look pekat berkualitas tinggi dengan perlindungan elastisitas ban dari keretakan (dry rot).',
    shortDesc: 'Wet-look pekat & anti-retak ban'
  },
  {
    id: 'seq-5',
    step: '05',
    slug: 'interior-guard',
    name: 'Interior Guard',
    category: 'Perawatan Interior',
    volume: '500 ml',
    badge: 'Luxury Freshness',
    position: [-0.25, 0.82, 0.1],
    substrate: 'Dasbor Vinil, Panel Pintu, Konsol & Jok PU',
    targetProblem: 'Debu kabin, dasbor kusam & aroma apek',
    function: 'Pembersih dan pelindung kabin untuk mengangkat debu, memberi kilap natural, serta kesegaran mewah tahan lama.',
    shortDesc: 'Perawatan dasbor & kesegaran kabin'
  }
];

// Safety Inspection Points (Cabin Detailing)
const INSPECTION_POINTS = [
  {
    id: 'insp-safe-1',
    type: 'safe',
    zone: 'Dasbor Vinil & Panel Konsol',
    position: [-0.32, 0.78, 0.22],
    instruction: 'ZONA AMAN: Aplikasikan rutin tiap 2 minggu dengan menyemprotkan cairan ke lap microfiber terlebih dahulu.'
  },
  {
    id: 'insp-safe-2',
    type: 'safe',
    zone: 'Doortrim & Trim Plastik Pintu',
    position: [-0.15, 0.65, 0.78],
    instruction: 'ZONA AMAN: Usap searah tekstur untuk mengangkat debu halus dan mengembalikan sentuhan satin alami.'
  },
  {
    id: 'insp-safe-3',
    type: 'safe',
    zone: 'Kisi-kisi Pendingin Udara (AC)',
    position: [-0.38, 0.76, 0.0],
    instruction: 'ZONA AMAN: Gunakan kuas detailing berbulu halus untuk meratakan cairan di celah kisi AC tanpa menyemprot langsung.'
  },
  {
    id: 'insp-safe-4',
    type: 'safe',
    zone: 'Konsol Tengah & Tombol Soft-Touch',
    position: [-0.05, 0.58, 0.0],
    instruction: 'ZONA AMAN: Aman untuk tombol panel elektrik karena formula water-based tidak melarutkan pelapis tombol.'
  },
  {
    id: 'insp-safe-5',
    type: 'safe',
    zone: 'Jok Kulit Sintetis (PU / PVC)',
    position: [0.22, 0.60, 0.32],
    instruction: 'ZONA AMAN: Membersihkan noda debu dan keringat tanpa meninggalkan rasa lengket atau licin berminyak.'
  },
  {
    id: 'insp-danger-1',
    type: 'danger',
    zone: 'Lingkar Kemudi (Steering Wheel)',
    position: [-0.42, 0.78, 0.35],
    instruction: 'ZONA PANTANGAN: Jangan disemprotkan ke kemudi karena licin berbahaya dan dapat mengurangi cengkeraman tangan saat berkendara.'
  },
  {
    id: 'insp-danger-2',
    type: 'danger',
    zone: 'Area Pedal Bawah (Gas / Rem / Kopling)',
    position: [-0.62, 0.35, 0.35],
    instruction: 'ZONA PANTANGAN: Sangat berbahaya jika disemprotkan ke pedal gas/rem/kopling karena licin dan berisiko kecelakaan.'
  },
  {
    id: 'insp-danger-3',
    type: 'danger',
    zone: 'Bahan Suede / Alcantara Asli',
    position: [0.2, 0.72, -0.32],
    instruction: 'ZONA PANTANGAN: Hindari bahan suede atau alcantara asli (gunakan cairan pembersih suede khusus untuk mencegah kerusakan serat).'
  }
];

export default function Car3DExplorer({ initialSlug }) {
  const sectionId = useId();
  const matchingPin = SEQUENCE_PINS.find((p) => p.slug === initialSlug);
  const defaultPinId = matchingPin ? matchingPin.id : 'seq-5';
  const defaultMode = matchingPin?.slug === 'interior-guard' ? 'interior' : 'exterior';

  const [viewMode, setViewMode] = useState(defaultMode); // 'exterior' | 'interior' | 'inspection'
  const [selectedPinId, setSelectedPinId] = useState(defaultPinId);

  // Dynamically track active theme
  const [isDark, setIsDark] = useState(() => {
    return typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDark(dark);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const [prevSlug, setPrevSlug] = useState(initialSlug);
  if (initialSlug !== prevSlug) {
    setPrevSlug(initialSlug);
    const pin = SEQUENCE_PINS.find((p) => p.slug === initialSlug);
    if (pin) {
      setSelectedPinId(pin.id);
      setViewMode(pin.slug === 'interior-guard' ? 'interior' : 'exterior');
    }
  }

  const activeSeqPin = SEQUENCE_PINS.find((p) => p.id === selectedPinId) || SEQUENCE_PINS[4];

  const handleModeChange = (mode) => {
    setViewMode(mode);
    if (mode === 'inspection') {
      setSelectedPinId('insp-safe-1');
    } else if (mode === 'interior') {
      setSelectedPinId('seq-5'); // Interior Guard
    } else {
      setSelectedPinId('seq-3'); // Hood / Advance Coating
    }
  };

  return (
    <section className="car-explorer-section" aria-labelledby={`${sectionId}-heading`}>
      <div className="container">
        {/* Section Header: Swiss Clinical Architecture */}
        <div className="car-explorer__header">
          <div className="car-explorer__header-left">
            <span className="car-explorer__eyebrow">MODUL EKSPLORASI INTERAKTIF</span>
            <h2 id={`${sectionId}-heading`} className="car-explorer__title">
              3D Car Substrate & Care Sequence Explorer
            </h2>
            <p className="car-explorer__subtitle">
              Simulasi interaktif pemetaan kimia perawatan ATVIA pada substrat mobil nyata. Putar, dekatkan, dan pelajari urutan aplikasi serta protokol keamanan kabin.
            </p>
          </div>

          {/* Segmented View Mode Controller */}
          <div className="car-explorer__segmented-control" role="tablist" aria-label="Mode Sudut Pandang Mobil 3D">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'exterior'}
              className={`car-explorer__segment-btn ${viewMode === 'exterior' ? 'car-explorer__segment-btn--active' : ''}`}
              onClick={() => handleModeChange('exterior')}
            >
              <Eye size={15} strokeWidth={2} />
              <span>Sudut Eksterior</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'interior'}
              className={`car-explorer__segment-btn ${viewMode === 'interior' ? 'car-explorer__segment-btn--active' : ''}`}
              onClick={() => handleModeChange('interior')}
            >
              <Layers size={15} strokeWidth={2} />
              <span>Sudut Kabin Interior</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'inspection'}
              className={`car-explorer__segment-btn car-explorer__segment-btn--inspection ${viewMode === 'inspection' ? 'car-explorer__segment-btn--active' : ''}`}
              onClick={() => handleModeChange('inspection')}
            >
              <Shield size={15} strokeWidth={2} />
              <span>Mode Inspeksi Do&apos;s & Don&apos;ts</span>
            </button>
          </div>
        </div>

        {/* 12-Column Technical Grid */}
        <div className="car-explorer__grid">
          {/* Kolom Kiri: 7 Span Kanvas 3D Mobil */}
          <div className="car-explorer__canvas-col">
            <div className="car-explorer__canvas-frame">
              <CarCanvas
                viewMode={viewMode}
                selectedPinId={selectedPinId}
                onSelectPin={setSelectedPinId}
                inspectionPoints={INSPECTION_POINTS}
                sequencePins={SEQUENCE_PINS}
                isDark={isDark}
              />
            </div>
            
            {/* Guide hint beneath canvas */}
            <div className="car-explorer__canvas-hint">
              <span className="car-explorer__canvas-hint-text">
                Klik dan tahan untuk memutar kamera • Scroll untuk memperbesar/memperkecil • Klik titik pin bernomor pada mobil untuk inspeksi spesifik
              </span>
            </div>
          </div>

          {/* Kolom Kanan: 5 Span Panel Spesifikasi Urutan Perawatan & Substrat */}
          <div className="car-explorer__panel-col">
            {viewMode !== 'inspection' ? (
              /* PANEL MODE 1 & 2: Urutan Perawatan 01-05 */
              <div className="car-spec-panel">
                <div className="car-spec-panel__header">
                  <span className="car-spec-panel__eyebrow">URUTAN FORMULASI</span>
                  <h3 className="car-spec-panel__title">Daftar Substrat & Produk</h3>
                </div>

                {/* 5 Step Sequence Card List */}
                <div className="car-spec-panel__list">
                  {SEQUENCE_PINS.map((pin) => {
                    const isSelected = selectedPinId === pin.id;
                    return (
                      <div
                        key={pin.id}
                        className={`car-spec-card ${isSelected ? 'car-spec-card--active' : ''}`}
                        onClick={() => setSelectedPinId(pin.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedPinId(pin.id);
                          }
                        }}
                      >
                        <div className="car-spec-card__num-col">
                          <span className="car-spec-card__num">{pin.step}</span>
                        </div>
                        <div className="car-spec-card__body">
                          <div className="car-spec-card__top">
                            <h4 className="car-spec-card__name">{pin.name}</h4>
                            <span className="car-spec-card__vol">{pin.volume}</span>
                          </div>
                          <span className="car-spec-card__substrate">{pin.substrate}</span>
                          <p className="car-spec-card__func">{pin.function}</p>
                          <div className="car-spec-card__meta">
                            <span className="car-spec-card__badge">{pin.badge}</span>
                            <span className="car-spec-card__cat">{pin.category}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Active Focus Summary Box */}
                {activeSeqPin && (
                  <div className="car-spec-panel__focus-box">
                    <div className="car-spec-panel__focus-header">
                      <span className="car-spec-panel__focus-tag">Fokus Terpilih: Tahap {activeSeqPin.step}</span>
                      <Link to={`/produk/${activeSeqPin.slug}`} className="car-spec-panel__focus-link">
                        <span>Buka Detail</span>
                        <ExternalLink size={13} strokeWidth={2} />
                      </Link>
                    </div>
                    <p className="car-spec-panel__focus-text">
                      <strong>Target Masalah:</strong> {activeSeqPin.targetProblem}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* PANEL MODE 3: Inspeksi Do's & Don'ts */
              <div className="car-inspection-panel">
                <div className="car-inspection-panel__header">
                  <span className="car-inspection-panel__eyebrow">INSPEKSI KABIN INTERIOR</span>
                  <h3 className="car-inspection-panel__title">Zona Aman vs Pantangan</h3>
                  <p className="car-inspection-panel__sub">
                    Pilih titik inspeksi di bawah ini untuk mengarahkan kamera 3D ke zona aman aplikasi atau area pantangan di dalam kabin mobil.
                  </p>
                </div>

                {/* Safe Zones List */}
                <div className="car-inspection-block car-inspection-block--safe">
                  <div className="car-inspection-block__title-row">
                    <span className="car-inspection-badge car-inspection-badge--safe">
                      <Check size={13} strokeWidth={2.5} />
                      <span>5 ZONA AMAN APLIKASI</span>
                    </span>
                  </div>
                  <div className="car-inspection-items">
                    {INSPECTION_POINTS.filter((p) => p.type === 'safe').map((pt) => {
                      const isSelected = selectedPinId === pt.id;
                      return (
                        <div
                          key={pt.id}
                          className={`car-inspection-item car-inspection-item--safe ${isSelected ? 'car-inspection-item--active' : ''}`}
                          onClick={() => setSelectedPinId(pt.id)}
                          role="button"
                          tabIndex={0}
                        >
                          <span className="car-inspection-bullet car-inspection-bullet--safe">
                            <Check size={12} strokeWidth={2.5} />
                          </span>
                          <div className="car-inspection-text">
                            <strong>{pt.zone}</strong>
                            <span>{pt.instruction}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Danger / Prohibited Zones List */}
                <div className="car-inspection-block car-inspection-block--danger">
                  <div className="car-inspection-block__title-row">
                    <span className="car-inspection-badge car-inspection-badge--danger">
                      <X size={13} strokeWidth={2.5} />
                      <span>3 ZONA PANTANGAN KERAS</span>
                    </span>
                  </div>
                  <div className="car-inspection-items">
                    {INSPECTION_POINTS.filter((p) => p.type === 'danger').map((pt) => {
                      const isSelected = selectedPinId === pt.id;
                      return (
                        <div
                          key={pt.id}
                          className={`car-inspection-item car-inspection-item--danger ${isSelected ? 'car-inspection-item--active' : ''}`}
                          onClick={() => setSelectedPinId(pt.id)}
                          role="button"
                          tabIndex={0}
                        >
                          <span className="car-inspection-bullet car-inspection-bullet--danger">
                            <X size={12} strokeWidth={2.5} />
                          </span>
                          <div className="car-inspection-text">
                            <strong>{pt.zone}</strong>
                            <span>{pt.instruction}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
