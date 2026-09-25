/* =========================================================
   NalarSTEM — AI Tutor "Kak Nala"
   Sumber AI:
   - 'bawaan'  : lewat /api/tutor (kunci Gemini disimpan di server/Vercel)
   - 'pribadi' : kunci Gemini milik pengguna, dipanggil langsung dari browser
   - 'lokal'   : tanpa internet/AI — tutor Sokratik berbasis aturan
   ========================================================= */

const AI_KUNCI_SIMPAN = 'nalarstem-ai';
const MODEL_DAFTAR = ['gemini-3.6-flash', 'gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-lite-latest', 'gemini-2.5-flash'];
const MODEL_PILIHAN = [
  ['gemini-3.6-flash', 'Gemini 3.6 Flash (disarankan, tercepat)'],
  ['gemini-3.5-flash', 'Gemini 3.5 Flash'],
  ['gemini-2.5-flash', 'Gemini 2.5 Flash'],
  ['gemini-3.5-flash-lite', 'Gemini 3.5 Flash-Lite (hemat kuota)']
];
const COBA_LAGI = [404, 429, 500, 503];

function bacaAI() {
  let c = {};
  try { c = JSON.parse(localStorage.getItem(AI_KUNCI_SIMPAN) || '{}'); } catch (e) { /* abaikan */ }
  const dariBerkas = location.protocol === 'file:';
  // model lama yang sudah ditutup Google (mis. gemini-2.5-flash-lite) otomatis diganti bawaan
  const model = MODEL_DAFTAR.includes(c.model) ? c.model : MODEL_DAFTAR[0];
  return { sumber: c.sumber || (dariBerkas ? 'lokal' : 'bawaan'), kunci: c.kunci || '', model };
}
function simpanAI(c) {
  try { localStorage.setItem(AI_KUNCI_SIMPAN, JSON.stringify(c)); } catch (e) { /* abaikan */ }
}

function badanGemini(model, { sistem, riwayat, json }, pakaiThinking = true) {
  const gen = { temperature: json ? 0.3 : 0.7, maxOutputTokens: json ? 2000 : 1000 };
  if (json) gen.responseMimeType = 'application/json';
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

function teksGemini(data) {
  const c = data && data.candidates && data.candidates[0];
  const t = c && c.content && c.content.parts ? c.content.parts.map(p => p.text || '').join('') : '';
  if (!t && c && c.finishReason === 'SAFETY') throw new Error('Pesan diblokir filter keamanan.');
  return t;
}

async function mintaLangsung(kunci, model, permintaan, pakaiThinking) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': kunci },
    body: JSON.stringify(badanGemini(model, permintaan, pakaiThinking)),
    signal: AbortSignal.timeout(12000)
  });
  return { status: r.status, ok: r.ok, d: await r.json().catch(() => ({})) };
}

async function panggilAI(permintaan) {
  const c = bacaAI();
  if (c.sumber === 'lokal') throw new Error('LOKAL');
  if (c.sumber === 'pribadi') {
    if (!c.kunci) throw new Error('Kunci API Gemini pribadi belum diisi di Pengaturan AI.');
    const daftar = [c.model, ...MODEL_DAFTAR.filter(m => m !== c.model)];
    const catatan = [];
    for (const model of daftar) {
      let h;
      try { h = await mintaLangsung(c.kunci, model, permintaan, true); } catch (e) { catatan.push(`${model}: waktu habis`); continue; }
      if (h.status === 400 && !/API key/i.test((h.d.error && h.d.error.message) || '')) h = await mintaLangsung(c.kunci, model, permintaan, false);
      if (h.ok) { const t = teksGemini(h.d); if (t) return t; catatan.push(`${model}: kosong`); continue; }
      catatan.push(`${model}: ${h.status}`);
      if (!COBA_LAGI.includes(h.status)) throw new Error((h.d.error && h.d.error.message) || `Gemini membalas ${h.status}`);
    }
    throw new Error(`Semua model AI sedang sibuk atau kuota habis. Coba lagi sebentar. (${catatan.join('; ')})`);
  }
  // bawaan: lewat server
  if (location.protocol === 'file:') throw new Error('LOKAL');
  const r = await fetch('api/tutor', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...permintaan, model: c.model })
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || `Server AI membalas ${r.status}`);
  return d.teks;
}

