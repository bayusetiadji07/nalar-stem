// Menggabungkan alat/tes-bagian-*.js menjadi js/tes.js (global TES_MISI untuk peramban)
const fs = require('fs'), path = require('path');
const dir = __dirname, semua = {};
for (const f of fs.readdirSync(dir).filter(f => /^tes-bagian-\d+\.js$/.test(f)).sort()) Object.assign(semua, require(path.join(dir, f)));
const isi = '// Dibuat otomatis oleh alat/gabung-tes.js — sunting alat/tes-bagian-*.js lalu jalankan ulang.\n' +
  '// Bank soal Mode Tes: tiap misi punya tujuan pembelajaran, Paket A (tes awal) dan Paket B (tes akhir),\n' +
  '// masing-masing 6 soal berurutan indikator interpretasi → analisis → inferensi → evaluasi → eksplanasi → regulasi.\n' +
  '// opsi[0] adalah kunci; urutan diacak saat ditampilkan.\n' +
  'const TES_MISI = ' + JSON.stringify(semua) + ';\n';
fs.writeFileSync(path.join(dir, '..', 'js', 'tes.js'), isi);
console.log('js/tes.js:', Object.keys(semua).length, 'misi,', (isi.length / 1024).toFixed(1), 'KB');
