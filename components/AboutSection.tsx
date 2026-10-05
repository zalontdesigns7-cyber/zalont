"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import {
  CheckCircle2,
  Rocket,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const coreValues = [
  {
    title: "Innovation",
    text: "Pushing boundaries with future-ready AI and modern technology.",
    icon: Zap,
    code: "01",
  },
  {
    title: "Precision",
    text: "Pixel-perfect design combined with thoughtful engineering.",
    icon: Target,
    code: "02",
  },
  {
    title: "Impact",
    text: "Creating bold visual solutions designed to make an impression.",
    icon: Rocket,
    code: "03",
  },
];

const milestones = [
  {
    year: "2024",
    label: "Founded by friends with a shared vision",
  },
  {
    year: "2025",
    label: "Expanded into AI-powered design solutions",
  },
  {
    year: "2026",
    label: "Building creative technology experiences",
  },
];

const features = [
  "Creativity with discipline and heart",
  "Future-ready AI-powered concepts",
  "Real-world engineering insight",
  "Bold, modern visual solutions",
];

const stats = [
  {
    target: 50,
    suffix: "+",
    label: "PROJECTS",
  },
  {
    target: 20,
    suffix: "+",
    label: "CLIENTS",
  },
  {
    target: 3,
    suffix: "",
    label: "COUNTRIES",
  },
  {
    target: 99,
    suffix: "%",
    label: "SATISFACTION",
  },
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.88,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideRight: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   ANIMATED COUNTER
========================================================= */

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    let frameId: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) {
          return;
        }

        started.current = true;

        const duration = 1600;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Smooth ease-out
          const eased =
            1 - Math.pow(1 - progress, 3);

          const value = Math.round(target * eased);

          setCount(value);

          if (progress < 1) {
            frameId = requestAnimationFrame(animate);
          }
        };

        frameId = requestAnimationFrame(animate);
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* =========================================================
   WIRE FRAME
========================================================= */

function WireframeCube({
  size = 120,
  opacity = 0.12,
}: {
  size?: number;
  opacity?: number;
}) {
  const half = size / 2;

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    border: `1px solid rgba(201,169,110,${opacity})`,
    boxSizing: "border-box",
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        transformStyle: "preserve-3d",
        transform: "translate(-50%, -50%)",
        animation: "rotate-cube 18s linear infinite",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          ...faceStyle,
          transform: `translateZ(${half}px)`,
        }}
      />

      <div
        style={{
          ...faceStyle,
          transform: `rotateY(180deg) translateZ(${half}px)`,
        }}
      />

      <div
        style={{
          ...faceStyle,
          transform: `rotateY(90deg) translateZ(${half}px)`,
        }}
      />

      <div
        style={{
          ...faceStyle,
          transform: `rotateY(-90deg) translateZ(${half}px)`,
        }}
      />

      <div
        style={{
          ...faceStyle,
          transform: `rotateX(90deg) translateZ(${half}px)`,
        }}
      />

      <div
        style={{
          ...faceStyle,
          transform: `rotateX(-90deg) translateZ(${half}px)`,
        }}
      />
    </div>
  );
}

/* =========================================================
   HUD CORNER
========================================================= */

function HudCorner({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const positions: Record<
    string,
    React.CSSProperties
  > = {
    "top-left": {
      top: 0,
      left: 0,
      borderTop: "1px solid rgba(201,169,110,0.32)",
      borderLeft: "1px solid rgba(201,169,110,0.32)",
    },
    "top-right": {
      top: 0,
      right: 0,
      borderTop: "1px solid rgba(201,169,110,0.32)",
      borderRight: "1px solid rgba(201,169,110,0.32)",
    },
    "bottom-left": {
      bottom: 0,
      left: 0,
      borderBottom: "1px solid rgba(201,169,110,0.32)",
      borderLeft: "1px solid rgba(201,169,110,0.32)",
    },
    "bottom-right": {
      bottom: 0,
      right: 0,
      borderBottom: "1px solid rgba(201,169,110,0.32)",
      borderRight: "1px solid rgba(201,169,110,0.32)",
    },
  };

  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 22,
        height: 22,
        ...positions[position],
        pointerEvents: "none",
      }}
    />
  );
}

/* =========================================================
   TIMELINE NODE
========================================================= */

