/* =========================================================
   NalarSTEM — Peta Jejak Berpikir
   Murid yang bergabung ke kelas (kode dari guru) mengirim jejak uji per misi:
   variabel yang diubah, uji adil/tidak, prediksi, jeda antar-uji, dan kriteria
   yang terpenuhi. Guru melihat pola eksplorasi tiap murid di #/jejak.
   ========================================================= */

/* ---------------- Sisi murid: kirim jejak ---------------- */
function idPerangkat() {
  if (!S.perangkat) { S.perangkat = (Math.random().toString(36).slice(2) + Date.now().toString(36)).slice(0, 16); simpan(); }
  return S.perangkat;
}
const jejakAktif = () => !!(S.profil.kodeKelas && S.profil.nama && location.protocol !== 'file:');

/* ---------------- Partisipasi murid ----------------
   st.partisipasi = { tanya, tombol, periksa, periksaUlang, hari: ['2026-10-02', …], pertama, terakhir }
   Isi percakapan TIDAK pernah dikirim — hanya hitungannya. */
const PESAN_OTOMATIS = /^(Beri aku petunjuk|Aku masih bingung|Bantu aku membaca pola|Uji pemahamanku|Aku sedang di langkah|Masalah pada prototipe|Ini rencana langkah kerja|Soal nomor)/;
const hariIni = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const tanggalDari = w => { const d = new Date(w); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

// Murid yang sudah memakai aplikasi sebelum fitur ini ada: hitungan disusun dari riwayat yang tersimpan.
function partisipasiMisi(misiId) {
  const st = S.misi[misiId];
  if (!st.partisipasi) {
    const chat = (S.chat['misi-' + misiId] || []).filter(r => r.peran === 'user');
    const hari = [...new Set(st.uji.filter(u => u.waktu).map(u => tanggalDari(u.waktu)))];
    st.partisipasi = {
      tanya: chat.filter(r => !r.otomatis && !PESAN_OTOMATIS.test(r.teks)).length,
      tombol: chat.filter(r => r.otomatis || PESAN_OTOMATIS.test(r.teks)).length,
      periksa: Object.keys(st.nilai || {}).length, periksaUlang: 0, hari, pertama: null, terakhir: null
    };
  }
  return st.partisipasi;
}

// jenis: 'tanya' | 'tombol' | 'periksa' | 'periksaUlang' | 'uji' | 'nyata'
function catatPartisipasi(misiId, jenis) {
  if (!S.misi[misiId]) return;
  const P = partisipasiMisi(misiId);
  if (['tanya', 'tombol', 'periksa', 'periksaUlang'].includes(jenis)) P[jenis]++;
  const h = hariIni();
  if (!P.hari.includes(h)) { P.hari.push(h); if (P.hari.length > 90) P.hari.shift(); }
  P.pertama = P.pertama || Date.now(); P.terakhir = Date.now();
  simpan(); kirimJejak(misiId);
}

function ringkasJejak(m, st) {
  const nilai = {};
  Object.values(st.nilai || {}).forEach(n => Object.entries(n.skor || {}).forEach(([id, s]) => { (nilai[id] = nilai[id] || []).push(s); }));
  const P = partisipasiMisi(m.id);
  const kolom = LANGKAH.flatMap(L => L.isian);
  return {
    v: 2,
    uji: st.uji.slice(-60).map(u => ({ n: u.no, l: u.lulus, t: u.total, a: u.adil, u: u.ubah || [], p: (u.prediksi || '').slice(0, 160), w: u.waktu || null, x: u.v })),
    langkah: kemajuan(m),
    nilai: Object.fromEntries(Object.entries(nilai).map(([id, a]) => [id, Math.round(a.reduce((x, y) => x + y, 0) / a.length * 10) / 10])),
    nyata: (st.nyata && st.nyata.uji.length) || 0,
    rencana: (st.nyata && st.nyata.rencana ? st.nyata.rencana.length : 0),
    partisipasi: {
      tanya: P.tanya, tombol: P.tombol, periksa: P.periksa, periksaUlang: P.periksaUlang,
      hari: P.hari.length, pertama: P.pertama, terakhir: P.terakhir,
      isian: kolom.filter(f => (st.isian[f.id] || '').trim().length >= 3).length, isianTotal: kolom.length
    }
  };
}

// Riwayat Uji Nalar disimpan terpisah dari S.kuis, karena "Ulangi dengan urutan baru" mengosongkan S.kuis.
function catatUjiNalar(skor, total) {
  S.ujiNalarRiwayat = S.ujiNalarRiwayat || [];
  S.ujiNalarRiwayat.push({ skor, total, w: Date.now() });
  if (S.ujiNalarRiwayat.length > 20) S.ujiNalarRiwayat.shift();
  simpan(); kirimJejak('ujinalar');
}

const ID_UJI_NALAR = 'ujinalar';
const tundaJejak = {};
function kirimJejak(misiId, segera = false) {
  const nalar = misiId === ID_UJI_NALAR, tes = misiId === ID_TES;
  if (!jejakAktif() || (nalar ? !(S.ujiNalarRiwayat || []).length : tes ? !Object.keys(S.tes || {}).length : !S.misi[misiId])) return;
  S.jejakTertunda = S.jejakTertunda || {};
  S.jejakTertunda[misiId] = true; simpan();
  clearTimeout(tundaJejak[misiId]);
  tundaJejak[misiId] = setTimeout(async () => {
    const m = MISI.find(x => x.id === misiId); if (!m && !nalar && !tes) return;
    const data = nalar ? { v: 2, riwayat: S.ujiNalarRiwayat.slice(-10) } : tes ? ringkasTes() : ringkasJejak(m, S.misi[misiId]);
    try {
      await memoriApi({ aksi: 'jejak_kirim', kode: S.profil.kodeKelas, perangkat: idPerangkat(), nama: S.profil.nama, kelas: S.profil.kelas, misi: misiId, data }, 12000);
      delete S.jejakTertunda[misiId]; S.jejakTerkirim = Date.now(); simpan();
    } catch (e) { /* dicoba lagi saat aplikasi dibuka / kembali online */ }
  }, segera ? 0 : 2500);
}
function kirimJejakTertunda() {
  if (!jejakAktif() || !navigator.onLine) return;
  Object.keys(S.jejakTertunda || {}).forEach((id, i) => setTimeout(() => kirimJejak(id, true), i * 400));
}
window.addEventListener('online', kirimJejakTertunda);

async function gabungKelas(kode) {
  kode = String(kode || '').trim().toUpperCase();
  if (!kode) { delete S.profil.kodeKelas; delete S.profil.namaKelas; delete S.tesKelas; simpan(); return { keluar: true }; }
  const d = await memoriApi({ aksi: 'kelas_cek', kode }, 12000);
  if (!d.nama) throw new Error('Kode kelas tidak ditemukan. Periksa lagi kode dari gurumu.');
  S.profil.kodeKelas = kode; S.profil.namaKelas = d.nama; S.tesKelas = null; simpan();
  await segarkanTesKelas();
  Object.keys(S.misi).forEach((id, i) => {
    const m = MISI.find(x => x.id === id);
    if (m && (S.misi[id].uji.length || kemajuan(m))) setTimeout(() => kirimJejak(id, true), i * 400);
  });
  if ((S.ujiNalarRiwayat || []).length) setTimeout(() => kirimJejak(ID_UJI_NALAR, true), 300);
  if (Object.keys(S.tes || {}).length) setTimeout(() => kirimJejak(ID_TES, true), 600);
  return { nama: d.nama };
}

/* ---------------- Analisis pola eksplorasi ---------------- */
const POLA_JEJAK = {
  sistematis: { nama: 'Sistematis', ikon: '🧭', warna: '#0f766e', arti: 'Sebagian besar uji adil dan rajin menulis prediksi.', saran: 'Beri tantangan lanjutan: minta ia menjelaskan pola dari datanya kepada teman, atau menguji batas rancangannya (kondisi yang lebih ekstrem).' },
  berkembang: { nama: 'Berkembang', ikon: '🌱', warna: '#2563eb', arti: 'Mulai teratur, tetapi uji adil atau prediksinya belum konsisten.', saran: 'Dorong ia menulis prediksi SEBELUM menguji, lalu membandingkannya dengan hasil. Tanyakan: "Variabel apa yang kamu ubah kali ini, dan mengapa?"' },
  acak: { nama: 'Coba-coba', ikon: '🎲', warna: '#b45309', arti: 'Banyak uji mengubah beberapa variabel sekaligus.', saran: 'Minta ia berhenti sejenak, memilih SATU variabel, menulis prediksi, lalu menguji. Tunjukkan dua ujinya yang berbeda banyak variabel dan tanyakan: "Mana yang menyebabkan perubahan hasil?"' },
  cepat: { nama: 'Tebak cepat', ikon: '⚡', warna: '#be123c', arti: 'Jeda antar-uji sangat singkat — tombol ditekan tanpa jeda berpikir.', saran: 'Minta ia menyebutkan alasan (lisan atau tertulis) sebelum setiap uji. Batasi: "Kamu hanya boleh menguji 3 kali lagi — pilih dengan cermat."' },
  berhenti: { nama: 'Berhenti dini', ikon: '🛑', warna: '#64748b', arti: 'Baru sedikit menguji dan belum memenuhi kriteria.', saran: 'Tanyakan apa yang membuatnya berhenti (bingung, bosan, atau merasa sudah cukup). Bantu dengan pertanyaan pemantik Langkah 4.' },
  belum: { nama: 'Belum menguji', ikon: '⏳', warna: '#94a3b8', arti: 'Belum ada uji di laboratorium maya.', saran: 'Pastikan ia sudah sampai Langkah 4 (Rancang & Uji).' }
};

function median(a) { if (!a.length) return null; const b = [...a].sort((x, y) => x - y), k = Math.floor(b.length / 2); return b.length % 2 ? b[k] : (b[k - 1] + b[k]) / 2; }

function analisisJejak(d) {
  const U = (d && d.uji) || [], n = U.length;
  const nonAwal = U.filter(u => u.a !== null && u.a !== undefined);
  const adil = nonAwal.filter(u => u.a).length;
  const adilRasio = nonAwal.length ? adil / nonAwal.length : null;
  const predRasio = n ? U.filter(u => u.p && u.p.trim()).length / n : 0;
  const tuntasIdx = U.findIndex(u => u.l === u.t);
  const jeda = [];
  for (let i = 1; i < n; i++) if (U[i].w && U[i - 1].w) { const s = (U[i].w - U[i - 1].w) / 1000; if (s > 0 && s < 1800) jeda.push(s); }
  const jedaMedian = median(jeda);
  const rataUbah = nonAwal.length ? nonAwal.reduce((x, u) => x + u.u.length, 0) / nonAwal.length : 0;
  let pola;
  if (!n) pola = 'belum';
  else if (n < 3 && tuntasIdx < 0) pola = 'berhenti';
  else if (jedaMedian !== null && jedaMedian < 6 && n >= 5) pola = 'cepat';
  else if (nonAwal.length >= 2 && adilRasio < 0.4) pola = 'acak';
  else if (adilRasio !== null && adilRasio >= 0.7 && predRasio >= 0.5) pola = 'sistematis';
  else pola = 'berkembang';
  return { n, adil, adilRasio, predRasio, tuntas: tuntasIdx >= 0 ? U[tuntasIdx].n : null, jedaMedian, rataUbah, pola, terbaik: n ? Math.max(...U.map(u => u.l)) : 0, total: n ? U[0].t : 0 };
}

const persen = r => r === null || r === undefined ? '—' : Math.round(r * 100) + '%';
const detik = s => s === null ? '—' : s < 60 ? `${Math.round(s)} dtk` : `${Math.round(s / 60)} mnt`;

// Jejak mini (SVG) untuk tabel: titik = uji; lingkaran = adil, kotak = tidak adil; tinggi = kriteria terpenuhi.
function jejakMini(d) {
  const U = ((d && d.uji) || []).slice(-24); if (!U.length) return '<span class="redup kecil">—</span>';
  const w = Math.max(60, U.length * 9 + 8), h = 26;
  const titik = U.map((u, i) => { const x = 6 + i * 9, y = h - 4 - (u.l / (u.t || 1)) * (h - 8);
    return { x, y, u }; });
  return `<svg class="jejak-mini" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    <polyline points="${titik.map(t => `${t.x},${t.y.toFixed(1)}`).join(' ')}" fill="none" stroke="#cbd5e1" stroke-width="1.5"/>
    ${titik.map(t => t.u.a === false ? `<rect x="${t.x - 3}" y="${(t.y - 3).toFixed(1)}" width="6" height="6" fill="#ef4444"/>`
      : `<circle cx="${t.x}" cy="${t.y.toFixed(1)}" r="3.2" fill="${t.u.l === t.u.t ? '#f59e0b' : t.u.a === null ? '#94a3b8' : '#0d9488'}"/>`).join('')}
  </svg>`;
}

/* ---------------- Peta jejak (kanvas) untuk satu murid ---------------- */
const WARNA_VAR = ['#2563eb', '#db2777', '#ea580c', '#16a34a', '#7c3aed', '#0891b2', '#ca8a04'];
function gambarPetaJejak(cv, m, d) {
  const U = (d && d.uji) || [];
  const lebar = Math.max(cv.parentElement.clientWidth, Math.min(1400, 70 + U.length * 64));
  const H = 250, dpr = window.devicePixelRatio || 1;
  cv.width = lebar * dpr; cv.height = H * dpr; cv.style.width = lebar + 'px'; cv.style.height = H + 'px';
  const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, lebar, H);
  if (!U.length) { label(ctx, 'Belum ada uji.', lebar / 2, H / 2, { rata: 'center', warna: '#64748b' }); return; }
  const kiri = 46, atas = 26, bawahGrafik = 150, total = U[0].t || 1;
  const px = i => kiri + 24 + i * Math.max(40, (lebar - kiri - 60) / Math.max(1, U.length - 1 || 1));
  const py = l => bawahGrafik - (l / total) * (bawahGrafik - atas);
  // sumbu & garis bantu
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.font = '11px "Plus Jakarta Sans", sans-serif';
  for (let k = 0; k <= total; k++) { const y = py(k); ctx.beginPath(); ctx.moveTo(kiri, y); ctx.lineTo(lebar - 10, y); ctx.stroke(); label(ctx, `${k}/${total}`, kiri - 6, y, { rata: 'right', ukuran: 10, warna: '#64748b' }); }
  label(ctx, 'kriteria terpenuhi', 4, 12, { ukuran: 10, warna: '#64748b' });
  // garis jejak
  ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath();
  U.forEach((u, i) => (i ? ctx.lineTo(px(i), py(u.l)) : ctx.moveTo(px(i), py(u.l)))); ctx.stroke();
  // catatan uji menyimpan label variabel (data lama/simulasi bisa berisi id) — terima keduanya
  const indeksVar = s => m.variabel.findIndex(x => x.id === s || x.label === s);
  const varNama = s => { const k = indeksVar(s); return k >= 0 ? m.variabel[k].label : s; };
  const warnaVar = s => WARNA_VAR[Math.max(0, indeksVar(s)) % WARNA_VAR.length];
  U.forEach((u, i) => {
    const x = px(i), y = py(u.l);
    // jeda berpikir sebelum uji ini
    if (i && u.w && U[i - 1].w) { const s = (u.w - U[i - 1].w) / 1000; if (s > 0 && s < 1800) label(ctx, detik(s), (x + px(i - 1)) / 2, bawahGrafik + 14, { rata: 'center', ukuran: 9, warna: s < 6 ? '#be123c' : '#94a3b8' }); }
    // simpul uji
    if (u.a === false) { ctx.fillStyle = '#ef4444'; ctx.fillRect(x - 7, y - 7, 14, 14); }
    else { ctx.fillStyle = u.a === null ? '#94a3b8' : '#0d9488'; ctx.beginPath(); ctx.arc(x, y, 7.5, 0, 7); ctx.fill(); }
    if (u.l === u.t) { ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 11.5, 0, 7); ctx.stroke(); }
    label(ctx, String(u.n), x, y, { rata: 'center', ukuran: 9, tebal: true, warna: '#fff' });
    if (u.p && u.p.trim()) label(ctx, '💭', x + 11, y - 15, { ukuran: 15 });
    // variabel yang diubah
    const ubah = u.a === null ? ['awal'] : u.u;
    ubah.slice(0, 3).forEach((id, k) => {
      const teks = id === 'awal' ? 'uji awal' : potongTeks(varNama(id), 12);
      label(ctx, teks, x, bawahGrafik + 34 + k * 19, { rata: 'center', ukuran: 9, tebal: true, warna: '#fff', latar: id === 'awal' ? '#94a3b8' : warnaVar(id) });
    });
    if (ubah.length > 3) label(ctx, `+${ubah.length - 3}`, x, bawahGrafik + 34 + 3 * 19, { rata: 'center', ukuran: 9, warna: '#64748b' });
  });
}
function potongTeks(t, n) { return t.length > n ? t.slice(0, n - 1) + '…' : t; }

