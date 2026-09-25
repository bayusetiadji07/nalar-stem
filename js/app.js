/* =========================================================
   NalarSTEM — aplikasi utama (router, tampilan, penyimpanan)
   ========================================================= */

const KUNCI = 'nalarstem-v1';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const polos = html => String(html).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

let S = muat();
function muat() {
  try { const d = JSON.parse(localStorage.getItem(KUNCI)); if (d && d.misi) return d; } catch (e) { /* abaikan */ }
  return { profil: { nama: '', kelas: '' }, misi: {}, kuis: { jawab: {}, diperiksa: false, urutan: null }, chat: {} };
}
function simpan() { try { localStorage.setItem(KUNCI, JSON.stringify(S)); return true; } catch (e) { return false; } }
function ms(id) {
  if (!S.misi[id]) S.misi[id] = { isian: {}, uji: [], nilai: {}, v: null };
  const m = MISI.find(x => x.id === id);
  if (!S.misi[id].v) S.misi[id].v = Object.fromEntries(m.variabel.map(v => [v.id, v.awal]));
  if (!S.misi[id].nyata) S.misi[id].nyata = { cek: {}, uji: [] };
  return S.misi[id];
}

/* ---------------- Utilitas tampilan ---------------- */
function opsiVar(v) { return v.opsi === 'LAPISAN' ? LAPISAN : v.opsi; }
function tampilVar(v, nilai) {
  if (v.tipe === 'select') { const o = opsiVar(v).find(x => x[0] === nilai); return o ? o[1] : nilai; }
  return `${String(nilai).replace('.', ',')} ${v.satuan}`;
}
function tampilKeluaran(k, nilai) {
  if (k.satuan === 'Rp') return rp(nilai);
  if (typeof nilai === 'number') return `${nilai.toLocaleString('id-ID')} ${k.satuan}`.trim();
  return nilai;
}
function langkahTerisi(m, st, L) {
  const ok = L.isian.every(f => (st.isian[f.id] || '').trim().length >= 3);
  if (L.id === 'uji') return ok && st.uji.length >= 3;
  if (L.id === 'nyata') { const ny = st.nyata || { cek: {}, uji: [] }; return ok && ny.uji.length >= 1 && NYATA[m.id].keselamatan.every((_, i) => ny.cek[i]); }
  return ok;
}
function kemajuan(m) {
  const st = S.misi[m.id];
  if (!st) return 0;
  return LANGKAH.filter(L => langkahTerisi(m, st, L)).length;
}
function mdLite(t) {
  let h = esc(t);
  h = h.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|\s)\*(\S.+?)\*(?=\s|$|[.,!?])/g, '$1<i>$2</i>');
  h = h.replace(/^\s*[-•]\s+(.+)$/gm, '<li>$1</li>').replace(/(<li>.*<\/li>)(?!\s*<li>)/gs, '<ul>$1</ul>');
  return h.replace(/\n/g, '<br>').replace(/<\/li><br>/g, '</li>').replace(/<ul><br>/g, '<ul>');
}
function toast(teks, jenis = '') {
  const t = document.createElement('div');
  t.className = 'toast ' + jenis; t.textContent = teks;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('hilang'), 2600);
  setTimeout(() => t.remove(), 3100);
}
function tingkatNama(n) { return ['', 'Mulai berkembang', 'Berkembang', 'Cakap', 'Mahir'][n] || '-'; }

/* ---------------- Router ---------------- */
const APP = $('#app');
let bersihkan = [];
function rute() {
  bersihkan.forEach(f => f()); bersihkan = [];
  const [, hal, a, b] = (location.hash || '#/').split('/');
  $$('.nav a').forEach(x => x.classList.toggle('aktif', x.getAttribute('href') === '#/' + (hal || '')));
  document.body.classList.remove('menu-buka');
  window.scrollTo(0, 0);
  setKonteksTutor({ jenis: 'umum' });
  if (hal === 'misi' && a) return halMisi(a, +b || 1);
  if (hal === 'misi') return halDaftarMisi();
  if (hal === 'uji-nalar') return halUjiNalar();
  if (hal === 'portofolio') return halPortofolio();
  if (hal === 'guru') return halGuru();
  if (hal === 'pengaturan') return halPengaturan();
  halBeranda();
}
window.addEventListener('hashchange', rute);

/* ---------------- Beranda ---------------- */
function kartuMisi(m) {
  const n = kemajuan(m);
  return `<a class="kartu-misi" href="#/misi/${m.id}/1" style="--aksen:${m.warna}">
    <div class="km-ikon">${m.ikon}</div>
    <div class="km-isi">
      <span class="km-kelas">${esc(m.kelas)}</span>
      <h3>${esc(m.judul)}</h3>
      <p>${esc(m.ringkas)}</p>
      <div class="bilah"><span style="width:${n / LANGKAH.length * 100}%"></span></div>
      <span class="km-status">${n === LANGKAH.length ? '✅ Selesai' : n ? `Langkah ${n}/${LANGKAH.length} selesai` : 'Belum dimulai'}</span>
    </div>
  </a>`;
}

function halBeranda() {
  const c = bacaAI();
  APP.innerHTML = `
  <section class="hero">
    <div class="hero-teks">
      <span class="pil">Pembelajaran IPA berbasis STEM · Fase D</span>
      <h1>Berpikir kritis seperti <em>ilmuwan</em> dan <em>insinyur</em>.</h1>
      <p>Selesaikan masalah nyata di sekitarmu — banjir rob, air keruh, ikan cepat busuk, kebun sekolah, lomba roket — dengan merancang, menguji di laboratorium maya, dan menalar dari data. <b>Kak Nala</b>, AI Tutor-mu, tidak memberi jawaban: ia menuntunmu lewat pertanyaan.</p>
      <div class="hero-aksi">
        <a class="tombol utama" href="#/misi">Mulai Misi STEM →</a>
        <a class="tombol" href="#/uji-nalar">Coba Uji Nalar</a>
      </div>
    </div>
    <div class="hero-kartu">
      <div class="chat-contoh">
        <div class="gelembung siswa">Kak, jawabannya apa? Perahu yang paling bagus ukurannya berapa?</div>
        <div class="gelembung nala"><b>Kak Nala:</b> Kakak yakin kamu bisa menemukannya sendiri! 😊 Di uji 1 perahumu tenggelam dengan muatan 3 kg. Di uji 2 kamu hanya memperbesar tinggi dinding. <b>Apa yang berubah pada kedalaman celupnya?</b></div>
      </div>
    </div>
  </section>

  <section class="profil-kartu kartu">
    <div>
      <h2>👋 ${S.profil.nama ? `Halo, ${esc(S.profil.nama)}!` : 'Kenalan dulu, yuk!'}</h2>
      <p class="redup">Namamu dipakai Kak Nala untuk menyapamu dan dicetak di portofolio. Data tersimpan di perangkat ini saja.</p>
    </div>
    <form id="fProfil" class="baris-form">
      <input id="pNama" placeholder="Nama lengkap" value="${esc(S.profil.nama)}" maxlength="60" required>
      <input id="pKelas" placeholder="Kelas (mis. 8B)" value="${esc(S.profil.kelas)}" maxlength="12">
      <button class="tombol utama">Simpan</button>
    </form>
  </section>

  <section>
    <h2 class="judul-bagian">Enam kebiasaan pemikir kritis</h2>
    <p class="redup">Setiap langkah misi melatih indikator berpikir kritis (Facione) berikut, dan Kak Nala menilainya dengan rubrik 1–4.</p>
    <div class="grid-ind">
      ${INDIKATOR.map(i => `<div class="kartu-ind" style="--c:${i.warna}"><b>${i.nama}</b><span>${i.arti}</span></div>`).join('')}
    </div>
  </section>

  <section>
    <h2 class="judul-bagian">Alur setiap misi</h2>
    <ol class="alur">
      ${LANGKAH.map(L => `<li><span class="no">${L.no}</span><b>${L.judul}</b><small>${L.edp}</small></li>`).join('')}
    </ol>
  </section>

  <section>
    <h2 class="judul-bagian">Misi STEM</h2>
    <div class="grid-misi">${MISI.map(kartuMisi).join('')}</div>
  </section>

  <p class="catatan-ai">Status AI Tutor: <b>${c.sumber === 'lokal' ? 'Tutor lokal (tanpa AI)' : c.sumber === 'pribadi' ? 'Gemini — kunci pribadi' : 'Gemini — server sekolah'}</b> · <a href="#/pengaturan">ubah</a></p>`;
  $('#fProfil').onsubmit = e => {
    e.preventDefault();
    S.profil.nama = $('#pNama').value.trim(); S.profil.kelas = $('#pKelas').value.trim();
    simpan(); toast('Profil tersimpan'); halBeranda();
  };
}

function halDaftarMisi() {
  APP.innerHTML = `<h1 class="judul-hal">Misi STEM</h1>
  <p class="redup">Pilih satu misi. Setiap misi memuat 6 langkah dan laboratorium maya. Kerjakan berurutan — jawabanmu tersimpan otomatis.</p>
  <div class="grid-misi">${MISI.map(kartuMisi).join('')}</div>`;
}

