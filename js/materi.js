/* Materi "Gali Konsep" yang diperluas ala buku sains, per misi.
   Bila sebuah misi punya entri di MATERI, kartu konsep Langkah 2 memakai materi ini,
   sedangkan teks konsep lama disimpan di m.konsepRingkas sebagai acuan Kak Nala (supaya prompt AI tetap ringkas). */

const SVG_WUJUD = `<svg viewBox="0 0 660 230" role="img" aria-label="Model partikel zat padat, cair, dan gas" class="svg-materi">
  <style>.wt{font:700 15px var(--font,system-ui);fill:#0f172a}.ws{font:500 12.5px var(--font,system-ui);fill:#5b6576}</style>
  ${[['Padat', 20, '#0d9488'], ['Cair', 240, '#2563eb'], ['Gas', 460, '#7c3aed']].map(([n, x, w], k) => {
    const isi = k === 0
      ? Array.from({ length: 25 }, (_, i) => `<circle cx="${x + 38 + (i % 5) * 31}" cy="${52 + Math.floor(i / 5) * 27}" r="12" fill="${w}"/>`).join('')
      : k === 1
        ? [[52, 150], [82, 158], [113, 150], [143, 157], [172, 151], [64, 126], [95, 130], [126, 125], [158, 130], [78, 102], [110, 105], [142, 101], [167, 108], [50, 178], [83, 182], [116, 177], [148, 182], [176, 178]].map(([a, b]) => `<circle cx="${x + a}" cy="${b}" r="12" fill="${w}"/>`).join('')
        : [[40, 50], [120, 44], [175, 80], [70, 110], [150, 140], [45, 170], [110, 180], [180, 175]].map(([a, b]) => `<circle cx="${x + a}" cy="${b}" r="12" fill="${w}"/>`).join('') +
          `<path d="M${x + 52} 62 l14 12 M${x + 132} 56 l-10 14 M${x + 82} 122 l16 -8 M${x + 162} 152 l-14 10" stroke="${w}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    return `<rect x="${x}" y="30" width="200" height="170" rx="14" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>${isi}
      <text class="wt" x="${x + 100}" y="20" text-anchor="middle">${n}</text>
      <text class="ws" x="${x + 100}" y="222" text-anchor="middle">${['rapat, teratur, hanya bergetar', 'rapat, bebas bergeser', 'renggang, bergerak cepat'][k]}</text>`;
  }).join('')}
</svg>`;

const SVG_SIKLUS = `<svg viewBox="0 0 640 330" role="img" aria-label="Enam perubahan wujud zat" class="svg-materi">
  <style>.st{font:800 17px var(--font,system-ui);fill:#fff}.sa{font:700 13.5px var(--font,system-ui)}.sp{fill:#c2410c}.sd{fill:#1d4ed8}</style>
  <defs>
    <marker id="pPanas" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#ea580c"/></marker>
    <marker id="pDingin" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#2563eb"/></marker>
  </defs>
  <rect x="250" y="16" width="140" height="52" rx="26" fill="#7c3aed"/><text class="st" x="320" y="48" text-anchor="middle">GAS</text>
  <rect x="40" y="250" width="150" height="52" rx="26" fill="#0d9488"/><text class="st" x="115" y="282" text-anchor="middle">PADAT</text>
  <rect x="450" y="250" width="150" height="52" rx="26" fill="#2563eb"/><text class="st" x="525" y="282" text-anchor="middle">CAIR</text>
  <path d="M190 268 H448" stroke="#ea580c" stroke-width="3" marker-end="url(#pPanas)"/><text class="sa sp" x="320" y="258" text-anchor="middle">mencair</text>
  <path d="M450 290 H192" stroke="#2563eb" stroke-width="3" marker-end="url(#pDingin)"/><text class="sa sd" x="320" y="314" text-anchor="middle">membeku</text>
  <path d="M500 248 L385 70" stroke="#ea580c" stroke-width="3" marker-end="url(#pPanas)"/><text class="sa sp" x="478" y="150">menguap</text>
  <path d="M365 72 L478 248" stroke="#2563eb" stroke-width="3" marker-end="url(#pDingin)"/><text class="sa sd" x="418" y="178" text-anchor="end">mengembun</text>
  <path d="M140 248 L255 70" stroke="#ea580c" stroke-width="3" marker-end="url(#pPanas)"/><text class="sa sp" x="96" y="150">menyublim</text>
  <path d="M275 72 L162 248" stroke="#2563eb" stroke-width="3" marker-end="url(#pDingin)"/><text class="sa sd" x="228" y="186">mengkristal</text>
  <text class="sa sp" x="18" y="24">→ menyerap kalor</text><text class="sa sd" x="18" y="44">→ melepas kalor</text>
</svg>`;

