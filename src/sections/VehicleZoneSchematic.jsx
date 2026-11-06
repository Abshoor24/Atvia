import { memo } from 'react';
import { Crosshair, Droplets } from 'lucide-react';

/**
 * 2D Technical SVG Vehicle Zone Schematic (Diagram Zona Aplikasi)
 * High-Precision Swiss Blueprint Architecture
 * - Blueprint wireframe with dynamic active zone highlighting (ATVIA Red #DC2626)
 * - Clickable zones to switch stages
 * - Hydrophobic lotus beading indicators for Stage 3
 */
const VehicleZoneSchematic = memo(function VehicleZoneSchematic({
  activeStep = '1',
  onSelectZone
}) {
  const stepNum = parseInt(activeStep, 10);

  const zones = [
    { step: '1', key: 'glass', label: 'Kaca & Panel Eksterior' },
    { step: '2', key: 'trim-tire', label: 'Trim Plastik & Dinding Ban' },
    { step: '3', key: 'paint', label: 'Permukaan Cat Bodi Eksterior' },
    { step: '4', key: 'interior', label: 'Kabin Interior' }
  ];

  const currentZone = zones.find((z) => z.step === activeStep) || zones[0];

  return (
    <div className="care-schematic-card" aria-label="Diagram Zona Aplikasi Kendaraan">
      {/* Schematic Header Bar */}
      <div className="care-schematic-header">
        <div className="care-schematic-title-row">
          <Crosshair size={13} strokeWidth={2} className="care-schematic-icon" />
          <span className="care-schematic-label">DIAGRAM ZONA APLIKASI</span>
        </div>
        <span className="care-schematic-badge" title="Zona Aktif Saat Ini">
          {currentZone.label}
        </span>
      </div>

      {/* Blueprint Canvas SVG */}
      <div className="care-schematic-canvas">
        <svg
          viewBox="0 0 520 190"
          className="care-car-svg"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`Skematik kendaraan ATVIA - Zona aktif: ${currentZone.label}`}
        >
          <defs>
            {/* Subtle Technical Grid Pattern */}
            <pattern id="techGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="care-svg-grid-stroke" />
            </pattern>

            {/* Hydrophobic Droplet Gradient */}
            <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#B91C1C" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Grid Background */}
          <rect width="520" height="190" fill="url(#techGrid)" opacity="0.35" />

          {/* Ground Baseline */}
          <line x1="20" y1="174" x2="500" y2="174" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="care-svg-ground" />

          {/* Technical Dimension & Protocol Marks */}
          <text x="18" y="22" className="care-svg-micro-text">SYS // REF-SEDAN-ATVIA</text>
          <text x="502" y="22" textAnchor="end" className="care-svg-micro-text">PROT-2D // SCALE 1:24</text>

          {/* ====================================================================
              ZONA 3: PERMUKAAN CAT BODI EKSTERIOR (Kap Mesin, Atap, Pintu, Bagasi)
              ==================================================================== */}
          <g
            className={`care-car-zone care-zone-paint ${stepNum === 3 ? 'care-car-zone--active' : ''}`}
            onClick={() => onSelectZone && onSelectZone('3')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectZone && onSelectZone('3');
              }
            }}
            aria-label="Pilih Zona 3: Permukaan Cat Bodi Eksterior"
          >
            {/* Kap Mesin & Spatbor Depan Atas */}
            <path
              d="M 38 112 L 144 88 L 144 116 L 76 118 L 38 126 Z"
              className="care-zone-fill"
            />
            {/* Atap Mobil */}
            <path
              d="M 218 36 L 348 36 L 348 44 L 218 44 Z"
              className="care-zone-fill"
            />
            {/* Panel Pintu Depan */}
            <path
              d="M 144 88 L 254 88 L 254 144 L 144 144 Z"
              className="care-zone-fill"
            />
            {/* Panel Pintu Belakang */}
            <path
              d="M 254 88 L 368 88 L 368 144 L 254 144 Z"
              className="care-zone-fill"
            />
            {/* Bagasi & Fender Belakang Atas */}
            <path
              d="M 368 88 L 476 96 L 476 128 L 444 136 L 368 144 Z"
              className="care-zone-fill"
            />

            {/* Hydrophobic Lotus Effect Beading (Menyala saat Tahap 3 Aktif) */}
            {stepNum === 3 && (
              <g className="care-hydrophobic-droplets animate-fade-in">
                {/* Droplet 1 (Kap Mesin) */}
                <circle cx="85" cy="98" r="3.5" fill="url(#dropGrad)" />
                <circle cx="85" cy="98" r="6" fill="none" stroke="#DC2626" strokeWidth="0.75" opacity="0.6" />

                {/* Droplet 2 (Kap Mesin) */}
                <circle cx="118" cy="92" r="3" fill="url(#dropGrad)" />

                {/* Droplet 3 (Atap Tengah) */}
                <circle cx="280" cy="30" r="3.5" fill="url(#dropGrad)" />
                <circle cx="280" cy="30" r="6.5" fill="none" stroke="#DC2626" strokeWidth="0.75" opacity="0.6" />

                {/* Droplet 4 (Atap Belakang) */}
                <circle cx="320" cy="30" r="3" fill="url(#dropGrad)" />

                {/* Droplet 5 (Bagasi) */}
                <circle cx="440" cy="96" r="3.5" fill="url(#dropGrad)" />
                <circle cx="440" cy="96" r="6" fill="none" stroke="#DC2626" strokeWidth="0.75" opacity="0.6" />
              </g>
            )}
          </g>

          {/* ====================================================================
              ZONA 1: KACA & PANEL EKSTERIOR (Kaca Depan, Samping, Belakang & Spion)
              ==================================================================== */}
          <g
            className={`care-car-zone care-zone-glass ${stepNum === 1 ? 'care-car-zone--active' : ''}`}
            onClick={() => onSelectZone && onSelectZone('1')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectZone && onSelectZone('1');
              }
            }}
            aria-label="Pilih Zona 1: Kaca & Panel Eksterior"
          >
            {/* Kaca Depan (Windshield) */}
            <polygon
              points="148,86 198,42 248,42 248,86"
              className="care-zone-fill"
            />
            {/* Kaca Samping Depan */}
            <polygon
              points="174,58 244,58 244,86 148,86"
              className="care-zone-fill"
            />
            {/* Kaca Samping Belakang & Quarter Glass */}
            <polygon
              points="256,58 332,58 376,86 256,86"
              className="care-zone-fill"
            />
            {/* Kaca Belakang */}
            <polygon
              points="340,42 396,86 376,86 332,58"
              className="care-zone-fill"
            />
            {/* Spion Kiri Luar */}
            <path
              d="M 166 82 C 158 82 154 76 158 72 C 164 72 170 78 172 82 Z"
              className="care-zone-fill"
            />
            {/* Headlamp Mika Depan */}
            <polygon
              points="34,114 62,112 66,122 32,122"
              className="care-zone-fill"
            />
            {/* Taillight Belakang */}
            <polygon
              points="466,108 488,110 486,122 466,120"
              className="care-zone-fill"
            />
          </g>

          {/* ====================================================================
              ZONA 4: KABIN INTERIOR (Potongan Dasbor, Konsol & Jok)
              ==================================================================== */}
          <g
            className={`care-car-zone care-zone-interior ${stepNum === 4 ? 'care-car-zone--active' : ''}`}
            onClick={() => onSelectZone && onSelectZone('4')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectZone && onSelectZone('4');
              }
            }}
            aria-label="Pilih Zona 4: Kabin Interior"
          >
            {/* Dasbor Miring */}
            <polygon
              points="152,86 182,74 206,86"
              className="care-zone-fill"
            />
            {/* Lingkar Setir */}
            <ellipse
              cx="194"
              cy="72"
              rx="4"
              ry="9"
              transform="rotate(-15 194 72)"
              className="care-zone-fill"
            />
            {/* Jok Depan & Headrest */}
            <path
              d="M 224 52 L 240 52 L 244 86 L 220 86 Z"
              className="care-zone-fill"
            />
            <rect x="228" y="44" width="8" height="6" rx="2" className="care-zone-fill" />
            {/* Konsol Tengah */}
            <rect x="246" y="78" width="16" height="8" rx="2" className="care-zone-fill" />
            {/* Jok Belakang & Headrest */}
            <path
              d="M 314 54 L 332 54 L 334 86 L 310 86 Z"
              className="care-zone-fill"
            />
            <rect x="318" y="46" width="8" height="6" rx="2" className="care-zone-fill" />
          </g>

          {/* ====================================================================
              ZONA 2: TRIM PLASTIK BAWAH, FENDER & DINDING BAN
              ==================================================================== */}
          <g
            className={`care-car-zone care-zone-trim-tire ${stepNum === 2 ? 'care-car-zone--active' : ''}`}
            onClick={() => onSelectZone && onSelectZone('2')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectZone && onSelectZone('2');
              }
            }}
            aria-label="Pilih Zona 2: Trim Plastik, Karet & Dinding Ban"
          >
            {/* Trim Bawah / Rocker Skirt Samping */}
            <rect x="146" y="144" width="224" height="6" rx="1" className="care-zone-fill" />
            {/* Front Lip / Splitter Bawah */}
            <polygon points="32,138 74,144 74,149 30,144" className="care-zone-fill" />
            {/* Rear Diffuser / Mudguard Bawah */}
            <polygon points="444,144 484,140 484,145 444,149" className="care-zone-fill" />
            {/* Spatbor Roda Depan (Wheel Arch Lip) */}
            <path d="M 72 144 A 40 40 0 0 1 152 144 L 146 144 A 34 34 0 0 0 78 144 Z" className="care-zone-fill" />
            {/* Spatbor Roda Belakang (Wheel Arch Lip) */}
            <path d="M 368 144 A 40 40 0 0 1 448 144 L 442 144 A 34 34 0 0 0 374 144 Z" className="care-zone-fill" />

            {/* Roda Depan: Dinding Ban (Sidewall Tire) */}
            <circle cx="112" cy="142" r="32" className="care-zone-fill care-tire-outer" />
            <circle cx="112" cy="142" r="22" className="care-tire-inner" />

            {/* Roda Belakang: Dinding Ban (Sidewall Tire) */}
            <circle cx="408" cy="142" r="32" className="care-zone-fill care-tire-outer" />
            <circle cx="408" cy="142" r="22" className="care-tire-inner" />
          </g>

          {/* ====================================================================
              STRUKTUR GARIS BLUEPRINT MOBIL (Wireframe Chassis & Shutlines)
              ==================================================================== */}
          <g className="care-car-wireframe" pointerEvents="none">
            {/* Garis Profil Atas & Bodi Utama */}
            <path
              d="M 30 144 L 30 132 C 30 120 38 112 50 110 L 144 88 C 158 86 172 78 186 60 L 214 36 C 220 30 228 26 236 26 L 336 26 C 346 26 354 30 360 36 L 402 78 C 408 84 416 88 424 88 L 470 94 C 482 96 490 104 490 116 L 488 134 C 486 142 478 146 468 146 L 448 146"
              fill="none"
              strokeWidth="1.75"
              className="care-car-outline"
            />

            {/* Garis Antar Pintu (Shutlines) & B-Pillar */}
            <line x1="254" y1="36" x2="254" y2="144" strokeWidth="1.5" className="care-car-shutline" />
            <line x1="368" y1="44" x2="368" y2="144" strokeWidth="1.5" className="care-car-shutline" />
            <line x1="144" y1="88" x2="144" y2="144" strokeWidth="1.5" className="care-car-shutline" />

            {/* Handle Pintu Minimalis */}
            <rect x="230" y="96" width="14" height="2.5" rx="1" className="care-car-detail" />
            <rect x="344" y="96" width="14" height="2.5" rx="1" className="care-car-detail" />

            {/* Velg Roda Depan (Alloy Spoke Pattern) */}
            <circle cx="112" cy="142" r="21" fill="none" strokeWidth="1.25" className="care-rim-line" />
            <circle cx="112" cy="142" r="5" fill="currentColor" className="care-rim-center" />
            <line x1="112" y1="121" x2="112" y2="163" strokeWidth="1" className="care-rim-line" />
            <line x1="91" y1="142" x2="133" y2="142" strokeWidth="1" className="care-rim-line" />
            <line x1="97" y1="127" x2="127" y2="157" strokeWidth="1" className="care-rim-line" />
            <line x1="97" y1="157" x2="127" y2="127" strokeWidth="1" className="care-rim-line" />

            {/* Velg Roda Belakang (Alloy Spoke Pattern) */}
            <circle cx="408" cy="142" r="21" fill="none" strokeWidth="1.25" className="care-rim-line" />
            <circle cx="408" cy="142" r="5" fill="currentColor" className="care-rim-center" />
            <line x1="408" y1="121" x2="408" y2="163" strokeWidth="1" className="care-rim-line" />
            <line x1="387" y1="142" x2="429" y2="142" strokeWidth="1" className="care-rim-line" />
            <line x1="393" y1="127" x2="423" y2="157" strokeWidth="1" className="care-rim-line" />
            <line x1="393" y1="157" x2="423" y2="127" strokeWidth="1" className="care-rim-line" />
          </g>
        </svg>
      </div>

      {/* Micro Legend & Interactive Hotspot Selector */}
      <div className="care-schematic-legend" role="group" aria-label="Pilih zona kendaraan">
        {zones.map((z) => {
          const isSelected = activeStep === z.step;
          return (
            <button
              key={z.step}
              type="button"
              className={`care-legend-pill ${isSelected ? 'care-legend-pill--active' : ''}`}
              onClick={() => onSelectZone && onSelectZone(z.step)}
              aria-pressed={isSelected}
            >
              <span className="care-legend-pill__num">{z.step}</span>
              <span className="care-legend-pill__label">{z.label}</span>
              {z.step === '3' && isSelected && (
                <Droplets size={11} strokeWidth={2.5} className="care-legend-pill__icon" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default VehicleZoneSchematic;