/* ---------------- Halaman misi ---------------- */
function halMisi(id, no) {
  const m = MISI.find(x => x.id === id);
  if (!m) { location.hash = '#/misi'; return; }
  const st = ms(id);
  const L = LANGKAH[jepit(no, 1, LANGKAH.length) - 1];
  setKonteksTutor({ jenis: 'misi', m, L });

  APP.innerHTML = `
  <div class="kepala-misi" style="--aksen:${m.warna}">
    <a href="#/misi" class="kembali">← Semua misi</a>
    <div class="km-judul"><span class="km-ikon besar">${m.ikon}</span><div><span class="km-kelas">${esc(m.kelas)}</span><h1>${esc(m.judul)}</h1></div></div>
  </div>
  <nav class="stepper" style="--aksen:${m.warna}">
    ${LANGKAH.map(x => `<a href="#/misi/${id}/${x.no}" class="${x.no === L.no ? 'aktif' : ''} ${langkahTerisi(m, st, x) ? 'beres' : ''}">
      <span class="no">${langkahTerisi(m, st, x) ? '✓' : x.no}</span><span class="nm">${x.judul}</span></a>`).join('')}
  </nav>
  <div class="tata-misi">
    <div class="kolom-utama">
      <div class="arahan" style="--aksen:${m.warna}">
        <div class="arahan-kepala"><b>Langkah ${L.no} · ${L.judul}</b>
          <span class="ind-tag">${L.indikator.map(i => { const I = INDIKATOR.find(x => x.id === i); return `<span style="--c:${I.warna}">${I.nama}</span>`; }).join('')}</span></div>
        <p>${L.arahan}</p>
      </div>
      <div id="isiLangkah">${isiLangkah(m, st, L)}</div>
      <form class="kartu lembar" id="fIsian">
        <h3>✍️ Lembar kerja</h3>
        ${L.isian.map(f => `<label class="isian"><span>${f.label}</span>
          ${f.pendek ? `<input data-f="${f.id}" placeholder="${esc(f.ph)}" value="${esc(st.isian[f.id] || '')}">`
          : `<textarea data-f="${f.id}" rows="3" placeholder="${esc(f.ph)}">${esc(st.isian[f.id] || '')}</textarea>`}</label>`).join('')}
        <p class="galat" id="galatIsian" hidden></p>
        <div class="aksi-lembar">
          <button type="button" class="tombol utama" id="bPeriksa">🔍 Periksa dengan Kak Nala</button>
          <button type="button" class="tombol" id="bTanya">💬 Minta petunjuk</button>
          <span class="tersimpan" id="tersimpan"></span>
        </div>
        <div id="hasilNilai">${st.nilai[L.id] ? kartuNilai(st.nilai[L.id]) : ''}</div>
      </form>
      <div class="navigasi-langkah">
        ${L.no > 1 ? `<a class="tombol" href="#/misi/${id}/${L.no - 1}">← ${LANGKAH[L.no - 2].judul}</a>` : '<span></span>'}
        ${L.no < LANGKAH.length ? `<a class="tombol utama" href="#/misi/${id}/${L.no + 1}">${LANGKAH[L.no].judul} →</a>` : `<a class="tombol utama" href="#/portofolio">Lihat portofolio →</a>`}
      </div>
    </div>
    <aside class="kolom-samping">
      <div class="kartu">
        <h3>🎯 Kriteria keberhasilan</h3>
        <ul class="daftar-cek">${m.kriteria.map(k => `<li>${esc(k)}</li>`).join('')}</ul>
        <h3>⛓️ Kendala</h3>
        <ul class="daftar-cek kendala">${m.kendala.map(k => `<li>${esc(k)}</li>`).join('')}</ul>
      </div>
      ${st.isian.hipotesis ? `<div class="kartu"><h3>💡 Hipotesismu</h3><p class="kutip">${esc(st.isian.hipotesis)}</p></div>` : ''}
      <div class="kartu kecil"><h3>📊 Uji dilakukan</h3><p><b>${st.uji.length}</b> uji · <b>${st.uji.filter(u => u.adil === true).length}</b> uji adil</p></div>
    </aside>
  </div>`;

  // simpan otomatis
  let tunda;
  $$('#fIsian [data-f]').forEach(el => el.addEventListener('input', () => {
    st.isian[el.dataset.f] = el.value;
    $('#galatIsian').hidden = true;
    clearTimeout(tunda);
    tunda = setTimeout(() => { simpan(); $('#tersimpan').textContent = 'Tersimpan ✓'; perbaruiStepper(m, st); }, 500);
  }));
  $('#bTanya').onclick = () => bukaTutor(`Aku sedang di langkah "${L.judul}". Beri aku petunjuk kecil untuk memulai.`, 1);
  $('#bPeriksa').onclick = async () => {
    const kosong = L.isian.filter(f => (st.isian[f.id] || '').trim().length < 3);
    if (kosong.length) { const g = $('#galatIsian'); g.textContent = 'Isi dulu semua kolom lembar kerja sebelum diperiksa.'; g.hidden = false; return; }
    const b = $('#bPeriksa'); b.disabled = true; b.textContent = '⏳ Kak Nala sedang membaca…';
    konteksLokal = { langkah: L, misi: m, uji: st.uji };
    const hasil = await periksaIsian(konteksMisi(m, st, L), L, st.isian, m);
    hasil.waktu = Date.now();
    st.nilai[L.id] = hasil; simpan();
    $('#hasilNilai').innerHTML = kartuNilai(hasil);
    b.disabled = false; b.textContent = '🔍 Periksa lagi';
    if (hasil.galat) toast('AI tidak tersambung — dinilai tutor lokal', 'peringatan');
  };
  if (L.id === 'uji') pasangLab(m, st);
  if (L.id === 'evaluasi') pasangGrafik(m, st);
  if (L.id === 'nyata') pasangNyata(m, st);
}

function perbaruiStepper(m, st) {
  $$('.stepper a').forEach((a, i) => {
    const ok = langkahTerisi(m, st, LANGKAH[i]);
    a.classList.toggle('beres', ok);
    $('.no', a).textContent = ok ? '✓' : i + 1;
  });
}

function kartuNilai(h) {
  return `<div class="kartu-nilai">
    <div class="kn-kepala"><b>Umpan balik Kak Nala</b><span class="sumber ${h.sumber}">${h.sumber === 'ai' ? '✨ AI Gemini' : '⚙️ Tutor lokal'}</span></div>
    <div class="kn-skor">${Object.entries(h.skor).map(([id, n]) => {
      const I = INDIKATOR.find(x => x.id === id);
      return `<div class="skor" style="--c:${I.warna}"><span>${I.nama}</span><div class="titik">${[1, 2, 3, 4].map(k => `<i class="${k <= n ? 'isi' : ''}"></i>`).join('')}</div><small>${n} · ${tingkatNama(n)}</small></div>`;
    }).join('')}</div>
    ${h.kekuatan ? `<p><b>👍 Sudah baik:</b> ${esc(h.kekuatan)}</p>` : ''}
    ${h.perbaikan ? `<p><b>🔧 Perlu diperbaiki:</b> ${esc(h.perbaikan)}</p>` : ''}
    ${h.miskonsepsi ? `<p class="miskon"><b>⚠️ Periksa lagi idemu:</b> ${esc(h.miskonsepsi)}</p>` : ''}
    ${h.pemantik && h.pemantik.length ? `<div class="pemantik"><b>🤔 Pikirkan:</b><ul>${h.pemantik.map(q => `<li>${esc(q)}</li>`).join('')}</ul></div>` : ''}
    ${h.galat ? `<p class="redup kecil">AI tidak tersambung (${esc(h.galat)}), jadi dinilai tutor lokal.</p>` : ''}
  </div>`;
}

function isiLangkah(m, st, L) {
  if (L.id === 'pahami') return `<div class="kartu kisah" style="--aksen:${m.warna}"><h3>📖 Kisah masalah</h3><p>${m.kisah}</p></div>`;
  if (L.id === 'konsep') return `<div class="kartu konsep"><h3>🔬 Kartu konsep</h3>${m.konsep}</div>`;
  if (L.id === 'hipotesis') return `<div class="kartu"><h3>🧪 Hal yang bisa kamu atur di laboratorium maya</h3>
    <div class="chip-var">${m.variabel.map(v => `<span>${esc(v.label)}${v.tipe === 'range' ? ` (${v.min}–${v.max} ${v.satuan})` : ''}</span>`).join('')}</div>
    <h3>📏 Hal yang bisa kamu ukur</h3>
    <div class="chip-var ukur">${m.keluaran.map(k => `<span>${esc(k.label)}</span>`).join('')}</div></div>`;
  if (L.id === 'uji') return htmlLab(m, st);
  if (L.id === 'evaluasi') return htmlTabelUji(m, st) + htmlGrafik(m);
  if (L.id === 'nyata') return htmlNyata(m, st);
  if (L.id === 'simpulkan') {
    const terbaik = ujiTerbaik(st);
    return `<div class="kartu"><h3>🏆 Uji terbaikmu</h3>${terbaik
      ? `<p>Uji ke-${terbaik.no} memenuhi <b>${terbaik.lulus}/${terbaik.total}</b> kriteria.</p><div class="ringkas-uji">${m.variabel.map(v => `<span><small>${esc(v.label)}</small>${esc(tampilVar(v, terbaik.v[v.id]))}</span>`).join('')}</div>`
      : '<p class="redup">Belum ada uji. Kembali ke Langkah 4.</p>'}</div>
      <div class="kartu cer"><b>Pola CER:</b> <span>Klaim</span> → <span>Bukti</span> → <span>Penalaran</span>. Klaim tanpa bukti hanyalah pendapat; bukti tanpa penalaran belum menjelaskan <i>mengapa</i>.</div>`;
  }
  return '';
}
function ujiTerbaik(st) {
  if (!st.uji.length) return null;
  return [...st.uji].sort((a, b) => (b.lulus - a.lulus) || (b.no - a.no))[0];
}

