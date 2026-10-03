"use client";

import React, { useCallback, useEffect, useState } from "react";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Team", id: "team" },
  { label: "Contact", id: "contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* -----------------------------------------
     Detect current section
  ----------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const viewportPoint = window.innerHeight * 0.35;
      let currentSection = "";

      for (const item of navLinks) {
        const element = document.getElementById(item.id);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (
          rect.top <= viewportPoint &&
          rect.bottom >= viewportPoint
        ) {
          currentSection = item.id;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /* -----------------------------------------
     Scroll to section
  ----------------------------------------- */
  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);

    requestAnimationFrame(() => {
      const element = document.getElementById(id);

      if (!element) return;

      const offset = 20;

      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  }, []);

  /* -----------------------------------------
     Go to home
  ----------------------------------------- */
  const goHome = useCallback(() => {
    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {/* =====================================================
          MAIN NAVIGATION
      ===================================================== */}
      <nav
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,

          padding: isScrolled
            ? "0.7rem 0"
            : "1.15rem 0",

          background: isScrolled
            ? "rgba(2,4,8,0.78)"
            : "linear-gradient(to bottom, rgba(2,4,8,0.45), transparent)",

          backdropFilter: isScrolled
            ? "blur(22px) saturate(140%)"
            : "blur(0px)",

          WebkitBackdropFilter: isScrolled
            ? "blur(22px) saturate(140%)"
            : "blur(0px)",

          borderBottom: isScrolled
            ? "1px solid rgba(201,169,110,0.12)"
            : "1px solid transparent",

          transition:
            "padding 0.45s ease, background 0.45s ease, border 0.45s ease, backdrop-filter 0.45s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 1.5rem",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* =================================================
              LOGO
          ================================================= */}
          <button
            type="button"
            onClick={goHome}
            aria-label="Go to homepage"
            style={{
              position: "relative",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",

              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              className="font-brand dual-text"
              style={{
                fontSize: "1.35rem",
                letterSpacing: "0.2em",
                lineHeight: 1,
                transition: "text-shadow 0.3s ease",
              }}
            >
              ZALONT
            </span>

            {/* Gold status dot */}
            <span
              aria-hidden="true"
              style={{
                width: 4,
                height: 4,
                marginLeft: 8,
                marginTop: 10,
                borderRadius: "50%",

                background: "var(--gold)",

                boxShadow:
                  "0 0 10px rgba(201,169,110,0.8)",
              }}
            />
          </button>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}
          <div
            className="hidden md:flex"
            style={{
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            {navLinks.map((item) => {
              const active = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  aria-current={
                    active ? "page" : undefined
                  }
                  style={{
                    position: "relative",

                    background: "none",
                    border: "none",
                    padding: "0.65rem 1rem",

                    cursor: "pointer",

                    color: active
                      ? "var(--gold)"
                      : "var(--w60)",

                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",

                    textTransform: "uppercase",

                    transition:
                      "color 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color =
                        "var(--w90)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color =
                        "var(--w60)";
                    }
                  }}
                >
                  {item.label}

                  {/* Active underline */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",

                      left: "1rem",
                      right: "1rem",
                      bottom: "0.2rem",

                      height: 1,

                      background:
                        "var(--gold)",

                      transform: active
                        ? "scaleX(1)"
                        : "scaleX(0)",

                      transformOrigin: "center",

                      opacity: active ? 1 : 0,

                      boxShadow: active
                        ? "0 0 8px rgba(201,169,110,0.5)"
                        : "none",

                      transition:
                        "transform 0.3s ease, opacity 0.3s ease",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* =================================================
              DESKTOP CONTACT BUTTON
          ================================================= */}
          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",

                fontSize: "0.76rem",
                padding: "0.58rem 1.15rem",

                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span>Contact Us</span>

              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 12h14"
                  strokeLinecap="round"
                />

                <path
                  d="m13 6 6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}
          <button
            type="button"
            className="md:hidden"
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            style={{
              position: "relative",

              width: 42,
              height: 38,

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              gap: 5,

              background:
                "rgba(201,169,110,0.04)",

              border:
                "1px solid rgba(201,169,110,0.28)",

              cursor: "pointer",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{
                  display: "block",

                  width:
                    i === 1 ? 14 : 19,

                  height: 1.5,

                  background:
                    "var(--gold)",

                  transform:
                    menuOpen && i === 0
                      ? "translateY(6.5px) rotate(45deg)"
                      : menuOpen && i === 2
                        ? "translateY(-6.5px) rotate(-45deg)"
                        : "none",

                  opacity:
                    menuOpen && i === 1
                      ? 0
                      : 1,

                  transition:
                    "transform 0.3s ease, opacity 0.2s ease, width 0.3s ease",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* =====================================================
          MOBILE FULL-SCREEN MENU
      ===================================================== */}
      <div
        className="md:hidden"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          inset: 0,

          zIndex: 150,

          background:
            "radial-gradient(circle at center, rgba(7,16,30,0.96), rgba(2,4,8,0.99) 70%)",

          backdropFilter: "blur(30px)",
          WebkitBackdropFilter:
            "blur(30px)",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          gap: "1.8rem",

          opacity: menuOpen ? 1 : 0,

          pointerEvents: menuOpen
            ? "auto"
            : "none",

          transform: menuOpen
            ? "scale(1)"
            : "scale(1.03)",

          transition:
            "opacity 0.35s ease, transform 0.4s ease",
        }}
      >
        {/* Top system label */}
        <div
          className="terminal-text"
          style={{
            position: "absolute",
            top: "7rem",

            fontSize: "0.65rem",
            letterSpacing: "0.18em",

            opacity: 0.55,
          }}
        >
          ZALONT // NAVIGATION
        </div>

        {/* Mobile links */}
        {navLinks.map((item, i) => {
          const active =
            activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              style={{
                background: "none",
                border: "none",

                cursor: "pointer",

                color: active
                  ? "var(--gold)"
                  : "var(--w80)",

                fontSize:
                  "clamp(1.7rem, 8vw, 2.5rem)",

                fontWeight: 700,

                letterSpacing: "0.08em",

                textTransform: "uppercase",

                opacity: menuOpen ? 1 : 0,

                transform: menuOpen
                  ? "translateY(0)"
                  : "translateY(15px)",

                transition:
                  `color 0.25s ease, opacity 0.35s ease ${i * 0.05}s, transform 0.35s ease ${i * 0.05}s`,
              }}
            >
              {item.label}

              {active && (
                <span
                  aria-hidden="true"
                  style={{
                    display: "block",

                    width: 35,
                    height: 1,

                    margin:
                      "0.45rem auto 0",

                    background:
                      "var(--gold)",

                    boxShadow:
                      "0 0 12px rgba(201,169,110,0.6)",
                  }}
                />
              )}
            </button>
          );
        })}

        {/* Mobile CTA */}
        <button
          type="button"
          onClick={() => scrollTo("contact")}
          className="btn-primary"
          style={{
            marginTop: "0.8rem",

            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",

            padding: "0.7rem 1.4rem",

            fontSize: "0.75rem",
            letterSpacing: "0.08em",

            textTransform: "uppercase",
          }}
        >
          Start a Project

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M5 12h14"
              strokeLinecap="round"
            />

            <path
              d="m13 6 6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Bottom system label */}
        <div
          className="terminal-text"
          style={{
            position: "absolute",
            bottom: "2rem",

            fontSize: "0.6rem",
            letterSpacing: "0.16em",

            opacity: 0.4,

            textAlign: "center",
            padding: "0 1rem",
          }}
        >
          [ ZALONT / CREATIVE · TECH · STUDIO ]
        </div>
      </div>
    </>
  );
}