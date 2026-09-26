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
- Clean assets must be approved before moving to the next scene.
- ChatGPT generates the scene visual and the clean assets.
- The user reviews and approves at each required approval gate.

Only after all scenes have completed this loop does the selected Build Mechanism affect implementation.

---

# 4. Build Mechanism A — PER_SCENE

Use `PER_SCENE` when each prepared scene should be implemented and motioned as its own Remotion scene/composition before final integration.

After all required scene preparation is complete:

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

# 5. Build Mechanism B — FULL_COMPOSITION

Use `FULL_COMPOSITION` when all prepared scenes should be implemented directly inside one continuous master Remotion timeline.

The scene preparation is still **one scene at a time**.

After **all scenes** have completed:

`Generate Scene → Approval → Asset Breakdown → Approval → Generate Clean Assets → Approval`

then:

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

# 6. What the two mechanisms actually change

The front half of production is the same:

```text
Full Storyboard
↓
Approval
↓
Scene 1: Generate → Approve → Breakdown → Approve → Clean → Approve
↓
Scene 2: Generate → Approve → Breakdown → Approve → Clean → Approve
↓
Scene 3: Generate → Approve → Breakdown → Approve → Clean → Approve
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

# 7. ChatGPT responsibilities

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

# 8. Asset rules

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

# 9. Motion rules

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

# 10. Polish

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

# 11. Canonical summary

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

   THEN Scene 2
   SAME LOOP

   THEN Scene 3
   SAME LOOP

   Repeat until all scenes are prepared.

7. IMPLEMENT USING SELECTED BUILD MECHANISM


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
