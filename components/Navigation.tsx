"use client";

import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Team", id: "team" },
  { label: "Contact", id: "contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(navLinks[i].id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          transition: "all 0.4s ease",
          padding: isScrolled ? "0.75rem 0" : "1.25rem 0",
          background: isScrolled ? "rgba(5,5,5,0.92)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(201,169,110,0.12)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span className="font-brand dual-text" style={{ fontSize: "1.4rem", letterSpacing: "0.18em" }}>
              ZALONT
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex" style={{ gap: "0.1rem" }}>
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  padding: "0.45rem 1.1rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: activeSection === item.id ? "var(--gold)" : "var(--w60)",
                  borderBottom: activeSection === item.id ? "1px solid var(--gold)" : "1px solid transparent",
                  transition: "all 0.25s ease",
                  paddingBottom: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id)
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--w80)";
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id)
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--w60)";
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href="mailto:zalontdesigns7@gmail.com" className="btn-primary" style={{ fontSize: "0.82rem", padding: "0.5rem 1.25rem" }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Contact Us
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "1px solid var(--border-gold)",
              padding: "0.4rem 0.5rem",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 20,
                  height: 1.5,
                  background: "var(--gold)",
                  transition: "all 0.3s ease",
                  transformOrigin: "left",
                  transform:
                    menuOpen && i === 0 ? "rotate(42deg) translateY(-1px)" :
                    menuOpen && i === 2 ? "rotate(-42deg) translateY(1px)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(5,5,5,0.98)",
          backdropFilter: "blur(32px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      >
        {navLinks.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            style={{
              background: "none",
              border: "none",
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--w80)",
              cursor: "pointer",
              letterSpacing: "0.08em",
              transition: `color 0.2s ease ${i * 0.04}s`,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--gold)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--w80)")}
          >
            {item.label}
          </button>
        ))}
        <a
          href="mailto:zalontdesigns7@gmail.com"
          onClick={() => setMenuOpen(false)}
          className="btn-primary"
          style={{ marginTop: "0.5rem" }}
        >
          Contact Us
        </a>
      </div>
    </>
  );
}
