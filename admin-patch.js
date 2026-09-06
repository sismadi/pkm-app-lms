/**
 * admin-patch.js
 * ------------------------------------------------------------
 * Panel Admin — fitur admin mengangkat peserta menjadi instruktur
 * (dan sebaliknya, mengembalikan instruktur menjadi peserta).
 *
 * Konsumsi cf-api:
 *   GET /dashboard              (role admin) → summary + instructors[]
 *   GET /users?role=peserta     → daftar peserta (kandidat instruktur)
 *   PUT /users/:id/role         → ubah role (di-guard admin-only di backend)
 *
 * Non-destructive patch — mengisi resolver `resolveAdmin` yang SUDAH
 * dipetakan di web.routes (script.js: admin -> 'resolveAdmin') tapi
 * belum pernah didefinisikan, plus menambah komponen render baru dan
 * tautan navigasi "Admin" (tampil hanya untuk role admin).
 * Prinsip: Reuse · DRY · Modular · Scalable — sama seperti dashboard-patch.js.
 * ------------------------------------------------------------
 */

// -----------------------------------------------------------
// 1. ROUTING
// -----------------------------------------------------------

web.resolveAdmin = function () {
    const user = auth.getUser();

    if (!user) {
        return [
            { section: 'titleHero', title: 'Panel Admin',
              description: 'Masuk dengan akun admin untuk mengelola peran pengguna.' },
            { section: 'loginGate' }
        ];
    }

    if (user.role !== 'admin') {
        return [
            { section: 'titleHero', title: 'Akses Ditolak',
              description: 'Halaman ini khusus untuk akun admin. Peran Anda saat ini: ' +
                            auth.roleLabel(user.role) + '.' }
        ];
    }

    loadAdminPanel(); // async — akan menimpa #content saat data siap
    return [
        { section: 'titleHero', title: 'Panel Admin',
          description: 'Kelola peran pengguna — angkat peserta menjadi instruktur, atau kembalikan instruktur menjadi peserta.' },
        { section: 'loading', text: 'Memuat data pengguna...' }
    ];
};

// -----------------------------------------------------------
// 2. DATA LOADER
// -----------------------------------------------------------
//
// Reuse GET /dashboard (cabang admin) untuk daftar instruktur beserta
// jumlah kursus yang diampu (courseCount) — supaya tidak perlu endpoint
// baru terpisah. Peserta diambil lewat filter GET /users?role=peserta
// (patch di handleCrud cf-api). Daftar kursus (GET /courses) dipakai
// untuk UI "Tugaskan Kursus" — supaya instruktur yang baru diangkat
// bisa langsung ditugaskan mengampu kursus, dan Dashboard Instrukturnya
// tidak kosong.

function fetchJson(path) {
    return auth.apiFetch(path).then(function (r) {
        if (r.status === 401) { auth.logout(); return null; }
        return r.json();
    });
}

function loadAdminPanel() {
    Promise.all([
        fetchJson('/dashboard'),
        fetchJson('/users?role=peserta&limit=200'),
        fetchJson('/courses?limit=100')
    ])
    .then(function (results) {
        const dashPayload    = results[0];
        const pesertaPayload = results[1];
        const coursesPayload = results[2];

        if (!dashPayload || !pesertaPayload || !coursesPayload) return; // salah satu sesi 401 -> sudah logout

        if (!dashPayload.ok || !pesertaPayload.ok || !coursesPayload.ok) {
            ui.render('content', [{ section: 'titleHero', title: 'Gagal memuat data',
                description: dashPayload.error || pesertaPayload.error || coursesPayload.error || 'Terjadi kesalahan.' }]);
            return;
        }

        renderAdminPanel(
            pesertaPayload.data || [],
            (dashPayload.data && dashPayload.data.instructors) || [],
            coursesPayload.data || [],
            (dashPayload.data && dashPayload.data.summary) || {}
        );
    })
    .catch(function (e) {
        ui.render('content', [{ section: 'titleHero', title: 'Gagal memuat data', description: e.message }]);
    });
}

