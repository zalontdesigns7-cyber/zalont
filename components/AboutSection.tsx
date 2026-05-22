"use client";

import React, { useEffect, useRef, useState } from "react";



const features = [
  "Creativity with discipline and heart",
  "Future-ready AI-powered concepts",
  "Real-world engineering insight",
  "Bold, modern visual solutions",
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 50;
        const inc = target / steps;
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + inc, target);
          setCount(Math.round(cur));
          if (cur >= target) clearInterval(t);
        }, 1600 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* Small 3D rotating cube for decoration */
function SmallCube({ size = 48 }: { size?: number }) {
  const h = size / 2;
  const f = (t: string): React.CSSProperties => ({
    position: "absolute", width: size, height: size,
    border: "1px solid rgba(201,169,110,0.30)",
    background: "rgba(201,169,110,0.02)",
    transform: t,
  });
  return (
    <div style={{ width: size, height: size, perspective: 300 }}>
      <div style={{ width: size, height: size, position: "relative", transformStyle: "preserve-3d", animation: "rotate-cube 12s linear infinite" }}>
        <div style={f(`translateZ(${h}px)`)} />
        <div style={f(`translateZ(-${h}px) rotateY(180deg)`)} />
        <div style={f(`rotateY(-90deg) translateZ(${h}px)`)} />
        <div style={f(`rotateY(90deg) translateZ(${h}px)`)} />
        <div style={f(`rotateX(90deg) translateZ(${h}px)`)} />
        <div style={f(`rotateX(-90deg) translateZ(${h}px)`)} />
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: "8rem 1.5rem", position: "relative" }}>
      <div className="section-divider" style={{ maxWidth: 1280, margin: "0 auto 5rem" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <span className="dual-text" style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
          Our Mission
        </span>
        <h2 className="font-brand dual-text" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1, marginBottom: "4rem" }}>
          About Us
        </h2>

        {/* Core Values */}
        <div
          style={{ display: "grid", gap: "1px", background: "var(--border)", marginBottom: "5rem" }}
          className="md:grid-cols-3"
        >
          {[
            { title: "Innovation", text: "Pushing boundaries with future-ready AI and modern tech tools.", icon: "⚡" },
            { title: "Precision", text: "Pixel-perfect design combined with flawless engineering execution.", icon: "🎯" },
            { title: "Impact", text: "Crafting bold visual solutions that help brands, startups, and colleges stand out.", icon: "🚀" }
          ].map((v, i) => (
            <div
              key={i}
              style={{
                background: "rgba(7,16,30,0.4)",
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>{v.icon}</div>
              <h3 className="dual-text" style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
                {v.title}
              </h3>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--w60)" }}>
                {v.text}
              </p>
            </div>
          ))}
        </div>
        {/* Two-column content */}
        <div
          style={{ display: "grid", gap: "4rem", alignItems: "start" }}
          className="lg:grid-cols-2"
        >
          {/* Left */}
          <div>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--w60)", marginBottom: "1.5rem" }}>
              Founded by friends from{" "}
              <span style={{ color: "var(--gold-light)", fontWeight: 600 }}>Civil</span> and{" "}
              <span style={{ color: "var(--gold)", fontWeight: 600 }}>AI engineering</span>{" "}
              backgrounds, Zalont specialises in high-impact designs across digital, print, branding, UI/UX, and immersive media.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--w60)", marginBottom: "2.5rem" }}>
              We combine real-world insight with future-ready tools to help startups, colleges, and businesses stand out in both aesthetics and strategy.
            </p>

            {/* Pull quote */}
            <blockquote
              style={{
                padding: "1.5rem 1.75rem",
                borderLeft: "2px solid var(--gold)",
                background: "linear-gradient(105deg, rgba(201,169,110,0.04), rgba(26,74,122,0.06))",
                margin: 0,
              }}
            >
              <p className="dual-text" style={{ fontSize: "1.05rem", fontStyle: "italic", lineHeight: 1.7, fontWeight: 600 }}>
                "Design that doesn't just look good — but thinks, adapts, and connects."
              </p>
            </blockquote>
          </div>

          {/* Right — feature list with 3D decoration */}
          <div style={{ position: "relative" }}>
            {/* Floating small cube decoration */}
            <div
              className="hidden lg:block animate-float"
              style={{ position: "absolute", top: -30, right: -20, opacity: 0.5 }}
            >
              <SmallCube size={56} />
            </div>

            <div
              style={{
                border: "1px solid var(--border)",
                padding: "2.25rem",
                background: "var(--surface)",
              }}
            >
              <h3 className="dual-text" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.75rem" }}>
                What We Deliver
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        border: "1px solid var(--border-gold)",
                        background: "rgba(201,169,110,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "var(--gold)",
                        fontSize: "0.7rem",
                      }}
                    >
                      ✦
                    </div>
                    <span style={{ fontSize: "0.95rem", color: "var(--w80)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", display: "inline-block", animation: "glow-pulse 2.5s ease-in-out infinite" }} />
                <span style={{ fontSize: "0.78rem", color: "var(--w40)", letterSpacing: "0.06em" }}>Based in India · Working Globally</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}