/* ---------------- Halaman guru: #/jejak ---------------- */
let jejakTerpilih = { kode: '', misi: '', murid: '' };
try { jejakTerpilih = { ...jejakTerpilih, ...JSON.parse(sessionStorage.getItem('nalarstem-jejak') || '{}') }; } catch (e) { /* abaikan */ }
const simpanPilihanJejak = () => { try { sessionStorage.setItem('nalarstem-jejak', JSON.stringify(jejakTerpilih)); } catch (e) { /* abaikan */ } };

function halJejak() {
  if (location.protocol === 'file:') { APP.innerHTML = '<h1 class="judul-hal">Peta Jejak Berpikir</h1><p class="peringatan">Halaman ini memerlukan server — buka aplikasi lewat alamat web.</p>'; return; }
  if (!sandiGuru()) {
    APP.innerHTML = `<h1 class="judul-hal">🔐 Peta Jejak Berpikir</h1>
    <div class="kartu prosa" style="max-width:560px">
      <p>Halaman ini khusus guru. Di sini guru melihat <b>cara murid bereksperimen</b> di laboratorium maya: apakah ia mengubah satu variabel tiap uji, menulis prediksi, memberi jeda berpikir, dan kapan kriterianya terpenuhi.</p>
      <form id="fSandi" class="baris-form"><input type="password" id="sandiGuru" placeholder="Sandi guru" autocomplete="current-password" required><button class="tombol utama">Masuk</button></form>
      <p class="galat" id="galatSandi" hidden></p>
    </div>`;
    $('#fSandi').onsubmit = async e => {
      e.preventDefault();
      const s = $('#sandiGuru').value, g = $('#galatSandi'); g.hidden = true;
      try {
        const d = await memoriApi({ aksi: 'guru_cek', sandi: s }, 15000);
        if (!d.ok) { g.textContent = 'Sandi salah.'; g.hidden = false; return; }
        setSandiGuru(s); halJejak();
      } catch (err) { g.textContent = 'Tidak bisa menghubungi server: ' + err.message; g.hidden = false; }
    };
    return;
  }
  APP.innerHTML = `<div class="kepala-porto"><div><h1 class="judul-hal">🧭 Peta Jejak Berpikir</h1>
      <p class="redup">Lihat cara murid bereksperimen — bukan hanya hasil akhirnya.</p></div>
    <div class="aksi-porto"><a class="tombol" href="#/kurasi">🧠 Kurasi memori</a><button class="tombol" id="bKeluarGuru">Keluar</button></div></div>
  <div class="kartu"><div class="lab-kepala"><h3>🏫 Kelas</h3><button class="tombol kecil" id="bSegarKelas">↻ Segarkan</button></div>
    <div id="daftarKelas"><p class="redup">Memuat…</p></div>
    <form id="fKelasBaru" class="baris-form" style="margin-top:12px"><input id="namaKelasBaru" placeholder="Nama kelas baru, mis. 8B 2026/2027" maxlength="60" required><button class="tombol utama">＋ Buat kelas</button></form>
    <p class="redup kecil">Setelah kelas dibuat, tuliskan <b>kodenya</b> di papan. Murid memasukkan kode itu di Beranda (kartu profil). Mulai saat itu jejak uji mereka terkirim otomatis — isi chat dengan Kak Nala <b>tidak</b> ikut terkirim.</p>
  </div>
  <div id="isiJejak"></div>`;
  $('#bKeluarGuru').onclick = () => { setSandiGuru(''); location.hash = '#/guru'; };
  $('#bSegarKelas').onclick = () => muatKelas();
  $('#fKelasBaru').onsubmit = async e => {
    e.preventDefault();
    try {
      const d = await memoriApi({ aksi: 'guru_kelas_buat', sandi: sandiGuru(), nama: $('#namaKelasBaru').value.trim() }, 15000);
      $('#namaKelasBaru').value = ''; jejakTerpilih.kode = d.kode; simpanPilihanJejak();
      toast(`Kelas dibuat — kode: ${d.kode}`); muatKelas();
    } catch (err) { toast(err.message, 'peringatan'); if (err.status === 401) { setSandiGuru(''); halJejak(); } }
  };
  muatKelas();
}

