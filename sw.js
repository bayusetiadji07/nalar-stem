/* =========================================================
   NalarSTEM — service worker (aplikasi tetap bisa dibuka tanpa internet)
   - Halaman, kode (JS/CSS), dan manifest: JARINGAN DULU, agar perubahan langsung
     tampil saat online; salinan tersimpan dipakai bila offline atau jaringan > 4 dtk.
   - Gambar & huruf: simpanan dulu (jarang berubah), diperbarui di latar.
   - Saat dipasang hanya kode yang ditunggu (cepat); gambar disalin dari versi lama
     atau diunduh menyusul, jadi versi baru aktif tanpa menunggu 5 MB gambar.
   - /api/* (Kak Nala AI, memori, jejak) selalu lewat jaringan, tidak disimpan.
   VERSI dan DAFTAR_SIMPAN diperbarui otomatis oleh: node alat/perbarui-sw.js
   ========================================================= */
const VERSI = 'nalarstem-7d13cca4';
const DAFTAR_SIMPAN = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/style.css',
  'js/app.js',
  'js/data-2.js',
  'js/data.js',
  'js/jejak.js',
  'js/memori.js',
  'js/modetes.js',
  'js/presentasi.js',
  'js/sim-2.js',
  'js/sim.js',
  'js/tes.js',
  'js/tutor.js',
  'assets/img/hero.jpg',
  'assets/img/ikon-180.png',
  'assets/img/ikon-192.png',
  'assets/img/ikon-64.png',
  'assets/img/kak-nala-wajah.jpg',
  'assets/img/kak-nala.jpg',
  'assets/img/kosong.jpg',
  'assets/img/logo.jpg',
  'assets/img/misi-angin.jpg',
  'assets/img/misi-boraks.jpg',
  'assets/img/misi-bunyi.jpg',
  'assets/img/misi-garam.jpg',
  'assets/img/misi-gempa.jpg',
  'assets/img/misi-hidroponik.jpg',
  'assets/img/misi-jembatan.jpg',
  'assets/img/misi-kompos.jpg',
  'assets/img/misi-listrik.jpg',
  'assets/img/misi-magnet.jpg',
  'assets/img/misi-mangrove.jpg',
  'assets/img/misi-nyamuk.jpg',
  'assets/img/misi-optik.jpg',
  'assets/img/misi-pendingin.jpg',
  'assets/img/misi-pengering.jpg',
  'assets/img/misi-penjernih.jpg',
  'assets/img/misi-perahu.jpg',
  'assets/img/misi-pesawat.jpg',
  'assets/img/misi-roket.jpg',
  'assets/img/misi-roketair.jpg',
  'assets/img/misi-sejuk.jpg',
  'assets/img/misi-tempe.jpg',
  'assets/img/misi-tetes.jpg',
  'assets/img/og-cover.jpg',
  'assets/img/portofolio.jpg',
  'assets/img/uji-nalar.jpg',
  'assets/img/sim/baterai-aa.png',
  'assets/img/sim/bg-angin.jpg',
  'assets/img/sim/bg-hidroponik.jpg',
  'assets/img/sim/bg-jembatan.jpg',
  'assets/img/sim/bg-kelas-gelap.jpg',
  'assets/img/sim/bg-lapangan.jpg',
  'assets/img/sim/bg-listrik.jpg',
  'assets/img/sim/bg-magnet.jpg',
  'assets/img/sim/bg-pendingin.jpg',
  'assets/img/sim/bg-penjernih.jpg',
  'assets/img/sim/bg-pentas.jpg',
  'assets/img/sim/bg-perahu.jpg',
  'assets/img/sim/bg-tambak.jpg',
  'assets/img/sim/bilah.png',
  'assets/img/sim/botol-beban.png',
  'assets/img/sim/ember.png',
  'assets/img/sim/es-batu.png',
  'assets/img/sim/generator.png',
  'assets/img/sim/hp-layar.png',
  'assets/img/sim/ikan.png',
  'assets/img/sim/kaleng-alu.png',
  'assets/img/sim/karung.png',
  'assets/img/sim/klip.png',
  'assets/img/sim/lampu-menyala.png',
  'assets/img/sim/lampu-padam.png',
  'assets/img/sim/paku.png',
  'assets/img/sim/piala.png',
  'assets/img/sim/pompa.png',
  'assets/img/sim/roket-air.png',
  'assets/img/sim/roket-cuka.png',
  'assets/img/sim/sasando.png',
  'assets/img/sim/sawi-1.png',
  'assets/img/sim/sawi-2.png',
  'assets/img/sim/sawi-3.png',
  'assets/img/sim/sawi-4.png',
  'assets/img/sim/sawi-5.png',
  'assets/img/sim/sawi-layu.png'
];
const SIMPANAN = 'nalarstem-aplikasi-' + VERSI;
const SIMPANAN_FONT = 'nalarstem-font';
// Kode & halaman: kecil, wajib ada sebelum SW baru aktif. Gambar: disimpan menyusul di latar.
const KODE = DAFTAR_SIMPAN.filter(u => !/\.(jpg|jpeg|png|webp|svg)$/i.test(u));
const GAMBAR = DAFTAR_SIMPAN.filter(u => /\.(jpg|jpeg|png|webp|svg)$/i.test(u));
const BATAS_JARINGAN_MS = 4000;

