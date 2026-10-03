"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";

import {
  Clock,
  Loader2,
  Mail,
  MapPin,
  Send,
  Terminal,
} from "lucide-react";

import { toast } from "sonner";

/* =========================================================
   CONTACT CONFIG
========================================================= */

const ZALONT_EMAIL = "zalontdesigns7@gmail.com";

const TERMINAL_LINE_1 =
  "> ESTABLISHING CONNECTION...";

const TERMINAL_LINE_2 =
  "> CONNECTION SECURED.";

const TYPING_SPEED = 45;
const SECURE_DELAY = 1200;

/* =========================================================
   CONTACT DATA
========================================================= */

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: ZALONT_EMAIL,
    href: `mailto:${ZALONT_EMAIL}`,
    iconColor: "#c9a96e",
    iconBg: "rgba(201,169,110,0.07)",
    iconBorder: "rgba(201,169,110,0.22)",
  },
  {
    icon: MapPin,
    label: "Based In",
    value: "India · Working Globally",
    href: null,
    iconColor: "rgba(150,185,220,0.9)",
    iconBg: "rgba(30,65,105,0.18)",
    iconBorder: "rgba(80,130,180,0.24)",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
    iconColor: "rgba(220,220,220,0.8)",
    iconBg: "rgba(255,255,255,0.035)",
    iconBorder: "rgba(255,255,255,0.1)",
  },
];

const clientTypes = [
  {
    number: "01",
    label: "Startups",
    desc: "Launch with impact",
  },
  {
    number: "02",
    label: "Colleges",
    desc: "Engage & inspire",
  },
  {
    number: "03",
    label: "Businesses",
    desc: "Stand out",
  },
];

/* =========================================================
   MOTION
========================================================= */

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const formVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.25,
    },
  },
};

/* =========================================================
   TERMINAL TYPING
========================================================= */

