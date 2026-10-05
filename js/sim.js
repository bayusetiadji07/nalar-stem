/* =========================================================
   NalarSTEM — mesin simulasi (model + gambar Canvas 2D)
   Setiap simulasi: hitung(v) → hasil, kriteria(v, hasil) → [{teks, lulus}],
   gambar(ctx, W, H, v, hasil, p) dengan p = kemajuan animasi 0..1
   ========================================================= */

const rp = n => 'Rp ' + Math.round(n).toLocaleString('id-ID');
const bulat = (n, d = 1) => Number(n.toFixed(d));
const fx = (n, d = 1) => String(bulat(n, d)).replace('.', ',');
const lerp = (a, b, t) => a + (b - a) * t;
const jepit = (x, a, b) => Math.max(a, Math.min(b, x));
const mulus = t => t * t * (3 - 2 * t);

function kotakBulat(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function panah(ctx, x1, y1, x2, y2, warna, tebal = 3) {
  const a = Math.atan2(y2 - y1, x2 - x1), k = 7 + tebal;
  ctx.strokeStyle = ctx.fillStyle = warna; ctx.lineWidth = tebal;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * k * 0.6, y2 - Math.sin(a) * k * 0.6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - k * Math.cos(a - 0.45), y2 - k * Math.sin(a - 0.45));
  ctx.lineTo(x2 - k * Math.cos(a + 0.45), y2 - k * Math.sin(a + 0.45));
  ctx.closePath(); ctx.fill();
}
function label(ctx, teks, x, y, opsi = {}) {
  ctx.font = `${opsi.tebal ? '700' : '600'} ${opsi.ukuran || 12}px "Plus Jakarta Sans", system-ui, sans-serif`;
  ctx.textAlign = opsi.rata || 'left';
  ctx.textBaseline = 'middle';
  if (opsi.latar) {
    const w = ctx.measureText(teks).width + 12, h = (opsi.ukuran || 12) + 10;
    const x0 = opsi.rata === 'center' ? x - w / 2 : opsi.rata === 'right' ? x - w : x - 6;
    ctx.fillStyle = opsi.latar; kotakBulat(ctx, x0, y - h / 2, w, h, 6); ctx.fill();
  }
  ctx.fillStyle = opsi.warna || '#0f172a';
  ctx.fillText(teks, x, y);
}

/* ---------- Aset gambar ilustrasi (assets/img/sim) ----------
   Dimuat saat pertama diminta. Selama belum siap / gagal dimuat, fungsi
   mengembalikan null dan simulasi memakai gambar kode seperti biasa. */
const ASET_SIM = {};
const BERKAS_ASET = {
  'bg-perahu': 'jpg', 'bg-penjernih': 'jpg', 'bg-pendingin': 'jpg', 'bg-hidroponik': 'jpg', 'bg-lapangan': 'jpg', 'bg-jembatan': 'jpg', 'bg-angin': 'jpg', 'bg-listrik': 'jpg', 'bg-magnet': 'jpg', 'bg-tambak': 'jpg', 'bg-kelas-gelap': 'jpg', 'bg-pentas': 'jpg'
};
function aset(nama) {
  let a = ASET_SIM[nama];
  if (!a) {
    if (typeof Image === 'undefined') return null;
    const img = new Image();
    a = ASET_SIM[nama] = { img, siap: false };
    img.onload = () => { a.siap = true; if (typeof window !== 'undefined') window.dispatchEvent(new Event('aset-sim')); };
    img.src = `assets/img/sim/${nama}.${BERKAS_ASET[nama] || 'png'}`;
  }
  return a.siap ? a.img : null;
}
// Latar menutupi kanvas; titik gambar pada ketinggian fy (0..1) diletakkan di y kanvas = ty.
function latar(ctx, W, H, nama, fy = 0.5, ty = H / 2) {
  const img = aset(nama);
  if (!img) return false;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  let s = Math.max(W / iw, H / ih);
  if (fy > 0) s = Math.max(s, ty / (fy * ih));
  if (fy < 1) s = Math.max(s, (H - ty) / ((1 - fy) * ih));
  ctx.drawImage(img, (W - iw * s) / 2, ty - fy * ih * s, iw * s, ih * s);
  return true;
}
// Gambar benda dengan titik jangkar (ax, ay) pada posisi (x, y); lebar w (tinggi mengikuti rasio).
function benda(ctx, nama, x, y, w, opsi = {}) {
  const img = aset(nama);
  if (!img) return false;
  const h = w * img.naturalHeight / img.naturalWidth;
  ctx.save(); ctx.translate(x, y);
  if (opsi.rot) ctx.rotate(opsi.rot);
  if (opsi.alpha !== undefined) ctx.globalAlpha = opsi.alpha;
  ctx.drawImage(img, -w * (opsi.ax ?? 0.5), -h * (opsi.ay ?? 0.5), w, h);
  ctx.restore();
  return true;
}

/* ---------------------------------------------------------
   1. PERAHU — Hukum Archimedes
   --------------------------------------------------------- */
const BAHAN_PERAHU = {
  styrofoam: { massa: 0.06, harga: 8, kuat: 0.6, warna: '#f8fafc', garis: '#94a3b8' },
  plastik:   { massa: 0.14, harga: 12, kuat: 1.0, warna: '#93c5fd', garis: '#2563eb' },
  triplek:   { massa: 0.18, harga: 15, kuat: 2.0, warna: '#e2b77a', garis: '#92400e' },
  seng:      { massa: 0.31, harga: 20, kuat: 3.0, warna: '#cbd5e1', garis: '#475569' }
};

function hitungPerahu(v, muatanPaksa) {
  const b = BAHAN_PERAHU[v.bahan];
  const p = +v.panjang, l = +v.lebar, t = +v.tinggi;
  const muatan = muatanPaksa ?? +v.muatan;
  const rho = v.air === 'laut' ? 1.025 : 1.0; // g/cm³
  const luas = p * l + 2 * p * t + 2 * l * t; // cm²
  const massaPerahu = luas * b.massa; // g
  const apung = (p * l * t * rho - massaPerahu) / 1000; // kg saat air setinggi bibir
  const kuat = b.kuat * (p * l) / 100; // kg
  const celup = (massaPerahu + muatan * 1000) / (rho * p * l); // cm
  const bebas = t - celup;
  const rasio = l / t;
  const stabilitas = rasio < 1.5 ? 'Mudah terbalik' : rasio < 2.5 ? 'Cukup' : 'Stabil';
  let status = 'Mengapung';
  if (muatan > kuat) status = 'Patah/retak';
  else if (celup >= t) status = 'Tenggelam';
  else if (rasio < 1 && muatan > 0) status = 'Terbalik';
  else if (bebas < 1) status = 'Hampir kemasukan air';
  const gayaBerat = (massaPerahu / 1000 + muatan) * 9.8;
  return {
    massaPerahu: bulat(massaPerahu, 0),
    kapasitas: bulat(Math.max(0, Math.min(apung, kuat)), 2),
    celup: bulat(Math.min(celup, t), 1),
    bebas: bulat(bebas, 1),
    stabilitas, status,
    biaya: Math.round(luas * b.harga / 100) * 100,
    _apung: apung, _kuat: kuat, _rasio: rasio, _gaya: gayaBerat, _celupAsli: celup, _rho: rho
  };
}

function kriteriaPerahu(v) {
  const h3 = hitungPerahu(v, 3);
  return [
    { teks: 'Muatan 3 kg: lambung bebas ≥ 2 cm', lulus: h3._celupAsli < +v.tinggi && h3.bebas >= 2, nilai: `${h3.bebas} cm` },
    { teks: 'Kuat membawa 3 kg', lulus: h3._kuat >= 3, nilai: `maks ${bulat(h3._kuat, 1)} kg` },
    { teks: 'Stabilitas minimal "cukup"', lulus: h3._rasio >= 1.5, nilai: `rasio ${bulat(h3._rasio, 2)}` },
    { teks: 'Biaya ≤ Rp 30.000', lulus: h3.biaya <= 30000, nilai: rp(h3.biaya) }
  ];
}

function gambarPerahu(ctx, W, H, v, h, p) {
  const b = BAHAN_PERAHU[v.bahan];
  const airY = H * 0.5;
  // langit & air
  const laut = v.air === 'laut';
  const adaLatar = latar(ctx, W, H, 'bg-perahu', 0.5, airY);
  if (adaLatar) {
    if (laut) { ctx.fillStyle = 'rgba(14,116,144,.28)'; ctx.fillRect(0, airY, W, H - airY); } // air laut lebih pekat
  } else {
    ctx.fillStyle = '#e0f2fe'; ctx.fillRect(0, 0, W, airY);
    ctx.fillStyle = laut ? '#0e7490' : '#60a5fa'; ctx.globalAlpha = 0.85;
    ctx.fillRect(0, airY, W, H - airY); ctx.globalAlpha = 1;
  }
  // ombak
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2;
  for (let r = 0; r < 3; r++) {
    ctx.beginPath();
    for (let x = 0; x <= W; x += 8) ctx.lineTo(x, airY + 18 + r * 40 + Math.sin(x / 26 + r + p * 6) * 3);
    ctx.stroke();
  }
  const s = Math.min((W * 0.5) / Math.max(+v.panjang, 30), (H * 0.3) / Math.max(+v.tinggi, 6));
  const bw = +v.panjang * s, bh = +v.tinggi * s;
  const cx = W / 2;
  const tenggelam = h.status === 'Tenggelam';
  const patah = h.status === 'Patah/retak';
  const terbalik = h.status === 'Terbalik';
  let celupPx = Math.min(h._celupAsli, +v.tinggi) * s;
  let dasarY = airY + celupPx;
  const e = mulus(jepit(p * 1.6, 0, 1));
  let y = lerp(airY - 24, dasarY, e);
  if (tenggelam && p > 0.6) y = dasarY + (H - dasarY - 10) * mulus((p - 0.6) / 0.4) * 0.8;
  ctx.save();
  ctx.translate(cx, y);
  if (terbalik && p > 0.55) ctx.rotate(mulus(jepit((p - 0.55) / 0.35, 0, 1)) * 2.4);
  // lambung (trapesium)
  const miring = Math.min(bh * 0.5, bw * 0.12);
  ctx.beginPath();
  ctx.moveTo(-bw / 2 - miring, -bh); ctx.lineTo(bw / 2 + miring, -bh);
  ctx.lineTo(bw / 2, 0); ctx.lineTo(-bw / 2, 0); ctx.closePath();
  ctx.fillStyle = b.warna; ctx.fill();
  ctx.strokeStyle = b.garis; ctx.lineWidth = 2.5; ctx.stroke();
  if (v.bahan === 'triplek') { // serat kayu
    ctx.strokeStyle = 'rgba(146,64,14,.25)'; ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-bw / 2, -bh * i / 4); ctx.lineTo(bw / 2, -bh * i / 4); ctx.stroke(); }
  }
  if (v.bahan === 'seng') {
    ctx.strokeStyle = 'rgba(71,85,105,.3)'; ctx.lineWidth = 1;
    for (let x = -bw / 2 + 6; x < bw / 2; x += 8) { ctx.beginPath(); ctx.moveTo(x, -bh); ctx.lineTo(x, 0); ctx.stroke(); }
  }
  // muatan: karung
  const n = Math.ceil(+v.muatan);
  const kw = Math.min(aset('karung') ? 34 : 26, (bw - 10) / Math.max(1, Math.min(n, 5)));
  for (let i = 0; i < n; i++) {
    const baris = Math.floor(i / 5), kol = i % 5;
    const perBaris = Math.min(5, n - baris * 5);
    const x0 = -perBaris * kw / 2 + kol * kw;
    const y0 = -bh - (baris + 1) * kw * 0.8 + 2;
    if (!benda(ctx, 'karung', x0 + kw / 2, y0 + kw * 0.8 + 1, kw * 1.08, { ay: 1 })) {
      ctx.fillStyle = '#d6b27c'; kotakBulat(ctx, x0 + 1, y0, kw - 2, kw * 0.8, 5); ctx.fill();
      ctx.strokeStyle = '#8b6b3d'; ctx.lineWidth = 1.2; ctx.stroke();
    }
  }
  if (patah && p > 0.5) {
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(4, -bh * 0.35); ctx.lineTo(-4, -bh * 0.6); ctx.lineTo(8, -bh); ctx.stroke();
  }
  ctx.restore();
  // air depan (menutupi bagian tercelup)
  ctx.fillStyle = adaLatar ? 'rgba(13,148,136,.22)' : laut ? 'rgba(14,116,144,.35)' : 'rgba(96,165,250,.35)';
  ctx.fillRect(0, airY, W, H - airY);
  ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, airY); ctx.lineTo(W, airY); ctx.stroke();

  if (p >= 0.62 && !tenggelam && !terbalik) {
    const f = h._gaya;
    const pj = jepit(f * 2, 30, 70);
    panah(ctx, cx + 14, dasarY, cx + 14, dasarY + pj, '#dc2626', 3);
    label(ctx, `Berat ${fx(f)} N`, cx + 22, dasarY + pj - 8, { warna: '#b91c1c', latar: 'rgba(255,255,255,.92)' });
    panah(ctx, cx - 14, dasarY + pj, cx - 14, dasarY, '#16a34a', 3);
    label(ctx, `Gaya apung ${fx(f)} N`, cx - 22, dasarY + pj - 8, { warna: '#15803d', rata: 'right', latar: 'rgba(255,255,255,.92)' });
    // penanda kedalaman celup
    const mx = cx - bw / 2 - 14;
    ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(mx, airY); ctx.lineTo(mx, dasarY); ctx.moveTo(mx - 4, airY); ctx.lineTo(mx + 4, airY); ctx.moveTo(mx - 4, dasarY); ctx.lineTo(mx + 4, dasarY); ctx.stroke();
    label(ctx, `celup ${fx(h._celupAsli)} cm`, mx - 6, (airY + dasarY) / 2 + 12, { rata: 'right', ukuran: 11, latar: 'rgba(255,255,255,.92)' });
  }
  label(ctx, laut ? 'Air laut ρ = 1.025 kg/m³' : 'Air tawar ρ = 1.000 kg/m³', 12, H - 16, { warna: '#fff', ukuran: 12 });
  if (p >= 1) {
    const warna = h.status === 'Mengapung' ? '#15803d' : h.status === 'Hampir kemasukan air' ? '#b45309' : '#b91c1c';
    label(ctx, h.status.toUpperCase(), W / 2, 22, { warna: '#fff', latar: warna, tebal: true, rata: 'center', ukuran: 13 });
  }
}

/* ---------------------------------------------------------
   2. PENJERNIH AIR — filtrasi & adsorpsi
   --------------------------------------------------------- */
const MAT_SARING = {
  kerikil: { nama: 'Kerikil', butir: 4, tebal: 4, warna: '#9ca3af', biaya: 1500 },
  ijuk:    { nama: 'Ijuk', butir: 3, tebal: 3, warna: '#5b3a1e', biaya: 2500 },
  pasir:   { nama: 'Pasir halus', butir: 1, warna: '#e9d5a1', biaya: 400 },
  arang:   { nama: 'Arang', butir: 2, warna: '#1f2937', biaya: 1200 },
  kosong:  { nama: 'kosong', butir: 0, tebal: 0 }
};

function susunanSaring(v) {
  return [v.lapis1, v.lapis2, v.lapis3, v.lapis4].filter(m => m && m !== 'kosong');
}
function tebalLapis(m, v) {
  if (m === 'pasir') return +v.tebalPasir;
  if (m === 'arang') return +v.tebalArang;
  return MAT_SARING[m].tebal;
}

function hitungPenjernih(v) {
  const lapis = susunanSaring(v);
  const tp = +v.tebalPasir, ta = +v.tebalArang;
  let f = 1, fb = 1, kasar = 1, sumbat = 0, tinggi = 0, biaya = 0, tahan = 0;
  for (const m of lapis) {
    const t = tebalLapis(m, v);
    tinggi += t;
    biaya += m === 'pasir' ? 400 * t : m === 'arang' ? 1200 * t : MAT_SARING[m].biaya;
    if (m === 'kerikil') { f *= 0.82; kasar *= 0.4; }
    if (m === 'ijuk') { f *= 0.75; kasar *= 0.3; }
    if (m === 'pasir') { f *= Math.pow(0.86, t); sumbat += kasar; kasar *= 0.1; tahan += 0.07 * t; }
    if (m === 'arang') { f *= Math.pow(0.95, t); fb *= Math.pow(0.72, t); sumbat += kasar * 0.6; kasar *= 0.3; tahan += 0.05 * t; }
  }
  const bawah = lapis[lapis.length - 1];
  const bocor = bawah === 'pasir' ? 20 : bawah === 'arang' ? 12 : 0; // butiran halus ikut terbawa keluar
  let T = 150, bau = 3;
  const n = +v.ulang;
  for (let i = 0; i < n; i++) { T = T * f + bocor * (i === n - 1 ? 1 : 0.5); bau = bau * fb; }
  const debit = lapis.length ? 420 / (1 + tahan) / (1 + 2.2 * sumbat) : 900;
  const waktu = n * 1000 / debit;
  return {
    keruh: bulat(T, 1), bau: bulat(bau, 1), debit: bulat(debit, 0), waktu: bulat(waktu, 1),
    tinggiTotal: tinggi, biaya,
    _lapis: lapis, _bocor: bocor, _sumbat: sumbat
  };
}

function kriteriaPenjernih(v, h) {
  return [
    { teks: 'Kekeruhan ≤ 25 NTU', lulus: h.keruh <= 25, nilai: `${h.keruh} NTU` },
    { teks: 'Bau ≤ 1', lulus: h.bau <= 1, nilai: `${h.bau}` },
    { teks: 'Debit ≥ 60 mL/menit', lulus: h.debit >= 60, nilai: `${h.debit} mL/menit` },
    { teks: 'Biaya ≤ Rp 20.000', lulus: h.biaya <= 20000, nilai: rp(h.biaya) },
    { teks: 'Tinggi lapisan ≤ 30 cm', lulus: h.tinggiTotal <= 30, nilai: `${h.tinggiTotal} cm` }
  ];
}

function warnaKeruh(T) {
  const k = jepit(T / 150, 0, 1);
  return `rgba(${Math.round(lerp(186, 133, k))},${Math.round(lerp(230, 94, k))},${Math.round(lerp(253, 42, k))},${lerp(0.55, 0.95, k)})`;
}

function gambarPenjernih(ctx, W, H, v, h, p) {
  const adaLatar = latar(ctx, W, H, 'bg-penjernih', 0.85, H - 8); // permukaan meja = dasar gelas
  if (!adaLatar) { ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, W, H); }
  const lapis = h._lapis;
  const bx = W / 2 - 55, bw = 110, atas = 58, tinggiBotol = H - 150;
  const skala = tinggiBotol / 34;
  if (adaLatar) { ctx.fillStyle = 'rgba(255,255,255,.55)'; kotakBulat(ctx, bx, atas - 8, bw, tinggiBotol + 10, 10); ctx.fill(); }
  // air kotor di atas
  ctx.fillStyle = warnaKeruh(150);
  const turun = p < 1 ? 1 - p * 0.7 : 0.3;
  ctx.fillRect(bx + 4, atas, bw - 8, 26 * turun + 4);
  // lapisan
  let y = atas + 30;
  lapis.forEach((m, i) => {
    const t = tebalLapis(m, v) * skala;
    const M = MAT_SARING[m];
    ctx.fillStyle = M.warna; ctx.fillRect(bx + 4, y, bw - 8, t);
    // tekstur
    ctx.fillStyle = 'rgba(0,0,0,.18)';
    const rng = (k) => { const s = Math.sin(k * 12.9898 + i * 78.233) * 43758.5453; return s - Math.floor(s); };
    const jumlah = Math.round((bw * t) / (M.butir >= 3 ? 90 : 25));
    for (let k = 0; k < jumlah; k++) {
      const rx = bx + 6 + rng(k) * (bw - 12), ry = y + 2 + rng(k + 0.37) * Math.max(0, t - 4);
      const r = M.butir >= 4 ? 4 : M.butir === 3 ? 1.2 : 1;
      if (m === 'ijuk') { ctx.fillRect(rx - 5, ry, 10, 1); }
      else { ctx.beginPath(); ctx.arc(rx, ry, r, 0, 7); ctx.fill(); }
    }
    label(ctx, `${M.nama} (${tebalLapis(m, v)} cm)`, bx + bw + 14, y + t / 2, { ukuran: 12, warna: '#334155', latar: adaLatar ? 'rgba(255,255,255,.88)' : undefined });
    ctx.strokeStyle = '#cbd5e1'; ctx.beginPath(); ctx.moveTo(bx + bw, y + t / 2); ctx.lineTo(bx + bw + 10, y + t / 2); ctx.stroke();
    y += t;
  });
  // botol
  ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.5;
  kotakBulat(ctx, bx, atas - 8, bw, y - atas + 18, 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bx + bw / 2 - 8, y + 10); ctx.lineTo(bx + bw / 2 - 8, y + 20);
  ctx.moveTo(bx + bw / 2 + 8, y + 10); ctx.lineTo(bx + bw / 2 + 8, y + 20); ctx.stroke();
  // tetesan
  const gy = H - 70;
  if (p > 0.1 && p < 1) {
    ctx.fillStyle = warnaKeruh(h.keruh);
    for (let i = 0; i < 3; i++) {
      const fase = ((p * 6 + i / 3) % 1);
      const ty = lerp(y + 22, gy, fase);
      ctx.beginPath(); ctx.arc(W / 2, ty, 3.5, 0, 7); ctx.fill();
    }
  }
  // gelas hasil
  const isi = mulus(jepit((p - 0.15) / 0.85, 0, 1));
  if (adaLatar) { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(W / 2 - 34, gy, 68, 62); }
  ctx.fillStyle = warnaKeruh(h.keruh);
  ctx.fillRect(W / 2 - 34, gy + 60 - 56 * isi, 68, 56 * isi);
  ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(W / 2 - 36, gy); ctx.lineTo(W / 2 - 34, gy + 62); ctx.lineTo(W / 2 + 34, gy + 62); ctx.lineTo(W / 2 + 36, gy); ctx.stroke();
  // bau
  if (p >= 1 && h.bau > 1) {
    ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 2;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      for (let k = 0; k < 20; k++) ctx.lineTo(W / 2 + i * 16 + Math.sin(k / 3) * 4, gy - 4 - k * 1.3);
      ctx.stroke();
    }
  }
  label(ctx, 'Air sungai 150 NTU', bx - 12, atas + 12, { rata: 'right', ukuran: 12, warna: '#78350f', latar: adaLatar ? 'rgba(255,255,255,.88)' : undefined });
  if (p >= 1) {
    label(ctx, `${String(h.keruh).replace('.', ',')} NTU · ${h.debit} mL/menit`, W / 2 - 50, gy + 30, { rata: 'right', ukuran: 12, latar: '#fff', warna: '#0f172a' });
    if (h._bocor) label(ctx, h._bocor === 20 ? 'Butir pasir ikut keluar!' : 'Serbuk arang ikut keluar!', W / 2 + 50, gy + 30, { ukuran: 12, latar: '#fee2e2', warna: '#b91c1c' });
    if (h._sumbat > 0.5) label(ctx, 'Lapisan halus tersumbat kotoran kasar', W / 2, 24, { rata: 'center', ukuran: 12, latar: '#fef3c7', warna: '#92400e' });
  }
}

/* ---------------------------------------------------------
   3. KOTAK PENDINGIN — perpindahan kalor
   --------------------------------------------------------- */
