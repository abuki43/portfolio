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
      category: "Mobile App • Peer-to-Peer Logistics",
      releaseDate: "JULY 2024",
      description: "Cross-border peer-to-peer delivery app connecting international travelers with local package shipping requests, cutting costs by 70%.",
      details: "Addis Fetch is a cross-platform peer-to-peer logistics network that pairs global travelers with people looking to send or receive packages internationally. Built with React Native (Expo) and Firebase Realtime Database, it features offline-first message caching, flight coordinate tracking, and direct in-app communication, reducing traditional freight forwarding costs by 70%.",
      image: AddisFetch,
      technologies: ["React Native", "Expo SDK", "Firebase Realtime DB", "Tailwind CSS"],
      github: "",
      demo: "https://addis-fetchet.onrender.com/",
      specs: {
        "PLATFORM": "iOS & Android (Expo SDK 51)",
        "BACKEND": "Firebase Realtime Database & Auth",
        "KEY IMPACT": "70% Cost Reduction vs Traditional Shipping",
        "STATUS": "Production / Live"
      }
    },
    {
      title: "ExitExamStudio",
      category: "Full-Stack Web • EdTech Platform",
      releaseDate: "NOV 2025",
      description: "National exam preparation platform serving 15,000+ graduating Ethiopian university students with mock tests and analytics under low-bandwidth networks.",
      details: "ExitExamStudio is a high-traffic web platform built to help Ethiopian university graduates prepare for national qualification exams. Engineered with Next.js App Router, the system delivers lightweight interactive tests, timed mock examinations, and instant score ranking—specifically optimized to render fast under low-bandwidth local networks.",
      image: ExitLogo,
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      demo: "https://exitexamstudio.app",
      github: "",
      specs: {
        "USERS SERVED": "15,000+ Graduating Students",
        "ARCHITECTURE": "Next.js Server Components",
        "PERFORMANCE": "Optimized for Low-Bandwidth Networks",
        "STATUS": "Active / In Production"
      }
    },
    {
      title: "ETBX",
      category: "Fintech & Web3 • Programmable Ethiopian Birr",
      releaseDate: "FEB 2026",
      description: "Financial infrastructure built around programmable Ethiopian Birr on blockchain rails, pegged 1:1 to ETB for seamless on-chain settlement, minting, and transfers.",
      details: "ETBX is a programmable financial infrastructure bringing the Ethiopian Birr onto blockchain rails. Pegged 1:1 to ETB, the protocol enables institutional and individual users to mint, redeem, and transfer digital Birr on the BASE network with instant finality, minimal transaction fees, and verifiable smart contract transparency. Engineered with Next.js, Solidity smart contracts, and TurboRepo monorepo tooling.",
      image: "",
      technologies: ["Solidity", "Next.js", "BASE Blockchain (EVM)", "TurboRepo", "Wagmi / Viem"],
      demo: "https://etbx.vercel.app",
      github: "",
      specs: {
        "ASSET PEGGING": "1:1 Pegged to Ethiopian Birr (ETB)",
        "NETWORK": "BASE Blockchain (EVM Layer 2)",
        "CORE INFRASTRUCTURE": "Solidity Smart Contracts + Wagmi",
        "USE CASES": "On-Chain Settlement, Minting, Transfers",
        "STATUS": "Live Deployment"
      }
    },
    {
      title: "TeleScribe",
      category: "Fintech & Bot Infrastructure • TON & Stripe",
      releaseDate: "NOV 2024",
      description: "Telegram channel monetization engine syncing bot webhook triggers with TON crypto payments and Stripe card checkouts.",
      details: "TeleScribe is an automated subscription management platform for digital content creators and community admins. By bridging Telegraf bot webhooks with TON blockchain smart contracts and Stripe payment portals, it automatically grants and manages private channel access upon verified payment.",
      image: Telescribe,
      technologies: ["Next.js", "PostgreSQL", "TON Blockchain", "Telegraf API", "Privy Wallet", "Stripe"],
      demo: "",
      github: "",
      specs: {
        "BOT ENGINE": "Telegraf Webhook Worker",
        "PAYMENT RAILS": "TON Crypto Wallet & Stripe SDK",
        "DATABASE": "PostgreSQL",
        "STATUS": "Active Integration"
      }
    },
    {
      title: "Yagout Payment SDK",
      category: "Developer Tooling • TypeScript Package",
      releaseDate: "SEPT 2025",
      description: "Lightweight, zero-dependency TypeScript SDK supporting payment aggregations, checkout portals, and webhook handlers.",
      details: "A developer-focused payment processing library engineered for rapid integration into Node.js ecosystems. At only 4.2 KB with zero external dependencies, it provides clean, type-safe API abstractions for handling checkouts, webhooks, and status reconciliation across Next.js, Express, and NestJS runtimes.",
      image: "",
      technologies: ["TypeScript Package", "Node.js", "ESNext Modules", "RESTful APIs"],
      github: "",
      demo: "",
      specs: {
        "BUNDLE SIZE": "4.2 KB (Zero External Dependencies)",
        "SUPPORTED ENVS": "Next.js, Node.js, Express, NestJS",
        "TYPE SAFETY": "100% Strict TypeScript Typing",
        "STATUS": "Audited Developer Package"
      }
    },
    {
      title: "ProjeX Board",
      category: "SaaS Productivity • Real-Time Kanban",
      releaseDate: "AUG 2024",
      description: "Collaborative agile sprint board featuring fluid drag-and-drop mechanics and instant multi-user real-time state synchronization.",
      details: "ProjeX is a modern productivity and sprint tracking tool built for developer teams. Powered by Next.js and Supabase Realtime websocket channels, it delivers seamless drag-and-drop task management with Framer Motion animations and live multi-client updates with under 50ms latency.",
      technologies: ["Next.js", "TypeScript", "Supabase DB", "Framer Motion", "Tailwind CSS"],
      github: "https://github.com/abuki43/ProjeX",
      demo: "",
      specs: {
        "REALTIME ENGINE": "Supabase WebSocket Subscriptions",
        "UI INTERACTION": "Framer Motion Drag Physics",
        "COLLABORATION": "Instant Multi-User Sync",
        "STATUS": "Open Source on GitHub"
      }
    },
    {
      title: "QR-Hotel Desk",
      category: "Hospitality POS • Real-Time Ordering",
      releaseDate: "JUNE 2024",
      description: "Contactless digital ordering system linking table QR codes directly to kitchen monitors with integrated local mobile money checkout.",
      details: "QR-Hotel Desk modernizes restaurant table service by allowing customers to scan QR codes, browse interactive digital menus, and submit kitchen orders directly from their phones. Integrated with WebSockets for instant kitchen dispatcher updates and Chapa payment API for seamless local digital transactions.",
      image: QrHotel,
      technologies: ["React", "Express APIs", "WebSocket Link", "Chapa Checkout"],
      github: "",
      demo: "",
      specs: {
        "LATENCY": "Instant Kitchen Notification (<100ms)",
        "PAYMENTS": "Chapa Mobile Money Integration",
        "CLIENT INTERFACE": "Responsive Mobile Web App",
        "STATUS": "Deployed Solution"
      }
    },
    {
      title: "USDCentral Wallet",
      category: "Web3 Mobile • Multi-Chain Gasless Wallet",
      releaseDate: "JAN 2026",
      description: "ETHGlobal hackathon project: Multi-chain smart wallet enabling gasless USDC transfers across Base, Arbitrum, and Optimism.",
      details: "USDCentral was built for the ETHGlobal hackathon to simplify the cross-chain crypto experience. By abstracting gas tokens using LiFi routing and Circle smart contract payment sponsorship, users can transfer and swap USDC across Layer 2 networks without needing native ETH for gas.",
      image: USDCentral,
      technologies: ["React Native", "Expo Core", "LIFI SDK", "Circle Smart Pay"],
      github: "https://github.com/abuki43/USDCentral",
      specs: {
        "HACKATHON": "ETHGlobal 2024 Project",
        "NETWORKS": "Base, Arbitrum, Optimism (Layer 2)",
        "INNOVATION": "Gasless Account Abstraction",
        "STATUS": "Open Source on GitHub"
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
          <p className="caption mb-4">Selected Works & Production Systems</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary letterpress">
            {theme === "blueprint" ? "SCHEMATICS: FEATURED_PROJECTS" : theme === "monospace" ? "PROJECT_INDEX.TXT" : "Featured Projects"}
          </h2>
        </motion.div>

        <SectionDivider />

        {/* 3D Tilt Project Cards Grid */}
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
                    <span key={i} className="px-1.5 py-0.5 border border-primary/10 bg-primary/5 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[10px] font-bold text-accent hover:underline flex items-center gap-1">
                  [ VIEW SPECS ↗ ]
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
                    PROJECT SPECIFICATION
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
                    <span className="text-secondary/70 text-xs">// DIAGRAM: PRODUCTION SYSTEM SCHEMATIC //</span>
                  </div>
                )}

                {/* Analytical Specs Grid */}
                <div className="border border-primary/15 rounded bg-black/10 overflow-hidden text-xs">
                  <div className="bg-primary/10 px-3 py-1.5 font-bold border-b border-primary/15 text-[10px] text-secondary uppercase">
                    SYSTEM SPECIFICATIONS
                  </div>
                  <div className="divide-y divide-primary/10">
                    {Object.entries(activeProject.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between p-2.5 font-mono">
                        <span className="text-secondary">{key}:</span>
                        <span className="text-primary font-bold text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text dispatch Column */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold tracking-wider text-secondary uppercase block border-b border-primary/10 pb-1">
                    PROJECT OVERVIEW & ARCHITECTURE
                  </span>
                  <p className="text-xs leading-relaxed text-ink/90 text-justify">
                    {activeProject.details}
                  </p>
                </div>

                {/* Runtime packages list */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-wider text-secondary uppercase block border-b border-primary/10 pb-1">
                    TECHNOLOGIES USED
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
                  PROJECT LINKS & REPOSITORIES
                </div>

                <div className="flex flex-col gap-2">
                  {activeProject.demo && (
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClick(1.25)}
                      className={`w-full py-2.5 px-3 border border-accent/30 text-center rounded-sm text-xs font-mono font-bold hover:bg-accent/15 hover:border-accent transition-all text-accent cursor-none flex items-center justify-center gap-1.5 shadow-sm`}
                    >
                      🚀 Launch Live Demo ↗
                    </a>
                  )}
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClick(1.25)}
                      className={`w-full py-2.5 px-3 border border-primary/25 text-center rounded-sm text-xs font-mono font-bold hover:bg-primary/15 hover:border-primary transition-all text-primary cursor-none flex items-center justify-center gap-1.5`}
                    >
                      💻 View Source Code (GitHub) ↗
                    </a>
                  )}
                  {!activeProject.github && !activeProject.demo && (
                    <div className="text-xs italic text-secondary/70 text-center py-2 border border-dashed border-primary/10 rounded">
                      🔒 Enterprise / Private Client Repository (Available Upon Request)
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