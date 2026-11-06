# Dokumentasi UML: Website Company Profile & Konfigurator CV ATVIA JAYA

Dokumentasi ini dirancang dengan standar formal Unified Modeling Language (UML) untuk laporan teknis, skripsi, atau tugas akhir sistem informasi dan rekayasa perangkat lunak pada proyek **CV ATVIA JAYA**. Semua diagram telah dirender dalam format gambar resolusi tinggi (300 DPI) dan siap disalin langsung ke Google Docs atau Microsoft Word.

---

## 1. Definisi & Identifikasi Aktor

| No | Aktor | Tipe | Deskripsi Peran dalam Proyek ATVIA |
|:---|:---|:---|:---|
| 1 | **Pengunjung / Pelanggan** | *Human Actor* | Pengguna publik yang mengakses website untuk melihat profil perusahaan, mengeksplorasi model 3D mobil, mempelajari metodologi urutan perawatan terarah 4 tahap, memeriksa spesifikasi kimia produk, mencari rute workshop di Sukoharjo via Google Maps, berkonsultasi dengan asisten AI, dan melakukan reservasi/order via WhatsApp. |
| 2 | **Layanan AI (Asisten Laboratorium)** | *System / AI Actor* | Mesin penjawab interaktif berbasis *Knowledge Engine* internal ATVIA (`ProductChatbot.jsx`) yang memproses query teknis detailing kendaraan, jam operasional workshop, rute lokasi Sukoharjo, kemitraan B2B, dan menyajikan rekomendasi formula secara otomatis tanpa jeda. |
| 3 | **WhatsApp Gateway / Bot WA** | *External System* | Sistem komunikasi eksternal WhatsApp yang menerima pesan berformat khusus (*pre-filled intent*) dari tombol website, memberikan salam pembuka otomatis, dan meneruskan percakapan ke tim teknisi/admin manusia. |
| 4 | **Admin (Administrator ATVIA)** | *Human Actor* | Pengelola resmi CV ATVIA JAYA yang memiliki hak akses aman (`/admin/dashboard`) untuk mempublikasikan produk, mengunggah foto produk, mengubah status publikasi (*published* vs *draf*), menghapus produk dari live website melalui modal konfirmasi, memantau riwayat audit log, dan mengelola kredensial passcode. |

---

## 2. Use Case Diagram Sistem

Berikut adalah visualisasi **Gambar 2.1 Use Case Diagram** yang memetakan seluruh kapabilitas sistem untuk Pengunjung, Layanan AI, dan Administrator:

![Gambar 2.1 Use Case Diagram Website Company Profile CV ATVIA JAYA](/C:/Users/acer/.gemini/antigravity/brain/872e26f3-2561-4241-957f-a39f8325063c/use_case_diagram_atvia.png)

*Gambar 2.1 Use Case Diagram Website Company Profile CV ATVIA JAYA (Resolusi Tinggi 300 DPI)*

