/* =========================================================
   NalarSTEM — Halaman sambutan (#/tentang)
   Menjadi halaman awal setiap kali aplikasi dibuka (sekali per sesi/tab),
   dan bisa dibuka lagi dari menu "Tentang & FAQ". Berisi perkenalan, pintu masuk
   murid/guru, cara memulai, dan tanya-jawab (FAQ) tentang Kak Nala.
   ========================================================= */
const KUNCI_SAMBUT = 'nalarstem-masuk';
// Disimpan di sessionStorage: halaman awal muncul lagi setiap aplikasi/tab baru dibuka.
const sudahDisambut = () => { try { return !!sessionStorage.getItem(KUNCI_SAMBUT); } catch (e) { return true; } };
const tandaiDisambut = () => { try { sessionStorage.setItem(KUNCI_SAMBUT, '1'); } catch (e) { /* abaikan */ } };

const VIDEO_TUTORIAL = 'YViVp_sOAZ8';   // youtu.be/YViVp_sOAZ8 — tutorial penggunaan NalarSTEM

const FAQ = [
  ['Apa itu NalarSTEM?', 'Laboratorium IPA STEM di HP untuk murid SMP. Murid memecahkan masalah sehari-hari di sekitar pesisir lewat <b>24 misi</b>: memahami masalah, menggali konsep, merancang, menguji di laboratorium maya, menganalisis data, menyimpulkan, lalu mewujudkannya di dunia nyata.'],
  ['Kak Nala itu apa?', 'AI tutor di dalam NalarSTEM yang memakai <b>Gemini (Google)</b>. Kak Nala tidak memberi jawaban langsung, tetapi <b>bertanya balik</b> agar murid menemukan sendiri jawabannya, lalu menilai jawaban setiap langkah dengan rubrik berpikir kritis.'],
  ['Apakah pemakaian Kak Nala ada batasnya?', 'Ada. Gemini versi gratis punya <b>kuota per menit</b> dan <b>per hari</b> yang dihitung per project Google. Angka pastinya berbeda untuk tiap model dan dapat diubah Google. Kuota harian <b>pulih sendiri setiap hari ± pukul 15.00 WIB</b>. Yang paling sering habis adalah kuota per menit, saat satu kelas bertanya hampir bersamaan; kuota ini pulih dalam hitungan detik sampai satu menit.'],
  ['Bagaimana bila kuota AI habis?', 'Aplikasi tetap berjalan. Jawaban berpindah otomatis: <b>✨ AI Gemini</b> → <b>🧠 Memori Kak Nala</b> (jawaban AI sebelumnya untuk pertanyaan yang mirip) → <b>⚙️ Tutor lokal</b> (pertanyaan pemantik dan rubrik bawaan). Laboratorium maya, materi, Mode Tes, Uji Nalar, Peta Jejak Guru, dan portofolio <b>tidak memakai AI</b>, sehingga selalu berjalan normal.'],
  ['Mengapa Kak Nala jarang macet?', 'Ada <b>7 model Gemini cadangan</b>; bila satu model penuh atau sibuk, aplikasi otomatis pindah ke model berikutnya. Setiap guru juga dapat memasang <b>kunci Gemini sendiri</b>, sehingga kuotanya tidak berebut dengan sekolah lain.'],
  ['Apakah data murid aman?', 'Tanya-jawab dengan Kak Nala disimpan <b>tanpa nama</b> untuk memori. Guru hanya menerima nama dan jejak uji murid di kelasnya sendiri (<b>bukan isi chat</b>), dan data kelas antarguru/sekolah <b>terpisah</b>. Tanpa kode kelas, semua data hanya tersimpan di HP murid.'],
  ['Bagaimana bila sinyal internet lemah?', 'NalarSTEM bisa <b>dipasang di HP</b> dan tetap terbuka tanpa internet. Lab maya dan materi tetap jalan, Kak Nala menjawab lewat tutor lokal, dan jejak murid <b>terkirim otomatis</b> ke guru begitu HP kembali online.'],
  ['Berapa biayanya?', '<b>Gratis.</b> Tidak perlu instalasi aplikasi khusus maupun akun murid; cukup membuka alamat web di HP. Kunci Gemini versi gratis dapat dibuat sendiri oleh guru di Google AI Studio.'],
  ['Bagaimana guru sekolah lain memakainya?', 'Buka <b>Peta Jejak Guru</b> → daftar akun → buat kelas → bagikan kode kelas ke murid. Pasang kunci Gemini sendiri di pengaturan akun. Dari sana guru dapat membuka tes awal/akhir, melihat kisi-kisi, dan memantau jejak berpikir setiap murid.'],
  ['Tips agar lancar dipakai di kelas?', 'Kerjakan <b>berpasangan</b> atau 1 HP per kelompok, sehingga permintaan ke AI berkurang separuh. Bila muncul tanda <b>⚙️ Tutor lokal</b>, coba lagi 1–2 menit kemudian. Pasang <b>kunci Gemini sendiri</b> sebelum memakai NalarSTEM di kelas.']
];

