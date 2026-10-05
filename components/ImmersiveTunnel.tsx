"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ─────────────────────────────────────
   TYPES
───────────────────────────────────── */
type Particle   = { x: number; y: number; z: number; size: number; color: string };
type TunnelRing = { z: number; size: number };
type ImmersiveTunnelProps = { layers: React.ReactNode[] };

/* ─────────────────────────────────────
   PER-SECTION FADE WRAPPER
   Sections live in NORMAL document flow
   (no sticky, no height clipping).
   Scroll drives a gentle fade-in from
   below and fade-out upward.
───────────────────────────────────── */
function FadeSection({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isHero = index === 0;

  /*
   * offset ["start end", "end start"]:
   *   progress = 0  →  section TOP  at viewport BOTTOM  (just arriving)
   *   progress = 1  →  section BOTTOM at viewport TOP   (just leaving)
   *
   * For the hero we want a softer exit so we use ["start start","end start"]
   *   progress = 0  →  hero top at viewport top (locked)
   *   progress = 1  →  hero bottom at viewport top (fully scrolled away)
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isHero
      ? ["start start", "end start"]
      : ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping:   30,
    restDelta: 0.0005,
  });

  /* ── HERO exit only ───────────────────────────────────── */
  const heroOpacity = useTransform(smooth, [0, 0.55, 0.88, 1], [1,  1,  0.25, 0]);
  const heroScale   = useTransform(smooth, [0, 0.55, 0.88, 1], [1,  1,  1.06, 1.14]);
  const heroY       = useTransform(smooth, [0, 0.55, 1],        [0,  0,  -45]);
  const heroBlur    = useTransform(smooth, [0, 0.55, 0.88, 1],  [0,  0,  3,   9]);

  /* ── ALL OTHER SECTIONS: enter from below, exit upward ── */
  // progress timeline with ["start end","end start"]:
  //   0.00  →  section top at viewport bottom  (fully off-screen below)
  //   ~0.12 →  section scrolls to ~88% from top of vp (partially visible)
  //   ~0.25 →  section top reaches viewport top
  //   ~0.75 →  section bottom reaches viewport bottom
  //   1.00  →  section bottom at viewport top (fully off-screen above)
  //
  // We want:
  //   FADE IN:  0.00 → 0.18   (section rising into view from below)
  //   HOLD:     0.18 → 0.80   (fully visible, readable)
  //   FADE OUT: 0.80 → 1.00   (section leaving above)
  const secOpacity = useTransform(smooth,
    [0,    0.10,  0.20,  0.78,  0.92,  1.0 ],
    [0,    0.7,   1.0,   1.0,   0.25,  0.0 ]
  );
  const secScale = useTransform(smooth,
    [0,    0.10,  0.22,  0.78,  0.92,  1.0 ],
    [0.92, 0.97,  1.00,  1.00,  1.05,  1.12]
  );
  const secY = useTransform(smooth,
    [0,    0.10,  0.22,  0.78,  0.92,  1.0 ],
    [45,   10,    0,     0,     -12,   -40 ]
  );
  const secBlur = useTransform(smooth,
    [0,    0.10,  0.22,  0.78,  0.92,  1.0 ],
    [8,    2,     0,     0,     2,     8   ]
  );

  const opacity = isHero ? heroOpacity : secOpacity;
  const scale   = isHero ? heroScale   : secScale;
  const y       = isHero ? heroY       : secY;
  const blur    = isHero ? heroBlur    : secBlur;

  const filter = useTransform(blur, (b: number) =>
    b < 0.2 ? "none" : `blur(${b.toFixed(1)}px)`
  );

  return (
    <div
      ref={ref}
      data-section={index}
      style={{ position: "relative", width: "100%", zIndex: 5 }}
    >
      <motion.div
        style={{
          opacity,
          scale,
          y,
          filter,
          transformOrigin: "50% 40%",
          willChange: "opacity, transform, filter",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────── */
export default function ImmersiveTunnel({ layers }: ImmersiveTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const animRef      = useRef<number | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  /* Global scroll progress for the bottom progress bar */
  const { scrollYProgress } = useScroll();

  /* ── Active section tracker ────────── */
  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.45;
      document.querySelectorAll("[data-section]").forEach((el) => {
        const top    = (el as HTMLElement).offsetTop;
        const bottom = top + (el as HTMLElement).offsetHeight;
        if (mid >= top && mid < bottom) {
          setActiveSection(Number(el.getAttribute("data-section")));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Canvas tunnel ─────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const MAX = 4500;
    const particles: Particle[] = Array.from({ length: 220 }, (_, i) => {
      const a = Math.random() * Math.PI * 2;
      const r = 160 + Math.random() * 950;
      return {
        x: Math.cos(a) * r, y: Math.sin(a) * r,
        z: Math.random() * MAX,
        size: 0.6 + Math.random() * 2.8,
        color: i % 4 === 0 
          ? "rgba(201,169,110,0.95)" 
          : i % 4 === 1 
          ? "rgba(100,180,255,0.75)" 
          : "rgba(255,255,255,0.65)",
      };
    });
    const rings: TunnelRing[] = Array.from({ length: 22 }, (_, i) => ({
      z: (i / 22) * MAX, size: 460 + i * 22,
    }));

    let cam = 0, target = 0;

    const draw = () => {
      const p = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      target = p * MAX * 3.2;
      const delta = target - cam;
      cam += delta * 0.06;

      ctx.clearRect(0, 0, W, H);

      /* bg */
      const bg = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H));
      bg.addColorStop(0, "#081426"); bg.addColorStop(0.45, "#040a14"); bg.addColorStop(1, "#020408");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2;

      /* rings */
      rings.forEach((ring, i) => {
        let z = ring.z - (cam % MAX); if (z < 50) z += MAX;
        const p = 850 / z, r = ring.size * p;
        if (r < 2 || r > Math.max(W, H) * 2) return;
        const a = Math.max(0, Math.min(0.38, 1 - z / MAX));
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.52, 0, 0, Math.PI * 2);
        ctx.strokeStyle = i % 3 === 0 ? `rgba(201,169,110,${a})` : `rgba(110,160,235,${a * 0.45})`;
        ctx.lineWidth = 1.2; ctx.stroke();
      });

      /* particles */
      particles.forEach((pt) => {
        let z = pt.z - (cam % MAX); if (z < 30) z += MAX;
        const persp = 850 / z;
        const px = cx + pt.x * persp, py = cy + pt.y * persp;
        const sz = Math.max(0.5, pt.size * persp * 1.8);
        if (px < -100 || px > W + 100 || py < -100 || py > H + 100) return;
        const a = Math.max(0.06, Math.min(0.95, 1 - z / MAX));

        if (Math.abs(delta) > 2) {
          const sf = Math.min(0.08, Math.max(-0.08, delta * 0.00025));
          ctx.beginPath(); ctx.moveTo(px, py);
          ctx.lineTo(px + (px - cx) * sf, py + (py - cy) * sf);
          ctx.strokeStyle = pt.color.replace(/[\d.]+\)$/, `${(a * 0.65).toFixed(2)})`);
          ctx.lineWidth = Math.max(0.6, sz * 0.75); ctx.stroke();
        }

        ctx.beginPath(); ctx.arc(px, py, sz, 0, Math.PI * 2);
        ctx.fillStyle = pt.color.replace(/[\d.]+\)$/, `${a.toFixed(2)})`);
        ctx.fill();
      });

      /* glow */
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.6);
      glow.addColorStop(0, "rgba(201,169,110,0.10)");
      glow.addColorStop(0.35, "rgba(26,74,122,0.06)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  /* ── Navigate to section ────────────── */
  const goTo = (i: number) => {
    const el = document.querySelector(`[data-section="${i}"]`) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", background: "#020408" }}>

      {/* Fixed tunnel canvas */}
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: "fixed", inset: 0,
        width: "100vw", height: "100vh",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* Vignette */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(circle at 50% 48%, transparent 45%, rgba(2,4,8,0.45) 100%)",
      }} />

      {/* Sections in NORMAL FLOW — no sticky, no height clipping */}
      <div style={{ position: "relative", zIndex: 5, width: "100%" }}>
        {layers.map((layer, i) => (
          <FadeSection key={i} index={i}>
            {layer}
          </FadeSection>
        ))}
      </div>

      {/* Dot nav */}
      <div className="hidden md:flex" style={{
        position: "fixed", right: "1.75rem", top: "50%",
        transform: "translateY(-50%)", zIndex: 150,
        flexDirection: "column", alignItems: "center", gap: "0.75rem",
        padding: "1rem 0.65rem", borderRadius: 999,
        background: "rgba(2,4,8,0.5)", backdropFilter: "blur(14px)",
        border: "1px solid rgba(201,169,110,0.18)",
      }}>
        {layers.map((_, i) => {
          const active = i === activeSection;
          return (
            <button key={i} type="button" aria-label={`Go to section ${i + 1}`} onClick={() => goTo(i)} style={{
              width: active ? 8 : 5, height: active ? 28 : 5,
              padding: 0, border: 0, borderRadius: 999, cursor: "pointer",
              background: active ? "var(--gold)" : "rgba(255,255,255,0.25)",
              boxShadow: active ? "0 0 14px rgba(201,169,110,0.5)" : "none",
              transition: "all 0.35s ease",
            }} />
          );
        })}
      </div>

      {/* Bottom progress bar */}
      <motion.div style={{
        scaleX: scrollYProgress, transformOrigin: "left",
        position: "fixed", left: 0, bottom: 0,
        width: "100%", height: 1,
        background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
        zIndex: 300, pointerEvents: "none",
      }} />
    </div>
  );
}