### Tabel Pemetaan Use Case & Relasi `<<include>>`
| Kode | Nama Use Case | Aktor yang Terlibat | Deskripsi & Relasi |
|:---|:---|:---|:---|
| **UC-01** | Melihat profil & nilai manufaktur ATVIA | Pengunjung | Menampilkan sejarah pabrik, standar ISO/laboratorium, dan nilai inti brand. |
| **UC-02** | Eksplorasi interaktif mobil 3D & hotspot | Pengunjung | Interaksi 360° Three.js WebGL dan penandaan zona cat, kaca, velg, kabin. |
| **UC-03** | Mempelajari urutan perawatan 4 tahap & skematik 2D | Pengunjung | Stepper interaktif 4 tahap dengan highlight SVG blueprint bodi mobil. |
| **UC-04** | Melihat detail spesifikasi kimia & formula produk | Pengunjung | Meninjau parameter pH, rasio yield, durasi curing, dan keunggulan formula. |
| **UC-05** | Navigasi peta lokasi workshop & petunjuk rute | Pengunjung | Integrasi peta resmi Google Maps untuk rute ke workshop Purbayan, Baki, Sukoharjo. |
| **UC-06** | Bertanya ke asisten AI (Chatbot Laboratorium) | Pengunjung, Layanan AI | Konsultasi masalah jamur kaca, baret halus, interior, jam buka, rute peta, dll. |
| **UC-07** | Menghubungi / order via WhatsApp direct | Pengunjung | Melakukan pemesanan produk atau konsultasi personal dengan template pesan otomatis. |
| **UC-08** | Menerima balasan awal bot WhatsApp & konsultasi CS | Pengunjung, Bot WA, Admin | Penanganan inquiry otomatis oleh bot dilanjutkan serah terima ke admin/teknisi. |
| **UC-09** | Login admin (proteksi brute-force 5x) | Admin | Autentikasi passcode dengan proteksi penguncian akun 300 detik jika 5x gagal. |
| **UC-10** | Kelola data produk (CRUD & upload foto/preset) | Admin | Tambah/edit produk, upload base64 atau 5 preset botol ATVIA. *(Include UC-09)* |
| **UC-11** | Kelola status publikasi (Published / Draf) | Admin | Mengontrol visibilitas produk di katalog website publik. *(Include UC-09)* |
| **UC-12** | Hapus produk published via modal konfirmasi | Admin | Pencabutan produk secara aman dari live website dengan verifikasi modal. *(Include UC-09)* |
| **UC-13** | Memantau log audit keamanan sistem & ganti passcode | Admin | Audit trail aktivitas login, penambahan, dan penghapusan produk. *(Include UC-09)* |

---

## 3. Activity Diagram 1: Alur Konsultasi Pelanggan (Chatbot AI vs WhatsApp Bot & Admin)

Diagram ini menggambarkan alur kerja saat pengunjung mencari informasi atau konsultasi teknis melalui 4 swimlane: **Chatbot AI (Laboratorium)**, **Pengunjung / Pelanggan**, **Bot WhatsApp Gateway**, dan **Admin CS / Teknisi ATVIA**.

![Gambar 2.2 Activity Diagram Konsultasi Alur Pengunjung](/C:/Users/acer/.gemini/antigravity/brain/872e26f3-2561-4241-957f-a39f8325063c/activity_diagram_konsultasi_atvia.png)

*Gambar 2.2 Activity Diagram Konsultasi Alur Pengunjung (Swimlane 4 Kolom - Resolusi Tinggi 300 DPI)*

### Rincian Alur Aktivitas Konsultasi:
1. **Titik Awal (Pengunjung):** Pengunjung membuka website ATVIA dan melihat seksi asisten konsultasi produk (`ProductChatbot.jsx`).
2. **Titik Keputusan (Jenis Pertanyaan):**
   - **Jalur A (Pertanyaan Teknis / Jam Operasional / Rute Maps di Website):**
     - Pengunjung mengetik pertanyaan atau memilih chip rekomendasi topik.
     - Asisten AI menerima query, mengisolasi scroll internal (layar browser tidak melompat).
     - *Knowledge Engine* mencocokkan kata kunci formula kimia, SOP pengerjaan, jam operasional (08.00–17.00 WIB), atau rute workshop Sukoharjo.
     - Asisten AI menampilkan balasan laboratorium, kartu produk terkait, pro-tip, dan tombol aksi peta / WhatsApp.
   - **Jalur B (Booking Detailing / Order Grosir B2B / CS Langsung):**
     - Pengunjung mengklik tombol WhatsApp CTA.
     - Sistem membuat URL WhatsApp dengan pesan template *pre-filled*.
     - Bot WhatsApp menyapa dengan template pesan otomatis.
     - Sesi dialihkan (*handover*) ke Admin CS / Teknisi ATVIA manusia untuk konsultasi mendalam dan pembuatan invoice/jadwal.