const BAHAN_DINGIN = {
  styrofoam: { k: 0.033, rho: 20, harga: 7000, dasar: 0, massaDasar: 0, warna: '#f1f5f9' },
  sekam:     { k: 0.05, rho: 110, harga: 1500, dasar: 15000, massaDasar: 2.0, warna: '#d9b36c' },
  kardus:    { k: 0.065, rho: 120, harga: 2500, dasar: 0, massaDasar: 0, warna: '#c8a26b' },
  kayu:      { k: 0.13, rho: 550, harga: 9000, dasar: 0, massaDasar: 0, warna: '#a16207' }
};
const L_ES = 334000;

function hitungPendingin(v) {
  const b = BAHAN_DINGIN[v.bahan];
  const t = +v.tebal / 100; // m
  const A = 0.42;
  const U = 1 / (t / b.k + 0.15);
  const rad = { putih: 1, cokelat: 4, hitam: 7 }[v.warna];
  const pKond = A * U * (+v.suhu + rad);
  const pKonv = v.tutup === 'celah' ? 0.5 * +v.suhu : 0;
  const P = pKond + pKonv;
  const tahan = (+v.es * L_ES) / P / 3600;
  const volDinding = (0.4 + 2 * t) * (0.3 + 2 * t) * (0.3 + 2 * t) - 0.036;
  const massa = volDinding * b.rho + b.massaDasar;
  const biaya = b.harga * +v.tebal + b.dasar + (v.tutup === 'rapat' ? 5000 : 0) + (v.warna === 'cokelat' ? 0 : 3000);
  return {
    laju: bulat(P, 1), tahan: bulat(tahan, 1), massaKotak: bulat(massa, 1), biaya,
    _kond: pKond, _konv: pKonv, _rad: rad
  };
}

function kriteriaPendingin(v, h) {
  return [
    { teks: 'Es bertahan ≥ 12 jam', lulus: h.tahan >= 12, nilai: `${h.tahan} jam` },
    { teks: 'Massa kotak ≤ 5 kg', lulus: h.massaKotak <= 5, nilai: `${h.massaKotak} kg` },
    { teks: 'Biaya ≤ Rp 60.000', lulus: h.biaya <= 60000, nilai: rp(h.biaya) }
  ];
}

function gambarPendingin(ctx, W, H, v, h, p) {
  const adaLatar = latar(ctx, W, H, 'bg-pendingin', 0.8, H - 57); // lantai dek = dasar kotak
  if (!adaLatar) { ctx.fillStyle = '#fff7ed'; ctx.fillRect(0, 0, W, H); }
  const b = BAHAN_DINGIN[v.bahan];
  const jamSim = Math.min(24, h.tahan * 1.15) * p;
  const sisa = Math.max(0, 1 - jamSim / h.tahan);
  // matahari (sudah ada di gambar latar)
  if (!adaLatar) {
  ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(W - 48, 42, 20, 0, 7); ctx.fill();
  ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(W - 48 + Math.cos(a) * 26, 42 + Math.sin(a) * 26); ctx.lineTo(W - 48 + Math.cos(a) * 34, 42 + Math.sin(a) * 34); ctx.stroke(); }
  }
  label(ctx, `Udara ${v.suhu} °C`, W - 48, 86, { rata: 'center', ukuran: 12, warna: '#9a3412', latar: adaLatar ? 'rgba(255,255,255,.9)' : undefined });
  // kotak
  const lebar = Math.min(W * 0.44, 260), tinggi = 150;
  const x = W * 0.3 - lebar / 2 + 30, y = H - tinggi - 60;
  const tb = 4 + +v.tebal * 3.2;
  const warnaLuar = { putih: '#f8fafc', cokelat: '#b45309', hitam: '#1f2937' }[v.warna];
  ctx.fillStyle = warnaLuar; ctx.fillRect(x - 3, y - 3, lebar + 6, tinggi + 6);
  ctx.fillStyle = b.warna; ctx.fillRect(x, y, lebar, tinggi);
  if (v.bahan === 'sekam') {
    ctx.fillStyle = 'rgba(120,53,15,.35)';
    for (let i = 0; i < 160; i++) { const rx = x + ((i * 37) % lebar), ry = y + ((i * 53) % tinggi); ctx.fillRect(rx, ry, 3, 1.5); }
  }
  ctx.fillStyle = '#e0f2fe'; ctx.fillRect(x + tb, y + tb, lebar - 2 * tb, tinggi - 2 * tb);
  // tutup
  const celah = v.tutup === 'celah' ? 8 : 0;
  ctx.fillStyle = warnaLuar; ctx.fillRect(x - 6, y - 16 - celah, lebar + 12, 13);
  if (celah) {
    ctx.fillStyle = 'rgba(56,189,248,.8)';
    for (let i = 0; i < 3; i++) { const fx = ((p * 3 + i / 3) % 1); ctx.beginPath(); ctx.arc(x + lebar * 0.2 + i * lebar * 0.3, y - 6 - fx * 22, 3, 0, 7); ctx.fill(); }
  }
  // es & ikan
  const dalamX = x + tb + 8, dalamW = lebar - 2 * tb - 16, dasar = y + tinggi - tb - 6;
  if (!benda(ctx, 'ikan', dalamX + dalamW * 0.5, dasar - 2, dalamW * 0.7, { ay: 1 })) {
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath(); ctx.ellipse(dalamX + dalamW * 0.5, dasar - 12, dalamW * 0.28, 9, 0, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.moveTo(dalamX + dalamW * 0.78, dasar - 12); ctx.lineTo(dalamX + dalamW * 0.9, dasar - 20); ctx.lineTo(dalamX + dalamW * 0.9, dasar - 4); ctx.fill();
  }
  const nEs = Math.ceil(+v.es * 2);
  for (let i = 0; i < nEs; i++) {
    const s = 16 * Math.sqrt(sisa);
    if (s < 1) break;
    const ex = dalamX + (i % 6) * (dalamW / 6) + 4, ey = dasar - 30 - Math.floor(i / 6) * 18 - s;
    if (!benda(ctx, 'es-batu', ex + s / 2, ey + 16, s * 1.2, { ay: 1 })) {
      ctx.fillStyle = 'rgba(186,230,253,.95)'; kotakBulat(ctx, ex, ey + (16 - s), s, s, 3); ctx.fill();
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1; ctx.stroke();
    }
  }
  // genangan air lelehan
  ctx.fillStyle = 'rgba(56,189,248,.35)';
  ctx.fillRect(x + tb, dasar + 6 - (1 - sisa) * 14, lebar - 2 * tb, (1 - sisa) * 14);
  // panah kalor
  const tebalP = jepit(h.laju / 8, 1.5, 8);
  panah(ctx, x - 50, y + tinggi / 2, x - 6, y + tinggi / 2, '#ef4444', tebalP);
  panah(ctx, x + lebar + 50, y + tinggi / 2, x + lebar + 6, y + tinggi / 2, '#ef4444', tebalP);
  if (p > 0) label(ctx, `Kalor masuk ${fx(h.laju)} W`, x + lebar / 2, y - 34 - celah, { rata: 'center', ukuran: 12, latar: '#fee2e2', warna: '#b91c1c' });
  // grafik massa es vs waktu
  const gx = W * 0.62, gy = 120, gw = W * 0.34, gh = H - 200;
  if (adaLatar) { ctx.fillStyle = 'rgba(255,255,255,.88)'; kotakBulat(ctx, gx - 12, gy - 26, gw + 24, gh + 70, 12); ctx.fill(); }
  ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
  ctx.strokeRect(gx, gy, gw, gh);
  const x12 = gx + gw * 12 / 24;
  ctx.setLineDash([4, 4]); ctx.strokeStyle = '#16a34a';
  ctx.beginPath(); ctx.moveTo(x12, gy); ctx.lineTo(x12, gy + gh); ctx.stroke(); ctx.setLineDash([]);
  label(ctx, '12 jam', x12, gy + gh + 12, { rata: 'center', ukuran: 11, warna: '#15803d' });
  label(ctx, 'Massa es', gx, gy - 12, { ukuran: 11, warna: '#475569' });
  label(ctx, '24 jam', gx + gw, gy + gh + 12, { rata: 'right', ukuran: 11, warna: '#475569' });
  ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 2.5; ctx.beginPath();
  const akhir = jamSim;
  for (let j = 0; j <= akhir; j += 0.25) {
    const m = Math.max(0, 1 - j / h.tahan);
    ctx.lineTo(gx + gw * j / 24, gy + gh * (1 - m));
  }
  ctx.stroke();
  label(ctx, `Jam ke-${fx(jamSim)}`, gx + gw / 2, gy + gh + 30, { rata: 'center', ukuran: 13, tebal: true });
  if (p >= 1) {
    const ok = h.tahan >= 12;
    label(ctx, ok ? `Es bertahan ${fx(h.tahan)} jam` : `Es habis setelah ${fx(h.tahan)} jam`, W / 2, 22, { rata: 'center', tebal: true, ukuran: 13, warna: '#fff', latar: ok ? '#15803d' : '#b91c1c' });
  }
}

/* ---------------------------------------------------------
   4. HIDROPONIK — fotosintesis & faktor pembatas
   --------------------------------------------------------- */
const CO2_PPM = { rendah: 250, normal: 420, tinggi: 800 };
const WARNA_LED = { merahbiru: 1.0, putih: 0.85, hijau: 0.45 };

function hitungHidroponik(v) {
  const I = +v.cahaya / 100, jam = +v.jam, T = +v.suhu, N = +v.nutrisi;
  const Ieff = I * WARNA_LED[v.warnaLed];
  const fI = Math.min(1.05, Ieff / (Ieff + 0.25) * 1.25);
  const C = CO2_PPM[v.co2];
  const fC = C / (C + 200) / 0.8;
  const fN = N < 1000 ? 0.15 + 0.85 * N / 1000 : N <= 1400 ? 1 : Math.max(0.1, 1 - (N - 1400) / 700);
  const fT = Math.exp(-Math.pow((T - 26) / 7, 2));
  const fD = jam <= 16 ? jam / 14 : 16 / 14 - (jam - 16) * 0.08;
  const faktor = { 'Cahaya': fI, 'CO₂': fC, 'Nutrisi': fN, 'Suhu': fT, 'Lama penyinaran': fD };
  const P = Math.min(fI, fC, fN) * fT * fD;
  const pembatas = Object.entries(faktor).sort((a, b) => a[1] - b[1])[0][0];
  const massa = Math.min(350, 3.5 * Math.exp(0.2 * P * 21));
  let kondisi = 'Sehat';
  if (T > 35) kondisi = 'Layu (terlalu panas)';
  else if (N > 1600) kondisi = 'Layu (larutan terlalu pekat)';
  else if (N < 300) kondisi = 'Kuning pucat (kurang hara)';
  else if (jam > 18) kondisi = 'Stres (kurang waktu gelap)';
  else if (T < 16) kondisi = 'Tumbuh lambat (terlalu dingin)';
  else if (fI < 0.5) kondisi = 'Pucat memanjang (kurang cahaya)';
  const biaya = 0.05 * I * jam * 21 * 1500;
  return {
    laju: bulat(P * 100, 0), pembatas, massa: bulat(massa, 0), kondisi, biaya: Math.round(biaya / 50) * 50,
    _f: faktor, _P: P
  };
}

function kriteriaHidroponik(v, h) {
  return [
    { teks: 'Massa sawi ≥ 100 g', lulus: h.massa >= 100, nilai: `${h.massa} g` },
    { teks: 'Daun sehat', lulus: h.kondisi === 'Sehat', nilai: h.kondisi },
    { teks: 'Biaya listrik ≤ Rp 15.000', lulus: h.biaya <= 15000, nilai: rp(h.biaya) }
  ];
}

function gambarHidroponik(ctx, W, H, v, h, p) {
  const adaLatar = latar(ctx, W, H, 'bg-hidroponik', 0.8, H - 30); // permukaan meja = dasar tangki
  if (!adaLatar) { ctx.fillStyle = '#f0fdf4'; ctx.fillRect(0, 0, W, H); }
  const warnaCahaya = { merahbiru: 'rgba(217,70,239,', putih: 'rgba(253,224,71,', hijau: 'rgba(74,222,128,' }[v.warnaLed];
  const I = +v.cahaya / 100;
  const cx = W * 0.36;
  const sp = Math.min(150, W * 0.3);
  // lampu
  ctx.fillStyle = '#334155'; kotakBulat(ctx, cx - sp * 0.6, 18, sp * 1.2, 16, 6); ctx.fill();
  ctx.fillStyle = warnaCahaya + (0.12 + 0.3 * I) + ')';
  ctx.beginPath(); ctx.moveTo(cx - sp * 0.57, 34); ctx.lineTo(cx + sp * 0.57, 34); ctx.lineTo(cx + sp, H - 90); ctx.lineTo(cx - sp, H - 90); ctx.closePath(); ctx.fill();
  // tangki nutrisi
  const tY = H - 90;
  ctx.fillStyle = `rgba(56,189,248,${0.35 + Math.min(0.4, +v.nutrisi / 4000)})`; ctx.fillRect(cx - sp, tY, sp * 2, 60);
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.strokeRect(cx - sp, tY, sp * 2, 60);
  // tanaman
  const hari = Math.round(21 * p);
  const m = 3.5 * Math.exp(0.2 * h._P * hari);
  const skala = jepit(Math.cbrt(Math.min(m, 350)) / Math.cbrt(350), 0.12, 1);
  const layu = h.kondisi.startsWith('Layu') || h.kondisi.startsWith('Kuning');
  const warnaDaun = layu ? '#a3a33a' : h.kondisi.startsWith('Pucat') ? '#86efac' : '#16a34a';
  const tahap = Math.min(5, Math.max(1, Math.ceil(skala * 5)));
  const namaSawi = layu ? 'sawi-layu' : `sawi-${tahap}`;
  const pucat = h.kondisi.startsWith('Pucat') || h.kondisi.startsWith('Kuning');
  [-sp * 0.55, 0, sp * 0.55].forEach((dx, i) => {
    const px = cx + dx, py = tY;
    if (aset(namaSawi)) {
      ctx.save();
      if (pucat) ctx.filter = 'saturate(0.45) brightness(1.12)';
      if (layu) benda(ctx, 'sawi-layu', px, py + 6, sp * (0.35 + 0.45 * skala), { ay: 0.95 });
      else benda(ctx, namaSawi, px, py - 4, sp * 0.95, { ay: 0.62 }); // bibir pot di tutup tangki
      ctx.restore();
      return;
    }
    ctx.fillStyle = '#e2e8f0'; ctx.fillRect(px - 14, py - 8, 28, 12);
    ctx.strokeStyle = '#e7e5e4'; ctx.lineWidth = 1.5;
    for (let a = 0; a < 5; a++) { ctx.beginPath(); ctx.moveTo(px - 6 + a * 3, py + 4); ctx.quadraticCurveTo(px - 10 + a * 5, py + 30, px - 4 + a * 2, py + 48 * skala + 8); ctx.stroke(); }
    const tinggiBtg = 16 + 110 * skala * (h.kondisi.startsWith('Pucat') ? 1.25 : 1);
    ctx.strokeStyle = '#65a30d'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(px, py - 8); ctx.lineTo(px, py - 8 - tinggiBtg * 0.6); ctx.stroke();
    const nDaun = 3 + Math.round(5 * skala);
    for (let k = 0; k < nDaun; k++) {
      const ang = (k / nDaun) * Math.PI - Math.PI / 2 + (layu ? 0.5 : 0) + Math.sin(k + i) * 0.1;
      const kiri = k % 2 ? 1 : -1;
      const pd = (20 + 60 * skala) * Math.min(1, sp / 150), ld = (8 + 22 * skala) * Math.min(1, sp / 150);
      ctx.save(); ctx.translate(px, py - 10 - tinggiBtg * (0.2 + 0.4 * k / nDaun));
      ctx.rotate(kiri * (0.5 + 0.6 * k / nDaun) + (layu ? kiri * 0.6 : 0));
      ctx.fillStyle = warnaDaun; ctx.beginPath(); ctx.ellipse(0, -pd / 2, ld / 2, pd / 2, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -pd); ctx.stroke();
      ctx.restore();
      void ang;
    }
  });
  // CO2 & O2
  const nCO2 = { rendah: 6, normal: 11, tinggi: 20 }[v.co2];
  for (let i = 0; i < nCO2; i++) {
    const x = cx - sp + ((i * 71 + p * 120) % (sp * 2)), y = 60 + ((i * 47) % (H - 170));
    label(ctx, 'CO₂', x, y, { ukuran: 10, warna: 'rgba(71,85,105,.7)' });
  }
  // panel faktor
  const gx = W * 0.68, gw = W * 0.28;
  if (adaLatar) { ctx.fillStyle = 'rgba(255,255,255,.88)'; kotakBulat(ctx, gx - 10, 8, gw + 20, 5 * 34 + 70, 12); ctx.fill(); }
  label(ctx, 'Faktor (1 = optimal)', gx, 22, { ukuran: 12, tebal: true, warna: '#14532d' });
  Object.entries(h._f).forEach(([nama, nilai], i) => {
    const y = 48 + i * 34;
    label(ctx, nama, gx, y, { ukuran: 11, warna: '#334155' });
    ctx.fillStyle = '#e2e8f0'; kotakBulat(ctx, gx, y + 9, gw, 10, 5); ctx.fill();
    ctx.fillStyle = nama === h.pembatas ? '#dc2626' : '#16a34a';
    kotakBulat(ctx, gx, y + 9, gw * jepit(nilai, 0.02, 1.1) / 1.1, 10, 5); ctx.fill();
  });
  label(ctx, `Pembatas: ${h.pembatas}`, gx, 48 + 5 * 34 + 6, { ukuran: 12, latar: '#fee2e2', warna: '#b91c1c' });
  label(ctx, `Hari ke-${hari} · ${Math.round(Math.min(m, 350))} g`, cx, H - 14, { rata: 'center', ukuran: 13, tebal: true, warna: '#14532d', latar: adaLatar ? 'rgba(255,255,255,.9)' : undefined });
  if (p >= 1) {
    const ok = h.massa >= 100 && h.kondisi === 'Sehat';
    label(ctx, ok ? 'SIAP PANEN!' : 'Belum memenuhi target', cx, 50, { rata: 'center', ukuran: 13, tebal: true, warna: '#fff', latar: ok ? '#15803d' : '#b45309' });
  }
}

/* ---------------------------------------------------------
   5. ROKET CUKA & SODA KUE — perubahan kimia, pereaksi pembatas
   --------------------------------------------------------- */
const RT_28C = 24.7; // L·atm/mol pada ± 28 °C

// Jenis cuka: kadar asam asetat dan harga per mL larutan yang dimasukkan ke botol.
// Cuka 20% (botol 125 mL di pasaran, Rp 4.000 = Rp 32/mL) → label menyarankan 5 mL cuka + 20 mL air (≈ 4%).
const JENIS_CUKA = {
  dapur: { kadar: 0.05, harga: 20, aman: true },
  encer: { kadar: 0.025, harga: 10, aman: true },
  pekat20encer: { kadar: 0.04, harga: 6.4, aman: true },
  pekat20: { kadar: 0.20, harga: 32, aman: false }
};
function hitungRoket(v) {
  const cuka = +v.cuka, soda = +v.soda, botol = +v.botol;
  const J = JENIS_CUKA[v.kadar] || JENIS_CUKA.dapur, kadar = J.kadar;
  const nAsam = cuka * kadar / 60;   // massa jenis cuka ≈ 1 g/mL, Mr asam asetat 60
  const nSoda = soda / 84;           // Mr NaHCO3 84
  const n = Math.min(nAsam, nSoda);
  let pembatas, sisa, terbuang;
  if (Math.abs(nAsam - nSoda) / Math.max(nAsam, nSoda) < 0.02) { pembatas = 'Pas (seimbang)'; sisa = 'Hampir tidak ada'; terbuang = 0; }
  else if (nSoda > nAsam) {
    const g = (nSoda - n) * 84; terbuang = g / soda * 100;
    pembatas = 'Cuka'; sisa = `Soda kue ${fx(g)} g (${Math.round(terbuang)}%)`;
  } else {
    const ml = (nAsam - n) * 60 / kadar; terbuang = ml / cuka * 100;
    pembatas = 'Soda kue'; sisa = `Cuka ${Math.round(ml)} mL (${Math.round(terbuang)}%)`;
  }
  const isi = cuka / botol;
  const meluap = isi > 0.45;
  const nEfektif = n * (v.bungkus === 'tisu' ? 0.9 : 0.6) * (meluap ? 0.5 : 1);
  const ruangGas = Math.max(0.02, (botol - cuka) / 1000); // L
  const pTolok = Math.max(0, nEfektif * RT_28C / ruangGas - 1) * 1.013; // bar
  const pLepas = Math.min(pTolok, 3.5); // sumbat terlepas sendiri ± 3,5 bar
  const faktorIsi = Math.min(1, isi / 0.25) * (isi > 0.5 ? 0.6 : 1);
  const energi = 0.05 * pLepas * 1e5 * (ruangGas / 1000) * faktorIsi; // J (efisiensi ± 5%)
  const massa = (botol === 1500 ? 0.045 : 0.025) + 0.05;
  const v0 = Math.sqrt(2 * energi / massa);
  const th = +v.sudut * Math.PI / 180;
  const tinggi = v0 * v0 * Math.sin(th) ** 2 / (2 * 9.8) * 0.6;   // 0,6 = hambatan udara
  const jarak = Math.max(0, v0 * v0 * Math.sin(2 * th) / 9.8 * 0.6);
  return {
    gas: bulat(n * RT_28C, 2), pembatas, sisa, tekanan: bulat(pLepas, 2), kecepatan: bulat(v0, 1),
    tinggi: bulat(tinggi, 1), jarak: bulat(jarak, 1), biaya: Math.round((cuka * J.harga + soda * 100) / 100) * 100,
    _terbuang: terbuang, _meluap: meluap, _isi: isi
  };
}

function kriteriaRoket(v, h) {
  return [
    { teks: 'Mendarat di zona 15–25 m', lulus: h.jarak >= 15 && h.jarak <= 25, nilai: `${h.jarak} m` },
    { teks: 'Pereaksi terbuang ≤ 20%', lulus: h._terbuang <= 20, nilai: h.sisa },
    { teks: 'Busa tidak meluap', lulus: !h._meluap, nilai: `botol terisi ${Math.round(h._isi * 100)}%` },
    { teks: 'Biaya ≤ Rp 10.000', lulus: h.biaya <= 10000, nilai: rp(h.biaya) },
    { teks: 'Cuka aman dipakai (kadar ≤ 5%)', lulus: (JENIS_CUKA[v.kadar] || JENIS_CUKA.dapur).aman, nilai: `${Math.round((JENIS_CUKA[v.kadar] || JENIS_CUKA.dapur).kadar * 100)}%${(JENIS_CUKA[v.kadar] || {}).aman === false ? ' — encerkan dulu!' : ''}` }
  ];
}

function gambarBentukRoket(ctx, x, y, rot, skala = 1, nama = 'roket-cuka') {
  // gambar AI bila tersedia (ujung atas di y-26, sirip di y+18, sama dengan bentuk kode)
  if (benda(ctx, nama, x, y, 28 * skala, { rot, ay: 0.58 })) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(skala, skala);
  ctx.fillStyle = '#7c3aed';
  ctx.beginPath(); ctx.moveTo(-7, 10); ctx.lineTo(-13, 18); ctx.lineTo(-7, 16); ctx.fill();
  ctx.beginPath(); ctx.moveTo(7, 10); ctx.lineTo(13, 18); ctx.lineTo(7, 16); ctx.fill();
  ctx.fillStyle = 'rgba(219,234,254,.95)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.2;
  kotakBulat(ctx, -7, -14, 14, 32, 4); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(-7, -14); ctx.lineTo(0, -26); ctx.lineTo(7, -14); ctx.closePath(); ctx.fill();
  ctx.restore();
}

