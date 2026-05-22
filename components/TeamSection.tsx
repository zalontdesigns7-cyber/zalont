"use client";

import React from "react";

const team = [
  {
    initials: "ZL",
    name: "Founder & Lead Designer",
    role: "Creative Director",
    discipline: "Design + AI",
    skills: ["UI/UX", "Branding", "Motion"],
  },
  {
    initials: "AL",
    name: "Co-Founder & Engineer",
    role: "AI & Tech Lead",
    discipline: "Engineering",
    skills: ["AI/ML", "Full-Stack", "3D"],
  },
  {
    initials: "EK",
    name: "Design & Strategy",
    role: "Visual Strategist",
    discipline: "Civil + Design",
    skills: ["Print", "Strategy", "Brand"],
  },
];

export default function TeamSection() {
  return (
    <section id="team" style={{ padding: "8rem 1.5rem", position: "relative" }}>
      <div className="section-divider" style={{ maxWidth: 1280, margin: "0 auto 5rem" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "4rem" }} className="md:flex-row md:items-end md:justify-between">
          <div>
            <span className="dual-text" style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
              The People
            </span>
            <h2 className="font-brand dual-text" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>
              Our Team
            </h2>
          </div>
          <p style={{ color: "var(--w60)", maxWidth: 360, fontSize: "0.95rem", lineHeight: 1.75, marginTop: "1rem" }}>
            Friends from Civil and AI engineering, united by a love for design, technology, and creative problem-solving.
          </p>
        </div>

        {/* Team cards — 1px gap grid */}
        <div
          style={{ display: "grid", gap: "1px", background: "var(--border)", marginBottom: "1px" }}
          className="md:grid-cols-3"
        >
          {team.map((m, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                background: "var(--bg)",
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top gold line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "var(--gold)", opacity: 0.12 }} />

              {/* Avatar */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  border: "1px solid var(--border-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  position: "relative",
                }}
              >
                <span className="font-brand dual-text" style={{ fontSize: "1.1rem" }}>
                  {m.initials}
                </span>
                {/* Corner tick */}
                <div style={{ position: "absolute", bottom: -3, right: -3, width: 7, height: 7, background: "var(--gold)" }} />
              </div>

              {/* Discipline badge */}
              <div
                style={{
                  display: "inline-block",
                  padding: "0.2rem 0.7rem",
                  border: "1px solid rgba(91,158,201,0.25)",
                  background: "linear-gradient(105deg, rgba(201,169,110,0.05), rgba(26,74,122,0.10))",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                <span className="dual-text">{m.discipline}</span>
              </div>

              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--white)", marginBottom: "0.25rem" }}>
                {m.name}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--w40)", marginBottom: "1.5rem", letterSpacing: "0.04em" }}>
                {m.role}
              </p>

              {/* Skills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {m.skills.map((sk) => (
                  <span
                    key={sk}
                    style={{
                      padding: "0.2rem 0.65rem",
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      fontSize: "0.7rem",
                      color: "var(--w60)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline footer */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderTop: "none",
            padding: "1.25rem 2rem",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {["Friends", "Engineers", "Creators", "Innovators"].map((word, i) => (
            <React.Fragment key={word}>
              {i > 0 && <span style={{ width: 1, height: 16, background: "linear-gradient(to bottom, var(--gold), #1a4a7a)", display: "inline-block" }} />}
              <span className="dual-text" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {word}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
