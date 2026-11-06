/* =========================================================
   NalarSTEM — Buku Panduan Guru (#/guru)
   Panduan mengoperasikan aplikasi selengkapnya + contoh lengkap
   Misi Roket Cuka & Soda Kue. Tampil seperti buku dan siap dicetak
   (A4, satu bab per halaman baru). Angka contoh uji dihitung langsung
   oleh mesin simulasi agar selalu sama dengan yang dilihat murid.
   ========================================================= */

const EDISI_BUKU = 'Edisi November 2026';
const PERAN_GURU = [
  'Memantik dengan kisah lokal; pastikan murid membedakan kriteria dan kendala.',
  'Mengonfirmasi konsep; meluruskan miskonsepsi yang muncul.',
  'Memeriksa kelengkapan variabel dan pola "Jika–maka–karena".',
  'Berkeliling; bertanya "variabel apa yang kamu ubah?"',
  'Memfasilitasi diskusi kelompok untuk membandingkan data.',
  'Memandu presentasi CER antarkelompok dan refleksi.',
  'Memeriksa cek keselamatan dan alat, mendampingi uji di luar kelas, lalu memfasilitasi diskusi hasil nyata vs simulasi.'
];

// Rangkaian uji contoh misi Roket: tiap uji hanya mengubah SATU variabel dari uji sebelumnya.
const CONTOH_UJI_ROKET = [
  [{}, 'Rancangan awal (bawaan aplikasi)'],
  [{ sudut: 45 }, 'Roket tegak hanya naik-turun; dimiringkan agar bergerak mendatar'],
  [{ cuka: 200 }, 'Gas terlalu sedikit; cuka ditambah'],
  [{ soda: 14 }, 'Masih ada cuka terbuang 29%; soda kue ditambah agar seimbang'],
  [{ cuka: 300 }, 'Ingin gas lebih banyak; cuka ditambah lagi'],
  [{ soda: 21 }, 'Soda kue menjadi pembatas; disamakan perbandingannya'],
  [{ botol: '1500' }, 'Busa meluap karena ruang gas sempit; botol diperbesar'],
  [{ bungkus: 'tisu' }, 'Gas bocor saat menutup botol; soda kue dibungkus tisu'],
  [{ kadar: 'pekat20encer' }, 'Mencari bahan yang lebih murah: cuka 20% yang diencerkan'],
  [{ soda: 17 }, 'Soda kue tersisa 20%; dikurangi agar seimbang dan hemat']
];

function hitungContohRoket() {
  let v = { cuka: 100, soda: 10, kadar: 'dapur', bungkus: 'langsung', botol: '600', sudut: 90 };
  return CONTOH_UJI_ROKET.map(([ubah, alasan], i) => {
    v = { ...v, ...ubah };
    const h = hitungRoket(v), k = kriteriaRoket(v, h);
    return { no: i + 1, v: { ...v }, h, k, lulus: k.filter(x => x.lulus).length, ubah: Object.keys(ubah), alasan };
  });
}

