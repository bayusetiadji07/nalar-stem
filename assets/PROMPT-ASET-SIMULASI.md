# Prompt Aset Simulasi (Laboratorium Maya) — NalarSTEM

Objek yang bentuknya ditentukan angka simulasi (tebal dinding, lapisan saringan, rangka jembatan,
kedalaman celup, lintasan) TETAP digambar kode agar sainsnya akurat. Gambar AI dipakai untuk
**latar belakang** (Tahap 1) dan **benda berbentuk tetap** (Tahap 2).

Simpan ke `assets/img/sim/` dengan nama persis di bawah. Tidak perlu dikecilkan — nanti diolah Claude.

## GAYA SIMULASI (tempel di akhir setiap prompt)
```
Flat vector illustration with soft gradients and subtle grain texture, same style as a friendly Indonesian children's science book, clean rounded shapes, soft light, palette of teal (#0d9488), ocean blue (#0369a1), warm amber (#f59e0b) and cream, calm and uncluttered, no people, no text, no letters, no watermark
```
NEGATIF: `people, characters, text, letters, watermark, logo, busy details, dark, photorealistic, perspective distortion`

---

## TAHAP 1 — Latar belakang (16:9, 1920×1080)
Aturan penting: **bagian tengah dibiarkan kosong** (tempat benda simulasi), tampak samping lurus
(bukan perspektif miring), garis air/tanah **lurus mendatar** di ketinggian yang disebutkan.

### `bg-perahu.jpg` — Perahu (garis air tepat di tengah tinggi gambar)
```
Wide side-view cross-section background: the upper half shows a calm sky at golden hour with a distant flooded coastal village, salt ponds and small houses on the far horizon; the lower half is a clear teal water cross-section seen from the side, with gentle light rays and a few tiny bubbles. The water surface is a perfectly straight horizontal line exactly at the vertical middle of the image. Center area empty for a floating boat.
```

### `bg-penjernih.jpg` — Penjernih air
```
Wide background of a simple outdoor wooden workbench beside a village river, soft green trees and a stone well in the blurred far background, the tabletop is a straight horizontal edge at 85% of the image height. The center of the image is plain and empty for a water filter bottle and a glass.
```

### `bg-pendingin.jpg` — Kotak pendingin (lantai dek di 80% tinggi, matahari di kanan atas)
```
Wide side-view background of the wooden deck of a small Indonesian fishing boat at late afternoon, open sea and a warm sun in the upper right corner, ropes and a lantern at the far edges only, the wooden deck floor is a straight horizontal line at 80% of the image height. Left and center area empty for a cooler box and a chart.
```

### `bg-hidroponik.jpg` — Hidroponik
```
Wide background of a clean indoor school hydroponic room, soft pastel wall with subtle tiles, shelves with small plant pots only at the far left and right edges, a long white table surface as a straight horizontal line at 80% of the image height. Center area empty for a nutrient tank, plants and an LED lamp above.
```

### `bg-lapangan.jpg` — Roket cuka & roket air (tanah rumput di 90% tinggi)
```
Wide side-view background of a sunny school sports field in Indonesia: big blue sky with soft clouds taking most of the image, a flat green grass field as a straight horizontal strip in the bottom 10% of the image, a low school building, trees and a fence far away on the horizon, very small. Sky area empty for a flying bottle rocket.
```

### `bg-jembatan.jpg` — Jembatan (tepian saluran di kiri & kanan)
```
Wide side-view background of an irrigation canal between rice fields: a calm sky and green rice paddies and palm trees on the far horizon, a narrow channel of water along the bottom 12% of the image, the canal banks are only at the extreme left 12% and right 12% edges. The large center area is open sky and distant fields, empty for a model bridge.
```

### `bg-angin.jpg` — Kincir angin (pasir pantai di 90% tinggi)
```
Wide side-view background of a quiet Indonesian beach at sunset: warm gradient sky, the sea horizon as a straight line at 70% of the image height with tiny fishing boats, sandy beach as a flat strip in the bottom 10%. Leave the left and center area empty for a small wind turbine; a simple bamboo night-watch hut (pos ronda) without a lamp at the far right edge only.
```

---

