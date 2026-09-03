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

function renderPrivateDashboard(data) {
    const user = auth.getUser();
    const sections = [
        { section: 'titleHero',
          title: 'Dashboard ' + auth.roleLabel(data.role),
          description: 'Selamat datang, ' + (user ? user.name : '') + '.' }
    ];

    if (data.role === 'admin' || data.role === 'instruktur') {
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
    } else {
        const avg = data.summary.rataRataProgress || 0;
        sections.push({
            section: 'statGrid',
            items: [
                { label: 'Kursus Diikuti',   value: data.summary.totalKursusDiikuti },
                { label: 'Rata-rata Progres', value: avg + '%' }
            ]
        });
        sections.push({
            section: 'progressList',
            title: 'Progres Belajar Saya',
            items: (data.myCourses || []).map(function (c) {
                return { title: c.title, category: c.category, progressPct: c.progressPct };
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

// Setelah setiap render, jika ada slot tombol Google inline (loginGate), render tombolnya
const _origUiRender = ui.render;
ui.render = function (id, dataArray) {
    _origUiRender(id, dataArray);
    if (web.gebi('google-btn-inline')) auth.renderGoogleButton('google-btn-inline');
};