function halGuru() {
  setKonteksTutor({ jenis: 'umum' });
  const angka = x => String(x).replace('.', ',');
  const rp = x => 'Rp ' + Math.round(x).toLocaleString('id-ID');
  const U = hitungContohRoket();
  const terbaik = U[7], hemat = U[9];
  const mR = MISI.find(m => m.id === 'roket'), nR = NYATA.roket, aR = APERSEPSI.roket, tR = TES_MISI.roket;
  const nSoal = tR.A.length, nKonsep = tR.A.filter(q => q.ind === 'konsep').length;
  const labelV = { cuka: 'Volume cuka', soda: 'Soda kue', kadar: 'Jenis cuka', bungkus: 'Cara memasukkan soda', botol: 'Botol', sudut: 'Sudut' };
  const teksV = (id, x) => id === 'cuka' ? x + ' mL' : id === 'soda' ? x + ' g' : id === 'sudut' ? x + '°' : id === 'botol' ? (x === '1500' ? '1,5 L' : '600 mL')
    : id === 'bungkus' ? (x === 'tisu' ? 'tisu' : 'langsung') : ({ dapur: 'dapur 5%', encer: 'dapur 2,5%', pekat20encer: '20% + air 1:4', pekat20: '20% murni' })[x];

  // ---------- komponen kecil ----------
  const hp = (berkas, ket) => `<figure class="bk-hp"><div class="bk-hp-layar">${gambar('panduan/' + berkas, ket, '', false)}</div><figcaption>${ket}</figcaption></figure>`;
  const foto = (berkas, ket) => `<figure class="bk-foto">${gambar('panduan/' + berkas, ket, '', false)}<figcaption>${ket}</figcaption></figure>`;
  const kotak = (jenis, judul, isi) => `<div class="bk-kotak ${jenis}"><b>${judul}</b>${isi}</div>`;
  const langkah = arr => `<ol class="bk-langkah">${arr.map(x => `<li>${x}</li>`).join('')}</ol>`;
  const tombol = t => `<span class="bk-tbl">${t}</span>`;
  const bab = (no, ikon, judul, sub, isi) => `<section class="bk-hal bk-bab" id="bk-bab-${no}">
    <header class="bk-kepala-bab"><span class="bk-no-bab">${typeof no === 'number' ? 'BAB ' + no : 'LAMPIRAN'}</span><h2>${ikon} ${judul}</h2><p>${sub}</p></header>${isi}
    <footer class="bk-kaki-hal">Buku Panduan Guru NalarSTEM · ${EDISI_BUKU}</footer></section>`;
  const jawab = (baik, lemah, saran) => `<div class="bk-jawab"><div class="baik"><b>✅ Contoh jawaban kuat (skor 4)</b><p>${baik}</p></div>
    <div class="lemah"><b>🌱 Contoh jawaban yang perlu dibimbing (skor 1–2)</b><p>${lemah}</p></div></div>${saran ? `<p class="bk-saran">🧑‍🏫 <b>Tindak lanjut guru:</b> ${saran}</p>` : ''}`;
  const obrolan = baris => `<div class="bk-obrolan">${baris.map(([siapa, t]) => `<div class="${siapa === 'm' ? 'murid' : 'nala'}"><small>${siapa === 'm' ? 'Murid' : 'Kak Nala'}</small><p>${t}</p></div>`).join('')}</div>`;

  const DAFTAR = [
    [1, '🧪', 'Mengenal NalarSTEM'], [2, '🛠️', 'Persiapan Sebelum Mengajar'], [3, '🗺️', 'Alur Pembelajaran Satu Misi'],
    [4, '🎒', 'Panduan Fitur untuk Murid'], [5, '📝', 'Mode Tes Awal & Tes Akhir'], [6, '🧭', 'Peta Jejak Berpikir'],
    [7, '📏', 'Penilaian'], [8, '🚀', 'Contoh Lengkap: Misi Roket Cuka & Soda Kue'], [9, '🧯', 'Mengatasi Masalah'],
    ['L', '📎', 'Lampiran: Kisi-kisi, Lembar Observasi & Ceklis Keselamatan']
  ];

  // ---------- tabel misi per kelas ----------
  const tabelMisi = [7, 8, 9].map(k => {
    const daftar = MISI.filter(m => kelasMisi(m)[0] === k);
    return `<tr class="bk-sub"><td colspan="3"><b>Kelas ${k}</b> · ${daftar.length} misi</td></tr>` + daftar.map(m =>
      `<tr><td>${m.ikon} <b>${esc(m.judul)}</b></td><td>${esc((m.kelas.split('·')[1] || '').trim())}</td><td>${esc(NYATA[m.id] ? NYATA[m.id].waktu : '')}</td></tr>`).join('');
  }).join('');

  // ---------- tabel uji contoh ----------
  const tabelUji = `<div class="tabel-gulir"><table class="tabel bk-tabel-uji"><thead><tr><th>Uji</th><th>Cuka</th><th>Jenis</th><th>Soda</th><th>Cara</th><th>Botol</th><th>Sudut</th><th>Jarak</th><th>Pembatas / terbuang</th><th>Biaya</th><th>Kriteria</th></tr></thead><tbody>
    ${U.map(u => `<tr class="${u.lulus === u.k.length ? 'lulus' : ''}"><td><b>${u.no}</b></td>${['cuka', 'kadar', 'soda', 'bungkus', 'botol', 'sudut'].map(id => `<td class="${u.ubah.includes(id) ? 'diubah' : ''}">${teksV(id, u.v[id])}</td>`).join('')}
      <td><b>${angka(u.h.jarak)} m</b></td><td class="kecil">${esc(u.h.pembatas)} · ${esc(u.h.sisa)}${u.h._meluap ? ' · <b class="merah">busa meluap</b>' : ''}</td><td>${rp(u.h.biaya)}</td><td><b>${u.lulus}/${u.k.length}</b></td></tr>`).join('')}
    </tbody></table></div>
    <p class="kecil redup">Sel kuning = satu-satunya variabel yang diubah dari uji sebelumnya (uji adil). Baris hijau = semua ${U[0].k.length} kriteria &amp; kendala terpenuhi: ${U[0].k.map(k => esc(k.teks || k.nama || '')).join(' · ')}.</p>`;

  APP.innerHTML = `<div class="buku">
  <div class="bk-alat no-print">
    <span>📘 <b>Buku Panduan Guru</b> · ${DAFTAR.length - 1} bab + lampiran</span>
    <span class="bk-alat-tombol"><button type="button" class="tombol" data-ke="bk-isi">📑 Daftar isi</button><button type="button" class="tombol utama" id="bCetakBuku">🖨️ Cetak / simpan PDF</button></span>
  </div>

  <!-- ================= SAMPUL ================= -->
  <section class="bk-hal bk-sampul">
    ${gambar('hero.jpg', '', 'bk-sampul-latar', false)}
    <div class="bk-sampul-isi">
      <div class="bk-merek">${gambar('logo.jpg', '', '', false)}<span>Nalar<b>STEM</b></span></div>
      <span class="bk-label">Buku Panduan Guru</span>
      <h1>Mengajar IPA dengan <span>Bernalar</span></h1>
      <p class="bk-sub-sampul">Panduan lengkap mengoperasikan NalarSTEM — laboratorium IPA STEM dengan AI tutor Kak Nala — disertai contoh utuh <b>Misi Roket Cuka &amp; Soda Kue</b>.</p>
      <div class="bk-sampul-nala">${gambar('kak-nala.jpg', 'Kak Nala', '', false)}<div><b>Bersama Kak Nala</b><small>AI tutor yang bertanya balik</small></div></div>
      <div class="bk-sampul-kaki"><b>Bayu Setiadji, S.Pd., Gr.</b><span>SMP Negeri 3 Besuki, Situbondo · ${EDISI_BUKU}</span><span>nalarstem.logisains.my.id</span></div>
    </div>
  </section>

  <!-- ================= PENGANTAR & DAFTAR ISI ================= -->
  <section class="bk-hal" id="bk-isi">
    <h2 class="bk-judul-polos">Kata Pengantar</h2>
    <p>Bapak/Ibu Guru yang baik, buku ini disusun agar siapa pun dapat menjalankan NalarSTEM di kelas tanpa pelatihan khusus. Isinya mengikuti urutan kerja guru: mengenal aplikasi, menyiapkan akun dan kelas, menjalankan misi bersama murid, membuka tes, membaca jejak berpikir, sampai menilai.</p>
    <p>Bab 8 menyajikan <b>satu contoh utuh</b> — Misi Roket Cuka &amp; Soda Kue — lengkap dengan rencana pertemuan, contoh jawaban murid, contoh percakapan dengan Kak Nala, dan data uji yang dihitung langsung oleh mesin simulasi aplikasi. Contoh ini dapat ditiru untuk ${MISI.length - 1} misi lainnya karena alurnya sama.</p>
    <div class="bk-cara-baca">
      <div><span class="bk-tbl">▶ Uji Rancangan</span><small>Tulisan seperti ini adalah tombol yang ada di aplikasi.</small></div>
      <div><span class="bk-ikon-kotak tips">💡</span><small>Kotak kuning: tips praktis dari kelas.</small></div>
      <div><span class="bk-ikon-kotak awas">⚠️</span><small>Kotak merah: hal yang wajib diperhatikan.</small></div>
      <div><span class="bk-ikon-kotak info">ℹ️</span><small>Kotak hijau: informasi tambahan.</small></div>
    </div>
    <h2 class="bk-judul-polos">Daftar Isi</h2>
    <ol class="bk-daftar-isi">${DAFTAR.map(([n, ik, j]) => `<li><a href="#" data-ke="bk-bab-${n}"><span>${typeof n === 'number' ? 'Bab ' + n : 'Lampiran'}</span><b>${ik} ${j}</b></a></li>`).join('')}</ol>
    <footer class="bk-kaki-hal">Buku Panduan Guru NalarSTEM · ${EDISI_BUKU}</footer>
  </section>

  <!-- ================= BAB 1 ================= -->
  ${bab(1, '🧪', 'Mengenal NalarSTEM', 'Apa, untuk siapa, dan bagaimana aplikasi ini melatih berpikir kritis.', `
    <div class="bk-dua">
      <div>
        <h3>1.1 Apa itu NalarSTEM?</h3>
        <p>NalarSTEM adalah <b>laboratorium IPA STEM di HP</b> untuk murid SMP Fase D. Murid memecahkan masalah sehari-hari di lingkungannya — banjir rob, ikan asin yang lama kering, lomba roket — melalui <b>${MISI.length} misi</b>. Di setiap misi murid memahami masalah, menggali konsep, merancang, menguji di laboratorium maya, menganalisis data, menyimpulkan, lalu mewujudkannya di dunia nyata.</p>
        <p>Aplikasi ini <b>gratis</b>, dibuka lewat peramban (Chrome) di alamat <b>nalarstem.logisains.my.id</b>, tidak memerlukan akun murid, dan tetap bisa dibuka tanpa internet setelah dipasang.</p>
      </div>
      ${hp('ss-beranda.jpg', 'Beranda NalarSTEM di HP murid')}
    </div>
    <h3>1.2 Tujuan dan model pembelajaran</h3>
    <p>NalarSTEM melatih <b>kemampuan berpikir kritis</b> melalui pembelajaran IPA berbasis <b>STEM</b> dengan model <b>PjBL-STEM / Engineering Design Process (EDP)</b>. Kak Nala berperan sebagai <i>scaffolding</i> Sokratik: menuntun dengan pertanyaan, bukan memberi jawaban.</p>
    <h3>1.3 Enam indikator berpikir kritis yang dilatih</h3>
    <div class="bk-indikator">${INDIKATOR.map(I => `<div style="--c:${I.warna}"><b>${I.nama}</b><small>${I.arti}</small></div>`).join('')}</div>
    <h3>1.4 Daftar misi per kelas</h3>
    <div class="tabel-gulir"><table class="tabel"><thead><tr><th>Misi</th><th>Materi</th><th>Waktu praktik nyata</th></tr></thead><tbody>${tabelMisi}</tbody></table></div>
    <h3>1.5 Kenalan dengan Kak Nala</h3>
    <div class="bk-dua">
      <div>
        <p>Kak Nala adalah AI tutor yang memakai <b>Gemini (Google)</b>. Ia bertugas:</p>
        <ul><li><b>Menjawab pertanyaan</b> murid dengan pertanyaan balik yang menuntun.</li>
          <li><b>Memeriksa lembar kerja</b> tiap langkah dan memberi skor rubrik 1–4 beserta saran.</li>
          <li><b>Meninjau rencana kerja</b> praktik nyata, dengan mengutamakan keselamatan.</li></ul>
        <p>Setiap jawaban diberi tanda sumbernya: <b>✨ AI Gemini</b>, <b>🧠 Memori Kak Nala</b> (jawaban AI sebelumnya untuk pertanyaan mirip), atau <b>⚙️ Tutor lokal</b> (pertanyaan pemantik dan rubrik bawaan). Jika kuota AI habis, aplikasi berpindah otomatis ke tingkat berikutnya sehingga <b>kelas tidak pernah macet</b>.</p>
        ${kotak('info', 'ℹ️ Yang tidak memakai AI', '<p>Laboratorium maya, materi Gali Konsep, Mode Tes, Uji Nalar, Peta Jejak Guru, dan portofolio berjalan normal walaupun AI sedang tidak tersedia.</p>')}
      </div>
      ${hp('ss-kaknala.jpg', 'Kak Nala menuntun dengan pertanyaan balik')}
    </div>`)}

  <!-- ================= BAB 2 ================= -->
  ${bab(2, '🛠️', 'Persiapan Sebelum Mengajar', 'Cukup dilakukan sekali di awal semester, ± 15 menit.', `
    <h3>2.1 Perangkat yang dibutuhkan</h3>
    <div class="tabel-gulir"><table class="tabel"><tbody>
      <tr><td><b>HP murid</b></td><td>Android/iOS dengan peramban Chrome, Edge, atau Safari terbaru. Satu HP per murid atau <b>satu HP per 2–3 murid</b> (disarankan, karena diskusi kelompok justru menguatkan nalar).</td></tr>
      <tr><td><b>Internet</b></td><td>Dibutuhkan untuk Kak Nala versi AI, mengirim jejak ke guru, dan Mode Tes. Lab maya dan materi tetap jalan tanpa internet.</td></tr>
      <tr><td><b>Laptop/HP guru</b></td><td>Untuk membuka Peta Jejak Guru dan Mode Tes. Proyektor membantu saat demonstrasi.</td></tr>
    </tbody></table></div>
    <h3>2.2 Memasang aplikasi di HP (disarankan)</h3>
    ${langkah([`Buka <b>nalarstem.logisains.my.id</b> di Chrome.`, `Ketuk ${tombol('📲 Pasang aplikasi')} di bagian atas, atau menu ⋮ Chrome → <b>Tambahkan ke layar utama</b>.`, `Ikon NalarSTEM muncul di layar HP dan dapat dibuka seperti aplikasi biasa, termasuk saat sinyal lemah.`])}
    ${kotak('tips', '💡 Tips', '<p>Minta murid membuka aplikasi sekali saat ada Wi-Fi sekolah agar semua materi dan gambar tersimpan di HP. Bila muncul pemberitahuan <b>“✨ Versi baru NalarSTEM sudah tersedia”</b>, ketuk <b>Muat ulang</b>.</p>')}
    <h3>2.3 Membuat akun guru</h3>
    ${langkah([`Di halaman awal ketuk ${tombol('🧭 Saya guru')}, atau buka menu <b>🧭 Peta Jejak Guru</b>.`, `Pilih ${tombol('Daftar akun guru')}, isi nama lengkap, sekolah, kabupaten/kota, email, dan sandi (minimal 8 karakter).`, `Ketuk ${tombol('Buat akun')}. Berikutnya cukup ${tombol('Masuk')} dengan email dan sandi yang sama.`, `Sandi dapat diganti kapan saja lewat ${tombol('🔑 Ganti sandi')}. Bila lupa sandi, hubungi admin NalarSTEM.`])}
    <h3>2.4 Memasang kunci Gemini sendiri (gratis, ± 2 menit)</h3>
    <p>Kunci Gemini membuat kuota Kak Nala untuk murid Anda <b>tidak berebut</b> dengan sekolah lain. Bila kuota kunci Anda habis, Kak Nala otomatis memakai kunci sekolah.</p>
    ${langkah([`Buka <b>aistudio.google.com/apikey</b> dan masuk dengan akun Google.`, `Ketuk <b>Create API key</b> (Buat kunci API), lalu salin kunci yang muncul.`, `Kembali ke Peta Jejak Guru, buka panel <b>🔑 Kunci Gemini untuk Kak Nala</b>, tempel kunci, lalu simpan. Lencana berubah menjadi <b>terpasang ····xxxx</b>.`])}
    ${kotak('awas', '⚠️ Jaga kerahasiaan kunci', '<p>Jangan membagikan kunci Gemini di grup WhatsApp atau menuliskannya di papan. Kunci disimpan aman di server dan hanya empat karakter terakhirnya yang ditampilkan.</p>')}
    <h3>2.5 Membuat kelas dan membagikan kode</h3>
    <div class="bk-dua">
      <div>${langkah([`Di panel <b>🏫 Kelas saya</b>, tulis nama kelas, misalnya <i>7D 2026/2027</i>.`, `Ketuk ${tombol('＋ Buat kelas')}. Aplikasi membuat <b>kode kelas</b> 6 huruf, misalnya <b>JSWU8E</b>.`, `Tuliskan kode itu di papan. Murid membuka <b>Beranda</b> → kartu profil → isi nama dan <b>kode kelas</b> → ${tombol('Simpan')}.`, `Sejak itu jejak uji murid terkirim otomatis ke Peta Jejak Anda (isi chat dengan Kak Nala <b>tidak</b> ikut terkirim).`])}</div>
      ${hp('ss-jejak-kelas.jpg', 'Panel Kelas saya dan kode kelas')}
    </div>
    <h3>2.6 Mode Kak Nala di menu Pengaturan AI</h3>
    <div class="tabel-gulir"><table class="tabel"><thead><tr><th>Pilihan</th><th>Kapan dipakai</th></tr></thead><tbody>
      <tr><td><b>Server sekolah</b> (bawaan)</td><td>Pilihan normal. Murid tidak perlu mengisi apa pun; jika murid tergabung di kelas Anda, kunci Gemini Anda yang dipakai.</td></tr>
      <tr><td><b>Kunci Gemini pribadi</b></td><td>Untuk pemakaian mandiri di rumah dengan kunci milik sendiri.</td></tr>
      <tr><td><b>Tanpa AI (tutor lokal)</b></td><td>Saat tidak ada internet sama sekali. Kak Nala menjawab dari memori dan rubrik bawaan.</td></tr>
    </tbody></table></div>
    <h3>2.7 Ceklis siap mengajar</h3>
    <ul class="bk-ceklis"><li>Akun guru sudah dibuat dan bisa masuk.</li><li>Kunci Gemini terpasang (lencana hijau).</li><li>Kelas sudah dibuat; kode kelas ditulis di papan.</li><li>Murid sudah memasang aplikasi dan mengisi nama + kode kelas.</li><li>Misi dipilih sesuai materi; alat dan bahan praktik nyata disiapkan (lihat Langkah 7 tiap misi).</li></ul>`)}

  <!-- ================= BAB 3 ================= -->
  ${bab(3, '🗺️', 'Alur Pembelajaran Satu Misi', 'Tes awal → Pemanasan → 7 langkah EDP → Tes akhir.', `
    <div class="bk-alur">
      <span class="tes">📝 Tes awal</span>
      <span class="nol">0 · Pemanasan</span>
      ${LANGKAH.map(L => `<span>${L.no} · ${L.judul}</span>`).join('')}
      <span class="tes">📝 Tes akhir</span>
    </div>
    <h3>3.1 Langkah 0 — Pemanasan (apersepsi)</h3>
    <p>Sebelum 7 langkah, murid membaca <b>pertanyaan pemantik</b> yang kontekstual, mengingat prasyarat (<b>Ingat lagi</b>), menebak jawaban awal (<b>Tebakanku</b>), serta melihat <b>manfaat</b> materi dan <b>profesi</b> yang memakainya. Tebakan awal ini muncul lagi di Langkah 6 agar murid menyadari perubahan pemikirannya.</p>
    <h3>3.2 Sintaks dan peran guru</h3>
    <div class="tabel-gulir"><table class="tabel"><thead><tr><th>Langkah</th><th>Kegiatan murid</th><th>Indikator</th><th>Peran guru</th></tr></thead><tbody>
      ${LANGKAH.map(L => `<tr><td><b>${L.no}. ${L.judul}</b><br><small>EDP: ${L.edp}</small></td><td>${L.arahan}</td><td>${L.indikator.map(i => INDIKATOR.find(x => x.id === i).nama).join(', ')}</td><td>${PERAN_GURU[L.no - 1]}</td></tr>`).join('')}
    </tbody></table></div>
    <h3>3.3 Alokasi waktu yang disarankan (4 pertemuan × 2 JP)</h3>
    <div class="bk-pertemuan">
      <div><b>Pertemuan 1</b><small>Tes awal (15′) · Langkah 0 Pemanasan · Langkah 1 Pahami Masalah · Langkah 2 Gali Konsep</small></div>
      <div><b>Pertemuan 2</b><small>Langkah 3 Rumuskan Hipotesis · Langkah 4 Rancang &amp; Uji di laboratorium maya</small></div>
      <div><b>Pertemuan 3</b><small>Langkah 5 Analisis &amp; Evaluasi · Langkah 6 Simpulkan &amp; presentasi CER</small></div>
      <div><b>Pertemuan 4</b><small>Langkah 7 Wujudkan di dunia nyata · diskusi nyata vs simulasi · Tes akhir (15′)</small></div>
    </div>
    ${kotak('tips', '💡 Bila waktu terbatas', '<p>Langkah 1–2 dapat ditugaskan di rumah (cukup dibaca di HP). Langkah 7 dapat dipadatkan menjadi satu pertemuan demonstrasi per kelompok.</p>')}`)}

  <!-- ================= BAB 4 ================= -->
  ${bab(4, '🎒', 'Panduan Fitur untuk Murid', 'Agar guru dapat memandu murid menekan tombol yang tepat.', `
    <h3>4.1 Halaman awal dan Beranda</h3>
    <p>Setiap kali aplikasi dibuka, murid melihat halaman awal berisi perkenalan dan FAQ. Murid mengetuk ${tombol('🎒 Saya murid')} (atau ${tombol('▶ Lanjutkan sebagai …')}) untuk masuk ke <b>Beranda</b>. Di Beranda murid mengisi <b>nama</b> dan <b>kode kelas</b>, melihat kemajuan, lalu memilih misi.</p>
    <h3>4.2 Memilih dan membuka misi</h3>
    <div class="bk-dua">
      <div><p>Menu <b>Misi STEM</b> menampilkan ${MISI.length} misi yang dikelompokkan per kelas 7, 8, dan 9. Misi yang belum dimulai langsung terbuka di <b>Langkah 0 Pemanasan</b>. Deret angka 0–7 di atas halaman misi (stepper) menunjukkan langkah yang sudah selesai dan dapat diketuk untuk berpindah langkah.</p>
        <h3>4.3 Lembar kerja dan pemeriksaan</h3>
        <p>Setiap langkah berisi isian lembar kerja. Jawaban <b>tersimpan otomatis</b> di HP. Setelah mengisi, murid mengetuk ${tombol('🔍 Periksa dengan Kak Nala')} untuk mendapat skor rubrik 1–4 dan saran perbaikan per isian. Murid boleh memperbaiki dan memeriksa ulang.</p>
        <p>Di Langkah 2, murid membaca <b>materi Gali Konsep</b> bergaya buku pelajaran: penjelasan, gambar, tabel, kotak <i>Tahukah kamu?</i>, miskonsepsi, ringkasan, dan uji diri.</p></div>
      ${hp('ss-misi.jpg', 'Daftar misi per kelas')}
    </div>
    <h3>4.4 Laboratorium maya (Langkah 4)</h3>
    <div class="bk-dua">
      ${hp('ss-lab.jpg', 'Laboratorium maya: atur variabel lalu uji')}
      <div>${langkah([`Atur variabel dengan penggeser atau pilihan (mis. volume cuka, massa soda kue, sudut).`, `Tulis dugaan di kolom <b>Prediksimu (opsional): aku menduga …</b> — kebiasaan ini dihitung di Peta Jejak.`, `Ketuk ${tombol('▶ Uji Rancangan')}. Animasi berjalan dan hasil muncul beserta tanda kriteria yang terpenuhi.`, `Setiap uji masuk ke <b>Tabel data uji</b>; sel yang berubah diberi warna. Grafik dapat dibuat dengan memilih sumbu X dan Y sendiri.`, `<b>Detektor uji adil</b> memberi tanda hijau bila hanya satu variabel yang diubah, dan peringatan bila lebih dari satu.`])}
      ${kotak('tips', '💡 Kalimat ajaib guru', '<p>“Variabel apa yang kamu ubah? Apa yang kamu jaga tetap sama?” Ulangi pertanyaan ini setiap berkeliling.</p>')}</div>
    </div>
    <h3>4.5 Bertanya kepada Kak Nala</h3>
    <p>Tombol bulat Kak Nala ada di pojok kanan bawah. Murid dapat mengetik pertanyaan atau memakai tombol cepat seperti <b>Petunjuk kecil</b>, <b>Petunjuk lebih jelas</b>, dan <b>Baca data</b>. Kak Nala mengetahui misi dan langkah yang sedang dikerjakan murid, juga data ujinya.</p>
    <h3>4.6 Langkah 7 — Wujudkan di dunia nyata</h3>
    <p>Murid mencentang <b>cek keselamatan</b> (wajib sebelum langkah kerja terbuka), menyusun rencana kerja bersama Kak Nala (${tombol('🤖 Tinjau bersama Kak Nala')}, ${tombol('＋ Tambah langkah')}), melihat <b>takaran praktis</b> yang dihitung dari uji terbaiknya, lalu mengisi data uji nyata beserta foto dan ${tombol('💾 Simpan hasil uji nyata')}. Aplikasi membandingkan hasil nyata dengan prediksi simulasi. Tombol <b>🆘 Ada masalah dengan prototipemu?</b> menghubungkan murid ke Kak Nala.</p>
    <h3>4.7 Uji Nalar, Portofolio, dan Presentasi</h3>
    <div class="tabel-gulir"><table class="tabel"><tbody>
      <tr><td><b>Uji Nalar</b></td><td>${UJI_NALAR.length} soal literasi sains (hoaks, korelasi vs sebab-akibat, variabel, CER). Cocok untuk pemanasan atau tugas mandiri.</td></tr>
      <tr><td><b>Portofolio</b></td><td>Kumpulan semua jawaban, data uji, dan hasil nyata. Murid dapat ${tombol('🖨️ Cetak / simpan PDF')} atau ${tombol('📋 Salin ringkasan')} lalu mengirimkannya kepada guru.</td></tr>
      <tr><td><b>Presentasi</b></td><td>${tombol('🎤 Presentasi')} menyusun salindia otomatis dari data murid untuk presentasi CER di depan kelas.</td></tr>
    </tbody></table></div>`)}

  <!-- ================= BAB 5 ================= -->
  ${bab(5, '📝', 'Mode Tes Awal & Tes Akhir', 'Mengukur pemahaman konsep dan berpikir kritis sebelum dan sesudah misi.', `
    <p>Setiap misi memiliki <b>dua paket paralel</b>: <b>Paket A</b> (tes awal) dan <b>Paket B</b> (tes akhir). Setiap paket berisi <b>${nSoal} soal pilihan ganda</b>: ${nKonsep} soal pemahaman konsep sesuai materi dan ${nSoal - nKonsep} soal berpikir kritis (satu per indikator). Nomor yang sama di kedua paket mengukur indikator dan level yang sama dengan konteks berbeda.</p>
    <h3>5.1 Membuka tes untuk kelas</h3>
    ${langkah([`Masuk ke <b>Peta Jejak Guru</b>, pilih kelas.`, `Di panel <b>📝 Mode Tes</b>, pilih misi dan paket (A untuk tes awal, B untuk tes akhir), lalu ketuk ${tombol('▶ Buka tes ini')}.`, `Murid membuka menu <b>Tes</b>. Bila tes belum terlihat, minta murid mengetuk ${tombol('↻ Periksa lagi')}.`, `Murid mengerjakan sendiri (Kak Nala tidak tersedia selama tes), lalu ${tombol('Kirim jawaban')}. Jawaban hanya bisa dikirim satu kali dan urutan opsi diacak per murid.`, `Setelah semua selesai, ketuk ${tombol('💡 Buka pembahasan')} agar murid melihat kunci dan pembahasan, lalu ${tombol('⏹ Tutup tes')}.`])}
    <h3>5.2 Kisi-kisi dan pedoman penskoran</h3>
    <p>Ketuk ${tombol('🖨️ Cetak kisi-kisi, soal &amp; pedoman')} untuk mencetak tujuan pembelajaran, kisi-kisi Paket A dan B (TP, indikator soal, level kognitif, aspek), pedoman penskoran, serta soal beserta kunci dan pembahasannya. Contoh untuk misi Roket ada di <b>Lampiran A</b>.</p>
    <div class="tabel-gulir"><table class="tabel"><tbody>
      <tr><td><b>Nilai akhir</b></td><td>jumlah jawaban benar ÷ ${nSoal} × 100</td></tr>
      <tr><td><b>Sub-nilai</b></td><td>Pemahaman konsep (soal 1–${nKonsep}) dan berpikir kritis (soal ${nKonsep + 1}–${nSoal}) dihitung terpisah</td></tr>
      <tr><td><b>Kategori</b></td><td>86–100 Sangat baik · 71–85 Baik · 56–70 Cukup · ≤ 55 Perlu bimbingan</td></tr>
      <tr><td><b>N-gain</b></td><td>(akhir − awal) ÷ (100 − awal): Tinggi ≥ 0,7 · Sedang 0,3–0,69 · Rendah &lt; 0,3</td></tr>
    </tbody></table></div>
    <h3>5.3 Membaca hasil</h3>
    <p>Panel hasil menampilkan nilai tiap murid, rata-rata kelas, sub-nilai konsep dan berpikir kritis, persentase benar per indikator, serta N-gain bila kedua paket sudah dikerjakan. Indikator dengan persentase terendah adalah prioritas penguatan pada pertemuan berikutnya. Semua data dapat diunduh lewat ${tombol('⬇️ Unduh CSV')} untuk diolah di Excel.</p>
    ${kotak('awas', '⚠️ Penting', '<p>Buka tes awal <b>sebelum</b> murid membuka misi, dan tes akhir <b>setelah</b> Langkah 7. Tutup tes setelah selesai agar murid kelas lain yang memakai HP yang sama tidak ikut mengerjakan.</p>')}`)}

  <!-- ================= BAB 6 ================= -->
  ${bab(6, '🧭', 'Peta Jejak Berpikir', 'Melihat cara murid bereksperimen, bukan hanya hasil akhirnya.', `
    <div class="bk-dua">
      <div><p>Setiap kali murid menguji di laboratorium maya, aplikasi mencatat: variabel yang diubah, ada tidaknya prediksi, jeda berpikir antar-uji, dan kapan kriteria terpenuhi. Data ini terkirim ke Peta Jejak guru (tanpa isi chat).</p>
        <h3>6.1 Ringkasan kelas</h3>
        <p>Menampilkan persentase uji adil, persentase murid yang memenuhi semua kriteria, sebaran pola berpikir, dan skor partisipasi rata-rata. Ketuk ${tombol('↻ Segarkan')} untuk memuat data terbaru.</p>
        <h3>6.2 Tiga pola cara berpikir</h3>
        <div class="tabel-gulir"><table class="tabel"><tbody>${Object.values(POLA_JEJAK).map(p => `<tr><td style="color:${p.warna}"><b>${p.ikon} ${p.nama}</b></td><td>${p.arti}<br><small class="redup">Saran: ${p.saran}</small></td></tr>`).join('')}</tbody></table></div></div>
      ${hp('ss-jejak-pola.jpg', 'Ringkasan kelas dan pola berpikir')}
    </div>
    <h3>6.3 Partisipasi</h3>
    <p>Tab ${tombol('🙋 Partisipasi')} menghitung skor 0–100: langkah selesai (30) + jumlah uji, penuh pada 6 uji (20) + uji disertai prediksi (10) + pertanyaan yang diketik sendiri ke Kak Nala, penuh pada 5 (20) + isian lembar kerja (10) + pemeriksaan lembar kerja, penuh pada 7 kali (10). Tinggi ≥ 70, Sedang 40–69, Rendah &lt; 40. Murid berskor rendah tampil di daftar <b>👋 Perlu disapa</b>.</p>
    <h3>6.4 Melihat detail satu murid</h3>
    <p>Di tab ${tombol('🧭 Cara berpikir')}, ketuk nama murid untuk melihat urutan ujinya: uji mana yang adil, prediksi yang ditulis, dan saran pendampingan. Bahan ini sangat baik untuk umpan balik pribadi.</p>
    ${kotak('info', 'ℹ️ Privasi murid', '<p>Guru hanya melihat nama dan jejak uji murid di kelasnya sendiri. Tanya-jawab dengan Kak Nala disimpan <b>tanpa nama</b> untuk memori dan tidak dapat dibaca guru. Data antarguru dan antarsekolah terpisah.</p>')}`)}

  <!-- ================= BAB 7 ================= -->
  ${bab(7, '📏', 'Penilaian', 'Tiga sumber nilai: proses (formatif), produk nyata, dan tes.', `
    <div class="tabel-gulir"><table class="tabel"><thead><tr><th>Aspek</th><th>Sumber data di aplikasi</th><th>Saran bobot</th></tr></thead><tbody>
      <tr><td>Proses berpikir kritis</td><td>Skor rubrik lembar kerja Langkah 1–6, Peta Jejak (uji adil, prediksi)</td><td>30%</td></tr>
      <tr><td>Produk dan praktik nyata</td><td>Langkah 7, foto, data uji nyata, observasi guru (Lampiran B)</td><td>30%</td></tr>
      <tr><td>Tes akhir</td><td>Mode Tes Paket B</td><td>40%</td></tr>
    </tbody></table></div>
    <h3>7.1 Rubrik lembar kerja (dipakai AI dan tutor lokal)</h3>
    <div class="tabel-gulir"><table class="tabel"><thead><tr><th>Skor</th><th>Deskriptor</th></tr></thead><tbody>
      <tr><td>4 · Mahir</td><td>Tepat dan lengkap, memakai konsep IPA yang benar dan data/angka spesifik, alasannya logis dan runtut.</td></tr>
      <tr><td>3 · Cakap</td><td>Sebagian besar tepat dan beralasan, tetapi kurang data spesifik atau kaitan konsep kurang jelas.</td></tr>
      <tr><td>2 · Berkembang</td><td>Tepat sebagian, alasan dangkal/umum, atau ada miskonsepsi kecil.</td></tr>
      <tr><td>1 · Mulai berkembang</td><td>Belum menjawab pertanyaan, terlalu singkat, atau miskonsepsi besar.</td></tr>
    </tbody></table></div>
    ${kotak('awas', '⚠️ Skor AI bersifat formatif', '<p>Gunakan skor AI sebagai umpan balik cepat, bukan nilai akhir. Guru tetap memvalidasi lewat portofolio dan pengamatan.</p>')}
    <h3>7.2 Rubrik produk nyata</h3>
    <div class="tabel-gulir"><table class="tabel"><thead><tr><th>Aspek</th><th>4 · Mahir</th><th>2 · Berkembang</th></tr></thead><tbody>
      <tr><td>Keselamatan</td><td>Semua prosedur keselamatan dipatuhi tanpa diingatkan; area kerja rapi.</td><td>Perlu diingatkan lebih dari sekali.</td></tr>
      <tr><td>Fungsi prototipe</td><td>Memenuhi semua kriteria keberhasilan saat diuji nyata.</td><td>Memenuhi sebagian kriteria.</td></tr>
      <tr><td>Data &amp; dokumentasi</td><td>Uji diulang ≥ 3 kali, data lengkap dengan satuan, ada foto.</td><td>Uji hanya sekali atau data tidak lengkap.</td></tr>
      <tr><td>Refleksi model</td><td>Menjelaskan selisih nyata–simulasi dengan faktor spesifik dan mengusulkan perbaikan.</td><td>Hanya menyebut “hasilnya beda” tanpa alasan jelas.</td></tr>
    </tbody></table></div>
    <h3>7.3 Catatan model simulasi</h3>
    <p>Simulasi memakai model fisika/biologi yang <b>disederhanakan</b> agar pola teramati jelas (misalnya faktor pembatas, konduksi dinding datar, lintasan roket dengan hambatan udara tetap). Ajak murid mendiskusikan keterbatasan model di Langkah 7 — ini sendiri merupakan latihan berpikir kritis.</p>`)}

  <!-- ================= BAB 8 ================= -->
  ${bab(8, '🚀', 'Contoh Lengkap: Misi Roket Cuka & Soda Kue', 'Satu misi dijalankan dari tes awal sampai roket meluncur di lapangan.', `
    <div class="bk-identitas">
      ${sampulMisi(mR, 'bk-sampul-misi')}
      <div><b>${esc(mR.judul)}</b><small>${esc(mR.kelas)}</small><p>${mR.ringkas}</p></div>
    </div>
    <h3>8.1 Tujuan pembelajaran</h3>
    <ol>${tR.tujuan.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
    <h3>8.2 Masalah yang dihadapi murid</h3>
    <div class="bk-kisah"><p>${mR.kisah}</p>
      <div class="bk-dua rapat"><div><b>Kriteria keberhasilan</b><ul>${mR.kriteria.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <div><b>Kendala</b><ul>${mR.kendala.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div></div>
    <h3>8.3 Persiapan guru</h3>
    <ul class="bk-ceklis">${nR.alat.map(x => `<li>${esc(x)}</li>`).join('')}</ul>

    <h3 class="bk-pertemuan-judul">Pertemuan 1 — Tes awal, Pemanasan, Pahami Masalah, Gali Konsep</h3>
    <p><b>Tes awal (15 menit).</b> Buka Paket A misi Roket di Mode Tes. Setelah semua mengirim, <b>jangan</b> buka pembahasan dulu agar Paket B tetap bermakna.</p>
    <p><b>Langkah 0 · Pemanasan (10 menit).</b> Bacakan pemantik dengan nada bercerita:</p>
    <blockquote class="bk-kutip">“${esc(aR.pemantik)}”</blockquote>
    <p>Murid memilih tebakan: <i>${esc(aR.tebak.q)}</i> (${aR.tebak.opsi.map(esc).join(' / ')}). Biarkan jawaban berbeda — tebakan ini akan ditagih lagi di Langkah 6. Tunjukkan manfaatnya: ${aR.manfaat.map(esc).join(' ')}</p>
    <p><b>Langkah 1 · Pahami Masalah (15 menit).</b> Isian: <i>apa masalah utamanya</i> dan <i>apa kriteria serta kendalanya</i>.</p>
    ${jawab('Masalahnya: menentukan takaran cuka dan soda kue, ukuran botol, cara memasukkan soda, dan sudut peluncuran agar roket mendarat di 15–25 m. Kriteria: mendarat di zona target, pereaksi terbuang paling banyak 20%, busa tidak meluap. Kendala: biaya ≤ Rp 10.000 dan kadar cuka ≤ 5%, jadi cuka 20% wajib diencerkan.',
      'Membuat roket yang terbangnya paling tinggi.',
      'Tanyakan, “Apakah lomba ini mencari roket tertinggi? Baca lagi kalimat tentang zona target.” Arahkan murid memisahkan kriteria (yang dicapai) dari kendala (yang membatasi).')}
    <p><b>Langkah 2 · Gali Konsep (30 menit).</b> Murid membaca materi <b>Perubahan Materi</b> — perubahan fisika vs kimia, ciri reaksi kimia, persamaan reaksi, pereaksi pembatas, kekekalan massa, dan tekanan gas — lalu mengerjakan uji diri.</p>
    ${jawab('Reaksi cuka (asam asetat) dengan soda kue (natrium bikarbonat) adalah perubahan kimia karena menghasilkan zat baru, salah satunya gas CO₂. Semakin banyak gas di ruang kosong botol, tekanannya makin besar sehingga dorongan roket makin kuat. Jumlah gas ditentukan oleh pereaksi yang habis lebih dulu (pereaksi pembatas), jadi takarannya harus seimbang: 60 g asam asetat tepat bereaksi dengan 84 g soda kue.',
      'Cuka dan soda kue kalau dicampur meledak, jadi roketnya terbang.',
      'Luruskan miskonsepsi “meledak”: yang terjadi adalah gas terbentuk lalu menekan. Minta murid menunjuk ciri perubahan kimia yang benar-benar teramati (gelembung, terasa dingin, zat baru).')}

    <h3 class="bk-pertemuan-judul">Pertemuan 2 — Rumuskan Hipotesis, Rancang &amp; Uji</h3>
    <p><b>Langkah 3 · Hipotesis (20 menit).</b> Setiap kelompok memilih <b>satu</b> variabel bebas.</p>
    ${jawab('Variabel bebas: massa soda kue. Variabel terikat: jarak mendarat dan pereaksi terbuang. Variabel kontrol: cuka dapur 5% sebanyak 200 mL, botol 600 mL, dituang langsung, sudut 45°. Hipotesis: <i>Jika soda kue ditambah dari 10 g menjadi 14 g, maka roket mendarat lebih jauh dan tidak ada cuka terbuang, karena pada uji sebelumnya soda kue adalah pereaksi pembatas sehingga sebagian cuka tidak bereaksi.</i>',
      'Jika bahannya banyak maka roketnya jauh.',
      'Tanyakan, “Bahan yang mana? Banyak itu berapa? Mengapa bisa begitu?” Minta murid melengkapi pola Jika–maka–karena dengan angka.')}
    <p><b>Langkah 4 · Rancang &amp; Uji (50 menit).</b> Berikut rangkaian uji sebuah kelompok. Angka di tabel <b>dihitung langsung oleh mesin simulasi NalarSTEM</b>, sehingga sama persis dengan yang muncul di HP murid.</p>
    ${tabelUji}
    <div class="bk-dua">
      <div><p><b>Momen penting yang perlu guru tangkap:</b></p>
        <ul><li><b>Uji ${U[1].no}→${U[2].no}:</b> menambah cuka menaikkan jarak dari ${angka(U[1].h.jarak)} m menjadi ${angka(U[2].h.jarak)} m, tetapi soda kue berganti menjadi pereaksi pembatas.</li>
          <li><b>Uji ${U[3].no}:</b> takaran seimbang menghasilkan gas ${angka(U[3].h.gas)} L (naik dari ${angka(U[2].h.gas)} L), tetapi jarak hampir tidak berubah (${angka(U[3].h.jarak)} m). Konflik kognitif! Sumbat lepas pada tekanan tertentu, jadi gas tambahan tidak menambah dorongan.</li>
          <li><b>Uji ${U[4].no}:</b> menambah cuka justru menurunkan jarak menjadi ${angka(U[4].h.jarak)} m dan <b>busa meluap</b> — ruang gas di botol 600 mL terlalu sempit.</li>
          <li><b>Uji ${U[6].no}–${U[7].no}:</b> botol 1,5 L dan soda kue dibungkus tisu membuat roket mendarat di ${angka(terbaik.h.jarak)} m dan memenuhi <b>semua kriteria</b>.</li>
          <li><b>Uji ${U[8].no}–${hemat.no}:</b> mengganti dengan cuka 20% yang diencerkan dan menyeimbangkan soda kue menurunkan biaya dari ${rp(terbaik.h.biaya)} menjadi <b>${rp(hemat.h.biaya)}</b>, dengan jarak ${angka(hemat.h.jarak)} m (tetap di zona target).</li></ul></div>
      ${hp('ss-data-uji.jpg', 'Tabel data uji di HP murid')}
    </div>
    <p><b>Contoh percakapan dengan Kak Nala</b> saat kelompok bingung setelah uji ${U[3].no}:</p>
    ${obrolan([
      ['m', 'Kak, gasnya sudah banyak tapi kok roketnya tidak tambah jauh?'],
      ['n', `Pengamatan yang tajam! Coba bandingkan uji ${U[2].no} dan ${U[3].no}: gasnya naik dari ${angka(U[2].h.gas)} L menjadi ${angka(U[3].h.gas)} L. Sekarang lihat kolom <b>tekanan saat lepas</b>. Apa yang kamu perhatikan?`],
      ['m', 'Tekanannya hampir sama, sekitar 3,5 bar.'],
      ['n', 'Nah, menurutmu apa yang terjadi pada sumbat ketika tekanannya mencapai angka itu? Lalu ke mana perginya gas yang masih terus terbentuk?'],
      ['m', 'Sumbatnya lepas duluan, jadi gas sisanya tidak ikut mendorong. Berarti yang perlu diubah bukan bahannya, tapi ruang gas atau botolnya ya kak?'],
      ['n', 'Itu dugaan yang bagus untuk diuji! Variabel apa yang akan kamu ubah, dan apa yang kamu jaga tetap sama?']
    ])}
    ${kotak('info', 'ℹ️ Perhatikan', '<p>Kak Nala tidak pernah menyebut takaran jawabannya. Ia menunjuk data murid sendiri lalu bertanya. Bila murid meminta jawaban langsung, Kak Nala mengembalikan pertanyaan dengan petunjuk bertingkat.</p>')}

    <h3 class="bk-pertemuan-judul">Pertemuan 3 — Analisis &amp; Evaluasi, Simpulkan</h3>
    <p><b>Langkah 5 · Analisis (30 menit).</b> Minta murid membuat grafik <i>volume cuka</i> (sumbu X) terhadap <i>jarak</i> (sumbu Y) dan membandingkannya antarkelompok.</p>
    ${jawab(`Pola: saat cuka naik dari 100 mL ke 200 mL, jarak naik dari ${angka(U[1].h.jarak)} m ke ${angka(U[2].h.jarak)} m. Namun dari 200 mL ke 300 mL jarak turun ke ${angka(U[4].h.jarak)} m dan busa meluap. Jadi ada takaran optimum yang bergantung pada ukuran botol. Hipotesisku didukung sebagian: cuka tidak lagi terbuang, tetapi jarak tidak bertambah karena sumbat lepas pada tekanan ± 3,5 bar. Kelemahan: aku sempat ingin mengubah cuka dan botol sekaligus; perbaikannya, ubah satu per satu.`,
      'Makin banyak cuka makin jauh.',
      `Tunjukkan uji ${U[4].no} di tabel kelompoknya: “Datamu sendiri berkata apa?” Latih murid membedakan pola naik terus dengan pola yang memiliki titik optimum.`)}
    <p><b>Langkah 6 · Simpulkan &amp; Refleksi (40 menit).</b> Murid menulis CER, membandingkannya dengan tebakan di Pemanasan, lalu presentasi dengan ${tombol('🎤 Presentasi')}.</p>
    ${jawab(`<b>Klaim:</b> rancangan terbaik adalah ${hemat.v.cuka} mL cuka 20% yang diencerkan 1:4, ${hemat.v.soda} g soda kue dibungkus tisu, botol 1,5 L, sudut ${hemat.v.sudut}°. <b>Bukti:</b> pada uji ${hemat.no} roket mendarat di ${angka(hemat.h.jarak)} m, ${esc(hemat.h.sisa.toLowerCase())} pereaksi terbuang, busa tidak meluap, biaya ${rp(hemat.h.biaya)}. <b>Penalaran:</b> perbandingan cuka dan soda kue seimbang sehingga semua pereaksi berubah menjadi gas CO₂; ruang botol yang besar dan tisu yang menunda reaksi membuat tekanan terkumpul sebelum sumbat lepas. <b>Refleksi:</b> awalnya aku mengira soda kue sebanyak-banyaknya membuat roket paling jauh, ternyata yang penting perbandingannya.`,
      `Rancangan terbaik uji ${terbaik.no} karena paling jauh.`,
      `Ajukan pertanyaan evaluatif: “Uji ${terbaik.no} lebih jauh, uji ${hemat.no} lebih murah. Mana yang lebih sesuai dengan kriteria lomba?” Tidak ada satu jawaban tunggal; yang dinilai adalah alasan berbasis data.`)}

    <h3 class="bk-pertemuan-judul">Pertemuan 4 — Wujudkan di Dunia Nyata, Tes akhir</h3>
    <div class="bk-dua">
      <div><p><b>Langkah 7 (${esc(nR.waktu)}).</b> Takaran praktis yang dihitung aplikasi dari uji ${hemat.no}:</p>
        <ul>${nR.takaran(hemat.v).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <p><b>Langkah kerja di lapangan:</b></p>
        <ol class="kecil">${nR.langkah.map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>
      <div>${foto('kelas-takar.jpg', 'Menakar cuka dan soda kue sesuai rancangan')}${foto('kelas-luncur.jpg', 'Peluncuran di lapangan dengan garis aman')}</div>
    </div>
    ${kotak('awas', '⚠️ Keselamatan (wajib dibacakan sebelum peluncuran)', `<ul>${nR.keselamatan.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`)}
    <p><b>Diskusi nyata vs simulasi.</b> Di lapangan, roket biasanya mendarat lebih dekat daripada prediksi simulasi. Ajak murid mencari penyebabnya: angin, sumbat yang terlalu longgar atau terlalu rapat, botol penyok, sirip tidak lurus, atau soda kue yang menggumpal.</p>
    ${jawab('Simulasi memprediksi 17 m, hasil nyata rata-rata 13,4 m dari 3 kali uji (selisih ± 21%). Penyebab yang mungkin: sumbat gabus kami lebih longgar sehingga lepas sebelum tekanan maksimum, dan ada angin dari arah depan. Berikutnya kami akan membungkus sumbat dengan selotip dan menguji saat angin tenang. Ternyata simulasi tidak memperhitungkan angin dan kekuatan sumbat.',
      'Hasilnya beda dengan simulasi.',
      'Minta murid menyebut angka dan setidaknya satu faktor spesifik, lalu usulan perbaikan yang dapat diuji.')}
    <p><b>Tes akhir (15 menit).</b> Buka Paket B, lalu ${tombol('💡 Buka pembahasan')} setelah semua mengirim. Bandingkan N-gain kelas.</p>
    ${kotak('tips', '💡 Pengalaman di kelas 7D SMP Negeri 3 Besuki', '<p>Pada praktik baik tahun 2026, rata-rata tes kelas naik dari <b>40,8</b> (tes awal) menjadi <b>83,3</b> (tes akhir). Kunci keberhasilannya: murid bekerja berpasangan, guru konsisten bertanya “variabel apa yang kamu ubah?”, dan uji nyata di lapangan membuat murid antusias membandingkan data.</p>')}`)}

  <!-- ================= BAB 9 ================= -->
  ${bab(9, '🧯', 'Mengatasi Masalah', 'Masalah yang paling sering muncul dan cara cepat mengatasinya.', `
    <div class="tabel-gulir"><table class="tabel"><thead><tr><th>Masalah</th><th>Penyebab</th><th>Solusi</th></tr></thead><tbody>
      <tr><td>Murid tidak muncul di Peta Jejak</td><td>Kode kelas belum disimpan, salah ketik, atau HP sedang offline</td><td>Periksa kartu profil di Beranda (harus tertulis <b>Tergabung di kelas …</b>). Jejak offline terkirim otomatis saat online. Ketuk ${tombol('↻ Segarkan')}.</td></tr>
      <tr><td>Kak Nala menjawab dengan tanda ⚙️ Tutor lokal</td><td>Kuota AI per menit penuh (satu kelas bertanya bersamaan) atau internet putus</td><td>Tunggu 1–2 menit lalu coba lagi. Pasang kunci Gemini sendiri. Kerjakan berpasangan agar permintaan berkurang separuh.</td></tr>
      <tr><td>Kuota harian habis</td><td>Batas harian Gemini versi gratis</td><td>Kuota pulih sendiri setiap hari ± pukul 15.00 WIB. Sementara itu aplikasi tetap berjalan dengan memori dan tutor lokal.</td></tr>
      <tr><td>Tes tidak muncul di HP murid</td><td>Tes belum dibuka, salah kelas, atau halaman belum dimuat ulang</td><td>Pastikan sudah ${tombol('▶ Buka tes ini')} di kelas yang benar; murid mengetuk ${tombol('↻ Periksa lagi')}.</td></tr>
      <tr><td>Jawaban murid hilang</td><td>Data browser dihapus, mode penyamaran, atau berganti HP/browser</td><td>Pakai HP dan browser yang sama selama satu misi, jangan memakai mode penyamaran. Minta murid rutin mencetak/menyalin portofolio.</td></tr>
      <tr><td>Tombol cetak tidak membuka apa pun</td><td>Pop-up diblokir peramban</td><td>Izinkan pop-up untuk alamat NalarSTEM, lalu ulangi.</td></tr>
      <tr><td>Gambar materi tidak muncul saat offline</td><td>Halaman belum pernah dibuka saat online</td><td>Buka misi tersebut sekali saat ada internet agar tersimpan di HP.</td></tr>
      <tr><td>Muncul “Versi baru NalarSTEM sudah tersedia”</td><td>Aplikasi diperbarui</td><td>Ketuk <b>Muat ulang</b>. Data murid tidak hilang.</td></tr>
      <tr><td>Lupa sandi guru</td><td>—</td><td>Hubungi admin NalarSTEM untuk mengatur ulang sandi.</td></tr>
    </tbody></table></div>
    <h3>Kontak</h3>
    <p>Bayu Setiadji, S.Pd., Gr. · SMP Negeri 3 Besuki, Situbondo · Pertanyaan tentang AI dan kuota juga dijawab di menu <b>Tentang &amp; FAQ</b>.</p>`)}

  <!-- ================= LAMPIRAN ================= -->
  ${bab('L', '📎', 'Lampiran', 'Siap dicetak dan dipakai langsung di kelas.', `
    <h3>Lampiran A · Kisi-kisi, pedoman penskoran, dan soal tes Misi Roket</h3>
    <div class="bk-kisi">${htmlKisiTes('roket', true)}</div>
    <h3 class="bk-pisah">Lampiran B · Lembar observasi guru (Langkah 4 dan 7)</h3>
    <p class="kecil">Kelas: ................ Misi: ${esc(mR.judul)} Tanggal: ................ Beri tanda ✔ bila tampak, isi skor 1–4 untuk keselamatan.</p>
    <table class="tabel bk-observasi"><thead><tr><th>No</th><th>Nama / kelompok</th><th>Uji adil</th><th>Menulis prediksi</th><th>Memakai data saat berdiskusi</th><th>Keselamatan (1–4)</th><th>Catatan</th></tr></thead>
      <tbody>${Array.from({ length: 12 }, (_, i) => `<tr><td>${i + 1}</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join('')}</tbody></table>
    <h3 class="bk-pisah">Lampiran C · Ceklis keselamatan peluncuran roket</h3>
    <table class="tabel bk-observasi"><thead><tr><th>Poin keselamatan</th><th>Kel. 1</th><th>Kel. 2</th><th>Kel. 3</th><th>Kel. 4</th><th>Kel. 5</th><th>Kel. 6</th></tr></thead>
      <tbody>${nR.keselamatan.map(x => `<tr><td class="kecil">${esc(x)}</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join('')}</tbody></table>`)}
  </div>`;

  $$('[data-ke]').forEach(a => a.onclick = e => { e.preventDefault(); const t = document.getElementById(a.dataset.ke); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  $('#bCetakBuku').onclick = async () => {
    const imgs = $$('.buku img');
    await Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
    window.print();
  };
}
