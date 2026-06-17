/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#eef4fb',
          100: '#d4e4f5',
          200: '#a9c9eb',
          300: '#7aabdf',
          400: '#4b8dd3',
          500: '#2570c0',
          600: '#044388',
          700: '#03376e',
          800: '#022b55',
          900: '#021f3e',
        },
        slate: {
          850: '#1a2332',
          950: '#0c1220',
        },
        terracotta: {
          50: '#eef4fb',
          100: '#d4e4f5',
          200: '#a9c9eb',
          300: '#7aabdf',
          400: '#4b8dd3',
          500: '#2570c0',
          600: '#044388',
          700: '#03376e',
          800: '#022b55',
          900: '#021f3e',
        },
        sage: {
          50: '#eef4fb',
          100: '#d4e4f5',
          200: '#a9c9eb',
          300: '#7aabdf',
          400: '#4b8dd3',
          500: '#2570c0',
          600: '#044388',
          700: '#03376e',
          800: '#022b55',
          900: '#021f3e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
