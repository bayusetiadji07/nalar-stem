/* Materi Gali Konsep ala buku — misi lintas kelas (7–9) dan kelas 8 (bagian 1). Memakai cetakan di js/materi.js. */

const SVG_ENERGI = `<svg viewBox="0 0 680 120" class="svg-materi" role="img" aria-label="Rantai perubahan energi pada kincir angin">
  <style>.en-t{font:800 13.5px var(--font,system-ui);fill:#fff}.en-s{font:600 11.5px var(--font,system-ui);fill:#5b6576}</style>
  <defs><marker id="enP" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#64748b"/></marker></defs>
  ${[['Kinetik angin', '#0ea5e9'], ['Gerak putar bilah', '#0d9488'], ['Listrik (generator)', '#7c3aed'], ['Cahaya lampu', '#f59e0b']].map(([n, w], i) => `<rect x="${10 + i * 170}" y="25" width="140" height="48" rx="24" fill="${w}"/><text class="en-t" x="${80 + i * 170}" y="54" text-anchor="middle">${n}</text>${i < 3 ? `<path d="M${152 + i * 170} 49 H${178 + i * 170}" stroke="#64748b" stroke-width="3" marker-end="url(#enP)"/>` : ''}`).join('')}
  <text class="en-s" x="340" y="105" text-anchor="middle">di setiap tahap, sebagian energi berubah menjadi panas dan bunyi (gesekan)</text>
</svg>`;

const SVG_APUNG = `<svg viewBox="0 0 560 250" class="svg-materi" role="img" aria-label="Gaya berat dan gaya apung pada perahu">
  <style>.ap2-t{font:700 13.5px var(--font,system-ui)}.ap2-s{font:500 12px var(--font,system-ui);fill:#5b6576}</style>
  <defs><marker id="apB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#dc2626"/></marker><marker id="apA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2563eb"/></marker></defs>
  <rect x="0" y="130" width="560" height="120" fill="#bae6fd"/>
  <path d="M150 90 H410 L380 165 H180 Z" fill="#fde68a" stroke="#a16207" stroke-width="2.5"/><rect x="235" y="68" width="90" height="22" fill="#a16207" opacity=".6"/>
  <path d="M280 120 V200" stroke="#dc2626" stroke-width="4" marker-end="url(#apB)"/><path d="M300 240 V150" stroke="#2563eb" stroke-width="4" marker-end="url(#apA)"/>
  <text class="ap2-t" x="186" y="215" style="fill:#dc2626">berat perahu + muatan</text><text class="ap2-t" x="310" y="236" style="fill:#2563eb">gaya apung (Archimedes)</text>
  <path d="M415 130 H470 M415 90 H470" stroke="#475569" stroke-dasharray="4 3"/><path d="M462 92 V128" stroke="#475569" stroke-width="2"/><text class="ap2-s" x="472" y="114">lambung bebas</text>
</svg>`;

const SVG_TUAS = `<svg viewBox="0 0 600 200" class="svg-materi" role="img" aria-label="Bagian-bagian tuas jenis pertama">
  <style>.tu-t{font:700 13px var(--font,system-ui);fill:#0f172a}.tu-s{font:500 12px var(--font,system-ui);fill:#5b6576}</style>
  <defs><marker id="tuP" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#dc2626"/></marker></defs>
  <rect x="40" y="95" width="520" height="12" rx="4" fill="#a16207"/><path d="M200 107 L180 150 H220 Z" fill="#475569"/>
  <rect x="55" y="55" width="60" height="40" rx="6" fill="#94a3b8"/><text class="tu-t" x="85" y="80" text-anchor="middle">beban</text>
  <path d="M540 40 V88" stroke="#dc2626" stroke-width="4" marker-end="url(#tuP)"/><text class="tu-t" x="550" y="36" style="fill:#dc2626">kuasa</text>
  <path d="M85 165 H200 M200 165 H540" stroke="#334155" stroke-width="1.5"/><path d="M85 158 V172 M200 158 V172 M540 158 V172" stroke="#334155" stroke-width="1.5"/>
  <text class="tu-s" x="142" y="188" text-anchor="middle">lengan beban</text><text class="tu-s" x="370" y="188" text-anchor="middle">lengan kuasa (panjang → gaya kecil)</text>
  <text class="tu-s" x="200" y="140" text-anchor="middle" dx="45">titik tumpu</text>
</svg>`;

