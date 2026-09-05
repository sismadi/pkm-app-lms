/**
 * quiz-patch.js
 * ------------------------------------------------------------
 * Kuis evaluasi akhir untuk KETIGA kursus (RPL, PBO, Robotika),
 * terintegrasi ke cf-api:
 *
 *   1. Bank soal (QUIZ_BANK) — 10 soal pilihan ganda per kursus,
 *      relevan dengan judul pertemuan di pages/learn.js, pages/pbo.js,
 *      dan pages/robotika.js.
 *   2. Halaman kuis baru: route "quiz" -> web.resolveQuiz(slug),
 *      diakses lewat web.navigate('quiz/rpl' | 'quiz/pbo' | 'quiz/robotika').
 *   3. Skor dihitung di klien (0-100), lalu dikirim ke
 *      POST /courses/:slug/quiz. Backend yang MENENTUKAN status
 *      lulus/gagal (passing grade) & menerbitkan sertifikat otomatis —
 *      lihat index.js. Klien hanya menampilkan hasil yang dikembalikan
 *      backend (tidak pernah memutuskan status sendiri).
 *   4. Titik masuk kuis ditambahkan di 3 tempat (non-destructive, semua
 *      lewat pembungkusan komponen yang sudah ada):
 *        a. Hub "Kuis" (pages/kuis.js) — daftar 3 kuis kursus.
 *        b. Akhir materi (components.learningModule) — tombol muncul
 *           begitu peserta sampai pertemuan TERAKHIR suatu kursus.
 *        c. Dashboard peserta — lihat dashboard-quiz-patch.js.
 *
 * Urutan <script> WAJIB: setelah catalog-patch.js (butuh
 * CATALOG_COURSES), materi-patch.js (membungkus learningModule lagi),
 * auth-patch.js (butuh auth.apiFetch), dan config.js (APP_CONFIG).
 * ------------------------------------------------------------
 */

// -----------------------------------------------------------
// 1. BANK SOAL — 10 soal/kursus, ansIndex = index jawaban benar
// -----------------------------------------------------------

