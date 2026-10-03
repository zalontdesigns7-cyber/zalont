"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";

/* ============================================================
   TYPES
============================================================ */

interface ScrollRevealProps {
  children: React.ReactNode;

  delay?: number;

  direction?:
    | "up"
    | "down"
    | "left"
    | "right"
    | "none";

  duration?: number;

  className?: string;

  style?: React.CSSProperties;

  once?: boolean;
}

/* ============================================================
   DIRECTION MAP
============================================================ */

const directionMap = {
  up: {
    x: 0,
    y: 40,
  },

  down: {
    x: 0,
    y: -40,
  },

  left: {
    x: -40,
    y: 0,
  },

  right: {
    x: 40,
    y: 0,
  },

  none: {
    x: 0,
    y: 0,
  },
} as const;

/* ============================================================
   SHARED EASING
============================================================ */

const cinematicEase = [
  0.16,
  1,
  0.3,
  1,
] as const;

/* ============================================================
   SCROLL REVEAL
============================================================ */

export default function ScrollReveal({
  children,

  delay = 0,

  direction = "up",

  duration = 0.7,

  className = "",

  style = {},

  once = true,
}: ScrollRevealProps) {
  const ref =
    useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once,
    margin: "-60px",
  });

  const offset =
    directionMap[direction];

  const initialScale =
    direction === "none"
      ? 0.95
      : 1;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: initialScale,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }
          : undefined
      }
      transition={{
        duration,
        delay,
        ease: cinematicEase,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   STAGGER CONTAINER
============================================================ */

interface StaggerContainerProps {
  children: React.ReactNode;

  staggerDelay?: number;

  className?: string;

  style?: React.CSSProperties;

  once?: boolean;
}

export function StaggerContainer({
  children,

  staggerDelay = 0.1,

  className = "",

  style = {},

  once = true,
}: StaggerContainerProps) {
  const ref =
    useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once,
    margin: "-40px",
  });

  const variants: Variants = {
    hidden: {},

    visible: {
      transition: {
        staggerChildren:
          staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={
        isInView
          ? "visible"
          : "hidden"
      }
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   STAGGER ITEM
============================================================ */

interface StaggerItemProps {
  children: React.ReactNode;

  className?: string;

  style?: React.CSSProperties;

  direction?:
    | "up"
    | "down"
    | "left"
    | "right";
}

export function StaggerItem({
  children,

  className = "",

  style = {},

  direction = "up",
}: StaggerItemProps) {
  const offset =
    directionMap[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },

    visible: {
      opacity: 1,
      x: 0,
      y: 0,

      transition: {
        duration: 0.6,
        ease: cinematicEase,
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}