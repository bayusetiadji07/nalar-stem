# NalarSTEM — Lab IPA STEM dengan AI Tutor

Aplikasi pembelajaran IPA berbasis **STEM** (SMP, Fase D) untuk melatih **berpikir kritis** murid,
dengan AI Tutor Sokratik **"Kak Nala"** (Google Gemini) yang menuntun lewat pertanyaan, bukan memberi jawaban.

## Isi
- **4 Misi STEM** (kontekstual pesisir Besuki), masing-masing 6 langkah Engineering Design Process:
  1. Perahu Penyelamat Hasil Panen — Hukum Archimedes (kelas 8)
  2. Penjernih Air Sederhana — pemisahan campuran/filtrasi (kelas 7)
  3. Kotak Pendingin Ikan Nelayan — kalor & perpindahan kalor (kelas 7)
  4. Kebun Sawi Hidroponik — fotosintesis & faktor pembatas (kelas 7–8)
- **Laboratorium maya** (Canvas 2D) + tabel data + grafik pilih-sumbu + **detektor uji adil**
  (menandai uji yang mengubah >1 variabel) + kolom **prediksi sebelum menguji**.
- **Lembar kerja** tiap langkah, dinilai AI dengan rubrik 1–4 pada 6 indikator Facione
  (Interpretasi, Analisis, Inferensi, Evaluasi, Eksplanasi, Regulasi Diri).
- **Uji Nalar** — 12 soal literasi sains/berpikir kritis + pembahasan + diskusi dengan Kak Nala.
- **Portofolio** — grafik radar indikator, ringkasan, jawaban lengkap, cetak/PDF.
- **Panduan Guru** — sintaks, rubrik, catatan model.

## Sumber AI (menu Pengaturan AI)
| Mode | Keterangan |
|---|---|
| Server sekolah | Browser → `/api/tutor` → Gemini. Kunci di env `GEMINI_API_KEY` (Vercel atau `.env` lokal). |
| Kunci pribadi | Browser memanggil Gemini langsung dengan kunci milik pengguna (disimpan di localStorage). |
| Tutor lokal | Tanpa internet: petunjuk & penilaian berbasis aturan. Juga jadi cadangan otomatis bila AI gagal. |

Model: `gemini-2.5-flash` (cadangan otomatis ke `2.5-flash-lite` / `2.0-flash` saat 429/503).

## Menjalankan
```bash
node server-lokal.js      # http://localhost:3140
```
Buat berkas `.env` berisi `GEMINI_API_KEY=...` agar mode "Server sekolah" aktif.
Bisa juga dibuka langsung `index.html` (file://) — pakai mode kunci pribadi atau tutor lokal.

## Deploy ke Vercel
Folder ini siap deploy apa adanya (statis + fungsi `api/tutor.js`). Setel env `GEMINI_API_KEY` di Vercel.

Data murid disimpan di `localStorage` perangkat masing-masing (kunci `nalarstem-v1`).