const QUIZ_BANK = {
    rpl: {
        title: 'Rekayasa Perangkat Lunak',
        questions: [
            { q: 'Apa yang dimaksud dengan "rekayasa perangkat lunak" (software engineering)?', options: ['Sekadar aktivitas menulis kode program', 'Pendekatan sistematis & terukur untuk mengembangkan, mengoperasikan, dan memelihara perangkat lunak', 'Proses menjual lisensi software ke pengguna', 'Kegiatan desain antarmuka pengguna saja'], ansIndex: 1 },
            { q: 'Tujuan utama dilakukannya Feasibility Study (Studi Kelayakan) sebelum proyek dimulai adalah...', options: ['Menentukan warna tampilan aplikasi', 'Menilai apakah proyek layak dari sisi teknis, ekonomi, dan operasional', 'Menulis dokumentasi akhir proyek', 'Melatih pengguna akhir'], ansIndex: 1 },
            { q: 'Manakah berikut ini yang merupakan model proses SDLC (Software Development Life Cycle)?', options: ['TCP/IP', 'Waterfall', 'HTML5', 'OAuth2'], ansIndex: 1 },
            { q: 'Dalam manajemen proyek perangkat lunak, "scope creep" merujuk pada...', options: ['Bertambahnya cakupan pekerjaan proyek secara tidak terkendali di luar rencana awal', 'Berkurangnya anggaran proyek', 'Peningkatan jumlah anggota tim secara terencana', 'Proses pengujian ulang modul yang sama'], ansIndex: 0 },
            { q: 'Apa fungsi utama Data Flow Diagram (DFD) dalam analisis sistem?', options: ['Menunjukkan struktur basis data fisik', 'Menggambarkan aliran data antar proses dalam sebuah sistem', 'Menampilkan tampilan antarmuka pengguna', 'Mencatat jadwal proyek'], ansIndex: 1 },
            { q: 'Prinsip desain perangkat lunak "high cohesion, low coupling" bertujuan untuk...', options: ['Membuat satu modul mengerjakan banyak hal tidak terkait sekaligus', 'Membuat modul saling bergantung erat satu sama lain', 'Membuat setiap modul fokus pada satu tanggung jawab dan minim ketergantungan antar modul', 'Mempercepat proses kompilasi saja'], ansIndex: 2 },
            { q: 'Pengujian White Box berbeda dari Black Box karena...', options: ['White Box menguji tanpa mengetahui struktur internal kode', 'White Box menguji berdasarkan struktur/logika internal kode program', 'Black Box hanya bisa dilakukan oleh programmer', 'Keduanya persis sama, hanya istilah berbeda'], ansIndex: 1 },
            { q: 'Software Quality Assurance (SQA) berfokus pada...', options: ['Menjamin proses pengembangan mengikuti standar mutu agar produk akhir berkualitas', 'Menjual produk perangkat lunak ke pelanggan', 'Membuat desain logo aplikasi', 'Menentukan harga jual lisensi'], ansIndex: 0 },
            { q: 'Desain modular yang efektif menekankan pada...', options: ['Menggabungkan semua fungsi ke dalam satu modul besar', 'Memecah sistem menjadi modul-modul kecil yang independen dan mudah dikelola', 'Menghindari dokumentasi desain', 'Menulis seluruh program tanpa fungsi/prosedur'], ansIndex: 1 },
            { q: 'Kamus Data (Data Dictionary) dalam pemodelan analisis berfungsi untuk...', options: ['Menyimpan kredensial login pengguna', 'Mendokumentasikan definisi & struktur setiap elemen data yang mengalir dalam sistem', 'Mengatur tampilan warna aplikasi', 'Menjadwalkan rapat proyek'], ansIndex: 1 },
        ],
    },

    pbo: {
        title: 'Pemrograman Berorientasi Objek',
        questions: [
            { q: 'Empat pilar utama Pemrograman Berorientasi Objek (OOP) adalah...', options: ['Input, Output, Proses, Storage', 'Encapsulation, Inheritance, Polymorphism, Abstraction', 'Compile, Run, Debug, Deploy', 'Variable, Function, Loop, Array'], ansIndex: 1 },
            { q: 'Perbedaan mendasar antara "class" dan "object" adalah...', options: ['Class adalah cetak biru/template, object adalah instansi nyata dari class tersebut', 'Class dan object adalah istilah yang identik', 'Object dibuat sebelum class didefinisikan', 'Class hanya bisa dipakai sekali'], ansIndex: 0 },
            { q: 'Encapsulation dalam OOP bertujuan untuk...', options: ['Menampilkan semua atribut objek secara publik agar mudah diakses', 'Menyembunyikan detail internal objek dan hanya mengekspos apa yang perlu diakses dari luar', 'Menggabungkan banyak class menjadi satu file', 'Menghapus method yang tidak terpakai'], ansIndex: 1 },
            { q: 'Constructor pada sebuah class digunakan untuk...', options: ['Menghapus object dari memori', 'Menginisialisasi nilai atribut saat object pertama kali dibuat', 'Mendefinisikan struktur database', 'Mengganti nama class saat runtime'], ansIndex: 1 },
            { q: 'Inheritance (pewarisan) memungkinkan sebuah class untuk...', options: ['Mewarisi atribut dan method dari class induk (parent/superclass)', 'Menghapus semua method milik class lain', 'Berjalan lebih cepat daripada class biasa', 'Menjadi satu-satunya class dalam program'], ansIndex: 0 },
            { q: 'Polymorphism dalam OOP berarti...', options: ['Sebuah objek hanya bisa memiliki satu bentuk method selamanya', 'Method dengan nama sama dapat berperilaku berbeda tergantung objek/class yang memanggilnya', 'Semua class wajib memiliki nama yang sama', 'Object tidak dapat diubah setelah dibuat'], ansIndex: 1 },
            { q: 'Perbedaan Abstract Class dan Interface yang umum adalah...', options: ['Interface bisa memiliki constructor, abstract class tidak', 'Abstract class dapat memiliki method dengan implementasi sebagian, interface (klasik) umumnya hanya deklarasi method', 'Keduanya benar-benar identik di semua bahasa pemrograman', 'Abstract class tidak bisa diturunkan (extends)'], ansIndex: 1 },
            { q: 'Prinsip "favor composition over inheritance" menyarankan agar...', options: ['Selalu menggunakan pewarisan berlapis-lapis (deep inheritance)', 'Membangun fungsionalitas objek dengan menggabungkan/memakai objek lain (has-a) alih-alih hierarki pewarisan yang kaku (is-a)', 'Menghindari penggunaan class sama sekali', 'Menulis semua kode dalam satu class tunggal'], ansIndex: 1 },
            { q: 'Exception handling (try-catch) dalam OOP digunakan untuk...', options: ['Mempercepat proses kompilasi program', 'Menangani kondisi error saat runtime agar program tidak berhenti secara tidak terkendali', 'Membuat class baru secara otomatis', 'Mengganti tipe data variabel'], ansIndex: 1 },
            { q: 'Design pattern Singleton digunakan ketika kita ingin...', options: ['Membuat banyak instance dari sebuah class secara bebas', 'Memastikan sebuah class hanya memiliki satu instance sepanjang siklus hidup aplikasi', 'Menghapus seluruh instance class saat program dimulai', 'Membuat class tanpa method sama sekali'], ansIndex: 1 },
        ],
    },

    robotika: {
        title: 'Robotika Dasar',
        questions: [
            { q: 'Secara umum, sebuah sistem robotika tersusun dari tiga komponen utama, yaitu...', options: ['Sensor, Aktuator, dan Kontroler/Mikrokontroler', 'Keyboard, Mouse, dan Monitor', 'Baterai, Kabel, dan Casing saja', 'Database, Server, dan Jaringan'], ansIndex: 0 },
            { q: 'Fungsi utama sensor pada sebuah robot adalah...', options: ['Menggerakkan bagian mekanik robot', 'Menangkap/mendeteksi informasi dari lingkungan sekitar (jarak, cahaya, suhu, dll)', 'Menyimpan program robot secara permanen', 'Memberi daya listrik ke seluruh sistem'], ansIndex: 1 },
            { q: 'Aktuator pada robot berperan untuk...', options: ['Mengubah sinyal listrik/perintah menjadi gerakan fisik (mis. motor servo, motor DC)', 'Membaca data dari sensor cahaya', 'Menyimpan hasil pembacaan sensor', 'Mengatur tampilan antarmuka pengguna'], ansIndex: 0 },
            { q: 'Mikrokontroler pada sistem robotika berfungsi sebagai...', options: ['Sumber daya listrik utama robot', 'Otak/pengendali yang menjalankan program logika robot', 'Bahan dasar rangka mekanik robot', 'Media penyimpanan cadangan energi'], ansIndex: 1 },
            { q: 'Kinematika dasar pada robot mempelajari tentang...', options: ['Warna dan estetika desain robot', 'Gerak robot (posisi, kecepatan, orientasi) tanpa memperhitungkan gaya penyebabnya', 'Harga komponen elektronik robot', 'Bahasa pemrograman yang dipakai robot'], ansIndex: 1 },
            { q: 'Sistem kendali "control loop" tertutup (closed-loop) pada robot ditandai dengan adanya...', options: ['Tidak ada umpan balik (feedback) sama sekali dari sensor', 'Umpan balik (feedback) dari sensor yang digunakan untuk mengoreksi aksi aktuator secara berkelanjutan', 'Robot yang berjalan tanpa mikrokontroler', 'Program yang hanya dijalankan satu kali lalu berhenti'], ansIndex: 1 },
            { q: 'Pada robot line follower, sensor yang paling umum digunakan untuk mendeteksi garis adalah...', options: ['Sensor inframerah/photodiode (mendeteksi perbedaan pantulan warna garis dan lantai)', 'Sensor tekanan udara (barometer)', 'Sensor detak jantung', 'Sensor kelembaban tanah'], ansIndex: 0 },
            { q: 'Robot mobile yang mampu berpindah tempat memerlukan kemampuan navigasi, yang mencakup...', options: ['Kemampuan menentukan posisi dan merencanakan jalur pergerakan menuju tujuan', 'Kemampuan mengganti baterai secara otomatis saja', 'Kemampuan menyimpan data suara', 'Kemampuan menampilkan grafik statistik'], ansIndex: 0 },
            { q: 'Dalam pemrograman logika kendali robot sederhana, struktur kondisi (if-else) umumnya digunakan untuk...', options: ['Menentukan aksi robot berdasarkan kondisi pembacaan sensor saat itu', 'Mengganti bahasa pemrograman yang dipakai', 'Menghapus program yang sudah ditulis', 'Mendesain bentuk fisik robot'], ansIndex: 0 },
            { q: 'Integrasi sensor, aktuator, dan mikrokontroler pada studi kasus robot line follower bertujuan agar robot dapat...', options: ['Mengikuti jalur garis secara otomatis berdasarkan pembacaan sensor secara real-time', 'Hanya menyala dan mati tanpa pergerakan', 'Berkomunikasi lewat suara manusia', 'Menghitung transaksi keuangan'], ansIndex: 0 },
        ],
    },
};

