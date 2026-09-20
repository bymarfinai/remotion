# Style 001 — Kinetic Editorial Collage

**Style ID:** `kinetic-editorial-collage`  
**Short alias:** `KEC`  
**Version:** 1.0.0

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


## KEC Production Standard v1

This is the default production quality bar for KEC when the user does not give a more specific visual direction.

The accepted baseline is the layered editorial-collage language proven by the Monas KEC V3 test: real/generated photographic cutouts, contextual collage imagery, tactile print texture, bold native typography, geometric color masses, torn-paper accents, and fast layered motion.

### Default visual system

When no brand palette is supplied, start from:

- ink / charcoal: `#111111`
- warm ivory / paper: `#F3E4C8`
- cobalt blue: `#0B79E8`
- energetic orange: `#FF5A12`

These are defaults, not mandatory brand colors. A user-supplied palette overrides them while preserving KEC contrast and hierarchy.

### Required layer stack

A finished KEC scene should normally contain these planes:

1. textured charcoal or editorial background,
2. subtle atmospheric haze / vignette / print noise,
3. geometric color masses,
4. contextual generated imagery such as skyline, architecture, map, newspaper, or environment fragment,
5. one dominant generated hero cutout,
6. oversized native Remotion headline typography,
7. paper label / torn strip / caption treatment,
8. 1–3 supporting decorative cutouts such as birds, clouds, arrows, tape, stamps, or archival fragments,
9. final grain / print unification pass.

Not every scene needs every decorative element, but the final composition must feel layered rather than like flat shapes on a blank background.

### Asset standard

Use **real generated image assets** for visual content that benefits from photographic or tactile detail:

- hero subject,
- skyline / environment / contextual collage,
- background texture,
- clouds / smoke / paper texture when visually important,
- decorative photographic cutouts.

Keep these native to Remotion whenever practical:

- headline and body text,
- simple circles, bars, arrows, bursts, and underlines,
- simple icons and SVG marks,
- timing, transforms, masks, and transitions.

Plain cream paper strips may be simple graphic assets. They do not need a photograph inside them. Their job is editorial framing and readability.

### Background quality rule

A final KEC render must not end on a visually flat, empty black background unless the brief explicitly requests it.

Default background treatment should combine:

- distressed charcoal or paper texture,
- subtle grain,
- restrained halftone / photocopy character,
- optional low-opacity blue/orange atmospheric tint,
- torn-paper residue or other editorial depth where useful.

Background detail must remain subordinate to the hero.

### No-placeholder rule

After concept approval:

- do not replace required generated imagery with generic CSS/SVG placeholders,
- do not animate a full finished poster as one raster image and call it a layered KEC video,
- do not keep broken, invisible, or empty asset layers in the final composition,
- regenerate or repair the asset instead of silently downgrading the visual.

A full-frame generated image may be used as a **creative reference / target frame**, but the production video should be reconstructed from independently controllable layers.

### Asset verification gate

Before a KEC composition is treated as complete:

1. generated files must exist in the project,
2. Remotion must load them from project assets, normally through `staticFile()`,
3. every required visual layer must visibly render in Studio,
4. hero, contextual image, texture, and key decorative assets must be checked at a representative late frame,
5. the composition must still read clearly with Studio selection outlines disabled / ignored,
6. no missing asset may be substituted by an accidental blank region.

Do not declare the KEC build finished before this visual verification passes.

### Default short-form spec

If the user only provides topic + duration + “KEC” and gives no format:

- aspect ratio: **9:16**
- resolution: **1080 × 1920**
- fps: **30**
- preserve the requested duration exactly.

Other formats remain supported when requested.

### Default 5-second pacing

For a 5-second / 150-frame KEC piece, a useful baseline is:

- frames 0–20: texture + graphic masses,
- frames 18–45: contextual collage / background fragments,
- frames 40–80: hero cutout reveal,
- frames 70–115: headline + label + supporting decorative layers,
- frames 110–150: settle, final composition hold, subtle camera push.

This is a grammar, not a rigid template.

### Motion quality bar

- stagger layers rather than revealing everything together,
- use short springs and quick overshoot,
- allow small rotational settles,
- use a restrained composition-scale camera push,
- prioritize a strong final poster-like frame,
- avoid long floaty animation.

### User workflow

For ordinary prompt-to-video use:

1. user gives idea + KEC + duration,
2. AI director proposes a concise concept,
3. user approves or revises,
4. after approval, immediately generate the required assets and build the Remotion composition,
5. show the resulting Studio preview,
6. revise from visual feedback.

Do not insert another long “production pack” approval step after the concept has already been approved unless a material creative decision truly needs user input.


### ZIP delivery rule

When KEC production uses generated binary assets that must exist in the user's local Remotion repo, always provide a downloadable ZIP package containing the required assets plus an installer script.

The ZIP should normally include:
- all generated image/audio/video assets required by the composition,
- `install.ps1` that copies the assets into the correct project folder,
- optional verification output for file names and sizes,
- README instructions.

Do not assume connector-side binary upload is sufficient. The user should receive the ZIP whenever local asset installation is needed.
