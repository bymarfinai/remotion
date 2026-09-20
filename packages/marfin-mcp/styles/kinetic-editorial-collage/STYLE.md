# Style 001 — Kinetic Editorial Collage

**Style ID:** `kinetic-editorial-collage`  
**Short alias:** `KEC`  
**Version:** 0.1.0

## Purpose

Use this style when the video should feel like a fast, contemporary editorial collage: photographic cutouts layered over textured backgrounds, bold typography, graphic shapes, and energetic but intentionally imperfect motion.

The style is a creative-direction package, not a fixed template. Subjects and assets may change while the visual and motion grammar stays recognizable.

## Visual Grammar

- Prefer real photographic cutouts, transparent PNGs, or cleanly masked images for hero objects.
- Use paper, grain, halftone, photocopy, or print-like texture as atmosphere rather than decoration.
- Combine photography with simple SVG or CSS geometric shapes.
- Use asymmetrical composition and overlapping layers.
- Keep some imperfect alignment, slight rotation, crop, and edge tension.
- Favor strong foreground/background separation and clear focal hierarchy.
- Avoid glossy 3D, glassmorphism, generic corporate gradients, and overly polished SaaS UI treatment.

## Typography

- Use bold editorial sans-serif typography as a major visual layer.
- Headlines may be oversized, tightly cropped, stacked, or partially occluded by imagery.
- Use a clear contrast between headline and supporting text.
- Text must remain vector/HTML/SVG where possible so it stays sharp in Remotion.
- Avoid decorative fonts that reduce readability.

## Color

Color is reference-driven, not fixed.

Preferred behavior:
- 1 dominant background tone.
- 1–2 strong accent colors.
- Neutral paper/ink colors for texture and type.
- Use contrast aggressively enough that cutout subjects remain readable.

Do not infer a permanent palette from one reference video.

## Motion Grammar

### Entrances

Default entrance duration: **4–8 frames at 30 fps**.

Preferred patterns:
- scale pop-in with overshoot,
- short directional slide,
- mask/reveal,
- cut-in,
- fast stagger between layers,
- slight rotational settle.

Avoid long, floaty easing.

### Overshoot

Objects may enter above final scale and settle quickly.

Typical conceptual pattern:

`0.85 -> 1.08 -> 1.00`

Do not apply identical overshoot values to every layer.

### Rotation

Use small, intentional rotations to create collage energy.

Typical range:
- static layer: about -6° to +6°,
- entrance may temporarily exceed the final angle.

### Stagger

Layers should rarely appear simultaneously.

Typical sequence:
1. background / texture,
2. graphic shape,
3. hero cutout,
4. headline,
5. secondary decorative assets,
6. supporting copy.

### Camera

Use subtle camera pushes or composition-scale movement.

The camera should reinforce momentum, not imitate cinematic 3D camera work.

## Composition Rules

- Build scenes from layered planes.
- One element should clearly dominate.
- Allow hero cutouts to break containers and overlap typography.
- Preserve negative space where needed for readability.
- Do not center every object.
- Avoid evenly distributed “template” layouts.
- Cropping an object at the frame edge is allowed when intentional.

## Asset Generation Policy

The default user workflow is **assetless input**: the user gives the idea, style, duration, and format. The AI director is responsible for creating the visual concept and producing all required visual assets.

When a scene requires a visual element:

1. Decide whether it should remain native Remotion content (HTML text, CSS shape, React component, SVG, chart, or simple icon).
2. If the scene needs a photographic, illustrated, textured, cutout, environmental, or decorative image asset, generate it automatically.
3. Store generated assets with the video project and use them from Remotion as normal image/video/audio assets.
4. Keep typography as HTML/SVG/React wherever practical so text remains sharp and editable.
5. Do not ask the user to source images, icons, textures, cutouts, or backgrounds for the ordinary prompt-to-video workflow.

Reference media supplied by the user is treated as creative-direction input, not as a requirement that the user provide production assets.

Remotion is responsible for composition, animation, timing, typography, and rendering. The AI director is responsible for concept, storyboard, asset planning, and asset generation.

## Texture Rules

Texture should unify the composition.

Good:
- paper grain,
- subtle noise,
- halftone,
- photocopy edge,
- ink-like roughness.

Bad:
- heavy texture that obscures text,
- random overlays with no relationship to the composition,
- excessive grain on every layer.

## Timing

The style should feel edited, not merely animated.

For short-form vertical video:
- favor quick scene changes,
- establish a focal object early,
- synchronize major visual changes with beats or semantic moments when audio exists,
- reserve slower holds for the strongest frame.

## Reference Adaptation

When a user provides a reference:

Preserve:
- motion character,
- composition logic,
- density,
- texture behavior,
- pacing,
- typography hierarchy.

Adapt:
- subject,
- copy,
- brand colors,
- aspect ratio,
- exact assets.

Do not blindly reproduce the reference frame-by-frame unless the task explicitly asks for reconstruction.

## Prompt Interpretation

Examples that should resolve to this style:

- “Pakai KEC.”
- “Kinetic Editorial Collage.”
- “Bikin seperti editorial cutout magazine animation.”
- “Fast collage dengan foto cutout dan typography gede.”

## Remotion Implementation Guidance

Prefer:
- React/HTML text,
- SVG shapes,
- transparent image assets,
- `interpolate()`,
- `spring()` for short overshoot where appropriate,
- `Sequence` for staggered scene construction,
- reusable animation helpers rather than copied frame logic.

Do not make the style dependent on a single resolution. Layout should adapt to 16:9, 9:16, and 1:1 compositions.

## Success Test

A render passes this style when a viewer can recognize the same creative language even after the original subject has been replaced.

For example:

`Big Ben reference -> Monas output`

The subject changes, but the editorial collage character, layering, typography, texture, and motion grammar remain recognizably related.
