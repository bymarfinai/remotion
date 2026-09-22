# Style 002 — Editorial Infographic Motion

**Style ID:** `editorial-infographic-motion`  
**Short alias:** `EIM`  
**Version:** 0.1.0 — experimental

## Status

Experimental style derived from the current reference test. Do not treat this as the final locked quality standard until the first Remotion test is visually approved.

## Core idea

Clean editorial motion that explains one thought at a time through restrained typography, visual metaphors, simple diagrams, curved paths, masks, and carefully staged cutouts.

The style should feel intellectual, premium, controlled, and editorial rather than collage-heavy.

## Visual grammar

- off-white / ivory editorial stage,
- dark navy ink,
- cobalt / royal-blue accent,
- rounded card or framed composition,
- thin borders and soft physical shadow,
- large keyword typography paired with smaller setup copy,
- circle windows / masks,
- curved paths, markers, segmented bars, timelines, and simple diagrams,
- one visual metaphor or cutout per beat,
- generous negative space,
- clean asymmetry.

## Motion grammar

- smooth, fast entrances,
- directional slide and mask reveal,
- circle reveal,
- path drawing,
- phrase-by-phrase text build,
- diagram elements building sequentially,
- restrained spring motion,
- no aggressive KEC-style jitter,
- no long floaty easing.

## Typography

Typical hierarchy:

```
small setup sentence
BIG KEYWORD
```

or:

```
supporting phrase
IMPORTANT CONCEPT
```

Text should remain native HTML / SVG / React in Remotion.

## Asset policy

Prefer native Remotion for:
- typography,
- circles,
- lines,
- paths,
- bars,
- simple icons,
- diagram structure.

Use generated binary assets for:
- photographic cutouts,
- 3D objects,
- people,
- architectural objects,
- complex visual metaphors.

When new generated binary assets are required locally, provide a ZIP with all assets plus `install.ps1`.

## First test

The first validation composition is `Monas-5s-EIM-v1`.

It intentionally reuses the already-installed Monas cutout from the KEC test so this first EIM prototype does not require another binary-asset ZIP. Future EIM tests must use the ZIP delivery rule whenever they introduce new generated binary assets.


## V2 refinement target

The current candidate composition is `Monas-5s-EIM-v2`.

Compared with v1, v2 intentionally raises the bar on:
- more assertive hero cropping,
- stronger asymmetry,
- more integrated path/timeline storytelling,
- layered annotation cards,
- sharper information hierarchy,
- more editorial tension,
- less “static infographic template” feel,
- a stronger final poster frame.

Do not lock the style as final until this candidate is visually reviewed and approved.


## V3 correction

Frame-by-frame review of the reference showed that v1/v2 were too dense and too static. The reference language is not one packed infographic card. It is a sequence of minimal editorial micro-scenes inside a consistent framed stage.

The v3 candidate therefore shifts to:
- one idea per beat,
- much more negative space,
- one dominant visual device per scene,
- repeated curved-path language as a transition/story device,
- phrase-by-phrase editorial copy,
- occasional single cutout object rather than many simultaneous infographic widgets,
- continuity through the persistent card, palette, path, and type hierarchy.

Candidate: `Monas-5s-EIM-v3`.

Do not lock final EIM standard until this version is visually reviewed.


## V4 review result

**Rejected as a style match.**

User review: v4 still did not match the supplied reference.

Root cause:
- v4 remained too close to an infographic-card system,
- it reused KEC assets that belong to a different visual language,
- it contained too many simultaneous information devices,
- it lacked the reference's dedicated monochrome sculptural metaphor assets,
- it did not preserve enough negative space between beats.

Next action: rebuild from the frame-by-frame source-of-truth in `REFERENCE_BREAKDOWN.md`. Do not iterate v4 composition logic.


## V5 full reset

Candidate: `Monas-7s-EIM-v5`.

V5 is the first full reset after rejecting v4. It follows the frame-by-frame reference grammar instead of the earlier infographic-card interpretation:

- 7 seconds / 210 frames,
- persistent white editorial card with thin navy border and soft shadow,
- very large negative space,
- one dominant idea per beat,
- setup sentence + oversized keyword hierarchy,
- dedicated monochrome/duotone EIM asset pack,
- clean circular image masks,
- one block-build beat,
- one curved-path beat,
- one circular-payoff beat,
- sparse final crowd payoff,
- no KEC torn paper, distressed texture, orange, birds, or skyline collage residue.

Binary assets for this candidate are delivered separately as `monas-eim-v5-asset-pack.zip` with `install.ps1`.

Do not promote EIM to a locked production standard until V5 is visually reviewed.


## V6 approved-board implementation

Candidate: `Monas-10s-EIM-v6`.

V6 is built directly from the approved 7-frame benchmark board and supersedes the earlier 5s/7s experiments.

Locked execution choices:
- 10 seconds / 300 frames / 30 fps / 1080x1920,
- 7 scenes,
- persistent white/ivory card, thin navy border, soft shadow,
- small setup copy + large keyword hierarchy,
- dedicated EIM asset pack in `generated/monas-eim-v6`,
- clean navy/blue/off-white palette,
- native SVG/CSS paths, dots, circles, and measurement guides,
- no KEC texture/torn-paper/orange residue,
- final benchmark remains the approved 7-frame visual board.

Binary delivery:
- `monas-eim-v6-asset-pack.zip`
- includes `install.ps1`
- assets install to `packages/marfin-video/public/generated/monas-eim-v6/`.

Do not lock EIM as final production standard until the user reviews the actual V6 Studio output.
