/* =========================================================
   NalarSTEM — Memori Kak Nala
   Jawaban AI direkam (tanpa nama) ke database sekolah, lalu dipakai ulang
   oleh tutor lokal saat AI tidak tersedia. Salinan jawaban yang layak
   diunduh ke browser agar tetap berguna saat benar-benar offline.
   ========================================================= */

const MEMORI_SIMPAN = 'nalarstem-memori';
const MEMORI_SEGAR_MS = 6 * 3600 * 1000;
const AMBANG_MIRIP = 0.3;

function bolehRekam() {
  return bacaAI().rekam !== false && location.protocol !== 'file:';
}

async function memoriApi(data, batasMs = 8000) {
  const r = await fetch('api/memori', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data), signal: AbortSignal.timeout(batasMs)
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error(d.error || `Server memori membalas ${r.status}`); e.status = r.status; throw e; }
  return d;
}

// Nama murid diganti agar rekaman tidak memuat identitas.
function samarkanNama(teks, nama) {
  let t = String(teks || '');
  const bagian = String(nama || '').trim().split(/\s+/).filter(x => x.length >= 3);
  const daftar = [String(nama || '').trim(), ...bagian].filter(Boolean).sort((a, b) => b.length - a.length);
  for (const n of daftar) {
    const aman = n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    t = t.replace(new RegExp(`(^|[\\s,!?.])${aman}(?=$|[\\s,!?.])`, 'gi'), '$1');
  }
  return t.replace(/ {2,}/g, ' ').replace(/(^|\n)\s*[,!]\s*/g, '$1').replace(/\s+([,!?.])/g, '$1').trim();
}

// Jawaban yang merujuk data uji tertentu ("uji 2", "6,5 cm") kurang cocok dipakai murid lain.
function jawabanSpesifik(teks) {
  return /\buji\s*(ke-?)?\s*\d|\d+([.,]\d+)?\s*(cm|kg|g|ml|m|jam|menit|ntu|bar|ppm|%|°c?|w|rp)\b/i.test(String(teks || ''));
}

function rekamMemori(data) {
  if (!bolehRekam()) return;
  const nama = (typeof S !== 'undefined' && S.profil) ? S.profil.nama : '';
  const isi = {
    aksi: 'rekam', jenis: data.jenis, misi: data.misi || 'umum', langkah: data.langkah || '',
    pertanyaan: samarkanNama(data.pertanyaan, nama), jawaban: samarkanNama(data.jawaban, nama),
    skor: data.skor || null, spesifik: data.spesifik ?? jawabanSpesifik(data.jawaban), model: data.model || null
  };
  memoriApi(isi).catch(() => { /* rekaman gagal tidak mengganggu murid */ });
}

/* ---------- kemiripan teks (trigram, meniru pg_trgm) ---------- */
function trigram(teks) {
  const set = new Set();
  String(teks || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(' ').filter(Boolean).forEach(k => {
    const w = `  ${k} `;
    for (let i = 0; i < w.length - 2; i++) set.add(w.slice(i, i + 3));
  });
  return set;
}
function kemiripan(a, b) {
  const A = trigram(a), B = trigram(b);
  if (!A.size || !B.size) return 0;
  let sama = 0; A.forEach(t => { if (B.has(t)) sama++; });
  return sama / (A.size + B.size - sama);
}

function paketLokal() {
  try { return JSON.parse(localStorage.getItem(MEMORI_SIMPAN)) || { waktu: 0, hasil: [] }; } catch (e) { return { waktu: 0, hasil: [] }; }
}

async function perbaruiPaketMemori(paksa = false) {
  if (location.protocol === 'file:' || !navigator.onLine) return paketLokal();
  const lama = paketLokal();
  if (!paksa && Date.now() - lama.waktu < MEMORI_SEGAR_MS) return lama;
  const d = await memoriApi({ aksi: 'paket' }, 15000);
  const paket = { waktu: Date.now(), hasil: d.hasil || [] };
  try { localStorage.setItem(MEMORI_SIMPAN, JSON.stringify(paket)); } catch (e) { /* penyimpanan penuh */ }
  return paket;
}

function cariLokal(jenis, misi, langkah, teks, batas = 3) {
  return paketLokal().hasil
    .filter(m => m.jenis === jenis && (m.misi === misi || m.misi === 'umum'))
    .map(m => {
      const k = kemiripan(m.pertanyaan, teks);
      return { ...m, kemiripan: k, nilai: k + (m.status === 'disetujui' ? 0.15 : 0) + (m.langkah === langkah ? 0.1 : 0) };
    })
    .filter(m => m.kemiripan > 0.2)
    .sort((a, b) => b.nilai - a.nilai)
    .slice(0, batas);
}

// Cari di database sekolah dulu; bila server/internet tak ada, pakai salinan offline.
async function cariMemori(jenis, misi, langkah, teks, batas = 3) {
  if (location.protocol !== 'file:' && navigator.onLine) {
    try { return (await memoriApi({ aksi: 'cari', jenis, misi, langkah, teks, batas })).hasil || []; } catch (e) { /* jatuh ke salinan lokal */ }
  }
  return cariLokal(jenis, misi, langkah, teks, batas);
}
