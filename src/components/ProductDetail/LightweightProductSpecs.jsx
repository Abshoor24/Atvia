import { memo } from 'react';
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ShieldCheck,
  ShieldAlert,
  Wrench
} from 'lucide-react';
import './LightweightProductSpecs.css';

/**
 * LightweightProductSpecs
 * Pengganti modul berat (Kalkulator B2B, Before/After Slider, dan pH scale)
 * dengan sistem kartu spesifikasi presisi 2D yang ringan, cepat, dan ramah mobile.
 */
const LightweightProductSpecs = memo(function LightweightProductSpecs({ product }) {
  if (!product) return null;

  const specs = product.specs || {};
  const steps = product.applicationSteps || [];
  const dosAndDonts = product.dosAndDonts || { dos: [], donts: [] };
  const tools = product.toolsRecommended || [];

  return (
    <div className="light-specs-module">
      {/* ====================================================================
          1. PARAMETER TEKNIS FORMULASI ESENSIAL (4 KARTU BERSIH)
          ==================================================================== */}
      <section className="light-specs-section">
        <div className="light-specs-header">
          <span className="light-specs-eyebrow">
            <FlaskConical size={13} strokeWidth={2} />
            SPESIFIKASI LABORATORIUM
          </span>
          <h2 className="light-specs-title">Parameter Teknis Formulasi</h2>
          <p className="light-specs-sub">
            Spesifikasi kimiawi teruji untuk menjamin keamanan substrat dan hasil pengerjaan konsisten.
          </p>
        </div>

        <div className="light-specs-cards-grid">
          {/* Kartu 1: Basis Formula */}
          <div className="light-spec-card">
            <div className="light-spec-card__icon-wrap">
              <FlaskConical size={18} strokeWidth={2} />
            </div>
            <div className="light-spec-card__content">
              <span className="light-spec-card__label">KOMPOSISI FORMULA</span>
              <strong className="light-spec-card__val">
                {specs.formula || 'Formula Polimer Presisi ATVIA'}
              </strong>
            </div>
          </div>

          {/* Kartu 2: Permukaan Kompatibel */}
          <div className="light-spec-card">
            <div className="light-spec-card__icon-wrap">
              <Layers size={18} strokeWidth={2} />
            </div>
            <div className="light-spec-card__content">
              <span className="light-spec-card__label">SUBSTRAT KOMPATIBEL</span>
              <strong className="light-spec-card__val">
                {specs.compatibleSurfaces || 'Panel Kaca, Bodi & Interior Kendaraan'}
              </strong>
            </div>
          </div>

          {/* Kartu 3: Karakter Hasil Akhir */}
          <div className="light-spec-card">
            <div className="light-spec-card__icon-wrap">
              <ShieldCheck size={18} strokeWidth={2} />
            </div>
            <div className="light-spec-card__content">
              <span className="light-spec-card__label">SENTUHAN AKHIR</span>
              <strong className="light-spec-card__val">
                {specs.finish || 'Hasil Bersih, Kilap & Terproteksi'}
              </strong>
            </div>
          </div>

          {/* Kartu 4: Waktu Curing / Pengeringan & Durabilitas */}
          <div className="light-spec-card">
            <div className="light-spec-card__icon-wrap">
              <Clock size={18} strokeWidth={2} />
            </div>
            <div className="light-spec-card__content">
              <span className="light-spec-card__label">DURABILITAS & PENGERINGAN</span>
              <strong className="light-spec-card__val">
                {specs.durability ? `${specs.durability} • ` : ''}
                {specs.curingTime || 'Bilas / Buffing Instan'}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. PROTOKOL APLIKASI PRAKTIS (LANGKAH 1-2-3 RINGKAS)
          ==================================================================== */}
      {steps.length > 0 && (
        <section className="light-specs-section">
          <div className="light-specs-header">
            <span className="light-specs-eyebrow">
              <CheckCircle2 size={13} strokeWidth={2} />
              PANDUAN APLIKASI
            </span>
            <h2 className="light-specs-title">Prosedur Penggunaan Terarah</h2>
            <p className="light-specs-sub">
              Urutan aplikasi teruji di workshop detailing untuk efisiensi formula dan hasil maksimal.
            </p>
          </div>

          <div className="light-steps-list">
            {steps.map((st, idx) => (
              <div key={idx} className="light-step-item">
                <div className="light-step-item__num" aria-hidden="true">
                  {st.step || idx + 1}
                </div>
                <div className="light-step-item__body">
                  <h3 className="light-step-item__title">{st.title}</h3>
                  <p className="light-step-item__desc">{st.instruction}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====================================================================
          3. PROTOKOL KEAMANAN RINGKAS (DO'S & DON'TS)
          ==================================================================== */}
      {(dosAndDonts.dos.length > 0 || dosAndDonts.donts.length > 0) && (
        <section className="light-specs-section">
          <div className="light-specs-header">
            <span className="light-specs-eyebrow">
              <ShieldAlert size={13} strokeWidth={2} />
              STANDAR KESELAMATAN
            </span>
            <h2 className="light-specs-title">Protokol Anjuran & Pantangan</h2>
          </div>

          <div className="light-protocol-grid">
            {/* Anjuran (Do's) */}
            <div className="light-protocol-box light-protocol-box--dos">
              <div className="light-protocol-box__header">
                <CheckCircle2 size={16} strokeWidth={2.5} />
                <span>ANJURAN PENGERJAAN</span>
              </div>
              <ul className="light-protocol-box__list">
                {dosAndDonts.dos.map((item, idx) => (
                  <li key={idx}>
                    <span className="light-bullet-dos" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pantangan (Don'ts) */}
            <div className="light-protocol-box light-protocol-box--donts">
              <div className="light-protocol-box__header">
                <AlertTriangle size={16} strokeWidth={2.5} />
                <span>PANTANGAN APLIKASI</span>
              </div>
              <ul className="light-protocol-box__list">
                {dosAndDonts.donts.map((item, idx) => (
                  <li key={idx}>
                    <span className="light-bullet-donts" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          4. ALAT PENDUKUNG YANG DISARANKAN
          ==================================================================== */}
      {tools.length > 0 && (
        <div className="light-tools-box">
          <div className="light-tools-box__label">
            <Wrench size={14} strokeWidth={2} />
            <span>ALAT PENDUKUNG YANG DISARANKAN:</span>
          </div>
          <div className="light-tools-box__list">
            {tools.map((tool, idx) => (
              <span key={idx} className="light-tool-pill">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default LightweightProductSpecs;
