"use client";

import { works } from "@/constants/works";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Collect all unique tags from works
const allTags = ["All", ...Array.from(new Set(works.flatMap((w) => w.tags)))];

export default function WorkPage() {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All" ? works : works.filter((w) => w.tags.includes(activeTag));

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "var(--midnight)" }}
    >
      {/* Grid overlay */}
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="bg-blob"
          style={{ width:"500px", height:"500px", top:"-10%", right:"-10%",
            background:"rgba(124,58,237,0.14)", animationDuration:"16s" }}
        />
        <div
          className="bg-blob"
          style={{ width:"400px", height:"400px", bottom:"5%", left:"-8%",
            background:"rgba(6,182,212,0.12)", animationDuration:"20s", animationDelay:"5s" }}
        />
      </div>

      <section className="relative z-10 px-6 py-28">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="fixed left-6 top-6 flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 z-50"
          style={{ color: "var(--violet-light)", border: "1px solid rgba(124,58,237,0.25)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-3 block"
              style={{ color: "var(--violet-light)", letterSpacing:"0.25em" }}
            >
              Portfolio
            </span>
            <h1
              className="font-brand text-6xl md:text-8xl gradient-text mb-6"
              style={{ lineHeight: 1 }}
            >
              Our Work
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--white-70)" }}>
              Explore the blend of design, AI, and engineering behind our best work.
            </p>
          </div>

          {/* Tag filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: activeTag === tag
                    ? "linear-gradient(135deg, var(--violet), var(--cyan))"
                    : "rgba(255,255,255,0.05)",
                  border: activeTag === tag
                    ? "1px solid transparent"
                    : "1px solid rgba(255,255,255,0.10)",
                  color: activeTag === tag ? "white" : "rgba(255,255,255,0.6)",
                  boxShadow: activeTag === tag ? "0 0 20px rgba(124,58,237,0.35)" : "none",
                  transform: activeTag === tag ? "scale(1.05)" : "scale(1)",
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Work grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((work, i) => (
              <div
                key={work.id}
                className="group relative glass rounded-3xl overflow-hidden card-hover"
                style={{
                  borderColor: "var(--border)",
                  animation: `reveal-up 0.6s ease both`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {/* Image */}
                <div className="overflow-hidden h-56 relative">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: "linear-gradient(to top, rgba(5,8,16,0.85) 0%, transparent 60%)" }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-2 tracking-tight"
                    style={{ color: "white" }}
                  >
                    {work.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--white-70)" }}
                  >
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className="px-3 py-1 text-xs rounded-full cursor-pointer transition-all hover:scale-105"
                        style={{
                          background: "rgba(124,58,237,0.12)",
                          border: "1px solid rgba(124,58,237,0.25)",
                          color: "var(--violet-light)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20" style={{ color: "var(--white-40)" }}>
              No works found for <span style={{ color: "var(--violet-light)" }}>{activeTag}</span>.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
