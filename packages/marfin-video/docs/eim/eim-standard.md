# EIM Standard Bible

Version: 1.0  
Status: Locked foundation for EIM scene generation  
Purpose: Menjadi sumber kebenaran utama (source of truth) untuk semua scene EIM agar kualitas visual, struktur layer, motion, dan output ZIP tetap konsisten.

---

## 1. Definition

**EIM (Editorial Infographic Motion)** adalah style motion graphic vertikal editorial dengan DNA berikut:

- format vertikal editorial
- background dominan cream / off-white
- tipografi navy + accent vivid blue
- komposisi rapi, modern, high-end, premium
- text dan shape harus editable
- hero visual dibangun dari asset clean terpisah, bukan flatten poster
- semua scene harus installable ke Remotion sebagai scene pack

---

## 2. Global Technical Standard

### 2.1 Canvas
- Resolution: **1080 × 1920**
- Orientation: **Vertical / 9:16**
- FPS: **30**
- Total video target: **10 detik**
- Durasi scene target: default **~1 detik efektif per frame konsep**, namun implementasi bisa overlap secara motion

### 2.2 Remotion Rules
- Semua scene harus berbasis **React + Remotion + TypeScript**
- Semua typography harus **native text**, bukan raster text
- Semua shape utama harus **SVG / CSS / native vector** jika memungkinkan
- Semua asset image harus dipisah dan dipanggil via `staticFile()` / public assets
- Setiap scene harus punya file:
  - `Video.tsx`
  - `geometry.ts`
  - `motion.ts`
- Output harus bisa di-install tanpa merusak scene lain

---

## 3. Visual DNA

### 3.1 Core Mood
- premium editorial
- clean infographic
- modern institutional / fintech-grade polish
- high readability
- minimal namun berkarakter

### 3.2 Background
- Dominan **cream / warm off-white**
- Hindari background ramai
- Outer frame boleh dipakai jika scene memang membutuhkannya, tetapi default sekarang adalah **clean full cream** kecuali dinyatakan lain di scene spec

### 3.3 Color System
Color palette inti:

- Background cream: `#F7F4EC` atau ekuivalen hangat lembut
- Primary navy: `#163B6E`
- Accent blue: `#1D4DFF` sampai `#2F62F1`
- Secondary pale blue: `#DCE8F8` / `#E5ECF5`
- Muted supporting blue-gray: `#55749A` / `#5E7391`

Aturan:
- Navy untuk body/subheading/micro info
- Vivid blue untuk kata kunci utama / hero emphasis / lingkaran aksen / garis utama
- Jangan menambah banyak warna lain tanpa alasan konsep yang kuat

### 3.4 Typography
Karakter tipografi EIM:
- sans-serif modern
- kuat, tegas, editorial
- clean dan highly readable
- condense/heavy feel untuk headline besar

Hierarchy minimum:
1. **Hero Headline** – sangat besar, heavy, dominant
2. **Display / Key Word** – besar, bold, biasanya vivid blue
3. **Subheadline** – sedang, navy, 1–3 baris
4. **Support Label** – kecil, uppercase, tracking lebar
5. **Caption / body mini** – kecil, readable, jangan terlalu padat

Aturan:
- semua text editable
- jangan rasterize text
- hindari terlalu banyak gaya font dalam satu scene
- maksimal 2–3 level emphasis visual per scene

### 3.5 Graphic Motifs
Motif yang diizinkan / direkomendasikan:
- lingkaran besar / orbital circle
- garis kurva editorial
- node dots
- timeline path
- underline / short rule line
- light texture / cloud atmosphere
- rounded card / frame bila dibutuhkan

### 3.6 Photo / Cutout Treatment
- asset hero harus clean, background terpisah
- cutout harus rapi, tidak membawa background asing
- tonality bisa grayscale / blue-tinted / neutral, sesuai scene spec
- jangan flatten hero + text dalam satu file
- awan / texture / atmosphere dipisah jika digunakan

---

## 4. Layout System

### 4.1 General Composition Principles
- komposisi asymmetrical tetapi seimbang
- hierarchy harus langsung terbaca dalam 1 detik
- ada area kosong / negative space yang cukup
- jangan terlalu penuh / numpuk
- elemen penting harus memiliki breathing room

### 4.2 Safe Area
Default safe area:
- horizontal padding: **~72 px**
- top padding: **~72–90 px**
- bottom padding: **~72 px**

