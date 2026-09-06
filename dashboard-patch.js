/**
 * dashboard-patch.js
 * ------------------------------------------------------------
 * Dashboard privat (role-aware: peserta/instruktur/admin) dan
 * dashboard umum/publik — konsumsi cf-api (/dashboard, /dashboard/public).
 *
 * Non-destructive patch:
 *  - Menambah 2 rute baru ke `web.routes`
 *  - Menambah 2 resolver ke `web`
 *  - Menambah 4 komponen render ke `components` (statGrid, barChart,
 *    progressList, loginGate) — dipakai ulang lintas role (DRY).
 * ------------------------------------------------------------
 */

// -----------------------------------------------------------
// 1. ROUTING
// -----------------------------------------------------------

web.routes.dashboard = 'resolveDashboard'; // privat, isi berbeda per role
web.routes.stats     = 'resolveStats';     // publik, tanpa login

web.resolveDashboard = function (sub) {
    const user = auth.getUser();

    if (!user) {
        return [
            { section: 'titleHero', title: 'Dashboard Privat',
              description: 'Masuk dengan akun Google untuk melihat dashboard sesuai peran Anda (peserta, instruktur, atau admin).' },
            { section: 'loginGate' }
        ];
    }

    loadPrivateDashboard(); // async — akan menimpa #content saat data siap
    return [
        { section: 'titleHero',
          title: 'Dashboard ' + auth.roleLabel(user.role),
          description: 'Selamat datang, ' + user.name + '.' },
        { section: 'loading', text: 'Memuat data dashboard...' }
    ];
};

web.resolveStats = function () {
    loadPublicDashboard(); // async
    return [
        { section: 'titleHero', title: 'Statistik Publik',
          description: 'Ringkasan aktivitas belajar di platform OCW-RPL — terbuka untuk semua orang.' },
        { section: 'loading', text: 'Memuat statistik...' }
    ];
};

// -----------------------------------------------------------
// 2. DATA LOADER — privat (role-aware)
// -----------------------------------------------------------

function loadPrivateDashboard() {
    auth.apiFetch('/dashboard')
        .then(function (res) {
            if (res.status === 401) { auth.logout(); return null; }
            return res.json();
        })
        .then(function (payload) {
            if (!payload) return;
            if (!payload.ok) {
                ui.render('content', [{ section: 'titleHero', title: 'Gagal memuat dashboard', description: payload.error }]);
                return;
            }
            renderPrivateDashboard(payload.data);
        })
        .catch(function (e) {
            ui.render('content', [{ section: 'titleHero', title: 'Gagal memuat dashboard', description: e.message }]);
        });
}

/**
 * Gabungkan kursus yang didaftarkan lewat katalog Home (disimpan
 * lokal oleh catalog-patch.js, karena endpoint enroll di cf-api
 * mungkin belum tersedia) ke daftar kursus dari server — supaya
 * peserta langsung melihat kursus barunya di dashboard tanpa
 * menunggu backend menyusul. Kursus yang sudah dikenal server
 * tidak diduplikasi.
 */
function mergeLocalEnrollments(serverCourses) {
    const merged = serverCourses.slice();
    if (typeof window.getLocalEnrollments !== 'function' || !window.CATALOG_COURSES) return merged;

    window.getLocalEnrollments().forEach(function (courseId) {
        const already = merged.some(function (c) {
            return c.id === courseId || c.courseId === courseId || c.slug === courseId;
        });
        if (already) return;

        const meta = window.CATALOG_COURSES.find(function (c) { return c.id === courseId; });
        if (meta) {
            merged.push({ id: meta.id, title: meta.title, category: meta.category, progressPct: 0 });
        }
    });

    return merged;
}

