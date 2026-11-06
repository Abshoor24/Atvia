# NASKAH LENGKAP DEMONSTRASI & PENJELASAN KODE PROGRAM (FILE-BY-FILE)
## Proyek: Website Company Profile & Konfigurator 3D CV ATVIA JAYA
**Panduan Berbicara & Presentasi Teknis di Hadapan Dosen Penguji, Pembimbing, atau Klien**

---

## Petunjuk Penggunaan Naskah:
* Teks yang berada di dalam tanda kutip tebal (**"..."**) adalah **kalimat langsung yang Anda ucapkan** saat presentasi sambil menampilkan layar editor (VS Code) atau browser.
* Teks bertanda *[Aksi]* adalah **panduan tindakan yang Anda lakukan** (misal: klik file, scroll ke fungsi tertentu, atau perlihatkan demonstrasi di browser).
* Bagian **Poin Kunci Kode** adalah **baris kode atau konsep teknis** yang wajib Anda tunjukkan jika dosen/klien meminta penjelasan mendalam.

---

## 1. PEMBUKAAN PRESENTASI (INTRODUCTION)

**"Selamat pagi/siang Bapak/Ibu dosen penguji dan pembimbing (atau rekan-rekan sekalian).**

**Pada kesempatan kali ini, saya akan mendemonstrasikan arsitektur kode sumber (*source code*) dan implementasi teknis dari platform digital CV ATVIA JAYA.**

**Aplikasi ini dibangun menggunakan ekosistem modern React 18 dan Vite sebagai build tool berkecepatan tinggi. Arsitektur sistem difokuskan pada tiga pilar utama:**
1. **Performa Tinggi & Interaktivitas 3D:** Mengintegrasikan Three.js WebGL tanpa membebani memori perangkat ponsel (*mobile-friendly*).
2. **Kemandirian Sistem (*Zero-Dependency Backend*):** Menggunakan *local state persistence* reaktif untuk katalog dan autentikasi keamanan administrator.
3. **Standar Desain Swiss-Grid & Anti-AI Slop:** Seluruh antarmuka mengacu pada instrumen industri otomotif presisi—bersih, tanpa emoji pada tombol UI, dengan tipografi tegas dan palet warna solid ATVIA.

**Mari kita bedah struktur file dan logika kodingannya satu per satu."**

---

## 2. MODUL 1: ENTRY POINT & ARSITEKTUR ROUTING

### A. File: `src/main.jsx`
*[Aksi: Buka file `src/main.jsx` di VS Code]*

**"Kita mulai dari file titik masuk utama aplikasi, yaitu `src/main.jsx`:**
* Di sini aplikasi di-mount ke DOM elemen ber-id `root` menggunakan `ReactDOM.createRoot`.
* Kita membungkus seluruh aplikasi dengan `React.StrictMode` untuk mendeteksi potensi *side-effect* sejak tahap pengembangan.
* Di file ini juga kita memuat stylesheet global, yaitu `src/index.css` yang mendefinisikan *Design Tokens*, variabel warna CSS (*CSS Custom Properties* seperti `--color-brand-red: #DC2626`), tipografi, dan reset box-sizing modern."**

---

### B. File: `src/App.jsx`
*[Aksi: Buka file `src/App.jsx`]*

**"Selanjutnya pada `src/App.jsx`, file ini bertindak sebagai konduktor utama navigasi dan tata letak global (*Global Router & Shell*):**
* Kami mengimpor `BrowserRouter`, `Routes`, dan `Route` dari `react-router-dom` versi 6.
* Kami mendefinisikan rute publik:
  - Path `/` mengarah ke halaman utama `Home.jsx`.
  - Path dinamis `/produk/:slug` mengarah ke halaman spesifikasi teknis `ProductDetail.jsx`.
* Kami juga mengonfigurasi rute pengelola:
  - Path `/admin/login` untuk gerbang autentikasi.
  - Path `/admin/dashboard` untuk pusat manajemen katalog dan log audit.
