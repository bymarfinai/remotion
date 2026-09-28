# Monas EIM Full Composition — Asset Manifest

## Project

- Type: EIM
- Build mechanism: FULL_COMPOSITION
- Storyboard scenes: 7
- Scene duration: 2 seconds each
- Total duration: 14 seconds
- Master raster format: PNG
- Approved asset masters are persisted before moving to the next scene.

## Google Drive Asset Storage

Primary Drive folder:
- Root: `Marfin Video Assets`
  - Folder ID: `1EB-mg1aRn_5w_uFODnhdQSygwIOQEAKR`
- Project: `monas-eim-full-composition`
  - Folder ID: `1WvSppeISCEgjaelIL2wI6d0wB7JyPJMm`
- Scene 01 folder ID: `1EQN5Ise3l2j434jEzqpHf2M2yLy3bGpy`
- Scene 02 folder ID: `1SDSTmeE3qvAwYSH5XF6nscQmjobCi_In`
- Scene 03 folder ID: `1jDYtWg5bI3OyBu3dJwgNJTD67H49tSAH`
- Drive-native manifest Doc ID: `1TfaiwlUtnC2rw3vGSKytz_aC8NbbA0opwDoLffHD5PU`

Storage policy:
- Google Drive is the preferred persistent storage for approved binary assets.
- GitHub is the source of truth for Remotion code, config, workflow docs, and asset references.
- ChatGPT Library remains the verified fallback until each Drive PNG copy is uploaded and checked.
- Do not delete Library masters before Drive verification.
- For VPS/workstation implementation, prefer direct Drive sync; use ZIP only when direct sync is unavailable.

Current binary migration status:
- Drive folder hierarchy: **CREATED**
- Drive-native asset manifest: **CREATED**
- Standalone approved PNG upload to Drive: **PENDING**
- Reason: the current connector cannot directly egress the existing Library-backed image files into Drive.
- Existing Library masters remain the current verified binary source of truth until migration completes.


## Scene 01 — SAVED / APPROVED

Persistent master storage:
`/Marfin Video Assets/monas-eim-full-composition/scene-01/`

Approved files:

- `monas.png`
  - Library file ID: `libfile_6c34a4c740608191a1f036b96d213bc7`
- `skyline-with-treeline.png`
  - Library file ID: `libfile_b1f24998a5188191a7a52d0cfcd2527a`
- `clouds.png`
  - Library file ID: `libfile_44ee91e559bc81918acfc44398794254`
- `foreground-plaza.png`
  - Library file ID: `libfile_02f93827280c81919f2a987c8452d94f`

Additional approved fidelity assets:
- `main-typography.png`
  - Library file ID: `libfile_0ed2f01bbd248191be6d95d71db44f53`
- `support-copy.png`
  - Library file ID: `libfile_fcac09f972548191b450e00cd382dc9d`

Notes:
- Background is full cream and remains native in Remotion.
- No outer blue border.
- Main composition-critical typography is now rasterized as transparent full-canvas artwork to preserve approved scale and placement.
- Header/footer micro-text may remain native.
- Skyline master includes the treeline.
- Monas remains a separate asset for independent motion and continuity.

## Scene 02 — SAVED / APPROVED

Persistent master storage:
`/Marfin Video Assets/monas-eim-full-composition/scene-02/`

Approved files:

- `monas-hero.png`
  - Library file ID: `libfile_16b9f04183648191b41ad022497d0abe`
- `blue-sky-circle.png`
  - Library file ID: `libfile_cd83a3a681a48191a22efe77e02cde5c`
- `bottom-cloud-bank.png`
  - Library file ID: `libfile_ef97ece4fb288191a77514da119e4e96`

Additional approved fidelity assets:
- `main-typography.png`
  - Library file ID: `libfile_f8172940af7481918cc90801f42b2daf`
- `people-history-identity-tomorrow.png`
  - Library file ID: `libfile_367f0be858308191801b10c2a7f779f4`

Notes:
- Scene 2 uses its own generated Monas asset; do not reuse/crop Scene 1 Monas.
- Small header/counter text such as `JAKARTA / INDONESIA` and `02 / 07` may remain native/editable.
- Main composition-critical typography is now rasterized as transparent full-canvas artwork to preserve approved scale and placement.
- The blue sky circle and bottom cloud bank are separate raster layers for independent positioning/motion.

## Scene 03 — SAVED / APPROVED

Persistent master storage:
`/Marfin Video Assets/monas-eim-full-composition/scene-03/`

Approved files:

- `blue-arc-three-nodes.png`
  - Library file ID: `libfile_fff9c63e3d2481919b61a14fb9acf708`

Additional approved fidelity assets:
- `main-typography.png`
  - Library file ID: `libfile_36f7067fa5908191b10e8cd8a46cce39`
- `right-labels.png`
  - Library file ID: `libfile_775e85612314819190997516c8ae677a`

Notes:
- Scene 3 uses a generated raster arc + three-node graphic rather than SVG/CSS for the curve.
- Main composition-critical typography and right-side labels are now transparent raster assets to preserve approved scale and placement.
- Right-side labels retained: `PLACE / A CAPITAL CITY`, `PEOPLE / A SHARED STORY`, `PURPOSE / A BRIGHTER TOMORROW`.
- `JAKARTA / INDONESIA` and `03 / 07` are omitted.
- Background remains full cream and native.

## Handoff Status — Scene 01–03 Prototype

- Package: `monas-eim-fullcomp-scene1-3-handoff.zip`
- Local install target: `D:\\Remotion\\remotion\\packages\\marfin-video`
- User confirmed installer result: `INSTALL COMPLETE`
- Assets installed to: `public\\generated\\monas-eim-full-composition`
- Config installed to: `src\\generated\\monas-eim-full-composition\\project-config.ts`
- Planned composition ID: `Monas-EIM-FullComp-Test-3Scenes`
- Handoff gate: **PASSED**
- Remotion implementation may begin for the explicitly requested Scene 01–03 FULL_COMPOSITION prototype.

## Stage 8 — FULL_COMPOSITION Implementation

Status: **NOT APPROVED — SUPERSEDED BY FIDELITY ASSET CORRECTION**

Composition ID:
`Monas-EIM-FullComp-Test-3Scenes`

Implementation:
`packages/marfin-video/src/generated/monas-eim-full-composition/Video.tsx`

Timeline:

- Scene 01: frames 0–59
- Scene 02: frames 60–119
- Scene 03: frames 120–179
- Total: 180 frames / 6 seconds / 30 fps / 1080×1920

Rules applied:

- Uses only the approved Scene 01–03 assets installed by the handoff package.
- Does not use legacy EIM scene plates.
- Main typography remains native/editable.
- Scene 03 uses the approved raster `blue-arc-three-nodes.png`.
- Scene 03 omits `JAKARTA / INDONESIA` and `03 / 07` per approval.
- This checkpoint contains **layout + one master timeline only**.
- Core motion and transitions are **NOT started yet** and belong to the next stage.

## Fidelity Correction Pass — Typography

Status: **APPROVED / SAVED**

Reason:
- Native React typography did not preserve the exact visual mass, scale, line breaks, and placement of the individually approved generated scenes.
- Composition-critical text is therefore packaged as transparent full-canvas raster artwork.
- This is a fidelity-first hybrid implementation; image/photo layers remain separate, while critical typography groups are rasterized.

Next required checkpoint:
- Build refreshed Scene 01–03 ZIP handoff containing the updated approved typography assets.
- User installs refreshed handoff.
- Rebuild Stage 8 using the updated assets.

## Scene 04

Status: NOT STARTED
