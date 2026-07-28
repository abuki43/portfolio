import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeAudio } from "../context/ThemeAudioContext";
import { SectionDivider } from "./Ornaments";

// Asset imports
import AddisFetch from "../assets/addisfetch.jpg";
import Telescribe from "../assets/telescribe-logo-1.png";
import QrHotel from "../assets/qrhotel.png";
import USDCentral from "../assets/USDCentral.png";
import ExitLogo from "../assets/exitLogo.png";

type Project = {
  title: string;
  description: string;
  details: string;
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
  category: string;
  releaseDate: string;
  specs: { [key: string]: string };
};

// 3D Card Tilt Interactive Wrapper
const CardTilt = ({
  children,
  className,
  onClick,
  playClick
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
  playClick: (pitch: number) => void;
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coords relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Max tilt is 8 degrees
    const rX = -(y / (height / 2)) * 8;
    const rY = (x / (width / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onMouseEnter={() => playClick(1.05)}
      style={{ transformStyle: "preserve-3d" }}
      animate={{
        rotateX,
        rotateY,
        scale: rotateX !== 0 ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className={`perspective-1000 preserve-3d cursor-none ${className}`}
    >
      <div style={{ transform: "translateZ(25px)" }} className="h-full preserve-3d">
        {children}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { theme, playClick, playBell, playRustle } = useThemeAudio();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Addis Fetch",
      category: "DECENTRALIZED COMMERCE // EXPORT DISPATCH",
      releaseDate: "OCT 2024",
      description: "Bridges global flight routes to direct local shipping requests. Item seekers submit parameters while active travelers bid routes.",
      details: "Addis Fetch scales international shipping networks by matching individual requests to immediate traveler routes. Constructed in React Native (Expo) and backed by optimized Firebase nodes, it implements off-grid offline support, real-time message sync, and coordinate flight logging. It successfully cuts standard forwarding costs by 70%.",
      image: AddisFetch,
      technologies: ["React Native", "Expo", "Firebase Backend", "Tailwind CSS"],
      github: "",
      demo: "https://addis-fetchet.onrender.com/",
      specs: {
        "DRAFT SCHEMA": "COMPUTE // MOBILE",
        "BUILDER VERSION": "v2.4.9-STABLE",
        "TARGET FRAMEWORK": "EXPO SDK 51",
        "API LAYER": "REALTIME CLOUD DB",
        "ENCRYPTION KEY": "AES-256 SYSTEM"
      }
    },
    {
      title: "ExitExamStudio",
      category: "ACADEMIC TESTING // PREPARATION WIDGET",
      releaseDate: "JAN 2025",
      description: "Scale prep portal web engine serving 15,000+ national graduating university students. Resilient load under low-bandwidth networks.",
      details: "ExitExamStudio supplies scalable digital prep desks for Ethiopian graduates. Engineered on Next.js server routers using a performance-tuned PostgreSQL state engine, the client delivers lightweight interactive worksheets and smart mock-rank trackers to verify student readiness. High availability on bandwidth-constrained local infrastructures.",
      image: ExitLogo,
      technologies: ["Next.js", "Tailwind CSS", "Prisma ORM", "PostgreSQL"],
      demo: "https://exitexamstudio.app",
      github: "",
      specs: {
        "DRAFT SCHEMA": "PREP // CORE SERVICE",
        "ACTIVE SESSIONS": "15,000+ DRAFTS",
        "BANDWIDTH BUDGET": "LIGHTWEIGHT STACK",
        "RENDER SPEED": "94 / 100 LIGHTHOUSE",
        "STATE MACHINE": "PRISMA HYBRID"
      }
    },
    {
      title: "ETBX Coin Interface",
      category: "STABLE DEFI LEDGER // PROTOCOL DRAFT",
      releaseDate: "DEC 2024",
      description: "Decentralized stable assets system dashboard permitting users to mint, redeem and transfer custom assets on BASE.",
      details: "ETBX DeFi dashboard enables direct management of stable contracts on the BASE chain. Users connect smart wallets and interact directly with minting scripts. Features nested developer API tools and integrated TurboRepo pipelines to secure strict codebase architecture across dependencies.",
      image: "",
      technologies: ["Solidity", "NextJS", "BASE Blockchain", "TurboRepo SDK"],
      demo: "https://etbx.vercel.app",
      github: "",
      specs: {
        "DRAFT SCHEMA": "FINANCE // SOL STACK",
        "LEDGER CHAIN": "BASE CHAIN EVM",
        "MINT INSTRUCTION": "AUTO CONTRACT ASSET",
        "LOCK STAGE": "MULTI-SIGN SCHEME",
        "LATENCY SPEED": "EVM BLOCK DELAY"
      }
    },
    {
      title: "TeleScribe Automated",
      category: "TELEGRAM CHANNELS // TON NETWORK",
      releaseDate: "NOV 2024",
      description: "Monetization engine syncing Telegram channel triggers with TON smart payments and Privy authorization systems.",
      details: "TeleScribe automates client setups for digital publishers. Connecting Telegram webhooks via Telegraf automation triggers to TON wallet routers, the system provisions instant payload accesses. The platform also embeds Stripe checkouts for global card networks.",
      image: Telescribe,
      technologies: ["Next.js", "PostgreSQL", "TON Contract", "Telegraf API", "Privy Wallet"],
      demo: "",
      github: "",
      specs: {
        "DRAFT SCHEMA": "AUTOMATION // WEBHOOK",
        "CLIENT CONTROLLER": "TELEGRAF WORKER",
        "BLOCKCHAIN MESH": "TON SMART MESH",
        "GATEWAY OUT": "STRIPE SECURE SDK",
        "USER VOLUME": "10K+ MAPPED NODES"
      }
    },
    {
      title: "Yagout payment SDK",
      category: "PAYMENT INTEGRATION // DEVPACK MODULE",
      releaseDate: "SEPT 2024",
      description: "TypeScript developer SDK supporting payment aggregations, checkout portals, and custom web links.",
      details: "Yagout payment SDK is a highly lightweight pack optimized for Next.js, Express, and NestJS runtimes. Zero exterior dependencies are implemented to ensure the script triggers checkouts with minimal memory consumption.",
      image: "",
      technologies: ["TypeScript Package", "Node.js Schema", "Yagout API Engine"],
      github: "",
      demo: "",
      specs: {
        "DRAFT SCHEMA": "LIBRARY // COMPILE",
        "BUNDLE SIZE": "4.2KB EXPEDITE",
        "TARGET ENGINE": "ESNEXT MODULES",
        "EXTERNAL LIBS": "ZERO DEPS INTEGRAL",
        "STATUS LEVEL": "AUDITED PASS"
      }
    },
    {
      title: "ProjeX Board",
      category: "PRODUCTIVITY BOARD // REALTIME DOCK",
      releaseDate: "AUG 2024",
      description: "Interactive Kanban board designed with clean architecture rules, mapping live cards and sprint metrics.",
      details: "ProjeX offers fluid coordinate tracking of sprints and engineering columns. Built with NextJS and Supabase real-time triggers, the board provides interactive drag animations (Framer Motion) that sync instantly across all clients.",
      technologies: ["Next.js", "Supabase DB", "Framer Motion"],
      github: "https://github.com/abuki43/ProjeX",
      demo: "",
      specs: {
        "DRAFT SCHEMA": "REALTIME // MATRIX",
        "TRIGGER CHANNEL": "SUPABASE SUBS",
        "ANIMATION TYPE": "SPRING TRANSITION",
        "REFLUX ROUTE": "MUTATION SHORD",
        "COLLISION SAFE": "ACTIVE VERIFIED"
      }
    },
    {
      title: "QR-Hotel Desk",
      category: "HOSPITALITY LEDGER // CLIENT TABLES",
      releaseDate: "JUNE 2024",
      description: "Real-time tablet dispatcher syncing customer coordinates directly to kitchen monitors via WebSockets.",
      details: "QR-Hotel Desk replaces legacy restaurant workflows. Guests compile menus at tables and trigger immediate kitchen payloads, integrated with Chapa developer links for local mobile money transactions.",
      image: QrHotel,
      technologies: ["React", "Express APIs", "WebSocket Link", "Chapa Checkout"],
      github: "",
      demo: "",
      specs: {
        "DRAFT SCHEMA": "COMMERCE // SOCKET",
        "LOCAL OUTLET": "ADDIS OUTLETS",
        "PING SPEED": "2.8ms DIRECT LAT",
        "GATE PAY": "CHAPA PAYMENT GATE",
        "DB ENGINE": "REDIS BUFFER SHRD"
      }
    },
    {
      title: "USDCentral Wallet",
      category: "CROSS-CHAIN ABSTRACT // EXPERIMENT",
      releaseDate: "MAY 2024",
      description: "Multi-chain abstracted gas-free wallet drafted for the ETHGlobal hackathon, eliminating native gas tokens.",
      details: "USDCentral was created for the ETHGlobal hackathon. Using LiFi bridges and Curve routing, users interact with USDC across Base, Arbitrum, and Optimism networks without holding gas tokens. Circle smart SDK manages payload safety.",
      image: USDCentral,
      technologies: ["React Native", "Expo Core", "LIFI SDK", "Circle Smart Pay"],
      github: "https://github.com/abuki43/USDCentral",
      specs: {
        "DRAFT SCHEMA": "DEFI // RESEARCH DRAFT",
        "LIQUID CHAIN": "BASE / ARB / OPT MESH",
        "GAS SYSTEM": "GASLESS SPONSOR",
        "HACKATHON": "ETHGLOBAL 2024",
        "INTEROP CORE": "LIFI PROT CON"
      }
    }
  ];

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const openProject = (project: Project) => {
    playBell();
    playRustle();
    setActiveProject(project);
  };

  const closeProject = () => {
    playRustle();
    setActiveProject(null);
  };

  return (
    <section id="projects" className="py-20 px-6 transition-colors duration-500 relative z-10">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="caption mb-4">Draft Projects Portfolio</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary letterpress">
            {theme === "blueprint" ? "SCHEMATICS: DETAILED_COMPONENTS" : theme === "monospace" ? "PROJECT_INDEX.TXT" : "Blueprint Spec Sheets"}
          </h2>
        </motion.div>

        <SectionDivider />

        {/* 3D Tilt Project Cards Grid (inspired by 21st.dev matrix grids) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-8">
          {projects.map((project, index) => (
            <CardTilt
              key={index}
              onClick={() => openProject(project)}
              playClick={playClick}
              className={`rounded border overflow-hidden p-6 flex flex-col justify-between h-[280px] shadow-sm hover:shadow-md transition-all relative overflow-hidden ${theme === "blueprint"
                ? "bg-paper-alt/20 border-primary/25 hover:border-primary text-accent"
                : theme === "monospace"
                  ? "bg-paper-alt border-secondary/35 hover:border-primary text-primary font-mono"
                  : "bg-paper-alt/30 border-sepia/20 hover:border-sepia text-ink"
                }`}
            >
              {/* Top Meta info */}
              <div>
                <div className="flex justify-between items-baseline mb-3 text-[9px] font-mono tracking-widest text-secondary font-bold uppercase">
                  <span>{project.category}</span>
                  <span>{project.releaseDate}</span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-secondary font-mono text-xs">{formatNumber(index + 1)}.</span>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-primary leading-tight">
                    {project.title}
                  </h3>
                </div>
                <div className="w-10 h-0.5 bg-primary/25 my-1" />

                <p className="font-body text-xs text-ink/80 leading-relaxed text-justify mt-3 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Bottom tag stats */}
              <div className="pt-3 border-t border-dashed border-primary/10 flex items-center justify-between mt-auto">
                <div className="flex gap-2 text-[9px] font-mono text-secondary">
                  {project.technologies.slice(0, 2).map((tech, i) => (
                    <span key={i} className="px-1 border border-primary/10 bg-primary/5 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[10px] font-bold text-accent hover:underline">
                  [ SPEC_DRAWER.EXE ]
                </span>
              </div>
            </CardTilt>
          ))}
        </div>
      </div>

      {/* Blueprint Slide-out Drawer Overlay */}
      <AnimatePresence>
        {activeProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeProject}
              className="fixed inset-0 bg-black z-45"
            />

            {/* Spec Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className={`fixed right-0 top-0 h-full w-full max-w-lg z-50 shadow-2xl border-l flex flex-col justify-between select-text ${theme === "blueprint"
                ? "bg-paper-alt border-primary/30 text-accent font-mono"
                : theme === "monospace"
                  ? "bg-paper border-secondary/40 text-primary font-mono"
                  : "bg-paper border-sepia/20 text-ink"
                }`}
            >
              {/* Header block */}
              <div className="p-6 border-b border-primary/15 bg-black/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-secondary block font-bold">
                    CAD DRAFT // PROJECT_SPEC
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-primary">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  onClick={closeProject}
                  onMouseEnter={() => playClick(1.05)}
                  className={`text-[10px] font-mono font-bold px-2.5 py-1 border rounded-sm transition-colors ${theme === "blueprint"
                    ? "border-primary/30 text-primary hover:bg-primary/15"
                    : theme === "monospace"
                      ? "border-secondary text-secondary hover:text-primary border-primary"
                      : "border-sepia/30 text-sepia hover:bg-cream"
                    }`}
                >
                  [ CLOSE ]
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 flex-1 overflow-y-auto space-y-6">

                {/* Visual rendering frame */}
                {activeProject.image ? (
                  <div className="border border-primary/15 p-2 bg-black/5 rounded-sm overflow-hidden select-none">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className={`w-full max-h-48 object-contain rounded-sm ${theme === "blueprint" ? "brightness-110 saturate-50 contrast-125" : "sepia-image"
                        }`}
                    />
                  </div>
                ) : (
                  <div className={`aspect-video w-full flex items-center justify-center border font-heading italic text-center p-4 border-dashed rounded-sm ${theme === "blueprint" ? "border-primary/20 bg-primary/5" : "border-sepia/15 bg-cream/10"
                    }`}>
                    <span className="text-secondary/70 text-xs">// SCHEMATIC DIAGRAM: METRIC MISSING //</span>
                  </div>
                )}

                {/* Analytical Specs Grid */}
                <div className="border border-primary/15 rounded bg-black/10 overflow-hidden text-xs">
                  <div className="bg-primary/10 px-3 py-1.5 font-bold border-b border-primary/15 text-[10px] text-secondary uppercase">
                    METADATA BLUEPRINT LOG
                  </div>
                  <div className="divide-y divide-primary/10">
                    {Object.entries(activeProject.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between p-2.5 font-mono">
                        <span className="text-secondary">{key}:</span>
                        <span className="text-primary font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text dispatch Column */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold tracking-wider text-secondary uppercase block border-b border-primary/10 pb-1">
                    PROJECT DISPATCH SUMMARY
                  </span>
                  <p className="text-xs leading-relaxed text-ink/90 text-justify">
                    {activeProject.details}
                  </p>
                </div>

                {/* Runtime packages list */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-wider text-secondary uppercase block border-b border-primary/10 pb-1">
                    DEPLOYMENT RUNTIMES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`text-[9px] uppercase py-0.5 px-2 border rounded-sm font-semibold ${theme === "blueprint"
                          ? "border-primary/30 bg-primary/5 text-primary"
                          : theme === "monospace"
                            ? "border-secondary/40 text-secondary bg-transparent"
                            : "border-sepia/20 text-sepia bg-cream/60"
                          }`}
                      >
                        📐 {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Actions Footer block */}
              <div className="p-6 border-t border-primary/15 bg-black/10 flex flex-col gap-3">
                <div className="text-[9px] text-secondary font-mono tracking-widest uppercase mb-1">
                  EXECUTE LINKS COMMAND
                </div>

                <div className="flex flex-col gap-2">
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClick(1.25)}
                      className={`w-full py-2 px-3 border border-primary/20 text-center rounded-sm text-xs font-mono font-bold hover:bg-primary/10 hover:border-primary transition-all text-primary cursor-none`}
                    >
                      $ git clone {activeProject.github}
                    </a>
                  )}
                  {activeProject.demo && (
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClick(1.25)}
                      className={`w-full py-2 px-3 border border-accent/20 text-center rounded-sm text-xs font-mono font-bold hover:bg-accent/10 hover:border-accent transition-all text-accent cursor-none`}
                    >
                      $ curl -sSL {activeProject.demo}
                    </a>
                  )}
                  {!activeProject.github && !activeProject.demo && (
                    <div className="text-xs italic text-secondary/60 text-center py-2 border border-dashed border-primary/10 rounded">
                      🔒 ARCHIVED SECURITY SCHEME (SOURCE RESTRICTED)
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;