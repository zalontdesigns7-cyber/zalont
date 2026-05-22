"use client";

import React from "react";

const techStack = [
  { name: "Python", icon: "🐍" },
  { name: "Next.js", icon: "▲" },
  { name: "AI Development", icon: "🧠" },
  { name: "Figma", icon: "🎨" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind CSS", icon: "🌊" },
  { name: "Three.js", icon: "🧊" },
  { name: "Node.js", icon: "🟩" },
];

export default function TechStackMarquee() {
  // We duplicate the array to create a seamless infinite loop
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <section 
      style={{
        padding: "3rem 0",
        background: "rgba(7,16,30,0.4)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Left/Right fading edges for a smooth entrance/exit */}
      <div 
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "150px",
          background: "linear-gradient(to right, var(--bg-navy), transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
      <div 
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "150px",
          background: "linear-gradient(to left, var(--bg-navy), transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Marquee Container */}
      <div className="pause-on-hover" style={{ display: "flex" }}>
        <div className="animate-marquee" style={{ gap: "4rem", paddingLeft: "4rem" }}>
          {duplicatedStack.map((tech, idx) => (
            <div 
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                opacity: 0.6,
                transition: "opacity 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            >
              <span style={{ fontSize: "1.5rem" }}>{tech.icon}</span>
              <span className="font-brand dual-text" style={{ fontSize: "1.2rem", letterSpacing: "0.1em" }}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
