/* Langkah 0 · Pemanasan (apersepsi) sebelum 7 langkah misi.
   Isi per misi: pemantik kontekstual, prasyarat ("ingat lagi"), tebakan awal (tanpa benar-salah,
   dibuktikan lagi di Langkah 6), manfaat, dan profesi terkait. Tujuan belajar diambil dari TES_MISI. */

const APERSEPSI = {
  penjernih: {
    pemantik: 'Saat kemarau, banyak sumur di desa mengering. Pernahkah kamu melihat air sungai yang keruh kecokelatan? Bisakah air seperti itu dibuat jernih hanya dengan bahan di sekitar rumah?',
    ingat: ['Campuran adalah gabungan dua zat atau lebih yang sifat aslinya masih ada, misalnya air dan lumpur.', 'Partikel padat yang besar bisa ditahan saringan, sedangkan partikel yang sangat kecil bisa lolos.'],
    tebak: { q: 'Menurutmu, lapisan mana yang paling berperan membuat air jernih?', opsi: ['Kerikil di bagian bawah', 'Pasir halus dan arang', 'Ijuk di bagian atas'] },
    manfaat: ['Menyediakan air bersih untuk mencuci dan mandi saat kemarau atau bencana.', 'Memahami cara kerja penjernih air PDAM dan filter air rumahan.'],
    profesi: ['Teknisi pengolahan air (PDAM)', 'Ahli kesehatan lingkungan', 'Relawan tanggap bencana']
  },
  pendingin: {
    pemantik: 'Nelayan di pantai Besuki melaut semalaman. Es batu di kotak mereka sering habis mencair sebelum kapal mendarat, lalu ikan cepat busuk dan harganya jatuh. Mengapa es di dalam termos lebih awet daripada di dalam ember?',
    ingat: ['Kalor selalu berpindah dari benda yang lebih panas ke benda yang lebih dingin.', 'Kalor berpindah dengan tiga cara: konduksi, konveksi, dan radiasi.'],
    tebak: { q: 'Bahan dinding kotak mana yang menurutmu paling membuat es awet?', opsi: ['Seng/logam tipis', 'Styrofoam tebal', 'Papan kayu tipis'] },
    manfaat: ['Membantu nelayan menjaga ikan tetap segar sehingga harganya tidak turun.', 'Memahami cara kerja termos, kulkas, dan cool box.'],
    profesi: ['Teknisi pendingin (refrigerasi)', 'Ahli teknologi pangan hasil perikanan', 'Insinyur material']
  },
  roket: {
    pemantik: 'Pernahkah kamu melihat cuka dituangkan ke soda kue? Campurannya langsung berbuih dan mendesis. Buih itu berasal dari mana, dan mungkinkah tenaganya cukup untuk meluncurkan sebuah roket botol?',
    ingat: ['Zat bisa berwujud padat, cair, atau gas.', 'Gas memenuhi ruang dan bisa menekan dinding wadahnya.'],
    tebak: { q: 'Agar roket meluncur paling jauh, apa yang sebaiknya ditambah?', opsi: ['Soda kue sebanyak-banyaknya', 'Cuka sebanyak-banyaknya', 'Cuka dan soda kue dengan takaran seimbang'] },
    manfaat: ['Membedakan perubahan fisika dan kimia dalam kegiatan sehari-hari, seperti memasak dan membersihkan karat.', 'Belajar menakar bahan dengan hemat, seperti koki dan apoteker.'],
    profesi: ['Ahli kimia', 'Insinyur roket/dirgantara (BRIN)', 'Koki dan pembuat roti']
  },
  pengering: {
    pemantik: 'Saat musim ikan, tetangga kita menjemur ikan asin di para-para terbuka. Pengeringan butuh 4–5 hari, dihinggapi lalat, dan basah lagi bila mendung. Bisakah panas matahari "ditangkap" agar ikan lebih cepat kering?',
    ingat: ['Penguapan lebih cepat bila suhu tinggi, ada aliran udara, dan permukaannya luas.', 'Benda berwarna gelap menyerap panas matahari lebih banyak.'],
    tebak: { q: 'Bagian mana yang paling menentukan kecepatan ikan mengering?', opsi: ['Tutup plastik bening', 'Lubang aliran udara', 'Warna hitam di dasar pengering'] },
    manfaat: ['Membantu nelayan mendapat ikan asin yang lebih bersih dan cepat kering.', 'Memahami cara kerja pengering pakaian, oven surya, dan rumah kaca.'],
    profesi: ['Ahli teknologi pangan', 'Insinyur energi surya', 'Penyuluh perikanan']
  },
  garam: {
    pemantik: 'Situbondo terkenal dengan tambak garamnya. Pernahkah kamu melihat garam yang kusam bercampur lumpur? Bagaimana air laut yang bening bisa berubah menjadi kristal garam putih?',
    ingat: ['Air laut adalah campuran: air dan garam terlarut.', 'Saat air menguap, zat yang terlarut di dalamnya tertinggal.'],
    tebak: { q: 'Apa yang paling membuat garam lebih cepat dipanen?', opsi: ['Air laut yang lebih dalam', 'Petak yang dangkal dan luas', 'Menambah air laut setiap hari'] },
    manfaat: ['Membantu petani garam menghasilkan garam yang lebih bersih dan bernilai jual tinggi.', 'Memahami cara memisahkan campuran dengan penguapan dan kristalisasi.'],
    profesi: ['Petani garam modern', 'Ahli teknik kimia', 'Pengawas mutu pangan']
  },
  kompos: {
    pemantik: 'Setiap hari kantin sekolah membuang sisa sayur, kulit buah, dan nasi. Sampah itu berbau dan mengundang lalat. Ke mana sebenarnya daun-daun kering di hutan "menghilang" tanpa dibuang?',
    ingat: ['Dekomposer (bakteri dan jamur) menguraikan sisa makhluk hidup.', 'Makhluk hidup membutuhkan air dan udara untuk hidup.'],
    tebak: { q: 'Apa penyebab utama kompos berbau busuk?', opsi: ['Terlalu banyak daun kering', 'Terlalu basah dan kurang udara', 'Terlalu sering diaduk'] },
    manfaat: ['Mengurangi sampah sekolah dan rumah sekaligus menghasilkan pupuk gratis.', 'Memahami peran mikroorganisme dalam menjaga ekosistem.'],
    profesi: ['Ahli lingkungan/pengelola sampah', 'Petani organik', 'Ahli mikrobiologi']
  },
  sejuk: {
    pemantik: 'Siang hari di musim kemarau, ruang kelas terasa seperti oven. Kamu mengantuk dan sulit fokus. Mengapa rumah adat beratap tinggi atau rumah di bawah pohon terasa lebih sejuk?',
    ingat: ['Udara panas lebih ringan sehingga naik, sedangkan udara dingin turun (konveksi).', 'Permukaan gelap menyerap panas, permukaan putih memantulkannya.'],
    tebak: { q: 'Perbaikan mana yang menurutmu paling menurunkan suhu kelas?', opsi: ['Mengecat atap dengan warna putih', 'Menambah kipas angin', 'Memasang ventilasi tinggi untuk aliran udara'] },
    manfaat: ['Membuat ruang belajar dan rumah lebih nyaman tanpa biaya listrik AC.', 'Memahami bangunan hemat energi.'],
    profesi: ['Arsitek', 'Insinyur bangunan hijau', 'Teknisi tata udara']
  },
  mangrove: {
    pemantik: 'Di beberapa kampung nelayan, pantai terkikis gelombang hingga rumah warga terancam. Tetapi di pantai yang ditumbuhi mangrove, garis pantainya tetap aman. Apa rahasia tanaman ini?',
    ingat: ['Ekosistem adalah hubungan timbal balik antara makhluk hidup dan lingkungannya.', 'Akar tumbuhan mengikat tanah sehingga tidak mudah terbawa air.'],
    tebak: { q: 'Apa yang paling menentukan mangrove bisa menahan abrasi?', opsi: ['Jumlah bibit sebanyak-banyaknya', 'Jenis mangrove dan jarak tanam yang tepat', 'Menanam sedekat mungkin dengan laut lepas'] },
    manfaat: ['Melindungi kampung pesisir dari abrasi dan rob.', 'Mengenal peran mangrove sebagai rumah ikan, kepiting, dan penyerap karbon.'],
    profesi: ['Ahli ekologi pesisir', 'Polisi kehutanan/konservasionis', 'Penyuluh kelautan']
  },
  hidroponik: {
    pemantik: 'Sawi bisa tumbuh tanpa tanah, bahkan di dalam ruangan dengan lampu! Koperasi sekolah ingin menjual sawi hidroponik. Apa saja yang benar-benar dibutuhkan tanaman untuk tumbuh?',
    ingat: ['Tumbuhan membuat makanannya sendiri melalui fotosintesis.', 'Fotosintesis membutuhkan cahaya, air, dan karbon dioksida.'],
    tebak: { q: 'Bila lampunya diperterang terus, sawi akan...', opsi: ['Tumbuh makin cepat tanpa batas', 'Tumbuh lebih cepat sampai batas tertentu', 'Tidak terpengaruh sama sekali'] },
    manfaat: ['Menanam sayur di lahan sempit, bahkan di rumah tanpa halaman.', 'Memahami faktor pembatas pertumbuhan tanaman yang dipakai petani modern.'],
    profesi: ['Petani hidroponik/urban farming', 'Ahli agronomi', 'Wirausaha pertanian']
  },
  angin: {
    pemantik: 'Angin laut di pantai Besuki hampir selalu bertiup, tetapi pos ronda di tepi pantai tetap gelap di malam hari. Bisakah tiupan angin diubah menjadi cahaya lampu?',
    ingat: ['Energi tidak dapat diciptakan atau dimusnahkan, hanya berubah bentuk.', 'Benda yang bergerak memiliki energi kinetik.'],
    tebak: { q: 'Apa yang paling menambah listrik yang dihasilkan kincir?', opsi: ['Bilah yang lebih banyak', 'Bilah yang lebih panjang', 'Warna bilah yang lebih cerah'] },
    manfaat: ['Memanfaatkan energi terbarukan untuk desa yang belum terjangkau listrik.', 'Memahami cara kerja pembangkit listrik tenaga bayu (PLTB).'],
    profesi: ['Insinyur energi terbarukan', 'Teknisi listrik', 'Peneliti iklim/angin']
  },
  nyamuk: {
    pemantik: 'Setiap pancaroba, kasus demam berdarah di sekitar kita meningkat. Tahukah kamu bahwa nyamuk menemukan kita dari gas yang kita embuskan? Bisakah gas itu dibuat sendiri untuk memancing nyamuk?',
    ingat: ['Ragi adalah jamur yang mengubah gula menjadi gas karbon dioksida (fermentasi).', 'Nyamuk Aedes aegypti menularkan virus dengue.'],
    tebak: { q: 'Agar perangkap paling banyak menangkap nyamuk, apa yang paling penting?', opsi: ['Gula sebanyak-banyaknya', 'Takaran gula, ragi, dan air hangat yang pas', 'Botol berwarna terang'] },
    manfaat: ['Ikut mencegah DBD di rumah dan sekolah dengan bahan murah.', 'Memahami bioteknologi sederhana (fermentasi) dalam kehidupan.'],
    profesi: ['Ahli epidemiologi/kesehatan masyarakat', 'Entomolog (ahli serangga)', 'Petugas puskesmas']
  },
  perahu: {
    pemantik: 'Saat banjir rob menggenangi jalan, warga kesulitan membawa karung hasil panen. Kapal baja yang sangat berat bisa mengapung, tetapi sebuah paku kecil tenggelam. Mengapa begitu?',
    ingat: ['Massa jenis menunjukkan seberapa "padat" suatu benda (massa per volume).', 'Air memberi gaya ke atas pada benda yang tercelup.'],
    tebak: { q: 'Bentuk perahu mana yang menurutmu mampu membawa muatan paling banyak?', opsi: ['Sempit dan tinggi', 'Lebar dan dangkal', 'Bulat seperti bola'] },
    manfaat: ['Memahami mengapa kapal nelayan bisa mengapung dan kapan bisa tenggelam karena kelebihan muatan.', 'Merancang alat penyelamat sederhana saat banjir.'],
    profesi: ['Insinyur perkapalan', 'Nakhoda/pelaut', 'Tim SAR']
  },
  roketair: {
    pemantik: 'Pompa sepeda, botol bekas, dan sedikit air bisa menjadi roket yang melesat puluhan meter! Mengapa roket justru terdorong ke atas saat airnya menyembur ke bawah?',
    ingat: ['Gas yang dimampatkan memiliki tekanan tinggi.', 'Setiap aksi menimbulkan reaksi yang sama besar dan berlawanan arah (Hukum III Newton).'],
    tebak: { q: 'Roket terbang paling jauh bila botol diisi air...', opsi: ['Penuh', 'Kira-kira sepertiga', 'Tanpa air sama sekali'] },
    manfaat: ['Memahami prinsip yang sama dengan roket sungguhan dan alat semprot.', 'Belajar bekerja aman dengan tekanan.'],
    profesi: ['Insinyur dirgantara', 'Peneliti roket (BRIN)', 'Ahli mekanika fluida']
  },
  jembatan: {
    pemantik: 'Jembatan kayu di atas saluran irigasi rusak diterjang banjir. Mengapa banyak jembatan besar memakai rangka berbentuk segitiga? Apa istimewanya bentuk itu?',
    ingat: ['Gaya adalah tarikan atau dorongan.', 'Benda bisa mendapat gaya tekan (didorong) atau gaya tarik (ditarik).'],
    tebak: { q: 'Bentuk rangka mana yang menurutmu paling kuat menahan beban?', opsi: ['Persegi', 'Segitiga', 'Lurus tanpa rangka'] },
    manfaat: ['Memahami mengapa bangunan dan jembatan bisa kokoh atau runtuh.', 'Belajar membuat struktur kuat dengan bahan sedikit dan murah.'],
    profesi: ['Insinyur sipil', 'Arsitek', 'Pengawas konstruksi']
  },
  pesawat: {
    pemantik: 'Saat panen, petani garam mengangkat karung 60 kg ke gerobak, dan punggung mereka sering cedera. Bagaimana tukang bangunan bisa mengangkat beban berat ke lantai atas hanya dengan katrol?',
    ingat: ['Usaha adalah gaya dikali perpindahan.', 'Pesawat sederhana membantu memudahkan pekerjaan.'],
    tebak: { q: 'Alat mana yang menurutmu paling meringankan gaya angkat?', opsi: ['Satu katrol tetap', 'Tuas dengan lengan kuasa panjang', 'Mengangkat langsung bersama dua orang'] },
    manfaat: ['Mengurangi cedera saat bekerja mengangkat beban.', 'Memahami alat sehari-hari: gunting, linggis, jungkat-jungkit, katrol sumur.'],
    profesi: ['Insinyur mesin', 'Ahli ergonomi/K3', 'Operator alat berat']
  },
  optik: {
    pemantik: 'Proyektor sekolah rusak, padahal guru ingin memutar video. Bisakah kotak kardus dan sebuah HP menjadi proyektor? Mengapa kaca pembesar bisa memusatkan cahaya matahari menjadi titik terang?',
    ingat: ['Cahaya merambat lurus.', 'Lensa cembung mengumpulkan cahaya, lensa cekung menyebarkannya.'],
    tebak: { q: 'Agar gambar di dinding tajam, yang paling perlu diatur adalah...', opsi: ['Kecerahan layar HP', 'Jarak HP ke lensa', 'Ukuran kotak kardus'] },
    manfaat: ['Memahami cara kerja kamera, kacamata, mikroskop, dan proyektor.', 'Membuat media pembelajaran sendiri dengan biaya murah.'],
    profesi: ['Optometris/ahli kacamata', 'Fotografer/sinematografer', 'Insinyur optik']
  },
  bunyi: {
    pemantik: 'Sasando dari Nusa Tenggara Timur menghasilkan nada yang merdu dari senar yang dipetik. Mengapa senar yang dikencangkan bunyinya makin tinggi?',
    ingat: ['Bunyi dihasilkan oleh benda yang bergetar.', 'Banyaknya getaran tiap detik disebut frekuensi.'],
    tebak: { q: 'Agar nada senar lebih tinggi, kita bisa...', opsi: ['Memperpanjang senar', 'Mengencangkan senar', 'Memetik lebih keras'] },
    manfaat: ['Memahami cara kerja alat musik dan menyetem gitar.', 'Mengenal bunyi, gema, dan cara meredam kebisingan.'],
    profesi: ['Pembuat alat musik', 'Ahli akustik/sound engineer', 'Musisi']
  },
  gempa: {
    pemantik: 'Indonesia sering diguncang gempa, dan banyak korban justru tertimpa bangunan yang runtuh. Mengapa rumah kayu tradisional sering lebih selamat daripada rumah tembok saat gempa?',
    ingat: ['Indonesia berada di pertemuan lempeng-lempeng tektonik.', 'Gempa menghasilkan getaran yang merambat ke segala arah.'],
    tebak: { q: 'Rumah tahan gempa sebaiknya...', opsi: ['Sekaku dan seberat mungkin', 'Ringan, diberi pengaku, dan bisa sedikit melentur', 'Setinggi mungkin'] },
    manfaat: ['Menyelamatkan nyawa dengan bangunan yang lebih aman.', 'Memahami mitigasi bencana di daerah rawan gempa.'],
    profesi: ['Insinyur kegempaan', 'Ahli geofisika (BMKG)', 'Petugas BPBD']
  },
  boraks: {
    pemantik: 'Kerupuk dan bakso yang sangat kenyal kadang dicurigai memakai boraks, pengawet yang dilarang. Bagaimana kita bisa memeriksanya tanpa laboratorium mahal, hanya dengan kunyit dari dapur?',
    ingat: ['Zat aditif ada yang alami dan buatan, ada yang aman dan berbahaya.', 'Beberapa bahan alam berubah warna di larutan asam atau basa (indikator).'],
    tebak: { q: 'Kertas kunyit akan berubah warna bila terkena...', opsi: ['Gula', 'Zat yang bersifat basa seperti boraks', 'Air putih'] },
    manfaat: ['Melindungi diri dan keluarga dari makanan berbahaya.', 'Menjadi konsumen yang cerdas dan kritis.'],
    profesi: ['Pengawas pangan (BPOM)', 'Ahli gizi', 'Analis laboratorium']
  },
  tetes: {
    pemantik: 'Saat libur panjang di musim kemarau, tanaman cabai di kebun sekolah sering mati kekeringan. Bisakah tanaman disiram sedikit demi sedikit secara otomatis tanpa listrik?',
    ingat: ['Zat cair menekan ke segala arah.', 'Makin dalam di dalam zat cair, makin besar tekanannya.'],
    tebak: { q: 'Agar air menetes lebih cepat, wadah air sebaiknya...', opsi: ['Diletakkan lebih tinggi', 'Diletakkan lebih rendah', 'Dicat warna gelap'] },
    manfaat: ['Menghemat air dan menjaga tanaman tetap hidup saat kemarau.', 'Memahami cara kerja infus, menara air, dan irigasi tetes.'],
    profesi: ['Ahli irigasi', 'Petani modern', 'Teknisi perawatan taman']
  },
  listrik: {
    pemantik: 'Saat pemadaman bergilir, Dina, anak nelayan, tidak bisa belajar di malam hari. Dengan baterai AA dan lampu LED, bisakah kita membuat lampu belajar yang terang dan awet?',
    ingat: ['Arus listrik mengalir dalam rangkaian tertutup.', 'Baterai adalah sumber tegangan listrik.'],
    tebak: { q: 'Bila dua lampu dipasang dan satu dicabut, lampu lainnya tetap menyala pada rangkaian...', opsi: ['Seri', 'Paralel', 'Keduanya sama saja'] },
    manfaat: ['Membuat lampu darurat sendiri saat listrik padam.', 'Memahami instalasi listrik rumah dan cara menghemat listrik.'],
    profesi: ['Teknisi listrik', 'Insinyur elektro', 'Petugas PLN']
  },
  magnet: {
    pemantik: 'Di bank sampah, paku dan kaleng besi bercampur dengan kaleng aluminium. Di tempat rongsok besar, ada derek yang bisa mengangkat besi lalu melepaskannya dengan satu tombol. Bagaimana magnet bisa dinyalakan dan dimatikan?',
    ingat: ['Magnet menarik benda dari besi, tetapi tidak menarik aluminium.', 'Arus listrik mengalir dari kutub positif ke kutub negatif baterai.'],
    tebak: { q: 'Agar elektromagnet lebih kuat, kita bisa...', opsi: ['Menambah jumlah lilitan kawat', 'Memakai kawat yang lebih pendek tanpa inti', 'Mengganti inti besi dengan kayu'] },
    manfaat: ['Membantu memilah sampah logam agar bisa didaur ulang.', 'Memahami cara kerja bel listrik, motor, dan speaker.'],
    profesi: ['Insinyur elektro', 'Pengelola daur ulang', 'Teknisi mesin industri']
  },
  tempe: {
    pemantik: 'Tempe adalah warisan asli Indonesia. Tetapi usaha tempe tetangga sekolah sering gagal: berlendir, bau asam, atau berbintik hitam. Siapa sebenarnya yang "membuat" tempe?',
    ingat: ['Jamur adalah makhluk hidup yang membutuhkan suhu, kelembapan, dan udara yang sesuai.', 'Bioteknologi memanfaatkan makhluk hidup untuk menghasilkan produk.'],
    tebak: { q: 'Penyebab tempe berlendir dan bau asam yang paling mungkin adalah...', opsi: ['Ragi terlalu sedikit', 'Kedelai masih terlalu basah', 'Ruangan terlalu terang'] },
    manfaat: ['Membantu usaha pangan lokal menghasilkan tempe yang berkualitas.', 'Memahami bioteknologi dalam makanan sehari-hari: tempe, tapai, yoghurt.'],
    profesi: ['Wirausaha pangan', 'Ahli mikrobiologi pangan', 'Ahli gizi']
  },
  iklim: {
    pemantik: 'Warga pesisir merasakan rob yang makin sering dan kemarau yang makin panjang. Masih ada yang bertanya, "Masa iya gas tak terlihat bisa membuat Bumi lebih panas?" Bagaimana kita membuktikannya dengan percobaan sederhana?',
    ingat: ['Cahaya matahari memanaskan permukaan Bumi.', 'Benda yang hangat memancarkan kalor (radiasi).'],
    tebak: { q: 'Botol berisi gas CO₂ yang disinari lampu akan...', opsi: ['Lebih panas daripada botol berisi udara biasa', 'Sama saja suhunya', 'Lebih dingin daripada botol berisi udara biasa'] },
    manfaat: ['Menjelaskan perubahan iklim kepada keluarga dan warga dengan bukti.', 'Mengambil keputusan hemat energi untuk mengurangi emisi.'],
    profesi: ['Ahli klimatologi (BMKG)', 'Konsultan lingkungan', 'Jurnalis sains']
  }
};

