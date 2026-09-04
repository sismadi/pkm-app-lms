(function () {
    const _original = web.resolveLearningModule.bind(web);
    web.resolveLearningModule = function (id) {
        const result = _original(id);
        const moduleBlock = result.find(d => d.section === 'learningModule');
        if (!moduleBlock) return result;
        const categories = moduleBlock.data.categories || [];
        const allItems   = categories.flatMap(cat => cat.items || []);
        const activeIdx  = allItems.findIndex(i => i.id === moduleBlock.activeId);
        moduleBlock.prevId = allItems[activeIdx - 1]?.id || null;
        moduleBlock.nextId = allItems[activeIdx + 1]?.id || null;
        return result;
    };

    const _originalComponent = components.learningModule;
    components.learningModule = function (d) {
        const base = _originalComponent(d);

        // Ambil isi "Daftar Modul" dari sidebar bawaan, lalu pindahkan ke drawer kanan.
        const sidebarMatch = base.match(/<div class="col-1-3 artikel sidebar">([\s\S]*?)<\/div>\s*<div class="col-2-3 artikel content">/);
        const sidebarInner = sidebarMatch ? sidebarMatch[1] : '';

        // Hapus kolom sidebar dari layout & jadikan kolom konten lebar penuh.
        const fullWidth = base
            .replace(/<div class="col-1-3 artikel sidebar">[\s\S]*?<\/div>\s*(?=<div class="col-2-3 artikel content">)/, '')
            .replace('col-2-3 artikel content', 'col-1-1 artikel content');

        const prevBtn = d.prevId
            ? `<button class="slcBtn" onclick="web.navigate('learn/${d.prevId}')">&larr; Sebelumnya</button>`
            : `<button class="slcBtn" disabled style="opacity:.4">&larr; Sebelumnya</button>`;
        const nextBtn = d.nextId
            ? `<button class="slcBtn" onclick="web.navigate('learn/${d.nextId}')">Berikutnya &rarr;</button>`
            : `<button class="slcBtn" disabled style="opacity:.4">Berikutnya &rarr;</button>`;
        const readBtn = `<button class="slcBtn" style="background:var(--aColor);color:#fff;" onclick="openLearnModal()">&#x1F4D6; Baca Penuh</button>`;
        const drawerBtn = `<button class="slcBtn" style="background:var(--pDarkColor);color:#fff;" onclick="openModulDrawer()">&#x1F4DA; Daftar Modul</button>`;

        const navTop    = `<div class="learn-nav" style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">${drawerBtn}${prevBtn}${readBtn}${nextBtn}</div>`;
        const navBottom = `<div class="learn-nav" style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap;">${prevBtn}${readBtn}${nextBtn}</div>`;

        // Modal "Baca Penuh"
        const modalHtml = `
<div id="learnModal" class="learn-modal">
    <div class="learn-modal-content">
        <div class="learn-modal-header">
            <span class="learn-modal-header-title">&#x1F4D6; Mode Baca Penuh</span>
            <span class="learn-modal-close" onclick="closeLearnModal()">&#x2715; Tutup</span>
        </div>
        <div class="learn-modal-body"></div>
    </div>
</div>`;

        // Drawer kanan "Daftar Modul"
        const drawerHtml = `
<div id="modulDrawerOverlay" class="modul-drawer-overlay" onclick="closeModulDrawer()"></div>
<div id="modulDrawer" class="modul-drawer" role="dialog" aria-label="Daftar Modul">
    <div class="modul-drawer-header">
        <span class="modul-drawer-header-title">&#x1F4DA; Daftar Modul</span>
        <span class="modul-drawer-close" onclick="closeModulDrawer()">&#x2715; Tutup</span>
    </div>
    <div class="modul-drawer-body">${sidebarInner}</div>
</div>`;

        // navTop disisipkan tepat setelah tag pembuka kolom konten
        // navBottom disisipkan sebelum penutup </div> terakhir
        const withNav = fullWidth
            .replace(/(<div[^>]*class="[^"]*col-1-1 artikel content[^"]*"[^>]*>)/, '$1' + navTop)
            .replace(/(<\/div>\s*<\/div>\s*)$/, navBottom + '$1');

        return modalHtml + drawerHtml + withNav;
    };

    window.openLearnModal = function () {
        const modal = document.getElementById('learnModal');
        if (!modal) return;
        const modalBody = modal.querySelector('.learn-modal-body');

        const contentPanel = document.querySelector('.col-1-1.artikel.content');
        if (contentPanel && modalBody) {
            const clone = contentPanel.cloneNode(true);
            clone.querySelectorAll('.learn-nav').forEach(el => el.remove());

            // sv-code lebar penuh dalam modal
            clone.querySelectorAll('pre.sv-code').forEach(el => {
                el.style.maxWidth  = '100%';
                el.style.width     = '100%';
                el.style.boxSizing = 'border-box';
            });

            modalBody.innerHTML = clone.innerHTML;
        }

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    window.closeLearnModal = function () {
        const modal = document.getElementById('learnModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    // Drawer kanan "Daftar Modul"
    window.openModulDrawer = function () {
        const drawer  = document.getElementById('modulDrawer');
        const overlay = document.getElementById('modulDrawerOverlay');
        if (!drawer || !overlay) return;
        overlay.classList.add('open');
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    window.closeModulDrawer = function () {
        const drawer  = document.getElementById('modulDrawer');
        const overlay = document.getElementById('modulDrawerOverlay');
        if (!drawer || !overlay) return;
        overlay.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
    };

    // Tutup drawer otomatis saat memilih salah satu modul di daftar
    // PENTING: pakai capture phase (true) supaya listener ini jalan SEBELUM
    // onclick link (web.navigate) mengganti ulang DOM drawer. Kalau pakai
    // bubble phase biasa, saat listener ini jalan, drawer lama sudah
    // diganti drawer baru oleh web.navigate(), sehingga
    // drawer.contains(event.target) selalu false, closeModulDrawer() tidak
    // pernah terpanggil, dan document.body.style.overflow tetap 'hidden'
    // selamanya (halaman jadi tidak bisa discroll).
    window.addEventListener('click', function (event) {
        const drawer = document.getElementById('modulDrawer');
        if (drawer && drawer.contains(event.target) && event.target.closest('a')) {
            closeModulDrawer();
        }
    }, true);

    window.addEventListener('click', function (event) {
        const modal = document.getElementById('learnModal');
        if (event.target === modal) closeLearnModal();
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeLearnModal();
            closeModulDrawer();
        }
    });

    // Jaga-jaga: tombol back/forward browser memicu 'popstate' -> web.navigate()
    // langsung, tanpa lewat closeModulDrawer()/closeLearnModal(). Kalau drawer
    // atau modal kebetulan sedang terbuka saat itu terjadi, body.style.overflow
    // bisa tersangkut 'hidden' selamanya. Reset paksa di sini sebagai jaring pengaman.
    window.addEventListener('popstate', function () {
        document.body.style.overflow = '';
    });

})();
