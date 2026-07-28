export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        "paper-alt": "var(--color-paper-alt)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        ink: "var(--color-text)",
        gridline: "var(--color-grid-line)",
        // Map old names to CSS variables for automatic backwards compatibility
        parchment: "var(--color-paper)",
        cream: "var(--color-paper-alt)",
        sepia: "var(--color-secondary)",
        tobacco: "var(--color-primary)",
        olive: "var(--color-accent)",
      },
      fontFamily: {
        heading: ['var(--font-current-heading)', '"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['var(--font-current-body)', '"Source Serif Pro"', 'Georgia', 'serif'],
        caption: ['Inter', 'system-ui', 'sans-serif'],
        dropcap: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['Courier', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'baseline': '1.5rem',
        'baseline-2': '3rem',
        'baseline-3': '4.5rem',
        'baseline-4': '6rem',
      },
      boxShadow: {
        'paper': '0 1px 3px rgba(61, 50, 41, 0.08), 0 4px 12px rgba(61, 50, 41, 0.04)',
        'paper-hover': '0 4px 12px rgba(61, 50, 41, 0.12), 0 8px 24px rgba(61, 50, 41, 0.08)',
        'letterpress': 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(61, 50, 41, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'ticker': 'ticker 40s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '4rem',
        xl: '6rem',
        '2xl': '8rem',
      },
    },
  },
  plugins: [],
}