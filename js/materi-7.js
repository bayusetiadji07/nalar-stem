/* Materi Gali Konsep ala buku — misi kelas 7 (dan 7–8). Memakai cetakan di js/materi.js. */

const SVG_SARINGAN = `<svg viewBox="0 0 560 300" class="svg-materi" role="img" aria-label="Susunan lapisan penyaring air">
  <style>.pj-t{font:700 13.5px var(--font,system-ui);fill:#0f172a}.pj-s{font:500 12px var(--font,system-ui);fill:#5b6576}</style>
  <path d="M150 20 L250 20 L250 270 L150 270 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="2.5"/>
  <rect x="152" y="40" width="96" height="40" fill="#a16207" opacity=".55"/>
  <rect x="152" y="80" width="96" height="45" fill="#fde68a"/>
  <rect x="152" y="125" width="96" height="45" fill="#334155"/>
  <rect x="152" y="170" width="96" height="45" fill="#cbd5e1"/>
  <rect x="152" y="215" width="96" height="40" fill="#78716c" opacity=".7"/>
  <path d="M200 4 v20" stroke="#92400e" stroke-width="5"/><path d="M200 272 v22" stroke="#0ea5e9" stroke-width="5"/>
  <text class="pj-s" x="210" y="14">air keruh masuk</text><text class="pj-s" x="210" y="292">air lebih jernih keluar</text>
  ${[[60, 'Ijuk', 'menahan kotoran kasar'], [102, 'Pasir halus', 'menahan partikel halus (keruh)'], [148, 'Arang', 'menyerap bau & warna (adsorpsi)'], [192, 'Pasir/kerikil kecil', 'penyangga'], [236, 'Kerikil', 'menahan lapisan di atasnya']].map(([y, n, k]) => `<path d="M250 ${y} H290" stroke="#94a3b8" stroke-dasharray="3 3"/><text class="pj-t" x="296" y="${y}">${n}</text><text class="pj-s" x="296" y="${y + 15}">${k}</text>`).join('')}
</svg>`;

const SVG_KALOR3 = `<svg viewBox="0 0 660 220" class="svg-materi" role="img" aria-label="Tiga cara perpindahan kalor">
  <style>.kl-t{font:800 15px var(--font,system-ui);fill:#0f172a}.kl-s{font:500 12.5px var(--font,system-ui);fill:#5b6576}</style>
  <defs><marker id="klP" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ea580c"/></marker></defs>
  <g><rect x="10" y="20" width="200" height="160" rx="14" fill="#fff7ed" stroke="#fdba74"/><text class="kl-t" x="110" y="45" text-anchor="middle">Konduksi</text>
    <rect x="35" y="95" width="150" height="16" rx="4" fill="#94a3b8"/><path d="M45 140 q10 -14 20 0 q10 14 20 0" stroke="#ea580c" stroke-width="3" fill="none"/>
    <path d="M70 85 H170" stroke="#ea580c" stroke-width="3" marker-end="url(#klP)"/><text class="kl-s" x="110" y="168" text-anchor="middle">merambat lewat zat padat</text></g>
  <g><rect x="230" y="20" width="200" height="160" rx="14" fill="#eff6ff" stroke="#93c5fd"/><text class="kl-t" x="330" y="45" text-anchor="middle">Konveksi</text>
    <path d="M300 140 C280 100 300 70 330 70 C360 70 380 100 360 140" stroke="#ea580c" stroke-width="3" fill="none" marker-end="url(#klP)"/><path d="M360 140 C350 150 310 150 300 140" stroke="#2563eb" stroke-width="3" fill="none"/>
    <text class="kl-s" x="330" y="168" text-anchor="middle">terbawa aliran udara/air</text></g>
  <g><rect x="450" y="20" width="200" height="160" rx="14" fill="#fefce8" stroke="#fde047"/><text class="kl-t" x="550" y="45" text-anchor="middle">Radiasi</text>
    <circle cx="495" cy="95" r="20" fill="#facc15"/>${[0, 1, 2].map(i => `<path d="M520 ${82 + i * 14} H600" stroke="#ea580c" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#klP)"/>`).join('')}
    <text class="kl-s" x="550" y="168" text-anchor="middle">pancaran, tanpa perantara</text></g>
