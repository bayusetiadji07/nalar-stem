/* =========================================================
   NalarSTEM — Mode presentasi proyek
   Salindia disusun otomatis dari data murid: lembar kerja, uji maya,
   rencana kerja bersama Kak Nala, dan hasil uji nyata.
   ========================================================= */

function potong(t, n) {
  t = polos(t || '');
  return t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t;
}

// Gambar rancangan terbaik dari simulasi (keadaan akhir uji) sebagai gambar JPEG.
function gambarRancangan(m, v) {
  const cv = document.createElement('canvas'); cv.width = 760; cv.height = 470;
  const sim = SIM[m.id];
  try { sim.gambar(cv.getContext('2d'), 760, 470, v, sim.hitung(v), 1); } catch (e) { return ''; }
  return cv.toDataURL('image/jpeg', 0.85);
}

function buatSalindia(m, st) {
  const N = NYATA[m.id], ny = st.nyata, I = st.isian;
  const tim = (ny.tim || '').trim() || S.profil.nama || 'Kelompok kami';
  const tanggal = new Date().toLocaleDateString('id-ID', { dateStyle: 'long' });
  const terbaik = ujiTerbaik(st);
  const daftar = [];
  const salindia = (kelas, isi, tip) => daftar.push({ kelas, isi, tip });
  const kutip = (label, teks, n = 240) => teks ? `<div class="pr-kutip"><b>${label}</b>${esc(potong(teks, n))}</div>` : '';

  // 1. Judul
  salindia('pr-judul', `
    <div class="pr-sampul">${gambar(`misi-${m.id}.jpg`, m.judul, '', false)}<span class="pr-emoji">${m.ikon}</span></div>
    <div class="pr-judul-isi">
      <span class="pr-label">Proyek STEM · ${esc(m.kelas)}</span>
      <h1>${esc(m.judul)}</h1>
      <p class="pr-tim">${esc(tim)}</p>
      <p class="pr-tgl">${S.profil.kelas ? `Kelas ${esc(S.profil.kelas)} · ` : ''}${tanggal}</p>
      <p class="pr-merek">NalarSTEM · Lab IPA STEM dengan AI Tutor</p>
    </div>`, 'Perkenalkan anggota kelompok dan judul proyek kalian.');

  // 2. Masalah, kriteria, kendala
  salindia('', `<h2>🎯 Masalah yang kami selesaikan</h2>
    <div class="pr-dua">
      <div><p class="pr-besar">${esc(potong(I.masalah || m.kisah, 300))}</p>${I.masalah ? '' : '<p class="pr-redup">(dari kisah misi)</p>'}</div>
      <div class="pr-kotak"><h3>Kriteria keberhasilan</h3><ul>${m.kriteria.map(k => `<li>${esc(k)}</li>`).join('')}</ul>
        <h3>Kendala</h3><ul>${m.kendala.map(k => `<li>${esc(k)}</li>`).join('')}</ul></div>
    </div>`, 'Ceritakan masalahnya dengan kata-katamu sendiri. Mengapa masalah ini penting?');

  // 3. Konsep & hipotesis
  if (I.hipotesis || I.konsep) salindia('', `<h2>💡 Konsep & hipotesis kami</h2>
    ${I.vbebas || I.vterikat || I.vkontrol ? `<div class="pr-chips">${[['Diubah', I.vbebas], ['Diukur', I.vterikat], ['Dijaga tetap', I.vkontrol]].filter(x => x[1]).map(([a, b]) => `<span class="pr-chip"><b>${a}:</b> ${esc(potong(b, 60))}</span>`).join('')}</div>` : ''}
    ${kutip('Hipotesis', I.hipotesis, 260)}
    ${kutip('Konsep IPA yang paling menentukan', I.konsep, 260)}`, 'Jelaskan variabel yang diubah, diukur, dan dijaga tetap. Apa dugaan kalian dan mengapa?');

  // 4. Rancangan terbaik di laboratorium maya
  if (terbaik) {
    const h = SIM[m.id].hitung(terbaik.v);
    const kr = SIM[m.id].kriteria(terbaik.v, h);
    salindia('', `<h2>🧪 Rancangan terbaik di laboratorium maya</h2>
      <div class="pr-dua pr-dua-gambar">
        <div><img class="pr-gambar-sim" data-sim-v='${esc(JSON.stringify(terbaik.v))}' src="${gambarRancangan(m, terbaik.v)}" alt="Simulasi rancangan terbaik">
          <p class="pr-redup">Uji ke-${terbaik.no} · memenuhi ${terbaik.lulus}/${terbaik.total} kriteria</p></div>
        <div>
          <div class="pr-kotak pr-rapat">${m.variabel.map(v => `<div class="pr-baris"><span>${esc(v.label)}</span><b>${esc(tampilVar(v, terbaik.v[v.id]))}</b></div>`).join('')}</div>
          <ul class="pr-cek">${kr.map(k => `<li>${k.lulus ? '✅' : '❌'} ${esc(k.teks)} <span class="pr-redup">— ${esc(String(k.nilai))}</span></li>`).join('')}</ul>
        </div>
      </div>`, 'Tunjukkan rancangan terbaik dan kriteria mana yang terpenuhi.');
  }

  // 5. Data uji & pola
  if (st.uji.length >= 2) {
    const kolom = m.keluaran.filter(k => k.id !== 'status').slice(0, 3);
    const adil = st.uji.filter(u => u.adil === true).length;
    salindia('', `<h2>📊 Data uji & pola yang kami temukan</h2>
      <div class="pr-stat"><div><b>${st.uji.length}</b><small>uji dilakukan</small></div><div><b>${adil}</b><small>uji adil</small></div><div><b>${terbaik ? `${terbaik.lulus}/${terbaik.total}` : '—'}</b><small>kriteria terbaik</small></div></div>
      <div class="pr-dua">
        <table class="pr-tabel"><thead><tr><th>Uji</th><th>Yang diubah</th>${kolom.map(k => `<th>${esc(k.label)}</th>`).join('')}<th>Kriteria</th></tr></thead>
          <tbody>${st.uji.slice(-6).map(u => `<tr${terbaik && u.no === terbaik.no ? ' class="pr-terbaik"' : ''}><td>${u.no}</td><td>${u.adil === null ? 'awal' : u.ubah.length > 1 ? `${u.ubah.length} variabel sekaligus ⚠` : esc(u.ubah[0] || '—')}</td>${kolom.map(k => `<td>${esc(tampilKeluaran(k, u.h[k.id]))}</td>`).join('')}<td>${u.lulus}/${u.total}</td></tr>`).join('')}</tbody></table>
        <div>${kutip('Pola dari data', I.pola, 200)}${kutip('Hipotesis diuji', I.hipotesisUji, 160)}</div>
      </div>`, 'Ceritakan pola dari data. Sebutkan angkanya!');
  }

  // 6. Rencana kerja
  const R = (ny.rencana || []).filter(r => r.teks.trim());
  const dariNala = R.filter(r => r.oleh === 'nala').length;
  const isiLangkah = (R.length ? R.map(r => r.teks) : N.langkah).slice(0, 9);
  const padat = isiLangkah.length > 6 || isiLangkah.join('').length > 600;
  salindia('', `<h2>🛠️ Rencana kerja pembuatan prototipe</h2>
    <div class="pr-dua">
      <ol class="pr-langkah${padat ? ' pr-padat' : ''}">${(R.length ? R.map(r => `<li>${esc(potong(r.teks, 140))}${r.oleh === 'nala' ? ' <span title="Saran Kak Nala yang kami terima">✨</span>' : ''}</li>`) : N.langkah.map(l => `<li>${esc(l)}</li>`)).slice(0, 9).join('')}</ol>
      <div class="pr-kotak pr-kecil-isi"><h3>🦺 Keselamatan</h3><ul>${N.keselamatan.slice(0, 3).map(k => `<li>${esc(potong(k, 110))}</li>`).join('')}</ul>
        ${R.length ? `<p class="pr-redup">${dariNala ? `✨ = ${dariNala} saran Kak Nala yang kami terima setelah ${ny.jumlahTinjau || 1}× tinjauan.` : 'Disusun sendiri oleh kelompok.'}</p>` : '<p class="pr-redup">(panduan langkah dari NalarSTEM)</p>'}</div>
    </div>`, 'Jelaskan urutan kerja dan bagaimana kalian menjaga keselamatan.');

  // 7. Hasil uji nyata
  if (ny.uji.length) {
    const foto = ny.uji.filter(u => u.foto).slice(-3);
    // rata-rata selisih hasil nyata terhadap prediksi simulasi, per besaran yang punya pembanding
    const ringkas = N.ukur.filter(k => k.sim).map(k => {
      const d = ny.uji.map(u => { const a = st.uji.find(x => x.no === u.acuan); return a && u.nilai[k.id] !== '' ? selisihPersen(+u.nilai[k.id], +a.h[k.sim]) : null; }).filter(x => x !== null);
      return d.length ? { k, rata: d.reduce((p, q) => p + q, 0) / d.length, n: d.length } : null;
    }).filter(Boolean);
    salindia('', `<h2>🔧 Hasil uji prototipe nyata</h2>
      ${ringkas.length ? `<div class="pr-stat">${ringkas.map(x => `<div><b>${x.rata > 0 ? '+' : ''}${Math.round(x.rata)}%</b><small>rata-rata selisih ${esc(x.k.label.toLowerCase())} dari simulasi (${x.n}× uji)</small></div>`).join('')}<div><b>${ny.uji.length}</b><small>kali uji nyata</small></div></div>` : ''}
      <table class="pr-tabel pr-tabel-besar"><thead><tr><th>Uji</th>${N.ukur.map(k => `<th>${esc(k.label)}</th>`).join('')}<th>Catatan</th></tr></thead>
        <tbody>${ny.uji.slice(-5).map(u => {
          const acuan = st.uji.find(x => x.no === u.acuan);
          return `<tr><td>${u.no}</td>${N.ukur.map(k => {
            const simNilai = k.sim && acuan ? +acuan.h[k.sim] : null;
            const d = simNilai !== null && u.nilai[k.id] !== '' ? selisihPersen(+u.nilai[k.id], simNilai) : null;
            return `<td>${esc(tampilUkur(k, u.nilai[k.id]))}${simNilai !== null ? `<br><small class="pr-redup">simulasi ${esc(tampilUkur(k, simNilai))}</small> ${lencanaSelisih(d)}` : ''}</td>`;
          }).join('')}<td class="pr-kecil">${esc(potong(u.catatan, 70))}</td></tr>`;
        }).join('')}</tbody></table>
      ${foto.length ? `<div class="pr-foto">${foto.map(u => `<img src="${u.foto}" alt="Foto uji nyata ${u.no}">`).join('')}</div>` : ''}`, 'Bandingkan hasil nyata dengan prediksi simulasi. Apa penyebab selisihnya?');
  }

  // 8. Evaluasi & perbaikan
  if (I.bandingNyata || I.perbaikanNyata || I.kelemahan || I.rencanaNyata) salindia('', `<h2>🔍 Evaluasi & perbaikan</h2>
    <div class="pr-dua">
      <div>${kutip('Penyesuaian dari simulasi', I.rencanaNyata, 200)}${kutip('Nyata vs simulasi', I.bandingNyata, 220)}</div>
      <div>${kutip('Kelemahan rancangan', I.kelemahan, 200)}${kutip('Perbaikan berikutnya', I.perbaikanNyata, 220)}</div>
    </div>`, 'Apa kelemahan prototipe kalian dan apa yang akan diperbaiki?');

  // 9. Kesimpulan (CER)
  if (I.klaim || I.bukti || I.penalaran) salindia('', `<h2>🏁 Kesimpulan kami</h2>
    <div class="pr-cer">
      <div><b>Klaim</b>${esc(potong(I.klaim, 200))}</div>
      <div><b>Bukti</b>${esc(potong(I.bukti, 200))}</div>
      <div><b>Penalaran</b>${esc(potong(I.penalaran, 200))}</div>
    </div>
    ${kutip('Refleksi', I.refleksi, 220)}`, 'Klaim → Bukti → Penalaran. Tutup dengan refleksi kalian.');

  // 10. Penutup
  salindia('pr-penutup', `<div>
      <span class="pr-emoji-besar">${m.ikon}</span>
      <h1>Terima kasih!</h1>
      <p class="pr-besar">Ada pertanyaan?</p>
      <p class="pr-tim">${esc(tim)}</p>
      <p class="pr-redup">NalarSTEM · Dikembangkan oleh PakBay07 — spentribes</p>
    </div>`, 'Persilakan audiens bertanya. Jawab dengan data!');

  return daftar.map((s, i) => `<section class="pr-slide ${s.kelas}" style="--aksen:${m.warna}" data-tip="${esc(s.tip)}">${s.isi}
    ${s.kelas === 'pr-judul' ? '' : `<footer class="pr-kaki"><span>${m.ikon} ${esc(m.judul)}</span><span>${i + 1} / ${daftar.length}</span></footer>`}</section>`);
}

