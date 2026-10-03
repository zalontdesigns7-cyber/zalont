"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import {
  ExternalLink,
  Layers,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

/* ============================================================
   PROJECT DATA
   ============================================================ */

interface Project {
  title: string;
  description: string;
  category: string;
  tags: string[];
  gradient: string;
  accent: string;
}

const projects: Project[] = [
  {
    title: "Nexus Dashboard",
    description:
      "An experimental interface concept exploring intelligent analytics, real-time visualization, and data-driven decision making.",
    category: "UI / UX",
    tags: ["React", "D3.js", "TensorFlow", "Figma"],
    gradient:
      "linear-gradient(135deg, #0a1628 0%, #1a4a7a 35%, #c9a96e 70%, #07101e 100%)",
    accent: "rgba(91,158,201,0.25)",
  },

  {
    title: "Vertex Brand",
    description:
      "A visual identity exploration combining typography, logo systems, visual direction, and a refined digital brand language.",
    category: "BRANDING",
    tags: ["Illustrator", "InDesign", "Strategy"],
    gradient:
      "linear-gradient(145deg, #07101e 0%, #182030 30%, #c9a96e 55%, #7a6035 100%)",
    accent: "rgba(201,169,110,0.25)",
  },

  {
    title: "Neural Canvas",
    description:
      "An AI-focused creative experiment exploring prompt-driven image generation and intelligent visual transformation.",
    category: "AI",
    tags: ["Python", "Stable Diffusion", "CUDA", "FastAPI"],
    gradient:
      "linear-gradient(160deg, #040404 0%, #1a4a7a 25%, #5b9ec9 50%, #07101e 100%)",
    accent: "rgba(91,158,201,0.30)",
  },

  {
    title: "Quantum Web",
    description:
      "A futuristic web experience concept focused on immersive interfaces, real-time interaction, and modern web architecture.",
    category: "WEB DEV",
    tags: ["Next.js", "Edge", "WebSocket", "Prisma"],
    gradient:
      "linear-gradient(130deg, #0b0f15 0%, #111822 30%, #c9a96e 60%, #182030 100%)",
    accent: "rgba(201,169,110,0.20)",
  },

  {
    title: "Kinetic Motion",
    description:
      "A motion design exploration built around cinematic transitions, animated typography, and digital storytelling.",
    category: "MOTION",
    tags: ["After Effects", "Cinema 4D", "Lottie"],
    gradient:
      "linear-gradient(155deg, #07101e 0%, #0a1628 35%, #e8d5b7 65%, #040404 100%)",
    accent: "rgba(232,213,183,0.20)",
  },

  {
    title: "Prism 3D",
    description:
      "An immersive 3D experiment combining interactive environments, spatial composition, and next-generation web visuals.",
    category: "3D",
    tags: ["Three.js", "Blender", "WebGL", "GLSL"],
    gradient:
      "linear-gradient(140deg, #111822 0%, #1a4a7a 30%, #7a6035 55%, #0b0f15 100%)",
    accent: "rgba(122,96,53,0.25)",
  },
];

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.96,
    rotateX: 8,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,

    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ============================================================
   CORNER BRACKETS
   ============================================================ */

function CornerBrackets() {
  const baseStyle: React.CSSProperties = {
    position: "absolute",
    width: 18,
    height: 18,
    borderColor: "var(--gold-dim)",
    opacity: 0.5,
    pointerEvents: "none",
    zIndex: 10,
  };

  return (
    <>
      <div
        style={{
          ...baseStyle,
          top: 8,
          left: 8,
          borderTop: "1px solid",
          borderLeft: "1px solid",
        }}
      />

      <div
        style={{
          ...baseStyle,
          top: 8,
          right: 8,
          borderTop: "1px solid",
          borderRight: "1px solid",
        }}
      />

      <div
        style={{
          ...baseStyle,
          bottom: 8,
          left: 8,
          borderBottom: "1px solid",
          borderLeft: "1px solid",
        }}
      />

      <div
        style={{
          ...baseStyle,
          bottom: 8,
          right: 8,
          borderBottom: "1px solid",
          borderRight: "1px solid",
        }}
      />
    </>
  );
}

