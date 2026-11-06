import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';
import './Products.css';

const FILTER_OPTIONS = [
  { key: 'all', label: 'Semua Produk' },
  { key: 'glass', label: 'Kaca & Kerak Air' },
  { key: 'trim-tire', label: 'Plastik Trim & Ban' },
  { key: 'paint', label: 'Kilap & Proteksi Cat' },
  { key: 'interior', label: 'Kebersihan Kabin' }
];

const FILTER_INSIGHTS = {
  glass: 'Fokus Solusi: Melarutkan jamur kaca dan kerak mineral membandel tanpa mengikis permukaan.',
  'trim-tire': 'Fokus Solusi: Restorasi kehitaman bodi kasar dan proteksi karet ban agar tidak cepat getas.',
  paint: 'Fokus Solusi: Lapisan hidrofobik daun talas cepat semprot dengan kilap reflektif tinggi.',
  interior: 'Fokus Solusi: Mengangkat debu halus dasbor sekaligus mengunci aroma kesegaran mewah kabin.'
};

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [productList, setProductList] = useState(() => productService.getPublishedProducts());

  useEffect(() => {
    const handleProductsChange = () => {
      setProductList(productService.getPublishedProducts());
    };

    window.addEventListener('atvia_products_changed', handleProductsChange);
    return () => window.removeEventListener('atvia_products_changed', handleProductsChange);
  }, []);

  const featuredProduct = productList[0];
  const otherProducts = productList.slice(1);

  const filteredProducts = activeFilter === 'all'
    ? productList
    : productList.filter((p) => p.categoryKey === activeFilter);

  return (
    <section id="produk" className="section products-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2>Rangkaian Produk ATVIA</h2>
          <p className="lead">
            Formulasi spesifik laboratorium yang saling melengkapi untuk merawat bagian luar, permukaan cat, ban, hingga kebersihan kabin kendaraan Anda.
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="products-filter" role="tablist" aria-label="Filter kategori produk">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              role="tab"
              aria-selected={activeFilter === opt.key}
              className={`products-filter__btn ${activeFilter === opt.key ? 'products-filter__btn--active' : ''}`}
              onClick={() => setActiveFilter(opt.key)}
            >
              {opt.label} {opt.key === 'all' ? `(${productList.length})` : ''}
            </button>
          ))}
        </div>

        {/* Editorial Insight Note when Filtered */}
        {activeFilter !== 'all' && FILTER_INSIGHTS[activeFilter] && (
          <div className="products-filter__insight animate-fade-up">
            <span className="products-filter__insight-icon" aria-hidden="true">
              <Info size={14} strokeWidth={2} />
            </span>
            <span>{FILTER_INSIGHTS[activeFilter]}</span>
            <button
              type="button"
              className="products-filter__insight-reset"
              onClick={() => setActiveFilter('all')}
            >
              Tampilkan semua
            </button>
          </div>
        )}

        {/* Dynamic Layout */}
        {activeFilter === 'all' ? (
          <div className="products-layout">
            {/* Kartu Unggulan — horizontal lebar penuh */}
            {featuredProduct && (
              <div className="products-layout__featured">
                <ProductCard product={featuredProduct} featured={true} />
              </div>
            )}

            {/* Kolom Produk Lainnya */}
            <div className="products-layout__grid">
              {otherProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="products-layout__filtered-grid animate-fade-up">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