async function muatKelas() {
  const wadah = $('#daftarKelas'); if (!wadah) return;
  let kelas = [];
  try { kelas = (await memoriApi({ aksi: 'guru_kelas_daftar', sandi: sandiGuru() }, 15000)).hasil || []; }
  catch (err) { wadah.innerHTML = `<p class="galat">${esc(err.message)}</p>`; if (err.status === 401) { setSandiGuru(''); halJejak(); } return; }
  if (!kelas.length) { wadah.innerHTML = '<p class="redup">Belum ada kelas. Buat kelas pertamamu di bawah.</p>'; $('#isiJejak').innerHTML = ''; return; }
  if (!kelas.some(k => k.kode === jejakTerpilih.kode)) { jejakTerpilih.kode = kelas[0].kode; simpanPilihanJejak(); }
  wadah.innerHTML = `<div class="daftar-kelas">${kelas.map(k => `<button type="button" class="kelas-chip ${k.kode === jejakTerpilih.kode ? 'aktif' : ''}" data-kode="${esc(k.kode)}">
      <b>${esc(k.nama)}</b><span class="kode-kelas">${esc(k.kode)}</span><small>${k.murid} murid${k.aktif ? ` · aktif ${new Date(k.aktif).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}` : ''}</small></button>`).join('')}</div>`;
  $$('[data-kode]', wadah).forEach(b => b.onclick = () => { jejakTerpilih.kode = b.dataset.kode; jejakTerpilih.murid = ''; simpanPilihanJejak(); muatKelas(); });
  muatJejakKelas(kelas.find(k => k.kode === jejakTerpilih.kode));
}

