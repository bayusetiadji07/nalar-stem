// Proxy AI Tutor → Google Gemini. Kunci sekolah disimpan di env GEMINI_API_KEY (Vercel / .env lokal).
// Bila murid tergabung di kelas yang gurunya memasang kunci Gemini sendiri, kunci guru itu dipakai lebih dulu
// (kuota terbagi per guru); bila gagal/kuota habis, otomatis kembali ke kunci sekolah.
// Rantai cadangan model: bila satu model sibuk (503), kuota habis (429), atau sudah ditutup (404),
// otomatis mencoba model berikutnya.
// Diuji 26 Okt 2026: 3.6/3.5 Flash stabil ± 1,2 dtk; 3.7/3.8 Flash sering sibuk (503/timeout) → hanya bila dipilih.
const MODEL_DAFTAR = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-flash-lite-latest', 'gemini-flash-latest', 'gemini-2.5-flash'];
const MODEL_IZIN = [...MODEL_DAFTAR, 'gemini-3.8-flash', 'gemini-3.7-flash'];
const BATAS_TOTAL_MS = 45000; // hentikan rantai cadangan setelah ± 45 detik
const COBA_LAGI = [404, 429, 500, 503];

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wddfpmsurcftapbczise.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_kbPqKDodER85J6w3qls1UQ_iitjQFlm';
const simpanKunci = new Map(); // kode kelas → { kunci, waktu } (cache 5 menit per instance server)

async function kunciGuru(kode) {
  const rahasia = process.env.NALAR_RAHASIA;
  kode = String(kode || '').trim().toUpperCase();
  if (!rahasia || !/^[A-Z0-9]{6}$/.test(kode)) return null;
  const c = simpanKunci.get(kode);
  if (c && Date.now() - c.waktu < 5 * 60 * 1000) return c.kunci;
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/nalar_kunci_kelas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      body: JSON.stringify({ p_kode: kode, p_rahasia: rahasia }),
      signal: AbortSignal.timeout(5000)
    });
    const kunci = r.ok ? await r.json() : null;
    simpanKunci.set(kode, { kunci: typeof kunci === 'string' && kunci ? kunci : null, waktu: Date.now() });
    return simpanKunci.get(kode).kunci;
  } catch (e) { return null; } // gagal mengambil kunci guru → pakai kunci sekolah
}

function badanGemini(model, { sistem, riwayat, json }, pakaiThinking) {
  const gen = { temperature: json ? 0.3 : 0.7, maxOutputTokens: json ? 2000 : 1000 };
  if (json) gen.responseMimeType = 'application/json';
  // Model "lite" menolak thinkingBudget 0; model lain dimatikan "berpikir"-nya agar cepat & tidak memakan token.
  if (pakaiThinking && !/lite/.test(model)) gen.thinkingConfig = { thinkingBudget: 0 };
  return {
    systemInstruction: { parts: [{ text: sistem }] },
    contents: riwayat.map(r => ({ role: r.peran === 'model' ? 'model' : 'user', parts: [{ text: r.teks }] })),
    generationConfig: gen,
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_LOW_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_LOW_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
    ]
  };
}

async function mintaGemini(kunci, model, permintaan, pakaiThinking) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': kunci },
    body: JSON.stringify(badanGemini(model, permintaan, pakaiThinking)),
    signal: AbortSignal.timeout(12000)
  });
  const d = await r.json().catch(() => ({}));
  return { status: r.status, ok: r.ok, d };
}

// Jalankan rantai model dengan satu kunci. Hasil: { teks, model } | { galat, fatal, blokir }
async function cobaRantai(kunci, daftar, permintaan, mulai, galat, label) {
  for (const model of daftar) {
    if (Date.now() - mulai > BATAS_TOTAL_MS) { galat.push('batas waktu total'); return { galat: true }; }
    try {
      let h = await mintaGemini(kunci, model, permintaan, true);
      // Pengaturan "thinking" ditolak model tertentu → ulangi sekali tanpa pengaturan itu.
      if (h.status === 400 && !/API key/i.test((h.d.error && h.d.error.message) || '')) h = await mintaGemini(kunci, model, permintaan, false);
      if (h.ok) {
        const c = h.d.candidates && h.d.candidates[0];
        const teks = c && c.content && c.content.parts ? c.content.parts.map(p => p.text || '').join('') : '';
        if (teks) return { teks, model };
        if (c && c.finishReason === 'SAFETY') return { blokir: true };
        galat.push(`${label}/${model}: balasan kosong`);
        continue;
      }
      galat.push(`${label}/${model}: ${h.status}`);
      // kunci tidak valid / ditolak → tidak ada gunanya mencoba model lain dengan kunci ini
      if (!COBA_LAGI.includes(h.status)) return { galat: true, fatal: (h.d.error && h.d.error.message) || `status ${h.status}` };
    } catch (e) {
      galat.push(`${label}/${model}: ${e.message}`);
    }
  }
  return { galat: true };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Gunakan POST' });
  const kunciSekolah = (process.env.GEMINI_API_KEY || '').replace(/^﻿/, '').trim();

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
  if (!b || typeof b.sistem !== 'string' || !Array.isArray(b.riwayat) || !b.riwayat.length) {
    return res.status(400).json({ error: 'Permintaan tidak valid.' });
  }
  const permintaan = {
    sistem: b.sistem.slice(0, 16000),
    riwayat: b.riwayat.slice(-16).map(r => ({ peran: r.peran === 'model' ? 'model' : 'user', teks: String(r.teks || '').slice(0, 4000) })),
    json: !!b.json
  };
  const pilihan = MODEL_IZIN.includes(b.model) ? b.model : MODEL_DAFTAR[0];
  const daftar = [pilihan, ...MODEL_DAFTAR.filter(m => m !== pilihan)];

  const kunciKelas = await kunciGuru(b.kode);
  const urutan = [];
  if (kunciKelas) urutan.push(['guru', kunciKelas]);
  if (kunciSekolah) urutan.push(['sekolah', kunciSekolah]);
  if (!urutan.length) return res.status(500).json({ error: 'GEMINI_API_KEY belum diatur di server.' });

  const galat = [], mulai = Date.now();
  let fatal = null;
  for (const [label, kunci] of urutan) {
    const h = await cobaRantai(kunci, daftar, permintaan, mulai, galat, label);
    if (h.teks) return res.status(200).json({ teks: h.teks, model: h.model, kunci: label });
    if (h.blokir) return res.status(502).json({ error: 'Pesan diblokir filter keamanan.' });
    if (h.fatal && label === 'sekolah') fatal = h.fatal;
    if (Date.now() - mulai > BATAS_TOTAL_MS) break;
  }
  if (fatal) return res.status(502).json({ error: fatal });
  return res.status(503).json({ error: `Semua model AI sedang sibuk atau kuota habis. Coba lagi sebentar. (${galat.join('; ')})` });
};
