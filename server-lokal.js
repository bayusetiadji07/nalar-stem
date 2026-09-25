// Server lokal tanpa dependensi: melayani berkas statis + /api/tutor.
// Jalankan: node server-lokal.js   (buka http://localhost:3140)
// Kunci Gemini dibaca dari variabel lingkungan GEMINI_API_KEY atau berkas .env
const http = require('http');
const fs = require('fs');
const path = require('path');

const AKAR = __dirname;
const PORT = +process.env.PORT || 3140;

const env = path.join(AKAR, '.env');
if (fs.existsSync(env)) {
  for (const baris of fs.readFileSync(env, 'utf8').split(/\r?\n/)) {
    const m = baris.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*"?([^"]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const API = { '/api/tutor': require('./api/tutor.js'), '/api/memori': require('./api/memori.js') };

const JENIS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json', '.ico': 'image/x-icon' };

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const fungsi = API[url];
  if (fungsi) {
    let data = '';
    req.on('data', c => { data += c; if (data.length > 200000) req.destroy(); });
    req.on('end', () => {
      try { req.body = JSON.parse(data || '{}'); } catch (e) { req.body = null; }
      res.status = k => { res.statusCode = k; return res; };
      res.json = o => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); };
      fungsi(req, res).catch(e => { res.statusCode = 500; res.end(JSON.stringify({ error: e.message })); });
    });
    return;
  }
  let berkas = path.normalize(path.join(AKAR, url === '/' ? 'index.html' : url));
  if (!berkas.startsWith(AKAR) || berkas.includes(`${path.sep}.`) || /server-lokal|\.env/.test(berkas)) { res.statusCode = 403; return res.end('Terlarang'); }
  fs.readFile(berkas, (err, isi) => {
    if (err) { res.statusCode = 404; return res.end('Tidak ditemukan'); }
    res.setHeader('Content-Type', JENIS[path.extname(berkas)] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.end(isi);
  });
}).listen(PORT, () => console.log(`NalarSTEM berjalan di http://localhost:${PORT}  (AI: ${process.env.GEMINI_API_KEY ? 'kunci server terpasang' : 'belum ada GEMINI_API_KEY'})`));
