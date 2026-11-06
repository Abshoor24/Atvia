import './About.css';

export default function About() {
  return (
    <section id="tentang" className="section about-section">
      <div className="container about-grid">
        {/* Left Column: Narrative & Pillars */}
        <div className="about-content">
          <div>
            <h2>Standar Konsisten untuk Hasil Maksimal</h2>
          </div>

          <p className="about-narrative">
            ATVIA lahir dari pemahaman bahwa menjaga kebersihan kendaraan dan ruang bukan sekadar membersihkan debu di permukaan, melainkan memberikan perawatan yang melindungi material dasar dalam jangka panjang. Setiap produk dirancang dengan komposisi terukur agar memberikan hasil kilap dan bersih yang rapi tanpa langkah aplikasi yang rumit.
          </p>

          <div className="about-pillars">
            <div className="about-pillar">
              <h3 className="about-pillar__title">Fokus Perawatan Kendaraan</h3>
              <p className="about-pillar__desc">
                Solusi menyeluruh dari tahap cuci eksterior, poles koreksi cat, semir ban, hingga kenyamanan interior kabin.
              </p>
            </div>

            <div className="about-pillar">
              <h3 className="about-pillar__title">Pendekatan Formula Tepat Guna</h3>
              <p className="about-pillar__desc">
                Mengutamakan keamanan material cat dan bahan interior melalui formula seimbang yang bekerja efektif tanpa mengikis berlebih.
              </p>
            </div>

            <div className="about-pillar">
              <h3 className="about-pillar__title">Layanan Produk & Kemitraan</h3>
              <p className="about-pillar__desc">
                Membuka konsultasi teknis pemakaian serta peluang distribusi dan kemitraan pasokan bagi workshop detailing dan bengkel.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Studio Showcase Frame */}
        <div className="about-visual" aria-label="Standar Laboratorium ATVIA">
          <div className="about-assurance-card">
            <div className="about-assurance-header">
              <span className="about-assurance-badge">
                <span className="about-assurance-dot" aria-hidden="true" />
                Standar Formulasi Laboratorium
              </span>
              <h3 className="about-assurance-title">Jaminan Mutu Presisi</h3>
            </div>

            <div className="about-assurance-metrics">
              <div className="about-assurance-metric">
                <div className="about-assurance-metric__num">45°C</div>
                <div className="about-assurance-metric__text">
                  <strong>Stabilitas Termal Tropis</strong>
                  <span>Formula tetap stabil dan tidak memisah dalam paparan suhu panas ruang & bagasi.</span>
                </div>
              </div>

              <div className="about-assurance-metric">
                <div className="about-assurance-metric__num">0%</div>
                <div className="about-assurance-metric__text">
                  <strong>Bahan Pengisi Abrasif</strong>
                  <span>Bebas bubuk kapur keras yang dapat menimbulkan baret halus (swirl marks).</span>
                </div>
              </div>

              <div className="about-assurance-metric">
                <div className="about-assurance-metric__num">pH</div>
                <div className="about-assurance-metric__text">
                  <strong>Terkalibrasi Sesuai Substrat</strong>
                  <span>Keasaman dan kebasaan terukur presisi untuk melindungi lapisan pernis (clear coat).</span>
                </div>
              </div>
            </div>

            <div className="about-assurance-footer">
              <span className="about-assurance-badge-tag">Teruji untuk Standar Workshop & Penggunaan Harian</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
