"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Cpu, PenTool } from "lucide-react";

const team = [
  {
    number: "01",
    initials: "SP",
    name: "Sabarinath PS",
    title: "Founder",
    role: "Creative Lead",
    discipline: "Design + Creative",
    description:
      "Leading ZALONT's creative direction and shaping the visual language behind its digital experiences.",
    skills: ["UI/UX", "Branding", "Creative"],
    icon: PenTool,
  },
  {
    number: "02",
    initials: "NA",
    name: "N Amjith Kumar",
    title: "Co-Founder",
    role: "Technology Lead",
    discipline: "AI + Engineering",
    description:
      "Driving the technology side of ZALONT and exploring the intersection of AI, engineering, and creative technology.",
    skills: ["AI/ML", "Engineering", "Technology"],
    icon: Cpu,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function TeamSection() {
  return (
    <section
      id="team"
      style={{
        position: "relative",
        padding: "8rem 1.5rem",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 40%, rgba(26,74,122,0.08), transparent 55%)",
      }}
    >
      {/* Ambient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(201,169,110,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />

      {/* Ambient glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          left: "50%",
          top: "35%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.06), transparent 68%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Divider */}
        <div
          className="section-divider"
          style={{
            maxWidth: 1280,
            margin: "0 auto 5rem",
          }}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "4rem",
          }}
          className="md:flex-row md:items-end md:justify-between"
        >
          <div>
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                marginBottom: "0.8rem",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "var(--gold)",
                  display: "inline-block",
                }}
              />

              <span
                className="dual-text"
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                The People
              </span>
            </div>

            <h2
              className="font-brand dual-text"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              Our Team
            </h2>
          </div>

          <div
            style={{
              maxWidth: 420,
              marginTop: "1.5rem",
            }}
          >
            <p
              style={{
                color: "var(--w60)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              A small team combining creative thinking, engineering, and
              emerging technology to build the ZALONT experience.
            </p>
          </div>
        </motion.div>

        {/* Team Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "1px",
            background: "var(--border)",
          }}
          className="team-grid"
        >
          {team.map((member) => {
            const Icon = member.icon;

            return (
              <motion.article
                key={member.name}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  position: "relative",
                  minHeight: 500,
                  padding: "2.5rem",
                  background:
                    "linear-gradient(145deg, rgba(11,15,21,0.98), rgba(4,4,4,0.98))",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.025)",
                }}
              >
                {/* Hover glow */}
                <motion.div
                  className="team-card-glow"
                  style={{
                    position: "absolute",
                    width: 280,
                    height: 280,
                    right: -120,
                    top: -120,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(201,169,110,0.13), transparent 68%)",
                    pointerEvents: "none",
                    opacity: 0.5,
                  }}
                />

                {/* Top gold line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background:
                      "linear-gradient(90deg, transparent, var(--gold), transparent)",
                    opacity: 0.45,
                  }}
                />

                {/* Corner HUD */}
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 20,
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    color: "var(--w30)",
                  }}
                >
                  ZL // {member.number}
                </div>

                {/* Avatar */}
                <div
                  style={{
                    position: "relative",
                    width: 92,
                    height: 92,
                    marginBottom: "2rem",
                  }}
                >
                  <motion.div
                    whileHover={{
                      rotate: 5,
                      scale: 1.04,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "1px solid rgba(201,169,110,0.35)",
                      background:
                        "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(26,74,122,0.12))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <span
                      className="font-brand dual-text"
                      style={{
                        fontSize: "1.5rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {member.initials}
                    </span>

                    {/* Inner frame */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 7,
                        border: "1px solid rgba(255,255,255,0.06)",
                        pointerEvents: "none",
                      }}
                    />
                  </motion.div>

                  {/* Gold corner */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -4,
                      right: -4,
                      width: 11,
                      height: 11,
                      background: "var(--gold)",
                      boxShadow: "0 0 18px rgba(201,169,110,0.45)",
                    }}
                  />

                  {/* Corner bracket */}
                  <div
                    style={{
                      position: "absolute",
                      top: -5,
                      left: -5,
                      width: 15,
                      height: 15,
                      borderTop: "1px solid var(--gold)",
                      borderLeft: "1px solid var(--gold)",
                      opacity: 0.7,
                    }}
                  />
                </div>

                {/* Discipline */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    padding: "0.3rem 0.7rem",
                    border: "1px solid rgba(201,169,110,0.2)",
                    background:
                      "linear-gradient(105deg, rgba(201,169,110,0.07), rgba(26,74,122,0.08))",
                    marginBottom: "1rem",
                  }}
                >
                  <Icon
                    size={12}
                    strokeWidth={1.5}
                    style={{ color: "var(--gold)" }}
                  />

                  <span
                    className="dual-text"
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {member.discipline}
                  </span>
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontSize: "clamp(1.35rem, 2vw, 1.65rem)",
                    fontWeight: 700,
                    color: "var(--white)",
                    margin: "0 0 0.35rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {member.name}
                </h3>

                {/* Role */}
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--gold-light)",
                    margin: "0 0 1.5rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {member.title} · {member.role}
                </p>

                {/* Description */}
                <p
                  style={{
                    color: "var(--w50)",
                    fontSize: "0.88rem",
                    lineHeight: 1.75,
                    maxWidth: 420,
                    margin: "0 0 2rem",
                  }}
                >
                  {member.description}
                </p>

                {/* Skills */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.45rem",
                    marginBottom: "2rem",
                  }}
                >
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: "0.28rem 0.65rem",
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid var(--border)",
                        fontSize: "0.65rem",
                        color: "var(--w50)",
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom line */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "2.5rem",
                    right: "2.5rem",
                    height: 1,
                    background:
                      "linear-gradient(90deg, var(--gold), transparent)",
                    opacity: 0.25,
                  }}
                />

                {/* Number */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1.8rem",
                    right: "2.5rem",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.58rem",
                    color: "var(--w20)",
                    letterSpacing: "0.15em",
                  }}
                >
                  0{member.number}
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Team Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderTop: "none",
            padding: "1.25rem 2rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {["Friends", "Engineers", "Creators", "Innovators"].map(
            (word, i) => (
              <React.Fragment key={word}>
                {i > 0 && (
                  <span
                    style={{
                      width: 1,
                      height: 16,
                      background:
                        "linear-gradient(to bottom, var(--gold), #1a4a7a)",
                      display: "inline-block",
                    }}
                  />
                )}

                <span
                  className="dual-text"
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {word}
                </span>
              </React.Fragment>
            )
          )}

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.58rem",
              color: "var(--w30)",
              letterSpacing: "0.1em",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--gold)",
                boxShadow: "0 0 10px rgba(201,169,110,0.6)",
              }}
            />
            ZALONT // TEAM
          </div>
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            marginTop: "4rem",
            textAlign: "center",
          }}
        >
          <p
            className="font-brand"
            style={{
              margin: 0,
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
              letterSpacing: "0.12em",
              color: "var(--w30)",
              textTransform: "uppercase",
            }}
          >
            Small Team.
            <span style={{ color: "var(--gold)", margin: "0 0.6rem" }}>
              Big Ideas.
            </span>
            Infinite Possibilities.
          </p>
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        .team-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        @media (max-width: 767px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}