// Penghitung pengunjung: satu perangkat dihitung sekali per hari (ID acak perangkat, tanpa nama).
// Hasil disimpan sebentar di sessionStorage agar tidak memanggil server setiap kali halaman awal dibuka.
async function muatPengunjung() {
  const w = $('#pengunjung'); if (!w) return;
  const angka = n => Number(n || 0).toLocaleString('id-ID');
  const tampil = d => {
    w.hidden = false;
    w.innerHTML = `<span class="sp-judul">👀 Pengunjung NalarSTEM</span>
      <span><b>${angka(d.total)}</b> total perangkat</span><span><b>${angka(d.pekanIni)}</b> pekan ini</span><span><b>${angka(d.hariIni)}</b> hari ini</span>`;
  };
  let simpanan = null;
  try { simpanan = JSON.parse(sessionStorage.getItem('nalarstem-pengunjung') || 'null'); } catch (e) { /* abaikan */ }
  if (simpanan && Date.now() - simpanan.w < 5 * 60e3) return tampil(simpanan.d);
  if (!navigator.onLine) { if (simpanan) tampil(simpanan.d); return; }
  try {
    const d = await memoriApi({ aksi: 'kunjungan', perangkat: idPerangkat() }, 8000);
    if (!d || d.total === undefined) return;
    try { sessionStorage.setItem('nalarstem-pengunjung', JSON.stringify({ w: Date.now(), d })); } catch (e) { /* abaikan */ }
    if (document.body.contains(w)) tampil(d);
  } catch (e) { if (simpanan) tampil(simpanan.d); }
}

