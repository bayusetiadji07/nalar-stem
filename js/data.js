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
  }
];

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
    kisah: 'Pekan Sains sekolah mengadakan <b>lomba roket botol ramah lingkungan</b>. Bahan bakarnya hanya boleh <b>cuka dapur dan soda kue</b>. Roket harus mendarat di <b>zona target 15–25 m</b> — lebih jauh dari itu akan melewati pagar lapangan. Juri juga menilai <b>hemat bahan</b>: jangan sampai banyak cuka atau soda kue yang terbuang tanpa bereaksi.',
    kriteria: [
      'Roket mendarat di zona target 15–25 m',
      'Pereaksi yang terbuang (tidak ikut bereaksi) paling banyak 20%',
      'Busa tidak meluap sebelum botol tertutup'
    ],
    kendala: ['Biaya bahan paling banyak Rp 10.000 (cuka Rp 20/mL, soda kue Rp 100/g)', 'Hanya cuka dapur (5%) atau cuka yang diencerkan — cuka biang (25%) DILARANG karena korosif'],
    konsep: `
      <p><b>Perubahan fisika</b> tidak menghasilkan zat baru (misalnya es mencair, gula larut). <b>Perubahan kimia</b> menghasilkan zat baru yang sifatnya berbeda dari zat asal.</p>
      <p>Saat cuka (mengandung asam asetat) bertemu soda kue (natrium bikarbonat), terjadi <b>reaksi kimia</b>:</p>
      <p class="rumus">CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑</p>
      <p><b>Ciri perubahan kimia</b> yang teramati: muncul gelembung gas, campuran terasa lebih dingin (reaksi menyerap kalor), dan terbentuk zat baru (natrium asetat, air, gas karbon dioksida).</p>
      <p><b>Perbandingan massa:</b> 60 g asam asetat tepat bereaksi dengan 84 g soda kue. Cuka dapur 5% berarti 100 mL cuka mengandung ± 5 g asam asetat. Pereaksi yang habis lebih dulu disebut <b>pereaksi pembatas</b> — ia menentukan banyaknya gas yang terbentuk; kelebihan pereaksi lain terbuang percuma.</p>
      <p><b>Gas CO₂</b> terkumpul di ruang kosong botol sehingga <b>tekanan</b> naik. Saat sumbat lepas, gas mendorong cairan keluar ke bawah dan roket terdorong ke atas (<b>Hukum III Newton: aksi–reaksi</b>). Terlalu sedikit cairan → sedikit "massa dorong"; terlalu banyak → ruang gas sempit.</p>
      <p class="peringatan">⚠️ Keselamatan: pakai kacamata pelindung, luncurkan di lapangan terbuka, jangan mengarahkan roket ke orang, pakai botol plastik (bukan kaca), dan jangan memakai cuka biang.</p>`,
    kataKunci: ['reaksi', 'kimia', 'perubahan kimia', 'zat baru', 'gas', 'karbon dioksida', 'co2', 'asam', 'pereaksi', 'pembatas', 'tekanan', 'gelembung', 'aksi', 'newton', 'bikarbonat'],
    variabel: [
      { id: 'cuka', label: 'Volume cuka', tipe: 'range', min: 50, max: 700, step: 25, satuan: 'mL', awal: 100 },
      { id: 'soda', label: 'Massa soda kue', tipe: 'range', min: 5, max: 50, step: 1, satuan: 'g', awal: 10 },
      { id: 'kadar', label: 'Jenis cuka', tipe: 'select', awal: 'dapur', opsi: [['dapur', 'Cuka dapur 5%'], ['encer', 'Cuka diencerkan 2,5%']] },
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
      'Meragukannya: suhu tubuh ± 37 °C sehingga air es segera menghangat; klaim sebesar itu butuh bukti penelitian dari sumber tepercaya.',
      'Percaya, karena es memang bisa membekukan benda.',
      'Percaya, karena pesan itu sudah dibagikan ribuan kali.',
      'Tidak peduli, karena semua pesan berantai pasti bohong.'
    ],
    bahas: 'Pemikir kritis memeriksa klaim dengan pengetahuan sains (suhu tubuh jauh di atas titik beku lemak) dan menuntut bukti. Jumlah pembagi bukan bukti. Menolak semua pesan tanpa memeriksa juga bukan sikap kritis.'
  },
  {
    ind: 'analisis',
    soal: 'Rina menguji pengaruh jenis pupuk terhadap tinggi tanaman. Tanaman A diberi pupuk X dan diletakkan di teras, tanaman B diberi pupuk Y dan diletakkan di dalam kamar. Kelemahan utama percobaan Rina adalah …',
    opsi: [
      'Dua variabel berubah sekaligus (jenis pupuk dan tempat/cahaya), sehingga penyebab perbedaan tinggi tidak bisa dipastikan.',
      'Jumlah pupuk yang dipakai terlalu sedikit.',
      'Rina tidak memakai tanaman yang mahal.',
      'Tanaman seharusnya diukur dengan penggaris besi.'
    ],
    bahas: 'Uji yang adil hanya mengubah SATU variabel bebas. Tempat (cahaya) juga berubah, jadi perbedaan tinggi bisa disebabkan pupuk, cahaya, atau keduanya.'
  },
  {
    ind: 'inferensi',
    soal: 'Data: pada hari-hari ketika penjualan es krim tinggi, jumlah orang tenggelam di pantai juga tinggi. Kesimpulan paling tepat adalah …',
    opsi: [
      'Keduanya kemungkinan dipengaruhi faktor ketiga (cuaca panas membuat orang membeli es krim dan berenang), jadi belum tentu ada hubungan sebab-akibat.',
      'Makan es krim menyebabkan orang tenggelam.',
      'Orang tenggelam menyebabkan penjualan es krim naik.',
      'Pantai sebaiknya melarang penjualan es krim.'
    ],
    bahas: 'Korelasi (dua hal naik-turun bersama) tidak sama dengan sebab-akibat. Cari variabel ketiga yang mungkin memengaruhi keduanya.'
  },
  {
    ind: 'interpretasi',
    soal: 'Grafik menunjukkan suhu air yang dipanaskan naik dari 25 °C ke 100 °C selama 8 menit, lalu tetap 100 °C selama 5 menit berikutnya walaupun api terus menyala. Makna bagian mendatar grafik adalah …',
    opsi: [
      'Kalor yang diterima digunakan untuk mengubah wujud air menjadi uap, bukan untuk menaikkan suhu.',
      'Api kompor padam selama 5 menit.',
      'Termometer rusak sehingga angkanya berhenti.',
      'Air berhenti menerima kalor.'
    ],
    bahas: 'Saat mendidih, kalor dipakai untuk mengubah wujud (kalor uap), sehingga suhu tetap walaupun kalor terus diberikan.'
  },
  {
    ind: 'evaluasi',
    soal: 'Iklan sabun: "9 dari 10 dokter merekomendasikan sabun kami!" Pertanyaan paling penting untuk menilai klaim tersebut adalah …',
    opsi: [
      'Berapa jumlah dokter yang disurvei, siapa yang memilih mereka, dan apa pertanyaan survei yang diajukan?',
      'Apa warna kemasan sabun tersebut?',
      'Berapa harga sabun tersebut?',
      'Siapa artis yang membintangi iklannya?'
    ],
    bahas: 'Kekuatan bukti bergantung pada cara data dikumpulkan: jumlah sampel, cara memilih sampel, dan pertanyaan yang diajukan. Bisa saja hanya 10 dokter yang ditanya.'
  },
  {
    ind: 'inferensi',
    soal: 'Dua gelas berisi air bersuhu sama. Gelas A dibungkus kain basah, gelas B tidak. Setelah 30 menit di tempat berangin, air di gelas A lebih dingin. Dugaan paling masuk akal adalah …',
    opsi: [
      'Air pada kain menguap sambil menyerap kalor dari gelas, sehingga air di gelas A mendingin.',
      'Kain mengandung zat pendingin kimia.',
      'Gelas A lebih kecil dari gelas B.',
      'Angin menambah kalor pada gelas B.'
    ],
    bahas: 'Penguapan memerlukan kalor. Kalor diambil dari gelas dan isinya, sehingga suhunya turun — prinsip kendi tanah liat dan keringat.'
  },
  {
    ind: 'analisis',
    soal: 'Budi ingin menyelidiki "Apakah warna cahaya memengaruhi laju fotosintesis Hydrilla?" Variabel terikat yang paling tepat adalah …',
    opsi: [
      'Jumlah gelembung oksigen yang dihasilkan per menit.',
      'Warna cahaya lampu.',
      'Jenis tumbuhan Hydrilla.',
      'Volume air dalam gelas kimia.'
    ],
    bahas: 'Variabel terikat adalah yang diukur sebagai hasil. Warna cahaya adalah variabel bebas; jenis tumbuhan dan volume air adalah variabel kontrol.'
  },
  {
    ind: 'eksplanasi',
    soal: 'Manakah penjelasan yang memuat KLAIM, BUKTI, dan PENALARAN secara lengkap?',
    opsi: [
      'Kotak styrofoam lebih baik menjaga es (klaim) karena es bertahan 20 jam dibanding 5 jam pada kardus (bukti); styrofoam berongga udara sehingga konduktivitas kalornya kecil (penalaran).',
      'Kotak styrofoam lebih baik karena memang begitu.',
      'Es di kotak styrofoam bertahan 20 jam.',
      'Styrofoam adalah isolator dan kardus juga isolator.'
    ],
    bahas: 'Penjelasan ilmiah yang kuat menyatakan jawaban (klaim), menyertakan data (bukti), dan menghubungkannya dengan konsep sains (penalaran).'
  },
  {
    ind: 'evaluasi',
    soal: 'Siti mengukur waktu larut gula hanya SATU kali untuk tiap suhu air. Saran terbaik untuk memperkuat hasilnya adalah …',
    opsi: [
      'Mengulang pengukuran beberapa kali untuk tiap suhu lalu menghitung rata-ratanya.',
      'Mengganti gula dengan garam.',
      'Menulis laporannya dengan huruf yang lebih rapi.',
      'Hanya melaporkan hasil yang sesuai hipotesis.'
    ],
    bahas: 'Pengulangan mengurangi pengaruh kesalahan acak. Membuang data yang tidak sesuai hipotesis adalah praktik yang tidak jujur.'
  },
  {
    ind: 'regulasi',
    soal: 'Hasil percobaanmu ternyata BERTENTANGAN dengan hipotesismu. Sikap ilmiah yang paling tepat adalah …',
    opsi: [
      'Memeriksa ulang prosedur; jika prosedurnya benar, menerima bahwa hipotesis perlu direvisi — itu tetap temuan yang berharga.',
      'Mengubah data agar sesuai hipotesis.',
      'Menyimpulkan bahwa percobaan pasti salah karena hipotesis sudah dipikirkan matang.',
      'Berhenti meneliti karena gagal.'
    ],
    bahas: 'Hipotesis boleh salah. Ilmuwan memeriksa prosedurnya, lalu memperbarui pemahamannya berdasarkan bukti — inilah regulasi diri.'
  },
  {
    ind: 'inferensi',
    soal: 'Sebuah paku besi dimasukkan ke tabung berisi air, tabung kedua berisi minyak, tabung ketiga kosong dan tertutup rapat berisi kapur tohor (penyerap uap air). Setelah seminggu, hanya paku di air yang berkarat. Kesimpulan yang didukung data adalah …',
    opsi: [
      'Air (dan oksigen yang terlarut) diperlukan agar besi berkarat.',
      'Minyak mempercepat perkaratan.',
      'Semua logam berkarat di dalam air.',
      'Paku besi tidak pernah berkarat di udara terbuka.'
    ],
    bahas: 'Kesimpulan harus sebatas bukti. Data hanya tentang besi, jadi tidak boleh digeneralisasi ke semua logam.'
  },
  {
    ind: 'interpretasi',
    soal: 'Tabel: massa 3 benda berturut-turut 50 g, 50 g, 50 g dan volumenya 20 cm³, 50 cm³, 80 cm³. Jika dimasukkan ke air (1 g/cm³), pernyataan yang benar adalah …',
    opsi: [
      'Benda pertama tenggelam, benda ketiga terapung, benda kedua melayang.',
      'Ketiganya tenggelam karena massanya sama.',
      'Ketiganya terapung karena massanya kecil.',
      'Benda pertama terapung karena volumenya paling kecil.'
    ],
    bahas: 'Massa jenis = massa/volume: 2,5 g/cm³ (tenggelam), 1 g/cm³ (melayang), 0,625 g/cm³ (terapung). Massa saja tidak menentukan.'
  },
  {
    ind: 'evaluasi',
    soal: 'Saat cuka dicampur soda kue, muncul banyak gelembung dan gelas terasa dingin. Budi berpendapat: "Ini perubahan fisika, karena gelembungnya sama seperti air mendidih." Penilaian paling tepat terhadap pendapat Budi adalah …',
    opsi: [
      'Kurang tepat: gelembung pada air mendidih adalah uap air (zat yang sama), sedangkan gelembung di sini adalah gas CO₂ — zat baru hasil reaksi, jadi ini perubahan kimia.',
      'Tepat, karena setiap gelembung pasti menandakan perubahan fisika.',
      'Tepat, karena suhunya turun, bukan naik seperti air mendidih.',
      'Kurang tepat, karena perubahan kimia selalu menghasilkan api.'
    ],
    bahas: 'Kemiripan tampilan (sama-sama bergelembung) belum tentu berarti proses yang sama. Kuncinya: apakah terbentuk zat baru? Gas CO₂ dan natrium asetat adalah zat baru. Perubahan kimia juga tidak harus disertai api atau kenaikan suhu.'
  }
];
