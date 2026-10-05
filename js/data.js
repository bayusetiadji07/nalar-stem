/* =========================================================
   NalarSTEM — data misi, indikator berpikir kritis, bank soal
   ========================================================= */

// Indikator berpikir kritis (diadaptasi dari Facione, 2011)
const INDIKATOR = [
  { id: 'interpretasi', nama: 'Interpretasi', warna: '#0ea5a4',
    arti: 'Memahami dan menyatakan kembali makna masalah, data, atau informasi.' },
  { id: 'analisis', nama: 'Analisis', warna: '#2563eb',
    arti: 'Mengenali hubungan antar-konsep, variabel, dan bagian-bagian masalah.' },
  { id: 'inferensi', nama: 'Inferensi', warna: '#7c3aed',
    arti: 'Menarik dugaan atau kesimpulan yang masuk akal dari bukti yang ada.' },
  { id: 'evaluasi', nama: 'Evaluasi', warna: '#db2777',
    arti: 'Menilai kekuatan bukti, klaim, dan kelemahan rancangan/pengujian.' },
  { id: 'eksplanasi', nama: 'Eksplanasi', warna: '#ea580c',
    arti: 'Menjelaskan alasan dengan runtut: klaim, bukti, dan penalaran ilmiah.' },
  { id: 'regulasi', nama: 'Regulasi Diri', warna: '#16a34a',
    arti: 'Merefleksikan dan memperbaiki cara berpikir serta rancangan sendiri.' }
];

// Enam langkah — Engineering Design Process + scaffold berpikir kritis
const LANGKAH = [
  {
    no: 1, id: 'pahami', judul: 'Pahami Masalah', edp: 'Tanya',
    indikator: ['interpretasi'],
    arahan: 'Baca kisah masalahnya dengan teliti. Seorang pemikir kritis tidak buru-buru mencari solusi — ia memastikan dulu apa sebenarnya masalahnya.',
    isian: [
      { id: 'masalah', label: 'Apa masalah utama yang harus diselesaikan? Tulis dengan kata-katamu sendiri.', ph: 'Masalahnya adalah ...' },
      { id: 'kriteria', label: 'Apa saja kriteria keberhasilan dan kendala (batasan) rancanganmu?', ph: 'Rancangan dianggap berhasil jika ... Batasannya ...' }
    ],
    pemantik: [
      'Kalau kamu harus menjelaskan masalah ini ke adik kelas dalam satu kalimat, apa yang akan kamu katakan?',
      'Mana yang termasuk "kriteria" (yang harus dicapai) dan mana yang "kendala" (yang membatasi)?',
      'Siapa yang akan memakai hasil rancanganmu, dan apa yang paling penting bagi mereka?'
    ]
  },
  {
    no: 2, id: 'konsep', judul: 'Gali Konsep Sains', edp: 'Selidiki',
    indikator: ['analisis'],
    arahan: 'Pelajari kartu konsep. Hubungkan konsep IPA dengan bagian-bagian rancanganmu — apa yang memengaruhi apa?',
    isian: [
      { id: 'konsep', label: 'Konsep IPA apa yang paling menentukan keberhasilan rancanganmu? Jelaskan hubungannya.', ph: 'Konsep ... berpengaruh karena ...' },
      { id: 'faktor', label: 'Sebutkan faktor-faktor yang menurutmu memengaruhi hasil, dan bagaimana pengaruhnya.', ph: 'Semakin ... maka ... karena ...' }
    ],
    pemantik: [
      'Faktor mana yang menurutmu paling berpengaruh? Apa alasanmu?',
      'Coba hubungkan rumus di kartu konsep dengan benda nyata di rancanganmu.',
      'Adakah faktor yang pengaruhnya berlawanan — menguntungkan di satu sisi, merugikan di sisi lain?'
    ]
  },
  {
    no: 3, id: 'hipotesis', judul: 'Rumuskan Hipotesis', edp: 'Bayangkan',
    indikator: ['inferensi', 'analisis'],
    arahan: 'Pilih SATU variabel yang ingin kamu selidiki. Tentukan apa yang diubah, apa yang diukur, dan apa yang dijaga tetap.',
    isian: [
      { id: 'vbebas', label: 'Variabel bebas (yang sengaja kamu ubah):', ph: 'Contoh: ...', pendek: true },
      { id: 'vterikat', label: 'Variabel terikat (yang kamu ukur/amati):', ph: 'Contoh: ...', pendek: true },
      { id: 'vkontrol', label: 'Variabel kontrol (yang dijaga tetap sama):', ph: 'Contoh: ...', pendek: true },
      { id: 'hipotesis', label: 'Hipotesis — gunakan pola "Jika ... maka ... karena ...":', ph: 'Jika ... maka ... karena ...' }
    ],
    pemantik: [
      'Kalau kamu mengubah dua hal sekaligus, bagaimana kamu tahu mana yang menyebabkan perubahan hasil?',
      'Bagian "karena" di hipotesismu — konsep IPA apa yang mendukungnya?',
      'Bisakah hipotesismu dibuktikan SALAH lewat percobaan? Hipotesis yang baik harus bisa diuji.'
    ]
  },
  {
    no: 4, id: 'uji', judul: 'Rancang & Uji', edp: 'Buat & Uji',
    indikator: ['analisis', 'inferensi'],
    arahan: 'Atur rancanganmu di laboratorium maya, lalu tekan "Uji Rancangan". Lakukan minimal 3 kali uji. Ubah SATU variabel saja setiap kali agar ujinya adil.',
    isian: [
      { id: 'catatan', label: 'Catatan pengamatan selama menguji (apa yang terjadi, apa yang mengejutkan?):', ph: 'Saat aku mengubah ..., ternyata ...' }
    ],
    pemantik: [
      'Dari uji pertama ke uji kedua, variabel apa saja yang kamu ubah?',
      'Hasil mana yang paling mengejutkanmu? Mengapa kamu tidak menduganya?',
      'Apakah datamu sudah cukup untuk melihat pola? Berapa uji lagi yang kamu perlukan?'
    ]
  },
  {
    no: 5, id: 'evaluasi', judul: 'Analisis & Evaluasi', edp: 'Tingkatkan',
    indikator: ['evaluasi', 'inferensi'],
    arahan: 'Baca tabel dan grafik datamu. Apakah hipotesismu terbukti? Seberapa kuat buktinya? Apa kelemahan rancangan dan cara ujimu?',
    isian: [
      { id: 'pola', label: 'Pola apa yang terlihat dari datamu? Sebutkan angkanya.', ph: 'Ketika ... naik dari ... menjadi ..., hasilnya ...' },
      { id: 'hipotesisUji', label: 'Apakah hipotesismu didukung data? Seberapa yakin kamu, dan mengapa?', ph: 'Hipotesisku (didukung/tidak) karena ...' },
      { id: 'kelemahan', label: 'Apa kelemahan rancangan atau cara ujimu? Bagaimana memperbaikinya?', ph: 'Kelemahannya ... Perbaikannya ...' }
    ],
    pemantik: [
      'Apakah ada data yang tidak sesuai dengan polanya? Apa kemungkinan penyebabnya?',
      'Jika temanmu mendapat hasil berbeda, apa yang akan kamu periksa lebih dulu?',
      'Rancangan terbaikmu memenuhi kriteria apa saja, dan mengorbankan apa?'
    ]
  },
  {
    no: 6, id: 'simpulkan', judul: 'Simpulkan & Refleksi', edp: 'Komunikasikan',
    indikator: ['eksplanasi', 'regulasi'],
    arahan: 'Tuliskan kesimpulan dengan pola Klaim–Bukti–Penalaran (CER), lalu renungkan cara berpikirmu sendiri.',
    isian: [
      { id: 'klaim', label: 'KLAIM — Jawaban atas masalah (rancangan terbaikmu):', ph: 'Rancangan terbaik adalah ...' },
      { id: 'bukti', label: 'BUKTI — Data dari ujimu yang mendukung klaim:', ph: 'Pada uji ke-..., hasilnya ...' },
      { id: 'penalaran', label: 'PENALARAN — Mengapa bukti itu mendukung klaim? Hubungkan dengan konsep IPA.', ph: 'Hal ini terjadi karena ...' },
      { id: 'refleksi', label: 'REFLEKSI — Apa yang berubah dari pemikiran awalmu? Apa yang akan kamu lakukan berbeda?', ph: 'Awalnya aku mengira ..., ternyata ...' }
    ],
    pemantik: [
      'Apakah buktimu benar-benar mendukung klaim, atau hanya "kebetulan cocok"?',
      'Bagian mana dari pemikiran awalmu yang ternyata keliru? Apa yang membuatmu sadar?',
      'Kalau rancanganmu dipakai sungguhan di desa, apa risiko yang belum kamu uji?'
    ]
  },
  {
    no: 7, id: 'nyata', judul: 'Wujudkan di Dunia Nyata', edp: 'Buat Nyata',
    indikator: ['evaluasi', 'regulasi'],
    arahan: 'Saatnya membuat prototipe sungguhan! Centang cek keselamatan, buat rancanganmu dari bahan nyata, uji, lalu bandingkan dengan prediksi simulasi. Hasil yang berbeda bukan kegagalan — justru bahan berpikir kritis: apa yang tidak diperhitungkan oleh model?',
    isian: [
      { id: 'rencanaNyata', label: 'RENCANA — Apa yang kamu sesuaikan dari rancangan simulasi karena bahan/alat nyata yang tersedia? Apa dugaanmu tentang pengaruhnya?', ph: 'Di simulasi aku memakai ..., tetapi yang tersedia ..., jadi aku menduga ...' },
      { id: 'bandingNyata', label: 'BANDINGKAN — Seberapa dekat hasil nyata dengan prediksi simulasi? Sebutkan angkanya dan kemungkinan penyebab perbedaannya.', ph: 'Simulasi memprediksi ..., hasil nyata ..., berbeda karena ...' },
      { id: 'perbaikanNyata', label: 'PERBAIKI — Apa yang akan kamu ubah pada prototipe berikutnya? Apa yang kamu pelajari tentang keterbatasan model simulasi?', ph: 'Berikutnya aku akan ... karena ... Ternyata simulasi tidak memperhitungkan ...' }
    ],
    pemantik: [
      'Faktor apa di dunia nyata yang tidak ada di simulasi?',
      'Jika kamu mengulang uji nyata dengan rancangan yang sama, apakah hasilnya akan persis sama? Mengapa?',
      'Bagian mana dari prototipemu yang paling berisiko tidak aman, dan bagaimana mencegahnya?'
    ]
  }
];

/* ---------------- Panduan praktik dunia nyata (Langkah 7) ----------------
   takaran(v) menerjemahkan variabel uji terbaik di simulasi menjadi takaran praktis.
   ukur[].sim = id keluaran simulasi pembanding (bila ada). */
const fxd = (n, d = 1) => String(Number((+n).toFixed(d))).replace('.', ',');

