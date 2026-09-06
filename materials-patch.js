/**
 * materials-patch.js
 * ------------------------------------------------------------
 * Fitur "Pengelolaan Berkas" — instruktur/dosen menambahkan tautan
 * VIDEO YOUTUBE dan/atau DOKUMEN PDF sebagai materi tambahan untuk
 * kursus yang mereka ampu (opsional dikaitkan ke modul tertentu).
 *
 * Konsumsi cf-api (lihat migrate-materials.sql & index.js):
 *   GET    /courses/:slug/materials         (publik)
 *   POST   /courses/:slug/materials         (auth: pemilik kursus/admin)
 *   PUT    /materials/:id                   (auth: pemilik kursus/admin)
 *   DELETE /materials/:id                   (auth: pemilik kursus/admin)
 *
 * Dua bagian:
 *   A. Halaman "Kelola Berkas" (rute baru `kelola-berkas`) — instruktur
 *      memilih kursus yang diampunya, mengisi form, dan melihat/menghapus
 *      daftar berkas yang sudah ditambahkan. Admin bisa mengelola berkas
 *      di kursus mana pun.
 *   B. Panel "Materi Tambahan dari Instruktur" — disisipkan otomatis ke
 *      halaman materi (learn/pbo/robotika/dst) supaya peserta langsung
 *      melihat video/PDF yang relevan dengan modul yang sedang dibuka.
 *
 * Non-destructive patch — hanya MENAMBAH rute, komponen render, dan
 * satu lapis pembungkus baru di atas components.learningModule (setelah
 * learn-patch.js & materi-patch.js), mengikuti pola yang sama seperti
 * progress-patch.js. Prinsip: Reuse · DRY · Modular · Scalable.
 *
 * Urutan <script> WAJIB: setelah script.js, learn-patch.js,
 * materi-patch.js, config.js, auth-patch.js, DAN catalog-patch.js
 * (butuh CATALOG_COURSES untuk memetakan subject key <-> slug kursus).
 * ------------------------------------------------------------
 */