const SVG_LENSA = `<svg viewBox="0 0 640 230" class="svg-materi" role="img" aria-label="Pembentukan bayangan nyata oleh lensa cembung">
  <style>.ln-s{font:500 12px var(--font,system-ui);fill:#5b6576}.ln-t{font:700 12.5px var(--font,system-ui)}</style>
  <path d="M20 115 H620" stroke="#94a3b8" stroke-width="1.5"/>
  <path d="M250 25 Q275 115 250 205 Q225 115 250 25 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
  <circle cx="180" cy="115" r="4" fill="#475569"/><circle cx="320" cy="115" r="4" fill="#475569"/><text class="ln-s" x="172" y="134">F</text><text class="ln-s" x="314" y="134">F</text>
  <path d="M130 115 V60" stroke="#16a34a" stroke-width="5"/><path d="M122 66 L130 52 L138 66 Z" fill="#16a34a"/><text class="ln-t" x="80" y="50" style="fill:#16a34a">benda (layar HP)</text>
  <path d="M130 60 H250 L418 192" stroke="#f59e0b" stroke-width="2" fill="none"/><path d="M130 60 L418 192" stroke="#ea580c" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
  <path d="M418 115 V186" stroke="#7c3aed" stroke-width="5"/><path d="M410 182 L418 196 L426 182 Z" fill="#7c3aed"/><text class="ln-t" x="430" y="182" style="fill:#7c3aed">bayangan nyata,</text><text class="ln-t" x="430" y="198" style="fill:#7c3aed">terbalik, diperbesar</text>
  <text class="ln-s" x="440" y="60">sinar sejajar → lewat F</text><text class="ln-s" x="440" y="76">sinar lewat pusat lensa → lurus</text>
  <text class="ln-s" x="160" y="150">s (jarak benda)</text><text class="ln-s" x="300" y="100" dx="40">s′ (jarak bayangan)</text>
</svg>`;

const SVG_RANGKA = `<svg viewBox="0 0 600 210" class="svg-materi" role="img" aria-label="Gaya tekan dan tarik pada rangka jembatan">
  <style>.rg-t{font:700 13px var(--font,system-ui)}</style>
  <defs><marker id="rgB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#0f172a"/></marker></defs>
  <path d="M60 150 H540" stroke="#2563eb" stroke-width="7"/><path d="M120 70 H480" stroke="#dc2626" stroke-width="7"/>
  <path d="M60 150 L120 70 L180 150 L240 70 L300 150 L360 70 L420 150 L480 70 L540 150" stroke="#a16207" stroke-width="4" fill="none"/>
  <path d="M50 150 L35 180 H65 Z M550 150 L535 180 H565 Z" fill="#475569"/>
  <path d="M300 10 V58" stroke="#0f172a" stroke-width="4" marker-end="url(#rgB)"/><text class="rg-t" x="310" y="30">beban</text>
  <text class="rg-t" x="40" y="45" style="fill:#dc2626">batang atas: TERTEKAN (memendek)</text>
  <text class="rg-t" x="150" y="175" style="fill:#2563eb">batang bawah: TERTARIK (memanjang)</text>
  <text class="rg-t" x="160" y="200" style="fill:#a16207">batang miring membentuk segitiga</text>
</svg>`;

