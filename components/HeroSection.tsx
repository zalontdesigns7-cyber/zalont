"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";

import {
  ArrowRight,
  ChevronDown,
  Eye,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const LOGO_LETTERS = [
  "Z",
  "A",
  "L",
  "O",
  "N",
  "T",
];

const ROLES = [
  "Design",
  "AI",
  "Engineering",
  "Innovation",
  "Branding",
];

const HUD_COORDINATES = [
  "[47.3°N, 8.5°E]",
  "[SYS:ONLINE]",
  "[VER:2.1.7]",
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.6,
    filter: "blur(12px)",
    rotateX: 45,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(6px)",
  },

  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const roleVariants: Variants = {
  enter: {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
    scale: 0.92,
  },

  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },

  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(8px)",
    scale: 0.92,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

/* =========================================================
   WIREFRAME CUBE
========================================================= */

function WireframeCube({
  size = 100,
}: {
  size?: number;
}) {
  const half = size / 2;

  const faceStyle = (
    transform: string
  ): React.CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    border:
      "1px solid rgba(201,169,110,0.32)",
    background:
      "rgba(201,169,110,0.015)",
    transform,
  });

  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        perspective: 600,
      }}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          animation:
            "rotate-cube 18s linear infinite",
        }}
      >
        <div
          style={faceStyle(
            `translateZ(${half}px)`
          )}
        />

        <div
          style={faceStyle(
            `translateZ(-${half}px) rotateY(180deg)`
          )}
        />

        <div
          style={faceStyle(
            `rotateY(-90deg) translateZ(${half}px)`
          )}
        />

        <div
          style={faceStyle(
            `rotateY(90deg) translateZ(${half}px)`
          )}
        />

        <div
          style={faceStyle(
            `rotateX(90deg) translateZ(${half}px)`
          )}
        />

        <div
          style={faceStyle(
            `rotateX(-90deg) translateZ(${half}px)`
          )}
        />
      </div>
    </div>
  );
}

/* =========================================================
   3D RING
========================================================= */

function Ring3D({
  size = 120,
  speed = "22s",
  color = "rgba(201,169,110,0.28)",
}: {
  size?: number;
  speed?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        perspective: 400,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: `1px solid ${color}`,
          animation: `spin-tilt ${speed} linear infinite`,
        }}
      />
    </div>
  );
}

/* =========================================================
   HUD CORNERS
========================================================= */

function HUDCorner({
  position,
}: {
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}) {
  const size = 28;
  const color =
    "rgba(201,169,110,0.25)";

  const base: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    pointerEvents: "none",
  };

  const positions: Record<
    string,
    React.CSSProperties
  > = {
    "top-left": {
      ...base,
      top: "6%",
      left: "4%",
      borderTop: `1px solid ${color}`,
      borderLeft: `1px solid ${color}`,
    },

    "top-right": {
      ...base,
      top: "6%",
      right: "4%",
      borderTop: `1px solid ${color}`,
      borderRight: `1px solid ${color}`,
    },

    "bottom-left": {
      ...base,
      bottom: "6%",
      left: "4%",
      borderBottom: `1px solid ${color}`,
      borderLeft: `1px solid ${color}`,
    },

    "bottom-right": {
      ...base,
      bottom: "6%",
      right: "4%",
      borderBottom: `1px solid ${color}`,
      borderRight: `1px solid ${color}`,
    },
  };

  return (
    <motion.div
      aria-hidden="true"
      style={positions[position]}
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        delay: 2,
        ease: "easeOut",
      }}
    />
  );
}

/* =========================================================
   HERO
========================================================= */