function renderAdminPanel(pesertaList, instrukturList, coursesList, summary) {
    ui.render('content', [
        { section: 'titleHero', title: 'Panel Admin',
          description: 'Kelola peran pengguna — angkat peserta menjadi instruktur, atau kembalikan instruktur menjadi peserta.' },
        { section: 'statGrid', items: [
            { label: 'Total Peserta',    value: summary.totalPeserta ?? pesertaList.length },
            { label: 'Total Instruktur', value: summary.totalInstruktur ?? instrukturList.length },
            { label: 'Total Kursus',     value: summary.totalCourses ?? coursesList.length }
        ]},
        { section: 'userRoleTable',
          title: 'Instruktur Aktif',
          emptyText: 'Belum ada instruktur. Angkat salah satu peserta di bawah untuk mulai.',
          actionLabel: 'Jadikan Peserta',
          actionRole: 'peserta',
          showCourseCount: true,
          items: instrukturList },
        { section: 'courseAssignTable',
          title: 'Tugaskan Kursus ke Instruktur',
          items: coursesList,
          instruktur: instrukturList },
        { section: 'userRoleTable',
          title: 'Daftar Peserta',
          emptyText: 'Belum ada peserta terdaftar.',
          actionLabel: 'Jadikan Instruktur',
          actionRole: 'instruktur',
          showCourseCount: false,
          items: pesertaList }
    ]);
    if (typeof svg !== 'undefined' && svg.di) svg.di();
}

// -----------------------------------------------------------
// 3. AKSI: UBAH ROLE
// -----------------------------------------------------------

const adminPanel = {
    changeRole: function (userId, newRole, userName) {
        const label = newRole === 'instruktur' ? 'instruktur' : 'peserta';
        if (!confirm('Ubah peran ' + userName + ' menjadi ' + label + '?')) return;

        auth.apiFetch('/users/' + userId + '/role', {
            method: 'PUT',
            body: JSON.stringify({ role: newRole })
        })
        .then(function (r) {
            if (r.status === 401) { auth.logout(); return null; }
            return r.json();
        })
        .then(function (payload) {
            if (!payload) return;
            if (!payload.ok) { alert('Gagal: ' + (payload.error || 'unknown error')); return; }
            alert(payload.data.message || 'Peran berhasil diubah.');
            loadAdminPanel(); // refresh daftar
        })
        .catch(function (e) { alert('Gagal: ' + e.message); });
    },

    /**
     * Tugaskan (atau lepaskan) kursus ke seorang instruktur.
     * `selectId` menunjuk ke <select> yang di-render courseAssignTable —
     * nilainya id instruktur, atau string kosong untuk "Tidak ada".
     */
    assignCourse: function (courseId, selectId) {
        const sel = web.gebi(selectId);
        if (!sel) return;
        const instructorId = sel.value ? Number(sel.value) : null;

        auth.apiFetch('/courses/' + courseId, {
            method: 'PUT',
            body: JSON.stringify({ instructor_id: instructorId })
        })
        .then(function (r) {
            if (r.status === 401) { auth.logout(); return null; }
            return r.json();
        })
        .then(function (payload) {
            if (!payload) return;
            if (!payload.ok) { alert('Gagal menugaskan kursus: ' + (payload.error || 'unknown error')); return; }
            alert('Kursus berhasil ditugaskan.');
            loadAdminPanel(); // refresh daftar
        })
        .catch(function (e) { alert('Gagal: ' + e.message); });
    }
};
window.adminPanel = adminPanel;

// -----------------------------------------------------------
// 4. KOMPONEN RENDER BARU
// -----------------------------------------------------------