* Di level terluar, komponen `Navbar`, `FloatingWhatsApp`, dan `Footer` dipasang sehingga tetap konsisten hadir di seluruh halaman tanpa re-render yang tidak perlu."**

---

## 3. MODUL 2: KONFIGURASI & BASIS DATA

### A. File: `src/config/contact.js`
*[Aksi: Buka file `src/config/contact.js`]*

**"Masuk ke konfigurasi kontak di `src/config/contact.js`:**
* File ini mengonsolidasikan seluruh saluran komunikasi resmi agar terpusat dan tidak tersebar (*single source of truth*).
* Terdapat getter `CONTACT_INFO` yang mengambil variabel lingkungan `.env`:
  - Nomor WhatsApp resmi: `6285700470046`.
  - Alamat email resmi: `atviajayaofficial@gmail.com`.
  - Lokasi fasilitas: `Purbayan, Baki, Sukoharjo`.
* Terdapat fungsi utilitas `buildWhatsAppUrl(messageText)` yang secara otomatis mengenkripsi teks pesan (*URL encode*) dan menghasilkan tautan resmi format `https://wa.me/` yang langsung membuka aplikasi WhatsApp pengguna."**

---

### B. File: `src/data/products.js`
*[Aksi: Buka file `src/data/products.js`]*

**"File `src/data/products.js` menyimpan data inisial dari 5 formula inti perawatan kendaraan ATVIA:**
* Setiap produk memiliki atribut terstruktur: `id`, `slug`, `name`, `category`, `volume`, `price`, deskripsi kimiawi, keunggulan, serta parameter laboratorium (pH, yield, curing time).
* Data ini berfungsi sebagai *seed data* awal yang nantinya akan dimuat ke dalam *Product Service* saat aplikasi pertama kali dijalankan."**

---

## 4. MODUL 3: LOGIKA BISNIS & PERSISTENSI DATA (SERVICES)

### A. File: `src/services/authService.js`
*[Aksi: Buka `src/services/authService.js` lalu tunjukkan fungsi `login()` dan `logAudit()`]*

**"File `src/services/authService.js` adalah salah satu modul keamanan paling krusial pada proyek ini:**
* Modul ini menangani autentikasi administrator lengkap dengan **Proteksi Brute-Force Otomatis**:
  - Kami menetapkan `MAX_FAILED_ATTEMPTS = 5` dan `LOCKOUT_DURATION_MS = 300000` (5 menit).
  - Jika terjadi kesalahan input passcode sebanyak 5 kali berturut-turut, fungsi `recordFailedAttempt()` otomatis mencatat timestamp penguncian dan menolak akses masuk.
  - Fungsi `checkLockoutStatus()` menghitung sisa waktu pinalti secara *real-time* untuk ditampilkan sebagai *countdown timer* di antarmuka login.
* Jika login berhasil, sistem membuat token sesi terenkripsi dengan masa berlaku **2 jam**.
* Selain itu, terdapat fungsi `logAudit(action, details)` yang mencatat setiap peristiwa penting (`LOGIN_BERHASIL`, `TAMBAH_PRODUK`, `HAPUS_PRODUK`) ke dalam `localStorage` secara transparan dan tidak dapat dimanipulasi dari antarmuka biasa."**

---

### B. File: `src/services/productService.js`
*[Aksi: Buka `src/services/productService.js`]*

**"Pada `src/services/productService.js`, kami membangun abstraksi *Repository Pattern* untuk operasi CRUD produk:**
* Fungsi `getAllProducts()` mengambil data dari `localStorage`. Jika kosong, ia menginisialisasi dari `src/data/products.js`.
* Fungsi `getPublishedProducts()` memfilter formula yang hanya berstatus `published: true` untuk ditampilkan pada website publik pengunjung.
* Fungsi `createProduct()` dan `updateProduct()` mengelola slug unik, validasi parameter kimiawi, dan penyimpanan file foto Base64.
* Fungsi `deleteProduct(id)` menghapus produk dan secara otomatis men-dispatch `CustomEvent('atvia-products-changed')` sehingga seluruh komponen yang sedang aktif langsung terbarui secara reaktif tanpa perlu me-refresh browser."**

