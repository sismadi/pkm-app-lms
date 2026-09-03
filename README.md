# OCW-RPL: Open Courseware Rekayasa Perangkat Lunak

![RPL](https://img.shields.io/badge/Rekayasa-Perangkat_Lunak-blue)
![SDLC](https://img.shields.io/badge/SDLC-Waterfall_Agile_Spiral-purple)
![Modules](https://img.shields.io/badge/Modules-16-orange)
![SQA](https://img.shields.io/badge/SQA-Testing_%26_Quality-green)
![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey)
![DOI](https://img.shields.io/badge/DOI-10.5281%2Ffigshare.XXXXXXXX-blue)

Open courseware platform for the **Rekayasa Perangkat Lunak** (Software Engineering) course — mata kuliah **IMP307** at Universitas IPWIJA, Jakarta. Built on [DonatJS](https://donat.id) — a zero-dependency, no-build-step, JSON-driven micro-framework. Covers 16 structured modules guiding students from software engineering fundamentals through system modeling, design, testing, and quality assurance, culminating in a comprehensive final evaluation.

---

## Key Features

- **16-Module Curriculum** — 4 structured parts: Fondasi & Manajemen RPL → Model Proses & Rekayasa Kebutuhan → Pemodelan Analisis & Desain → Pengujian & Penjaminan Mutu.
- **Project-Driven Learning** — Every module is grounded in real industry cases. Concepts are taught using the PREP framework (Point → Reason → Example → Penegasan).
- **JSON-Driven Architecture** — All lecture content defined as plain JavaScript objects (`pages.learn`). No CMS backend, no database.
- **Zero-Dependency Runtime** — No Node.js, Webpack, Babel, or external libraries. Runs in any ES6+ browser.
- **Integrated Quiz Engine** — Password-protected UTS/UAS assessment with `btoa`-encoded answer keys and start-time gating.
- **Certificate Verifier** — Credential lookup with unique ID validation (`SLS-YYYY-NNN` format).
- **Prev/Next Navigation** — `learn-patch.js` adds sequential module navigation with "Baca Penuh" modal reader and keyboard shortcuts.
- **Micro Routing System** — Query-string SPA routing with automatic content resolution and History API support.

---

## Prerequisites & Installation

No runtime dependencies. Only a modern browser supporting ES6+ is required.

1. Clone this repository:
   ```bash
   git clone https://github.com/sismadi/ocw-rpl.git
   cd ocw-rpl
   ```
2. Serve with any static file server — VS Code Live Server, Python `http.server`, or Nginx.
3. Open `index.html` in the browser. No build step needed.

> `script.js` and `svg.js` are loaded from the DonatJS Core CDN (`https://donatjs.github.io/core/`). Internet connection required on first load, or self-host for offline use.

---

## Quick Start

Define a minimal page in `pages/home.js`:

```javascript
pages.home = [
    {
        section: 'titleHero',
        title: 'Halo Dunia',
        description: 'Konten berbasis JSON-driven.'
    }
];
```

Declare modules in `pages/index.js`:

```javascript
const pageFiles = ['home', 'learn', 'kuis', 'cert'];
```

Define the loader in `dataset.js`:

```javascript
const pages = {};

function loadPageScripts(files, callback) {
    let loaded = 0;
    files.forEach(name => {
        const script = document.createElement('script');
        script.src = `pages/${name}.js`;
        script.onload = () => {
            loaded++;
            if (loaded === files.length) callback();
        };
        document.head.appendChild(script);
    });
}
```

Bootstrap in `index.html` before `</body>`:

```html
<script src="pages/index.js"></script>
<script src="dataset.js"></script>
<script>
    loadPageScripts(pageFiles, () => { renderMenu(); });
</script>
```

---

## Usage

### Curriculum Structure

| Bagian | Pertemuan | Topik |
|---|---|---|
| 1: Fondasi & Manajemen RPL | P1–P4 | Pengenalan RPL, Peran Ganda PL & Rekayasa Sistem, Feasibility Studies (PIECES), Manajemen Proyek (4P) |
| 2: Model Proses & Rekayasa Kebutuhan | P5–P8 | Model SDLC (Waterfall/Spiral/Agile/RAD), Rekayasa Kebutuhan & SRS, Review Komprehensif, UTS |
| 3: Pemodelan Analisis & Desain PL | P9–P12 | DFD & Kamus Data, Desain Arsitektural, Desain Antarmuka & Data, Pemodelan Lanjutan |
| 4: Pengujian & Penjaminan Mutu | P13–P16 | Strategi Pengujian (White Box & Black Box), Software Quality Assurance (SQA & FTR), Review Akhir, UAS |

### Learning Module Schema (`pages.learn`)

```javascript
pages.learn = {
    categories: [
        {
            name: 'Bagian 1: Fondasi & Manajemen RPL',
            items: [
                {
                    id: 'modul01',
                    title: 'Pertemuan 1: Pengenalan Rekayasa Perangkat Lunak',
                    lines: [
                        '**Bold text** dan *italic* didukung.',
                        'card:Judul:Deskripsi konten kartu.',
                        'skill:85%:Label kompetensi:Tag level',
                        'table:[{"Kolom A": "Nilai 1", "Kolom B": "Nilai 2"}]',
                        '```javascript',
                        'const x = 1; // blok kode',
                        '```'
                    ]
                }
            ]
        }
    ]
};
```

### Inline Directives (inside `lines` arrays)

| Directive | Output |
|---|---|
| `card:Judul:Deskripsi` | Feature card (auto-gridded) |
| `skill:85%:Label:Tag` | Skill progress bar |
| `table:[{...}]` | Rendered data table |
| `` ```javascript `` ... `` ``` `` | Syntax-highlighted code block |
| `step:year:Label:Detail` | Timeline step |
| `form:quiz` | Protected quiz form |
| `form:validate-cert` | Certificate lookup form |

### Quiz Module

```javascript
pages.kuis = [
    {
        section: 'article',
        rightCol: {
            lines: ['form:quiz'],
            startTime: '2026-05-12T08:00:00',
            password: 'YourPassword',
            questions: [
                {
                    q: 'Apa perbedaan Verification dan Validation dalam RPL?',
                    options: [
                        'Sama saja, keduanya menguji kode',
                        'Verification: produk sudah benar? Validation: membangun dengan benar?',
                        'Verification: sesuai kebutuhan klien. Validation: sesuai desain.',
                        'Keduanya bagian dari SQA saja'
                    ],
                    ans: btoa('Verification: produk sudah benar? Validation: membangun dengan benar?')
                }
            ]
        }
    }
];
```

### Certificate Registry

```javascript
pages.certificates = {
    'SLS-2026-001': {
        name: 'Full Name',
        exam: 'Rekayasa Perangkat Lunak — Semester Genap 2026',
        score: '95/100',
        date: '19 April 2026'
    }
};
```

---

## Repository Structure

```
ocw-rpl/
├── index.html          # Entry point & layout shell
├── style.css           # Local overrides (info-card grid patch)
├── dataset.js          # pages registry & loadPageScripts()
├── learn-patch.js      # Prev/Next navigation + "Baca Penuh" modal
├── pages/
│   ├── index.js        # pageFiles manifest
│   ├── home.js         # Landing page — ringkasan kurikulum & sitasi
│   ├── learn.js        # 16-modul konten kuliah IMP307
│   ├── kuis.js         # Quiz engine data (UTS/UAS)
│   └── cert.js         # Certificate registry & verifier page
├── CITATION.cff        # Academic citation metadata
├── zenodo.json         # Zenodo deposit metadata
├── figshare.json       # Figshare deposit metadata
└── researchgate.json   # ResearchGate deposit metadata
```

---

## How to Cite

```bibtex
@software{sismadi_ocw_rpl_2026,
  author       = {Sismadi, Wawan},
  title        = {{OCW-RPL: Open Courseware Rekayasa Perangkat Lunak}},
  year         = {2026},
  publisher    = {Figshare},
  doi          = {10.5281/figshare.XXXXXXXX},
  url          = {https://doi.org/10.5281/figshare.XXXXXXXX},
  note         = {Open courseware for Software Engineering (IMP307).
                  16 modules covering SDLC, Requirements Engineering, DFD,
                  Software Design, White Box & Black Box Testing, and SQA.
                  Built on DonatJS zero-dependency micro-framework.
                  Repository: https://github.com/sismadi/ocw-rpl}
}
```