function TimelineNode({
  year,
  label,
  index,
  isLast,
}: {
  year: string;
  label: string;
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      variants={slideRight}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "64px 1fr",
        gap: 20,
        minHeight: isLast ? 70 : 100,
      }}
    >
      {/* Timeline line */}
      {!isLast && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 31,
            top: 18,
            bottom: 0,
            width: 1,
            background:
              "linear-gradient(to bottom, rgba(201,169,110,0.55), rgba(201,169,110,0.05))",
          }}
        />
      )}

      {/* Node */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: 2,
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#c9a96e",
            boxShadow:
              "0 0 0 4px rgba(201,169,110,0.08), 0 0 18px rgba(201,169,110,0.45)",
          }}
        />

        <span
          style={{
            position: "absolute",
            top: -2,
            left: 44,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 8,
            color: "rgba(201,169,110,0.4)",
            letterSpacing: "0.15em",
          }}
        >
          0{index + 1}
        </span>
      </div>

      {/* Content */}
      <div>
        <div
          style={{
            fontFamily:
              "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "#c9a96e",
            marginBottom: 8,
          }}
        >
          {year}
        </div>

        <div
          style={{
            fontFamily:
              "var(--font-jakarta), sans-serif",
            fontSize: 14,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.64)",
          }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   VALUE CARD
========================================================= */

function ValueCard({
  title,
  text,
  icon: Icon,
  code,
}: {
  title: string;
  text: string;
  icon: React.ElementType;
  code: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -5,
        transition: {
          duration: 0.25,
        },
      }}
      style={{
        position: "relative",
        minHeight: 205,
        padding: "28px 26px",
        border:
          "1px solid rgba(201,169,110,0.14)",
        background:
          "linear-gradient(145deg, rgba(12,18,28,0.88), rgba(4,7,12,0.72))",
        backdropFilter: "blur(16px)",
        overflow: "hidden",
        transition:
          "border-color 300ms ease, box-shadow 300ms ease",
      }}
      className="group"
    >
      <HudCorner position="top-left" />
      <HudCorner position="bottom-right" />

      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          right: -45,
          top: -45,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Number */}
      <div
        style={{
          position: "absolute",
          right: 20,
          top: 17,
          fontFamily:
            "var(--font-geist-mono), monospace",
          fontSize: 9,
          color: "rgba(201,169,110,0.32)",
          letterSpacing: "0.16em",
        }}
      >
        VAL.{code}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 42,
          height: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border:
            "1px solid rgba(201,169,110,0.22)",
          background:
            "rgba(201,169,110,0.045)",
          color: "#c9a96e",
          marginBottom: 24,
        }}
      >
        <Icon size={19} strokeWidth={1.5} />
      </div>

      <h3
        style={{
          margin: 0,
          fontFamily:
            "var(--font-jakarta), sans-serif",
          fontSize: 17,
          fontWeight: 600,
          color: "#f3ead9",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: "10px 0 0",
          maxWidth: 270,
          fontFamily:
            "var(--font-jakarta), sans-serif",
          fontSize: 12.5,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        {text}
      </p>

      {/* Bottom scanning line */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 1,
          transformOrigin: "left",
          background:
            "linear-gradient(90deg, transparent, #c9a96e, transparent)",
        }}
      />
    </motion.div>
  );
}