---

## 5. MODUL 4: EKSPLORASI INTERAKTIF 3D & URUTAN PERAWATAN

### A. File: `src/components/Car3DViewer/CarCanvas.jsx` & `CarModel.jsx`
*[Aksi: Buka `CarCanvas.jsx` dan tunjukkan di browser interaksi mobil 3D]*

**"Sekarang kita masuk ke fitur visual unggulan, yaitu Kanvas Mobil 3D di `CarCanvas.jsx`:**
* Komponen ini dibangun menggunakan pustaka `@react-three/fiber` dan `@react-three/drei`.
* Kami memuat model 3D kendaraan sport berformat GLB (`/models/ferrari.glb`) yang telah dikompresi menggunakan Google Draco Decoder sehingga ukuran file sangat kecil dan cepat diunduh.
* Kami memasang `<OrbitControls>` dengan batasan sudut elevasi vertikal (*maxPolarAngle*) agar pengguna tidak dapat memutar mobil hingga ke bagian bawah lantai yang tidak perlu dilihat.
* Di atas mobil, kami memasang titik-titik hotspot interaktif pada Kaca, Bodi, Trim Plastik, dan Ban. Saat hotspot diklik, kamera bergerak halus dan sistem memfilter produk ATVIA yang relevan dengan bagian mobil tersebut."**

---

### B. File: `src/sections/CareSequence.jsx` & `VehicleZoneSchematic.jsx`
*[Aksi: Buka `CareSequence.jsx` lalu perlihatkan stepper nomor [1]–[4] di browser]*

**"Pada seksi Urutan Perawatan Terarah di `src/sections/CareSequence.jsx`:**
* Kami mengimplementasikan *4-Stage Technical Stepper*:
  1. Bersihkan & Dekontaminasi (Waterspot Cleaner).
  2. Restorasi Trim Plastik & Ban (Action Black & Tire Shine).
  3. Proteksi Kilap Cat Eksterior (Advance Coating).
  4. Perawatan Kabin Interior (Interior Guard).
* State aktif dikontrol melalui hook `useState(1)`.
* Ketika nomor tahapan diklik, komponen `VehicleZoneSchematic.jsx` merender diagram vektor 2D blueprint mobil. Menggunakan conditional styling SVG, area kendaraan yang sedang dikerjakan pada tahap tersebut otomatis menyala dengan aksen warna merah khas ATVIA (`#DC2626`)."**

---

## 6. MODUL 5: CHATBOT LABORATORIUM AI & PETA GOOGLE MAPS

### A. File: `src/sections/ProductChatbot.jsx`
*[Aksi: Buka `ProductChatbot.jsx`, perlihatkan fungsi `handleSend` dan pencocokan kata kunci]*

**"Komponen Asisten Laboratorium pada `src/sections/ProductChatbot.jsx`:**
* Kami merancang Chatbot cerdas mandiri (*client-side knowledge engine*) tanpa dependensi API pihak ketiga yang rentan gangguan koneksi.
* **Isolasi Scroll:** Dalam fungsi pengiriman pesan `handleSend`, kami menambahkan `e.preventDefault()` dan memanggil `chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })`. Ini memastikan timeline obrolan bergulir secara internal, **tanpa menyebabkan halaman browser melompat ke bawah**.
* **Pencocokan Kata Kunci Pintar:**
  - Menanyakan lokasi atau rute langsung memunculkan tombol peta.
  - Menanyakan jam buka langsung menampilkan jadwal kerja bengkel `08.00–17.00 WIB`.
  - Menanyakan email langsung menampilkan alamat `atviajayaofficial@gmail.com` lengkap dengan tombol aksi berikon surat format `mailto:`.
  - Menanyakan masalah kendaraan (jamur kaca, baret, trim kusam) langsung menampilkan diagnosa teknis dan kartu produk rekomendasi."**

