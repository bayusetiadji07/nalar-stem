// Proxy AI Tutor → Google Gemini. Kunci disimpan di env GEMINI_API_KEY (Vercel / .env lokal).
// Rantai cadangan: bila satu model sibuk (503), kuota habis (429), atau sudah ditutup (404),
// otomatis mencoba model berikutnya.
const MODEL_DAFTAR = ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-lite-latest'];
const COBA_LAGI = [404, 429, 500, 503];

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
    body: JSON.stringify(badanGemini(model, permintaan, pakaiThinking))
  });
  const d = await r.json().catch(() => ({}));
  return { status: r.status, ok: r.ok, d };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Gunakan POST' });
  const kunci = (process.env.GEMINI_API_KEY || '').replace(/^﻿/, '').trim();
  if (!kunci) return res.status(500).json({ error: 'GEMINI_API_KEY belum diatur di server.' });

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
  const pilihan = MODEL_DAFTAR.includes(b.model) ? b.model : MODEL_DAFTAR[0];
  const daftar = [pilihan, ...MODEL_DAFTAR.filter(m => m !== pilihan)];

  const galat = [];
  for (const model of daftar) {
    try {
      let h = await mintaGemini(kunci, model, permintaan, true);
      // Pengaturan "thinking" ditolak model tertentu → ulangi sekali tanpa pengaturan itu.
      if (h.status === 400 && !/API key/i.test((h.d.error && h.d.error.message) || '')) h = await mintaGemini(kunci, model, permintaan, false);
      if (h.ok) {
        const c = h.d.candidates && h.d.candidates[0];
        const teks = c && c.content && c.content.parts ? c.content.parts.map(p => p.text || '').join('') : '';
        if (teks) return res.status(200).json({ teks, model });
        if (c && c.finishReason === 'SAFETY') return res.status(502).json({ error: 'Pesan diblokir filter keamanan.' });
        galat.push(`${model}: balasan kosong`);
        continue;
      }
      const pesan = (h.d.error && h.d.error.message) || `status ${h.status}`;
      galat.push(`${model}: ${h.status}`);
      if (!COBA_LAGI.includes(h.status)) return res.status(502).json({ error: pesan });
    } catch (e) {
      galat.push(`${model}: ${e.message}`);
    }
  }
  return res.status(503).json({ error: `Semua model AI sedang sibuk atau kuota habis. Coba lagi sebentar. (${galat.join('; ')})` });
};
