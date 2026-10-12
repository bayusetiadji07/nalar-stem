/* =========================================================
   NalarSTEM — simulasi misi 15–23 (masalah sehari-hari di sekitar sekolah)
   Pola sama dengan sim.js: hitung(v) → hasil, kriteria(v, h) → [{teks, lulus, nilai}],
   gambar(ctx, W, H, v, h, p) dengan p = kemajuan animasi 0..1.
   Model sengaja disederhanakan, tetapi arah hubungan antar-variabelnya benar
   dan selalu ada titik optimum (bukan "makin banyak makin baik").
   ========================================================= */

/* ---------- aset ilustrasi misi 15–23 (latar JPG; benda PNG transparan) ---------- */
Object.assign(BERKAS_ASET, {
  'bg-jemur-pantai': 'jpg', 'bg-tambak-garam': 'jpg', 'bg-lab-sekolah': 'jpg', 'bg-teras-teduh': 'jpg', 'bg-halaman-terik': 'jpg',
  'bg-sudut-kompos': 'jpg', 'bg-halaman-sekolah': 'jpg', 'bg-kebun-kemarau': 'jpg', 'bg-pesisir-langit': 'jpg', 'bg-dapur-tempe': 'jpg'
});

/* ---------- bantuan gambar bersama ---------- */
function termometer2(ctx, x, y, tinggi, T, Tmin, Tmax, teks, batas) {
  const fr = jepit((T - Tmin) / (Tmax - Tmin), 0, 1);
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
  kotakBulat(ctx, x - 6, y, 12, tinggi, 6); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y + tinggi + 6, 10, 0, 7); ctx.fill(); ctx.stroke();
  const warna = batas !== undefined && T > batas ? '#dc2626' : '#f97316';
  ctx.fillStyle = warna; ctx.beginPath(); ctx.arc(x, y + tinggi + 6, 7, 0, 7); ctx.fill();
  ctx.fillRect(x - 3, y + tinggi * (1 - fr), 6, tinggi * fr + 4);
  if (batas !== undefined) { const yb = y + tinggi * (1 - jepit((batas - Tmin) / (Tmax - Tmin), 0, 1)); ctx.fillStyle = '#dc2626'; ctx.fillRect(x + 7, yb - 1, 8, 2); }
  label(ctx, teks, x, y - 10, { rata: 'center', ukuran: 10, tebal: true, warna: '#0f172a', latar: 'rgba(255,255,255,.88)' });
}
function bilahNilai(ctx, x, y, w, nilai, maks, warna, teks) {
  ctx.fillStyle = '#e2e8f0'; kotakBulat(ctx, x, y, w, 9, 4); ctx.fill();
  ctx.fillStyle = warna; kotakBulat(ctx, x, y, Math.max(4, w * jepit(nilai / maks, 0, 1)), 9, 4); ctx.fill();
  if (teks) label(ctx, teks, x, y - 9, { ukuran: 10, tebal: true, warna: '#334155' });
}
function hasilAkhir(ctx, W, H, teks, ok, kuning) {
  label(ctx, teks, W / 2, H - 13, { rata: 'center', tebal: true, ukuran: 12, warna: '#fff', latar: ok ? '#15803d' : kuning ? '#b45309' : '#b91c1c' });
}
function langit(ctx, W, H, cerah = true) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, cerah ? '#7dd3fc' : '#94a3b8'); g.addColorStop(1, cerah ? '#e0f2fe' : '#e2e8f0');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
function matahari(ctx, x, y, r, p) {
  ctx.fillStyle = 'rgba(253,224,71,.35)'; ctx.beginPath(); ctx.arc(x, y, r * (1.6 + 0.1 * Math.sin(p * 20)), 0, 7); ctx.fill();
  ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
}
function awan(ctx, x, y, s) {
  ctx.fillStyle = 'rgba(255,255,255,.92)';
  [[0, 0, 18], [18, -8, 22], [40, 0, 18], [20, 6, 18]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, 7); ctx.fill(); });
}
const tekananUapJenuh = T => 0.6108 * Math.exp(17.27 * T / (T + 237.3)); // kPa

/* ---------------------------------------------------------
   15. PENGERING IKAN ASIN TENAGA SURYA
   Kalor dari radiasi matahari Q = I·A·τ·α·cos(miring−12°). Suhu dalam T = T_luar + Q/(U + ventilasi).
   Laju penguapan ∝ (tekanan uap jenuh pada T − tekanan uap udara) dibatasi aliran udara.
   Ventilasi kecil → panas tetapi lembap; ventilasi besar → kering tetapi suhu turun.
   --------------------------------------------------------- */
const ALAS_KERING = {
  hitam: { nama: 'Kain/cat hitam', a: 0.92, harga: 3000 },
  seng: { nama: 'Seng mengilap', a: 0.45, harga: 6000 },
  putih: { nama: 'Kertas/kain putih', a: 0.3, harga: 1000 }
};
const PENUTUP_KERING = {
  terbuka: { nama: 'Tanpa penutup', tau: 1, U: 30, harga: 0 },
  plastik: { nama: 'Plastik bening', tau: 0.85, U: 9, harga: 5000 },
  kaca: { nama: 'Kaca bening', tau: 0.9, U: 6.5, harga: 20000 }
};
const T_LUAR_KERING = 32, JAM_SINAR = { cerah: 7, berawan: 4.5 };

