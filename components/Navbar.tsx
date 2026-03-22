"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("About");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-[rgba(108,99,255,0.15)] py-3"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c63ff] to-[#00e5ff] flex items-center justify-center text-xs font-bold font-mono text-white">
            NZ
          </div>
          <span
            className="font-display text-sm font-700 tracking-widest uppercase text-[var(--muted)] group-hover:text-[var(--text)] transition-colors"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.2em" }}
          >
            Nedim Zec
          </span>
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`relative font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                  active === link.label
                    ? "text-[var(--accent2)]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span className="text-[var(--accent)] mr-1 opacity-60">
                  {String(links.indexOf(link) + 1).padStart(2, "0")}.
                </span>
                {link.label}
                {active === link.label && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:zec.nedim13@gmail.com"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(108,99,255,0.4)] text-xs font-mono text-[var(--accent)] hover:bg-[rgba(108,99,255,0.1)] transition-all duration-200"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent2)] animate-pulse" />
          Open to work
        </a>
      </div>
    </nav>
  );
}
