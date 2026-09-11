"use client";

import { useEffect, useRef } from "react";

export function StarBurstBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let originX = width * 0.5;
    let originY = height * 1.0;
    let maxRadius = Math.hypot(width * 0.5, height);

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      originX = width * 0.5;
      originY = height * 1.0;
      maxRadius = Math.hypot(width * 0.5, height);
    }
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 650;
    const colors = [
      { r: 245, g: 235, b: 255 }, // pure white-violet highlight
      { r: 216, g: 180, b: 254 }, // light lilac / lavender
      { r: 192, g: 132, b: 252 }, // vibrant violet
      { r: 168, g: 85, b: 247 },  // rich royal purple
      { r: 232, g: 121, b: 249 }, // magenta flare
      { r: 147, g: 51, b: 234 },  // deep interstellar violet
    ];

    class Star {
      angle!: number;
      dist!: number;
      prevDist!: number;
      baseSpeed!: number;
      colorIndex!: number;
      size!: number;
      trailMultiplier!: number;
      opacity!: number;

      constructor(randomizeDistance = true) {
        this.reset(randomizeDistance);
      }

      reset(randomizeDistance = false) {
        const minAngle = Math.PI + 0.05;
        const maxAngle = Math.PI * 2.0 - 0.05;
        this.angle = minAngle + Math.random() * (maxAngle - minAngle);

        this.dist = randomizeDistance
          ? Math.pow(Math.random(), 1.6) * maxRadius
          : 2 + Math.random() * 20;

        this.baseSpeed = 0.35 + Math.random() * 0.65;
        this.colorIndex = Math.floor(Math.random() * colors.length);
        this.size = 0.75 + Math.random() * 1.5;
        this.trailMultiplier = 1.2 + Math.random() * 1.8;
        this.opacity = 0.15 + Math.random() * 0.45;
      }

      update(speedDelta: number) {
        const effectiveSpeed = this.baseSpeed + speedDelta;
        this.prevDist = this.dist;
        this.dist += effectiveSpeed;

        if (this.dist > maxRadius * 1.05) {
          this.dist = 1 + Math.random() * 15;
          this.prevDist = this.dist;
        } else if (this.dist < 1) {
          this.dist = maxRadius * (0.9 + Math.random() * 0.15);
          this.prevDist = this.dist;
        }
      }
    }

    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new Star(true));
    }

    let targetSpeed = 0.25;
    let currentSpeed = 0.25;
    const AMBIENT_SPEED = 0.25;

    // Page scroll interaction (gentle, dampened impulse for calm background)
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const dy = window.scrollY - lastScrollY;
      targetSpeed += dy * 0.012;
      targetSpeed = Math.max(Math.min(targetSpeed, 6.5), -6.5);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Drag interaction (mouse / pointer)
    let isDragging = false;
    let lastPointerY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastPointerY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = e.clientY - lastPointerY;
      lastPointerY = e.clientY;
      targetSpeed += delta * 0.035;
      targetSpeed = Math.max(Math.min(targetSpeed, 6.5), -6.5);
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        lastPointerY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const touchY = e.touches[0].clientY;
      const delta = touchY - lastPointerY;
      lastPointerY = touchY;
      targetSpeed += delta * 0.045;
      targetSpeed = Math.max(Math.min(targetSpeed, 6.5), -6.5);
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Animation Loop with batched canvas draws
    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);

      currentSpeed += (targetSpeed - currentSpeed) * 0.07;
      targetSpeed += (AMBIENT_SPEED - targetSpeed) * 0.035;

      ctx!.clearRect(0, 0, width, height);

      const speedDelta = currentSpeed;
      ctx!.lineCap = "round";

      // Render star streaks
      for (let i = 0; i < STAR_COUNT; i++) {
        const star = stars[i];
        star.update(speedDelta);

        const cos = Math.cos(star.angle);
        const sin = Math.sin(star.angle);

        const x = originX + cos * star.dist;
        const y = originY + sin * star.dist;

        const streakFactor = Math.min(
          Math.max((star.baseSpeed + speedDelta) * star.trailMultiplier, -16),
          16
        );
        const prevX = originX + cos * (star.dist - streakFactor);
        const prevY = originY + sin * (star.dist - streakFactor);

        const radialFrac = Math.min(Math.max(star.dist / maxRadius, 0), 1);
        const alpha = star.opacity * Math.sin(radialFrac * Math.PI) * 0.70;

        if (alpha <= 0.015) continue;

        const c = colors[star.colorIndex];
        const a = Math.min(alpha, 0.60);

        ctx!.beginPath();
        ctx!.moveTo(prevX, prevY);
        ctx!.lineTo(x, y);
        ctx!.strokeStyle = `rgba(${c.r},${c.g},${c.b},${a})`;
        ctx!.lineWidth = star.size;
        ctx!.stroke();

        // Star core glint (softened glare)
        if (alpha > 0.35 && Math.abs(streakFactor) < 8) {
          ctx!.beginPath();
          ctx!.arc(x, y, star.size * 0.55, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255,255,255,${Math.min(alpha * 0.45, 0.6)})`;
          ctx!.fill();
        }
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#030106]"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        id="warp-canvas"
        className="absolute inset-0 block w-full h-full"
        style={{ zIndex: 1 }}
      />
      <div className="singularity-glow" />
      <div className="singularity-core" />
      <div className="vignette" />
    </div>
  );
}
