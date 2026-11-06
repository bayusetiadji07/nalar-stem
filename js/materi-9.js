/* Materi Gali Konsep ala buku — misi kelas 8 (bagian 2) dan kelas 9. Memakai cetakan di js/materi.js. */

const SVG_SENAR = `<svg viewBox="0 0 600 170" class="svg-materi" role="img" aria-label="Gelombang berdiri pada senar">
  <style>.sn-s{font:600 12.5px var(--font,system-ui);fill:#5b6576}.sn-t{font:700 13px var(--font,system-ui)}</style>
  <rect x="40" y="70" width="14" height="40" fill="#475569"/><rect x="546" y="70" width="14" height="40" fill="#475569"/>
  <path d="M54 90 Q300 10 546 90 Q300 170 54 90" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/>
  <circle cx="54" cy="90" r="6" fill="#dc2626"/><circle cx="546" cy="90" r="6" fill="#dc2626"/>
  <text class="sn-t" x="30" y="140" style="fill:#dc2626">simpul</text><text class="sn-t" x="520" y="140" style="fill:#dc2626">simpul</text>
  <text class="sn-t" x="280" y="28" style="fill:#7c3aed">perut</text><path d="M300 34 V50" stroke="#7c3aed" stroke-width="2"/>
  <path d="M54 160 H546" stroke="#334155"/><text class="sn-s" x="300" y="156" text-anchor="middle">panjang senar L = ½ λ (nada dasar)</text>
</svg>`;

const SVG_RANGKAIAN = `<svg viewBox="0 0 640 220" class="svg-materi" role="img" aria-label="Rangkaian seri dan paralel">
  <style>.rk-t{font:800 14px var(--font,system-ui);fill:#0f172a}.rk-s{font:500 12px var(--font,system-ui);fill:#5b6576}</style>
  <g fill="none" stroke="#334155" stroke-width="2.5">
    <rect x="30" y="40" width="250" height="130"/><rect x="360" y="40" width="250" height="130"/>
    <path d="M470 40 V170 M540 40 V170"/>
  </g>
  ${[[95, 40], [185, 40], [470, 105], [540, 105]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/><path d="M${x - 8} ${y - 8} L${x + 8} ${y + 8} M${x + 8} ${y - 8} L${x - 8} ${y + 8}" stroke="#ca8a04" stroke-width="2"/>`).join('')}
  ${[[155, 170], [400, 170]].map(([x, y]) => `<rect x="${x - 20}" y="${y - 8}" width="40" height="16" fill="#fff"/><path d="M${x - 8} ${y - 14} V${y + 14} M${x + 4} ${y - 8} V${y + 8}" stroke="#334155" stroke-width="3"/>`).join('')}
  <text class="rk-t" x="155" y="25" text-anchor="middle">Seri</text><text class="rk-t" x="485" y="25" text-anchor="middle">Paralel</text>
  <text class="rk-s" x="155" y="205" text-anchor="middle">satu jalur: satu lampu putus → semua padam</text>
  <text class="rk-s" x="485" y="205" text-anchor="middle">bercabang: satu putus → lainnya tetap menyala</text>
