# EIM Acceptance Checklist

Version: 1.0  
Purpose: Checklist QC sebelum scene EIM dianggap selesai / approved.

---

## A. Narrative & Copy

- [ ] Fungsi naratif scene jelas
- [ ] On-screen copy sudah final
- [ ] Ejaan benar
- [ ] Line break sengaja dan rapi
- [ ] Headline utama langsung terbaca
- [ ] Tidak ada text yang membingungkan / terlalu kecil untuk fungsi utamanya

---

## B. Visual Consistency

- [ ] Background sesuai DNA EIM (umumnya cream / off-white)
- [ ] Warna utama mengikuti palette EIM
- [ ] Accent blue konsisten
- [ ] Navy digunakan dengan benar
- [ ] Style sesuai approved EIM scenes
- [ ] Tidak ada elemen visual liar di luar standard

---

## C. Layout & Hierarchy

- [ ] Hierarchy visual jelas dalam 1 detik pertama
- [ ] Ada 1–2 focal point utama, tidak berantakan
- [ ] Negative space cukup
- [ ] Margin dan padding aman
- [ ] Text tidak terlalu mepet ke tepi
- [ ] Komposisi terasa seimbang
- [ ] Tidak ada elemen penting yang bertabrakan
- [ ] Readability baik pada ukuran preview normal

---

## D. Asset Quality

- [ ] Semua asset utama clean
- [ ] Hero cutout rapi
- [ ] Tidak ada background asing yang terbawa
- [ ] Cloud / texture / atmosphere clean
- [ ] Asset sesuai treatment yang diinginkan (neutral / grayscale / blue-tinted)
- [ ] Resolusi asset cukup tinggi

---

## E. Editability

- [ ] Semua text penting editable
- [ ] Semua shape penting editable
- [ ] Asset hero terpisah dari background/shape lain
- [ ] Layer sudah dipisah berdasarkan fungsi
- [ ] Tidak ada flatten poster utama
- [ ] `geometry.ts` tersedia
- [ ] `motion.ts` tersedia

---

## F. Timeline & Layer Structure

- [ ] Layer besar punya `Sequence` bernama jelas
- [ ] Struktur layer terbaca di timeline
- [ ] Tidak semua elemen tertumpuk tanpa penamaan
- [ ] Timeline mudah dipahami untuk editing berikutnya
- [ ] Layer naming rapi dan konsisten

Contoh naming yang baik:
- `01 — Blue Circle`
- `02 — Clouds`
- `03 — Monas`
- `04 — Headline`
- `05 — Subtitle`

---

## G. Motion Quality

- [ ] Motion utama mulai dengan tegas
- [ ] Motion terasa editorial / premium
- [ ] Motion tidak chaotic
- [ ] Motion tidak terlalu pelan
- [ ] Motion selesai maksimal **detik ke-2**
- [ ] Setelah 2 detik scene settle
- [ ] Tidak ada drift random yang mengganggu
- [ ] Urutan reveal logis
- [ ] Fokus penonton diarahkan dengan baik
- [ ] Hero motion cukup dramatis bila dibutuhkan

---

## H. Technical Quality

- [ ] Composition terdaftar di Remotion
- [ ] Scene bisa dibuka di Studio
- [ ] Tidak ada asset path yang rusak
- [ ] Tidak ada import error
- [ ] Tidak ada text cropped
- [ ] Tidak ada layer hilang
- [ ] Preview render berjalan normal

---

## I. ZIP / Pack Quality

- [ ] Pack punya `install.ps1`
- [ ] Pack punya `README.md`
- [ ] Asset masuk ke folder public yang benar
- [ ] Source masuk ke folder src yang benar
- [ ] Installer tidak merusak scene lama
- [ ] Installer punya backup bila patch file penting
- [ ] Struktur pack rapi dan bisa dipakai ulang

---

## J. Final Approval Gate

Scene hanya dianggap **APPROVED** jika semua kondisi berikut terpenuhi:

- [ ] style sesuai standard EIM
- [ ] copy final locked
- [ ] asset clean
- [ ] editable
- [ ] motion selesai <= 2 detik
- [ ] layer structure jelas
- [ ] installable pack valid
- [ ] hanya butuh minor tuning, bukan rebuild besar

---

## K. Approval Summary Template

Gunakan ringkasan ini setelah review:

```text
Scene ID:

Status:
Approved / Revisi Minor / Revisi Mayor

Strengths:
-
-
-

Issues:
-
-
-

Required Fixes:
-
-
-

Final Decision:
```