/* ---------------- Analisis partisipasi ----------------
   Skor 0–100 = langkah selesai 30 + uji maya 20 + prediksi 10 + bertanya sendiri 20
              + lembar kerja terisi 10 + pemeriksaan lembar kerja 10. */
const TINGKAT_PARTISIPASI = {
  tinggi: { nama: 'Tinggi', warna: '#15803d', arti: 'Terlibat di sebagian besar kegiatan dan aktif bertanya.' },
  sedang: { nama: 'Sedang', warna: '#b45309', arti: 'Sudah terlibat, tetapi ada kegiatan yang masih jarang dilakukan.' },
  rendah: { nama: 'Rendah', warna: '#be123c', arti: 'Baru sedikit terlibat — perlu disapa dan didampingi.' }
};
function analisisPartisipasi(d) {
  const P = (d && d.partisipasi) || null, A = analisisJejak(d);
  const langkah = (d && d.langkah) || 0;
  const isianRasio = P && P.isianTotal ? P.isian / P.isianTotal : null;
  const tanya = P ? P.tanya : null, periksa = P ? P.periksa + P.periksaUlang : null;
  const skor = Math.round(
    30 * Math.min(1, langkah / LANGKAH.length) + 20 * Math.min(A.n, 6) / 6 + 10 * (A.n ? A.predRasio : 0) +
    20 * Math.min(tanya || 0, 5) / 5 + 10 * (isianRasio || 0) + 10 * Math.min(periksa || 0, 7) / 7);
  return {
    ada: !!P, skor, tingkat: skor >= 70 ? 'tinggi' : skor >= 40 ? 'sedang' : 'rendah', langkah, uji: A.n, predRasio: A.n ? A.predRasio : null,
    tanya, tombol: P ? P.tombol : null, isian: P ? P.isian : null, isianTotal: P ? P.isianTotal : null, isianRasio,
    periksa: P ? P.periksa : null, periksaUlang: P ? P.periksaUlang : null, hari: P ? P.hari : null, terakhir: P ? P.terakhir : null
  };
}
function ringkasNalar(d) {
  const R = (d && d.riwayat) || [];
  if (!R.length) return null;
  const nilai = x => Math.round(x.skor / x.total * 100);
  return { kali: R.length, awal: nilai(R[0]), akhir: nilai(R[R.length - 1]), naik: R.length >= 2 ? nilai(R[R.length - 1]) - nilai(R[0]) : null };
}
const rataRata = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : null;
const desimal = (x, d = 1) => x === null ? '—' : x.toFixed(d).replace('.', ',');
const teksNalar = N => !N ? '<span class="redup">—</span>' : N.kali >= 2 ? `${N.awal} → <b>${N.akhir}</b> <small class="${N.naik >= 0 ? 'naik' : 'turun'}">(${N.naik >= 0 ? '+' : ''}${N.naik})</small>` : `${N.awal} <small class="redup">(1×)</small>`;
const tagTingkat = T => `<span class="pola-tag" style="--c:${TINGKAT_PARTISIPASI[T.tingkat].warna}">${T.skor} · ${TINGKAT_PARTISIPASI[T.tingkat].nama}</span>`;

