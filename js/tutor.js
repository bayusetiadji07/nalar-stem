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
  return { sumber: c.sumber || (dariBerkas ? 'lokal' : 'bawaan'), kunci: c.kunci || '', model, rekam: c.rekam !== false };
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
  if (!navigator.onLine) throw new Error('perangkat sedang offline');
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
10. Boleh memakai **tebal** untuk kata kunci. Jangan memakai judul markdown. JANGAN memakai LaTeX atau tanda dolar; tulis rumus dengan teks biasa dan subskrip Unicode (contoh: CO₂, H₂O, F = m × a).
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
// info = { misi, langkah, pertanyaan } dipakai untuk merekam & mencari di memori Kak Nala.
async function tutorBalas(konteks, nama, riwayat, info = {}) {
  const pertanyaan = info.pertanyaan || riwayat[riwayat.length - 1].teks;
  try {
    const teks = (await panggilAI({ sistem: promptSistemTutor(konteks, nama), riwayat: riwayat.slice(-14), json: false })).trim();
    rekamMemori({ jenis: 'chat', misi: info.misi, langkah: info.langkah, pertanyaan, jawaban: teks });
    return { teks, sumber: 'ai' };
  } catch (e) {
    const galat = e.message === 'LOKAL' ? '' : e.message;
    const ingat = (await cariMemori('chat', info.misi || 'umum', info.langkah || '', pertanyaan).catch(() => []))[0];
    if (ingat && ingat.kemiripan >= AMBANG_MIRIP) {
      return { teks: samarkanNama(ingat.jawaban, nama), sumber: 'memori', galat };
    }
    return { teks: tutorLokal(pertanyaan), sumber: 'lokal', galat };
  }
}

function teksIsian(langkah, isian) {
  return langkah.isian.map(f => (isian[f.id] || '').trim()).join('\n');
}

async function periksaIsian(konteks, langkah, isian, misi) {
  const indikator = langkah.indikator.map(id => INDIKATOR.find(i => i.id === id));
  const jawaban = langkah.isian.map(f => `${f.label}\nJawaban murid: ${isian[f.id] || '(kosong)'}`).join('\n\n');
  try {
    const teks = await panggilAI({ sistem: promptSistemPenilai(konteks, indikator), riwayat: [{ peran: 'user', teks: jawaban }], json: true });
    const j = JSON.parse(teks.replace(/^```(json)?|```$/g, '').trim());
    const skor = {};
    indikator.forEach(i => { skor[i.id] = jepit(Math.round(+((j.skor || {})[i.id]) || 1), 1, 4); });
    const hasil = { skor, kekuatan: j.kekuatan || '', perbaikan: j.perbaikan || '', pemantik: (j.pemantik || []).slice(0, 3), miskonsepsi: j.miskonsepsi || '', sumber: 'ai' };
    rekamMemori({
      jenis: 'nilai', misi: misi ? misi.id : 'umum', langkah: langkah.id, pertanyaan: teksIsian(langkah, isian),
      jawaban: JSON.stringify({ kekuatan: hasil.kekuatan, perbaikan: hasil.perbaikan, pemantik: hasil.pemantik, miskonsepsi: hasil.miskonsepsi }),
      skor, spesifik: false
    });
    return hasil;
  } catch (e) {
    const galat = e.message === 'LOKAL' ? '' : e.message;
    const hasil = await penilaiMemori(langkah, isian, misi).catch(() => null) || penilaiLokal(langkah, isian, misi);
    hasil.galat = galat;
    return hasil;
  }
}

