/* =========================================================
   NalarSTEM — Mode Tes (tes awal & tes akhir per misi)
   Guru membuka tes untuk kelasnya (misi + Paket A/B) dari #/jejak.
   Murid mengerjakan 6 soal sesuai materi misi di #/tes, SEKALI saja,
   tanpa Kak Nala, dan hanya melihat skor; kunci & pembahasan baru
   tampil bila guru membukanya. Hasil dikirim lewat jejak (misi 'tes').
   Bank soal: js/tes.js (TES_MISI) — tersimpan di perangkat, jadi bisa offline.
   ========================================================= */
const ID_TES = 'tes';
const NAMA_PAKET = { A: 'Tes awal', B: 'Tes akhir' };
const URUT_IND = ['interpretasi', 'analisis', 'inferensi', 'evaluasi', 'eksplanasi', 'regulasi'];

/* ---------------- Sisi murid ---------------- */
// Pengaturan tes dari guru disimpan di S.tesKelas agar tetap terbaca saat offline.
async function segarkanTesKelas() {
  if (!jejakAktif() || !navigator.onLine) return S.tesKelas || null;
  try {
    const d = await memoriApi({ aksi: 'kelas_info', kode: S.profil.kodeKelas }, 10000);
    if (d && d.nama) { S.profil.namaKelas = d.nama; S.tesKelas = d.tes || null; simpan(); }
  } catch (e) { /* pakai salinan terakhir */ }
  return S.tesKelas || null;
}
const tesValid = t => !!(t && TES_MISI[t.misi] && (t.paket === 'A' || t.paket === 'B'));
const hasilTes = (misi, paket) => ((S.tes || {})[misi] || {})[paket] || null;

function htmlKartuTes() {
  const t = S.tesKelas;
  if (!S.profil.kodeKelas || !tesValid(t)) return '';
  const m = MISI.find(x => x.id === t.misi), h = hasilTes(t.misi, t.paket);
  return `<a class="kartu kartu-tes-beranda" href="#/tes" style="--aksen:${m.warna}">
    <span class="kt-ikon">📝</span>
    <div><small class="redup">Dibuka gurumu</small><b>${NAMA_PAKET[t.paket]} · ${m.ikon} ${esc(m.judul)}</b>
      <span class="redup kecil">${h && h.selesai ? `Sudah dikerjakan — skor ${h.skor}/${h.total}${t.bahas ? ' · pembahasan sudah dibuka' : ''}` : '6 soal · dikerjakan sekali · tanpa bantuan Kak Nala'}</span></div>
    <span class="tombol ${h && h.selesai ? '' : 'utama'} kecil">${h && h.selesai ? 'Lihat hasil' : 'Kerjakan →'}</span>
  </a>`;
}
// Dipanggil Beranda: tampilkan dari salinan dulu, lalu perbarui dari server.
function pasangKartuTes() {
  const w = $('#kartuTes'); if (!w) return;
  w.innerHTML = htmlKartuTes();
  segarkanTesKelas().then(() => { const w2 = $('#kartuTes'); if (w2) w2.innerHTML = htmlKartuTes(); });
}

function ringkasTes() {
  const hasil = {};
  Object.entries(S.tes || {}).forEach(([misi, P]) => Object.entries(P).forEach(([paket, h]) => {
    if (!h.selesai) return;
    (hasil[misi] = hasil[misi] || {})[paket] = { s: h.skor, t: h.total, ind: h.ind, j: h.pilih, w: h.selesai, d: h.mulai ? Math.round((h.selesai - h.mulai) / 1000) : null };
  }));
  return { v: 1, hasil };
}

