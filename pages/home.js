pages.home = [
    // 1. HERO
    {
        section: 'hero',
        title: 'Open Courseware Rekayasa Perangkat Lunak',
        tagline: 'Dari Fondasi RPL hingga Penjaminan Mutu — Satu Semester, Satu Mindset Engineer Profesional.',
        description: 'Platform belajar terbuka untuk mata kuliah Rekayasa Perangkat Lunak (IMP307). 16 modul terstruktur memandu mahasiswa memahami seluruh siklus rekayasa perangkat lunak — dari studi kelayakan, pemilihan model SDLC, rekayasa kebutuhan, pemodelan DFD, desain perangkat lunak, hingga strategi pengujian White Box & Black Box dan Software Quality Assurance.',
        badges: [
            'Software Engineering',
            'SDLC: Waterfall · Agile · Spiral',
            '16 Modul',
            'White Box & Black Box Testing',
            'License: MIT',
            'DOI: 10.5281/figshare.XXXXXXXX'
        ],
        cta: {
            text: 'Mulai Belajar',
            link: 'learn'
        },
        imgClass: 'di-donat'
    },

    // 2. KATALOG KURSUS
    {
        section: 'courseCatalog',
        title: 'Katalog Kursus',
        description: 'Pilih kursus yang ingin kamu ikuti. Semua kursus di bawah ini gratis — daftar sekarang dan mulai belajar.'
    },

    // 3. KEY FEATURES — diambil dari 4 bagian kurikulum learn.js
    {
        section: 'features',
        items: [
            {
                icon: 'di-web',
                title: 'Fondasi & Manajemen RPL',
                content: 'Pengenalan RPL & karakteristik unik perangkat lunak, peran ganda PL sebagai Produk & Pengendali, Feasibility Studies (PIECES framework), dan Manajemen Proyek (4P: People, Product, Process, Project). 4 pertemuan untuk membangun mindset engineer yang sistematis.',
                linkText: 'Mulai Bagian 1 &raquo;',
                linkTarget: 'learn/modul01'
            },
            {
                icon: 'di-setting',
                title: 'Model Proses & Rekayasa Kebutuhan',
                content: 'Perbandingan model SDLC (Waterfall, Spiral, Agile/Scrum, RAD, Prototyping), Rekayasa Kebutuhan & penulisan SRS yang terukur, Verification vs Validation, serta Review Komprehensif menuju UTS.',
                linkText: 'Mulai Bagian 2 &raquo;',
                linkTarget: 'learn/modul05'
            },
            {
                icon: 'di-code',
                title: 'Pemodelan Analisis & Desain PL',
                content: 'DFD Level 0/1/2 & Kamus Data, Transform vs Transaction Mapping, desain arsitektural dengan metrik Cohesion & Coupling, desain antarmuka dan data. Dari SRS menjadi cetak biru lengkap sistem.',
                linkText: 'Mulai Bagian 3 &raquo;',
                linkTarget: 'learn/modul09'
            }
        ]
    },

    // 4. KURIKULUM + CARA SITASI
    {
        section: 'article',
        leftCol: {
            subtitle: 'Kurikulum 16 Modul',
            lines: [
                '### Bagian 1: Fondasi & Manajemen RPL',
                '**P1** — Pengenalan Rekayasa Perangkat Lunak',
                '**P2** — Pendalaman PL & Rekayasa Sistem',
                '**P3** — Feasibility Studies (Studi Kelayakan)',
                '**P4** — Manajemen Proyek Perangkat Lunak',
                '---',
                '### Bagian 2: Model Proses & Rekayasa Kebutuhan',
                '**P5** — Model Proses Pengembangan PL (SDLC)',
                '**P6** — Analysis dan Rekayasa Kebutuhan',
                '**P7** — Review Komprehensif & Penguatan Konsep',
                '**P8** — Evaluasi Tengah Semester (UTS)',
                '---',
                '### Bagian 3: Pemodelan Analisis & Desain PL',
                '**P9** — Pemodelan Analisis (DFD & Kamus Data)',
                '**P10** — Desain Perangkat Lunak (Arsitektural)',
                '**P11** — Desain Antarmuka & Data',
                '**P12** — Pemodelan & Desain Lanjutan',
                '---',
                '### Bagian 4: Pengujian & Penjaminan Mutu',
                '**P13** — Strategi Pengujian PL (White Box & Black Box)',
                '**P14** — Software Quality Assurance (SQA)',
                '**P15** — Review Akhir & Integrasi Kualitas',
                '**P16/UAS** — Evaluasi Akhir Semester (UAS)'
            ]
        },
        rightCol: {
            subtitle: 'Kompetensi Akhir & Cara Sitasi',
            lines: [
                '### Capaian Pembelajaran Mata Kuliah (CPMK)',
                'Mahasiswa mampu menerapkan konsep dan teknik **Rekayasa Perangkat Lunak** secara sistematis:',
                '```javascript',
                '// Kompetensi yang diuji di UAS (IMP307):\n// ✅ CPMK 3: DFD Leveling + Transform/Transaction Mapping\n// ✅ CPMK 3: Cohesion & Coupling — desain modul berkualitas\n// ✅ CPMK 4: White Box — V(G) = E - N + 2P + Basis Path\n// ✅ CPMK 4: Black Box — BVA 7 test case + Equiv. Partitioning\n// ✅ CPMK 5: SQA vs Testing — perbedaan mendasar\n// ✅ CPMK 5: FTR — mekanisme, aturan, dan output\n// ✅ CPMK 5: McCall Quality Factors (4 metrik utama)',
                '```',
                '---',
                '### Bobot Penilaian UAS',
                'skill:30%:CPMK 3: Pemodelan & Desain (DFD + SDD + Mapping):Utama',
                'skill:30%:CPMK 4: Strategi Pengujian (White Box + Black Box):Core',
                'skill:20%:CPMK 5: Software Quality Assurance (SQA + FTR):Mutu',
                'skill:20%:Ketepatan Analisis & Terminologi Standar Pressman:Profesional',
                '---',
                '### How to Cite This Courseware',
                '**Wawan Sismadi.** (2026). *OCW-RPL: Open Courseware Rekayasa Perangkat Lunak*. Figshare. DOI: 10.5281/figshare.XXXXXXXX'
            ]
        }
    }
];
