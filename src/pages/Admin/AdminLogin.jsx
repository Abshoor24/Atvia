import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  KeyRound
} from 'lucide-react';
import authService from '../../services/authService';
import './AdminLogin.css';

export default function AdminLogin() {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lockout, setLockout] = useState({ isLocked: false, remainingSeconds: 0, failedAttempts: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already authenticated
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  // Check lockout status and start countdown timer if locked
  useEffect(() => {
    const checkLockout = () => {
      const status = authService.getLockoutStatus();
      setLockout(status);
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Masukkan passcode keamanan admin.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const result = authService.login(passcode);
      setIsLoading(false);

      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(result.message);
        setLockout(authService.getLockoutStatus());
      }
    }, 250);
  };

  const formatCountdown = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <div className="admin-login-page">
      <div className="container admin-login__container">
        {/* Back Link */}
        <Link to="/" className="admin-login__back-link">
          <ArrowLeft size={14} strokeWidth={2} />
          <span>Kembali ke Website Utama</span>
        </Link>

        {/* Security Card Frame */}
        <div className="admin-login__card">
          {/* Header */}
          <div className="admin-login__header">
            <div className="admin-login__brand-badge">
              <ShieldCheck size={18} strokeWidth={2} className="admin-login__shield-icon" />
              <span>PORTAL ADMINISTRATOR ATVIA</span>
            </div>
            <h1 className="admin-login__title">Verifikasi Akses Pengelolaan Produk</h1>
            <p className="admin-login__sub">
              Area khusus terproteksi untuk mempublikasikan formula baru, mengelola status produk, dan memantau transparansi sistem.
            </p>
          </div>

          {/* Lockout Alert Banner */}
          {lockout.isLocked && (
            <div className="admin-login__lockout-banner" role="alert">
              <AlertTriangle size={18} strokeWidth={2} className="admin-login__lockout-icon" />
              <div>
                <strong>Akses Terkunci Sementara</strong>
                <p>
                  Sistem mendeteksi aktivitas mencurigakan. Akses dibekukan selama{' '}
                  <span className="admin-login__timer">{formatCountdown(lockout.remainingSeconds)}</span> demi menjaga keamanan dari pihak tidak bertanggung jawab.
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="admin-login__form">
            <div className="admin-login__field">
              <label htmlFor="admin-passcode" className="admin-login__label">
                <KeyRound size={13} strokeWidth={2} />
                <span>PASSCODE KEAMANAN ADMINISTRATOR</span>
              </label>

              <div className="admin-login__input-wrap">
                <input
                  id="admin-passcode"
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  disabled={lockout.isLocked || isLoading}
                  placeholder="Masukkan passcode admin..."
                  className={`admin-login__input ${errorMsg ? 'admin-login__input--error' : ''}`}
                  autoComplete="current-password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="admin-login__toggle-pass"
                  tabIndex={-1}
                  aria-label={showPasscode ? 'Sembunyikan passcode' : 'Tampilkan passcode'}
                >
                  {showPasscode ? <EyeOff size={15} strokeWidth={2} /> : <Eye size={15} strokeWidth={2} />}
                </button>
              </div>

              {errorMsg && !lockout.isLocked && (
                <div className="admin-login__error-msg" role="alert">
                  <AlertTriangle size={13} strokeWidth={2} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={lockout.isLocked || isLoading || !passcode}
              className="admin-login__submit-btn"
            >
              <Lock size={15} strokeWidth={2} />
              <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Portal Admin'}</span>
              <ArrowRight size={15} strokeWidth={2} />
            </button>
          </form>

          {/* Security Features & Client Demo Hint */}
          <div className="admin-login__security-info">
            <div className="admin-login__sec-row">
              <span className="admin-login__sec-bullet" />
              <span>Proteksi brute-force otomatis (Maksimal 5x percobaan gagal).</span>
            </div>
            <div className="admin-login__sec-row">
              <span className="admin-login__sec-bullet" />
              <span>Sesi terenkripsi aman dengan durasi aktif 2 jam.</span>
            </div>
            <div className="admin-login__sec-row">
              <span className="admin-login__sec-bullet" />
              <span>Seluruh aksi penerbitan produk tercatat transparan di log audit.</span>
            </div>

            <div className="admin-login__credentials-hint">
              <span className="admin-login__hint-badge">Kredensial Resmi Default</span>
              <code>atvia-admin-2026</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
