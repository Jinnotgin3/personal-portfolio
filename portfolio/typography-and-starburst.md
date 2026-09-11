# Typography & Starburst Tuning Plan

## Goal
Implement General Sans + Fraunces typography per `PORTFOLIO_SPEC.md` and calm the starburst scroll acceleration and brightness.

## Tasks
- [ ] Task 1: Update [`layout.tsx`](file:///d:/Treasury/Git/projects/personal%20portfolio/portfolio/src/app/layout.tsx) with Fontshare `General Sans` and Google Fonts `Fraunces` → Verify: Fonts load in head
- [ ] Task 2: Update [`globals.css`](file:///d:/Treasury/Git/projects/personal%20portfolio/portfolio/src/app/globals.css) `--font-sans` to `"General Sans"` and `--font-serif` to `"Fraunces"`, soften singularity glow → Verify: Global styling picks up new font tokens
- [ ] Task 3: Update [`editorial-wordmark.tsx`](file:///d:/Treasury/Git/projects/personal%20portfolio/portfolio/src/components/sections/editorial-wordmark.tsx) font fallback to `"Fraunces"` → Verify: Wordmark renders with Fraunces
- [ ] Task 4: Update [`star-burst-bg.tsx`](file:///d:/Treasury/Git/projects/personal%20portfolio/portfolio/src/components/hero/star-burst-bg.tsx) with calmed scroll multipliers (`0.012`), velocity cap (`6.5`), streak stretch (`16`), and dimmed brightness opacities → Verify: Starburst is smooth, calm, and less bright
- [ ] Task 5: Run `npm run build` and test in browser → Verify: Build passes and UI renders cleanly

## Done When
- [ ] Body sans is General Sans across all pages and serif wordmark is Fraunces
- [ ] Mouse wheel scroll produces subtle, gentle starburst speed without harsh scattering
- [ ] Background brightness is toned down for optimal reading contrast
