# EIM Scene Spec Template

Version: 1.0  
Purpose: Template wajib yang harus diisi sebelum generate scene pack EIM baru.

---

## 1. Basic Information

- **Project Name:**
- **Scene ID:**
- **Scene Number / Page Label:**
- **Working Title:**
- **Status:** Draft / Locked / Approved
- **Reference Scene(s):**

---

## 2. Narrative Function

### 2.1 Purpose of the Scene
Jelaskan fungsi naratif scene ini dalam 1–3 kalimat.

Contoh:
- membuka pertanyaan utama
- memperkenalkan simbol utama
- mem-breakdown 3 komponen konsep
- menunjukkan perjalanan lintas waktu
- menutup dengan statement kuat

### 2.2 Viewer Takeaway
Kalau penonton hanya melihat scene ini 2–3 detik, apa pesan utama yang harus langsung ditangkap?

---

## 3. On-Screen Copy

### 3.1 Hero Headline
Tuliskan teks utama yang paling dominan.

### 3.2 Secondary / Supporting Text
Tuliskan subheadline atau supporting copy.

### 3.3 Micro Labels / Footer / Header
Tuliskan semua text kecil jika memang dipakai.

### 3.4 Exact Copy Lock
Pastikan ejaan, line break, huruf besar-kecil, dan tanda baca sudah final.

Contoh format:

```text
Headline:
SYMBOL

Subheadline:
can hold
 a whole city.
```

---

## 4. Visual Hierarchy

Urutkan elemen dari yang paling penting sampai paling kecil.

Contoh:
1. hero keyword
2. hero image
3. subheadline
4. graphic anchor
5. support labels

Catatan:
- maksimal 1–2 focal points utama
- hierarchy harus jelas dalam 1 detik pertama

---

## 5. Layout Plan

### 5.1 Layout Type
Pilih salah satu atau deskripsikan:
- left-text / right-hero
- top-text / bottom-hero
- timeline
- orbital infographic
- centered statement
- split composition

### 5.2 Composition Notes
Jelaskan penempatan kasar elemen.

Contoh:
- headline di kiri atas
- hero di kanan bawah
- lingkaran besar di belakang hero
- support labels di kiri bawah

### 5.3 Safe Area Notes
Catatan khusus jika ada area yang tidak boleh terlalu penuh atau terlalu mepet.

---

## 6. Required Assets

Daftar semua asset yang dibutuhkan. Pisahkan antara asset image vs native element.

### 6.1 Native Elements
Contoh:
- background cream
- curve line
- nodes
- text headline
- footer rule

### 6.2 Generated / Imported Assets
Contoh:
- hero cutout Monas
- cloud overlay
- skyline cutout
- crowd photo cutout

### 6.3 Asset Treatment
Untuk setiap asset, tentukan treatment:
- transparent PNG/WebP
- grayscale
- blue-tinted
- neutral tone
- soft opacity

---

## 7. Layer Breakdown Plan

List semua layer yang harus ada.

Contoh format:

```text
01 Background
02 Blue Circle
03 Cloud Layer
04 Hero Cutout
05 Headline A
06 Headline SYMBOL
07 Subtitle
08 Support Labels
```

Aturan:
- satu layer satu fungsi
- jangan mencampur text penting dengan image lain

---

## 8. Motion Plan

### 8.1 Motion Goal
Apa rasa motion yang ingin dicapai?

Contoh:
- dramatic hero reveal
- precise infographic build
- timeline draw then settle
- emotional closing statement

### 8.2 Motion Sequence Order
Tentukan urutan masuk layer.

Contoh:
1. circle
2. cloud
3. hero image
4. headline
5. subheadline
6. labels

### 8.3 Motion Type per Layer
Contoh:
- circle → scale in + slide
- hero → rise + slight rotate settle
- line → draw on
- nodes → pop
- headline → stagger left slide
- subtitle → fade rise

### 8.4 Timing Lock
Aturan standar:
- seluruh entrance selesai <= **2.0 detik**
- setelah itu hold / readability

Isi nilai spesifik bila perlu:
- first reveal start:
- hero settle frame:
- all settled by frame:

---

## 9. Technical Build Rules

- Resolution: 1080x1920
- FPS: 30
- Scene built in Remotion TSX
- All text editable
- Geometry centralized in `geometry.ts`
- Motion centralized in `motion.ts`
- Named `Sequence` layers mandatory

---

## 10. Acceptance Criteria

Isi kriteria scene dianggap lolos.

Contoh:
- hierarchy langsung terbaca
- motion selesai <= 2 detik
- text tidak kepotong
- hero clean
- style konsisten dengan EIM
- ZIP installable

---

## 11. Handoff to Generator / GPT

Berikut format instruksi siap pakai:

```text
Gunakan EIM Standard Bible sebagai source of truth.
Buat scene pack untuk Scene [ID] berdasarkan spec ini.
Semua text harus editable.
Semua layout harus mengikuti hierarchy dan layout plan.
Motion utama selesai maksimal di detik 2.
Output harus berupa pack installable berisi asset, Video.tsx, geometry.ts, motion.ts, README, dan install.ps1.
Jangan flatten poster menjadi satu gambar.
```

---

# Example Filled Summary Block

Gunakan blok ringkas ini untuk briefing cepat:

```text
Scene ID:
03

Purpose:
Menjelaskan bahwa simbol kota menyatukan PLACE, PEOPLE, dan PURPOSE.

Headline:
It brings together
PLACE
PEOPLE
PURPOSE

Supporting labels:
PLACE — A CAPITAL CITY
PEOPLE — A SHARED STORY
PURPOSE — A BRIGHTER TOMORROW

Layout:
Headline di kiri, garis kurva besar di kanan, tiga node info stagger vertikal.

Assets:
Tidak perlu hero foto utama. Fokus ke line, node, text.

Motion:
Curve draw → node pop → stagger text reveal.
Semua settle <= 2 detik.
```
