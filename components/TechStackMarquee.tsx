"use client";

import React from "react";

const techStack = [
  { name: "Python", icon: "PY" },
  { name: "Next.js", icon: "NX" },
  { name: "AI Development", icon: "AI" },
  { name: "Figma", icon: "FG" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind CSS", icon: "TW" },
  { name: "Three.js", icon: "3D" },
  { name: "Node.js", icon: "ND" },
];

export default function TechStackMarquee() {
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <section
      style={{
        position: "relative",
        padding: "2.5rem 0",
        background: "rgba(7,16,30,0.30)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.3,
          backgroundImage:
            "linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 500,
          height: 180,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse, rgba(201,169,110,0.06), transparent 70%)",
          filter: "blur(25px)",
          pointerEvents: "none",
        }}
      />

      {/* Top system label */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          marginBottom: "1.75rem",
        }}
      >
        <span
          style={{
            width: 24,
            height: 1,
            background: "var(--gold)",
            opacity: 0.6,
          }}
        />

        <span
          className="dual-text"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Technology Stack
        </span>

        <span
          style={{
            width: 24,
            height: 1,
            background: "var(--gold)",
            opacity: 0.6,
          }}
        />
      </div>

      {/* Marquee viewport */}
      <div
        className="tech-marquee-viewport"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Left fade */}
        <div
          style={{
            position: "absolute",
            zIndex: 5,
            left: 0,
            top: 0,
            bottom: 0,
            width: "180px",
            background:
              "linear-gradient(to right, rgba(4,4,4,1), rgba(4,4,4,0))",
            pointerEvents: "none",
          }}
        />

        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            zIndex: 5,
            right: 0,
            top: 0,
            bottom: 0,
            width: "180px",
            background:
              "linear-gradient(to left, rgba(4,4,4,1), rgba(4,4,4,0))",
            pointerEvents: "none",
          }}
        />

        {/* Moving track */}
        <div
          className="tech-marquee-track"
          style={{
            display: "flex",
            width: "max-content",
            gap: "1rem",
            paddingLeft: "1rem",
          }}
        >
          {duplicatedStack.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="tech-item"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.9rem",
                minWidth: 190,
                padding: "0.9rem 1.25rem",
                border: "1px solid rgba(255,255,255,0.07)",
                background:
                  "linear-gradient(135deg, rgba(11,15,21,0.9), rgba(7,16,30,0.65))",
                transition:
                  "border-color 0.3s ease, background 0.3s ease, transform 0.3s ease",
                cursor: "default",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 34,
                  height: 34,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(201,169,110,0.2)",
                  background: "rgba(201,169,110,0.045)",
                  color: "var(--gold-light)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {tech.icon}
              </div>

              {/* Text */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <span
                  className="dual-text"
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tech.name}
                </span>

                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.48rem",
                    color: "var(--w30)",
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                  }}
                >
                  Integrated
                </span>
              </div>

              {/* Status */}
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  marginLeft: "auto",
                  background: "var(--gold)",
                  boxShadow: "0 0 8px rgba(201,169,110,0.55)",
                  opacity: 0.7,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom system line */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.8rem",
          marginTop: "1.7rem",
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--gold)",
            boxShadow: "0 0 10px rgba(201,169,110,0.6)",
          }}
        />

        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.5rem",
            color: "var(--w30)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          ZALONT // Creative Technology
        </span>
      </div>

      <style jsx>{`
        .tech-marquee-track {
          animation: zalont-marquee 28s linear infinite;
        }

        .tech-marquee-viewport:hover .tech-marquee-track {
          animation-play-state: paused;
        }

        .tech-item:hover {
          border-color: rgba(201, 169, 110, 0.3) !important;
          background: linear-gradient(
            135deg,
            rgba(201, 169, 110, 0.08),
            rgba(7, 16, 30, 0.8)
          ) !important;
          transform: translateY(-2px);
        }

        @keyframes zalont-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 0.5rem));
          }
        }

        @media (max-width: 768px) {
          .tech-marquee-track {
            animation-duration: 22s;
          }

          .tech-item {
            min-width: 165px !important;
            padding: 0.8rem 1rem !important;
          }

          .tech-marquee-viewport > div {
            width: 110px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-track {
            animation: none;
          }

          .tech-marquee-viewport {
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}