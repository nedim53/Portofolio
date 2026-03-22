"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again or email directly.");
        return;
      }
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch {
      setError("Network error. Check your connection or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* BG glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--accent)]" />
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              04. Contact
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--accent)]" />
          </div>
          <h2
            className="text-5xl md:text-6xl font-display font-800 text-[var(--text)] leading-none mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            Let's{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(108,99,255,0.6)",
                color: "transparent",
              }}
            >
              Connect
            </span>
          </h2>
          <p className="text-[var(--muted)] max-w-md mx-auto text-sm" style={{ fontFamily: "var(--font-display)" }}>
            Open to new opportunities, collaborations, or just a good conversation about tech.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info panel */}
          <div
            className={`lg:col-span-2 flex flex-col gap-6 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {[
              {
                label: "Email",
                value: "zec.nedim13@gmail.com",
                href: "mailto:zec.nedim13@gmail.com",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                ),
              },
              {
                label: "Phone",
                value: "062-141/867",
                href: "tel:062141867",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .99h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
              },
              {
                label: "Location",
                value: "Sarajevo, BiH",
                href: "#",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
              },
            ].map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="group flex items-center gap-4 p-5 rounded-xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(108,99,255,0.3)] transition-all duration-200"
                style={{ background: "rgba(14,14,31,0.6)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--accent)] group-hover:text-[var(--accent2)] transition-colors"
                  style={{ background: "rgba(108,99,255,0.1)" }}
                >
                  {info.icon}
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--muted)] mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                    {info.label}
                  </div>
                  <div className="text-sm text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
                    {info.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="flex gap-4 pt-2">
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/nedim53",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/nedim-zec-b79051337/",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(108,99,255,0.4)] transition-all duration-200"
                  style={{ background: "rgba(14,14,31,0.6)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <form
              onSubmit={handleSubmit}
              className="gradient-border p-8 flex flex-col gap-5"
              style={{ background: "rgba(14,14,31,0.8)" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label
                    className="block text-xs font-mono text-[var(--muted)] mb-2 uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg text-sm text-[var(--text)] placeholder-[var(--muted)] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] focus:border-[rgba(108,99,255,0.5)] focus:outline-none transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  />
                </div>
                {/* Email */}
                <div>
                  <label
                    className="block text-xs font-mono text-[var(--muted)] mb-2 uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg text-sm text-[var(--text)] placeholder-[var(--muted)] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] focus:border-[rgba(108,99,255,0.5)] focus:outline-none transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-xs font-mono text-[var(--muted)] mb-2 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-lg text-sm text-[var(--text)] placeholder-[var(--muted)] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] focus:border-[rgba(108,99,255,0.5)] focus:outline-none transition-colors resize-none"
                  style={{ fontFamily: "var(--font-mono)" }}
                />
              </div>

              {error && (
                <p
                  className="text-sm text-[#ff6b8a] font-mono"
                  style={{ fontFamily: "var(--font-mono)" }}
                  role="alert"
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-3.5 rounded-xl font-mono text-sm font-medium overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "linear-gradient(135deg, #6c63ff, #00e5ff)",
                  color: "#fff",
                  boxShadow: sent ? "0 0 30px rgba(108,99,255,0.5)" : "none",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>Sending…</>
                  ) : sent ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Message sent
                    </>
                  ) : (
                    <>
                      Send message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono text-[var(--muted)]" style={{ fontFamily: "var(--font-mono)" }}>
            © 2026 Nedim Zec. Built with Next.js & Three.js
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--accent2)] animate-pulse" />
            <span className="text-xs font-mono text-[var(--muted)]" style={{ fontFamily: "var(--font-mono)" }}>
              Sarajevo, Bosnia & Herzegovina
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