function gambarRoket(ctx, W, H, v, h, p) {
  const tanah = H - 34, x0 = 34;
  const adaLatar = latar(ctx, W, H, 'bg-lapangan', 0.9, tanah);
  if (!adaLatar) { ctx.fillStyle = '#eef2ff'; ctx.fillRect(0, 0, W, H); }
  const s = Math.min((W - x0 - 16) / 32, (tanah - 40) / Math.max(10, h.tinggi * 1.15));
  const X = m => x0 + m * s, Y = m => tanah - m * s;
  ctx.fillStyle = adaLatar ? 'rgba(134,239,172,.55)' : '#86efac'; ctx.fillRect(0, tanah, W, H - tanah);
  // zona target & pagar
  ctx.fillStyle = 'rgba(22,163,74,.22)'; ctx.fillRect(X(15), tanah - 6, X(25) - X(15), 10);
  label(ctx, 'Zona target', (X(15) + X(25)) / 2, tanah - 16, { rata: 'center', ukuran: 11, warna: '#15803d' });
  ctx.strokeStyle = '#78716c'; ctx.lineWidth = 2;
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(X(27) + k * 5, tanah); ctx.lineTo(X(27) + k * 5, tanah - 22); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(X(27) - 2, tanah - 16); ctx.lineTo(X(27) + 17, tanah - 16); ctx.stroke();
  ctx.fillStyle = '#166534';
  for (let m = 0; m <= 30; m += 5) {
    ctx.fillRect(X(m) - 0.5, tanah, 1, 6);
    label(ctx, `${m} m`, X(m), tanah + 16, { rata: 'center', ukuran: 10, warna: '#14532d' });
  }
  const th = +v.sudut * Math.PI / 180;
  // peluncur
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x0 - 12, tanah); ctx.lineTo(x0, tanah - 12); ctx.lineTo(x0 + 12, tanah); ctx.stroke();
  const fase = 0.3;
  if (p < fase) {
    const q = p / fase;
    const rot = Math.PI / 2 - th;
    gambarBentukRoket(ctx, x0, tanah - 26, rot);
    // cuka di dalam botol & gelembung reaksi
    ctx.save(); ctx.translate(x0, tanah - 26); ctx.rotate(rot);
    ctx.fillStyle = 'rgba(250,204,21,.55)';
    const tinggiCair = Math.min(30, 32 * h._isi);
    ctx.fillRect(-6, 17 - tinggiCair, 12, tinggiCair);
    ctx.fillStyle = 'rgba(255,255,255,.95)';
    for (let i = 0; i < 6; i++) { const bx = -4 + ((i * 37) % 9), by = 16 - ((q * 60 + i * 9) % Math.max(4, tinggiCair)); ctx.beginPath(); ctx.arc(bx, by, 1.4, 0, 7); ctx.fill(); }
    ctx.restore();
    if (h._meluap && q > 0.3) {
      ctx.fillStyle = 'rgba(255,255,255,.9)';
      for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(x0 - 10 + i * 3, tanah - 50 - Math.sin(i) * 4 - q * 6, 4, 0, 7); ctx.fill(); }
      label(ctx, 'Busa meluap! Gas banyak terbuang', x0 + 20, tanah - 64, { ukuran: 11, latar: '#fef3c7', warna: '#92400e' });
    }
    label(ctx, `Tekanan ${fx(h.tekanan * q)} bar`, x0 + 22, tanah - 36, { ukuran: 12, latar: 'rgba(255,255,255,.95)', warna: '#6d28d9', tebal: true });
    return;
  }
  const u = Math.min(1, (p - fase) / (1 - fase));
  const pos = t => ({ x: h.jarak * t, y: 4 * h.tinggi * t * (1 - t) });
  // jejak lintasan
  ctx.strokeStyle = 'rgba(124,58,237,.45)'; ctx.setLineDash([4, 5]); ctx.lineWidth = 2;
  ctx.beginPath();
  for (let t = 0; t <= u; t += 0.01) { const q = pos(t); ctx.lineTo(X(q.x), Y(q.y)); }
  ctx.stroke(); ctx.setLineDash([]);
  const q = pos(u);
  const vx = h.jarak * s, vy = -4 * h.tinggi * (1 - 2 * u) * s;
  const rot = u >= 1 ? Math.PI / 2 + (h.jarak > 0.5 ? 0.9 : Math.PI / 2) : Math.atan2(vy, vx || 0.0001) + Math.PI / 2;
  gambarBentukRoket(ctx, X(q.x), Math.min(Y(q.y) - 12, tanah - 12), rot);
  if (u < 0.15 && h.tinggi > 0.3) { // semburan cairan
    ctx.fillStyle = 'rgba(250,204,21,.7)';
    for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(x0 - Math.cos(th) * (6 + i * 5), tanah - 14 + Math.sin(th) * (6 + i * 5), 2.5, 0, 7); ctx.fill(); }
  }
  if (p >= 1) {
    const kena = h.jarak >= 15 && h.jarak <= 25;
    const teks = h.jarak > 25 ? `Melewati pagar! (${fx(h.jarak)} m)` : `Mendarat di ${fx(h.jarak)} m · tinggi maks ${fx(h.tinggi)} m`;
    label(ctx, teks, W / 2, 22, { rata: 'center', tebal: true, ukuran: 13, warna: '#fff', latar: kena ? '#15803d' : '#b45309' });
  }
}

/* ---------------------------------------------------------
   6. ROKET AIR — tekanan gas, semburan air, aksi-reaksi
   Integrasi numerik: udara memuai adiabatik (γ = 1,4), semburan air
   lewat mulut botol Ø 21 mm, hambatan udara, dan gravitasi.
   --------------------------------------------------------- */
function hitungRoketAir(v) {
  const PATM = 101325, RHO = 1000, g = 9.8;
  const botol = +v.botol;
  const Vb = botol / 1e6;
  const Vw0 = Math.min(+v.air, botol * 0.9) / 1e6;
  const A = Math.PI * 0.0105 ** 2;
  const tanpaSirip = v.stabil === 'tanpa', kerucut = v.stabil === 'kerucut';
  const mKering = (botol === 1500 ? 0.09 : 0.06) + (tanpaSirip ? 0 : 0.012) + (kerucut ? 0.02 : 0);
  const Adepan = Math.PI * (botol === 1500 ? 0.045 : 0.0325) ** 2;
  const Cd = tanpaSirip ? 1.4 : kerucut ? 0.4 : 0.6;
  const th = +v.sudut * Math.PI / 180;
  const Va0 = Vb - Vw0, P0 = +v.tekanan * 1e5 + PATM;
  let Va = Va0, P = P0, mw = Vw0 * RHO;
  let x = 0, y = 0, vx = 0, vy = 0, t = 0, tDorong = 0, vMaks = 0, yMaks = 0, lepas = false;
  const dt = 0.0005, jalur = [[0, 0, 0]];
  while (t < 30) {
    const laju = Math.hypot(vx, vy);
    const diRel = Math.hypot(x, y) < 0.5; // rel peluncur 0,5 m
    const ux = diRel || laju < 1 ? Math.cos(th) : vx / laju, uy = diRel || laju < 1 ? Math.sin(th) : vy / laju;
    let F = 0;
    if (mw > 0 && P > PATM) {                 // fase semburan air
      const ve = Math.sqrt(2 * (P - PATM) / RHO);
      F = 2 * A * (P - PATM);
      const dm = Math.min(mw, RHO * A * ve * dt);
      mw -= dm; Va += dm / RHO; P = P0 * Math.pow(Va0 / Va, 1.4); tDorong = t;
    } else if (P > PATM * 1.02) {              // sisa udara bertekanan menyembur singkat
      F = A * (P - PATM); P -= (P - PATM) * dt * 120; // massa udara hanya beberapa gram → dorongan singkat
    }
    const m = mKering + Math.max(mw, 0);
    const hambat = 0.5 * 1.2 * Cd * Adepan * laju * laju;
    const ax = (F * ux - (laju ? hambat * vx / laju : 0)) / m;
    let ay = (F * uy - (laju ? hambat * vy / laju : 0)) / m - g;
    if (!lepas && y <= 0 && ay < 0) ay = 0;     // belum cukup kuat untuk terangkat
    vx += ax * dt; vy += ay * dt; x += vx * dt; y += vy * dt; t += dt;
    if (y > 0.01) lepas = true;
    vMaks = Math.max(vMaks, Math.hypot(vx, vy)); yMaks = Math.max(yMaks, y);
    if (Math.round(t / dt) % 40 === 0) jalur.push([x, Math.max(0, y), t]);
    if (lepas && y <= 0) break;
    if (!lepas && F === 0 && t > 0.2) break;  // tidak pernah terangkat
  }
  jalur.push([x, 0, t]);
  const aman = +v.tekanan <= 4;
  return {
    kecepatan: bulat(vMaks, 1), dorong: bulat(tDorong, 2), tinggi: bulat(yMaks, 1), jarak: bulat(Math.max(0, x), 1),
    waktu: bulat(t, 1), stabilitas: tanpaSirip ? 'Berputar (tidak stabil)' : kerucut ? 'Sangat stabil' : 'Stabil',
    keamanan: aman ? 'Aman (≤ 4 bar)' : 'MELEBIHI batas aman',
    _jalur: jalur, _aman: aman, _stabil: !tanpaSirip, _isi: Vw0 / Vb
  };
}

function kriteriaRoketAir(v, h) {
  return [
    { teks: 'Mendarat di zona 40–60 m', lulus: h.jarak >= 40 && h.jarak <= 60, nilai: `${h.jarak} m` },
    { teks: 'Tekanan pompa ≤ 4 bar (aman)', lulus: h._aman, nilai: `${v.tekanan} bar` },
    { teks: 'Terbang stabil (tidak berputar)', lulus: h._stabil, nilai: h.stabilitas }
  ];
}

function gambarRoketAir(ctx, W, H, v, h, p) {
  const tanah = H - 34, x0 = 30, jMaks = 70;
  const adaLatar = latar(ctx, W, H, 'bg-lapangan', 0.9, tanah);
  if (!adaLatar) { ctx.fillStyle = '#e0f2fe'; ctx.fillRect(0, 0, W, H); }
  const s = Math.min((W - x0 - 14) / jMaks, (tanah - 40) / Math.max(12, h.tinggi * 1.15));
  const X = m => x0 + m * s, Y = m => tanah - m * s;
  ctx.fillStyle = adaLatar ? 'rgba(134,239,172,.55)' : '#86efac'; ctx.fillRect(0, tanah, W, H - tanah);
  ctx.fillStyle = 'rgba(22,163,74,.22)'; ctx.fillRect(X(40), tanah - 6, X(60) - X(40), 10);
  label(ctx, 'Zona target', (X(40) + X(60)) / 2, tanah - 16, { rata: 'center', ukuran: 11, warna: '#15803d' });
  ctx.strokeStyle = '#78716c'; ctx.lineWidth = 2;
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(X(65) + k * 5, tanah); ctx.lineTo(X(65) + k * 5, tanah - 22); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(X(65) - 2, tanah - 16); ctx.lineTo(X(65) + 17, tanah - 16); ctx.stroke();
  for (let m = 0; m <= jMaks; m += 10) {
    ctx.fillStyle = '#166534'; ctx.fillRect(X(m) - 0.5, tanah, 1, 6);
    label(ctx, `${m} m`, X(m), tanah + 16, { rata: 'center', ukuran: 10, warna: '#14532d' });
  }
  const th = +v.sudut * Math.PI / 180;
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x0 - 12, tanah); ctx.lineTo(x0, tanah - 12); ctx.lineTo(x0 + 12, tanah); ctx.stroke();
  const fase = 0.28;
  if (p < fase) {
    const q = p / fase, rot = Math.PI / 2 - th;
    gambarBentukRoket(ctx, x0, tanah - 26, rot, 1, 'roket-air');
    ctx.save(); ctx.translate(x0, tanah - 26); ctx.rotate(rot);
    ctx.fillStyle = 'rgba(56,189,248,.75)';
    const tc = Math.min(30, 32 * h._isi); ctx.fillRect(-6, 17 - tc, 12, tc);
    ctx.restore();
    // pompa & pengukur tekanan
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x0, tanah - 4); ctx.quadraticCurveTo(x0 + 30, tanah + 6, x0 + 58, tanah - 8); ctx.stroke();
    if (!benda(ctx, 'pompa', x0 + 60, tanah + 2, 26, { ay: 1 })) { ctx.fillStyle = '#334155'; ctx.fillRect(x0 + 54, tanah - 40 + Math.sin(q * 30) * 6, 8, 32); }
    const tek = +v.tekanan * mulus(q);
    label(ctx, `Tekanan ${fx(tek)} bar${tek > 4 ? ' ⚠' : ''}`, x0 + 70, tanah - 44, { ukuran: 12, tebal: true, warna: tek > 4 ? '#fff' : '#0369a1', latar: tek > 4 ? '#dc2626' : 'rgba(255,255,255,.95)' });
    return;
  }
  const u = Math.min(1, (p - fase) / (1 - fase));
  const J = h._jalur, tAkhir = J[J.length - 1][2] || 1, tNow = u * tAkhir;
  let i = J.findIndex(q => q[2] >= tNow); if (i < 0) i = J.length - 1;
  ctx.strokeStyle = 'rgba(2,132,199,.5)'; ctx.setLineDash([4, 5]); ctx.lineWidth = 2;
  ctx.beginPath(); for (let k = 0; k <= i; k++) ctx.lineTo(X(J[k][0]), Y(J[k][1])); ctx.stroke(); ctx.setLineDash([]);
  const a = J[Math.max(0, i - 1)], b = J[i];
  let rot = Math.atan2(-(b[1] - a[1]), (b[0] - a[0]) || 0.0001) + Math.PI / 2;
  if (i === 0) rot = Math.PI / 2 - th;
  if (!h._stabil && u < 1) rot += tNow * 14;           // berputar-putar bila tanpa sirip
  if (u >= 1) rot = Math.PI / 2 + (h.jarak > 1 ? 0.9 : Math.PI / 2);
  gambarBentukRoket(ctx, X(b[0]), Math.min(Y(b[1]) - 12, tanah - 12), rot, 1, 'roket-air');
  if (tNow < h.dorong + 0.05 && i > 0) { // semburan air
    ctx.fillStyle = 'rgba(56,189,248,.8)';
    for (let k = 1; k < 6; k++) { ctx.beginPath(); ctx.arc(X(b[0]) - Math.sin(rot) * 0 - Math.cos(rot - Math.PI / 2) * (14 + k * 5), Y(b[1]) - 12 - Math.sin(rot - Math.PI / 2) * (14 + k * 5), 2.5, 0, 7); ctx.fill(); }
  }
  if (p < 1) label(ctx, `t = ${fx(tNow)} s`, W - 12, 18, { rata: 'right', ukuran: 11, warna: '#0f172a', latar: 'rgba(255,255,255,.9)' });
  if (p >= 1) {
    const kena = h.jarak >= 40 && h.jarak <= 60;
    const teks = h.jarak > 65 ? `Melewati pagar! (${fx(h.jarak)} m)` : `Mendarat di ${fx(h.jarak)} m · tinggi maks ${fx(h.tinggi)} m`;
    label(ctx, teks, W / 2, 22, { rata: 'center', tebal: true, ukuran: 13, warna: '#fff', latar: kena && h._aman ? '#15803d' : '#b45309' });
    if (!h._aman) label(ctx, '⚠ Tekanan melebihi batas aman botol bekas!', W / 2, 48, { rata: 'center', ukuran: 12, warna: '#fff', latar: '#dc2626' });
  }
}

/* ---------------------------------------------------------
   7. JEMBATAN STIK ES KRIM — gaya tekan, gaya tarik, struktur rangka
   Beban titik di tengah bentang 40 cm, dua rangka sejajar berbagi beban.
   Batang tarik dibatasi kekuatan sambungan lem; batang tekan dibatasi
   tekuk Euler (π²EI/L²) atau hancur. Stik ditumpuk n lapis: bila lemnya
   baik, lapisan bekerja sebagai satu batang tebal (I ∝ n³).
   --------------------------------------------------------- */
const LEM_JEMBATAN = {
  kertas: { nama: 'Lem kertas', sambung: 30, q: 0.3 },
  kayu:   { nama: 'Lem kayu (PVAc)', sambung: 120, q: 1.0 },
  tembak: { nama: 'Lem tembak', sambung: 70, q: 0.7 }
};
const NAMA_DESAIN = { balok: 'Balok datar', warren: 'Rangka Warren', pratt: 'Rangka Pratt', howe: 'Rangka Howe', lengkung: 'Lengkung (busur)' };

function hitungJembatan(v) {
  const g = 9.8, L = 0.40, panel = 0.10, E = 10e9;
  const n = +v.lapis, h = +v.tinggi / 100, lem = LEM_JEMBATAN[v.lem];
  const I1 = 0.0095 * 0.002 ** 3 / 12;
  const Ief = I1 * (n + (n ** 3 - n) * lem.q);
  // batang lebih panjang dari satu stik (10,5 cm) harus disambung → kekuatan tekan turun
  const tekan = Lm => Math.min(Math.PI ** 2 * E * Ief / (Lm * Lm), 30e6 * 0.0095 * 0.002 * n) * (Lm > 0.105 ? 0.5 : 1); // N
  const tarik = () => Math.min(lem.sambung * n, 800 * n);                                                           // N
  const M = g * L / 4;       // momen per kg beban (N·m)
  const V = g / 2;           // gaya lintang per kg (N)
  const bagi = 2;            // dua rangka sejajar
  const batang = [];         // { nama, jenis, gayaPerKg, kapasitas }
  let stikRangka = 0;
  const stikBatang = len => Math.ceil(len / 0.105) * n;
  if (v.desain === 'balok') {
    // balok datar 4 stik berjajar; sambungan di serat bawah menahan tarik
    const tebal = 0.002 * n;
    batang.push({ nama: 'Sambungan serat bawah balok', jenis: 'tarik', gayaPerKg: M / (0.67 * tebal), kapasitas: tarik() * 4 });
    stikRangka = 4 * 5 * n;
  } else if (v.desain === 'lengkung') {
    const dorong = M / h;                       // gaya dorong busur
    const panjangBusur = L * (1 + 8 / 3 * (h / L) ** 2);
    // beban titik di tengah membuat busur ikut melentur → gaya pada busur jauh lebih besar dari dorongan murni
    batang.push({ nama: 'Busur (batang tekan)', jenis: 'tekan', gayaPerKg: dorong * 2.5 / bagi, kapasitas: tekan(panel) });
    batang.push({ nama: 'Tali/penggantung lantai', jenis: 'tarik', gayaPerKg: V / bagi, kapasitas: tarik() });
    batang.push({ nama: 'Lantai pengikat (menahan dorongan busur)', jenis: 'tarik', gayaPerKg: dorong / bagi, kapasitas: tarik() });
    stikRangka = 2 * (stikBatang(panjangBusur) + 5 * stikBatang(h * 0.6));
  } else {
    const chord = M / h / bagi;
    // batang atas bisa menekuk ke samping di antara dua pengaku silang (berjarak 2 panel)
    batang.push({ nama: 'Batang atas (tekan)', jenis: 'tekan', gayaPerKg: chord, kapasitas: tekan(2 * panel) * 2 });
    batang.push({ nama: 'Batang bawah (tarik)', jenis: 'tarik', gayaPerKg: chord, kapasitas: tarik() });
    const dW = Math.hypot(panel / 2, h), dP = Math.hypot(panel, h);
    let web = 0;
    if (v.desain === 'warren') {
      batang.push({ nama: 'Diagonal (tekan)', jenis: 'tekan', gayaPerKg: V * dW / h / bagi, kapasitas: tekan(dW) });
      web = 8 * stikBatang(dW);
    } else if (v.desain === 'pratt') {
      batang.push({ nama: 'Batang tegak (tekan)', jenis: 'tekan', gayaPerKg: V / bagi, kapasitas: tekan(h) });
      batang.push({ nama: 'Diagonal (tarik)', jenis: 'tarik', gayaPerKg: V * dP / h / bagi, kapasitas: tarik() });
      web = 5 * stikBatang(h) + 4 * stikBatang(dP);
    } else { // howe
      batang.push({ nama: 'Diagonal (tekan)', jenis: 'tekan', gayaPerKg: V * dP / h / bagi, kapasitas: tekan(dP) });
      batang.push({ nama: 'Batang tegak (tarik)', jenis: 'tarik', gayaPerKg: V / bagi, kapasitas: tarik() });
      web = 5 * stikBatang(h) + 4 * stikBatang(dP);
    }
    stikRangka = 2 * (2 * 5 * n + web);
  }
  batang.forEach(b => { b.bebanMaks = b.kapasitas / b.gayaPerKg; });
  let lemah = batang.reduce((a, b) => (b.bebanMaks < a.bebanMaks ? b : a));
  // rangka yang tinggi tetapi lebar jembatannya hanya ± 8 cm mudah terpuntir/terguling ke samping
  if (v.desain !== 'balok' && h > 0.07) {
    const samping = { nama: 'Kestabilan samping (rangka terlalu tinggi & ramping)', jenis: 'tekan', gayaPerKg: 1, kapasitas: 0 };
    samping.bebanMaks = lemah.bebanMaks * Math.pow(0.07 / h, 2);
    if (samping.bebanMaks < lemah.bebanMaks * 0.97) { batang.push(samping); lemah = samping; }
  }
  const bebanMaks = lemah.bebanMaks;
  const stik = stikRangka + 20 + (v.desain === 'balok' ? 0 : 10); // + lantai + pengaku silang
  const massa = stik * 1.6 * 1.1; // g (stik ± 1,6 g + lem)
  const beban = +v.beban;
  const runtuh = beban > bebanMaks;
  return {
    bebanMaks: bulat(bebanMaks, 1), lemah: lemah.nama, gaya: bulat(beban * lemah.gayaPerKg, 0),
    stik, massa: Math.round(massa), efisiensi: Math.round(bebanMaks * 1000 / massa),
    status: runtuh ? 'Runtuh' : beban > bebanMaks * 0.8 ? 'Hampir runtuh' : 'Kuat',
    _batang: batang, _lemah: lemah, _runtuh: runtuh, _rasio: bebanMaks ? beban / bebanMaks : 9
  };
}

function kriteriaJembatan(v, h) {
  return [
    { teks: 'Menahan beban ≥ 15 kg', lulus: h.bebanMaks >= 15, nilai: `maks ${h.bebanMaks} kg` },
    { teks: 'Memakai ≤ 120 stik', lulus: h.stik <= 120, nilai: `${h.stik} stik` },
    { teks: 'Efisiensi ≥ 80 (beban ÷ massa jembatan)', lulus: h.efisiensi >= 80, nilai: `${h.efisiensi}` }
  ];
}

