/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './blog/**/*.html',
    './style.css',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
      },
    },
  },
};