function bukaPresentasi(m, st) {
  const slides = buatSalindia(m, st);
  const el = document.createElement('div');
  el.className = 'presentasi';
  el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', `Presentasi ${m.judul}`);
  el.innerHTML = `<div class="pr-panggung">${slides.join('')}</div>
    <div class="pr-kendali">
      <button type="button" data-pr="tutup">✕ Tutup</button>
      <span class="pr-tip"></span>
      <button type="button" data-pr="mundur" aria-label="Salindia sebelumnya">◀</button>
      <span class="pr-hitung"></span>
      <button type="button" data-pr="maju" aria-label="Salindia berikutnya">▶</button>
      <button type="button" data-pr="layar">⛶ Layar penuh</button>
      <button type="button" data-pr="cetak">🖨️ Cetak / PDF</button>
    </div>
    <p class="pr-putar">📱 Putar HP ke posisi mendatar agar salindia lebih besar.</p>`;
  document.body.appendChild(el);
  document.body.classList.add('pr-buka');
  const semua = $$('.pr-slide', el);
  let i = 0;
  const tampil = k => {
    i = jepit(k, 0, semua.length - 1);
    semua.forEach((s, j) => s.classList.toggle('aktif', j === i));
    $('.pr-hitung', el).textContent = `${i + 1} / ${semua.length}`;
    $('.pr-tip', el).textContent = '💬 ' + semua[i].dataset.tip;
    $('[data-pr="mundur"]', el).disabled = i === 0;
    $('[data-pr="maju"]', el).disabled = i === semua.length - 1;
  };
  const tutup = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    document.removeEventListener('keydown', tombol, true);
    window.removeEventListener('aset-sim', segarkanSim);
    el.remove(); document.body.classList.remove('pr-buka');
  };
  const tombol = e => {
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); tampil(i + 1); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); tampil(i - 1); }
    else if (e.key === 'Home') tampil(0);
    else if (e.key === 'End') tampil(semua.length - 1);
    else if (e.key === 'Escape' && !document.fullscreenElement) tutup();
    else return;
    e.stopPropagation();
  };
  // gambar simulasi dibuat ulang saat aset ilustrasi selesai dimuat
  let tundaSim;
  const segarkanSim = () => { clearTimeout(tundaSim); tundaSim = setTimeout(() => $$('[data-sim-v]', el).forEach(img => { const src = gambarRancangan(m, JSON.parse(img.dataset.simV)); if (src) img.src = src; }), 150); };
  window.addEventListener('aset-sim', segarkanSim);
  document.addEventListener('keydown', tombol, true);
  el.onclick = e => {
    const b = e.target.closest('[data-pr]');
    if (!b) { if (e.target.closest('.pr-slide')) tampil(i + 1); return; }
    const aksi = b.dataset.pr;
    if (aksi === 'tutup') tutup();
    else if (aksi === 'maju') tampil(i + 1);
    else if (aksi === 'mundur') tampil(i - 1);
    else if (aksi === 'layar') { if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen().catch(() => toast('Layar penuh tidak didukung perangkat ini', 'peringatan')); }
    else if (aksi === 'cetak') cetakPresentasi(el, m);
  };
  // geser di layar sentuh
  let x0 = null;
  el.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) tampil(i + (dx < 0 ? 1 : -1)); x0 = null; });
  tampil(0);
}

// Cetak semua salindia (satu per halaman mendatar) di jendela baru — bisa "Simpan sebagai PDF".
function cetakPresentasi(el, m) {
  const w = window.open('', '_blank');
  if (!w) { toast('Izinkan jendela pop-up untuk mencetak presentasi', 'peringatan'); return; }
  const dasar = location.href.split('#')[0];
  const isi = $$('.pr-slide', el).map(s => s.outerHTML.replace(' aktif', '')).join('');
  w.document.write(`<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><base href="${esc(dasar)}">
    <title>Presentasi ${esc(m.judul)}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css"><style>@page { size: A4 landscape; margin: 0; }</style></head>
    <body class="pr-cetak">${isi}<script>window.addEventListener('load', () => setTimeout(() => window.print(), 500));<\/script></body></html>`);
  w.document.close();
}
