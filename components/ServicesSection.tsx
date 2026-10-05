"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";

/* ============================================================
   SERVICE DATA
============================================================ */

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
    description:
      "Modern web interfaces, mobile apps, and digital experiences that captivate and convert at every touchpoint.",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3"
        />
      </svg>
    ),
  },

  {
    num: "02",
    title: "AI-Powered Solutions",
    description:
      "Intelligent design systems and automated workflows that learn, adapt, and evolve with your business needs.",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
      </svg>
    ),
  },

  {
    num: "03",
    title: "Brand Identity",
    description:
      "Complete visual identity systems — logos, palettes, typography — that tell your story and connect emotionally.",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
  },

  {
    num: "04",
    title: "UI/UX Design",
    description:
      "User-centred design balancing beautiful aesthetics with seamless, intuitive product experiences.",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3h3"
        />
      </svg>
    ),
  },

  {
    num: "05",
    title: "Motion Graphics",
    description:
      "Dynamic animations and video content that bring your brand to life with cinematic energy and storytelling.",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    ),
  },

  {
    num: "06",
    title: "3D & Immersive",
    description:
      "Three-dimensional designs and immersive experiences built for the next generation of digital media.",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
  },
];

/* ============================================================
   ANIMATION VARIANTS
============================================================ */

const cinematicEase = [
  0.16,
  1,
  0.3,
  1,
] as const;

const containerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.88,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.75,
      ease: cinematicEase,
    },
  },
};

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.94,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.75,
      ease: cinematicEase,
    },
  },
};

/* ============================================================
   SERVICE CARD
============================================================ */

function ServiceCard({
  service,
}: {
  service: Service;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="holo-card group service-card"
      style={{
        position: "relative",
        minHeight: 320,
        padding: "2.15rem",

        cursor: "default",

        overflow: "hidden",

        transition:
          "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* ==================================================
          TOP RIGHT CORNER
      ================================================== */}

      <div
        aria-hidden="true"
        className="service-corner-top"
        style={{
          position: "absolute",
          top: 0,
          right: 0,

          width: 0,
          height: 0,

          borderStyle: "solid",
          borderWidth: "0 42px 42px 0",

          borderColor:
            "transparent rgba(201,169,110,0.11) transparent transparent",

          transition:
            "border-color 0.4s ease",
        }}
      />

      {/* ==================================================
          BOTTOM LEFT CORNER
      ================================================== */}

      <div
        aria-hidden="true"
        className="service-corner-bottom"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,

          width: 0,
          height: 0,

          borderStyle: "solid",
          borderWidth: "25px 0 0 25px",

          borderColor:
            "transparent transparent transparent rgba(201,169,110,0.06)",

          transition:
            "border-color 0.4s ease",
        }}
      />

      {/* ==================================================
          SCAN LINE
      ================================================== */}

      <div
        aria-hidden="true"
        className="service-scan"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,

          height: 1,

          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.55), transparent)",

          opacity: 0,
          transform: "translateY(-10px)",

          pointerEvents: "none",
        }}
      />

      {/* ==================================================
          SERVICE NUMBER
      ================================================== */}

      <span
        className="font-brand service-number"
        style={{
          display: "block",

          marginBottom: "1.4rem",

          fontSize: "0.7rem",
          fontWeight: 700,

          letterSpacing: "0.14em",

          background:
            "linear-gradient(105deg, #c9a96e 0%, #e8d5b7 60%, #ffffff 100%)",

          WebkitBackgroundClip:
            "text",

          WebkitTextFillColor:
            "transparent",

          backgroundClip: "text",
        }}
      >
        {service.num}
      </span>

      {/* ==================================================
          ICON
      ================================================== */}

      <div
        className="service-icon"
        style={{
          position: "relative",

          width: 48,
          height: 48,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          marginBottom: "1.35rem",

          color: "var(--gold)",

          border:
            "1px solid var(--border-gold)",

          borderRadius: 8,

          background:
            "rgba(201,169,110,0.025)",

          transition:
            "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease",
        }}
      >
        {/* Inner glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,

            borderRadius: 7,

            background:
              "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)",

            opacity: 0,

            transition:
              "opacity 0.4s ease",
          }}
          className="service-icon-glow"
        />

        {service.icon}
      </div>

      {/* ==================================================
          TITLE
      ================================================== */}

      <h3
        style={{
          position: "relative",

          margin: 0,
          marginBottom: "0.75rem",

          fontSize: "1.1rem",
          fontWeight: 700,

          color: "var(--white)",

          lineHeight: 1.35,

          letterSpacing:
            "-0.01em",
        }}
      >
        {service.title}
      </h3>

      {/* ==================================================
          DESCRIPTION
      ================================================== */}

      <p
        style={{
          position: "relative",

          margin: 0,

          fontSize: "0.84rem",

          color: "var(--w60)",

          lineHeight: 1.75,
        }}
      >
        {service.description}
      </p>

      {/* ==================================================
          BOTTOM GOLD LINE
      ================================================== */}

      <div
        aria-hidden="true"
        className="service-bottom-line"
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
            "width 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* ==================================================
          CARD STYLES
      ================================================== */}

      <style jsx>{`
        .service-card:hover {
          transform:
            translateY(-5px);

          border-color:
            rgba(201,169,110,0.34);

          box-shadow:
            0 18px 50px rgba(0,0,0,0.24),
            0 0 30px rgba(201,169,110,0.05);
        }

        .service-card:hover .service-icon {
          border-color:
            var(--gold-dim);

          box-shadow:
            0 0 18px rgba(201,169,110,0.15);

          transform:
            translateY(-2px);
        }

        .service-card:hover
          .service-icon-glow {
          opacity: 1;
        }

        .service-card:hover
          .service-corner-top {
          border-color:
            transparent
            rgba(201,169,110,0.3)
            transparent
            transparent;
        }

        .service-card:hover
          .service-corner-bottom {
          border-color:
            transparent
            transparent
            transparent
            rgba(201,169,110,0.18);
        }

        .service-card:hover
          .service-bottom-line {
          width: 80%;
        }

        .service-card:hover
          .service-scan {
          opacity: 1;

          animation:
            service-scan
            1.2s
            ease-in-out
            forwards;
        }

        @keyframes service-scan {
          0% {
            transform:
              translateY(-10px);

            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          90% {
            opacity: 1;
          }

          100% {
            transform:
              translateY(320px);

            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card,
          .service-icon,
          .service-bottom-line,
          .service-scan {
            transition: none !important;
            animation: none !important;
          }

          .service-card:hover {
            transform: none;
          }
        }
      `}</style>
    </motion.div>
  );
}