Catatan:
- geometry final scene boleh sedikit menyesuaikan, tetapi tetap mengikuti spirit spacing yang konsisten

### 4.3 Layer Principle
Semua scene harus dipecah menjadi layer fungsional.

Contoh:
- background
- circle
- hero cutout
- cloud layer
- headline text
- subheadline text
- micro label
- graph path
- nodes

Rule:
- **1 layer = 1 tanggung jawab visual**
- jangan gabungkan banyak fungsi ke satu asset bila bisa dipisah

---

## 5. Motion DNA

### 5.1 Core Rule
- Motion utama harus **selesai maksimal di detik 2**
- Setelah detik 2, scene harus **settle dan readable**
- Boleh ada subtle hold, tetapi **tidak boleh ada drifting random yang mengganggu**

### 5.2 Motion Character
Karakter motion EIM:
- dramatic tapi tetap clean
- editorial, bukan chaotic
- precision > gimmick
- rhythm tegas
- readable at a glance

### 5.3 Preferred Motion Types
Motion yang direkomendasikan:
- fade in
- rise in
- slide in
- scale in / punch in
- wipe reveal
- line draw
- node pop
- image lift
- match motion antar scene

### 5.4 Motion Rules per Element Type
- headline: stagger / slide / reveal
- subheadline: rise / fade setelah headline
- hero image: rise / scale / slight rotate settle
- curve/timeline: draw on
- nodes: pop after line draw
- cloud: soft reveal
- circle: punch-in / scale settle
- footer/header micro element: subtle fade/slide only

### 5.5 Motion Timing Standard
Target umum:
- 0.00–0.50 s: base graphic masuk
- 0.30–1.20 s: hero + main headline build
- 0.80–1.80 s: support text / graph reveal
- <= 2.00 s: semua sudah final / readable

---

## 6. Editability Rules

Scene dianggap valid hanya jika:
- text editable
- shape editable
- hero image terpisah dari accent/background
- posisi dan ukuran utama berada di `geometry.ts`
- parameter timing dan motion utama berada di `motion.ts`
- scene bisa di-adjust tanpa bongkar seluruh kode

---

## 7. Output Contract

Setiap scene pack wajib punya format minimal:

```text
scene-xx-eim-pack/
│
├── install.ps1
├── README.md
├── preview.png
├── scene-spec.json (optional but recommended)
│
├── public/generated/<scene-id>/
│   ├── hero.png
│   ├── cloud.png
│   ├── texture.png
│   └── etc...
│
└── src/generated/<scene-id>/
    ├── Video.tsx
    ├── geometry.ts
    ├── motion.ts
    └── index.ts (optional)
```

Installer rules:
- tidak merusak scene lama
- backup file penting sebelum patch
- register composition secara aman

---

## 8. Scene Development Workflow

### Phase 1 — Planning
1. Tentukan fungsi naratif scene
2. Isi scene spec
3. Lock text on screen
4. Lock asset list

### Phase 2 — Asset Preparation
5. Generate / siapkan clean asset
6. Pastikan tiap asset terpisah sesuai fungsi
7. Simpan di folder public scene

### Phase 3 — Build
8. Buat geometry.ts
9. Buat motion.ts
10. Bangun Video.tsx dengan layered structure
11. Wrap layer dengan `Sequence` bernama jelas

### Phase 4 — QC
12. Install ke Remotion
13. Cek readability
14. Cek acceptance checklist
15. Minor tuning only

---

## 9. What Is Not Allowed

- flatten poster final sebagai satu image utama
- text penting dalam bentuk raster image
- motion belum settle sampai > 2 detik, kecuali scene spec menyatakan beda
- color palette liar di luar DNA EIM
- layout terlalu padat hingga hierarchy kabur
- asset hero bercampur background yang tidak bisa diedit
- tuning liar tanpa scene spec / standard reference

---

## 10. Source of Truth Priority

Jika terjadi konflik, prioritas keputusan:
1. Approved scene pack terbaru
2. Scene spec scene terkait
3. EIM Standard Bible
4. Motion/token presets
5. improvisasi minimal

---

## 11. Immediate Gold Standard

Untuk fondasi saat ini:
- Scene 1 approved → referensi motion/editorial cleanliness
- Scene 2 V13+ → referensi clean asset separation + layered motion structure

Semua scene berikutnya harus meniru **sistemnya**, bukan sekadar tampilannya.