/* =========================================================
   ABOUT SECTION
========================================================= */

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        color: "#fff",
        padding:
          "clamp(90px, 11vw, 150px) 20px",
      }}
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          left: "-250px",
          top: "15%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.065), transparent 68%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          right: "-220px",
          bottom: "10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(20,45,80,0.18), transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating geometry */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          right: "7%",
          top: "10%",
          perspective: 800,
          opacity: 0.6,
          pointerEvents: "none",
        }}
      >
        <WireframeCube size={150} opacity={0.1} />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "4%",
          bottom: "15%",
          width: 90,
          height: 90,
          border:
            "1px solid rgba(201,169,110,0.08)",
          transform:
            "rotate(45deg)",
          animation:
            "float 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* ===================================================
            SECTION HEADER
        =================================================== */}

        <motion.div
          variants={fadeUp}
          style={{
            marginBottom: 70,
          }}
        >
          {/* HUD label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 22,
            }}
          >
            <span
              style={{
                width: 34,
                height: 1,
                background: "#c9a96e",
                boxShadow:
                  "0 0 10px rgba(201,169,110,0.4)",
              }}
            />

            <span
              style={{
                fontFamily:
                  "var(--font-geist-mono), monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.28em",
                color: "#c9a96e",
              }}
            >
              02 / ABOUT ZALONT
            </span>
          </div>

          {/* Heading */}
          <div
            style={{
              position: "relative",
              maxWidth: 850,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily:
                  "var(--font-orbitron), sans-serif",
                fontSize:
                  "clamp(42px, 7vw, 88px)",
                lineHeight: 0.95,
                fontWeight: 700,
                letterSpacing: "-0.055em",
                color: "#f1e5cd",
              }}
            >
              WE BUILD
              <br />
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke:
                    "1px rgba(201,169,110,0.7)",
                  textShadow:
                    "0 0 30px rgba(201,169,110,0.08)",
                }}
              >
                WHAT'S NEXT.
              </span>
            </h2>

            {/* Small coordinate marker */}
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 8,
                display: "none",
                fontFamily:
                  "var(--font-geist-mono), monospace",
                fontSize: 9,
                color: "rgba(201,169,110,0.35)",
                letterSpacing: "0.15em",
              }}
              className="md:block"
            >
              [07.21 / ZLNT]
            </div>
          </div>

          <motion.p
            variants={fadeIn}
            style={{
              maxWidth: 700,
              margin: "28px 0 0",
              fontFamily:
                "var(--font-jakarta), sans-serif",
              fontSize:
                "clamp(15px, 1.8vw, 18px)",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.58)",
            }}
          >
            Zalont is a student-led creative-tech studio
            blending{" "}
            <span style={{ color: "#d7bd8d" }}>
              design
            </span>
            ,{" "}
            <span style={{ color: "#d7bd8d" }}>
              AI
            </span>{" "}
            and{" "}
            <span style={{ color: "#d7bd8d" }}>
              engineering
            </span>{" "}
            to create bold, intelligent visual
            experiences.
          </motion.p>
        </motion.div>

        {/* ===================================================
            CORE VALUES
        =================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            marginBottom: 90,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              marginBottom: 22,
            }}
          >
            <div
              style={{
                fontFamily:
                  "var(--font-geist-mono), monospace",
                fontSize: 9,
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.32)",
              }}
            >
              CORE SYSTEM / VALUES
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#c9a96e",
                  boxShadow:
                    "0 0 10px rgba(201,169,110,0.8)",
                  animation:
                    "glow-pulse 2s ease-in-out infinite",
                }}
              />

              <span
                style={{
                  fontFamily:
                    "var(--font-geist-mono), monospace",
                  fontSize: 8,
                  color: "rgba(201,169,110,0.5)",
                  letterSpacing: "0.18em",
                }}
              >
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            {coreValues.map((value) => (
              <ValueCard
                key={value.code}
                title={value.title}
                text={value.text}
                icon={value.icon}
                code={value.code}
              />
            ))}
          </div>
        </motion.div>

        {/* ===================================================
            MAIN ABOUT GRID
        =================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(55px, 8vw, 110px)",
            alignItems: "start",
            marginBottom: 100,
          }}
        >
          {/* LEFT */}
          <motion.div variants={slideRight}>
            <div
              style={{
                fontFamily:
                  "var(--font-geist-mono), monospace",
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "#c9a96e",
                marginBottom: 20,
              }}
            >
              / THE ZALONT APPROACH
            </div>

            <h3
              style={{
                margin: 0,
                maxWidth: 600,
                fontFamily:
                  "var(--font-jakarta), sans-serif",
                fontSize:
                  "clamp(27px, 4vw, 44px)",
                lineHeight: 1.12,
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "#f4ead9",
              }}
            >
              Where creative thinking
              <br />
              meets{" "}
              <span style={{ color: "#c9a96e" }}>
                intelligent technology.
              </span>
            </h3>

            <div
              style={{
                width: 70,
                height: 1,
                margin: "30px 0",
                background:
                  "linear-gradient(90deg, #c9a96e, transparent)",
              }}
            />

            <p
              style={{
                maxWidth: 590,
                margin: 0,
                fontFamily:
                  "var(--font-jakarta), sans-serif",
                fontSize: 14,
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.53)",
              }}
            >
              Founded by friends from Civil and AI
              engineering backgrounds, Zalont brings
              together design, technology and engineering
              thinking to create modern digital and visual
              experiences.
            </p>

            <p
              style={{
                maxWidth: 590,
                margin: "18px 0 0",
                fontFamily:
                  "var(--font-jakarta), sans-serif",
                fontSize: 14,
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.53)",
              }}
            >
              Our approach combines real-world insight
              with future-ready tools, allowing ideas to
              move from concept to execution with clarity
              and purpose.
            </p>

            {/* Quote */}
            <div
              style={{
                position: "relative",
                marginTop: 35,
                padding: "25px 28px",
                borderLeft:
                  "2px solid rgba(201,169,110,0.65)",
                background:
                  "linear-gradient(90deg, rgba(201,169,110,0.06), transparent)",
              }}
            >
              <Sparkles
                size={15}
                color="#c9a96e"
                style={{
                  position: "absolute",
                  top: 24,
                  right: 22,
                  opacity: 0.7,
                }}
              />

              <p
                style={{
                  margin: 0,
                  maxWidth: 510,
                  fontFamily:
                    "var(--font-jakarta), sans-serif",
                  fontSize: 15,
                  lineHeight: 1.7,
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "#d9c8a8",
                }}
              >
                “Design that doesn't just look good —
                but thinks, adapts, and connects.”
              </p>
            </div>
          </motion.div>

          {/* RIGHT — TIMELINE */}
          <motion.div variants={fadeUp}>
            <div
              style={{
                position: "relative",
                padding: "30px 28px",
                border:
                  "1px solid rgba(201,169,110,0.13)",
                background:
                  "rgba(7,12,20,0.65)",
                backdropFilter: "blur(14px)",
              }}
            >
              <HudCorner position="top-left" />
              <HudCorner position="bottom-right" />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 35,
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 9,
                    color: "#c9a96e",
                    letterSpacing: "0.22em",
                  }}
                >
                  TIMELINE
                </div>

                <div
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 8,
                    color: "rgba(255,255,255,0.25)",
                    letterSpacing: "0.12em",
                  }}
                >
                  ZLNT / 01
                </div>
              </div>

              <div>
                {milestones.map(
                  (milestone, index) => (
                    <TimelineNode
                      key={milestone.year}
                      year={milestone.year}
                      label={milestone.label}
                      index={index}
                      isLast={
                        index ===
                        milestones.length - 1
                      }
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ===================================================
            FEATURES + FOUNDERS
        =================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 18,
            marginBottom: 80,
          }}
        >
          {/* FEATURES */}
          <motion.div
            variants={fadeUp}
            style={{
              position: "relative",
              padding: "32px 30px",
              border:
                "1px solid rgba(201,169,110,0.13)",
              background:
                "linear-gradient(135deg, rgba(11,17,27,0.8), rgba(4,7,12,0.8))",
            }}
          >
            <HudCorner position="top-left" />
            <HudCorner position="bottom-right" />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <CheckCircle2
                size={17}
                color="#c9a96e"
                strokeWidth={1.5}
              />

              <span
                style={{
                  fontFamily:
                    "var(--font-geist-mono), monospace",
                  fontSize: 9,
                  color: "#c9a96e",
                  letterSpacing: "0.2em",
                }}
              >
                WHAT DRIVES US
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gap: 17,
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={feature}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 22,
                      height: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border:
                        "1px solid rgba(201,169,110,0.18)",
                      fontFamily:
                        "var(--font-geist-mono), monospace",
                      fontSize: 8,
                      color:
                        "rgba(201,169,110,0.65)",
                    }}
                  >
                    0{index + 1}
                  </span>

                  <span
                    style={{
                      paddingTop: 2,
                      fontFamily:
                        "var(--font-jakarta), sans-serif",
                      fontSize: 13,
                      lineHeight: 1.55,
                      color:
                        "rgba(255,255,255,0.58)",
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FOUNDERS */}
          <motion.div
            variants={fadeUp}
            style={{
              position: "relative",
              padding: "32px 30px",
              border:
                "1px solid rgba(201,169,110,0.13)",
              background:
                "linear-gradient(135deg, rgba(11,17,27,0.8), rgba(4,7,12,0.8))",
            }}
          >
            <HudCorner position="top-right" />
            <HudCorner position="bottom-left" />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <Users
                size={17}
                color="#c9a96e"
                strokeWidth={1.5}
              />

              <span
                style={{
                  fontFamily:
                    "var(--font-geist-mono), monospace",
                  fontSize: 9,
                  color: "#c9a96e",
                  letterSpacing: "0.2em",
                }}
              >
                THE PEOPLE
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {/* Founder */}
              <div
                style={{
                  padding: "19px 20px",
                  border:
                    "1px solid rgba(201,169,110,0.10)",
                  background:
                    "rgba(255,255,255,0.015)",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 8,
                    color:
                      "rgba(201,169,110,0.5)",
                    letterSpacing: "0.18em",
                    marginBottom: 7,
                  }}
                >
                  FOUNDER
                </div>

                <div
                  style={{
                    fontFamily:
                      "var(--font-jakarta), sans-serif",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#eee2ca",
                  }}
                >
                  Sabarinath PS
                </div>
              </div>

              {/* Co-founder */}
              <div
                style={{
                  padding: "19px 20px",
                  border:
                    "1px solid rgba(201,169,110,0.10)",
                  background:
                    "rgba(255,255,255,0.015)",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 8,
                    color:
                      "rgba(201,169,110,0.5)",
                    letterSpacing: "0.18em",
                    marginBottom: 7,
                  }}
                >
                  CO-FOUNDER
                </div>

                <div
                  style={{
                    fontFamily:
                      "var(--font-jakarta), sans-serif",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#eee2ca",
                  }}
                >
                  N Amjith Kumar
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ===================================================
            STATS
        =================================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns:
              "repeat(4, 1fr)",
            borderTop:
              "1px solid rgba(201,169,110,0.13)",
            borderBottom:
              "1px solid rgba(201,169,110,0.13)",
            background:
              "linear-gradient(90deg, rgba(201,169,110,0.025), transparent, rgba(201,169,110,0.025))",
          }}
          className="about-stats-grid"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              style={{
                position: "relative",
                textAlign: "center",
                padding: "30px 15px",
                borderRight:
                  index !== stats.length - 1
                    ? "1px solid rgba(201,169,110,0.10)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "var(--font-orbitron), sans-serif",
                  fontSize:
                    "clamp(25px, 4vw, 42px)",
                  fontWeight: 700,
                  color: "#e3c98f",
                  letterSpacing: "-0.04em",
                  textShadow:
                    "0 0 24px rgba(201,169,110,0.18)",
                }}
              >
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                />
              </div>

              <div
                style={{
                  marginTop: 8,
                  fontFamily:
                    "var(--font-geist-mono), monospace",
                  fontSize: 8,
                  color:
                    "rgba(255,255,255,0.3)",
                  letterSpacing: "0.2em",
                }}
              >
                {stat.label}
              </div>

              {/* tiny center marker */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: 3,
                  height: 3,
                  left: "50%",
                  bottom: -2,
                  transform: "translateX(-50%)",
                  borderRadius: "50%",
                  background: "#c9a96e",
                  opacity: 0.5,
                }}
              />
            </div>
          ))}
        </motion.div>

        {/* ===================================================
            FOOTER STATUS LINE
        =================================================== */}

        <motion.div
          variants={fadeIn}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
            marginTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#c9a96e",
                boxShadow:
                  "0 0 12px rgba(201,169,110,0.65)",
              }}
            />

            <span
              style={{
                fontFamily:
                  "var(--font-geist-mono), monospace",
                fontSize: 8,
                color:
                  "rgba(255,255,255,0.3)",
                letterSpacing: "0.16em",
              }}
            >
              BASED IN INDIA · WORKING GLOBALLY
            </span>
          </div>

          <span
            style={{
              fontFamily:
                "var(--font-geist-mono), monospace",
              fontSize: 8,
              color:
                "rgba(201,169,110,0.35)",
              letterSpacing: "0.16em",
            }}
          >
            ZALONT / ABOUT / 02
          </span>
        </motion.div>
      </motion.div>

      {/* =====================================================
          RESPONSIVE STYLE
      ===================================================== */}

      <style jsx>{`
        @media (max-width: 700px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .about-stats-grid > div:nth-child(2) {
            border-right: none !important;
          }

          .about-stats-grid > div:nth-child(1),
          .about-stats-grid > div:nth-child(2) {
            border-bottom: 1px solid
              rgba(201, 169, 110, 0.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}