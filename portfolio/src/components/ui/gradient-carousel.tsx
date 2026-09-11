"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { type Project } from "@/content/projects";

// The 6 shader presets matching the Stitch 3D Perspective Card Showcase
export const CARD_TEXTURES = [
  {
    bgClass: "bg-crimson-texture",
    monoColor: "text-red-300/70",
    defaultShader: "Shader 01",
    defaultTitle: "Crimson Flame",
    accentColor: "#ff2a2a",
    purpose: "crimson-card",
    specular:
      "absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none",
  },
  {
    bgClass: "bg-violet-texture",
    monoColor: "text-fuchsia-300/70",
    defaultShader: "Shader 02",
    defaultTitle: "Aurora Violet",
    accentColor: "#a832d4",
    purpose: "violet-card",
    specular:
      "absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 pointer-events-none group-hover:translate-x-1/2 transition-transform duration-1000",
  },
  {
    bgClass: "bg-cobalt-texture",
    monoColor: "text-blue-300",
    defaultShader: "Shader 03",
    defaultTitle: "Cobalt Silk",
    accentColor: "#1a4cd2",
    purpose: "cobalt-card",
    ringClass: "ring-1 ring-blue-400/20 shadow-2xl shadow-blue-600/20",
    specular:
      "absolute inset-0 opacity-40 mix-blend-soft-light bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-transparent to-black pointer-events-none",
  },
  {
    bgClass: "bg-olive-texture",
    monoColor: "text-lime-300/70",
    defaultShader: "Shader 04",
    defaultTitle: "Olive Twill",
    accentColor: "#7e9c1f",
    purpose: "olive-card",
    hasWeave: true,
    specular: "",
  },
  {
    bgClass: "bg-amber-texture",
    monoColor: "text-amber-300/70",
    defaultShader: "Shader 05",
    defaultTitle: "Amber Gold",
    accentColor: "#e67e17",
    purpose: "amber-card",
    specular:
      "absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none",
  },
  {
    bgClass: "bg-emerald-texture",
    monoColor: "text-emerald-300/70",
    defaultShader: "Shader 06",
    defaultTitle: "Emerald Silk",
    accentColor: "#059669",
    purpose: "emerald-card",
    specular:
      "absolute inset-0 opacity-30 mix-blend-soft-light bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white via-transparent to-black pointer-events-none",
  },
];