/* ---------------- Langkah 7: dunia nyata ---------------- */
function selisihPersen(nyata, sim) {
  if (!isFinite(nyata) || !isFinite(sim) || sim === 0) return null;
  return (nyata - sim) / Math.abs(sim) * 100;
}
function lencanaSelisih(d) {
  if (d === null) return '';
  const kelas = Math.abs(d) <= 20 ? 'hijau' : Math.abs(d) <= 50 ? 'kuning' : 'merah';
  return `<span class="lencana ${kelas}">${d > 0 ? '+' : ''}${Math.round(d)}%</span>`;
}
function tampilUkur(u, nilai) {
  if (nilai === '' || nilai === undefined || nilai === null) return '—';
  return u.satuan === 'Rp' ? rp(nilai) : `${String(nilai).replace('.', ',')} ${u.satuan}`.trim();
}

function htmlNyata(m, st) {
  const N = NYATA[m.id], ny = st.nyata;
  const aman = N.keselamatan.every((_, i) => ny.cek[i]);
  return `
  <div class="kartu"><div class="lab-kepala"><h3>🧰 Alat &amp; bahan</h3><span class="pil">⏱️ ${esc(N.waktu)}</span></div>
    <ul class="daftar-alat">${N.alat.map(a => `<li>${esc(a)}</li>`).join('')}</ul></div>
  <div class="kartu kartu-aman"><h3>🦺 Cek keselamatan</h3>
    <p class="redup kecil">Baca bersama kelompok dan guru, lalu centang semuanya. Langkah kerja baru terbuka setelah semua poin dicentang.</p>
    ${N.keselamatan.map((k, i) => `<label class="cek-aman"><input type="checkbox" data-aman="${i}" ${ny.cek[i] ? 'checked' : ''}><span>${esc(k)}</span></label>`).join('')}
  </div>
  <div id="isiNyata">${aman ? htmlIsiNyata(m, st) : '<div class="kartu terkunci">🔒 Centang semua poin keselamatan untuk membuka langkah kerja, rencana takaran, dan tabel uji nyata.</div>'}</div>`;
}

