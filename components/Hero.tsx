"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Custom cursor
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${x - 6}px`;
        dotRef.current.style.top = `${y - 6}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${x - 18}px`;
        ringRef.current.style.top = `${y - 18}px`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Three.js setup
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 30;

    // Particle field
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const color1 = new THREE.Color("#6c63ff");
    const color2 = new THREE.Color("#00e5ff");
    const color3 = new THREE.Color("#ff4d6d");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const r = Math.random();
      const c = r < 0.5 ? color1 : r < 0.8 ? color2 : color3;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Floating torus knot (glowing)
    const torusGeo = new THREE.TorusKnotGeometry(5, 1.2, 180, 30, 2, 3);
    const torusMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#6c63ff"),
      emissive: new THREE.Color("#6c63ff"),
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(14, -2, -5);
    torus.scale.set(0.9, 0.9, 0.9);
    scene.add(torus);

    // Second smaller accent torus
    const torus2Geo = new THREE.TorusGeometry(3, 0.4, 20, 80);
    const torus2Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#00e5ff"),
      emissive: new THREE.Color("#00e5ff"),
      emissiveIntensity: 0.4,
      metalness: 1,
      roughness: 0.05,
      wireframe: true,
    });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2.position.set(-16, 4, -10);
    scene.add(torus2);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight("#6c63ff", 8, 60);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight("#00e5ff", 5, 60);
    pointLight2.position.set(-15, -5, 5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight("#ff4d6d", 3, 40);
    pointLight3.position.set(0, -15, 8);
    scene.add(pointLight3);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let frame = 0;
    const animate = () => {
      const id = requestAnimationFrame(animate);
      frame += 0.005;

      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;

      torus.rotation.x += 0.006;
      torus.rotation.y += 0.004;
      torus2.rotation.x -= 0.008;
      torus2.rotation.z += 0.005;

      // Mouse parallax on camera
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.04;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.04;

      // Floating motion
      torus.position.y = -2 + Math.sin(frame * 1.2) * 1.5;
      torus2.position.y = 4 + Math.cos(frame * 0.8) * 2;

      renderer.render(scene, camera);
    };
    animate();

    setTimeout(() => setLoaded(true), 200);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const roles = ["Software Engineer", "Frontend Developer", "Fullstack Developer", "Creative Coder"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const role = roles[roleIdx];
    if (typing) {
      if (displayed.length < role.length) {
        const t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setRoleIdx((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Custom cursor */}
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070710] via-[#070710]/80 to-transparent pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#070710] to-transparent pointer-events-none" style={{ zIndex: 1 }} />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20" style={{ zIndex: 2 }}>
        <div
          className={`transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Tag */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--accent)]" />
            <span
              className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Available for work
            </span>
            <div className="w-2 h-2 rounded-full bg-[var(--accent2)] animate-pulse" />
          </div>

          {/* Name */}
          <h1
            className="font-display text-7xl md:text-9xl font-800 leading-none mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            <span className="block text-[var(--text)]">NEDIM</span>
            <span className="block shimmer-text">ZEC</span>
          </h1>

          {/* Typewriter role */}
          <div className="flex items-center gap-2 mb-8 h-10">
            <span
              className="text-xl md:text-2xl font-mono text-[var(--muted)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              &lt;
            </span>
            <span
              className="text-xl md:text-2xl font-mono text-[var(--accent2)]"
              style={{ fontFamily: "var(--font-mono)", minWidth: "260px" }}
            >
              {displayed}
              <span className="inline-block w-0.5 h-6 bg-[var(--accent2)] animate-pulse ml-0.5 align-middle" />
            </span>
            <span
              className="text-xl md:text-2xl font-mono text-[var(--muted)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              /&gt;
            </span>
          </div>

          {/* Description */}
          <p
            className="max-w-xl text-base md:text-lg text-[var(--muted)] leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Passionate about building{" "}
            <span className="text-[var(--text)]">modern web experiences</span> with clean code,
            creative UI, and solid engineering. Based in{" "}
            <span className="text-[var(--accent2)]">Sarajevo, Bosnia & Herzegovina</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#projects"
              className="group relative px-8 py-3.5 rounded-xl text-sm font-mono font-medium overflow-hidden"
              style={{
                fontFamily: "var(--font-mono)",
                background: "linear-gradient(135deg, #6c63ff, #00e5ff)",
                color: "#fff",
              }}
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-xl text-sm font-mono border border-[rgba(108,99,255,0.4)] text-[var(--accent)] hover:bg-[rgba(108,99,255,0.08)] transition-all duration-200"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Get in Touch
            </a>
          </div>

          {/* Quick info grid */}
          <div className="grid grid-cols-3 gap-6 max-w-sm">
            {[
              { label: "Experience", value: "2+ yrs" },
              { label: "Projects", value: "10+" },
              { label: "Education", value: "Faculty of Natural Sciences, Sarajevo" },
            ].map((item) => (
              <div key={item.label}>
                <div
                  className="text-2xl font-display font-800 text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                >
                  {item.value}
                </div>
                <div
                  className="text-xs text-[var(--muted)] mt-1"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6 mt-10">
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
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent2)] transition-colors duration-200 text-sm"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {social.icon}
                <span className="text-xs">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        style={{ zIndex: 2 }}
      >
        <span className="text-xs font-mono text-[var(--muted)] tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
          SCROLL
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--accent)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
