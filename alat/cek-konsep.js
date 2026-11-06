// Memeriksa soal pemahaman konsep: kelengkapan kisi, jumlah soal, dan keseimbangan panjang pilihan.
// Pakai: node alat/cek-konsep.js [berkas-bagian.js ...]   (tanpa argumen: semua alat/konsep-bagian-*.js)
const fs = require('fs');
const path = require('path');
const berkas = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(__dirname).filter(f => /^konsep-bagian-\d+\.js$/.test(f)).map(f => path.join(__dirname, f));
let masalah = 0, total = 0, panjang = 0, pendek = 0, angka = 0;
for (const b of berkas) {
  const data = require(path.resolve(b));
  for (const [id, t] of Object.entries(data)) {
    if (!Array.isArray(t.kisi) || t.kisi.length !== 4 || t.kisi.some(k => k.length !== 3 || ![1, 2, 3].includes(k[0]) || !/^C[1-6]$/.test(k[1]))) { console.log(`${id}: kisi tidak lengkap`); masalah++; }
    for (const P of ['A', 'B']) {
      const S = t[P] || [];
      if (S.length !== 4) { console.log(`${id}/${P}: jumlah soal ${S.length}`); masalah++; }
      S.forEach((s, i) => {
        total++;
        if (!s.soal || !s.bahas || !Array.isArray(s.opsi) || s.opsi.length !== 4) { console.log(`${id}/${P}${i + 1}: struktur tidak lengkap`); masalah++; return; }
        if (new Set(s.opsi).size !== 4) { console.log(`${id}/${P}${i + 1}: ada pilihan kembar`); masalah++; }
        const L = s.opsi.map(o => o.length);
        if (Math.max(...L) <= 20) { angka++; return; }        // pilihan berupa angka, satuan, atau istilah pendek
        if (L[0] === Math.max(...L)) panjang++;
        if (L[0] === Math.min(...L)) pendek++;
        const r = Math.max(...L) / Math.min(...L);
        if (r > 1.3) { console.log(`${id}/${P}${i + 1}: rasio ${r.toFixed(2)} [${L.join(',')}]`); masalah++; }
      });
    }
  }
}
const n = total - angka;
console.log(`\n${total} soal (${angka} pilihan angka) · masalah: ${masalah} · kunci terpanjang ${panjang} (${Math.round(panjang / n * 100)}%) · terpendek ${pendek} (${Math.round(pendek / n * 100)}%)`);
process.exitCode = masalah ? 1 : 0;
