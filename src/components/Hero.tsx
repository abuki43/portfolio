import { motion } from "framer-motion";
import { SectionDivider, BulletSeparator } from "./Ornaments";

const Hero = () => {
  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/abubeker-abe-bb2325285?" },
    { name: "Telegram", url: "https://t.me/ABking1" },
    { name: "Instagram", url: "https://www.instagram.com/abuki431/" },
    { name: "GitHub", url: "https://github.com/abuki43" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20"
    >
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="caption mb-6"
          >
            Full-Stack Developer
          </motion.p>

          {/* Main Title */}
          <h1 className="font-heading text-display-sm md:text-display font-semibold text-tobacco mb-8 letterpress">
            Abubeker Abe
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-body text-xl md:text-2xl text-ink/80 mb-10 leading-relaxed italic"
          >
            Crafting digital solutions that solve real-world problems and push
            the boundaries of full stack development.
          </motion.p>

          {/* Flourish Divider */}
          <SectionDivider className="my-10" />

          {/* Resume Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-10"
          >
            <a
              href="/Abubeker-Abe-Resume.pdf"
              download
              className="inline-block font-heading text-lg text-olive hover:text-tobacco transition-colors editorial-link"
              aria-label="Download Abubeker Abe resume"
            >
              Download Résumé
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-x-1 gap-y-2"
          >
            {socialLinks.map((link, index) => (
              <span key={link.name} className="inline-flex items-center">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-caption text-sm text-sepia hover:text-tobacco transition-colors"
                >
                  {link.name}
                </a>
                {index < socialLinks.length - 1 && <BulletSeparator />}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