async function halTes() {
  setKonteksTutor({ jenis: 'tes' });
  document.body.classList.add('mode-tes');
  bersihkan.push(() => document.body.classList.remove('mode-tes'));
  if (!S.profil.kodeKelas) {
    APP.innerHTML = `<h1 class="judul-hal">📝 Mode Tes</h1><div class="kartu prosa" style="max-width:620px">
      <p>Tes dibuka oleh gurumu untuk kelas tertentu. Masukkan <b>kode kelas</b> dari gurumu di kartu profil Beranda terlebih dahulu.</p>
      <a class="tombol utama" href="#/">Ke Beranda</a></div>`;
    return;
  }
  if (!S.tesKelas) APP.innerHTML = '<p class="redup">Memeriksa tes dari gurumu…</p>';
  else gambarTes();
  await segarkanTesKelas();
  if (location.hash.startsWith('#/tes')) gambarTes();
}

function gambarTes() {
  const t = S.tesKelas;
  if (!tesValid(t)) {
    APP.innerHTML = `<h1 class="judul-hal">📝 Mode Tes</h1><div class="kartu kosong"><p class="redup">Belum ada tes yang dibuka gurumu untuk kelas <b>${esc(S.profil.namaKelas || S.profil.kodeKelas)}</b>. Tunggu aba-aba dari gurumu, lalu buka halaman ini lagi.</p>
      <button class="tombol" id="bCekTes">↻ Periksa lagi</button></div>${htmlRiwayatTes()}`;
    $('#bCekTes').onclick = async () => { await segarkanTesKelas(); gambarTes(); };
    return;
  }
  const m = MISI.find(x => x.id === t.misi), B = TES_MISI[t.misi], soal = B[t.paket];
  S.tes = S.tes || {}; S.tes[t.misi] = S.tes[t.misi] || {};
  let h = S.tes[t.misi][t.paket];
  if (!h || !h.urutan || h.urutan.length !== soal.length) { h = S.tes[t.misi][t.paket] = { urutan: soal.map(() => acak([0, 1, 2, 3])), jawab: {}, mulai: null }; simpan(); }
  const selesai = !!h.selesai, bahas = selesai && t.bahas;
  APP.innerHTML = `<div class="kepala-misi" style="--aksen:${m.warna}">
      <div class="km-judul">${sampulMisi(m, 'km-ikon besar')}<div><span class="km-kelas">📝 ${NAMA_PAKET[t.paket]} · ${esc(m.kelas)}</span><h1>${esc(m.judul)}</h1></div></div></div>
    <div class="kartu tujuan-tes"><b>🎯 Tujuan pembelajaran misi ini</b><ol>${B.tujuan.map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>
    ${selesai ? htmlHasilTes(h, soal, bahas) : `<div class="kartu aturan-tes"><b>Aturan tes</b><ul>
      <li>Ada ${soal.length} soal. Pilih jawaban yang paling tepat dan paling lengkap alasannya.</li>
      <li>Tes hanya bisa dikirim <b>satu kali</b>. Kerjakan sendiri — Kak Nala tidak tersedia selama tes.</li>
      <li>Setelah dikirim kamu melihat skormu. Kunci dan pembahasan dibuka oleh gurumu.</li></ul></div>`}
    <div class="daftar-soal">${soal.map((q, i) => {
      const I = INDIKATOR.find(x => x.id === q.ind), dipilih = h.jawab[i];
      const kelasSoal = bahas ? (dipilih === 0 ? 'benar' : 'salah') : '';
      return `<div class="kartu soal ${kelasSoal}">
        <div class="soal-kepala"><span class="nomor">${i + 1}</span>${selesai ? `<span class="ind-tag"><span style="--c:${I.warna}">${I.nama}</span></span>` : ''}</div>
        <p>${esc(q.soal)}</p>
        <div class="opsi">${h.urutan[i].map(o => `<label class="${bahas && o === 0 ? 'kunci' : ''} ${bahas && dipilih === o && o !== 0 ? 'keliru' : ''}">
          <input type="radio" name="t${i}" value="${o}" ${dipilih === o ? 'checked' : ''} ${selesai ? 'disabled' : ''}><span>${esc(q.opsi[o])}</span></label>`).join('')}</div>
        ${bahas ? `<div class="bahas"><b>Pembahasan:</b> ${esc(q.bahas)}</div>` : ''}
      </div>`;
    }).join('')}</div>
    ${selesai ? (t.bahas ? '' : '<p class="redup kecil">Kunci dan pembahasan akan muncul di halaman ini setelah gurumu membukanya.</p>')
      : `<p class="galat" id="galatTes" hidden></p><button class="tombol utama" id="bKirimTes">Kirim jawaban</button>`}
    ${htmlRiwayatTes(t)}`;
  $$('.opsi input').forEach(r => r.onchange = () => {
    h.jawab[+r.name.slice(1)] = +r.value; h.mulai = h.mulai || Date.now(); simpan();
    const g = $('#galatTes'); if (g) g.hidden = true;
  });
  const bk = $('#bKirimTes');
  if (bk) bk.onclick = () => {
    const kosong = soal.map((q, i) => i).filter(i => h.jawab[i] === undefined);
    const g = $('#galatTes');
    if (kosong.length) { g.textContent = `Masih ada ${kosong.length} soal yang belum dijawab (nomor ${kosong.map(i => i + 1).join(', ')}).`; g.hidden = false; return; }
    if (!confirm('Kirim jawaban sekarang? Setelah dikirim, jawaban tidak bisa diubah.')) return;
    h.pilih = soal.map((q, i) => h.jawab[i]);
    h.skor = h.pilih.filter(o => o === 0).length; h.total = soal.length;
    h.ind = Object.fromEntries(soal.map((q, i) => [q.ind, h.pilih[i] === 0 ? 1 : 0]));
    h.selesai = Date.now(); h.mulai = h.mulai || h.selesai; simpan();
    kirimJejak(ID_TES, true);
    toast(navigator.onLine ? 'Jawaban terkirim ke gurumu' : 'Jawaban tersimpan — terkirim otomatis saat online');
    gambarTes(); window.scrollTo(0, 0);
  };
}