</svg>`;

const SVG_MEDAN = `<svg viewBox="0 0 560 200" class="svg-materi" role="img" aria-label="Garis gaya magnet di sekitar magnet batang">
  <style>.md-t{font:800 16px var(--font,system-ui);fill:#fff}</style>
  ${[30, 55, 80].map(d => `<path d="M200 100 C200 ${100 - d * 1.2} 360 ${100 - d * 1.2} 360 100" fill="none" stroke="#94a3b8" stroke-width="1.8"/><path d="M200 100 C200 ${100 + d * 1.2} 360 ${100 + d * 1.2} 360 100" fill="none" stroke="#94a3b8" stroke-width="1.8"/>`).join('')}
  <rect x="200" y="80" width="80" height="40" fill="#dc2626"/><rect x="280" y="80" width="80" height="40" fill="#2563eb"/>
  <text class="md-t" x="240" y="106" text-anchor="middle">U</text><text class="md-t" x="320" y="106" text-anchor="middle">S</text>
  <path d="M150 100 H195 M365 100 H410" stroke="#94a3b8" stroke-width="1.8"/>
</svg>`;

const SVG_RUMAHKACA = `<svg viewBox="0 0 620 240" class="svg-materi" role="img" aria-label="Efek rumah kaca">
  <style>.rk2-s{font:600 12.5px var(--font,system-ui)}</style>
  <defs><marker id="rkK" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#f59e0b"/></marker><marker id="rkM" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#dc2626"/></marker></defs>
  <rect x="0" y="190" width="620" height="50" fill="#86efac"/><path d="M0 70 H620" stroke="#93c5fd" stroke-width="22" opacity=".45"/>
  <circle cx="60" cy="40" r="26" fill="#facc15"/>
  <path d="M85 50 L250 188" stroke="#f59e0b" stroke-width="3" marker-end="url(#rkK)"/><text class="rk2-s" x="120" y="150" style="fill:#b45309">cahaya matahari masuk</text>
  <path d="M300 188 L380 80" stroke="#dc2626" stroke-width="3" marker-end="url(#rkM)"/><path d="M385 75 L440 170" stroke="#dc2626" stroke-width="3" stroke-dasharray="6 4" marker-end="url(#rkM)"/>
  <path d="M470 188 L540 30" stroke="#dc2626" stroke-width="2" opacity=".5" marker-end="url(#rkM)"/>
  <text class="rk2-s" x="612" y="50" text-anchor="end" style="fill:#1d4ed8">lapisan gas rumah kaca (CO₂, metana, uap air)</text>
  <text class="rk2-s" x="310" y="218" text-anchor="middle" style="fill:#166534">permukaan Bumi memancarkan inframerah;</text><text class="rk2-s" x="310" y="234" text-anchor="middle" style="fill:#166534">sebagian ditahan gas rumah kaca dan kembali ke Bumi</text>
</svg>`;

pasangMateri({
  bunyi: bukuMateri('bunyi', {
    pembuka: 'Petik sebuah senar, lalu sentuh senarnya: kamu akan merasakan getaran. Semua bunyi, dari suara ombak sampai alunan sasando, berawal dari <b>benda yang bergetar</b>.',
    bagian: [
      ['Getaran', `<p><b>Getaran</b> adalah gerak bolak-balik melalui titik setimbang. <b>Amplitudo</b> adalah simpangan terjauh, <b>periode (T)</b> adalah waktu untuk satu getaran, dan <b>frekuensi (f)</b> adalah banyaknya getaran tiap detik.</p>
        ${mRumus('f = 1 ÷ T', 'frekuensi dalam hertz (Hz), periode dalam sekon (s)')}`],
      ['Gelombang dan bunyi', `<p><b>Gelombang</b> adalah getaran yang merambat. Bunyi adalah <b>gelombang longitudinal</b> (arah getar searah rambatan) yang membutuhkan <b>medium</b>, misalnya udara, air, atau zat padat. Di ruang hampa, bunyi tidak dapat merambat.</p>
        ${mRumus('v = λ × f', 'v = cepat rambat (± 340 m/s di udara), λ = panjang gelombang')}
        ${mTabel(['Besaran', 'Menentukan', 'Contoh'], [['Frekuensi', '<b>tinggi rendah nada</b>', 'nada A = 440 Hz'], ['Amplitudo', '<b>kuat lemah (kenyaringan)</b> bunyi', 'dipetik keras → lebih nyaring'], ['Bentuk gelombang', 'warna bunyi (timbre)', 'gitar dan biola berbeda walau nadanya sama']])}
        ${mKotak('miskon', 'memetik lebih keras tidak membuat nada lebih tinggi; yang berubah adalah kenyaringannya.')}`],
      ['Hukum Mersenne pada senar', `<p>Senar yang dipetik membentuk <b>gelombang berdiri</b>: ujungnya diam (<b>simpul</b>) dan tengahnya bergetar paling besar (<b>perut</b>).</p>
        ${mGbr(SVG_SENAR, 'Gambar 1. Nada dasar senar: panjang senar sama dengan setengah panjang gelombang.')}
        ${mRumus('f = (1 ÷ 2L) × √(T ÷ μ)', 'L = panjang senar, T = tegangan, μ = massa per meter senar')}
        ${mTabel(['Agar nada lebih tinggi', 'Caranya'], [['senar lebih pendek', 'geser penahan/tekan senar'], ['senar lebih tegang', 'tambah beban botol / putar penyetem'], ['senar lebih ringan/tipis', 'ganti senar yang lebih kecil']])}
        ${mKotak('misi', 'senar yang terlalu tegang bisa putus. Cari kombinasi panjang dan tegangan yang menghasilkan 440 Hz dengan aman.')}`],
      ['Resonansi', `<p><b>Resonansi</b> adalah ikut bergetarnya suatu benda karena getaran benda lain yang frekuensinya sesuai. Kotak sasando (dulu dari daun lontar) ikut bergetar bersama senar sehingga bunyinya lebih nyaring, tetapi <b>tidak mengubah tinggi nada</b>.</p>
        ${mKotak('tahukah', 'sasando berasal dari Pulau Rote, NTT, dan resonatornya dibuat dari daun lontar yang dilengkungkan.')}`],
      ['Bunyi dalam kehidupan', `<p>Manusia mendengar bunyi berfrekuensi ± 20–20.000 Hz (<b>audiosonik</b>). Di bawahnya disebut <b>infrasonik</b> (didengar gajah), di atasnya <b>ultrasonik</b> (dipakai kelelawar, USG, dan sonar kapal nelayan untuk mencari ikan).</p>
        ${mKotak('coba', 'rentangkan karet gelang di atas kotak terbuka, lalu petik sambil mengubah tegangannya. Dengarkan perubahan nadanya.')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Frekuensi', 'menentukan tinggi nada'], ['Amplitudo', 'menentukan kenyaringan'], ['Mersenne', 'pendek, tegang, ringan → nada tinggi'], ['Resonansi', 'menambah nyaring, tidak mengubah nada']],
    aman: 'senar yang sangat tegang bisa putus dan terlempar; jauhkan wajah dan jangan membunyikan terlalu keras di dekat telinga.',
    uji: [['Bagaimana cara menaikkan nada senar tanpa mengganti senarnya?', 'Lihat rumus Mersenne: besaran mana yang bisa diubah?'], ['Mengapa sasando memakai kotak atau daun lontar sebagai resonator?', 'Apa yang dilakukan resonator terhadap kenyaringan dan nada?'], ['Mengapa astronaut di luar angkasa tidak bisa saling mendengar tanpa radio?', 'Apa yang dibutuhkan bunyi untuk merambat?']]
  }),

  gempa: bukuMateri('gempa', {
    pembuka: 'Gempa bumi tidak bisa dicegah, tetapi korban jiwanya sebagian besar disebabkan bangunan yang runtuh. Memahami getaran membantu kita membangun rumah yang <b>bergoyang tanpa roboh</b>.',
    bagian: [
      ['Struktur Bumi dan lempeng tektonik', `<p>Bumi tersusun atas <b>kerak</b>, <b>mantel</b>, dan <b>inti</b>. Kerak bumi terpecah menjadi <b>lempeng-lempeng tektonik</b> yang terus bergerak beberapa sentimeter per tahun. Indonesia berada di pertemuan tiga lempeng besar: Indo-Australia, Eurasia, dan Pasifik.</p>
        ${mTabel(['Lapisan', 'Ciri'], [['Kerak', 'padat, tipis (5–70 km), tempat kita hidup'], ['Mantel', 'batuan panas yang dapat mengalir sangat lambat'], ['Inti', 'besi dan nikel, sangat panas']])}`],
      ['Gempa dan gelombang seismik', `<p>Gempa terjadi ketika energi yang tersimpan di batuan dilepaskan tiba-tiba, misalnya saat lempeng bergeser. Energi merambat sebagai <b>gelombang seismik</b>. Titik asal gempa di dalam bumi disebut <b>hiposentrum</b>; titik di permukaan tepat di atasnya disebut <b>episentrum</b>. Kekuatan gempa diukur dengan <b>seismograf</b> dan dinyatakan dalam magnitudo.</p>
        ${mKotak('tahukah', 'BMKG dapat mengirim peringatan gempa ke HP dalam hitungan menit setelah gempa terjadi.')}`],
      ['Getaran bangunan dan frekuensi alami', `<p>Setiap bangunan punya <b>frekuensi alami</b>, yaitu berapa kali ia berayun tiap detik bila didorong lalu dilepas.</p>
        ${mRumus('f = (1 ÷ 2π) × √(k ÷ m)', 'k = kekakuan bangunan, m = massa bangunan')}
        <p>Bangunan kaku dan ringan berayun cepat (frekuensi tinggi); bangunan lentur dan berat berayun lambat.</p>`],
      ['Resonansi: musuh bangunan', `<p>Bila frekuensi alami bangunan mendekati frekuensi guncangan tanah, ayunannya diperkuat berkali-kali lipat. Peristiwa ini disebut <b>resonansi</b>, seperti ayunan yang didorong tepat pada iramanya.</p>
        ${mKotak('miskon', 'membuat rumah "sedikit lebih kaku" belum tentu lebih aman. Bila frekuensi alaminya justru mendekati frekuensi gempa, goyangannya malah membesar.')}
        ${mKotak('misi', 'meja getar bergetar 3 Hz. Hindari rancangan yang frekuensi alaminya dekat 3 Hz.')}`],
      ['Prinsip rumah tahan gempa', `${mTabel(['Prinsip', 'Alasan'], [['Pengaku silang / dinding geser', 'menambah kekakuan dan kekuatan menahan dorongan samping'], ['Sambungan kuat', 'gaya tersalur tanpa bagian terlepas'], ['Atap ringan', 'gaya gempa sebanding massa (F = m × a)'], ['Isolasi dasar (bantalan lentur)', 'meredam guncangan sebelum masuk ke bangunan']])}
        ${mKotak('coba', 'buat menara dari sedotan dan selotip, letakkan di nampan, lalu goyangkan perlahan dan cepat. Kapan menara bergoyang paling besar?')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Lempeng tektonik', 'pergeseran lempeng melepaskan energi gempa'], ['Frekuensi alami', 'f = (1/2π)√(k/m)'], ['Resonansi', 'frekuensi bangunan ≈ frekuensi gempa → goyangan membesar'], ['Tahan gempa', 'pengaku, sambungan kuat, atap ringan, isolasi dasar']],
    aman: 'gunakan cutter dengan pengawasan guru; saat gempa sungguhan: merunduk, berlindung di bawah meja kokoh, dan berpegangan.',
    uji: [['Mengapa Indonesia sering mengalami gempa?', 'Lihat letak Indonesia terhadap lempeng tektonik.'], ['Mengapa atap genteng berat lebih berbahaya saat gempa daripada atap seng ringan?', 'Gunakan F = m × a.'], ['Apa itu resonansi dan mengapa berbahaya bagi bangunan?', 'Bayangkan ayunan yang didorong tepat pada iramanya.']]
  }),

  boraks: bukuMateri('boraks', {
    pembuka: 'Bakso yang sangat kenyal dan kerupuk yang terlalu renyah kadang membuat curiga. Ilmu kimia memberi kita cara sederhana untuk <b>memeriksa sebelum menuduh</b>.',
    bagian: [
      ['Zat aditif pada makanan', `<p><b>Zat aditif</b> adalah bahan yang sengaja ditambahkan ke makanan untuk memperbaiki warna, rasa, aroma, tekstur, atau daya simpan.</p>
        ${mTabel(['Jenis', 'Contoh yang diizinkan', 'Contoh yang dilarang'], [['Pengawet', 'natrium benzoat (batas tertentu), garam, gula', '<b>boraks</b>, formalin'], ['Pewarna', 'kunyit, daun suji, karamel', 'rhodamin B, metanil yellow (pewarna tekstil)'], ['Pemanis', 'gula, stevia', 'siklamat berlebihan'], ['Penyedap', 'MSG (secukupnya), kaldu', '—']])}
        ${mKotak('miskon', 'zat aditif alami tidak otomatis aman dalam jumlah berapa pun, dan zat aditif buatan tidak otomatis berbahaya bila dipakai sesuai aturan.')}`],
      ['Bahaya boraks', `<p><b>Boraks</b> (natrium tetraborat) adalah bahan untuk solder, pembersih, dan industri. Boraks <b>dilarang</b> untuk makanan karena bila tertelan terus-menerus dapat merusak hati, ginjal, dan otak.</p>
        ${mKotak('tahukah', 'BPOM rutin menguji jajanan di sekolah. Masyarakat bisa melapor lewat layanan pengaduan BPOM bila menemukan makanan mencurigakan.')}`],
      ['Asam, basa, dan indikator', `<p>Larutan dapat bersifat <b>asam</b> (cuka, jeruk), <b>basa</b> (air sabun, air kapur, soda kue), atau <b>netral</b> (air murni). <b>Indikator</b> adalah zat yang berubah warna sesuai sifat larutan.</p>
        ${mTabel(['Indikator alami', 'Di asam', 'Di basa'], [['Kunyit', 'kuning', 'cokelat kemerahan'], ['Kubis ungu', 'merah', 'hijau–kuning'], ['Bunga sepatu', 'merah', 'hijau']])}`],
      ['Uji boraks dengan kertas kunyit', `<p>Kunyit mengandung zat warna <b>kurkumin</b>. Kurkumin bereaksi dengan asam borat membentuk senyawa <b>merah bata</b> (rosocyanin), terutama saat kertas <b>mengering</b> dan sampel diberi sedikit <b>asam</b>.</p>
        ${mRumus('kunyit + boraks (diasamkan, dikeringkan) → merah bata', 'kunyit + basa → cokelat kemerahan (positif palsu)')}
        ${mKotak('misi', 'kurkumin juga berubah warna di larutan basa. Tanpa diasamkan, makanan basa yang aman bisa tampak "positif". Kriteria misimu menuntut <b>tanpa positif palsu</b>.')}`],
      ['Sikap ilmiah dan etika', `<p>Hasil uji kertas kunyit hanyalah <b>indikasi awal</b>. Ilmuwan selalu membandingkan dengan <b>kontrol</b> (sampel yang pasti tanpa boraks dan sampel yang pasti berboraks), lalu melaporkan kepada pihak berwenang, bukan menuduh pedagang tertentu.</p>
        ${mKotak('coba', 'teteskan air kunyit ke air sabun dan ke air cuka. Catat perubahan warnanya.')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Zat aditif', 'ada yang diizinkan, ada yang dilarang (boraks, formalin, rhodamin B)'], ['Indikator', 'berubah warna sesuai asam/basa'], ['Uji kunyit', 'boraks + kurkumin (asam, kering) → merah bata'], ['Positif palsu', 'basa juga membuat kunyit kemerahan; perlu diasamkan & kontrol']],
    aman: 'jangan mencicipi sampel, cuci tangan, jauhkan alkohol dari api, dan laporkan hasil kepada guru, bukan menuduh pedagang.',
    uji: [['Mengapa sampel perlu diberi sedikit asam sebelum diuji dengan kertas kunyit?', 'Ingat warna kunyit di larutan basa.'], ['Apa fungsi sampel kontrol dalam uji boraks?', 'Bagaimana kita tahu warna "positif" dan "negatif" yang sebenarnya?'], ['Sebutkan dua zat aditif berbahaya yang dilarang untuk makanan.', 'Lihat tabel zat aditif.']]
  }),

  tetes: bukuMateri('tetes', {
    pembuka: 'Infus di rumah sakit menetes pelan dan teratur tanpa pompa listrik. Rahasianya sederhana: <b>air yang lebih tinggi menekan lebih kuat</b>.',
    bagian: [
      ['Tekanan zat cair', `<p>Zat cair menekan ke <b>segala arah</b>, ke dinding maupun ke dasar wadah. Tekanan karena berat zat cair disebut <b>tekanan hidrostatis</b>.</p>
        ${mRumus('p = ρ × g × h', 'ρ = massa jenis zat cair, g ≈ 10 m/s², h = kedalaman/tinggi kolom air')}
        ${mTabel(['Tinggi kolom air (h)', 'Tekanan hidrostatis air'], [['0,5 m', '± 5.000 Pa'], ['1 m', '± 10.000 Pa'], ['2 m', '± 20.000 Pa']], true)}
        ${mKotak('miskon', 'tekanan hidrostatis tidak bergantung pada bentuk atau lebar wadah, hanya pada tinggi kolom air dan jenis zat cairnya.')}`],
      ['Kecepatan air keluar lubang', `<p>Air yang keluar dari lubang di bawah permukaan memancar makin cepat bila kolom air di atasnya makin tinggi.</p>
        ${mRumus('v = √(2 × g × h)', 'Hukum Torricelli')}
        <p>Banyaknya air yang mengalir tiap detik disebut <b>debit</b>. Debit bertambah bila air keluar lebih cepat atau lubangnya lebih besar.</p>
        ${mKotak('misi', 'debit besar membuat tanaman cukup air, tetapi wadah cepat kosong. Kriteria "air bertahan 5 hari" dan "tidak boros" saling tarik.')}`],
      ['Bejana berhubungan dan gesekan', `<p>Pada <b>bejana berhubungan</b>, permukaan zat cair yang sejenis selalu mendatar. Prinsip ini dipakai pada menara air dan teko. Sepanjang selang, sebagian tekanan hilang karena <b>gesekan</b>, sehingga tanaman di ujung selang yang panjang mendapat air lebih sedikit. Selang bercabang memperpendek jalur dan membuat tetesan lebih merata.</p>
        ${mKotak('tahukah', 'menara air di desa dibangun tinggi agar tekanan airnya cukup untuk mengalir ke rumah-rumah tanpa pompa.')}`],
      ['Air, tanah, dan tanaman', `<p>Tanaman mengambil air lewat akar dan melepaskannya lewat daun (<b>transpirasi</b>). Air di permukaan tanah juga menguap. <b>Mulsa</b> (jerami, daun kering) menutup tanah sehingga penguapan berkurang dan kebutuhan siram menurun.</p>
        ${mKotak('coba', 'lubangi botol plastik di tiga ketinggian, isi air, dan amati pancaran mana yang paling jauh.')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Tekanan hidrostatis', 'p = ρ g h: makin tinggi kolom air, makin besar tekanan'], ['Torricelli', 'v = √(2gh): wadah lebih tinggi → tetes lebih cepat'], ['Gesekan selang', 'selang panjang → ujung kekurangan tekanan'], ['Mulsa', 'mengurangi penguapan air tanah']],
    aman: 'wadah berisi air berat; pasang penyangga kokoh dan jangan letakkan wadah tinggi di jalur lalu-lalang.',
    uji: [['Mengapa menaikkan wadah membuat air menetes lebih cepat?', 'Gunakan p = ρ g h.'], ['Tanaman paling ujung selalu kekurangan air. Apa yang bisa diubah?', 'Pikirkan jalur selang dan gesekan.'], ['Apa fungsi mulsa jerami pada tanaman cabai?', 'Hubungkan dengan penguapan.']]
  }),

  listrik: bukuMateri('listrik', {
    pembuka: 'Saat listrik padam, sebuah lampu kecil dari baterai bisa menentukan apakah seorang anak tetap bisa belajar. Merancangnya butuh pemahaman tentang <b>arus, tegangan, dan hambatan</b>.',
    bagian: [
      ['Muatan, arus, tegangan, hambatan', `${mTabel(['Besaran', 'Arti', 'Satuan', 'Alat ukur'], [['Arus (I)', 'aliran muatan listrik tiap detik', 'ampere (A), mA', 'amperemeter (dipasang seri)'], ['Tegangan (V)', '"dorongan" yang membuat muatan mengalir', 'volt (V)', 'voltmeter (dipasang paralel)'], ['Hambatan (R)', 'penghambat arus', 'ohm (Ω)', 'ohmmeter']])}
        <p>Arus hanya mengalir pada <b>rangkaian tertutup</b>. Bila ada bagian yang terputus, arus berhenti.</p>`],
      ['Hukum Ohm dan daya', `${mRumus('V = I × R', 'P = V × I (daya, watt)')}
        <p>Bila tegangan tetap, hambatan yang lebih besar membuat arus lebih kecil. Inilah fungsi <b>resistor pembatas</b>: menjaga arus LED tidak melebihi batasnya (± 30 mA) agar tidak putus.</p>
        ${mKotak('miskon', 'baterai tidak "menyimpan arus". Baterai menyimpan energi kimia dan memberi tegangan; besar arus ditentukan oleh hambatan rangkaian.')}`],
      ['Rangkaian seri dan paralel', `${mGbr(SVG_RANGKAIAN, 'Gambar 1. Lampu dirangkai seri dan paralel dengan sumber baterai.')}
        ${mTabel(['', 'Seri', 'Paralel'], [['Jalur', 'satu jalur', 'bercabang'], ['Arus', 'sama di semua komponen', 'terbagi ke tiap cabang'], ['Tegangan', 'terbagi', 'sama di tiap cabang'], ['Satu lampu putus', '<b>semua padam</b>', 'lampu lain <b>tetap menyala</b>']])}
        ${mKotak('misi', 'kriteria "lampu lain tetap menyala bila satu dicabut" hanya bisa dipenuhi rangkaian paralel.')}
        ${mKotak('tahukah', 'instalasi listrik di rumahmu dipasang paralel, sehingga mematikan lampu kamar tidak mematikan kulkas.')}`],
      ['Baterai dan lama nyala', `<p>Baterai yang disusun seri menjumlahkan tegangannya (4 × 1,5 V = 6 V). Kapasitas baterai dinyatakan dalam mAh.</p>
        ${mRumus('lama nyala ≈ kapasitas ÷ arus', 'baterai AA ± 2.000 mAh dengan arus 100 mA → ± 20 jam')}
        <p>LED jauh lebih hemat energi daripada bohlam pijar: untuk terang yang sama, LED butuh daya jauh lebih kecil karena sedikit energi yang terbuang menjadi panas.</p>`],
      ['Hemat dan aman listrik', `<p>Hemat listrik berarti hemat biaya dan mengurangi pembakaran bahan bakar di pembangkit. Matikan peralatan yang tidak dipakai dan pilih lampu LED.</p>
        ${mKotak('coba', 'rangkai dua lampu senter seri lalu paralel dengan baterai yang sama. Bandingkan nyala lampunya, lalu cabut satu lampu.')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Hukum Ohm', 'V = I × R'], ['Daya', 'P = V × I'], ['Seri', 'satu jalur; satu putus semua padam'], ['Paralel', 'bercabang; tegangan sama, satu putus lainnya menyala'], ['Lama nyala', 'kapasitas ÷ arus']],
    aman: 'jangan menghubungkan kutub + dan − baterai langsung dengan kabel, dan jangan bereksperimen dengan listrik PLN/stopkontak.',
    uji: [['LED putus saat dipasang langsung ke 6 V. Apa yang seharusnya ditambahkan? Mengapa?', 'Bagaimana cara membatasi arus?'], ['Mengapa lampu rumah dipasang paralel?', 'Apa yang terjadi bila satu lampu putus?'], ['Baterai 2.000 mAh dipakai lampu dengan arus 250 mA. Kira-kira berapa jam lampu menyala?', 'Lama nyala ≈ kapasitas ÷ arus.']]
  }),

  magnet: bukuMateri('magnet', {
    pembuka: 'Magnet biasa selalu menempel. Bagaimana sebuah derek bisa mengangkat besi lalu melepasnya hanya dengan satu tombol? Jawabannya ada pada hubungan antara <b>listrik dan magnet</b>.',
    bagian: [
      ['Sifat magnet', `<p>Magnet punya dua kutub, <b>utara (U)</b> dan <b>selatan (S)</b>. Kutub sejenis <b>tolak-menolak</b>, kutub berbeda <b>tarik-menarik</b>. Di sekitar magnet ada <b>medan magnet</b>, digambarkan dengan garis gaya dari kutub U ke kutub S.</p>
        ${mGbr(SVG_MEDAN, 'Gambar 1. Garis gaya magnet di sekitar magnet batang.')}`],
      ['Bahan magnetik dan nonmagnetik', `${mTabel(['Golongan', 'Contoh', 'Sifat'], [['Bahan magnetik (feromagnetik)', 'besi, baja, nikel, kobalt', 'ditarik kuat oleh magnet'], ['Bahan nonmagnetik', '<b>aluminium</b>, tembaga, plastik, kayu', 'tidak ditarik magnet']])}
        ${mKotak('miskon', '"semua logam ditarik magnet" keliru. Kaleng minuman aluminium tidak ditarik magnet, sehingga magnet bisa memisahkannya dari kaleng besi.')}`],
      ['Elektromagnet', `<p>Tahun 1820, <b>Oersted</b> menemukan bahwa kawat berarus listrik menimbulkan medan magnet. Bila kawat dililitkan menjadi <b>kumparan</b>, medannya menguat. Magnet yang dibuat dengan arus listrik disebut <b>elektromagnet</b>; ia hanya bersifat magnet ketika arus mengalir.</p>
        ${mRumus('kekuatan elektromagnet ↑ bila: lilitan ↑ · arus ↑ · ada inti besi')}`],
      ['Besi lunak dan baja', `<p><b>Besi lunak</b> mudah dijadikan magnet dan mudah kehilangan kemagnetannya, cocok untuk elektromagnet yang harus bisa <b>melepas</b> benda. <b>Baja</b> sulit kehilangan kemagnetan (menjadi magnet tetap), sehingga benda bisa tetap menempel walau arus dimatikan.</p>
        ${mKotak('misi', 'kriteria "paku terlepas saat saklar dimatikan" menuntut inti yang tepat. Arus besar membuat elektromagnet kuat, tetapi kawat panas (P = I² × R) dan baterai cepat habis.')}`],
      ['Penerapan elektromagnet', `<p>Elektromagnet dipakai pada bel listrik, relai, motor listrik, pengeras suara (speaker), kereta maglev, dan derek pengangkat besi tua di tempat daur ulang.</p>
        ${mKotak('coba', 'lilitkan kabel berisolasi pada paku besi, hubungkan ke baterai sebentar, lalu dekatkan ke klip kertas. Bandingkan bila lilitannya ditambah.')}
        ${mKotak('tahukah', 'Bumi juga merupakan magnet raksasa; itulah sebabnya jarum kompas selalu menunjuk arah utara–selatan.')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Kutub magnet', 'sejenis tolak, berbeda tarik'], ['Bahan magnetik', 'besi, baja, nikel, kobalt; aluminium tidak'], ['Elektromagnet', 'kuat bila lilitan, arus, dan inti besi bertambah'], ['Besi lunak vs baja', 'besi lunak mudah melepas, baja menjadi magnet tetap']],
    aman: 'nyalakan elektromagnet sebentar saja karena kawat bisa panas, dan jauhkan magnet dari HP, kartu ATM, serta alat pacu jantung.',
    uji: [['Mengapa magnet bisa memisahkan kaleng besi dari kaleng aluminium?', 'Golongkan kedua bahan itu.'], ['Sebutkan tiga cara memperkuat elektromagnet.', 'Lihat bagian elektromagnet.'], ['Mengapa inti derek elektromagnet dibuat dari besi lunak, bukan baja?', 'Apa yang terjadi saat arus dimatikan?']]
  }),

  tempe: bukuMateri('tempe', {
    pembuka: 'Tempe adalah warisan bioteknologi asli Indonesia. Pembuatnya bukan hanya pengrajin, tetapi juga jutaan <b>kapang</b> mikroskopis yang bekerja semalaman mengikat butir kedelai.',
    bagian: [
      ['Bioteknologi', `<p><b>Bioteknologi</b> adalah pemanfaatan makhluk hidup atau bagiannya untuk menghasilkan barang dan jasa.</p>
        ${mTabel(['Jenis', 'Ciri', 'Contoh'], [['Konvensional', 'memakai mikroorganisme secara langsung, teknik sederhana', 'tempe, tapai, yoghurt, kecap, terasi'], ['Modern', 'rekayasa genetika, kultur jaringan', 'insulin buatan, tanaman tahan hama']])}`],
      ['Kapang Rhizopus', `<p>Tempe dibuat dengan kapang (jamur) <i>Rhizopus</i>. Spora kapang (ragi tempe) yang ditaburkan pada kedelai tumbuh menjadi benang-benang putih (<b>hifa</b>), yang berkumpul membentuk <b>miselium</b> dan mengikat kedelai menjadi padat. Kapang juga memecah protein dan lemak kedelai menjadi bentuk yang lebih mudah dicerna.</p>
        ${mKotak('tahukah', 'tempe mengandung vitamin B12 yang dihasilkan bakteri yang ikut tumbuh, sesuatu yang jarang ada pada makanan nabati.')}`],
      ['Syarat tumbuh kapang', `${mTabel(['Faktor', 'Kondisi terbaik', 'Bila tidak sesuai'], [['Suhu', '± 30–35 °C', 'terlalu dingin: lambat; terlalu panas: kapang mati'], ['Oksigen', 'bungkus berlubang / daun pisang', 'pengap: bakteri tumbuh, berlendir'], ['Kelembapan', 'kedelai lembap, tidak basah', 'terlalu basah: berlendir dan asam'], ['Ragi', 'cukup dan merata', 'terlalu sedikit: tidak menyatu'], ['Kebersihan', 'alat dan tangan bersih', 'kontaminasi bakteri']])}
        ${mKotak('misi', 'kapang menghasilkan panas sendiri, sehingga bagian tengah tempe yang tebal dan bungkusnya rapat bisa terlalu panas.')}`],
      ['Tempe gagal: membaca tanda-tandanya', `${mTabel(['Tanda', 'Kemungkinan penyebab'], [['Kedelai tidak menyatu', 'ragi kurang, suhu terlalu dingin, waktu kurang'], ['Berlendir dan bau asam', 'kedelai terlalu basah, alat kotor, bungkus pengap'], ['Bintik hitam dan bau amonia', 'fermentasi terlalu lama: kapang membentuk spora dan protein terurai']])}
        ${mKotak('miskon', 'bintik hitam pada tempe yang kelewatan bukan kotoran, melainkan spora kapang. Tempe seperti ini sudah terlalu matang.')}`],
      ['Fermentasi lain di sekitar kita', `<p>Tapai (ragi <i>Saccharomyces</i>), yoghurt (bakteri <i>Lactobacillus</i>), kecap (kapang <i>Aspergillus</i>), dan terasi semuanya dibuat lewat fermentasi oleh mikroorganisme yang berbeda.</p>
        ${mKotak('coba', 'bungkus dua kepal kedelai beragi: satu di plastik berlubang, satu di plastik tanpa lubang. Bandingkan hasilnya setelah 36 jam.')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Bioteknologi konvensional', 'memanfaatkan mikroorganisme secara langsung'], ['Rhizopus', 'hifa/miselium mengikat kedelai'], ['Syarat', 'hangat 30–35 °C, ada oksigen, bersih, ragi cukup'], ['Tanda gagal', 'berlendir (bakteri), hitam & amonia (kelewatan)']],
    aman: 'merebus kedelai harus didampingi orang dewasa; cuci tangan dan alat, dan jangan makan tempe yang berlendir atau berbau busuk.',
    uji: [['Mengapa bungkus plastik tempe harus dilubangi?', 'Apa yang dibutuhkan kapang selain makanan?'], ['Tempe Pak Darmo berlendir dan asam. Sebutkan dua kemungkinan penyebabnya.', 'Lihat tabel tanda tempe gagal.'], ['Apa beda bioteknologi konvensional dan modern? Beri satu contoh masing-masing.', 'Lihat tabel di bagian A.']]
  }),

  iklim: bukuMateri('iklim', {
    pembuka: 'Gas karbon dioksida tidak berwarna dan tidak berbau, jumlahnya pun hanya sekitar 0,04% udara. Bagaimana gas sesedikit itu bisa mengubah iklim seluruh Bumi? Kita akan membuktikannya dengan dua botol dan sebuah lampu.',
    bagian: [
      ['Cuaca dan iklim', `<p><b>Cuaca</b> adalah keadaan udara dalam waktu singkat di tempat sempit (hari ini hujan). <b>Iklim</b> adalah rata-rata cuaca dalam waktu panjang (puluhan tahun) di wilayah luas (musim kemarau dan penghujan di Jawa Timur).</p>`],
      ['Efek rumah kaca', `<p>Sinar matahari menembus atmosfer dan memanaskan permukaan Bumi. Permukaan yang hangat memancarkan kembali kalor sebagai <b>radiasi inframerah</b>. <b>Gas rumah kaca</b> (CO₂, metana, uap air) menyerap inframerah lalu memancarkannya ke segala arah, termasuk kembali ke Bumi.</p>
        ${mGbr(SVG_RUMAHKACA, 'Gambar 1. Efek rumah kaca: sebagian panas yang dipancarkan Bumi ditahan oleh gas rumah kaca.')}
        ${mKotak('miskon', 'efek rumah kaca itu sendiri bukan hal buruk; tanpanya suhu rata-rata Bumi sekitar −18 °C. Masalahnya adalah efek rumah kaca yang <b>bertambah kuat</b> karena kegiatan manusia.')}`],
      ['Pemanasan global dan dampaknya', `<p>Sejak era industri, kadar CO₂ naik dari ± 280 ppm menjadi lebih dari 420 ppm karena pembakaran bahan bakar fosil dan penebangan hutan. Akibatnya suhu rata-rata Bumi naik (<b>pemanasan global</b>) dan pola iklim berubah.</p>
        ${mTabel(['Dampak', 'Yang dirasakan di pesisir'], [['Muka air laut naik', 'rob makin sering dan tinggi'], ['Cuaca ekstrem', 'kemarau lebih panjang, hujan sangat lebat'], ['Laut menghangat', 'ikan berpindah, terumbu karang memutih'], ['Pertanian terganggu', 'masa tanam dan panen bergeser']])}`],
      ['Membuktikan dengan model botol', `<p>Pada peraga, lampu pijar berperan sebagai matahari karena memancarkan banyak inframerah, sedangkan alas hitam berperan seperti permukaan Bumi. Intensitas radiasi berkurang sebanding kuadrat jarak.</p>
        ${mRumus('intensitas ∝ 1 ÷ jarak²', 'CO₂ dibuat dari CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑')}
        ${mKotak('misi', 'uji adil sangat menentukan: kedua botol harus sama ukuran, warna, tutup, jarak, dan posisi termometernya. Cairan sisa reaksi di botol juga ikut menyerap kalor dan bisa menutupi efek CO₂.')}
        ${mKotak('tahukah', 'model botol hanyalah penyederhanaan: atmosfer sungguhan jauh lebih tebal, dan pemanasan global terjadi selama puluhan tahun, bukan menit.')}`],
      ['Mitigasi dan adaptasi', `<p><b>Mitigasi</b> berarti mengurangi penyebabnya: hemat listrik, memakai energi terbarukan, menanam pohon dan mangrove, mengurangi sampah. <b>Adaptasi</b> berarti menyesuaikan diri dengan dampaknya: tanggul dan rumah panggung di daerah rob, tanaman tahan kering, dan sistem peringatan dini.</p>
        ${mKotak('coba', 'catat pemakaian listrik di rumahmu selama seminggu, lalu buat satu kebiasaan hemat energi dan bandingkan minggu berikutnya.')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Efek rumah kaca', 'gas rumah kaca menahan radiasi inframerah dari Bumi'], ['Pemanasan global', 'CO₂ 280 → > 420 ppm, suhu rata-rata naik'], ['Dampak pesisir', 'rob, kemarau panjang, cuaca ekstrem'], ['Mitigasi vs adaptasi', 'mengurangi penyebab vs menyesuaikan diri']],
    aman: 'lampu pijar sangat panas, jangan disentuh dan jauhkan dari kertas; botol PET melunak di atas ± 60 °C, selalu awasi lampu yang menyala.',
    uji: [['Apa beda cuaca dan iklim?', 'Bandingkan jangka waktu dan luas wilayahnya.'], ['Mengapa kedua botol harus berjarak sama dari lampu?', 'Ingat intensitas ∝ 1 ÷ jarak² dan prinsip uji adil.'], ['Sebutkan satu contoh mitigasi dan satu contoh adaptasi perubahan iklim di desamu.', 'Lihat bagian E.']]
  })
}, {
  bunyi: ['getaran', 'gelombang', 'frekuensi', 'amplitudo', 'nada', 'mersenne', 'tegangan', 'resonansi', 'medium', 'longitudinal'],
  gempa: ['lempeng', 'tektonik', 'seismik', 'frekuensi alami', 'resonansi', 'kekakuan', 'massa', 'pengaku', 'episentrum', 'isolasi'],
  boraks: ['zat aditif', 'boraks', 'pengawet', 'indikator', 'kurkumin', 'asam', 'basa', 'positif palsu', 'kontrol', 'bpom'],
  tetes: ['tekanan hidrostatis', 'torricelli', 'debit', 'ketinggian', 'gesekan', 'bejana berhubungan', 'mulsa', 'transpirasi'],
  listrik: ['arus', 'tegangan', 'hambatan', 'ohm', 'seri', 'paralel', 'resistor', 'daya', 'kapasitas', 'rangkaian tertutup'],
  magnet: ['magnet', 'kutub', 'medan magnet', 'elektromagnet', 'lilitan', 'kumparan', 'inti besi', 'besi lunak', 'baja', 'oersted'],
  tempe: ['bioteknologi', 'fermentasi', 'kapang', 'rhizopus', 'hifa', 'miselium', 'spora', 'oksigen', 'suhu', 'kontaminasi'],
  iklim: ['efek rumah kaca', 'gas rumah kaca', 'inframerah', 'pemanasan global', 'iklim', 'cuaca', 'mitigasi', 'adaptasi', 'uji adil']
});
