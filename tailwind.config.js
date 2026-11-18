/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ios: {
          bg: '#05070f',
          surface: 'rgba(255, 255, 255, 0.04)',
          'surface-hover': 'rgba(255, 255, 255, 0.07)',
          border: 'rgba(255, 255, 255, 0.10)',
          'border-highlight': 'rgba(255, 255, 255, 0.22)',
          blue: '#007AFF',
          cyan: '#32ADE6',
          purple: '#AF52DE',
          indigo: '#5856D6',
          green: '#34C759',
          orange: '#FF9500',
          red: '#FF3B30',
          pink: '#FF2D55',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-glow-blue': '0 0 25px rgba(0, 122, 255, 0.25)',
        'glass-glow-purple': '0 0 25px rgba(175, 82, 222, 0.25)',
        'glass-glow-cyan': '0 0 25px rgba(50, 173, 230, 0.25)',
        'glass-glow-green': '0 0 25px rgba(52, 199, 89, 0.3)',
        'glass-glow-red': '0 0 25px rgba(255, 59, 48, 0.3)',
        'inner-light': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