---

### B. File: `src/components/AtviaLocationMap3D/AtviaLocationMap3D.jsx`
*[Aksi: Buka `AtviaLocationMap3D.jsx`]*

**"Pada seksi lokasi workshop di `AtviaLocationMap3D.jsx`:**
* Kami mengintegrasikan Google Maps resmi Atvia Jaya yang berlokasi di Purbayan, Baki, Sukoharjo.
* Kami menyediakan toggle state `mapMode`: mode `0` untuk Peta Jalan (*Roadmap*) dan mode `1` untuk tampilan Satelit (*Hybrid*).
* Di sebelah kiri peta, kami menyematkan kartu spesifikasi operasional bengkel, cakupan logistik kargo nasional, dan kontak email koordinasi resmi `atviajayaofficial@gmail.com`."**

---

## 7. MODUL 6: HALAMAN PENGELOLA (ADMIN PORTAL & DASHBOARD)

### A. File: `src/pages/Admin/AdminLogin.jsx`
*[Aksi: Buka `src/pages/Admin/AdminLogin.jsx`]*

**"Masuk ke area administrator, pertama adalah `AdminLogin.jsx`:**
* Form login ini langsung terhubung dengan `authService`.
* Ketika pengguna salah memasukkan passcode, counter kesalahan bertambah.
* Jika counter mencapai 5, state `isLocked` menjadi `true`. Komponen menjalankan `useEffect` interval untuk menghitung mundur 300 detik.
* Input form dinonaktifkan secara otomatis dan muncul banner peringatan merah tegas bertuliskan *Brute-Force Lockout*. Ini melindungi dashboard dari upaya peretasan manual maupun skrip bot."**

---

### B. File: `src/pages/Admin/AdminDashboard.jsx`
*[Aksi: Buka `AdminDashboard.jsx` dan perlihatkan tabel produk]*

**"Pusat kendali inventaris ada pada `AdminDashboard.jsx`:**
* **Metrik Statistik:** Di bagian atas, fungsi `useMemo` menghitung total formula, jumlah yang terbit live, jumlah draf, dan akumulasi log audit secara instan.
* **Unggah Foto Produk:** Administrator dapat mengunggah file foto dari komputernya yang langsung dikonversi menjadi format Base64 via `FileReader`, atau memilih salah satu dari 5 preset botol resmi ATVIA.
* **Toggle Status Publikasi:** Saklar cepat untuk mengubah produk antara status *Published* (tampil di website publik) atau *Draf* (hanya terlihat oleh admin).
* **Modal Konfirmasi Hapus Produk Published:**  
  Jika admin menekan tombol hapus pada produk yang sedang berstatus *Published (Live)*, sistem tidak langsung menghapusnya, melainkan memunculkan modal verifikasi khusus yang menampilkan foto dan nama produk dengan peringatan tegas. Penghapusan data akan mencabut formula dari publik seketika dan mencatat aksi ke riwayat *Audit Log*."**

---

## 8. PENUTUP & KESIMPULAN (CLOSING)

*[Aksi: Kembali ke halaman utama website di browser atau tampilkan slide penutup]*

**"Sebagai kesimpulan:**
* Seluruh kode dalam proyek ATVIA JAYA ini telah mengikuti standar rekayasa modern: modular, mudah dirawat (*maintainable*), memiliki *error handling* yang kuat, serta bebas dari galat sintaksis ESLint.
* Kami telah membuktikan bahwa pengalaman web 3D yang interaktif, visual katalog yang estetik, dan sistem manajemen inventaris yang aman dapat berjalan sangat cepat dan ringan tanpa perlu infrastruktur backend yang rumit.

**Demikian demonstrasi kode program CV ATVIA JAYA dari saya. Saya siap menjawab pertanyaan atau masukan teknis dari Bapak/Ibu sekalian. Terima kasih."**
