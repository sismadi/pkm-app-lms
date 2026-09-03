pages.certificates = {
    'SLS-2026-001': {
        name: 'Wawan Sismadi',
        exam: 'Fundamental Cybersecurity',
        score: '98/100',
        date: '19 April 2026'
    },
    'SLS-2026-002': {
        name: 'Budi Santoso',
        exam: 'Fundamental Cybersecurity',
        score: '95/100',
        date: '19 April 2026'
    },
    'SLS-2026-003': {
        name: 'Ani Wijaya',
        exam: 'Web Development dengan DonatJS',
        score: '100/100',
        date: '20 April 2026'
    }
};

pages.cert = [

    {
        section: 'titleHero',
        title: 'Verifikasi Sertifikat'
    },
    {
        section: 'article',
        layout: 'split',
        leftCol: {
            subtitle: 'Cek Kredensial',
            lines: [
              'Gunakan form di samping untuk melakukan validasi sertifikat pelatihan.',
              'kredensial:**SLS-2026-001**.',

                '---',
                '### Mengapa Verifikasi?',
                'Menjamin keaslian dokumen yang diterbitkan oleh PT SLS.'
            ]
        },
        rightCol: {
            subtitle: 'Validasi',
            lines: ['form:validate-cert']
        }
    }
];
