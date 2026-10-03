"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

type Particle = {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
};

type TunnelRing = {
  z: number;
  size: number;
};

type ImmersiveTunnelProps = {
  layers: React.ReactNode[];
};

function SectionLayer({
  children,
  index,
  total,
  progress,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: any;
}) {
  const isHero = index === 0;

  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;

  /*
   * IMPORTANT:
   * These transforms only animate the visual content.
   * The section itself remains in normal document flow.
   */

  const opacity = useTransform(
    progress,
    isHero
      ? [0, segment * 0.7, segment]
      : [
          Math.max(0, start - segment * 0.35),
          start,
          end,
          Math.min(1, end + segment * 0.35),
        ],
    isHero ? [1, 1, 1] : [0.35, 1, 1, 0.35]
  );

  const scale = useTransform(
    progress,
    isHero
      ? [0, segment]
      : [
          Math.max(0, start - segment * 0.35),
          start,
          end,
          Math.min(1, end + segment * 0.35),
        ],
    isHero ? [1, 1.01] : [0.97, 1, 1, 0.98]
  );

  return (
    <motion.section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        opacity,
        scale,
        transformOrigin: "center center",
        willChange: "opacity, transform",
        zIndex: 5,
      }}
    >
      {children}
    </motion.section>
  );
}

export default function ImmersiveTunnel({
  layers,
}: ImmersiveTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const [activeSection, setActiveSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /*
   * -------------------------------------------------------
   * ACTIVE SECTION
   * -------------------------------------------------------
   */

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(
      layers.length - 1,
      Math.floor(value * layers.length)
    );

    setActiveSection(index);
  });

  /*
   * -------------------------------------------------------
   * CANVAS TUNNEL
   * -------------------------------------------------------
   */

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    window.addEventListener("resize", resize);

    const maxDepth = 4500;

    const particles: Particle[] = [];

    for (let i = 0; i < 140; i++) {
      const angle = Math.random() * Math.PI * 2;

      const radius = 180 + Math.random() * 800;

      particles.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * maxDepth,
        size: 0.5 + Math.random() * 2,
        color:
          i % 6 === 0
            ? "rgba(201,169,110,0.85)"
            : "rgba(255,255,255,0.55)",
      });
    }

    const rings: TunnelRing[] = [];

    for (let i = 0; i < 14; i++) {
      rings.push({
        z: (i / 14) * maxDepth,
        size: 500 + i * 15,
      });
    }

    let currentCamera = 0;
    let targetCamera = 0;

    const animate = () => {
      const progress =
        typeof window !== "undefined"
          ? window.scrollY /
            Math.max(
              1,
              document.documentElement.scrollHeight - window.innerHeight
            )
          : 0;

      targetCamera = progress * maxDepth * 3;

      currentCamera += (targetCamera - currentCamera) * 0.055;

      ctx.clearRect(0, 0, width, height);

      /*
       * Background
       */
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      );

      gradient.addColorStop(0, "#07101e");
      gradient.addColorStop(0.45, "#030811");
      gradient.addColorStop(1, "#020408");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      /*
       * Tunnel rings
       */
      rings.forEach((ring, index) => {
        let z = ring.z - (currentCamera % maxDepth);

        if (z < 50) {
          z += maxDepth;
        }

        const perspective = 850 / z;

        const radius = ring.size * perspective;

        if (radius < 2 || radius > Math.max(width, height) * 2) {
          return;
        }

        const alpha = Math.max(
          0,
          Math.min(0.25, 1 - z / maxDepth)
        );

        ctx.beginPath();

        ctx.ellipse(
          centerX,
          centerY,
          radius,
          radius * 0.55,
          0,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle =
          index % 4 === 0
            ? `rgba(201,169,110,${alpha})`
            : `rgba(110,140,180,${alpha * 0.35})`;

        ctx.lineWidth = 1;

        ctx.stroke();
      });

      /*
       * Tunnel particles
       */
      particles.forEach((particle) => {
        let z =
          particle.z -
          (currentCamera % maxDepth);

        if (z < 30) {
          z += maxDepth;
        }

        const perspective = 850 / z;

        const x =
          centerX + particle.x * perspective;

        const y =
          centerY + particle.y * perspective;

        const size =
          Math.max(
            0.4,
            particle.size * perspective * 1.8
          );

        if (
          x < -100 ||
          x > width + 100 ||
          y < -100 ||
          y > height + 100
        ) {
          return;
        }

        const alpha = Math.max(
          0.05,
          Math.min(0.9, 1 - z / maxDepth)
        );

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = particle.color.replace(
          /[\d.]+\)$/g,
          `${alpha})`
        );

        ctx.fill();
      });

      /*
       * Central glow
       */
      const glow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.min(width, height) * 0.55
      );

      glow.addColorStop(
        0,
        "rgba(201,169,110,0.06)"
      );

      glow.addColorStop(
        0.4,
        "rgba(20,45,80,0.025)"
      );

      glow.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      ctx.fillStyle = glow;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener(
        "resize",
        resize
      );

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, []);

  /*
   * -------------------------------------------------------
   * NAVIGATION
   * -------------------------------------------------------
   */

  const scrollToSection = (index: number) => {
    const container = containerRef.current;

    if (!container) return;

    const maxScroll =
      container.offsetHeight -
      window.innerHeight;

    const target =
      (index / (layers.length - 1)) *
      maxScroll;

    window.scrollTo({
      top:
        container.offsetTop + target,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: `${layers.length * 100}vh`,
        background: "#020408",
      }}
    >
      {/* =====================================================
          FIXED TUNNEL BACKGROUND
          ===================================================== */}

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Dark cinematic vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at center, transparent 30%, rgba(2,4,8,0.72) 100%)",
        }}
      />

      {/* =====================================================
          SECTIONS
          
          IMPORTANT:
          These are NOT sticky.
          These are NOT absolute.
          They stay in normal document flow.
          ===================================================== */}

      <div
        style={{
          position: "relative",
          zIndex: 5,
          width: "100%",
        }}
      >
        {layers.map((layer, index) => (
          <SectionLayer
            key={index}
            index={index}
            total={layers.length}
            progress={scrollYProgress}
          >
            {layer}
          </SectionLayer>
        ))}
      </div>

      {/* =====================================================
          RIGHT SIDE SECTION INDICATOR
          ===================================================== */}

      <div
        className="hidden md:flex"
        style={{
          position: "fixed",
          right: "1.75rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 150,
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1rem 0.65rem",
          borderRadius: "999px",
          background:
            "rgba(2,4,8,0.48)",
          backdropFilter: "blur(14px)",
          border:
            "1px solid rgba(201,169,110,0.16)",
        }}
      >
        {layers.map((_, index) => {
          const active =
            index === activeSection;

          return (
            <button
              key={index}
              type="button"
              aria-label={`Go to section ${
                index + 1
              }`}
              onClick={() =>
                scrollToSection(index)
              }
              style={{
                width: active ? 8 : 5,
                height: active ? 28 : 5,
                padding: 0,
                border: 0,
                borderRadius: 999,
                cursor: "pointer",
                background: active
                  ? "var(--gold)"
                  : "rgba(255,255,255,0.25)",
                boxShadow: active
                  ? "0 0 14px rgba(201,169,110,0.45)"
                  : "none",
                transition:
                  "all 0.35s ease",
              }}
            />
          );
        })}
      </div>

      {/* =====================================================
          BOTTOM PROGRESS LINE
          ===================================================== */}

      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "left",
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--gold), transparent)",
          zIndex: 300,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}