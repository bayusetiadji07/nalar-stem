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

Tips konsistensi Tahap 2: buat semua benda dalam SATU sesi chat AI yang sama, dan minta
"same style, same scale, same lighting as the previous image".
