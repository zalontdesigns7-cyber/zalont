"use client";

import React from "react";
import { Toaster } from "sonner";

import Navigation from "@/components/Navigation";
import ImmersiveTunnel from "@/components/ImmersiveTunnel";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#020408",
        overflowX: "hidden",
      }}
    >
      {/* ─────────────────────────────────────
          GLOBAL TOASTS
      ───────────────────────────────────── */}

      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background:
              "rgba(7,16,30,0.95)",
            backdropFilter:
              "blur(20px)",
            border:
              "1px solid rgba(201,169,110,0.20)",
            color: "#ffffff",
          },
        }}
      />

      {/* ─────────────────────────────────────
          FIXED NAVIGATION
      ───────────────────────────────────── */}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          pointerEvents: "auto",
        }}
      >
        <Navigation />
      </div>

      {/* ─────────────────────────────────────
          MASTER IMMERSIVE SCROLL
          
          ImmersiveTunnel is the ONLY component
          controlling the cinematic scroll.
      ───────────────────────────────────── */}

      <ImmersiveTunnel
        layers={[
          /* ───────────── HERO ───────────── */

          <div
            key="hero"
            id="hero"
            style={{
              width: "100%",
              minHeight: "100vh",
            }}
          >
            <HeroSection />
          </div>,

          /* ───────────── ABOUT ───────────── */

          <div
            key="about"
            id="about"
            style={{
              width: "100%",
              minHeight: "100vh",
            }}
          >
            <AboutSection />
          </div>,

          /* ──────────── SERVICES ─────────── */

          <div
            key="services"
            id="services"
            style={{
              width: "100%",
              minHeight: "100vh",
            }}
          >
            <ServicesSection />
          </div>,

          /* ───────────── PROJECTS ────────── */

          <div
            key="projects"
            id="projects"
            style={{
              width: "100%",
              minHeight: "100vh",
            }}
          >
            <ProjectShowcase />
          </div>,

          /* ───────────── TEAM ────────────── */

          <div
            key="team"
            id="team"
            style={{
              width: "100%",
              minHeight: "100vh",
            }}
          >
            <TeamSection />
          </div>,

          /* ───────────── CONTACT ─────────── */

          <div
            key="contact"
            id="contact"
            style={{
              width: "100%",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ContactSection />

            <Footer />
          </div>,
        ]}
      />
    </main>
  );
}