// Penilaian tanpa AI dengan membandingkan jawaban murid ke jawaban lain yang pernah dinilai AI.
async function penilaiMemori(langkah, isian, misi) {
  const teks = teksIsian(langkah, isian);
  const mirip = (await cariMemori('nilai', misi ? misi.id : 'umum', langkah.id, teks, 5))
    .filter(m => m.kemiripan >= AMBANG_MIRIP && m.skor);
  if (!mirip.length) return null;
  const dasar = penilaiLokal(langkah, isian, misi);
  const skor = {};
  langkah.indikator.forEach(id => {
    let jumlah = 0, bobot = 0;
    mirip.forEach(m => { if (m.skor[id]) { jumlah += m.skor[id] * m.kemiripan; bobot += m.kemiripan; } });
    // campur skor rujukan memori (bobot besar) dengan penilai aturan
    skor[id] = bobot ? jepit(Math.round((jumlah / bobot) * 0.75 + dasar.skor[id] * 0.25), 1, 4) : dasar.skor[id];
  });
  let umpan = {};
  try { umpan = JSON.parse(mirip[0].jawaban); } catch (e) { /* abaikan */ }
  const sangatMirip = mirip[0].kemiripan >= 0.55;
  return {
    skor,
    kekuatan: sangatMirip && umpan.kekuatan ? umpan.kekuatan : dasar.kekuatan,
    perbaikan: sangatMirip && umpan.perbaikan ? umpan.perbaikan : dasar.perbaikan,
    pemantik: (umpan.pemantik && umpan.pemantik.length ? umpan.pemantik : dasar.pemantik).slice(0, 3),
    miskonsepsi: sangatMirip ? (umpan.miskonsepsi || '') : '',
    sumber: 'memori'
  };
}

/* ---------------- Rencana kerja prototipe: ditinjau Kak Nala ---------------- */
function promptSistemRencana(konteks) {
  return `Kamu "Kak Nala", rekan perancang yang meninjau RENCANA LANGKAH KERJA murid SMP untuk membuat dan menguji prototipe nyata. Rencana itu milik murid — jangan menulis ulang seluruhnya.

Tinjau apakah rencana: (1) AMAN — keselamatan selalu prioritas utama; (2) bisa dikerjakan dengan alat & bahan yang tersedia; (3) memakai takaran/ukuran yang jelas (angka); (4) mengukur hal yang dituntut kriteria keberhasilan; (5) menjaga uji adil (hanya satu variabel yang diubah) dan mengulang pengukuran; (6) membandingkan hasil nyata dengan prediksi simulasi.

ATURAN:
- Beri paling banyak 4 saran perubahan KECIL dan konkret, urutkan dari yang paling penting (keselamatan dulu).
- Teks langkah yang disarankan berupa kalimat perintah singkat (maksimal 25 kata), Bahasa Indonesia sederhana.
- Tiap saran wajib punya alasan singkat (konsep IPA, keselamatan, atau keadilan uji) yang ditulis kepada murid dengan kata "kamu".
- Jika rencana masih kosong atau kurang dari 3 langkah, JANGAN menyusunkan semua langkah: beri 1–2 saran langkah awal saja dan pertanyaan yang memancing murid melanjutkan sendiri.
- Jika rencana sudah baik, boleh memberi saran kosong dan cukup pujian + pertanyaan.
- Jangan memakai LaTeX atau tanda dolar.

KONTEKS:
${konteks}

Keluarkan HANYA JSON valid:
{"pujian":"<1 kalimat hal baik dari rencana>","pertanyaan":["<pertanyaan pemantik 1>","<pertanyaan pemantik 2>"],"saran":[{"jenis":"tambah|ubah|hapus","no":<nomor langkah; untuk "tambah" = disisipkan SETELAH nomor ini, 0 = di paling awal>,"teks":"<teks langkah baru/hasil ubahan; kosong bila hapus>","alasan":"<alasan singkat>"}]}`;
}

async function tinjauRencana(konteks, rencana, misi) {
  const daftar = rencana.length ? rencana.map((r, i) => `${i + 1}. ${r.teks}`).join('\n') : '(rencana masih kosong)';
  try {
    const teks = await panggilAI({ sistem: promptSistemRencana(konteks), riwayat: [{ peran: 'user', teks: `Rencana langkah kerja kami:\n${daftar}` }], json: true });
    const j = JSON.parse(teks.replace(/^```(json)?|```$/g, '').trim());
    const saran = (Array.isArray(j.saran) ? j.saran : []).filter(s => s && ['tambah', 'ubah', 'hapus'].includes(s.jenis))
      .map(s => ({ jenis: s.jenis, no: jepit(Math.round(+s.no || 0), 0, rencana.length), teks: rapikanSaran(s.teks), alasan: rapikanSaran(s.alasan) }))
      .filter(s => (s.jenis === 'hapus' ? s.no >= 1 : s.teks) && (s.jenis === 'tambah' || s.no >= 1)).slice(0, 4);
    return { pujian: rapikanSaran(j.pujian), pertanyaan: (j.pertanyaan || []).map(rapikanSaran).filter(Boolean).slice(0, 3), saran, sumber: 'ai' };
  } catch (e) {
    const hasil = tinjauLokal(rencana, misi);
    hasil.galat = e.message === 'LOKAL' ? '' : e.message;
    return hasil;
  }
}
function rapikanSaran(t) { return String(t || '').replace(/\$+/g, '').trim().slice(0, 300); }

