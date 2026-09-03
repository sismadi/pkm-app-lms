/**
 * auth-patch.js
 * ------------------------------------------------------------
 * Login/Register dengan akun Google (Google Identity Services)
 * terhubung ke cf-api (POST /auth/google) untuk memperoleh
 * token internal (HMAC) + role user (peserta/instruktur/admin).
 *
 * Pola: non-destructive patch — hanya MENAMBAH objek `auth` baru
 * dan beberapa properti ke `web`, tanpa mengubah script.js.
 * Prinsip: Reuse · DRY · Modular · Scalable.
 * ------------------------------------------------------------
 */

const auth = {

    STORAGE_KEY: 'ocw_auth_session',

    // ---------------------------------------------------------
    // Sesi (localStorage) — satu sumber kebenaran untuk seluruh app
    // ---------------------------------------------------------

    getSession: function () {
        try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || null; }
        catch (e) { return null; }
    },

    getToken: function () { const s = this.getSession(); return s ? s.token : null; },
    getUser:  function () { const s = this.getSession(); return s ? s.user  : null; },
    isLoggedIn: function () { return !!this.getToken(); },

    setSession: function (token, user) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ token: token, user: user }));
        this.renderAuthUI();
    },

    logout: function () {
        localStorage.removeItem(this.STORAGE_KEY);
        this.renderAuthUI();
        web.navigate('home');
    },

    // ---------------------------------------------------------
    // Wrapper fetch ke cf-api — otomatis sisipkan Bearer token
    // (dipakai ulang oleh dashboard-patch.js, form apa pun ke depannya)
    // ---------------------------------------------------------

    apiFetch: function (path, opts) {
        opts = opts || {};
        const token   = this.getToken();
        const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
        if (token) headers.Authorization = 'Bearer ' + token;
        return fetch(APP_CONFIG.API_BASE_URL + path, Object.assign({}, opts, { headers: headers }));
    },

    roleLabel: function (role) {
        return { admin: 'Admin', instruktur: 'Instruktur', peserta: 'Peserta' }[role] || 'Peserta';
    },

    // ---------------------------------------------------------
    // UI: tombol login / kartu profil di header
    // ---------------------------------------------------------

    renderAuthUI: function () {
        const slot = web.gebi('authSlot');
        if (!slot) return;
        const user = this.getUser();

        if (!user) {
            slot.innerHTML = '<div id="google-btn-header"></div>';
            this.renderGoogleButton('google-btn-header');
            return;
        }

        slot.innerHTML =
            '<div class="auth-chip" onclick="web.navigate(\'dashboard\')" title="Buka dashboard saya">' +
                (user.picture ? '<img src="' + user.picture + '" class="auth-avatar" alt="' + user.name + '">' : '') +
                '<span class="auth-name">' + user.name + '</span>' +
                '<span class="badge auth-role">' + this.roleLabel(user.role) + '</span>' +
            '</div>' +
            '<button class="slcBtn auth-logout" onclick="auth.logout()">Keluar</button>';
    },

    /** Render tombol "Sign in with Google" ke elemen manapun (dipakai di header & loginGate) */
    renderGoogleButton: function (elId) {
        const el = web.gebi(elId);
        if (!el || typeof google === 'undefined' || !google.accounts) return;
        google.accounts.id.renderButton(el, {
            theme: 'outline', size: 'medium', text: 'signin_with', shape: 'pill'
        });
    },

    initGoogle: function () {
        if (typeof google === 'undefined' || !google.accounts) return;
        google.accounts.id.initialize({
            client_id: APP_CONFIG.GOOGLE_CLIENT_ID,
            callback: auth.handleCredential
        });
        this.renderAuthUI();
    },

    /** Callback GIS setelah user memilih akun Google — verifikasi via cf-api */
    handleCredential: function (response) {
        fetch(APP_CONFIG.API_BASE_URL + '/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential })
        })
        .then(function (r) { return r.json(); })
        .then(function (payload) {
            if (!payload.ok) { alert('Login gagal: ' + (payload.error || 'unknown error')); return; }
            auth.setSession(payload.data.token, payload.data.user);
            web.navigate('dashboard');
        })
        .catch(function (e) { alert('Login gagal: ' + e.message); });
    }
};

// Inisialisasi setelah GIS script (async/defer) siap
window.addEventListener('load', function () {
    (function tryInit() {
        if (typeof google !== 'undefined' && google.accounts) auth.initGoogle();
        else setTimeout(tryInit, 200);
    })();
});
