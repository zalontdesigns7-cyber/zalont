// "use client";

// import React, { useRef } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
// } from "framer-motion";

// interface HeroZoomProps {
//   children: React.ReactNode;
// }

// export default function HeroZoom({
//   children,
// }: HeroZoomProps) {
//   const containerRef =
//     useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: [
//       "start start",
//       "end end",
//     ],
//   });

//   /*
//    * HERO ZOOM
//    *
//    * 0%   → normal Hero
//    * 15%  → starts moving forward
//    * 70%  → deep zoom
//    * 100% → completely transitioned
//    */
//   const scale = useTransform(
//     scrollYProgress,
//     [0, 0.15, 0.7, 1],
//     [1, 1.05, 6, 14]
//   );

//   /*
//    * Fade the Hero near the end of the
//    * transition rather than disappearing
//    * too early.
//    */
//   const opacity = useTransform(
//     scrollYProgress,
//     [0, 0.55, 0.78, 0.92, 1],
//     [1, 1, 0.8, 0.15, 0]
//   );

//   /*
//    * Creates the dark portal/tunnel effect.
//    */
//   const overlayOpacity = useTransform(
//     scrollYProgress,
//     [0, 0.25, 0.65, 0.9, 1],
//     [0, 0.05, 0.35, 0.85, 1]
//   );

//   /*
//    * Slight blur as the Hero moves
//    * through the portal.
//    */
//   const blur = useTransform(
//     scrollYProgress,
//     [0, 0.45, 0.8, 1],
//     [0, 0, 2, 8]
//   );

//   /*
//    * Tiny rotation makes the transition
//    * feel more dimensional.
//    */
//   const rotate = useTransform(
//     scrollYProgress,
//     [0, 0.7, 1],
//     [0, 0.4, 1]
//   );

//   return (
//     <section
//       ref={containerRef}
//       style={{
//         position: "relative",
//         height: "160vh",
//         width: "100%",
//         zIndex: 20,
//       }}
//     >
//       {/* =========================================
//           STICKY HERO VIEWPORT
//       ========================================= */}

//       <div
//         style={{
//           position: "sticky",
//           top: 0,
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//           background: "#020408",
//         }}
//       >
//         {/* =======================================
//             ZOOMING HERO
//         ======================================= */}

//         <motion.div
//           style={{
//             position: "absolute",
//             inset: 0,

//             scale,
//             opacity,
//             rotate,

//             filter: useTransform(
//               blur,
//               (value) =>
//                 `blur(${value}px)`
//             ),

//             transformOrigin:
//               "50% 50%",

//             willChange:
//               "transform, opacity, filter",

//             height: "100%",
//             width: "100%",
//           }}
//         >
//           {children}
//         </motion.div>

//         {/* =======================================
//             PORTAL VIGNETTE
//         ======================================= */}

//         <motion.div
//           aria-hidden="true"
//           style={{
//             position: "absolute",
//             inset: 0,

//             background:
//               "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(2,4,8,0.05) 20%, rgba(2,4,8,0.55) 55%, #020408 100%)",

//             opacity: overlayOpacity,

//             pointerEvents: "none",

//             zIndex: 5,
//           }}
//         />

//         {/* =======================================
//             CENTER PORTAL
//         ======================================= */}

//         <motion.div
//           aria-hidden="true"
//           style={{
//             position: "absolute",
//             left: "50%",
//             top: "50%",

//             width: "min(70vw, 700px)",
//             height: "min(70vw, 700px)",

//             transform:
//               "translate(-50%, -50%)",

//             borderRadius: "50%",

//             border:
//               "1px solid rgba(201,169,110,0.18)",

//             boxShadow:
//               "0 0 80px rgba(201,169,110,0.08), inset 0 0 80px rgba(201,169,110,0.05)",

//             opacity: overlayOpacity,

//             pointerEvents: "none",

//             zIndex: 6,
//           }}
//         />

//         {/* =======================================
//             GOLD CENTER FLASH
//         ======================================= */}

//         <motion.div
//           aria-hidden="true"
//           style={{
//             position: "absolute",
//             left: "50%",
//             top: "50%",

//             width: 4,
//             height: 4,

//             transform:
//               "translate(-50%, -50%)",

//             borderRadius: "50%",

//             background:
//               "#c9a96e",

//             boxShadow:
//               "0 0 25px rgba(201,169,110,0.9), 0 0 80px rgba(201,169,110,0.4)",

//             opacity: useTransform(
//               scrollYProgress,
//               [0.45, 0.7, 0.88, 1],
//               [0, 0.1, 0.5, 0]
//             ),

//             pointerEvents: "none",

//             zIndex: 7,
//           }}
//         />

//         {/* =======================================
//             TUNNEL RINGS
//         ======================================= */}

//         {[0, 1, 2].map(
//           (index) => (
//             <motion.div
//               key={index}
//               aria-hidden="true"
//               style={{
//                 position: "absolute",
//                 left: "50%",
//                 top: "50%",

//                 width: `${180 + index * 160}px`,
//                 height: `${180 + index * 160}px`,

//                 transform:
//                   "translate(-50%, -50%)",

//                 borderRadius: "50%",

//                 border:
//                   "1px solid rgba(201,169,110,0.12)",

//                 scale: useTransform(
//                   scrollYProgress,
//                   [0.25, 0.65, 1],
//                   [
//                     0.4 + index * 0.1,
//                     1.2 + index * 0.2,
//                     2.8 + index * 0.4,
//                   ]
//                 ),

//                 opacity:
//                   useTransform(
//                     scrollYProgress,
//                     [0.2, 0.5, 0.85, 1],
//                     [
//                       0,
//                       0.25,
//                       0.12,
//                       0,
//                     ]
//                   ),

//                 pointerEvents:
//                   "none",

//                 zIndex: 4,
//               }}
//             />
//           )
//         )}
//       </div>
//     </section>
//   );
// }