// Peninjau tanpa AI: memeriksa unsur penting rencana, lalu menyarankan langkah dari panduan misi.
function tinjauLokal(rencana, misi) {
  const N = NYATA[misi.id];
  const semua = rencana.map(r => r.teks.toLowerCase()).join(' \n ');
  const ada = re => re.test(semua);
  const dariPanduan = (re, cadangan) => N.langkah.find(l => re.test(l.toLowerCase()) && !semua.includes(l.toLowerCase().slice(0, 25))) || cadangan;
  const saran = [], pertanyaan = [];
  if (!ada(/aman|guru|kacamata|pelindung|hati-hati|jauhkan|keselamatan|sarung tangan/)) {
    saran.push({ jenis: 'tambah', no: 0, teks: `Periksa keselamatan bersama guru sebelum mulai: ${N.keselamatan[0]}`, alasan: 'Keselamatan selalu diperiksa paling awal, sebelum bahan mulai dirakit atau diuji.' });
  }
  if (rencana.length < 3) { // rencana baru dimulai: cukup satu contoh langkah, sisanya murid lanjutkan sendiri
    saran.push({ jenis: 'tambah', no: rencana.length, teks: N.langkah[Math.min(rencana.length, N.langkah.length - 1)], alasan: 'Ini contoh langkah dari panduan. Coba lanjutkan langkah-langkah berikutnya dengan kata-katamu sendiri.' });
    return {
      pujian: rencana.length ? 'Kamu sudah mulai merencanakan. Rencana yang jelas membuat prototipe lebih aman dan hemat bahan.' : 'Ayo mulai! Rencana yang jelas membuat prototipe lebih aman dan hemat bahan.',
      pertanyaan: ['Setelah alat siap, apa yang pertama kali kamu rakit, dan dengan ukuran berapa?', 'Bagaimana kamu akan mengukur apakah kriteria keberhasilan tercapai?'],
      saran, sumber: 'lokal'
    };
  }
  if (!ada(/ukur|catat|timbang|stopwatch|meteran|penggaris|tuner|termometer|hitung|amati/)) {
    saran.push({ jenis: 'tambah', no: rencana.length, teks: dariPanduan(/\bukur\b/, null) || dariPanduan(/catat|hitung|amati/, `Ukur dan catat ${N.ukur.map(u => u.label.toLowerCase()).join(', ')}.`), alasan: 'Tanpa pengukuran, kamu tidak punya bukti apakah kriteria keberhasilan tercapai.' });
  }
  if (!ada(/ulang|kali|rata-rata/)) {
    saran.push({ jenis: 'tambah', no: rencana.length, teks: 'Ulangi pengujian minimal 3 kali dengan cara yang sama, lalu hitung rata-ratanya.', alasan: 'Satu kali uji bisa kebetulan. Pengulangan membuat datamu lebih bisa dipercaya.' });
  }
  if (!ada(/banding|prediksi|simulasi/)) {
    saran.push({ jenis: 'tambah', no: rencana.length, teks: 'Bandingkan hasil ukur dengan prediksi simulasi, lalu catat selisihnya.', alasan: 'Selisih hasil nyata dan simulasi menunjukkan faktor yang belum dihitung model.' });
  }
  if (rencana.length && !/\d/.test(semua)) pertanyaan.push('Berapa takaran atau ukuran yang kamu pakai? Lihat rencana takaran dari simulasi, lalu tuliskan angkanya di langkahmu.');
  pertanyaan.push('Pada saat menguji, variabel apa yang kamu jaga tetap sama agar ujimu adil?');
  return {
    pujian: rencana.length >= 3 ? `Kamu sudah menyusun ${rencana.length} langkah dengan urutan sendiri — itu awal yang baik.` : 'Kamu sudah mulai merencanakan. Rencana yang jelas membuat prototipe lebih aman dan hemat bahan.',
    pertanyaan: pertanyaan.slice(0, 3), saran: saran.slice(0, 4), sumber: 'lokal'
  };
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
