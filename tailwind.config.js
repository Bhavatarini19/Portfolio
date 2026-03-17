/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F0F5F7',
        'bg-alt': '#E8EFF5',
        card: '#FFFFFF',
        primary: '#1C2B38',
        secondary: '#4D6272',
        teal: {
          DEFAULT: '#2C6E73',
          light: '#3D8A8F',
          dark: '#1F4E5F',
          deep: '#172E3C',
        },
        seafoam: '#8FCBC2',
        cerulean: '#B8DCE8',
        sand: '#D6A96C',
        highlight: '#DFF0F5',
        'border-col': '#CBE0E9',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-10px) translateX(5px)' },
          '66%': { transform: 'translateY(-6px) translateX(-4px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