function htmlIsiNyata(m, st) {
  const N = NYATA[m.id], ny = st.nyata;
  const acuan = ujiTerbaik(st);
  return `
  <div class="kartu"><h3>🛠️ Langkah kerja</h3><ol class="langkah-kerja">${N.langkah.map(l => `<li>${esc(l)}</li>`).join('')}</ol></div>
  <div class="kartu rencana-nyata"><h3>📐 Rencana takaran dari simulasi</h3>
    ${acuan ? `<p class="redup kecil">Dihitung dari uji terbaikmu di laboratorium maya: <b>uji ke-${acuan.no}</b> (memenuhi ${acuan.lulus}/${acuan.total} kriteria). Sesuaikan dengan bahan yang benar-benar ada, lalu tulis penyesuaianmu di lembar kerja.</p>
      <ul>${N.takaran(acuan.v).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <p class="kecil"><b>Prediksi simulasi:</b> ${N.ukur.filter(u => u.sim).map(u => { const k = m.keluaran.find(x => x.id === u.sim); return `${esc(k.label)} ${esc(tampilKeluaran(k, acuan.h[u.sim]))}`; }).join(' · ')}</p>
      ${acuan.lulus < acuan.total ? `<p class="peringatan kecil">Rancangan ini baru memenuhi ${acuan.lulus} dari ${acuan.total} kriteria. Sebaiknya perbaiki dulu di <a href="#/misi/${m.id}/4">laboratorium maya</a> sebelum membuat prototipe agar bahan tidak terbuang.</p>` : ''}`
      : `<p class="redup">Belum ada uji di laboratorium maya. <a href="#/misi/${m.id}/4">Lakukan uji di Langkah 4</a> agar takarannya bisa dihitung.</p>`}
  </div>
  <div class="kartu"><div class="lab-kepala"><h3>📋 Data uji nyata</h3><span class="redup kecil">Ulangi uji minimal 2–3 kali agar datamu bisa dipercaya</span></div>
    <form id="fNyata" class="form-nyata">
      <label class="ctl"><span>Rancangan simulasi acuan</span><select id="nAcuan">
        ${st.uji.length ? [...st.uji].reverse().map(u => `<option value="${u.no}" ${acuan && u.no === acuan.no ? 'selected' : ''}>Uji simulasi ke-${u.no} (${u.lulus}/${u.total} kriteria)</option>`).join('') : '<option value="">(belum ada uji simulasi)</option>'}
      </select></label>
      ${N.ukur.map(u => `<label class="ctl"><span>${esc(u.label)}${u.satuan ? ` (${esc(u.satuan)})` : ''}</span><input type="number" step="any" inputmode="decimal" data-ukur="${u.id}" placeholder="angka hasil ukur"></label>`).join('')}
      <label class="ctl lebar-penuh"><span>Catatan pengamatan (kondisi, kejadian tak terduga)</span><input id="nCatatan" maxlength="300" placeholder="Contoh: ada angin dari kiri, sumbat agak longgar ..."></label>
      <label class="ctl lebar-penuh"><span>Foto prototipe/hasil (opsional)</span><input type="file" id="nFoto" accept="image/*" capture="environment"></label>
      <p class="galat lebar-penuh" id="galatNyata" hidden></p>
      <button class="tombol utama lebar-penuh" id="bSimpanNyata">💾 Simpan hasil uji nyata</button>
    </form>
    <div id="tabelNyata">${htmlTabelNyata(m, st)}</div>
  </div>
  <div class="kartu"><h3>🆘 Ada masalah dengan prototipemu?</h3>
    <p class="redup kecil">Pilih masalahnya — Kak Nala akan membantumu mencari penyebab lewat pertanyaan. Untuk urusan keselamatan, ikuti arahan guru.</p>
    <div class="daftar-masalah">${N.masalah.map((q, i) => `<button type="button" class="tombol" data-masalah="${i}">${esc(q.gejala)}</button>`).join('')}</div>
  </div>`;
}

function htmlTabelNyata(m, st) {
  const N = NYATA[m.id], ny = st.nyata;
  if (!ny.uji.length) return '<p class="redup">Belum ada hasil uji nyata.</p>';
  return `<div class="tabel-gulir"><table class="tabel">
    <thead><tr><th>Uji</th><th>Acuan</th>${N.ukur.map(u => `<th>${esc(u.label)}</th>`).join('')}<th>Catatan</th><th>Foto</th><th></th></tr></thead>
    <tbody>${ny.uji.map((u, i) => {
      const acuan = st.uji.find(x => x.no === u.acuan);
      return `<tr><td><b>${u.no}</b></td><td>${acuan ? `sim ke-${acuan.no}` : '—'}</td>
        ${N.ukur.map(k => {
          const simNilai = k.sim && acuan ? +acuan.h[k.sim] : null;
          const d = simNilai !== null && u.nilai[k.id] !== '' ? selisihPersen(+u.nilai[k.id], simNilai) : null;
          return `<td>${esc(tampilUkur(k, u.nilai[k.id]))}${simNilai !== null ? `<br><small class="redup">sim: ${esc(tampilUkur(k, simNilai))}</small> ${lencanaSelisih(d)}` : ''}</td>`;
        }).join('')}
        <td class="kecil">${esc(u.catatan || '')}</td>
        <td>${u.foto ? `<img class="foto-uji" src="${u.foto}" alt="Foto uji nyata ${u.no}">` : '—'}</td>
        <td><button type="button" class="tombol kecil" data-hapus-nyata="${i}" aria-label="Hapus uji ${u.no}">✕</button></td></tr>`;
    }).join('')}</tbody></table></div>
    <p class="redup kecil">Lencana = selisih hasil nyata terhadap prediksi simulasi (hijau ≤ 20%, kuning ≤ 50%, merah &gt; 50%). Selisih besar adalah petunjuk: faktor apa yang tidak dihitung model?</p>`;
}

function kecilkanFoto(berkas) {
  return new Promise((ok, gagal) => {
    const r = new FileReader();
    r.onerror = gagal;
    r.onload = () => {
      const img = new Image();
      img.onerror = gagal;
      img.onload = () => {
        const k = Math.min(1, 480 / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        ok(c.toDataURL('image/jpeg', 0.6));
      };
      img.src = r.result;
    };
    r.readAsDataURL(berkas);
  });
}

function pasangNyata(m, st) {
  const N = NYATA[m.id], ny = st.nyata;
  $$('[data-aman]').forEach(c => c.onchange = () => {
    ny.cek[c.dataset.aman] = c.checked; simpan();
    const aman = N.keselamatan.every((_, i) => ny.cek[i]);
    const wadah = $('#isiNyata');
    const sudahTerbuka = !!$('#fNyata');
    if (aman && !sudahTerbuka) { wadah.innerHTML = htmlIsiNyata(m, st); pasangIsiNyata(m, st); toast('Langkah kerja terbuka. Selamat berkarya dengan aman!'); }
    if (!aman && sudahTerbuka) wadah.innerHTML = '<div class="kartu terkunci">🔒 Centang semua poin keselamatan untuk membuka langkah kerja, rencana takaran, dan tabel uji nyata.</div>';
    perbaruiStepper(m, st);
  });
  if ($('#fNyata')) pasangIsiNyata(m, st);
}

function pasangIsiNyata(m, st) {
  const N = NYATA[m.id], ny = st.nyata;
  const pasangTabel = () => {
    $$('[data-hapus-nyata]').forEach(b => b.onclick = () => {
      if (!confirm('Hapus hasil uji nyata ini?')) return;
      ny.uji.splice(+b.dataset.hapusNyata, 1);
      ny.uji.forEach((u, i) => { u.no = i + 1; });
      simpan(); $('#tabelNyata').innerHTML = htmlTabelNyata(m, st); pasangTabel(); perbaruiStepper(m, st);
    });
  };
  pasangTabel();
  $$('[data-ukur], #nCatatan').forEach(el => el.addEventListener('input', () => { $('#galatNyata').hidden = true; }));
  $('#fNyata').onsubmit = async e => {
    e.preventDefault();
    const nilai = {};
    $$('[data-ukur]').forEach(el => { nilai[el.dataset.ukur] = el.value.trim() === '' ? '' : +el.value; });
    const g = $('#galatNyata');
    if (Object.values(nilai).every(x => x === '')) { g.textContent = 'Isi minimal satu hasil pengukuran.'; g.hidden = false; return; }
    if (Object.values(nilai).some(x => x !== '' && !isFinite(x))) { g.textContent = 'Hasil pengukuran harus berupa angka.'; g.hidden = false; return; }
    const b = $('#bSimpanNyata'); b.disabled = true;
    let foto = '';
    const berkas = $('#nFoto').files[0];
    if (berkas) { try { foto = await kecilkanFoto(berkas); } catch (err) { toast('Foto tidak bisa dibaca', 'peringatan'); } }
    const baris = { no: ny.uji.length + 1, acuan: +$('#nAcuan').value || null, nilai, catatan: $('#nCatatan').value.trim(), foto, waktu: Date.now() };
    ny.uji.push(baris);
    if (!simpan()) {
      baris.foto = '';
      if (simpan()) toast('Penyimpanan penuh — hasil disimpan tanpa foto', 'peringatan');
      else { ny.uji.pop(); g.textContent = 'Penyimpanan perangkat penuh. Hapus beberapa foto uji lama lalu coba lagi.'; g.hidden = false; b.disabled = false; return; }
    } else toast('Hasil uji nyata tersimpan');
    $('#fNyata').reset();
    const pilih = $('#nAcuan'); if (pilih && baris.acuan) pilih.value = baris.acuan;
    $('#tabelNyata').innerHTML = htmlTabelNyata(m, st); pasangTabel(); perbaruiStepper(m, st);
    b.disabled = false;
  };
  $$('[data-masalah]').forEach(b => b.onclick = () => {
    const q = N.masalah[+b.dataset.masalah];
    bukaTutor(`Masalah pada prototipe nyataku: ${q.gejala}. Bantu aku mencari penyebabnya.`, 2);
  });
}

/* ---------------- Laboratorium maya ---------------- */
/* ---------------- Laboratorium maya ---------------- */
function htmlLab(m, st) {
  return `<div class="kartu lab">
    <div class="lab-kepala"><h3>🧪 Laboratorium maya</h3><span class="redup kecil">Atur rancangan → tulis prediksi → Uji</span></div>
    <div class="lab-tata">
      <div class="kontrol">
        ${m.variabel.map(v => v.tipe === 'range'
          ? `<label class="ctl"><span>${esc(v.label)} <b data-nilai="${v.id}">${esc(tampilVar(v, st.v[v.id]))}</b></span>
             <input type="range" data-v="${v.id}" min="${v.min}" max="${v.max}" step="${v.step}" value="${st.v[v.id]}"></label>`
          : `<label class="ctl"><span>${esc(v.label)}</span><select data-v="${v.id}">${opsiVar(v).map(o => `<option value="${o[0]}" ${o[0] === st.v[v.id] ? 'selected' : ''}>${esc(o[1])}</option>`).join('')}</select></label>`).join('')}
        <label class="ctl"><span>Prediksimu sebelum menguji (opsional)</span><input id="prediksi" placeholder="Aku menduga hasilnya ..." maxlength="200"></label>
        <button class="tombol utama lebar" id="bUji">▶ Uji Rancangan</button>
        <p id="adilInfo" class="adil-info" hidden></p>
      </div>
      <div class="panggung-wrap">
        <canvas id="kanvas" aria-label="Simulasi ${esc(m.judul)}"></canvas>
        <div class="hasil-grid" id="hasilGrid">${m.keluaran.map(k => `<div><small>${esc(k.label)}</small><b data-k="${k.id}">—</b></div>`).join('')}</div>
        <div id="cekKriteria" class="cek-kriteria"></div>
      </div>
    </div>
  </div>
  <div id="tabelUji">${htmlTabelUji(m, st)}</div>
  ${htmlGrafik(m)}`;
}

function htmlTabelUji(m, st) {
  if (!st.uji.length) return `<div class="kartu"><h3>📋 Tabel data uji</h3><p class="redup">Belum ada data. Lakukan uji di laboratorium maya.</p></div>`;
  return `<div class="kartu"><div class="lab-kepala"><h3>📋 Tabel data uji</h3>
    <button class="tombol kecil" id="bHapusUji" type="button">Hapus semua uji</button></div>
    <div class="tabel-gulir"><table class="tabel">
      <thead><tr><th>Uji</th>${m.variabel.map(v => `<th>${esc(v.label)}</th>`).join('')}${m.keluaran.map(k => `<th class="kel">${esc(k.label)}</th>`).join('')}<th>Kriteria</th><th>Uji adil?</th></tr></thead>
      <tbody>${st.uji.map(u => `<tr>
        <td><b>${u.no}</b></td>
        ${m.variabel.map(v => `<td class="${u.ubah && u.ubah.includes(v.label) ? 'diubah' : ''}">${esc(tampilVar(v, u.v[v.id]))}</td>`).join('')}
        ${m.keluaran.map(k => `<td class="kel">${esc(tampilKeluaran(k, u.h[k.id]))}</td>`).join('')}
        <td>${u.lulus}/${u.total}</td>
        <td>${u.adil === null ? '<span class="lencana">awal</span>' : u.adil ? '<span class="lencana hijau">adil</span>' : `<span class="lencana merah" title="Mengubah: ${esc(u.ubah.join(', '))}">tidak adil</span>`}</td>
      </tr>${u.prediksi ? `<tr class="baris-prediksi"><td></td><td colspan="${m.variabel.length + m.keluaran.length + 2}">Prediksi: <i>${esc(u.prediksi)}</i></td></tr>` : ''}`).join('')}</tbody>
    </table></div>
    <p class="redup kecil">Sel berwarna = variabel yang diubah dari uji sebelumnya. Uji adil hanya mengubah satu variabel.</p></div>`;
}

function htmlGrafik(m) {
  const sim = SIM[m.id];
  const vx = sim.sumbuX.map(id => m.variabel.find(v => v.id === id));
  const ky = sim.sumbuY.map(id => m.keluaran.find(k => k.id === id));
  return `<div class="kartu"><div class="lab-kepala"><h3>📈 Grafik data</h3>
    <div class="pilih-sumbu"><label>X <select id="gX">${vx.map(v => `<option value="${v.id}">${esc(v.label)}</option>`).join('')}</select></label>
    <label>Y <select id="gY">${ky.map(k => `<option value="${k.id}">${esc(k.label)}</option>`).join('')}</select></label></div></div>
    <canvas id="grafik" class="grafik"></canvas>
    <p class="redup kecil">Titik hijau = uji adil, oranye = uji tidak adil. Hanya bandingkan titik yang variabel lainnya sama!</p></div>`;
}

function siapkanKanvas(cv, tinggi) {
  const gaya = getComputedStyle(cv.parentElement);
  const w = cv.parentElement.clientWidth - parseFloat(gaya.paddingLeft) - parseFloat(gaya.paddingRight);
  const dpr = window.devicePixelRatio || 1;
  cv.width = w * dpr; cv.height = tinggi * dpr;
  cv.style.width = w + 'px'; cv.style.height = tinggi + 'px';
  const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, W: w, H: tinggi };
}

function pasangLab(m, st) {
  const sim = SIM[m.id];
  const cv = $('#kanvas');
  let anim = null;
  const tinggiKanvas = () => (window.innerWidth < 640 ? 300 : 360);
  const gambar = (p) => { const { ctx, W, H } = siapkanKanvas(cv, tinggiKanvas()); sim.gambar(ctx, W, H, st.v, sim.hitung(st.v), p); };
  const tampilkanHasil = () => {
    const h = sim.hitung(st.v), krit = sim.kriteria(st.v, h);
    m.keluaran.forEach(k => { const el = $(`#hasilGrid [data-k="${k.id}"]`); if (el) el.textContent = tampilKeluaran(k, h[k.id]); });
    $('#cekKriteria').innerHTML = krit.map(k => `<span class="${k.lulus ? 'lulus' : 'gagal'}">${k.lulus ? '✔' : '✘'} ${esc(k.teks)} <small>(${esc(String(k.nilai).replace(/(\d)\.(\d)(?!\d\d)/g, '$1,$2'))})</small></span>`).join('');
  };
  const samaDenganTerakhir = () => { const u = st.uji[st.uji.length - 1]; return u && m.variabel.every(v => String(u.v[v.id]) === String(st.v[v.id])); };
  if (samaDenganTerakhir()) { gambar(1); tampilkanHasil(); } else gambar(0);
  $$('[data-v]').forEach(el => el.addEventListener('input', () => {
    const v = m.variabel.find(x => x.id === el.dataset.v);
    st.v[v.id] = v.tipe === 'range' ? +el.value : el.value;
    const lbl = $(`[data-nilai="${v.id}"]`); if (lbl) lbl.textContent = tampilVar(v, st.v[v.id]);
    $$('#hasilGrid [data-k]').forEach(b => { b.textContent = '—'; });
    $('#cekKriteria').innerHTML = '';
    simpan(); cancelAnimationFrame(anim); gambar(0);
  }));
  $('#bUji').onclick = () => {
    const h = sim.hitung(st.v);
    const krit = sim.kriteria(st.v, h);
    const sebelum = st.uji[st.uji.length - 1];
    const ubah = sebelum ? m.variabel.filter(v => String(sebelum.v[v.id]) !== String(st.v[v.id])).map(v => v.label) : [];
    const hBersih = Object.fromEntries(m.keluaran.map(k => [k.id, h[k.id]]));
    const uji = { no: st.uji.length + 1, v: { ...st.v }, h: hBersih, lulus: krit.filter(k => k.lulus).length, total: krit.length, adil: sebelum ? ubah.length <= 1 : null, ubah, prediksi: $('#prediksi').value.trim() };
    const info = $('#adilInfo');
    if (sebelum && ubah.length === 0) { info.hidden = false; info.className = 'adil-info kuning'; info.textContent = 'Rancangan sama persis dengan uji sebelumnya. Ubah satu variabel dulu.'; return; }
    st.uji.push(uji); simpan();
    info.hidden = false;
    if (!sebelum) { info.className = 'adil-info'; info.textContent = 'Uji pertama tercatat sebagai data awal (pembanding).'; }
    else if (uji.adil) { info.className = 'adil-info hijau'; info.textContent = `✔ Uji adil: kamu hanya mengubah ${ubah[0]}.`; }
    else { info.className = 'adil-info merah'; info.textContent = `⚠ Kamu mengubah ${ubah.length} variabel sekaligus (${ubah.join(', ')}). Penyebab perubahan hasil jadi sulit dipastikan.`; }
    $('#prediksi').value = '';
    const b = $('#bUji'); b.disabled = true;
    const mulai = performance.now(), durasi = 2400;
    const langkahAnim = (t) => {
      const p = Math.min(1, (t - mulai) / durasi);
      const { ctx, W, H } = siapkanKanvas(cv, tinggiKanvas());
      sim.gambar(ctx, W, H, st.v, h, p);
      if (p < 1) anim = requestAnimationFrame(langkahAnim);
      else {
        b.disabled = false;
        tampilkanHasil();
        $('#tabelUji').innerHTML = htmlTabelUji(m, st);
        pasangHapusUji(m, st);
        gambarGrafik(m, st);
        perbaruiStepper(m, st);
        const sampingUji = $$('.kolom-samping .kartu.kecil p')[0];
        if (sampingUji) sampingUji.innerHTML = `<b>${st.uji.length}</b> uji · <b>${st.uji.filter(u => u.adil === true).length}</b> uji adil`;
        konteksLokal.uji = st.uji;
      }
    };
    anim = requestAnimationFrame(langkahAnim);
  };
  pasangHapusUji(m, st);
  pasangGrafik(m, st);
  const ukur = () => { cancelAnimationFrame(anim); gambar(samaDenganTerakhir() ? 1 : 0); gambarGrafik(m, st); };
  window.addEventListener('resize', ukur);
  bersihkan.push(() => { window.removeEventListener('resize', ukur); cancelAnimationFrame(anim); });
}

function pasangHapusUji(m, st) {
  const b = $('#bHapusUji');
  if (b) b.onclick = () => {
    if (!confirm('Hapus semua data uji misi ini?')) return;
    st.uji = []; simpan(); rute();
  };
}

function pasangGrafik(m, st) {
  const gx = $('#gX'), gy = $('#gY');
  if (!gx) return;
  gx.onchange = gy.onchange = () => gambarGrafik(m, st);
  gambarGrafik(m, st);
  pasangHapusUji(m, st);
  if (!$('#kanvas')) {
    const ukur = () => gambarGrafik(m, st);
    window.addEventListener('resize', ukur);
    bersihkan.push(() => window.removeEventListener('resize', ukur));
  }
}

function gambarGrafik(m, st) {
  const cv = $('#grafik'); if (!cv) return;
  const { ctx, W, H } = siapkanKanvas(cv, 240);
  const vx = m.variabel.find(v => v.id === $('#gX').value), ky = m.keluaran.find(k => k.id === $('#gY').value);
  const tt = st.uji.map(u => ({ x: +u.v[vx.id], y: +u.h[ky.id], u })).filter(t => isFinite(t.x) && isFinite(t.y));
  const kiri = 56, bawah = H - 34, atas = 14, kanan = W - 14;
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(kiri, atas); ctx.lineTo(kiri, bawah); ctx.lineTo(kanan, bawah); ctx.stroke();
  label(ctx, `${vx.label} (${vx.satuan})`, (kiri + kanan) / 2, H - 10, { rata: 'center', ukuran: 11, warna: '#475569' });
  ctx.save(); ctx.translate(12, (atas + bawah) / 2); ctx.rotate(-Math.PI / 2);
  label(ctx, `${ky.label}${ky.satuan ? ` (${ky.satuan})` : ''}`, 0, 0, { rata: 'center', ukuran: 11, warna: '#475569' }); ctx.restore();
  if (!tt.length) { label(ctx, 'Belum ada data', (kiri + kanan) / 2, (atas + bawah) / 2, { rata: 'center', warna: '#94a3b8' }); return; }
  const x0 = vx.min, x1 = vx.max;
  const langkahRapi = x => { const e = 10 ** Math.floor(Math.log10(x)); return [1, 2, 2.5, 5, 10].map(k => k * e).find(k => k >= x); };
  const y0 = Math.min(0, ...tt.map(t => t.y));
  const y1 = y0 + 4 * langkahRapi(Math.max((Math.max(...tt.map(t => t.y)) - y0) * 1.05, 1e-6) / 4);
  const px = x => kiri + (x - x0) / (x1 - x0 || 1) * (kanan - kiri - 10) + 5;
  const py = y => bawah - (y - y0) / (y1 - y0) * (bawah - atas);
  for (let i = 0; i <= 4; i++) {
    const yv = y0 + (y1 - y0) * i / 4;
    label(ctx, yv >= 1000 ? Math.round(yv / 1000) + 'rb' : bulat(yv, 1).toLocaleString('id-ID'), kiri - 6, py(yv), { rata: 'right', ukuran: 10, warna: '#64748b' });
    ctx.strokeStyle = '#f1f5f9'; ctx.beginPath(); ctx.moveTo(kiri + 1, py(yv)); ctx.lineTo(kanan, py(yv)); ctx.stroke();
  }
  [x0, (x0 + x1) / 2, x1].forEach(xv => label(ctx, String(bulat(xv, 1)).replace('.', ','), px(xv), bawah + 10, { rata: 'center', ukuran: 10, warna: '#64748b' }));
  tt.forEach(t => {
    ctx.fillStyle = t.u.adil === false ? '#f97316' : '#16a34a';
    ctx.beginPath(); ctx.arc(px(t.x), py(t.y), 6, 0, 7); ctx.fill();
    label(ctx, String(t.u.no), px(t.x) + 8, py(t.y) - 8, { ukuran: 10, warna: '#0f172a' });
  });
}

/* ---------------- Konteks untuk tutor ---------------- */
function konteksMisi(m, st, L) {
  const baris = [];
  baris.push(`Misi: ${m.judul} (${m.kelas}).`);
  baris.push(`Masalah: ${polos(m.kisah)}`);
  baris.push(`Kriteria: ${m.kriteria.join('; ')}. Kendala: ${m.kendala.join('; ')}.`);
  baris.push(`Konsep kunci (untuk acuan tutor, jangan dibacakan utuh): ${polos(m.konsep)}`);
  baris.push(`Murid sedang di Langkah ${L.no} "${L.judul}" (EDP: ${L.edp}). Arahan: ${L.arahan}`);
  const isianLangkah = L.isian.map(f => `- ${f.label} → ${st.isian[f.id] ? `"${st.isian[f.id]}"` : '(belum diisi)'}`).join('\n');
  baris.push(`Isian murid di langkah ini:\n${isianLangkah}`);
  if (L.id !== 'hipotesis' && st.isian.hipotesis) baris.push(`Hipotesis murid: "${st.isian.hipotesis}" (variabel bebas: ${st.isian.vbebas || '-'}; terikat: ${st.isian.vterikat || '-'}).`);
  if (st.uji.length) {
    baris.push('Data uji murid (terbaru di akhir):');
    st.uji.slice(-8).forEach(u => {
      baris.push(`Uji ${u.no}: ${m.variabel.map(v => `${v.label}=${tampilVar(v, u.v[v.id])}`).join(', ')} → ${m.keluaran.map(k => `${k.label}=${tampilKeluaran(k, u.h[k.id])}`).join(', ')}; kriteria terpenuhi ${u.lulus}/${u.total}; ${u.adil === null ? 'uji awal' : u.adil ? 'uji adil' : `TIDAK adil (mengubah ${u.ubah.join(', ')})`}${u.prediksi ? `; prediksi murid: "${u.prediksi}"` : ''}.`);
    });
  } else baris.push('Murid belum melakukan uji di laboratorium maya.');
  if (L.id === 'nyata') {
    const N = NYATA[m.id], ny = st.nyata || { cek: {}, uji: [] };
    const acuan = ujiTerbaik(st);
    baris.push('MURID SEDANG MEMBUAT & MENGUJI PROTOTIPE NYATA (bukan simulasi).');
    baris.push(`Aturan keselamatan wajib misi ini: ${N.keselamatan.join(' | ')}`);
    baris.push(`Alat & bahan yang disarankan: ${N.alat.join('; ')}`);
    baris.push(`Langkah kerja: ${N.langkah.map((l, i) => `${i + 1}) ${l}`).join(' ')}`);
    if (acuan) baris.push(`Takaran praktis dari uji simulasi terbaik (uji ${acuan.no}): ${N.takaran(acuan.v).join(' ')}`);
    baris.push(`Masalah umum & arah petunjuk (untuk tutor): ${N.masalah.map(q => `${q.gejala}: ${q.petunjuk.join(' ')}`).join(' || ')}`);
    if (ny.uji.length) {
      baris.push('Data uji nyata murid:');
      ny.uji.forEach(u => {
        const a = st.uji.find(x => x.no === u.acuan);
        baris.push(`Uji nyata ${u.no}: ${N.ukur.map(k => `${k.label}=${tampilUkur(k, u.nilai[k.id])}${k.sim && a ? ` (prediksi simulasi ${tampilUkur(k, a.h[k.sim])})` : ''}`).join(', ')}${u.catatan ? `; catatan: "${u.catatan}"` : ''}.`);
      });
    } else baris.push('Murid belum mencatat hasil uji nyata.');
  }
  return baris.join('\n');
}

