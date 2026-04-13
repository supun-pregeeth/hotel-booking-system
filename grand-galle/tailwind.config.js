/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f4',
          100: '#dceee6',
          200: '#b9dece',
          300: '#8dc6b0',
          400: '#5fa88e',
          500: '#3d8a72',
          600: '#2a6e5b',
          700: '#1e5244',
          800: '#153c33',
          900: '#0F3D2E',
          950: '#07201a',
        },
        gold: {
          100: '#fdf6e3',
          200: '#f9e8b8',
          300: '#f2d27a',
          400: '#e8b84b',
          500: '#c9932a',
          600: '#a87520',
        },
        cream: '#FAF7F2',
        sand: '#E8E0D4',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}