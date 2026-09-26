# Marfin Video

Status: cleanup for production workflow.

## Active surface

- `src/Root.tsx` — only exposes the compositions that matter right now.
- `src/styles/eim/` — reusable EIM visual/motion foundation.
- `src/styles/kinetic-editorial-collage/` — KEC style reference.
- `src/generated/monas-kec-v3/` — approved KEC reference.
- `src/generated/monas-eim-v12/` — legacy EIM reference only.

## Legacy experiments

Older generated folders are intentionally kept in the repository for reference, but they are no longer registered in Remotion Studio.

A full snapshot before this cleanup is preserved on branch:

`marfin-archive-2026-09-26`

## Production rule for now

Do not add new scene versions or installer/patcher workflows until the simplified production flow is locked.

The next production workflow will be defined separately and should replace the older experimental process.
