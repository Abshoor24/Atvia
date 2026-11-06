import Button from '../components/Button';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container not-found__box">
        <span className="not-found__code">404</span>
        <h1 className="not-found__title">Halaman Tidak Ditemukan</h1>
        <p className="not-found__desc">
          Halaman atau produk yang Anda cari tidak tersedia atau alamat tautan telah diperbarui. Silakan kembali ke halaman utama untuk melihat katalog produk kami.
        </p>
        <Button to="/" variant="primary" size="md">
          Kembali ke beranda
        </Button>
      </div>
    </div>
  );
}