const NYATA = {
  perahu: {
    waktu: '2 × 40 menit',
    alat: [
      'Bahan lambung sesuai rancanganmu: styrofoam bekas kemasan, lembar plastik/botol bekas, triplek tipis, atau seng bekas',
      'Lem tembak atau lem kedap air + lakban bening',
      'Cutter/gunting (dengan pendampingan guru), penggaris, spidol',
      'Baskom besar, ember, atau bak air dangkal',
      'Beban uji: botol air mineral 600 mL berisi air (± 0,6 kg) atau kantong pasir 0,5 kg',
      'Timbangan dapur dan lap kain'
    ],
    keselamatan: [
      'Cutter hanya dipakai dengan pendampingan guru; potong di atas alas dan arahkan mata pisau menjauhi tubuh.',
      'Lem tembak panas — jangan sentuh ujung pistol lem dan lelehan lemnya.',
      'Uji di baskom/ember/bak, BUKAN di sungai, laut, atau genangan banjir sungguhan.',
      'Lantai basah licin — sediakan lap dan segera keringkan tumpahan air.',
      'Kumpulkan sisa styrofoam untuk didaur ulang; jangan dibuang ke saluran air.'
    ],
    langkah: [
      'Gambar pola: alas (panjang × lebar) dan empat dinding setinggi rancanganmu.',
      'Potong bahan sesuai pola (minta guru mendampingi saat memakai cutter).',
      'Rekatkan dinding ke alas. Lapisi semua sambungan dengan lakban agar kedap air.',
      'Beri garis skala tiap 1 cm pada dinding luar — untuk membaca kedalaman celup.',
      'Timbang perahu kosong, lalu apungkan dan catat kedalaman celupnya.',
      'Tambahkan beban sedikit demi sedikit di TENGAH perahu. Catat kedalaman celup saat beban sama dengan muatan uji rancanganmu.',
      'Terus tambah beban hingga sisa dinding di atas air tinggal ± 1 cm — itulah muatan maksimum nyata. Jangan sampai tenggelam agar beban tidak basah.',
      'Uji stabilitas: goyang air pelan-pelan dengan tangan, amati apakah perahu mudah miring.'
    ],
    takaran: v => {
      const p = +v.panjang, l = +v.lebar, t = +v.tinggi, luas = p * l + 2 * p * t + 2 * l * t;
      const hasil = [
        `Alas ${p} × ${l} cm; 2 dinding samping ${p} × ${t} cm; 2 dinding depan-belakang ${l} × ${t} cm.`,
        `Bahan yang dibutuhkan ± ${Math.round(luas * 1.1).toLocaleString('id-ID')} cm² (sudah ditambah 10% untuk sisa potongan).`,
        `Muatan uji ${fxd(v.muatan)} kg ≈ ${fxd(+v.muatan / 0.6)} botol air mineral 600 mL penuh (kriteria lomba: 3 kg ≈ 5 botol).`
      ];
      if (v.air === 'laut') hasil.push('Air laut tiruan: larutkan ± 35 g garam dapur (± 7 sendok teh) per 1 liter air.');
      return hasil;
    },
    ukur: [
      { id: 'celup', label: 'Kedalaman celup (muatan seperti simulasi)', satuan: 'cm', sim: 'celup' },
      { id: 'kapasitas', label: 'Muatan maksimum nyata', satuan: 'kg', sim: 'kapasitas' },
      { id: 'biaya', label: 'Biaya nyata', satuan: 'Rp', sim: 'biaya' }
    ],
    masalah: [
      { gejala: 'Perahu bocor / air merembes di sambungan', kunci: 'bocor|rembes|masuk air', petunjuk: ['Sambungan mana yang paling dulu basah? Periksa sudut-sudut alas.', 'Apakah lakban menempel pada permukaan yang kering dan bersih?'] },
      { gejala: 'Perahu miring atau terbalik saat diberi beban', kunci: 'miring|terbalik|oleng', petunjuk: ['Di mana letak beban? Bandingkan beban di tengah dengan beban di satu sisi.', 'Bagaimana rasio lebar : tinggi perahumu dibanding rancangan simulasi?'] },
      { gejala: 'Kedalaman celup berbeda jauh dari simulasi', kunci: 'beda|berbeda|selisih|tidak sama', petunjuk: ['Apakah ukuran potongan nyata persis sama dengan rancangan?', 'Berapa massa perahu nyatamu termasuk lem dan lakban? Simulasi tidak menghitung lem.'] },
      { gejala: 'Dasar perahu melengkung atau retak', kunci: 'lengkung|melengkung|retak|patah', petunjuk: ['Apakah beban bertumpu di satu titik? Coba sebar beban di atas papan tipis.', 'Bahan mana yang lebih kuat menahan tekanan beban menurut simulasi?'] }
    ]
  },
  penjernih: {
    waktu: '2 × 40 menit',
    alat: [
      'Botol plastik bekas 1,5 L (bagian dasarnya dipotong) dan gelas bening',
      'Kerikil dan pasir halus yang sudah dicuci sampai air bilasannya bening',
      'Ijuk atau sabut kelapa',
      'Arang kayu yang ditumbuk kasar (atau arang aktif akuarium)',
      'Kapas atau kain kasa untuk menyumbat leher botol',
      'Air keruh: air sungai/selokan, atau buatan (1 L air + 2 sendok makan tanah)',
      'Gelas takar/botol 1 L, stopwatch HP, penggaris, spidol, sarung tangan'
    ],
    keselamatan: [
      'Air hasil saringan TIDAK BOLEH diminum — penyaringan tidak membunuh kuman.',
      'Pengambilan air sungai dilakukan orang dewasa; murid tidak turun ke sungai.',
      'Pakai sarung tangan saat memegang air kotor dan cuci tangan dengan sabun setelahnya.',
      'Memotong botol dengan cutter/gunting didampingi guru.',
      'Menumbuk arang menimbulkan debu — lakukan di luar ruangan, basahi sedikit, dan pakai masker.'
    ],
    langkah: [
      'Potong dasar botol, lalu balik botol sehingga leher botol berada di bawah.',
      'Sumbat leher botol dengan kapas/kain kasa.',
      'Isi lapisan dari BAWAH ke atas sesuai urutan rancanganmu (lapisan 4 diisi pertama, lapisan 1 terakhir) dengan ketebalan seperti di bawah.',
      'Bilas saringan dengan air bersih 2–3 kali sampai air yang keluar tidak hitam lagi.',
      'Letakkan gelas di bawah botol. Tuangkan 1 liter air keruh pelan-pelan; nyalakan stopwatch sejak tuangan pertama.',
      'Hentikan stopwatch saat tetesan berhenti. Catat waktunya.',
      'Uji kejernihan: letakkan gelas air awal dan air hasil di depan kertas bertulisan; nilai 1 (keruh) sampai 5 (tulisan sangat jelas).',
      'Cium bau air hasil (kibaskan tangan di atas gelas, jangan dihirup langsung); nilai 0–3.',
      'Jika rancanganmu mengulang penyaringan, tuang lagi air hasil dan catat total waktunya.'
    ],
    takaran: v => {
      const lapis = [v.lapis1, v.lapis2, v.lapis3, v.lapis4].filter(x => x && x !== 'kosong');
      const tebal = m => m === 'pasir' ? +v.tebalPasir : m === 'arang' ? +v.tebalArang : m === 'kerikil' ? 4 : 3;
      const nama = { kerikil: 'kerikil', ijuk: 'ijuk', pasir: 'pasir halus', arang: 'arang' };
      const ml = cm => Math.round(cm * 64); // luas penampang botol 1,5 L ± 64 cm²
      return [
        `Urutan mengisi dari bawah: ${[...lapis].reverse().map(m => `${nama[m]} ${tebal(m)} cm`).join(' → ')}.`,
        ...lapis.filter(m => m === 'pasir' || m === 'arang').map(m => `${nama[m][0].toUpperCase() + nama[m].slice(1)} ${tebal(m)} cm ≈ ${ml(tebal(m))} mL (± ${fxd(ml(tebal(m)) / 250)} gelas belimbing).`),
        `Penyaringan diulang ${v.ulang} kali.`,
        'Tinggi 1 cm lapisan dalam botol 1,5 L ≈ 64 mL bahan.'
      ];
    },
    ukur: [
      { id: 'waktu', label: 'Waktu menyaring 1 L', satuan: 'menit', sim: 'waktu' },
      { id: 'bau', label: 'Skala bau (0–3)', satuan: '', sim: 'bau' },
      { id: 'jernih', label: 'Kejernihan (1–5)', satuan: '' }
    ],
    masalah: [
      { gejala: 'Air yang keluar berwarna hitam', kunci: 'hitam|arang', petunjuk: ['Lapisan apa yang berada paling bawah? Apa yang bisa ikut terbawa air?', 'Sudahkah saringan dibilas air bersih sebelum dipakai?'] },
      { gejala: 'Air mengalir sangat lambat atau macet', kunci: 'lambat|macet|tidak keluar|lama', petunjuk: ['Lapisan halus berada di mana? Apa yang terjadi jika kotoran kasar langsung mengenai pasir?', 'Apakah sumbat kapas di leher botol terlalu padat?'] },
      { gejala: 'Air hasil masih keruh', kunci: 'keruh|kotor', petunjuk: ['Lapisan mana yang bertugas menahan partikel halus? Seberapa tebal lapisan itu?', 'Apakah pasir sudah dicuci bersih sebelum dipakai?'] },
      { gejala: 'Pasir ikut keluar bersama air', kunci: 'pasir keluar|pasir ikut|butir', petunjuk: ['Apa yang menahan pasir agar tidak jatuh ke leher botol?', 'Bagaimana jika lapisan paling bawah diganti bahan yang lebih kasar?'] }
    ]
  },
  pendingin: {
    waktu: '1 × 40 menit membuat + pengamatan beberapa jam',
    alat: [
      'Kotak sesuai rancanganmu: kotak styrofoam bekas, kardus berlapis, kardus ganda berisi sekam padi, atau kotak papan',
      'Lakban, gunting/cutter (dengan pendampingan guru)',
      'Cat atau kertas putih/hitam untuk warna luar (sesuai rancangan)',
      'Karet/spons tipis atau kain untuk merapatkan tutup',
      'Es batu dalam kantong plastik tertutup, timbangan dapur',
      'Nampan atau baskom sebagai alas kotak',
      'Termometer (bila ada) dan jam/HP untuk mencatat waktu'
    ],
    keselamatan: [
      'JANGAN memakai es kering (dry ice) — bisa membakar kulit dan membuat sesak napas di ruang tertutup.',
      'Cutter/gunting dipakai dengan pendampingan guru.',
      'Letakkan kotak di atas nampan agar air lelehan tidak membuat lantai licin.',
      'Jauhkan kotak dari kompor dan sumber api.',
      'Sekam padi berdebu — pakai masker saat mengisi dinding.'
    ],
    langkah: [
      'Siapkan kotak sesuai bahan dan tebal dinding rancanganmu. Ukur dan catat ukuran bagian dalamnya.',
      'Beri warna luar sesuai rancangan (cat atau tempel kertas).',
      'Jika memilih tutup rapat, tempelkan karet/spons tipis di pinggir tutup.',
      'Timbang es (dalam kantong plastik tertutup) sesuai rancangan, lalu masukkan ke kotak dan tutup.',
      'Letakkan kotak di tempat yang suhunya mirip rancanganmu (misalnya teras). Catat suhu udara dan jam mulai.',
      'Setiap 1 jam: buka sebentar, buang air lelehan, timbang sisa es, tutup kembali secepatnya.',
      'Catat jam saat es habis. Jika tidak bisa menunggu, gunakan massa es yang mencair selama 3 jam untuk memperkirakan lama es bertahan.',
      'Timbang kotak kosong di akhir percobaan.'
    ],
    takaran: v => {
      const hasil = [
        `Bahan dinding: ${({ styrofoam: 'styrofoam', sekam: 'sekam padi di antara dua lapis kardus/papan tipis', kardus: 'kardus berlapis', kayu: 'papan kayu' })[v.bahan]}, tebal ${v.tebal} cm.`,
        `Es ${fxd(v.es)} kg ≈ ${fxd(v.es)} kantong es 1 kg; warna luar ${v.warna}; tutup ${v.tutup === 'rapat' ? 'rapat (pakai karet)' : 'dibiarkan ada celah'}.`,
        'Simulasi memakai ruang dalam 40 × 30 × 30 cm. Jika kotakmu lebih kecil, kurangi es sebanding dengan volume kotak agar hasilnya bisa dibandingkan.',
        'Perkiraan lama es bertahan dari data 3 jam: (massa es awal ÷ massa es yang mencair dalam 3 jam) × 3 jam.'
      ];
      if (v.bahan === 'sekam') hasil.push(`Isi rongga dinding ${v.tebal} cm dengan sekam dan padatkan pelan-pelan.`);
      return hasil;
    },
    ukur: [
      { id: 'tahan', label: 'Lama es bertahan (atau perkiraan)', satuan: 'jam', sim: 'tahan' },
      { id: 'leleh3', label: 'Es mencair dalam 3 jam', satuan: 'g' },
      { id: 'massaKotak', label: 'Massa kotak kosong', satuan: 'kg', sim: 'massaKotak' }
    ],
    masalah: [
      { gejala: 'Es habis jauh lebih cepat dari simulasi', kunci: 'cepat|habis|cair', petunjuk: ['Berapa kali dan berapa lama kotak dibuka? Apa yang terjadi pada udara dingin di dalamnya?', 'Apakah ada celah di sudut atau tutup yang tidak ada di rancangan?'] },
      { gejala: 'Tutup tidak bisa rapat', kunci: 'tutup|celah|rapat', petunjuk: ['Bahan apa di sekitarmu yang lentur dan bisa mengisi celah?', 'Menurut kartu konsep, perpindahan kalor jenis apa yang terjadi lewat celah?'] },
      { gejala: 'Kotak basah atau lembek', kunci: 'basah|lembek|lembap', petunjuk: ['Dari mana air itu berasal — lelehan es atau embun di luar kotak?', 'Bagaimana cara menjaga air lelehan tidak menyentuh dinding kardus?'] },
      { gejala: 'Sulit menimbang sisa es', kunci: 'timbang|menimbang', petunjuk: ['Bisakah kamu menimbang air lelehan saja, lalu menghitung sisa es?', 'Apa yang harus dijaga tetap sama setiap kali menimbang agar datanya adil?'] }
    ]
  },
  hidroponik: {
    waktu: '± 4 minggu (semai 7 hari + tanam 21 hari), 10 menit pengamatan tiap 3 hari',
    alat: [
      'Benih sawi, rockwool atau spons, dan netpot (atau gelas plastik yang dilubangi)',
      'Wadah gelap tertutup (bekas es krim/styrofoam) yang tutupnya dilubangi untuk netpot',
      'Nutrisi AB mix (toko pertanian) dan TDS meter bila ada',
      'Tempat terang dekat jendela, atau lampu LED tumbuh dengan timer (dipasang oleh orang dewasa)',
      'Pompa aerator akuarium (opsional)',
      'Penggaris, timbangan dapur, sarung tangan'
    ],
    keselamatan: [
      'Nutrisi AB mix bukan makanan/minuman — pakai sarung tangan, simpan jauh dari anak kecil, cuci tangan setelahnya.',
      'Listrik dan air tidak boleh bersentuhan: lampu dan stopkontak dipasang orang dewasa, jauh dari wadah air.',
      'Jangan menyentuh lampu yang sedang panas.',
      'Jangan membakar apa pun untuk menambah CO₂ — cukup jaga ventilasi ruangan.',
      'Cuci bersih sawi hasil panen sebelum dimakan.'
    ],
    langkah: [
      'Semai benih di rockwool/spons basah. Tempatkan di tempat teduh 2–3 hari, lalu di tempat terang.',
      'Setelah 3–4 daun (± hari ke-7), pindahkan bibit ke netpot pada tutup wadah.',
      'Buat larutan nutrisi: larutkan pekatan A dan B ke air SECARA TERPISAH (jangan campurkan pekatan A dan B langsung). Sesuaikan kepekatan dengan rancanganmu.',
      'Pastikan ujung akar menyentuh larutan. Tutup wadah agar larutan tidak kena cahaya (mencegah lumut).',
      'Atur cahaya: lama penyinaran sesuai rancangan (pakai timer) dan jarak lampu ≥ 20 cm dari daun.',
      'Setiap 3 hari: ukur tinggi tanaman dan hitung daun, cek volume dan kepekatan larutan.',
      'Hari ke-21: panen, bersihkan akar, lalu timbang.'
    ],
    takaran: v => [
      `Kepekatan nutrisi ${v.nutrisi} ppm. Perkiraan umum: ± ${fxd(+v.nutrisi / 1000 * 5)} mL pekatan A + ${fxd(+v.nutrisi / 1000 * 5)} mL pekatan B per liter air — selalu cek petunjuk kemasan / TDS meter.`,
      `Lampu menyala ${v.jam} jam/hari; warna ${({ merahbiru: 'merah + biru', putih: 'putih', hijau: 'hijau' })[v.warnaLed]}. Intensitas ${v.cahaya}%: atur dengan jarak lampu (makin dekat makin terang, tetap ≥ 20 cm).`,
      `Suhu ruang ± ${v.suhu} °C. Jika pakai sinar matahari, catat berapa jam tempatmu terkena cahaya langsung.`,
      `CO₂ ${({ rendah: 'rendah', normal: 'normal', tinggi: 'tinggi' })[v.co2]} di simulasi — di sekolah cukup jaga ventilasi (anggap normal).`
    ],
    ukur: [
      { id: 'massa', label: 'Massa sawi hari ke-21', satuan: 'g', sim: 'massa' },
      { id: 'tinggi', label: 'Tinggi tanaman', satuan: 'cm' },
      { id: 'daun', label: 'Jumlah daun', satuan: 'helai' }
    ],
    masalah: [
      { gejala: 'Daun menguning', kunci: 'kuning', petunjuk: ['Berapa kepekatan larutanmu sekarang? Apakah sudah diganti/ditambah?', 'Daun yang menguning daun tua atau muda? Apa yang bisa kamu simpulkan?'] },
      { gejala: 'Batang panjang kurus dan pucat', kunci: 'kurus|pucat|panjang|tinggi', petunjuk: ['Berapa jam dan seberapa dekat tanaman mendapat cahaya?', 'Di simulasi, faktor apa yang menyebabkan tanaman "pucat memanjang"?'] },
      { gejala: 'Daun layu', kunci: 'layu', petunjuk: ['Apakah ujung akar masih menyentuh larutan?', 'Bagaimana suhu ruangan dan kepekatan larutan? Ingat konsep osmosis di kartu konsep.'] },
      { gejala: 'Akar cokelat, berbau, atau berlumut', kunci: 'akar|lumut|bau|busuk', petunjuk: ['Apakah larutan terkena cahaya langsung? Apa yang tumbuh di air yang terkena cahaya?', 'Kapan terakhir larutan diganti? Adakah udara (oksigen) untuk akar?'] }
    ]
  },
  roket: {
    waktu: '2 × 40 menit (membuat + peluncuran di lapangan)',
    alat: [
      'Botol plastik bekas minuman bersoda (lebih kuat) sesuai ukuran rancangan',
      'Sumbat gabus/karet yang pas dengan mulut botol',
      'Karton tebal untuk sirip dan kerucut, lakban',
      'Cuka (cuka dapur 5% atau cuka 20% botol 125 mL yang diencerkan) dan soda kue',
      'Tisu, gelas takar, sendok teh, timbangan dapur',
      'Peluncur: 3 tongkat/bata agar botol bisa berdiri miring, busur derajat',
      'Meteran 30 m (atau tali yang ditandai tiap 1 m), patok/kapur',
      'Kacamata pelindung untuk SEMUA orang di area peluncuran'
    ],
    keselamatan: [
      'Semua orang di area peluncuran wajib memakai kacamata pelindung.',
      'Peluncuran di lapangan terbuka dengan pendampingan guru; penonton di belakang garis aman 5 m dan tidak ada orang di arah luncur.',
      'Hanya botol PLASTIK bekas minuman bersoda — jangan botol kaca, botol retak, atau penyok.',
      'Pakai cuka dapur 5% atau cuka 20% yang SUDAH diencerkan (1 bagian cuka + 4 bagian air). Jangan memakai cuka 20% langsung, cuka biang, atau asam lain. Bila cuka mengenai mata atau kulit, segera bilas dengan air mengalir.',
      'Jika roket tidak meluncur: JANGAN didekati/diintip. Tunggu minimal 2 menit, lalu guru membuka sumbat dengan wajah dan tubuh menjauh dari mulut botol.',
      'Jangan mengarahkan roket ke orang, jendela, kendaraan, atau kabel listrik.'
    ],
    langkah: [
      'Buat 3–4 sirip dan kerucut dari karton. Tempelkan pada botol — dasar botol menjadi ujung atas roket, mulut botol di bawah.',
      'Siapkan peluncur di lapangan dengan sudut sesuai rancangan (periksa dengan busur). Tandai titik peluncuran dan zona target 15–25 m.',
      'Takar cuka dengan gelas takar, masukkan ke botol.',
      'Timbang soda kue. Jika rancanganmu memakai tisu, bungkus soda kue dengan tisu seperti permen.',
      'Semua orang memakai kacamata. Masukkan soda kue ke botol, SEGERA sumbat rapat, kocok 2 kali.',
      'Letakkan roket di peluncur (sumbat di bawah), lalu SEGERA mundur ke belakang garis aman 5 m.',
      'Tunggu roket meluncur; catat waktu tunggunya. Ukur jarak dari peluncur ke titik jatuh PERTAMA.',
      'Catat kondisi angin. Bilas botol dengan air sebelum uji berikutnya.'
    ],
    takaran: v => [
      `Cuka ${v.cuka} mL ≈ ${fxd(+v.cuka / 250)} gelas belimbing (250 mL).`,
      `Soda kue ${v.soda} g ≈ ${fxd(+v.soda / 5)} sendok teh peres (1 sdt ≈ 5 g) — lebih tepat bila ditimbang.`,
      v.kadar === 'encer' ? 'Jenis cuka: cuka dapur 5% dicampur air sama banyak (jadi 2,5%).'
        : v.kadar === 'pekat20encer' ? `Jenis cuka: cuka 20% diencerkan — ${Math.round(+v.cuka / 5)} mL cuka 20% + ${Math.round(+v.cuka * 4 / 5)} mL air (± ${fxd(+v.cuka / 5 / 125)} botol 125 mL). Tuang cuka ke dalam air, lalu aduk pelan.`
        : v.kadar === 'pekat20' ? '⚠️ Cuka 20% tanpa diencerkan TIDAK BOLEH dipakai di praktik nyata. Ubah rancanganmu ke cuka 20% yang diencerkan, lalu uji ulang di laboratorium maya.'
        : 'Jenis cuka: cuka dapur 5% tanpa dicampur.',
      `Botol ${v.botol === '1500' ? '1,5 L' : '600 mL'}; soda kue ${v.bungkus === 'tisu' ? 'dibungkus tisu' : 'dituang langsung'}; sudut peluncur ${v.sudut}° dari tanah.`
    ],
    ukur: [
      { id: 'jarak', label: 'Jarak mendarat', satuan: 'm', sim: 'jarak' },
      { id: 'tunggu', label: 'Waktu tunggu meluncur', satuan: 'detik' },
      { id: 'biaya', label: 'Biaya nyata', satuan: 'Rp', sim: 'biaya' }
    ],
    masalah: [
      { gejala: 'Roket tidak meluncur / sumbat tidak lepas', kunci: 'tidak meluncur|tidak lepas|diam|macet', petunjuk: ['KESELAMATAN DULU: jangan dekati botol. Tunggu 2 menit, guru yang membuka sumbat dengan wajah menjauh.', 'Setelah aman: apakah sumbat terlalu rapat, atau gasnya terlalu sedikit karena pereaksi pembatas?'] },
      { gejala: 'Sumbat lepas sebelum botol sempat diletakkan', kunci: 'terlalu cepat|lepas duluan|sebelum', petunjuk: ['Bagaimana cara menunda reaksi agar ada waktu menyumbat dan meletakkan botol?', 'Apakah sumbatnya terlalu longgar?'] },
      { gejala: 'Roket berbelok atau berputar di udara', kunci: 'belok|berputar|oleng|melenceng', petunjuk: ['Apakah sirip terpasang lurus dan sama besar?', 'Di mana titik berat roketmu? Apa pengaruh kerucut di bagian atas?'] },
      { gejala: 'Jarak jauh lebih pendek dari simulasi', kunci: 'pendek|dekat|kurang jauh|beda', petunjuk: ['Berapa lama jeda antara memasukkan soda dan menyumbat? Berapa banyak gas yang lolos?', 'Faktor apa di lapangan (angin, sumbat, berat sirip) yang tidak ada di simulasi?'] }
    ]
  },
  roketair: {
    waktu: '2 × 40 menit (membuat + peluncuran di lapangan)',
    alat: [
      'Botol plastik bekas minuman bersoda (600 mL atau 1,5 L) yang tidak penyok, tergores dalam, atau pernah terkena panas',
      'Sumbat karet yang diberi pentil ban (atau peluncur roket air sekolah)',
      'Pompa sepeda/kaki yang memiliki pengukur tekanan (manometer)',
      'Karton tebal atau plastik map untuk sirip, lakban, gunting',
      'Kerucut dari kertas tebal dan plastisin/tanah liat ± 20 g sebagai beban hidung (bila memakai kerucut)',
      'Gelas takar, busur derajat, meteran 60 m (atau tali bertanda tiap 5 m), patok/kapur',
      'Peluncur dengan tali pelepas panjang (≥ 3 m) dan kacamata pelindung untuk SEMUA orang'
    ],
    keselamatan: [
      'Semua orang di area peluncuran wajib memakai kacamata pelindung.',
      'Tekanan TIDAK BOLEH melebihi 4 bar (± 58 psi) — selalu baca pengukur tekanan pompa, dan pompa dilakukan/diawasi guru.',
      'Hanya botol plastik bekas minuman BERSODA yang utuh — jangan botol air mineral tipis, botol kaca, atau botol retak/penyok.',
      'Peluncuran di lapangan terbuka; penonton di belakang garis aman 5 m dan tidak ada orang, jendela, atau kendaraan di arah luncur.',
      'Jangan pernah berdiri di atas atau di depan roket bertekanan; lepaskan roket dengan tali pelepas dari jarak ≥ 3 m.',
      'Jika roket tidak meluncur: JANGAN didekati dari depan. Guru membuang tekanan lebih dulu (lepas selang/katup pentil) sebelum roket disentuh.'
    ],
    langkah: [
      'Tempelkan 3 sirip sama besar di dekat mulut botol (bagian bawah roket). Bila rancanganmu memakai kerucut, pasang kerucut berbeban di dasar botol (ujung atas roket).',
      'Pastikan sumbat berpentil masuk rapat ke mulut botol dan tidak bocor.',
      'Takar air dengan gelas takar sesuai rancangan, lalu masukkan ke botol.',
      'Pasang sumbat, lalu letakkan roket di peluncur. Atur sudut peluncur dengan busur.',
      'Semua orang memakai kacamata dan berdiri di belakang garis aman. Hubungkan selang pompa ke pentil.',
      'Pompa perlahan sambil membaca pengukur tekanan. Berhenti tepat di tekanan rancanganmu — maksimal 4 bar.',
      'Hitung mundur, lalu tarik tali pelepas dari jarak aman.',
      'Ukur jarak dari peluncur ke titik jatuh pertama. Ukur lama terbang dengan stopwatch. Catat arah dan kekuatan angin.',
      'Ulangi dengan rancangan yang sama minimal 2 kali, lalu ubah SATU variabel saja.'
    ],
    takaran: v => [
      `Air ${v.air} mL ≈ ${fxd(+v.air / 250)} gelas belimbing (250 mL) — ${Math.round(+v.air / +v.botol * 100)}% dari volume botol.`,
      `Tekanan ${fxd(v.tekanan)} bar ≈ ${Math.round(+v.tekanan * 14.5)} psi (banyak pengukur pompa sepeda memakai satuan psi).${+v.tekanan > 4 ? ' ⚠ MELEBIHI batas aman 4 bar — turunkan dulu di simulasi!' : ''}`,
      `Botol ${v.botol === '1500' ? '1,5 L' : '600 mL'}; penstabil: ${({ tanpa: 'tanpa sirip', sirip: '3 sirip karton', kerucut: '3 sirip + kerucut berbeban ± 20 g' })[v.stabil]}.`,
      `Sudut peluncur ${v.sudut}° dari tanah (ukur dengan busur).`
    ],
    ukur: [
      { id: 'jarak', label: 'Jarak mendarat', satuan: 'm', sim: 'jarak' },
      { id: 'waktu', label: 'Lama terbang', satuan: 's', sim: 'waktu' },
      { id: 'tekanan', label: 'Tekanan terbaca saat lepas', satuan: 'bar' }
    ],
    masalah: [
      { gejala: 'Roket tidak lepas dari peluncur', kunci: 'tidak lepas|tidak meluncur|macet|diam', petunjuk: ['KESELAMATAN DULU: jangan dekati roket dari depan. Guru membuang tekanan lewat katup/selang sebelum roket disentuh.', 'Setelah aman: apakah pengait peluncur terlalu kencang, atau sumbat terlalu rapat?'] },
      { gejala: 'Air bocor saat dipompa', kunci: 'bocor|menetes|rembes', petunjuk: ['Di mana tepatnya air keluar — di sekeliling sumbat atau di pentil?', 'Apa akibat kebocoran bagi tekanan maksimum yang bisa dicapai?'] },
      { gejala: 'Roket berputar atau jatuh dekat', kunci: 'berputar|oleng|jatuh dekat|melenceng|belok', petunjuk: ['Apakah sirip sama besar dan terpasang lurus?', 'Di mana titik berat roketmu? Apa pengaruh beban di bagian depan?'] },
      { gejala: 'Jarak jauh berbeda dari simulasi', kunci: 'beda|berbeda|pendek|jauh', petunjuk: ['Apakah tekanan saat lepas sama dengan tekanan rancangan? Adakah tekanan yang hilang lewat kebocoran?', 'Faktor apa di lapangan (angin, bentuk sirip, berat lakban) yang tidak ada di simulasi?'] }
    ]
  },
  jembatan: {
    waktu: '3 × 40 menit (merakit, menunggu lem kering 1 malam, lalu uji beban)',
    alat: [
      'Stik es krim (± 120 buah) — pilih yang lurus dan tidak retak',
      'Lem sesuai rancangan: lem kayu PVAc (paling kuat, kering 1 malam), lem tembak, atau lem kertas',
      'Kertas pola bergaris, penggaris, pensil, penjepit jemuran/klip untuk menahan saat lem mengering',
      'Dua meja/tumpukan buku yang berjarak 40 cm sebagai tumpuan',
      'Tali, gantungan (hanger/S-hook), dan ember kecil sebagai wadah beban',
      'Beban: botol air 1,5 L (± 1,5 kg) atau pasir yang ditimbang per 1 kg; timbangan',
      'Kacamata pelindung dan kardus/bantal di bawah jembatan'
    ],
    keselamatan: [
      'Lem tembak panas — jangan menyentuh ujung pistol dan lelehan lem; letakkan pistol di atas alas tahan panas.',
      'Pakai kacamata saat uji beban: stik bisa patah dan serpihannya terlempar.',
      'Letakkan kardus/bantal di bawah ember beban agar tidak menimpa kaki saat jembatan runtuh.',
      'Tambah beban pelan-pelan dari samping; jangan menaruh tangan atau kaki di bawah jembatan yang dibebani.',
      'Rapikan serpihan stik yang tajam setelah pengujian.'
    ],
    langkah: [
      'Gambar pola rangka sesuai rancanganmu dalam ukuran asli (bentang 40 cm, tinggi sesuai rancangan) di kertas.',
      'Buat DUA rangka sisi yang sama persis di atas pola. Tumpuk stik sesuai jumlah lapis rancangan; sambungan antarstik dibuat berselang-seling (tidak di tempat yang sama pada setiap lapis).',
      'Jepit sambungan dan biarkan lem kering (lem kayu: 1 malam).',
      'Hubungkan kedua rangka dengan stik lantai (± 20 buah) dan pengaku silang di bagian atas, sehingga lebar jembatan ± 8 cm.',
      'Hitung jumlah stik dan timbang jembatan kosong.',
      'Letakkan jembatan di atas dua tumpuan berjarak 40 cm. Gantung ember di TENGAH lantai jembatan dengan tali.',
      'Tambahkan beban 1 kg demi 1 kg sambil mengamati: bagian mana yang melengkung, berbunyi, atau patah lebih dulu.',
      'Catat beban terakhir sebelum jembatan runtuh (beban maksimum), lalu foto bagian yang patah.'
    ],
    takaran: v => {
      const nama = { balok: 'balok datar', warren: 'rangka Warren (segitiga berselang-seling)', pratt: 'rangka Pratt (diagonal miring ke arah tengah)', howe: 'rangka Howe (diagonal miring ke arah tumpuan)', lengkung: 'busur' }[v.desain];
      const h = hitungJembatan(v);
      return [
        `Bentuk: ${nama}; tinggi ${v.tinggi} cm; setiap batang ${v.lapis} lapis stik; direkatkan dengan ${LEM_JEMBATAN[v.lem].nama.replace(/^Lem /, 'lem ')}.`,
        `Perkiraan kebutuhan: ${h.stik} stik (termasuk ± 20 stik lantai${v.desain === 'balok' ? '' : ' dan 10 stik pengaku silang'}), massa ± ${h.massa} g.`,
        `Menurut simulasi, bagian yang paling mungkin gagal lebih dulu: ${h.lemah.toLowerCase()} — beri perhatian khusus pada bagian ini saat merakit.`,
        `Prediksi beban maksimum ± ${fxd(h.bebanMaks)} kg ≈ ${fxd(h.bebanMaks / 1.5)} botol air 1,5 L.`
      ];
    },
    ukur: [
      { id: 'bebanMaks', label: 'Beban maksimum nyata', satuan: 'kg', sim: 'bebanMaks' },
      { id: 'massa', label: 'Massa jembatan', satuan: 'g', sim: 'massa' },
      { id: 'stik', label: 'Jumlah stik terpakai', satuan: 'stik', sim: 'stik' }
    ],
    masalah: [
      { gejala: 'Sambungan lepas sebelum stik patah', kunci: 'lepas|sambungan|lem', petunjuk: ['Apakah lemnya sudah benar-benar kering? Berapa lama kamu menunggu?', 'Seberapa luas bidang stik yang saling menempel di sambungan itu?'] },
      { gejala: 'Batang atas melengkung ke samping', kunci: 'melengkung|menekuk|bengkok|samping', petunjuk: ['Batang atas menerima gaya apa — tekan atau tarik?', 'Apa yang terjadi pada batang tekan jika dibuat lebih tebal atau diberi pengaku silang lebih rapat?'] },
      { gejala: 'Jembatan terpuntir atau miring', kunci: 'puntir|terpuntir|miring|goyang|guling', petunjuk: ['Apakah kedua rangka sisi sama persis dan dipasang tegak?', 'Seberapa tinggi rangkamu dibanding lebar jembatannya?'] },
      { gejala: 'Beban maksimum jauh berbeda dari simulasi', kunci: 'beda|berbeda|jauh|lebih kecil', petunjuk: ['Apakah beban benar-benar tepat di tengah dan ditambah pelan-pelan?', 'Faktor apa di jembatan nyata (stik bengkok, lem tidak rata, sambungan sejajar) yang tidak ada di simulasi?'] }
    ]
  },
  angin: {
    waktu: '3 × 40 menit (membuat bilah, merakit, uji dengan kipas angin lalu di luar ruangan)',
    alat: [
      'Bahan bilah sesuai rancangan: pipa PVC 3–4 inci yang dibelah, triplek tipis, kardus, atau botol plastik',
      'Generator: motor DC bekas mainan (± 3–6 V) atau dinamo lampu sepeda',
      'Tutup botol/lingkaran triplek sebagai poros (hub), baut kecil, lem tembak',
      'Gir/puli dari mainan bekas bila rancangan memakai gir',
      'Tiang kayu/pipa ± 1–1,5 m dan dudukan yang kokoh',
      'Lampu LED 3 V + kabel, multimeter (untuk tegangan & arus)',
      'Kipas angin berdiri untuk uji di dalam ruangan; anemometer atau aplikasi pengukur angin di HP bila ada'
    ],
    keselamatan: [
      'Bilah yang berputar bisa melukai: jangan menyentuh atau mendekatkan wajah ke kincir yang sedang berputar; hentikan dulu dengan menahan porosnya dari belakang.',
      'Memotong pipa PVC/triplek dengan gergaji atau cutter harus didampingi guru; haluskan tepi bilah yang tajam.',
      'Pasang kincir JAUH dari kabel listrik PLN dan jangan memanjat untuk memasangnya — tiang cukup ± 1,5 m, diikat kokoh.',
      'Listrik dari kincir hanya untuk LED kecil. JANGAN pernah menghubungkannya ke stopkontak atau listrik rumah.',
      'Saat uji dengan kipas angin, jangan memasukkan jari ke kipas; letakkan kipas di lantai yang stabil.',
      'Hentikan uji di luar ruangan bila angin terlalu kencang atau cuaca buruk (petir).'
    ],
    langkah: [
      'Buat bilah sesuai panjang, jumlah, dan bahan rancanganmu. Buat semua bilah sama persis (timbang agar massanya sama).',
      'Pasang bilah pada hub dengan sudut bilah sesuai rancangan (ukur dengan busur terhadap bidang putar).',
      'Pasang hub pada poros generator (langsung, atau lewat gir sesuai rancangan). Putar dengan tangan: harus seimbang dan tidak menggesek.',
      'Pasang generator di ujung tiang; tambahkan ekor pengarah dari karton agar kincir menghadap angin.',
      'Hubungkan generator ke LED dan multimeter. Ukur TEGANGAN (V) di kaki LED, lalu ARUS (A) yang lewat LED.',
      'Uji di depan kipas angin: ukur kecepatan angin di posisi kincir (atau catat nomor kecepatan kipas dan jaraknya). Catat kecepatan angin terendah saat kincir mulai berputar.',
      'Hitung daya listrik: P = V × I. Ulangi pada beberapa kecepatan angin.',
      'Uji di luar ruangan (tepi pantai/lapangan terbuka) pada sore hari dan bandingkan hasilnya.'
    ],
    takaran: v => {
      const bahan = { pvc: 'pipa PVC dibelah memanjang (bentuk lengkung seperti sayap)', triplek: 'triplek tipis', kardus: 'kardus', botol: 'botol plastik' }[v.bahan];
      const h = hitungAngin({ ...v, angin: 4 });
      return [
        `${v.bilah} bilah dari ${bahan}, panjang ${v.jari} cm dari pusat poros (diameter kincir ${+v.jari * 2} cm), sudut bilah ${v.sudutBilah}°.`,
        `Generator: ${GENERATOR[v.generator].nama[0].toLowerCase() + GENERATOR[v.generator].nama.slice(1)}${+v.gir > 1 ? `, gir 1 : ${v.gir} (roda gigi besar di poros kincir, kecil di generator)` : ', dipasang langsung tanpa gir'}.`,
        `Prediksi simulasi: mulai berputar pada angin ± ${fxd(h.mulai)} m/s; pada angin 4 m/s daya ± ${fxd(h.daya4, 2)} W.`,
        `Cara mengukur daya: P (watt) = V (volt) × I (ampere). Contoh: 3 V × 0,2 A = 0,6 W.`
      ];
    },
    ukur: [
      { id: 'mulai', label: 'Angin saat mulai berputar', satuan: 'm/s', sim: 'mulai' },
      { id: 'daya', label: 'Daya listrik (V × I) pada angin uji', satuan: 'W', sim: 'daya' },
      { id: 'angin', label: 'Kecepatan angin saat uji', satuan: 'm/s' }
    ],
    masalah: [
      { gejala: 'Kincir tidak mau berputar', kunci: 'tidak berputar|tidak mau|diam|macet', petunjuk: ['Putar dengan tangan: apakah terasa berat karena generator atau karena gesekan?', 'Bagaimana pengaruh sudut bilah dan gir terhadap kemudahan mulai berputar menurut simulasi?'] },
      { gejala: 'Kincir berputar tetapi LED tidak menyala', kunci: 'tidak menyala|led|lampu', petunjuk: ['LED hanya menyala bila kakinya terpasang di kutub yang benar — sudah dicoba dibalik?', 'Berapa tegangan yang terbaca multimeter? LED umumnya butuh sekitar 2–3 V.'] },
      { gejala: 'Kincir bergetar keras', kunci: 'getar|goyang|oleng', petunjuk: ['Apakah semua bilah sama panjang dan sama massanya?', 'Apakah hub terpasang tepat di tengah poros?'] },
      { gejala: 'Daya jauh lebih kecil dari simulasi', kunci: 'kecil|beda|berbeda|lemah', petunjuk: ['Seberapa tepat kamu mengukur kecepatan angin di posisi kincir? Ingat daya bergantung pada v³.', 'Energi apa yang hilang di dunia nyata (gesekan, panas di kabel) yang tidak dihitung simulasi?'] }
    ]
  },
  listrik: {
    waktu: '2 × 40 menit',
    alat: [
      'Baterai AA 1,5 V (sesuai rancangan) dan dudukan baterai 2–4 slot dengan kabel',
      'LED putih 5 mm atau bohlam senter 2,5 V beserta fittingnya',
      'Resistor 22 Ω, 47 Ω, 100 Ω, 220 Ω (warna gelang: merah-merah-hitam, kuning-ungu-hitam, cokelat-hitam-cokelat, merah-merah-cokelat)',
      'Kabel jumper dan penjepit buaya, saklar kecil',
      'Papan rangkaian (breadboard) atau karton tebal + selotip',
      'Multimeter untuk mengukur tegangan (V) dan arus (mA)'
    ],
    keselamatan: [
      'Hanya memakai baterai AA — JANGAN pernah bereksperimen dengan listrik PLN atau stopkontak.',
      'Jangan menghubungkan kutub + dan − baterai langsung dengan kabel (hubung singkat): baterai dan kabel bisa panas hingga melukai.',
      'Jangan memakai baterai yang bocor, menggembung, atau berkarat; jangan membuka atau membakar baterai.',
      'Lepas baterai dari dudukannya setiap kali mengubah rangkaian.',
      'Bohlam pijar bisa panas — jangan disentuh setelah menyala lama.',
      'Buang baterai bekas di tempat sampah khusus (limbah B3), bukan ke tempat sampah biasa atau laut.'
    ],
    langkah: [
      'Gambar diagram rangkaianmu lebih dulu (simbol baterai, saklar, resistor, lampu) sesuai susunan rancangan.',
      'Pasang baterai ke dudukan — pastikan arah + dan − sesuai tanda di dudukan.',
      'Rangkai lampu sesuai susunan (seri: berderet satu jalur; paralel: tiap lampu punya cabang sendiri).',
      'Untuk LED: kaki PANJANG (+) menghadap ke arah kutub + baterai. Pasang satu resistor berderet dengan tiap LED.',
      'Pasang saklar pada kabel dari kutub + baterai. Periksa ulang seluruh sambungan SEBELUM saklar dinyalakan.',
      'Nyalakan saklar. Ukur tegangan baterai (multimeter di mode V, dipasang sejajar dengan baterai).',
      'Ukur arus total (multimeter di mode mA, dipasang BERDERET di kabel utama).',
      'Uji cadangan: cabut satu lampu, amati apakah lampu lain tetap menyala. Hitung perkiraan lama nyala = 2000 mAh ÷ arus total.'
    ],
    takaran: v => {
      const h = hitungListrik({ ...v, cabut: 'tidak' });
      const L = LAMPU_LISTRIK[v.jenisLampu];
      return [
        `${v.baterai} baterai AA disusun seri → ${fxd(+v.baterai * 1.5)} V.`,
        `${v.lampu} × ${v.jenisLampu === 'led' ? L.nama : L.nama.toLowerCase()} disusun ${v.susunan === 'seri' ? 'SERI (berderet dalam satu jalur)' : 'PARALEL (setiap lampu punya cabang sendiri)'}${+v.resistor > 0 ? `, tiap lampu diberi resistor ${v.resistor} Ω` : ', tanpa resistor'}.`,
        `Prediksi simulasi: arus total ± ${h.arus} mA, arus tiap lampu ± ${h.arusLampu} mA, cahaya ± ${fxd(h.cahaya)} lumen, baterai tahan ± ${fxd(h.tahan)} jam.`,
        v.jenisLampu === 'led' ? 'Ingat: kaki LED yang lebih panjang adalah kutub + (anoda).' : 'Bohlam pijar tidak punya kutub, tetapi cepat panas dan boros baterai.'
      ];
    },
    ukur: [
      { id: 'arus', label: 'Arus total terukur', satuan: 'mA', sim: 'arus' },
      { id: 'tegangan', label: 'Tegangan baterai terukur', satuan: 'V', sim: 'tegangan' },
      { id: 'nyala', label: 'Jumlah lampu menyala', satuan: 'buah', sim: 'nyala' }
    ],
    masalah: [
      { gejala: 'LED tidak menyala sama sekali', kunci: 'tidak menyala|mati|padam', petunjuk: ['Apakah kaki panjang LED sudah menghadap ke kutub + baterai?', 'Berapa tegangan baterai dibanding tegangan kerja LED (± 2,9 V per LED)? Bagaimana jika LED-nya disusun seri?'] },
      { gejala: 'Lampu menyala sangat redup', kunci: 'redup|lemah|kurang terang', petunjuk: ['Berapa arus yang terbaca multimeter? Bandingkan dengan arus ideal LED ± 20 mA.', 'Resistor mana yang kamu pakai? Apa hubungan besar hambatan dengan arus menurut Hukum Ohm?'] },
      { gejala: 'Baterai atau kabel terasa panas', kunci: 'panas|hangat|bau|asap', petunjuk: ['KESELAMATAN DULU: segera lepas baterai dari dudukannya dan jangan disentuh sampai dingin.', 'Setelah aman: periksa apakah ada kabel yang menghubungkan + dan − secara langsung (hubung singkat) tanpa melewati lampu.'] },
      { gejala: 'Satu lampu mati, yang lain ikut mati', kunci: 'ikut mati|semua mati|ikut padam', petunjuk: ['Apakah semua lampumu berada dalam satu jalur saja?', 'Bagaimana susunan yang membuat setiap lampu punya jalur sendiri?'] }
    ]
  },
  magnet: {
    waktu: '2 × 40 menit',
    alat: [
      'Paku besi besar ± 10 cm (inti besi lunak); bila ingin membandingkan: baut baja dan batang aluminium',
      'Kawat email tembaga 0,3 mm atau 0,6 mm (± 5–12 m, sesuai jumlah lilitan)',
      'Amplas halus untuk mengupas lapisan email di ujung kawat',
      'Baterai AA dan dudukannya, saklar kecil, selotip',
      'Paku kecil, klip kertas, dan potongan kaleng aluminium untuk diuji',
      'Tiang dan lengan derek dari kayu/stik es krim, benang untuk menggantung',
      'Kompas kecil dan multimeter (bila ada)'
    ],
    keselamatan: [
      'Nyalakan elektromagnet paling lama ± 10 detik tiap uji, lalu matikan — kawat dan baterai bisa panas.',
      'Jangan menghubungkan ujung kawat langsung ke baterai tanpa lilitan (hubung singkat).',
      'Jika kawat atau baterai terasa panas: segera lepas baterai dan tunggu dingin.',
      'Ujung kawat dan paku tajam — hati-hati saat mengupas dan melilit.',
      'Jauhkan magnet dari HP, laptop, kartu ATM, dan orang yang memakai alat pacu jantung.',
      'Buang baterai bekas di tempat sampah khusus (limbah B3).'
    ],
    langkah: [
      'Sisakan ± 20 cm kawat di awal, lalu lilitkan kawat pada paku besi dengan rapi dan SEARAH, sambil menghitung jumlah lilitan sesuai rancangan.',
      'Rekatkan ujung lilitan dengan selotip agar tidak terurai; sisakan ± 20 cm kawat di ujung akhir.',
      'Amplas kedua ujung kawat ± 2 cm sampai warna tembaganya mengilap (lapisan email adalah isolator).',
      'Sambungkan ujung kawat ke dudukan baterai lewat saklar. Gantung elektromagnet pada lengan derek.',
      'Nyalakan saklar (maks. 10 detik), turunkan ke tumpukan paku kecil, lalu angkat. Hitung paku yang terangkat.',
      'Arahkan derek ke keranjang lain, matikan saklar. Hitung paku yang masih menempel.',
      'Ulangi dengan klip kertas dan potongan kaleng aluminium. Dekatkan kompas untuk melihat kutub elektromagnet.',
      'Bila ada multimeter, ukur arus sesaat saja. Catat semua hasil.'
    ],
    takaran: v => {
      const h = hitungMagnet({ ...v, benda: 'paku' });
      return [
        `${v.lilitan} lilitan ${KAWAT_MAGNET[v.kawat].nama.toLowerCase()} pada ${INTI_MAGNET[v.inti].nama.toLowerCase()} — butuh kawat ± ${fxd(h.panjang)} m.`,
        `${v.baterai} baterai AA disusun seri (${fxd(+v.baterai * 1.5)} V).`,
        `Prediksi simulasi: arus ± ${fxd(h.arus, 2)} A, mengangkat ± ${h.angkat} paku kecil, ${h.sisa ? `${h.sisa} paku tertahan saat dimatikan` : 'semua paku lepas saat dimatikan'}, panas kawat ± ${fxd(h.panas)} W.`,
        'Tips menghitung lilitan: beri tanda dengan spidol setiap 10 lilitan.'
      ];
    },
    ukur: [
      { id: 'angkat', label: 'Paku kecil terangkat', satuan: 'buah', sim: 'angkat' },
      { id: 'sisa', label: 'Paku tertahan saat OFF', satuan: 'buah', sim: 'sisa' },
      { id: 'arus', label: 'Arus terukur', satuan: 'A', sim: 'arus' }
    ],
    masalah: [
      { gejala: 'Tidak menarik apa pun', kunci: 'tidak menarik|tidak nempel|tidak bisa|tidak kuat', petunjuk: ['Apakah lapisan email di ujung kawat sudah diamplas sampai mengilap?', 'Periksa sambungan: apakah arus benar-benar mengalir? Bagaimana cara mengeceknya dengan kompas?'] },
      { gejala: 'Kawat atau baterai panas', kunci: 'panas|hangat|bau', petunjuk: ['KESELAMATAN DULU: matikan saklar dan lepas baterai, tunggu sampai dingin.', 'Setelah aman: bagaimana jumlah lilitan dan tebal kawat memengaruhi hambatan dan arus?'] },
      { gejala: 'Paku tetap menempel saat dimatikan', kunci: 'menempel|tidak lepas|nempel terus', petunjuk: ['Inti apa yang kamu pakai — besi lunak atau baja?', 'Apa bedanya magnet sementara dan magnet tetap menurut kartu konsep?'] },
      { gejala: 'Daya angkat lemah', kunci: 'lemah|sedikit|kurang', petunjuk: ['Faktor apa saja yang memperkuat elektromagnet? Mana yang paling mudah kamu ubah?', 'Apakah lilitanmu searah semua? Apa yang terjadi jika sebagian lilitan berlawanan arah?'] }
    ]
  },
  pesawat: {
    waktu: '2 × 40 menit (model skala kecil di kelas)',
    alat: [
      'Model beban: botol air 1,5 L (± 1,5 kg) atau kantong pasir 2 kg — JANGAN memakai orang atau karung 60 kg sungguhan',
      'Neraca pegas (dinamometer) 0–20 N atau timbangan gantung digital',
      'Untuk tuas: papan/penggaris kayu 1 m, balok segitiga atau spidol besar sebagai titik tumpu',
      'Untuk katrol: 2–4 katrol plastik kecil (katrol tirai/jemuran), tali nilon, kait S, statif atau palang kayu yang kokoh',
      'Pelumas (minyak goreng/oli) dan kain lap',
      'Meteran/penggaris untuk mengukur jarak tarik dan tinggi angkat'
    ],
    keselamatan: [
      'Uji hanya dengan beban model (± 2 kg). Jangan menggantung atau mengangkat orang.',
      'Jangan berdiri atau meletakkan kaki di bawah beban yang tergantung.',
      'Pastikan palang, kait, dan tali kuat (mampu menahan paling tidak 3× berat beban) dan terikat erat.',
      'Jauhkan jari dari titik tumpu tuas dan roda katrol agar tidak terjepit.',
      'Turunkan beban perlahan — jangan melepas tali tiba-tiba.',
      'Pakai sarung tangan bila menarik tali berkali-kali agar tangan tidak lecet.'
    ],
    langkah: [
      'Timbang beban model dengan neraca pegas; catat beratnya (N). Itulah gaya bila diangkat langsung.',
      'Rakit alat sesuai rancangan: tuas (letakkan beban di lengan beban dan tarik neraca pegas di ujung lengan kuasa) atau katrol/takal (kaitkan neraca pegas di ujung tali yang ditarik).',
      'Angkat beban perlahan dengan kecepatan tetap sambil membaca gaya pada neraca pegas.',
      'Ukur tinggi naik beban dan panjang tali yang ditarik (atau jarak turun ujung tuas).',
      'Hitung keuntungan mekanis nyata = berat beban ÷ gaya terukur.',
      'Hitung efisiensi = (berat × tinggi naik) ÷ (gaya × jarak tarik) × 100%.',
      'Untuk katrol: ulangi setelah katrol dibersihkan dan dilumasi. Bandingkan hasilnya.'
    ],
    takaran: v => {
      const h = hitungPesawat(v);
      const skala = 30; // karung 60 kg ↔ model 2 kg
      const alat = v.alat === 'tuas'
        ? `Tuas: panjang ${fxd(v.panjangTuas, 2)} m, lengan beban ${fxd(Math.min(+v.lenganBeban, +v.panjangTuas - 0.1), 2)} m. Model di kelas: pakai perbandingan lengan yang SAMA (mis. penggaris 1 m dengan titik tumpu di ${Math.round(Math.min(+v.lenganBeban, +v.panjangTuas - 0.1) / +v.panjangTuas * 100)} cm dari ujung beban).`
        : `${ALAT_PESAWAT[v.alat].nama}, katrol ${v.kondisi === 'dilumasi' ? 'dibersihkan & dilumasi' : 'apa adanya (berkarat/seret)'}; arah tarikan: ${ALAT_PESAWAT[v.alat].arah}.`;
      return [
        alat,
        `Prediksi simulasi: keuntungan mekanis nyata ± ${fxd(h.kmNyata, 2)}, efisiensi ± ${h.efisiensi}%.`,
        `Keuntungan mekanis & efisiensi tidak bergantung ukuran beban, jadi hasil model ${Math.round(+v.massa / skala * 10) / 10} kg bisa dibandingkan langsung dengan simulasi ${v.massa} kg.`,
        `Perkiraan gaya pada model beban 2 kg (19,6 N): ± ${fxd(19.6 / h.kmNyata)} N di neraca pegas.`
      ];
    },
    ukur: [
      { id: 'km', label: 'Keuntungan mekanis nyata (berat ÷ gaya)', satuan: '', sim: 'kmNyata' },
      { id: 'efisiensi', label: 'Efisiensi', satuan: '%', sim: 'efisiensi' },
      { id: 'gaya', label: 'Gaya terukur pada model', satuan: 'N' }
    ],
    masalah: [
      { gejala: 'Gaya jauh lebih besar dari perkiraan', kunci: 'berat|besar|susah|lebih besar', petunjuk: ['Apakah roda katrol berputar lancar? Apa pengaruh gesekan terhadap gaya?', 'Apakah berat katrol bebas dan talinya ikut kamu perhitungkan?'] },
      { gejala: 'Tali selip atau keluar dari alur katrol', kunci: 'selip|keluar|lepas', petunjuk: ['Apakah tali ditarik lurus sejajar dengan alur roda?', 'Apakah tali terlalu besar untuk alur katrol?'] },
      { gejala: 'Tuas melengkung atau patah', kunci: 'melengkung|patah|bengkok', petunjuk: ['Di bagian mana tuas paling tertekuk? Bagaimana momen di titik tumpu dipengaruhi lengan beban?', 'Bagaimana memilih bahan atau ukuran lengan agar momennya lebih kecil?'] },
      { gejala: 'Beban berputar atau berayun', kunci: 'berputar|berayun|goyang', petunjuk: ['Apakah beban digantung tepat di tengah?', 'Apakah tali-tali takal saling melilit? Bagaimana mencegahnya?'] }
    ]
  },
  optik: {
    waktu: '2 × 40 menit',
    alat: [
      'Kotak kardus (kotak sepatu) dan kertas/cat hitam untuk melapisi bagian dalam',
      'Lup/kaca pembesar (lensa cembung) diameter 5–10 cm',
      'Cermin rias cekung (bila ingin membandingkan) dan cermin datar kecil',
      'Penyangga HP dari kardus atau lilin mainan, selotip, cutter (dengan pendampingan guru)',
      'Kertas putih, penggaris dan meteran',
      'Ruangan yang bisa digelapkan dan dinding berwarna terang'
    ],
    keselamatan: [
      'JANGAN pernah melihat matahari melalui lensa atau cermin cekung.',
      'Jangan memusatkan cahaya matahari dengan lensa/cermin ke kulit, mata, kertas, atau kardus — bisa terbakar. Jangan tinggalkan lensa di bawah sinar matahari.',
      'Memotong kardus dengan cutter didampingi guru.',
      'Lensa dan cermin kaca mudah pecah — pegang tepinya dan simpan di tempat aman.',
      'Jangan biarkan HP menyala dengan kecerahan penuh terlalu lama di dalam kotak tertutup (bisa panas).'
    ],
    langkah: [
      'Ukur jarak fokus lensa: arahkan lensa ke jendela atau lampu yang jauh, lalu geser kertas di belakangnya sampai bayangan jendela tampak tajam. Jarak lensa–kertas itu adalah f.',
      'Buat lubang seukuran lensa di salah satu sisi pendek kotak, pasang lensa dengan selotip. Lapisi bagian dalam kotak dengan kertas hitam.',
      'Hitung jarak HP–lensa (s) memakai rumus 1/f = 1/s + 1/s\' dengan s\' = jarak lensa ke dinding.',
      'Atur kecerahan HP maksimum, kunci rotasi layar, lalu letakkan HP di dalam kotak dengan posisi sesuai rancangan (tegak atau diputar terbalik).',
      'Gelapkan ruangan. Arahkan lensa ke dinding pada jarak rancangan.',
      'Geser HP maju-mundur perlahan sampai gambar di dinding paling tajam. Ukur jarak HP–lensa saat itu.',
      'Ukur lebar gambar di dinding. Amati: apakah tegak atau terbalik? Apakah tulisan terbaca?',
      'Coba ganti dengan cermin rias cekung atau lensa lain, dan catat perbedaannya.'
    ],
    takaran: v => {
      const h = hitungOptik(v);
      const K = KOMPONEN_OPTIK[v.komponen];
      return [
        `${K.nama}, jarak fokus ${v.fokus} cm, diameter ${v.diameter} cm.`,
        `HP diletakkan ${v.jarakBenda} cm dari ${K.cermin ? 'cermin' : 'lensa'} dengan posisi ${v.hp === 'terbalik' ? 'DIPUTAR TERBALIK (180°)' : 'tegak biasa'}; dinding ${v.jarakLayar} cm dari ${K.cermin ? 'cermin' : 'lensa'}.`,
        h._nyata ? `Prediksi: bayangan nyata ${fxd(h.bayangan)} cm dari ${K.cermin ? 'cermin' : 'lensa'}, lebar gambar ± ${h.lebar} cm, ${h.arah.toLowerCase()} di dinding.` : `Prediksi: bayangan ${h.sifat.toLowerCase()} — tidak akan tampak di dinding. Perbaiki dulu di simulasi.`,
        'Tips: ukur jarak fokus lensamu yang sebenarnya lebih dulu — nilai f pada lup berbeda-beda.'
      ];
    },
    ukur: [
      { id: 'lebar', label: 'Lebar gambar di dinding', satuan: 'cm', sim: 'lebar' },
      { id: 'fokus', label: 'Jarak fokus lensa terukur', satuan: 'cm' },
      { id: 'jarak', label: 'Jarak HP–lensa saat gambar tajam', satuan: 'cm' }
    ],
    masalah: [
      { gejala: 'Tidak ada gambar di dinding', kunci: 'tidak ada|tidak muncul|kosong|tidak terlihat', petunjuk: ['Komponen apa yang kamu pakai? Apakah bisa membentuk bayangan nyata?', 'Apakah HP berada di luar titik fokus lensa (s > f)?'] },
      { gejala: 'Gambar buram', kunci: 'buram|kabur|tidak tajam', petunjuk: ['Geser HP maju-mundur sedikit demi sedikit. Ke arah mana gambar makin tajam?', 'Menurut rumus lensa, bagaimana s harus berubah bila dinding digeser menjauh?'] },
      { gejala: 'Gambar terbalik atau tulisan terbalik', kunci: 'terbalik|kebalik', petunjuk: ['Bagaimana sifat bayangan nyata dari lensa cembung — tegak atau terbalik?', 'Apa yang terjadi jika HP diputar 180° sebelum diproyeksikan?'] },
      { gejala: 'Gambar terlalu redup', kunci: 'redup|gelap|tidak terang', petunjuk: ['Apakah ruangan sudah cukup gelap dan kecerahan HP maksimum?', 'Menurut simulasi, bagaimana ukuran gambar dan diameter lensa memengaruhi kecerahan?'] }
    ]
  },
  bunyi: {
    waktu: '2 × 40 menit',
    alat: [
      'Kotak kardus (lubangi bagian atasnya ± 5 cm) atau kaleng bekas sebagai kotak resonansi',
      'Senar: senar pancing nilon 0,5 mm, senar gitar baja, atau karet gelang',
      'Dua pensil sebagai jembatan (bridge) penentu panjang senar yang bergetar',
      'Botol air mineral + air sebagai beban penegang (1 liter air ≈ 1 kg), tali pengait',
      'Tepi meja yang licin atau katrol kecil tempat senar melintas ke bawah',
      'Penggaris/meteran, timbangan',
      'HP dengan aplikasi penyetel nada (tuner) dan pengukur desibel (sound meter)'
    ],
    keselamatan: [
      'Senar yang tegang bisa putus dan terlempar: jauhkan wajah dari senar dan pakai kacamata pelindung bila ada.',
      'Gantung botol beban di tempat yang aman — jangan di atas kaki atau kepala, dan pastikan ikatannya kuat.',
      'Jangan menambah beban melebihi rancangan; senar nilon dan karet bisa putus tiba-tiba.',
      'Jangan membunyikan terlalu keras atau terlalu dekat dengan telinga orang lain.',
      'Ujung senar baja tajam — lipat atau tutup dengan selotip.'
    ],
    langkah: [
      'Ikat salah satu ujung senar ke ujung kotak. Bentangkan senar di atas kotak, lewatkan ke tepi meja/katrol, lalu ikat ke botol beban.',
      'Isi botol dengan air sesuai massa beban rancangan (timbang agar tepat).',
      'Letakkan dua pensil di bawah senar sebagai jembatan. Atur jaraknya sesuai panjang senar rancangan.',
      'Petik senar di tengah-tengah jembatan. Ukur frekuensinya dengan aplikasi tuner di HP (dekatkan HP ± 20 cm).',
      'Setel halus: geser salah satu pensil sedikit demi sedikit sampai tuner menunjukkan 440 Hz (A4).',
      'Ukur kenyaringan dengan aplikasi desibel pada jarak 1 m. Bandingkan petikan pelan dan kuat — apakah frekuensinya berubah?',
      'Ulangi dengan kotak resonansi berbeda (tanpa kotak, kaleng, kardus) dan catat perbedaannya.'
    ],
    takaran: v => {
      const h = hitungBunyi(v);
      return [
        `${SENAR_BUNYI[v.senar].nama}, panjang bergetar ${v.panjang} cm (jarak antara dua pensil).`,
        `Beban penegang: botol berisi ± ${fxd(+v.beban, 2)} liter air (${fxd(+v.beban, 2)} kg → tegangan ± ${fxd(h.tegangan, 1)} N).`,
        `${RESONATOR[v.resonator].nama}; dipetik ${v.petikan}.`,
        h._putus ? 'Prediksi: senar PUTUS — kurangi beban dulu di simulasi!' : `Prediksi simulasi: ${fxd(h.frekuensi)} Hz (${h.nada}), ± ${h.nyaring} dB. Bila tuner menunjukkan nada terlalu tinggi, geser pensil sedikit agar senar lebih panjang.`
      ];
    },
    ukur: [
      { id: 'frekuensi', label: 'Frekuensi terukur (tuner)', satuan: 'Hz', sim: 'frekuensi' },
      { id: 'nyaring', label: 'Kenyaringan pada 1 m', satuan: 'dB', sim: 'nyaring' },
      { id: 'panjang', label: 'Panjang senar saat tepat 440 Hz', satuan: 'cm' }
    ],
    masalah: [
      { gejala: 'Nada berubah-ubah / tidak stabil', kunci: 'berubah|tidak stabil|naik turun|goyang', petunjuk: ['Apakah botol beban berayun? Bagaimana ayunan memengaruhi tegangan senar?', 'Apakah senar karet memanjang sendiri saat ditarik lama?'] },
      { gejala: 'Bunyi terlalu pelan', kunci: 'pelan|lemah|kecil|tidak terdengar', petunjuk: ['Apakah senar menempel pada kotak resonansi? Adakah lubang pada kotak?', 'Faktor mana yang memengaruhi kenyaringan tetapi tidak mengubah nada?'] },
      { gejala: 'Senar putus', kunci: 'putus|lepas|patah', petunjuk: ['KESELAMATAN DULU: jauhkan wajah dan periksa apakah ada yang terkena pantulan senar.', 'Setelah aman: berapa tegangan yang kamu berikan dibanding batas kekuatan senar? Bagaimana mencapai nada yang sama dengan tegangan lebih kecil?'] },
      { gejala: 'Tuner di HP tidak membaca nada', kunci: 'tuner|tidak terbaca|tidak membaca|hp', petunjuk: ['Apakah ruangan cukup sepi? Coba dekatkan HP ke kotak.', 'Petik sekali dengan kuat lalu biarkan berbunyi — apakah tuner membaca saat bunyi paling jelas?'] }
    ]
  },
  gempa: {
    waktu: '3 × 40 menit',
    alat: [
      'Kardus bekas (dinding & lantai), penggaris, pensil',
      'Tusuk sate (kolom, pasak, dan bresing silang)',
      'Lem kertas/lem PVA dan selotip',
      'Gunting (cutter hanya oleh guru)',
      'Kantong plastik berisi pasir 250 g per lantai (beban uji)',
      'Untuk fondasi isolasi: potongan karet sandal bekas atau kelereng + tutup botol',
      'Meja getar sederhana: papan triplek di atas 4 pipa/spidol bulat, dengan balok penahan berjarak 2 cm di kiri–kanan',
      'HP: aplikasi metronom (180 ketukan/menit = 3 Hz) dan kamera gerak lambat (slow motion)'
    ],
    keselamatan: [
      'Cutter dan pisau hanya dipakai oleh guru; murid memakai gunting ujung tumpul.',
      'Ujung tusuk sate tajam — potong atau tumpulkan ujungnya dan jangan diarahkan ke wajah.',
      'Meja getar diguncang dengan tangan secara terkendali; jaga jari agar tidak terjepit papan.',
      'Kantong pasir diikat rapat agar tidak tumpah saat rumah runtuh; uji di atas lantai, bukan di meja tinggi.',
      'Bila memakai lem tembak, hanya dengan pengawasan guru karena ujungnya panas.'
    ],
    langkah: [
      'Potong kardus untuk lantai 15 × 15 cm dan dinding setinggi 15 cm per lantai.',
      'Pasang tusuk sate sebagai kolom di keempat sudut, lalu rekatkan lantai dan dinding sesuai jenis sambungan rancanganmu.',
      'Pasang pengaku sesuai rancangan: bresing silang dari tusuk sate atau dinding geser dari kardus dobel.',
      'Pasang atap sesuai rancangan, lalu letakkan kantong pasir 250 g di tiap lantai sebagai beban uji.',
      'Pasang fondasi: tempel ke pelat dasar, atau beri bantalan karet/kelereng di bawah pelat dasar.',
      'Uji frekuensi alami: dorong atap sedikit lalu lepas, rekam gerak lambat, dan hitung berapa ayunan dalam 1 detik.',
      'Letakkan rumah di meja getar. Guncang papan dari penahan kiri ke kanan (2 cm) mengikuti metronom 180 ketukan/menit selama 20 detik.',
      'Rekam dengan penggaris di belakang rumah. Ukur simpangan atap terbesar, periksa retak/lepas, dan ukur geseran rumah dari posisi awal. Ulangi 3 kali.'
    ],
    takaran: v => {
      const h = hitungGempa({ ...v, amplitudo: AMPLITUDO_UJI });
      return [
        `${v.lantai} lantai × 15 cm (tinggi total ${v.lantai * 15} cm), denah 15 × 15 cm, beban uji ${v.lantai} × 250 g pasir.`,
        `Pengaku: ${PENGAKU_GEMPA[v.pengaku].nama}${v.pengaku === 'silang' ? ' — 2 tusuk sate menyilang di tiap sisi tiap lantai' : v.pengaku === 'dinding' ? ' — dinding kardus dilapis dua di keempat sisi' : ''}.`,
        `Sambungan: ${SAMBUNGAN_GEMPA[v.sambungan].nama}. Fondasi: ${FONDASI_GEMPA[v.fondasi].nama}. Atap: ${ATAP_GEMPA[v.atap].nama}.`,
        `Prediksi simulasi (guncangan 2 cm, 3 Hz): frekuensi alami ± ${fx(h.frekuensiAlami, 1)} Hz, simpangan atap ± ${fx(h.simpangan, 1)} cm — ${h.status.toLowerCase()}.`
      ];
    },
    ukur: [
      { id: 'simpangan', label: 'Simpangan atap terbesar', satuan: 'cm', sim: 'simpangan' },
      { id: 'frekuensiAlami', label: 'Frekuensi alami (ayunan per detik)', satuan: 'Hz', sim: 'frekuensiAlami' },
      { id: 'geser', label: 'Geseran rumah dari posisi awal', satuan: 'cm', sim: 'geser' },
      { id: 'bertahan', label: 'Lama bertahan tanpa rusak', satuan: 'detik' }
    ],
    masalah: [
      { gejala: 'Rumah bergoyang sangat besar', kunci: 'goyang|ayun|miring|besar', petunjuk: ['Berapa frekuensi alami rumahmu dibanding 3 Hz? Apakah mendekati zona resonansi?', 'Apa yang terjadi pada frekuensi alami bila kamu menambah kekakuan atau mengurangi massa atap?'] },
      { gejala: 'Sambungan lepas / rumah runtuh', kunci: 'lepas|runtuh|roboh|ambruk|copot', petunjuk: ['KESELAMATAN DULU: jauhkan tangan dari papan dan tusuk sate yang patah.', 'Bagian mana yang lepas pertama kali? Apakah gaya terbesar ada di lantai paling bawah atau paling atas? Mengapa?'] },
      { gejala: 'Rumah bergeser dari fondasi', kunci: 'geser|pindah|jatuh dari|tergelincir', petunjuk: ['Apakah fondasimu punya gaya yang mengembalikan rumah ke tengah?', 'Bagaimana perbedaan bantalan karet dan kelereng saat guncangan berhenti?'] },
      { gejala: 'Hasil uji berbeda-beda setiap kali', kunci: 'beda|berubah|tidak sama|konsisten', petunjuk: ['Apakah guncangan tanganmu selalu sama jauh dan sama cepat? Bagaimana metronom dan penahan 2 cm membantu?', 'Variabel apa lagi yang harus dijaga tetap sama agar ujimu adil?'] }
    ]
  }
};

