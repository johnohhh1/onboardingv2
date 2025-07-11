/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'chilis-red': '#d32f2f',
      },
      backgroundColor: {
        'dark-primary': '#1a1a1a',
        'dark-secondary': '#2d2d2d',
        'dark-tertiary': '#404040',
      },
      textColor: {
        'dark-primary': '#ffffff',
        'dark-secondary': '#e5e5e5',
        'dark-muted': '#a0a0a0',
      },
    },
  },
  plugins: [],
}
