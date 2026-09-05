/**
 * dashboard-quiz-patch.js
 * ------------------------------------------------------------
 * Menampilkan status & nilai kuis per kursus, serta daftar
 * sertifikat yang sudah diperoleh, di dashboard peserta.
 *
 * Data sudah disertakan langsung oleh cf-api pada respons
 * GET /dashboard (field `quiz` & `certificate` di tiap item
 * `myCourses`, plus array `myCertificates`) — lihat
 * handlePrivateDashboard() di index.js. Patch ini murni menambah
 * tampilan, tidak menambah request baru.
 *
 * Non-destructive: mengganti `renderPrivateDashboard` (didefinisikan
 * sebagai deklarasi fungsi global di dashboard-patch.js, sehingga bisa
 * ditimpa lewat `window.renderPrivateDashboard`) — HANYA untuk cabang
 * peserta. Cabang admin/instruktur tetap memanggil versi asli supaya
 * tidak ada duplikasi logika.
 *
 * Urutan <script> WAJIB: setelah dashboard-patch.js (butuh
 * `renderPrivateDashboard` & `mergeLocalEnrollments`) dan
 * catalog-patch.js (butuh CATALOG_COURSES, dipakai mergeLocalEnrollments).
 * ------------------------------------------------------------
 */
(function () {

    const _origRenderPrivateDashboard = window.renderPrivateDashboard;

    window.renderPrivateDashboard = function (data) {
        // Admin & instruktur: tidak berubah, pakai versi asli.
        if (data.role !== 'peserta') {
            _origRenderPrivateDashboard(data);
            return;
        }

        const user = auth.getUser();
        const avg  = data.summary.rataRataProgress || 0;
        const myCourses = (typeof mergeLocalEnrollments === 'function')
            ? mergeLocalEnrollments(data.myCourses || [])
            : (data.myCourses || []);

        const totalKuisLulus  = myCourses.filter(function (c) { return c.quiz && c.quiz.status === 'lulus'; }).length;
        const myCertificates  = data.myCertificates || myCourses
            .filter(function (c) { return c.certificate && c.certificate.code; })
            .map(function (c) { return { courseTitle: c.title, category: c.category, code: c.certificate.code }; });

        const sections = [
            { section: 'titleHero',
              title: 'Dashboard ' + auth.roleLabel(data.role),
              description: 'Selamat datang, ' + (user ? user.name : '') + '.' },
            { section: 'statGrid', items: [
                { label: 'Kursus Diikuti',    value: myCourses.length },
                { label: 'Rata-rata Progres', value: avg + '%' },
                { label: 'Kuis Lulus',        value: totalKuisLulus },
                { label: 'Sertifikat',        value: myCertificates.length }
            ]},
            { section: 'quizProgressList', title: 'Progres Belajar &amp; Kuis Saya', items: myCourses }
        ];

        if (myCertificates.length) {
            sections.push({ section: 'certificateList', items: myCertificates });
        }

        ui.render('content', sections);
        if (typeof svg !== 'undefined' && svg.di) svg.di();
    };

    // -----------------------------------------------------------
    // KOMPONEN RENDER BARU
    // -----------------------------------------------------------

    /** Progres modul + badge status kuis + tombol kerjakan/ulangi kuis, per kursus. */
    components.quizProgressList = function (d) {
        const items = d.items || [];
        return (
            '<div class="row page"><div class="artikel">' +
            (d.title ? '<h3>' + d.title + '</h3><hr>' : '') +
            (items.length ? items.map(function (it) {
                const pct  = it.progressPct || 0;
                const slug = it.slug || it.id;
                const quiz = it.quiz || {};

                let badgeClass = 'badge-muted', badgeText = 'Belum Dikerjakan';
                if (quiz.status === 'lulus') {
                    badgeClass = 'badge-success'; badgeText = 'Lulus';
                } else if (quiz.status === 'belum_lulus' || quiz.attempts) {
                    badgeClass = 'badge-warning'; badgeText = 'Belum Lulus';
                }
                const nilai = (quiz.bestScore !== null && quiz.bestScore !== undefined)
                    ? Math.round(quiz.bestScore) : null;

                const quizBtn = (slug && window.QUIZ_BANK && window.QUIZ_BANK[slug])
                    ? '<button class="slcBtn" onclick="web.navigate(\'quiz/' + slug + '\')">' +
                      (quiz.attempts ? '\u21bb Ulangi Kuis' : '\u{1F4DD} Kerjakan Kuis') + '</button>'
                    : '';

                return (
                    '<div class="skill-item">' +
                        '<div class="skill-info"><strong>' + it.title + '</strong> ' +
                        (it.category ? '<small>(' + it.category + ')</small> ' : '') +
                        '<small>' + pct + '% modul selesai</small></div>' +
                        '<div class="skill-track"><div class="skill-fill" style="width:' + pct + '%"></div></div>' +
                        '<div class="quiz-row" style="margin-top:6px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
                            '<span class="badge ' + badgeClass + '">Kuis: ' + badgeText + (nilai !== null ? ' (' + nilai + ')' : '') + '</span>' +
                            quizBtn +
                        '</div>' +
                    '</div>'
                );
            }).join('') : '<p>Belum ada data.</p>') +
            '</div></div>'
        );
    };

    /** Daftar sertifikat yang sudah diperoleh peserta. */
    components.certificateList = function (d) {
        const items = d.items || [];
        return (
            '<div class="row page"><div class="artikel">' +
                '<h3>\u{1F393} Sertifikat Saya</h3><hr>' +
                '<div class="info-card-grid">' +
                    items.map(function (it) {
                        return (
                            '<div class="info-card">' +
                                '<strong>' + it.courseTitle + '</strong>' +
                                (it.category ? '<p><small>' + it.category + '</small></p>' : '') +
                                '<p>Kode: <code>' + it.code + '</code></p>' +
                                '<button class="slcBtn" onclick="web.navigate(\'cert/' + it.code + '\')">Lihat &amp; Cetak</button>' +
                            '</div>'
                        );
                    }).join('') +
                '</div>' +
            '</div></div>'
        );
    };

})();
