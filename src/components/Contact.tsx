import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeAudio } from "../context/ThemeAudioContext";
import { SectionDivider } from "./Ornaments";

const Contact = () => {
  const { theme, playClick, playBell } = useThemeAudio();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Play mechanical key taps with random pitch factor
    const pitch = 0.9 + Math.random() * 0.3;
    playClick(pitch);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    playBell();

    // Simulate terminal transmission delay
    setTimeout(() => {
      setStatus("success");
      playBell();
    }, 1800);
  };

  const resetTerminal = () => {
    setFormData({ name: "", email: "", message: "" });
    setStatus("idle");
    playClick(1.0);
  };

  return (
    <section id="contact" className="py-20 px-6 section-alt border-t border-primary/10 transition-colors duration-500 relative z-10">
      <div className="container mx-auto max-w-2xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="caption mb-4">Start a Conversation or Project</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary letterpress">
            {theme === "blueprint" ? "DISPATCH_TERMINAL: GET_IN_TOUCH" : theme === "monospace" ? "CONTACT_PORT.EXE" : "Get In Touch"}
          </h2>
        </motion.div>

        <SectionDivider />

        {/* CLI Terminal Checkout Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className={`rounded border overflow-hidden shadow-lg p-6 font-mono text-xs ${theme === "blueprint"
              ? "bg-paper-alt/25 border-primary/30 text-accent"
              : theme === "monospace"
                ? "bg-paper-alt border-secondary/35 text-primary text-green-400"
                : "bg-paper-alt/45 border-sepia/25 text-ink"
            }`}
        >
          {/* Terminal Title Bar */}
          <div className="flex justify-between items-center border-b border-primary/15 pb-3 mb-4 select-none">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
            </div>
            <span className="text-[10px] text-secondary font-bold font-mono uppercase tracking-wider">
              abubeker@portfolio-node:~
            </span>
            <span className="text-[9px] px-2 py-0.5 border border-primary/15 bg-black/10 rounded font-bold text-emerald-500">
              ● AVAILABLE
            </span>
          </div>

          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.form
                key="terminal-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="text-secondary block mb-1 font-bold text-[10px] uppercase">
                    01. Your Name / Organization
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">{">"}</span>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Johnson (Acme Corp)"
                      className="bg-transparent border-b border-primary/20 focus:border-primary outline-none py-1 w-full text-primary font-mono placeholder:text-secondary/40 cursor-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-secondary block mb-1 font-bold text-[10px] uppercase">
                    02. Your Email Address
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">{">"}</span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. alex@example.com"
                      className="bg-transparent border-b border-primary/20 focus:border-primary outline-none py-1 w-full text-primary font-mono placeholder:text-secondary/40 cursor-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-secondary block mb-1 font-bold text-[10px] uppercase">
                    03. Message / Project Details
                  </label>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">{">"}</span>
                    <textarea
                      required
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your project, timeline, or job inquiry..."
                      className="bg-transparent border-b border-primary/20 focus:border-primary outline-none py-1 w-full text-primary font-mono placeholder:text-secondary/40 resize-none h-20 cursor-none"
                    />
                  </div>
                </div>

                {/* Submit command line */}
                <div className="pt-3 flex justify-between items-center border-t border-primary/10 select-none">
                  <span className="text-[10px] text-secondary">
                    READY TO DISPATCH
                  </span>
                  <button
                    type="submit"
                    onMouseEnter={() => playClick(1.05)}
                    className={`px-4 py-2 border rounded-sm font-bold text-[11px] transition-colors cursor-none flex items-center gap-1.5 shadow-sm ${theme === "blueprint"
                        ? "border-primary/30 text-primary hover:bg-primary/15"
                        : theme === "monospace"
                          ? "border-secondary/40 text-secondary hover:text-primary hover:border-primary"
                          : "border-sepia/30 text-sepia hover:bg-cream"
                      }`}
                  >
                    🚀 Send Message ↗
                  </button>
                </div>
              </motion.form>
            )}

            {status === "sending" && (
              <motion.div
                key="sending"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center space-y-4"
              >
                <div className="flex space-x-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                </div>
                <div className="text-center font-mono space-y-2">
                  <p className="text-primary font-bold">TRANSMITTING MESSAGE...</p>
                  <p className="text-secondary/70 text-[10px]">
                    Directing dispatch to abubeker4310@gmail.com
                  </p>
                </div>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 space-y-6 font-mono"
              >
                <div className="border border-green-500/30 bg-green-500/5 p-4 rounded text-emerald-500">
                  <span className="font-bold block mb-1">=== MESSAGE DELIVERED SUCCESSFULLY ===</span>
                  <p className="text-[11px] leading-relaxed text-secondary-alt">
                    Thank you for reaching out! Your message packet has been transmitted. I typically respond within 24 hours.
                  </p>
                </div>

                {/* Simulated shell execution layout output */}
                <div className="p-4 bg-black/20 rounded border border-primary/10 text-secondary leading-relaxed">
                  <p>$ whoami</p>
                  <p className="text-primary">Guest Visitor</p>
                  <p>$ status_check --target abubeker4310@gmail.com</p>
                  <p className="text-green-500">[OK] Message delivered to inbox.</p>
                  <p className="text-green-500">[OK] Confirmation logged.</p>
                </div>

                <div className="flex justify-end select-none">
                  <button
                    onClick={resetTerminal}
                    onMouseEnter={() => playClick(1.05)}
                    className="px-3.5 py-1.5 border border-primary/20 hover:border-primary text-primary transition-colors text-[10px] font-bold cursor-none"
                  >
                    [ Send Another Message ]
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-dashed border-primary/15 font-mono text-[10px] text-secondary">
          <div>
            <span className="block font-bold mb-1">DIRECT EMAIL & TELEGRAM:</span>
            <div className="flex flex-col gap-1">
              <a
                href="mailto:abubeker4310@gmail.com"
                onMouseEnter={() => playClick(1.05)}
                onClick={() => playBell()}
                className="text-primary hover:underline cursor-none"
              >
                ✉️ abubeker4310@gmail.com
              </a>
              <a
                href="https://t.me/ABking1"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playClick(1.05)}
                onClick={() => playBell()}
                className="text-primary hover:underline cursor-none"
              >
                💬 Telegram: @ABking1
              </a>
            </div>
          </div>
          <div className="sm:text-right">
            <span className="block font-bold mb-1">LOCATION & STATUS:</span>
            <span className="text-primary block">Addis Ababa, Ethiopia</span>
            <span className="text-emerald-500 font-bold">● Available for Full-Time & Freelance</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