function GrainFilter() {
  return (
    <svg aria-hidden="true" className="hidden">
      <filter id="card-grain-noise">
        <feTurbulence
          baseFrequency="0.82"
          numOctaves={3}
          stitchTiles="stitch"
          type="fractalNoise"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.85 0"
        />
        <feComponentTransfer>
          <feFuncA slope={0.45} type="linear" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}

interface GradientCarouselProps {
  projects?: Project[];
  className?: string;
}

export function GradientCarousel({ projects, className = "" }: GradientCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // If projects are passed, use them; otherwise fallback to 6 default shader cards
  const displayItems =
    projects && projects.length > 0
      ? projects.map((p, i) => ({
          project: p,
          texture: CARD_TEXTURES[i % CARD_TEXTURES.length],
        }))
      : CARD_TEXTURES.map((t) => ({
          project: undefined,
          texture: t,
        }));

  const N = displayItems.length;
  const angleStep = (2 * Math.PI) / N;

  // Track active card index in state for UI controls (dots, links)
  const [activeIndex, setActiveIndex] = useState(N >= 3 ? 2 : 0);

  // Refs for animation physics loop
  const targetAngleRef = useRef(N >= 3 ? 2 * angleStep : 0);
  const currentAngleRef = useRef(N >= 3 ? 2 * angleStep : 0);
  const velocityAngleRef = useRef(0);

  // Navigation handlers
  const goToIndex = useCallback(
    (targetIndex: number) => {
      const currentNormalized = Math.round(targetAngleRef.current / angleStep);
      const currentModulo = ((currentNormalized % N) + N) % N;
      let diff = targetIndex - currentModulo;
      if (diff > N / 2) diff -= N;
      if (diff < -N / 2) diff += N;
      targetAngleRef.current = (currentNormalized + diff) * angleStep;
    },
    [angleStep, N]
  );

  const goToPrev = useCallback(() => {
    const nearest = Math.round(targetAngleRef.current / angleStep);
    targetAngleRef.current = (nearest - 1) * angleStep;
  }, [angleStep]);

  const goToNext = useCallback(() => {
    const nearest = Math.round(targetAngleRef.current / angleStep);
    targetAngleRef.current = (nearest + 1) * angleStep;
  }, [angleStep]);

  // Main 3D Scene Controller from Stitch
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".perspective-card"));
    if (!cards.length) return;

    let mouseXRatio = 0;
    let mouseYRatio = 0;

    let isDragging = false;
    let startX = 0;
    let dragStartAngle = 0;
    let lastMoveX = 0;
    let lastMoveTime = 0;
    let wheelSnapTimeout: ReturnType<typeof setTimeout> | null = null;

    let radiusX = 520;
    let depthZ = 280;

    function updateDimensions() {
      const vw = window.innerWidth;
      if (vw < 640) {
        radiusX = 260;
        depthZ = 160;
      } else if (vw < 1024) {
        radiusX = 390;
        depthZ = 220;
      } else {
        radiusX = 520;
        depthZ = 280;
      }
    }
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    function update3DPositions() {
      const tiltX = -(mouseYRatio * 6);
      const tiltY = mouseXRatio * 6;

      cards.forEach((card, index) => {
        const cardAngle = index * angleStep;

        // Normalized modulo arithmetic: maps relative angular difference strictly into [-PI, PI]
        const diff =
          (((cardAngle - currentAngleRef.current) % (2 * Math.PI)) + 3 * Math.PI) %
            (2 * Math.PI) -
          Math.PI;

        // 3D Circular coordinates
        const x = Math.sin(diff) * radiusX;
        const z = (Math.cos(diff) - 1) * depthZ;
        const rotateY = -diff * (180 / Math.PI) * 0.75;
        const cosFactor = Math.max(0, (Math.cos(diff) + 1) / 2);
        const scale = 0.65 + 0.35 * cosFactor;

        // Smooth opacity transition across the loop horizons
        const absDiff = Math.abs(diff);
        let opacity = 1;
        if (absDiff > Math.PI * 0.82) {
          opacity = 0.08 + ((Math.PI - absDiff) / (Math.PI * 0.18)) * 0.22;
        } else {
          opacity = 0.25 + 0.75 * Math.pow(cosFactor, 1.3);
        }

        // Dynamic z-index based on depth
        const zIndex = Math.round(1000 + z);
        card.style.zIndex = `${zIndex}`;
        card.style.opacity = `${Math.max(0.04, opacity)}`;

        if (card.matches(":hover") && !isDragging && cosFactor > 0.6) {
          card.style.transform = `translate3d(${x}px, 0px, ${z + 30}px) rotateY(${
            rotateY + tiltY
          }deg) rotateX(${tiltX}deg) scale(${scale * 1.03})`;
        } else {
          card.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${
            rotateY + tiltY
          }deg) rotateX(${tiltX}deg) scale(${scale})`;
        }

        card.style.pointerEvents = cosFactor < 0.25 ? "none" : "auto";
      });
    }

    let lastActive = N >= 3 ? 2 : 0;
    let animId: number;
    function renderLoop() {
      const lerpFactor = isDragging ? 0.35 : 0.12;
      currentAngleRef.current += (targetAngleRef.current - currentAngleRef.current) * lerpFactor;

      update3DPositions();

      const nearestStep = Math.round(currentAngleRef.current / angleStep);
      const modIndex = ((nearestStep % N) + N) % N;
      if (lastActive !== modIndex) {
        lastActive = modIndex;
        setActiveIndex(modIndex);
      }

      animId = requestAnimationFrame(renderLoop);
    }
    animId = requestAnimationFrame(renderLoop);

    // Mouse wheel interaction
    const handleWheel = (e: WheelEvent) => {
      // Don't prevent default so page can scroll, but rotate carousel smoothly
      const step = (e.deltaY / 360) * angleStep;
      targetAngleRef.current += step;

      if (wheelSnapTimeout) clearTimeout(wheelSnapTimeout);
      wheelSnapTimeout = setTimeout(() => {
        const nearestCardIndex = Math.round(targetAngleRef.current / angleStep);
        targetAngleRef.current = nearestCardIndex * angleStep;
      }, 160);
    };
    container.addEventListener("wheel", handleWheel, { passive: true });

    // Pointer drag interaction
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isDragging = true;
      startX = e.clientX;
      dragStartAngle = targetAngleRef.current;
      lastMoveX = e.clientX;
      lastMoveTime = performance.now();
      velocityAngleRef.current = 0;

      container.classList.add("cursor-grabbing");
      container.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseXRatio = (e.clientX - rect.left) / rect.width - 0.5;
      mouseYRatio = (e.clientY - rect.top) / rect.height - 0.5;

      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const cardStepPx = Math.max(260, window.innerWidth * 0.24);
      targetAngleRef.current = dragStartAngle - (deltaX / cardStepPx) * angleStep;

      const now = performance.now();
      const dt = now - lastMoveTime;
      if (dt > 0) {
        const frameDeltaAngle = -((e.clientX - lastMoveX) / cardStepPx) * angleStep;
        velocityAngleRef.current = frameDeltaAngle / dt;
        lastMoveX = e.clientX;
        lastMoveTime = now;
      }
    };

    const handleDragEnd = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      container.classList.remove("cursor-grabbing");

      try {
        if (e && e.pointerId) container.releasePointerCapture(e.pointerId);
      } catch (_) {}

      // Apply momentum release & snap to nearest card angle along the endless circle
      const projectedAngle = targetAngleRef.current + velocityAngleRef.current * 140;
      const snappedIndex = Math.round(projectedAngle / angleStep);
      targetAngleRef.current = snappedIndex * angleStep;
    };

    const handleMouseLeave = () => {
      mouseXRatio = 0;
      mouseYRatio = 0;
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handleDragEnd);
    container.addEventListener("pointercancel", handleDragEnd);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Direct click on card brings it into center front
    const handleCardClicks = cards.map((card) => {
      const onClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("a, button")) return;
        if (Math.abs(velocityAngleRef.current) > 0.002) return;
        const index = parseInt(card.getAttribute("data-index") || "0", 10);
        if (!isNaN(index)) {
          const currentNormalized = Math.round(targetAngleRef.current / angleStep);
          const currentModulo = ((currentNormalized % N) + N) % N;
          let diff = index - currentModulo;
          if (diff > N / 2) diff -= N;
          if (diff < -N / 2) diff += N;
          targetAngleRef.current = (currentNormalized + diff) * angleStep;
        }
      };
      card.addEventListener("click", onClick);
      return { card, onClick };
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateDimensions);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handleDragEnd);
      container.removeEventListener("pointercancel", handleDragEnd);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (wheelSnapTimeout) clearTimeout(wheelSnapTimeout);
      handleCardClicks.forEach(({ card, onClick }) => card.removeEventListener("click", onClick));
    };
  }, [angleStep, N]);

  return (
    <div className={`relative w-full select-none ${className}`}>
      <GrainFilter />

      {/* Ambient Background Glow from Stitch */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        data-purpose="ambient-backdrop"
      >
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 h-[750px] w-[1200px] rounded-full bg-gradient-to-b from-[#14264f]/40 via-[#0a1631]/20 to-transparent blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#02060d] via-[#050b14] to-transparent" />
      </div>

      {/* Outer Perspective Viewport */}
      <section
        id="deck-viewport"
        ref={containerRef}
        className="scene-container cursor-grab active:cursor-grabbing flex w-full touch-none items-center justify-center overflow-hidden px-4 py-8 md:py-12"
        data-purpose="3d-card-carousel"
      >
        <div
          id="cards-track"
          ref={trackRef}
          className="cards-ring will-change-transform select-none"
        >
          {displayItems.map(({ project, texture }, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={project?.slug || project?.title || index}
                data-index={index}
                data-purpose={texture.purpose}
                className={`perspective-card group card-border-glow h-[340px] w-[240px] select-none overflow-hidden rounded-[32px] sm:h-[400px] sm:w-[290px] md:h-[450px] md:w-[330px] lg:h-[490px] lg:w-[370px] ${
                  texture.ringClass || ""
                }`}
              >
                {/* Gradient Fill */}
                <div
                  className={`pointer-events-none absolute inset-0 ${texture.bgClass} transition-transform duration-700 group-hover:scale-105`}
                />

                {/* Fabric weave pattern (for Olive card) */}
                {texture.hasWeave && (
                  <div className="olive-weave pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
                )}

                {/* Tactile Grain Noise from Stitch */}
                <div
                  className="grain-overlay"
                  style={{ filter: "url(#card-grain-noise)" }}
                />

                {/* Specular Surface Shine / Light Beam */}
                {texture.specular && <div className={texture.specular} />}

                {/* Top Category Tag if project exists */}
                {project?.category && (
                  <div className="pointer-events-none absolute left-6 top-6">
                    <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[10px] tracking-wider text-white/80 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                )}

                {/* Bottom Soft Label Overlay from Stitch */}
                <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex flex-col gap-3">
                  <div className="flex items-end justify-between text-white/80 transition-colors duration-300 group-hover:text-white">
                    <div>
                      <p
                        className={`font-mono text-xs uppercase tracking-widest ${texture.monoColor}`}
                      >
                        {project ? `${project.category || "Project"} · ${texture.defaultShader}` : texture.defaultShader}
                      </p>
                      <h3 className="mt-0.5 text-base font-medium tracking-tight sm:text-lg">
                        {project ? project.title : texture.defaultTitle}
                      </h3>
                    </div>
                    <div className="flex h-8 w-8 shrink-0 translate-y-1 transform items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="text-xs">↗</span>
                    </div>
                  </div>

                  {/* Project Summary preview */}
                  {project && (
                    <div className="hidden flex-col gap-2 sm:flex">
                      <p className="line-clamp-2 text-xs leading-relaxed text-white/70">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/80 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons (only interactive on active front card) */}
                  {project && isActive && (
                    <div className="pointer-events-auto flex flex-wrap gap-2 pt-1">
                      {project.hasCaseStudy && project.slug && (
                        <Link
                          href={`/projects/${project.slug}`}
                          className="rounded-full bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-md shadow-blue-500/30 transition-all hover:scale-105 hover:bg-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Case Study
                        </Link>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-white/20 bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/25"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Live Demo ↗
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60 hover:text-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Carousel Navigation Controls from Stitch */}
      <div className="flex items-center justify-center gap-6 pt-6">
        <button
          id="btn-prev"
          onClick={goToPrev}
          aria-label="Previous project"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-slate-300 shadow-lg transition-all duration-200 hover:scale-110 hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          ‹
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {displayItems.map((_, i) => (
            <button
              key={i}
              data-dot={i}
              onClick={() => goToIndex(i)}
              aria-label={`Go to item ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
              className={
                i === activeIndex
                  ? "page-dot h-1.5 w-11 cursor-pointer rounded-full bg-blue-500 shadow-sm shadow-blue-500/50 transition-all duration-300"
                  : "page-dot h-1.5 w-7 cursor-pointer rounded-full bg-slate-700 transition-all duration-300 hover:bg-slate-500"
              }
            />
          ))}
        </div>

        <button
          id="btn-next"
          onClick={goToNext}
          aria-label="Next project"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-slate-300 shadow-lg transition-all duration-200 hover:scale-110 hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          ›
        </button>
      </div>
    </div>
  );
}