function renderPrivateDashboard(data) {
    const user = auth.getUser();
    const sections = [
        { section: 'titleHero',
          title: 'Dashboard ' + auth.roleLabel(data.role),
          description: 'Selamat datang, ' + (user ? user.name : '') + '.' }
    ];

    // PATCH: admin & instruktur SEKARANG dipisah (sebelumnya digabung
    // menjadi satu cabang "ringkasan seluruh platform"). Instruktur
    // kini hanya melihat kursus yang benar-benar dia ampu — lihat
    // handlePrivateDashboard() di cf-api (cabang role === 'instruktur').
    if (data.role === 'admin') {
        sections.push({
            section: 'statGrid',
            items: [
                { label: 'Total Peserta',     value: data.summary.totalPeserta },
                { label: 'Total Instruktur',  value: data.summary.totalInstruktur },
                { label: 'Total Kursus',      value: data.summary.totalCourses },
                { label: 'Total Pendaftaran', value: data.summary.totalEnrollments }
            ]
        });
        sections.push({
            section: 'barChart',
            title: 'Kursus Terbaik — Berdasarkan Jumlah Peserta',
            items: (data.topCourses || []).map(function (c) {
                return { label: c.title, value: c.enrolledCount };
            })
        });
        sections.push({
            section: 'progressList',
            title: 'Rata-rata Progres per Kursus',
            items: (data.allCourses || []).map(function (c) {
                return { title: c.title, category: c.category, progressPct: c.avgProgress };
            })
        });
        sections.push({
            section: 'adminCallout',
            text: 'Untuk mengangkat peserta menjadi instruktur, atau menugaskan kursus ke instruktur, buka Panel Admin.',
            linkLabel: 'Buka Panel Admin',
            linkSlug: 'admin'
        });
    } else if (data.role === 'instruktur') {
        // Dashboard Instruktur: berapa kursus yang diampu, berapa
        // peserta di tiap kursus, rata-rata progres, & lulus kuis.
        const myCourses = data.myCourses || [];
        sections.push({
            section: 'statGrid',
            items: [
                { label: 'Kursus Diampu',     value: data.summary.totalKursus },
                { label: 'Total Peserta',     value: data.summary.totalPeserta },
                { label: 'Rata-rata Progres', value: (data.summary.rataRataProgress || 0) + '%' },
                { label: 'Lulus Kuis',        value: data.summary.totalLulusKuis }
            ]
        });
        sections.push({
            section: 'courseStatTable',
            title: 'Kursus yang Saya Ampu',
            emptyText: 'Anda belum ditugaskan mengampu kursus apa pun. Hubungi admin untuk penugasan kursus.',
            items: myCourses.map(function (c) {
                return {
                    title: c.title, category: c.category,
                    enrolledCount: c.enrolledCount, avgProgress: c.avgProgress,
                    lulusCount: c.lulusCount
                };
            })
        });
    } else {
        const avg = data.summary.rataRataProgress || 0;
        const myCourses = mergeLocalEnrollments(data.myCourses || []);
        sections.push({
            section: 'statGrid',
            items: [
                { label: 'Kursus Diikuti',   value: myCourses.length },
                { label: 'Rata-rata Progres', value: avg + '%' }
            ]
        });
        sections.push({
            section: 'progressList',
            title: 'Progres Belajar Saya',
            items: myCourses.map(function (c) {
                return { title: c.title, category: c.category, progressPct: c.progressPct || 0 };
            })
        });
    }

    ui.render('content', sections);
    if (typeof svg !== 'undefined' && svg.di) svg.di();
}

// -----------------------------------------------------------
// 3. DATA LOADER — publik (tanpa login)
// -----------------------------------------------------------

function loadPublicDashboard() {
    fetch(APP_CONFIG.API_BASE_URL + '/dashboard/public')
        .then(function (res) { return res.json(); })
        .then(function (payload) {
            if (!payload.ok) return;
            const d = payload.data;
            ui.render('content', [
                { section: 'titleHero', title: 'Statistik Publik',
                  description: 'Ringkasan aktivitas belajar di platform OCW-RPL — terbuka untuk semua orang.' },
                { section: 'statGrid', items: [
                    { label: 'Total Peserta', value: d.totalPeserta },
                    { label: 'Total Kursus',  value: d.totalCourses }
                ]},
                { section: 'barChart',
                  title: 'Kursus Terpopuler',
                  items: (d.topCourses || []).map(function (c) {
                      return { label: c.title, value: c.enrolledCount };
                  }) }
            ]);
        })
        .catch(function () { /* diam-diam gagal — dashboard publik bersifat best-effort */ });
}

// -----------------------------------------------------------
// 4. KOMPONEN RENDER BARU (Reuse lintas role & lintas halaman)
// -----------------------------------------------------------

components.loading = function (d) {
    return '<div class="row page"><div class="artikel"><p>' + (d.text || 'Memuat...') + '</p></div></div>';
};

components.loginGate = function () {
    return (
        '<div class="row page">' +
            '<div class="artikel card-input" style="max-width:360px;">' +
                '<p>Masuk untuk melanjutkan.</p>' +
                '<div id="google-btn-inline"></div>' +
                '<p style="margin-top:10px;"><small>Akun Google Anda akan otomatis terdaftar sebagai peserta saat pertama kali masuk.</small></p>' +
            '</div>' +
        '</div>'
    );
};

/** Grid kartu ringkasan (KPI) — dipakai admin, instruktur, & peserta */
components.statGrid = function (d) {
    const items = d.items || [];
    return (
        '<div class="row stat-grid">' +
            items.map(function (it) {
                return (
                    '<div class="stat-card">' +
                        '<div class="stat-value">' + it.value + '</div>' +
                        '<div class="stat-label">' + it.label + '</div>' +
                    '</div>'
                );
            }).join('') +
        '</div>'
    );
};

