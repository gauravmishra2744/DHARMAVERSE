/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'diya': 'diya 2s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      colors: {
        'dharma-gold': '#ffd700',
        'dharma-purple': '#ff77ff',
      }
    },
  },
  plugins: [],
}