import { motion } from "framer-motion";
import { useRef } from "react";
import { SectionDivider } from "./Ornaments";
import AbayBridge from "../assets/abayBridge.png";
import AddisFetch from "../assets/addisfetch.jpg";
import Telescribe from "../assets/telescribe-logo-1.png";
import QrHotel from "../assets/qrhotel.png";
import Private from "../assets/private-removebg.png";
import TopTrader from "../assets/wallet.png";

const Projects = () => {
  const containerRef = useRef(null);

  const projects = [
    {
      title: "Addis Fetch",
      description:
        "Get what you need from abroad with ease! Our app connects you with travelers who can bring items directly to you from another country. Simply post your request, connect with travelers.",
      image: AddisFetch,
      technologies: ["React Native", "Expo", "Firebase", "Tailwind CSS"],
      github: "",
      demo: "https://addis-fetchet.onrender.com/",
    },
    {
      title: "TeleScribe",
      image: Telescribe,
      description:
        "Monetize your Telegram channels with ease! TeleScribe is a web app that helps you manage private channels, streamline subscriptions, and maximize revenue effortlessly.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Shadcn", "TON"],
      github: "https://github.com/abuki43/TeleScribe",
      demo: "",
    },
    {
      title: "Abay Bridge",
      description:
        "This educational platform connects learners and experts through a dynamic question-and-answer system, fostering seamless collaboration.",
      image: AbayBridge,
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      github: "",
      demo: "https://abay-bridge-1.onrender.com/",
    },
    {
      title: "QR-Hotel",
      image: QrHotel,
      description:
        "Transform hotel operations with QR-Hotel! This web app simplifies guest services, enabling seamless ordering, payments, and real-time system for a modern hospitality experience.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Chapa", "WebSocket"],
      github: "",
      demo: "",
    },
    {
      title: "PrivateBot",
      description:
        "Manage your Telegram private channels with ease! PrivateBot is a mini-app that empowers you to control and organize your private channel bots effortlessly.",
      technologies: ["Telegraf", "Node.js", "React"],
      image: Private,
      github: "https://github.com/abuki43/TelegramPaidChannelPayment",
      demo: "https://t.me/privateChannelOwner_bot",
    },
    {
      title: "Top Trader",
      description:
        "A telegram bot that provides wallet analysis, find top traders from a token and filter out the best traders address based on your settings on solana blockchain.",
      image: TopTrader,
      technologies: ["Node.js", "Telegram API", "MongoDB"],
      github: "",
      demo: "",
    },
    {
      title: "Yagout payment SDK",
      description: "TypeScript SDKs for yagout payment integration. It supports aggregator hosted, api-based integration and payment link generation.It can be used with nextjs, nestjs, fastify and express",
      image: "",
      technologies: ["TypeScript", "Node.js", "Yagout "],
      github: "",
      demo: "",
    }
  ];

  const formatNumber = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <section ref={containerRef} id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="caption mb-4">Portfolio</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-tobacco letterpress">
            Featured Work
          </h2>
        </motion.div>

        <SectionDivider />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="paper-card overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden halftone contain bg-sepia/5">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain sepia-image"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-8 border-2 border-sepia/10 m-2">
                    <h3 className="font-heading text-3xl md:text-4xl text-tobacco text-center leading-tight letterpress italic">
                      {project.title}
                    </h3>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 md:p-8">
                {/* Number & Title */}
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="project-number">{formatNumber(index + 1)}.</span>
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold text-tobacco">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-body text-ink/80 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-6 pt-4 border-t border-sepia/10">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-caption text-sm text-olive hover:text-tobacco transition-colors editorial-link"
                    >
                      View Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-caption text-sm text-olive hover:text-tobacco transition-colors editorial-link"
                    >
                      Live Demo
                    </a>
                  )}
                  {!project.github && !project.demo && (
                    <span className="font-caption text-sm text-sepia/50 italic">
                      Private Project
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;