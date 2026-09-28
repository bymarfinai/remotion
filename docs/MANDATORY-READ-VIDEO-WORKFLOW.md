# MANDATORY READ — Global Video Development Workflow

This file MUST be read before any Marfin video work begins. It defines the mandatory production workflow for Marfin video projects.

The workflow is global. **EIM** and **KEC** are video types, not separate workflows.

---

## 1. Required project definition

Before production starts, every project must define:

### Video Type

- `EIM` — Editorial Infographic Motion
- `KEC` — Kinetic Editorial Collage

The Video Type defines the visual language and style rules.

### Build Mechanism

Choose exactly one:

- `PER_SCENE`
- `FULL_COMPOSITION`

The Build Mechanism defines how the approved scenes are implemented and assembled in Remotion.

It does **not** change the mandatory scene-preparation loop.

---

## 2. Mandatory global pipeline

Every project follows this sequence:

```text
Brief
↓
Select Video Type
↓
Select Build Mechanism
↓
Full Storyboard
↓
Storyboard Approval
↓
Prepare Scene 1
↓
Prepare Scene 2
↓
Prepare Scene 3
↓
...
↓
All Scenes Prepared
↓
Remotion Implementation using selected Build Mechanism
↓
Motion
↓
Polish
↓
Final Approval
↓
Final Render
```

### Full Storyboard is mandatory

Both build mechanisms start from one complete storyboard for the entire video.

The Full Storyboard is the master visual reference.

Do not create the storyboard one scene at a time during production.

### Approval rule

Approval gates are mandatory.

```text
NOT APPROVED = DO NOT CONTINUE
```

Do not move to the next required stage while the current stage is still under review.

---

# 3. Mandatory Scene-Preparation Loop — SAME FOR BOTH MECHANISMS

After Full Storyboard approval, production proceeds **one scene at a time**, in storyboard order.

For every scene:

```text
Generate Scene
↓
Approval
↓
Asset Breakdown
↓
Approval
↓
Generate Clean Assets
↓
Approval
↓
SAVE Approved Assets to Repo
↓
Update Asset Manifest
↓
Move to Next Scene
```

Example:

```text
SCENE 1

Generate Scene 1
↓
Approval
↓
Asset Breakdown Scene 1
↓
Approval
↓
Generate Clean Assets Scene 1
↓
Approval
↓
SAVE Scene 1 Approved Assets
↓
Update Asset Manifest

THEN

SCENE 2

Generate Scene 2
↓
Approval
↓
Asset Breakdown Scene 2
↓
Approval
↓
Generate Clean Assets Scene 2
↓
Approval
↓
SAVE Scene 2 Approved Assets
↓
Update Asset Manifest

THEN

SCENE 3
...
```

Repeat until every storyboard scene is complete.

## Hard rules

- **Do not generate all scenes as one visual batch.**
- **Do not perform one full-video asset breakdown before individual scene approval.**
- Scene generation must be approved before that scene's asset breakdown.
- Asset breakdown must be approved before that scene's clean assets are generated.
- Clean assets must be approved before SAVE.
- SAVE is mandatory before moving to the next scene.
- Approved raster assets must be persisted to the repository, not left only in a temporary chat/workspace location.
- ChatGPT generates the scene visual and the clean assets.
- The user reviews and approves at each required approval gate.

Only after all scenes have completed this loop does the selected Build Mechanism affect implementation.

## Mandatory SAVE checkpoint

After a scene's clean assets are approved, persist them before moving to the next scene.

Preferred binary path when direct GitHub binary upload is available:

```text
packages/marfin-video/public/generated/<project-slug>/scene-XX/
```

If the active GitHub connector cannot directly commit binary image files, persist the high-resolution PNG masters in ChatGPT Library and record the exact Library path and Library file ID for every asset in the repository `assets-manifest.md`. Temporary `/mnt/data` files do not count as SAVE.

Example:

