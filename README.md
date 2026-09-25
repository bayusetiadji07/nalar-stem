# NalarSTEM — Lab IPA STEM dengan AI Tutor

Aplikasi pembelajaran IPA berbasis **STEM** (SMP, Fase D) untuk melatih **berpikir kritis** murid,
dengan AI Tutor Sokratik **"Kak Nala"** (Google Gemini) yang menuntun lewat pertanyaan, bukan memberi jawaban.

## Isi
- **5 Misi STEM** (kontekstual pesisir Besuki), masing-masing 7 langkah (6 langkah Engineering Design Process + praktik nyata):
  1. Perahu Penyelamat Hasil Panen — Hukum Archimedes (kelas 8)
  2. Penjernih Air Sederhana — pemisahan campuran/filtrasi (kelas 7)
  3. Kotak Pendingin Ikan Nelayan — kalor & perpindahan kalor (kelas 7)
  4. Kebun Sawi Hidroponik — fotosintesis & faktor pembatas (kelas 7–8)
  5. Roket Cuka & Soda Kue — perubahan materi/perubahan kimia & pereaksi pembatas (kelas 7)
- **Langkah 7 "Wujudkan di Dunia Nyata"** di setiap misi: alat & bahan, cek keselamatan wajib (langkah kerja terkunci sampai semua dicentang), langkah kerja, takaran praktis dihitung dari uji terbaik di simulasi, tabel data uji nyata + foto (dikompres, localStorage), selisih otomatis terhadap prediksi simulasi, tombol "Ada masalah?" ke Kak Nala (keselamatan didahulukan). Data di `NYATA` (js/data.js).
- **Laboratorium maya** (Canvas 2D) + tabel data + grafik pilih-sumbu + **detektor uji adil**
  (menandai uji yang mengubah >1 variabel) + kolom **prediksi sebelum menguji**.
- **Lembar kerja** tiap langkah, dinilai AI dengan rubrik 1–4 pada 6 indikator Facione
  (Interpretasi, Analisis, Inferensi, Evaluasi, Eksplanasi, Regulasi Diri).
- **Uji Nalar** — 13 soal literasi sains/berpikir kritis + pembahasan + diskusi dengan Kak Nala.
- **Portofolio** — grafik radar indikator, ringkasan, jawaban lengkap, cetak/PDF.
- **Panduan Guru** — sintaks, rubrik, catatan model.

## Sumber AI (menu Pengaturan AI)
| Mode | Keterangan |
|---|---|
| Server sekolah | Browser → `/api/tutor` → Gemini. Kunci di env `GEMINI_API_KEY` (Vercel atau `.env` lokal). |
| Kunci pribadi | Browser memanggil Gemini langsung dengan kunci milik pengguna (disimpan di localStorage). |
| Tutor lokal | Tanpa internet: petunjuk & penilaian berbasis aturan. Juga jadi cadangan otomatis bila AI gagal. |

Model: `gemini-3.6-flash` (tercepat, ± 2 detik), dengan rantai cadangan otomatis `3.5-flash-lite` → `3.5-flash` → `flash-lite-latest` → `2.5-flash` (batas 12 detik per model) saat model sibuk (503), kuota habis (429), atau sudah ditutup Google (404). Model yang tak lagi tersedia di pengaturan lama otomatis diganti bawaan.

## Menjalankan
```bash
node server-lokal.js      # http://localhost:3140
```
Buat berkas `.env` berisi `GEMINI_API_KEY=...` agar mode "Server sekolah" aktif.
Bisa juga dibuka langsung `index.html` (file://) — pakai mode kunci pribadi atau tutor lokal.

## Deploy ke Vercel
Folder ini siap deploy apa adanya (statis + fungsi `api/tutor.js`). Setel env `GEMINI_API_KEY` di Vercel.

Data murid disimpan di `localStorage` perangkat masing-masing (kunci `nalarstem-v1`).
