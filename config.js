/**
 * config.js — Konfigurasi terpusat aplikasi (Modular · DRY)
 * Ganti nilai di bawah sesuai deployment kamu.
 */
const APP_CONFIG = {
    // URL Worker cf-api (lihat tab Domains di Cloudflare dashboard-mu)
    API_BASE_URL: 'https://pkm-api-lms.sismadi.workers.dev',

    // OAuth 2.0 Client ID dari Google Cloud Console
    // (Credentials → Create Credentials → OAuth Client ID → Web application)
    GOOGLE_CLIENT_ID: '657734502201-3nashfia0j8u3p1lu1n3tpl3tk22p8om.apps.googleusercontent.com'
};