```text
packages/marfin-video/public/generated/monas-eim-full-composition/
├── scene-01/
│   ├── monas.png
│   ├── skyline-with-treeline.png
│   ├── clouds.png
│   └── foreground-plaza.png
├── scene-02/
└── assets-manifest.md
```

SAVE rules:

- Master raster assets use **high-resolution PNG**.
- Preserve transparency for cutouts when applicable.
- Do not downscale or recompress the approved master just to reduce file size.
- WebP or other optimized derivatives may be created later, but the PNG master remains the source of truth.
- Update `assets-manifest.md` every time a scene is saved.
- The manifest must record the scene number, exact approved filenames, persistent storage location, and persistent file IDs when Library fallback is used.
- Do not move to the next scene until SAVE and manifest update are complete.

---

# 4. Mandatory Package / ZIP / Handoff Checkpoint

This checkpoint is mandatory **after all scenes required for the current implementation pass are prepared and saved, and before any Remotion implementation begins**.

For a full project, this normally means all storyboard scenes are ready.

For an explicitly approved prototype/test pass, this may be a subset of scenes (for example Scene 1–3), but the subset must still complete the full scene-preparation loop first.

## Required sequence

```text
All Required Scenes Prepared
↓
Verify SAVE + Asset Manifest
↓
Build Handoff Package
↓
Create ZIP
↓
Deliver ZIP to User
↓
User Extracts / Installs ZIP into Local Remotion Workspace
↓
User Confirms Package Is Available Locally
↓
ONLY THEN begin Remotion Implementation
```

## 4.1 Pre-package verification

Before building the ZIP, verify every included scene has:

- approved scene visual,
- approved asset breakdown,
- approved clean assets,
- persistent SAVE completed,
- `assets-manifest.md` updated,
- deterministic filenames,
- native/editable elements clearly identified,
- raster/image masters clearly identified,
- no required asset left only in temporary `/mnt/data`.

If any required scene is incomplete:

```text
DO NOT BUILD ZIP
DO NOT IMPLEMENT
```

## 4.2 ZIP package contents

The handoff ZIP must contain the material needed for local implementation.

Recommended structure:

```text
<project-slug>-handoff/
├── README.md
├── assets-manifest.md
├── install.ps1
├── install.sh
├── assets/
│   ├── scene-01/
│   │   └── approved raster assets
│   ├── scene-02/
│   └── ...
└── src/
    └── generated/
        └── <project-slug>/
            ├── project-config.ts
            ├── storyboard-notes.md
            └── implementation placeholder / scaffold when needed
```

The exact structure may vary, but the package must be self-explanatory and installable.

## 4.3 ZIP content rules

- Include only the **approved** assets for the current pass.
- Preserve high-resolution PNG masters.
- Preserve transparency where applicable.
- Do not substitute low-resolution previews for approved masters.
- Do not flatten editable text or simple shapes into raster unless the approved asset breakdown explicitly requires it.
- Include a copy of the current `assets-manifest.md`.
- Include a `README.md` stating:
  - project slug,
  - Video Type,
  - Build Mechanism,
  - included scenes,
  - resolution,
  - FPS,
  - timing,
  - destination paths,
  - install steps,
  - composition ID planned for implementation.
- Prefer an installer script so the user does not need to manually copy many files.

## 4.4 Delivery rule

Creating a ZIP is not enough.

The ZIP must be explicitly handed to the user as a downloadable artifact.

Required sequence:

```text
Create ZIP
↓
Provide ZIP download link
↓
User downloads/extracts or installs it
↓
User confirms local package is ready
↓
Proceed
```

Do not silently create implementation code in the repository and call the handoff complete.

## 4.5 Local install / extraction checkpoint

The user should normally extract/install the ZIP into the local Remotion workspace before implementation begins.

Typical local workspace:

```text
D:\Remotion\remotion\packages\marfin-video
```

If the ZIP includes `install.ps1`, the preferred Windows flow is:

