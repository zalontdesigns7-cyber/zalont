"use client";

import React, { useEffect, useRef } from "react";

interface Service {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    num: "01",
    title: "Digital Design",
    description: "Modern web interfaces, mobile apps, and digital experiences that captivate and convert at every touchpoint.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "AI-Powered Solutions",
    description: "Intelligent design systems and automated workflows that learn, adapt, and evolve with your business needs.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Brand Identity",
    description: "Complete visual identity systems — logos, palettes, typography — that tell your story and connect emotionally.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "UI/UX Design",
    description: "User-centred design balancing beautiful aesthetics with seamless, intuitive product experiences.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3h3" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Motion Graphics",
    description: "Dynamic animations and video content that bring your brand to life with cinematic energy and storytelling.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "3D & Immersive",
    description: "Three-dimensional designs and immersive experiences built for the next generation of digital media.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>(".svc-card").forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} style={{ padding: "8rem 1.5rem", position: "relative" }}>
      <div className="section-divider" style={{ maxWidth: 1280, margin: "0 auto 5rem" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "4rem" }}
          className="md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span
              className="dual-text"
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              What We Do
            </span>
            <h2
              className="font-brand dual-text"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}
            >
              Services
            </h2>
          </div>
          <p style={{ color: "var(--w60)", maxWidth: 340, fontSize: "0.95rem", lineHeight: 1.75 }}>
            From pixel-perfect UI to AI-driven workflows — every layer of the creative stack covered.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1px",
            background: "var(--border)",
          }}
        >
          {services.map((s, i) => (
            <div
              key={s.num}
              className="svc-card card-hover"
              style={{
                background: "var(--bg)",
                padding: "2.25rem",
                position: "relative",
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.55s ease, transform 0.55s ease",
                cursor: "default",
                overflow: "hidden",
              }}
            >
              {/* Hover corner accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                  borderStyle: "solid",
                  borderWidth: "0 32px 32px 0",
                  borderColor: `transparent rgba(201,169,110,0.15) transparent transparent`,
                  transition: "all 0.3s ease",
                }}
              />

              {/* Number */}
              <span
                className="font-brand dual-text"
                style={{ fontSize: "0.7rem", letterSpacing: "0.1em", display: "block", marginBottom: "1.5rem" }}
              >
                {s.num}
              </span>

              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  border: "1px solid var(--border-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold)",
                  marginBottom: "1.25rem",
                }}
              >
                {s.icon}
              </div>

              <h3
                style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--white)", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--w60)", lineHeight: 1.75 }}>
                {s.description}
              </p>

              {/* Bottom line on hover — applied via card-hover class */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}