function gambarJembatan(ctx, W, H, v, h, p) {
  const lantaiY = H * 0.52, kiri = W * 0.14, kanan = W * 0.86, bentang = kanan - kiri;
  const adaLatar = latar(ctx, W, H, 'bg-jembatan', 0.88, H - 38); // permukaan air saluran
  if (!adaLatar) { ctx.fillStyle = '#f0f9ff'; ctx.fillRect(0, 0, W, H); }
  // tebing (tumpuan) & air saluran
  ctx.fillStyle = adaLatar ? '#8a5a2b' : '#a16207';
  ctx.beginPath(); ctx.moveTo(0, lantaiY); ctx.lineTo(kiri + 6, lantaiY); ctx.lineTo(kiri - 20, H); ctx.lineTo(0, H); ctx.fill();
  ctx.beginPath(); ctx.moveTo(W, lantaiY); ctx.lineTo(kanan - 6, lantaiY); ctx.lineTo(kanan + 20, H); ctx.lineTo(W, H); ctx.fill();
  if (!adaLatar) { ctx.fillStyle = '#7dd3fc'; ctx.fillRect(kiri - 12, H - 38, bentang + 24, 38); }
  const beban = +v.beban, rasio = h._rasio;
  const turun = mulus(jepit(p / 0.5, 0, 1));
  const patah = h._runtuh && p > 0.55;
  const lendut = Math.min(1, rasio) * 10 * turun + (patah ? mulus(jepit((p - 0.55) / 0.3, 0, 1)) * 60 : 0);
  const sag = x => { const u = (x - kiri) / bentang; return lendut * Math.sin(Math.PI * u); };
  const tinggiPx = Math.min(bentang * (+v.tinggi / 40), H * 0.36);
  const tebal = 1.5 + +v.lapis * 1.3;
  const warnaBatang = b => (b && b === h._lemah && (patah || rasio > 0.8) ? '#dc2626' : b && b.jenis === 'tekan' ? '#ea580c' : '#2563eb');
  const cari = kata => h._batang.find(b => b.nama.toLowerCase().includes(kata));
  const garis = (x1, y1, x2, y2, b, putus) => {
    ctx.strokeStyle = warnaBatang(b); ctx.lineWidth = tebal; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let k = 0; k <= 16; k++) { const x = lerp(x1, x2, k / 16), y = lerp(y1, y2, k / 16); ctx.lineTo(x, y + sag(x)); } // ikut melendut sepanjang batang
    ctx.stroke();
    if (putus) { ctx.strokeStyle = '#f0f9ff'; ctx.lineWidth = tebal + 3; ctx.beginPath(); const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + sag((x1 + x2) / 2); ctx.moveTo(mx - 3, my - 3); ctx.lineTo(mx + 3, my + 3); ctx.stroke(); }
  };
  const nPanel = 4, px = bentang / nPanel;
  // lantai
  ctx.fillStyle = '#e9c98b';
  for (let i = 0; i <= 20; i++) { const x = kiri + bentang * i / 20; ctx.fillRect(x - 1.5, lantaiY + sag(x) - 2, 3, 5); }
  if (v.desain === 'balok') {
    const b = h._batang[0];
    for (let k = 0; k < +v.lapis; k++) garis(kiri, lantaiY - 3 - k * 3, kanan, lantaiY - 3 - k * 3, b, patah && k === 0);
  } else if (v.desain === 'lengkung') {
    const busur = cari('busur'), tali = cari('tali');
    ctx.strokeStyle = warnaBatang(busur); ctx.lineWidth = tebal; ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const u = i / 40, x = kiri + bentang * u; ctx.lineTo(x, lantaiY - tinggiPx * 4 * u * (1 - u) + sag(x)); }
    ctx.stroke();
    for (let i = 1; i < 5; i++) { const u = i / 5, x = kiri + bentang * u; garis(x, lantaiY - tinggiPx * 4 * u * (1 - u), x, lantaiY, tali, false); }
  } else {
    const atas = cari('atas'), bawah = cari('bawah'), diag = cari('diagonal'), tegak = cari('tegak');
    const yA = lantaiY - tinggiPx, yB = lantaiY;
    garis(kiri + (v.desain === 'warren' ? px / 2 : 0), yA, kanan - (v.desain === 'warren' ? px / 2 : 0), yA, atas, patah && h._lemah === atas);
    garis(kiri, yB, kanan, yB, bawah, patah && h._lemah === bawah);
    for (let i = 0; i < nPanel; i++) {
      const x0 = kiri + i * px, x1 = x0 + px, tengah = i < nPanel / 2;
      if (v.desain === 'warren') {
        // diagonal yang naik ke arah tengah tertekan, yang turun ke arah tengah tertarik
        const diagTarik = { jenis: 'tarik' };
        garis(x0, yB, x0 + px / 2, yA, tengah ? diag : diagTarik, patah && h._lemah === diag && i === 1);
        garis(x0 + px / 2, yA, x1, yB, tengah ? diagTarik : diag, false);
      }
      else {
        garis(x0, yB, x0, yA, tegak, patah && h._lemah === tegak && i === 2);
        const naik = v.desain === 'pratt' ? tengah : !tengah;
        if (naik) garis(x0, yA, x1, yB, diag, patah && h._lemah === diag && i === 1); else garis(x0, yB, x1, yA, diag, false);
      }
    }
    if (v.desain !== 'warren') garis(kanan, yB, kanan, yA, tegak, false);
  }
  // tumpuan
  ctx.fillStyle = '#475569';
  [kiri, kanan].forEach(x => { ctx.beginPath(); ctx.moveTo(x, lantaiY + 3); ctx.lineTo(x - 8, lantaiY + 15); ctx.lineTo(x + 8, lantaiY + 15); ctx.fill(); });
  // beban
  if (beban > 0) {
    const bx = W / 2, by = lantaiY + sag(bx) + 6;
    const ukuran = 16 + Math.min(26, beban * 1.6);
    const yBeban = lerp(by - 140, by, turun) + (patah ? 60 * mulus(jepit((p - 0.55) / 0.3, 0, 1)) : 0);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(bx, yBeban - 4); ctx.lineTo(bx, yBeban + 10); ctx.stroke();
    if (benda(ctx, 'ember', bx, yBeban + 8, ukuran * 1.35, { ay: 0.02 })) {
      label(ctx, `${fx(beban)} kg`, bx, yBeban + 10 + ukuran * 0.8, { rata: 'center', ukuran: 11, warna: '#fff', tebal: true, latar: 'rgba(51,65,85,.85)' });
    } else {
      ctx.fillStyle = '#475569'; kotakBulat(ctx, bx - ukuran / 2, yBeban + 10, ukuran, ukuran, 4); ctx.fill();
      label(ctx, `${fx(beban)} kg`, bx, yBeban + 10 + ukuran / 2, { rata: 'center', ukuran: 11, warna: '#fff', tebal: true });
    }
  }
  // legenda
  label(ctx, '■ tarik', W - 12, H - 12, { rata: 'right', ukuran: 11, warna: '#2563eb', latar: 'rgba(255,255,255,.85)' });
  label(ctx, '■ tekan', W - 66, H - 12, { rata: 'right', ukuran: 11, warna: '#ea580c', latar: 'rgba(255,255,255,.85)' });
  label(ctx, `${NAMA_DESAIN[v.desain]} · bentang 40 cm`, 12, H - 12, { ukuran: 11, warna: '#0c4a6e', latar: 'rgba(255,255,255,.85)' });
  if (p >= 1) {
    const warna = h._runtuh ? '#b91c1c' : h._rasio > 0.8 ? '#b45309' : '#15803d';
    label(ctx, h._runtuh ? `RUNTUH — ${h.lemah} gagal` : `${h.status.toUpperCase()} · mampu ± ${fx(h.bebanMaks)} kg`, W / 2, 20, { rata: 'center', tebal: true, ukuran: 13, warna: '#fff', latar: warna });
  }
}

/* ---------------------------------------------------------
   8. PEMBANGKIT LISTRIK TENAGA ANGIN — energi angin → gerak → listrik
   Daya angin ½ρAv³; koefisien daya Cp (≤ batas Betz 0,593) bergantung
   bahan, jumlah & sudut bilah; torsi awal vs hambatan generator
   menentukan kecepatan angin mulai berputar; putaran generator lewat gir.
   --------------------------------------------------------- */
const BAHAN_BILAH = {
  pvc:     { nama: 'Pipa PVC dibelah', cp: 0.30, kuat: 2.5, harga: 2000 },
  triplek: { nama: 'Triplek tipis', cp: 0.24, kuat: 4.0, harga: 2500 },
  kardus:  { nama: 'Kardus', cp: 0.20, kuat: 0.25, harga: 400 },
  botol:   { nama: 'Botol plastik', cp: 0.15, kuat: 0.6, harga: 300 }
};
const GENERATOR = {
  dinamo: { nama: 'Dinamo sepeda', hambat: 0.015, eta: 0.5, rpmIdeal: 600, maks: 6, harga: 35000 },
  motor:  { nama: 'Motor DC bekas mainan', hambat: 0.004, eta: 0.55, rpmIdeal: 3000, maks: 4, harga: 12000 }
};

function dayaTurbin(v, angin) {
  const R = +v.jari / 100, N = +v.bilah, pitch = +v.sudutBilah, gir = +v.gir;
  const b = BAHAN_BILAH[v.bahan], gen = GENERATOR[v.generator];
  const A = Math.PI * R * R;
  const pAngin = 0.5 * 1.2 * A * angin ** 3;
  const fBilah = { 2: 0.9, 3: 1, 4: 0.97, 5: 0.93, 6: 0.88, 7: 0.84, 8: 0.8 }[N] || 0.8;
  const fSudut = Math.exp(-(((pitch - 15) / 14) ** 2));
  const cp = Math.min(0.593, b.cp * fBilah * fSudut);
  const lambda = 4 * Math.PI / N * (0.6 + 0.4 * Math.cos((pitch - 15) * Math.PI / 180)); // perbandingan kecepatan ujung bilah
  // torsi awal saat rotor diam melawan hambatan generator (dikali gir)
  const cStart = 0.02 * N * Math.sin(2 * pitch * Math.PI / 180);
  const mulai = Math.sqrt(gen.hambat * gir / (0.5 * 1.2 * Math.PI * R ** 3 * cStart));
  const rpmRotor = angin >= mulai ? lambda * angin / R * 60 / (2 * Math.PI) : 0;
  const rpmGen = rpmRotor * gir;
  const etaGen = rpmGen ? gen.eta * Math.exp(-((Math.log(rpmGen / gen.rpmIdeal) / 1.1) ** 2)) : 0;
  const pMekanik = angin >= mulai ? cp * pAngin : 0;
  // generator kecil punya batas daya; kelebihannya terbuang sebagai panas
  return { pAngin, cp, mulai, rpmRotor, rpmGen, etaGen, pMekanik, pListrik: Math.min(pMekanik * etaGen, gen.maks), jenuh: pMekanik * etaGen > gen.maks };
}

function kekuatanBilah(v, angin) {
  const R = +v.jari / 100, N = +v.bilah;
  const momen = 0.5 * 1.2 * angin * angin * (Math.PI * R * R / N) * R * 0.5; // momen lentur pangkal bilah (N·m)
  return momen / BAHAN_BILAH[v.bahan].kuat; // > 1 berarti patah
}

function hitungAngin(v) {
  const d = dayaTurbin(v, +v.angin);
  const d4 = dayaTurbin(v, 4);
  const beban = kekuatanBilah(v, +v.angin);
  const patah = beban > 1;
  const pListrik = patah ? 0 : d.pListrik;
  const nLed = Math.floor(pListrik / 0.1 + 1e-9);
  const biaya = BAHAN_BILAH[v.bahan].harga * +v.bilah * Math.ceil(+v.jari / 10) + GENERATOR[v.generator].harga + ({ 1: 0, 3: 8000, 5: 12000, 10: 18000 }[+v.gir] || 0) + 15000;
  return {
    dayaAngin: bulat(d.pAngin, 1), daya: bulat(pListrik, 2), daya4: bulat(d4.pListrik, 2),
    cp: bulat(d.cp * 100, 0), rpm: Math.round(patah ? 0 : d.rpmRotor), rpmGen: Math.round(patah ? 0 : d.rpmGen),
    mulai: bulat(d.mulai, 1), lampu: patah ? 'Padam (bilah patah)' : d.jenuh ? `${nLed} LED (generator di batas maksimum, mulai panas)` : nLed ? `${nLed} LED menyala` : d.rpmRotor ? 'Terlalu redup' : 'Padam (tidak berputar)',
    kekuatan: kekuatanBilah(v, 10) > 1 ? 'Patah di angin 10 m/s' : 'Aman sampai 10 m/s', biaya,
    _patah: patah, _beban: beban, _d: d
  };
}

function kriteriaAngin(v, h) {
  return [
    { teks: 'Daya listrik ≥ 1 W pada angin 4 m/s', lulus: h.daya4 >= 1, nilai: `${h.daya4} W` },
    { teks: 'Mulai berputar pada angin ≤ 3 m/s', lulus: h.mulai <= 3, nilai: `${h.mulai} m/s` },
    { teks: 'Bilah tahan angin kencang 10 m/s', lulus: kekuatanBilah(v, 10) <= 1, nilai: h.kekuatan },
    { teks: 'Biaya ≤ Rp 75.000', lulus: h.biaya <= 75000, nilai: rp(h.biaya) }
  ];
}

// Bilah hasil AI diwarnai ulang sesuai bahan (disimpan di kanvas bantu agar tidak diwarnai tiap bingkai)
const WARNA_BILAH = { pvc: 'rgba(241,245,249,.78)', botol: 'rgba(186,230,253,.6)', triplek: 'rgba(214,168,107,.3)', kardus: '' };
const bilahBerwarna = {};
function gambarBilah(bahan) {
  if (bilahBerwarna[bahan]) return bilahBerwarna[bahan];
  const img = aset('bilah');
  if (!img || typeof document === 'undefined') return null;
  const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
  const g = c.getContext('2d'); g.drawImage(img, 0, 0);
  if (WARNA_BILAH[bahan]) { g.globalCompositeOperation = 'source-atop'; g.fillStyle = WARNA_BILAH[bahan]; g.fillRect(0, 0, c.width, c.height); }
  return (bilahBerwarna[bahan] = c);
}

function gambarAngin(ctx, W, H, v, h, p) {
  const tanah = H - 30;
  const adaLatar = latar(ctx, W, H, 'bg-angin', 0.9, tanah); // pasir pantai
  if (!adaLatar) {
    ctx.fillStyle = '#ecfeff'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fde68a'; ctx.fillRect(0, tanah, W, H - tanah);
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(0, tanah - 8, W * 0.22, 8);
  }
  const cx = W * 0.4, cy = H * 0.42;
  const Rpx = Math.min(H * 0.34, W * 0.3) * (0.45 + 0.55 * (+v.jari / 40));
  // angin
  const angin = +v.angin, laju = mulus(jepit(p / 0.3, 0, 1));
  ctx.strokeStyle = 'rgba(14,116,144,.45)'; ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
    const y = cy - Rpx + i * Rpx / 2, x = ((p * 900 * (0.3 + angin / 8)) + i * 53) % (cx - 20);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x + 15, y - 6, x + 25, y + 6, x + 40, y); ctx.stroke();
  }
  label(ctx, `Angin ${fx(angin)} m/s`, 12, 18, { ukuran: 12, tebal: true, warna: '#0e7490', latar: adaLatar ? 'rgba(255,255,255,.88)' : undefined });
  // tiang & generator
  ctx.fillStyle = adaLatar ? '#7c5a3a' : '#64748b'; ctx.fillRect(cx - 4, cy, 8, tanah - cy);
  if (!benda(ctx, 'generator', cx + 14, cy + 6, 62, { ax: 0.35 })) {
    ctx.fillStyle = '#334155'; kotakBulat(ctx, cx - 16, cy - 12, 44, 24, 6); ctx.fill();
  }
  label(ctx, GENERATOR[v.generator].nama.split(' ')[0], cx + 14, cy + 34, { rata: 'center', ukuran: 10, warna: '#334155', latar: adaLatar ? 'rgba(255,255,255,.85)' : undefined });
  // rotor
  const d = h._d;
  const putar = h._patah ? 0 : d.rpmRotor;
  const sudut = p * laju * Math.min(putar, 900) / 60 * 2 * Math.PI * 1.2;
  const warna = { pvc: '#e2e8f0', triplek: '#d6a86b', kardus: '#c8a26b', botol: '#bae6fd' }[v.bahan];
  const N = +v.bilah, lebar = Rpx * (0.12 + 0.2 * (+v.sudutBilah / 45));
  const patahIdx = h._patah && p > 0.55 ? 0 : -1;
  for (let i = 0; i < N; i++) {
    const a = sudut + i * 2 * Math.PI / N;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(a);
    if (i === patahIdx) { const q = (p - 0.55) / 0.45; ctx.translate(q * 90, q * q * 160); ctx.rotate(q * 6); }
    const gb = gambarBilah(v.bahan);
    if (gb) {
      // lebar bilah mengikuti sudut bilah (bilah bersudut besar tampak lebih lebar dari depan)
      const tinggiGb = Rpx * gb.height / gb.width;
      ctx.scale(1, lebar / tinggiGb);
      ctx.drawImage(gb, -Rpx * 0.04, -tinggiGb / 2, Rpx * 1.04, tinggiGb);
    } else {
      ctx.fillStyle = warna; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(0, -3); ctx.lineTo(Rpx, -lebar / 2); ctx.quadraticCurveTo(Rpx + 6, 0, Rpx, lebar / 2); ctx.lineTo(0, 3); ctx.closePath(); ctx.fill(); ctx.stroke();
    }
    ctx.restore();
  }
  ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, 7); ctx.fill();
  // kabel & lampu
  const terang = jepit(h.daya / 1.5, 0, 1) * laju;
  const namaLampu = terang > 0.05 ? 'lampu-menyala' : 'lampu-padam';
  const imgLampu = aset(namaLampu);
  if (imgLampu) {
    // tiang lampu bambu hasil AI: letak lentera relatif terhadap gambar
    const tl = Math.min(H * 0.62, 190), wl = tl * imgLampu.naturalWidth / imgLampu.naturalHeight;
    const lx = W * 0.82, kiriL = lx - wl / 2, atasL = tanah - tl;
    const posLentera = namaLampu === 'lampu-menyala' ? { x: 0.26, y: 0.52 } : { x: 0.82, y: 0.36 };
    const px = kiriL + wl * posLentera.x, py = atasL + tl * posLentera.y;
    const tiangX = kiriL + wl * (namaLampu === 'lampu-menyala' ? 0.8 : 0.25);
    ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx + 36, cy + 6); ctx.bezierCurveTo(cx + 90, tanah - 20, tiangX - 60, tanah - 6, tiangX, tanah - 10); ctx.stroke();
    if (terang > 0.02) {
      const gr = ctx.createRadialGradient(px, py, 4, px, py, 70);
      gr.addColorStop(0, `rgba(253,224,71,${0.9 * terang})`); gr.addColorStop(1, 'rgba(253,224,71,0)');
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(px, py, 70, 0, 7); ctx.fill();
    }
    benda(ctx, namaLampu, lx, tanah + 2, wl, { ay: 1 });
    label(ctx, `💡 ${fx(h.daya * laju, 2)} W · ${Math.round(putar * laju)} rpm`, lx, atasL - 14, { rata: 'center', ukuran: 12, tebal: true, warna: '#fff', latar: '#0f766e' });
  } else {
  const lx = W * 0.8, ly = H * 0.36;
  ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx + 28, cy); ctx.bezierCurveTo(cx + 80, cy - 8, lx - 70, ly + 18, lx - 7, ly + 26); ctx.stroke();
  if (terang > 0.02) {
    const gr = ctx.createRadialGradient(lx, ly, 4, lx, ly, 60);
    gr.addColorStop(0, `rgba(253,224,71,${0.85 * terang})`); gr.addColorStop(1, 'rgba(253,224,71,0)');
    ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(lx, ly, 60, 0, 7); ctx.fill();
  }
  ctx.fillStyle = terang > 0.02 ? `rgb(${Math.round(lerp(226, 253, terang))},${Math.round(lerp(232, 224, terang))},${Math.round(lerp(240, 71, terang))})` : '#e2e8f0';
  ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(lx, ly, 16, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#64748b'; ctx.fillRect(lx - 7, ly + 16, 14, 16);
  label(ctx, 'Lampu LED pos ronda', lx, ly + 46, { rata: 'center', ukuran: 11, warna: '#334155' });
  // meteran
  label(ctx, `${fx(h.daya * laju, 2)} W · ${Math.round(putar * laju)} rpm`, lx, ly - 34, { rata: 'center', ukuran: 12, tebal: true, warna: '#fff', latar: '#0f766e' });
  }
  if (p >= 1) {
    const teks = h._patah ? 'BILAH PATAH — angin terlalu kencang untuk bahan ini' : !d.rpmRotor ? `Belum berputar (butuh angin ≥ ${fx(h.mulai)} m/s)` : h.lampu;
    label(ctx, teks, W / 2, H - 12, { rata: 'center', tebal: true, ukuran: 12, warna: '#fff', latar: h._patah || !d.rpmRotor ? '#b91c1c' : h.daya >= 1 ? '#15803d' : '#b45309' });
  }
}

/* ---------------------------------------------------------
   9. RANGKAIAN LISTRIK SEDERHANA — Hukum Ohm, seri & paralel
   Baterai AA 1,5 V (hambatan dalam 0,15 Ω, kapasitas 2000 mAh) disusun seri.
   LED: tegangan kerja ± 2,9 V + hambatan dinamis 15 Ω, putus > 35 mA.
   Bohlam pijar 2,5 V: hambatan 8,3 Ω, putus > 0,45 A.
   --------------------------------------------------------- */
const LAMPU_LISTRIK = {
  led:   { nama: 'LED putih 5 mm', Vf: 2.9, rd: 15, batas: 0.035, harga: 1000 },
  pijar: { nama: 'Bohlam pijar 2,5 V', Vf: 0, rd: 8.3, batas: 0.45, harga: 4000 }
};

function sirkuitListrik(v, lepasSatu) {
  const n = +v.baterai, m = +v.lampu, R = +v.resistor, seri = v.susunan === 'seri';
  const L = LAMPU_LISTRIK[v.jenisLampu];
  const E = n * 1.5, r = n * 0.15 + 0.1; // + hambatan kabel
  const lampu = Array.from({ length: m }, (_, i) => ({ I: 0, status: 'padam', dicabut: lepasSatu && i === 0 }));
  if (seri) {
    const utuh = !lampu.some(x => x.dicabut);
    const I = utuh ? Math.max(0, (E - m * L.Vf) / (r + m * (L.rd + R))) : 0;
    if (I > L.batas) { // satu lampu putus lebih dulu → rangkaian terbuka, semua padam
      lampu.forEach((x, i) => { x.I = 0; x.status = i === m - 1 ? 'putus' : 'padam'; });
    } else lampu.forEach(x => { x.I = I; });
  } else {
    // cabang yang putus menjadi terbuka; hitung ulang sampai stabil
    for (let ulang = 0; ulang < m + 1; ulang++) {
      const aktif = lampu.filter(x => !x.dicabut && x.status !== 'putus');
      const Ib = aktif.length ? Math.max(0, (E - L.Vf) / (L.rd + R + aktif.length * r)) : 0;
      aktif.forEach(x => { x.I = Ib; });
      if (Ib > L.batas) { aktif[0].status = 'putus'; aktif[0].I = 0; continue; }
      break;
    }
  }
  lampu.forEach(x => {
    if (x.dicabut) { x.status = 'dicabut'; x.I = 0; x.lm = 0; return; }
    if (x.status === 'putus') { x.lm = 0; return; }
    x.lm = v.jenisLampu === 'led' ? 0.3 * x.I * 1000 : 7.5 * Math.pow(x.I / 0.3, 3);
    x.status = x.lm >= 4.5 ? 'terang' : x.lm >= 1 ? 'redup' : 'padam';
  });
  const Itot = lampu.reduce((a, x) => a + x.I, 0);
  return { lampu, Itot, E, r, Vterminal: E - Itot * r };
}

