// Soal PEMAHAMAN KONSEP per misi — bagian 3 (bunyi, gempa, pengering, garam, boraks, nyamuk). Format: lihat konsep-bagian-1.js
module.exports = {
  bunyi: {
    kisi: [[1, 'C2', 'Membedakan pengaruh frekuensi dan amplitudo terhadap bunyi'], [1, 'C3', 'Menghitung frekuensi dari jumlah getaran dan waktu'], [2, 'C3', 'Menentukan perubahan senar yang menaikkan tinggi nada (Hukum Mersenne)'], [2, 'C2', 'Menjelaskan fungsi resonator pada alat musik']],
    A: [
      { soal: 'Senar yang dipetik lebih keras akan menghasilkan bunyi yang …',
        opsi: ['lebih nyaring, karena amplitudo getarannya lebih besar', 'lebih tinggi nadanya, karena frekuensinya bertambah', 'lebih rendah nadanya, karena senarnya menjadi kendur', 'lebih cepat merambat, karena udaranya ikut terdorong'],
        bahas: 'Amplitudo menentukan kenyaringan; tinggi nada ditentukan frekuensi.' },
      { soal: 'Sebuah senar bergetar 880 kali dalam 2 sekon. Frekuensinya adalah …',
        opsi: ['440 Hz', '1.760 Hz', '880 Hz', '220 Hz'],
        bahas: 'f = jumlah getaran ÷ waktu = 880 ÷ 2 = 440 Hz.' },
      { soal: 'Cara yang tepat untuk menaikkan nada senar sasando adalah …',
        opsi: ['menambah beban botol agar senar lebih tegang', 'memperpanjang bagian senar yang bergetar', 'mengganti senar dengan senar yang lebih tebal', 'memetik senar lebih pelan dari sebelumnya'],
        bahas: 'Menurut Mersenne, nada naik bila senar lebih tegang, lebih pendek, atau lebih ringan.' },
      { soal: 'Kotak kardus pada sasando mini membuat bunyinya …',
        opsi: ['lebih nyaring tanpa mengubah tinggi nadanya', 'lebih tinggi nadanya karena udaranya bergetar', 'lebih rendah nadanya karena kotaknya besar', 'tidak berubah karena kotak tidak ikut bergetar'],
        bahas: 'Resonator ikut bergetar (resonansi) sehingga bunyi lebih nyaring, tetapi frekuensinya tetap.' }
    ],
    B: [
      { soal: 'Tinggi rendahnya nada sebuah bunyi ditentukan oleh …',
        opsi: ['frekuensi, yaitu banyaknya getaran tiap sekon', 'amplitudo, yaitu simpangan terjauh getaran', 'kekuatan petikan jari pada senar alat musik', 'besar kecilnya kotak resonansi alat musik'],
        bahas: 'Frekuensi menentukan tinggi nada; amplitudo menentukan kenyaringan.' },
      { soal: 'Periode getaran sebuah garpu tala adalah 0,004 sekon. Frekuensinya adalah …',
        opsi: ['250 Hz', '400 Hz', '25 Hz', '4 Hz'],
        bahas: 'f = 1 ÷ T = 1 ÷ 0,004 = 250 Hz.' },
      { soal: 'Dua senar sama jenis dan tegangannya. Senar P panjangnya 40 cm, senar Q 80 cm. Pernyataan yang tepat adalah …',
        opsi: ['P bernada lebih tinggi karena lebih pendek', 'Q bernada lebih tinggi karena lebih panjang', 'keduanya bernada sama karena jenisnya sama', 'P lebih nyaring karena senarnya lebih pendek'],
        bahas: 'f = (1/2L)√(T/μ): L lebih kecil → frekuensi lebih besar (nada lebih tinggi).' },
      { soal: 'Gitar akustik memiliki badan berongga karena rongga itu berfungsi …',
        opsi: ['memperkuat bunyi melalui resonansi udara di dalamnya', 'menaikkan nada senar agar sesuai dengan nada dasar', 'menyimpan senar cadangan agar mudah diganti', 'membuat senar lebih ringan sehingga mudah dipetik'],
        bahas: 'Rongga gitar ikut bergetar (resonansi) sehingga bunyi senar terdengar lebih nyaring.' }
    ]
  },

  gempa: {
    kisi: [[1, 'C2', 'Menjelaskan penyebab gempa bumi tektonik'], [1, 'C2', 'Membedakan hiposentrum dan episentrum'], [2, 'C3', 'Menerapkan rumus frekuensi alami untuk perubahan massa atau kekakuan'], [2, 'C4', 'Menganalisis bahaya resonansi pada bangunan saat gempa']],
    A: [
      { soal: 'Gempa bumi tektonik terjadi karena …',
        opsi: ['lempeng kerak bumi bergeser dan melepaskan energi', 'gunung api meletus dan mengeluarkan lava panas', 'air laut pasang naik dan menekan daratan pantai', 'angin kencang menggoyangkan permukaan tanah'],
        bahas: 'Energi yang tersimpan di batuan dilepaskan tiba-tiba ketika lempeng tektonik bergeser.' },
      { soal: 'Titik di permukaan bumi yang tepat berada di atas pusat gempa disebut …',
        opsi: ['episentrum', 'hiposentrum', 'seismograf', 'magnitudo'],
        bahas: 'Hiposentrum = pusat gempa di dalam bumi; episentrum = titik di permukaan tepat di atasnya.' },
      { soal: 'Frekuensi alami f = (1/2π)√(k/m). Jika atap diganti yang lebih berat (k tetap), frekuensi alami rumah …',
        opsi: ['turun, karena massa bangunan bertambah', 'naik, karena bangunan menjadi lebih kuat', 'tetap, karena hanya atapnya yang diganti', 'naik, karena massa membuat rumah lebih kaku'],
        bahas: 'm bertambah sedangkan k tetap → √(k/m) mengecil → frekuensi alami turun.' },
      { soal: 'Guncangan gempa berfrekuensi 3 Hz. Bangunan yang paling berbahaya adalah yang frekuensi alaminya …',
        opsi: ['mendekati 3 Hz, karena terjadi resonansi', 'jauh di atas 3 Hz, karena terlalu kaku', 'jauh di bawah 3 Hz, karena terlalu lentur', 'tidak berpengaruh, karena semua bangunan sama'],
        bahas: 'Bila frekuensi alami mendekati frekuensi guncangan, ayunan diperkuat berkali-kali (resonansi).' }
    ],
    B: [
      { soal: 'Indonesia sering mengalami gempa karena …',
        opsi: ['terletak di pertemuan beberapa lempeng tektonik', 'memiliki banyak pantai dan pulau-pulau kecil', 'beriklim tropis dengan curah hujan yang tinggi', 'dilalui garis khatulistiwa di bagian tengahnya'],
        bahas: 'Indonesia berada di pertemuan lempeng Indo-Australia, Eurasia, dan Pasifik.' },
      { soal: 'Alat untuk mencatat getaran gempa bumi disebut …',
        opsi: ['seismograf', 'barometer', 'hidrometer', 'termometer'],
        bahas: 'Seismograf merekam getaran (gelombang seismik) gempa.' },
      { soal: 'Frekuensi alami f = (1/2π)√(k/m). Jika rumah diberi pengaku silang sehingga lebih kaku (m tetap), frekuensi alaminya …',
        opsi: ['naik, karena kekakuan bertambah', 'turun, karena rumah menjadi berat', 'tetap, karena massanya tidak berubah', 'turun, karena pengaku menahan ayunan'],
        bahas: 'k bertambah sedangkan m tetap → frekuensi alami naik.' },
      { soal: 'Atap genteng berat lebih berbahaya saat gempa daripada atap ringan karena …',
        opsi: ['gaya gempa sebanding dengan massa bangunan', 'genteng memantulkan gelombang gempa ke tanah', 'atap berat membuat fondasi bergeser ke atas', 'genteng menghasilkan getaran sendiri saat hujan'],
        bahas: 'F = m × a: pada percepatan guncangan yang sama, massa lebih besar menghasilkan gaya lebih besar.' }
    ]
  },

  pengering: {
    kisi: [[1, 'C2', 'Menjelaskan pengaruh warna permukaan terhadap penyerapan radiasi'], [1, 'C2', 'Menjelaskan fungsi penutup bening pada pengering surya'], [2, 'C2', 'Mengidentifikasi faktor yang mempercepat penguapan'], [2, 'C4', 'Menganalisis pengaruh ventilasi terhadap suhu dan kelembapan']],
    A: [
      { soal: 'Alas pengering dicat hitam kusam karena permukaan hitam …',
        opsi: ['menyerap radiasi matahari lebih banyak', 'memantulkan radiasi matahari lebih banyak', 'menolak lalat sehingga ikan lebih bersih', 'membuat udara di dalamnya lebih kering'],
        bahas: 'Permukaan gelap dan kusam menyerap lebih banyak radiasi lalu mengubahnya menjadi panas.' },
      { soal: 'Penutup plastik bening pada pengering surya berfungsi …',
        opsi: ['meneruskan cahaya masuk dan menahan udara panas', 'memantulkan cahaya agar ikan tidak terlalu panas', 'menyerap uap air dari ikan agar cepat kering', 'menghalangi seluruh cahaya agar ikan tetap teduh'],
        bahas: 'Penutup bening meneruskan cahaya, sedangkan udara panas tertahan di dalam (mirip efek rumah kaca).' },
      { soal: 'Faktor berikut yang mempercepat penguapan air dari ikan adalah …',
        opsi: ['suhu tinggi, udara kering, dan ada aliran udara', 'suhu rendah, udara lembap, dan tertutup rapat', 'udara lembap, cahaya redup, dan ikan ditumpuk', 'udara diam, ikan utuh, dan tempat yang teduh'],
        bahas: 'Penguapan dipercepat oleh suhu tinggi, kelembapan rendah, aliran udara, dan permukaan yang luas.' },
      { soal: 'Pengering tanpa ventilasi sangat panas, tetapi ikannya tetap basah. Penyebab paling mungkin adalah …',
        opsi: ['udara di dalam jenuh uap air sehingga penguapan melambat', 'suhu terlalu tinggi sehingga air di dalam ikan membeku', 'penutup bening menyerap seluruh panas dari dalam pengering', 'alas hitam memantulkan panas sehingga ikan tidak terkena'],
        bahas: 'Tanpa ventilasi uap air tidak terbuang, udara menjadi jenuh, dan penguapan dari ikan nyaris berhenti.' }
    ],
    B: [
      { soal: 'Pada siang hari, kaos berwarna hitam terasa lebih panas daripada kaos putih karena …',
        opsi: ['warna hitam menyerap lebih banyak radiasi matahari', 'warna putih menyerap lebih banyak radiasi matahari', 'kain hitam lebih tebal daripada kain putih', 'warna hitam menghalangi angin menyentuh kulit'],
        bahas: 'Warna gelap menyerap radiasi lebih banyak; warna putih memantulkannya.' },
      { soal: 'Mobil yang diparkir di bawah terik dengan kaca tertutup menjadi sangat panas karena …',
        opsi: ['cahaya masuk lewat kaca, panasnya tertahan di dalam', 'kaca mobil memantulkan semua panas ke dalam mobil', 'udara luar yang dingin tidak dapat masuk ke mobil', 'mesin mobil terus menyala walaupun mobil diparkir'],
        bahas: 'Cahaya masuk dan diserap jok/dasbor menjadi panas; udara panas tertahan karena kaca tertutup.' },
      { soal: 'Jemuran lebih cepat kering pada keadaan …',
        opsi: ['terik dan berangin', 'mendung dan lembap', 'teduh dan tanpa angin', 'malam dan berkabut'],
        bahas: 'Suhu tinggi dan aliran udara mempercepat penguapan.' },
      { soal: 'Lubang ventilasi pengering dibuat sangat besar. Akibat yang paling mungkin adalah …',
        opsi: ['udara kering tetapi suhu di dalam pengering turun', 'udara jenuh uap air sehingga ikan sulit kering', 'suhu di dalam naik melebihi 60 °C dengan cepat', 'lalat lebih sulit masuk karena aliran udaranya deras'],
        bahas: 'Ventilasi besar membuang uap dengan baik, tetapi juga membuang panas; perlu ukuran yang seimbang.' }
    ]
  },

  garam: {
    kisi: [[1, 'C2', 'Mengidentifikasi pelarut dan zat terlarut pada air laut'], [1, 'C3', 'Menghitung massa garam dari kadar larutan'], [2, 'C2', 'Menjelaskan proses kristalisasi pada larutan jenuh'], [2, 'C4', 'Menganalisis batas kemampuan penyaringan dalam memisahkan garam']],
    A: [
      { soal: 'Pada air laut, yang berperan sebagai zat terlarut adalah …',
        opsi: ['garam', 'air', 'pasir', 'lumpur'],
        bahas: 'Air adalah pelarut; garam (terutama NaCl) adalah zat terlarut.' },
      { soal: 'Kadar garam air laut 3,5%. Massa garam di dalam 20 kg air laut adalah …',
        opsi: ['0,7 kg', '3,5 kg', '7 kg', '0,35 kg'],
        bahas: '3,5% × 20 kg = 0,7 kg garam.' },
      { soal: 'Kristal garam mulai terbentuk di meja garam ketika …',
        opsi: ['larutan menjadi jenuh karena airnya menguap', 'air laut baru saja dialirkan ke petak garam', 'hujan turun dan menambah air ke petak garam', 'lumpur di dasar petak larut ke dalam air'],
        bahas: 'Saat air menguap, larutan makin pekat hingga jenuh; kelebihan garam keluar sebagai kristal.' },
      { soal: 'Air laut disaring dengan kain sebelum diuapkan. Pernyataan yang tepat adalah …',
        opsi: ['lumpur tertahan, tetapi garam terlarut tetap lolos', 'garam tertahan di kain sehingga airnya menjadi tawar', 'lumpur dan garam sama-sama tertahan di kain saring', 'penyaringan membuat garam menguap lebih cepat'],
        bahas: 'Penyaringan hanya menahan partikel tidak larut; zat terlarut ikut lolos bersama air.' }
    ],
    B: [
      { soal: 'Pada larutan air gula, yang berperan sebagai pelarut adalah …',
        opsi: ['air', 'gula', 'gelas', 'sendok'],
        bahas: 'Pelarut adalah zat yang melarutkan (air); zat yang dilarutkan (gula) adalah zat terlarut.' },
      { soal: 'Petani mengalirkan 400 kg air tua berkadar garam 20% ke meja garam. Garam yang dapat dihasilkan paling banyak …',
        opsi: ['80 kg', '20 kg', '200 kg', '8 kg'],
        bahas: '20% × 400 kg = 80 kg garam.' },
      { soal: 'Proses keluarnya zat terlarut dari larutan jenuh membentuk butiran teratur disebut …',
        opsi: ['kristalisasi', 'filtrasi', 'adsorpsi', 'sublimasi'],
        bahas: 'Kristalisasi: zat terlarut keluar dari larutan jenuh membentuk kristal.' },
      { soal: 'Garam di petak beralas tanah tampak kusam, sedangkan di petak beralas terpal tampak putih. Penyebabnya adalah …',
        opsi: ['kristal di alas tanah bercampur dengan lumpur', 'terpal menambah zat pemutih ke dalam garam', 'alas tanah membuat garam berubah menjadi zat lain', 'terpal membuat air laut lebih asin dari biasanya'],
        bahas: 'Pada alas tanah, kristal garam bercampur partikel lumpur sehingga tidak murni.' }
    ]
  },

  boraks: {
    kisi: [[1, 'C2', 'Membedakan zat aditif yang diizinkan dan yang dilarang'], [1, 'C2', 'Menjelaskan bahaya boraks bagi kesehatan'], [2, 'C2', 'Menjelaskan perubahan warna kunyit sebagai indikator'], [2, 'C4', 'Menganalisis penyebab positif palsu dan cara mencegahnya']],
    A: [
      { soal: 'Kelompok bahan berikut yang dilarang ditambahkan pada makanan adalah …',
        opsi: ['boraks, formalin, dan rhodamin B', 'garam dapur, gula, dan kunyit', 'daun suji, kunyit, dan karamel', 'cuka, garam, dan gula pasir'],
        bahas: 'Boraks dan formalin (pengawet) serta rhodamin B (pewarna tekstil) dilarang untuk makanan.' },
      { soal: 'Boraks dilarang dipakai pada makanan karena …',
        opsi: ['merusak hati, ginjal, dan otak bila sering tertelan', 'membuat makanan terlalu asin dan terlalu cepat basi', 'mengubah warna makanan menjadi merah bata', 'membuat makanan kurang kenyal dan cepat hancur'],
        bahas: 'Boraks bersifat racun bila tertelan terus-menerus dan merusak organ tubuh.' },
      { soal: 'Kertas kunyit berubah menjadi merah bata saat diberi sampel yang diasamkan lalu dikeringkan. Artinya …',
        opsi: ['sampel kemungkinan mengandung boraks', 'sampel pasti bebas dari boraks', 'sampel mengandung banyak gula', 'kertas kunyit sudah rusak dan basi'],
        bahas: 'Kurkumin bereaksi dengan asam borat membentuk warna merah bata (rosocyanin).' },
      { soal: 'Sampel bakso tanpa boraks yang bersifat basa membuat kertas kunyit kemerahan. Cara mencegah hasil keliru ini adalah …',
        opsi: ['mengasamkan sampel dan membandingkan dengan kontrol', 'memakai lebih banyak sampel agar warnanya lebih jelas', 'langsung menyimpulkan bahwa bakso itu mengandung boraks', 'mengeringkan kertas lebih lama tanpa memakai pembanding'],
        bahas: 'Kunyit juga memerah di larutan basa (positif palsu); sampel diasamkan dan dibandingkan dengan kontrol.' }
    ],
    B: [
      { soal: 'Zat aditif alami yang aman dipakai sebagai pewarna kuning makanan adalah …',
        opsi: ['kunyit', 'rhodamin B', 'metanil yellow', 'boraks'],
        bahas: 'Kunyit adalah pewarna alami; metanil yellow adalah pewarna tekstil yang dilarang.' },
      { soal: 'Lembaga yang mengawasi keamanan makanan dan obat yang beredar di Indonesia adalah …',
        opsi: ['BPOM', 'BMKG', 'BNPB', 'PLN'],
        bahas: 'Badan Pengawas Obat dan Makanan (BPOM) mengawasi keamanan pangan.' },
      { soal: 'Air kunyit diteteskan ke air sabun yang bersifat basa. Warna yang terlihat adalah …',
        opsi: ['cokelat kemerahan', 'kuning cerah', 'hijau kebiruan', 'tetap bening'],
        bahas: 'Kurkumin berubah cokelat kemerahan dalam larutan basa.' },
      { soal: 'Uji boraks yang baik memakai sampel kontrol. Fungsi sampel kontrol adalah …',
        opsi: ['sebagai pembanding warna positif dan negatif yang asli', 'sebagai cadangan bila sampel utama habis terpakai', 'agar kertas kunyit lebih cepat kering di udara', 'agar hasil uji langsung dapat dipakai menuduh pedagang'],
        bahas: 'Kontrol (pasti tanpa boraks dan pasti berboraks) menunjukkan warna acuan sehingga hasil dapat dibandingkan.' }
    ]
  },

  nyamuk: {
    kisi: [[1, 'C2', 'Menjelaskan hasil fermentasi gula oleh ragi'], [1, 'C3', 'Menentukan suhu yang sesuai untuk kerja ragi'], [2, 'C2', 'Mengurutkan tahapan daur hidup nyamuk'], [2, 'C4', 'Menganalisis alasan perangkap harus diganti paling lama 7 hari']],
    A: [
      { soal: 'Ragi yang dicampur air gula menghasilkan gas yang menarik nyamuk, yaitu …',
        opsi: ['karbon dioksida', 'oksigen', 'nitrogen', 'hidrogen'],
        bahas: 'Fermentasi: gula → alkohol + karbon dioksida (oleh ragi).' },
      { soal: 'Agar ragi menghasilkan gas paling cepat, larutan gula sebaiknya dibuat dengan air …',
        opsi: ['hangat sekitar 30–35 °C', 'mendidih sekitar 100 °C', 'air es sekitar 0–5 °C', 'panas sekitar 60–70 °C'],
        bahas: 'Ragi paling aktif pada suhu hangat; di atas ± 45 °C ragi mati.' },
      { soal: 'Urutan daur hidup nyamuk yang benar adalah …',
        opsi: ['telur → jentik → kepompong → dewasa', 'telur → kepompong → jentik → dewasa', 'jentik → telur → kepompong → dewasa', 'telur → dewasa → jentik → kepompong'],
        bahas: 'Nyamuk mengalami metamorfosis sempurna: telur, jentik (larva), kepompong (pupa), dewasa.' },
      { soal: 'Perangkap berisi air dibiarkan 2 minggu tanpa diganti. Akibat yang paling mungkin adalah …',
        opsi: ['jentik di dalamnya menjadi nyamuk dewasa baru', 'ragi menghasilkan gas makin banyak setiap hari', 'nyamuk tidak mau mendekat karena airnya jernih', 'air perangkap berubah menjadi racun pembunuh jentik'],
        bahas: 'Daur hidup nyamuk 7–10 hari; perangkap yang tidak diganti bisa menjadi sarang nyamuk.' }
    ],
    B: [
      { soal: 'Proses perubahan gula menjadi alkohol dan karbon dioksida oleh ragi disebut …',
        opsi: ['fermentasi', 'fotosintesis', 'respirasi aerob', 'kristalisasi'],
        bahas: 'Fermentasi oleh ragi menghasilkan alkohol dan gas CO₂.' },
      { soal: 'Rudi melarutkan ragi dengan air mendidih. Perangkapnya tidak menghasilkan gas karena …',
        opsi: ['ragi mati oleh suhu yang terlalu tinggi', 'gula ikut menguap bersama air mendidih', 'air mendidih tidak dapat melarutkan gula', 'ragi bekerja terlalu cepat lalu langsung habis'],
        bahas: 'Ragi adalah makhluk hidup; di atas ± 45 °C ragi mati sehingga fermentasi tidak terjadi.' },
      { soal: 'Tahap daur hidup nyamuk yang hidup di dalam air dan bergerak lincah adalah …',
        opsi: ['jentik (larva)', 'nyamuk dewasa', 'telur', 'nyamuk betina'],
        bahas: 'Jentik hidup di air dan bergerak naik-turun untuk bernapas di permukaan.' },
      { soal: 'Gerakan 3M Plus mencegah DBD paling efektif karena …',
        opsi: ['memutus daur hidup nyamuk di air tergenang', 'membunuh semua virus dengue yang ada di udara', 'membuat nyamuk dewasa tidak bisa terbang lagi', 'menjadikan air bak mandi beracun bagi manusia'],
        bahas: 'Menguras, menutup, dan mendaur ulang wadah air menghilangkan tempat telur dan jentik berkembang.' }
    ]
  }
};
