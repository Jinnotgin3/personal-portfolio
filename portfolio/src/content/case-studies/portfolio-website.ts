export const portfolioWebsite = {
  slug: "portfolio-website",
  title: "Personal Portfolio Website",
  summary: "A modern, high-performance portfolio built with Next.js 16, featuring smooth animations, accessibility-first design, and a custom WebGL background.",
  stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Motion", "Three.js", "Lenis"],
  links: { 
    github: "https://github.com/jinendrashah/portfolio",
    demo: "https://jinendrashah.com" 
  },
  coverImage: "/projects/portfolio.png",
  sections: [
    { 
      heading: "Problem / Context", 
      body: "Generic portfolio templates often suffer from poor performance, accessibility issues, and a distinctly 'AI-generated' aesthetic. I wanted to build a portfolio that stood out technically and visually while maintaining fast load times and WCAG AA compliance. The challenge was to create a motion-rich experience without sacrificing performance or accessibility, and to avoid common design tells like purple gradients, glassmorphism, and generic icon-box layouts." 
    },
    { 
      heading: "Approach", 
      body: "I designed the site with a bold, high-contrast aesthetic inspired by modern design systems—single flat accent color, no gradients, and a distinctive slab-serif wordmark cutout as the hero element. The tech stack uses Next.js 16 with App Router for optimal performance, Tailwind v4 with CSS-first theming, and Motion (formerly Framer Motion) for scroll-driven animations. I implemented smooth scrolling with Lenis and added a WebGL particle system using Three.js for visual interest. All animations respect prefers-reduced-motion, and I followed semantic HTML and ARIA practices throughout. The site is fully responsive with a mobile-first approach and includes proper focus management for keyboard navigation." 
    },
    { 
      heading: "Technical Highlights", 
      body: "The wordmark cutout uses SVG masking for a true knockout effect rather than CSS blend modes, ensuring cross-browser consistency. I implemented a theme toggle with next-themes that prevents flash-of-unstyled-content on initial load. The project grid uses Motion's whileInView with proper viewport margins to stagger animations without layout shift. Images are optimized with Next.js Image component, lazy-loaded below the fold, and served in modern formats. I structured content as TypeScript data files for easy maintenance and type safety across components." 
    },
    { 
      heading: "Result / Outcome", 
      body: "The site achieves 95+ Lighthouse scores across all metrics, with a Time to Interactive under 2 seconds. WAVE accessibility audit shows zero errors, with full keyboard navigation support. The design successfully avoids common AI-generated patterns while maintaining a modern, professional aesthetic. Building this portfolio taught me advanced Next.js optimization techniques, accessible animation patterns, and the importance of performance budgets in motion-rich interfaces. It also reinforced that great design comes from deliberate choices and constraints, not feature accumulation." 
    },
  ],
};
