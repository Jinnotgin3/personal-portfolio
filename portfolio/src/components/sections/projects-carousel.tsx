"use client";

import { motion } from "motion/react";
import { GradientCarousel } from "@/components/ui/gradient-carousel";
import { projects } from "@/content/projects";

// All 6 projects mapped to the 6 Stitch shader cards in the 3D ring
const featuredProjects = projects;

export function ProjectsCarousel() {
  return (
    <section className="relative py-24 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl"
      >
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-3">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#22d3ee",
            }}
          >
            02 — Featured Work
          </span>
          <h2
            className="text-3xl font-semibold md:text-4xl"
            style={{ color: "#f5f5f5", fontFamily: "var(--font-serif)" }}
          >
            Selected Projects
          </h2>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            A curated selection of my most interesting work — spanning full-stack
            web engineering and machine learning systems.
          </p>
        </div>

        <GradientCarousel projects={featuredProjects} />
      </motion.div>
    </section>
  );
}
