/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Unlocks dynamic HTML theme toggling using a class wrapper
  theme: {
    extend: {
      colors: {
        // Here we map your exact user-specified color profiles
        lightPurple: '#e6e0f8',
        deepGreen: '#0b3f27',
      },
    },
  },
  plugins: [],
}