async function muatJejakKelas(kelas) {
  const wadah = $('#isiJejak'); if (!wadah) return;
  wadah.innerHTML = '<p class="redup">Memuat jejak murid…</p>';
  let baris = [];
  try { baris = (await memoriApi({ aksi: 'guru_jejak', sandi: sandiGuru(), kode: kelas.kode }, 20000)).hasil || []; }
  catch (err) { wadah.innerHTML = `<p class="galat">${esc(err.message)}</p>`; return; }
  const nalarPer = Object.fromEntries(baris.filter(r => r.misi === ID_UJI_NALAR).map(r => [r.perangkat, ringkasNalar(r.data)]));
  const misiAda = MISI.filter(m => baris.some(r => r.misi === m.id));
  const kartuKode = `<div class="kartu kartu-kode"><div><small class="redup">Kode kelas <b>${esc(kelas.nama)}</b></small><div class="kode-besar">${esc(kelas.kode)}</div></div>
    <p class="redup kecil">Murid: Beranda → kartu profil → isi <b>Kode kelas</b> → Simpan. Jejak terkirim otomatis setiap kali murid menguji rancangan, memeriksa lembar kerja, bertanya ke Kak Nala, mengerjakan Uji Nalar, atau mengirim Mode Tes.</p></div>`;
  const panelTes = htmlPanelTes(kelas, baris), muatUlang = () => muatJejakKelas(kelas);
  if (!misiAda.length) { wadah.innerHTML = kartuKode + panelTes + '<div class="kartu kosong"><p class="redup">Belum ada jejak dari murid di kelas ini. Minta murid bergabung dengan kode di atas, lalu mengerjakan sebuah misi.</p></div>' + htmlZonaKelas(kelas); pasangZonaKelas(kelas); pasangPanelTes(kelas, baris, muatUlang); return; }
  if (!misiAda.some(m => m.id === jejakTerpilih.misi)) jejakTerpilih.misi = misiAda.map(m => [m.id, baris.filter(r => r.misi === m.id).length]).sort((a, b) => b[1] - a[1])[0][0];
  const tampilan = jejakTerpilih.tampilan === 'partisipasi' ? 'partisipasi' : 'berpikir';
  const m = MISI.find(x => x.id === jejakTerpilih.misi);
  const murid = baris.filter(r => r.misi === m.id).map(r => ({ ...r, A: analisisJejak(r.data), T: analisisPartisipasi(r.data), N: nalarPer[r.perangkat] || null }));
  const urutanPola = Object.keys(POLA_JEJAK), urutanTingkat = Object.keys(TINGKAT_PARTISIPASI);
  if (tampilan === 'partisipasi') murid.sort((a, b) => a.T.skor - b.T.skor || a.nama.localeCompare(b.nama, 'id'));
  else murid.sort((a, b) => urutanPola.indexOf(b.A.pola) - urutanPola.indexOf(a.A.pola) || a.nama.localeCompare(b.nama, 'id'));
  const aktif = murid.filter(r => r.A.n);
  const adilSemua = aktif.filter(r => r.A.adilRasio !== null);
  const sebaran = urutanPola.map(p => [p, murid.filter(r => r.A.pola === p).length]).filter(x => x[1]);
  // ringkasan partisipasi kelas
  const adaP = murid.filter(r => r.T.ada);
  const sebaranT = urutanTingkat.map(t => [t, murid.filter(r => r.T.tingkat === t).length]).filter(x => x[1]);
  const nalarDua = murid.filter(r => r.N && r.N.kali >= 2);
  const perluDisapa = murid.filter(r => r.T.tingkat === 'rendah');
  const kolomBerpikir = `<tr><th>Murid</th><th>Pola</th><th>Uji</th><th>Uji adil</th><th>Prediksi</th><th>Jeda</th><th>Tuntas di</th><th>Jejak</th></tr>`;
  const kolomPartisipasi = `<tr><th>Murid</th><th>Partisipasi</th><th>Langkah</th><th>Uji</th><th>Bertanya</th><th>Lembar kerja</th><th>Hari aktif</th><th>Uji Nalar</th></tr>`;
  const barisMurid = r => tampilan === 'partisipasi'
    ? `<td>${tagTingkat(r.T)}</td><td>${r.T.langkah}/${LANGKAH.length}</td><td>${r.T.uji}</td>
       <td>${r.T.ada ? `<b>${r.T.tanya}</b> <small class="redup">sendiri</small> · ${r.T.tombol} <small class="redup">tombol</small>` : '<span class="redup">—</span>'}</td>
       <td>${r.T.ada ? `${r.T.isian}/${r.T.isianTotal} <small class="redup">diisi</small> · ${r.T.periksa + r.T.periksaUlang}× <small class="redup">diperiksa</small>` : '<span class="redup">—</span>'}</td>
       <td>${r.T.ada ? r.T.hari : '—'}</td><td>${teksNalar(r.N)}</td>`
    : `<td><span class="pola-tag" style="--c:${POLA_JEJAK[r.A.pola].warna}">${POLA_JEJAK[r.A.pola].ikon} ${POLA_JEJAK[r.A.pola].nama}</span></td>
       <td>${r.A.n}</td><td>${persen(r.A.adilRasio)}</td><td>${persen(r.A.n ? r.A.predRasio : null)}</td><td>${detik(r.A.jedaMedian)}</td>
       <td>${r.A.tuntas ? `uji ke-${r.A.tuntas}` : `<span class="redup">${r.A.terbaik}/${r.A.total || '—'}</span>`}</td><td>${jejakMini(r.data)}</td>`;
  wadah.innerHTML = `${kartuKode}
  ${panelTes}
  <div class="kartu">
    <div class="lab-kepala"><h3>📊 Ringkasan kelas</h3>
      <label class="ctl ctl-sebaris"><span>Misi</span><select id="jMisi">${misiAda.map(x => `<option value="${x.id}" ${x.id === m.id ? 'selected' : ''}>${x.ikon} ${esc(x.judul)} (${baris.filter(r => r.misi === x.id).length})</option>`).join('')}</select></label></div>
    <h4 class="sub-ringkas">🧭 Cara berpikir</h4>
    <div class="statistik">
      <div><b>${murid.length}</b><small>murid</small></div>
      <div><b>${aktif.length ? desimal(rataRata(aktif.map(r => r.A.n))) : '—'}</b><small>rata-rata uji</small></div>
      <div><b>${adilSemua.length ? persen(rataRata(adilSemua.map(r => r.A.adilRasio))) : '—'}</b><small>uji adil</small></div>
      <div><b>${murid.length ? persen(murid.filter(r => r.A.tuntas).length / murid.length) : '—'}</b><small>memenuhi semua kriteria</small></div>
    </div>
    <div class="sebaran-pola" role="img" aria-label="Sebaran pola eksplorasi">${sebaran.map(([p, n]) => `<span style="flex:${n};background:${POLA_JEJAK[p].warna}" title="${POLA_JEJAK[p].nama}: ${n}">${POLA_JEJAK[p].ikon} ${n}</span>`).join('')}</div>
    <div class="legenda-pola">${sebaran.map(([p]) => `<span><i style="background:${POLA_JEJAK[p].warna}"></i><b>${POLA_JEJAK[p].ikon} ${POLA_JEJAK[p].nama}</b> — ${POLA_JEJAK[p].arti}</span>`).join('')}</div>
    <h4 class="sub-ringkas">🙋 Partisipasi</h4>
    <div class="statistik">
      <div><b>${desimal(rataRata(murid.map(r => r.T.skor)), 0)}</b><small>skor partisipasi rata-rata</small></div>
      <div><b>${adaP.length ? persen(adaP.filter(r => r.T.tanya > 0).length / adaP.length) : '—'}</b><small>aktif bertanya sendiri</small></div>
      <div><b>${desimal(rataRata(murid.map(r => r.T.langkah)))}<small class="dari">/${LANGKAH.length}</small></b><small>langkah selesai</small></div>
      <div><b>${adaP.length ? desimal(rataRata(adaP.map(r => r.T.hari))) : '—'}</b><small>hari aktif rata-rata</small></div>
      <div><b>${nalarDua.length ? `${desimal(rataRata(nalarDua.map(r => r.N.awal)), 0)} → ${desimal(rataRata(nalarDua.map(r => r.N.akhir)), 0)}` : '—'}</b><small>Uji Nalar awal → akhir${nalarDua.length ? ` (${nalarDua.length} murid)` : ''}</small></div>
    </div>
    <div class="sebaran-pola" role="img" aria-label="Sebaran tingkat partisipasi">${sebaranT.map(([t, n]) => `<span style="flex:${n};background:${TINGKAT_PARTISIPASI[t].warna}" title="${TINGKAT_PARTISIPASI[t].nama}: ${n}">${TINGKAT_PARTISIPASI[t].nama} ${n}</span>`).join('')}</div>
    ${perluDisapa.length ? `<div class="perlu-disapa"><b>👋 Perlu disapa (${perluDisapa.length}):</b> ${perluDisapa.slice(0, 15).map(r => `<button type="button" class="kelas-chip mini" data-sapa="${esc(r.perangkat)}">${esc(r.nama)} <small>${r.T.skor}</small></button>`).join('')}</div>` : ''}
    <details class="cara-skor"><summary>Cara menghitung skor partisipasi</summary>
      <p class="redup kecil">Skor 0–100 = langkah misi selesai (30) + jumlah uji di laboratorium maya, penuh pada 6 uji (20) + proporsi uji yang disertai prediksi (10) + pertanyaan yang diketik sendiri ke Kak Nala, penuh pada 5 pertanyaan (20) + isian lembar kerja terisi (10) + pemeriksaan lembar kerja, penuh pada 7 kali (10). Tinggi ≥ 70, Sedang 40–69, Rendah &lt; 40. Pertanyaan lewat tombol cepat dihitung terpisah dan tidak menambah skor. Isi percakapan tidak pernah dikirim ke guru.</p>
    </details>
  </div>
  <div class="kartu">
    <div class="lab-kepala"><h3>👥 Tiap murid</h3>
      <div class="pilih-tampilan" role="tablist" aria-label="Tampilan tabel">
        <button type="button" role="tab" data-tampilan="berpikir" aria-selected="${tampilan === 'berpikir'}">🧭 Cara berpikir</button>
        <button type="button" role="tab" data-tampilan="partisipasi" aria-selected="${tampilan === 'partisipasi'}">🙋 Partisipasi</button>
      </div>
      <button class="tombol kecil" id="bUnduhJejak">⬇️ Unduh CSV</button></div>
    <p class="redup kecil">${tampilan === 'partisipasi'
      ? 'Diurutkan dari partisipasi terendah. "Sendiri" = pertanyaan yang diketik murid; "tombol" = tombol petunjuk cepat. Uji Nalar = nilai pertama → terakhir (skala 100). Klik baris untuk rinciannya.'
      : 'Jejak mini: <span class="lgd bulat teal"></span> uji adil · <span class="lgd kotak"></span> uji mengubah >1 variabel · <span class="lgd bulat emas"></span> semua kriteria terpenuhi. Klik baris untuk melihat peta lengkapnya.'}</p>
    <div class="tabel-gulir"><table class="tabel tabel-jejak"><thead>${tampilan === 'partisipasi' ? kolomPartisipasi : kolomBerpikir}</thead>
      <tbody>${murid.map(r => `<tr data-murid="${esc(r.perangkat)}" class="${r.perangkat === jejakTerpilih.murid ? 'dipilih' : ''}" tabindex="0">
        <td><b>${esc(r.nama)}</b>${r.kelas ? `<br><small class="redup">${esc(r.kelas)}</small>` : ''}</td>${barisMurid(r)}</tr>`).join('')}</tbody></table></div>
  </div>
  <div id="detailJejak"></div>
  ${htmlZonaKelas(kelas)}`;
  $('#jMisi').onchange = e => { jejakTerpilih.misi = e.target.value; jejakTerpilih.murid = ''; simpanPilihanJejak(); muatJejakKelas(kelas); };
  $$('[data-tampilan]').forEach(b => b.onclick = () => { jejakTerpilih.tampilan = b.dataset.tampilan; simpanPilihanJejak(); muatJejakKelas(kelas); });
  const pilih = id => {
    jejakTerpilih.murid = id; simpanPilihanJejak();
    $$('[data-murid]').forEach(tr => tr.classList.toggle('dipilih', tr.dataset.murid === id));
    tampilDetailJejak(m, murid.find(r => r.perangkat === id), kelas);
  };
  $$('[data-murid]').forEach(tr => { tr.onclick = () => pilih(tr.dataset.murid); tr.onkeydown = e => { if (e.key === 'Enter') pilih(tr.dataset.murid); }; });
  $$('[data-sapa]').forEach(b => b.onclick = () => pilih(b.dataset.sapa));
  if (murid.some(r => r.perangkat === jejakTerpilih.murid)) tampilDetailJejak(m, murid.find(r => r.perangkat === jejakTerpilih.murid), kelas, false);
  $('#bUnduhJejak').onclick = () => unduhCsvJejak(kelas, baris);
  pasangZonaKelas(kelas);
  pasangPanelTes(kelas, baris, muatUlang);
}

