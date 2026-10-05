/* =========================================================
   NalarSTEM — service worker (aplikasi tetap bisa dibuka tanpa internet)
   - Saat dipasang: menyimpan semua halaman, kode, dan gambar (DAFTAR_SIMPAN).
   - Berkas aplikasi: ambil dari simpanan dulu agar cepat & bisa offline,
     sambil memperbarui simpanan di latar belakang (stale-while-revalidate).
   - /api/* (Kak Nala AI, memori, jejak) selalu lewat jaringan, tidak disimpan.
   VERSI dan DAFTAR_SIMPAN diperbarui otomatis oleh: node alat/perbarui-sw.js
   ========================================================= */
const VERSI = 'nalarstem-f70408f8';
const DAFTAR_SIMPAN = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/style.css',
  'js/app.js',
  'js/data.js',
  'js/jejak.js',
  'js/memori.js',
  'js/modetes.js',
  'js/presentasi.js',
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
  'assets/img/misi-bunyi.jpg',
  'assets/img/misi-gempa.jpg',
  'assets/img/misi-hidroponik.jpg',
  'assets/img/misi-jembatan.jpg',
  'assets/img/misi-listrik.jpg',
  'assets/img/misi-magnet.jpg',
  'assets/img/misi-optik.jpg',
  'assets/img/misi-pendingin.jpg',
  'assets/img/misi-penjernih.jpg',
  'assets/img/misi-perahu.jpg',
  'assets/img/misi-pesawat.jpg',
  'assets/img/misi-roket.jpg',
  'assets/img/misi-roketair.jpg',
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

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(SIMPANAN);
    // satu per satu agar satu berkas gagal tidak menggagalkan semuanya
    await Promise.all(DAFTAR_SIMPAN.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const nama = await caches.keys();
    await Promise.all(nama.filter(n => n.startsWith('nalarstem-aplikasi-') && n !== SIMPANAN).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

async function simpanLaluKirim(req, namaSimpanan, opsiCocok) {
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

  // Google Fonts: simpan agar huruf tetap tampil saat offline
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(simpanLaluKirim(req, SIMPANAN_FONT));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return; // AI & data selalu lewat jaringan

  // Membuka halaman (termasuk ?v=…): selalu jawab dengan index.html
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const c = await caches.open(SIMPANAN);
      const baru = fetch(req).then(res => { if (res.ok) c.put('./', res.clone()); return res; }).catch(() => null);
      return (await c.match('./')) || (await baru) || (await c.match('index.html')) || Response.error();
    })());
    return;
  }
  e.respondWith(simpanLaluKirim(req, SIMPANAN, { ignoreSearch: true }));
});

self.addEventListener('message', e => {
  if (e.data === 'status') {
    caches.open(SIMPANAN).then(c => c.keys()).then(k => e.source.postMessage({ jenis: 'status', tersimpan: k.length, total: DAFTAR_SIMPAN.length, versi: VERSI }));
  }
});