/** Tabel pengguna + tombol aksi ubah role (dipakai untuk peserta & instruktur, Reuse · DRY) */
components.userRoleTable = function (d) {
    const items = d.items || [];
    const escapeName = function (name) { return String(name || '').replace(/'/g, "\\'"); };

    return (
        '<div class="row page"><div class="artikel">' +
            (d.title ? '<h3>' + d.title + '</h3><hr>' : '') +
            (items.length
                ? '<div class="table-container"><table><thead><tr>' +
                    '<th>Nama</th><th>Email</th>' +
                    (d.showCourseCount ? '<th>Kursus Diampu</th>' : '') +
                    '<th>Aksi</th>' +
                  '</tr></thead><tbody>' +
                    items.map(function (it) {
                        return (
                            '<tr>' +
                                '<td>' + it.name + '</td>' +
                                '<td>' + it.email + '</td>' +
                                (d.showCourseCount ? '<td>' + (it.courseCount || 0) + '</td>' : '') +
                                '<td><button class="slcBtn" onclick="adminPanel.changeRole(' +
                                    it.id + ', \'' + d.actionRole + '\', \'' + escapeName(it.name) + '\')">' +
                                    d.actionLabel +
                                '</button></td>' +
                            '</tr>'
                        );
                    }).join('') +
                  '</tbody></table></div>'
                : '<p>' + (d.emptyText || 'Belum ada data.') + '</p>') +
        '</div></div>'
    );
};

/** Cari nama instruktur dari id, untuk kolom "Instruktur Saat Ini" */
function courseInstructorName(course, instrukturList) {
    if (!course.instructor_id) return '-';
    const found = instrukturList.filter(function (i) {
        return String(i.id) === String(course.instructor_id);
    })[0];
    return found ? found.name : ('ID #' + course.instructor_id);
}

/** Bangun opsi <select> instruktur, dengan opsi saat ini ter-pilih */
function buildInstructorOptions(instrukturList, currentId) {
    let html = '<option value=""' + (!currentId ? ' selected' : '') + '>— Tidak ada —</option>';
    instrukturList.forEach(function (i) {
        const sel = String(i.id) === String(currentId) ? ' selected' : '';
        html += '<option value="' + i.id + '"' + sel + '>' + i.name + '</option>';
    });
    return html;
}

/**
 * Tabel kursus + dropdown penugasan instruktur. Ini yang menghubungkan
 * fitur "angkat instruktur" dengan "Dashboard Instruktur" — tanpa
 * penugasan di sini, courses.instructor_id tetap NULL dan Dashboard
 * Instruktur instruktur yang baru diangkat akan selalu kosong.
 */
components.courseAssignTable = function (d) {
    const items      = d.items || [];
    const instruktur = d.instruktur || [];

    return (
        '<div class="row page"><div class="artikel">' +
            (d.title ? '<h3>' + d.title + '</h3><hr>' : '') +
            (items.length
                ? '<div class="table-container"><table><thead><tr>' +
                    '<th>Kursus</th><th>Kategori</th><th>Instruktur Saat Ini</th><th>Tugaskan Ke</th><th>Aksi</th>' +
                  '</tr></thead><tbody>' +
                    items.map(function (c) {
                        const selId = 'assign-course-' + c.id;
                        return (
                            '<tr>' +
                                '<td>' + c.title + '</td>' +
                                '<td>' + (c.category || '-') + '</td>' +
                                '<td>' + courseInstructorName(c, instruktur) + '</td>' +
                                '<td><select id="' + selId + '">' +
                                    buildInstructorOptions(instruktur, c.instructor_id) +
                                '</select></td>' +
                                '<td><button class="slcBtn" onclick="adminPanel.assignCourse(' +
                                    c.id + ', \'' + selId + '\')">Simpan</button></td>' +
                            '</tr>'
                        );
                    }).join('') +
                  '</tbody></table></div>'
                : '<p>Belum ada kursus.</p>') +
        '</div></div>'
    );
};

// -----------------------------------------------------------
// 5. TAUTAN NAVIGASI "Admin" — tampil hanya untuk role admin
// -----------------------------------------------------------
//
// dashboard-patch.js sudah membungkus ui.render untuk kebutuhan
// tombol Google inline; di sini kita bungkus auth.renderAuthUI
// (dipanggil setiap login/logout & saat inisialisasi) supaya link
// "Admin" muncul/hilang otomatis sesuai peran, tanpa mengubah
// auth-patch.js ataupun index.html secara langsung.

const _origRenderAuthUI = auth.renderAuthUI;
auth.renderAuthUI = function () {
    _origRenderAuthUI.call(auth);

    const nav = web.gebi('navLinks');
    if (!nav) return;

    const user     = auth.getUser();
    const existing = web.gebi('adminNavLink');

    if (user && user.role === 'admin') {
        if (!existing) {
            const a = document.createElement('a');
            a.id = 'adminNavLink';
            a.href = '/?admin';
            a.textContent = 'Admin';
            a.onclick = function () { return web.navigate('admin'); };
            nav.appendChild(a);
        }
    } else if (existing) {
        existing.remove();
    }
};
