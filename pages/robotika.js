pages.robotika = {
    categories: [

        // =====================================================================
        // BAGIAN 1: FONDASI ROBOTIKA
        // =====================================================================
        {
            name: 'Bagian 1: Fondasi Sistem Robotika',
            items: [

                // -------------------------------------------------------------
                // MODUL 01
                // -------------------------------------------------------------
                {
                    id: 'robo01',
                    title: 'Pertemuan 1: Pengantar Sistem Robotika',
                    lines: [
                        'Robot bukan sekadar mesin bergerak — ia adalah sistem yang merasakan, berpikir, dan bertindak secara berulang.',
                        '---',

                        '### Kontrak & Target Pembelajaran',
                        'card:Tujuan Akhir:Memahami anatomi robot, sistem kendali dasar, dan mampu memprogram logika kendali robot sederhana.',
                        'card:Penilaian:Tugas praktikum rangkaian, kuis mingguan, UTS (30%), dan proyek robot mini di akhir semester.',
                        'card:Sikap Profesional:Bekerja hati-hati dengan komponen elektronik dan mendokumentasikan setiap rangkaian yang dibuat.',
                        '---',

                        '### Apa Itu Robotika?',
                        '**Point** — Robotika adalah cabang ilmu yang mempelajari perancangan, pembuatan, pengoperasian, dan penggunaan robot.',
                        '**Reason** — Robot dibutuhkan untuk menggantikan manusia pada pekerjaan yang berbahaya, berulang, atau memerlukan presisi tinggi.',
                        '**Example** — Lengan robot di pabrik otomotif mengelas ribuan titik las dengan presisi milimeter, tanpa lelah dan konsisten sepanjang shift.',
                        '**Penegasan** — Robot yang baik adalah gabungan tiga elemen — mekanik yang kokoh, elektronik yang presisi, dan program yang cerdas.',
                        '---',

                        '### Siklus Kerja Robot: Sense - Think - Act',
                        'skill:100%:Sense — Robot menangkap kondisi lingkungan lewat sensor.:Tahap',
                        'skill:100%:Think — Mikrokontroler/prosesor memproses data dan mengambil keputusan.:Tahap',
                        'skill:100%:Act — Aktuator menjalankan keputusan menjadi gerakan atau aksi nyata.:Tahap',
                        '---',

                        '### Klasifikasi Robot Berdasarkan Aplikasi',
                        'table:[{"Kategori":"Robot Industri","Contoh":"Lengan robot perakitan, robot las","Fungsi":"Otomasi pekerjaan pabrik berulang & presisi tinggi"},{"Kategori":"Robot Mobile","Contoh":"Robot line follower, AGV gudang","Fungsi":"Bergerak & bernavigasi di suatu area"},{"Kategori":"Robot Layanan","Contoh":"Robot pramusaji, robot vacuum","Fungsi":"Membantu pekerjaan manusia sehari-hari"},{"Kategori":"Robot Edukasi","Contoh":"Arduino robot kit, LEGO Mindstorms","Fungsi":"Media pembelajaran konsep robotika dasar"},{"Kategori":"Robot Humanoid","Contoh":"ASIMO, Sophia","Fungsi":"Meniru bentuk & interaksi menyerupai manusia"}]',
                        '---',

                        '### Ilustrasi Sederhana: Robot Penghindar Halangan',
                        '```javascript',
                        '// Simulasi logika sense-think-act robot penghindar halangan\nfunction siklusRobot(jarakDepanCm) {\n  // SENSE: baca sensor jarak\n  const adaHalangan = jarakDepanCm < 15;\n\n  // THINK: putuskan aksi berdasar data sensor\n  let aksi;\n  if (adaHalangan) {\n    aksi = \'belok kanan\';\n  } else {\n    aksi = \'maju lurus\';\n  }\n\n  // ACT: kirim perintah ke motor\n  return `Jarak ${jarakDepanCm}cm -> Aksi: ${aksi}`;\n}\n\nconsole.log(siklusRobot(30)); // Jarak 30cm -> Aksi: maju lurus\nconsole.log(siklusRobot(8));  // Jarak 8cm -> Aksi: belok kanan',
                        '```',
                        '---',

                        '### Mitos vs Realita dalam Robotika',
                        'card:Mitos "Robot bisa berpikir sendiri seperti manusia":Realita — sebagian besar robot hanya menjalankan aturan (if-then) yang sudah diprogram, bukan kesadaran mandiri.',
                        'card:Mitos "Membuat robot butuh komponen sangat mahal":Realita — robot edukasi dasar bisa dibuat dengan mikrokontroler murah, sensor sederhana, dan motor DC.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 02
                // -------------------------------------------------------------
                {
                    id: 'robo02',
                    title: 'Pertemuan 2: Anatomi Robot — Sensor',
                    lines: [
                        'Sensor adalah panca indra robot — tanpa sensor, robot buta dan tuli terhadap dunia di sekitarnya.',
                        '---',

                        '### Apa Itu Sensor?',
                        '**Point** — Sensor adalah komponen yang mengubah besaran fisik (jarak, cahaya, suhu, dsb) menjadi sinyal listrik yang bisa dibaca mikrokontroler.',
                        '**Reason** — Tanpa sensor, robot tidak punya cara mengetahui kondisi lingkungan sehingga tidak bisa mengambil keputusan yang sesuai.',
                        '**Example** — Sensor ultrasonik HC-SR04 mengukur jarak dengan memancarkan gelombang suara dan menghitung waktu pantulnya kembali.',
                        '**Penegasan** — Kualitas keputusan robot sangat bergantung pada akurasi dan kecepatan pembacaan sensornya.',
                        '---',

                        '### Jenis-Jenis Sensor Umum',
                        'table:[{"Sensor":"Ultrasonik (HC-SR04)","Mengukur":"Jarak ke objek","Prinsip":"Pantulan gelombang suara"},{"Sensor":"Infrared (IR)","Mengukur":"Jarak dekat & pendeteksi garis","Prinsip":"Pantulan cahaya inframerah"},{"Sensor":"LDR (Light Dependent Resistor)","Mengukur":"Intensitas cahaya","Prinsip":"Perubahan resistansi akibat cahaya"},{"Sensor":"Accelerometer/Gyroscope","Mengukur":"Percepatan & orientasi","Prinsip":"Perubahan kapasitansi mikro-mekanis"},{"Sensor":"LM35/DHT11","Mengukur":"Suhu & kelembapan","Prinsip":"Perubahan tegangan/resistansi terhadap suhu"}]',
                        '---',

                        '### Sensor Analog vs Digital',
                        'skill:100%:Sensor Digital — Output hanya dua kondisi, HIGH atau LOW (misal IR sederhana).:Jenis',
                        'skill:100%:Sensor Analog — Output berupa rentang nilai kontinu (misal LDR, potensiometer).:Jenis',
                        '---',

                        '### Membaca Sensor Ultrasonik (Pseudocode Arduino-style)',
                        '```javascript',
                        '// Pseudocode logika pembacaan sensor ultrasonik HC-SR04\nfunction bacaJarakUltrasonik(waktuPantulMikrodetik) {\n  const kecepatanSuara = 0.0343; // cm per mikrodetik\n  const jarakCm = (waktuPantulMikrodetik * kecepatanSuara) / 2; // dibagi 2 (pergi-pulang)\n  return jarakCm.toFixed(1);\n}\n\nconsole.log(bacaJarakUltrasonik(600) + \' cm\'); // contoh hasil pembacaan',
                        '```',
                        '---',

                        '### Prinsip Memilih Sensor',
                        'card:Pertimbangan Utama:Sesuaikan jenis sensor dengan besaran fisik yang ingin diukur dan rentang jarak/akurasi yang dibutuhkan.',
                        'card:Kesalahan Umum Pemula:Memasang sensor tanpa memperhatikan tegangan kerja (3.3V vs 5V) sehingga sensor cepat rusak.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 03
                // -------------------------------------------------------------
                {
                    id: 'robo03',
                    title: 'Pertemuan 3: Anatomi Robot — Aktuator',
                    lines: [
                        'Jika sensor adalah panca indra, aktuator adalah otot robot — yang mengubah keputusan menjadi gerakan nyata.',
                        '---',

                        '### Apa Itu Aktuator?',
                        '**Point** — Aktuator adalah komponen yang mengubah sinyal listrik/perintah dari mikrokontroler menjadi gerakan atau aksi fisik.',
                        '**Reason** — Tanpa aktuator, keputusan yang dihasilkan mikrokontroler hanya akan menjadi data, tidak pernah berubah jadi aksi nyata.',
                        '**Example** — Motor servo memutar roda kemudi robot line follower sesuai sudut yang diperintahkan program, tepat dan terkontrol.',
                        '**Penegasan** — Pemilihan aktuator yang tepat menentukan seberapa presisi dan kuat robot bisa bergerak.',
                        '---',

                        '### Jenis-Jenis Aktuator Umum',
                        'table:[{"Aktuator":"Motor DC","Karakteristik":"Berputar terus menerus, kontrol kecepatan lewat PWM","Aplikasi":"Roda robot mobile"},{"Aktuator":"Motor Servo","Karakteristik":"Berputar pada sudut tertentu (0-180 derajat)","Aplikasi":"Lengan robot, kemudi robot"},{"Aktuator":"Motor Stepper","Karakteristik":"Berputar per langkah kecil dengan presisi tinggi","Aplikasi":"Printer 3D, mesin CNC"},{"Aktuator":"Solenoid","Karakteristik":"Gerakan linear maju-mundur","Aplikasi":"Mekanisme pengunci, penendang bola"}]',
                        '---',

                        '### PWM — Kunci Mengontrol Kecepatan & Sudut',
                        '**Point** — Pulse Width Modulation (PWM) mengatur daya rata-rata yang diterima aktuator dengan mengubah lebar pulsa sinyal digital.',
                        '**Reason** — Mikrokontroler pada dasarnya hanya bisa mengeluarkan sinyal ON/OFF — PWM mensimulasikan nilai analog dari sinyal digital tersebut.',
                        '**Example** — Duty cycle 25% membuat motor DC berputar pelan, duty cycle 90% membuat motor berputar hampir maksimal.',
                        '---',

                        '### Simulasi Kontrol PWM Motor DC',
                        '```javascript',
                        '// Simulasi hubungan duty cycle PWM dengan kecepatan motor\nfunction kecepatanMotor(dutyCyclePersen) {\n  const dutyCycle = Math.max(0, Math.min(100, dutyCyclePersen));\n  const kecepatanMaks = 200; // RPM maksimal motor\n  const kecepatanAktual = (dutyCycle / 100) * kecepatanMaks;\n  return `Duty cycle ${dutyCycle}% -> ${kecepatanAktual.toFixed(0)} RPM`;\n}\n\nconsole.log(kecepatanMotor(25));  // pelan\nconsole.log(kecepatanMotor(90));  // hampir maksimal',
                        '```',
                        '---',

                        '### Checklist Memilih Aktuator',
                        'skill:100%:Kenali kebutuhan gerak — kontinu, bersudut, atau linear:Wajib',
                        'skill:90%:Perhitungkan torsi yang dibutuhkan terhadap beban robot:Penting',
                        'skill:85%:Sesuaikan tegangan & arus kerja aktuator dengan sumber daya robot:Penting',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 04
                // -------------------------------------------------------------
                {
                    id: 'robo04',
                    title: 'Pertemuan 4: Mikrokontroler & Pemrograman Dasar',
                    lines: [
                        'Mikrokontroler adalah otak kecil robot — tempat semua logika sense-think-act benar-benar diproses.',
                        '---',

                        '### Apa Itu Mikrokontroler?',
                        '**Point** — Mikrokontroler adalah chip komputer mini berisi prosesor, memori, dan pin input/output dalam satu keping, dirancang untuk sistem tertanam.',
                        '**Reason** — Robot butuh unit pemroses ringan, murah, dan hemat daya yang bisa langsung terhubung ke sensor & aktuator — bukan komputer full seperti PC.',
                        '**Example** — Arduino Uno (berbasis ATmega328P) banyak dipakai di robotika edukasi karena murah, mudah diprogram, dan komunitasnya besar.',
                        '**Penegasan** — Mikrokontroler menjalankan program secara berulang (loop) selama robot menyala — inilah yang membuat robot terus "bereaksi".',
                        '---',

                        '### Anatomi Program Mikrokontroler (Struktur Arduino)',
                        'table:[{"Bagian":"setup()","Fungsi":"Dijalankan sekali saat robot dinyalakan, untuk inisialisasi pin & komponen"},{"Bagian":"loop()","Fungsi":"Dijalankan berulang terus menerus selama robot menyala"},{"Bagian":"pinMode()","Fungsi":"Menentukan sebuah pin sebagai INPUT (sensor) atau OUTPUT (aktuator)"},{"Bagian":"digitalRead/Write()","Fungsi":"Membaca atau menulis sinyal digital HIGH/LOW pada pin"}]',
                        '---',

                        '### Contoh Struktur Program Mikrokontroler',
                        '```javascript',
                        '// Pseudocode gaya Arduino - LED menyala saat sensor mendeteksi halangan\nconst PIN_SENSOR = 7;\nconst PIN_LED = 13;\n\nfunction setup() {\n  pinMode(PIN_SENSOR, \'INPUT\');\n  pinMode(PIN_LED, \'OUTPUT\');\n}\n\nfunction loop() {\n  const adaHalangan = digitalRead(PIN_SENSOR); // baca sensor\n\n  if (adaHalangan) {\n    digitalWrite(PIN_LED, \'HIGH\'); // nyalakan LED\n  } else {\n    digitalWrite(PIN_LED, \'LOW\');  // matikan LED\n  }\n}\n\n// loop() akan dipanggil berulang-ulang selama mikrokontroler menyala',
                        '```',
                        '---',

                        '### Perbandingan Mikrokontroler Populer',
                        'skill:100%:Arduino Uno — Sederhana, cocok untuk pemula & prototipe cepat.:Populer',
                        'skill:90%:ESP32 — Dilengkapi WiFi & Bluetooth, cocok robot IoT.:Populer',
                        'skill:85%:Raspberry Pi Pico — Lebih cepat, mendukung MicroPython.:Populer',
                        '---',

                        '### Rangkuman Bagian 1',
                        'card:Fondasi Terkumpul:Konsep sense-think-act, sensor sebagai indra, aktuator sebagai otot, dan mikrokontroler sebagai otak robot.',
                        'card:Selanjutnya:Bagian 2 membahas bagaimana robot bergerak secara matematis lewat kinematika dan sistem kendali.',
                    ]
                },
            ]
        },

        // =====================================================================
        // BAGIAN 2: GERAK & KENDALI
        // =====================================================================
        {
            name: 'Bagian 2: Gerak & Sistem Kendali Robot',
            items: [

                // -------------------------------------------------------------
                // MODUL 05
                // -------------------------------------------------------------
                {
                    id: 'robo05',
                    title: 'Pertemuan 5: Kinematika Dasar Robot',
                    lines: [
                        'Kinematika menjawab pertanyaan sederhana namun krusial — jika roda berputar sekian, ke mana sebenarnya robot akan bergerak?',
                        '---',

                        '### Apa Itu Kinematika Robot?',
                        '**Point** — Kinematika adalah studi tentang gerak robot (posisi, kecepatan, arah) tanpa memperhitungkan gaya penyebabnya.',
                        '**Reason** — Untuk mengendalikan robot secara presisi, kita perlu tahu hubungan matematis antara kecepatan roda dan pergerakan seluruh robot.',
                        '**Example** — Pada robot beroda dua (differential drive), kecepatan roda kiri & kanan yang berbeda membuat robot berbelok, bukan hanya maju lurus.',
                        '**Penegasan** — Kinematika adalah dasar sebelum mempelajari sistem kendali yang lebih kompleks seperti navigasi otomatis.',
                        '---',

                        '### Differential Drive — Model Robot Beroda Dua',
                        'table:[{"Kondisi Roda":"Kiri & Kanan sama cepat","Hasil Gerak":"Robot bergerak lurus ke depan/belakang"},{"Kondisi Roda":"Kiri lebih cepat dari kanan","Hasil Gerak":"Robot berbelok ke kanan"},{"Kondisi Roda":"Kanan lebih cepat dari kiri","Hasil Gerak":"Robot berbelok ke kiri"},{"Kondisi Roda":"Kiri maju, kanan mundur (kecepatan sama)","Hasil Gerak":"Robot berputar di tempat"}]',
                        '---',

                        '### Perhitungan Kecepatan Linear & Angular',
                        '```javascript',
                        '// Model kinematika differential drive sederhana\nfunction hitungGerakRobot(vKiri, vKanan, jarakRoda) {\n  // vKiri, vKanan dalam cm/detik, jarakRoda = jarak antar roda (cm)\n  const vLinear  = (vKiri + vKanan) / 2;             // kecepatan maju robot\n  const vAngular = (vKanan - vKiri) / jarakRoda;      // kecepatan berbelok (rad/detik)\n\n  return {\n    vLinear: vLinear.toFixed(2) + \' cm/s\',\n    vAngular: vAngular.toFixed(3) + \' rad/s\',\n    arah: vAngular > 0 ? \'belok kiri\' : vAngular < 0 ? \'belok kanan\' : \'lurus\'\n  };\n}\n\nconsole.log(hitungGerakRobot(10, 15, 12));\n// { vLinear: \'12.50 cm/s\', vAngular: \'0.417 rad/s\', arah: \'belok kiri\' }',
                        '```',
                        '---',

                        '### Konsep Penting dalam Kinematika',
                        'skill:100%:Odometry — Estimasi posisi robot dari data putaran roda (encoder).:Konsep',
                        'skill:90%:Turning Radius — Jari-jari lintasan belok yang bisa dicapai robot.:Konsep',
                        'skill:85%:Dead Reckoning — Menghitung posisi berdasar gerak sebelumnya, rentan akumulasi error.:Konsep',
                        '---',

                        '### Latihan Konsep',
                        'card:Soal:Jika roda kiri berputar 20 cm/s dan roda kanan 20 cm/s pada jarak roda 10 cm, ke arah mana robot akan bergerak?',
                        'card:Petunjuk:Bandingkan kecepatan vKiri dan vKanan menggunakan rumus kecepatan angular di atas.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 06
                // -------------------------------------------------------------
                {
                    id: 'robo06',
                    title: 'Pertemuan 6: Sistem Kendali (Control Loop)',
                    lines: [
                        'Robot yang baik tidak hanya bergerak — ia terus mengoreksi dirinya sendiri agar tetap sesuai target.',
                        '---',

                        '### Konsep Sistem Kendali Loop Tertutup',
                        '**Point** — Closed-loop control adalah sistem kendali yang terus membandingkan kondisi aktual (dari sensor) dengan target, lalu mengoreksi aksinya secara berulang.',
                        '**Reason** — Sistem open-loop (tanpa umpan balik) tidak bisa mengoreksi diri jika terjadi gangguan, misalnya roda selip atau medan tidak rata.',
                        '**Example** — Robot line follower terus membaca sensor garis dan mengoreksi arah motor setiap milidetik agar tetap berada di atas garis.',
                        '**Penegasan** — Loop tertutup adalah inti dari robot yang "cerdas" — ia bereaksi terhadap kondisi nyata, bukan hanya mengikuti perintah buta.',
                        '---',

                        '### Open Loop vs Closed Loop',
                        'table:[{"Aspek":"Umpan Balik (Feedback)","Open Loop":"Tidak ada","Closed Loop":"Ada, dari sensor secara berkelanjutan"},{"Aspek":"Akurasi","Open Loop":"Rendah, rentan error akumulasi","Closed Loop":"Tinggi, terus dikoreksi"},{"Aspek":"Contoh","Open Loop":"Timer microwave (waktu tetap, tanpa cek suhu)","Closed Loop":"AC dengan termostat (terus cek suhu ruangan)"}]',
                        '---',

                        '### Pengantar Kontrol PID (Konsep Dasar)',
                        'skill:100%:Proportional (P) — Koreksi sebanding dengan besar error saat ini.:Komponen PID',
                        'skill:90%:Integral (I) — Koreksi berdasar akumulasi error dari waktu ke waktu.:Komponen PID',
                        'skill:90%:Derivative (D) — Koreksi berdasar seberapa cepat error berubah.:Komponen PID',
                        '---',

                        '### Simulasi Sederhana Kontrol Proportional',
                        '```javascript',
                        '// Simulasi kontrol Proportional (P) sederhana untuk line follower\nfunction koreksiProportional(posisiGaris, posisiTengah, Kp) {\n  const error = posisiTengah - posisiGaris; // seberapa jauh dari tengah\n  const koreksi = Kp * error;               // besar koreksi kecepatan motor\n\n  return {\n    error,\n    koreksi: koreksi.toFixed(2),\n    aksi: error > 0 ? \'kurangi motor kanan\' : error < 0 ? \'kurangi motor kiri\' : \'seimbang\'\n  };\n}\n\nconsole.log(koreksiProportional(30, 50, 0.8));\n// error 20, robot mengoreksi ke arah tengah garis',
                        '```',
                        '---',

                        '### Kesalahan Umum dalam Sistem Kendali',
                        'card:Kesalahan Umum:Nilai Kp (gain) terlalu besar membuat robot bergetar/overshoot, terlalu kecil membuat robot lambat merespons.',
                        'card:Tips Praktis:Mulai dari kontrol Proportional saja, baru tambahkan Integral/Derivative jika masih diperlukan.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 07
                // -------------------------------------------------------------
                {
                    id: 'robo07',
                    title: 'Pertemuan 7: Pemrograman Logika Kendali Robot Sederhana',
                    lines: [
                        'Di sinilah semua konsep bertemu — sensor, aktuator, dan mikrokontroler disatukan menjadi satu program kendali yang utuh.',
                        '---',

                        '### Merancang Logika Kendali',
                        '**Point** — Logika kendali robot sederhana umumnya berbentuk aturan if-then berdasarkan kombinasi pembacaan sensor.',
                        '**Reason** — Untuk robot dasar (non-AI), aturan eksplisit lebih mudah dipahami, diuji, dan diperbaiki dibanding model yang kompleks.',
                        '**Example** — Robot penghindar halangan menggunakan aturan sederhana — jika jarak < 15cm maka belok, jika tidak maka maju.',
                        '**Penegasan** — Logika kendali yang baik harus menangani SEMUA kondisi sensor yang mungkin terjadi, termasuk kondisi tak terduga.',
                        '---',

                        '### Studi Kasus: Robot Line Follower Sederhana',
                        'table:[{"Kondisi Sensor":"Kedua sensor di atas garis","Aksi Motor":"Maju lurus"},{"Kondisi Sensor":"Sensor kiri keluar garis","Aksi Motor":"Belok kiri (kurangi motor kiri)"},{"Kondisi Sensor":"Sensor kanan keluar garis","Aksi Motor":"Belok kanan (kurangi motor kanan)"},{"Kondisi Sensor":"Kedua sensor keluar garis","Aksi Motor":"Berhenti / cari ulang garis"}]',
                        '---',

                        '### Implementasi Logika Line Follower',
                        '```javascript',
                        '// Logika kendali robot line follower 2 sensor (true = mendeteksi garis)\nfunction kendaliLineFollower(sensorKiri, sensorKanan) {\n  if (sensorKiri && sensorKanan) {\n    return { kiri: 150, kanan: 150, status: \'maju lurus\' };\n  }\n  if (!sensorKiri && sensorKanan) {\n    return { kiri: 60, kanan: 150, status: \'belok kiri\' };\n  }\n  if (sensorKiri && !sensorKanan) {\n    return { kiri: 150, kanan: 60, status: \'belok kanan\' };\n  }\n  // kedua sensor keluar dari garis\n  return { kiri: 0, kanan: 0, status: \'berhenti - garis hilang\' };\n}\n\nconsole.log(kendaliLineFollower(true, false));  // belok kanan\nconsole.log(kendaliLineFollower(false, false)); // berhenti',
                        '```',
                        '---',

                        '### Prinsip Pemrograman Logika Kendali yang Baik',
                        'skill:100%:Tangani semua kombinasi kondisi sensor, termasuk kasus tak terduga:Wajib',
                        'skill:90%:Uji logika secara bertahap - satu sensor dulu, baru gabungkan:Praktik Baik',
                        'skill:85%:Beri kondisi "aman" default (misal berhenti) saat sensor tidak jelas:Praktik Baik',
                        '---',

                        '### Latihan Konsep',
                        'card:Soal:Modifikasi logika line follower di atas agar menambahkan kondisi khusus - jika kedua sensor keluar garis lebih dari 2 detik, robot berputar mencari garis.',
                    ]
                },
            ]
        },

        // =====================================================================
        // BAGIAN 3: APLIKASI & EVALUASI
        // =====================================================================
        {
            name: 'Bagian 3: Aplikasi Lanjutan & Evaluasi',
            items: [

                // -------------------------------------------------------------
                // MODUL 08
                // -------------------------------------------------------------
                {
                    id: 'robo08',
                    title: 'Pertemuan 8: Robot Mobile & Navigasi',
                    lines: [
                        'Robot yang bisa bergerak saja belum cukup — robot mobile sejati harus tahu ke mana ia harus pergi, dan bagaimana sampai ke sana.',
                        '---',

                        '### Tantangan Navigasi Robot Mobile',
                        '**Point** — Navigasi robot mobile mencakup tiga masalah utama - localization (di mana saya), mapping (seperti apa lingkungan sekitar), dan path planning (bagaimana mencapai tujuan).',
                        '**Reason** — Tanpa navigasi yang baik, robot mobile hanya bisa bergerak acak tanpa tujuan atau menabrak halangan yang tidak diantisipasi.',
                        '**Example** — Robot vacuum cleaner modern memetakan seluruh ruangan sebelum membersihkan agar rute pembersihannya efisien, tidak mengulang area yang sama.',
                        '**Penegasan** — Semakin kompleks lingkungan, semakin penting kombinasi sensor (bukan hanya satu jenis) untuk navigasi yang andal.',
                        '---',

                        '### Strategi Navigasi Umum',
                        'table:[{"Strategi":"Wall Following","Deskripsi":"Robot menyusuri dinding sebagai referensi arah"},{"Strategi":"Line Following","Deskripsi":"Robot mengikuti jalur/garis yang sudah ditentukan"},{"Strategi":"Obstacle Avoidance","Deskripsi":"Robot bergerak bebas sambil menghindari halangan yang terdeteksi"},{"Strategi":"Waypoint Navigation","Deskripsi":"Robot bergerak menuju titik-titik koordinat yang sudah ditentukan"}]',
                        '---',

                        '### Simulasi Sederhana Obstacle Avoidance',
                        '```javascript',
                        '// Simulasi navigasi obstacle avoidance dengan 3 sensor jarak\nfunction navigasiHindarHalangan(kiri, depan, kanan) {\n  const AMBANG_BATAS = 20; // cm\n\n  if (depan > AMBANG_BATAS) {\n    return \'maju lurus\';\n  }\n  if (kiri > kanan) {\n    return \'belok kiri (ruang lebih luas di kiri)\';\n  }\n  if (kanan > kiri) {\n    return \'belok kanan (ruang lebih luas di kanan)\';\n  }\n  return \'mundur - terjebak di semua sisi\';\n}\n\nconsole.log(navigasiHindarHalangan(40, 10, 15)); // belok kiri',
                        '```',
                        '---',

                        '### Konsep Penting Navigasi',
                        'skill:100%:SLAM (Simultaneous Localization and Mapping) - memetakan sambil menentukan posisi diri.:Konsep Lanjutan',
                        'skill:85%:Sensor Fusion - Menggabungkan data dari beberapa sensor agar navigasi lebih andal.:Konsep Lanjutan',
                        '---',

                        '### Rangkuman',
                        'card:Inti Navigasi:Robot mobile yang andal menggabungkan kinematika (Pertemuan 5), kendali (Pertemuan 6), dan strategi navigasi yang sesuai lingkungannya.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 09
                // -------------------------------------------------------------
                {
                    id: 'robo09',
                    title: 'Pertemuan 9: Studi Kasus Integrasi — Robot Line Follower Lengkap',
                    lines: [
                        'Saatnya menggabungkan sensor, aktuator, mikrokontroler, kinematika, dan kendali menjadi satu sistem robot yang utuh.',
                        '---',

                        '### Arsitektur Sistem Line Follower Lengkap',
                        'card:Sensor:Array sensor IR di bagian bawah robot untuk mendeteksi posisi garis hitam di lantai putih.',
                        'card:Kendali:Algoritma Proportional Control untuk menghitung koreksi kecepatan motor kiri & kanan secara halus.',
                        'card:Aktuator:Dua motor DC dengan driver motor (misal L298N) yang dikendalikan sinyal PWM dari mikrokontroler.',
                        '---',

                        '### Diagram Alur Sistem',
                        'table:[{"Tahap":"1. Baca Sensor","Detail":"Array sensor IR membaca posisi garis (nilai -100 sampai 100)"},{"Tahap":"2. Hitung Error","Detail":"Error = posisi target (0/tengah) dikurangi posisi garis terbaca"},{"Tahap":"3. Hitung Koreksi","Detail":"Koreksi = Kp dikali Error (kontrol Proportional)"},{"Tahap":"4. Terapkan ke Motor","Detail":"Kecepatan dasar ditambah/dikurangi nilai koreksi, dikirim sebagai PWM"}]',
                        '---',

                        '### Implementasi Lengkap (Pseudocode)',
                        '```javascript',
                        '// Program lengkap logika robot line follower dengan Proportional Control\nconst KECEPATAN_DASAR = 150;\nconst Kp = 0.9;\n\nfunction bacaPosisiGaris(sensorArray) {\n  // sensorArray: 5 sensor IR, hasil pembobotan posisi garis (-100 s/d 100)\n  const bobot = [-100, -50, 0, 50, 100];\n  let total = 0, jumlahAktif = 0;\n\n  sensorArray.forEach((aktif, i) => {\n    if (aktif) { total += bobot[i]; jumlahAktif++; }\n  });\n\n  return jumlahAktif > 0 ? total / jumlahAktif : null; // null = garis hilang\n}\n\nfunction kendaliRobot(sensorArray) {\n  const posisi = bacaPosisiGaris(sensorArray);\n\n  if (posisi === null) {\n    return { motorKiri: 0, motorKanan: 0, status: \'garis hilang - berhenti\' };\n  }\n\n  const error = 0 - posisi; // target = 0 (tengah)\n  const koreksi = Kp * error;\n\n  return {\n    motorKiri: Math.round(KECEPATAN_DASAR - koreksi),\n    motorKanan: Math.round(KECEPATAN_DASAR + koreksi),\n    status: \'mengikuti garis\'\n  };\n}\n\nconsole.log(kendaliRobot([false, false, true, false, false])); // tepat di tengah\nconsole.log(kendaliRobot([false, true, false, false, false])); // sedikit ke kiri',
                        '```',
                        '---',

                        '### Checklist Debugging Robot',
                        'skill:100%:Uji setiap sensor secara individual sebelum menggabungkan ke logika utama:Wajib',
                        'skill:90%:Uji motor tanpa sensor dulu untuk memastikan arah putaran benar:Wajib',
                        'skill:85%:Baru gabungkan sensor + kendali + motor setelah masing-masing teruji:Praktik Baik',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 10 — EVALUASI AKHIR
                // -------------------------------------------------------------
                {
                    id: 'robo10',
                    title: 'Pertemuan 10: Evaluasi Akhir & Proyek Robotika',
                    lines: [
                        'Evaluasi akhir bukan sekadar ujian teori — ini saatnya membuktikan robot rancanganmu benar-benar bisa bergerak dan mengambil keputusan.',
                        '---',

                        '### Fokus Materi Evaluasi Akhir',
                        'card:Fondasi Robotika:Anatomi robot (sensor, aktuator, mikrokontroler) dan siklus sense-think-act.',
                        'card:Gerak & Kendali:Kinematika differential drive, closed-loop control, dan dasar kontrol Proportional.',
                        'card:Aplikasi Nyata:Navigasi robot mobile dan integrasi sistem line follower yang utuh.',
                        '---',

                        '### Struktur Proyek Akhir Robotika',
                        'table:[{"Komponen Penilaian":"Rancangan Sistem","Bobot":"25%","Kriteria":"Kejelasan diagram sensor-aktuator-mikrokontroler"},{"Komponen Penilaian":"Implementasi Program","Bobot":"35%","Kriteria":"Logika kendali berjalan sesuai skenario yang diuji"},{"Komponen Penilaian":"Uji Coba & Demo","Bobot":"25%","Kriteria":"Robot berfungsi sesuai tujuan yang direncanakan"},{"Komponen Penilaian":"Laporan & Presentasi","Bobot":"15%","Kriteria":"Dokumentasi jelas, mampu menjelaskan logika kendali"}]',
                        '---',

                        '### Contoh Soal Evaluasi',
                        '```javascript',
                        '// Soal: Robot memiliki 2 sensor jarak (kiri & kanan) dan harus\n// menghindari halangan sambil tetap bergerak maju.\n// Lengkapi logika kendali berikut:\n\nfunction kendaliHindarHalangan(jarakKiri, jarakKanan) {\n  const AMBANG = 20; // cm\n\n  // TODO: Lengkapi logika berikut\n  // - Jika kedua sisi aman -> maju lurus\n  // - Jika hanya kiri terhalang -> belok kanan\n  // - Jika hanya kanan terhalang -> belok kiri\n  // - Jika keduanya terhalang -> mundur\n\n  if (jarakKiri > AMBANG && jarakKanan > AMBANG) return \'maju lurus\';\n  if (jarakKiri <= AMBANG && jarakKanan > AMBANG) return \'belok kanan\';\n  if (jarakKanan <= AMBANG && jarakKiri > AMBANG) return \'belok kiri\';\n  return \'mundur\';\n}',
                        '```',
                        '---',

                        '### Checklist Kesiapan Evaluasi Akhir',
                        'skill:100%:Mampu menjelaskan alur sense-think-act pada studi kasus robot apapun:Wajib Kuasai',
                        'skill:90%:Mampu menghitung kinematika differential drive sederhana:Sangat Penting',
                        'skill:90%:Mampu merancang logika kendali if-then untuk skenario sensor yang diberikan:Sangat Penting',
                        'skill:80%:Memahami perbedaan open-loop dan closed-loop control:Penting',
                        '---',

                        '### Pertanyaan Latihan Komprehensif',
                        'table:[{"No":"1","Soal":"Jelaskan siklus sense-think-act pada robot vacuum cleaner otomatis, sebutkan sensor & aktuator yang mungkin dipakai."},{"No":"2","Soal":"Robot beroda dua bergerak dengan roda kiri 15 cm/s dan roda kanan 25 cm/s, jarak antar roda 15 cm. Hitung kecepatan linear & angular robot."},{"No":"3","Soal":"Rancang logika kendali if-then untuk robot pemadam api sederhana dengan 1 sensor api di depan."},{"No":"4","Soal":"Jelaskan mengapa sistem closed-loop lebih andal dibanding open-loop pada robot line follower."},{"No":"5","Soal":"Sebuah robot line follower bergetar terus-menerus saat mengikuti garis. Dari sisi kontrol Proportional, apa kemungkinan penyebabnya dan bagaimana solusinya?"}]',
                    ]
                },
            ]
        },
    ]
};