</svg>`;

const SVG_SILANG = `<svg viewBox="0 0 600 250" class="svg-materi" role="img" aria-label="Ventilasi silang dan konveksi di ruang kelas">
  <style>.vs-s{font:500 12.5px var(--font,system-ui);fill:#5b6576}</style>
  <defs><marker id="vsB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2563eb"/></marker><marker id="vsM" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#dc2626"/></marker></defs>
  <path d="M90 90 L300 20 L510 90" fill="none" stroke="#64748b" stroke-width="5"/><rect x="100" y="90" width="400" height="140" fill="#fff" stroke="#94a3b8" stroke-width="2.5"/>
  <rect x="96" y="150" width="8" height="40" fill="#bae6fd"/><rect x="496" y="150" width="8" height="40" fill="#bae6fd"/><rect x="496" y="100" width="8" height="20" fill="#bae6fd"/>
  <path d="M30 170 H180 C260 170 300 150 330 130 C380 100 440 110 540 110" stroke="#2563eb" stroke-width="3" fill="none" marker-end="url(#vsB)"/>
  <path d="M250 205 C250 170 270 140 300 110" stroke="#dc2626" stroke-width="3" fill="none" marker-end="url(#vsM)"/>
  <text class="vs-s" x="20" y="160">udara sejuk masuk</text><text class="vs-s" x="595" y="140" text-anchor="end">udara panas keluar</text><text class="vs-s" x="595" y="156" text-anchor="end">lewat roster atas</text>
  <text class="vs-s" x="175" y="222">udara hangat dari tubuh murid naik</text>
</svg>`;

const SVG_PEMBATAS = `<svg viewBox="0 0 560 260" class="svg-materi" role="img" aria-label="Grafik faktor pembatas fotosintesis">
  <style>.fp-s{font:500 12.5px var(--font,system-ui);fill:#5b6576}.fp-t{font:700 13px var(--font,system-ui)}</style>
  <path d="M70 220 H530 M70 220 V20" stroke="#334155" stroke-width="2"/>
  <path d="M70 220 Q170 110 260 100 H520" stroke="#16a34a" stroke-width="3.5" fill="none"/>
  <path d="M70 220 Q190 70 320 55 H520" stroke="#0d9488" stroke-width="3.5" fill="none" stroke-dasharray="7 4"/>
  <text class="fp-t" x="525" y="120" text-anchor="end" style="fill:#16a34a">CO₂ rendah → mendatar (CO₂ pembatas)</text>
  <text class="fp-t" x="525" y="44" text-anchor="end" style="fill:#0d9488">CO₂ tinggi → bisa lebih cepat</text>
  <text class="fp-s" x="300" y="248" text-anchor="middle">intensitas cahaya →</text>
  <text class="fp-s" x="22" y="130" transform="rotate(-90 22 130)" text-anchor="middle">laju fotosintesis →</text>
  <text class="fp-s" x="120" y="200">cahaya pembatas</text>
</svg>`;

pasangMateri({
  penjernih: bukuMateri('penjernih', {
    pembuka: 'Air sungai yang keruh tampak seperti satu zat, padahal ia adalah <b>campuran</b>: air, butiran tanah, sisa daun, zat berbau, bahkan kuman. Kunci menjernihkannya adalah memahami <b>sifat setiap komponen campuran</b>, lalu memilih cara memisahkan yang tepat.',
    bagian: [
      ['Zat tunggal dan campuran', `<p><b>Zat tunggal</b> hanya terdiri atas satu jenis zat, misalnya air murni atau garam dapur murni. <b>Campuran</b> terdiri atas dua zat atau lebih yang sifat aslinya masih ada.</p>
        ${mTabel(['Jenis campuran', 'Ciri', 'Contoh'], [['Homogen (larutan)', 'merata, komponennya tidak terlihat', 'air garam, air gula, sirup'], ['Heterogen', 'tidak merata, komponennya terlihat/mengendap', 'air sungai keruh, air + pasir'], ['Koloid', 'tampak merata, tetapi partikelnya cukup besar untuk menghamburkan cahaya', 'susu, santan, air sabun']])}
        ${mKotak('misi', 'air sungai keruh adalah campuran <b>heterogen</b> (lumpur, pasir, daun) dan sebagian <b>larutan</b> (zat penyebab bau dan warna). Karena itu, satu cara pemisahan saja tidak cukup.')}`],
      ['Cara memisahkan campuran', `<p>Campuran dipisahkan berdasarkan <b>perbedaan sifat</b> komponennya.</p>
        ${mTabel(['Cara', 'Berdasarkan perbedaan', 'Contoh sehari-hari'], [['Filtrasi (penyaringan)', 'ukuran partikel', 'menyaring santan, saringan teh'], ['Sedimentasi (pengendapan)', 'massa jenis, partikel berat turun', 'air keruh didiamkan semalam'], ['Adsorpsi (penyerapan permukaan)', 'kemampuan menempel pada permukaan berpori', 'arang menyerap bau'], ['Penguapan', 'titik didih/kemampuan menguap', 'tambak garam'], ['Distilasi (penyulingan)', 'titik didih', 'pembuatan air suling'], ['Kromatografi', 'kecepatan merambat pada kertas', 'memisahkan warna tinta']])}`],
      ['Filtrasi dan adsorpsi dalam penjernih air', `<p>Pada penjernih air, beberapa lapisan disusun bertingkat. Celah di antara butiran berfungsi seperti saringan: partikel yang lebih besar dari celah <b>tertahan</b>, sedangkan air lolos.</p>
        ${mGbr(SVG_SARINGAN, 'Gambar 1. Contoh susunan lapisan penjernih air sederhana (urutan dapat kamu uji di laboratorium maya).')}
        <p><b>Arang</b> bekerja dengan cara berbeda: permukaannya penuh pori-pori sangat kecil, sehingga zat penyebab bau dan warna <b>menempel</b> di permukaannya. Peristiwa ini disebut <b>adsorpsi</b>.</p>
        ${mKotak('tahukah', 'satu gram karbon aktif bisa memiliki luas permukaan pori ratusan meter persegi, seluas lapangan voli!')}`],
      ['Urutan lapisan dan kecepatan aliran', `<p>Lapisan bercelah <b>besar</b> (ijuk, kerikil) menahan kotoran kasar dan membuat air mengalir cepat. Lapisan bercelah <b>kecil</b> (pasir halus) menahan partikel halus penyebab keruh, tetapi alirannya lebih lambat.</p>
        ${mKotak('miskon', 'menaruh pasir halus di paling atas tampaknya "lebih menyaring", padahal kotoran kasar akan langsung menyumbat celahnya sehingga air nyaris tidak mengalir.')}
        ${mKotak('misi', 'kriteria misimu menuntut air jernih (≤ 25 NTU), tidak berbau, <b>dan</b> debit ≥ 60 mL/menit. Ketiganya saling tarik: lapisan halus yang tebal membuat jernih tetapi lambat.')}`],
      ['Jernih belum tentu layak minum', `<p>Penyaringan hanya menahan partikel. <b>Kuman</b> (bakteri dan virus) sangat kecil dan tetap bisa lolos. Air hasil penyaringan harus <b>direbus sampai mendidih</b> sebelum diminum. Perebusan membunuh kuman dengan panas.</p>
        ${mKotak('coba', 'tuang segelas air keruh ke gelas bening, diamkan 30 menit. Amati endapannya. Cara pemisahan apa yang terjadi?')}`]
    ],
    ringkas: [['Lapisan', 'Fungsi', 'Cara kerja'], ['Ijuk / kerikil', 'menahan kotoran kasar', 'filtrasi, celah besar'], ['Pasir halus', 'menahan partikel keruh', 'filtrasi, celah kecil'], ['Arang', 'menghilangkan bau & warna', 'adsorpsi'], ['Perebusan', 'membunuh kuman', 'pemanasan']],
    aman: 'cuci tangan setelah memegang air sungai, jangan meminum air hasil percobaan, dan rebus dulu air hasil saringan bila akan dipakai.',
    uji: [['Mengapa arang dapat menghilangkan bau, padahal celahnya tidak terlalu kecil?', 'Ingat perbedaan filtrasi dan adsorpsi.'], ['Rani menaruh pasir halus paling atas. Airnya jernih tetapi sangat lambat. Apa yang sebaiknya diubah?', 'Lapisan mana yang seharusnya menahan kotoran kasar lebih dulu?'], ['Apakah air yang sudah jernih pasti aman diminum? Jelaskan.', 'Pikirkan ukuran kuman dibandingkan celah pasir.']]
  }),

  pendingin: bukuMateri('pendingin', {
    pembuka: 'Es di kotak nelayan tidak "habis dingin"; ia <b>menerima kalor</b> dari udara panas di sekitarnya. Kotak pendingin yang baik bukan membuat dingin, melainkan <b>menghambat kalor masuk</b>.',
    bagian: [
      ['Suhu dan kalor', `<p><b>Suhu</b> menyatakan derajat panas atau dingin suatu benda dan diukur dengan termometer (°C). <b>Kalor</b> adalah energi panas yang berpindah karena perbedaan suhu, satuannya joule (J). Kalor selalu berpindah dari benda bersuhu <b>tinggi</b> ke benda bersuhu <b>rendah</b>, sampai suhunya sama (kesetimbangan termal).</p>
        ${mKotak('miskon', '"Dingin" bukan sesuatu yang mengalir masuk ke ikan. Yang terjadi: kalor dari ikan mengalir ke es, sehingga ikan menjadi dingin dan es mencair.')}`],
      ['Kalor untuk mencairkan es', `<p>Es yang mencair menyerap kalor tanpa naik suhunya (tetap 0 °C). Kalor ini disebut <b>kalor lebur</b>.</p>${mRumus('Q = m × L', 'Q = kalor (J), m = massa es (kg), L = kalor lebur es = 334.000 J/kg')}
        <p>Artinya, mencairkan 1 kg es membutuhkan 334.000 J. Makin banyak es, makin banyak kalor yang dibutuhkan untuk mencairkan semuanya, sehingga es bertahan lebih lama.</p>`],
      ['Tiga cara perpindahan kalor', `${mGbr(SVG_KALOR3, 'Gambar 1. Konduksi, konveksi, dan radiasi.')}
        ${mTabel(['Cara', 'Pengertian', 'Pada kotak pendingin', 'Cara menghambat'], [['Konduksi', 'kalor merambat melalui zat tanpa zatnya berpindah', 'lewat dinding kotak', 'bahan isolator, dinding tebal'], ['Konveksi', 'kalor terbawa aliran zat cair/gas', 'udara lewat celah tutup', 'tutup rapat'], ['Radiasi', 'kalor dipancarkan tanpa perantara', 'sinar matahari mengenai kotak', 'warna putih/mengilap, simpan di tempat teduh']])}`],
      ['Konduktor dan isolator', `<p><b>Konduktor</b> mudah menghantarkan kalor (logam: besi, aluminium, seng). <b>Isolator</b> sulit menghantarkan kalor (styrofoam, kayu, sekam, kain). Banyak isolator yang baik mengandung <b>rongga udara</b>, karena udara diam adalah penghantar kalor yang buruk.</p>
        ${mKotak('tahukah', 'sekam padi dan serbuk gergaji dipakai petani dan nelayan zaman dulu sebagai isolator murah untuk menyimpan es balok.')}
        ${mKotak('misi', 'dinding makin tebal menghambat kalor, tetapi kotak makin berat (batas 5 kg). Cari bahan dan ketebalan yang paling seimbang.')}`],
      ['Penerapan dalam kehidupan', `<p>Termos memakai dinding ganda hampa udara (menghambat konduksi dan konveksi) dan lapisan mengilap (menghambat radiasi). Kulkas memakai busa isolator di dindingnya. Rumah di daerah panas memakai atap terang agar tidak menyerap banyak radiasi.</p>
        ${mKotak('coba', 'bungkus dua es batu yang sama besar: satu dengan kain tebal, satu dibiarkan terbuka. Catat mana yang lebih lama mencair dan jelaskan alasannya.')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Arah kalor', 'dari suhu tinggi ke suhu rendah'], ['Q = m × L', 'makin banyak es, makin banyak kalor untuk mencairkannya'], ['Isolator', 'menghambat konduksi; banyak mengandung rongga udara'], ['Tutup rapat', 'menghambat konveksi'], ['Warna terang', 'mengurangi radiasi yang diserap']],
    aman: 'hati-hati memotong styrofoam dengan pisau/cutter, dan jangan memegang es kering (dry ice) tanpa sarung tangan.',
    uji: [['Mengapa ikan dalam kotak menjadi dingin? Jelaskan dengan arah perpindahan kalor.', 'Benda mana yang suhunya lebih tinggi?'], ['Kotak seng tipis dan kotak styrofoam tebal berisi es yang sama. Mana yang es-nya lebih awet? Mengapa?', 'Bandingkan sifat konduktor dan isolator.'], ['Sebutkan satu cara menghambat masing-masing: konduksi, konveksi, dan radiasi.', 'Lihat tabel tiga cara perpindahan kalor.']]
  }),

  pengering: bukuMateri('pengering', {
    pembuka: 'Ikan asin kering karena <b>airnya menguap</b>. Pengering tenaga surya bekerja dengan dua cara sekaligus: <b>menangkap panas matahari</b> dan <b>membuang uap air</b>. Keduanya harus seimbang.',
    bagian: [
      ['Radiasi matahari dan warna permukaan', `<p>Kalor matahari sampai ke Bumi melalui <b>radiasi</b>. Permukaan <b>gelap dan kusam</b> menyerap paling banyak radiasi, sedangkan permukaan <b>putih atau mengilap</b> memantulkannya.</p>
        ${mTabel(['Permukaan', 'Menyerap radiasi', 'Contoh'], [['hitam kusam', 'sangat banyak', 'aspal siang hari terasa panas'], ['putih', 'sedikit', 'kaos putih terasa lebih sejuk'], ['logam mengilap', 'sangat sedikit', 'atap seng baru memantulkan silau']])}`],
      ['Efek rumah kaca pada pengering', `<p>Penutup bening (plastik atau kaca) meneruskan cahaya masuk. Cahaya diserap alas gelap dan diubah menjadi panas. Penutup menahan udara panas agar tidak segera keluar, sehingga suhu di dalam naik, seperti mobil yang diparkir di bawah terik.</p>
        ${mKotak('misi', 'suhu di dalam pengering tidak boleh lebih dari 60 °C agar ikan tidak "matang" dan rusak. Panas yang berlebihan juga merugikan.')}`],
      ['Penguapan dan kelembapan', `<p><b>Penguapan</b> adalah perubahan wujud cair menjadi gas yang terjadi di permukaan, pada suhu berapa pun. Penguapan makin cepat bila:</p>
        <ul><li><b>suhu</b> lebih tinggi;</li><li>udara di sekitarnya <b>kering</b> (kelembapan rendah);</li><li>ada <b>aliran udara</b> (angin) yang membawa uap pergi;</li><li><b>permukaan</b> lebih luas (ikan dibelah dan dijajarkan).</li></ul>
        <p><b>Kelembapan</b> menyatakan banyaknya uap air di udara. Udara yang sudah jenuh uap air tidak bisa lagi "menampung" uap dari ikan.</p>
        ${mKotak('miskon', 'pengering yang tertutup rapat memang paling panas, tetapi udaranya cepat jenuh uap air sehingga ikan justru sulit kering.')}`],
      ['Ventilasi: konveksi membuang uap', `<p>Lubang ventilasi bawah dan atas membuat udara mengalir: udara panas yang lembap naik dan keluar lewat lubang atas, digantikan udara kering dari bawah (<b>konveksi</b>). Kasa pada lubang mencegah lalat masuk.</p>
        ${mKotak('misi', 'ventilasi terlalu kecil → panas tetapi lembap; terlalu besar → kering tetapi suhunya turun. Ada <b>titik terbaik</b> yang perlu kamu temukan lewat uji adil.')}`],
      ['Kemiringan penutup', `<p>Permukaan menerima sinar paling banyak bila menghadap tegak lurus ke arah datangnya sinar. Karena matahari bergerak, penutup dimiringkan agar rata-rata sinar yang diterima sepanjang hari paling besar.</p>
        ${mKotak('coba', 'jemur dua lap basah yang sama: satu di tempat berangin, satu di sudut tertutup. Mana yang lebih cepat kering?')}`]
    ],
    ringkas: [['Bagian pengering', 'Konsep IPA', 'Fungsi'], ['Alas hitam', 'radiasi diserap', 'menghasilkan panas'], ['Penutup bening', 'efek rumah kaca', 'menahan udara panas'], ['Ventilasi berkasa', 'konveksi', 'membuang uap air, mencegah lalat'], ['Kemiringan', 'sudut datang sinar', 'menangkap sinar lebih banyak']],
    aman: 'kaca mudah pecah dan tepinya tajam; pakai sarung tangan saat merakit dan jangan menyentuh alas hitam yang lama terjemur.',
    uji: [['Mengapa alas pengering dicat hitam, bukan putih?', 'Hubungkan warna dengan penyerapan radiasi.'], ['Pengering Doni sangat panas, tetapi ikannya tetap lembek dan basah. Apa kemungkinan penyebabnya?', 'Ke mana uap air dari ikan pergi?'], ['Sebutkan empat faktor yang mempercepat penguapan.', 'Lihat bagian Penguapan dan kelembapan.']]
  }),

  garam: bukuMateri('garam', {
    pembuka: 'Setiap liter air laut membawa ± 35 gram garam yang larut tak terlihat. Petani garam memisahkan garam itu dengan bantuan matahari dan angin. Mengapa caranya bisa berhasil, dan mengapa garamnya kadang kotor?',
    bagian: [
      ['Larutan: pelarut dan zat terlarut', `<p>Air laut adalah <b>larutan</b>, yaitu campuran homogen. <b>Pelarut</b>-nya air, <b>zat terlarut</b>-nya terutama natrium klorida (NaCl) ditambah sedikit garam lain. Kadar garam air laut sekitar <b>3,5%</b>.</p>
        ${mRumus('kadar (%) = massa zat terlarut ÷ massa larutan × 100%', '1 kg air laut 3,5% berisi ± 35 g garam')}
        <p>Larutan yang tidak dapat lagi melarutkan zat terlarut disebut <b>larutan jenuh</b>. Pada air garam, larutan menjadi jenuh ketika kadarnya sekitar 26%.</p>`],
      ['Penguapan dan kristalisasi', `<p>Saat air menguap, garam tertinggal karena garam tidak ikut menguap. Larutan makin pekat, lalu menjadi jenuh. Sejak itu, garam mulai keluar dari larutan membentuk butiran teratur yang disebut <b>kristal</b>. Peristiwa ini disebut <b>kristalisasi</b>.</p>
        ${mTabel(['Tahap', 'Kadar garam', 'Yang terjadi'], [['air laut', '± 3,5%', 'garam larut seluruhnya'], ['air tua (peminihan)', '± 20–25%', 'gips dan kotoran mulai mengendap'], ['meja kristalisasi', '> 26%', 'kristal NaCl terbentuk']])}
        ${mKotak('tahukah', 'petani garam memakai alat pengukur kepekatan (baumé) untuk menentukan kapan air tua siap dialirkan ke meja kristalisasi.')}`],
      ['Faktor yang memengaruhi kecepatan panen', `<ul><li><b>Kedalaman air</b>: air dangkal lebih cepat panas dan habis menguap, tetapi garam yang dihasilkan lebih sedikit.</li><li><b>Luas petak</b>: makin luas permukaan, makin banyak air yang menguap sekaligus.</li><li><b>Warna alas</b>: alas gelap menyerap panas sehingga penguapan lebih cepat.</li><li><b>Cuaca</b>: terik dan berangin mempercepat; hujan mengencerkan lagi.</li></ul>
        ${mRumus('hasil garam ≈ volume air × kadar garam', 'lama panen ≈ kedalaman air ÷ laju penguapan')}
        ${mKotak('misi', 'kamu harus panen ≤ 7 hari <b>dan</b> mendapat ≥ 3 kg garam. Air dangkal cepat, tetapi hasilnya sedikit; air dalam sebaliknya.')}`],
      ['Kemurnian garam', `<p>Penyaringan dengan kain atau pasir hanya memisahkan <b>partikel yang tidak larut</b> (lumpur, pasir, sampah). Garam yang terlarut tetap lolos. Alas tanah membuat kristal bercampur lumpur sehingga garam kusam; alas terpal (geomembran) menghasilkan garam lebih putih.</p>
        ${mKotak('miskon', 'menyaring air laut tidak bisa "mengambil garamnya". Saringan hanya menahan zat padat yang tidak larut.')}`],
      ['Garam dan kesehatan', `<p>Garam dapur yang dijual wajib diberi <b>iodium</b> untuk mencegah gangguan kelenjar gondok dan gangguan kecerdasan. Garam hasil percobaan belum beriodium dan belum tentu bersih.</p>
        ${mKotak('coba', 'larutkan 2 sendok garam dalam segelas air, tuang sedikit ke piring hitam, dan jemur. Amati kristal yang terbentuk dengan kaca pembesar.')}`]
    ],
    ringkas: [['Konsep', 'Penjelasan singkat'], ['Larutan', 'air (pelarut) + garam (zat terlarut)'], ['Penguapan', 'air menguap, garam tertinggal'], ['Kristalisasi', 'garam keluar dari larutan jenuh membentuk kristal'], ['Penyaringan', 'hanya memisahkan zat padat yang tidak larut']],
    aman: 'jangan mencicipi garam hasil percobaan, pakai topi dan bawa air minum saat bekerja di bawah terik.',
    uji: [['Mengapa garam tertinggal ketika air laut menguap?', 'Bandingkan sifat air dan garam saat dipanaskan.'], ['Petak A berisi air 5 cm, petak B 20 cm, luasnya sama. Mana yang lebih cepat dipanen dan mana yang hasilnya lebih banyak?', 'Gunakan dua rumus di bagian C.'], ['Apakah menyaring air laut dengan kain bisa memisahkan garamnya? Jelaskan.', 'Garam terlarut atau tidak larut?']]
  }),

  kompos: bukuMateri('kompos', {
    pembuka: 'Daun yang gugur di hutan tidak menumpuk selamanya; perlahan ia "menghilang" menjadi tanah yang subur. Pelakunya adalah makhluk hidup yang sangat kecil. Kompos adalah cara kita meniru alam dengan bantuan mereka.',
    bagian: [
      ['Ekosistem dan peran dekomposer', `<p>Di dalam ekosistem ada <b>produsen</b> (tumbuhan), <b>konsumen</b> (hewan), dan <b>dekomposer</b> (bakteri, jamur, cacing tanah). Dekomposer menguraikan sisa makhluk hidup menjadi zat hara yang dipakai kembali oleh tumbuhan. Inilah <b>daur materi</b>.</p>
        ${mTabel(['Komponen', 'Peran', 'Contoh'], [['Produsen', 'membuat makanan dengan fotosintesis', 'sayur, pohon'], ['Konsumen', 'memakan makhluk lain', 'kambing, manusia'], ['Dekomposer', 'menguraikan sisa makhluk hidup', 'bakteri, jamur, cacing']])}
        ${mKotak('miskon', 'dekomposer bukan "kotoran", melainkan makhluk hidup yang butuh makan, air, dan udara.')}`],
      ['Makanan dekomposer: karbon dan nitrogen', `<p>Dekomposer butuh <b>karbon (C)</b> sebagai sumber energi, dari bahan <b>cokelat</b> (daun kering, kardus, jerami), dan <b>nitrogen (N)</b> untuk tumbuh, dari bahan <b>hijau</b> (sisa sayur, kulit buah). Perbandingan terbaik <b>C/N ± 25–35</b>.</p>
        ${mTabel(['Kondisi', 'Akibat'], [['bahan hijau terlalu banyak (C/N rendah)', 'nitrogen berlebih lepas sebagai amonia → bau menyengat'], ['bahan cokelat terlalu banyak (C/N tinggi)', 'penguraian sangat lambat'], ['seimbang (C/N 25–35)', 'cepat matang, tidak berbau']])}`],
      ['Air dan udara: aerob vs anaerob', `<p>Dekomposer yang baik untuk kompos adalah mikroba <b>aerob</b>, yaitu yang membutuhkan oksigen. Bila tumpukan terlalu basah atau tidak pernah dibalik, oksigen habis dan mikroba <b>anaerob</b> mengambil alih. Mikroba anaerob menghasilkan gas berbau busuk.</p>
        <p>Kelembapan yang pas ± 50–60%: bila digenggam, kompos terasa seperti spons yang diperas, tidak menetes.</p>
        ${mKotak('misi', 'pembalikan memasukkan oksigen, tetapi terlalu sering membalik membuat panas cepat hilang. Uji frekuensi pembalikan yang paling pas.')}`],
      ['Panas, ukuran bahan, dan tanda kompos matang', `<p>Mikroba yang aktif menghasilkan panas, sehingga tumpukan kompos yang baik bisa mencapai <b>45–60 °C</b>. Suhu ini juga membunuh bibit penyakit dan biji gulma. Bahan yang dicacah kecil memiliki permukaan lebih luas sehingga lebih cepat terurai.</p>
        <p><b>Kompos matang</b> berwarna cokelat kehitaman, gembur, berbau seperti tanah, dan suhunya sudah turun mendekati suhu udara.</p>
        ${mKotak('tahukah', 'satu sendok teh tanah subur bisa berisi lebih dari satu miliar bakteri!')}`],
      ['Sampah dan lingkungan', `<p>Sampah organik yang ditimbun tanpa udara di TPA terurai secara anaerob dan menghasilkan gas metana, gas rumah kaca yang jauh lebih kuat daripada CO₂. Mengompos di sekolah ikut mengurangi sampah sekaligus menghasilkan pupuk gratis untuk kebun.</p>
        ${mKotak('coba', 'kubur sepotong kulit pisang dan sepotong plastik di pot berisi tanah lembap. Gali setelah 2 minggu dan bandingkan.')}`]
    ],
    ringkas: [['Faktor', 'Kondisi terbaik', 'Bila salah'], ['C/N', '25–35 (cokelat : hijau seimbang)', 'bau amonia / sangat lambat'], ['Kelembapan', '50–60% (spons diperas)', 'busuk (terlalu basah) / berhenti (terlalu kering)'], ['Udara', 'dibalik berkala', 'anaerob, bau busuk'], ['Ukuran', 'dicacah kecil', 'lambat terurai']],
    aman: 'pakai sarung tangan, cuci tangan dengan sabun, dan jangan memasukkan daging, tulang, atau minyak.',
    uji: [['Kompos kelompok Sari berbau amonia menyengat. Bahan apa yang perlu ditambah?', 'Lihat tabel C/N.'], ['Mengapa kompos yang terlalu basah berbau busuk?', 'Hubungkan dengan oksigen dan jenis mikroba.'], ['Mengapa suhu tumpukan kompos bisa naik sampai 50 °C padahal tidak dipanaskan?', 'Siapa yang sedang bekerja di dalam tumpukan?']]
  }),

  sejuk: bukuMateri('sejuk', {
    pembuka: 'Ruang kelas yang panas bukan hanya karena cuaca. Kalor masuk dari atap, dinding, bahkan dari tubuh murid sendiri. Merancang kelas sejuk berarti <b>mengurangi kalor yang masuk</b> dan <b>membuang kalor yang ada</b>.',
    bagian: [
      ['Dari mana panas di kelas berasal?', `${mTabel(['Sumber kalor', 'Cara masuk', 'Penangkal'], [['Atap yang dijemur matahari', 'radiasi lalu konduksi', 'atap terang, plafon, aluminium foil'], ['Dinding barat (sore)', 'radiasi lalu konduksi', 'pohon peneduh, kerai'], ['Tubuh murid (± 70 W per orang)', 'radiasi dan konveksi', 'ventilasi'], ['Lampu dan peralatan listrik', 'menghasilkan panas', 'peralatan hemat energi']])}
        ${mKotak('tahukah', '32 murid menghasilkan panas sekitar 2.200 W, setara dua setrika listrik menyala bersamaan!')}`],
      ['Radiasi dan insulasi atap', `<p>Atap gelap menyerap radiasi matahari dan menjadi sangat panas, lalu kalor merambat (konduksi) dan dipancarkan lagi ke ruangan. Atap berwarna <b>terang</b> memantulkan radiasi. <b>Plafon</b> dan <b>aluminium foil</b> di bawah atap bekerja sebagai <b>insulator</b> (penghambat kalor).</p>`],
      ['Konveksi dan ventilasi silang', `<p>Udara panas lebih ringan sehingga naik, lalu digantikan udara yang lebih sejuk dari bawah. Inilah <b>konveksi</b>. Jendela di dua sisi (ventilasi silang) dan roster di bagian atas membuat udara mengalir menembus ruangan, membawa panas dan gas CO₂ keluar.</p>
        ${mGbr(SVG_SILANG, 'Gambar 1. Ventilasi silang: udara sejuk masuk dari jendela bawah, udara panas keluar lewat roster atas.')}
        ${mKotak('misi', 'kriteria udara segar (CO₂ ≤ 1.000 ppm) hanya bisa dipenuhi bila pertukaran udara cukup. Kelas yang ditutup rapat cepat pengap.')}`],
      ['Kipas angin dan suhu terasa', `<p>Kipas <b>tidak menurunkan suhu udara</b>; motornya justru menambah sedikit panas. Angin dari kipas membantu keringat menguap dari kulit. Penguapan menyerap kalor dari tubuh, sehingga badan <b>terasa</b> lebih sejuk.</p>
        ${mKotak('miskon', 'menyalakan kipas di ruangan kosong tidak membuat ruangan lebih dingin. Kipas hanya bermanfaat bila ada orang yang merasakannya.')}`],
      ['Bangunan hemat energi', `<p>Rumah tradisional Indonesia, seperti rumah panggung dan rumah joglo, beratap tinggi dengan banyak bukaan sehingga sejuk tanpa listrik. Prinsip yang sama dipakai arsitek modern dalam <b>bangunan hijau</b>: memanfaatkan peneduh, warna, insulasi, dan aliran udara alami.</p>
        ${mKotak('coba', 'ukur suhu di dekat lantai dan di dekat plafon kelasmu pada siang hari. Mana yang lebih panas? Apa artinya?')}`]
    ],
    ringkas: [['Strategi', 'Konsep', 'Efek'], ['Atap terang', 'radiasi dipantulkan', 'atap tidak terlalu panas'], ['Plafon / foil', 'insulasi', 'menghambat kalor turun'], ['Ventilasi silang', 'konveksi', 'membuang panas & CO₂'], ['Pohon peneduh', 'menghalangi radiasi', 'dinding lebih sejuk'], ['Kipas', 'penguapan keringat', 'terasa sejuk, suhu tetap']],
    aman: 'saat menguji model dengan lampu pijar, jangan menyentuh lampu yang menyala dan jauhkan dari kertas atau kardus.',
    uji: [['Mengapa roster sebaiknya dipasang di bagian atas dinding?', 'Ke mana udara panas bergerak?'], ['Apakah kipas angin menurunkan suhu udara di kelas? Jelaskan.', 'Bedakan suhu udara dan suhu yang terasa di kulit.'], ['Sebutkan dua cara mengurangi kalor dari atap.', 'Lihat bagian radiasi dan insulasi atap.']]
  }),

  mangrove: bukuMateri('mangrove', {
    pembuka: 'Ombak membawa energi besar yang mampu mengikis pantai sedikit demi sedikit. Tembok laut mahal dan bisa retak, sedangkan hutan mangrove justru makin kuat seiring waktu. Bagaimana sebuah ekosistem bisa menjadi "benteng hidup"?',
    bagian: [
      ['Ekosistem mangrove', `<p><b>Ekosistem</b> adalah kesatuan makhluk hidup dan lingkungan tak hidupnya yang saling berinteraksi. Mangrove tumbuh di pantai berlumpur yang terkena pasang surut air laut asin. Komponennya:</p>
        ${mTabel(['Komponen', 'Contoh di mangrove'], [['Biotik (hidup)', 'pohon mangrove, kepiting, udang, ikan glodok, burung, bakteri'], ['Abiotik (tak hidup)', 'lumpur, air asin, cahaya, pasang surut, suhu']])}
        ${mKotak('tahukah', 'banyak ikan dan udang yang ditangkap nelayan menghabiskan masa kecilnya di sela akar mangrove.')}`],
      ['Adaptasi akar mangrove', `<p>Lumpur mangrove miskin oksigen dan air lautnya asin. Mangrove beradaptasi dengan bentuk akar khusus:</p>
        ${mTabel(['Jenis', 'Bentuk akar', 'Kelebihan', 'Zona cocok'], [['Api-api (<i>Avicennia</i>)', 'akar napas mencuat dari lumpur', 'tahan ombak & lumpur baru', 'depan, langsung terkena ombak'], ['Bakau (<i>Rhizophora</i>)', 'akar tunjang besar', 'meredam gelombang kuat', 'tengah–belakang, lebih tenang'], ['Pedada (<i>Sonneratia</i>)', 'akar napas berbentuk kerucut', 'tumbuh cepat', 'muara, air payau']])}`],
      ['Abrasi dan peredaman gelombang', `<p><b>Abrasi</b> adalah pengikisan pantai oleh gelombang laut. Akar mangrove yang rapat memecah energi gelombang dan menahan lumpur sehingga pantai tidak terkikis.</p>
        ${mRumus('tinggi gelombang di pantai ≈ tinggi awal × e<sup>−k × lebar sabuk</sup>', 'k makin besar bila pohon rapat, akarnya kuat, dan umurnya cukup')}
        ${mKotak('misi', 'menanam terlalu rapat membuat bibit berebut cahaya dan ruang sehingga banyak yang mati. Jumlah bibit yang <b>hidup</b> lebih penting daripada jumlah yang ditanam.')}`],
      ['Mangrove dan perubahan iklim', `<p>Mangrove menyerap CO₂ untuk fotosintesis dan menyimpan karbon di batang, akar, dan lumpurnya, bahkan lebih banyak daripada hutan daratan per hektar. Dengan begitu, mangrove ikut mengurangi gas rumah kaca. Mangrove juga melindungi pantai dari naiknya muka air laut dan rob.</p>
        ${mKotak('miskon', 'menanam bakau di zona depan yang langsung diterjang ombak sering gagal. Setiap jenis punya zona yang cocok.')}`],
      ['Pelestarian bersama warga', `<p>Penebangan mangrove untuk tambak dan kayu bakar membuat pantai rentan abrasi. Pelestarian dilakukan dengan menanam jenis yang tepat, melindungi bibit dari sampah dan hewan, serta melibatkan warga sebagai penjaga.</p>
        ${mKotak('coba', 'tuang air ke nampan berisi pasir: satu bagian ditancapi banyak tusuk sate, satu bagian kosong. Goyangkan nampan untuk membuat "ombak". Bagian mana yang pasirnya lebih bertahan?')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Ekosistem', 'interaksi makhluk hidup dan lingkungan'], ['Adaptasi akar', 'akar napas & akar tunjang untuk lumpur miskin oksigen'], ['Peredaman gelombang', 'makin lebar, rapat, dan tua sabuk, makin kecil gelombang'], ['Penyimpan karbon', 'mengurangi gas rumah kaca']],
    aman: 'penanaman harus didampingi guru dan warga; perhatikan jadwal pasang surut, pakai sepatu boot, dan jangan masuk ke air yang dalam.',
    uji: [['Mengapa api-api lebih cocok di zona depan daripada bakau?', 'Bandingkan bentuk akar dan ketahanannya terhadap ombak.'], ['Mengapa menanam bibit serapat mungkin belum tentu menahan abrasi paling baik?', 'Pikirkan bibit yang bertahan hidup.'], ['Bagaimana mangrove ikut mengurangi perubahan iklim?', 'Apa yang diserap mangrove saat fotosintesis?']]
  }),

  hidroponik: bukuMateri('hidroponik', {
    pembuka: 'Tumbuhan "memasak" makanannya sendiri di daun. Dalam hidroponik, kita menyiapkan semua bahan masaknya tanpa tanah: cahaya dari lampu, air bernutrisi, dan udara. Tetapi menambah satu bahan saja belum tentu membuat sawi tumbuh lebih cepat.',
    bagian: [
      ['Fotosintesis', `<p><b>Fotosintesis</b> adalah proses tumbuhan hijau membuat makanan (glukosa) dari karbon dioksida dan air dengan bantuan energi cahaya. Proses ini terjadi di <b>kloroplas</b> yang berisi zat hijau daun (<b>klorofil</b>).</p>
        ${mRumus('6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', 'karbon dioksida + air → (cahaya, klorofil) → glukosa + oksigen')}
        ${mTabel(['Bahan', 'Diambil dari'], [['karbon dioksida (CO₂)', 'udara, lewat stomata di daun'], ['air (H₂O)', 'larutan nutrisi, lewat akar'], ['energi cahaya', 'matahari atau lampu LED'], ['unsur hara (N, P, K, dll.)', 'larutan AB mix']])}`],
      ['Cahaya dan warna LED', `<p>Klorofil paling banyak menyerap cahaya <b>merah</b> dan <b>biru</b>, dan memantulkan cahaya <b>hijau</b>. Karena itu daun tampak hijau, dan lampu tanam sering berwarna ungu-merah muda (campuran merah dan biru).</p>
        ${mKotak('misi', 'lampu yang lebih terang dan lebih lama menyala mempercepat pertumbuhan, tetapi biaya listriknya naik. Cari kombinasi yang memenuhi target dengan biaya wajar.')}`],
      ['Faktor pembatas', `<p>Laju fotosintesis ditentukan oleh faktor yang <b>paling kurang</b>. Faktor itu disebut <b>faktor pembatas</b> (Blackman). Menambah cahaya tidak berguna bila CO₂-nya yang kurang, dan sebaliknya.</p>
        ${mGbr(SVG_PEMBATAS, 'Gambar 1. Laju fotosintesis naik bersama cahaya, lalu mendatar ketika faktor lain menjadi pembatas.')}
        ${mKotak('miskon', '"Makin terang pasti makin cepat tumbuh" tidak selalu benar. Setelah kurva mendatar, tambahan cahaya hanya membuang listrik.')}`],
      ['Suhu dan nutrisi', `<p>Fotosintesis dibantu <b>enzim</b>. Enzim bekerja lambat bila terlalu dingin dan rusak bila terlalu panas, sehingga ada <b>suhu optimum</b> (± 20–30 °C untuk sawi).</p>
        <p>Larutan <b>AB mix</b> menyediakan unsur hara. Bila terlalu encer, tanaman kerdil dan pucat. Bila terlalu pekat, air justru tertarik keluar dari akar (<b>osmosis</b>), sehingga daun layu atau ujungnya terbakar.</p>`],
      ['Hidroponik dan ketahanan pangan', `<p>Hidroponik memungkinkan sayur ditanam di lahan sempit, di atap, bahkan di dalam ruangan, dengan air lebih hemat karena larutan dipakai berulang. Cara ini penting bagi kota padat dan daerah yang tanahnya kurang subur.</p>
        ${mKotak('coba', 'tutup sebagian daun sebuah tanaman dengan kertas aluminium selama 3 hari. Bandingkan warnanya dengan daun yang terbuka.')}`]
    ],
    ringkas: [['Faktor', 'Pengaruh', 'Bila berlebihan'], ['Cahaya', 'energi fotosintesis', 'tidak menambah laju bila faktor lain pembatas; boros listrik'], ['CO₂', 'bahan fotosintesis', '—'], ['Suhu', 'kerja enzim', 'enzim rusak'], ['Nutrisi', 'unsur hara', 'akar kehilangan air (osmosis)']],
    aman: 'jauhkan sambungan listrik lampu dari air, dan pakai sarung tangan saat menakar larutan nutrisi pekat.',
    uji: [['Mengapa daun tampak hijau?', 'Warna apa yang dipantulkan klorofil?'], ['Lampu sudah diperterang, tetapi pertumbuhan sawi tidak bertambah. Apa kemungkinan penyebabnya?', 'Ingat faktor pembatas.'], ['Mengapa larutan nutrisi yang terlalu pekat membuat daun layu?', 'Ke mana air bergerak ketika di luar akar lebih pekat?']]
  })
}, {
  penjernih: ['campuran', 'heterogen', 'homogen', 'filtrasi', 'adsorpsi', 'sedimentasi', 'ukuran partikel', 'celah', 'kuman', 'rebus'],
  pendingin: ['suhu', 'kalor', 'konduksi', 'konveksi', 'radiasi', 'isolator', 'konduktor', 'kalor lebur', 'rongga udara'],
  pengering: ['radiasi', 'penguapan', 'kelembapan', 'konveksi', 'ventilasi', 'efek rumah kaca', 'warna gelap'],
  garam: ['larutan', 'pelarut', 'zat terlarut', 'jenuh', 'penguapan', 'kristalisasi', 'kadar', 'kristal'],
  kompos: ['dekomposer', 'ekosistem', 'karbon', 'nitrogen', 'c/n', 'aerob', 'anaerob', 'oksigen', 'mikroba'],
  sejuk: ['konveksi', 'radiasi', 'insulasi', 'ventilasi', 'plafon', 'penguapan', 'keringat', 'co2'],
  mangrove: ['ekosistem', 'abrasi', 'adaptasi', 'akar napas', 'akar tunjang', 'gelombang', 'karbon', 'biotik', 'abiotik'],
  hidroponik: ['fotosintesis', 'klorofil', 'faktor pembatas', 'cahaya', 'enzim', 'osmosis', 'nutrisi', 'stomata']
});
