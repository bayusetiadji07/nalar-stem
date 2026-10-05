// Memperbarui DAFTAR_SIMPAN dan VERSI di sw.js.
// Jalankan setiap kali ada berkas aplikasi yang berubah, SEBELUM commit:
//   node alat/perbarui-sw.js
// VERSI = sidik jari isi semua berkas, jadi berubah otomatis bila ada isi yang berubah.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const AKAR = path.join(__dirname, '..');
const daftarDir = (dir, cocok) => fs.readdirSync(path.join(AKAR, dir)).filter(f => cocok.test(f)).sort().map(f => `${dir}/${f}`);

const tidakDisimpan = new Set(['assets/img/ikon-512.png', 'assets/img/ikon-maskable-512.png']); // hanya dipakai saat memasang
const berkas = [
  'index.html', 'manifest.webmanifest', 'css/style.css',
  ...daftarDir('js', /\.js$/),
  ...daftarDir('assets/img', /\.(jpg|png|webp|svg)$/).filter(f => !tidakDisimpan.has(f)),
  ...daftarDir('assets/img/sim', /\.(jpg|png|webp|svg)$/)
];

const fileSw = path.join(AKAR, 'sw.js');
let sw = fs.readFileSync(fileSw, 'utf8');

const sidik = crypto.createHash('sha1');
for (const f of berkas) sidik.update(f).update(fs.readFileSync(path.join(AKAR, f)));
// logika sw.js sendiri juga ikut, agar perubahan cara menyimpan menghasilkan versi baru
sidik.update(sw.replace(/const VERSI = '[^']*';/, '').replace(/const DAFTAR_SIMPAN = \[[\s\S]*?\];/, ''));
const versi = 'nalarstem-' + sidik.digest('hex').slice(0, 8);
sw = sw.replace(/const VERSI = '[^']*';/, `const VERSI = '${versi}';`)
       .replace(/const DAFTAR_SIMPAN = \[[\s\S]*?\];/, `const DAFTAR_SIMPAN = [\n  './',\n${berkas.map(f => `  '${f}'`).join(',\n')}\n];`);
fs.writeFileSync(fileSw, sw);
const ukuran = berkas.reduce((a, f) => a + fs.statSync(path.join(AKAR, f)).size, 0);
console.log(`sw.js diperbarui: ${versi}, ${berkas.length + 1} berkas, ${(ukuran / 1048576).toFixed(1)} MB`);