// Saran tindak lanjut partisipasi: dari kegiatan yang paling rendah
function saranPartisipasi(T) {
  if (!T.ada) return 'Data partisipasi rinci belum ada untuk murid ini (aplikasinya belum diperbarui di perangkat murid). Data akan muncul setelah murid membuka aplikasi lagi.';
  const s = [];
  if (T.langkah < 3) s.push('Ia baru menyelesaikan sedikit langkah — tanyakan bagian mana yang membuatnya berhenti.');
  if (T.tanya === 0) s.push(T.tombol ? 'Ia hanya memakai tombol petunjuk dan belum pernah mengetik pertanyaan sendiri — ajak ia merumuskan satu pertanyaan dengan kata-katanya.' : 'Ia belum pernah bertanya ke Kak Nala — tunjukkan cara bertanya dan contohkan satu pertanyaan.');
  if (T.uji < 3) s.push('Uji di laboratorium maya masih kurang dari 3 — minta ia menguji ulang dengan mengubah satu variabel.');
  if (T.isianRasio !== null && T.isianRasio < 0.5) s.push('Lebih dari separuh lembar kerja masih kosong.');
  if (T.periksaUlang === 0 && T.periksa > 0) s.push('Ia belum pernah memperbaiki jawaban setelah diperiksa — dorong ia membaca umpan balik dan memperbaiki satu jawaban.');
  return s.length ? s.join(' ') : 'Partisipasinya baik. Beri peran sebagai teman diskusi bagi murid yang partisipasinya rendah.';
}