// gerbang = true bila tampil sebagai pintu masuk (menu disembunyikan sampai pengguna masuk)
function halSambut(gerbang) {
  if (gerbang) { document.body.classList.add('mode-gerbang'); bersihkan.push(() => document.body.classList.remove('mode-gerbang')); }
  const misiKelas = [7, 8, 9].map(k => MISI.filter(m => kelasMisi(m)[0] === k).length);
  APP.innerHTML = `<div class="sambut">
  ${!gerbang ? `<div class="sambut-judul"><h1 class="judul-hal">Tentang NalarSTEM &amp; FAQ</h1>
    <p class="redup">NalarSTEM adalah lab IPA STEM di HP untuk murid SMP, ditemani <b>Kak Nala</b>, AI tutor yang bertanya balik. Halaman ini menjelaskan isi aplikasi, cara memulai, dan jawaban atas pertanyaan yang sering diajukan.</p></div>` : `
  <section class="sambut-hero">
    ${gambar('hero.jpg', '', 'sambut-latar', false)}
    <div class="sambut-hero-isi">
      <span class="sambut-label">Lab IPA STEM + AI Tutor · SMP Fase D</span>
      <h1>Belajar IPA dengan <span>bernalar</span>, bukan menghafal.</h1>
      <p>Pecahkan masalah nyata di sekitarmu, uji rancanganmu di laboratorium maya, dan ditemani <b>Kak Nala</b>, AI yang bertanya balik agar kamu menemukan jawabannya sendiri.</p>
      ${gerbang ? `<div class="sambut-pintu">
        <button class="pintu murid" data-masuk="murid"><span>🎒</span><b>Saya murid</b><small>Mulai misi & isi kode kelas</small></button>
        <button class="pintu guru" data-masuk="guru"><span>🧭</span><b>Saya guru</b><small>Buat kelas & pantau jejak berpikir</small></button>
      </div>
      ${S.profil.nama ? `<button class="sambut-lanjut" data-masuk="lanjut">▶ Lanjutkan sebagai <b>${esc(S.profil.nama)}</b>${S.profil.namaKelas || S.profil.kelas ? ` · ${esc(S.profil.namaKelas || S.profil.kelas)}` : ''}</button>` : ''}
      <a href="#" class="sambut-lewati" data-masuk="lihat">Lihat-lihat misi dulu →</a>` : ''}
    </div>
  </section>`}

  <section class="sambut-blok sambut-video">
    <div class="sv-teks">
      <span class="sambut-label">🎬 Video tutorial · ± 6 menit</span>
      <h2>Lihat cara memakai NalarSTEM</h2>
      <p>Dari membuat akun guru dan kelas, menjalankan misi Roket Cuka &amp; Soda Kue bersama Kak Nala, sampai membuka tes dan membaca Peta Jejak murid.</p>
    </div>
    <div class="sv-bingkai" id="bingkaiVideo">
      <button type="button" class="sv-sampul" id="putarVideo" aria-label="Putar video tutorial NalarSTEM">
        ${gambar('tutorial-guru.jpg', 'Video tutorial NalarSTEM', '', true)}
        <span class="sv-putar" aria-hidden="true">▶ Putar video</span>
      </button>
    </div>
  </section>

  <section class="sambut-angka">
    <div><b>${MISI.length}</b><small>misi STEM<br>kelas 7 (${misiKelas[0]}) · 8 (${misiKelas[1]}) · 9 (${misiKelas[2]})</small></div>
    <div><b>7</b><small>langkah tiap misi<br>dari masalah sampai dunia nyata</small></div>
    <div><b>6</b><small>indikator berpikir<br>kritis dinilai rubrik</small></div>
    <div><b>0</b><small>rupiah & tanpa instalasi<br>cukup lewat HP</small></div>
  </section>
  <div class="sambut-pengunjung" id="pengunjung" hidden></div>

  <section class="sambut-blok">
    <h2>Apa yang bisa dilakukan?</h2>
    <div class="sambut-fitur">
      <div><span>🔬</span><b>Laboratorium maya</b><p>Atur variabel, uji berkali-kali tanpa risiko, dan lihat datanya dalam tabel serta grafik.</p></div>
      <div>${gambar('kak-nala-wajah.jpg', '', 'sambut-nala')}<b>Kak Nala bertanya balik</b><p>AI tutor Sokratik yang menuntun dengan pertanyaan dan menilai jawaban setiap langkah.</p></div>
      <div><span>⚖️</span><b>Uji adil & data</b><p>Murid belajar mengubah satu variabel saja, membaca pola, lalu menyimpulkan dengan bukti.</p></div>
      <div><span>🧭</span><b>Peta Jejak Guru</b><p>Guru melihat cara berpikir dan partisipasi tiap murid, serta tes awal–akhir lengkap dengan kisi-kisi.</p></div>
    </div>
  </section>

  <section class="sambut-blok sambut-cara">
    <div><h2>🎒 Untuk murid</h2><ol>
      <li>${gerbang ? 'Ketuk <b>Saya murid</b>, lalu tulis' : 'Di <b>Beranda</b>, tulis'} nama dan <b>kode kelas</b> dari gurumu.</li>
      <li>Pilih misi sesuai kelasmu, mulai dari <b>Pemanasan</b>.</li>
      <li>Kerjakan 7 langkahnya; tanya Kak Nala bila bingung. Jawabanmu tersimpan otomatis.</li></ol></div>
    <div><h2>🧭 Untuk guru</h2><ol>
      <li>${gerbang ? 'Ketuk <b>Saya guru</b> →' : 'Buka menu <b>Peta Jejak Guru</b> →'} daftar akun guru.</li>
      <li>Buat kelas dan bagikan <b>kode kelasnya</b> kepada murid.</li>
      <li>Pasang <b>kunci Gemini</b> sendiri (gratis) agar kuota Kak Nala tidak berebut.</li>
      <li>Buka <b>tes awal</b>, jalankan misi, buka <b>tes akhir</b>, lalu pantau hasilnya.</li></ol></div>
  </section>

  <section class="sambut-blok">
    <h2>Tanya jawab (FAQ)</h2>
    <div class="sambut-faq">${FAQ.map(([q, a], i) => `<details ${i < 2 ? 'open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
  </section>

  <section class="sambut-penutup">
    ${gerbang ? `<p>Siap mulai?</p>
    <div class="sambut-pintu kecil">
      <button class="pintu murid" data-masuk="murid"><span>🎒</span><b>Saya murid</b></button>
      <button class="pintu guru" data-masuk="guru"><span>🧭</span><b>Saya guru</b></button>
    </div>` : ''}
    <small>NalarSTEM · Bayu Setiadji, S.Pd., Gr. · SMP Negeri 3 Besuki, Situbondo</small>
  </section>
  </div>`;
  muatPengunjung();
  // pemutar YouTube baru dimuat saat diklik (halaman awal tetap ringan & tidak memasang cookie YouTube)
  $('#putarVideo').onclick = () => {
    if (!navigator.onLine) { toast('Video butuh internet. Sambungkan HP ke internet lalu coba lagi.', 'peringatan'); return; }
    $('#bingkaiVideo').innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${VIDEO_TUTORIAL}?autoplay=1&rel=0&modestbranding=1" title="Video tutorial NalarSTEM"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  };
  $$('[data-masuk]').forEach(b => b.onclick = e => {
    e.preventDefault(); tandaiDisambut();
    const ke = { murid: '#/beranda', lanjut: '#/beranda', guru: '#/jejak', lihat: '#/misi' }[b.dataset.masuk];
    if (location.hash === ke) rute(); else location.hash = ke;
  });
}