## TAHAP 2 — Benda (latar TRANSPARAN, PNG, 1024×1024, benda di tengah, tampak samping)
Tambahkan: `isolated single object, centered, side view, transparent background, no shadow on the ground`
(Bila alat tidak mendukung transparan, pakai latar putih polos — nanti dihapus.)

| Berkas | Prompt |
|---|---|
| `roket-cuka.png` | a small homemade bottle rocket made from a clear plastic soda bottle pointing straight up, three cardboard fins at the bottom, red paper nose cone on top, a cork at the bottom opening |
| `roket-air.png` | a water rocket made from a 1.5 liter clear plastic soda bottle pointing straight up, three teal plastic fins, orange nose cone, partly filled with blue water |
| `pompa.png` | a bicycle floor pump with a round pressure gauge, standing upright |
| `karung.png` | a small burlap sack of harvest (rice or salt), tied at the top |
| `ikan.png` | a fresh silver-blue sea fish (mackerel), lying sideways facing right |
| `es-batu.png` | a single clear ice cube with soft highlights |
| `ember.png` | a small gray plastic bucket with a handle, filled with sand |
| `lampu-padam.png` | a simple bamboo post lamp holder with an LED bulb that is switched off |
| `lampu-menyala.png` | the same bamboo post lamp holder with the LED bulb glowing warm yellow |
| `bilah-pvc.png` | one curved wind turbine blade cut from white PVC pipe, horizontal, root on the left, tip on the right |
| `bilah-kardus.png` | one flat wind turbine blade cut from brown cardboard, horizontal, root on the left |
| `generator.png` | a small DC motor generator with a shaft, mounted on a short wooden block |
| `sawi-1.png` … `sawi-5.png` | a bok choy (sawi) plant in a white hydroponic net pot with roots visible, growth stage 1 (tiny seedling with 2 leaves) / 2 / 3 / 4 / 5 (large mature plant with many leaves) — buat 5 gambar dengan ukuran pot sama |
| `sawi-layu.png` | the same mature bok choy plant but wilted and yellowish |

---

## TAHAP 3 — Aset "Rancang & Uji" untuk 5 misi terbaru
Kelima misi ini (listrik, magnet, pesawat, optik, bunyi) masih polos. Pakai GAYA SIMULASI yang
sama, 16:9, 1920×1080, tampak samping lurus. **Latar harus kalem & agak pudar di tengah** karena
di atasnya digambar kabel, sinar, dan gelombang tipis yang harus tetap terbaca.

### `bg-listrik.jpg` — Lampu belajar darurat (listrik padam)
```
Wide side-view background of a cozy Indonesian bedroom study corner at dusk during a power outage: dim bluish evening light through a window at the far left edge, a switched-off ceiling lamp and a candle only at the far right edge, a plain soft cream wall filling the large center area, a wooden desk top as a straight horizontal line at 90% of the image height. Very calm, low contrast, center wall completely empty for an electric circuit diagram.
```

### `bg-magnet.jpg` — Derek elektromagnet (meja di 80% tinggi)
```
Wide side-view background of a tidy school science workshop: a pale pegboard wall with a few tools hanging only at the far left and far right edges, a small window with daylight at the upper right, a sturdy wooden workbench top as a straight horizontal line at 80% of the image height. The center area is a plain, softly lit wall, empty for a model crane with a coil.
```

### `bg-tambak.jpg` — Pesawat sederhana di tambak garam (tanah di 92% tinggi)
```
Wide side-view background of traditional Indonesian salt ponds (tambak garam) on the Madura coast on a bright morning: a big pale blue sky filling most of the image, flat shallow salt pans with white salt piles and a small wooden salt shed on the far horizon, very small; the ground is a flat pale earthen dyke as a straight horizontal strip in the bottom 8% of the image. Center area open sky, empty for a lever and pulley system lifting a sack.
```

### `bg-kelas-gelap.jpg` — Proyektor HP (ruang kelas digelapkan)
```
Wide side-view background of an Indonesian classroom with the lights off and curtains closed: very dark navy blue tones, faint outlines of desks and chairs along the bottom edge, a closed curtain with a thin line of daylight at the far left, a plain dark wall on the right third where a picture will be projected. Overall very dark (mostly #0f172a to #1e293b), low detail, horizontal centerline completely empty for light rays.
```

