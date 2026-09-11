"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GradientCarousel } from "@/components/ui/gradient-carousel";
import { projects, type Project } from "@/content/projects";

const CATEGORIES: Array<Project["category"] | "All"> = ["All", "Web", "ML", "Mobile"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Project["category"] | "All">("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen px-6 pb-32 pt-28 md:px-12">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-12">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#22d3ee",
            }}
          >
            Projects Directory
          </span>
          <h1
            className="mt-2 text-4xl font-semibold md:text-5xl"
            style={{
              color: "#f5f5f5",
              fontFamily: "var(--font-serif)",
              lineHeight: 1.1,
            }}
          >
            All Work
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            Explore the full catalogue — web engineering, machine learning, and beyond.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: isActive ? "#0000f2" : "rgba(255,255,255,0.05)",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  border: isActive
                    ? "1px solid rgba(0,0,242,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isActive ? "0 0 16px rgba(0,0,242,0.3)" : "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Carousel */}
        {filtered.length > 0 ? (
          <GradientCarousel key={activeCategory} projects={filtered} />
        ) : (
          <p style={{ color: "#94a3b8" }} className="py-24 text-center text-sm">
            No projects in this category yet.
          </p>
        )}
      </motion.div>
    </main>
  );
}