pasangMateri({
  angin: bukuMateri('angin', {
    pembuka: 'Angin laut yang menerpa wajahmu membawa energi. Energi itu tidak bisa diciptakan dari ketiadaan, tetapi bisa <b>diubah bentuknya</b>: dari gerak udara menjadi putaran, lalu listrik, lalu cahaya.',
    bagian: [
      ['Energi dan bentuk-bentuknya', `<p><b>Energi</b> adalah kemampuan untuk melakukan usaha atau perubahan. Bentuknya antara lain energi kinetik (gerak), potensial (kedudukan), kimia, listrik, cahaya, panas, dan bunyi. Satuannya joule (J).</p>
        <p><b>Hukum kekekalan energi</b>: energi tidak dapat diciptakan atau dimusnahkan, hanya berubah bentuk.</p>
        ${mGbr(SVG_ENERGI, 'Gambar 1. Rantai perubahan energi pada pembangkit listrik tenaga angin.')}`],
      ['Daya angin', `<p><b>Daya</b> adalah energi per detik, satuannya watt (W). Daya angin bergantung pada luas sapuan bilah dan kecepatan angin.</p>
        ${mRumus('P = ½ × ρ × A × v³', 'ρ = massa jenis udara ± 1,2 kg/m³, A = π × r² (luas sapuan), v = kecepatan angin')}
        ${mTabel(['Perubahan', 'Akibat pada daya angin'], [['kecepatan angin 2×', 'daya 2³ = <b>8×</b>'], ['jari-jari bilah 2×', 'luas sapuan 2² = <b>4×</b>'], ['angin 4 m/s → 10 m/s', 'daya ± 15× lebih besar, bilah harus kuat']], true)}
        ${mKotak('miskon', 'bilah lebih banyak tidak selalu menghasilkan listrik lebih besar. Bilah yang terlalu banyak saling menghalangi dan memperberat kincir.')}`],
      ['Efisiensi dan batas Betz', `<p>Kincir tidak bisa menangkap seluruh energi angin. Bila semua energi diambil, udara di belakang kincir berhenti dan menghalangi angin baru. Batas teoretisnya <b>59% (batas Betz)</b>; kincir sederhana biasanya hanya 15–30%.</p>
        ${mRumus('efisiensi = energi yang berguna ÷ energi yang masuk × 100%')}`],
      ['Generator dan induksi elektromagnetik', `<p>Generator mengubah energi gerak menjadi listrik. Di dalamnya, <b>magnet berputar di dekat kumparan kawat</b>. Perubahan medan magnet menimbulkan arus listrik. Peristiwa ini disebut <b>induksi elektromagnetik</b> (Faraday). Makin cepat putaran, makin besar tegangannya.</p>
        ${mKotak('misi', 'gir mempercepat putaran generator, tetapi membuat kincir lebih berat untuk mulai berputar. Kriteria "mulai berputar pada angin ≤ 3 m/s" bisa gagal bila gir terlalu besar.')}
        ${mKotak('tahukah', 'PLTB Sidrap di Sulawesi Selatan memiliki 30 kincir raksasa dengan bilah sepanjang ± 57 m, yang menerangi puluhan ribu rumah.')}`],
      ['Energi terbarukan', `<p>Angin, matahari, air, dan panas bumi adalah sumber energi <b>terbarukan</b>, yaitu tidak habis dan lebih bersih. Batu bara dan minyak bumi <b>tidak terbarukan</b> dan menghasilkan gas rumah kaca saat dibakar.</p>
        ${mKotak('coba', 'buat baling-baling kertas, tiup dari jarak 10 cm dan 20 cm. Kapan putarannya lebih cepat? Hubungkan dengan rumus daya angin.')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Kekekalan energi', 'energi berubah bentuk, tidak hilang'], ['Daya angin', 'sebanding dengan v³ dan r²'], ['Batas Betz', 'maksimal 59% energi angin tertangkap'], ['Generator', 'induksi elektromagnetik: magnet berputar → arus listrik']],
    aman: 'jauhkan tangan dari bilah yang berputar, dan uji kincir dengan kipas, bukan di dekat jalan atau kabel listrik.',
    uji: [['Kecepatan angin naik dari 3 m/s menjadi 6 m/s. Berapa kali daya anginnya bertambah?', 'Ingat pangkat tiga pada v.'], ['Mengapa energi listrik yang dihasilkan selalu lebih kecil daripada energi angin?', 'Ke mana sebagian energi berubah?'], ['Bagaimana generator menghasilkan listrik?', 'Apa yang terjadi saat magnet bergerak di dekat kumparan?']]
  }),

  nyamuk: bukuMateri('nyamuk', {
    pembuka: 'Seekor nyamuk betina bisa "mencium" napas kita dari jarak belasan meter. Kita dapat membalikkan kemampuan itu menjadi jebakan, dengan bantuan makhluk hidup lain yang sangat kecil: <b>ragi</b>.',
    bagian: [
      ['Interaksi makhluk hidup', `<p>Makhluk hidup saling berinteraksi. Nyamuk betina mengisap darah manusia untuk mematangkan telurnya. Hubungan ini merugikan manusia, apalagi bila nyamuk membawa virus.</p>
        ${mTabel(['Pola interaksi', 'Ciri', 'Contoh'], [['Mutualisme', 'saling menguntungkan', 'lebah dan bunga'], ['Komensalisme', 'satu untung, satu tidak terpengaruh', 'anggrek dan pohon'], ['Parasitisme', 'satu untung, satu dirugikan', 'nyamuk dan manusia, benalu'], ['Predasi', 'pemangsa dan mangsa', 'cicak dan nyamuk']])}`],
      ['Nyamuk Aedes dan demam berdarah', `<p>Penyakit <b>demam berdarah dengue (DBD)</b> disebabkan virus dengue yang ditularkan nyamuk <i>Aedes aegypti</i>. Nyamuk ini berbintik putih, aktif pagi dan sore, dan bertelur di <b>air jernih yang tergenang</b> (bak mandi, ban bekas, kaleng).</p>
        <p><b>Daur hidup nyamuk</b>: telur → jentik (larva) → kepompong (pupa) → dewasa, kira-kira <b>7–10 hari</b>.</p>
        ${mKotak('misi', 'perangkap berisi air. Bila tidak diganti dalam 7 hari, jentik bisa menjadi nyamuk dewasa, sehingga perangkap justru menjadi sarang nyamuk!')}`],
      ['Bagaimana nyamuk menemukan kita?', `<p>Nyamuk betina mengikuti beberapa petunjuk:</p><ul><li><b>gas CO₂</b> dari napas (dari jauh);</li><li><b>bau tubuh dan panas tubuh</b> (dari dekat);</li><li><b>warna gelap</b> dan tempat <b>teduh</b>.</li></ul>
        <p>Perangkap meniru "manusia": menghasilkan CO₂, berwarna gelap, diletakkan di tempat teduh, dan memiliki corong yang mudah dimasuki tetapi sulit dikeluari.</p>`],
      ['Fermentasi oleh ragi', `<p><b>Ragi</b> (<i>Saccharomyces</i>) adalah jamur bersel satu. Dalam keadaan kurang oksigen, ragi mengubah gula menjadi alkohol dan gas karbon dioksida. Proses ini disebut <b>fermentasi</b>.</p>
        ${mRumus('gula → alkohol + karbon dioksida', 'dilakukan ragi; ± 100 g gula menghasilkan ± 49 g CO₂')}
        ${mTabel(['Suhu air', 'Kerja ragi'], [['dingin (< 20 °C)', 'sangat lambat'], ['hangat (30–35 °C)', 'paling aktif'], ['panas (> 45 °C)', 'ragi mati']])}
        ${mKotak('miskon', 'air mendidih tidak membuat ragi "lebih semangat"; justru membunuhnya.')}`],
      ['Bioteknologi dalam kehidupan', `<p><b>Bioteknologi</b> adalah pemanfaatan makhluk hidup untuk menghasilkan barang atau jasa. Fermentasi ragi juga dipakai untuk membuat roti (gas CO₂ mengembangkan adonan) dan tapai.</p>
        ${mKotak('coba', 'isi botol dengan air hangat, gula, dan ragi, lalu pasang balon di mulutnya. Amati balon setelah 30 menit.')}
        ${mKotak('tahukah', 'gerakan 3M Plus (Menguras, Menutup, Mendaur ulang, plus mencegah gigitan) adalah cara paling ampuh mencegah DBD.')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Parasitisme', 'nyamuk untung, manusia rugi'], ['Daur hidup', 'telur → jentik → kepompong → dewasa (7–10 hari)'], ['Fermentasi', 'ragi: gula → alkohol + CO₂'], ['Suhu ragi', 'paling aktif 30–35 °C, mati > 45 °C']],
    aman: 'gunting botol dengan hati-hati atau minta bantuan guru, dan buang larutan lama ke tanah, bukan ke genangan.',
    uji: [['Mengapa perangkap harus diganti paling lama 7 hari?', 'Ingat lamanya daur hidup nyamuk.'], ['Rudi memakai air mendidih agar ragi bekerja cepat. Apa yang terjadi? Mengapa?', 'Lihat tabel suhu ragi.'], ['Petunjuk apa saja yang dipakai nyamuk untuk menemukan manusia?', 'Ada petunjuk dari jauh dan dari dekat.']]
  }),

  perahu: bukuMateri('perahu', {
    pembuka: 'Kapal baja seberat ribuan ton bisa mengapung, sedangkan paku kecil tenggelam. Rahasianya bukan pada beratnya saja, melainkan pada <b>berapa banyak air yang dipindahkan</b>.',
    bagian: [
      ['Massa jenis', `<p><b>Massa jenis</b> (ρ) menyatakan massa per satuan volume.</p>${mRumus('ρ = m ÷ V', 'satuan kg/m³ atau g/cm³')}
        ${mTabel(['Zat', 'Massa jenis (kg/m³)', 'Di air'], [['styrofoam', '± 30', 'mengapung'], ['kayu', '± 600', 'mengapung'], ['air tawar', '1.000', '—'], ['air laut', '± 1.025', '—'], ['besi', '± 7.900', 'tenggelam (bila padat)']], true)}
        ${mKotak('miskon', '"Benda berat pasti tenggelam" keliru. Yang menentukan adalah massa jenis rata-rata benda (termasuk rongga udaranya) dibandingkan massa jenis zat cair.')}`],
      ['Tekanan hidrostatis', `<p>Zat cair menekan ke segala arah. Makin dalam, makin besar tekanannya.</p>${mRumus('P = ρ × g × h', 'ρ = massa jenis zat cair, g ≈ 10 m/s², h = kedalaman')}
        <p>Tekanan dari bawah pada dasar perahu lebih besar daripada tekanan di permukaan; selisih inilah yang menimbulkan gaya ke atas.</p>`],
      ['Hukum Archimedes', `<p><b>Hukum Archimedes</b>: benda yang tercelup sebagian atau seluruhnya dalam zat cair mendapat gaya ke atas sebesar <b>berat zat cair yang dipindahkan</b>.</p>
        ${mRumus('F<sub>A</sub> = ρ<sub>air</sub> × g × V<sub>tercelup</sub>')}
        ${mGbr(SVG_APUNG, 'Gambar 1. Perahu mengapung bila gaya apung sama dengan berat perahu + muatan.')}
        ${mTabel(['Keadaan', 'Syarat'], [['Mengapung', 'gaya apung = berat, sebagian benda di atas air'], ['Melayang', 'massa jenis benda = massa jenis air'], ['Tenggelam', 'berat > gaya apung maksimum']])}
        ${mKotak('misi', 'makin berat muatan, makin dalam perahu tercelup. Bila kedalaman celup melebihi tinggi dinding, air masuk. Kriteria lambung bebas ≥ 2 cm menjaga perahu tetap aman.')}`],
      ['Stabilitas dan kekuatan', `<p>Perahu yang <b>lebar dan rendah</b> lebih sulit terbalik daripada yang sempit dan tinggi, karena titik beratnya rendah dan alasnya lebar. Bahan ringan belum tentu kuat: dasar perahu harus mampu menahan tekanan muatan.</p>
        ${mKotak('tahukah', 'kapal tanker modern memakai garis Plimsoll di lambungnya untuk menunjukkan batas muatan aman di air tawar dan air laut.')}`],
      ['Penerapan', `<p>Prinsip Archimedes dipakai pada kapal, kapal selam (mengatur air di tangki pemberat), pelampung, dan hidrometer untuk mengukur massa jenis cairan.</p>
        ${mKotak('coba', 'bentuk plastisin menjadi bola lalu masukkan ke air; kemudian bentuk menjadi perahu. Mengapa hasilnya berbeda padahal massanya sama?')}`]
    ],
    ringkas: [['Konsep', 'Rumus / inti'], ['Massa jenis', 'ρ = m ÷ V'], ['Tekanan hidrostatis', 'P = ρ g h'], ['Gaya apung', 'F<sub>A</sub> = ρ g V<sub>tercelup</sub>'], ['Stabil', 'lebar, rendah, titik berat rendah']],
    aman: 'uji perahu di bak air yang dangkal, dan bersihkan tumpahan air agar lantai tidak licin.',
    uji: [['Mengapa bola plastisin tenggelam, tetapi perahu plastisin mengapung?', 'Bandingkan volume air yang dipindahkan.'], ['Perahu yang sama membawa muatan sama di air laut dan air tawar. Di mana perahu tercelup lebih dalam?', 'Bandingkan massa jenis kedua air.'], ['Mengapa perahu yang sempit dan tinggi mudah terbalik?', 'Pikirkan titik berat dan lebar alas.']]
  }),

  roketair: bukuMateri('roketair', {
    pembuka: 'Pompa sepeda menjejalkan udara ke dalam botol. Partikel udara yang berdesakan itu menyimpan dorongan besar. Saat dilepaskan, dorongan itu bisa melontarkan roket puluhan meter.',
    bagian: [
      ['Tekanan', `<p><b>Tekanan</b> adalah gaya per satuan luas.</p>${mRumus('P = F ÷ A', 'satuan pascal (Pa); 1 bar = 100.000 Pa ≈ 14,5 psi')}
        <p>Pisau tajam mudah memotong karena gayanya bekerja pada luas yang sangat kecil, sehingga tekanannya besar.</p>`],
      ['Tekanan gas dan Hukum Boyle', `<p>Tekanan gas timbul karena partikel udara terus bertumbukan dengan dinding wadah. Memompa udara menambah jumlah partikel, sehingga tumbukan makin sering dan tekanan naik.</p>
        <p><b>Hukum Boyle</b>: pada suhu tetap, tekanan gas berbanding terbalik dengan volumenya.</p>${mRumus('P₁ × V₁ = P₂ × V₂')}
        ${mKotak('misi', 'saat air menyembur keluar, ruang udara membesar sehingga tekanannya turun dan dorongan melemah. Karena itu, banyaknya air sangat menentukan.')}`],
      ['Hukum III Newton: aksi dan reaksi', `<p>Setiap <b>aksi</b> menimbulkan <b>reaksi</b> yang sama besar dan berlawanan arah. Udara bertekanan mendorong air keluar ke bawah dengan cepat (aksi), dan air mendorong botol ke atas (reaksi). Air berperan sebagai <b>massa dorong</b>.</p>
        ${mTabel(['Banyak air', 'Akibat'], [['tanpa air', 'hampir tidak ada massa dorong → roket lemah'], ['± ⅓ botol', 'seimbang antara massa dorong dan ruang udara'], ['terlalu banyak', 'roket berat, ruang udara sempit, tekanan cepat habis']])}
        ${mKotak('miskon', 'roket tidak terdorong karena "menekan tanah". Di udara pun roket tetap terdorong, karena reaksinya berasal dari air yang disemburkan.')}`],
      ['Gerak, sudut, dan kestabilan', `<p>Roket yang diluncurkan miring bergerak melengkung (gerak parabola) karena tarikan gravitasi. Sudut sekitar <b>45°</b> biasanya memberi jarak terjauh bila hambatan udara kecil. <b>Sirip</b> di belakang dan kerucut berbeban di depan membuat roket lurus menembus udara sehingga hambatannya kecil.</p>
        ${mKotak('tahukah', 'roket sungguhan bekerja dengan prinsip yang sama: gas panas disemburkan ke belakang dengan sangat cepat sehingga roket terdorong ke depan, bahkan di luar angkasa yang hampa udara.')}`],
      ['Batas aman', `<p>Botol bekas punya batas tekanan. Tekanan berlebihan membuat botol pecah dan berbahaya. Karena itu tekanan selalu diukur dengan manometer pada pompa.</p>
        ${mKotak('coba', 'tiup balon lalu lepaskan tanpa diikat. Ke mana udara keluar dan ke mana balon bergerak?')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Tekanan', 'P = F ÷ A'], ['Hukum Boyle', 'P₁V₁ = P₂V₂: volume membesar, tekanan turun'], ['Hukum III Newton', 'air disemburkan ke bawah, roket terdorong ke atas'], ['Kestabilan', 'sirip di belakang, beban di depan']],
    aman: 'jangan memompa melebihi 4 bar, berdiri di samping (bukan di atas) roket, dan jangan mengarahkan roket ke orang.',
    uji: [['Mengapa roket tanpa air hanya meluncur pendek?', 'Apa yang menjadi massa dorong?'], ['Jelaskan dengan Hukum Boyle mengapa dorongan roket makin lemah saat air keluar.', 'Apa yang terjadi pada volume dan tekanan udara?'], ['Untuk apa sirip dipasang di bagian belakang roket?', 'Hubungkan dengan kestabilan dan hambatan udara.']]
  }),

  jembatan: bukuMateri('jembatan', {
    pembuka: 'Jembatan yang kokoh bukan sekadar dibuat dari bahan yang kuat, tetapi dari <b>bentuk yang cerdas</b>. Dengan stik es krim yang rapuh pun, bentuk yang tepat bisa menahan beban ratusan kali beratnya sendiri.',
    bagian: [
      ['Gaya dan jenisnya', `<p><b>Gaya</b> adalah tarikan atau dorongan, satuannya newton (N). Gaya dapat mengubah bentuk, arah, dan kecepatan benda. Berat adalah gaya gravitasi: <b>w = m × g</b>, dengan g ≈ 10 m/s².</p>
        ${mTabel(['Gaya pada batang', 'Efek', 'Cara gagal'], [['Gaya tekan', 'batang didorong memendek', 'menekuk (melengkung lalu patah)'], ['Gaya tarik', 'batang ditarik memanjang', 'putus, biasanya di sambungan lem'], ['Gaya geser', 'bagian saling bergeser', 'sambungan lepas']])}
        ${mKotak('misi', 'beban 15 kg setara gaya berat ± 150 N di tengah jembatan.')}`],
      ['Gaya tekan dan tarik pada jembatan', `<p>Saat jembatan dibebani di tengah, bagian atas melengkung ke dalam sehingga <b>tertekan</b>, sedangkan bagian bawah meregang sehingga <b>tertarik</b>.</p>
        ${mGbr(SVG_RANGKA, 'Gambar 1. Gaya pada rangka jembatan tipe Warren yang dibebani di tengah.')}
        ${mRumus('gaya pada batang atas/bawah ≈ momen ÷ tinggi rangka', 'momen di tengah M = F × L ÷ 4')}`],
      ['Mengapa segitiga?', `<p>Persegi yang sambungannya berengsel mudah berubah menjadi jajar genjang. <b>Segitiga</b> tidak bisa berubah bentuk selama panjang sisinya tetap, sehingga rangka jembatan (Warren, Pratt, Howe) tersusun dari segitiga.</p>
        ${mKotak('miskon', 'rangka yang makin tinggi memang memperkecil gaya pada batang atas-bawah, tetapi rangka yang terlalu tinggi dan ramping mudah terpuntir ke samping.')}`],
      ['Kekakuan batang dan sambungan', `<p>Batang tekan yang panjang dan tipis mudah <b>menekuk</b> jauh sebelum kayunya hancur. Menumpuk beberapa stik yang direkatkan rapat membuat batang jauh lebih kaku. Batang tarik biasanya gagal di <b>sambungan lem</b>, jadi luas tempelan lem sangat penting.</p>
        ${mKotak('tahukah', 'jembatan Suramadu memakai kabel baja (menahan gaya tarik) dan menara beton (menahan gaya tekan), memanfaatkan bahan sesuai jenis gayanya.')}`],
      ['Efisiensi struktur', `<p>Insinyur tidak hanya mencari jembatan yang kuat, tetapi yang <b>kuat dengan bahan sesedikit mungkin</b>.</p>${mRumus('efisiensi = beban maksimum ÷ massa jembatan')}
        ${mKotak('coba', 'tekan sebatang stik di kedua ujungnya sampai melengkung, lalu ulangi dengan tiga stik yang direkatkan. Bandingkan gaya yang dibutuhkan.')}`]
    ],
    ringkas: [['Bagian', 'Gaya', 'Agar kuat'], ['Batang atas', 'tekan', 'tumpuk stik agar kaku, tidak menekuk'], ['Batang bawah', 'tarik', 'sambungan lem yang luas dan kuat'], ['Batang miring', 'tekan/tarik', 'membentuk segitiga'], ['Busur', 'tekan ke tumpuan', 'tahan dorongan ke samping']],
    aman: 'tambahkan beban perlahan dan jauhkan kaki dari bawah beban yang bisa jatuh saat jembatan runtuh.',
    uji: [['Bagian jembatan mana yang tertekan dan mana yang tertarik saat dibebani di tengah?', 'Bayangkan penggaris yang ditekan di tengahnya.'], ['Mengapa rangka jembatan dibuat dari segitiga, bukan persegi?', 'Bentuk mana yang bisa berubah bila sambungannya berengsel?'], ['Batang atas jembatanmu menekuk. Apa yang sebaiknya diperbaiki?', 'Bagaimana membuat batang tekan lebih kaku?']]
  }),

  pesawat: bukuMateri('pesawat', {
    pembuka: 'Mengangkat karung garam 60 kg langsung ke gerobak bisa mencederai punggung. Pesawat sederhana tidak memberi "tenaga gratis", tetapi memungkinkan kita <b>menukar gaya besar dengan jarak yang lebih jauh</b>.',
    bagian: [
      ['Usaha', `<p><b>Usaha</b> adalah hasil kali gaya dan perpindahan searah gaya.</p>${mRumus('W = F × s', 'W = usaha (joule), F = gaya (N), s = perpindahan (m)')}
        <p>Mengangkat karung 60 kg (berat ± 600 N) setinggi 0,5 m membutuhkan usaha ± 300 J, dengan cara apa pun.</p>
        ${mKotak('miskon', 'pesawat sederhana tidak mengurangi usaha. Gaya yang lebih kecil dibayar dengan jarak tarik atau dorong yang lebih jauh.')}`],
      ['Tuas (pengungkit)', `<p>Tuas memiliki <b>titik tumpu</b>, <b>beban</b>, dan <b>kuasa</b>.</p>
        ${mGbr(SVG_TUAS, 'Gambar 1. Tuas jenis pertama: titik tumpu berada di antara beban dan kuasa.')}
        ${mRumus('beban × lengan beban = kuasa × lengan kuasa', 'KM = lengan kuasa ÷ lengan beban')}
        ${mTabel(['Jenis tuas', 'Letak', 'Contoh'], [['Jenis 1', 'titik tumpu di tengah', 'linggis, gunting, jungkat-jungkit'], ['Jenis 2', 'beban di tengah', 'gerobak dorong, pembuka botol'], ['Jenis 3', 'kuasa di tengah', 'sekop, pinset, sapu']])}`],
      ['Katrol', `${mTabel(['Jenis', 'Ciri', 'Keuntungan mekanis'], [['Katrol tetap', 'tidak ikut bergerak; mengubah arah gaya', 'KM = 1'], ['Katrol bebas', 'ikut bergerak bersama beban', 'KM = 2'], ['Takal (gabungan)', 'beberapa katrol tetap dan bebas', 'KM = jumlah tali penopang beban']])}
        <p>Katrol sumur adalah katrol tetap: tidak meringankan gaya, tetapi menarik ke bawah terasa lebih mudah daripada mengangkat ke atas.</p>`],
      ['Keuntungan mekanis dan efisiensi', `${mRumus('KM = beban ÷ kuasa', 'efisiensi = usaha untuk beban ÷ usaha yang dikeluarkan × 100%')}
        <p>Gesekan (misalnya katrol berkarat) dan berat katrol bebas membuat usaha yang dikeluarkan lebih besar daripada usaha untuk beban, sehingga efisiensi selalu di bawah 100%.</p>
        ${mKotak('misi', 'gaya kuasa paling besar 200 N, tetapi jarak tarik paling jauh 3 m. Keuntungan mekanis besar menurunkan gaya, tetapi menambah jarak tarik.')}`],
      ['Pesawat sederhana lain', `<p>Selain tuas dan katrol, ada <b>bidang miring</b> (tangga, jalan berkelok di pegunungan, papan untuk menaikkan barang ke truk) dan <b>roda berporos</b> (setir, obeng). Semuanya memakai prinsip yang sama: gaya kecil, jarak lebih jauh.</p>
        ${mKotak('coba', 'buka tutup kaleng memakai sendok sebagai tuas. Pegang sendok dekat ujungnya, lalu dekat tutupnya. Mana yang lebih mudah?')}`]
    ],
    ringkas: [['Alat', 'KM', 'Kelebihan'], ['Tuas', 'lengan kuasa ÷ lengan beban', 'gaya kecil bila lengan kuasa panjang'], ['Katrol tetap', '1', 'mengubah arah gaya'], ['Katrol bebas', '2', 'gaya separuh, jarak tarik 2×'], ['Takal', 'jumlah tali penopang', 'gaya makin kecil, tali makin panjang']],
    aman: 'pastikan tali dan kayu tidak retak sebelum mengangkat beban, dan jangan berdiri di bawah beban yang terangkat.',
    uji: [['Tuas sepanjang 1,5 m dengan lengan beban 0,3 m. Berapa keuntungan mekanisnya?', 'KM = lengan kuasa ÷ lengan beban.'], ['Mengapa katrol tetap tetap dipakai pada sumur walaupun KM-nya 1?', 'Apa yang diubah oleh katrol tetap?'], ['Benarkah takal 4 tali mengurangi usaha mengangkat karung? Jelaskan.', 'Bandingkan gaya dan jarak tarik.']]
  }),

  optik: bukuMateri('optik', {
    pembuka: 'Cahaya dari layar HP menyebar ke segala arah. Sebuah lensa dapat "menjinakkan" cahaya itu: membelokkannya agar bertemu kembali dan membentuk gambar besar di dinding.',
    bagian: [
      ['Sifat cahaya', `<p>Cahaya merambat <b>lurus</b>, dapat <b>dipantulkan</b> (refleksi), dan dapat <b>dibiaskan</b> (refraksi), yaitu dibelokkan ketika melewati dua zat yang berbeda kerapatannya, misalnya udara dan kaca.</p>
        ${mKotak('tahukah', 'sedotan di dalam gelas air tampak patah karena cahaya dibiaskan saat keluar dari air ke udara.')}`],
      ['Cermin dan lensa', `${mTabel(['Alat', 'Sifat', 'Contoh penggunaan'], [['Cermin datar', 'bayangan maya, tegak, sama besar', 'cermin rias'], ['Cermin cekung', 'mengumpulkan cahaya', 'lampu senter, reflektor'], ['Cermin cembung', 'menyebarkan cahaya, bidang pandang luas', 'spion kendaraan'], ['Lensa cembung', 'mengumpulkan cahaya (konvergen)', 'lup, kamera, proyektor'], ['Lensa cekung', 'menyebarkan cahaya (divergen)', 'kacamata rabun jauh']])}`],
      ['Pembentukan bayangan oleh lensa cembung', `${mRumus('1/f = 1/s + 1/s′', 'perbesaran M = s′ ÷ s')}
        ${mGbr(SVG_LENSA, 'Gambar 1. Benda sedikit di luar titik fokus menghasilkan bayangan nyata, terbalik, dan diperbesar: prinsip proyektor.')}
        ${mTabel(['Letak benda', 'Sifat bayangan', 'Contoh'], [['jauh di luar 2F', 'nyata, terbalik, diperkecil', 'kamera'], ['antara F dan 2F', 'nyata, terbalik, <b>diperbesar</b>', '<b>proyektor</b>'], ['di dalam F', 'maya, tegak, diperbesar', 'lup']])}`],
      ['Bayangan nyata dan maya', `<p><b>Bayangan nyata</b> terbentuk dari perpotongan sinar sungguhan sehingga dapat ditangkap layar, dan biasanya terbalik. <b>Bayangan maya</b> hanya tampak dari perpanjangan sinar sehingga tidak dapat ditangkap layar.</p>
        ${mKotak('misi', 'bayangan proyektor terbalik. Itulah sebabnya HP perlu diputar 180° agar gambar di dinding tegak.')}
        ${mKotak('miskon', 'gambar yang lebih besar tidak lebih terang. Cahaya yang sama disebar ke bidang yang lebih luas sehingga makin redup; lensa yang lebih lebar mengumpulkan lebih banyak cahaya.')}`],
      ['Alat optik di sekitar kita', `<p>Mata kita sendiri adalah alat optik: lensa mata membentuk bayangan nyata dan terbalik di retina, lalu otak "membaliknya". Kamera, mikroskop, teleskop, dan kacamata semuanya memanfaatkan pembiasan oleh lensa.</p>
        ${mKotak('coba', 'arahkan kaca pembesar ke jendela yang terang dan tangkap bayangannya di kertas putih. Apakah bayangannya tegak atau terbalik?')}`]
    ],
    ringkas: [['Konsep', 'Inti'], ['Pembiasan', 'cahaya berbelok saat melewati lensa'], ['Rumus lensa', '1/f = 1/s + 1/s′, M = s′/s'], ['Proyektor', 'benda antara F dan 2F → nyata, terbalik, diperbesar'], ['Kecerahan', 'gambar besar → redup; lensa lebar → lebih terang']],
    aman: 'jangan pernah melihat matahari melalui lensa atau memusatkan cahaya matahari ke kulit, mata, atau kertas.',
    uji: [['Lensa dengan f = 10 cm, HP diletakkan 12 cm dari lensa. Di mana bayangan terbentuk?', 'Pakai 1/f = 1/s + 1/s′.'], ['Mengapa HP harus dipasang terbalik di proyektor kardus?', 'Bagaimana sifat bayangan nyata dari lensa cembung?'], ['Mengapa bayangan pada lup tidak bisa ditangkap di dinding?', 'Bedakan bayangan nyata dan maya.']]
  })
}, {
  angin: ['energi', 'energi kinetik', 'kekekalan energi', 'daya', 'luas sapuan', 'betz', 'efisiensi', 'generator', 'induksi', 'terbarukan'],
  nyamuk: ['fermentasi', 'ragi', 'karbon dioksida', 'parasitisme', 'daur hidup', 'jentik', 'aedes', 'dengue', 'bioteknologi', 'suhu'],
  perahu: ['massa jenis', 'archimedes', 'gaya apung', 'gaya ke atas', 'tekanan hidrostatis', 'volume', 'mengapung', 'tenggelam', 'stabil'],
  roketair: ['tekanan', 'boyle', 'aksi', 'reaksi', 'newton', 'massa dorong', 'sirip', 'parabola', 'volume'],
  jembatan: ['gaya tekan', 'gaya tarik', 'segitiga', 'rangka', 'momen', 'menekuk', 'kaku', 'efisiensi', 'sambungan'],
  pesawat: ['usaha', 'tuas', 'katrol', 'keuntungan mekanis', 'lengan kuasa', 'lengan beban', 'titik tumpu', 'efisiensi', 'gesekan'],
  optik: ['lensa', 'cermin', 'pembiasan', 'pemantulan', 'fokus', 'bayangan nyata', 'bayangan maya', 'perbesaran', 'terbalik']
});
