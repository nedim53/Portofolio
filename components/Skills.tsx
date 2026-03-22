"use client";

import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    label: "Frontend",
    color: "#6c63ff",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 90 },
      { name: "Three.js", level: 35 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    label: "Backend",
    color: "#00e5ff",
    skills: [
      { name: "Node.js", level: 60 },
      { name: "Express.js", level: 60 },
      { name: "FastAPI", level: 80 },
      { name: "C#", level: 35 },
    ],
  },
  {
    label: "Databases",
    color: "#ff4d6d",
    skills: [
      { name: "MySQL", level: 75 },
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 50 },
      { name: "SQLite", level: 65 },
    ],
  },
  {
    label: "Design",
    color: "#f59e0b",
    skills: [
      { name: "Photoshop", level: 80 },
      { name: "Illustrator", level: 75 },
      { name: "Video Editing", level: 55 },
      { name: "Animate", level: 50 },
    ],
  },
];

const tools = [
  "Git", "GitHub", "Linux Ubuntu", "Embedded JS", "Kotlin (basics)",
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="group" style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-mono text-[var(--text)]" style={{ fontFamily: "var(--font-mono)" }}>
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color, fontFamily: "var(--font-mono)" }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1200 ease-out"
          style={{
            width: animated ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 10px ${color}60`,
            transitionDuration: "1200ms",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* BG accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`mb-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              02. Skills
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[var(--accent)] to-transparent" />
          </div>
          <h2
            className="text-5xl md:text-6xl font-display font-800 text-[var(--text)] leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            What I{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(108,99,255,0.6)",
                color: "transparent",
              }}
            >
              Work With
            </span>
          </h2>
        </div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillGroups.map((group, gi) => (
            <div
              key={group.label}
              className={`gradient-border p-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                background: "rgba(14,14,31,0.8)",
                transitionDelay: `${gi * 100}ms`,
              }}
            >
              {/* Group header */}
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }}
                />
                <span
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: group.color, fontFamily: "var(--font-mono)" }}
                >
                  {group.label}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-5">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={group.color}
                    delay={gi * 100 + si * 80}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div
          className={`transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)" }}>
            Tools & Other
          </p>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-lg text-sm font-mono text-[var(--muted)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(108,99,255,0.4)] hover:text-[var(--text)] transition-all duration-200"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
