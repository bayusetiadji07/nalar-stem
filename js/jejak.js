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

function ringkasJejak(m, st) {
  const nilai = {};
  Object.values(st.nilai || {}).forEach(n => Object.entries(n.skor || {}).forEach(([id, s]) => { (nilai[id] = nilai[id] || []).push(s); }));
  return {
    v: 1,
    uji: st.uji.slice(-60).map(u => ({ n: u.no, l: u.lulus, t: u.total, a: u.adil, u: u.ubah || [], p: (u.prediksi || '').slice(0, 160), w: u.waktu || null, x: u.v })),
    langkah: kemajuan(m),
    nilai: Object.fromEntries(Object.entries(nilai).map(([id, a]) => [id, Math.round(a.reduce((x, y) => x + y, 0) / a.length * 10) / 10])),
    nyata: (st.nyata && st.nyata.uji.length) || 0,
    rencana: (st.nyata && st.nyata.rencana ? st.nyata.rencana.length : 0)
  };
}

const tundaJejak = {};
function kirimJejak(misiId, segera = false) {
  if (!jejakAktif() || !S.misi[misiId]) return;
  S.jejakTertunda = S.jejakTertunda || {};
  S.jejakTertunda[misiId] = true; simpan();
  clearTimeout(tundaJejak[misiId]);
  tundaJejak[misiId] = setTimeout(async () => {
    const m = MISI.find(x => x.id === misiId); if (!m) return;
    try {
      await memoriApi({ aksi: 'jejak_kirim', kode: S.profil.kodeKelas, perangkat: idPerangkat(), nama: S.profil.nama, kelas: S.profil.kelas, misi: misiId, data: ringkasJejak(m, S.misi[misiId]) }, 12000);
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
  if (!kode) { delete S.profil.kodeKelas; delete S.profil.namaKelas; simpan(); return { keluar: true }; }
  const d = await memoriApi({ aksi: 'kelas_cek', kode }, 12000);
  if (!d.nama) throw new Error('Kode kelas tidak ditemukan. Periksa lagi kode dari gurumu.');
  S.profil.kodeKelas = kode; S.profil.namaKelas = d.nama; simpan();
  Object.keys(S.misi).forEach((id, i) => { if (S.misi[id].uji.length) setTimeout(() => kirimJejak(id, true), i * 400); });
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

async function muatJejakKelas(kelas) {
  const wadah = $('#isiJejak'); if (!wadah) return;
  wadah.innerHTML = '<p class="redup">Memuat jejak murid…</p>';
  let baris = [];
  try { baris = (await memoriApi({ aksi: 'guru_jejak', sandi: sandiGuru(), kode: kelas.kode }, 20000)).hasil || []; }
  catch (err) { wadah.innerHTML = `<p class="galat">${esc(err.message)}</p>`; return; }
  const misiAda = MISI.filter(m => baris.some(r => r.misi === m.id));
  const kartuKode = `<div class="kartu kartu-kode"><div><small class="redup">Kode kelas <b>${esc(kelas.nama)}</b></small><div class="kode-besar">${esc(kelas.kode)}</div></div>
    <p class="redup kecil">Murid: Beranda → kartu profil → isi <b>Kode kelas</b> → Simpan. Jejak terkirim otomatis setiap kali murid menguji rancangan.</p></div>`;
  if (!misiAda.length) { wadah.innerHTML = kartuKode + '<div class="kartu kosong"><p class="redup">Belum ada jejak dari murid di kelas ini. Minta murid bergabung dengan kode di atas, lalu mengerjakan Langkah 4 sebuah misi.</p></div>' + htmlZonaKelas(kelas); pasangZonaKelas(kelas); return; }
  if (!misiAda.some(m => m.id === jejakTerpilih.misi)) jejakTerpilih.misi = misiAda.map(m => [m.id, baris.filter(r => r.misi === m.id).length]).sort((a, b) => b[1] - a[1])[0][0];
  const m = MISI.find(x => x.id === jejakTerpilih.misi);
  const murid = baris.filter(r => r.misi === m.id).map(r => ({ ...r, A: analisisJejak(r.data) }));
  const urutanPola = Object.keys(POLA_JEJAK);
  murid.sort((a, b) => urutanPola.indexOf(b.A.pola) - urutanPola.indexOf(a.A.pola) || a.nama.localeCompare(b.nama, 'id'));
  const aktif = murid.filter(r => r.A.n);
  const adilSemua = aktif.filter(r => r.A.adilRasio !== null);
  const sebaran = urutanPola.map(p => [p, murid.filter(r => r.A.pola === p).length]).filter(x => x[1]);
  wadah.innerHTML = `${kartuKode}
  <div class="kartu">
    <div class="lab-kepala"><h3>📊 Ringkasan kelas</h3>
      <label class="ctl ctl-sebaris"><span>Misi</span><select id="jMisi">${misiAda.map(x => `<option value="${x.id}" ${x.id === m.id ? 'selected' : ''}>${x.ikon} ${esc(x.judul)} (${baris.filter(r => r.misi === x.id).length})</option>`).join('')}</select></label></div>
    <div class="statistik">
      <div><b>${murid.length}</b><small>murid</small></div>
      <div><b>${aktif.length ? (aktif.reduce((x, r) => x + r.A.n, 0) / aktif.length).toFixed(1).replace('.', ',') : '—'}</b><small>rata-rata uji</small></div>
      <div><b>${adilSemua.length ? persen(adilSemua.reduce((x, r) => x + r.A.adilRasio, 0) / adilSemua.length) : '—'}</b><small>uji adil</small></div>
      <div><b>${murid.length ? persen(murid.filter(r => r.A.tuntas).length / murid.length) : '—'}</b><small>memenuhi semua kriteria</small></div>
    </div>
    <div class="sebaran-pola" role="img" aria-label="Sebaran pola eksplorasi">${sebaran.map(([p, n]) => `<span style="flex:${n};background:${POLA_JEJAK[p].warna}" title="${POLA_JEJAK[p].nama}: ${n}">${POLA_JEJAK[p].ikon} ${n}</span>`).join('')}</div>
    <div class="legenda-pola">${sebaran.map(([p]) => `<span><i style="background:${POLA_JEJAK[p].warna}"></i><b>${POLA_JEJAK[p].ikon} ${POLA_JEJAK[p].nama}</b> — ${POLA_JEJAK[p].arti}</span>`).join('')}</div>
  </div>
  <div class="kartu">
    <div class="lab-kepala"><h3>👥 Jejak tiap murid</h3><button class="tombol kecil" id="bUnduhJejak">⬇️ Unduh CSV</button></div>
    <p class="redup kecil">Jejak mini: <span class="lgd bulat teal"></span> uji adil · <span class="lgd kotak"></span> uji mengubah >1 variabel · <span class="lgd bulat emas"></span> semua kriteria terpenuhi. Klik baris untuk melihat peta lengkapnya.</p>
    <div class="tabel-gulir"><table class="tabel tabel-jejak"><thead><tr><th>Murid</th><th>Pola</th><th>Uji</th><th>Uji adil</th><th>Prediksi</th><th>Jeda</th><th>Tuntas di</th><th>Jejak</th></tr></thead>
      <tbody>${murid.map(r => `<tr data-murid="${esc(r.perangkat)}" class="${r.perangkat === jejakTerpilih.murid ? 'dipilih' : ''}" tabindex="0">
        <td><b>${esc(r.nama)}</b>${r.kelas ? `<br><small class="redup">${esc(r.kelas)}</small>` : ''}</td>
        <td><span class="pola-tag" style="--c:${POLA_JEJAK[r.A.pola].warna}">${POLA_JEJAK[r.A.pola].ikon} ${POLA_JEJAK[r.A.pola].nama}</span></td>
        <td>${r.A.n}</td><td>${persen(r.A.adilRasio)}</td><td>${persen(r.A.n ? r.A.predRasio : null)}</td><td>${detik(r.A.jedaMedian)}</td>
        <td>${r.A.tuntas ? `uji ke-${r.A.tuntas}` : `<span class="redup">${r.A.terbaik}/${r.A.total || '—'}</span>`}</td>
        <td>${jejakMini(r.data)}</td></tr>`).join('')}</tbody></table></div>
  </div>
  <div id="detailJejak"></div>
  ${htmlZonaKelas(kelas)}`;
  $('#jMisi').onchange = e => { jejakTerpilih.misi = e.target.value; jejakTerpilih.murid = ''; simpanPilihanJejak(); muatJejakKelas(kelas); };
  const pilih = id => {
    jejakTerpilih.murid = id; simpanPilihanJejak();
    $$('[data-murid]').forEach(tr => tr.classList.toggle('dipilih', tr.dataset.murid === id));
    tampilDetailJejak(m, murid.find(r => r.perangkat === id), kelas);
  };
  $$('[data-murid]').forEach(tr => { tr.onclick = () => pilih(tr.dataset.murid); tr.onkeydown = e => { if (e.key === 'Enter') pilih(tr.dataset.murid); }; });
  if (murid.some(r => r.perangkat === jejakTerpilih.murid)) tampilDetailJejak(m, murid.find(r => r.perangkat === jejakTerpilih.murid), kelas);
  $('#bUnduhJejak').onclick = () => unduhCsvJejak(kelas, baris);
  pasangZonaKelas(kelas);
}

function tampilDetailJejak(m, r, kelas) {
  const wadah = $('#detailJejak'); if (!wadah || !r) return;
  const A = r.A, P = POLA_JEJAK[A.pola], U = (r.data && r.data.uji) || [];
  const nilai = Object.entries((r.data && r.data.nilai) || {});
  wadah.innerHTML = `<div class="kartu detail-jejak" style="--c:${P.warna}">
    <div class="lab-kepala"><h3>🗺️ Peta jejak — ${esc(r.nama)}</h3><span class="pola-tag" style="--c:${P.warna}">${P.ikon} ${P.nama}</span></div>
    <p class="redup kecil">${m.ikon} ${esc(m.judul)} · ${r.data.langkah || 0}/${LANGKAH.length} langkah · ${r.data.nyata || 0} uji nyata · rencana ${r.data.rencana || 0} langkah · diperbarui ${new Date(r.diperbarui).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
    <div class="peta-gulir"><canvas id="petaJejak"></canvas></div>
    <p class="redup kecil">Titik = uji (nomor di dalamnya). <b style="color:#0d9488">●</b> adil · <b style="color:#ef4444">■</b> mengubah lebih dari satu variabel · cincin emas = semua kriteria terpenuhi · 💭 = menulis prediksi. Label berwarna = variabel yang diubah; angka abu-abu = jeda berpikir sebelum uji (<span style="color:#be123c">merah</span> bila &lt; 6 detik).</p>
    <div class="saran-guru"><b>💡 Saran tindak lanjut:</b> ${esc(P.saran)}</div>
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
  wadah.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  const kepala = ['nama', 'kelas', 'misi', 'pola', 'jumlah_uji', 'uji_adil_persen', 'prediksi_persen', 'jeda_median_detik', 'tuntas_di_uji', 'kriteria_terbaik', 'jumlah_kriteria', 'langkah_selesai', 'uji_nyata', 'diperbarui'];
  const isi = baris.map(r => {
    const A = analisisJejak(r.data), m = MISI.find(x => x.id === r.misi);
    return [r.nama, r.kelas, m ? m.judul : r.misi, POLA_JEJAK[A.pola].nama, A.n, A.adilRasio === null ? '' : Math.round(A.adilRasio * 100), A.n ? Math.round(A.predRasio * 100) : '',
      A.jedaMedian === null ? '' : Math.round(A.jedaMedian), A.tuntas || '', A.n ? A.terbaik : '', A.n ? A.total : '', (r.data && r.data.langkah) || 0, (r.data && r.data.nyata) || 0,
      new Date(r.diperbarui).toLocaleString('id-ID')].map(sel).join(';');
  });
  const blob = new Blob(['﻿' + [kepala.join(';'), ...isi].join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `jejak-berpikir-${kelas.kode}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