/** Bar chart SVG generik — dipakai untuk "kursus terbaik" (publik & privat) */
components.barChart = function (d) {
    const items = d.items || [];
    if (!items.length) {
        return '<div class="row page chart-wrap"><div class="artikel">' +
               (d.title ? '<h3>' + d.title + '</h3><hr>' : '') +
               '<p>Belum ada data untuk ditampilkan.</p></div></div>';
    }

    const max    = Math.max.apply(null, items.map(function (i) { return i.value || 0; }).concat([1]));
    const barH   = 26, gap = 14, leftW = 190, chartW = 380;
    const height = items.length * (barH + gap) + gap;
    const width  = leftW + chartW + 60;

    const bars = items.map(function (it, i) {
        const y = gap + i * (barH + gap);
        const w = Math.max(2, Math.round((it.value / max) * chartW));
        const label = (it.label || '').length > 26 ? it.label.slice(0, 24) + '…' : (it.label || '');
        return (
            '<text x="0" y="' + (y + barH / 2 + 4) + '" class="chart-label">' + label + '</text>' +
            '<rect x="' + leftW + '" y="' + y + '" width="' + w + '" height="' + barH + '" rx="5" class="chart-bar"></rect>' +
            '<text x="' + (leftW + w + 8) + '" y="' + (y + barH / 2 + 4) + '" class="chart-value">' + it.value + '</text>'
        );
    }).join('');

    return (
        '<div class="row page chart-wrap"><div class="artikel">' +
            (d.title ? '<h3>' + d.title + '</h3><hr>' : '') +
            '<svg viewBox="0 0 ' + width + ' ' + height + '" class="chart-svg" preserveAspectRatio="xMinYMin meet">' + bars + '</svg>' +
        '</div></div>'
    );
};

/** Daftar progres (skill-bar) — reuse gaya .skill-item/.skill-track yang sudah ada di style.css */
components.progressList = function (d) {
    const items = d.items || [];
    return (
        '<div class="row page"><div class="artikel">' +
            (d.title ? '<h3>' + d.title + '</h3><hr>' : '') +
            (items.length ? items.map(function (it) {
                const pct = it.progressPct || 0;
                return (
                    '<div class="skill-item">' +
                        '<div class="skill-info"><strong>' + it.title + '</strong> ' +
                        (it.category ? '<small>(' + it.category + ')</small> ' : '') +
                        '<small>' + pct + '%</small></div>' +
                        '<div class="skill-track"><div class="skill-fill" style="width:' + pct + '%"></div></div>' +
                    '</div>'
                );
            }).join('') : '<p>Belum ada data.</p>') +
        '</div></div>'
    );
};

/**
 * Tabel kursus + statistik peserta per kursus — dipakai Dashboard
 * Instruktur ("Kursus yang Saya Ampu": jumlah peserta, rata-rata
 * progres, jumlah lulus kuis per kursus). Reuse gaya `.table-container`
 * yang sudah ada di style.css (dipakai juga oleh halaman lain).
 */
components.courseStatTable = function (d) {
    const items = d.items || [];
    return (
        '<div class="row page"><div class="artikel">' +
            (d.title ? '<h3>' + d.title + '</h3><hr>' : '') +
            (items.length
                ? '<div class="table-container"><table><thead><tr>' +
                    '<th>Kursus</th><th>Kategori</th><th>Peserta</th><th>Rata-rata Progres</th><th>Lulus Kuis</th>' +
                  '</tr></thead><tbody>' +
                    items.map(function (it) {
                        return (
                            '<tr>' +
                                '<td>' + it.title + '</td>' +
                                '<td>' + (it.category || '-') + '</td>' +
                                '<td>' + (it.enrolledCount || 0) + '</td>' +
                                '<td>' + (it.avgProgress || 0) + '%</td>' +
                                '<td>' + (it.lulusCount || 0) + '</td>' +
                            '</tr>'
                        );
                    }).join('') +
                  '</tbody></table></div>'
                : '<p>' + (d.emptyText || 'Belum ada data.') + '</p>') +
        '</div></div>'
    );
};

/** Kartu ajakan (call-to-action) kecil — dipakai dashboard admin untuk menautkan ke Panel Admin */
components.adminCallout = function (d) {
    return (
        '<div class="row page">' +
            '<div class="artikel card-input">' +
                '<p>' + (d.text || '') + '</p>' +
                '<button class="slcBtn" onclick="web.navigate(\'' + (d.linkSlug || 'admin') + '\')">' +
                    (d.linkLabel || 'Buka') +
                '</button>' +
            '</div>' +
        '</div>'
    );
};

// Setelah setiap render, jika ada slot tombol Google inline (loginGate), render tombolnya
const _origUiRender = ui.render;
ui.render = function (id, dataArray) {
    _origUiRender(id, dataArray);
    if (web.gebi('google-btn-inline')) auth.renderGoogleButton('google-btn-inline');
};
