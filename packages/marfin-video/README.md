# Marfin Video

Status: cleanup for production workflow.

## Mandatory production workflow

All new motion-video production must follow:

`PRODUCTION_WORKFLOW.md`

Do not skip approval gates unless the user explicitly instructs otherwise.

## Active surface

- `src/Root.tsx` — only exposes the compositions that matter right now.
- `src/styles/eim/` — reusable EIM visual/motion foundation.
- `src/styles/kinetic-editorial-collage/` — KEC style reference.
- `src/generated/monas-kec-v3/` — approved KEC reference.
- `src/generated/monas-eim-v12/` — legacy EIM reference only.

## Legacy experiments

Older generated folders are intentionally kept in the repository for reference, but they are no longer registered in Remotion Studio.

A full snapshot before cleanup is preserved on branch:

`marfin-archive-2026-09-26`
