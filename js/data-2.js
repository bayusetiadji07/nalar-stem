/* =========================================================
   NalarSTEM — misi 15–23: masalah sehari-hari di sekitar sekolah pesisir Besuki
   (ditambahkan ke MISI, NYATA, dan UJI_NALAR dari data.js; simulasinya di sim-2.js)
   ========================================================= */
MISI.push(
  {
    id: 'pengering',
    judul: 'Pengering Ikan Asin Tenaga Surya',
    ikon: '🐟',
    kelas: 'Kelas 7 · Suhu, Kalor & Perpindahan Kalor',
    warna: '#ea580c',
    ringkas: 'Rancang pengering tenaga surya agar ikan asin nelayan kering dalam 2 hari, tidak gosong, dan bebas lalat.',
    kisah: 'Saat musim ikan, nelayan di Besuki menjemur ikan asin di atas para-para terbuka. Pengeringan butuh <b>4–5 hari</b>, ikan sering <b>dihinggapi lalat</b>, dan basah lagi bila mendung. Kelompok nelayan meminta bantuan kelasmu merancang <b>pengering tenaga surya</b> sederhana untuk <b>2 kg ikan</b>. Ikan harus mencapai <b>kadar air paling banyak 40% dalam 2 hari</b>, tetapi suhu di dalam tidak boleh lebih dari <b>60 °C</b> agar ikan tidak matang, dan udaranya tidak boleh terlalu lembap.',
    kriteria: [
      'Kadar air ikan paling banyak 40% dalam 2 hari cerah',
      'Suhu di dalam pengering paling tinggi 60 °C',
      'Kelembapan udara di dalam paling tinggi 75%',
      'Ikan terlindung dari lalat'
    ],
    kendala: ['Biaya paling banyak Rp 30.000', 'Luas rak 0,5 m², memuat sekitar 3 kg ikan'],
    konsep: `
      <p><b>Kalor</b> dari matahari sampai ke bumi lewat <b>radiasi</b>. Permukaan <b>gelap dan kusam menyerap</b> lebih banyak radiasi daripada permukaan putih atau mengilap yang memantulkannya.</p>
      <p>Penutup bening (plastik atau kaca) meneruskan cahaya masuk, tetapi menahan udara panas agar tidak segera keluar. Hasilnya, suhu di dalam naik, mirip mobil yang diparkir di bawah terik.</p>
      <p><b>Penguapan (evaporasi)</b> air dari ikan makin cepat bila suhu tinggi dan udara di sekitarnya <b>kering</b>. Uap air yang keluar dari ikan harus dibuang lewat <b>ventilasi</b> (konveksi). Tanpa ventilasi, udara di dalam jenuh oleh uap sehingga ikan sulit kering walaupun panas.</p>
      <p class="rumus">kalor diserap ≈ intensitas cahaya × luas × daya serap · laju penguapan ∝ (uap jenuh pada suhu itu − uap di udara)</p>
      <p>Jadi ada <b>titik terbaik</b>: ventilasi terlalu kecil membuat panas tetapi lembap, ventilasi terlalu besar membuat udara kering tetapi suhu turun. Kemiringan penutup juga berpengaruh, karena sinar paling banyak diterima bila permukaan menghadap matahari.</p>
      <p class="peringatan">⚠️ Kaca mudah pecah dan tepinya tajam. Pakai sarung tangan saat merakit, dan jangan menyentuh alas hitam yang terjemur lama karena bisa sangat panas.</p>`,
    kataKunci: ['kalor', 'radiasi', 'konduksi', 'konveksi', 'suhu', 'penguapan', 'evaporasi', 'kelembapan', 'ventilasi', 'menyerap', 'memantulkan', 'hitam', 'penutup', 'kadar air', 'matahari'],
    variabel: [
      { id: 'alas', label: 'Alas penyerap panas', tipe: 'select', awal: 'putih', opsi: [['hitam', 'Kain/cat hitam'], ['seng', 'Seng mengilap'], ['putih', 'Kertas/kain putih']] },
      { id: 'penutup', label: 'Penutup', tipe: 'select', awal: 'terbuka', opsi: [['terbuka', 'Tanpa penutup'], ['plastik', 'Plastik bening'], ['kaca', 'Kaca bening']] },
      { id: 'ventilasi', label: 'Lubang ventilasi berkasa', tipe: 'range', min: 0, max: 10, step: 1, satuan: 'lubang', awal: 0 },
      { id: 'miring', label: 'Kemiringan penutup', tipe: 'range', min: 0, max: 60, step: 5, satuan: '°', awal: 45 },
      { id: 'ikan', label: 'Massa ikan basah', tipe: 'range', min: 1, max: 5, step: 0.5, satuan: 'kg', awal: 2 },
      { id: 'cuaca', label: 'Cuaca', tipe: 'select', awal: 'cerah', opsi: [['cerah', 'Cerah'], ['berawan', 'Berawan']] }
    ],
    keluaran: [
      { id: 'suhu', label: 'Suhu di dalam', satuan: '°C' },
      { id: 'lembap', label: 'Kelembapan di dalam', satuan: '%' },
      { id: 'laju', label: 'Laju penguapan', satuan: 'g/jam' },
      { id: 'kadarAir', label: 'Kadar air setelah 2 hari', satuan: '%' },
      { id: 'jamKering', label: 'Lama sampai kering', satuan: 'jam sinar' },
      { id: 'hariKering', label: 'Lama sampai kering', satuan: 'hari' },
      { id: 'lalat', label: 'Dihinggapi lalat', satuan: '' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'garam',
    judul: 'Panen Garam Lebih Cepat dan Bersih',
    ikon: '🧂',
    kelas: 'Kelas 7 · Zat, Campuran & Pemisahan (Penguapan, Kristalisasi)',
    warna: '#0284c7',
    ringkas: 'Atur petak garam agar panen dalam seminggu, hasilnya banyak, dan kemurniannya memenuhi syarat garam konsumsi.',
    kisah: 'Tambak garam di pesisir Situbondo biasanya memakai <b>dasar tanah</b>. Garamnya sering <b>kusam bercampur lumpur</b> dan harganya murah. Sekolahmu ingin membuat <b>petak garam percontohan</b> di lahan sempit (paling luas <b>4 m²</b>). Garam harus bisa dipanen <b>dalam 7 hari</b> sebelum hujan datang, hasilnya minimal <b>3 kg</b>, dan kemurniannya minimal <b>94% NaCl</b> seperti syarat garam konsumsi.',
    kriteria: [
      'Garam dapat dipanen dalam 7 hari',
      'Hasil garam minimal 3 kg per panen',
      'Kemurnian NaCl minimal 94%'
    ],
    kendala: ['Luas petak paling banyak 4 m²', 'Biaya paling banyak Rp 60.000 (terpal hitam Rp 12.000/m², plastik putih Rp 8.000/m²)'],
    konsep: `
      <p>Air laut adalah <b>campuran</b>: air sebagai pelarut dan garam (sebagian besar natrium klorida, NaCl) sebagai zat terlarut, ditambah sedikit garam lain dan kotoran. Kadar garam air laut sekitar <b>3,5%</b>, artinya 1 liter air laut berisi ± 35 g garam.</p>
      <p>Garam dipisahkan dengan <b>penguapan</b>: panas matahari dan angin menguapkan airnya, sedangkan garam tertinggal. Ketika airnya tinggal sedikit, larutan menjadi <b>jenuh</b> dan garam mulai membentuk <b>kristal</b> (kristalisasi).</p>
      <p class="rumus">hasil garam = volume air × kadar garam · lama panen ≈ kedalaman air ÷ laju penguapan</p>
      <p>Air yang <b>dangkal</b> lebih cepat panas dan cepat habis menguap, tetapi garamnya lebih sedikit. <b>Alas gelap</b> menyerap panas sehingga penguapan lebih cepat, dan alas terpal tidak bercampur lumpur. Petani garam juga memakai <b>air tua</b>, yaitu air laut yang sudah dipekatkan di petak lain (peminihan). Pada tahap itu sebagian kotoran dan gips sudah mengendap lebih dulu.</p>
      <p><b>Penyaringan</b> dengan kain atau pasir memisahkan partikel padat yang tidak larut (lumpur, pasir, sampah), tetapi tidak bisa memisahkan garam yang terlarut.</p>
      <p class="peringatan">⚠️ Jangan mencicipi garam hasil percobaan sebelum dicuci dan diperiksa guru. Gunakan topi dan air minum saat bekerja di bawah terik.</p>`,
    kataKunci: ['campuran', 'larutan', 'pelarut', 'zat terlarut', 'penguapan', 'evaporasi', 'kristal', 'kristalisasi', 'jenuh', 'penyaringan', 'filtrasi', 'kadar', 'nacl', 'kemurnian', 'air tua'],
    variabel: [
      { id: 'sumber', label: 'Sumber air', tipe: 'select', awal: 'laut', opsi: [['laut', 'Air laut langsung (± 3,5%)'], ['tua', 'Air tua dari petak peminihan (± 15%)']] },
      { id: 'alas', label: 'Alas petak', tipe: 'select', awal: 'tanah', opsi: [['tanah', 'Tanah dipadatkan'], ['terpal', 'Terpal hitam'], ['putih', 'Plastik putih']] },
      { id: 'saring', label: 'Penyaringan awal', tipe: 'select', awal: 'tanpa', opsi: [['tanpa', 'Tanpa disaring'], ['kain', 'Disaring kain'], ['kainpasir', 'Kain + pasir']] },
      { id: 'dalam', label: 'Kedalaman air', tipe: 'range', min: 1, max: 10, step: 0.5, satuan: 'cm', awal: 6 },
      { id: 'luas', label: 'Luas petak', tipe: 'range', min: 1, max: 6, step: 0.5, satuan: 'm²', awal: 2 },
      { id: 'cuaca', label: 'Cuaca', tipe: 'select', awal: 'cerah', opsi: [['cerah', 'Kemarau cerah'], ['berawan', 'Sering berawan']] }
    ],
    keluaran: [
      { id: 'volume', label: 'Volume air', satuan: 'L' },
      { id: 'laju', label: 'Laju penguapan', satuan: 'mm/hari' },
      { id: 'hari', label: 'Lama sampai panen', satuan: 'hari' },
      { id: 'garam', label: 'Hasil garam', satuan: 'kg' },
      { id: 'murni', label: 'Kemurnian NaCl', satuan: '%' },
      { id: 'perHari', label: 'Hasil per hari', satuan: 'kg/hari' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'boraks',
    judul: 'Detektor Boraks dari Kunyit',
    ikon: '🧪',
    kelas: 'Kelas 8 · Zat Aditif & Indikator Alami (Asam–Basa)',
    warna: '#ca8a04',
    ringkas: 'Rancang kertas uji kunyit yang mendeteksi boraks pada jajanan tanpa salah menuduh makanan yang aman.',
    kisah: 'Kantin dan pedagang di sekitar sekolah menjual kerupuk dan bakso yang sangat kenyal. Beredar kabar ada yang memakai <b>boraks</b>, bahan pengawet yang <b>dilarang</b> untuk makanan. Kelompokmu ditugasi membuat <b>kertas uji dari kunyit</b> yang murah untuk penapisan awal. Kertas harus <b>berubah merah bata</b> pada sampel berboraks, termasuk Bakso C yang kadarnya rendah (60 ppm). Kertas juga <b>tidak boleh salah merah</b> pada makanan aman, misalnya kerupuk yang adonannya memakai air kapur.',
    kriteria: [
      'Boraks terdeteksi pada sampel 150 ppm dan 60 ppm',
      'Tidak ada positif palsu pada sampel tanpa boraks',
      'Hasil keluar paling lama 20 menit'
    ],
    kendala: ['Biaya paling banyak Rp 10.000 (kunyit Rp 20/g, alkohol 70% Rp 6.000, kertas saring Rp 2.000, cuka Rp 1.000)', 'Hasil hanya penapisan awal — bukan uji laboratorium resmi'],
    konsep: `
      <p><b>Zat aditif</b> adalah bahan yang sengaja ditambahkan ke makanan, misalnya pengawet, pewarna, atau pemanis. Ada zat aditif yang diizinkan, ada yang <b>dilarang</b> karena berbahaya. <b>Boraks</b> (natrium tetraborat) dilarang dipakai di makanan karena dapat merusak hati, ginjal, dan otak bila tertelan terus-menerus.</p>
      <p>Kunyit mengandung zat warna <b>kurkumin</b> yang bisa menjadi <b>indikator alami</b>. Kurkumin bereaksi dengan asam borat membentuk senyawa berwarna <b>merah bata</b> (rosocyanin). Warna ini terbentuk terutama saat kertas <b>mengering</b>, dan lebih jelas bila sampel diberi sedikit <b>asam</b>.</p>
      <p>Hati-hati: kurkumin juga berubah cokelat kemerahan dalam larutan <b>basa</b> (misalnya air kapur atau soda kue). Tanpa diasamkan, makanan basa yang aman bisa tampak "positif". Inilah <b>positif palsu</b>.</p>
      <p class="rumus">kunyit + boraks (suasana asam, dikeringkan) → merah bata · kunyit + basa → cokelat kemerahan (positif palsu)</p>
      <p>Kurkumin lebih mudah larut dalam <b>alkohol</b> daripada air. Ekstrak terlalu encer menghasilkan warna lemah, sedangkan ekstrak terlalu pekat membuat kertas sangat kuning sehingga perubahan warnanya sulit dibedakan.</p>
      <p class="peringatan">⚠️ Jangan mencicipi sampel. Cuci tangan setelah praktik. Alkohol mudah terbakar, jauhkan dari api. Hasil uji ini hanya <b>indikasi awal</b>: laporkan kepada guru atau petugas kesehatan, dan jangan menuduh pedagang tertentu.</p>`,
    kataKunci: ['zat aditif', 'pengawet', 'boraks', 'kunyit', 'kurkumin', 'indikator', 'asam', 'basa', 'positif palsu', 'negatif palsu', 'ppm', 'ekstrak', 'alkohol', 'warna', 'penapisan'],
    variabel: [
      { id: 'kunyit', label: 'Kunyit untuk ekstrak (per 20 mL)', tipe: 'range', min: 1, max: 8, step: 0.5, satuan: 'g', awal: 2 },
      { id: 'pelarut', label: 'Pelarut ekstrak', tipe: 'select', awal: 'air', opsi: [['air', 'Air'], ['alkohol', 'Alkohol 70%']] },
      { id: 'asam', label: 'Perlakuan sampel', tipe: 'select', awal: 'tanpa', opsi: [['tanpa', 'Tanpa diasamkan'], ['cuka', 'Diberi 2 tetes cuka']] },
      { id: 'kering', label: 'Waktu mengeringkan kertas', tipe: 'range', min: 0, max: 30, step: 5, satuan: 'menit', awal: 0 }
    ],
    keluaran: [
      { id: 'benar', label: 'Sampel terbaca benar', satuan: '' },
      { id: 'palsuPos', label: 'Positif palsu', satuan: 'sampel' },
      { id: 'palsuNeg', label: 'Negatif palsu', satuan: 'sampel' },
      { id: 'batas', label: 'Batas deteksi', satuan: 'ppm' },
      { id: 'waktu', label: 'Waktu sampai hasil', satuan: 'menit' },
      { id: 'kekuningan', label: 'Kekuningan kertas', satuan: '%' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'nyamuk',
    judul: 'Perangkap Nyamuk DBD dari Botol',
    ikon: '🦟',
    kelas: 'Kelas 7–9 · Interaksi Makhluk Hidup & Bioteknologi (Fermentasi)',
    warna: '#be123c',
    ringkas: 'Rancang perangkap nyamuk dari botol bekas dengan ragi dan gula yang efektif, murah, dan tidak menjadi sarang jentik.',
    kisah: 'Setiap pancaroba, kasus <b>demam berdarah (DBD)</b> di sekitar sekolah meningkat. Nyamuk <i>Aedes aegypti</i> tertarik pada <b>gas karbon dioksida (CO₂)</b> yang kita embuskan. Kelompokmu ditantang membuat <b>perangkap dari botol bekas</b> berisi larutan gula dan ragi yang menghasilkan CO₂. Perangkap harus menangkap minimal <b>20 nyamuk per minggu</b>, tetap menghasilkan CO₂ sampai diganti, biayanya paling banyak <b>Rp 5.000 per bulan</b>, dan <b>tidak boleh berubah menjadi sarang jentik</b>.',
    kriteria: [
      'Masih menghasilkan CO₂ sampai saatnya diganti',
      'Menangkap minimal 20 nyamuk per minggu',
      'Tidak menjadi sarang jentik (diganti paling lama 7 hari)'
    ],
    kendala: ['Biaya isi ulang paling banyak Rp 5.000 per bulan (gula Rp 15/g, ragi Rp 100/g)', 'Memakai botol plastik bekas 1,5 L'],
    konsep: `
      <p><b>Ragi</b> adalah jamur bersel satu (<i>Saccharomyces</i>). Saat kekurangan oksigen, ragi mengubah gula menjadi alkohol dan <b>gas karbon dioksida</b>. Proses ini disebut <b>fermentasi</b>, salah satu contoh bioteknologi sederhana.</p>
      <p class="rumus">gula → alkohol + karbon dioksida (oleh ragi) · 100 g gula ≈ 49 g CO₂</p>
      <p>Ragi bekerja paling baik pada suhu hangat (± 30–35 °C). Pada suhu dingin ragi lambat, dan di atas ± 45 °C ragi mati. Ragi yang banyak menghasilkan CO₂ dengan cepat, tetapi gulanya cepat habis.</p>
      <p>Nyamuk betina mencari darah dengan mengikuti <b>CO₂</b>, warna <b>gelap</b>, dan tempat <b>teduh</b>. Perangkap memanfaatkan perilaku ini: nyamuk masuk lewat corong, lalu sulit keluar lagi.</p>
      <p><b>Daur hidup nyamuk</b>: telur → jentik (larva) → kepompong → nyamuk dewasa, kira-kira 7–10 hari. Nyamuk bisa bertelur di air perangkap. Bila perangkap tidak diganti dalam 7 hari, perangkap justru menjadi <b>tempat berkembang biak</b> nyamuk baru.</p>
      <p class="peringatan">⚠️ Gunting botol dengan hati-hati atau minta bantuan guru. Buang larutan lama ke tanah atau saluran, bukan ke genangan, lalu bilas botolnya.</p>`,
    kataKunci: ['fermentasi', 'ragi', 'gula', 'karbon dioksida', 'co2', 'bioteknologi', 'nyamuk', 'aedes', 'dbd', 'jentik', 'larva', 'daur hidup', 'suhu', 'perangkap', 'interaksi'],
    variabel: [
      { id: 'gula', label: 'Gula', tipe: 'range', min: 10, max: 100, step: 5, satuan: 'g', awal: 100 },
      { id: 'ragi', label: 'Ragi', tipe: 'range', min: 0.5, max: 5, step: 0.5, satuan: 'g', awal: 3 },
      { id: 'suhu', label: 'Suhu air pelarut', tipe: 'range', min: 20, max: 50, step: 1, satuan: '°C', awal: 25 },
      { id: 'botol', label: 'Warna botol', tipe: 'select', awal: 'bening', opsi: [['bening', 'Bening'], ['hitam', 'Dibungkus hitam']] },
      { id: 'letak', label: 'Letak perangkap', tipe: 'select', awal: 'terang', opsi: [['terang', 'Tempat terang terkena matahari'], ['teduh', 'Sudut teduh dan lembap']] },
      { id: 'ganti', label: 'Larutan diganti setiap', tipe: 'range', min: 3, max: 14, step: 1, satuan: 'hari', awal: 14 }
    ],
    keluaran: [
      { id: 'co2', label: 'Produksi CO₂', satuan: 'g/hari' },
      { id: 'lama', label: 'Lama menghasilkan CO₂', satuan: 'hari' },
      { id: 'tangkap', label: 'Nyamuk tertangkap', satuan: 'per minggu' },
      { id: 'perHari', label: 'Nyamuk tertangkap', satuan: 'per hari' },
      { id: 'jentik', label: 'Menjadi sarang jentik', satuan: '' },
      { id: 'biaya', label: 'Biaya isi ulang', satuan: 'Rp/bulan' }
    ]
  },
  {
    id: 'kompos',
    judul: 'Kompos Sampah Kantin Tanpa Bau',
    ikon: '🍂',
    kelas: 'Kelas 7 · Ekosistem & Interaksi Makhluk Hidup (Dekomposer)',
    warna: '#4d7c0f',
    ringkas: 'Olah sampah organik kantin menjadi kompos yang matang dalam sebulan, panas cukup untuk membunuh bibit penyakit, dan tidak berbau.',
    kisah: 'Setiap hari kantin sekolah menghasilkan <b>sisa sayur, kulit buah, dan nasi</b>, sedangkan halaman penuh <b>daun kering</b>. Sampah dibuang ke tempat sampah dan berbau. Kelasmu ditugasi membuat <b>pengomposan</b> di sudut sekolah. Kompos harus <b>matang dalam 30 hari</b>, <b>tidak berbau</b> agar tidak diprotes warga sekolah, dan suhunya sempat mencapai <b>45 °C</b> supaya bibit penyakit dan biji gulma mati.',
    kriteria: [
      'Kompos matang paling lama 30 hari',
      'Tidak berbau busuk atau amonia',
      'Suhu puncak minimal 45 °C'
    ],
    kendala: ['Biaya paling banyak Rp 20.000', 'Bahan dari sampah kantin (hijau) dan daun kering halaman (cokelat)'],
    konsep: `
      <p>Di alam, <b>dekomposer</b> (bakteri, jamur, cacing) menguraikan sisa makhluk hidup menjadi zat yang menyuburkan tanah. Tanpa dekomposer, daur materi di ekosistem terhenti.</p>
      <p>Dekomposer memerlukan "makanan" yang seimbang: <b>karbon (C)</b> sebagai sumber energi dari bahan <b>cokelat</b> (daun kering, kardus) dan <b>nitrogen (N)</b> untuk tumbuh dari bahan <b>hijau</b> (sisa sayur, kulit buah). Perbandingan terbaik <b>C/N ± 25–35</b>.</p>
      <p class="rumus">C/N campuran ≈ 1 ÷ (bagian cokelat/60 + bagian hijau/15)</p>
      <p>Dekomposer juga perlu <b>air</b> secukupnya (± 50–60%, seperti spons yang diperas) dan <b>oksigen</b>. Bila terlalu basah atau tidak pernah dibalik, oksigen habis. Mikroba anaerob lalu mengambil alih dan menimbulkan <b>bau busuk</b>. Bila bahan hijau terlalu banyak (C/N rendah), kelebihan nitrogen lepas sebagai <b>amonia</b> yang menyengat.</p>
      <p>Mikroba yang aktif menghasilkan panas, sehingga tumpukan kompos yang baik bisa mencapai <b>45–60 °C</b>. Cacahan kecil memperluas permukaan sehingga lebih cepat terurai.</p>
      <p class="peringatan">⚠️ Pakai sarung tangan dan cuci tangan dengan sabun setelah mengolah sampah. Jangan memasukkan daging, tulang, atau minyak karena mengundang tikus dan lalat.</p>`,
    kataKunci: ['dekomposer', 'pengurai', 'kompos', 'ekosistem', 'daur', 'karbon', 'nitrogen', 'c/n', 'oksigen', 'aerob', 'anaerob', 'kelembapan', 'bau', 'amonia', 'mikroba'],
    variabel: [
      { id: 'cokelat', label: 'Bagian bahan cokelat (daun kering)', tipe: 'range', min: 0, max: 90, step: 5, satuan: '%', awal: 20 },
      { id: 'air', label: 'Kelembapan', tipe: 'range', min: 20, max: 90, step: 5, satuan: '%', awal: 75 },
      { id: 'balik', label: 'Pembalikan', tipe: 'select', awal: 'tidak', opsi: [['tidak', 'Tidak pernah dibalik'], ['7', 'Dibalik tiap 7 hari'], ['3', 'Dibalik tiap 3 hari']] },
      { id: 'cacah', label: 'Ukuran cacahan', tipe: 'select', awal: 'besar', opsi: [['besar', 'Besar (utuh)'], ['sedang', 'Sedang (± 5 cm)'], ['kecil', 'Kecil (± 1 cm)']] },
      { id: 'wadah', label: 'Wadah', tipe: 'select', awal: 'rapat', opsi: [['rapat', 'Ember tertutup rapat'], ['lubang', 'Ember berlubang'], ['takakura', 'Keranjang Takakura']] },
      { id: 'aktivator', label: 'Aktivator', tipe: 'select', awal: 'tanpa', opsi: [['tanpa', 'Tanpa aktivator'], ['em4', 'EM4 (mikroba pengurai)']] }
    ],
    keluaran: [
      { id: 'cn', label: 'Rasio C/N', satuan: '' },
      { id: 'suhu', label: 'Suhu puncak', satuan: '°C' },
      { id: 'hari', label: 'Lama sampai matang', satuan: 'hari' },
      { id: 'bau', label: 'Bau', satuan: '' },
      { id: 'oksigen', label: 'Ketersediaan oksigen', satuan: '%' },
      { id: 'susut', label: 'Penyusutan volume', satuan: '%' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'sejuk',
    judul: 'Ruang Kelas Sejuk Tanpa AC',
    ikon: '🏫',
    kelas: 'Kelas 7 · Suhu, Kalor & Perpindahan Kalor (Konveksi, Radiasi, Insulasi)',
    warna: '#0891b2',
    ringkas: 'Rancang perbaikan ruang kelas agar terasa sejuk di siang hari, udaranya segar, dan hemat listrik tanpa AC.',
    kisah: 'Pada siang hari di musim kemarau, ruang kelasmu terasa <b>sangat panas</b>. Murid mengantuk, sulit fokus, dan kepanasan. Sekolah tidak mampu memasang AC, tetapi punya anggaran perbaikan <b>Rp 3.500.000</b>. Kelasmu diminta merancang perbaikan agar <b>suhu yang terasa paling tinggi 30 °C</b> pada pukul 12.00 saat diisi <b>32 murid</b>, udaranya tetap <b>segar</b>, dan pemakaian listrik paling banyak <b>200 W</b>.',
    kriteria: [
      'Suhu terasa paling tinggi 30 °C pada pukul 12.00',
      'Udara segar: kadar CO₂ paling tinggi 1.000 ppm',
      'Daya listrik paling banyak 200 W'
    ],
    kendala: ['Biaya paling banyak Rp 3.500.000', 'Ruang 8 × 7 × 3,5 m, diisi 32 murid; suhu luar 31 °C'],
    konsep: `
      <p>Kalor masuk ke ruang kelas dari <b>atap</b> yang dijemur matahari (radiasi lalu konduksi), dari <b>dinding barat</b> yang terkena sinar sore, dan dari <b>tubuh murid</b> (± 70 W per orang).</p>
      <p><b>Warna atap terang</b> memantulkan radiasi sehingga atap tidak terlalu panas. <b>Plafon</b> dan lapisan <b>aluminium foil</b> bekerja sebagai <b>insulator</b> yang menghambat kalor dari atap turun ke ruangan. Pohon peneduh menghalangi sinar ke dinding.</p>
      <p><b>Konveksi</b>: udara panas yang ringan naik, lalu digantikan udara yang lebih sejuk. <b>Ventilasi silang</b> (jendela di dua sisi) dan <b>roster</b> di bagian atas membuat udara mengalir menembus ruangan sehingga panas dan CO₂ terbawa keluar.</p>
      <p class="rumus">suhu ruang ≈ suhu luar + panas masuk ÷ (pertukaran udara + selubung) · suhu terasa ≈ rata-rata suhu udara & plafon − efek angin</p>
      <p><b>Kipas</b> tidak menurunkan suhu udara (motornya justru menambah sedikit panas), tetapi angin membantu keringat menguap sehingga tubuh <b>terasa</b> lebih sejuk.</p>
      <p class="peringatan">⚠️ Saat menguji model kelas dengan lampu pijar sebagai "matahari", jangan menyentuh lampu yang menyala dan jauhkan dari kertas atau kardus agar tidak terbakar.</p>`,
    kataKunci: ['kalor', 'konveksi', 'konduksi', 'radiasi', 'insulator', 'isolator', 'ventilasi', 'ventilasi silang', 'roster', 'plafon', 'atap', 'suhu terasa', 'kipas', 'co2', 'peneduh'],
    variabel: [
      { id: 'jendela', label: 'Ventilasi', tipe: 'select', awal: 'satu', opsi: [['satu', 'Jendela satu sisi'], ['silang', 'Ventilasi silang (dua sisi)'], ['roster', 'Silang + roster atas']] },
      { id: 'atap', label: 'Warna atap', tipe: 'select', awal: 'gelap', opsi: [['gelap', 'Genteng/seng gelap'], ['terang', 'Cat atap terang'], ['putih', 'Cat reflektif putih']] },
      { id: 'plafon', label: 'Plafon', tipe: 'select', awal: 'tanpa', opsi: [['tanpa', 'Tanpa plafon'], ['triplek', 'Plafon triplek'], ['foil', 'Triplek + aluminium foil']] },
      { id: 'peneduh', label: 'Peneduh', tipe: 'select', awal: 'tanpa', opsi: [['tanpa', 'Tanpa peneduh'], ['barat', 'Pohon peneduh di sisi barat']] },
      { id: 'kipas', label: 'Kipas angin', tipe: 'range', min: 0, max: 4, step: 1, satuan: 'buah', awal: 0 }
    ],
    keluaran: [
      { id: 'suhu', label: 'Suhu udara ruang', satuan: '°C' },
      { id: 'plafon', label: 'Suhu permukaan plafon/atap', satuan: '°C' },
      { id: 'terasa', label: 'Suhu terasa', satuan: '°C' },
      { id: 'ach', label: 'Pergantian udara', satuan: '× per jam' },
      { id: 'co2', label: 'Kadar CO₂', satuan: 'ppm' },
      { id: 'listrik', label: 'Daya listrik', satuan: 'W' },
      { id: 'panasAtap', label: 'Panas dari atap', satuan: 'W' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'tetes',
    judul: 'Penyiram Tetes Otomatis untuk Kemarau',
    ikon: '💧',
    kelas: 'Kelas 8 · Tekanan Zat Cair (Tekanan Hidrostatis)',
    warna: '#2563eb',
    ringkas: 'Rancang penyiram tetes dari barang bekas agar 10 tanaman kebun sekolah tetap tersiram selama libur 5 hari.',
    kisah: 'Kebun sekolah berisi <b>10 tanaman cabai</b> dalam pot. Saat <b>libur 5 hari</b> di musim kemarau, tidak ada yang menyiram, dan tanaman sering mati kekeringan. Kelompokmu ditantang membuat <b>penyiram tetes otomatis</b> dari wadah bekas dan selang. Tanaman paling ujung pun harus mendapat air cukup, tetapi <b>tidak boros</b>. Air juga harus bertahan <b>5 hari</b>, dan semua tanaman harus tersiram <b>merata</b>.',
    kriteria: [
      'Tanaman paling ujung tetap mendapat air cukup',
      'Tidak boros: tiap tanaman paling banyak 2× kebutuhannya',
      'Air bertahan minimal 5 hari',
      'Keseragaman tetesan minimal 85%'
    ],
    kendala: ['Biaya paling banyak Rp 80.000', 'Kebutuhan tiap tanaman 0,45 L/hari (0,3 L/hari bila tanah ditutup mulsa jerami)'],
    konsep: `
      <p><b>Tekanan hidrostatis</b> adalah tekanan yang dihasilkan zat cair karena beratnya. Makin <b>dalam</b> atau makin <b>tinggi</b> kolom air di atas suatu titik, makin besar tekanannya.</p>
      <p class="rumus">tekanan hidrostatis p = ρ × g × h · kecepatan air keluar lubang v = √(2 × g × h) (Torricelli)</p>
      <p>Menaikkan wadah membuat tekanan di lubang tetes lebih besar, sehingga air keluar lebih cepat. Lubang yang lebih besar juga mengalirkan lebih banyak air (debit ∝ luas lubang). Debit yang besar membuat tanaman cukup air, tetapi airnya cepat habis.</p>
      <p>Sepanjang selang, sebagian tekanan hilang karena <b>gesekan</b>, sehingga tanaman di ujung selang yang panjang mendapat air lebih sedikit. Selang <b>bercabang</b> memperpendek jalur dan membuat tetesan lebih <b>merata</b>.</p>
      <p><b>Mulsa jerami</b> menutup tanah sehingga air tidak cepat menguap, dan kebutuhan air tanaman berkurang.</p>
      <p class="peringatan">⚠️ Wadah berisi air berat. Pasang penyangga yang kokoh dan tidak mudah roboh, dan jangan meletakkan wadah tinggi di jalur lalu-lalang.</p>`,
    kataKunci: ['tekanan', 'tekanan hidrostatis', 'kedalaman', 'ketinggian', 'debit', 'torricelli', 'lubang', 'selang', 'gesekan', 'merata', 'mulsa', 'penguapan', 'kapilaritas', 'volume', 'tetes'],
    variabel: [
      { id: 'wadah', label: 'Wadah air', tipe: 'select', awal: 'botol', opsi: [['botol', 'Botol 1,5 L'], ['jeriken', 'Jeriken 5 L'], ['galon', 'Galon bekas 19 L'], ['ember', 'Ember bertutup 30 L']] },
      { id: 'tinggi', label: 'Tinggi wadah dari tanah', tipe: 'range', min: 0.2, max: 2, step: 0.1, satuan: 'm', awal: 0.5 },
      { id: 'lubang', label: 'Diameter lubang tetes', tipe: 'range', min: 0.04, max: 0.3, step: 0.01, satuan: 'mm', awal: 0.2 },
      { id: 'mulsa', label: 'Penutup tanah', tipe: 'select', awal: 'tanpa', opsi: [['tanpa', 'Tanpa mulsa'], ['jerami', 'Mulsa jerami']] },
      { id: 'jalur', label: 'Jalur selang', tipe: 'select', awal: 'satu', opsi: [['satu', 'Satu selang memanjang'], ['cabang', 'Selang bercabang dua']] }
    ],
    keluaran: [
      { id: 'debit', label: 'Air per tanaman', satuan: 'L/hari' },
      { id: 'terkecil', label: 'Air tanaman paling ujung', satuan: 'L/hari' },
      { id: 'butuh', label: 'Kebutuhan tanaman', satuan: 'L/hari' },
      { id: 'rata', label: 'Keseragaman', satuan: '%' },
      { id: 'total', label: 'Pemakaian air total', satuan: 'L/hari' },
      { id: 'tahan', label: 'Air bertahan', satuan: 'hari' },
      { id: 'tekanan', label: 'Tekanan di lubang', satuan: 'Pa' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'mangrove',
    judul: 'Sabuk Mangrove Penahan Abrasi',
    ikon: '🌳',
    kelas: 'Kelas 7 · Ekosistem & Pelestarian Lingkungan (Perubahan Iklim)',
    warna: '#047857',
    ringkas: 'Rancang penanaman mangrove yang meredam gelombang dan menahan abrasi pantai dengan biaya terbatas.',
    kisah: 'Garis pantai di dekat permukiman nelayan terus <b>terkikis gelombang</b> hingga ± 2 m per tahun, dan beberapa rumah mulai terancam. Desa mendapat bantuan <b>Rp 15 juta</b> untuk menanam <b>mangrove</b> di sepanjang <b>200 m pantai</b>. Kelasmu diminta merancang sabuk mangrove: jenis, lebar, dan kerapatannya. Abrasi harus turun menjadi paling banyak <b>0,3 m per tahun</b>, dan bibit yang hidup minimal <b>70%</b>.',
    kriteria: [
      'Abrasi paling banyak 0,3 m per tahun',
      'Gelombang yang tiba di pantai paling tinggi 0,4 m (awal 1 m)',
      'Bibit yang hidup minimal 70%'
    ],
    kendala: ['Biaya paling banyak Rp 15 juta (bibit dan penanaman Rp 3.000 per pohon)', 'Lebar zona tanam paling lebar 150 m dari bibir pantai'],
    konsep: `
      <p><b>Ekosistem mangrove</b> tumbuh di pantai berlumpur yang terkena pasang surut. Akarnya yang rapat <b>meredam energi gelombang</b> dan menahan lumpur, sehingga pantai tidak mudah terkikis (<b>abrasi</b>).</p>
      <p>Jenis mangrove berbeda bentuk akarnya. <b>Api-api</b> (<i>Avicennia</i>) punya <b>akar napas</b> yang mencuat dari lumpur, tahan di zona depan yang langsung terkena ombak. <b>Bakau</b> (<i>Rhizophora</i>) punya <b>akar tunjang</b> yang besar dan kuat meredam gelombang, tetapi lebih cocok di zona belakang yang lebih tenang.</p>
      <p class="rumus">tinggi gelombang di pantai ≈ tinggi awal × e^(−k × lebar sabuk) · k bertambah dengan kerapatan pohon hidup, bentuk akar, dan umur</p>
      <p>Menanam <b>terlalu rapat</b> membuat bibit berebut cahaya dan ruang sehingga banyak yang mati. Mangrove juga butuh <b>waktu</b> beberapa tahun sampai akarnya cukup besar.</p>
      <p>Mangrove menyimpan banyak <b>karbon</b> di batang dan lumpurnya, sehingga ikut mengurangi <b>gas rumah kaca</b> penyebab perubahan iklim. Mangrove juga menjadi tempat berkembang biak ikan, udang, dan kepiting.</p>
      <p class="peringatan">⚠️ Penanaman di pantai harus didampingi guru dan warga. Perhatikan jadwal pasang surut, pakai sepatu boot, dan jangan masuk ke air yang dalam.</p>`,
    kataKunci: ['ekosistem', 'mangrove', 'bakau', 'api-api', 'abrasi', 'gelombang', 'akar', 'akar napas', 'akar tunjang', 'pasang surut', 'kerapatan', 'karbon', 'perubahan iklim', 'pelestarian', 'habitat'],
    variabel: [
      { id: 'jenis', label: 'Jenis mangrove', tipe: 'select', awal: 'bakau', opsi: [['apiapi', 'Api-api (akar napas)'], ['bakau', 'Bakau (akar tunjang)'], ['campur', 'Campuran: api-api di depan, bakau di belakang']] },
      { id: 'lebar', label: 'Lebar sabuk mangrove', tipe: 'range', min: 0, max: 150, step: 10, satuan: 'm', awal: 30 },
      { id: 'rapat', label: 'Kerapatan tanam', tipe: 'range', min: 0, max: 40, step: 2, satuan: 'pohon/100 m²', awal: 10 },
      { id: 'umur', label: 'Umur mangrove', tipe: 'range', min: 1, max: 15, step: 1, satuan: 'tahun', awal: 2 }
    ],
    keluaran: [
      { id: 'gelombang', label: 'Gelombang tiba di pantai', satuan: 'm' },
      { id: 'redam', label: 'Energi gelombang teredam', satuan: '%' },
      { id: 'abrasi', label: 'Abrasi', satuan: 'm/tahun' },
      { id: 'bibit', label: 'Bibit ditanam', satuan: 'pohon' },
      { id: 'hidup', label: 'Bibit yang hidup', satuan: '%' },
      { id: 'karbon', label: 'Karbon tersimpan', satuan: 'ton CO₂/tahun' },
      { id: 'biaya', label: 'Biaya', satuan: 'Rp' }
    ]
  },
  {
    id: 'tempe',
    judul: 'Tempe Gagal Lagi?',
    ikon: '🫘',
    kelas: 'Kelas 9 · Bioteknologi Konvensional (Fermentasi)',
    warna: '#a16207',
    ringkas: 'Temukan cara fermentasi tempe yang padat, harum, tidak berlendir, dan siap dalam 2 hari.',
    kisah: 'Usaha tempe rumahan milik tetangga sekolah sering <b>gagal</b>: kadang kedelainya tidak menyatu, kadang <b>berlendir dan bau asam</b>, kadang malah <b>berbintik hitam dan bau amonia</b>. Pemilik usaha meminta kelasmu mencari cara pembuatan yang tepat. Tempe harus <b>padat tertutup kapang putih</b>, <b>tidak berlendir</b>, <b>tidak kelewatan</b>, dan siap dipanen dalam <b>48 jam</b> dengan biaya paling banyak <b>Rp 16.000 per kg kedelai</b>.',
    kriteria: [
      'Kapang menutup minimal 95% sehingga tempe padat',
      'Tidak berlendir (tidak terkontaminasi bakteri)',
      'Tidak kelewatan (tidak bau amonia atau berspora hitam)',
      'Siap dipanen paling lama 48 jam'
    ],
    kendala: ['Biaya paling banyak Rp 16.000 per kg kedelai (kedelai Rp 12.000, ragi tempe Rp 500/g)', 'Fermentasi di suhu ruang atau tempat hangat di rumah'],
    konsep: `
      <p><b>Bioteknologi konvensional</b> memanfaatkan makhluk hidup untuk menghasilkan produk yang berguna. Tempe dibuat dengan bantuan <b>kapang (jamur) <i>Rhizopus</i></b> yang tumbuh di antara biji kedelai. Benang-benang kapang (<b>hifa/miselium</b>) yang putih mengikat kedelai menjadi padat.</p>
      <p>Kapang tempe tumbuh paling baik pada suhu hangat <b>± 30–35 °C</b>. Kapang memerlukan <b>oksigen</b>, karena itu bungkus plastik diberi lubang atau memakai daun pisang. Kapang juga butuh <b>ragi tempe</b> (spora) dalam jumlah cukup.</p>
      <p>Pertumbuhan kapang menghasilkan <b>panas</b>, sehingga bagian tengah tempe lebih hangat daripada udara sekitar, terutama bila tempe <b>tebal</b> dan bungkusnya rapat. Suhu yang terlalu tinggi dapat mematikan kapang.</p>
      <p class="rumus">suhu tengah ≈ suhu ruang + panas fermentasi (makin tebal makin panas) · laju tumbuh kapang tertinggi pada ± 32 °C</p>
      <p>Bila tempe dibiarkan terlalu lama setelah padat, protein terurai menjadi <b>amonia</b> dan kapang membentuk <b>spora hitam</b>. Bila alat kotor dan bungkusnya pengap, <b>bakteri</b> ikut tumbuh dan membuat tempe <b>berlendir dan asam</b>.</p>
      <p class="peringatan">⚠️ Merebus kedelai harus didampingi orang dewasa. Cuci tangan dan alat sebelum mencampur ragi. Jangan makan tempe yang berlendir atau berbau busuk.</p>`,
    kataKunci: ['bioteknologi', 'fermentasi', 'kapang', 'jamur', 'rhizopus', 'miselium', 'hifa', 'spora', 'ragi tempe', 'oksigen', 'suhu', 'kontaminasi', 'bakteri', 'amonia', 'kedelai'],
    variabel: [
      { id: 'suhu', label: 'Suhu tempat fermentasi', tipe: 'range', min: 20, max: 45, step: 1, satuan: '°C', awal: 25 },
      { id: 'lama', label: 'Lama fermentasi', tipe: 'range', min: 12, max: 72, step: 4, satuan: 'jam', awal: 36 },
      { id: 'ragi', label: 'Ragi tempe', tipe: 'range', min: 0.5, max: 4, step: 0.5, satuan: 'g/kg', awal: 1 },
      { id: 'bungkus', label: 'Pembungkus', tipe: 'select', awal: 'rapat', opsi: [['rapat', 'Plastik tanpa lubang'], ['lubang', 'Plastik berlubang'], ['daun', 'Daun pisang']] },
      { id: 'tebal', label: 'Tebal tempe', tipe: 'range', min: 1, max: 5, step: 0.5, satuan: 'cm', awal: 4 },
      { id: 'bersih', label: 'Kebersihan', tipe: 'select', awal: 'biasa', opsi: [['biasa', 'Seadanya'], ['bersih', 'Tangan & alat dicuci, kedelai ditiriskan kering']] }
    ],
    keluaran: [
      { id: 'tengah', label: 'Suhu bagian tengah', satuan: '°C' },
      { id: 'tutup', label: 'Tutupan kapang', satuan: '%' },
      { id: 'jadi', label: 'Padat pada jam ke-', satuan: '' },
      { id: 'aroma', label: 'Aroma', satuan: '' },
      { id: 'kompak', label: 'Kekompakan', satuan: '' },
      { id: 'biaya', label: 'Biaya per kg kedelai', satuan: 'Rp' }
    ]
  }
);

Object.assign(NYATA, {
  pengering: {
    waktu: '2 × 40 menit membuat + 2 hari penjemuran (pengamatan pagi–siang–sore)',
    alat: [
      'Kardus bekas atau bingkai kayu ukuran ± 70 × 70 cm, lakban, gunting',
      'Kain hitam/cat hitam atau seng/kertas putih sesuai rancangan (alas)',
      'Plastik bening tebal atau kaca (penutup), kawat kasa untuk lubang ventilasi',
      'Rak kawat atau anyaman bambu, 2 kg ikan segar yang sudah digarami (atau irisan singkong sebagai pengganti)',
      'Termometer, timbangan dapur, busur derajat untuk kemiringan',
      'HP untuk memotret perubahan ikan setiap 3 jam'
    ],
    keselamatan: [
      'Kaca hanya dipasang oleh guru; tepi kaca ditutup lakban agar tidak melukai.',
      'Alas hitam dan penutup bisa sangat panas di siang hari — jangan disentuh tanpa kain pelindung.',
      'Cuci tangan dengan sabun setelah memegang ikan mentah.',
      'Letakkan pengering di tempat kokoh agar tidak terbalik tertiup angin.'
    ],
    langkah: [
      'Buat kotak pengering dari kardus/kayu, lalu lapisi dasarnya dengan alas sesuai rancangan.',
      'Buat lubang ventilasi sesuai jumlah rancangan di sisi bawah dan atas, lalu tutup dengan kawat kasa.',
      'Pasang penutup bening dengan kemiringan sesuai rancangan, menghadap ke arah matahari siang.',
      'Timbang ikan basah (massa awal), lalu tata di atas rak tanpa saling menumpuk.',
      'Jemur pukul 08.00–15.00. Catat suhu di dalam setiap jam dan bandingkan dengan suhu luar.',
      'Timbang ikan setiap sore. Hitung air yang hilang = massa awal − massa sekarang.',
      'Setelah 2 hari, hitung kadar air: ikan segar ± 75% air. Bandingkan dengan prediksi simulasi.'
    ],
    takaran: v => {
      const h = hitungPengering(v);
      return [
        `Alas: ${ALAS_KERING[v.alas].nama}; penutup: ${PENUTUP_KERING[v.penutup].nama}, dimiringkan ${v.miring}°.`,
        `Ventilasi: ${v.ventilasi} lubang berkasa (± 3 × 3 cm), separuh di bawah dan separuh di atas agar udara mengalir.`,
        `Ikan basah ${v.ikan} kg → setelah kering (kadar air 40%) beratnya ± ${fx(+v.ikan * 0.25 / 0.6, 2)} kg.`,
        `Prediksi simulasi: suhu dalam ± ${fx(h.suhu)} °C, kelembapan ± ${h.lembap}%, kering dalam ± ${fx(h.hariKering)} hari cerah.`
      ];
    },
    ukur: [
      { id: 'suhu', label: 'Suhu di dalam pukul 12.00', satuan: '°C', sim: 'suhu' },
      { id: 'massa2', label: 'Massa ikan setelah 2 hari', satuan: 'kg' },
      { id: 'kadarAir', label: 'Kadar air setelah 2 hari', satuan: '%', sim: 'kadarAir' },
      { id: 'biaya', label: 'Biaya nyata', satuan: 'Rp', sim: 'biaya' }
    ],
    masalah: [
      { gejala: 'Dinding penutup berembun / ikan tetap basah', kunci: 'embun|basah|lembap|uap', petunjuk: ['Ke mana uap air dari ikan pergi? Adakah jalan keluar untuk udara lembap?', 'Apa yang terjadi pada kelembapan di simulasi bila jumlah ventilasi dinaikkan?'] },
      { gejala: 'Ikan berubah putih seperti matang', kunci: 'matang|putih|gosong|panas', petunjuk: ['Berapa suhu di dalam pada siang hari? Bandingkan dengan batas 60 °C.', 'Variabel apa yang bisa menurunkan suhu tanpa membuat udara lembap?'] },
      { gejala: 'Ada lalat masuk', kunci: 'lalat|serangga|semut', petunjuk: ['Lewat bagian mana lalat masuk? Apakah semua lubang sudah berkasa rapat?', 'Bagaimana menjaga ventilasi tetap terbuka tetapi lalat tidak masuk?'] },
      { gejala: 'Hasil berbeda jauh dari simulasi', kunci: 'beda|lambat|tidak sama|jauh', petunjuk: ['Bagaimana cuacanya: cerah penuh atau sering berawan? Berapa jam matahari bersinar?', 'Apakah ikan di rak saling menumpuk sehingga permukaannya tertutup?'] }
    ]
  },
  garam: {
    waktu: '1 × 40 menit menyiapkan + 3–7 hari pengamatan (5 menit setiap hari)',
    alat: [
      'Nampan plastik lebar atau bak dangkal (sebagai petak mini) — 2–3 buah untuk pembanding',
      'Air laut (atau air garam 35 g per liter sebagai pengganti), gelas ukur',
      'Plastik hitam, plastik putih, atau tanah liat untuk alas sesuai rancangan',
      'Kain bersih dan pasir halus untuk penyaringan',
      'Penggaris untuk kedalaman, timbangan dapur, sendok plastik untuk memanen kristal'
    ],
    keselamatan: [
      'Jangan mencicipi garam hasil percobaan.',
      'Letakkan nampan di tempat aman yang tidak mudah tersenggol, dan tutup saat hujan.',
      'Cuci tangan setelah memegang air laut atau garam kotor, terutama bila ada luka di kulit.'
    ],
    langkah: [
      'Siapkan nampan dan lapisi dasarnya dengan alas sesuai rancangan.',
      'Saring air laut sesuai rancangan (tanpa saring, kain, atau kain + pasir).',
      'Tuang air sampai kedalaman sesuai rancangan (ukur dengan penggaris), lalu catat volumenya.',
      'Letakkan di tempat yang terkena matahari penuh. Ukur kedalaman air setiap hari pada jam yang sama.',
      'Catat hari saat kristal pertama muncul dan saat air habis.',
      'Panen kristal, keringkan, lalu timbang. Amati warnanya dan bandingkan kebersihannya.',
      'Bandingkan hasil dan lama panen dengan prediksi simulasi (hasil di nampan lebih kecil karena luasnya kecil — hitung per m²).'
    ],
    takaran: v => {
      const h = hitungGaram(v);
      return [
        `Sumber: ${SUMBER_GARAM[v.sumber].nama}; alas: ${ALAS_GARAM[v.alas].nama}; penyaringan: ${SARING_GARAM[v.saring].nama}.`,
        `Kedalaman ${v.dalam} cm. Untuk nampan 30 × 40 cm (0,12 m²) perlu ± ${fx(0.12 * +v.dalam * 10, 1)} L air.`,
        `Prediksi untuk petak ${v.luas} m²: ${fx(h.garam)} kg garam dalam ± ${fx(h.hari)} hari, kemurnian ± ${fx(h.murni)}%.`,
        `Untuk nampan: prediksi hasil ± ${fx(h.garam / +v.luas * 0.12 * 1000, 0)} g garam.`
      ];
    },
    ukur: [
      { id: 'hari', label: 'Lama sampai air habis', satuan: 'hari', sim: 'hari' },
      { id: 'garamNampan', label: 'Massa garam dari nampan', satuan: 'g' },
      { id: 'kristal', label: 'Hari kristal pertama muncul', satuan: 'hari' }
    ],
    masalah: [
      { gejala: 'Garam kusam, abu-abu, atau berpasir', kunci: 'kusam|kotor|abu|pasir|lumpur', petunjuk: ['Dari mana kotoran itu berasal: dari air atau dari alas?', 'Pemisahan apa yang bisa menghilangkan partikel yang tidak larut sebelum penguapan?'] },
      { gejala: 'Air lama sekali habis', kunci: 'lama|lambat|tidak habis|belum kering', petunjuk: ['Berapa kedalaman airmu? Apa hubungan kedalaman dengan lama penguapan?', 'Apa pengaruh warna alas terhadap suhu air?'] },
      { gejala: 'Kehujanan', kunci: 'hujan|basah lagi', petunjuk: ['Apa yang terjadi pada kadar garam bila air hujan masuk?', 'Bagaimana petani garam melindungi petaknya? Bagaimana caramu agar panen lebih cepat sebelum hujan?'] }
    ]
  },
  boraks: {
    waktu: '2 × 40 menit',
    alat: [
      'Kunyit segar, parutan, saringan teh, gelas kecil',
      'Air atau alkohol 70% (sesuai rancangan) 20 mL',
      'Kertas saring atau tisu tebal dipotong 1 × 8 cm, penjepit/jemuran mini',
      'Cuka dapur dan pipet tetes',
      'Sampel: kerupuk dan bakso dari kantin, serta sampel kontrol yang dibuat sendiri tanpa boraks',
      'Lumpang/ulekan kecil, air hangat, piring kecil untuk tiap sampel, label'
    ],
    keselamatan: [
      'Jangan mencicipi sampel maupun ekstrak.',
      'Alkohol mudah terbakar — jauhkan dari api dan kompor.',
      'Hanya guru yang menyiapkan sampel kontrol positif (bila ada); murid tidak memegang boraks.',
      'Cuci tangan dan alat setelah praktik. Buang sisa sampel ke tempat sampah tertutup.',
      'Hasil hanya indikasi awal: laporkan ke guru, jangan menyebarkan tuduhan kepada pedagang.'
    ],
    langkah: [
      'Parut kunyit sesuai takaran, campur dengan 20 mL pelarut, aduk 5 menit, lalu saring.',
      'Celupkan potongan kertas saring ke ekstrak, angin-anginkan sampai kering. Ini kertas uji kunyit.',
      'Haluskan ± 5 g tiap sampel, tambahkan 10 mL air hangat, aduk, lalu diamkan 3 menit.',
      'Bila rancanganmu memakai cuka, teteskan 2 tetes cuka ke tiap sampel lalu aduk.',
      'Celupkan ujung kertas uji ke cairan sampel selama 3 detik.',
      'Keringkan kertas sesuai waktu rancangan. Amati warnanya di tempat terang dan bandingkan dengan sampel kontrol.',
      'Catat hasil: kuning (negatif) atau merah bata (positif). Bandingkan dengan prediksi simulasi.'
    ],
    takaran: v => {
      const h = hitungBoraks(v);
      return [
        `Ekstrak: ${v.kunyit} g kunyit parut dalam 20 mL ${v.pelarut === 'alkohol' ? 'alkohol 70%' : 'air'}.`,
        `Sampel ${v.asam === 'cuka' ? 'diberi 2 tetes cuka sebelum diuji' : 'tidak diasamkan'}; kertas dikeringkan ${v.kering} menit.`,
        `Prediksi simulasi: batas deteksi ± ${h.batas} ppm, positif palsu ${h.palsuPos} sampel, hasil keluar dalam ${h.waktu} menit.`
      ];
    },
    ukur: [
      { id: 'positif', label: 'Jumlah sampel yang merah bata', satuan: 'sampel' },
      { id: 'waktu', label: 'Waktu sampai warna terbaca', satuan: 'menit', sim: 'waktu' },
      { id: 'biaya', label: 'Biaya nyata', satuan: 'Rp', sim: 'biaya' }
    ],
    masalah: [
      { gejala: 'Semua kertas tetap kuning', kunci: 'kuning semua|tidak berubah|tetap kuning|negatif semua', petunjuk: ['Apakah kertas sudah benar-benar kering sebelum diamati? Kapan warna merah bata terbentuk?', 'Seberapa pekat ekstrakmu? Apakah warna kuningnya terlalu pucat?'] },
      { gejala: 'Sampel kontrol tanpa boraks ikut merah', kunci: 'kontrol merah|positif palsu|semua merah|kerupuk merah', petunjuk: ['Apakah sampel itu bersifat basa (misalnya memakai air kapur atau soda)? Apa yang terjadi pada kunyit di larutan basa?', 'Perlakuan apa yang bisa membedakan warna karena basa dan karena boraks?'] },
      { gejala: 'Warna sulit dibedakan', kunci: 'sulit|ragu|samar|kuning tua', petunjuk: ['Apakah kertasmu terlalu kuning karena ekstrak terlalu pekat?', 'Mengapa perlu membandingkan dengan sampel kontrol di bawah cahaya yang sama?'] }
    ]
  },
  nyamuk: {
    waktu: '1 × 40 menit membuat + pengamatan 7 hari',
    alat: [
      'Botol plastik bekas 1,5 L, gunting/cutter (dipakai guru), lakban',
      'Gula pasir, ragi instan, air, termometer, gelas ukur, sendok makan',
      'Kertas/plastik hitam untuk membungkus botol (bila sesuai rancangan)',
      'Label tanggal, kaca pembesar untuk menghitung nyamuk'
    ],
    keselamatan: [
      'Pemotongan botol dilakukan guru; tepi potongan ditutup lakban.',
      'Air pelarut jangan lebih panas dari hangat kuku (jangan air mendidih).',
      'Ganti larutan sesuai jadwal; buang larutan lama ke tanah, bukan ke genangan air.',
      'Letakkan perangkap jauh dari jangkauan anak kecil dan hewan peliharaan.'
    ],
    langkah: [
      'Potong botol menjadi dua (± 1/3 bagian atas). Bagian atas menjadi corong.',
      'Larutkan gula dalam 200 mL air hangat sesuai suhu rancangan, lalu masukkan ke bagian bawah botol.',
      'Taburkan ragi di atas larutan tanpa diaduk.',
      'Pasang corong terbalik (mulut botol menghadap ke bawah), lalu rekatkan dengan lakban.',
      'Bungkus botol dengan kertas hitam bila sesuai rancangan, sisakan sedikit bagian untuk mengintip.',
      'Letakkan di tempat sesuai rancangan. Setiap hari, amati gelembung dan hitung nyamuk yang terperangkap.',
      'Ganti larutan sesuai jadwal. Bandingkan jumlah nyamuk per minggu dengan prediksi simulasi.'
    ],
    takaran: v => {
      const h = hitungNyamuk(v);
      return [
        `Larutan: ${v.gula} g gula (± ${fxd(+v.gula / 12)} sendok makan) + ${v.ragi} g ragi (± ${fxd(+v.ragi / 3)} sendok teh) dalam 200 mL air bersuhu ${v.suhu} °C.`,
        `Botol ${v.botol === 'hitam' ? 'dibungkus hitam' : 'bening'}, diletakkan di ${v.letak === 'teduh' ? 'sudut teduh dan lembap' : 'tempat terang'}; larutan diganti setiap ${v.ganti} hari.`,
        `Prediksi simulasi: CO₂ ± ${fx(h.co2)} g/hari selama ± ${fx(h.lama)} hari, menangkap ± ${h.tangkap} nyamuk per minggu, biaya ${rp(h.biaya)}/bulan.`
      ];
    },
    ukur: [
      { id: 'tangkap', label: 'Nyamuk tertangkap dalam 7 hari', satuan: 'ekor', sim: 'tangkap' },
      { id: 'gelembung', label: 'Hari terakhir gelembung masih terlihat', satuan: 'hari ke-' },
      { id: 'biaya', label: 'Biaya isi ulang per bulan', satuan: 'Rp', sim: 'biaya' }
    ],
    masalah: [
      { gejala: 'Tidak ada gelembung', kunci: 'tidak ada gelembung|tidak bergelembung|diam|mati', petunjuk: ['Berapa suhu air saat ragi dimasukkan? Apa yang terjadi pada ragi bila airnya terlalu panas?', 'Apakah ragimu masih baru (belum kedaluwarsa)?'] },
      { gejala: 'Nyamuk yang tertangkap sedikit', kunci: 'sedikit|tidak ada nyamuk|jarang', petunjuk: ['Di mana nyamuk Aedes suka beristirahat: tempat terang atau gelap dan teduh?', 'Apakah warna botol dan letak perangkap sudah memanfaatkan perilaku nyamuk?'] },
      { gejala: 'Ada jentik di dalam perangkap', kunci: 'jentik|larva|cacing', petunjuk: ['KESELAMATAN DULU: segera buang larutan ke tanah (bukan genangan) lalu bilas botol.', 'Berapa lama daur hidup nyamuk dari telur sampai dewasa? Berapa hari sekali larutan harus diganti?'] }
    ]
  },
  kompos: {
    waktu: '1 × 40 menit menyiapkan + 4 minggu pengamatan (pembalikan sesuai jadwal)',
    alat: [
      'Wadah sesuai rancangan: ember bertutup, ember yang dilubangi, atau keranjang Takakura beralas kardus',
      'Sampah hijau kantin (sisa sayur, kulit buah) dan daun kering halaman',
      'Gunting/pisau untuk mencacah (dipakai dengan hati-hati), timbangan',
      'Semprotan air, termometer (tusuk ke tengah tumpukan), sarung tangan, sekop kecil',
      'EM4 bila sesuai rancangan (encerkan sesuai petunjuk kemasan)'
    ],
    keselamatan: [
      'Pakai sarung tangan dan masker saat mengolah sampah.',
      'Jangan masukkan daging, tulang, minyak, atau sampah plastik.',
      'Cuci tangan dengan sabun setelah membalik kompos.',
      'Tutup wadah agar tidak mengundang tikus dan lalat.'
    ],
    langkah: [
      'Cacah sampah hijau dan daun kering sesuai ukuran rancangan.',
      'Timbang bahan cokelat dan hijau sesuai perbandingan rancangan, lalu campur.',
      'Atur kelembapan: semprot air sampai bahan terasa seperti spons yang diperas (sesuai rancangan).',
      'Masukkan ke wadah. Bila memakai EM4, siramkan secara merata.',
      'Ukur suhu tengah tumpukan setiap hari dan cium baunya. Balik kompos sesuai jadwal rancangan.',
      'Kompos matang bila berwarna cokelat kehitaman, berbau tanah, remah, dan suhunya kembali dingin.',
      'Catat hari matang, suhu puncak, dan bau. Bandingkan dengan prediksi simulasi.'
    ],
    takaran: v => {
      const h = hitungKompos(v);
      return [
        `Untuk 5 kg bahan: ${fx(5 * +v.cokelat / 100, 1)} kg daun kering + ${fx(5 * (100 - +v.cokelat) / 100, 1)} kg sampah hijau (C/N ± ${fx(h.cn)}).`,
        `Kelembapan ± ${v.air}%; cacahan ${CACAH_KOMPOS[v.cacah].nama.toLowerCase()}; ${BALIK_KOMPOS[v.balik].nama.toLowerCase()}; wadah: ${WADAH_KOMPOS[v.wadah].nama.toLowerCase()}${v.aktivator === 'em4' ? '; diberi EM4' : ''}.`,
        `Prediksi simulasi: suhu puncak ± ${h.suhu} °C, matang ± ${h.hari} hari, bau: ${h.bau.toLowerCase()}.`
      ];
    },
    ukur: [
      { id: 'suhu', label: 'Suhu puncak di tengah tumpukan', satuan: '°C', sim: 'suhu' },
      { id: 'hari', label: 'Hari sampai matang', satuan: 'hari', sim: 'hari' },
      { id: 'susut', label: 'Penyusutan tinggi tumpukan', satuan: '%', sim: 'susut' }
    ],
    masalah: [
      { gejala: 'Berbau busuk', kunci: 'busuk|bau|basi|got', petunjuk: ['Apakah tumpukanmu terlalu basah atau jarang dibalik? Apa yang terjadi pada oksigen?', 'Mikroba seperti apa yang tumbuh bila oksigen habis?'] },
      { gejala: 'Bau menyengat seperti amonia/pesing', kunci: 'amonia|pesing|menyengat', petunjuk: ['Bagaimana perbandingan bahan hijau dan cokelatmu? Berapa C/N-nya?', 'Bahan apa yang perlu ditambah agar kelebihan nitrogen tidak lepas sebagai amonia?'] },
      { gejala: 'Tumpukan tidak hangat dan tidak terurai', kunci: 'dingin|tidak panas|tidak terurai|lama|kering', petunjuk: ['Apakah bahanmu terlalu kering? Coba remas segenggam — adakah air yang menetes?', 'Apakah cacahanmu terlalu besar? Bagaimana luas permukaan memengaruhi kerja mikroba?'] }
    ]
  },
  sejuk: {
    waktu: '2 × 40 menit membuat model + 40 menit pengujian',
    alat: [
      'Dua kardus sama besar sebagai model ruang kelas (pembanding dan rancangan)',
      'Lampu pijar 60 W atau lampu meja sebagai "matahari", termometer digital (2 buah)',
      'Cat/kertas gelap dan putih untuk atap, karton untuk plafon, aluminium foil',
      'Kipas kecil USB (bila sesuai rancangan), gunting, lakban',
      'Stopwatch atau jam'
    ],
    keselamatan: [
      'Lampu pijar sangat panas: jangan disentuh dan beri jarak minimal 20 cm dari kardus.',
      'Matikan lampu setelah pengujian dan jangan tinggalkan lampu menyala tanpa diawasi.',
      'Pemotongan kardus memakai gunting; cutter hanya dipakai guru.'
    ],
    langkah: [
      'Buat dua model kelas dari kardus. Lubangi jendela pada model rancangan sesuai jenis ventilasi.',
      'Beri warna atap dan pasang plafon/foil sesuai rancangan pada model rancangan; model pembanding dibiarkan polos.',
      'Letakkan termometer di tengah kedua model setinggi meja murid (sekitar sepertiga tinggi kardus).',
      'Sinari kedua model dengan lampu pada jarak dan sudut yang sama selama 20 menit.',
      'Catat suhu tiap 2 menit. Bila memakai kipas, nyalakan pada menit ke-10 dan rasakan alirannya.',
      'Bandingkan kenaikan suhu kedua model, lalu hubungkan dengan prediksi simulasi.',
      'Sebagai uji nyata, ukur suhu kelasmu pukul 07.00, 10.00, dan 12.00 dengan jendela dibuka dan ditutup.'
    ],
    takaran: v => {
      const h = hitungSejuk(v);
      return [
        `Ventilasi: ${JENDELA_SEJUK[v.jendela].nama}; atap: ${ATAP_SEJUK[v.atap].nama}; plafon: ${PLAFON_SEJUK[v.plafon].nama}; ${v.peneduh === 'barat' ? 'pohon peneduh di sisi barat' : 'tanpa peneduh'}; ${v.kipas} kipas.`,
        `Prediksi simulasi untuk kelas sungguhan: suhu udara ± ${fx(h.suhu)} °C, suhu terasa ± ${fx(h.terasa)} °C, CO₂ ± ${h.co2} ppm, biaya ${rp(h.biaya)}.`,
        'Pada model kardus, yang dibandingkan adalah selisih kenaikan suhu antara model rancangan dan model pembanding.'
      ];
    },
    ukur: [
      { id: 'naikPembanding', label: 'Kenaikan suhu model pembanding (20 menit)', satuan: '°C' },
      { id: 'naikRancangan', label: 'Kenaikan suhu model rancangan (20 menit)', satuan: '°C' },
      { id: 'kelas12', label: 'Suhu kelas sungguhan pukul 12.00', satuan: '°C', sim: 'suhu' }
    ],
    masalah: [
      { gejala: 'Kedua model sama panasnya', kunci: 'sama|tidak beda|tidak berubah', petunjuk: ['Apakah jarak lampu ke kedua model benar-benar sama? Variabel apa lagi yang harus dijaga sama?', 'Apakah termometer diletakkan di posisi yang sama di kedua model?'] },
      { gejala: 'Model rancangan malah lebih panas', kunci: 'lebih panas|makin panas|naik', petunjuk: ['Apakah plafon atau foil justru menghalangi udara panas keluar karena tidak ada ventilasi atas?', 'Ke mana udara panas bergerak? Di mana sebaiknya lubang keluar udara dibuat?'] },
      { gejala: 'Suhu kelas tetap panas walau kipas menyala', kunci: 'kipas|tetap panas|gerah', petunjuk: ['Apakah kipas menurunkan suhu udara, atau hanya membuat tubuh terasa lebih sejuk?', 'Dari mana panas terbesar masuk ke kelasmu: atap, dinding, atau tubuh murid?'] }
    ]
  },
  tetes: {
    waktu: '2 × 40 menit membuat + pengamatan 5 hari',
    alat: [
      'Wadah sesuai rancangan (botol, jeriken, galon bekas, atau ember bertutup)',
      'Selang akuarium/selang infus bekas, sambungan T, lem tembak (dipakai guru)',
      'Jarum pentul/peniti untuk membuat lubang tetes, atau klem infus pengatur tetes',
      'Penyangga dari kayu/bata setinggi rancangan, meteran',
      'Gelas ukur dan 10 gelas plastik untuk menampung tetesan saat uji keseragaman',
      'Jerami kering untuk mulsa (bila sesuai rancangan)'
    ],
    keselamatan: [
      'Penyangga wadah harus kokoh; wadah berisi air sangat berat dan bisa roboh.',
      'Lem tembak hanya dipakai guru karena ujungnya panas.',
      'Hati-hati menggunakan jarum pentul; simpan kembali di tempatnya setelah dipakai.',
      'Jangan meletakkan wadah tinggi di jalur lalu-lalang murid.'
    ],
    langkah: [
      'Pasang penyangga, lalu letakkan wadah setinggi rancangan (ukur dari tanah ke dasar wadah).',
      'Hubungkan selang ke bagian bawah wadah. Buat jalur satu selang atau bercabang sesuai rancangan.',
      'Buat lubang tetes dekat setiap tanaman dengan jarum, atau pasang klem infus.',
      'Isi wadah penuh, lalu tampung tetesan tiap titik dengan gelas plastik selama 1 jam.',
      'Ukur volume tiap gelas, lalu hitung debit per hari (× 24) dan keseragamannya (terkecil ÷ terbesar).',
      'Pasang mulsa jerami bila sesuai rancangan. Biarkan bekerja dan catat sisa air setiap hari.',
      'Bandingkan debit, keseragaman, dan lama air bertahan dengan prediksi simulasi.'
    ],
    takaran: v => {
      const h = hitungTetes(v);
      return [
        `${WADAH_TETES[v.wadah].nama} diletakkan ${fx(+v.tinggi, 1)} m di atas tanah; ${JALUR_TETES[v.jalur].nama.toLowerCase()} ke 10 tanaman.`,
        `Lubang tetes setara diameter ${fx(+v.lubang, 2)} mm (lubang jarum halus atau klem infus yang diatur).`,
        `Target tiap titik ± ${fx(h.debit, 2)} L/hari = ± ${Math.round(h.debit * 1000 / 24)} mL per jam (± ${Math.round(h.debit * 1000 / 24 / 60 * 20)} tetes per menit).`,
        `Prediksi simulasi: air habis dalam ± ${fx(h.tahan)} hari, keseragaman ± ${h.rata}%.`
      ];
    },
    ukur: [
      { id: 'debit', label: 'Debit rata-rata per titik', satuan: 'L/hari', sim: 'debit' },
      { id: 'rata', label: 'Keseragaman (terkecil ÷ terbesar)', satuan: '%', sim: 'rata' },
      { id: 'tahan', label: 'Air bertahan', satuan: 'hari', sim: 'tahan' }
    ],
    masalah: [
      { gejala: 'Air cepat habis', kunci: 'cepat habis|boros|deras|banjir', petunjuk: ['Berapa debit tiap lubang? Apa yang terjadi pada debit bila lubangnya diperkecil atau wadahnya diturunkan?', 'Hitung: volume wadah ÷ pemakaian per hari = berapa hari?'] },
      { gejala: 'Tanaman di ujung kering', kunci: 'ujung|tidak rata|kering|layu', petunjuk: ['Mengapa tekanan di ujung selang yang panjang lebih kecil?', 'Bagaimana jalur selang bisa diubah agar air lebih merata?'] },
      { gejala: 'Lubang tersumbat', kunci: 'sumbat|tidak menetes|macet|berhenti', petunjuk: ['Apakah ada kotoran atau lumut dalam air? Bagaimana menyaring air sebelum masuk selang?', 'Apakah wadah sudah hampir kosong sehingga tekanannya terlalu kecil?'] }
    ]
  },
  mangrove: {
    waktu: '2 × 40 menit membuat model + uji gelombang (penanaman nyata bersama warga bila memungkinkan)',
    alat: [
      'Bak plastik panjang (± 60 × 30 cm) sebagai model pantai, pasir dan sedikit tanah liat',
      'Papan/penggaris lebar untuk membuat gelombang, air',
      'Tusuk sate, sedotan, atau ranting kecil sebagai "akar mangrove" (tusuk sate tegak = akar napas, sedotan melengkung = akar tunjang)',
      'Penggaris untuk mengukur garis pantai, HP untuk merekam',
      'Bila menanam di pantai: bibit mangrove dari kelompok tani, ajir bambu, sepatu boot'
    ],
    keselamatan: [
      'Penanaman di pantai wajib didampingi guru dan warga, saat air surut, dan tidak masuk ke air dalam.',
      'Pakai sepatu boot agar kaki tidak terluka cangkang atau benda tajam di lumpur.',
      'Pada model, buat gelombang dengan tenaga yang sama setiap kali; jaga lantai agar tidak licin.'
    ],
    langkah: [
      'Buat pantai miring dari pasir di satu ujung bak, lalu isi air setinggi ± 5 cm.',
      'Tandai garis pantai awal dengan penggaris.',
      'Uji tanpa mangrove: buat 20 gelombang dengan papan, lalu ukur seberapa jauh garis pantai mundur.',
      'Ratakan kembali pasirnya. Tancapkan "akar mangrove" sesuai jenis, lebar, dan kerapatan rancangan (skalakan: 1 cm model = 5 m).',
      'Ulangi 20 gelombang yang sama, lalu ukur kemunduran garis pantai.',
      'Bandingkan persentase pengurangan abrasi dengan prediksi simulasi.',
      'Bila memungkinkan, ikut menanam bibit mangrove bersama warga dan catat jumlah bibit yang hidup setelah 1 bulan.'
    ],
    takaran: v => {
      const h = hitungMangrove(v), tanpa = hitungMangrove({ ...v, lebar: 0 });
      return [
        `${JENIS_MANGROVE[v.jenis].nama}; lebar sabuk ${v.lebar} m (model: ${fx(+v.lebar / 5, 0)} cm); kerapatan ${v.rapat} pohon per 100 m².`,
        `Pada model 30 cm lebar bak: tancapkan ± ${Math.max(1, Math.round(+v.rapat * (+v.lebar / 5) * 30 / 400))} batang "akar" yang tersebar merata.`,
        `Prediksi simulasi umur ${v.umur} tahun: abrasi turun dari ${fx(tanpa.abrasi, 1)} menjadi ${fx(h.abrasi, 2)} m/tahun (berkurang ${Math.round((1 - h.abrasi / tanpa.abrasi) * 100)}%).`,
        `Bibit diperlukan ${h.bibit.toLocaleString('id-ID')} pohon, biaya ${rp(h.biaya)}.`
      ];
    },
    ukur: [
      { id: 'mundurTanpa', label: 'Garis pantai mundur tanpa mangrove', satuan: 'cm' },
      { id: 'mundurAda', label: 'Garis pantai mundur dengan mangrove', satuan: 'cm' },
      { id: 'hidup', label: 'Bibit hidup setelah 1 bulan (bila menanam)', satuan: '%', sim: 'hidup' }
    ],
    masalah: [
      { gejala: 'Pasir tetap banyak terkikis', kunci: 'terkikis|tergerus|abrasi|hanyut', petunjuk: ['Seberapa lebar dan rapat sabuk "akar" di modelmu dibanding rancangan?', 'Bentuk akar mana yang lebih banyak menahan gelombang? Mengapa?'] },
      { gejala: 'Hasil tiap uji berbeda-beda', kunci: 'beda|berubah|tidak sama', petunjuk: ['Apakah kekuatan dan jumlah gelombang selalu sama? Bagaimana caramu membuatnya adil?', 'Apakah pasir sudah diratakan dan dipadatkan sama setiap kali?'] },
      { gejala: 'Banyak bibit mati', kunci: 'mati|layu|hanyut|dicabut', petunjuk: ['Apakah jenis bibit cocok dengan zona tanamnya (depan atau belakang)?', 'Apakah bibit ditanam terlalu rapat? Apa yang diperebutkan bibit yang berdesakan?'] }
    ]
  },
  tempe: {
    waktu: '1 × 40 menit menyiapkan (kedelai sudah direndam dan direbus di rumah) + 2 hari pengamatan',
    alat: [
      '0,5 kg kedelai yang sudah direndam semalam, dikupas, dan direbus (dibantu orang dewasa)',
      'Ragi tempe, timbangan, sendok, baskom bersih, kain lap bersih',
      'Plastik bening dan tusuk gigi untuk melubangi, atau daun pisang (sesuai rancangan)',
      'Termometer, kardus/wadah untuk tempat fermentasi, label waktu'
    ],
    keselamatan: [
      'Merebus kedelai harus didampingi orang dewasa; hati-hati dengan air panas.',
      'Cuci tangan dengan sabun dan bersihkan alat sebelum mencampur ragi.',
      'Jangan memakan tempe yang berlendir, berbau busuk, atau berjamur warna selain putih.',
      'Bila menghangatkan dengan lampu, jaga jarak dari plastik agar tidak meleleh atau terbakar.'
    ],
    langkah: [
      'Tiriskan kedelai rebus sampai benar-benar dingin dan kering permukaannya (sesuai kebersihan rancangan).',
      'Taburkan ragi sesuai takaran, aduk rata dengan sendok bersih.',
      'Bungkus sesuai rancangan dan ratakan setebal rancangan. Bila memakai plastik berlubang, tusuk tiap 2 cm.',
      'Simpan di tempat dengan suhu sesuai rancangan. Ukur suhu ruang dan suhu di tengah tempe.',
      'Amati setiap 8 jam: munculnya kapang putih, kekompakan, dan aromanya.',
      'Panen sesuai lama rancangan. Iris tempe dan periksa kepadatannya.',
      'Bandingkan tutupan kapang, aroma, dan waktu jadi dengan prediksi simulasi.'
    ],
    takaran: v => {
      const h = hitungTempe(v);
      return [
        `Untuk 0,5 kg kedelai: ragi ± ${fx(+v.ragi / 2, 2)} g (± ${fxd(+v.ragi / 2 / 2)} sendok teh peres).`,
        `Bungkus: ${BUNGKUS_TEMPE[v.bungkus].nama.toLowerCase()}, tebal ${fx(+v.tebal, 1)} cm; simpan pada ± ${v.suhu} °C selama ${v.lama} jam.`,
        `Prediksi simulasi: suhu tengah ± ${fx(h.tengah)} °C, padat pada jam ke-${h.jadi}, aroma: ${h.aroma.toLowerCase()}.`
      ];
    },
    ukur: [
      { id: 'tengah', label: 'Suhu tengah tempe (jam ke-24)', satuan: '°C', sim: 'tengah' },
      { id: 'padat', label: 'Tempe padat pada jam ke-', satuan: 'jam' },
      { id: 'tutup', label: 'Perkiraan tutupan kapang saat panen', satuan: '%', sim: 'tutup' }
    ],
    masalah: [
      { gejala: 'Kedelai tidak menyatu, kapang sedikit', kunci: 'tidak menyatu|lepas|kapang sedikit|belum jadi', petunjuk: ['Berapa suhu tempat fermentasimu? Apakah terlalu dingin untuk kapang?', 'Apakah kapang mendapat oksigen? Apakah ragimu cukup?'] },
      { gejala: 'Berlendir dan bau asam', kunci: 'lendir|asam|basi|lengket', petunjuk: ['Apakah kedelai sudah kering dan alat sudah bersih sebelum diberi ragi?', 'Apakah bungkusnya terlalu rapat sehingga pengap dan lembap? Siapa yang tumbuh dalam keadaan itu?'] },
      { gejala: 'Ada bintik hitam dan bau amonia', kunci: 'hitam|spora|amonia|pesing', petunjuk: ['Berapa lama tempe dibiarkan setelah sudah padat?', 'Apakah bagian tengah tempe terlalu panas karena terlalu tebal?'] }
    ]
  }
});

UJI_NALAR.push(
  {
    ind: 'evaluasi',
    soal: 'Seorang penjual mengklaim, "Ikan asin saya dijemur di bawah plastik tertutup rapat tanpa lubang, jadi paling cepat kering karena paling panas." Penilaian yang paling tepat adalah …',
    opsi: [
      'Belum tentu: tanpa lubang, uap air terperangkap sehingga udara jenuh dan penguapan justru melambat.',
      'Tepat: makin panas suhu di dalam penutup, makin cepat ikan kering, berapa pun kelembapan udaranya.',
      'Tepat: plastik rapat mencegah angin masuk, dan angin selalu memperlambat ikan menjadi kering.',
      'Kurang tepat: plastik menghalangi semua sinar matahari, sehingga suhu di dalamnya justru paling dingin.'
    ],
    bahas: 'Penguapan butuh panas dan udara kering. Tanpa ventilasi, kelembapan di dalam naik mendekati jenuh, sehingga ikan sulit kering walaupun panas.'
  },
  {
    ind: 'analisis',
    soal: 'Dua petak garam sama luas menerima air laut yang sama. Petak A berisi air 2 cm, petak B 8 cm. Petak A panen dalam 3 hari dan menghasilkan 1 kg; petak B panen dalam 14 hari dan menghasilkan 4 kg. Analisis yang paling tepat adalah …',
    opsi: [
      'Air dalam memberi garam lebih banyak, tetapi butuh waktu lebih lama, karena air yang diuapkan lebih banyak.',
      'Petak B lebih baik dalam segala hal, karena hasil garamnya empat kali lebih banyak daripada hasil petak A.',
      'Petak A lebih baik dalam segala hal, karena garam yang cepat dipanen pasti juga lebih murni dan lebih bersih.',
      'Kedalaman air tidak berpengaruh, karena perbedaan hasil hanya disebabkan oleh cuaca di masing-masing petak.'
    ],
    bahas: 'Hasil garam sebanding volume air, sedangkan lama panen sebanding kedalaman. Pilihan terbaik bergantung pada kriteria, misalnya batas waktu sebelum musim hujan.'
  },
  {
    ind: 'evaluasi',
    soal: 'Kertas kunyit menjadi merah saat dicelupkan ke kerupuk yang adonannya memakai air kapur. Seorang teman langsung menyimpulkan, "Kerupuk ini pasti mengandung boraks." Tanggapan yang paling kritis adalah …',
    opsi: [
      'Belum tentu: kunyit juga memerah di larutan basa, jadi sampel perlu diasamkan dan dibandingkan kontrol.',
      'Tepat: kunyit hanya berubah warna bila bertemu boraks, sehingga warna merah sudah menjadi bukti yang pasti.',
      'Tepat: semua kerupuk yang kenyal pasti memakai boraks, jadi hasil uji kunyit hanya menguatkan dugaan itu.',
      'Kurang tepat: kunyit tidak dapat berubah warna sama sekali, sehingga warna merah pasti karena kertasnya kotor.'
    ],
    bahas: 'Kurkumin berubah warna dalam suasana basa (positif palsu). Uji yang baik memakai kontrol dan mengasamkan sampel. Hasilnya tetap hanya indikasi awal.'
  },
  {
    ind: 'inferensi',
    soal: 'Larutan gula dan ragi di perangkap nyamuk dibuat dengan air mendidih, lalu selama tiga hari tidak muncul gelembung sama sekali. Dugaan yang paling masuk akal adalah …',
    opsi: [
      'Ragi mati karena air terlalu panas, sehingga fermentasi tidak terjadi dan tidak ada CO₂ yang dihasilkan.',
      'Gula larut terlalu sempurna dalam air panas, sehingga gula tidak lagi dapat diubah menjadi gas oleh ragi.',
      'Nyamuk sudah menghabiskan semua CO₂ di dalam botol, sehingga gelembung tidak lagi terlihat di larutan itu.',
      'Gelembung tidak muncul karena botol kurang besar, sebab fermentasi hanya terjadi di wadah yang luas.'
    ],
    bahas: 'Ragi adalah makhluk hidup yang mati pada suhu tinggi. Tanpa ragi yang hidup, gula tidak difermentasi menjadi alkohol dan CO₂.'
  },
  {
    ind: 'eksplanasi',
    soal: 'Kompos dari sisa sayur saja (tanpa daun kering) yang disimpan di ember tertutup rapat menjadi sangat bau. Penjelasan yang paling lengkap adalah …',
    opsi: [
      'C/N terlalu rendah dan ember rapat kekurangan oksigen, sehingga mikroba anaerob penyebab bau tumbuh.',
      'Sisa sayur memang selalu berbau busuk, sehingga sampah sayur sama sekali tidak dapat dibuat menjadi kompos.',
      'Ember tertutup rapat membuat kompos terlalu panas, dan panas yang tinggi selalu menimbulkan bau busuk.',
      'Bau muncul karena kompos sudah matang, sebab kompos yang matang memang selalu berbau busuk dan menyengat.'
    ],
    bahas: 'Dekomposer butuh C/N seimbang, kelembapan cukup, dan oksigen. Kekurangan oksigen dan kelebihan nitrogen menimbulkan bau busuk dan amonia.'
  },
  {
    ind: 'analisis',
    soal: 'Sebuah kelas memasang dua kipas, tetapi termometer menunjukkan suhu udara tetap 34 °C. Murid merasa lebih sejuk. Analisis yang paling tepat adalah …',
    opsi: [
      'Kipas tidak menurunkan suhu udara, tetapi angin mempercepat penguapan keringat sehingga tubuh terasa sejuk.',
      'Termometernya pasti rusak, karena kipas selalu menurunkan suhu udara di ruangan beberapa derajat Celsius.',
      'Murid hanya merasa sejuk karena sugesti, sebab angin dari kipas tidak memengaruhi tubuh manusia sama sekali.',
      'Kipas menyedot panas keluar dari ruangan, tetapi termometer membutuhkan beberapa hari untuk menunjukkannya.'
    ],
    bahas: 'Suhu terasa berbeda dengan suhu udara. Kipas membantu tubuh melepas kalor lewat penguapan keringat, tetapi tidak membuang panas dari ruangan.'
  },
  {
    ind: 'inferensi',
    soal: 'Wadah penyiram tetes dinaikkan dari 0,5 m menjadi 2 m, sedangkan lubangnya tetap. Dugaan yang paling masuk akal adalah …',
    opsi: [
      'Tetesan menjadi lebih cepat karena tekanan di lubang naik, sehingga air dalam wadah lebih cepat habis.',
      'Tetesan menjadi lebih lambat, karena air harus mengalir lebih jauh dari wadah yang tinggi ke tanaman.',
      'Tetesan tidak berubah, karena tekanan air hanya ditentukan oleh besar lubang dan bukan oleh tinggi wadah.',
      'Tetesan berhenti sama sekali, karena air tidak dapat mengalir turun melalui selang dari tempat setinggi itu.'
    ],
    bahas: 'Tekanan hidrostatis p = ρgh bertambah dengan ketinggian, sehingga kecepatan air keluar (√2gh) dan debit ikut bertambah.'
  },
  {
    ind: 'evaluasi',
    soal: 'Desa menanam 10.000 bibit bakau sekaligus di zona depan yang langsung terkena ombak, lalu mengklaim, "Pantai kita pasti aman tahun ini." Penilaian yang paling tepat adalah …',
    opsi: [
      'Belum tentu: bibit muda belum meredam gelombang, dan bakau di zona depan banyak yang mati; hasilnya perlu dipantau bertahun-tahun.',
      'Tepat: makin banyak bibit yang ditanam, makin aman pantai dari abrasi, sejak hari pertama bibit itu ditanam.',
      'Tepat: bakau memiliki akar tunjang yang kuat, sehingga semua bibitnya pasti hidup di zona mana pun ditanam.',
      'Kurang tepat: mangrove tidak berpengaruh terhadap abrasi, karena gelombang hanya dapat ditahan oleh tembok beton.'
    ],
    bahas: 'Daya redam mangrove bergantung pada pohon yang hidup, bentuk akar, dan umurnya. Jenis harus sesuai zona, dan hasilnya baru terlihat setelah beberapa tahun.'
  },
  {
    ind: 'interpretasi',
    soal: 'Data fermentasi tempe (tebal 2 cm, plastik berlubang): suhu ruang 25 °C → padat jam ke-83; 30 °C → jam ke-41; 40 °C → tidak jadi. Makna data yang paling tepat adalah …',
    opsi: [
      'Ada suhu terbaik sekitar 30 °C; suhu terlalu dingin memperlambat kapang, dan suhu terlalu panas menghentikan pertumbuhannya.',
      'Makin panas suhu ruang, makin cepat tempe jadi, sehingga tempe sebaiknya selalu disimpan di tempat paling panas.',
      'Suhu ruang tidak berpengaruh, karena lama tempe jadi hanya ditentukan oleh banyaknya ragi yang ditaburkan saja.',
      'Makin dingin suhu ruang, makin baik tempe yang dihasilkan, karena kapang tumbuh paling cepat di tempat dingin.'
    ],
    bahas: 'Pertumbuhan kapang memiliki suhu optimum. Data menunjukkan pola naik lalu gagal, bukan "makin panas makin baik".'
  }
);
