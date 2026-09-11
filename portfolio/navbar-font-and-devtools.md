# Top-Left Header Font & DevTools Configuration Plan

## Goal
Update the top-left "Jinendra Shah" header logo font to General Sans and disable Next.js / React DevTools in configuration.

## Tasks
- [ ] Task 1: In [`header.tsx`](file:///d:/Treasury/Git/projects/personal%20portfolio/portfolio/src/components/layout/header.tsx), update logo font from `var(--font-mono)` to `var(--font-sans)` → Verify: Inspect top-left brand in browser to confirm General Sans
- [ ] Task 2: In [`next.config.ts`](file:///d:/Treasury/Git/projects/personal%20portfolio/portfolio/next.config.ts), set `devIndicators: false` → Verify: Next.js dev indicator icon in bottom corner is gone
- [ ] Task 3: In [`layout.tsx`](file:///d:/Treasury/Git/projects/personal%20portfolio/portfolio/src/app/layout.tsx), add React DevTools hook suppressor → Verify: React DevTools hook disabled
- [ ] Task 4: Run `npm run build` and test in browser → Verify: Build passes and UI reflects changes

## Done When
- [ ] Top-left "Jinendra Shah" renders in General Sans
- [ ] Dev indicators / devtools HUD are disabled
