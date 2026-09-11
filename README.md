# Jinendra Shah - Portfolio Website

A modern, high-performance portfolio website built with Next.js 16, featuring smooth animations, accessibility-first design, and a stunning WebGL background.

## ✨ Features

- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Smooth Animations**: Motion (Framer Motion) with Lenis smooth scrolling
- **WebGL Graphics**: Three.js particle system background
- **Dark Mode**: System-aware theme with smooth transitions
- **Fully Responsive**: Mobile-first design with hamburger menu
- **Accessibility**: WCAG AA compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized**: Proper meta tags, OpenGraph, and semantic HTML
- **Type Safe**: Full TypeScript coverage
- **Performance**: Optimized builds with static generation

## 🎨 Design Highlights

- Bold slab-serif wordmark cutout hero (avoiding AI-generated aesthetics)
- High-contrast color scheme with single accent color
- No gradients, glassmorphism, or generic icon layouts
- Scroll-driven animations with `prefers-reduced-motion` support
- Project case studies with detailed technical breakdowns
- Interactive project filtering by category

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   ├── projects/           # Projects page & case studies
│   │   │   └── [slug]/         # Dynamic case study pages
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles & Tailwind config
│   ├── components/             # React components
│   │   ├── hero/               # Hero section components
│   │   ├── layout/             # Header, Footer, Theme Toggle
│   │   ├── sections/           # Page sections
│   │   └── ui/                 # UI components
│   ├── content/                # Content data files
│   │   ├── case-studies/       # Case study content
│   │   ├── projects.ts         # Project data
│   │   ├── skills.ts           # Skills data
│   │   └── site.ts             # Site metadata
│   └── lib/                    # Utilities & providers
└── public/                     # Static assets
    └── projects/               # Project images
```

## 🎨 Customization

### Update Personal Information

Edit `src/content/site.ts`:
```typescript
export const site = {
  name: "Your Name",
  role: "Your Role",
  email: "your.email@example.com",
  location: "Your City",
  tagline: "Your tagline",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    instagram: "https://instagram.com/yourusername",
  },
  resumeUrl: "/resume.pdf",
};
```

### Add Projects

Edit `src/content/projects.ts` to add or modify projects:
```typescript
{
  slug: "project-slug",
  title: "Project Title",
  description: "Brief description",
  tags: ["React", "TypeScript"],
  category: "Web",
  image: "/projects/image.png",
  hasCaseStudy: true,
  github: "https://github.com/...",
  demo: "https://demo.com"
}
```

### Add Case Studies

Create a new file in `src/content/case-studies/` and add it to the case studies map in `src/app/projects/[slug]/page.tsx`.

### Update Skills

Edit `src/content/skills.ts`:
```typescript
export const skills = {
  Languages: ["Python", "TypeScript", "..."],
  Frontend: ["React", "Next.js", "..."],
  // ... more categories
};
```

### Theme Colors

Edit `src/app/globals.css`:
```css
@theme {
  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
  --color-accent: #0000f2;  /* Change accent color */
}
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and deploy

### Other Platforms

Build the static site:
```bash
npm run build
```

The output will be in the `.next` folder. Follow your hosting provider's instructions for deploying Next.js apps.

## 🎯 SEO & Performance

- Lighthouse score: 95+ across all metrics
- Semantic HTML with proper heading hierarchy
- OpenGraph and Twitter Card meta tags
- Optimized images with Next.js Image component
- Static generation for optimal performance

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management
- `prefers-reduced-motion` support
- Screen reader friendly

## 📝 Content Strategy

### Bio & About
Update the About page (`src/app/about/page.tsx`) with your personal story, journey, and interests.

### Timeline
Customize milestones in `src/components/sections/timeline.tsx` with your academic and professional journey.

### Case Studies
Write detailed technical case studies that showcase:
- Problem/Context
- Technical Approach
- Challenges & Solutions
- Results & Learnings

## 🔧 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| 3D/WebGL | Three.js |
| Smooth Scroll | Lenis |
| Theme | next-themes |
| Icons | SVG (inline) |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Jinendra Shah - [jinendrashah333@gmail.com](mailto:jinendrashah333@gmail.com)

---

Built with ❤️ by Jinendra Shah