```powershell
cd <extracted-zip-folder>
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

The installer should:

1. verify the target repo/package exists,
2. back up files that will be modified when appropriate,
3. copy approved assets into deterministic local paths,
4. copy or patch source scaffolding if included,
5. avoid deleting unrelated existing work,
6. print the composition/package name that is ready to test,
7. stop with a clear error if a required path or file is missing.

## 4.6 Approval / confirmation gate

Implementation may begin only after the user confirms the package is locally available.

```text
ZIP DELIVERED ≠ IMPLEMENTATION APPROVED

USER CONFIRMS LOCAL INSTALL / EXTRACTION
↓
IMPLEMENTATION MAY BEGIN
```

## 4.7 Prototype / partial-scene test rule

A prototype such as a 3-scene FULL_COMPOSITION test is allowed before the remaining scenes are prepared **only when the user explicitly requests the prototype**.

Even then, the sequence is:

```text
Prepare requested subset completely
↓
SAVE subset
↓
Update manifest
↓
Build subset ZIP
↓
Deliver ZIP
↓
User installs/extracts
↓
Build prototype implementation
```

Do not use old scene plates, legacy visuals, or unrelated repo assets as silent substitutes for the newly approved assets unless the user explicitly approves that substitution.

## Hard handoff rule

```text
NO ZIP / HANDOFF CONFIRMATION
= NO REMOTION IMPLEMENTATION
```

This checkpoint exists specifically to prevent implementation from starting before the approved source assets have been transferred into the user's local working environment.


# 5. Build Mechanism A — PER_SCENE

Use `PER_SCENE` when each prepared scene should be implemented and motioned as its own Remotion scene/composition before final integration.

After all required scene preparation is complete **and the mandatory ZIP / handoff / local-install checkpoint is complete**:

```text
Implement Scene 1 in Remotion
↓
Motion Scene 1
↓
Implement Scene 2 in Remotion
↓
Motion Scene 2
↓
Implement Scene 3 in Remotion
↓
Motion Scene 3
↓
...
↓
Integrate All Scenes
↓
Transitions / Match Motion
↓
Polish
↓
Final Approval
↓
Final Render
```

## PER_SCENE rules

- Each scene can be independently previewed and refined.
- Final integration happens after the individual scene implementations are ready.
- Shared transition behavior can be refined during integration.
- Do not skip the common scene-preparation loop defined above.

---

# 6. Build Mechanism B — FULL_COMPOSITION

Use `FULL_COMPOSITION` when all prepared scenes should be implemented directly inside one continuous master Remotion timeline.

The scene preparation is still **one scene at a time**.

After **all scenes** have completed:

`Generate Scene → Approval → Asset Breakdown → Approval → Generate Clean Assets → Approval → SAVE → Update Manifest`

then complete the mandatory ZIP / handoff / local-install checkpoint, and only after user confirmation:

```text
Build One Master Composition
↓
Place All Prepared Scenes on One Timeline
↓
Motion
↓
Match Motion / Transitions
↓
Polish
↓
Final Approval
↓
Final Render
```

Example:

```text
MASTER COMPOSITION

0s ───────────────────────────────────── 14s

Scene 1
      Scene 2
            Scene 3
                  Scene 4
                        Scene 5
                              Scene 6
                                    Scene 7
