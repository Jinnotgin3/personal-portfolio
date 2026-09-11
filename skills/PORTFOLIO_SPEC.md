# Personal Portfolio — Build Spec

Reference inspiration: [Hermes Agent](https://hermes-agent.nousresearch.com/) (Nous Research) — bold single-word-per-line hero typography, high-contrast dark theme with a single accent color, a giant slab-serif wordmark **cut out** of a full-bleed solid-color panel (adapted here to lead the hero with your name, JINENDRA — see §7–8), minimal top nav, generous negative space, and a calm scroll-driven reveal rhythm rather than aggressive parallax.

> ⚠️ **Projects placeholder**: The MIRT-based adaptive testing system is set up as the first flagship case study, stubbed with TODOs for the real story (problem, approach, hard part, outcome). Send me that, the other 1-2 flagship projects, and any simpler ones for the grid, and I'll fill everything in.

---

## 0. Avoiding the "AI-Made" Look

Each item below common tell. Spec updated to dodge.

| Tell | Avoid | Spec instead |
|---|---|---|
| Purple-blue gradient | everywhere-gradient | Single flat accent (`--color-accent`), no gradient fills |
| Gradient hero text | text-clip gradient | Solid-color wordmark cutout (§9) — different trick, not gradient text |
| Emoji in headings | 🚀✨ in `<h2>` | None. Plain text headings |
| Inter everywhere | one font, all weights, all roles | Two-font pairing, deliberate roles — see font note below |
| Colored left-border cards | `border-l-4 border-blue-500` cards | Cards use image + typography hierarchy, no accent-bar crutch |
| Glassmorphism | `backdrop-blur` + translucent white cards | Flat surfaces, `bg-foreground/5` solid tints only |
| Low-contrast dark mode | grey-on-grey | `#0a0a0a` / `#f5f5f5` — deliberately high contrast (already in §4) |
| 3 icon boxes in a row | generic feature-icon triad | Skip icon-triad layout; skills/features shown as text + tags (§10, §11) |
| Badge above headline | "✨ New" pill above `<h1>` | None. Hero is wordmark + tagline, no badge |
| Lucide icons everywhere | icon next to every label | Lucide used only for real UI affordance: theme toggle, socials, download, hamburger. Not decorative |
| Untouched shadcn | default shadcn styling, no edits | Only React Bits Pro + hand-built components; no shadcn defaults left as-is |
| Fade-in-on-scroll, everywhere | every section `whileInView opacity` | Reserved for §6/§13 case-study sections and project cards only — not blanket-applied |
| Cursor-following beam | spotlight-follows-mouse | Not used. WebGL hero (§8) is scroll-reactive, not cursor-reactive |
| Buttons fade on hover | `hover:opacity-70` on every button | Buttons use real state change (bg shift, `translate-x` on nav arrows) not opacity fade |
| Inconsistent spacing | eyeballed padding | Tailwind spacing scale only (`px-6 py-24`, `gap-8` etc.), consistent across sections — audit before shipping |
| Em dashes everywhere | — as default punctuation | Commas/periods/parentheses in real copy; em dash only where it's the actually correct mark |
| Generic buzzword copy | "seamless," "cutting-edge," "passionate about" | All TODO copy (bio, project descriptions, positioning statement) written specific and concrete — no filler adjectives |
| Serif italics for accent words | *italic* mid-sentence | Wordmark cutout (§9) is the one serif moment; body copy stays one weight/style |
| Space Grotesk + Instrument Serif | that specific pairing | Different pairing — see font note below |
| Grain texture over gradient | noise overlay on gradient bg | No grain, no gradient background |

**Font note**: drop `Inter` as the sole/default sans. Pick a body sans with actual character — e.g. **General Sans**, **Geist**, or **Neue Montreal** — paired with the slab/Didone serif already used for the wordmark cutout (Fraunces / PP Editorial). Two fonts, two clear jobs: sans for everything readable, serif only for the name treatment. Not a third "everywhere" font, not the flagged Space Grotesk/Instrument Serif combo specifically.

```css
/* app/globals.css — replaces Inter */
@theme {
  --font-sans: "General Sans", ui-sans-serif, system-ui; /* or Geist / Neue Montreal — pick one, commit */
  --font-serif: "Fraunces", Georgia, serif; /* wordmark only, §9 */
}
```

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16+** (App Router) | React Server Components, Turbopack build |
| UI Library | **React 19** | Pairs with Next 16 |
| Language | **TypeScript** | Strict mode on |
| Styling | **Tailwind CSS v4** | CSS-first config via `@theme`, no `tailwind.config.js` needed |
| Animation | **Motion** (formerly Framer Motion) | Page transitions, scroll reveals, micro-interactions |
| 3D / Shaders | **WebGL** (via `three.js` / raw GLSL) | Hero background, Star Burst effect |
| Smooth Scroll | **Lenis** | Drives scroll-linked animation timing |
| Physics | **Matter.js** | Optional playful interaction (e.g. draggable skill chips, cursor-reactive particles) |
| Theme | **next-themes** | Light/dark mode, system-aware, no flash on load |
| Pro Components | **React Bits Pro** (`@reactbits-starter`) | Gradient Carousel, Star Burst, Text Scatter, 3D Text Reveal |

### Core dependencies

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir --turbopack
cd portfolio

npm install motion lenis matter-js next-themes three lucide-react
npm install -D @types/matter-js @types/three

# React Bits Pro (requires license key + @reactbits-starter registry in components.json)
npx shadcn@latest add @reactbits-starter/gradient-carousel-tw
npx shadcn@latest add @reactbits-starter/star-burst-tw
npx shadcn@latest add @reactbits-starter/text-scatter-tw
npx shadcn@latest add @reactbits-starter/3d-text-reveal-tw
```

Setup guide for the Pro registry: https://pro.reactbits.dev/docs/installation

---

## 2. Project Structure (multi-page)

File-based routing splits the layout into dedicated routes — cheap to add with the App Router, and each page is optimized/cached independently. Header and Footer live once in `layout.tsx` and wrap every route.

```
src/
  app/
    layout.tsx                 # ThemeProvider, Lenis provider, fonts, Header, Footer
    page.tsx                   # Home
    globals.css                 # Tailwind v4 @theme tokens, CSS vars for light/dark
    about/
      page.tsx                 # Bio, timeline, skills breakdown, interests
    projects/
      page.tsx                 # Projects grid, optional category filter
      [slug]/
        page.tsx                # Case-study template, one per flagship project
    contact/
      page.tsx                 # Contact form + socials + availability note
  components/
    layout/
      header.tsx                # Nav, active indicator, CTA, mobile hamburger
      footer.tsx                 # Contact, socials, resume link, mirrored nav, copyright
      theme-toggle.tsx            # sun/moon icon-morph button
      mobile-menu.tsx
    hero/
      hero.tsx                   # JINENDRA wordmark cutout + tagline + CTA
      hero-webgl-bg.tsx           # WebGL canvas, reveals on scroll (Star Burst)
    sections/
      wordmark-reveal.tsx          # reusable cutout-panel component
      about-snippet.tsx            # Home: 2-3 sentence teaser + "Read more"
      skills-preview.tsx           # Home: compact tech tag row
      about-3d-text-reveal.tsx     # React Bits: 3D Text Reveal, scroll-triggered
      timeline.tsx                 # About: college/milestones/hackathons
      skills-breakdown.tsx         # About: grouped by category
      interests.tsx                # About: hobbies/personality touch
      projects-grid.tsx             # Projects page: card grid + filter
      projects-carousel.tsx         # Home: featured-work carousel (React Bits)
      closing-cta.tsx                # Home: "Let's connect" section
      case-study/
        case-study-header.tsx
        case-study-section.tsx       # reusable block: heading + prose + optional image
        case-study-nav.tsx           # "Next project" link
      contact-form.tsx
    ui/
      matter-chips.tsx              # Matter.js physics playground for skill tags
      social-icons.tsx
  lib/
    lenis-provider.tsx
    motion-variants.ts
  content/
    projects.ts                     # all projects, incl. hasCaseStudy flag + slug
    skills.ts                        # grouped skill data (Languages/Frontend/Backend/ML/Tools)
    site.ts                          # name, tagline, email, social links, location
    case-studies/
      mirt-adaptive-testing.ts       # flagship project long-form content
public/
  og-image.png
  resume.pdf                         # linked from footer
  projects/
```

Route map:

| Route | Purpose |
|---|---|
| `/` | Home — hero, featured work, about snippet, skills preview, closing CTA |
| `/about` | Bio, timeline, skills breakdown, interests |
| `/projects` | Grid of all projects (cards), optional category filter |
| `/projects/[slug]` | Case-study page — only for flagship projects with a real story |
| `/contact` | Contact form, socials, availability note |

---

## 3. Shared Content Config

Centralize identity/contact info once so the Header, Footer, and Contact page all read from the same source instead of duplicating strings.

```ts
// content/site.ts
export const site = {
  name: "Jinendra",
  role: "Full-Stack Developer & ML Enthusiast",
  email: "TODO@example.com",
  location: "Mumbai", // optional, shown in footer
  tagline: "Open to internships and collaborations.", // optional footer closing line
  social: {
    github: "https://github.com/TODO",
    linkedin: "https://linkedin.com/in/TODO",
    instagram: "https://instagram.com/TODO", // omit if not relevant
  },
  resumeUrl: "/resume.pdf",
};
```

---

## 4. Layout & Providers

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";
import { LenisProvider } from "@/lib/lenis-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LenisProvider>
            <Header />
            {children}
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// lib/lenis-provider.tsx
"use client";
import { ReactLenis } from "lenis/react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
```

Tailwind v4 theme tokens (light/dark driven by `next-themes` `class` strategy):

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
  --color-accent: #0000f2;
  --font-sans: "General Sans", ui-sans-serif, system-ui;
  --font-serif: "Fraunces", Georgia, serif;
}

