"use client";

import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TechStackMarquee from "@/components/TechStackMarquee";
import Navigation from "@/components/Navigation";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import ScrollReveal from "@/components/ScrollReveal";
import React from "react";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        /* Base dual-tone: pure black + deep midnight navy */
        background: "linear-gradient(155deg, #07101e 0%, #040404 38%, #040404 62%, #06111c 100%)",
        overflow: "hidden",
      }}
    >
      {/* ── Layer 1: Dual-tone depth panels ── */}
      {/* Top-left navy wash */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 65% 55% at 0% 0%, rgba(7,18,34,0.85) 0%, transparent 65%)",
        }}
      />
      {/* Bottom-right navy wash */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 100% 100%, rgba(5,14,28,0.80) 0%, transparent 65%)",
        }}
      />
      {/* Center — stays near-black, keeping contrast */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(4,4,4,0.60) 0%, transparent 75%)",
        }}
      />

      {/* ── Layer 2: Subtle gold radiance at top center ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 70% 30% at 50% 0%, rgba(201,169,110,0.045) 0%, transparent 70%)",
        }}
      />

      {/* ── Layer 3: Dual-tone edge strip accents ── */}
      {/* Left edge — faint navy column */}
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          top: 0,
          left: 0,
          width: "2px",
          height: "100vh",
          background:
            "linear-gradient(to bottom, transparent, rgba(14,40,80,0.5) 30%, rgba(14,40,80,0.5) 70%, transparent)",
        }}
      />
      {/* Right edge */}
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          top: 0,
          right: 0,
          width: "2px",
          height: "100vh",
          background:
            "linear-gradient(to bottom, transparent, rgba(201,169,110,0.12) 30%, rgba(201,169,110,0.12) 70%, transparent)",
        }}
      />

      {/* ── Layer 4: Grid overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none grid-overlay"
        style={{ zIndex: 1 }}
      />

      {/* ── Layer 5: 3D floating scene objects ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>

        {/* Large ring — top right (navy-tinted quadrant) */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "-5%",
            width: 480,
            height: 480,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "1px solid rgba(201,169,110,0.16)",
              animation: "spin-tilt 26s linear infinite",
            }}
          />
        </div>
        {/* Inner ring — same corner */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "-1%",
            width: 300,
            height: 300,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "1px solid rgba(14,40,80,0.50)",
              animation: "spin-tilt 18s linear infinite reverse",
            }}
          />
        </div>

        {/* Large ring — bottom left (navy quadrant) */}
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            left: "-8%",
            width: 420,
            height: 420,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "1px solid rgba(14,40,80,0.45)",
              animation: "spin-tilt 34s linear infinite",
            }}
          />
        </div>
        {/* Gold ring — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: "-3%",
            width: 240,
            height: 240,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "1px solid rgba(201,169,110,0.13)",
              animation: "spin-tilt 22s linear infinite reverse",
            }}
          />
        </div>

        {/* Floating diamonds */}
        {[
          { top: "18%", left: "5%", size: 56, delay: "0s", dur: "7s", opacity: 0.35 },
          { top: "60%", right: "6%", size: 38, delay: "1.5s", dur: "9s", opacity: 0.25 },
          { top: "40%", left: "92%", size: 28, delay: "0.8s", dur: "11s", opacity: 0.20 },
        ].map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: d.top,
              left: (d as { left?: string }).left,
              right: (d as { right?: string }).right,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
              animation: `float ${d.dur} ease-in-out infinite`,
              animationDelay: d.delay,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid rgba(201,169,110,0.50)",
                background: "rgba(201,169,110,0.03)",
                transform: "rotate(45deg)",
              }}
            />
          </div>
        ))}

        {/* Dot matrix — right side */}
        <div
          style={{
            position: "absolute",
            top: "28%",
            right: "5%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 10px)",
            gap: "10px",
            opacity: 0.22,
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 2,
                height: 2,
                borderRadius: "50%",
                background: "var(--gold)",
              }}
            />
          ))}
        </div>

        {/* Dot matrix — left side */}
        <div
          style={{
            position: "absolute",
            bottom: "30%",
            left: "4%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 10px)",
            gap: "10px",
            opacity: 0.15,
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 2,
                height: 2,
                borderRadius: "50%",
                background: "rgba(14,60,120,0.8)",
              }}
            />
          ))}
        </div>

        {/* Corner L-brackets */}
        {[
          { top: 24, left: 24 },
          { top: 24, right: 24 },
          { bottom: 24, left: 24 },
          { bottom: 24, right: 24 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              opacity: 0.22,
            }}
          >
            {i < 2 ? (
              <>
                <div style={{ width: 24, height: 1, background: "var(--gold)", marginLeft: i === 1 ? "auto" : 0 }} />
                <div style={{ width: 1, height: 24, background: "var(--gold)", marginLeft: i === 1 ? "auto" : 0 }} />
              </>
            ) : (
              <>
                <div style={{ width: 1, height: 24, background: "var(--gold)", marginLeft: i === 3 ? "auto" : 0 }} />
                <div style={{ width: 24, height: 1, background: "var(--gold)", marginLeft: i === 3 ? "auto" : 0 }} />
              </>
            )}
          </div>
        ))}

        {/* Scan line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(201,169,110,0.10), transparent)",
            animation: "scan-line 8s ease-in-out infinite",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* ── Toast ── */}
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(7,16,30,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(201,169,110,0.20)",
            color: "white",
          },
        }}
      />

      {/* ── Page sections ── */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navigation />
        <HeroSection />
        <ScrollReveal>
          <TechStackMarquee />
        </ScrollReveal>
        <ScrollReveal>
          <ServicesSection />
        </ScrollReveal>
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal>
          <TeamSection />
        </ScrollReveal>
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
        <Footer />
      </div>
    </div>
  );
}