let KONTEKS_TUTOR = { jenis: 'umum' };
function setKonteksTutor(k) {
  KONTEKS_TUTOR = k;
  if (k.jenis === 'misi') konteksLokal = { langkah: k.L, misi: k.m, uji: ms(k.m.id).uji };
  else konteksLokal = { langkah: null, misi: null, uji: [] };
  const sub = $('#tutorSub');
  if (sub) sub.textContent = k.jenis === 'misi' ? `${k.m.judul} · Langkah ${k.L.no}` : k.jenis === 'kuis' ? 'Uji Nalar' : 'Tanya apa saja tentang IPA';
  gambarChat();
}
function kunciChat() { return KONTEKS_TUTOR.jenis === 'misi' ? 'misi-' + KONTEKS_TUTOR.m.id : KONTEKS_TUTOR.jenis; }
function teksKonteks() {
  const k = KONTEKS_TUTOR;
  if (k.jenis === 'misi') return konteksMisi(k.m, ms(k.m.id), k.L);
  if (k.jenis === 'kuis') return `Murid sedang mengerjakan "Uji Nalar": soal pilihan ganda tentang berpikir kritis dalam IPA (mengevaluasi klaim/hoaks, variabel, korelasi vs sebab-akibat, membaca grafik, kesimpulan berbasis bukti).${k.soal ? `\nSoal yang ditanyakan: ${k.soal}` : ''}`;
  return 'Murid membuka Kak Nala dari halaman umum aplikasi NalarSTEM (pembelajaran IPA berbasis STEM untuk SMP). Bantu pertanyaan IPA-nya secara Sokratik dan sarankan ia mencoba Misi STEM.';
}