.dark {
  --color-background: #0a0a0a;
  --color-foreground: #f5f5f5;
}
```

---

## 5. Theme Toggle (sun/moon icon-morph)

Exact markup/behavior as provided — icon-morph via rotate + scale + opacity, `aria-pressed` reflects state:

```tsx
// components/layout/theme-toggle.tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="focus-ring relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background ring-1 ring-foreground/8 transition-colors"
    >
      <span aria-hidden="true" className="relative h-4 w-4">
        <Sun
          aria-hidden="true"
          className={`absolute inset-0 h-4 w-4 text-foreground transition-all duration-300 ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        <Moon
          aria-hidden="true"
          className={`absolute inset-0 h-4 w-4 text-foreground transition-all duration-300 ${
            isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
      </span>
    </button>
  );
}
```

> Note: the original snippet always rendered the sun rotated-out and moon visible (dark-mode-first default). Logic above ties visibility to actual `resolvedTheme` so it works correctly in both directions.

---

## 6. Header (every page)

Name/logo left → Home, nav links with active-page indicator, one CTA button right, collapses to a hamburger on mobile.

```tsx
// components/layout/header.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { site } from "@/content/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 backdrop-blur">
      <Link href="/" className="font-semibold">
        {site.name}
      </Link>

      <nav className="hidden items-center gap-8 text-sm md:flex">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "page" : undefined}
            className={`relative pb-1 transition-colors ${
              isActive(l.href) ? "text-foreground" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {l.label}
            {isActive(l.href) && (
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-accent" />
            )}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-4 md:flex">
        <Link
          href="/contact"
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white"
        >
          Contact Me
        </Link>
        <ThemeToggle />
      </div>

      {/* Mobile: hamburger + theme toggle */}
      <div className="flex items-center gap-3 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="flex h-8 w-8 items-center justify-center"
        >
          <span className="block h-px w-5 bg-foreground before:absolute before:-mt-2 before:h-px before:w-5 before:bg-foreground after:absolute after:mt-2 after:h-px after:w-5 after:bg-foreground" />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={LINKS} activeHref={pathname} />
    </header>
  );
}
```

```tsx
// components/layout/mobile-menu.tsx
"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  activeHref: string;
}

export function MobileMenu({ open, onClose, links, activeHref }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-16 z-40 flex flex-col gap-6 bg-background px-6 py-10 md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className={`text-2xl font-medium ${l.href === activeHref ? "text-accent" : "text-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={onClose} className="mt-4 w-fit rounded-full bg-accent px-5 py-3 text-white">
            Contact Me
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 7. Footer (every page)

Contact info, socials, resume download, mirrored nav, copyright, optional closing tagline.

```tsx
// components/layout/footer.tsx
import Link from "next/link";
import { Github, Linkedin, Instagram, Download } from "lucide-react";
import { site } from "@/content/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
        <div>
          <p className="font-semibold">{site.name}</p>
          <a href={`mailto:${site.email}`} className="mt-2 block text-sm text-foreground/70 hover:text-foreground">
            {site.email}
          </a>
          {site.location && <p className="mt-1 text-sm text-foreground/50">{site.location}</p>}

          <div className="mt-4 flex gap-4">
            <a href={site.social.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
            <a href={site.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
            {site.social.instagram && (
              <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
            )}
          </div>

          <a
            href={site.resumeUrl}
            download
            className="mt-6 inline-flex items-center gap-2 rounded-full ring-1 ring-foreground/15 px-4 py-2 text-sm"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-foreground/70 hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>

        {site.tagline && (
          <p className="text-sm text-foreground/50 md:text-right">{site.tagline}</p>
        )}
      </div>

      <p className="mx-auto mt-12 max-w-5xl text-xs text-foreground/40">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
```

`public/resume.pdf` — drop your actual resume file at that path; the `download` attribute on the footer link triggers a direct download rather than opening in-tab.

---

## 8. Hero — "JINENDRA" Wordmark Cutout + Scroll Reveal

The hero leads with the wordmark-cutout treatment from §9, using your name as the giant slab-serif cutout — the first thing visible on load. Below it: role/tagline, a one-line positioning statement, and a primary CTA button.

```tsx
// components/hero/hero.tsx
"use client";
import Link from "next/link";
import { WordmarkReveal } from "@/components/sections/wordmark-reveal";
import { HeroWebglBg } from "./hero-webgl-bg";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <HeroWebglBg />
      <WordmarkReveal text="JINENDRA" bgColor="var(--color-accent)" className="h-[40vh]" />
      <p className="mt-8 text-lg md:text-2xl tracking-tight">{site.role}</p>
      <p className="mt-3 max-w-xl text-foreground/60">
        {/* TODO: one-line positioning statement, e.g. "I build fast, motion-rich, ML-backed web products." */}
      </p>
      <Link
        href="/projects"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white"
      >
        View My Work
      </Link>
    </section>
  );
}
```

```tsx
// components/hero/hero-webgl-bg.tsx
"use client";
import { StarBurst } from "@/components/ui/star-burst"; // installed via shadcn add
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

export function HeroWebglBg() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.85, 1]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10">
      <motion.div style={{ opacity, scale }} className="h-full w-full">
        <StarBurst particleCount={2000} color="var(--color-foreground)" />
      </motion.div>
    </div>
  );
}
```

**Fallback (no Pro license)**: replace `StarBurst` with a raw `three.js` `Points` particle system faded in via Motion `opacity`.

---

## 9. Wordmark Reveal — "JINENDRA" Cutout Block

Full-bleed solid-color panel with a giant slab-serif wordmark **cut out** of it — the letterforms are transparent, letting the page's background show through, rather than the text being drawn on top in a solid color.

Built with an SVG `<mask>` (not CSS blend modes, which are less predictable cross-browser): a white rect (visible) with black text (hidden) as the mask, applied to a solid-color rect. Where the mask is black (the letters), the colored rect becomes transparent and the real page background shows through underneath.

```tsx
// components/sections/wordmark-reveal.tsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useId } from "react";

interface WordmarkRevealProps {
  text: string;
  bgColor?: string;
  className?: string;
  mode?: "scroll" | "mount"; // "mount" = hero usage, fills in on load
}

export function WordmarkReveal({
  text,
  bgColor = "#0000f2",
  className,
  mode = "mount",
}: WordmarkRevealProps) {
  const maskId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 20%"] });
  const scrollScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`relative h-[45vh] w-full overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={mode === "scroll" ? { scaleY: scrollScaleY, transformOrigin: "bottom" } : undefined}
        initial={mode === "mount" ? { scaleY: 0 } : undefined}
        animate={mode === "mount" ? { scaleY: 1 } : undefined}
        transition={mode === "mount" ? { duration: 1, ease: [0.22, 1, 0.36, 1] } : undefined}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 1512 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="white" />
            <text
              x="50%"
              y="68%"
              textAnchor="middle"
              fontSize="300"
              fontFamily="var(--font-serif, Georgia, 'Times New Roman', serif)"
              fontWeight="700"
              fill="black"
            >
              {text}
            </text>
          </mask>
          <rect width="100%" height="100%" fill={bgColor} mask={`url(#${maskId})`} />
        </svg>
      </motion.div>
    </div>
  );
}
```

Notes:
- `fontSize="300"` is sized for a 7-letter name at `viewBox` width 1512 — test on mobile and reduce in a `sm:`/`md:` variant if it clips.
- Load a heavy slab/Didone serif via `next/font/local` for crisp edges at that scale (e.g. **Fraunces** at max weight, or **PP Editorial New Ultrabold**, set in all caps).
- Respect `prefers-reduced-motion`: skip `initial`/`animate` entirely and render at `scaleY: 1` immediately.
- Reuse with `mode="scroll"` for a lower-page wordmark break elsewhere if wanted.

---

## 10. Home Page

```tsx
// app/page.tsx
import { Hero } from "@/components/hero/hero";
import { ProjectsCarousel } from "@/components/sections/projects-carousel";
import { AboutSnippet } from "@/components/sections/about-snippet";
import { SkillsPreview } from "@/components/sections/skills-preview";
import { ClosingCta } from "@/components/sections/closing-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="px-6 py-24 md:px-12">
        <h2 className="mb-12 text-3xl font-bold">Featured Work</h2>
        <ProjectsCarousel /> {/* filtered to projects.filter(p => p.hasCaseStudy), 2-3 items */}
      </section>
      <AboutSnippet />
      <SkillsPreview />
      <ClosingCta />
    </>
  );
}
```

```tsx
// components/sections/about-snippet.tsx
import Link from "next/link";

