// Menggabungkan alat/tes-bagian-*.js (berpikir kritis) dan alat/konsep-bagian-*.js (pemahaman konsep)
// menjadi js/tes.js (global TES_MISI untuk peramban). Tiap paket: soal 1–4 konsep, soal 5–10 berpikir kritis.
// Setiap soal diberi kisi-kisi: tp (nomor tujuan pembelajaran), lv (level kognitif), kisi (indikator soal).
const fs = require('fs'), path = require('path');
const dir = __dirname, kbk = {}, konsep = {};
const muat = (pola, ke) => fs.readdirSync(dir).filter(f => pola.test(f)).sort().forEach(f => Object.assign(ke, require(path.join(dir, f))));
muat(/^tes-bagian-\d+\.js$/, kbk);
muat(/^konsep-bagian-\d+\.js$/, konsep);

// Kisi-kisi soal berpikir kritis (sama untuk semua misi, sesuai indikator Facione)
const KISI_KBK = {
  interpretasi: [2, 'C4', 'Disajikan data atau tabel hasil uji, peserta didik dapat menafsirkan makna data tersebut'],
  analisis: [2, 'C4', 'Disajikan dua rancangan yang berbeda, peserta didik dapat menganalisis penyebab perbedaan hasilnya'],
  inferensi: [2, 'C5', 'Disajikan kondisi baru, peserta didik dapat menyimpulkan dugaan yang paling masuk akal berdasarkan konsep'],
  evaluasi: [3, 'C5', 'Disajikan sebuah klaim atau pendapat, peserta didik dapat menilai kebenarannya berdasarkan kriteria dan data'],
  eksplanasi: [1, 'C4', 'Peserta didik dapat memilih penjelasan ilmiah yang paling lengkap tentang fenomena dalam misi'],
  regulasi: [3, 'C5', 'Disajikan rancangan yang gagal, peserta didik dapat menentukan langkah perbaikan yang sistematis']
};

const semua = {};
for (const [id, t] of Object.entries(kbk)) {
  const k = konsep[id];
  semua[id] = { tujuan: t.tujuan };
  for (const P of ['A', 'B']) {
    const bagianKonsep = k ? k[P].map((q, i) => ({ ind: 'konsep', tp: k.kisi[i][0], lv: k.kisi[i][1], kisi: k.kisi[i][2], ...q })) : [];
    const bagianKbk = t[P].map(q => ({ ...q, tp: KISI_KBK[q.ind][0], lv: KISI_KBK[q.ind][1], kisi: KISI_KBK[q.ind][2] }));
    semua[id][P] = [...bagianKonsep, ...bagianKbk];
  }
  if (!k) console.log('peringatan: misi tanpa soal konsep:', id);
}
const isi = '// Dibuat otomatis oleh alat/gabung-tes.js — sunting alat/tes-bagian-*.js atau alat/konsep-bagian-*.js lalu jalankan ulang.\n' +
  '// Bank soal Mode Tes: tiap misi punya tujuan pembelajaran, Paket A (tes awal) dan Paket B (tes akhir) yang paralel.\n' +
  '// Soal 1–4: pemahaman konsep (ind "konsep"); soal 5–10: berpikir kritis (interpretasi → analisis → inferensi → evaluasi → eksplanasi → regulasi).\n' +
  '// Setiap soal memuat kisi-kisi: tp (nomor tujuan), lv (level kognitif), kisi (indikator soal). opsi[0] adalah kunci; urutan diacak saat ditampilkan.\n' +
  'const TES_MISI = ' + JSON.stringify(semua) + ';\n';
fs.writeFileSync(path.join(dir, '..', 'js', 'tes.js'), isi);
const n = Object.values(semua).reduce((a, t) => a + t.A.length + t.B.length, 0);
console.log('js/tes.js:', Object.keys(semua).length, 'misi,', n, 'soal,', (isi.length / 1024).toFixed(1), 'KB');
