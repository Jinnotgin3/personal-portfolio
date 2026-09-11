"use client";

import Link from "next/link";
import { EditorialWordmark } from "@/components/sections/editorial-wordmark";
import { site } from "@/content/site";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-24 pt-32 md:px-12 md:pb-28">
      {/* Editorial wordmark block — left-aligned, fills the hero */}
      <div className="relative z-10 w-full">
        <EditorialWordmark text="JINENDRA" className="mb-8" />

        {/* Role + description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p
              className="text-lg font-medium tracking-tight md:text-xl"
              style={{ color: "#f5f5f5" }}
            >
              {site.role}
            </p>
            <p className="mt-2 leading-relaxed" style={{ color: "#94a3b8" }}>
              Building fast, accessible, and intelligent web applications with
              modern technologies and machine learning.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "#0000f2",
                boxShadow: "0 0 24px rgba(0, 0, 242, 0.35)",
              }}
            >
              View My Work
            </Link>
            <Link
              href="/about"
              className="rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                color: "#e0f2fe",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              About Me
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-[-4rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#94a3b8",
            }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-8 w-px"
            style={{ background: "linear-gradient(to bottom, #94a3b8, transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
