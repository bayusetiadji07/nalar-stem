// Proxy AI Tutor → Google Gemini. Kunci disimpan di env GEMINI_API_KEY (Vercel / .env lokal).
const MODEL_IZIN = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.0-flash'];

function badanGemini(model, { sistem, riwayat, json }) {
  const gen = { temperature: json ? 0.3 : 0.7, maxOutputTokens: json ? 1400 : 700 };
  if (json) gen.responseMimeType = 'application/json';
  if (/2\.5/.test(model)) gen.thinkingConfig = { thinkingBudget: 0 };
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
    sistem: b.sistem.slice(0, 12000),
    riwayat: b.riwayat.slice(-16).map(r => ({ peran: r.peran === 'model' ? 'model' : 'user', teks: String(r.teks || '').slice(0, 4000) })),
    json: !!b.json
  };
  const pilihan = MODEL_IZIN.includes(b.model) ? b.model : MODEL_IZIN[0];
  const daftar = [pilihan, ...MODEL_IZIN.filter(m => m !== pilihan)];

  let pesanGalat = 'Gagal menghubungi Gemini.';
  for (const model of daftar) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': kunci },
        body: JSON.stringify(badanGemini(model, permintaan))
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) {
        const c = d.candidates && d.candidates[0];
        const teks = c && c.content && c.content.parts ? c.content.parts.map(p => p.text || '').join('') : '';
        if (!teks) return res.status(502).json({ error: c && c.finishReason === 'SAFETY' ? 'Pesan diblokir filter keamanan.' : 'Balasan AI kosong.' });
        return res.status(200).json({ teks, model });
      }
      pesanGalat = (d.error && d.error.message) || `Gemini membalas ${r.status}`;
      if (![404, 429, 500, 503].includes(r.status)) break;
    } catch (e) {
      pesanGalat = e.message;
    }
  }
  return res.status(502).json({ error: pesanGalat });
};
