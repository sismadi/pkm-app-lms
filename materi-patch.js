/**
 * materi-patch.js
 * ------------------------------------------------------------
 * Menambahkan halaman "Lihat Materi" untuk mata kuliah lain
 * (PBO, Robotika, dst) memakai TEMPLATE YANG SAMA dengan RPL
 * (pages.learn / route "learn"), tanpa mengubah script.js.
 *
 * Cara kerja:
 *  1. script.js hanya tahu cara resolve satu learning module,
 *     yaitu route 'learn' -> pages.learn (lihat web.resolveLearningModule
 *     & web.routes.learn di script.js).
 *  2. Modul baru (pages.pbo, pages.robotika, ...) didefinisikan di
 *     pages/pbo.js & pages/robotika.js memakai struktur data PERSIS
 *     sama seperti pages/learn.js (categories -> items -> {id,title,lines}).
 *  3. Patch ini mendaftarkan resolver baru ke web.routes untuk tiap
 *     subject baru (mis. web.routes.pbo, web.routes.robotika), yang
 *     membaca pages[subjectKey] alih-alih pages.learn secara hardcode.
 *  4. components.learningModule (dari script.js, sudah dipercantik oleh
 *     learn-patch.js dengan modal "Baca Penuh" & drawer "Daftar Modul")
 *     selalu menghasilkan link navigasi ke 'learn/...' secara hardcode.
 *     Supaya link Sebelumnya/Berikutnya/Daftar Modul mengarah ke subject
 *     yang benar (pbo/robotika), kita bungkus SEKALI LAGI komponennya di
 *     sini dan ganti string 'learn/' -> '<subject>/' pada hasil akhirnya.
 *
 * Untuk menambah mata kuliah baru lagi di kemudian hari:
 *   a. Buat pages/<subject>.js berisi `pages.<subject> = { categories: [...] }`
 *      (contoh: pages/rpl.js, pages/pbo.js, pages/robotika.js).
 *   b. Tambahkan "<subject>" ke array pageFiles di pages/index.js.
 *   c. Tambahkan "<subject>" ke array EXTRA_SUBJECTS di bawah ini.
 *   d. Set learnLink: '<subject>' pada entri terkait di CATALOG_COURSES
 *      (catalog-patch.js) supaya tombol "Lihat Materi" muncul di katalog.
 * ------------------------------------------------------------
 */
(function () {

    // Mata kuliah tambahan yang memakai template modul sama dengan RPL.
    const EXTRA_SUBJECTS = ['pbo', 'robotika'];

    function resolveMateri(subjectKey, id) {
        let raw = pages[subjectKey];
        if (Array.isArray(raw)) raw = raw[0] || {};
        if (!raw || typeof raw !== 'object') raw = {};

        const categories = raw.categories || [];
        const allItems    = categories.flatMap(cat => cat.items || []);
        const defaultId    = allItems[0]?.id || '';
        const activeId      = id || defaultId;
        const exists          = allItems.some(i => i.id === activeId);
        const activeIdx        = allItems.findIndex(i => i.id === activeId);

        return [
            {
                section: 'titleHero',
                title:   exists ? 'Learning Module' : 'Modul Tidak Ditemukan'
            },
            {
                section:  'learningModule',
                activeId: exists ? activeId : defaultId,
                subject:  subjectKey,
                prevId:   allItems[activeIdx - 1]?.id || null,
                nextId:   allItems[activeIdx + 1]?.id || null,
                data:     raw
            }
        ];
    }

    EXTRA_SUBJECTS.forEach(function (key) {
        const resolverName = 'resolveMateri__' + key;
        web[resolverName] = function (id) { return resolveMateri(key, id); };
        web.routes[key] = resolverName;
    });

    // Bungkus sekali lagi components.learningModule (setelah dipercantik oleh
    // learn-patch.js) supaya semua link navigasi internal ('learn/...')
    // diarahkan ke subject yang benar saat merender materi PBO/Robotika/dst.
    const _renderedBySoFar = components.learningModule;
    components.learningModule = function (d) {
        let html = _renderedBySoFar(d);
        if (d.subject && d.subject !== 'learn') {
            html = html.split("web.navigate('learn/").join("web.navigate('" + d.subject + "/");
        }
        return html;
    };

})();
