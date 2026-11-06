import './ProductImage.css';

export default function ProductImage({
  product,
  aspect = 'standard', // 'standard' (1/1) | 'featured' (4/3)
  className = '',
  loading
}) {
  const isFeatured = aspect === 'featured';
  const imgLoading = loading || (isFeatured ? 'eager' : 'lazy');
  const altText = `Botol ${product.name} ATVIA ${product.volume || ''}`.trim();

  return (
    <div
      className={`product-image product-image--${aspect} ${className}`}
      aria-hidden={!product.image ? 'true' : undefined}
    >
      {product.image ? (
        <img
          src={product.image}
          alt={altText}
          loading={imgLoading}
          className="product-image__img"
        />
      ) : (
        <div className="product-image__placeholder">
          {/* Subtle thin SVG bottle icon */}
          <svg
            viewBox="0 0 24 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="product-image__icon"
            aria-hidden="true"
          >
            <rect x="8" y="2" width="8" height="6" rx="1" />
            <path d="M7 8 L17 8 L20 14 L20 36 C20 37.1 19.1 38 18 38 L6 38 C4.9 38 4 37.1 4 36 L4 14 L7 8 Z" />
          </svg>
          <p className="product-image__text">Foto produk menyusul</p>
        </div>
      )}
    </div>
  );
}