```

## FULL_COMPOSITION rules

- There is **no "Generate Full Visual Sequence" production step**.
- There is **no "Full Asset Breakdown" step replacing individual scene breakdowns**.
- Generate, approve, break down, and clean each scene individually first.
- After every scene is ready, implement them together in one master composition.
- Prefer shared-object continuity and match motion when appropriate.
- Do not create separate final compositions for every scene unless needed for debugging.

---

# 7. What the two mechanisms actually change

The front half of production is the same:

```text
Full Storyboard
↓
Approval
↓
Scene 1: Generate → Approve → Breakdown → Approve → Clean → Approve → SAVE
↓
Scene 2: Generate → Approve → Breakdown → Approve → Clean → Approve → SAVE
↓
Scene 3: Generate → Approve → Breakdown → Approve → Clean → Approve → SAVE
↓
...
↓
All Scenes Ready
```

Then they diverge:

### PER_SCENE

```text
Build / Motion each scene separately
↓
Integrate
↓
Transitions
```

### FULL_COMPOSITION

```text
Build all prepared scenes directly in one master composition
↓
Motion on one timeline
↓
Match Motion / Transitions
```

This distinction must remain clear.

---

# 8. ChatGPT responsibilities

ChatGPT is responsible for the production work unless the user explicitly chooses otherwise.

This includes:

- generating the visual for the current scene,
- performing asset breakdown for the current approved scene,
- identifying shared versus scene-specific assets,
- generating clean visual assets,
- preparing image assets for use in Remotion,
- identifying which elements must stay native/editable,
- implementing or preparing Remotion code,
- developing motion,
- refining transitions and match motion,
- polishing the final composition.

The user is the reviewer and approver at the required approval gates.

Do not ask the user to manually create an asset that ChatGPT can generate.

---

# 9. Asset rules

## Keep these native and editable whenever possible

```text
Text        → React / HTML
Numbers     → native text
Shapes      → React / CSS / SVG
Circles     → CSS / SVG
Rectangles  → CSS / SVG
Lines       → SVG
Paths       → SVG
Borders     → CSS / SVG
Simple BG   → native shape / CSS
```

## Raster/image assets are appropriate for

```text
Photos
People cutouts
Buildings
Landmarks
Cloud artwork
Textures
Complex illustration artwork
Other genuinely image-based elements
```

## Never flatten the storyboard

Do not turn the entire storyboard or entire scene into one raster image just to reproduce the visual quickly.

The final Remotion implementation must preserve editability wherever reasonably possible.

---

# 10. Motion rules

Motion begins only after the required visual and clean-asset approvals for the relevant scene(s).

Motion may include:

- entrance and exit,
- position,
- scale,
- rotation,
- opacity,
- mask and reveal,
- kinetic typography,
- path animation,
- object movement,
- shared-object transitions,
- match motion.

For continuous motion, prefer:

```text
shared object
↓
object movement / transformation
↓
next visual state
```

over unnecessary:

```text
Scene A
↓
fade out
↓
Scene B
```

when genuine continuity is possible.

---

# 11. Polish

Polish happens after the core motion works.

Typical polish work includes:

- timing,
- easing,
- stagger,
- spacing,
- safe areas,
- overshoot,
- typography refinement,
- transition refinement,
- motion consistency,
- visual consistency.

Do not use the polish stage to silently redesign an already approved concept.

---

# 12. Canonical summary

```text
GLOBAL VIDEO DEVELOPMENT

1. Brief
2. Select Video Type
3. Select Build Mechanism
4. Full Storyboard
5. Storyboard Approval

6. PREPARE EVERY SCENE ONE BY ONE

   Scene 1
   Generate Scene
   ↓
   Approval
   ↓
   Asset Breakdown
   ↓
   Approval
   ↓
   Generate Clean Assets
   ↓
   Approval
   ↓
   SAVE Approved Assets to Repo
   ↓
   Update Asset Manifest

   THEN Scene 2
   SAME LOOP

   THEN Scene 3
   SAME LOOP

   Repeat until all scenes are prepared.

7. PACKAGE / ZIP / HANDOFF

   Verify all required scenes are SAVED
   ↓
   Build Handoff Package
   ↓
   Create ZIP
   ↓
   Give ZIP to User
   ↓
   User Extracts / Installs Locally
   ↓
   User Confirms Local Package Is Ready

8. IMPLEMENT USING SELECTED BUILD MECHANISM


PER_SCENE

Implement / Motion Scene 1
↓
Implement / Motion Scene 2
↓
...
↓
Integration
↓
Transitions / Match Motion
↓
Polish
↓
Final Approval
↓
Render


FULL_COMPOSITION

Build One Master Composition
↓
Place All Prepared Scenes on One Timeline
↓
Motion
↓
Match Motion / Transitions
↓
Polish
↓
Final Approval
↓
Render
```
