// Memeriksa bank soal tes per misi: kelengkapan, urutan indikator, dan keseimbangan panjang pilihan.
// Pakai: node alat/cek-tes.js [berkas-bagian.js ...]   (tanpa argumen: semua alat/tes-bagian-*.js)
const fs = require('fs');
const path = require('path');
const URUT = ['interpretasi', 'analisis', 'inferensi', 'evaluasi', 'eksplanasi', 'regulasi'];
const berkas = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(__dirname).filter(f => /^tes-bagian-\d+\.js$/.test(f)).map(f => path.join(__dirname, f));
let masalah = 0, totalSoal = 0, kunciPanjang = 0, kunciPendek = 0;
for (const b of berkas) {
  const data = require(path.resolve(b));
  for (const [id, t] of Object.entries(data)) {
    if (!Array.isArray(t.tujuan) || t.tujuan.length < 2) { console.log(`${id}: tujuan kurang`); masalah++; }
    for (const paket of ['A', 'B']) {
      const S = t[paket] || [];
      if (S.length !== 6) { console.log(`${id}/${paket}: jumlah soal ${S.length}`); masalah++; }
      S.forEach((s, i) => {
        totalSoal++;
        if (s.ind !== URUT[i]) { console.log(`${id}/${paket}${i + 1}: indikator ${s.ind}, seharusnya ${URUT[i]}`); masalah++; }
        if (!s.soal || !s.bahas || !Array.isArray(s.opsi) || s.opsi.length !== 4) { console.log(`${id}/${paket}${i + 1}: struktur tidak lengkap`); masalah++; return; }
        const L = s.opsi.map(o => o.length), rasio = Math.max(...L) / Math.min(...L);
        if (L[0] === Math.max(...L)) kunciPanjang++;
        if (L[0] === Math.min(...L)) kunciPendek++;
        if (rasio > 1.3) { console.log(`${id}/${paket}${i + 1}: rasio panjang ${rasio.toFixed(2)} [${L.join(',')}]`); masalah++; }
        if (new Set(s.opsi).size !== 4) { console.log(`${id}/${paket}${i + 1}: ada pilihan kembar`); masalah++; }
      });
    }
  }
}
console.log(`\n${totalSoal} soal · masalah: ${masalah} · kunci terpanjang ${kunciPanjang} (${Math.round(kunciPanjang / totalSoal * 100)}%) · kunci terpendek ${kunciPendek} (${Math.round(kunciPendek / totalSoal * 100)}%)`);
process.exitCode = masalah ? 1 : 0;
