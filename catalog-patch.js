/**
 * catalog-patch.js
 * ------------------------------------------------------------
 * Katalog Kursus di halaman Home + alur pendaftaran (enroll).
 *
 * Alur:
 *  1. Home menampilkan katalog kursus (RPL, PBO, Robotika) lewat
 *     komponen baru `courseCatalog`, tiap card berisi periode
 *     pendaftaran, instruktur, jumlah modul, deskripsi & harga.
 *  2. Tombol "Daftar" -> enrollCourse(id):
 *       - belum login  -> buka modal login Google, simpan niat
 *         daftar (pending), lalu otomatis lanjut daftar setelah
 *         login berhasil.
 *       - sudah login  -> langsung terdaftar: disimpan lokal
 *         (localStorage, per akun) & dicoba juga ke cf-api
 *         (best-effort, tidak memblokir kalau endpoint belum ada).
 *  3. dashboard-patch.js akan menggabungkan pendaftaran lokal ini
 *     ke dalam "Kursus Saya" pada dashboard peserta, jadi begitu
 *     daftar, kursus langsung muncul di profil.
 *
 * Non-destructive patch: hanya MENAMBAH — tidak mengubah script.js,
 * auth-patch.js, atau dashboard-patch.js secara langsung (kecuali
 * merge kecil di dashboard-patch.js untuk menampilkan hasilnya).
 * ------------------------------------------------------------
 */

const CATALOG_COURSES = [
    {
        id: 'rpl',
        title: 'Rekayasa Perangkat Lunak',
        category: 'RPL',
        icon: 'di-web',
        description: '16 modul terstruktur: studi kelayakan, pemilihan model SDLC, rekayasa kebutuhan, pemodelan DFD & desain perangkat lunak, hingga strategi pengujian White Box/Black Box dan Software Quality Assurance.',
        period: '1 Agustus \u2014 30 September 2026',
        instructor: 'Wawan Sismadi, S.Kom., M.T.',
        moduleCount: 16,
        price: 'Gratis',
        learnLink: 'learn'
    },
    {
        id: 'pbo',
        title: 'Pemrograman Berorientasi Objek',
        category: 'PBO',
        icon: 'di-code',
        description: 'Konsep dasar OOP — class, object, inheritance, polymorphism, dan encapsulation — hingga penerapan design pattern umum lewat studi kasus aplikasi nyata.',
        period: '1 Agustus \u2014 30 September 2026',
        instructor: 'Tim Pengajar PBO',
        moduleCount: 12,
        price: 'Gratis',
        learnLink: 'pbo'
    },
    {
        id: 'robotika',
        title: 'Robotika Dasar',
        category: 'Robotika',
        icon: 'di-setting',
        description: 'Pengantar sistem robotika: sensor & aktuator, kinematika dasar, mikrokontroler, hingga pemrograman logika kendali robot sederhana.',
        period: '1 September \u2014 31 Oktober 2026',
        instructor: 'Tim Pengajar Robotika',
        moduleCount: 10,
        price: 'Gratis',
        learnLink: 'robotika'
    }
];

// Diekspos supaya dashboard-patch.js bisa membaca judul/kategori kursus
// saat menggabungkan pendaftaran lokal ke "Kursus Saya".
window.CATALOG_COURSES = CATALOG_COURSES;

