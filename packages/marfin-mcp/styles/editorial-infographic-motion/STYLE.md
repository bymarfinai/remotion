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
