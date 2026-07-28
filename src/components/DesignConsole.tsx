import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeAudio, ThemeType } from "../context/ThemeAudioContext";

const DesignConsole = () => {
    const { theme, setTheme, soundEnabled, setSoundEnabled, playClick, playBell } =
        useThemeAudio();

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSound = () => {
        setSoundEnabled(!soundEnabled);
    };

    const selectTheme = (t: ThemeType) => {
        playClick(1.2);
        setTheme(t);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-caption select-none">
            <AnimatePresence>
                {isExpanded ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`p-5 rounded border shadow-paper flex flex-col gap-4 max-w-[280px] ${theme === "blueprint"
                                ? "bg-paper-alt border-primary/40 text-accent"
                                : theme === "monospace"
                                    ? "bg-paper-alt border-secondary text-primary font-mono"
                                    : "bg-paper-alt border-sepia/20 text-tobacco"
                            }`}
                    >
                        {/* Box Header */}
                        <div className="flex items-center justify-between border-b pb-2 border-gridline">
                            <span className={`text-xs uppercase tracking-widest font-bold ${theme === "monospace" ? "font-mono" : ""}`}>
                                {theme === "blueprint" ? "SYS_CONTROL_PANEL v1.0" : theme === "monospace" ? "PRINT PRESS v.01" : "The Artisan Console"}
                            </span>
                            <button
                                onClick={() => {
                                    playClick(0.8);
                                    setIsExpanded(false);
                                }}
                                className={`text-xs opacity-60 hover:opacity-100 hover:text-accent font-semibold px-1 ${theme === "monospace" ? "font-mono" : ""
                                    }`}
                            >
                                [Hide]
                            </button>
                        </div>

                        {/* Theme Selector */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-wider opacity-70">
                                Print Style (Paper Grade)
                            </span>
                            <div className="grid grid-cols-3 gap-1 text-[11px] font-semibold text-center">
                                {(["gazette", "blueprint", "monospace"] as ThemeType[]).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => selectTheme(t)}
                                        onMouseEnter={() => playClick(1.1)}
                                        className={`py-1.5 px-2 rounded uppercase border transition-all ${theme === t
                                                ? theme === "blueprint"
                                                    ? "bg-primary/20 border-primary text-primary shadow-[0_0_8px_rgba(0,255,255,0.3)]"
                                                    : theme === "monospace"
                                                        ? "bg-primary text-paper border-primary font-bold"
                                                        : "bg-olive/15 border-olive text-olive font-medium"
                                                : theme === "blueprint"
                                                    ? "bg-transparent border-primary/20 text-accent/60 hover:text-accent hover:border-primary/50"
                                                    : theme === "monospace"
                                                        ? "bg-transparent border-secondary/30 text-secondary hover:text-primary hover:border-secondary"
                                                        : "bg-transparent border-sepia/10 text-sepia hover:text-tobacco hover:border-sepia/30"
                                            }`}
                                    >
                                        {t === "gazette" ? "Gazette" : t === "blueprint" ? "Blueprint" : "Mono"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Audio Toggle Switch */}
                        <div className="flex items-center justify-between pt-2 border-t border-gridline">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider opacity-70">
                                    Immersion Sound
                                </span>
                                <span className="text-[9px] opacity-50 italic">
                                    {soundEnabled ? "Web Audio active" : "Audio muted"}
                                </span>
                            </div>
                            <button
                                onClick={toggleSound}
                                onMouseEnter={() => playClick(1.0)}
                                className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none border ${soundEnabled
                                        ? theme === "blueprint"
                                            ? "bg-primary/20 border-primary"
                                            : theme === "monospace"
                                                ? "bg-primary border-primary"
                                                : "bg-olive/20 border-olive"
                                        : theme === "blueprint"
                                            ? "bg-transparent border-primary/20"
                                            : theme === "monospace"
                                                ? "bg-transparent border-secondary/30"
                                                : "bg-transparent border-sepia/20"
                                    }`}
                                aria-label="Toggle Sound Effects"
                            >
                                <motion.div
                                    layout
                                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                                    className={`w-4 h-4 rounded-full ${soundEnabled
                                            ? theme === "blueprint"
                                                ? "bg-primary shadow-[0_0_6px_rgba(0,255,255,0.8)]"
                                                : theme === "monospace"
                                                    ? "bg-paper"
                                                    : "bg-olive"
                                            : theme === "blueprint"
                                                ? "bg-primary/30"
                                                : theme === "monospace"
                                                    ? "bg-secondary"
                                                    : "bg-sepia"
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Quick Bells */}
                        {soundEnabled && (
                            <button
                                onClick={() => playBell()}
                                onMouseEnter={() => playClick(1.0)}
                                className={`py-1 px-3 text-[10px] border rounded uppercase text-center opacity-80 hover:opacity-100 transition-opacity ${theme === "blueprint"
                                        ? "border-primary/20 hover:border-primary/60 text-primary"
                                        : theme === "monospace"
                                            ? "border-secondary/20 hover:border-primary text-primary"
                                            : "border-sepia/15 hover:border-sepia/40 text-sepia"
                                    }`}
                            >
                                🔔 Ring Desk Bell
                            </button>
                        )}
                    </motion.div>
                ) : (
                    /* Small closed gear button */
                    <motion.button
                        key="console-trigger"
                        layoutId="console-trigger"
                        onClick={() => {
                            playClick(1.0);
                            setIsExpanded(true);
                        }}
                        onMouseEnter={() => playClick(1.1)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-paper hover:shadow-paper-hover transition-all cursor-none ${theme === "blueprint"
                                ? "bg-paper-alt border-primary hover:border-primary text-primary shadow-[0_0_6px_rgba(0,255,255,0.2)]"
                                : theme === "monospace"
                                    ? "bg-paper-alt border-primary text-primary"
                                    : "bg-paper-alt border-sepia hover:border-tobacco text-sepia hover:text-tobacco"
                            }`}
                        aria-label="Open Design Console"
                    >
                        <svg
                            className={`w-5 h-5 ${theme === "monospace" ? "" : "animate-spin-[spin_10s_linear_infinite]"}`}
                            style={{ animation: "spin 12s linear infinite" }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DesignConsole;