async function simpanSatu(c, u) { try { await c.add(new Request(u, { cache: 'reload' })); } catch (e) { /* dicoba lagi saat dipakai */ } }

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(SIMPANAN);
    // salin gambar dari simpanan versi lama agar tidak perlu diunduh ulang
    for (const nama of await caches.keys()) {
      if (!nama.startsWith('nalarstem-aplikasi-') || nama === SIMPANAN) continue;
      const lama = await caches.open(nama);
      await Promise.all(GAMBAR.map(async u => { const r = await lama.match(u); if (r) await c.put(u, r); }));
    }
    await Promise.all(KODE.map(u => simpanSatu(c, u)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const nama = await caches.keys();
    await Promise.all(nama.filter(n => n.startsWith('nalarstem-aplikasi-') && n !== SIMPANAN).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
  // gambar yang belum ada disimpan pelan-pelan setelah aktif
  caches.open(SIMPANAN).then(async c => { for (const u of GAMBAR) if (!(await c.match(u))) await simpanSatu(c, u); });
});

// Jaringan dulu (versi terbaru), simpanan bila offline/lambat.
async function jaringanDulu(req, kunciSimpan) {
  const c = await caches.open(SIMPANAN);
  const dariJaringan = fetch(req, { cache: 'no-cache' }).then(res => {
    if (res && res.ok) c.put(kunciSimpan || req, res.clone());
    return res;
  });
  const batas = new Promise(r => setTimeout(r, BATAS_JARINGAN_MS, null));
  try {
    const res = await Promise.race([dariJaringan, batas]);
    if (res && res.ok) return res;
  } catch (e) { /* offline */ }
  const lama = await c.match(kunciSimpan || req, { ignoreSearch: true });
  if (lama) return lama;
  try { return await dariJaringan; } catch (e) { return Response.error(); }
}

// Simpanan dulu (gambar & huruf jarang berubah), sambil memperbarui di latar.
async function simpananDulu(req, namaSimpanan, opsiCocok) {
  const c = await caches.open(namaSimpanan);
  const lama = await c.match(req, opsiCocok);
  const baru = fetch(req).then(res => {
    if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
    return res;
  }).catch(() => null);
  return lama || (await baru) || Response.error();
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(simpananDulu(req, SIMPANAN_FONT));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return; // AI & data selalu lewat jaringan

  // Membuka halaman (termasuk ?v=…): index.html terbaru, atau salinan bila offline
  if (req.mode === 'navigate') { e.respondWith(jaringanDulu(new Request('./'), './')); return; }
  if (/\.(jpg|jpeg|png|webp|svg|ico)$/i.test(url.pathname)) { e.respondWith(simpananDulu(req, SIMPANAN, { ignoreSearch: true })); return; }
  e.respondWith(jaringanDulu(req));
});

self.addEventListener('message', e => {
  if (e.data === 'status') {
    caches.open(SIMPANAN).then(c => c.keys()).then(k => e.source.postMessage({ jenis: 'status', tersimpan: k.length, total: DAFTAR_SIMPAN.length, versi: VERSI }));
  }
});