/* ---------------- Prompt ---------------- */
function promptSistemTutor(konteks, nama) {
  return `Kamu adalah "Kak Nala", tutor IPA berbasis STEM untuk murid SMP di Indonesia (Kurikulum Merdeka, Fase D). Tugas utamamu MELATIH BERPIKIR KRITIS murid, bukan memberi jawaban.

ATURAN WAJIB:
1. Bahasa Indonesia yang hangat, sederhana, dan sopan. Sapa murid dengan "kamu"${nama ? ` (namanya ${nama})` : ''}.
2. Metode Sokratik: JANGAN memberikan jawaban akhir, isian lembar kerja, hipotesis jadi, atau nilai rancangan terbaik secara langsung. Bantu murid menemukannya sendiri.
3. Balasan maksimal 90 kata. Akhiri dengan TEPAT SATU pertanyaan pemantik yang spesifik.
4. Bila ada data uji murid, rujuk angka spesifiknya (misal "di uji 2 kedalaman celup 6,5 cm").
5. Bila murid menunjukkan miskonsepsi, jangan langsung bilang salah — ajak dia membandingkan idenya dengan data atau konsep.
6. Puji PROSES berpikir (bertanya, membandingkan, mengubah satu variabel), bukan kepintaran.
7. Jika murid memaksa minta jawaban, jelaskan dengan ramah bahwa kamu ingin dia menemukannya sendiri, lalu naikkan tingkat petunjuk.
8. Tingkat petunjuk: [1] pertanyaan terbuka; [2] arahkan ke konsep/variabel yang relevan; [3] petunjuk konkret (misal "bandingkan uji 2 dan 3, apa yang berbeda?") tetapi tetap tanpa jawaban akhir.
9. Jika pertanyaan di luar pembelajaran IPA/STEM, arahkan kembali dengan sopan. Tolak hal yang tidak pantas atau berbahaya. Untuk keselamatan (misal air minum), ingatkan dengan tegas.
10. Boleh memakai **tebal** untuk kata kunci. Jangan memakai judul markdown.
11. PRAKTIK NYATA: jika murid membuat/menguji prototipe sungguhan, KESELAMATAN SELALU DI ATAS metode Sokratik. Untuk hal yang menyangkut bahaya, beri arahan keselamatan secara LANGSUNG dan tegas (boleh tanpa pertanyaan), lalu sarankan melibatkan guru. Tolak dengan sopan modifikasi berbahaya (misal: cuka biang/asam kuat, botol kaca, api, listrik PLN dekat air, es kering, memperbesar tekanan secara berlebihan, meminum air hasil saringan) dan tawarkan alternatif aman. Jika arah petunjuk masalah di konteks memuat kata "KESELAMATAN", atau masalahnya menyangkut tekanan/benda yang bisa melesat, panas, listrik, atau bahan kimia, WAJIB awali balasan dengan instruksi keselamatan itu secara langsung (misal: "Jangan dekati botol, tunggu 2 menit, minta guru membuka sumbat dengan wajah menjauh"), baru kemudian pertanyaan pemantik. Untuk masalah teknis yang aman (bocor, lambat, meleset), tetap bantu murid menemukan penyebab lewat pertanyaan dan membandingkan hasil nyata dengan prediksi simulasi.

KONTEKS BELAJAR MURID SAAT INI:
${konteks}`;
}

const RUBRIK = `Skala tiap indikator (1–4):
4 = Mahir: tepat dan lengkap, memakai konsep IPA yang benar DAN data/angka spesifik, alasannya logis dan runtut.
3 = Cakap: sebagian besar tepat dan ada alasan, tetapi kurang data spesifik atau kaitan konsepnya kurang jelas.
2 = Berkembang: tepat sebagian, alasan dangkal/umum, atau ada miskonsepsi kecil.
1 = Mulai berkembang: belum menjawab pertanyaan, terlalu singkat, atau miskonsepsi besar.`;

