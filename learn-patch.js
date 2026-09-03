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

        const prevBtn = d.prevId
            ? `<button class="slcBtn" onclick="web.navigate('learn/${d.prevId}')">&larr; Sebelumnya</button>`
            : `<button class="slcBtn" disabled style="opacity:.4">&larr; Sebelumnya</button>`;
        const nextBtn = d.nextId
            ? `<button class="slcBtn" onclick="web.navigate('learn/${d.nextId}')">Berikutnya &rarr;</button>`
            : `<button class="slcBtn" disabled style="opacity:.4">Berikutnya &rarr;</button>`;
        const readBtn = `<button class="slcBtn" style="background:var(--aColor);color:#fff;" onclick="openLearnModal()">&#x1F4D6; Baca Penuh</button>`;

        const navTop    = `<div class="learn-nav" style="display:flex;gap:8px;margin-bottom:16px;">${prevBtn}${readBtn}${nextBtn}</div>`;
        const navBottom = `<div class="learn-nav" style="display:flex;gap:8px;margin-top:16px;">${prevBtn}${readBtn}${nextBtn}</div>`;

        // Modal
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

        // navTop disisipkan tepat setelah tag pembuka col-2-3
        // navBottom disisipkan sebelum penutup </div> terakhir
        const withNav = base
            .replace(/(<div[^>]*class="[^"]*col-2-3[^"]*"[^>]*>)/, '$1' + navTop)
            .replace(/(<\/div>\s*<\/div>\s*)$/, navBottom + '$1');

        return modalHtml + withNav;
    };

    window.openLearnModal = function () {
        const modal = document.getElementById('learnModal');
        if (!modal) return;
        const modalBody = modal.querySelector('.learn-modal-body');

        const contentPanel = document.querySelector('.col-2-3');
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

    window.addEventListener('click', function (event) {
        const modal = document.getElementById('learnModal');
        if (event.target === modal) closeLearnModal();
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeLearnModal();
    });

})();