function htmlHasilTes(h, soal, bahas) {
  const nilai = Math.round(h.skor / h.total * 100);
  return `<div class="kartu skor-kuis skor-tes"><span><b>Skormu: ${h.skor}/${h.total}</b> · nilai ${nilai}</span>
    <small class="redup">Dikirim ${new Date(h.selesai).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}${S.jejakTertunda && S.jejakTertunda[ID_TES] ? (navigator.onLine ? ' · ⏳ sedang dikirim ke gurumu' : ' · ⏳ menunggu sinyal untuk terkirim') : ' · ✔ sudah diterima gurumu'}</small></div>
    <div class="kartu"><b>Kemampuan berpikir kritis yang diukur</b>
      <div class="ind-hasil">${soal.map((q, i) => { const I = INDIKATOR.find(x => x.id === q.ind); const ok = h.pilih[i] === 0;
        return `<span class="${ok ? 'ok' : 'belum'}" style="--c:${I.warna}">${ok ? '✔' : '✗'} ${I.nama}</span>`; }).join('')}</div>
      ${bahas ? '' : '<p class="redup kecil">Tanda ✔/✗ menunjukkan kebiasaan berpikir yang sudah atau belum tepat. Bahas bersama gurumu setelah pembahasan dibuka.</p>'}</div>`;
}

