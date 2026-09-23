# EIM Scene 1 Layer Pack

This scene is intentionally built like the KEC V3 composition: each logical element is a named React component instead of one monolithic scene block.

Layer order, back to front:

1. scene-card
2. pale-circle
3. city-artwork
4. city-image
5. question-text
6. iconic-title
7. supporting-copy
8. header-left
9. header-center
10. header-right
11. footer-dash
12. footer-text

All primary placement values live in `config.ts`.

To change composition without touching animation logic, edit only:

- `SCENE1.question`
- `SCENE1.iconic`
- `SCENE1.supporting`
- `SCENE1.cityCircle`
- `SCENE1.cityImage`
- header/footer coordinates

Each rendered layer has a `data-eim-layer` attribute so it is easy to identify in the Studio/browser inspector.

Duration: 150 frames / 5 seconds / 30 fps.
