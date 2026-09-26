# Global Video Development Workflow

This is the mandatory production workflow for Marfin video projects.

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

The Build Mechanism defines how the approved full storyboard is implemented.

Example:

```text
TYPE: EIM
BUILD: FULL_COMPOSITION
DURATION: 10s
FPS: 30
RESOLUTION: 1920x1080
```

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
Production using the selected Build Mechanism
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

Do not create Scene 1 first and postpone the storyboard for later scenes.

The full storyboard is the master visual reference for the whole production.

### Approval rule

Approval gates are mandatory.

```text
NOT APPROVED = DO NOT CONTINUE
```

Do not silently move to the next stage while the current stage is still under review.

---

# 3. Build Mechanism A — PER_SCENE

Use `PER_SCENE` when individual scenes benefit from being built, checked, and refined separately.

After the Full Storyboard is approved, process every scene using the same required loop.

## Required per-scene loop

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
Implement Scene in Remotion
↓
Motion
```

Then repeat the same loop for the next scene:

```text
Scene 1 loop
↓
Scene 2 loop
↓
Scene 3 loop
↓
...
```

### After all scenes are complete

```text
All Scenes Complete
↓
Integration
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

- The scene-generation step must be approved before asset breakdown.
- Asset breakdown must be approved before clean asset generation.
- Clean assets must be approved before implementation proceeds.
- Do not replace the approval loop with a one-shot automatic pipeline.
- Do not move to the next scene before the required approvals for the current scene are complete.

---

# 4. Build Mechanism B — FULL_COMPOSITION

Use `FULL_COMPOSITION` when the whole video is better implemented as one continuous master timeline.

This is especially useful when:

- elements repeat across scenes,
- shared objects carry motion between scenes,
- transitions depend on continuity,
- match motion is important,
- the video is short enough to manage comfortably as one composition.

After Full Storyboard approval:

```text
Full Asset Breakdown
↓
Approval
↓
Generate All Clean Assets
↓
Approval
↓
Build One Master Composition
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

Example master timeline:

```text
0s ─────────────────────────────── 10s

Scene 1
      Scene 2
            Scene 3
                  Scene 4
                        Scene 5
```

The scenes remain useful visual and timing sections, but the final implementation lives in one master Remotion composition.

## FULL_COMPOSITION rules

- Do not create separate final Remotion compositions for every scene unless there is a specific debugging need.
- Identify shared assets and shared visual objects during the full asset breakdown.
- Prefer real object continuity and match motion over fake continuity created only with fades.
- Build the video as one timeline from the start of implementation.

---

# 5. ChatGPT responsibilities

ChatGPT is responsible for the production work unless the user explicitly chooses otherwise.

This includes:

- generating scene visuals or references when required,
- performing asset breakdown,
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

# 6. Asset rules

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

# 7. Motion rules

Motion begins only after the relevant visual implementation and assets are approved.

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

For continuous videos, prefer:

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

# 8. Polish

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

# 9. Summary

```text
GLOBAL VIDEO DEVELOPMENT

Every project MUST define:

1. VIDEO TYPE
   - EIM
   - KEC

2. BUILD MECHANISM
   - PER_SCENE
   - FULL_COMPOSITION


MANDATORY GLOBAL PIPELINE

Brief
↓
Select Type
↓
Select Build Mechanism
↓
Full Storyboard
↓
Approval
↓
Production
↓
Motion
↓
Polish
↓
Final Approval
↓
Render


PER_SCENE PRODUCTION

For EACH scene:

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
Implementation
↓
Motion

Repeat until all scenes are complete.

Then:

Integration
↓
Transitions
↓
Polish
↓
Final Approval
↓
Render


FULL_COMPOSITION PRODUCTION

Full Asset Breakdown
↓
Approval
↓
Generate All Clean Assets
↓
Approval
↓
Build One Master Composition
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