// Halaman Langkah 0 (#/misi/<id>/0)
function halApersepsi(m) {
  const A = APERSEPSI[m.id], st = ms(m.id);
  if (!A) { location.hash = `#/misi/${m.id}/1`; return; }
  st.apersepsi = st.apersepsi || {};
  const tujuan = (typeof TES_MISI !== 'undefined' && TES_MISI[m.id] && TES_MISI[m.id].tujuan) || [];
  APP.innerHTML = `
  <div class="kepala-misi" style="--aksen:${m.warna}">
    <a href="#/misi" class="kembali">← Semua misi</a>
    <div class="km-judul">${sampulMisi(m, 'km-ikon besar')}<div><span class="km-kelas">${esc(m.kelas)}</span><h1>${esc(m.judul)}</h1></div></div>
  </div>
  ${htmlStepper(m, st, 0)}
  <div class="apersepsi" style="--aksen:${m.warna}">
    <div class="arahan"><div class="arahan-kepala"><b>Langkah 0 · Pemanasan</b><span class="redup kecil">± 5 menit, sebelum mulai misi</span></div>
      <p>Siapkan pikiranmu dulu: kenali masalahnya, ingat lagi yang sudah kamu tahu, tebak jawabannya, dan ketahui manfaat yang akan kamu dapat.</p></div>

    <section class="kartu ap-pemantik">${sampulMisi(m, 'ap-gambar')}<div><h3>🤔 Coba bayangkan…</h3><p>${A.pemantik}</p></div></section>

    <section class="kartu"><h3>🧠 Ingat lagi</h3><ul class="ap-ingat">${A.ingat.map(x => `<li>${x}</li>`).join('')}</ul></section>

    <section class="kartu"><h3>🎯 Tebakan awalmu</h3><p><b>${A.tebak.q}</b></p>
      <div class="ap-tebak">${A.tebak.opsi.map((o, i) => `<button type="button" class="${st.apersepsi.tebak === i ? 'pilih' : ''}" data-tebak="${i}">${String.fromCharCode(65 + i)}. ${o}</button>`).join('')}</div>
      <p class="redup kecil">Tidak ada benar atau salah. Tebakanmu disimpan, lalu kamu buktikan sendiri di laboratorium maya, lalu menilainya di Langkah 6.</p></section>

    ${tujuan.length ? `<section class="kartu"><h3>🏁 Setelah misi ini, kamu dapat…</h3><ol class="ap-tujuan">${tujuan.map(t => `<li>${esc(t)}</li>`).join('')}</ol></section>` : ''}

    <section class="kartu ap-manfaat"><div><h3>💡 Manfaatnya untukmu</h3><ul>${A.manfaat.map(x => `<li>${x}</li>`).join('')}</ul></div>
      <div><h3>👷 Profesi yang memakai ilmu ini</h3><div class="ap-profesi">${A.profesi.map(x => `<span>${x}</span>`).join('')}</div></div></section>

    <section class="kartu"><h3>🗺️ Perjalanan misimu</h3><ol class="alur kecil-alur">${LANGKAH.map(L => `<li><span class="no">${L.no}</span><b>${L.judul}</b><small>${L.edp}</small></li>`).join('')}</ol></section>

    <div class="ap-siap"><button class="tombol utama besar" id="bSiap">🚀 Aku siap, mulai misi!</button></div>
  </div>`;
  $$('[data-tebak]').forEach(b => b.onclick = () => {
    st.apersepsi.tebak = +b.dataset.tebak; simpan();
    $$('[data-tebak]').forEach(x => x.classList.toggle('pilih', x === b));
  });
  $('#bSiap').onclick = () => {
    if (st.apersepsi.tebak == null) { toast('Pilih dulu tebakan awalmu, ya', 'peringatan'); $('.ap-tebak').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    st.apersepsi.siap = Date.now(); simpan(); location.hash = `#/misi/${m.id}/1`;
  };
}

// Pengingat tebakan awal (dipakai di Langkah 6 · Simpulkan)
function htmlTebakanAwal(m, st) {
  const A = APERSEPSI[m.id];
  if (!A || !st.apersepsi || st.apersepsi.tebak == null) return '';
  return `<div class="kartu ap-ulang"><b>🎯 Ingat tebakan awalmu di Langkah 0?</b><p>${A.tebak.q} <br>Kamu menebak: <b>${String.fromCharCode(65 + st.apersepsi.tebak)}. ${A.tebak.opsi[st.apersepsi.tebak]}</b></p>
    <p class="redup kecil">Berdasarkan data ujimu, apakah tebakan itu terbukti, perlu diperbaiki, atau keliru? Tuliskan di kesimpulanmu.</p></div>`;
}
