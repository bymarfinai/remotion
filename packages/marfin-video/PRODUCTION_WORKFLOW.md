# Mandatory Motion Production Workflow

Status: **MANDATORY**

Workflow ini wajib dipakai untuk produksi motion video baru di `packages/marfin-video`.

## 1. Brief
User memberi perintah / topik video.

Contoh:
> Bikinin video motion tentang XXX.

## 2. Storyboard
Analisa brief lalu generate storyboard terlebih dahulu.

Output tahap ini:
- alur cerita
- jumlah scene
- isi tiap scene
- copy/headline utama
- arah visual tiap scene

**Jangan coding final, jangan bikin ZIP, jangan generate clean assets dulu.**

Lanjut hanya setelah user approve storyboard.

## 3. Scene Preview
Generate preview masing-masing scene berdasarkan storyboard yang sudah di-approve.

Tujuan:
- lock look & feel
- lock layout
- lock visual hierarchy
- lock arah desain tiap scene

Lanjut hanya setelah user approve scene preview.

## 4. Asset Breakdown
Analisa setiap scene untuk menentukan semua elemen yang dibutuhkan.

Pisahkan menjadi:
- native text
- native shape / SVG / CSS
- clean image asset
- atmosphere / texture / cutout bila perlu

Output harus menjawab dengan jelas:
> Clean asset apa saja yang perlu digenerate?

Lanjut hanya setelah user approve breakdown.

## 5. Clean Asset Generation
Generate clean assets berdasarkan breakdown yang sudah di-approve.

Rules:
- asset terpisah
- background transparan jika memang perlu compositing
- tidak membawa text / shape lain yang seharusnya editable
- user harus bisa review asset satu per satu

Lanjut hanya setelah user approve clean assets.

## 6. Production Pack
Setelah clean assets approved, baru susun production pack / ZIP.

Pack minimal berisi:
- source Remotion
- assets
- geometry / motion config bila diperlukan
- file pendukung
- langkah install yang jelas

## 7. Mandatory Motion Rules
Semua production pack wajib mengikuti aturan berikut:

- **Main motion selesai maksimal di detik ke-2**
- Motion harus terasa **cinematic**
- Semua asset utama harus **terpisah di timeline**
- Jangan flatten seluruh scene menjadi satu image/layer
- Text utama harus editable
- Shape utama harus native/editable bila memungkinkan

## Approval Gate
Urutan approval wajib:

```text
BRIEF
  ↓
STORYBOARD
  ↓ approve
SCENE PREVIEW
  ↓ approve
ASSET BREAKDOWN
  ↓ approve
CLEAN ASSETS
  ↓ approve
ZIP / INSTALL
```

**Tidak boleh melompati approval gate tanpa instruksi eksplisit dari user.**