/* ---------------- Misi STEM ---------------- */
const MISI = [
  {
    id: 'perahu',
    judul: 'Perahu Penyelamat Hasil Panen',
    ikon: '⛵',
    kelas: 'Kelas 8 · Tekanan Zat & Hukum Archimedes',
    warna: '#0284c7',
    ringkas: 'Rancang perahu mini yang kuat, stabil, dan murah untuk mengangkut muatan saat banjir rob.',
    kisah: 'Banjir rob menggenangi jalan di dekat tambak garam Besuki. Warga kesulitan membawa karung hasil panen ke tempat yang lebih tinggi. Kelompokmu diminta merancang <b>model perahu sederhana</b> yang mampu mengangkut <b>muatan uji 3 kg</b> tanpa kemasukan air, tidak mudah terbalik, dan biayanya hemat.',
    kriteria: [
      'Dengan muatan 3 kg, sisa tinggi dinding di atas air (lambung bebas) minimal 2 cm',
      'Perahu tidak patah/retak saat membawa 3 kg',
      'Stabilitas minimal "cukup" (rasio lebar : tinggi ≥ 1,5)'
    ],
    kendala: ['Biaya bahan paling banyak Rp 30.000', 'Panjang perahu paling panjang 60 cm'],
    konsep: `
      <p><b>Hukum Archimedes:</b> benda yang tercelup dalam zat cair mendapat gaya ke atas sebesar berat zat cair yang dipindahkan.</p>
      <p class="rumus">F<sub>A</sub> = ρ<sub>air</sub> × g × V<sub>tercelup</sub></p>
      <p>Perahu mengapung selama gaya ke atas mampu mengimbangi <b>berat perahu + muatan</b>. Semakin berat muatan, semakin dalam perahu tercelup. Jika kedalaman celup melebihi tinggi dinding, air masuk dan perahu tenggelam.</p>
      <p><b>Massa jenis air:</b> air tawar ≈ 1.000 kg/m³, air laut ≈ 1.025 kg/m³ (lebih rapat karena garam terlarut).</p>
      <p><b>Stabilitas:</b> perahu yang lebar dan rendah lebih sulit terbalik dibanding yang sempit dan tinggi.</p>
      <p><b>Kekuatan bahan:</b> bahan ringan belum tentu kuat. Dasar perahu harus mampu menahan tekanan muatan.</p>`,
    kataKunci: ['archimedes', 'gaya apung', 'gaya ke atas', 'massa jenis', 'volume', 'tercelup', 'celup', 'berat', 'tekanan', 'stabil'],
    variabel: [
      { id: 'panjang', label: 'Panjang', tipe: 'range', min: 20, max: 60, step: 5, satuan: 'cm', awal: 30 },
      { id: 'lebar', label: 'Lebar', tipe: 'range', min: 10, max: 40, step: 2, satuan: 'cm', awal: 16 },
      { id: 'tinggi', label: 'Tinggi dinding', tipe: 'range', min: 3, max: 15, step: 1, satuan: 'cm', awal: 5 },
      { id: 'bahan', label: 'Bahan lambung', tipe: 'select', awal: 'styrofoam',
        opsi: [['styrofoam', 'Styrofoam (2 cm)'], ['plastik', 'Lembar plastik PVC'], ['triplek', 'Triplek tipis (3 mm)'], ['seng', 'Seng (0,4 mm)']] },
      { id: 'air', label: 'Jenis air', tipe: 'select', awal: 'tawar', opsi: [['tawar', 'Air tawar (genangan hujan)'], ['laut', 'Air laut (rob)']] },
      { id: 'muatan', label: 'Muatan uji', tipe: 'range', min: 0, max: 10, step: 0.5, satuan: 'kg', awal: 3 }
    ],
    keluaran: [
      { id: 'massaPerahu', label: 'Massa perahu', satuan: 'g' },
      { id: 'kapasitas', label: 'Muatan maksimum', satuan: 'kg' },
      { id: 'celup', label: 'Kedalaman celup', satuan: 'cm' },
      { id: 'bebas', label: 'Lambung bebas', satuan: 'cm' },
      { id: 'stabilitas', label: 'Stabilitas', satuan: '' },
      { id: 'status', label: 'Status', satuan: '' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'penjernih',
    judul: 'Penjernih Air Sederhana',
    ikon: '💧',
    kelas: 'Kelas 7 · Zat & Pemisahan Campuran',
    warna: '#0d9488',
    ringkas: 'Susun lapisan penyaring dari bahan sekitar untuk menjernihkan air sungai yang keruh.',
    kisah: 'Saat kemarau, sumur warga di dusun dekat sungai mengering. Air sungai keruh dan berbau. Warga butuh <b>alat penjernih air sederhana</b> untuk mencuci dan mandi. Susun lapisan <b>kerikil, ijuk, pasir, dan arang</b> di dalam botol agar air keruh (150 NTU) menjadi jernih, tetapi alirannya tidak terlalu lambat.',
    kriteria: [
      'Kekeruhan air hasil ≤ 25 NTU',
      'Bau hilang (skala bau ≤ 1 dari 3)',
      'Debit aliran ≥ 60 mL/menit agar tidak terlalu lama menunggu'
    ],
    kendala: ['Biaya bahan paling banyak Rp 20.000', 'Wadah: botol 1,5 L (tinggi total lapisan maksimal 30 cm)'],
    konsep: `
      <p><b>Filtrasi (penyaringan)</b> memisahkan zat padat dari cairan berdasarkan <b>ukuran partikel</b>. Partikel yang lebih besar dari celah penyaring akan tertahan.</p>
      <p><b>Kerikil &amp; ijuk</b> bercelah besar: menahan kotoran kasar, aliran cepat. <b>Pasir halus</b> bercelah kecil: menahan partikel halus (penyebab keruh), tetapi aliran melambat. <b>Arang</b> berpori sangat banyak: menyerap (<i>adsorpsi</i>) zat penyebab bau dan warna.</p>
      <p>Urutan lapisan penting! Jika lapisan halus di paling atas, kotoran kasar langsung menyumbat celahnya.</p>
      <p class="peringatan">⚠️ Penyaringan <b>tidak membunuh kuman</b>. Air hasil saringan harus direbus sampai mendidih sebelum diminum.</p>`,
    kataKunci: ['filtrasi', 'saring', 'partikel', 'ukuran', 'celah', 'pori', 'adsorpsi', 'serap', 'kasar', 'halus', 'campuran', 'endap'],
    variabel: [
      { id: 'lapis1', label: 'Lapisan 1 (paling atas)', tipe: 'select', awal: 'kerikil', opsi: 'LAPISAN' },
      { id: 'lapis2', label: 'Lapisan 2', tipe: 'select', awal: 'ijuk', opsi: 'LAPISAN' },
      { id: 'lapis3', label: 'Lapisan 3', tipe: 'select', awal: 'pasir', opsi: 'LAPISAN' },
      { id: 'lapis4', label: 'Lapisan 4 (paling bawah)', tipe: 'select', awal: 'arang', opsi: 'LAPISAN' },
      { id: 'tebalPasir', label: 'Tebal pasir', tipe: 'range', min: 2, max: 15, step: 1, satuan: 'cm', awal: 5 },
      { id: 'tebalArang', label: 'Tebal arang', tipe: 'range', min: 1, max: 10, step: 1, satuan: 'cm', awal: 3 },
      { id: 'ulang', label: 'Penyaringan diulang', tipe: 'range', min: 1, max: 3, step: 1, satuan: 'kali', awal: 1 }
    ],
    keluaran: [
      { id: 'keruh', label: 'Kekeruhan akhir', satuan: 'NTU' },
      { id: 'bau', label: 'Skala bau (0–3)', satuan: '' },
      { id: 'debit', label: 'Debit aliran', satuan: 'mL/menit' },
      { id: 'waktu', label: 'Waktu menyaring 1 L', satuan: 'menit' },
      { id: 'tinggiTotal', label: 'Tinggi lapisan', satuan: 'cm' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'pendingin',
    judul: 'Kotak Pendingin Ikan Nelayan',
    ikon: '🐟',
    kelas: 'Kelas 7 · Suhu, Kalor & Perpindahan Kalor',
    warna: '#ea580c',
    ringkas: 'Rancang kotak es agar ikan tangkapan tetap segar semalaman tanpa listrik.',
    kisah: 'Nelayan di pantai Besuki melaut dari sore hingga pagi. Es batu di kotak mereka sering sudah habis mencair sebelum kapal mendarat, sehingga ikan cepat busuk dan harganya jatuh. Rancang <b>kotak pendingin</b> yang membuat es bertahan <b>minimal 12 jam</b>, tetap ringan dibawa, dan terjangkau.',
    kriteria: [
      'Es bertahan (belum habis mencair) minimal 12 jam',
      'Massa kotak kosong paling berat 5 kg agar mudah diangkat',
    ],
    kendala: ['Biaya pembuatan paling banyak Rp 60.000', 'Ukuran bagian dalam kotak tetap: 40 × 30 × 30 cm'],
    konsep: `
      <p>Kalor selalu berpindah dari benda <b>bersuhu tinggi ke bersuhu rendah</b>. Udara luar yang panas terus mengalirkan kalor ke dalam kotak sehingga es mencair.</p>
      <p><b>Konduksi</b> — kalor merambat melalui dinding. Bahan <b>isolator</b> (konduktivitas termal kecil, misalnya styrofoam atau sekam padi yang banyak mengandung rongga udara) menghambat aliran kalor. Semakin tebal dinding, semakin kecil aliran kalor.</p>
      <p><b>Konveksi</b> — celah pada tutup membuat udara dingin keluar dan udara panas masuk.</p>
      <p><b>Radiasi</b> — permukaan gelap menyerap lebih banyak radiasi matahari daripada permukaan putih/mengilap.</p>
      <p class="rumus">Kalor untuk mencairkan es: Q = m × L &nbsp;(L es = 334.000 J/kg)</p>`,
    kataKunci: ['kalor', 'konduksi', 'konveksi', 'radiasi', 'isolator', 'konduktor', 'suhu', 'mencair', 'lebur', 'tebal', 'rongga udara'],
    variabel: [
      { id: 'bahan', label: 'Bahan dinding', tipe: 'select', awal: 'kardus',
        opsi: [['styrofoam', 'Styrofoam'], ['sekam', 'Sekam padi (dalam dinding papan tipis)'], ['kardus', 'Kardus berlapis'], ['kayu', 'Papan kayu']] },
      { id: 'tebal', label: 'Tebal dinding', tipe: 'range', min: 1, max: 8, step: 1, satuan: 'cm', awal: 2 },
      { id: 'warna', label: 'Warna luar', tipe: 'select', awal: 'cokelat', opsi: [['putih', 'Putih'], ['cokelat', 'Cokelat'], ['hitam', 'Hitam']] },
      { id: 'tutup', label: 'Tutup', tipe: 'select', awal: 'celah', opsi: [['rapat', 'Rapat (diberi karet)'], ['celah', 'Ada celah']] },
      { id: 'es', label: 'Massa es', tipe: 'range', min: 1, max: 6, step: 0.5, satuan: 'kg', awal: 3 },
      { id: 'suhu', label: 'Suhu udara luar', tipe: 'range', min: 24, max: 36, step: 1, satuan: '°C', awal: 30 }
    ],
    keluaran: [
      { id: 'laju', label: 'Laju kalor masuk', satuan: 'W' },
      { id: 'tahan', label: 'Es bertahan', satuan: 'jam' },
      { id: 'massaKotak', label: 'Massa kotak kosong', satuan: 'kg' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'hidroponik',
    judul: 'Kebun Sawi Hidroponik Sekolah',
    ikon: '🌱',
    kelas: 'Kelas 7–8 · Fotosintesis & Faktor Pembatas',
    warna: '#16a34a',
    ringkas: 'Atur cahaya, CO₂, suhu, dan nutrisi agar sawi tumbuh besar dengan biaya listrik hemat.',
    kisah: 'Koperasi sekolah ingin menjual sawi dari <b>kebun hidroponik dalam ruangan</b> yang disinari lampu LED. Sawi harus siap panen dalam <b>21 hari</b> dengan massa minimal <b>100 gram</b> per tanaman. Masalahnya, biaya listrik lampu tidak boleh terlalu mahal. Temukan pengaturan terbaik!',
    kriteria: [
      'Massa sawi setelah 21 hari ≥ 100 g',
      'Daun tetap sehat (tidak layu/terbakar)'
    ],
    kendala: ['Biaya listrik lampu selama 21 hari paling banyak Rp 15.000 (tarif Rp 1.500/kWh, lampu 50 W)'],
    konsep: `
      <p><b>Fotosintesis:</b> tumbuhan mengubah karbon dioksida dan air menjadi glukosa dengan bantuan energi cahaya.</p>
      <p class="rumus">6CO₂ + 6H₂O → (cahaya, klorofil) → C₆H₁₂O₆ + 6O₂</p>
      <p><b>Faktor pembatas (Blackman):</b> laju fotosintesis ditentukan oleh faktor yang <b>paling kurang</b>. Menambah cahaya tidak berguna jika CO₂-nya yang kurang, dan sebaliknya.</p>
      <p><b>Suhu</b> memengaruhi kerja enzim: terlalu dingin lambat, terlalu panas enzim rusak. <b>Klorofil</b> paling banyak menyerap cahaya merah dan biru, dan memantulkan hijau.</p>
      <p><b>Nutrisi (AB mix)</b> menyediakan unsur hara. Kekurangan membuat tanaman kerdil, tetapi larutan terlalu pekat justru menarik air keluar dari akar (daun layu).</p>`,
    kataKunci: ['fotosintesis', 'cahaya', 'klorofil', 'karbon dioksida', 'co2', 'faktor pembatas', 'enzim', 'suhu', 'nutrisi', 'glukosa', 'osmosis'],
    variabel: [
      { id: 'cahaya', label: 'Intensitas lampu', tipe: 'range', min: 10, max: 100, step: 10, satuan: '%', awal: 50 },
      { id: 'jam', label: 'Lama penyinaran', tipe: 'range', min: 6, max: 20, step: 1, satuan: 'jam/hari', awal: 10 },
      { id: 'warnaLed', label: 'Warna LED', tipe: 'select', awal: 'putih', opsi: [['merahbiru', 'Merah + biru'], ['putih', 'Putih'], ['hijau', 'Hijau']] },
      { id: 'co2', label: 'Kadar CO₂', tipe: 'select', awal: 'normal', opsi: [['rendah', 'Rendah (250 ppm, ruang tertutup)'], ['normal', 'Normal (420 ppm)'], ['tinggi', 'Tinggi (800 ppm)']] },
      { id: 'suhu', label: 'Suhu ruang', tipe: 'range', min: 14, max: 40, step: 1, satuan: '°C', awal: 30 },
      { id: 'nutrisi', label: 'Nutrisi AB mix', tipe: 'range', min: 0, max: 2000, step: 100, satuan: 'ppm', awal: 600 }
    ],
    keluaran: [
      { id: 'laju', label: 'Laju fotosintesis relatif', satuan: '%' },
      { id: 'pembatas', label: 'Faktor pembatas utama', satuan: '' },
      { id: 'massa', label: 'Massa sawi hari ke-21', satuan: 'g' },
      { id: 'kondisi', label: 'Kondisi daun', satuan: '' },
      { id: 'biaya', label: 'Biaya listrik', satuan: 'Rp' }
    ]
  },
  {
    id: 'roket',
    judul: 'Roket Cuka & Soda Kue',
    ikon: '🚀',
    kelas: 'Kelas 7 · Perubahan Materi (Fisika & Kimia)',
    warna: '#7c3aed',
    ringkas: 'Manfaatkan gas hasil reaksi kimia cuka dan soda kue untuk meluncurkan roket botol tepat ke zona target.',
    kisah: 'Pekan Sains sekolah mengadakan <b>lomba roket botol ramah lingkungan</b>. Bahan bakarnya hanya boleh <b>cuka dan soda kue</b>. Di warung sekitar sekolah, cuka yang mudah ditemukan adalah <b>cuka 20% dalam botol 125 mL</b>, yang menurut labelnya harus diencerkan (5 mL cuka + 20 mL air) sebelum dipakai. Roket harus mendarat di <b>zona target 15–25 m</b> — lebih jauh dari itu akan melewati pagar lapangan. Juri juga menilai <b>hemat bahan</b>: jangan sampai banyak cuka atau soda kue yang terbuang tanpa bereaksi.',
    kriteria: [
      'Roket mendarat di zona target 15–25 m',
      'Pereaksi yang terbuang (tidak ikut bereaksi) paling banyak 20%',
      'Busa tidak meluap sebelum botol tertutup'
    ],
    kendala: ['Biaya bahan paling banyak Rp 10.000 (cuka dapur 5% Rp 20/mL; cuka 20% Rp 4.000 per botol 125 mL = Rp 32/mL, atau ± Rp 6,4/mL setelah diencerkan 1 : 4; soda kue Rp 100/g)', 'Kadar cuka di dalam botol paling tinggi 5% — cuka 20% WAJIB diencerkan dulu, cuka biang (25%) DILARANG karena korosif'],
    konsep: `
      <p><b>Perubahan fisika</b> tidak menghasilkan zat baru (misalnya es mencair, gula larut). <b>Perubahan kimia</b> menghasilkan zat baru yang sifatnya berbeda dari zat asal.</p>
      <p>Saat cuka (mengandung asam asetat) bertemu soda kue (natrium bikarbonat), terjadi <b>reaksi kimia</b>:</p>
      <p class="rumus">CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑</p>
      <p><b>Ciri perubahan kimia</b> yang teramati: muncul gelembung gas, campuran terasa lebih dingin (reaksi menyerap kalor), dan terbentuk zat baru (natrium asetat, air, gas karbon dioksida).</p>
      <p><b>Perbandingan massa:</b> 60 g asam asetat tepat bereaksi dengan 84 g soda kue. Cuka dapur 5% berarti 100 mL cuka mengandung ± 5 g asam asetat. Cuka 20% yang dijual dalam botol 125 mL mengandung asam empat kali lebih pekat (± 25 g per botol); setelah diencerkan sesuai label (1 bagian cuka + 4 bagian air) kadarnya menjadi ± 4%, sehingga satu botol menghasilkan ± 625 mL cuka encer. Pereaksi yang habis lebih dulu disebut <b>pereaksi pembatas</b> — ia menentukan banyaknya gas yang terbentuk; kelebihan pereaksi lain terbuang percuma.</p>
      <p><b>Gas CO₂</b> terkumpul di ruang kosong botol sehingga <b>tekanan</b> naik. Saat sumbat lepas, gas mendorong cairan keluar ke bawah dan roket terdorong ke atas (<b>Hukum III Newton: aksi–reaksi</b>). Terlalu sedikit cairan → sedikit "massa dorong"; terlalu banyak → ruang gas sempit.</p>
      <p class="peringatan">⚠️ Keselamatan: pakai kacamata pelindung, luncurkan di lapangan terbuka, jangan mengarahkan roket ke orang, pakai botol plastik (bukan kaca), jangan memakai cuka biang, dan selalu encerkan cuka 20% sesuai label sebelum dipakai (tuang cuka ke dalam air, bukan sebaliknya).</p>`,
    kataKunci: ['reaksi', 'kimia', 'perubahan kimia', 'zat baru', 'gas', 'karbon dioksida', 'co2', 'asam', 'pereaksi', 'pembatas', 'tekanan', 'gelembung', 'aksi', 'newton', 'bikarbonat'],
    variabel: [
      { id: 'cuka', label: 'Volume cuka', tipe: 'range', min: 50, max: 700, step: 25, satuan: 'mL', awal: 100 },
      { id: 'soda', label: 'Massa soda kue', tipe: 'range', min: 5, max: 50, step: 1, satuan: 'g', awal: 10 },
      { id: 'kadar', label: 'Jenis cuka', tipe: 'select', awal: 'dapur', opsi: [['dapur', 'Cuka dapur 5%'], ['encer', 'Cuka dapur diencerkan 2,5%'], ['pekat20encer', 'Cuka 20% + air 1:4 (≈ 4%)'], ['pekat20', 'Cuka 20% tanpa diencerkan']] },
      { id: 'bungkus', label: 'Cara memasukkan soda kue', tipe: 'select', awal: 'langsung', opsi: [['langsung', 'Dituang langsung'], ['tisu', 'Dibungkus tisu (reaksi tertunda)']] },
      { id: 'botol', label: 'Ukuran botol', tipe: 'select', awal: '600', opsi: [['600', 'Botol 600 mL'], ['1500', 'Botol 1,5 L']] },
      { id: 'sudut', label: 'Sudut peluncuran', tipe: 'range', min: 30, max: 90, step: 5, satuan: '°', awal: 90 }
    ],
    keluaran: [
      { id: 'gas', label: 'Gas CO₂ terbentuk', satuan: 'L' },
      { id: 'pembatas', label: 'Pereaksi pembatas', satuan: '' },
      { id: 'sisa', label: 'Pereaksi terbuang', satuan: '' },
      { id: 'tekanan', label: 'Tekanan saat lepas', satuan: 'bar' },
      { id: 'kecepatan', label: 'Kecepatan awal', satuan: 'm/s' },
      { id: 'tinggi', label: 'Tinggi maksimum', satuan: 'm' },
      { id: 'jarak', label: 'Jarak mendarat', satuan: 'm' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'roketair',
    judul: 'Roket Air Bertekanan',
    ikon: '💦',
    kelas: 'Kelas 8 · Tekanan Zat (Tekanan Gas & Aksi–Reaksi)',
    warna: '#0369a1',
    ringkas: 'Pompa udara ke botol berisi air, lalu temukan paduan air, tekanan, dan sudut agar roket mendarat tepat di zona target dengan aman.',
    kisah: 'Ekstrakurikuler sains mengadakan <b>lomba roket air antarkelas</b> di lapangan sekolah. Roket dibuat dari botol bekas, diisi air, lalu dipompa dengan pompa sepeda. Roket harus mendarat di <b>zona target 40–60 m</b> (pagar lapangan ada di 65 m). Demi keselamatan, <b>tekanan tidak boleh lebih dari 4 bar</b>, dan roket harus terbang stabil — tidak berputar-putar ke arah penonton.',
    kriteria: [
      'Roket mendarat di zona target 40–60 m',
      'Tekanan pompa paling tinggi 4 bar (batas aman botol bekas)',
      'Roket terbang stabil, tidak berputar'
    ],
    kendala: ['Bahan: botol plastik bekas minuman bersoda, air, dan pompa sepeda berpengukur tekanan', 'Tidak boleh memakai bahan bakar atau zat kimia apa pun'],
    konsep: `
      <p><b>Tekanan gas</b> timbul karena partikel udara terus bertumbukan dengan dinding wadah. Memompa udara ke dalam botol tertutup menambah jumlah partikel, sehingga tekanannya naik.</p>
      <p class="rumus">Tekanan: P = F ÷ A &nbsp;&nbsp;·&nbsp;&nbsp; 1 bar = 100.000 Pa ≈ 14,5 psi</p>
      <p><b>Hukum Boyle:</b> pada suhu tetap, tekanan gas berbanding terbalik dengan volumenya (P₁V₁ = P₂V₂). Saat air menyembur keluar, ruang udara membesar sehingga tekanannya turun — dorongan roket makin lemah.</p>
      <p><b>Hukum III Newton (aksi–reaksi):</b> udara bertekanan mendorong air keluar ke bawah dengan cepat (aksi), dan air mendorong botol ke atas (reaksi). Air berperan sebagai "massa dorong".</p>
      <p><b>Menimbang jumlah air:</b> tanpa air, hampir tidak ada massa yang didorong keluar. Terlalu banyak air membuat roket berat dan ruang udaranya sempit, sehingga tekanan cepat habis.</p>
      <p><b>Kestabilan:</b> sirip di bagian belakang dan kerucut berbeban di depan membuat roket lurus menembus udara, sehingga hambatan udaranya kecil.</p>
      <p class="peringatan">⚠️ Botol bekas bisa pecah jika dipompa berlebihan. Batas aman lomba ini 4 bar, selalu diperiksa dengan pengukur tekanan pompa.</p>`,
    kataKunci: ['tekanan', 'gas', 'udara', 'partikel', 'boyle', 'volume', 'newton', 'aksi', 'reaksi', 'dorong', 'massa', 'hambatan', 'sirip', 'pascal', 'bar'],
    variabel: [
      { id: 'air', label: 'Volume air', tipe: 'range', min: 50, max: 1000, step: 50, satuan: 'mL', awal: 100 },
      { id: 'tekanan', label: 'Tekanan pompa', tipe: 'range', min: 1, max: 6, step: 0.5, satuan: 'bar', awal: 2 },
      { id: 'botol', label: 'Ukuran botol', tipe: 'select', awal: '600', opsi: [['600', 'Botol 600 mL'], ['1500', 'Botol 1,5 L']] },
      { id: 'stabil', label: 'Penstabil', tipe: 'select', awal: 'tanpa', opsi: [['tanpa', 'Tanpa sirip'], ['sirip', '3 sirip karton'], ['kerucut', '3 sirip + kerucut berbeban 20 g']] },
      { id: 'sudut', label: 'Sudut peluncuran', tipe: 'range', min: 30, max: 90, step: 5, satuan: '°', awal: 60 }
    ],
    keluaran: [
      { id: 'kecepatan', label: 'Kecepatan maksimum', satuan: 'm/s' },
      { id: 'dorong', label: 'Lama semburan', satuan: 's' },
      { id: 'tinggi', label: 'Tinggi maksimum', satuan: 'm' },
      { id: 'jarak', label: 'Jarak mendarat', satuan: 'm' },
      { id: 'waktu', label: 'Lama terbang', satuan: 's' },
      { id: 'stabilitas', label: 'Kestabilan', satuan: '' },
      { id: 'keamanan', label: 'Keamanan tekanan', satuan: '' }
    ]
  },
  {
    id: 'jembatan',
    judul: 'Jembatan Stik Es Krim',
    ikon: '🌉',
    kelas: 'Kelas 8 · Gerak & Gaya (Gaya Tekan, Gaya Tarik, Struktur)',
    warna: '#b45309',
    ringkas: 'Rancang model jembatan dari stik es krim yang kuat menahan beban, tetapi hemat bahan dan ringan.',
    kisah: 'Jembatan kayu di atas saluran irigasi dekat sawah rusak diterjang banjir. Sebelum membangun yang baru, dinas desa ingin membandingkan beberapa bentuk jembatan menggunakan <b>model dari stik es krim</b>. Model harus membentang <b>40 cm</b>, menahan beban di tengah <b>minimal 15 kg</b>, memakai <b>paling banyak 120 stik</b>, dan <b>efisien</b> — kuat tetapi tidak boros bahan.',
    kriteria: [
      'Jembatan menahan beban di tengah minimal 15 kg',
      'Efisiensi (beban maksimum ÷ massa jembatan) minimal 80'
    ],
    kendala: ['Bentang 40 cm; panjang satu stik hanya ± 11 cm, jadi batang panjang harus disambung', 'Paling banyak 120 stik es krim'],
    konsep: `
      <p><b>Gaya</b> adalah tarikan atau dorongan. Saat jembatan dibebani, setiap batangnya menerima <b>gaya tekan</b> (didorong memendek) atau <b>gaya tarik</b> (ditarik memanjang).</p>
      <p>Pada jembatan yang dibebani di tengah, bagian <b>atas melengkung ke dalam → tertekan</b>, bagian <b>bawah meregang → tertarik</b>.</p>
      <p class="rumus">Gaya pada batang atas/bawah ≈ momen ÷ tinggi rangka &nbsp;·&nbsp; M = F × L ÷ 4</p>
      <p><b>Segitiga</b> adalah bentuk yang tidak berubah bentuk bila sambungannya kuat — karena itu rangka jembatan (Warren, Pratt, Howe) tersusun dari segitiga. Rangka yang lebih <b>tinggi</b> memperkecil gaya pada batang atas-bawah, tetapi rangka yang terlalu tinggi dan ramping mudah <b>terpuntir ke samping</b>.</p>
      <p><b>Batang tekan</b> yang panjang dan tipis mudah <b>menekuk</b> (melengkung lalu patah) jauh sebelum kayunya hancur. Menumpuk stik yang direkatkan dengan baik membuat batang jauh lebih kaku. <b>Batang tarik</b> biasanya gagal di <b>sambungan lemnya</b>.</p>
      <p><b>Busur</b> menyalurkan beban sebagai gaya tekan ke tumpuan, tetapi mendorong tumpuan ke samping — dorongan itu harus ditahan.</p>`,
    kataKunci: ['gaya', 'tekan', 'tarik', 'segitiga', 'rangka', 'tekuk', 'menekuk', 'sambungan', 'lem', 'momen', 'tumpuan', 'busur', 'beban', 'kaku', 'struktur'],
    variabel: [
      { id: 'desain', label: 'Bentuk jembatan', tipe: 'select', awal: 'balok', opsi: [['balok', 'Balok datar (tanpa rangka)'], ['warren', 'Rangka Warren (segitiga)'], ['pratt', 'Rangka Pratt'], ['howe', 'Rangka Howe'], ['lengkung', 'Lengkung (busur)']] },
      { id: 'tinggi', label: 'Tinggi rangka/busur', tipe: 'range', min: 2, max: 15, step: 1, satuan: 'cm', awal: 5 },
      { id: 'lapis', label: 'Tumpukan stik per batang', tipe: 'range', min: 1, max: 4, step: 1, satuan: 'lapis', awal: 1 },
      { id: 'lem', label: 'Jenis lem', tipe: 'select', awal: 'kertas', opsi: [['kertas', 'Lem kertas'], ['tembak', 'Lem tembak'], ['kayu', 'Lem kayu (PVAc)']] },
      { id: 'beban', label: 'Beban uji di tengah', tipe: 'range', min: 0, max: 40, step: 1, satuan: 'kg', awal: 3 }
    ],
    keluaran: [
      { id: 'bebanMaks', label: 'Beban maksimum', satuan: 'kg' },
      { id: 'lemah', label: 'Bagian yang gagal lebih dulu', satuan: '' },
      { id: 'gaya', label: 'Gaya pada bagian terlemah', satuan: 'N' },
      { id: 'stik', label: 'Jumlah stik', satuan: 'stik' },
      { id: 'massa', label: 'Massa jembatan', satuan: 'g' },
      { id: 'efisiensi', label: 'Efisiensi', satuan: '' },
      { id: 'status', label: 'Saat diuji', satuan: '' }
    ]
  },
  {
    id: 'angin',
    judul: 'Pembangkit Listrik Tenaga Angin',
    ikon: '💨',
    kelas: 'Kelas 7–9 · Energi & Perubahannya, Induksi Elektromagnetik',
    warna: '#0891b2',
    ringkas: 'Rancang kincir angin mini yang mengubah energi angin pantai menjadi listrik untuk menyalakan lampu pos ronda.',
    kisah: 'Pos ronda di tepi pantai Besuki gelap di malam hari karena jauh dari jaringan listrik. Padahal, angin laut hampir selalu bertiup. Kelompokmu diminta merancang <b>pembangkit listrik tenaga angin mini</b> untuk menyalakan lampu LED. Pada angin sore yang umum (<b>4 m/s</b>) harus dihasilkan <b>minimal 1 W</b>; kincir harus <b>mulai berputar saat angin masih pelan (≤ 3 m/s)</b>; dan bilahnya <b>tidak boleh patah</b> saat angin kencang (10 m/s).',
    kriteria: [
      'Daya listrik minimal 1 W pada angin 4 m/s',
      'Kincir mulai berputar pada angin ≤ 3 m/s',
      'Bilah tahan angin kencang 10 m/s'
    ],
    kendala: ['Biaya paling banyak Rp 75.000', 'Generator dari barang bekas: dinamo sepeda atau motor DC mainan'],
    konsep: `
      <p><b>Energi tidak dapat diciptakan atau dimusnahkan, hanya berubah bentuk.</b> Pada kincir angin: energi kinetik angin → energi gerak (putaran) bilah → energi listrik di generator → energi cahaya di lampu.</p>
      <p class="rumus">Daya angin: P = ½ × ρ × A × v³ &nbsp;·&nbsp; A = π × r²</p>
      <p>Perhatikan pangkat tiga pada kecepatan angin! Angin dua kali lebih kencang membawa daya <b>delapan kali</b> lebih besar. Jari-jari bilah dua kali lebih panjang memberi luas sapuan empat kali.</p>
      <p><b>Batas Betz:</b> kincir tidak mungkin menangkap semua energi angin — paling banyak 59%. Kincir sederhana biasanya hanya 15–30%. Bentuk, jumlah, dan sudut bilah menentukan seberapa besar bagian yang tertangkap.</p>
      <p><b>Generator</b> bekerja berdasarkan <b>induksi elektromagnetik</b>: magnet yang berputar di dekat kumparan kawat menimbulkan arus listrik. Setiap generator punya hambatan awal yang harus dilawan dan putaran ideal; <b>gir</b> dapat mempercepat putaran generator, tetapi membuat kincir lebih berat untuk mulai berputar.</p>
      <p>Sebagian energi selalu berubah menjadi <b>panas dan bunyi</b> (gesekan), sehingga energi listrik yang dihasilkan selalu lebih kecil daripada energi angin.</p>`,
    kataKunci: ['energi', 'kinetik', 'listrik', 'generator', 'induksi', 'magnet', 'kumparan', 'daya', 'betz', 'bilah', 'putaran', 'gir', 'torsi', 'luas', 'kecepatan angin'],
    variabel: [
      { id: 'jari', label: 'Panjang bilah (jari-jari)', tipe: 'range', min: 10, max: 40, step: 5, satuan: 'cm', awal: 15 },
      { id: 'bilah', label: 'Jumlah bilah', tipe: 'range', min: 2, max: 8, step: 1, satuan: 'bilah', awal: 8 },
      { id: 'sudutBilah', label: 'Sudut bilah', tipe: 'range', min: 5, max: 45, step: 5, satuan: '°', awal: 30 },
      { id: 'bahan', label: 'Bahan bilah', tipe: 'select', awal: 'kardus', opsi: [['kardus', 'Kardus'], ['botol', 'Botol plastik'], ['pvc', 'Pipa PVC dibelah'], ['triplek', 'Triplek tipis']] },
      { id: 'generator', label: 'Generator', tipe: 'select', awal: 'dinamo', opsi: [['dinamo', 'Dinamo sepeda'], ['motor', 'Motor DC bekas mainan']] },
      { id: 'gir', label: 'Perbandingan gir', tipe: 'select', awal: '1', opsi: [['1', '1 : 1 (tanpa gir)'], ['3', '1 : 3'], ['5', '1 : 5'], ['10', '1 : 10']] },
      { id: 'angin', label: 'Kecepatan angin uji', tipe: 'range', min: 1, max: 12, step: 0.5, satuan: 'm/s', awal: 4 }
    ],
    keluaran: [
      { id: 'dayaAngin', label: 'Daya angin tersapu', satuan: 'W' },
      { id: 'daya', label: 'Daya listrik', satuan: 'W' },
      { id: 'cp', label: 'Energi angin tertangkap', satuan: '%' },
      { id: 'rpm', label: 'Putaran kincir', satuan: 'rpm' },
      { id: 'rpmGen', label: 'Putaran generator', satuan: 'rpm' },
      { id: 'mulai', label: 'Angin minimum untuk berputar', satuan: 'm/s' },
      { id: 'lampu', label: 'Lampu', satuan: '' },
      { id: 'kekuatan', label: 'Kekuatan bilah', satuan: '' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'listrik',
    judul: 'Lampu Belajar Darurat',
    ikon: '💡',
    kelas: 'Kelas 8–9 · Listrik Dinamis (Hukum Ohm, Rangkaian Seri & Paralel)',
    warna: '#d97706',
    ringkas: 'Rangkai baterai, lampu, dan resistor menjadi lampu belajar darurat yang terang, awet, dan tetap menyala walau satu lampu rusak.',
    kisah: 'Saat ada pemadaman listrik bergilir, Dina — anak nelayan di pesisir Besuki — tidak bisa belajar di malam hari. Kelompokmu diminta merancang <b>lampu belajar darurat</b> dari baterai AA. Lampu harus <b>cukup terang untuk membaca (≥ 15 lumen)</b>, <b>tahan semalam (≥ 8 jam)</b>, <b>tidak ada lampu yang putus</b>, dan <b>bila satu lampu rusak, lampu lainnya tetap menyala</b>. Semua itu dengan biaya paling banyak Rp 40.000.',
    kriteria: [
      'Cahaya total minimal 15 lumen',
      'Tidak ada lampu yang putus',
      'Baterai tahan minimal 8 jam',
      'Jika satu lampu dicabut/rusak, lampu lain tetap menyala'
    ],
    kendala: ['Biaya paling banyak Rp 40.000', 'Hanya baterai AA 1,5 V (paling banyak 4 buah) — dilarang memakai listrik PLN'],
    konsep: `
      <p><b>Arus listrik (I)</b> adalah aliran muatan, diukur dalam ampere (A) atau miliampere (mA). <b>Tegangan (V)</b> adalah "dorongan" dari sumber listrik, diukur dalam volt. <b>Hambatan (R)</b> menghambat arus, diukur dalam ohm (Ω).</p>
      <p class="rumus">Hukum Ohm: V = I × R &nbsp;·&nbsp; Daya: P = V × I</p>
      <p><b>Rangkaian seri:</b> komponen tersusun berderet dalam satu jalur. Arus di semua komponen sama, tegangan sumber terbagi. Bila satu lampu putus atau dicabut, jalurnya terputus dan <b>semua lampu padam</b>.</p>
      <p><b>Rangkaian paralel:</b> komponen tersusun bercabang. Setiap cabang mendapat tegangan yang sama, arus total terbagi ke cabang-cabang. Bila satu cabang putus, <b>cabang lain tetap menyala</b> — karena itu listrik di rumah dipasang paralel.</p>
      <p><b>Baterai disusun seri</b> menjumlahkan tegangannya (4 × 1,5 V = 6 V). <b>LED</b> baru menyala bila tegangannya melebihi ± 2,9 V, dan akan <b>putus</b> bila arusnya lebih dari ± 30 mA — maka dipasang <b>resistor pembatas arus</b>.</p>
      <p><b>Lama nyala baterai</b> ≈ kapasitas ÷ arus. Baterai AA ± 2000 mAh: dengan arus 100 mA → ± 20 jam. LED jauh lebih hemat energi daripada bohlam pijar untuk terang yang sama.</p>
      <p class="peringatan">⚠️ Jangan pernah menghubungkan kutub + dan − baterai langsung dengan kabel (hubung singkat) — baterai dan kabel bisa sangat panas. Jangan bereksperimen dengan listrik PLN/stopkontak.</p>`,
    kataKunci: ['arus', 'tegangan', 'hambatan', 'ohm', 'seri', 'paralel', 'resistor', 'led', 'baterai', 'volt', 'ampere', 'daya', 'cabang', 'hubung singkat', 'mah'],
    variabel: [
      { id: 'baterai', label: 'Jumlah baterai AA (seri)', tipe: 'range', min: 1, max: 4, step: 1, satuan: 'buah', awal: 2 },
      { id: 'jenisLampu', label: 'Jenis lampu', tipe: 'select', awal: 'led', opsi: [['led', 'LED putih 5 mm'], ['pijar', 'Bohlam pijar 2,5 V']] },
      { id: 'lampu', label: 'Jumlah lampu', tipe: 'range', min: 1, max: 5, step: 1, satuan: 'buah', awal: 3 },
      { id: 'susunan', label: 'Susunan lampu', tipe: 'select', awal: 'seri', opsi: [['seri', 'Seri (berderet)'], ['paralel', 'Paralel (bercabang)']] },
      { id: 'resistor', label: 'Resistor pembatas tiap lampu', tipe: 'select', awal: '0', opsi: [['0', 'Tanpa resistor'], ['22', '22 Ω'], ['47', '47 Ω'], ['100', '100 Ω'], ['220', '220 Ω']] },
      { id: 'cabut', label: 'Uji: cabut satu lampu', tipe: 'select', awal: 'tidak', opsi: [['tidak', 'Tidak (semua terpasang)'], ['ya', 'Ya, cabut lampu pertama']] }
    ],
    keluaran: [
      { id: 'tegangan', label: 'Tegangan baterai', satuan: 'V' },
      { id: 'arus', label: 'Arus total', satuan: 'mA' },
      { id: 'arusLampu', label: 'Arus tiap lampu', satuan: 'mA' },
      { id: 'cahaya', label: 'Cahaya total', satuan: 'lumen' },
      { id: 'kondisi', label: 'Kondisi lampu', satuan: '' },
      { id: 'tahan', label: 'Baterai tahan', satuan: 'jam' },
      { id: 'daya', label: 'Daya', satuan: 'W' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'magnet',
    judul: 'Derek Elektromagnet Pemilah Sampah',
    ikon: '🧲',
    kelas: 'Kelas 9 · Kemagnetan & Elektromagnet',
    warna: '#be123c',
    ringkas: 'Rancang derek elektromagnet mini yang mengangkat sampah besi, melepaskannya saat dimatikan, dan tidak membuat kawat kepanasan.',
    kisah: 'Bank sampah sekolah menerima campuran sampah logam: <b>paku dan kaleng besi</b> bercampur dengan <b>kaleng minuman aluminium</b>. Petugas ingin alat pemilah berupa <b>derek elektromagnet mini</b>: saat dinyalakan mengangkat sampah besi (minimal <b>15 paku sekaligus</b>), dan saat dimatikan <b>melepaskannya</b> ke keranjang lain. Kawat lilitannya tidak boleh kepanasan dan baterainya harus awet.',
    kriteria: [
      'Mengangkat minimal 15 paku kecil sekaligus',
      'Paku terlepas saat saklar dimatikan',
      'Kawat tidak kepanasan (panas ≤ 3 W)',
      'Baterai tahan minimal 30 menit dinyalakan'
    ],
    kendala: ['Biaya paling banyak Rp 30.000', 'Hanya baterai AA (paling banyak 4 buah)'],
    konsep: `
      <p><b>Magnet</b> punya dua kutub, utara (U) dan selatan (S). Kutub sejenis tolak-menolak, kutub berbeda tarik-menarik. Di sekitar magnet ada <b>medan magnet</b> yang digambarkan dengan garis-garis gaya.</p>
      <p><b>Bahan magnetik</b> (ditarik magnet): besi, baja, nikel, kobalt. <b>Bahan nonmagnetik</b>: aluminium, tembaga, plastik, kayu. Perhatikan: aluminium juga logam, tetapi tidak ditarik magnet!</p>
      <p><b>Elektromagnet:</b> kawat berarus listrik menimbulkan medan magnet (ditemukan Oersted). Bila kawat dililitkan menjadi kumparan, medannya menguat.</p>
      <p class="rumus">Kekuatan elektromagnet ↑ bila: jumlah lilitan ↑ · arus ↑ · ada inti besi</p>
      <p><b>Besi lunak</b> mudah dijadikan magnet dan mudah kehilangan kemagnetannya — cocok untuk elektromagnet yang harus bisa melepas benda. <b>Baja</b> sulit kehilangan kemagnetan (menjadi magnet tetap), sehingga benda bisa tetap menempel.</p>
      <p>Arus besar membuat kawat <b>panas</b> (P = I² × R) dan baterai cepat habis. Kawat yang lebih panjang (lebih banyak lilitan) hambatannya lebih besar, sehingga arusnya lebih kecil.</p>
      <p class="peringatan">⚠️ Elektromagnet dari baterai bisa panas bila dinyalakan lama. Nyalakan hanya sebentar, dan jauhkan magnet dari HP, kartu ATM, serta alat pacu jantung.</p>`,
    kataKunci: ['magnet', 'kutub', 'medan', 'elektromagnet', 'lilitan', 'kumparan', 'arus', 'inti', 'besi lunak', 'baja', 'aluminium', 'magnetik', 'oersted', 'panas', 'hambatan'],
    variabel: [
      { id: 'lilitan', label: 'Jumlah lilitan', tipe: 'range', min: 20, max: 300, step: 20, satuan: 'lilitan', awal: 20 },
      { id: 'baterai', label: 'Jumlah baterai AA (seri)', tipe: 'range', min: 1, max: 4, step: 1, satuan: 'buah', awal: 2 },
      { id: 'inti', label: 'Inti kumparan', tipe: 'select', awal: 'udara', opsi: [['udara', 'Tanpa inti (udara)'], ['besi', 'Paku besi (besi lunak)'], ['baja', 'Baut baja keras'], ['aluminium', 'Batang aluminium']] },
      { id: 'kawat', label: 'Kawat tembaga', tipe: 'select', awal: 'tebal', opsi: [['tebal', 'Kawat email tebal 0,6 mm'], ['tipis', 'Kawat email tipis 0,3 mm']] },
      { id: 'benda', label: 'Benda yang diuji', tipe: 'select', awal: 'paku', opsi: [['paku', 'Paku kecil (2 g)'], ['klip', 'Klip kertas (0,5 g)'], ['aluminium', 'Potongan kaleng aluminium']] }
    ],
    keluaran: [
      { id: 'arus', label: 'Arus', satuan: 'A' },
      { id: 'medan', label: 'Kuat medan di ujung inti', satuan: 'mT' },
      { id: 'angkat', label: 'Benda terangkat', satuan: 'buah' },
      { id: 'sisa', label: 'Tertahan saat OFF', satuan: 'buah' },
      { id: 'panas', label: 'Panas di kawat', satuan: 'W' },
      { id: 'suhu', label: 'Suhu kawat', satuan: '' },
      { id: 'tahan', label: 'Baterai tahan', satuan: 'menit' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'pesawat',
    judul: 'Pengangkat Karung Garam',
    ikon: '⚙️',
    kelas: 'Kelas 8 · Usaha & Pesawat Sederhana (Tuas dan Katrol)',
    warna: '#475569',
    ringkas: 'Pilih dan rancang tuas atau katrol agar petani garam bisa menaikkan karung 60 kg ke gerobak dengan gaya kecil.',
    kisah: 'Saat panen, petani garam di tambak Besuki harus menaikkan <b>karung garam 60 kg</b> ke atas <b>bak gerobak setinggi 0,5 m</b>. Mengangkat langsung butuh gaya ± 588 N dan sering membuat punggung cedera. Rancang <b>pesawat sederhana</b> — tuas atau katrol — agar gaya yang dikeluarkan <b>paling besar 200 N</b> (seperti mengangkat 20 kg), jarak tarik/dorongnya tidak terlalu jauh, alatnya tidak patah, dan biayanya terjangkau.',
    kriteria: [
      'Gaya kuasa paling besar 200 N',
      'Karung naik minimal 0,5 m (setinggi bak gerobak)',
      'Jarak tarik/dorong paling jauh 3 m',
      'Alat tidak patah'
    ],
    kendala: ['Biaya paling banyak Rp 150.000', 'Panjang tuas paling panjang 3 m (agar muat di pematang tambak)'],
    konsep: `
      <p><b>Pesawat sederhana</b> adalah alat yang memudahkan kerja dengan <b>memperkecil gaya</b> atau <b>mengubah arah gaya</b>. Keuntungan mekanis (KM) menunjukkan berapa kali gaya diperkecil: <b>KM = beban ÷ kuasa</b>.</p>
      <p><b>Tuas (pengungkit)</b> memiliki titik tumpu, lengan beban, dan lengan kuasa. Pada tuas jenis 1, titik tumpu berada di antara beban dan kuasa.</p>
      <p class="rumus">Tuas: beban × lengan beban = kuasa × lengan kuasa &nbsp;·&nbsp; KM = lengan kuasa ÷ lengan beban</p>
      <p><b>Katrol tetap</b> hanya mengubah arah gaya (KM = 1). <b>Katrol bebas</b> ikut bergerak bersama beban (KM = 2). <b>Takal</b> (gabungan katrol) memiliki KM sebanyak jumlah tali yang menopang beban.</p>
      <p class="rumus">Usaha: W = F × s &nbsp;·&nbsp; Efisiensi = usaha untuk beban ÷ usaha yang dikeluarkan × 100%</p>
      <p><b>Tidak ada makan siang gratis!</b> Pesawat sederhana <b>tidak mengurangi usaha</b>. Gaya yang lebih kecil dibayar dengan <b>jarak tarik atau dorong yang lebih jauh</b>. Gesekan (misalnya katrol berkarat) dan berat katrol bebas bahkan membuat usaha yang dikeluarkan lebih besar.</p>`,
    kataKunci: ['tuas', 'katrol', 'takal', 'titik tumpu', 'lengan', 'keuntungan mekanis', 'km', 'usaha', 'gaya', 'jarak', 'efisiensi', 'gesekan', 'momen', 'pesawat sederhana'],
    variabel: [
      { id: 'alat', label: 'Jenis pesawat sederhana', tipe: 'select', awal: 'tetap', opsi: [['tetap', 'Katrol tetap'], ['bebas', 'Katrol bebas'], ['takal2', 'Takal 2 katrol'], ['takal4', 'Takal 4 katrol'], ['tuas', 'Tuas jenis 1 (pengungkit)']] },
      { id: 'kondisi', label: 'Kondisi katrol', tipe: 'select', awal: 'berkarat', opsi: [['berkarat', 'Berkarat (seret)'], ['dilumasi', 'Dibersihkan & dilumasi']] },
      { id: 'panjangTuas', label: 'Panjang tuas', tipe: 'range', min: 1, max: 3, step: 0.25, satuan: 'm', awal: 2 },
      { id: 'lenganBeban', label: 'Lengan beban tuas', tipe: 'range', min: 0.2, max: 1, step: 0.1, satuan: 'm', awal: 0.5 },
      { id: 'massa', label: 'Massa karung', tipe: 'range', min: 20, max: 80, step: 5, satuan: 'kg', awal: 60 }
    ],
    keluaran: [
      { id: 'kmIdeal', label: 'Keuntungan mekanis ideal', satuan: '' },
      { id: 'kmNyata', label: 'Keuntungan mekanis nyata', satuan: '' },
      { id: 'gaya', label: 'Gaya kuasa', satuan: 'N' },
      { id: 'naik', label: 'Karung naik', satuan: 'm' },
      { id: 'jarak', label: 'Jarak tarik/dorong', satuan: 'm' },
      { id: 'usahaKuasa', label: 'Usaha dikeluarkan', satuan: 'J' },
      { id: 'efisiensi', label: 'Efisiensi', satuan: '%' },
      { id: 'status', label: 'Hasil', satuan: '' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'optik',
    judul: 'Proyektor HP dari Kardus',
    ikon: '🔍',
    kelas: 'Kelas 8 · Cahaya & Alat Optik (Cermin dan Lensa)',
    warna: '#4f46e5',
    ringkas: 'Pilih cermin atau lensa yang tepat dan atur jaraknya agar video di HP terproyeksi besar, tajam, terang, dan tidak terbalik.',
    kisah: 'Proyektor di sekolah rusak, padahal guru ingin memutar video pembelajaran di dinding kelas. Kelompokmu ditantang membuat <b>proyektor dari kotak kardus dan HP</b>. Gambar di dinding harus <b>benar-benar terbentuk</b>, <b>tajam</b>, <b>lebarnya minimal 60 cm</b>, <b>cukup terang</b>, dan <b>tidak terbalik</b> — dengan biaya paling banyak Rp 50.000.',
    kriteria: [
      'Bayangan nyata (bisa ditangkap dinding)',
      'Gambar tajam (≥ 80%)',
      'Lebar gambar di dinding minimal 60 cm',
      'Cukup terang (≥ 40)',
      'Gambar tegak, tidak terbalik'
    ],
    kendala: ['Biaya paling banyak Rp 50.000', 'Jarak dinding paling jauh 4 m (ukuran kelas); panjang kotak paling panjang 60 cm'],
    konsep: `
      <p>Cahaya merambat lurus. <b>Cermin</b> memantulkan cahaya; <b>lensa</b> membiaskan (membelokkan) cahaya. Cermin/lensa <b>cekung dan cembung</b> dapat mengumpulkan atau menyebarkan cahaya.</p>
      <p class="rumus">1/f = 1/s + 1/s' &nbsp;·&nbsp; perbesaran M = s'/s</p>
      <p>f = jarak fokus, s = jarak benda, s' = jarak bayangan. Pada lensa cembung dan cermin cekung f bertanda positif; pada lensa cekung dan cermin cembung f negatif.</p>
      <p><b>Bayangan nyata</b> terbentuk dari perpotongan sinar-sinar sungguhan, sehingga <b>bisa ditangkap layar</b> — biasanya terbalik. <b>Bayangan maya</b> hanya "tampak" dari perpanjangan sinar, sehingga <b>tidak bisa ditangkap layar</b> (misalnya bayangan pada lup atau spion).</p>
      <p>Lensa cembung membentuk bayangan nyata <b>bila benda berada di luar titik fokus</b> (s &gt; f). Bila benda sedikit di luar fokus, bayangannya jauh dan <b>sangat diperbesar</b> — prinsip proyektor.</p>
      <p><b>Kecerahan:</b> cahaya dari HP yang terkumpul oleh lensa disebar ke seluruh gambar. Makin besar gambar, makin redup; lensa yang lebih lebar mengumpulkan lebih banyak cahaya.</p>
      <p class="peringatan">⚠️ Jangan pernah melihat matahari melalui lensa atau memusatkan cahaya matahari ke kulit, mata, atau kertas — bisa membakar!</p>`,
    kataKunci: ['cermin', 'lensa', 'cekung', 'cembung', 'fokus', 'bayangan', 'nyata', 'maya', 'terbalik', 'perbesaran', 'pembiasan', 'pemantulan', 'sinar', 'jarak benda', 'cahaya'],
    variabel: [
      { id: 'komponen', label: 'Komponen optik', tipe: 'select', awal: 'lensaCekung', opsi: [['lensaCekung', 'Lensa cekung'], ['lensaCembung', 'Lensa cembung (lup)'], ['cerminCekung', 'Cermin cekung (cermin rias)'], ['cerminCembung', 'Cermin cembung']] },
      { id: 'fokus', label: 'Jarak fokus', tipe: 'range', min: 5, max: 30, step: 1, satuan: 'cm', awal: 10 },
      { id: 'jarakBenda', label: 'Jarak HP ke lensa/cermin', tipe: 'range', min: 5, max: 60, step: 1, satuan: 'cm', awal: 20 },
      { id: 'jarakLayar', label: 'Jarak lensa/cermin ke dinding', tipe: 'range', min: 30, max: 400, step: 10, satuan: 'cm', awal: 100 },
      { id: 'diameter', label: 'Diameter lensa/cermin', tipe: 'range', min: 2, max: 10, step: 1, satuan: 'cm', awal: 3 },
      { id: 'hp', label: 'Posisi HP', tipe: 'select', awal: 'tegak', opsi: [['tegak', 'Tegak (biasa)'], ['terbalik', 'Diputar terbalik (180°)']] }
    ],
    keluaran: [
      { id: 'bayangan', label: "Jarak bayangan s'", satuan: 'cm' },
      { id: 'perbesaran', label: 'Perbesaran', satuan: '×' },
      { id: 'sifat', label: 'Sifat bayangan', satuan: '' },
      { id: 'lebar', label: 'Lebar gambar di dinding', satuan: 'cm' },
      { id: 'tajam', label: 'Ketajaman', satuan: '%' },
      { id: 'terang', label: 'Kecerahan relatif', satuan: '' },
      { id: 'arah', label: 'Arah gambar di dinding', satuan: '' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'bunyi',
    judul: 'Sasando Mini dari Kardus',
    ikon: '🎸',
    kelas: 'Kelas 8 · Getaran, Gelombang & Bunyi',
    warna: '#c2410c',
    ringkas: 'Setel senar alat musik petik buatanmu agar berbunyi tepat pada nada A (440 Hz) dan cukup nyaring untuk pentas.',
    kisah: 'Untuk pentas seni sekolah, kelompokmu membuat <b>alat musik petik sederhana</b> terinspirasi <b>sasando</b>: senar dibentangkan di atas kotak, lalu ditegangkan dengan <b>botol air yang digantung</b>. Agar bisa dimainkan bersama alat musik lain, senar harus berbunyi tepat pada nada <b>A = 440 Hz</b> (selisih paling banyak 5 Hz), <b>cukup nyaring</b> (≥ 65 dB), dan <b>senarnya tidak putus</b>.',
    kriteria: [
      'Nada A (440 Hz), selisih paling banyak 5 Hz',
      'Cukup nyaring: minimal 65 dB pada jarak 1 m',
      'Senar tidak putus'
    ],
    kendala: ['Biaya paling banyak Rp 15.000', 'Panjang senar paling panjang 60 cm (muat di kotak)'],
    konsep: `
      <p><b>Bunyi</b> berasal dari benda yang <b>bergetar</b>. Getaran merambat melalui udara sebagai <b>gelombang longitudinal</b> sampai ke telinga.</p>
      <p><b>Frekuensi (f)</b> adalah banyaknya getaran tiap sekon (hertz). Frekuensi menentukan <b>tinggi rendahnya nada</b>. <b>Amplitudo</b> (simpangan terjauh) menentukan <b>kuat lemahnya (kenyaringan) bunyi</b>. Periode T = 1/f.</p>
      <p class="rumus">Hukum Mersenne: f = (1 / 2L) × √(T / μ) &nbsp;·&nbsp; cepat rambat v = λ × f</p>
      <p>Nada senar makin <b>tinggi</b> bila senar makin <b>pendek</b> (L kecil), makin <b>tegang</b> (T besar), atau makin <b>ringan/tipis</b> (μ kecil, massa per meter).</p>
      <p>Senar yang dipetik membentuk <b>gelombang berdiri</b>: ujungnya diam (simpul), tengahnya bergetar paling besar (perut). Panjang gelombang nada dasarnya λ = 2L.</p>
      <p><b>Resonansi:</b> kotak kardus ikut bergetar bersama senar dan udara di dalamnya, sehingga bunyinya lebih nyaring — tetapi tidak mengubah tinggi nada.</p>
      <p class="peringatan">⚠️ Senar yang sangat tegang bisa putus dan terlempar. Jauhkan wajah dari senar dan jangan membunyikan terlalu keras di dekat telinga.</p>`,
    kataKunci: ['getaran', 'gelombang', 'frekuensi', 'amplitudo', 'nada', 'hertz', 'periode', 'resonansi', 'mersenne', 'tegangan', 'panjang senar', 'kenyaringan', 'desibel', 'bunyi', 'cepat rambat'],
    variabel: [
      { id: 'senar', label: 'Jenis senar', tipe: 'select', awal: 'karet', opsi: [['karet', 'Karet gelang'], ['nilon', 'Senar pancing nilon 0,5 mm'], ['baja', 'Senar baja 0,3 mm']] },
      { id: 'panjang', label: 'Panjang senar bergetar', tipe: 'range', min: 20, max: 60, step: 1, satuan: 'cm', awal: 40 },
      { id: 'beban', label: 'Massa botol air (penegang)', tipe: 'range', min: 0.5, max: 10, step: 0.25, satuan: 'kg', awal: 1 },
      { id: 'resonator', label: 'Kotak resonansi', tipe: 'select', awal: 'tanpa', opsi: [['tanpa', 'Papan tanpa kotak'], ['kaleng', 'Kaleng bekas'], ['kardus', 'Kotak kardus berlubang']] },
      { id: 'petikan', label: 'Cara memetik', tipe: 'select', awal: 'pelan', opsi: [['pelan', 'Dipetik pelan'], ['kuat', 'Dipetik kuat']] }
    ],
    keluaran: [
      { id: 'frekuensi', label: 'Frekuensi', satuan: 'Hz' },
      { id: 'nada', label: 'Nada terdekat', satuan: '' },
      { id: 'selisih', label: 'Selisih dari 440 Hz', satuan: 'Hz' },
      { id: 'nyaring', label: 'Kenyaringan (1 m)', satuan: 'dB' },
      { id: 'periode', label: 'Periode', satuan: 'ms' },
      { id: 'cepatRambat', label: 'Cepat rambat gelombang di senar', satuan: 'm/s' },
      { id: 'lambdaUdara', label: 'Panjang gelombang bunyi di udara', satuan: 'm' },
      { id: 'status', label: 'Hasil', satuan: '' }
    ]
  },
  {
    id: 'gempa',
    judul: 'Rumah Tahan Gempa dari Kardus',
    ikon: '🏠',
    kelas: 'Kelas 8 · Struktur Bumi, Gempa & Getaran',
    warna: '#b45309',
    ringkas: 'Rancang miniatur rumah 2 lantai dari kardus yang tetap berdiri dan tidak retak saat diguncang meja getar.',
    kisah: 'Indonesia berada di pertemuan <b>lempeng-lempeng tektonik</b>, sehingga gempa bumi sering terjadi. Banyak korban justru tertimpa <b>bangunan yang runtuh</b>. Desa di dekat sekolahmu ingin membangun ulang rumah warga agar lebih tahan gempa. Sebelum membangun rumah sungguhan, kelompokmu diminta menguji <b>miniatur rumah 2 lantai dari kardus</b> di atas <b>meja getar</b> yang berguncang <b>3 kali per detik (3 Hz)</b> sejauh <b>2 cm</b>. Rumah harus <b>tidak runtuh</b>, <b>tidak retak</b>, dan <b>tetap di atas fondasinya</b>.',
    kriteria: [
      'Tidak runtuh pada guncangan uji 2 cm, 3 Hz',
      'Tidak retak: simpangan antar-lantai paling banyak 1,5% dari tingginya',
      'Rumah tetap di atas fondasi (geser permanen paling banyak 1 cm)',
      'Rumah 2 lantai sesuai kebutuhan warga'
    ],
    kendala: ['Biaya paling banyak Rp 25.000', 'Tiap lantai tinggi 15 cm, denah 15 × 15 cm, diberi beban uji 250 g (kantong pasir)'],
    konsep: `
      <p><b>Gempa bumi</b> terjadi ketika energi yang tersimpan di batuan kerak bumi dilepaskan secara tiba-tiba, misalnya saat <b>lempeng tektonik</b> bergeser. Energi itu merambat sebagai <b>gelombang seismik</b> yang mengguncang tanah bolak-balik.</p>
      <p>Setiap bangunan punya <b>frekuensi alami</b>, yaitu berapa kali ia berayun tiap detik bila didorong lalu dilepas. Bangunan yang <b>kaku dan ringan</b> berayun cepat (frekuensi tinggi). Bangunan yang <b>lentur dan berat</b> berayun lambat.</p>
      <p class="rumus">frekuensi alami f = (1/2π) × √(k / m) &nbsp;·&nbsp; k = kekakuan, m = massa</p>
      <p><b>Resonansi:</b> bila frekuensi alami bangunan <b>mendekati frekuensi guncangan tanah</b>, ayunannya diperkuat berkali-kali lipat — seperti ayunan yang didorong tepat pada iramanya. Jadi, membuat rumah "sedikit lebih kaku" belum tentu lebih aman!</p>
      <p><b>Cara membuat bangunan tahan gempa:</b> (1) <b>pengaku</b> (bresing silang atau dinding geser) menambah kekakuan dan kekuatan; (2) <b>sambungan yang kuat</b> agar gaya tersalur tanpa lepas; (3) <b>atap ringan</b> karena gaya gempa sebanding massa (F = m × a); (4) <b>isolasi dasar</b> — bantalan lentur di bawah bangunan yang meredam guncangan sebelum masuk ke bangunan.</p>
      <p class="peringatan">⚠️ Gunakan cutter hanya dengan pengawasan guru. Saat gempa sungguhan: <b>merunduk, berlindung di bawah meja kokoh, dan berpegangan</b> — jauhi kaca dan lemari tinggi.</p>`,
    kataKunci: ['gempa', 'lempeng', 'tektonik', 'seismik', 'getaran', 'frekuensi', 'resonansi', 'kekakuan', 'massa', 'pengaku', 'bresing', 'dinding geser', 'isolasi', 'fondasi', 'simpangan', 'gaya', 'sambungan', 'atap'],
    variabel: [
      { id: 'lantai', label: 'Jumlah lantai', tipe: 'range', min: 1, max: 4, step: 1, satuan: 'lantai', awal: 2 },
      { id: 'pengaku', label: 'Pengaku dinding', tipe: 'select', awal: 'tanpa', opsi: [['tanpa', 'Tanpa pengaku'], ['silang', 'Bresing silang (tusuk sate)'], ['dinding', 'Dinding geser (kardus dobel)']] },
      { id: 'sambungan', label: 'Sambungan', tipe: 'select', awal: 'lem', opsi: [['selotip', 'Selotip'], ['lem', 'Lem kertas'], ['pasak', 'Lem + pasak tusuk sate']] },
      { id: 'fondasi', label: 'Fondasi', tipe: 'select', awal: 'tempel', opsi: [['tempel', 'Ditempel langsung ke meja'], ['karet', 'Bantalan karet sandal (isolasi)'], ['kelereng', 'Kelereng di tutup botol (isolasi)']] },
      { id: 'atap', label: 'Atap', tipe: 'select', awal: 'berat', opsi: [['berat', 'Berat (genteng tiruan)'], ['ringan', 'Ringan (seng/kertas)']] },
      { id: 'amplitudo', label: 'Kekuatan guncangan meja getar', tipe: 'range', min: 0.5, max: 2.5, step: 0.25, satuan: 'cm', awal: 2 }
    ],
    keluaran: [
      { id: 'frekuensiAlami', label: 'Frekuensi alami rumah', satuan: 'Hz' },
      { id: 'penguatan', label: 'Penguatan getaran di atap', satuan: '×' },
      { id: 'simpangan', label: 'Simpangan atap', satuan: 'cm' },
      { id: 'drift', label: 'Simpangan antar-lantai', satuan: '%' },
      { id: 'gaya', label: 'Gaya geser di dasar', satuan: 'N' },
      { id: 'kekuatan', label: 'Kekuatan sambungan', satuan: 'N' },
      { id: 'geser', label: 'Geser permanen di fondasi', satuan: 'cm' },
      { id: 'status', label: 'Hasil', satuan: '' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  }
];

const LAPISAN = [['kerikil', 'Kerikil'], ['ijuk', 'Ijuk'], ['pasir', 'Pasir halus'], ['arang', 'Arang'], ['kosong', '— kosong —']];

/* ---------------- Uji Nalar (kuis berpikir kritis) ----------------
   Konvensi: jawaban benar SELALU opsi[0]; opsi diacak saat tampil. */
const UJI_NALAR = [
  {
    ind: 'evaluasi',
    soal: 'Sebuah pesan berantai berbunyi: "Minum air es setelah makan membuat lemak di perut membeku dan memicu kanker!" Tanggapan paling kritis adalah …',
    opsi: [
      'Meragukannya, karena air es cepat menghangat oleh suhu tubuh ± 37 °C dan klaim sebesar itu perlu bukti penelitian.',
      'Mempercayainya, karena es memang dapat membekukan minyak dan lemak bila dibiarkan cukup lama di dalam lemari es.',
      'Mempercayainya, karena pesan itu sudah dibagikan ribuan kali dan dikirim oleh banyak orang yang berbeda-beda setiap hari.',
      'Menolaknya tanpa memeriksa, karena semua pesan berantai yang beredar di grup percakapan sudah pasti bohong.'
    ],
    bahas: 'Pemikir kritis memeriksa klaim dengan pengetahuan sains (suhu tubuh jauh di atas titik beku lemak) dan menuntut bukti. Jumlah pembagi bukan bukti. Menolak semua pesan tanpa memeriksa juga bukan sikap kritis.'
  },
  {
    ind: 'analisis',
    soal: 'Rina menguji pengaruh jenis pupuk terhadap tinggi tanaman. Tanaman A diberi pupuk X dan diletakkan di teras, tanaman B diberi pupuk Y dan diletakkan di dalam kamar. Kelemahan utama percobaan Rina adalah …',
    opsi: [
      'Ada dua hal yang berbeda sekaligus, yaitu jenis pupuk dan tempat, sehingga penyebab perbedaan tinggi tidak jelas.',
      'Rina tidak mengukur tinggi tanaman setiap hari, sehingga pertumbuhan hariannya tidak dapat digambarkan dalam grafik.',
      'Pupuk X dan pupuk Y berasal dari merek yang berbeda, sehingga harga keduanya tidak sama dan percobaannya tidak adil.',
      'Tanaman di dalam kamar terlindung dari hujan, sehingga Rina seharusnya menyiram tanaman di teras lebih banyak.'
    ],
    bahas: 'Uji yang adil hanya mengubah SATU variabel bebas. Tempat (cahaya) juga berubah, jadi perbedaan tinggi bisa disebabkan pupuk, cahaya, atau keduanya.'
  },
  {
    ind: 'inferensi',
    soal: 'Data: pada hari-hari ketika penjualan es krim tinggi, jumlah orang tenggelam di pantai juga tinggi. Kesimpulan paling tepat adalah …',
    opsi: [
      'Keduanya mungkin dipicu cuaca panas yang membuat orang membeli es krim dan berenang, jadi belum tentu sebab-akibat.',
      'Makan es krim membuat tubuh kedinginan dan mudah kram saat berenang, sehingga es krim menjadi penyebab orang tenggelam.',
      'Banyaknya orang tenggelam membuat pengunjung pantai cemas, lalu mereka membeli es krim untuk menenangkan diri.',
      'Data itu membuktikan pantai harus melarang penjualan es krim agar jumlah orang yang tenggelam ikut berkurang.'
    ],
    bahas: 'Korelasi (dua hal naik-turun bersama) tidak sama dengan sebab-akibat. Cari variabel ketiga yang mungkin memengaruhi keduanya.'
  },
  {
    ind: 'interpretasi',
    soal: 'Grafik menunjukkan suhu air yang dipanaskan naik dari 25 °C ke 100 °C selama 8 menit, lalu tetap 100 °C selama 5 menit berikutnya walaupun api terus menyala. Makna bagian mendatar grafik adalah …',
    opsi: [
      'Kalor yang diterima dipakai untuk mengubah wujud air menjadi uap air, sehingga suhu air tidak lagi bertambah.',
      'Air sudah penuh menyimpan kalor, sehingga kalor dari api tidak dapat masuk lagi dan suhu air berhenti naik.',
      'Termometer biasa hanya dapat mengukur sampai 100 °C, sehingga angkanya berhenti walaupun suhu air terus naik.',
      'Api kompor mengecil setelah 8 menit, sehingga kalor yang diterima air hanya cukup untuk menjaga suhunya tetap.'
    ],
    bahas: 'Saat mendidih, kalor dipakai untuk mengubah wujud (kalor uap), sehingga suhu tetap walaupun kalor terus diberikan.'
  },
  {
    ind: 'evaluasi',
    soal: 'Iklan sabun: "9 dari 10 dokter merekomendasikan sabun kami!" Pertanyaan paling penting untuk menilai klaim tersebut adalah …',
    opsi: [
      'Berapa banyak dokter yang disurvei, bagaimana mereka dipilih, dan pertanyaan apa yang diajukan kepada mereka?',
      'Apakah sabun itu sudah lama dijual di pasaran dan apakah kemasannya mencantumkan tanggal kedaluwarsa yang jelas?',
      'Apakah harga sabun itu lebih murah daripada sabun lain yang juga direkomendasikan oleh para dokter terkenal?',
      'Apakah dokter yang tampil di iklan itu memakai jas putih dan bekerja di rumah sakit yang besar dan terkenal?'
    ],
    bahas: 'Kekuatan bukti bergantung pada cara data dikumpulkan: jumlah sampel, cara memilih sampel, dan pertanyaan yang diajukan. Bisa saja hanya 10 dokter yang ditanya.'
  },
  {
    ind: 'inferensi',
    soal: 'Dua gelas berisi air bersuhu sama. Gelas A dibungkus kain basah, gelas B tidak. Setelah 30 menit di tempat berangin, air di gelas A lebih dingin. Dugaan paling masuk akal adalah …',
    opsi: [
      'Air pada kain menguap dan menyerap kalor dari gelas, sehingga suhu air di gelas A turun lebih cepat.',
      'Kain basah menghalangi sinar matahari masuk ke gelas A, sehingga air di dalamnya tidak menjadi lebih panas.',
      'Angin membawa kalor ke gelas B, sedangkan kain basah menahan kalor dari angin agar tidak masuk ke gelas A.',
      'Air dingin dari kain meresap menembus dinding gelas, lalu bercampur dengan air di dalam gelas A sedikit demi sedikit.'
    ],
    bahas: 'Penguapan memerlukan kalor. Kalor diambil dari gelas dan isinya, sehingga suhunya turun — prinsip kendi tanah liat dan keringat.'
  },
  {
    ind: 'analisis',
    soal: 'Budi ingin menyelidiki "Apakah warna cahaya memengaruhi laju fotosintesis Hydrilla?" Variabel terikat yang paling tepat adalah …',
    opsi: [
      'Jumlah gelembung oksigen yang dihasilkan Hydrilla setiap menit.',
      'Warna cahaya lampu yang diarahkan ke tumbuhan Hydrilla.',
      'Jarak lampu ke gelas kimia yang dijaga tetap sama.',
      'Suhu air dalam gelas kimia selama percobaan berlangsung.'
    ],
    bahas: 'Variabel terikat adalah yang diukur sebagai hasil. Warna cahaya adalah variabel bebas; jarak lampu dan suhu air adalah variabel kontrol yang dijaga tetap.'
  },
  {
    ind: 'eksplanasi',
    soal: 'Manakah penjelasan yang memuat KLAIM, BUKTI, dan PENALARAN secara lengkap?',
    opsi: [
      'Styrofoam lebih baik menjaga es karena es bertahan 20 jam, sedangkan di kardus 5 jam; rongga udaranya menghambat kalor.',
      'Styrofoam lebih baik menjaga es karena es bertahan 20 jam, sedangkan di kardus hanya bertahan sekitar 5 jam saja.',
      'Styrofoam lebih baik menjaga es karena rongga udaranya menghambat perpindahan kalor dari luar ke dalam kotak.',
      'Kardus dan styrofoam sama-sama isolator, jadi keduanya sama baiknya untuk menjaga es tetap beku selama perjalanan.'
    ],
    bahas: 'Penjelasan ilmiah yang kuat menyatakan jawaban (klaim), menyertakan data (bukti), dan menghubungkannya dengan konsep sains (penalaran).'
  },
  {
    ind: 'evaluasi',
    soal: 'Siti mengukur waktu larut gula hanya SATU kali untuk tiap suhu air. Saran terbaik untuk memperkuat hasilnya adalah …',
    opsi: [
      'Mengulang pengukuran beberapa kali pada setiap suhu air, lalu menghitung rata-rata waktu larut gulanya.',
      'Menambah lebih banyak variasi suhu air, misalnya 10 suhu berbeda, tetapi tetap mengukur satu kali saja.',
      'Memakai stopwatch digital yang lebih mahal agar angka waktu larut yang tercatat menjadi lebih teliti.',
      'Hanya mencatat hasil yang sesuai hipotesis agar kesimpulan laporannya menjadi lebih meyakinkan.'
    ],
    bahas: 'Pengulangan mengurangi pengaruh kesalahan acak. Alat yang lebih teliti atau variasi suhu yang lebih banyak tidak menggantikan pengulangan, dan membuang data yang tidak sesuai hipotesis adalah praktik yang tidak jujur.'
  },
  {
    ind: 'regulasi',
    soal: 'Hasil percobaanmu ternyata BERTENTANGAN dengan hipotesismu. Sikap ilmiah yang paling tepat adalah …',
    opsi: [
      'Memeriksa ulang prosedur; bila prosedurnya benar, hipotesis direvisi karena itu tetap temuan yang berharga.',
      'Mengulang percobaan berkali-kali sampai muncul satu hasil yang sesuai, lalu hanya hasil itu yang dilaporkan.',
      'Menyimpulkan bahwa percobaannya pasti salah, karena hipotesis sudah dipikirkan matang dan didukung buku.',
      'Mengganti hipotesis agar sesuai dengan data, lalu menulis laporan seolah hipotesis itu sudah ada sejak awal.'
    ],
    bahas: 'Hipotesis boleh salah. Ilmuwan memeriksa prosedurnya, lalu memperbarui pemahamannya berdasarkan bukti — inilah regulasi diri. Mengulang sampai hasilnya cocok, atau mengubah hipotesis seolah sudah ada sejak awal, adalah tidak jujur.'
  },
  {
    ind: 'inferensi',
    soal: 'Sebuah paku besi dimasukkan ke tabung berisi air, tabung kedua berisi minyak, tabung ketiga kosong dan tertutup rapat berisi kapur tohor (penyerap uap air). Setelah seminggu, hanya paku di air yang berkarat. Kesimpulan yang didukung data adalah …',
    opsi: [
      'Air dan oksigen terlarut di dalamnya diperlukan agar besi berkarat; tanpa air, paku tidak berkarat.',
      'Minyak melindungi paku dari karat, sehingga semua benda yang diolesi minyak tidak akan pernah berkarat.',
      'Udara kering mempercepat karat, tetapi kapur tohor menyerapnya sehingga paku di tabung ketiga tetap bersih.',
      'Semua jenis logam pasti berkarat bila direndam air selama seminggu, termasuk emas, perak, dan aluminium.'
    ],
    bahas: 'Kesimpulan harus sebatas bukti. Data hanya tentang besi, jadi tidak boleh digeneralisasi ke semua logam.'
  },
  {
    ind: 'interpretasi',
    soal: 'Tabel: massa 3 benda berturut-turut 50 g, 50 g, 50 g dan volumenya 20 cm³, 50 cm³, 80 cm³. Jika dimasukkan ke air (1 g/cm³), pernyataan yang benar adalah …',
    opsi: [
      'Benda pertama tenggelam, benda kedua melayang, dan benda ketiga terapung karena perbedaan massa jenisnya.',
      'Ketiganya tenggelam karena massanya sama besar, yaitu 50 g, dan lebih berat daripada air di sekitarnya.',
      'Benda pertama terapung karena volumenya paling kecil sehingga lebih sedikit air yang harus didesaknya.',
      'Benda pertama melayang, benda kedua terapung, dan benda ketiga tenggelam karena volumenya paling besar.'
    ],
    bahas: 'Massa jenis = massa/volume: 2,5 g/cm³ (tenggelam), 1 g/cm³ (melayang), 0,625 g/cm³ (terapung). Massa saja tidak menentukan.'
  },
  {
    ind: 'evaluasi',
    soal: 'Saat cuka dicampur soda kue, muncul banyak gelembung dan gelas terasa dingin. Budi berpendapat: "Ini perubahan fisika, karena gelembungnya sama seperti air mendidih." Penilaian paling tepat terhadap pendapat Budi adalah …',
    opsi: [
      'Kurang tepat: gelembungnya gas CO₂, zat baru hasil reaksi, bukan uap air seperti pada air yang mendidih.',
      'Tepat: gelembung muncul karena cairan bergolak, sama seperti air mendidih, dan tidak terbentuk zat baru.',
      'Tepat: suhunya turun, bukan naik, dan perubahan kimia selalu menghasilkan panas sehingga ini perubahan fisika.',
      'Kurang tepat: ini perubahan kimia karena perubahan kimia selalu ditandai munculnya api atau cahaya terang.'
    ],
    bahas: 'Kemiripan tampilan (sama-sama bergelembung) belum tentu berarti proses yang sama. Kuncinya: apakah terbentuk zat baru? Gas CO₂ dan natrium asetat adalah zat baru. Perubahan kimia juga tidak harus disertai api atau kenaikan suhu.'
  },
  {
    ind: 'inferensi',
    soal: 'Dina meluncurkan roket air bertekanan 2 bar dan roketnya terbang 20 m. Ia menyimpulkan: "Kalau tekanannya 4 bar, roketku pasti terbang tepat 40 m." Tanggapan paling kritis adalah …',
    opsi: [
      'Belum tentu: jarak belum tentu sebanding dengan tekanan karena ada hambatan udara, jadi perlu diuji dengan aman.',
      'Benar: tekanan dua kali lipat memberi dorongan dua kali lipat, sehingga jaraknya juga tepat dua kali lipat.',
      'Salah: tekanan tidak memengaruhi jarak, karena jarak terbang roket hanya ditentukan oleh besar sudut peluncurannya saja.',
      'Benar: asalkan jumlah air juga dilipatgandakan, karena air yang menyemprot keluar menjadi pendorong roket.'
    ],
    bahas: 'Satu data belum cukup untuk menyimpulkan pola sebanding. Banyak hubungan di alam tidak lurus (linier). Cara ilmiahnya: kumpulkan beberapa data pada tekanan berbeda (variabel lain tetap), lalu lihat polanya — sambil tetap menjaga keselamatan.'
  },
  {
    ind: 'evaluasi',
    soal: 'Jembatan stik A menahan 20 kg dan massanya 400 g. Jembatan B menahan 15 kg dan massanya 150 g. Juri lomba menilai "rancangan paling baik" berdasarkan efisiensi. Penilaian yang paling tepat adalah …',
    opsi: [
      'Jembatan B lebih baik: setiap gram bahannya menahan 100 g beban, sedangkan jembatan A hanya 50 g.',
      'Jembatan A lebih baik: beban yang ditahannya 20 kg, lebih besar 5 kg daripada beban jembatan B.',
      'Keduanya sama baik: selisih bebannya hanya 5 kg dan keduanya sama-sama menahan lebih dari 10 kg.',
      'Jembatan A lebih baik: massanya lebih besar sehingga lebih kokoh dan lebih tahan terhadap guncangan.'
    ],
    bahas: 'Menilai dengan kritis berarti memakai kriteria yang disepakati. Bila kriterianya efisiensi, bandingkan beban per massa bahan, bukan beban mentah saja. Dengan kriteria lain (misalnya beban terbesar), jawabannya bisa berbeda.'
  },
  {
    ind: 'interpretasi',
    soal: 'Daya angin dirumuskan P = ½ × ρ × A × v³. Jika kecepatan angin naik dari 3 m/s menjadi 6 m/s (dua kali lipat), sedangkan kincirnya sama, daya angin yang melewati kincir menjadi …',
    opsi: [
      'Delapan kali lipat, karena kecepatan dalam rumus dipangkatkan tiga (2³ = 8).',
      'Dua kali lipat, karena daya sebanding dengan kecepatan angin yang naik dua kali.',
      'Empat kali lipat, karena kecepatan dikuadratkan seperti pada energi kinetik (2² = 4).',
      'Enam kali lipat, karena kecepatan dua kali lipat dikalikan pangkat tiga (2 × 3 = 6).'
    ],
    bahas: 'Membaca rumus dengan cermat adalah bagian dari interpretasi. Pangkat tiga berarti 2³ = 2 × 2 × 2 = 8, bukan 2 × 3 = 6. Perubahan kecil kecepatan angin berdampak besar pada daya — itulah sebabnya lokasi kincir (tempat berangin kencang) sangat penting.'
  },
  {
    ind: 'inferensi',
    soal: 'Pada lampu hias warna-warni, satu bohlam kecil putus dan seluruh untaian lampu ikut padam. Sementara itu, di rumah, saat lampu kamar putus, lampu ruang tamu tetap menyala. Kesimpulan yang paling didukung bukti ini adalah …',
    opsi: [
      'Lampu hias kemungkinan dirangkai seri, sedangkan lampu rumah dirangkai paralel sehingga cabang lain tetap berarus.',
      'Lampu hias kemungkinan dirangkai paralel, sehingga satu bohlam putus memutus arus ke semua cabang sekaligus.',
      'Lampu hias memakai listrik yang lebih lemah, sehingga satu bohlam putus membuat arusnya tidak cukup lagi.',
      'Lampu rumah memakai kabel lebih tebal, sehingga arus tetap dapat melompati lampu kamar yang sudah putus.'
    ],
    bahas: 'Pola "satu putus, semua padam" adalah bukti jalur tunggal (seri). Pola "satu putus, yang lain tetap" adalah bukti jalur bercabang (paralel). Kesimpulan harus berdasar pola bukti, bukan dugaan tentang harga atau kekuatan listrik.'
  },
  {
    ind: 'evaluasi',
    soal: 'Andi menguji sebuah kaleng minuman dengan magnet. Kaleng itu tidak tertarik sama sekali. Andi menyimpulkan: "Berarti kaleng ini bukan logam." Penilaian yang paling tepat terhadap kesimpulan Andi adalah …',
    opsi: [
      'Kurang tepat: tidak tertarik magnet hanya berarti bukan bahan magnetik, misalnya aluminium yang juga logam.',
      'Tepat: semua logam pasti ditarik magnet, jadi benda yang tidak tertarik magnet pasti bukan terbuat dari logam.',
      'Tepat: kaleng minuman terbuat dari plastik tebal yang dilapisi cat perak agar tampak seperti logam.',
      'Kurang tepat: magnetnya kemungkinan terlalu lemah, karena semua logam akan tertarik oleh magnet yang kuat.'
    ],
    bahas: 'Kesimpulan Andi melompat terlalu jauh dari buktinya. Bukti "tidak ditarik magnet" hanya berarti bukan bahan magnetik. Banyak logam — aluminium, tembaga, emas — tidak ditarik magnet. Pemikir kritis membedakan "bukan magnetik" dengan "bukan logam".'
  },
  {
    ind: 'evaluasi',
    soal: 'Sebuah iklan alat takal berbunyi: "Dengan takal kami, usaha Anda mengangkat beban berkurang 4 kali lipat!" Penilaian yang paling tepat terhadap klaim itu adalah …',
    opsi: [
      'Keliru: takal memperkecil gaya, tetapi tali ditarik lebih jauh sehingga usahanya tetap, bahkan bertambah.',
      'Benar: keuntungan mekanis takal itu 4, sehingga usaha untuk mengangkat beban menjadi seperempatnya.',
      'Benar: beban terasa jauh lebih ringan saat diangkat, dan itu berarti usaha yang dikeluarkan berkurang.',
      'Keliru: takal justru memperbesar gaya yang diperlukan, sehingga usaha yang dikeluarkan menjadi 4 kali lebih besar.'
    ],
    bahas: 'Usaha = gaya × jarak. Pesawat sederhana menukar gaya kecil dengan jarak yang lebih jauh; usahanya tidak berkurang. Klaim iklan mencampuradukkan "gaya" dan "usaha" — pemikir kritis memeriksa istilah yang dipakai.'
  },
  {
    ind: 'evaluasi',
    soal: 'Dina berkata, "Lensa cembung (lup) selalu membuat benda tampak lebih besar." Tanggapan yang paling tepat adalah …',
    opsi: [
      'Belum tentu: bila benda lebih jauh dari dua kali jarak fokus, bayangannya nyata, terbalik, dan diperkecil.',
      'Benar: lensa cembung disebut kaca pembesar, sehingga benda pada jarak berapa pun tampak lebih besar.',
      'Salah: lensa cembung selalu memperkecil bayangan, sedangkan yang memperbesar adalah lensa cekung.',
      'Benar: asalkan lensanya bersih dan cahayanya cukup, benda yang dilihat lewat lup selalu diperbesar.'
    ],
    bahas: 'Kata "selalu" dalam sebuah klaim perlu diuji. Sifat bayangan lensa cembung berubah-ubah menurut posisi benda: di dalam fokus → maya, tegak, diperbesar (lup); antara f dan 2f → nyata, terbalik, diperbesar (proyektor); lebih dari 2f → nyata, terbalik, diperkecil (kamera).'
  },
  {
    ind: 'analisis',
    soal: 'Raka memetik senar gitar lebih keras, lalu berkata, "Nadanya jadi lebih tinggi." Penyetel nada (tuner) di HP menunjukkan frekuensinya tetap 440 Hz. Penjelasan yang paling tepat adalah …',
    opsi: [
      'Petikan keras memperbesar amplitudo sehingga bunyi lebih nyaring, sedangkan frekuensi senar tidak berubah.',
      'Tuner di HP kemungkinan kurang peka, karena petikan yang lebih keras seharusnya selalu menaikkan frekuensi senar.',
      'Petikan keras membuat senar sedikit memanjang, sehingga nadanya naik walaupun tuner tidak mencatatnya.',
      'Petikan keras menaikkan tinggi nada, sedangkan frekuensi hanya menentukan kenyaringan bunyi senar itu.'
    ],
    bahas: 'Analisis membedakan dua besaran yang sering tertukar: amplitudo (kenyaringan) dan frekuensi (tinggi nada). Bukti alat ukur (tuner) lebih kuat daripada kesan pendengaran — telinga kadang mengira bunyi yang lebih keras terdengar lebih tinggi.'
  },
  {
    ind: 'evaluasi',
    soal: 'Setelah sebuah gempa, gedung 10 lantai di satu kota rusak berat, sedangkan rumah 1 lantai di sebelahnya utuh. Seorang warganet menulis: "Terbukti, bangunan tinggi SELALU lebih lemah saat gempa." Evaluasi klaim tersebut.',
    opsi: [
      'Klaim terlalu luas: kerusakan juga bergantung pada resonansi, rancangan, dan bahan; perlu data banyak gempa.',
      'Klaim benar: satu kejadian nyata yang disaksikan banyak orang sudah cukup untuk membuktikan klaim tersebut.',
      'Klaim benar: bangunan tinggi lebih berat sehingga gaya gempanya lebih besar dan pasti roboh lebih dulu.',
      'Klaim salah: bangunan tinggi dibuat dari beton bertulang dan baja sehingga selalu lebih kuat daripada rumah biasa.'
    ],
    bahas: 'Satu kejadian tidak cukup untuk kata "selalu". Bangunan tinggi biasanya berfrekuensi alami rendah, rumah rendah berfrekuensi tinggi. Gempa yang getarannya lambat membahayakan gedung tinggi; gempa yang getarannya cepat bisa lebih membahayakan rumah rendah. Karena itu insinyur memeriksa resonansi, bukan hanya tinggi bangunan.'
  }
];