function tampilDetailJejak(m, r, kelas, gulir = true) {
  const wadah = $('#detailJejak'); if (!wadah || !r) return;
  const A = r.A, P = POLA_JEJAK[A.pola], T = r.T, U = (r.data && r.data.uji) || [];
  const nilai = Object.entries((r.data && r.data.nilai) || {});
  wadah.innerHTML = `<div class="kartu detail-jejak" style="--c:${P.warna}">
    <div class="lab-kepala"><h3>🗺️ ${esc(r.nama)}</h3><span><span class="pola-tag" style="--c:${P.warna}">${P.ikon} ${P.nama}</span> ${tagTingkat(T)}</span></div>
    <p class="redup kecil">${m.ikon} ${esc(m.judul)} · ${r.data.langkah || 0}/${LANGKAH.length} langkah · ${r.data.nyata || 0} uji nyata · rencana ${r.data.rencana || 0} langkah · diperbarui ${new Date(r.diperbarui).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
    <h4 class="sub-ringkas">🙋 Partisipasi</h4>
    <div class="statistik">
      <div><b>${T.langkah}<small class="dari">/${LANGKAH.length}</small></b><small>langkah selesai</small></div>
      <div><b>${T.ada ? T.tanya : '—'}</b><small>pertanyaan diketik sendiri</small></div>
      <div><b>${T.ada ? T.tombol : '—'}</b><small>petunjuk lewat tombol</small></div>
      <div><b>${T.ada ? `${T.isian}<small class="dari">/${T.isianTotal}</small>` : '—'}</b><small>isian lembar kerja</small></div>
      <div><b>${T.ada ? `${T.periksa}+${T.periksaUlang}` : '—'}</b><small>diperiksa + diperbaiki</small></div>
      <div><b>${T.ada ? T.hari : '—'}</b><small>hari aktif</small></div>
      <div><b>${r.N ? (r.N.kali >= 2 ? `${r.N.awal}→${r.N.akhir}` : r.N.awal) : '—'}</b><small>Uji Nalar${r.N ? ` (${r.N.kali}×)` : ''}</small></div>
    </div>
    <div class="saran-guru"><b>👋 Saran partisipasi:</b> ${esc(saranPartisipasi(T))}</div>
    <h4 class="sub-ringkas">🧭 Peta jejak berpikir</h4>
    <div class="peta-gulir"><canvas id="petaJejak"></canvas></div>
    <p class="redup kecil">Titik = uji (nomor di dalamnya). <b style="color:#0d9488">●</b> adil · <b style="color:#ef4444">■</b> mengubah lebih dari satu variabel · cincin emas = semua kriteria terpenuhi · 💭 = menulis prediksi. Label berwarna = variabel yang diubah; angka abu-abu = jeda berpikir sebelum uji (<span style="color:#be123c">merah</span> bila &lt; 6 detik).</p>
    <div class="saran-guru"><b>💡 Saran cara berpikir:</b> ${esc(P.saran)}</div>
    ${nilai.length ? `<p class="kecil"><b>Rata-rata rubrik Kak Nala:</b> ${nilai.map(([id, s]) => { const I = INDIKATOR.find(x => x.id === id); return I ? `${I.nama} ${String(s).replace('.', ',')}` : ''; }).filter(Boolean).join(' · ')}</p>` : ''}
    <details><summary><b>Rincian ${U.length} uji</b></summary>
      <div class="tabel-gulir"><table class="tabel"><thead><tr><th>Uji</th><th>Yang diubah</th><th>Kriteria</th><th>Prediksi murid</th></tr></thead>
        <tbody>${U.map(u => `<tr><td>${u.n}</td><td>${u.a === null ? 'uji awal' : `${u.a ? '✔' : '⚠'} ${esc(u.u.map(s => (m.variabel.find(v => v.id === s || v.label === s) || { label: s }).label).join(', '))}`}</td><td>${u.l}/${u.t}</td><td class="kecil">${u.p ? esc(u.p) : '<span class="redup">—</span>'}</td></tr>`).join('')}</tbody></table></div>
    </details>
    <div class="aksi-lembar"><button type="button" class="tombol kecil bahaya" id="bHapusMurid">Hapus jejak murid ini dari kelas</button></div>
  </div>`;
  const cv = $('#petaJejak');
  gambarPetaJejak(cv, m, r.data);
  $('#bHapusMurid').onclick = async () => {
    if (!confirm(`Hapus semua jejak ${r.nama} dari kelas ${kelas.nama}? Data di perangkat murid tidak terhapus.`)) return;
    try { await memoriApi({ aksi: 'guru_jejak_hapus', sandi: sandiGuru(), kode: kelas.kode, perangkat: r.perangkat }, 15000); jejakTerpilih.murid = ''; simpanPilihanJejak(); toast('Jejak murid dihapus'); muatKelas(); }
    catch (err) { toast(err.message, 'peringatan'); }
  };
  if (gulir) wadah.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function htmlZonaKelas(kelas) {
  return `<details class="kartu zona-kelas"><summary><b>Kelola kelas ${esc(kelas.nama)}</b></summary>
    <p class="redup kecil">Menghapus kelas akan menghapus semua jejak murid di kelas ini dari server. Data di perangkat murid tetap ada.</p>
    <button type="button" class="tombol bahaya" id="bHapusKelas">Hapus kelas ${esc(kelas.kode)}</button></details>`;
}
function pasangZonaKelas(kelas) {
  const b = $('#bHapusKelas'); if (!b) return;
  b.onclick = async () => {
    if (!confirm(`Hapus kelas ${kelas.nama} (${kelas.kode}) beserta semua jejak muridnya? Tindakan ini tidak bisa dibatalkan.`)) return;
    try { await memoriApi({ aksi: 'guru_kelas_hapus', sandi: sandiGuru(), kode: kelas.kode }, 15000); jejakTerpilih = { kode: '', misi: '', murid: '' }; simpanPilihanJejak(); toast('Kelas dihapus'); muatKelas(); }
    catch (err) { toast(err.message, 'peringatan'); }
  };
}

function unduhCsvJejak(kelas, baris) {
  const sel = v => { const s = String(v ?? ''); return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const kepala = ['nama', 'kelas', 'misi', 'pola', 'jumlah_uji', 'uji_adil_persen', 'prediksi_persen', 'jeda_median_detik', 'tuntas_di_uji', 'kriteria_terbaik', 'jumlah_kriteria',
    'langkah_selesai', 'uji_nyata', 'skor_partisipasi', 'tingkat_partisipasi', 'pertanyaan_diketik', 'pertanyaan_tombol', 'isian_terisi', 'isian_total', 'lembar_diperiksa', 'lembar_diperbaiki', 'hari_aktif',
    'uji_nalar_pertama', 'uji_nalar_terakhir', 'uji_nalar_kali', 'diperbarui'];
  const nalarPer = Object.fromEntries(baris.filter(r => r.misi === ID_UJI_NALAR).map(r => [r.perangkat, ringkasNalar(r.data)]));
  const isi = baris.filter(r => r.misi !== ID_UJI_NALAR).map(r => {
    const A = analisisJejak(r.data), T = analisisPartisipasi(r.data), N = nalarPer[r.perangkat], m = MISI.find(x => x.id === r.misi);
    const kosong = v => (v === null || v === undefined ? '' : v);
    return [r.nama, r.kelas, m ? m.judul : r.misi, POLA_JEJAK[A.pola].nama, A.n, A.adilRasio === null ? '' : Math.round(A.adilRasio * 100), A.n ? Math.round(A.predRasio * 100) : '',
      A.jedaMedian === null ? '' : Math.round(A.jedaMedian), A.tuntas || '', A.n ? A.terbaik : '', A.n ? A.total : '', T.langkah, (r.data && r.data.nyata) || 0,
      T.skor, TINGKAT_PARTISIPASI[T.tingkat].nama, kosong(T.tanya), kosong(T.tombol), kosong(T.isian), kosong(T.isianTotal), kosong(T.periksa), kosong(T.periksaUlang), kosong(T.hari),
      N ? N.awal : '', N && N.kali >= 2 ? N.akhir : '', N ? N.kali : '', new Date(r.diperbarui).toLocaleString('id-ID')].map(sel).join(';');
  });
  const blob = new Blob(['﻿' + [kepala.join(';'), ...isi].join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `jejak-berpikir-${kelas.kode}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