function promptSistemPenilai(konteks, indikator) {
  return `Kamu penilai kemampuan berpikir kritis murid SMP pada pembelajaran IPA berbasis STEM. Nilai jawaban murid secara adil, jujur, dan membangun. Jangan memberikan jawaban benar secara langsung — umpan balik harus berupa arahan dan pertanyaan. Tulis semua teks umpan balik LANGSUNG kepada murid dengan kata "kamu" (bukan "murid"/"siswa"), dalam Bahasa Indonesia yang hangat dan sederhana.

Indikator yang dinilai: ${indikator.map(i => `${i.nama} (${i.arti})`).join('; ')}.
${RUBRIK}

KONTEKS:
${konteks}

Keluarkan HANYA JSON valid dengan format:
{"skor":{${indikator.map(i => `"${i.id}":<1-4>`).join(',')}},"kekuatan":"<1-2 kalimat hal yang sudah baik>","perbaikan":"<1-2 kalimat yang perlu diperbaiki, tanpa memberi jawaban>","pemantik":["<pertanyaan pemantik 1>","<pertanyaan pemantik 2>"],"miskonsepsi":"<miskonsepsi yang terdeteksi atau string kosong>"}`;
}

/* ---------------- API tingkat tinggi ---------------- */
async function tutorBalas(konteks, nama, riwayat) {
  try {
    const teks = await panggilAI({ sistem: promptSistemTutor(konteks, nama), riwayat: riwayat.slice(-14), json: false });
    return { teks: teks.trim(), sumber: 'ai' };
  } catch (e) {
    const lokal = tutorLokal(riwayat[riwayat.length - 1].teks);
    return { teks: lokal, sumber: 'lokal', galat: e.message === 'LOKAL' ? '' : e.message };
  }
}

async function periksaIsian(konteks, langkah, isian, misi) {
  const indikator = langkah.indikator.map(id => INDIKATOR.find(i => i.id === id));
  const jawaban = langkah.isian.map(f => `${f.label}\nJawaban murid: ${isian[f.id] || '(kosong)'}`).join('\n\n');
  try {
    const teks = await panggilAI({ sistem: promptSistemPenilai(konteks, indikator), riwayat: [{ peran: 'user', teks: jawaban }], json: true });
    const j = JSON.parse(teks.replace(/^```(json)?|```$/g, '').trim());
    const skor = {};
    indikator.forEach(i => { skor[i.id] = jepit(Math.round(+((j.skor || {})[i.id]) || 1), 1, 4); });
    return { skor, kekuatan: j.kekuatan || '', perbaikan: j.perbaikan || '', pemantik: (j.pemantik || []).slice(0, 3), miskonsepsi: j.miskonsepsi || '', sumber: 'ai' };
  } catch (e) {
    const hasil = penilaiLokal(langkah, isian, misi);
    hasil.galat = e.message === 'LOKAL' ? '' : e.message;
    return hasil;
  }
}

/* ---------------- Tutor & penilai lokal (tanpa AI) ---------------- */
let konteksLokal = { langkah: null, misi: null, uji: [] };
let giliranLokal = 0;

