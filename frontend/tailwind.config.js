/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js}",
    "./**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'nba-blue': '#17408B',
        'nba-red': '#C9082A',
        'court-orange': '#FF6B35',
        'basketball-brown': '#C4905C'
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'display': ['Poppins', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}