const SVG_ROKET = `<svg viewBox="0 -40 640 340" role="img" aria-label="Gaya aksi dan reaksi pada roket botol" class="svg-materi">
  <style>.rt{font:700 14px var(--font,system-ui);fill:#0f172a}.rs{font:500 12.5px var(--font,system-ui);fill:#5b6576}</style>
  <defs><marker id="pNaik" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#16a34a"/></marker><marker id="pTurun" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#dc2626"/></marker></defs>
  <g transform="translate(150 20)">
    <path d="M40 30 Q70 0 100 30 L100 190 Q100 205 85 205 L55 205 Q40 205 40 190 Z" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="3"/>
    <rect x="58" y="205" width="24" height="16" rx="3" fill="#f59e0b"/>
    <path d="M40 160 L14 205 L40 195 Z M100 160 L126 205 L100 195 Z" fill="#7c3aed"/>
    <rect x="43" y="140" width="54" height="62" rx="6" fill="#a5b4fc" opacity=".7"/>
    ${[[60, 60], [80, 80], [55, 100], [85, 115], [68, 125], [75, 50]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="5" fill="#94a3b8"/>`).join('')}
    <path d="M70 -10 V-45" stroke="#16a34a" stroke-width="5" marker-end="url(#pNaik)"/>
    <path d="M70 225 V270" stroke="#dc2626" stroke-width="5" marker-end="url(#pTurun)"/>
  </g>
  <text class="rt" x="250" y="22" style="fill:#16a34a">Reaksi: botol terdorong ke atas</text>
  <text class="rt" x="250" y="285" style="fill:#dc2626">Aksi: cairan + gas menyembur ke bawah</text>
  <text class="rs" x="300" y="95">gas CO₂ menumpuk di ruang kosong</text>
  <text class="rs" x="300" y="113">→ tekanan di dalam botol naik</text>
  <text class="rs" x="300" y="180">cuka + soda kue bereaksi</text>
  <text class="rs" x="300" y="198">(perubahan kimia → menghasilkan gas)</text>
  <path d="M296 104 H262 M296 189 H252" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>