window.QUIZ_BANK = QUIZ_BANK;

(function () {

    // -----------------------------------------------------------
    // 2. ROUTING: halaman kuis per kursus — web.navigate('quiz/<slug>')
    // -----------------------------------------------------------

    web.routes.quiz = 'resolveQuiz';

    web.resolveQuiz = function (slug) {
        const cleanSlug = (slug || '').split('?')[0];
        const bank   = QUIZ_BANK[cleanSlug];
        const course = (window.CATALOG_COURSES || []).find(function (c) { return c.id === cleanSlug; });

        if (!bank || !course) {
            return [{
                section: 'titleHero', title: 'Kuis Tidak Ditemukan',
                description: `Kuis untuk kursus <strong>${cleanSlug || '-'}</strong> belum tersedia.`
            }];
        }

        if (typeof auth === 'undefined' || !auth.isLoggedIn()) {
            return [
                { section: 'titleHero', title: 'Kuis: ' + course.title,
                  description: 'Masuk dengan akun Google &amp; daftar kursus ini terlebih dahulu untuk mengerjakan kuis.' },
                { section: 'loginGate' }
            ];
        }

        return [
            { section: 'titleHero', title: 'Kuis Evaluasi: ' + course.title,
              description: `Kerjakan seluruh ${bank.questions.length} soal, lalu klik <strong>Kirim Jawaban</strong>. Sertifikat diterbitkan otomatis jika Anda lulus.` },
            { section: 'courseQuiz', slug: cleanSlug, course: course, bank: bank }
        ];
    };

    // -----------------------------------------------------------
    // 3. KOMPONEN RENDER: form kuis
    // -----------------------------------------------------------

    components.courseQuiz = function (d) {
        const slug = d.slug;
        const bank = d.bank;
        const qs   = bank.questions;

        return `
            <div class="row page"><div class="artikel" style="width:100%;">
                <div id="quiz-result-${slug}"></div>
                <form id="quiz-form-${slug}" class="dynamic-form"
                      onsubmit="event.preventDefault(); submitCourseQuiz('${slug}', this);">
                    ${qs.map(function (q, i) {
                        return `
                        <div class="quiz-box">
                            <p><strong>${i + 1}. ${q.q}</strong></p>
                            ${q.options.map(function (opt, oi) {
                                return `<label><input type="radio" name="q${i}" value="${oi}" required> ${opt}</label>`;
                            }).join('')}
                        </div>`;
                    }).join('')}
                    <button type="submit" class="slcBtn">Kirim Jawaban</button>
                </form>
            </div></div>`;
    };

    // -----------------------------------------------------------
    // 4. SUBMIT: hitung skor di klien, kirim ke cf-api, tampilkan hasil
    //    yang DIKEMBALIKAN SERVER (server yang menentukan lulus/tidak
    //    & menerbitkan sertifikat — lihat POST /courses/:slug/quiz).
    // -----------------------------------------------------------

    window.submitCourseQuiz = function (slug, form) {
        const bank = QUIZ_BANK[slug];
        if (!bank) return;
        const qs = bank.questions;

        let correct = 0;
        qs.forEach(function (q, i) {
            const sel = form.querySelector('input[name="q' + i + '"]:checked');
            if (sel && Number(sel.value) === q.ansIndex) correct++;
        });
        const score = Math.round((correct / qs.length) * 100);

        const btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Mengirim...'; }

        auth.apiFetch('/courses/' + slug + '/quiz', {
            method: 'POST',
            body: JSON.stringify({ score: score })
        })
        .then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (payload) {
                return { status: res.status, payload: payload };
            });
        })
        .then(function (result) {
            const box = web.gebi('quiz-result-' + slug);

            if (result.status === 401) { auth.logout(); return; }

            if (!result.payload || !result.payload.ok) {
                if (btn) { btn.disabled = false; btn.textContent = 'Kirim Jawaban'; }
                if (box) box.innerHTML = renderQuizError(
                    (result.payload && result.payload.error) || 'Gagal mengirim hasil kuis.'
                );
                return;
            }

            const data = result.payload.data;
            form.style.display = 'none';
            if (box) box.innerHTML = renderQuizResult(slug, data);
        })
        .catch(function (e) {
            if (btn) { btn.disabled = false; btn.textContent = 'Kirim Jawaban'; }
            const box = web.gebi('quiz-result-' + slug);
            if (box) box.innerHTML = renderQuizError('Gagal mengirim (jaringan): ' + e.message);
        });
    };

    function renderQuizError(msg) {
        return `<div class="info-card" style="border-color:var(--color-danger);">⚠ ${msg}</div>`;
    }

    function renderQuizResult(slug, data) {
        const lulus = data.status === 'lulus';
        const badgeClass = lulus ? 'badge-success' : 'badge-warning';
        const badgeText  = lulus ? 'LULUS' : 'BELUM LULUS';

        let extra = '';
        if (lulus && data.certificate && data.certificate.code) {
            extra = `
                <p>🎓 Selamat! Sertifikat kelulusan Anda telah diterbitkan otomatis.</p>
                <p>Kode Sertifikat: <strong>${data.certificate.code}</strong></p>
                <button class="slcBtn" onclick="web.navigate('cert/${data.certificate.code}')">Lihat &amp; Cetak Sertifikat</button>`;
        } else if (!lulus) {
            extra = `
                <p>Skor minimum untuk lulus adalah <strong>${data.passingGrade}%</strong>. Silakan pelajari kembali materi lalu coba lagi.</p>
                <button class="slcBtn" onclick="web.navigate('quiz/${slug}')">Ulangi Kuis</button>`;
        }

        return `
            <div class="info-card">
                <h3>Hasil Kuis</h3>
                <p>Skor percobaan ini: <strong>${data.score}</strong> &nbsp;|&nbsp; Skor terbaik: <strong>${Math.round(data.bestScore)}</strong> &nbsp;|&nbsp; Percobaan ke-${data.attempts}</p>
                <p>Status: <span class="badge ${badgeClass}">${badgeText}</span></p>
                ${extra}
                <button class="slcBtn" style="background:#555;margin-top:8px;" onclick="web.navigate('dashboard')">Ke Dashboard</button>
            </div>`;
    }

    // -----------------------------------------------------------
    // 3b. Tombol "Kerjakan Kuis" juga ditambahkan ke tiap kartu di
    //     katalog kursus (Home) — membungkus components.courseCatalog
    //     SEKALI LAGI (setelah didefinisikan di catalog-patch.js).
    //     Disisipkan lewat penggantian string yang UNIK per kursus
    //     (tombol "Lihat Materi" memakai `c.learnLink`, yang berbeda
    //     untuk tiap kursus), supaya tidak perlu mengubah catalog-patch.js.
    // -----------------------------------------------------------

    const _renderedCourseCatalog = components.courseCatalog;
    components.courseCatalog = function (d) {
        let html = _renderedCourseCatalog(d);
        const items = d.items || CATALOG_COURSES;
        items.forEach(function (c) {
            if (!QUIZ_BANK[c.id] || !c.learnLink) return;
            const marker  = `onclick="web.navigate('${c.learnLink}')">Lihat Materi</button>`;
            const quizBtn = marker + `<button class="slcBtn" style="background:var(--color-success);" onclick="web.navigate('quiz/${c.id}')">📝 Kerjakan Kuis</button>`;
            html = html.split(marker).join(quizBtn);
        });
        return html;
    };

    // -----------------------------------------------------------
    // 4b. KOMPONEN RENDER: Hub Kuis (pages/kuis.js) — daftar kuis
    //     ketiga kursus dalam satu halaman, dipakai oleh menu "Kuis".
    // -----------------------------------------------------------

    components.quizHub = function () {
        const items = (window.CATALOG_COURSES || []).filter(function (c) { return !!QUIZ_BANK[c.id]; });
        return `
            <div class="row page4">
                <div class="artikel" style="width:100%;">
                    <h2>Kuis Evaluasi Kursus</h2><hr>
                    <p>Pilih kuis sesuai kursus yang Anda ikuti. Anda harus <strong>masuk &amp; terdaftar</strong> di kursus terkait untuk dapat mengerjakannya. Kelulusan kuis akan menerbitkan sertifikat secara otomatis.</p>
                    <div class="catalog-grid">
                        ${items.map(function (c) {
                            const n = QUIZ_BANK[c.id].questions.length;
                            return `
                            <div class="catalog-card">
                                <div class="catalog-card-head">
                                    <i class="${c.icon} img-32"></i>
                                    <span class="badge">${c.category}</span>
                                </div>
                                <h3>${c.title}</h3>
                                <p class="catalog-desc">${n} soal pilihan ganda &mdash; passing grade 75%.</p>
                                <div class="catalog-actions">
                                    <button class="slcBtn" style="background:var(--aColor);color:#fff;"
                                            onclick="web.navigate('quiz/${c.id}')">📝 Kerjakan Kuis</button>
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            </div>`;
    };

    // -----------------------------------------------------------
    // 5. Tombol "Kerjakan Kuis" otomatis muncul di akhir materi —
    //    membungkus components.learningModule SEKALI LAGI (setelah
    //    learn-patch.js, materi-patch.js, progress-patch.js).
    // -----------------------------------------------------------

    function subjectToSlug(subjectKey) {
        const course = (window.CATALOG_COURSES || []).find(function (c) { return c.learnLink === subjectKey; });
        return course ? course.id : subjectKey;
    }

    const _renderedLearningModule = components.learningModule;
    components.learningModule = function (d) {
        let html = _renderedLearningModule(d);
        const slug = subjectToSlug(d.subject || 'learn');

        // Tombol kuis ditampilkan setelah pertemuan TERAKHIR (nextId kosong)
        // supaya peserta mengerjakan kuis setelah menuntaskan seluruh modul.
        if (!d.nextId && QUIZ_BANK[slug]) {
            html += `
                <div class="row page"><div class="artikel" style="width:100%;text-align:center;">
                    <div class="info-card" style="display:inline-block;">
                        <p>✅ Anda telah menyelesaikan seluruh modul kursus ini.</p>
                        <button class="slcBtn" style="background:var(--color-success);"
                                onclick="web.navigate('quiz/${slug}')">📝 Kerjakan Kuis Evaluasi</button>
                    </div>
                </div></div>`;
        }
        return html;
    };

})();
