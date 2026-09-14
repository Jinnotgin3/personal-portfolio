"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface EditorialWordmarkProps {
  text?: string;
  className?: string;
}

export function EditorialWordmark({
  text = "JINENDRA",
  className = "",
}: EditorialWordmarkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`}>
      <motion.div style={{ opacity, y }}>
        {/* Monospace eyebrow */}
        <div className="mb-3 flex items-center gap-3 justify-center md:justify-start">
          <span
            className="relative flex h-2 w-2"
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          <span
            style={{
              fontFamily: "var(--font-poppins, 'JetBrains Mono', monospace)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#22d3ee",
            }}
          >
            Full-Stack Developer&nbsp;&bull;&nbsp;Machine Learning&nbsp;&bull;&nbsp;Open Source
          </span>
        </div>

        {/* The monumental JINENDRA wordmark */}
        <h1
          style={{
            fontFamily: "var(--font-serif, 'Fraunces', Georgia, serif)",
            fontSize: "clamp(3.8rem, 20vw, 22rem)",
            fontWeight: 400,
            lineHeight: 0.85,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            color: "#0000f2",
            textShadow:
              "0 0 60px rgba(0, 0, 242, 0.45), 0 0 120px rgba(0, 0, 242, 0.18)",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {text}
        </h1>
      </motion.div>
    </div>
  );
}
