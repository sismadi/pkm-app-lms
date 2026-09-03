/**
 * config.js — Konfigurasi terpusat aplikasi (Modular · DRY)
 * Ganti nilai di bawah sesuai deployment kamu.
 */
const APP_CONFIG = {
    // URL Worker cf-api (lihat tab Domains di Cloudflare dashboard-mu)
    API_BASE_URL: 'https://cf-api.sismadi.workers.dev',

    // OAuth 2.0 Client ID dari Google Cloud Console
    // (Credentials → Create Credentials → OAuth Client ID → Web application)
    GOOGLE_CLIENT_ID: 'ganti-dengan-client-id.apps.googleusercontent.com'
};
