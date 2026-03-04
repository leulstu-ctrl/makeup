/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#fce4ec', // soft pink
          gold: '#d4af37', // rich gold
          brown: '#4e342e', // deep brown
          lightBrown: '#8d6e63',
          dark: '#212121',
          light: '#fafafa',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}