/* ============================================================
   PROJECT CARD
   ============================================================ */

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className="holo-card group"
      style={{
        position: "relative",
        padding: 0,
        overflow: "hidden",
        perspective: "1000px",
        cursor: "default",
        borderColor: "var(--gold-dim)",
      }}
    >
      <div
        className="project-card-inner"
        style={{
          position: "relative",
          height: "100%",
          transformStyle: "preserve-3d",
          transition:
            "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <CornerBrackets />

        {/* ==================================================
            VISUAL AREA
        ================================================== */}

        <div
          style={{
            position: "relative",
            height: 220,
            overflow: "hidden",

            background: project.gradient,

            borderRadius: "16px 16px 0 0",
          }}
        >
          {/* Grid */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,

              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px)",

              backgroundSize: "28px 28px",

              pointerEvents: "none",
            }}
          />

          {/* Radial glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,

              background:
                "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.12), transparent 48%)",

              pointerEvents: "none",
            }}
          />

          {/* Large project number */}
          <div
            className="font-brand"
            aria-hidden="true"
            style={{
              position: "absolute",
              right: 16,
              bottom: 5,

              fontSize: "5rem",
              fontWeight: 900,
              lineHeight: 1,

              color: "rgba(255,255,255,0.06)",

              userSelect: "none",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Category */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,

              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",

              padding: "0.35rem 0.75rem",

              background: project.accent,

              backdropFilter: "blur(12px)",
              WebkitBackdropFilter:
                "blur(12px)",

              border:
                "1px solid rgba(201,169,110,0.25)",

              borderRadius: 4,

              fontSize: "0.6rem",
              fontWeight: 700,

              letterSpacing: "0.18em",
              textTransform: "uppercase",

              color: "var(--gold-light)",

              zIndex: 5,
            }}
          >
            <Sparkles size={10} />

            {project.category}
          </div>

          {/* Center visual */}
          <div
            aria-hidden="true"
            className="project-orb"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",

              width: 105,
              height: 105,

              transform:
                "translate(-50%, -50%)",

              border:
                "1px solid rgba(232,213,183,0.35)",

              borderRadius: "50%",

              boxShadow:
                "0 0 45px rgba(201,169,110,0.16), inset 0 0 30px rgba(201,169,110,0.08)",

              transition:
                "transform 0.6s ease, box-shadow 0.6s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 13,

                border:
                  "1px solid rgba(255,255,255,0.18)",

                borderRadius: "50%",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",

                width: 7,
                height: 7,

                transform:
                  "translate(-50%, -50%)",

                borderRadius: "50%",

                background: "var(--gold)",

                boxShadow:
                  "0 0 18px rgba(201,169,110,0.8)",
              }}
            />
          </div>

          {/* Scan line */}
          <div
            className="scan-line"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,

              height: 1,

              background:
                "linear-gradient(90deg, transparent, rgba(201,169,110,0.7), transparent)",

              opacity: 0,

              pointerEvents: "none",
            }}
          />

          {/* View icon */}
          <div
            className="view-icon"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 16,
              bottom: 16,

              width: 34,
              height: 34,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              border:
                "1px solid rgba(201,169,110,0.3)",

              borderRadius: 6,

              background:
                "rgba(4,4,4,0.5)",

              backdropFilter: "blur(8px)",

              color: "var(--gold)",

              opacity: 0,

              transform:
                "translateY(8px)",

              transition:
                "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            <ExternalLink size={14} />
          </div>
        </div>

        {/* ==================================================
            CONTENT
        ================================================== */}

        <div
          style={{
            padding:
              "1.5rem 1.5rem 1.4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent:
                "space-between",
              gap: "1rem",
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: "0.65rem",

                fontSize: "1.15rem",
                fontWeight: 700,

                color: "var(--white)",

                letterSpacing: "-0.01em",
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h3>

            <ArrowUpRight
              className="project-arrow"
              size={18}
              style={{
                flexShrink: 0,
                color: "var(--gold)",
                opacity: 0.4,
                transition:
                  "transform 0.3s ease, opacity 0.3s ease",
              }}
            />
          </div>

          <p
            style={{
              margin: 0,
              marginBottom: "1.2rem",

              fontSize: "0.83rem",
              color: "var(--w60)",

              lineHeight: 1.7,
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.35rem",
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: "inline-block",

                  padding:
                    "0.22rem 0.58rem",

                  background:
                    "var(--surface-2)",

                  border:
                    "1px solid var(--border)",

                  borderRadius: 3,

                  fontSize: "0.65rem",
                  fontWeight: 500,

                  letterSpacing: "0.05em",

                  color: "var(--w40)",

                  textTransform:
                    "uppercase",

                  transition:
                    "color 0.3s ease, border-color 0.3s ease",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div
          className="card-bottom-line"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,

            width: 0,
            height: 1,

            transform:
              "translateX(-50%)",

            background:
              "linear-gradient(90deg, transparent, var(--gold), transparent)",

            transition:
              "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* ==================================================
          HOVER STYLES
      ================================================== */}

      <style jsx>{`
        .group:hover .project-card-inner {
          transform:
            perspective(1000px)
            rotateX(-2deg)
            rotateY(1deg)
            translateY(-3px);
        }

        .group:hover .project-orb {
          transform:
            translate(-50%, -50%)
            scale(1.08)
            rotate(15deg);

          box-shadow:
            0 0 65px rgba(201,169,110,0.22),
            inset 0 0 35px rgba(201,169,110,0.12);
        }

        .group:hover .view-icon {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .group:hover .project-arrow {
          opacity: 1 !important;
          transform: translate(3px, -3px);
        }

        .group:hover .card-bottom-line {
          width: 80%;
        }

        .group:hover .scan-line {
          opacity: 1;
          animation:
            project-card-scan
            1.2s
            ease-in-out
            forwards;
        }

        .group:hover span {
          border-color:
            rgba(201,169,110,0.25);
        }

        @keyframes project-card-scan {
          0% {
            top: 0;
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          90% {
            opacity: 1;
          }

          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </motion.article>
  );
}

/* ============================================================
   MAIN PROJECT SHOWCASE
   ============================================================ */

export default function ProjectShowcase() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const isInView = useInView(
    sectionRef,
    {
      once: true,
      amount: 0.12,
    }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, transparent, rgba(7,16,30,0.12), transparent)",
      }}
    >
      {/* ==================================================
          BACKGROUND GRID
      ================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,

          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px)",

          backgroundSize: "80px 80px",

          pointerEvents: "none",

          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 25%, transparent 80%)",

          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 25%, transparent 80%)",
        }}
      />

      {/* ==================================================
          DATA STREAMS
      ================================================== */}

      {[12, 28, 72, 88].map(
        (left, index) => (
          <div
            key={left}
            className="data-stream-line"
            aria-hidden="true"
            style={{
              position: "absolute",

              left: `${left}%`,
              top: "-60px",

              animationDelay:
                `${index * 1.8}s`,

              animationDuration:
                `${3 + index * 0.5}s`,

              opacity: 0.1,

              pointerEvents: "none",
            }}
          />
        )
      )}

      {/* ==================================================
          DIVIDER
      ================================================== */}

      <div
        className="section-divider"
        style={{
          maxWidth: 1280,
          margin:
            "0 auto 5rem",
        }}
      />

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          initial="hidden"
          animate={
            isInView
              ? "visible"
              : "hidden"
          }
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",

            marginBottom: "3rem",
          }}
          className="md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.span
              variants={headerVariants}
              className="dual-text"
              style={{
                display: "block",

                marginBottom:
                  "0.65rem",

                fontSize: "0.68rem",
                fontWeight: 700,

                letterSpacing:
                  "0.25em",

                textTransform:
                  "uppercase",
              }}
            >
              Selected Work
            </motion.span>

            <motion.h2
              variants={headerVariants}
              className="font-brand dual-text"
              style={{
                margin: 0,

                fontSize:
                  "clamp(2.5rem, 6vw, 4.5rem)",

                lineHeight: 1,

                letterSpacing:
                  "-0.025em",
              }}
            >
              Project Showcase
            </motion.h2>
          </div>

          <motion.p
            variants={headerVariants}
            style={{
              maxWidth: 400,

              margin: 0,

              color: "var(--w60)",

              fontSize: "0.92rem",
              lineHeight: 1.75,
            }}
          >
            A collection of creative experiments
            and digital concepts where design,
            technology, and intelligent systems
            come together.
          </motion.p>
        </motion.div>

        {/* ==================================================
            STATUS BAR
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 10,
                }
          }
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",

            marginBottom: "2rem",

            padding:
              "0.6rem 1rem",

            background:
              "var(--surface)",

            border:
              "1px solid var(--border)",

            borderRadius: 6,

            flexWrap: "wrap",
          }}
        >
          {/* System */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,

                display: "inline-block",

                borderRadius: "50%",

                background:
                  "var(--gold)",

                boxShadow:
                  "0 0 8px rgba(201,169,110,0.65)",

                animation:
                  "glow-pulse 2.5s ease-in-out infinite",
              }}
            />

            <span
              className="terminal-text"
              style={{
                fontSize: "0.68rem",
              }}
            >
              SYS.SHOWCASE
            </span>
          </div>

          <div
            style={{
              width: 1,
              height: 14,
              background:
                "var(--border)",
            }}
          />

          {/* Project count */}
          <span
            style={{
              fontSize: "0.68rem",
              color: "var(--w40)",
              letterSpacing: "0.06em",
            }}
          >
            {projects.length} PROJECTS
            LOADED
          </span>

          <div
            style={{
              width: 1,
              height: 14,
              background:
                "var(--border)",
            }}
          />

          {/* Categories */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Layers
              size={12}
              style={{
                color:
                  "var(--w40)",
              }}
            />

            <span
              style={{
                fontSize: "0.68rem",
                color: "var(--w40)",
                letterSpacing:
                  "0.06em",
              }}
            >
              MULTI-DISCIPLINARY
            </span>
          </div>
        </motion.div>

        {/* ==================================================
            PROJECT GRID
        ================================================== */}

        <motion.div
          initial="hidden"
          animate={
            isInView
              ? "visible"
              : "hidden"
          }
          variants={containerVariants}
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr",

            gap: "1.5rem",
          }}
          className="md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map(
            (project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            )
          )}
        </motion.div>

        {/* ==================================================
            BOTTOM CTA
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          transition={{
            delay: 1,
            duration: 0.6,
          }}
          style={{
            marginTop: "3rem",

            padding:
              "1.25rem 1.5rem",

            background:
              "var(--surface)",

            border:
              "1px solid var(--border)",

            borderRadius: 8,

            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",

            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,

                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",

                border:
                  "1px solid var(--border-gold)",

                borderRadius: 6,

                background:
                  "rgba(201,169,110,0.06)",
              }}
            >
              <Sparkles
                size={14}
                style={{
                  color:
                    "var(--gold)",
                }}
              />
            </div>

            <span
              style={{
                fontSize: "0.84rem",
                color: "var(--w60)",
                lineHeight: 1.5,
              }}
            >
              Have an idea worth building?
              Let&apos;s create something
              distinctive.
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById(
                  "contact"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
            className="btn-ghost"
            style={{
              padding:
                "0.55rem 1.5rem",

              fontSize: "0.76rem",

              letterSpacing:
                "0.1em",

              textDecoration:
                "none",

              cursor: "pointer",
            }}
          >
            START A PROJECT →
          </button>
        </motion.div>
      </div>
    </section>
  );
}