function useTerminalTyping(inView: boolean) {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  const [phase, setPhase] = useState<
    "idle" | "typing1" | "pause" | "typing2" | "done"
  >("idle");

  const hasStarted = useRef(false);

  useEffect(() => {
    if (!inView || hasStarted.current) {
      return;
    }

    hasStarted.current = true;
    setPhase("typing1");

    let charIndex = 0;
    let charIndex2 = 0;

    let typeInterval: ReturnType<typeof setInterval> | null =
      null;

    let typeInterval2: ReturnType<typeof setInterval> | null =
      null;

    let timeoutId: ReturnType<typeof setTimeout> | null =
      null;

    typeInterval = setInterval(() => {
      charIndex += 1;

      setLine1(
        TERMINAL_LINE_1.slice(0, charIndex)
      );

      if (
        charIndex >=
        TERMINAL_LINE_1.length
      ) {
        if (typeInterval) {
          clearInterval(typeInterval);
          typeInterval = null;
        }

        setPhase("pause");

        timeoutId = setTimeout(() => {
          setPhase("typing2");

          typeInterval2 = setInterval(() => {
            charIndex2 += 1;

            setLine2(
              TERMINAL_LINE_2.slice(
                0,
                charIndex2
              )
            );

            if (
              charIndex2 >=
              TERMINAL_LINE_2.length
            ) {
              if (typeInterval2) {
                clearInterval(typeInterval2);
                typeInterval2 = null;
              }

              setPhase("done");
            }
          }, TYPING_SPEED);
        }, SECURE_DELAY);
      }
    }, TYPING_SPEED);

    return () => {
      if (typeInterval) {
        clearInterval(typeInterval);
      }

      if (typeInterval2) {
        clearInterval(typeInterval2);
      }

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [inView]);

  return {
    line1,
    line2,
    phase,
  };
}

/* =========================================================
   HUD CORNERS
========================================================= */

function HudCorners() {
  const cornerStyle: React.CSSProperties = {
    position: "absolute",
    width: 22,
    height: 22,
    pointerEvents: "none",
  };

  return (
    <>
      <span
        aria-hidden="true"
        style={{
          ...cornerStyle,
          top: 0,
          left: 0,
          borderTop:
            "1px solid rgba(201,169,110,0.45)",
          borderLeft:
            "1px solid rgba(201,169,110,0.45)",
        }}
      />

      <span
        aria-hidden="true"
        style={{
          ...cornerStyle,
          top: 0,
          right: 0,
          borderTop:
            "1px solid rgba(201,169,110,0.45)",
          borderRight:
            "1px solid rgba(201,169,110,0.45)",
        }}
      />

      <span
        aria-hidden="true"
        style={{
          ...cornerStyle,
          bottom: 0,
          left: 0,
          borderBottom:
            "1px solid rgba(201,169,110,0.45)",
          borderLeft:
            "1px solid rgba(201,169,110,0.45)",
        }}
      />

      <span
        aria-hidden="true"
        style={{
          ...cornerStyle,
          bottom: 0,
          right: 0,
          borderBottom:
            "1px solid rgba(201,169,110,0.45)",
          borderRight:
            "1px solid rgba(201,169,110,0.45)",
        }}
      />
    </>
  );
}

/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({
  item,
}: {
  item: (typeof contactDetails)[number];
}) {
  const Icon = item.icon;

  const content = (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: item.iconBg,
          border: `1px solid ${item.iconBorder}`,
        }}
      >
        <Icon
          size={18}
          strokeWidth={1.5}
          style={{
            color: item.iconColor,
          }}
        />
      </div>

      <div
        style={{
          minWidth: 0,
        }}
      >
        <div
          style={{
            marginBottom: 7,
            fontFamily:
              "var(--font-geist-mono), monospace",
            fontSize: 8,
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {item.label}
        </div>

        <div
          style={{
            fontFamily:
              "var(--font-jakarta), sans-serif",
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1.5,
            color: item.href
              ? "#d9c49a"
              : "rgba(255,255,255,0.62)",
            overflowWrap: "anywhere",
          }}
        >
          {item.value}
        </div>
      </div>
    </div>
  );

  if (item.href) {
    return (
      <motion.a
        href={item.href}
        variants={cardVariant}
        whileHover={{
          y: -3,
          borderColor:
            "rgba(201,169,110,0.42)",
          backgroundColor:
            "rgba(201,169,110,0.055)",
        }}
        transition={{
          duration: 0.25,
        }}
        style={{
          position: "relative",
          display: "block",
          padding: 20,
          background:
            "rgba(7,16,30,0.62)",
          border:
            "1px solid rgba(255,255,255,0.08)",
          textDecoration: "none",
          overflow: "hidden",
        }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        y: -3,
        borderColor:
          "rgba(201,169,110,0.28)",
        backgroundColor:
          "rgba(7,16,30,0.78)",
      }}
      transition={{
        duration: 0.25,
      }}
      style={{
        position: "relative",
        padding: 20,
        background:
          "rgba(7,16,30,0.62)",
        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {content}
    </motion.div>
  );
}

/* =========================================================
   CONTACT SECTION
========================================================= */

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] =
    useState(false);

  const sectionRef =
    useRef<HTMLElement>(null);

  const terminalRef =
    useRef<HTMLDivElement>(null);

  const isInView = useInView(
    sectionRef,
    {
      once: true,
      margin: "-100px",
    }
  );

  const terminalInView = useInView(
    terminalRef,
    {
      once: true,
      margin: "-50px",
    }
  );

  const {
    line1,
    line2,
    phase,
  } =
    useTerminalTyping(
      terminalInView
    );

  /* =======================================================
     FORM HANDLERS
  ======================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      toast.error(
        "Please fill in all fields."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      toast.error(
        "Please enter a valid email address."
      );
      return;
    }

    setSending(true);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${ZALONT_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Accept:
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject:
              `New Project Enquiry from ${name}`,
          }),
        }
      );

      if (response.ok) {
        toast.success(
          "Message sent successfully! We'll reply within 24 hours. 🚀"
        );

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(
          "Failed to send message. Please email us directly."
        );
      }
    } catch {
      toast.error(
        "Something went wrong. Please email us directly."
      );
    } finally {
      setSending(false);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 35%, rgba(201,169,110,0.045), transparent 35%), #020408",
        color: "#ffffff",
        padding:
          "clamp(100px, 12vw, 160px) 20px 70px",
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
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />

      {/* Central glow */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "35%",
          width: 700,
          height: 700,
          transform:
            "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.055), transparent 68%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* ===================================================
          DATA STREAMS
      =================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {[8, 27, 73, 91].map(
          (left, index) => (
            <div
              key={left}
              className="data-stream-line"
              style={{
                position: "absolute",
                left: `${left}%`,
                top: "-20%",
                height: "140%",
                width: 1,
                opacity: 0.25,
                animationDelay: `${
                  index * 1.2
                }s`,
                animationDuration: `${
                  5 + index * 0.7
                }s`,
              }}
            />
          )
        )}
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={
          isInView
            ? "visible"
            : "hidden"
        }
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* =================================================
            SECTION IDENTIFIER
        ================================================= */}

        <motion.div
          variants={fadeUpVariant}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: 20,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 32,
                height: 1,
                background: "#c9a96e",
                boxShadow:
                  "0 0 12px rgba(201,169,110,0.5)",
              }}
            />

            <span
              style={{
                fontFamily:
                  "var(--font-geist-mono), monospace",
                fontSize: 9,
                letterSpacing:
                  "0.25em",
                color: "#c9a96e",
              }}
            >
              05 / CONTACT
            </span>
          </div>

          <span
            style={{
              fontFamily:
                "var(--font-geist-mono), monospace",
              fontSize: 8,
              letterSpacing:
                "0.18em",
              color:
                "rgba(255,255,255,0.25)",
            }}
          >
            ZLNT / FINAL NODE
          </span>
        </motion.div>

        {/* =================================================
            TERMINAL
        ================================================= */}

        <motion.div
          ref={terminalRef}
          variants={fadeUpVariant}
          style={{
            width: "100%",
            maxWidth: 480,
            margin: "0 auto 34px",
            padding: "14px 18px",
            background:
              "rgba(3,6,11,0.88)",
            border:
              "1px solid rgba(201,169,110,0.15)",
            boxShadow:
              "0 20px 70px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              paddingBottom: 10,
              marginBottom: 10,
              borderBottom:
                "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Terminal
              size={12}
              color="#c9a96e"
              strokeWidth={1.5}
            />

            <span
              style={{
                fontFamily:
                  "var(--font-geist-mono), monospace",
                fontSize: 8,
                letterSpacing:
                  "0.17em",
                color:
                  "rgba(255,255,255,0.35)",
              }}
            >
              ZALONT COMM TERMINAL
            </span>

            <span
              style={{
                marginLeft: "auto",
                width: 5,
                height: 5,
                borderRadius:
                  "50%",
                background:
                  phase === "done"
                    ? "#4ade80"
                    : "#c9a96e",
                boxShadow:
                  phase === "done"
                    ? "0 0 10px rgba(74,222,128,0.8)"
                    : "0 0 10px rgba(201,169,110,0.7)",
              }}
            />
          </div>

          <div
            style={{
              fontFamily:
                "var(--font-geist-mono), monospace",
              fontSize: 11,
              lineHeight: 1.8,
              color:
                "rgba(255,255,255,0.58)",
            }}
          >
            <div>
              {line1}

              {phase ===
                "typing1" && (
                <span
                  style={{
                    display:
                      "inline-block",
                    width: 7,
                    height: 13,
                    marginLeft: 3,
                    verticalAlign:
                      "middle",
                    background:
                      "#c9a96e",
                    animation:
                      "cursor-blink 0.8s step-end infinite",
                  }}
                />
              )}
            </div>

            {(phase ===
              "typing2" ||
              phase === "done") && (
              <div
                style={{
                  color:
                    phase === "done"
                      ? "#4ade80"
                      : "#c9a96e",
                }}
              >
                {line2}

                {phase ===
                  "typing2" && (
                  <span
                    style={{
                      display:
                        "inline-block",
                      width: 7,
                      height: 13,
                      marginLeft: 3,
                      verticalAlign:
                        "middle",
                      background:
                        "#4ade80",
                      animation:
                        "cursor-blink 0.8s step-end infinite",
                    }}
                  />
                )}
              </div>
            )}

            {phase ===
              "pause" && (
              <div>
                <span
                  style={{
                    display:
                      "inline-block",
                    width: 7,
                    height: 13,
                    background:
                      "#c9a96e",
                    animation:
                      "cursor-blink 0.8s step-end infinite",
                  }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          style={{
            textAlign: "center",
            marginBottom: 65,
          }}
        >
          <motion.div
            variants={fadeUpVariant}
            style={{
              marginBottom: 12,
              fontFamily:
                "var(--font-geist-mono), monospace",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing:
                "0.3em",
              textTransform:
                "uppercase",
              color:
                "rgba(201,169,110,0.75)",
            }}
          >
            WORK WITH US
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            style={{
              margin: 0,
              fontFamily:
                "var(--font-orbitron), sans-serif",
              fontSize:
                "clamp(40px, 7vw, 82px)",
              lineHeight: 0.95,
              fontWeight: 700,
              letterSpacing:
                "-0.055em",
              color: "#eee1c6",
              textShadow:
                "0 0 35px rgba(201,169,110,0.1)",
            }}
          >
            LET&apos;S CREATE
            <br />

            <span
              style={{
                color: "transparent",
                WebkitTextStroke:
                  "1px rgba(201,169,110,0.72)",
              }}
            >
              TOGETHER.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariant}
            style={{
              maxWidth: 520,
              margin:
                "25px auto 0",
              fontFamily:
                "var(--font-jakarta), sans-serif",
              fontSize: 14,
              lineHeight: 1.8,
              color:
                "rgba(255,255,255,0.48)",
            }}
          >
            Ready to bring your vision to
            life? Tell us about your project
            and we&apos;ll respond within 24
            hours.
          </motion.p>
        </div>

        {/* =================================================
            CONTACT GRID
        ================================================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(260px, 0.85fr) minmax(320px, 1.5fr)",
            gap: 20,
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* ===============================================
              LEFT COLUMN
          =============================================== */}

          <motion.div
            variants={cardStagger}
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: 10,
            }}
          >
            <div
              style={{
                marginBottom: 5,
                fontFamily:
                  "var(--font-geist-mono), monospace",
                fontSize: 8,
                letterSpacing:
                  "0.2em",
                color:
                  "rgba(255,255,255,0.28)",
              }}
            >
              CONTACT CHANNELS
            </div>

            {contactDetails.map(
              (item) => (
                <ContactCard
                  key={item.label}
                  item={item}
                />
              )
            )}

            {/* =========================================
                WORK WITH CARD
            ========================================= */}

            <motion.div
              variants={cardVariant}
              style={{
                position:
                  "relative",
                marginTop: 6,
                padding: 24,
                background:
                  "rgba(201,169,110,0.035)",
                border:
                  "1px solid rgba(201,169,110,0.18)",
              }}
            >
              <HudCorners />

              <div
                style={{
                  marginBottom: 20,
                  fontFamily:
                    "var(--font-geist-mono), monospace",
                  fontSize: 8,
                  letterSpacing:
                    "0.2em",
                  color:
                    "rgba(201,169,110,0.65)",
                }}
              >
                WE WORK WITH
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 14,
                }}
              >
                {clientTypes.map(
                  (client) => (
                    <div
                      key={
                        client.label
                      }
                      style={{
                        display:
                          "grid",
                        gridTemplateColumns:
                          "28px 1fr",
                        gap: 10,
                        alignItems:
                          "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "var(--font-geist-mono), monospace",
                          fontSize: 8,
                          color:
                            "rgba(201,169,110,0.45)",
                        }}
                      >
                        {
                          client.number
                        }
                      </span>

                      <div>
                        <div
                          style={{
                            fontFamily:
                              "var(--font-jakarta), sans-serif",
                            fontSize: 12,
                            fontWeight: 600,
                            color:
                              "rgba(255,255,255,0.72)",
                          }}
                        >
                          {
                            client.label
                          }
                        </div>

                        <div
                          style={{
                            marginTop: 2,
                            fontFamily:
                              "var(--font-jakarta), sans-serif",
                            fontSize: 10,
                            color:
                              "rgba(255,255,255,0.3)",
                          }}
                        >
                          {
                            client.desc
                          }
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* ===============================================
              RIGHT — FORM
          =============================================== */}

          <motion.form
            onSubmit={
              handleSubmit
            }
            variants={formVariant}
            style={{
              position:
                "relative",
              overflow:
                "hidden",
              padding:
                "clamp(24px, 4vw, 38px)",
              background:
                "rgba(7,16,30,0.65)",
              border:
                "1px solid rgba(201,169,110,0.16)",
              backdropFilter:
                "blur(18px)",
              WebkitBackdropFilter:
                "blur(18px)",
            }}
          >
            <HudCorners />

            {/* Scan line */}

            <motion.div
              aria-hidden="true"
              animate={{
                y: [
                  0,
                  420,
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position:
                  "absolute",
                top: -30,
                left: 0,
                right: 0,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(201,169,110,0.8), transparent)",
                opacity: 0.5,
                pointerEvents:
                  "none",
              }}
            />

            {/* Form heading */}

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: 10,
                marginBottom: 30,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius:
                    "50%",
                  background:
                    "#4ade80",
                  boxShadow:
                    "0 0 12px rgba(74,222,128,0.7)",
                  animation:
                    "glow-pulse 2.5s ease-in-out infinite",
                }}
              />

              <span
                style={{
                  fontFamily:
                    "var(--font-geist-mono), monospace",
                  fontSize: 9,
                  letterSpacing:
                    "0.18em",
                  color:
                    "rgba(255,255,255,0.55)",
                }}
              >
                CONNECTION READY
              </span>
            </div>

            <h3
              style={{
                margin:
                  "0 0 28px",
                fontFamily:
                  "var(--font-jakarta), sans-serif",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing:
                  "-0.03em",
                color: "#eee3ce",
              }}
            >
              Send Us a Message
            </h3>

            {/* Name + email */}

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: 14,
                marginBottom: 18,
              }}
              className="contact-form-row"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    display:
                      "block",
                    marginBottom: 8,
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 8,
                    letterSpacing:
                      "0.16em",
                    textTransform:
                      "uppercase",
                    color:
                      "rgba(255,255,255,0.35)",
                  }}
                >
                  Your Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                  placeholder="Alex Johnson"
                  className="form-input"
                  autoComplete="name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    display:
                      "block",
                    marginBottom: 8,
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 8,
                    letterSpacing:
                      "0.16em",
                    textTransform:
                      "uppercase",
                    color:
                      "rgba(255,255,255,0.35)",
                  }}
                >
                  Email Address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={
                    handleChange
                  }
                  placeholder="alex@company.com"
                  className="form-input"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Message */}

            <div
              style={{
                marginBottom: 22,
              }}
            >
              <label
                htmlFor="contact-message"
                style={{
                  display:
                    "block",
                  marginBottom: 8,
                  fontFamily:
                    "var(--font-geist-mono), monospace",
                  fontSize: 8,
                  letterSpacing:
                    "0.16em",
                  textTransform:
                    "uppercase",
                  color:
                    "rgba(255,255,255,0.35)",
                }}
              >
                Tell Us About Your
                Project
              </label>

              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={
                  handleChange
                }
                placeholder="Describe your project — scope, timeline, goals, and any reference designs you love..."
                className="form-input"
                rows={7}
                required
                style={{
                  resize:
                    "vertical",
                  minHeight: 160,
                }}
              />
            </div>

            {/* Submit */}

            <motion.button
              type="submit"
              disabled={sending}
              className="btn-primary"
              whileHover={
                !sending
                  ? {
                      y: -2,
                    }
                  : undefined
              }
              whileTap={
                !sending
                  ? {
                      scale: 0.98,
                    }
                  : undefined
              }
              style={{
                width: "100%",
                minHeight: 52,
                justifyContent:
                  "center",
                gap: 10,
                opacity:
                  sending ? 0.65 : 1,
                cursor:
                  sending
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {sending ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                  Sending Message...
                </>
              ) : (
                <>
                  Send Message
                  <Send
                    size={15}
                    strokeWidth={1.8}
                  />
                </>
              )}
            </motion.button>

            {/* Direct email */}

            <p
              style={{
                margin:
                  "18px 0 0",
                textAlign:
                  "center",
                fontFamily:
                  "var(--font-jakarta), sans-serif",
                fontSize: 10,
                lineHeight: 1.6,
                color:
                  "rgba(255,255,255,0.3)",
              }}
            >
              Or email us directly at{" "}
              <a
                href={`mailto:${ZALONT_EMAIL}`}
                style={{
                  color:
                    "#c9a96e",
                  textDecoration:
                    "none",
                }}
              >
                {ZALONT_EMAIL}
              </a>
            </p>
          </motion.form>
        </div>

        {/* =================================================
            BOTTOM STATUS
        ================================================= */}

        <motion.div
          variants={fadeUpVariant}
          style={{
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            flexWrap:
              "wrap",
            gap: 15,
            marginTop: 55,
            paddingTop: 20,
            borderTop:
              "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap: 9,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius:
                  "50%",
                background:
                  "#c9a96e",
                boxShadow:
                  "0 0 10px rgba(201,169,110,0.7)",
              }}
            />

            <span
              style={{
                fontFamily:
                  "var(--font-geist-mono), monospace",
                fontSize: 8,
                letterSpacing:
                  "0.16em",
                color:
                  "rgba(255,255,255,0.25)",
              }}
            >
              CONNECTION OPEN
            </span>
          </div>

          <span
            style={{
              fontFamily:
                "var(--font-geist-mono), monospace",
              fontSize: 8,
              letterSpacing:
                "0.16em",
              color:
                "rgba(201,169,110,0.35)",
            }}
          >
            ZALONT / 05 / END
          </span>
        </motion.div>
      </motion.div>

      {/* ===================================================
          RESPONSIVE
      =================================================== */}

      <style jsx>{`
        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 560px) {
          .contact-form-row {
            grid-template-columns: 1fr !important;
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