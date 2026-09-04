pages.pbo = {
    categories: [

        // =====================================================================
        // BAGIAN 1: FONDASI OOP
        // =====================================================================
        {
            name: 'Bagian 1: Fondasi Pemrograman Berorientasi Objek',
            items: [

                // -------------------------------------------------------------
                // MODUL 01
                // -------------------------------------------------------------
                {
                    id: 'pbo01',
                    title: 'Pertemuan 1: Pengenalan Pemrograman Berorientasi Objek',
                    lines: [
                        'Pemrograman Berorientasi Objek (PBO/OOP) mengubah cara kita berpikir — dari "urutan perintah" menjadi "objek yang saling berinteraksi".',
                        '---',

                        '### Kontrak & Target Pembelajaran',
                        'card:Tujuan Akhir:Memahami konsep dasar OOP hingga mampu menerapkan design pattern umum dalam studi kasus nyata.',
                        'card:Penilaian:Tugas praktikum, kuis mingguan, UTS (30%), dan UAS berbasis proyek mini.',
                        'card:Sikap Profesional:Menulis kode yang rapi, dapat dibaca orang lain, dan didokumentasikan dengan baik.',
                        '---',

                        '### Apa Itu Pemrograman Berorientasi Objek?',
                        '**Point** — OOP adalah paradigma pemrograman yang membungkus data dan perilaku ke dalam satu unit bernama **objek**.',
                        '**Reason** — Paradigma prosedural membuat data dan fungsi terpisah, sehingga sulit dijaga konsistensinya ketika aplikasi tumbuh besar.',
                        '**Example** — Alih-alih variabel global `saldo` dan fungsi terpisah `tarikSaldo()`, OOP membungkusnya menjadi objek `RekeningBank` yang punya data dan perilakunya sendiri.',
                        '**Penegasan** — OOP tidak membuat kode otomatis lebih baik — ia hanya alat. Disiplin desain tetap tanggung jawab programmer.',
                        '---',

                        '### Perbandingan Paradigma Prosedural vs Objek',
                        'table:[{"Aspek":"Fokus Utama","Prosedural":"Urutan instruksi (fungsi)","OOP":"Objek yang membungkus data & perilaku"},{"Aspek":"Reusability","Prosedural":"Rendah, fungsi sering diulang","OOP":"Tinggi lewat inheritance & composition"},{"Aspek":"Perubahan Skala","Prosedural":"Sulit dikelola saat aplikasi besar","OOP":"Lebih terstruktur lewat class & modul"},{"Aspek":"Contoh Bahasa","Prosedural":"C, Pascal","OOP":"Java, C++, Python, JavaScript (class)"}]',
                        '---',

                        '### 4 Pilar Utama OOP',
                        'skill:100%:Encapsulation — Membungkus data & method dalam satu unit, menyembunyikan detail internal.:Pilar',
                        'skill:100%:Inheritance — Pewarisan sifat dari class induk ke class turunan.:Pilar',
                        'skill:100%:Polymorphism — Satu antarmuka, banyak bentuk implementasi.:Pilar',
                        'skill:100%:Abstraction — Menyederhanakan kompleksitas dengan menampilkan hal penting saja.:Pilar',
                        '---',

                        '### Ilustrasi Sederhana: Dunia Nyata sebagai Objek',
                        '```javascript',
                        '// Dunia nyata: Mobil punya data (warna, kecepatan) dan perilaku (jalan, rem)\nclass Mobil {\n  constructor(warna) {\n    this.warna = warna;\n    this.kecepatan = 0;\n  }\n\n  jalan(tambahKecepatan) {\n    this.kecepatan += tambahKecepatan;\n    return `Mobil ${this.warna} melaju ${this.kecepatan} km/jam`;\n  }\n\n  rem() {\n    this.kecepatan = 0;\n    return \'Mobil berhenti\';\n  }\n}\n\nconst mobilSaya = new Mobil(\'merah\');\nconsole.log(mobilSaya.jalan(40)); // Mobil merah melaju 40 km/jam',
                        '```',
                        '---',

                        '### Mitos vs Realita dalam OOP',
                        'card:Mitos "OOP selalu lebih cepat dari prosedural":Realita — performa tergantung implementasi, bukan paradigma. OOP unggul di sisi maintainability, bukan selalu kecepatan eksekusi.',
                        'card:Mitos "Semakin banyak class semakin bagus":Realita — over-engineering dengan class berlebihan justru menyulitkan. Prinsip KISS tetap berlaku.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 02
                // -------------------------------------------------------------
                {
                    id: 'pbo02',
                    title: 'Pertemuan 2: Class dan Object',
                    lines: [
                        'Class adalah cetak biru — Object adalah bangunan nyata yang dibuat dari cetak biru tersebut.',
                        '---',

                        '### Definisi Class & Object',
                        '**Point** — **Class** adalah template/blueprint yang mendefinisikan atribut (data) dan method (perilaku). **Object** adalah instansiasi konkret dari class tersebut.',
                        '**Reason** — Tanpa class, setiap objek harus didefinisikan manual satu per satu — tidak efisien dan rawan inkonsistensi struktur.',
                        '**Example** — Class `Mahasiswa` mendefinisikan nama & NIM. Object `mhs1 = new Mahasiswa("Andi", "2201")` adalah satu mahasiswa nyata dari template itu.',
                        '**Penegasan** — Satu class bisa menghasilkan ribuan object berbeda, masing-masing dengan nilai atributnya sendiri.',
                        '---',

                        '### Anatomi Sebuah Class',
                        'table:[{"Komponen":"Atribut (Field/Property)","Fungsi":"Menyimpan data/state milik object"},{"Komponen":"Method","Fungsi":"Mendefinisikan perilaku/aksi yang bisa dilakukan object"},{"Komponen":"Constructor","Fungsi":"Fungsi khusus yang dijalankan saat object baru dibuat"},{"Komponen":"Access Modifier","Fungsi":"Mengatur siapa saja yang boleh mengakses atribut/method"}]',
                        '---',

                        '### Membuat Class dan Object Pertama',
                        '```javascript',
                        'class Mahasiswa {\n  constructor(nama, nim) {\n    this.nama = nama;\n    this.nim = nim;\n    this.mataKuliah = [];\n  }\n\n  ambilMataKuliah(mk) {\n    this.mataKuliah.push(mk);\n    return `${this.nama} mengambil ${mk}`;\n  }\n\n  info() {\n    return `${this.nama} (${this.nim}) - ${this.mataKuliah.length} MK`;\n  }\n}\n\n// Instansiasi -> membuat object dari class\nconst mhs1 = new Mahasiswa(\'Andi\', \'2201001\');\nconst mhs2 = new Mahasiswa(\'Budi\', \'2201002\');\n\nmhs1.ambilMataKuliah(\'PBO\');\nconsole.log(mhs1.info()); // Andi (2201001) - 1 MK\nconsole.log(mhs2.info()); // Budi (2201002) - 0 MK',
                        '```',
                        '---',

                        '### State vs Behavior',
                        'skill:100%:State (Atribut) — Kondisi object saat ini, misal nama, umur, saldo.:Konsep',
                        'skill:100%:Behavior (Method) — Apa yang bisa dilakukan object, misal jalan(), simpan().:Konsep',
                        'skill:90%:Identity — Setiap object punya identitas unik, walau atributnya sama persis.:Konsep',
                        '---',

                        '### Latihan Konsep',
                        'card:Soal:Buat class Buku dengan atribut judul & penulis, serta method tampilkanInfo() yang mengembalikan string informasi buku.',
                        'card:Petunjuk:Gunakan constructor untuk inisialisasi atribut saat object dibuat dengan kata kunci new.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 03
                // -------------------------------------------------------------
                {
                    id: 'pbo03',
                    title: 'Pertemuan 3: Encapsulation (Enkapsulasi)',
                    lines: [
                        'Enkapsulasi adalah tentang menyembunyikan "bagaimana", dan hanya menampilkan "apa" kepada dunia luar.',
                        '---',

                        '### Konsep Enkapsulasi',
                        '**Point** — Enkapsulasi membungkus data dan menyembunyikan detail implementasi internal, hanya mengekspos apa yang perlu diakses dari luar.',
                        '**Reason** — Tanpa enkapsulasi, kode luar bisa mengubah data internal secara sembarangan, menyebabkan state objek menjadi tidak konsisten.',
                        '**Example** — Saldo rekening bank tidak boleh diubah langsung (`rekening.saldo = -1000`) — harus melalui method `setor()`/`tarik()` yang memvalidasi.',
                        '**Penegasan** — Enkapsulasi = kontrol akses. Data privat, akses lewat method publik yang terjaga aturannya.',
                        '---',

                        '### Access Modifier Umum',
                        'table:[{"Modifier":"private (#)","Akses":"Hanya di dalam class itu sendiri","Contoh":"#saldo"},{"Modifier":"public","Akses":"Bisa diakses dari mana saja","Contoh":"nama"},{"Modifier":"protected","Akses":"Class itu sendiri & turunannya","Contoh":"_kodeAkun (konvensi)"}]',
                        '---',

                        '### Implementasi Enkapsulasi dengan Private Field',
                        '```javascript',
                        'class RekeningBank {\n  #saldo; // private field - hanya bisa diakses dalam class ini\n\n  constructor(pemilik, saldoAwal) {\n    this.pemilik = pemilik;\n    this.#saldo = saldoAwal;\n  }\n\n  setor(jumlah) {\n    if (jumlah <= 0) return \'Jumlah setor tidak valid\';\n    this.#saldo += jumlah;\n    return `Saldo sekarang ${this.#saldo}`;\n  }\n\n  tarik(jumlah) {\n    if (jumlah > this.#saldo) return \'Saldo tidak cukup\';\n    this.#saldo -= jumlah;\n    return `Saldo sekarang ${this.#saldo}`;\n  }\n\n  getSaldo() {\n    return this.#saldo; // akses terkontrol lewat getter\n  }\n}\n\nconst rek = new RekeningBank(\'Andi\', 100000);\nrek.setor(50000);\nconsole.log(rek.getSaldo()); // 150000\n// rek.#saldo -> Error! Tidak bisa diakses dari luar class',
                        '```',
                        '---',

                        '### Manfaat Enkapsulasi',
                        'skill:100%:Data Protection — Mencegah perubahan data yang tidak sah atau tidak konsisten.:Manfaat',
                        'skill:95%:Maintainability — Detail internal bisa diubah tanpa memengaruhi kode luar yang memakainya.:Manfaat',
                        'skill:90%:Validasi Terpusat — Semua perubahan data lewat satu pintu (method) yang bisa divalidasi.:Manfaat',
                        '---',

                        '### Getter dan Setter',
                        'card:Getter:Method untuk membaca nilai private field secara terkontrol, misal getSaldo().',
                        'card:Setter:Method untuk mengubah nilai private field dengan validasi, misal setNama(nama) yang menolak string kosong.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 04
                // -------------------------------------------------------------
                {
                    id: 'pbo04',
                    title: 'Pertemuan 4: Constructor dan Method Lanjutan',
                    lines: [
                        'Constructor adalah gerbang pertama sebuah object lahir — di sinilah aturan awal ditegakkan.',
                        '---',

                        '### Constructor — Gerbang Inisialisasi Object',
                        '**Point** — Constructor dijalankan otomatis setiap kali object baru dibuat dengan `new`, digunakan untuk inisialisasi state awal.',
                        '**Reason** — Tanpa constructor yang benar, object bisa lahir dalam keadaan "cacat" — atribut penting kosong atau tidak valid.',
                        '**Example** — Class `Produk` mewajibkan `harga` diisi di constructor dan menolak nilai negatif sejak awal object dibuat.',
                        '**Penegasan** — Constructor yang baik memvalidasi input sedini mungkin — mencegah bug menyebar ke bagian lain program.',
                        '---',

                        '### Jenis-Jenis Method',
                        'table:[{"Jenis Method":"Instance Method","Deskripsi":"Method biasa, dipanggil lewat object, bisa akses this"},{"Jenis Method":"Static Method","Deskripsi":"Milik class itu sendiri, dipanggil tanpa membuat object"},{"Jenis Method":"Getter/Setter","Deskripsi":"Method khusus untuk baca/tulis atribut secara terkontrol"}]',
                        '---',

                        '### Contoh Static Method dan Overloading Sederhana',
                        '```javascript',
                        'class KalkulatorLuas {\n  static persegi(sisi) {\n    return sisi * sisi;\n  }\n\n  static lingkaran(radius) {\n    return Math.PI * radius * radius;\n  }\n}\n\n// Static method dipanggil lewat nama class, TANPA new\nconsole.log(KalkulatorLuas.persegi(5));      // 25\nconsole.log(KalkulatorLuas.lingkaran(7));    // ~153.9\n\n// JavaScript tidak mendukung method overloading klasik,\n// tapi bisa disimulasikan dengan default parameter\nclass Kalkulator {\n  hitung(a, b, operasi = \'tambah\') {\n    if (operasi === \'tambah\') return a + b;\n    if (operasi === \'kurang\') return a - b;\n    return null;\n  }\n}',
                        '```',
                        '---',

                        '### Checklist Constructor yang Baik',
                        'skill:100%:Validasi parameter penting sebelum menetapkan ke atribut:Wajib',
                        'skill:90%:Beri nilai default yang wajar untuk parameter opsional:Disarankan',
                        'skill:85%:Hindari logika bisnis kompleks di dalam constructor:Praktik Baik',
                        '---',

                        '### Rangkuman Bagian 1',
                        'card:Fondasi OOP:Class sebagai blueprint, Object sebagai instansiasi, Enkapsulasi untuk kontrol akses, Constructor untuk inisialisasi yang aman.',
                        'card:Selanjutnya:Bagian 2 akan membahas Inheritance dan Polymorphism — dua pilar yang membuat kode jadi jauh lebih reusable.',
                    ]
                },
            ]
        },

        // =====================================================================
        // BAGIAN 2: PILAR OOP LANJUTAN
        // =====================================================================
        {
            name: 'Bagian 2: Pilar OOP Lanjutan',
            items: [

                // -------------------------------------------------------------
                // MODUL 05
                // -------------------------------------------------------------
                {
                    id: 'pbo05',
                    title: 'Pertemuan 5: Inheritance (Pewarisan)',
                    lines: [
                        'Inheritance memungkinkan class baru "meminjam" sifat class yang sudah ada — hemat kode, konsisten perilaku.',
                        '---',

                        '### Konsep Inheritance',
                        '**Point** — Inheritance memungkinkan sebuah class (subclass/turunan) mewarisi atribut dan method dari class lain (superclass/induk).',
                        '**Reason** — Tanpa inheritance, kode yang mirip di banyak class harus ditulis ulang berkali-kali — melanggar prinsip DRY.',
                        '**Example** — Class `Kucing` dan `Anjing` sama-sama punya perilaku `makan()` dan `tidur()` — keduanya bisa mewarisi dari class induk `Hewan`.',
                        '**Penegasan** — Inheritance mewakili hubungan "is-a" (Kucing IS-A Hewan) — bukan sekadar berbagi kode.',
                        '---',

                        '### Implementasi Inheritance dengan extends',
                        '```javascript',
                        'class Hewan {\n  constructor(nama) {\n    this.nama = nama;\n  }\n\n  makan() {\n    return `${this.nama} sedang makan`;\n  }\n\n  bersuara() {\n    return `${this.nama} mengeluarkan suara`;\n  }\n}\n\nclass Kucing extends Hewan {\n  bersuara() { // override method induk\n    return `${this.nama} berkata meong`;\n  }\n}\n\nclass Anjing extends Hewan {\n  bersuara() {\n    return `${this.nama} berkata guk guk`;\n  }\n}\n\nconst kucing = new Kucing(\'Kitty\');\nconsole.log(kucing.makan());     // (diwarisi) Kitty sedang makan\nconsole.log(kucing.bersuara());  // (override) Kitty berkata meong',
                        '```',
                        '---',

                        '### Kata Kunci Penting dalam Inheritance',
                        'table:[{"Istilah":"extends","Fungsi":"Menyatakan sebuah class mewarisi class lain"},{"Istilah":"super()","Fungsi":"Memanggil constructor dari class induk"},{"Istilah":"Override","Fungsi":"Menimpa ulang implementasi method dari class induk"},{"Istilah":"Single Inheritance","Fungsi":"Satu subclass hanya boleh punya satu superclass langsung"}]',
                        '---',

                        '### Memanggil Constructor Induk dengan super()',
                        'skill:100%:super(argumen) — Wajib dipanggil sebelum akses this di constructor subclass.:Aturan',
                        'skill:90%:super.method() — Memanggil versi method milik class induk dari dalam subclass.:Aturan',
                        '---',

                        '### Kapan Menggunakan Inheritance',
                        'card:Gunakan Jika:Ada hubungan is-a yang jelas dan class turunan benar-benar merupakan "jenis khusus" dari class induk.',
                        'card:Hindari Jika:Hubungannya hanya "kebetulan mirip" — pertimbangkan composition sebagai alternatif (dibahas Pertemuan 8).',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 06
                // -------------------------------------------------------------
                {
                    id: 'pbo06',
                    title: 'Pertemuan 6: Polymorphism (Polimorfisme)',
                    lines: [
                        'Polimorfisme berarti "banyak bentuk" — satu perintah yang sama, hasilnya berbeda tergantung objek yang menjalankannya.',
                        '---',

                        '### Konsep Polymorphism',
                        '**Point** — Polimorfisme memungkinkan objek dari class berbeda merespons pemanggilan method yang sama dengan cara masing-masing.',
                        '**Reason** — Tanpa polimorfisme, kode harus memakai banyak percabangan if/else untuk membedakan tiap jenis objek — sulit dikembangkan.',
                        '**Example** — Memanggil `bentuk.luas()` pada `Persegi`, `Lingkaran`, dan `Segitiga` masing-masing menghasilkan rumus luas berbeda, tanpa if/else di kode pemanggil.',
                        '**Penegasan** — Polimorfisme membuat kode terbuka untuk ekstensi (Open/Closed Principle) — tambah class baru tanpa mengubah kode lama.',
                        '---',

                        '### Dua Jenis Polymorphism',
                        'table:[{"Jenis":"Runtime Polymorphism","Mekanisme":"Method overriding, ditentukan saat program berjalan"},{"Jenis":"Compile-time Polymorphism","Mekanisme":"Method overloading, ditentukan saat kompilasi (terbatas di JS)"}]',
                        '---',

                        '### Contoh Polymorphism Lewat Method Overriding',
                        '```javascript',
                        'class Bentuk {\n  luas() {\n    return 0; // default, akan di-override\n  }\n}\n\nclass Persegi extends Bentuk {\n  constructor(sisi) { super(); this.sisi = sisi; }\n  luas() { return this.sisi * this.sisi; }\n}\n\nclass Lingkaran extends Bentuk {\n  constructor(radius) { super(); this.radius = radius; }\n  luas() { return Math.PI * this.radius * this.radius; }\n}\n\nconst daftarBentuk = [new Persegi(4), new Lingkaran(3)];\n\n// Polymorphism: satu loop, method sama, hasil berbeda tiap objek\ndaftarBentuk.forEach(b => {\n  console.log(`Luas: ${b.luas().toFixed(2)}`);\n});\n// Luas: 16.00\n// Luas: 28.27',
                        '```',
                        '---',

                        '### Manfaat Polymorphism',
                        'skill:100%:Ekstensibilitas — Class baru mudah ditambahkan tanpa mengubah kode yang sudah ada.:Manfaat',
                        'skill:90%:Kode Lebih Sederhana — Hilangkan percabangan if/else berdasarkan tipe objek.:Manfaat',
                        'skill:85%:Konsistensi Antarmuka — Semua objek turunan wajib punya method yang sama.:Manfaat',
                        '---',

                        '### Latihan Konsep',
                        'card:Soal:Buat class Karyawan dengan method hitungGaji(), lalu turunkan menjadi Manajer dan Staff dengan rumus gaji berbeda.',
                        'card:Tantangan:Buat array campuran Manajer & Staff, lalu panggil hitungGaji() dalam satu loop yang sama.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 07
                // -------------------------------------------------------------
                {
                    id: 'pbo07',
                    title: 'Pertemuan 7: Abstract Class dan Interface',
                    lines: [
                        'Abstraksi adalah seni menyembunyikan kerumitan — menunjukkan apa yang perlu, menyembunyikan bagaimana caranya.',
                        '---',

                        '### Konsep Abstraction',
                        '**Point** — Abstraksi menyederhanakan sistem kompleks dengan hanya menampilkan fitur esensial dan menyembunyikan detail implementasi.',
                        '**Reason** — Pengguna sebuah class tidak perlu tahu bagaimana method bekerja secara internal — cukup tahu apa yang bisa dilakukan.',
                        '**Example** — Saat menyetir mobil, pengemudi hanya perlu tahu cara pakai setir & pedal — tidak perlu paham mekanisme mesin di baliknya.',
                        '**Penegasan** — Abstract class mendefinisikan "kontrak" — apa yang WAJIB diimplementasikan, tanpa menentukan caranya.',
                        '---',

                        '### Abstract Class vs Interface (Konsep)',
                        'table:[{"Aspek":"Instansiasi","Abstract Class":"Tidak bisa dibuat object langsung","Interface":"Hanya kontrak, tidak ada implementasi"},{"Aspek":"Implementasi Method","Abstract Class":"Bisa punya method konkret & abstrak","Interface":"Semua method wajib diimplementasikan oleh pengguna"},{"Aspek":"Relasi","Abstract Class":"is-a (subclass adalah jenis dari abstract class)","Interface":"can-do (class mampu melakukan kontrak ini)"}]',
                        '---',

                        '### Simulasi Abstract Class di JavaScript',
                        '```javascript',
                        'class Kendaraan {\n  constructor(nama) {\n    if (new.target === Kendaraan) {\n      throw new Error(\'Kendaraan adalah abstract class, tidak boleh diinstansiasi langsung\');\n    }\n    this.nama = nama;\n  }\n\n  bergerak() {\n    throw new Error(\'Method bergerak() wajib diimplementasikan subclass\');\n  }\n}\n\nclass Mobil extends Kendaraan {\n  bergerak() {\n    return `${this.nama} bergerak dengan roda`;\n  }\n}\n\nclass Pesawat extends Kendaraan {\n  bergerak() {\n    return `${this.nama} bergerak dengan terbang`;\n  }\n}\n\n// const k = new Kendaraan(\'X\'); // Error! abstract class\nconst mobil = new Mobil(\'Avanza\');\nconsole.log(mobil.bergerak()); // Avanza bergerak dengan roda',
                        '```',
                        '---',

                        '### Kapan Memakai Abstraksi',
                        'skill:95%:Ada beberapa subclass yang wajib punya perilaku serupa namun implementasi berbeda:Kondisi',
                        'skill:90%:Ingin memaksa "kontrak" agar subclass tidak lupa mengimplementasikan method penting:Kondisi',
                        '---',

                        '### Rangkuman',
                        'card:Inti Abstraksi:Fokus pada APA yang dilakukan objek, bukan BAGAIMANA cara kerjanya secara detail.',
                        'card:Hubungan dengan Polymorphism:Abstract method menjadi dasar polymorphism — tiap subclass mengisi "bagaimana"-nya sendiri.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 08
                // -------------------------------------------------------------
                {
                    id: 'pbo08',
                    title: 'Pertemuan 8: Composition vs Inheritance',
                    lines: [
                        '"Favor composition over inheritance" — salah satu prinsip desain OOP paling penting yang sering disalahpahami pemula.',
                        '---',

                        '### Composition — Alternatif Inheritance',
                        '**Point** — Composition membangun objek kompleks dengan menggabungkan (memiliki) objek-objek lain, bukan mewarisi dari class induk.',
                        '**Reason** — Inheritance yang berlebihan menciptakan hierarki class yang kaku dan rapuh — perubahan di induk bisa merusak banyak turunan.',
                        '**Example** — `Mobil` tidak "mewarisi" `Mesin`, melainkan "memiliki" `Mesin` sebagai bagian dari dirinya — hubungan has-a, bukan is-a.',
                        '**Penegasan** — Aturan praktis — gunakan inheritance untuk is-a, gunakan composition untuk has-a.',
                        '---',

                        '### Perbandingan Inheritance vs Composition',
                        'table:[{"Aspek":"Relasi","Inheritance":"is-a (Kucing IS-A Hewan)","Composition":"has-a (Mobil HAS-A Mesin)"},{"Aspek":"Fleksibilitas","Inheritance":"Kaku, terikat hierarki class saat compile-time","Composition":"Fleksibel, bisa diganti komponennya saat runtime"},{"Aspek":"Coupling","Inheritance":"Erat dengan class induk","Composition":"Longgar antar objek yang digabung"}]',
                        '---',

                        '### Contoh Composition',
                        '```javascript',
                        'class Mesin {\n  constructor(tenagaHp) { this.tenagaHp = tenagaHp; }\n  nyalakan() { return `Mesin ${this.tenagaHp}HP menyala`; }\n}\n\nclass SistemAudio {\n  putar(lagu) { return `Memutar lagu: ${lagu}`; }\n}\n\nclass Mobil {\n  constructor(merek, tenagaHp) {\n    this.merek = merek;\n    this.mesin = new Mesin(tenagaHp);      // HAS-A Mesin\n    this.audio = new SistemAudio();         // HAS-A SistemAudio\n  }\n\n  startMobil() {\n    return `${this.merek}: ${this.mesin.nyalakan()}`;\n  }\n}\n\nconst avanza = new Mobil(\'Avanza\', 120);\nconsole.log(avanza.startMobil());\nconsole.log(avanza.audio.putar(\'Lagu Favorit\'));',
                        '```',
                        '---',

                        '### Panduan Memilih',
                        'skill:100%:Gunakan Inheritance jika hubungan benar-benar is-a dan stabil sepanjang waktu:Panduan',
                        'skill:100%:Gunakan Composition jika objek hanya "memakai" kemampuan objek lain:Panduan',
                        'skill:85%:Composition umumnya lebih aman dari sisi maintainability jangka panjang:Panduan',
                        '---',

                        '### Rangkuman Bagian 2',
                        'card:4 Pilar OOP Lengkap:Encapsulation (P3), Inheritance (P5), Polymorphism (P6), dan Abstraction (P7) — plus prinsip Composition over Inheritance (P8).',
                        'card:Selanjutnya:Bagian 3 membahas Exception Handling dan Design Pattern yang sering dipakai di dunia kerja.',
                    ]
                },
            ]
        },

        // =====================================================================
        // BAGIAN 3: EXCEPTION HANDLING & DESIGN PATTERN
        // =====================================================================
        {
            name: 'Bagian 3: Exception Handling & Design Pattern',
            items: [

                // -------------------------------------------------------------
                // MODUL 09
                // -------------------------------------------------------------
                {
                    id: 'pbo09',
                    title: 'Pertemuan 9: Exception Handling dalam OOP',
                    lines: [
                        'Program yang baik bukan yang tidak pernah error — tapi yang tahu bagaimana menangani error dengan elegan.',
                        '---',

                        '### Konsep Exception Handling',
                        '**Point** — Exception adalah kondisi tidak normal yang terjadi saat program berjalan. Exception handling adalah mekanisme untuk menangkap dan meresponsnya tanpa membuat program crash.',
                        '**Reason** — Tanpa penanganan yang baik, satu error kecil (misal pembagian dengan nol) bisa menghentikan seluruh aplikasi.',
                        '**Example** — Saat memvalidasi input umur pengguna, sistem melempar exception jika nilainya negatif, lalu program menampilkan pesan ramah alih-alih crash.',
                        '**Penegasan** — Exception handling memisahkan "kode jalur normal" dari "kode penanganan error" — membuat logika utama tetap bersih.',
                        '---',

                        '### Blok try, catch, finally',
                        'table:[{"Blok":"try","Fungsi":"Menjalankan kode yang berpotensi menghasilkan error"},{"Blok":"catch","Fungsi":"Menangkap dan menangani error yang terjadi di blok try"},{"Blok":"finally","Fungsi":"Selalu dijalankan, baik ada error maupun tidak (misal untuk cleanup)"},{"Blok":"throw","Fungsi":"Melempar exception secara manual sesuai aturan bisnis"}]',
                        '---',

                        '### Custom Exception Class',
                        '```javascript',
                        'class SaldoTidakCukupError extends Error {\n  constructor(saldo, jumlahTarik) {\n    super(`Saldo ${saldo} tidak cukup untuk menarik ${jumlahTarik}`);\n    this.name = \'SaldoTidakCukupError\';\n    this.saldo = saldo;\n  }\n}\n\nclass Rekening {\n  #saldo = 100000;\n\n  tarik(jumlah) {\n    if (jumlah > this.#saldo) {\n      throw new SaldoTidakCukupError(this.#saldo, jumlah);\n    }\n    this.#saldo -= jumlah;\n    return this.#saldo;\n  }\n}\n\nconst rek = new Rekening();\ntry {\n  rek.tarik(500000);\n} catch (e) {\n  if (e instanceof SaldoTidakCukupError) {\n    console.log(`Ditolak: ${e.message}`);\n  }\n} finally {\n  console.log(\'Transaksi selesai diproses\');\n}',
                        '```',
                        '---',

                        '### Prinsip Exception Handling yang Baik',
                        'skill:100%:Tangkap exception spesifik, jangan menelan semua error secara diam-diam:Prinsip',
                        'skill:90%:Buat custom exception class agar error lebih deskriptif dan mudah dibedakan:Prinsip',
                        'skill:85%:Gunakan finally untuk membersihkan resource (koneksi, file, dsb):Prinsip',
                        '---',

                        '### Latihan Konsep',
                        'card:Soal:Buat class Pembagi dengan method bagi(a, b) yang melempar custom exception PembagianNolError jika b sama dengan nol.',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 10
                // -------------------------------------------------------------
                {
                    id: 'pbo10',
                    title: 'Pertemuan 10: Design Pattern — Singleton & Factory',
                    lines: [
                        'Design pattern adalah "resep" solusi yang teruji untuk masalah desain yang berulang di dunia software.',
                        '---',

                        '### Apa Itu Design Pattern?',
                        '**Point** — Design pattern adalah solusi umum dan teruji untuk masalah desain yang sering muncul berulang dalam pengembangan software berorientasi objek.',
                        '**Reason** — Tanpa pattern, tiap tim cenderung menemukan solusi sendiri-sendiri untuk masalah yang sama — sulit dikomunikasikan antar developer.',
                        '**Example** — Ketika semua developer paham istilah "Singleton", cukup sebut nama pattern-nya tanpa perlu menjelaskan detail implementasinya dari nol.',
                        '**Penegasan** — Design pattern bukan kode siap pakai — ia adalah template pemikiran yang diterapkan sesuai konteks masing-masing.',
                        '---',

                        '### Singleton Pattern',
                        'card:Masalah:Kadang kita butuh memastikan hanya ada SATU instance dari sebuah class di seluruh aplikasi, misal koneksi database.',
                        'card:Solusi:Class menyimpan instance-nya sendiri secara statis dan mengembalikan instance yang sama setiap kali diminta.',
                        '---',

                        '### Implementasi Singleton',
                        '```javascript',
                        'class KoneksiDatabase {\n  static #instance = null;\n\n  constructor() {\n    if (KoneksiDatabase.#instance) {\n      throw new Error(\'Gunakan getInstance(), jangan new langsung\');\n    }\n    this.status = \'terhubung\';\n  }\n\n  static getInstance() {\n    if (!KoneksiDatabase.#instance) {\n      KoneksiDatabase.#instance = new KoneksiDatabase();\n    }\n    return KoneksiDatabase.#instance;\n  }\n}\n\nconst db1 = KoneksiDatabase.getInstance();\nconst db2 = KoneksiDatabase.getInstance();\nconsole.log(db1 === db2); // true - objek yang sama persis',
                        '```',
                        '---',

                        '### Factory Pattern',
                        '**Point** — Factory pattern menyediakan satu method terpusat untuk membuat objek, tanpa kode pemanggil perlu tahu class konkret mana yang dibuat.',
                        '**Reason** — Tanpa factory, kode pemanggil harus tahu detail setiap class dan logic `new` tersebar di banyak tempat — sulit diubah.',
                        '**Example** — `BentukFactory.buat("lingkaran")` mengembalikan object Lingkaran tanpa kode pemanggil menulis `new Lingkaran()` secara langsung.',
                        '---',

                        '### Implementasi Factory',
                        '```javascript',
                        'class Lingkaran { luas(r) { return Math.PI * r * r; } }\nclass Persegi { luas(s) { return s * s; } }\n\nclass BentukFactory {\n  static buat(jenis) {\n    switch (jenis) {\n      case \'lingkaran\': return new Lingkaran();\n      case \'persegi\':   return new Persegi();\n      default: throw new Error(\'Jenis bentuk tidak dikenal\');\n    }\n  }\n}\n\nconst bentuk = BentukFactory.buat(\'lingkaran\');\nconsole.log(bentuk.luas(5).toFixed(2)); // 78.54',
                        '```',
                        '---',

                        '### Kapan Memakai Singleton vs Factory',
                        'skill:100%:Singleton — Saat resource harus benar-benar satu di seluruh aplikasi (koneksi, konfigurasi global):Kondisi',
                        'skill:100%:Factory — Saat pembuatan objek bergantung kondisi/parameter dan ingin disentralisasi:Kondisi',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 11
                // -------------------------------------------------------------
                {
                    id: 'pbo11',
                    title: 'Pertemuan 11: Design Pattern — Observer & Strategy',
                    lines: [
                        'Dua pattern ini menjawab pertanyaan sama — bagaimana membuat sistem fleksibel terhadap perubahan tanpa mengubah kode inti.',
                        '---',

                        '### Observer Pattern',
                        '**Point** — Observer pattern mendefinisikan hubungan satu-ke-banyak, di mana perubahan pada satu objek (subject) otomatis memberi tahu semua objek yang "berlangganan" (observer).',
                        '**Reason** — Tanpa pattern ini, subject harus tahu detail semua objek yang perlu diberi tahu — coupling menjadi sangat erat.',
                        '**Example** — Sistem notifikasi — saat `stok.update()` dipanggil, semua `Pelanggan` yang berlangganan otomatis menerima notifikasi tanpa stok tahu siapa saja pelanggannya secara detail.',
                        '---',

                        '### Implementasi Observer',
                        '```javascript',
                        'class Subject {\n  #observers = [];\n\n  subscribe(observer) { this.#observers.push(observer); }\n\n  notifyAll(data) {\n    this.#observers.forEach(obs => obs.update(data));\n  }\n}\n\nclass Pelanggan {\n  constructor(nama) { this.nama = nama; }\n  update(data) { console.log(`${this.nama} menerima notifikasi - ${data}`); }\n}\n\nconst stokBarang = new Subject();\nstokBarang.subscribe(new Pelanggan(\'Andi\'));\nstokBarang.subscribe(new Pelanggan(\'Budi\'));\nstokBarang.notifyAll(\'Stok baju XL tersedia lagi\');',
                        '```',
                        '---',

                        '### Strategy Pattern',
                        '**Point** — Strategy pattern memungkinkan sebuah algoritma dipilih dan ditukar saat runtime, tanpa mengubah kode class yang memakainya.',
                        '**Reason** — Tanpa pattern ini, penambahan algoritma baru (misal metode pembayaran baru) memaksa perubahan langsung pada kode inti — melanggar Open/Closed Principle.',
                        '**Example** — Sistem checkout mendukung `BayarQris`, `BayarTransfer`, `BayarTunai` sebagai strategi yang bisa dipasang-lepas tanpa mengubah class Checkout.',
                        '---',

                        '### Implementasi Strategy',
                        '```javascript',
                        'class BayarQris { proses(total) { return `Bayar ${total} via QRIS`; } }\nclass BayarTransfer { proses(total) { return `Bayar ${total} via Transfer Bank`; } }\n\nclass Checkout {\n  constructor(strategiBayar) {\n    this.strategiBayar = strategiBayar; // strategi bisa diganti kapan saja\n  }\n\n  bayar(total) {\n    return this.strategiBayar.proses(total);\n  }\n}\n\nconst checkout = new Checkout(new BayarQris());\nconsole.log(checkout.bayar(150000)); // Bayar 150000 via QRIS\n\ncheckout.strategiBayar = new BayarTransfer(); // ganti strategi saat runtime\nconsole.log(checkout.bayar(150000)); // Bayar 150000 via Transfer Bank',
                        '```',
                        '---',

                        '### Perbandingan Singkat',
                        'table:[{"Pattern":"Singleton","Tujuan":"Memastikan satu instance saja di seluruh aplikasi"},{"Pattern":"Factory","Tujuan":"Sentralisasi & sembunyikan logika pembuatan objek"},{"Pattern":"Observer","Tujuan":"Notifikasi otomatis satu-ke-banyak saat state berubah"},{"Pattern":"Strategy","Tujuan":"Menukar algoritma/perilaku secara fleksibel saat runtime"}]',
                    ]
                },

                // -------------------------------------------------------------
                // MODUL 12 — UAS
                // -------------------------------------------------------------
                {
                    id: 'pbo12',
                    title: 'Pertemuan 12: Studi Kasus & Evaluasi Akhir (UAS)',
                    lines: [
                        'Saatnya menggabungkan seluruh pilar OOP dan design pattern ke dalam satu studi kasus yang utuh.',
                        '---',

                        '### Fokus Materi UAS',
                        'card:Fondasi OOP:Class, Object, Encapsulation, Constructor, dan Method — dasar yang wajib dikuasai sebelum lanjut ke topik lanjutan.',
                        'card:4 Pilar OOP:Encapsulation, Inheritance, Polymorphism, dan Abstraction — konsep inti yang diuji lewat studi kasus.',
                        'card:Design Pattern:Singleton, Factory, Observer, dan Strategy — penerapan OOP dalam masalah desain nyata.',
                        '---',

                        '### Studi Kasus Terintegrasi: Sistem Perpustakaan',
                        '```javascript',
                        'class Buku {\n  constructor(judul, penulis) {\n    this.judul = judul;\n    this.penulis = penulis;\n    this.dipinjam = false;\n  }\n}\n\nclass Anggota {\n  #bukuDipinjam = [];\n\n  constructor(nama) { this.nama = nama; }\n\n  pinjam(buku) {\n    if (buku.dipinjam) return `${buku.judul} sedang dipinjam orang lain`;\n    buku.dipinjam = true;\n    this.#bukuDipinjam.push(buku);\n    return `${this.nama} meminjam ${buku.judul}`;\n  }\n\n  daftarPinjaman() {\n    return this.#bukuDipinjam.map(b => b.judul);\n  }\n}\n\nclass Perpustakaan {\n  static #instance;\n  #koleksi = [];\n\n  static getInstance() {\n    if (!Perpustakaan.#instance) Perpustakaan.#instance = new Perpustakaan();\n    return Perpustakaan.#instance;\n  }\n\n  tambahBuku(buku) { this.#koleksi.push(buku); }\n  cariBuku(judul) { return this.#koleksi.find(b => b.judul === judul); }\n}\n\nconst perpus = Perpustakaan.getInstance(); // Singleton\nperpus.tambahBuku(new Buku(\'Clean Code\', \'Robert C. Martin\'));\n\nconst andi = new Anggota(\'Andi\');\nconsole.log(andi.pinjam(perpus.cariBuku(\'Clean Code\')));',
                        '```',
                        '---',

                        '### Checklist Kesiapan UAS',
                        'skill:100%:Mampu membuat class dengan encapsulation yang benar (private field, getter/setter):Wajib Kuasai',
                        'skill:95%:Mampu menerapkan inheritance & override method secara tepat:Sangat Penting',
                        'skill:90%:Mampu menjelaskan dan menerapkan polymorphism dalam studi kasus:Sangat Penting',
                        'skill:85%:Mampu memilih design pattern yang sesuai untuk sebuah masalah desain:Kritikal',
                        '---',

                        '### Pertanyaan Latihan Komprehensif',
                        'table:[{"No":"1","Soal":"Rancang class Karyawan, Manajer, dan Staff dengan inheritance dan override method hitungGaji()."},{"No":"2","Soal":"Jelaskan kapan sebaiknya memakai composition dibanding inheritance, berikan contoh kasus konkret."},{"No":"3","Soal":"Implementasikan custom exception untuk validasi umur pengguna (harus antara 0-150 tahun)."},{"No":"4","Soal":"Rancang sistem logging yang hanya boleh punya satu instance di seluruh aplikasi menggunakan pattern yang sesuai."},{"No":"5","Soal":"Bandingkan Observer dan Strategy pattern - kapan masing-masing lebih tepat digunakan?"}]',
                    ]
                },
            ]
        },
    ]
};
