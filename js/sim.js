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
  ctx.fillStyle = '#e0f2fe'; ctx.fillRect(0, 0, W, airY);
  const laut = v.air === 'laut';
  ctx.fillStyle = laut ? '#0e7490' : '#60a5fa'; ctx.globalAlpha = 0.85;
  ctx.fillRect(0, airY, W, H - airY); ctx.globalAlpha = 1;
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
  const kw = Math.min(26, (bw - 10) / Math.max(1, Math.min(n, 5)));
  for (let i = 0; i < n; i++) {
    const baris = Math.floor(i / 5), kol = i % 5;
    const perBaris = Math.min(5, n - baris * 5);
    const x0 = -perBaris * kw / 2 + kol * kw;
    const y0 = -bh - (baris + 1) * kw * 0.8 + 2;
    ctx.fillStyle = '#d6b27c'; kotakBulat(ctx, x0 + 1, y0, kw - 2, kw * 0.8, 5); ctx.fill();
    ctx.strokeStyle = '#8b6b3d'; ctx.lineWidth = 1.2; ctx.stroke();
  }
  if (patah && p > 0.5) {
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(4, -bh * 0.35); ctx.lineTo(-4, -bh * 0.6); ctx.lineTo(8, -bh); ctx.stroke();
  }
  ctx.restore();
  // air depan (menutupi bagian tercelup)
  ctx.fillStyle = laut ? 'rgba(14,116,144,.35)' : 'rgba(96,165,250,.35)';
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
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, W, H);
  const lapis = h._lapis;
  const bx = W / 2 - 55, bw = 110, atas = 58, tinggiBotol = H - 150;
  const skala = tinggiBotol / 34;
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
    label(ctx, `${M.nama} (${tebalLapis(m, v)} cm)`, bx + bw + 14, y + t / 2, { ukuran: 12, warna: '#334155' });
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
  label(ctx, 'Air sungai 150 NTU', bx - 12, atas + 12, { rata: 'right', ukuran: 12, warna: '#78350f' });
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
  ctx.fillStyle = '#fff7ed'; ctx.fillRect(0, 0, W, H);
  const b = BAHAN_DINGIN[v.bahan];
  const jamSim = Math.min(24, h.tahan * 1.15) * p;
  const sisa = Math.max(0, 1 - jamSim / h.tahan);
  // matahari
  ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(W - 48, 42, 20, 0, 7); ctx.fill();
  ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(W - 48 + Math.cos(a) * 26, 42 + Math.sin(a) * 26); ctx.lineTo(W - 48 + Math.cos(a) * 34, 42 + Math.sin(a) * 34); ctx.stroke(); }
  label(ctx, `Udara ${v.suhu} °C`, W - 48, 86, { rata: 'center', ukuran: 12, warna: '#9a3412' });
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
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath(); ctx.ellipse(dalamX + dalamW * 0.5, dasar - 12, dalamW * 0.28, 9, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(dalamX + dalamW * 0.78, dasar - 12); ctx.lineTo(dalamX + dalamW * 0.9, dasar - 20); ctx.lineTo(dalamX + dalamW * 0.9, dasar - 4); ctx.fill();
  const nEs = Math.ceil(+v.es * 2);
  for (let i = 0; i < nEs; i++) {
    const s = 16 * Math.sqrt(sisa);
    if (s < 1) break;
    const ex = dalamX + (i % 6) * (dalamW / 6) + 4, ey = dasar - 30 - Math.floor(i / 6) * 18 - s;
    ctx.fillStyle = 'rgba(186,230,253,.95)'; kotakBulat(ctx, ex, ey + (16 - s), s, s, 3); ctx.fill();
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1; ctx.stroke();
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
  ctx.fillStyle = '#f0fdf4'; ctx.fillRect(0, 0, W, H);
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
  [-sp * 0.55, 0, sp * 0.55].forEach((dx, i) => {
    const px = cx + dx, py = tY;
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
  label(ctx, 'Faktor (1 = optimal)', gx, 22, { ukuran: 12, tebal: true, warna: '#14532d' });
  Object.entries(h._f).forEach(([nama, nilai], i) => {
    const y = 48 + i * 34;
    label(ctx, nama, gx, y, { ukuran: 11, warna: '#334155' });
    ctx.fillStyle = '#e2e8f0'; kotakBulat(ctx, gx, y + 9, gw, 10, 5); ctx.fill();
    ctx.fillStyle = nama === h.pembatas ? '#dc2626' : '#16a34a';
    kotakBulat(ctx, gx, y + 9, gw * jepit(nilai, 0.02, 1.1) / 1.1, 10, 5); ctx.fill();
  });
  label(ctx, `Pembatas: ${h.pembatas}`, gx, 48 + 5 * 34 + 6, { ukuran: 12, latar: '#fee2e2', warna: '#b91c1c' });
  label(ctx, `Hari ke-${hari} · ${Math.round(Math.min(m, 350))} g`, cx, H - 14, { rata: 'center', ukuran: 13, tebal: true, warna: '#14532d' });
  if (p >= 1) {
    const ok = h.massa >= 100 && h.kondisi === 'Sehat';
    label(ctx, ok ? 'SIAP PANEN!' : 'Belum memenuhi target', cx, 50, { rata: 'center', ukuran: 13, tebal: true, warna: '#fff', latar: ok ? '#15803d' : '#b45309' });
  }
}

/* ---------------------------------------------------------
   5. ROKET CUKA & SODA KUE — perubahan kimia, pereaksi pembatas
   --------------------------------------------------------- */
const RT_28C = 24.7; // L·atm/mol pada ± 28 °C

function hitungRoket(v) {
  const cuka = +v.cuka, soda = +v.soda, botol = +v.botol;
  const kadar = v.kadar === 'encer' ? 0.025 : 0.05;
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
    tinggi: bulat(tinggi, 1), jarak: bulat(jarak, 1), biaya: Math.round((cuka * 20 + soda * 100) / 100) * 100,
    _terbuang: terbuang, _meluap: meluap, _isi: isi
  };
}

function kriteriaRoket(v, h) {
  return [
    { teks: 'Mendarat di zona 15–25 m', lulus: h.jarak >= 15 && h.jarak <= 25, nilai: `${h.jarak} m` },
    { teks: 'Pereaksi terbuang ≤ 20%', lulus: h._terbuang <= 20, nilai: h.sisa },
    { teks: 'Busa tidak meluap', lulus: !h._meluap, nilai: `botol terisi ${Math.round(h._isi * 100)}%` },
    { teks: 'Biaya ≤ Rp 10.000', lulus: h.biaya <= 10000, nilai: rp(h.biaya) }
  ];
}

function gambarBentukRoket(ctx, x, y, rot, skala = 1) {
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
  ctx.fillStyle = '#eef2ff'; ctx.fillRect(0, 0, W, H);
  const tanah = H - 34, x0 = 34;
  const s = Math.min((W - x0 - 16) / 32, (tanah - 40) / Math.max(10, h.tinggi * 1.15));
  const X = m => x0 + m * s, Y = m => tanah - m * s;
  ctx.fillStyle = '#86efac'; ctx.fillRect(0, tanah, W, H - tanah);
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
  ctx.fillStyle = '#e0f2fe'; ctx.fillRect(0, 0, W, H);
  const tanah = H - 34, x0 = 30, jMaks = 70;
  const s = Math.min((W - x0 - 14) / jMaks, (tanah - 40) / Math.max(12, h.tinggi * 1.15));
  const X = m => x0 + m * s, Y = m => tanah - m * s;
  ctx.fillStyle = '#86efac'; ctx.fillRect(0, tanah, W, H - tanah);
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
    gambarBentukRoket(ctx, x0, tanah - 26, rot);
    ctx.save(); ctx.translate(x0, tanah - 26); ctx.rotate(rot);
    ctx.fillStyle = 'rgba(56,189,248,.75)';
    const tc = Math.min(30, 32 * h._isi); ctx.fillRect(-6, 17 - tc, 12, tc);
    ctx.restore();
    // pompa & pengukur tekanan
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x0, tanah - 4); ctx.quadraticCurveTo(x0 + 30, tanah + 6, x0 + 58, tanah - 8); ctx.stroke();
    ctx.fillStyle = '#334155'; ctx.fillRect(x0 + 54, tanah - 40 + Math.sin(q * 30) * 6, 8, 32);
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
  gambarBentukRoket(ctx, X(b[0]), Math.min(Y(b[1]) - 12, tanah - 12), rot);
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

const SIM = {
  roketair: { hitung: hitungRoketAir, kriteria: kriteriaRoketAir, gambar: gambarRoketAir, sumbuX: ['air', 'tekanan', 'sudut'], sumbuY: ['jarak', 'tinggi', 'kecepatan', 'dorong'] },
  roket: { hitung: hitungRoket, kriteria: kriteriaRoket, gambar: gambarRoket, sumbuX: ['cuka', 'soda', 'sudut'], sumbuY: ['jarak', 'tinggi', 'tekanan', 'gas'] },
  perahu: { hitung: v => hitungPerahu(v), kriteria: kriteriaPerahu, gambar: gambarPerahu, sumbuX: ['panjang', 'lebar', 'tinggi', 'muatan'], sumbuY: ['celup', 'bebas', 'kapasitas', 'biaya'] },
  penjernih: { hitung: hitungPenjernih, kriteria: kriteriaPenjernih, gambar: gambarPenjernih, sumbuX: ['tebalPasir', 'tebalArang', 'ulang'], sumbuY: ['keruh', 'bau', 'debit', 'biaya'] },
  pendingin: { hitung: hitungPendingin, kriteria: kriteriaPendingin, gambar: gambarPendingin, sumbuX: ['tebal', 'es', 'suhu'], sumbuY: ['tahan', 'laju', 'massaKotak', 'biaya'] },
  hidroponik: { hitung: hitungHidroponik, kriteria: kriteriaHidroponik, gambar: gambarHidroponik, sumbuX: ['cahaya', 'jam', 'suhu', 'nutrisi'], sumbuY: ['massa', 'laju', 'biaya'] }
};
