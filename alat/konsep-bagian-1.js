// Soal PEMAHAMAN KONSEP (materi Gali Konsep) per misi — bagian 1
// Format: { kisi: [[tp, level, indikator soal] ×4], A: [4 soal], B: [4 soal paralel] }; kunci = opsi[0] (diacak saat tampil).
// Nomor 1–2 mengukur TP1 (C2 memahami, C3 menerapkan), nomor 3–4 mengukur TP2 (C3/C4).
module.exports = {
  perahu: {
    kisi: [[1, 'C2', 'Menjelaskan arti Hukum Archimedes tentang gaya ke atas'], [1, 'C3', 'Menghitung massa jenis dan menentukan benda mengapung atau tenggelam'], [2, 'C3', 'Menentukan pengaruh massa jenis zat cair terhadap kedalaman celup'], [2, 'C4', 'Menganalisis hubungan muatan, kedalaman celup, dan lambung bebas']],
    A: [
      { soal: 'Menurut Hukum Archimedes, besar gaya ke atas yang dialami benda di dalam air sama dengan …',
        opsi: ['berat air yang dipindahkan oleh bagian benda yang tercelup', 'berat seluruh benda, baik bagian yang tercelup maupun tidak', 'massa jenis benda dikali volume seluruh bagian benda itu', 'tekanan air di permukaan dikali luas alas benda tersebut'],
        bahas: 'Gaya ke atas = berat zat cair yang dipindahkan = ρ air × g × V tercelup.' },
      { soal: 'Sebuah balok bermassa 300 g dan bervolume 500 cm³ dimasukkan ke air tawar (1 g/cm³). Balok itu akan …',
        opsi: ['mengapung, karena massa jenisnya 0,6 g/cm³ lebih kecil dari air', 'tenggelam, karena massanya 300 g lebih besar daripada 1 gram', 'melayang, karena massa dan volumenya sama-sama cukup besar', 'tenggelam, karena massa jenisnya 1,67 g/cm³ lebih besar dari air'],
        bahas: 'ρ = m ÷ V = 300 ÷ 500 = 0,6 g/cm³ < 1 g/cm³, maka balok mengapung.' },
      { soal: 'Perahu yang sama dengan muatan yang sama berpindah dari sungai (air tawar) ke laut. Kedalaman celupnya akan …',
        opsi: ['berkurang, karena air laut lebih rapat daripada air sungai', 'bertambah, karena garam di air laut ikut menekan dasar perahu ke bawah', 'tetap sama, karena berat perahu dan muatannya sama sekali tidak berubah', 'bertambah, karena gaya ke atas di laut lebih kecil daripada di sungai'],
        bahas: 'Gaya ke atas harus sama dengan berat. Karena ρ air laut lebih besar, volume tercelup yang dibutuhkan lebih kecil.' },
      { soal: 'Tinggi dinding perahu 6 cm. Tanpa muatan perahu tercelup 1 cm, dan tiap 1 kg muatan menambah celup 1 cm. Muatan terbesar agar lambung bebas masih 2 cm adalah …',
        opsi: ['3 kg, karena celup menjadi 4 cm dan sisa dinding tepat 2 cm', '4 kg, karena celup menjadi 4 cm dan sisa dinding tepat 2 cm', '5 kg, karena celup 6 cm masih sama dengan tinggi dindingnya', '2 kg, karena celup 3 cm membuat sisa dinding tinggal 3 cm saja'],
        bahas: 'Lambung bebas 2 cm → celup maksimum 6 − 2 = 4 cm. Celup = 1 + muatan, jadi muatan = 3 kg.' }
    ],
    B: [
      { soal: 'Gaya ke atas pada perahu yang mengapung di air bergantung terutama pada …',
        opsi: ['volume bagian perahu yang tercelup dan massa jenis airnya', 'warna cat perahu dan bahan pembuat bagian dinding perahu', 'kedalaman sungai di bawah perahu dan kecepatan arus air', 'tinggi dinding perahu yang berada di atas permukaan air'],
        bahas: 'F_A = ρ air × g × V tercelup: ditentukan volume tercelup dan massa jenis zat cair.' },
      { soal: 'Sebuah benda bermassa 900 g dan bervolume 600 cm³ dimasukkan ke air tawar (1 g/cm³). Benda itu akan …',
        opsi: ['tenggelam, karena massa jenisnya 1,5 g/cm³ lebih besar dari air', 'mengapung, karena volumenya 600 cm³ cukup besar untuk mengapung', 'melayang, karena massanya hampir sama dengan volume bendanya', 'mengapung, karena massa jenisnya 0,67 g/cm³ lebih kecil dari air'],
        bahas: 'ρ = 900 ÷ 600 = 1,5 g/cm³ > 1 g/cm³, maka benda tenggelam (bila padat, tanpa rongga).' },
      { soal: 'Telur tenggelam di air tawar, tetapi mengapung setelah air diberi banyak garam. Penyebabnya adalah …',
        opsi: ['massa jenis air garam naik melebihi massa jenis telur', 'garam membuat massa telur berkurang sehingga lebih ringan', 'garam menempel di kulit telur dan membuatnya berongga', 'air garam lebih dingin sehingga telur ikut menjadi ringan'],
        bahas: 'Garam terlarut menaikkan massa jenis air. Bila ρ air > ρ telur, telur mengapung.' },
      { soal: 'Perahu bertinggi dinding 8 cm tercelup 2 cm tanpa muatan, dan tiap 1 kg menambah celup 1,5 cm. Bila diberi 3 kg, lambung bebasnya …',
        opsi: ['1,5 cm, belum memenuhi syarat lambung bebas minimal 2 cm', '3,5 cm, sudah memenuhi syarat lambung bebas minimal 2 cm', '4,5 cm, karena celupnya hanya bertambah 3 cm dari keadaan kosong', '6,5 cm, karena yang dihitung hanya celup awal sebesar 2 cm saja'],
        bahas: 'Celup = 2 + 3 × 1,5 = 6,5 cm. Lambung bebas = 8 − 6,5 = 1,5 cm (kurang dari 2 cm).' }
    ]
  },

  penjernih: {
    kisi: [[1, 'C2', 'Membedakan campuran homogen dan heterogen'], [1, 'C2', 'Menjelaskan perbedaan prinsip filtrasi dan adsorpsi'], [2, 'C3', 'Menentukan cara pemisahan yang sesuai dengan sifat komponen campuran'], [2, 'C4', 'Menganalisis pengaruh urutan dan ukuran celah lapisan terhadap hasil penyaringan']],
    A: [
      { soal: 'Air sungai yang keruh dan tampak berbutir tanah termasuk campuran …',
        opsi: ['heterogen, karena komponennya tidak merata dan dapat mengendap', 'homogen, karena air sungai mengalir terus sehingga tercampur rata', 'larutan, karena tanah sudah larut sempurna di dalam air sungai', 'zat tunggal, karena air sungai berasal dari satu sumber air saja'],
        bahas: 'Butiran tanah tidak larut dan bisa mengendap, sehingga campurannya heterogen.' },
      { soal: 'Arang dalam penjernih air menghilangkan bau terutama dengan cara …',
        opsi: ['menyerap zat berbau sehingga menempel di permukaan porinya', 'menyaring butiran besar karena celah arang sangat sempit', 'membunuh kuman penyebab bau karena arang sangat panas', 'melarutkan zat berbau sehingga ikut mengalir bersama air'],
        bahas: 'Arang bekerja dengan adsorpsi: zat penyebab bau dan warna menempel di permukaan porinya.' },
      { soal: 'Cara yang paling tepat untuk memisahkan pasir dari air adalah …',
        opsi: ['penyaringan, karena butir pasir lebih besar dari celah saringan', 'penguapan, karena pasir akan ikut menguap bersama air yang dipanaskan', 'adsorpsi, karena pasir akan menempel di permukaan arang aktif', 'kromatografi, karena pasir merambat lebih lambat dari air di kertas'],
        bahas: 'Pasir tidak larut dan butirnya besar, sehingga dapat dipisahkan dengan filtrasi (atau pengendapan).' },
      { soal: 'Sebuah penyaring disusun dengan pasir halus di paling atas dan kerikil di bawah. Akibat yang paling mungkin adalah …',
        opsi: ['pasir cepat tersumbat kotoran kasar sehingga aliran air sangat lambat', 'air menjadi paling jernih dan mengalir paling cepat dibanding susunan lain', 'kerikil di bawah ikut menyaring bau sehingga arang tidak diperlukan lagi', 'urutan lapisan tidak berpengaruh karena semua lapisan dilewati air'],
        bahas: 'Lapisan halus di atas langsung menahan kotoran kasar sehingga celahnya tersumbat dan debit turun.' }
    ],
    B: [
      { soal: 'Air gula yang sudah diaduk sampai gula tidak terlihat lagi termasuk campuran …',
        opsi: ['homogen, karena gula larut merata dan tidak dapat dibedakan', 'heterogen, karena gula dan air masih bisa dipisahkan kembali', 'koloid, karena air gula tampak keruh bila diterangi cahaya', 'zat tunggal, karena gula sudah berubah menjadi air seluruhnya'],
        bahas: 'Gula larut merata membentuk larutan, yaitu campuran homogen.' },
      { soal: 'Perbedaan utama filtrasi dan adsorpsi pada penjernih air adalah …',
        opsi: ['filtrasi menahan butiran menurut ukuran, adsorpsi menempelkan zat ke pori', 'filtrasi membunuh kuman, adsorpsi menahan butiran tanah yang berukuran besar', 'filtrasi memakai panas, adsorpsi memakai aliran air yang dibuat sangat lambat', 'filtrasi hanya untuk zat cair, adsorpsi hanya untuk memisahkan campuran gas'],
        bahas: 'Filtrasi memisahkan berdasarkan ukuran partikel; adsorpsi menempelkan zat ke permukaan berpori (arang).' },
      { soal: 'Garam yang terlarut di dalam air dapat dipisahkan dengan cara …',
        opsi: ['penguapan, karena air menguap sedangkan garamnya tertinggal', 'penyaringan, karena butir garam lebih besar dari celah kain', 'pengendapan, karena garam terlarut akan turun ke dasar wadah', 'adsorpsi, karena garam akan menempel di permukaan pasir halus'],
        bahas: 'Garam terlarut lolos saringan; pemisahannya dengan penguapan sehingga air pergi dan garam tertinggal.' },
      { soal: 'Dua penyaring berbeda hanya pada tebal pasir halus: 5 cm dan 15 cm. Penyaring 15 cm kemungkinan …',
        opsi: ['menghasilkan air lebih jernih tetapi alirannya lebih lambat', 'menghasilkan air lebih keruh karena pasir tebal mudah larut', 'mengalirkan air lebih cepat karena pasirnya lebih banyak', 'menghilangkan kuman sehingga air langsung aman diminum'],
        bahas: 'Pasir halus yang lebih tebal menahan lebih banyak partikel (lebih jernih), tetapi hambatannya lebih besar (lebih lambat).' }
    ]
  },

  pendingin: {
    kisi: [[1, 'C2', 'Menentukan arah perpindahan kalor antara dua benda'], [1, 'C2', 'Mengidentifikasi jenis perpindahan kalor pada peristiwa sehari-hari'], [2, 'C3', 'Menghitung kalor yang dibutuhkan untuk mencairkan es (Q = m × L)'], [2, 'C4', 'Menganalisis pengaruh bahan isolator dan tutup terhadap lama es bertahan']],
    A: [
      { soal: 'Ikan hangat dimasukkan ke kotak berisi es. Yang terjadi adalah …',
        opsi: ['kalor berpindah dari ikan ke es sampai suhunya sama', 'dingin berpindah dari es ke ikan sampai ikan membeku', 'kalor berpindah dari es ke ikan karena es lebih padat', 'tidak ada perpindahan kalor karena kotak tertutup rapat'],
        bahas: 'Kalor selalu berpindah dari benda bersuhu tinggi (ikan) ke benda bersuhu rendah (es).' },
      { soal: 'Gagang sendok logam terasa panas ketika ujungnya dicelupkan ke teh panas. Peristiwa ini adalah contoh …',
        opsi: ['konduksi, kalor merambat melalui logam tanpa logamnya berpindah', 'konveksi, kalor terbawa aliran teh yang naik ke gagang sendok', 'radiasi, kalor dipancarkan teh tanpa melalui perantara apa pun', 'isolasi, kalor tertahan di dalam sendok dan tidak keluar lagi'],
        bahas: 'Kalor merambat melalui zat padat (logam) tanpa disertai perpindahan zatnya: konduksi.' },
      { soal: 'Kalor lebur es 334.000 J/kg. Kalor yang dibutuhkan untuk mencairkan 2 kg es bersuhu 0 °C adalah …',
        opsi: ['668.000 J', '167.000 J', '334.000 J', '336.000 J'],
        bahas: 'Q = m × L = 2 × 334.000 = 668.000 J.' },
      { soal: 'Dua kotak berukuran sama berisi es sama banyak: kotak P dari seng tipis, kotak Q dari styrofoam tebal. Pernyataan yang tepat adalah …',
        opsi: ['es di Q lebih awet karena styrofoam menghambat konduksi kalor', 'es di P lebih awet karena seng memantulkan seluruh kalor dari luar', 'es di kedua kotak sama awetnya karena massa es di dalamnya sama', 'es di P lebih awet karena seng mudah melepaskan dingin keluar'],
        bahas: 'Styrofoam adalah isolator (banyak rongga udara), seng adalah konduktor; kalor masuk lebih lambat ke kotak Q.' }
    ],
    B: [
      { soal: 'Segelas air dingin diletakkan di ruangan bersuhu 30 °C. Lama-kelamaan air menjadi hangat karena …',
        opsi: ['kalor berpindah dari udara ruangan ke air yang lebih dingin', 'dingin dari air berpindah keluar ke udara ruangan yang panas', 'air menghasilkan kalor sendiri ketika dibiarkan cukup lama', 'gelas menyerap dingin dari air lalu melepaskannya ke meja'],
        bahas: 'Kalor berpindah dari udara (suhu tinggi) ke air (suhu rendah) sampai suhunya sama.' },
      { soal: 'Badan terasa hangat ketika duduk di dekat api unggun walaupun tidak menyentuh apinya. Kalor sampai ke badan dengan cara …',
        opsi: ['radiasi, dipancarkan tanpa memerlukan zat perantara', 'konduksi, merambat melalui udara yang diam di sekitar api', 'konveksi, terbawa aliran udara dingin menuju api unggun', 'isolasi, tertahan oleh pakaian lalu dipantulkan ke badan'],
        bahas: 'Panas api sampai ke tubuh dengan pancaran (radiasi), seperti panas matahari sampai ke Bumi.' },
      { soal: 'Kalor lebur es 334.000 J/kg. Jika kalor yang masuk ke kotak 167.000 J, massa es (0 °C) yang mencair adalah …',
        opsi: ['0,5 kg', '2 kg', '1 kg', '5 kg'],
        bahas: 'm = Q ÷ L = 167.000 ÷ 334.000 = 0,5 kg.' },
      { soal: 'Kotak pendingin ditutup dengan tutup yang bercelah lebar. Akibat yang paling mungkin adalah …',
        opsi: ['es lebih cepat mencair karena udara panas keluar-masuk lewat celah', 'es lebih awet karena celah membuat udara dingin tetap di dalam kotak', 'es tidak terpengaruh karena kalor hanya masuk melalui dinding kotak', 'es lebih awet karena celah memantulkan radiasi matahari ke luar'],
        bahas: 'Celah membuat konveksi: udara dingin keluar dan udara panas masuk, sehingga es lebih cepat mencair.' }
    ]
  },

  hidroponik: {
    kisi: [[1, 'C2', 'Menyebutkan bahan dan hasil fotosintesis'], [1, 'C2', 'Menjelaskan fungsi klorofil dan warna cahaya yang diserap'], [2, 'C4', 'Menganalisis faktor pembatas dari data laju fotosintesis'], [2, 'C3', 'Menerapkan konsep osmosis pada larutan nutrisi yang terlalu pekat']],
    A: [
      { soal: 'Bahan yang dibutuhkan tumbuhan untuk fotosintesis adalah …',
        opsi: ['karbon dioksida dan air dengan bantuan cahaya', 'oksigen dan glukosa dengan bantuan energi cahaya', 'nitrogen dan oksigen dengan bantuan energi panas', 'glukosa dan air dengan bantuan energi dari tanah'],
        bahas: '6CO₂ + 6H₂O → (cahaya, klorofil) → C₆H₁₂O₆ + 6O₂.' },
      { soal: 'Daun tampak berwarna hijau karena klorofil …',
        opsi: ['memantulkan hijau serta banyak menyerap merah dan biru', 'menyerap seluruh cahaya hijau lalu memancarkannya kembali', 'menyerap cahaya hijau paling banyak untuk fotosintesis', 'tidak menyerap cahaya apa pun sehingga tampak terang'],
        bahas: 'Klorofil paling banyak menyerap cahaya merah dan biru, sedangkan cahaya hijau dipantulkan.' },
      { soal: 'Data: cahaya dinaikkan dari 200 ke 400 satuan, pertumbuhan naik; dari 400 ke 800, pertumbuhan hampir tidak berubah. Kesimpulan yang tepat adalah …',
        opsi: ['di atas 400 satuan, faktor lain seperti CO₂ menjadi pembatas', 'cahaya di atas 400 satuan merusak klorofil sehingga berhenti', 'pertumbuhan tidak dipengaruhi cahaya sama sekali sejak awal', 'cahaya 800 satuan pasti paling hemat dan paling baik dipakai'],
        bahas: 'Kurva yang mendatar menunjukkan faktor lain (CO₂, suhu, nutrisi) menjadi faktor pembatas.' },
      { soal: 'Larutan AB mix dibuat jauh lebih pekat dari aturan. Akibatnya daun layu karena …',
        opsi: ['air keluar dari akar menuju larutan yang lebih pekat (osmosis)', 'unsur hara yang banyak membuat daun terlalu berat dan rebah', 'larutan pekat menghalangi cahaya lampu menuju daun tanaman', 'akar menyerap terlalu banyak air sehingga sel daun pecah'],
        bahas: 'Pada osmosis, air bergerak ke larutan yang lebih pekat; akar kehilangan air sehingga tanaman layu.' }
    ],
    B: [
      { soal: 'Hasil fotosintesis yang dimanfaatkan tumbuhan dan dilepaskan ke udara adalah …',
        opsi: ['glukosa sebagai makanan dan oksigen yang dilepas ke udara', 'karbon dioksida sebagai makanan dan air yang dilepas ke udara', 'air sebagai makanan dan karbon dioksida yang dilepas ke udara', 'nitrogen sebagai makanan dan glukosa yang dilepas ke udara'],
        bahas: 'Fotosintesis menghasilkan glukosa (makanan) dan oksigen (dilepas ke udara).' },
      { soal: 'Lampu tanam hidroponik sering berwarna ungu-merah muda karena …',
        opsi: ['memadukan cahaya merah dan biru yang paling banyak diserap klorofil', 'cahaya ungu menghasilkan panas paling besar untuk menghangatkan akar', 'warna ungu mengusir serangga hama yang merusak daun sawi', 'cahaya hijau terlalu mahal sehingga diganti dengan warna ungu'],
        bahas: 'Klorofil menyerap cahaya merah dan biru paling banyak; campuran keduanya tampak ungu-merah muda.' },
      { soal: 'Lampu sudah sangat terang, tetapi sawi tumbuh lambat. Setelah CO₂ ditambah, pertumbuhan naik. Faktor pembatasnya semula adalah …',
        opsi: ['kadar CO₂, karena penambahannya menaikkan laju fotosintesis', 'cahaya lampu, karena lampu terang selalu menjadi pembatas', 'suhu ruangan, karena CO₂ menaikkan suhu di sekitar daun', 'nutrisi AB mix, karena CO₂ menambah unsur hara di larutan'],
        bahas: 'Faktor yang ketika ditambah menaikkan laju adalah faktor pembatas, yaitu CO₂.' },
      { soal: 'Ujung daun sawi tampak kering terbakar dan larutan nutrisinya sangat pekat. Tindakan yang paling tepat adalah …',
        opsi: ['mengencerkan larutan agar akar tidak kehilangan air', 'menambah AB mix agar daun mendapat hara lebih banyak', 'menambah terang lampu agar fotosintesis makin cepat', 'mematikan lampu agar daun yang terbakar menjadi dingin'],
        bahas: 'Larutan terlalu pekat menarik air keluar dari akar (osmosis); pengenceran memulihkan penyerapan air.' }
    ]
  },

  roket: {
    kisi: [[1, 'C2', 'Membedakan perubahan fisika dan perubahan kimia'], [1, 'C2', 'Mengidentifikasi ciri-ciri reaksi kimia'], [2, 'C3', 'Menerapkan hukum kekekalan massa pada reaksi cuka dan soda kue'], [2, 'C4', 'Menentukan pereaksi pembatas dari perbandingan massa pereaksi']],
    A: [
      { soal: 'Peristiwa berikut yang termasuk perubahan kimia adalah …',
        opsi: ['cuka dan soda kue bercampur lalu menghasilkan gas', 'cuka 20% diencerkan dengan air menjadi cuka 4%', 'es batu mencair menjadi air di dalam gelas', 'gula larut ketika diaduk di dalam teh hangat'],
        bahas: 'Cuka + soda kue menghasilkan zat baru (gas CO₂, natrium asetat, air): perubahan kimia.' },
      { soal: 'Gejala yang menunjukkan telah terjadi reaksi kimia saat cuka dituang ke soda kue adalah …',
        opsi: ['muncul buih gas dan dinding botol terasa lebih dingin', 'cuka tetap bening dan baunya tidak berubah sama sekali', 'soda kue hanya basah dan tetap utuh di dasar botol', 'volume cairan bertambah karena cuka ditambah lagi'],
        bahas: 'Terbentuk gas dan perubahan suhu (endoterm) adalah ciri reaksi kimia.' },
      { soal: 'Dalam botol tertutup, 60 g asam asetat bereaksi tepat dengan 84 g soda kue. Massa total hasil reaksinya adalah …',
        opsi: ['144 g, karena massa sebelum dan sesudah reaksi sama', '60 g, karena hanya asam asetat yang berubah menjadi gas', '84 g, karena soda kue yang menentukan banyaknya hasil', '24 g, karena hasil reaksi adalah selisih kedua pereaksi'],
        bahas: 'Hukum kekekalan massa: 60 g + 84 g = 144 g hasil reaksi dalam sistem tertutup.' },
      { soal: '100 mL cuka 5% (± 5 g asam) dicampur 10 g soda kue. Perbandingan tepatnya 5 g asam : 7 g soda. Pereaksi pembatasnya adalah …',
        opsi: ['cuka, karena 5 g asam hanya cukup untuk 7 g soda kue', 'soda kue, karena massanya lebih besar daripada asamnya', 'tidak ada, karena kedua pereaksi habis tanpa ada sisa', 'soda kue, karena soda kue selalu habis lebih dahulu'],
        bahas: '5 g asam hanya bereaksi dengan 7 g soda; asam (cuka) habis lebih dulu dan tersisa ± 3 g soda.' }
    ],
    B: [
      { soal: 'Peristiwa berikut yang termasuk perubahan fisika adalah …',
        opsi: ['mengencerkan cuka dengan menambahkan air', 'besi jangkar berkarat terkena air laut', 'kayu bakar terbakar menjadi abu dan asap', 'kedelai berubah menjadi tempe oleh kapang'],
        bahas: 'Pengenceran tidak menghasilkan zat baru; asam asetat tetap asam asetat.' },
      { soal: 'Pernyataan yang tepat tentang gelembung pada air yang mendidih adalah …',
        opsi: ['gelembung itu uap air, jadi mendidih adalah perubahan fisika', 'gelembung itu gas baru, jadi mendidih adalah perubahan kimia', 'gelembung itu oksigen yang terbentuk dari air yang terurai', 'gelembung itu karbon dioksida hasil reaksi air dan panci'],
        bahas: 'Gelembung tidak selalu berarti reaksi kimia; pada air mendidih gelembungnya uap air (zatnya tetap air).' },
      { soal: 'Cuka dan soda kue dicampur di gelas terbuka di atas timbangan. Angka timbangan berkurang karena …',
        opsi: ['gas CO₂ yang terbentuk lepas ke udara', 'massa zat hilang ketika terjadi reaksi kimia', 'soda kue berubah menjadi zat yang lebih ringan', 'cairan cuka menguap seluruhnya karena reaksi'],
        bahas: 'Massa tidak hilang; gas CO₂ keluar dari gelas terbuka. Di sistem tertutup massanya tetap.' },
      { soal: '200 mL cuka 5% (± 10 g asam) dicampur 7 g soda kue. Dengan perbandingan 5 g asam : 7 g soda, yang bersisa adalah …',
        opsi: ['asam ± 5 g, karena soda kue habis lebih dahulu', 'soda kue ± 7 g, karena asam habis lebih dahulu', 'tidak ada, karena keduanya habis bersamaan', 'asam ± 10 g, karena soda kue tidak bereaksi'],
        bahas: '7 g soda hanya butuh 5 g asam; soda kue pembatas, sisa asam ± 10 − 5 = 5 g.' }
    ]
  },

  roketair: {
    kisi: [[1, 'C2', 'Menjelaskan penyebab tekanan gas dalam wadah tertutup'], [1, 'C3', 'Menerapkan Hukum Boyle untuk menentukan tekanan atau volume gas'], [2, 'C2', 'Mengidentifikasi pasangan gaya aksi–reaksi pada roket air'], [2, 'C4', 'Menganalisis pengaruh banyaknya air terhadap dorongan roket']],
    A: [
      { soal: 'Tekanan udara di dalam botol naik ketika dipompa karena …',
        opsi: ['partikel udara makin banyak dan makin sering menumbuk dinding', 'partikel udara makin besar ukurannya ketika dimampatkan', 'udara berubah menjadi air ketika dimasukkan ke dalam botol', 'dinding botol menarik udara dari luar menuju ke dalam'],
        bahas: 'Tekanan gas berasal dari tumbukan partikel dengan dinding; makin banyak partikel, makin sering tumbukan.' },
      { soal: 'Udara 2 L bertekanan 1 bar dimampatkan pada suhu tetap menjadi 0,5 L. Tekanannya menjadi …',
        opsi: ['4 bar', '0,25 bar', '1 bar', '2,5 bar'],
        bahas: 'P₁V₁ = P₂V₂ → 1 × 2 = P₂ × 0,5 → P₂ = 4 bar.' },
      { soal: 'Saat roket air meluncur, gaya reaksi yang mendorong roket ke atas berasal dari …',
        opsi: ['air yang didorong keluar ke bawah oleh udara bertekanan', 'tanah yang memantulkan semburan air kembali ke roket', 'udara luar yang menekan roket dari bagian bawahnya', 'sirip roket yang mendorong udara ke samping kiri kanan'],
        bahas: 'Aksi: botol mendorong air ke bawah; reaksi: air mendorong botol ke atas (Hukum III Newton).' },
      { soal: 'Roket diluncurkan tanpa air, hanya berisi udara bertekanan 4 bar. Roket meluncur pendek karena …',
        opsi: ['hampir tidak ada massa yang disemburkan sebagai pendorong', 'tekanan udara tanpa air pasti melebihi batas aman botol', 'udara bertekanan membuat botol menjadi lebih berat', 'roket tanpa air tidak bisa memakai sirip penstabil'],
        bahas: 'Air adalah massa dorong; tanpa air, udara keluar sangat cepat tetapi massanya kecil sehingga dorongannya lemah.' }
    ],
    B: [
      { soal: 'Ban sepeda yang dipompa terus terasa makin keras karena …',
        opsi: ['partikel udara bertambah sehingga tekanannya naik', 'karet ban berubah menjadi bahan yang lebih padat', 'udara di dalam ban berubah wujud menjadi zat cair', 'ukuran setiap partikel udara di dalam ban membesar'],
        bahas: 'Menambah partikel udara pada volume yang hampir tetap menaikkan tekanan.' },
      { soal: 'Udara 1 L bertekanan 3 bar dibiarkan mengembang pada suhu tetap menjadi 1,5 L. Tekanannya menjadi …',
        opsi: ['2 bar', '4,5 bar', '3 bar', '1,5 bar'],
        bahas: 'P₂ = P₁V₁ ÷ V₂ = 3 × 1 ÷ 1,5 = 2 bar. Volume naik, tekanan turun.' },
      { soal: 'Balon yang ditiup lalu dilepas tanpa diikat melesat. Penjelasan yang tepat adalah …',
        opsi: ['udara keluar ke belakang, balon terdorong ke depan', 'balon menjadi lebih ringan dari udara sehingga terbang', 'udara luar menarik balon menuju arah yang berlawanan', 'balon terpantul dari dinding karena udara di sekitarnya'],
        bahas: 'Prinsip aksi–reaksi: udara disemburkan ke belakang (aksi), balon terdorong ke depan (reaksi).' },
      { soal: 'Botol 1,5 L diisi air hampir penuh lalu dipompa 4 bar. Roket meluncur pendek karena …',
        opsi: ['ruang udaranya sempit sehingga tekanan cepat habis', 'air yang banyak membuat tekanan pompa menjadi naik', 'air yang banyak membuat roket terlalu ringan', 'botol berisi air penuh tidak dapat dipompa'],
        bahas: 'Ruang udara kecil: saat air mulai keluar volume udara cepat membesar dan tekanannya cepat turun (Boyle); roket juga berat.' }
    ]
  }
};