### `bg-pentas.jpg` — Sasando Mini (meja di 72% tinggi)
```
Wide side-view background of an Indonesian school hall prepared for an art performance (pentas seni): a small wooden stage with deep red curtains only at the far left and right edges, warm string lights and batik-pattern bunting along the very top, a soft warm cream backdrop in the center, a wooden table top as a straight horizontal line at 72% of the image height. Warm, festive but uncluttered; center area empty for a string instrument and sound waves.
```

### Benda Tahap 3 (PNG transparan, 1024×1024 — tambahan yang sama seperti Tahap 2)
| Berkas | Prompt |
|---|---|
| `baterai-aa.png` | a single AA battery lying horizontally, positive terminal on the right, blue and silver label without text |
| `paku.png` | a small iron nail lying horizontally, gray metal, head on the left |
| `klip.png` | a single silver metal paper clip, flat, horizontal |
| `kaleng-alu.png` | a small crumpled piece of a silver aluminium soda can, flat |
| `hp-layar.png` | a modern smartphone lying horizontally, seen from the side-front, screen glowing with a colorful simple picture of the solar system |
| `botol-beban.png` | a 1.5 liter clear plastic water bottle filled with water, hanging upside-down from a string tied at its neck |
| `sasando.png` | a traditional sasando musical instrument from Rote, East Nusa Tenggara: bamboo tube with strings surrounded by a fan-shaped dried lontar palm leaf resonator, standing upright |
| `piala.png` | a small golden trophy with a star on top (dipakai saat semua kriteria terpenuhi) |

---

## TAHAP 4 — Aset "Rancang & Uji" untuk 9 misi masalah sehari-hari (misi 15–23)
Pakai GAYA SIMULASI yang sama. Latar: 16:9, 1920×1080, tampak samping lurus, **tanpa matahari dan
tanpa awan besar** (matahari/awan/cuaca digambar kode sesuai pilihan murid), **bagian tengah kosong
dan agak pudar** karena di atasnya digambar alat, panah, angka, dan bilah hasil.

### Latar belakang
#### `bg-jemur-pantai.jpg` — Pengering ikan asin (pasir di 88% tinggi)
```
Wide side-view background of a quiet fishing village beach in East Java at midday: clear pale blue sky with no sun and no clouds, the sea horizon as a straight line at 60% of the image height with tiny fishing boats, a few palm trees and traditional bamboo fish-drying racks only at the far left and far right edges, flat light sand as a straight horizontal strip from 88% of the image height to the bottom. The large center area is empty and calm for a solar dryer box.
```

#### `bg-tambak-garam.jpg` — Panen garam (tanah pematang di 84% tinggi)
```
Wide side-view background of coastal salt ponds in the dry season: very pale blue sky with no sun and no clouds filling the upper 55%, a far horizon at 55% with tiny salt storage huts, a small windmill and distant white salt piles, then wide flat shallow salt pans in soft perspective, and a pale earthen dyke as a straight horizontal strip from 84% of the image height to the bottom. Center area calm and low-contrast for a cross-section of a salt pan.
```

#### `bg-lab-sekolah.jpg` — Detektor boraks (meja di 62% tinggi)
```
Wide side-view background of a clean school science laboratory: a soft pale mint wall, a window with daylight at the far upper left, shelves with a few glass jars and a microscope only at the far right edge, a white lab bench top as a straight horizontal line at 62% of the image height, the bench front panel below in light grey. Center wall above the bench completely empty and softly lit for four test strips and sample bowls.
```

#### `bg-teras-teduh.jpg` dan `bg-halaman-terik.jpg` — Perangkap nyamuk (lantai di 88% tinggi)
```
(1) bg-teras-teduh: Wide side-view background of a shady corner of an Indonesian school veranda: cool green-tinted shade from a large tree canopy at the upper left, a damp tiled wall, potted plants and a closed water drum only at the far left and right edges, a tiled floor as a straight horizontal strip from 88% of the image height to the bottom. Calm, slightly dim, center empty for a bottle trap.
(2) bg-halaman-terik: The same school veranda corner but in harsh bright sunlight: warm yellow light, no tree shade, bright wall, the same floor line at 88% of the image height, center empty.
```