function tutorLokal(pesan) {
  const p = (pesan || '').toLowerCase();
  const L = konteksLokal.langkah, M = konteksLokal.misi, U = konteksLokal.uji || [];
  const pemantik = L ? L.pemantik : [
    'Informasi apa yang sudah kamu ketahui, dan apa yang belum?',
    'Bukti apa yang kamu perlukan untuk yakin dengan jawabanmu?',
    'Adakah penjelasan lain yang mungkin?'
  ];
  const q = pemantik[giliranLokal++ % pemantik.length];
  if (/jawab|kunci|kasih tahu|beri tahu|langsung|contek/.test(p)) {
    return `Kak Nala tahu kamu ingin cepat selesai 😊. Tapi kemampuan berpikirmu akan tumbuh kalau kamu menemukannya sendiri — Kak Nala bantu lewat petunjuk ya.\n\n**Pertanyaan pemantik:** ${q}`;
  }
  const N = M && typeof NYATA !== 'undefined' ? NYATA[M.id] : null;
  const masalah = N && N.masalah.find(q => p.includes(q.gejala.toLowerCase()) || new RegExp(q.kunci).test(p));
  if (masalah && (/masalah|prototipe|nyata/.test(p) || (L && L.id === 'nyata'))) {
    return `**${masalah.gejala}** — ayo selidiki penyebabnya seperti ilmuwan:\n- ${masalah.petunjuk.join('\n- ')}\n\nIngat: bila ada yang terasa berbahaya, hentikan dan panggil gurumu.\n\n**Pertanyaan pemantik:** apa satu hal yang akan kamu ubah pada uji berikutnya, dan bagaimana memastikan hanya itu yang berubah?`;
  }
  if (/data|pola|grafik|tabel|uji/.test(p) && U.length) {
    const a = U[U.length - 1];
    const tak = U.filter(u => u.adil === false).length;
    return `Kamu sudah melakukan **${U.length} uji**${tak ? `, dan ${tak} di antaranya mengubah lebih dari satu variabel sekaligus` : ''}. Pada uji terakhir, kamu mengubah: ${a.ubah && a.ubah.length ? a.ubah.join(', ') : '(uji awal)'}.\n\nCoba letakkan uji-uji yang hanya berbeda satu variabel berdampingan. **Apa yang berubah pada hasilnya, dan ke arah mana?**`;
  }
  if (/hipotesis|jika|maka/.test(p)) {
    return `Hipotesis yang baik punya tiga bagian: **Jika** (variabel bebas diubah) … **maka** (variabel terikat berubah bagaimana) … **karena** (konsep IPA-nya).\n\n**Pertanyaan pemantik:** bagian "karena" di hipotesismu — konsep apa dari kartu konsep yang mendukungnya?`;
  }
  if (M && M.kataKunci.some(k => p.includes(k))) {
    return `Kamu menyebut konsep yang penting! Coba baca lagi kartu konsep di Langkah 2, lalu hubungkan konsep itu dengan satu bagian rancanganmu.\n\n**Pertanyaan pemantik:** ${q}`;
  }
  return `Pertanyaan yang bagus untuk dipikirkan! Pelan-pelan saja, ya.\n\n**Pertanyaan pemantik:** ${q}`;
}

function penilaiLokal(langkah, isian, misi) {
  const kunci = misi ? misi.kataKunci : [];
  const skorField = langkah.isian.map(f => {
    const t = (isian[f.id] || '').toLowerCase();
    const kata = t.split(/\s+/).filter(Boolean).length;
    let s = 1;
    if (kata >= (f.pendek ? 2 : 12)) s++;
    if (/karena|sebab|sehingga|akibat|jika.*maka|oleh karena/.test(t) || f.pendek) s++;
    if (/\d/.test(t) || kunci.some(k => t.includes(k))) s++;
    if (f.id === 'hipotesis' && !/jika.*maka/.test(t)) s = Math.min(s, 2);
    return { f, s: Math.min(4, s), t, kata };
  });
  const rata = Math.round(skorField.reduce((a, b) => a + b.s, 0) / skorField.length);
  const skor = {};
  langkah.indikator.forEach(id => { skor[id] = rata; });
  const saran = [];
  if (skorField.some(x => x.kata < 8 && !x.f.pendek)) saran.push('Beberapa jawaban masih terlalu singkat — jelaskan lebih lengkap.');
  if (!skorField.some(x => /karena|sebab|sehingga/.test(x.t))) saran.push('Tambahkan alasan dengan kata "karena" atau "sehingga".');
  if (!skorField.some(x => /\d/.test(x.t)) && langkah.no >= 4) saran.push('Sebutkan angka dari data ujimu sebagai bukti.');
  if (!skorField.some(x => kunci.some(k => x.t.includes(k)))) saran.push('Kaitkan dengan konsep IPA dari kartu konsep.');
  return {
    skor,
    kekuatan: rata >= 3 ? 'Jawabanmu sudah memuat alasan dan kaitan dengan konsep/data. Bagus!' : 'Kamu sudah mulai menuliskan pemikiranmu — itu langkah awal yang penting.',
    perbaikan: saran.join(' ') || 'Coba periksa lagi apakah setiap jawaban didukung bukti yang spesifik.',
    pemantik: langkah.pemantik.slice(0, 2),
    miskonsepsi: '',
    sumber: 'lokal'
  };
}