</svg>`;

const gbr = (berkas, keterangan) => `<figure class="gbr-materi"><img src="assets/img/materi/${berkas}" alt="${keterangan.replace(/<[^>]+>/g, '')}" loading="lazy" onerror="this.closest('figure').remove()"><figcaption>${keterangan}</figcaption></figure>`;

const MATERI = {
  roket: `
  <div class="materi">
    <p class="pembuka">Ketika cuka dituangkan ke soda kue, campurannya langsung berbuih dan mendesis. Apakah itu sekadar cuka yang "bercampur", atau ada <b>zat baru</b> yang terbentuk? Jawaban pertanyaan inilah kunci agar roketmu meluncur tepat sasaran. Bacalah materi berikut sambil memikirkan rancangan roketmu.</p>
    <nav class="daftar-isi"><b>Isi materi</b>
      <a href="#" onclick="document.getElementById('mt-1').scrollIntoView({behavior:'smooth',block:'start'});return false">A. Materi & wujudnya</a><a href="#" onclick="document.getElementById('mt-2').scrollIntoView({behavior:'smooth',block:'start'});return false">B. Perubahan fisika</a><a href="#" onclick="document.getElementById('mt-3').scrollIntoView({behavior:'smooth',block:'start'});return false">C. Perubahan kimia</a><a href="#" onclick="document.getElementById('mt-4').scrollIntoView({behavior:'smooth',block:'start'});return false">D. Ciri-ciri reaksi kimia</a><a href="#" onclick="document.getElementById('mt-5').scrollIntoView({behavior:'smooth',block:'start'});return false">E. Reaksi cuka + soda kue</a><a href="#" onclick="document.getElementById('mt-6').scrollIntoView({behavior:'smooth',block:'start'});return false">F. Hukum kekekalan massa</a><a href="#" onclick="document.getElementById('mt-7').scrollIntoView({behavior:'smooth',block:'start'});return false">G. Pereaksi pembatas</a><a href="#" onclick="document.getElementById('mt-8').scrollIntoView({behavior:'smooth',block:'start'});return false">H. Dari gas menjadi gerak</a><a href="#" onclick="document.getElementById('mt-9').scrollIntoView({behavior:'smooth',block:'start'});return false">I. Ringkasan & uji diri</a>
    </nav>

    <section id="mt-1"><h4>A. Materi dan wujudnya</h4>
      <p><b>Materi</b> adalah segala sesuatu yang memiliki massa dan menempati ruang: air, udara, garam, botol plastik, bahkan tubuhmu. Materi tersusun atas partikel-partikel yang sangat kecil dan selalu bergerak. Cara partikel tersusun dan bergerak menentukan <b>wujud zat</b>.</p>
      ${SVG_WUJUD}
      <p class="ket-gbr">Gambar 1. Model partikel zat padat, cair, dan gas.</p>
      <table class="tabel-materi"><thead><tr><th>Sifat</th><th>Padat</th><th>Cair</th><th>Gas</th></tr></thead><tbody>
        <tr><td>Bentuk</td><td>tetap</td><td>mengikuti wadah</td><td>mengikuti wadah</td></tr>
        <tr><td>Volume</td><td>tetap</td><td>tetap</td><td>mengisi seluruh ruang</td></tr>
        <tr><td>Bisa dimampatkan?</td><td>hampir tidak</td><td>hampir tidak</td><td><b>mudah</b></td></tr>
        <tr><td>Contoh di misi</td><td>soda kue</td><td>cuka, air</td><td>karbon dioksida (CO₂)</td></tr>
      </tbody></table>
      <p>Perhatikan baris terakhir: gas <b>mudah dimampatkan</b> dan selalu berusaha memenuhi ruang. Bila gas terus bertambah di dalam botol yang tertutup, partikel gas makin sering menumbuk dinding botol, sehingga <b>tekanan</b> di dalam botol naik. Sifat inilah yang nanti mendorong roketmu.</p>
    </section>

    <section id="mt-2"><h4>B. Perubahan fisika</h4>
      <p><b>Perubahan fisika</b> adalah perubahan materi yang <b>tidak menghasilkan zat baru</b>. Yang berubah hanya wujud, bentuk, ukuran, atau letaknya, sedangkan jenis zatnya tetap sama. Biasanya perubahan fisika dapat dibalik (<i>reversibel</i>).</p>
      ${gbr('materi-fisika.jpg', 'Gambar 2. Contoh perubahan fisika: es mencair, garam tambak terbentuk karena air laut menguap, lilin meleleh lalu membeku, dan gula larut dalam teh.')}
      <p>Contoh perubahan fisika yang paling sering kita temui adalah <b>perubahan wujud</b>. Ada enam perubahan wujud; tiga di antaranya menyerap kalor dan tiga lainnya melepas kalor.</p>
      ${SVG_SIKLUS}
      <p class="ket-gbr">Gambar 3. Enam perubahan wujud zat (oranye: menyerap kalor, biru: melepas kalor).</p>
      <p>Selain perubahan wujud, <b>melarutkan</b> (gula dalam teh), <b>mencampur</b>, <b>mengencerkan</b>, <b>memotong</b>, dan <b>membengkokkan</b> juga termasuk perubahan fisika. Air garam tetap mengandung garam dan air; buktinya, bila airnya diuapkan di tambak, garamnya muncul kembali.</p>
      <div class="kotak-misi"><b>🔗 Di misimu:</b> saat kamu <b>mengencerkan cuka 20%</b> (5 mL cuka + 20 mL air), tidak ada zat baru yang terbentuk. Asam asetatnya tetap asam asetat, hanya kadarnya turun dari ±20% menjadi ±4%. Pengenceran adalah <b>perubahan fisika</b>.</div>
    </section>

    <section id="mt-3"><h4>C. Perubahan kimia</h4>
      <p><b>Perubahan kimia</b> adalah perubahan materi yang <b>menghasilkan zat baru</b> dengan sifat yang berbeda dari zat asalnya. Perubahan kimia disebut juga <b>reaksi kimia</b> dan umumnya sulit atau tidak dapat dibalik.</p>
      ${gbr('materi-kimia.jpg', 'Gambar 4. Contoh perubahan kimia: jangkar kapal berkarat, kayu terbakar, pisang membusuk, dan kedelai menjadi tempe karena fermentasi.')}
      <table class="tabel-materi"><thead><tr><th>Peristiwa</th><th>Zat asal</th><th>Zat baru</th></tr></thead><tbody>
        <tr><td>Besi berkarat (jangkar, paku)</td><td>besi, oksigen, air</td><td>karat (besi oksida)</td></tr>
        <tr><td>Kayu atau kertas terbakar</td><td>kayu, oksigen</td><td>abu, asap, CO₂, uap air</td></tr>
        <tr><td>Buah membusuk</td><td>daging buah</td><td>zat berbau, gas</td></tr>
        <tr><td>Kedelai menjadi tempe</td><td>kedelai</td><td>tempe (dicerna jamur <i>Rhizopus</i>)</td></tr>
        <tr><td>Fotosintesis</td><td>CO₂, air</td><td>glukosa, oksigen</td></tr>
        <tr><td><b>Cuka + soda kue</b></td><td>asam asetat, natrium bikarbonat</td><td>natrium asetat, air, <b>gas CO₂</b></td></tr>
      </tbody></table>
      <div class="kotak-tahukah"><b>💡 Tahukah kamu?</b> Terasi, kecap, dan ikan peda dari pesisir kita juga dibuat lewat perubahan kimia, yaitu <b>fermentasi</b>. Mikroorganisme mengubah protein menjadi zat-zat baru yang memberi rasa dan aroma khas.</div>
    </section>

    <section id="mt-4"><h4>D. Ciri-ciri reaksi kimia</h4>
      <p>Kita tidak bisa melihat partikel secara langsung. Namun, terbentuknya zat baru biasanya ditandai oleh gejala yang dapat diamati:</p>
      <ol class="ciri">
        <li><b>Terbentuk gas</b>: muncul gelembung atau buih. <i>Contoh: cuka + soda kue, tablet vitamin dalam air.</i></li>
        <li><b>Perubahan suhu</b>: campuran menjadi lebih panas (<i>eksoterm</i>) atau lebih dingin (<i>endoterm</i>). <i>Contoh: kayu terbakar (panas), cuka + soda kue (sedikit dingin).</i></li>
        <li><b>Perubahan warna</b>. <i>Contoh: apel yang digigit menjadi cokelat, kunyit menjadi merah di air sabun.</i></li>
        <li><b>Terbentuk endapan</b>: zat padat baru muncul dari dua larutan bening.</li>
        <li><b>Timbul bau</b>. <i>Contoh: makanan basi, telur busuk.</i></li>
      </ol>
      ${gbr('materi-balon.jpg', 'Gambar 5. Percobaan balon: soda kue di dalam balon dijatuhkan ke cuka. Buih muncul, balon mengembang oleh gas CO₂, dan botol terasa lebih dingin.')}
      <div class="kotak-coba"><b>🧪 Coba di rumah (dengan orang tua):</b> masukkan 2 sendok teh soda kue ke dalam balon. Isi botol plastik kecil dengan 50 mL cuka dapur, pasang mulut balon pada leher botol, lalu tegakkan balonnya agar soda kue jatuh. Amati buihnya, sentuh dinding botol, dan perhatikan balonnya. Ciri reaksi kimia apa saja yang kamu temukan?</div>
      <div class="kotak-miskon"><b>⚠️ Hati-hati menyimpulkan!</b> Gelembung tidak selalu berarti reaksi kimia. Air yang mendidih juga bergelembung, tetapi gelembungnya hanyalah uap air (perubahan fisika). Ciri-ciri di atas adalah <i>petunjuk</i>, sedangkan bukti sesungguhnya adalah <b>terbentuknya zat baru</b>.</div>
    </section>

    <section id="mt-5"><h4>E. Reaksi cuka dan soda kue</h4>
      <p>Cuka mengandung <b>asam asetat</b> (CH₃COOH), sedangkan soda kue adalah <b>natrium bikarbonat</b> (NaHCO₃). Zat-zat yang bereaksi disebut <b>pereaksi (reaktan)</b>, dan zat baru yang terbentuk disebut <b>hasil reaksi (produk)</b>. Reaksinya ditulis dalam <b>persamaan reaksi</b>:</p>
      <p class="rumus">CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑<br><small>asam asetat + natrium bikarbonat → natrium asetat + air + karbon dioksida</small></p>
      <p>Tanda panah dibaca "bereaksi menghasilkan", dan tanda ↑ berarti hasilnya berupa gas yang lepas. Di dalam reaksi, atom-atom <b>tidak hilang dan tidak muncul dari ketiadaan</b>; atom-atom itu hanya <b>disusun ulang</b> membentuk zat baru. Hitunglah sendiri:</p>
      <table class="tabel-materi angka"><thead><tr><th>Atom</th><th>Di sebelah kiri (pereaksi)</th><th>Di sebelah kanan (hasil)</th></tr></thead><tbody>
        <tr><td>C (karbon)</td><td>2 + 1 = 3</td><td>2 + 0 + 1 = 3</td></tr>
        <tr><td>H (hidrogen)</td><td>4 + 1 = 5</td><td>3 + 2 + 0 = 5</td></tr>
        <tr><td>O (oksigen)</td><td>2 + 3 = 5</td><td>2 + 1 + 2 = 5</td></tr>
        <tr><td>Na (natrium)</td><td>0 + 1 = 1</td><td>1 + 0 + 0 = 1</td></tr>
      </tbody></table>
      <p>Reaksi ini menyerap sedikit kalor dari sekitarnya (<b>endoterm</b>), sehingga botol terasa lebih dingin. Natrium asetat yang terbentuk larut dalam air dan tidak terlihat, tetapi gas CO₂ terlihat jelas sebagai buih.</p>
    </section>

    <section id="mt-6"><h4>F. Hukum kekekalan massa</h4>
      <p>Ilmuwan Prancis <b>Antoine Lavoisier</b> (1789) menemukan bahwa <b>massa zat sebelum dan sesudah reaksi selalu sama</b> bila tidak ada zat yang keluar atau masuk (sistem tertutup). Karena atom hanya disusun ulang, massanya pun tetap.</p>
      <p class="rumus">60 g asam asetat + 84 g soda kue = 82 g natrium asetat + 18 g air + 44 g CO₂<br><small>144 g pereaksi = 144 g hasil reaksi</small></p>
      <div class="kotak-tahukah"><b>💡 Mengapa timbangan menunjukkan massa berkurang?</b> Bila cuka dan soda kue dicampur di gelas terbuka di atas timbangan, angkanya turun. Massa tidak hilang; gas CO₂ terlepas ke udara. Ulangi di dalam botol bersumbat (atau dengan balon), maka massanya tetap.</div>
    </section>

    <section id="mt-7"><h4>G. Perbandingan pereaksi dan pereaksi pembatas</h4>
      <p>Pereaksi selalu bereaksi dengan <b>perbandingan massa yang tetap</b>: setiap <b>60 g asam asetat tepat bereaksi dengan 84 g soda kue</b>, atau kira-kira <b>5 g asam : 7 g soda kue</b>.</p>
      <p>Bayangkan membuat roti lapis: setiap roti lapis butuh 2 lembar roti dan 1 lembar keju. Bila kamu punya 10 lembar roti tetapi hanya 3 keju, kamu hanya bisa membuat 3 roti lapis, dan 4 lembar roti tersisa. Keju adalah <b>pembatas</b>.</p>
      <p>Hal yang sama terjadi di botol roketmu. Pereaksi yang <b>habis lebih dulu</b> disebut <b>pereaksi pembatas</b>; dialah yang menentukan berapa banyak gas CO₂ yang terbentuk. Pereaksi lainnya bersisa dan terbuang percuma.</p>
      <table class="tabel-materi angka"><thead><tr><th>Cuka dapur 5%</th><th>Asam asetat</th><th>Soda kue</th><th>Pereaksi pembatas</th><th>Yang bersisa</th></tr></thead><tbody>
        <tr><td>100 mL</td><td>± 5 g</td><td>4 g</td><td>soda kue</td><td>± 2,1 g asam</td></tr>
        <tr><td>100 mL</td><td>± 5 g</td><td>7 g</td><td>(pas, tidak ada sisa)</td><td>–</td></tr>
        <tr><td>100 mL</td><td>± 5 g</td><td>10 g</td><td>cuka</td><td>± 3 g soda kue</td></tr>
      </tbody></table>
      <div class="kotak-misi"><b>🔗 Di misimu:</b> juri menilai <b>hemat bahan</b>, yaitu pereaksi yang terbuang paling banyak 20%. Gunakan perbandingan 5 g asam : 7 g soda kue untuk memperkirakan takaran yang pas, lalu buktikan dengan uji di laboratorium maya.</div>
    </section>

    <section id="mt-8"><h4>H. Dari gas menjadi gerak roket</h4>
      <p>Perubahan kimia menghasilkan gas CO₂. Di dalam botol yang tertutup, gas itu menumpuk sehingga <b>tekanan</b> naik. Saat tekanan cukup besar, sumbat terlepas dan campuran cairan beserta gas menyembur keluar ke bawah. Menurut <b>Hukum III Newton</b>, setiap <b>aksi</b> menimbulkan <b>reaksi</b> yang sama besar dan berlawanan arah, sehingga botol terdorong ke atas.</p>
      ${SVG_ROKET}
      <p class="ket-gbr">Gambar 6. Gaya aksi dan reaksi pada roket botol.</p>
      <ul>
        <li>Gas terlalu sedikit (pereaksi kurang) → tekanan kecil → roket jatuh dekat.</li>
        <li>Cairan terlalu sedikit → "massa dorong" kecil; cairan terlalu banyak → ruang gas sempit.</li>
        <li>Reaksi terlalu cepat → busa meluap sebelum botol tertutup, gas terbuang. Membungkus soda kue dengan tisu <b>menunda reaksi</b>.</li>
      </ul>
    </section>

    <section id="mt-9"><h4>I. Ringkasan</h4>
      <table class="tabel-materi"><thead><tr><th></th><th>Perubahan fisika</th><th>Perubahan kimia</th></tr></thead><tbody>
        <tr><td>Zat baru</td><td>tidak terbentuk</td><td><b>terbentuk</b></td></tr>
        <tr><td>Dapat dibalik?</td><td>umumnya mudah</td><td>umumnya sulit / tidak</td></tr>
        <tr><td>Tanda</td><td>wujud, bentuk, atau ukuran berubah</td><td>gas, suhu, warna, endapan, bau</td></tr>
        <tr><td>Contoh di misi</td><td>mengencerkan cuka 20%, soda kue larut</td><td>cuka + soda kue menghasilkan CO₂</td></tr>
      </tbody></table>
      <p class="pengingat">⚠️ Keselamatan: pakai kacamata pelindung, luncurkan di lapangan terbuka, jangan arahkan roket ke orang, gunakan botol plastik (bukan kaca), jangan memakai cuka biang, dan encerkan cuka 20% dengan menuang <b>cuka ke dalam air</b>, bukan sebaliknya.</p>
      <details class="uji-diri"><summary>🧠 Uji dirimu (klik untuk membuka)</summary>
        <ol>
          <li>Doni mencampur cuka dengan air, lalu menuangkannya ke soda kue. Manakah yang merupakan perubahan fisika dan manakah perubahan kimia? Jelaskan buktinya.<details><summary>Petunjuk</summary>Tanyakan pada setiap langkah: apakah terbentuk zat baru?</details></li>
          <li>Rina menimbang gelas berisi cuka dan soda kue sebelum dan sesudah bereaksi. Massanya turun 4 g. Apakah hukum kekekalan massa salah?<details><summary>Petunjuk</summary>Ke mana perginya gas yang terbentuk?</details></li>
          <li>Kamu memakai 200 mL cuka dapur 5% dan 20 g soda kue. Pereaksi mana yang menjadi pembatas?<details><summary>Petunjuk</summary>200 mL cuka 5% mengandung ± 10 g asam. Berapa gram soda kue yang dibutuhkan bila perbandingannya 5 : 7?</details></li>
          <li>Mengapa menambah soda kue terus-menerus belum tentu membuat roket terbang lebih jauh?<details><summary>Petunjuk</summary>Pikirkan pereaksi pembatas dan ruang gas di dalam botol.</details></li>
        </ol>
      </details>
    </section>
  </div>`
};

// Kata kunci tambahan untuk penilai & tutor lokal, sesuai materi yang diperluas
const KATA_MATERI = {
  roket: ['perubahan fisika', 'fisika', 'partikel', 'wujud', 'menguap', 'larut', 'mengencerkan', 'pengenceran', 'reaktan', 'produk', 'persamaan reaksi', 'kekekalan massa', 'lavoisier', 'endoterm', 'perbandingan']
};

// Pasang materi ke misi: konsep lama disimpan sebagai konsepRingkas (acuan Kak Nala), kata kunci ditambah.
function pasangMateri(materi, kata = {}) {
  Object.entries(materi).forEach(([id, html]) => {
    const m = MISI.find(x => x.id === id);
    if (m && !m.konsepRingkas) { m.konsepRingkas = m.konsep; m.konsep = html; m.kataKunci = [...new Set([...m.kataKunci, ...(kata[id] || [])])]; }
  });
}
pasangMateri(MATERI, KATA_MATERI);

/* ---------- Cetakan materi ala buku (dipakai js/materi-7.js, -8.js, -9.js) ---------- */
const mTabel = (kepala, baris, angka) => `<table class="tabel-materi${angka ? ' angka' : ''}"><thead><tr>${kepala.map(k => `<th>${k}</th>`).join('')}</tr></thead><tbody>${baris.map(b => `<tr>${b.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const mKotak = (jenis, isi) => `<div class="kotak-${jenis}"><b>${{ misi: '🔗 Di misimu:', tahukah: '💡 Tahukah kamu?', coba: '🧪 Coba sendiri:', miskon: '⚠️ Hati-hati, ini sering keliru!' }[jenis]}</b> ${isi}</div>`;
const mRumus = (isi, ket) => `<p class="rumus">${isi}${ket ? `<br><small>${ket}</small>` : ''}</p>`;
const mGbr = (svg, ket) => `${svg}<p class="ket-gbr">${ket}</p>`;
function bukuMateri(id, { pembuka, bagian, ringkas, uji, aman }) {
  const huruf = i => String.fromCharCode(65 + i);
  const semua = [...bagian, ['Ringkasan & uji diri', `${ringkas ? mTabel(ringkas[0], ringkas.slice(1)) : ''}${aman ? `<p class="pengingat">⚠️ Keselamatan: ${aman}</p>` : ''}
    <details class="uji-diri"><summary>🧠 Uji dirimu (klik untuk membuka)</summary><ol>${uji.map(([q, p]) => `<li>${q}<details><summary>Petunjuk</summary>${p}</details></li>`).join('')}</ol></details>`]];
  return `<div class="materi"><p class="pembuka">${pembuka}</p>
    <nav class="daftar-isi"><b>Isi materi</b>${semua.map(([j], i) => `<a href="#" onclick="document.getElementById('mt-${id}-${i}').scrollIntoView({behavior:'smooth',block:'start'});return false">${huruf(i)}. ${j}</a>`).join('')}</nav>
    ${semua.map(([j, isi], i) => `<section id="mt-${id}-${i}"><h4>${huruf(i)}. ${j}</h4>${isi}</section>`).join('')}</div>`;
}