3. **Titik Akhir:** Pengunjung menerima solusi tuntas, arahan rute workshop, atau konfirmasi pesanan formula.

---

## 4. Activity Diagram 2: Customer Journey (Eksplorasi Mobil 3D & Urutan Perawatan Terarah)

Diagram ini menggambarkan perjalanan pengunjung dalam mengeksplorasi fitur visual interaktif website: kanvas mobil 3D Three.js dan metodologi urutan perawatan terarah 4 tahap dengan highlight skematik 2D.

![Gambar 2.3 Activity Diagram Customer Journey](/C:/Users/acer/.gemini/antigravity/brain/872e26f3-2561-4241-957f-a39f8325063c/activity_diagram_customer_journey_atvia.png)

*Gambar 2.3 Activity Diagram Customer Journey (Eksplorasi Mobil 3D & Urutan Perawatan - Resolusi Tinggi 300 DPI)*

### Rincian Alur Customer Journey:
1. **Pengunjung:** Mengakses beranda website ATVIA dan meninjau profil manufaktur.
2. **Titik Keputusan (Pilih Modul Eksplorasi):**
   - **Cabang 1 (Eksplorasi Mobil 3D):**
     - Kanvas WebGL Three.js memuat model 3D kendaraan (`ferrari.glb`) dan kontrol orbit.
     - Pengunjung memutar mobil 360°, melakukan zoom, dan mengklik *hotspot* panel (Kaca Depan, Bodi Cat, Trim Plastik, Roda/Ban, Kabin Interior).
     - Kamera sistem secara mulus bergerak fokus ke zona terpilih dan memfilter kartu produk yang kompatibel.
   - **Cabang 2 (Urutan Perawatan Terarah 4 Tahap):**
     - Pengunjung mengklik tombol nomor stepper `[1]`, `[2]`, `[3]`, atau `[4]`.
     - Sistem memperbarui garis progres merah (`#DC2626`) dan secara otomatis menyalakan highlight zona aplikasi pada skematik vektor 2D blueprint mobil.
3. **Spesifikasi & Konversi:** Pengunjung membuka popover ringkasan atau detail produk (parameter pH, daya tahan, yield) dan mengklik tombol pemesanan WhatsApp.

---

## 5. Activity Diagram 3: Autentikasi Keamanan Administrator & Proteksi Brute-Force

Diagram ini menggambarkan alur verifikasi login pengelola sistem dengan protokol keamanan tinggi: pembatasan percobaan gagal 5x, kunci lockout 300 detik, dan masa aktif token sesi terenkripsi 2 jam.

![Gambar 2.4 Activity Diagram Autentikasi Keamanan Administrator](/C:/Users/acer/.gemini/antigravity/brain/872e26f3-2561-4241-957f-a39f8325063c/activity_diagram_admin_login_atvia.png)

*Gambar 2.4 Activity Diagram Autentikasi Keamanan Administrator & Proteksi Brute-Force (Resolusi Tinggi 300 DPI)*

### Rincian Alur Autentikasi Keamanan:
1. **Akses Awal:** Administrator mengakses URL aman `/admin/login`.
2. **Cek Sesi:** Sistem memeriksa apakah terdapat token sesi aktif yang belum kedaluwarsa (< 2 jam). Jika valid, langsung dialihkan ke dashboard.
3. **Cek Status Lockout:** Sistem memeriksa status *brute-force vault*.
   - Jika sedang dalam masa penalti, formulir dinonaktifkan dan countdown timer (menit:detik) ditampilkan.
   - Jika normal, form login siap menerima passcode.
4. **Verifikasi Kredensial:** Administrator memasukkan passcode keamanan.
   - **Passcode Salah:** Counter gagal bertambah (+1). Jika mencapai 5x, sistem langsung mengaktifkan kunci akun selama 300 detik dan mencatat insiden ke Log Audit Keamanan.
   - **Passcode Benar:** Counter gagal di-reset ke 0, token sesi baru digenerate, log aktivitas `LOGIN_BERHASIL` dicatat, dan administrator dialihkan ke `/admin/dashboard`.

