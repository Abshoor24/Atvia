import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import './ProductCard.css';

export default function ProductCard({ product, featured = false }) {
  // Format volume dengan spasi konsisten: '500ml' -> '500 ml'
  const formattedVolume = product.volume
    ? product.volume.replace(/([0-9]+)\s*([a-zA-Z]+)/, '$1 $2')
    : '';

  const metaText = [product.category, formattedVolume].filter(Boolean).join(', ');

  return (
    <article className={`product-card ${featured ? 'product-card--featured' : ''}`}>
      <div className="product-card__media-wrapper">
        <ProductImage
          product={product}
          aspect={featured ? 'featured' : 'standard'}
        />
      </div>

      <div className="product-card__body">
        {/* 1. Baris Meta & Badge Signature Formula */}
        <div className="product-card__meta-row">
          <p className="product-card__meta">{metaText}</p>
          {product.highlightBadge && (
            <span className="product-card__badge">{product.highlightBadge}</span>
          )}
        </div>

        {/* 2. Nama Produk (20px tebal; 28-32px pada kartu unggulan) */}
        <h3 className="product-card__title">{product.name}</h3>

        {/* 3. Deskripsi (15-16px, line-clamp) */}
        <p className="product-card__summary">{product.summary}</p>

        {/* 4. Link "Lihat detail" dengan margin-top: auto untuk alignment rapi */}
        <div className="product-card__footer">
          <Link
            to={`/produk/${product.slug}`}
            className="product-card__link"
            aria-label={`Lihat detail produk ${product.name}`}
          >
            Lihat detail
          </Link>
        </div>
      </div>
    </article>
  );
}