function htmlRiwayatTes(kecuali) {
  const R = [];
  Object.entries(S.tes || {}).forEach(([misi, P]) => Object.entries(P).forEach(([paket, h]) => {
    if (h.selesai && !(kecuali && kecuali.misi === misi && kecuali.paket === paket)) R.push({ misi, paket, h });
  }));
  if (!R.length) return '';
  R.sort((a, b) => b.h.selesai - a.h.selesai);
  return `<div class="kartu"><b>Riwayat tesmu</b><ul class="riwayat-tes">${R.map(({ misi, paket, h }) => { const m = MISI.find(x => x.id === misi);
    return `<li>${m ? `${m.ikon} ${esc(m.judul)}` : misi} · ${NAMA_PAKET[paket]} — <b>${h.skor}/${h.total}</b> <small class="redup">${new Date(h.selesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</small></li>`; }).join('')}</ul></div>`;
}

/* ---------------- Sisi guru (dipanggil dari halaman #/jejak) ---------------- */
let tesTerpilih = '';
const nilai100 = r => (r ? Math.round(r.s / r.t * 100) : null);
// N-gain Hake: (akhir − awal) / (100 − awal)
const nGain = (a, b) => (a === null || b === null ? null : a >= 100 ? null : (b - a) / (100 - a));
const tafsirGain = g => (g === null ? '—' : g >= 0.7 ? 'Tinggi' : g >= 0.3 ? 'Sedang' : 'Rendah');

function dataTesKelas(baris, misi) {
  return baris.filter(r => r.misi === ID_TES && r.data && r.data.hasil && r.data.hasil[misi])
    .map(r => { const H = r.data.hasil[misi]; const a = nilai100(H.A), b = nilai100(H.B); return { perangkat: r.perangkat, nama: r.nama, kelas: r.kelas, A: H.A || null, B: H.B || null, a, b, g: nGain(a, b) }; })
    .sort((x, y) => x.nama.localeCompare(y.nama, 'id'));
}

function htmlPanelTes(kelas, baris) {
  const t = tesValid(kelas.tes) ? kelas.tes : null;
  const misiData = MISI.filter(m => baris.some(r => r.misi === ID_TES && r.data && r.data.hasil && r.data.hasil[m.id]));
  if (!tesTerpilih || !TES_MISI[tesTerpilih]) tesTerpilih = t ? t.misi : misiData.length ? misiData[0].id : MISI[0].id;
  const m = MISI.find(x => x.id === tesTerpilih), D = dataTesKelas(baris, m.id);
  const dua = D.filter(r => r.a !== null && r.b !== null), adaA = D.filter(r => r.a !== null), adaB = D.filter(r => r.b !== null);
  const rata = (a, f) => (a.length ? rataRata(a.map(f)) : null);
  const gKelas = dua.length ? rataRata(dua.map(r => r.g).filter(g => g !== null)) : null;
  const indPersen = (arr, P) => Object.fromEntries(URUT_IND.map(id => { const v = arr.filter(r => r[P] && r[P].ind && r[P].ind[id] !== undefined); return [id, v.length ? v.filter(r => r[P].ind[id]).length / v.length : null]; }));
  const iA = indPersen(adaA, 'A'), iB = indPersen(adaB, 'B');
  const status = t ? (() => { const tm = MISI.find(x => x.id === t.misi); return `<div class="status-tes buka"><b>🟢 Sedang dibuka:</b> ${NAMA_PAKET[t.paket]} · ${tm.ikon} ${esc(tm.judul)} · pembahasan ${t.bahas ? '<b>terbuka</b>' : 'tertutup'}
      <span class="aksi-tes"><button class="tombol kecil" id="bTesBahas">${t.bahas ? '🙈 Tutup pembahasan' : '💡 Buka pembahasan'}</button><button class="tombol kecil bahaya" id="bTesTutup">⏹ Tutup tes</button></span></div>`; })()
    : '<div class="status-tes"><b>⚪ Tidak ada tes yang dibuka.</b> Murid hanya bisa mengerjakan tes setelah Anda membukanya.</div>';
  return `<div class="kartu panel-tes">
    <div class="lab-kepala"><h3>📝 Mode Tes — tes awal &amp; tes akhir per misi</h3></div>
    <p class="redup kecil">Setiap misi punya 2 paket paralel berisi 6 soal sesuai materi dan tujuan pembelajarannya (satu soal per indikator berpikir kritis). Buka <b>Paket A</b> sebelum misi dimulai dan <b>Paket B</b> setelah misi selesai. Murid mengerjakan sekali di <b>#/tes</b> (kartu muncul di Beranda), tanpa Kak Nala, dan kunci tersembunyi sampai Anda membuka pembahasan.</p>
    ${status}
    <form id="fBukaTes" class="baris-form">
      <select id="tesMisi" aria-label="Misi">${MISI.map(x => `<option value="${x.id}" ${x.id === tesTerpilih ? 'selected' : ''}>${x.ikon} ${esc(x.judul)}</option>`).join('')}</select>
      <select id="tesPaket" aria-label="Paket"><option value="A">Paket A — tes awal</option><option value="B" ${adaA.length ? 'selected' : ''}>Paket B — tes akhir</option></select>
      <button class="tombol utama">▶ Buka tes ini</button>
    </form>
    <details class="cara-skor"><summary>Lihat tujuan pembelajaran &amp; soal ${esc(m.judul)}</summary>${htmlPratinjauTes(m.id)}</details>
    <h4 class="sub-ringkas">📈 Hasil ${m.ikon} ${esc(m.judul)}</h4>
    ${D.length ? `<div class="statistik">
      <div><b>${adaA.length}<small class="dari"> / ${adaB.length}</small></b><small>mengerjakan awal / akhir</small></div>
      <div><b>${desimal(rata(adaA, r => r.a), 0)}</b><small>rata-rata tes awal</small></div>
      <div><b>${desimal(rata(adaB, r => r.b), 0)}</b><small>rata-rata tes akhir</small></div>
      <div><b>${gKelas === null ? '—' : desimal(gKelas, 2)}</b><small>N-gain rata-rata · ${tafsirGain(gKelas)}${dua.length ? ` (${dua.length} murid)` : ''}</small></div>
    </div>
    <div class="tabel-gulir"><table class="tabel tabel-ind-tes"><thead><tr><th>Indikator</th><th>Benar · tes awal</th><th>Benar · tes akhir</th></tr></thead><tbody>
      ${URUT_IND.map(id => { const I = INDIKATOR.find(x => x.id === id); return `<tr><td><span class="ind-tag"><span style="--c:${I.warna}">${I.nama}</span></span></td>
        <td>${batangPersen(iA[id])}</td><td>${batangPersen(iB[id])}</td></tr>`; }).join('')}</tbody></table></div>
    <div class="lab-kepala"><b>Tiap murid</b><button class="tombol kecil" id="bUnduhTes">⬇️ Unduh CSV tes</button></div>
    <div class="tabel-gulir"><table class="tabel"><thead><tr><th>Murid</th><th>Tes awal</th><th>Tes akhir</th><th>N-gain</th><th>Indikator belum tepat (tes terakhir)</th></tr></thead><tbody>
      ${D.map(r => { const akhir = r.B || r.A; const belum = akhir && akhir.ind ? URUT_IND.filter(id => akhir.ind[id] === 0).map(id => INDIKATOR.find(x => x.id === id).nama) : [];
        return `<tr><td><b>${esc(r.nama)}</b>${r.kelas ? `<br><small class="redup">${esc(r.kelas)}</small>` : ''}</td>
          <td>${r.a === null ? '<span class="redup">—</span>' : `${r.a} <small class="redup">(${r.A.s}/${r.A.t})</small>`}</td>
          <td>${r.b === null ? '<span class="redup">—</span>' : `<b>${r.b}</b> <small class="redup">(${r.B.s}/${r.B.t})</small>`}</td>
          <td>${r.g === null ? '—' : `${desimal(r.g, 2)} <small class="redup">${tafsirGain(r.g)}</small>`}</td>
          <td class="kecil">${belum.length ? esc(belum.join(', ')) : akhir ? '✔ semua tepat' : '—'}</td></tr>`; }).join('')}</tbody></table></div>
    <p class="redup kecil">Nilai = jumlah benar ÷ 6 × 100. N-gain = (akhir − awal) ÷ (100 − awal): Tinggi ≥ 0,7 · Sedang 0,3–0,69 · Rendah &lt; 0,3. Paket A dan B paralel: nomor yang sama mengukur indikator yang sama dengan konteks berbeda.</p>`
    : `<p class="redup">Belum ada murid yang mengerjakan tes misi ini.</p>`}
  </div>`;
}

function batangPersen(p) {
  if (p === null) return '<span class="redup">—</span>';
  const n = Math.round(p * 100);
  return `<span class="batang-persen"><i style="width:${n}%"></i></span> ${n}%`;
}

function htmlPratinjauTes(misi) {
  const B = TES_MISI[misi];
  const daftar = P => `<ol class="pratinjau-tes">${B[P].map(q => { const I = INDIKATOR.find(x => x.id === q.ind);
    return `<li><span class="ind-tag"><span style="--c:${I.warna}">${I.nama}</span></span> ${esc(q.soal)}<br><small>✔ ${esc(q.opsi[0])}</small></li>`; }).join('')}</ol>`;
  return `<p class="kecil"><b>Tujuan pembelajaran:</b></p><ol class="kecil">${B.tujuan.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
    <p class="kecil"><b>Paket A (tes awal)</b></p>${daftar('A')}<p class="kecil"><b>Paket B (tes akhir)</b></p>${daftar('B')}`;
}

function pasangPanelTes(kelas, baris, muatUlang) {
  const atur = async tes => {
    try {
      const d = await memoriApi({ aksi: 'guru_tes_atur', token: tokenGuru(), kode: kelas.kode, tes }, 15000);
      kelas.tes = d.tes || null; muatUlang();
    } catch (err) { if (!sesiGuruHabis(err)) toast(err.message, 'peringatan'); }
  };
  const f = $('#fBukaTes'); if (!f) return;
  $('#tesMisi').onchange = e => { tesTerpilih = e.target.value; muatUlang(); };
  f.onsubmit = e => {
    e.preventDefault();
    const misi = $('#tesMisi').value, paket = $('#tesPaket').value, mm = MISI.find(x => x.id === misi);
    if (!confirm(`Buka ${NAMA_PAKET[paket]} (Paket ${paket}) misi "${mm.judul}" untuk kelas ${kelas.nama}?${kelas.tes ? ' Tes yang sedang dibuka akan ditutup.' : ''}`)) return;
    tesTerpilih = misi; atur({ misi, paket, bahas: false }).then(() => toast(`${NAMA_PAKET[paket]} dibuka — minta murid membuka Beranda`));
  };
  const bb = $('#bTesBahas'); if (bb) bb.onclick = () => atur({ ...kelas.tes, bahas: !kelas.tes.bahas });
  const bt = $('#bTesTutup'); if (bt) bt.onclick = () => { if (confirm('Tutup tes? Murid yang belum mengirim tidak bisa mengerjakannya lagi (kecuali yang sedang offline).')) atur(null); };
  const bu = $('#bUnduhTes'); if (bu) bu.onclick = () => unduhCsvTes(kelas, baris);
}

function unduhCsvTes(kelas, baris) {
  const sel = v => { const s = String(v ?? ''); return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const kepala = ['nama', 'kelas', 'misi', 'paket', 'benar', 'jumlah_soal', 'nilai', ...URUT_IND, 'durasi_detik', 'dikirim', 'n_gain'];
  const isi = [];
  baris.filter(r => r.misi === ID_TES && r.data && r.data.hasil).forEach(r => Object.entries(r.data.hasil).forEach(([misi, H]) => {
    const m = MISI.find(x => x.id === misi), g = nGain(nilai100(H.A), nilai100(H.B));
    ['A', 'B'].forEach(P => { const h = H[P]; if (!h) return;
      isi.push([r.nama, r.kelas, m ? m.judul : misi, `${P} (${NAMA_PAKET[P]})`, h.s, h.t, nilai100(h), ...URUT_IND.map(id => (h.ind && h.ind[id] !== undefined ? h.ind[id] : '')),
        h.d ?? '', new Date(h.w).toLocaleString('id-ID'), P === 'B' && g !== null ? g.toFixed(2).replace('.', ',') : ''].map(sel).join(';')); });
  }));
  const blob = new Blob(['﻿' + [kepala.join(';'), ...isi].join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `hasil-tes-${kelas.kode}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
