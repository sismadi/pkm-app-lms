pages.learn = {
    categories: [

        // =====================================================================
        // BAGIAN 1: FONDASI RPL & ANALISIS
        // =====================================================================
        {
            name: 'Bagian 1: Fondasi & Manajemen RPL',
            items: [

                // -------------------------------------------------------------
                // MODUL 01
                // -------------------------------------------------------------
                {
                    id: 'modul01',
                    title: 'Pertemuan 1: Pengenalan Rekayasa Perangkat Lunak',
                    lines: [
                        'Rekayasa Perangkat Lunak bukan sekadar menulis kode — ini tentang membangun solusi yang bisa diandalkan.',
                        '---',

                        '### Kontrak & Target Pembelajaran',
                        'card:Tujuan Akhir:Memahami konsep, model proses, analisis, desain, hingga pengujian perangkat lunak secara sistematis.',
                        'card:Penilaian:Tugas harian, kuis mingguan, UTS (10%), dan UAS sebagai evaluasi komprehensif.',
                        'card:Sikap Profesional:Datang tepat waktu, mengerjakan tugas sendiri, dan berani bertanya.',
                        '---',

                        '### Apa Itu Rekayasa Perangkat Lunak?',
                        '**Point** — RPL adalah disiplin ilmu untuk membangun perangkat lunak secara sistematis, terukur, dan berkualitas.',
                        '**Reason** — Tanpa pendekatan rekayasa, software menjadi *kode spaghetti* — sulit dipelihara, penuh bug, dan mahal diperbaiki.',
                        '**Example** — Proyek NASA Mars Orbiter 1999 gagal karena kesalahan satuan (pon vs newton) — bukan masalah kode, tapi proses rekayasa.',
                        '**Penegasan** — RPL memastikan setiap baris kode memiliki tujuan, dapat diuji, dan dapat dipelihara oleh orang lain.',
                        '---',

                        '### 3 Elemen Wajib Perangkat Lunak',
                        'skill:100%:Instruksi (Program) — Kode eksekusi yang menghasilkan fungsi & performa.:Elemen',
                        'skill:100%:Struktur Data — Representasi & manipulasi informasi secara efisien.:Elemen',
                        'skill:100%:Dokumentasi — Manual pengguna & dokumen teknis untuk keberlanjutan.:Elemen',
                        '---',

                        '### Karakteristik Unik Perangkat Lunak',
                        'table:[{"Kategori":"Karakteristik","Detail":"Developed, not Manufactured — direkayasa, bukan dipabrikasi seperti baut atau chip."},{"Kategori":"Karakteristik","Detail":"Does not Wear Out — tidak aus secara fisik, tapi kualitasnya bisa menurun akibat perubahan (software decay)."},{"Kategori":"Karakteristik","Detail":"Custom Built — sebagian besar masih dibangun khusus, meski tren komponen reusable terus berkembang."},{"Kategori":"Aktivitas Proses","Detail":"Software Specification — mendefinisikan batasan dan fungsi yang harus dipenuhi sistem."},{"Kategori":"Aktivitas Proses","Detail":"Software Development — merancang arsitektur dan menulis kode berdasarkan spesifikasi."},{"Kategori":"Aktivitas Proses","Detail":"Software Validation — memverifikasi bahwa sistem sesuai keinginan dan kebutuhan pelanggan."},{"Kategori":"Aktivitas Proses","Detail":"Software Evolution — memelihara dan mengembangkan sistem sesuai perubahan kebutuhan."}]',
                        '---',

                        '### Analogi: Software vs Hardware Decay',
                        '```javascript',
                        '// Hardware: Fisik aus seiring waktu\nfunction hardwareLifecycle() {\n  let quality = 100;\n  while (quality > 0) {\n    quality -= 1; // Aus secara linear\n  }\n  return \'Rusak total\';\n}\n\n// Software: Tidak aus, tapi bisa \'membusuk\' akibat perubahan\nfunction softwareDecay() {\n  let quality = 100;\n  const changes = [\'patch_A\', \'feature_B\', \'hotfix_C\'];\n\n  changes.forEach(change => {\n    if (!isWellEngineered(change)) {\n      quality -= 15; // Setiap perubahan buruk = penurunan kualitas\n    }\n  });\n\n  return `Kualitas tersisa: ${quality}%`;\n}\n\n// Kesimpulan: RPL hadir untuk memastikan isWellEngineered() = true',
                        '```',
                        '---',

                        '### Mitos vs Realita dalam RPL',
                        'card:Mitos: "Dokumen itu buang-buang waktu":Realita: 60% biaya proyek software adalah untuk pemeliharaan. Dokumentasi yang baik memangkas biaya ini secara drastis.',
                        'card:Mitos: "Kita bisa tambah programmer untuk percepat":Realita: Hukum Brooks — menambah orang ke proyek yang terlambat justru semakin memperburuk keterlambatan.',
                        'card:Mitos: "Software sudah jadi, tidak perlu diubah":Realita: Kebutuhan selalu berevolusi. Software yang tidak dirancang untuk berubah akan menjadi beban teknis.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 02
                // -------------------------------------------------------------
                {
                    id: 'modul02',
                    title: 'Pertemuan 2: Pendalaman Perangkat Lunak & Rekayasa Sistem',
                    lines: [
                        'Perangkat lunak bukan hanya aplikasi di layar — ia adalah tulang punggung ekosistem teknologi modern.',
                        '---',

                        '### Peran Ganda Perangkat Lunak',
                        '**Point** — Perangkat lunak berperan ganda: sebagai **Produk** yang digunakan, dan sebagai **Pengendali (Vehicle)** yang menjalankan produk lain.',
                        '**Reason** — Memahami peran ini penting agar insinyur tahu kapan mereka membangun "nilai langsung" untuk pengguna, dan kapan membangun "infrastruktur" untuk sistem lain.',
                        '**Example** — Microsoft Excel = Produk (nilai langsung ke pengguna). Linux Kernel = Pengendali (kendali hardware & menjadi fondasi OS lain).',
                        '**Penegasan** — Setiap keputusan desain harus diawali dengan pertanyaan: "Software ini adalah produk atau pengendali?"',
                        '---',

                        '### Kategori Perangkat Lunak Modern',
                        'table:[{"Kategori":"System Software","Contoh":"OS, Driver, Compiler","Fungsi":"Melayani program lain, bukan pengguna akhir secara langsung."},{"Kategori":"Application Software","Contoh":"Word, Shopee, Zoom","Fungsi":"Memecahkan masalah bisnis atau personal pengguna akhir."},{"Kategori":"Engineering/Scientific","Contoh":"AutoCAD, MATLAB","Fungsi":"Kalkulasi numerik dan simulasi intensif."},{"Kategori":"Embedded Software","Contoh":"Firmware AC, ECU Mobil","Fungsi":"Mengontrol hardware spesifik dalam produk fisik."},{"Kategori":"Web/Mobile App","Contoh":"Tokopedia, Instagram","Fungsi":"Layanan berbasis jaringan dan perangkat genggam."},{"Kategori":"AI Software","Contoh":"ChatGPT, Gemini","Fungsi":"Sistem cerdas berbasis data dan model prediktif."}]',
                        '---',

                        '### 4 Aktivitas Fundamental Proses RPL',
                        'skill:25%:1. Specification — Definisi fungsi & batasan sistem yang akan dibangun.:Proses',
                        'skill:50%:2. Development — Perancangan arsitektur dan penulisan kode program.:Proses',
                        'skill:75%:3. Validation — Pengujian untuk memastikan sistem sesuai kebutuhan klien.:Proses',
                        'skill:100%:4. Evolution — Pemeliharaan dan pengembangan lanjut pasca-rilis.:Proses',
                        '---',

                        '### Rekayasa Sistem: Gambaran Besar',
                        'card:Definisi:System Engineering adalah pendekatan interdisipliner untuk mewujudkan sistem yang berhasil — mencakup HW, SW, manusia, prosedur, dan data.',
                        'card:Hierarki Sistem:World → Domain → System → Subsystem → Software. RPL bekerja di level Software, tapi harus memahami level di atasnya.',
                        'card:Implikasi Praktis:Seorang software engineer yang tidak memahami domain bisnis klien akan membangun sistem yang "benar secara teknis tapi salah secara kebutuhan".',
                        '---',

                        '### Contoh: Produk vs Pengendali dalam Kode',
                        '```javascript',
                        '// SOFTWARE SEBAGAI PRODUK\n// Memberikan nilai langsung ke pengguna\nfunction kalkulatorGaji(gajiPokok, tunjangan, potongan) {\n  const total = gajiPokok + tunjangan - potongan;\n  return `Gaji bersih: Rp ${total.toLocaleString(\'id-ID\')}`;\n}\n\n// SOFTWARE SEBAGAI PENGENDALI\n// Mengatur sistem lain agar berjalan\nclass DatabaseController {\n  connect(host, port) {\n    return `Terhubung ke ${host}:${port}`;\n  }\n  query(sql) {\n    return this.engine.execute(sql);\n  }\n}',
                        '```',
                        '---',

                        '### Produk vs Proses dalam RPL',
                        'table:[{"Aspek":"Produk","Deskripsi":"Hasil akhir yang diserahkan: program, dokumen, dan data yang memiliki nilai bagi pelanggan."},{"Aspek":"Proses","Deskripsi":"Cara dan metode untuk membangun produk: standar, alat, dan praktik yang digunakan tim."},{"Aspek":"Hubungan Keduanya","Deskripsi":"Proses yang baik menghasilkan produk yang baik. Proses buruk akan selalu menghasilkan produk bermasalah."}]',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 03
                // -------------------------------------------------------------
                {
                    id: 'modul03',
                    title: 'Pertemuan 3: Feasibility Studies (Studi Kelayakan)',
                    lines: [
                        'Proyek terbaik bukan yang paling ambisius — tapi yang paling layak untuk diselesaikan.',
                        '---',

                        '### Mengapa Studi Kelayakan Wajib Dilakukan?',
                        '**Point** — Studi Kelayakan menentukan apakah sebuah proyek layak dilanjutkan dari sisi teknis, ekonomis, dan operasional sebelum ada yang menulis satu baris kode.',
                        '**Reason** — Memulai proyek tanpa studi kelayakan ibarat membangun gedung tanpa cek kondisi tanah. Bisa runtuh di tengah jalan dengan biaya yang sudah terlanjur besar.',
                        '**Example** — Proyek e-KTP Indonesia menghabiskan Rp 5,9 triliun lebih — sebagian besar pemborosan bermula dari kelayakan teknis dan operasional yang tidak dikaji matang di awal.',
                        '**Penegasan** — Biaya memperbaiki kesalahan di fase analisis = 1x. Di fase desain = 10x. Di fase produksi = 100x. Studi kelayakan mencegah kesalahan paling mahal.',
                        '---',

                        '### Framework PIECES — 6 Aspek Kelayakan',
                        'skill:100%:P — Performance: Apakah sistem baru akan meningkatkan throughput & waktu respons?:PIECES',
                        'skill:100%:I — Information: Apakah sistem menghasilkan informasi yang akurat, tepat waktu, dan relevan?:PIECES',
                        'skill:100%:E — Economics: Apakah manfaat finansial melebihi biaya pengembangan? (ROI):PIECES',
                        'skill:100%:C — Control: Apakah sistem meningkatkan keamanan dan kontrol data?:PIECES',
                        'skill:100%:E — Efficiency: Apakah sistem mengurangi pemborosan sumber daya manusia dan waktu?:PIECES',
                        'skill:100%:S — Services: Apakah sistem meningkatkan kualitas layanan kepada pengguna akhir?:PIECES',
                        '---',

                        '### 3 Jenis Kelayakan Utama',
                        'table:[{"Jenis":"Technical Feasibility","Pertanyaan Kunci":"Apakah teknologi yang dibutuhkan tersedia dan tim memiliki keahliannya?","Output":"Rekomendasi stack teknologi dan kebutuhan pelatihan."},{"Jenis":"Economic Feasibility","Pertanyaan Kunci":"Apakah benefit > cost? Berapa lama Break Even Point-nya?","Output":"Analisis Cost-Benefit dan proyeksi ROI."},{"Jenis":"Operational Feasibility","Pertanyaan Kunci":"Apakah sistem akan diterima dan digunakan oleh pengguna dan organisasi?","Output":"Analisis perubahan prosedur dan kebutuhan pelatihan SDM."}]',
                        '---',

                        '### Contoh: Kalkulasi Cost-Benefit Analysis',
                        '```javascript',
                        'function costBenefitAnalysis(costs, benefits, years) {\n  const totalCost    = costs.development + costs.operational * years;\n  const totalBenefit = benefits.efficiency + benefits.revenue * years;\n  const netBenefit   = totalBenefit - totalCost;\n  const roi          = ((netBenefit / totalCost) * 100).toFixed(2);\n  const breakEven    = (costs.development / (benefits.revenue - costs.operational)).toFixed(1);\n\n  return {\n    totalCost   : `Rp ${totalCost.toLocaleString(\'id-ID\')}`,\n    totalBenefit: `Rp ${totalBenefit.toLocaleString(\'id-ID\')}`,\n    roi         : `${roi}%`,\n    breakEven   : `${breakEven} tahun`,\n    rekomendasi : netBenefit > 0 ? \'✅ LANJUTKAN PROYEK\' : \'❌ TINJAU ULANG\'\n  };\n}',
                        '```',
                        '---',

                        '### Hambatan Umum & Cara Mengatasinya',
                        'table:[{"Hambatan":"Data tidak akurat atau tidak tersedia","Solusi":"Lakukan survei awal, wawancara stakeholder, dan benchmarking industri."},{"Hambatan":"Tekanan manajemen untuk segera mulai","Solusi":"Tunjukkan data bahwa biaya tanpa kelayakan = risiko 10x lebih besar."},{"Hambatan":"Bias optimisme (overestimate benefit)","Solusi":"Gunakan analisis skenario: Best Case, Expected Case, Worst Case."},{"Hambatan":"Perubahan kebutuhan yang cepat","Solusi":"Pertimbangkan model Agile/iteratif sejak tahap studi kelayakan."}]',
                        '---',

                        '### Output Studi Kelayakan',
                        'card:✅ Lanjutkan (Go):Semua aspek PIECES terpenuhi. Proyek memiliki nilai bisnis yang jelas dan risiko terkontrol.',
                        'card:⚠️ Revisi (Conditional Go):Beberapa aspek perlu penyesuaian — scope dipersempit, teknologi diganti, atau jadwal direlaksasi.',
                        'card:❌ Batalkan (No Go):Risiko terlalu tinggi, atau benefit tidak sebanding dengan investasi yang dibutuhkan.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 04
                // -------------------------------------------------------------
                {
                    id: 'modul04',
                    title: 'Pertemuan 4: Manajemen Proyek Perangkat Lunak',
                    lines: [
                        'Kode yang bagus tidak berguna jika proyeknya terlambat, kelebihan anggaran, atau tidak sesuai yang diminta.',
                        '---',

                        '### Mengapa Manajemen Proyek PL Kritis?',
                        '**Point** — Manajemen Proyek adalah yang membedakan proyek yang "selesai dengan baik" dari proyek yang "dibatalkan di tengah jalan" meski kualitas kodenya sama.',
                        '**Reason** — Studi Standish Group (CHAOS Report): hanya 31% proyek software yang berhasil. 52% terlambat/overbudget, 17% dibatalkan.',
                        '**Example** — Proyek Healthcare.gov (AS) diluncurkan 2013 dengan biaya $400 juta tapi crash di hari pertama — bukan karena kode buruk, tapi karena project management yang gagal.',
                        '**Penegasan** — Seorang programmer hebat tanpa manajemen proyek adalah aset. Dengan manajemen proyek yang buruk, ia menjadi sumber kekacauan.',
                        '---',

                        '### Spektrum The 4 P\'s of Software Management',
                        'skill:100%:People (Manusia) — Pemilihan tim, struktur organisasi, motivasi, dan resolusi konflik.:4P',
                        'skill:100%:Product (Produk) — Definisi scope, dekomposisi fungsi, dan penentuan batas proyek.:4P',
                        'skill:100%:Process (Proses) — Pemilihan model SDLC yang tepat sesuai karakteristik proyek.:4P',
                        'skill:100%:Project (Proyek) — Seluruh aktivitas perencanaan dan pengendalian untuk pengiriman produk.:4P',
                        '---',

                        '### 4 Aktivitas Utama Manajemen Proyek',
                        'table:[{"Aktivitas":"Project Planning","Deskripsi":"Mendefinisikan scope, task, milestone, dan estimasi biaya. Output: Project Plan Document."},{"Aktivitas":"Project Scheduling","Deskripsi":"Menyusun urutan dan durasi pekerjaan. Tools: Gantt Chart (sederhana) atau PERT Chart (kompleks)."},{"Aktivitas":"Risk Management","Deskripsi":"Mengidentifikasi risiko, menilai probabilitas & dampak, lalu membuat rencana mitigasi."},{"Aktivitas":"Monitoring & Control","Deskripsi":"Memantau progress aktual vs rencana. Tindakan korektif jika terjadi deviasi signifikan."}]',
                        '---',

                        '### Contoh: Struktur Sederhana Risk Register',
                        '```json',
                        '{\n  "project": "Sistem Informasi Akademik v2",\n  "risk_register": [\n    {\n      "id": "R01",\n      "deskripsi": "Kebutuhan pengguna berubah saat pengembangan",\n      "probabilitas": "Tinggi",\n      "dampak": "Tinggi",\n      "skor_risiko": 9,\n      "mitigasi": "Gunakan metodologi Agile dengan sprint review mingguan"\n    },\n    {\n      "id": "R02",\n      "deskripsi": "Anggota tim kunci resign di tengah proyek",\n      "probabilitas": "Sedang",\n      "dampak": "Tinggi",\n      "skor_risiko": 6,\n      "mitigasi": "Dokumentasi teknis wajib, pair programming untuk knowledge sharing"\n    }\n  ]\n}',
                        '```',
                        '---',

                        '### Teknik Estimasi Proyek',
                        'card:LOC (Lines of Code):Estimasi berdasarkan jumlah baris kode yang diprediksi. Sederhana tapi kasar — kualitas tidak tercermin.',
                        'card:Function Point (FP):Mengukur fungsionalitas dari perspektif pengguna. Lebih akurat dan tidak bergantung bahasa pemrograman.',
                        'card:COCOMO Model:Model parametrik berbasis ukuran proyek (SLOC). Ada 3 level: Basic, Intermediate, dan Detailed.',
                    ]
                },
            ]
        },

        // =====================================================================
        // BAGIAN 2: MODEL PROSES & REKAYASA KEBUTUHAN
        // =====================================================================
        {
            name: 'Bagian 2: Model Proses & Rekayasa Kebutuhan',
            items: [

                // -------------------------------------------------------------
                // MODUL 05
                // -------------------------------------------------------------
                {
                    id: 'modul05',
                    title: 'Pertemuan 5: Model Proses Pengembangan PL (SDLC)',
                    lines: [
                        'Tidak ada model proses terbaik — hanya model yang paling tepat untuk konteks proyeknya.',
                        '---',

                        '### Mengapa Pemilihan Model SDLC Sangat Penting?',
                        '**Point** — Model SDLC menentukan kapan, bagaimana, dan oleh siapa setiap aktivitas pengembangan dilakukan. Pilihan yang salah = proyek yang kacau.',
                        '**Reason** — Setiap proyek memiliki karakteristik unik: tingkat kepastian kebutuhan, toleransi risiko, ukuran tim, dan tenggat waktu.',
                        '**Example** — Membangun software untuk alat kesehatan (FDA-regulated) = Waterfall wajib. Membangun startup app = Agile/Scrum jauh lebih efisien.',
                        '**Penegasan** — Kuasai minimal 3 model (Waterfall, Prototyping, Agile/Spiral) dan tahu kapan masing-masing harus digunakan.',
                        '---',

                        '### Perbandingan Model SDLC Utama',
                        'table:[{"Model":"Waterfall","Cocok Untuk":"Kebutuhan statis, tim besar, proyek regulasi ketat","Kelebihan":"Struktur jelas, mudah dikelola","Kekurangan":"Kaku — perubahan kebutuhan sangat mahal"},{"Model":"Prototyping","Cocok Untuk":"Kebutuhan tidak jelas, butuh validasi cepat","Kelebihan":"Membantu eksplorasi kebutuhan user","Kekurangan":"Bisa berakhir jadi \'throw-away\' yang mahal"},{"Model":"Spiral","Cocok Untuk":"Proyek besar & kompleks dengan risiko tinggi","Kelebihan":"Manajemen risiko di setiap iterasi","Kekurangan":"Mahal, butuh analis risiko berpengalaman"},{"Model":"RAD","Cocok Untuk":"Waktu sangat terbatas, scope modular","Kelebihan":"Pengembangan sangat cepat dengan tools otomatis","Kekurangan":"Sulit untuk sistem yang butuh high-performance"},{"Model":"Agile/Scrum","Cocok Untuk":"Kebutuhan dinamis, tim kecil, startup","Kelebihan":"Fleksibel, feedback cepat, rilis inkremental","Kekurangan":"Kurang cocok untuk proyek dengan kontrak harga tetap"}]',
                        '---',

                        '### Analogi Waterfall vs Agile dalam Pseudocode',
                        '```javascript',
                        '// MODEL WATERFALL — Sekuensial, satu arah\nfunction waterfallProject(requirements) {\n  const analysis = analyze(requirements);  // Selesai 100% dulu\n  const design   = design(analysis);\n  const code     = develop(design);\n  const tested   = test(code);\n  return deploy(tested);                   // Rilis SEKALI di akhir\n  // ⚠️ Jika requirements salah = seluruh proses harus diulang!\n}\n\n// MODEL AGILE — Iteratif, inkremental\nfunction agileProject(requirements) {\n  let product = [];\n  const sprints = groupIntoSprints(requirements);\n  sprints.forEach(sprint => {\n    const coded  = develop(analyze(sprint));\n    const tested = test(coded);\n    product.push(tested);              // Rilis bertahap!\n    requirements = getNewFeedback();  // Kebutuhan bisa berubah\n  });\n  return product;\n}',
                        '```',
                        '---',

                        '### Model Spiral — Quadrant Analysis',
                        'card:Kuadran 1: Planning:Menentukan tujuan, alternatif, dan batasan iterasi saat ini.',
                        'card:Kuadran 2: Risk Analysis:Evaluasi alternatif dan identifikasi/resolusi risiko utama iterasi.',
                        'card:Kuadran 3: Engineering:Pengembangan dan pengujian produk iterasi saat ini.',
                        'card:Kuadran 4: Evaluation:Review hasil oleh klien dan perencanaan iterasi berikutnya.',
                        '---',

                        '### Karakteristik Model Proses',
                        'skill:100%:Waterfall — Requirement → Analysis → Design → Code → Test → Deploy:Linear',
                        'skill:100%:Prototyping — Bangun prototipe cepat → Review → Refine → Ulangi:Eksplorasi',
                        'skill:100%:Spiral — Plan → Analisis Risiko → Engineering → Evaluasi → Ulang:Risk-Driven',
                        'skill:100%:Agile — Sprint (2 minggu) → Demo → Feedback → Sprint berikutnya:Iteratif',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 06
                // -------------------------------------------------------------
                {
                    id: 'modul06',
                    title: 'Pertemuan 6: Analysis dan Rekayasa Kebutuhan',
                    lines: [
                        'Membangun sistem yang salah dengan sempurna adalah kegagalan terbesar dalam rekayasa perangkat lunak.',
                        '---',

                        '### Mengapa Rekayasa Kebutuhan adalah Fondasi Segalanya?',
                        '**Point** — Rekayasa Kebutuhan adalah proses mendefinisikan **APA** yang harus dilakukan sistem — bukan bagaimana. Tanpa ini, tim membangun sesuatu yang mungkin tidak dibutuhkan siapapun.',
                        '**Reason** — Biaya memperbaiki requirement yang salah di fase analisis = 1x. Di fase pengujian = 50x. Di fase produksi (sudah rilis) = 200x.',
                        '**Example** — Sistem Bima Sakti BPJS Ketenagakerjaan sempat bermasalah karena fitur klaim online tidak sesuai kebutuhan aktual petugas — requirement gap yang mahal.',
                        '**Penegasan** — Dokumen kebutuhan yang baik (SRS) adalah kontrak teknis antara klien dan developer. Ia melindungi kedua pihak dari saling menyalahkan.',
                        '---',

                        '### Functional vs Non-Functional Requirements',
                        'table:[{"Tipe":"Functional Requirements","Definisi":"APA yang harus dilakukan sistem","Contoh":"Sistem harus bisa memproses login dengan username dan password."},{"Tipe":"Non-Functional Requirements","Definisi":"SEBERAPA BAIK sistem harus melakukannya","Contoh":"Sistem harus merespons login dalam < 2 detik dengan 1000 user konkuren."},{"Tipe":"Domain Requirements","Definisi":"Aturan spesifik domain bisnis/industri","Contoh":"Sistem perbankan harus mematuhi regulasi OJK tentang enkripsi data nasabah."}]',
                        '---',

                        '### 3 Area Analisis Utama',
                        'card:Analisis Masalah:Mengidentifikasi akar masalah (root cause) yang ingin diselesaikan. Gunakan teknik 5-Why atau Fishbone Diagram.',
                        'card:Analisis Domain:Memahami konteks bisnis dan lingkungan tempat software akan hidup. Tanpa ini, solusi teknis bisa benar tapi tidak relevan.',
                        'card:Analisis Persyaratan:Mengumpulkan, mendefinisikan, dan memprioritaskan kebutuhan spesifik dari semua stakeholder yang terlibat.',
                        '---',

                        '### Teknik Elicitation (Penggalian Kebutuhan)',
                        'table:[{"Teknik":"Interview","Kapan":"Kebutuhan kompleks, butuh detail mendalam dari stakeholder kunci","Hasil":"Pemahaman mendalam tapi bergantung pada kualitas pertanyaan."},{"Teknik":"Questionnaire","Kapan":"Stakeholder banyak dan tersebar, butuh data kuantitatif","Hasil":"Data statistik tapi kurang mendalam."},{"Teknik":"Observation","Kapan":"Proses bisnis yang kompleks dan sulit dijelaskan","Hasil":"Insight nyata tapi memerlukan waktu."},{"Teknik":"Use Case","Kapan":"Mendefinisikan interaksi user-system secara visual","Hasil":"Gambaran jelas alur fungsional sistem."},{"Teknik":"Prototyping","Kapan":"Kebutuhan belum jelas, user kesulitan berartikulasi","Hasil":"Feedback konkret, tapi bisa salah dipersepsikan sebagai produk final."}]',
                        '---',

                        '### Contoh: Penulisan SRS yang Baik vs Buruk',
                        '```javascript',
                        '// ❌ SRS YANG BURUK — Ambigu dan tidak terukur\nconst buruk = {\n  req_01: "Sistem harus cepat.",\n  req_02: "Tampilan harus bagus dan modern.",\n  req_03: "Sistem harus aman dari hacker."\n};\n\n// ✅ SRS YANG BAIK — Spesifik, Terukur, Dapat Diuji\nconst bagus = {\n  req_01: {\n    id: \'FR-001\',\n    deskripsi: \'Halaman dashboard harus ter-load dalam < 3 detik\',\n    kondisi: \'pada koneksi 10 Mbps dengan 500 user konkuren\',\n    kriteria_uji: \'Load test menggunakan Apache JMeter dengan threshold 3000ms\'\n  },\n  req_03: {\n    id: \'NFR-002\',\n    deskripsi: \'Password di-hash menggunakan bcrypt dengan cost factor >= 12\',\n    kriteria_uji: \'Security audit menggunakan OWASP Top 10 checklist\'\n  }\n};',
                        '```',
                        '---',

                        '### Validasi Kebutuhan',
                        'card:Formal Technical Review (FTR):Tim developer dan klien mereview dokumen SRS bersama untuk menemukan inkonsistensi, ambiguitas, dan gap kebutuhan.',
                        'card:Prototype Validation:Buat prototipe cepat (mockup/wireframe) dan minta feedback pengguna sebelum implementasi penuh dimulai.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 07
                // -------------------------------------------------------------
                {
                    id: 'modul07',
                    title: 'Pertemuan 7: Review Komprehensif & Penguatan Konsep',
                    lines: [
                        'Memahami peta perjalanan lebih penting dari hafal setiap detail jalan.',
                        '---',

                        '### Peta Koneksi Materi (Big Picture)',
                        'card:P1-P2: Fondasi RPL:Definisi, karakteristik, dan peran ganda software. Dasar untuk memahami semua yang berikutnya.',
                        'card:P3: Filter Awal:Studi kelayakan memfilter proyek SEBELUM dimulai. Mencegah investasi sia-sia.',
                        'card:P4: Kendali Eksekusi:Manajemen proyek (4P) memastikan proyek berjalan sesuai biaya, waktu, dan kualitas.',
                        'card:P5: Strategi Pengembangan:Pemilihan SDLC yang tepat menentukan ritme dan struktur seluruh aktivitas pengembangan.',
                        'card:P6: Kontrak Teknis:Rekayasa kebutuhan menghasilkan SRS — dokumen yang menjadi acuan semua fase berikutnya.',
                        '---',

                        '### Pertanyaan Kunci Pemahaman (Self-Assessment)',
                        'table:[{"Topik":"Karakteristik PL","Pertanyaan Kunci":"Mengapa software \'tidak aus\' tapi bisa menurun kualitasnya? Jelaskan dengan contoh nyata."},{"Topik":"Studi Kelayakan","Pertanyaan Kunci":"Sebuah startup punya ide bagus tapi tim tidak berpengalaman. Aspek PIECES mana yang paling kritis?"},{"Topik":"Manajemen 4P","Pertanyaan Kunci":"Jika proyek terlambat, apakah menambah orang (People) selalu menjadi solusi? Jelaskan dengan Hukum Brooks."},{"Topik":"Pemilihan SDLC","Pertanyaan Kunci":"Klien tidak bisa menjelaskan kebutuhannya dengan jelas. Model mana yang paling tepat dan mengapa?"},{"Topik":"Rekayasa Kebutuhan","Pertanyaan Kunci":"Apa perbedaan Validation vs Verification? Berikan contoh konkret untuk masing-masing."}]',
                        '---',

                        '### Perbedaan Kritis: Verification vs Validation',
                        '**Point** — Ini adalah konsep yang paling sering disalahpahami dalam RPL — dan hampir selalu muncul di ujian.',
                        '**Reason** — Keduanya berkaitan dengan kualitas tapi menguji hal yang berbeda: satu tentang proses, satu tentang produk akhir.',
                        '**Verification** — "Apakah kita membangun produk dengan **BENAR**?" → Cek apakah kode sesuai design document. *(Proses internal)*',
                        '**Validation** — "Apakah kita membangun produk yang **BENAR**?" → Cek apakah produk sesuai kebutuhan klien. *(Orientasi eksternal)*',
                        '---',

                        '### Rangkuman: Alur Pemikiran dari P1 ke P6',
                        '```bash',
                        '# PERJALANAN DARI IDE KE KODE — Alur Konseptual P1-P6\n\n# P1-P2: Kita membangun apa dan mengapa penting?\n$ define_software_and_its_role\n\n# P3: Apakah proyek ini LAYAK dibuat?\n$ run_feasibility_study --checks PIECES\n  → OUTPUT: Go / No-Go / Conditional\n\n# P4: Bagaimana kita MENGELOLA pembuatannya?\n$ setup_project_management --4P people,product,process,project\n  → OUTPUT: Project Plan, Risk Register, Gantt Chart\n\n# P5: Strategi pengembangan mana yang TEPAT?\n$ select_sdlc_model --context requirements_clarity,risk_level,team_size\n  → OUTPUT: Waterfall / Spiral / Agile\n\n# P6: APA TEPATNYA yang harus dibangun?\n$ elicit_and_document_requirements --output SRS\n  → OUTPUT: Software Requirements Specification (SRS)',
                        '```',
                        '---',

                        '### Indikator Kesiapan UTS',
                        'skill:90%:Mampu jelaskan karakteristik unik PL:Fondasi — Wajib Kuasai',
                        'skill:85%:Mampu pilih model SDLC berdasarkan kasus:Analisis — Sering Diuji',
                        'skill:95%:Pahami perbedaan Verification vs Validation:Kritis — Hampir Pasti Muncul',
                        'skill:80%:Mampu identifikasi aspek kelayakan PIECES:Penting — Berpotensi Kasus',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 08 — UTS
                // -------------------------------------------------------------
                {
                    id: 'modul08',
                    title: 'Pertemuan 8: Evaluasi Tengah Semester (UTS)',
                    lines: [
                        'UTS bukan ujian hafalan — ini ujian kemampuan Anda menganalisis situasi nyata.',
                        '---',

                        '### Kisi-Kisi Utama yang Wajib Dikuasai',
                        'card:CPMK 1: Konsep Dasar & SDLC:Definisi PL, karakteristik "engineered not manufactured", dan kemampuan memilih model proses (Waterfall/Spiral/Agile) berdasarkan kasus.',
                        'card:CPMK 2: Kelayakan & Kebutuhan:Analisis aspek Teknis, Ekonomi, Operasional (PIECES), serta pemahaman dokumen SRS dan perbedaan Functional vs Non-Functional Requirements.',
                        'card:CPMK 2: Manajemen (4P):Penguasaan spektrum People, Product, Process, Project dan implikasinya dalam mengelola proyek software nyata.',
                        '---',

                        '### Strategi Menjawab Berdasarkan Tipe Soal',
                        'table:[{"Tipe Soal":"Analisis Kasus","Strategi":"Identifikasi variabel kasus (kepastian kebutuhan, risiko, ukuran tim), lalu rekomendasikan model SDLC dengan justifikasi."},{"Tipe Soal":"Komparasi","Strategi":"Gunakan tabel mental: buat 2-3 poin perbedaan fundamental, bukan persamaan superfisial."},{"Tipe Soal":"Definisi Teknis","Strategi":"Definisi + Contoh konkret + Alasan mengapa konsep ini penting. Jangan hanya menulis ulang definisi buku."},{"Tipe Soal":"Pemecahan Masalah","Strategi":"Gunakan framework PIECES atau 4P sebagai struktur jawaban — menunjukkan penguasaan metodologi."}]',
                        '---',

                        '### Contoh Jawaban Soal Analisis Kasus',
                        '```bash',
                        '# SOAL: Startup FinTech baru ingin membangun aplikasi pembayaran.\n# Kebutuhan berubah cepat, tim 5 orang, deadline 6 bulan.\n# Model SDLC apa yang paling cocok? Jelaskan.\n\n# POINT:\nRekomendasi: Agile/Scrum\n\n# REASON:\n- Kebutuhan dinamis → Waterfall tidak cocok (kaku)\n- Tim kecil (5 orang) → Komunikasi informal, ideal untuk Agile\n- Deadline pendek → Sprint 2 minggu = rilis inkremental tiap bulan\n- Domain FinTech = feedback user sangat kritikal\n\n# EXAMPLE:\nSprint 1 (2 minggu): Login + Register\nSprint 2 (2 minggu): Transfer Uang\nSprint 3 (2 minggu): Top Up & History\n→ Setelah Sprint 3 sudah ada MVP yang bisa diuji pengguna nyata',
                        '```',
                        '---',

                        '### Checklist Persiapan Mandiri',
                        'skill:100%:Perbedaan Functional vs Non-Functional Requirements:Wajib + Berikan Contoh',
                        'skill:100%:Analisis Risiko pada Model Spiral (4 Kuadran):Krusial — Gambar Diagramnya',
                        'skill:100%:Karakteristik PL (Engineered, Not Worn Out, Custom):Dasar — Selalu Muncul',
                        'skill:100%:Verification vs Validation — Definisi + Contoh:Sangat Kritis',
                        'skill:85%:Hukum Brooks — Implikasi Penambahan Orang:Sering Masuk Kasus',
                        '---',

                        '### Informasi Penilaian UTS',
                        'card:Bobot Nilai:UTS berkontribusi sebesar **10%** terhadap nilai akhir mata kuliah IMP307.',
                        'card:Standar Kelulusan:Ketepatan dan kelengkapan analisis sesuai standar nilai universitas. Jawaban konseptual didukung contoh aplikatif lebih bernilai.',
                        'form:quiz',
                    ]
                },
            ]
        },

        // =====================================================================
        // BAGIAN 3: PEMODELAN & DESAIN
        // =====================================================================
        {
            name: 'Bagian 3: Pemodelan Analisis & Desain Perangkat Lunak',
            items: [

                // -------------------------------------------------------------
                // MODUL 09
                // -------------------------------------------------------------
                {
                    id: 'modul09',
                    title: 'Pertemuan 9: Pemodelan Analisis (DFD & Kamus Data)',
                    lines: [
                        'Sebuah diagram yang tepat menggantikan seribu halaman deskripsi teks.',
                        '---',

                        '### Mengapa DFD adalah Alat Analisis Paling Fundamental?',
                        '**Point** — DFD (Data Flow Diagram) adalah model grafis yang menggambarkan bagaimana data bergerak, diproses, dan disimpan dalam sistem — tanpa terikat bahasa pemrograman apapun.',
                        '**Reason** — Klien tidak bisa membaca kode, developer tidak tahu semua proses bisnis. DFD adalah jembatan komunikasi yang dipahami semua pihak.',
                        '**Example** — Sistem Informasi Akademik: Mahasiswa → [Input KRS] → {Proses: Kalkulasi IP} → {DB: Data Akademik} → Dosen.',
                        '**Penegasan** — Aturan emas: Aliran data = Kata Benda. Proses = Kata Kerja. Pelanggaran aturan ini = DFD yang salah.',
                        '---',

                        '### 4 Komponen Utama DFD',
                        'card:Entitas Eksternal (Persegi):Sumber atau tujuan data di luar batas sistem. Contoh: Mahasiswa, Admin, Bank. Tidak bisa dikontrol sistem.',
                        'card:Proses (Lingkaran/Oval):Aktivitas yang mentransformasi data. HARUS berupa kata kerja. Contoh: "Validasi Login", "Hitung IP Semester".',
                        'card:Data Store (Persegi Terbuka):Tempat penyimpanan data sementara atau permanen. Contoh: DB_Mahasiswa, File_Transaksi.',
                        'card:Aliran Data (Panah):Perpindahan data antar komponen. HARUS berupa kata benda. Contoh: "Data Login", "Laporan IP".',
                        '---',

                        '### Hierarki DFD (Leveling/Dekomposisi)',
                        'table:[{"Level":"Diagram Konteks (Level 0)","Deskripsi":"Gambaran paling tinggi — satu proses tunggal merepresentasikan SELURUH sistem. Tidak ada Data Store. Menunjukkan batas sistem dengan entitas luar.","Contoh":"Proses \'0 Sistem SIA\' dengan entitas Mahasiswa, Dosen, Admin."},{"Level":"DFD Level 1","Deskripsi":"Penjabaran proses utama dari Level 0. Data Store mulai muncul. Biasanya 3-7 proses.","Contoh":"Proses: \'1.0 Kelola Mahasiswa\', \'2.0 Kelola Nilai\', \'3.0 Generate Laporan\'."},{"Level":"DFD Level 2+","Deskripsi":"Dekomposisi lebih rinci dari masing-masing proses Level 1. Dilakukan hanya untuk proses yang kompleks.","Contoh":"Proses \'2.0 Kelola Nilai\' dipecah menjadi: \'2.1 Input Nilai\', \'2.2 Hitung IP\', \'2.3 Validasi Nilai\'."}]',
                        '---',

                        '### Contoh: Deskripsi DFD dalam Format Terstruktur',
                        '```json',
                        '{\n  "diagram": "DFD Level 1 — Sistem Informasi Akademik",\n  "entitas_eksternal": [\n    { "id": "E1", "nama": "Mahasiswa" },\n    { "id": "E2", "nama": "Dosen" }\n  ],\n  "proses": [\n    { "id": "P1", "nama": "Kelola Registrasi", "input": "Data Pendaftaran", "output": "Bukti Registrasi" },\n    { "id": "P2", "nama": "Proses KRS", "input": "Pilihan Mata Kuliah", "output": "KRS Tersetujui" },\n    { "id": "P3", "nama": "Kelola Nilai", "input": "Nilai Mahasiswa", "output": "Transkrip Nilai" }\n  ],\n  "data_store": [\n    { "id": "DS1", "nama": "DB_Mahasiswa" },\n    { "id": "DS2", "nama": "DB_Nilai" }\n  ]\n}',
                        '```',
                        '---',

                        '### Kamus Data (Data Dictionary) — Elemen Wajib',
                        'table:[{"Elemen":"Nama","Deskripsi":"Identifikasi unik aliran data atau data store. Sama persis dengan nama di DFD."},{"Elemen":"Alias","Deskripsi":"Nama lain yang digunakan oleh bagian/departemen tertentu untuk data yang sama."},{"Elemen":"Deskripsi","Deskripsi":"Penjelasan singkat tentang isi dan tujuan data tersebut dalam konteks bisnis."},{"Elemen":"Struktur Data","Deskripsi":"Komposisi detail: field-field yang membentuk data ini beserta tipe dan ukurannya."},{"Elemen":"Volume & Frekuensi","Deskripsi":"Berapa banyak record dan seberapa sering data ini bergerak (per hari/minggu/bulan)."}]',
                        '---',

                        '### Aturan Validasi DFD',
                        'card:❌ Black Hole:Proses yang menerima input tapi tidak menghasilkan output apa pun. Setiap proses harus menghasilkan sesuatu.',
                        'card:❌ Miracle:Proses yang menghasilkan output tanpa menerima input apapun. Tidak ada sumber data ajaib.',
                        'card:❌ Gray Hole:Input lebih sedikit dari yang dibutuhkan untuk menghasilkan output. Data hilang di tengah proses.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 10
                // -------------------------------------------------------------
                {
                    id: 'modul10',
                    title: 'Pertemuan 10: Konsep dan Prinsip Desain Perangkat Lunak',
                    lines: [
                        'Analisis menjawab **"APA"** yang harus dibangun. Desain menjawab **"BAGAIMANA"** membangunnya.',
                        '---',

                        '### Mengapa Desain adalah Investasi Terpenting?',
                        '**Point** — Desain perangkat lunak adalah proses mendefinisikan arsitektur, komponen, antarmuka, dan properti sistem sebelum satu baris kode production ditulis.',
                        '**Reason** — Robert C. Martin (Uncle Bob): "The only way to go fast, is to go well." Desain buruk membuat pengembangan makin lambat karena technical debt terus menumpuk.',
                        '**Example** — WhatsApp versi awal ditulis ulang total karena arsitektur awal tidak dirancang untuk scale 1 miliar pengguna.',
                        '**Penegasan** — Desain yang baik adalah yang bisa dibaca, dipahami, dan dimodifikasi oleh orang LAIN.',
                        '---',

                        '### 5 Prinsip Fundamental Desain PL',
                        'card:Abstraksi:Fokus pada karakteristik esensial, sembunyikan detail implementasi. Ada 3 level: prosedural, data, dan kontrol.',
                        'card:Modularitas:Bagi sistem menjadi modul yang terpisah (divide and conquer). Kompleksitas total < kompleksitas jumlah bagian.',
                        'card:Information Hiding:Setiap modul menyembunyikan detail implementasinya dari modul lain. Perubahan internal = nol dampak eksternal.',
                        'card:Functional Independence:Setiap modul melakukan satu fungsi spesifik. Diukur dengan Cohesion (tinggi = bagus) dan Coupling (rendah = bagus).',
                        'card:Refinement (Penyaringan):Elaborasi detail secara bertahap dari abstrak ke konkret. Mulai dari "apa", lalu "bagaimana", lalu "detail teknis".',
                        '---',

                        '### 4 Komponen Struktural Desain',
                        'table:[{"Aspek":"Desain Arsitektural","Deskripsi":"Struktur keseluruhan sistem: komponen utama, cara mereka berinteraksi, dan pola arsitektur (MVC, Microservices, dll)."},{"Aspek":"Desain Data","Deskripsi":"Representasi struktur data dan basis data: entitas, relasi, indeks, dan skema."},{"Aspek":"Desain Antarmuka","Deskripsi":"Cara sistem berinteraksi dengan pengguna (UI), dengan sistem lain (API), dan antar modul internal."},{"Aspek":"Desain Prosedural","Deskripsi":"Detail logika pemrosesan setiap modul: algoritma, kondisi, perulangan, dan urutan eksekusi."}]',
                        '---',

                        '### Contoh: Information Hiding dalam Kode',
                        '```javascript',
                        '// ❌ DESAIN BURUK — Tanpa Information Hiding\nconst user = database.query(`SELECT * FROM users WHERE id = ${id}`);\nconst hashed = user.password_bcrypt_hash; // Akses langsung ke field internal!\n\n// ✅ DESAIN BAIK — Dengan Information Hiding\nclass UserRepository {\n  #db;\n  #tableName = \'users\';\n\n  async findById(id) {\n    const row = await this.#db.query(\n      `SELECT * FROM ${this.#tableName} WHERE id = ?`, [id]\n    );\n    return this.#mapToUser(row);\n  }\n\n  async verifyPassword(userId, plainPassword) {\n    const user = await this.findById(userId);\n    return bcrypt.compare(plainPassword, user.passwordHash);\n  }\n}\n// Jika DB berubah dari MySQL ke PostgreSQL → hanya ubah di dalam class!',
                        '```',
                        '---',

                        '### Analogi Arsitektur Bangunan',
                        'card:DFD = Denah Ruangan:Menunjukkan APA saja ruangan yang ada dan bagaimana penghuni bergerak antar ruangan.',
                        'card:Desain PL = Gambar Teknik:Menunjukkan di mana pilar dipasang, bagaimana pipa air mengalir, jalur listrik, dan fundasi bangunan.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 11
                // -------------------------------------------------------------
                {
                    id: 'modul11',
                    title: 'Pertemuan 11: Desain Modular yang Efektif',
                    lines: [
                        '**High Cohesion, Low Coupling** — dua kata yang membedakan kode profesional dari kode amatir.',
                        '---',

                        '### Mengapa Cohesion & Coupling adalah Standar Kualitas?',
                        '**Point** — Cohesion mengukur seberapa erat elemen DALAM satu modul saling terkait. Coupling mengukur seberapa dalam ketergantungan ANTAR modul. Target: Cohesion Tinggi + Coupling Rendah.',
                        '**Reason** — Modul dengan Low Cohesion melakukan banyak hal sekaligus — sulit ditest, sulit di-debug. High Coupling berarti mengubah satu modul = risiko merusak modul lain.',
                        '**Example** — RAM di komputer: tugas tunggal (simpan data aktif) = High Cohesion. Bisa dilepas-pasang tanpa bongkar motherboard = Low Coupling.',
                        '**Penegasan** — Software dengan High Cohesion & Low Coupling bisa ditest per bagian, diperbaiki tanpa takut, dan dikembangkan oleh tim berbeda secara paralel.',
                        '---',

                        '### Tingkatan Cohesion (dari Terburuk ke Terbaik)',
                        'table:[{"Level":"Coincidental (Terburuk)","Deskripsi":"Elemen-elemen modul tidak punya hubungan logis sama sekali — digabung hanya karena kebetulan.","Contoh":"Modul \'Utils\' yang berisi fungsi hitung pajak, validasi email, dan kirim WhatsApp."},{"Level":"Logical","Deskripsi":"Elemen melakukan hal serupa tapi tidak saling berhubungan secara fungsional.","Contoh":"Modul yang menangani semua jenis input (keyboard, mouse, file, network) dalam satu tempat."},{"Level":"Procedural","Deskripsi":"Elemen dieksekusi secara berurutan tapi tidak berbagi data.","Contoh":"Modul yang login → log aktivitas → buka halaman dashboard."},{"Level":"Communicational","Deskripsi":"Elemen bekerja pada data yang sama.","Contoh":"Modul yang membaca data nasabah, memvalidasi, dan menyimpannya."},{"Level":"Functional (Terbaik)","Deskripsi":"Semua elemen berkontribusi pada satu tugas yang terdefinisi dengan baik.","Contoh":"Modul \'CalculateMonthlyInterest\' — satu tugas, satu tujuan, sangat jelas."}]',
                        '---',

                        '### Tingkatan Coupling (dari Terburuk ke Terbaik)',
                        'table:[{"Level":"Content Coupling (Terburuk)","Deskripsi":"Modul A memodifikasi data internal Modul B secara langsung.","Dampak":"Perubahan apapun di B bisa merusak A secara tak terduga."},{"Level":"Common Coupling","Deskripsi":"Banyak modul berbagi variabel global yang sama.","Dampak":"Salah satu modul mengubah variabel global = seluruh sistem terdampak."},{"Level":"Control Coupling","Deskripsi":"Modul A mengontrol alur eksekusi Modul B via flag/parameter.","Dampak":"Modul B tidak benar-benar mandiri, bergantung pada logika di A."},{"Level":"Data Coupling (Terbaik)","Deskripsi":"Modul berkomunikasi hanya melalui parameter data sederhana.","Dampak":"Minimal, terisolasi. Mengubah internal modul tidak berdampak ke luar."}]',
                        '---',

                        '### Contoh: Low vs High Coupling dalam Kode',
                        '```javascript',
                        '// ❌ HIGH COUPLING — Bergantung langsung pada detail internal\nclass OrderService {\n  createOrder(userId, items) {\n    const user = MySQL.query(`SELECT * FROM users WHERE id=${userId}`);\n    const discount = PromotionEngine.globalDiscountRate; // Variabel global!\n    // Ganti MySQL ke PostgreSQL = OrderService RUSAK\n  }\n}\n\n// ✅ LOW COUPLING — Dependency Injection via interface\nclass OrderService {\n  constructor(userRepo, promoService, orderRepo) {\n    this.userRepo     = userRepo;\n    this.promoService = promoService;\n    this.orderRepo    = orderRepo;\n  }\n  async createOrder(userId, items) {\n    const user     = await this.userRepo.findById(userId);\n    const discount = await this.promoService.getDiscount(userId);\n    return this.orderRepo.save({ userId, items, discount });\n    // Ganti MySQL ke PostgreSQL? Cukup ganti implementasi userRepo!\n  }\n}',
                        '```',
                        '---',

                        '### Manfaat Nyata Desain Modular',
                        'skill:95%:Kemudahan Pengujian (Testing per Modul) — Bug terisolasi, tidak menjalar ke modul lain:Manfaat',
                        'skill:90%:Efisiensi Pemeliharaan — Perubahan terlokalisasi, risiko minimum:Manfaat',
                        'skill:85%:Pengembangan Paralel Tim — Tim A dan Tim B bisa bekerja tanpa konflik:Manfaat',
                        'skill:80%:Reusability Lintas Proyek — Modul bisa dipakai ulang tanpa modifikasi:Manfaat',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 12
                // -------------------------------------------------------------
                {
                    id: 'modul12',
                    title: 'Pertemuan 12: Tahapan Desain Teknis Perangkat Lunak',
                    lines: [
                        'SDD adalah peta jalan programmer — tanpanya, tim berlari tanpa tujuan yang sama.',
                        '---',

                        '### Mengapa SDD adalah Dokumen Terpenting Fase Desain?',
                        '**Point** — Software Design Document (SDD) adalah terjemahan teknis dari SRS — mengubah "APA yang harus dilakukan" menjadi "BAGAIMANA cara melakukannya".',
                        '**Reason** — Tim 5 programmer yang bekerja tanpa SDD akan menghasilkan 5 arsitektur berbeda yang tidak bisa disatukan.',
                        '**Example** — Proyek software pemerintah yang gagal integrasi antar modul hampir selalu memiliki akar masalah yang sama: tidak ada SDD, atau SDD tidak diikuti.',
                        '**Penegasan** — SDD yang baik memungkinkan programmer baru bergabung dan langsung produktif dalam hari pertama.',
                        '---',

                        '### 4 Lapisan Utama dalam Desain Teknis',
                        'card:Desain Data:Transformasi model informasi dari DFD/ERD menjadi struktur basis data konkret: tabel, relasi, tipe data, dan indeks.',
                        'card:Desain Arsitektural:Mendefinisikan hubungan antar komponen/modul utama sistem. Pilih pola arsitektur: MVC, Layered, Microservices, atau Event-Driven.',
                        'card:Desain Antarmuka:Tiga dimensi: UI (pengguna ↔ sistem), API (sistem ↔ sistem lain), dan internal interface (modul ↔ modul).',
                        'card:Desain Prosedural:Detail algoritma dan logika setiap modul: urutan langkah, kondisi percabangan, dan penanganan error.',
                        '---',

                        '### Teknik Mapping: Dari DFD ke Struktur Program',
                        'table:[{"Teknik":"Transform Mapping","Kapan":"DFD memiliki alur masuk → proses tengah → alur keluar yang linear","Hasil":"Struktur hierarkis: Main Controller → Input Module, Transform Module, Output Module."},{"Teknik":"Transaction Mapping","Kapan":"DFD memiliki satu titik masuk yang memicu banyak jalur berbeda (seperti menu)","Hasil":"Struktur dengan Transaction Controller yang mendistribusikan ke Action Module masing-masing."}]',
                        '---',

                        '### Contoh: Transform vs Transaction Mapping',
                        '```javascript',
                        '// TRANSFORM MAPPING — Alur linear: Input → Proses → Output\nclass TranskripController {\n  async generate(mahasiswaId) {\n    const nilaiData  = await this.inputModule.getNilai(mahasiswaId); // INPUT\n    const ipSemester = this.transformModule.hitungIP(nilaiData);     // TRANSFORM\n    return this.outputModule.generatePDF({ ipSemester });            // OUTPUT\n  }\n}\n\n// TRANSACTION MAPPING — Satu input, banyak jalur\nclass AuthController {\n  handle(action, payload) {\n    const routes = {\n      \'login\'         : () => this.loginService.execute(payload),\n      \'register\'      : () => this.registerService.execute(payload),\n      \'resetPassword\' : () => this.resetService.execute(payload),\n    };\n    return routes[action]?.() ?? this.errorHandler.unknownAction(action);\n  }\n}',
                        '```',
                        '---',

                        '### Prinsip Desain Antarmuka (HCI)',
                        'skill:100%:Konsistensi (Warna, Ikon, Terminologi) — Pengguna tidak boleh dikagetkan:HCI',
                        'skill:90%:Umpan Balik Sistem (Loading, Sukses, Error) — Pengguna harus tahu apa yang terjadi:HCI',
                        'skill:85%:Minimalisme — Hanya tampilkan yang perlu:HCI',
                        'skill:80%:Error Recovery yang Mudah — Kesalahan manusiawi adalah pasti:HCI',
                        '---',

                        '### Risiko Tanpa Dokumen SDD',
                        'card:Spaghetti Code:Kode saling bergantung tanpa struktur — mirip mie yang tidak bisa diurai. Sulit di-debug dan ditest.',
                        'card:Bottleneck Kolaborasi:Tim tidak bisa bekerja paralel karena tidak ada kesepakatan tentang interface antar modul.',
                        'card:Maintenance Mahal:Biaya pemeliharaan bisa mencapai 70% dari total biaya hidup software tanpa dokumentasi yang baik.',
                    ]
                },
            ]
        },

        // =====================================================================
        // BAGIAN 4: PENGUJIAN, SQA & FINALISASI
        // =====================================================================
        {
            name: 'Bagian 4: Pengujian, SQA & Evaluasi Akhir',
            items: [

                // -------------------------------------------------------------
                // MODUL 13
                // -------------------------------------------------------------
                {
                    id: 'modul13',
                    title: 'Pertemuan 13: Strategi dan Teknik Pengujian Perangkat Lunak',
                    lines: [
                        'Pengujian bukan untuk membuktikan software benar — tapi untuk menemukan bahwa software salah. *(Dijkstra)*',
                        '---',

                        '### Mengapa Pengujian Sistematis Wajib Dilakukan?',
                        '**Point** — Pengujian perangkat lunak adalah proses terencana untuk menemukan kesalahan (defect) dalam sistem sebelum sampai ke pengguna akhir.',
                        '**Reason** — Bug yang ditemukan di fase testing = 10x lebih murah dibanding yang ditemukan pengguna di produksi. Bug di sistem kritis (perbankan, medis) bisa berdampak fatal.',
                        '**Example** — Therac-25 (1986) — mesin radiasi medis yang membunuh pasien akibat race condition yang tidak terdeteksi karena testing tidak mencakup skenario concurrent access.',
                        '**Penegasan** — Testing tanpa strategi = testing tanpa nilai. Testcase yang dirancang dengan baik menemukan lebih banyak bug daripada testcase acak sebanyak 10x lipat.',
                        '---',

                        '### Hierarki Strategi Pengujian (V-Model)',
                        'table:[{"Level":"Unit Testing","Fokus":"Menguji satu fungsi/modul secara terisolasi","Siapa":"Developer","Tools":"Jest, JUnit, PHPUnit"},{"Level":"Integration Testing","Fokus":"Menguji interaksi antar modul yang sudah digabungkan","Siapa":"Developer / QA","Tools":"Postman, REST Assured"},{"Level":"System Testing","Fokus":"Menguji sistem lengkap sesuai spesifikasi teknis","Siapa":"QA Engineer","Tools":"Selenium, Cypress"},{"Level":"Acceptance Testing","Fokus":"Memvalidasi bahwa sistem sesuai kebutuhan bisnis klien","Siapa":"Klien / End User","Tools":"Manual / User Story scenarios"}]',
                        '---',

                        '### Dua Teknik Utama Pengujian',
                        'card:White Box Testing:Menguji struktur INTERNAL kode: logika, cabang, path, kondisi. Tester harus bisa membaca kode. Analogi: Montir yang membuka kap mesin.',
                        'card:Black Box Testing:Menguji FUNGSIONALITAS berdasarkan input/output tanpa melihat kode. Fokus pada "apakah sistem berperilaku sesuai kebutuhan?". Analogi: Penumpang yang menguji fitur mobil.',
                        '---',

                        '### Metode White Box Testing',
                        'table:[{"Metode":"Basis Path Testing","Cara Kerja":"Gambar Flow Graph, hitung Cyclomatic Complexity V(G) = E - N + 2P, buat test case untuk setiap independent path.","Coverage":"100% path coverage"},{"Metode":"Condition Testing","Cara Kerja":"Uji setiap kondisi boolean (true/false) di dalam kode secara individual.","Coverage":"Branch coverage"},{"Metode":"Loop Testing","Cara Kerja":"Uji loop dengan: 0 iterasi, 1 iterasi, 2 iterasi, dan batas maksimum.","Coverage":"Loop boundary coverage"}]',
                        '---',

                        '### Metode Black Box Testing',
                        'table:[{"Metode":"Equivalence Partitioning","Cara Kerja":"Bagi input ke kelas ekuivalen (valid dan invalid), pilih satu representasi per kelas.","Contoh":"Input umur 0-17 (invalid), 18-65 (valid), >65 (invalid) = 3 test case."},{"Metode":"Boundary Value Analysis (BVA)","Cara Kerja":"Fokus pada nilai tepat di batas kelas: min-1, min, min+1, max-1, max, max+1.","Contoh":"Batas umur 18: uji nilai 17, 18, 19 dan 64, 65, 66."},{"Metode":"Decision Table Testing","Cara Kerja":"Buat tabel semua kombinasi kondisi dan aksi yang dihasilkan.","Contoh":"Login: benar/salah × status aktif/nonaktif = 4 kombinasi test."}]',
                        '---',

                        '### Contoh: Menghitung Cyclomatic Complexity (White Box)',
                        '```javascript',
                        'function hitungDiskon(harga, member, kodPromo) {\n  let diskon = 0;\n  if (member === true)          { diskon += 10; }  // Keputusan 1\n  if (kodPromo === \'SAVE20\')    { diskon += 20; }  // Keputusan 2\n  else if (kodPromo === \'VIP\')  { diskon += 30; }  // Keputusan 3\n  if (harga > 500_000)          { diskon += 5;  }  // Keputusan 4\n  return harga * (1 - diskon / 100);\n}\n\n// V(G) = Jumlah Keputusan + 1 = 4 + 1 = 5\n// Butuh MINIMAL 5 test case untuk cover semua path:\n// Path 1: member=false, promo=null,   harga=100k → diskon 0%\n// Path 2: member=true,  promo=null,   harga=100k → diskon 10%\n// Path 3: member=false, promo=SAVE20, harga=100k → diskon 20%\n// Path 4: member=false, promo=VIP,    harga=100k → diskon 30%\n// Path 5: member=false, promo=null,   harga=600k → diskon 5%',
                        '```',
                        '---',

                        '### Contoh: BVA untuk Input Form',
                        '```javascript',
                        '// Aturan: Nilai mahasiswa harus antara 0 dan 100\nconst bvaTestCases = [\n  { input: -1,  expected: \'ERROR\', alasan: \'Batas bawah - 1 (tepat di luar batas)\' },\n  { input: 0,   expected: \'VALID\', alasan: \'Batas bawah minimum (tepat di batas)\' },\n  { input: 1,   expected: \'VALID\', alasan: \'Batas bawah + 1 (tepat di dalam batas)\' },\n  { input: 50,  expected: \'VALID\', alasan: \'Nilai tengah (nominal)\' },\n  { input: 99,  expected: \'VALID\', alasan: \'Batas atas - 1 (tepat di dalam batas)\' },\n  { input: 100, expected: \'VALID\', alasan: \'Batas atas maksimum (tepat di batas)\' },\n  { input: 101, expected: \'ERROR\', alasan: \'Batas atas + 1 (tepat di luar batas)\' },\n];\n// 7 test case mencakup semua batas kritis!',
                        '```',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 14
                // -------------------------------------------------------------
                {
                    id: 'modul14',
                    title: 'Pertemuan 14: Software Quality Assurance (SQA)',
                    lines: [
                        'Testing mencari bug. SQA memastikan bug tidak pernah punya kesempatan untuk lahir.',
                        '---',

                        '### Perbedaan Testing vs SQA — Konsep Kritis',
                        '**Point** — Testing adalah menemukan defect di PRODUK. SQA adalah memastikan PROSES pengembangan dijalankan sesuai standar agar defect tidak muncul sejak awal.',
                        '**Reason** — Kualitas tidak bisa "dimasukkan" ke dalam produk di akhir pengembangan seperti menambahkan garam ke makanan yang sudah matang.',
                        '**Example** — ISO 9001 certified software company memiliki 40% lebih sedikit defect bukan karena tester-nya lebih baik, tapi karena prosesnya lebih ketat.',
                        '**Penegasan** — SQA menjawab: "Apakah kita mengikuti proses yang benar?" Testing menjawab: "Apakah produknya benar?" Keduanya wajib, tapi SQA lebih preventif.',
                        '---',

                        '### 3 Komponen Utama SQA',
                        'card:Aplikasi Standar:Memastikan tim mengikuti standar pengodean, dokumentasi, dan proses yang telah ditetapkan (IEEE, ISO 9001, CMMI).',
                        'card:Audit & Review Teknis:Pemeriksaan berkala terhadap dokumen (SRS, SDD), kode sumber, dan rencana pengujian untuk memastikan kepatuhan standar.',
                        'card:Manajemen Risiko Kualitas:Identifikasi risiko yang berpotensi menurunkan kualitas dan mitigasi proaktif sebelum dampak terjadi.',
                        '---',

                        '### 4 Metrik Kualitas Utama (McCall\'s Quality Factors)',
                        'table:[{"Metrik":"Correctness (Kebenaran)","Definisi":"Sejauh mana sistem memenuhi spesifikasi dan tujuan pengguna secara akurat.","Cara Ukur":"Persentase requirement yang tervalidasi lulus."},{"Metrik":"Reliability (Keandalan)","Definisi":"Kemampuan sistem berfungsi tanpa kegagalan dalam kondisi dan periode tertentu.","Cara Ukur":"MTBF (Mean Time Between Failures) — makin panjang makin baik."},{"Metrik":"Maintainability","Definisi":"Kemudahan sistem untuk diperbaiki, diubah, atau ditingkatkan setelah dirilis.","Cara Ukur":"MTTR (Mean Time To Repair) — makin pendek makin baik."},{"Metrik":"Usability","Definisi":"Tingkat kemudahan dan kenyamanan penggunaan bagi pengguna akhir yang ditargetkan.","Cara Ukur":"SUS Score (System Usability Scale) — target > 70."}]',
                        '---',

                        '### Formal Technical Review (FTR) — Mekanisme Pencegahan Defect',
                        'table:[{"Aspek":"Tujuan","Deskripsi":"Menemukan kesalahan logika, ambiguitas, dan inkonsistensi di dokumen atau kode sebelum masuk ke fase berikutnya."},{"Aspek":"Peserta","Deskripsi":"Tim terbatas 3-5 orang: Producer (pembuat), Reviewer (penilai), dan Recorder (pencatat). Manajer tidak hadir."},{"Aspek":"Aturan Utama","Deskripsi":"Review PRODUK, bukan orangnya. Tidak ada argumen pembelaan. Fokus pada menemukan masalah, bukan memecahkannya di tempat."},{"Aspek":"Output","Deskripsi":"Review Issue List dan keputusan: Accept / Accept with Modification / Rework & Re-review."}]',
                        '---',

                        '### Contoh: Checklist Code Review (Bagian dari FTR)',
                        '```json',
                        '{\n  "code_review_checklist": {\n    "correctness" : [\n      "Apakah logika sudah sesuai dengan spesifikasi di SRS?",\n      "Apakah semua edge case sudah ditangani?"\n    ],\n    "reliability" : [\n      "Apakah semua exception sudah di-handle dengan benar?",\n      "Apakah ada resource leak (koneksi DB tidak ditutup)?"\n    ],\n    "maintainability": [\n      "Apakah nama variabel/fungsi deskriptif dan konsisten?",\n      "Apakah panjang fungsi < 50 baris (Single Responsibility)?"\n    ],\n    "security": [\n      "Apakah input user sudah divalidasi dan di-sanitize?",\n      "Apakah tidak ada hard-coded credentials?"\n    ]\n  }\n}',
                        '```',
                        '---',

                        '### Standar SQA yang Relevan',
                        'card:IEEE 730 (SQA Plan):Standar untuk membuat dokumen rencana SQA yang mencakup semua aktivitas quality assurance proyek.',
                        'card:CMMI Level:Capability Maturity Model Integration: mengukur kematangan proses organisasi dari Level 1 (Chaotic) hingga Level 5 (Optimizing).',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 15
                // -------------------------------------------------------------
                {
                    id: 'modul15',
                    title: 'Pertemuan 15: Review Akhir & Integrasi Kualitas',
                    lines: [
                        'Memahami bagaimana semua puzzle RPL menyatu adalah kompetensi paling berharga yang bisa Anda miliki.',
                        '---',

                        '### Mengapa "The Big Picture" Lebih Penting dari Detail Teknis?',
                        '**Point** — Memahami koneksi antar fase — mengapa output satu fase menjadi input fase berikutnya — lebih bernilai daripada hafal semua sintaks dan definisi.',
                        '**Reason** — Dunia kerja nyata selalu meminta Anda memahami mengapa sistem gagal, di fase mana, dan bagaimana mencegahnya.',
                        '**Example** — Developer yang tahu "Testing dini = hemat biaya 10x" akan menolak skip testing. Tanpa big picture, ia mungkin skip testing karena "deadline mepet".',
                        '**Penegasan** — RPL adalah disiplin integratif. Setiap konsep adalah bagian dari satu ekosistem yang saling mendukung.',
                        '---',

                        '### The Big Picture: Integrasi Penuh SDLC',
                        'table:[{"Fase":"Analisis Kebutuhan (P6)","Output Utama":"SRS — Kontrak teknis antara klien dan developer.","Menjadi Input Untuk":"Fase Desain (SDD)."},{"Fase":"Pemodelan (P9)","Output Utama":"DFD + Kamus Data — Representasi visual aliran data.","Menjadi Input Untuk":"Desain Arsitektural dan Data."},{"Fase":"Desain (P10-P12)","Output Utama":"SDD — Cetak biru lengkap sistem.","Menjadi Input Untuk":"Fase Coding dan Test Planning."},{"Fase":"Pengujian (P13)","Output Utama":"Test Report — Bukti bahwa sistem memenuhi SRS.","Menjadi Input Untuk":"Acceptance Testing dan Deployment."},{"Fase":"SQA (P14)","Output Utama":"Audit Report — Konfirmasi proses dilakukan dengan standar.","Menjadi Input Untuk":"Peningkatan proses proyek berikutnya (Lessons Learned)."}]',
                        '---',

                        '### Peta Koneksi Dokumen Antar Fase',
                        '```bash',
                        '# ALUR DOKUMEN DALAM SDLC\n\n[Klien] ── wawancara/observasi ──→ ELICITATION\n                                         │\n                                         ▼\n                            [SRS: Software Req. Spec]\n                            \'APA yang harus dibangun\'\n                                         │\n                     ┌───────────────────┤\n                     │                   │\n                     ▼                   ▼\n             [DFD + Kamus Data]     [Test Plan]\n                     │\n                     ▼\n            [SDD: Software Design Doc]\n            \'BAGAIMANA membangunnya\'\n                     │\n                     ▼\n                [SOURCE CODE]\n                     │\n                     ▼\n           [Test Report: Test Plan dieksekusi]\n                     │\n                     ▼\n             [SQA Audit Report]\n                     │\n                     ▼\n               [DEPLOYMENT]',
                        '```',
                        '---',

                        '### 3 Pilar Teknis yang Harus Dikuasai untuk UAS',
                        'card:Pemodelan & Desain:DFD Leveling (Konteks → L1 → L2), Kamus Data, Transform vs Transaction Mapping, dan metrik High Cohesion + Low Coupling.',
                        'card:Strategi Pengujian:Hirarki Unit→Integration→System→Acceptance, White Box (Cyclomatic Complexity), Black Box (BVA, Equivalence Partitioning).',
                        'card:Penjaminan Mutu:SQA vs Testing (perbedaan mendasar), FTR (mekanisme, aturan, output), dan 4 metrik kualitas McCall.',
                        '---',

                        '### Checklist Kesiapan UAS',
                        'skill:100%:Mampu gambar DFD Level 0 dan Level 1 dari kasus:Wajib Kuasai — hampir pasti muncul',
                        'skill:90%:Mampu hitung Cyclomatic Complexity & buat path test:Sangat Penting — teknis white box',
                        'skill:90%:Mampu buat test case BVA dari spesifikasi input:Sangat Penting — teknis black box',
                        'skill:85%:Mampu bedakan Transform vs Transaction Mapping:Kritikal — DFD ke struktur program',
                        'skill:80%:Mampu jelaskan FTR: mekanisme & manfaatnya:Penting — SQA conceptual',
                        '---',

                        '### Pertanyaan Latihan Komprehensif',
                        'table:[{"No":"1","Soal":"Gambarkan DFD Level 1 untuk sistem kasir mini-market. Identifikasi minimal 4 proses dan 2 data store."},{"No":"2","Soal":"Fungsi A memiliki 3 keputusan if-else dan 1 loop. Berapa Cyclomatic Complexity-nya? Buat minimal 4 test case."},{"No":"3","Soal":"Input form: usia 17-60 tahun. Buat 7 test case BVA yang mencakup semua nilai batas."},{"No":"4","Soal":"Jelaskan perbedaan antara modul dengan Functional Cohesion vs Coincidental Cohesion. Berikan contoh konkret."},{"No":"5","Soal":"Sebuah tim menemukan 50 bug di fase System Testing. Dari perspektif SQA, apa akar masalahnya dan bagaimana mencegahnya?"}]',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 16 — UAS
                // -------------------------------------------------------------
                {
                    id: 'modul16',
                    title: 'Pertemuan 16: Evaluasi Akhir Semester (UAS)',
                    lines: [
                        'UAS bukan akhir — ini titik di mana Anda membuktikan bahwa Anda siap menjadi software engineer profesional.',
                        '---',

                        '### Kesiapan Mental Menghadapi UAS',
                        '**Point** — UAS IMP307 menguji kemampuan menganalisis kasus nyata dan menerapkan konsep RPL — bukan memori hafalan definisi dari buku.',
                        '**Reason** — Industri butuh engineer yang bisa memutuskan: "Kasus ini cocok White Box atau Black Box? Butuh Transform atau Transaction Mapping?"',
                        '**Example** — Soal tipikal: "Diberikan pseudocode berikut, hitung Cyclomatic Complexity dan buat minimal N test case yang mencakup semua independent path."',
                        '**Penegasan** — Jawaban yang baik menunjukkan proses berpikir sistematis. Jelaskan **MENGAPA**, bukan hanya APA.',
                        '---',

                        '### 3 Fokus Materi Teknis UAS (CPMK 3, 4, & 5)',
                        'card:CPMK 3: Pemodelan & Desain:DFD Leveling + Kamus Data, Transform/Transaction Mapping, Cohesion & Coupling, dan struktur SDD.',
                        'card:CPMK 4: Strategi Pengujian:White Box (Cyclomatic Complexity, Basis Path Testing) vs Black Box (BVA, Equivalence Partitioning, Decision Table).',
                        'card:CPMK 5: Penjaminan Mutu:SQA vs Testing, komponen SQA, FTR (mekanisme & output), metrik kualitas McCall, dan standar IEEE.',
                        '---',

                        '### Tipe Soal UAS & Strategi Menjawab',
                        'table:[{"Tipe Soal":"Aplikasi Desain","Contoh":"Buat struktur program dari DFD berikut menggunakan Transform Mapping.","Strategi":"Identifikasi afferent flow, transform center, dan efferent flow. Buat hirarki modul."},{"Tipe Soal":"Analisis White Box","Contoh":"Hitung Cyclomatic Complexity dan buat test case untuk semua independent path.","Strategi":"Gambar Flow Graph → Hitung V(G) = E-N+2P → Identifikasi path → Buat test case per path."},{"Tipe Soal":"Analisis Black Box BVA","Contoh":"Input: diskon voucher antara 5% - 50%. Buat test case BVA.","Strategi":"Batas valid: min=5, max=50. Test case: 4, 5, 6, 49, 50, 51. Total 6 test case."},{"Tipe Soal":"Evaluasi Kualitas","Contoh":"Modul ProcessPayment memiliki 15 fungsi tidak berhubungan. Analisis masalahnya.","Strategi":"Identifikasi sebagai Coincidental Cohesion. Jelaskan dampak. Rekomendasikan refactoring."},{"Tipe Soal":"SQA Konseptual","Contoh":"Tim menemukan 100 bug di fase akhir. Jelaskan dari perspektif SQA mengapa ini terjadi.","Strategi":"SQA tidak diimplementasikan di awal. Tidak ada FTR, review berkala, atau standar koding."}]',
                        '---',

                        '### Contoh Lengkap: Soal & Jawaban White Box Testing',
                        '```javascript',
                        'function hitungBonus(penjualan, rating) {\n  let bonus = 0;\n  if (penjualan >= 10_000_000) { bonus += 500_000; }  // D1\n  if (rating >= 4.5)           { bonus += 250_000; }  // D2\n  else if (rating >= 3.5)      { bonus += 100_000; }  // D3\n  return bonus;\n}\n\n// V(G) = 3 keputusan + 1 = 4 → Minimal 4 test case\n\n// Path 1: D1=false, D2=false, D3=false → bonus = 0\n// Path 2: D1=true,  D2=false, D3=false → bonus = 500.000\n// Path 3: D1=false, D2=true             → bonus = 250.000\n// Path 4: D1=false, D2=false, D3=true  → bonus = 100.000\n\nconst testCases = [\n  { id:\'TC1\', penjualan: 5_000_000,  rating: 3.0, expected: 0,       path: \'P1\' },\n  { id:\'TC2\', penjualan: 15_000_000, rating: 3.0, expected: 500_000, path: \'P2\' },\n  { id:\'TC3\', penjualan: 5_000_000,  rating: 4.8, expected: 250_000, path: \'P3\' },\n  { id:\'TC4\', penjualan: 5_000_000,  rating: 4.0, expected: 100_000, path: \'P4\' },\n];',
                        '```',
                        '---',

                        '### Checklist Strategi Pengerjaan Ujian',
                        'skill:100%:Gunakan terminologi standar Pressman dalam jawaban:Wajib — menunjukkan penguasaan literatur',
                        'skill:90%:Visualisasikan dengan diagram saat menjelaskan DFD atau Flow Graph:Sangat Disarankan — nilai lebih tinggi',
                        'skill:85%:Jelaskan keterkaitan antar tahap SDLC dalam jawaban kasus:Kritikal — big picture thinking',
                        'skill:80%:Gunakan format PREP dalam menjawab soal analisis:Disarankan — jawaban lebih terstruktur',
                        '---',

                        '### Informasi Penilaian UAS',
                        'card:Bobot Nilai:UAS adalah evaluasi final dengan pengaruh paling besar terhadap nilai akhir mata kuliah **IMP307**.',
                        'card:Kriteria Lulus:Ketepatan analisis teknis, kelengkapan jawaban, penggunaan terminologi standar, dan kemampuan memberikan justifikasi.',
                        'form:quiz',
                    ]
                },
            ]
        },
    ]
};
