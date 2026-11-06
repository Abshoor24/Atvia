import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PlusCircle,
  Package,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ExternalLink,
  LogOut,
  RefreshCw,
  Search,
  Eye,
  EyeOff,
  History,
  Lock,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  Check,
  X
} from 'lucide-react';
import productService from '../../services/productService';
import authService from '../../services/authService';
import './AdminDashboard.css';

const CATEGORY_OPTIONS = [
  { key: 'glass', label: 'Pembersih Khusus & Kaca' },
  { key: 'trim-tire', label: 'Restorasi Plastik & Trim' },
  { key: 'paint', label: 'Proteksi Cat & Kilap' },
  { key: 'interior', label: 'Perawatan Interior' }
];

const PRESET_BOTTLE_IMAGES = [
  { label: 'Waterspot Cleaner', path: '/images/waterspot-cleaner.jpg' },
  { label: 'Interior Guard', path: '/images/interior-guard.jpg' },
  { label: 'Action Black', path: '/images/action-black-dressing.jpg' },
  { label: 'Tire Shine 1L', path: '/images/tire-shine-protection.jpg' },
  { label: 'Advance Coating', path: '/images/advance-coating.jpg' }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'add' | 'logs'
  const [productsList, setProductsList] = useState(() => productService.getAllProducts());
  const [auditLogs, setAuditLogs] = useState(() => authService.getAuditLogs());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'published' | 'draft'
  const [actionNotice, setActionNotice] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  // Form State for Adding New Product
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Pembersih Khusus & Kaca',
    categoryKey: 'glass',
    volume: '500 ml',
    highlightBadge: 'Formula Presisi ATVIA',
    solvesProblem: '',
    summary: '',
    description: '',
    image: '/images/waterspot-cleaner.jpg',
    benefitsText: 'Formula aktif yang bekerja cepat dan terukur\nAman untuk material kendaraan\nStandar kualitas laboratorium ATVIA',
    status: 'published'
  });
  const [imagePreview, setImagePreview] = useState('/images/waterspot-cleaner.jpg');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Change Passcode State
  const [passcodeForm, setPasscodeForm] = useState({ currentPass: '', newPass: '', confirmPass: '' });
  const [passcodeNotice, setPasscodeNotice] = useState(null);

  const refreshData = useCallback(() => {
    const all = productService.getAllProducts();
    setProductsList(all);
    setAuditLogs(authService.getAuditLogs());
  }, []);

  // Guard: Protect route
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const showNotification = (type, message) => {
    setActionNotice({ type, message });
    setTimeout(() => {
      setActionNotice(null);
    }, 4500);
  };

  // Toggle publish status
  const handleTogglePublish = (id, currentStatus, name) => {
    const updated = productService.togglePublish(id);
    if (updated) {
      const isNowPublished = updated.status === 'published';
      authService.logAudit(
        isNowPublished ? 'PRODUK_DIPUBLIKASIKAN' : 'PRODUK_DIARSIPKAN_DRAF',
        `Status produk "${name}" diubah menjadi ${isNowPublished ? 'PUBLISHED (Live)' : 'DRAF (Tersembunyi)'}.`
      );
      showNotification(
        'success',
        `Produk "${name}" berhasil ${isNowPublished ? 'DIPUBLIKASIKAN ke katalog publik' : 'diubah menjadi DRAF'}.`
      );
      refreshData();
    }
  };

  // Open custom delete modal
  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
  };

  // Confirm and execute product deletion (both for published and draft products)
  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    const { id, name, status } = productToDelete;
    const isLive = status === 'published';

    const ok = productService.deleteProduct(id);
    if (ok) {
      authService.logAudit(
        'HAPUS_PRODUK',
        `Produk "${name}" (${isLive ? 'PUBLISHED (LIVE)' : 'DRAF'}, ID: ${id}) dihapus dari katalog.`
      );
      showNotification(
        'success',
        `Produk "${name}" (${isLive ? 'Live di Website' : 'Draf'}) berhasil dihapus dari sistem.`
      );
      setProductToDelete(null);
      refreshData();
    } else {
      showNotification('error', `Gagal menghapus produk "${name}".`);
    }
  };

  // Reset catalog to defaults
  const handleResetCatalog = () => {
    const confirmed = window.confirm('Kembalikan seluruh produk ke katalog bawaan awal ATVIA?');
    if (!confirmed) return;

    productService.resetToDefault();
    authService.logAudit('RESET_KATALOG', 'Katalog produk direset ke data awal resmi ATVIA.');
    showNotification('info', 'Katalog produk berhasil direset ke standar pabrikan ATVIA.');
    refreshData();
  };

  // Auto-generate slug when name changes
  const handleNameChange = (e) => {
    const nameVal = e.target.value;
    const generatedSlug = nameVal
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    setFormData((prev) => ({
      ...prev,
      name: nameVal,
      slug: generatedSlug
    }));
  };

  // Handle Image File Upload (Converts file to Base64)
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification('error', 'File yang dipilih harus berformat gambar (JPG, PNG, atau WEBP).');
      return;
    }

    // Limit to 3 MB for smooth local storage performance
    if (file.size > 3 * 1024 * 1024) {
      showNotification('error', 'Ukuran foto maksimal 3 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result;
      setFormData((prev) => ({
        ...prev,
        image: base64Data
      }));
      setImagePreview(base64Data);
      showNotification('success', `Foto produk "${file.name}" berhasil diunggah.`);
    };
    reader.readAsDataURL(file);
  };

  // Submit New Product Form
  const handleAddProductSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.summary.trim()) {
      showNotification('error', 'Mohon lengkapi Nama Produk dan Ringkasan.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const benefitsArr = formData.benefitsText
          .split('\n')
          .map((b) => b.trim())
          .filter(Boolean);

        const newProd = productService.addProduct({
          name: formData.name.trim(),
          slug: formData.slug.trim(),
          category: formData.category,
          categoryKey: formData.categoryKey,
          volume: formData.volume.trim(),
          image: formData.image || '/images/waterspot-cleaner.jpg',
          highlightBadge: formData.highlightBadge.trim(),
          solvesProblem: formData.solvesProblem.trim(),
          summary: formData.summary.trim(),
          description: formData.description.trim() || formData.summary.trim(),
          benefits: benefitsArr,
          status: formData.status
        });

        authService.logAudit(
          'TAMBAH_PRODUK_BARU',
          `Produk baru "${newProd.name}" (${newProd.volume}) ditambahkan dengan status ${newProd.status.toUpperCase()}.`
        );

        showNotification(
          'success',
          `Produk "${newProd.name}" berhasil disimpan${newProd.status === 'published' ? ' dan LANGSUNG TAYANG di website!' : ' sebagai draf.'}`
        );

        // Reset form
        setFormData({
          name: '',
          slug: '',
          category: 'Pembersih Khusus & Kaca',
          categoryKey: 'glass',
          volume: '500 ml',
          highlightBadge: 'Formula Presisi ATVIA',
          solvesProblem: '',
          summary: '',
          description: '',
          image: '/images/waterspot-cleaner.jpg',
          benefitsText: 'Formula aktif yang bekerja cepat dan terukur\nAman untuk material kendaraan\nStandar kualitas laboratorium ATVIA',
          status: 'published'
        });
        setImagePreview('/images/waterspot-cleaner.jpg');

        refreshData();
        setActiveTab('products');
      } catch (err) {
        showNotification('error', `Gagal menambahkan produk: ${err.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }, 200);
  };

  // Handle Passcode Change
  const handleChangePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcodeForm.newPass !== passcodeForm.confirmPass) {
      setPasscodeNotice({ type: 'error', message: 'Konfirmasi passcode baru tidak cocok.' });
      return;
    }

    const res = authService.changePasscode(passcodeForm.currentPass, passcodeForm.newPass);
    if (res.success) {
      setPasscodeNotice({ type: 'success', message: res.message });
      setPasscodeForm({ currentPass: '', newPass: '', confirmPass: '' });
      refreshData();
    } else {
      setPasscodeNotice({ type: 'error', message: res.message });
    }
  };

  // Filtered Products
  const filteredProducts = productsList.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.solvesProblem && p.solvesProblem.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesQuery) return false;
    if (statusFilter === 'all') return true;
    return p.status === statusFilter;
  });

  const publishedCount = productsList.filter((p) => p.status === 'published').length;
  const draftCount = productsList.filter((p) => p.status === 'draft').length;

  return (
    <div className="admin-dashboard-page">
      <main className="container admin-main">
        {/* Clean Single-Row Page Hero Header (No duplicate navbar!) */}
        <div className="admin-page-header">
          <div className="admin-page-header__left">
            <div className="admin-eyebrow-tag">
              <span className="admin-eyebrow-dot" />
              <span>PORTAL ADMINISTRATOR ATVIA</span>
            </div>
            <h1 className="admin-page-title">Manajemen & Publikasi Produk</h1>
            <p className="admin-page-sub">
              Sistem resmi untuk mempublikasikan formula baru, mengelola status tayang produk, dan memantau log transparansi.
            </p>
          </div>

          <div className="admin-page-header__right">
            <Link to="/" target="_blank" rel="noopener noreferrer" className="admin-header-btn admin-header-btn--visit">
              <ExternalLink size={13} strokeWidth={2} />
              <span>Lihat Website</span>
            </Link>

            <button type="button" onClick={handleLogout} className="admin-header-btn admin-header-btn--logout">
              <LogOut size={13} strokeWidth={2} />
              <span>Keluar Sesi</span>
            </button>
          </div>
        </div>

        {/* Global Notification Banner */}
        {actionNotice && (
          <div className={`admin-notice-banner admin-notice-banner--${actionNotice.type}`} role="alert">
            {actionNotice.type === 'success' ? (
              <CheckCircle2 size={16} strokeWidth={2} />
            ) : (
              <AlertCircle size={16} strokeWidth={2} />
            )}
            <span>{actionNotice.message}</span>
          </div>
        )}

        {/* Stats Row */}
        <section className="admin-stats-grid">
          <div className="admin-stat-card">
            <span className="admin-stat-card__label">TOTAL PRODUK TERDAFTAR</span>
            <strong className="admin-stat-card__val">{productsList.length}</strong>
            <span className="admin-stat-card__sub">Katalog Resmi & Draf Laboratorium</span>
          </div>

          <div className="admin-stat-card admin-stat-card--published">
            <span className="admin-stat-card__label">DIPUBLIKASIKAN (LIVE)</span>
            <strong className="admin-stat-card__val">{publishedCount}</strong>
            <span className="admin-stat-card__sub">Tayang di katalog website & asisten formula</span>
          </div>

          <div className="admin-stat-card admin-stat-card--draft">
            <span className="admin-stat-card__label">DRAF (DISEMBUNYIKAN)</span>
            <strong className="admin-stat-card__val">{draftCount}</strong>
            <span className="admin-stat-card__sub">Belum dipublikasikan ke publik</span>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-card__label">KEAMANAN & LOG AUDIT</span>
            <strong className="admin-stat-card__val">{auditLogs.length}</strong>
            <span className="admin-stat-card__sub">Aktivitas terekam transparan</span>
          </div>
        </section>

        {/* Tab Navigation */}
        <nav className="admin-tabs-nav" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'products'}
            className={`admin-tab-btn ${activeTab === 'products' ? 'admin-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={15} strokeWidth={2} />
            <span>Katalog & Status Publikasi ({productsList.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'add'}
            className={`admin-tab-btn ${activeTab === 'add' ? 'admin-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <PlusCircle size={15} strokeWidth={2} />
            <span>Tambah Produk Baru</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'logs'}
            className={`admin-tab-btn ${activeTab === 'logs' ? 'admin-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            <History size={15} strokeWidth={2} />
            <span>Log Audit Transparansi</span>
          </button>
        </nav>

        {/* ====================================================================
            TAB 1: DAFTAR PRODUK & TOGGLE PUBLISH STATUS
            ==================================================================== */}
        {activeTab === 'products' && (
          <section className="admin-panel animate-fade-in" aria-label="Daftar Produk">
            <div className="admin-panel__toolbar">
              {/* Search & Filter */}
              <div className="admin-search-wrap">
                <Search size={15} strokeWidth={2} className="admin-search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari produk berdasarkan nama atau target..."
                  className="admin-search-input"
                />
              </div>

              <div className="admin-filter-group">
                <button
                  type="button"
                  className={`admin-filter-btn ${statusFilter === 'all' ? 'admin-filter-btn--active' : ''}`}
                  onClick={() => setStatusFilter('all')}
                >
                  Semua ({productsList.length})
                </button>
                <button
                  type="button"
                  className={`admin-filter-btn ${statusFilter === 'published' ? 'admin-filter-btn--active' : ''}`}
                  onClick={() => setStatusFilter('published')}
                >
                  Live ({publishedCount})
                </button>
                <button
                  type="button"
                  className={`admin-filter-btn ${statusFilter === 'draft' ? 'admin-filter-btn--active' : ''}`}
                  onClick={() => setStatusFilter('draft')}
                >
                  Draf ({draftCount})
                </button>
              </div>

              <button
                type="button"
                onClick={handleResetCatalog}
                className="admin-btn-secondary"
                title="Kembalikan produk ke data awal pabrikan"
              >
                <RefreshCw size={14} strokeWidth={2} />
                <span>Reset Default</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>PRODUK</th>
                    <th>KATEGORI</th>
                    <th>VOLUME</th>
                    <th>STATUS PUBLIKASI</th>
                    <th className="text-right">AKSI CEPAT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="admin-table__empty">
                        Tidak ada produk yang cocok dengan pencarian & filter saat ini.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => {
                      const isPublished = p.status === 'published';
                      return (
                        <tr key={p.id}>
                          <td>
                            <div className="admin-prod-cell">
                              <div className="admin-prod-cell__thumb">
                                <img
                                  src={p.image || '/images/waterspot-cleaner.jpg'}
                                  alt={p.name}
                                  onError={(e) => {
                                    e.target.src = '/images/waterspot-cleaner.jpg';
                                  }}
                                />
                              </div>
                              <div className="admin-prod-cell__meta">
                                <strong className="admin-prod-cell__name">{p.name}</strong>
                                <span className="admin-prod-cell__slug">/{p.slug}</span>
                                {p.solvesProblem && (
                                  <span className="admin-prod-cell__solves">{p.solvesProblem}</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="admin-category-badge">{p.category}</span>
                          </td>
                          <td>
                            <span className="admin-volume-tag">{p.volume}</span>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleTogglePublish(p.id, p.status, p.name)}
                              className={`admin-status-pill ${isPublished ? 'admin-status-pill--published' : 'admin-status-pill--draft'}`}
                              title={isPublished ? 'Klik untuk simpan ke draf (sembunyikan)' : 'Klik untuk publikasikan ke website'}
                            >
                              {isPublished ? (
                                <>
                                  <Eye size={12} strokeWidth={2.5} />
                                  <span>PUBLISHED (LIVE)</span>
                                </>
                              ) : (
                                <>
                                  <EyeOff size={12} strokeWidth={2.5} />
                                  <span>DRAF (DISEMBUNYIKAN)</span>
                                </>
                              )}
                            </button>
                          </td>
                          <td className="text-right">
                            <div className="admin-actions-cell">
                              {isPublished && (
                                <Link
                                  to={`/produk/${p.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="admin-action-btn"
                                  title="Buka halaman produk di website"
                                >
                                  <ExternalLink size={13} strokeWidth={2} />
                                  <span>Lihat</span>
                                </Link>
                              )}

                              <button
                                type="button"
                                onClick={() => handleTogglePublish(p.id, p.status, p.name)}
                                className="admin-action-btn"
                                title={isPublished ? 'Tarik dari website utama (ubah status ke draf)' : 'Publikasikan langsung ke website utama'}
                              >
                                {isPublished ? (
                                  <>
                                    <EyeOff size={13} strokeWidth={2} />
                                    <span>Tarik Draf</span>
                                  </>
                                ) : (
                                  <>
                                    <Eye size={13} strokeWidth={2} />
                                    <span>Tayangkan</span>
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenDeleteModal(p)}
                                className="admin-action-btn admin-action-btn--delete"
                                title={`Hapus produk "${p.name}" ${isPublished ? 'dari publikasi & sistem' : ''}`}
                              >
                                <Trash2 size={13} strokeWidth={2} />
                                <span>Hapus</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ====================================================================
            TAB 2: FORM TAMBAH PRODUK BARU DENGAN UPLOAD FOTO
            ==================================================================== */}
        {activeTab === 'add' && (
          <section className="admin-panel animate-fade-in" aria-label="Tambah Produk Baru">
            <div className="admin-panel__header">
              <h2 className="admin-panel__title">Tambah Formulasi / Produk Baru</h2>
              <p className="admin-panel__sub">
                Lengkapi rincian produk, unggah foto resmi, dan terbitkan langsung ke website ATVIA.
              </p>
            </div>

            <form onSubmit={handleAddProductSubmit} className="admin-form">
              {/* ================= UPLOAD GAMBAR PRODUK ================= */}
              <div className="admin-image-upload-section">
                <span className="admin-form-label-block">
                  <ImageIcon size={13} strokeWidth={2} />
                  <span>FOTO KEMASAN PRODUK</span>
                </span>

                <div className="admin-image-upload-box">
                  {/* Preview Container */}
                  <div className="admin-image-preview-frame">
                    <img
                      src={imagePreview}
                      alt="Preview Produk"
                      className="admin-image-preview-img"
                      onError={(e) => {
                        e.target.src = '/images/waterspot-cleaner.jpg';
                      }}
                    />
                  </div>

                  {/* Upload Controls */}
                  <div className="admin-image-upload-controls">
                    <div className="admin-image-upload-actions">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={handleImageFileUpload}
                        style={{ display: 'none' }}
                        id="product-photo-upload"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="admin-btn-upload-trigger"
                      >
                        <Upload size={14} strokeWidth={2} />
                        <span>Pilih Foto dari Komputer / HP</span>
                      </button>

                      <span className="admin-image-upload-hint">
                        Format didukung: PNG, JPG, WEBP (Maksimal 3 MB).
                      </span>
                    </div>

                    {/* Preset ATVIA Bottle Options */}
                    <div className="admin-image-presets">
                      <span className="admin-image-presets-label">Atau gunakan foto botol standar ATVIA:</span>
                      <div className="admin-image-presets-list">
                        {PRESET_BOTTLE_IMAGES.map((preset) => {
                          const isSelected = formData.image === preset.path;
                          return (
                            <button
                              key={preset.path}
                              type="button"
                              className={`admin-image-preset-pill ${isSelected ? 'admin-image-preset-pill--active' : ''}`}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, image: preset.path }));
                                setImagePreview(preset.path);
                              }}
                            >
                              {isSelected && <Check size={11} strokeWidth={2.5} />}
                              <span>{preset.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Form Fields */}
              <div className="admin-form-grid">
                {/* Nama Produk */}
                <div className="admin-form-field">
                  <label htmlFor="prod-name">Nama Produk *</label>
                  <input
                    id="prod-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="Contoh: Ceramic Shield Spray"
                    className="admin-input"
                  />
                </div>

                {/* Slug URL */}
                <div className="admin-form-field">
                  <label htmlFor="prod-slug">Slug URL (Otomatis) *</label>
                  <input
                    id="prod-slug"
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="ceramic-shield-spray"
                    className="admin-input admin-input--mono"
                  />
                </div>

                {/* Kategori */}
                <div className="admin-form-field">
                  <label htmlFor="prod-cat">Kategori Formula *</label>
                  <select
                    id="prod-cat"
                    value={formData.categoryKey}
                    onChange={(e) => {
                      const selectedOpt = CATEGORY_OPTIONS.find((c) => c.key === e.target.value);
                      setFormData({
                        ...formData,
                        categoryKey: e.target.value,
                        category: selectedOpt ? selectedOpt.label : 'Perawatan Khusus Kendaraan'
                      });
                    }}
                    className="admin-select"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Volume Kemasan */}
                <div className="admin-form-field">
                  <label htmlFor="prod-vol">Isi Bersih / Volume *</label>
                  <input
                    id="prod-vol"
                    type="text"
                    required
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    placeholder="Contoh: 500 ml atau 1 Liter"
                    className="admin-input"
                  />
                </div>

                {/* Badge Highlight Formula */}
                <div className="admin-form-field">
                  <label htmlFor="prod-badge">Badge Formula</label>
                  <input
                    id="prod-badge"
                    type="text"
                    value={formData.highlightBadge}
                    onChange={(e) => setFormData({ ...formData, highlightBadge: e.target.value })}
                    placeholder="Contoh: Ceramic SiO2 Coating"
                    className="admin-input"
                  />
                </div>

                {/* Target Masalah */}
                <div className="admin-form-field">
                  <label htmlFor="prod-problem">Target Masalah Kendaraan</label>
                  <input
                    id="prod-problem"
                    type="text"
                    value={formData.solvesProblem}
                    onChange={(e) => setFormData({ ...formData, solvesProblem: e.target.value })}
                    placeholder="Contoh: Oksidasi cat & waterspot membandel"
                    className="admin-input"
                  />
                </div>
              </div>

              {/* Ringkasan Singkat */}
              <div className="admin-form-field">
                <label htmlFor="prod-summary">Ringkasan Produk (1-2 Kalimat) *</label>
                <textarea
                  id="prod-summary"
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Formula spray cepat dengan lapisan SiO2 untuk kilau reflektif cermin dan efek daun talas tahan cuaca."
                  className="admin-textarea"
                />
              </div>

              {/* Deskripsi Lengkap */}
              <div className="admin-form-field">
                <label htmlFor="prod-desc">Deskripsi Formulasi Laboratorium</label>
                <textarea
                  id="prod-desc"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Penjelasan teknis tentang bagaimana formula bekerja pada permukaan cat/kaca/plastik..."
                  className="admin-textarea"
                />
              </div>

              {/* Keunggulan Formula (Per Baris) */}
              <div className="admin-form-field">
                <label htmlFor="prod-benefits">Keunggulan Formulasi (Pisahkan Tiap Poin dengan Baris Baru)</label>
                <textarea
                  id="prod-benefits"
                  rows={3}
                  value={formData.benefitsText}
                  onChange={(e) => setFormData({ ...formData, benefitsText: e.target.value })}
                  placeholder="Poin 1&#10;Poin 2&#10;Poin 3"
                  className="admin-textarea"
                />
              </div>

              {/* Status Publikasi Radio Group */}
              <div className="admin-form-field">
                <span className="admin-form-label-block">Status Publikasi Awal</span>
                <div className="admin-radio-group">
                  <label className="admin-radio-label">
                    <input
                      type="radio"
                      name="prod-status"
                      value="published"
                      checked={formData.status === 'published'}
                      onChange={() => setFormData({ ...formData, status: 'published' })}
                    />
                    <div className="admin-radio-content">
                      <strong className="text-success">Langsung Publikasikan (Live)</strong>
                      <span>Produk akan langsung tampil di katalog website utama dan asisten produk.</span>
                    </div>
                  </label>

                  <label className="admin-radio-label">
                    <input
                      type="radio"
                      name="prod-status"
                      value="draft"
                      checked={formData.status === 'draft'}
                      onChange={() => setFormData({ ...formData, status: 'draft' })}
                    />
                    <div className="admin-radio-content">
                      <strong>Simpan Sebagai Draf</strong>
                      <span>Produk tersimpan di sistem namun disembunyikan dari publik.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="admin-form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="admin-btn-primary"
                >
                  <PlusCircle size={16} strokeWidth={2} />
                  <span>{isSubmitting ? 'Menyimpan...' : 'Simpan & Terbitkan Produk'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="admin-btn-secondary"
                >
                  Batal
                </button>
              </div>
            </form>
          </section>
        )}

        {/* ====================================================================
            TAB 3: LOG AUDIT & KEAMANAN TRANSPARAN
            ==================================================================== */}
        {activeTab === 'logs' && (
          <section className="admin-panel animate-fade-in" aria-label="Log Audit Transparansi">
            <div className="admin-panel__header">
              <h2 className="admin-panel__title">Log Audit Transparansi & Keamanan</h2>
              <p className="admin-panel__sub">
                Merekam riwayat seluruh aksi admin secara transparan untuk mencegah perubahan tidak sah.
              </p>
            </div>

            {/* Audit Log Table */}
            <div className="admin-table-container">
              <table className="admin-table admin-table--logs">
                <thead>
                  <tr>
                    <th>WAKTU & TANGGAL</th>
                    <th>AKSI SISTEM</th>
                    <th>DETAIL AKTIVITAS</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="admin-table__empty">
                        Belum ada rekaman aktivitas log audit.
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log) => {
                      const dateObj = new Date(log.timestamp);
                      const formattedTime = dateObj.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      });

                      return (
                        <tr key={log.id}>
                          <td className="admin-log-time">{formattedTime}</td>
                          <td>
                            <span className="admin-log-badge">{log.action}</span>
                          </td>
                          <td className="admin-log-desc">{log.details}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Security Passcode Change Box */}
            <div className="admin-sec-settings-card">
              <div className="admin-sec-settings-card__header">
                <Lock size={16} strokeWidth={2} className="admin-sec-icon" />
                <div>
                  <h3 className="admin-sec-title">Ubah Passcode Keamanan Admin</h3>
                  <p className="admin-sec-desc">
                    Tingkatkan keamanan berkala untuk mencegah pihak luar mengakses portal pengelolaan produk.
                  </p>
                </div>
              </div>

              {passcodeNotice && (
                <div className={`admin-notice-banner admin-notice-banner--${passcodeNotice.type}`}>
                  <span>{passcodeNotice.message}</span>
                </div>
              )}

              <form onSubmit={handleChangePasscodeSubmit} className="admin-passcode-form">
                <div className="admin-passcode-fields">
                  <input
                    type="password"
                    placeholder="Passcode Lama..."
                    value={passcodeForm.currentPass}
                    onChange={(e) => setPasscodeForm({ ...passcodeForm, currentPass: e.target.value })}
                    required
                    className="admin-input"
                  />
                  <input
                    type="password"
                    placeholder="Passcode Baru (min. 6 karakter)..."
                    value={passcodeForm.newPass}
                    onChange={(e) => setPasscodeForm({ ...passcodeForm, newPass: e.target.value })}
                    required
                    className="admin-input"
                  />
                  <input
                    type="password"
                    placeholder="Konfirmasi Passcode Baru..."
                    value={passcodeForm.confirmPass}
                    onChange={(e) => setPasscodeForm({ ...passcodeForm, confirmPass: e.target.value })}
                    required
                    className="admin-input"
                  />
                </div>
                <button type="submit" className="admin-btn-secondary">
                  <span>Perbarui Passcode</span>
                  <ArrowRight size={14} strokeWidth={2} />
                </button>
              </form>
            </div>
          </section>
        )}

        {/* ====================================================================
            MODAL KONFIRMASI HAPUS PRODUK (PUBLISHED & DRAF)
            ==================================================================== */}
        {productToDelete && (
          <div
            className="admin-modal-backdrop"
            onClick={() => setProductToDelete(null)}
            role="presentation"
          >
            <div
              className="admin-modal-card"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="admin-delete-modal-title"
            >
              <div className="admin-modal-header">
                <div className="admin-modal-header-icon admin-modal-header-icon--danger">
                  <Trash2 size={20} strokeWidth={2} />
                </div>
                <div className="admin-modal-header-text">
                  <h3 id="admin-delete-modal-title" className="admin-modal-title">
                    Konfirmasi Hapus Produk
                  </h3>
                  <p className="admin-modal-sub">
                    {productToDelete.status === 'published'
                      ? 'Peringatan: Produk ini saat ini sedang LIVE di website.'
                      : 'Hapus data produk draf secara permanen.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setProductToDelete(null)}
                  className="admin-modal-close-btn"
                  aria-label="Tutup dialog"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="admin-delete-preview">
                  <div className="admin-delete-preview__thumb">
                    <img
                      src={productToDelete.image || '/images/waterspot-cleaner.jpg'}
                      alt={productToDelete.name}
                      onError={(e) => {
                        e.target.src = '/images/waterspot-cleaner.jpg';
                      }}
                    />
                  </div>
                  <div className="admin-delete-preview__meta">
                    <strong className="admin-delete-preview__name">{productToDelete.name}</strong>
                    <span className="admin-delete-preview__info">
                      {productToDelete.category} • {productToDelete.volume}
                    </span>
                    <span
                      className={`admin-status-pill ${
                        productToDelete.status === 'published'
                          ? 'admin-status-pill--published'
                          : 'admin-status-pill--draft'
                      }`}
                    >
                      {productToDelete.status === 'published' ? 'PUBLISHED (LIVE)' : 'DRAF (DISEMBUNYIKAN)'}
                    </span>
                  </div>
                </div>

                {productToDelete.status === 'published' ? (
                  <div className="admin-delete-warning-box">
                    <AlertCircle size={16} strokeWidth={2} className="admin-delete-warning-icon" />
                    <span>
                      Menghapus produk ini akan <strong>mencabutnya seketika</strong> dari katalog publik website, halaman detail produk, dan sistem rekomendasi asisten formula.
                    </span>
                  </div>
                ) : (
                  <div className="admin-delete-warning-box admin-delete-warning-box--info">
                    <AlertCircle size={16} strokeWidth={2} className="admin-delete-warning-icon" />
                    <span>
                      Produk draf ini akan dihapus secara permanen dari basis data admin.
                    </span>
                  </div>
                )}
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setProductToDelete(null)}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="admin-btn-danger"
                  onClick={handleConfirmDelete}
                >
                  <Trash2 size={14} strokeWidth={2} />
                  <span>
                    {productToDelete.status === 'published'
                      ? 'Ya, Hapus Produk dari Live'
                      : 'Ya, Hapus Produk'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
