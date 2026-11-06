import { useState } from 'react';
import { Check, X, Info } from 'lucide-react';
import './SafetyProtocols.css';

const RECOMMENDED_TOOLS = [
  {
    id: 'tool-microfiber',
    name: 'Kain Microfiber Khusus Interior (Short-pile 300 GSM)',
    tip: 'Serat pendek (short-pile) mengangkat partikel debu halus tanpa meninggalkan serat rontok pada celah tombol dan jahitan jok kulit sintetis.'
  },
  {
    id: 'tool-brush',
    name: 'Kuas Detailing Interior Bulu Lembut (Boar Hair)',
    tip: 'Bulu alami yang lembut menjangkau celah sempit kisi AC, emblem dasbor, dan sela konsol transmisi tanpa menggores kaca speedometer.'
  },
  {
    id: 'tool-sponge',
    name: 'Spons Aplikator Busa Lembut',
    tip: 'Membantu distribusi cairan Interior Guard secara merata dan hemat pada panel doortrim serta bidang jok bertekstur kulit jeruk.'
  }
];

export default function SafetyProtocols() {
  const [selectedToolId, setSelectedToolId] = useState('tool-microfiber');

  const activeTool = RECOMMENDED_TOOLS.find((t) => t.id === selectedToolId) || RECOMMENDED_TOOLS[0];

  return (
    <div className="safety-protocols-module">
      <div className="safety-protocols__header">
        <span className="safety-protocols__eyebrow">PROTOKOL KEAMANAN</span>
        <h3 className="safety-protocols__title">Anjuran & Pantangan Detailing</h3>
        <p className="safety-protocols__sub">
          Prosedur standar operasional laboratorium ATVIA demi keselamatan berkendara dan perlindungan jangka panjang material kabin.
        </p>
      </div>

      {/* 2-Column Comparison Layout */}
      <div className="safety-protocols__grid">
        {/* Kolom Kiri: Anjuran (Do's) */}
        <div className="safety-col safety-col--dos">
          <div className="safety-col__header">
            <span className="safety-col__icon-circle safety-col__icon-circle--dos" aria-hidden="true">
              <Check size={16} strokeWidth={2.5} />
            </span>
            <h4 className="safety-col__title safety-col__title--dos">Anjuran (Do&apos;s)</h4>
          </div>
          <ul className="safety-col__list">
            <li className="safety-col__item">
              <span className="safety-bullet safety-bullet--dos" aria-hidden="true">
                <Check size={13} strokeWidth={2.5} />
              </span>
              <p className="safety-col__text">
                Semprotkan cairan ke lap terlebih dahulu untuk mencegah semprotan embun mengenai kaca depan bagian dalam.
              </p>
            </li>
            <li className="safety-col__item">
              <span className="safety-bullet safety-bullet--dos" aria-hidden="true">
                <Check size={13} strokeWidth={2.5} />
              </span>
              <p className="safety-col__text">
                Aplikasikan secara teratur setiap 2 minggu untuk menjaga kelenturan dasbor dari radiasi panas kaca.
              </p>
            </li>
            <li className="safety-col__item">
              <span className="safety-bullet safety-bullet--dos" aria-hidden="true">
                <Check size={13} strokeWidth={2.5} />
              </span>
              <p className="safety-col__text">
                Sangat aman untuk permukaan plastik bertekstur, kisi-kisi AC, dan panel konsol interior.
              </p>
            </li>
          </ul>
        </div>

        {/* Kolom Kanan: Pantangan (Don'ts) */}
        <div className="safety-col safety-col--donts">
          <div className="safety-col__header">
            <span className="safety-col__icon-circle safety-col__icon-circle--donts" aria-hidden="true">
              <X size={16} strokeWidth={2.5} />
            </span>
            <h4 className="safety-col__title safety-col__title--donts">Pantangan (Don&apos;ts)</h4>
          </div>
          <ul className="safety-col__list">
            <li className="safety-col__item">
              <span className="safety-bullet safety-bullet--donts" aria-hidden="true">
                <X size={13} strokeWidth={2.5} />
              </span>
              <p className="safety-col__text">
                JANGAN disemprotkan ke pedal gas, pedal rem, kopling, atau lingkar kemudi bagian genggaman.
              </p>
            </li>
            <li className="safety-col__item">
              <span className="safety-bullet safety-bullet--donts" aria-hidden="true">
                <X size={13} strokeWidth={2.5} />
              </span>
              <p className="safety-col__text">
                JANGAN gunakan pada bahan suede / alcantara asli (gunakan cairan pembersih suede khusus).
              </p>
            </li>
            <li className="safety-col__item">
              <span className="safety-bullet safety-bullet--donts" aria-hidden="true">
                <X size={13} strokeWidth={2.5} />
              </span>
              <p className="safety-col__text">
                JANGAN gunakan kain yang sudah kotor atau mengandung bekas sabun keras.
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Kartu Bawah: Peralatan Detailing yang Disarankan */}
      <div className="safety-tools-card">
        <div className="safety-tools-card__top">
          <span className="safety-tools-card__label">Peralatan Detailing yang Disarankan:</span>
          <div className="safety-tools-card__pills">
            {RECOMMENDED_TOOLS.map((tool) => {
              const isSelected = selectedToolId === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  className={`safety-tool-pill ${isSelected ? 'safety-tool-pill--active' : ''}`}
                  onClick={() => setSelectedToolId(tool.id)}
                >
                  <span>{tool.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Tool Tip Callout */}
        {activeTool && (
          <div className="safety-tool-tip animate-fade-in">
            <span className="safety-tool-tip__icon" aria-hidden="true">
              <Info size={15} strokeWidth={2} />
            </span>
            <div className="safety-tool-tip__body">
              <strong>Tips Aplikasi Laboratorium:</strong>
              <span>{activeTool.tip}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
