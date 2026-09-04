/**
 * progress-patch.js
 * ------------------------------------------------------------
 * Mencatat progres belajar ke cf-api BERDASARKAN AKTIVITAS MODUL —
 * setiap kali peserta yang sudah login & terdaftar membuka sebuah
 * modul (RPL/PBO/Robotika/dst), modul itu ditandai "selesai" lewat
 * POST /courses/:slug/progress. Backend meng-UPSERT baris di tabel
 * `progress` (UNIQUE user_id+course_id+module_id), jadi aman dibuka
 * berkali-kali — tidak dobel, tidak error.
 *
 * Sebelum patch ini tabel `progress` TIDAK PERNAH diisi siapa pun,
 * makanya "Rata-rata Progres per Kursus" (dashboard admin/instruktur)
 * dan "Progres Belajar Saya" (dashboard peserta) selalu 0%.
 *
 * Non-destructive: hanya membungkus components.learningModule SEKALI
 * LAGI (setelah dipercantik oleh learn-patch.js & materi-patch.js)
 * supaya bisa "menguping" setiap kali sebuah modul dirender — tanpa
 * mengubah file lain. Kegagalan kirim progres (belum login, belum
 * daftar, offline, dst) bersifat best-effort: tidak pernah mengganggu
 * pengalaman baca modul.
 *
 * Urutan <script> WAJIB: setelah learn-patch.js, materi-patch.js,
 * auth-patch.js, DAN catalog-patch.js (butuh CATALOG_COURSES).
 * ------------------------------------------------------------
 */
(function () {

    // subject key (learnLink di CATALOG_COURSES, mis. 'learn'/'pbo'/'robotika')
    // -> slug kursus di database (mis. 'rpl'/'pbo'/'robotika').
    // Diambil dari CATALOG_COURSES supaya otomatis sinkron kalau nanti
    // ada mata kuliah baru ditambahkan di sana (lihat materi-patch.js).
    function subjectToSlug(subjectKey) {
        const course = (window.CATALOG_COURSES || []).find(function (c) {
            return c.learnLink === subjectKey;
        });
        return course ? course.id : subjectKey; // fallback: subject == slug
    }

    // Cache per-tab supaya tidak spam network request kalau peserta
    // bolak-balik Sebelumnya/Berikutnya di modul yang sama. Aman dikirim
    // ulang (backend idempotent) — ini murni penghematan request.
    const sentThisSession = new Set();

    function trackModuleActivity(subjectKey, moduleId) {
        if (!moduleId) return;
        if (typeof auth === 'undefined' || !auth.isLoggedIn()) return;

        const slug     = subjectToSlug(subjectKey || 'learn');
        const cacheKey = slug + ':' + moduleId;
        if (sentThisSession.has(cacheKey)) return;
        sentThisSession.add(cacheKey);

        auth.apiFetch('/courses/' + slug + '/progress', {
            method: 'POST',
            body: JSON.stringify({ moduleId: moduleId, completed: true })
        }).catch(function () {
            // Best-effort — biarkan dicoba lagi di kunjungan berikutnya
            // (mis. kalau gagal karena offline atau belum sempat daftar).
            sentThisSession.delete(cacheKey);
        });
    }

    const _renderedBySoFar = components.learningModule;
    components.learningModule = function (d) {
        trackModuleActivity(d.subject, d.activeId);
        return _renderedBySoFar(d);
    };

})();
