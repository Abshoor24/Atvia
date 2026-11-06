/**
 * Authentication & Security Service for ATVIA Admin Portal
 * Features:
 * - Master Passcode verification
 * - Rate limiting (Max 5 attempts, 15-minute lockout against brute-force attacks)
 * - Session token with sliding expiration (2 hours)
 * - Transparent Audit Trail logging (atvia_audit_logs)
 */

const SESSION_KEY = 'atvia_admin_session';
const LOCKOUT_KEY = 'atvia_admin_lockout';
const AUDIT_KEY = 'atvia_audit_logs';

// Default Master Passcode for client administrator
// Can be customized or saved to localStorage
const DEFAULT_PASSCODE = 'atvia-admin-2026';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 Minutes
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 Hours

class AuthService {
  /**
   * Check if system is currently in lockout mode due to multiple failed attempts
   */
  getLockoutStatus() {
    try {
      const dataStr = localStorage.getItem(LOCKOUT_KEY);
      if (!dataStr) return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };

      const data = JSON.parse(dataStr);
      const now = Date.now();

      if (data.lockedUntil && data.lockedUntil > now) {
        const remainingSeconds = Math.ceil((data.lockedUntil - now) / 1000);
        return { isLocked: true, remainingSeconds, failedAttempts: data.failedAttempts || MAX_ATTEMPTS };
      }

      // If lockout expired, reset attempts
      if (data.lockedUntil && data.lockedUntil <= now) {
        localStorage.removeItem(LOCKOUT_KEY);
        return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
      }

      return { isLocked: false, remainingSeconds: 0, failedAttempts: data.failedAttempts || 0 };
    } catch {
      return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
    }
  }

  /**
   * Record a failed attempt
   */
  _recordFailedAttempt() {
    const status = this.getLockoutStatus();
    const newCount = (status.failedAttempts || 0) + 1;
    const now = Date.now();

    if (newCount >= MAX_ATTEMPTS) {
      const lockedUntil = now + LOCKOUT_DURATION_MS;
      localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ failedAttempts: newCount, lockedUntil }));
      this.logAudit('UPAYA_LOGIN_TERKUNCI', `Sistem mendeteksi ${newCount} kali percobaan gagal berturut-turut. Akses dibekukan selama 15 menit demi keamanan.`);
    } else {
      localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ failedAttempts: newCount, lockedUntil: null }));
      this.logAudit('UPAYA_LOGIN_GAGAL', `Kredensial tidak valid. Sisa percobaan: ${MAX_ATTEMPTS - newCount}.`);
    }
  }

  /**
   * Reset failed attempts after successful login
   */
  _resetFailedAttempts() {
    localStorage.removeItem(LOCKOUT_KEY);
  }

  /**
   * Get master passcode
   */
  getPasscode() {
    try {
      return localStorage.getItem('atvia_custom_passcode') || DEFAULT_PASSCODE;
    } catch {
      return DEFAULT_PASSCODE;
    }
  }

  /**
   * Set new master passcode
   */
  changePasscode(currentPass, newPass) {
    if (currentPass !== this.getPasscode()) {
      return { success: false, message: 'Kredensial saat ini tidak sesuai.' };
    }
    if (!newPass || newPass.trim().length < 6) {
      return { success: false, message: 'Passcode baru minimal 6 karakter.' };
    }

    localStorage.setItem('atvia_custom_passcode', newPass.trim());
    this.logAudit('GANTI_PASSCODE', 'Passcode keamanan administrator berhasil diperbarui.');
    return { success: true, message: 'Passcode berhasil diperbarui.' };
  }

  /**
   * Authenticate admin
   */
  login(inputPasscode) {
    const lockout = this.getLockoutStatus();
    if (lockout.isLocked) {
      const minutes = Math.ceil(lockout.remainingSeconds / 60);
      return {
        success: false,
        isLocked: true,
        remainingMinutes: minutes,
        message: `Akses dibekukan sementara demi keamanan. Silakan coba kembali dalam ${minutes} menit.`
      };
    }

    const actualPass = this.getPasscode();
    if (inputPasscode && inputPasscode.trim() === actualPass) {
      this._resetFailedAttempts();

      const session = {
        token: `atv_sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        loginAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
        role: 'SUPER_ADMIN',
        ipHint: 'Sesi Browser Terverifikasi'
      };

      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      this.logAudit('LOGIN_BERHASIL', 'Administrator berhasil masuk ke sistem manajemen produk.');
      return { success: true, message: 'Autentikasi berhasil.' };
    }

    this._recordFailedAttempt();
    const updatedStatus = this.getLockoutStatus();
    if (updatedStatus.isLocked) {
      return {
        success: false,
        isLocked: true,
        remainingMinutes: 15,
        message: 'Batas 5 kali percobaan terlampaui. Akses dibekukan selama 15 menit.'
      };
    }

    return {
      success: false,
      isLocked: false,
      remainingAttempts: MAX_ATTEMPTS - updatedStatus.failedAttempts,
      message: `Passcode tidak sesuai. Sisa kesempatan: ${MAX_ATTEMPTS - updatedStatus.failedAttempts} kali.`
    };
  }

  /**
   * Check if current session is authenticated and not expired
   */
  isAuthenticated() {
    try {
      const sessionStr = sessionStorage.getItem(SESSION_KEY);
      if (!sessionStr) return false;

      const session = JSON.parse(sessionStr);
      if (!session.token || !session.expiresAt) return false;

      const now = Date.now();
      const expiresAt = new Date(session.expiresAt).getTime();

      if (now > expiresAt) {
        this.logout();
        return false;
      }

      // Slide session on active use
      session.expiresAt = new Date(now + SESSION_TTL_MS).toISOString();
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get current session info
   */
  getSession() {
    try {
      const sessionStr = sessionStorage.getItem(SESSION_KEY);
      return sessionStr ? JSON.parse(sessionStr) : null;
    } catch {
      return null;
    }
  }

  /**
   * Logout admin
   */
  logout() {
    sessionStorage.removeItem(SESSION_KEY);
    this.logAudit('LOGOUT', 'Administrator keluar dari sesi kerja.');
  }

  /**
   * Transparent Audit Log Management
   */
  logAudit(action, details) {
    try {
      const logsStr = localStorage.getItem(AUDIT_KEY);
      const logs = logsStr ? JSON.parse(logsStr) : [];
      const newEntry = {
        id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        action,
        details,
        timestamp: new Date().toISOString()
      };
      logs.unshift(newEntry);
      // Keep maximum 100 recent logs
      if (logs.length > 100) logs.pop();
      localStorage.setItem(AUDIT_KEY, JSON.stringify(logs));
    } catch (e) {
      console.warn('Failed to save audit log', e);
    }
  }

  /**
   * Retrieve all audit logs
   */
  getAuditLogs() {
    try {
      const logsStr = localStorage.getItem(AUDIT_KEY);
      return logsStr ? JSON.parse(logsStr) : [];
    } catch {
      return [];
    }
  }

  /**
   * Clear audit logs (Admin only)
   */
  clearAuditLogs() {
    localStorage.removeItem(AUDIT_KEY);
    this.logAudit('BERSIHKAN_LOG', 'Log audit transparansi telah direset oleh admin.');
  }
}

export const authService = new AuthService();
export default authService;
