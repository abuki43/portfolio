import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useThemeAudio } from "../context/ThemeAudioContext";
import { BulletSeparator } from "./Ornaments";

const Hero = () => {
  const { theme, playClick } = useThemeAudio();
  const [currentDate, setCurrentDate] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse coordinate tracking for CAD crosshairs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 250, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 250, damping: 25 });

  const coordsRef = useRef<HTMLDivElement | null>(null);
  const [showRulers, setShowRulers] = useState(false);

  useEffect(() => {
    // Format date in engineering schematic spec
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const today = new Date();
    setCurrentDate(today.toLocaleDateString("en-US", options).toUpperCase());
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Position relative to hero container
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
    if (coordsRef.current) {
      coordsRef.current.textContent = `x: ${Math.round(relativeX)}px | y: ${Math.round(relativeY)}px`;
    }
  };

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/abubeker-abe-bb2325285?" },
    { name: "GitHub", url: "https://github.com/abuki43" },
    { name: "Telegram", url: "https://t.me/ABking1" },
    { name: "Instagram", url: "https://www.instagram.com/abuki431/" },
  ];

  const schemas = {
    gazette: "CORE SCHEMATIC // DRAFT_043",
    blueprint: "ENGINEERING BLUEPRINT SHEET // DRAFT_EAT",
    monospace: "CONSOLE_KERNEL // ABUBEKER_DUMP"
  };

  return (
    <section
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowRulers(true)}
      onMouseLeave={() => setShowRulers(false)}
      className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-6 relative overflow-hidden select-none cursor-none"
    >
      {/* Interactive CAD Crosshairs */}
      {showRulers && (
        <>
          {/* Horizontal tracking line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-primary/20 pointer-events-none z-10"
            style={{ top: springY }}
          />
          {/* Vertical tracking line */}
          <motion.div
            className="absolute top-0 bottom-0 w-px bg-primary/20 pointer-events-none z-10"
            style={{ left: springX }}
          />

          {/* Coordinate overlay floating near crosshair */}
          <motion.div
            ref={coordsRef}
            className="absolute text-[8px] font-mono pointer-events-none px-1.5 py-0.5 rounded select-none z-10 border border-primary/25 bg-paper-alt opacity-70"
            style={{
              left: springX,
              top: springY,
              x: 12,
              y: 12
            }}
          >
            x: 0px | y: 0px
          </motion.div>
        </>
      )}

      <div className="container mx-auto max-w-6xl relative z-25">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col text-left"
        >
          {/* Slogan */}
          <span className="caption text-[10px] font-mono tracking-[0.25em] mb-3 text-secondary text-center block">
            {schemas[theme]} // STATUS: ONLINE & READY
          </span>

          {/* Big Architecture Title block (CAD Header Grid) */}
          <div className="border border-primary/25 p-6 md:p-8 rounded-sm bg-paper-alt/25 relative overflow-hidden backdrop-blur-xs text-center flex flex-col items-center justify-center">
            {/* Corner architectural crosses */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/40 -translate-x-1 -translate-y-1" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/40 translate-x-1 -translate-y-1" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/40 -translate-x-1 translate-y-1" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/40 translate-x-1 translate-y-1" />

            <div className="absolute right-3 top-3 text-[9px] font-mono opacity-40 hidden md:block">
              SHEET 01 // REV D
            </div>

            <h1
              className={`font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-none mb-2 letterpress whitespace-nowrap ${theme === "monospace" ? "font-mono" : ""
                }`}
            >
              Abubeker Abe
            </h1>

            <div className="font-mono text-xs sm:text-sm font-semibold text-accent tracking-wider uppercase mb-2">
              Full-Stack Software Engineer & Mobile Developer
            </div>

            <p className="font-mono text-xs text-secondary/90 leading-relaxed max-w-2xl mx-auto text-center">
              Building fast, scalable web applications and cross-platform mobile experiences with React Native, Next.js, TypeScript, and robust backend systems.
            </p>
          </div>

          {/* Engineering Metadata Block */}
          <div className="border-b border-x border-primary/25 px-6 py-3 flex flex-wrap justify-between items-center text-[10px] font-mono tracking-wider text-secondary font-bold uppercase gap-2 bg-paper-alt/10">
            <div>INDEX NO. 043</div>
            <div className="hidden md:block">LOC: ADDIS ABABA, ETHIOPIA</div>
            <div>DRAFT_DATE: {currentDate || "OCT 2026"}</div>
            <div className="hidden md:block">OPEN TO: REMOTE & HYBRID</div>
            <div className="text-emerald-500 font-bold">STATUS: AVAILABLE FOR HIRE</div>
          </div>

          {/* Drafting Columns details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left my-8 border-b border-dashed border-primary/20 pb-8">

            {/* Column 1: Core System overview */}
            <div className="md:col-span-5 flex flex-col justify-start">
              <span className="text-[9px] font-mono text-secondary uppercase font-bold mb-2">
                [SECTION 01: CORE EXPERTISE]
              </span>
              <h3 className="font-heading text-lg md:text-xl font-bold text-primary mb-3">
                Full-Stack & Mobile Engineering
              </h3>
              <p className="font-body text-sm text-ink/90 leading-relaxed text-justify">
                Specialized in architecting end-to-end applications from responsive frontend interfaces to resilient backend APIs. Experienced in shipping cross-platform mobile apps with React Native, high-performance Next.js web applications, and database architectures serving thousands of active users.
              </p>
            </div>

            {/* Column 2: Blueprint Rotating Compass (Centerpiece) */}
            <div className="md:col-span-3 flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-primary/10 py-6 md:py-0">
              <div className="relative w-24 h-24 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
                {/* Scroll compass circle */}
                <svg
                  className="w-20 h-20 text-primary animate-spin-[spin_10s_linear_infinite]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="12" r="8" strokeDasharray="2 2" />
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M2 12h20" strokeLinecap="round" />
                  <path d="M5 5l14 14M5 19l14-14" strokeWidth="0.5" strokeDasharray="1 1" />
                </svg>
                <div className="absolute text-[8px] font-mono tracking-widest font-bold text-accent">
                  CAD
                </div>
              </div>
              <span className="caption text-[8px] text-center mt-2 text-secondary/65 italic">
                Fig 01. Precision Architecture
              </span>
            </div>

            {/* Column 3: Tech details & PDF download */}
            <div className="md:col-span-4 flex flex-col justify-start">
              <span className="text-[9px] font-mono text-secondary uppercase font-bold mb-2">
                [SECTION 02: SPECIALIZATIONS]
              </span>
              <h3 className="font-heading text-lg md:text-xl font-bold text-primary mb-3">
                Modern Stack & Tooling
              </h3>
              <p className="font-body text-xs text-ink/80 leading-relaxed text-justify mb-4">
                Proficient in TypeScript, React, React Native, Node.js, PostgreSQL, and Web3 / DeFi protocols. Focused on writing type-safe, maintainable code with strict performance budgets and intuitive UX.
              </p>

              {/* PDF Blueprint Download button */}
              <div className="pt-2 border-t border-primary/10">
                <a
                  href="/Abubeker_Abe_Resume.pdf"
                  download
                  onClick={() => playClick(1.3)}
                  onMouseEnter={() => playClick(1.05)}
                  className={`inline-block text-xs font-mono font-bold text-accent hover:underline flex items-center gap-1.5 cursor-none`}
                >
                  📄 DOWNLOAD RESUME / CV (PDF) ↗
                </a>
              </div>
            </div>

          </div>

          {/* Social connections ledger bottom line */}
          <div className="flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-secondary/85 py-1">
            <span className="text-[9px] font-mono uppercase hidden sm:inline">
              // CONNECT & SOCIAL PROFILES
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick(1.25)}
                  onMouseEnter={() => playClick(1.05)}
                  className="hover:text-primary transition-colors hover:underline cursor-none flex items-center gap-1"
                >
                  ↗ {link.name}
                </a>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
