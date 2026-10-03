"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Cpu,
  BarChart3,
  MessageSquare,
  Eye,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Animated Counter — counts from 0 → target
   when scrolled into view via IntersectionObserver
   ───────────────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800; // ms
          const steps = 60;
          const inc = target / steps;
          let cur = 0;
          const timer = setInterval(() => {
            cur = Math.min(cur + inc, target);
            setCount(decimals > 0 ? parseFloat(cur.toFixed(decimals)) : Math.round(cur));
            if (cur >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Neural Network Node / Edge definitions
   ───────────────────────────────────────────── */
interface NeuralNode {
  id: number;
  cx: number;
  cy: number;
  r: number;
  color: "gold" | "cyan";
  delay: number;
}

interface NeuralEdge {
  from: number;
  to: number;
  delay: number;
}

// 10 nodes arranged in a layered neural-network pattern
const nodes: NeuralNode[] = [
  // Input layer (left)
  { id: 0, cx: 60, cy: 80, r: 5, color: "cyan", delay: 0 },
  { id: 1, cx: 60, cy: 160, r: 4, color: "cyan", delay: 0.3 },
  { id: 2, cx: 60, cy: 240, r: 5, color: "cyan", delay: 0.6 },
  // Hidden layer 1
  { id: 3, cx: 180, cy: 60, r: 4, color: "gold", delay: 0.2 },
  { id: 4, cx: 180, cy: 140, r: 6, color: "gold", delay: 0.5 },
  { id: 5, cx: 180, cy: 220, r: 4, color: "gold", delay: 0.8 },
  // Hidden layer 2
  { id: 6, cx: 300, cy: 100, r: 5, color: "gold", delay: 0.4 },
  { id: 7, cx: 300, cy: 200, r: 5, color: "gold", delay: 0.7 },
  // Output layer (right)
  { id: 8, cx: 420, cy: 120, r: 6, color: "cyan", delay: 0.1 },
  { id: 9, cx: 420, cy: 210, r: 5, color: "cyan", delay: 0.9 },
];

// Connections between layers
const edges: NeuralEdge[] = [
  // Input → Hidden 1
  { from: 0, to: 3, delay: 0 },
  { from: 0, to: 4, delay: 0.2 },
  { from: 1, to: 3, delay: 0.4 },
  { from: 1, to: 4, delay: 0.1 },
  { from: 1, to: 5, delay: 0.6 },
  { from: 2, to: 4, delay: 0.3 },
  { from: 2, to: 5, delay: 0.5 },
  // Hidden 1 → Hidden 2
  { from: 3, to: 6, delay: 0.2 },
  { from: 3, to: 7, delay: 0.7 },
  { from: 4, to: 6, delay: 0.4 },
  { from: 4, to: 7, delay: 0.1 },
  { from: 5, to: 6, delay: 0.6 },
  { from: 5, to: 7, delay: 0.3 },
  // Hidden 2 → Output
  { from: 6, to: 8, delay: 0.5 },
  { from: 6, to: 9, delay: 0.8 },
  { from: 7, to: 8, delay: 0.2 },
  { from: 7, to: 9, delay: 0.4 },
];

/* ─────────────────────────────────────────────
   Neural Network SVG Visualization
   ───────────────────────────────────────────── */
function NeuralNetworkSVG() {
  const nodeColor = (c: "gold" | "cyan") =>
    c === "gold" ? "#c9a96e" : "#56c8d8";
  const nodeGlow = (c: "gold" | "cyan") =>
    c === "gold" ? "rgba(201,169,110,0.5)" : "rgba(86,200,216,0.5)";

  return (
    <svg
      viewBox="0 0 480 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
    >
      <defs>
        {/* Gold glow filter */}
        <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Cyan glow filter */}
        <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Edges (animated dashes) ── */}
      {edges.map((edge, i) => {
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        return (
          <line
            key={`edge-${i}`}
            x1={fromNode.cx}
            y1={fromNode.cy}
            x2={toNode.cx}
            y2={toNode.cy}
            stroke="rgba(201,169,110,0.25)"
            strokeWidth={1}
            strokeDasharray="6 4"
            style={{
              animation: `dash-flow ${2 + edge.delay}s linear infinite`,
              animationDelay: `${edge.delay}s`,
            }}
          />
        );
      })}

      {/* ── Nodes (pulsing circles) ── */}
      {nodes.map((node) => (
        <g key={`node-${node.id}`}>
          {/* Outer glow ring */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r + 4}
            fill="none"
            stroke={nodeGlow(node.color)}
            strokeWidth={1}
            opacity={0.4}
            style={{
              animation: `node-pulse 2.5s ease-in-out infinite`,
              animationDelay: `${node.delay}s`,
              transformOrigin: `${node.cx}px ${node.cy}px`,
            }}
          />
          {/* Core circle */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill={nodeColor(node.color)}
            filter={node.color === "gold" ? "url(#glow-gold)" : "url(#glow-cyan)"}
            style={{
              animation: `node-pulse 2.5s ease-in-out infinite`,
              animationDelay: `${node.delay}s`,
              transformOrigin: `${node.cx}px ${node.cy}px`,
            }}
          />
        </g>
      ))}

      {/* ── Inline keyframes for dash-flow animation ── */}
      <style>
        {`
          @keyframes dash-flow {
            0%   { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -20; }
          }
        `}
      </style>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Stats data
   ───────────────────────────────────────────── */
const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 12, suffix: "", label: "AI Models Deployed" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
  { value: 24, suffix: "/7", label: "Support" },
];

/* ─────────────────────────────────────────────
   Capabilities data
   ───────────────────────────────────────────── */
const capabilities = [
  { icon: Cpu, label: "Intelligent Design Systems" },
  { icon: BarChart3, label: "Predictive Analytics" },
  { icon: MessageSquare, label: "Natural Language Processing" },
  { icon: Eye, label: "Computer Vision" },
];

/* ─────────────────────────────────────────────
   Framer-motion variants
   ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═════════════════════════════════════════════
   AIInnovation — Main Component
   ═════════════════════════════════════════════ */
export default function AIInnovation() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="innovation"
      ref={sectionRef}
      className="section-padding"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* ── Decorative data-stream lines (left side) ── */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`stream-l-${i}`}
          className="data-stream-line"
          style={{
            left: 20 + i * 18,
            top: `${10 + i * 20}%`,
            animationDelay: `${i * 0.7}s`,
            height: 50 + i * 15,
          }}
        />
      ))}

      {/* ── Decorative data-stream lines (right side) ── */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`stream-r-${i}`}
          className="data-stream-line"
          style={{
            right: 20 + i * 18,
            left: "auto",
            top: `${15 + i * 22}%`,
            animationDelay: `${0.3 + i * 0.8}s`,
            height: 40 + i * 18,
          }}
        />
      ))}

      {/* ── Background radial glow ── */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.04) 0%, rgba(86,200,216,0.02) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        {/* ── Section divider ── */}
        <div
          className="section-divider"
          style={{ marginBottom: "5rem" }}
        />

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          style={{ marginBottom: "4rem" }}
        >
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
            Technology Core
          </span>
          <h2
            className="font-brand dual-text"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1,
            }}
          >
            AI & Innovation
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div
          style={{ display: "grid", gap: "3rem", alignItems: "start" }}
          className="lg:grid-cols-2"
        >
          {/* ════════ LEFT COLUMN — Neural Network ════════ */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={scaleIn}
          >
            {/* Neural network container */}
            <div
              className="holo-card"
              style={{
                padding: "2rem",
                background:
                  "linear-gradient(145deg, rgba(7,16,30,0.7), rgba(4,4,4,0.9))",
              }}
            >
              {/* Top bar — mimics a control panel header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#56c8d8",
                    animation: "glow-pulse 2.5s ease-in-out infinite",
                  }}
                />
                <span
                  className="terminal-text"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}
                >
                  NEURAL_CORE v4.2
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.65rem",
                    color: "var(--w20)",
                    fontFamily: "'Geist Mono', monospace",
                  }}
                >
                  PID:0x7F3A
                </span>
              </div>

              {/* Neural Network SVG */}
              <NeuralNetworkSVG />

              {/* Grid overlay effect */}
              <div
                className="grid-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  opacity: 0.3,
                  borderRadius: "inherit",
                }}
              />
            </div>

            {/* ── System status bar ── */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={3}
              style={{
                marginTop: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 1.25rem",
                background: "rgba(7,16,30,0.6)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 8px rgba(74,222,128,0.5)",
                }}
              />
              <span
                className="terminal-text"
                style={{ fontSize: "0.8rem", letterSpacing: "0.12em" }}
              >
                SYSTEM STATUS: ACTIVE
              </span>
              {/* Blinking cursor */}
              <span
                className="terminal-text animate-blink"
                style={{ fontSize: "0.9rem", marginLeft: "-0.25rem" }}
              >
                █
              </span>
            </motion.div>
          </motion.div>

          {/* ════════ RIGHT COLUMN — Content ════════ */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* ── Description ── */}
            <motion.p
              variants={fadeUp}
              custom={1}
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "var(--w60)",
              }}
            >
              At the heart of Zalont lies an{" "}
              <span style={{ color: "var(--gold-light)", fontWeight: 600 }}>
                AI-driven intelligence engine
              </span>{" "}
              that powers every design decision. From predictive analytics to
              generative design, our systems learn, adapt, and evolve —
              delivering solutions that aren&apos;t just creative, but{" "}
              <span style={{ color: "#56c8d8", fontWeight: 600 }}>
                computationally optimized
              </span>{" "}
              for maximum impact.
            </motion.p>

            {/* ── Stats Grid (2×2) ── */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="glass-gold"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "1.5rem 1.25rem",
                    background:
                      "linear-gradient(145deg, rgba(7,16,30,0.8), rgba(4,4,4,0.9))",
                    textAlign: "center",
                    borderRight:
                      i % 2 === 0 ? "1px solid var(--border)" : "none",
                    borderBottom:
                      i < 2 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <span
                    className="font-brand dual-text"
                    style={{
                      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                      lineHeight: 1,
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals ?? 0}
                    />
                  </span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--w40)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* ── Capabilities list ── */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="glass"
              style={{
                padding: "1.75rem",
                borderRadius: "12px",
              }}
            >
              <h4
                className="dual-text"
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                }}
              >
                Core Capabilities
              </h4>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {capabilities.map((cap, i) => {
                  const Icon = cap.icon;
                  return (
                    <motion.div
                      key={cap.label}
                      variants={fadeUp}
                      custom={4 + i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.75rem 1rem",
                        background: "rgba(201,169,110,0.03)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        transition:
                          "border-color 0.3s ease, background 0.3s ease",
                        cursor: "default",
                      }}
                      whileHover={{
                        borderColor: "rgba(201,169,110,0.35)",
                        background: "rgba(201,169,110,0.06)",
                      }}
                    >
                      {/* Icon container */}
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid var(--border-gold)",
                          borderRadius: "6px",
                          background: "rgba(201,169,110,0.06)",
                          flexShrink: 0,
                          color: "var(--gold)",
                        }}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <span
                        style={{
                          fontSize: "0.92rem",
                          color: "var(--w80)",
                          fontWeight: 500,
                        }}
                      >
                        {cap.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom status strip */}
              <div
                style={{
                  marginTop: "1.25rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
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
                <span
                  className="terminal-text"
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--w40)",
                    letterSpacing: "0.1em",
                  }}
                >
                  ALL MODULES OPERATIONAL
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
