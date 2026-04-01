/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'calculator-bg': '#1a1a1a',
        'calculator-screen': '#0d0d0d',
        'button-primary': '#2d2d2d',
        'button-secondary': '#ff9500',
        'button-function': '#505050',
      },
      fontFamily: {
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
