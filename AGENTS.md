## Setup commands

```bash
# Install dependencies (uses Bun)
bun install

# Build all packages
bunx turbo run make

# Run tests and linting
bunx turbo run lint test

# Clean build artifacts
bun run clean

# Build a specific package
bunx turbo run make --filter='<package-name>'
```

Use `bunx` (not `npx`) to run package binaries.

The current Remotion version can be found in `packages/core/src/version.ts`. The next version should increment the patch version by 1.

## Coding style

- Keep things in one function unless they are composable or reusable.
- Do not extract single-use helpers preemptively. Inline the logic at the call site unless the helper is reused, hides a genuinely complex boundary, or has a clear independent name that improves the caller.

## Internal API optionality

When adding or reviewing TypeScript parameters, React props, or type/interface members, make new internal inputs preferrably nullable (`T | null`), not optional (`?:`). Public exported APIs are exempt when requiring the input would be breaking.

## Key services

- **Remotion Studio** (dev testbed): `cd packages/example && bun run dev` — starts at `http://localhost:3000`. This is the main dev UI for previewing video compositions.
- **Player testbed**: `cd packages/player-example && bun run dev` — for testing `@remotion/player` changes.
- **Docs site**: `cd packages/docs && bun run start` — Docusaurus dev server.

## Rendering test videos

From `packages/example`:

- `bunx remotion compositions` — list available compositions.
- `bunx remotion render <comp-id> --output ../../out/video.mp4` — render a video.
- `bunx remotion still <comp-id> --output ../../out/still.png` — render a still image.

## Marfin video development workflow

For work in the Marfin video project, the mandatory production workflow is defined in:

`docs/VIDEO-DEVELOPMENT-WORKFLOW.md`

Read that file before creating or modifying a Marfin video.

### Required project definition

Every video project must define both:

1. **Video Type**
   - `EIM` — Editorial Infographic Motion
   - `KEC` — Kinetic Editorial Collage

2. **Build Mechanism**
   - `PER_SCENE`
   - `FULL_COMPOSITION`

Video Type defines the visual language. Build Mechanism defines how the approved storyboard is implemented. They are separate decisions.

### Mandatory approval rule

Do not skip approval gates.

If a stage requires user approval:

`NOT APPROVED = DO NOT CONTINUE`

### Mandatory scene-preparation rule

The approved Full Storyboard is the master reference for the entire video.

**Both build mechanisms prepare scenes one by one.** The build mechanism does not change this preparation loop.

For every scene, in storyboard order:

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
Move to the next Scene
```

Repeat until every storyboard scene is complete.

Never generate all scenes as one visual batch. Never perform a full-video asset breakdown before the individual scenes have passed their required approval gates.

The difference between `PER_SCENE` and `FULL_COMPOSITION` begins at Remotion implementation/assembly, after the required scene preparation is complete.

### Asset-generation responsibility

ChatGPT is responsible for generating the visual assets required by the approved storyboard and for preparing them for Remotion implementation.

Do not ask the user to manually create assets that ChatGPT can generate.

Keep editable elements native wherever possible:

- Text → React / HTML
- Shapes → React / CSS / SVG
- Lines and paths → SVG
- Numbers → native text
- Simple backgrounds and geometric elements → native shapes

Use raster assets only for genuinely image-based elements such as photos, cutouts, people, buildings, clouds, textures, or similar artwork.

Never flatten an entire storyboard or scene into a single raster image just to animate it.

Follow the complete workflow and both build mechanisms in `docs/VIDEO-DEVELOPMENT-WORKFLOW.md`.
