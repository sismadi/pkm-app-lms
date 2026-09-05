/**
 * pages/kuis.js
 * ------------------------------------------------------------
 * Halaman hub "Kuis" — menampilkan daftar kuis evaluasi untuk
 * ketiga kursus (RPL, PBO, Robotika). Isi kuis sesungguhnya (bank
 * soal, form pengerjaan, pengiriman skor ke cf-api, & penerbitan
 * sertifikat otomatis) didefinisikan di quiz-patch.js.
 *
 * Sebelumnya file ini berisi satu kuis generik (soal persamaan
 * linear) yang tidak relevan dengan materi kursus mana pun.
 * Sekarang diganti dengan hub yang mengarahkan ke kuis PER KURSUS
 * lewat komponen `quizHub` (lihat quiz-patch.js).
 * ------------------------------------------------------------
 */
pages.kuis = [
    {
        section: 'quizHub'
    }
];
