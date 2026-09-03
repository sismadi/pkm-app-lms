pages.kuis= [

        {
            section: 'titleHero',
            title: 'Evaluasi Kompetensi:<br>Rekayasa Perangkat Lunak'
        },
        {
            section: 'article',
            layout: 'split',
            leftCol: {
                subtitle: 'Informasi Ujian',
                lines: [
                    '**Status:** Tersedia (Unit 1)',
                    '**Materi:** Rekayasa Perangkat Lunak',
                    '**Passing Grade:** 75%',
                    '---',
                    '### Instruksi:',
                    'Password:**DonatJS**.',
                    '1. Selesaikan setiap persamaan dengan teliti.',
                    '2. Pilih jawaban yang paling tepat dari opsi yang tersedia.',
                    '3. Gunakan kertas coretan jika diperlukan untuk perhitungan.'
                ]
            },
            rightCol: {
                subtitle: 'Akses Ujian',
                lines: ['form:quiz'],
                startTime: '2026-05-12T08:00:00',
                password: 'DonatJS',
                questions: [
                    {
                        q: 'Berapakah nilai x dari persamaan 2x + 5 = 13?',
                        options: ['3', '4', '6', '8'],
                        ans: btoa('4')
                    },
                    {
                        q: 'Jika 3(x - 2) = x + 10, maka nilai x adalah...',
                        options: ['4', '6', '8', '10'],
                        ans: btoa('8')
                    },
                    {
                        q: 'Tentukan penyelesaian dari persamaan 5x - 7 = 2x + 8.',
                        options: ['3', '5', '15', '2'],
                        ans: btoa('5')
                    },
                    {
                        q: 'Himpunan penyelesaian dari 1/2 x + 4 = 10 adalah...',
                        options: ['3', '6', '12', '14'],
                        ans: btoa('12')
                    },
                    {
                        q: 'Nilai y yang memenuhi persamaan 4y - 10 = 2y + 6 adalah...',
                        options: ['4', '8', '12', '16'],
                        ans: btoa('8')
                    },
                    {
                        q: 'Manakah di bawah ini yang merupakan persamaan linear satu variabel?',
                        options: ['x + y = 5', '2x^2 + 3 = 11', '3x - 4 = 2', 'x/y = 10'],
                        ans: btoa('3x - 4 = 2')
                    },
                    {
                        q: 'Jika x + 5 = -2, maka nilai x + 10 adalah...',
                        options: ['3', '5', '7', '-7'],
                        ans: btoa('3')
                    },
                    {
                        q: 'Selesaikan persamaan linear: 0.5x - 2 = 1.',
                        options: ['2', '4', '6', '1.5'],
                        ans: btoa('6')
                    },
                    {
                        q: 'Berapakah nilai x jika 2/3 x = 12?',
                        options: ['8', '18', '24', '36'],
                        ans: btoa('18')
                    },
                    {
                        q: 'Jika harga 3 buku adalah Rp 15.000, model persamaan linear yang tepat untuk harga 1 buku (x) adalah...',
                        options: ['x + 3 = 15.000', '3x = 15.000', 'x/3 = 15.000', '15.000x = 3'],
                        ans: btoa('3x = 15.000')
                    }
                ]
            }
        }

    ];
