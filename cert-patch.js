/**
 * cert-patch.js
 * ------------------------------------------------------------
 * Verifikasi sertifikat ASLI dari database (diterbitkan otomatis
 * oleh cf-api saat peserta lulus kuis — lihat quiz-patch.js &
 * index.js: POST /courses/:slug/quiz -> INSERT INTO certificates).
 *
 * Alur pencarian kode sertifikat, mis. web.navigate('cert/LMS-RPL-2026-AB12'):
 *   1. Cek dulu `pages.certificates` (daftar contoh statis di pages/cert.js)
 *      supaya contoh demo yang sudah ada tetap berfungsi instan tanpa
 *      network request.
 *   2. Kalau tidak ada di daftar statis, panggil cf-api:
 *      GET /certificates/:code (endpoint publik, tanpa login — lihat
 *      handleCertificateLookup di index.js) dan render hasilnya lewat
 *      komponen `certificate` yang sudah ada di script.js.
 *   3. Kalau keduanya tidak ketemu, tampilkan pesan "tidak ditemukan".
 *
 * Non-destructive: hanya membungkus web.resolveCertificate (sudah
 * didefinisikan di script.js) SEKALI LAGI, tanpa mengubah script.js.
 *
 * Urutan <script> WAJIB: setelah script.js (butuh web.resolveCertificate
 * & components.certificate) dan config.js (butuh APP_CONFIG.API_BASE_URL).
 * ------------------------------------------------------------
 */
(function () {

    const _origResolveCertificate = web.resolveCertificate.bind(web);

    web.resolveCertificate = function (id) {
        if (!id) return _origResolveCertificate(id); // tanpa ID -> form verifikasi (tidak diubah)

        const cleanId = id.split('?')[0];

        // 1) Contoh statis (demo) -- tetap didukung, instan.
        if (pages.certificates && pages.certificates[cleanId]) {
            return _origResolveCertificate(id);
        }

        // 2) Belum ketemu di daftar statis -> tanya cf-api secara async,
        //    sementara itu tampilkan status "memeriksa" dulu.
        fetchCertificateFromServer(cleanId);

        return [{
            section: 'titleHero',
            title: 'Memeriksa Sertifikat...',
            description: `Memvalidasi kode <strong>${cleanId}</strong> ke database, mohon tunggu sebentar.`
        }];
    };

    function fetchCertificateFromServer(code) {
        fetch(APP_CONFIG.API_BASE_URL + '/certificates/' + encodeURIComponent(code))
            .then(function (res) {
                return res.json().catch(function () { return {}; }).then(function (payload) {
                    return { status: res.status, payload: payload };
                });
            })
            .then(function (result) {
                if (result.payload && result.payload.ok) {
                    const c = result.payload.data;
                    ui.render('content', [{
                        section: 'certificate',
                        id: c.code,
                        name: c.name,
                        exam: c.title + (c.category ? ' (' + c.category + ')' : ''),
                        score: (c.score !== null && c.score !== undefined) ? Math.round(c.score) + '/100' : '-',
                        date: formatCertDate(c.issued_at)
                    }]);
                } else {
                    ui.render('content', [{
                        section: 'titleHero',
                        title: 'Sertifikat Tidak Ditemukan',
                        description: `Kode <strong>${code}</strong> tidak terdaftar dalam sistem kami.`
                    }]);
                }
                if (typeof svg !== 'undefined' && svg.di) svg.di();
            })
            .catch(function () {
                ui.render('content', [{
                    section: 'titleHero',
                    title: 'Gagal Memeriksa Sertifikat',
                    description: 'Terjadi kesalahan jaringan saat menghubungi server. Silakan coba lagi.'
                }]);
            });
    }

    function formatCertDate(iso) {
        if (!iso) return '-';
        try {
            const d = new Date(iso);
            return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch (e) {
            return iso;
        }
    }

})();