(function () {

    // -----------------------------------------------------------
    // 1. Penyimpanan pendaftaran (lokal, per akun) — sumber kebenaran
    //    sisi klien selama endpoint enroll di backend belum tentu ada.
    // -----------------------------------------------------------

    const ENROLL_KEY = 'ocw_enrollments';

    function _allEnrollments() {
        try { return JSON.parse(localStorage.getItem(ENROLL_KEY)) || {}; }
        catch (e) { return {}; }
    }

    function _userKey() {
        const u = (typeof auth !== 'undefined') ? auth.getUser() : null;
        return u ? (u.email || u.id || u.name) : null;
    }

    function isEnrolled(courseId) {
        const key = _userKey();
        if (!key) return false;
        const all = _allEnrollments();
        return !!(all[key] && all[key].indexOf(courseId) !== -1);
    }

    function saveEnrollment(courseId) {
        const key = _userKey();
        if (!key) return;
        const all = _allEnrollments();
        if (!all[key]) all[key] = [];
        if (all[key].indexOf(courseId) === -1) all[key].push(courseId);
        localStorage.setItem(ENROLL_KEY, JSON.stringify(all));
    }

    /** Dipakai oleh dashboard-patch.js untuk menggabungkan ke "Kursus Saya". */
    window.getLocalEnrollments = function () {
        const key = _userKey();
        if (!key) return [];
        const all = _allEnrollments();
        return all[key] || [];
    };

    // -----------------------------------------------------------
    // 2. Pendaftaran tertunda — kalau user klik "Daftar" sebelum login
    // -----------------------------------------------------------

    const PENDING_KEY = 'ocw_pending_enroll';
    function setPending(courseId)  { sessionStorage.setItem(PENDING_KEY, courseId); }
    function getPending()          { return sessionStorage.getItem(PENDING_KEY); }
    function clearPending()        { sessionStorage.removeItem(PENDING_KEY); }

    // Sisipkan hook: begitu sesi login berhasil dibuat, selesaikan
    // pendaftaran yang tertunda (kalau ada), tanpa mengubah auth-patch.js.
    const _origSetSession = auth.setSession.bind(auth);
    auth.setSession = function (token, user) {
        _origSetSession(token, user);
        const pending = getPending();
        if (pending) {
            clearPending();
            closeEnrollLoginModal(true);
            completeEnroll(pending, true);
        }
    };

    // -----------------------------------------------------------
    // 3. Proses pendaftaran
    // -----------------------------------------------------------

    // CATATAN PERBAIKAN: sebelumnya fungsi ini langsung menganggap
    // pendaftaran "berhasil" begitu tersimpan di localStorage, lalu
    // memanggil cf-api secara best-effort dan MEMBUNGKAM errornya
    // (`.catch(function(){})`). Akibatnya tombol berubah jadi
    // "Terdaftar" walau request ke database sama sekali gagal (backend
    // waktu itu memang belum punya endpoint /courses/:id/enroll yang
    // benar -- lihat perbaikan di pkm-api-lms/index.js).
    //
    // Sekarang: localStorage hanya diisi SETELAH backend mengonfirmasi
    // sukses. Kalau backend gagal (belum login, endpoint error, dsb),
    // user diberi tahu jujur dan tombol kembali ke "Daftar".
    function completeEnroll(courseId, fromLogin) {
        const course = CATALOG_COURSES.find(function (c) { return c.id === courseId; });
        const namaKursus = course ? course.title : 'Kursus';
        const btn = document.getElementById('enrollBtn-' + courseId);

        if (btn) { btn.disabled = true; btn.textContent = 'Mendaftarkan...'; }

        auth.apiFetch('/courses/' + courseId + '/enroll', { method: 'POST' })
            .then(function (res) {
                return res.json().catch(function () { return {}; }).then(function (payload) {
                    return { status: res.status, payload: payload };
                });
            })
            .then(function (result) {
                if (result.status === 401) {
                    if (btn) { btn.disabled = false; btn.textContent = '\u{1F4DD} Daftar'; }
                    auth.logout();
                    return;
                }
                if (!result.payload || !result.payload.ok) {
                    if (btn) { btn.disabled = false; btn.textContent = '\u{1F4DD} Daftar'; }
                    window.alert(
                        '\u274C Gagal mendaftar ke ' + namaKursus + ': ' +
                        (result.payload && result.payload.error ? result.payload.error : 'terjadi kesalahan pada server')
                    );
                    return;
                }

                // Backend sudah konfirmasi baris masuk ke tabel `enrollments`
                // di D1 -- baru sekarang aman ditandai terdaftar secara lokal.
                saveEnrollment(courseId);
                refreshCatalogButtons();

                window.alert(
                    '\u2705 ' + namaKursus + ' berhasil ditambahkan ke profil kamu' +
                    (fromLogin ? ' setelah login.' : '.') +
                    ' Cek di menu Dashboard.'
                );

                const currentSlug = (window.location.search.substring(1) || '').split('/')[0];
                if (currentSlug === 'dashboard') web.navigate('dashboard');
            })
            .catch(function (e) {
                if (btn) { btn.disabled = false; btn.textContent = '\u{1F4DD} Daftar'; }
                window.alert('\u274C Gagal mendaftar (jaringan/server): ' + e.message);
            });
    }

    window.enrollCourse = function (courseId) {
        if (!auth.isLoggedIn()) {
            setPending(courseId);
            openEnrollLoginModal();
            return;
        }
        completeEnroll(courseId, false);
    };

    // -----------------------------------------------------------
    // 4. Modal "masuk dulu" — reuse gaya .learn-modal yang sudah ada
    // -----------------------------------------------------------

    function ensureEnrollModal() {
        let modal = document.getElementById('enrollLoginModal');
        if (modal) return modal;

        document.body.insertAdjacentHTML('beforeend', `
<div id="enrollLoginModal" class="learn-modal">
    <div class="learn-modal-content" style="max-width:380px;">
        <div class="learn-modal-header">
            <span class="learn-modal-header-title">&#x1F512; Masuk untuk Mendaftar</span>
            <span class="learn-modal-close" onclick="closeEnrollLoginModal()">&#x2715; Tutup</span>
        </div>
        <div class="learn-modal-body" style="text-align:center;">
            <p>Masuk dengan akun Google untuk mendaftar kursus ini.<br>Kursus akan otomatis ditambahkan ke profil kamu setelah masuk.</p>
            <div id="google-btn-enroll" style="display:flex;justify-content:center;margin-top:14px;"></div>
        </div>
    </div>
</div>`);
        return document.getElementById('enrollLoginModal');
    }

    function openEnrollLoginModal() {
        const modal = ensureEnrollModal();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        auth.renderGoogleButton('google-btn-enroll');
    }

    window.closeEnrollLoginModal = function (skipClearPending) {
        const modal = document.getElementById('enrollLoginModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (!skipClearPending) clearPending();
    };

    // Tutup modal enroll juga saat klik area gelap di luar konten, atau Esc
    // (dipasang di capture phase — lihat catatan di learn-patch.js soal
    // kenapa ini penting untuk mencegah overflow tersangkut 'hidden').
    window.addEventListener('click', function (event) {
        const modal = document.getElementById('enrollLoginModal');
        if (event.target === modal) closeEnrollLoginModal();
    }, true);
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeEnrollLoginModal();
    });

    // -----------------------------------------------------------
    // 5. Refresh tombol "Daftar" -> "Terdaftar" tanpa render ulang halaman
    // -----------------------------------------------------------

    function refreshCatalogButtons() {
        CATALOG_COURSES.forEach(function (c) {
            const btn = document.getElementById('enrollBtn-' + c.id);
            if (!btn) return;
            if (isEnrolled(c.id)) {
                btn.textContent = '\u2705 Terdaftar';
                btn.disabled = true;
                btn.classList.add('btn-success');
            }
        });
    }

    // Sumber kebenaran sesungguhnya adalah database, bukan localStorage
    // (localStorage cuma cache biar tombol responsif tanpa nunggu fetch).
    // Begitu halaman dibuka & user sudah login, tarik status pendaftaran
    // asli dari /dashboard (sudah difilter server-side per user) supaya
    // "Terdaftar" tetap benar walau dibuka dari HP/browser lain.
    function syncEnrollmentsFromServer() {
        if (typeof auth === 'undefined' || !auth.isLoggedIn()) return;
        auth.apiFetch('/dashboard')
            .then(function (res) { return res.ok ? res.json() : null; })
            .then(function (payload) {
                if (!payload || !payload.ok || payload.data.role !== 'peserta') return;
                (payload.data.myCourses || []).forEach(function (c) {
                    if (c.slug) saveEnrollment(c.slug);
                });
                refreshCatalogButtons();
            })
            .catch(function () { /* diam-diam gagal, cache lokal tetap dipakai sbg fallback */ });
    }

    window.addEventListener('load', function () {
        refreshCatalogButtons();
        syncEnrollmentsFromServer();
    });

    // -----------------------------------------------------------
    // 6. Komponen render: Katalog Kursus
    // -----------------------------------------------------------

    components.courseCatalog = function (d) {
        const items = d.items || CATALOG_COURSES;
        return `
            <div class="row page4">
                <div class="artikel" style="width:100%;">
                    ${d.title ? `<h2>${d.title}</h2><hr>` : ''}
                    ${d.description ? `<p>${d.description}</p>` : ''}
                    <div class="catalog-grid">
                        ${items.map(function (c) {
                            const enrolled = isEnrolled(c.id);
                            return `
                            <div class="catalog-card">
                                <div class="catalog-card-head">
                                    <i class="${c.icon} img-32"></i>
                                    <span class="badge">${c.category}</span>
                                </div>
                                <h3>${c.title}</h3>
                                <p class="catalog-desc">${c.description}</p>
                                <ul class="catalog-meta">
                                    <li><strong>Pendaftaran dibuka:</strong> ${c.period}</li>
                                    <li><strong>Instruktur:</strong> ${c.instructor}</li>
                                    <li><strong>Jumlah modul:</strong> ${c.moduleCount} modul</li>
                                    <li><strong>Harga:</strong> <span class="catalog-price">${c.price}</span></li>
                                </ul>
                                <div class="catalog-actions">
                                    ${c.learnLink ? `<button class="slcBtn" style="background:#555;" onclick="web.navigate('${c.learnLink}')">Lihat Materi</button>` : ''}
                                    <button id="enrollBtn-${c.id}"
                                        class="slcBtn${enrolled ? ' btn-success' : ''}"
                                        style="background:var(--aColor);color:#fff;"
                                        ${enrolled ? 'disabled' : ''}
                                        onclick="enrollCourse('${c.id}')">
                                        ${enrolled ? '\u2705 Terdaftar' : '\u{1F4DD} Daftar'}
                                    </button>
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            </div>`;
    };

})();
