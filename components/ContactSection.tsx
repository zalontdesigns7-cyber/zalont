"use client";

import React, { useState } from "react";
import { toast } from "sonner";

const ZALONT_EMAIL = "zalontdesigns7@gmail.com";

const contactDetails = [
  {
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email",
    value: ZALONT_EMAIL,
    href: `mailto:${ZALONT_EMAIL}`,
    color: "var(--gold)",
    bg: "rgba(201,169,110,0.08)",
    border: "var(--border-gold)",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Based In",
    value: "India · Working Globally",
    href: null,
    color: "rgba(14,100,180,0.9)",
    bg: "rgba(14,40,80,0.35)",
    border: "rgba(14,60,120,0.45)",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
    color: "rgba(200,200,200,0.8)",
    bg: "rgba(255,255,255,0.04)",
    border: "var(--border)",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSending(true);
    
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${ZALONT_EMAIL}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New Project Enquiry from ${form.name}`
        })
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll reply within 24 hours. 🚀");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try emailing us directly.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try emailing us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "8rem 1.5rem", position: "relative" }}>
      {/* Navy dual-tone background panel for this section */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(7,16,30,0.55) 40%, rgba(7,16,30,0.55) 60%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-divider" style={{ maxWidth: 1280, margin: "0 auto 5rem" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="dual-text" style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
            Work With Us
          </span>
          <h2 className="font-brand dual-text" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1, marginBottom: "1rem" }}>
            Let's Create Together
          </h2>
          <p style={{ color: "var(--w60)", maxWidth: 480, margin: "0 auto", lineHeight: 1.8, fontSize: "0.95rem" }}>
            Ready to bring your vision to life? Tell us about your project and we'll respond within 24 hours.
          </p>
        </div>

        <div
          style={{ display: "grid", gap: "2rem", alignItems: "start" }}
          className="lg:grid-cols-5"
        >
          {/* Left — info cards */}
          <div className="lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {contactDetails.map((item, i) => {
              const inner = (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      flexShrink: 0,
                      background: item.bg,
                      border: `1px solid ${item.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--w40)", marginBottom: "0.2rem" }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: "0.88rem", fontWeight: 600, color: item.href ? "var(--gold-light)" : "var(--w80)", wordBreak: "break-all" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              );
              return item.href ? (
                <a
                  key={i}
                  href={item.href}
                  style={{
                    display: "block",
                    padding: "1.25rem",
                    background: "rgba(7,16,30,0.6)",
                    border: "1px solid var(--border)",
                    textDecoration: "none",
                    transition: "border-color 0.25s ease, background 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-gold)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(7,16,30,0.85)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(7,16,30,0.6)";
                  }}
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={i}
                  style={{
                    padding: "1.25rem",
                    background: "rgba(7,16,30,0.4)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {inner}
                </div>
              );
            })}

            {/* Who we work with */}
            <div
              style={{
                padding: "1.5rem",
                background: "rgba(201,169,110,0.04)",
                border: "1px solid var(--border-gold)",
                marginTop: "0.25rem",
              }}
            >
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--w40)", marginBottom: "1rem" }}>
                We Work With
              </p>
              {[
                { emoji: "🚀", label: "Startups", desc: "Launch with impact" },
                { emoji: "🎓", label: "Colleges", desc: "Engage & inspire" },
                { emoji: "🏢", label: "Businesses", desc: "Stand out" },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>{c.emoji}</span>
                  <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--w80)" }}>{c.label}</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--w40)" }}>— {c.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3"
            style={{
              padding: "2.25rem",
              background: "rgba(7,16,30,0.60)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h3 className="dual-text" style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1.75rem", letterSpacing: "0.02em" }}>
              Send Us a Message
            </h3>

            <div
              style={{ display: "grid", gap: "1rem", marginBottom: "1rem" }}
              className="sm:grid-cols-2"
            >
              <div>
                <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--w40)", marginBottom: "0.5rem" }}>
                  Your Name
                </label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Alex Johnson" className="form-input" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--w40)", marginBottom: "0.5rem" }}>
                  Email Address
                </label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="alex@company.com" className="form-input" />
              </div>
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--w40)", marginBottom: "0.5rem" }}>
                Tell Us About Your Project
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your project — scope, timeline, goals, and any reference designs you love..."
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", fontSize: "0.9rem", opacity: sending ? 0.7 : 1 }}
            >
              {sending ? (
                <>
                  <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} style={{ opacity: 0.25 }} />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" style={{ opacity: 0.75 }} />
                  </svg>
                  Sending Message...
                </>
              ) : (
                <>
                  Send Message
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </>
              )}
            </button>

            <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--w40)", marginTop: "1rem" }}>
              Or email us directly at{" "}
              <a href={`mailto:${ZALONT_EMAIL}`} style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                {ZALONT_EMAIL}
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}