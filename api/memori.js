// Memori Kak Nala: perantara ke fungsi RPC Supabase (tabel nalar_memori).
// Kunci "publishable" Supabase memang boleh publik; semua akses tabel dikunci RLS
// dan hanya lewat fungsi SECURITY DEFINER (lihat migrasi nalar_memori_kak_nala).
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wddfpmsurcftapbczise.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_kbPqKDodER85J6w3qls1UQ_iitjQFlm';

const ID = /^[a-z]{0,20}$/;

// Buang data pribadi yang mungkin terketik murid: email, nomor telepon, tautan.
function samarkan(teks) {
  return String(teks || '')
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '[email]')
    .replace(/(\+62|\b0)8[\d\s-]{7,13}\d/g, '[nomor]')
    .replace(/https?:\/\/\S+/g, '[tautan]')
    .trim();
}

async function rpc(fungsi, param) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fungsi}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    body: JSON.stringify(param || {}),
    signal: AbortSignal.timeout(10000)
  });
  const d = await r.json().catch(() => null);
  if (!r.ok) {
    const pesan = (d && (d.message || d.hint)) || `Supabase membalas ${r.status}`;
    const e = new Error(pesan);
    e.status = /sesi masuk|sandi guru salah|email atau sandi salah|sandi lama salah|dinonaktifkan/i.test(pesan) ? 401
      : /khusus admin/i.test(pesan) ? 403
      : /tidak ditemukan|tidak valid|belum diisi|terlalu|sudah terdaftar|minimal|tidak bisa/i.test(pesan) ? 400 : 502;
    throw e;
  }
  return d;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Gunakan POST' });
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
  if (!b || typeof b.aksi !== 'string') return res.status(400).json({ error: 'Permintaan tidak valid.' });
  const misi = String(b.misi || 'umum'), langkah = String(b.langkah || '');
  if (!ID.test(misi) || !misi || !ID.test(langkah)) return res.status(400).json({ error: 'Misi/langkah tidak valid.' });
  const jenis = b.jenis === 'nilai' ? 'nilai' : 'chat';
  const token = String(b.token || '').slice(0, 100);
  const kode = String(b.kode || '').slice(0, 12);

  try {
    switch (b.aksi) {
      case 'rekam': {
        const pertanyaan = samarkan(b.pertanyaan).slice(0, 4000);
        const jawaban = samarkan(b.jawaban).slice(0, 6000);
        if (pertanyaan.length < 2 || jawaban.length < 2) return res.status(400).json({ error: 'Isi rekaman terlalu pendek.' });
        const skor = b.skor && typeof b.skor === 'object' ? b.skor : null;
        const id = await rpc('nalar_rekam', {
          p_jenis: jenis, p_misi: misi, p_langkah: langkah, p_pertanyaan: pertanyaan, p_jawaban: jawaban,
          p_skor: skor, p_spesifik: !!b.spesifik, p_model: String(b.model || '').slice(0, 60) || null
        });
        return res.status(200).json({ id });
      }
      case 'cari': {
        const teks = String(b.teks || '').slice(0, 4000);
        if (teks.length < 2) return res.status(200).json({ hasil: [] });
        const hasil = await rpc('nalar_cari', { p_jenis: jenis, p_misi: misi, p_langkah: langkah, p_teks: teks, p_batas: Math.min(+b.batas || 3, 10) });
        if (hasil && hasil[0] && b.catat !== false) await rpc('nalar_catat_pakai', { p_id: hasil[0].id }).catch(() => {});
        return res.status(200).json({ hasil: hasil || [] });
      }
      case 'paket':
        return res.status(200).json({ hasil: await rpc('nalar_paket', {}) });
      case 'guru_cek':
        return res.status(200).json({ ok: await rpc('nalar_guru_cek', { p_sandi: String(b.sandi || '') }) });
      case 'guru_daftar':
        return res.status(200).json(await rpc('nalar_guru_daftar', {
          p_sandi: String(b.sandi || ''), p_status: b.status || null, p_misi: b.filterMisi || null,
          p_jenis: b.filterJenis || null, p_cari: b.cari ? String(b.cari).slice(0, 100) : null,
          p_batas: Math.min(+b.batas || 30, 100), p_lewati: Math.max(+b.lewati || 0, 0)
        }));
      case 'guru_ubah':
        await rpc('nalar_guru_ubah', {
          p_sandi: String(b.sandi || ''), p_id: +b.id,
          p_status: ['baru', 'disetujui', 'ditolak'].includes(b.status) ? b.status : null,
          p_jawaban: typeof b.jawaban === 'string' ? samarkan(b.jawaban) : null,
          p_spesifik: typeof b.spesifik === 'boolean' ? b.spesifik : null
        });
        return res.status(200).json({ ok: true });
      case 'guru_hapus':
        await rpc('nalar_guru_hapus', { p_sandi: String(b.sandi || ''), p_id: +b.id });
        return res.status(200).json({ ok: true });
      case 'guru_sandi':
        await rpc('nalar_guru_sandi', { p_sandi_lama: String(b.sandi || ''), p_sandi_baru: String(b.sandiBaru || '') });
        return res.status(200).json({ ok: true });
      // ---- Peta jejak berpikir ----
      case 'kelas_cek':
        return res.status(200).json({ nama: await rpc('nalar_kelas_cek', { p_kode: String(b.kode || '').slice(0, 12) }) });
      case 'kelas_info':
        return res.status(200).json((await rpc('nalar_kelas_info', { p_kode: String(b.kode || '').slice(0, 12) })) || {});
      case 'guru_tes_atur': {
        const t = b.tes && typeof b.tes === 'object' ? { misi: String(b.tes.misi || ''), paket: b.tes.paket === 'B' ? 'B' : 'A', bahas: !!b.tes.bahas } : null;
        if (b.token) return res.status(200).json({ tes: await rpc('nalar_g_tes_atur', { p_token: token, p_kode: kode, p_tes: t }) });
        return res.status(200).json({ tes: await rpc('nalar_guru_tes_atur', { p_sandi: String(b.sandi || ''), p_kode: kode, p_tes: t }) });
      }
      // ---- Akun guru (kelas & jejak terpisah per guru) ----
      case 'akun_daftar':
        return res.status(200).json(await rpc('nalar_akun_daftar', {
          p_email: String(b.email || '').slice(0, 120), p_nama: String(b.nama || '').slice(0, 80),
          p_sekolah: String(b.sekolah || '').slice(0, 100), p_kabupaten: String(b.kabupaten || '').slice(0, 60), p_sandi: String(b.sandiBaru || '').slice(0, 100)
        }));
      case 'akun_masuk':
        return res.status(200).json(await rpc('nalar_akun_masuk', { p_email: String(b.email || '').slice(0, 120), p_sandi: String(b.sandi || '').slice(0, 100) }));
      case 'akun_profil':
        return res.status(200).json({ guru: await rpc('nalar_akun_profil', { p_token: token }) });
      case 'akun_keluar':
        await rpc('nalar_akun_keluar', { p_token: token });
        return res.status(200).json({ ok: true });
      case 'akun_sandi':
        await rpc('nalar_akun_sandi', { p_token: token, p_lama: String(b.sandi || ''), p_baru: String(b.sandiBaru || '').slice(0, 100) });
        return res.status(200).json({ ok: true });
      case 'admin_guru_daftar':
        return res.status(200).json({ hasil: await rpc('nalar_admin_guru_daftar', { p_token: token }) });
      case 'admin_guru_atur':
        await rpc('nalar_admin_guru_atur', {
          p_token: token, p_id: +b.id, p_aktif: typeof b.aktif === 'boolean' ? b.aktif : null,
          p_sandi_baru: typeof b.sandiBaru === 'string' ? b.sandiBaru.slice(0, 100) : null
        });
        return res.status(200).json({ ok: true });
      case 'jejak_kirim': {
        if (!b.data || typeof b.data !== 'object') return res.status(400).json({ error: 'Data jejak tidak valid.' });
        await rpc('nalar_jejak_kirim', {
          p_kode: String(b.kode || '').slice(0, 12), p_perangkat: String(b.perangkat || ''),
          p_nama: String(b.nama || '').slice(0, 60), p_kelas: String(b.kelas || '').slice(0, 12), p_misi: misi, p_data: b.data
        });
        return res.status(200).json({ ok: true });
      }
      // Peta jejak: dengan token akun guru (baru) atau sandi global (lama, hanya admin)
      case 'guru_kelas_buat':
        return res.status(200).json({ kode: b.token
          ? await rpc('nalar_g_kelas_buat', { p_token: token, p_nama: String(b.nama || '').slice(0, 60) })
          : await rpc('nalar_guru_kelas_buat', { p_sandi: String(b.sandi || ''), p_nama: String(b.nama || '').slice(0, 60) }) });
      case 'guru_kelas_daftar':
        return res.status(200).json({ hasil: b.token
          ? await rpc('nalar_g_kelas_daftar', { p_token: token })
          : await rpc('nalar_guru_kelas_daftar', { p_sandi: String(b.sandi || '') }) });
      case 'guru_jejak':
        return res.status(200).json({ hasil: b.token
          ? await rpc('nalar_g_jejak', { p_token: token, p_kode: kode })
          : await rpc('nalar_guru_jejak', { p_sandi: String(b.sandi || ''), p_kode: kode }) });
      case 'guru_kelas_hapus':
        if (b.token) await rpc('nalar_g_kelas_hapus', { p_token: token, p_kode: kode });
        else await rpc('nalar_guru_kelas_hapus', { p_sandi: String(b.sandi || ''), p_kode: kode });
        return res.status(200).json({ ok: true });
      case 'guru_jejak_hapus':
        if (b.token) await rpc('nalar_g_jejak_hapus', { p_token: token, p_kode: kode, p_perangkat: String(b.perangkat || '') });
        else await rpc('nalar_guru_jejak_hapus', { p_sandi: String(b.sandi || ''), p_kode: kode, p_perangkat: String(b.perangkat || '') });
        return res.status(200).json({ ok: true });
      default:
        return res.status(400).json({ error: 'Aksi tidak dikenal.' });
    }
  } catch (e) {
    return res.status(e.status || 502).json({ error: e.message });
  }
};
