# NalarSTEM — Lab IPA STEM dengan AI Tutor

Aplikasi pembelajaran IPA berbasis **STEM** (SMP, Fase D) untuk melatih **berpikir kritis** murid,
dengan AI Tutor Sokratik **"Kak Nala"** (Google Gemini) yang menuntun lewat pertanyaan, bukan memberi jawaban.

## Isi
- **14 Misi STEM** (kontekstual pesisir Besuki), masing-masing 7 langkah (6 langkah Engineering Design Process + praktik nyata):
  1. Perahu Penyelamat Hasil Panen — Hukum Archimedes (kelas 8)
  2. Penjernih Air Sederhana — pemisahan campuran/filtrasi (kelas 7)
  3. Kotak Pendingin Ikan Nelayan — kalor & perpindahan kalor (kelas 7)
  4. Kebun Sawi Hidroponik — fotosintesis & faktor pembatas (kelas 7–8)
  5. Roket Cuka & Soda Kue — perubahan materi/perubahan kimia & pereaksi pembatas (kelas 7)
  6. Roket Air Bertekanan — tekanan gas, hukum Boyle & aksi–reaksi; simulasi numerik semburan air + hambatan udara (kelas 8)
  7. Jembatan Stik Es Krim — gaya tekan & tarik, rangka segitiga, tekuk Euler, efisiensi struktur (kelas 8)
  8. Pembangkit Listrik Tenaga Angin — perubahan energi, daya angin ½ρAv³, batas Betz, generator & gir (kelas 7–9)
  9. Lampu Belajar Darurat — rangkaian listrik sederhana: Hukum Ohm, seri vs paralel, LED & resistor pembatas, kapasitas baterai (kelas 8–9)
  10. Derek Elektromagnet Pemilah Sampah — kemagnetan, lilitan/arus/inti, besi lunak vs baja, bahan nonmagnetik, panas kawat I²R (kelas 9)
  11. Pengangkat Karung Garam — pesawat sederhana: tuas jenis 1 & katrol/takal, keuntungan mekanis, usaha & efisiensi (kelas 8)
  12. Proyektor HP dari Kardus — cermin & lensa: 1/f = 1/s + 1/s', bayangan nyata/maya, perbesaran, ketajaman, kecerahan, diagram sinar (kelas 8)
  13. Sasando Mini dari Kardus — getaran, gelombang & bunyi: hukum Mersenne, frekuensi vs amplitudo, resonansi, nada dibunyikan via Web Audio (kelas 8)
  14. Rumah Tahan Gempa dari Kardus — meja getar 3 Hz, frekuensi alami & resonansi, bresing/dinding geser, atap ringan, isolasi dasar karet vs kelereng (kelas 8)
- **Langkah 7 "Wujudkan di Dunia Nyata"** di setiap misi: alat & bahan, cek keselamatan wajib (langkah kerja terkunci sampai semua dicentang), **rencana langkah kerja yang disusun murid bersama Kak Nala** (murid menulis/mengurutkan langkahnya sendiri; Kak Nala meninjau keselamatan, takaran, pengukuran & keadilan uji lalu memberi maks. 4 saran tambah/ubah/hapus beralasan yang bisa diterima/diabaikan satu per satu; ada peninjau lokal bila AI mati), takaran praktis dihitung dari uji terbaik di simulasi, tabel data uji nyata + foto (dikompres, localStorage), selisih otomatis terhadap prediksi simulasi, tombol "Ada masalah?" ke Kak Nala (keselamatan didahulukan). Data di `NYATA` (js/data.js).
- **Laboratorium maya** (Canvas 2D) + tabel data + grafik pilih-sumbu + **detektor uji adil**
  (menandai uji yang mengubah >1 variabel) + kolom **prediksi sebelum menguji**.
- **Lembar kerja** tiap langkah, dinilai AI dengan rubrik 1–4 pada 6 indikator Facione
  (Interpretasi, Analisis, Inferensi, Evaluasi, Eksplanasi, Regulasi Diri).