/* ============================================================
   SERVICES SECTION
============================================================ */

export default function ServicesSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const isInView = useInView(
    sectionRef,
    {
      once: true,
      margin: "-80px",
    }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding"
      style={{
        position: "relative",
        overflow: "hidden",
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
            "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.012) 1px, transparent 1px)",

          backgroundSize: "80px 80px",

          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 45%, black 25%, transparent 80%)",

          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 45%, black 25%, transparent 80%)",

          pointerEvents: "none",
        }}
      />

      {/* ==================================================
          AMBIENT GLOW
      ================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",

          width: 500,
          height: 500,

          left: "50%",
          top: "45%",

          transform:
            "translate(-50%, -50%)",

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(201,169,110,0.045), transparent 68%)",

          filter: "blur(10px)",

          pointerEvents: "none",
        }}
      />

      {/* ==================================================
          SECTION DIVIDER
      ================================================== */}

      <div
        className="section-divider"
        style={{
          position: "relative",

          maxWidth: 1280,

          margin:
            "0 auto 5rem",
        }}
      />

      {/* ==================================================
          MAIN CONTENT
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
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
          style={{
            display: "flex",

            flexDirection:
              "column",

            gap: "1.25rem",

            marginBottom: "4rem",
          }}
          className="md:flex-row md:items-end md:justify-between"
        >
          {/* Left */}
          <div>
            <span
              className="dual-text"
              style={{
                display: "block",

                marginBottom:
                  "0.55rem",

                fontSize: "0.68rem",
                fontWeight: 700,

                letterSpacing:
                  "0.25em",

                textTransform:
                  "uppercase",
              }}
            >
              What We Do
            </span>

            <h2
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
              Services
            </h2>
          </div>

          {/* Right */}
          <p
            style={{
              maxWidth: 360,

              margin: 0,

              color: "var(--w60)",

              fontSize: "0.92rem",

              lineHeight: 1.75,
            }}
          >
            From pixel-perfect UI to AI-driven
            workflows — every layer of the
            creative stack covered.
          </p>
        </motion.div>

        {/* ==================================================
            SERVICE STATUS
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
            delay: 0.25,
            duration: 0.5,
            ease: cinematicEase,
          }}
          style={{
            display: "flex",
            alignItems: "center",

            gap: "0.8rem",

            marginBottom: "1.5rem",

            fontSize: "0.64rem",

            letterSpacing:
              "0.12em",

            color: "var(--w40)",

            textTransform:
              "uppercase",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,

              borderRadius: "50%",

              background:
                "var(--gold)",

              boxShadow:
                "0 0 10px rgba(201,169,110,0.65)",

              animation:
                "glow-pulse 2.5s ease-in-out infinite",
            }}
          />

          <span className="terminal-text">
            ZALONT // SERVICES
          </span>

          <span
            style={{
              width: 40,
              height: 1,

              background:
                "var(--border)",
            }}
          />

          <span>
            {services.length} DISCIPLINES
          </span>
        </motion.div>

        {/* ==================================================
            SERVICE GRID
        ================================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          style={{
            display: "grid",

            gridTemplateColumns:
              "1fr",

            gap: "1.25rem",
          }}
          className="md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(
            (service) => (
              <ServiceCard
                key={service.num}
                service={service}
              />
            )
          )}
        </motion.div>

        {/* ==================================================
            BOTTOM STATEMENT
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
            delay: 0.9,
            duration: 0.6,
            ease: cinematicEase,
          }}
          style={{
            display: "flex",

            alignItems: "center",

            gap: "1rem",

            marginTop: "2.5rem",

            padding:
              "1rem 1.25rem",

            borderTop:
              "1px solid var(--border)",

            borderBottom:
              "1px solid var(--border)",

            color: "var(--w40)",

            fontSize: "0.75rem",

            lineHeight: 1.6,

            letterSpacing:
              "0.04em",
          }}
        >
          <span
            style={{
              display: "block",

              width: 22,
              height: 1,

              background:
                "var(--gold)",

              boxShadow:
                "0 0 8px rgba(201,169,110,0.4)",
            }}
          />

          <span>
            DESIGN · INTELLIGENCE ·
            ENGINEERING · EXPERIENCE
          </span>
        </motion.div>
      </div>
    </section>
  );
}