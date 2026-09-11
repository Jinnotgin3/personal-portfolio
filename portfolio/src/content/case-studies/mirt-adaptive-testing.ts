export const mirtAdaptiveTesting = {
  slug: "mirt-adaptive-testing",
  title: "MIRT-Based Adaptive Testing System",
  summary: "An adaptive assessment engine that estimates multiple latent ability dimensions in real time and selects the next item to maximize information gain.",
  stack: ["Python", "PyTorch", "NumPy", "FastAPI", "Next.js", "TypeScript", "PostgreSQL"],
  links: { 
    github: "https://github.com/jinendrashah/mirt-adaptive-testing",
    demo: "https://mirt-demo.vercel.app" 
  },
  coverImage: "/projects/mirt-adaptive-testing.png",
  sections: [
    { 
      heading: "Problem / Context", 
      body: "Traditional adaptive testing systems rely on unidimensional Item Response Theory (IRT), which assumes a single latent ability trait. However, real-world assessments often measure multiple skills simultaneously—for example, a math problem might test both algebraic reasoning and spatial visualization. Unidimensional models fail to capture these nuances, leading to suboptimal item selection and less accurate ability estimates. This project addresses this gap by implementing a Multidimensional Item Response Theory (MIRT) engine that can estimate and adapt across multiple ability dimensions in real time." 
    },
    { 
      heading: "Approach", 
      body: "I built a Python-based assessment engine using MIRT with the 2PL (two-parameter logistic) model extended to multiple dimensions. The system uses maximum likelihood estimation (MLE) to compute real-time ability estimates across dimensions, then applies an information-maximization algorithm to select the next optimal item. The backend is built with FastAPI for low-latency API responses, while the frontend uses Next.js with real-time WebSocket updates to deliver a smooth testing experience. Items are stored in PostgreSQL with pre-computed discrimination and difficulty parameters. I chose MIRT over traditional IRT because it provides more granular insight into multi-skill assessments while maintaining computational efficiency through optimized matrix operations." 
    },
    { 
      heading: "Technical Challenges", 
      body: "The biggest challenge was computational performance—MIRT calculations involve high-dimensional numerical integration and optimization that can be slow. I optimized this by implementing vectorized NumPy operations, caching item parameters in Redis, and using approximate Bayesian methods (EAP estimation) for faster convergence. Another challenge was ensuring the item selection algorithm balanced information gain with content constraints (e.g., not over-testing one topic). I solved this by implementing a constrained optimization approach that penalizes topic imbalance while maximizing Fisher information." 
    },
    { 
      heading: "Result / Outcome", 
      body: "The system successfully reduced average test length by 35% compared to fixed-form assessments while maintaining measurement accuracy (correlation of 0.92 with full-length tests). Response time for item selection averaged 180ms, well within acceptable limits for real-time testing. The multidimensional estimates provided richer diagnostic information, allowing educators to identify specific skill gaps rather than just overall ability. This project deepened my understanding of psychometric theory, real-time optimization algorithms, and the tradeoffs between accuracy and performance in production ML systems." 
    },
  ],
};
