// Soal PEMAHAMAN KONSEP per misi — bagian 2 (jembatan, angin, listrik, magnet, pesawat, optik). Format: lihat konsep-bagian-1.js
module.exports = {
  jembatan: {
    kisi: [[1, 'C2', 'Membedakan gaya tekan dan gaya tarik'], [1, 'C3', 'Menentukan batang yang tertekan dan tertarik pada jembatan yang dibebani'], [2, 'C2', 'Menjelaskan alasan rangka jembatan berbentuk segitiga'], [2, 'C4', 'Menganalisis penyebab batang tekan menekuk dan cara memperbaikinya']],
    A: [
      { soal: 'Gaya tekan pada sebuah batang membuat batang itu cenderung …',
        opsi: ['memendek karena kedua ujungnya didorong ke arah dalam', 'memanjang karena kedua ujungnya ditarik ke arah luar', 'berputar karena salah satu ujungnya ditahan dengan kuat', 'bergeser ke samping karena sambungannya mudah terlepas'],
        bahas: 'Gaya tekan mendorong batang sehingga cenderung memendek; gaya tarik menarik batang sehingga memanjang.' },
      { soal: 'Sebuah jembatan rangka dibebani di tengah. Bagian yang tertarik adalah …',
        opsi: ['batang bawah, karena meregang ketika jembatan melengkung', 'batang atas, karena melengkung masuk ketika dibebani', 'tumpuan, karena menahan seluruh berat jembatan dan beban', 'tidak ada, karena seluruh batang hanya mengalami tekanan'],
        bahas: 'Saat melengkung ke bawah, sisi atas tertekan dan sisi bawah meregang (tertarik).' },
      { soal: 'Rangka jembatan dibuat dari susunan segitiga karena segitiga …',
        opsi: ['tidak berubah bentuk selama panjang sisi-sisinya tetap', 'memerlukan stik paling banyak sehingga menjadi lebih berat', 'membuat gaya tekan pada setiap batang hilang seluruhnya', 'mudah dilipat sehingga jembatan dapat dipindahkan'],
        bahas: 'Persegi berengsel bisa berubah menjadi jajar genjang, sedangkan segitiga kaku selama sisinya tidak berubah panjang.' },
      { soal: 'Batang atas jembatan stik tampak melengkung lalu patah, padahal lemnya masih kuat. Perbaikan paling tepat adalah …',
        opsi: ['menumpuk beberapa stik yang direkatkan agar batang lebih kaku', 'memperpanjang batang atas agar gaya tekannya tersebar luas', 'mengganti lem batang atas dengan lem yang lebih encer', 'mengurangi jumlah segitiga agar jembatan menjadi lebih ringan'],
        bahas: 'Batang tekan yang tipis mudah menekuk; tumpukan stik yang direkatkan membuatnya lebih kaku.' }
    ],
    B: [
      { soal: 'Tali jemuran yang ditarik di kedua ujungnya oleh tiang mengalami …',
        opsi: ['gaya tarik, sehingga tali cenderung memanjang', 'gaya tekan, sehingga tali cenderung memendek', 'gaya geser, sehingga tali cenderung berputar', 'tidak ada gaya, karena tali diam di tempatnya'],
        bahas: 'Tali hanya dapat menahan gaya tarik; kedua ujungnya ditarik sehingga cenderung memanjang.' },
      { soal: 'Penggaris kayu ditumpu kedua ujungnya lalu ditekan di tengah. Bagian yang tertekan adalah …',
        opsi: ['sisi atas, karena melengkung ke dalam saat ditekan', 'sisi bawah, karena meregang ketika penggaris melengkung', 'kedua ujung, karena menjadi tempat tumpuan penggaris', 'seluruh penggaris tertarik secara merata ke bawah'],
        bahas: 'Saat melengkung ke bawah, sisi atas memendek (tertekan) dan sisi bawah memanjang (tertarik).' },
      { soal: 'Empat stik disambung berbentuk persegi dengan paku di sudutnya. Agar tidak mudah miring, sebaiknya …',
        opsi: ['ditambah satu stik diagonal sehingga membentuk segitiga', 'ditambah lem di setiap sudut tanpa menambah stik lagi', 'dibuat lebih tinggi sehingga bentuknya persegi panjang', 'paku sudutnya dilepas agar rangka dapat menyesuaikan diri'],
        bahas: 'Batang diagonal membagi persegi menjadi dua segitiga yang kaku.' },
      { soal: 'Dua jembatan sama, hanya tinggi rangkanya berbeda. Rangka yang lebih tinggi menahan beban lebih besar karena …',
        opsi: ['gaya pada batang atas dan bawah menjadi lebih kecil', 'batang miringnya menjadi lebih pendek dan lebih ringan', 'beban yang diletakkan di tengah ikut menjadi lebih ringan', 'jembatan yang tinggi tidak lagi mengalami gaya tekan'],
        bahas: 'Gaya pada batang atas/bawah ≈ momen ÷ tinggi rangka; makin tinggi rangka, makin kecil gayanya (asal tidak terpuntir ke samping).' }
    ]
  },

  angin: {
    kisi: [[1, 'C2', 'Menjelaskan urutan perubahan energi pada kincir angin'], [1, 'C2', 'Menjelaskan prinsip induksi elektromagnetik pada generator'], [2, 'C3', 'Menerapkan rumus daya angin untuk perubahan kecepatan angin'], [2, 'C4', 'Menganalisis alasan energi listrik lebih kecil daripada energi angin']],
    A: [
      { soal: 'Urutan perubahan energi pada pembangkit listrik tenaga angin yang menyalakan lampu adalah …',
        opsi: ['kinetik angin → gerak putar → listrik → cahaya', 'listrik → gerak putar → kinetik angin → cahaya', 'cahaya → listrik → gerak putar → kinetik angin', 'kinetik angin → cahaya → listrik → gerak putar'],
        bahas: 'Angin memutar bilah (gerak), generator menghasilkan listrik, lampu mengubahnya menjadi cahaya.' },
      { soal: 'Generator pada kincir menghasilkan listrik karena …',
        opsi: ['magnet yang berputar di dekat kumparan menimbulkan arus', 'bilah yang bergesekan dengan udara menghasilkan muatan', 'angin membawa muatan listrik dari laut ke dalam kawat', 'kumparan menyimpan listrik dari matahari pada siang hari'],
        bahas: 'Induksi elektromagnetik: perubahan medan magnet di sekitar kumparan menimbulkan arus listrik.' },
      { soal: 'Daya angin sebanding dengan v³. Jika kecepatan angin naik dari 2 m/s menjadi 4 m/s, daya angin menjadi …',
        opsi: ['8 kali semula', '2 kali semula', '4 kali semula', '16 kali semula'],
        bahas: 'Kecepatan 2×, daya 2³ = 8×.' },
      { soal: 'Kincir menerima energi angin 100 J tiap detik, tetapi lampunya hanya mendapat 20 J tiap detik. Penjelasan yang tepat adalah …',
        opsi: ['sebagian energi berubah menjadi panas dan bunyi karena gesekan', 'energi angin sebagian besar hilang musnah tanpa berubah bentuk', 'lampu menyimpan energi sisanya untuk dipakai pada malam hari', 'generator menciptakan energi baru yang lebih kecil dari angin'],
        bahas: 'Energi tidak musnah; sebagian berubah menjadi panas dan bunyi, dan sebagian angin lolos (batas Betz).' }
    ],
    B: [
      { soal: 'Pada lampu sepeda dinamo, energi yang diubah menjadi energi listrik adalah …',
        opsi: ['energi gerak putar roda sepeda', 'energi cahaya dari lampu sepeda', 'energi kimia di dalam baterai', 'energi bunyi dari putaran roda'],
        bahas: 'Dinamo mengubah energi gerak (putaran roda) menjadi listrik, lalu lampu mengubahnya menjadi cahaya.' },
      { soal: 'Agar generator kincir menghasilkan tegangan lebih besar, cara yang tepat adalah …',
        opsi: ['membuat magnet berputar lebih cepat di dekat kumparan', 'mengganti kumparan tembaga dengan kumparan plastik', 'menghentikan putaran magnet supaya medannya tetap', 'menjauhkan magnet dari kumparan agar tidak tergesek'],
        bahas: 'Makin cepat perubahan medan magnet (putaran lebih cepat), makin besar tegangan induksi.' },
      { soal: 'Luas sapuan bilah sebanding dengan r². Jika jari-jari bilah diperpanjang dari 0,5 m menjadi 1 m, daya angin yang tertangkap menjadi …',
        opsi: ['4 kali semula', '2 kali semula', '8 kali semula', 'tetap sama'],
        bahas: 'r 2× → luas 2² = 4× → daya angin 4× (pada kecepatan angin sama).' },
      { soal: 'Pernyataan yang sesuai dengan hukum kekekalan energi pada kincir angin adalah …',
        opsi: ['energi angin berubah bentuk, sebagian menjadi panas dan bunyi', 'kincir yang baik dapat menghasilkan energi lebih besar dari angin', 'energi angin habis musnah ketika memutar bilah kincir', 'energi listrik yang dihasilkan selalu sama dengan energi angin'],
        bahas: 'Energi tidak diciptakan atau dimusnahkan, hanya berubah bentuk; selalu ada yang menjadi panas dan bunyi.' }
    ]
  },

  listrik: {
    kisi: [[1, 'C3', 'Menghitung arus listrik dengan Hukum Ohm'], [1, 'C2', 'Menjelaskan fungsi resistor pembatas pada LED'], [2, 'C2', 'Membedakan sifat rangkaian seri dan paralel'], [2, 'C3', 'Menghitung tegangan baterai seri dan lama nyala lampu']],
    A: [
      { soal: 'Tegangan 6 V dihubungkan ke hambatan 300 Ω. Kuat arus yang mengalir adalah …',
        opsi: ['20 mA', '50 mA', '1.800 mA', '2 mA'],
        bahas: 'I = V ÷ R = 6 ÷ 300 = 0,02 A = 20 mA.' },
      { soal: 'Resistor pembatas dipasang seri dengan LED agar …',
        opsi: ['arus LED tidak melebihi batasnya sehingga LED tidak putus', 'tegangan baterai naik sehingga LED menyala lebih terang', 'arus dapat mengalir walaupun rangkaian dalam keadaan terbuka', 'LED dapat menyala tanpa memerlukan baterai sama sekali'],
        bahas: 'Hambatan yang lebih besar memperkecil arus (V = I × R) sehingga arus LED tetap aman.' },
      { soal: 'Dua lampu dirangkai paralel. Jika satu lampu dicabut, lampu lainnya …',
        opsi: ['tetap menyala karena berada pada cabang tersendiri', 'ikut padam karena jalur arusnya menjadi terputus', 'menyala dua kali lebih terang karena mendapat arus ganda', 'berkedip-kedip karena tegangannya terbagi dua'],
        bahas: 'Pada rangkaian paralel setiap lampu punya cabang sendiri; tegangannya tetap sama.' },
      { soal: 'Empat baterai AA (1,5 V) disusun seri dan dipakai lampu berarus 200 mA. Kapasitas baterai 2.000 mAh. Tegangan dan lama nyalanya …',
        opsi: ['6 V dan ± 10 jam', '1,5 V dan ± 40 jam', '6 V dan ± 2,5 jam', '1,5 V dan ± 10 jam'],
        bahas: 'Seri: 4 × 1,5 = 6 V. Lama nyala ≈ 2.000 mAh ÷ 200 mA = 10 jam.' }
    ],
    B: [
      { soal: 'Sebuah LED dialiri arus 25 mA dengan resistor 120 Ω. Tegangan pada resistor adalah …',
        opsi: ['3 V', '4,8 V', '0,3 V', '30 V'],
        bahas: 'V = I × R = 0,025 × 120 = 3 V.' },
      { soal: 'Jika hambatan dalam suatu rangkaian diperbesar sedangkan tegangannya tetap, maka arus listriknya …',
        opsi: ['mengecil, karena arus berbanding terbalik dengan hambatan', 'membesar, karena hambatan yang besar mendorong arus lebih kuat', 'tetap sama, karena arus hanya bergantung pada jenis baterai', 'menjadi nol, karena hambatan selalu menghentikan arus listrik'],
        bahas: 'Menurut V = I × R, pada V tetap, R lebih besar → I lebih kecil.' },
      { soal: 'Tiga lampu dirangkai seri dengan baterai. Salah satu lampu putus. Yang terjadi adalah …',
        opsi: ['semua lampu padam karena jalur arusnya terputus', 'dua lampu lain menyala lebih terang dari sebelumnya', 'hanya lampu yang putus saja yang ikut padam', 'lampu lain tetap menyala dengan terang yang sama'],
        bahas: 'Rangkaian seri hanya punya satu jalur; satu bagian putus memutus arus ke semua lampu.' },
      { soal: 'Dua baterai 1,5 V disusun seri untuk lampu 100 mA. Kapasitas baterai 2.000 mAh. Tegangan dan lama nyalanya …',
        opsi: ['3 V dan ± 20 jam', '1,5 V dan ± 20 jam', '3 V dan ± 10 jam', '1,5 V dan ± 40 jam'],
        bahas: 'Seri: 2 × 1,5 = 3 V. Lama nyala ≈ 2.000 ÷ 100 = 20 jam.' }
    ]
  },

  magnet: {
    kisi: [[1, 'C2', 'Mengelompokkan bahan magnetik dan nonmagnetik'], [1, 'C2', 'Menjelaskan sifat kutub magnet'], [2, 'C3', 'Menentukan cara memperkuat elektromagnet'], [2, 'C4', 'Menganalisis pemilihan inti besi lunak dan baja pada elektromagnet']],
    A: [
      { soal: 'Kelompok benda yang semuanya ditarik magnet adalah …',
        opsi: ['paku besi, jarum baja, dan koin nikel', 'paku besi, kaleng aluminium, dan sendok', 'kawat tembaga, jarum baja, dan karet', 'kaleng aluminium, kawat tembaga, dan kayu'],
        bahas: 'Besi, baja, nikel, dan kobalt adalah bahan magnetik; aluminium dan tembaga tidak ditarik magnet.' },
      { soal: 'Dua magnet batang didekatkan dengan kutub utara berhadapan dengan kutub utara. Yang terjadi adalah …',
        opsi: ['tolak-menolak, karena kutubnya sejenis', 'tarik-menarik, karena kutubnya sejenis', 'tidak terjadi apa-apa, karena kutubnya sama', 'tarik-menarik, karena keduanya magnet batang'],
        bahas: 'Kutub sejenis tolak-menolak; kutub berbeda tarik-menarik.' },
      { soal: 'Cara yang tepat untuk memperkuat elektromagnet adalah …',
        opsi: ['menambah jumlah lilitan kawat pada kumparan', 'mengganti inti besi dengan inti dari kayu', 'mengurangi jumlah baterai yang dipasang seri', 'memakai kawat berlapis plastik tanpa arus listrik'],
        bahas: 'Elektromagnet makin kuat bila lilitan, arus, atau inti besinya ditambah.' },
      { soal: 'Derek pemilah sampah harus melepas paku ketika arus dimatikan. Inti yang paling tepat adalah …',
        opsi: ['besi lunak, karena mudah kehilangan sifat magnetnya', 'baja keras, karena tetap menjadi magnet tanpa arus', 'aluminium, karena paling kuat menarik paku besi', 'tembaga, karena paling mudah dilalui arus listrik'],
        bahas: 'Besi lunak menjadi magnet saat ada arus dan mudah kehilangan kemagnetannya saat arus dimatikan.' }
    ],
    B: [
      { soal: 'Magnet dapat dipakai untuk memisahkan kaleng besi dari kaleng aluminium karena …',
        opsi: ['besi bahan magnetik, sedangkan aluminium bukan', 'aluminium lebih berat daripada kaleng besi', 'besi tidak dapat ditarik oleh magnet sama sekali', 'aluminium bermuatan listrik sehingga menjauh'],
        bahas: 'Aluminium termasuk bahan nonmagnetik walaupun logam, sehingga tidak ditarik magnet.' },
      { soal: 'Jarum kompas selalu menunjuk arah utara–selatan karena …',
        opsi: ['Bumi berperilaku seperti magnet raksasa', 'jarum kompas tertarik oleh cahaya matahari', 'angin selalu bertiup dari arah selatan', 'jarum kompas terbuat dari bahan aluminium'],
        bahas: 'Bumi memiliki medan magnet; jarum magnet kompas menyesuaikan diri dengan medan itu.' },
      { soal: 'Elektromagnet A memakai 50 lilitan, elektromagnet B memakai 150 lilitan dengan inti dan arus sama. Pernyataan yang tepat adalah …',
        opsi: ['B lebih kuat karena lilitannya lebih banyak', 'A lebih kuat karena kawatnya lebih pendek', 'keduanya sama kuat karena intinya sama', 'B lebih lemah karena kawatnya lebih berat'],
        bahas: 'Pada arus dan inti yang sama, lilitan lebih banyak menghasilkan medan magnet lebih kuat.' },
      { soal: 'Setelah arus dimatikan, paku tetap menempel pada inti elektromagnet. Penyebab yang paling mungkin adalah …',
        opsi: ['inti terbuat dari baja yang menyimpan sifat magnet', 'inti terbuat dari besi lunak yang mudah kehilangan magnet', 'jumlah lilitan terlalu sedikit sehingga magnetnya lemah', 'baterai sudah habis sehingga arus tidak lagi mengalir'],
        bahas: 'Baja sulit kehilangan kemagnetan (menjadi magnet tetap), sehingga paku tetap menempel.' }
    ]
  },

  pesawat: {
    kisi: [[1, 'C3', 'Menghitung gaya kuasa pada tuas'], [1, 'C2', 'Menentukan keuntungan mekanis katrol tetap, bebas, dan takal'], [2, 'C3', 'Menghitung usaha untuk mengangkat beban'], [2, 'C4', 'Menganalisis hubungan gaya kuasa dan jarak tarik pada pesawat sederhana']],
    A: [
      { soal: 'Beban 600 N diletakkan 0,5 m dari titik tumpu tuas. Lengan kuasanya 1,5 m. Gaya kuasa yang dibutuhkan adalah …',
        opsi: ['200 N', '1.800 N', '600 N', '300 N'],
        bahas: 'Kuasa = beban × lengan beban ÷ lengan kuasa = 600 × 0,5 ÷ 1,5 = 200 N.' },
      { soal: 'Keuntungan mekanis katrol bebas adalah …',
        opsi: ['2, karena beban ditopang dua bagian tali', '1, karena hanya mengubah arah gaya saja', '4, karena katrol bebas selalu digabung', '0,5, karena gaya kuasanya menjadi dua kali'],
        bahas: 'Katrol bebas ikut bergerak bersama beban dan ditopang dua bagian tali, KM = 2.' },
      { soal: 'Karung 60 kg (berat 600 N) diangkat ke gerobak setinggi 0,5 m. Usaha yang diperlukan adalah …',
        opsi: ['300 J', '1.200 J', '30 J', '600 J'],
        bahas: 'W = F × s = 600 × 0,5 = 300 J.' },
      { soal: 'Karung diangkat setinggi 0,5 m memakai takal ber-KM 4. Pernyataan yang tepat adalah …',
        opsi: ['gaya tarik menjadi ¼, tetapi tali ditarik ± 2 m', 'gaya tarik menjadi ¼ dan tali ditarik 0,5 m saja', 'usaha untuk mengangkat karung menjadi ¼ semula', 'gaya tarik menjadi 4 kali dan tali lebih pendek'],
        bahas: 'Pesawat sederhana tidak mengurangi usaha: gaya ¼ dibayar dengan jarak tarik 4 × 0,5 m = 2 m.' }
    ],
    B: [
      { soal: 'Tuas dengan lengan beban 0,2 m dan lengan kuasa 1 m dipakai mengangkat batu 500 N. Gaya kuasanya adalah …',
        opsi: ['100 N', '2.500 N', '500 N', '250 N'],
        bahas: 'Kuasa = 500 × 0,2 ÷ 1 = 100 N.' },
      { soal: 'Katrol pada sumur timba termasuk katrol tetap. Fungsinya adalah …',
        opsi: ['mengubah arah gaya tanpa memperkecil gaya', 'memperkecil gaya menjadi setengah dari beban', 'memperkecil usaha untuk mengangkat timba', 'memperbesar beban agar timba cepat terisi'],
        bahas: 'Katrol tetap memiliki KM = 1: gayanya sama dengan beban, tetapi arah tarik lebih mudah (ke bawah).' },
      { soal: 'Usaha untuk mengangkat beban 400 N setinggi 1,2 m adalah …',
        opsi: ['480 J', '333 J', '4.800 J', '48 J'],
        bahas: 'W = 400 × 1,2 = 480 J.' },
      { soal: 'Papan miring dipakai menaikkan karung ke truk. Makin panjang papan (tinggi sama), maka …',
        opsi: ['gaya dorong makin kecil, tetapi jarak dorong makin jauh', 'gaya dorong makin besar dan jarak dorong makin pendek', 'usaha yang diperlukan menjadi jauh lebih kecil', 'karung menjadi lebih ringan karena papannya panjang'],
        bahas: 'Bidang miring menukar gaya dengan jarak; usaha (berat × tinggi) tetap, bahkan sedikit bertambah karena gesekan.' }
    ]
  },

  optik: {
    kisi: [[1, 'C2', 'Membedakan bayangan nyata dan bayangan maya'], [1, 'C2', 'Mengidentifikasi jenis cermin atau lensa berdasarkan kegunaannya'], [2, 'C3', 'Menghitung jarak bayangan dengan persamaan 1/f = 1/s + 1/s′'], [2, 'C4', 'Menganalisis sifat bayangan berdasarkan letak benda terhadap titik fokus']],
    A: [
      { soal: 'Bayangan yang dapat ditangkap layar atau dinding disebut bayangan …',
        opsi: ['nyata, karena dibentuk oleh perpotongan sinar sungguhan', 'maya, karena dibentuk oleh perpanjangan sinar pantul', 'maya, karena selalu terletak di belakang cermin datar', 'nyata, karena ukurannya selalu sama dengan benda'],
        bahas: 'Bayangan nyata terbentuk dari perpotongan sinar sungguhan sehingga dapat ditangkap layar.' },
      { soal: 'Spion kendaraan memakai cermin cembung karena cermin ini …',
        opsi: ['menyebarkan cahaya sehingga bidang pandangnya luas', 'mengumpulkan cahaya sehingga bayangannya diperbesar', 'membentuk bayangan nyata yang dapat ditangkap layar', 'memantulkan cahaya kembali ke arah lampu kendaraan'],
        bahas: 'Cermin cembung menyebarkan cahaya; bayangannya maya, tegak, diperkecil, dengan bidang pandang luas.' },
      { soal: 'Lensa cembung memiliki fokus 10 cm. Layar HP diletakkan 15 cm dari lensa. Jarak bayangan adalah …',
        opsi: ['30 cm', '25 cm', '6 cm', '5 cm'],
        bahas: '1/s′ = 1/10 − 1/15 = 1/30 → s′ = 30 cm.' },
      { soal: 'Agar lensa cembung membentuk bayangan nyata yang diperbesar di dinding (proyektor), benda harus diletakkan …',
        opsi: ['di antara titik fokus dan dua kali jarak fokus', 'tepat di titik fokus lensa cembung tersebut', 'di antara lensa dan titik fokus lensanya', 'sejauh-jauhnya, lebih dari dua kali jarak fokus'],
        bahas: 'Benda antara F dan 2F menghasilkan bayangan nyata, terbalik, dan diperbesar.' }
    ],
    B: [
      { soal: 'Bayangan pada cermin datar bersifat …',
        opsi: ['maya, tegak, dan sama besar dengan benda', 'nyata, terbalik, dan sama besar dengan benda', 'maya, terbalik, dan lebih kecil dari benda', 'nyata, tegak, dan lebih besar dari benda'],
        bahas: 'Cermin datar membentuk bayangan maya, tegak, dan sama besar.' },
      { soal: 'Kaca pembesar (lup) memakai lensa …',
        opsi: ['cembung, dengan benda diletakkan di dalam titik fokus', 'cekung, dengan benda diletakkan di luar titik fokus', 'cekung, dengan benda diletakkan tepat di titik fokus', 'cembung, dengan benda diletakkan jauh di luar fokus'],
        bahas: 'Lup adalah lensa cembung; benda di dalam F menghasilkan bayangan maya, tegak, diperbesar.' },
      { soal: 'Lensa cembung berfokus 20 cm. Benda diletakkan 30 cm dari lensa. Jarak bayangan adalah …',
        opsi: ['60 cm', '50 cm', '12 cm', '10 cm'],
        bahas: '1/s′ = 1/20 − 1/30 = 1/60 → s′ = 60 cm.' },
      { soal: 'Gambar dari proyektor kardus tampak terbalik di dinding. Penjelasan yang tepat adalah …',
        opsi: ['lensa cembung membentuk bayangan nyata yang terbalik', 'lensa cembung selalu membentuk bayangan yang maya', 'dinding memantulkan cahaya sehingga gambar terbalik', 'layar HP terlalu terang sehingga gambar terbalik'],
        bahas: 'Bayangan nyata dari lensa cembung selalu terbalik; karena itu HP diputar 180° agar gambar tegak.' }
    ]
  }
};
