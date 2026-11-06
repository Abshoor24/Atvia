import { products as defaultProducts } from '../data/products';

const STORAGE_KEY = 'atvia_products_catalog';
const CHANGE_EVENT = 'atvia_products_changed';

/**
 * Service to manage ATVIA product catalog with localStorage persistence
 * and live event notifications.
 */
class ProductService {
  constructor() {
    this.initCatalog();
  }

  /**
   * Initialize catalog in localStorage with default ATVIA products if not exists
   */
  initCatalog() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Initialize with default products marked as published
        const initialized = defaultProducts.map((p) => ({
          ...p,
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialized));
      }
    } catch (e) {
      console.warn('localStorage not accessible, fallback to default products', e);
    }
  }

  /**
   * Helper to retrieve raw products array from storage
   */
  _getRawList() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse products from localStorage', e);
    }
    return defaultProducts.map((p) => ({ ...p, status: 'published' }));
  }

  /**
   * Helper to save products array to storage and dispatch event
   */
  _saveRawList(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { products: list } }));
      }
      return true;
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
      return false;
    }
  }

  /**
   * Get all published products (for public storefront & customer facing components)
   */
  getPublishedProducts() {
    const list = this._getRawList();
    return list.filter((p) => p.status === 'published' || p.status === undefined);
  }

  /**
   * Get all products including drafts (for Admin panel)
   */
  getAllProducts() {
    return this._getRawList();
  }

  /**
   * Get single product by slug
   */
  getProductBySlug(slug) {
    if (!slug) return null;
    const list = this._getRawList();
    return list.find((p) => p.slug === slug) || null;
  }

  /**
   * Get single product by ID
   */
  getProductById(id) {
    if (!id) return null;
    const list = this._getRawList();
    return list.find((p) => String(p.id) === String(id)) || null;
  }

  /**
   * Add a new product to the catalog
   */
  addProduct(newProductData) {
    const list = this._getRawList();

    // Generate safe slug if not provided
    const baseSlug = (newProductData.slug || newProductData.name || 'produk-baru')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Ensure unique slug
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (list.some((p) => p.slug === uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newId = `prod_${Date.now()}`;
    const product = {
      id: newId,
      slug: uniqueSlug,
      name: newProductData.name || 'Produk ATVIA Baru',
      category: newProductData.category || 'Perawatan Khusus Kendaraan',
      categoryKey: newProductData.categoryKey || 'glass',
      volume: newProductData.volume || '500 ml',
      image: newProductData.image || '/images/waterspot-cleaner.jpg',
      highlightBadge: newProductData.highlightBadge || 'Formula Presisi ATVIA',
      solvesProblem: newProductData.solvesProblem || 'Perawatan dan pembersihan kendaraan',
      summary: newProductData.summary || 'Formula spesifikasi laboratorium ATVIA untuk hasil bersih, kilap, dan konsisten.',
      description: newProductData.description || 'Produk formulasi presisi dari ATVIA (Atvia Jaya) dirancang dengan standar teknis laboratorium untuk memberikan proteksi dan perawatan optimal pada kendaraan.',
      benefits: Array.isArray(newProductData.benefits) && newProductData.benefits.length > 0
        ? newProductData.benefits
        : [
            'Formula aktif yang bekerja cepat dan terukur',
            'Aman untuk substrat material kendaraan yang direkomendasikan',
            'Standar kualitas laboratorium ATVIA dengan efisiensi tinggi'
          ],
      specs: newProductData.specs || {
        formula: 'Formula Polimer Kimia Khusus ATVIA',
        ph: 'pH Netral / Terarah',
        compatibleSurfaces: 'Material kendaraan sesuai petunjuk teknis',
        finish: 'Bersih, Kilap & Terproteksi',
        curingTime: 'Bilas / Buffing instan',
        yield: '15–20 Kendaraan',
        durability: '2–4 Minggu'
      },
      applicationSteps: Array.isArray(newProductData.applicationSteps) && newProductData.applicationSteps.length > 0
        ? newProductData.applicationSteps
        : [
            { step: 1, title: 'Persiapan Substrat', instruction: 'Bersihkan permukaan kendaraan dari debu kasar dan kotoran.' },
            { step: 2, title: 'Aplikasi Terarah', instruction: 'Tuangkan atau semprotkan secukupnya pada busa aplikator / lap microfiber.' },
            { step: 3, title: 'Finishing & Buffing', instruction: 'Ratakan dengan tekanan merata searah hingga hasil optimal tercapai.' }
          ],
      dosAndDonts: newProductData.dosAndDonts || {
        dos: [
          'Gunakan kain microfiber bersih saat aplikasi.',
          'Kerjakan pada permukaan dingin dan terlindung dari sinar matahari langsung.',
          'Tutup rapat botol kemasan setelah pemakaian.'
        ],
        donts: [
          'JANGAN biarkan cairan mengering tanpa diratakan.',
          'JANGAN gunakan pada permukaan panas.',
          'JANGAN campur dengan bahan kimia pembersih lain yang tidak direkomendasikan.'
        ]
      },
      toolsRecommended: newProductData.toolsRecommended || [
        'Kain Microfiber Bersih',
        'Busa Aplikator Halus',
        'Sarung Tangan Pelindung'
      ],
      status: newProductData.status || 'published', // 'published' | 'draft'
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: newProductData.status === 'draft' ? null : new Date().toISOString()
    };

    list.unshift(product);
    this._saveRawList(list);
    return product;
  }

  /**
   * Update an existing product
   */
  updateProduct(id, updatedFields) {
    const list = this._getRawList();
    const index = list.findIndex((p) => String(p.id) === String(id));

    if (index === -1) {
      throw new Error(`Produk dengan ID ${id} tidak ditemukan.`);
    }

    const existing = list[index];
    const isNowPublished = updatedFields.status === 'published' && existing.status === 'draft';

    const updated = {
      ...existing,
      ...updatedFields,
      id: existing.id, // ID remains immutable
      updatedAt: new Date().toISOString(),
      publishedAt: isNowPublished ? new Date().toISOString() : existing.publishedAt
    };

    list[index] = updated;
    this._saveRawList(list);
    return updated;
  }

  /**
   * Delete a product by id or slug
   */
  deleteProduct(id) {
    const list = this._getRawList();
    const filtered = list.filter((p) => String(p.id) !== String(id) && p.slug !== id);
    if (filtered.length === list.length) {
      return false;
    }
    this._saveRawList(filtered);
    return true;
  }

  /**
   * Toggle published / draft status
   */
  togglePublish(id) {
    const list = this._getRawList();
    const product = list.find((p) => String(p.id) === String(id));
    if (!product) return null;

    const nextStatus = product.status === 'published' ? 'draft' : 'published';
    return this.updateProduct(id, { status: nextStatus });
  }

  /**
   * Reset catalog to initial default ATVIA products
   */
  resetToDefault() {
    const initial = defaultProducts.map((p) => ({
      ...p,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    this._saveRawList(initial);
    return initial;
  }
}

export const productService = new ProductService();
export default productService;
