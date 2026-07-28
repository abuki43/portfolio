import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeAudio } from "../context/ThemeAudioContext";
import { SectionDivider } from "./Ornaments";

const About = () => {
  const { theme, playClick, playBell } = useThemeAudio();
  const [liveTime, setLiveTime] = useState("");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "// SYSTEM LOG READY",
    "$ cat profile_data.json"
  ]);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  // Live Time Clock Updater
  useEffect(() => {
    const updateTime = () => {
      const eatOffset = 3; // East Africa Time is UTC+3
      const d = new Date();
      const utc = d.getTime() + d.getTimezoneOffset() * 60000;
      const eatDate = new Date(utc + 3600000 * eatOffset);

      const timeStr = eatDate.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setLiveTime(`${timeStr} EAT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom on console update
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // Terminal Ping Diagnostics Simulator
  const runDiagnostic = async () => {
    if (isDiagnosticRunning) return;
    setIsDiagnosticRunning(true);
    playBell();

    const diagnostics = [
      "$ yarn run db:diagnose",
      "📡 CONNECTING TO SERVER ARCHIVE ... CONNECTED",
      "📊 POLLING PORTFOLIO API LATENCY... 12ms",
      "💾 CHECKING SUPABASE CORE SCHEMAS... STABLE",
      "🛡️ TON SMART CONTRACT INTERFACE... VERIFIED",
      "🤖 TELEGRAM BOT CONTROLLERS: ACTIVE (5.2M messages/day)",
      "☕ CPU LOAD: OPTIMIZED (2.4GHz) // COFFEE LEVEL: 85%"
    ];

    setConsoleLogs(["// SYSTEM LOG READY"]);

    for (let i = 0; i < diagnostics.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      playClick(1.0 + i * 0.05);
      setConsoleLogs((prev) => [...prev, diagnostics[i]]);
    }
    setIsDiagnosticRunning(false);
  };

  const skills = [
    {
      category: "FRONT-END ARCHITECTURE",
      items: ["React", "React Native", "Expo", "Next.js", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "BACK-END LEDGERS",
      items: ["Node.js", "NestJS", "TypeScript", "Solidity (EVM)", "PostgreSQL", "MongoDB"]
    },
    {
      category: "NETWORKS & APIS",
      items: ["RESTful API", "WebSockets", "Supabase", "Web3 / dApps", "Stripe", "Chapa API"]
    },
    {
      category: "AUTOMATION ENGINE",
      items: ["Telegram API", "Telegraf CLI", "AI Integration", "Bash Scripting", "GitHub Actions", "Docker"]
    }
  ];

  return (
    <section id="about" className="py-20 px-6 transition-colors duration-500 relative z-10 border-y border-primary/10">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="caption mb-4">Biography & Uptime Specs</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary letterpress">
            {theme === "blueprint" ? "STRUCTURAL_INDEX: ABOUT_BUILDER" : theme === "monospace" ? "BUILDER_SPEC.LOG" : "The Builder's Spec"}
          </h2>
        </motion.div>

        <SectionDivider />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">

          {/* Box 1: Core Bio (Col Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            className={`md:col-span-7 p-6 md:p-8 rounded border flex flex-col justify-between transition-colors shadow-sm select-text relative overflow-hidden ${theme === "blueprint"
              ? "bg-paper-alt/20 border-primary/30 hover:border-primary"
              : theme === "monospace"
                ? "bg-paper-alt border-secondary/35 hover:border-primary font-mono"
                : "bg-paper-alt/30 border-sepia/20 hover:border-sepia"
              }`}
          >
            {/* Background design coordinates */}
            <div className="absolute top-2 right-2 text-[9px] font-mono opacity-25">
              COORD // 09.019° N, 38.747° E
            </div>

            <div>
              <span className="caption text-[10px] block mb-3 font-semibold text-secondary">
                BUILDER PROFILE SPEC
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4 leading-tight">
                Abubeker Abe
              </h3>

              <p className="font-body text-base leading-relaxed text-ink/90 text-justify mb-6">
                A graduated Full-Stack Developer from **Addis Ababa University** specializing in drafting resilient custom architectures. My craft is dedicated to engineering reliable client modules, scaling backend integrations and scripting complex bots.
              </p>
              <p className="font-body text-sm leading-relaxed text-ink/80 text-secondary text-justify">
                Drawing inspiration from structural cad drafts and digital building processes, I focus on coding with strict compilation compliance and clean functional flows.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-primary/10 flex items-center justify-between text-[10px] font-caption text-secondary">
              <span>GRADUATE: ADDIS ABABA UNIVERSITY</span>
              <span className="font-mono">VERIFIED ARCHITECTURE</span>
            </div>
          </motion.div>

          {/* Right Column Boxes Stack */}
          <div className="md:col-span-5 flex flex-col gap-6">

            {/* Box 2: Live Clock & Environment Telemetry */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
              className={`p-6 rounded border transition-colors shadow-sm relative overflow-hidden ${theme === "blueprint"
                ? "bg-paper-alt/25 border-primary/25 hover:border-primary"
                : theme === "monospace"
                  ? "bg-paper-alt border-secondary/35 hover:border-primary font-mono"
                  : "bg-paper-alt/45 border-sepia/15 hover:border-sepia"
                }`}
            >
              <span className="caption text-[10px] block mb-3 font-semibold text-secondary">
                ENVIRONMENT TELEMETRY
              </span>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-caption text-secondary">LOCAL TIME:</span>
                  <span className="font-mono text-base font-bold text-primary tracking-wider">
                    {liveTime || "00:00:00 EAT"}
                  </span>
                </div>

                <div className="h-px bg-primary/10" />

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-secondary block">SYSTEM STATUS</span>
                    <span className="text-accent font-bold">● ACTIVE</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary block">ENV TEMPERATURE</span>
                    <span className="font-semibold text-primary">22°C STABLE</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary block">HOST SPEED</span>
                    <span className="font-semibold text-primary">100 / 100 MBPS</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary block">COFFEE RE-LEVEL</span>
                    <span className="font-semibold text-primary">85% METRIC</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Box 3: Console Debugger Console */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
              onClick={runDiagnostic}
              className={`p-6 rounded border transition-colors shadow-sm cursor-none relative overflow-hidden h-[180px] flex flex-col justify-between ${theme === "blueprint"
                ? "bg-black/40 border-primary/25 hover:border-primary"
                : theme === "monospace"
                  ? "bg-black border-secondary/35 hover:border-primary font-mono text-accent"
                  : "bg-[#1E1E24] text-emerald-400 border-sepia/15 hover:border-sepia shadow-inner"
                }`}
            >
              <div className="flex items-center justify-between border-b pb-2 border-primary/10 select-none">
                <span className="text-[9px] tracking-widest font-mono text-secondary uppercase font-bold">
                  SYS_INTEGRATOR // CONSOLE
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
              </div>

              {/* Console logs box */}
              <div
                ref={logContainerRef}
                className="my-3 font-mono text-[10px] leading-relaxed overflow-y-auto flex-1 select-text scrollbar-thin pointer-events-none"
              >
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className="truncate">
                    {log}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-primary/10 select-none">
                <span className="text-[9px] text-secondary">CLICK BLOCK TO RUN PING</span>
                <button
                  disabled={isDiagnosticRunning}
                  className={`text-[9px] uppercase font-bold px-2 py-0.5 border rounded-sm transition-colors ${isDiagnosticRunning
                    ? "opacity-55"
                    : theme === "blueprint"
                      ? "border-primary text-primary hover:bg-primary/15"
                      : theme === "monospace"
                        ? "border-accent text-accent hover:bg-accent/15"
                        : "border-emerald-400 text-emerald-400 hover:bg-emerald-400/15"
                    }`}
                >
                  {isDiagnosticRunning ? "RUNNING..." : "TRIGGER CHECK"}
                </button>
              </div>
            </motion.div>

          </div>

          {/* Box 4: Technical Skills Matrice Sheet (Col Span 12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            className={`md:col-span-12 p-6 md:p-8 rounded border transition-colors shadow-sm select-text ${theme === "blueprint"
              ? "bg-paper-alt/20 border-primary/30 hover:border-primary"
              : theme === "monospace"
                ? "bg-paper-alt border-secondary/35 hover:border-primary font-mono"
                : "bg-paper-alt/35 border-sepia/20 hover:border-sepia"
              }`}
          >
            <span className="caption text-[10px] block mb-4 font-semibold text-secondary">
              CORE CAPABILITIES // BLUEPRINT MATRICE
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((skillGroup, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <h4 className="font-heading text-xs font-bold text-primary tracking-wider uppercase border-b border-primary/20 pb-2">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap sm:flex-col gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <span
                        key={idx}
                        onMouseEnter={() => playClick(1.05)}
                        className={`text-[11px] font-mono py-1 px-2 border rounded-sm transition-colors cursor-none self-start hover:scale-[1.03] ${theme === "blueprint"
                          ? "border-primary/20 text-primary bg-primary/5 hover:border-primary/60"
                          : theme === "monospace"
                            ? "border-secondary/25 text-secondary hover:border-primary hover:text-primary bg-transparent"
                            : "border-sepia/20 text-primary bg-cream/15 hover:border-accent hover:text-accent"
                          }`}
                      >
                        📐 {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
