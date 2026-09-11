export interface Project {
  slug?: string;
  title: string;
  description: string;
  tags: string[];
  category?: "Web" | "ML" | "Mobile";
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
    github: "https://github.com/jinendrashah/mirt-adaptive-testing",
  },
  {
    slug: "portfolio-website",
    title: "Personal Portfolio Website",
    description:
      "Modern, accessible portfolio built with Next.js 16, featuring smooth animations, dark mode, and optimized performance.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    category: "Web",
    image: "/projects/portfolio.png",
    hasCaseStudy: true,
    demo: "https://jinendrashah.com",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with product management, cart functionality, and secure payment integration.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Web",
    image: "/projects/ecommerce.png",
    github: "https://github.com/jinendrashah/ecommerce-platform",
    demo: "https://ecommerce-demo.vercel.app",
    hasCaseStudy: false,
  },
  {
    title: "ML Image Classification",
    description:
      "Convolutional neural network for multi-class image classification with 94% accuracy on test dataset.",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV"],
    category: "ML",
    image: "/projects/image-classification.png",
    github: "https://github.com/jinendrashah/ml-image-classifier",
    hasCaseStudy: false,
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team workflows, and priority management.",
    tags: ["React", "Firebase", "TypeScript", "Material-UI"],
    category: "Web",
    image: "/projects/task-manager.png",
    github: "https://github.com/jinendrashah/task-manager",
    demo: "https://task-manager-demo.vercel.app",
    hasCaseStudy: false,
  },
  {
    title: "Weather Forecast Dashboard",
    description:
      "Real-time weather dashboard with interactive maps, 7-day forecasts, and location-based alerts.",
    tags: ["React", "OpenWeather API", "Chart.js", "Tailwind"],
    category: "Web",
    image: "/projects/weather-dashboard.png",
    github: "https://github.com/jinendrashah/weather-dashboard",
    demo: "https://weather-demo.vercel.app",
    hasCaseStudy: false,
  },
];