function hitungPengering(v) {
  const Al = ALAS_KERING[v.alas], P = PENUTUP_KERING[v.penutup], terbuka = v.penutup === 'terbuka';
  const I = v.cuaca === 'cerah' ? 800 : 450, vent = +v.ventilasi, m = +v.ikan;
  const fMiring = Math.cos((+v.miring - 12) * Math.PI / 180);
  const Q = I * 0.5 * P.tau * Al.a * fMiring;                       // W
  const U = P.U + (terbuka ? 0 : 1.3 * vent);                       // W/K
  const T = T_LUAR_KERING + Q / U;
  const G = terbuka ? 12 : 0.5 * (vent + 0.2);                       // aliran udara relatif
  const eaLuar = 0.7 * tekananUapJenuh(T_LUAR_KERING), dorong = tekananUapJenuh(T) - eaLuar;
  const hambat = 2 / G, E = 0.008 * Math.min(m, 3) * dorong / (1 + hambat); // kg air per jam sinar
  const eaDalam = eaLuar + dorong * hambat / (1 + hambat), rh = Math.min(99, eaDalam / tekananUapJenuh(T) * 100);
  const airAwal = 0.75 * m, airBuang = m - 0.25 * m / 0.6;          // kadar air 75% → 40%
  const jamKering = airBuang / E, jam2hari = 2 * JAM_SINAR[v.cuaca];
  const terbuang = Math.min(E * jam2hari, airAwal * 0.95);
  const kadar = (airAwal - terbuang) / (m - terbuang) * 100;
  const biaya = 8000 + 4000 + Al.harga + P.harga + (terbuka ? 0 : 300 * vent);
  return {
    suhu: bulat(T, 1), lembap: Math.round(rh), laju: Math.round(E * 1000), jamKering: bulat(jamKering, 1),
    hariKering: bulat(jamKering / JAM_SINAR[v.cuaca], 1), kadarAir: Math.round(kadar), lalat: terbuka ? 'Ya, hinggap' : 'Tidak', biaya,
    _gosong: T > 60, _terbuka: terbuka, _kadar: kadar, _jam2: jam2hari
  };
}
function kriteriaPengering(v, h) {
  return [
    { teks: 'Kadar air ikan ≤ 40% dalam 2 hari', lulus: h.kadarAir <= 40, nilai: `${h.kadarAir}% setelah 2 hari` },
    { teks: 'Suhu dalam ≤ 60 °C (ikan tidak matang/gosong)', lulus: !h._gosong, nilai: `${fx(h.suhu)} °C` },
    { teks: 'Udara dalam tidak terlalu lembap (≤ 75%)', lulus: h.lembap <= 75, nilai: `${h.lembap}%` },
    { teks: 'Ikan terlindung dari lalat', lulus: !h._terbuka, nilai: h.lalat },
    { teks: 'Biaya ≤ Rp 30.000', lulus: h.biaya <= 30000, nilai: rp(h.biaya) }
  ];
}
function gambarPengering(ctx, W, H, v, h, p) {
  const cerah = v.cuaca === 'cerah', tanah = H - 40;
  const adaLatar = latar(ctx, W, H, 'bg-jemur-pantai', 0.8, tanah);
  if (!adaLatar) { langit(ctx, W, H, cerah); ctx.fillStyle = '#fde68a'; ctx.fillRect(0, tanah, W, H - tanah); }
  else if (!cerah) { ctx.fillStyle = 'rgba(100,116,139,.32)'; ctx.fillRect(0, 0, W, tanah); }
  matahari(ctx, W * 0.12, 46, 22, p);
  if (!cerah) { awan(ctx, W * 0.08, 52, 1.1); awan(ctx, W * 0.4, 40, 0.9); }
  // sinar matahari
  ctx.strokeStyle = cerah ? 'rgba(250,204,21,.65)' : 'rgba(250,204,21,.3)'; ctx.lineWidth = 2;
  for (let k = 0; k < 5; k++) { const x = W * 0.3 + k * 34; ctx.beginPath(); ctx.moveTo(W * 0.14 + k * 6, 70); ctx.lineTo(x, tanah - 120 + k * 8); ctx.stroke(); }
  // kotak pengering miring
  const lebar = Math.min(300, W * 0.48), tinggi = 56, cx = W * 0.47, cy = tanah - 24 - Math.sin(+v.miring * Math.PI / 180) * lebar / 2;
  const rot = -(+v.miring) * Math.PI / 180;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
  ctx.fillStyle = '#92400e'; ctx.fillRect(-lebar / 2, 0, lebar, 10);
  ctx.fillStyle = { hitam: '#111827', seng: '#cbd5e1', putih: '#f8fafc' }[v.alas]; ctx.fillRect(-lebar / 2 + 6, -6, lebar - 12, 6);
  // ikan di rak
  const kering = jepit(1 - (h._kadar - 40) / 35, 0, 1) * mulus(p);
  const nIkan = Math.min(8, Math.round(+v.ikan * 2));
  for (let k = 0; k < nIkan; k++) {
    const x = -lebar / 2 + 22 + k * (lebar - 44) / Math.max(1, nIkan - 1);
    if (benda(ctx, kering > 0.5 ? 'ikan-asin' : 'ikan', x, -12, 34)) continue;
    ctx.fillStyle = `rgb(${Math.round(lerp(148, 180, kering))},${Math.round(lerp(163, 140, kering))},${Math.round(lerp(184, 100, kering))})`;
    ctx.beginPath(); ctx.ellipse(x, -12, 13 - 3 * kering, 5, 0, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x + 12, -12); ctx.lineTo(x + 19, -17); ctx.lineTo(x + 19, -7); ctx.closePath(); ctx.fill();
  }
  // penutup
  if (v.penutup !== 'terbuka') {
    ctx.fillStyle = v.penutup === 'kaca' ? 'rgba(186,230,253,.45)' : 'rgba(255,255,255,.4)';
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-lebar / 2, 0); ctx.lineTo(-lebar / 2, -tinggi); ctx.lineTo(lebar / 2, -tinggi); ctx.lineTo(lebar / 2, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
    // lubang ventilasi + aliran udara
    for (let k = 0; k < +v.ventilasi; k++) {
      const sisiKiri = k % 2 === 0, yy = -tinggi + 10 + Math.floor(k / 2) * 9;
      ctx.fillStyle = '#334155'; ctx.fillRect(sisiKiri ? -lebar / 2 - 2 : lebar / 2 - 2, yy, 4, 5);
    }
    if (+v.ventilasi > 0) {
      const t = (p * 4) % 1;
      panah(ctx, -lebar / 2 - 30 + t * 20, -tinggi * 0.5, -lebar / 2 - 6 + t * 20, -tinggi * 0.5, '#0ea5e9', 2);
      panah(ctx, lebar / 2 - 4 + t * 20, -tinggi * 0.6, lebar / 2 + 22 + t * 20, -tinggi * 0.6 - 6, 'rgba(148,163,184,.9)', 2);
    }
  }
  // uap air
  ctx.strokeStyle = 'rgba(148,163,184,.7)'; ctx.lineWidth = 1.5;
  for (let k = 0; k < 4; k++) {
    const x = -lebar / 3 + k * lebar / 5, naik = ((p * 3 + k * 0.25) % 1) * 30;
    ctx.beginPath(); ctx.moveTo(x, -18 - naik); ctx.quadraticCurveTo(x + 6, -24 - naik, x, -30 - naik); ctx.stroke();
  }
  ctx.restore();
  // kaki penyangga
  ctx.strokeStyle = '#78350f'; ctx.lineWidth = 4;
  // titik dasar kotak (koordinat lokal ±0,42·lebar, 10) setelah diputar sebesar rot
  const kaki = sisi => ({ x: cx + Math.cos(rot) * sisi * lebar * 0.42 - Math.sin(rot) * 10, y: cy + Math.sin(rot) * sisi * lebar * 0.42 + Math.cos(rot) * 10 });
  ctx.beginPath(); [-1, 1].forEach(sisi => { const k = kaki(sisi); ctx.moveTo(k.x, tanah); ctx.lineTo(k.x, k.y); }); ctx.stroke();
  // lalat
  if (h._terbuka) {
    for (let k = 0; k < 4; k++) { const a = p * 12 + k * 1.6, x = cx - 40 + k * 26 + Math.cos(a) * 10, y = cy - 40 + Math.sin(a * 1.3) * 8; if (benda(ctx, 'lalat', x, y, 16, { rot: Math.sin(a) * 0.4 })) continue; ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(148,163,184,.8)'; ctx.beginPath(); ctx.ellipse(x - 2, y - 3, 3, 1.5, 0.5, 0, 7); ctx.ellipse(x + 2, y - 3, 3, 1.5, -0.5, 0, 7); ctx.fill(); }
  }
  termometer2(ctx, W - 42, 30, 90, T_LUAR_KERING + (h.suhu - T_LUAR_KERING) * mulus(p), 25, 75, `${fx(h.suhu)} °C`, 60);
  bilahNilai(ctx, W - 160, 150, 120, h.lembap, 100, h.lembap > 75 ? '#dc2626' : '#0ea5e9', `kelembapan ${h.lembap}%`);
  const kadarSekarang = lerp(75, h._kadar, mulus(p));
  bilahNilai(ctx, W - 160, 186, 120, kadarSekarang, 75, kadarSekarang <= 40 ? '#16a34a' : '#f59e0b', `kadar air ${Math.round(kadarSekarang)}%`);
  label(ctx, `hari ke-${Math.min(2, Math.floor(p * 2) + 1)} · ${ALAS_KERING[v.alas].nama} · ${PENUTUP_KERING[v.penutup].nama}`, 12, H - 30, { ukuran: 10, warna: '#334155', latar: 'rgba(255,255,255,.88)' });
  if (p >= 1) {
    const ok = kriteriaPengering(v, h).every(k => k.lulus);
    hasilAkhir(ctx, W, H, h._gosong ? `Terlalu panas ${fx(h.suhu)} °C — ikan bisa matang` : `Setelah 2 hari kadar air ${h.kadarAir}% · ${fx(h.suhu)} °C · lembap ${h.lembap}%`, ok, h.kadarAir <= 45 && !h._gosong);
  }
}

/* ---------------------------------------------------------
   16. PANEN GARAM — penguapan & kristalisasi
   Hari panen ≈ kedalaman air (mm) × fraksi air ÷ laju penguapan (mm/hari).
   Air dangkal lebih cepat panas; alas hitam menyerap panas; air tua (sudah dipekatkan) memberi
   garam jauh lebih banyak per mm air yang diuapkan. Garam = volume × kadar garam.
   --------------------------------------------------------- */
const SUMBER_GARAM = {
  laut: { nama: 'Air laut langsung (± 3,5%)', g: 35, air: 0.97, bonus: 0, harga: 0 },
  tua: { nama: 'Air tua dari petak peminihan (± 15%)', g: 150, air: 0.87, bonus: 3, harga: 15000 }
};
const ALAS_GARAM = {
  tanah: { nama: 'Tanah dipadatkan (tradisional)', laju: 1, murni: 82, harga: 0 },
  terpal: { nama: 'Terpal/geomembran hitam', laju: 1.35, murni: 93, harga: 12000 },
  putih: { nama: 'Plastik putih', laju: 0.9, murni: 92, harga: 8000 }
};
const SARING_GARAM = { tanpa: { nama: 'Tanpa penyaringan', murni: 0, harga: 0 }, kain: { nama: 'Disaring kain', murni: 2, harga: 5000 }, kainpasir: { nama: 'Kain + pasir', murni: 3.5, harga: 10000 } };

function hitungGaram(v) {
  const S = SUMBER_GARAM[v.sumber], A = ALAS_GARAM[v.alas], Sr = SARING_GARAM[v.saring];
  const d = +v.dalam, luas = +v.luas;
  const laju = (v.cuaca === 'cerah' ? 7 : 3.5) * A.laju * jepit(1.15 - 0.05 * d, 0.6, 1.1); // mm/hari
  const hari = d * 10 * S.air / laju;
  const liter = luas * d * 10, garam = liter * S.g / 1000;
  const murni = Math.min(99, A.murni + Sr.murni + S.bonus - (v.alas === 'tanah' && d < 2 ? 2 : 0));
  const biaya = Math.round(luas * A.harga + Sr.harga + S.harga);
  return {
    volume: Math.round(liter), laju: bulat(laju, 1), hari: bulat(hari, 1), garam: bulat(garam, 1), murni: bulat(murni, 1),
    perHari: bulat(garam / hari, 2), biaya, _S: S, _A: A
  };
}
function kriteriaGaram(v, h) {
  return [
    { teks: 'Panen ≤ 7 hari (sebelum musim hujan datang)', lulus: h.hari <= 7, nilai: `${fx(h.hari)} hari` },
    { teks: 'Hasil garam ≥ 3 kg per panen', lulus: h.garam >= 3, nilai: `${fx(h.garam)} kg` },
    { teks: 'Kemurnian NaCl ≥ 94% (syarat garam konsumsi)', lulus: h.murni >= 94, nilai: `${fx(h.murni)}%` },
    { teks: 'Luas petak ≤ 4 m² (lahan sekolah)', lulus: +v.luas <= 4, nilai: `${fx(+v.luas)} m²` },
    { teks: 'Biaya ≤ Rp 60.000', lulus: h.biaya <= 60000, nilai: rp(h.biaya) }
  ];
}
function gambarGaram(ctx, W, H, v, h, p) {
  const cerah = v.cuaca === 'cerah';
  // petak dilihat dari samping
  const x0 = W * 0.08, x1 = W * 0.72, dasar = H - 60, skalaD = 9; // px per cm
  if (latar(ctx, W, H, 'bg-tambak-garam', 0.88, dasar + 12)) { if (!cerah) { ctx.fillStyle = 'rgba(100,116,139,.3)'; ctx.fillRect(0, 0, W, H); } }
  else { langit(ctx, W, H * 0.6, cerah); ctx.fillStyle = cerah ? '#e0f2fe' : '#e2e8f0'; ctx.fillRect(0, H * 0.6, W, H * 0.4); }
  matahari(ctx, W * 0.85, 42, 22, p);
  if (!cerah) { awan(ctx, W * 0.72, 46, 1); awan(ctx, W * 0.3, 36, 0.8); }
  const dAwal = +v.dalam, dSisa = dAwal * (1 - mulus(p));
  ctx.fillStyle = '#a16207'; ctx.fillRect(x0 - 14, dasar - dAwal * skalaD - 16, 14, dAwal * skalaD + 30); ctx.fillRect(x1, dasar - dAwal * skalaD - 16, 14, dAwal * skalaD + 30);
  ctx.fillStyle = { tanah: '#92400e', terpal: '#111827', putih: '#f1f5f9' }[v.alas]; ctx.fillRect(x0, dasar, x1 - x0, 12);
  // air menyusut
  ctx.fillStyle = v.sumber === 'tua' ? 'rgba(59,130,246,.45)' : 'rgba(56,189,248,.55)';
  ctx.fillRect(x0, dasar - dSisa * skalaD, x1 - x0, dSisa * skalaD);
  // kristal garam tumbuh
  const kristal = jepit((p - 0.35) / 0.65, 0, 1), putih = h.murni >= 94 ? '#ffffff' : '#e7e5e4';
  const nK = Math.round(60 * kristal);
  for (let k = 0; k < nK; k++) {
    const x = x0 + 6 + ((k * 37) % (x1 - x0 - 12)), s = 3 + (k % 4);
    ctx.fillStyle = k % 5 === 0 && h.murni < 94 ? '#a8a29e' : putih; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 0.5;
    ctx.fillRect(x, dasar - s - (k % 3) * 2, s, s); ctx.strokeRect(x, dasar - s - (k % 3) * 2, s, s);
  }
  // uap
  ctx.strokeStyle = 'rgba(148,163,184,.75)'; ctx.lineWidth = 1.5;
  for (let k = 0; k < 6; k++) { const x = x0 + 30 + k * (x1 - x0) / 6, n = ((p * 3 + k * 0.17) % 1) * 40; ctx.beginPath(); ctx.moveTo(x, dasar - dSisa * skalaD - 6 - n); ctx.quadraticCurveTo(x + 6, dasar - dSisa * skalaD - 14 - n, x, dasar - dSisa * skalaD - 22 - n); ctx.stroke(); }
  if (p >= 1) benda(ctx, h.murni >= 94 ? 'tumpukan-garam' : 'tumpukan-garam-kusam', x0 + 70, dasar, 110, { ay: 1 });
  label(ctx, `kedalaman ${fx(dSisa, 1)} cm`, x0 + 6, dasar - dAwal * skalaD - 28, { ukuran: 10, tebal: true, warna: '#0c4a6e', latar: 'rgba(255,255,255,.88)' });
  label(ctx, `${SUMBER_GARAM[v.sumber].nama} · ${ALAS_GARAM[v.alas].nama}`, 12, 16, { ukuran: 10, tebal: true, warna: '#334155', latar: 'rgba(255,255,255,.9)' });
  // panel kanan
  const px = W * 0.78;
  label(ctx, `hari ke-${fx(h.hari * mulus(p), 1)}`, px, H * 0.62, { ukuran: 12, tebal: true, warna: '#0f172a' });
  bilahNilai(ctx, px, H * 0.62 + 28, W * 0.18, h.garam * kristal, Math.max(3, h.garam), '#64748b', `garam ${fx(h.garam * kristal, 1)} kg`);
  bilahNilai(ctx, px, H * 0.62 + 64, W * 0.18, h.murni, 100, h.murni >= 94 ? '#16a34a' : '#f59e0b', `kemurnian ${fx(h.murni)}%`);
  if (p >= 1) hasilAkhir(ctx, W, H, `${fx(h.garam)} kg garam dalam ${fx(h.hari)} hari · kemurnian ${fx(h.murni)}%`, kriteriaGaram(v, h).every(k => k.lulus), h.hari <= 7);
}

/* ---------------------------------------------------------
   17. DETEKTOR BORAKS DARI KUNYIT — indikator alami
   Kurkumin + asam borat → rosocyanin merah bata (terbentuk saat kertas mengering, lebih kuat bila asam).
   Kurkumin juga berubah cokelat-merah di larutan BASA → positif palsu bila sampel tidak diasamkan.
   Ekstrak terlalu pekat membuat kertas sangat kuning sehingga perubahan warna sulit dibedakan.
   --------------------------------------------------------- */
const SAMPEL_BORAKS = [
  { nama: 'Kerupuk A', ppm: 0, basa: true, ket: 'tanpa boraks, adonan memakai air kapur (basa)' },
  { nama: 'Kerupuk B', ppm: 150, basa: false, ket: 'mengandung boraks 150 ppm' },
  { nama: 'Bakso C', ppm: 60, basa: false, ket: 'mengandung boraks 60 ppm' },
  { nama: 'Bakso D', ppm: 0, basa: false, ket: 'tanpa boraks' }
];
const AMBANG_MERAH = 6;
function hitungBoraks(v) {
  const c = +v.kunyit * (v.pelarut === 'alkohol' ? 1 : 0.35);
  const kontras = c / (1 + (c / 4) ** 2);       // terlalu pekat → kertas terlalu kuning, kontras turun
  const fKering = 1 - Math.exp(-(+v.kering) / 8), asam = v.asam === 'cuka';
  const hasil = SAMPEL_BORAKS.map(s => {
    const sinyal = (s.ppm ? 4.5 * kontras * Math.sqrt(s.ppm / 100) * fKering * (asam ? 1.3 : 1) : 0) + (s.basa ? 9 * kontras * (asam ? 0.1 : 1) : 0);
    const positif = sinyal >= AMBANG_MERAH, benar = positif === s.ppm > 0;
    return { ...s, sinyal, positif, benar };
  });
  const benar = hasil.filter(x => x.benar).length, palsuPos = hasil.filter(x => x.positif && !x.ppm).length, palsuNeg = hasil.filter(x => !x.positif && x.ppm).length;
  // batas deteksi: ppm terkecil yang memberi sinyal ≥ ambang
    const kuat = 4.5 * kontras * fKering * (asam ? 1.3 : 1), batas = kuat > 0 ? Math.round(100 * (AMBANG_MERAH / kuat) ** 2) : Infinity;
  const biaya = Math.round(+v.kunyit * 20 + (v.pelarut === 'alkohol' ? 6000 : 0) + 2000 + (asam ? 1000 : 0));
  return {
    benar: `${benar} dari 4`, palsuPos, palsuNeg, batas: isFinite(batas) && batas < 5000 ? batas : '> 5000',
    waktu: 5 + +v.kering, kekuningan: Math.round(jepit(c / 6, 0, 1) * 100), biaya,
    _hasil: hasil, _benar: benar, _kontras: kontras
  };
}
function kriteriaBoraks(v, h) {
  const B = h._hasil;
  return [
    { teks: 'Boraks terdeteksi pada Kerupuk B (150 ppm)', lulus: B[1].positif, nilai: B[1].positif ? 'merah bata' : 'tetap kuning' },
    { teks: 'Boraks terdeteksi pada Bakso C (60 ppm)', lulus: B[2].positif, nilai: B[2].positif ? 'merah bata' : 'tetap kuning' },
    { teks: 'Tidak ada positif palsu (A dan D tetap kuning)', lulus: h.palsuPos === 0, nilai: h.palsuPos ? `${h.palsuPos} sampel salah merah` : 'tidak ada' },
    { teks: 'Hasil keluar ≤ 20 menit', lulus: h.waktu <= 20, nilai: `${h.waktu} menit` },
    { teks: 'Biaya ≤ Rp 10.000', lulus: h.biaya <= 10000, nilai: rp(h.biaya) }
  ];
}
function warnaKertas(sinyal, kuning) {
  const t = jepit(sinyal / 12, 0, 1), dasar = [lerp(255, 250, kuning), lerp(250, 204, kuning), lerp(220, 21, kuning)];
  return `rgb(${Math.round(lerp(dasar[0], 178, t))},${Math.round(lerp(dasar[1], 58, t))},${Math.round(lerp(dasar[2], 38, t))})`;
}
function gambarBoraks(ctx, W, H, v, h, p) {
  if (!latar(ctx, W, H, 'bg-lab-sekolah', 0.64, H * 0.64)) { ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#e7e5e4'; ctx.fillRect(0, H * 0.62, W, H * 0.28); }
  label(ctx, `Ekstrak ${v.kunyit} g kunyit dalam ${v.pelarut === 'alkohol' ? 'alkohol 70%' : 'air'} · ${v.asam === 'cuka' ? 'sampel + 2 tetes cuka' : 'sampel tanpa diasamkan'} · dikeringkan ${v.kering} menit`, 12, 16, { ukuran: 10, tebal: true, warna: '#334155', latar: 'rgba(255,255,255,.95)' });
  const n = 4, lebarKol = (W - 40) / n, kuning = jepit(+v.kunyit * (v.pelarut === 'alkohol' ? 1 : 0.35) / 6, 0.15, 1);
  const t = mulus(p);
  h._hasil.forEach((s, i) => {
    const cx = 20 + lebarKol * (i + 0.5);
    // mangkuk sampel
    if (!benda(ctx, s.nama.startsWith('Kerupuk') ? 'mangkuk-kerupuk' : 'mangkuk-bakso', cx, H * 0.62 + 12, lebarKol * 0.46, { ay: 1 })) {
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(cx, H * 0.62, lebarKol * 0.32, 12, 0, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = s.nama.startsWith('Kerupuk') ? '#fde68a' : '#d6d3d1';
    ctx.beginPath(); ctx.ellipse(cx, H * 0.62 - 4, lebarKol * 0.2, 7, 0, 0, 7); ctx.fill();
    }
    // kertas uji: dicelup lalu warnanya berubah seiring waktu kering
    const turun = jepit(t / 0.3, 0, 1) - jepit((t - 0.35) / 0.25, 0, 1), y0 = 56 + turun * 40;
    const s0 = s.basa ? 9 * h._kontras * (v.asam === 'cuka' ? 0.1 : 1) : 0;
    const sNow = t < 0.6 ? s0 * jepit(t / 0.3, 0, 1) : s0 + (s.sinyal - s0) * jepit((t - 0.6) / 0.4, 0, 1);
    ctx.fillStyle = warnaKertas(sNow, kuning); ctx.strokeStyle = '#a8a29e'; ctx.lineWidth = 1;
    ctx.fillRect(cx - 12, y0, 24, 110); ctx.strokeRect(cx - 12, y0, 24, 110);
    ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(cx - 12, y0, 24, 18);
    label(ctx, s.nama, cx, H * 0.62 + 26, { rata: 'center', ukuran: 11, tebal: true, latar: 'rgba(255,255,255,.85)' });
    if (p >= 1) {
      const ikon = s.benar ? '✔' : '✘', teks = s.positif ? 'POSITIF' : 'negatif';
      label(ctx, `${teks} ${ikon}`, cx, H * 0.62 + 46, { rata: 'center', ukuran: 10, tebal: true, warna: '#fff', latar: s.benar ? '#15803d' : '#b91c1c' });
      label(ctx, s.ppm ? `${s.ppm} ppm` : (s.basa ? 'basa, 0 ppm' : '0 ppm'), cx, H * 0.62 + 66, { rata: 'center', ukuran: 9, warna: '#334155', latar: 'rgba(255,255,255,.85)' });
    }
  });
  // skala warna
  const sx = W - 150, sy = 34;
  ctx.fillStyle = 'rgba(255,255,255,.9)'; kotakBulat(ctx, sx - 6, sy - 6, 144, 40, 6); ctx.fill();
  for (let k = 0; k <= 10; k++) { ctx.fillStyle = warnaKertas(k * 1.2, kuning); ctx.fillRect(sx + k * 12, sy, 12, 10); }
  label(ctx, 'kuning', sx, sy + 20, { ukuran: 9, warna: '#64748b' }); label(ctx, 'merah bata', sx + 132, sy + 20, { rata: 'right', ukuran: 9, warna: '#64748b' });
  if (p >= 1) hasilAkhir(ctx, W, H, `${h.benar} sampel benar · batas deteksi ± ${h.batas} ppm · ${h.waktu} menit`, h._benar === 4 && h.waktu <= 20 && h.biaya <= 10000, h._benar >= 3);
}

/* ---------------------------------------------------------
   18. PERANGKAP NYAMUK DBD — fermentasi ragi menghasilkan CO₂
   Aktivitas ragi optimum ± 32 °C (mati di atas 45 °C). Laju CO₂ ∝ ragi^0,7; lama aktif = CO₂ total
   dari gula ÷ laju. Nyamuk tertarik CO₂, warna gelap, dan tempat teduh.
   Bila perangkap tidak diganti ≤ 7 hari, telur nyamuk di dalamnya menetas → menjadi sarang jentik.
   --------------------------------------------------------- */
function hitungNyamuk(v) {
  const T = +v.suhu, gula = +v.gula, ragi = +v.ragi, ganti = +v.ganti;
  const aktif = Math.exp(-(((T - 32) / 10) ** 2)) * (T > 45 ? 0.1 : 1);
  const laju = 2.5 * ragi ** 0.7 * aktif;                       // g CO₂ per hari
  const total = gula * 0.49, lama = laju > 0.01 ? total / laju : 0;
  const fBotol = v.botol === 'hitam' ? 1.4 : 1, fLetak = v.letak === 'teduh' ? 1.3 : 0.6;
  const perHari = 0.8 * laju * fBotol * fLetak;
  const minggu = perHari * Math.min(7, lama);
  const kaliSebulan = 30 / ganti, biaya = Math.round(kaliSebulan * (gula * 15 + ragi * 100));
  return {
    co2: bulat(laju, 1), lama: bulat(lama, 1), tangkap: Math.round(minggu), perHari: bulat(perHari, 1),
    jentik: ganti > 7 ? 'Ya — jentik menjadi nyamuk!' : 'Aman', biaya,
    _sarang: ganti > 7, _mati: T > 45
  };
}
function kriteriaNyamuk(v, h) {
  return [
    { teks: 'Masih menghasilkan CO₂ sampai saatnya diganti', lulus: h.lama >= +v.ganti, nilai: `aktif ${fx(h.lama)} hari, diganti tiap ${v.ganti} hari` },
    { teks: 'Menangkap ≥ 20 nyamuk per minggu', lulus: h.tangkap >= 20, nilai: `${h.tangkap} nyamuk` },
    { teks: 'Tidak menjadi sarang jentik (diganti ≤ 7 hari)', lulus: !h._sarang, nilai: h.jentik },
    { teks: 'Biaya ≤ Rp 5.000 per bulan', lulus: h.biaya <= 5000, nilai: rp(h.biaya) }
  ];
}
function gambarNyamuk(ctx, W, H, v, h, p) {
  const teduh = v.letak === 'teduh';
  if (!latar(ctx, W, H, teduh ? 'bg-teras-teduh' : 'bg-halaman-terik', 0.8, H - 40)) {
    ctx.fillStyle = teduh ? '#d1fae5' : '#fef9c3'; ctx.fillRect(0, 0, W, H);
    if (teduh) { ctx.fillStyle = '#166534'; ctx.beginPath(); ctx.arc(W * 0.1, 30, 70, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(21,128,61,.18)'; ctx.fillRect(0, 0, W, H); }
    else matahari(ctx, W * 0.1, 40, 24, p);
    ctx.fillStyle = '#a8a29e'; ctx.fillRect(0, H - 40, W, 40);
  }
  // botol: bagian bawah berisi larutan, corong terbalik di atas
  const bx = W * 0.42, bw = 74, alas = H - 40, bt = 150;
  ctx.fillStyle = v.botol === 'hitam' ? '#1f2937' : 'rgba(255,255,255,.55)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
  kotakBulat(ctx, bx - bw / 2, alas - bt, bw, bt, 12); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(253,230,138,.85)'; ctx.fillRect(bx - bw / 2 + 4, alas - bt * 0.45, bw - 8, bt * 0.45 - 4);
  ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(bx - bw / 2 + 2, alas - bt + 8); ctx.lineTo(bx - 8, alas - bt + 46); ctx.lineTo(bx + 8, alas - bt + 46); ctx.lineTo(bx + bw / 2 - 2, alas - bt + 8); ctx.stroke();
  // gelembung CO₂
  const nG = Math.round(jepit(h.co2, 0, 6) * 2);
  for (let k = 0; k < nG; k++) {
    const y = alas - 8 - ((p * 2.5 + k / nG) % 1) * bt * 0.4, x = bx - 20 + (k * 13) % 40;
    ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, 2 + (k % 3), 0, 7); ctx.stroke();
  }
  // CO₂ menyebar ke luar
  ctx.fillStyle = `rgba(148,163,184,${0.12 + jepit(h.co2 / 8, 0, 0.3)})`;
  ctx.beginPath(); ctx.ellipse(bx, alas - bt - 10, 40 + h.co2 * 10 * mulus(p), 22 + h.co2 * 4 * mulus(p), 0, 0, 7); ctx.fill();
  label(ctx, 'CO₂', bx, alas - bt - 12, { rata: 'center', ukuran: 10, tebal: true, warna: '#475569' });
  // nyamuk mendekat sesuai daya tarik
  const nN = Math.min(12, Math.max(1, Math.round(h.perHari * 1.5)));
  for (let k = 0; k < nN; k++) {
    const a0 = k * 2.4, jauh = 1 - mulus(jepit(p * 1.3 - k * 0.04, 0, 1)) * (h._mati ? 0.1 : 0.85);
    const x = bx + Math.cos(a0) * 200 * jauh + Math.sin(p * 30 + k) * 4, y = alas - bt - 20 + Math.sin(a0) * 90 * jauh + Math.cos(p * 25 + k) * 4;
    if (benda(ctx, 'nyamuk-aedes', x, y, 36, { rot: Math.sin(p * 20 + k) * 0.2 })) continue;
    ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.ellipse(x, y, 5, 2, 0.3, 0, 7); ctx.fill();
    ctx.strokeStyle = '#111827'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(x - 2, y); ctx.lineTo(x - 6, y + 5); ctx.moveTo(x + 2, y); ctx.lineTo(x + 6, y + 5); ctx.stroke();
    ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.beginPath(); ctx.ellipse(x - 1, y - 3, 4, 1.5, -0.6, 0, 7); ctx.fill();
  }
  // panel
  const px = W * 0.66;
  ctx.fillStyle = 'rgba(255,255,255,.88)'; kotakBulat(ctx, px - 10, 12, W * 0.3 + 20, 132, 10); ctx.fill();
  label(ctx, `hari ke-${Math.round(+v.ganti * mulus(p))} dari ${v.ganti}`, px, 30, { ukuran: 12, tebal: true });
  bilahNilai(ctx, px, 64, W * 0.3, Math.max(0, h.lama - +v.ganti * mulus(p)), Math.max(+v.ganti, h.lama), '#f59e0b', `sisa gula untuk ${fx(Math.max(0, h.lama - +v.ganti * mulus(p)))} hari`);
  bilahNilai(ctx, px, 100, W * 0.3, h.tangkap * mulus(p), 60, '#0f766e', `tertangkap ${Math.round(h.tangkap * mulus(p))} nyamuk/minggu`);
  if (h._sarang && p > 0.7) label(ctx, '⚠ jentik menetas di perangkap', px, 132, { ukuran: 10, tebal: true, warna: '#fff', latar: '#b91c1c' });
  if (h._mati) label(ctx, 'air terlalu panas — ragi mati', bx, alas - bt * 0.25, { rata: 'center', ukuran: 10, tebal: true, warna: '#fff', latar: '#b91c1c' });
  if (p >= 1) hasilAkhir(ctx, W, H, `CO₂ ${fx(h.co2)} g/hari selama ${fx(h.lama)} hari · ${h.tangkap} nyamuk/minggu · ${rp(h.biaya)}/bulan`, kriteriaNyamuk(v, h).every(k => k.lulus), h.tangkap >= 20);
}

/* ---------------------------------------------------------
   19. KOMPOS SAMPAH KANTIN — dekomposer
   C/N campuran = 1 / (f_cokelat/60 + f_hijau/15), optimum 25–35. Kelembapan optimum ± 55%.
   Oksigen dari wadah + pembalikan (berkurang bila terlalu basah). Kekurangan oksigen → bau busuk;
   C/N terlalu rendah → bau amonia. Suhu puncak ≥ 45 °C membunuh bibit penyakit dan biji gulma.
   --------------------------------------------------------- */
const WADAH_KOMPOS = {
  rapat: { nama: 'Ember tertutup rapat', o: 0.2, harga: 5000 },
  lubang: { nama: 'Ember berlubang', o: 0.6, harga: 8000 },
  takakura: { nama: 'Keranjang Takakura (berpori)', o: 0.85, harga: 15000 }
};
const BALIK_KOMPOS = { tidak: { nama: 'Tidak pernah dibalik', o: 0 }, '7': { nama: 'Dibalik tiap 7 hari', o: 0.15 }, '3': { nama: 'Dibalik tiap 3 hari', o: 0.3 } };
const CACAH_KOMPOS = { besar: { nama: 'Besar (utuh)', f: 0.6, padat: 0 }, sedang: { nama: 'Sedang (± 5 cm)', f: 0.85, padat: 0 }, kecil: { nama: 'Kecil (± 1 cm)', f: 1, padat: 0.1 } };

function hitungKompos(v) {
  const fc = +v.cokelat / 100, CN = 1 / (fc / 60 + (1 - fc) / 15);
  const air = +v.air, W = WADAH_KOMPOS[v.wadah], B = BALIK_KOMPOS[v.balik], C = CACAH_KOMPOS[v.cacah];
  const fCN = Math.exp(-(((CN - 30) / 12) ** 2)), fAir = Math.exp(-(((air - 55) / 20) ** 2));
  const O = jepit(W.o + B.o - Math.max(0, air - 65) / 20 - C.padat * (air > 60 ? 1 : 0), 0.05, 1);
  const k = fCN * fAir * (0.3 + 0.7 * O) * C.f * (v.aktivator === 'em4' ? 1.25 : 1);
  const hari = k > 0.05 ? 18 / k : 360;
  const suhu = 30 + 35 * k * Math.sqrt(O);
  const bau = O < 0.45 ? 'Busuk (kurang oksigen)' : CN < 20 ? 'Amonia (terlalu banyak sampah hijau)' : 'Tidak berbau (seperti tanah)';
  const biaya = W.harga + (v.aktivator === 'em4' ? 8000 : 0);
  return {
    cn: bulat(CN, 1), suhu: Math.round(suhu), hari: Math.round(Math.min(hari, 360)), bau, oksigen: Math.round(O * 100),
    susut: Math.round(jepit(30 + 30 * k, 20, 65)), biaya, _baik: bau.startsWith('Tidak'), _k: k, _O: O
  };
}
function kriteriaKompos(v, h) {
  return [
    { teks: 'Kompos matang ≤ 30 hari', lulus: h.hari <= 30, nilai: `${h.hari} hari` },
    { teks: 'Tidak berbau', lulus: h._baik, nilai: h.bau },
    { teks: 'Suhu puncak ≥ 45 °C (bibit penyakit mati)', lulus: h.suhu >= 45, nilai: `${h.suhu} °C` },
    { teks: 'Biaya ≤ Rp 20.000', lulus: h.biaya <= 20000, nilai: rp(h.biaya) }
  ];
}
function gambarKompos(ctx, W, H, v, h, p) {
  const cx = W * 0.36, lebar = Math.min(220, W * 0.36), tinggi = H - 110, alas = H - 36;
  if (!latar(ctx, W, H, 'bg-sudut-kompos', 0.74, alas)) { ctx.fillStyle = '#f5f5f4'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#d6d3d1'; ctx.fillRect(0, H - 36, W, 36); }
  benda(ctx, 'daun-kering', W * 0.08, alas + 4, 120, { ay: 1 });
  benda(ctx, 'sisa-sayur', cx + lebar / 2 + 62, alas + 4, 110, { ay: 1 });
  // wadah
  ctx.fillStyle = v.wadah === 'takakura' ? '#d4a373' : '#1d4ed8'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx - lebar / 2, alas - tinggi); ctx.lineTo(cx - lebar / 2 + 14, alas); ctx.lineTo(cx + lebar / 2 - 14, alas); ctx.lineTo(cx + lebar / 2, alas - tinggi); ctx.closePath(); ctx.fill(); ctx.stroke();
  if (v.wadah === 'takakura') { ctx.strokeStyle = 'rgba(120,53,15,.45)'; ctx.lineWidth = 1; for (let k = 1; k < 10; k++) { ctx.beginPath(); ctx.moveTo(cx - lebar / 2 + k * lebar / 10, alas - tinggi); ctx.lineTo(cx - lebar / 2 + 7 + k * (lebar - 14) / 10, alas); ctx.stroke(); } }
  if (v.wadah === 'lubang') { ctx.fillStyle = '#0f172a'; for (let k = 0; k < 12; k++) ctx.fillRect(cx - lebar / 2 + 16 + (k % 6) * (lebar - 32) / 5, alas - tinggi * 0.3 - Math.floor(k / 6) * 30, 4, 4); }
  if (v.wadah === 'rapat') { ctx.fillStyle = '#1e3a8a'; ctx.fillRect(cx - lebar / 2 - 6, alas - tinggi - 10, lebar + 12, 10); }
  // isi: lapisan cokelat & hijau, susut seiring waktu
  const susut = h.susut / 100 * mulus(p), isiT = (tinggi - 20) * (1 - susut);
  const fc = +v.cokelat / 100;
  for (let k = 0; k < 8; k++) {
    const y = alas - 6 - (k + 1) * isiT / 8, campur = mulus(p) * jepit(h._k, 0, 1);
    const hijau = k % 2 === 0 ? 1 - fc : fc;
    ctx.fillStyle = k % 2 === 0 ? `rgb(${Math.round(lerp(74, 87, campur))},${Math.round(lerp(124, 66, campur))},${Math.round(lerp(39, 39, campur))})` : `rgb(${Math.round(lerp(161, 87, campur))},${Math.round(lerp(98, 66, campur))},${Math.round(lerp(7, 39, campur))})`;
    ctx.fillRect(cx - lebar / 2 + 12 + (1 - y / alas) * 0, y, lebar - 24, isiT / 8 * (0.6 + hijau * 0.8) / 1);
  }
  // cacing muncul bila penguraian aktif
  if (h._k > 0.4 && p > 0.4) benda(ctx, 'cacing', cx + 26, alas - 6 - isiT + 6, 58, { ay: 1, alpha: jepit((p - 0.4) / 0.3, 0, 1) });
  // mikroba
  ctx.fillStyle = 'rgba(255,255,255,.85)';
  for (let k = 0; k < Math.round(h._k * 40 * mulus(p)); k++) { ctx.beginPath(); ctx.arc(cx - lebar / 2 + 20 + (k * 29) % (lebar - 40), alas - 10 - (k * 17) % Math.max(10, isiT - 10), 1.6, 0, 7); ctx.fill(); }
  // oksigen masuk
  if (h._O > 0.3) for (let k = 0; k < 3; k++) { const t = (p * 3 + k / 3) % 1; panah(ctx, cx - lebar / 2 - 40 + t * 28, alas - tinggi * (0.3 + k * 0.2), cx - lebar / 2 - 14 + t * 28, alas - tinggi * (0.3 + k * 0.2), 'rgba(14,165,233,.85)', 2); }
  label(ctx, `O₂ ${h.oksigen}%`, cx - lebar / 2 - 44, alas - tinggi - 6, { ukuran: 10, tebal: true, warna: '#0369a1' });
  // bau
  if (!h._baik && p > 0.4) {
    ctx.strokeStyle = h.bau.startsWith('Busuk') ? 'rgba(101,163,13,.8)' : 'rgba(234,179,8,.8)'; ctx.lineWidth = 2;
    for (let k = 0; k < 3; k++) { const x = cx - 30 + k * 30, n = ((p * 3 + k * 0.3) % 1) * 30; ctx.beginPath(); ctx.moveTo(x, alas - tinggi - 14 - n); ctx.bezierCurveTo(x - 10, alas - tinggi - 24 - n, x + 10, alas - tinggi - 34 - n, x, alas - tinggi - 44 - n); ctx.stroke(); }
    label(ctx, h.bau.split(' (')[0], cx, alas - tinggi - 60, { rata: 'center', ukuran: 11, tebal: true, warna: '#fff', latar: '#a16207' });
  }
  termometer2(ctx, W * 0.66, 36, 100, 30 + (h.suhu - 30) * mulus(p), 20, 70, `${Math.round(30 + (h.suhu - 30) * mulus(p))} °C`, 45);
  const px = W * 0.74;
  label(ctx, `C/N ${fx(h.cn)}`, px, 40, { ukuran: 12, tebal: true, warna: h.cn >= 25 && h.cn <= 35 ? '#15803d' : '#b45309' });
  label(ctx, `hari ke-${Math.round(h.hari * mulus(p))}`, px, 64, { ukuran: 12, tebal: true });
  bilahNilai(ctx, px, 96, W * 0.22, mulus(p), 1, '#57534e', `kematangan ${Math.round(mulus(p) * 100)}%`);
  bilahNilai(ctx, px, 132, W * 0.22, +v.air, 100, +v.air > 65 || +v.air < 40 ? '#dc2626' : '#0ea5e9', `kelembapan ${v.air}%`);
  if (p >= 1) hasilAkhir(ctx, W, H, `Matang ${h.hari} hari · suhu puncak ${h.suhu} °C · ${h.bau}`, kriteriaKompos(v, h).every(k => k.lulus), h._baik);
}

/* ---------------------------------------------------------
   20. RUANG KELAS SEJUK TANPA AC — konveksi, radiasi, insulasi
   Suhu ruang = T_luar + panas masuk ÷ (pertukaran udara + selubung). Panas masuk dari atap
   (bergantung warna atap & plafon), dinding barat (peneduh), 32 murid, dan kipas.
   Suhu terasa = rata-rata suhu udara & plafon − efek angin (kipas, ventilasi silang).
   --------------------------------------------------------- */
const JENDELA_SEJUK = { satu: { nama: 'Jendela satu sisi', ach: 6, harga: 0 }, silang: { nama: 'Ventilasi silang (dua sisi)', ach: 16, harga: 300000 }, roster: { nama: 'Silang + roster atas', ach: 22, harga: 1000000 } };
const ATAP_SEJUK = { gelap: { nama: 'Genteng/seng gelap', a: 0.9, harga: 0 }, terang: { nama: 'Cat atap terang', a: 0.6, harga: 600000 }, putih: { nama: 'Cat reflektif putih', a: 0.3, harga: 900000 } };
const PLAFON_SEJUK = { tanpa: { nama: 'Tanpa plafon', f: 1, harga: 0 }, triplek: { nama: 'Plafon triplek', f: 0.55, harga: 1200000 }, foil: { nama: 'Triplek + aluminium foil', f: 0.3, harga: 1700000 } };
const T_LUAR_SEJUK = 31;

function hitungSejuk(v) {
  const J = JENDELA_SEJUK[v.jendela], A = ATAP_SEJUK[v.atap], P = PLAFON_SEJUK[v.plafon], kipas = +v.kipas;
  const qAtap = 56 * 30 * A.a * P.f, qBarat = v.peneduh === 'barat' ? 250 : 600, qMurid = 32 * 70, qKipas = kipas * 60;
  const Hv = 1200 * 196 * J.ach / 3600 + 250;
  const T = T_LUAR_SEJUK + (qAtap + qBarat + qMurid + qKipas) / Hv;
  const tPlafon = T + qAtap / 56 / 8;
  const angin = Math.min(3, kipas * 1.0) + (v.jendela === 'satu' ? 0 : 1.5);
  const terasa = (T + tPlafon) / 2 - angin;
  const co2 = 420 + 32 * 0.018 * 1e6 / (J.ach * 196);
  const biaya = J.harga + A.harga + P.harga + (v.peneduh === 'barat' ? 300000 : 0) + kipas * 200000;
  return {
    suhu: bulat(T, 1), plafon: bulat(tPlafon, 1), terasa: bulat(terasa, 1), ach: J.ach, co2: Math.round(co2), listrik: kipas * 60,
    panasAtap: Math.round(qAtap), biaya
  };
}
function kriteriaSejuk(v, h) {
  return [
    { teks: 'Suhu terasa ≤ 30 °C pukul 12.00', lulus: h.terasa <= 30, nilai: `${fx(h.terasa)} °C` },
    { teks: 'Udara segar: CO₂ ≤ 1.000 ppm', lulus: h.co2 <= 1000, nilai: `${h.co2} ppm` },
    { teks: 'Daya listrik ≤ 200 W', lulus: h.listrik <= 200, nilai: `${h.listrik} W` },
    { teks: 'Biaya ≤ Rp 3.500.000', lulus: h.biaya <= 3500000, nilai: rp(h.biaya) }
  ];
}
function gambarSejuk(ctx, W, H, v, h, p) {
  const x0 = W * 0.12, x1 = W * 0.7, lantai = H - 36, dinding = 120, puncak = lantai - dinding - 60;
  if (!latar(ctx, W, H, 'bg-halaman-sekolah', 0.86, lantai)) { langit(ctx, W, H, true); ctx.fillStyle = '#86efac'; ctx.fillRect(0, H - 36, W, 36); }
  matahari(ctx, W - 40, 40, 22, p);
  // atap
  ctx.fillStyle = { gelap: '#7f1d1d', terang: '#fca5a5', putih: '#f8fafc' }[v.atap]; ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x0 - 20, lantai - dinding); ctx.lineTo((x0 + x1) / 2, puncak); ctx.lineTo(x1 + 20, lantai - dinding); ctx.closePath(); ctx.fill(); ctx.stroke();
  // panas dari atap
  const panas = h.panasAtap / 1512;
  for (let k = 0; k < 5; k++) { const x = x0 + 30 + k * (x1 - x0 - 60) / 4, t = (p * 2 + k * 0.2) % 1; ctx.strokeStyle = `rgba(239,68,68,${0.2 + 0.7 * panas})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, lantai - dinding + 4 + t * 30); ctx.quadraticCurveTo(x + 6, lantai - dinding + 12 + t * 30, x, lantai - dinding + 20 + t * 30); ctx.stroke(); }
  // dinding & plafon
  ctx.fillStyle = '#fef3c7'; ctx.fillRect(x0, lantai - dinding, x1 - x0, dinding);
  if (v.plafon !== 'tanpa') { ctx.fillStyle = v.plafon === 'foil' ? '#cbd5e1' : '#d6a46b'; ctx.fillRect(x0, lantai - dinding, x1 - x0, 7); }
  ctx.strokeStyle = '#475569'; ctx.strokeRect(x0, lantai - dinding, x1 - x0, dinding);
  // jendela
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(x0 - 2, lantai - 80, 6, 44); if (v.jendela !== 'satu') ctx.fillRect(x1 - 4, lantai - 80, 6, 44);
  if (v.jendela === 'roster') { ctx.fillStyle = '#94a3b8'; for (let k = 0; k < 4; k++) { ctx.fillRect(x0 - 2, lantai - dinding + 14 + k * 6, 6, 3); ctx.fillRect(x1 - 4, lantai - dinding + 14 + k * 6, 6, 3); } }
  // aliran udara
  const t = (p * 3) % 1;
  if (v.jendela === 'satu') { panah(ctx, x0 - 30, lantai - 60, x0 + 20 + t * 20, lantai - 60, '#0ea5e9', 2); panah(ctx, x0 + 30, lantai - 46, x0 - 20 - t * 10, lantai - 40, 'rgba(239,68,68,.8)', 2); }
  else {
    for (let k = 0; k < (v.jendela === 'roster' ? 3 : 2); k++) { const y = lantai - 70 + k * 18 - (k === 2 ? 52 : 0); panah(ctx, x0 - 30 + t * (x1 - x0 + 20), y, x0 + t * (x1 - x0 + 20), y, '#0ea5e9', 2); }
  }
  // murid
  for (let k = 0; k < 8; k++) { const x = x0 + 30 + k * (x1 - x0 - 60) / 7; ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(x, lantai - 30, 5, 0, 7); ctx.fill(); ctx.fillRect(x - 4, lantai - 24, 8, 12); }
  // kipas
  for (let k = 0; k < +v.kipas; k++) { const x = x0 + (k + 1) * (x1 - x0) / (+v.kipas + 1), y = lantai - dinding + 18, a = p * 40; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, lantai - dinding + 6); ctx.lineTo(x, y); ctx.stroke(); ctx.lineWidth = 3; for (let b = 0; b < 3; b++) { const s = a + b * 2.09; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(s) * 18, y + Math.sin(s) * 4); ctx.stroke(); } }
  // pohon peneduh di sisi barat (kiri)
  if (v.peneduh === 'barat' && !benda(ctx, 'pohon-peneduh', x0 + 4, lantai + 2, 140, { ay: 1 })) { ctx.fillStyle = '#78350f'; ctx.fillRect(x0 - 52, lantai - 70, 8, 70); ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.arc(x0 - 48, lantai - 90, 32, 0, 7); ctx.fill(); }
  const tSekarang = T_LUAR_SEJUK + (h.terasa - T_LUAR_SEJUK) * mulus(p);
  termometer2(ctx, W * 0.8, 40, 100, tSekarang, 24, 42, `terasa ${fx(tSekarang)} °C`, 30);
  bilahNilai(ctx, W * 0.74, 190, W * 0.22, h.co2, 2000, h.co2 > 1000 ? '#dc2626' : '#16a34a', `CO₂ ${h.co2} ppm`);
  label(ctx, `udara ${fx(h.suhu)} °C · plafon ${fx(h.plafon)} °C · ganti udara ${h.ach}×/jam`, 12, 16, { ukuran: 10, tebal: true, warna: '#334155', latar: 'rgba(255,255,255,.9)' });
  if (p >= 1) hasilAkhir(ctx, W, H, `Suhu terasa ${fx(h.terasa)} °C · CO₂ ${h.co2} ppm · ${rp(h.biaya)}`, kriteriaSejuk(v, h).every(k => k.lulus), h.terasa <= 31);
}

/* ---------------------------------------------------------
   21. PENYIRAM TETES OTOMATIS — tekanan hidrostatis & debit (Torricelli)
   Debit tiap lubang Q = Cd · A · √(2 g h), h = tinggi wadah + setengah tinggi air.
   10 tanaman; kebutuhan 0,45 L/hari (0,3 L dengan mulsa jerami). Jalur bercabang lebih merata.
   --------------------------------------------------------- */
const WADAH_TETES = {
  botol: { nama: 'Botol 1,5 L', vol: 1.5, tinggi: 0.3, harga: 0 },
  jeriken: { nama: 'Jeriken 5 L', vol: 5, tinggi: 0.3, harga: 15000 },
  galon: { nama: 'Galon bekas 19 L', vol: 19, tinggi: 0.4, harga: 10000 },
  ember: { nama: 'Ember bertutup 30 L', vol: 30, tinggi: 0.45, harga: 35000 }
};
const JALUR_TETES = { satu: { nama: 'Satu selang memanjang', dasar: 85, harga: 20000 }, cabang: { nama: 'Selang bercabang dua', dasar: 95, harga: 25000 } };
const TANAMAN_TETES = 10;

function hitungTetes(v) {
  const Wd = WADAH_TETES[v.wadah], J = JALUR_TETES[v.jalur];
  const tinggi = +v.tinggi, d = +v.lubang / 1000;                       // m
  const h = tinggi + Wd.tinggi / 2, A = Math.PI * d * d / 4;
  const Q = 0.25 * A * Math.sqrt(2 * 9.8 * h) * 86400 * 1000;          // L per hari per lubang
  const rata = J.dasar - 6 / (tinggi + 0.2), min = Q * rata / 100;
  const total = Q * TANAMAN_TETES, tahan = Wd.vol / total;
  const butuh = v.mulsa === 'jerami' ? 0.3 : 0.45;
  const biaya = Math.round(Wd.harga + J.harga + 10000 * tinggi + (v.mulsa === 'jerami' ? 5000 : 0));
  return {
    debit: bulat(Q, 2), terkecil: bulat(min, 2), butuh, rata: Math.round(rata), total: bulat(total, 1), tahan: bulat(tahan, 1), tekanan: Math.round(1000 * 9.8 * h), biaya
  };
}
function kriteriaTetes(v, h) {
  return [
    { teks: 'Tanaman paling ujung tetap cukup air', lulus: h.terkecil >= h.butuh, nilai: `${fx(h.terkecil, 2)} L/hari (butuh ${fx(h.butuh, 2)})` },
    { teks: 'Tidak boros: tiap tanaman ≤ 2× kebutuhan', lulus: h.debit <= 2 * h.butuh, nilai: `${fx(h.debit, 2)} L/hari` },
    { teks: 'Air bertahan ≥ 5 hari libur', lulus: h.tahan >= 5, nilai: `${fx(h.tahan)} hari` },
    { teks: 'Keseragaman ≥ 85%', lulus: h.rata >= 85, nilai: `${h.rata}%` },
    { teks: 'Biaya ≤ Rp 80.000', lulus: h.biaya <= 80000, nilai: rp(h.biaya) }
  ];
}
function gambarTetes(ctx, W, H, v, h, p) {
  const tanah = H - 46;
  if (!latar(ctx, W, H, 'bg-kebun-kemarau', 0.82, tanah)) { ctx.fillStyle = '#fefce8'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#a16207'; ctx.fillRect(0, tanah, W, 46); }
  matahari(ctx, W - 36, 34, 18, p);
  const Wd = WADAH_TETES[v.wadah], skala = Math.min(70, (tanah - 80) / 2.4);
  const wx = 50, wy = tanah - +v.tinggi * skala, wt = 30 + Math.sqrt(Wd.vol) * 10, ww = 26 + Math.sqrt(Wd.vol) * 8;
  // penyangga
  ctx.strokeStyle = '#78350f'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(wx - ww / 2 + 4, wy); ctx.lineTo(wx - ww / 2 + 4, tanah); ctx.moveTo(wx + ww / 2 - 4, wy); ctx.lineTo(wx + ww / 2 - 4, tanah); ctx.stroke();
  // wadah & air menyusut
  ctx.fillStyle = '#e0f2fe'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; kotakBulat(ctx, wx - ww / 2, wy - wt, ww, wt, 6); ctx.fill(); ctx.stroke();
  const sisa = jepit(1 - (5 / h.tahan) * mulus(p), 0, 1);
  ctx.fillStyle = '#38bdf8'; ctx.fillRect(wx - ww / 2 + 3, wy - 3 - (wt - 6) * sisa, ww - 6, (wt - 6) * sisa);
  label(ctx, `↕ ${fx(+v.tinggi, 1)} m`, wx, (wy + tanah) / 2, { rata: 'center', ukuran: 10, tebal: true, warna: '#334155', latar: 'rgba(255,255,255,.9)' });
  // selang & tanaman
  const xa = wx + ww / 2, x1 = W - 30, yTanam = tanah - 6;
  ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx, wy + 8); ctx.lineTo(xa + 10, yTanam - 64); ctx.lineTo(x1, yTanam - 64); ctx.stroke();
  if (v.jalur === 'cabang') { ctx.beginPath(); ctx.moveTo(xa + 10, yTanam - 64); ctx.lineTo(xa + 10, yTanam - 78); ctx.lineTo((xa + x1) / 2 + 20, yTanam - 78); ctx.stroke(); }
  for (let k = 0; k < TANAMAN_TETES; k++) {
    const x = xa + 30 + k * (x1 - xa - 40) / (TANAMAN_TETES - 1);
    const urut = v.jalur === 'cabang' ? (k % 5) / 4 : k / (TANAMAN_TETES - 1);
    const air = h.debit * (1 - (1 - h.rata / 100) * urut), cukup = air >= h.butuh;
    // tetes
    const t = (p * 6 + k * 0.13) % 1;
    ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(x, yTanam - 60 + t * 44, 2.4, 0, 7); ctx.fill();
    // tanaman (layu bila kurang)
    const layu = cukup ? 0 : jepit((h.butuh - air) / h.butuh, 0, 1) * mulus(p);
    if (benda(ctx, layu > 0.25 ? 'tanaman-cabai-layu' : 'tanaman-cabai', x, yTanam + 8, 44, { ay: 1 })) { if (v.mulsa === 'jerami') { ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 1.5; for (let s2 = -3; s2 <= 3; s2++) { ctx.beginPath(); ctx.moveTo(x - 10 + s2 * 3, yTanam + 8); ctx.lineTo(x - 5 + s2 * 3, yTanam + 4); ctx.stroke(); } } continue; }
    ctx.strokeStyle = cukup ? '#15803d' : '#a3a3a3'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, yTanam + 6); ctx.lineTo(x, yTanam - 4); ctx.stroke();
    ctx.fillStyle = cukup ? '#22c55e' : `rgb(${Math.round(lerp(34, 202, layu))},${Math.round(lerp(197, 138, layu))},${Math.round(lerp(94, 4, layu))})`;
    ctx.beginPath(); ctx.ellipse(x - 5, yTanam - 4 + layu * 4, 6, 3, -0.6 + layu, 0, 7); ctx.ellipse(x + 5, yTanam - 4 + layu * 4, 6, 3, 0.6 - layu, 0, 7); ctx.fill();
    if (v.mulsa === 'jerami') { ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 1; for (let s = -2; s <= 2; s++) { ctx.beginPath(); ctx.moveTo(x - 8 + s * 3, yTanam + 6); ctx.lineTo(x - 4 + s * 3, yTanam + 3); ctx.stroke(); } }
  }
  label(ctx, `${WADAH_TETES[v.wadah].nama} · lubang ${fx(+v.lubang, 2)} mm · ${JALUR_TETES[v.jalur].nama}`, 12, 16, { ukuran: 10, tebal: true, warna: '#334155', latar: 'rgba(255,255,255,.9)' });
  label(ctx, `hari ke-${Math.round(5 * mulus(p))} libur`, 12, 40, { ukuran: 11, tebal: true });
  if (p >= 1) hasilAkhir(ctx, W, H, `${fx(h.debit, 2)} L/hari per tanaman · air habis setelah ${fx(h.tahan)} hari · merata ${h.rata}%`, kriteriaTetes(v, h).every(k => k.lulus), h.tahan >= 5);
}

/* ---------------------------------------------------------
   22. SABUK MANGROVE PENAHAN ABRASI — ekosistem pesisir
   Tinggi gelombang di pantai H = H0 · e^(−k·lebar), k ∝ kerapatan pohon hidup × bentuk akar × umur.
   Laju abrasi ∝ (H/H0)². Kerapatan berlebih menurunkan bibit yang hidup.
   --------------------------------------------------------- */
const JENIS_MANGROVE = {
  apiapi: { nama: 'Api-api (akar napas)', akar: 0.8, hidup: 0.8 },
  bakau: { nama: 'Bakau (akar tunjang)', akar: 1.2, hidup: 0.6 },
  campur: { nama: 'Campuran (api-api di depan, bakau di belakang)', akar: 1.1, hidup: 0.78 }
};
const PANJANG_PANTAI = 200, HARGA_BIBIT = 3000;

function hitungMangrove(v) {
  const J = JENIS_MANGROVE[v.jenis], lebar = +v.lebar, rapat = +v.rapat, umur = +v.umur;
  const hidup = jepit(J.hidup - Math.max(0, rapat - 30) * 0.012, 0.2, 0.95);
  const fUmur = 1 - Math.exp(-umur / 4);
  const k = 0.0006 * rapat * hidup * J.akar * fUmur;
  const Hpantai = Math.exp(-k * lebar);                           // m (H0 = 1 m)
  const abrasi = 2 * Hpantai * Hpantai;
  const bibit = Math.round(lebar * PANJANG_PANTAI / 100 * rapat);
  const karbon = bibit * hidup * 0.015 * fUmur;
  return {
    gelombang: bulat(Hpantai, 2), redam: Math.round((1 - Hpantai * Hpantai) * 100), abrasi: bulat(abrasi, 2), bibit, hidup: Math.round(hidup * 100),
    karbon: bulat(karbon, 1), biaya: bibit * HARGA_BIBIT
  };
}
function kriteriaMangrove(v, h) {
  return [
    { teks: 'Abrasi ≤ 0,3 m per tahun', lulus: h.abrasi <= 0.3, nilai: `${fx(h.abrasi, 2)} m/tahun` },
    { teks: 'Gelombang tiba di pantai ≤ 0,4 m (awal 1 m)', lulus: h.gelombang <= 0.4, nilai: `${fx(h.gelombang, 2)} m` },
    { teks: 'Bibit hidup ≥ 70%', lulus: h.hidup >= 70, nilai: `${h.hidup}%` },
    { teks: 'Biaya ≤ Rp 15 juta (pantai 200 m)', lulus: h.biaya <= 15000000, nilai: rp(h.biaya) }
  ];
}
function gambarMangrove(ctx, W, H, v, h, p) {
  const muka = H * 0.55, x0 = 0, xPantai = W * 0.8;
  const adaLatar = latar(ctx, W, H, 'bg-pesisir-langit', 0.52, muka), warnaLaut = adaLatar ? '#2fb7c4' : '#0ea5e9';
  if (!adaLatar) { langit(ctx, W, H * 0.5, true); ctx.fillStyle = '#0ea5e9'; ctx.fillRect(0, muka, xPantai, H - muka); }
  // daratan & rumah
  ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.moveTo(xPantai - 20, H); ctx.lineTo(xPantai, muka - 6); ctx.lineTo(W, muka - 14); ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
  const kikis = h.abrasi * 18 * mulus(p);
  ctx.fillStyle = warnaLaut; ctx.beginPath(); ctx.moveTo(xPantai - 2, muka); ctx.lineTo(xPantai + kikis, muka); ctx.lineTo(xPantai + kikis * 0.6, muka + 18); ctx.lineTo(xPantai - 8, muka + 18); ctx.closePath(); ctx.fill();
  if (!benda(ctx, 'rumah-nelayan', W - 46, muka - 8, 84, { ay: 1 })) { ctx.fillStyle = '#b45309'; ctx.fillRect(W - 46, muka - 40, 30, 26); ctx.fillStyle = '#7f1d1d'; ctx.beginPath(); ctx.moveTo(W - 50, muka - 40); ctx.lineTo(W - 31, muka - 56); ctx.lineTo(W - 12, muka - 40); ctx.closePath(); ctx.fill(); }
  // sabuk mangrove
  const lebarPx = (xPantai - W * 0.15) * jepit(+v.lebar / 150, 0, 1), xa = xPantai - lebarPx;
  const nPohon = Math.round(jepit(+v.rapat / 40, 0, 1) * lebarPx / 9), tinggiPohon = 14 + 30 * (1 - Math.exp(-(+v.umur) / 5));
  for (let k = 0; k < nPohon; k++) {
    const x = xa + 6 + k * (lebarPx - 12) / Math.max(1, nPohon - 1) + ((k * 7) % 5);
    const mati = (k * 37 % 100) >= h.hidup;
    if (mati) continue;
    const bakau = v.jenis === 'bakau' || (v.jenis === 'campur' && x > xa + lebarPx * 0.4);
    if (benda(ctx, bakau ? 'pohon-bakau' : 'pohon-apiapi', x, muka + 6, 12 + tinggiPohon * 0.75, { ay: 1 })) continue;
    ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
    if (bakau) { for (let a = -1; a <= 1; a += 2) { ctx.beginPath(); ctx.moveTo(x, muka - 8); ctx.quadraticCurveTo(x + a * 8, muka - 6, x + a * 9, muka + 6); ctx.stroke(); } }
    else { for (let a = -2; a <= 2; a++) { ctx.beginPath(); ctx.moveTo(x + a * 4, muka + 2); ctx.lineTo(x + a * 4, muka - 4); ctx.stroke(); } }
    ctx.beginPath(); ctx.moveTo(x, muka - 4); ctx.lineTo(x, muka - tinggiPohon); ctx.stroke();
    ctx.fillStyle = bakau ? '#166534' : '#4d7c0f'; ctx.beginPath(); ctx.arc(x, muka - tinggiPohon - 4, 7 + tinggiPohon * 0.15, 0, 7); ctx.fill();
  }
  // gelombang: tinggi mengecil di dalam sabuk
  ctx.strokeStyle = '#e0f2fe'; ctx.lineWidth = 2.5;
  for (let g = 0; g < 4; g++) {
    ctx.beginPath();
    for (let x = 0; x <= xPantai; x += 6) {
      const dalam = Math.max(0, x - xa) / Math.max(1, lebarPx), amp = 14 * (x < xa ? 1 : Math.exp(Math.log(Math.max(h.gelombang, 0.02)) * jepit(dalam, 0, 1)));
      const y = muka - 4 + g * 14 + Math.sin(x / 26 - p * 18 + g) * amp * 0.5;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  label(ctx, 'gelombang 1 m', 12, muka - 22, { ukuran: 10, tebal: true, warna: '#0c4a6e', latar: 'rgba(255,255,255,.9)' });
  label(ctx, `tiba ${fx(h.gelombang, 2)} m`, xPantai - 4, muka - 30, { rata: 'right', ukuran: 10, tebal: true, warna: '#0c4a6e', latar: 'rgba(255,255,255,.9)' });
  label(ctx, `${JENIS_MANGROVE[v.jenis].nama} · lebar ${v.lebar} m · ${v.rapat} pohon/100 m² · umur ${v.umur} th`, 12, 16, { ukuran: 10, tebal: true, warna: '#334155', latar: 'rgba(255,255,255,.9)' });
  label(ctx, `karbon tersimpan ± ${fx(h.karbon)} ton CO₂/tahun`, 12, 40, { ukuran: 10, warna: '#166534', latar: 'rgba(255,255,255,.85)' });
  if (p >= 1) hasilAkhir(ctx, W, H, `Abrasi ${fx(h.abrasi, 2)} m/tahun · gelombang tiba ${fx(h.gelombang, 2)} m · bibit hidup ${h.hidup}%`, kriteriaMangrove(v, h).every(k => k.lulus), h.abrasi <= 0.5);
}

/* ---------------------------------------------------------
   23. TEMPE — bioteknologi konvensional (kapang Rhizopus)
   Panas fermentasi menaikkan suhu bagian tengah (makin tebal makin panas).
   Laju tumbuh kapang optimum ± 32 °C, perlu oksigen (bungkus berlubang/daun), ragi cukup.
   Terlalu lama setelah padat → amonia & spora hitam; kotor + lembap/pengap → bakteri berlendir.
   --------------------------------------------------------- */
const BUNGKUS_TEMPE = { rapat: { nama: 'Plastik tanpa lubang', o: 0.35, harga: 1000 }, lubang: { nama: 'Plastik berlubang', o: 1, harga: 1000 }, daun: { nama: 'Daun pisang', o: 1.05, harga: 3000 } };

function hitungTempe(v) {
  const B = BUNGKUS_TEMPE[v.bungkus], tebal = +v.tebal, ragi = +v.ragi, lama = +v.lama;
  const tengah = +v.suhu + 1.0 * tebal ** 1.3 * (v.bungkus === 'rapat' ? 1.3 : 1);
  const fRagi = Math.min(1, ragi / 1.5);
  const tumbuh = Math.exp(-(((tengah - 32) / 5) ** 2)) * B.o * fRagi * (tengah > 42 ? 0.1 : 1);
  const lag = 8 / Math.sqrt(Math.max(fRagi, 0.2));
  const jadi = tumbuh > 0.02 ? lag + 33 / tumbuh : 999;
  const tutup = lama > lag ? (1 - Math.exp(-0.09 * tumbuh * (lama - lag))) * 100 : 0;
  const lewat = lama > jadi + 16;
  const risiko = (v.bersih === 'bersih' ? 0.15 : 0.5) * (v.bungkus === 'rapat' ? 1.6 : 1) * (tengah > 38 ? 1.5 : 1) * (tumbuh < 0.4 ? 1.6 : 1);
  const lendir = risiko > 0.55;
  const aroma = lendir ? 'Asam berlendir (bakteri)' : lewat ? 'Amonia, spora hitam' : tutup >= 95 ? 'Harum khas tempe' : 'Masih bau kedelai';
  const biaya = 12000 + ragi * 500 + B.harga;
  return {
    tengah: bulat(tengah, 1), tutup: Math.round(tutup), jadi: jadi < 900 ? Math.round(jadi) : '> 72', aroma, kompak: tutup >= 95 ? 'Padat, bisa diiris' : tutup >= 70 ? 'Mudah patah' : 'Belum menyatu', biaya,
    _lendir: lendir, _lewat: lewat, _jadi: jadi
  };
}
function kriteriaTempe(v, h) {
  return [
    { teks: 'Kapang menutup ≥ 95% (padat)', lulus: h.tutup >= 95, nilai: `${h.tutup}%` },
    { teks: 'Tidak berlendir (tidak terkontaminasi bakteri)', lulus: !h._lendir, nilai: h._lendir ? 'berlendir' : 'bersih' },
    { teks: 'Tidak kelewatan (tidak bau amonia/spora hitam)', lulus: !h._lewat, nilai: h._lewat ? 'kelewatan' : 'pas' },
    { teks: 'Siap dipanen dalam ≤ 48 jam', lulus: h._jadi <= 48 && +v.lama <= 48, nilai: `padat jam ke-${h.jadi}, dipanen jam ke-${v.lama}` },
    { teks: 'Biaya ≤ Rp 16.000 per kg kedelai', lulus: h.biaya <= 16000, nilai: rp(h.biaya) }
  ];
}
function gambarTempe(ctx, W, H, v, h, p) {
  if (!latar(ctx, W, H, 'bg-dapur-tempe', 0.775, H - 64)) { ctx.fillStyle = '#fafaf9'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#e7e5e4'; ctx.fillRect(0, H - 40, W, 40); }
  const tebalPx = Math.min(H - 150, 30 + +v.tebal * 22), x0 = W * 0.06, x1 = W * 0.62, y1 = H - 64, y0 = y1 - tebalPx;
  // kedelai
  for (let r = 0; r < Math.round(tebalPx / 12); r++) for (let c = 0; c < Math.round((x1 - x0) / 13); c++) {
    const x = x0 + 7 + c * 13 + (r % 2) * 6, y = y1 - 7 - r * 11;
    if (x > x1 - 6) continue;
    ctx.fillStyle = h._lendir && p > 0.5 ? '#d9c79b' : '#e7c873'; ctx.beginPath(); ctx.ellipse(x, y, 6, 5, 0.3, 0, 7); ctx.fill();
  }
  // miselium putih menutup
  const tutup = (h.tutup / 100) * mulus(p);
  ctx.fillStyle = `rgba(255,253,245,${0.1 + 0.72 * tutup})`; ctx.fillRect(x0, y0, x1 - x0, tebalPx);
  ctx.strokeStyle = 'rgba(161,98,7,.28)'; ctx.lineWidth = 1;
  for (let r = 0; r < Math.round(tebalPx / 12); r++) for (let c = 0; c < Math.round((x1 - x0) / 13); c++) { const x = x0 + 7 + c * 13 + (r % 2) * 6, y = y1 - 7 - r * 11; if (x > x1 - 6) continue; ctx.beginPath(); ctx.ellipse(x, y, 6, 5, 0.3, 0, 7); ctx.stroke(); }
  ctx.strokeStyle = `rgba(255,255,255,${tutup})`; ctx.lineWidth = 1;
  for (let k = 0; k < Math.round(140 * tutup); k++) { const x = x0 + (k * 23) % (x1 - x0), y = y0 + (k * 11) % tebalPx; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6, y + 3); ctx.stroke(); }
  // spora hitam / lendir
  if (h._lewat && p > 0.7) { ctx.fillStyle = '#1c1917'; for (let k = 0; k < 30; k++) { ctx.beginPath(); ctx.arc(x0 + 8 + (k * 41) % (x1 - x0 - 16), y0 + 4 + (k * 13) % (tebalPx - 8), 2.4, 0, 7); ctx.fill(); } }
  if (h._lendir && p > 0.5) { ctx.fillStyle = 'rgba(163,230,53,.35)'; ctx.fillRect(x0, y0, x1 - x0, tebalPx); }
  // bungkus
  if (v.bungkus === 'daun') { ctx.strokeStyle = '#15803d'; ctx.lineWidth = 6; ctx.strokeRect(x0 - 4, y0 - 4, x1 - x0 + 8, tebalPx + 8); }
  else { ctx.strokeStyle = 'rgba(148,163,184,.9)'; ctx.lineWidth = 2; ctx.strokeRect(x0 - 3, y0 - 3, x1 - x0 + 6, tebalPx + 6); if (v.bungkus === 'lubang') { ctx.fillStyle = '#fafaf9'; for (let k = 0; k < 10; k++) ctx.fillRect(x0 + 10 + k * (x1 - x0 - 20) / 9, y0 - 5, 3, 4); } }
  // panas dari tengah
  const panas = jepit((h.tengah - +v.suhu) / 8, 0, 1);
  ctx.fillStyle = `rgba(239,68,68,${0.12 * panas * mulus(p)})`; ctx.beginPath(); ctx.ellipse((x0 + x1) / 2, (y0 + y1) / 2, (x1 - x0) * 0.3, tebalPx * 0.35, 0, 0, 7); ctx.fill();
  label(ctx, 'irisan tempe', (x0 + x1) / 2, y0 - 16, { rata: 'center', ukuran: 10, warna: '#78716c' });
  label(ctx, `tebal ${fx(+v.tebal, 1)} cm · ${BUNGKUS_TEMPE[v.bungkus].nama} · ragi ${fx(+v.ragi, 1)} g/kg`, 12, 16, { ukuran: 10, tebal: true, warna: '#334155', latar: 'rgba(255,255,255,.95)' });
  termometer2(ctx, W * 0.72, 40, 100, +v.suhu + (h.tengah - +v.suhu) * mulus(p), 20, 50, `tengah ${fx(+v.suhu + (h.tengah - +v.suhu) * mulus(p))} °C`, 38);
  const px = W * 0.79;
  label(ctx, `jam ke-${Math.round(+v.lama * mulus(p))}`, px, 46, { ukuran: 12, tebal: true });
  bilahNilai(ctx, px, 80, W * 0.18, h.tutup * mulus(p), 100, h.tutup >= 95 ? '#16a34a' : '#f59e0b', `kapang ${Math.round(h.tutup * mulus(p))}%`);
  if (p >= 1) hasilAkhir(ctx, W, H, `${h.kompak} · ${h.aroma} · tengah ${fx(h.tengah)} °C`, kriteriaTempe(v, h).every(k => k.lulus), h.tutup >= 95);
}

Object.assign(SIM, {
  pengering: { hitung: hitungPengering, kriteria: kriteriaPengering, gambar: gambarPengering, sumbuX: ['ventilasi', 'miring', 'ikan'], sumbuY: ['kadarAir', 'suhu', 'lembap', 'laju'] },
  garam: { hitung: hitungGaram, kriteria: kriteriaGaram, gambar: gambarGaram, sumbuX: ['dalam', 'luas'], sumbuY: ['hari', 'garam', 'laju', 'perHari'] },
  boraks: { hitung: hitungBoraks, kriteria: kriteriaBoraks, gambar: gambarBoraks, sumbuX: ['kunyit', 'kering'], sumbuY: ['palsuPos', 'palsuNeg', 'kekuningan', 'waktu'] },
  nyamuk: { hitung: hitungNyamuk, kriteria: kriteriaNyamuk, gambar: gambarNyamuk, sumbuX: ['ragi', 'gula', 'suhu', 'ganti'], sumbuY: ['tangkap', 'co2', 'lama', 'biaya'] },
  kompos: { hitung: hitungKompos, kriteria: kriteriaKompos, gambar: gambarKompos, sumbuX: ['cokelat', 'air'], sumbuY: ['hari', 'suhu', 'cn', 'oksigen'] },
  sejuk: { hitung: hitungSejuk, kriteria: kriteriaSejuk, gambar: gambarSejuk, sumbuX: ['kipas'], sumbuY: ['terasa', 'suhu', 'co2', 'biaya'] },
  tetes: { hitung: hitungTetes, kriteria: kriteriaTetes, gambar: gambarTetes, sumbuX: ['tinggi', 'lubang'], sumbuY: ['debit', 'tahan', 'terkecil', 'rata'] },
  mangrove: { hitung: hitungMangrove, kriteria: kriteriaMangrove, gambar: gambarMangrove, sumbuX: ['lebar', 'rapat', 'umur'], sumbuY: ['abrasi', 'gelombang', 'karbon', 'biaya'] },
  tempe: { hitung: hitungTempe, kriteria: kriteriaTempe, gambar: gambarTempe, sumbuX: ['suhu', 'lama', 'tebal', 'ragi'], sumbuY: ['tutup', 'tengah'] }
});