- **Uji Nalar** — 22 soal literasi sains/berpikir kritis + pembahasan + diskusi dengan Kak Nala. Aturan menulis soal: kunci tetap opsi[0] (diacak saat tampil), keempat pilihan dibuat sepanjang setara (rasio terpanjang/terpendek ≤ 1,3) dan kunci tidak boleh selalu terpanjang/terpendek; pengecoh berupa miskonsepsi masuk akal dengan alasan, pola kalimat sama (mis. semua "Tepat: …/Kurang tepat: …"), kata hati-hati dan kata mutlak tersebar di kunci maupun pengecoh.
- **Mode presentasi** (js/presentasi.js) — salindia 16:9 otomatis dari data murid (judul & kelompok, masalah, hipotesis, rancangan terbaik + gambar simulasi, data uji, rencana kerja ✨, hasil uji nyata vs simulasi, evaluasi, kesimpulan CER, penutup) dengan tips bicara per salindia, navigasi keyboard/geser, layar penuh, dan cetak/PDF satu salindia per halaman. Dibuka dari Langkah 7 atau Portofolio.
- **Portofolio** — grafik radar indikator, ringkasan, jawaban lengkap, cetak/PDF.
- **Peta Jejak Berpikir** (`#/jejak`, bersandi guru) — guru membuat kelas berkode; murid memasukkan kode di Beranda dan jejak ujinya terkirim otomatis (tabel `nalar_kelas`/`nalar_jejak`, RPC `nalar_jejak_kirim`, `nalar_guru_*`). Per murid: uji adil vs coba-coba, prediksi, jeda berpikir antar-uji, kapan kriteria terpenuhi → pola Sistematis/Berkembang/Coba-coba/Tebak cepat/Berhenti dini + saran tindak lanjut; peta jejak per uji; unduh CSV. Tab **Partisipasi**: skor 0–100 (langkah selesai 30, uji maya 20, prediksi 10, pertanyaan diketik sendiri ke Kak Nala 20, isian lembar kerja 10, pemeriksaan lembar kerja 10), pertanyaan sendiri vs tombol, lembar kerja diisi/diperiksa/diperbaiki, hari aktif, Uji Nalar pertama → terakhir (riwayat di S.ujiNalarRiwayat, dikirim sebagai misi "ujinalar"), daftar "perlu disapa". Isi chat tidak ikut terkirim, hanya hitungannya.
- **Panduan Guru** — sintaks, rubrik, catatan model.

## Aplikasi terpasang & offline (PWA)

- `manifest.webmanifest` + `sw.js` (service worker). Setelah dibuka sekali saat online, semua halaman, kode, gambar (±5 MB) dan Google Fonts tersimpan di perangkat; aplikasi bisa dibuka tanpa internet dan dipasang ke layar utama (tombol "📲 Pasang aplikasi" atau menu browser).
- Strategi: berkas aplikasi stale-while-revalidate (cepat & offline, diperbarui di latar); `/api/*` selalu lewat jaringan. Saat offline Kak Nala memakai salinan Memori + tutor lokal; jejak Peta Jejak antre lalu terkirim saat online. Status kesiapan offline ada di halaman Pengaturan.
- **Wajib sebelum commit bila ada berkas aplikasi yang berubah/ditambah:** `node alat/perbarui-sw.js` (memperbarui DAFTAR_SIMPAN & VERSI di sw.js). Folder `alat/` tidak ikut tayang (.vercelignore).

## Sumber AI (menu Pengaturan AI)
| Mode | Keterangan |
|---|---|
| Server sekolah | Browser → `/api/tutor` → Gemini. Kunci di env `GEMINI_API_KEY` (Vercel atau `.env` lokal). |
| Kunci pribadi | Browser memanggil Gemini langsung dengan kunci milik pengguna (disimpan di localStorage). |
| Tutor lokal | Tanpa internet: petunjuk & penilaian berbasis aturan. Juga jadi cadangan otomatis bila AI gagal. |

Model: `gemini-3.6-flash` (tercepat, ± 2 detik), dengan rantai cadangan otomatis `3.5-flash-lite` → `3.5-flash` → `flash-lite-latest` → `2.5-flash` (batas 12 detik per model) saat model sibuk (503), kuota habis (429), atau sudah ditutup Google (404). Model yang tak lagi tersedia di pengaturan lama otomatis diganti bawaan.

## Memori Kak Nala (kecerdasan lokal)
- Setiap jawaban chat & penilaian AI direkam **tanpa nama** (email/telepon/tautan disamarkan) ke Supabase,
  tabel `nalar_memori` (proyek bersama `wddfpmsurcftapbczise`, migrasi `nalar_memori_kak_nala`).
- Tabel dikunci RLS tanpa policy; akses hanya lewat fungsi `nalar_*` (SECURITY DEFINER) melalui `api/memori.js`.
- Saat AI gagal: chat mencari tanya-jawab mirip (trigram `pg_trgm`, misi & langkah sama, yang **disetujui guru** diutamakan);
  penilaian memakai rata-rata berbobot skor jawaban-jawaban serupa. Tanpa internet: salinan di localStorage (`nalarstem-memori`, diperbarui tiap 6 jam).
- Guru mengkurasi di `#/kurasi` (sandi guru disimpan bcrypt di `nalar_pengaturan`; bisa diganti dari halaman itu).
- Murid bisa mematikan perekaman di Pengaturan AI.

## Menjalankan
```bash
node server-lokal.js      # http://localhost:3140
```
Buat berkas `.env` berisi `GEMINI_API_KEY=...` agar mode "Server sekolah" aktif.
Bisa juga dibuka langsung `index.html` (file://) — pakai mode kunci pribadi atau tutor lokal.

## Deploy ke Vercel
Folder ini siap deploy apa adanya (statis + fungsi `api/tutor.js`). Setel env `GEMINI_API_KEY` di Vercel.

Data murid disimpan di `localStorage` perangkat masing-masing (kunci `nalarstem-v1`).
