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
    const e = new Error(pesan); e.status = /sandi/i.test(pesan) ? 401 : 502; throw e;
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
      default:
        return res.status(400).json({ error: 'Aksi tidak dikenal.' });
    }
  } catch (e) {
    return res.status(e.status || 502).json({ error: e.message });
  }
};
