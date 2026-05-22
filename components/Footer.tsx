"use client";

import React from "react";

const ZALONT_EMAIL = "zalontdesigns7@gmail.com";

const footerNav = [
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Team", id: "team" },
  { label: "Contact", id: "contact" },
];

const footerServices = [
  "Digital Design",
  "AI Solutions",
  "Brand Identity",
  "UI/UX Design",
  "Motion Graphics",
  "3D & Immersive",
];

export default function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ position: "relative", paddingTop: "5rem", paddingBottom: "2rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
      {/* Navy dual-tone footer background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(7,16,30,0.70) 50%, rgba(5,10,18,0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-divider" style={{ maxWidth: 1280, margin: "0 auto 4rem", position: "relative" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        {/* Top — brand + columns */}
        <div
          style={{ display: "grid", gap: "3rem", marginBottom: "4rem" }}
          className="md:grid-cols-3"
        >
          {/* Brand */}
          <div>
            <div className="font-brand dual-text" style={{ fontSize: "1.8rem", letterSpacing: "0.18em", marginBottom: "0.75rem" }}>
              ZALONT
            </div>
            <div style={{ width: 32, height: 1, background: "var(--gold)", opacity: 0.4, marginBottom: "1rem" }} />
            <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--w40)", maxWidth: 260, marginBottom: "1.5rem" }}>
              Creative-Tech Studio blending Design, AI & Engineering into bold, modern visual solutions.
            </p>
            <a
              href={`mailto:${ZALONT_EMAIL}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--gold)",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {ZALONT_EMAIL}
            </a>
          </div>

          {/* Navigate */}
          <div>
            <p className="dual-text" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Navigate
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {footerNav.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      color: "var(--w60)",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--gold)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--w60)")}
                  >
                    <span style={{ width: 12, height: 1, background: "var(--gold-dim)", display: "inline-block" }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="dual-text" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Services
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {footerServices.map((s) => (
                <li key={s}>
                  <span style={{ fontSize: "0.875rem", color: "var(--w40)" }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, var(--gold), #3d85be, transparent)", marginBottom: "2rem" }} />

        {/* Bottom bar */}
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}
        >
          <p style={{ fontSize: "0.75rem", color: "var(--w40)" }}>
            © {new Date().getFullYear()} Zalont. All rights reserved. Built by ECOCEE.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--gold)",
                display: "inline-block",
                animation: "glow-pulse 2.5s ease-in-out infinite",
              }}
            />
            <span className="dual-text" style={{ fontSize: "0.75rem", letterSpacing: "0.08em", fontWeight: 600 }}>
              Design · AI · Engineering
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}