function hitungListrik(v) {
  const s = sirkuitListrik(v, v.cabut === 'ya');
  const L = LAMPU_LISTRIK[v.jenisLampu];
  const cahaya = s.lampu.reduce((a, x) => a + x.lm, 0);
  const nyala = s.lampu.filter(x => x.status === 'terang' || x.status === 'redup').length;
  const putus = s.lampu.filter(x => x.status === 'putus').length;
  const mA = s.Itot * 1000;
  let kondisi;
  const butuh = (v.susunan === 'seri' ? +v.lampu : 1) * L.Vf;
  if (putus) kondisi = `${putus} lampu PUTUS (arus terlalu besar)${v.susunan === 'seri' ? ' — rangkaian terbuka, semua padam' : ''}`;
  else if (!nyala && v.cabut === 'ya' && v.susunan === 'seri') kondisi = 'Padam — rangkaian seri terputus saat satu lampu dicabut';
  else if (!nyala && v.jenisLampu === 'led' && s.E <= butuh) kondisi = `Padam — baterai ${fx(s.E)} V, padahal ${v.susunan === 'seri' && +v.lampu > 1 ? `${v.lampu} LED seri` : 'LED'} butuh lebih dari ${fx(butuh)} V`;
  else if (!nyala) kondisi = 'Padam — arus terlalu kecil';
  else kondisi = `${nyala} lampu menyala${s.lampu.some(x => x.status === 'redup') ? ' (ada yang redup)' : ''}`;
  const biaya = 5000 * +v.baterai + L.harga * +v.lampu + (+v.resistor > 0 ? 500 * +v.lampu : 0) + 8000;
  return {
    tegangan: bulat(s.E, 1), arus: Math.round(mA), arusLampu: Math.round(Math.max(0, ...s.lampu.map(x => x.I)) * 1000),
    cahaya: bulat(cahaya, 1), nyala, kondisi,
    tahan: mA > 0.5 ? bulat(2000 / mA, 1) : 0, daya: bulat(s.Itot * s.Vterminal, 2), biaya,
    _s: s, _putus: putus
  };
}

function kriteriaListrik(v, h) {
  // kriteria selalu dinilai pada rangkaian utuh (tanpa lampu dicabut)
  const utuh = v.cabut === 'ya' ? hitungListrik({ ...v, cabut: 'tidak' }) : h;
  const lepas = sirkuitListrik(v, true).lampu.slice(1);
  const tetap = +v.lampu > 1 && lepas.every(x => x.status === 'terang' || x.status === 'redup');
  return [
    { teks: 'Cahaya total ≥ 15 lumen', lulus: utuh.cahaya >= 15, nilai: `${utuh.cahaya} lm` },
    { teks: 'Tidak ada lampu putus', lulus: !utuh._putus, nilai: utuh._putus ? `${utuh._putus} putus` : 'aman' },
    { teks: 'Baterai tahan ≥ 8 jam', lulus: utuh.tahan >= 8, nilai: utuh.arus ? `${utuh.tahan} jam` : 'lampu padam' },
    { teks: 'Satu lampu dicabut, lainnya tetap menyala', lulus: tetap, nilai: tetap ? 'ya' : 'tidak' },
    { teks: 'Biaya ≤ Rp 40.000', lulus: utuh.biaya <= 40000, nilai: rp(utuh.biaya) }
  ];
}

// titik-titik arus bergerak di sepanjang polyline (arah arus konvensional)
function aliranArus(ctx, titik, mA, t) {
  if (mA <= 0.5) return;
  const jarak = 16, laju = 20 + Math.min(200, mA * 1.6);
  let total = 0; const seg = [];
  for (let i = 1; i < titik.length; i++) { const d = Math.hypot(titik[i][0] - titik[i - 1][0], titik[i][1] - titik[i - 1][1]); seg.push(d); total += d; }
  ctx.fillStyle = '#facc15';
  for (let s = (t * laju) % jarak; s < total; s += jarak) {
    let sisa = s, i = 0;
    while (i < seg.length && sisa > seg[i]) { sisa -= seg[i]; i++; }
    if (i >= seg.length) break;
    const a = titik[i], b = titik[i + 1], k = seg[i] ? sisa / seg[i] : 0;
    ctx.beginPath(); ctx.arc(lerp(a[0], b[0], k), lerp(a[1], b[1], k), 2.6, 0, 7); ctx.fill();
  }
}

function gambarListrik(ctx, W, H, v, h, p) {
  // papan rangkaian
  ctx.fillStyle = '#efe4cf'; ctx.fillRect(0, 0, W, H);
  if (latar(ctx, W, H, 'bg-listrik')) { ctx.fillStyle = 'rgba(239,228,207,.82)'; kotakBulat(ctx, 16, H * 0.08, W - 28, H * 0.84, 14); ctx.fill(); }
  ctx.fillStyle = 'rgba(120,90,50,.18)';
  for (let y = 14; y < H; y += 18) for (let x = 14; x < W; x += 18) { ctx.beginPath(); ctx.arc(x, y, 1.3, 0, 7); ctx.fill(); }
  const s = h._s, n = +v.baterai, m = +v.lampu, seri = v.susunan === 'seri', R = +v.resistor, led = v.jenisLampu === 'led';
  const nyalaSaklar = p > 0.18, t = p * 3.2;
  const yA = H * 0.2, yB = H * 0.84, bx = 44;
  // baterai tersusun seri (tegak)
  const tc = Math.min(40, (yB - yA - 40) / n), atasBat = (yA + yB) / 2 - n * tc / 2;
  for (let i = 0; i < n; i++) {
    const y = atasBat + i * tc;
    if (!benda(ctx, 'baterai-aa', bx, y + tc / 2, tc - 2, { rot: -Math.PI / 2 })) {
      ctx.fillStyle = '#1f2937'; kotakBulat(ctx, bx - 13, y + 3, 26, tc - 4, 4); ctx.fill();
      ctx.fillStyle = '#d97706'; ctx.fillRect(bx - 13, y + 3, 26, (tc - 4) * 0.3);
      ctx.fillStyle = '#9ca3af'; ctx.fillRect(bx - 4, y, 8, 3);
    }
    label(ctx, '+', bx + 18, y + 8, { ukuran: 11, warna: '#b91c1c', tebal: true });
  }
  label(ctx, `${n} × 1,5 V`, bx, atasBat + n * tc + 14, { rata: 'center', ukuran: 11, warna: '#334155', latar: 'rgba(255,255,255,.85)' });
  const garis = (pts, warna = '#b91c1c') => { ctx.strokeStyle = warna; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.stroke(); };
  const xAwal = 150, xAkhir = W - 30, ruang = xAkhir - xAwal;
  const uk = Math.max(9, Math.min(18, ruang / (m * 3.4)));
  const resistor = (x, y, vert) => {
    if (R <= 0) return;
    ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2.2; ctx.beginPath();
    for (let k = 0; k <= 6; k++) { const d = (k - 3) * uk / 3, z = k % 2 ? 5 : -5; if (vert) ctx.lineTo(x + (k === 0 || k === 6 ? 0 : z), y + d); else ctx.lineTo(x + d, y + (k === 0 || k === 6 ? 0 : z)); }
    ctx.stroke();
    label(ctx, `${R} Ω`, vert ? x + 9 : x, vert ? y : y + 16, { rata: vert ? 'left' : 'center', ukuran: 10, warna: '#78350f' });
  };
  const lampu = (x, y, L) => {
    if (L.status === 'dicabut') {
      ctx.setLineDash([3, 3]); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, uk * 0.75, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      label(ctx, 'dicabut', x, y + uk + 8, { rata: 'center', ukuran: 10, warna: '#475569' }); return;
    }
    const hidup = nyalaSaklar && L.lm > 0;
    if (hidup) {
      const rad = uk * (1.4 + Math.min(3.2, Math.sqrt(L.lm) * 0.9)) * mulus(jepit((p - 0.18) / 0.15, 0, 1));
      const g = ctx.createRadialGradient(x, y, 2, x, y, rad);
      g.addColorStop(0, led ? 'rgba(255,255,240,.95)' : 'rgba(253,186,116,.95)'); g.addColorStop(1, led ? 'rgba(254,249,195,0)' : 'rgba(251,146,60,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill();
    }
    const putus = L.status === 'putus' && nyalaSaklar;
    ctx.fillStyle = putus ? '#44403c' : hidup ? (led ? '#fefce8' : '#fed7aa') : (led ? '#e2e8f0' : '#f1f5f9');
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    if (led) { ctx.beginPath(); ctx.arc(x, y - uk * 0.2, uk * 0.55, Math.PI, 0); ctx.lineTo(x + uk * 0.55, y + uk * 0.45); ctx.lineTo(x - uk * 0.55, y + uk * 0.45); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    else { ctx.beginPath(); ctx.arc(x, y, uk * 0.7, 0, 7); ctx.fill(); ctx.stroke(); ctx.strokeStyle = hidup ? '#ea580c' : '#94a3b8'; ctx.beginPath(); for (let k = 0; k <= 4; k++) ctx.lineTo(x - uk * 0.35 + k * uk * 0.175, y + (k % 2 ? -3 : 3)); ctx.stroke(); }
    if (putus) {
      ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - uk * 0.5, y - uk * 0.5); ctx.lineTo(x + uk * 0.5, y + uk * 0.5); ctx.moveTo(x + uk * 0.5, y - uk * 0.5); ctx.lineTo(x - uk * 0.5, y + uk * 0.5); ctx.stroke();
      ctx.fillStyle = 'rgba(100,116,139,.35)'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x + Math.sin(t * 3 + k) * 4, y - uk - 6 - k * 7 - (t * 8 % 8), 4 + k, 0, 7); ctx.fill(); }
      label(ctx, 'PUTUS', x, y + uk + 8, { rata: 'center', ukuran: 10, tebal: true, warna: '#b91c1c' });
    }
  };
  // saklar di kabel atas
  const sx = 96;
  garis([[bx, atasBat], [bx, yA], [sx - 14, yA]]);
  ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(sx - 14, yA, 3.5, 0, 7); ctx.arc(sx + 14, yA, 3.5, 0, 7); ctx.fill();
  ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx - 14, yA);
  if (nyalaSaklar) ctx.lineTo(sx + 14, yA); else ctx.lineTo(sx + 10, yA - 14); ctx.stroke();
  label(ctx, nyalaSaklar ? 'saklar ON' : 'saklar OFF', sx, yA - 20, { rata: 'center', ukuran: 10, warna: '#334155' });
  garis([[bx, atasBat + n * tc], [bx, yB]], '#1e293b');
  const I = nyalaSaklar ? s.Itot * 1000 : 0;
  if (seri) {
    const jarak = ruang / m;
    garis([[sx + 14, yA], [xAkhir, yA], [xAkhir, yB], [bx, yB]], '#b91c1c');
    for (let i = 0; i < m; i++) { const cx = xAwal + jarak * (i + 0.5); lampu(cx, yA, s.lampu[i]); resistor(cx, yB, false); }
    aliranArus(ctx, [[bx, atasBat], [bx, yA], [xAkhir, yA], [xAkhir, yB], [bx, yB], [bx, atasBat + n * tc]], I, t);
  } else {
    const jarak = ruang / m, xs = Array.from({ length: m }, (_, i) => xAwal + jarak * (i + 0.5));
    garis([[sx + 14, yA], [xs[m - 1], yA]]); garis([[bx, yB], [xs[m - 1], yB]], '#1e293b');
    xs.forEach((x, i) => {
      const L = s.lampu[i], yR = lerp(yA, yB, 0.3), yL = lerp(yA, yB, 0.64);
      garis([[x, yA], [x, yB]], L.status === 'dicabut' ? 'rgba(185,28,28,.25)' : '#b91c1c');
      ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.arc(x, yA, 3.5, 0, 7); ctx.arc(x, yB, 3.5, 0, 7); ctx.fill();
      resistor(x, yR, true); lampu(x, yL, L);
      if (nyalaSaklar && L.I > 0) aliranArus(ctx, [[x, yA], [x, yB]], L.I * 1000, t);
    });
    aliranArus(ctx, [[bx, atasBat], [bx, yA], [xs[0], yA]], I, t);
    aliranArus(ctx, [[xs[0], yB], [bx, yB], [bx, atasBat + n * tc]], I, t);
  }
  // alat ukur
  label(ctx, `A: ${Math.round(I)} mA`, 12, 16, { ukuran: 12, tebal: true, warna: '#fff', latar: '#0f766e' });
  label(ctx, `V: ${fx(s.E)} V`, 104, 16, { ukuran: 12, tebal: true, warna: '#fff', latar: '#1d4ed8' });
  label(ctx, seri ? 'Susunan SERI' : 'Susunan PARALEL', W - 12, 16, { rata: 'right', ukuran: 11, tebal: true, warna: '#334155', latar: 'rgba(255,255,255,.85)' });
  if (p >= 1) {
    const ok = h.cahaya >= 15 && !h._putus;
    label(ctx, `${h.kondisi} · ${fx(h.cahaya)} lumen`, W / 2, H - 12, { rata: 'center', tebal: true, ukuran: 12, warna: '#fff', latar: h._putus ? '#b91c1c' : ok ? '#15803d' : '#b45309' });
  }
}

/* ---------------------------------------------------------
   10. ELEKTROMAGNET — kemagnetan, lilitan, arus, inti
   Kawat tembaga dililit pada inti sepanjang 6 cm (keliling ± 3,8 cm).
   H = N·I/l ; B = μ0·μr·H (jenuh) ; gaya angkat ∝ B²·A/(2μ0).
   Panas kawat P = I²R ; lama baterai = 2000 mAh / I.
   --------------------------------------------------------- */
const INTI_MAGNET = {
  besi:      { nama: 'Paku besi (besi lunak)', mu: 120, jenuh: 1.5, sisa: 0.03, harga: 500 },
  baja:      { nama: 'Baut baja keras', mu: 60, jenuh: 1.2, sisa: 0.45, harga: 1500 },
  aluminium: { nama: 'Batang aluminium', mu: 1, jenuh: 0, sisa: 0, harga: 2000 },
  udara:     { nama: 'Tanpa inti (udara)', mu: 1, jenuh: 0, sisa: 0, harga: 0 }
};
const KAWAT_MAGNET = { tipis: { nama: 'Kawat email 0,3 mm', ohmPerM: 0.24, harga: 500 }, tebal: { nama: 'Kawat email 0,6 mm', ohmPerM: 0.06, harga: 1500 } };
const BENDA_MAGNET = { paku: { nama: 'paku kecil', massa: 2, magnetik: true }, klip: { nama: 'klip kertas', massa: 0.5, magnetik: true }, aluminium: { nama: 'potongan kaleng aluminium', massa: 1, magnetik: false } };

function hitungMagnet(v) {
  const N = +v.lilitan, n = +v.baterai, inti = INTI_MAGNET[v.inti], kawat = KAWAT_MAGNET[v.kawat], benda = BENDA_MAGNET[v.benda];
  const panjang = N * 0.038 + 0.3;               // m
  const Rk = panjang * kawat.ohmPerM;
  const E = n * 1.5, r = n * 0.15 + 0.05;
  const I = E / (r + Rk);                        // A
  const H = N * I / 0.06;
  const mu0 = 4 * Math.PI * 1e-7;
  let B = mu0 * inti.mu * H;
  if (inti.jenuh) B = Math.min(B, inti.jenuh * (1 - Math.exp(-B / inti.jenuh)) + B * 0.02); // mendekati jenuh
  const F = B * B * 2.8e-5 / (2 * mu0) * 0.15;   // N, ujung inti Ø 6 mm
  const angkat = benda.magnetik ? Math.floor(F / (benda.massa / 1000 * 9.8) + 1e-9) : 0;
  const Fsisa = F * inti.sisa;
  const sisa = benda.magnetik ? Math.floor(Fsisa / (benda.massa / 1000 * 9.8) + 1e-9) : 0;
  const panas = I * I * Rk;
  const tahan = 2000 / (I * 1000) * 60;          // menit
  const biaya = 5000 * n + inti.harga + Math.ceil(panjang) * kawat.harga + 5000;
  return {
    arus: bulat(I, 2), medan: Math.round(B * 1000), gaya: bulat(F, 2), angkat: Math.min(angkat, 200), sisa: Math.min(sisa, 200),
    panas: bulat(panas, 1), tahan: Math.round(tahan), panjang: bulat(panjang, 1), biaya,
    suhu: panas > 3 ? 'Panas! (berbahaya)' : panas > 1.5 ? 'Hangat' : 'Aman',
    _F: F, _benda: benda, _inti: inti
  };
}

function kriteriaMagnet(v, h) {
  const p = v.benda === 'paku' ? h : hitungMagnet({ ...v, benda: 'paku' }); // kriteria dinilai dengan paku
  return [
    { teks: 'Mengangkat ≥ 15 paku kecil', lulus: p.angkat >= 15, nilai: `${p.angkat} paku` },
    { teks: 'Paku terlepas saat saklar dimatikan', lulus: p.sisa === 0, nilai: p.sisa ? `${p.sisa} paku tertahan` : 'semua lepas' },
    { teks: 'Kawat tidak kepanasan (≤ 3 W)', lulus: p.panas <= 3, nilai: `${p.panas} W` },
    { teks: 'Baterai tahan ≥ 30 menit dinyalakan', lulus: p.tahan >= 30, nilai: `${p.tahan} menit` },
    { teks: 'Biaya ≤ Rp 30.000', lulus: p.biaya <= 30000, nilai: rp(p.biaya) }
  ];
}

function gambarMagnet(ctx, W, H, v, h, p) {
  // meja bank sampah
  const meja = H * 0.8;
  if (!latar(ctx, W, H, 'bg-magnet', 0.8, meja)) {
    ctx.fillStyle = '#f1f5f9'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e2e8f0'; for (let x = 0; x < W; x += 36) ctx.fillRect(x, 0, 1, H * 0.78);
    ctx.fillStyle = '#a16207'; ctx.fillRect(0, meja, W, H - meja);
    ctx.fillStyle = '#ca8a04'; ctx.fillRect(0, meja, W, 6);
  }
  const N = +v.lilitan, bendaUji = h._benda;
  // fase: 0–0.15 diam, 0.15–0.7 saklar ON, 0.7–1 saklar OFF (uji lepas)
  const on = p > 0.15 && p < 0.7, fOn = mulus(jepit((p - 0.15) / 0.25, 0, 1)), fOff = mulus(jepit((p - 0.72) / 0.2, 0, 1));
  // derek
  const tiangX = W * 0.14, lenganY = H * 0.12, ujungX = W * 0.5;
  ctx.fillStyle = '#f59e0b'; ctx.fillRect(tiangX - 6, lenganY, 12, meja - lenganY); ctx.fillRect(tiangX, lenganY - 6, ujungX - tiangX + 10, 12);
  ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2;
  for (let x = tiangX + 20; x < ujungX; x += 26) { ctx.beginPath(); ctx.moveTo(x, lenganY - 6); ctx.lineTo(x + 13, lenganY + 6); ctx.stroke(); }
  const naik = on ? fOn : (p >= 0.7 ? 1 - fOff * 0.15 : 0);
  const intiAtas = lenganY + 30, intiBawah = lerp(meja - 70, meja - 150, naik); // derek mengangkat setelah menyala
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ujungX, lenganY + 6); ctx.lineTo(ujungX, intiAtas); ctx.stroke();
  // inti
  const lebarInti = 12, warnaInti = { besi: '#64748b', baja: '#334155', aluminium: '#cbd5e1', udara: 'rgba(0,0,0,0)' }[v.inti];
  const yInti0 = intiBawah - 80;
  if (v.inti !== 'udara') { ctx.fillStyle = warnaInti; ctx.fillRect(ujungX - lebarInti / 2, yInti0, lebarInti, 84); }
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ujungX, intiAtas); ctx.lineTo(ujungX, yInti0); ctx.stroke();
  // lilitan (jumlah garis sebanding lilitan)
  const panas = h.panas > 3 && on;
  const garisLilit = Math.min(34, 6 + Math.round(N / 10));
  for (let i = 0; i < garisLilit; i++) {
    const y = yInti0 + 8 + i * (64 / garisLilit);
    ctx.strokeStyle = panas ? `rgb(${220},${80 + (i % 2) * 30},40)` : i % 2 ? '#b45309' : '#d97706';
    ctx.lineWidth = v.kawat === 'tebal' ? 3.2 : 2;
    ctx.beginPath(); ctx.ellipse(ujungX, y, lebarInti / 2 + 5, 3, 0, 0, Math.PI * 2); ctx.stroke();
  }
  // kabel ke baterai & saklar
  const bx = W * 0.8, by = meja - 60, n = +v.baterai;
  for (let i = 0; i < n; i++) {
    if (benda(ctx, 'baterai-aa', bx - 17.5 + i * 20, by + 20, 40, { rot: -Math.PI / 2 })) continue;
    ctx.fillStyle = '#1f2937'; kotakBulat(ctx, bx - 26 + i * 20, by, 17, 40, 3); ctx.fill(); ctx.fillStyle = '#d97706'; ctx.fillRect(bx - 26 + i * 20, by, 17, 10);
  }
  label(ctx, `${n} × 1,5 V`, bx + n * 10 - 16, by + 54, { rata: 'center', ukuran: 11, warna: '#fff', latar: 'rgba(15,23,42,.6)' });
  ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(ujungX + 10, yInti0 + 6); ctx.bezierCurveTo(ujungX + 80, yInti0 - 20, bx - 90, by - 40, bx - 60, by - 10); ctx.stroke();
  ctx.strokeStyle = '#1e293b'; ctx.beginPath(); ctx.moveTo(ujungX + 10, yInti0 + 70); ctx.bezierCurveTo(ujungX + 90, yInti0 + 110, bx - 60, by + 60, bx - 26, by + 30); ctx.stroke();
  // saklar
  const sx = bx - 50, sy = by - 10;
  ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(sx - 10, sy, 3.5, 0, 7); ctx.arc(sx + 12, sy + 8, 3.5, 0, 7); ctx.fill();
  ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx - 10, sy); on ? ctx.lineTo(sx + 12, sy + 8) : ctx.lineTo(sx + 8, sy - 14); ctx.stroke();
  label(ctx, on ? 'saklar ON' : 'saklar OFF', sx, sy - 24, { rata: 'center', ukuran: 11, tebal: true, warna: on ? '#15803d' : '#64748b', latar: 'rgba(255,255,255,.9)' });
  // garis medan magnet
  const kuat = jepit(h.medan / 800, 0, 1);
  if (on && h.medan > 5) {
    ctx.strokeStyle = `rgba(37,99,235,${0.2 + 0.45 * kuat * fOn})`; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
    for (let k = 1; k <= 1 + Math.round(4 * kuat); k++) {
      ctx.beginPath(); ctx.ellipse(ujungX, yInti0 + 42, 14 + k * 16, 50 + k * 10, 0, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.setLineDash([]);
    label(ctx, 'U', ujungX, yInti0 - 6, { rata: 'center', ukuran: 11, tebal: true, warna: '#b91c1c' });
    label(ctx, 'S', ujungX, yInti0 + 96, { rata: 'center', ukuran: 11, tebal: true, warna: '#1d4ed8' });
  }
  if (panas) { ctx.strokeStyle = 'rgba(148,163,184,.7)'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let j = 0; j < 12; j++) ctx.lineTo(ujungX - 30 + k * 12 + Math.sin(j + p * 30) * 3, yInti0 - j * 3); ctx.stroke(); } }
  // tumpukan benda di meja
  const ujungY = yInti0 + 84;
  const tertarik = h.angkat, tertahan = h.sisa;
  const total = 40;
  const gambarBenda = (x, y, rot) => {
    const aset = { paku: ['paku', 20], klip: ['klip', 15], aluminium: ['kaleng-alu', 16] }[v.benda];
    if (benda(ctx, aset[0], x, y, aset[1], { rot })) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    if (v.benda === 'paku') { ctx.fillStyle = '#6b7280'; ctx.fillRect(-9, -1.2, 18, 2.4); ctx.fillRect(-10, -3, 2.5, 6); }
    else if (v.benda === 'klip') { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.4; kotakBulat(ctx, -7, -3, 14, 6, 3); ctx.stroke(); }
    else { ctx.fillStyle = '#e5e7eb'; ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1; ctx.fillRect(-7, -4, 14, 8); ctx.strokeRect(-7, -4, 14, 8); }
    ctx.restore();
  };
  const rng = k => { const s = Math.sin(k * 91.7) * 4375.5; return s - Math.floor(s); };
  for (let i = 0; i < total; i++) {
    const x0 = ujungX - 70 + rng(i) * 140, y0 = meja - 4 - rng(i + 0.3) * 10, r0 = rng(i + 0.6) * 3;
    let x = x0, y = y0, rot = r0;
    const naikBenda = i < Math.min(tertarik, total);
    if (naikBenda && p > 0.15) {
      const tempel = { x: ujungX + (rng(i + 0.9) - 0.5) * 26, y: ujungY + 4 + Math.floor(i / 6) * 5 + rng(i + 1.2) * 4 };
      const q = mulus(jepit((p - 0.17 - (i % 10) * 0.006) / 0.12, 0, 1));
      x = lerp(x0, tempel.x, q); y = lerp(y0, tempel.y, q); rot = lerp(r0, Math.PI / 2 + (rng(i) - 0.5), q);
      if (p >= 0.7 && i >= tertahan) { // saklar OFF → jatuh kembali bila sisa kemagnetan kecil
        const jatuh = mulus(jepit((p - 0.72 - (i % 7) * 0.01) / 0.12, 0, 1));
        x = lerp(tempel.x, x0, jatuh); y = lerp(tempel.y, y0, jatuh); rot = lerp(rot, r0, jatuh);
      }
    }
    gambarBenda(x, y, rot);
  }
  // pembacaan
  label(ctx, `A: ${fx(on ? h.arus : 0, 2)} A`, 12, 16, { ukuran: 12, tebal: true, warna: '#fff', latar: '#0f766e' });
  label(ctx, `${N} lilitan · ${INTI_MAGNET[v.inti].nama}`, W - 12, 16, { rata: 'right', ukuran: 11, tebal: true, warna: '#334155', latar: 'rgba(255,255,255,.9)' });
  if (p >= 1) {
    const teks = !bendaUji.magnetik ? `Aluminium tidak tertarik magnet — 0 terangkat` : h.angkat === 0 ? 'Tidak ada yang terangkat' : `${h.angkat} ${bendaUji.nama} terangkat · ${h.sisa ? `${h.sisa} tertahan saat OFF` : 'semua lepas saat OFF'}`;
    label(ctx, teks, W / 2, H - 14, { rata: 'center', tebal: true, ukuran: 12, warna: '#fff', latar: h.angkat >= 15 && !h.sisa && h.panas <= 3 ? '#15803d' : '#b45309' });
  }
}

