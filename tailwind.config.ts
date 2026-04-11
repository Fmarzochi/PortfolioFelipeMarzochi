import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Glassmorphism support: backdrop-blur and bg-opacity are core utilities
      // enabled by default in Tailwind v3 — no plugin needed.
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '24px',
        xl: '40px',
      },
      backgroundOpacity: {
        '5': '0.05',
        '10': '0.10',
        '15': '0.15',
        '20': '0.20',
      },
      colors: {
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.2)',
        },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
      },
      borderColor: {
        glass: 'rgba(255, 255, 255, 0.18)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
      },
      animation: {
        'spring-in': 'springIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring-out': 'springOut 0.3s cubic-bezier(0.36, 0, 0.66, -0.56)',
        'dock-magnify': 'dockMagnify 0.2s ease-out',
      },
      keyframes: {
        springIn: {
          '0%': { opacity: '0', transform: 'scale(0.85) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        springOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.85) translateY(10px)' },
        },
        dockMagnify: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