/* ---------------- Laci AI Tutor ---------------- */
function gambarChat() {
  const box = $('#chatIsi'); if (!box) return;
  const riwayat = S.chat[kunciChat()] || [];
  if (!riwayat.length) {
    box.innerHTML = `<div class="gelembung nala">Hai${S.profil.nama ? ' ' + esc(S.profil.nama.split(' ')[0]) : ''}! Aku <b>Kak Nala</b> 👋 Aku tidak akan memberi jawaban langsung, tapi aku akan menemanimu berpikir lewat pertanyaan. Mau mulai dari mana?</div>`;
  } else {
    box.innerHTML = riwayat.map(r => `<div class="gelembung ${r.peran === 'model' ? 'nala' : 'siswa'}">${r.peran === 'model' ? mdLite(r.teks) : esc(r.teks)}${r.lokal ? '<small class="tanda-lokal">tutor lokal</small>' : ''}</div>`).join('');
  }
  box.scrollTop = box.scrollHeight;
  const c = bacaAI();
  const st = $('#tutorStatus');
  const terakhir = [...riwayat].reverse().find(r => r.peran === 'model');
  const lokal = c.sumber === 'lokal' || (terakhir && terakhir.lokal);
  if (st) { st.textContent = c.sumber === 'lokal' ? 'Tutor lokal' : lokal ? 'AI belum tersambung' : 'AI Gemini'; st.className = 'status-ai ' + (lokal ? 'lokal' : ''); }
}

function bukaTutor(pesanAwal, tingkat) {
  document.body.classList.add('tutor-buka');
  gambarChat();
  if (pesanAwal) kirimChat(pesanAwal, tingkat);
  else setTimeout(() => $('#chatMasuk').focus(), 150);
}
function tutupTutor() { document.body.classList.remove('tutor-buka'); }

let sedangKirim = false;
async function kirimChat(teks, tingkat = 1) {
  teks = (teks || '').trim();
  if (!teks || sedangKirim) return;
  sedangKirim = true;
  const k = kunciChat();
  S.chat[k] = S.chat[k] || [];
  S.chat[k].push({ peran: 'user', teks });
  gambarChat();
  const box = $('#chatIsi');
  box.insertAdjacentHTML('beforeend', '<div class="gelembung nala mengetik"><span></span><span></span><span></span></div>');
  box.scrollTop = box.scrollHeight;
  const riwayat = S.chat[k].map((r, i, a) => ({ peran: r.peran, teks: i === a.length - 1 ? `[Tingkat petunjuk: ${tingkat}] ${r.teks}` : r.teks }));
  const hasil = await tutorBalas(teksKonteks(), S.profil.nama, riwayat);
  S.chat[k].push({ peran: 'model', teks: hasil.teks, lokal: hasil.sumber === 'lokal' });
  if (S.chat[k].length > 40) S.chat[k] = S.chat[k].slice(-40);
  simpan(); gambarChat();
  if (hasil.galat) toast('AI tidak tersambung: ' + hasil.galat, 'peringatan');
  sedangKirim = false;
}

function pasangTutor() {
  $('#fabTutor').onclick = () => bukaTutor();
  $('#tutupTutor').onclick = tutupTutor;
  $('#latarTutor').onclick = tutupTutor;
  $('#fChat').onsubmit = e => { e.preventDefault(); const t = $('#chatMasuk').value; $('#chatMasuk').value = ''; kirimChat(t, 1); };
  $('#chatMasuk').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('#fChat').requestSubmit(); } });
  $$('.chip-cepat button').forEach(b => b.onclick = () => kirimChat(b.dataset.pesan, +b.dataset.tingkat));
  $('#bBersihChat').onclick = () => { if (confirm('Hapus percakapan ini?')) { S.chat[kunciChat()] = []; simpan(); gambarChat(); } };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') tutupTutor(); });
}

/* ---------------- Uji Nalar ---------------- */
function acak(a) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

function halUjiNalar() {
  setKonteksTutor({ jenis: 'kuis' });
  const K = S.kuis;
  if (!K.urutan || K.urutan.length !== UJI_NALAR.length) { K.urutan = UJI_NALAR.map(() => acak([0, 1, 2, 3])); simpan(); }
  const benar = UJI_NALAR.filter((q, i) => K.jawab[i] === 0).length;
  APP.innerHTML = `<h1 class="judul-hal">Uji Nalar</h1>
  <p class="redup">${UJI_NALAR.length} soal tentang cara ilmuwan berpikir: menilai klaim, membaca data, dan menarik kesimpulan. Pilih jawaban paling tepat, lalu tekan <b>Periksa</b>.</p>
  ${K.diperiksa ? `<div class="kartu skor-kuis"><span><b>Skormu: ${benar}/${UJI_NALAR.length}</b> · nilai ${Math.round(benar / UJI_NALAR.length * 100)}</span><button class="tombol" id="bUlangKuis">Ulangi dengan urutan baru</button></div>` : ''}
  <div class="daftar-soal">${UJI_NALAR.map((q, i) => {
    const I = INDIKATOR.find(x => x.id === q.ind);
    return `<div class="kartu soal ${K.diperiksa ? (K.jawab[i] === 0 ? 'benar' : 'salah') : ''}">
      <div class="soal-kepala"><span class="nomor">${i + 1}</span><span class="ind-tag"><span style="--c:${I.warna}">${I.nama}</span></span></div>
      <p>${esc(q.soal)}</p>
      <div class="opsi">${K.urutan[i].map(o => `<label class="${K.diperiksa && o === 0 ? 'kunci' : ''} ${K.diperiksa && K.jawab[i] === o && o !== 0 ? 'keliru' : ''}">
        <input type="radio" name="q${i}" value="${o}" ${K.jawab[i] === o ? 'checked' : ''} ${K.diperiksa ? 'disabled' : ''}><span>${esc(q.opsi[o])}</span></label>`).join('')}</div>
      ${K.diperiksa ? `<div class="bahas"><b>Pembahasan:</b> ${esc(q.bahas)}<button class="tombol kecil" data-tanya="${i}">💬 Diskusikan dengan Kak Nala</button></div>` : ''}
    </div>`;
  }).join('')}</div>
  ${K.diperiksa ? '' : '<p class="galat" id="galatKuis" hidden></p><button class="tombol utama" id="bPeriksaKuis">Periksa jawaban</button>'}`;
  $$('.opsi input').forEach(r => r.onchange = () => { K.jawab[+r.name.slice(1)] = +r.value; simpan(); const g = $('#galatKuis'); if (g) g.hidden = true; });
  const bp = $('#bPeriksaKuis');
  if (bp) bp.onclick = () => {
    const kosong = UJI_NALAR.map((q, i) => i).filter(i => K.jawab[i] === undefined);
    if (kosong.length) { const g = $('#galatKuis'); g.textContent = `Masih ada ${kosong.length} soal yang belum dijawab (nomor ${kosong.map(i => i + 1).join(', ')}).`; g.hidden = false; return; }
    K.diperiksa = true; simpan(); halUjiNalar();
  };
  const bu = $('#bUlangKuis');
  if (bu) bu.onclick = () => { S.kuis = { jawab: {}, diperiksa: false, urutan: null }; simpan(); halUjiNalar(); };
  $$('[data-tanya]').forEach(b => b.onclick = () => {
    const i = +b.dataset.tanya, q = UJI_NALAR[i];
    setKonteksTutor({ jenis: 'kuis', soal: `${q.soal} | Jawaban benar: ${q.opsi[0]} | Pembahasan: ${q.bahas}` });
    bukaTutor(`Soal nomor ${i + 1}: aku memilih "${q.opsi[K.jawab[i]]}". ${K.jawab[i] === 0 ? 'Jawabanku benar, tapi bantu aku memahami lebih dalam alasannya.' : 'Jawabanku keliru. Bantu aku memahami di mana letak kekeliruan cara berpikirku.'}`, 2);
  });
}

