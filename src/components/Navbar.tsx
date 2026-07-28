import { useState } from 'react';
import { Link } from 'react-scroll';
import { FiHome, FiCpu, FiFolder, FiMail } from 'react-icons/fi';
import { useThemeAudio } from '../context/ThemeAudioContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { theme, playClick, playBell } = useThemeAudio();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    { name: 'Home', icon: <FiHome className="w-5 h-5" />, to: 'home' },
    { name: 'About', icon: <FiCpu className="w-5 h-5" />, to: 'about' },
    { name: 'Projects', icon: <FiFolder className="w-5 h-5" />, to: 'projects' },
    { name: 'Contact', icon: <FiMail className="w-5 h-5" />, to: 'contact' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.nav
        initial={{ y: 80, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
        className={`flex items-center gap-4 px-4 py-3 rounded-full relative glass-dock shadow-2xl transition-colors duration-500 fixed left-1/2 -translate-x-1/2`}
      >
        {menuItems.map((item, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => {
                setHoveredIndex(index);
                playClick(1.05 + index * 0.05);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Floating Tooltip Label */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.85, x: "-50%" }}
                    animate={{ opacity: 1, y: -38, scale: 1, x: "-50%" }}
                    exit={{ opacity: 0, y: 10, scale: 0.85, x: "-50%" }}
                    transition={{ duration: 0.15 }}
                    className={`absolute left-1/2 pointer-events-none px-2.5 py-1 text-[10px] font-mono rounded shadow border font-bold tracking-wider z-50 ${theme === "blueprint"
                      ? "bg-paper-alt border-primary/40 text-primary"
                      : theme === "monospace"
                        ? "bg-black border-secondary text-accent"
                        : "bg-paper-alt border-sepia/30 text-ink"
                      }`}
                  >
                    {theme === "monospace" ? `${item.name.toUpperCase()}.EXE` : item.name}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scroll Trigger Link with magnification */}
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                duration={500}
                offset={-40}
                onClick={() => playBell()}
                className="cursor-none block"
                aria-label={`Scroll to ${item.name} section`}
              >
                <motion.div
                  animate={{
                    scale: isHovered ? 1.25 : 1,
                    y: isHovered ? -6 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 ${theme === "blueprint"
                    ? "border-primary/25 bg-paper hover:border-primary text-primary"
                    : theme === "monospace"
                      ? "border-secondary/25 bg-paper-alt hover:border-primary text-secondary hover:text-primary"
                      : "border-sepia/20 bg-cream hover:border-sepia text-primary"
                    }`}
                >
                  {item.icon}
                </motion.div>
              </Link>
            </div>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default Navbar;