/* ---------------------------------------------------------
   11. PESAWAT SEDERHANA — tuas & katrol
   Karung garam m kg dinaikkan ke bak gerobak 0,5 m.
   Tuas jenis 1: KM = lengan kuasa / lengan beban; ayunan ±30° → beban naik = lengan beban × 1.
   Katrol: KM ideal = jumlah tali penopang; efisiensi tiap katrol 0,95 (dilumasi) / 0,8 (berkarat);
   katrol bebas menambah beban 1 kg per buah.
   --------------------------------------------------------- */
const ALAT_PESAWAT = {
  tuas:   { nama: 'Tuas jenis 1 (pengungkit)', km: 0, katrol: 0, bebas: 0, arah: 'dorong ke bawah' },
  tetap:  { nama: 'Katrol tetap', km: 1, katrol: 1, bebas: 0, arah: 'tarik ke bawah' },
  bebas:  { nama: 'Katrol bebas', km: 2, katrol: 1, bebas: 1, arah: 'tarik ke atas' },
  takal2: { nama: 'Takal 2 katrol (1 tetap + 1 bebas)', km: 2, katrol: 2, bebas: 1, arah: 'tarik ke bawah' },
  takal4: { nama: 'Takal 4 katrol (2 tetap + 2 bebas)', km: 4, katrol: 4, bebas: 2, arah: 'tarik ke bawah' }
};
const TINGGI_GEROBAK = 0.5;

function hitungPesawat(v) {
  const g = 9.8, m = +v.massa, W = m * g, A = ALAT_PESAWAT[v.alat];
  let kmIdeal, F, naik, jarak, patah = false, momen = 0, biaya;
  if (v.alat === 'tuas') {
    const P = +v.panjangTuas, Lb = Math.min(+v.lenganBeban, P - 0.1), Lk = P - Lb;
    kmIdeal = Lk / Lb;
    F = W / kmIdeal / 0.95;                 // sedikit gesekan di titik tumpu
    naik = Lb * 1.0; jarak = Lk * 1.0;      // ayunan ±30°
    momen = W * Lb;                         // momen lentur di titik tumpu
    patah = momen > 400;
    biaya = Math.round(P * 20000 + 15000);
  } else {
    const eta = Math.pow(v.kondisi === 'dilumasi' ? 0.95 : 0.8, A.katrol);
    kmIdeal = A.km;
    F = (W + A.bebas * 1 * g) / (A.km * eta);
    naik = TINGGI_GEROBAK; jarak = TINGGI_GEROBAK * A.km;
    const tali = jarak + 2 * A.km + 2;
    biaya = A.katrol * 20000 + 30000 + Math.ceil(tali) * 2000 + (v.kondisi === 'dilumasi' ? 5000 : 0);
  }
  const usahaBeban = W * Math.min(naik, TINGGI_GEROBAK);
  const usahaKuasa = F * jarak * Math.min(1, TINGGI_GEROBAK / Math.max(naik, 1e-6));
  return {
    kmIdeal: bulat(kmIdeal, 2), kmNyata: bulat(W / F, 2), gaya: Math.round(F), setara: bulat(F / g, 1),
    naik: bulat(naik, 2), jarak: bulat(jarak * Math.min(1, TINGGI_GEROBAK / Math.max(naik, 1e-6)), 2),
    usahaBeban: Math.round(usahaBeban), usahaKuasa: Math.round(usahaKuasa),
    efisiensi: Math.round(usahaBeban / usahaKuasa * 100), biaya,
    status: patah ? 'Tuas PATAH' : F > 200 ? 'Terlalu berat' : naik < TINGGI_GEROBAK ? 'Belum sampai bak' : 'Berhasil',
    _W: W, _patah: patah, _momen: momen, _A: A
  };
}

function kriteriaPesawat(v, h) {
  return [
    { teks: 'Gaya kuasa ≤ 200 N (± 20 kg)', lulus: h.gaya <= 200, nilai: `${h.gaya} N` },
    { teks: 'Karung naik ≥ 0,5 m (setinggi bak gerobak)', lulus: h.naik >= TINGGI_GEROBAK - 1e-9, nilai: `${h.naik} m` },
    { teks: 'Jarak tarik/dorong ≤ 3 m', lulus: h.jarak <= 3, nilai: `${h.jarak} m` },
    { teks: 'Alat tidak patah', lulus: !h._patah, nilai: v.alat === 'tuas' ? `momen ${Math.round(h._momen)} N·m (maks 400)` : 'aman' },
    { teks: 'Biaya ≤ Rp 150.000', lulus: h.biaya <= 150000, nilai: rp(h.biaya) }
  ];
}

function orangKecil(ctx, x, y, s, warna = '#0f766e') { // y = telapak kaki
  ctx.strokeStyle = warna; ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(x, y - s * 1.7, s * 0.22, 0, 7); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - s * 1.48); ctx.lineTo(x, y - s * 0.8); ctx.lineTo(x - s * 0.3, y); ctx.moveTo(x, y - s * 0.8); ctx.lineTo(x + s * 0.3, y); ctx.stroke();
}

function gambarPesawat(ctx, W, H, v, h, p) {
  // langit & tambak garam
  const tanah = H - 40;
  const gr = ctx.createLinearGradient(0, 0, 0, tanah);
  gr.addColorStop(0, '#bae6fd'); gr.addColorStop(1, '#f0f9ff');
  if (!latar(ctx, W, H, 'bg-tambak', 0.93, tanah)) {
    ctx.fillStyle = gr; ctx.fillRect(0, 0, W, tanah);
    ctx.fillStyle = '#e7e5e4'; ctx.fillRect(0, tanah, W, H - tanah);
    ctx.fillStyle = '#fafaf9'; for (let x = 10; x < W; x += 70) ctx.fillRect(x, tanah + 10, 50, 8); // petak garam
  }
  const s = (tanah - 60) / 2.6;                 // piksel per meter
  const q = mulus(jepit((p - 0.1) / 0.75, 0, 1)); // kemajuan mengangkat
  const gagal = h.status !== 'Berhasil';
  const qEfektif = h._patah ? Math.min(q, 0.35) : q;
  // gerobak
  const gx = W * 0.68, bakY = tanah - TINGGI_GEROBAK * s;
  ctx.fillStyle = '#92400e'; ctx.fillRect(gx, bakY, 110, 10); ctx.fillRect(gx, bakY - 26, 8, 26); ctx.fillRect(gx + 102, bakY - 26, 8, 26);
  ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(gx + 30, tanah - 14, 14, 0, 7); ctx.arc(gx + 80, tanah - 14, 14, 0, 7); ctx.fill();
  ctx.strokeStyle = '#92400e'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx + 55, bakY + 10); ctx.lineTo(gx + 55, tanah - 14); ctx.stroke();
  ctx.setLineDash([4, 4]); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(W * 0.08, bakY); ctx.lineTo(gx, bakY); ctx.stroke(); ctx.setLineDash([]);
  label(ctx, 'tinggi bak 0,5 m', gx - 6, bakY - 8, { rata: 'right', ukuran: 10, warna: '#15803d', latar: 'rgba(255,255,255,.85)' });
  const lebarKarung = 0.45 * s;
  const karung = (x, yBawah, rot = 0) => {
    if (!benda(ctx, 'karung', x, yBawah, lebarKarung, { ay: 1, rot })) {
      ctx.save(); ctx.translate(x, yBawah); ctx.rotate(rot); ctx.fillStyle = '#d6b27c'; kotakBulat(ctx, -lebarKarung / 2, -lebarKarung * 0.9, lebarKarung, lebarKarung * 0.9, 8); ctx.fill(); ctx.restore();
    }
    label(ctx, `${v.massa} kg`, x, yBawah - lebarKarung * 0.4, { rata: 'center', ukuran: 11, tebal: true, warna: '#fff', latar: 'rgba(120,53,15,.8)' });
  };
  const panahGaya = (x, y, arahY) => {
    const pj = jepit(h.gaya / 6, 18, 90);
    panah(ctx, x, y, x, y + arahY * pj, h.gaya > 200 ? '#dc2626' : '#16a34a', 3.5);
    label(ctx, `F = ${h.gaya} N`, x + 10, y + arahY * pj / 2, { ukuran: 12, tebal: true, warna: '#fff', latar: h.gaya > 200 ? '#dc2626' : '#15803d' });
  };
  if (v.alat === 'tuas') {
    const P = +v.panjangTuas, Lb = Math.min(+v.lenganBeban, P - 0.1), Lk = P - Lb;
    const tx = W * 0.3, ty = tanah - 0.5 * s;       // titik tumpu setinggi 0,5 m
    ctx.fillStyle = '#57534e'; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx - 18, tanah); ctx.lineTo(tx + 18, tanah); ctx.closePath(); ctx.fill();
    // sudut: awal ujung beban di tanah; diayun sampai beban naik Lb (ayunan 60°)
    const sudutAwal = Math.asin(jepit(0.5 / Lb, -1, 1)) || Math.PI / 6;
    const sud0 = Math.min(sudutAwal, Math.PI / 3), sud = lerp(sud0, sud0 - Math.PI / 3, qEfektif);
    const bxT = tx - Math.cos(sud) * Lb * s, byT = ty + Math.sin(sud) * Lb * s;
    const kx = tx + Math.cos(sud) * Lk * s, ky = ty - Math.sin(sud) * Lk * s;
    ctx.strokeStyle = h._patah && q > 0.35 ? '#b91c1c' : '#a16207'; ctx.lineWidth = 8; ctx.lineCap = 'round';
    if (h._patah && q > 0.35) {
      ctx.beginPath(); ctx.moveTo(bxT, byT); ctx.lineTo(tx - 4, ty + 6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(tx + 4, ty + 10); ctx.lineTo(kx, ky + 30); ctx.stroke();
      label(ctx, 'PATAH!', tx, ty - 24, { rata: 'center', tebal: true, warna: '#fff', latar: '#b91c1c' });
    } else { ctx.beginPath(); ctx.moveTo(bxT, byT); ctx.lineTo(kx, ky); ctx.stroke(); }
    karung(bxT, byT - 2);
    orangKecil(ctx, kx + 22, Math.min(tanah, ky + 1.1 * s * 0.55), 0.55 * s);
    panahGaya(kx, ky - 50, 1);
    label(ctx, `lengan beban ${fx(Lb, 2)} m`, (tx + bxT) / 2, Math.max(byT, ty) + 26, { rata: 'center', ukuran: 10, warna: '#78350f', latar: 'rgba(255,255,255,.85)' });
    label(ctx, `lengan kuasa ${fx(Lk, 2)} m`, (tx + kx) / 2, Math.min(ky, ty) - 16, { rata: 'center', ukuran: 10, warna: '#78350f', latar: 'rgba(255,255,255,.85)' });
  } else {
    const A = h._A, cx = W * 0.4, atas = 30, r = 13;
    // rangka
    ctx.fillStyle = '#78716c'; ctx.fillRect(cx - 90, atas - 10, 200, 10); ctx.fillRect(cx + 104, atas - 10, 8, tanah - atas + 10);
    ctx.fillRect(cx - 94, atas - 10, 8, tanah - atas + 10);
    const naikPx = TINGGI_GEROBAK * s * qEfektif * (gagal && h.gaya > 200 ? 0.15 : 1);
    const karungBawah = tanah - naikPx, karungAtas = karungBawah - lebarKarung * 0.95;
    const blokY = karungAtas - 18;
    const tali = (x1, y1, x2, y2) => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
    const roda = (x, y) => { ctx.fillStyle = v.kondisi === 'dilumasi' ? '#94a3b8' : '#b45309'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill(); };
    const tarik = TINGGI_GEROBAK * A.km * s * qEfektif * (gagal && h.gaya > 200 ? 0.15 : 1);
    let tanganX, tanganY, arah = 1;
    if (v.alat === 'tetap') {
      roda(cx, atas + r); tali(cx - r, atas + r, cx - r, karungAtas); tali(cx + r, atas + r, cx + r, tanah - 1.3 * s + tarik);
      tanganX = cx + r; tanganY = tanah - 1.3 * s + tarik;
    } else if (v.alat === 'bebas') {
      roda(cx, blokY); tali(cx - r, atas, cx - r, blokY); tali(cx + r, blokY, cx + r, atas + 40 - tarik * 0.3);
      tanganX = cx + r; tanganY = atas + 40 - tarik * 0.3; arah = -1;
      label(ctx, 'penarik di atas panggung', cx + r + 10, atas + 30, { ukuran: 10, warna: '#334155', latar: 'rgba(255,255,255,.85)' });
    } else if (v.alat === 'takal2') {
      roda(cx + r, atas + r); roda(cx, blokY);
      tali(cx - r, atas, cx - r, blokY); tali(cx + r, blokY, cx + r, atas + r); tali(cx + 2 * r, atas + r, cx + 2 * r, tanah - 1.3 * s + tarik);
      tanganX = cx + 2 * r; tanganY = tanah - 1.3 * s + tarik;
    } else {
      roda(cx - r, atas + r); roda(cx + r + 4, atas + r); roda(cx - r, blokY); roda(cx + r + 4, blokY);
      [cx - 2 * r, cx, cx + 4, cx + 2 * r + 4].forEach(x => tali(x, atas + r, x, blokY));
      tali(cx + 2 * r + 8, atas + r, cx + 2 * r + 8, tanah - 1.3 * s + tarik);
      tanganX = cx + 2 * r + 8; tanganY = tanah - 1.3 * s + tarik;
    }
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, blokY + (A.bebas ? r : 0)); ctx.lineTo(cx, karungAtas + 4); ctx.stroke();
    if (v.alat === 'tetap') { ctx.beginPath(); ctx.moveTo(cx - r, karungAtas); ctx.lineTo(cx, karungAtas + 4); ctx.stroke(); }
    karung(cx, karungBawah);
    if (arah === 1) orangKecil(ctx, tanganX + 26, tanah, 0.55 * s);
    panahGaya(tanganX, tanganY, arah);
    label(ctx, `tali ditarik ${fx(h.jarak, 2)} m`, tanganX + 12, tanah - 8, { ukuran: 10, warna: '#334155', latar: 'rgba(255,255,255,.85)' });
    if (v.kondisi !== 'dilumasi') label(ctx, 'katrol berkarat', cx - 90, atas + 22, { ukuran: 10, warna: '#b45309', latar: 'rgba(255,255,255,.85)' });
  }
  label(ctx, `${h._A.nama} · KM ideal ${fx(h.kmIdeal, 2)}`, 12, 16, { ukuran: 11, tebal: true, warna: '#334155', latar: 'rgba(255,255,255,.9)' });
  if (p >= 1) {
    const teks = h._patah ? `Tuas patah — momen ${Math.round(h._momen)} N·m melebihi 400 N·m` : h.gaya > 200 ? `Terlalu berat: butuh ${h.gaya} N (± ${fx(h.setara)} kg)` : h.naik < TINGGI_GEROBAK ? `Karung hanya naik ${fx(h.naik, 2)} m — belum sampai bak` : `Berhasil! Gaya ${h.gaya} N · usaha ${h.usahaKuasa} J untuk ${h.usahaBeban} J`;
    label(ctx, teks, W / 2, H - 14, { rata: 'center', tebal: true, ukuran: 12, warna: '#fff', latar: gagal ? '#b45309' : '#15803d' });
  }
}

/* ---------------------------------------------------------
   12. CERMIN & LENSA — proyektor HP kardus
   Rumus lensa/cermin tipis: 1/f = 1/s + 1/s' ; M = −s'/s (negatif = terbalik).
   Lensa/cermin cekung-cembung dengan tanda f sesuai jenisnya.
   Gambar di layar (jarak D) tajam bila D ≈ s' ; perbesaran di layar ≈ D/s.
   Kecerahan ∝ (diameter/s)² ÷ perbesaran²  (cahaya yang dikumpulkan dibagi luas gambar).
   --------------------------------------------------------- */
const KOMPONEN_OPTIK = {
  lensaCembung: { nama: 'Lensa cembung (lup)', tanda: 1, cermin: false, pantul: 1, harga: d => 5000 + 3000 * d },
  lensaCekung:  { nama: 'Lensa cekung', tanda: -1, cermin: false, pantul: 1, harga: () => 10000 },
  cerminCekung: { nama: 'Cermin cekung (cermin rias)', tanda: 1, cermin: true, pantul: 0.85, harga: d => 12000 + 2000 * d },
  cerminCembung:{ nama: 'Cermin cembung', tanda: -1, cermin: true, pantul: 0.85, harga: () => 12000 }
};
const LEBAR_HP = 7; // cm, lebar layar HP

function hitungOptik(v) {
  const K = KOMPONEN_OPTIK[v.komponen];
  const f = K.tanda * +v.fokus, s = +v.jarakBenda, D = +v.jarakLayar, d = +v.diameter;
  const takHingga = Math.abs(1 / f - 1 / s) < 1e-6;
  const sb = takHingga ? Infinity : 1 / (1 / f - 1 / s);           // jarak bayangan (cm); negatif = maya
  const M = takHingga ? Infinity : -sb / s;
  const nyata = sb > 0 && isFinite(sb);
  const tajam = nyata ? Math.max(0, 1 - Math.abs(D - sb) / (0.08 * sb)) : 0;
  const Mlayar = nyata ? D / s : 0;
  const lebar = nyata ? LEBAR_HP * Mlayar : 0;
  const terang = nyata ? 57600 * K.pantul * Math.pow(d / s, 2) / Math.pow(Mlayar, 2) : 0;
  const terbalikHP = v.hp === 'terbalik';
  const tegakDiLayar = nyata ? (M < 0) === terbalikHP : false;     // lensa membalik; HP terbalik membalik lagi
  const sifat = !isFinite(sb) ? 'Tidak terbentuk (benda tepat di titik fokus)'
    : `${nyata ? 'Nyata' : 'Maya'}, ${M < 0 ? 'terbalik' : 'tegak'}, ${Math.abs(M) > 1.001 ? 'diperbesar' : Math.abs(M) < 0.999 ? 'diperkecil' : 'sama besar'}`;
  const biaya = K.harga(d) + 5000;
  return {
    bayangan: isFinite(sb) ? bulat(sb, 1) : '∞', perbesaran: isFinite(M) ? bulat(Math.abs(M), 2) : '∞', sifat,
    lebar: Math.round(lebar), tajam: Math.round(tajam * 100), terang: Math.round(terang),
    arah: !nyata ? '—' : tegakDiLayar ? 'Tegak' : 'Terbalik', biaya,
    _nyata: nyata, _sb: sb, _M: M, _f: f, _tegak: tegakDiLayar, _K: K, _tajam: tajam
  };
}

function kriteriaOptik(v, h) {
  return [
    { teks: 'Bayangan nyata (bisa ditangkap dinding)', lulus: h._nyata, nilai: h.sifat },
    { teks: 'Gambar tajam (≥ 80%)', lulus: h.tajam >= 80, nilai: `${h.tajam}%` },
    { teks: 'Lebar gambar ≥ 60 cm', lulus: h.lebar >= 60, nilai: `${h.lebar} cm` },
    { teks: 'Cukup terang (≥ 40)', lulus: h.terang >= 40, nilai: `${h.terang}` },
    { teks: 'Gambar tegak (tidak terbalik) di dinding', lulus: h._tegak, nilai: h.arah },
    { teks: 'Biaya ≤ Rp 50.000', lulus: h.biaya <= 50000, nilai: rp(h.biaya) }
  ];
}

