# CV ATVIA JAYA — Platform Digital & Konfigurator 3D

Platform digital resmi untuk **CV ATVIA JAYA**, manufaktur formula perawatan kendaraan (*automotive detailing*) dan kebersihan ruang presisi yang berlokasi di Purbayan, Kec. Baki, Kabupaten Sukoharjo, Jawa Tengah.

---

## 🚀 Fitur Unggulan Sistem

1. **Eksplorasi Mobil 3D WebGL (Three.js):**
   - Interaksi rotasi 360°, zoom, dan pan model kendaraan sport (`ferrari.glb`).
   - Penandaan *hotspot* panel kendaraan (Kaca, Cat Bodi, Velg/Ban, Trim Plastik) dengan filter formula yang relevan.
2. **Urutan Perawatan Terarah (4-Stage Pipeline Stepper):**
   - Panduan alur detailing bertahap: Dekontaminasi Kaca & Bodi -> Restorasi Trim & Ban -> Proteksi Kilap Cat SiO2 -> Perawatan Kabin Interior.
   - Skematik 2D *Vehicle Zone Blueprint* dengan sorotan lampu merah aktif (`#DC2626`).
3. **Katalog Laboratorium & Spesifikasi Kimiawi:**
   - Parameter terukur: pH, waktu curing, rasio pengenceran, yield aplikasi per unit mobil.
   - SOP pengerjaan 4 langkah dan protokol K3/keselamatan kimiawi.
4. **Asisten AI Laboratorium (Product Chatbot):**
   - *Heuristic Knowledge Engine* mandiri tanpa dependensi API eksternal yang lambat.
   - Isolasi scroll internal (*halaman browser tidak melompat saat menekan Enter*).
   - Tombol aksi otomatis ke Google Maps, WhatsApp hotline, dan email `atviajayaofficial@gmail.com`.
5. **Peta Fasilitas Interaktif Google Maps:**
   - Embed resmi Google Maps Sukoharjo dengan saklar Peta Jalan (*Roadmap*) dan Satelit (*Hybrid*).
   - Petunjuk rute navigasi instan ke bengkel.
6. **Portal Keamanan & Admin Dashboard CRUD:**
   - Proteksi *brute-force lockout* (maksimal 5x percobaan gagal, kunci akun 300 detik dengan *countdown timer*).
   - Pengelolaan katalog: Tambah formula, upload foto (Base64) atau 5 preset botol ATVIA, saklar *Published* vs *Draf*.
   - Modal konfirmasi khusus penghapusan produk published (verifikasi visual foto & nama produk).
   - Log audit keamanan persisten di `localStorage`.

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

* **Frontend Library:** React 18
* **Build Tool & Bundler:** Vite 5
* **3D Engine:** Three.js, `@react-three/fiber`, `@react-three/drei`, Google Draco Decoder
* **Icons:** Lucide React (Stroke width 1.75px–2px)
* **Desain Sistem:** CSS Variables, Swiss-Grid Architecture, Zero-Emoji Technical UI
* **Routing:** React Router v6

---

## 📂 Struktur Direktori Proyek

```
frontend-atvia/
├── docs/                      # Dokumentasi lengkap, naskah presentasi & diagram UML
│   ├── buku_panduan_sistem_atvia_jaya.md
│   ├── naskah_demonstrasi_kode_atvia.md
│   ├── diagrams_usecase_activity_atvia.md
│   ├── poster_showcase_standing_banner.md
│   └── *.png                  # Diagram Use Case, 4 Activity Diagram & Screenshot Halaman
├── public/
│   ├── images/                # Foto kemasan botol studio & cutout
│   └── models/                # Model 3D ferrari.glb
├── src/
│   ├── components/            # Komponen UI modular (Navbar, Footer, 3D Canvas, Peta, Form)
│   ├── config/                # Konfigurasi kontak & WhatsApp URL builder
│   ├── data/                  # Seed data awal produk
│   ├── pages/                 # Home, ProductDetail, AdminLogin, AdminDashboard
│   ├── sections/              # Seksi beranda (Hero, 3D Explorer, Stepper, Chatbot, Maps, About)
│   └── services/              # AuthService (brute-force), ProductService (CRUD), ContactService
├── .env.example               # Contoh variabel lingkungan
└── package.json
```

---

## ⚡ Panduan Instalasi & Menjalankan Proyek

1. **Clone repositori:**
   ```bash
   git clone https://github.com/Abshoor24/Atvia.git
   cd Atvia
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi variabel lingkungan:**
   Salin `.env.example` menjadi `.env` jika diperlukan:
   ```env
   VITE_WHATSAPP_NUMBER=6285700470046
   VITE_EMAIL=atviajayaofficial@gmail.com
   VITE_LOCATION=Purbayan, Baki, Sukoharjo, Jawa Tengah
   ```

4. **Jalankan server pengembangan (Local Dev):**
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:5173/`.

5. **Kompilasi produksi (Build):**
   ```bash
   npm run build
   ```

---

## 📞 Kontak Resmi CV ATVIA JAYA

* **Email:** [atviajayaofficial@gmail.com](mailto:atviajayaofficial@gmail.com)
* **WhatsApp Hotline:** [+62 857-0047-0046](https://wa.me/6285700470046)
* **Alamat Workshop:** Purbayan, Kec. Baki, Kabupaten Sukoharjo, Jawa Tengah 57556
* **Jam Operasional:** Senin – Sabtu, 08.00 – 17.00 WIB

---
*© 2026 CV ATVIA JAYA. Seluruh Hak Cipta Dilindungi.*