export function AboutSnippet() {
  return (
    <section className="px-6 py-24 md:px-12">
      <p className="mx-auto max-w-2xl text-lg text-foreground/80">
        {/* TODO: 2-3 sentence version of your bio — background, current studies, what drives you. */}
      </p>
      <Link href="/about" className="mt-4 inline-block underline">
        Read more →
      </Link>
    </section>
  );
}
```

```tsx
// components/sections/skills-preview.tsx
const SKILLS = ["React", "Next.js", "TypeScript", "Python", "C++"]; // TODO: your actual stack

export function SkillsPreview() {
  return (
    <section className="px-6 py-16 md:px-12">
      <div className="flex flex-wrap justify-center gap-3">
        {SKILLS.map((s) => (
          <span key={s} className="rounded-full bg-foreground/5 px-4 py-2 text-sm">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// components/sections/closing-cta.tsx
import Link from "next/link";

export function ClosingCta() {
  return (
    <section className="flex flex-col items-center gap-4 px-6 py-32 text-center md:px-12">
      <h2 className="text-3xl font-bold md:text-5xl">Let's connect</h2>
      <Link href="/contact" className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white">
        Get in touch
      </Link>
    </section>
  );
}
```

---

## 11. About Page

Longer bio, timeline, skills grouped by category, and a personality touch.

```tsx
// app/about/page.tsx
import { Timeline } from "@/components/sections/timeline";
import { SkillsBreakdown } from "@/components/sections/skills-breakdown";
import { Interests } from "@/components/sections/interests";
import { About3DTextReveal } from "@/components/sections/about-3d-text-reveal";
import { MatterChips } from "@/components/ui/matter-chips";

export default function AboutPage() {
  return (
    <main className="px-6 py-32 md:px-12">
      <About3DTextReveal />
      {/* TODO: full bio paragraph(s) — background, how you got into development, current studies */}
      <Timeline />
      <SkillsBreakdown />
      <MatterChips /> {/* playful skills interaction, sits alongside the breakdown */}
      <Interests />
    </main>
  );
}
```

```tsx
// components/sections/about-3d-text-reveal.tsx
"use client";
import { TextReveal3D } from "@/components/ui/3d-text-reveal"; // installed via shadcn add

export function About3DTextReveal() {
  return (
    <TextReveal3D
      text="I build fast, motion-rich, physics-aware interfaces for the web."
      className="text-3xl md:text-5xl font-medium"
      trigger="scroll"
    />
  );
}
```

```ts
// content/skills.ts
// TODO: fill in your real skills per category
export const skills = {
  Languages: ["Python", "TypeScript", "C++"],
  Frontend: ["React", "Next.js", "Tailwind CSS"],
  Backend: ["Node.js", "FastAPI"],
  "ML/AI": ["PyTorch", "scikit-learn"],
  Tools: ["Git", "Docker"],
};
```

```tsx
// components/sections/skills-breakdown.tsx
import { skills } from "@/content/skills";

export function SkillsBreakdown() {
  return (
    <section className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">{category}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {items.map((item) => (
              <li key={item} className="rounded-full bg-foreground/5 px-3 py-1 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
```

```tsx
// components/sections/timeline.tsx
const MILESTONES = [
  // TODO: real milestones — college, hackathons, research work, internships
  { year: "TODO", title: "TODO" },
];

export function Timeline() {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold">Journey</h2>
      <ol className="mt-6 space-y-6 border-l border-foreground/10 pl-6">
        {MILESTONES.map((m) => (
          <li key={m.title}>
            <p className="text-sm text-foreground/50">{m.year}</p>
            <p className="font-medium">{m.title}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

```tsx
// components/sections/interests.tsx
export function Interests() {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold">Outside of code</h2>
      <p className="mt-3 max-w-xl text-foreground/70">
        {/* TODO: brief, personal — e.g. travel content, competitive programming, etc. */}
      </p>
    </section>
  );
}
```

---

## 12. Projects Page — Grid + Case Studies

`/projects` shows every project as a card. Only flagship projects — ones with a real story (a hard technical decision, a measurable outcome, a novel approach) — get a `slug` and link through to a dedicated `/projects/[slug]` case study; simpler projects stay as cards with an external link (GitHub/live demo). An optional category filter appears if the project count justifies it.

```ts
// content/projects.ts
export interface Project {
  slug?: string;
  title: string;
  description: string;
  tags: string[];
  category?: "Web" | "ML" | "Mobile"; // optional, only needed for the filter
  image: string;
  github?: string;
  demo?: string;
  hasCaseStudy: boolean;
}

export const projects: Project[] = [
  {
    slug: "mirt-adaptive-testing",
    title: "MIRT-Based Adaptive Testing System",
    description:
      "Adaptive assessment engine using Multidimensional Item Response Theory to select and score items in real time.",
    tags: ["Python", "Psychometrics", "MIRT", "Next.js"],
    category: "ML",
    image: "/projects/mirt-adaptive-testing.png",
    hasCaseStudy: true,
  },
  // TODO: add remaining flagship projects (2-3 total) with hasCaseStudy: true + slug
  {
    title: "Project — TODO",
    description: "One or two sentences on what it does and the problem it solves.",
    tags: ["React", "WebGL"],
    category: "Web",
    image: "/projects/project-two.png",
    github: "https://github.com/you/project-two",
    demo: "https://project-two.vercel.app",
    hasCaseStudy: false,
  },
];
```

```tsx
// components/sections/projects-grid.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { projects } from "@/content/projects";

const CATEGORIES = ["All", "Web", "ML", "Mobile"] as const;

export function ProjectsGrid() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Only render the filter bar if you actually have enough projects to justify it */}
      <div className="mb-10 flex gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-2 text-sm ${
              filter === c ? "bg-accent text-white" : "bg-foreground/5 text-foreground/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => {
          const primaryHref = p.hasCaseStudy ? `/projects/${p.slug}` : p.demo ?? p.github ?? "#";
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={primaryHref} className="group block">
                <div className="relative aspect-4/3 overflow-hidden rounded-xl">
                  <Image src={p.image} alt={p.title} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-foreground/70">{p.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-foreground/5 px-2 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex gap-4 text-sm">
                  {p.hasCaseStudy && <span className="underline">View case study</span>}
                  {p.github && <span className="text-foreground/60">GitHub</span>}
                  {p.demo && <span className="text-foreground/60">Live demo</span>}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
```

```tsx
// app/projects/page.tsx
import { ProjectsGrid } from "@/components/sections/projects-grid";

export default function ProjectsPage() {
  return (
    <main className="px-6 py-32 md:px-12">
      <h1 className="mb-16 text-5xl font-bold">Projects</h1>
      <ProjectsGrid />
    </main>
  );
}
```

The Home page's `ProjectsCarousel` (React Bits Gradient Carousel) reuses the same `projects` data, filtered to `p.hasCaseStudy`, to show just the 2-3 featured items.

---

## 13. Case Study Pages

One `app/projects/[slug]/page.tsx`, data-driven per project — problem/context, approach, explicit tech stack, result/outcome, links, and a "Next project" nav at the bottom.

```ts
// content/case-studies/mirt-adaptive-testing.ts
export const mirtAdaptiveTesting = {
  slug: "mirt-adaptive-testing",
  title: "MIRT-Based Adaptive Testing System",
  summary: "An adaptive assessment engine that estimates multiple latent ability dimensions in real time and selects the next item to maximize information gain.",
  stack: ["Python", "Next.js", "TypeScript"], // TODO: confirm full stack
  links: { github: "TODO", demo: "TODO" },
  coverImage: "/projects/mirt-adaptive-testing.png",
  sections: [
    { heading: "Problem / Context", body: "TODO — what gap or limitation prompted this (e.g. unidimensional IRT models undervaluing multi-skill assessments)." },
    { heading: "Approach", body: "TODO — why MIRT specifically, key architecture and technical decisions, why those tools." },
    { heading: "Result / Outcome", body: "TODO — measurable result (accuracy improvement, test length reduction, adoption), and what you learned." },
  ],
};
```

```tsx
// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { mirtAdaptiveTesting } from "@/content/case-studies/mirt-adaptive-testing";
import { CaseStudyNav } from "@/components/sections/case-study/case-study-nav";
// TODO: import additional case studies and add to the map below as you write them

const caseStudies = {
  "mirt-adaptive-testing": mirtAdaptiveTesting,
} as const;

export function generateStaticParams() {
  return projects.filter((p) => p.hasCaseStudy).map((p) => ({ slug: p.slug! }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies[params.slug as keyof typeof caseStudies];
  if (!study) return notFound();

  const flagshipSlugs = projects.filter((p) => p.hasCaseStudy).map((p) => p.slug!);
  const currentIndex = flagshipSlugs.indexOf(study.slug);
  const nextSlug = flagshipSlugs[(currentIndex + 1) % flagshipSlugs.length];

  return (
    <main className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold md:text-6xl">{study.title}</h1>
        <p className="mt-4 text-lg text-foreground/70">{study.summary}</p>

        <p className="mt-8 text-sm text-foreground/60">
          <span className="font-medium text-foreground">Stack:</span> {study.stack.join(", ")}
        </p>
        <div className="mt-2 flex gap-4 text-sm">
          {study.links.github && <a href={study.links.github} className="underline">GitHub</a>}
          {study.links.demo && <a href={study.links.demo} className="underline">Live demo</a>}
        </div>

        {study.sections.map((s) => (
          <section key={s.heading} className="mt-16">
            <h2 className="text-2xl font-semibold">{s.heading}</h2>
            <p className="mt-3 text-foreground/80 leading-relaxed">{s.body}</p>
          </section>
        ))}

        {nextSlug && nextSlug !== study.slug && <CaseStudyNav nextSlug={nextSlug} />}
      </div>
    </main>
  );
}
```

```tsx
// components/sections/case-study/case-study-nav.tsx
import Link from "next/link";
import { projects } from "@/content/projects";

export function CaseStudyNav({ nextSlug }: { nextSlug: string }) {
  const next = projects.find((p) => p.slug === nextSlug);
  if (!next) return null;

  return (
    <div className="mt-24 border-t border-foreground/10 pt-8">
      <Link href={`/projects/${nextSlug}`} className="group flex items-center justify-between">
        <span className="text-sm text-foreground/50">Next project</span>
        <span className="text-xl font-semibold group-hover:translate-x-1 transition-transform">
          {next.title} →
        </span>
      </Link>
    </div>
  );
}
```

> Only build this template out for the 2-3 projects that genuinely have a story worth telling — everything else stays a card on `/projects` linking straight to GitHub/live demo.

---

## 14. Contact Page

Email (clickable `mailto:`), a simple form, socials repeated for redundancy, and an optional availability note.

```tsx
// app/contact/page.tsx
import { Github, Linkedin, Instagram } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { site } from "@/content/site";

export default function ContactPage() {
  return (
    <main className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-bold md:text-6xl">Let's talk</h1>
        <a href={`mailto:${site.email}`} className="mt-4 block text-lg underline">
          {site.email}
        </a>
        {site.tagline && <p className="mt-2 text-foreground/60">{site.tagline}</p>}

        <div className="mt-6 flex gap-4">
          <a href={site.social.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </a>
          <a href={site.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5" />
          </a>
          {site.social.instagram && (
            <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5" />
            </a>
          )}
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
```

```tsx
// components/sections/contact-form.tsx
"use client";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: wire up to an email/form endpoint (e.g. Resend, Formspree, a Next.js Route Handler)
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-4">
      <input name="name" placeholder="Name" required className="w-full rounded-lg bg-foreground/5 px-4 py-3" />
      <input name="email" type="email" placeholder="Email" required className="w-full rounded-lg bg-foreground/5 px-4 py-3" />
      <textarea name="message" placeholder="Message" required rows={5} className="w-full rounded-lg bg-foreground/5 px-4 py-3" />
      <button type="submit" disabled={status !== "idle"} className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white">
        {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✓" : "Send message"}
      </button>
    </form>
  );
}
```

---

## 15. Motion Conventions

- **Scroll reveals**: `whileInView` + `viewport={{ once: true, margin: "-100px" }}` for section entrances.
- **Page-level timing**: driven by Lenis `scrollYProgress`, not raw window scroll, so it stays in sync with smooth-scroll easing.
- **Reduced motion**: wrap all Motion/WebGL/Matter.js effects with a `prefers-reduced-motion` check; fall back to static layout + instant theme toggle (no icon-morph transition).

---

## 16. Open Items

- [ ] Confirm React Bits Pro license key is available (site + install steps assume it is).
- [ ] Fill in `content/site.ts` — real email, GitHub/LinkedIn/Instagram URLs, availability tagline.
- [ ] Add `public/resume.pdf`.
- [ ] Fill in the MIRT case study TODOs (`content/case-studies/mirt-adaptive-testing.ts`) — problem, approach, outcome, stack, links.
- [ ] Identify the remaining 1-2 flagship projects for case studies, plus the rest for the grid, in `content/projects.ts`.
- [ ] Fill in `content/skills.ts` and the Home skills-preview list with your real stack.
- [ ] Write the About page bio, timeline milestones, and interests paragraph.
- [ ] Wire `ContactForm` to a real endpoint (Resend, Formspree, or a Next.js Route Handler + email API).
- [ ] Pick accent color(s) for `@theme` tokens (reference site uses a single strong blue, `#0000f2`, against near-black).
- [ ] Confirm body sans (General Sans / Geist / Neue Montreal) + install via `next/font`.
- [ ] Add real OG image / favicon, and cover images for each project.
- [ ] Pass all TODO copy (bio, positioning statement, project descriptions) through §0 checklist before shipping — no buzzwords, no em-dash-as-default, no filler adjectives.