// "film" yang tampil di layar HP: langit, matahari, bukit, dan perahu
function gambarFilm(ctx, x, y, w, h, balik) {
  ctx.save(); ctx.translate(x, y); if (balik) ctx.rotate(Math.PI);
  ctx.fillStyle = '#7dd3fc'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(w * 0.25, -h * 0.22, Math.min(w, h) * 0.14, 0, 7); ctx.fill();
  ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.moveTo(-w / 2, h / 2); ctx.lineTo(-w * 0.15, -h * 0.05); ctx.lineTo(w * 0.2, h * 0.2); ctx.lineTo(w / 2, h * 0.05); ctx.lineTo(w / 2, h / 2); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#b45309'; ctx.fillRect(-w * 0.35, h * 0.25, w * 0.22, h * 0.08);
  ctx.restore();
}

function gambarOptik(ctx, W, H, v, h, p) {
  ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H); // ruang kelas digelapkan
  if (latar(ctx, W, H, 'bg-kelas-gelap')) { ctx.fillStyle = 'rgba(15,23,42,.35)'; ctx.fillRect(0, 0, W, H); }
  const K = h._K, s = +v.jarakBenda, D = +v.jarakLayar, f = h._f, sumbuY = H * 0.5;
  const cermin = K.cermin;
  // skala horizontal terpisah: sisi benda (cm kecil) & sisi layar (cm besar)
  const xE = cermin ? W * 0.84 : W * 0.34;         // posisi lensa/cermin
  const kiriBenda = cermin ? -1 : -1;              // benda selalu di kiri komponen
  // skala menyesuaikan jarak yang dipakai agar HP, titik fokus, bayangan & dinding tetap terlihat
  const sBenda = (W * 0.26) / Math.max(s * 1.15, Math.abs(f) * 2.2, 12);
  const sLayar = (cermin ? W * 0.7 : W * 0.58) / Math.max(D * 1.05, h._sb > 0 && isFinite(h._sb) ? h._sb * 1.05 : 0, 50);
  const xBenda = xE + kiriBenda * s * sBenda;
  const xLayar = cermin ? xE - D * sLayar : xE + D * sLayar;
  const xBay = !isFinite(h._sb) ? null : cermin ? xE - h._sb * (h._sb > 0 ? sLayar : sBenda) : xE + h._sb * (h._sb > 0 ? sLayar : sBenda);
  // sumbu utama
  ctx.strokeStyle = 'rgba(148,163,184,.4)'; ctx.lineWidth = 1; ctx.setLineDash([6, 6]);
  ctx.beginPath(); ctx.moveTo(0, sumbuY); ctx.lineTo(W, sumbuY); ctx.stroke(); ctx.setLineDash([]);
  // kotak kardus di sekitar HP & lensa (proyektor)
  if (!cermin) { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3; ctx.strokeRect(Math.min(xBenda, xE) - 26, sumbuY - 62, Math.abs(xE - xBenda) + 40, 124); label(ctx, 'kotak kardus', Math.min(xBenda, xE) - 22, sumbuY + 74, { ukuran: 10, warna: '#fbbf24' }); }
  // titik fokus
  const xF = x => cermin ? xE - x : xE + x;
  [f, -f].forEach(ff => { if (Math.abs(ff) * sBenda < W) { const x = cermin ? xE - Math.abs(f) * sBenda * Math.sign(ff) : xE + ff * sBenda; ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(x, sumbuY, 3.5, 0, 7); ctx.fill(); label(ctx, 'F', x, sumbuY + 14, { rata: 'center', ukuran: 10, warna: '#fbbf24' }); } });
  void xF;
  // HP (benda)
  const hpH = 46, hpW = 26;
  if (!benda(ctx, 'hp-layar', xBenda, sumbuY - hpH / 2, hpH, { rot: Math.PI / 2 + (v.hp === 'terbalik' ? Math.PI : 0) })) {
    ctx.fillStyle = '#1f2937'; kotakBulat(ctx, xBenda - 5, sumbuY - hpH, 10, hpH, 3); ctx.fill();
    gambarFilm(ctx, xBenda, sumbuY - hpH / 2, 8, hpH - 8, v.hp === 'terbalik');
  }
  label(ctx, v.hp === 'terbalik' ? 'HP (diputar terbalik)' : 'HP', xBenda, sumbuY + 26, { rata: 'center', ukuran: 10, warna: '#cbd5e1' });
  // komponen optik
  const tinggiK = 30 + +v.diameter * 7;
  ctx.strokeStyle = '#7dd3fc'; ctx.fillStyle = 'rgba(125,211,252,.25)'; ctx.lineWidth = 2.5;
  if (!cermin) {
    const tebal = K.tanda > 0 ? 9 : -6;
    ctx.beginPath(); ctx.moveTo(xE, sumbuY - tinggiK); ctx.quadraticCurveTo(xE + tebal, sumbuY, xE, sumbuY + tinggiK); ctx.quadraticCurveTo(xE - tebal, sumbuY, xE, sumbuY - tinggiK);
    if (K.tanda < 0) { ctx.moveTo(xE - 7, sumbuY - tinggiK); ctx.lineTo(xE + 7, sumbuY - tinggiK); ctx.moveTo(xE - 7, sumbuY + tinggiK); ctx.lineTo(xE + 7, sumbuY + tinggiK); }
    ctx.fill(); ctx.stroke();
  } else {
    const lengkung = K.tanda > 0 ? 12 : -12;
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(xE, sumbuY - tinggiK); ctx.quadraticCurveTo(xE + lengkung, sumbuY, xE, sumbuY + tinggiK); ctx.stroke();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; for (let k = -tinggiK; k < tinggiK; k += 7) { ctx.beginPath(); ctx.moveTo(xE + 5 + Math.abs(lengkung) * 0.5, sumbuY + k); ctx.lineTo(xE + 11 + Math.abs(lengkung) * 0.5, sumbuY + k + 5); ctx.stroke(); }
  }
  label(ctx, K.nama, xE, sumbuY - tinggiK - 14, { rata: 'center', ukuran: 11, tebal: true, warna: '#7dd3fc' });
  // dinding/layar
  ctx.fillStyle = '#e2e8f0'; ctx.fillRect(xLayar - 4, 18, 8, H - 36);
  label(ctx, `dinding (${D} cm)`, xLayar, H - 10, { rata: 'center', ukuran: 10, warna: '#cbd5e1' });
  // sinar-sinar istimewa dari ujung HP (tampil bertahap)
  const tipY = sumbuY - hpH, qs = mulus(jepit(p / 0.55, 0, 1));
  const arahKeluar = cermin ? -1 : 1;
  // tinggi panah bayangan: sebanding perbesaran, dibatasi agar muat di kanvas
  const bayY = isFinite(h._M) ? sumbuY + (tipY - sumbuY) * h._M * Math.min(1, 3 / Math.max(1, Math.abs(h._M))) : sumbuY;
  const sinar = (titik, warna) => {
    ctx.strokeStyle = warna; ctx.lineWidth = 1.6; ctx.beginPath();
    const total = titik.length - 1, sampai = qs * total;
    for (let i = 0; i <= Math.floor(sampai) && i < titik.length; i++) (i ? ctx.lineTo(titik[i][0], titik[i][1]) : ctx.moveTo(titik[i][0], titik[i][1]));
    const i0 = Math.floor(sampai); if (i0 < total) { const a = titik[i0], b = titik[i0 + 1], k = sampai - i0; ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); }
    ctx.stroke();
  };
  const xUjung = arahKeluar > 0 ? W : 0;
  if (xBay !== null) {
    // 1) sejajar sumbu → melewati bayangan; 2) melalui pusat → melewati bayangan
    const tuju = [xBay, bayY];
    const lanjut = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1]; const k = (xUjung - a[0]) / (dx || 1e-6); return h._nyata ? [xUjung, a[1] + dy * Math.max(k, 1)] : [xUjung, a[1] - dy * Math.abs((xUjung - a[0]) / (dx || 1e-6))]; };
    const titikLensa1 = [xE, tipY];
    const p1 = h._nyata ? [xBenda, tipY] : [xBenda, tipY];
    sinar([p1, titikLensa1, h._nyata ? tuju : lanjut(titikLensa1, tuju), h._nyata ? lanjut(titikLensa1, tuju) : lanjut(titikLensa1, tuju)], 'rgba(250,204,21,.85)');
    const titikLensa2 = [xE, sumbuY];
    sinar([[xBenda, tipY], titikLensa2, h._nyata ? tuju : lanjut([xBenda, tipY], titikLensa2), lanjut(titikLensa2, h._nyata ? tuju : [xE + (xE - xBenda), sumbuY + (sumbuY - tipY)])], 'rgba(244,114,182,.85)');
    if (!h._nyata && p > 0.55) { // perpanjangan putus-putus ke bayangan maya
      ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(250,204,21,.5)'; ctx.beginPath(); ctx.moveTo(xE, tipY); ctx.lineTo(xBay, bayY); ctx.moveTo(xE, sumbuY); ctx.lineTo(xBay, bayY); ctx.stroke(); ctx.setLineDash([]);
    }
    // bayangan (panah)
    if (p > 0.55) {
      ctx.strokeStyle = h._nyata ? '#f472b6' : 'rgba(244,114,182,.6)'; ctx.lineWidth = 3; if (!h._nyata) ctx.setLineDash([5, 4]);
      panah(ctx, xBay, sumbuY, xBay, bayY, h._nyata ? '#f472b6' : 'rgba(244,114,182,.6)', 3); ctx.setLineDash([]);
      label(ctx, h._nyata ? 'bayangan nyata' : 'bayangan maya', xBay, bayY + (bayY < sumbuY ? -12 : 12), { rata: 'center', ukuran: 10, warna: '#f9a8d4' });
    }
  } else if (p > 0.55) label(ctx, 'Sinar keluar sejajar — bayangan tidak terbentuk', W / 2, 30, { rata: 'center', ukuran: 11, warna: '#fbbf24' });
  // gambar di dinding
  const muncul = mulus(jepit((p - 0.6) / 0.35, 0, 1));
  if (h._nyata && muncul > 0) {
    const tinggiGambar = jepit(h.lebar * 0.75 / 150, 0.2, 1) * (H - 80);
    const layarHP = aset('hp-layar');
    const lebarGambar = layarHP ? tinggiGambar * 0.3 : Math.min(60, tinggiGambar * 0.6);
    const gx = xLayar - lebarGambar / 2; // gambar jatuh tepat di dinding
    ctx.save(); ctx.globalAlpha = muncul * jepit(h.terang / 100, 0.08, 1);
    if (h._tajam < 0.95) ctx.filter = `blur(${Math.round((1 - h._tajam) * 8)}px)`;
    if (layarHP) { // isi layar HP (tata surya) diproyeksikan; matahari di atas = tegak
      const iw = layarHP.naturalWidth, ih = layarHP.naturalHeight;
      ctx.translate(gx + lebarGambar / 2, sumbuY); ctx.rotate(Math.PI / 2 + (h._tegak ? 0 : Math.PI));
      ctx.drawImage(layarHP, iw * 0.05, ih * 0.1, iw * 0.9, ih * 0.8, -tinggiGambar / 2, -lebarGambar / 2, tinggiGambar, lebarGambar);
    } else gambarFilm(ctx, gx + lebarGambar / 2, sumbuY, lebarGambar, tinggiGambar, !h._tegak);
    ctx.restore();
  } else if (!h._nyata && muncul > 0) {
    const g2 = ctx.createRadialGradient(xLayar, sumbuY, 4, xLayar, sumbuY, 60);
    g2.addColorStop(0, `rgba(255,255,255,${0.25 * muncul})`); g2.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(xLayar, sumbuY, 60, 0, 7); ctx.fill();
  }
  label(ctx, `f = ${fx(Math.abs(f))} cm · s = ${s} cm · s' = ${h.bayangan === '∞' ? '∞' : fx(h.bayangan)} cm`, 12, 16, { ukuran: 11, tebal: true, warna: '#e2e8f0', latar: 'rgba(15,23,42,.8)' });
  if (p >= 1) {
    const ok = h._nyata && h.tajam >= 80 && h.lebar >= 60 && h.terang >= 40 && h._tegak;
    const teks = !h._nyata ? 'Bayangan maya — tidak bisa ditangkap dinding' : `${h.sifat} · lebar ${h.lebar} cm · tajam ${h.tajam}% · terang ${h.terang}`;
    label(ctx, teks, W / 2, H - 30, { rata: 'center', tebal: true, ukuran: 12, warna: '#fff', latar: ok ? '#15803d' : '#b45309' });
  }
}

/* ---------------------------------------------------------
   13. GETARAN & GELOMBANG BUNYI — senar alat musik petik
   Hukum Mersenne: f = (1 / 2L) · √(T / μ). Tegangan T dari botol air yang digantung.
   Kenyaringan dipengaruhi amplitudo petikan & kotak resonansi — BUKAN tinggi nada.
   --------------------------------------------------------- */
const SENAR_BUNYI = {
  karet: { nama: 'Karet gelang', mu: 0.0012, putus: 15, db: -8, harga: 1000, warna: '#b45309' },
  nilon: { nama: 'Senar pancing nilon 0,5 mm', mu: 2.24e-4, putus: 60, db: 0, harga: 5000, warna: '#e2e8f0' },
  baja:  { nama: 'Senar baja 0,3 mm', mu: 5.55e-4, putus: 100, db: 3, harga: 8000, warna: '#94a3b8' }
};
const RESONATOR = { tanpa: { nama: 'Papan tanpa kotak', db: 0, harga: 2000 }, kaleng: { nama: 'Kaleng bekas', db: 6, harga: 3000 }, kardus: { nama: 'Kotak kardus', db: 10, harga: 2000 } };
const NAMA_NADA = [['C', 'do'], ['C#', 'di'], ['D', 're'], ['D#', 'ri'], ['E', 'mi'], ['F', 'fa'], ['F#', 'fi'], ['G', 'sol'], ['G#', 'sel'], ['A', 'la'], ['A#', 'li'], ['B', 'si']];
const FREK_TARGET = 440;

function namaNada(f) {
  if (!(f > 0)) return '—';
  const n = Math.round(12 * Math.log2(f / 440)) + 57; // 57 = A4
  const [nm, sol] = NAMA_NADA[((n % 12) + 12) % 12];
  return `${nm}${Math.floor(n / 12)} (${sol})`;
}

function hitungBunyi(v) {
  const S = SENAR_BUNYI[v.senar], R = RESONATOR[v.resonator];
  const L = +v.panjang / 100, T = +v.beban * 9.8;
  const putus = T > S.putus;
  const vGel = Math.sqrt(T / S.mu);               // cepat rambat gelombang di senar (m/s)
  const f = putus ? 0 : vGel / (2 * L);
  const db = putus ? 0 : (v.petikan === 'kuat' ? 62 : 50) + R.db + S.db + 5 * Math.log10(Math.max(T, 0.5) / 20);
  const selisih = f - FREK_TARGET;
  const sen = f > 0 ? 1200 * Math.log2(f / FREK_TARGET) : 0;
  return {
    frekuensi: bulat(f, 1), nada: namaNada(f), selisih: bulat(selisih, 1),
    periode: f > 0 ? bulat(1000 / f, 2) : 0, cepatRambat: Math.round(vGel), lambdaSenar: bulat(2 * L, 2),
    lambdaUdara: f > 0 ? bulat(340 / f, 2) : 0, nyaring: Math.round(db), tegangan: bulat(T, 1),
    status: putus ? 'Senar PUTUS' : Math.abs(selisih) <= 5 ? 'Nada pas' : selisih > 0 ? 'Terlalu tinggi' : 'Terlalu rendah',
    biaya: S.harga + R.harga + 3000,
    _putus: putus, _sen: sen, _S: S, _R: R
  };
}

function kriteriaBunyi(v, h) {
  return [
    { teks: 'Nada A (440 Hz), selisih ≤ 5 Hz', lulus: !h._putus && Math.abs(h.selisih) <= 5, nilai: h._putus ? 'senar putus' : `${h.frekuensi} Hz (${h.nada})` },
    { teks: 'Cukup nyaring (≥ 65 dB pada jarak 1 m)', lulus: h.nyaring >= 65, nilai: `${h.nyaring} dB` },
    { teks: 'Senar tidak putus', lulus: !h._putus, nilai: `tegangan ${h.tegangan} N (batas ${h._S.putus} N)` },
    { teks: 'Biaya ≤ Rp 15.000', lulus: h.biaya <= 15000, nilai: rp(h.biaya) }
  ];
}

// Membunyikan nada petikan (dipanggil setelah murid menekan tombol Uji)
let konteksAudio = null;
function suaraBunyi(v, h) {
  if (h._putus || !(h.frekuensi > 0) || typeof window === 'undefined') return;
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
  konteksAudio = konteksAudio || new AC();
  const ac = konteksAudio, t0 = ac.currentTime + 0.05;
  const keras = jepit((h.nyaring - 40) / 40, 0.05, 0.6);
  const g = ac.createGain(); g.connect(ac.destination);
  g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(keras, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + (v.senar === 'karet' ? 0.6 : 1.8));
  [[1, 1], [2, 0.35], [3, 0.15]].forEach(([k, a]) => { // nada dasar + harmonik
    const o = ac.createOscillator(), ga = ac.createGain(); o.type = 'sine'; o.frequency.value = Math.min(h.frekuensi * k, 8000); ga.gain.value = a;
    o.connect(ga); ga.connect(g); o.start(t0); o.stop(t0 + 2);
  });
}

function gambarBunyi(ctx, W, H, v, h, p) {
  const S = h._S, meja = H * 0.72;
  if (!latar(ctx, W, H, 'bg-pentas', 0.74, meja)) {
    ctx.fillStyle = '#fef3c7'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#a16207'; ctx.fillRect(0, meja, W, H - meja);
  }
  // kotak resonansi
  const kiri = W * 0.06, lebarMaks = W * 0.56, Lpx = lebarMaks * (+v.panjang / 60);
  const kx = kiri, ky = meja - 70, kw = lebarMaks + 30;
  if (v.resonator === 'kardus') { ctx.fillStyle = '#c8a26b'; ctx.fillRect(kx, ky, kw, 70); ctx.fillStyle = '#3f2a14'; ctx.beginPath(); ctx.arc(kx + kw * 0.55, ky + 38, 16, 0, 7); ctx.fill(); }
  else if (v.resonator === 'kaleng') { ctx.fillStyle = '#cbd5e1'; ctx.fillRect(kx, ky + 20, kw, 50); ctx.strokeStyle = '#94a3b8'; for (let y = ky + 26; y < ky + 70; y += 8) { ctx.beginPath(); ctx.moveTo(kx, y); ctx.lineTo(kx + kw, y); ctx.stroke(); } }
  else { ctx.fillStyle = '#92400e'; ctx.fillRect(kx, ky + 56, kw, 14); }
  // jembatan senar & katrol
  const yS = v.resonator === 'tanpa' ? ky + 44 : ky - 6, x1 = kx + 14, x2 = x1 + Lpx;
  ctx.fillStyle = '#1f2937'; [x1, x2].forEach(x => { ctx.beginPath(); ctx.moveTo(x - 6, yS + 10); ctx.lineTo(x, yS); ctx.lineTo(x + 6, yS + 10); ctx.fill(); });
  const katrolX = kx + kw + 22; ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(katrolX, yS + 8, 9, 0, 7); ctx.fill();
  // botol beban
  const botH = 20 + Math.min(60, +v.beban * 10), botY = meja + 8;
  ctx.strokeStyle = S.warna === '#e2e8f0' ? '#cbd5e1' : S.warna; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(katrolX + 9, yS + 8); ctx.lineTo(katrolX + 9, botY); ctx.stroke();
  const tinggiBotol = 28 + Math.min(72, +v.beban * 11);
  const adaBotol = benda(ctx, 'botol-beban', katrolX + 9, botY - tinggiBotol * 0.1, tinggiBotol * 86 / 320, { ay: 0 });
  if (!adaBotol) { ctx.fillStyle = 'rgba(56,189,248,.7)'; kotakBulat(ctx, katrolX - 2, botY, 22, botH, 5); ctx.fill(); ctx.strokeStyle = '#0369a1'; ctx.stroke(); }
  const lebarSasando = Math.min(56, W * 0.072); // hiasan: sasando asli dari Rote (tidak menutupi penala)
  benda(ctx, 'sasando', W - lebarSasando / 2 - 4, meja + 2, lebarSasando, { ay: 1, alpha: 0.95 });
  label(ctx, `${fx(+v.beban, 2)} kg`, katrolX + 9, (adaBotol ? botY + tinggiBotol * 0.9 : botY + botH) + 12, { rata: 'center', ukuran: 10, warna: '#fff', latar: 'rgba(3,105,161,.8)' });
  // senar bergetar (gelombang berdiri, amplitudo meluruh)
  const petik = p > 0.12, luruh = petik ? Math.exp(-(p - 0.12) * (v.senar === 'karet' ? 6 : 2.2)) : 0;
  const amp = (v.petikan === 'kuat' ? 12 : 6) * luruh;
  const fase = p * 60 * Math.max(0.3, Math.min(3, h.frekuensi / 300));
  if (h._putus && petik) {
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x1, yS); ctx.quadraticCurveTo(x1 + Lpx * 0.25, yS - 30, x1 + Lpx * 0.35, yS + 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(katrolX, yS); ctx.quadraticCurveTo(x2 + 10, yS - 20, x2 - Lpx * 0.3, yS + 26); ctx.stroke();
    label(ctx, 'SENAR PUTUS!', (x1 + x2) / 2, yS - 34, { rata: 'center', tebal: true, warna: '#fff', latar: '#dc2626' });
  } else {
    ctx.strokeStyle = S.warna === '#e2e8f0' ? '#64748b' : S.warna; ctx.lineWidth = v.senar === 'karet' ? 3 : 1.6;
    ctx.beginPath();
    for (let k = 0; k <= 60; k++) { const u = k / 60; ctx.lineTo(x1 + u * Lpx, yS - amp * Math.sin(Math.PI * u) * Math.cos(fase)); }
    ctx.lineTo(katrolX, yS); ctx.stroke();
    if (petik && amp > 0.5) label(ctx, 'perut', (x1 + x2) / 2, yS - 22, { rata: 'center', ukuran: 9, warna: '#92400e' });
  }
  label(ctx, `L = ${v.panjang} cm`, (x1 + x2) / 2, yS + 22, { rata: 'center', ukuran: 10, warna: '#78350f', latar: 'rgba(255,255,255,.8)' });
  // gelombang bunyi memancar dari kotak
  if (petik && !h._putus) {
    const kuat = jepit((h.nyaring - 45) / 30, 0.1, 1) * luruh;
    const sela = jepit(h.lambdaUdara * 30, 10, 40);
    for (let k = 0; k < 6; k++) {
      const r = ((p * 200) % sela) + k * sela;
      ctx.strokeStyle = `rgba(234,88,12,${kuat * (1 - k / 6)})`; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(kx + kw * 0.55, ky + 30, 20 + r, -Math.PI * 0.95, -Math.PI * 0.05); ctx.stroke();
    }
  }
  // osiloskop: gelombang senar vs nada acuan 440 Hz
  const ox = W * 0.68, oy = 14, ow = W * 0.3, oh = H * 0.36;
  ctx.fillStyle = '#0f172a'; kotakBulat(ctx, ox, oy, ow, oh, 8); ctx.fill();
  ctx.strokeStyle = 'rgba(148,163,184,.25)'; ctx.lineWidth = 1; for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(ox + ow * k / 5, oy); ctx.lineTo(ox + ow * k / 5, oy + oh); ctx.stroke(); }
  const jendela = 0.01; // 10 ms
  const gelombang = (f, warna, a, garis) => { ctx.strokeStyle = warna; ctx.lineWidth = 1.8; if (garis) ctx.setLineDash([4, 3]); ctx.beginPath(); for (let k = 0; k <= 120; k++) { const t = k / 120 * jendela; ctx.lineTo(ox + ow * k / 120, oy + oh / 2 - a * Math.sin(2 * Math.PI * f * t)); } ctx.stroke(); ctx.setLineDash([]); };
  gelombang(FREK_TARGET, 'rgba(148,163,184,.6)', oh * 0.3, true);
  if (petik && !h._putus) gelombang(h.frekuensi, '#4ade80', oh * 0.38 * Math.max(0.15, luruh) * (v.petikan === 'kuat' ? 1 : 0.55), false);
  label(ctx, 'osiloskop · 10 ms', ox + 6, oy + 10, { ukuran: 9, warna: '#94a3b8' });
  label(ctx, '- - acuan 440 Hz', ox + ow - 6, oy + oh - 9, { rata: 'right', ukuran: 9, warna: '#94a3b8' });
  // penala (tuner)
  const tx = ox + ow / 2, ty = oy + oh + 64, tr = 44;
  ctx.strokeStyle = '#334155'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(tx, ty, tr, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
  ctx.strokeStyle = '#16a34a'; ctx.beginPath(); ctx.arc(tx, ty, tr, Math.PI * 1.47, Math.PI * 1.53); ctx.stroke();
  if (petik && !h._putus) {
    const a = -Math.PI / 2 + jepit(h._sen / 100, -1, 1) * 0.35 * Math.PI;
    ctx.strokeStyle = Math.abs(h.selisih) <= 5 ? '#16a34a' : '#dc2626'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + Math.cos(a) * (tr - 6), ty + Math.sin(a) * (tr - 6)); ctx.stroke();
  }
  label(ctx, petik && !h._putus ? `${h.nada} · ${fx(h.frekuensi)} Hz` : 'penala', tx, ty + 14, { rata: 'center', ukuran: 11, tebal: true, warna: '#0f172a' });
  if (p >= 1) {
    const ok = !h._putus && Math.abs(h.selisih) <= 5 && h.nyaring >= 65;
    const teks = h._putus ? `Senar putus — tegangan ${h.tegangan} N melebihi batas ${S.putus} N` : `${h.status} · ${fx(h.frekuensi)} Hz (${h.nada}) · ${h.nyaring} dB`;
    label(ctx, teks, W / 2, H - 14, { rata: 'center', tebal: true, ukuran: 12, warna: '#fff', latar: ok ? '#15803d' : h._putus ? '#b91c1c' : '#b45309' });
  }
}

