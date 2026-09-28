import { useEffect, useRef, useState } from "react";
import { useThemeAudio } from "../context/ThemeAudioContext";

const Cursor = () => {
  const { theme } = useThemeAudio();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Instant 1:1 hardware update for the center dot (Zero latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    // Fast, lightweight lerp for the outer ring
    const render = () => {
      // Snappy lerp factor for fast response without sluggish drag
      ringX += (mouseX - ringX) * 0.45;
      ringY += (mouseY - ringY) * 0.45;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Instant Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-[3px] -mt-[3px] w-[6px] h-[6px] rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out ${
          theme === "blueprint"
            ? "bg-primary shadow-[0_0_6px_rgba(0,229,255,0.8)]"
            : theme === "monospace"
            ? "bg-accent shadow-[0_0_6px_rgba(57,255,20,0.8)]"
            : "bg-black shadow-[0_0_2px_rgba(0,0,0,0.3)]"
        } ${isClicked ? "scale-50" : isHovered ? "scale-125" : "scale-100"}`}
        style={{ willChange: "transform" }}
      />

      {/* Lightweight Smooth Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-150 ease-out border ${
          theme === "blueprint"
            ? "border-primary/60 bg-primary/5"
            : theme === "monospace"
            ? "border-accent/60 bg-accent/5"
            : isHovered
            ? "border-black/90 bg-black/[0.06]"
            : "border-black/80 bg-black/[0.03]"
        } ${
          isHovered
            ? "-ml-[18px] -mt-[18px] w-[36px] h-[36px] opacity-100 scale-110"
            : "-ml-[12px] -mt-[12px] w-[24px] h-[24px] opacity-80 scale-100"
        } ${isClicked ? "scale-90 opacity-90" : ""}`}
        style={{ willChange: "transform" }}
      />
    </div>
  );
};

export default Cursor;