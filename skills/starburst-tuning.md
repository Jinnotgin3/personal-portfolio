# Starburst Tuning Plan

## Goal
Decrease the starburst scatter speed when scrolling with the mouse wheel and reduce the visual brightness for a calmer, more refined background.

## Tasks
- [ ] Task 1: Update [`star-burst-bg.tsx`](file:///d:/Treasury/Git/projects/personal%20portfolio/portfolio/src/components/hero/star-burst-bg.tsx) scroll multiplier (`0.04` → `0.012`), max velocity clamp (`18` → `6.5`), and streak factor (`40` → `16`) → Verify: Scroll with mouse wheel and observe subtle acceleration
- [ ] Task 2: Update [`star-burst-bg.tsx`](file:///d:/Treasury/Git/projects/personal%20portfolio/portfolio/src/components/hero/star-burst-bg.tsx) particle base opacity (`0.25..1.0` → `0.15..0.60`), radial multiplier (`1.1` → `0.70`), and glint intensity → Verify: Star brightness is softened
- [ ] Task 3: Soften singularity bottom glow in [`globals.css`](file:///d:/Treasury/Git/projects/personal%20portfolio/portfolio/src/app/globals.css) → Verify: Bottom center violet glow is subtle
- [ ] Task 4: Run `npm run build` and test in browser → Verify: Build passes and visual check confirms smooth, calm starburst

## Done When
- [ ] Mouse wheel scroll causes subtle, elegant star movement rather than hyper-scatter
- [ ] Starfield is toned down in brightness and creates great contrast with text and cards