/* ---------------- Portofolio ---------------- */
function rataIndikator() {
  const kumpul = Object.fromEntries(INDIKATOR.map(i => [i.id, []]));
  Object.values(S.misi).forEach(st => Object.values(st.nilai || {}).forEach(n => Object.entries(n.skor || {}).forEach(([id, s]) => kumpul[id] && kumpul[id].push(s))));
  return Object.fromEntries(Object.entries(kumpul).map(([id, a]) => [id, a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0]));
}

function halPortofolio() {
  setKonteksTutor({ jenis: 'umum' });
  const rata = rataIndikator();
  const K = S.kuis;
  const benar = UJI_NALAR.filter((q, i) => K.jawab[i] === 0).length;
  const semuaUji = Object.values(S.misi).flatMap(s => s.uji || []);
  const nonAwal = semuaUji.filter(u => u.adil !== null);
  const persenAdil = nonAwal.length ? Math.round(nonAwal.filter(u => u.adil).length / nonAwal.length * 100) : null;
  APP.innerHTML = `<div class="kepala-porto">
    <div><h1 class="judul-hal">Portofolio Berpikir Kritis</h1>
    <p class="redup">${S.profil.nama ? `<b>${esc(S.profil.nama)}</b>${S.profil.kelas ? ' · Kelas ' + esc(S.profil.kelas) : ''}` : 'Isi namamu di Beranda agar tercetak di sini.'} · dicetak ${new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</p></div>
    <div class="aksi-porto no-print"><button class="tombol utama" onclick="window.print()">🖨️ Cetak / simpan PDF</button><button class="tombol" id="bSalin">📋 Salin ringkasan</button></div>
  </div>
  <div class="grid-porto">
    <div class="kartu"><h3>Profil indikator (rata-rata rubrik 1–4)</h3><canvas id="radar" class="radar"></canvas></div>
    <div class="kartu">
      <h3>Ringkasan</h3>
      <div class="statistik">
        <div><b>${MISI.filter(m => kemajuan(m) === LANGKAH.length).length}/${MISI.length}</b><small>Misi selesai</small></div>
        <div><b>${semuaUji.length}</b><small>Uji dilakukan</small></div>
        <div><b>${persenAdil === null ? '—' : persenAdil + '%'}</b><small>Uji adil</small></div>
        <div><b>${K.diperiksa ? `${benar}/${UJI_NALAR.length}` : '—'}</b><small>Uji Nalar</small></div>
      </div>
      <table class="tabel ringkas">${INDIKATOR.map(i => `<tr><td><span class="titik-warna" style="background:${i.warna}"></span>${i.nama}</td><td>${rata[i.id] ? bulat(rata[i.id], 1).toString().replace('.', ',') : '—'}</td><td class="redup">${rata[i.id] ? tingkatNama(Math.round(rata[i.id])) : 'belum dinilai'}</td></tr>`).join('')}</table>
    </div>
  </div>
  ${MISI.map(m => {
    const st = S.misi[m.id];
    if (!st) return '';
    const t = ujiTerbaik(st);
    return `<div class="kartu porto-misi" style="--aksen:${m.warna}">
      <h3>${m.ikon} ${esc(m.judul)} <span class="redup kecil">· ${kemajuan(m)}/${LANGKAH.length} langkah</span></h3>
      ${t ? `<p><b>Rancangan terbaik:</b> uji ke-${t.no}, memenuhi ${t.lulus}/${t.total} kriteria (${m.variabel.map(v => `${v.label.toLowerCase()} ${tampilVar(v, t.v[v.id])}`).join(', ')}).</p>` : ''}
      ${st.nyata && st.nyata.uji.length ? `<div class="porto-nyata"><p><b>🔧 Prototipe nyata:</b> ${st.nyata.uji.length} kali uji.</p>${htmlTabelNyata(m, st).replace(/<td><button[^>]*data-hapus-nyata[^>]*>.*?<\/button><\/td>/g, '<td></td>')}</div>` : ''}
      ${LANGKAH.map(L => {
        const ada = L.isian.some(f => st.isian[f.id]);
        if (!ada) return '';
        const n = st.nilai[L.id];
        return `<details open><summary>Langkah ${L.no}: ${L.judul}${n ? ` — ${Object.entries(n.skor).map(([id, s]) => `${INDIKATOR.find(x => x.id === id).nama} ${s}`).join(', ')}` : ''}</summary>
          ${L.isian.map(f => st.isian[f.id] ? `<p class="jawab"><small>${esc(f.label)}</small>${esc(st.isian[f.id])}</p>` : '').join('')}</details>`;
      }).join('')}
    </div>`;
  }).join('') || '<div class="kartu"><p class="redup">Belum ada misi yang dikerjakan.</p></div>'}
  <div class="no-print zona-bahaya"><button class="tombol bahaya" id="bReset">Hapus semua data belajarku</button></div>`;
  gambarRadar($('#radar'), rata);
  $('#bSalin').onclick = () => {
    const teks = [`Portofolio NalarSTEM — ${S.profil.nama || '(tanpa nama)'} ${S.profil.kelas || ''}`,
      ...INDIKATOR.map(i => `${i.nama}: ${rata[i.id] ? bulat(rata[i.id], 1) : '-'}`),
      ...MISI.map(m => `${m.judul}: ${kemajuan(m)}/${LANGKAH.length} langkah, ${(S.misi[m.id]?.uji || []).length} uji`),
      `Uji adil: ${persenAdil ?? '-'}%`, `Uji Nalar: ${K.diperiksa ? benar + '/' + UJI_NALAR.length : '-'}`].join('\n');
    navigator.clipboard.writeText(teks).then(() => toast('Ringkasan disalin — tempel ke guru/grup kelas'), () => toast('Gagal menyalin', 'peringatan'));
  };
  $('#bReset').onclick = () => {
    if (!confirm('Semua jawaban, data uji, nilai, dan percakapan akan dihapus dari perangkat ini. Lanjutkan?')) return;
    const profil = S.profil;
    S = { profil, misi: {}, kuis: { jawab: {}, diperiksa: false, urutan: null }, chat: {} };
    simpan(); toast('Data dihapus'); halPortofolio();
  };
  const ukur = () => gambarRadar($('#radar'), rata);
  window.addEventListener('resize', ukur);
  bersihkan.push(() => window.removeEventListener('resize', ukur));
}

function gambarRadar(cv, rata) {
  if (!cv) return;
  const g = getComputedStyle(cv.parentElement);
  const W = Math.min(cv.parentElement.clientWidth - parseFloat(g.paddingLeft) - parseFloat(g.paddingRight), 420);
  const dpr = window.devicePixelRatio || 1;
  cv.width = W * dpr; cv.height = W * 0.86 * dpr; cv.style.width = W + 'px'; cv.style.height = W * 0.86 + 'px';
  const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const H = W * 0.86, cx = W / 2, cy = H / 2 + 4, R = Math.min(W, H) * 0.32;
  const sudut = i => -Math.PI / 2 + i * Math.PI * 2 / INDIKATOR.length;
  for (let lv = 1; lv <= 4; lv++) {
    ctx.beginPath();
    INDIKATOR.forEach((_, i) => ctx.lineTo(cx + Math.cos(sudut(i)) * R * lv / 4, cy + Math.sin(sudut(i)) * R * lv / 4));
    ctx.closePath(); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.stroke();
  }
  ctx.beginPath();
  INDIKATOR.forEach((ind, i) => ctx.lineTo(cx + Math.cos(sudut(i)) * R * rata[ind.id] / 4, cy + Math.sin(sudut(i)) * R * rata[ind.id] / 4));
  ctx.closePath(); ctx.fillStyle = 'rgba(13,148,136,.22)'; ctx.fill(); ctx.strokeStyle = '#0d9488'; ctx.lineWidth = 2.5; ctx.stroke();
  INDIKATOR.forEach((ind, i) => {
    const x = cx + Math.cos(sudut(i)) * R * rata[ind.id] / 4, y = cy + Math.sin(sudut(i)) * R * rata[ind.id] / 4;
    ctx.fillStyle = ind.warna; ctx.beginPath(); ctx.arc(x, y, 4.5, 0, 7); ctx.fill();
    const lx = cx + Math.cos(sudut(i)) * (R + 26), ly = cy + Math.sin(sudut(i)) * (R + 18);
    label(ctx, ind.nama, lx, ly, { rata: Math.abs(Math.cos(sudut(i))) < 0.2 ? 'center' : Math.cos(sudut(i)) > 0 ? 'left' : 'right', ukuran: 11, warna: ind.warna, tebal: true });
  });
}