(function () {

    // -----------------------------------------------------------
    // 0. Util: pemetaan subject key (learnLink) <-> slug kursus di DB
    //    Sama persis dengan subjectToSlug() di progress-patch.js —
    //    diambil dari CATALOG_COURSES supaya otomatis sinkron kalau
    //    nanti ada mata kuliah baru.
    // -----------------------------------------------------------

    function subjectToSlug(subjectKey) {
        const course = (window.CATALOG_COURSES || []).find(function (c) {
            return c.learnLink === subjectKey;
        });
        return course ? course.id : subjectKey; // fallback: subject == slug
    }

    function subjectKeyForSlug(slug) {
        const course = (window.CATALOG_COURSES || []).find(function (c) {
            return c.id === slug;
        });
        return course ? course.learnLink : slug; // fallback: slug == subject
    }

    /** Daftar {id, title} modul milik sebuah kursus, dibaca dari pages.<subjectKey>. */
    function modulesForSlug(slug) {
        const subjectKey = subjectKeyForSlug(slug);
        if (!subjectKey || typeof pages === 'undefined') return [];

        let raw = pages[subjectKey];
        if (Array.isArray(raw)) raw = raw[0] || {};
        if (!raw || typeof raw !== 'object') return [];

        const categories = raw.categories || [];
        return categories.flatMap(function (cat) { return cat.items || []; })
            .map(function (item) { return { id: item.id, title: item.title }; });
    }

    // =============================================================
    // A. HALAMAN "KELOLA BERKAS" (instruktur & admin)
    // =============================================================

    // -----------------------------------------------------------
    // A1. ROUTING
    // -----------------------------------------------------------

    web.routes['kelola-berkas'] = 'resolveKelolaBerkas';

    web.resolveKelolaBerkas = function () {
        const user = auth.getUser();

        if (!user) {
            return [
                { section: 'titleHero', title: 'Kelola Berkas Materi',
                  description: 'Masuk dengan akun instruktur untuk menambahkan video YouTube atau PDF sebagai materi tambahan.' },
                { section: 'loginGate' }
            ];
        }

        if (user.role !== 'instruktur' && user.role !== 'admin') {
            return [
                { section: 'titleHero', title: 'Akses Ditolak',
                  description: 'Halaman ini khusus untuk instruktur/dosen atau admin. Peran Anda saat ini: ' +
                                auth.roleLabel(user.role) + '.' }
            ];
        }

        materiPanel.init(); // async — akan menimpa #content saat data siap
        return [
            { section: 'titleHero', title: 'Kelola Berkas Materi',
              description: 'Tambahkan tautan video YouTube atau dokumen PDF sebagai materi tambahan untuk kursus yang Anda ampu.' },
            { section: 'loading', text: 'Memuat daftar kursus...' }
        ];
    };

    // -----------------------------------------------------------
    // A2. STATE + DATA LOADER
    // -----------------------------------------------------------

    const materiPanel = {
        courses: [],       // [{id, slug, title, category}]
        currentSlug: null,
        materials: [],      // hasil GET /courses/:slug/materials untuk currentSlug

        /** Ambil daftar kursus sesuai peran: admin -> semua kursus, instruktur -> kursus yang diampunya saja. */
        init: function () {
            const user = auth.getUser();
            const req = user.role === 'admin'
                ? auth.apiFetch('/courses?limit=200')
                : auth.apiFetch('/dashboard');

            req.then(function (r) {
                if (r.status === 401) { auth.logout(); return null; }
                return r.json();
            }).then(function (payload) {
                if (!payload) return;
                if (!payload.ok) {
                    ui.render('content', [{ section: 'titleHero', title: 'Gagal memuat data', description: payload.error }]);
                    return;
                }

                materiPanel.courses = user.role === 'admin'
                    ? (payload.data || [])
                    : (payload.data.myCourses || []).map(function (c) {
                        return { id: c.id, slug: c.slug, title: c.title, category: c.category };
                    });

                if (!materiPanel.courses.length) { materiPanel.render(); return; }

                materiPanel.currentSlug = materiPanel.currentSlug || materiPanel.courses[0].slug;
                materiPanel.loadMaterials(materiPanel.currentSlug);
            }).catch(function (e) {
                ui.render('content', [{ section: 'titleHero', title: 'Gagal memuat data', description: e.message }]);
            });
        },

        /** Dipanggil dari <select> saat instruktur/admin berpindah kursus. */
        selectCourse: function (slug) {
            materiPanel.currentSlug = slug;
            materiPanel.loadMaterials(slug);
        },

        loadMaterials: function (slug) {
            if (!slug) { materiPanel.materials = []; materiPanel.render(); return; }
            auth.apiFetch('/courses/' + slug + '/materials')
                .then(function (r) { return r.json(); })
                .then(function (payload) {
                    materiPanel.materials = (payload && payload.ok) ? payload.data : [];
                    materiPanel.render();
                })
                .catch(function () {
                    materiPanel.materials = [];
                    materiPanel.render();
                });
        },

        render: function () {
            const slug = materiPanel.currentSlug;
            const activeCourse = materiPanel.courses.find(function (c) { return c.slug === slug; });

            const sections = [
                { section: 'titleHero', title: 'Kelola Berkas Materi',
                  description: 'Tambahkan tautan video YouTube atau dokumen PDF sebagai materi tambahan untuk kursus yang Anda ampu.' }
            ];

            if (!materiPanel.courses.length) {
                sections.push({ section: 'materiEmptyState',
                    text: 'Anda belum ditugaskan mengampu kursus apa pun. Hubungi admin untuk penugasan kursus.' });
                ui.render('content', sections);
                return;
            }

            sections.push({ section: 'materiCourseSelector', courses: materiPanel.courses, currentSlug: slug });
            sections.push({ section: 'materiForm', modules: modulesForSlug(slug) });
            sections.push({ section: 'materiTable', items: materiPanel.materials,
                courseTitle: activeCourse ? activeCourse.title : '' });

            ui.render('content', sections);
            if (typeof svg !== 'undefined' && svg.di) svg.di();
        },

        /** Submit form "Tambah Berkas Baru". */
        submit: function (event) {
            event.preventDefault();
            const slug = materiPanel.currentSlug;
            if (!slug) return;

            const type        = web.gebi('materiType').value;
            const title       = web.gebi('materiTitle').value.trim();
            const url         = web.gebi('materiUrl').value.trim();
            const description = web.gebi('materiDescription').value.trim();
            const moduleId    = web.gebi('materiModule').value;

            if (!title || !url) { alert('Judul dan URL wajib diisi.'); return; }

            const btn = web.gebi('materiSubmitBtn');
            if (btn) { btn.disabled = true; btn.textContent = 'Menyimpan...'; }

            auth.apiFetch('/courses/' + slug + '/materials', {
                method: 'POST',
                body: JSON.stringify({
                    type: type, title: title, url: url,
                    description: description || null,
                    module_id: moduleId || null
                })
            })
            .then(function (r) {
                return r.json().catch(function () { return {}; }).then(function (payload) {
                    return { status: r.status, payload: payload };
                });
            })
            .then(function (result) {
                if (result.status === 401) { auth.logout(); return; }
                if (!result.payload || !result.payload.ok) {
                    alert('Gagal menyimpan: ' + (result.payload && result.payload.error ? result.payload.error : 'terjadi kesalahan pada server'));
                    if (btn) { btn.disabled = false; btn.textContent = 'Simpan Berkas'; }
                    return;
                }
                alert('Berkas berhasil ditambahkan.');
                materiPanel.loadMaterials(slug); // refresh daftar + reset form (re-render)
            })
            .catch(function (e) {
                alert('Gagal menyimpan (jaringan/server): ' + e.message);
                if (btn) { btn.disabled = false; btn.textContent = 'Simpan Berkas'; }
            });
        },

        /** Hapus salah satu berkas. */
        remove: function (id, title) {
            if (!confirm('Hapus berkas "' + title + '"? Tindakan ini tidak bisa dibatalkan.')) return;

            auth.apiFetch('/materials/' + id, { method: 'DELETE' })
                .then(function (r) {
                    if (r.status === 401) { auth.logout(); return null; }
                    return r.json();
                })
                .then(function (payload) {
                    if (!payload) return;
                    if (!payload.ok) { alert('Gagal menghapus: ' + (payload.error || 'unknown error')); return; }
                    materiPanel.loadMaterials(materiPanel.currentSlug);
                })
                .catch(function (e) { alert('Gagal menghapus: ' + e.message); });
        }
    };
    window.materiPanel = materiPanel; // dipanggil dari onclick/onchange di HTML hasil render

    // -----------------------------------------------------------
    // A3. KOMPONEN RENDER — halaman "Kelola Berkas"
    // -----------------------------------------------------------

    components.materiEmptyState = function (d) {
        return '<div class="row page"><div class="artikel"><p>' + (d.text || '') + '</p></div></div>';
    };

    components.materiCourseSelector = function (d) {
        const courses = d.courses || [];
        return (
            '<div class="row page"><div class="artikel a-card">' +
                '<div class="a-row"><span class="a-label">Kursus</span>' +
                    '<select onchange="materiPanel.selectCourse(this.value)">' +
                        courses.map(function (c) {
                            const sel = c.slug === d.currentSlug ? ' selected' : '';
                            return '<option value="' + c.slug + '"' + sel + '>' +
                                c.title + (c.category ? ' (' + c.category + ')' : '') +
                            '</option>';
                        }).join('') +
                    '</select>' +
                '</div>' +
            '</div></div>'
        );
    };

    components.materiForm = function (d) {
        const modules = d.modules || [];
        return (
            '<div class="row page"><div class="artikel a-card">' +
                '<div class="a-sec">&#x2795; Tambah Berkas Baru</div>' +
                '<form onsubmit="materiPanel.submit(event)">' +
                    '<div class="a-row"><span class="a-label">Jenis</span>' +
                        '<select id="materiType">' +
                            '<option value="video">Video YouTube</option>' +
                            '<option value="pdf">Dokumen PDF</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="a-row"><span class="a-label">Judul</span>' +
                        '<input type="text" id="materiTitle" placeholder="mis. Video Penjelasan DFD Level 1" required></div>' +
                    '<div class="a-row"><span class="a-label">URL</span>' +
                        '<input type="text" id="materiUrl" placeholder="https://www.youtube.com/watch?v=... atau https://.../file.pdf" required></div>' +
                    '<div class="a-row"><span class="a-label">Modul</span>' +
                        '<select id="materiModule">' +
                            '<option value="">&mdash; Umum (semua modul) &mdash;</option>' +
                            modules.map(function (m) {
                                return '<option value="' + m.id + '">' + m.title + '</option>';
                            }).join('') +
                        '</select>' +
                    '</div>' +
                    '<div class="a-row"><span class="a-label">Deskripsi</span>' +
                        '<textarea id="materiDescription" rows="2" placeholder="Opsional"></textarea></div>' +
                    '<button type="submit" id="materiSubmitBtn" class="btn-primary">Simpan Berkas</button>' +
                '</form>' +
            '</div></div>'
        );
    };

    components.materiTable = function (d) {
        const items = d.items || [];
        const escapeTitle = function (t) { return String(t || '').replace(/'/g, "\\'"); };

        return (
            '<div class="row page"><div class="artikel">' +
                '<h3>Berkas' + (d.courseTitle ? ' &mdash; ' + d.courseTitle : '') + '</h3><hr>' +
                (items.length
                    ? '<div class="table-container"><table><thead><tr>' +
                        '<th>Jenis</th><th>Judul</th><th>Modul</th><th>Tautan</th><th>Aksi</th>' +
                      '</tr></thead><tbody>' +
                        items.map(function (it) {
                            const jenis = it.type === 'video' ? '&#x1F3A5; Video' : '&#x1F4C4; PDF';
                            return (
                                '<tr>' +
                                    '<td>' + jenis + '</td>' +
                                    '<td>' + it.title +
                                        (it.description ? '<br><small>' + it.description + '</small>' : '') +
                                    '</td>' +
                                    '<td>' + (it.module_id || 'Umum') + '</td>' +
                                    '<td><a href="' + it.url + '" target="_blank" rel="noopener">Buka</a></td>' +
                                    '<td><button class="slcBtn btn-danger" onclick="materiPanel.remove(' +
                                        it.id + ', \'' + escapeTitle(it.title) + '\')">Hapus</button></td>' +
                                '</tr>'
                            );
                        }).join('') +
                      '</tbody></table></div>'
                    : '<p>Belum ada berkas untuk kursus ini.</p>') +
            '</div></div>'
        );
    };

    // -----------------------------------------------------------
    // A4. TAUTAN NAVIGASI "Kelola Berkas" — tampil untuk instruktur & admin
    // -----------------------------------------------------------
    //
    // Sama polanya dengan tautan "Admin" di admin-patch.js: membungkus
    // auth.renderAuthUI SEKALI LAGI (dipanggil setiap login/logout &
    // inisialisasi) supaya tautan muncul/hilang otomatis sesuai peran.

    const _origRenderAuthUIForMateri = auth.renderAuthUI;
    auth.renderAuthUI = function () {
        _origRenderAuthUIForMateri.call(auth);

        const nav = web.gebi('navLinks');
        if (!nav) return;

        const user       = auth.getUser();
        const existing   = web.gebi('materiNavLink');
        const shouldShow = !!user && (user.role === 'instruktur' || user.role === 'admin');

        if (shouldShow) {
            if (!existing) {
                const a = document.createElement('a');
                a.id = 'materiNavLink';
                a.href = '/?kelola-berkas';
                a.textContent = 'Kelola Berkas';
                a.onclick = function () { return web.navigate('kelola-berkas'); };
                nav.appendChild(a);
            }
        } else if (existing) {
            existing.remove();
        }
    };

    // =============================================================
    // B. TAMPILKAN BERKAS KE PESERTA — panel "Materi Tambahan" pada
    //    halaman learn/pbo/robotika/dst.
    // =============================================================
    //
    // Sama pola pembungkusnya dengan progress-patch.js: membungkus
    // components.learningModule SEKALI LAGI (setelah learn-patch.js &
    // materi-patch.js). Data diambil ASYNC lewat setTimeout(...,0) supaya
    // render konten utama modul tidak menunggu network request selesai —
    // panel materi tambahan menyusul begitu data siap (atau menghilang
    // diam-diam kalau memang belum ada berkas / request gagal).

    let _materiSlotSeq = 0;

    const _renderedBySoFarMateri = components.learningModule;
    components.learningModule = function (d) {
        const html = _renderedBySoFarMateri(d);

        const subjectKey = d.subject || 'learn';
        const slug = subjectToSlug(subjectKey);
        if (!slug) return html;

        const slotId = 'course-materials-slot-' + (++_materiSlotSeq);
        const placeholder =
            '<div class="row page" id="' + slotId + '"></div>';

        setTimeout(function () {
            loadMaterialsForModule(slug, d.activeId, slotId);
        }, 0);

        return html + placeholder;
    };

    function loadMaterialsForModule(slug, moduleId, slotId) {
        const query = moduleId ? '?module=' + encodeURIComponent(moduleId) : '';
        fetch(APP_CONFIG.API_BASE_URL + '/courses/' + slug + '/materials' + query)
            .then(function (r) { return r.json(); })
            .then(function (payload) {
                const slot = web.gebi(slotId);
                if (!slot) return; // pengguna sudah pindah halaman sebelum data datang
                slot.innerHTML = (payload && payload.ok && payload.data.length)
                    ? renderMateriTambahanPanel(payload.data)
                    : '';
            })
            .catch(function () {
                const slot = web.gebi(slotId);
                if (slot) slot.innerHTML = ''; // best-effort — diam-diam gagal, jangan ganggu baca modul
            });
    }

    function renderMateriTambahanPanel(items) {
        return (
            '<div class="artikel">' +
                '<h3>&#x1F4CE; Materi Tambahan dari Instruktur</h3><hr>' +
                '<div class="materi-tambahan-grid">' +
                    items.map(function (it) {
                        if (it.type === 'video' && it.youtubeId) {
                            return (
                                '<div class="materi-tambahan-item">' +
                                    '<p><strong>' + it.title + '</strong></p>' +
                                    (it.description ? '<p><small>' + it.description + '</small></p>' : '') +
                                    '<div class="video-embed-wrap">' +
                                        '<iframe src="https://www.youtube.com/embed/' + it.youtubeId + '" ' +
                                            'title="' + it.title + '" frameborder="0" allowfullscreen loading="lazy"></iframe>' +
                                    '</div>' +
                                '</div>'
                            );
                        }
                        return (
                            '<div class="materi-tambahan-item">' +
                                '<p><strong>&#x1F4C4; ' + it.title + '</strong></p>' +
                                (it.description ? '<p><small>' + it.description + '</small></p>' : '') +
                                '<a class="slcBtn" href="' + it.url + '" target="_blank" rel="noopener">Buka PDF</a>' +
                            '</div>'
                        );
                    }).join('') +
                '</div>' +
            '</div>'
        );
    }

})();
