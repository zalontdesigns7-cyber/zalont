"use client";

import React, { useEffect, useState } from "react";

const roles = ["Design", "AI", "Engineering", "Innovation", "Branding"];

/* ── CSS 3D Wireframe Cube ── */
function WireframeCube({ size = 100 }: { size?: number }) {
  const s = size;
  const half = s / 2;
  const faceStyle = (transform: string): React.CSSProperties => ({
    position: "absolute",
    width: s,
    height: s,
    border: "1px solid rgba(201,169,110,0.45)",
    background: "rgba(201,169,110,0.025)",
    transform,
  });
  return (
    <div
      style={{
        perspective: 600,
        width: s,
        height: s,
      }}
    >
      <div
        style={{
          width: s,
          height: s,
          position: "relative",
          transformStyle: "preserve-3d",
          animation: "rotate-cube 16s linear infinite",
        }}
      >
        <div style={faceStyle(`translateZ(${half}px)`)} />
        <div style={faceStyle(`translateZ(-${half}px) rotateY(180deg)`)} />
        <div style={faceStyle(`rotateY(-90deg) translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateY(90deg) translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateX(90deg) translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateX(-90deg) translateZ(${half}px)`)} />
      </div>
    </div>
  );
}

/* ── CSS Rotating Ring ── */
function Ring3D({ size = 120, speed = "22s", color = "rgba(201,169,110,0.30)" }: { size?: number; speed?: string; color?: string }) {
  return (
    <div style={{ width: size, height: size, perspective: 400 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: `1px solid ${color}`,
          animation: `spin-tilt ${speed} linear infinite`,
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 350);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 1.5rem",
        paddingTop: "80px",
      }}
    >
      {/* Scan line effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(to right, transparent, rgba(201,169,110,0.15), transparent)",
            animation: "scan-line 6s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
      </div>

      {/* 3D Wireframe Cube — right side (desktop) */}
      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          right: "8%",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.65,
        }}
      >
        <WireframeCube size={140} />
      </div>

      {/* 3D Ring — left side (desktop) */}
      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          left: "6%",
          top: "35%",
          opacity: 0.5,
        }}
      >
        <Ring3D size={100} speed="18s" />
      </div>

      {/* Small floating cube — top left */}
      <div
        className="hidden lg:block animate-float"
        style={{
          position: "absolute",
          top: "18%",
          left: "14%",
          opacity: 0.35,
        }}
      >
        <WireframeCube size={52} />
      </div>

      {/* Small ring — bottom right area */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: "18%",
          right: "14%",
          opacity: 0.35,
          animation: "float-alt 10s ease-in-out infinite",
        }}
      >
        <Ring3D size={70} speed="28s" color="rgba(201,169,110,0.40)" />
      </div>

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          width: "100%",
          animation: "reveal-up 0.9s ease both",
        }}
      >
        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 1rem",
              border: "1px solid rgba(91,158,201,0.25)",
              background: "linear-gradient(105deg, rgba(201,169,110,0.06), rgba(26,74,122,0.10))",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--gold), #3d85be)",
                display: "inline-block",
                animation: "glow-pulse 2s ease-in-out infinite",
              }}
            />
            <span className="dual-text">Creative · Tech · Studio</span>
          </span>
        </div>

        {/* Main title */}
        <h1
          className="font-brand dual-text gold-glow"
          style={{
            fontSize: "clamp(5rem, 16vw, 12rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            marginBottom: "1.75rem",
            paddingRight: "0.15em", // Prevents the 'T' from being clipped by background-clip
          }}
        >
          ZALONT
        </h1>

        {/* Role cycling */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2.5rem",
            minHeight: "2rem",
          }}
        >
          <div style={{ height: 1, width: 48, background: "linear-gradient(to right, transparent, var(--gold))", opacity: 0.4 }} />
          <span
            className="dual-text"
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              minWidth: 130,
              display: "inline-block",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(6px)",
            }}
          >
            {roles[roleIdx]}
          </span>
          <div style={{ height: 1, width: 48, background: "linear-gradient(to left, transparent, var(--gold))", opacity: 0.4 }} />
        </div>

        {/* Subtext */}
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
            lineHeight: 1.8,
            color: "var(--w60)",
            maxWidth: "520px",
            margin: "0 auto 3rem",
          }}
        >
          A student-led creative-tech studio blending{" "}
          <span style={{ color: "var(--gold-light)", fontWeight: 600 }}>design</span>,{" "}
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>AI</span>, and{" "}
          <span style={{ color: "var(--w80)", fontWeight: 600 }}>engineering</span>{" "}
          to build bold, intelligent visual solutions.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
          <button
            onClick={() => (window.location.href = "/works")}
            className="btn-primary"
          >
            View Our Work
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-ghost"
          >
            Start a Project
          </button>
        </div>


        {/* Scroll cue */}
        <div style={{ marginTop: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.4 }}>
          <span className="dual-text" style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 44,
              background: "linear-gradient(to bottom, var(--gold), #1a4a7a, transparent)",
              animation: "float 2.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}