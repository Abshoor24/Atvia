import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import Button from '../components/Button';
import NotFound from './NotFound';
import { buildWhatsAppUrl } from '../config/contact';
import Car3DExplorer from '../components/Car3DViewer/Car3DExplorer';
import LightweightProductSpecs from '../components/ProductDetail/LightweightProductSpecs';
import {
  MessageSquare,
  Layers,
  ChevronRight,
  ShieldCheck,
  Check,
  PackageCheck
} from 'lucide-react';
import './ProductDetail.css';

export default function ProductDetail({ defaultSlug = 'interior-guard' }) {
  const { slug } = useParams();
  const currentSlug = slug || defaultSlug;
  const [product, setProduct] = useState(() => productService.getProductBySlug(currentSlug));
  const [otherProducts, setOtherProducts] = useState(() =>
    productService.getPublishedProducts().filter((p) => p.slug !== currentSlug)
  );

  useEffect(() => {
    const handleUpdate = () => {
      const current = productService.getProductBySlug(currentSlug);
      setProduct(current);
      setOtherProducts(
        productService.getPublishedProducts().filter((p) => p.slug !== currentSlug)
      );
    };

    handleUpdate();
    window.addEventListener('atvia_products_changed', handleUpdate);
    return () => window.removeEventListener('atvia_products_changed', handleUpdate);
  }, [currentSlug]);

  if (!product) {
    return <NotFound />;
  }

  const waMessage = `Halo ATVIA, saya ingin menanyakan informasi teknis laboratorium dan pemesanan untuk produk ${product.name} (${product.volume}).`;
  const whatsappUrl = buildWhatsAppUrl(waMessage);

  const waConsultMessage = `Halo Tim Teknis ATVIA, saya ingin berkonsultasi mengenai rekomendasi aplikasi dan kemitraan bengkel/reseller untuk ${product.name}.`;
  const whatsappConsultUrl = buildWhatsAppUrl(waConsultMessage);

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb Navigation (Clinical Swiss Style) */}
        <nav className="product-detail__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Beranda</Link>
          <ChevronRight size={13} strokeWidth={2} aria-hidden="true" className="breadcrumb-separator" />
          <a href="/#produk">Katalog Produk</a>
          <ChevronRight size={13} strokeWidth={2} aria-hidden="true" className="breadcrumb-separator" />
          <span aria-current="page" className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* ====================================================================
            HERO PRODUK 2D (FOTO PRODUK & FORMULATION ADVANTAGES)
            ==================================================================== */}
        <div className="product-detail__grid">
          {/* 2D Studio Media Frame */}
          <div className="product-detail__media" role="img" aria-label={`Foto resmi produk ${product.name}`}>
            <ProductImage
              product={product}
              aspect="featured"
              loading="eager"
            />
          </div>

          {/* Product Technical Details */}
          <div className="product-detail__info">
            <div className="product-detail__header">
              <div className="product-detail__meta-row">
                <span className="product-detail__category">{product.category}</span>
                <span className="product-detail__volume">Isi Bersih: {product.volume}</span>
                {product.highlightBadge && (
                  <span className="product-detail__highlight-badge">
                    <ShieldCheck size={13} strokeWidth={2} />
                    {product.highlightBadge}
                  </span>
                )}
              </div>
              <h1 className="product-detail__title">{product.name}</h1>
              {product.solvesProblem && (
                <div className="product-detail__solves">
                  <span className="product-detail__solves-label">Target Permasalahan:</span>
                  <span className="product-detail__solves-val">{product.solvesProblem}</span>
                </div>
              )}
            </div>

            <p className="product-detail__description">{product.description}</p>

            {/* Keunggulan Formulasi Laboratorium */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="product-detail__benefits">
                <h2 className="product-detail__benefits-title">Keunggulan Formulasi Laboratorium</h2>
                <ul className="product-detail__benefits-list">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="product-detail__benefit-item">
                      <span className="product-detail__benefit-bullet" aria-hidden="true">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Role in Care Sequence */}
            {product.sequencePhase && (
              <div className="product-detail__sequence-note">
                <span className="product-detail__sequence-badge">Tahap {product.sequenceStep}</span>
                <p className="product-detail__sequence-text">
                  <strong>Urutan Perawatan:</strong> Direkomendasikan pada tahap{' '}
                  <em>{product.sequencePhase}</em>. {product.sequenceRole}
                </p>
              </div>
            )}

            {/* Call to Actions (Disciplined Red Accent) */}
            <div className="product-detail__actions">
              <Button
                href={whatsappUrl}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-primary"
              >
                <MessageSquare size={17} strokeWidth={2} />
                <span>Pesan Produk via WhatsApp</span>
              </Button>

              <a
                href={whatsappConsultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="product-detail__btn-calculator"
                title="Konsultasikan kemitraan bengkel atau reseller dengan tim ATVIA"
              >
                <PackageCheck size={16} strokeWidth={2} />
                <span>Konsultasi Paket Partai B2B</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          MODUL 1: 3D CAR SUBSTRATE & CARE SEQUENCE EXPLORER
          ==================================================================== */}
      <Car3DExplorer key={product.slug} initialSlug={product.slug} />

      <div className="container">
        {/* ====================================================================
            MODUL 2: LIGHTWEIGHT TECHNICAL SPECS & APLIKASI
            (Menggantikan modul berat pH bar, slider before/after, dan kalkulator B2B)
            ==================================================================== */}
        <LightweightProductSpecs product={product} />

        {/* ====================================================================
            KATALOG 2D PRODUK TERKAIT LAINNYA
            ==================================================================== */}
        {otherProducts.length > 0 && (
          <section className="product-detail__related" aria-labelledby="related-heading">
            <div className="product-detail__related-header">
              <span className="product-detail__related-eyebrow">
                <Layers size={13} strokeWidth={2} />
                RANGKAIAN LENGKAP
              </span>
              <h2 id="related-heading" className="product-detail__related-title">
                Produk Perawatan Terkait Lainnya
              </h2>
              <p className="product-detail__related-sub">
                Formula kimia komplementer untuk melengkapi seluruh tahapan perawatan kendaraan Anda.
              </p>
            </div>
            <div className="product-detail__related-grid">
              {otherProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
