"use client";

import React, { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   CinematicCanvas — Full-screen fixed HTML5 Canvas
   Renders: particles, wireframe tunnel, nebula glow, mouse reactivity
   ═══════════════════════════════════════════════════════════════════ */

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  speed: number;
}

interface TunnelRing {
  z: number;
  size: number;
}

// Nebula color zones mapped to scroll progress
const ZONE_COLORS = [
  { r: 7, g: 16, b: 30 },    // Hero: deep midnight navy
  { r: 14, g: 28, b: 50 },   // Projects: slightly brighter navy
  { r: 20, g: 15, b: 45 },   // Innovation: purple-tinged
  { r: 42, g: 30, b: 12 },   // Services: warm gold
  { r: 10, g: 22, b: 36 },   // About: navy steel
  { r: 35, g: 25, b: 10 },   // Contact: warm amber
];

function interpolateColor(p: number) {
  const seg = 1 / Math.max(1, ZONE_COLORS.length - 1);
  const i = Math.min(ZONE_COLORS.length - 2, Math.floor(p / seg));
  const t = (p - i * seg) / seg;
  const c1 = ZONE_COLORS[i], c2 = ZONE_COLORS[i + 1];
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  };
}

export default function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const scrollRef = useRef({ progress: 0, velocity: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / w;
      mouseRef.current.targetY = e.clientY / h;
    };
    window.addEventListener("mousemove", handleMouse);

    // Scroll tracking
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current.velocity = scrollY - scrollRef.current.lastY;
      scrollRef.current.lastY = scrollY;
      scrollRef.current.progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── Initialize Particles ──
    const perspective = 800;
    const maxDepth = 5000;
    const particleCount = 200;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 150 + Math.random() * 600;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      particles.push({
        x, y,
        baseX: x,
        baseY: y,
        z: Math.random() * maxDepth,
        size: 0.5 + Math.random() * 2,
        color: i % 7 === 0 ? "rgba(201,169,110," :  // gold
               i % 11 === 0 ? "rgba(91,158,201," :  // cyan
               "rgba(255,255,255,",                  // white
        speed: 0.3 + Math.random() * 0.7,
      });
    }

    // ── Initialize Tunnel Rings ──
    const ringCount = 12;
    const rings: TunnelRing[] = [];
    for (let i = 0; i < ringCount; i++) {
      rings.push({ z: (i / ringCount) * maxDepth, size: 700 });
    }

    // ── Animation Loop ──
    const animate = () => {
      const cx = w / 2, cy = h / 2;
      const scroll = scrollRef.current;
      const mouse = mouseRef.current;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Mouse offset for parallax (centered at 0)
      const mx = (mouse.x - 0.5) * 80;
      const my = (mouse.y - 0.5) * 50;

      // Color zone
      const color = interpolateColor(scroll.progress);

      // ── Clear with motion trail ──
      const trailAlpha = Math.max(0.08, 0.3 - Math.abs(scroll.velocity) * 0.003);
      ctx.fillStyle = `rgba(4,4,4,${trailAlpha})`;
      ctx.fillRect(0, 0, w, h);

      // ── Nebula Glow ──
      const g1 = ctx.createRadialGradient(
        cx + mx * 0.3, cy + my * 0.3, 5,
        cx + mx * 0.3, cy + my * 0.3, Math.max(w, h) * 0.7
      );
      g1.addColorStop(0, `rgba(${color.r},${color.g},${color.b},0.22)`);
      g1.addColorStop(0.4, `rgba(${color.r},${color.g},${color.b},0.06)`);
      g1.addColorStop(1, "rgba(4,4,4,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // ── Mouse light source ──
      const g2 = ctx.createRadialGradient(
        mouse.x * w, mouse.y * h, 0,
        mouse.x * w, mouse.y * h, 250
      );
      g2.addColorStop(0, "rgba(201,169,110,0.04)");
      g2.addColorStop(1, "rgba(4,4,4,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Camera Z movement
      const time = performance.now() * 0.03;
      const camZ = scroll.progress * 15000 + time;

      // ── Tunnel Rings ──
      const strokeColor = scroll.progress > 0.35 && scroll.progress < 0.55
        ? "rgba(91,158,201," : "rgba(201,169,110,";

      const sorted = rings.map(r => {
        let rz = r.z - (camZ % maxDepth);
        if (rz < 10) rz += maxDepth;
        return { ...r, rz };
      }).sort((a, b) => b.rz - a.rz);

      ctx.lineWidth = 1;

      // Longitudinal beams
      for (let i = 0; i < sorted.length - 1; i++) {
        const r1 = sorted[i], r2 = sorted[i + 1];
        if (Math.abs(r1.rz - r2.rz) > maxDepth * 0.5) continue;
        const s1 = perspective / r1.rz, s2 = perspective / r2.rz;
        const hw1 = r1.size * s1 / 2, hh1 = r1.size * 0.6 * s1 / 2;
        const hw2 = r2.size * s2 / 2, hh2 = r2.size * 0.6 * s2 / 2;
        const op = Math.min(0.2, (1 - r1.rz / maxDepth) * 0.3);
        ctx.strokeStyle = `${strokeColor}${op})`;
        ctx.beginPath();
        // four corners connected
        ctx.moveTo(cx - hw1 + mx, cy - hh1 + my); ctx.lineTo(cx - hw2 + mx, cy - hh2 + my);
        ctx.moveTo(cx + hw1 + mx, cy - hh1 + my); ctx.lineTo(cx + hw2 + mx, cy - hh2 + my);
        ctx.moveTo(cx + hw1 + mx, cy + hh1 + my); ctx.lineTo(cx + hw2 + mx, cy + hh2 + my);
        ctx.moveTo(cx - hw1 + mx, cy + hh1 + my); ctx.lineTo(cx - hw2 + mx, cy + hh2 + my);
        ctx.stroke();
      }

      // Transverse rings
      sorted.forEach(ring => {
        const sc = perspective / ring.rz;
        const rw = ring.size * sc, rh = ring.size * 0.6 * sc;
        const op = ring.rz > 3000 ? (1 - (ring.rz - 3000) / 2000) * 0.12 :
                   ring.rz < 400 ? (ring.rz / 400) * 0.18 : 0.18;
        ctx.strokeStyle = `${strokeColor}${op})`;
        ctx.strokeRect(cx - rw / 2 + mx, cy - rh / 2 + my, rw, rh);
      });

      // ── Particles ──
      particles.forEach(p => {
        let pz = p.z - (camZ % maxDepth);
        if (pz < 10) pz += maxDepth;

        const sc = perspective / pz;
        const px = cx + p.baseX * sc + mx * (1 - pz / maxDepth);
        const py = cy + p.baseY * sc + my * (1 - pz / maxDepth);

        if (px < -50 || px > w + 50 || py < -50 || py > h + 50) return;

        const depthFade = pz > 3500 ? (1 - (pz - 3500) / 1500) :
                          pz < 200 ? pz / 200 : 1;
        const op = depthFade * 0.8;

        // Warp streaks when scrolling fast
        if (Math.abs(scroll.velocity) > 4) {
          const nextSc = perspective / (pz + scroll.velocity * 2);
          const nx = cx + p.baseX * nextSc + mx * (1 - pz / maxDepth);
          const ny = cy + p.baseY * nextSc + my * (1 - pz / maxDepth);
          ctx.strokeStyle = `${p.color}${op * 0.5})`;
          ctx.lineWidth = p.size * 0.7;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(nx, ny);
          ctx.stroke();
        } else {
          ctx.fillStyle = `${p.color}${op})`;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.3, p.size * sc * 0.4), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // ── Vignette (drawn on canvas for performance) ──
      const vg = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.25, cx, cy, Math.max(w, h) * 0.75);
      vg.addColorStop(0, "rgba(4,4,4,0)");
      vg.addColorStop(1, "rgba(4,4,4,0.85)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