export default function HeroSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const isInView = useInView(
    sectionRef,
    {
      once: true,
      amount: 0.3,
    }
  );

  /* =======================================================
     MOUSE PARALLAX
  ======================================================= */

  const [mousePos, setMousePos] =
    useState({
      x: 0,
      y: 0,
    });

  const handleMouseMove =
    useCallback((e: MouseEvent) => {
      const x =
        (e.clientX /
          window.innerWidth -
          0.5) *
        2;

      const y =
        (e.clientY /
          window.innerHeight -
          0.5) *
        2;

      setMousePos({
        x,
        y,
      });
    }, []);

  useEffect(() => {
    window.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, [handleMouseMove]);

  /* =======================================================
     ROLE CYCLING
  ======================================================= */

  const [roleIdx, setRoleIdx] =
    useState(0);

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        setRoleIdx(
          (previous) =>
            (previous + 1) %
            ROLES.length
        );
      }, 2800);

    return () =>
      window.clearInterval(
        interval
      );
  }, []);

  /* =======================================================
     HUD CLOCK
  ======================================================= */

  const [hudTime, setHudTime] =
    useState("00:00:00");

  useEffect(() => {
    const updateTime = () => {
      setHudTime(
        new Date()
          .toTimeString()
          .slice(0, 8)
      );
    };

    updateTime();

    const timer =
      window.setInterval(
        updateTime,
        1000
      );

    return () =>
      window.clearInterval(timer);
  }, []);

  /* =======================================================
     PARALLAX
  ======================================================= */

  const px = (factor: number) =>
    mousePos.x * factor;

  const py = (factor: number) =>
    mousePos.y * factor;

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const scrollToSection = (
    id: string
  ) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px 20px",
        background: "transparent",
      }}
    >
      {/* ===================================================
          BACKGROUND GRID
      =================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(201,169,110,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.025) 1px, transparent 1px)",
          backgroundSize:
            "80px 80px",
          maskImage:
            "radial-gradient(circle at center, black 20%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 20%, transparent 85%)",
        }}
      />

      {/* ===================================================
          CENTRAL AMBIENT GLOW
      =================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 650,
          height: 650,
          transform:
            "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.065), transparent 68%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />

      {/* ===================================================
          SCAN LINES
      =================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "-10%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)",
            animation:
              "scan-line 6s ease-in-out infinite",
            animationDelay: "1.5s",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "-10%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.055), transparent)",
            animation:
              "scan-line 8s ease-in-out infinite",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* ===================================================
          HUD CORNERS
      =================================================== */}

      <div
        className="hidden lg:block"
        style={{
          pointerEvents: "none",
        }}
      >
        <HUDCorner position="top-left" />
        <HUDCorner position="top-right" />
        <HUDCorner position="bottom-left" />
        <HUDCorner position="bottom-right" />
      </div>

      {/* ===================================================
          HUD LABELS
      =================================================== */}

      <div
        className="hidden lg:block"
        style={{
          pointerEvents: "none",
        }}
      >
        {/* Coordinates */}

        <motion.div
          className="terminal-text"
          style={{
            position: "absolute",
            top: "7%",
            left: "5.5%",
            fontSize: "0.6rem",
            opacity: 0.35,
            letterSpacing: "0.15em",
            transform: `translate(${px(
              3
            )}px, ${py(3)}px)`,
            transition:
              "transform 120ms ease-out",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.35,
          }}
          transition={{
            delay: 2.5,
            duration: 1,
          }}
        >
          {HUD_COORDINATES[0]}
        </motion.div>

        {/* System */}

        <motion.div
          className="terminal-text"
          style={{
            position: "absolute",
            top: "7%",
            right: "5.5%",
            fontSize: "0.6rem",
            opacity: 0.3,
            letterSpacing: "0.15em",
            transform: `translate(${px(
              2
            )}px, ${py(2)}px)`,
            transition:
              "transform 120ms ease-out",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.3,
          }}
          transition={{
            delay: 2.8,
            duration: 1,
          }}
        >
          {HUD_COORDINATES[1]}
        </motion.div>

        {/* Version */}

        <motion.div
          className="terminal-text"
          style={{
            position: "absolute",
            bottom: "7%",
            left: "5.5%",
            fontSize: "0.6rem",
            opacity: 0.25,
            letterSpacing: "0.15em",
            transform: `translate(${px(
              4
            )}px, ${py(4)}px)`,
            transition:
              "transform 120ms ease-out",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.25,
          }}
          transition={{
            delay: 3,
            duration: 1,
          }}
        >
          {HUD_COORDINATES[2]}
        </motion.div>

        {/* Clock */}

        <motion.div
          className="terminal-text"
          style={{
            position: "absolute",
            bottom: "7%",
            right: "5.5%",
            fontSize: "0.6rem",
            opacity: 0.3,
            letterSpacing: "0.15em",
            transform: `translate(${px(
              2
            )}px, ${py(2)}px)`,
            transition:
              "transform 120ms ease-out",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.3,
          }}
          transition={{
            delay: 3.2,
            duration: 1,
          }}
        >
          UTC {hudTime}
        </motion.div>
      </div>

      {/* ===================================================
          3D DECORATIONS
      =================================================== */}

      {/* Large cube */}

      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          right: "7%",
          top: "50%",
          transform: `translateY(-50%) translate(${px(
            -12
          )}px, ${py(-8)}px)`,
          opacity: 0.55,
          transition:
            "transform 150ms ease-out",
          pointerEvents: "none",
        }}
      >
        <WireframeCube size={130} />
      </div>

      {/* Left ring */}

      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          left: "5%",
          top: "32%",
          opacity: 0.4,
          transform: `translate(${px(
            -15
          )}px, ${py(-10)}px)`,
          transition:
            "transform 150ms ease-out",
          pointerEvents: "none",
        }}
      >
        <Ring3D
          size={110}
          speed="20s"
        />
      </div>

      {/* Small cube */}

      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: "16%",
          left: "15%",
          opacity: 0.3,
          transform: `translate(${px(
            -8
          )}px, ${py(-6)}px)`,
          transition:
            "transform 150ms ease-out",
          pointerEvents: "none",
        }}
      >
        <WireframeCube size={48} />
      </div>

      {/* Bottom ring */}

      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          bottom: "16%",
          right: "12%",
          opacity: 0.3,
          animation:
            "float-alt 10s ease-in-out infinite",
          transform: `translate(${px(
            -6
          )}px, ${py(-5)}px)`,
          transition:
            "transform 150ms ease-out",
          pointerEvents: "none",
        }}
      >
        <Ring3D
          size={65}
          speed="26s"
          color="rgba(201,169,110,0.35)"
        />
      </div>

      {/* ===================================================
          DATA STREAMS
      =================================================== */}

      <div
        className="hidden lg:block"
        aria-hidden="true"
        style={{
          pointerEvents: "none",
        }}
      >
        {[18, 85].map(
          (left, index) => (
            <div
              key={left}
              className="data-stream-line"
              style={{
                position:
                  "absolute",
                left: `${left}%`,
                top: "15%",
                height: 70,
                animationDelay: `${
                  index * 1.5
                }s`,
              }}
            />
          )
        )}
      </div>

      {/* ===================================================
          MAIN HERO CONTENT
      =================================================== */}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 1000,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* ===============================================
            BRAND BADGE
        =============================================== */}

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={
            isInView
              ? "visible"
              : "hidden"
          }
          custom={0.25}
          style={{
            display: "flex",
            justifyContent:
              "center",
            marginBottom:
              "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          <span
            className="glass-gold"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding:
                "0.45rem 1.15rem",
              borderRadius: 2,
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing:
                "0.22em",
              textTransform:
                "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius:
                  "50%",
                background:
                  "var(--gold)",
                display:
                  "inline-block",
                boxShadow:
                  "0 0 8px var(--gold), 0 0 16px rgba(201,169,110,0.3)",
                animation:
                  "glow-pulse 2s ease-in-out infinite",
              }}
            />

            <span className="dual-text">
              Creative · Tech · Studio
            </span>
          </span>
        </motion.div>

        {/* ===============================================
            ZALONT LOGO
        =============================================== */}

        <motion.h1
          className="font-brand"
          variants={containerVariants}
          initial="hidden"
          animate={
            isInView
              ? "visible"
              : "hidden"
          }
          style={{
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            gap: "0.015em",
            fontSize:
              "clamp(4.2rem, 15vw, 11rem)",
            lineHeight: 0.88,
            margin: "0 0 1.8rem",
            perspective: 900,
          }}
        >
          {LOGO_LETTERS.map(
            (letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                className="dual-text gold-glow"
                variants={
                  letterVariants
                }
                style={{
                  display:
                    "inline-block",
                  willChange:
                    "transform, opacity, filter",
                  transformStyle:
                    "preserve-3d",
                }}
              >
                {letter}
              </motion.span>
            )
          )}
        </motion.h1>

        {/* ===============================================
            GOLD DIVIDER
        =============================================== */}

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={
            isInView
              ? "visible"
              : "hidden"
          }
          custom={1.25}
          style={{
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            gap: 15,
            marginBottom:
              "1.2rem",
          }}
        >
          <div
            style={{
              height: 1,
              width: 65,
              background:
                "linear-gradient(to right, transparent, var(--gold-dim))",
            }}
          />

          <div
            style={{
              width: 5,
              height: 5,
              borderRadius:
                "50%",
              background:
                "var(--gold)",
              boxShadow:
                "0 0 8px var(--gold)",
            }}
          />

          <div
            style={{
              height: 1,
              width: 65,
              background:
                "linear-gradient(to left, transparent, var(--gold-dim))",
            }}
          />
        </motion.div>

        {/* ===============================================
            ROLE
        =============================================== */}

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={
            isInView
              ? "visible"
              : "hidden"
          }
          custom={1.45}
          style={{
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            gap: 16,
            marginBottom:
              "2.3rem",
            minHeight:
              "2.2rem",
          }}
        >
          <div
            className="hidden sm:block"
            style={{
              height: 1,
              width: 48,
              background:
                "linear-gradient(to right, transparent, var(--gold))",
              opacity: 0.4,
            }}
          />

          <div
            style={{
              position:
                "relative",
              minWidth: 170,
              height: "2rem",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              overflow:
                "hidden",
            }}
          >
            <AnimatePresence
              mode="wait"
            >
              <motion.span
                key={roleIdx}
                className="dual-text-strong"
                variants={
                  roleVariants
                }
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  position:
                    "absolute",
                  fontSize:
                    "0.9rem",
                  fontWeight: 700,
                  letterSpacing:
                    "0.22em",
                  textTransform:
                    "uppercase",
                  whiteSpace:
                    "nowrap",
                }}
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div
            className="hidden sm:block"
            style={{
              height: 1,
              width: 48,
              background:
                "linear-gradient(to left, transparent, var(--gold))",
              opacity: 0.4,
            }}
          />
        </motion.div>

        {/* ===============================================
            DESCRIPTION
        =============================================== */}

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate={
            isInView
              ? "visible"
              : "hidden"
          }
          custom={1.75}
          style={{
            maxWidth: 560,
            margin:
              "0 auto 2.7rem",
            fontFamily:
              "var(--font-jakarta), sans-serif",
            fontSize:
              "clamp(0.9rem, 1.7vw, 1.05rem)",
            lineHeight: 1.85,
            color:
              "rgba(255,255,255,0.58)",
          }}
        >
          A student-led creative-tech
          studio blending{" "}
          <span
            style={{
              color:
                "var(--gold-light)",
              fontWeight: 600,
            }}
          >
            design
          </span>
          ,{" "}
          <span
            style={{
              color:
                "var(--gold)",
              fontWeight: 600,
            }}
          >
            AI
          </span>
          , and{" "}
          <span
            style={{
              color:
                "rgba(255,255,255,0.82)",
              fontWeight: 600,
            }}
          >
            engineering
          </span>{" "}
          to build bold, intelligent
          visual solutions.
        </motion.p>

        {/* ===============================================
            CTA BUTTONS
        =============================================== */}

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={
            isInView
              ? "visible"
              : "hidden"
          }
          custom={2.05}
          style={{
            display: "flex",
            gap: 12,
            justifyContent:
              "center",
            flexWrap: "wrap",
          }}
        >
          <motion.button
            type="button"
            onClick={() =>
              scrollToSection(
                "contact"
              )
            }
            className="btn-primary"
            whileHover={{
              y: -3,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            Start a Project
            <ArrowRight
              size={15}
              strokeWidth={2.5}
            />
          </motion.button>

          <motion.button
            type="button"
            onClick={() =>
              scrollToSection(
                "services"
              )
            }
            className="btn-ghost"
            whileHover={{
              y: -3,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <Eye
              size={15}
              strokeWidth={2}
            />
            Explore Services
          </motion.button>
        </motion.div>

        {/* ===============================================
            SCROLL INDICATOR
        =============================================== */}

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={
            isInView
              ? "visible"
              : "hidden"
          }
          custom={2.6}
          style={{
            marginTop:
              "clamp(2.5rem, 7vh, 5rem)",
            display: "flex",
            flexDirection:
              "column",
            alignItems:
              "center",
            gap: 8,
          }}
        >
          <span
            className="dual-text"
            style={{
              fontSize:
                "0.58rem",
              letterSpacing:
                "0.3em",
              textTransform:
                "uppercase",
              fontWeight: 700,
              opacity: 0.5,
            }}
          >
            Explore
          </span>

          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat:
                Infinity,
              ease: "easeInOut",
            }}
            style={{
              opacity: 0.45,
            }}
          >
            <ChevronDown
              size={20}
              color="var(--gold)"
              strokeWidth={1.5}
            />
          </motion.div>

          <div
            style={{
              width: 1,
              height: 32,
              background:
                "linear-gradient(to bottom, var(--gold), transparent)",
              opacity: 0.25,
            }}
          />
        </motion.div>
      </div>

      {/* ===================================================
          MOBILE BOTTOM HUD
      =================================================== */}

      <div
        className="lg:hidden"
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 18,
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          pointerEvents:
            "none",
        }}
      >
        <span
          className="terminal-text"
          style={{
            fontSize: 8,
            opacity: 0.3,
            letterSpacing:
              "0.15em",
          }}
        >
          ZLNT / 01
        </span>

        <span
          className="terminal-text"
          style={{
            fontSize: 8,
            opacity: 0.3,
            letterSpacing:
              "0.15em",
          }}
        >
          SYS:ONLINE
        </span>
      </div>

      {/* ===================================================
          REDUCED MOTION
      =================================================== */}

      <style jsx>{`
        @media (max-width: 640px) {
          #hero {
            padding-left: 16px !important;
            padding-right: 16px !important;
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