#### `bg-sudut-kompos.jpg` — Kompos (tanah di 89% tinggi)
```
Wide side-view background of a tidy corner behind an Indonesian school canteen: a light cream wall with a small window at the far left, a few potted plants and a broom only at the far right edge, brown earth ground as a straight horizontal strip from 89% of the image height to the bottom. Center area plain and empty for a compost container and a thermometer.
```

#### `bg-halaman-sekolah.jpg` — Ruang kelas sejuk (rumput di 89% tinggi)
```
Wide side-view background of an Indonesian junior high schoolyard at noon: pale blue sky with no sun and no clouds, a distant row of low school buildings and a flagpole very small on the horizon, a flat green grass strip from 89% of the image height to the bottom. The large center area is empty sky for a cross-section of a classroom building.
```

#### `bg-kebun-kemarau.jpg` — Penyiram tetes (tanah di 86% tinggi)
```
Wide side-view background of a school vegetable garden in the dry season: warm pale sky with no sun, distant dry rice fields and a few trees on the horizon, a low bamboo fence only at the far right edge, dry cracked brown soil as a straight horizontal strip from 86% of the image height to the bottom. Center and left areas empty for a raised water container, a hose and a row of potted plants.
```

#### `bg-pesisir-langit.jpg` — Sabuk mangrove (cakrawala di 55% tinggi)
```
Wide side-view background of an East Java coastline sky: soft afternoon sky with no sun, a distant green headland and tiny fishing boats on the horizon, the sea horizon as a perfectly straight line at 55% of the image height; below 55% only plain flat teal water with no waves (waves, mangroves and the shore will be drawn on top). Very calm and low contrast.
```

#### `bg-dapur-tempe.jpg` — Tempe (meja di 88% tinggi)
```
Wide side-view background of a clean small home tempeh kitchen: a warm cream tiled wall, a window with soft daylight at the far left, a steaming pot on a stove and bamboo trays only at the far right edge, a wooden table top as a straight horizontal line at 88% of the image height. Center wall empty and softly lit for a sliced tempeh block and a thermometer.
```

### Benda Tahap 4 (PNG transparan, 1024×1024 — tambahan yang sama seperti Tahap 2)
| Berkas | Prompt |
|---|---|
| `ikan-asin.png` | a dried salted fish, flat and golden-brown with visible salt crystals, lying sideways facing right (same size and pose as `ikan.png`) |
| `lalat.png` | a small house fly seen from above with transparent wings, simple and not scary |
| `tumpukan-garam.png` | a neat small pile of clean sparkling white salt crystals |
| `tumpukan-garam-kusam.png` | the same pile of salt but greyish brown and mixed with mud specks |
| `mangkuk-kerupuk.png` | a small white ceramic bowl seen from the side holding a few Indonesian crackers (kerupuk) |
| `mangkuk-bakso.png` | the same small white bowl holding three meatballs (bakso) |
| `nyamuk-aedes.png` | a single Aedes mosquito seen from the side, black body with white stripes on its legs, slender wings, simple and friendly, not scary |
| `cacing.png` | a single pink earthworm, gently curved, friendly |
| `daun-kering.png` | a small pile of dry brown fallen leaves |
| `sisa-sayur.png` | a small pile of vegetable scraps and fruit peels (green leaves, carrot peel, banana peel) |
| `pohon-peneduh.png` | a rounded shade tree (such as a ketapang tree) with a full green canopy and a straight trunk, standing upright |
| `tanaman-cabai.png` | a healthy chili plant with green leaves and a few red chilies in a small black polybag pot |
| `tanaman-cabai-layu.png` | the same chili plant in the same pot but wilted, droopy and yellowish |
| `pohon-bakau.png` | a young Rhizophora mangrove (bakau) tree standing upright with arching stilt roots at the base |
| `pohon-apiapi.png` | a young Avicennia mangrove (api-api) tree standing upright with many short pencil-like breathing roots sticking up around the base |
| `rumah-nelayan.png` | a small wooden Indonesian fisherman's house on short stilts with a red tiled roof, side view |

Setelah ditempel ke `assets/img/sim/`, bilang "sudah" — Claude akan mengecilkan, menghapus latar
putih bila perlu, lalu memasangnya ke simulasi dengan garis meja/tanah yang pas.

Tips konsistensi Tahap 2: buat semua benda dalam SATU sesi chat AI yang sama, dan minta
"same style, same scale, same lighting as the previous image".
