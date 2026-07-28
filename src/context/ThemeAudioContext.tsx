import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeType = "gazette" | "blueprint" | "monospace";

class WebAudioSynth {
    private ctx: AudioContext | null = null;

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    playClick(pitchFactor = 1.0) {
        try {
            this.init();
            const context = this.ctx;
            if (!context || context.state === "suspended") return;

            const t = context.currentTime;

            // Create transient oscillator for "tack"
            const osc = context.createOscillator();
            const gain = context.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(750 * pitchFactor, t);
            osc.frequency.exponentialRampToValueAtTime(120 * pitchFactor, t + 0.015);

            gain.gain.setValueAtTime(0.06, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.018);

            // Add noise transient for mechanical texture
            const bufferSize = context.sampleRate * 0.02; // 20ms
            const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = context.createBufferSource();
            noise.buffer = buffer;

            const noiseFilter = context.createBiquadFilter();
            noiseFilter.type = "bandpass";
            noiseFilter.frequency.setValueAtTime(1100, t);
            noiseFilter.Q.setValueAtTime(4.0, t);

            const noiseGain = context.createGain();
            noiseGain.gain.setValueAtTime(0.04, t);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.01);

            // Connect nodes
            osc.connect(gain);
            gain.connect(context.destination);

            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(context.destination);

            osc.start(t);
            osc.stop(t + 0.02);
            noise.start(t);
            noise.stop(t + 0.02);
        } catch (e) {
            console.warn("Audio Context init/playback failed", e);
        }
    }

    playRelease() {
        try {
            this.init();
            const context = this.ctx;
            if (!context || context.state === "suspended") return;

            const t = context.currentTime;
            const osc = context.createOscillator();
            const gain = context.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(320, t);
            osc.frequency.exponentialRampToValueAtTime(90, t + 0.012);

            gain.gain.setValueAtTime(0.02, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);

            osc.connect(gain);
            gain.connect(context.destination);

            osc.start(t);
            osc.stop(t + 0.02);
        } catch {
            // Ignored
        }
    }

    playBell() {
        try {
            this.init();
            const context = this.ctx;
            if (!context || context.state === "suspended") return;

            const t = context.currentTime;
            const frequencies = [1050, 1500, 1950];
            const filter = context.createBiquadFilter();
            filter.type = "highpass";
            filter.frequency.setValueAtTime(800, t);
            filter.connect(context.destination);

            frequencies.forEach((freq, idx) => {
                const osc = context.createOscillator();
                const gain = context.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, t);

                const maxVolume = idx === 0 ? 0.05 : 0.025;
                gain.gain.setValueAtTime(maxVolume, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

                osc.connect(gain);
                gain.connect(filter);

                osc.start(t);
                osc.stop(t + 0.5);
            });
        } catch {
            // Ignored
        }
    }

    playRustle() {
        try {
            this.init();
            const context = this.ctx;
            if (!context || context.state === "suspended") return;

            const t = context.currentTime;
            const duration = 0.2; // 200ms
            const bufferSize = context.sampleRate * duration;
            const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const source = context.createBufferSource();
            source.buffer = buffer;

            const filter = context.createBiquadFilter();
            filter.type = "bandpass";
            filter.frequency.setValueAtTime(800, t);
            filter.frequency.linearRampToValueAtTime(400, t + duration);
            filter.Q.setValueAtTime(1.5, t);

            const gain = context.createGain();
            gain.gain.setValueAtTime(0.0, t);
            gain.gain.linearRampToValueAtTime(0.03, t + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

            source.connect(filter);
            filter.connect(gain);
            gain.connect(context.destination);

            source.start(t);
            source.stop(t + duration);
        } catch {
            // Ignored
        }
    }
}

const synthInstance = new WebAudioSynth();

interface ThemeAudioContextProps {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
    playClick: (pitch?: number) => void;
    playRelease: () => void;
    playBell: () => void;
    playRustle: () => void;
}

const ThemeAudioContext = createContext<ThemeAudioContextProps | undefined>(undefined);

export const ThemeAudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeType>(() => {
        const saved = localStorage.getItem("portfolio-theme");
        return (saved as ThemeType) || "gazette";
    });
    const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
        return localStorage.getItem("portfolio-sound") === "true";
    });

    const setTheme = (t: ThemeType) => {
        localStorage.setItem("portfolio-theme", t);
        setThemeState(t);
        if (soundEnabled) {
            synthInstance.playRustle();
        }
    };

    const setSoundEnabled = (enabled: boolean) => {
        localStorage.setItem("portfolio-sound", enabled ? "true" : "false");
        setSoundEnabledState(enabled);
        if (enabled) {
            synthInstance.init();
            synthInstance.playBell();
        }
    };

    const playClick = (pitch?: number) => {
        if (soundEnabled) {
            synthInstance.playClick(pitch);
        }
    };

    const playRelease = () => {
        if (soundEnabled) {
            synthInstance.playRelease();
        }
    };

    const playBell = () => {
        if (soundEnabled) {
            synthInstance.playBell();
        }
    };

    const playRustle = () => {
        if (soundEnabled) {
            synthInstance.playRustle();
        }
    };

    // Bind keydown events for global typewriter immersion if sound is enabled
    useEffect(() => {
        const handleKeyDown = () => {
            // randomize pitch slightly for authentic mechanical sound
            const pitch = 0.9 + Math.random() * 0.2;
            playClick(pitch);
        };

        const handleKeyUp = () => {
            playRelease();
        };

        if (soundEnabled) {
            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("keyup", handleKeyUp);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [soundEnabled]);

    // Sync class on document body
    useEffect(() => {
        const body = document.body;
        body.classList.remove("theme-gazette", "theme-blueprint", "theme-monospace");
        body.classList.add(`theme-${theme}`);
    }, [theme]);

    return (
        <ThemeAudioContext.Provider
            value={{
                theme,
                setTheme,
                soundEnabled,
                setSoundEnabled,
                playClick,
                playRelease,
                playBell,
                playRustle,
            }}
        >
            {children}
        </ThemeAudioContext.Provider>
    );
};

export const useThemeAudio = () => {
    const context = useContext(ThemeAudioContext);
    if (!context) {
        throw new Error("useThemeAudio must be used within a ThemeAudioProvider");
    }
    return context;
};