/* ---------------- Panduan guru ---------------- */
function halGuru() {
  setKonteksTutor({ jenis: 'umum' });
  APP.innerHTML = `<h1 class="judul-hal">Panduan Guru</h1>
  <div class="kartu prosa">
    <h3>Tujuan</h3>
    <p>NalarSTEM melatih <b>kemampuan berpikir kritis</b> murid SMP (Fase D) melalui pembelajaran IPA berbasis <b>STEM</b> dengan model <b>PjBL-STEM / Engineering Design Process</b>. AI Tutor "Kak Nala" berperan sebagai <i>scaffolding</i> Sokratik: menuntun dengan pertanyaan, bukan memberi jawaban.</p>
    <h3>Sintaks pembelajaran (± 2–3 JP per misi)</h3>
    <table class="tabel"><thead><tr><th>Langkah</th><th>Kegiatan murid</th><th>Indikator berpikir kritis</th><th>Peran guru</th></tr></thead><tbody>
      ${LANGKAH.map(L => `<tr><td><b>${L.no}. ${L.judul}</b><br><small>${L.edp}</small></td><td>${L.arahan}</td><td>${L.indikator.map(i => INDIKATOR.find(x => x.id === i).nama).join(', ')}</td><td>${['Memantik dengan kisah lokal; pastikan murid membedakan kriteria dan kendala.', 'Mengonfirmasi konsep; luruskan miskonsepsi yang muncul.', 'Memeriksa kelengkapan variabel & pola "Jika–maka–karena".', 'Berkeliling; tanyakan "variabel apa yang kamu ubah?"', 'Memfasilitasi diskusi kelompok membandingkan data.', 'Presentasi CER antarkelompok dan refleksi.', 'Memeriksa cek keselamatan & alat, mendampingi penggunaan alat tajam/uji di luar kelas, lalu memfasilitasi diskusi hasil nyata vs simulasi.'][L.no - 1]}</td></tr>`).join('')}
    </tbody></table>
    <h3>Rubrik penilaian (dipakai AI & tutor lokal)</h3>
    <table class="tabel"><thead><tr><th>Skor</th><th>Deskriptor</th></tr></thead><tbody>
      <tr><td>4 · Mahir</td><td>Tepat dan lengkap, memakai konsep IPA yang benar dan data/angka spesifik, alasannya logis dan runtut.</td></tr>
      <tr><td>3 · Cakap</td><td>Sebagian besar tepat dan beralasan, tetapi kurang data spesifik atau kaitan konsep kurang jelas.</td></tr>
      <tr><td>2 · Berkembang</td><td>Tepat sebagian, alasan dangkal/umum, atau ada miskonsepsi kecil.</td></tr>
      <tr><td>1 · Mulai berkembang</td><td>Belum menjawab pertanyaan, terlalu singkat, atau miskonsepsi besar.</td></tr>
    </tbody></table>
    <p class="redup">Skor AI bersifat <b>formatif</b> — gunakan sebagai umpan balik cepat, bukan nilai akhir. Guru tetap memvalidasi melalui portofolio murid.</p>
    <h3>Fitur penguat berpikir kritis</h3>
    <ul>
      <li><b>Detektor uji adil</b> — sistem menandai uji yang mengubah lebih dari satu variabel sekaligus.</li>
      <li><b>Prediksi sebelum menguji</b> — murid membandingkan dugaan dengan hasil (konflik kognitif).</li>
      <li><b>Kriteria vs kendala yang saling tarik-menarik</b> — tidak ada satu jawaban tunggal; murid harus menimbang (<i>trade-off</i>).</li>
      <li><b>Grafik data</b> — murid memilih sumbu sendiri untuk menemukan pola.</li>
      <li><b>Uji Nalar</b> — ${UJI_NALAR.length} soal literasi sains: hoaks, korelasi vs kausalitas, variabel, CER.</li>
    </ul>
    <h3>Catatan model simulasi</h3>
    <p>Simulasi memakai model fisika/biologi yang <b>disederhanakan</b> agar pola teramati jelas (mis. faktor pembatas Blackman, konduksi dinding datar, efisiensi penyaringan per lapisan, lintasan roket dengan faktor hambatan udara tetap). Diskusikan dengan murid bahwa model selalu punya keterbatasan — ini sendiri merupakan latihan berpikir kritis.</p>
    <h3>Praktik dunia nyata (Langkah 7)</h3>
    <p>Setiap misi dilengkapi daftar alat &amp; bahan murah, <b>cek keselamatan</b> yang wajib dicentang sebelum langkah kerja terbuka, <b>takaran praktis</b> yang dihitung dari uji terbaik murid di simulasi, tabel <b>data uji nyata</b> (bisa dengan foto), dan perbandingan otomatis dengan prediksi simulasi. Tombol <b>Ada masalah?</b> menghubungkan murid ke Kak Nala, yang diprogram mendahulukan keselamatan dan menolak modifikasi berbahaya.</p>
    <table class="tabel"><thead><tr><th>Misi</th><th>Waktu</th><th>Poin keselamatan utama</th></tr></thead><tbody>
      ${MISI.map(m => `<tr><td>${m.ikon} ${esc(m.judul)}</td><td>${esc(NYATA[m.id].waktu)}</td><td>${esc(NYATA[m.id].keselamatan[0])}</td></tr>`).join('')}
    </tbody></table>
    <h3>Rubrik produk nyata (penilaian guru)</h3>
    <table class="tabel"><thead><tr><th>Aspek</th><th>4 · Mahir</th><th>2 · Berkembang</th></tr></thead><tbody>
      <tr><td>Keselamatan</td><td>Semua prosedur keselamatan dipatuhi tanpa diingatkan; area kerja rapi.</td><td>Perlu diingatkan lebih dari sekali.</td></tr>
      <tr><td>Fungsi prototipe</td><td>Memenuhi semua kriteria keberhasilan saat diuji nyata.</td><td>Memenuhi sebagian kriteria.</td></tr>
      <tr><td>Data &amp; dokumentasi</td><td>Uji diulang ≥ 3 kali, data lengkap dengan satuan, ada foto.</td><td>Uji hanya sekali atau data tidak lengkap.</td></tr>
      <tr><td>Refleksi model</td><td>Menjelaskan selisih nyata–simulasi dengan faktor spesifik dan mengusulkan perbaikan.</td><td>Hanya menyebut "hasilnya beda" tanpa alasan jelas.</td></tr>
    </tbody></table>
    <h3>Pengumpulan hasil</h3>
    <p>Data tersimpan di perangkat masing-masing murid. Minta murid membuka <b>Portofolio</b> → <b>Cetak / simpan PDF</b>, atau <b>Salin ringkasan</b> lalu kirim ke guru.</p>
  </div>`;
}

/* ---------------- Pengaturan AI ---------------- */
function halPengaturan() {
  setKonteksTutor({ jenis: 'umum' });
  const c = bacaAI();
  APP.innerHTML = `<h1 class="judul-hal">Pengaturan AI Tutor</h1>
  <div class="kartu prosa">
    <form id="fAI">
      <fieldset class="pilihan-sumber">
        <label><input type="radio" name="sumber" value="bawaan" ${c.sumber === 'bawaan' ? 'checked' : ''}><span><b>Server sekolah</b><small>Kunci Gemini disimpan di server (Vercel). Murid tidak perlu mengisi apa pun.</small></span></label>
        <label><input type="radio" name="sumber" value="pribadi" ${c.sumber === 'pribadi' ? 'checked' : ''}><span><b>Kunci Gemini pribadi</b><small>Dapatkan gratis di aistudio.google.com → "Get API key". Kunci hanya disimpan di browser ini.</small></span></label>
        <label><input type="radio" name="sumber" value="lokal" ${c.sumber === 'lokal' ? 'checked' : ''}><span><b>Tanpa AI (tutor lokal)</b><small>Bekerja offline. Petunjuk & penilaian memakai aturan sederhana.</small></span></label>
      </fieldset>
      <label class="isian" id="baris-kunci" ${c.sumber === 'pribadi' ? '' : 'hidden'}><span>Kunci API Gemini</span><input id="aiKunci" type="password" value="${esc(c.kunci)}" placeholder="AIza..." autocomplete="off"></label>
      <label class="isian"><span>Model</span><select id="aiModel">
        ${MODEL_PILIHAN.map(([x, n]) => `<option value="${x}" ${x === c.model ? 'selected' : ''}>${n}</option>`).join('')}
      </select></label>
      <div class="aksi-lembar"><button class="tombol utama">Simpan</button><button type="button" class="tombol" id="bTesAI">Uji koneksi</button><span id="hasilTes" class="redup"></span></div>
    </form>
    ${location.protocol === 'file:' ? '<p class="peringatan">Aplikasi dibuka langsung dari berkas (file://). Mode "Server sekolah" tidak tersedia — pakai kunci pribadi atau tutor lokal.</p>' : ''}
  </div>`;
  $$('[name=sumber]').forEach(r => r.onchange = () => { $('#baris-kunci').hidden = r.value !== 'pribadi' || !r.checked; });
  const ambil = () => ({ sumber: $('[name=sumber]:checked').value, kunci: $('#aiKunci').value.trim(), model: $('#aiModel').value });
  $('#fAI').onsubmit = e => { e.preventDefault(); simpanAI(ambil()); toast('Pengaturan AI tersimpan'); gambarChat(); };
  $('#bTesAI').onclick = async () => {
    simpanAI(ambil());
    const h = $('#hasilTes'); h.textContent = 'Menguji…';
    try {
      const t = await panggilAI({ sistem: 'Jawab singkat dalam Bahasa Indonesia.', riwayat: [{ peran: 'user', teks: 'Sebutkan satu contoh isolator kalor dalam 5 kata.' }], json: false });
      h.textContent = '✅ Tersambung: ' + t.slice(0, 80);
    } catch (e) {
      h.textContent = e.message === 'LOKAL' ? 'Mode tutor lokal aktif (tanpa AI).' : '❌ ' + e.message;
    }
  };
}

/* ---------------- Mulai ---------------- */
$('#tombolMenu').onclick = () => document.body.classList.toggle('menu-buka');
pasangTutor();
rute();
