import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import DesignConsole from "./components/DesignConsole";
import { ThemeAudioProvider, useThemeAudio } from "./context/ThemeAudioContext";

type MousePosition = { x: number; y: number };

function AppContent() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const { playClick } = useThemeAudio();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleGlobalClick = (e: MouseEvent) => {
      // Don't double play if clicking interactive elements that play custom sounds
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) return;
      playClick(1.0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [playClick]);

  return (
    <div className="paper-texture grain-overlay min-h-screen relative overflow-hidden transition-colors duration-500">
      <Cursor mousePosition={mousePosition} />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
      <DesignConsole />
    </div>
  );
}

function App() {
  return (
    <ThemeAudioProvider>
      <AppContent />
    </ThemeAudioProvider>
  );
}

export default App;
