"use client";

import { useEffect, useRef, useState } from "react";

type ProjectLinks = {
  github: string;
  live?: string;
  video?: string;
};

type Project = {
  number: string;
  title: string;
  short: string;
  description: string;
  tags: string[];
  color: string;
  icon: string;
  links: ProjectLinks;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Nelson Cabinetry — 3D Kitchen Lab",
    short: "Nelson 3D",
    description:
      "An interactive kitchen design surface powered by React Three Fiber: GLB cabinet loading, drag-and-drop with AABB collision so models never overlap, instant 2D top-down view, editable 3D text notes, and Firebase-backed autosave with undo/redo.",
    tags: ["Next.js", "R3F", "Three.js", "Firebase", "Zustand"],
    color: "#6c63ff",
    icon: "🪑",
    links: {
      github: "https://github.com/nedim53/nelson-3d",
      live: "https://nelson-3d.vercel.app/",
    },
  },
  {
    number: "02",
    title: "NextLeague",
    short: "NextLeague",
    description:
      "A full-stack league operating system for admins and players—create seasons, onboard teams with branding, log fixtures, and surface standings, search, and analytics from a single Next.js + FastAPI control center.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript"],
    color: "#00e5ff",
    icon: "⚽",
    links: {
      github: "https://github.com/nedim53/NextLeague",
      video: "https://youtu.be/qwrfvgCDzGg",
    },
  },
  {
    number: "03",
    title: "AI Job Matcher & CV Studio",
    short: "AI CV",
    description:
      "HR builds job posts in a dashboard while candidates upload CVs to Supabase storage. Gemini and Together AI models analyze compatibility, stream structured feedback, and power personalized job recommendations with strict RLS policies.",
    tags: ["Next.js", "FastAPI", "Supabase", "Gemini"],
    color: "#ff4d6d",
    icon: "📄",
    links: {
      github: "https://github.com/nedim53/Ai-cv-2025",
    },
  },
  {
    number: "04",
    title: "Chess vs AI",
    short: "ChessVSAi",
    description:
      "A focused chess client pairing react-chessboard with chess.js validation, Socket.io-powered sync, and pluggable AI providers (Groq, OpenAI, or Google). Includes move history, check highlights, promotion flows, and a deployable Vercel + Node stack.",
    tags: ["Next.js", "Socket.io", "Express", "Tailwind"],
    color: "#f59e0b",
    icon: "♟️",
    links: {
      github: "https://github.com/nedim53/ChessVSAi",
      video: "https://youtu.be/bG19nJgXykM",
    },
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const linkBase =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        className="relative overflow-hidden rounded-2xl p-8 h-full flex flex-col transition-all duration-300"
        style={{
          background: hovered
            ? `linear-gradient(135deg, rgba(14,14,31,0.95), rgba(14,14,31,0.9))`
            : "rgba(14,14,31,0.6)",
          border: `1px solid ${hovered ? project.color + "50" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered ? `0 0 40px ${project.color}20, inset 0 0 60px ${project.color}05` : "none",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${project.color}12, transparent 60%)`,
          }}
        />

        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-4xl font-800 leading-none"
              style={{
                fontFamily: "var(--font-mono)",
                color: `${project.color}30`,
                fontWeight: 800,
              }}
            >
              {project.number}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              {project.icon}
            </span>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.2)] transition-colors"
              title="View repository on GitHub"
              aria-label={`${project.title} on GitHub`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--muted)]">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
            </a>
          </div>
        </div>

        <h3
          className="text-xl font-display font-700 text-[var(--text)] mb-3 leading-snug"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent2)] transition-colors"
          >
            {project.title}
          </a>
        </h3>

        <p
          className="text-sm text-[var(--muted)] leading-relaxed mb-5 flex-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={linkBase}
            style={{
              fontFamily: "var(--font-mono)",
              borderColor: `${project.color}55`,
              color: project.color,
              background: `${project.color}12`,
            }}
          >
            GitHub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
          </a>
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} border-[rgba(255,255,255,0.1)] text-[var(--text)] hover:border-[rgba(108,99,255,0.35)]`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Live demo
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          ) : null}
          {project.links.video ? (
            <a
              href={project.links.video}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} border-[rgba(255,255,255,0.1)] text-[var(--muted)] hover:text-[var(--accent2)] hover:border-[rgba(0,229,255,0.35)]`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Walkthrough
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-md text-xs font-mono"
              style={{
                fontFamily: "var(--font-mono)",
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{
            width: hovered ? "100%" : "0%",
            background: `linear-gradient(90deg, ${project.color}, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div
        className="absolute top-20 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-20 left-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,77,109,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`mb-20 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              03. Projects
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[var(--accent)] to-transparent" />
          </div>
          <h2
            className="text-5xl md:text-6xl font-display font-800 text-[var(--text)] leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            Featured{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(0,229,255,0.5)",
                color: "transparent",
              }}
            >
              Work
            </span>
          </h2>
          <p
            className="mt-4 max-w-2xl text-sm text-[var(--muted)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Each card links straight to the GitHub repository; live demos and walkthrough videos are included when
            they exist so you can explore before cloning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.links.github} project={project} index={i} />
          ))}
        </div>

        <div
          className={`mt-20 transition-all duration-700 delay-300 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              Experience
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[var(--accent)] to-transparent" />
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                role: "IT Support Specialist ",
                company: "Eki",
                period: "Current",
                color: "#f59e0b",
              },
              {
                role: "Frontend Developer (Part-time)",
                company: "Maus",
                period: "Previous",
                color: "#6c63ff",
              },
              {
                role: "Fullstack Developer Intern",
                company: "HTEC",
                period: "Previous",
                color: "#00e5ff",
              },
              {
                role: "Sales Manager",
                company: "GEMA",
                period: "Previous",
                color: "#ff4d6d",
              },
            ].map((exp) => (
              <div
                key={exp.company}
                className="flex items-center justify-between p-5 rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-[rgba(108,99,255,0.25)] transition-all duration-200 group"
                style={{ background: "rgba(14,14,31,0.5)" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: exp.color, boxShadow: `0 0 8px ${exp.color}` }}
                  />
                  <div>
                    <div className="text-sm font-display font-600 text-[var(--text)]" style={{ fontFamily: "var(--font-display)" }}>
                      {exp.role}
                    </div>
                    <div className="text-xs font-mono text-[var(--muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                      {exp.company}
                    </div>
                  </div>
                </div>
                <span
                  className="text-xs font-mono px-3 py-1 rounded-md"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: `${exp.color}15`,
                    color: exp.color,
                  }}
                >
                  {exp.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