---

## 6. Activity Diagram 4: Pengelolaan & Penghapusan Produk Published oleh Admin

Diagram ini menggambarkan aktivitas operasional administrator dalam mengelola katalog produk, mengunggah foto produk / preset botol ATVIA, serta mekanisme penghapusan produk published secara aman dengan modal konfirmasi ganda.

![Gambar 2.5 Activity Diagram Pengelolaan & Penghapusan Produk oleh Admin](/C:/Users/acer/.gemini/antigravity/brain/872e26f3-2561-4241-957f-a39f8325063c/activity_diagram_admin_crud_atvia.png)

*Gambar 2.5 Activity Diagram Pengelolaan & Penghapusan Produk oleh Admin (Resolusi Tinggi 300 DPI)*

### Rincian Alur Pengelolaan & Hapus Produk:
1. **Administrator:** Membuka dashboard dan meninjau ringkasan statistik inventaris (Total Formula, Published Live, Draf).
2. **Titik Keputusan (Pilih Aksi Pengelolaan):**
   - **Cabang Tambah Produk:**
     - Admin membuka tab formulir tambah produk.
     - Admin mengisi parameter nama, kategori kimia, volume (ml), spesifikasi pengerjaan, mengunggah foto asli (Base64) atau memilih salah satu dari 5 preset botol resmi ATVIA.
     - Admin memilih status publikasi (*Published* atau *Draf*) dan mengklik tombol simpan.
     - *Product Service* membuat slug unik, menyimpan data ke penyimpanan persisten (`localStorage`), mencatat log audit `TAMBAH_PRODUK`, dan menyinkronkan event katalog.
   - **Cabang Hapus Produk Published:**
     - Admin mencari produk di tabel katalog dan menekan tombol hapus (ikon tempat sampah merah).
     - Sistem memunculkan **Modal Konfirmasi Hapus Produk** yang menampilkan thumbnail foto, nama formula, volume, dan penanda status `PUBLISHED (LIVE)`.
     - Jika Admin membatalkan, modal ditutup tanpa ada perubahan data.
     - Jika Admin mengonfirmasi (`Ya, Hapus Produk dari Live`), sistem menghapus produk, mencatat aksi `HAPUS_PRODUK` ke log audit, memperbarui tabel katalog secara real-time, dan menampilkan banner konfirmasi sukses.
3. **Titik Akhir:** Perubahan data langsung terintegrasi secara instan pada beranda publik dan modul asisten AI website.

---

## 7. Lokasi File Gambar untuk Penyusunan Laporan

Semua file gambar telah disimpan dalam direktori kerja Anda dengan spesifikasi standar publikasi (resolusi tajam, font vector anti-aliased, 300 DPI):

1. **Use Case Diagram:** `C:\Users\acer\.gemini\antigravity\brain\872e26f3-2561-4241-957f-a39f8325063c\use_case_diagram_atvia.png`
2. **Activity Diagram Konsultasi:** `C:\Users\acer\.gemini\antigravity\brain\872e26f3-2561-4241-957f-a39f8325063c\activity_diagram_konsultasi_atvia.png`
3. **Activity Diagram Customer Journey (3D & Stepper):** `C:\Users\acer\.gemini\antigravity\brain\872e26f3-2561-4241-957f-a39f8325063c\activity_diagram_customer_journey_atvia.png`
4. **Activity Diagram Admin Login & Brute Force:** `C:\Users\acer\.gemini\antigravity\brain\872e26f3-2561-4241-957f-a39f8325063c\activity_diagram_admin_login_atvia.png`
5. **Activity Diagram Admin CRUD & Hapus Produk:** `C:\Users\acer\.gemini\antigravity\brain\872e26f3-2561-4241-957f-a39f8325063c\activity_diagram_admin_crud_atvia.png`
