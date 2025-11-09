import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiSend,
  FiInstagram,
} from "react-icons/fi";
import { useEffect, useRef } from "react";

const Hero = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nameRef = useRef(null);

  const socialIcons = [
    { icon: FiGithub, link: "" },
    {
      icon: FiLinkedin,
      link: "https://www.linkedin.com/in/abubeker-abe-bb2325285?",
    },
    { icon: FiSend, link: "https://t.me/ABking1" },
    { icon: FiInstagram, link: "https://www.instagram.com/abuki431/" },
  ];

  const scrambleText = (element) => {
    let iterations = 0;
    const interval = setInterval(() => {
      element.innerText = element.innerText
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return element.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterations >= element.dataset.value.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    if (nameRef.current) {
      setTimeout(() => {
        scrambleText(nameRef.current);
      }, 500); // Delay the initial animation
    }
  }, []);

  const handleMouseOver = (event) => {
    scrambleText(event.target);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full dark:opacity-20 opacity-10">
        <div className="absolute w-96 h-96 bg-primary/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-purple-300/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1
            ref={nameRef}
            className="glitch-text text-6xl md:text-8xl font-bold mb-6 cursor-default"
            data-value="ABUBEKER ABE"
            onMouseOver={handleMouseOver}
          >
            ABUBEKER ABE
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Crafting digital solutions that solve real-world problems and push
            the boundaries of full stack development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center mb-10"
          >
            <a
              href="/Abubeker-Abe-Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-shadow"
              aria-label="Download Abubeker Abe resume"
            >
              Download Résumé
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center space-x-6"
          >
            {socialIcons.map((Social, index) => (
              <motion.a
                key={index}
                href={Social.link}
                className="social-icon-link"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Social.icon className="w-8 h-8" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="scroll-indicator"
        >
          <span className="sr-only">Scroll down</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