/* ---------------------------------------------------------
   14. RUMAH ANTI GEMPA — miniatur kardus di atas meja getar
   Rumah = sistem pegas–massa (1 derajat kebebasan): k = kekakuan lantai / jumlah lantai,
   m = (kardus + beban uji 250 g) × lantai + atap.  Frekuensi alami fn = (1/2π)·√(k/m).
   Meja getar 3 Hz, amplitudo A.  Penguatan dinamis DAF = 1/√((1−r²)² + (2ζr)²), r = 3/fn
   → resonansi bila fn ≈ 3 Hz.  Fondasi isolasi meredam percepatan yang masuk (transmisibilitas T).
   Simpangan atap x = A·r²·DAF·T ; gaya geser V = m·(2πfn)²·x dibanding kekuatan sambungan.
   --------------------------------------------------------- */
const PENGAKU_GEMPA = {
  tanpa:   { nama: 'Tanpa pengaku', k: 150, kuat: 0.5, harga: 0 },
  silang:  { nama: 'Bresing silang (tusuk sate)', k: 900, kuat: 1.4, harga: 1500 },
  dinding: { nama: 'Dinding geser (kardus dobel)', k: 2200, kuat: 2, harga: 3000 }
};
const SAMBUNGAN_GEMPA = {
  selotip: { nama: 'Selotip', k: 0.7, kuat: 4, harga: 2000 },
  lem:     { nama: 'Lem kertas', k: 1, kuat: 7, harga: 3000 },
  pasak:   { nama: 'Lem + pasak tusuk sate', k: 1.25, kuat: 11, harga: 5000 }
};
const FONDASI_GEMPA = {
  tempel:   { nama: 'Ditempel langsung ke meja', f: 0, z: 0, geser: 0, harga: 0 },
  karet:    { nama: 'Bantalan karet sandal', f: 1.3, z: 0.15, geser: 0.1, harga: 6000 },
  kelereng: { nama: 'Kelereng di tutup botol', f: 0.6, z: 0.05, geser: 0.6, harga: 8000 }
};
const ATAP_GEMPA = { ringan: { nama: 'Ringan (seng/kertas)', m: 0.05, harga: 4000 }, berat: { nama: 'Berat (genteng tiruan)', m: 0.45, harga: 2000 } };
const FREK_MEJA = 3, AMPLITUDO_UJI = 2, TINGGI_LANTAI = 0.15;

function hitungGempa(v) {
  const n = +v.lantai, P = PENGAKU_GEMPA[v.pengaku], Sb = SAMBUNGAN_GEMPA[v.sambungan], F = FONDASI_GEMPA[v.fondasi], At = ATAP_GEMPA[v.atap];
  const A = +v.amplitudo / 100, wg = 2 * Math.PI * FREK_MEJA, pga = A * wg * wg;
  const m = n * 0.25 + At.m, k = P.k * Sb.k / n;
  const wn = Math.sqrt(k / m), fn = wn / (2 * Math.PI);
  let T = 1;
  if (F.f) { const r = FREK_MEJA / F.f; T = Math.sqrt(1 + (2 * F.z * r) ** 2) / Math.sqrt((1 - r * r) ** 2 + (2 * F.z * r) ** 2); }
  const rs = FREK_MEJA / fn, zeta = 0.06;
  const daf = 1 / Math.sqrt((1 - rs * rs) ** 2 + (2 * zeta * rs) ** 2);
  const x = A * rs * rs * daf * T;                  // m, simpangan atap relatif terhadap dasar rumah
  const drift = x / (n * TINGGI_LANTAI) * 100;      // % simpangan antar-lantai rata-rata
  const V = m * wn * wn * x, C = Sb.kuat * P.kuat;  // N
  const runtuh = drift > 4 || V > C, retak = !runtuh && (drift > 1.5 || V > 0.7 * C);
  const geser = F.geser * +v.amplitudo;             // cm, pergeseran permanen (kelereng tak kembali ke tengah)
  const biaya = n * 2000 + P.harga * n + Sb.harga + F.harga + At.harga + 2000;
  return {
    frekuensiAlami: bulat(fn, 2), penguatan: bulat(daf * T, 2), simpangan: bulat(x * 100, 2), drift: bulat(drift, 2),
    gaya: bulat(V, 1), kekuatan: bulat(C, 1), geser: bulat(geser, 1), massa: bulat(m, 2), biaya,
    status: runtuh ? 'RUNTUH' : retak ? 'Retak' : 'Aman',
    _runtuh: runtuh, _retak: retak, _daf: daf, _T: T, _P: P, _Sb: Sb, _F: F, _At: At
  };
}

function kriteriaGempa(v, h) {
  const u = +v.amplitudo === AMPLITUDO_UJI ? h : hitungGempa({ ...v, amplitudo: AMPLITUDO_UJI }); // dinilai pada guncangan uji
  return [
    { teks: `Tidak runtuh pada guncangan uji ${AMPLITUDO_UJI} cm`, lulus: !u._runtuh, nilai: u._runtuh ? `runtuh (gaya ${u.gaya} N vs kuat ${u.kekuatan} N)` : 'berdiri' },
    { teks: 'Tidak retak: simpangan antar-lantai ≤ 1,5%', lulus: !u._runtuh && !u._retak, nilai: `${u.drift}%` },
    { teks: 'Tetap di atas fondasi: geser permanen ≤ 1 cm', lulus: u.geser <= 1, nilai: `${u.geser} cm` },
    { teks: 'Rumah 2 lantai (sesuai kebutuhan warga)', lulus: +v.lantai === 2, nilai: `${v.lantai} lantai` },
    { teks: 'Biaya ≤ Rp 25.000', lulus: u.biaya <= 25000, nilai: rp(u.biaya) }
  ];
}

function gambarGempa(ctx, W, H, v, h, p) {
  const n = +v.lantai, lantaiY = H - 34;
  // ruang uji
  const gr = ctx.createLinearGradient(0, 0, 0, lantaiY);
  gr.addColorStop(0, '#e0f2fe'); gr.addColorStop(1, '#f8fafc');
  ctx.fillStyle = gr; ctx.fillRect(0, 0, W, lantaiY);
  ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, lantaiY, W, H - lantaiY);
  // gerak meja getar: bergetar setelah p > 0.08; visual diperlambat agar terlihat
  const aktif = p > 0.08 && p < 0.97, t = (p - 0.08) * 9;
  const skala = 7;                                        // px per cm
  const gx = aktif ? Math.sin(2 * Math.PI * t) * +v.amplitudo * skala : 0;
  const mejaY = lantaiY - 26, mejaX = W * 0.36;
  ctx.fillStyle = '#475569'; ctx.fillRect(mejaX - 150, mejaY + 14, 20, 12); ctx.fillRect(mejaX + 130, mejaY + 14, 20, 12);
  ctx.fillStyle = '#92400e'; kotakBulat(ctx, mejaX - 160 + gx, mejaY, 320, 14, 3); ctx.fill();
  label(ctx, `meja getar ${FREK_MEJA} Hz · ${fx(+v.amplitudo, 2)} cm`, 12, 40, { ukuran: 10, warna: '#334155', latar: 'rgba(255,255,255,.9)' });
  if (aktif) { panah(ctx, mejaX + 170, mejaY + 7, mejaX + 170 + (gx > 0 ? 16 : -16), mejaY + 7, '#b45309', 2); }
  // fondasi (isolasi) — rumah di atasnya ikut bergerak lebih kecil
  const F = h._F, lebar = 110, bx = mejaX + gx;
  let dasarX = bx, dasarY = mejaY;
  const geserVisual = h.geser * skala * mulus(jepit((p - 0.2) / 0.7, 0, 1));
  if (v.fondasi === 'karet') {
    dasarX = mejaX + gx * h._T + geserVisual * (1 - p);
    ctx.fillStyle = '#1f2937'; [-40, 0, 40].forEach(d => { ctx.beginPath(); ctx.moveTo(bx + d - 12, mejaY); ctx.lineTo(dasarX + d - 12, mejaY - 10); ctx.lineTo(dasarX + d + 12, mejaY - 10); ctx.lineTo(bx + d + 12, mejaY); ctx.fill(); });
    dasarY = mejaY - 10;
  } else if (v.fondasi === 'kelereng') {
    dasarX = mejaX + gx * h._T + geserVisual;
    ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#94a3b8';
    [-40, 0, 40].forEach(d => { ctx.fillRect(bx + d - 12, mejaY - 4, 24, 4); ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(dasarX + d, mejaY - 9, 5, 0, 7); ctx.fill(); ctx.fillStyle = '#e2e8f0'; });
    dasarY = mejaY - 14;
  }
  ctx.fillStyle = '#78716c'; ctx.fillRect(dasarX - lebar / 2 - 8, dasarY - 6, lebar + 16, 6); // pelat dasar
  // rumah: goyangan tiap lantai sebanding ketinggian (bentuk ragam geser)
  const tinggiL = Math.min(62, (dasarY - 6 - 40) / (n + 0.8));
  const fase = h._daf > 1 && FREK_MEJA / h.frekuensiAlami > 1 ? Math.PI : 0;
  const ayun = aktif ? Math.sin(2 * Math.PI * t - fase) * Math.min(h.simpangan * skala * 1.2, 70) * jepit(t / 1.5, 0, 1) : 0;
  const q = (h._runtuh ? mulus(jepit((p - 0.45) / 0.35, 0, 1)) : 0); // kemajuan runtuh
  const titik = k => ({ x: dasarX + ayun * (k / n), y: dasarY - 6 - k * tinggiL });
  const P = h._P;
  for (let k = 0; k < n; k++) {
    const a = titik(k), b = titik(k + 1);
    // runtuh: lantai atas "ambruk" menumpuk, dinding miring
    const miring = q * (k % 2 ? -0.35 : 0.45);
    ctx.save();
    ctx.translate(a.x, a.y + q * k * tinggiL * 0.75); ctx.rotate(miring * (k + 1) / n);
    const dx = b.x - a.x, tL = tinggiL * (1 - q * 0.6);
    const kiri = [-lebar / 2, 0], kanan = [lebar / 2, 0], kiriA = [-lebar / 2 + dx, -tL], kananA = [lebar / 2 + dx, -tL];
    if (v.pengaku === 'dinding') { ctx.fillStyle = 'rgba(200,162,107,.9)'; ctx.beginPath(); ctx.moveTo(...kiri); ctx.lineTo(...kanan); ctx.lineTo(...kananA); ctx.lineTo(...kiriA); ctx.closePath(); ctx.fill(); }
    else { ctx.fillStyle = 'rgba(214,190,150,.35)'; ctx.beginPath(); ctx.moveTo(...kiri); ctx.lineTo(...kanan); ctx.lineTo(...kananA); ctx.lineTo(...kiriA); ctx.closePath(); ctx.fill(); }
    ctx.strokeStyle = '#a16207'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(...kiri); ctx.lineTo(...kiriA); ctx.moveTo(...kanan); ctx.lineTo(...kananA); ctx.stroke(); // kolom
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(...kiriA); ctx.lineTo(...kananA); ctx.stroke();                         // balok lantai
    if (v.pengaku === 'silang') { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(...kiri); ctx.lineTo(...kananA); ctx.moveTo(...kanan); ctx.lineTo(...kiriA); ctx.stroke(); }
    // jendela
    ctx.fillStyle = 'rgba(56,189,248,.55)'; ctx.fillRect(-lebar / 4 + dx / 2 - 10, -tL * 0.7, 20, tL * 0.36); ctx.fillRect(lebar / 4 + dx / 2 - 10, -tL * 0.7, 20, tL * 0.36);
    // retak
    if ((h._retak || h._runtuh) && p > 0.35) {
      ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 1.5; ctx.beginPath();
      ctx.moveTo(-lebar / 2 + 6 + dx * 0.9, -tL + 4); ctx.lineTo(-lebar / 2 + 16, -tL * 0.6); ctx.lineTo(-lebar / 2 + 10, -tL * 0.4); ctx.lineTo(-lebar / 2 + 22, -tL * 0.15);
      ctx.moveTo(lebar / 2 - 6 + dx * 0.2, -4); ctx.lineTo(lebar / 2 - 18, -tL * 0.3); ctx.lineTo(lebar / 2 - 12, -tL * 0.5);
      ctx.stroke();
    }
    // beban uji (kantong pasir) di tiap lantai
    ctx.fillStyle = '#d6b27c'; kotakBulat(ctx, -8 + dx * 0.5, -tL * 0.25 - 4, 16, 10, 3); ctx.fill();
    ctx.restore();
  }
  // atap
  const puncak = titik(n), atapQ = q;
  ctx.save(); ctx.translate(puncak.x, puncak.y + atapQ * n * tinggiL * 0.72); ctx.rotate(atapQ * 0.5);
  const berat = v.atap === 'berat';
  ctx.fillStyle = berat ? '#b91c1c' : '#94a3b8'; ctx.beginPath(); ctx.moveTo(-lebar / 2 - 14, 0); ctx.lineTo(lebar / 2 + 14, 0); ctx.lineTo(0, berat ? -40 : -30); ctx.closePath(); ctx.fill();
  if (berat) { ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 1; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-lebar / 2 - 14 + k * 10, -k * 10); ctx.lineTo(lebar / 2 + 14 - k * 10, -k * 10); ctx.stroke(); } }
  ctx.restore();
  if (q > 0.6) label(ctx, 'RUNTUH!', dasarX, dasarY - n * tinggiL * 0.4 - 20, { rata: 'center', tebal: true, warna: '#fff', latar: '#b91c1c' });
  // panah simpangan atap
  if (aktif && !h._runtuh && Math.abs(ayun) > 3) panah(ctx, dasarX, puncak.y - 50, dasarX + ayun * 1.3, puncak.y - 50, '#dc2626', 2);
  // seismograf: gerak meja (abu) vs atap (merah)
  const sx = W * 0.66, sy = 12, sw = W * 0.32, sh = H * 0.34;
  ctx.fillStyle = '#0f172a'; kotakBulat(ctx, sx, sy, sw, sh, 8); ctx.fill();
  const jejak = (amp, warna, geserFase, tebal) => {
    ctx.strokeStyle = warna; ctx.lineWidth = tebal; ctx.beginPath();
    for (let k = 0; k <= 100; k++) { const u = k / 100 * 3; const naik = h._runtuh ? jepit(u / 1.2, 0, 1) : jepit(u / 0.8, 0, 1); ctx.lineTo(sx + 8 + (sw - 16) * k / 100, sy + sh / 2 - amp * naik * Math.sin(2 * Math.PI * u - geserFase)); }
    ctx.stroke();
  };
  const ampMeja = sh * 0.12;
  jejak(ampMeja, 'rgba(148,163,184,.8)', 0, 1.5);
  const lentur = h.simpangan / +v.amplitudo;   // goyangan atap relatif terhadap dasar rumah (penentu kerusakan)
  jejak(Math.min(sh * 0.42, ampMeja * Math.max(0.05, lentur)), '#f87171', fase, 2);
  label(ctx, 'seismograf', sx + 6, sy + 10, { ukuran: 9, warna: '#94a3b8' });
  label(ctx, `lenturan atap ×${fx(lentur, 2)}`, sx + sw - 6, sy + 10, { rata: 'right', ukuran: 10, tebal: true, warna: '#fca5a5' });
  label(ctx, '— meja', sx + sw - 6, sy + sh - 9, { rata: 'right', ukuran: 9, warna: '#94a3b8' });
  // meter resonansi: frekuensi alami vs 3 Hz
  const mx = sx, my = sy + sh + 16, mw = sw;
  ctx.fillStyle = '#e2e8f0'; kotakBulat(ctx, mx, my, mw, 10, 5); ctx.fill();
  const posisi = f => mx + mw * jepit(f / 9, 0, 1);
  ctx.fillStyle = 'rgba(220,38,38,.35)'; ctx.fillRect(posisi(2.3), my, posisi(3.9) - posisi(2.3), 10);
  ctx.fillStyle = '#dc2626'; ctx.fillRect(posisi(FREK_MEJA) - 1, my - 3, 2, 16);
  ctx.fillStyle = '#0f766e'; ctx.beginPath(); ctx.arc(posisi(h.frekuensiAlami), my + 5, 6, 0, 7); ctx.fill();
  label(ctx, `frekuensi alami ${fx(h.frekuensiAlami, 2)} Hz`, mx, my + 26, { ukuran: 10, tebal: true, warna: '#0f766e' });
  label(ctx, 'zona resonansi', posisi(3.1), my - 10, { rata: 'center', ukuran: 9, warna: '#b91c1c' });
  label(ctx, `${n} lantai · ${h._P.nama}`, 12, 16, { ukuran: 11, tebal: true, warna: '#334155', latar: 'rgba(255,255,255,.9)' });
  if (p >= 1) {
    const teks = h._runtuh ? `Runtuh — ${h.drift > 4 ? `simpangan antar-lantai ${fx(h.drift)}%` : `gaya ${fx(h.gaya)} N melebihi kekuatan ${fx(h.kekuatan)} N`}`
      : `${h.status} · simpangan atap ${fx(h.simpangan, 2)} cm (${fx(h.drift)}%)${h.geser > 1 ? ` · bergeser ${fx(h.geser)} cm` : ''}`;
    label(ctx, teks, W / 2, H - 12, { rata: 'center', tebal: true, ukuran: 12, warna: '#fff', latar: h._runtuh ? '#b91c1c' : h._retak || h.geser > 1 ? '#b45309' : '#15803d' });
  }
}

const SIM = {
  gempa: { hitung: hitungGempa, kriteria: kriteriaGempa, gambar: gambarGempa, sumbuX: ['lantai', 'amplitudo'], sumbuY: ['simpangan', 'drift', 'penguatan', 'frekuensiAlami', 'gaya'] },
  bunyi: { hitung: hitungBunyi, kriteria: kriteriaBunyi, gambar: gambarBunyi, suara: suaraBunyi, sumbuX: ['panjang', 'beban'], sumbuY: ['frekuensi', 'nyaring', 'periode', 'cepatRambat'] },
  optik: { hitung: hitungOptik, kriteria: kriteriaOptik, gambar: gambarOptik, sumbuX: ['jarakBenda', 'fokus', 'jarakLayar', 'diameter'], sumbuY: ['lebar', 'tajam', 'terang', 'bayangan'] },
  pesawat: { hitung: hitungPesawat, kriteria: kriteriaPesawat, gambar: gambarPesawat, sumbuX: ['massa', 'panjangTuas', 'lenganBeban'], sumbuY: ['gaya', 'kmNyata', 'efisiensi', 'jarak', 'usahaKuasa'] },
  magnet: { hitung: hitungMagnet, kriteria: kriteriaMagnet, gambar: gambarMagnet, sumbuX: ['lilitan', 'baterai'], sumbuY: ['angkat', 'arus', 'panas', 'medan', 'tahan'] },
  listrik: { hitung: hitungListrik, kriteria: kriteriaListrik, gambar: gambarListrik, sumbuX: ['baterai', 'lampu', 'resistor'], sumbuY: ['cahaya', 'arus', 'tahan', 'arusLampu'] },
  angin: { hitung: hitungAngin, kriteria: kriteriaAngin, gambar: gambarAngin, sumbuX: ['angin', 'jari', 'bilah', 'sudutBilah'], sumbuY: ['daya', 'rpm', 'dayaAngin', 'mulai'] },
  jembatan: { hitung: hitungJembatan, kriteria: kriteriaJembatan, gambar: gambarJembatan, sumbuX: ['tinggi', 'lapis', 'beban'], sumbuY: ['bebanMaks', 'efisiensi', 'stik', 'gaya'] },
  roketair: { hitung: hitungRoketAir, kriteria: kriteriaRoketAir, gambar: gambarRoketAir, sumbuX: ['air', 'tekanan', 'sudut'], sumbuY: ['jarak', 'tinggi', 'kecepatan', 'dorong'] },
  roket: { hitung: hitungRoket, kriteria: kriteriaRoket, gambar: gambarRoket, sumbuX: ['cuka', 'soda', 'sudut'], sumbuY: ['jarak', 'tinggi', 'tekanan', 'gas'] },
  perahu: { hitung: v => hitungPerahu(v), kriteria: kriteriaPerahu, gambar: gambarPerahu, sumbuX: ['panjang', 'lebar', 'tinggi', 'muatan'], sumbuY: ['celup', 'bebas', 'kapasitas', 'biaya'] },
  penjernih: { hitung: hitungPenjernih, kriteria: kriteriaPenjernih, gambar: gambarPenjernih, sumbuX: ['tebalPasir', 'tebalArang', 'ulang'], sumbuY: ['keruh', 'bau', 'debit', 'biaya'] },
  pendingin: { hitung: hitungPendingin, kriteria: kriteriaPendingin, gambar: gambarPendingin, sumbuX: ['tebal', 'es', 'suhu'], sumbuY: ['tahan', 'laju', 'massaKotak', 'biaya'] },
  hidroponik: { hitung: hitungHidroponik, kriteria: kriteriaHidroponik, gambar: gambarHidroponik, sumbuX: ['cahaya', 'jam', 'suhu', 'nutrisi'], sumbuY: ['massa', 'laju', 'biaya'] }
};
